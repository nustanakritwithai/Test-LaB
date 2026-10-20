# Cycle 023 RESULTS — Official Thai Flow-of-Funds Data Ingestion and I/O Readiness

**Date:** 2026-10-20 (Asia/Bangkok)
**Project:** Independent Multiverse World Model; no AOM/other Skill integration.
**Read-only provenance / freeze:** [Cycle 023 arithmetic-audit preregistration](2026-10-20-cycle-023-official-accounts-preregistration.md). **Not blind**: 2024 figures were inspected before the arithmetic test criteria were documented.
**Machine-readable excerpt:** [NESDC Table 1.5 2024 JSON](../data/cycle023_nesdc_flow_funds_2024_verified_excerpt.json).
**Executable verification:** [cycle023_official_accounts_audit.js](../tests/cycle023_official_accounts_audit.js).
**Independent Multiverse account crosswalk:** [THAILAND_OFFICIAL_ACCOUNTS_CYCLE023.md](../world-model/THAILAND_OFFICIAL_ACCOUNTS_CYCLE023.md).
**Local spreadsheet companion:** NESDC_Cycle023_Accounts_2024_Audit.xlsx — exported as a verified conversation attachment, not pushed as binary to GitHub.
**Result:** REAL_2024_NESDC_FINANCIAL_FLOW_EXCERPT_TEXT_RECONCILED / 75/75 JS_ASSERTIONS_PASS / 2021_INPUT_OUTPUT_MATRIX_DATA_BLOCKED.
**External effects:** Only independent Test-LaB records and a local audit workbook created. No production, account, government site, AOM or original toy code changed.

## 1. Authentic official source paths, with access limitations

**Original I/O index:** https://www.nesdc.go.th/download/i-o-2021-16-sectors/
**Original I/O XLSX redirect resolved:** https://www.nesdc.go.th/wp-content/uploads/2025/03/DataIO2021x16.xlsx
**Year represented:** 2021 I/O (industry by industry), **not publication year**. The Thai/English site listing publication dates disagree; the observation year of the data is 2021.

**Original Flow-of-Funds PDF:** https://www.nesdc.go.th/wp-content/uploads/2026/04/Flow-of-funds-of-Thailand-2024.pdf
**Published listing:** https://www.nesdc.go.th/en/download/flow-of-funds-accounts-of-thailand-2020-2024/
**Relevant table:** printed Table 1.5 for 2024, **MILLIONS OF BAHT**, and Table 3.1 cross-period control totals.

What could be inspected:
- The official 2024 table text was extracted through a separate public-web reader following NESDC's original PDF link.
- The 2024 table also appeared in independent web search indexing of that same government-hosted PDF. These two readers are NOT independent statistical sources; they check text retrieval, not economic truth.
- The download environment could not fetch the source XLSX into local readable cells, and the PDF screenshot renderer could not visually verify the table or compute a source-file SHA256.
- The source JSON explicitly reports visual/binary limitations, so this is a **source-text plus arithmetic audit**, not a full original-document reproduction.

**IO numeric completeness: ZERO verified of the 256 intermediate-flow cells.** No zero matrix was created as a stand-in. The source XLSX can be directly obtained using the known original URL in an environment with permitted binary networking, but its sheet headers, units, producer/purchaser price basis and published row/column controls must then be independently checked.

## 2. Official 2024 financial transactions by institutional sector

In **MILLIONS OF BAHT**, annual **net financial flows, not outstanding stocks**:

| Institutional sector | Asset acquisition | Liability incurrence | Financial net = assets − liabilities |
|---|---:|---:|---:|
| Non-financial corporations | 767,783 | -315,087 | 1,082,870 |
| Financial corporations | 1,658,190 | 1,407,912 | 250,278 |
| General government | 492,065 | 1,288,374 | -796,309 |
| Households & NPISHs | 739,782 | 588,248 | 151,534 |
| Rest of world | 32,595 | 720,968 | -688,373 |
| **Published total** | **3,690,415** | **3,690,415** | **0** |

The source also explicitly lists a NONZERO difference between nonfinancial-account and financial-account sector measures for each sector, respectively +1,025, −109,303, −65,119, −85,833, +259,230 (million THB). These discrepancies sum to zero across all sectors but must NOT be silently set to zero at a sector level.

This table is not a balance sheet of bank deposits or total loans; negative annual net liability flows are not impossible negative debt stocks. The “General government financial net −796,309” is a **specific financial-account net entry**; it is NOT necessarily interchangeable with a headline annual government budget deficit or a GDP ratio.

## 3. Instrument groups and both-side row checks

