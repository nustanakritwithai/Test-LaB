# Cycle 022 Results — Thailand Multisector Income, Deposits, Banks, Government and Trade

**Date:** 2026-10-20 (Asia/Bangkok)
**Project:** Independent Multiverse World Model, separate from AOM and all other Skills.
**Frozen contract:** [Cycle 022 preregistration](2026-10-20-cycle-022-multisector-preregistration.md), commit 66ae3414576aca4cb64fa8ebe880d83b3de34fab.
**Executable:** [Cycle 022 JavaScript financial ledger](../tests/thailand_multisector_flow_cycle022.js), commit 0621c192880e9809861679baec58db05afd87be4.
**MD source of operating equations:** [THAILAND_MULTISECTOR_FLOW_CYCLE022.md](../world-model/THAILAND_MULTISECTOR_FLOW_CYCLE022.md).
**Context and predecessor:** [Cycle 021 recycling](2026-10-20-cycle-021-recycling-results.md).
**Status:** DETERMINISTIC SYNTHETIC MULTISECTOR LEDGER TEST 147/147 PASS / EMPIRICAL THAI MACRO PREDICTIVE SKILL UNVERIFIED.
**No AOM/Skill merger / no production modifications / no autonomous monitoring.**

## 1. What we really built

Earlier Cycle 021 represented workers, an owner, one producer and a large anonymous recycled-cash pool. It could conserve toy money claims while hiding **WHO held the cash and WHAT each recipient could do with it**.

This cycle replaces that aggregate reservoir with seven identifiable transaction holders:
- H_WORK worker household
- H_OWNER owner/rent household
- F_GOODS consumer goods producer
- F_INPUT intermediate domestic firm
- F_AUTO technology/robot services firm
- GOV government
- ROW foreign sector/cash-holder

The commercial bank additionally tracks:
- BANK_RETAINED cash available for its operating purchases
- an outstanding loan asset matched to the worker's debt liability
- an unpaid-interest receivable matched to the worker's unpaid interest.

The model is a **partial stock-flow consistent settlement toy**, not a complete Thai national accounting system, a calibrated commercial bank balance sheet or a predictive multisector Thai economic equilibrium model.

## 2. Provenance — actual public Thailand sources, their limited use

