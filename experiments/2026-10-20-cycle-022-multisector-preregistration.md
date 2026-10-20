# Cycle 022 PRE-REGISTRATION — Thailand Full-Automation Multisector Financial Flow Lab

**Frozen date:** 2026-10-20 (Asia/Bangkok), before implementing the new engine and inspecting its scenario results.
**Project:** Independent Multiverse World Model; AOM and other Skills MUST remain separate.
**Research goal:** Split Cycle 021's single aggregated recycled-money stock into distinct **household, non-financial business, commercial-bank, government and rest-of-world accounts** and expose which transfers balance, which deposits/loans change through bank credit, and which flows stay missing. Stress-test whether extra technological production capacity guarantees household income or consumption (it need not in a toy system).
**Safety:** Test-LaB only; no outside repo mutation, bank transaction, trading order, government interaction, customer data, future task or production write.
**Epistemic mode:** SYNTHETIC_STOCK_FLOW_TOY nested inside QUALITATIVE_SCENARIOS. NOT a Thai macro forecast, not an authoritative national social-accounting matrix.

## 1. Public reference data: structure, NOT fitted coefficients

- [NESDC Input–Output 2021, 16 sectors](https://www.nesdc.go.th/download/i-o-2021-16-sectors/): 2021 TABLE DATASET. Published-page metadata in Thai/English may differ; do not use the displayed publication year as the input-output data observation year. **The raw 16×16 numeric transaction matrix is NOT imported or validated this round.** Use it only to mandate separation of domestic intermediate transactions and imports versus final demand.
- [NESDC Flow-of-Funds Accounts Thailand 2020–2024](https://www.nesdc.go.th/en/download/flow-of-funds-accounts-of-thailand-2020-2024/): data span 2020–24, listed published 30 April 2026. Use the institutional-sector perspective: households/NPISHs, nonfinancial firms, financial corporations, government and rest-of-world, but do not invent amounts or real intersector financial stocks.
- [Bank of Thailand SDDS](https://www.bot.or.th/en/statistics/sdds.html): public page reports provisional Q2 2026 nominal GDP **4,793.5 billion Thai baht**, and Q2 employment **41,510.7 thousand persons** (definitions/time frame different). These are metadata reference checks only. GDP is NOT sales turnover; do not calibrate toy sector shares using the nominal GDP number.
- Original [Cycle 021](2026-10-20-cycle-021-recycling-results.md) and [Cycle 019](2026-10-20-cycle-019-thailand-full-automation-results.md): synthetic trials / NSO labor context, not enough to estimate financial behavioural shares.

**Critical:** no source has established the true date of full automation (T*=UNKNOWN), future Thai wage shares, future robot deployment or exact causal impacts. Do not infer that 16-sector I/O 2021 is a calibrated future input-output model.

## 2. Frozen account chart and book entries

**Seven named transaction-deposit holders:**
H_WORK (wage-dependent household), H_OWNER (capital/rent household), F_GOODS (goods producer), F_INPUTS (intermediate domestic supplier), F_AUTOMATION (automated capital-services supplier), GOV (government), ROW (rest of world/nonresident deposit holder).

**Bank separately:** BANK_RETAINED (bank equity/income available for model-financed spending), loan asset bankLoanAsset, H_WORK borrower loan liability workerDebt. Account balances are fictional settlement/deposit claims. No central bank, bank reserve regulation, interbank system, insolvency or exchange-rate mechanism is modeled.

Opening balances in toy money units:
H_WORK=12, H_OWNER=18, F_GOODS=160, F_INPUTS=10, F_AUTOMATION=10, GOV=30, ROW=60. Sum deposits=300.
BANK_RETAINED=5, bank loan asset=40, worker loan liability=40.
Initial bookkeeping invariant:
    sum(deposits across 7 holders) + BANK_RETAINED - bankLoanAsset = 265.
    bankLoanAsset - workerDebt = 0.

**Ordinary payments:** debit payer / credit receiver by the same amount; no external free money. Payments at point t are recorded as dated toy transactions and may affect period t+1.

**Commercial bank rules:**
- One-off bank loan disbursement (credit-bridge experiment only, 18 toy units at period 2) increases H_WORK deposits and workerDebt/bankLoanAsset BY THE SAME AMOUNT. This is modeled deposit creation paired with private indebtedness, not government transfer or net wealth creation.
- Interest charge = min(available H_WORK deposit, 2% × opening principal), paid FIRST: H_WORK deposit decreases, BANK_RETAINED increases. Unpaid contractual interest is tracked as outstanding interest due, not assumed paid.
- Principal payment target = min(5, remaining borrower funds, debt principal): H_WORK deposit decreases, workerDebt and bankLoanAsset decrease equally; principal repayment destroys deposits and bank claims, not bank profit.
- Bank operating purchase is funded from no more than 25% of BANK_RETAINED at period OPEN, proportionally rationed against other goods requests. Paying a bank operating expense reduces BANK_RETAINED and credits firm deposits, not a fictitious worker transfer.
- Bank interest income is not incorrectly counted again as profit from loan principal.
- At every point, financial invariant sum deposits + bank retained - bank loans is constant across ordinary payments, loan creation/repayment, interest and bank expense.

**Firm operating disbursements (share of OPENING F_GOODS balance, all shares summing <=1):** wages, F_INPUTS purchases, F_AUTOMATION capital services, ROW imports, capital dividends (some arms split between H_WORK / H_OWNER), profit-like tax GOV. This explicitly separates local inputs, foreign leakage, technology capital returns, public tax and labor income. These toy shares do not correspond to verified Thailand national accounts.

**Public sector:** From GOV opening funds, transfer a capped fraction to H_WORK, with goods procurement drawn from the same opening fiscal stock; current-period received taxes cannot be pre-spent without an explicit budget rule. Every transfer or procurement is funded by existing GOV account, with no anonymous deficit. GOV may accumulate cash or spend it later.

**ROW:** Purchases of toy goods are funded from its opening ROW deposit at fixed rate; imports are explicitly payments F_GOODS→ROW. Foreign purchasing is NOT inexhaustible exogenous money. An exchange rate and foreign reserve mechanism are outside this fixture.

**Goods-market clearing:** all buyers H_WORK/H_OWNER/F_INPUTS/F_AUTOMATION/GOV/ROW/BANK demand nominal purchases from F_GOODS; physically capped at 160 toy goods units (or 240 in the capacity-only stress). A single proportional fulfillment fraction applies to ALL buyers, including ROW and bank, with no silent priority for exports. Purchases cannot exceed deposited/retained cash available. No inventory purchase without payment; goods market final receipts are gross turnover, NOT Thai GDP, output net value added or household welfare.

## 3. Frozen decision sequence per toy period

1. Snapshot opening accounts and bank profit; authorize any fixed scheduled loan shock.
2. GOV transfer from its opening stock; GOODS firm pays wages, domestic input/automation suppliers, imports, tax and dividends using shares of its opening funds.
3. H_WORK pays housing rent to H_OWNER, and bank interest then principal when its actual cash allows.
4. Construct goods demands: households from currently available cash after debt/housing; F_INPUTS/F_AUTOMATION/GOV/ROW from FIXED opening-balance fractions; bank from opening BANK_RETAINED budget. 
5. Ration if needed; settle each actual buyer-to-producer payment with exact same transaction mechanism; bank purchases draw down BANK_RETAINED.
6. Reconcile balances, bank asset and borrower liability, loans/destroyed deposits, transfer/capital flows and unit capacity. Freeze NEXT opening S(t+1).
7. If observation missing, treat as synthetic next state only; NEVER reclassify as actual Thai outcome.

## 4. Six frozen regimes and 10 steps

Common goods capacity 160 units, price 1, worker housing due 8, worker debt initial 40, 2% per-step toy interest, maximum worker principal service 5. Supplier demand opening fractions .5, government procurement opening .2, ROW spending opening .25, owner consumption .4, worker consumption .85, bank business spend opening .25.

- A BASELINE_CLOSED: goods price 1, wageShare .25, domestic input .10, automation services .08, imported input .05, dividend .12 (all to H_OWNER), corp tax .06, GOV transferOpening .30, no new credit, ROW spend opening .25.
- B AUTO_CONCENTRATED: price .7, wages .10, domestic input .10, automation services .16, imported input .05, dividend .22 (all owner), corp tax .06, GOV transferOpening .30, ROW spend .25, no credit.
- C AUTO_SHARED_INCOME: same as B but half the dividend split to H_WORK and H_OWNER; no new credit. (A counterfactual ownership rule, not a policy endorsement.)
- D AUTO_CREDIT_BRIDGE: same as B, bank credits worker +18 at t=2, bank assets/worker liability +18.
- E AUTO_MORE_CAPACITY: same as B but physical capacity 240 instead of 160; demand rules unchanged.
- F AUTO_HIGH_ROW_DEMAND: same as B but ROW spends .55 rather than .25 of its opening deposit; no free exports and ROW balances may deplete.

All model coefficients **synthetic, frozen pre-run**. No probability or ranking over these 6 regimes, no measured welfare weights.

## 5. Acceptance gates (before results)

- Preserve BASELINE=300 total deposits; bank retained=5; loans=40; initial deposits+bankRetained-loans=265; no negative initial account stock.
- Every toy transfer debits and credits the same amount; no payer overspends.
- Each period’s signed account changes reconcile exactly with its transaction journal.
- Global invariant depositTotal + BANK_RETAINED − loanOutstanding stays 265 after each period.
- BANK_ASSET − H_WORK_DEBT=0; principal payments destroy deposits/loan assets equally; bank loan origination raises both deposits and loan assets but leaves net unchanged.
- Interest paid moves depositor balance into BANK_RETAINED without changing loan principal or creating new money.
- No unearned government transfer; funded out of GOV opening balance and GOV end account never negative.
- Imports/exports distinguished; ROW spending cannot exceed opening ROW deposits budget. Trade flows do not count twice in domestic-sector sales.
- Physical goods quantity sum <= capacity; supply rationing identical across buyers; no banker/customer/ROW free goods.
- All future/automation deployment dates remain unknown; every point mode SIMULATED_BRANCH; no actual Thai GDP/forecast in toy outputs.
- Bank credit shock at t=2 raises household cash, raises debt and bank loan assets by 18, never counted as income, profit or GDP.
- A higher goods capacity alone must NOT be assumed to increase sales: report whether a demand-limited counterexample occurs.
- Real Thailand sources only classify institutional/industry accounts and comparable time windows; explicit NO_FITTED_IO_MATRIX.
- Shared global work budget: 6 regimes ×10 steps=60; cap12 should produce exactly 2 steps each with remaining 8 steps/arm UNEXPLORED.
- Deterministic reproducibility and adverse checks for invalid shares, interest, overspending, negative cash, missing source scope, hidden double-entry mismatch, impossible loan states and oversold inventory.
- Retain separate lines for HOUSEHOLD_WORKER_GOODS_QUANTITY, WORKER_DEBT, FIRM_GROSS_TURNOVER, GOV_CASH, BANK_ASSET, ROW_CASH, and capacity UTILIZATION. None alone is national wellbeing.
- Do NOT present any regime as the best political choice; avoid comparative normative evaluations.
- Original Cycle 020 and Cycle 021 files and AOM remain UNCHANGED; new self-contained Cycle 022 module and MD/report only.

Expected outputs:
  experiments/2026-10-20-cycle-022-multisector-preregistration.md (this file)
  tests/thailand_multisector_flow_cycle022.js
  world-model/THAILAND_MULTISECTOR_FLOW_CYCLE022.md
  experiments/2026-10-20-cycle-022-multisector-results.md

**Success definition:** Valid financial identities and defensible data-source bounds, meaningful model sensitivity insights under toy assumptions, total transparency about what was NOT measured. Not a real-world forecast, causal political-policy proof, or integration of Skills.
