---
title: "Multiverse v4.2.1 — Real-World Evidence & Causal Scenario Gate"
version: "4.2.1"
date: "2026-10-20"
language: "th"
project: "Independent Multiverse World Model"
status: "ACTIVE_EVIDENCE_GUARD_FOR_READ_ONLY_QUALITATIVE_ASSESSMENTS / NUMERIC_AND_CAUSAL_PREDICTION_UNVERIFIED"
parent_model: "world-model/HORIZON_AWARE_MULTIVERSE_v4_2.md"
evidence_regression: "tests/multiverse_real_world_evidence_v4_2_1.js"
experiment: "experiments/2026-10-20-cycle-018-evidence-gate-results.md"
no_skill_merger: true
production_mutation: false
---

# Multiverse v4.2.1 — ตรวจหลักฐานก่อนสร้างอนาคต

**สถานะ:** เพิ่มกฎ Evidence Gate สำหรับการประเมินเหตุการณ์จริงแบบ Read-only ภายในโครงการ Multiverse เท่านั้น ไม่ได้แก้ AOM ไม่ได้รวม Skills และไม่ได้อ้างว่าโมเดลพยากรณ์การเมืองแม่นยำแล้ว ดู [นโยบายพัฒนาแยกกัน](../INDEPENDENT_DEVELOPMENT_POLICY.md)

ความสามารถเดิมของ [Horizon-Aware v4.2](HORIZON_AWARE_MULTIVERSE_v4_2.md) ด้าน Shared Budget, Dynamic Horizon, State Re-root, Branch-local Learning และ Model-based Bounds ยังคงเดิม แต่ **กฎ Beta-Bernoulli ในโลกของเล่นห้ามนำไปใช้คำนวณโอกาสเหตุการณ์ทางสังคมโดยไม่มีการพิสูจน์**

## 1. Analysis Mode Gate — เลือกความสามารถให้ตรงหลักฐาน

ก่อนสร้าง S0 ต้องระบุโหมดที่หลักฐานรองรับเพียงโหมดเดียว:

| Mode | สิ่งที่อนุญาต | เงื่อนไขห้ามข้าม |
|---|---|---|
| EVIDENCE_AUDIT | ตรวจข่าว ต้นทาง วันเวลา ข้อกล่าวอ้าง ขอบเขตและความขัดแย้ง | หลักฐานสำคัญอ่านไม่ได้ → DATA_BLOCKED |
| QUALITATIVE_SCENARIOS | จำลองหลายสถานการณ์ภายใต้เงื่อนไขที่ระบุ | ไม่มีข้อมูลรองรับ → ห้ามแต่งความน่าจะเป็น |
| QUANTITATIVE_FORECAST | คาดการณ์ตัวเลขและประเมิน calibration | ต้องมีเป้าหมายวัดที่กำหนดก่อนเหตุการณ์และการทดสอบกับข้อมูลจริง |
| CAUSAL_DECISION | ประเมินผลการกระทำที่เปลี่ยนสถานะอนาคต | ต้องมีหลักฐาน causal/action-dependent ที่ระบุข้อจำกัด ไม่ใช่กราฟสมมติ |

**กรณีฝรั่งเศส 20 ต.ค. 2026:** โหมดสูงสุดที่รับรองตามหลักฐานในการทดลองนี้คือ QUALITATIVE_SCENARIOS. Script ห้ามออกตัวเลขความน่าจะเป็นและห้ามออกใบรับรองการเลือกทางการเมือง

การเขียนโหมดใน Markdown ไม่ยืนยันว่าโมเดลคำนวณมันได้ในโลกจริง ต้องมีชุดทดสอบเฉพาะความสามารถนั้นต่างหาก

## 2. Mandatory Source & Claim Ledger BEFORE S0

**ห้ามสร้างสถานะ OBSERVED_REALITY จากชื่อเว็บไซต์ URL หรือคำกล่าวอ้างลอย ๆ** แต่ละ material claim ต้องบันทึก:

~~~yaml
claim:
  id: C001
  source_id: S001
  canonical_url: "https://source.example"
  publisher: "news organization / ministry / union"
  published_day: "YYYY-MM-DD"
  source_updated_day: UNKNOWN
  event_day: "YYYY-MM-DD"
  source_readback:
    read_status: READ_AND_CHECKED_EXTERNALLY | NOT_CHECKED | UNAVAILABLE
    review_date: "YYYY-MM-DD"
    locator: "specific page/section/line range"
    supporting_claim_ids: []
  kind: ATTRIBUTED_METRIC | ANNOUNCED_FUTURE_EVENT |
    POLICY_ANNOUNCEMENT | OBSERVED_IMPLEMENTATION
  attributor: "who originally claimed this"
  origin_group: "original source shared by syndicated reporting"
  numeric_value: null
  metric_definition: null
  geography: null
  population: null
  window_start: "YYYY-MM-DD"
  window_end: "YYYY-MM-DD"
  evidence_status: REPORTED | ATTRIBUTED | ANNOUNCED |
    DISPUTED | SOURCE_UNAVAILABLE
~~~

**Gates:**
- A source URL must match the exact URL recorded at the time of external source inspection; after-the-fact URL swaps fail SOURCE_URL_MISMATCH_FROM_READBACK.
- A Boolean claiming calibrated probabilities cannot self-authorize quantitative predictions in this offline tool. It remains QUALITATIVE_SCENARIOS until an independent source-audited calibration evaluation exists.

- source_readback = READ_AND_CHECKED_EXTERNALLY means a person or connected web reader actually inspected a relevant passage. **The offline validator only checks the associated RECORD, not the external webpage.** A record can be wrong or outdated. This distinction must remain in every report.
- Dates: source publication after information cutoff = TEMPORAL_LEAK; an updated live page after cutoff without an archived version is not valid historical S0 evidence. Explicitly record event day, publication day, retrieval day and any update day.
- A future announced event is ANNOUNCED_FUTURE_EVENT, not an OBSERVED occurrence.
- Policy announcement is not implemented/effective policy. Separate implementation and measured result; require new data for promotions.
- When a claim is unavailable/unreadable, do not mark S0 fully verified. State DATA_BLOCKED and preserve exactly what was attempted.
- Distinguish source of writing versus **original origin**. Reuters and Le Monde echoing an interior ministry number are not two independent confirmations of its objective accuracy.
- Never overwrite a reported count with an average invented by the model.

**France observation example:**
Two separate October 17 counts: 550,000 attributed to France's Interior Ministry and 800,000 attributed to organizers/CGT. Both belong in the SAME event scope but DIFFERENT original-origin groups. These are reported estimates. Neither is an independently audited exact attendance census.

A report of 1,200 arrested on October 17 and a later cumulative estimate of 2,400 by October 19 cover DIFFERENT observation windows. Treat them as temporally distinct rather than contradicted counts. Confirm metric definitions/scope before comparing.

Source examples actually inspected for this protocol:
- Reuters October 17: https://www.reuters.com/world/students-trade-unions-yellow-vests-set-protest-across-france-2026-10-17/
- Reuters October 19: https://www.reuters.com/world/europe/france-turmoil-what-might-follow-a-weekend-riots-2026-10-19/
- Le Monde October 18: https://www.lemonde.fr/en/france/article/2026/10/18/october-17-french-protests-crowds-marched-through-the-streets-before-violence-looting-and-chaos-broke-out_6758725_7.html
- CGT October 14: https://www.cgtfinancespubliques.fr/public/infos-actions/luttes-2026/article/5-novembre-appel-a-la-mobilisation-pour-les-salaires-les-services-publics-l
- French Ministry of Education October 9: https://www.education.gouv.fr/construire-des-solutions-avec-les-lyceens-506143

## 3. Observation Ontology — โลกไม่ใช่ Binary เสมอไป

~~~yaml
observation:
  value: null
  status: VERIFIED_PRESENT | VERIFIED_ABSENT |
    REPORTED_PRESENT | NOT_REPORTED | UNKNOWN |
    MIXED_OR_LOCALIZED | POSTPONED | CANCELLED
  coverage: COMPLETE | PARTIAL | UNKNOWN
  measured_definition: "persons / events / city"
  population: null
  geography: null
  source_claim_ids: []
  occurred_at: null
  epistemic_level: "original report / independently checked"
~~~

