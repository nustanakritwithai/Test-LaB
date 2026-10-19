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

**Execution status:** `ACTUAL CONNECTOR ACTIONS OBSERVED / SOURCE_AND_COMPARATOR_VERIFIED`. No prior result was written when the plan was frozen.

### Observed snapshot and source checks

1. The GitHub Connector fetched `GET /repos/nustanakritwithai/Test-LaB/branches/main` and returned main HEAD commit **`3777d1399e89e9bba975110e73a9d87eacf58afc`** (the preregistration-file creation commit).
2. Two `fetch_file` reads at that **exact commit** returned the preregistered README blob `cbc3cbef695519471eb0439482e994f89f945b4b` and ROADMAP blob `5659ba96c758dd6704f52504f153997fb1569d50`. Both matched; `SNAPSHOT_CHANGED = false`.
3. This was a **preselected and partially preexamined** repository, not a blinded user benchmark.

### Route A — bulk tree observed

One connected GitHub `fetch` read:
`GET https://api.github.com/repos/nustanakritwithai/Test-LaB/git/trees/3777d1399e89e9bba975110e73a9d87eacf58afc?recursive=1`

**Observed:** `truncated = false`; **64 tree entries**; all eight targets present with expected `blob` or `tree` type.

### Route B — direct destination reads observed

Eight independent connected GitHub reads pinned to the same commit: seven `fetch_file` responses with blob SHA and one `GET /repos/.../contents/experiments?ref=<pinned-commit>` directory read. Directory returned 32 child entries. Every target returned a successful read/list result.

| Fixed target | Tree type | Tree/file SHA agreement | Direct read |
|---|---|---|---|
| `INDEPENDENT_DEVELOPMENT_POLICY.md` | blob | `5a7a3df6...` **match** | OK |
| `world-model/CONTINUOUS_MULTIVERSE_v4.md` | blob | `97b46c7c...` **match** | OK |
| `tests/continuous_multiverse_v4.js` | blob | `0b9438db...` **match** | OK |
| `world-model/AOM_V03_MULTIVERSE_LAYER_CANDIDATE.md` | blob | `81b5dfd2...` **match** | OK |
| `experiments/` | tree | directory SHA not compared; separately listed **32** children | OK |
| `experiments/2026-10-19-cycle-006.md` | blob | `d832efcf...` **match** | OK |
| `README.md` | blob | `cbc3cbef...` **match** | OK |
| `experiments/2026-10-19-field-pilot-cancelled-safe-github-replay.md` | blob | `d9307101...` **match** | OK |

### Matched outcome and observed action costs

| Criterion | A: Git tree | B: direct per path |
|---|---|---|
| Path existence coverage | **8/8** | **8/8** |
| Path/type agreement | **8/8** | **8/8** |
| File blob SHA agreement | **7/7 matched** | Reference SHA from 7 file reads |
| Source commit | Same pinned `3777d139...` | Same pinned `3777d139...` |
| Task-specific destination access calls | **1** | **8** |
| Shared setup | 1 HEAD + 2 pinned doc reads | Same common setup |
| Body content of each linked file retrieved? | **No** | **Yes**, bounded first 8 lines for files |
| File target existence failure found? | **No** | **No** |

**Measured difference within this small batch:** 1 vs 8 destination-check calls, i.e. seven fewer requests for equal *path-existence* coverage. **Not measured:** total workflow time, latency, tokens, money, human effort, other request payload sizes, rate limits or large-repository behavior. Direct reads provide contents, which a Git tree does not; the two routes are only equivalent for checking path existence and basic blob identity, **not semantic link/content correctness**. Shared setup and document publication incur additional actions and must not be ignored in total resource accounting.

### Skill–Tool Fit, limitations and decision

- **Selected method/Skill:** Source-preserving repository link existence check; `NO_EXTRA_SKILL`.
- **Selected tool:** Existing GitHub Connector `fetch` to the Git tree for batch existence, and `fetch_file` only for source documents, content inspection, or independent spot-checks.
- **Tool access:** `CONNECTED_AND_OBSERVED` for these exact read actions. **Not** evidence every GitHub endpoint or session will behave the same.
- **Technical fit:** For **multiple paths within one small, untruncated repository snapshot** where only existence/type is required, tree enumeration avoids repeated per-file calls. Use direct fetch if there are too few paths to justify enumeration, the tree is truncated, source SHA/content is required or connector behavior changes.
- **Alternative not chosen:** Install a Markdown linter, create a new Skill, plugin or CI, or modify unrelated documents; none is needed to prove these eight path references exist.
- **Interpretation:** **`LINK_PATHS_PRESENT 8/8 / FILE_HASHES_AGREE 7/7 / NO_FIX_NEEDED`**. Reference-style Markdown links, fragments, remote URLs, link semantics and files outside the two source docs are **not checked**. The target documents concerning Multiverse are **read-only references**, not imported or merged AOM operating instructions.
- **Decision:** `ADOPT CONDITIONAL GUIDANCE` for AOM's GitHub batch-existence routing after this bounded field test. `NO_CHANGE` to source README/ROADMAP **content references**, because no broken target was found. AOM routing documentation may be augmented with this grounded choice rule.
- **Next learning:** Verify on a different real user-originated repository task, and compare measured end-to-end resource use before generalizing or assigning tokens/ROI improvement.

**Trial results were appended after the preregistered reads. Status: `BOTH_ROUTES_VERIFIED / SPECIFIC_CALL_SAVINGS_OBSERVED / GENERALIZATION_UNKNOWN`.**
