# Test-LaB — Cycle 014 / Global Shared Budget for Continuous Multiverse v4

**Date:** 2026-10-19 (Asia/Bangkok)  
**Status:** **FINITE SYNTHETIC 52/52 PASS / PREDICTIVE & BUSINESS UPLIFT UNVERIFIED / ORIGINAL v4 UNCHANGED**  
**Operating candidate:** [Bounded Multiverse v4.1](../world-model/BOUNDED_MULTIVERSE_v4_1_CANDIDATE.md)  
**Executable reference:** [tests/bounded_multiverse_v4_1.js](../tests/bounded_multiverse_v4_1.js)  
**Reference baseline:** [tests/continuous_multiverse_v4.js](../tests/continuous_multiverse_v4.js)  
**AOM finding addressed:** the existing v4 pseudocode redistributes an unchanged resource-budget input at every recursion, and the original toy harness explores the complete finite tree without an expansion-time shared budget.

## 1. Goal and selection

**Goal:** Fix a specific resource accounting and partial-search correctness gap *without rewriting* the current AOM operating Markdown or Multiverse v4.

Comparison made before implementing the candidate:

| Approach | Current disposition | Reason |
|---|---|---|
| A. Keep v4 as is | Baseline | No new complexity, but lacks a working shared-budget demo |
| **B. Isolated bounded candidate + finite test** | **TEST — DONE** | Low-risk, reversible GitHub sandbox, directly addresses known gap |
| C. Rewrite v4/v5 in place | DEFER | Would change an actively referenced protocol before evidence |
| D. Build an orchestration app or Plugin | DROP | Not required to test work accounting |
| E. Deploy to other user's real systems | BLOCK | Production modification out of scope |

**Skill/Tool fit:** native JS reasoning + GitHub connector (existing) for isolated code/docs/log, not another framework. Scope is Test-LaB only.

## 2. Reference world and measurement contract

The existing test environment is synthetic and explicitly declared: 100 starting cash units, Beta(1,1) prior, actions STOP/PROBE/COMMIT, PROBE fee 1, COMMIT minimum cash 30, possible COMMIT SUCCESS +20 or FAILURE −30, horizon H=5. Every nature outcome creates a **hypothetical child** only.

**New deterministic WORK_UNIT:** each expanded decision node costs 1, plus 1 per immediate nature-outcome edge evaluated. Expanding one node is atomic; it either fits the shared ledger or remains UNEXPLORED. Work units are **not** tokens, wall time, RAM, dollars, API calls, or measured resource bills.

Frontier priority: shallowest node first, then fewer expanded nodes from its root action, then arrival order. The priority is not determined by optimistic profit and does not erase initially unattractive alternatives.

**Comparison reference (full traversal, same assumptions):** 1,678 materialized nodes, 339 decisions, 1,339 terminal/horizon leaves, 1,008 local action alternatives. Complete new traversal costs 1,677 WORK_UNITs (339 expanded decisions + 1,338 outcome edges).

## 3. Executed results

The self-contained JavaScript test was executed in the available V8 runtime and **52 of 52 assertions passed**. It was committed as a Node.js 18+ compatible standalone file with no dependencies. An independent Node.js execution in a separate environment is not claimed by this report.

| Work-unit limit | Used | Expanded decisions | Unexplored nodes | Root action status |
|---:|---:|---:|---:|---|
| 0 | 0 | 0 | 1 | ABSTAIN; root unexplored |
| 5 | 5 | 1 | 4 | ABSTAIN; all 3 first actions enumerated |
| 10 | 10 | 2 | 7 | ABSTAIN |
| 15 | 15 | 3 | 10 | ABSTAIN; PROBE and COMMIT top-level families each receive expansion |
| 280 | 280 | 56 | 169 | ABSTAIN |
| 560 | 558 | 112 | 227 | ABSTAIN; 2 unused units insufficient for atomic node |
| 900 | 898 | 180 | 159 | ABSTAIN |
| 1,200 | 1,199 | 241 | 98 | ABSTAIN |
| **1,600** | **1,600** | **322** | **17** | **PROBE certified within toy model** |
| **1,677** | **1,677** | **339** | **0** | **COMPLETE; PROBE certified** |

