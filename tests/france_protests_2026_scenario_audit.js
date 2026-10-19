'use strict';
/*
 * Multiverse World Model v4.2 — FRANCE OCT 2026 QUALITATIVE SCENARIO AUDIT
 * Public-event analysis only. No prediction probability, actor ranking,
 * politics recommendation, external network, or production mutation.
 * Inputs are UNOBSERVED future scenario dimensions, not assertions.
 * Run: node tests/france_protests_2026_scenario_audit.js
 */
const snapshot=Object.freeze({
  asOf:"2026-10-20",
  latestVerifiedSourceDate:"2026-10-19",
  mode:"OBSERVED_CURRENT_REPORTS",
  upcoming:["2026-10-24","2026-11-05"],
  geography:"FRANCE",
  evidenceClass:"DATED_PUBLIC_REPORTS",
  model:"INDEPENDENT_MULTIVERSE_4.2_QUALITATIVE"
});
const axes=Object.freeze({
  S1:{
    mobilization:["SUSTAINED_OR_BROAD","LIMITED_OR_DISPERSED"],
    incidents:["SIGNIFICANT_INCIDENTS_REPORTED","NO_SIGNIFICANT_INCIDENTS_CONFIRMED"],
    educationResponse:["IMPLEMENTATION_VERIFIED","IMPLEMENTATION_NOT_VERIFIED"]
  },
  S2:{
    crossSectorMobilization:["BROAD_CONFIRMED","LIMITED_OR_NOT_CONFIRMED"],
    policyAndBudgetProgress:["CONCRETE_CHANGE_DOCUMENTED","NO_CHANGE_VERIFIED"]
  }
});
const cross=entries=>entries.reduce((out,[name,variants])=>
  out.flatMap(parent=>variants.map(value=>({...parent,[name]:value}))),[{}]);
const first=cross(Object.entries(axes.S1));
const second=cross(Object.entries(axes.S2));
function evaluate(budget){
  if(!Number.isSafeInteger(budget)||budget<0)throw Error("INVALID_BUDGET");
  const rootCost=1+first.length;
  if(budget<rootCost)return {status:"BUDGET_EXHAUSTED",
    root:"UNEXPLORED",spent:0,expansions:0,edges:0,unexploredRoot:1,
    unexploredS1:0,leaves:[],actionCertificate:null};
  let spent=rootCost,expansions=1,edges=first.length;
  const leaves=[];
  let expandedS1=0;
  for(const s1 of first){
    const atomicCost=1+second.length;
    if(spent+atomicCost>budget)break;
    spent+=atomicCost;expansions++;edges+=second.length;expandedS1++;
    for(const s2 of second){
      leaves.push({S1:{...s1},S2:{...s2},mode:"SIMULATED_BRANCH",
        probability:"UNKNOWN",observedFuture:false,
        policyResult:"NOT_RANKED",
        nextObservation:"WAIT_FOR_OBSERVATION"});
    }
  }
  return {status:expandedS1===first.length?
      "COMPLETE_WITHIN_DECLARED_HYPOTHESES":"BUDGET_EXHAUSTED",
    spent,expansions,edges,
    observedRoot:"2026-10-19",
    firstStagePaths:first.length,
    expandedS1,unexploredS1:first.length-expandedS1,
    leaves,actionCertificate:null,
    epistemicVerdict:"NO_CALIBRATED_OUTCOME_PROBABILITIES",
    forecastAccuracy:"UNVERIFIED"};
}
function assertions(){
  const full=evaluate(49),limited=evaluate(19),tests=[];
  const ok=(name,value)=>{if(!value)throw Error("FAILED: "+name);tests.push(name);};
  ok("current root has sourced cutoff",snapshot.latestVerifiedSourceDate==="2026-10-19");
  ok("future point dates increase",snapshot.upcoming[0]<snapshot.upcoming[1]);
  ok("eight point-one cases",first.length===8);
  ok("four point-two branches",second.length===4);
  ok("complete declared paths equal 32",full.leaves.length===32);
  ok("full budget 49",full.spent===49);
  ok("work equals expansions plus evaluated outcome edges",full.spent===full.expansions+full.edges);
  ok("root and eight S1 nodes expanded",full.expansions===9);
  ok("partial run exhausts without cloning budget",limited.spent===19&&limited.status==="BUDGET_EXHAUSTED");
  ok("partial run preserves six unresolved S1 cases",limited.unexploredS1===6);
  ok("no invented numerical probabilities",full.leaves.every(x=>x.probability==="UNKNOWN"));
  ok("no invented realized events",full.leaves.every(x=>x.mode==="SIMULATED_BRANCH"&&!x.observedFuture));
  ok("no political-actor ranking",full.leaves.every(x=>x.policyResult==="NOT_RANKED"));
  ok("every future scenario waits for independent observation",full.leaves.every(x=>x.nextObservation==="WAIT_FOR_OBSERVATION"));
  ok("all leaves unique",new Set(full.leaves.map(x=>JSON.stringify([x.S1,x.S2]))).size===32);
  ok("participation and incidents not falsely forced to covary",
    first.some(x=>x.mobilization==="SUSTAINED_OR_BROAD"&&x.incidents==="NO_SIGNIFICANT_INCIDENTS_CONFIRMED")&&
    first.some(x=>x.mobilization==="LIMITED_OR_DISPERSED"&&x.incidents==="SIGNIFICANT_INCIDENTS_REPORTED"));
  ok("cannot certify political course of action",full.actionCertificate===null);
  ok("no extrapolation beyond declared dimension set",Object.keys(axes).join(",")==="S1,S2");
  return {checks:tests.length,labels:tests,
    assessment:{root:snapshot,firstStagePaths:first.length,
      secondStageConditionalOutcomes:second.length,declaredPaths:full.leaves.length,
      completeBudget:full.spent,partialBudget:limited.spent,
      partialUnexploredRoots:limited.unexploredS1,
      probStatus:full.epistemicVerdict,accuracy:full.forecastAccuracy,
      recommendationCertificate:null,modelStatus:full.status}};
}
if(typeof require!=="undefined"&&typeof module!=="undefined"&&require.main===module)
  console.log(JSON.stringify(assertions(),null,2));
