---
title: "Thailand Official Accounts Audit — NESDC 2024 Flow-of-Funds + 2021 I/O Gate"
version: "Cycle-023-lab"
date: "2026-10-20"
project: "Independent Multiverse World Model"
status: "2024_FINANCIAL_FLOW_EXCERPT_ARITHMETIC_PASS / 2021_IO_MATRIX_DATA_BLOCKED"
source_data: "data/cycle023_nesdc_flow_funds_2024_verified_excerpt.json"
source_test: "tests/cycle023_official_accounts_audit.js"
preregistration: "experiments/2026-10-20-cycle-023-official-accounts-preregistration.md"
aom_or_skill_merged: false
production_writes: false
---

# Cycle 023 — Observed Thai Financial Accounts and Input–Output Evidence Gate

**Goal:** For the independent Multiverse World Model, distinguish true observed Thai sector financial flows and industry input-output tables from the **fictional balances, factor shares and future automation response coefficients** previously used in Cycles 019–022.

**This is NOT an empirical forecast of an automated Thai economy.**

## 1. Two different official statistical objects

| Dataset | Source | Observed period | Unit / interpretation | Verified this run? |
|---|---|---|---|---|
| NESDC I/O 2021 16-sector matrix | [Download listing](https://www.nesdc.go.th/download/i-o-2021-16-sectors/) / [resolved original XLSX](https://www.nesdc.go.th/wp-content/uploads/2025/03/DataIO2021x16.xlsx) | 2021 | INDUSTRY production/intermediate use, exact workbook valuation basis pending inspection | LISTING/URL FOUND; 16x16 cell matrix BLOCKED, not extracted |
| NESDC Flow-of-Funds 2020–2024 | [Download listing](https://www.nesdc.go.th/en/download/flow-of-funds-accounts-of-thailand-2020-2024/) / [official PDF](https://www.nesdc.go.th/wp-content/uploads/2026/04/Flow-of-funds-of-Thailand-2024.pdf) | 2020–2024; Table 1.5 uses **2024** | FINANCIAL annual flows, **millions of Thai baht**, five institutional sectors | 2024 5x8 financial excerpt TEXT-EXTRACTED and ARITHMETICALLY RECONCILED |
| BOT SDDS Thailand | [Official data page](https://www.bot.or.th/en/statistics/sdds.html) | Q2 2026 | Quarterly GDP at current prices, employment units differ | CONTEXT ONLY; never used as 2024 financial-flow denominator |

**Historical source limitations:** The I/O site index inconsistently reports a publication date between language versions, but the dataset YEAR 2021 is clear. The original binary IO spreadsheet could not be reliably downloaded as parsed cells in the connected session. The official PDF was read in extracted text through its government download link, with the source table identified (printed page **-77-**); the PDF web screenshot renderer and original-binary hash verification were blocked by the source gateway. Therefore the 2024 figures have **TEXT_EXTRACT_VALIDATED** status, not a full independent visual or binary-file audit.

A list of filenames or a successfully followed download redirect does not establish that 256 I/O matrix cells have been read. **No 2021 IO numeric cell was claimed verified.**

## 2. Real official 2024 flow-of-funds institutional columns

NESDC Table 1.5, financial account only, unit: **MILLIONS OF BAHT**. Numbers below are *annual net financial flows*, with negatives preserved; they are not end-2024 loan/deposit stocks.

| Institutional sector | Net acquisition of financial assets | Net incurrence of liabilities | Financial surplus/deficit = assets minus liabilities |
|---|---:|---:|---:|
| Nonfinancial corporations | 767,783 | -315,087 | 1,082,870 |
| Financial corporations | 1,658,190 | 1,407,912 | 250,278 |
| General government | 492,065 | 1,288,374 | -796,309 |
| Households & NPISHs | 739,782 | 588,248 | 151,534 |
| Rest of the world | 32,595 | 720,968 | -688,373 |
| **Total** | **3,690,415** | **3,690,415** | **0** |

**Named note:** “Net incurrence of liabilities” can be NEGATIVE (nonfinancial corporation −315,087) as a financial FLOW; negative flow does NOT assert the sector's outstanding debts are below zero. The published nonfinancial-to-financial *sector statistical discrepancies* are nonzero: **+1,025, −109,303, −65,119, −85,833, +259,230** (same sector order). Those discrepancies sum to zero but are NOT erased or renamed statistical errors in the code.

## 3. Instrument categories and exact published totals

The 2024 excerpt records eight broad financial-instrument categories. In each case the reported sum over five institutional sectors matches on asset and liability sides:

| NESDC financial instrument family | Net assets across sectors | Net liabilities across sectors | Source measure |
|---|---:|---:|---|
| Monetary gold and SDRs | 1,374 | 1,374 | annual flows |
| Currency and deposits | 1,000,336 | 1,000,336 | annual flows |
| Securities other than shares | 998,723 | 998,723 | annual flows |
| Loans (including mortgage/hire purchase classification) | 75,146 | 75,146 | annual flows |
| Shares and other equity | 1,880,763 | 1,880,763 | annual flows |
| Insurance technical reserves | 386,201 | 386,201 | annual flows |
| Financial derivatives and employee stock options | −681,584 | −681,584 | annual flows |
| Other receivables/payables | 29,456 | 29,456 | annual flows |
| **All categories** | **3,690,415** | **3,690,415** | **MILLIONS OF BAHT** |

These totals are observed account entries from the NESDC historical Table 1.5. Their sum/identities can be audited; **they are not independent estimates of growth or social welfare**. The 2024 data are not directly comparable to the 2021 I/O industry table without a year/unit/price-basis crosswalk.

Detailed raw numerical excerpt and exact source metadata: [Cycle 023 JSON](../data/cycle023_nesdc_flow_funds_2024_verified_excerpt.json).

## 4. Mapping 5 observed institutions to Cycle 022's fictional seven holders

| 2024 institutional sector | Cycle 022 fictional account(s) | What can be transferred? |
|---|---|---|
| Nonfinancial corporations | F_GOODS, F_INPUT, F_AUTO | **Classification only**, not an observed allocation of the sector's 767,783 asset flow among firms |
| Financial corporations | Simplified BANK retained, loan and interest claims | Classification only; commercial-bank assets alone do not represent all financial institutions |
| General government | GOV | Classification concept only, not an observed fiscal toy tax or spending rate |
| Households & NPISHs | H_WORK, H_OWNER | The real sector DOES NOT report the invented wage/owner split in this table |
| Rest of world | ROW | Identity only; omits exchange rates, external liability holdings and multi-currency valuation |

The 2021 I/O table's 16 categories are **industries**, and these five Flow-of-Funds columns are **institutional sectors**. Their rows/columns do NOT constitute a common matrix by default. Any future crosswalk must be developed from independently verified bridging statistics; without them put NO_OBSERVED_ALLOCATION rather than a made-up coefficient.

## 5. Executed validation and adversarial tests

Reproducible [Cycle 023 standalone JS audit](../tests/cycle023_official_accounts_audit.js) reads the committed JSON. Tested **75/75 deterministic checks PASS**, including:

- 40 sector-instrument NET-ASSET values and 40 sector-instrument NET-LIABILITY values sum to their own published 8 instrument totals and the official 5-sector aggregate totals.
- The reported 5-sector balance vector reconciles the assets-minus-liabilities vector, summing to 0 exactly at this published integer precision.
- The 5 sector statistical discrepancies are preserved, not silently replaced with 0.
- +1 change to an individual instrument cell produces an arithmetic failure. Tampered official control totals, missing instrument/sector, duplicate sector, null/NaN, currency and year mismatch all produce typed BLOCKED results.
- Negative annual financial flows remain signed and valid.
- A fake 16×16 all-zero IO matrix with no actual workbook checksum/source cell controls is refused. No direct automation/future welfare calculation is enabled by this data.
- Exact IO download URL is found, but matrix remains **DATA_BLOCKED** and 0 decoded cells are accepted.

**Execution mode:** Tested inside the attached JavaScript/V8 runtime using the genuine committed JSON. The engine is Node.js 18+ compatible; it has no network or system-writing calls. The audit check does not prove the PDF was visually re-rendered or that the I/O Excel cells exist in readable form.

## 6. Future data-ingestion gate

**DO NOT CALIBRATE** the simulated full-automation Thai economy from this evidence yet. Before a numeric Leontief or SAM model can be used as historical baseline:

1. Actually download the 2021 official XLSX bytes and store a SHA256/source retrieval timestamp (possibly from a compatible external host or user-provided download).
2. Inspect sheet names, range, sector descriptions, transaction block location, valuation (producer/basic/purchaser prices), million/thousand Baht or other units and import components.
3. Extract all 16×16 intermediate-flow cells with file/sheet/range provenance, retaining negative adjustments, NA and missing values according to the workbook's own definitions.
4. Verify BOTH published row/column controls; distinguish total output, intermediate use, value added, imports and final demand. A 16×16 matrix is not audited merely because its row sums equal its own self-calculated totals.
5. Read institution-level 2020–2024 FF accounts with separate flow-stock concepts and check source comparison across years. Do not combine noncontemporaneous 2021 industry and 2024 institution accounts as a direct 2024 SAM without bridge/adjustments.
6. Only after an explicit empirical-calibration experiment and genuinely held-out checks may any predictive ability be claimed. Keep that separate from Multiverse v4.2.1's read-only qualitative evidence gate and synthetic policy scenarios.

**Final verdict:** REAL_2024_FINANCIAL_FLOW_EXCERPT_RECONCILED / 2021_IO_16X16_DATA_BLOCKED / FUTURE_THAI_AUTOMATION_CALIBRATION_UNVERIFIED / INDEPENDENT_PROJECT_NO_AOM_MERGE.
