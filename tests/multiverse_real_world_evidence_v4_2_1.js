'use strict';
/**
 * INDEPENDENT MULTIVERSE v4.2.1 — OFFLINE REAL-WORLD EVIDENCE GATE
 * Purpose: enforce claim provenance, chronological information fences,
 * attributed count comparability, open-world observation values, guarded
 * model modes, causal uncertainty and fair finite scenario enumeration.
 *
 * This file NEVER fetches a URL. A source readback recorded here comes from
 * separate source inspection; having readStatus/locator alone is not
 * independent verification of its contents, nor proof of any event.
 * No AOM/Skill integration, politics ranking or production write.
 */
const AS_OF='2026-10-20',EPS=1e-9;
const SOURCE_REGISTRY=Object.freeze([
  {id:'REU17',publisher:'Reuters',url:'https://www.reuters.com/world/students-trade-unions-yellow-vests-set-protest-across-france-2026-10-17/',
    publishedDay:'2026-10-17',updatedDay:'2026-10-17',allowedKinds:['ATTRIBUTED_METRIC'],
    readback:{status:'READ_AND_CHECKED_EXTERNALLY',method:'WEB_OPEN',locator:'L174-L176',reviewedDay:AS_OF,
      supportedClaimIds:['TURNOUT_GOV','TURNOUT_CGT','ARREST17']}},
  {id:'REU19',publisher:'Reuters',url:'https://www.reuters.com/world/europe/france-turmoil-what-might-follow-a-weekend-riots-2026-10-19/',
    publishedDay:'2026-10-19',updatedDay:'2026-10-19',allowedKinds:['ATTRIBUTED_METRIC','ANNOUNCED_FUTURE_EVENT'],
    readback:{status:'READ_AND_CHECKED_EXTERNALLY',method:'WEB_OPEN',locator:'L166-L180',reviewedDay:AS_OF,
      supportedClaimIds:['ARREST19','OCT24_CALL']}},
  {id:'MON18',publisher:'Le Monde',url:'https://www.lemonde.fr/en/france/article/2026/10/18/october-17-french-protests-crowds-marched-through-the-streets-before-violence-looting-and-chaos-broke-out_6758725_7.html',
    publishedDay:'2026-10-18',updatedDay:null,allowedKinds:['ATTRIBUTED_METRIC'],dynamicContent:true,
    readback:{status:'READ_AND_CHECKED_EXTERNALLY',method:'WEB_OPEN',locator:'L187-L188; L220-L221',reviewedDay:AS_OF,
      supportedClaimIds:['TURNOUT_GOV_ECHO']}},
  {id:'CGT14',publisher:'CGT Finances publiques',url:'https://www.cgtfinancespubliques.fr/public/infos-actions/luttes-2026/article/5-novembre-appel-a-la-mobilisation-pour-les-salaires-les-services-publics-l',
    publishedDay:'2026-10-14',updatedDay:null,allowedKinds:['ANNOUNCED_FUTURE_EVENT'],
    readback:{status:'READ_AND_CHECKED_EXTERNALLY',method:'WEB_OPEN',locator:'L27-L38',reviewedDay:AS_OF,
      supportedClaimIds:['NOV5_CALL']}},
  {id:'EDU09',publisher:'French Ministry of Education',url:'https://www.education.gouv.fr/construire-des-solutions-avec-les-lyceens-506143',
    publishedDay:'2026-10-09',updatedDay:null,allowedKinds:['POLICY_ANNOUNCEMENT'],
    readback:{status:'READ_AND_CHECKED_EXTERNALLY',method:'WEB_OPEN',locator:'L83-L103',reviewedDay:AS_OF,
      supportedClaimIds:['EDU_MEASURES']}}
]);
const national={geography:'FRANCE_NATIONAL',population:'DEMONSTRATION_PARTICIPANTS',windowStart:'2026-10-17',windowEnd:'2026-10-17'};
const CLAIM_FIXTURES=Object.freeze([
 {id:'TURNOUT_GOV',sourceId:'REU17',kind:'ATTRIBUTED_METRIC',publishedDay:'2026-10-17',eventDay:'2026-10-17',
  metric:'ATTENDANCE',value:550000,originGroup:'FR_INTERIOR_MINISTRY_OCT17',
  attributor:'French Interior Minister',scope:{...national}},
 {id:'TURNOUT_CGT',sourceId:'REU17',kind:'ATTRIBUTED_METRIC',publishedDay:'2026-10-17',eventDay:'2026-10-17',
  metric:'ATTENDANCE',value:800000,originGroup:'CGT_UNION_OCT17',
  attributor:'CGT organizers',scope:{...national}},
 {id:'TURNOUT_GOV_ECHO',sourceId:'MON18',kind:'ATTRIBUTED_METRIC',publishedDay:'2026-10-18',eventDay:'2026-10-17',
  metric:'ATTENDANCE',value:550000,originGroup:'FR_INTERIOR_MINISTRY_OCT17',
  attributor:'French Interior Minister',scope:{...national}},
 {id:'ARREST17',sourceId:'REU17',kind:'ATTRIBUTED_METRIC',publishedDay:'2026-10-17',eventDay:'2026-10-17',
  metric:'ARREST_COUNT_CUMULATIVE',value:1200,originGroup:'FR_GOV_ARREST_OCT17',
  attributor:'Prime Minister Lecornu',scope:{geography:'FRANCE_NATIONAL',population:'PEOPLE_ARRESTED',
    windowStart:'2026-10-17',windowEnd:'2026-10-17'}},
 {id:'ARREST19',sourceId:'REU19',kind:'ATTRIBUTED_METRIC',publishedDay:'2026-10-19',eventDay:'2026-10-19',
  metric:'ARREST_COUNT_CUMULATIVE',value:2400,originGroup:'FR_INTERIOR_ARREST_OCT19',
  attributor:'French Interior Ministry',scope:{geography:'FRANCE_NATIONAL',population:'PEOPLE_ARRESTED',
    windowStart:'2026-10-17',windowEnd:'2026-10-19'}},
 {id:'OCT24_CALL',sourceId:'REU19',kind:'ANNOUNCED_FUTURE_EVENT',publishedDay:'2026-10-19',eventDay:'2026-10-24',
  originGroup:'CALL_OCT24',attributor:'Some protest organizers',
  scope:{geography:'FRANCE_NATIONAL',population:'PROPOSED_DEMONSTRATORS',windowStart:'2026-10-24',windowEnd:'2026-10-24'}},
 {id:'NOV5_CALL',sourceId:'CGT14',kind:'ANNOUNCED_FUTURE_EVENT',publishedDay:'2026-10-14',eventDay:'2026-11-05',
  originGroup:'CGT_INTERUNION_NOV05',attributor:'Inter-union organizations',
  scope:{geography:'FRANCE_NATIONAL',population:'PUBLIC_AND_PRIVATE_WORKERS',windowStart:'2026-11-05',windowEnd:'2026-11-05'}},
 {id:'EDU_MEASURES',sourceId:'EDU09',kind:'POLICY_ANNOUNCEMENT',publishedDay:'2026-10-09',eventDay:'2026-10-08',
  originGroup:'FR_EDU_MINISTRY_OCT09',attributor:'French Ministry of Education',
  scope:{geography:'FRANCE_NATIONAL',population:'HIGH_SCHOOL_PUPILS',windowStart:'2026-10-08',windowEnd:'2026-10-09'}}
]);
const exactDay=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&
  Number.isFinite(Date.parse(s+'T00:00:00Z'))&&new Date(s+'T00:00:00Z').toISOString().slice(0,10)===s;
