# AOM — Skill–Tool Routing Evaluation (10 cases)

**Date:** 2026-10-20 (Asia/Bangkok)  
**Scope:** AOM routing intelligence only: method, installed Skill, usable Tool, permissions, fallback, verification.  
**Status:** `10/10 DECISIONS DOCUMENTED; MIXED LIVE PROBES + SCENARIO-ONLY; GENERALIZATION UNVERIFIED`  
**Primary protocol:** `AI_Opportunity_Manager_V0.3.md` (ChatGPT File Library, unchanged).  
**Implementation:** [README Skill–Tool Gate](../README.md), [Independent Development Policy](../INDEPENDENT_DEVELOPMENT_POLICY.md).  
**Separation:** Multiverse is NOT an AOM runtime dependency; no cross-Skill merger.  
**Safety:** Only Test-LaB's README and this experiment record were written. No production systems, other connected services, timers, commercial operations, or unreviewed OSS code were modified or run. This public record includes no private analytics, credentials, or personal data.

## 1. Objective, hypothesis, and limits

**Goal:** Choose the most appropriate Method → existing Skill (if any) → Tool (if any) for varied user outcomes, especially recognizing `NONE`, insufficient access, and the difference between repository discovery and working software.

**Acceptance target:** Ten decisions with alternatives, qualitative cost, execution/verification states, fallback and one learning item; a tool claim must be backed by actual exposure or access, and any actual write must have destination readback.

**Baseline for comparison:** A fixed tool-first heuristic (“use a general-purpose tool or seek an integration regardless of the task”). This is a **declared counterfactual only**; it was NOT separately executed under matched budgets. The current AOM V0.3 already contains native-first and Skill–Tool Gate rules, so this round refines evidence reporting and does **not** demonstrate an improvement versus V0.3.

**Fixture policy:** Cases 1, 3 and 8–10 use self-contained or hypothetical inputs; do not treat them as independently sampled user outcomes. Cases 2, 4, 5–7 include actual read/probe/write operations explicitly noted below. **No measured time, dollar, token, human effort, probability of success, economic ROI, or comparative accuracy** is asserted.

**Source notes:** Before this test, the agent read the original AOM V0.3 from File Library and fetched the current Test-LaB README, ROADMAP and existing experiment archive. The following installed Skills were actually read: `plugin-management`, `google-drive`, `google-sheets`. A Skill being readable is not evidence that an account's target content is accessible.

## 2. Practical selection rule tested

1. State user outcome, preferred destination/format, freshness, allowed reads/writes, and acceptance check.
2. Choose **method**, then find/read matching installed **Skill** only if specialized steps add value. `NO_EXTRA_SKILL` is valid.
3. Choose the minimum sufficient **Tool**, matching data source/destination and permission. `NO_EXTRA_TOOL` is valid; native output is sometimes the destination.
4. Track readiness per layer: `FIT_IDENTIFIED` → `SKILL_INSTRUCTIONS_READ` (if needed) → `TOOL_EXPOSED` → `ACCESS_RESPONDED` → `EXECUTED` → `OUTPUT_VERIFIED`. Skip inapplicable layers without treating skipped checks as failures. `DISCOVERED_ONLY` for an OSS repository never means installed, safe or connected.
5. Reject incompatible, unsafe, unauthorized or overly costly candidates before optimizing speed/calls/tokens. Compare an ordinary viable alternative and **do nothing**.
6. If an actual connector is unavailable, avoid repeated repairs: choose a permitted existing fallback or honestly mark `BLOCKED`. A simulated outage is not an observed failure.
7. Re-select after changes in tool availability, objective or permissions; store only genuinely new learning.

## 3. Ten routing decisions and observations

### T01 — Native language task, no tool

- **TASK:** Condense the fixture “ใช้ความสามารถเดิมก่อน และอย่าสับสนว่า Repository ที่ค้นพบคือเครื่องมือที่เชื่อมต่อ” into one sentence.
- **EXPECTED / PASS:** Preserve both constraints with no external lookup.
- **METHOD / SKILL / TOOL:** Native Thai summarization → `NO_EXTRA_SKILL` → `NO_EXTRA_TOOL`.
- **ACCESS / DECISION:** `NOT_NEEDED`; `DO` (in-chat).
- **ALTERNATIVES:** Web search, GitHub, or a plugin; each adds needless steps to user-provided fixed text. Doing nothing fails the requested rewrite.
- **COST / LIMIT:** No external call for the fixture; no measured model token/time cost.
- **EXECUTION / VERIFICATION:** Native result: “เริ่มจากเครื่องมือเดิม และแยก Repository ที่เพิ่งค้นพบออกจากเครื่องมือที่เชื่อมต่อใช้ได้จริง.” Meaning was checked internally against the fixture, **not independently graded**.
- **FALLBACK / LEARNING:** Use a source-check tool only if the input itself becomes factual or needs current verification.

