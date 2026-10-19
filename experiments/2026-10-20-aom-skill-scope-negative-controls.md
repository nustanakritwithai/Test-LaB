# AOM — Skill Scope & Instruction Precedence: Negative Controls

**Date:** 2026-10-20 (Asia/Bangkok)  
**Project:** AOM V0.3, Markdown-first. **Multiverse independent; no Skill merger.**  
**Outcome:** `SCOPE_GUARD_UPDATED / ROADMAP_PRIORITY_CORRECTED / TWO_GITHUB_WRITES_VERIFIED / ROUTING_GENERALIZATION_UNVERIFIED`  
**Scope:** Technical Method–Skill–Tool selection only. No business, ROI, automation, WordPress, Facebook, Metricool or production work.

## 1. Starting evidence and observed defects

Files were retrieved directly through the connected GitHub tool, and instructions were read from installed Skills rather than inferred from their names.

1. `ROADMAP.md` still presented **P1 historical replay = DO NEXT** and section 9 requested it, whereas the current user has narrowed AOM development to **Skill–Tool routing only**. The old plan was not wrong historically but **stale as current task authority**.
2. `README.md` explained Skill–Tool Fit but lacked a concrete **negative-match gate** for misleadingly similar Skill names/trigger requirements. Installed `documents-router/document` explicitly requires the user to select `@document`; Google Docs and Google Sheets have distinct native destinations, and Sparkore KB guidance is project-specific.
3. A previous AOM experiment incorrectly claimed two unevidenced tool invocations. The existing provenance guard had already been adopted; its separation of `ROUTE_ONLY` from `OUTPUT_VERIFIED` was retained.

**Pre-change deterministic README/ROADMAP checks:** 2/6 passed. Four missing/misaligned checks: (a) routing-only ROADMAP focus, (b) old P1 deferred, (c) section 9 updated, (d) explicit Skill-scope guard. Two existing checks already passed: provenance guard and independent-project policy.

## 2. Routing decision

```text
TASK:             Correct AOM routing ambiguity and the active Test-LaB task priority.
EXPECTED OUTCOME: README rejects near-match Skills by source/destination/trigger/project.
                  ROADMAP no longer points to old P1 or business priorities as DO NEXT.
SUCCESS CRITERIA: Small GitHub-only changes; file readback and per-commit changed paths.
REQUIRED METHOD:  Instruction-scope comparison + minimal Markdown editing + Git readback.
SELECTED SKILL:   NO_EXTRA_SKILL for Test-LaB Markdown editing.
SELECTED TOOL:    Connected GitHub fetch_file/update_file/fetch_commit.
ACCESS STATUS:    GitHub read and write succeeded for these exact files.
ALTERNATIVES:     Google Docs editor, @document router, Sparkore KB skill,
                  build a new routing Skill, or do nothing.
SKILL–TOOL FIT:   Test-LaB Markdown is owned in GitHub, not a native Google Doc;
                  no explicit @document selection; no reason for another app.
OPPORTUNITY COST: More Skill/plugin layers require extra maintenance and blur ownership.
                  Exact time, token consumption and monetary cost were not measured.
DECISION:         DO two narrow corrections, then TEST bounded negative controls.
EXECUTION:        Two Test-LaB Markdown files updated.
VERIFICATION:     Destination readbacks + GitHub fetch_commit each show intended path.
FALLBACK:         If write failed, retain in-chat diff and report NOT_APPLIED; do not
                  switch to unrelated cloud accounts.
NEXT LEARNING:    Run independent user-originated tasks to assess real routing quality.
```

## 3. Actual repository updates — verified

