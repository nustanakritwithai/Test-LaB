# AOM Test-LaB — Cycle 008 / Multiverse Causal World Model v2

**Date:** 2026-10-19 (Asia/Bangkok)  
**Experiment:** Can an exhaustive finite *causal multiverse* preserve later-winning routes while avoiding clairvoyance about unknown outcomes?  
**Status:** `SIMULATED FIXTURES PASS (15/15) / REAL-WORLD UPLIFT UNVERIFIED`  
**Data policy:** Public synthetic examples only; no passwords, financial accounts, customer data, or private project records.

## 1. Goal, baseline and scope

- **Goal:** Test key invariants of `MULTIVERSE_CAUSAL_WORLD_MODEL_v2.md` using existing computation and record results in this Markdown-only Test-LaB.
- **Baseline (not separately executed):** Greedy local choice (take cheaper first turn) or pick the luckiest simulated terminal leaf.
- **Improved policy tested:** Enumerate all *declared feasible* branches within a small finite horizon, distinguish agent choices from nature/model outcomes, and choose future actions only from observable history.
- **Skill/tool selection:** Native reasoning + ephemeral JavaScript arithmetic/assertions + existing GitHub connector `get_repo/fetch/fetch_file/create_file`; reuse existing GitHub history. **No app, orchestrator, new Skill, DB, CI, or deployment.**
- **Horizon/bounds:** Fixture F1 has three decision stages and 8 leaves; F4 has two-stage root/unlock paths and exactly two declared model hypotheses. This does **not** imply coverage of unknown real-world futures.

## 2. Fixture F1 — Keep inferior-looking first branch

Root `A (+1)`, `B (+5)`. Terminal paths, enumerated programmatically:

| Path | Total simulated cost |
|---|---:|
| B>B2>B2a | 7 |
| A>A1>A1b | 9 |
| A>A2>A2a | 9 |
| B>B2>B2b | 9 |
| A>A1>A1a | 12 |
| A>A2>A2b | 12 |
| B>B1>B1a | 14 |
| B>B1>B1b | 16 |

- **Coverage:** 8/8 terminal paths; 15 total nodes. No local-priority pruning.
- **Best global path in this toy model:** `B>B2>B2a`, total cost **7**.
- **Greedy-first A best attainable:** **9**.
- **Interpretation:** The local advantage of A does not imply a globally better completed path. This is a mathematical toy counterexample, **not an observed operational saving**.

## 3. Fixtures F2/F3/F6 — No lucky-leaf oracle

Synthetic assumptions: `P(GOOD)=0.2`, `P(BAD)=0.8`, `C(A)=9`; `C(B|GOOD)=1`, `C(B|BAD)=20`; test fee `1`; symmetric sensitivity and specificity `q`.

| Policy | Expected simulated cost | Interpretation |
|---|---:|---|
| A without test | 9 | Best policy using the declared prior only |
| B without test | 16.2 | Worse in expectation despite best-case cost 1 |
| Latent-state oracle | 7.4 | Diagnostic **only** — cannot be implemented before observing the state |
| TEST q=1; positive→B, negative→A | 8.4 | Better than A after paying test cost |
| TEST q=0.90; positive→B, negative→A | 9.44 | Worse than A even with adaptive branching |
| TEST q=0.95; positive→B, negative→A | 8.92 | Better than A under these assumed parameters |

The test policies were computed by minimizing posterior-weighted conditional cost for each observation. **Before observing**, the policy returns A in both possible latent worlds, enforcing non-anticipativity. Formula for the stated positive/negative rule: `E[C_TEST(q)] = 18.8 - 10.4q`, valid under these synthetic assumptions and decision rules.

## 4. Fixtures F4/F5/F7 — Actions change future action sets

Synthetic real resource snapshot: cash `100`. The root action set is `{QUICK, INVEST, WAIT}`. Only INVEST (`-30`) unlocks `{STOP, BUILD}`. QUICK earns `+12`; BUILD outcome depends on model hypothesis (`M1=+60`, `M2=-20`).

