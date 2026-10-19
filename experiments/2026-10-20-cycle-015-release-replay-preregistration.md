# Test-LaB — Cycle 015 PRE-REGISTRATION: AOM vs AOM + Bounded Multiverse on Real GitHub Release History

**Date:** 2026-10-20 (Asia/Bangkok)
**Stage:** S3 — read-only historical replay; scoring rules frozen BEFORE test-period outcomes are accessed
**Repository/source:** Public pytest-dev/pytest, GitHub REST releases collection with per_page=10 and page=N.
**Purpose:** Out-of-sample comparison of two DETERMINISTIC OPERATIONAL PROXIES of AOM V0.3 and AOM V0.3 plus bounded multiverse. NOT a blind two-model prompt A/B benchmark.
**Scope:** Source repo READ ONLY. Writes ONLY to public Test-LaB documentation and test artifacts.

## 1. Source and time firewall

- Eligible: public stable GitHub releases with draft=false, prerelease=false and valid published_at timestamp. Use published_at as observation time.
- Fetch pages 1..25, per_page=10. Stop at first page with fewer than 10 records OR when oldest record is earlier than 2024-01-01. If no complete cutoff or fetch error, mark DATA_INCOMPLETE and do not score.
- UTC Monday–Sunday bins: binary y=1 for one or more eligible releases in a week, otherwise y=0.
- Training: 53 Mondays from 2024-01-01 through 2024-12-30 (last training week ends 2025-01-05).
- Test: 52 Mondays from 2025-01-06 through 2025-12-29 (last test week ends 2026-01-04).
- Test week t: allow only training plus strictly earlier test-week outcomes. The predictor must commit p_t and action_t before the evaluator reveals y_t. Outcomes for future weeks never enter an earlier decision. Display source URLs and UTC timestamps in final report.
- No participant may mutate pytest repo, Hybrid Mind, Facebook, WordPress, Metricool, or any production system.

## 2. Matched evidence and budgets

Both policies see exactly the same historic training data and sequential prior test-week binary outcomes. Evaluator reads GitHub release data once and shares it; they receive equal data, not different privileged sources. Both policies may budget at most 105 synthetic work units per test point. These are deterministic branch-expansion proxies, NOT tokens, latency, tool requests, real money or matched CPU time. Measure actual model complexity honestly.

## 3. Frozen comparison policies

- P0 FIXED DIAGNOSTIC: forecast p_fixed=(1+training_positive_weeks)/(2+53), unchanged in holdout.
- P1 AOM V0.3 OPERATIONAL PROXY: evidence-updating Beta-Bernoulli forecast p_long=(1+all_previously_observed_positive_weeks)/(2+all_previously_observed_weeks). This represents a lightweight evidence-first online route, NOT a verbatim LLM execution of the user's AOM Markdown.
- P2 AOM+MULTIVERSE OPERATIONAL PROXY: p_long as above; p_recent=(1+positive_weeks_in_latest_8_observed_weeks)/(2+N_latest_observed_weeks), p2=0.5*p_long+0.5*p_recent. The fixed 0.5/0.5 split is an unvalidated STABLE/RECENT scenario assumption, not an estimated probability of two true causal worlds.
- P2 recursively simulates horizon H=3 of binary events and two possible decisions PREPARE/WAIT per point; a future branch can update only with its hypothetical observations. A fresh real historical observation re-roots the tree at the next week. One global budget limit 105 is used for that planning invocation; virtual children never reset it.

**Two possible analytic decisions for every arm:** PREPARE costs synthetic 1 utility unit regardless of outcome; WAIT costs 3 if a release occurs that week, 0 otherwise. Therefore action PREPARE iff forecast p>1/3, otherwise WAIT. This is a predeclared, artificial attention allocation loss, NOT real user money/revenue/operational overhead. PREPARE/WAIT cannot change historical GitHub release arrivals, and observing history does not depend on choosing either action. Accordingly, **with action-independent future observations the lookahead cannot itself improve the immediate threshold decision**; a P2 edge, if any, mainly tests the recent-rate belief hypothesis, not multiverse planning superiority.

## 4. Locked scoring

- Primary: Brier mean = mean[(p_t - y_t)^2], compare P2 vs P1, lower better.
- Secondary: aggregate synthetic decision loss under PREPARE/WAIT, P0 diagnostic, release-positive week count, exact source event count, per-week probability/decision/outcome readback, tree work units / incomplete branches, missing-data flags.
- No post-hoc changes to source, weeks, weights, losses, horizon, priors, calibration targets, or benchmark baselines.
- Stop if cutoff coverage incomplete; NEVER invent missing release dates or weeks.
- Admit adverse results or inconclusive evaluation. Structural success is not predictive uplift.
- Full behavioral AOM vs AOM + Markdown prompt benchmarking remains UNKNOWN; these are fixed policy proxies and one public project dataset.

## 5. Acceptance criteria

Complete source coverage, correct chronology, per-week prediction preceding outcome in code, equal evidence, clear accounting, honest scoring and a reproducible report. A P2 win is **not** required for PASS of research integrity.
