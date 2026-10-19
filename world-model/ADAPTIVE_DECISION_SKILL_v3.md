---
title: "Multiverse World Model v3 — Adaptive Decision Skill"
version: "3.0.0"
date: "2026-10-19"
language: "th"
artifact: "Markdown operating instructions"
parent: "Multiverse Causal World Model v2"
lab: "https://github.com/nustanakritwithai/Test-LaB"
status: "DESIGN_SPECIFICATION / FINITE_SYNTHETIC_TEST"
new_app_required: false
new_plugin_required: false
---

# Multiverse World Model v3 — Adaptive Decision Skill

> **แต่ละจุดไม่ใช่เพียงกิ่งในต้นไม้ แต่เป็นสถานการณ์ใหม่ที่ต้องประเมินซ้ำ**
>
> จุด 1 → จำลองจุด 2; ที่จุด 2 ให้ประเมินสถานะ ณ จุด 2 อย่างเป็นอิสระ แล้วแตกทุกการกระทำที่ทำได้จากจุด 2 ไปยังทุกสถานการณ์ที่เป็นไปได้ของจุด 3 จากนั้นเลือกเฉพาะก้าวจริงถัดไปตามข้อมูลที่รู้ ณ ขณะนั้น ทำขั้นตอนนี้ซ้ำทุกจุด

## 0. ขอบเขตและความแตกต่างจาก v2

v2 เน้น **แตกจักรวาลให้ครบตามขอบเขต + นโยบายไม่ใช้ข้อมูลอนาคต**. v3 เพิ่ม **ทักษะเลือกใหม่ที่ทุกจุด และพัฒนาทักษะเลือกจากความคลาดเคลื่อนของการคาดการณ์**.

**แกน 2 ชั้นที่ต้องทำพร้อมกัน:**

- **COUNTERFACTUAL ROLLOUT:** เดินทางทุกทางในแบบจำลอง (เฉพาะ action, outcome, observation และ model hypothesis ที่นิยามและเป็นไปได้) เพื่อเห็นผลต่อเนื่องและทางแยกใหม่
- **REALITY RECEDING-HORIZON CONTROL:** โลกจริงเดินได้เส้นทางเดียวต่อหนึ่งรอบ; เมื่อถึงจุดใหม่ ให้สังเกตสถานะจริง เทียบกับคำทำนาย สร้างต้นไม้ใหม่จากหลักฐานล่าสุด แล้วเลือกการกระทำถัดไป

เมื่อจำลองถึงจุด 2 ให้ใช้ **SIMULATED_POINT_2** ไม่ใช่แอบอ้างว่าเป็นสถานะจริง; เมื่อไปถึงจุด 2 จริง ให้แทนต้นรากด้วย **OBSERVED_POINT_2** และคำนวณใหม่ทั้งหมดที่เกี่ยวข้อง

**ข้อห้าม**: ห้ามเลือกจากกิ่งที่โชคดีที่สุดและแอบใช้ความรู้ผลลัพธ์ซึ่งยังสังเกตไม่ได้; ห้ามถือว่า simulation = proof of real-world outcomes; ห้ามมอบ probability หรือ ROI ตัวเลขโดยไม่มีฐานข้อมูลหรือสมมติฐานที่ระบุชัดเจน; ห้ามตัดกิ่งที่เสียเปรียบช่วงแรกเพียงเพราะคะแนนเฉพาะหน้า

## 1. Representation ที่ทุกจุด

~~~yaml
point:
  id: S2
  mode: SIMULATED_POINT | OBSERVED_REALITY
  parent: S1
  time: step_2
  evidence:
    observed: []
    inferred: []
    unknown: []
    sources: []
  state:
    resources: {cash: 90, time: null, attention: null}
    constraints: {permissions: [], limits: []}
    capabilities: []
    commitments: []
    environment: {}
  beliefs:
    hidden_variables: {}
    model_hypotheses: []
    likelihoods_evidence_basis: ASSUMED | CALIBRATED | UNKNOWN
  forecast_from_parent: {}
  prediction_residuals: {}
  feasible_actions: []
  predicted_next_states: []
  selected_policy_for_observation: null
  real_action_status: NOT_EXECUTED
  feedback_status: NOT_OBSERVED
