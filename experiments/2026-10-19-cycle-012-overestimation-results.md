# AOM Test-LaB — Cycle 012: Overestimation Guardrails (Manual Test 06 / Targeted Improvement)

**Date:** 2026-10-19 (Asia/Bangkok)  
**Status:** `SYNTHETIC STRESS TEST VERIFIED / REAL-WORLD OUTCOME UNVERIFIED`  
**Pre-registered before new outcomes:** [Cycle 012 protocol](2026-10-19-cycle-012-overestimation-preregistration.md), GitHub create commit `8879f1c5f9b351669b7ac2be983b6a92be49ca83`.  
**Purpose:** Improve AI Opportunity Manager's decisions when success probabilities are *too optimistic*, without concealing the opportunity-cost trade-offs elsewhere.

## 1. Opportunity selection and tools

AOM chose to evaluate existing decision techniques — posterior updating, a conservative uncertainty adjustment, and an explicit cumulative downside limit — rather than creating another agent framework, Skill, Plugin, scheduler, dashboard, or database.

- **Skills:** online calibration; loss-limiting opportunity allocation; approximate Bayesian lower-bound reasoning; fair paired counterfactual evaluation; independent replay.
- **Tools:** Native AI reasoning + disposable built-in JavaScript calculations + independent Python replay + existing GitHub Connector.
- **Data:** Synthetic only. Never claim these results establish financial return, real business forecast accuracy or live AI-agent improvement.

## 2. Protocol frozen on GitHub before outcomes

- Ten successive replications; three regimes: CALIBRATED (true success p=forecast), OVERSTATED (true p=max(.05,forecast−.50)), UNDERSTATED (true p=min(.95,forecast+.50)).
- Horizons `H=2,5,8`; forecasts `p=.25,.60,.80`; 100 episodes per grid cell per replication.
- **27,000 paired environment draws**, **216,000 policy outcome evaluations**, **270 scenario cells**.
- In all eight policies: QUICK returns `2H`; invested success returns `-2+4(H-1)`; invested failure returns `-2+2(H-1)`. Outcome advantage is `2H-6` on success and `-4` on failure.
- Policies choose before the random draw and may update Bayesian beliefs only from investments **they themselves** made.
- Policies: `QUICK`, `STATIC`, `ONLINE` (posterior mean), `LOWER` (posterior mean minus `1.28×` posterior SD, clipped at 0), `BUDGET` (ONLINE plus permanent stop after own net regret ≤−8), `LOWER_BUDGET`, `PROBE10` (forced invest every tenth opportunity when otherwise QUICK and H≥5), `PROBE_BUDGET` (PROBE10 plus stop). LOWER is a **heuristic**, not a statistically guaranteed probability bound.
- Synthetic loss budget uses **observed payoff difference from deterministic QUICK**. QUICK's counterfactual value is known here; comparable real-world business counterfactuals are often *not* directly known.
- Seed: unsigned `0x8879f1c5 = 2289693125`, derived from the pre-registration commit. `xorshift32` final unsigned state: `3058683618`.
- Fixed iteration and decisions are specified in the preregistration. No rule, multiplier, threshold, cap or scenario was changed after viewing random outcomes.

## 3. Main results: all policy totals by regime

Each column covers 9,000 synthetic environment episodes. Rows are distinct policy simulations against shared random outcomes.

| Policy | CALIBRATED | OVERSTATED | UNDERSTATED |
|---|---:|---:|---:|
| QUICK (safe baseline) | 90,000 | 90,000 | 90,000 |
| STATIC (original forecast) | 104,838 | 82,864 | 116,168 |
| ONLINE (updated posterior mean) | 104,646 | 89,510 | 116,168 |
| LOWER (conservative posterior heuristic) | 103,024 | **90,090** | 112,504 |
| BUDGET (online + cumulative downside limit) | 103,256 | 89,954 | 116,168 |
| **LOWER_BUDGET** | 102,380 | **90,098** | 112,504 |
| PROBE10 (scheduled exploration) | 104,612 | 88,102 | **121,790** |
| PROBE_BUDGET | 103,258 | 89,792 | 121,428 |

**Measured comparisons under OVERSTATED:**

| Comparison | Synthetic total difference |
|---|---:|
| LOWER − ONLINE | **+580** |
| BUDGET − ONLINE | **+444** |
| LOWER_BUDGET − ONLINE | **+588** |
| PROBE_BUDGET − PROBE10 | **+1,690** |
| BUDGET − QUICK | **−46** |
| LOWER_BUDGET − QUICK | **+98** |

