---
title: "France protests — Independent Multiverse v4.2 assessment"
created: "2026-10-20"
evidence_cutoff: "2026-10-19"
status: "S0 SOURCED / FUTURES HYPOTHETICAL / NOT A CALIBRATED FORECAST"
multiverse_project_only: true
aom_skill_merge: false
production_modifications: false
reference_test: "tests/france_protests_2026_scenario_audit.js"
---

# France Protests — Multiverse v4.2, independent qualitative field analysis

**Information horizon:** Compiled October 20, 2026; verified public-source reports dated through October 19, 2026.
**Purpose:** Use [independent World Model v4.2](../world-model/HORIZON_AWARE_MULTIVERSE_v4_2.md) to explore conditional futures, without inventing probabilities or optimizing actors' political choices.
**Strict boundary:** Public macro-level events only. No individual monitoring, protest tactics, election predictions, engagement recommendations, AOM integration, or production changes.

## S0 — What is established from dated sources?

- **October 17 demonstration participation:** The French government reported about 550,000 participants; organizers reported about 800,000. Those are two different attributed counts, not a verified single total (Le Monde).
- **Nature of events:** Peaceful demonstrations over deteriorating education conditions and rising living costs occurred, while incidents involving clashes, looting, business damage and violence were reported in some locations (AP, Reuters). Never merge every demonstrator with violent participants.
- **Security response:** Localized curfews and gathering restrictions were ordered in parts of Paris and other cities on October 19. Outcomes and side effects are not yet established (Reuters, AP).
- **Weekend arrest figure:** Reuters cited the Interior Ministry for roughly 2,400 arrests by October 19. The time frame is longer than initial same-day arrest tallies.
- **Education:** France's Ministry of Education announced initiatives addressing absentee-teacher coverage, school conditions, schedules, orientation and pupils' participation. Announcement is not demonstrated implementation.
- **Unions:** CGT called for November 5 inter-union strikes and supported October 17 social claims; CFDT publicly defended the right to peaceful demonstration while condemning violence.
- **October 24:** Yellow Vest activists announced a new Act II mobilization. The call is a future plan, not achieved participation.
- **Fiscal constraints:** The French government October 1 outlook forecast 2026 deficit of 5.4% of GDP and proposed a 2027 5.0% target plus 43 billion euros adjustment package. It is a fiscal proposal, not the observed outcome of future parliamentary debate.
- **Economic reaction:** Reuters reported market pressure in French bonds after the unrest. Causal attribution is multi-factor and cannot be isolated to protest activity.

### Primary/public source URLs and dates

1. Le Monde, Oct 17–19 turnout and demonstrations: https://www.lemonde.fr/societe/live/2026/10/17/en-direct-manifestations-du-17-octobre-le-gouvernement-annonce-550-000-manifestants-les-organisateurs-800-000-environ-400-interpellations-des-violences-urbaines-d-une-gravite-inouie-se-sont-deroulees-et-se-deroulent-encore_6795855_3224.html
2. Reuters, Oct 19 curfews, arrest figures, unions: https://www.reuters.com/world/europe/frances-macron-declines-interior-ministers-offer-resign-2026-10-19/
3. AP, Oct 19 Paris curfew: https://apnews.com/article/france-protests-riots-looting-75825aafc5412ae389c6d41443b4082e
4. AFP, Oct 19 aftermath and new protest calls: https://www.afp.com/en/france-announces-curfews-government-grapples-unrest
5. The Local, Oct 19 Oct 24 call: https://www.thelocal.fr/20261019/breaking-frances-yellow-vests-announce-more-protests-for-saturday
6. CGT, Oct 16 and Nov 5 strike plan: https://www.cgt.fr/actualites/france/mobilisation/il-est-urgent-de-repondre-aux-revendications-de-celles-et-ceux-qui-sont-lavenir-du-pays
7. CFDT, Oct 18 civil liberties and violence: https://www.cfdt.fr/sinformer/communiques-de-presse/mobilisation-du-17-octobre-la-cfdt-appelle-a-l-apaisement-et-au-dialogue
8. Ministry of Education, school initiatives: https://www.education.gouv.fr/construire-des-solutions-avec-les-lyceens-506143
9. Government Oct 1 fiscal report: https://www.info.gouv.fr/conseil-des-ministres/compte-rendu-du-conseil-des-ministres-du-01-10-2026
10. Reuters Oct 19 market reaction: https://www.reuters.com/business/finance/french-markets-tumble-riots-add-political-crisis-2026-10-19/

## Model state and causal gaps

~~~yaml
root:
  label: "S0"
  source_date_latest: "2026-10-19"
  current_mode: "OBSERVED_PUBLIC_REPORTS"
  participation: "LARGE_OCT17_REPORTED__COUNTS_CONTESTED"
  violent_incidents: "LOCAL_INCIDENTS_REPORTED"
  security: "LOCAL_CURFEWS_AND_RESTRICTIONS_REPORTED"
  education: "POLICY_WORKSTREAMS_ANNOUNCED__ACTUAL_IMPACT_UNKNOWN"
  fiscal: "OFFICIAL_PROPOSED_BUDGET_AND_DEBT_CONSTRAINTS"
  future_oct24: "CALLED_NOT_OBSERVED"
  future_nov05: "CALLED_NOT_OBSERVED"
  modeled_transition_probabilities: "UNKNOWN"
  modeled_causal_effects: "UNCALIBRATED"
  real_future_prediction: "NOT_VERIFIED"
