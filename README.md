# Test-LaB — AI Opportunity Manager

> **Purpose:** Test whether an AI can allocate limited attention and tools to higher-value opportunities than a fixed task queue — using existing model capabilities and connected market tools, without building another agent framework.

## Working principles

1. **Outcome-first:** Define the objective, current baseline, time horizon, and what would count as success before choosing a task.
2. **Opportunity-first:** Explore realistic alternatives, including "continue the baseline" and "do nothing".
3. **Capability-first:** Prefer native AI abilities, existing Skills, connected Plugins and ready-made tools. **Build nothing new by default.**
4. **Skill–Tool Fit:** For **every AOM task**, choose the required method/skill and suitable tool (including **no extra Skill/tool** where that is the best route) before using resources; perform a proportionate routing check before each meaningful external step, and re-select when evidence, constraints or availability change.
5. **Skip blocked tools:** If a connection fails, record that fact and continue with the next viable route. Do not troubleshoot unless the goal explicitly requires it.
6. **Evidence labels:** Distinguish `FACT`, `INFERENCE`, `HYPOTHESIS`, and `UNKNOWN`. No fabricated ROI, conversion, or performance scores.
7. **Observe real outcomes:** A tool call succeeding is not proof a business objective was achieved.
8. **Protect boundaries:** This is a public experimental repository. Do not publish private customer information, account data, secrets, or non-public analytics. Destructive, external or irreversible changes require separate authorization.

## Required Skill–Tool Routing Gate — every task

> **Current manual-evaluation focus (2026-10-20):** Improve AOM's choice of method, existing Skill and Tool. Business outcomes, ROI pilots, production writes and new automation are outside this test round. AOM V0.3 remains the main protocol; Multiverse is independent per [Independent Development Policy](INDEPENDENT_DEVELOPMENT_POLICY.md).

### Routing readiness: skill evidence vs tool evidence

> **Provenance guard (2026-10-20, observed reporting defect):** Never label an action `EXECUTED`, `ACCESS_RESPONDED`, `SOURCE_VERIFIED`, `FIXTURE_VERIFIED` or `OUTPUT_VERIFIED` unless the **current run's actual tool invocation and returned evidence** support it. Write a compact evidence ledger: `case → selected route → invoked action(s) → observed response/target → independent check → execution verdict`. A correct guess, written URL, plausible answer, prior-turn assertion, or documentation describing how to call a tool is **not** execution evidence. If the action was only selected, use `ROUTE_ONLY`; if provenance is missing, use `UNVERIFIED` and correct earlier records visibly with a dated erratum. For simulated connector failures, use `SCENARIO_ONLY`, not `BLOCKED` by observed outage.

Record **separate** states; do not inflate a discovery result into a successful task:

| Layer | Evidence state | What it establishes (not what it implies) |
|---|---|---|
| Method | `FIT_IDENTIFIED` / `UNDECIDED` | A working approach was chosen; not a passed outcome |
| Skill | `NO_EXTRA_SKILL` / `SKILL_LISTED` / `SKILL_INSTRUCTIONS_READ` | A real installed instruction set was found/read; not proof its tool works |
| Tool | `NO_EXTRA_TOOL` / `TOOL_EXPOSED` / `ACCESS_RESPONDED` / `BLOCKED` | The tool exists or answered an appropriate probe; not proof the target artifact was processed |
| Execution | `NOT_EXECUTED` / `EXECUTED` / `OUTPUT_VERIFIED` | Only destination readback or an applicable independent check establishes output success |
| Open source | `DISCOVERED_ONLY` / `REVIEWED` / `TESTED` / `VERIFIED` | Repository discovery, license review, installation, and useful output are different claims |

**Decision order:** define desired native artifact/source and freshness → identify method → read only applicable installed Skill instructions → select the least-complex capable, authorized Tool (or NONE) → check access and output separately → if unavailable, SKIP/re-route once instead of repeatedly debugging. Do not use GitHub discovery if native or connected tools already satisfy the task. Do not add new Skills/Plugins without a demonstrated missing capability. Never mark a simulated outage as an observed connection failure.

