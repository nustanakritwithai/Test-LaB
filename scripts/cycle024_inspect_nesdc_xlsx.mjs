'use strict';
// Cycle 024 — Read-only XLSX worksheet inspector. Node.js >=18, stdlib only.
// DO NOT infer a 16x16 I/O numeric block from cell counts alone.
// Before claiming observed NESDC values: verify source URL, SHA256, sheet,
// cells, 2021 definitions, units, independent row/column controls.
// Run: node scripts/cycle024_inspect_nesdc_xlsx.mjs path/to/original.xlsx report.json
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
const MAX_ARCHIVE=48*1024*1024,MAX_ENTRY=100*1024*1024,MAX_ENTRIES=1500;
function fail(s){throw Error('XLSX_INSPECT_BLOCKED: '+s);}
function decode(s){return String(s).replace(/&(#x[0-9a-f]+|#\d+|quot|apos|lt|gt|amp);/gi,(_,t)=>{
 if(t[0]==='#')return String.fromCodePoint(t[1].toLowerCase()==='x'?parseInt(t.slice(2),16):parseInt(t.slice(1),10));
 return {quot:'"',apos:"'",lt:'<',gt:'>',amp:'&'}[t.toLowerCase()]??_;
});}
function attrs(s){const a={};for(const m of s.matchAll(/([A-Za-z_:][\w:.-]*)\s*=\s*(["'])(.*?)\2/g))a[m[1]]=decode(m[3]);return a;}
function crc32(b){let c=0xffffffff;for(const n of b){c^=n;for(let k=0;k<8;k++)c=(c>>>1)^(-(c&1)&0xedb88320);}return(c^0xffffffff)>>>0;}
function zipEntries(buffer){
 if(buffer.length>MAX_ARCHIVE)fail('SOURCE_ARCHIVE_TOO_LARGE');
 let end=-1;for(let i=buffer.length-22;i>=Math.max(0,buffer.length-65558);i--){
  if(buffer.readUInt32LE(i)===0x06054b50){end=i;break;}
 }
 if(end<0)fail('ZIP_END_NOT_FOUND');
 const n=buffer.readUInt16LE(end+10),start=buffer.readUInt32LE(end+16),bytes=buffer.readUInt32LE(end+12);
 if(n===0||n>MAX_ENTRIES||start+bytes>buffer.length)fail('ZIP_DIRECTORY_INVALID');
 const z=new Map();let off=start;
 for(let i=0;i<n;i++){
  if(off+46>buffer.length||buffer.readUInt32LE(off)!==0x02014b50)fail('ZIP_CENTRAL_HEADER_INVALID');
  const method=buffer.readUInt16LE(off+10),crc=buffer.readUInt32LE(off+16);
  const clen=buffer.readUInt32LE(off+20),ulen=buffer.readUInt32LE(off+24);
  const nl=buffer.readUInt16LE(off+28),el=buffer.readUInt16LE(off+30),ml=buffer.readUInt16LE(off+32);
  const loc=buffer.readUInt32LE(off+42),name=buffer.subarray(off+46,off+46+nl).toString('utf8');
  off+=46+nl+el+ml;
  if(!name||name.startsWith('/')||name.includes('..')||name.includes('\\')||z.has(name))fail('ZIP_ENTRY_UNSAFE_PATH');
  if(clen>MAX_ARCHIVE||ulen>MAX_ENTRY||ulen===0xffffffff||clen===0xffffffff)fail('ZIP_ENTRY_EXCEEDS_LIMIT');
  if(loc+30>buffer.length||buffer.readUInt32LE(loc)!==0x04034b50)fail('ZIP_LOCAL_HEADER_INVALID');
  const localNames=buffer.readUInt16LE(loc+26),localExtra=buffer.readUInt16LE(loc+28),dataOff=loc+30+localNames+localExtra;
  if(dataOff+clen>buffer.length)fail('ZIP_DATA_TRUNCATED');
  const packed=buffer.subarray(dataOff,dataOff+clen);
  const uncompressed=method===0?packed:method===8?zlib.inflateRawSync(packed,{maxOutputLength:MAX_ENTRY}):null;
  if(!uncompressed||uncompressed.length!==ulen||crc32(uncompressed)!==crc)fail('ZIP_CRC_SIZE_MISMATCH');
  z.set(name,uncompressed);
 }
 return z;
}
function xml(z,n){const b=z.get(n);if(!b)fail('MISSING_XML: '+n);return b.toString('utf8');}
function field(s,tag){
 const r=new RegExp('<(?:[\\w-]+:)?'+tag+'\\b[^>]*>([\\s\\S]*?)<\\/(?:[\\w-]+:)?'+tag+'>','i');
 return r.exec(s)?.[1]??null;
}
function rich(s){return [...String(s).matchAll(/<(?:[\w-]+:)?t\b[^>]*>([\s\S]*?)<\/(?:[\w-]+:)?t>/g)].map(m=>decode(m[1])).join('');}
function inspect(bytes){
 const z=zipEntries(bytes),wb=xml(z,'xl/workbook.xml'),rels=xml(z,'xl/_rels/workbook.xml.rels');
 const strings=z.has('xl/sharedStrings.xml')?
  [...xml(z,'xl/sharedStrings.xml').matchAll(/<(?:[\w-]+:)?si\b[^>]*>([\s\S]*?)<\/(?:[\w-]+:)?si>/g)].map(m=>rich(m[1])):[];
 const map=new Map();
 for(const m of rels.matchAll(/<(?:[\w-]+:)?Relationship\b([^>]*?)\/?\s*>/g)){
  const a=attrs(m[1]);if(!a.Id||!a.Target)continue;
  map.set(a.Id,a.Target.startsWith('/')?a.Target.slice(1):path.posix.normalize(path.posix.join('xl',a.Target)));
 }
 const sheets=[];
 for(const m of wb.matchAll(/<(?:[\w-]+:)?sheet\b([^>]*?)\/?\s*>/g)){
  const a=attrs(m[1]),target=map.get(a['r:id']);if(!target)fail('SHEET_RELATION_MISSING '+a.name);
  const body=xml(z,target),dim=/<(?:[\w-]+:)?dimension\b([^>]*)\/?\s*>/.exec(body),cells=[];
  for(const m of body.matchAll(/<(?:[\w-]+:)?c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/(?:[\w-]+:)?c>)/g)){
   const ca=attrs(m[1]);if(!ca.r)fail('CELL_ADDRESS_MISSING');
   const v=field(m[2]??'','v'),f=field(m[2]??'','f');
   let value=null;
   if(ca.t==='s'){if(v===null||!Number.isInteger(Number(v))||strings[Number(v)]===undefined)fail('SHARED_STRING_INVALID');value=strings[Number(v)];}
   else if(ca.t==='inlineStr')value=rich(field(m[2]??'','is')??'');
   else if(ca.t==='e')value={excelError:decode(v??'')};
   else if(v!==null&&v.trim()!==''){
    if(ca.t==='str')value=decode(v);
    else if(ca.t==='b')value=v==='1';
    else {const n=Number(v);value=Number.isFinite(n)?n:{invalidNumber:v};}
   }
   if(value!==null||f!==null)cells.push({address:ca.r,type:ca.t??'n',value,
    formula:f?decode(f):null,hasCachedValue:v!==null});
  }
  sheets.push({name:a.name,worksheetPart:target,
   dimension:dim?attrs(dim[1]).ref??null:null,
   nonemptyCells:cells.length,numericCells:cells.filter(c=>typeof c.value==='number').length,
   formulaCells:cells.filter(c=>c.formula!==null).length,cellReadback:cells});
 }
 if(sheets.length===0)fail('NO_WORKSHEETS');
 return {status:'LOCAL_XLSX_INSPECTED__IO_MATRIX_RANGE_NOT_SELECTED',
  originalSourceURL:'UNKNOWN_UNLESS_SEPARATELY_VERIFIED',
  observedYear:'UNVERIFIED_IN_WORKBOOK',
  archive:{sha256:crypto.createHash('sha256').update(bytes).digest('hex'),
   sizeBytes:bytes.length,crcVerified:true,entryCount:z.size},
  sheets,
  official2021IOCellsVerified:0,
  predictionUseAllowed:false,
  warning:'Worksheet readback cannot independently establish NESDC origin, transaction range, units or original row/column controls.'};
}
const file=process.argv[2];
if(!file){console.error('Usage: node cycle024_inspect_nesdc_xlsx.mjs original.xlsx [inspection.json]');process.exit(2);}
try{
 const r=inspect(fs.readFileSync(file));
 if(process.argv[3])fs.writeFileSync(process.argv[3],JSON.stringify(r,null,2));
 console.log(JSON.stringify({status:r.status,archive:r.archive,
  worksheets:r.sheets.map(s=>({name:s.name,dimension:s.dimension,
   nonemptyCells:s.nonemptyCells,numericCells:s.numericCells,
   formulaCells:s.formulaCells,sample:s.cellReadback.slice(0,15)})),
  output:process.argv[3]??null},null,2));
}catch(e){console.error(String(e));process.exit(1);}
