# Cycle 024 — NESDC 2021 Input–Output Original Workbook Ingestion Gate (Frozen Protocol)

**Date:** 2026-10-20, Asia/Bangkok. **Stage:** frozen test contract before coding or accepting any XLSX matrix.
**Project:** INDEPENDENT Multiverse World Model, no AOM/Skill integration; no production writes.
**Goal:** Move from Cycle 023's IO2021 DATA_BLOCKED state to audited source-cell extraction **only when** the NESDC original workbook can be fetched and objectively checked.

## Primary source identity

- Publisher: Office of the National Economic and Social Development Council (NESDC), Thailand.
- Listing: https://www.nesdc.go.th/download/i-o-2021-16-sectors/
- Confirmed download redirect: https://www.nesdc.go.th/wp-content/uploads/2025/03/DataIO2021x16.xlsx
- Observed year of I/O data: 2021. Date appearing on listing is NOT data observation year.
- Adjacent distinct source: 2024 NESDC Flow-of-Funds, audited as annual financial flows in Cycle 023. These flows are not input-output 2021 industry values or 2024 deposit stocks.
- At time of freezing: browser/text extraction could locate original XLSX URL but NOT decode a workbook sheet/cell range in this execution environment. **Numeric I/O status DATA_BLOCKED, verified cells 0/256** until source inspection succeeds.

## Machine-checkable acceptance (proposed)

A) Authenticity gates:
1. XLSX must come from the resolved original NESDC URL or a verified byte-identical copy, with the original source URL, retrieval time, file byte length, and SHA256 fingerprint.
2. Original XLSX archive must open without ZIP format/CRC errors, workbook and worksheet XML paths must resolve, and cells must have unique addresses; do not use cached web-search estimates as worksheet readings.
3. Sheet names, data layout, 16 sector labels in source order, exact intermediate-flow 16×16 cell range, explicit price basis/valuation, and units must be inspected **in the workbook** before any matrix is accepted.
4. Each of the 256 values must be a finite numeric cell, with formula handling and cached values accounted for. Never convert blank, NA, dash, error or unobserved cell into zero by default.
5. Independent official row/output and column/input controls must be read from a DIFFERENT source cell region than the 16×16 matrix (not self-computed and passed as source). Reference each source cell.
6. Preserve negative adjustments when officially justified; do not reject all negative entries automatically.
7. Validate all 16 sums of rows and columns against those observed published control cells, with explicit rounding tolerance, adjusting for the official definition (intermediate-only control vs gross output). If workbook controls are not comparable, BLOCK, not a false failure or fabricated correction.
8. Unit and valuation scope must match exactly before cross-source arithmetic; unknown unit -> DATA_BLOCKED.

B) Adversarial examples and epistemic safety:
9. Dummy 16×16 zero-grid with no real source SHA/controls is BLOCKED.
10. Changing one matrix cell must break either a row or column independent-control check.
11. Duplicated sector label, cell address, out-of-range row/column, missing unit/sheet/range, and shortened 15×16 matrix all BLOCK.
12. Own computed row sums supplied as fake official controls do not independently certify authenticity; provenance must explicitly say ORIGINAL_WORKBOOK and point to observed control addresses.
13. Out-of-scope 2024 Flow-of-Funds annual flows and 2026 labor data cannot be used to fill missing I/O cells.
14. No 2021 coefficient is automatically promoted to a future automated-Thai-economy forecast; real predictive calibration remains UNVERIFIED.
15. A source that cannot be downloaded/read returns SOURCE_UNAVAILABLE/DATA_BLOCKED with truthful evidence, no invented numbers.
16. No changes outside independent Test-LaB research; no AOM merge and no production service deployment.

## Deliverables

- tests/cycle024_io2021_ingestion_gate.js : runnable schema + arithmetic validation, synthetic/negative tests.
- scripts/cycle024_extract_nesdc_io2021.mjs : standalone Node standard-library read-only XLSX worksheet inspector (only if safe to implement), outputs inspection **without guessing the matrix block**.
- world-model/THAILAND_IO2021_CYCLE024.md : model gate, source semantics and audit outcomes.
- experiments/2026-10-20-cycle-024-io2021-results.md : actual execution evidence and blocked/verified cells.

All validation is staged. Unless the original workbook bytes and independent source totals become accessible, final status stays **IO_2021_DATA_BLOCKED**; a successful checker on synthetic values is NOT evidence that official 16×16 data were audited.
