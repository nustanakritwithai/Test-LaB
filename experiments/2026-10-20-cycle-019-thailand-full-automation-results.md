# Cycle 019 — Thai Full Automation Futures: Independent Multiverse Results

**Date:** 2026-10-20 (Asia/Bangkok)
**Preregistration:** [Cycle 019](2026-10-20-thailand-full-automation-preregistration.md)
**Executable reference:** [Thailand synthetic 16-world model](../tests/thailand_full_automation_scenarios.js)
**Status:** 73/73 STRUCTURAL TESTS PASS / REAL AUTOMATION FUTURES UNVERIFIED / NOT AN AOM SKILL MERGE
**Scope:** Test-LaB public, qualitative scenarios and declared toy budgets. No private data, system deployments or third-party writes.

## 1. Source-verified S0 context

The official [NSO Q2 2026 labor summary](https://www.nso.go.th/nsoweb/storage/survey_detail/2026/20260727145040_60885.pdf) reports 41.51m employed, split into 11.65m agriculture, **9.16m broad production sector (ภาคการผลิต)**, and 20.70m trade/services. These are the **three broad groups in the short summary**; 9.16m is NOT narrowly defined factory-manufacturing employment. This was checked against the NSO original. The earlier preregistration used the imprecise English word "manufacturing": the executable identifier and output were corrected to PRODUCTION_SECTOR after this source recheck, without rewriting the historical preregistration. In the full 185-page NSO survey, narrower industry groupings differ; do not collapse them.

The [separate NSO informal labor survey 2025](https://www.nso.go.th/nsoweb/storage/infomotion/2025/20251117142933_62029.pdf) reports 20.9m informal workers, 52.4% of 39.9m employed within the **2025 survey**. That is not an interchangeable denominator with Q2 2026 employment.

Additional source attributions in the executable refer to a Thai NSO yearbook elderly-population structure, BOT household credit context, the World Bank digital economic context and the IMF Asia regional labor analysis. Their numeric scopes, definitions and dates vary. Regional job exposure is **not** an observed Thai job-elimination proportion. Some secondary NSO source exact publication days are still UNKNOWN and warned by the reference script. The script validates source metadata, not every live webpage itself.

## 2. Conditional future premise

FULL AUTOMATION CAPABILITY AT DATE T* is explicitly ASSUMED. T* is UNKNOWN and is not asserted to happen by 2030 or any other date. Capability alone does not equal deployed systems, affordable access, displaced people, income adequacy or universal access to care.

Four independent-for-enumeration (NOT independent-for-causality) binary axes:
- Automation tools BROAD_ACCESS versus CONCENTRATED_ACCESS.
- Productivity gains WIDELY_DISTRIBUTED versus HIGHLY_CONCENTRATED.
- Income protection PORTABLE_INCLUSIVE versus PATCHY_JOB_TIED.
- Complementary demand ROBUST_TRANSITION versus WEAK_TRANSITION.

Their Cartesian product generates 16 declared morphological worlds. The prototype attaches conditional, non-numeric flags for six hypothetical Thai household archetypes: informal rural/farm, routine manufacturing worker, urban service/clerical worker, local microbusiness, older care-needing household, and young labor-market entrant.

NO distribution over 16 worlds, national unemployment count, future salary forecast, certainty or political policy ranking exists in this experiment.

## 3. Actual executed logic audit

The current GitHub reference was read back and the deterministic JavaScript test re-executed: **73/73 PASS** (originally 66, with subsequent source-quality hardening and semantic correction).

| Metric | Actual result |
|---|---|
| Distinct declared world combinations | 16 |
| Household archetypes per world | 6 |
| World × archetype conditional interpretations | 96 |
| Full toy work budget | 129 units = 17 expanded decisions + 112 outgoing scenario/profile edges |
| Budget limited to 59 | 6 expanded worlds, 10 explicitly unresolved |
| First two contrasted-world bitcodes | 0000, 1111 |
| Future probabilities or observed human impact | UNKNOWN / NEVER INVENTED |
| Actual action-policy certificate | NONE |

Counts of hypothetical flags do not represent prevalence or predicted population counts. “Complete” describes just the **declared** 16-scenario grid, not all future possibilities.

## 4. What the alternative worlds teach us

The broad-access/shared-gains/inclusive/robust case represents conditional ways technology could lower production friction while households still have viable income or support. The concentrated-access/concentrated-gains/patchy/weak-transition case represents conditional pathways to impaired earnings, market exclusion, service gaps and demand weakness. Neither extreme world is assigned odds; actual mechanisms may differ.

Automating tasks is NOT equivalent to every person losing employment. When labor income declines but ownership returns and benefits concentrate, lower goods prices need not resolve household liquidity shortages, especially with sticky obligations.

### Household identity test — SYNTHETIC UNITS, NOT BAHT

| Illustration | Earned income | Essentials | Debt service | Hypothetical transfer | Residual |
|---|---:|---:|---:|---:|---:|
| Baseline | 100 | 60 | 20 | 0 | 20 |
| Earned income −40%; essentials −20% | 60 | 48 | 20 | 0 | −8 |
| Same with invented +30 transfer | 60 | 48 | 20 | 30 | +22 |
| Same with high debt due 40 | 60 | 48 | 40 | 0 | −28 |

The identity is labor + capital income + transfers − essentials − debt service, but the transfer financing and wider market response are UNKNOWN in Cycle 019. These illustrative figures are not observed Thai prices, payments or a causal prediction.

## 5. Main deficiency to fix next

The first scenario grid is a cross-sectional morphological map, not a multi-period economic world model. In particular it does not yet calculate feedback between:
- firm receipts and subsequent wage/payroll capacity;
- capital owner income, worker dividends and domestic consumption demand;
- tax-financed transfers versus fiscal resources;
- housing obligations, debt service, household liquidity and arrears;
- installed production capacity versus actually sold goods.

It is therefore UNSOUND to treat the scenario flags as a solved macroeconomic path or attribute outcomes to any specific policy.

## 6. Decision and limits

Keep the independent v4.2.1 Evidence Gate. Develop a **separate** accounting-coherent, expressly synthetic feedback-loop test for these mechanisms. All coefficients, behavior rules, export demand and debt servicing must be labeled as invented fixtures, not national forecasts. Test accounting invariants and adverse counterexamples before adopting any extended causal rule.

**Final:** CYCLE_019_STRUCTURAL_PASS / NO_PREDICTION_OF_TSTAR_OR_JOB_LOSSES / UNCALIBRATED_CAUSAL_EFFECTS / NO_AOM_MERGER / NO_PRODUCTION_TOUCH.
