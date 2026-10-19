---
title: "Continuous Multiverse World Model v4 — Every Point Is a Decision, Root, and Learning Point"
version: "4.0.1"
date: "2026-10-19"
language: "th"
artifact: "Markdown operating instructions"
project: "Independent Multiverse World Model / Test-LaB"
source_repo: "https://github.com/nustanakritwithai/Test-LaB"
supersedes: "world-model/ADAPTIVE_DECISION_SKILL_v3.md"
reference_test: "tests/continuous_multiverse_v4.js"
bounded_reference_test: "tests/bounded_multiverse_v4_1.js"
mode: "ON_DEMAND / EVIDENCE_TRIGGERED"
status: "INDEPENDENT_PROJECT / FINITE_SYNTHETIC_LOGIC_VERIFIED / REAL_WORLD_PREDICTIVE_SKILL_UNVERIFIED"
---

# CONTINUOUS MULTIVERSE WORLD MODEL v4

**Independent project notice (2026-10-20):** This Multiverse Markdown is developed and tested independently. It is NOT a mandatory AOM Skill, plugin, operating layer, or central system; the earlier merger proposal is cancelled. Keep its models, tests, revisions and adoption decisions separate. See [Independent Development Policy](../INDEPENDENT_DEVELOPMENT_POLICY.md). Historical AOM comparisons remain research records only.

> **ทุกจุดที่ยังไม่จบภารกิจ = Decision Point + Universe Root + Learning Point**
>
> เมื่ออยู่ ณ จุด t ให้ประเมินสถานการณ์ S_t (สถานะจริงถ้ามีหลักฐาน / สถานะสมมติถ้าอยู่ในกิ่งจำลอง), เรียนรู้จากประวัติที่มีสิทธิ์ใช้, เปิดทางเลือกที่ทำได้จริงทั้งหมดในขอบเขตที่กำหนด, จำลองทุกผลลัพธ์ที่นิยามไว้จนถึง horizon, ประเมิน contingent policy ทั้งต้นไม้, เลือกก้าวถัดไปที่สอดคล้องกับสิ่งที่สังเกตได้, แล้วเมื่อมี observation ใหม่ **ปักรากต้นไม้ใหม่** ณ จุด t+1 และทำซ้ำ

## 1. สำคัญ: สองจักรวาลต้องไม่ปนกัน

| ชั้น | สิ่งที่ทำ | หลักฐานที่อัปเดตได้ | การลงมือ |
|---|---|---|---|
| **VIRTUAL MULTIVERSE** | แตกทุก action × nature outcome × observable event แล้วใช้กฎ POINT_KERNEL ซ้ำกับลูกทุกตัว | ความเชื่อเฉพาะกิ่ง (hypothetical posterior), ไม่ใช่ข้อเท็จจริงที่เกิดขึ้น | ห้ามกระทบโลกจริง |
| **OBSERVED CONTINUITY** | รับผลที่สังเกตได้จริงของก้าวที่ได้รับอนุญาต, ตรวจ prediction error, อัปเดต beliefs และทำ root ใหม่ | เหตุการณ์จริงที่มี provenance; หรือ fixture ที่ประกาศว่า synthetic สำหรับการทดสอบ | ทำจริงได้เฉพาะก้าวที่อนุมัติแล้ว |
| **LEARNING ACROSS RUNS** | เก็บประวัติ forecast-before-observation → outcome → scoring → model revision | ประวัติที่ตรวจสอบได้และไม่ซ้ำ | เปลี่ยนวิธีประเมินอย่างมีหลักฐาน ไม่ใช่บอกว่า AI เรียนรู้เองโดยไม่มีข้อมูล |

**Epistemic Firewall:** เหตุการณ์ที่เกิดเฉพาะในกิ่งจำลองต้องไม่มีวันถูกเขียนเป็นเหตุการณ์จริง ไม่ใช้ข้อมูลโลกอนาคตเพื่อเลือกก้าวปัจจุบัน และไม่อัปเดต posterior ของโลกจริงด้วยผลสมมติ.

