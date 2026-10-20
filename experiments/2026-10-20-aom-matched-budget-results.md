# AOM V0.3 — Matched-Budget Technical Routing Results

**Run date:** 2026-10-20 (Asia/Bangkok)  
**Frozen before target retrieval:** [Matched-budget preregistration](2026-10-20-aom-matched-budget-prereg.md), commit [`f40175d70d0e707fe1a566822863bf68297c8889`](https://github.com/nustanakritwithai/Test-LaB/commit/f40175d70d0e707fe1a566822863bf68297c8889) — GitHub readback verified before task queries.  
**Status:** `FOUR PAIRED PUBLIC REPO TASKS EXECUTED / TOTAL CALL-COUNT TIE / GENERALIZATION UNVERIFIED`  
**Scope:** Technical Method → installed Skill (if any) → Tool selection. NO business/ROI work, no Multiverse merger, no production changes, no new Skill/Plugin/agent/automation.

## 1. Arm definitions, frozen score, and provenance

- **AOM (source-aware):** Known `owner/repo` and file → connected GitHub `fetch_file` (method: exact source read, `NO_EXTRA_SKILL`). Named product without owner → GitHub `search_repositories`, and **one bounded refinement** if the first matches are irrelevant; identify canonical owner/repo (method: repository discovery and provenance review).
- **Baseline (credible web-first):** Ordinary web search with the preregistered query, opening the official repository page where necessary.
- **Matched budget:** Maximum **2 information-retrieval operations per case for each arm**, four cases. Unused budget was not filled with dummy tool calls.
- **Metric:** Correct source-grounded field or official upstream repository identity, actual per-case information-retrieval calls, failure/abstention. An upstream URL alone does not prove software safety, installed state or successful execution.
- **Web accounting:** Four separate `fast` search query records were issued in **one batched web tool call**, then one distinct `open` for F2. We count each query record as one information retrieval (4 + 1 = 5 logical operations) to match the preregistered rubric, but provider batching, token sizes, and wall time are **not** equivalent to GitHub actions. This distinction prevents a fictitious speed/cost win.
- **Verification overhead:** Two extra **GitHub `fetch_file` reads** of official upstream project READMEs validated D1 and D2. These are separately recorded source-oracle checks, **not free** end-to-end work. Setup, AOM File Library retrieval, GitHub preregistration, README improvement and this report also consume tools.

## 2. Observed paired cases

| Case | AOM route, exact observation | AOM ops | Web-first route, exact observation | Web ops | Outcome |
|---|---|---:|---|---:|---|
| **F1 ESLint** | GitHub `fetch_file(eslint/eslint, package.json)`; `engines.node = "^20.19.0 \|\| ^22.13.0 \|\| >=24"`; blob `d35a996b09403413f4f5683a46b8e449cd0fab6e` | **1** | Web search returned the exact [official ESLint root package.json](https://github.com/eslint/eslint/blob/main/package.json) with matching value (crawled last week) | **1** | Both source-grounded |
| **F2 p-limit** | GitHub `fetch_file(sindresorhus/p-limit, package.json)`; `engines.node = ">=20"`; blob `f792b83b85ca1e81ace7cf0c930edf195b20c2ce` | **1** | First web search returned [official project README](https://github.com/sindresorhus/p-limit) and unrelated older/other-package `package.json` results; these **do not** establish target field. Second web `open` of [official root package.json](https://github.com/sindresorhus/p-limit/blob/main/package.json) showed the exact `"node": ">=20"` | **2** | Both source-grounded after appropriate web source verification |
| **D1 Zed editor** | GitHub `search_repositories("Zed collaborative code editor")`: 8 results but **no canonical `zed-industries/zed`**. This was `QUERY_MISMATCH`, **not** a connector outage. Second `search_repositories("zed editor in:name,description")` returned [`zed-industries/zed`](https://github.com/zed-industries/zed) first, unarchived | **2** | Single web search returned [official Zed upstream GitHub README](https://github.com/zed-industries/zed), identifying a multiplayer code editor | **1** | Both identified official upstream; web used fewer retrievals |
| **D2 Biome** | GitHub `search_repositories("Biome formatter linter")` returned [`biomejs/biome`](https://github.com/biomejs/biome) first, unarchived | **1** | Single web search returned [official Biome upstream GitHub README](https://github.com/biomejs/biome) describing formatter/linter | **1** | Both identified official upstream |

### Upstream verification outside the paired budgets

- [Zed official README](https://github.com/zed-industries/zed/blob/main/README.md) fetched via GitHub: blob `9f641fb3841909e9e1f6dbfb947f953c0a0c5ebf`. It explicitly states Zed is a high-performance multiplayer code editor, with upstream owner Zed Industries.
- [Biome official README](https://github.com/biomejs/biome/blob/main/README.md) fetched via GitHub: blob `aab254733d4c8e9410039afdb77d23b2b4590050`. It identifies the Biome web toolchain and formatter/linter role.
- F1/F2 ground truth came from the **exact Github repository root file**, not a blog copy, dependency's nested `package.json`, or remembered Node range. A transient comparison with a web crawl is not a future-proof default-branch snapshot.

### Scoreboard (within the fixed rubric)

| Metric | AOM source-aware | Web-first baseline |
|---|---:|---:|
| Fixed public technical cases | 4 | 4 |
| Source-grounded correct answers/identifications | **4/4** | **4/4** |
| Information-retrieval operations (per-query web accounting) | **5** | **5** |
| Cases needing second lookup | D1 (1) | F2 (1) |
| Unsupported or hallucinated final answer | 0 *observed within these four cases* | 0 *observed within these four cases* |
| Measured runtime/token/cost difference | **UNKNOWN** | **UNKNOWN** |

**Verdict: `TIE`, not AOM superiority.** The equal total count does not mean the physical provider cost or latency is equal. The arms were not blind or randomly ordered; source-repo tasks were chosen by the model; baseline web indexed content may be stale; neither arm proves software can be installed, run or trusted.

## 3. Observed failure mode and bounded change

**Actual case:** The first GitHub repository search for Zed returned irrelevant third-party entries, including an archived project. It was *not* an OAuth failure or API outage; broad natural-language repository search overmatched unrelated descriptions. A **single refined query** constrained to repository name/description returned the official upstream.

**Smallest warranted change:** [README.md](../README.md) added a **Repository-search relevance gate** via GitHub commit [`e5dac8f6cbf5163cd6ac001030d143252d87f162`](https://github.com/nustanakritwithai/Test-LaB/commit/e5dac8f6cbf5163cd6ac001030d143252d87f162), verified by GitHub readback blob `a1e185f9454a62e1244f87313f39a8b3d7b98047`. The guidance distinguishes `NO_RELEVANT_HITS / QUERY_MISMATCH` from `CONNECTOR_BLOCKED`, recommends a bounded search refinement, and permits selecting web-first when it better matches the objective. It does not universally replace GitHub-first OSS discovery and creates no Skill/Plugin.

**What we did NOT modify:** The original AOM V0.3 File Library file, ROADMAP, the independent Multiverse documents/tests, existing production apps, permissions, scheduled jobs, or any third-party repositories. Writes were limited to the authorized public Test-LaB experiment and README.

## 4. Decision record

```text
TASK:             Compare technical Method–Skill–Tool selection under matched call caps.
EXPECTED OUTCOME: Grounded source answers and honest observed cost comparison.
SUCCESS CRITERIA: Two methods per case, cap 2 retrieval ops, exact upstream links.
REQUIRED METHOD:  Source inspection, fact checking, retrieval comparison.
SELECTED SKILL:   NO_EXTRA_SKILL (no installed GitHub-specific Skill applicable).
SELECTED TOOL:    GitHub Connector for candidate, web search for baseline.
ACCESS STATUS:    Both source routes responded; target GitHub reads verified.
ALTERNATIVES:     Web-first, direct GitHub, do nothing, new integration (not justified).
SKILL–TOOL FIT:   Direct is good for known path, search requires relevance checks.
OPPORTUNITY COST: Counted tool operations; wall time/tokens/money not measured.
DECISION:         ADOPT narrow relevance guard; KEEP broader routing policy.
EXECUTION STATUS: Four paired public source tasks executed. GitHub README updated.
VERIFICATION:     Exact package files and official project READMEs; GitHub readback.
FALLBACK:         When repo search hits are irrelevant, narrow query once, then
                  consider alternate existing public search or abstain.
NEXT LEARNING:    Test unseen user-originated tasks across other source/destination
                  types; do not self-award a model win from a 4-case convenience set.
```

**Acceptance:** Both arms were evaluated within the frozen logical retrieval budget, and unsupported superiority claims are explicitly rejected. This is **technical routing evidence** only; **AOM's improvement in average future routing quality is UNVERIFIED**.

**End of manual matched-budget round.**
