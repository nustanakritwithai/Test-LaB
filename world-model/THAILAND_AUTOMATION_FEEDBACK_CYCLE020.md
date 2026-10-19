---
title: "Thailand Automation Feedback — Independent Multiverse Toy Economy (Cycle 020)"
version: "0.1.0-lab"
date: "2026-10-20"
project: "Independent Multiverse World Model"
status: "SYNTHETIC_ACCOUNTING_TESTED / EMPIRICAL_CAUSAL_VALIDITY_UNKNOWN"
experiment: "experiments/2026-10-20-cycle-020-thailand-automation-feedback-results.md"
test: "tests/thailand_automation_feedback_cycle020.js"
no_skill_merge: true
production_changes: false
---

# Thai Automation Economy — Income, Demand, Debt and Distribution Feedback

This is a **separate synthetic submodel** for the independent World Model v4.2.1, NOT a replacement for the existing world-model Markdown or an AOM/Skill merger. It does not use Thai economic statistics as numerical coefficients. It describes a possible **mechanism** for thinking about the 16 qualitative Thai futures in [Cycle 019](../experiments/2026-10-20-cycle-019-thailand-full-automation-results.md).

## 1. Role and epistemic separation

- S0 = dated, attributed **observed** Thai labor and demographic data, kept in the Cycle 019 source ledger. NSO Q2/2569: 41.51m employed, grouped as 11.65m agriculture, 9.16m broad PRODUCTION (ภาคการผลิต), 20.70m trade/services in the short NSO summary; the 2025 20.9m informal-worker figure belongs to a different survey. These numbers are **not** used to fit the equations here.
- S1 = unknown technological milestone T*: capable automation of most feasible tasks is explicitly ASSUMED, not observed.
- S2 = toy periods 1-3 after T*, testing first distribution and consumption effects.
- S3 = toy periods 5-10 after T*, testing lagged sales, workers' debt and consumer demand. A toy period is not a forecasted Thai calendar year.
- QUALITATIVE_SCENARIOS is the highest supported real-world analysis mode. This submodel is separately labeled SYNTHETIC_TOY_FEEDBACK. Toy calculations **cannot unlock** real-world QUANTITATIVE_FORECAST or CAUSAL_DECISION in [Evidence Gate v4.2.1](REAL_WORLD_EVIDENCE_GATE_v4_2_1.md).
- AOM and other Skills are independent; do not import, merge or deploy this Markdown as an automatic operating layer.

## 2. A partial-economy accounting world (declared variables)

This world contains one simplified firm with fixed physical sales capacity of 160 toy units; one wage-dependent household; one capital-owning household; a transfer-only government; a debt account; plus out-of-model housing, lenders, suppliers and external demand.

All money values are **dimensionless toy units**, never Thai baht. No inflation, production cost optimization, financial intermediation, public debt, environmental feedback or real-life capital investment is estimated.

At each point, PREVIOUS firm sales R(t-1) fund:
- wages = wageShare × R(t-1)
- supplier/materials expense = materialsShare × R(t-1)
- pretax profit = [1 − wageShare − materialsShare] × R(t-1)
- income conservation: wages + materials + pretax profit = R(t-1)

Household distribution and fiscally balanced redistribution:
- collected tax = taxRate × pretax profit
- worker transfer = collected tax (no uncovered government deficit in this toy)
- dividend to worker = workerOwnershipShare × [pretax profit − tax]
- owner income = [pretax profit − tax] − worker dividend
- worker income = wages + worker dividend + transfer
- CONSERVATION: worker income + owner income + materials = R(t-1)

Worker obligations:
- housing due = 12 units each step; housing cannot be paid beyond available cash;
- debt initial stock = 75; interest charged at **synthetic** 0.02/step; intended service ≤14, actually paid only with remaining cash after housing;
- next debt = current debt + interest − ACTUALLY PAID debt service;
- unpaid housing creates a separately tracked rent-arrears stock;
- worker physical goods demand ceiling = 80 units, and purchases may use at most 90% of money remaining after payments;
- essential goods benchmark = 50 physical units. Shortfall is a fixture diagnostic, not measured poverty.

Owner desired goods ceiling = 90 physical units; owner consumes at most 35% of posttax/after-worker-dividend income. Savings are **not** automatically reinvested/spent; this is a major model boundary.

Actual market clearing:
- one exogenous fixed unit price (1, 0.8, or 0.5 depending on scenario);
- exogenous export demand is served within the SAME physical 160-unit capacity;
- remaining capacity is allocated to the worker and owner based on their cash-constrained requested expenditure, prorated if necessary;
- CURRENT firm sales = actual export receipts + actual domestic goods spending, never intended demand;
- next point pays wages and capital returns from CURRENT sales. Each step is recomputed; hypothetical trajectories never become real events.
- unsold capacity = 160 − sold goods units. More technological capacity is not identical to realized consumption.

