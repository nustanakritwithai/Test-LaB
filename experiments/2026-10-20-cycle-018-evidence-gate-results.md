# Multiverse Cycle 018 — Functional Real-World Evidence Gate v4.2.1

**Date:** 2026-10-20 (Asia/Bangkok)
**Project:** Independent Multiverse World Model (NO AOM/Skill merger).
**Verdict:** STRUCTURAL / OFFLINE EVIDENCE-INTEGRITY GATE VERIFIED; REAL-WORLD CAUSAL PREDICTION UNVERIFIED.
**Research protocol frozen before implementation:** [Cycle 018 preregistration](2026-10-20-cycle-018-evidence-gate-preregistration.md).
**Independent active MD:** [Real-World Evidence Gate v4.2.1](../world-model/REAL_WORLD_EVIDENCE_GATE_v4_2_1.md).
**Runnable reference:** [multiverse_real_world_evidence_v4_2_1.js](../tests/multiverse_real_world_evidence_v4_2_1.js).
**Previous review-only design:** [v4.2.1 candidate](../world-model/REAL_WORLD_EVIDENCE_GATE_v4_2_1_CANDIDATE.md).
**Origin case:** [France protests scenario audit](2026-10-20-france-protests-multiverse-v4-2-assessment.md).

## 1. What changed from the earlier France trial?

The prior France audit generated 32 structurally declared future scenarios and passed 18 structural checks. However, the test contained static reported counts/dates and did NOT verify that reported claims, observation windows, source provenance, or official announcements supported the observed root. It did not warrant any calibrated probabilities or a causal policy certificate.

The new code introduces a **functional, offline evidence-integrity validator** that checks metadata records describing external source inspection; its validation is deliberately not conflated with independently fetching/validating the external content. Five specific public source pages were separately opened and relevant passages inspected during the assistant's work; those inspections are documented below. A successful metadata check is evidence of a coherent provenance RECORD, not proof that every underlying claim is objectively true.

New components:
1. **SOURCE/CLAIM GATE:** required URL/readback agreement, review date and locator, named original attributor, event time versus publication time versus review/as-of time, geographic/population/measurement scope.
2. **COUNT COMPARISON:** incompatible windows or geographies stay separate; conflicting government versus organizer estimates stay attributed; publication echoes do not become independent sources; changed estimates from the SAME original origin are flagged as revisions rather than echoes.
3. **OBSERVATION ONTOLOGY:** no inference from NOT_REPORTED to VERIFIED_ABSENT; VERIFIED_PRESENT and VERIFIED_ABSENT require separately attested matching-window observation evidence, and post-cutoff observations cannot be treated as current.
4. **ANALYSIS MODE GATE:** the France case is QUALITATIVE_SCENARIOS only. Unsupported numerical calibration and action-dependent causal superiority are not inferred.
5. **BOUNDED SCENARIO EXPLORATION:** reproducible diverse selection across the first eight declared root families when budget is insufficient; no equally weighted invented probabilities.
6. **RE-ROOT GUARD:** virtual futures and announced future events cannot update observed reality. Offline fixture re-root is permitted only in an explicitly synthetic namespace. Real-world re-root still requires a separately validated new source reading.

## 2. Public evidence checked in this run

The following links were opened externally and inspected. The provenance line ranges refer to the plain-text view of the source, not a frozen cryptographic archive of its complete article.

