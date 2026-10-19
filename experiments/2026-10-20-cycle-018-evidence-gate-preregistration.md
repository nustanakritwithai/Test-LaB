# Multiverse Cycle 018 — v4.2.1 Evidence-Gate Test Plan (frozen before implementation)

Date: 2026-10-20 (Asia/Bangkok)
Project: INDEPENDENT Multiverse World Model; no AOM/Skill merge.
Status: ACCEPTANCE TEST PLAN; no production changes.
Input: France October 2026 dated public-event assessment and new source reads (Le Monde, Reuters, CGT and French Ministry of Education), with source claims individually attributed.

Goal: Implement a runnable, deterministic, offline evidence-integrity gate for real-world Multiverse scenario inputs. The evidence gate must not pretend that validating a JSON object proves a webpage exists or a reported event is objectively true. Primary source inspection remains an externally documented human/tool action.

Acceptance targets fixed before coding:
1. Claim as-of cutoff enforcement, event versus publication versus retrieval date, and a valid future ANNOUNCEMENT status.
2. Missing source, metadata or readback locator blocks observed-root promotion even if a valid-looking URL exists.
3. Two October 17 turnout values (550,000 ministry, 800,000 organizers) retained separately, with equal event window and different attribution groups; never output 675,000 as a synthetic average.
4. Different arrest observation windows are NOT treated as contradictions. Same metric/window but different attributed values are flagged as differing reports.
5. Multiple outlets copying one ministry value count as one original-attribution group, not independent confirmations.
6. An announced November 5 demonstration stays ANNOUNCED_FUTURE_EVENT on October 20.
7. An education measure announcement cannot be promoted to OBSERVED_IMPLEMENTATION or demonstrated impact without new evidence.
8. NOT_REPORTED != VERIFIED_ABSENT; VERIFIED_ABSENT requires defined coverage and evidence of verified absence.
9. Post-cutoff source publication is TEMPORAL_LEAK; retrieved-after-cutoff retrospective sources carry a warning even if source was published before cutoff.
10. Incompatible geographic or population scopes are not collapsed or compared as equivalent.
11. UNKNOWN/MIXED_OR_LOCALIZED/POSTPONED/CANCELLED states are represented without forced yes/no.
12. Missing causal identification/confounders block CAUSAL_DECISION even when a directed graph edge is plausible.
13. Without calibrated probabilities and historical outcomes, QUALITATIVE_SCENARIOS may run but QUANTITATIVE_FORECAST and CAUSAL_DECISION are gated.
14. The 32 existing France future scenarios remain structural-only; no invented probability, political actor rating or numeric action certificate.
15. Re-rooting is restricted to a newly verified observation with provenance; hypothetical/announced futures cannot update an observed root.
16. Code runs without network, a new plugin or app, and makes no changes to production or the public source websites.

Deliverables in Test-LaB:
- tests/multiverse_real_world_evidence_v4_2_1.js (functional, offline self-test).
- world-model/REAL_WORLD_EVIDENCE_GATE_v4_2_1.md (independent active protocol if tests pass).
- experiments/2026-10-20-cycle-018-evidence-gate-results.md (reproducible honest report).

The earlier file world-model/REAL_WORLD_EVIDENCE_GATE_v4_2_1_CANDIDATE.md remains review history. Do not alter AOM or original v4.2 source, and do not claim political predictive skill from structural tests.