### T02 — Fresh public information

- **TASK:** Determine the latest stable major Python release as of 2026-10-20.
- **EXPECTED / PASS:** Official publisher, version and release date.
- **METHOD / SKILL / TOOL:** Freshness-aware fact checking → `NO_EXTRA_SKILL` → web search of official publisher.
- **ACCESS / DECISION:** `ACCESS_RESPONDED`; `DO` (read only).
- **ALTERNATIVES:** Native memory (stale risk), GitHub discovery (not needed), no lookup (cannot establish `latest`).
- **COST / LIMIT:** One web lookup batch, no measured latency/token cost.
- **EXECUTION / VERIFICATION:** Official [Python 3.15.0 release](https://www.python.org/downloads/release/python-3150/) states stable 3.15.0 released **2026-10-09**; also [Python source release index](https://www.python.org/getit/source/) listed it as latest Python 3 release at query time. `SOURCE_VERIFIED_AS_OF_RUN`, not a perpetual current fact.
- **FALLBACK / LEARNING:** If official page cannot be reached, use official release history with timestamp; do not replace a freshness requirement with a memory guess.

### T03 — Deterministic data analysis

- **TASK:** On a deliberately synthetic five-number latency fixture `[120,110,130,125,115]` (ms), compute count, mean, median and range.
- **EXPECTED / PASS:** Reproducible exact figures.
- **METHOD / SKILL / TOOL:** Numerical evaluation with independent assertions → `NO_EXTRA_SKILL` → Python numerical/statistics runtime.
- **ACCESS / DECISION:** `EXECUTED`; `DO` (local fixture).
- **ALTERNATIVES:** Mental arithmetic (possible but harder to audit at scale), Google Sheets (needless external artifact), no calculation (fails task).
- **COST / LIMIT:** One small local computation; synthetic values are not production latencies. Runtime and token costs unmeasured.
- **EXECUTION / VERIFICATION:** `count=5, sum=600, mean=120, median=120, min=110, max=130`; assertions passed. `FIXTURE_VERIFIED`.
- **FALLBACK / LEARNING:** For literal one-step arithmetic Native may suffice; choose code when reproducibility or volume requires it.

### T04 — Google Sheets destination

- **TASK:** Scenario: correct a formula in an existing native Google Sheet.
- **EXPECTED / PASS:** Exact spreadsheet/tab/range resolved, formula updated **only with authority**, values re-read.
- **METHOD / SKILL / TOOL:** Precise Sheet edit → installed `google-drive` discovery + `google-sheets` skill (both instructions read) → connected Google Drive/Sheets tool when target is known.
- **ACCESS / DECISION:** `SKILL_INSTRUCTIONS_READ`; metadata-only Drive `search` **responded successfully** for an intentionally unique test-fixture title with **zero matches**. `TEST` route/access only; **no sheet edit**.
- **ALTERNATIVES:** Local XLSX/OpenPyXL (loses native target semantics), generic document edit, no change (safe until target identified).
- **COST / LIMIT:** One metadata probe, no file contents read; exact target, tab and permissions are `UNKNOWN`.
- **EXECUTION / VERIFICATION:** `CONNECTOR_RESPONDED / TARGET_NOT_IDENTIFIED / OUTPUT_NOT_EXECUTED`. This does **not** verify spreadsheet read/write ability.
- **FALLBACK / LEARNING:** Obtain/resolve exact destination before specialized range operations. Never generate a substitute Sheet and claim the existing file was edited.

### T05 — GitHub repository inspection

- **TASK:** Confirm AOM routing requirements in the public Test-LaB README.
- **EXPECTED / PASS:** Real current file and immutable content SHA.
- **METHOD / SKILL / TOOL:** Repository/source inspection → `NO_EXTRA_SKILL` (no matching GitHub-specific installed Skill required) → connected GitHub `fetch_file`.
- **ACCESS / DECISION:** `OUTPUT_VERIFIED` (read-only source retrieval); `DO`.
- **ALTERNATIVES:** General web search (index may lag), manual user paste (unnecessary), no read (cannot validate actual repository).
- **COST / LIMIT:** Authenticated read operations, precise monetary/time expense unmeasured.
- **EXECUTION / VERIFICATION:** [README.md](../README.md) read from GitHub; after the authorized README update its blob SHA was `b62c64b2ae99b3e91285441263c40c47d821aac5`. `SOURCE_READ_VERIFIED`.
- **FALLBACK / LEARNING:** Public raw/web reads may be a fallback for read-only tasks if connector is unavailable; not for private repo or writes.

### T06 — Edit a Markdown operating document, not Google Docs

- **TASK:** Improve the existing AOM README gate to separate Skill, Tool, access and outcome evidence without replacing V0.3 or merging Multiverse.
- **EXPECTED / PASS:** Small authorized Markdown diff on `main`, core sections retained, GitHub readback.
- **METHOD / SKILL / TOOL:** Scoped technical editing and verification → `NO_EXTRA_SKILL` → native Markdown authoring + connected GitHub `update_file` / `fetch_file`.
- **ACCESS / DECISION:** Repository permissions showed `push=true`; `DO`.
- **ALTERNATIVES:** Create a plugin/agent, edit a Google Doc, or add a competing AOM policy file (more maintenance/fragmentation); do nothing misses useful status distinction.
- **COST / LIMIT:** One small README change, read-before-write and readback; elapsed time, tokens and user attention not measured. Not a proof of future better choices.
- **EXECUTION / VERIFICATION:** Updated [README.md](../README.md), GitHub commit [`222fb16046f78ec8548efb74cca13d4bcda382b8`](https://github.com/nustanakritwithai/Test-LaB/commit/222fb16046f78ec8548efb74cca13d4bcda382b8). Fetched it again: routing-readiness section and six scope/integrity assertions passed. `OUTPUT_VERIFIED`.
- **FALLBACK / LEARNING:** If write fails, keep the proposed Markdown in chat and report `NOT_APPLIED`; a successful API return without readback is not enough.

### T07 — Discover an existing open-source tool

- **TASK:** Explicit discovery exercise: identify a candidate for automated local Markdown linting (not currently required by AOM's small Markdown archive).
- **EXPECTED / PASS:** Official repo, documentation, license and platform requirements; no auto-install.
- **METHOD / SKILL / TOOL:** Open-source capability/security triage → `NO_EXTRA_SKILL` → GitHub repository search, targeted source reads, commit/issue discovery.
- **ACCESS / DECISION:** `DISCOVERED_ONLY / DOCUMENTATION_REVIEWED`; `WATCH`, **do not install**.
- **ALTERNATIVES:** Native/manual review of small MD changes (current default), another maintained Markdown linter, build custom linter (disallowed without observed gap), no linting tool for now.
- **COST / LIMIT:** Several read calls; potential Node setup, dependencies, security and maintenance need real validation. No measured install cost or benefit.
- **EXECUTION / VERIFICATION:** [DavidAnson/markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2) found; [README](https://github.com/DavidAnson/markdownlint-cli2/blob/main/README.md), [MIT LICENSE](https://github.com/DavidAnson/markdownlint-cli2/blob/main/LICENSE), and [package.json](https://github.com/DavidAnson/markdownlint-cli2/blob/main/package.json) read. Retrieved package reported version `0.23.3`, Node `>=22`, third-party dependencies; commit and issue records were discoverable. **No installation, dependency audit, functional test or safety certification performed.**
- **FALLBACK / LEARNING:** Do not search GitHub merely to lint a one-file change when existing review suffices. Return only when actual linting needs recur.

### T08 — Multiple installed Skills/tools could plausibly apply

- **TASK:** Scenario: find a named Google Sheet and inspect its formula, without building a new spreadsheet.
- **EXPECTED / PASS:** Identify original native file and read exact needed cells, not a copy or an unrelated file.
- **METHOD / SKILL / TOOL:** Source discovery then formula interpretation → `google-drive` + `google-sheets` instructions read → Drive search **then** native Sheets range-read, when an actual target is given.
- **ACCESS / DECISION:** `SKILL_INSTRUCTIONS_READ / TOOL_EXPOSED`; scenario-only `TEST` route, **not executed** (no target).
- **ALTERNATIVES:** Plugin Management discovery (unnecessary while connector exists), local `.xlsx` processing (wrong destination), native AI guess (no actual data), no action until target is identified.
- **COST / LIMIT:** Correct specialized skill adds required grounding steps, but prevents wrong-file edits; no measured comparative cost.
- **EXECUTION / VERIFICATION:** Skill instructions were read in this session; **no real Sheet formula inspection** happened. `ROUTE_REVIEWED / DESTINATION_UNVERIFIED`.
- **FALLBACK / LEARNING:** Match final artifact/service first, then use specialized Skill; do not stack every available Skill.

### T09 — Required connector unavailable

- **TASK:** Hypothetical request to edit an existing Notion page in an account for which no Notion tool is exposed in this session.
- **EXPECTED / PASS:** Explicitly avoid fake edits or misrepresenting a public web result as an account write.
- **METHOD / SKILL / TOOL:** Permission/source triage → `NO_EXTRA_SKILL` → no viable Notion write tool exposed; `NO_EXTRA_TOOL` for any separately authorized in-chat draft.
- **ACCESS / DECISION:** No Notion connector tool in the inspected session tool list; `BLOCKED_FOR_REMOTE_WRITE`, `WATCH` until valid target and access. **No outage was observed or induced**.
- **ALTERNATIVES:** Plugin discovery/connection if an actual user task requires it, authorized manual draft for later use, no action. Public web browsing is not a fallback for private account writes.
- **COST / LIMIT:** No remote writes attempted and no simulated API success asserted. Does not establish anything about the user's Notion account status.
- **EXECUTION / VERIFICATION:** `ROUTE_ONLY / REMOTE_WRITE_NOT_EXECUTED`.
- **FALLBACK / LEARNING:** Distinguish `tool not exposed` from `connector down`, `path missing` or `authorization denied`.

### T10 — DROP / WATCH / NO ACTION

- **TASK:** Proposal to create a custom AOM plugin solely to summarize one paragraph.
- **EXPECTED / PASS:** Reject unnecessary development while preserving ability to revisit a demonstrated gap.
- **METHOD / SKILL / TOOL:** Opportunity cost and stop-rule reasoning → `NO_EXTRA_SKILL` → `NO_EXTRA_TOOL`.
- **ACCESS / DECISION:** `DROP` new plugin; `DO NOTHING` now. `WATCH` only if repeated real use later demonstrates a gap; **no watcher or schedule created**.
- **ALTERNATIVES:** Native one-paragraph summary (sufficient), use an existing connected document tool if a document destination is explicitly demanded; custom plugin is not justified.
- **COST / LIMIT:** Prevents an unnecessary commitment by policy; savings are hypothetical, not measured.
- **EXECUTION / VERIFICATION:** Decision made, no custom plugin or automation action executed. `ROUTE_ONLY / NO_ACTION`.
- **FALLBACK / LEARNING:** A “not worth doing” choice is valid evidence of routing discipline, not evidence of quantitative benefit.

## 4. Results and non-results

| Criterion | Result | Epistemic status |
|---|---|---|
| Ten cases have explicit Method/Skill/Tool choice | 10/10 documented | `STRUCTURAL / REVIEWED` |
| Cases use `NO_EXTRA_SKILL` or `NO_EXTRA_TOOL` where justified | T01, T03, T05–T07, T09–T10 | `ROUTING DOCUMENTED` |
| Current public fact has publisher evidence | T02 | `SOURCE_VERIFIED_AS_OF_RUN` |
| Reproducible calculation runs | T03 | `FIXTURE_VERIFIED` |
| Existing connector answers a bounded metadata probe | T04 | `ACCESS_RESPONDED`; no Sheet content validated |
| GitHub repository source and modified README can be fetched | T05–T06 | `OUTPUT_VERIFIED` for documented read/write |
| Open-source tool candidate exists and docs/license were read | T07 | `DISCOVERED/REVIEWED`; not installed/tested |
| Multiple-Skill and connector-unavailable choices tested against real destination | T08–T09 | **No**; `SCENARIO_ONLY` |
| New plugin or automation created | None | `NOT_EXECUTED` |
| Matched-budget superiority versus V0.3 or a fixed baseline | Not tested | `UNKNOWN` |
| Consistent performance on unknown future tasks | Not tested | `UNKNOWN` |

**Interpretation:** This run validates the feasibility of distinguishing routing and access states, supplies a small number of real tool interactions, and verifies a bounded README change. It does **not** prove an optimal selection policy, a 100% selection rate, lower costs, or improvement on independent user tasks.

## 5. Change adoption / next trial

- **ADOPT:** README now records explicit separate Method, Skill, Tool, execution and OSS discovery states. This fixes a documentation/evidence-classification ambiguity without introducing another system.
- **KEEP:** AOM V0.3 source unmodified; existing tools and independent project boundaries preserved.
- **DO NOT ADOPT:** Custom plugin, linter installation, auto-automation, business/ROI tests, Multiverse integration.
- **FOLLOW-UP TEST:** On the next *real, user-initiated* nonbusiness tasks, record the route before tool execution, execute only relevant actions, and obtain independent destination/quality feedback where feasible. Compare the original rule and clarified readiness labels with equivalent inputs and tool budgets. Do not claim superiority from this self-authored set.

**Record format going forward:** `TASK → EXPECTED OUTCOME → REQUIRED METHOD → EXACT INSTALLED SKILL (or NONE) → TOOL + ACCESS STATE → ALTERNATIVES/COST → DO/TEST/WATCH/DROP → EXECUTION → EXTERNAL VERIFICATION → FALLBACK → RE-SELECT`.

**End of manual routing evaluation.**
