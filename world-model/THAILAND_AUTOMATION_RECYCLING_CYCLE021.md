---
title: "Thai Automation Economy — Monetary Recycling Stress Test"
version: "0.2.0-lab"
date: "2026-10-20"
project: "Independent Multiverse World Model"
status: "SYNTHETIC_PARTIAL_ECONOMY_REGRESSION_VERIFIED / REAL_WORLD_CAUSAL_VALIDITY_UNVERIFIED"
parent: "world-model/THAILAND_AUTOMATION_FEEDBACK_CYCLE020.md"
preregistration: "experiments/2026-10-20-cycle-021-thailand-recycling-preregistration.md"
test: "tests/thailand_automation_recycling_cycle021.js"
report: "experiments/2026-10-20-cycle-021-recycling-results.md"
no_aom_or_skill_merger: true
production_changes: false
---

# Thailand Automation World Model — Accounting Closure & Monetary Recycling

**Independent World Model laboratory note, NOT a Thai GDP forecast.** The base [Cycle 020](THAILAND_AUTOMATION_FEEDBACK_CYCLE020.md) discovered that a stylized firm can lose almost all nominal sales when nearly all money paid to owners, landlords, lenders and input suppliers is assumed to leave the two-household consumer system forever. That was a mathematical leakage assumption, not a future fact.

Cycle 021 explicitly models this **missing recipient's stored cash** and conditional re-spending. This is NOT a general equilibrium model, banking simulation, proof of future transfers, or a nationally calibrated macroeconomic agent system.

## 1. Source and assumptions firewall

The genuine Thailand S0 is the separately attributed NSO/BOT/World Bank context recorded in [Cycle 019](../experiments/2026-10-20-cycle-019-thailand-full-automation-results.md). The work here starts at fictional T*: full technical automation capability ASSUMED at an unknown future date. Toy periods 1–10 do not correspond to known future Thai years.

Values such as initial firm revenue=130, initial worker debt=75, owner consumption propensity=.35, worker propensity=.9, wage share=.15, goods price=.8, bank interest=.02 and the recycling parameter are **dimensionless invented coefficients**. No formula has been fitted to the 2025/2026 NSO employment statistics. The 16 original worlds remain qualitative, not probabilities.

## 2. Flow-of-funds state contract

The original [Cycle 020 engine](../tests/thailand_automation_feedback_cycle020.js) allocates last-step firm receipts:

- wages + materials suppliers + pretax capital return = prior firm receipts;
- after-tax worker dividends + owner income + capital income tax = capital return;
- worker income = wages + worker dividends + government transfer;
- government transfer = collected capital tax: no deficit in this toy.

Worker goods purchases occur after housing and actual debt service; capital owner spending uses a stipulated spending propensity. Housing, debt creditors, materials and household savings are outside the two consumers' current goods market. Cycle 020 implicitly parked those receipts forever.

**New explicit stock:**
- R_(t−1) = previous step firm receipts;
- L_(t−1) = monetary assets retained by the other/saving recipients, initially 0;
- NEW_LEAKAGE_t = supplier/material payment + housing payment + debt payment + worker saving + owner saving;
- OTHER_DEMAND_t = recyclingRate × L_(t−1), with recyclingRate in [0,1] as a hypothesis;
- Actual third-party goods spending is min(OTHER_DEMAND_t, its prorated physical-capacity allocation);
- R_t = export receipts + actual wage-household goods purchases + owner goods purchases + actual third-party goods purchases;
- L_t = L_(t−1) − actual third-party spending + NEW_LEAKAGE_t.

**Global money-stock invariant within this artificial partial circuit:**

    R_t + L_t = R_(t−1) + L_(t−1) + export receipts_t

This identity is exact in the toy because the stored cash is not generated twice, the third party spends only previously stored funds, and every current-period household payment/owner saving is allocated once. Supplier/import payments are treated as cash that may or may not return: the assumed recycling rate is doing the work, not observed Thailand balance-of-payments evidence.

Without exogenous exports, the model's firm receipts plus outside cash reservoir always total the original 130 synthetic monetary units. The fact that the *same stock of money can turn over repeatedly* must NEVER be interpreted as having produced new national wealth.

The worker's debt follows previous outstanding principal + fictitious interest − actual payment, separate from housing arrears. Fiscally neutral taxes/transfers do not add to total money.

## 3. Recycled demand and physical capacity

The same 160 physical goods per period are available at a fixed synthetic price. Export demand is served within that capacity. Worker, owner and third-buyer nominal purchase requests share the remaining physical capacity at the **same proportional fulfillment factor**. Nobody can pay more than their available funds; unmet purchases remain unfulfilled. All regimes start with L0=0, so NONE can have third-party spending in period 1.

The next period's firm factor incomes are based on sales actually realized (including the third-party buyer), not on production capacity, unfulfilled requests or an imagined future observation.

Each virtual step consumes one global work unit; six regimes × ten steps = 60. Under a global cap of 12, all six regimes reach only two steps and eight unexpanded futures remain per regime.

## 4. Frozen sensitivity regimes

These do not represent frequencies, political choices, or promises of future deployment:

| Regime | Cycle 020 parent | RecyclingRate |
|---|---|---:|
| B0 concentrated / no recycling | B automated concentrated | 0 |
| B50 concentrated / half recycling | B | 0.5 |
| B100 concentrated / full recycling | B | 1.0 |
| C0 shared worker ownership & balanced transfer, no recycling | C automated shared returns | 0 |
| C50 same shared case, half recycling | C | 0.5 |
| D0 concentrated with EXOGENOUS exports, no recycling | D automated export demand | 0 |

The rest of the income, wages, prices, debt and consumption contract is identical to Cycle 020. Crucially, 0%, 50% and 100% cash recycling are NOT estimated Thai reinvestment or consumer behavior rates.

## 5. Validation and observed synthetic results

[Cycle 021 executable tests](../tests/thailand_automation_recycling_cycle021.js) reuse the Cycle 020 formulas without editing the frozen Cycle 020 file. Node.js 18+ CLI loads the earlier local source with standard-library FS and VM, and then runs the new assertions. No network, npm or external API is used.

**216 deterministic checks PASS**, including:
- 10-step complete replay regression for B0, C0, D0 compared *point by point* to Cycle 020 sales, household debt, goods purchases and arrears;
- revenue/money conservation, no double-spending from the current period's leak, no spending above money held in the third-party stock;
- physical supply limit, proportional rationing, exports within capacity, and government tax equals worker transfer;
- invalid rates/debt stock/work budget, insufficient physical supply and over-large export demand;
- global budget 12 = exactly 2 steps in each six regimes and no certified action under incomplete coverage.

**Model output (NOT Thai currency):**

| Regime | First period receipts | Second period receipts | Final 10th period receipts | Final stored outside cash | Final worker debt |
|---|---:|---:|---:|---:|---:|
| B0 | 31.850 | 7.803 | 0.0001 | 129.9999 | 82.461 |
| B50 | 31.850 | 56.878 | 51.793 | 78.207 | 82.461 |
| B100 | 31.850 | 105.953 | 77.440 | 52.560 | 75.256 |
| C0 | 50.024 | 6.373 | 0.0000004 | 130.000 | 60.268 |
| C50 | 50.024 | 46.361 | 57.953 | 72.047 | 0.000 |
| D0 | 75.850 | 62.583 | 58.278 | 511.722 | 82.461 |

The **D0** example includes 44 invented monetary units of foreign export receipts per step, for a ten-step total of 440. Therefore total firm cash plus outside stock ends at about 570 (= initial 130 + exogenous 440), exactly as the toy accounting requires.

## 6. Causal interpretation — what the model did and did NOT learn

The B0 and B50 cases have identical first-period worker income, price and housing/debt obligations. But allowing half of the prior recipients' cash stock to return as next-period demand changes later sales radically. This **demonstrates structural sensitivity to money circulation assumptions**, not that any specific recycling percentage is true for Thailand.

B50 ends with stronger firm turnover but the *same* final worker debt as B0 under its rigid wage, housing and debt mechanics. **Firm receipts are not household well-being**. The identity of the cash recipients and ownership of productive capital matter.

Under C50, the same stipulated worker dividends plus balanced tax-funded transfers and an invented 50% cash recycling rate permit the toy wage household to finish paying its initial debt. That is a mathematical result of arbitrary rules, **NOT an empirical recommendation to tax/distribute profits at any particular rate**.

More money circulating around the firm does not mean greater real resource production, since the firm's maximum quantity is already fixed; it also does not prove meaningful real wages, purchasing power, welfare gains, investment viability or national GDP.

## 7. Hard limits: what must be solved before generalization

Even Cycle 021 is not a closed Thai economy:
- The third buyer aggregates unrelated foreign suppliers, debt creditors, landlords and savers with one invented uniform spending fraction. A realistic model must separate them, distinguish imports from domestic spending and determine how external leakages can actually return.
- All unit prices, productive technology, wage/capital shares, desired goods and spending propensities are exogenous. Capital formation, banking, loan defaults/credit creation, government services, imports, exports and exchange rates are not estimated.
- Firms cannot fail or expand. No actual workers are displaced; labor income shares are imposed.
- One wage household and one owner household cannot represent rural/informal/formal/elderly/young Thai populations.
- Because no real estimated transition, the analysis remains **SYNTHETIC_TOY_FEEDBACK**, not real-economy CAUSAL_DECISION or QUANTITATIVE_FORECAST.
- No 10-step trajectory is a dated 2030/2040 forecast. T* is an assumption, not a predicted event.

**Next evidence gate:** if continuing, first obtain independent Thailand input-output accounts, household income-and-expenditure distributions, credit service/loan data and sectoral adoption evidence; then decide whether a larger economic simulation adds value. Do not add a framework to compensate for absent data.

**VERDICT:** RECYCLING_STRESS_LOGIC_PASS / 216_REGRESSION_CHECKS / MODEL_SENSITIVITY_CONFIRMED / EMPIRICAL_CAUSAL_VALIDITY_UNKNOWN / NO_AOM_MERGE / NO_PRODUCTION_TOUCH.