| File | Intended correction | Commit | Readback blob |
|---|---|---|---|
| [README.md](../README.md) | New **Skill scope and instruction precedence**: source/destination, explicit trigger, project scope, target permissions, source priority and `TARGET_UNRESOLVED` | [`a309e6618`](https://github.com/nustanakritwithai/Test-LaB/commit/a309e661800b9c49b4f7c19ae6b2d3e7ae04f5a7) | `cbc3cbef695519471eb0439482e994f89f945b4b` |
| [ROADMAP.md](../ROADMAP.md) | Active Skill–Tool focus, P1 historical replay and P4 business/value work deferred, current manual run corrected | [`59e01d8b4`](https://github.com/nustanakritwithai/Test-LaB/commit/59e01d8b46e8627168d3d4699a31e9bcee769db6) | `5659ba96c758dd6704f52504f153997fb1569d50` |

**Post-change deterministic checks:** 6/6 passed by live GitHub readback. The **individual** GitHub `fetch_commit` results list only `README.md` for the first commit and only `ROADMAP.md` for the second.

**Concurrent-history caveat:** A broad commit-range comparison spanning the earlier AOM changes included *unrelated, separately authored Multiverse changes* between endpoints. It was unsuitable to prove our update touched only one file. Inspection of each individual commit resolved the attribution question. We did **not** touch or merge Multiverse files.

## 4. Installed-Skill negative controls

These test the **documented selection rules**; they do not execute imaginary user jobs or claim quality on independent workloads.

| ID | Input distinction | Correct route / rejected near match | Evidence status |
|---|---|---|---|
| N01 | This task edits Test-LaB Markdown on GitHub | `NO_EXTRA_SKILL → GitHub connector`, not `@document` | **Actual README update + GitHub readback**, Skill rule read |
| N02 | Text mentions a document but user did not choose `@document` | Do not activate documents-router solely by keyword | Installed `documents-router/document` instructions inspected, **rule-only** |
| N03 | Native Google Doc edit | Google Docs specialized path, not the explicit `@document` router by lexical match | Installed `google-docs` inspected, **rule-only** |
| N04 | Existing native Google Sheet formula edit | Google Drive discovery → Google Sheets specialized path; not Docs | Installed `google-sheets` inspected, **rule-only** |
| N05 | Generic AOM Markdown vs project-specific KB Skill | Do not automatically apply Sparkore's receiving-project KB rules to Test-LaB | Installed `kb-maintenance` instructions inspected, **rule-only** |
| N06 | Existing external target unspecified | `ROUTE_ONLY / TARGET_UNRESOLVED`; no unrelated account read/write | README policy readback, **rule-only** |
| N07 | New user's routing focus vs old P1 DO NEXT | Current priority wins; old P1 and ROI work deferred | **Actual ROADMAP update + GitHub readback** |
| N08 | AOM vs Multiverse scope | Independent development, no mandatory integration | Independent policy + README + ROADMAP readback, **policy-only** |

**Test reliability lesson:** N01–N07 passed first run. N08 initially failed **because its test asserted the literal phrase** “no mandatory Multiverse integration” while the actual README stated the same prohibition with different wording. A targeted readback showed that the policy, README and ROADMAP all explicitly preserve separation. The assertion was repaired to reference those grounded phrases; the corrected N08 passed. **This was a test-fixture false negative, not a product bug.** No unnecessary documentation rewrite was made to satisfy a brittle string check.

**Result: 8/8 source-grounded rule checks after fixture correction, including 2 actual GitHub document-write/readbacks.** This is **STRUCTURAL / SOURCE-CONFORMANCE**, not 8 independently executed task successes, zero error rate, an agent benchmark, or measured time/token savings.

## 5. Decision and stop rules

- **ADOPT (narrow):** Explicit project/format/trigger matching before Skill selection; current instructions take precedence over stale roadmap choices; evidence labels require observed actions.
- **KEEP:** AOM V0.3 source of truth in ChatGPT File Library unchanged; GitHub+Markdown; `NO_EXTRA_SKILL` and `NO_EXTRA_TOOL` as legitimate outcomes; Multiverse separate.
- **DROP:** New skill/plugin/orchestrator, automatic Skill merger, historical P1 replay during this scope, further test assertions tuned only to produce green outcomes.
- **WATCH WITHOUT AUTOMATION:** Behavior on **new user-originated technical tasks** with a real destination, accurate paired source checks and actual resource measurements where possible.

**Important limits:** All negative cases except the actual Test-LaB edits are classification of installed Skill rules, not live service operations. No Google Drive document was opened or changed; no production service was touched. Tool count/latency and generalization versus a matched comparator remain `UNKNOWN`.

**End of one manual AOM scope-gate improvement cycle.**