## 3. Six independent stress cases (not probable futures)

| Regime | Unit price | Wage share | Aftertax worker ownership share | Balanced profit tax/transfer | Exogenous export demand (units) |
|---|---:|---:|---:|---:|---:|
| A baseline synthetic | 1.0 | .45 | 0 | 0 | 0 |
| B concentrated | .8 | .15 | 0 | 0 | 0 |
| C shared profit and transfers | .8 | .15 | .35 | .20 | 0 |
| D concentrated with exports | .8 | .15 | 0 | 0 | 55 |
| E concentrated, cheaper goods only | .5 | .15 | 0 | 0 | 0 |
| F baseline wage shares, cheaper goods only | .8 | .45 | 0 | 0 | 0 |

All wage shares, propensities, tax/dividend regimes, goods prices and export values are **artificial coefficients**. Changes across cases mix exogenous technology deployment with alternative income-distribution and trade rules. Do not infer that any regime is politically desirable or likely, or that a specific action causes these results in Thailand.

## 4. Model horizon and shared global budget

The declared experiment has six regimes × ten steps = 60 **synthetic work units**; one unit = one computed toy period for one regime.

Run all regimes in round-robin order, so budget constraints compare approximately equal horizons. With a budget of 12, each regime reaches only step 2 and has eight unresolved future steps. Return BUDGET_EXHAUSTED / actionCertificate=NULL, not a misleading ten-step policy ranking.

The toy sequence is not a search over real Thai policy interventions. It is a conditional propagation of explicitly stipulated rules. It has no real-world numerical probability distribution.

## 5. Why the first cycle's finding matters AND why it can mislead

Under the concentrated setup, labor cash after housing and debt can be zero even if the nominal price of goods falls. A cheaper unit price can raise physical goods purchased **only if some purchasing power remains**. Debt obligations, housing and ownership income do not fall automatically with the goods price.

Balanced transfers or employee ownership can increase the *modeled* worker's first-step purchasing power, without creating net new nominal receipts inside the simplified period. External demand can sustain firm sales, but does not automatically guarantee the wage-dependent household has cash after sticky obligations.

**Critical failure mode:** With fixed savings leakages, suppliers, rent and lender payments exiting the two-household domestic demand system, sales tend to shrink toward zero in several cases even with otherwise productive automation. That contraction is largely built into this deliberately INCOMPLETE circular-flow model. Real economies have investment, banks, renters/landlords, suppliers purchasing goods, government spending, exports and re-spending of savings, all of which can recycle financial flows. Therefore the model's ten-step declines must NEVER be presented as a forecast of Thai GDP, recession, household insolvency or unemployment.

## 6. Reference and validation

Executable self-tests: [tests/thailand_automation_feedback_cycle020.js](../tests/thailand_automation_feedback_cycle020.js).

- 130/130 deterministic checks passed in the connected JavaScript runtime, then the committed source was independently fetched again and re-executed.
- Six toy regimes, each ten steps; shared 60-work-unit cap.
- Factor-allocation, household cash-flow, tax/transfer, revenue-vs-demand, physical capacity and debt stock invariants.
- Manual first-point arithmetic baselines (including 58.5 wages, 47.45 baseline firm receipts, 18.2 taxed/transfer case and 44 export receipts).
- Price-sensitivity, tax=100% edge case, owner spending=0, capacity rationing, capped exports, insufficient debt service and invalid inputs.
- At a 12-unit cap, each of six regimes reaches two steps, with all remaining futures explicit as unresolved and no decision certificate.

**No quantitative forecasting or national causal calibration has been performed.** A PASS only validates internal equations and the declared fixture behavior.

## 7. Mandatory learning before future expansion

The next independent step should test model closure and recycling: add owner savings reinvestment, landlords' and lenders' purchases, public procurement, credit availability and external balance in separately preregistered synthetic cases; check conservation without inventing income; run counterexamples where low wage share does NOT result in domestic sales collapse. Add source-based empirical calibration only after a credible Thai task-by-task adoption and household transaction dataset exists. Until then treat all causal signs as scenario hypotheses.

**VERDICT:** TOY_FEEDBACK_ACCOUNTING_VERIFIED / THAI_FUTURE_CAUSAL_VALIDITY_UNKNOWN / NO_AOM_MERGER / NO_PRODUCTION_WRITE.
