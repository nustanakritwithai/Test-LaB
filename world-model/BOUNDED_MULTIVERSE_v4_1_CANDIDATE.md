---
title: "Bounded Multiverse v4.1 — Shared Budget Candidate"
date: "2026-10-19"
status: "TEST_CANDIDATE_ONLY / NOT_ADOPTED"
parent: "world-model/CONTINUOUS_MULTIVERSE_v4.md"
reference_test: "tests/bounded_multiverse_v4_1.js"
production_mutations: false
---

# Bounded Multiverse v4.1 — Shared Resource Budget Candidate

> **ทุกกิ่งในการจำลองหนึ่งรอบใช้ Ledger เดียวกัน ห้ามเริ่มงบใหม่ที่ลูกแต่ละกิ่ง**
>
> Every fresh, authorized observed root can start a new planning run with a new global budget. Every simulated child in that same run must spend from its parent's global ledger.

## Why

The existing [Continuous Multiverse v4](CONTINUOUS_MULTIVERSE_v4.md) defines RESOURCE_BUDGET and BUDGET_EXHAUSTED, but its POINT_KERNEL pseudocode passes the same numerical budget into each recursive child without decrementing it. The reference v4 script expands the full finite tree and counts it afterward, not during traversal.

This candidate **does not replace** the original v4 file, AOM V0.3, or production workflows.

## 1. Single global ledger contract

~~~yaml
planning_run:
  root: OBSERVED_REALITY | OBSERVED_FIXTURE
  horizon: 5
  ledger:
    unit: WORK_UNIT
    limit: 280
    used: 0
    spent_on: "one unit per expanded decision plus one unit per generated outcome edge"
    scope: "root + all virtual descendants in ONE run"
    reset_at_virtual_child: false
    reset_at_new_observed_root: true
  proof:
    optimistic_bound: MODEL_GROUNDED | UNKNOWN
    pessimistic_bound: MODEL_GROUNDED | UNKNOWN
    decision: CERTIFIED_WITHIN_DECLARED_MODEL | ABSTAIN_UNCERTIFIED
  coverage: COMPLETE | BUDGET_EXHAUSTED
  unexplored: []
~~~

The spending rule is atomic. Expanding one decision costs 1 plus the number of all its declared immediate nature transitions. When the whole local expansion cannot fit the remaining budget, leave that node explicitly UNEXPLORED, preserving its children as unknowns rather than assigning a fabricated score. This makes a budget of 4 insufficient to expand a root that costs 5; unused quota is valid.

With enough budget for one root expansion, generate **all feasible first actions** (STOP, PROBE, COMMIT in the synthetic fixture), regardless of local attractiveness.

## 2. Fairness and safety invariants

- **One global total:** SUM(all decision expansions and immediate outcome evaluations) <= max_work_units.
- **No unfair first-branch monopoly:** breadth-first traversal; within the same depth choose the root-action family with fewer expanded nodes. This is a transparent heuristic, not a proof of optimal compute allocation.
- **No hidden path pruning:** retain unexpanded branches with their unresolved state, rather than falsely declaring them inferior.
- **No future leakage:** hypothetical observations update branch-local beliefs only, not the observed root.
- **No invented optima:** if sound upper/lower bounds do not certify a decision, return ABSTAIN_UNCERTIFIED.
- **No unauthorized real actions:** this script has no network calls, financial operations, posting, scheduling, or production writes.
- **No unlimited cost claims:** WORK_UNIT is a synthetic accounting proxy, not elapsed time, model tokens, dollars, API requests or memory usage.

## 3. Certified choice without exhaustive search

For the declared finite toy world only, STOP guarantees 0 future reward and each remaining step can add at most +20. Therefore an unexpanded node with h remaining steps has a model-grounded continuation interval [0, 20*h].

For each action, aggregate its declared outcomes:

~~~text
Q_low(action)  = SUM p(outcome) * [immediate_reward + child_lower_bound]
Q_high(action) = SUM p(outcome) * [immediate_reward + child_upper_bound]

At a decision: V_low = MAX_action Q_low(action)
               V_high = MAX_action Q_high(action)

CERTIFY(action) only if Q_low(action) >= Q_high(each_other_action).
Otherwise abstain and keep searching or record budget exhaustion.
~~~

These are **model-internal bounds**, not measured forecasts. If probabilities, causal transitions, or reward bounds are unknown in a real domain, do not transfer these numerical ranges to that domain. Preserve UNKNOWN and abstain, or obtain evidence in an authorized safe way.

Completeness and certification are distinct: some unexpanded branches may not affect the first decision if their upper bounds are already dominated. Conversely, expanding every **declared** branch does not validate the model against reality.

## 4. Uniform point / replanning contract

At every nonterminal node:

1. Rebuild feasible actions from the node's actual or hypothetical resources/constraints.
2. Review historical evidence allowed for that node; keep branch-local simulated evidence separate.
3. Expand all declared available immediate actions/outcomes when an atomic debit fits the SHARED ledger.
4. Maintain sound value intervals for unexpanded descendants.
5. Choose an observable-history policy only when allowed by evidence and bounded proof.
6. When real evidence reaches the next observed point, restart a *fresh* planning invocation with a *new* authorized budget (receding horizon). Never restart budgets recursively inside the same simulation.

~~~text
EXPLORE(root, budget):
   shared = {limit:budget, used:0}
   frontier = [root]
   while affordable node exists:
      node = pick_shallowest_then_fair_root_action(frontier)
      cost = 1 + declared_outcome_count(node)
      if shared.used + cost > shared.limit:
         keep node as UNEXPLORED; try another affordable node
         continue
      shared.used += cost
      expand all locally feasible choices and declared outcomes
      enqueue hypothetical successors; they all SHARE shared
   return bounds, branches, coverage, certificate or abstention
~~~

## 5. Actual controlled toy results

Run: [tests/bounded_multiverse_v4_1.js](../tests/bounded_multiverse_v4_1.js) with Node.js 18+, no packages. The deterministic script executed 52 checks successfully.

| Global limit | Used | Unexplored nodes | Result |
|---:|---:|---:|---|
| 5 | 5 | 4 | BUDGET_EXHAUSTED / ABSTAIN |
| 280 | 280 | 169 | BUDGET_EXHAUSTED / ABSTAIN |
| 900 | 898 | 159 | BUDGET_EXHAUSTED / ABSTAIN |
| 1,600 | 1,600 | 17 | BUDGET_EXHAUSTED / PROBE certified **within toy assumptions** |
| 1,677 | 1,677 | 0 | COMPLETE / PROBE, expected toy reward 25/3 |

The full run matches the original model's 1,678 nodes, 339 decision nodes, 1,339 terminal/horizon leaves, and 1,008 action alternatives.

**A certificate within the synthetic model never means PROBE is best for an actual market or customer.** It means the declared finite decision model and bounds prove that first action under its assumptions.

## 6. Not yet verified

- Robustness with unknown/unbounded payoffs, non-Bernoulli nature outcomes, or unequal expansion costs.
- Actual runtime, memory, token and tool-call costs.
- Matched-budget behavioral superiority of AOM V0.3 + multiverse vs original AOM.
- Prediction quality on held-out real historical data.
- Autonomous continuous execution; production readiness.

**Current decision:** TEST this isolated candidate and compare it on read-only historical problems first; do not rewrite active v4 or AOM solely because these toy fixtures pass.
