# Cycle 023 — Thailand official I/O and Flow-of-Funds: ACCEPTANCE PLAN

**Date:** 2026-10-20 Asia/Bangkok.
**Project:** Independent Multiverse World Model only. No AOM/Skill merge or production changes.
**Provenance note:** The 2024 financial totals were inspected before formalizing this arithmetic test. This is a retrospective consistency audit, not a blind held-out test.

## Official source identities

- NESDC IO 2021 16-sector index: https://www.nesdc.go.th/download/i-o-2021-16-sectors/
- Resolved original workbook: https://www.nesdc.go.th/wp-content/uploads/2025/03/DataIO2021x16.xlsx
- NESDC Flow-of-Funds 2020–2024 listing: https://www.nesdc.go.th/en/download/flow-of-funds-accounts-of-thailand-2020-2024/
- Resolved official PDF: https://www.nesdc.go.th/wp-content/uploads/2026/04/Flow-of-funds-of-Thailand-2024.pdf
- PDF printed Table 1.5: annual flow-of-funds 2024, MILLIONS OF BAHT. Five institutional columns and total: nonfinancial corporation, financial corporation, general government, households and NPISHs, rest of world.
- The official PDF data were reviewed using an extracted PDF text reader. Web screenshot and binary PDF download were blocked by the access gateway; therefore no visual or cryptographic file validation is claimed.
- The IO XLSX URL was resolved from the original government listing, but this session could not obtain reliably decoded XLSX cells. 16x16 I/O NUMERIC_DATA_BLOCKED. Never fill missing matrix values with zero.

## Frozen independent arithmetic and provenance checks (before implementation)

1. Record 8 financial-instrument categories × 5 institutional sectors; one array for NET_ACQUISITION_OF_FINANCIAL_ASSETS and one for NET_INCURRING_LIABILITIES.
2. Reconcile each of eight financial instruments' 5-sector assets and 5-sector liabilities separately to its printed total. For every instrument, the asset total equals the liability total.
3. Eight financial instrument totals sum to 3,690,415 MILLIONS OF BAHT (2024 annual flow).
4. Five sector financial assets and five liabilities each sum to 3,690,415.
5. Sector surplus/deficit (assets less liabilities) must equal published [1,082,870,250,278,-796,309,151,534,-688,373] and sum to zero.
6. Nonfinancial versus financial sector discrepancies are NOT zeroed. Preserve [1,025,-109,303,-65,119,-85,833,259,230] million baht; overall sum zero.
7. Negative annual net instrument flows are allowed and are NOT invalid, zero, or negative outstanding stocks.
8. Distinguish 2024 financial annual flows from 2024 ending stock/deposits and from 2026 GDP. Cross-year or flow-to-stock substitution must fail with a typed status.
9. Missing sector, absent instrument, wrong unit, undefined, NaN and duplicate sector labels must BLOCK comparison, not silently pass as 0.
10. Deliberate +1 tamper in any source instrument cell triggers a checksum failure; deliberate changes to published totals trigger an independent failure.
11. The 2021 IO 16-sector framework is by INDUSTRY, while this 2024 Flow-of-Funds table is by INSTITUTIONAL SECTOR; do not transpose numbers between them as if they were the same classification.
12. One-to-many institutional sector crosswalk to Cycle 022 toy accounts: nonfinancial corporation→F_GOODS/F_INPUT/F_AUTO, financial→BANK, households→H_WORK/H_OWNER, government→GOV, rest-of-world→ROW. NO observed numeric split inferred.
13. IO importer schema requires exactly 16 named sectors, actual decoded cells, a defined intermediate-flow block, explicit currency units/valuation, source sheet/range and source identity. Unless all exist, return DATA_BLOCKED.
14. Source reports, derived audit arithmetic, model assumptions and simulated futures remain separate. No forecast of full automation arrival, future Thai unemployment, income or GDP.
15. No production writes, no AOM/Skill integrations, no installing agent frameworks. Only Test-LaB documentation, checked code, and an optional local audit spreadsheet.

**Accept:** truthful numeric reconciliation for the accessible 2024 excerpt, and an explicit blocked gate for unparsed 2021 16×16 official Excel. Do not pretend the broader automation future is empirically calibrated.
