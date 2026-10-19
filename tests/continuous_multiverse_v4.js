'use strict';
const assert = require('node:assert/strict');
const CONFIG = Object.freeze({successGain:20,failureLoss:30,probeFee:1,minCommitCash:30,horizon:5});
const TOL=1e-9;
const near=(a,b)=>Math.abs(a-b)<TOL;
const checks=[];
const check=(name,condition)=>{assert.ok(condition,name);checks.push(name);};
function start(cash=100,alpha=1,beta=1,remaining=CONFIG.horizon,mode='OBSERVED_FIXTURE'){
 return {cash,alpha,beta,remaining,mode,observations:[]};
}
function actions(s){
 if(s.remaining===0)return [];
 const a=['STOP'];
 if(s.cash>=CONFIG.probeFee)a.push('PROBE');
 if(s.cash>=CONFIG.minCommitCash)a.push('COMMIT');
 return a;
}
function likelihood(s){return s.alpha/(s.alpha+s.beta);}
function transition(s,action,outcome,mode='SIMULATED_BRANCH'){
 if(!['PROBE','COMMIT'].includes(action))throw new Error('Action must produce an observation');
 if(!['SUCCESS','FAILURE'].includes(outcome))throw new Error('MODEL_MISS: observation not declared');
 if(!actions(s).includes(action))throw new Error('INFEASIBLE_ACTION');
 const cash=s.cash+(action==='PROBE'?-CONFIG.probeFee:outcome==='SUCCESS'?CONFIG.successGain:-CONFIG.failureLoss);
 return {cash,alpha:s.alpha+(outcome==='SUCCESS'?1:0),beta:s.beta+(outcome==='FAILURE'?1:0),
   remaining:s.remaining-1,mode,observations:[...s.observations,{action,outcome}]};
}
function rollout(s){
 if(s.remaining===0)return {kind:'HORIZON',state:s,value:0,choice:null,alternatives:[]};
 const available=actions(s);
 const alternatives=available.map(action=>{
   if(action==='STOP')return {action,expected:0,branches:[]};
   const prob=likelihood(s);
   const branches=['SUCCESS','FAILURE'].map(outcome=>{
     const p=outcome==='SUCCESS'?prob:1-prob;
     const successor=transition(s,action,outcome,'SIMULATED_BRANCH');
     const child=rollout(successor);
     return {outcome,probability:p,immediate:successor.cash-s.cash,child};
   });
   return {action,expected:branches.reduce((v,b)=>v+b.probability*(b.immediate+b.child.value),0),branches};
 });
 // Deterministic tie-breaking: STOP > PROBE > COMMIT, prefer reversibility.
 let best=alternatives[0];
 for(const candidate of alternatives.slice(1)) if(candidate.expected>best.expected+TOL)best=candidate;
 return {kind:'DECISION',state:s,value:best.expected,choice:best.action,alternatives};
}
function count(tree){
 if(tree.kind==='HORIZON')return {nodes:1,decision:0,leaves:1,branches:0,actionAlternatives:0};
 let totals={nodes:1,decision:1,leaves:0,branches:0,actionAlternatives:tree.alternatives.length};
 for(const action of tree.alternatives){
   if(action.action==='STOP'){totals.nodes++;totals.leaves++;totals.branches++;continue;}
   for(const b of action.branches){totals.branches++;const sub=count(b.child);for(const k of Object.keys(totals)){if(k==='branches')totals[k]+=sub.branches;else totals[k]+=sub[k];}}
 }
 return totals;
}
function rootsAsObserved(observations){
 let s=start();const history=[];let i=0;
 while(true){
   const tree=rollout(s);const metrics=count(tree);
   const log={point:'S'+(history.length+1),mode:s.mode,cash:s.cash,alpha:s.alpha,beta:s.beta,
     pSuccess:likelihood(s),horizon:s.remaining,choice:tree.choice,rootValue:tree.value,
     allFeasibleActions:tree.alternatives.map(a=>a.action),predictions:tree.alternatives.map(a=>({action:a.action,expected:a.expected,
      nextOutcomes:a.branches.map(b=>({observation:b.outcome,probability:b.probability,nextCash:b.child.state.cash,nextBelief:[b.child.state.alpha,b.child.state.beta],nextChoice:b.child.choice}))})),
     explored:metrics};
   history.push(log);
   if(tree.kind==='HORIZON')return {status:'HORIZON',history,remainingObservations:observations.slice(i)};
   if(tree.choice==='STOP')return {status:'STOP',history,remainingObservations:observations.slice(i)};
   if(i>=observations.length)return {status:'WAIT_FOR_OBSERVATION',history,remainingObservations:[]};
   const observed=observations[i++];
   if(!['SUCCESS','FAILURE'].includes(observed))return {status:'MODEL_MISS',history,invalidObservation:observed};
   const forecast=log.predictions.find(p=>p.action===tree.choice).nextOutcomes.find(o=>o.observation===observed);
   const actualNext=transition(s,tree.choice,observed,'OBSERVED_FIXTURE');
   log.observedFixtureEvent={observation:observed,probabilityAtDecision:forecast.probability,
       predictedMeanNextCash:log.predictions.find(p=>p.action===tree.choice).nextOutcomes.reduce((v,o)=>v+o.probability*o.nextCash,0),
       actualFixtureNextCash:actualNext.cash,
       posteriorBefore:[s.alpha,s.beta],posteriorAfter:[actualNext.alpha,actualNext.beta],
       eventOrigin:'SYNTHETIC_FIXTURE_NOT_REAL_WORLD'};
   s={...actualNext,remaining:CONFIG.horizon}; // Receding horizon: every observed point becomes a fresh root
 }
}
const initial=start();const old=JSON.stringify(initial);const tree=rollout(initial);const m=count(tree);
const successBranch=tree.alternatives.find(a=>a.action==='PROBE').branches.find(b=>b.outcome==='SUCCESS');
const failureBranch=tree.alternatives.find(a=>a.action==='PROBE').branches.find(b=>b.outcome==='FAILURE');
const routeA=rootsAsObserved(['SUCCESS','FAILURE','FAILURE']);
const routeB=rootsAsObserved(['SUCCESS','SUCCESS','FAILURE','FAILURE','FAILURE']);
const routeC=rootsAsObserved(['FAILURE']);
const paused=rootsAsObserved([]);
const missing=rootsAsObserved(['UNKNOWN_EVENT']);
const poorCash=rollout(start(20,2,1,3));
const terminal=rollout(start(100,1,1,0));
check('S1 is observed fixture',initial.mode==='OBSERVED_FIXTURE');
check('Root has STOP PROBE COMMIT',JSON.stringify(actions(initial))==='["STOP","PROBE","COMMIT"]');
check('Root policy chooses exploratory PROBE',tree.choice==='PROBE');
check('Root expected gain is 8.333333 in declared model',near(tree.value,25/3));
check('Myopic best immediate action STOP (0) vs probe -1 and commit -5',-CONFIG.probeFee<0&&likelihood(initial)*20-(1-likelihood(initial))*30<0);
check('Root explores all feasible actions',tree.alternatives.length===actions(initial).length);
check('Every non STOP action has exactly two outcome branches',tree.alternatives.filter(a=>a.action!=='STOP').every(a=>a.branches.length===2));
check('All nature outcome probabilities sum to one at every branch root',tree.alternatives.filter(a=>a.action!=='STOP').every(a=>near(a.branches.reduce((n,b)=>n+b.probability,0),1)));
check('Finite declared tree visits multiple decision nodes',m.decision>10);
check('Finite tree has no empty decisions and records leaves',m.leaves>100&&m.actionAlternatives>=m.decision);
check('Full tree nodes equal branches plus root',m.nodes===m.branches+1);
check('S2 success branch updates simulated belief to Beta(2,1)',successBranch.child.state.alpha===2&&successBranch.child.state.beta===1);
check('S2 failure branch updates simulated belief to Beta(1,2)',failureBranch.child.state.alpha===1&&failureBranch.child.state.beta===2);
check('Simulated S2 inherits resources after probe',successBranch.child.state.cash===99&&failureBranch.child.state.cash===99);
check('Virtual children are marked hypothetical',successBranch.child.state.mode==='SIMULATED_BRANCH'&&failureBranch.child.state.mode==='SIMULATED_BRANCH');
check('S2 chooses commit after success',successBranch.child.choice==='COMMIT');
check('S2 chooses stop after failure',failureBranch.child.choice==='STOP');
check('Multiverse expansion does not mutate observed initial root',JSON.stringify(initial)===old);
check('Route A new roots use revised policies',JSON.stringify(routeA.history.map(x=>x.choice))==='["PROBE","COMMIT","PROBE","STOP"]');
check('Route A includes four independently expanded roots',routeA.history.length===4&&routeA.history.every(x=>x.explored.decision>0));
check('Route A after positive probe has posterior (2,1)',routeA.history[1].alpha===2&&routeA.history[1].beta===1);
check('Route A after commitment failure has posterior (2,2)',routeA.history[2].alpha===2&&routeA.history[2].beta===2);
check('Route A cash after losses is 69',routeA.history[2].cash===69);
check('Route A S4 posterior (2,3) with cash 68',routeA.history[3].alpha===2&&routeA.history[3].beta===3&&routeA.history[3].cash===68);
check('Route A completes with STOP',routeA.status==='STOP');
check('Route B repeats for six decision roots',routeB.history.length===6);
check('Route B policy sequence changes with evidence',JSON.stringify(routeB.history.map(x=>x.choice))==='["PROBE","COMMIT","COMMIT","COMMIT","PROBE","STOP"]');
check('Route B learns Beta(3,3) with cash 59',routeB.history[4].alpha===3&&routeB.history[4].beta===3&&routeB.history[4].cash===59);
check('Route B last posterior is Beta(3,4) cash 58',routeB.history[5].alpha===3&&routeB.history[5].beta===4&&routeB.history[5].cash===58);
check('Route C re-evaluates after negative probe',routeC.history[1].choice==='STOP'&&routeC.history[1].beta===2);
check('Without an observed outcome system waits instead of inventing evidence',paused.status==='WAIT_FOR_OBSERVATION'&&paused.history.length===1&&!paused.history[0].observedFixtureEvent);
check('Unknown outcome fails without fabricated posterior',missing.status==='MODEL_MISS'&&missing.history.length===1&&!missing.history[0].observedFixtureEvent);
check('Actual resource constraint blocks COMMIT after poor cash',!poorCash.alternatives.some(a=>a.action==='COMMIT'));
check('Terminal point does not make spurious decisions',terminal.kind==='HORIZON'&&terminal.choice===null);
check('Point 2 forecast is observation-conditional, never lucky-leaf',routeA.history[0].predictions.find(a=>a.action==='PROBE').nextOutcomes.length===2);
check('Every observed decision root replans with fresh horizon 5',routeB.history.every(x=>x.horizon===CONFIG.horizon));
check('Simulated branch successor consumes one planning horizon step',successBranch.child.state.remaining===CONFIG.horizon-1);
check('After real-fixture evidence, S3 can choose PROBE instead of terminal STOP',routeA.history[2].choice==='PROBE');
check('Observed trace uses only fixture observations, not virtual branch observations',routeB.history.every(x=>x.mode==='OBSERVED_FIXTURE'));
check('Route B eventually terminates through selected STOP',routeB.status==='STOP');
check('No real-world action or external money involved',routeA.history.every(x=>!x.observedFixtureEvent||x.observedFixtureEvent.eventOrigin==='SYNTHETIC_FIXTURE_NOT_REAL_WORLD'));
console.log(JSON.stringify({status:'PASS',checks:checks.length,metrics:m,root:{choice:tree.choice,value:tree.value},routeA:routeA.history.map(x=>({point:x.point,belief:x.alpha+':'+x.beta,cash:x.cash,decision:x.choice,pSuccess:x.pSuccess,value:x.rootValue,exploredDecisionNodes:x.explored.decision})),routeB:routeB.history.map(x=>({point:x.point,belief:x.alpha+':'+x.beta,cash:x.cash,decision:x.choice})),routeC:routeC.history.map(x=>({point:x.point,belief:x.alpha+':'+x.beta,cash:x.cash,decision:x.choice})),paused:paused.status,missing:missing.status,poorCashActions:poorCash.alternatives.map(a=>a.action),tests:checks},null,2));
