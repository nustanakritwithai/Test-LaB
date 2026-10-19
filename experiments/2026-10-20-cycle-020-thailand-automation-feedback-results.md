# Multiverse Cycle 020 — Thailand: Automation, Household Income, Demand and Debt Feedback

**Date:** 2026-10-20 (Asia/Bangkok)
**Project:** Independent Multiverse World Model, not AOM or a combined Skill.
**Pre-registered model rules and comparisons:** [Cycle 020 preregistration](2026-10-20-cycle-020-thailand-automation-feedback-preregistration.md).
**Standalone JavaScript test:** [thailand_automation_feedback_cycle020.js](../tests/thailand_automation_feedback_cycle020.js).
**MD model contract:** [THAILAND_AUTOMATION_FEEDBACK_CYCLE020.md](../world-model/THAILAND_AUTOMATION_FEEDBACK_CYCLE020.md).
**Prior experiment:** [Cycle 019: Thailand 16 futures](2026-10-20-cycle-019-thailand-full-automation-results.md).
**Status:** 130/130 SYNTHETIC ACCOUNTING AND REGRESSION CHECKS PASS / REAL THAI ECONOMIC EFFECTS UNVERIFIED.
**External effects:** NO source repos, production systems, financial accounts, WordPress, Facebook or AOM changed.

## 1. Research question — explicitly conditional

Assume an unknown future technical milestone when automation could perform most economically feasible work at adequate quality. This milestone T* is NOT an observed 2026 fact, and no year of arrival is claimed.

Instead of declaring “all Thai people lose jobs”, test how wages, ownership shares, capital income, a fiscally financed transfer, sticky housing/debt costs, goods prices, local purchase demand and exogenous foreign demand can interact across 10 fully **synthetic** calculation steps.

The 2026 Thai labor and household context is used to define sensible types of concerns; not one fictional coefficient is fitted to official Thai employment or economic statistics. The separate 16-world grid remains qualitative. Cycle 020 is a small partial-economy mechanism fixture, NOT a calibrated macroeconomic forecast.

## 2. Equations and internal identities

For each step t, firm receipts from the immediately PRIOR step are split into employee wages (wageShare), input/material payments (materialsShare), and capital return (residual share). Tax comes only from capital return and is fully transferred to the wage household (no money is created by the transfer). Employee dividends are carved out of AFTER-TAX capital return. All flows conserve the previous receipts.

Worker goods spending comes only from worker income remaining AFTER housing and actually paid debt service. Owner goods spending is limited by own after-tax profit and a consumption propensity. Physical output capacity is fixed at 160 units per toy step. Exports are an exogenous demand injection served within that capacity. Actual realized goods sales, not planned production or potential demand, become the next step's factor-income base.

Debt is a stock: next outstanding balance = current outstanding + synthetic interest − actually paid service. Unpaid housing is recorded separately. No unlimited borrowing is generated to meet consumption needs.

Critical missing flows: supplier/importers, landlords, debt creditors, owner and worker savings, government purchases and capital investment do not recycle their receipts into goods demand. This is a **partial** economic circuit with deliberate demand leakages, not a national input-output model.

## 3. Exact executed test status

Deterministic tests were run by evaluating the full JavaScript source in the available JS runtime, and subsequently the committed GitHub source was fetched and executed again.

**130/130 PASS.**

- Six preregistered configurations × 10 periods = 60 simulation-step work units.
- Each period conserves previous firm receipts across wages, materials and capital return; workers + owner + materials reconcile to receipts; public tax balances transfer.
- Physical sales never exceed capacity; nominal spending, exports, sold quantity and unsold potential reconcile.
- Housing/due-debt payments never exceed available cash; debt does not disappear when unpaid.
- Price changes distinguish physical units and nominal expenditure.
- Stress tests: zero owner spending, tax rate 100% in the toy, invalid factor shares, constrained supply with proportional rationing, export demand above firm capacity, inability to pay debt interest, and invalid inputs.
- At global budget 12, the six synthetic regimes receive TWO periods each (round-robin), leaving eight future periods per regime UNEXPLORED. No policy/action certificate is manufactured.

A work unit is **a simulated regime-period**, not a token, second, THB, compute joule or independently observed real event.

## 4. Six parameter scenarios — ALL NUMBERS SYNTHETIC, not Thai baht

Common previous sales = 130, potential capacity = 160 physical goods units, initial worker debt stock = 75, housing due 12, target debt service 14, annual-like step interest 0.02. These are **fictional model parameters**; no equivalent observed Thai national wage share or debt ratio is implied.

| Arm | Goods unit price | Payroll share | Worker dividend share (after tax) | Capital profit tax/worker transfer | Export physical units |
|---|---:|---:|---:|---:|---:|
| A — baseline toy | 1.0 | 0.45 | 0 | 0 | 0 |
| B — concentrated gains | 0.8 | 0.15 | 0 | 0 | 0 |
| C — shared worker ownership + balanced tax | 0.8 | 0.15 | 0.35 | 0.20 | 0 |
| D — concentrated but with external demand | 0.8 | 0.15 | 0 | 0 | 55 |
| E — concentrated with goods cheaper still | 0.5 | 0.15 | 0 | 0 | 0 |
| F — baseline income split + lower price | 0.8 | 0.45 | 0 | 0 | 0 |

