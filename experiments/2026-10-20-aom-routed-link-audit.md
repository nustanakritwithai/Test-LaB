# AOM V0.3 — Real Skill–Tool Routing Trial: GitHub Local-Link Existence
**Date:** 2026-10-20 (Asia/Bangkok)  
**Phase:** PRE-REGISTERED; no destination statuses or winner known at this phase.  
**Current user direction:** Improve AOM technical Skill/Tool routing; no business tests, Multiverse integration, production changes or new software.

## A. Decision frozen before outcome inspection

**TASK:** Test the internal link-existence verification route for AOM's active GitHub Markdown documentation, `README.md` and `ROADMAP.md`. Count distinct local relative targets, compare two existing GitHub read methods, and decide whether to repair links or leave unchanged.

**METHOD:** Repository file/link audit + bounded correctness comparison.  
**SELECTED SKILL:** `NO_EXTRA_SKILL` (user did not select a document router; GitHub Markdown is not a native Google Doc/Sheet; no dedicated installed GitHub Skill was discovered).  
**SELECTED TOOL:** Existing connected GitHub read APIs (Git tree listing and file fetch). Minimal in-session JavaScript for parsing/comparison; no new library, app or deployed code.  
**ALTERNATIVES:** A separate `fetch_file`/repository-contents read for each target (strong comparator); web page navigation (less suitable for exact Git source); install a Markdown linter (unnecessary for link *existence*); do nothing (zero cost, no check).  
**DECISION:** TEST. No modifications to original AOM V0.3 or Multiverse files.

**INPUT FIXED BEFORE CHECKS:** The two source documents were read through GitHub Connector; source *blob* SHAs were:
- README `cbc3cbef695519471eb0439482e994f89f945b4b`
- ROADMAP `5659ba96c758dd6704f52504f153997fb1569d50`

A bounded regex extracted 12 inline non-external link occurrences and 8 distinct targets. This is not a complete Markdown renderer and intentionally excludes reference-style, bare URLs and fragment-target validation. Targets (relative to repository root):
1. `INDEPENDENT_DEVELOPMENT_POLICY.md`
2. `world-model/CONTINUOUS_MULTIVERSE_v4.md`
3. `tests/continuous_multiverse_v4.js`
4. `world-model/AOM_V03_MULTIVERSE_LAYER_CANDIDATE.md`
5. `experiments/`
6. `experiments/2026-10-19-cycle-006.md`
7. `README.md`
8. `experiments/2026-10-19-field-pilot-cancelled-safe-github-replay.md`

**SHARED SOURCE CONTROL:** Read `main` HEAD commit using GitHub repository branch metadata once, then pin both routes to that commit. Verify README and ROADMAP at that SHA match the preregistered blobs; otherwise report `SNAPSHOT_CHANGED` and do not score silently. Newly created preregistration Markdown may be present in the snapshot but is not itself a target.

**ROUTE A — bulk Git tree (candidate):** One `GET /git/trees/<commit>?recursive=1` request using the existing GitHub connector's approved Git data read API. Inspect `truncated` and explicit `tree` entries. Require exact path/type (`blob` for files, `tree` for directory); if API fails/truncates, abstain and reselect rather than inventing valid links.

**ROUTE B — individual source fetches (credible comparator):** Exactly one `fetch_file` per 7 distinct file targets and one repository-contents directory read for `experiments/`, all at identical pinned commit. Need actual successful fetch/list response; `404` may indicate missing path, other errors must stay `UNKNOWN`. Record each file SHA, and compare it with tree SHA when available.

**ACCEPTANCE AND MEASURES:** Path/type agreement (8/8 required for route equivalence), content SHA agreement for seven files if SHA exists, actual observed call counts per arm, fixed shared source setup cost, failures/truncation, and justified `FIX / NO_CHANGE` decision. A missing file only permits a scoped change if the intended destination is unambiguous; never write to Multiverse just to satisfy AOM evaluation. Equal `path-existence` coverage is required for any call-efficiency comparison.

**LIMITS:** No measurement of wall time, token consumption, monetary cost, security or user benefit; test is one repo, chosen by the model, not randomized or blind. Stronger Git tree approach may not work for very large/truncated repositories. Do not claim universal tool optimality. This prereg is part of the test's total work overhead; per-route call counts alone cannot prove overall savings.

## B. Observed results (append only after executing the frozen plan)

PENDING — no path outcomes, file SHA agreement or efficiency verdict entered during preregistration.