เมื่อไม่มี observation ใหม่ ให้สถานะ **WAIT_FOR_OBSERVATION**; ห้ามแต่งผลลัพธ์แล้วจำลองต่อราวกับเกิดจริง. Markdown และ ChatGPT ไม่ใช่บริการรันเบื้องหลังต่อเนื่องโดยตัวมันเอง; การทำต่อเมื่อมี trigger ต้องเกิดในรอบที่เข้าถึงข้อมูลและได้รับอนุญาตเท่านั้น.

## 2. สัญญาโหนดเดียว (Uniform Point Contract)

ทุก nonterminal node ไม่ว่าจะเป็นจุด 1, 2, 3 หรือจุดในกิ่งเสมือน ต้องตอบคำถามและเก็บข้อมูลชุดเดียวกัน:

~~~yaml
point:
  point_id: S2
  parent_point_id: S1
  root_revision: R2
  mode: OBSERVED_REALITY | OBSERVED_FIXTURE | SIMULATED_BRANCH
  model_version: v4.0.0
  objective: {}
  observed_time: null
  state:
    resources: {}
    capabilities: []
    commitments: []
    constraints: {}
    environment: {}
  belief:
    hypotheses: []
    parameters: {}
    probability_status: ASSUMPTION | CALIBRATED | UNKNOWN
  history:
    prior_observation_ids: []
    actions_taken: []
    forecast_readback: {}
    observed_outcomes: []
    model_misses: []
  learning:
    previous_forecast: {}
    new_evidence: []
    prediction_errors: {}
    updated_belief: {}
    model_revision: null
  decision:
    skill_tool_fit: {}
    feasible_actions: []
    excluded_actions_with_reasons: []
    candidate_policies: []
    evaluation: {}
    chosen_next_action: null
  future:
    declared_branch_space: {}
    next_point_forecasts: []
    recursive_depth: 0
    branch_coverage: null
    unexplored_branches: []
  execution:
    authorization: UNREQUESTED | ALLOWED | DENIED
    action_state: SIMULATED | NOT_EXECUTED | EXECUTED | VERIFIED
    next_reality_observation: PENDING
~~~

Do not invent source IDs, probabilities, observations or actual actions.

## 3. POINT_KERNEL — ทุกจุดใช้กฎเดียวกัน พร้อม Global Shared Budget

**v4.0.1 correctness patch (2026-10-19):** เดิม pseudocode ส่งตัวเลข resource_budget ค่าเดิมลงลูกแต่ละกิ่ง ซึ่งยังไม่บังคับใช้เพดานงบรวมจริง. ในการจำลองหนึ่งครั้งให้สร้าง **Shared Ledger เพียงชุดเดียว** ทุกโหนดต้องหักจาก ledger เดียวกัน และใช้ frontier แบบ breadth-first พร้อมความเป็นธรรมระหว่างกลุ่มทางเลือกแรกเมื่อทรัพยากรมีจำกัด. ไม่ต้องเขียน framework ใหม่; มี reference test ใน [bounded_multiverse_v4_1.js](../tests/bounded_multiverse_v4_1.js).

~~~text
POINT_KERNEL(node):
    require node.mode in {OBSERVED_REALITY, OBSERVED_FIXTURE, SIMULATED_BRANCH}
    if goal_reached or explicit_stop or terminal_constraints:
        return TERMINAL(reason, final_state)
    if horizon_remaining == 0:
        return HORIZON_BOUNDARY(continuation_unknown=true)

    reconstruct current state, allowed observations, resources, capabilities
    compare previous forecast with latest observation IF node is observed
    label FACT / INFERENCE / HYPOTHESIS / UNKNOWN
    if node.mode == SIMULATED_BRANCH:
        learning_scope = BRANCH_LOCAL_HYPOTHETICAL_ONLY
    else:
        learning_scope = OBSERVED_WITH_PROVENANCE
    if observation contradicts all declared possible outcomes:
        return MODEL_MISS, preserve evidence, reopen hypotheses
    return locally_feasible_actions_including_STOP_WAIT_TEST_when_meaningful

