# Multiverse Cycle 020 — Thai Automation Income-Demand-Debt Feedback: PRE-REGISTERED TOY TEST

**Date:** 2026-10-20 Asia/Bangkok, before implementing the new feedback script.
**Research status:** INDEPENDENT WORLD MODEL / FIXED SYNTHETIC RULES / NOT REAL-WORLD CALIBRATED.
**Dependency:** Cycle 019 16 qualitative futures and their formal, dated evidence-source assumptions. It is NOT AOM or an integrated Skill.
**Purpose:** Show that full automation capability alone cannot fix household affordability without tracking wages, ownership returns, consumption, debt and who receives the productivity surplus.

## 1. Hard epistemic boundary

All variables and coefficients below are MADE-UP dimensionless toy units, not Thai employment, prices, GDP, interest rates or policy impacts. Baseline NSO evidence is only *motivation for distinguishing informal/formal/debt-vulnerable households*, NOT parameter fitting. The system must run in SYNTHETIC_TOY_FEEDBACK, not QUANTITATIVE_FORECAST, because no empirical evidence supports this world's transition probabilities or causal effect sizes.

A period is a generic time step after hypothetical unknown future automation milestone T*, NOT a calendar year that we claim will occur. Use 10 deterministic steps to explore near-term S2 (steps 1-3) and long-term S3 (steps 5-10). No real Thai persons, accounts or intervention.

## 2. Frozen partial-economy flow identities

Three endogenous recipients of the LAST period's firm realized sales R_previous:
- Wages: wageShare * R_previous.
- Supplier/imported/material cost: materialsShare * R_previous (flows OUTSIDE the model's two consuming households).
- Pre-tax capital return: (1 - wageShare - materialsShare) * R_previous.
  Their sum MUST equal R_previous exactly.

Next:
- Public tax = taxRate * pre-tax capital return.
- Balanced public transfer to labor household = public tax. NO money created by the transfer (government ledger = 0).
- Shared dividends to workers = workerOwnershipShare * (pre-tax capital return - public tax).
- Disposable capital-owner profit = (1-workerOwnershipShare) * (pre-tax capital return - public tax).
- Labor-household income = wages + workers' dividend + public transfer.
- Sum (labor income + owner income + supplier/importer costs) MUST equal R_previous; tax and transfer never both counted as income.

Household cash uses:
- Worker housing due = 12 units per period; paid only up to available worker income. Unpaid housing is separately recorded as arrears.
- Worker debt starts at 75 units, interest 0.02/step; worker debt due is min(debt+interest, 14 units). Pay only with cash left AFTER paid housing; debt outstanding next = current principal+interest-debtPayment. Inability to pay can raise outstanding debt. No fictitious unlimited borrowing to buy essentials.
- Goods desired by worker = 80 physical units per period; nominal worker goods budget = min(80*goodsPrice, 0.9*cashRemainingAfterHousingDebt).
- Capital owner goods desired = 90 physical units; nominal owner goods budget = min(90*goodsPrice, ownerSpendPropensity*ownerDisposableProfit). Unspent owner saving/leakage is NOT automatically reinvested.
- Firm can sell <=160 physical units/period at an exogenous goodsPrice in {1,0.8}; no endogenous price equilibrium.
- Exports are exogenous demand in physical units, served first but still within the SAME 160-unit capacity; domestic sales then use remaining capacity. If supply constrained, ration nominal household requests proportionally.
- Actual sales revenue R_t = export receipts + realized domestic household purchases (each actual expenditure, not intentions).
- Quantity sold = actual sales revenue / goodsPrice. Unsold production capacity remains an idle capability.
- Next-step wages and profit are based on R_t; no double use of next period's demand in current incomes.
- Essential minimum for labor household = 50 units of goods; consumption shortfalls are measured relative to this arbitrary synthetic threshold.
- Money paid to housing, debt, suppliers and saved capital is outside this simplified firm's next-period household demand; do not claim this is a calibrated, closed Thai general-equilibrium economy.

## 3. Frozen experimental arms (all coefficients are synthetic)

Start previous-period firm receipts 130, 160 unit production capacity, 75 household debt units, housing due 12, debt due target 14, interest 0.02, suppliers share 0.15. Run 10 periods.

A — BASELINE_TOY: goodsPrice 1.0, wageShare .45, workerOwnershipShare 0, taxRate 0, capital-owner propensity .35, exports 0.
B — AUTOMATED_CONCENTRATED: goodsPrice .8, wageShare .15, ownership 0, tax 0, owner propensity .35, exports 0.
C — AUTOMATED_SHARED_RETURNS: goodsPrice .8, wageShare .15, worker ownership .35, balanced tax/transfer rate .20, owner propensity .35, exports 0.
D — AUTOMATED_EXPORT_DEMAND: same as B, exogenous exports demand 55 physical units/period.
E — AUTOMATED_CHEAPER_ONLY: same as B with goodsPrice .5 instead of .8.
F — BASELINE_CHEAPER_PRICE_ONLY: same as A with goodsPrice .8.

Do not assign any likelihood that A–F will actually occur. This design probes sensitivity; public facts do not identify these parameter values or the household spending propensities.

## 4. Frozen audit criteria, before outcome computation

1. Every period preserves previous receipts allocation and tax-transfer balance without creating new money.
2. All cash payments, goods purchases, quantities and debt stocks nonnegative and finite.
3. Physical quantity sold <=160, export sales never consume more than available firm capacity; unsold quantity reconciles.
4. Domestic cash purchases must equal realized (not desired) demand after rationing; no double counting in sales.
5. Debt stock evolves from interest and actually made payment, not from fictional future income; housing arrears reflect unpaid housing only.
6. Monetary value and physical quantity distinguished, especially when unit goods price declines.
7. Previous receipts determine current wages and returns; current sales determine NEXT receipts only.
8. A public transfer exactly equals the collected tax; its amount is bounded by actual capital return and is not free exogenous income.
9. Under concentrated parameters the worker may face declining income despite falling goods prices; test and report actual modeled trace, not require a preconceived numerical result.
10. Shared worker ownership and balanced transfers can shift purchasing power, but their outcomes must be measured and cannot be called empirically successful policies.
11. External export demand (positive) is a distinct mechanism and must never be silently assumed for every Thai sector.
12. Sensitivity with zero owner spending, high wages, zero income tax, high tax and supply rationing; no negative profits under valid parameter constraints.
13. Model-miss/invalid configuration triggers errors rather than silent output fabrication.
14. Produce a 10-period trace for every arm, compare periods 1, 3, 5 and 10 and cumulative sales/debt/needs. This is a synthetic causal simulation only.
15. Retain Cycle 019's 16-world exploratory grid **as qualitative**, do not turn its scenario flags into arbitrary probabilities.
16. Document key omitted mechanisms: investments, public procurement, banking and credit supply, interest as transfer to bank, savings recycling, international balance, land/energy constraints, household heterogeneity, industrial equilibrium, and political feedback.
17. No source or repository outside Test-LaB is modified; AOM and other Skills stay separate.

Deliverables:
- tests/thailand_automation_feedback_cycle020.js — standalone runnable deterministic toy model + tests.
- world-model/THAILAND_AUTOMATION_FEEDBACK_CYCLE020.md — separate noncanonical model note.
- experiments/2026-10-20-cycle-020-thailand-automation-feedback-results.md — test trace and documented limitations.

**Acceptance:** Correct accounting, no fake data, reproducible sensitivity. An apparent sales improvement is NOT a real-world policy verdict, a national forecast or a justification to automatically deploy any program.
