---
title: "AOM V0.3 — Multiverse Decision Layer (Candidate, Not Adopted)"
version: "C1"
date: "2026-10-19"
source_aom: "AI_Opportunity_Manager_V0.3.md (user Library; source not copied to public GitHub)"
reference_model: "world-model/CONTINUOUS_MULTIVERSE_v4.md"
status: "REVIEW_CANDIDATE / NOT DEPLOYED / NOT ADOPTED"
production_changes: false
---

# AOM V0.3 — Conditional Multiverse Decision Layer (C1)

> **Purpose:** Apply Continuous Multiverse World Model v4 as an *optional decision-depth layer* to AOM V0.3, without replacing AOM's mission, six-step workflow, DO/TEST/WATCH/DROP classification, Skill–Tool Selection Gate, bounded autonomy, or preference for available tools. All work in this file is a Test-LaB candidate and does not modify the user's original AOM Markdown.

## 1. Activation gate — avoid complexity for simple tasks

Before running this layer, AOM applies its existing Capability-first and Skill–Tool Selection Gate.

Activate CONDITIONAL_MULTIVERSE when all conditions hold:
- An actual decision has **at least two feasible alternatives** whose consequences extend past the current step.
- Outcomes, observations, or resource changes can alter the actions feasible at a later point, or there is material uncertainty worth exploring.
- There is a bounded horizon and enough information to describe plausible causal transitions **as assumptions**, or the goal is explicitly to expose what is unknown.
- Running the analysis is worth its attention/tool cost compared with a direct answer.

Otherwise apply the original AOM V0.3 decision loop, without simulation overhead. In doubt prefer a small safe information-gathering step; do not create a new app, framework, Skill, or Plugin just to run this layer.

**Priority order:** permission/safety > objective and evidence > feasibility > tool availability > expected opportunity value > speed/token saving.

## 2. Uniform state at EVERY nonterminal point

Each hypothetical and observed node is BOTH a decision point, a new universe root, and a learning point:

```yaml
decision_point:
  id: S2
  parent: S1
  origin: OBSERVED_REALITY | REPLAY_OBSERVED | SIMULATED_BRANCH
  information_cutoff: null
  goal: ""
  observed_state: {}
  resources: {}
  constraints:
    production_touch_allowed: false
    permissions: []
  evidence:
    facts: []
    inferences: []
    hypotheses: []
    unknown: []
    source_links: []
  belief_state: {}
  model_version: "v4"
  forecast_from_previous_point: {}
  prediction_errors: {}
  actions_feasible_now: []
  actions_excluded_with_reason: []
  future_paths: []
  selected_action: null
  selection_status: TEST | DO | WATCH | DROP | WAIT_FOR_OBSERVATION
  actual_execution: NOT_EXECUTED
  next_actual_observation: PENDING
```

Never relabel SIMULATED_BRANCH as FACT / OBSERVED_REALITY. A historical replay observation may be real evidence from the past but must respect **the historical information cutoff**; it is not live forward prediction proof.

## 3. POINT_REVIEW algorithm

```text
POINT_REVIEW(point, horizon, budget):
    read only facts accessible at point.information_cutoff
    separate FACT / INFERENCE / HYPOTHESIS / UNKNOWN
    if OBSERVED: compare with prior forecast; update beliefs once per unique evidence event
    if SIMULATED_BRANCH: update a branch-local hypothetical belief ONLY
    if missing observation: return WAIT_FOR_OBSERVATION
    if unforeseen result: return MODEL_MISS; do not retrofit certainty
    if stop/goal achieved: return TERMINAL

    A = ALL declared feasible actions under current resources, tools and permissions
    include KEEP_BASELINE / DO_NOTHING and useful TEST/WAIT choices
    if number or cost of declared paths exceeds budget:
        record UNEXPLORED and BUDGET_EXHAUSTED; never claim total coverage

    for each action a in A:
        for each plausible world / nature outcome / observation available in the declared scope:
            child = hypothetical causal transition(point,a,outcome)
            child.policy = POINT_REVIEW(child,horizon-1,remaining_budget)
    evaluate full contingent policy with opportunity cost, downside, uncertainty and reversibility
    never rank only by the best possible leaf or locally most attractive first action
    return a conditional policy based on OBSERVABLE evidence

ON_NEW_REAL_OBSERVATION(root,event):
    require independent provenance and de-duplicate event
    append realized outcome only for action actually authorized/executed
    compare before-the-fact forecast with observation, including misses
    reroot as a NEW observed point, with a new bounded future horizon
    call POINT_REVIEW again; choose only next currently authorized step
```

When probability estimates lack evidence, retain UNKNOWN or explicit scenario ranges. Do not invent ROI, likelihoods or weights.