PLAN_BOUNDED(root, lookahead_horizon, max_work_units):
    shared_ledger = {limit: max_work_units, used: 0}  # create ONCE per planning run
    frontier = [{node:root, depth:0, root_action:null}]
    while an affordable nonterminal node exists:
        # Prefer shallower nodes; among equal depths share expansions fairly
        # across first-action groups. Do NOT use early reward to delete branches.
        current = shallowest_affordable_node_with_fair_root_action(frontier)
        A = POINT_KERNEL(current.node)
        if current.node is TERMINAL or HORIZON_BOUNDARY: mark terminal; continue
        immediate_edges = count_all_declared_outcome_edges(A)
        atomic_cost = 1 + immediate_edges
        if shared_ledger.used + atomic_cost > shared_ledger.limit:
            mark current.node UNEXPLORED, retain it and try other affordable nodes
            continue
        shared_ledger.used += atomic_cost  # debit BEFORE expanding; NEVER clone
        for each feasible action a in A:
            for each declared world hypothesis m and nature outcome w:
                for each observable result o allowed by w:
                    child = causal_transition(current.node, a, m, w, o)
                    update only child's hypothetical belief from its branch
                    enqueue child on THE SAME frontier/ledger (if nonterminal)
                    record declared transition and provenance
        assert shared_ledger.used <= shared_ledger.limit

    # Branches not visited must be tracked as UNKNOWN/UNEXPLORED, never as bad.
    # Numerical bounds below require grounded/explicitly declared
    # likelihoods, rewards and terminal limits; otherwise mark UNKNOWN.
    propagate sound lower/upper continuation bounds to all expanded parents
    for each feasible first action a:
        evaluate complete observation-contingent policy bounds for a
    if some a.lower >= every other feasible b.upper:
        certificate = CERTIFIED_WITHIN_DECLARED_MODEL
        selected_first_action = a  # may certify despite incomplete coverage
    else:
        certificate = ABSTAIN_UNCERTIFIED
        selected_first_action = NONE
    return {selected_first_action, certificate, shared_ledger,
            explored_count, unexplored_frontier,
            status: COMPLETE or BUDGET_EXHAUSTED}

REALITY_LOOP(root, lookahead_horizon=H, per_round_budget):
    while authorized, objective not terminal and real-run budget available:
        # New *observed* root may receive a new authorized budget.
        # Its hypothetical descendants DO NOT receive fresh budgets.
        plan = PLAN_BOUNDED(root, H, per_round_budget)
        store pre-action forecast, coverage, tool choice and model version
        if plan.certificate == ABSTAIN_UNCERTIFIED:
            return WAIT_FOR_EVIDENCE_OR_BUDGET  # no invented decision
        if plan.selected_first_action == STOP or goal_reached: return TERMINAL
        if selected action requires approval but is not authorized:
            return STOP_FOR_APPROVAL
        execute at most ONE authorized real action (if required)
        try to obtain its independently verified observation
        if no verified observation: return WAIT_FOR_OBSERVATION
        append exactly one unique observed event with provenance
        compare the pre-action prediction with actual observed event
        update ONLY observed-root beliefs using legitimate evidence
        root = newly observed successor at t+1
        # Start a NEW depth-H multiverse with a fresh budget at the new real root.
    return CHECKPOINT / STOP / WAIT / MODEL_MISS
~~~

**Accounting/proof boundary:** 1 WORK_UNIT in the reference fixture = one expanded decision or one evaluated immediate nature-transition edge. This caps modeled tree work, **not** actual wall time, memory, token usage or third-party costs. Certifying a first action requires **valid model-derived bounds**; without grounded bounds/probabilities, retain UNKNOWN and do not fabricate a winning policy. A budget cap can stop with BUDGET_EXHAUSTED even if a first action is already certified; certification is not the same as 100% branch coverage.

**Reference scope:** The isolated toy script passed 52 deterministic checks (full reference 1,678 nodes and 1,677 work units). This is a correctness regression on a declared finite synthetic environment, **not real-world predictive or AOM behavioral superiority**. See [Cycle 014](../experiments/2026-10-19-cycle-014-bounded-multiverse-budget-test.md). The original exhaustive reference remains available as [continuous_multiverse_v4.js](../tests/continuous_multiverse_v4.js).

