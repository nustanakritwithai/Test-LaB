'use strict';
/*
 * Cycle 021: THAILAND AUTOMATION CIRCULAR CASH-FLOW SENSITIVITY.
 * Extension of the frozen independent Cycle 020 model; no AOM integration.
 * Reuses Cycle 020 household wage/profit/tax/debt calculations rather
 * than rewriting or silently changing that experiment's source code.
 * No network access; Node.js 18+ standard-library FS only in CLI runner.
 * ALL parameters and outputs are synthetic partial-economy thought fixtures.
 */
const EPS=1e-8;
const close=(a,b)=>Math.abs(a-b)<EPS;
function must(cond,msg){if(!cond)throw Error('RECYCLING_INVARIANT_FAILED '+msg);}
const REGIMES=Object.freeze([
 {id:'B0_CONCENTRATED_NO_RECYCLING',parent:'B_AUTOMATED_CONCENTRATED',rate:0},
 {id:'B50_CONCENTRATED_HALF_RECYCLING',parent:'B_AUTOMATED_CONCENTRATED',rate:0.5},
 {id:'B100_CONCENTRATED_FULL_RECYCLING',parent:'B_AUTOMATED_CONCENTRATED',rate:1},
 {id:'C0_SHARED_NO_RECYCLING',parent:'C_AUTOMATED_SHARED_RETURNS',rate:0},
 {id:'C50_SHARED_HALF_RECYCLING',parent:'C_AUTOMATED_SHARED_RETURNS',rate:0.5},
 {id:'D0_EXPORT_NO_RECYCLING',parent:'D_AUTOMATED_EXPORT_DEMAND',rate:0}
]);
function requireBase(base){
 must(base&&typeof base.parameters==='function'&&typeof base.step==='function'
    &&typeof base.initialState==='function'&&Array.isArray(base.ARM_DEFS),
    'FROZEN_CYCLE020_SOURCE_MISSING');
 return base;
}
function init(base,cfg,rate){
 must(Number.isFinite(rate)&&rate>=0&&rate<=1,'INVALID_RECYCLING_RATE');
 const core=base.initialState(cfg);
 return {...core,priorCashLeakStock:0,
   accumulatedExportReceipts:0,mode:'SYNTHETIC_FIXTURE'};
}
function recycledStep(state,cfg,rate,base){
 requireBase(base);
 must(Number.isFinite(rate)&&rate>=0&&rate<=1,'INVALID_RECYCLING_RATE');
 must(Number.isFinite(state.priorCashLeakStock)&&state.priorCashLeakStock>=0,'INVALID_LEAK_STOCK');
 const underlying=base.step(state,cfg);
 const old=underlying.record;
 const priorStock=state.priorCashLeakStock;
 const recycledRequested=rate*priorStock;
 must(recycledRequested<=priorStock+EPS,'THIRD_BUYER_REQUEST_EXCEEDS_PRIOR_FUNDS');
 const workerDesired=old.worker.goodsRequested;
 const ownerDesired=old.owner.goodsRequested;
 const totalDesired=workerDesired+ownerDesired+recycledRequested;
 const availableDomesticRevenue=(cfg.capacityUnits-old.firm.exportUnits)*cfg.goodsPrice;
 const fulfilledTotal=Math.min(totalDesired,availableDomesticRevenue);
 const scale=totalDesired>0?fulfilledTotal/totalDesired:0;
 const workerGoodsSpend=workerDesired*scale;
 const ownerGoodsSpend=ownerDesired*scale;
 const recycledSpend=recycledRequested*scale;
 const workerSavings=old.worker.income-old.worker.housingPaid-old.worker.debtPaid-workerGoodsSpend;
 const ownerSavings=old.owner.income-ownerGoodsSpend;
 const newLeakage=old.allocations.materials+old.worker.housingPaid+
   old.worker.debtPaid+workerSavings+ownerSavings;
 const nextLeakageStock=priorStock-recycledSpend+newLeakage;
 const exportRevenue=old.firm.exportRevenue;
 const nextSales=exportRevenue+workerGoodsSpend+ownerGoodsSpend+recycledSpend;
 const totalSoldUnits=old.firm.exportUnits+fulfilledTotal/cfg.goodsPrice;
 const unsoldUnits=Math.max(0,cfg.capacityUnits-totalSoldUnits);
 const previousCombinedMonetaryStock=state.previousSales+priorStock;
 const nextCombinedMonetaryStock=nextSales+nextLeakageStock;
 must([workerGoodsSpend,ownerGoodsSpend,recycledSpend,workerSavings,
  ownerSavings,newLeakage,nextLeakageStock,nextSales,unsoldUnits]
    .every(x=>Number.isFinite(x)&&x>=-EPS),'NEGATIVE_OR_NAN');
 must(close(workerGoodsSpend+ownerGoodsSpend+recycledSpend,fulfilledTotal),
   'DOMESTIC_SPENDING_MISMATCH');
 must(close(fulfilledTotal+exportRevenue,nextSales),'REVENUE_MISMATCH');
 must(close(workerGoodsSpend+old.worker.housingPaid+old.worker.debtPaid+workerSavings,
   old.worker.income),'WORKER_SPENDING_EXCEEDS_FUNDS');
 must(close(ownerGoodsSpend+ownerSavings,old.owner.income),'OWNER_SPENDING_EXCEEDS_FUNDS');
 must(close(old.worker.income+old.owner.income+old.allocations.materials,state.previousSales),
   'CURRENT_PRIOR_INCOME_NOT_CONSERVED');
 must(close(recycledSpend+nextLeakageStock,priorStock+newLeakage),
   'LEAKAGE_FUNDS_DOUBLE_SPENT');
 must(close(nextCombinedMonetaryStock,previousCombinedMonetaryStock+exportRevenue),
   'MONETARY_STOCK_CREATION_EXCEPT_EXPORT');
 must(close(totalSoldUnits+unsoldUnits,cfg.capacityUnits),
   'PHYSICAL_SUPPLY_NOT_CONSERVED');
 must(nextSales<=cfg.capacityUnits*cfg.goodsPrice+EPS,'SALES_OVER_PHYSICAL_CAP');
 must(close(old.govt.taxCollected,old.govt.workerTransfer),'UNFUNDED_TRANSFER');
 const row={
  step:old.step,mode:'SYNTHETIC_FIXTURE',
  observedThaiEconomicFuture:false,
  previousSales:state.previousSales,
  moneyBefore:previousCombinedMonetaryStock,
  moneyAfter:nextCombinedMonetaryStock,
  outsideCashPrior:priorStock,
  outsideCashCurrent:newLeakage,
  outsideCashAfter:nextLeakageStock,
  recyclingRate:rate,
  recyclingDemand:recycledRequested,
  thirdBuyerRealized:recycledSpend,
  exportRevenue,domesticRevenue:fulfilledTotal,firmSales:nextSales,
  workerIncome:old.worker.income,
  ownerIncome:old.owner.income,
  workerGoodsSpend,ownerGoodsSpend,
  workerGoodsUnits:workerGoodsSpend/cfg.goodsPrice,
  ownerGoodsUnits:ownerGoodsSpend/cfg.goodsPrice,
  thirdBuyerGoodsUnits:recycledSpend/cfg.goodsPrice,
  workerUnmetEssentials:Math.max(0,cfg.workerEssentialUnits-workerGoodsSpend/cfg.goodsPrice),
  workerDebtAfter:old.worker.debtOutstanding,
  workerHousingArrearsAfter:old.worker.housingArrears,
  workerSavingsOutside:workerSavings,
  ownerSavingsOutside:ownerSavings,
  inputMaterialsLeak:old.allocations.materials,
  workerHousingPaid:old.worker.housingPaid,
  workerDebtPaid:old.worker.debtPaid,
  govtTax:old.govt.taxCollected,
  govtTransfer:old.govt.workerTransfer,
  physicalSoldUnits:totalSoldUnits,
  unsoldCapacity:unsoldUnits,
  domesticSupplyFulfillment:scale,
  noFutureEvidenceUsed:true,
  simulationCausalParameters:'INVENTED_TOY_ONLY'
 };
 return {row,
  next:{...underlying.next,previousSales:nextSales,
    priorCashLeakStock:nextLeakageStock,
    accumulatedExportReceipts:state.accumulatedExportReceipts+exportRevenue,
    mode:'SYNTHETIC_FIXTURE'}};
}
function scenarios(base,workLimit=60,defs=REGIMES){
 requireBase(base);
 if(!Number.isSafeInteger(workLimit)||workLimit<0)throw Error('INVALID_GLOBAL_BUDGET');
 const arms=defs.map(def=>{
   const ancestor=base.ARM_DEFS.find(a=>a.id===def.parent);
   must(Boolean(ancestor),'PARENT_ARM_NOT_FOUND');
   const cfg=base.parameters({...base.DEFAULT,...ancestor.overrides});
   return {...def,cfg,state:init(base,cfg,def.rate),rows:[]};
 });
 const required=arms.reduce((n,a)=>n+a.cfg.periods,0);
 let used=0;
 for(let t=0;t<Math.max(...arms.map(a=>a.cfg.periods));t++){
   for(const arm of arms){
     if(t>=arm.cfg.periods)continue;
     if(used>=workLimit)return {status:'BUDGET_EXHAUSTED',work:{used,required},
       complete:false,certificate:null,
       arms:arms.map(a=>compact(a))};
     const r=recycledStep(arm.state,arm.cfg,arm.rate,base);
     arm.rows.push(r.row);arm.state=r.next;used++;
   }
 }
 return {status:'COMPLETE_SYNTHETIC_CIRCULATION',work:{used,required},
   complete:true,certificate:null,arms:arms.map(a=>compact(a))};
}
function compact(a){
 const sum=key=>a.rows.reduce((v,row)=>v+row[key],0);
 return {id:a.id,ancestor:a.parent,recyclingRate:a.rate,done:a.rows.length,
   remaining:a.cfg.periods-a.rows.length,
   first:a.rows[0]??null,last:a.rows.at(-1)??null,
   totalSales:sum('firmSales'),domesticRevenue:sum('domesticRevenue'),
   exports:sum('exportRevenue'),totalRecycled:sum('thirdBuyerRealized'),
   finalDebt:a.rows.at(-1)?.workerDebtAfter??a.cfg.workerDebtInitial,
   finalOutsideCash:a.rows.at(-1)?.outsideCashAfter??0,
   rows:a.rows};
}
function testCycle021(base){
 requireBase(base);
 const tests=[];
 const T=(name,ok)=>{must(Boolean(ok),'TEST_'+name);tests.push(name);};
 const result=scenarios(base,60);
 const prior=base.simulateArms(60);
 T('six registered arms',result.arms.length===6);
 T('full 60 simulated points',result.work.used===60&&result.work.required===60);
 T('ten periods per arm',result.arms.every(a=>a.done===10));
 T('no action certificate',result.certificate===null);
 T('all futures remain simulated',result.arms.every(a=>a.rows.every(r=>r.mode==='SYNTHETIC_FIXTURE'&&!r.observedThaiEconomicFuture)));
 const oldB=prior.arms.find(a=>a.id==='B_AUTOMATED_CONCENTRATED');
 const oldC=prior.arms.find(a=>a.id==='C_AUTOMATED_SHARED_RETURNS');
 const oldD=prior.arms.find(a=>a.id==='D_AUTOMATED_EXPORT_DEMAND');
 const B0=result.arms.find(a=>a.id==='B0_CONCENTRATED_NO_RECYCLING');
 const B50=result.arms.find(a=>a.id==='B50_CONCENTRATED_HALF_RECYCLING');
 const B100=result.arms.find(a=>a.id==='B100_CONCENTRATED_FULL_RECYCLING');
 const C0=result.arms.find(a=>a.id==='C0_SHARED_NO_RECYCLING');
 const C50=result.arms.find(a=>a.id==='C50_SHARED_HALF_RECYCLING');
 const D0=result.arms.find(a=>a.id==='D0_EXPORT_NO_RECYCLING');
 for(const [id,ours,original] of [['B0',B0,oldB],['C0',C0,oldC],['D0',D0,oldD]]){
   for(let t=0;t<10;t++){
     const old=original.trace[t],now=ours.rows[t];
     T(id+' firm receipt matches base at '+t,close(now.firmSales,old.firm.sales));
     T(id+' worker debt matches base at '+t,close(now.workerDebtAfter,old.worker.debtOutstanding));
     T(id+' worker goods matches base at '+t,close(now.workerGoodsSpend,old.worker.goodsSpend));
     T(id+' owner goods matches base at '+t,close(now.ownerGoodsSpend,old.owner.goodsSpend));
     T(id+' worker housing arrears match base at '+t,close(now.workerHousingArrearsAfter,old.worker.housingArrears));
   }
 }
 T('B0 initial firm sales 31.85',close(B0.first.firmSales,31.85));
 T('C0 initial firm sales 50.024',close(C0.first.firmSales,50.024));
 T('D0 initial firm sales 75.85',close(D0.first.firmSales,75.85));
 T('B0 last period matches Cycle020 concentrated',close(B0.last.firmSales,oldB.trace[9].firm.sales));
 T('C0 last period matches Cycle020 shared',close(C0.last.firmSales,oldC.trace[9].firm.sales));
 T('D0 last period matches Cycle020 export',close(D0.last.firmSales,oldD.trace[9].firm.sales));
 T('Initial recycling zero because prior outside stock zero',
   close(B0.first.thirdBuyerRealized,0)&&close(B50.first.thirdBuyerRealized,0)&&close(B100.first.thirdBuyerRealized,0));
 T('First period firm sales unaffected by recycling',
   close(B0.first.firmSales,B50.first.firmSales)&&close(B0.first.firmSales,B100.first.firmSales));
 T('Recycling rate sensitivity changes later firm receipts',
   !close(B0.rows[1].firmSales,B50.rows[1].firmSales)&&
   !close(B50.rows[1].firmSales,B100.rows[1].firmSales));
 T('No recycling means third buyer never purchases',
   [B0,C0,D0].every(x=>x.rows.every(r=>close(r.thirdBuyerRealized,0))));
 T('Recycled purchases sourced only from existing prior cash stock',
   [B50,B100,C50].every(x=>x.rows.every(r=>r.thirdBuyerRealized<=r.outsideCashPrior+EPS)));
 T('Leak stock positive after first receipt distribution',
   result.arms.every(a=>a.first.outsideCashAfter>0));
 T('No-export total firm cash + outside cash conserved at 130',
   [B0,B50,B100,C0,C50].every(a=>a.rows.every(r=>close(r.moneyAfter,130))));
 T('With exports money stock grows only by external export receipts',
   D0.rows.every((r,i)=>close(r.moneyAfter,130+44*(i+1))));
 T('Govt transfers all sourced from capital tax',
   result.arms.every(a=>a.rows.every(r=>close(r.govtTax,r.govtTransfer))));
 for(const a of result.arms){
   T(a.id+' all stored stocks nonnegative',a.rows.every(r=>
     r.outsideCashAfter>=-EPS&&r.workerDebtAfter>=-EPS&&r.firmSales>=-EPS));
   T(a.id+' money allocation reconciles each step',a.rows.every(r=>
     close(r.moneyAfter,r.moneyBefore+r.exportRevenue)));
   T(a.id+' no third-buyer double spending',a.rows.every(r=>
     r.thirdBuyerRealized<=r.outsideCashPrior+EPS));
   T(a.id+' physical output never exceeded',a.rows.every(r=>
     r.physicalSoldUnits<=a.first.physicalSoldUnits*0+160+EPS));
   T(a.id+' finite numeric trail',a.rows.every(r=>
     Number.isFinite(r.outsideCashAfter)&&Number.isFinite(r.firmSales)));
 }
 const short=scenarios(base,12);
 T('shared-work cap 12',short.work.used===12&&short.status==='BUDGET_EXHAUSTED');
 T('exactly 2 steps of each arm under cap',short.arms.every(a=>a.done===2));
 T('eight remaining per capped arm',short.arms.every(a=>a.remaining===8));
 T('partial does not certify action',short.certificate===null);
 const empty=scenarios(base,0);
 T('budget zero produces no invented steps',empty.work.used===0&&empty.arms.every(a=>a.done===0));
 T('invalid negative cap rejected',(()=>{try{scenarios(base,-1);return false}catch(e){return e.message==='INVALID_GLOBAL_BUDGET'}})());
 T('invalid recycling negative rejected',(()=>{try{init(base,base.parameters(),-0.1);return false}catch(e){return e.message.includes('INVALID_RECYCLING_RATE')}})());
 T('invalid recycling above one rejected',(()=>{try{init(base,base.parameters(),1.1);return false}catch(e){return e.message.includes('INVALID_RECYCLING_RATE')}})());
 T('invalid leakage stock rejected',(()=>{
    const p=base.parameters({goodsPrice:.8,wageShare:.15});
    const s={...init(base,p,0.5),priorCashLeakStock:-1};
    try{recycledStep(s,p,0.5,base);return false}catch(e){return e.message.includes('INVALID_LEAK_STOCK')}})());
 const shortageParams=base.parameters({capacityUnits:10,goodsPrice:.5,wageShare:.75});
 const shortState={...init(base,shortageParams,1),priorCashLeakStock:100};
 const shortage=recycledStep(shortState,shortageParams,1,base).row;
 T('constrained supply reallocates across worker owner and third buyers',
    shortage.domesticSupplyFulfillment<1&&close(shortage.physicalSoldUnits,10));
 T('all buyers rationed by one factor under shortage',
    close(shortage.thirdBuyerRealized,100*shortage.domesticSupplyFulfillment));
 T('over-subscribed buyer does not spend future leak cash',shortage.thirdBuyerRealized<=100+EPS);
 const exportLimitParams=base.parameters({capacityUnits:10,exportDemandUnits:100,goodsPrice:.8,wageShare:.15});
 const exportLimit=recycledStep(init(base,exportLimitParams,1),exportLimitParams,1,base).row;
 T('exports prioritized but physically capped',close(exportLimit.exportRevenue,8)&&close(exportLimit.domesticRevenue,0));
 T('export injections counted once',close(exportLimit.moneyAfter,138));
 T('recycled case different from zero case in a later period',
    !close(B50.last.firmSales,B0.last.firmSales));
 T('all model output is synthetic not real Thai forecast',
    result.arms.every(a=>a.rows.every(r=>r.simulationCausalParameters==='INVENTED_TOY_ONLY')));
 return {status:'PASS',checks:tests.length,tests,
   note:'RECYCLING IS SYNTHETIC, NOT VERIFIED THAILAND HOUSEHOLD FINANCE',
   model:'INDEPENDENT_MULTIVERSE_CYCLE021',
   armSummary:result.arms.map(a=>({id:a.id,rate:a.recyclingRate,
     firstSales:a.first.firmSales,secondSales:a.rows[1].firmSales,
     fifthSales:a.rows[4].firmSales,tenthSales:a.last.firmSales,
     cumulativeSales:a.totalSales,finalDebt:a.finalDebt,
     finalCashHeldOutside:a.finalOutsideCash,thirdBuyerCumulativeSpending:a.totalRecycled,
     exportsCumulative:a.exports,moneyAfterLast:a.last.moneyAfter})),
   fullWork:result.work,limitedWork:short.work,
   limitations:{causalValidity:'UNKNOWN',tStar:'UNKNOWN',
     realCurrency:'NOT_USED',nationalOutcome:'NOT_PREDICTED',
     noAomOrSkillMerger:true,productionTouched:false}};
}
// Node.js offline runner loads EXISTING Cycle020 source, no deps/network.
if(typeof require!=='undefined'&&typeof module!=='undefined'&&require.main===module){
  const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
  const prev=fs.readFileSync(path.join(__dirname,'thailand_automation_feedback_cycle020.js'),'utf8');
  const base=vm.runInNewContext(prev+'\n({parameters,step,initialState,DEFAULT,ARM_DEFS,simulateArms})',
    {},{timeout:10000});
  console.log(JSON.stringify(testCycle021(base),null,2));
}