~~~

ทุกค่าในตัวอย่างเป็นข้อมูลสมมติ ไม่ใช่ข้อมูลปฏิบัติการจริง

แยก **state** (สิ่งที่เกิดขึ้น/ทรัพยากร), **belief** (สิ่งที่เชื่อภายใต้ความไม่รู้), **observation** (สิ่งที่สังเกตได้), **policy** (กฎเลือกตามข้อมูล), **model hypothesis** (กลไกที่อาจเป็นจริง), **outcome** (เหตุการณ์ที่ควบคุมไม่ได้) ออกจากกันเสมอ

## 2. Decision Skill เมื่ออยู่ที่จุด 2

### PHASE A — OBSERVE / STATE RECONSTRUCTION

1. รับ snapshot ณ จุด 2 และลงป้าย **REAL_OBSERVATION** หรือ **SIMULATION**.
2. เทียบกับ S2 ที่คาดจากจุด 1: ส่วนใดผิดไป? ทรัพยากร โอกาส เวลา ความสามารถ คู่แข่ง สิทธิ์ เงื่อนไข ระบบภายนอกเปลี่ยนหรือไม่?
3. ระบุ observable vs latent; แยก FACT / INFERENCE / HYPOTHESIS / UNKNOWN.
4. ประเมินคุณภาพแหล่งข้อมูลและปรับ belief; ถ้าความน่าจะเป็นไม่ทราบ ต้องคง UNKNOWN หรือช่วงค่าที่มีหลักฐานรองรับ ไม่สร้างตัวเลขขึ้นเอง
5. สร้างชุด action ที่ **ทำได้ตอนนี้** จากข้อจำกัดและความสามารถปัจจุบัน ไม่ยึดชุด action จากจุด 1. รวม STOP/WAIT/TEST เมื่อมีเหตุผล

### PHASE B — FORK / FORECAST จุด 2 → จุด 3

สำหรับทุก action ที่ feasible ณ จุด 2:

1. แตกตาม model hypotheses ที่มีหลักฐานหรือเป็นสมมติฐานประกาศไว้
2. แตกตาม external outcomes (nature/market/randomness) ที่ประกาศไว้
3. คำนวณ causal transition ไปยัง S3: resources, capability, knowledge, risk, commitments, external effects
4. จำลอง observation ที่จุด 3 (ไม่ถือว่า AI รู้ hidden state) และสร้าง action set ใหม่ ณ จุด 3
5. ต่อ rollout ไปถึง horizon ที่ประกาศ เมื่อการตัดสินใจปัจจุบันมีผลระยะยาว; ไม่จำกัดอยู่เพียงคะแนน S3 ถ้าความสำเร็จจริงอยู่ไกลกว่านั้น
6. เก็บ branch coverage เทียบกับชุดผลลัพธ์ *ที่นิยามไว้เท่านั้น*; หากขอบเขตใหญ่เกินให้ระบุ UNEXPLORED / BUDGET_EXHAUSTED ไม่กล่าวอ้าง exhaustive

### PHASE C — EVALUATE / CHOOSE

- ประเมินตามเป้าหมายตลอด horizon ไม่ใช่ผลตอบแทนก้าวเดียว
- ก่อนคะแนน ใช้ hard constraints: กฎหมาย สิทธิ์ ความปลอดภัย ทรัพยากรที่ใช้ได้จริง และการอนุมัติ
- เปรียบเทียบ expected outcome เฉพาะเมื่อมี likelihood; พร้อม downside, worst plausible case, risk limits, resource opportunity cost, future options, uncertainty, reversibility, information value
- หากเป้าหมายหลายมิติและยังไม่มี weights อย่าแต่งคะแนนรวม; แสดง Pareto trade-offs และระบุว่า preference ขาด
- สร้าง **conditional policy**: ถ้า observation ณ จุด 2 = X ให้เลือก A; ถ้า = Y ให้เลือก B; ห้ามใช้ hidden model state หรือเหตุการณ์ S3 ที่ยังไม่เกิด
- หากข้อมูลยังไม่พอที่จะเลือกก้าว irreversible ให้พิจารณาการทดสอบแบบ reversible ก่อนตามต้นทุน/มูลค่าข้อมูล
- ลงมือจริงเพียงก้าวถัดไปที่ได้รับอนุญาต; การจำลองอย่างเดียวใช้สถานะ NOT_EXECUTED