**เหตุผลของ fixed-depth re-root:** ที่จุด 2, 3, 4... ให้ใช้ horizon H ใหม่เสมอสำหรับการจำลองล่วงหน้า แม้ก้าวจริงจะเดินไปเรื่อย ๆ. จะคงการกำหนด resource budget, termination และอนุมัติการกระทำแยกต่างหากเพื่อไม่ให้เกิด infinite execution.

## 4. สถานะที่แต่ละจุดต้องประเมินใหม่ (ไม่คัดลอกจากจุดเดิม)

1. **Where am I?** ทรัพยากร เวลาที่เหลือ สภาพแวดล้อม ต้นทุนแฝง ความเสี่ยง ทางเลือกที่ถูกล็อก/ปลดล็อก
2. **What changed?** ต่างจาก forecast ของจุดก่อนหน้าตรงไหน? คาดผิดจาก causal assumption, sensor, delay, new actor หรือ unknown?
3. **What do I know now?** สังเกตโดยตรง/อนุมาน/สมมติ/ไม่ทราบ; ใครตรวจยืนยัน?
4. **What can I do now?** STOP, WAIT, TEST, EXECUTE, CONNECT EXISTING TOOL และทางเลือกที่เกิดใหม่; ทุก action ต้องผ่าน permission + resource feasibility.
5. **What happens at the next point?** จำลอง action × world × uncertainty × observation; ระบุทรัพยากรและความสามารถใหม่, ไม่ใช่เพียงคะแนนรวม.
6. **What could happen after that?** เรียก POINT_KERNEL ที่ S(t+1) ในแต่ละกิ่งเพื่อประเมินทางแยก S(t+2) ต่อทันที.
7. **What should be chosen?** เปรียบเทียบทั้ง policy ที่ปรับตาม observation; expectation เฉพาะเมื่อ probability grounded/explicitly assumed. ไม่มีน้ำหนักที่มีเหตุผลให้แสดง Pareto/ranges และ UNKNOWN.
8. **What should be learned afterward?** เก็บ forecast ก่อนทำ → observation หลังทำ → loss/calibration → update; สำรวจ model miss, ไม่แต่งข้อมูลย้อนหลัง.

**Important:** ทุก *nonterminal* จุดทำทั้งสามบทบาท; terminal state ที่หยุดแล้วไม่ควรสร้าง action หรือ branch เทียม.

## 5. Memory / Learning ด้วยข้อมูลก่อนหน้า

### 5.1 Branch-local hypothetical learning

สมมติว่า hidden rate of success \(\theta\) มี Beta prior: \(\theta \sim \mathrm{Beta}(\alpha,\beta)\). หลัง **สังเกตสมมติในกิ่ง** SUCCESS → (\alpha+1,\beta), FAILURE → (\alpha,\beta+1), แต่การอัปเดตนี้อยู่เฉพาะในกิ่งจำลอง ห้ามส่งไปยัง observed root. เป็น posterior ในโลกสมมติ ไม่ใช่ evidence ของโลกจริง.

### 5.2 Observed learning

เมื่อมี **actual observation** จาก action ที่ได้ทำจริง จึงอัปเดตพารามิเตอร์ของ observed root ใหม่ และบันทึก:
- prior / posterior, observation_id, source, tool_version, timestamp
- forecast ที่ commit ก่อน observation, risk and realized outcome
- prediction residual and proper scoring (เช่น Brier/log-loss สำหรับ binary probability prediction)
- change to feasible options / constraints / chosen next action
- missing data, model miss, uncertainty and any contradictory sources

Observation เดียวกันห้ามนับซ้ำโดยอ้างหลายโพสต์/หลายไฟล์เป็นคนละ observation. อย่าตีความ posterior update หนึ่งครั้งว่าโมเดลเรียนรู้โลกจริงได้แม่นยำขึ้นแล้ว; ต้องประเมินแบบ out-of-sample และเปรียบเทียบกับ baseline.

### 5.3 Skill learning (meta-level) across iterations

Meta-skill update decisions may change **which existing tool to use, horizon, experiment value, calibration, risk response and hypothesis set**, but only with outcome evidence and versioned evaluation. Store training and evaluation periods separately. If calibration worsens or a policy fails out of sample, downgrade confidence / rollback to safer baseline.

