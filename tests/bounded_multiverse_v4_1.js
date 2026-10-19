'use strict';
// Test-LaB ONLY: bounded decision-tree enumeration; no network or production mutations.
// Requires Node.js 18+; no dependencies. "Observed" inputs are synthetic fixtures.
const CFG=Object.freeze({horizon:5,probeFee:1,minCommit:30,gain:20,loss:30});
const EPS=1e-9,near=(a,b)=>Math.abs(a-b)<EPS;
function state(cash=100,alpha=1,beta=1,h=CFG.horizon,origin='OBSERVED_FIXTURE'){
  return {cash,alpha,beta,h,origin};
}
function choices(s){
  if(s.h===0)return [];
  return ['STOP',...(s.cash>=CFG.probeFee?['PROBE']:[]),
    ...(s.cash>=CFG.minCommit?['COMMIT']:[])];
}
function probability(s){return s.alpha/(s.alpha+s.beta);}
function step(s,action,outcome){
  if(!choices(s).includes(action)||action==='STOP')throw Error('INFEASIBLE');
  if(outcome!=='SUCCESS'&&outcome!=='FAILURE')throw Error('MODEL_MISS');
  return state(s.cash+(action==='PROBE'?-CFG.probeFee:
    outcome==='SUCCESS'?CFG.gain:-CFG.loss),
    s.alpha+(outcome==='SUCCESS'?1:0),s.beta+(outcome==='FAILURE'?1:0),
    s.h-1,'SIMULATED_BRANCH');
}
function workFor(s){return 1+2*choices(s).filter(x=>x!=='STOP').length;}
function node(s,path,root,depth,index){return {s,path,root,depth,index,expanded:false,actions:null};}
function bounds(n){
  if(n.s.h===0)return {lo:0,hi:0,complete:true,actions:[]};
  if(!n.expanded)return {lo:0,hi:20*n.s.h,complete:false,actions:[]};
  const a=n.actions.map(x=>{
    if(x.action==='STOP')return {action:'STOP',lo:0,hi:0,complete:true};
    let lo=0,hi=0,complete=true;
    for(const b of x.branches){
      const v=bounds(b.child);
      lo+=b.p*(b.reward+v.lo);hi+=b.p*(b.reward+v.hi);
      complete=complete&&v.complete;
    }
    return {action:x.action,lo,hi,complete};
  });
  return {lo:Math.max(...a.map(x=>x.lo)),hi:Math.max(...a.map(x=>x.hi)),
    complete:a.every(x=>x.complete),actions:a};
}
function counts(n){
  if(n.s.h===0)return {nodes:1,decisions:0,horizonLeaves:1,stopLeaves:0,
    unexplored:0,edges:0,alternatives:0};
  if(!n.expanded)return {nodes:1,decisions:0,horizonLeaves:0,stopLeaves:0,
    unexplored:1,edges:0,alternatives:0};
  // Explicitly count the STOP terminal and its edge for EACH expanded node.
  const c={nodes:2,decisions:1,horizonLeaves:0,stopLeaves:1,
    unexplored:0,edges:1,alternatives:n.actions.length};
  for(const a of n.actions)for(const b of a.branches){
    const k=counts(b.child);
    for(const key of Object.keys(c))c[key]+=k[key];
    c.edges++;
  }
  return c;
}
function evaluate(rootState,maxWorkUnits){
  if(!Number.isSafeInteger(maxWorkUnits)||maxWorkUnits<0)throw Error('INVALID_BUDGET');
  const root=node({...rootState},'S1',null,0,0),pending=[root],allocation={},trace=[];
  let id=1,used=0,expanded=0,transitions=0;
  while(true){
    // One global ledger; candidate nodes cannot reset or clone the budget.
    const available=pending.filter(n=>!n.expanded&&used+workFor(n.s)<=maxWorkUnits);
    if(available.length===0)break;
    // Breadth-first, then fewer expansions per FIRST action, then stable arrival.
    available.sort((a,b)=>a.depth-b.depth||(allocation[a.root]||0)-(allocation[b.root]||0)||a.index-b.index);
    const n=available[0],s=n.s;
    n.actions=choices(s).map(action=>{
      if(action==='STOP')return {action,branches:[]};
      return {action,branches:['SUCCESS','FAILURE'].map(outcome=>{
        const next=step(s,action,outcome);
        return {outcome,p:outcome==='SUCCESS'?probability(s):1-probability(s),
          reward:next.cash-s.cash,child:node(next,
            n.path+'>'+action+':'+outcome,n.root||action,n.depth+1,id++)};
      })};
    });
    n.expanded=true;
    const trans=n.actions.reduce((x,a)=>x+a.branches.length,0),cost=1+trans;
    if(used+cost>maxWorkUnits)throw Error('BUDGET_OVERRUN');
    used+=cost;expanded++;transitions+=trans;
    if(n.root)allocation[n.root]=(allocation[n.root]||0)+1;
    trace.push({path:n.path,rootAction:n.root||'ROOT',depth:n.depth,cost,spent:used});
    // Interleave competing root actions before proceeding deeper in one path.
    for(let outcomeIndex=0;outcomeIndex<2;outcomeIndex++)
      for(const a of n.actions){
        const b=a.branches[outcomeIndex];
        if(b&&b.child.s.h>0)pending.push(b.child);
      }
  }
  const c=counts(root),v=bounds(root),status=c.unexplored?'BUDGET_EXHAUSTED':'COMPLETE';
  if(c.edges!==used||c.nodes!==1+used)throw Error('COST_ACCOUNTING_MISMATCH');
  const winner=root.expanded?v.actions.find(a=>v.actions.every(b=>
    b.action===a.action||a.lo>=b.hi-EPS)):null;
  const decision=winner?{status:'CERTIFIED_WITHIN_DECLARED_MODEL',action:winner.action}:
    {status:'ABSTAIN_UNCERTIFIED',action:null};
  return {root,status,decision,values:v,counts:c,trace,
    ledger:{limit:maxWorkUnits,used,remaining:maxWorkUnits-used,expanded,transitions}};
}
function observedFixture(outcomes,cap){
  let s=state();const visits=[];
  for(let i=0;i<=outcomes.length;i++){
    const r=evaluate(s,cap);
    visits.push({point:i+1,cash:s.cash,alpha:s.alpha,beta:s.beta,
      choice:r.decision.action,decisionStatus:r.decision.status,
      cost:r.ledger.used,origin:s.origin});
    if(!r.decision.action)return {status:'WAIT_BUDGET_OR_EVIDENCE',visits};
    if(r.decision.action==='STOP')return {status:'STOP',visits};
    if(i===outcomes.length)return {status:'WAIT_FOR_OBSERVATION',visits};
    if(!['SUCCESS','FAILURE'].includes(outcomes[i]))return {status:'MODEL_MISS',visits};
    const child=step(s,r.decision.action,outcomes[i]);
    s=state(child.cash,child.alpha,child.beta,CFG.horizon,'OBSERVED_FIXTURE');
  }
}
function runTests(){
  const tests=[];
  const assert=(name,yes)=>{if(!yes)throw Error('FAILED: '+name);tests.push(name);};
  const full=evaluate(state(),1677),levels=[0,1,4,5,9,10,15,25,40,75,140,280,560,900,1200,1600,1677,2000];
  const series=levels.map(x=>evaluate(state(),x));
  assert('Full declared tree complete',full.status==='COMPLETE');
  assert('Full tree contains 1678 nodes',full.counts.nodes===1678);
  assert('Full tree contains 339 decision nodes',full.counts.decisions===339);
  assert('Full tree contains 1339 terminal/horizon leaves',full.counts.stopLeaves+full.counts.horizonLeaves===1339);
  assert('Full tree enumerates 1008 action alternatives',full.counts.alternatives===1008);
  assert('Full work cost is 1677',full.ledger.used===1677);
  assert('Global units equal expanded nodes plus evaluated transitions',
    full.ledger.used===full.ledger.expanded+full.ledger.transitions);
  assert('Full expected toy objective equals 25/3',near(full.values.lo,25/3)&&near(full.values.hi,25/3));
  assert('Complete tree chooses PROBE',full.decision.action==='PROBE');
  assert('Complete tree is certified',full.decision.status==='CERTIFIED_WITHIN_DECLARED_MODEL');
  assert('Every observed root action enumerated in full',full.values.actions.map(x=>x.action).join(',')==='STOP,PROBE,COMMIT');
  assert('All budgets tested',series.length===levels.length);
  assert('Shared budget never exceeded',series.every(x=>x.ledger.used<=x.ledger.limit));
  assert('Ledger reconciles at every budget',series.every(x=>x.ledger.used===x.counts.edges));
  assert('Generated node count bounded by work cap',series.every(x=>x.counts.nodes===x.ledger.used+1));
  assert('At budget zero root is unexplored',series[0].counts.unexplored===1&&series[0].ledger.used===0);
  assert('At budget four root not partially expanded',series[2].counts.unexplored===1&&series[2].ledger.used===0);
  const b5=series[3],b10=series[5],b15=series[6];
  assert('Budget five expands root only',b5.ledger.used===5&&b5.ledger.expanded===1);
  assert('Budget five preserves all first options',b5.values.actions.map(x=>x.action).join(',')==='STOP,PROBE,COMMIT');
  assert('Early unfavorable COMMIT branch preserved',b5.root.actions.some(a=>a.action==='COMMIT'));
  assert('Budget five has four unresolved future nodes',b5.counts.unexplored===4);
  assert('Partial tree reports budget exhausted',b5.status==='BUDGET_EXHAUSTED');
  assert('Partial future intervals marked incomplete',b5.values.actions.some(a=>a.action==='COMMIT'&&!a.complete));
  assert('Partial overlap abstains, no lucky leaf',b5.decision.action===null);
  assert('Insufficient budget abstains at root',series[2].decision.status==='ABSTAIN_UNCERTIFIED');
  assert('First future expansion includes PROBE',b10.trace[1].rootAction==='PROBE');
  assert('Second future expansion fairly includes COMMIT',b15.trace[2].rootAction==='COMMIT');
  assert('Search visits shallower nodes before deeper affordable nodes',
    series.every(x=>x.trace.every((t,i)=>i===0||t.depth>=x.trace[i-1].depth)));
  assert('Virtual rollouts never modify original fixture belief',
    series.every(x=>x.root.s.origin==='OBSERVED_FIXTURE'&&x.root.s.alpha===1&&x.root.s.beta===1));
  assert('Virtual successor has simulated-only provenance',full.root.actions.filter(a=>a.action!=='STOP').every(a=>
    a.branches.every(b=>b.child.s.origin==='SIMULATED_BRANCH')));
  assert('Partial bounds contain full optimal toy value',
    series.every(x=>x.values.lo<=full.values.lo+EPS&&x.values.hi+EPS>=full.values.hi));
  assert('Lower bounds are nondecreasing with increased budget',
    series.slice(1).every((x,i)=>x.values.lo+EPS>=series[i].values.lo));
  assert('Upper bounds are nonincreasing with increased budget',
    series.slice(1).every((x,i)=>x.values.hi<=series[i].values.hi+EPS));
  assert('Every incomplete report is marked BUDGET_EXHAUSTED',
    series.filter(x=>x.counts.unexplored).every(x=>x.status==='BUDGET_EXHAUSTED'));
  assert('Repeatability at fixed cap',JSON.stringify(evaluate(state(),40).values)===JSON.stringify(evaluate(state(),40).values));
  assert('Reject negative budget',(()=>{try{evaluate(state(),-1);return false}catch(e){return e.message==='INVALID_BUDGET'}})());
  assert('Reject fractional budget',(()=>{try{evaluate(state(),1.5);return false}catch(e){return e.message==='INVALID_BUDGET'}})());
  assert('Resource gate disallows COMMIT',choices(state(20)).join(',')==='STOP,PROBE');
  assert('Reached horizon is terminal',choices(state(100,1,1,0)).length===0);
  assert('Nature probabilities normalized',near(probability(state())+1-probability(state()),1));
  assert('One branch updates only its own posterior',step(state(),'PROBE','SUCCESS').alpha===2&&state().alpha===1);
  assert('Unknown outcome is rejected',(()=>{try{step(state(),'PROBE','OTHER');return false}catch(e){return e.message==='MODEL_MISS'}})());
  const limited=observedFixture(['SUCCESS','FAILURE'],5);
  assert('Budget-limited fixture does not advance by guessed outcome',limited.status==='WAIT_BUDGET_OR_EVIDENCE'&&limited.visits.length===1);
  const history=observedFixture(['SUCCESS','FAILURE','FAILURE'],1677);
  assert('Full-budget observations reroot four consecutive points',history.visits.length===4);
  assert('Replan changes choices PROBE COMMIT PROBE STOP',history.visits.map(x=>x.choice).join(',')==='PROBE,COMMIT,PROBE,STOP');
  assert('S2 posterior correct',history.visits[1].alpha===2&&history.visits[1].beta===1);
  assert('S3 posterior correct',history.visits[2].alpha===2&&history.visits[2].beta===2);
  assert('S4 posterior correct',history.visits[3].alpha===2&&history.visits[3].beta===3);
  assert('Each fixture point has separate shared-budget ledger',history.visits.every(x=>x.cost<=1677&&x.origin==='OBSERVED_FIXTURE'));
  assert('Fixture reaches STOP',history.status==='STOP');
  assert('Missing observation waits',observedFixture([],1677).status==='WAIT_FOR_OBSERVATION');
  assert('Unmodeled observation triggers MODEL_MISS',observedFixture(['OTHER'],1677).status==='MODEL_MISS');
  return {
    testStatus:'PASS',assertions:tests.length,
    originalReference:{treeNodes:full.counts.nodes,decisionNodes:full.counts.decisions,
      leaves:full.counts.stopLeaves+full.counts.horizonLeaves,
      workUnits:full.ledger.used,action:full.decision.action,value:full.values.lo},
    budgets:series.map(x=>({limit:x.ledger.limit,used:x.ledger.used,
      expanded:x.ledger.expanded,unexplored:x.counts.unexplored,
      lower:x.values.lo,upper:x.values.hi,status:x.status,
      certifiedAction:x.decision.action})),
    fixture:history.visits,
    observedWorldOutcome:'NONE_SYNTHETIC_FIXTURES_ONLY',
    tests
  };
}
if(typeof module!=='undefined'&&typeof require!=='undefined'&&require.main===module)
  console.log(JSON.stringify(runTests(),null,2));
