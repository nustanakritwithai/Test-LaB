---
title: "Independent Multiverse World Model v4.2 — Horizon-Aware Planning"
version: "4.2.0-candidate"
date: "2026-10-20"
project: "Multiverse World Model (independent)"
status: "SYNTHETIC_LOGIC_VERIFIED / HISTORICAL_REPLAY_TOY_EFFECTS_ONLY / NOT_PRODUCTION_VALIDATED"
prior_reference: "world-model/CONTINUOUS_MULTIVERSE_v4.md"
test_reference: "tests/horizon_aware_multiverse_v4_2.js"
experiment_reference: "experiments/2026-10-20-cycle-017-horizon-aware-results.md"
no_skill_merger: true
real_world_evidence_gate: "world-model/REAL_WORLD_EVIDENCE_GATE_v4_2_1.md"
production_mutation: false
---

# Horizon-Aware Multiverse World Model v4.2

> ทุกจุดคือจุดตัดสินใจ จุดสร้างจักรวาลใหม่ และจุดเรียนรู้ แต่การตัดสินใจต้องไม่ถูกจำกัดเพียงเพราะ horizon ของการคำนวณสั้นกว่าระยะคืนทุนของเส้นทางนั้น

**Independent-development rule:** v4.2 is research under the standalone Multiverse project only. It is **not** an AOM layer or a combined Skill. See [Independent Development Policy](../INDEPENDENT_DEVELOPMENT_POLICY.md). The original [v4.0.1](CONTINUOUS_MULTIVERSE_v4.md) remains untouched by this candidate.

**Real-world integrity addendum — 2026-10-20:** For analyses involving live/public social, political, economic or other real-world events, **apply [Multiverse v4.2.1 Real-World Evidence Gate](REAL_WORLD_EVIDENCE_GATE_v4_2_1.md) BEFORE constructing the observed S0 or any hypothetical future branch.** Validate original source attribution, publication/event cutoff, scope and denominator, planned-versus-realized outcomes, reporting independence, open-world UNKNOWN states, and the permitted analysis mode. When probabilities and causal transitions are unvalidated, use QUALITATIVE_SCENARIOS only and prohibit numeric policy certificates. The v4.2 toy Beta-Bernoulli state and sound terminal bounds must not be transferred to unrelated real-world settings. The separate v4.2.1 gate has 71 offline structural and logic tests; it is **not** evidence of real political forecast accuracy and it does not independently access or verify source webpages.



## 1. Problem actually observed

[Cycle 016](../experiments/2026-10-20-cycle-016-option-unlock-results.md) tested a declared hypothetical INSTALL action that unlocks future MONITOR/DISABLE decisions. With an expensive setup fee, the four-step planner rejected INSTALL even though the longer 26-step modeled policy could be cheaper.

**Failure mode: HORIZON_TRUNCATION, not a failure to enumerate the declared four-step branches.** Extending horizon naively would multiply branch copies and potentially exceed available time/resources.

## 2. Every-point state contract

~~~yaml
point:
  mode: OBSERVED_REALITY | OBSERVED_HISTORICAL_REPLAY | OBSERVED_FIXTURE | SIMULATED_BRANCH
  model_version: "4.2.0-candidate"
  point_id: S_t
  evidence_ids: []
  information_cutoff: null
  alpha: null                 # toy Beta success observations only
  beta: null
  unlocked_options: []
  enabled: false
  remaining_to_real_deadline: null
  belief_evidence: ASSUMED_MODEL
  feasible_actions_now: []
  forecast_before_action: {}
  action_chosen: null
  execution_state: NOT_EXECUTED
  outcome_observed: UNKNOWN
  shared_work_ledger: {}
  unexplored_paths: []
  next_root_status: WAIT_FOR_OBSERVATION
~~~

Every nonterminal point follows the same sequence:

1. Assess the state known at this point and compare with previous forecast.
2. Update only on **one legitimate new observation**. Virtual branches update their **own hypothetical beliefs**, never the observed root.
3. Generate every declared locally feasible action, including initially losing actions which unlock future options.
4. Forecast the action-conditioned next state and possible observations.
5. Evaluate full contingent decision policies, including later unlocked actions.
6. Certify a first action only under justified bounds; otherwise abstain.
7. On a new observed point, re-root a new planning invocation with updated belief and **reduced time until the actual deadline**.

**Never** reset 26 future weeks at every calendar point in a fixed 26-week task; that would manufacture extra time.

## 3. Horizon selection — heuristic versus proof

Let T be the number of steps genuinely remaining until the declared deadline.

- First checkpoint H0 = min(4,T).
- If INSTALL is feasible and the current posterior suggests positive per-step savings, compute an **estimated payback horizon** from setup fee / estimated periodic savings. Use it only to decide where to inspect more deeply; it is NOT a measured ROI and NOT a certification.
- Add H=T as the final checkpoint if the result cannot yet be certified.
- All checkpoints **share one work budget for this point**; neither longer horizons nor child branches may silently receive a reset.
- Once a first action is certified using model-grounded bounds, stop expanding even if some later possibilities remain hypothetical.
- If the global limit is reached without a sound certificate, return BUDGET_EXHAUSTED + ABSTAIN_UNCERTIFIED and expose the shorter provisional policy as informational only.

**Exception:** If the model has no sound finite cost bounds, cannot state the outcome likelihoods, or lacks essential causal transitions, no mathematical certificate is available. Return UNKNOWN/ABSTAIN, or undertake a separately authorized data-gathering test instead of guessing.

## 4. Exact continuation with memoization (under sufficient state)

The reference artificial world uses:

- Binary outcome y in {0,1}, posterior predictive probability p=alpha/(alpha+beta).
- Once y is observed in a given branch, update Beta(alpha+y,beta+1-y).
- Disabled: WAIT costs 3*y, PREPARE costs 1.2, INSTALL costs F+0.2+0.3*y and unlocks monitoring.
- Enabled: MONITOR costs 0.2+0.3*y, DISABLE costs 3*y and removes monitoring.

At a finite remaining horizon r, minimize expected cumulative hypothetical cost:

~~~text
V(s,0) = 0
V(s,r) = MIN over feasible actions a [
            SUM over possible y P(y|s) * (cost(s,a,y) + V(next(s,a,y),r-1))
         ]
~~~

Memo key = (alpha,beta,enabled,r) **only in this declared toy**. Under its assumed stationary Beta-Bernoulli mechanism, these are sufficient statistics for future value. Multiple paths arriving at an identical sufficient state reuse a value computation, while all feasible actions/outcomes remain represented in the recurrence.

**Critical limitation:** If a more realistic world has path-dependent constraints, learning rates, identities, commitments, hidden-regime shifts or delayed effects, those must enter the sufficient state. Do not merge states merely because their simplified keys match.

## 5. Sound terminal intervals for a short checkpoint

For a completed partial lookahead h, let full declared remaining task length be T >= h.

In this toy all subsequent losses are nonnegative. Therefore a root action's optimized h-step expected loss L(a,h) is a **lower bound** for its optimal T-step cost.

An **upper bound** is obtained from a feasible explicit continuation policy after following that h-step contingent policy:

- If monitoring is enabled at the cutoff: keep MONITOR each remaining week, expected per-week loss 0.2+0.3*p_cutoff.
- If monitoring is disabled: always WAIT or always PREPARE, whichever has smaller expected cost under the cutoff's posterior predictive rate; expected per-week loss min(3*p_cutoff,1.2).
- Under the stationary Beta-Bernoulli toy, the posterior predictive rate is a martingale in expectation. Multiplying the above safe per-week rate by T-h is a valid **model-internal expected tail-policy bound**.

~~~text
Lower(a) = optimized_expected_loss_over_first_h_steps_for_action_a
Upper(a) = Lower(a) + E_along_h_step_policy[
                         (T-h) * feasible_safe_tail_rate(leaf_state)
                     ]

