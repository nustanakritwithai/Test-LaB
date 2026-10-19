---
title: "Independent Multiverse v4.2.1 — Evidence & Real-World Scenario Gate"
created: "2026-10-20"
origin_case: "experiments/2026-10-20-france-protests-multiverse-v4-2-assessment.md"
status: "CANDIDATE / NOT_APPLIED_TO_V4_2"
owner: "Independent Multiverse World Model"
aom_skill_merge: false
production_mutation: false
---

# v4.2.1 CANDIDATE — Evidence, Observation, Causality and Scenario Integrity

**Purpose:** Proposed small extension to the standalone Multiverse World Model, derived from the October 2026 France protests scenario audit. This file is NOT the currently adopted v4.2 protocol and MUST NOT be merged into AOM or other Skills. Original model and production remain untouched.

## 1. Analysis Mode Gate — mandatory before simulation

A run must explicitly identify one mode:

- EVIDENCE_AUDIT — dated claim/source inspection only.
- QUALITATIVE_SCENARIOS — bounded combinations of hypothetical future observations, NO numeric probability or political-actor ranking.
- QUANTITATIVE_FORECAST — only when outcome targets, historical rates, calibration and dated forecast-before-result measurement exist.
- CAUSAL_DECISION — only when action-dependent transitions, justified constraints/utility and independent evidence allow a real causal comparison.

France 2026 case qualifies for QUALITATIVE_SCENARIOS, not causal action optimization. Code enumerating Cartesian combinations is a **scenario grid**; it is not the calibrated Bayesian world model used in synthetic v4.2 unit tests.

If preconditions for a stronger mode fail, return MODE_BLOCKED / remain in lower justified mode. Never infer numerical weights because scenarios have been enumerated.

## 2. Evidence Gate — BEFORE setting S0=OBSERVED

Every material claim needs the following fields:

~~~yaml
claim:
  id: "C001"
  text: "Source asserts event/number"
  source_url: "canonical direct URL"
  source_read_status: READ_AND_CHECKED | NOT_CHECKED | UNAVAILABLE
  source_type: DIRECT_OFFICIAL | DIRECT_PARTICIPANT | NEWS_REPORT | COMMENTARY
  reporter_or_attributor: "government / organizers / independent reporter"
  original_origin_group: "same original release/source"
  event_at: "YYYY-MM-DD"
  published_at: "YYYY-MM-DD"
  updated_at: null
  retrieved_at: null
  information_cutoff: "YYYY-MM-DDTHH:MM:SS+TZ"
  geographic_scope: "national / city / site"
  counted_population: "what is measured"
  measured_window: "day / interval / cumulative cutoff"
  raw_value: null
  status: REPORTED_FACT | ATTRIBUTED_CLAIM | DISPUTED |
    ANNOUNCEMENT | OBSERVED_IMPLEMENTATION | UNVERIFIED
  conflicts: []
~~~

**Strict rules:**
- URL presence is not source verification. A test containing a hardcoded date string is not a source check.
- Separate the two October 17 attendance claims: 550,000 government / 800,000 organizers. Do not average these into a fictitious official count.
- October 17 arrest reports and October 19 cumulative arrest reports cover different windows; verify windows before calling numbers contradictory.
- Repetitions of an official figure across ten newspapers may share ONE original_origin_group; do not claim ten independent verifications.
- LIVE webpages can redirect or change. Store source update and access dates, and preserve the content/as-of version used.
- A call for October 24 or November 5 is an ANNOUNCED_FUTURE_EVENT, not an observed occurrence.
- Announced school initiatives do not prove they were implemented or reduced dissatisfaction.
- Allegations of responsibility, motives or ideological causes remain attributed unless separately established.
- If material source cannot be read, mark SOURCE_UNAVAILABLE or DATA_BLOCKED, not VERIFIED_S0.

## 3. Open-World Observation Ontology — no false binary

~~~yaml
observation:
  variable_id: "public_demonstration_participation"
  value: null
  status: VERIFIED_PRESENT | VERIFIED_ABSENT |
    REPORTED_PRESENT | NOT_REPORTED | UNKNOWN |
    POSTPONED | CANCELLED | MIXED_OR_LOCALIZED
  coverage: COMPLETE | PARTIAL | UNKNOWN
  scope: "location, window, method and denominator"
  comparison_to_prior: SAME_DEFINITION | DIFFERENT | UNKNOWN
  supporting_claim_ids: []
~~~

- NOT_REPORTED is NOT VERIFIED_ABSENT.
- NOT_VERIFIED is NOT FALSE.
- A broad national estimate is not interchangeable with attendance at one Paris site.
- Define operational thresholds for BROAD, SIGNIFICANT and IMPLEMENTED, otherwise preserve raw measured claims or UNKNOWN.
- Mixed or intermediate outcomes cannot be forced into one of two binary categories. Return SCHEMA_MISS / revise variables.
- Distinguish OBSERVATION_GAP (insufficient coverage), SOURCE_CONFLICT (different claims for the same metric/window), MODEL_MISS (verified event outside declared outcomes) and TEMPORAL_LEAK (post-cutoff information in S0).

