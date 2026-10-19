# AOM Test-LaB — Cycle 011 / Manual Test 05

**Date:** 2026-10-19 (Asia/Bangkok)  
**Objective:** Can AOM learn from its **own observed investment outcomes**, stop allocating resources to unpromising opportunities, and rediscover opportunities after a regime shift?
**Protocol frozen before generation:** [Cycle 011 pre-registration](2026-10-19-cycle-011-manual-test-05-preregistration.md), create-file commit `fba9e2cf6426db363ac36fae3cefda4877474591`. The seed was not available until GitHub accepted the pre-registration. The pre-registration itself was not modified.
**Outcome:** `SIMULATED ONLINE-LEARNING TEST PASS / INDEPENDENT REPLAY PASS / REAL-WORLD UPLIFT UNVERIFIED`

## 1. Why this experiment and which tools?

| Feasible path | Evaluation | Decision |
|---|---|---|
| More static policy comparisons | Do not test whether the system learns from feedback | DROP |
| Build a training agent, simulator application, plugin or evaluation framework | Additional engineering; existing model runtime and GitHub suffice | DROP |
| Run a **pre-registered online sequential simulation** with feedback available **only after actually choosing INVEST** | Direct test of learning, exploration, option recovery and mistakes under drift | **DO** |
| Change a live business or ad campaign | Might create measurable downstream value, but lacks authorized experimental controls in this Test-LaB round | DEFER |

**Skills/methods selected:** Bayesian-smoothed empirical feedback, observation gating, sliding-window adaptation, exploration-exploitation, paired evaluation, destination readback.

**Tools used:** Native AI + ephemeral JavaScript computations, independent Python replication, existing GitHub connector. No new Skill/plugin/app, no new scheduler and no external business action.

## 2. Frozen synthetic world

- 3 environments × 320 opportunities each = **960 independent hidden outcomes**.
- All policies start with the **same visible optimistic forecast** `p=0.8`, not the hidden true probability.
- `QUICK` pays **16**, `INVEST` pays **26** on success or **12** on failure. Investment is beneficial in expectation only if estimated success probability is **greater than 2/7 ≈ 28.57%**.
- STABLE_HIGH: true p=0.70 throughout; STABLE_LOW: true p=0.10 throughout; SHIFT_HIGH_LOW_HIGH: p=0.70 for t=1..100, p=0.10 for t=101..220, p=0.70 for t=221..320.
- Hidden success/failure outcomes were drawn **after** the policies chose their actions. The evaluator uses common draws to grade counterfactual rewards, but unchosen INVEST outcomes **do not** enter an adaptive policy's learning history.
- Adaptive policies have a frozen Beta smoothing prior `alpha=4,beta=1`, retain the most recent **20 own observed INVEST outcomes**, and invest when `(4+observed_successes)/(5+observed_investments)>2/7`.
- `ADAPTIVE_PROBE_8` also invests every eighth opportunity **if it would otherwise choose QUICK**; the sampled investment pays the same real synthetic profit or loss as any other investment. No free information is supplied.
- Hidden-regime oracle may use true p for *diagnostic* decisions; it is not a deployable competitor.

**Deterministic seed:** first 8 hex chars of the preregistration commit SHA `fba9e2cf` = unsigned decimal **4222214863**. xorshift32 `x ^= x << 13; x ^= x >>> 17; x ^= x << 5`; observation `u=(x>>>0)/4294967296`. Stream order was frozen: STABLE_HIGH, STABLE_LOW, SHIFT_HIGH_LOW_HIGH; within each stream, t=1..320. Final 32-bit PRNG state **1829974429**. Each stream initializes policy history independently.

## 3. Outcome — 960 decisions per policy, four policies

| Policy | Total synthetic reward | Difference from STATIC | Difference from GREEDY | Actual INVEST decisions | Forced probe-only INVEST |
|---|---:|---:|---:|---:|---:|
| GREEDY always QUICK | 15,360 | −1,606 | 0 | 0 | 0 |
| STATIC_OPTIMISTIC always INVEST | 16,966 | 0 | +1,606 | 960 | 0 |
| ADAPTIVE_NO_PROBE | 17,504 | +538 | +2,144 | 458 | 0 |
| **ADAPTIVE_PROBE_8** | **17,776** | **+810** | **+2,416** | **586** | **55** |
| ORACLE_TRUE_P (**not available to agent**) | 18,222 | +1,256 | +2,862 | 520 | 0 |

