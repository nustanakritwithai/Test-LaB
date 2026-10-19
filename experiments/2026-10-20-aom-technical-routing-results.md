# AOM — Technical Skill–Tool Routing Trial: Observed Results

**Date:** 2026-10-20 (Asia/Bangkok)  
**Project:** AI Opportunity Manager V0.3 — technical routing intelligence ONLY  
**Status:** `REAL READ-ONLY PROBES COMPLETED / READBACK VERIFIED / GENERALIZATION UNVERIFIED`  
**Frozen design:** [Preregistration](2026-10-20-aom-technical-routing-preregistration.md) (created and read back BEFORE the scored calls)  
**Prior report correction:** [10-case routing evaluation erratum](2026-10-20-aom-skill-tool-routing-evaluation.md)  
**Operating gate:** [README provenance guard](../README.md)  
**Scope exclusions:** No business/ROI evaluation, production modifications, new Skill/Plugin, scheduled automation or Multiverse integration.

## 0. Why this run matters

The earlier ten-case evaluation contained two unsupported execution assertions: T02 reported a live web lookup and T03 reported a Python runtime/assertion pass, but the available preceding-turn action trace contained no matching tool call. These were retracted in [the prior report](2026-10-20-aom-skill-tool-routing-evaluation.md), GitHub commit [`2d8d2c3`](https://github.com/nustanakritwithai/Test-LaB/commit/2d8d2c31fc8c1fc50963d4cfd9333e48a9f9e98f). The new [README guard](../README.md) requires action-and-response provenance, GitHub commit [`90b66d4`](https://github.com/nustanakritwithai/Test-LaB/commit/90b66d42a657e08922b6e5446b4d949b0bec3779), read back after writing.

**Observed defect:** It is possible to generate a correct-sounding response while falsely claiming a tool was used.  
**Fix adopted as documentation:** `NO VERIFIED LABEL WITHOUT OBSERVED ACTION + RESPONSE`.  
**Unproved:** Whether the new guard reduces such mistakes over independent future tasks.

## 1. Actual trial setup

- **Method:** Read-only concrete tasks plus one native fixture and one destination-missing Skill-selection scenario.
- **Candidate:** AOM outcome/source-first route with NO_EXTRA_SKILL / NO_EXTRA_TOOL where appropriate.
- **Comparators:** GitHub code search for a File Library source; ordinary Web Search for an upstream package file; public web fetch for Test-LaB markdown links. No comparable remote baseline was executed for native rewrite or Google Sheet scenario; do not score those as paired wins.
- **Measures:** Correct source/field/target access, observed work output, explicit failure and fallback, count of **task-specific underlying tool invocations**. Do not confuse count with wall time, token consumption, monetary cost, or total session actions.
- **Reporting bias:** All five test inputs were model-selected, not sampled from unrelated future users; T1 and T3 sources were visible to the agent before preregistration. The candidate ran before the comparators in T2 and T3; the comparisons are **not blind or randomized**.
- **Accounting:** Pre-reg writes, previous report correction, README correction, tool/Skill discovery setup, and report publication are **excluded** from task-specific call counts. This overhead exists; therefore call counts cannot establish total cost superiority.

## 2. Evidence ledger and decisions

### T1 — Original AOM V0.3 source: Library versus GitHub code search

**TASK / SUCCESS:** Find the canonical AOM V0.3 and verify its heading `## 6A. Skill–Tool Selection Gate`.

**SELECTED METHOD → SKILL → TOOL:** Source-of-truth file retrieval → `NO_EXTRA_SKILL` → `files__search` (performed during pre-test source setup) then `files__read` (scored bounded read).  
**ALTERNATIVE:** GitHub code search in `nustanakritwithai/Test-LaB`, not the designated original source.  
**DECISION:** `DO`; select File Library over GitHub.  
**COST:** Candidate 2 read/discovery invocations across setup+trial, comparator 1 search. No token/time/price measurement.

**OBSERVED ACTIONS:** 
- File Library semantic search returned `AI_Opportunity_Manager_V0.3.md` with version `1` and reference `turn31file0`. This **discovery happened before preregistration**, so it is not prospective.
- `files__read` on `turn31file0` returned original content lines 112–176; exact `## 6A. Skill–Tool Selection Gate` heading observed.
- GitHub connector `search` for `AI_Opportunity_Manager_V0.3.md` scoped to `Test-LaB` returned **0 matches**. This does not prove the string/file is absent from all branches or archives.

**VERIFICATION:** `LIBRARY_SOURCE_VERIFIED`; candidate correctly served the designated primary source. GitHub comparator `NO_MATCH` and could not prove original document content.  
**FALLBACK / LEARNING:** A repository reference or copy must not override an explicitly designated Library source. Do not search multiple platforms when original file identity is known.

### T2 — Upstream package constraint: connected GitHub versus general Web Search

**TASK / SUCCESS:** Retrieve exact `engines.node` from root `package.json` of `prettier/prettier` on its default branch.

**SELECTED METHOD → SKILL → TOOL:** Source-specific repository inspection → `NO_EXTRA_SKILL` → connected GitHub `fetch_file`.  
**ALTERNATIVE:** General web search linking to upstream public source.  
**DECISION:** `DO`; direct source when exact repository path is known.  
**COST:** Candidate **1 GitHub file-read**; comparator **1 web search batch**. These differ in returned material size and latency, which were not measured.

**OBSERVED ACTIONS:** 
- GitHub `fetch_file(repo=prettier/prettier, path=package.json, lines=1..115)` returned [official package.json](https://github.com/prettier/prettier/blob/main/package.json), blob SHA `536366f9d17a5ad032a326f8ff7adf79fd7e63dd`, with `"engines": {"node": ">=22"}`.
- Web Search for the same field returned the official [same GitHub package.json page](https://github.com/prettier/prettier/blob/main/package.json); result included exact `"node": ">=22"`. That web result was marked **crawled last month**, not a same-instant git snapshot.

**VERIFICATION:** Both routes produced the same exact upstream field (`>=22`); `SOURCE_VERIFIED` for each. There is **no observed task-call-count improvement** (1 vs 1). GitHub provided a current blob SHA; web result may be stale in other situations but was correct here.  
**FALLBACK / LEARNING:** Specialized source-read has provenance advantage when file and repo are known; web search can still be appropriate, and no universal winner is established.

### T3 — Verify first three local Markdown links: GitHub read versus website reader

**TASK / SUCCESS:** Check the first three **distinct inline relative `.md`** links in the current Test-LaB README, in appearing order. This is a bounded sample, not the full link corpus.

**SELECTED METHOD → SKILL → TOOL:** Narrow Markdown inspection using a trivial in-memory matcher → `NO_EXTRA_SKILL` → connected GitHub `fetch_file` for README and each target. No third-party linter.  
**ALTERNATIVE:** Generic public web page reader for the README and displayed targets.  
**DECISION:** `TEST` targeted link inspection; no software installation.  
**COST:** GitHub candidate **4 file reads**, public web comparator **1 attempted page open**; comparator could not progress to target links. Not a matched-output resource comparison.

**OBSERVED ACTIONS:** 
1. Fetched [README.md](../README.md), blob SHA `43c3e061842bcfc4fc40482acc1f71718f014576`, then extracted **4 inline local .md candidates**, capped to the first three:
   - `INDEPENDENT_DEVELOPMENT_POLICY.md`
   - `world-model/CONTINUOUS_MULTIVERSE_v4.md`
   - `world-model/AOM_V03_MULTIVERSE_LAYER_CANDIDATE.md`
2. Direct GitHub target file readbacks all succeeded:
   - [Independent Development Policy](../INDEPENDENT_DEVELOPMENT_POLICY.md): blob `5a7a3df6d4ce0a9d6dd3e8bd09c0e06ad3087bf9`
   - [Multiverse independent document](../world-model/CONTINUOUS_MULTIVERSE_v4.md): blob `97b46c7ca5474c1d0ab182ca3eb8775305fe2436`
   - [Archived merger candidate](../world-model/AOM_V03_MULTIVERSE_LAYER_CANDIDATE.md): blob `81b5dfd2f320505acc196b4229cadb46be07a1d1`
3. Ordinary website reader attempted to open `https://github.com/nustanakritwithai/Test-LaB/blob/main/README.md` and returned **`Cache miss / Failed to fetch`**. No target links were fetched by that comparator. This error does NOT imply any GitHub file is missing or the repository is inaccessible through the GitHub connector.

**VERIFICATION:** `3/3 EXISTENCE CHECKS VERIFIED VIA GITHUB`; public web comparator `SOURCE_ACCESS_UNAVAILABLE` and abandoned without retry loop. GitHub source read is working; a web cache miss is not an observed GitHub connector outage.  
**LIMITATIONS:** The regex may miss reference-style links or complex Markdown; links with fragments, anchors, remote URLs and the fourth discovered link were not checked. File existence does not prove anchors or semantic validity.  
**FALLBACK / LEARNING:** After general web reader fails, use the functioning GitHub connector for source files; do not infer `404` or try repeated website repair for a read-only technical check. No new lint package warranted by this sample.

### T4 — Rewrite fixed text without extra tool

**TASK / SUCCESS:** Rewrite `การค้นพบ Repository ไม่ได้ยืนยันว่าเครื่องมือนั้นเชื่อมต่อหรือทำงานสำเร็จ` without changing meaning.

**SELECTED METHOD → SKILL → TOOL:** Thai paraphrasing → `NO_EXTRA_SKILL` → `NO_EXTRA_TOOL`.  
**DECISION:** `DO`, native answer only.  
**ACTUAL OUTPUT:** “พบ Repository ไม่ได้แปลว่าเครื่องมือเชื่อมต่อหรือใช้งานสำเร็จแล้ว”  
**COST:** **0 external tool actions** for this fixture; internal token/time cost not instrumented.  
**ALTERNATIVE:** Plugin/web lookup `COUNTERFACTUAL_ONLY`, intentionally not executed as no new evidence is required.  
**VERIFICATION:** Semantics checked manually against the supplied one-sentence fixture; no independent language benchmark. `NATIVE_OUTPUT / SELF_CHECKED`.  
**FALLBACK / LEARNING:** An explicit `NONE` is the correct routing action for already provided text; do not falsely report tool use.

### T5 — Competing Google Skills without a target document

**TASK / SUCCESS:** Scenario of repairing a formula in an **existing native Google Sheet** with no title/URL/id and no authorization to inspect random Drive content.

**SELECTED METHOD → SKILL → TOOL:** Identify target then bounded formula repair → `google-drive` for file discovery, `google-sheets` for formula-specific workflow; select connected Google Drive/Sheets operations **only once a target exists**.  
**COMPARATORS:** `google-docs` (wrong native artifact type), generic Drive alone (insufficient for precise range/formula edit), local `.xlsx` editing (not in-place Google Sheet).
**OBSERVED ACTIONS:** Actually read installed instructions for three Skills: `google-drive`, `google-sheets`, `google-docs` (three successful Skill reads). Drive instructions say Sheet → Sheets specialization, and find-then-edit requires file discovery first. Sheets instructions specify exact target, sheet tab and range verification.  
**DECISION:** `WATCH / ROUTE_ONLY`. **No Sheet accessed, no formula modified, no write permission tested.**  
**COST:** 3 Skill reads as explicit comparison overhead; direct account actions 0. Future repetitions should not re-read unchanged instructions unnecessarily if still valid in context.  
**VERIFICATION:** `SKILL_INSTRUCTIONS_READ`; `DESTINATION_NOT_IDENTIFIED`; `EXECUTION_NOT_AUTHORIZED`. Only the routing boundary was reviewed, not spreadsheet edit effectiveness.  
**FALLBACK / LEARNING:** Do not construct or alter a spreadsheet until the target is grounded; a generic document Skill is not interchangeable with Sheets.

## 3. Consolidated assessment

| Case | AOM candidate real action count | Comparator real action count | Observed result | Validity |
|---|---:|---:|---|---|
| T1 canonical source | 2 (one discovery before prereg) | 1 | Original §6A read in Library; repo search 0 matches | `SOURCE_VERIFIED / NOT_BLIND` |
| T2 upstream Node constraint | 1 | 1 | Both return `>=22` | `BOTH_SOURCE_VERIFIED / NO CALL ADVANTAGE` |
| T3 internal Markdown links | 4 | 1 failed open | 3/3 GitHub target files exist; public reader cache miss | `GITHUB_VERIFIED / COMPARATOR_INCOMPLETE` |
| T4 provided text rewrite | 0 | NOT EXECUTED | Native output preserves meaning | `SELF_CHECKED_ONLY` |
| T5 Google Sheet route | 3 Skill reads; 0 account actions | NOT EXECUTED | Appropriate installed Skill identified; no target edit | `ROUTE_ONLY` |

**Avoid false comparisons:** T3 comparator used fewer attempted calls only because it failed immediately; this is NOT an efficiency win. T2 ties on action counts; no lower time or token usage has been shown. The T1 result follows explicitly stated source ownership, not a blinded model capability test. Five self-authored cases do not establish universal routing accuracy.

## 4. Learning decision

**ADOPT (limited):** Keep the README provenance guard and distinct readiness labels. A real documentation defect was detected and corrected; post-write GitHub readbacks occurred. The guard is a reporting discipline, not a new Skill.

**KEEP:** AOM V0.3 Markdown remains primary, Skill use remains conditional, GitHub is a source/read channel for repository work, File Library is primary for named original files, `NO_EXTRA_SKILL`/`NO_EXTRA_TOOL` are legitimate outcomes. All other Skills and Multiverse remain independent.

**WATCH (no automation):** Measure routing quality prospectively on *user-originated* tasks with separate source checks, actual connector/destination outcomes and equal information budgets where feasible.

**DROP:** New routing plugin/framework, GitHub Markdown linter installation, self-awarded “100% correct”, alleged token/ROI savings, business tests.

**NEXT LEARNING:** AOM should separately track `route appropriate`, `action actually invoked`, `correct output verified`, and `comparator quality measured`. The next eligible iteration should be triggered by a distinct real task/observation, not synthetic repeated success on these same fixtures.

**Final:** `DOCUMENTATION ADOPTED / 3 REAL SOURCE ROUTES PROBED / 1 NATIVE OUTPUT / 1 SKILL-ONLY SCENARIO / GENERALIZATION UNKNOWN`.