**Planning may explore every defined simulated route. Real-world execution can take at most one authorized action at a time.** If every branch is blocked or no evidence is available, choose WAIT / TEST / STOP rather than hallucinating a result.

## 4. How it plugs into existing AOM V0.3, without rewriting it

| Original AOM step | Optional addition only when activation gate passes |
|---|---|
| DISCOVER | Include later-unlocked alternatives and KEEP/DO_NOTHING; do not falsely promise every real-world possibility has been enumerated |
| VALIDATE | Label each branch by model assumption and source; record contradictory evidence |
| COMPARE | Evaluate complete paths/contingent policies, downside, option value and ability to learn |
| ALLOCATE | Keep DO/TEST/WATCH/DROP; select one authorized next real action |
| EXECUTE | Apply original Skill–Tool Selection Gate and permission boundary; run nothing external just because the model predicts gain |
| LEARN | Compare precommitted forecast with observed result, update only observed belief, reroot a fresh Multiverse |

AOM's skill/tool routing remains a gate at **every re-root**, not just at the first decision. Reusing already connected, fit-for-purpose tools remains the default.

## 5. AOM reviews its OWN Markdown: example decision tree

**Real starting evidence:** AOM V0.3 already includes Mission, Capability-first, Evidence-first, Skill–Tool Fit, bounded autonomy, baseline/no action and a six-step decision process. Continuous Multiverse v4 adds explicit hypothetical/observed separation, branch re-root, and status for missing or contradictory evidence.

**S1: Which Markdown development decision should AOM make?**
- A: **KEEP V0.3**. Minimizes editing cost; lacks explicit per-node multiverse protocol. Valid BASELINE.
- B: **TEST optional C1 layer separately in Test-LaB**. Preserves AOM while testing missing point-level rules, at low irreversible risk. SELECTED FOR TEST, not automatic adoption.
- C: FULL MERGE v4 into original AOM file. More coupled and verbose; high review/maintenance cost before behavioral evidence. WATCH, not selected.
- D: BUILD custom agent/plugin/app. Violates build-last absent a proven gap. DROP.
- E: MODIFY production websites/social publishing to try AOM. Excluded by current explicit user constraints; NOT FEASIBLE.

**S2: What happens after a read-only structural check of B?**
- If FAIL → REVISE candidate only, do not change production/source AOM.
- If PASS → keep original AOM, move to **read-only historical replay**, freeze predictions before revealing next real historic event. Merely adding Markdown is not proof that decisions improve.
- If connector unavailable → SKIP / AVAILABLE ALTERNATIVE / WAIT; never pretend a tool succeeded.

**S3 after future behavioral comparison (outcomes not yet observed):**
- If same-age, matched-budget, prospective held-out evaluation clearly supports lower decision error with tolerable tool cost → propose controlled ADOPT for suitable tasks, still no automatic source overwrite.
- If no improvement or higher cost without extra value → REJECT C1 and continue V0.3.
- If data inconclusive → PENDING / collect legitimate read-only evidence, no production experiment.
- If safety or permission constraints change → recompute feasible actions immediately, do not continue a stale plan.

Each S2/S3 condition is a future **contingency**, not an outcome that has happened.

## 6. Small evidence record

```yaml
review_run:
  source_aom_version: "V0.3"
  candidate_version: "C1"
  goal: "Improve multi-step decision quality without production disruption"
  baseline: "KEEP_V0.3"
  observations_now: []
  declared_options: [KEEP, CANDIDATE_ADDENDUM, FULL_MERGE, BUILD]
  hard_exclusions: [PRODUCTION_WRITE, UNNECESSARY_BUILD]
  per_option_futures: []
  chosen_next_step: "READ_ONLY_STRUCTURAL_TEST"
  scenario_coverage: "DECLARED_ONLY"
  unobserved_futures: UNKNOWN
  source_modified: false
  user_production_modified: false
  behavioral_value_verdict: UNVERIFIED
```

## 7. Adoption criteria (not met yet)

1. Original AOM V0.3 file remains unchanged.
2. Every action in the declared bounded scenario set is evaluated; no lucky-leaf or future-information leakage.
3. A simple task avoids gratuitous multiverse exploration.
4. Production restrictions prevail when documents suggest an attractive but unauthorized action.
5. Branch-local hypothetical observations NEVER update observed AOM beliefs.
6. After real or historic read-only evidence appears, forecasts are scored against what was knowable **at the time** and new decisions are rerooted.
7. Matched-budget tests show meaningful **behavioral** gains rather than only structural/checklist compliance; otherwise DO NOT ADOPT.

**Current verdict:** CANDIDATE_FOR_TEST. AOM V0.3 remains the operative source; this standalone Markdown does not train a model, run a live simulation, or modify production.
