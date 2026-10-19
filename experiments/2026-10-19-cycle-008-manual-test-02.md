# AOM Test-LaB — Cycle 008 / Manual Test 02

**Date:** 2026-10-19 (Asia/Bangkok)  
**Challenge:** Can AI Opportunity Manager identify a higher-value action than merely creating the next report, and deliver a measurable improvement by using capabilities GitHub already has?  
**Scope:** The public Test-LaB repository only. No changes to Hybrid Mind, no new automation, custom code, plugin, database, or service.  
**Verdict at authoring:** `EXECUTION COMPLETED; POST-WRITE READBACK REQUIRED` — see actual repository contents to independently confirm this file is reachable.

## 1. Goal, baseline and pre-registered measurable endpoint

- **Goal:** Ensure manual experiments remain discoverable with minimal recurring maintenance.
- **Previous baseline:** Every experiment needed an individually maintained README link to remain discoverable from its index. The README linked directly to Cycle 006 but not Cycle 007, while both files existed.
- **Observed precondition (verified through GitHub connector):** `experiments/` contained exactly two records before this cycle. One of those two was explicitly indexed from README (direct-link coverage **1/2**). Both were nevertheless retrievable if the directory was browsed directly.
- **Success criterion established before adding this report:** A new Cycle 008 file becomes visible through the GitHub `experiments/` archive without another README change. Readers can discover all experiment records through one stable README archive link.
- **Actual business lift is NOT the endpoint** of this narrow maintenance-focused test. It remains unverified.

## 2. Alternatives and opportunity-cost analysis

| Feasible action | What it offers | Limitations / opportunity cost | Decision |
|---|---|---|---|
| A. Generate another experiment report and stop | Adds one output | Repeats the same indexing gap; does not improve access to prior results | BASELINE / NOT CHOSEN |
| B. Update the README's per-file table of contents every round | Makes each report directly discoverable | One index edit and GitHub write to maintain each new item; error-prone over time | WATCH |
| **C. Add one stable README link to GitHub's native experiment directory** | Access to all past and new records automatically using GitHub's existing directory listing | Less curated than a hand-written index; depends on GitHub hosting | **DO — CHOSEN** |
| D. Build a script, GitHub Action or dashboard to generate an index | Custom formatting / extra features | Software and maintenance cost without a demonstrated unmet requirement | DROP |
| E. Do nothing | No immediate work | Keeps a known discoverability gap | DROP |

**Why C?** It closes a verified gap while letting GitHub maintain the file listing. No extra installed tools, servers, or workflows; no recurring README index edit for the next file. This is a reasoned opportunity selection, not a claim of universally optimal resource allocation.

## 3. Skill–Tool Fit

- **Skill/method:** Repository audit, compare opportunity cost, choose a reversible edit, inspect post-write behavior.
- **Native model:** Decision comparison and minimal Markdown edit planning.
- **Existing tool:** Connected GitHub API — `get_repo`, `fetch`, `fetch_file`, `update_file`, `create_file`.
- **Plugin/Skill to build:** None.
- **Write boundary:** README archive link and this experiment report on the authorized public test repository only.
- **If blocked:** Skip failed connector, disclose failure, and do not simulate GitHub success.

## 4. Real execution evidence

1. Read GitHub repo metadata: `Test-LaB`, default `main`, write permission present.
2. Read actual `README.md`, previous Cycle 007, and recursive repository tree.
3. **Before change:** Two existing experiment files, README directly linked only Cycle 006.
4. Updated the existing README once, adding **[Browse the full experiment archive](../experiments/)** (rendered README points to `experiments/`) while keeping Cycle 006 as a pinned example.
5. GitHub update returned commit `f3e119fb37704c149cb8c3d97a7ba413add1eb39`.
6. Independent README readback showed `](experiments/)` present; GitHub directory listing still showed the two previous experiment files.
7. Created this new Cycle 008 report **after** changing README, with no new README edit.
8. **Independent verification required:** Read GitHub's `experiments/` contents again. The directory should list Cycles 006, 007 and 008, and this file should read back correctly. The follow-up report in ChatGPT carries the actual success/failure verdict; this file does not self-certify a post-write check.

## 5. Measurable comparison and interpretation

| Measure | Old state | Intended improved state | Evidence status |
|---|---|---|---|
| Direct experiment links on README | 1 of 2 present | One stable archive link, independent of number of experiment files | Stable link verified; archive after this write pending |
| Manual README edits per future newly-added experiment to keep directory discoverable | Potentially 1 if manually indexing each entry | **0 needed** with GitHub native directory listing | Demonstrated by creating Cycle 008 *without* modifying README again, subject to archive readback |
| Additional custom systems | 0 | 0 | Verified: GitHub-only route |
| Business revenue/traffic impact | Not measured | Not measured | `UNKNOWN` |
| Actual token, wall time, human effort saved | Not measured | Not measured | `UNKNOWN` |

**Do not infer that 1 GitHub edit equals any particular minutes or token savings.** The benefit measured here is eliminating the need for repetitive README-index maintenance, not money or commercial growth.

## 6. Gate for the next manual round

For Cycle 009, move beyond lab housekeeping to one authorized, measurable end-user objective. Compare AOM selection against a realistic baseline with the same resource budget and, where possible, measure real downstream value. If no such experiment is feasible, explicitly mark business-outcome comparison `PENDING` rather than inventing benefit.

## 7. Learning

The valuable decision was not "make another report" but **remove a recurring source of friction using an existing GitHub capability**. The decision becomes meaningful only if subsequent cycles remain accessible without further index-management work.

**Cycle 008 disposal:** `ADOPT IF ARCHIVE READBACK PASSES`. No automatic schedule was enabled.
