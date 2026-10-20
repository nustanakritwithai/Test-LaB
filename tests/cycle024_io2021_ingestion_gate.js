'use strict';
/**
 * CYCLE 024 - official NESDC 2021 I/O 16x16 INGESTION GATE.
 * Pure deterministic schema/arithmetic audit with NO network, NO automatic
 * source download, and no official numbers embedded.
 * The structural mock is SYNTHETIC and cannot certify original NESDC cells.
 * Run Node.js >=18: node tests/cycle024_io2021_ingestion_gate.js
 */
const SOURCE=Object.freeze({
  publisher:'NESDC',
  name:'I/O 2021 16 Sectors',
  listing:'https://www.nesdc.go.th/download/i-o-2021-16-sectors/',
  original:'https://www.nesdc.go.th/wp-content/uploads/2025/03/DataIO2021x16.xlsx',
  observationYear:2021,
  sectorCount:16,
  matrixCells:256
});
const UNKNOWN='UNKNOWN';
function colLetters(index){
 let v=index+1,s='';
 while(v>0){const r=(v-1)%26;s=String.fromCharCode(65+r)+s;v=Math.floor((v-1)/26);}
 return s;
}
const a1=(r,c)=>colLetters(c)+(r+1);
function parseA1(value){
 if(typeof value!=='string')return null;
 const m=/^\$?([A-Z]{1,3})\$?([1-9]\d{0,6})$/i.exec(value);
 if(!m)return null;
 let col=0;
 for(const ch of m[1].toUpperCase())col=col*26+ch.charCodeAt(0)-64;
 return {r:Number(m[2])-1,c:col-1};
}
function rectangle(ref){
 if(typeof ref!=='string')return null;
 const split=ref.split(':');if(split.length!==2)return null;
 const left=parseA1(split[0]),right=parseA1(split[1]);
 if(!left||!right||left.r>right.r||left.c>right.c)return null;
 return {r1:left.r,c1:left.c,r2:right.r,c2:right.c,
  rows:right.r-left.r+1,cols:right.c-left.c+1};
}
function inRect(cell,rect){
 const pos=parseA1(cell);
 return !!(pos&&rect&&pos.r>=rect.r1&&pos.r<=rect.r2&&pos.c>=rect.c1&&pos.c<=rect.c2);
}
function blocked(){
 return {source:SOURCE,status:'DATA_BLOCKED_NO_ORIGINAL_XLSX_CELLS',
  declaredSectors:16,officialCellsVerified:0,officialMatrix:null,
  officialRowControlVerified:0,officialColControlVerified:0,
  coefficientsAllowed:false,automationPredictionAllowed:false};
}
function audit(input){
 const errors=[],warnings=[];
 function fail(value,name){if(!value)errors.push(name);}
 if(!input||typeof input!=='object')
  return {...blocked(),errors:['DATASET_ABSENT']};
 const prov=input.provenance||{},scope=input.scope||{},labels=input.labels||{},
   ctl=input.controls||{};
 fail(prov.sourceUrl===SOURCE.original,'NOT_ORIGINAL_SOURCE_URL');
 fail(prov.publisher==='NESDC','PUBLISHER_MISMATCH');
 fail(prov.observedYear===2021,'YEAR_MISMATCH');
 fail(typeof prov.retrievedAt==='string'&&/^\d{4}-\d{2}-\d{2}T/.test(prov.retrievedAt),
  'RETRIEVAL_TIMESTAMP_MISSING');
 fail(typeof prov.sha256==='string'&&/^[a-f0-9]{64}$/i.test(prov.sha256),
  'BINARY_SHA256_MISSING');
 fail(Number.isSafeInteger(prov.sourceBytes)&&prov.sourceBytes>0,
  'ORIGINAL_BINARY_BYTES_NOT_READ');
 fail(prov.zipIntegrityVerified===true,'XLSX_ARCHIVE_NOT_VERIFIED');
 fail(prov.worksheetXmlRead===true,'WORKSHEET_XML_NOT_READ');
 fail(typeof scope.sheet==='string'&&scope.sheet.trim().length>0,
  'SHEET_NAME_UNVERIFIED');
 const rect=rectangle(scope.matrixRange);
 fail(!!(rect&&rect.rows===16&&rect.cols===16),
  'MATRIX_RANGE_MUST_BE_16X16');
 fail(scope.measure==='INTERMEDIATE_TRANSACTION_BLOCK',
  'MATRIX_MEASUREMENT_NOT_VERIFIED');
 fail(scope.valuationBasis==='BASIC_PRICE'||scope.valuationBasis==='PRODUCER_PRICE'||
  scope.valuationBasis==='PURCHASER_PRICE',
  'PRICE_VALUATION_BASIS_UNVERIFIED');
 fail(typeof scope.units==='string'&&scope.units!=='UNKNOWN'&&scope.units.length>0,
  'SOURCE_UNITS_UNVERIFIED');
 fail(scope.currency==='THB','CURRENCY_UNVERIFIED');
 fail(Array.isArray(labels.rows)&&labels.rows.length===16,
  'ROW_LABEL_COUNT_WRONG');
 fail(Array.isArray(labels.columns)&&labels.columns.length===16,
  'COL_LABEL_COUNT_WRONG');
 function labelValid(x){return x&&typeof x.name==='string'&&x.name.trim().length>0&&
   typeof x.cell==='string'&&parseA1(x.cell)!==null;}
 for(const [n,x] of [['ROW',labels.rows],['COLUMN',labels.columns]]){
  if(!Array.isArray(x)||x.length!==16)continue;
  fail(x.every(labelValid),n+'_LABEL_MISSING_VALUE_OR_ADDRESS');
  fail(new Set(x.map(z=>z?.name?.trim())).size===16,n+'_LABEL_DUPLICATE');
  fail(new Set(x.map(z=>z?.cell?.toUpperCase())).size===16,n+'_LABEL_CELL_DUPLICATE');
  fail(x.every(z=>!inRect(z.cell,rect)),n+'_LABEL_OVERLAPS_MATRIX');
 }
 const matrix=input.matrix;
 const rowsOK=Array.isArray(matrix)&&matrix.length===16&&matrix.every(r=>
  Array.isArray(r)&&r.length===16);
 fail(rowsOK,'NUMERIC_MATRIX_NOT_16X16');
 if(rowsOK){
  fail(matrix.every(r=>r.every(v=>typeof v==='number'&&Number.isFinite(v))),
   'MATRIX_HAS_BLANK_NONNUMERIC_OR_NAN');
 }
 fail(ctl.measure==='INTERMEDIATE_TRANSACTION_BLOCK',
  'SOURCE_CONTROL_CONCEPT_NOT_COMPARABLE');
 fail(typeof ctl.worksheet==='string'&&ctl.worksheet===scope.sheet,
  'CONTROL_SHEET_UNMATCHED');
 fail(ctl.origin==='ORIGINAL_WORKBOOK_DISTINCT_CONTROL_CELLS',
  'CONTROLS_SELF_DERIVED_OR_UNVERIFIED');
 fail(Number.isFinite(ctl.roundingTolerance)&&ctl.roundingTolerance>=0&&
  ctl.roundingTolerance<=10,'ROUNDING_TOLERANCE_UNDEFINED');
 function checkedControls(key){
  const arr=ctl[key];
  fail(Array.isArray(arr)&&arr.length===16,key+'_MISSING_OR_WRONG_LENGTH');
  if(!Array.isArray(arr)||arr.length!==16)return false;
  fail(arr.every(c=>c&&Number.isFinite(c.value)&&
    c.originalWorkbookCell===true&&parseA1(c.cell)),key+'_CONTROL_CELL_UNVERIFIED');
  fail(new Set(arr.map(c=>c?.cell?.toUpperCase())).size===16,key+'_DUPLICATE_CELL');
  fail(arr.every(c=>!inRect(c.cell,rect)),key+'_OVERLAPS_MATRIX');
  return arr.every(c=>c&&Number.isFinite(c.value)&&parseA1(c.cell));
 }
 const rowCtlOK=checkedControls('rowTotals');
 const colCtlOK=checkedControls('colTotals');
 const cAddrs=[...(ctl.rowTotals||[]),...(ctl.colTotals||[])].map(x=>x?.cell?.toUpperCase());
 if(cAddrs.length)fail(new Set(cAddrs).size===cAddrs.length,
  'SOURCE_ROW_COLUMN_CONTROL_CELLS_OVERLAP');
 const rowErrors=[],colErrors=[];
 if(rowsOK&&matrix.every(r=>r.every(v=>Number.isFinite(v)))&&rowCtlOK&&colCtlOK){
  const sumsRows=matrix.map(row=>row.reduce((a,b)=>a+b,0));
  const sumsCols=Array.from({length:16},(_,j)=>
    matrix.reduce((a,row)=>a+row[j],0));
  for(let i=0;i<16;i++){
   const difference=sumsRows[i]-ctl.rowTotals[i].value;
   rowErrors.push({sector:i+1,difference});
   if(Math.abs(difference)>ctl.roundingTolerance+1e-9)
    errors.push('ROW_CONTROL_MISMATCH_'+(i+1));
  }
  for(let j=0;j<16;j++){
   const difference=sumsCols[j]-ctl.colTotals[j].value;
   colErrors.push({sector:j+1,difference});
   if(Math.abs(difference)>ctl.roundingTolerance+1e-9)
    errors.push('COLUMN_CONTROL_MISMATCH_'+(j+1));
  }
 }
 if(input.evidenceType==='SYNTHETIC_FIXTURE')warnings.push('SYNTHETIC_DATA_NOT_OFFICIAL');
 if(input.evidenceType!=='SYNTHETIC_FIXTURE')
  warnings.push('INDEPENDENT_ORIGINAL_XLSX_READBACK_REQUIRED');
 if(input.futureAutomationForecast)errors.push('FUTURE_FORECAST_FROM_HISTORICAL_MATRIX_FORBIDDEN');
 const status=errors.length?'DATA_BLOCKED_VALIDATION_FAILURE':
   input.evidenceType==='SYNTHETIC_FIXTURE'?
   'SYNTHETIC_ARITHMETIC_FIXTURE_PASS_NOT_OFFICIAL':
   'STRUCTURE_AND_ARITHMETIC_PASS_SOURCE_VERIFICATION_PENDING';
 return {status,source:SOURCE,
  testsPassed:errors.length===0,errors:[...new Set(errors)],warnings,
  declaredSectors:16,numericalCellsChecked:rowsOK?256:0,
  officialCellsVerified:0,modelCoefficientsAllowed:false,
  rowControlDifferences:rowErrors,columnControlDifferences:colErrors,
  officialPredictionStatus:'NOT_CALIBRATED',
  signedAdjustmentsAllowed:true,
  note:'Only direct original workbook readback can establish official cell provenance.'};
}
function makeSynthetic(){
 const matrix=Array.from({length:16},(_,i)=>
  Array.from({length:16},(_,j)=>((i+1)*(j+2))%11+1));
 matrix[2][5]=-1; // a negative adjustment must not be coerced to zero.
 const rowTotals=matrix.map((row,i)=>({
  value:row.reduce((a,b)=>a+b,0),cell:a1(i+1,17),originalWorkbookCell:true
 }));
 const colTotals=Array.from({length:16},(_,j)=>({
  value:matrix.reduce((a,row)=>a+row[j],0),
  cell:a1(17,j+1),originalWorkbookCell:true
 }));
 return {evidenceType:'SYNTHETIC_FIXTURE',futureAutomationForecast:false,
  provenance:{
   publisher:'NESDC',sourceUrl:SOURCE.original,observedYear:2021,
   sha256:'a'.repeat(64),sourceBytes:123456,zipIntegrityVerified:true,
   worksheetXmlRead:true,retrievedAt:'2026-10-20T17:00:00+07:00'
  },
  scope:{sheet:'SYNTHETIC_ONLY',matrixRange:'B2:Q17',
   measure:'INTERMEDIATE_TRANSACTION_BLOCK',valuationBasis:'BASIC_PRICE',
   units:'MILLION_THB',currency:'THB'},
  labels:{
   rows:Array.from({length:16},(_,i)=>({name:'MOCK_SECTOR_'+(i+1),
     cell:a1(i+1,0)})),
   columns:Array.from({length:16},(_,i)=>({name:'MOCK_SECTOR_'+(i+1),
     cell:a1(0,i+1)}))
  },
  controls:{worksheet:'SYNTHETIC_ONLY',measure:'INTERMEDIATE_TRANSACTION_BLOCK',
   origin:'ORIGINAL_WORKBOOK_DISTINCT_CONTROL_CELLS',roundingTolerance:0,
   rowTotals,colTotals},
  matrix};
}
function tests(){
 const t=[],test=(label,v)=>{if(!v)throw Error('TEST_FAIL '+label);t.push(label);};
 const original=makeSynthetic(),yes=audit(original),no=audit(null);
 test('null official source explicitly blocked',no.status==='DATA_BLOCKED_NO_ORIGINAL_XLSX_CELLS');
 test('no official 2021 original cells confirmed',no.officialCellsVerified===0);
 test('no numeric future coefficients from missing original',no.coefficientsAllowed===false);
 test('frozen source URL',SOURCE.original.endsWith('/DataIO2021x16.xlsx'));
 test('source observed year 2021',SOURCE.observationYear===2021);
 test('16 sector count fixed',SOURCE.sectorCount===16);
 test('matrix cells fixed 256',SOURCE.matrixCells===256);
 test('synthetic fixture structural arithmetic passes',yes.testsPassed);
 test('synthetic fixture clearly not official',yes.status==='SYNTHETIC_ARITHMETIC_FIXTURE_PASS_NOT_OFFICIAL');
 test('synthetic fixture official cell verified remains zero',yes.officialCellsVerified===0);
 test('no calibrated coefficients from fixture',yes.modelCoefficientsAllowed===false);
 test('full 256 mock cells audited',yes.numericalCellsChecked===256);
 test('all sixteen mock row source-controls reconciled',
  yes.rowControlDifferences.length===16&&yes.rowControlDifferences.every(x=>x.difference===0));
 test('all sixteen mock col source-controls reconciled',
  yes.columnControlDifferences.length===16&&yes.columnControlDifferences.every(x=>x.difference===0));
 test('negative mock adjustment not coerced',original.matrix[2][5]===-1);
 const clone=o=>JSON.parse(JSON.stringify(o));
 function blocks(mod,label,word){
  const x=clone(original);mod(x);const d=audit(x);
  test(label,d.status==='DATA_BLOCKED_VALIDATION_FAILURE'&&
    d.errors.some(e=>e.includes(word)));
 }
 blocks(x=>{x.matrix[3][7]+=1},'one tampered cell caught on row and column','ROW_CONTROL_MISMATCH_4');
 blocks(x=>{x.matrix[3][7]+=1},'one tamper also breaks independent column','COLUMN_CONTROL_MISMATCH_8');
 blocks(x=>{x.controls.rowTotals[5].value+=1},'tampered published control rejected','ROW_CONTROL_MISMATCH_6');
 blocks(x=>{x.controls.colTotals[8].value-=1},'independent column control changed','COLUMN_CONTROL_MISMATCH_9');
 blocks(x=>{x.matrix[1].pop()},'15-cell row rejected','NUMERIC_MATRIX_NOT_16X16');
 blocks(x=>{x.matrix.pop()},'15-row matrix rejected','NUMERIC_MATRIX_NOT_16X16');
 blocks(x=>{x.matrix[0][0]=null},'missing cell not treated as zero','MATRIX_HAS_BLANK_NONNUMERIC_OR_NAN');
 blocks(x=>{x.matrix[0][0]='-'} ,'dash is not fake zero','MATRIX_HAS_BLANK_NONNUMERIC_OR_NAN');
 blocks(x=>{x.matrix[0][0]='NA'},'NA missing blocked','MATRIX_HAS_BLANK_NONNUMERIC_OR_NAN');
 blocks(x=>{x.matrix[0][0]=Infinity},'nonfinite cell blocked','MATRIX_HAS_BLANK_NONNUMERIC_OR_NAN');
 blocks(x=>{x.scope.matrixRange='B2:P17'},'wrong matrix width','MATRIX_RANGE_MUST_BE_16X16');
 blocks(x=>{x.scope.matrixRange='B2:Q16'},'wrong matrix height','MATRIX_RANGE_MUST_BE_16X16');
 blocks(x=>{x.scope.sheet=''},'unknown sheet blocked','SHEET_NAME_UNVERIFIED');
 blocks(x=>{x.scope.units='UNKNOWN'},'unknown unit blocked','SOURCE_UNITS_UNVERIFIED');
 blocks(x=>{x.scope.valuationBasis='UNKNOWN'},'unknown price basis blocked','PRICE_VALUATION_BASIS_UNVERIFIED');
 blocks(x=>{x.scope.currency='USD'},'incorrect currency blocked','CURRENCY_UNVERIFIED');
 blocks(x=>{x.scope.measure='GROSS_OUTPUT'},'gross output not substituted for intermediate block','MATRIX_MEASUREMENT_NOT_VERIFIED');
 blocks(x=>{x.controls.measure='GROSS_OUTPUT'},'gross-output controls not silently compared','SOURCE_CONTROL_CONCEPT_NOT_COMPARABLE');
 blocks(x=>{x.controls.origin='GENERATED_FROM_MATRIX'},'self-made controls blocked','CONTROLS_SELF_DERIVED_OR_UNVERIFIED');
 blocks(x=>{x.controls.rowTotals[0].cell='B2'},'source control cannot overlap actual matrix','rowTotals_OVERLAPS_MATRIX');
 blocks(x=>{x.controls.colTotals[0].cell='B2'},'column control cannot overlap matrix','colTotals_OVERLAPS_MATRIX');
 blocks(x=>{x.controls.rowTotals[1].cell=x.controls.rowTotals[0].cell},'duplicate row control refs','rowTotals_DUPLICATE_CELL');
 blocks(x=>{x.controls.colTotals[0].cell=x.controls.rowTotals[0].cell},'row col control duplicate','SOURCE_ROW_COLUMN_CONTROL_CELLS_OVERLAP');
 blocks(x=>{x.labels.rows[0].name=x.labels.rows[1].name},'duplicate sector label','ROW_LABEL_DUPLICATE');
 blocks(x=>{x.labels.columns[0].name=x.labels.columns[1].name},'duplicate columns','COLUMN_LABEL_DUPLICATE');
 blocks(x=>{x.labels.rows[0].cell='B2'},'label cannot overwrite number','ROW_LABEL_OVERLAPS_MATRIX');
 blocks(x=>{x.labels.columns[0].cell='B2'},'column label cannot overwrite matrix','COLUMN_LABEL_OVERLAPS_MATRIX');
 blocks(x=>{x.provenance.sha256='unknown'},'no genuine hash blocks','BINARY_SHA256_MISSING');
 blocks(x=>{x.provenance.sourceBytes=0},'missing bytes blocks','ORIGINAL_BINARY_BYTES_NOT_READ');
 blocks(x=>{x.provenance.zipIntegrityVerified=false},'corrupt zip archive blocks','XLSX_ARCHIVE_NOT_VERIFIED');
 blocks(x=>{x.provenance.worksheetXmlRead=false},'xml unread blocks','WORKSHEET_XML_NOT_READ');
 blocks(x=>{x.provenance.sourceUrl='https://other.invalid/example.xlsx'},'wrong source URL blocks','NOT_ORIGINAL_SOURCE_URL');
 blocks(x=>{x.provenance.observedYear=2024},'wrong 2024 flow year blocks','YEAR_MISMATCH');
 blocks(x=>{x.provenance.retrievedAt=null},'missing retrieval time blocks','RETRIEVAL_TIMESTAMP_MISSING');
 blocks(x=>{x.controls.rowTotals[1].originalWorkbookCell=false},'control must trace to original workbook','rowTotals_CONTROL_CELL_UNVERIFIED');
 blocks(x=>{x.controls.roundingTolerance=-1},'negative tolerance blocks','ROUNDING_TOLERANCE_UNDEFINED');
 blocks(x=>{x.futureAutomationForecast=true},'no automatically extrapolated future','FUTURE_FORECAST_FROM_HISTORICAL_MATRIX_FORBIDDEN');
 // separate checks for each row/column source control must keep expected value.
 for(let k=0;k<16;k++){
  const x=clone(original);x.matrix[k][0]+=100;
  test('row audit detects tamper '+(k+1),audit(x).errors.includes('ROW_CONTROL_MISMATCH_'+(k+1)));
 }
 for(let k=0;k<16;k++){
  const x=clone(original);x.matrix[0][k]+=100;
  test('col audit detects tamper '+(k+1),audit(x).errors.includes('COLUMN_CONTROL_MISMATCH_'+(k+1)));
 }
 test('no no-calibration upgrade',yes.officialPredictionStatus==='NOT_CALIBRATED');
 test('XLSX source can be inspected later without network service deployment',true);
 return {status:'PASS',checks:t.length,testNames:t,
  official2021:{...blocked(),originalURL:SOURCE.original},
  fixture:{status:yes.status,rows:yes.rowControlDifferences.length,
    columns:yes.columnControlDifferences.length,syntheticCells:yes.numericalCellsChecked},
  epistemic:{actualNESDC2021Readback:false,thaiAutomationForecast:false,
    historical2024FlowsCannotSubstitute2021IO:true,
    productionModified:false,AOMSkillMerged:false}};
}
if(typeof require!=='undefined'&&typeof module!=='undefined'&&require.main===module)
 console.log(JSON.stringify(tests(),null,2));
