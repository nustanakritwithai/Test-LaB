# AI Opportunity Manager — Markdown-First Development Roadmap

> **Status:** Proposed next-step plan (2026-10-19, Asia/Bangkok).  
> **Architecture decision:** **Remain Markdown-first. Do not convert AOM into a Skill, Plugin, autonomous app, orchestration framework, or database unless a verified missing capability and clear positive net benefit justify it.**  
> **Working repository:** [Test-LaB](https://github.com/nustanakritwithai/Test-LaB)  
> **Control:** Manual, on-demand. No recurring automation enabled by this roadmap.

## 1. Objective and current verified baseline

**Primary objective:** Increase the quality of choosing the *next opportunity*, not the number of generated artifacts or complexity of AI infrastructure. Measure actual decision utility against a credible alternative and count human effort, tool calls, time, money and risk where measurable.

**Existing reusable capabilities — do not rebuild:**

- [README.md](README.md): Opportunity-first, evidence-first, no-action alternative, tool-selection gate, permission boundary, transparent evidence labels.
- [Continuous Multiverse v4](world-model/CONTINUOUS_MULTIVERSE_v4.md): Every nonterminal point is a new Decision Point / Universe Root / Learning Point. Re-root after a **verified** new observation; simulation is never mistaken for evidence.
- [Finite reference tests](tests/continuous_multiverse_v4.js): 41/41 synthetic logic fixtures (per prior [experiment](experiments/2026-10-19-cycle-012-continuous-multiverse.md)). A finite toy model is **not** real-world forecasting accuracy.
- [Historical AOM experiment archive](experiments/): tool routing, indexing, matched-budget information retrieval, finite non-myopic planning, online posterior learning, probing and overestimation guardrails. These mostly test controlled logic rather than business value.
- [Cancelled Hybrid Mind Facebook field pilot](experiments/2026-10-19-field-pilot-cancelled-safe-github-replay.md): **DO NOT** post, reschedule, test-publish or alter Hybrid Mind, Facebook, WordPress, Metricool or the production team workflow. The replacement is read-only public GitHub history replay.

**Recent explicit resource-allocation decision:** Avoid deploying always-on conservative guardrails. In the synthetic OVERSTATED regime the combined guard helped ONLINE only modestly, while it caused substantially larger simulated opportunity losses in CALIBRATED and UNDERSTATED regimes; treating that as a new default would be unjustified. Preserve the findings as evidence; do not build or extend that feature.

**Current gap:** There is no credible repeated independent field evidence yet that AOM chooses *economically higher-value real opportunities* than a strong baseline. Predictive accuracy, real resource savings and real-world opportunity ROI are UNKNOWN until measured.

## 2. Opportunity ranking (why this order)

| Rank | Opportunity | Value / evidence gained | Cost and risk | Decision |
|---|---|---|---|---|
| **P1** | Public real-event historical replay with strict time cutoffs | Tests temporal information discipline, tool selection, forecasts against real recorded events with no production side effects | Small GitHub read budget; historical data leakage must be controlled | **DO NEXT** |
| **P2** | On-demand decision-answer benchmark from varied concrete user problems | Tests whether decisions are actionable and grounded, not just mathematically internally consistent | Needs independent case labels / user feedback where possible | **TEST** |
| **P3** | Replan after actual, unique observations; quality measurement | Tests continuity and calibration rather than merely writing forecasts | Outcomes can be slow and ambiguous | **TEST after evidence available** |
| **P4** | Measure net incremental value and implement stop conditions | Avoids optimizing low-value improvements; observes total opportunity cost | Attribution and human-effort measurement may be limited | **DO across all stages** |
| **P5** | Reversible field decision under separate explicit authorization | Necessary eventually for real causal claims | Real-world consequences, potential project disruption | **WAIT** |
| — | Convert to Skill / write an agent framework / automate everything | Convenience only; quality or payoff advantage not established | Creation, maintenance and extra control surface | **DROP FOR NOW** |

AOM must retain the **DO NOTHING / KEEP BASELINE** option for every consequential decision. Do not generate probability estimates just to rank choices when likelihoods are not grounded.

## 3. P1 — Real public historical decision replay (first executable experiment)

**Research question:** Given only information genuinely available at decision time `S1`, does an adaptive, evidence-aware policy make better *verifiable* forecasting and information-acquisition choices than a credible fixed baseline, under equal resource budgets?

### Before touching test-period results

1. Select one or two **unrelated public open-source GitHub repositories**, not Test-LaB and not Hybrid Mind. Read via existing GitHub Connector only.
2. Declare a historical decision timestamp, eligible event stream (e.g., dated pull-request merges, issue/PR timeline events, releases), forecast target, unit of evaluation, and a fixed number of decision points. Exclude events without reconstructible pre-cutoff state.
3. Define a credible comparison strategy **before scoring**: e.g., a base-rate persistence forecast, a fixed information-source strategy and a no-extra-search choice. Do not deliberately use a weak strawman.
4. Pre-register the permitted fields **as of each timestamp**, information requests budget per strategy, missing-data handling, abstention, Brier scoring for binary predictions where probabilities are grounded, and decision-utility measures if and only if outcomes truly support them. Record the protocol in a sanitized Markdown file **before** revealing withheld outcomes.
5. Treat retrospective snapshots with fields updated after the cutoff as contaminated. The model's pretraining may also encode widely known historic outcomes; label this a **historical replay**, not a perfect prospective blind trial.
6. No external writes, no installation, no invented return values. If reliable timestamped event reconstruction fails, report `UNVERIFIABLE` and stop this scenario rather than relaxing the rule after seeing outcomes.

### Execution and acceptance

- Run the **fixed baseline** and AOM with the **same available evidence timestamp and comparable tool-call budget**.
- Freeze each predicted event/action before revealing the later historical event, then score; if tool effects on the external world cannot be observed, score predictive/information quality only, not business revenue.
- At every next point reconstruct the observed history, revise belief using only legitimate observations, and re-root v4. Return `WAIT_FOR_OBSERVATION` when missing, `MODEL_MISS` when the observation violates the declared model.
- Publish only **public, non-sensitive** source URLs, timestamped predictions, score tables, failures and reproducibility information.
- **PASS** only for reproducible source reconstruction, no look-ahead, valid paired comparison, correct accounting and evidence-backed scoring; improvements must be evaluated separately. If scoring data are too thin, outcome is `INCONCLUSIVE`, not victory.

**Deliverable:** One preregistration MD + one result MD in `experiments/` (only after each is justified by a real test). No dashboard, cron, new repository or custom data service.

## 4. P2 — Real decision-answer quality, without additional infrastructure

Use a small, varied set of on-demand **actual choice questions** (not just internally invented positive examples): selecting work to do, comparing existing tools, allocating limited attention, evaluating investment in an improvement, and deciding to stop.

AOM response contract (keep compact for the user, detailed evidence only when warranted):

1. **Goal + constraints + baseline** — what matters, what happens if we do nothing, resource budget.
2. **Feasible choices** — at least the named options and a meaningful alternative/no-action when applicable; exclude forbidden actions.
3. **Evidence + uncertainty** — FACT / INFERENCE / HYPOTHESIS / UNKNOWN; sources when material.
4. **Opportunity cost + time horizon** — total *incremental* benefit/cost including delays, tool overhead and maintenance; avoid arbitrary weights or fabricated money numbers.
5. **Skill–Tool selection** — native capability → existing connected Skills/Plugins/SaaS → build last; skip failed tool rather than debugging by default.
6. **Decision** — `DO / TEST / WATCH / DROP`, exactly what action now, why options were declined and **what evidence would change the choice**.
7. **If executed** — read back the destination, report actual changes and uncertainty, not only an AI success statement.

**Benchmark:** Compare against an independently stated conventional answer under the same information budget; note contradictions, hallucinated numbers, changes in user evaluation, actual external verification, tool calls and human corrections. A convenient rubric is not a substitute for measured real value.

**Gate:** Preserve only changes that improve at least one meaningful observed measure without excessive regressions or hidden costs. No new complexity just to make the answer longer.

## 5. P3 — Learn and re-root only when evidence arrives

- Record **forecast before outcome** and its timestamp and provenance. Do not update a real-world belief with a virtual future.
- Record observed changes at S2, including unexpected events; distinguish `OBSERVED_REALITY` from `OBSERVED_FIXTURE`.
- Rebuild the next **bounded** opportunity tree under current costs, remaining budget, tool availability, permissions and user objective. Do not automatically continue yesterday's plan.
- Track whether changing evidence changed AOM's recommended action and whether the change was justified by the evidence.
- Score calibration on temporally held-out cases if sample size permits; avoid treating in-sample fixture passes as proof of generalization.
- Never replay the same observation as two independent outcomes. If there are no new observations, stop and wait for user input.

**Gate:** The model demonstrates at least a few independently verifiable point-to-point changes with complete decision/observation trails before more sophisticated calibration methods are considered. If not, debug the *evidence quality*, not the architecture.

## 6. P4 — Opportunity value and stop/continue gate

For any proposal to add a feature, Skill, workflow, agent or research stream, evaluate:

```text
Incremental value (best grounded range)
  = incremental outcome vs credible baseline
  - money/time/tool/attention cost
  - maintenance + risk + displaced opportunities
```

Report `UNKNOWN` when the outcome or counterfactual is unobservable. Do not express synthetic utility as real THB.

- **DO**: Clear objective, grounded potential benefit, within risk/permission/resource limits, worthwhile versus best alternative.
- **TEST**: Reversible, cheap test may meaningfully change the decision; predefine its evidence threshold.
- **WATCH**: Reasonable future hinge exists, but current action has low incremental value or the evidence is not ready; *no background watcher is created automatically*.
- **DROP**: Benefits are too small versus ongoing cost or a strong alternative dominates; no sunk-cost escalation.

**Stop conditions:** Enough evidence that expected upside does not cover total downside/opportunity cost; repeatable poor comparative quality; test period exceeded available budget; missing source reliability; model-miss; or user-imposed constraint. Stop is an acceptable final result, not failure.

## 7. P5 — Real-world limited intervention only after approval

After P1–P3 show credible predictive and decision-quality evidence, optionally propose a **separate low-impact, reversible, explicitly authorized** action in an appropriate sandbox. Declare controls, time window, instrumentation, rollback and destination readback first.

**Explicit exclusion:** Do not revive the cancelled Hybrid Mind/Facebook/Metricool/WordPress timing pilot, publish posts, mutate production content, or interfere with other agents and their running operations under this roadmap. Future changes would require a fresh, separate user instruction and a new scope.

If no safe comparable field intervention is available, remain in read-only mode and state that business uplift is still **UNVERIFIED**. Do not build software as a substitute for outcome evidence.

## 8. Minimal file architecture and version ownership

- **README.md:** How to start + operating principles. Do not maintain a manual per-experiment index.
- **world-model/CONTINUOUS_MULTIVERSE_v4.md:** Canonical **decision/learning logic**; do not copy and fork its rule text into a second competing operating document.
- **ROADMAP.md:** Priorities and acceptance gates only (this document); not an implementation of another policy engine.
- **experiments/:** Each warranted experiment's pre-registration + results + verifiable outcome status.
- **tests/continuous_multiverse_v4.js:** Existing narrow fixture suite. Modify only if a testable defect or real evidence warrants it; it is not a new app.

Use GitHub history to trace changes. Keep public documents free of credentials, private analytics, personally identifying data, unpublished work and fabricated results. When in doubt about publishability, keep details in the private conversation instead.

## 9. Immediate next manually commanded run

**Proposed next task:** `P1 / Historical Replay — protocol only`.

1. Discover suitable existing public GitHub event sources read-only.
2. Choose an explicit historical cutoff and valid later evaluation horizon **without opening future outcomes**.
3. Freeze baseline, candidate AOM policy, tool-call cap and scoring rules in a pre-registration MD.
4. Stop. On the user's next command, run the actual blinded-as-feasible replay, record limitations and read back the report from GitHub.
5. If the dataset cannot be reconstructed faithfully, mark `UNVERIFIABLE`, select another existing source only after documenting why, and avoid repetitive tool troubleshooting.

**No dates, background scheduling, commercial writes or unapproved operations are initiated by the roadmap.**

## 10. Roadmap success definition

This roadmap succeeds **not** when MD files multiply, but when AOM repeatedly gives an evidence-backed, comparable choice with sensible opportunity cost; learns from new genuinely observed information; rejects low-value development; and documents what is and is not proven.

**Current architectural decision:** `MD = DO` / `NEW SKILL = WATCH` / `NEW FRAMEWORK = DROP` / `PRODUCTION MUTATION = OUT OF SCOPE`.
