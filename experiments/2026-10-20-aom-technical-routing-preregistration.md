# AOM Routing — Technical Trial preregistration (2026-10-20)

**Project:** AI Opportunity Manager (AOM V0.3), independent from Multiverse.  
**Goal:** Test real method → installed Skill → Tool choices and evidence provenance on technical tasks. No business/revenue/ROI tasks.  
**Status:** `PREREGISTERED / NO TRIAL RESULT IN THIS FILE`.  
**Safety:** Read-only trials except writing the test record(s) and narrowly authorized Test-LaB README corrections. No Google content mutation, production systems, background automations, software installations, or cross-skill integrations.

## Routing arms and validity

- **Candidate:** Outcome-first AOM: exact source/destination → appropriate method and installed Skill (or NONE) → smallest suitable existing Tool (or NONE), with explicit provenance and verification.
- **Comparator:** A credible generalist/default route for the same task. Execute matched read-only comparisons when feasible; explicitly mark any unexecuted comparator `COUNTERFACTUAL_ONLY`.
- **Budget:** For a paired source retrieval, at most two calls in each arm (source-identification trial T1 and external package trial T2). For relative link check (T3), at most four calls per arm; `web` page open counts as one call and GitHub fetch of each file counts as one. A multi-query web batch counts as one web call for tool counts but its workload differs; report that limitation.
- **Acceptance and scoring:** A route passes an objective if the correct authoritative source was accessed and the answer is traceable, respecting read/write scope. Record (a) method and named Skill; (b) selected Tool and at most next-best option; (c) **actual** calls and observed response; (d) external/readback check; (e) whether useful result is produced; (f) calls and any avoidable steps. Absent actual calls/observations = `NOT_EXECUTED`.
- **Cost:** Number of external action invocations only. Money, elapsed time, human attention and token consumption are `UNMEASURED`. Do not claim optimality from qualitative impressions.
- **Blindness limitations:** T1 original Library document and T3 Test-LaB README were already examined in preceding sessions, thus these cases are **not blind**; T2 external repo file will not be opened before this preregistration. No held-out generalization claim.
- **Status taxonomy:** `ROUTE_ONLY`, `TOOL_INVOKED`, `SOURCE_VERIFIED`, `OUTPUT_VERIFIED`, `NOT_EXECUTED`, `UNVERIFIED`, `SCENARIO_ONLY`. Never claim an unsupported runtime/tool execution.

## Fixed cases (freeze before observation)

### T1: Correct source of AOM operating protocol
- **Task:** Identify V0.3 canonical document and find its §6A heading.
- **Candidate:** File Library search/ref from user-provided source-of-truth, then bounded Files read. `NO_EXTRA_SKILL`.
- **Comparator:** Targeted GitHub code search in Test-LaB for the same doc/headline.
- **Check:** Canonical File Library resource and exact heading; a similarly named GitHub reference must not be misrepresented as the original. Max 2 tool actions each.

### T2: Exact current source requirement
- **Task:** Report verbatim `engines.node` from root `package.json` in upstream public repository `prettier/prettier` on its default branch.
- **Candidate:** Connected GitHub direct `fetch_file` for `package.json`, extract value. `NO_EXTRA_SKILL`.
- **Comparator:** Ordinary web search for the same source and field, using public search results and, if required, open the identified page.
- **Check:** Exact source field/string with upstream file URL, and whether comparator independently substantiates it. Two calls per arm maximum.

### T3: Test-LaB Markdown relative-link integrity
- **Task:** Validate the first **three distinct** links pointing to local `.md` files in current Test-LaB README, in their appearing order, excluding fragment-only and external URLs.
- **Candidate:** GitHub fetch README; minimal in-memory Markdown link matcher for extraction; fetch each of the three targets via GitHub (up to 4 actions). No third-party linter installation.
- **Comparator:** Open the public README GitHub web page and up to three displayed target links through web (up to 4 actions). A 404 is a useful result; a tool access failure is not a confirmed broken target.
- **Check:** State target list and upstream fetch results. Parser is only for discovery and may miss reference-style links; record limits. Status per link, not blanket claim of all-README validity.

### T4: Native output without unnecessary tools
- **Task:** Rewrite user-provided sentence `การค้นพบ Repository ไม่ได้ยืนยันว่าเครื่องมือนั้นเชื่อมต่อหรือทำงานสำเร็จ` into concise Thai without changing the meaning.
- **Candidate:** Native text rewriting, `NO_EXTRA_SKILL / NO_EXTRA_TOOL`, no external call.
- **Comparator:** External research or plugin selection, **not executed** because it adds no required evidence. Mark `COUNTERFACTUAL_ONLY`.
- **Check:** Meaning-preservation against supplied fixture, self-reviewed, not a measured model-quality gain.

### T5: Competing installed Skills without target identity
- **Task:** Scenario: user wants to repair a formula in an *existing* native Google Sheet but gives no title, URL or identifier; do not access private Drive content or modify anything just for benchmark.
- **Candidate:** Inspect installed `google-drive`, `google-sheets`, `google-docs` instructions; select Sheets workflow and require target discovery/authorization before actual edits. Tool exposure may be checked, but do not read an arbitrary account file.
- **Comparator:** Generic Google Docs or local spreadsheet route, **review only**; no remote writes.
- **Check:** Right Skill boundary, correct native destination, `ROUTE_ONLY/NOT_EXECUTED` clearly distinguished.

## Publication gate

Publish one result Markdown under `experiments/` with exact tool observations, policy misses, unmeasured metrics and a binary **ADOPT / REVISE / KEEP** decision for the evidence-provenance change. Do not modify the V0.3 original, launch a new Skill/plugin, or claim broader behavioral accuracy. End the manual run after readback.