*The absolute count of UNEXPLORED frontier nodes is not necessarily decreasing at every budget, because expanding a parent can reveal multiple pending children. Coverage means evaluated versus declared finite possibilities, not coverage of unknown real futures.*

In the full run, toy expected incremental gain for first-action PROBE is **25/3 ≈ 8.3333**. This matches the original v4 finite reference. At limit 1,600, although 17 child nodes remain unexpanded, sound model-based **lower/upper value bounds** converge tightly enough to certify the same first action in the declared toy world; that is **not** full branch coverage and not a real-world prediction.

At budget 5, PROBE/COMMIT/STOP root actions exist but future uncertainty remains so broad that the system returns ABSTAIN, rather than treating a lucky future path as an achieved result.

## 4. Safety / regression checks that passed

- All 18 specified budget caps stayed within one shared total ledger.
- Expansion-cost and materialized-node accounting reconciled at every cap.
- The first root expansion retained STOP, PROBE and locally unfavorable COMMIT together.
- At budget 15, depth-one expansion was shared between PROBE and COMMIT rather than consumed by one action family.
- Value bounds enclosed the complete-tree toy optimum for every cap; larger budgets did not widen the bound interval.
- An exhausted budget was reported as BUDGET_EXHAUSTED; uncertain decisions returned ABSTAIN_UNCERTIFIED.
- Cash constraints blocked COMMIT where infeasible.
- No hypothetical child observation polluted the parent or another observed root.
- With enough capacity for a full new plan at each point, the replay fixture followed:
  S1 PROBE → S2 COMMIT → S3 PROBE → S4 STOP under predeclared synthetic SUCCESS / FAILURE / FAILURE observations.
- Insufficient budget prevented the system from consuming fixture outcomes as if a real action had happened.
- A missing observation returned WAIT_FOR_OBSERVATION; an unexpected outcome returned MODEL_MISS.
- No account, public website, external repository, payment, social post, or production system was changed. The only persistent writes were Test-LaB candidate/test/report artifacts.

## 5. Why this does not justify adopting v4.1 globally yet

- The +20 per-step upper bound and STOP lower bound are only valid for this declared toy world. In real planning domains with unbounded or unknown payoffs, **no unsupported upper bound can certify an action**.
- Work units limit the *modeled branching calculation*, not overall model tokens, human attention, tool requests, latency or actual operating cost.
- A pass on fixed toy assertions does **not** demonstrate better AOM answers, better real forecasts, commercial uplift, or out-of-sample calibration.
- The comparison to original v4 is a *reference consistency and computational-budget* comparison, not a fair behavioral comparison of **AOM V0.3 versus AOM V0.3 + optional multiverse**.
- Other action spaces and cost asymmetries may violate the chosen allocation heuristic; more adversarial tests are needed before claiming broad robustness.

## 6. Decision at the next observed point

**S1 initial finding:** v4 declared a budget but passed it unchanged to recursive children.  
**S2 observation:** the isolated candidate honors a measurable finite shared budget, retains paths, and abstains when uncertain.  
**S2 choice:** KEEP existing v4 as operative, TEST v4.1 bounded candidate in read-only future cases. **Do not merge yet.**  
**S3 desired observation:** paired historical replay of AOM V0.3 vs AOM V0.3 + candidate with equal evidence/time-cutoffs and research budgets, scoring predictions before future events are revealed.  
**If improvement absent or not worth cost:** REJECT candidate for default use and retain simple AOM.  
**If evidence favorable:** propose opt-in/conditional adoption for suitable multi-step decisions, without overriding user-controlled production workflows.

**Current verdict:** SHARED_BUDGET_LOGIC_PASS / FULL_REFERENCE_MATCH / BEHAVIORAL_VALUE_UNVERIFIED.
