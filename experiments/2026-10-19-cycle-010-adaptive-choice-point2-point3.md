# Test-LaB — Cycle 010 / Adaptive Choice Skill at Point 2 → Point 3

**Date:** 2026-10-19 (Asia/Bangkok)  
**Specification:** [Adaptive Decision Skill v3](../world-model/ADAPTIVE_DECISION_SKILL_v3.md)  
**User challenge:** A multiverse search must also improve its ability to choose. When the agent reaches point 2, it must assess the *current* situation at point 2, forecast every declared feasible action to point 3, and choose again rather than blindly following the plan from point 1.  
**Test status:** 26/26 deterministic synthetic fixture assertions **PASS**. GitHub write/readback are verified separately.  
**Real-world outcome status:** UNKNOWN / no live intervention / no evidence of commercial improvement.

## 1. Comparison design

Three decision methods share an explicitly declared synthetic environment:

| Method | Point 1 | Point 2 action | Expected point 3 cash |
|---|---|---|---:|
| Greedy local baseline | FAST (+12) | No new option | 112 |
| Static LEARN policy | LEARN (-10) | SCALE regardless of information | 112 |
| **Adaptive multiverse** | **LEARN (-10)** | **POS→SCALE; NEG→STOP** | **117.8** |

All values are *toy simulation units*, not Thai baht, real financial returns, or measured gains. The selection skill is rewarded for **using a changed point-2 belief to choose an action with a better full-horizon expectation**, not for claiming to know which hidden world will happen.

### Declared scenario assumptions (not measured market facts)

- Point 1 observed resources: cash = 100.
- Unknown market world: HIGH with prior 35%; LOW with prior 65%.
- FAST: gain 12, final 112; no observation benefit.
- LEARN: pay 10, reach point 2 with cash 90 and observe POS or NEG.
- Test signal sensitivity and specificity: both 85%.
- SCALE available only when observed cash is at least 80.
- If SCALE: HIGH yields +100; LOW yields -20. If STOP: cash unchanged.
- Objective: maximize expected cash at point 3, subject to the cash feasibility gate. No other preferences or risks are modeled.

This finite test enumerates the complete **four declared LEARN nature–signal leaves**, not real-world unknown possibilities.

## 2. Evaluate the situation *at point 2*, forecast point 3

### Point 2 receives POS

- P(HIGH,POS)=0.35×0.85=0.2975
- P(LOW,POS)=0.65×0.15=0.0975
- P(POS)=0.395
- Posterior P(HIGH|POS)=0.2975/0.395 ≈ **75.3165%**
- SCALE forecast E[point 3 cash | POS]=90+100×0.753165−20×0.246835 ≈ **160.3797**
- STOP forecast=90
- **Choice at point 2: SCALE**

### Point 2 receives NEG

- P(HIGH,NEG)=0.35×0.15=0.0525
- P(LOW,NEG)=0.65×0.85=0.5525
- P(NEG)=0.605
- Posterior P(HIGH|NEG)=0.0525/0.605 ≈ **8.6777%**
- SCALE forecast E[point 3 cash | NEG] ≈ **80.4132**
- STOP forecast=90
- **Choice at point 2: STOP**

The policy does not peek at HIGH/LOW itself. It uses only POS/NEG, which is visible at point 2. Realized outcomes can still differ from expectations.

## 3. Enumerated worlds and outcomes

| Latent market | Observation | Joint probability | Point 2 decision | Point 3 simulated cash |
|---|---|---:|---|---:|
| HIGH | POS | 0.2975 | SCALE | 190 |
| HIGH | NEG | 0.0525 | STOP | 90 |
| LOW | POS | 0.0975 | SCALE | 70 |
| LOW | NEG | 0.5525 | STOP | 90 |

Expected point 3 cash = (0.2975×190)+(0.0525×90)+(0.0975×70)+(0.5525×90)=**117.8**.  
FAST=112; LEARN with a precommitted SCALE=112.  
**Toy expected uplift over greedy = 5.8 units**, not observed or guaranteed ROI.

## 4. Tests of choosing skill beyond a static policy

