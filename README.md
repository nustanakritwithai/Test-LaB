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
