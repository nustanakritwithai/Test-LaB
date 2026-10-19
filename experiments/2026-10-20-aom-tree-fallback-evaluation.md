# AOM V0.3 — GitHub Tree Fallback and Evidence Classification

**Date:** 2026-10-20 (Asia/Bangkok)
**Phase:** PREREGISTERED; all outcomes below are PENDING until separately observed.
**Project scope:** AOM Method–Skill–Tool routing only. Multiverse stays independent; no business/ROI/production account operations, no automation, no new Skill/Plugin/app.

## Decision record — frozen before test API calls

TASK: Distinguish incomplete Git tree scope, content/anchor insufficiency, and a controlled API error from genuinely missing repository content; re-select a minimal working existing GitHub read method.
EXPECTED OUTCOME: No false BROKEN/MISSING claims; source and result remain pinned to the same commit; output check from actual GitHub data.
REQUIRED METHOD: Repository scope analysis, evidence classification and small reversible tool-probe comparison.
SELECTED SKILL: NO_EXTRA_SKILL, because GitHub Markdown/source inspection is handled directly; no installed dedicated GitHub routing Skill is required.
SELECTED TOOL: Existing connected GitHub read actions, with a local in-memory text check for simple known headings.
ACCESS STATUS: Connector reads on this repo worked in the prior trial; this run must reverify.
ALTERNATIVES: Full recursive tree, nested subtree, direct file read, web search, do nothing. Prefer direct source if the task needs content or a single target.
OPPORTUNITY COST: Calls, complexity and incorrect "file missing" assertions; money, time and tokens unmeasured.
DECISION: TEST bounded read-only technical cases; patch one AOM README paragraph ONLY if evidence shows a meaningful missing instruction.
FALLBACK: Stop with UNKNOWN on broken snapshot/ambiguous error; do not loop connection troubleshooting or change Multiverse.
SUCCESS: All test cases have exact observed tool responses, honest evidence statuses, and a compact choice rule (or a deliberate NO_CHANGE verdict).

## Snapshot rule

After this preregistration is committed and read back, fetch `main` HEAD once, record its immutable commit SHA `S`, then use only `S` or a tree SHA derived from `S` for tests. Confirm the baseline README is the expected blob from the prior run, `29a6b8a0f0928ffce46ca4d9c0e3cdf9f11589bc`; if different, record SNAPSHOT_CHANGED and adapt only without fabricating old comparison.

## Cases frozen (no outcomes yet)

**F1 / nonrecursive scope-limited Git tree (controlled design, not connector failure).** Use `GET /repos/nustanakritwithai/Test-LaB/git/trees/S` with NO recursive option, inspect actual JSON `truncated` and all `path` entries. Target: `experiments/2026-10-20-aom-routed-link-audit.md` (known nested path from prior run). When the path is absent in top-level results, the verdict MUST be `NOT_IN_SCOPE` until an actual nested-path read. Reselect `fetch_file` pinned to S; inspect SHA and existence. `missing from shallow tree` is never proof `missing from repo`.

**F2 / metadata vs content/anchor.** Query `README.md` existence in tree at S; that alone must be `FILE_EXISTS_ONLY`. The content question is whether the same README contains a Markdown heading `## Working principles` (expected GitHub fragment `#working-principles`); compare with intentionally nonexistent control heading `## aom-routing-negative-control-never-exists`. Read full README at S once; check both by exact Markdown heading line. A line match is `HEADING_PRESENT`, *not* proof of GitHub's rendered fragment anchor, which requires a separate renderer/browser validation. The negative control is synthetic, not an actual broken user link.

**F3 / controlled invalid-ref read error, not real outage.** Call `GET /repos/nustanakritwithai/Test-LaB/git/trees/0000000000000000000000000000000000000000` once as a deliberate invalid-ref negative control; catch the response/error. Never label the GitHub connection globally down. Reselect a direct `fetch_file(README.md, ref=S)` if it remains safe and usable (reuse F2 read if the response is already present). Distinguish an induced bad-target `HTTP 404` from an unavailable connector. No retry of the invalid ref.

## Counters & guardrails

Count underlying GitHub API reads per test, plus 1 HEAD and 1 README blob baseline check if done. Exclude preregistration/summary writes from per-case reads but declare as overhead. No matched efficiency, latency, token, money, or probability claim. Record failed calls rather than hiding them. If F3 isn't compatible with connected API support, mark NOT_TESTED rather than inventing a failure.

## Observed results (append after preregistered work)

PENDING — do not infer GitHub responses from prior sessions or general API documentation.
