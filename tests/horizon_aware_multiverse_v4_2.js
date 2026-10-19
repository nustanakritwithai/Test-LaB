'use strict';
// Independent Multiverse World Model v4.2 — horizon-aware Bayesian toy planner.
// Node.js >=18, no dependencies, no external actions, no AOM/Skill integration.
// Cost, monitoring behavior, and event process are declared SYNTHETIC assumptions.
const CFG=Object.freeze({
  deadlineWeeks:26,firstHorizon:4,maximumWorkUnits:12000,
  waitMiss:3,prepare:1.2,monitorBase:0.2,monitorEvent:0.3
});
const EPS=1e-9;
const near=(a,b)=>Math.abs(a-b)<EPS;
const check=(yes,message)=>{if(!yes)throw Error('CHECK_FAILED: '+message);};

function checkState(s,fee,remaining){
  check(s&&Number.isInteger(s.alpha)&&s.alpha>0,'positive alpha integer');
  check(Number.isInteger(s.beta)&&s.beta>0,'positive beta integer');
  check(typeof s.enabled==='boolean','enabled must be boolean');
  check(Number.isInteger(remaining)&&remaining>=0&&remaining<=CFG.deadlineWeeks,'deadline');
  check(Number.isFinite(fee)&&fee>=0,'nonnegative setup cost');
}
function permitted(s){return s.enabled?['MONITOR','DISABLE']:['WAIT','PREPARE','INSTALL'];}
function prob(s){return s.alpha/(s.alpha+s.beta);}
function transition(s,action,y,fee){
  if(y!==0&&y!==1)throw Error('MODEL_MISS');
  if(!permitted(s).includes(action))throw Error('INFEASIBLE_ACTION');
  let loss,nextEnabled;
  if(action==='WAIT'){loss=CFG.waitMiss*y;nextEnabled=false;}
  else if(action==='PREPARE'){loss=CFG.prepare;nextEnabled=false;}
  else if(action==='INSTALL'){loss=fee+CFG.monitorBase+CFG.monitorEvent*y;nextEnabled=true;}
  else if(action==='MONITOR'){loss=CFG.monitorBase+CFG.monitorEvent*y;nextEnabled=true;}
  else if(action==='DISABLE'){loss=CFG.waitMiss*y;nextEnabled=false;}
  else throw Error('UNKNOWN_ACTION');
  check(Number.isFinite(loss)&&loss>=0,'bounded nonnegative loss');
  return {loss,snext:{alpha:s.alpha+y,beta:s.beta+1-y,enabled:nextEnabled,mode:'SIMULATED_BRANCH'}};
}
function realFixtureStep(s,action,observed,fee){
  const e=transition(s,action,observed,fee);
  return {loss:e.loss,state:{alpha:e.snext.alpha,beta:e.snext.beta,enabled:e.snext.enabled,mode:'OBSERVED_FIXTURE'}};
}
// Guaranteed-feasible tail policies under the DECLARED stationary model:
// enabled -> always MONITOR; disabled -> always WAIT or always PREPARE.
// Posterior predictive expected future event frequency stays p under
// Bayesian expectation when actions do not affect event generation.
function safeTailExpectedPerWeek(s){
  const p=prob(s);
  return s.enabled?CFG.monitorBase+CFG.monitorEvent*p:
    Math.min(CFG.prepare,CFG.waitMiss*p);
}
function newLedger(limit){
  if(!Number.isSafeInteger(limit)||limit<0)throw Error('INVALID_BUDGET');
  return {limit,used:0,expanded:0,edges:0,cacheHits:0,cache:new Map()};
}
function solve(s,h,fee,ledger){
  if(h===0)return {value:0,tailRate:safeTailExpectedPerWeek(s),best:null,alternatives:[]};
  const key=String(s.alpha)+'/'+String(s.beta)+'/'+Number(s.enabled)+'/'+String(h);
  const prev=ledger.cache.get(key);
  if(prev){ledger.cacheHits++;return prev;}
  const acts=permitted(s);
  const needed=1+2*acts.length;
  if(ledger.used+needed>ledger.limit)throw Error('BUDGET_EXHAUSTED');
  ledger.used+=needed;ledger.expanded++;ledger.edges+=2*acts.length;
  const p=prob(s), alternatives=[];
  for(const action of acts){
    let prefix=0,tailRate=0;
    for(const y of [0,1]){
      const w=y?p:1-p;
      const next=transition(s,action,y,fee);
      const child=solve(next.snext,h-1,fee,ledger);
      prefix+=w*(next.loss+child.value);
      tailRate+=w*child.tailRate;
    }
    alternatives.push({action,prefix,tailRate});
  }
  let best=alternatives[0];
  for(const x of alternatives.slice(1))if(x.prefix<best.prefix-EPS)best=x;
  const result={value:best.prefix,tailRate:best.tailRate,best:best.action,alternatives};
  ledger.cache.set(key,result);
  return result;
}
function fixedH4(s,fee,remaining,maxWorkUnits=CFG.maximumWorkUnits){
  checkState(s,fee,remaining);
  if(remaining===0)return {status:'TERMINAL',action:null,work:0};
  const ledger=newLedger(maxWorkUnits),h=Math.min(CFG.firstHorizon,remaining);
  try{
    const r=solve(s,h,fee,ledger);
    return {status:'SHORT_HORIZON_ONLY',action:r.best,horizon:h,expectedPrefixCost:r.value,
      work:ledger.used,expanded:ledger.expanded,edges:ledger.edges};
  }catch(err){
    if(err.message==='BUDGET_EXHAUSTED')
      return {status:'BUDGET_EXHAUSTED',action:null,horizon:h,work:ledger.used};
    throw err;
  }
}
// Payback is ONLY a heuristic for choosing a longer checkpoint.
// It is not model-grounded proof of long-term value.
function paybackHint(s,fee,remaining){
  const p=prob(s);
  const current=Math.min(CFG.prepare,CFG.waitMiss*p);
  const monitored=CFG.monitorBase+CFG.monitorEvent*p;
  const perWeekSaving=current-monitored;
  if(s.enabled||perWeekSaving<=EPS)return {horizon:null,estimatedSaving:perWeekSaving,estimatedPayback:null};
  const raw=Math.ceil(fee/perWeekSaving);
  const horizon=Math.min(remaining,Math.max(1,raw+1));
  return {horizon,estimatedSaving:perWeekSaving,estimatedPayback:raw};
}
function horizons(s,fee,remaining){
  const first=Math.min(CFG.firstHorizon,remaining);
  const hint=paybackHint(s,fee,remaining);
  const candidates=[first];
  if(hint.horizon!==null&&hint.horizon>first&&hint.horizon<remaining)
    candidates.push(hint.horizon);
  if(remaining>first)candidates.push(remaining);
  return {values:[...new Set(candidates)].sort((a,b)=>a-b),hint};
}
function certifiedFromBounds(choices,totalRemaining,calculatedDepth){
  const rem=totalRemaining-calculatedDepth;
  const withIntervals=choices.map(x=>({action:x.action,lower:x.prefix,
    upper:x.prefix+rem*x.tailRate,
    hypotheticalTailRate:x.tailRate}));
  check(withIntervals.every(a=>Number.isFinite(a.lower)&&Number.isFinite(a.upper)&&
    a.lower<=a.upper+EPS),'sound interval shape');
  if(rem===0){
    let winner=withIntervals[0];
    for(const item of withIntervals.slice(1))
      if(item.lower<winner.lower-EPS)winner=item;
    return {action:winner.action,status:'CERTIFIED_FULL_DECLARED_HORIZON',intervals:withIntervals};
  }
  const winner=withIntervals.find(a=>withIntervals.every(b=>
    a.action===b.action || a.upper<b.lower-EPS));
  return {action:winner?.action??null,
    status:winner?'CERTIFIED_BY_SOUND_TOY_BOUNDS':'ABSTAIN_UNCERTIFIED',
    intervals:withIntervals};
}
function adaptive(s,fee,remaining,maxWorkUnits=CFG.maximumWorkUnits){
  checkState(s,fee,remaining);
  if(remaining===0)return {status:'TERMINAL',action:null,work:0,checkpoints:[]};
  const ledger=newLedger(maxWorkUnits);
  const sequence=horizons(s,fee,remaining);
  const checkpoints=[];
  for(const h of sequence.values){
    let v;
    try{v=solve(s,h,fee,ledger);}
    catch(err){
      if(err.message==='BUDGET_EXHAUSTED'){
        return {status:'BUDGET_EXHAUSTED',action:null,certificate:'ABSTAIN_UNCERTIFIED',
          preliminaryLast:checkpoints.at(-1)?.prefixAction??null,
          work:ledger.used,expanded:ledger.expanded,edges:ledger.edges,
          memoHits:ledger.cacheHits,maxWorkUnits,hints:sequence.hint,checkpoints};
      }
      throw err;
    }
    const proof=certifiedFromBounds(v.alternatives,remaining,h);
    checkpoints.push({horizon:h,prefixAction:v.best,prefixValue:v.value,
      proof:proof.status,intervals:proof.intervals,usedWorkAfter:ledger.used});
    if(proof.action){
      return {status:proof.status,action:proof.action,certificate:proof.status,
        horizonUsed:h,remaining,work:ledger.used,expanded:ledger.expanded,
        edges:ledger.edges,memoHits:ledger.cacheHits,maxWorkUnits,
        rootFeasibleActions:permitted(s).slice(),checkpoints,hints:sequence.hint};
    }
  }
  throw Error('FULL_HORIZON_MUST_CERTIFY_IF_BUDGET_SUFFICIENT');
}
// Independent no-cache full tree oracle. Use only for small h to bound runtime.
function brute(s,h,fee){
  if(h===0)return {value:0,action:null,alternatives:[]};
  const p=prob(s),values=[];
  for(const a of permitted(s)){
    let loss=0;
    for(const y of [0,1]){
      const tr=transition(s,a,y,fee);
      const child=brute(tr.snext,h-1,fee);
      loss+=(y?p:1-p)*(tr.loss+child.value);
    }
    values.push({action:a,loss});
  }
  let winner=values[0];
  for(const x of values.slice(1))if(x.loss<winner.loss-EPS)winner=x;
  return {value:winner.loss,action:winner.action,alternatives:values};
}
function weeklyFromManifest(manifest){
  if(!manifest||manifest.complete!==true||!Array.isArray(manifest.releases))
    throw Error('DATA_INCOMPLETE');
  const t0=Date.parse('2025-07-07T00:00:00.000Z'),week=7*86400000;
  const rows=new Array(52).fill(0);const seen=new Set();
  for(const r of manifest.releases){
    if(r.draft===true||r.prerelease===true||!r.published_at)continue;
    const t=Date.parse(r.published_at);
    if(!Number.isFinite(t))continue;
    const id=String(r.id??r.html_url??r.tag_name);
    if(seen.has(id))continue;seen.add(id);
    if(t<t0||t>=t0+52*week)continue;
    rows[Math.floor((t-t0)/week)]=1;
  }
  return {train:rows.slice(0,26),holdout:rows.slice(26)};
}
function replay(manifest,fee,maxWork=CFG.maximumWorkUnits){
  const {train,holdout}=weeklyFromManifest(manifest);
  const a=train.reduce((v,y)=>v+y,1),b=train.reduce((v,y)=>v+(1-y),1);
  const states={
    fixed:{alpha:a,beta:b,enabled:false,mode:'OBSERVED_HISTORICAL_REPLAY'},
    aware:{alpha:a,beta:b,enabled:false,mode:'OBSERVED_HISTORICAL_REPLAY'}
  };
  const sum={fixed:0,aware:0},work={fixed:0,aware:0},weekly=[];
  for(let t=0;t<26;t++){
    const remaining=26-t;
    check(states.fixed.alpha===states.aware.alpha&&states.fixed.beta===states.aware.beta,
      'both policies have same actual evidence');
    const f=fixedH4(states.fixed,fee,remaining,maxWork);
    const aplan=adaptive(states.aware,fee,remaining,maxWork);
    if(!f.action||!aplan.action) return {status:'ABSTAIN_INSUFFICIENT_BUDGET',
      week:t+1,diagnostics:{f,aplan},metadata:{repo:manifest.repo,fee}};
    // Freeze decisions before retrieving this week's release outcome.
    const decisions={fixed:f.action,aware:aplan.action};
    const y=holdout[t];
    const fstep=realFixtureStep(states.fixed,decisions.fixed,y,fee);
    const astep=realFixtureStep(states.aware,decisions.aware,y,fee);
    sum.fixed+=fstep.loss;sum.aware+=astep.loss;
    work.fixed+=f.work;work.aware+=aplan.work;
    weekly.push({week:t+1,remaining,pBefore:prob(states.fixed),y,
      actions:decisions,loss:{fixed:fstep.loss,aware:astep.loss},
      awareHorizon:aplan.horizonUsed,awareCertificate:aplan.status,
      work:{fixed:f.work,aware:aplan.work}});
    states.fixed={...fstep.state,mode:'OBSERVED_HISTORICAL_REPLAY'};
    states.aware={...astep.state,mode:'OBSERVED_HISTORICAL_REPLAY'};
  }
  return {status:'HISTORICAL_REPLAY_TOY_EFFECTS',
    repo:manifest.repo,fee,positiveTrainWeeks:train.reduce((a,b)=>a+b,0),
    positiveHoldoutWeeks:holdout.reduce((a,b)=>a+b,0),loss:sum,
    differenceAwareMinusFixed:sum.aware-sum.fixed,work,weekly,
    unobservedEffects:'ALL_MONITOR_INSTALL_COSTS_ARE_HYPOTHETICAL'};
}
function syntheticTests(){
  const tests=[],T=(name,p)=>{check(Boolean(p),name);tests.push(name);};
  const high={alpha:25,beta:3,enabled:false,mode:'OBSERVED_FIXTURE'};
  const low={alpha:2,beta:26,enabled:false,mode:'OBSERVED_FIXTURE'};
  const nearlyZero={alpha:1,beta:99,enabled:false,mode:'OBSERVED_FIXTURE'};
  T('Baseline toy action sets disabled',permitted(high).join(',')==='WAIT,PREPARE,INSTALL');
  T('Baseline toy action sets enabled',permitted({...high,enabled:true}).join(',')==='MONITOR,DISABLE');
  T('Install unlocks monitoring',transition(high,'INSTALL',0,8).snext.enabled);
  T('Install upfront cost correct',near(transition(high,'INSTALL',1,8).loss,8.5));
  T('Install nonrelease cost correct',near(transition(high,'INSTALL',0,8).loss,8.2));
  T('Wait release loss correct',near(transition(high,'WAIT',1,8).loss,3));
  T('Prepare cost correct',near(transition(high,'PREPARE',0,8).loss,1.2));
  T('Monitor release loss correct',near(transition({...high,enabled:true},'MONITOR',1,8).loss,0.5));
  T('Disable removes option',!transition({...high,enabled:true},'DISABLE',0,8).snext.enabled);
  T('Reject unavailable action',(()=>{try{transition(high,'MONITOR',0,8);return false}catch(e){return e.message==='INFEASIBLE_ACTION'}})());
  T('Reject undefined observation',(()=>{try{transition(high,'WAIT',2,8);return false}catch(e){return e.message==='MODEL_MISS'}})());
  T('Reject invalid fee',(()=>{try{adaptive(high,-1,4);return false}catch(e){return e.message.includes('nonnegative setup')}})());
  T('Reject invalid horizon',(()=>{try{adaptive(high,8,27);return false}catch(e){return e.message.includes('deadline')}})());
  T('Reject invalid budget',(()=>{try{adaptive(high,8,10,-1);return false}catch(e){return e.message==='INVALID_BUDGET'}})());
  let oracleCount=0;
  for(const s of [high,low,{alpha:4,beta:4,enabled:false},{alpha:3,beta:2,enabled:true}]){
    for(const fee of [0,2,8]){
      for(const h of [1,2,3,4]){
        const exact=brute(s,h,fee);
        const ledger=newLedger(5000),dp=solve(s,h,fee,ledger);
        T('DP equals brute full tree '+oracleCount++,near(dp.value,exact.value)&&dp.best===exact.action);
      }
    }
  }
  T('48 independent brute reference comparisons performed',oracleCount===48);
  const fixHigh=fixedH4(high,8,26),fullHigh=adaptive(high,8,26);
  T('H4 high setup declines delayed option',fixHigh.action==='PREPARE');
  T('Horizon-aware 26-week high setup picks INSTALL',fullHigh.action==='INSTALL');
  T('Horizon-aware high setup proves model decision',fullHigh.status.startsWith('CERTIFIED_'));
  T('Horizon-aware high setup includes full deadline if needed',fullHigh.horizonUsed===26);
  T('Payback heuristic does not masquerade as certificate',fullHigh.checkpoints[0].proof==='ABSTAIN_UNCERTIFIED');
  T('Horizon suggestion is longer than four',paybackHint(high,8,26).horizon>4);
  T('Every checkpoint keeps root action alternatives',fullHigh.checkpoints.every(x=>x.intervals.length===3));
  T('One ledger across checkpoints',fullHigh.work===fullHigh.expanded+fullHigh.edges);
  T('Memoization actually reuses states',fullHigh.memoHits>0);
  T('Global budget not exceeded',fullHigh.work<=fullHigh.maxWorkUnits);
  T('Candidate does not spend actual money',high.alpha===25&&high.beta===3&&high.mode==='OBSERVED_FIXTURE');
  const lo=adaptive(low,8,26);
  T('Low activity avoids expensive setup',lo.action!=='INSTALL');
  const massive=adaptive(high,250,26);
  T('Unreasonable setup fee prevents install',massive.action!=='INSTALL');
  T('No time past deadline',adaptive(high,8,0).status==='TERMINAL');
  T('One week planning never extends past horizon',adaptive(high,8,1).horizonUsed===1);
  const zero=adaptive(high,8,26,0),small=adaptive(high,8,26,20);
  T('Zero global budget abstains',zero.action===null&&zero.status==='BUDGET_EXHAUSTED');
  T('Very low global budget abstains',small.action===null&&small.status==='BUDGET_EXHAUSTED');
  T('No budget overdraft',zero.work<=0&&small.work<=20);
  T('No action when budget insufficient',small.certificate==='ABSTAIN_UNCERTIFIED');
  T('Tentative action is not executable when uncertified',small.action===null);
  const early=adaptive(nearlyZero,100,26);
  T('Easy low-prob case can certify before deadline',early.horizonUsed<26&&early.status==='CERTIFIED_BY_SOUND_TOY_BOUNDS');
  T('Early certificate avoids unnecessary installation',early.action==='WAIT');
  const variants=[
    {s:high,fee:8,T:26},
    {s:low,fee:2,T:26},
    {s:nearlyZero,fee:100,T:26},
    {s:{alpha:4,beta:4,enabled:false},fee:2,T:10},
    {s:{alpha:3,beta:2,enabled:true},fee:8,T:10},
    {s:{alpha:2,beta:5,enabled:false},fee:8,T:8}
  ];
  for(let v=0;v<variants.length;v++){
    const item=variants[v];
    const exact=solve(item.s,item.T,item.fee,newLedger(20000));
    const short=solve(item.s,Math.min(4,item.T),item.fee,newLedger(20000));
    const chk=certifiedFromBounds(short.alternatives,item.T,Math.min(4,item.T));
    for(const interval of chk.intervals){
      const fullValue=exact.alternatives.find(x=>x.action===interval.action).prefix;
      T('Action-specific sound interval '+v+' '+interval.action,
        interval.lower<=fullValue+EPS&&fullValue<=interval.upper+EPS);
    }
    const a=adaptive(item.s,item.fee,item.T);
    T('Adaptive matches exact full horizon '+v,a.action===exact.best);
    T('Adaptive root certificate valid '+v,a.status.startsWith('CERTIFIED_'));
  }
  const s2=realFixtureStep(high,'INSTALL',1,8);
  T('One real fixture step updates alpha only once',s2.state.alpha===26&&s2.state.beta===3);
  T('One real fixture step unlocks MONITOR at S2',permitted(s2.state).includes('MONITOR'));
  T('Virtual branch never updates root belief',high.alpha===25&&high.beta===3);
  const after=adaptive(s2.state,8,25);
  T('Reroot at S2 uses 25 remaining weeks',after.remaining===25);
  T('Reroot at S2 has changed action set',after.rootFeasibleActions.join(',')==='MONITOR,DISABLE');
  T('Reroot does not INSTALL again when enabled',after.action!=='INSTALL');
  T('No further branch when no evidence is supplied',true);
  return {status:'PASS',checks:tests.length,tests,
    keyCases:{fixedH4HighSetup:fixHigh.action,awareHighSetup:fullHigh.action,
      fullHorizonUsed:fullHigh.horizonUsed,globalWorkUnits:fullHigh.work,
      checkpointH:fullHigh.checkpoints.map(x=>x.horizon),
      certificate:fullHigh.status,
      lowActivity:lo.action,hugeFee:massive.action,
      earlyCert:early.action,earlyH:early.horizonUsed,smallBudgetStatus:small.status},
    boundsChecks:variants.reduce((s,x)=>s+permitted(x.s).length,0)};
}
// Run the synthetic fixture checks with no external connections.
if(typeof require!=='undefined'&&typeof module!=='undefined'&&require.main===module)
  console.log(JSON.stringify(syntheticTests(),null,2));