| Source | Date shown on source | Material passage inspected | Claim type |
|---|---|---|---|
| [Reuters — Mass protests in France](https://www.reuters.com/world/students-trade-unions-yellow-vests-set-protest-across-france-2026-10-17/) | Oct 17 | Article lines 174–176: government minister 550,000, CGT 800,000, Prime Minister reported ~1,200 arrested | **Attributed** turnout/arrest reports |
| [Reuters — France in turmoil](https://www.reuters.com/world/europe/france-turmoil-what-might-follow-a-weekend-riots-2026-10-19/) | Oct 19 | Lines 166–180: ~2,400 weekend arrests, prospective October 24 gatherings and November 5 union call | Attributed cumulative arrests; announced FUTURE events |
| [Le Monde — October 17 protests](https://www.lemonde.fr/en/france/article/2026/10/18/october-17-french-protests-crowds-marched-through-the-streets-before-violence-looting-and-chaos-broke-out_6758725_7.html) | Oct 18 | Lines 182–190: reports the same government 550,000 figure and organizer 800,000 figure | **Dependent attribution echo** |
| [CGT Finances publiques](https://www.cgtfinancespubliques.fr/public/infos-actions/luttes-2026/article/5-novembre-appel-a-la-mobilisation-pour-les-salaires-les-services-publics-l) | Oct 14 | Lines 27–38: explicit Nov 5 inter-union strike/demonstration call | Directly published **announcement**, not observed turnout |
| [French Ministry of Education — Constructing solutions with students](https://www.education.gouv.fr/construire-des-solutions-avec-les-lyceens-506143) | Oct 9 | Lines 16–20 and 83–103: five workstreams and education measures announced | **Policy announcement**, not independently proven implementation or effectiveness |

**Important distinction:** An article quoting a minister is evidence that the minister's number was *reported*, not independent verification of an exact participant census. Different reported arrest numbers can both describe different cumulative time windows. The Le Monde page is dynamic; without frozen historical revision information, its updated content is flagged. Source inspection on Oct 20 cannot retrospectively prove every detail of an Oct 17 page version if an editor subsequently modified it.

## 3. Executed reproducible checks

Re-executed the exact text of the GitHub-stored JavaScript reference in a local deterministic JavaScript runtime and verified the output.

**PASS: 86/86 deterministic offline assertions.**

- Previous recorded version had 71/71 PASS; this round added **15 focused adversarial assertions**.
- The 15 extras target **same-source report revisions**, invalid counts and mismatched event/measurement windows, absent/invalid readback review date, post-cutoff inspection with no historical snapshot, and fake VERIFIED_PRESENT events without matching independently attested positive observations.
- Eight claim fixtures were accepted under five public-source provenance-record entries and seven distinct **original attribution group IDs**. Seven group IDs must NOT be claimed to mean seven statistically independent verification methods.
- Government turnout 550,000 and CGT 800,000 remain distinct; no invented midpoint.
- ~1,200 reported October 17 arrests and ~2,400 reported weekend arrests by October 19 remain separately scoped, not automatically contradictory.
- A future announced Oct 24 rally and November 5 planned strike are never transformed into a realized event at the Oct 20 cutoff.
- The announced school initiatives do not authorize “observed implementation” or “verified impact”.
- Missing source, mismatched exact URL, missing line locator/date, post-cutoff publication or unarchived later review correctly block promotion.
- The qualitative mode refuses unsupported numerical probabilities even when the input says calibration flags are all true.

### Global scenario budget

| Test | Budget (toy work units) | Enumerated hypothetical continuations | Other paths |
|---|---:|---:|---|
| Declared full grid | 49 | 32 of 32 | 0 unexplored within that restricted grid |
| Incomplete budget | 19 | 8 of 32 | 6 of 8 root scenario families still not extended |

A root action family consists of 3 binary dimensions; the first two expanded under budget 19 have opposing patterns (000 and 111), rather than lexicographic adjacent cases. These numbers measure scenario **representation**, not accuracy, a real-world “world coverage” percentage, runtime, money, LLM token cost or actual causal branching.

The existing 32 outcome combinations are NOT a probability forecast for France and do not represent every possible real future. The system leaves numerical probability UNKNOWN, actor ranking NULL and any action certificate NULL.

## 4. Boundary between software pass and truth about the world

| What was verified | What remains outside this test |
|---|---|
| Deterministic gate rejects invalid claim metadata and unscoped counts | Whether all underlying source assertions are factually correct |
| Exact source URLs and dated text passages inspected in this run | Cryptographic archived versions of dynamically updated webpages |
| Negative and positive observation attestations require matching scope | Fully automated authenticated real-world observation ingestion |
| Shared-work-budget combinatorics and fair first-branch sampling | True transition frequencies or calibrated probabilities |
| Distinct REAL_REVIEW vs SYNTHETIC_FIXTURE re-root guards | Real action-caused outcome verification or causal identification |
| No AOM, Skill or production integration | Validated economic or political predictive power |

**Real-world operational mode:** EVIDENCE_AUDIT / QUALITATIVE_SCENARIOS only. QUANTITATIVE_FORECAST and CAUSAL_DECISION cannot be unlocked merely by Boolean flags inside an offline script, and real-world re-root is deliberately not automatic.

## 5. Negative findings and next improvement

The France audit demonstrated that branching every declared binary combination is not an empirically justified causal process. It cannot estimate how government measures, union responses, peaceful turnout and localized incidents influence each other without justified structural dependencies and independently identified evidence.

Further improvement should start with a **different as-yet-unseen public case** with mixed/partial outcomes, postponed/cancelled events, evolving corrections, source disagreements and nonstationary transitions, using a new frozen information cutoff. Such a case can test the schema and provenance gate without replaying the same known France examples.

Before claiming world-model predictive calibration, separately preregister a target, collect eligible *forecast-before-outcome* cases with sufficient independent observations, assess errors against a credible baseline, and avoid election winner/electability forecasts.

## 6. Reproduction and disposition

**Command:** node tests/multiverse_real_world_evidence_v4_2_1.js

The file uses only standard JavaScript, no npm dependencies and **no networking**; it reads no account data and writes no third-party system. Runtime verified through deterministic evaluation of the connector-fetched source text. A separate Node.js CLI run is not claimed in this report.

**Decision:** ADOPT v4.2.1 only as an **independent evidence-validation gate for read-only qualitative Multiverse analyses**. It is NOT a replacement for the 4.2 toy optimizer, not a unified Skill, not AOM, and not ready for autonomous real-world intervention or quantitative prediction.

**Production changes:** NONE. All GitHub mutations are confined to Test-LaB development documents and tests.

**Final status:** EVIDENCE_METADATA_AND_SOURCE_READBACK_GATE_PASS / 86_TESTS / QUALITATIVE_ONLY / CAUSAL_AND_FORECAST_SKILL_UNVERIFIED / NO_AOM_MERGE.