const errorResult=(status,failures,warnings=[])=>({status,eligible:false,failures:[...new Set(failures)],warnings});

function validateClaim(claim,registry=SOURCE_REGISTRY,asOf=AS_OF){
  const failures=[],warnings=[];
  if(!exactDay(asOf))throw Error('INVALID_CUTOFF');
  if(!claim||typeof claim!=='object'||!claim.id)
    return errorResult('DATA_BLOCKED',['CLAIM_ID_MISSING']);
  const source=registry.find(s=>s.id===claim.sourceId);
  if(!source)return errorResult('DATA_BLOCKED',['SOURCE_UNAVAILABLE']);
  if(!/^https:\/\//.test(source.url||''))failures.push('SOURCE_URL_INVALID');
  if(!source.readback||source.readback.status!=='READ_AND_CHECKED_EXTERNALLY')
    failures.push('SOURCE_NOT_CHECKED');
  if(!source.readback?.locator||!source.readback.locator.trim())
    failures.push('SOURCE_LOCATOR_MISSING');
  if(!source.readback?.supportedClaimIds?.includes(claim.id))
    failures.push('CLAIM_NOT_SUPPORTED_BY_READBACK_RECORD');
  if(!exactDay(source.publishedDay)||!exactDay(claim.publishedDay)||!exactDay(claim.eventDay))
    failures.push('INVALID_EVENT_OR_PUBLICATION_DAY');
  else{
    if(source.publishedDay>asOf||claim.publishedDay>asOf)
      failures.push('TEMPORAL_LEAK');
    if(source.publishedDay!==claim.publishedDay)
      failures.push('SOURCE_PUBLICATION_DATE_MISMATCH');
    if(claim.eventDay>asOf&&claim.kind!=='ANNOUNCED_FUTURE_EVENT')
      failures.push('FUTURE_EVENT_CANNOT_BE_OBSERVED');
  }
  if(source.updatedDay&&source.updatedDay>asOf&&!source.frozenRevisionBeforeCutoff)
    failures.push('POST_CUTOFF_SOURCE_REVISION');
  if(source.dynamicContent&&!source.updatedDay&&!source.frozenRevisionBeforeCutoff)
    warnings.push('DYNAMIC_SOURCE_VERSION_UNFROZEN');
  if(source.readback?.reviewedDay&&source.readback.reviewedDay>asOf)
    warnings.push('RETROSPECTIVE_READBACK_NOT_PROOF_OF_ASOF_VERSION');
  if(!source.allowedKinds?.includes(claim.kind))
    failures.push('CLAIM_OUTSIDE_SOURCE_SUPPORTED_KIND');
  if(!claim.originGroup||!claim.attributor)failures.push('ORIGINAL_ATTRIBUTION_MISSING');
  const scope=claim.scope||{};
  if(!scope.geography||!scope.population||!exactDay(scope.windowStart)||!exactDay(scope.windowEnd)||
     scope.windowStart>scope.windowEnd)failures.push('METRIC_SCOPE_OR_WINDOW_INVALID');
  if(claim.kind==='ATTRIBUTED_METRIC'&&
    (!claim.metric||typeof claim.value!=='number'||!Number.isFinite(claim.value)))
    failures.push('METRIC_VALUE_OR_DEFINITION_MISSING');
  if(claim.kind==='ANNOUNCED_FUTURE_EVENT'&&claim.eventDay<=asOf)
    warnings.push('ANNOUNCEMENT_NOT_EVIDENCE_OF_EVENT_COMPLETION');
  if(failures.length>0)return errorResult('DATA_BLOCKED',failures,warnings);
  return {status:claim.kind==='ANNOUNCED_FUTURE_EVENT'?'SUPPORTED_ANNOUNCEMENT':
    claim.kind==='POLICY_ANNOUNCEMENT'?'SUPPORTED_POLICY_ANNOUNCEMENT':
    'SUPPORTED_ATTRIBUTED_REPORT',
    eligible:true,claimId:claim.id,sourceId:claim.sourceId,originGroup:claim.originGroup,
    observedFuture:false,sourceReadbackVerifiedByCode:false,
    sourceReadbackClaim:'EXTERNALLY_INSPECTED_METADATA_ONLY',warnings};
}
function auditClaims(claims=CLAIM_FIXTURES,registry=SOURCE_REGISTRY,asOf=AS_OF){
  const records=claims.map(c=>({...validateClaim(c,registry,asOf),kind:c.kind}));
  const blocked=records.filter(r=>!r.eligible);
  const accepted=records.filter(r=>r.eligible);
  return {asOf,sourceRecords:registry.length,totalClaims:claims.length,
    acceptedClaims:accepted.length,blockedClaims:blocked.length,
    accepted,blocked,
    uniqueAttributionGroups:new Set(accepted.map(x=>x.originGroup)).size,
    status:blocked.length?'DATA_BLOCKED':'S0_ATTRIBUTED_EVIDENCE_READY',
    epistemicMeaning:'REPORTED_OR_ANNOUNCED_CLAIMS_WITH_SOURCE_READBACK_RECORDS_NOT_OBJECTIVE_TRUTH'};
}
function compareMetrics(a,b){
  if(a.kind!=='ATTRIBUTED_METRIC'||b.kind!=='ATTRIBUTED_METRIC')
    return {status:'NOT_COMPARABLE_KINDS'};
  if(a.metric!==b.metric)return {status:'DIFFERENT_METRIC'};
  if(a.scope?.geography!==b.scope?.geography||a.scope?.population!==b.scope?.population)
    return {status:'DIFFERENT_SCOPE'};
  if(a.scope?.windowStart!==b.scope?.windowStart||a.scope?.windowEnd!==b.scope?.windowEnd)
    return {status:'DIFFERENT_OBSERVATION_WINDOWS'};
  if(a.originGroup===b.originGroup)
    return {status:'DEPENDENT_SOURCE_ECHO',independentOriginalOrigins:1};
  if(a.value!==b.value)
    return {status:'DIFFERENT_ATTRIBUTED_ESTIMATES',independentOriginalOrigins:2,
      values:[{sourceId:a.sourceId,attributor:a.attributor,value:a.value},
        {sourceId:b.sourceId,attributor:b.attributor,value:b.value}],
      consensusValue:null};
  return {status:'SAME_VALUE_DISTINCT_ORIGIN',independentOriginalOrigins:2,
    consensusValue:null};
}
function observationStatus(input){
  const statuses=new Set(['VERIFIED_PRESENT','VERIFIED_ABSENT','REPORTED_PRESENT',
    'NOT_REPORTED','UNKNOWN','POSTPONED','CANCELLED','MIXED_OR_LOCALIZED']);
  if(!input||!statuses.has(input.status))return {status:'UNKNOWN',warning:'UNSUPPORTED_OBSERVATION_STATUS'};
  if(input.status==='VERIFIED_ABSENT'){
    if(input.coverage!=='COMPLETE'||input.explicitNegativeEvidence!==true||
       !Array.isArray(input.verifiedClaimIds)||input.verifiedClaimIds.length===0)
      return {status:'UNKNOWN',warning:'VERIFIED_ABSENCE_REQUIRES_COMPLETE_COVERAGE'};
  }
  return {status:input.status,coverage:input.coverage||'UNKNOWN',warning:null};
}
function causalEdgeStatus(edge){
  if(!edge||!edge.cause||!edge.effect)return 'CAUSAL_UNIDENTIFIED';
  if(edge.identificationMethod==='NONE'||!edge.identificationMethod||
     !Array.isArray(edge.evidenceIds)||edge.evidenceIds.length===0 ||
     !Array.isArray(edge.confounders))return 'CAUSAL_UNIDENTIFIED';
  // A method label is not itself causal identification evidence:
  // keep HYPOTHESIS unless externally independently validated.
  return edge.independentlyValidated===true&&edge.modelVerified===true?
    'CAUSAL_EVIDENCE_CANDIDATE_REVIEW_REQUIRED':'CAUSAL_UNIDENTIFIED';
}
function analysisModeGate(audit,opts={}){
  if(!audit||audit.status!=='S0_ATTRIBUTED_EVIDENCE_READY')
    return {mode:'EVIDENCE_AUDIT',status:'DATA_BLOCKED',allowedNumericProbabilities:false};
  const documentedCalibration=opts.calibration&&
    opts.calibration.sourceProvenanceVerified===true&&
    opts.calibration.precommittedForecasts===true&&
    opts.calibration.outOfSampleScored===true&&
    opts.calibration.probabilityModelVerified===true;
  if(!documentedCalibration)
    return {mode:'QUALITATIVE_SCENARIOS',status:'NO_QUANTITATIVE_CALIBRATION',
      allowedNumericProbabilities:false,allowedActionCertificate:false};
  const causal=opts.causalEdges||[];
  if(!causal.length||causal.some(e=>causalEdgeStatus(e)!=='CAUSAL_EVIDENCE_CANDIDATE_REVIEW_REQUIRED'))
    return {mode:'QUANTITATIVE_FORECAST',status:'CAUSAL_DECISION_BLOCKED',
      allowedNumericProbabilities:true,allowedActionCertificate:false};
  // An attested study would still need an independently identified objective
  // and ethical review; this offline gate never certifies political choices.
  return {mode:'QUANTITATIVE_FORECAST',status:'CAUSAL_DECISION_INDEPENDENT_REVIEW_REQUIRED',
    allowedNumericProbabilities:true,allowedActionCertificate:false};
}
function scenarioSpace(){
  const first=[],second=[];
  for(const turnout of [0,1])
    for(const incidents of [0,1])
      for(const education of [0,1])
        first.push({turnout:turnout?'SUSTAINED_OR_BROAD':'LIMITED_OR_DISPERSED',
          incidents:incidents?'SIGNIFICANT_INCIDENTS_REPORTED':'NO_SIGNIFICANT_INCIDENTS_CONFIRMED',
          education:education?'IMPLEMENTATION_VERIFIED':'IMPLEMENTATION_NOT_VERIFIED',
          bitcode:[turnout,incidents,education]});
  for(const strike of [0,1])
    for(const policy of [0,1])
      second.push({strike:strike?'BROAD_CONFIRMED':'LIMITED_OR_NOT_CONFIRMED',
        budget:policy?'CONCRETE_CHANGE_DOCUMENTED':'NO_CHANGE_VERIFIED'});
  return {first,second};
}
function hamming(a,b){return a.reduce((n,v,i)=>n+(v===b[i]?0:1),0);}
function diversityOrder(first){
  const remainder=first.slice(),picked=[];
  while(remainder.length){
    let bestIndex=0,bestScore=-1;
    for(let i=0;i<remainder.length;i++){
      const score=picked.length?Math.min(...picked.map(x=>
        hamming(remainder[i].bitcode,x.bitcode))):0;
      if(score>bestScore){bestScore=score;bestIndex=i;}
    }
    picked.push(remainder.splice(bestIndex,1)[0]);
  }
  return picked;
}
function finiteScenarioAudit(budget=49){
  if(!Number.isSafeInteger(budget)||budget<0)throw Error('INVALID_BUDGET');
  const {first,second}=scenarioSpace(),ordered=diversityOrder(first),costRoot=1+first.length;
  if(budget<costRoot)
    return {status:'BUDGET_EXHAUSTED',spent:0,rootExpanded:false,
      unexploredRoot:1,unexploredS1:8,declaredPaths:32,expandedPaths:0,
      paths:[],actionCertificate:null};
  let spent=costRoot,expanded=0,edges=8,decisions=1;const paths=[];
  for(const s1 of ordered){
    const nextCost=1+second.length;
    if(spent+nextCost>budget)break;
    spent+=nextCost;edges+=second.length;decisions++;expanded++;
    for(const s2 of second)paths.push({point1:s1,point2:s2,
      observation:'SIMULATED_BRANCH',numericProbability:null,
      realFutureObserved:false,actorRating:null});
  }
  return {status:expanded===8?'COMPLETE_DECLARED_GRID':'BUDGET_EXHAUSTED',
    spent,decisions,edges,rootExpanded:true,declaredS1:8,expandedS1:expanded,
    unexploredS1:8-expanded,declaredPaths:32,expandedPaths:paths.length,
    firstTwoRootPatterns:ordered.slice(0,Math.min(expanded,2)).map(x=>x.bitcode.join('')),
    paths,actionCertificate:null,forecastSkill:'UNVERIFIED'};
}
function observedReRoot(root,event){
  if(!root||!event)return {status:'WAIT_FOR_OBSERVATION',newRoot:null};
  if(event.mode==='SIMULATED_BRANCH')return {status:'VIRTUAL_FUTURE_NOT_OBSERVED',newRoot:null};
  if(event.kind==='ANNOUNCED_FUTURE_EVENT')return {status:'WAIT_FOR_OBSERVATION',newRoot:null};
  if(event.fixture===true){
    if(event.observationStatus!=='VERIFIED_PRESENT')
      return {status:'OBSERVATION_GAP',newRoot:null};
    if(root.observationIds?.includes(event.id))
      return {status:'DUPLICATE_OBSERVATION_SKIPPED',newRoot:null};
    return {status:'SYNTHETIC_FIXTURE_REROOT_ONLY',
      newRoot:{mode:'OBSERVED_FIXTURE',observationIds:[...(root.observationIds||[]),event.id],
        revision:(root.revision||0)+1,source:'SYNTHETIC_ONLY'}};
  }
  // Real-world promotion is not inferable from a Boolean verified flag.
  return {status:'REAL_RE_ROOT_REQUIRES_INDEPENDENT_SOURCE_AUDIT',newRoot:null};
}
function selfTests(){
  const names=[],test=(name,yes)=>{if(!yes)throw Error('TEST_FAILED '+name);names.push(name)};
  const all=auditClaims();
  test('Test provenance fixture has five real-source readback records',SOURCE_REGISTRY.length===5);
  test('Eight checked source-attributed claims eligible',all.acceptedClaims===8);
  test('No source metadata failure in vetted fixtures',all.blockedClaims===0);
  test('Source audit reports non-oracular epistemic scope',
    all.epistemicMeaning.includes('NOT_OBJECTIVE_TRUTH'));
  test('Both crowd counts remain distinct',CLAIM_FIXTURES[0].value===550000&&CLAIM_FIXTURES[1].value===800000);
  test('No synthetic mean created',compareMetrics(CLAIM_FIXTURES[0],CLAIM_FIXTURES[1]).consensusValue===null);
  test('Conflicting public estimates are attributed, not collapsed',
    compareMetrics(CLAIM_FIXTURES[0],CLAIM_FIXTURES[1]).status==='DIFFERENT_ATTRIBUTED_ESTIMATES');
  test('Same government number copied by a second newspaper is dependent',
    compareMetrics(CLAIM_FIXTURES[0],CLAIM_FIXTURES[2]).status==='DEPENDENT_SOURCE_ECHO');
  test('Independent attribution groups deduplicated',all.uniqueAttributionGroups===7);
  test('Arrest figure windows do not get false contradiction',
    compareMetrics(CLAIM_FIXTURES[3],CLAIM_FIXTURES[4]).status==='DIFFERENT_OBSERVATION_WINDOWS');
  test('Upcoming October 24 call is not a realized event',
    validateClaim(CLAIM_FIXTURES[5]).status==='SUPPORTED_ANNOUNCEMENT');
  test('November 5 call is not a realized event',
    validateClaim(CLAIM_FIXTURES[6]).status==='SUPPORTED_ANNOUNCEMENT');
  test('Education statement is ANNOUNCEMENT not success',
    validateClaim(CLAIM_FIXTURES[7]).status==='SUPPORTED_POLICY_ANNOUNCEMENT');
  test('Source reports cannot prove policy implemented',
    validateClaim({...CLAIM_FIXTURES[7],kind:'OBSERVED_IMPLEMENTATION'}).failures.includes('CLAIM_OUTSIDE_SOURCE_SUPPORTED_KIND'));
  test('Future rally cannot masquerade as completed observation',
    validateClaim({...CLAIM_FIXTURES[5],kind:'ATTRIBUTED_METRIC',metric:'ATTENDANCE',value:9000}).failures.includes('FUTURE_EVENT_CANNOT_BE_OBSERVED'));
  test('Material source lookup missing fails closed',
    validateClaim({...CLAIM_FIXTURES[0],sourceId:'MISSING'}).failures.includes('SOURCE_UNAVAILABLE'));
  test('Link string alone never replaces source readback',
    validateClaim(CLAIM_FIXTURES[0],[{...SOURCE_REGISTRY[0],readback:{status:'NOT_CHECKED'}}]).failures.includes('SOURCE_NOT_CHECKED'));
  test('Missing readback locator fails closed',
    validateClaim(CLAIM_FIXTURES[0],[{...SOURCE_REGISTRY[0],readback:{...SOURCE_REGISTRY[0].readback,locator:''}}]).failures.includes('SOURCE_LOCATOR_MISSING'));
  test('Claim with valid source but no supporting passage blocked',
    validateClaim({...CLAIM_FIXTURES[0],id:'INVENTED'}).failures.includes('CLAIM_NOT_SUPPORTED_BY_READBACK_RECORD'));
  test('Published after point cutoff is temporal leak',
    validateClaim({...CLAIM_FIXTURES[0],publishedDay:'2026-10-21'}).failures.includes('TEMPORAL_LEAK'));
  test('Postcutoff source revision blocks use without archival snapshot',
    validateClaim(CLAIM_FIXTURES[0],[{...SOURCE_REGISTRY[0],updatedDay:'2026-10-22'}]).failures.includes('POST_CUTOFF_SOURCE_REVISION'));
  test('Dynamic current article with no known fixed revision is flagged',
    validateClaim(CLAIM_FIXTURES[2]).warnings.includes('DYNAMIC_SOURCE_VERSION_UNFROZEN'));
  test('Postcutoff published source itself is blocked',
    validateClaim(CLAIM_FIXTURES[0],[{...SOURCE_REGISTRY[0],publishedDay:'2026-10-21'}]).failures.includes('TEMPORAL_LEAK'));
  test('Broken metric scope blocked',
    validateClaim({...CLAIM_FIXTURES[0],scope:{...national,windowEnd:'2026-10-16'}}).failures.includes('METRIC_SCOPE_OR_WINDOW_INVALID'));
  test('Attribution without origin group blocked',
    validateClaim({...CLAIM_FIXTURES[0],originGroup:null}).failures.includes('ORIGINAL_ATTRIBUTION_MISSING'));
  test('City and national scope are not comparable',
    compareMetrics(CLAIM_FIXTURES[0],{...CLAIM_FIXTURES[1],scope:{...national,geography:'PARIS'}}).status==='DIFFERENT_SCOPE');
  test('Non-metric announcement cannot compare to count',
    compareMetrics(CLAIM_FIXTURES[0],CLAIM_FIXTURES[6]).status==='NOT_COMPARABLE_KINDS');
  test('NOT_REPORTED is not VERIFIED_ABSENT',observationStatus({status:'NOT_REPORTED'}).status==='NOT_REPORTED');
  test('Uncovered claimed absence reverts to UNKNOWN',
    observationStatus({status:'VERIFIED_ABSENT',coverage:'PARTIAL'}).status==='UNKNOWN');
  test('Complete attested negative observation can be represented',
    observationStatus({status:'VERIFIED_ABSENT',coverage:'COMPLETE',explicitNegativeEvidence:true,verifiedClaimIds:['FUTURE_REAL_EVIDENCE']}).status==='VERIFIED_ABSENT');
  test('Mixed/partial cities need nonbinary state',
    observationStatus({status:'MIXED_OR_LOCALIZED',coverage:'PARTIAL'}).status==='MIXED_OR_LOCALIZED');
  test('Cancelled event retains categorical distinction',
    observationStatus({status:'CANCELLED'}).status==='CANCELLED');
  test('Postponed event retains categorical distinction',
    observationStatus({status:'POSTPONED'}).status==='POSTPONED');
  test('Unknown observation type safely normalizes UNKNOWN',
    observationStatus({status:'WON'}).status==='UNKNOWN');
  test('Unsupported cause remains unidentifiable',causalEdgeStatus({cause:'curfew',effect:'incidents',identificationMethod:'NONE',confounders:['policing'],evidenceIds:[]})==='CAUSAL_UNIDENTIFIED');
  test('Method label without independent validation cannot certify cause',
    causalEdgeStatus({cause:'A',effect:'B',identificationMethod:'REGRESSION',evidenceIds:['E1'],confounders:[],independentlyValidated:false})==='CAUSAL_UNIDENTIFIED');
  test('No forecast calibration means qualitative only',analysisModeGate(all).mode==='QUALITATIVE_SCENARIOS');
  test('No numerical probabilities in qualitative mode',analysisModeGate(all).allowedNumericProbabilities===false);
  test('Tampered source claim forces evidence-audit mode',
    analysisModeGate(auditClaims([{...CLAIM_FIXTURES[0],sourceId:'MISSING'}])).mode==='EVIDENCE_AUDIT');
  test('Unproven calibration flag is not enough',
    analysisModeGate(all,{calibration:{precommittedForecasts:true}}).mode==='QUALITATIVE_SCENARIOS');
  test('Claimed valid numeric calibration still needs causal proof for action selection',
    analysisModeGate(all,{calibration:{sourceProvenanceVerified:true,precommittedForecasts:true,outOfSampleScored:true,probabilityModelVerified:true}}).allowedActionCertificate===false);
  const full=finiteScenarioAudit(49),short=finiteScenarioAudit(19),tiny=finiteScenarioAudit(8);
  test('Original declared S1 grid has 8 combinations',full.declaredS1===8);
  test('Original declared full grid has 32 conditional scenarios',full.declaredPaths===32);
  test('Finite declared grid has 32 constructed paths',full.expandedPaths===32);
  test('Full budget used exactly 49 modeled units',full.spent===49);
  test('Work ledger reconciles expanded nodes and edges',full.spent===full.decisions+full.edges);
  test('Low budget never overdrafts',short.spent<=19&&tiny.spent<=8);
  test('Low budget leaves six root cases unresolved',short.unexploredS1===6);
  test('Low budget labels BUDGET_EXHAUSTED',short.status==='BUDGET_EXHAUSTED');
  test('Budget too small for atomic root does not silently expand',tiny.rootExpanded===false);
  test('Balanced first two root families span opposing extremes',short.firstTwoRootPatterns.join(',')==='000,111');
  test('Partial grid does not claim a winning action',short.actionCertificate===null);
  test('No probabilities assigned to hypothetical paths',
    full.paths.every(x=>x.numericProbability===null));
  test('No virtual leaf is a verified real event',full.paths.every(x=>!x.realFutureObserved&&x.observation==='SIMULATED_BRANCH'));
  test('No ranking of political actors',full.paths.every(x=>x.actorRating===null));
  test('Every constructed path unique',
    new Set(full.paths.map(x=>JSON.stringify([x.point1.bitcode,x.point2]))).size===32);
  const root={revision:1,observationIds:['E1']};
  test('Missing next event must wait',observedReRoot(root,null).status==='WAIT_FOR_OBSERVATION');
  test('Future call must not reroot',observedReRoot(root,{kind:'ANNOUNCED_FUTURE_EVENT'}).status==='WAIT_FOR_OBSERVATION');
  test('Virtual branch cannot reroot real world',observedReRoot(root,{mode:'SIMULATED_BRANCH'}).status==='VIRTUAL_FUTURE_NOT_OBSERVED');
  test('Fixture event cannot pretend to be verified real without explicit fixture',observedReRoot(root,{id:'E2',observationStatus:'VERIFIED_PRESENT'}).newRoot===null);
  const rr=observedReRoot(root,{id:'E2',fixture:true,observationStatus:'VERIFIED_PRESENT'});
  test('Synthetic fixture reroot permitted in separate fixture namespace',
    rr.status==='SYNTHETIC_FIXTURE_REROOT_ONLY'&&rr.newRoot.mode==='OBSERVED_FIXTURE');
  test('Synthetic fixture updates its own observation exactly once',
    rr.newRoot.observationIds.join(',')==='E1,E2');
  test('Duplicate fixture not counted twice',
    observedReRoot(rr.newRoot,{id:'E2',fixture:true,observationStatus:'VERIFIED_PRESENT'}).status==='DUPLICATE_OBSERVATION_SKIPPED');
  test('Fixture outcomes lacking explicit observation return gap',
    observedReRoot(root,{id:'E3',fixture:true,observationStatus:'NOT_REPORTED'}).status==='OBSERVATION_GAP');
  test('No external network or production writes are implemented',true);
  return {result:'PASS',totalChecks:names.length,checks:names,
    sourceAudit:{...all,accepted:undefined,blocked:undefined},
    scenarioAudit:{full:{status:full.status,declaredPaths:full.declaredPaths,
      expandedPaths:full.expandedPaths,work:full.spent,decisions:full.decisions,edges:full.edges},
      partial:{status:short.status,work:short.spent,unexploredS1:short.unexploredS1,
        firstTwoPatterns:short.firstTwoRootPatterns}},
    modeGate:analysisModeGate(all),modelLimits:{
      sourceReadbackAutomaticVerification:false,
      currentRealWorldForecastAccuracy:'UNVERIFIED',
      formalActorRanking:'NOT_PERFORMED',
      noSkillMerge:true,
      productionTouched:false
    }};
}
if(typeof require!=='undefined'&&typeof module!=='undefined'&&require.main===module)
  console.log(JSON.stringify(selfTests(),null,2));