**Model-declared causal links only**: these interventions change explicitly stipulated partial-economy flow equations. They have not been identified as true Thai economy effects.

## 5. Numeric toy trace — lower sales are not a GDP prediction

| Scenario | First-step actual firm receipts | Step 3 firm receipts | Step 10 firm receipts | Sum of receipts, all 10 steps | Final synthetic worker debt stock |
|---|---:|---:|---:|---:|---:|
| A baseline toy | 47.450 | 0.930 | 0.000001 | 55.174 | 63.735 |
| B concentrated | 31.850 | 1.912 | 0.000101 | 42.185 | 82.461 |
| C shared returns | 50.024 | 0.812 | 0.0000004 | 57.328 | 60.268 |
| D exports | 75.850 | 59.333 | 58.278 | 606.055 | 82.461 |
| E extra price reduction | 31.850 | 1.912 | 0.000101 | 42.185 | 82.461 |
| F baseline income split + lower price | 47.450 | 0.930 | 0.000001 | 55.174 | 63.735 |

**DO NOT TRANSLATE THESE RECEIPT TRAJECTORIES INTO A THAI RECESSION FORECAST.** The repeated collapse toward zero in A/B/C/E/F is largely an *artifact* of partial circulation: capital owner savings, suppliers' sales receipts, landlord rent receipts, lending payments and public investment never return as demand. A national economic model MUST include those flows before drawing even provisional macroeconomic conclusions.

### The first step reveals conditional distinctions without exaggerated certainty

- A: prior receipts 130 create payroll 58.5, materials 19.5, capital income 52. Labor household buys 29.25 nominal units' worth of goods, capital household buys 18.2, total firm receipts 47.45.
- B: payroll falls to 19.5 under the **hypothetical** low-wage-share configuration. After 12 housing and 7.5 debt paid, the worker has no cash remaining for goods; capital owner spends 31.85. Lower price does not force improved cash liquidity.
- C: from pretax capital return 91, collected tax/worker transfer = 18.2, worker ownership dividends = 25.48, owner income = 47.32 and worker income = 63.18. First-step firm receipts rise to 50.024, **within this mathematical fixture only**. Such transfers are not free or externally observed.
- D: 55 physical goods exported at price 0.8 generate 44 exogenous sales units, total first-step receipts 75.85; exports support receipts in subsequent toy periods while worker essential-goods shortfalls may persist. The export mechanism was assumed, not observed to exist.
- E: goods price drops further to 0.5 but with worker cash after fixed obligations already zero in B, additional price cuts have no effect on their immediate purchasing ability.
- F: with baseline wage share unchanged, goods cost reduction from 1.0 to 0.8 raises worker first-step *physical* goods from 29.25 to 36.5625 units while nominal worker spending remains 29.25. Real quantities and nominal cash are distinct.

Under scenario D the ten-step export receipts total 440, explicitly exogenous. Total sales 606.055 include 166.055 of domestic receipts and 440 of foreign demand; firm receipts should not be confused with domestic household welfare.

## 6. Learning from model failure

The most important discovery is NOT a numerical "winner." It is that a sophisticated world-model simulation can enforce every arithmetic identity yet still generate unrealistic macro paths because it excludes essential monetary recycling and equilibrium adjustments.

A world with abundant automation capacity can have low simulated domestic demand if wages and ownership income do not reach consumers. BUT the model's later sharp decline is largely baked in by fixed owner savings, supplier costs, rent/lender and other money leaving the modeled spending loop permanently. This prevents any honest extrapolation to Thailand.

It would be misleading to claim that a specific tax/transfer regime has been proven beneficial or that exports will rescue Thai aggregate demand. The model does not include who buys the exports, international balance, resource costs, capital accumulation, government spending, banking credit, landlord purchases or household saved balances.

The subsequent Multiverse development priority is **CIRCULAR_FLOW_CLOSURE / RECYCLING_STRESS_TEST**: explicitly model landlord/lender/supplier purchases and owner reinvestment, and test if an alternative internally conserving economy produces very different trajectories with otherwise identical initial parameters. Any such rates should remain invented until real evidence exists. Do NOT tune retroactively to make a preferred outcome win.

## 7. Decision, ethics and operational status

- Preserve the 16-world qualitative map and six household archetypes as a separate layer. Cycle 020's two-household dynamic fixture does not cover actual Thai population distribution.
- Keep v4.2.1 evidence/source gate active. No invented probability that all jobs are eliminated, T* occurs in a given year, or that one institutional/party option is socially superior.
- Every reported number after S1 is labeled **SIMULATION**. Sources about 2025/2026 Thailand remain evidence-context only; direct future observations are absent.
- No individual citizen profiles, political actor ratings, AOM mergers, unattended monitoring, market orders or changes to production.

**Verdict: 130/130 TOY_ACCOUNTING_PASS / 16 WORLD GRID REMAINS_QUALITATIVE / NUMERIC_THAI_FUTURE_UNVERIFIED / NO_AOM_SKILL_MERGER.**
