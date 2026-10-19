# Test-LaB — AI Opportunity Manager

> **Purpose:** Test whether an AI can allocate limited attention and tools to higher-value opportunities than a fixed task queue — using existing model capabilities and connected market tools, without building another agent framework.

## Working principles

1. **Outcome-first:** Define the objective, current baseline, time horizon, and what would count as success before choosing a task.
2. **Opportunity-first:** Explore realistic alternatives, including "continue the baseline" and "do nothing".
3. **Capability-first:** Prefer native AI abilities, existing Skills, connected Plugins and ready-made tools. **Build nothing new by default.**
4. **Skill–Tool Fit:** Before an important action, choose the smallest appropriate method and tool. Verify access when needed.
5. **Skip blocked tools:** If a connection fails, record that fact and continue with the next viable route. Do not troubleshoot unless the goal explicitly requires it.
6. **Evidence labels:** Distinguish `FACT`, `INFERENCE`, `HYPOTHESIS`, and `UNKNOWN`. No fabricated ROI, conversion, or performance scores.
7. **Observe real outcomes:** A tool call succeeding is not proof a business objective was achieved.
8. **Protect boundaries:** This is a public experimental repository. Do not publish private customer information, account data, secrets, or non-public analytics. Destructive, external or irreversible changes require separate authorization.

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

## Continuous Multiverse v4 — active protocol for multistep decisions

For multi-step opportunity decisions, follow **[Continuous Multiverse World Model v4](world-model/CONTINUOUS_MULTIVERSE_v4.md)** *in addition to* the outcome-first and capability-first rules above:

- **Every nonterminal point is a decision point, a new universe root, and a learning point.** Read current evidence and prior history, update beliefs, enumerate all declared feasible alternatives, simulate possible next observations, evaluate contingent policies, and choose one authorized next step.
- **Re-root at every new observed state.** From the new point, rebuild a fresh fixed-depth lookahead tree; do not merely reuse a stale plan or pretend an alternative virtual future happened.
- **Keep simulated and observed learning separate.** A simulated branch can update its own hypothetical belief, but only verified real observations can update real-world evidence. With no new observation return `WAIT_FOR_OBSERVATION`; with an unmodeled observation report `MODEL_MISS`.
- **Prefer existing tools and Markdown.** Do not add a scheduler, app, framework, plugin, database, or service without a demonstrated need. Do not execute external/irreversible operations without authorization. Branch completeness refers only to the *declared bounded scenario space*.

**Reference finite logic test:** `node tests/continuous_multiverse_v4.js` (Node.js 18+, no packages); [Cycle 012 result](experiments/2026-10-19-cycle-012-continuous-multiverse.md). Synthetic logical correctness does **not** establish predictive accuracy or real-world business uplift.

## Test loop

```text
Goal / constraint
      ↓
Baseline (what would have happened otherwise)
      ↓
Discover 3–5 options → Validate evidence → Compare opportunity cost
      ↓
DO / TEST / WATCH / DROP
      ↓
Skill + Tool selection (native → available connectors → build-last)
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