### PHASE D — LEARN / REPLAN

หลังจากมี **ข้อมูลจริง** ของจุด 3:

1. บันทึก actual S3 และตรวจผลสำเร็จแยกจาก tool-call success
2. เปรียบเทียบ predicted S3 distribution กับ actual S3; บันทึก forecast error / violated assumptions / unmodeled branch
3. ปรับความน่าเชื่อถือของโมเดลและ likelihood เมื่อมีหลักฐานเพียงพอ; ตัวอย่างเดียวไม่ใช่เหตุให้สรุปความแม่นยำของโลก
4. ปรับ value function, constraints, tool-choice heuristics เมื่อพบผลซ้ำและมีเหตุผลสนับสนุน
5. เก็บ regret เฉพาะที่ประเมินได้: **model-regret เป็นการวัดภายในโมเดล**; real counterfactual ที่ไม่ได้ทำจริงยัง UNKNOWN เว้นแต่มี control หรือหลักฐานที่เหมาะสม
6. ปักรากใหม่ที่ OBSERVED_POINT_3; แตกทุกการกระทำจากจุด 3 ไปยังจุด 4
7. เก็บ decision log, parameter version, source และ condition ที่จะเปลี่ยนคำตอบครั้งถัดไป

## 3. Policy improvement คือ "ทักษะเลือก" ไม่ใช่จำคำตอบ

ตัวตัดสินไม่ควรจำว่า **FAST** หรือ **LEARN** ดีเสมอ แต่ต้องได้กฎที่ขึ้นกับสถานการณ์:

- หากการทดสอบให้ข้อมูลที่เปลี่ยน action ณ จุด 2 ได้อย่างคุ้มค่า การเรียนรู้ก่อนอาจชนะผลตอบแทนระยะสั้น
- หาก observation ไม่แม่นพอ มูลค่าข้อมูลลดลง จึงควรทบทวนว่าการเรียนรู้คุ้มหรือไม่
- หาก belief ใหม่บ่งชี้ว่าโอกาสสำเร็จน้อยลง ทางเลือกดีที่สุดอาจสลับกลับไปใช้ action เดิม
- หากถึงจุด 2 จริงแล้ว cash หรือ permission ต่างจากคาด ให้ประเมิน feasibility ใหม่ทันที แม้เคยคาดว่า SCALE จะดี
- หากโลกเกิดรูปแบบไม่อยู่ในโมเดล ให้บันทึก **MODEL_MISS / UNKNOWN**, ขยายสมมติฐานและประเมินใหม่ ไม่อ้างว่าทำนายทุกอนาคตไว้แล้ว

**Selection Skill ระดับ v3 ต้องเปลี่ยน policy ได้เมื่อข้อมูลเปลี่ยน และอธิบายว่าเหตุใดการเปลี่ยนนั้นสมเหตุสมผล**

## 4. Decision rule — Lookahead จากแต่ละจุด

ให้ history ของสิ่งที่สังเกตได้ถึงจุด t เป็น h_t, belief เป็น b_t และ action เป็น a_t

\( Q_t(h_t,a_t) = \sum_{s_{t+1},o_{t+1}} P(s_{t+1},o_{t+1}\mid h_t,a_t) [r_t + \gamma V_{t+1}(h_t,a_t,o_{t+1})] \)