**Target behavior:** For every task handled under AOM's operating instructions, make an **explicit internal choice of METHOD/SKILL + TOOL + EXECUTION MODE**, not a habitual choice based on the last task. “Skill” may mean a native reasoning/work method; an installable skill package is **optional**. “Tool” may legitimately be **NONE** for tasks best completed natively. The goal is an *appropriately capable, compatible, authorized and resource-efficient pair*, not maximum number of tools used.

**Run this small gate before information gathering and again before any meaningful external action; re-run it whenever facts, authorization, tools or task objective materially change.** For trivial, clear tasks, the gate can take one sentence internally; never enumerate the entire tool market without a reason.

1. **Outcome / Success:** What user outcome matters? Is action actually needed? What is the baseline, resource budget, authorization scope and proof of success?
2. **Capability / Method:** Which specialist method is really necessary (evidence verification, code review, Git operations, spreadsheet formulas, statistical analysis, content writing, etc.)? Can the model's current native capability meet the objective without extra tools?
3. **Available Skill:** Prefer a suitable currently installed/connected Skill and read its instructions *when relevant*. If none fits, use the appropriate native method rather than fabricating a Skill. Distinguish method competence from packaging.
4. **Available Tool:** Match the chosen method to a working tool that can deliver the required read/write/verification. Check whether the tool is present and authorized in **this session**. Prefer connected first-party/specialist apps. If a capability gap remains, search GitHub as the first open-source discovery source; a discovered repo is **not** a connected or trusted tool. Also consider ready-made external services if better.
5. **Fit / Total cost:** Reject incompatible Skill–Tool pairs, inadequate permissions, unsafe sources, and routes that cost more than their incremental value. Compare required accuracy, latency, human time, tokens, money, license, maintenance, reversibility and alternatives (including **DO NOTHING**). Do not invent monetary estimates or numerical scores.
6. **Route / Act / Verify:** Pick one route with `DO / TEST / WATCH / DROP` and state `SKILL/METHOD → TOOL/MODE → ACCEPTANCE CHECK`. Execute only within approval. After an external change, read back the actual result from its destination. If a connector is broken, mark `BLOCKED` and **SKIP** to the next viable existing route rather than looping through repair.
7. **Learn / Re-select:** Record a routing lesson only if useful: Was the chosen pair sufficient? Did permissions or availability change? Was another available path measurably better? Re-run the gate at the next consequential step as needed.

**Minimum routing record (five short fields, for consequential tasks):**
```text
GOAL / PASS:        desired result and how to verify it
SKILL / METHOD:     native method or exact relevant installed Skill (otherwise NONE)
TOOL / MODE:       selected available connector/native tool, or NONE; access CONFIRMED / UNTESTED / BLOCKED
FIT / ALTERNATIVE: reason the pair beats the next viable path, including burden and risk
EVIDENCE / FALLBACK: source-of-truth check and alternative if unavailable
```

**Read-only example routes — illustrative, not an assertion of access in future sessions:**
- **Explain a concept / make a simple choice:** native reasoning/evidence method → **NONE**; no external tool unless freshness/facts require it.
- **Modify a Google Sheet when authorized:** installed Google Sheets Skill (if available in the session) → connected Google Drive/Sheets action → verify exact updated range. Do not substitute a generic code tool merely because it is familiar.
- **Inspect a GitHub repository:** native software/repository-audit method → connected GitHub read actions → cite exact file/commit; no custom GitHub Skill needed.
- **Find a new open-source capability:** requirements and risk-review method → GitHub repository search/read **for discovery only** → check upstream/license/security and feasible setup; don't install or run unknown code just because it exists.
- **External system update where authorization is absent:** choose the assessment method, mark execution `NOT_AUTHORIZED`; no write action.

**Verification target:** Across a varied set of *user-initiated* tasks, every task should exhibit the appropriate route or an explicit `NO_EXTRA_SKILL/NO_EXTRA_TOOL`, no invented installed skills, no invented connector access, no missing readback on actual external writes, and no unnecessary GitHub search when native/existing tools suffice. A written rule alone is **STRUCTURAL**, not evidence of universal reliability; test real routing behavior separately.

