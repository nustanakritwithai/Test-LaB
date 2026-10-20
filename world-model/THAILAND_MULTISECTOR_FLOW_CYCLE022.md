---
title: "Thailand Multisector Financial Flow — Independent Multiverse Cycle 022"
version: "0.3.0-lab"
date: "2026-10-20"
project: "Independent Multiverse World Model"
status: "147_SYNTHETIC_CHECKS_PASS / ACCOUNTING_TOY_ONLY / REAL_THAI_CALIBRATION_NOT_DONE"
preregistration: "experiments/2026-10-20-cycle-022-multisector-preregistration.md"
test: "tests/thailand_multisector_flow_cycle022.js"
results: "experiments/2026-10-20-cycle-022-multisector-results.md"
aom_or_skill_merger: false
production_writes: false
---

# Thailand Multisector Financial-Flow Lab — Cycle 022

**Research purpose:** Replace Cycle 021's single recycling reservoir with separate accounting counterparties, not with a fully calibrated Thai economy. This is a **standalone submodel** of the independent [Multiverse World Model v4.2.1 Evidence Gate](REAL_WORLD_EVIDENCE_GATE_v4_2_1.md), NOT an AOM Skill, political policy selector, app or public forecasting service. No account or real production service is accessed by the toy engine.

## 1. S0 source register, evidence scope and noncalibration

The experiment was preregistered before coding [here](../experiments/2026-10-20-cycle-022-multisector-preregistration.md). Source pages were read independently of the offline engine:

| Original public source | Data period | Used for | NOT used for |
|---|---|---|---|
| [NESDC Input–Output 16 sectors](https://www.nesdc.go.th/download/i-o-2021-16-sectors/) | 2021 | Distinguish intermediate/domestic production, imports, final expenditure | Numeric 16×16 input matrix or future technology coefficients |
| [NESDC Flow-of-Funds Accounts 2020–2024](https://www.nesdc.go.th/en/download/flow-of-funds-accounts-of-thailand-2020-2024/) | 2020–2024, listed 30 April 2026 | Identify households, nonfinancial firms, financial sector, government and nonresidents as separate institutional agents | Actual 2026 sector balance-sheet levels, deposits, credit demand or future flows |
| [Bank of Thailand SDDS statistical page](https://www.bot.or.th/en/statistics/sdds.html) | Q2 2026 | Verify definition/unit caution: nominal GDP reported 4,793.5 billion baht and employment 41,510.7 thousand persons | Fit the model's fictional turnover/wage shares or infer future GDP |

**Definition and publication caution:** The Thai/English NESDC listing metadata for the I/O 2021 file do not fully agree in page publication dates; the dataset year 2021 is the relevant observed period. We have NOT extracted and validated the 16-sector numeric workbook this round.

For real-world analysis, stay in [Evidence Gate v4.2.1](REAL_WORLD_EVIDENCE_GATE_v4_2_1.md) EVIDENCE_AUDIT/QUALITATIVE_SCENARIOS mode. The numerical experiment here has the separate label SYNTHETIC_STOCK_FLOW_TOY, not a certified quantitative future forecast.

## 2. Account chart: actors do not disappear into an anonymous leak

Seven modeled fictional settlement-balance holders:

1. H_WORK — worker-dependent household (cash for goods, housing, debt).
2. H_OWNER — owner/rent household (dividends and housing rent).
3. F_GOODS — final-goods producer, paying wages, inputs, technology services, imports, dividends and tax.
4. F_INPUT — domestic intermediate supplier, may spend on final goods.
5. F_AUTO — domestic automation services/capital supplier, may spend on final goods.
6. GOV — government with finite deposits, collects tax and spends/redistributes only from authorized opening funds.
7. ROW — rest-of-world balance holder, receives imported-input payments and purchases exported goods from its own cash.

Commercial banking is a distinct **simplified financial ledger**, not an eighth ordinary deposits holder:

- BANK_RETAINED = the bank's accrued-and-collected internal cash/equity budget available to buy operating services in this toy.
- bankLoanAsset = principal claim against borrower.
- workerDebt = matching principal liability.
- workerInterestPayable = accrued interest owed but not paid.
- bankInterestReceivable = matching unpaid-interest claim.

Cash deposits across the seven holders open at 300 toy units. BANK_RETAINED begins at 5, principal asset and borrower debt begin at 40. Thus initial accounting invariant is 300 + 5 − 40 = **265** synthetic net units. This does NOT define central-bank reserves, physical currency supply or the nation's banking-sector equity.

## 3. Typed transaction journal (testable independently)

Each purchase/payroll/tax/transfer between ordinary sectors is exactly:

    sender deposit ↓ amount
    receiver deposit ↑ amount

Bank credit is deliberately different:

    LOAN_ORIGINATION:
       worker deposit ↑ amount
       worker principal debt ↑ amount
       bank principal loan claim ↑ amount

Principal repayment DESTROYS the paired deposit and loan principal claim, and does not magically become bank profit.

Interest on opening principal is accrued separately as matched unpaid liability/receivable. Paid interest reduces H_WORK deposit and increases BANK_RETAINED; any unpaid interest remains due as matched claim. Bank operating purchases reduce BANK_RETAINED and credit F_GOODS deposits. This is an illustrative banking mechanism: it does not model regulatory reserves, maturity transformation, deposit insurance or interbank settlement.

**Every period verifies**:

    sum(seven deposit balances)
      + BANK_RETAINED
      − bankLoanAsset
      == 265

and bankLoanAsset equals workerDebt, bankInterestReceivable equals workerInterestPayable. The reference script independently replays all posted transaction journal entries to detect any hidden transfer or duplicated amount.

## 4. Artificial timing, production and demand

There are ten generic steps following an unknown FULL-AUTOMATION-CAPABILITY milestone T*. None is a specific future calendar year. The model does not know if such a milestone will occur.

Each step:
1. GOV pays worker transfer from opening GOV balance. F_GOODS pays wages, domestic-input supplier, automation supplier, imported-input supplier (ROW), owner/worker dividends and tax using shares of **opening F_GOODS cash**, not same-period projected sales.
2. Optional loan injection at a predefined step creates matched household deposit and debt. Housing rent, bank interest then principal are paid only as much as real toy cash allows.
3. Worker and owner households request consumer goods out of their available balances after obligatory payments. Domestic input/capital-service suppliers, GOV, ROW and bank each request goods only using declared fractions of their **opening funds**, not future/current uncollected proceeds.
4. All seven goods buyers share the same proportional rationing factor if nominal requested demand exceeds goods price × physical available capacity (160 or 240 toy goods units).
5. Realized goods-market receipts go to F_GOODS, becoming available in next-step opening balances. Unsold capacity remains idle; no automatic demand growth is invented.
6. Check every journal entry, cash account, debt/loan asset, trade flow, capacity limit and global budget.

The model **does not** use a calibrated input-output production matrix, value-added accounts, equilibrium prices, heterogeneous firm bankruptcy, calibrated household utility, imports substitutability, bank credit creation policy, reserves, FX conversion or full national accounts. Do not use its gross sales as GDP.

## 5. Frozen six sensitivity regimes

| Label | Toy change relative to baseline |
|---|---|
| A BASELINE | Price 1; wage share .25; automation services .08; owner dividends .12; foreign buyer spends .25 of opening ROW balance |
| B AUTO CONCENTRATED | Price .7; wage share .10; automation services .16; owner dividends .22 |
| C AUTO SHARED | B but 50% of dividend allocation accrues to H_WORK and 50% to H_OWNER |
| D AUTO CREDIT | B plus one-off bank loan 18 toy units at step 2, with matching debt |
| E AUTO MORE CAPACITY | B but physical producer capacity 240 rather than 160 |
| F AUTO HIGH ROW DEMAND | B but ROW spends .55 rather than .25 of its opening balance |

Other specified shares, housing and debt parameters are in the frozen [Cycle 022 preregistration](../experiments/2026-10-20-cycle-022-multisector-preregistration.md) and exact [reference code](../tests/thailand_multisector_flow_cycle022.js). **No coefficients come from NESDC/BOT numerical observations.**

## 6. Reference implementation and acceptance

[Standalone deterministic JavaScript engine](../tests/thailand_multisector_flow_cycle022.js), Node.js 18+, no dependencies and no network. Test result **147/147 PASS** on the fetched GitHub content in the JavaScript runtime.

Verifies:
- Typed journal replay matches ending sector balances.
- Household spending, tax, transfers, imported inputs and ROW goods export transactions all have correct payers and payees.
- Loan grant deposits/loan assets/debt; principal destroyed correctly; bank interest accrued separately and paid only from available cash.
- Toy net-claim identity is exactly conserved at each point, including credit and repayments.
- No GOV spending without opening funds and no ROW export purchases financed from future incoming imports.
- One shared output capacity, proportional buyer rationing and no unfilled order recorded as sold goods.
- A capacity expansion may not change sales if buyers' cash budgets are binding.
- All six regimes use 10 synthetic points under a global 60-work-unit cap; a cap of 12 reaches only two points per arm and leaves eight unresolved with no action certificate.
- Invalid account stocks/rates/cash overdrafts/budget and a deliberately tampered journal are rejected.

See [Cycle 022 result report](../experiments/2026-10-20-cycle-022-multisector-results.md) for the exact conditional figures.

## 7. What we learned that Cycle 021 could not represent

By representing ROW, input supplier, automation capital supplier, government and bank as distinct accounts, we can no longer claim money "vanished" without specifying its destination. A payment for imported inputs makes ROW deposits rise; foreign purchases draw down ROW's opening deposits; taxes add to GOV and transfers reduce GOV, while business spending is its own demand. Loan creation is not a free government transfer or wage income.

The toy still depends heavily on arbitrary behavioral propensities and balance initialization, and its effects are not known to apply to Thailand. Cash claims conservation is an **accounting property**, not a causal forecast, GDP identity, or proof of welfare.

**Next research:** Build a properly documented sector-to-sector transaction matrix with actual published I/O row/column totals and flow-of-funds institutional balances *only after downloading, checking units/deflators/years and resolving classifications*. Test calibrated row/column sums against official data separately from toy future simulation. Do not use missing values as zeros or silently assume IO 2021 coefficients stay constant after automation.

**Current adoption:** Keep as an independent Multiverse lab submodel only; do not modify the core v4.2.1 evidence gate or any AOM/Skill/production system.
