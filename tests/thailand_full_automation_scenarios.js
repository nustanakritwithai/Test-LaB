'use strict';
/**
 * Independent Multiverse World Model — Thailand full automation capability
 * An evidence-anchored QUALITATIVE scenario-grid fixture, NOT causal forecasting.
 * Source data: dated official/public documents, inspect metadata/provenance.
 * All future assumptions are explicit and NO probabilities are created.
 * No external API/network access; Node.js 18+ no packages.
 */
const VERSION='THAILAND_FULL_AUTOMATION_SCENARIOS_CYCLE019';
const AS_OF='2026-10-20';
const PREMISE=Object.freeze({
  capability:'FULL_AUTOMATION_CAPABILITY_ASSUMED',
  achievedBy2026:false,
  milestoneDate:'UNKNOWN',
  scope:'MOST_DIGITAL_AND_PHYSICAL_ECONOMICALLY_FEASIBLE_TASKS',
  horizons:['S0_2026_OBSERVED','S1_TSTAR_CAPABILITY_ASSUMED',
    'S2_0_TO_3_YEARS_POST_TSTAR','S3_5_TO_10_YEARS_POST_TSTAR'],
  forecaster:'UNCALIBRATED_QUALITATIVE_ONLY'
});
const FACTS=Object.freeze([
 {id:'NSO_Q2_2026_EMPLOYED',value:41.51,unit:'million_people',year:2026,
   period:'Q2_2026',scope:'THAI_EMPLOYED_PERSONS_LFS',
   url:'https://www.nso.go.th/nsoweb/storage/survey_detail/2026/20260727145040_60885.pdf',
   sourceType:'DIRECT_NSO_PUBLICATION',attribution:'NSO Labor Force Survey Q2 2026',
   support:'PDF pages 1-2',published:'2026-07-27',factType:'SOURCE_REPORTED_STATISTIC'},
 {id:'NSO_Q2_2026_AGRI',value:11.65,unit:'million_people',year:2026,period:'Q2_2026',
   scope:'THAI_EMPLOYED_PERSONS_LFS',attribution:'NSO Labor Force Survey Q2 2026',
   sourceType:'DIRECT_NSO_PUBLICATION',sourceId:'NSO_Q2_2026_EMPLOYED',
   published:'2026-07-27',factType:'SOURCE_REPORTED_STATISTIC'},
 {id:'NSO_Q2_2026_MANUFACTURING',value:9.16,unit:'million_people',year:2026,period:'Q2_2026',
   scope:'THAI_EMPLOYED_PERSONS_LFS',attribution:'NSO Labor Force Survey Q2 2026',
   sourceType:'DIRECT_NSO_PUBLICATION',sourceId:'NSO_Q2_2026_EMPLOYED',
   published:'2026-07-27',factType:'SOURCE_REPORTED_STATISTIC'},
 {id:'NSO_Q2_2026_SERVICES_TRADE',value:20.70,unit:'million_people',year:2026,period:'Q2_2026',
   scope:'THAI_EMPLOYED_PERSONS_LFS',attribution:'NSO Labor Force Survey Q2 2026',
   sourceType:'DIRECT_NSO_PUBLICATION',sourceId:'NSO_Q2_2026_EMPLOYED',
   published:'2026-07-27',factType:'SOURCE_REPORTED_STATISTIC'},
 {id:'NSO_INFORMAL_2025',value:20.9,unit:'million_people',year:2025,period:'NSO_2025_INFORMAL_SURVEY',
   scope:'EMPLOYED_PERSONS_INFORMAL_CLASSIFICATION',attribution:'NSO Informal Labour Survey 2025',
   url:'https://www.nso.go.th/public/e-book/Analytical-Reports/Income%20transition/12/',
   sourceType:'DIRECT_NSO_PUBLICATION',support:'NSO income and working-hours analysis (2025 survey)',
   published:null,publicationDatePrecision:'UNVERIFIED_EXACT_DATE_BEFORE_CUTOFF',
   factType:'SOURCE_REPORTED_STATISTIC'},
 {id:'NSO_INFORMAL_RATE_2025',value:52.4,unit:'percent',year:2025,
   period:'NSO_2025_INFORMAL_SURVEY',scope:'EMPLOYED_PERSONS_INFORMAL_CLASSIFICATION',
   sourceId:'NSO_INFORMAL_2025',attribution:'NSO Informal Labour Survey 2025',
   sourceType:'DIRECT_NSO_PUBLICATION',factType:'SOURCE_REPORTED_STATISTIC'},
 {id:'NSO_INFORMAL_DENOMINATOR_2025',value:39.9,unit:'million_people',year:2025,
   period:'NSO_2025_INFORMAL_SURVEY',scope:'EMPLOYED_PERSONS_INFORMAL_CLASSIFICATION',
   sourceId:'NSO_INFORMAL_2025',attribution:'NSO Informal Labour Survey 2025',
   sourceType:'DIRECT_NSO_PUBLICATION',factType:'SOURCE_REPORTED_STATISTIC'},
 {id:'NSO_ELDER_60PLUS_2025',value:14.286095,unit:'million_people',year:2025,
   period:'REGISTERED_POPULATION_2025',scope:'THAILAND_AGED_60PLUS',
   url:'https://www.nso.go.th/public/e-book/Statistical-Yearbook/SYB-2026_webPage/Page_SYB_TH.html',
   sourceType:'DIRECT_NSO_PUBLICATION',
   attribution:'NSO Statistical Yearbook 2026, 2025 registered age group',
   support:'NSO annual yearbook indexed extract',published:null,
   publicationDatePrecision:'UNVERIFIED_EXACT_DATE_BEFORE_CUTOFF',factType:'SOURCE_REPORTED_STATISTIC'},
 {id:'NSO_ELDER_SHARE_2025',value:21.7,unit:'percent',year:2025,
   period:'REGISTERED_POPULATION_2025',scope:'THAILAND_POPULATION',
   sourceId:'NSO_ELDER_60PLUS_2025',attribution:'NSO Statistical Yearbook 2026',
   factType:'SOURCE_REPORTED_STATISTIC'},
 {id:'BOT_Q2_2026_HH_LOANS_GDP',value:85.2,unit:'percent_of_GDP',year:2026,
   period:'Q2_2026',scope:'BOT_EC_MB_039_S3_HOUSEHOLD_LOANS_TO_GDP_UNADJUSTED',
   url:'https://app.bot.or.th/BTWS_STAT/statistics/BOTWEBSTAT.aspx?language=ENG&reportID=1004',
   sourceType:'DIRECT_BOT_STATISTICS',
   attribution:'Bank of Thailand EC_MB_039_S3 (reported updated 2026-09-30)',
   published:'2026-09-30',factType:'SOURCE_REPORTED_STATISTIC'},
 {id:'WORLDBANK_DIGITAL_GDP_2025',value:6,unit:'approx_percent_of_GDP',year:2025,
   period:'WORLD_BANK_JULY_2025_REPORT',scope:'THAILAND_DIGITAL_ECONOMY',
   url:'https://www.worldbank.org/en/news/press-release/2025/07/03/thailand-s-digital-future-key-to-boosting-growth',
   sourceType:'WORLD_BANK_ANALYSIS',attribution:'World Bank 2025',
   published:'2025-07-03',factType:'PUBLISHED_ESTIMATE'},
 {id:'IMF_EMERGING_ASIA_EXPOSURE_2025',value:25,unit:'approx_percent_jobs',year:2025,
   period:'IMF_ASIA_2025',scope:'EMERGING_DEVELOPING_ASIA_NOT_THAILAND',
   url:'https://www.imf.org/en/Blogs/Articles/2025/01/05/how-artificial-intelligence-will-affect-asias-economies',
   sourceType:'IMF_RESEARCH',attribution:'IMF Asia analysis Jan 2025',
   published:'2025-01-05',factType:'REGIONAL_AGGREGATE_NOT_THAILAND'}
]);
const PROFILES=Object.freeze([
 {id:'INFORMAL_RURAL_FARM_HOUSEHOLD',labelTH:'ครัวเรือนเกษตรกร/แรงงานนอกระบบ',
  informal:true,rural:true,wageDependent:true,microbusiness:true,
  debtExposure:true,entryWorker:false,careDependent:false,companyMediated:false},
 {id:'FORMAL_ROUTINE_MANUFACTURING',labelTH:'ลูกจ้างโรงงานงานประจำซ้ำ',
  informal:false,rural:false,wageDependent:true,microbusiness:false,
  debtExposure:true,entryWorker:false,careDependent:false,companyMediated:true},
 {id:'URBAN_SERVICE_CLERICAL',labelTH:'พนักงานบริการ/สำนักงานเมือง',
  informal:false,rural:false,wageDependent:true,microbusiness:false,
  debtExposure:true,entryWorker:false,careDependent:false,companyMediated:true},
 {id:'LOCAL_MICROBUSINESS',labelTH:'ร้านค้ารายย่อยและกิจการขนาดเล็ก',
  informal:true,rural:false,wageDependent:false,microbusiness:true,
  debtExposure:true,entryWorker:false,careDependent:false,companyMediated:false},
 {id:'ELDER_CARE_DEPENDENT_HOUSEHOLD',labelTH:'ผู้สูงอายุและผู้ดูแล',
  informal:false,rural:false,wageDependent:false,microbusiness:false,
  debtExposure:false,entryWorker:false,careDependent:true,companyMediated:false},
 {id:'YOUNG_LABOR_MARKET_ENTRANT',labelTH:'เยาวชนเข้าสู่ตลาดงาน',
  informal:false,rural:false,wageDependent:true,microbusiness:false,
  debtExposure:false,entryWorker:true,careDependent:false,companyMediated:false}
]);
const AXES=Object.freeze([
 {key:'automationAccess',values:['BROAD_ACCESS','CONCENTRATED_ACCESS']},
 {key:'productivityGains',values:['WIDELY_DISTRIBUTED','HIGHLY_CONCENTRATED']},
 {key:'incomeProtection',values:['PORTABLE_INCLUSIVE','PATCHY_JOB_TIED']},
 {key:'complementaryDemand',values:['ROBUST_TRANSITION','WEAK_TRANSITION']}
]);
const bad=(m)=>{throw Error(m);};
const assert=(cond,m)=>{if(!cond)bad('FAILED: '+m);};
const close=(a,b)=>Math.abs(a-b)<1e-8;
function getFact(id){const f=FACTS.find(x=>x.id===id);if(!f)bad('NO_FACT '+id);return f;}
function sameSamplingFrame(a,b){
 return Boolean(a.year===b.year&&a.period===b.period&&a.scope===b.scope&&a.unit===b.unit);
}
function safeShare(numerator,denominator){
 if(!sameSamplingFrame(numerator,denominator))return {status:'DENOMINATOR_MISMATCH',fraction:null};
 if(!Number.isFinite(denominator.value)||denominator.value<=0)return {status:'INVALID_DENOMINATOR'};
 return {status:'VALID_SAME_SAMPLE',fraction:numerator.value/denominator.value};
}
function countryExposureCheck(f,requestedCountry){
 if(f.scope==='EMERGING_DEVELOPING_ASIA_NOT_THAILAND'&&requestedCountry==='THAILAND')
   return {status:'NOT_THAI_POPULATION',nationalProjection:null};
 return {status:'NEEDS_COUNTRY_SPECIFIC_EVIDENCE',nationalProjection:null};
}
function baselineGate(additionalClaims=[]){
 const errors=[],warnings=[];
 if(!Array.isArray(additionalClaims))throw Error('INVALID_EVIDENCE_INPUT');
 for(const fact of [...FACTS,...additionalClaims]){
   if(typeof fact.value!=='number'||!Number.isFinite(fact.value))errors.push('NON_NUMERIC_FACT_'+fact.id);
   if(!fact.year||fact.year>2026)errors.push('OUT_OF_CUTOFF_YEAR_'+fact.id);
   if(!fact.period||!fact.scope||!fact.attribution||!fact.factType)errors.push('PROVENANCE_GAP_'+fact.id);
   if(!fact.url&&!fact.sourceId)errors.push('SOURCE_URL_OR_PARENT_MISSING_'+fact.id);
   if(fact.published!==undefined&&fact.published!==null){
     if(typeof fact.published!=='string'||fact.published>AS_OF)
       errors.push('SOURCE_PUBLICATION_AFTER_CUTOFF_'+fact.id);
   }else if(fact.publicationDatePrecision==='UNVERIFIED_EXACT_DATE_BEFORE_CUTOFF'){
     warnings.push('SOURCE_EXACT_PUBLICATION_DATE_UNKNOWN_'+fact.id);
   }else if(!fact.sourceId){
     errors.push('PRIMARY_SOURCE_PUBLICATION_DATE_MISSING_'+fact.id);
   }
   if(fact.factType==='REGIONAL_AGGREGATE_NOT_THAILAND')warnings.push('IMF_NOT_THAILAND_EXPOSURE_RATE');
 }
 const total=getFact('NSO_Q2_2026_EMPLOYED').value;
 const sectorSum=['NSO_Q2_2026_AGRI','NSO_Q2_2026_MANUFACTURING','NSO_Q2_2026_SERVICES_TRADE'].reduce((n,id)=>n+getFact(id).value,0);
 if(!close(total,sectorSum))errors.push('Q2_SECTOR_SUM_MISMATCH');
 const informal=safeShare(getFact('NSO_INFORMAL_2025'),getFact('NSO_INFORMAL_DENOMINATOR_2025'));
 if(informal.status!=='VALID_SAME_SAMPLE'||!close(Math.round(informal.fraction*1000)/10,52.4))
   errors.push('INFORMAL_2025_DENOMINATOR');
 if(safeShare(getFact('NSO_INFORMAL_2025'),getFact('NSO_Q2_2026_EMPLOYED')).status!=='DENOMINATOR_MISMATCH')
   errors.push('CROSS_YEAR_MIXING_NOT_BLOCKED');
 return {status:errors.length?'DATA_BLOCKED':'SOURCE_ATTRIBUTED_BASELINE_READY',
   asOf:AS_OF,claimCount:FACTS.length,errors,warnings,
   measures:{employedQ2_2026:total,agricultureQ2_2026:getFact('NSO_Q2_2026_AGRI').value,
     manufacturingQ2_2026:getFact('NSO_Q2_2026_MANUFACTURING').value,
     servicesQ2_2026:getFact('NSO_Q2_2026_SERVICES_TRADE').value,
     informalYear2025:getFact('NSO_INFORMAL_2025').value,
     informalPercent2025:getFact('NSO_INFORMAL_RATE_2025').value,
     olderPercent2025:getFact('NSO_ELDER_SHARE_2025').value,
     debtToGDP2026_Q2:getFact('BOT_Q2_2026_HH_LOANS_GDP').value},
   futureCapability:'ASSUMED_NOT_OBSERVED'};
}
function combinations(){
 const arr=[{axes:{},bits:[]}];
 return AXES.reduce((prev,a)=>prev.flatMap(w=>a.values.map((v,j)=>
   ({axes:{...w.axes,[a.key]:v},bits:[...w.bits,j]}))),arr);
}
function distance(a,b){return a.reduce((sum,x,i)=>sum+(x===b[i]?0:1),0);}
function diverseOrder(worlds){
 const todo=worlds.slice(),ordered=[];
 while(todo.length){
   let bestIndex=0,bestMin=-1;
   for(let i=0;i<todo.length;i++){
     const min=ordered.length?Math.min(...ordered.map(q=>distance(q.bits,todo[i].bits))):0;
     if(min>bestMin){bestMin=min;bestIndex=i;}
   }
   ordered.push(todo.splice(bestIndex,1)[0]);
 }
 return ordered;
}
function features(axes){
 return {
   toolsBroad:axes.automationAccess==='BROAD_ACCESS',
   gainsShared:axes.productivityGains==='WIDELY_DISTRIBUTED',
   portable:axes.incomeProtection==='PORTABLE_INCLUSIVE',
   demandRobust:axes.complementaryDemand==='ROBUST_TRANSITION'
 };
}
function flagsFor(profile,axes){
 const a=features(axes),signals=[];
 function note(id,drivers,qualifier='CONDITIONAL_CAUSAL_HYPOTHESIS'){
   signals.push({id,drivers,epistemicStatus:qualifier});
 }
 if(!a.toolsBroad&&(profile.microbusiness||profile.rural||profile.careDependent||profile.entryWorker))
   note('AUTOMATION_TOOL_ACCESS_BARRIER',['automationAccess',profile.id]);
 if(a.toolsBroad&&(profile.microbusiness||profile.entryWorker))
   note('LOCAL_TOOL_ACCESS_OPPORTUNITY',['automationAccess',profile.id]);
 if(!a.gainsShared&&(profile.wageDependent||profile.microbusiness||profile.careDependent))
   note('AUTOMATION_INCOME_OWNERSHIP_GAP',['productivityGains',profile.id]);
 if(!a.portable&&(profile.informal||profile.entryWorker||profile.careDependent))
   note('PORTABLE_PROTECTION_GAP',['incomeProtection',profile.id]);
 if(!a.demandRobust&&(profile.wageDependent||profile.microbusiness))
   note('EARNINGS_OR_CUSTOMER_DEMAND_PRESSURE',['complementaryDemand',profile.id]);
 if(a.demandRobust&&(profile.wageDependent||profile.microbusiness))
   note('POTENTIAL_NEW_TASK_OR_MARKET_DEMAND',['complementaryDemand',profile.id]);
 if(profile.entryWorker&&!a.demandRobust)
   note('ENTRY_LEVEL_LEARNING_PATHWAY_GAP',['complementaryDemand','entryWorker']);
 if(profile.careDependent&&a.toolsBroad)
   note('ASSISTIVE_CARE_ACCESS_OPPORTUNITY',['automationAccess','careDependent']);
 if(profile.careDependent&&!a.toolsBroad)
   note('CARE_TECH_ACCESS_LIMITATION',['automationAccess','careDependent']);
 if(!a.gainsShared&&!a.portable&&!a.demandRobust)
   note('HOUSEHOLD_PURCHASING_POWER_FEEDBACK_RISK',
       ['productivityGains','incomeProtection','complementaryDemand']);
 if(profile.debtExposure&&!a.demandRobust)
   note('DEBT_SERVICE_STICKINESS_CONDITIONAL_RISK',
       ['complementaryDemand','debtExposure']);
 return {profileId:profile.id,profileTH:profile.labelTH,signals,
   derivedUnderAssumptionsOnly:true,actualIndividualOutcome:'UNKNOWN',
   unemploymentProbability:null,povertyForecast:null};
}
function stateFor(world,index){
 const axes=world.axes,a=features(axes);
 const demandLoopRisk=!a.gainsShared&&!a.portable&&!a.demandRobust;
 return {scenarioId:'TH_W'+String(index).padStart(2,'0'),axes,bits:world.bits,
   stages:[
     {node:'S1',time:'TSTAR_UNKNOWN',mode:'SIMULATED_BRANCH',capability:PREMISE.capability},
     {node:'S2',time:'0_TO_3_YEARS_AFTER_TSTAR',mode:'SIMULATED_BRANCH',
       observableNeed:['ADOPTION_COVERAGE','WAGE_SHARE','WORK_HOURS','HOUSEHOLD_DEBT_SERVICE','ACCESS_TO_SERVICES']},
     {node:'S3',time:'5_TO_10_YEARS_AFTER_TSTAR',mode:'SIMULATED_BRANCH',
       observableNeed:['DISTRIBUTION_OF_PRODUCTIVITY_GAIN','HOUSEHOLD_REAL_CONSUMPTION',
         'NEW_BUSINESS_ENTRY','AGED_CARE_ACCESS','SOCIAL_COVERAGE']}
   ],
   conditionalMacro:{
     potentialDemandIncomeFeedbackRisk:demandLoopRisk,
     capabilityIsDeployment:false,
     ownershipAndAccessDistinct:true,
     fiscalFeasibility:'UNKNOWN',
     realWageEffect:'UNKNOWN',
     peopleDisplaced:'UNKNOWN',
     sourceEffects:'HYPOTHETICAL'
   },profiles:PROFILES.map(p=>flagsFor(p,axes)),
   probability:null,unemploymentCountForecast:null,politicalActorRank:null,
   certainty:'NOT_CERTIFIED',humanFutureActuallyObserved:false};
}
function generate(budget=129){
 if(!Number.isSafeInteger(budget)||budget<0)bad('INVALID_BUDGET');
 const all=diverseOrder(combinations());
 const rootCost=1+all.length;
 if(budget<rootCost)return {status:'BUDGET_EXHAUSTED',budget,used:0,
   scenariosDeclared:16,expanded:0,unexplored:16,observedRootMode:'OBSERVED_2026_SOURCE_SNAPSHOT',
   worlds:[],firstPaths:[],globalLedger:{expandedDecisions:0,evaluatedEdges:0},
   actionCertificate:null};
 let used=rootCost,expandedDecisions=1,evaluatedEdges=16;
 const worlds=[];
 for(const w of all){
   const cost=1+PROFILES.length;
   if(used+cost>budget)break;
   used+=cost;expandedDecisions++;evaluatedEdges+=PROFILES.length;
   worlds.push(stateFor(w,worlds.length+1));
 }
 if(used!==expandedDecisions+evaluatedEdges)bad('GLOBAL_LEDGER_ACCOUNTING_MISMATCH');
 const counts={};
 for(const w of worlds)for(const profile of w.profiles)for(const s of profile.signals)
   counts[s.id]=(counts[s.id]||0)+1;
 return {status:worlds.length===all.length?'COMPLETE_DECLARED_GRID':'BUDGET_EXHAUSTED',
   model:VERSION,mode:'QUALITATIVE_SCENARIOS',scenarioScope:'DECLARED_ONLY',
   premise:PREMISE,observedRootMode:'OBSERVED_2026_SOURCE_SNAPSHOT',
   budget,used,scenariosDeclared:16,expanded:worlds.length,
   unexplored:16-worlds.length,profilesDeclared:PROFILES.length,
   implicationsExamined:worlds.length*PROFILES.length,
   firstPaths:all.slice(0,2).map(x=>x.bits.join('')),
   globalLedger:{expandedDecisions,evaluatedEdges},
   signalCountsAcrossHypotheses:counts,worlds,actionCertificate:null,
   predictionAccuracy:'UNVERIFIED',futureObservation:'WAIT_FOR_OBSERVATION'};
}
function illustrativeBudget({earnings=100,capitalIncome=0,transfers=0,essentials=60,debt=20}={}){
 for(const [k,v] of Object.entries({earnings,capitalIncome,transfers,essentials,debt}))
   if(!Number.isFinite(v)||v<0)bad('INVALID_NONNEGATIVE_TOY_INPUT_'+k);
 const disposableBeforeDiscretionary=earnings+capitalIncome+transfers-essentials-debt;
 return {incomeFromWork:earnings,capitalIncome,transferOrDividend:transfers,
   essentialCost:essentials,debtService:debt,
   residual:disposableBeforeDiscretionary,unit:'SYNTHETIC_BUDGET_UNITS',
   notObservedThaiBaht:true,notCausalForecast:true};
}
function runTests(){
 const names=[],test=(name,ok)=>{if(!ok)bad('TEST_FAILED '+name);names.push(name);};
 const gate=baselineGate(),full=generate(129),partial=generate(59),empty=generate(16);
 test('as of cutoff 2026-10-20',AS_OF==='2026-10-20');
 test('S0 official cited baseline ready',gate.status==='SOURCE_ATTRIBUTED_BASELINE_READY');
 test('no baseline fact numerical fields missing',gate.errors.length===0);
 test('undated NSO sources remain warnings, not invented dated evidence',
   gate.warnings.includes('SOURCE_EXACT_PUBLICATION_DATE_UNKNOWN_NSO_INFORMAL_2025')&&
   gate.warnings.includes('SOURCE_EXACT_PUBLICATION_DATE_UNKNOWN_NSO_ELDER_60PLUS_2025'));
 test('primary source records always trace to a URL',FACTS.every(f=>f.url||f.sourceId));
 test('future source publication blocked at the baseline gate',
   FACTS.every(f=>!f.published||f.published<=AS_OF));
 test('deliberately injected post-cutoff source is blocked by evidence gate',
   baselineGate([{id:'FUTURE_HINDSIGHT',value:1,unit:'people',year:2026,
     period:'FUTURE_DAY',scope:'THAILAND',attribution:'fixture',
     factType:'SOURCE_REPORTED_STATISTIC',url:'https://example.invalid/evidence',
     published:'2026-10-21'}]).errors.includes('SOURCE_PUBLICATION_AFTER_CUTOFF_FUTURE_HINDSIGHT'));
 test('deliberately injected missing-origin claim blocks observed baseline promotion',
   baselineGate([{id:'NO_SOURCE_FIXTURE',value:1,unit:'people',year:2026,
     period:'Q2_2026',scope:'THAILAND',attribution:'fixture',
     factType:'SOURCE_REPORTED_STATISTIC',published:'2026-10-01'}]).errors.includes('SOURCE_URL_OR_PARENT_MISSING_NO_SOURCE_FIXTURE'));
 test('baseline becomes DATA_BLOCKED if provenance injected is invalid',
   baselineGate([{id:'NO_SOURCE',value:1,unit:'people',year:2026,
     period:'Q2_2026',scope:'THAILAND',attribution:'fixture',
     factType:'SOURCE_REPORTED_STATISTIC',published:'2026-10-01'}]).status==='DATA_BLOCKED');
 test('sector employment adds to NSO employed Q2',close(11.65+9.16+20.70,41.51));
 test('NSO 2025 informal denominator agrees',close(Math.round(20.9/39.9*1000)/10,52.4));
 test('cannot mix NSO 2025 and NSO 2026 denominators',
   safeShare(getFact('NSO_INFORMAL_2025'),getFact('NSO_Q2_2026_EMPLOYED')).status==='DENOMINATOR_MISMATCH');
 test('IMF regional rate not Thai rate',
   countryExposureCheck(getFact('IMF_EMERGING_ASIA_EXPOSURE_2025'),'THAILAND').nationalProjection===null);
 test('future capability never asserted observed',PREMISE.achievedBy2026===false);
 test('T-star calendar year never guessed',PREMISE.milestoneDate==='UNKNOWN');
 test('event-driven horizons do not invent deadline year',PREMISE.horizons.every(x=>!x.includes('2030')));
 test('four declared axes',AXES.length===4);
 test('16 independent morphological combinations',combinations().length===16);
 test('all scenario axes combinations distinct',new Set(combinations().map(w=>w.bits.join(''))).size===16);
 test('six independent archetypes',PROFILES.length===6);
 test('no real person data in archetypes',PROFILES.every(x=>!x.name&&!x.identifier&&!x.address));
 test('full shared budget exactly 129',full.used===129);
 test('complete grid scenarios 16',full.expanded===16);
 test('full grid 96 group implications',full.implicationsExamined===96);
 test('full work units equal decisions plus edges',
   full.used===full.globalLedger.expandedDecisions+full.globalLedger.evaluatedEdges);
 test('full decisions 17',full.globalLedger.expandedDecisions===17);
 test('full edges 112',full.globalLedger.evaluatedEdges===112);
 test('all hypothetical leaves no numerical probabilities',full.worlds.every(w=>w.probability===null));
 test('no labour-force displacement percentage generated',
   full.worlds.every(w=>w.unemploymentCountForecast===null));
 test('full automation does not imply actual rollout',
   full.worlds.every(w=>w.conditionalMacro.capabilityIsDeployment===false));
 test('no future world promoted into observed',full.worlds.every(w=>
   w.stages.every(s=>s.mode==='SIMULATED_BRANCH')&&!w.humanFutureActuallyObserved));
 test('no invented policy actor ranking',full.worlds.every(w=>w.politicalActorRank===null));
 test('no action certificate from uncalibrated data',full.actionCertificate===null);
 test('global capped budget limited 59 uses 59',partial.used===59);
 test('limited global budget 6 worlds',partial.expanded===6);
 test('limited budget 10 unresolved worlds',partial.unexplored===10);
 test('partial budget does not pretend full coverage',partial.status==='BUDGET_EXHAUSTED');
 test('first two paths maximally contrast',partial.firstPaths.join(',')==='0000,1111');
 test('too little for initial root abstains',empty.used===0&&empty.expanded===0);
 test('same input produces identical deterministic branches',
   JSON.stringify(generate(59).worlds)===JSON.stringify(partial.worlds));
 test('all profile hypotheses trace to at least one declared driver',full.worlds.every(w=>
   w.profiles.every(p=>p.signals.every(s=>Array.isArray(s.drivers)&&s.drivers.length>0))));
 test('no signals presented as empirically proven',full.worlds.every(w=>
   w.profiles.every(p=>p.signals.every(s=>s.epistemicStatus==='CONDITIONAL_CAUSAL_HYPOTHESIS'))));
 test('all six profiles present in every expanded world',full.worlds.every(w=>w.profiles.length===6));
 test('no profile future employment probability or poverty rate',
   full.worlds.every(w=>w.profiles.every(p=>p.unemploymentProbability===null&&p.povertyForecast===null)));
 const get=(bits)=>full.worlds.find(w=>w.bits.join('')===bits);
 const openStrong=get('0000'),closedWeak=get('1111');
 test('both extreme branch worlds explicitly preserved',Boolean(openStrong&&closedWeak));
 test('weak transition concentrated distribution and patchy support creates feedback hypothesis',
   closedWeak.conditionalMacro.potentialDemandIncomeFeedbackRisk===true);
 test('broad sharing/coverage/transition does not mechanically force demand-collapse flag',
   openStrong.conditionalMacro.potentialDemandIncomeFeedbackRisk===false);
 test('small business tool barrier when access concentrated',
   closedWeak.profiles.find(p=>p.profileId==='LOCAL_MICROBUSINESS').signals.some(s=>s.id==='AUTOMATION_TOOL_ACCESS_BARRIER'));
 test('small business potential tool access when broad',
   openStrong.profiles.find(p=>p.profileId==='LOCAL_MICROBUSINESS').signals.some(s=>s.id==='LOCAL_TOOL_ACCESS_OPPORTUNITY'));
 test('informal household protection gap when patchy',
   closedWeak.profiles.find(p=>p.profileId==='INFORMAL_RURAL_FARM_HOUSEHOLD').signals.some(s=>s.id==='PORTABLE_PROTECTION_GAP'));
 test('informal household no assumed protection gap with portable coverage',
   !openStrong.profiles.find(p=>p.profileId==='INFORMAL_RURAL_FARM_HOUSEHOLD').signals.some(s=>s.id==='PORTABLE_PROTECTION_GAP'));
 test('new entrant ladder risk when complementary demand weak',
   closedWeak.profiles.find(p=>p.profileId==='YOUNG_LABOR_MARKET_ENTRANT').signals.some(s=>s.id==='ENTRY_LEVEL_LEARNING_PATHWAY_GAP'));
 test('new entrant potential alternative tasks when demand robust',
   openStrong.profiles.find(p=>p.profileId==='YOUNG_LABOR_MARKET_ENTRANT').signals.some(s=>s.id==='POTENTIAL_NEW_TASK_OR_MARKET_DEMAND'));
 test('older care access is conditional on broad tools',
   openStrong.profiles.find(p=>p.profileId==='ELDER_CARE_DEPENDENT_HOUSEHOLD').signals.some(s=>s.id==='ASSISTIVE_CARE_ACCESS_OPPORTUNITY'));
 test('older care access gap can persist under concentrated access',
   closedWeak.profiles.find(p=>p.profileId==='ELDER_CARE_DEPENDENT_HOUSEHOLD').signals.some(s=>s.id==='CARE_TECH_ACCESS_LIMITATION'));
 test('concentrated gains flag income ownership mismatch',
   closedWeak.profiles.find(p=>p.profileId==='FORMAL_ROUTINE_MANUFACTURING').signals.some(s=>s.id==='AUTOMATION_INCOME_OWNERSHIP_GAP'));
 test('widely shared gains eliminate only this assumed mismatch flag',
   !openStrong.profiles.find(p=>p.profileId==='FORMAL_ROUTINE_MANUFACTURING').signals.some(s=>s.id==='AUTOMATION_INCOME_OWNERSHIP_GAP'));
 const baseline=illustrativeBudget(),cheapOnly=illustrativeBudget({essentials:48}),
   squeezed=illustrativeBudget({earnings:60,essentials:48}),
   supported=illustrativeBudget({earnings:60,essentials:48,transfers:30}),
   debtStress=illustrativeBudget({earnings:60,essentials:48,debt:40});
 test('baseline synthetic accounting 20',baseline.residual===20);
 test('cheap goods only with unchanged wages leaves 32',cheapOnly.residual===32);
 test('wage drop can dominate cheap essentials',squeezed.residual===-8);
 test('declared hypothetical income transfer changes residual',supported.residual===22);
 test('fixed higher debt magnifies residual shortfall',debtStress.residual===-28);
 test('toy budgets not actual THB',supported.notObservedThaiBaht&&squeezed.notCausalForecast);
 test('debt and essential costs stored separately',squeezed.debtService===20&&squeezed.essentialCost===48);
 test('negative toy earnings cannot pass',(()=>{try{illustrativeBudget({earnings:-1});return false}catch(e){return e.message.startsWith('INVALID_NONNEGATIVE_TOY_INPUT')}})());
 test('invalid synthetic work budget cannot pass',(()=>{try{generate(-3);return false}catch(e){return e.message==='INVALID_BUDGET'}})());
 test('missing fact cannot silently invent',(()=>{try{getFact('NOT_A_FACT');return false}catch(e){return e.message==='NO_FACT NOT_A_FACT'}})());
 test('no invented achieved fully automated date',PREMISE.milestoneDate==='UNKNOWN');
 test('no direct real causal forecasts included',full.predictionAccuracy==='UNVERIFIED');
 test('real future requires new actual observation',full.futureObservation==='WAIT_FOR_OBSERVATION');
 test('model remains qualitative',full.mode==='QUALITATIVE_SCENARIOS');
 test('model is declared-grid only',full.scenarioScope==='DECLARED_ONLY');
 return {testStatus:'PASS',testsPassed:names.length,testNames:names,
   evidenceGate:gate,capabilityPremise:PREMISE,axes:AXES,
   complete:{status:full.status,budget:full.budget,used:full.used,
     expanded:full.expanded,implications:full.implicationsExamined,
     workLedger:full.globalLedger,counts:full.signalCountsAcrossHypotheses},
   partial:{status:partial.status,budget:partial.budget,used:partial.used,
     expanded:partial.expanded,unexplored:partial.unexplored,
     firstPaths:partial.firstPaths},
   illustrativeBudgets:{baseline,cheapOnly,squeezed,supported,debtStress},
   realityBoundary:'BASELINE_PUBLIC_2025_2026__FUTURES_HYPOTHETICAL__NO_REAL_PREDICTED_JOBS',
   causalForecastCertified:false,noAomOrSkillMerger:true,productionTouched:false};
}
if(typeof require!=='undefined'&&typeof module!=='undefined'&&require.main===module){
 console.log(JSON.stringify(runTests(),null,2));
}
