'use strict';
/*
 * CYCLE 023: Official Thailand NESDC 2024 Flow-of-Funds excerpt audit.
 * 2024 data are HISTORICAL REAL PUBLIC ANNUAL FLOWS, NOT end-period stocks.
 * The 2021 I/O workbook numeric 16x16 remains DATA_BLOCKED absent parsed bytes.
 * Node 18+, no dependencies, no network, no AOM Skill or production activity.
 */
const EPS=1e-9;
const sum=(xs)=>xs.reduce((a,b)=>a+b,0);
const equal=(a,b)=>Math.abs(a-b)<=EPS;
const nint=x=>typeof x==='number'&&Number.isSafeInteger(x);
function audit(data){
 const problems=[],warnings=[];
 const bad=(code)=>problems.push(code);
 if(!data||typeof data!=='object')return {status:'DATA_BLOCKED',errors:['DOCUMENT_MISSING']};
 if(data.unit!=='MILLION_THB')bad('UNIT_NOT_MILLION_BAHT');
 if(data.source?.dataset_period!=='CALENDAR_YEAR_2024')bad('WRONG_OBSERVATION_YEAR');
 if(data.measure_type!=='ANNUAL_NET_FINANCIAL_TRANSACTION_FLOWS_NOT_END_OF_PERIOD_STOCKS')
   bad('FLOW_TYPE_NOT_DECLARED');
 if(!data.source?.original_pdf?.startsWith('https://www.nesdc.go.th/'))
   bad('OFFICIAL_PDF_SOURCE_REQUIRED');
 if(!data.source?.source_table?.includes('TABLE 1.5'))bad('SOURCE_TABLE_MISSING');
 if(data.source?.visual_page_inspection!=='VISUALLY_VERIFIED')
   warnings.push('PDF_VISUAL_READBACK_NOT_PERFORMED');
 const sectors=data.sectors,rows=data.instruments;
 if(!Array.isArray(sectors)||sectors.length!==5)bad('FIVE_INSTITUTIONAL_SECTORS_REQUIRED');
 if(!Array.isArray(rows)||rows.length!==8)bad('EIGHT_INSTRUMENT_GROUPS_REQUIRED');
 if(problems.length)return {status:'DATA_BLOCKED',errors:problems,warnings};
 const ids=sectors.map(x=>x.id);
 if(new Set(ids).size!==5||ids.some(id=>typeof id!=='string'||!id))
   bad('DUPLICATE_OR_MISSING_SECTOR');
 const names=rows.map(x=>x.id);
 if(new Set(names).size!==8||names.some(id=>typeof id!=='string'||!id))
   bad('DUPLICATE_OR_MISSING_INSTRUMENT');
 const gridAssets=Array(5).fill(0),gridLiabilities=Array(5).fill(0);
 const instrumentSummary=[];
 for(const row of rows){
  const a=row.net_acquisition_assets, l=row.net_incurrence_liabilities;
  if(!Array.isArray(a)||a.length!==5||!Array.isArray(l)||l.length!==5){
    bad('INSTRUMENT_NOT_FIVE_SECTORS_'+row.id);continue;
  }
  if(!a.every(nint)||!l.every(nint)||!nint(row.published_total)){
    bad('MISSING_NONINTEGER_OR_NONFINITE_SOURCE_VALUE_'+row.id);continue;
  }
  const aa=sum(a),ll=sum(l);
  if(aa!==row.published_total)bad('INSTRUMENT_ASSET_TOTAL_MISMATCH_'+row.id);
  if(ll!==row.published_total)bad('INSTRUMENT_LIABILITY_TOTAL_MISMATCH_'+row.id);
  if(aa!==ll)bad('INSTRUMENT_COUNTERPARTY_FLOW_MISMATCH_'+row.id);
  for(let i=0;i<5;i++){gridAssets[i]+=a[i];gridLiabilities[i]+=l[i];}
  instrumentSummary.push({id:row.id,assetTotal:aa,liabilityTotal:ll,
    publishedTotal:row.published_total});
 }
 const reported=data.reported||{};
 function checkVector(key,actual){
  const target=reported[key];
  if(!Array.isArray(target)||target.length!==5||!target.every(nint)){
    bad('INVALID_PUBLISHED_CONTROL_'+key);return;
  }
  for(let i=0;i<5;i++)
    if(target[i]!==actual[i])bad('PUBLISHED_SECTOR_CONTROL_MISMATCH_'+key+'_'+i);
 }
 checkVector('sector_total_assets',gridAssets);
 checkVector('sector_total_liabilities',gridLiabilities);
 const netBalance=gridAssets.map((a,i)=>a-gridLiabilities[i]);
 checkVector('sector_financial_surplus_deficit',netBalance);
 const discrepancy=reported.sector_statistical_discrepancy;
 if(!Array.isArray(discrepancy)||discrepancy.length!==5||!discrepancy.every(nint))
   bad('SECTOR_DISCREPANCY_MISSING');
 else {
  if(discrepancy.every(v=>v===0))
    bad('PUBLISHED_NONZERO_SECTOR_DISCREPANCIES_SUPPRESSED');
  if(sum(discrepancy)!==reported.total_sector_statistical_discrepancy)
    bad('DISCREPANCY_OVERALL_CONTROL_MISMATCH');
 }
 const grandAssets=sum(gridAssets),grandLiabilities=sum(gridLiabilities);
 if(grandAssets!==reported.total_assets)bad('GRAND_ASSETS_CONTROL_MISMATCH');
 if(grandLiabilities!==reported.total_liabilities)bad('GRAND_LIABILITIES_CONTROL_MISMATCH');
 if(grandAssets!==grandLiabilities)bad('INCOMPLETE_FINANCIAL_COUNTERPARTS');
 if(sum(netBalance)!==reported.total_financial_surplus_deficit)
   bad('COUNTRY_SECTOR_NET_FLOW_NOT_ZERO');
 if(sum(rows.map(r=>r.published_total))!==reported.total_assets)
   bad('INSTRUMENT_TOTALS_DO_NOT_ADD_TO_GRAND');
 if(!rows.some(r=>r.net_acquisition_assets?.some(v=>v<0))||
    !rows.some(r=>r.net_incurrence_liabilities?.some(v=>v<0)))
   warnings.push('SIGNED_NET_FINANCIAL_FLOWS_MAY_BE_WRONGLY_CONVERTED_TO_STOCKS');
 if(data.io_2021?.workbook_cells_parsed!==true)
   warnings.push('NESDC_2021_16x16_WORKBOOK_VALUES_UNAVAILABLE');
 if(data.source?.pdf_binary_hash===null)warnings.push('ORIGINAL_PDF_HASH_UNVERIFIED');
 return {
  status:problems.length?'DATA_BLOCKED':'PUBLISHED_2024_FINANCIAL_FLOWS_ARITHMETIC_PASS',
  errors:[...new Set(problems)],warnings:[...new Set(warnings)],
  rowCount:instrumentSummary.length,sectorCount:5,
  sourcePublication:data.source.publication,period:'2024',
  unit:data.unit,measureType:data.measure_type,
  assetsBySector:gridAssets,liabilitiesBySector:gridLiabilities,
  netFinancialBySector:netBalance,
  assetsTotal:grandAssets,liabilitiesTotal:grandLiabilities,
  sectorNetSum:sum(netBalance),
  instrumentTotals:instrumentSummary,
  statisticalDiscrepancy:discrepancy,
  status2021IO:ioGate(data.io_2021).status,
  futureThailandGDP:null,
  futureAutomationArrival:null,
  actionCoefficientCalibration:'NONE',
  notes:'Publisher PDF TEXT VALUES RECONCILED; not full 2021 I/O matrix or Thai macroeconomic forecast'
 };
}
const CROSSWALK=Object.freeze([
 {official:'NON_FINANCIAL_CORPORATIONS',toy:['F_GOODS','F_INPUT','F_AUTO'],
  status:'ONE_TO_MANY_CLASSIFICATION_ONLY',observedAllocation:null},
 {official:'FINANCIAL_CORPORATIONS',toy:['SIMPLIFIED_BANK'],
  status:'INCOMPLETE_BANK_BALANCE_SHEET',observedAllocation:null},
 {official:'GENERAL_GOVERNMENT',toy:['GOV'],
  status:'INSTITUTIONAL_ANALOGY_ONLY',observedAllocation:null},
 {official:'HOUSEHOLDS_NPISH',toy:['H_WORK','H_OWNER'],
  status:'TOY_WAGE_OWNER_SUBDIVISION_NOT_OFFICIAL',observedAllocation:null},
 {official:'REST_OF_WORLD',toy:['ROW'],
  status:'OMITS_CURRENCY_FX_AND_CROSS_BORDER_INSTRUMENTS',observedAllocation:null}
]);
function ioGate(io){
 if(!io||io.workbook_bytes_accessible_in_session!==true||
    io.workbook_cells_parsed!==true||!Array.isArray(io.intermediate_transaction_matrix)){
  return {status:'DATA_BLOCKED_NO_ACTUAL_IO_WORKBOOK_CELL_READBACK',
    sectorCountDeclared:io?.declared_industry_count??null,
    verifiedMatrixCells:0,originalXlsxUrl:io?.actual_resolved_xlsx??null,
    modelCoefficientsAllowed:false};
 }
 // A real ingestion requires the actual traceable source sheet,
 // its verified file hash, workbook cell range, measurement unit,
 // and 16 unique labels, NOT a pretend 16x16 array.
 const provenance=io.verified_workbook_sha256&&io.verified_source_sheet&&
   io.verified_range&&io.verified_unit&&
   Array.isArray(io.sector_names)&&io.sector_names.length===16&&
   new Set(io.sector_names).size===16;
 if(!provenance)return {status:'DATA_BLOCKED_IO_PROVENANCE_INCOMPLETE',
   verifiedMatrixCells:0,modelCoefficientsAllowed:false};
 const M=io.intermediate_transaction_matrix;
 if(M.length!==16||!M.every(r=>Array.isArray(r)&&r.length===16&&
     r.every(v=>typeof v==='number'&&Number.isFinite(v))))
   return {status:'DATA_BLOCKED_IO_MATRIX_NOT_VALIDATED',
     verifiedMatrixCells:0,modelCoefficientsAllowed:false};
 // This is only a structural readback of supplied rows. Numeric IO
 // validation must ALSO check true workbook row/col control totals.
 if(!Array.isArray(io.verified_row_controls)||io.verified_row_controls.length!==16||
   !Array.isArray(io.verified_column_controls)||io.verified_column_controls.length!==16)
   return {status:'DATA_BLOCKED_IO_CONTROL_TOTALS_MISSING',
     verifiedMatrixCells:0,modelCoefficientsAllowed:false};
 const rowChecks=M.map((r,i)=>equal(sum(r),io.verified_row_controls[i]));
 const colChecks=Array.from({length:16},(_,j)=>
   equal(sum(M.map(r=>r[j])),io.verified_column_controls[j]));
 if(!rowChecks.every(Boolean)||!colChecks.every(Boolean))
   return {status:'DATA_BLOCKED_IO_ROW_COLUMN_RECONCILIATION_FAILED',
     verifiedMatrixCells:0,modelCoefficientsAllowed:false};
 // Even valid within-table arithmetic cannot validate external hash
 // against original file in this no-network JS harness.
 return {status:'STRUCTURAL_256_CELL_RECONCILIATION_PASSED_SOURCE_BYTES_ATTESTED',
   verifiedMatrixCells:256,modelCoefficientsAllowed:false,
   warning:'Independent original-source binary hash and valuation audit still required'};
}
function assertSameMeasurementScope(a,b){
 if(a.unit!==b.unit)return 'UNIT_MISMATCH';
 if(a.dataset_period!==b.dataset_period)return 'YEAR_MISMATCH';
 if(a.measure_type!==b.measure_type)return 'FLOW_STOCK_MISMATCH';
 return 'MATCHED_MEASUREMENT_SCOPE';
}
function selfTests(data){
 const passed=[],T=(name,yes)=>{if(!yes)throw Error('TEST_FAILED '+name);passed.push(name);};
 const report=audit(data);
 T('published excerpt passes all instrument totals',report.status==='PUBLISHED_2024_FINANCIAL_FLOWS_ARITHMETIC_PASS');
 T('five official institutions',report.sectorCount===5);
 T('eight financial instrument families',report.rowCount===8);
 T('40 asset and 40 liability published sector-instrument values',
   data.instruments.reduce((n,x)=>n+x.net_acquisition_assets.length+x.net_incurrence_liabilities.length,0)===80);
 T('reported grand asset total is 3690415',report.assetsTotal===3690415);
 T('reported grand liability total is 3690415',report.liabilitiesTotal===3690415);
 T('asset and liability grand totals identical',report.assetsTotal===report.liabilitiesTotal);
 T('finance sectors sum to zero',report.sectorNetSum===0);
 T('country sector balance exact published figures',
   JSON.stringify(report.netFinancialBySector)===
    JSON.stringify([1082870,250278,-796309,151534,-688373]));
 T('nonzero sector statistical discrepancies preserved',
   JSON.stringify(report.statisticalDiscrepancy)===
    JSON.stringify([1025,-109303,-65119,-85833,259230]));
 T('statistical discrepancies sum to zero',sum(report.statisticalDiscrepancy)===0);
 for(const instrument of report.instrumentTotals){
   T(instrument.id+' asset/liab sector total equal',
     instrument.assetTotal===instrument.liabilityTotal);
   T(instrument.id+' matches published instrument control',
     instrument.assetTotal===instrument.publishedTotal);
 }
 for(let i=0;i<5;i++){
   T('official sector asset subtotal '+i,
     report.assetsBySector[i]===data.reported.sector_total_assets[i]);
   T('official sector liability subtotal '+i,
     report.liabilitiesBySector[i]===data.reported.sector_total_liabilities[i]);
   T('official sector net equals assets less liabilities '+i,
     report.netFinancialBySector[i]===
       report.assetsBySector[i]-report.liabilitiesBySector[i]);
 }
 T('source unit explicitly million baht',data.unit==='MILLION_THB');
 T('2024 is annual FLOW, not end stock',
   report.measureType.startsWith('ANNUAL_NET_FINANCIAL_TRANSACTION_FLOWS'));
 T('2024 flow not mislabeled national GDP',report.futureThailandGDP===null);
 T('model future technological arrival unknown',report.futureAutomationArrival===null);
 T('2021 numeric IO genuinely blocked',report.status2021IO.startsWith('DATA_BLOCKED'));
 T('I/O 2021 is industry classification',
   data.io_2021.type==='INDUSTRY_BY_INDUSTRY_INPUT_OUTPUT');
 T('I/O 2021 16 sectors expected',data.io_2021.declared_industry_count===16);
 T('I/O matrix must be null instead of invented zeros',
   data.io_2021.intermediate_transaction_matrix===null);
 T('2021 IO numeric verified cells 0',ioGate(data.io_2021).verifiedMatrixCells===0);
 T('no future toy coefficients calibrated from 2024 figures',
   report.actionCoefficientCalibration==='NONE');
 T('all five official crosswalk sectors preserved',
   CROSSWALK.map(x=>x.official).join(',')===data.sectors.map(x=>x.id).join(','));
 T('nonfinancial institutional mapping one-to-many',
   CROSSWALK[0].toy.length===3&&CROSSWALK[0].observedAllocation===null);
 T('households institutional mapping cannot infer worker-owner shares',
   CROSSWALK[3].toy.length===2&&CROSSWALK[3].observedAllocation===null);
 T('IO industry sectors and FF institution sectors not identified by shared strings',
   data.io_2021.declared_industry_count!==data.sectors.length);
 const swapped=JSON.parse(JSON.stringify(data));
 swapped.instruments[1].net_acquisition_assets[2]+=1;
 const badAsset=audit(swapped);
 T('one baht-million tamper in deposit assets rejected',
   badAsset.status==='DATA_BLOCKED'&&
   badAsset.errors.some(e=>e.includes('INSTRUMENT_ASSET_TOTAL_MISMATCH')));
 const swappedControl=JSON.parse(JSON.stringify(data));
 swappedControl.reported.total_assets+=1;
 T('bad source-published grand control rejected',
   audit(swappedControl).errors.includes('GRAND_ASSETS_CONTROL_MISMATCH'));
 const missingInstitution=JSON.parse(JSON.stringify(data));
 missingInstitution.sectors.pop();
 T('omitted sector rejected without filling zeros',
   audit(missingInstitution).errors.includes('FIVE_INSTITUTIONAL_SECTORS_REQUIRED'));
 const missingInstrument=JSON.parse(JSON.stringify(data));
 missingInstrument.instruments.pop();
 T('omitted financial instrument rejected without adding zeros',
   audit(missingInstrument).errors.includes('EIGHT_INSTRUMENT_GROUPS_REQUIRED'));
 const scopeMissing=JSON.parse(JSON.stringify(data));
 scopeMissing.instruments[0].net_acquisition_assets[0]=null;
 T('null source numeric cell rejected rather than coerced to zero',
   audit(scopeMissing).errors.some(x=>x.includes('MISSING_NONINTEGER_OR_NONFINITE_SOURCE_VALUE')));
 const nanInput=JSON.parse(JSON.stringify(data));
 nanInput.instruments[4].net_acquisition_assets[2]=NaN;
 T('NaN source cell rejected',
   audit(nanInput).errors.some(x=>x.includes('MISSING_NONINTEGER_OR_NONFINITE_SOURCE_VALUE')));
 const duplicateSector=JSON.parse(JSON.stringify(data));
 duplicateSector.sectors[1].id=duplicateSector.sectors[0].id;
 T('duplicate institutional sector rejected',
   audit(duplicateSector).errors.includes('DUPLICATE_OR_MISSING_SECTOR'));
 const wrongUnit={...data,unit:'BAHT'};
 T('source with currency-unit mismatch rejected',
   audit(wrongUnit).errors.includes('UNIT_NOT_MILLION_BAHT'));
 T('account year mismatch fails',assertSameMeasurementScope(
   {unit:'MILLION_THB',dataset_period:'CALENDAR_YEAR_2024',measure_type:'FLOW'},
   {unit:'MILLION_THB',dataset_period:'CALENDAR_YEAR_2021',measure_type:'FLOW'})==='YEAR_MISMATCH');
 T('stock-vs-flow mismatch fails',assertSameMeasurementScope(
   {unit:'MILLION_THB',dataset_period:'2024',measure_type:'ANNUAL_FLOW'},
   {unit:'MILLION_THB',dataset_period:'2024',measure_type:'BALANCE_STOCK'})==='FLOW_STOCK_MISMATCH');
 T('source unit mismatch fails',assertSameMeasurementScope(
   {unit:'MILLION_THB',dataset_period:'2024',measure_type:'ANNUAL_FLOW'},
   {unit:'BAHT',dataset_period:'2024',measure_type:'ANNUAL_FLOW'})==='UNIT_MISMATCH');
 T('correctly matching scopes allowed',assertSameMeasurementScope(
   {unit:'MILLION_THB',dataset_period:'2024',measure_type:'ANNUAL_FLOW'},
   {unit:'MILLION_THB',dataset_period:'2024',measure_type:'ANNUAL_FLOW'})==='MATCHED_MEASUREMENT_SCOPE');
 T('unsigned source negative numbers are retained',
   data.instruments.some(r=>r.net_acquisition_assets.some(n=>n<0)));
 const unsubstantiated=JSON.parse(JSON.stringify(data.io_2021));
 unsubstantiated.workbook_bytes_accessible_in_session=true;
 unsubstantiated.workbook_cells_parsed=true;
 unsubstantiated.intermediate_transaction_matrix=Array.from({length:16},()=>Array(16).fill(0));
 T('claimed workbook cells without hash and real controls stay blocked',
   ioGate(unsubstantiated).status==='DATA_BLOCKED_IO_PROVENANCE_INCOMPLETE');
 T('fabricated zeros cannot be accepted without actual IO proof',
   ioGate(unsubstantiated).modelCoefficientsAllowed===false);
 T('readback missing original PDF binary hash warning',
   report.warnings.includes('ORIGINAL_PDF_HASH_UNVERIFIED'));
 T('visual PDF source not inspected warning',
   report.warnings.includes('PDF_VISUAL_READBACK_NOT_PERFORMED'));
 T('script produces no Thai future numerical forecast',
   report.futureThailandGDP===null);
 T('source GDP not inferred from financial flow net',
   report.sectorNetSum===0);
 return {
   testStatus:'PASS',checks:passed.length,checkNames:passed,
   officialHistoricalAudit:{
     status:report.status,source:data.source.original_pdf,
     sourceTable:data.source.source_table,
     year:2024,unit:'MILLION_THB',
     financeAssetsTotal:report.assetsTotal,financeLiabilitiesTotal:report.liabilitiesTotal,
     netByOfficialSector:report.netFinancialBySector,
     auditedInstruments:report.instrumentTotals,
     sectorDiscrepancy:report.statisticalDiscrepancy,
     warnings:report.warnings},
   workbookIO_2021:ioGate(data.io_2021),
   crosswalk:CROSSWALK,
   limitations:{empiricalFutureAutomationCalibration:false,
     actualIO16x16Readback:false,sourcePDFVisualVerified:false,
     numericPolicyRecommendation:false,aomOrSkillMerged:false,productionTouched:false}
 };
}
if(typeof module!=='undefined' && typeof require!=='undefined' && require.main===module){
 const fs=require('node:fs'),path=require('node:path');
 const input=JSON.parse(fs.readFileSync(path.join(__dirname,'..',
    'data','cycle023_nesdc_flow_funds_2024_verified_excerpt.json'),'utf8'));
 console.log(JSON.stringify(selfTests(input),null,2));
}
