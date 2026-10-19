# Test-LaB Cycle 016 — Option-Creation Multiverse on Real GitHub Release Outcomes

**Date:** 2026-10-20 (Asia/Bangkok)
**Status:** REAL-PUBLIC-EVENT REPLAY COMPLETE / CAUSAL PAYOFFS SYNTHETIC / AOM MODEL-PROMPT A-B STILL UNVERIFIED
**Pre-registration, before event reads:** [Cycle 016 preregistration](2026-10-20-cycle-016-option-unlock-preregistration.md), commit 7440612c24c3265bbe9c9a8d17cc4dcdd0ea6dac.
**Frozen policy implementation, before event reads:** [cycle_016_option_unlock_replay.js](../tests/cycle_016_option_unlock_replay.js), commit 310456f5774e65d2c0dadff6c0e9421beceaf324.
**Offline reproduction:** [run_cycle_016.js](../tests/run_cycle_016.js). Node.js 18+, standard library only.
**Public source manifests:** [Ruff](../data/cycle016_ruff_holdout_manifest.json) and [Flask](../data/cycle016_flask_holdout_manifest.json). Full paginated evidence chunks also retained in data/.

## 1. What is real and what is hypothetical?

**REAL OBSERVATIONS:** Published stable release dates/IDs/URLs of astral-sh/ruff and pallets/flask, observed in public GitHub REST release pages without writing to either repository.
**HYPOTHETICAL ACTION EFFECTS:** INSTALL/WAIT/PREPARE/MONITOR/DISABLE, their utility cost (1.2 PREPARE; 3.0 missed release; 0.2 monitor maintenance; 0.3 timely handling; setup 2 or 8), and a hypothetical perfect timely alert. None was deployed or measured in real life. Historical release events are unchanged whichever strategy is selected.
**POLICY PROXIES:** P1 is a one-step greedy-style AOM proxy; P2 is a bounded, H=4, exhaustive decision-policy proxy. Neither is an independently invoked LLM using the full AOM Markdown. This DOES NOT establish real AOM superiority.

## 2. Auditable source data and time windows

Training: 26 weeks, 2025-07-07 through 2026-01-04 (UTC Monday–Sunday).
Holdout: 26 weeks, 2026-01-05 through 2026-07-05 (UTC Monday–Sunday). Current week's observation was read by scoring AFTER both actions/predictions were fixed in the code.