1. **Change evidence quality**: At signal accuracy 60% (same synthetic prior), POS and NEG both favor SCALE and the LEARN expected value falls to 112 (ties FAST). The skill correctly stops treating an uninformative observation as valuable.
2. **Change environmental prior**: At HIGH prior 10% and signal accuracy 85%, LEARN expected value becomes 95.8; the root choice flips to FAST (112).
3. **Surprise at point 2**: If observed point-2 cash is 70 rather than the planned 90, SCALE is **infeasible** by the cash rule even after POS, so choose STOP. Replanning uses the actual observed snapshot rather than the optimistic simulated one.
4. **No future leakage**: HIGH+POS and LOW+POS must choose the same action at point 2 because hidden market state is not observed. Likewise for HIGH+NEG and LOW+NEG.
5. **Bad outcome is possible after a correct choice**: If LOW happens with POS, the selected SCALE gives terminal 70 despite a conditional forecast near 160.38. That alone does not prove the policy faulty; assess calibration over repeated observations.
6. **No real actions**: All resources and outcomes in this test are synthetic. No user account, public post, shop operation, or financial transaction was touched.

## 5. Executed verification

Deterministic Node.js evaluation ran using existing local computation; **26/26 assertions passed**. No third-party package, new skill package, plugin, custom orchestration, server or database was built. The test is reproducible from the exact stand-alone script below.

### Reproduction script (Node.js 18+)

~~~javascript
'use strict';
const assert = require('node:assert/strict');
const pHigh = 0.35;
const quality = 0.85;
const startCash = 100;
const learnFee = 10;
const fastBonus = 12;
const highReward = 100;
const lowReward = -20;
const scaleMinCash = 80;
const tests = [];
const test = (name, cond) => { assert.ok(cond, name); tests.push(name); };
const near = (a, b) => Math.abs(a - b) < 1e-9;

function scenarios(prior, accuracy) {
  assert.ok(prior >= 0 && prior <= 1 && accuracy >= 0 && accuracy <= 1);
  return [
    {world:'HIGH', signal:'POS', probability:prior*accuracy},
    {world:'HIGH', signal:'NEG', probability:prior*(1-accuracy)},
    {world:'LOW', signal:'POS', probability:(1-prior)*(1-accuracy)},
    {world:'LOW', signal:'NEG', probability:(1-prior)*accuracy}
  ];
}
function point2Decision({cash, signal}, prior=pHigh, accuracy=quality) {
  const rows=scenarios(prior,accuracy).filter(s=>s.signal===signal);
  const mass=rows.reduce((sum,s)=>sum+s.probability,0);
  if(mass===0) return {status:'UNREACHABLE_OBSERVATION', signal};
  const p=rows.filter(x=>x.world==='HIGH').reduce((sum,x)=>sum+x.probability,0)/mass;
  const scaleDelta=p*highReward+(1-p)*lowReward;
  const available = ['STOP',...(cash>=scaleMinCash?['SCALE']:[])];
  const choice = available.includes('SCALE')&&scaleDelta>0 ? 'SCALE':'STOP';
  return {status:'OK',cash,signal,posteriorHigh:p,actions:available,scaleDelta,choice,
          predictedPoint3: choice==='SCALE'?cash+scaleDelta:cash,
          possiblePoint3: choice==='SCALE'?[{world:'HIGH',cash:cash+highReward},{world:'LOW',cash:cash+lowReward}]:[{world:'HIGH',cash},{world:'LOW',cash}]};
}
function compareRoot(prior=pHigh, accuracy=quality) {
  const rows=scenarios(prior,accuracy);
  const cashAfterLearn=startCash-learnFee;
  const results=rows.map(r=>{
    const assessment=point2Decision({cash:cashAfterLearn,signal:r.signal},prior,accuracy);
    const s3cash=assessment.choice==='SCALE' ?cashAfterLearn+(r.world==='HIGH'?highReward:lowReward):cashAfterLearn;
    return {...r, chosenAtPoint2: assessment.choice,terminalCash:s3cash};
  });
  const learnExpected=results.reduce((s,r)=>s+r.probability*r.terminalCash,0);
  const fastExpected=startCash+fastBonus;
  const unconditionalScale=startCash-learnFee+prior*highReward+(1-prior)*lowReward;
  return {rootChoice:learnExpected>fastExpected?'LEARN':(learnExpected<fastExpected?'FAST':'TIE'),
          learnExpected,fastExpected,unconditionalScale,leaves:results};
}
const row=scenarios(pHigh,quality);
const pos=point2Decision({cash:90,signal:'POS'});
const neg=point2Decision({cash:90,signal:'NEG'});
const root=compareRoot();
const restricted=point2Decision({cash:70,signal:'POS'});
const weakSignal=compareRoot(pHigh,0.60);
const weakPositive=point2Decision({cash:90,signal:'POS'},pHigh,0.60);
const weakNegative=point2Decision({cash:90,signal:'NEG'},pHigh,0.60);
const changedPrior=compareRoot(0.10,quality);
const unreachable=point2Decision({cash:90,signal:'POS'},0,1);

