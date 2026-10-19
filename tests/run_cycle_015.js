'use strict';
// Reproduce Cycle 015 from the precommitted source algorithm and frozen public
// timestamp manifest. No network, no writes, Node.js 18+, no npm packages.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const source=fs.readFileSync(path.join(root,'tests','aom_vs_multiverse_release_replay.js'),'utf8');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'data','pytest_stable_release_history_2024_2025.json'),'utf8'));
const runBenchmark=vm.runInNewContext(source+'\nrunBenchmark',{},{timeout:10000});
const results=runBenchmark(manifest.releases,{
  completeCutoff:manifest.completeCutoff,
  pages:manifest.pages,
  entriesFetched:manifest.entriesFetched,
  stoppingReason:manifest.stoppingReason
});
if(results.status!=='PREQUENTIAL_HISTORICAL_REPLAY_COMPLETE')throw Error('Replay not complete');
console.log(JSON.stringify(results,null,2));