**Activation boundary:** This Markdown governs a run **when actually loaded/applied as AOM context**. Merely saving it on GitHub does not automatically install it, make it run in every new chat, or guarantee 100% tool-selection accuracy. No new Skill, Plugin, agent, scheduler or service is required by this rule.

### Skill scope and instruction precedence

**Negative-match gate (use when Skills have similar names):** Resolve the requested **source, native destination/format, explicit activation trigger, owning project, required operation, and target permission** before matching a Skill. Do **not** activate a Skill merely because its title/description contains a word from the task. `SKILL_LISTED` is not `SKILL_APPLICABLE`; installed but inapplicable Skills must be rejected rather than stacked.

**Observed scope examples from installed instructions (2026-10-20):** The `document` router is only triggered when the user explicitly chooses `@document`; Google Docs instructions govern **native Google Docs**, Google Sheets governs **native Google Sheets**, and project-specific Sparkore KB guidance is not automatically a Test-LaB rule. For a Markdown file **in GitHub**, prefer `NO_EXTRA_SKILL` + the verified GitHub connector. Refresh these examples if installed Skill instructions change.

**Instruction and source priority:** Honor the user's current authorized outcome and constraints and higher-level safety boundaries; use the original AOM V0.3 in File Library as operating source, the [Independent Development Policy](INDEPENDENT_DEVELOPMENT_POLICY.md) for project separation, this README for current routing mechanics, and `ROADMAP.md` only for **currently active** task priorities. Older `DO NEXT` directions in archived or superseded plans must not override a newer user-directed focus. Do not silently replace the original AOM or require Multiverse.

**Readiness:** If an existing target is unspecified or permissions are unverified, record `ROUTE_ONLY / TARGET_UNRESOLVED` and do not inspect unrelated account content or perform a write. Only observed destination readback permits `OUTPUT_VERIFIED`. Keep the reason for rejecting a near-match short; do not search all Skills again for trivial tasks.

## Tool Discovery — GitHub-first when existing capabilities are insufficient

**AOM source-selection decision (2026-10-20):** Keep AOM as Markdown and use GitHub as the **primary discovery source for open-source tools** when the current model and connected/installed tools do not adequately fulfill a real objective. GitHub is a source of **candidates**, not an automatic trust, deployment, or installation authority.

**Selection order (not a mandate to search for every trivial request):**

1. **Use what already works:** Start with native model capabilities and actually available Skills, Plugins, Connectors, hosted services and official provider tools. If an existing route meets the objective with reasonable total cost, use it without a GitHub search.
2. **Gap confirmed → GitHub-first open-source discovery:** Define the missing capability and acceptance criteria, then use the connected GitHub search/fetch tools to discover maintained official projects and community alternatives. Prefer the upstream maintainer's canonical repo; curated “awesome” lists are discovery pointers, not proof of quality.
3. **Compare realistic options, including KEEP / DO NOTHING:** Shortlist only useful candidates (typically 2–3); compare expected outcome, platform compatibility, license, current availability, installation burden, human attention, token/tool use, money, maintenance, reversibility and displaced opportunities. A commercial or already connected tool can win if it is more reliable and cost-effective.
4. **Security and authenticity gate:** Inspect owner/upstream identity, release history/activity, open/closed issues, dependency and security signals, required access scopes, code/setup behavior, license and documentation. Stars, forks, badges or an impressive README **do not certify security, correctness, permission, availability or production readiness**. Do not execute unreviewed scripts, install arbitrary dependencies in production, grant high-privilege tokens or send private data to an unknown project. Test only in an appropriately isolated sandbox and with authorization.
5. **Tool access gate:** `DISCOVERED` ≠ `CONNECTED` ≠ `TESTED` ≠ `VERIFIED`. A public GitHub repo may require a local runtime, hosting or configuration not available in this session. Do not claim it can be used directly until the required integration/access and destination result are confirmed. If a tool/connector fails, **SKIP** and choose a viable alternate route; no looping through connection troubleshooting.
6. **Decision & evidence:** Return `DO / TEST / WATCH / DROP`; note the verified repo URL, version/commit when material, source of trust, caveats and the evidence needed to change the choice. Prefer read-only/small reversible tests before adoption. **Build new code, Skills, Plugins or apps last**, and only when the value gap has been demonstrated.