โดย \( V_t(h_t) = \max_{a_t \in A(h_t)} Q_t(h_t,a_t) \) ภายใต้ hard constraints / risk criteria ที่กำหนด

**หมายเหตุ**: สมการ expectation ใช้ได้เมื่อ likelihood ได้รับการกำหนดชัดเจน; ถ้าไม่ทราบ ให้รายงานหลาย scenario หรือช่วงผลลัพธ์แทนคะแนนที่ดูแม่นยำเกินจริง

~~~text
ASSESS_POINT(t):
  determine OBSERVED_REALITY or SIMULATED_NODE
  build observed state S_t and uncertainty/belief B_t from history
  reconcile predicted vs observed S_t; mark model mismatch
  A_t = enumerate all declared feasible actions in updated state
  for each action a in A_t:
      for each declared causal model m:
          for each feasible external outcome n:
              S_next = transition(S_t, a, m, n)
              for each possible observation o from S_next:
                  B_next = update_belief(B_t, a, o)
                  OPTIONS_next = feasible_actions(S_next observable parts, B_next)
                  extend simulation recursively within horizon/budget
      evaluate the whole contingent policy (never one lucky leaf)
  POLICY_t = choose best evidence-supported feasible action by criterion
  if t is simulated: record policy; DO NOT execute real action
  if t is actual: execute at most one authorized action, observe outcome,
                  reroot to actual S_(t+1), repeat
~~~

การคำนวณซ้ำแบบ **receding horizon** ไม่ได้ขัดกับ multiverse: การจำลองยังแตกทุกสาขาที่นิยามไว้ แต่โลกจริงเลือกทำได้หนึ่ง action ต่อรอบและใช้ข้อมูลจริงแก้ prediction

## 5. Worked fixture (synthetic only): จุด 1 → 2 → 3

- S1 cash 100, hidden market HIGH prior 0.35 / LOW 0.65 (ประกาศเป็นสมมติฐาน ไม่ใช่ข้อมูลตลาด)
- FAST: cash +12 → S2=112 → S3=112
- LEARN: cash -10 → S2=90 และได้ observation POS/NEG ที่มี sensitivity=0.85 และ specificity=0.85
- S2 ถ้า SCALE แล้ว HIGH ได้ +100, LOW ได้ -20; STOP ไม่เปลี่ยน cash; SCALE ต้องมี cash อย่างน้อย 80
- At S2 POS: posterior HIGH = 0.2975 / 0.395 = 75.316%; SCALE forecast E[S3] = 160.3797468354
- At S2 NEG: posterior HIGH = 0.0525 / 0.605 = 8.678%; STOP forecast E[S3] = 90
- Conditional policy: POS→SCALE, NEG→STOP
- Unconditional E[S3 | LEARN with conditional S2 choice] = 117.8
- Unconditional E[S3 | FAST] = 112
- LEARN without adapting (always SCALE) = 112
- If signal accuracy drops to 0.60, both signals select SCALE, so LEARN value becomes 112 (ties FAST)
- If the prior HIGH is revised to 0.10 with accuracy 0.85, LEARN value becomes 95.8, so root policy chooses FAST
- If S2 actually has cash 70 instead of predicted 90, SCALE becomes **infeasible even on POS**; choose STOP in this fixture

The four LEARN leaves are HIGH/POS→190, HIGH/NEG→90, LOW/POS→70, LOW/NEG→90. Their respective joint probabilities are 0.2975, 0.0525, 0.0975, 0.5525. If POS occurred but reality was LOW, realized S3=70, even though forecast expected 160.38. A rational forecast **does not guarantee a successful individual outcome**.

## 6. วัดพัฒนาการของการเลือก

