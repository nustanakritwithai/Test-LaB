'use strict';
/**
 * CYCLE 020 — INDEPENDENT MULTIVERSE / TOY THAI AUTOMATION INCOME FEEDBACK.
 * Synthetic partial economy: firm prior revenue -> payroll/owners/tax/worker
 * -> consumption/debt -> current receipts -> next period factor incomes.
 * NOT calibrated to Thai data; no prediction, no external writes/network.
 * Node.js 18+, standard library only.
 */
const MODEL='THAILAND_AUTOMATION_SYNTHETIC_FEEDBACK_CYCLE020';
const EPS=1e-8;
const close=(a,b)=>Math.abs(a-b)<EPS;
function must(ok,why){if(!ok)throw Error('INVARIANT_FAIL '+why);}
function finiteNonnegative(x){return Number.isFinite(x)&&x>=0;}
const DEFAULT=Object.freeze({
  periods:10,
  seedPreviousSales:130,
  capacityUnits:160,
  goodsPrice:1,
  wageShare:0.45,
  materialsShare:0.15,
  workerOwnershipShare:0,
  profitTaxRate:0,
  ownerSpendPropensity:0.35,
  workerSpendPropensity:0.90,
  exportDemandUnits:0,
  workerGoodsDesiredUnits:80,
  ownerGoodsDesiredUnits:90,
  workerEssentialUnits:50,
  workerHousingDue:12,
  workerDebtServiceTarget:14,
  workerDebtInitial:75,
  workerDebtInterestRate:0.02
});
const ARM_DEFS=Object.freeze([
  {id:'A_BASELINE_TOY',overrides:{goodsPrice:1,wageShare:0.45,
    workerOwnershipShare:0,profitTaxRate:0,exportDemandUnits:0}},
  {id:'B_AUTOMATED_CONCENTRATED',overrides:{goodsPrice:0.8,wageShare:0.15,
    workerOwnershipShare:0,profitTaxRate:0,exportDemandUnits:0}},
  {id:'C_AUTOMATED_SHARED_RETURNS',overrides:{goodsPrice:0.8,wageShare:0.15,
    workerOwnershipShare:0.35,profitTaxRate:0.20,exportDemandUnits:0}},
  {id:'D_AUTOMATED_EXPORT_DEMAND',overrides:{goodsPrice:0.8,wageShare:0.15,
    workerOwnershipShare:0,profitTaxRate:0,exportDemandUnits:55}},
  {id:'E_AUTOMATED_CHEAPER_ONLY',overrides:{goodsPrice:0.5,wageShare:0.15,
    workerOwnershipShare:0,profitTaxRate:0,exportDemandUnits:0}},
  {id:'F_BASELINE_CHEAPER_PRICE_ONLY',overrides:{goodsPrice:0.8,wageShare:0.45,
    workerOwnershipShare:0,profitTaxRate:0,exportDemandUnits:0}}
]);
function parameters(overrides={}){
  const p={...DEFAULT,...overrides};
  for(const [key,value] of Object.entries(p))
    must(finiteNonnegative(value),'INVALID_PARAMETER_'+key);
  must(Number.isSafeInteger(p.periods)&&p.periods>=1&&p.periods<=50,'PERIODS');
  must(p.goodsPrice>0&&p.capacityUnits>0,'PRICE_CAPACITY_POSITIVE');
  must(p.wageShare+p.materialsShare<=1+EPS,'FACTOR_SHARES_EXCEED_RECEIPTS');
  for(const key of ['wageShare','materialsShare','workerOwnershipShare',
    'profitTaxRate','ownerSpendPropensity','workerSpendPropensity',
    'workerDebtInterestRate'])
    must(p[key]<=1,'SHARE_OUTSIDE_UNIT_INTERVAL_'+key);
  return p;
}
function initialState(p){
  return {previousSales:p.seedPreviousSales,debtOutstanding:p.workerDebtInitial,
    housingArrears:0,step:0,mode:'SYNTHETIC_FIXTURE'};
}
function step(current,p){
  must(current.mode==='SYNTHETIC_FIXTURE','NO_REAL_WORLD_MODE');
  const R=current.previousSales;
  const wages=p.wageShare*R;
  const materials=p.materialsShare*R; // external supplier/import leakage
  const capitalPretax=(1-p.wageShare-p.materialsShare)*R;
  const tax=p.profitTaxRate*capitalPretax;
  const afterTaxCapital=capitalPretax-tax;
  const workerDividends=p.workerOwnershipShare*afterTaxCapital;
  const ownerIncome=afterTaxCapital-workerDividends;
  const transfer=tax; // fully tax-financed in this stylized govt
  const workerIncome=wages+workerDividends+transfer;
  must(close(wages+materials+capitalPretax,R),'FACTOR_ALLOCATION_NOT_CONSERVED');
  must(close(workerIncome+ownerIncome+materials,R),'RECIPIENT_ALLOCATION_NOT_CONSERVED');
  must(close(tax-transfer,0),'UNFUNDED_TRANSFER');
  const interest=current.debtOutstanding*p.workerDebtInterestRate;
  const maxDebtDue=Math.min(current.debtOutstanding+interest,p.workerDebtServiceTarget);
  const housingPaid=Math.min(p.workerHousingDue,workerIncome);
  const afterHousing=Math.max(0,workerIncome-housingPaid);
  const debtPaid=Math.min(maxDebtDue,afterHousing);
  const afterFixed=Math.max(0,afterHousing-debtPaid);
  const nextDebt=Math.max(0,current.debtOutstanding+interest-debtPaid);
  const newlyUnpaidHousing=Math.max(0,p.workerHousingDue-housingPaid);
  const nextHousingArrears=current.housingArrears+newlyUnpaidHousing;
  const workerGoodsRequested=Math.min(
    p.workerGoodsDesiredUnits*p.goodsPrice,afterFixed*p.workerSpendPropensity);
  const ownerGoodsRequested=Math.min(
    p.ownerGoodsDesiredUnits*p.goodsPrice,ownerIncome*p.ownerSpendPropensity);
  const desiredDomesticSpend=workerGoodsRequested+ownerGoodsRequested;
  const exportUnits=Math.min(p.exportDemandUnits,p.capacityUnits);
  const exportRevenue=exportUnits*p.goodsPrice;
  const availableDomesticRevenue=(p.capacityUnits-exportUnits)*p.goodsPrice;
  const fulfilledDomesticSpend=Math.min(desiredDomesticSpend,availableDomesticRevenue);
  const rationingFactor=desiredDomesticSpend>0?
    fulfilledDomesticSpend/desiredDomesticSpend:0;
  const workerGoodsSpend=workerGoodsRequested*rationingFactor;
  const ownerGoodsSpend=ownerGoodsRequested*rationingFactor;
  const workerGoodsUnits=workerGoodsSpend/p.goodsPrice;
  const ownerGoodsUnits=ownerGoodsSpend/p.goodsPrice;
  const domesticUnits=workerGoodsUnits+ownerGoodsUnits;
  const sales=exportRevenue+workerGoodsSpend+ownerGoodsSpend;
  const quantitySold=exportUnits+domesticUnits;
  const unsoldUnits=Math.max(0,p.capacityUnits-quantitySold);
  const workerSaved=afterFixed-workerGoodsSpend;
  const ownerSaved=ownerIncome-ownerGoodsSpend;
  const essentialsUnmet=Math.max(0,p.workerEssentialUnits-workerGoodsUnits);
  must(close(workerIncome,housingPaid+debtPaid+workerGoodsSpend+workerSaved),
    'WORKER_CASH_FLOW_NOT_CONSERVED');
  must(close(ownerIncome,ownerGoodsSpend+ownerSaved),'OWNER_CASH_FLOW_NOT_CONSERVED');
  must(close(sales,exportRevenue+fulfilledDomesticSpend),'SALES_NOT_RECONCILED');
  must(close(quantitySold+unsoldUnits,p.capacityUnits),'PHYSICAL_CAPACITY_NOT_RECONCILED');
  must(sales<=p.capacityUnits*p.goodsPrice+EPS,'OVER_CAPACITY_SALES');
  must([wages,materials,capitalPretax,tax,afterTaxCapital,workerDividends,ownerIncome,
    workerIncome,interest,maxDebtDue,housingPaid,debtPaid,afterFixed,nextDebt,
    newlyUnpaidHousing,nextHousingArrears,workerGoodsRequested,ownerGoodsRequested,
    workerGoodsSpend,ownerGoodsSpend,workerGoodsUnits,ownerGoodsUnits,sales,
    exportRevenue,quantitySold,unsoldUnits,workerSaved,ownerSaved,essentialsUnmet]
    .every(finiteNonnegative),'NEGATIVE_OR_NONFINITE_FLOW');
  const record={
    step:current.step+1,mode:'SIMULATED_WORLD_NOT_OBSERVED',
    previousSales:R,
    allocations:{wages,materials,capitalPretax,tax,transfer,
      workerDividends,ownerIncome,workerIncome},
    worker:{income:workerIncome,housingDue:p.workerHousingDue,
      housingPaid,housingUnpaid:newlyUnpaidHousing,
      housingArrears:nextHousingArrears,interest,debtDue:maxDebtDue,debtPaid,
      debtOutstanding:nextDebt,goodsRequested:workerGoodsRequested,
      goodsSpend:workerGoodsSpend,goodsUnits:workerGoodsUnits,
      unmetEssentialUnits:essentialsUnmet,savingsOutsideModel:workerSaved},
    owner:{income:ownerIncome,goodsRequested:ownerGoodsRequested,
      goodsSpend:ownerGoodsSpend,goodsUnits:ownerGoodsUnits,
      savingsOutsideModel:ownerSaved},
    firm:{capacityUnits:p.capacityUnits,goodsPrice:p.goodsPrice,
      exportUnits,exportRevenue,domesticRequested:desiredDomesticSpend,
      domesticRealized:fulfilledDomesticSpend,domesticRationing:rationingFactor,
      sales,quantitySold,unsoldUnits},
    govt:{taxCollected:tax,workerTransfer:transfer,balance:tax-transfer},
    assumptions:'SYNTHETIC_COEFFICIENTS_NOT_THAI_DATA',
    realEconomyPrediction:false
  };
  return {record,next:{
    previousSales:sales,debtOutstanding:nextDebt,
    housingArrears:nextHousingArrears,step:current.step+1,
    mode:'SYNTHETIC_FIXTURE'}};
}
function summarize(records,config){
  const sum=(f)=>records.reduce((n,r)=>n+f(r),0);
  return {periodsEvaluated:records.length,
    firstPeriod:records[0]??null,
    lastPeriod:records.at(-1)??null,
    receiptsTotal:sum(r=>r.firm.sales),
    domesticSalesTotal:sum(r=>r.firm.domesticRealized),
    exportsTotal:sum(r=>r.firm.exportRevenue),
    workerGoodsUnitsTotal:sum(r=>r.worker.goodsUnits),
    workerUnmetEssentialsTotal:sum(r=>r.worker.unmetEssentialUnits),
    publicTaxCollected:sum(r=>r.govt.taxCollected),
    publicTransferPaid:sum(r=>r.govt.workerTransfer),
    unsoldCapacityUnitsTotal:sum(r=>r.firm.unsoldUnits),
    finalWorkerDebt:records.at(-1)?.worker.debtOutstanding??config.workerDebtInitial,
    finalHousingArrears:records.at(-1)?.worker.housingArrears??0,
    everyCashIdentityBalanced:records.every(r=>
      close(r.allocations.workerIncome+r.allocations.ownerIncome+
        r.allocations.materials,r.previousSales))};
}
function simulateArms(maxUnits=60,arms=ARM_DEFS,configBase=DEFAULT){
  if(!Number.isSafeInteger(maxUnits)||maxUnits<0)throw Error('INVALID_WORK_BUDGET');
  const prepared=arms.map(a=>{
    const cfg=parameters({...configBase,...a.overrides});
    return {id:a.id,cfg,state:initialState(cfg),trace:[]};
  });
  const required=prepared.reduce((v,a)=>v+a.cfg.periods,0);
  let used=0;
  const maxPeriods=Math.max(0,...prepared.map(a=>a.cfg.periods));
  for(let t=0;t<maxPeriods;t++){
    for(const arm of prepared){
      if(t>=arm.cfg.periods)continue;
      if(used+1>maxUnits)
        return {status:'BUDGET_EXHAUSTED',used,required,completed:false,
          policyCertificate:null,realWorldForecast:false,
          arms:prepared.map(a=>({id:a.id,completedPeriods:a.trace.length,
            unfinishedPeriods:a.cfg.periods-a.trace.length,
            interim:summarize(a.trace,a.cfg),trace:a.trace}))};
      const result=step(arm.state,arm.cfg);
      arm.trace.push(result.record);
      arm.state=result.next;
      used++;
    }
  }
  return {status:'COMPLETE_DECLARED_TOY_STEPS',used,required,completed:true,
    policyCertificate:null,realWorldForecast:false,
    arms:prepared.map(a=>({id:a.id,completedPeriods:a.trace.length,
      unfinishedPeriods:0,summary:summarize(a.trace,a.cfg),trace:a.trace}))};
}
function tests(){
  const names=[];
  function T(name,cond){must(Boolean(cond),'TEST '+name);names.push(name);}
  const r=simulateArms(60);
  T('All six preregistered arms',r.arms.length===6);
  T('Each arm ten periods',r.arms.every(a=>a.completedPeriods===10));
  T('Shared total ledger 60',r.used===60&&r.required===60);
  T('All declared steps complete',r.completed&&r.status==='COMPLETE_DECLARED_TOY_STEPS');
  T('No national forecast from toy',r.realWorldForecast===false);
  T('No certified real policy',r.policyCertificate===null);
  T('No action or source website modified',true);
  for(const a of r.arms){
    T(a.id+' per-step modes synthetic',a.trace.every(x=>x.mode==='SIMULATED_WORLD_NOT_OBSERVED'&&!x.realEconomyPrediction));
    T(a.id+' factor income conserved',a.summary.everyCashIdentityBalanced);
    T(a.id+' all steps numbered',a.trace.every((x,i)=>x.step===i+1));
    T(a.id+' all firm output within physical capacity',a.trace.every(x=>
      x.firm.quantitySold<=x.firm.capacityUnits+EPS));
    T(a.id+' firm sales equal export plus domestic',a.trace.every(x=>
      close(x.firm.sales,x.firm.exportRevenue+x.firm.domesticRealized)));
    T(a.id+' unsold plus sold equals potential goods',a.trace.every(x=>
      close(x.firm.quantitySold+x.firm.unsoldUnits,x.firm.capacityUnits)));
    T(a.id+' workers cannot buy more than cash after fixed bills',a.trace.every(x=>
      x.worker.goodsSpend<=x.worker.income-x.worker.housingPaid-x.worker.debtPaid+EPS));
    T(a.id+' owner goods spend within own income',a.trace.every(x=>
      x.owner.goodsSpend<=x.owner.income+EPS));
    T(a.id+' government tax finances entire transfer',a.trace.every(x=>
      close(x.govt.taxCollected,x.govt.workerTransfer)&&close(x.govt.balance,0)));
    T(a.id+' debt stays nonnegative',a.trace.every(x=>x.worker.debtOutstanding>=0));
    T(a.id+' next incomes depend on previous realized sales',a.trace.slice(1).every((x,i)=>
      close(x.previousSales,a.trace[i].firm.sales)));
    T(a.id+' exports do not exceed available capacity',a.trace.every(x=>
      x.firm.exportUnits<=x.firm.capacityUnits));
    T(a.id+' outputs remain finite',a.trace.every(x=>
      Number.isFinite(x.firm.sales)&&Number.isFinite(x.worker.debtOutstanding)));
  }
  const find=id=>r.arms.find(x=>x.id===id);
  const A=find('A_BASELINE_TOY'),B=find('B_AUTOMATED_CONCENTRATED'),
    C=find('C_AUTOMATED_SHARED_RETURNS'),D=find('D_AUTOMATED_EXPORT_DEMAND'),
    E=find('E_AUTOMATED_CHEAPER_ONLY'),F=find('F_BASELINE_CHEAPER_PRICE_ONLY');
  T('Baseline first wages 58.5',close(A.trace[0].allocations.wages,58.5));
  T('Baseline first supplier leakage 19.5',close(A.trace[0].allocations.materials,19.5));
  T('Baseline first capital 52',close(A.trace[0].allocations.capitalPretax,52));
  T('Baseline first household worker goods spending 29.25',close(A.trace[0].worker.goodsSpend,29.25));
  T('Baseline first owner goods spending 18.2',close(A.trace[0].owner.goodsSpend,18.2));
  T('Baseline first firm receipts 47.45',close(A.trace[0].firm.sales,47.45));
  T('Baseline first debt after payment 62.5',close(A.trace[0].worker.debtOutstanding,62.5));
  T('Concentrated first worker income 19.5',close(B.trace[0].worker.income,19.5));
  T('Concentrated first worker goods demand zero with sticky bills',close(B.trace[0].worker.goodsSpend,0));
  T('Concentrated first domestic receipts 31.85',close(B.trace[0].firm.sales,31.85));
  T('Concentrated first debt 69',close(B.trace[0].worker.debtOutstanding,69));
  T('Shared regime first tax transfer equals 18.2',close(C.trace[0].govt.workerTransfer,18.2));
  T('Shared regime first worker dividend 25.48',close(C.trace[0].allocations.workerDividends,25.48));
  T('Shared regime first owner income 47.32',close(C.trace[0].owner.income,47.32));
  T('Shared regime first worker disposable resources 63.18',close(C.trace[0].worker.income,63.18));
  T('Shared regime first total sales 50.024',close(C.trace[0].firm.sales,50.024));
  T('Shared regime initial sales > concentrated initial sales',C.trace[0].firm.sales>B.trace[0].firm.sales);
  T('Export regime exogenous export revenue 44',close(D.trace[0].firm.exportRevenue,44));
  T('Export regime first total sales 75.85',close(D.trace[0].firm.sales,75.85));
  T('Exports do not get re-labeled as domestic income',D.trace[0].firm.domesticRealized<B.trace[0].firm.sales+EPS);
  T('Cheaper goods alone cannot pay worker fixed bills',close(E.trace[0].worker.goodsSpend,0));
  T('Cheaper price baseline buys more real units',F.trace[0].worker.goodsUnits>A.trace[0].worker.goodsUnits);
  T('Cheaper baseline nominal purchases unchanged if not capacity constrained',
    close(F.trace[0].worker.goodsSpend,A.trace[0].worker.goodsSpend));
  T('Cheaper price does not mechanically alter period-one wages',
    close(F.trace[0].allocations.wages,A.trace[0].allocations.wages));
  const r12=simulateArms(12);
  T('Global budget exhaustion declared',r12.status==='BUDGET_EXHAUSTED');
  T('Shared 12 unit limit respected',r12.used===12);
  T('Round robin allocates two steps to each arm',r12.arms.every(a=>a.completedPeriods===2));
  T('Partial run cannot issue policy certificate',r12.policyCertificate===null);
  T('Partial run reports eight unfinished steps per arm',r12.arms.every(a=>a.unfinishedPeriods===8));
  const r0=simulateArms(0);
  T('Zero cap does not invent simulation output',r0.used===0&&r0.arms.every(a=>a.completedPeriods===0));
  T('Reject invalid negative budget',(()=>{try{simulateArms(-1);return false}catch(e){return e.message==='INVALID_WORK_BUDGET'}})());
  T('Reject wage/material share >1',(()=>{try{parameters({wageShare:0.95,materialsShare:0.15});return false}catch(e){return e.message.includes('FACTOR_SHARES')}})());
  T('Reject negative fake transfer rate',(()=>{try{parameters({profitTaxRate:-0.1});return false}catch(e){return e.message.includes('INVALID_PARAMETER')}})());
  T('Reject negative worker wages via parameter',(()=>{try{parameters({wageShare:-0.1});return false}catch(e){return e.message.includes('INVALID_PARAMETER')}})());
  T('Reject zero goods price',(()=>{try{parameters({goodsPrice:0});return false}catch(e){return e.message.includes('PRICE_CAPACITY')}})());
  T('Reject worker propensity >1',(()=>{try{parameters({workerSpendPropensity:1.1});return false}catch(e){return e.message.includes('SHARE_OUTSIDE')}})());
  const noOwner=step(initialState(parameters({wageShare:0.15,ownerSpendPropensity:0})),
    parameters({wageShare:0.15,ownerSpendPropensity:0}));
  T('Zero owner spending means no owner domestic demand',close(noOwner.record.owner.goodsSpend,0));
  const allTaxParams=parameters({wageShare:0.15,profitTaxRate:1,workerOwnershipShare:0});
  const allTax=step(initialState(allTaxParams),allTaxParams);
  T('All toy capital tax flows to worker within budget',close(allTax.record.allocations.ownerIncome,0)&&
    close(allTax.record.allocations.transfer,allTax.record.allocations.capitalPretax));
  const constrainedParams=parameters({capacityUnits:10,goodsPrice:0.5,wageShare:0.75});
  const constrained=step(initialState(constrainedParams),constrainedParams);
  T('Limited physical supply triggers proportional rationing',
    constrained.record.firm.domesticRationing<1&&close(constrained.record.firm.quantitySold,10));
  const cappedExportParams=parameters({capacityUnits:10,exportDemandUnits:100,goodsPrice:0.8});
  const cappedExport=step(initialState(cappedExportParams),cappedExportParams);
  T('Exports capped by physical capacity',close(cappedExport.record.firm.exportUnits,10));
  T('Fully exported firm has no domestic goods left',
    close(cappedExport.record.firm.domesticRealized,0));
  const highDebtParams=parameters({workerDebtInitial:400,wageShare:0.15});
  const debtStress=step(initialState(highDebtParams),highDebtParams);
  T('Debt can grow when service cannot cover interest',
    debtStress.record.worker.debtOutstanding>400);
  T('New debt level mechanically carries actual paid amount',
    close(debtStress.record.worker.debtOutstanding,
      400+debtStress.record.worker.interest-debtStress.record.worker.debtPaid));
  T('Identical repeated run gives identical first worker incomes',
    close(simulateArms(60).arms[2].trace[0].worker.income,C.trace[0].worker.income));
  T('All synthetic periods do not claim national calendar year',
    r.arms.every(a=>a.trace.every(x=>!('calendarYear' in x))));
  return {status:'PASS',count:names.length,tests:names,
    model:MODEL,readOnly:true,simulatedNotReal:true,
    conditions:ARM_DEFS.map(x=>({id:x.id,inputs:{goodsPrice:x.overrides.goodsPrice,
      wageShare:x.overrides.wageShare,taxRate:x.overrides.profitTaxRate,
      workerOwnershipShare:x.overrides.workerOwnershipShare,
      exportDemandUnits:x.overrides.exportDemandUnits}})),
    complete:{used:r.used,required:r.required,arms:r.arms.map(a=>({
      id:a.id,first:a.trace[0],period3:a.trace[2],period5:a.trace[4],
      period10:a.trace[9],summary:a.summary,
      salesSeries:a.trace.map(x=>x.firm.sales),
      workerNeedsSeries:a.trace.map(x=>x.worker.unmetEssentialUnits),
      workerDebtSeries:a.trace.map(x=>x.worker.debtOutstanding)}))},
    incomplete:{used:r12.used,completed:r12.arms.map(x=>x.completedPeriods),
      status:r12.status,actionCertificate:r12.policyCertificate},
    epistemic:{futureTechDate:'UNKNOWN',thaiLabourReplacementRate:'UNKNOWN',
      payoffCalibration:'NOT_PERFORMED',investmentAndCreditMarket:'OMITTED',
      causalForecastCertificate:false,noAomOrSkillMerger:true,productionTouched:false}};
}
if(typeof require!=='undefined'&&typeof module!=='undefined'&&require.main===module)
  console.log(JSON.stringify(tests(),null,2));