**Sample discovery sources, NOT pre-approved installations:**
- [MCP reference implementations](https://github.com/modelcontextprotocol/servers) — its own README warns these examples are educational references, **not production-ready by default**, and points users toward the [MCP Registry](https://registry.modelcontextprotocol.io/) for published servers.
- [Community MCP list](https://github.com/wong2/awesome-mcp-servers) — useful for breadth of discovery, but each linked repo still needs independent quality/security validation.

**Evidence policy:** A repository exists → `FACT`; it solves this task → `HYPOTHESIS` until verified; it is safe/connected → `UNKNOWN` until checked. Do not substitute GitHub popularity or synthetic tool scores for actual use outcomes.

## Independent projects — no Skill merger

**Current user-directed policy (2026-10-20):** [Independent Development Policy](INDEPENDENT_DEVELOPMENT_POLICY.md) — **cancel all Skill/MD mergers**. AOM and Multiverse World Model must be developed, tested, versioned and assessed independently. Do not adopt or load a Multiverse layer into AOM as a mandatory component, and do not build a central Skill or agent framework.

- **AOM:** this README's opportunity decision + Skill–Tool routing principles apply to AOM only.
- **Multiverse World Model:** [independent Markdown](world-model/CONTINUOUS_MULTIVERSE_v4.md) and [its own reference tests](tests/continuous_multiverse_v4.js); development and results are isolated from AOM.
- **Legacy AOM+Multiverse merger candidate:** [archived/cancelled proposal](world-model/AOM_V03_MULTIVERSE_LAYER_CANDIDATE.md); never treat it as active operating instructions.
- **Other skills:** their own mission, rules, release decisions and tests. Sharing GitHub as a file archive, or deliberately using an existing tool for a single task, does **not** constitute an integrated Skill.
- **Production safety:** no changes to Hybrid Mind, Facebook, WordPress, Metricool, or other active production systems through Test-LaB trials.

Historical comparative studies can remain in `experiments/` as evidence, not as mandates to merge.

## Test loop

```text
Goal / constraint
      ↓
Baseline (what would have happened otherwise)
      ↓
Choose METHOD/SKILL + TOOL for evidence gathering (or NONE)
      ↓
Discover 3–5 options → Validate evidence → Compare opportunity cost
      ↓
DO / TEST / WATCH / DROP
      ↓
Re-select METHOD/SKILL + TOOL for authorized action (native → existing tools → GitHub discovery if gap → build-last)
      ↓
Run the smallest safe test → Verify externally → Record observed cost/outcome
      ↓
Learn / revisit on fresh evidence
```

## How success will be judged

| Dimension | What we observe | Do not confuse with |
|---|---|---|
| Decision quality | Was a credible higher-value alternative discovered and chosen? | AI claiming its choice is optimal |
| Tool efficiency | Necessary tool calls, human interventions and maintenance burden | Raw count of tools installed |
| Execution quality | Artifact or result verified at the destination | A model reporting success |
| Repeatability | Same protocol produces traceable decisions on new data | A one-off demonstration |
| Actual value | Measured incremental outcome versus baseline/comparison | Proxy scores without a real test |

**Important:** This repository tests *decision routing and reproducibility first*. An improvement in business outcomes remains **UNVERIFIED** until an authorized, comparable real-world experiment produces observations.

## Experiments

**[Browse the full experiment archive](experiments/)** — GitHub automatically lists all Markdown records in this folder, including new manual test rounds. No per-cycle README edits or custom indexer are required.

- [Cycle 006 — First real GitHub routing test](experiments/2026-10-19-cycle-006.md) (starting example)

## Default procedure for a new experiment

Record: **Goal → Baseline → Alternatives → Evidence → Selected skill/tool → Execution → Verification → Observed cost → Outcome → Next decision**.

Keep the lab in Markdown while Markdown is sufficient. Use GitHub's existing history for version tracking. Do not add a database, orchestration layer, custom API, dashboard, or CI solely to appear more sophisticated.

*Initialized 2026-10-19 (Asia/Bangkok).*
