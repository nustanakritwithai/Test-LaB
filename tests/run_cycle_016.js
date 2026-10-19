'use strict';
// Offline reproducibility runner for Test-LaB Cycle 016.
// Node.js 18+, built-in fs/path/vm only; NO network requests or writes.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const source=fs.readFileSync(path.join(root,'tests','cycle_016_option_unlock_replay.js'),'utf8');
const model=vm.runInNewContext(source+'\n({runReplay,syntheticFixtureTests})',{}, {timeout:10000});
const fixtures=model.syntheticFixtureTests();
const reports=[];
for(const repo of ['ruff','flask']){
  const file=path.join(root,'data','cycle016_'+repo+'_holdout_manifest.json');
  const m=JSON.parse(fs.readFileSync(file,'utf8'));
  const r=model.runReplay(m.releases,{
    complete:m.complete,repo:m.repo,pages:m.pages,
    entriesFetched:m.entriesFetched,stopReason:m.stopReason
  });
  reports.push(r);
}
console.log(JSON.stringify({fixtures:{status:fixtures.status,checks:fixtures.checks},reports},null,2));