CERTIFY(a) only if Upper(a) < Lower(b) for every other feasible b.
If h=T, all terminal tails are zero and finite DP supplies exact model action values.
Otherwise, if intervals overlap, DO NOT CLAIM a winner.
~~~

This proof applies **only when** the declared stationary outcomes, action feasibility, posterior update, nonnegative costs and tail-policy assumptions are satisfied. A winning certificate **does not prove any real-world benefit** or the correctness of the causal model itself.

## 6. Global Work Budget and evidence firewall

- Per-root global work ledger: 1 unit per unique expanded decision state + 1 unit per evaluated nature-transition edge.
- Cached identical sufficient states do not consume another expansion charge; cache hits are recorded separately.
- At a checkpoint, an expansion is **atomic**. If full local cost exceeds the remaining budget, stop, mark BUDGET_EXHAUSTED and abstain.
- Child branches share the parent's planning ledger. Fresh observed points may start a new separately authorized ledger, but virtual children cannot.
- The ledger counts a synthetic search-work proxy. **Token usage, real money, latency, memory, service calls and electricity are different measurements.**
- No observed historical outcomes may enter the planner before the corresponding actual-point decision is fixed. Simulated successors always carry SIMULATED_BRANCH provenance.
- Unknown events give MODEL_MISS, not invented belief updates. Missing observed evidence gives WAIT_FOR_OBSERVATION.

## 7. Reference behavior and tests

[Standalone JavaScript v4.2 engine](../tests/horizon_aware_multiverse_v4_2.js) executes on the declared toy without installing dependencies or accessing any live service.

**Verified synthetic behavior:**
- 121/121 logic fixtures PASS, including 48 direct comparisons against a separately implemented brute-force, nonmemoized action/outcome oracle and 17 action-specific interval validity checks.
- High observed-event prior (Beta(25,3)), setup fee 8, deadline 26: fixed H4 selects PREPARE; v4.2 extends checkpoints H=4,12,26 and selects INSTALL; one root costs 5,253 modeled work units within its 12,000 limit.
- Low prior Beta(2,26) + fee 8: WAIT; excessive fee 250 + high prior: PREPARE; extremely rare prior + high fee obtains an **early safe certificate** at H4.
- Missing budget yields BUDGET_EXHAUSTED/ABSTAIN; no hidden action is executed.
- Re-root with a synthetic observation at S2 updates exactly one belief and decreases real remaining weeks to 25.

**Historical-data toy-effects replay:** [Cycle 017 report](../experiments/2026-10-20-cycle-017-horizon-aware-results.md) reuses existing public Ruff/Flask GitHub release dates from Cycle 016 for a descriptive regression comparison. Historical event dates are factual, but monitoring availability, setup fees and loss values are **fictional** and already known from the prior experiment. The replay is not new independent evidence of predictive accuracy.

## 8. Adoption boundary and next research gate

**Decision:** Keep this as independent v4.2 candidate/fixture-proven research. Do not merge the v4.2 rules into another Skill, AOM or production planning service. The older v4.0.1 file remains as a reproducible reference.

Next validations needed before general adoption:
1. Nonstationary success regimes, time-dependent transition costs, unequal branching factors and histories where the simple Beta sufficient state is invalid.
2. Real-world calibration of causal transitions from an action-conditioned source with provenance, not only public events with hypothetical intervention effects.
3. Actual runtime/token/memory profiling under controlled comparable budgets; test if added horizon costs are justified by improved decisions.
4. Conservative behavior when reliable terminal-tail bounds are missing: UNKNOWN / ABSTAIN must be acceptable.

**STATUS:** FINITE SYNTHETIC PLANNING LOGIC VERIFIED; REAL PREDICTIVE / CAUSAL PERFORMANCE UNVERIFIED; SEPARATE DEVELOPMENT ONLY.