| Declared model | Path | Final simulated cash |
|---|---|---:|
| M1 | QUICK | 112 |
| M1 | WAIT | 100 |
| M1 | INVEST>STOP | 70 |
| M1 | INVEST>BUILD | 130 |
| M2 | QUICK | 112 |
| M2 | WAIT | 100 |
| M2 | INVEST>STOP | 70 |
| M2 | INVEST>BUILD | 50 |

- **Coverage:** 8/8 paths across exactly two explicitly declared models (4 per model).
- **M1:** INVEST→BUILD finishes at 130, beating QUICK at 112.
- **M2:** QUICK finishes at 112, beating INVEST→BUILD at 50.
- No evidence-based probability weights for M1/M2 were provided. **Do not claim a globally optimal real-world first action.**
- All branches fork from the same simulated cash snapshot; real money was **not used**.

## 5. Actual execution and observed measurement

- Ran a self-contained, deterministic JavaScript test harness in the assistant's tool runtime on the declared synthetic fixtures.
- **Assertions:** 15/15 PASS (listed below).
- **Simulated action-branch coverage:** F1 8/8 and F4 8/8, each relative **only** to its declared finite branch set.
- **Observed tool/output success:** Calculation ran and assertions passed; the GitHub write and a separate readback must be verified independently after creation.
- **External physical/business intervention:** NONE; `real_cash_used=0`.
- **ROI or forecasting accuracy:** UNKNOWN/UNVERIFIED; no measured counterfactual business results, no validated real-world causal transition model.
- **Wall time/token/dollar cost:** Not instrumented. Avoid invented savings.

### Assertions actually executed

1. PASS — F1 exhaustive terminal count=8
2. PASS — F1 full tree nodes=15
3. PASS — F1 late-winning route cost=7
4. PASS — F1 greedy-first A misses global optimum
5. PASS — F2 without test choose A over B
6. PASS — F2 oracle is diagnostic only
7. PASS — F2 perfect information policy cost=8.4
8. PASS — F2 90%-accuracy test cost=9.44
9. PASS — F3 95%-accuracy test cost=8.92
10. PASS — F3 observation-based actions chosen
11. PASS — F4 action unlock creates BUILD after INVEST
12. PASS — F4 complete declared model-action coverage 8/8
13. PASS — F5 model disagreement is preserved
14. PASS — F6 no latent-world information leakage
15. PASS — F7 counterfactual simulation does not spend real cash

## 6. Exact reproducibility harness (Node.js 18+, no packages)

Copy the following code to a local terminal (or a disposable JS scratch file) and run it with Node.js. It reproduces the synthetic numbers and terminates with an exception if an assertion fails.

