# Multiverse Cycle 017 — Horizon-Aware v4.2 (Independent Research)

**Date:** 2026-10-20 (Asia/Bangkok)
**Status:** SYNTHETIC PLANNING LOGIC PASS (121/121) / RETROSPECTIVE REPLAY COMPLETE / REAL CAUSAL BENEFIT UNVERIFIED
**Project ownership:** Independent Multiverse World Model — **NOT integrated with AOM or any Skill**.
**Frozen test plan:** [Cycle 017 preregistration](2026-10-20-cycle-017-horizon-aware-preregistration.md), commit 7cf9b2461f1b380b87590606f1c504e8a21ac0b1.
**Operating Markdown candidate:** [Horizon-Aware v4.2](../world-model/HORIZON_AWARE_MULTIVERSE_v4_2.md).
**Executable toy model/tests:** [horizon_aware_multiverse_v4_2.js](../tests/horizon_aware_multiverse_v4_2.js), commit b62e3c8bee429cea472ffbf62ef68b8d1a30e426.
**Local reproduction runner:** [run_cycle_017.js](../tests/run_cycle_017.js); Node.js 18+ standard library only.
**Data:** Existing [Ruff](../data/cycle016_ruff_holdout_manifest.json) and [Flask](../data/cycle016_flask_holdout_manifest.json) public GitHub release timestamp archives.
**Writes outside Test-LaB:** NONE. The original Multiverse v4.0.1, AOM and all production services remain unchanged.

## 1. The actual improvement attempted

Cycle 016 revealed that the toy four-step planner sometimes refused an INSTALL action whose upfront cost could pay off only after more than four weekly steps.

**v4.2 explicitly distinguishes:**

- A *payback horizon hint* — a proposal for when to extend search, never a proof;
- A *short-horizon partial policy* — diagnostic only when its terminal-value intervals overlap;
- A *sound terminal interval certificate* — conditional on nonnegative cost, feasible tail policy and the stationary Beta-Bernoulli assumptions;
- An *exact finite full-deadline dynamic program* — complete relative to this **declared** action/outcome model, not the external world;
- A *shared global budget* across checkpoint calculations, all branch outcomes and memoized states for one observed root.

The planner can work to a real fixed deadline of 26 remaining weeks and reroot at S2 with 25 remaining, rather than repeatedly pretending that 26 new weeks are available.

## 2. Frozen declared toy assumptions

Public release observations are REAL historical GitHub data, but ALL costs and effects of WAIT / PREPARE / INSTALL / MONITOR / DISABLE are declared counterfactual assumptions. No actual monitoring service was installed; no real economic payoffs measured.

- Each week y=1 means one or more eligible stable public releases; y=0 means none.
- Modeled hidden event probability uses Beta(alpha,beta) under stationarity: p=alpha/(alpha+beta).
- At every virtual branch, each y updates its own alpha/beta; real replay evidence is appended only after action selection.
- Disabled actions: WAIT cost 3y, PREPARE cost 1.2, INSTALL cost F+0.2+0.3y and unlocks monitoring.
- Enabled actions: MONITOR cost 0.2+0.3y, DISABLE cost 3y.
- Root setup fee F is fixed at 2 or 8 for the historical replay. Each step is loss-minimizing. Scores are **synthetic units**, never real currency.
- 26 public train weeks and 26 already-known historical evaluation weeks, following Cycle 016.

## 3. Internal synthetic test results

**121/121 deterministic assertions passed** in the available JavaScript/V8 evaluation runtime, including:

- 48 comparisons between dynamic programming with memoized sufficient states and a **separately implemented, nonmemoized, exhaustive tiny-horizon oracle** covering distinct priors, fees and mode states;
- 17 checks that each short-horizon action's stated lower/upper expected-loss interval contains the corresponding exact full-deadline cost;
- Regression checks for action feasibility, loss functions, Beta posterior updates and terminal/horizon behavior;
- Positive-delayed-payoff, low-event, extreme-setup-cost and bounded-budget counterexamples;
- Branch-local hypothetical evidence not mutating observed root;
- Global work-unit reconciliation (expanded unique states + generated outcome edges);
- Zero/low-budget **BUDGET_EXHAUSTED + ABSTAIN**, not a fabricated best action;
- Early root certificate using valid model bounds for a very-low-event case, without forcing a full 26-step tree.

### Exact key counterexample

Synthetic starting belief: Beta(25,3), fee F=8, remaining 26 weeks.

| Approach | Root action | Horizon | Modeled work units at root | Decision proof |
|---|---|---:|---:|---|
| Fixed H=4 | PREPARE | 4 | Short horizon only | Not certified for 26-week task |
| Horizon-aware v4.2 | INSTALL | 26 | **5,253** | Certified within the declared toy model |

The horizon-aware approach tested checkpoints at **H=4, H=12 and H=26**, with **ONE global ledger for the entire point** (limit 12,000). Neither H4 nor H12 may pretend that unfinished continuation cost is zero and still claim a full-task optimum. At H26, memoized DP computed the exact toy decision.

