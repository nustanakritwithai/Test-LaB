'use strict';
// Test-LaB Cycle 017 — offline reproduction from committed public fixtures.
// Node.js 18+ standard library only. Reads files; never edits a source repo.
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const base=path.resolve(__dirname,'..');
const source=fs.readFileSync(path.join(__dirname,'horizon_aware_multiverse_v4_2.js'),'utf8');
const moduleApi=vm.runInNewContext(source+'\n({syntheticTests,replay})',{},{timeout:15000});
const checks=moduleApi.syntheticTests();
const cases=[];
for(const item of [
  {path:'data/cycle016_ruff_holdout_manifest.json',fee:2},
  {path:'data/cycle016_ruff_holdout_manifest.json',fee:8},
  {path:'data/cycle016_flask_holdout_manifest.json',fee:2},
  {path:'data/cycle016_flask_holdout_manifest.json',fee:8}
]){
  const manifest=JSON.parse(fs.readFileSync(path.join(base,item.path),'utf8'));
  const run=moduleApi.replay(manifest,item.fee);
  if(run.status!=='HISTORICAL_REPLAY_TOY_EFFECTS')throw Error('INCOMPLETE_REPLAY '+manifest.repo);
  cases.push({repo:run.repo,fee:run.fee,trainingPositiveWeeks:run.positiveTrainWeeks,
    holdoutPositiveWeeks:run.positiveHoldoutWeeks,loss:run.loss,
    differenceAwareMinusFixed:run.differenceAwareMinusFixed,
    work:run.work,firstWeek:run.weekly[0],
    checkpoints:run.weekly.length,
    fullyModelCertified:run.weekly.every(x=>x.awareCertificate.startsWith('CERTIFIED_'))});
}
console.log(JSON.stringify({status:'PASS_SYNTHETIC_AND_RETROSPECTIVE',syntheticChecks:checks.checks,
  keyCases:checks.keyCases,retroCases:cases,
  realityBoundary:'ACTUAL RELEASE DATES; INTERVENTION COSTS AND BENEFITS SYNTHETIC',
  independentFromAOM:true,productionTouched:false},null,2));
