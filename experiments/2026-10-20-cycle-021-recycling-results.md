# Cycle 021 RESULTS — Thailand Automation: Circular Money and Household Affordability

**Date:** 2026-10-20 (Asia/Bangkok)
**Scope:** Independent Multiverse World Model, not AOM, not unified Skills.
**Preregistration:** [Cycle 021 monetary recycling plan](2026-10-20-cycle-021-thailand-recycling-preregistration.md).
**Executable:** [thailand_automation_recycling_cycle021.js](../tests/thailand_automation_recycling_cycle021.js).
**Mechanism note:** [THAILAND_AUTOMATION_RECYCLING_CYCLE021.md](../world-model/THAILAND_AUTOMATION_RECYCLING_CYCLE021.md).
**Prior frozen experimental implementation:** [Cycle 020 executable](../tests/thailand_automation_feedback_cycle020.js); it remains unchanged.
**Status:** 216/216 DETERMINISTIC SYNTHETIC CHECKS PASS / REAL THAI FUTURE OUTCOME UNVERIFIED.
**External production actions:** NONE.

## 1. Question answered inside the declared synthetic model

Would the dramatic ten-step sales contraction in Cycle 020 still occur when some of the money previously paid as housing, debt service, input costs and owner/worker savings **returns as consumer demand**?

This is a stress test of a **missing-money-circulation assumption**, not a demonstration that future fully automated Thailand will behave like one of these six regimes.

The previous Cycle 020 six scenarios used one wage household, one capital owner, one goods producer, one transfer-only government and an outstanding debt account. Many cash transfers were never spent again. The new Cycle 021 adds an outside-recipient cash stock, initialized to ZERO, and permits a defined fraction to be spent during the following period, subject to the same physical production capacity as the existing buyers.

**Exact toy identity:** current firm receipts + end-of-step outside cash = previous receipts + prior outside cash + exogenous export receipts. The third buyer can spend only prior cash stock, not freshly generated money. Aggregate monetary stock therefore remains 130 toy units in regimes without exports, even as money moves between sales receipts and outside reserves.

## 2. Executed and checked behavior

**216 checks passed**, run from the committed JS source through the available JavaScript execution runtime. This includes:
- point-by-point equivalence of B0, C0 and D0 (zero recycling) to all ten Cycle 020 values for firm receipts, worker goods spending, owner goods spending, worker debt and arrears, so this is a genuine incremental test rather than a rewrite of earlier results;
- complete per-step cash stock identities;
- no access to future income to pay present purchases;
- physical supply and export caps, no over-spending, owner/worker tax-transfer accounting;
- independent returned-cash spending rate variations (0, 0.5, 1);
- low-budget equal coverage across six regimes (12 work units -> 2 steps each), with unresolved steps explicitly retained and no optimal-action certificate;
- deliberately invalid rate, cash stock, price/capacity and extreme export requests rejected or rationed.

Work units measure synthetic one-regime-one-period calculations and **do not measure seconds, Token consumption, THB or real compute efficiency**.

## 3. Numerical outcome table — every value is dimensionless FICTIONAL MONEY

Common initial firm receipts 130, starting worker debt 75, potential capacity 160 physical goods units per period, and other fictitious coefficients as documented in the preregistration.

| Regime | Recycle share | First-step sales | Second-step sales | Step 10 sales | Ten-step sales total | Worker debt at step 10 |
|---|---:|---:|---:|---:|---:|---:|
| B0 concentrated, none returned | 0 | 31.850 | 7.803 | 0.00010 | 42.185 | 82.461 |
| B50 concentrated, half returned | 0.5 | 31.850 | 56.878 | 51.793 | 502.038 | 82.461 |
| B100 concentrated, all returned | 1 | 31.850 | 105.953 | 77.440 | 718.129 | 75.256 |
| C0 shared toy gains, none returned | 0 | 50.024 | 6.373 | 0.0000004 | 57.328 | 60.268 |
| C50 shared gains, half returned | 0.5 | 50.024 | 46.361 | 57.953 | 506.705 | 0.000 |
| D0 exports, none returned | 0 | 75.850 | 62.583 | 58.278 | 606.055 | 82.461 |

Important: the 0.5 and 1.0 rates are DECLARED SCENARIO INPUTS, not actual Thai reuse-of-cash propensities. The numeric response follows necessarily from these equations and missing sectors. It is NOT an estimated effect of reform or a recommended intervention.

