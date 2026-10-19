# AOM Test-LaB — Manual Test 04 / Cycle 010 — PRE-REGISTRATION

**Date:** 2026-10-19 (Asia/Bangkok)
**Objective:** Test whether a non-myopic AOM policy can outperform a greedy immediate-reward baseline *over several stages*, without looking at future random outcomes. Explicitly test a regime where the forecasts are misleading.
**Status at creation:** `REGISTERED BEFORE RANDOM OUTCOMES`. The GitHub commit SHA produced by writing **this document** is the immutable pseudo-random seed source.
**Scope:** Fully synthetic controlled environment. This is a test of *decision logic*, not a real business or financial result. No Hybrid Mind mutation, public user data, or new app/plugin.

## Opportunity/tool choice before experiment
- **Baseline:** Re-run static illustrative examples (faster, weak evidence).
- **Selected:** Pre-register policy then generate 1,800 delayed-outcome episodes from the just-created GitHub commit SHA and compare under shared outcomes (better falsifiability).
- **Deferred:** Field experiment with customers or website (would need a real intervention and attribution).
- **Tools:** Native AI reasoning, transient Javascript arithmetic for a controlled experiment, existing GitHub connector to precommit and store results. No agent framework or application.

## Environment known before deciding

There are `H` discrete stages. Two initial choices:
- **QUICK:** receive synthetic reward `+2` now and each later stage; total `2H`.
- **INVEST:** pay `-2` at stage 1, then a hidden Bernoulli success is revealed. If success, receive synthetic `+4` per remaining stage. If failure, the system switches to QUICK for the remaining stages (`+2` each). No re-investment.
- The stage-1 investment payoff is immediately worse than QUICK (`-2` versus `+2`), but it may unlock better future rewards.
- Forecast `p_forecast` and time horizon `H` are visible *before* choice; hidden success/failure is **not**.
- A simulated outcome is drawn **after** both decisions are fixed. Same outcome is used for counterfactual policy comparison; it is never used by the decision logic.

## Policies (frozen before outcome generation)
- **GREEDY:** always QUICK, based on initial immediate reward.
- **AOM-NON-MYOPIC:** INVEST iff `-4 + 2 * p_forecast * (H - 1) > 0`, else QUICK. This follows the predeclared expected horizon-payoff model.
- Reward if `INVEST & SUCCESS`: `-2+4*(H-1)`.
- Reward if `INVEST & FAILURE`: `-2+2*(H-1)`.
- Reward if `QUICK`: `2*H`.
- **No hindsight-oracle policy may influence either choice.** True probability is used only by environment generator and results analysis.

## Scenarios and hidden outcomes

Fixed nested iteration order:
1. Regime `CALIBRATED` followed by `OVERSTATED`.
2. Horizon `H = 2, 5, 8`.
3. Visible forecast `p_forecast = 0.25, 0.60, 0.80`.
4. Exactly **100 independent episodes** per combination.

This yields `2*3*3*100 = 1,800` paired policy comparisons, including cases where long-range investment is not worthwhile.

- `CALIBRATED`: environment probability `p_true = p_forecast`.
- `OVERSTATED`: `p_true = max(0.05, p_forecast - 0.50)`.
- In both regimes only the forecast is visible to the policy; regime identity and true probability are hidden until score computation.

**Seed procedure:** Take the first 8 hex characters of this *preregistration file's create_file Git commit SHA*, convert to unsigned 32-bit integer. If zero, use `2463534242`. Generate one random fraction per episode with the exact `xorshift32` recurrence `x ^= x << 13; x ^= x >>> 17; x ^= x << 5;` (each bitwise operation coerces 32-bit) and `u = (x >>> 0) / 4294967296`. An episode succeeds exactly when `u < p_true`. Never inspect SHA or generate episodes before this document is committed.

## Predefined metrics / success and failure

- Primary: mean synthetic reward improvement per episode, `mean(AOM - GREEDY)`, reported **separately by regime**, plus overall.
- Secondary: counts of investment decisions, successful investments, losing investments, mean per horizon and forecast cell.
- Logic acceptance: choices use only `H` and `p_forecast` and are made before draws; all 1,800 paired episodes scored; greedy total `2H` for each; false investing for `H=2` never occurs.
- Hypothesis H1: mean uplift > 0 in CALIBRATED; H2: mean uplift < 0 in OVERSTATED (explicit evidence of failure under miscalibration). If either fails, report it honestly.
- No claimed generalization to future unknown environments. This simulator has known action transitions, so results prove only outcomes **under these declared rules**.
- Exact wall time, tokens, real dollars and human attention are **not instrumented** and must be reported UNKNOWN.

## After the test

Create a separate results Markdown `experiments/2026-10-19-cycle-010-manual-test-04.md`, include prereg link and commit SHA, the complete scenario results, honest limitations, and verification. Read the file back using GitHub connector. Do not modify the pre-registration once created.

**Pre-registration is not an outcome report.**