| Public repo | Release pages fetched | API release records | Training stable release-positive weeks | Holdout stable release-positive weeks | Stable release events in train/test |
|---|---:|---:|---:|---:|---:|
| [astral-sh/ruff](https://github.com/astral-sh/ruff/releases) | 44 | 432 | 24 / 26 | 22 / 26 | 24 / 24 |
| [pallets/flask](https://github.com/pallets/flask/releases) | 4 | 38 | 1 / 26 | 1 / 26 | 1 / 1 |

Ruff: 44 pages, 432 public release records, complete short page 44; Flask: 4 pages, 38 records, complete short page 4. Files in the frozen train/test window were filtered by release publication timestamps, duplicates excluded, draft/prerelease excluded. Exact source permalinks and dates are in the stored manifests. Completeness here means complete paginated API release collection at read time, not a claim that GitHub's history can never change.

## 3. Preregistered primary score — lower modeled loss is better

| Repo | Setup fee | P1 greedy loss | P2 multiverse loss | P2 − P1 | P2 first action |
|---|---:|---:|---:|---:|---|
| astral-sh/ruff | 2 | 31.20 | 13.80 | -17.40 | INSTALL |
| astral-sh/ruff | 8 | 31.20 | 31.20 | +0.00 | PREPARE |
| pallets/flask | 2 | 3.00 | 3.00 | +0.00 | WAIT |
| pallets/flask | 8 | 3.00 | 3.00 | +0.00 | WAIT |

**Primary finding:** Under the predeclared hypothetical payoff model, P2 outperformed P1 ONLY for Ruff with the cheap setup fee (13.8 vs 31.2 synthetic units; 17.4 fewer). With high setup fee in Ruff, both policies chose PREPARE and tied at 31.2. In Flask both chose WAIT and tied at 3.0 despite both fees. These results were not selected after tuning any fee or outcome.

## 4. Why these results happened

- Ruff: 24/26 training weeks and 22/26 holdout weeks had at least one stable release; upfront low setup can create a future MONITOR action that avoids repeated hypothetical PREPARE cost. P1 sees only an initial setup expense, so does not install. P2 INSTALLs in week 1 under fee=2, then MONITORs all remaining 25 weeks.
- Flask: only 1/26 training weeks and 1/26 holdout weeks had releases. Both policies decline monitoring in all 26 holdout weeks: its recurring and setup cost do not earn back enough hypothetical missed-release avoidance.
- Under Ruff setup fee=8, bounded horizon=4 does NOT see enough future payback, so P2 declines the long-lived option; this is a possible planning-HORIZON FAILURE, NOT proof that an expensive setup is universally bad.
- A hypothetical immediate-response facility cannot be inferred from release timestamps alone; its existence/cost/effect are input assumptions, not actual empirical validations.

## 5. Consecutive decision points and option creation

At each point, state={observed Beta successes/failures, monitoringEnabled, cumulative toy cost}.
**Ruff low fee:** S1 PREPARE vs INSTALL; P2 INSTALL changes next action set from WAIT/PREPARE/INSTALL to MONITOR/DISABLE. After the first observed public release week, S2 reroots and chooses MONITOR using only prior weeks and branch-local futures. When weeks with no release occur, the monitoring-enabled state remains available and is assessed anew. P1 continues PREPARE.
**Flask:** S1 and all later points favor WAIT; no optional capability is installed, and the option-creation strategy appropriately abstains from investment.
An actual past release is appended to BOTH policies' public evidence histories only after that week's decision. Simulated future y branches NEVER become real evidence.

## 6. Compute budget, coverage and limitations

The model uses one global shared work ledger per virtual root, maximum 2500 work units. The deterministic toy implementation explores all locally feasible actions and both possible release/no-release outcomes at every nonterminal virtual point, for H=4.

| Repo | Setup fee | P1 modeled work units over 26 points | P2 modeled work units over 26 points | Root plans |
|---|---:|---:|---:|---:|
| astral-sh/ruff | 2 | 26 | 21318 | 26 |
| astral-sh/ruff | 8 | 26 | 33618 | 26 |
| pallets/flask | 2 | 26 | 33618 | 26 |
| pallets/flask | 8 | 26 | 33618 | 26 |

All 104 P2 root plans completed within the per-root limit 2500, with no budget exhaustion. P2's work units count decision-node expansions and hypothetical outcome edges; P1's bookkeeping count is a simple one-step proxy. **They are not measured wall-clock latency, CPU/RAM usage, LLM tokens, call counts, or money.** The extra computation is substantial even when action choice does not change.

## 7. Important negative result: four-step horizon misses delayed payback

Post-hoc **diagnostic calculation only** (NOT an additional preregistered competitor):
At Ruff training start, 24/26 weeks were positive. Under declared Beta(1,1), training posterior p=(24+1)/(26+2)=25/28 ≈0.892857.
With high setup fee F=8, installing and monitoring for a FULL 26-week fixed commitment has expected toy loss F+26×(0.2+0.3×25/28) ≈ **20.1643**; proactive PREPARE each week has fixed toy loss 26×1.2=**31.2**.
Given the actual 22 positive holdout weeks, hindsight loss for a full-horizon always-monitor policy would have been 8+26×0.2+22×0.3=**19.8**, again below PREPARE 31.2, **but P2 H=4 did not install**.
At H=4, expected monitoring loss ≈8+4×(0.2+0.3×25/28)=9.8714 versus PREPARE 4×1.2=4.8, explaining the rational local rejection.
This demonstrates **horizon truncation under the assumed world**, not an oracle guarantee for an unobserved real monitoring service. It is also a warning not to claim a system is globally optimal when its lookahead is shorter than its payback period.

## 8. Verification

- The preregistration was committed BEFORE reads of either source repo's release history; frozen policy source likewise committed first.
- The frozen implementation ran **25/25 synthetic fixture checks PASS** before real history reads (includes positive, zero-event and costly regimes, shared work budgets, mode-gated actions, observation firewall).
- Independent arithmetic cross-check re-bucketed all release timestamps from the stored manifests, recomputed actual y for each test week and recalculated P1 and P2 costs by replaying actions with a separate direct transition implementation. **Four of four cells matched** the frozen benchmark, including action feasibility, action costs, budget caps, and total loss.
- No GitHub source repo was changed; only Test-LaB preregistration, read-only public-data manifests/chunks, executable script/runner and this report were written.
- No Hybrid Mind, Facebook, WordPress, Metricool, AOM V0.3 source, or existing production workflow was touched.

## 9. Pre-registered 26-week decision trace

Week release=y below is the actual public GitHub event indicator; decisions/losses are proxy simulations. All forecasts and actions are made before revealing current-week y to the policy.

### astral-sh/ruff

| Week UTC | Release y | P1 action | P2 low-fee action | P2 high-fee action | P2 low-fee realized toy loss |
|---|---:|---|---|---|---:|
| 2026-01-05 | 1 | PREPARE | INSTALL | PREPARE | 2.50 |
| 2026-01-12 | 1 | PREPARE | MONITOR | PREPARE | 0.50 |
| 2026-01-19 | 1 | PREPARE | MONITOR | PREPARE | 0.50 |
| 2026-01-26 | 0 | PREPARE | MONITOR | PREPARE | 0.20 |
| 2026-02-02 | 1 | PREPARE | MONITOR | PREPARE | 0.50 |
| 2026-02-09 | 1 | PREPARE | MONITOR | PREPARE | 0.50 |
| 2026-02-16 | 1 | PREPARE | MONITOR | PREPARE | 0.50 |
| 2026-02-23 | 1 | PREPARE | MONITOR | PREPARE | 0.50 |
| 2026-03-02 | 1 | PREPARE | MONITOR | PREPARE | 0.50 |
| 2026-03-09 | 1 | PREPARE | MONITOR | PREPARE | 0.50 |
| 2026-03-16 | 1 | PREPARE | MONITOR | PREPARE | 0.50 |
| 2026-03-23 | 1 | PREPARE | MONITOR | PREPARE | 0.50 |
| 2026-03-30 | 1 | PREPARE | MONITOR | PREPARE | 0.50 |
| 2026-04-06 | 1 | PREPARE | MONITOR | PREPARE | 0.50 |
| 2026-04-13 | 1 | PREPARE | MONITOR | PREPARE | 0.50 |
| 2026-04-20 | 1 | PREPARE | MONITOR | PREPARE | 0.50 |
| 2026-04-27 | 0 | PREPARE | MONITOR | PREPARE | 0.20 |
| 2026-05-04 | 0 | PREPARE | MONITOR | PREPARE | 0.20 |
| 2026-05-11 | 1 | PREPARE | MONITOR | PREPARE | 0.50 |
| 2026-05-18 | 1 | PREPARE | MONITOR | PREPARE | 0.50 |
| 2026-05-25 | 1 | PREPARE | MONITOR | PREPARE | 0.50 |
| 2026-06-01 | 1 | PREPARE | MONITOR | PREPARE | 0.50 |
| 2026-06-08 | 1 | PREPARE | MONITOR | PREPARE | 0.50 |
| 2026-06-15 | 1 | PREPARE | MONITOR | PREPARE | 0.50 |
| 2026-06-22 | 1 | PREPARE | MONITOR | PREPARE | 0.50 |
| 2026-06-29 | 0 | PREPARE | MONITOR | PREPARE | 0.20 |

### pallets/flask

| Week UTC | Release y | P1 action | P2 low-fee action | P2 high-fee action | P2 low-fee realized toy loss |
|---|---:|---|---|---|---:|
| 2026-01-05 | 0 | WAIT | WAIT | WAIT | 0.00 |
| 2026-01-12 | 0 | WAIT | WAIT | WAIT | 0.00 |
| 2026-01-19 | 0 | WAIT | WAIT | WAIT | 0.00 |
| 2026-01-26 | 0 | WAIT | WAIT | WAIT | 0.00 |
| 2026-02-02 | 0 | WAIT | WAIT | WAIT | 0.00 |
| 2026-02-09 | 0 | WAIT | WAIT | WAIT | 0.00 |
| 2026-02-16 | 1 | WAIT | WAIT | WAIT | 3.00 |
| 2026-02-23 | 0 | WAIT | WAIT | WAIT | 0.00 |
| 2026-03-02 | 0 | WAIT | WAIT | WAIT | 0.00 |
| 2026-03-09 | 0 | WAIT | WAIT | WAIT | 0.00 |
| 2026-03-16 | 0 | WAIT | WAIT | WAIT | 0.00 |
| 2026-03-23 | 0 | WAIT | WAIT | WAIT | 0.00 |
| 2026-03-30 | 0 | WAIT | WAIT | WAIT | 0.00 |
| 2026-04-06 | 0 | WAIT | WAIT | WAIT | 0.00 |
| 2026-04-13 | 0 | WAIT | WAIT | WAIT | 0.00 |
| 2026-04-20 | 0 | WAIT | WAIT | WAIT | 0.00 |
| 2026-04-27 | 0 | WAIT | WAIT | WAIT | 0.00 |
| 2026-05-04 | 0 | WAIT | WAIT | WAIT | 0.00 |
| 2026-05-11 | 0 | WAIT | WAIT | WAIT | 0.00 |
| 2026-05-18 | 0 | WAIT | WAIT | WAIT | 0.00 |
| 2026-05-25 | 0 | WAIT | WAIT | WAIT | 0.00 |
| 2026-06-01 | 0 | WAIT | WAIT | WAIT | 0.00 |
| 2026-06-08 | 0 | WAIT | WAIT | WAIT | 0.00 |
| 2026-06-15 | 0 | WAIT | WAIT | WAIT | 0.00 |
| 2026-06-22 | 0 | WAIT | WAIT | WAIT | 0.00 |
| 2026-06-29 | 0 | WAIT | WAIT | WAIT | 0.00 |

## 10. AOM decision, next experiment and guardrails

**ADOPT AS A DESIGN CONSTRAINT:** use multiverse selectively when today's action causally creates or removes future feasible actions, and only with documented transition assumptions and a payback-aware lookahead.
**KEEP DEFAULT:** for sparse, simple or action-independent cases, use lighter AOM evaluation rather than 1000+ work units of tree exploration per point.
**REVISE IN SANDBOX:** evaluate horizon coverage and terminal/residual option value; a fixed H=4 planner missed a potentially favorable long-horizon investment in one predeclared scenario.
**DO NOT CLAIM:** this experiment proves any real alert cost, real savings, real release prediction improvement, or actual user-facing AOM Markdown prompt advantage.
**NEXT:** preregister a separately held-out test of adaptive planning horizon / sound terminal value bounds, or genuine independent AOM prompt A/B with matched data. Keep existing production untouched.