~~~

Relevant open causal mechanisms: school policy implementation and reaction; changes in fuel and household costs; participation in mobilizations; local security measures and their actual consequences; union action and government response; budget debate. These are hypotheses, not independently quantified transition functions. Organized peaceful action, localized violence and property damage are different state variables.

## Adaptive Horizon and Decision Nodes

**S1: October 24–26**, after an announced next day of public mobilization: independently obtain turnout information with consistent denominators, safety/incident reporting and official verification of implemented school measures. The school holiday calendar may affect participation without proving a resolution.

**S2: November 5–10**, after the planned cross-sector strike: independently observe participation and documented fiscal/policy decisions. Until this point there is no verified actual turnout for the November 5 mobilization.

**S3: November–December budget deliberations**, only after relevant official dates and measurable outcomes become known. Not yet expanded numerically; causality and budget process remain uncertain. Do not fabricate a legislative deadline.

Every point must reconstruct available evidence, retain no-hindsight discipline, enumerate its declared hypothetical branches and re-root only on its actually verified state.

## S1 branching: 8 declared states (NOT future facts)

Three independent binary dimensions:
- Oct 24 participation: SUSTAINED_OR_BROAD or LIMITED_OR_DISPERSED.
- Incidents: SIGNIFICANT_INCIDENTS_REPORTED or NO_SIGNIFICANT_INCIDENTS_CONFIRMED.
- Education response: IMPLEMENTATION_VERIFIED or IMPLEMENTATION_NOT_VERIFIED.

Eight declared combinations. Importantly, high participation **does not entail violence**, nor does lower participation prove the absence of violent incidents. IMPLEMENTATION_VERIFIED only means documented execution, not public acceptance or causal effect.

Four participation × incident archetypes (policy response is independently split for each):

| Participation | Incidents | What could be inspected, NOT predicted |
|---|---|---|
| Broad | No significant incidents confirmed | Continued organized mobilization without corresponding confirmed large-scale violence |
| Broad | Significant incidents | Distinct large public mobilization plus localized disorder, independent attribution still required |
| Limited | No significant incidents confirmed | Smaller immediate street activity; underlying grievances still unknown |
| Limited | Significant incidents | Localized violence despite smaller rallies; do not infer motives or responsibility from turnout |

## S2 branching: 32 declared paths total

From each of 8 S1 worlds, 2 × 2 hypothetical continuations:
- November 5 cross-sector participation BROAD_CONFIRMED or LIMITED_OR_NOT_CONFIRMED.
- Documented budget/policy outcome CONCRETE_CHANGE_DOCUMENTED or NO_CHANGE_VERIFIED.

8 × 4 = 32. This is not the universe of all possible real events. An unexpected/intermediate observation must be marked MODEL_MISS and should expand the next model state, not be forced into one of these simplified bins.

## Model execution and finite budget validation

The independent [deterministic structural test](../tests/france_protests_2026_scenario_audit.js) actually enumerates all 32 declared state combinations:
- First stage: 8 branches.
- Second stage: 4 continuation branches for each; 32 terminal hypothetical paths.
- Global illustrative work ledger: 49 units (9 decision expansions + 40 declared outcome edges).
- Under work limit 19: 8 first-stage possibilities materialized, but only 2 are extended, leaving 6 unresolved; result BUDGET_EXHAUSTED.
- **18/18 structural assertions PASS** covering branch counts, provenance labels, unknown likelihoods, absence of claimed future facts, no political actor scoring, budget discipline and separate protest/violence axes.

A work unit represents an analytic branch expansion, NOT model tokens, real compute expense, or external action cost. This is qualitative scenario enumeration, **not** use of v4.2's exact Beta-Bernoulli optimizer. The latter needs calibrated action-dependent transitions and bounded payoffs not available for real French protests.

**Mathematical action certification cannot be issued.** There is no evidence-supported probability distribution over these 32 branches, no grounded scalar objective for the competing stakeholders and no reliable causal consequence model. Return NO_CERTIFICATE / NOT_RANKED rather than arbitrary numerical scores, a single predicted winner or politically evaluative verdict.

## Next observed state updates

When October 24 and November 5 have occurred or independently confirmed reports become available:
1. Freeze new source timestamps and compare same-scope counts; do not mix government and organizer tallies in one series.
2. Update only the actual observed branch; mark future other branches SIMULATED.
3. Check whether a new observation falls outside declared bins: MODEL_MISS / REVISE, not silently guessed.
4. Reassess the next policy/action information available, causal hypotheses, constraints and time horizon. Avoid treating curfew orders or education announcements as confirmed policy success.
5. Re-enumerate the next declared options under a shared computation budget and preserve UNKNOWN/ABSTAIN when the evidence is insufficient.

## Verdict and limitations

- **S0:** Supported by several recent public reports and direct stakeholder/government statements.
- **S1/S2:** Hypotheses only; dates of calls verified, participation/outcomes not observed.
- **Model reasoning:** Declared scenarios and 18 structural checks completed.
- **Forecast probability, causal calibration, economic/payoff prediction, political outcome:** UNKNOWN / NOT VALIDATED.
- **No production system, GitHub source projects, AOM or other Skills touched.** Only independent Test-LaB report and test documentation were written.

**Current status:** S0_OBSERVED / 32_DECLARED_SIMULATED_PATHS / NO_PREDICTIVE_PROBABILITIES / WAIT_FOR_OBSERVATION.
