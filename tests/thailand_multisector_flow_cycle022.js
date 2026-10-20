'use strict';
/**
 * THAILAND MULTISECTOR FLOW CYCLE 022 — INDEPENDENT MULTIVERSE REFERENCE
 * All coefficients, prices, deposit balances, loans, output and behavior are
 * INVENTED toy figures; no real economic calibration or forecast.
 * No AOM, third-party API, banking transaction, or production write.
 * Node.js 18+, no packages. This is a simplified settlement ledger, not
 * a fully balanced commercial-bank/reserves/national accounts system.
 */
const EPS=1e-7,eq=(a,b)=>Math.abs(a-b)<EPS;
function ok(v,msg){if(!v)throw Error('FLOW_ERROR '+msg)}
const SECTORS=['H_WORK','H_OWNER','F_GOODS','F_INPUT','F_AUTO','GOV','ROW'];
const INITIAL={mode:'SIMULATED_FIXTURE',period:0,
 balances:{H_WORK:12,H_OWNER:18,F_GOODS:160,F_INPUT:10,F_AUTO:10,GOV:30,ROW:60},
 bankRetained:5,bankLoanAsset:40,workerDebt:40,
 unpaidInterest:0,bankInterestReceivable:0};
const P={
 periods:10,price:1,capacity:160,
 wage:.25,input:.10,auto:.08,imports:.05,dividend:.12,tax:.06,
 workerDividendShare:0,
 govTransfer:.30,govProcure:.20,
 workerSpend:.85,ownerSpend:.40,
 inputSpend:.50,autoSpend:.50,rowSpend:.25,bankSpend:.25,
 workerDesiredUnits:70,ownerDesiredUnits:80,
 inputDesiredUnits:70,autoDesiredUnits:70,
 govDesiredUnits:55,rowDesiredUnits:120,bankDesiredUnits:20,
 housing:8,interest:.02,principalTarget:5,loanPeriod:0,loanAmount:0
};
const AUTO={price:.7,wage:.10,auto:.16,dividend:.22};
const ARMS=[
 {id:'A_BASELINE',config:{}},
 {id:'B_AUTO_CONCENTRATED',config:{...AUTO}},
 {id:'C_AUTO_SHARED',config:{...AUTO,workerDividendShare:.50}},
 {id:'D_AUTO_CREDIT',config:{...AUTO,loanPeriod:2,loanAmount:18}},
 {id:'E_AUTO_MORE_CAPACITY',config:{...AUTO,capacity:240}},
 {id:'F_AUTO_ROW_DEMAND',config:{...AUTO,rowSpend:.55}}
];
const EVIDENCE=[
 {id:'NESDC_IO_2021_16',observedPeriod:'YEAR_2021',
  url:'https://www.nesdc.go.th/download/i-o-2021-16-sectors/',
  role:'INPUTS_IMPORTS_FINAL_DEMAND_CLASSIFICATION',rawMatrixLoaded:false,
  fittedToParameters:false,listingPublicationMetadata:'DISPUTED'},
 {id:'NESDC_FF_2020_2024',observedPeriod:'2020-2024',
  url:'https://www.nesdc.go.th/en/download/flow-of-funds-accounts-of-thailand-2020-2024/',
  role:'INSTITUTIONAL_FINANCIAL_ACCOUNTS',rawMatrixLoaded:false,
  fittedToParameters:false,publicationDate:'2026-04-30'},
 {id:'BOT_SDDS_Q2_2026',observedPeriod:'Q2/2026',
  url:'https://www.bot.or.th/en/statistics/sdds.html',
  role:'GDP_NEQ_GROSS_FIRM_SALES',rawMatrixLoaded:false,
  fittedToParameters:false,reportedNominalGDPBillionTHB:4793.5,
  reportedEmploymentThousands:41510.7}
];
function clone(s){return {...s,balances:{...s.balances}}}
function total(s){return SECTORS.reduce((a,id)=>a+s.balances[id],0)}
function net(s){return total(s)+s.bankRetained-s.bankLoanAsset}
function stateGate(s){
 ok(s&&s.mode==='SIMULATED_FIXTURE'&&Number.isInteger(s.period),'MODE_OR_PERIOD');
 ok(SECTORS.every(k=>Number.isFinite(s.balances[k])&&s.balances[k]>=-EPS),
  'DEPOSIT_ACCOUNT_INVALID');
 for(const k of ['bankRetained','bankLoanAsset','workerDebt',
   'unpaidInterest','bankInterestReceivable'])
  ok(Number.isFinite(s[k])&&s[k]>=-EPS,'INVALID_FINANCIAL_STOCK_'+k);
 ok(eq(s.bankLoanAsset,s.workerDebt),'LOAN_BORROWER_MISMATCH');
 ok(eq(s.unpaidInterest,s.bankInterestReceivable),'INTEREST_MISMATCH');
}
function settings(input={}){
 const c={...P,...input};
 for(const [k,v] of Object.entries(c))
  ok(Number.isFinite(v)&&v>=0,'NEGATIVE_OR_NAN_COEFFICIENT_'+k);
 const rates=['wage','input','auto','imports','dividend','tax',
  'workerDividendShare','govTransfer','govProcure','workerSpend','ownerSpend',
  'inputSpend','autoSpend','rowSpend','bankSpend','interest'];
 for(const k of rates)ok(c[k]<=1,'RATE_EXCEEDS_ONE_'+k);
 ok(c.wage+c.input+c.auto+c.imports+c.dividend+c.tax<=1+EPS,
  'FIRM_BUDGET_OVERALLOCATED');
 ok(c.govTransfer+c.govProcure<=1+EPS,'GOV_BUDGET_OVERALLOCATED');
 ok(c.price>0&&c.capacity>0,'ZERO_PRICE_OR_CAPACITY');
 ok(Number.isSafeInteger(c.periods)&&c.periods>=1&&c.periods<=30,'PERIODS');
 ok(Number.isSafeInteger(c.loanPeriod)&&c.loanPeriod>=0&&c.loanPeriod<=c.periods,
  'LOAN_DATE_INVALID');
 if(!c.loanPeriod)ok(c.loanAmount===0,'LOAN_WITHOUT_DATE');
 return c;
}
function pay(s,j,from,to,amt,label){
 ok(SECTORS.includes(from)&&SECTORS.includes(to)&&from!==to,'COUNTERPARTIES');
 ok(Number.isFinite(amt)&&amt>=-EPS,'PAYMENT_INVALID');
 const a=Math.max(0,amt);
 ok(s.balances[from]+EPS>=a,'INSUFFICIENT_'+from);
 s.balances[from]-=a;s.balances[to]+=a;
 j.push({type:'TRANSFER',label,from,to,amount:a});return a;
}
function origination(s,j,amount){
 ok(amount>=0,'NEGATIVE_NEW_CREDIT');
 s.balances.H_WORK+=amount;s.workerDebt+=amount;s.bankLoanAsset+=amount;
 j.push({type:'LOAN_ORIGINATION',amount});
}
function accrual(s,j,amt){
 s.unpaidInterest+=amt;s.bankInterestReceivable+=amt;
 j.push({type:'INTEREST_ACCRUAL',amount:amt});
}
function interestPayment(s,j){
 const amt=Math.min(s.unpaidInterest,Math.max(0,s.balances.H_WORK));
 s.balances.H_WORK-=amt;s.unpaidInterest-=amt;
 s.bankInterestReceivable-=amt;s.bankRetained+=amt;
 j.push({type:'INTEREST_PAYMENT',amount:amt});return amt;
}
function principalPayment(s,j,target){
 const amt=Math.min(target,s.workerDebt,Math.max(0,s.balances.H_WORK));
 s.balances.H_WORK-=amt;s.workerDebt-=amt;s.bankLoanAsset-=amt;
 j.push({type:'PRINCIPAL_PAYMENT',amount:amt});return amt;
}
function bankerPurchase(s,j,amt){
 ok(amt>=0&&s.bankRetained+EPS>=amt,'BANK_UNFUNDED');
 s.bankRetained-=amt;s.balances.F_GOODS+=amt;
 j.push({type:'BANK_PURCHASE',amount:amt});
}
function journalReplay(open,journal){
 const s=clone(open);
 for(const x of journal){
  const a=x.amount;ok(Number.isFinite(a)&&a>=0,'CORRUPT_JOURNAL');
  if(x.type==='TRANSFER'){s.balances[x.from]-=a;s.balances[x.to]+=a;}
  else if(x.type==='LOAN_ORIGINATION'){
   s.balances.H_WORK+=a;s.workerDebt+=a;s.bankLoanAsset+=a;
  }else if(x.type==='INTEREST_ACCRUAL'){
   s.unpaidInterest+=a;s.bankInterestReceivable+=a;
  }else if(x.type==='INTEREST_PAYMENT'){
   s.balances.H_WORK-=a;s.unpaidInterest-=a;
   s.bankInterestReceivable-=a;s.bankRetained+=a;
  }else if(x.type==='PRINCIPAL_PAYMENT'){
   s.balances.H_WORK-=a;s.workerDebt-=a;s.bankLoanAsset-=a;
  }else if(x.type==='BANK_PURCHASE'){
   s.bankRetained-=a;s.balances.F_GOODS+=a;
  }else throw Error('UNKNOWN_TRANSACTION_TYPE');
 }
 return s;
}
function journalMatches(open,closed,journal){
 const s=journalReplay(open,journal);
 return SECTORS.every(k=>eq(s.balances[k],closed.balances[k]))&&
  ['bankRetained','bankLoanAsset','workerDebt','unpaidInterest',
  'bankInterestReceivable'].every(k=>eq(s[k],closed[k]));
}
function periodStep(current,c){
 stateGate(current);
 const begin=clone(current),s=clone(current),j=[];
 const opening={...current.balances},openingBank=current.bankRetained;
 const t=current.period+1,firmOpening=opening.F_GOODS;
 const transfer=opening.GOV*c.govTransfer;
 pay(s,j,'GOV','H_WORK',transfer,'GOV_TRANSFER');
 for(const [receiver,fraction,tag] of [
  ['H_WORK',c.wage,'WAGES'],
  ['F_INPUT',c.input,'DOMESTIC_INPUTS'],
  ['F_AUTO',c.auto,'AUTO_SERVICES'],
  ['ROW',c.imports,'IMPORTS'],
  ['H_WORK',c.dividend*c.workerDividendShare,'WORKER_DIVIDENDS'],
  ['H_OWNER',c.dividend*(1-c.workerDividendShare),'OWNER_DIVIDENDS'],
  ['GOV',c.tax,'CORPORATE_TAX']
 ])pay(s,j,'F_GOODS',receiver,firmOpening*fraction,tag);
 let newLoan=0;
 if(c.loanPeriod===t&&c.loanAmount>0){
  origination(s,j,c.loanAmount);newLoan=c.loanAmount;
 }
 const incurredInterest=current.workerDebt*c.interest;
 accrual(s,j,incurredInterest);
 const housing=Math.min(c.housing,s.balances.H_WORK);
 pay(s,j,'H_WORK','H_OWNER',housing,'HOUSING_RENT');
 const interestPaid=interestPayment(s,j);
 const principalPaid=principalPayment(s,j,c.principalTarget);
 const desired=[
  ['H_WORK',Math.min(s.balances.H_WORK*c.workerSpend,c.workerDesiredUnits*c.price)],
  ['H_OWNER',Math.min(s.balances.H_OWNER*c.ownerSpend,c.ownerDesiredUnits*c.price)],
  ['F_INPUT',Math.min(opening.F_INPUT*c.inputSpend,s.balances.F_INPUT,c.inputDesiredUnits*c.price)],
  ['F_AUTO',Math.min(opening.F_AUTO*c.autoSpend,s.balances.F_AUTO,c.autoDesiredUnits*c.price)],
  ['GOV',Math.min(opening.GOV*c.govProcure,s.balances.GOV,c.govDesiredUnits*c.price)],
  ['ROW',Math.min(opening.ROW*c.rowSpend,s.balances.ROW,c.rowDesiredUnits*c.price)],
  ['BANK_RETAINED',Math.min(openingBank*c.bankSpend,s.bankRetained,c.bankDesiredUnits*c.price)]
 ];
 const wanted=desired.reduce((n,v)=>n+v[1],0),limit=c.capacity*c.price;
 const ration=wanted>0?Math.min(1,limit/wanted):0;
 const buys=[];
 for(const [buyer,request] of desired){
  const spend=request*ration;
  if(buyer==='BANK_RETAINED')bankerPurchase(s,j,spend);
  else pay(s,j,buyer,'F_GOODS',spend,
    buyer==='ROW'?'EXPORT_SALE':'DOMESTIC_GOODS_SALE');
  buys.push({buyer,requested:request,paid:spend,units:spend/c.price});
 }
 const sales=buys.reduce((n,x)=>n+x.paid,0);
 const qty=buys.reduce((n,x)=>n+x.units,0);
 const exported=buys.find(x=>x.buyer==='ROW').paid;
 const worker=buys.find(x=>x.buyer==='H_WORK');
 s.period=t;stateGate(s);
 ok(journalMatches(begin,s,j),'UNBALANCED_JOURNAL');
 ok(eq(net(s),net(begin)),'NET_CLAIM_NOT_CONSERVED');
 ok(sales<=limit+EPS&&qty<=c.capacity+EPS,'SUPPLY_CAP_BROKEN');
 ok(buys.every(x=>x.paid<=x.requested+EPS),'BUYER_OVERCHARGE');
 ok(exported<=opening.ROW+EPS,'FOREIGN_CASH_FROM_FUTURE');
 ok(transfer<=opening.GOV+EPS,'GOV_UNFUNDED_TRANSFER');
 ok(eq(s.workerDebt,s.bankLoanAsset),'UNBALANCED_LOAN');
 const row={
  period:t,mode:'SIMULATED_BRANCH',observedThaiFuture:false,
  open:opening,close:{...s.balances},bankOpening:openingBank,
  bankRetained:s.bankRetained,
  debtStart:begin.workerDebt,debtEnd:s.workerDebt,
  bankLoanAsset:s.bankLoanAsset,unpaidInterest:s.unpaidInterest,
  price:c.price,capacity:c.capacity,unitsSold:qty,
  unsoldUnits:c.capacity-qty,
  turnover:sales,domesticTurnover:sales-exported,exportTurnover:exported,
  importCash:firmOpening*c.imports,
  wages:firmOpening*c.wage,
  workerDividend:firmOpening*c.dividend*c.workerDividendShare,
  ownerDividend:firmOpening*c.dividend*(1-c.workerDividendShare),
  tax:firmOpening*c.tax,govTransfer:transfer,
  govtGoods:buys.find(x=>x.buyer==='GOV').paid,
  bankGoods:buys.find(x=>x.buyer==='BANK_RETAINED').paid,
  workerHousingPaid:housing,interestCharged:incurredInterest,
  interestPaid,principalPaid,loanGranted:newLoan,
  workerGoodsSpend:worker.paid,workerGoodsUnits:worker.units,
  purchases:buys,ration,transactions:j,
  moneyDepositsBefore:total(begin),moneyDepositsAfter:total(s),
  netClaimBefore:net(begin),netClaimAfter:net(s),
  realThailandGDP:null,realThailandUnemployment:null,
  toyCoefficients:'UNFITTED_SYNTHETIC_ASSUMPTIONS'
 };
 return {next:s,row};
}
function summarize(arm){
 const sum=(field)=>arm.history.reduce((n,r)=>n+r[field],0),last=arm.history.at(-1);
 return {id:arm.id,completed:arm.history.length,
  unexplored:arm.c.periods-arm.history.length,
  first:arm.history[0]??null,last:last??null,
  totalTurnover:sum('turnover'),totalExports:sum('exportTurnover'),
  totalImports:sum('importCash'),workerGoodsTotal:sum('workerGoodsUnits'),
  debtLast:last?.debtEnd??INITIAL.workerDebt,
  govCashLast:last?.close.GOV??INITIAL.balances.GOV,
  bankProfitLast:last?.bankRetained??INITIAL.bankRetained,
  rowCashLast:last?.close.ROW??INITIAL.balances.ROW,
  newCreditTotal:sum('loanGranted'),history:arm.history};
}
function simulate(workLimit=60,arms=ARMS,initial=INITIAL){
 ok(Number.isSafeInteger(workLimit)&&workLimit>=0,'INVALID_WORK_BUDGET');
 stateGate(initial);
 const active=arms.map(a=>({id:a.id,c:settings(a.config),
  s:clone(initial),history:[]}));
 const required=active.reduce((n,a)=>n+a.c.periods,0);
 let used=0;
 for(let t=0;t<Math.max(0,...active.map(a=>a.c.periods));t++){
  for(const a of active){
   if(t>=a.c.periods)continue;
   if(used>=workLimit)return {status:'BUDGET_EXHAUSTED',
    work:{used,required,limit:workLimit},certificate:null,
    groups:active.map(summarize)};
   const value=periodStep(a.s,a.c);
   a.s=value.next;a.history.push(value.row);used++;
  }
 }
 return {status:'COMPLETE_SYNTHETIC_TOY',
  work:{used,required,limit:workLimit},certificate:null,
  groups:active.map(summarize),sources:EVIDENCE};
}
function selfTests(){
 const tests=[],T=(name,value)=>{if(!value)throw Error('ASSERTION_FAIL '+name);tests.push(name)};
 const full=simulate(),pick=id=>full.groups.find(a=>a.id===id);
 T('six frozen parameter scenarios',full.groups.length===6);
 T('sixty toy steps completed',full.work.used===60);
 T('ten periods per scenario',full.groups.every(x=>x.completed===10));
 T('no empirical action certificate',full.certificate===null);
 T('seven financial deposit holders',SECTORS.length===7);
 T('initial deposits 300',eq(total(INITIAL),300));
 T('initial claim invariant 265',eq(net(INITIAL),265));
 T('initial bank asset and worker debt equal 40',INITIAL.bankLoanAsset===40&&INITIAL.workerDebt===40);
 T('no imported source numeric coefficients',EVIDENCE.every(x=>!x.fittedToParameters&&!x.rawMatrixLoaded));
 T('NESDC IO observation year 2021',EVIDENCE[0].observedPeriod==='YEAR_2021');
 T('NESDC FF observation years 2020-2024',EVIDENCE[1].observedPeriod==='2020-2024');
 T('GDP not nominal sales',EVIDENCE[2].role==='GDP_NEQ_GROSS_FIRM_SALES');
 for(const a of full.groups){
  const r=a.history;
  T(a.id+' point sequence',r.every((x,i)=>x.period===i+1));
  T(a.id+' no future observations asserted',r.every(x=>x.mode==='SIMULATED_BRANCH'&&!x.observedThaiFuture));
  T(a.id+' forecast outputs never Thai GDP/employment',r.every(x=>x.realThailandGDP===null&&x.realThailandUnemployment===null));
  T(a.id+' global net conserved',r.every(x=>eq(x.netClaimBefore,265)&&eq(x.netClaimAfter,265)));
  T(a.id+' bank debt balance matched',r.every(x=>eq(x.debtEnd,x.bankLoanAsset)));
  T(a.id+' deposit accounts nonnegative',r.every(x=>SECTORS.every(k=>x.close[k]>=-EPS)));
  T(a.id+' cap goods output',r.every(x=>x.unitsSold<=x.capacity+EPS));
  T(a.id+' physical unsold reconciled',r.every(x=>eq(x.unitsSold+x.unsoldUnits,x.capacity)));
  T(a.id+' no buyer charged above desired',r.every(x=>x.purchases.every(p=>p.paid<=p.requested+EPS)));
  T(a.id+' sales separate exports and domestic',r.every(x=>eq(x.turnover,x.domesticTurnover+x.exportTurnover)));
  T(a.id+' ROW cannot use future balances',r.every(x=>x.exportTurnover<=x.open.ROW+EPS));
  T(a.id+' government transfer limited to opening balance',r.every(x=>x.govTransfer<=x.open.GOV+EPS));
  T(a.id+' bank spends at most opening income',r.every(x=>x.bankGoods<=x.bankOpening+EPS));
  T(a.id+' current account feeds next point',r.slice(1).every((x,i)=>SECTORS.every(k=>eq(x.open[k],r[i].close[k]))));
  T(a.id+' no unexplained negative journal entry',r.every(x=>x.transactions.every(e=>e.amount>=-EPS)));
 }
 const a=pick('A_BASELINE').first,b=pick('B_AUTO_CONCENTRATED').first;
 const c=pick('C_AUTO_SHARED').first;
 const d=pick('D_AUTO_CREDIT'),e=pick('E_AUTO_MORE_CAPACITY');
 const f=pick('F_AUTO_ROW_DEMAND').first;
 T('first baseline wages 40',eq(a.wages,40));
 T('first baseline imports 8',eq(a.importCash,8));
 T('first baseline government transfer 9',eq(a.govTransfer,9));
 T('first baseline owner dividends 19.2',eq(a.ownerDividend,19.2));
 T('first baseline worker goods spend 40.12',eq(a.workerGoodsSpend,40.12));
 T('first baseline owner goods spend 18.08',eq(a.purchases.find(x=>x.buyer==='H_OWNER').paid,18.08));
 T('first baseline gross turnover 90.45',eq(a.turnover,90.45));
 T('first baseline interest paid 0.8',eq(a.interestPaid,.8));
 T('first baseline principal paid 5',eq(a.principalPaid,5));
 T('first baseline debt 35',eq(a.debtEnd,35));
 T('first bank purchase 1.25',eq(a.bankGoods,1.25));
 T('first bank retained earnings 4.55',eq(a.bankRetained,4.55));
 T('automation changes initial wage allocation',b.wages<a.wages);
 T('automation supplier receives larger input purchase',b.transactions.find(x=>x.label==='AUTO_SERVICES').amount>a.transactions.find(x=>x.label==='AUTO_SERVICES').amount);
 T('shared returns lift worker first goods spending in toy',c.workerGoodsSpend>b.workerGoodsSpend);
 T('credit not created at first step',eq(d.history[0].loanGranted,0));
 T('credit created by bank at step 2',eq(d.history[1].loanGranted,18));
 T('credit represented as matched asset and borrower liability',eq(d.history[1].bankLoanAsset,d.history[1].debtEnd));
 T('new credit not wage income',eq(d.history[1].wages,pick('B_AUTO_CONCENTRATED').history[1].wages));
 T('more capacity does not guarantee more first period sales',eq(e.first.turnover,b.turnover));
 T('high ROW demand causes greater export revenue',f.exportTurnover>b.exportTurnover);
 const partial=simulate(12);
 T('partial cap exactly 12',partial.work.used===12);
 T('partial status explicit BUDGET_EXHAUSTED',partial.status==='BUDGET_EXHAUSTED');
 T('two points covered each when capped',partial.groups.every(x=>x.completed===2));
 T('eight points unresolved each when capped',partial.groups.every(x=>x.unexplored===8));
 T('no certificate for partial exploration',partial.certificate===null);
 T('zero cap does not fabricate steps',simulate(0).groups.every(x=>x.completed===0));
 T('invalid negative budget rejected',(()=>{try{simulate(-1);return false}catch(err){return err.message.includes('INVALID_WORK_BUDGET')}})());
 T('excess wage share rejected',(()=>{try{settings({wage:.9});return false}catch(err){return err.message.includes('FIRM_BUDGET_OVERALLOCATED')}})());
 T('excess gov budgets rejected',(()=>{try{settings({govTransfer:.81});return false}catch(err){return err.message.includes('GOV_BUDGET_OVERALLOCATED')}})());
 T('government total 100 percent allowed',(()=>{try{settings({govTransfer:.8});return true}catch(err){return false}})());
 T('negative interest rate rejected',(()=>{try{settings({interest:-.1});return false}catch(err){return err.message.includes('NEGATIVE_OR_NAN_COEFFICIENT')}})());
 T('invalid bank principal exposure rejected',(()=>{try{stateGate({...clone(INITIAL),workerDebt:41});return false}catch(err){return err.message.includes('LOAN_BORROWER_MISMATCH')}})());
 T('negative worker balance rejected',(()=>{try{const s=clone(INITIAL);s.balances.H_WORK=-1;stateGate(s);return false}catch(err){return err.message.includes('DEPOSIT_ACCOUNT_INVALID')}})());
 T('payment cannot overdraw',(()=>{try{pay(clone(INITIAL),[],'H_WORK','F_GOODS',100,'INVALID');return false}catch(err){return err.message.includes('INSUFFICIENT')}})());
 T('self transfer forbidden',(()=>{try{pay(clone(INITIAL),[],'H_WORK','H_WORK',1,'INVALID');return false}catch(err){return err.message.includes('COUNTERPARTIES')}})());
 T('journal mutation detected',(()=>{const value=periodStep(clone(INITIAL),settings());
  const changed=value.row.transactions.map(x=>({...x}));changed[0].amount++;
  return !journalMatches(INITIAL,value.next,changed)})());
 const scarce=periodStep(clone(INITIAL),settings({capacity:4}));
 T('supply rationed to capacity 4',scarce.row.unitsSold<=4+EPS);
 const positive=scarce.row.purchases.filter(x=>x.requested>0);
 T('common proportional rationing for every buyer',positive.every(x=>
   eq(x.paid/x.requested,positive[0].paid/positive[0].requested)));
 const emptyWorker=clone(INITIAL);
 emptyWorker.balances.H_WORK=0;emptyWorker.balances.F_GOODS=0;emptyWorker.balances.GOV=0;
 const noPay=periodStep(emptyWorker,settings({wage:0,input:0,auto:0,
  imports:0,dividend:0,tax:0,govTransfer:0,govProcure:0}));
 T('unpaid interest explicitly remains due',
   noPay.row.interestCharged>0&&eq(noPay.row.interestPaid,0)&&noPay.next.unpaidInterest>0);
 T('interest payable equals bank receivable',eq(noPay.next.unpaidInterest,noPay.next.bankInterestReceivable));
 const noGov=clone(INITIAL);noGov.balances.GOV=0;
 T('no government funds means no free transfer',eq(periodStep(noGov,settings()).row.govTransfer,0));
 T('exports limited to ROW cash',periodStep(clone(INITIAL),settings({rowSpend:1})).row.exportTurnover<=60+EPS);
 T('deterministic repeatable run',eq(simulate().groups[0].last.turnover,pick('A_BASELINE').last.turnover));
 T('no predicted automation milestone',full.groups.every(g=>g.history.every(r=>!('yearOfFullAutomation' in r))));
 return {status:'PASS',assertions:tests.length,testNames:tests,
  sourceRegister:EVIDENCE,initial:{deposits:total(INITIAL),
   bankRetained:INITIAL.bankRetained,loanClaim:INITIAL.bankLoanAsset,
   netFinancialClaims:net(INITIAL)},
  full:{work:full.work,regimes:full.groups.map(g=>({
   id:g.id,firstSales:g.first.turnover,firstWorkerUnits:g.first.workerGoodsUnits,
   firstExport:g.first.exportTurnover,firstGovCash:g.first.close.GOV,
   step3:g.history[2].turnover,step10:g.last.turnover,
   cumulativeSales:g.totalTurnover,cumulativeExports:g.totalExports,
   cumulativeImports:g.totalImports,workerGoodsTotal:g.workerGoodsTotal,
   debtEnd:g.debtLast,govEnd:g.govCashLast,bankEnd:g.bankProfitLast,
   rowEnd:g.rowCashLast,newCredit:g.newCreditTotal,
   capacityUsageLast:g.last.unitsSold/g.last.capacity
  }))},
  partial:{work:partial.work,status:partial.status,
   completedPerRegime:partial.groups.map(g=>g.completed),
   unresolvedPerRegime:partial.groups.map(g=>g.unexplored)},
  limits:{fullAutomationDate:'UNKNOWN',thaiGDPForecast:'UNVERIFIED',
   actualImpact:'UNVERIFIED',bankReserves:'NOT_MODELLED',
   originalIOValuesImported:false,noAomOrSkillMerge:true,productionTouched:false}};
}
if(typeof require!=='undefined'&&typeof module!=='undefined'&&require.main===module)
 console.log(JSON.stringify(selfTests(),null,2));