- NOT_REPORTED ไม่ใช่ VERIFIED_ABSENT.
- ไม่มีรายงานหรือข้อมูลเข้าถึงไม่ได้ ≠ จำนวนเหตุการณ์เป็นศูนย์.
- VERIFIED_ABSENT ต้องมี coverage=COMPLETE และบันทึก negative observation ที่ตรวจจากต้นทางอย่างเป็นระบบ โดยอ้างอิง ID ที่ผ่านการตรวจแหล่งข้อมูลและตรงกับพื้นที่/ช่วงเวลาที่กำหนด ไม่ใช่เพียงใส่ Boolean หรือข่าวไม่พูดถึง. ในโปรแกรมออฟไลน์ สิ่งนี้เป็น provenance attestation ไม่ใช่การอ่านเว็บอัตโนมัติ.
- MIXED_OR_LOCALIZED ไม่บังคับแปลงเป็น LARGE / SMALL; ต้องแยกพื้นที่หรือระบุ UNKNOWN.
- เกณฑ์ BROAD, SIGNIFICANT, IMPLEMENTED ต้องกำหนดนิยาม จำนวน ขอบเขต และเงื่อนไขก่อนจัดหมวด
- ถ้าโลกจริงมีผลนอกศัพท์ที่ระบุ ใช้ SCHEMA_MISS หรือ MODEL_MISS ไม่อ้างว่าแผนพยากรณ์ถูกเสมอ

## 4. Multi-Actor World State + Causal Hypotheses

ให้แยกตัวแปรผลประโยชน์/กิจกรรมที่สังเกตได้ของกลุ่มสถาบันต่าง ๆ โดยไม่ประเมินคุณค่าหรือจัดอันดับผู้มีส่วนเกี่ยวข้องทางการเมือง:

- หน่วยงานรัฐและท้องถิ่น: คำสั่งที่ยืนยันได้ มาตรการ และการนำไปปฏิบัติ
- สหภาพแรงงานและผู้จัดการชุมนุม: ข้อเรียกร้องที่เผยแพร่ และกิจกรรมที่ตรวจได้
- ผู้ชุมนุมอย่างสงบ: การเข้าร่วม ข้อเรียกร้องที่ได้รับรายงาน
- เหตุรุนแรงเฉพาะจุด: เหตุการณ์ที่ยืนยันได้และความรับผิดชอบที่อาจยังเป็น UNKNOWN
- สถานศึกษา ประชาชนและกิจการที่ได้รับผลกระทบ: ข้อมูลความเสียหาย/การหยุดบริการที่มีต้นทาง

**เหตุและผลยังต้องพิสูจน์:**

~~~yaml
causal_edge:
  proposed_cause: "school policy implementation"
  proposed_effect: "change in reported student grievances"
  evidence_claim_ids: []
  mechanism: "hypothesized only"
  plausible_lag: UNKNOWN
  confounders: ["school_holidays", "price_changes", "other_policies"]
  alternative_causes: []
  identification_method: NONE
  observed_association: UNKNOWN
  causal_effect: CAUSAL_UNIDENTIFIED
  quantified_strength: UNKNOWN
~~~

การเกิดเหตุการณ์สองอย่างพร้อมกันไม่พิสูจน์เหตุและผล และการแยกตัวแปรในตารางไม่ได้พิสูจน์ว่าตัวแปรนั้นเป็นอิสระทางสถิติ

## 5. Declared Scenario Grid + Shared Budget

- นับครบเฉพาะ DECLARED branch space ไม่อ้างครอบคลุมทุกจักรวาลจริง
- แยก DECLARED_COUNT / EXPANDED_COUNT / UNEXPLORED_COUNT / OBSERVED_CONFIRMATIONS
- Cartesian scenario combinations ไม่ใช่ probabilistic forecast; ห้ามแจก probability=1/N โดยอัตโนมัติ
- ไม่ใช้ชื่อทางการเมืองเพื่อจัดคะแนนหรือตัดสินผู้ชนะ/ผู้แพ้
- ถ้างบจำกัดต้องรักษาความหลากหลายของกิ่ง เริ่มจากสถานการณ์ขั้วต่างกัน ไม่ใช้ลำดับแรกตามชื่อหมวดกินงบทั้งหมด
- ตัวนับ work_units ของ Scenario Grid หมายถึงโหนด/กิ่งตามกฎจำลองเท่านั้น ไม่ใช่ค่า Token, ค่าใช้จ่ายหรือคุณภาพการคาดการณ์
- หากมี UNKNOWN/MIXED อื่นนอก 8×4 ที่กำหนด ให้ถือว่า model coverage ไม่ครบและเปิด schema revision

