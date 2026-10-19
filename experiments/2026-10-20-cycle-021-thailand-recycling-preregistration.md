# Cycle 021 PRE-REGISTRATION — Thailand Automation: Monetary Recycling and Circular-Flow Stress Test

**Date:** 2026-10-20 Asia/Bangkok, before implementing Cycle 021 engine.
**Project:** Independent Multiverse World Model, NOT AOM/Skill integration.
**Dependency:** Cycle 020 feedback test, whose original preregistration and executable remain UNMODIFIED and reproducible.
**Status:** SYNTHETIC CAUSAL-CONTRACT STRESS TEST ONLY. No actual Thai economy forecast.

## 1. Known defect to test

Cycle 020's economic toy conserves revenue allocation inside each period but treats received money in suppliers, rent, debt creditor and saved-account channels as never spent again. Sales therefore collapse toward zero in several cases almost mechanically.

A macro conclusion from that partial circuit would be invalid. This round stress-tests the missing **monetary recycling** using a third aggregate recipient, while preserving the same worker, owner, firm, government, debt, physical supply and price equations.

## 2. Strict toy money account (all coefficients invented)

The new state at period t contains:
- firmReceiptsPrevious R_(t-1), initially 130 fictional cash units;
- outOfModeledHouseholdsStock L_(t-1), initially 0;
- worker outstanding debt, initial 75; worker housing arrears initial 0;
- no future knowledge.

Income split / public tax / dividends / housing / debt / worker-and-owner consumption use the EXACT Cycle 020 toy equations and shares (except new recycled consumer channel). All recorded leakages from the *current* receipt distribution equal:

NEW_LEAKAGE_CURRENT = materials + housingPaid + debtPaid + workerSavings + ownerSavings.

A third aggregate outside recipient has a stored monetary stock L_(t-1) acquired in previous periods (no free grants). It MAY desire spending of:
  aggregateThirdBuyerRequested = recyclingRate * L_(t-1),
where recyclingRate is fixed to 0, 0.5 or 1.0, explicitly synthetic. The third buyer's nominal demand competes fairly for the firm's nonexport physical capacity alongside worker and owner demands.

- All domestic buyer requests (worker + owner + aggregate third) are prorated by the SAME nonnegative supply-fulfillment fraction; exports draw from the same maximum 160-unit supply first.
- aggregateThirdBuyerRealized <= priorLeakageStock; it can NEVER spend today's new leakage before receiving it.
- R_t = exportRevenue + domesticWorkerGoods + domesticOwnerGoods + thirdBuyerRealized.
- L_t = L_(t-1) − thirdBuyerRealized + NEW_LEAKAGE_CURRENT.
- Hence the exact toy money-stock identity is R_t + L_t = R_(t-1) + L_(t-1) + exportRevenue, ignoring unmodelled monetary destruction/creation.
- Without exports, total modeled monetary assets (firm receipts + third-party cash stock) remain 130 in this artificial world, even if sales fall. Exports are EXOGENOUS foreign cash injections in this toy.
- Paid debt service and housing leak into L_t; loan principals/credit supply/bank interest revenues are NOT separately modelled as financial instruments. The interpretation is simply delayed re-spending of cash receipts, not a complete banking model.

Every number is made up. The returning fraction is NOT a measured Thai marginal propensity to consume, import leak, recycling time constant or financial multiplier.

## 3. Frozen comparisons — 10 steps each

Common price 0.8, goods capacity 160, payroll share .15, materials share .15, owner spending propensity .35, all other parameters from Cycle 020.

- B0: concentrated with zero recycling (must match original Cycle 020 B results).
- B50: same, recycling 0.5.
- B100: same, recycling 1.0.
- C0: worker ownership 0.35 + fully balanced owner-profit tax/transfer rate 0.2, recycling 0 (must match original Cycle 020 C).
- C50: C parameters with recycling 0.5.
- D0: concentrated with exogenous export demand 55 goods units per step, recycling 0 (must match original Cycle 020 D).

All cases remain stipulated toy scenarios; no named one is a "best" real economic policy.

## 4. Predeclared acceptance conditions

1. Income, government tax/transfer, household budget and debt mechanics match Cycle 020 for recycling=0 at all ten points.
2. No per-step revenue double counting and monetary-stock conservation with export injections exactly.
3. Leakage stock NEVER negative; no spending from current-period leakages before they enter the next step.
4. All three buyer types are rationed fairly by same factor when capacity is constrained; quantity sold+unsold=capacity.
5. No buyer spends more than that buyer has: worker disposable budget, owner income, previous third-buyer leakage stock.
6. Stage one of B0/C0/D0 must match frozen Cycle 020 outputs: initial sales B=31.85, C=50.024, D=75.85. Tenth-stage and cumulative totals must agree within floating tolerance.
7. With identical first-period cash conditions, recycling has zero effect in period 1 (stock initially zero), but can affect later realized revenue. No predetermined sign or universally “better policy” is required.
8. Model must show sensitivity to assumed recycling rate in at least one synthetic case; report actual trace, no post hoc tuning to force an outcome.
9. Tax-financed transfer cannot create new monetary assets; exports may inject external cash, explicitly marked as exogenous.
10. Global shared simulation-step cap: six arms × ten periods = 60. Cap 12 -> exactly two steps in each arm with remaining periods UNEXPLORED, no winner.
11. Invalid rate (<0 or >1), negative receipts, double spending, or shortage violates explicit checks.
12. No household worker income guarantee from technical automation capability; no measured Thai GDP, unemployment or income change.
13. Expose actual omitted: productive capital formation, endogenous pricing, firm bankruptcies, imports and exchange rate, multiple firm inter-industry flows, monetary bank-credit creation, savings preferences, policy politics, heterogeneous populations.
14. Keep AOM, other Skill instructions and all production untouched.

**Deliverables:** tests/thailand_automation_recycling_cycle021.js, world-model/THAILAND_AUTOMATION_RECYCLING_CYCLE021.md and experiments/2026-10-20-cycle-021-recycling-results.md.

**Success = internal consistency, adversarial cases, explicit dependence of outcomes on omitted financial-flow assumptions; NOT realistic macro forecasting.**