```javascript
function run() {

  const checks = [];
  const ok = (name, cond) => { if (!cond) throw Error(`FAILED: ${name}`); checks.push(name); };
  const approx = (a,b) => Math.abs(a-b)<1e-9;
  const tree = {
    A:{first:1,next:{A1:{cost:2,ends:{A1a:9,A1b:6}},A2:{cost:3,ends:{A2a:5,A2b:8}}}},
    B:{first:5,next:{B1:{cost:5,ends:{B1a:4,B1b:6}},B2:{cost:1,ends:{B2a:1,B2b:3}}}}
  };
  const leaves = [];
  for (const [first,b] of Object.entries(tree))
    for (const [second,c] of Object.entries(b.next))
      for (const [third,cost] of Object.entries(c.ends))
        leaves.push({path:`${first}>${second}>${third}`,cost:b.first+c.cost+cost});
  leaves.sort((a,b)=>a.cost-b.cost || a.path.localeCompare(b.path));
  ok("F1 exhaustive terminal count=8",leaves.length===8);
  ok("F1 full tree nodes=15",1+2+4+leaves.length===15);
  ok("F1 late-winning route cost=7",leaves[0].path==="B>B2>B2a"&&leaves[0].cost===7);
  ok("F1 greedy-first A misses global optimum",Math.min(...leaves.filter(x=>x.path.startsWith("A>")).map(x=>x.cost))===9);
  const pGood=0.2,pBad=0.8,cA=9,cBGood=1,cBBad=20,testFee=1;
  const noTestA = cA;
  const noTestB = pGood*cBGood+pBad*cBBad;
  const oracle = pGood*Math.min(cA,cBGood)+pBad*Math.min(cA,cBBad);
  function evaluateTest(q) {
    const joint={gp:pGood*q,gn:pGood*(1-q),bp:pBad*(1-q),bn:pBad*q};
    const policy = (good,bad)=>(cA*(good+bad)<=cBGood*good+cBBad*bad)?"A":"B";
    const positive = policy(joint.gp,joint.bp), negative=policy(joint.gn,joint.bn);
    const costFor=(action,good,bad)=>action==="A"?cA*(good+bad):cBGood*good+cBBad*bad;
    const expected = testFee+costFor(positive,joint.gp,joint.bp)+costFor(negative,joint.gn,joint.bn);
    return {q,positive,negative,expected:Number(expected.toFixed(10))};
  }
  const perfect=evaluateTest(1),q90=evaluateTest(.9),q95=evaluateTest(.95);
  ok("F2 without test choose A over B",approx(noTestA,9)&&approx(noTestB,16.2));
  ok("F2 oracle is diagnostic only",approx(oracle,7.4));
  ok("F2 perfect information policy cost=8.4",approx(perfect.expected,8.4));
  ok("F2 90%-accuracy test cost=9.44",approx(q90.expected,9.44));
  ok("F3 95%-accuracy test cost=8.92",approx(q95.expected,8.92));
  ok("F3 observation-based actions chosen", [perfect,q90,q95].every(x=>x.positive==="B"&&x.negative==="A"));
  const rootCash=100; const models={M1:60,M2:-20};
  const modelBranches={};
  for (const [model,buildResult] of Object.entries(models)) {
    const possibilities=[
      {path:"QUICK",finalCash:rootCash+12},
      {path:"WAIT",finalCash:rootCash},
      {path:"INVEST>STOP",finalCash:rootCash-30},
      {path:"INVEST>BUILD",finalCash:rootCash-30+buildResult}
    ];
    modelBranches[model]=possibilities;
  }
  ok("F4 action unlock creates BUILD after INVEST",Object.values(modelBranches).every(x=>x.some(y=>y.path==="INVEST>BUILD")));
  ok("F4 complete declared model-action coverage 8/8",Object.values(modelBranches).reduce((a,b)=>a+b.length,0)===8);
  ok("F5 model disagreement is preserved", Math.max(...modelBranches.M1.map(x=>x.finalCash))===130 && Math.max(...modelBranches.M2.map(x=>x.finalCash))===112);
  function preObservationPolicy(_latentWorld){return noTestA<=noTestB?"A":"B";}
  ok("F6 no latent-world information leakage",preObservationPolicy("GOOD")===preObservationPolicy("BAD")&&preObservationPolicy("GOOD")==="A");
  const realCashAfterSimulation=rootCash;
  ok("F7 counterfactual simulation does not spend real cash",realCashAfterSimulation===100);
  return {status:"SIMULATED_FIXTURES_PASS",assertions_passed:checks.length,checks,
    f1:{nodes:15,leaves,best:leaves[0],greedy_A_best:9,coverage:"8/8"},
    f2:{baseline_A:noTestA,baseline_B:noTestB,oracle_diagnostic:oracle,perfect,q90,q95},
    f4:{root_cash:rootCash,model_branches:modelBranches,coverage:"8/8",note:"MODEL probabilities not supplied; no global expected-value winner claimed"},
    real_execution:{financial_actions:0,real_cash_used:0,world_model_calibrated:false}};
}
console.log(JSON.stringify(run(),null,2));
```

## 7. Verdict and next experiment

**Verdict:** `MODEL-LOGIC FIXTURES VERIFIED / ENGINE IMPLEMENTATION NOT VERIFIED / REALITY PREDICTION UNVERIFIED`.

What we can say: the defined finite examples support delayed-benefit search, outcome-vs-action separation, observation-constrained policies, endogenous option creation, and explicit disagreement across world models.

What we cannot say: that this is an engine covering arbitrary futures, that assumed transition functions match real operations, or that AOM improves business outcomes.

**Next gated experiment:** Pick one **authorized, reversible real-world decision** with measurable outcome and a defined baseline. Declare the branch space and costs before prediction; run counterfactual simulation without pretending both branches happened; execute at most one approved real step; record the actual observation and update/contradict the model. Keep sensitive evidence outside this public repository.