With no exports, firm receipts plus other cash always total 130, but cash flows can turn over repeatedly. Therefore **the sum of ten periods of sales is NOT a measure of new monetary wealth or Thailand GDP.**

### Critical observed model-internal distinctions

- B0 versus B50: first-period sales identical because the recipient cash stock started at zero, but second-period sales differ sharply (7.803 versus 56.878 toy units). This confirms delayed cash circulation is causally active **inside the declared equations**. It does not establish a real-world sales multiplier.
- **B50 firm sales recover without worker debt improving:** B0 and B50 both end at 82.461 toy debt units even though firm receipts are vastly different. The model shows why “more automated production/firm sales” cannot be equated with the wage-dependent household's ability to pay.
- B100 has very different time-path dynamics, which confirms model results are sensitive to assumed recipients' spending rate.
- C50 combines artificial worker dividends and a profit-tax-funded transfer with 50% recycling. The toy worker repays the initial debt by step 10; this depends on fictitious distributions and model rules, not proof that a proposed real tax policy would do that.
- D0 exports generate 44 toy monetary units per period (55 physical export goods at the stipulated 0.8 unit price). Over ten periods this injects 440 externally, so end firm receipts + outside stock equals about 570 (= 130 + 440), exactly as the toy cash ledger requires. No actual future Thai export contract or external demand is asserted.

## 4. What this teaches the World Model

**Cycle 019** distinguished technology capability from ownership, distribution, access and protection, but was qualitative.

**Cycle 020** made household income, debt and firm sales interact. It suffered from funds leaving its domestic-demand circuit permanently, giving contraction even with high technological capability.

**Cycle 021** preserved the earlier equations, added a distinct recipient cash stock and verified the money-flow identity. It demonstrated that one omitted recycling channel can dramatically change future paths without any new technical automation assumption.

**New finding:** model state must include more than workforce task capability and current wages. It needs the right MONEY STOCKS, spending destinations, institutional recipients, delayed flows and sector-to-sector feedback. An incomplete state can produce an internally consistent but misleading future.

**BUT:** this toy is still not a complete Thai economy. We have not measured real Thai productivity growth, capital returns, cost shares, household saving rates, actual robot adoption, credit supply, public investment, export demand, price formation or welfare.

## 5. Failure modes and next acceptance gate

- Heterogeneous money recipients are compressed into one “outside stock” that spends at an invented fixed rate; in reality import payments may leave the country, landlords and creditors have different spending behavior, and savings may flow through banks/investment rather than commodity purchases.
- Real firms invest, borrow, compete, fail and vary price. All these are missing.
- The public transfer in this toy is wholly funded by profit tax; actual programs have administrative costs and fiscal constraints, and no political-policy preference or endorsement is inferred here.
- Physical production capacity may be underused without demand, but this is not sufficient to estimate national unemployment or real GDP.
- The official Thai 2025–26 labor data were used solely for baseline context and NOT to calibrate any behavioral coefficient or conditional event probability.
- The input can no longer be labeled a real causal forecast simply because its toy accounting tests pass.
- The model does NOT know when “full automation” will arrive (T*=UNKNOWN).
- Further model generalization would require realistic multi-sector flow-of-funds and independently validated transition evidence; do not create a large app or simulation engine without a specific research question.

## 6. Files, reproducibility and operational limits

To run from a local clone of Test-LaB:

    node tests/thailand_automation_recycling_cycle021.js

The CLI uses only Node.js 18+ built-in FS/VM to load the **existing** Cycle 020 engine and the standalone extension; no external web calls, npm install, background tasks, user data or production writes. The assistant's evaluation ran in the available JavaScript runtime; a separate Node CLI run is not claimed unless subsequently executed and verified.

**Disposition:** Accept Cycle 021 as a **synthetic causal-accounting counterexample** demonstrating sensitivity to omitted cash-loop structures. Preserve v4.2.1 evidence-gate Markdown and independent AOM operating MD untouched.

**Final:** 216/216 STRUCTURAL_PASS / 60/60 TOY_WORK_UNITS / MACRO_CLOSURE_STILL_INCOMPLETE / REAL_THAI_OUTCOMES_UNKNOWN / NO_SKILL_MERGER.
