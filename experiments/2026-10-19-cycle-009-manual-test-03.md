# AOM Test-LaB — Cycle 009 / Manual Test 03

**Date:** 2026-10-19 (Asia/Bangkok)  
**Experiment:** Can AOM select a better existing information-retrieval route under a strictly equal tool-call budget?  
**Scope:** Public GitHub repo `nustanakritwithai/Test-LaB`, read-only experiment inputs; add this Markdown report only.  
**Status at authorship:** `MATCHED-BUDGET RETRIEVAL PASS / REAL-WORLD BUSINESS UPLIFT UNVERIFIED`.

## 1. Objective and baseline

**User-facing test question:** "Find **all** Markdown experiment reports currently in the `experiments/` folder and identify whether the multiverse world-model research is represented."

This is a real answer-quality task using a live repository, not a synthetic return table.

**Equal budget:** one GitHub read request per competing route. The truth oracle is a separate verification request and is not available to either route for its answer.

- **Baseline / conventional route:** Fetch `README.md` and list Markdown experiment paths explicitly linked there.
- **AOM / opportunity-based route:** Instead of treating the README as exhaustive, select GitHub's native `contents/experiments` endpoint directly and list all Markdown files found.
- **Oracle:** Independently fetch the repo's recursive `main` Git tree, selecting `experiments/*.md` blobs.

**Pre-declared acceptance:** The better route should locate more real archived files with no false filenames, and identify the multiverse record, within the same one-request budget. The results must be cross-checked against the independent Git tree.

**Limitation disclosed up front:** The route was chosen after inspecting the repository during preflight; this is a transparent *case demonstration*, not a blind or randomized benchmark. Another question or an additional GitHub request could change the result.

## 2. Capability / tool choice

- **Method:** Evidence inventory and opportunity-cost reasoning; choose an information source with maximum scope per request.
- **Native model:** Identify the right retrieval target, compare paths, interpret tool output.
- **Existing tool:** GitHub Connector `fetch_file` for baseline and GitHub Connector `fetch` for AOM and the separate oracle.
- **New Skill, Plugin, script, database, or agent framework:** Not needed.
- **Fallback:** If GitHub access fails, mark the route blocked and do not invent repository state or repeatedly repair its connection.

## 3. Actual result

Independent recursive-tree truth at test time (four items):

1. `experiments/2026-10-19-cycle-006.md`
2. `experiments/2026-10-19-cycle-007-manual-control.md`
3. `experiments/2026-10-19-cycle-008-manual-test-02.md`
4. `experiments/2026-10-19-cycle-008-multiverse-world-model.md`

| Measure | README-only baseline | AOM's native directory route |
|---|---:|---:|
| GitHub read requests in the paired test | **1** | **1** |
| Correct experiment file paths surfaced | 1 | 4 |
| Total existing files independently verified | 4 | 4 |
| Recall (all experiments) | **1/4 = 25%** | **4/4 = 100%** |
| Fabricated file paths | 0 | 0 |
| Multiverse World Model file surfaced | No | Yes |
| Duplicate Cycle 008 labels detectable | Not from listed README examples | Yes, two distinct files |

**Observed value:** AOM's first retrieval choice exposed all experiment records at the same *measured unit of tool requests* and discovered an additional research direction that the README's manually curated example did not list.

**Important nuance:** The README contains a working link to the experiment directory, so a *two-request* baseline (README then follow link) can also achieve 100% recall. The observed advantage is **first-request coverage under a strict one-request budget**, not unlimited-budget superiority.

## 4. Verify vs infer

- **FACT:** The GitHub recursive tree reported four experiment Markdown blobs; each has a real path.
- **FACT:** The old README explicitly linked one Cycle 006 Markdown report while also providing a directory link.
- **FACT:** The chosen GitHub directory endpoint returned four report filenames.
- **FACT:** A separate file named `cycle-008-multiverse-world-model.md` exists in the repository. Its own documentation reports 15/15 simulated fixture assertions; this is not verification of a real-world decision engine.
- **INFERENCE:** For inventory-style requests, starting with the canonical directory rather than relying on a curated README is generally a better retrieval strategy under tight call budgets.
- **UNKNOWN:** Exact end-to-end latency, token expense, financial cost, and manual attention savings were not instrumented.
- **NOT PROVEN:** AOM has increased business revenue, user satisfaction, or real-world opportunity value.

## 5. Decision / opportunity alternatives

| Next direction | Value hypothesis | Main risk | Decision |
|---|---|---|---|
| A. Add another summary-only progress report | Documents work | Repeats internal bookkeeping, no tested utility gain | DROP |
| **B. Run this matched-budget live retrieval test** | Demonstrate whether tool selection improves correctness per call | Narrow scope; may not transfer to other tasks | **DO — SELECTED** |
| C. Build a custom repository index/search program | More UI/control | Existing native GitHub directory search is already adequate | DROP |
| D. Skip experiment and wait | Zero immediate cost | No evidence whether AOM route choice matters | WATCH |
| E. Roll out real changes to Hybrid Mind | Could lead to downstream business value | Not authorized by this sandbox round, hard to isolate causal effect | DEFER |

## 6. Repeatability / next experiment

This is the **third manual AOM test**, corresponding to Cycle 009 of the larger recorded sequence. It shows a measurable correctness gain for one task, **not** that AOM has already consistently selected better *commercial* opportunities.

For a stronger next test, select a fresh externally checkable objective **before** looking at the answer, freeze candidate routes, cap resources equally, and grade against a separate truth source. Vary the task so directory-first is not guaranteed to win. If the user authorizes a reversible real-world intervention, compare a measurable downstream outcome against a genuine control or a credible baseline. Keep account analytics private rather than copying them into this public repo.

## 7. Post-write verification

Pending GitHub write and independent readback at authorship. A post-write check should confirm:
1. This report can be fetched by exact path.
2. This report appears in the `experiments/` archive without any README index change.
3. The matched-budget table and limitations are present.

**Verdict:** `MATCHED-BUDGET EVIDENCE RETRIEVAL PASS; BUSINESS UPLIFT UNKNOWN`.
