# Multiverse Cycle 017 — Horizon-Aware v4.2: PRE-REGISTRATION

**Date:** 2026-10-20 (Asia/Bangkok)
**Scope:** Independent Multiverse World Model ONLY. No AOM or Skill merging.
**Motivation:** Cycle 016 found fixed H=4 can miss an option with longer payback.
**Status:** Frozen protocol before coding v4.2, testing it, or replaying the existing public event manifest.

## 1. Immutable toy assumptions

Reuse exactly the hypothetical action costs from Cycle 016; do not claim they represent a deployed service. State is {alpha,beta,enabled,remainingWeeks}. Initial Beta(1,1) may be updated from 26 known public training-week observations. Next release y has posterior predictive p=alpha/(alpha+beta), with y in {0,1}. At every future branch, update ONLY that branch's alpha/beta.

Disabled actions:
- WAIT: loss 3*y; remain disabled.
- PREPARE: loss 1.2; remain disabled.
- INSTALL: loss F+0.2+0.3*y; enable future MONITOR and DISABLE.

Enabled actions:
- MONITOR: loss 0.2+0.3*y; remain enabled.
- DISABLE: loss 3*y; become disabled.

Fee F=2 or 8, plus additional adversarial fee tests. All hypothetical losses are nonnegative. The declared task ends after 26 weeks; each newly observed week reduces remainingWeeks by one. No free, endless horizon.

## 2. Two independent Multiverse planning variants

**Reference fixed horizon** solves H=min(4,remainingWeeks) using complete toy outcomes and zero continuation after H. No AOM integration or AOM proxy in this study.

**New horizon-aware v4.2 candidate:**
1. Determine a payback-informed horizon hint from present posterior and model costs. This heuristic NEVER certifies an action.
2. Attempt multiple horizons (initial four, possible payback hint, up to remaining declared weeks), with one shared global work ledger for the ENTIRE planning invocation. No new budget per simulated child or horizon checkpoint.
3. Use exact dynamic programming with memoization over {alpha,beta,enabled,remainingSteps}; expand all available actions and outcome values at each unique state. Cost 1 work unit per unique expanded decision state plus 1 per evaluated nature-outcome edge. Budget exhaustion means ABSTAIN and no executable first action.
4. At short-horizon cutoff, use an action-specific **sound** interval for full remaining task. Prefix optimal expected nonnegative loss is a lower bound. A feasible tail policy provides an upper bound: enabled -> always MONITOR; disabled -> always WAIT or PREPARE, whichever has lower Bayesian posterior predictive expected cost at the cutoff. The posterior predictive rate is a martingale *under this stationary Beta-Bernoulli model*. This is a model-internal certificate, never real-world calibrated evidence.
5. Certify an action early only if its full-task upper bound is below all other first actions' lower bounds (strict; ties conservatively unresolved). Otherwise expand further, eventually the full declared horizon if budget permits.
6. Re-root after one observed historical or synthetic fixture event, never using another virtual branch as actual evidence.
7. All risk, assumptions and incomplete search explicitly surfaced.

## 3. Preregistered tests and comparisons

- Compare fixed H4 to v4.2 on a high-event prior and high setup fee (known delayed-payback counterexample); also low-event prior and high/low fees.
- Brute-force oracle independently enumerates all tiny-horizon action/outcome paths for multiple priors and fees; exact memo values and choices must match it.
- Every modeled first action retained, even when locally worse; no hidden pruning or future-data leakage.
- Sound interval containment and strict certification compared against full-horizon exact value on tested small states.
- Shared global budget never exceeded; incomplete cases abstain; repeated equivalent states use memo without double-charging.
- Replanning reduces remaining time to the actual deadline and updates observed belief exactly once.
- Test mismatch and missing observation return MODEL_MISS / WAIT instead of inventing new history.
- Explicitly record work units, runtime if measured, failures, and uncertainty. Do not treat work units as tokens or money.
- Descriptive replay reuses Cycle 016 Ruff/Flask public release manifests: 26 training and 26 retrospective weeks, fees 2 and 8. This is **NOT a new blind holdout**; the same historical event data are already known. Forecast and action code must receive each y only AFTER the current-point action has been chosen.
- No modifications to existing v4.0.1 file, AOM, any other Skill, Hybrid Mind, WordPress, Facebook, Metricool, or third-party repositories.
- Produce independent v4.2 Markdown, standalone test script and Cycle 017 result report. No new Skill package, Plugin, framework or service.

**Success** means logical correctness, honest behavior under budget and uncertainty, and reproducibility—not a forced improvement or a claim of real-world prediction.