**Caveat:** The equal-weighted three-stream total above reflects experiment design, not an estimated real-world distribution of market conditions. The probe-enabled policy is not universally optimal. It trails the infeasible true-p oracle by 446 units in the toy environment.

### Detailed totals by environment

| Environment | GREEDY | STATIC | ADAPTIVE_NO_PROBE | ADAPTIVE_PROBE_8 | Diagnostic oracle |
|---|---:|---:|---:|---:|---:|
| STABLE_HIGH, p=.70 | 5,120 | 6,836 | 6,836 | 6,836 | 6,836 |
| STABLE_LOW, p=.10 | **5,120** | 4,218 | 5,082 | 4,944 | **5,120** |
| SHIFT_HIGH_LOW_HIGH | 5,120 | 5,912 | 5,586 | **5,996** | 6,266 |

**Findings:**
- When investment stays valuable, all three investing/learning policies do well (6,836).
- When investment stays poor, feedback lets both adaptive policies avoid much of STATIC's continued downside. However, **forced exploration costs**: ADAPTIVE_PROBE_8 earns 4,944 rather than the GREEDY benchmark's 5,120; ADAPTIVE_NO_PROBE earns 5,082.
- In the changing environment, ADAPTIVE_NO_PROBE stops learning after switching to QUICK, and never resumes normal investment when the opportunity improves; its total of 5,586 falls below STATIC's 5,912. ADAPTIVE_PROBE_8 resumes investing and reaches 5,996, exceeding STATIC by **84** and ADAPTIVE_NO_PROBE by **410** under this specific seed/environment.

### SHIFT environment by phase

| Phase (hidden from policies) | GREEDY | STATIC | ADAPTIVE_NO_PROBE | ADAPTIVE_PROBE_8 | Oracle |
|---|---:|---:|---:|---:|---:|
| t=1..100, HIGH | 1,600 | 2,124 | 2,124 | 2,124 | 2,124 |
| t=101..220, LOW | 1,920 | 1,566 | 1,862 | 1,810 | 1,920 |
| t=221..320, HIGH again | 1,600 | 2,222 | 1,600 | 2,062 | 2,222 |

**Observed changes in state:** Both adaptive policies first dropped below investment threshold at **t=119** during the LOW phase. ADAPTIVE_NO_PROBE then had no additional INVEST outcomes and its estimated p stayed at **0.28**, below the 2/7 cutoff; it remained stuck even after HIGH returned. ADAPTIVE_PROBE_8 paid for experiments in the meantime and resumed ordinary (non-forced) investment at **t=241**, 20 opportunities after the HIGH regime returned. This is observed behavior in the declared toy environment, not real-market timing evidence.

## 4. What the test actually demonstrates

- **Observed feedback matters:** The adaptive policies updated only after INVEST, then reduced exposure when observed returns implied low success probabilities.
- **Absence of new feedback is not evidence of continued failure:** A non-investing policy cannot learn whether its previously rejected opportunity has recovered, unless it has some independent valid information source or undertakes new tests.
- **Exploration has an opportunity cost:** In STABLE_LOW, the probes harmed outcomes versus the safe GREEDY policy. They are justified only when potential learning value exceeds this cost.
- **Replanning works after new evidence:** ADAPTIVE_PROBE_8 changed its action again after observing renewed successes. AOM should not treat a previous `DROP/WATCH` as permanently true.
- **Uncertainty remains:** Different seeds, priors, window lengths and probe schedules could change rankings. 8-step probing is an **arbitrary preregistered cadence**, not a proven optimal acquisition policy.
- **No data leakage:** The decision functions use time index plus their own stored, actually observed investment results. The hidden true regime and latent draws were evaluator-only and never updated QUICK outcomes into adaptive policies.

## 5. Verification (after results, before GitHub publication)

Checks executed on deterministic JavaScript run and independently replicated with a separate Python implementation, starting from the exact committed seed. Both implementations returned:
- STABLE_HIGH (GREEDY/STATIC/NO_PROBE/PROBE): **5120 / 6836 / 6836 / 6836**
- STABLE_LOW: **5120 / 4218 / 5082 / 4944**
- SHIFT_HIGH_LOW_HIGH: **5120 / 5912 / 5586 / 5996**
- Final PRNG state: **1829974429**.

