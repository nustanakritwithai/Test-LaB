# AOM v0.3 — Matched-Budget Routing Benchmark (Pre-registration)

**Date:** 2026-10-20 (Asia/Bangkok)
**Status:** `PREREGISTERED / NO TASK OUTCOMES OBSERVED`
**Scope:** Technical information retrieval and Skill–Tool selection only. AOM V0.3 remains the original ChatGPT File Library source; Multiverse is independent. Do not touch Hybrid Mind, WordPress, Facebook, Metricool, business operations, or other production accounts.

## 1. Question and two policies

**Question:** For *public GitHub-hosted technical source information*, can source-aware AOM route selection produce accurately grounded answers within the **same tool-call cap** as a credible general-public-web-search baseline? Report actual source/answer quality and action counts, not invented latency, money, or model tokens.

**AOM route policy (precommitted):** For a specifically named GitHub repository and exact file path, use connected GitHub `fetch_file` rather than generic discovery; for a named software tool without owner/repo, use connected GitHub `search_repositories` then (if needed) a targeted upstream repo read. `NO_EXTRA_SKILL` because installed Skill inventory has no applicable GitHub-specific reusable Skill. Use the native fact-checking and source-authority method. Never treat `DISCOVERED` as `TESTED` or `VERIFIED` software functionality.

**Comparator, fixed policy:** Use ordinary **web search first**, applying its strongest visible relevant results and opening relevant official sources if necessary. This is a credible workflow for public technical information. It is **not** intentionally reduced to stale model memory or a fake unavailable connector.

Both arms get **at most 2 information-retrieval tool invocations per case**. Queries may be rewritten only to correct an observed unsuccessful search within this cap; count the second request and log it. One web search request and one GitHub file read each count as one *invocation*, while internal provider work and returned result sizes are not directly comparable. Ground-truth checks after the paired run and setup/report writes are accounted separately, not hidden as zero total work.

**Pass criteria for each case:**
- Exact-path cases: return the verbatim value of the root `package.json` field `engines.node`, or `UNAVAILABLE` if proven absent from that source, and a traceable upstream URL. A plausible value without source evidence is `UNVERIFIED`.
- Repository-discovery cases: identify upstream exact `owner/repo`, supported by repository ownership/description and a canonical URL. A similarly named unrelated repo does not pass.
- Missing/blocked lookups: do not invent; label `NO_MATCH`, `BLOCKED`, or `UNKNOWN` correctly.
- Count answered cases, calls, abstentions, errors and contaminated/ambiguous evidence for **both** policies.

## 2. Fixed unseen tasks (freeze now, before querying target outcomes)

| Case | User-equivalent question | AOM action (max 2 calls) | Baseline web search first |
|---|---|---|---|
| F1 | What is `engines.node` in root `package.json` of `eslint/eslint` at current default branch? | `fetch_file(eslint/eslint, package.json)` | `eslint eslint package.json engines.node github` |
| F2 | What is `engines.node` in root `package.json` of `sindresorhus/p-limit` at current default branch? | `fetch_file(sindresorhus/p-limit, package.json)` | `sindresorhus p-limit package.json engines node github` |
| D1 | Find the official upstream GitHub repository for the **Zed collaborative code editor**. | `search_repositories("Zed collaborative code editor")` | `Zed editor official GitHub repository` |
| D2 | Find the official upstream GitHub repository for **Biome formatter and linter**. | `search_repositories("Biome formatter linter")` | `Biome formatter linter official GitHub repository` |

**Selection bias:** These four cases were picked by the model, not randomly sampled or user-provided. Both named-file tasks are particularly suitable for a GitHub source connector; no claims about all task families will be made. The repos and their exact answers were **not opened to find these target outcomes prior to freezing this protocol**. However model training and prior experiences could expose some project names or facts; not a prospective blinded trial.

## 3. Observation and decision rules

1. Write and read back this preregistration before **any target repo file retrieval or baseline web queries**.
2. Execute the **fixed AOM arm** for all four tasks and the **fixed baseline web arm** for all four tasks. If the web interface batches multiple independently specified searches into one call, count one invocation per provider search item when represented as separate queries; do not turn an arbitrary batch into apparent cost savings.
3. Record actual answer, matching source URL, exact API result type, success/abstention and tool invocations per case. Prefer immutable Git blob SHA for GitHub file facts when available.
4. Perform an independent upstream source read to resolve a disagreement where feasible, and report that verification separately. Repo identity for D1/D2 is measured against owner/README/official links, not high star counts.
5. Compare binary *source-grounded correctness* and per-case invocation count; do **not** infer token consumption, wall-clock speed, total dollar savings, security or downstream usefulness.
6. Recommend **ADOPT / REVISE / KEEP** only if observations warrant it. If both arms solve every case equally, record a tie rather than claim AOM outperforms.
7. Save one separate results Markdown in `experiments/`. Read it back from GitHub. Do **not** modify README, ROADMAP or the original AOM if no new discrepancy is found.

**Hard stop:** No installation, new Skill, plugin, agent framework, production writes, recurring task or Multiverse import. Any failed source lookup must be reported honestly rather than bypassed with invented output.