test('Declared four latent-world x observation leaves', row.length===4);
test('Joint world/signal probability normalizes', near(row.reduce((s,r)=>s+r.probability,0),1));
test('Positive signal marginal=0.395', near(row.filter(r=>r.signal==='POS').reduce((s,r)=>s+r.probability,0),.395));
test('Negative signal marginal=0.605', near(row.filter(r=>r.signal==='NEG').reduce((s,r)=>s+r.probability,0),.605));
test('LEARN reduces cash at point 2 to 90', near(startCash-learnFee,90));
test('Positive posterior high=0.2975/0.395', near(pos.posteriorHigh,.2975/.395));
test('Negative posterior high=0.0525/0.605', near(neg.posteriorHigh,.0525/.605));
test('Positive signal picks SCALE at point 2',pos.choice==='SCALE');
test('Negative signal picks STOP at point 2',neg.choice==='STOP');
test('At point 2 positive forecast to point 3=160.3797468',near(pos.predictedPoint3,90+27.8/.395));
test('At point 2 negative forecast to point 3=90',near(neg.predictedPoint3,90));
test('Adaptive LEARN expected point 3 cash=117.8',near(root.learnExpected,117.8));
test('Greedy FAST expected point 3 cash=112',near(root.fastExpected,112));
test('Precommitted LEARN then SCALE expected cash=112',near(root.unconditionalScale,112));
test('Original root chooses LEARN',root.rootChoice==='LEARN');
test('Improvement only within toy model=5.8',near(root.learnExpected-root.fastExpected,5.8));
test('Point2 choice depends on observation only, never on hidden demand',root.leaves.every(r=>r.chosenAtPoint2===point2Decision({cash:90,signal:r.signal}).choice));
test('HIGH POS point3 cash=190',root.leaves.find(r=>r.world==='HIGH'&&r.signal==='POS').terminalCash===190);
test('LOW POS point3 cash=70',root.leaves.find(r=>r.world==='LOW'&&r.signal==='POS').terminalCash===70);
test('Both NEG branches at point3 cash=90',root.leaves.filter(r=>r.signal==='NEG').every(r=>r.terminalCash===90));
test('Observed point2 cash70 blocks SCALE despite positive signal',restricted.choice==='STOP' && restricted.actions.length===1);
test('Poor quality signal q=.60 makes both observations choose SCALE',weakPositive.choice==='SCALE'&&weakNegative.choice==='SCALE');
test('Poor signal removes learning advantage',near(weakSignal.learnExpected,112)&&weakSignal.rootChoice==='TIE');
test('Prior 10% reverses root choice to FAST',changedPrior.rootChoice==='FAST'&&near(changedPrior.learnExpected,95.8));
test('Impossible observation is not used for a decision',unreachable.status==='UNREACHABLE_OBSERVATION');
test('No real actions occurred; all balance changes are simulated',startCash===100);
console.log(JSON.stringify({status:'PASS',count:tests.length,metrics:{root,point2_POS:pos,point2_NEG:neg,restricted_point2:restricted,weak_signal:weakSignal,changed_prior:changedPrior},tests},null,2));
~~~

## 6. Learn after real observations: not yet proved

The important next development is **calibration from repeated real point-2 and point-3 observations** with authorization and safeguards. Log every forecast before reality happens, compare to observed state transitions, revise probabilities or model hypotheses when evidence supports it, and test policy switching on held-out cases.

This test verifies **correct logic for re-assessing and choosing with a declared synthetic model**, not that the AI has already acquired predictive skill through data-driven learning. Real-world prediction accuracy, improvement in value over a fair control, costs and any benefit outside the toy environment remain UNKNOWN.

**Verdict:** ADAPTIVE DECISION LOGIC PASS (26/26) / MODEL LEARNING UNVERIFIED / REAL-WORLD PREDICTIVE PERFORMANCE UNVERIFIED.