**Not a universal win:** Under CALIBRATED, `LOWER_BUDGET − ONLINE = −2,266`; under UNDERSTATED, `LOWER_BUDGET − ONLINE = −3,664`. Universal conservative gating can discard valuable projects.

## 4. Downside protection and the cost of prudence

| Regime | Policy | Investments | Stopped cells (out of 90) | Worst observed net cell regret vs QUICK |
|---|---|---:|---:|---:|
| OVERSTATED | ONLINE | 1,150 | n/a | **−60** |
| OVERSTATED | LOWER | 633 | n/a | −28 |
| OVERSTATED | BUDGET | 553 | 37 | **−10** |
| OVERSTATED | LOWER_BUDGET | 470 | 16 | **−10** |
| OVERSTATED | PROBE10 | 1,704 | n/a | −76 |
| OVERSTATED | PROBE_BUDGET | 604 | 57 | **−10** |
| CALIBRATED | BUDGET | 3,464 | 6 | −10 |
| UNDERSTATED | BUDGET | 4,000 | 0 | −4 |

All risk-budget policies remained above the preregistered **−12 cell-regret floor**. This is the outcome of a formally specified synthetic stop rule and bounded per-action downside, not a general guarantee for financial markets, investment drawdowns, or unknown heavy-tail risks.

### Ten-replication directional consistency under OVERSTATED

| Comparison | Replications with positive advantage | Negative |
|---|---:|---:|
| LOWER vs ONLINE | 9/10 | 1/10 |
| BUDGET vs ONLINE | 8/10 | 2/10 |
| LOWER_BUDGET vs ONLINE | 8/10 | 2/10 |
| PROBE_BUDGET vs PROBE10 | 10/10 | 0/10 |

Each replication is a successive PRNG segment, not an independently sourced real data sample. Do not interpret the fractions as population win probabilities or formal statistical confidence.

**Where caution harms:** Conservative LOWER avoids many investments in CALIBRATED and UNDERSTATED conditions, especially when an initially moderate `p=.60` fails the initial downside-adjusted threshold at `H=5`. The BUDGET-only intervention preserves more upside but doesn't fully dominate the safe QUICK baseline in OVERSTATED totals.

## 5. Verification

- Pre-registration GitHub file was written and the commit SHA obtained **before** the new pseudo-random outcomes were drawn.
- A self-contained JavaScript test evaluated 27,000 draws and 216,000 policy outcomes under frozen rules, including **382,465 executed invariant checks** (primarily per-decision invariants).
- An **independent Python replay** reimplemented the RNG, policies and counters; it reproduced every one of the 24 regime-by-policy reward totals, 27,000 draws, final RNG state `3058683618`, and worst per-cell risk results.
- Scenario labels and true probabilities were used only by the outcome generator and evaluator, not by policies choosing actions.
- Report file must be read back from GitHub after writing; never equate an issued file-write request with verified destination state.

## 6. What decision rule should AOM actually adopt next?

### Evidence-conditioned safety, not universal pessimism

1. **Keep learning from observed outcomes:** Retain posterior updating; investigate evidence of systematic overconfidence before using an optimistic forecast as investment justification.
2. **Explicit risk allowance:** For high-stakes opportunities, set an acceptable downside before acting. A stop condition should be based on observable budget/impact limits, not an invented baseline.
3. **Use conservative probabilities conditionally:** A lower estimate can protect against inflated forecasts, but always activating it wastes real opportunities in other regimes. Deploy when calibration evidence is poor, trust is low, or downside is difficult to reverse.
4. **Separate loss controls from discovery:** Exploration for potentially underestimated opportunities requires its own budget and value-of-information analysis; do not force probes on a fixed schedule regardless of expected value.
5. **Respect evidence boundaries:** In real businesses we may not see the exact unchosen-action payoff. Use genuinely observable costs and outcomes and never infer counterfactual ROI from the decision log alone.

**Next falsifiable experiment:** Compare a rule that *activates cautious mode only after observing evidence of forecast overconfidence* to always-on LOWER and risk-budget policies. Register decision and regime-shift tests first, then measure both avoided downside and preserved upside. Do not introduce new tools unless needed.

## 7. Publication boundaries

This GitHub repository is public. The experiment used only synthetic model parameters and public file references. No user records, confidential analytics, external business changes, payment, trading or automatic schedules were used.

**Overall verdict:** `CONTROLLED SYNTHETIC COMPARISON VERIFIED — CAUTIOUS MODE HELPS WHEN OVERSTATED, BUT INCURS MEASURABLE OPPORTUNITY COST ELSEWHERE; REAL-WORLD EFFECT UNKNOWN`.
