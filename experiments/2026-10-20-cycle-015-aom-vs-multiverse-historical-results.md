# Test-LaB — Cycle 015 / AOM vs Bounded Multiverse: Real GitHub Historical Replay

**Date:** 2026-10-20 (Asia/Bangkok)
**Status:** `REAL_PUBLIC_HISTORY_PREQUENTIAL_REPLAY_COMPLETE / MULTIVERSE_NO_DEMONSTRATED_GAIN / NO_PRODUCTION_TOUCH`
**Frozen preregistration:** [Cycle 015 preregistration](2026-10-20-cycle-015-release-replay-preregistration.md), committed BEFORE holdout retrieval.
**Frozen evaluation algorithm:** [aom_vs_multiverse_release_replay.js](../tests/aom_vs_multiverse_release_replay.js), committed BEFORE holdout retrieval.
**Local runner:** [run_cycle_015.js](../tests/run_cycle_015.js)
**Public input snapshot:** [pytest stable release manifest](../data/pytest_stable_release_history_2024_2025.json)

## 1. What was actually tested

This was **a retrospective test on REAL public GitHub stable release timestamps** from [pytest-dev/pytest](https://github.com/pytest-dev/pytest), with outcomes not used until after the algorithm's per-week forecasts were generated. It is **NOT** a live agent acting on the world, not a causal field experiment, and not an independent blind LLM prompt trial comparing the original AOM V0.3 Markdown against a second model. It compares deterministic, preregistered policy **proxies** for two ways of reasoning.

- P0: fixed training estimate, diagnostic control.
- P1: a lightweight online Beta forecast representing the AOM V0.3 evidence-updating style.
- P2: same long-run rate plus a fixed 50/50 recent-eight-week regime estimate, using a bounded three-step action/outcome simulation. The assumed mixture was not calibrated against real event probabilities.
- Each week, both arms had the same public historical observations from strictly earlier weeks; no historical source repository was modified.
- Actions PREPARE/WAIT and their costs are **synthetic attention-allocation choices** only. They cannot change pytest's release timing. Both choices receive the next observed week, so future information is action-independent; hence lookahead **cannot** generate an inherent action advantage in this scenario.

## 2. Read-only source and coverage

GitHub API collected 30 release records across 3 pages, stopping after a release older than 2024-01-01 UTC (OLDER_THAN_2024_UTC).
Among records in the prescribed time range: 20 eligible stable releases, with 13 in training and 7 in evaluation.
Training used 53 UTC Monday–Sunday weeks (2024-01-01 through 2025-01-05) with 11 positive release weeks.
Evaluation used 52 UTC Monday–Sunday weeks (2025-01-06 through 2026-01-04) with 7 positive weeks.

## 3. Frozen out-of-sample metrics

| Policy proxy | Mean Brier score ↓ | Synthetic attention loss ↓ | PREPARE weeks |
|---|---:|---:|---:|
| P0 fixed reference | 0.123477 | 21 | 0 |
| **P1 AOM lightweight evidence-updating** | **0.121554** | **21** | 0 |
| P2 AOM + multiverse proxy | 0.129474 | 21 | 0 |

The preregistered primary difference is **P2 − P1 = +0.007920 Brier** (positive is worse).
The synthetic action-loss difference is **0**, and all arms selected WAIT in all 52 weeks, so the model did **not** improve actual selections within this experimental action/penalty definition.

**Compute-cost proxy:** P1 needs one direct forecast per week, while P2 expanded 21 decision nodes and 84 outcome edges per week: **105 synthetic work units per point × 52 = 5,460**. These units are not wall time, CPU, model tokens or tool calls; no statement about real cost ratio is justified. Both policies received identical observed data.

**Result interpretation:** The short-window assumed hypothesis was less calibrated than the simpler cumulative-rate rule for these weeks. It sometimes moved estimates upward after nearby releases without improving next-week scoring. The history is small (only seven positive holdout weeks); do not claim statistical significance or universal inferiority.

## 4. Continuous point-by-point review (S1 → S2 → S3)

- **S1 (2025-01-06):** both models see the same frozen 2024 evidence; P1 forecasts about 0.218, P2 about 0.209, and both choose WAIT. No future y revealed.
- **S2 (week 2025-02-24):** seven preceding quiet weeks make P1 about 0.194 and P2 about 0.147. The next actual observed GitHub release occurs that week; both forecasts were too low, and the observed y=1 updates the following week's belief.
- **S3 (week 2025-12-29):** P1 forecasts about 0.179, P2 about 0.290, actual outcome y=0; both still choose WAIT. Multiverse's extra recent-history weighting is not justified by the held-out quality result.
- **Re-root policy:** the model rebuilt a fresh 3-step hypothetical tree at each of 52 actual historical weekly points. Virtual outcomes stayed inside their branches, never entered the real evidence history.

## 5. Independent scoring sanity-check

The frozen benchmark returned 52 week-by-week predictions. A second arithmetic aggregation independently rebuilt the weekly actuals and recomputed P0/P1/P2 forecasts and losses from the same archived manifest, without calling the forecast, rollout or summarization functions in the frozen benchmark. Checks passed for train/test week counts, positive-week count, stable-event count, **all three total Brier values, decisions and synthetic losses**. This checks scoring consistency, not independent evidence or model accuracy.

## 6. Correct decision after this evidence

**DO:** Keep AOM V0.3 as the default lightweight choice for simple binary event forecasting with action-independent observations.
**WATCH / TEST selectively:** Use multiverse only for problems where present actions change available future information, unlock options, alter constraints, or introduce multi-step consequences that a one-step rule misses.
**DO NOT:** Rewrite v5, train an agent framework, silently adopt v4.1 for all AOM tasks, or change Hybrid Mind/Facebook/WordPress/production systems.
**NEXT:** Pre-register a separate multi-stage GitHub history decision task where actions can change future information, or run a genuine blind AOM Markdown prompt A/B with equal evidence if an independent test harness is available. Until then, behavioral improvement remains UNVERIFIED.

## 7. Source release links and timestamps

| UTC date | Source GitHub release | Split |
|---|---|---|
| 2024-01-27 | [8.0.0](https://github.com/pytest-dev/pytest/releases/tag/8.0.0) | TRAIN |
| 2024-02-16 | [8.0.1](https://github.com/pytest-dev/pytest/releases/tag/8.0.1) | TRAIN |
| 2024-02-24 | [8.0.2](https://github.com/pytest-dev/pytest/releases/tag/8.0.2) | TRAIN |
| 2024-03-09 | [8.1.1](https://github.com/pytest-dev/pytest/releases/tag/8.1.1) | TRAIN |
| 2024-04-26 | [8.1.2](https://github.com/pytest-dev/pytest/releases/tag/8.1.2) | TRAIN |
| 2024-04-27 | [8.2.0](https://github.com/pytest-dev/pytest/releases/tag/8.2.0) | TRAIN |
| 2024-05-19 | [8.2.1](https://github.com/pytest-dev/pytest/releases/tag/8.2.1) | TRAIN |
| 2024-06-04 | [8.2.2](https://github.com/pytest-dev/pytest/releases/tag/8.2.2) | TRAIN |
| 2024-07-20 | [8.3.0](https://github.com/pytest-dev/pytest/releases/tag/8.3.0) | TRAIN |
| 2024-07-20 | [8.3.1](https://github.com/pytest-dev/pytest/releases/tag/8.3.1) | TRAIN |
| 2024-07-25 | [8.3.2](https://github.com/pytest-dev/pytest/releases/tag/8.3.2) | TRAIN |
| 2024-09-10 | [8.3.3](https://github.com/pytest-dev/pytest/releases/tag/8.3.3) | TRAIN |
| 2024-12-01 | [8.3.4](https://github.com/pytest-dev/pytest/releases/tag/8.3.4) | TRAIN |
| 2025-03-02 | [8.3.5](https://github.com/pytest-dev/pytest/releases/tag/8.3.5) | TEST |
| 2025-06-02 | [8.4.0](https://github.com/pytest-dev/pytest/releases/tag/8.4.0) | TEST |
| 2025-06-18 | [8.4.1](https://github.com/pytest-dev/pytest/releases/tag/8.4.1) | TEST |
| 2025-09-04 | [8.4.2](https://github.com/pytest-dev/pytest/releases/tag/8.4.2) | TEST |
| 2025-11-08 | [9.0.0](https://github.com/pytest-dev/pytest/releases/tag/9.0.0) | TEST |
| 2025-11-12 | [9.0.1](https://github.com/pytest-dev/pytest/releases/tag/9.0.1) | TEST |
| 2025-12-06 | [9.0.2](https://github.com/pytest-dev/pytest/releases/tag/9.0.2) | TEST |

## 8. Complete holdout week predictions

The probabilities below were produced before each current-week outcome was revealed to the decision function. The event archive was later used by the scorer.

| Week start UTC | Observed release? | P0 p | P1 p | P2 p | P1 action | P2 action |
|---|---:|---:|---:|---:|---|---|
| 2025-01-06 | 0 | 0.218 | 0.218 | 0.209 | WAIT | WAIT |
| 2025-01-13 | 0 | 0.218 | 0.214 | 0.207 | WAIT | WAIT |
| 2025-01-20 | 0 | 0.218 | 0.211 | 0.205 | WAIT | WAIT |
| 2025-01-27 | 0 | 0.218 | 0.207 | 0.153 | WAIT | WAIT |
| 2025-02-03 | 0 | 0.218 | 0.203 | 0.152 | WAIT | WAIT |
| 2025-02-10 | 0 | 0.218 | 0.200 | 0.150 | WAIT | WAIT |
| 2025-02-17 | 0 | 0.218 | 0.197 | 0.148 | WAIT | WAIT |
| 2025-02-24 | 1 | 0.218 | 0.194 | 0.147 | WAIT | WAIT |
| 2025-03-03 | 0 | 0.218 | 0.206 | 0.203 | WAIT | WAIT |
| 2025-03-10 | 0 | 0.218 | 0.203 | 0.202 | WAIT | WAIT |
| 2025-03-17 | 0 | 0.218 | 0.200 | 0.200 | WAIT | WAIT |
| 2025-03-24 | 0 | 0.218 | 0.197 | 0.198 | WAIT | WAIT |
| 2025-03-31 | 0 | 0.218 | 0.194 | 0.197 | WAIT | WAIT |
| 2025-04-07 | 0 | 0.218 | 0.191 | 0.196 | WAIT | WAIT |
| 2025-04-14 | 0 | 0.218 | 0.188 | 0.194 | WAIT | WAIT |
| 2025-04-21 | 0 | 0.218 | 0.186 | 0.193 | WAIT | WAIT |
| 2025-04-28 | 0 | 0.218 | 0.183 | 0.142 | WAIT | WAIT |
| 2025-05-05 | 0 | 0.218 | 0.181 | 0.140 | WAIT | WAIT |
| 2025-05-12 | 0 | 0.218 | 0.178 | 0.139 | WAIT | WAIT |
| 2025-05-19 | 0 | 0.218 | 0.176 | 0.138 | WAIT | WAIT |
| 2025-05-26 | 0 | 0.218 | 0.173 | 0.137 | WAIT | WAIT |
| 2025-06-02 | 1 | 0.218 | 0.171 | 0.136 | WAIT | WAIT |
| 2025-06-09 | 0 | 0.218 | 0.182 | 0.191 | WAIT | WAIT |
| 2025-06-16 | 1 | 0.218 | 0.179 | 0.190 | WAIT | WAIT |
| 2025-06-23 | 0 | 0.218 | 0.190 | 0.245 | WAIT | WAIT |
| 2025-06-30 | 0 | 0.218 | 0.188 | 0.244 | WAIT | WAIT |
| 2025-07-07 | 0 | 0.218 | 0.185 | 0.243 | WAIT | WAIT |
| 2025-07-14 | 0 | 0.218 | 0.183 | 0.241 | WAIT | WAIT |
| 2025-07-21 | 0 | 0.218 | 0.181 | 0.240 | WAIT | WAIT |
| 2025-07-28 | 0 | 0.218 | 0.179 | 0.239 | WAIT | WAIT |
| 2025-08-04 | 0 | 0.218 | 0.176 | 0.188 | WAIT | WAIT |
| 2025-08-11 | 0 | 0.218 | 0.174 | 0.187 | WAIT | WAIT |
| 2025-08-18 | 0 | 0.218 | 0.172 | 0.136 | WAIT | WAIT |
| 2025-08-25 | 0 | 0.218 | 0.170 | 0.135 | WAIT | WAIT |
| 2025-09-01 | 1 | 0.218 | 0.169 | 0.134 | WAIT | WAIT |
| 2025-09-08 | 0 | 0.218 | 0.178 | 0.189 | WAIT | WAIT |
| 2025-09-15 | 0 | 0.218 | 0.176 | 0.188 | WAIT | WAIT |
| 2025-09-22 | 0 | 0.218 | 0.174 | 0.187 | WAIT | WAIT |
| 2025-09-29 | 0 | 0.218 | 0.172 | 0.186 | WAIT | WAIT |
| 2025-10-06 | 0 | 0.218 | 0.170 | 0.185 | WAIT | WAIT |
| 2025-10-13 | 0 | 0.218 | 0.168 | 0.184 | WAIT | WAIT |
| 2025-10-20 | 0 | 0.218 | 0.167 | 0.183 | WAIT | WAIT |
| 2025-10-27 | 0 | 0.218 | 0.165 | 0.182 | WAIT | WAIT |
| 2025-11-03 | 1 | 0.218 | 0.163 | 0.132 | WAIT | WAIT |
| 2025-11-10 | 1 | 0.218 | 0.172 | 0.186 | WAIT | WAIT |
| 2025-11-17 | 0 | 0.218 | 0.180 | 0.240 | WAIT | WAIT |
| 2025-11-24 | 0 | 0.218 | 0.178 | 0.239 | WAIT | WAIT |
| 2025-12-01 | 1 | 0.218 | 0.176 | 0.238 | WAIT | WAIT |
| 2025-12-08 | 0 | 0.218 | 0.184 | 0.292 | WAIT | WAIT |
| 2025-12-15 | 0 | 0.218 | 0.183 | 0.291 | WAIT | WAIT |
| 2025-12-22 | 0 | 0.218 | 0.181 | 0.290 | WAIT | WAIT |
| 2025-12-29 | 0 | 0.218 | 0.179 | 0.290 | WAIT | WAIT |

## 9. Limitations and integrity

- The policy implementations are **proxies**, not the actual same-model independent AOM vs AOM+C1 prompt runs. Therefore the trial does NOT demonstrate direct user-task behavior superiority.
- The action loss and 50/50 mixture are artificial, not calibrated with consumer preferences. The two actions do not change the observed data stream.
- The 105 work units are an internal deterministic exploration counter, not resource profiling.
- The public event dataset is one repo and a small holdout, not a statistically powered sample of software ecosystems.
- Training/replay were historical and reveal no measurable benefit from real-world intervention; source repository remains unchanged.
- Only Test-LaB preregistration/script/public-data/result files were created. The original AOM markdown and Hybrid Mind production remain unchanged.

**Final disposition for this test class:** `KEEP AOM DEFAULT / MULTIVERSE NOT JUSTIFIED BY EVIDENCE / REAL PROMPT A/B STILL PENDING`.