## 6. Action scoring ที่เคารพอนาคต

For each action a at point t, a reference recursion is:

\[
Q_t(h_t,a)=\sum_{o,s'} P(o,s'\mid h_t,a)\,[r(s_t,a,s')+\gamma V_{t+1}(h_t,a,o)]
\]

\[
V_t(h_t)=\max_{a\in A_{\mathrm{feasible}}(h_t)} Q_t(h_t,a)
\]

h_t = observed history, s' = possible future state (not revealed in reality), o = possible visible observation; continuation chooses actions based on visible h_t and o, not hidden s'. Respect safety, hard resources and authorization before optimization. Model-based scores do not imply real-world optimality. Use a range/unknown when likelihood missing. Treat severe downside explicitly when expectation alone is insufficient.

**Never discard an early disadvantage merely because a local score is worse.** If computation runs out of budget, preserve the branch as UNEXPLORED and report incomplete coverage; do not silently assume it is unimportant.

## 7. Formal statuses and guards

- SIMULATED_BRANCH — simulated transitions; **never external mutation**
- OBSERVED_FIXTURE — synthetic observation provided by deterministic test; useful for logical tests **not real-world evidence**
- OBSERVED_REALITY — third-party readback / measurement anchored to an authorized actual action and evidence
- WAIT_FOR_OBSERVATION — stop the active loop; no guessing outcomes
- MODEL_MISS — actual / fixture observed event is outside declared outcome set, re-open hypotheses
- HORIZON_BOUNDARY — finite simulated continuation limit, **not** a real terminal result
- STOP / GOAL_REACHED — true terminating condition
- STOP_FOR_APPROVAL — external/destructive/irreversible action needs authorization
- BUDGET_EXHAUSTED — incomplete coverage explicitly logged with counts and resumable checkpoint
- TOOL_BLOCKED — use best existing alternative if it serves the objective; otherwise mark blocked without pretending success

## 8. Test-LaB reference demonstration

- **Reference executable:** [tests/continuous_multiverse_v4.js](../tests/continuous_multiverse_v4.js) — Node.js 18+ standard library only, run with `node tests/continuous_multiverse_v4.js`.
- **Results and verification:** [Cycle 012 — Continuous Multiverse v4](../experiments/2026-10-19-cycle-012-continuous-multiverse.md).
- Example intentionally contains only a Beta-Bernoulli world with 3 actions (STOP, PROBE, COMMIT), 2 possible outcomes and finite lookahead H=5, not an arbitrary physics/social/economic simulator.
- A point updates its belief after a hypothetical or fixture observation, generates its own feasible actions, forecasts the next node and recursively evaluates all declared branches. Each observed fixture point rebuilds a new H=5 tree.
- Existing tools only: Node.js for arithmetic, Markdown for instructions/evidence, GitHub for versioned records. **No framework, new Plugin, external service, database, cron, or autonomous app.**

## 9. Measurable acceptance gates

- [x] Every nonterminal simulated child is evaluated recursively using identical rules.
- [x] Every *observed fixture* point re-roots a new horizon-H tree, not simply a descendant of a stale tree.
- [x] Branch-local posterior updates never modify the observed parent.
- [x] New information at S2 changes selection at S2 and changes the forecasts for S3.
- [x] An unfavorable subsequent outcome can change S3/S4 selection.
- [x] Outcome-dependent decision follows **observable result**, not hidden lucky world state.
- [x] Resource-constrained actions are excluded.
- [x] STOP and horizon boundary are distinct.
- [x] Unknown observation → MODEL_MISS without invented learning.
- [x] No observation → WAIT_FOR_OBSERVATION; no fabricated continuation.
- [x] Full declared finite-tree enumeration (all feasible actions / outcomes in H=5 fixture).
- [ ] Real-world rollout with proper measurement and explicit authorization.
- [ ] Forecast calibration on fresh out-of-sample data.
- [ ] Demonstrated decision quality vs a credible real-world control.
- [ ] General world transition model beyond the declared toy environment.

**STATUS:** LOGIC VERIFIED ON SYNTHETIC FINITE EXAMPLES ONLY. In real workflows, the loop resumes only when a real observation and authorized interaction are available.