Eight published broad groups:
- Monetary gold and SDRs: 1,374
- Currency and deposits: 1,000,336
- Securities other than shares: 998,723
- Loans: 75,146
- Shares and equity: 1,880,763
- Insurance technical reserves: 386,201
- Financial derivatives and employee stock options: **−681,584**
- Other receivables/payables: 29,456

Each instrument figure agrees with **both** its five-sector asset-side and its five-sector liability-side subtotal. Sum across instruments equals 3,690,415. We preserved negative flows exactly and did not convert them to a fictional zero.

## 4. Executed JS verification and deliberate failures

The standalone JS audit was committed and its source downloaded back through the GitHub connector. The JSON was fetched independently, and the genuine committed checker was executed. **75/75 deterministic assertions PASS**.

Verification includes:
- 80 instrument-by-institution actual published numeric entries: 8 instruments × 5 sectors × assets/liabilities.
- All eight source-instrument printed controls and five institution subtotal rows.
- National assets/liabilities totals both 3,690,415 and sector financial balances sum to zero.
- The published sector discrepancies are preserved and sum to zero, without implying they should individually be zero.
- Tampering one entry by +1 (million THB) fails row controls. Changing a published total, removing a sector or instrument, duplicate sector ID, null or NaN, wrong currency or observation year also fails.
- Correctly identifies 2024 ANNUAL FLOW vs financial STOCK mismatch.
- A made-up 16×16 all-zero matrix cannot pass the NESDC original XLSX provenance/binary/readback gate.
- A crosswalk between institutional sectors and the fictional Cycle 022 household/bank/firm/GOV/ROW accounts is classification only, with numeric allocations deliberately NULL.
- No AOM merger, policy ranking, actual future automation arrival prediction, national GDP forecast or investment action.

**Important:** 75 checks establish arithmetic/internal consistency of **the extracted table excerpt**, not that the inaccessible original workbook/screenshot has been audited completely or that any real-world causal effects are known.

## 5. Formula-driven companion XLSX

The local audit workbook (created with artifact_tool, the spreadsheet capability used for the user's artifact) has:
- Overview: period, unit, source link, honesty boundary.
- 2024_Assets: 8 source financial instruments × 5 official institutional sectors, live row/column total formulas and comparisons with published totals.
- 2024_Liabilities: identical liability-side reconciliation.
- Sector_Reconcile: five observed-sector computed assets, liabilities, net financial surplus and published statistical discrepancy; formulas link to the two data sheets.
- Crosswalk: official institutional sectors to fictitious Cycle 022 account labels, no unverified numeric splits.
- IO2021_Gate: source original URL with DATA_BLOCKED matrix, pending sheet/price-basis/units/official controls, **no fictitious 16×16 data**.

An inspect of both primary table grand totals returned 3,690,415 and calculated–printed gap 0; a scan found no Excel formula errors. The workbook is not an original official NESDC XLSX; it is a **derived audited excerpt**, visibly labeled as such. It is not claimed to have been saved to the repo's source directories.

## 6. What Cycle 023 DOES and DOES NOT advance

**Advancement:** Actual official 2024 institutional sector financial flows are now distinct, machine-checkable historical evidence. They can be compared against sector definitions and discrepancies, and future factual ingestion can be stopped when units or periods do not match.

**No calibration yet:** 2024 annual net financial acquisitions cannot simply be inserted as fictional 2026 bank deposit balances or worker loan principal; doing so would violate type, period and stock-flow compatibility. The 2021 industry IO dataset is noncontemporaneous and its 256 relevant cells are not yet readable, so no empirical Thai 16-industry Leontief multipliers can be computed honestly.

**Scope of positive result:** Official 2024 financial-sector records and arithmetic, not prediction of 2030/2040 Thai livelihoods, automation capability, human unemployment, wealth distribution or effects of specific policies.

## 7. Next independent evidence gate

Obtain the **original 2021 NESDC workbook binary** from its resolved XLSX link in a compatible download environment. Freeze SHA256, inspect its sheet names and actual row/column labels and the specific intermediate-flow 16×16 cell range; verify independently published subtotal rows/columns, import components, valuation and unit. If the workbook isn't reachable, return SOURCE_UNAVAILABLE rather than silently using simulated numbers.

Only after the official 2021 industry data and 2024 institutional flows can be traced through a **sourced crosswalk and year-concordance method** should any calibrated historical matrix be constructed. Avoid projecting historical IO technical coefficients forward as if automation cannot change technologies.

**Verdict:** REAL_OFFICIAL_2024_FINANCIAL_EXCERPT_AUDITED / ORIGINAL_IO_2021_MATRIX_NOT_YET_VERIFIED / HISTORICAL_SOURCE_AND_MODEL_FUTURES_STILL_SEPARATE.