## 4. Multi-actor and Causal Graph — describe, do not rank

Separate actor classes: public authorities, unions/organizers, peaceful participants, people implicated in specific incidents only where verified, affected schools/businesses/residents, and independent observers. Actor goals and motivations are reported claims or hypotheses, not inferred psychological states. Do not collapse peaceful mobilization, reported violent incidents, policing response and government concessions into one unrest score.

Each putative causal edge must record:

~~~yaml
causal_edge:
  cause: "announced/implemented school remedy"
  effect: "change in student grievances"
  evidence: []
  mechanism: "plausible pathway only"
  lag: UNKNOWN
  confounders: ["school_calendar", "price_changes", "other_policy"]
  alternative_explanations: []
  status: HYPOTHESIS | ASSOCIATION | SUPPORTED_CAUSAL | CAUSAL_UNIDENTIFIED
  direction: UNKNOWN
  strength: UNKNOWN
~~~

Do not assume independent scenario axes imply statistical independence. Before causal conclusions, identify source, timing, confounders and feasible counterfactual comparisons. Without validated transitions, do not issue an action certificate, policy ranking, political verdict or invented forecast probability.

## 5. Scenario Declaration and Fair Budget

For a scenario grid:
- Specify declared axes, categories, thresholds, geography and observation dates.
- Keep independence assumptions UNKNOWN unless justified.
- Record structural impossibilities only with evidence, not because branches look locally unattractive.
- Include OTHER / UNKNOWN / LOCALIZED when the world cannot honestly be binary.
- Record DECLARED_COUNT / EXPLORED_COUNT / UNEXPLORED_COUNT. Coverage is DECLARED_ONLY, NEVER all possible futures.
- With a small budget, avoid default lexicographic favoritism: use transparent stratification across contrasting root categories, and mark unresolved combinations rather than hiding them.
- Work unit cost for grid construction is not the actual reasoning, source-checking, token or human-review cost; report separately.

## 6. Event-Driven Horizon and Learning Loop

~~~text
REAL_WORLD_MULTIVERSE(S0, cutoff, budget):
  source_gate = verify_claims_and_scope(S0)
  if material critical source unavailable: DATA_BLOCKED
  choose EVIDENCE_AUDIT or QUALITATIVE_SCENARIOS unless higher gate passes
  mark ANNOUNCED events as future, not occurred
  create bounded scenario grid with UNKNOWN branches
  measure work against one shared global ledger
  store category definitions and observations that would disconfirm the model
  return S0 + scenarios + required NEXT_OBSERVATION
  if no real new observation: WAIT_FOR_OBSERVATION
  if conflicting same-window evidence: SOURCE_CONFLICT
  if no measurement coverage: OBSERVATION_GAP
  if outside schema: SCHEMA_MISS
  if verified event violates modeled outcomes: MODEL_MISS
  on verified new event:
    attach claim IDs to OBSERVED new root ONLY
    compare with forecast declared before event, including misses
    re-evaluate causal hypotheses and horizon, no virtual belief leakage
~~~

S1 observation point after a planned October 24 event; S2 after a planned November 5 event. These dates can be postponed, cancelled or poorly documented. Actual results require independent new evidence and must not be filled in automatically.

## 7. Acceptance Tests — real-world gate

1. 550k vs 800k from different sources => TWO ATTRIBUTED claims, not 675k truth.
2. 1,200 arrests dated Oct 17 and 2,400 cumulative Oct 19 => differing windows, not automatic contradiction.
3. Planned Oct 24 protest => FUTURE_CALL until observation; not OBSERVED.
4. No article about violence => NOT_REPORTED, never VERIFIED_ABSENT.
5. Announced school policy => ANNOUNCEMENT, not EFFECTIVE_POLICY.
6. A missing/broken URL => SOURCE_UNAVAILABLE and cannot pass verification gate.
7. Post-cutoff source presented as prior information => TEMPORAL_LEAK.
8. Mixed/partial city outcomes => MIXED_OR_LOCALIZED, not forced HIGH/LOW.
9. Two articles repeating one ministry number => SAME original_origin_group.
10. Correlated scenario axes => NO assumed equal probability.
11. Unidentified causal mechanism => CAUSAL_UNIDENTIFIED; no optimizing policy.
12. 32 branches + 18 structural assertions => STRUCTURAL_ONLY, not prediction accuracy.
13. Under budget limit, remain unexpanded branches and abstain rather than imply global certainty.
14. Re-root only after a verified observed event with dated independent provenance.

**Disposition:** CANDIDATE_ONLY. Preserve original v4.2 and AOM separately. Validate this amendment with a new source-and-observation fixture suite before any standalone adoption.
