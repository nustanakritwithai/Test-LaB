---
title: "Thailand NESDC I/O 2021 16-sector Ingestion Gate — Cycle 024"
date: "2026-10-20"
version: "cycle024-lab"
project: "Independent Multiverse World Model"
status: "VALIDATION_LOGIC_PASS__OFFICIAL_IO2021_MATRIX_DATA_BLOCKED"
schema_validator: "tests/cycle024_io2021_ingestion_gate.js"
xlsx_inspector: "scripts/cycle024_inspect_nesdc_xlsx.mjs"
source_manifest: "data/cycle024_nesdc_io2021_ingestion_status.json"
no_aom_skill_merger: true
production_changes: false
---

# Thailand Official Input–Output 2021 — Strict Source Gate

This research is a standalone extension of the independent Multiverse World Model. It is NOT merged with AOM, another Skill, WordPress, any bank, or any production service. Results are internal data-quality evidence, not a Thai economic forecast.

## 1. Source and current evidence status

NESDC public listing: https://www.nesdc.go.th/download/i-o-2021-16-sectors/

The site shows the Excel download link, listed date 25 February 2025 (data reference year is 2021). Its redirect points to:
https://www.nesdc.go.th/wp-content/uploads/2025/03/DataIO2021x16.xlsx

Download attempts through the source web reader, direct container network and an interactive browser did not produce usable original XLSX bytes in the model's execution environment. A URL or download button does not constitute verified cell readback.

**Actual official I/O matrix status:** DATA_BLOCKED; **0 of 256 numeric matrix cells verified**, 0 independent official row totals, 0 independent official column totals. Original workbook SHA256, sheet names, transaction block range, source units and valuation basis UNKNOWN. Never create all-zero or estimated official matrices as substitutes.

Machine-readable attempted-source manifest:
[data/cycle024_nesdc_io2021_ingestion_status.json](../data/cycle024_nesdc_io2021_ingestion_status.json)

## 2. What Cycle 024 successfully added

### Standalone 16x16 schema and arithmetic validator

[Cycle 024 gate JS](../tests/cycle024_io2021_ingestion_gate.js) passed **86/86 deterministic logic assertions**.

Mandatory proof fields include:
- exact NESDC original-source URL, observation year 2021, dated retrieval, original byte length, SHA256, successful ZIP integrity and original XML sheet readback;
- exactly 16 unique source row-sector labels and 16 unique source column-sector labels, each with independent worksheet cell location;
- one explicitly identified 16 by 16 intermediate-transaction block, with finite numerical values, named worksheet, source currency/unit and basic/producer/purchaser-price valuation;
- original publisher row and column control values from source ranges DISTINCT from the transaction block, matching the intermediate-only comparison concept and a justified rounding tolerance;
- independently checked 16 row sums and 16 column sums. A one-cell +1 alteration must be detected in its affected row and column.

The validator rejects null/NA/dash/Infinity as substitutes for actual numeric cells, false original hash, corrupt-source declaration, duplicate labels, missing 16th row, wrong year, unsupported valuation and substituted 2024 financial-flow data. Genuine negative transaction adjustments may be preserved if documented in the original source.

**Integrity boundary:** An attacker can fabricate source provenance declarations in JSON. Therefore even a perfectly passing self-described matrix remains SOURCE_REVIEW_PENDING until original XLSX bytes/cell locations are genuinely inspected. A separate 16x16 *synthetic* fixture passed arithmetic tests, and it remains tagged SYNTHETIC_NOT_OFFICIAL with zero official cells verified.

### Generic, read-only XLSX archive inspector

[Cycle 024 XLSX inspector](../scripts/cycle024_inspect_nesdc_xlsx.mjs) is a small Node.js 18+ standard-library utility requiring no npm installation or network.

It reads local XLSX ZIP central-directory parts, checks CRC32/entry-size integrity, freezes original-file SHA256, resolves worksheets through OOXML relationships, and reads cell addresses, shared strings, numeric values, formulas and cached values.

Reproduce in a local checkout:

    node scripts/cycle024_inspect_nesdc_xlsx.mjs path/to/DataIO2021x16.xlsx inspection.json

The inspector deliberately does NOT decide which 16x16 range, controls or valuation basis are official. Its output is a workbook-structure readback, not a calibrated economic model.

**Smoke test (entirely synthetic, NOT the NESDC source):** A real mock XLSX produced with artifact_tool contained 324 nonempty cells, 288 cached numeric cells and 32 formula cells including source-control sum formulas. The read-only inspector recovered workbook title, cell addresses, a negative number, formulas, cached values and a valid CRC/SHA256. Corrupting a test XLSX byte caused ZIP_CRC_SIZE_MISMATCH, not a false pass. The mock file has NEVER been labeled official evidence.

### Companion review workbook

A local companion spreadsheet named NESDC_Cycle024_Data_Gate.xlsx contains:
- Overview: official links, 0/256 status, pending source-proof steps.
- IO2021_Pending: all 256 official I/O transaction inputs **left blank**, source row/column controls blank, status formulas BLOCKED, no fabricated cells.
- FF2024_Official_Excerpt: eight financial instruments by five institution sectors from source-text-reconciled Cycle 023 data, with formula-driven asset/liability totals 3,690,415 million THB on both sides.
- Institution_Crosswalk: source financial institutions to invented account labels, classification ONLY.

This is a derived audit tracker, NOT the original NESDC 2021 file. Formula checksum and formula-error scans passed.

## 3. Separation of observed data types

| Information | Real observation | Allowed use |
|---|---|---|
| NESDC industry I/O table | 2021 official 16x16 workbook, original numerical cells UNAVAILABLE | Classification and download reference only until original readback |
| NESDC institutional financial accounts | 2024, Table 1.5, year-net flows checked in Cycle 023 | Historical financial-flow accounting, NOT 2021 industry I/O |
| Invented synthetic account stock | Cycle 022 scenario state | Toy bookkeeping ONLY |
| Thai labor surveys | NSO 2025 and Q2 2026 (different coverage/time) | Macro context, not automatic task displacement |
| Fully capable automation milestone | Date T* UNKNOWN | Scenario premise, not an actual event |

The sector classification in I/O (industries) and the institutional financial sectors in Flow-of-Funds are different. Year, currency, unit, measurement concept, historical flows versus stocks and valuation must be harmonized using source evidence before cross-dataset inference.

## 4. Acceptance criteria before real historical calibration

1. Obtain intact NESDC original Excel bytes; freeze URL and SHA256.
2. Verify workbook sheet names and exact 16-sector source header labels.
3. Locate real 256 transaction cells, units, price/valuation concept and independent publisher controls.
4. Compare source-row and source-column sums; reject missing/renamed/mismatched controls and false zeros.
5. Reconcile imports, domestic/intermediate flows, final use, total output, value added and year as separate statistical concepts.
6. Only then compute **historical** coefficients. Predictive claims about future Automation still require independently validated scenarios and out-of-sample testing.

**Current status:** VALIDATOR_TESTS_PASS / ORIGINAL_IO2021_CELL_READBACK_BLOCKED / THAI_AUTOMATION_CALIBRATION_NOT_AUTHORIZED / NO_AOM_MERGER / NO_PRODUCTION_TOUCH.