Additional synthetic cases: Beta(2,26) with F=8 selects WAIT; extremely expensive setup (F=250) selects PREPARE; Beta(1,99) with F=100 can certify WAIT already at H4 under admissible tail bounds. This makes the policy dependent on conditions, not simply “always install”.

## 4. Retrospective regression with REAL public release dates

**This is NOT a new blind holdout**: the same Ruff/Flask event manifests were read and discussed in Cycle 016 before v4.2 was developed. Treat results as a reproducible regression test for correcting the previously identified *toy planning* failure, not external validation.

The policies in this table are **two independent Multiverse variants**, not AOM vs Multiverse: fixed H=4 and horizon-aware v4.2. Both receive the same observed weekly public data and the same synthetic payoff rules. Lower loss is better.

| Public event source | Assumed setup fee | Fixed-H4 synthetic loss | v4.2 synthetic loss | v4.2 minus H4 |
|---|---:|---:|---:|---:|
| astral-sh/ruff | 2 | 13.8 | 13.8 | 0 |
| **astral-sh/ruff** | **8** | **31.2** | **19.8** | **−11.4** |
| pallets/flask | 2 | 3.0 | 3.0 | 0 |
| pallets/flask | 8 | 3.0 | 3.0 | 0 |

Public weeks in the reused archive: Ruff had 24/26 training weeks with releases and 22/26 replay weeks; Flask had 1/26 and 1/26. Both methods made their weekly actions before the current week's historical y was read by the scoring logic.

- Ruff F=2: both install at S1, then MONITOR for the next 25 points.
- Ruff F=8: fixed H4 always PREPARE (26 weeks), v4.2 INSTALLS at S1 and MONITORs afterward. This **fixes the known synthetic horizon failure**.
- Flask (both fees): both choose WAIT each of the 26 points, so no speculative setup is purchased.
- All 104 horizon-aware point evaluations (2 public repos × 2 fee assumptions × 26 weekly points) completed with a model certificate and a fresh deadline-aware root each week.

The comparison **does not show** a real installed monitoring service reduces costs, and the hypothetical action choices cannot causally alter the published release events.

## 5. Cost transparency and tradeoff

The exact same proxy charges 1 modeled unit per **unique memoized decision state** plus 1 per evaluated hypothetical transition edge, within each planning invocation.

| Source/fee | Fixed-H4 total modeled work | v4.2 total modeled work | Root replans |
|---|---:|---:|---:|
| Ruff / 2 | 2,700 | 37,548 | 26 |
| Ruff / 8 | 2,750 | 37,394 | 26 |
| Flask / 2 | 2,750 | 40,532 | 26 |
| Flask / 8 | 2,750 | 40,532 | 26 |
| **All 4 cells** | **10,950** | **156,006** | **104** |

**The new approach spends far more modeled work units than fixed H4.** Its value is detecting a long-horizon option in one well-defined fixture, NOT reducing cost across the board. Memoization allows full 26-week Bayesian planning with manageable unique sufficient states; it does not mean every user situation merits doing so.

Work units are **NOT** wall-clock runtime, token spending, CPU consumption, memory usage, API calls or THB. The reference evaluation was executed in a JavaScript/V8 tool. The Node-compatible offline runner is supplied, but a separate real Node CLI run was NOT independently claimed here.

## 6. Verification, regressions and model boundaries

- The committed v4.2 JS file was fetched again from GitHub, re-evaluated and returned **121 checks PASS**.
- Reused historical manifests were fetched from GitHub, not refetched from source projects or modified.
- Recomputed fixed H4 totals agree numerically with Cycle 016 for all four scenarios (13.8/31.2/3/3).
- All 104 re-rooted v4.2 evaluations returned exact or sound-bound certificates within their 12,000 model-work-unit limit.
- Toy state is deliberately narrow; alpha/beta/enabled/deadline are sufficient only under the declared assumptions. Memoizing those fields in an environment with path-dependent memory, resource depletion, nonstationary regimes, differing identities or delayed obligations would be UNSOUND.
- Tail certificates rely on stationary Beta-Bernoulli expected outcomes, explicit feasible actions, nonnegative losses and actual horizon limit. Those are NOT guaranteed in real social/economic systems.
- This cycle did not train AI weights or demonstrate improved real predictive calibration, real causal payoffs, business ROI, or user-facing Skill performance.

## 7. Disposition

**ACCEPT AS AN INDEPENDENT LAB CANDIDATE** for model-internal horizon-aware testing, keeping canonical v4.0.1 unchanged until adversarial generality checks and real-causal model validation.

**NEXT INDEPENDENT EXPERIMENT:** Test nonstationary/out-of-model events and delayed or path-dependent causal effects that invalidate Beta stationarity. Add explicit MODEL_MISS/UNKNOWN on unsupported terminal values rather than forcing confidence, and measure actual execution cost under matched evaluation conditions.

**NO AOM / SKILL MERGE. NO PRODUCTION WRITE.**