การทดลองกรณีฝรั่งเศส 32 เส้นทาง:
- 8 S1 hypothetical combinations (mobilization × reported incidents × education implementation)
- แต่ละ S1 แตก 4 hypothetical S2 continuations (November 5 action × policy/budget progress)
- full ledger = 49 synthetic work units (9 expanded decision points + 40 outcome edges)
- budget 19 expands 2 of 8 S1, leaves 6 unexpanded
- fairness regression checks that the two expanded S1 groups represent deliberately contrasting cases
- no path has numeric probability or action certificate

## 6. Event-driven re-root and Time Firewall

~~~text
REVIEW_REAL_WORLD(root, information_cutoff, work_budget):
  validate source readback records and each material claim
  if missing/unsupported critical claim: DATA_BLOCKED; do not promote S0
  classify observed event vs attributed claim vs future announcement
  choose most capable justified ANALYSIS_MODE
  create bounded qualitative future branches with UNKNOWN probabilities
  record next event date and possible schedule changes as HYPOTHESES
  if no new verified observed source: WAIT_FOR_OBSERVATION
  if missing measurement coverage: OBSERVATION_GAP
  if conflicting same-window reports: SOURCE_CONFLICT/ATTRIBUTION_DIFFERENCE
  if sources revised after cutoff: TEMPORAL_LEAK or SOURCE_REVISION_GAP
  if observation does not fit taxonomy: SCHEMA_MISS
  if established observed event breaks model: MODEL_MISS
  if new independently auditable observation:
    compare with registered earlier expectation/hypothesis
    update observed S(t+1) ONLY, never hypothetical siblings
    re-declare scenario grid, dependencies and constraints
    continue to the next justified event horizon
~~~

**Important implementation boundary:** The offline reference code deliberately REJECTS direct real-world re-root based on a single Boolean verified flag. It permits only explicitly labeled SYNTHETIC_FIXTURE re-root in its self-tests. An actual real-world re-root requires a fresh independently inspected and attributed source record from an authorized read action. This capability is specified, but NOT automatically implemented as a network monitor.

## 7. Test contract, results, and limits

Functional reference: [tests/multiverse_real_world_evidence_v4_2_1.js](../tests/multiverse_real_world_evidence_v4_2_1.js)

**71/71 deterministic offline checks PASS** across provenance metadata, crowd/arrest figures, source echoes, publication cutoff, future-event calls, policy implementation, incomplete coverage and observation ambiguity, mode escalation prevention, missing causal identification, fair scenario budgets, and fixture-only re-root.

Specific counters:
- 5 externally inspected public-source metadata records and 8 eligible *attributed* claim records, with 7 independent original-origin group IDs (not 7 independent verification methods).
- Claimed future Oct 24 and Nov 5 events remain future plans at the Oct 20 cutoff.
- A copied government figure remains one original source group, even if multiple journalists report it.
- 32 declared scenario paths under global budget 49; 6 root families unexpanded under budget 19.
- No numeric scenario probability, no political actor rating or action certification.
- v4.2 Bayesian toy solver is not invoked for these real-world qualitative scenarios.
- Source-audit metadata passing a static JavaScript test is **not independent verification of live webpage contents**. The webpages were separately read to draft these cases, but the test script is offline and cannot revalidate changes.

**Not yet tested:** real source updates after Oct 20, reliable causal transition estimation, real-world prediction accuracy, actual latency/token/memory usage, and real observed counterfactual interventions.

## 8. Adoption, scope and next experiment

**Adoption scope:** ACTIVE as an evidence gate before independent **read-only qualitative** Multiverse assessments; experimental limitations remain fully disclosed. The primary v4.2 optimizer retains candidate status, and this addition is NOT proof of general purpose real-world causal planning.

Next validation: use an **unseen second public-event case** to test outside-schema observations, time-window conflicts, multi-actor transitions and calibration gate behavior. Record any MODEL_MISS rather than silently tightening the scenario categories afterward.

**NO AOM SKILL MERGE / NO PRODUCTION WRITE / NO BACKGROUND MONITORING.**