| Metric | Meaning | Anti-pattern |
|---|---|---|
| Node re-evaluation | ตรวจ state/belief/action feasibility ใหม่ที่ทุกจุด | คัดลอก policy จากจุด 1 |
| Non-anticipativity | เลือกจากข้อมูลที่รู้จริง ณ จุดนั้น | อาศัยผลลัพธ์ที่ยังไม่เกิด |
| Declared branch coverage | ครบทุกสาขาภายใน scope จำกัด | อ้างว่าครบทุกโลก |
| Forecast calibration | ความน่าเชื่อถือของการคาดการณ์จากการทดสอบซ้ำ | ตัดสินด้วยเรื่องเล่าครั้งเดียว |
| Action-set adaptation | สามารถเปลี่ยนชุดตัวเลือกเมื่อ resources/capabilities เปลี่ยน | ยึด action list ตายตัว |
| Policy quality | เทียบกับ greedy/static, และ control เมื่อเป็นไปได้ | เลือก best-case leaf |
| Model-miss logging | ยอมรับผลที่ไม่ได้ทำนาย | แต่งคำอธิบายย้อนหลัง |
| Reality verification | หลักฐานผลจริง ณ ปลายทาง | สำเร็จเพราะ tool return 200 |

Decision skill ต้องผ่านการทดสอบทั้ง **logical competence**, **out-of-sample calibrated forecasting**, และ **measured real outcomes** ก่อนอ้างความสามารถในโลกจริง; ตัวอย่างครั้งเดียวพิสูจน์เฉพาะตรรกะตัวอย่าง

## 7. Record template ต่อจุด

~~~yaml
decision_node:
  point: 2
  root_mode: OBSERVED_REALITY # or SIMULATED_POINT
  previous_prediction: {}
  current_observation: {}
  prediction_gap: {}
  beliefs_before: {}
  beliefs_after: {}
  feasible_actions: []
  excluded_actions_with_reason: []
  counterfactual_point3:
    - action: SCALE
      possible_outcomes: []
      expected_if_justified: null
      downside: null
      uncertainty: null
    - action: STOP
      possible_outcomes: []
  selected_action: null
  selection_reason: null
  reference_baseline: null
  evidence_labels: [FACT, INFERENCE, HYPOTHESIS, UNKNOWN]
  real_execution_authorized: false
  real_execution_status: NOT_EXECUTED
  actual_point3: UNKNOWN
  model_update_after_observation: PENDING
~~~

## 8. Skill–Tool Fit สำหรับ Test-LaB

1. วิเคราะห์ด้วย native model และ Markdown operating instructions
2. ใช้เครื่องคำนวณที่มีอยู่สำหรับ finite fixtures และ assert แบบ deterministic
3. ใช้ GitHub connector เก็บ experiment + readback ตรวจว่าบันทึกจริง
4. เมื่อมีข้อมูลจริงที่ได้รับอนุญาต จึงนำ measurement กลับมา update beliefs; ไม่ดึงข้อมูลส่วนตัวไปลง public repo
5. **ไม่สร้าง** Skill package, Plugin, agent framework, database, dashboard หรือ service ใหม่โดยอัตโนมัติ

## 9. Acceptance gate

- [ ] S2 ระบุได้ว่า observed หรือ simulated
- [ ] S2 จับความต่างจาก prediction S1 ได้
- [ ] S2 update belief ตาม observation อย่างมีฐาน
- [ ] S2 generate feasible actions ใหม่ ไม่ใช้ชุดเก่าโดยอัตโนมัติ
- [ ] S2 fork ทุก declared feasible action ไป S3
- [ ] S3 มี state transition (resources/capabilities/constraints) ไม่ใช่แค่คะแนน
- [ ] S2 choice ใช้ expected policy/robust criteria ไม่เลือก lucky leaf
- [ ] ห้าม hidden-world / future-info leakage
- [ ] เมื่อ S2 เปลี่ยน policy อาจเปลี่ยน และอธิบายได้
- [ ] หาก S2 ขาด resource หรือ permission ต้อง block infeasible action
- [ ] เมื่อมี actual S3 ให้ update model แล้วจำลองไป S4
- [ ] แยก hypothetical evaluation ออกจาก actual execution

**Status:** This document is an operating specification tested on finite, fully declared synthetic fixtures. No causal model of an arbitrary real world, automatically executing universe simulator, or verified financial uplift is claimed.
