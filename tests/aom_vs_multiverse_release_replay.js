'use strict';
/**
 * Test-LaB Cycle 015: public release-history retrospective, not AOM LLM A/B.
 * The algorithm is frozen before reading eligible 2025/early-2026 outcomes.
 * Only aggregated binary per-week history may enter forecast functions.
 * No network access or mutations.
 */
const S = Object.freeze({
  trainingStart:'2024-01-01T00:00:00.000Z',
  testStart:'2025-01-06T00:00:00.000Z',
  testWeeks:52, trainingWeeks:53,
  horizon:3,maxWork:105,recentWeeks:8,
  mixingWeightRecent:0.5,
  prepareCost:1,missCost:3
});
const WEEK_MS=7*86400000,DAY_MS=86400000,EPS=1e-9;
const assert=(condition,what)=>{if(!condition)throw Error('ASSERT_FAIL '+what);};
const clamp01=x=>Math.max(0,Math.min(1,x));
function summarize(releases){
  const trainStart=Date.parse(S.trainingStart),testStart=Date.parse(S.testStart);
  const end=testStart+S.testWeeks*WEEK_MS;
  const weekly=new Array(S.trainingWeeks+S.testWeeks).fill(0);
  const used=[];
  const seen=new Set();
  for(const raw of releases){
    if(raw.draft===true||raw.prerelease===true||!raw.published_at)continue;
    const t=Date.parse(raw.published_at);
    if(!Number.isFinite(t))continue;
    const id=String(raw.id??raw.tag_name??raw.html_url);
    if(seen.has(id))continue;
    seen.add(id);
    if(t<trainStart||t>=end)continue;
    const w=Math.floor((t-trainStart)/WEEK_MS);
    if(w<0||w>=weekly.length)throw Error('RELEASE_OUT_OF_RANGE');
    weekly[w]=1;
    used.push({id,tag:raw.tag_name||'',published_at:raw.published_at,html_url:raw.html_url||'',weekIndex:w});
  }
  used.sort((a,b)=>a.published_at.localeCompare(b.published_at));
  return {weekly,used,
    training:weekly.slice(0,S.trainingWeeks),test:weekly.slice(S.trainingWeeks),
    bounds:{trainStart:S.trainingStart,testStart:S.testStart,
      testEnd:new Date(end).toISOString(),trainWeeks:S.trainingWeeks,testWeeks:S.testWeeks}};
}
function forecast(history,mode){
  assert(history.length>=S.trainingWeeks,'minimum training length');
  const positives=history.reduce((s,v)=>s+v,0);
  const long=(positives+1)/(history.length+2);
  if(mode==='P1')return long;
  if(mode==='P2'){
    const recent=history.slice(-S.recentWeeks);
    const r=(recent.reduce((s,v)=>s+v,0)+1)/(recent.length+2);
    return 0.5*long+0.5*r;
  }
  throw Error('UNKNOWN_POLICY');
}
function chooseAt(p) {return p>1/3+EPS?'PREPARE':'WAIT';}
function pointLoss(action,outcome){
  if(action==='PREPARE')return S.prepareCost;
  if(action==='WAIT')return outcome?S.missCost:0;
  throw Error('UNDECLARED_ACTION');
}
function multiversePlan(history,maxWork=S.maxWork){
  const ledger={used:0,maxWork};let nodes=0,edges=0;
  // ALL nature/action branches are expanded to a declared finite H=3.
  function solve(branchHistory,h){
    if(h===0)return {value:0,choice:null};
    const work=1+2*2;
    if(ledger.used+work>ledger.maxWork)throw Error('BUDGET_EXHAUSTED');
    ledger.used+=work;nodes++;edges+=4;
    const p=forecast(branchHistory,'P2');
    const a=[];
    for(const action of ['WAIT','PREPARE']){
      let value=0;
      for(const outcome of [0,1]){
        const pr=outcome?p:1-p;
        // Future learning is branch-local. No actual future history is read.
        const continuation=solve([...branchHistory,outcome],h-1).value;
        value+=pr*(pointLoss(action,outcome)+continuation);
      }
      a.push({action,value});
    }
    // lower expected synthetic decision loss is better; ties WAIT
    const first=a[0],second=a[1];
    return second.value+EPS<first.value?
      {value:second.value,choice:'PREPARE'}:{value:first.value,choice:'WAIT'};
  }
  const root=solve(history,S.horizon);
  assert(ledger.used===105,'full expansion work total');
  assert(nodes===21&&edges===84,'all declared root and child branches evaluated');
  // Since actions have NO effect on observation availability or future state,
  // multiverse immediate choice must mathematically match threshold policy.
  assert(root.choice===chooseAt(forecast(history,'P2')),
    'no false lookahead advantage for action-independent environment');
  return {rootProb:forecast(history,'P2'),action:root.choice,
    rootValue:root.value,work:ledger.used,nodes,edges};
}
function runBenchmark(releases,sourceMeta){
  assert(sourceMeta&&sourceMeta.completeCutoff===true,
    'DATA_INCOMPLETE cannot score');
  const data=summarize(releases);
  assert(data.training.length===53&&data.test.length===52,'week counts');
  const trainPos=data.training.reduce((a,b)=>a+b,0);
  const p0=(1+trainPos)/(2+S.trainingWeeks);
  const history=[...data.training],records=[],brier={P0:0,P1:0,P2:0},
    loss={P0:0,P1:0,P2:0},prepareCount={P0:0,P1:0,P2:0};
  for(let t=0;t<S.testWeeks;t++){
    assert(history.length===S.trainingWeeks+t,'time barrier: no future input');
    const p1=forecast(history,'P1');
    const plan=multiversePlan(history);
    const p2=plan.rootProb,forecastSet={P0:p0,P1:p1,P2:p2};
    const decisions={P0:chooseAt(p0),P1:chooseAt(p1),P2:plan.action};
    // KEY FIREWALL: all p/action values are frozen above before y is read.
    const actual=data.test[t];
    for(const [arm,p] of Object.entries(forecastSet)){
      assert(p>=0&&p<=1,'probability bound');
      brier[arm]+=(p-actual)**2;
      loss[arm]+=pointLoss(decisions[arm],actual);
      if(decisions[arm]==='PREPARE')prepareCount[arm]++;
    }
    records.push({index:t+1,weekStart:new Date(Date.parse(S.testStart)+t*WEEK_MS).toISOString().slice(0,10),
      forecast:forecastSet,decisions,actual,simulatedWorkUnits:plan.work,
      lookaheadNodes:plan.nodes,lookaheadEdges:plan.edges});
    // Historical observation revealed here only, then reused at point t+1.
    history.push(actual);
  }
  const means=Object.fromEntries(Object.entries(brier).map(([k,v])=>[k,v/S.testWeeks]));
  return {
    status:'PREQUENTIAL_HISTORICAL_REPLAY_COMPLETE',
    sourceMeta:{repo:'pytest-dev/pytest',pages:sourceMeta.pages,entriesFetched:sourceMeta.entriesFetched,
      stoppingReason:sourceMeta.stoppingReason},
    data:{trainingWeeks:53,testWeeks:52,trainingPositiveWeeks:trainPos,
      testPositiveWeeks:data.test.reduce((a,b)=>a+b,0),
      stableReleasesInWindow:data.used.length,
      trainingStableReleases:data.used.filter(x=>x.weekIndex<53).length,
      testStableReleases:data.used.filter(x=>x.weekIndex>=53).length,
      releases:data.used},
    outcomes:{meanBrier:means,totalBrier:brier,syntheticLoss:loss,
      prepareWeeks:prepareCount,deltaP2minusP1:means.P2-means.P1,
      lossDifferenceP2minusP1:loss.P2-loss.P1},
    resources:{externalInputShared:true,maxWorkUnitsPerPoint:105,
      baselineForecastWorkProxyPerPoint:1,multiverseWorkUnitsTotal:52*105,
      lookaheadRootReplans:52},
    transparency:{
      modelComparison:'FROZEN_POLICY_PROXIES_NOT_INDEPENDENT_LLM_BEHAVIOR_TRIAL',
      realWorldBusinessResult:'UNVERIFIED',
      rewardUnits:'ARBITRARY_SYNTHETIC_ATTENTION_LOSS',
      branchBeliefs:'SIMULATED_ONLY',
      outOfSampleData:'PUBLIC_GITHUB_RELEASE_EVENTS_2025',
      probabilityWeights:'ASSUMED_NOT_CALIBRATED'
    },
    weekly:records
  };
}