- NESDC [I/O 2021 16 Sectors](https://www.nesdc.go.th/download/i-o-2021-16-sectors/): identifies the need to distinguish intermediate outputs, imported inputs and final sales; **the actual 16×16 I/O numeric matrix was NOT downloaded/imported/fitted**.
- NESDC [Flow-of-Funds 2020–2024](https://www.nesdc.go.th/en/download/flow-of-funds-accounts-of-thailand-2020-2024/), listed published April 30 2026: identifies separate institutional financial sectors for economic accounting. No 2024 deposit balance or credit-flow amount was imported as a coefficient.
- BOT [SDDS public economic/financial table](https://www.bot.or.th/en/statistics/sdds.html) reports provisional **Q2 2026 nominal GDP 4,793.5 billion THB** and Q2 2026 employment 41,510.7 thousand persons. These are context showing national-account time/unit distinctions, **NOT** the model's receipts or employment forecasts.
- Different Thai/English NESDC listings show inconsistent apparent publication metadata for the 2021 I/O file; distinguish the **data reference year (2021)** from the website listing date. Additional primary source archive verification is still required before using the numeric workbook.

All remaining numbers are declared made-up dimensions; worker tax rates, exporter orders, bank credit and firms' input coefficients were NEVER estimated from NESDC/BOT.

## 3. Frozen synthetic parameters and institutional accounting

Initial deposits (all toy units): H_WORK 12; H_OWNER 18; F_GOODS 160; F_INPUT 10; F_AUTO 10; GOV 30; ROW 60. Total deposits **300**.

Bank retained **5**; outstanding bank loan asset **40**; worker debt **40**. Thus one conserved model invariant is **deposits + bank retained − bank loan asset = 265**. This is NOT a real measure of Thailand wealth or central-bank money.

A regular bank deposit transaction debits a payer and credits a payee by the same amount. Interest paid shifts worker deposit funds into bank retained income; loan origination increases both the worker's deposit and the matched asset/debt claim, while principal repayment destroys deposits and decreases asset/debt. Unpaid interest accrues as two matching claims without being called paid profit.

Gov transfers use its OPENING funds only, not taxes from later in the same step. ROW export purchases are budgeted from its OPENING foreign-sector deposit balance; goods cannot be exported by inventing inexhaustible ROW buying power. All purchases, bank operating expenses and exports draw from a single physical sales capacity of either 160 or 240 toy goods units. Supply rationing is proportional for all buyers.

This approach improves the *auditability* of cash flows. It does NOT prove modern commercial bank reserve constraints or value added accounting. Sales turnover must not be reported as GDP.

## 4. Actual executed test status

The committed [standalone JavaScript test](../tests/thailand_multisector_flow_cycle022.js) was fetched back from GitHub and executed in the assistant's available JavaScript/V8 runtime.

**147/147 deterministic assertions PASS** — including source-definition and no-calibration boundary, initial and per-step financial claims, borrower/bank balances, distinct international import/export transfers, government cash, commercial-bank lending, cash and interest payments, all goods buyers, no overdraw, gross/physical supply capacity, proportional rationing, an independently replayed transaction journal, and invalid-input adversarial checks.

A negative-budget test and a government-budget-edge test were corrected while developing the standalone script. An initial attempt to run tests BEFORE staging the source failed due to a test-harness expectation (100% legally earmarked fiscal opening funds); this is a harness issue, not evidence about Thai economic outcomes. The final source was staged and executed successfully. Failed staging attempts were not accepted as PASS.

The code runs with Node.js 18+ and no dependencies, but a separate Node.js command-line execution from a network-isolated container could not fetch the public source. Therefore this report claims V8 execution of the GitHub-readback text, NOT an independent Node CLI verification.

### Toy work budget

Six preregistered regimes × ten generic steps = **60** synthetic simulation units, all completed.
At a budget cap **12**, exactly two steps per regime were evaluated, eight per regime remained unresolved and no policy optimality certificate was issued.

The unit counts a *regime-period simulated*, NOT wall time, API calls, joules, token consumption, money or actual task output.

## 5. Six fixed toy scenarios and numerical trace

These values are **fictional settlement units, NOT THB**. A step is not a future calendar year; the future date T* at which capable automation could be widespread remains UNKNOWN.

| Toy regime | First turnover | Turnover at point 3 | Turnover at point 10 | Sum of ten turnovers | Worker debt at 10 |
|---|---:|---:|---:|---:|---:|
| A baseline cash circuit | 90.450 | 90.588 | 87.373 | 882.335 | 0 |
| B automation with concentrated owner dividends | 76.450 | 82.152 | 79.540 | 795.535 | 0 |
| C automation, split worker/owner dividends | 84.370 | 88.059 | 85.168 | 855.344 | 0 |
| D same as B, one-off +18 commercial-bank loan to worker at step 2 | 76.450 | 86.788 | 79.265 | 842.861 | 8 |
| E same as B, increase possible physical capacity 160 to 240 | 76.450 | 82.152 | 79.540 | 795.535 | 0 |
| F same as B, ROW spends larger fraction of opening foreign cash | 94.450 | 89.816 | 84.077 | 868.112 | 0 |

**Intra-toy sensitivity only:** The differences above follow by construction from assumed wages, ownership, credit and spending preferences; they cannot select an actual political/economic program or estimate Thai unemployment.

### Separate consequences in the same made-up world

- **Capability is not effective demand:** B and E have exactly the same ten-step sales path in this toy even though E has **50% more physical capacity**. The extra capacity remains unused because buyer money budgets are the constraint.
- **Dividend ownership and wages are not interchangeable:** The first worker goods purchased change from 28.17 physical units in B to 49.54 in C, as the stipulated dividend ownership share is allocated differently. This does not establish that real Thai households hold that ownership or would receive that sum.
- **Commercial credit is not income:** D's loan injection of 18 raises deposits and matching debt in step 2. It can support more short-run spending; the final worker debt stock is **8** versus **0** in B under different histories. Bank loan origination is not counted as wages, government benefits or new GDP.
- **Foreign demand is finite in this model:** F's first export purchase is 33 toy money units versus 15 in B, but the ROW account must actually pay from funds held at the step's beginning. Trade can change firm receipts without magical unlimited foreign cash.
- **Government cannot spend tax revenue before its own contract allows:** Transfers are paid from previously held GOV cash, and separate tax receipts are recorded with their payers/beneficiaries. No unfinanced government deficit is introduced.
- **Bank sector is observable in the bookkeeping:** Interest transfers and principal-repayment destruction are distinct; borrower liability equals loan asset at each step, and bank retained income is not confused with principal money.

## 6. Main discovery and main limit

The added real-world **institutional sector distinctions** make it harder for a model to hide money inside a generic "outside leakage" bucket. Every fictional flow now has a payer and receiver. A model can detect that a rise in firm sales is not necessarily a rise in worker consumption, and that temporary bank-created purchasing power also comes with debt liabilities.

But internal ledger conservation is **necessary, not sufficient**, for meaningful forecasts. The program still has a single final goods producer, a stylized supplier and automation seller, prescribed wages and dividends, arbitrary behavioral propensities, fixed prices and supply, no real bank reserve/liquidity constraints, no calibrated government borrowing/deficits, no exchange rates, no dynamic investment or firm entry/exit.

The initial IO 2021 sector table is only used as a **source of classification requirements**, not as an empirical matrix. Flow-of-funds data are a naming/financial-identity reference only. The model is not yet a 16-industry Thai input-output economy, and it does NOT reproduce the official C+I+G+X−M or production-side GDP breakdown.

## 7. Next independent experiment

If proceeding, **do not immediately build a large simulator**. The next objective should be a **data-ingestion/source audit**:
- Download the actual 2021 NESDC 16-sector I/O workbook, inspect units, accounting price basis and source revisions, compare row/column totals and intermediate versus final-use accounts.
- Obtain relevant 2020–2024 NESDC sector flow-of-funds tables and verify financial asset/liability counterparty identities, not just headings.
- Produce a sector-crosswalk between those observed account categories and the seven artificial holders, with explicit “NO OBSERVED MATCH” entries where warranted.
- Only then consider a calibrated historical social-accounting matrix, respecting noncontemporaneous source years and without projecting 2021 coefficients unchanged into a future fully automated economy.
- Independently verify data permissions and errors; do not treat unavailable official tables as zero.

**Final status:** PASS_147_147 / SIX_FICTITIOUS_REGIMES / SOURCE_CLASSIFICATION_ONLY / THAILAND_REAL_WORLD_PREDICTIVE_VALIDITY_UNVERIFIED / NO_AOM_MERGER / NO_PRODUCTION_ACTION.