The JavaScript run passed **11/11 defined internal invariants**, including 960 latent draws, 320 decisions/policy/stream, zero observations from unchosen QUICK paths, capped 20-observation windows, correct probe cadence and oracle decisions.

### Minimal reproduction (Node.js or JavaScript execution, no dependencies)

```javascript
let x = parseInt("fba9e2cf",16) >>> 0;
if (!x) x=2463534242;
const draw=()=>{ x ^= x<<13; x ^= x>>>17; x ^= x<<5; return (x>>>0)/4294967296; };
const names=["GREEDY","STATIC_OPTIMISTIC","ADAPTIVE_NO_PROBE","ADAPTIVE_PROBE_8"];
for (const regime of ["STABLE_HIGH","STABLE_LOW","SHIFT_HIGH_LOW_HIGH"]) {
  const history={"ADAPTIVE_NO_PROBE":[],"ADAPTIVE_PROBE_8":[]};
  const sums=Object.fromEntries(names.map(n=>[n,0]));
  for(let t=1;t<=320;t++) {
    const pTrue=regime==="STABLE_HIGH" ? .70 :
      regime==="STABLE_LOW" ? .10 :
      (t<=100 || t>220) ? .70 : .10; // evaluator only
    const actions={GREEDY:false,STATIC_OPTIMISTIC:true};
    for(const name of ["ADAPTIVE_NO_PROBE","ADAPTIVE_PROBE_8"]) {
      const h=history[name], n=h.length, successes=h.filter(Boolean).length;
      const mean=(4+successes)/(5+n);
      actions[name]=(mean>2/7) ||
         (name==="ADAPTIVE_PROBE_8" && t%8===0);
    }
    // Decisions fixed; now reveal one common latent success/failure.
    const success=draw()<pTrue;
    for(const name of names){
      const invests=actions[name];
      sums[name]+=invests ? (success?26:12) : 16;
      if(history[name] && invests) {
        history[name].push(success);
        if(history[name].length>20)history[name].shift();
      }
      // No outcome supplied for QUICK. There is no history for STATIC/GREEDY.
    }
  }
  console.log(regime,sums);
}
console.log("final_rng_state",x>>>0);
```

## 6. Claims and limits

| Claim | Verdict |
|---|---|
| AOM can update an empirical estimate from its own observed synthetic outcomes | **VERIFIED — in simulator** |
| Non-probing adaptive policy can become stuck after a regime shift | **VERIFIED — in SHIFT fixture** |
| Periodic probing can rediscover a recovered opportunity | **VERIFIED — in SHIFT fixture** |
| Probes always increase expected or realized value | **FALSE — STABLE_LOW counterexample** |
| AOM improves actual business allocation, revenue, or human attention | **UNKNOWN / UNVERIFIED** |
| Test uses fresh current market data or is validated against real-world conversion probabilities | **NO** |
| Actual relative token cost, money, wall-clock time saved | **UNKNOWN — not instrumented** |

### Next decision for AOM

Do not add a new framework. Test whether **evidence acquisition should be conditional on expected value of information** rather than a rigid every-8th policy, while avoiding observation bias and ensuring safeguards. Pre-register a signal cost, quality, stopping conditions and held-out evaluation before opening outcomes; compare doing nothing, direct investment, scheduled probes and a targeted low-cost information request using the same budget.

**Disposition:** `ADOPT FINDING: OBSERVABILITY + EXPLORATION REQUIRED TO RECOVER; PROBES HAVE REAL COST`. Synthetic-only evidence.

## 7. GitHub publication and independent readback — VERIFIED

After the results file was created, a separate GitHub API read confirmed:

- Pre-registration file remained accessible at `experiments/2026-10-19-cycle-011-manual-test-05-preregistration.md` (blob SHA `992e5d3c23ac696a75e9080da3fabba7656cbde4`). Its create-file commit was `fba9e2cf6426db363ac36fae3cefda4877474591`.
- Results file was fetched by exact path; its initial blob SHA was `f42a14af5a2db2b6124def5d7ca9ebb82701b11d`.
- GitHub's native experiment archive listed both the preregistration and results files.
- The saved text contained preregistration SHA, shifting-regime figures, the STABLE_LOW counterexample, 11/11 checks, and the separate Python replay statement.
- The final update of this section is editorial only; it does **not** change any frozen test assumption or computed result.

**Disposition:** `ADOPT SYNTHETIC LEARNING RESULT; REAL-WORLD VALUE UNVERIFIED`. No automation was enabled and no external business system changed.
