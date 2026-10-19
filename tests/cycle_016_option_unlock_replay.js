'use strict';
// Cycle 016: FROZEN causal-option replay. No network/file writes in this source.
// Inputs must come from the public release manifest acquired after preregistration.
const CFG=Object.freeze({
  trainingStart:'2025-07-07T00:00:00.000Z',
  testStart:'2026-01-05T00:00:00.000Z',
  trainingWeeks:26,testWeeks:26,
  horizon:4,maxWorkUnits:2500,
  regimes:[{id:'LOW_SETUP',fee:2},{id:'HIGH_SETUP',fee:8}],
  waitMiss:3,prepare:1.2,maintenance:0.2,handleEvent:0.3
});
const WEEK=7*86400000,EPS=1e-10;
function verify(ok,msg){if(!ok)throw Error('ASSERT_FAIL '+msg);}
function weeklyEvents(releases,complete){
  verify(complete===true,'incomplete source data cannot be scored');
  verify(Array.isArray(releases),'input must be array');
  const trainStart=Date.parse(CFG.trainingStart),end=Date.parse(CFG.testStart)+CFG.testWeeks*WEEK;
  verify(trainStart+CFG.trainingWeeks*WEEK===Date.parse(CFG.testStart),'contiguous weeks');
  const observed=new Array(CFG.trainingWeeks+CFG.testWeeks).fill(0),events=[],seen=new Set();
  for(const release of releases){
    if(release.draft===true||release.prerelease===true||!release.published_at)continue;
    const timestamp=Date.parse(release.published_at);
    if(!Number.isFinite(timestamp))continue;
    const id=String(release.id ?? release.html_url ?? release.tag_name);
    if(seen.has(id))continue;
    seen.add(id);
    if(timestamp<trainStart||timestamp>=end)continue;
    const index=Math.floor((timestamp-trainStart)/WEEK);
    verify(index>=0&&index<observed.length,'bad week bucket');
    observed[index]=1;
    events.push({id,tag:release.tag_name??'',published_at:release.published_at,
      url:release.html_url??'',weekIndex:index});
  }
  events.sort((a,b)=>a.published_at.localeCompare(b.published_at));
  return {training:observed.slice(0,CFG.trainingWeeks),
    holdout:observed.slice(CFG.trainingWeeks),events};
}
function available(enabled){
  return enabled?['MONITOR','DISABLE']:['WAIT','PREPARE','INSTALL'];
}
function transition(enabled,action,y,fee){
  verify((y===0||y===1),'only defined binary outcomes');
  verify(available(enabled).includes(action),'action unavailable in current state');
  switch(action){
    case 'WAIT':return {loss:CFG.waitMiss*y,enabled:false};
    case 'PREPARE':return {loss:CFG.prepare,enabled:false};
    case 'INSTALL':return {loss:fee+CFG.maintenance+CFG.handleEvent*y,enabled:true};
    case 'MONITOR':return {loss:CFG.maintenance+CFG.handleEvent*y,enabled:true};
    case 'DISABLE':return {loss:CFG.waitMiss*y,enabled:false};
  }
}
function belief(training){return {
  alpha:1+training.filter(y=>y===1).length,
  beta:1+training.filter(y=>y===0).length
};}
function posterior(s){return s.alpha/(s.alpha+s.beta);}
function oneStep(s,fee){
  const p=posterior(s),acts=available(s.enabled);
  const values=acts.map(action=>{
    const zero=transition(s.enabled,action,0,fee);
    const one=transition(s.enabled,action,1,fee);
    return {action,expected:(1-p)*zero.loss+p*one.loss};
  });
  let best=values[0];
  for(const x of values.slice(1))if(x.expected<best.expected-EPS)best=x;
  return {action:best.action,forecast:p,expected:best.expected,workUnits:1};
}
function fullLookahead(s,fee,cap=CFG.maxWorkUnits){
  verify(Number.isInteger(cap)&&cap>=0,'invalid budget');
  const ledger={max:cap,used:0,nodes:0,edges:0};
  function solve(a,b,enabled,h){
    if(h===0)return {value:0,action:null};
    const choices=available(enabled),cost=1+2*choices.length;
    if(ledger.used+cost>ledger.max)throw Error('BUDGET_EXHAUSTED');
    ledger.used+=cost;ledger.nodes++;ledger.edges+=2*choices.length;
    const p=a/(a+b);
    let best=null;
    for(const action of choices){
      let value=0;
      for(const y of [0,1]){
        const t=transition(enabled,action,y,fee);
        const next=solve(a+y,b+(1-y),t.enabled,h-1);
        value+=(y?p:1-p)*(t.loss+next.value);
      }
      if(best===null||value<best.value-EPS)best={action,value};
    }
    return best;
  }
  const result=solve(s.alpha,s.beta,s.enabled,CFG.horizon);
  return {action:result.action,forecast:posterior(s),expected:result.value,
    workUnits:ledger.used,nodes:ledger.nodes,edges:ledger.edges,
    status:'COMPLETE'};
}
function runReplay(releases,meta){
  verify(meta&&meta.complete===true,'DATA_INCOMPLETE');
  const {training,holdout,events}=weeklyEvents(releases,meta.complete);
  verify(training.length===26&&holdout.length===26,'wrong training/holdout length');
  const cases=[];
  for(const config of CFG.regimes){
    const models={
      P1:{...belief(training),enabled:false,totalLoss:0,actions:[],installWeek:null},
      P2:{...belief(training),enabled:false,totalLoss:0,actions:[],installWeek:null}
    };
    let multiverseTotalWork=0,certifications=0;
    const records=[];
    for(let i=0;i<holdout.length;i++){
      const arm1=models.P1,arm2=models.P2;
      verify(arm1.alpha===arm2.alpha&&arm1.beta===arm2.beta,'equal observed history');
      const before=[{...arm1},{...arm2}],a1=oneStep(arm1,config.fee);
      const a2=fullLookahead(arm2,config.fee);
      verify(a2.workUnits<=CFG.maxWorkUnits,'budget cap exceeded');
      multiverseTotalWork+=a2.workUnits;certifications++;
      // Both policies have decided before y_t is obtained from the historic stream.
      const y=holdout[i];
      const t1=transition(arm1.enabled,a1.action,y,config.fee);
      const t2=transition(arm2.enabled,a2.action,y,config.fee);
      for(const [key,action,result] of [['P1',a1,t1],['P2',a2,t2]]){
        const model=models[key];
        model.totalLoss+=result.loss;
        model.enabled=result.enabled;
        model.actions.push(action.action);
        if(action.action==='INSTALL'&&model.installWeek===null)model.installWeek=i+1;
        model.alpha+=y;model.beta+=(1-y);
      }
      records.push({
        week:i+1,weekStart:new Date(Date.parse(CFG.testStart)+i*WEEK).toISOString().slice(0,10),
        priorP:before[0].alpha/(before[0].alpha+before[0].beta),
        beforeEnabled:{P1:before[0].enabled,P2:before[1].enabled},
        action:{P1:a1.action,P2:a2.action},
        predictedExpected:{P1:a1.expected,P2:a2.expected},
        actualReleaseWeek:y,
        realizedCost:{P1:t1.loss,P2:t2.loss},
        afterEnabled:{P1:t1.enabled,P2:t2.enabled},
        simWork:a2.workUnits,
        virtualBranches:a2.nodes,
        allVirtualOutcomesOnly:true
      });
    }
    cases.push({regime:config.id,fee:config.fee,
      totalLoss:{P1:models.P1.totalLoss,P2:models.P2.totalLoss},
      deltaP2minusP1:models.P2.totalLoss-models.P1.totalLoss,
      installationWeeks:{P1:models.P1.installWeek,P2:models.P2.installWeek},
      actionCounts:Object.fromEntries(Object.entries(models).map(([k,v])=>{
        const counts={};for(const action of v.actions)counts[action]=(counts[action]||0)+1;
        return [k,counts];
      })),
      syntheticWork:{P1:26,P2:multiverseTotalWork,roots:certifications},
      weeks:records});
  }
  return {
    status:'READ_ONLY_REAL_EVENT_REPLAY_COMPLETED',
    metadata:{sourceRepo:meta.repo,sourcePages:meta.pages,entriesFetched:meta.entriesFetched,
      stopReason:meta.stopReason,trainWeeks:26,holdoutWeeks:26,
      trainReleasePositiveWeeks:training.reduce((a,b)=>a+b,0),
      holdoutReleasePositiveWeeks:holdout.reduce((a,b)=>a+b,0),
      trainReleaseCount:events.filter(x=>x.weekIndex<26).length,
      holdoutReleaseCount:events.filter(x=>x.weekIndex>=26).length,
      events},
    cases,
    limitations:{
      interventionEffects:'TOY_ONLY_UNOBSERVED',
      releaseWeekOutcomes:'REAL_PUBLIC_HISTORY',
      prompts:'DETERMINISTIC_POLICY_PROXIES_NOT_LLM_AB_TEST',
      productionTouched:false,
      operationalCost:'WORK_UNITS_NOT_TIME_TOKENS_DOLLARS'
    }
  };
}
function syntheticFixtureTests(){
  const tests=[];const check=(name,test)=>{verify(test,'fixture '+name);tests.push(name);};
  const low=CFG.regimes[0],hi=CFG.regimes[1];
  const high={alpha:27,beta:1,enabled:false};
  const uncertain={alpha:14,beta:14,enabled:false};
  const poor={alpha:1,beta:27,enabled:false};
  const bHigh=fullLookahead(high,low.fee);
  const bUncertain=fullLookahead(uncertain,low.fee);
  const bPoor=fullLookahead(poor,low.fee);
  const aHigh=oneStep(high,low.fee);
  const hHigh=fullLookahead(high,hi.fee);
  check('two different action sets',available(false).join(',')==='WAIT,PREPARE,INSTALL'&&available(true).join(',')==='MONITOR,DISABLE');
  check('install unlocks MONITOR at next point',transition(false,'INSTALL',0,low.fee).enabled);
  check('WAIT cannot take back an already missed week',transition(false,'WAIT',1,low.fee).loss===3);
  check('single-step baseline does not invest on high prior',aHigh.action==='PREPARE');
  check('multiverse discovers option value at high prior',bHigh.action==='INSTALL');
  check('multiverse discovers option value at uncertain prior',bUncertain.action==='INSTALL');
  check('multiverse does not automatically install with low prior',bPoor.action==='WAIT');
  check('expensive install is rejected on high prior',hHigh.action!=='INSTALL');
  check('shared model budget obeyed for all sample states',[bHigh,bPoor,bUncertain,hHigh].every(x=>x.workUnits<=CFG.maxWorkUnits));
  check('ledger reconciles decisions+edges',[bHigh,bPoor,bUncertain,hHigh].every(x=>x.workUnits===x.nodes+x.edges));
  check('virtual outcomes do not update observed prior',high.alpha===27&&high.beta===1);
  check('feedback updates beta only from observed y',(()=>{const b=belief([0,1,0]);return b.alpha===2&&b.beta===3;})());
  check('no scenario probabilities outside bounds',[high,uncertain,poor].every(x=>posterior(x)>0&&posterior(x)<1));
  check('stop on insufficient budget',(()=>{try{fullLookahead(high,low.fee,4);return false}catch(e){return e.message==='BUDGET_EXHAUSTED';}})());
  check('out-of-model outcome rejected',(()=>{try{transition(false,'WAIT',2,2);return false}catch(e){return e.message.startsWith('ASSERT_FAIL');}})());
  // Synthetic fixture: fully known outcomes are not real Github evidence.
  const initialDate=Date.parse(CFG.trainingStart);
  const make=(all)=>Array.from({length:52},(_,i)=>all(i)?{id:i+1,tag_name:'fixture-'+i,
    published_at:new Date(initialDate+i*WEEK+12*3600000).toISOString(),
    html_url:'https://example.invalid/fixture-'+i,prerelease:false,draft:false}:null).filter(Boolean);
  const always=runReplay(make(()=>true),{complete:true,repo:'SYNTHETIC_FIXTURE',pages:1,entriesFetched:52,stopReason:'FIXTURE'});
  const never=runReplay(make(()=>false),{complete:true,repo:'SYNTHETIC_FIXTURE',pages:1,entriesFetched:0,stopReason:'FIXTURE'});
  check('fixture source partitions 26/26',always.metadata.trainReleasePositiveWeeks===26&&always.metadata.holdoutReleasePositiveWeeks===26);
  check('high release fixture one-step remains myopic',always.cases[0].installationWeeks.P1===null);
  check('high release fixture multiverse installs in low-fee scenario',always.cases[0].installationWeeks.P2===1);
  check('high release fixture multiverse has lower toy loss than baseline',always.cases[0].deltaP2minusP1<0);
  check('no-release fixture does not pay setup fee',never.cases.every(x=>x.installationWeeks.P2===null));
  check('no-release fixture both policies incur zero toy loss',never.cases.every(x=>x.totalLoss.P1===0&&x.totalLoss.P2===0));
  check('high setup fixture rejects unnecessary installation',always.cases[1].installationWeeks.P2===null);
  check('equal public observations update both policies regardless of action',always.cases.every(c=>c.weeks.every(w=>w.actualReleaseWeek===1)));
  check('holdout count is always 26',never.cases.every(c=>c.weeks.length===26));
  check('no real-world action in fixture',always.limitations.productionTouched===false);
  return {status:'PASS',checks:tests.length,testNames:tests,
    examples:{high,bHigh:bHigh.action,bPoor:bPoor.action,hHigh:hHigh.action,
      alwaysLowFee:always.cases[0].totalLoss,
      alwaysHighFee:always.cases[1].totalLoss,
      neverLowFee:never.cases[0].totalLoss},
    budgets:[bHigh.workUnits,bPoor.workUnits,bUncertain.workUnits,hHigh.workUnits]};
}
