# Independent Development Policy — ยกเลิกการรวมสกิล

**Decision date:** 2026-10-20 (Asia/Bangkok)  
**Status:** ACTIVE / USER-DIRECTED / SUPERSEDES ALL PRIOR MERGE PROPOSALS  
**Scope:** AOM, Multiverse World Model, and all separately developed Skill/method/plugin prototypes recorded in Test-LaB.

## 1. Architecture decision

**CANCEL** plans to merge multiple Skills, operating Markdown files, AOM, and the Multiverse World Model into one unified Skill, agent, framework, policy engine, shared prompt, or mandatory dependency graph.

**DEVELOP SEPARATELY**:
- **AOM:** owns opportunity discovery, evaluation, allocation, Skill–Tool selection, and AOM-specific learning. Its existing operating Markdown remains independent.
- **Multiverse World Model:** owns branching, causal/uncertainty hypotheses, lookahead, bounded search, and simulated-versus-observed learning. Its own Markdown and tests remain independent.
- **Other Skills/projects:** each independently owns its scope, instructions, versions, tests, backlog, and release/adoption decision. Do not silently incorporate any other project's rules.

**Shared repository does not mean integrated runtime.** Test-LaB may store independent folders and experiments without making modules depend on one another.

## 2. Clear boundaries

1. No mandatory AOM→Multiverse layer or automatically embedded Multiverse policy in AOM.
2. No central mega-Skill, master prompt, coordinator or common learning brain that replaces individual Skills.
3. No copying rules from one Skill into another as an automatic upgrade. Any optional reference or use of a ready-made existing tool must be deliberate and scoped to that specific task; this is **not** a merger.
4. Each project can advance or remain unchanged without requiring another project to upgrade, test, deploy, or adopt.
5. Maintain separate version numbers and separate evidence of success/failure. A PASS in one project is not a PASS in another.
6. Historical comparison experiments remain archival evidence, not instructions to integrate.
7. Active Hybrid Mind, Facebook, WordPress, Metricool, and other production projects must not be changed as part of a Skill/World Model experiment.
8. No background tasks, publishing, account writes or irreversible actions are authorized by this policy.

## 3. Prior proposals made inactive

- `world-model/AOM_V03_MULTIVERSE_LAYER_CANDIDATE.md`: **CANCELLED / ARCHIVE ONLY**. Do not deploy or merge it into AOM.
- Any prior suggested "AOM V0.3 + Multiverse as default" or "unified AI skills" architecture: **CANCELLED**, irrespective of speculative future benchmark improvements.
- Historical v4 documentation and experiments: retain as records, but references in older files do not override this policy.
- AOM and Multiverse are allowed to continue **independent development and independent testing**, including read-only analysis of public or approved evidence.

## 4. Separate acceptance gates

- **AOM:** independently measure decision quality, tool fit, evidence, resource efficiency, and observed AOM outcomes against its baseline.
- **Multiverse:** independently validate correct branch enumeration under bounded resources, calibration, replanning, safe uncertainty handling, and predictions where testable.
- **Each other Skill:** define its own pass/fail criteria for its specific job. Do not make implementation depend on other Skills.
- Reports must label `SIMULATION`, `OBSERVED`, `UNKNOWN`, and `NOT_EXECUTED` honestly.

## 5. Change policy

A future user request may authorize a narrow, explicitly scoped one-off interaction between projects. Such authorization must **not** be interpreted as approval to merge architectures or make permanent dependencies. Any renewed merger proposal would require a fresh explicit user instruction revoking this cancellation.

**Final instruction:** `SEPARATE DEVELOPMENT / NO SKILL MERGE / NO MANDATORY INTEGRATION / NO PRODUCTION TOUCH`.
