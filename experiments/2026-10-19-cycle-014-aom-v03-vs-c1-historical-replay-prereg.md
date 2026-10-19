# AOM Test-LaB — Cycle 014: AOM V0.3 vs AOM V0.3 + Conditional Multiverse C1

**Date prepared:** 2026-10-19 (Asia/Bangkok)  
**Status:** `PRE-REGISTERED PROTOCOL ONLY — NO REPLAY SCORED`  
**Decision:** `TEST C1`, keep V0.3 unchanged. This is a read-only evaluation. **Do not** install or create a Skill, Plugin, agent framework, scheduler, or app.  
**Purpose:** Measure *decision quality per unit of information/effort* rather than merely compliance with Markdown structures.

## 0. Sources and strict boundaries

- **Original baseline:** `AI_Opportunity_Manager_V0.3.md` in the user's **private Library** (255 lines, verified available during planning). **Do not copy that private original into this public repo.** Its six-step loop, no-action option, evidence labels and Skill–Tool Fit rules define arm A.
- **Optional intervention:** [C1 candidate](../world-model/AOM_V03_MULTIVERSE_LAYER_CANDIDATE.md), based on [Continuous Multiverse v4](../world-model/CONTINUOUS_MULTIVERSE_v4.md). Arm B = full original AOM rules **plus** C1, not a replacement, and C1 is activated only where its complexity gate passes.
- **Reference review:** [Cycle 013](2026-10-19-cycle-013-aom-markdown-multiverse-review.md); 48/48 checks were limited to structure and deterministic policy fixtures, **not behavioral improvement**.
- **Live-system prohibition:** Read-only use of **public** GitHub records. Do not touch Hybrid Mind, WordPress, Facebook, Metricool, production workflows or other users' repositories. Write only sanitized protocol/outcome Markdown to Test-LaB. Do not start an automation.
- **Candidate public source repositories selected before reading future outcomes:** `astral-sh/uv` and `astral-sh/ruff`, both public on `main`. No historical commit lists, future counts or scoring-period results were opened before this registration.

## 1. A real-historical, limited proxy choice

**Decision question at each point:** An analyst has time to inspect only one of these two projects for the next 14 days. Given public information available at the cutoff, **which project appears likelier to have more GitHub main-branch commit activity in the next 14 days?** A third response, `ABSTAIN/WAIT`, is permitted when the evidence is inadequate.

**Important limitation:** Future main-branch commit count is an activity *proxy*, not business ROI, not developer usefulness, not software quality, and not user value. Neither approach can alter the historical events.

**Both arms see the exact same objective, historical cutoff, evidence snapshot, repository choice set, constraints and information budget.** Each arm is instructed to answer using its respective existing Markdown. The assistant must not introduce a deliberately weak alternative (e.g. 'always choose uv').

## 2. Frozen historical windows (UTC)

The six decision cutoffs are pre-selected, spaced 14 days apart:

| Point | Information cutoff (exclusive) | Historical lookback | Scoring interval |
|---|---|---|---|
| S1 | 2025-04-07 00:00 UTC | preceding 28 days | 2025-04-07 through 2025-04-21 (end exclusive) |
| S2 | 2025-04-21 00:00 UTC | preceding 28 days | 2025-04-21 through 2025-05-05 |
| S3 | 2025-05-05 00:00 UTC | preceding 28 days | 2025-05-05 through 2025-05-19 |
| S4 | 2025-05-19 00:00 UTC | preceding 28 days | 2025-05-19 through 2025-06-02 |
| S5 | 2025-06-02 00:00 UTC | preceding 28 days | 2025-06-02 through 2025-06-16 |
| S6 | 2025-06-16 00:00 UTC | preceding 28 days | 2025-06-16 through 2025-06-30 |

Do not change cutoffs, repositories or evaluation criteria after observing target-window results merely to obtain a positive score.

## 3. Data availability and leakage gates

1. Prior to scoring, check whether the GitHub API can reconstruct **as-of-cutoff** main-branch history, not just today's main branch filtered by a commit timestamp. **Today's main branch with an `until` query alone may have hindsight leakage** due to later merges, rewritten history or backdated commits. Require a defensible historical ref/first-parent history and timestamp provenance, or mark the point `UNVERIFIABLE`.
2. Freeze and save cutoff-eligible evidence (public SHA, provenance, timestamp and source URL). Do not expose any commit message, release annotation, PR state or other field that was created/edited after the cutoff.
3. Reject incomplete API pagination, unavailable reconstructed refs, missing evidence timestamps and ambiguity in committer/merge timing instead of silently treating missing data as zero activity.
4. If data cannot be reconstructed faithfully with existing GitHub tools and a reasonable call budget, return `UNVERIFIABLE` and stop. **Do not build a scraper or repair a failing connector.**
5. A model pretrained after 2025 might already know historical events. This is an **historical replay, not a prospective blind experiment**; never claim this risk is eliminated just because tools enforce date cutoffs.

## 4. Equal information and comparable effort

- At each eligible point, use a shared, frozen **lookback snapshot for uv and ruff** from no later than the cutoff. Count 14-day and 28-day trailing activity; both arms receive identical factual data. Each arm may reason from the same evidence but may not request post-cutoff data.
- Allocate the **same tool-read budget** to obtain the snapshot for both arms. Track number of reads, context size and wall time where instrumented; otherwise cost `UNKNOWN`. C1 cannot silently fetch extra history for free.
- Arm A: use **original V0.3**. Run DISCOVER→VALIDATE→COMPARE→ALLOCATE, Skill–Tool Gate, return `uv/ruff/ABSTAIN`, what observation would change choice, and actual uncertainty.
- Arm B: use **original V0.3 + C1**, conditional activation only for multi-stage changes. Evaluate bounded paths, value of future observations, and re-root at the next observed point. Choose `uv/ruff/ABSTAIN` with a concise explanation.
- Ask for a numeric probability **only when defensibly derived from pre-cutoff data**. Otherwise label `UNKNOWN`; never manufacture numbers for convenient Brier scores.
- Freeze both choices in Test-LaB **before** fetching scoring-period observations for that point. Save policy name, model/version, cutoff and evidence source, predicted choice, confidence basis, tool-read count and expected decision-reversal condition.
- If independent model sessions are not available, explicitly state that the two arms were evaluated serially by the same model, so the result is **not independent/blind**. Do not silently upgrade the claim.

## 5. Predeclared outcomes and scoring

**Primary outcome metric:** *realized choice regret* in terms of number of main-branch commits over the next 14 days:
```
if choice in {uv,ruff}:
  regret = max(actual_next14_uv, actual_next14_ruff) - actual_next14_chosen
else:
  mark ABSTAIN; report separate selection coverage and opportunity foregone.
```
Lower regret at the same comparable read budget is preferable, but this is only the *activity proxy* decision objective.

**Secondary metrics:**
- correct choice / incorrect choice / tie; report `ABSTAIN` separately rather than awarding a free victory for refusal;
- fraction of cases where both AOM and C1 take different actions and whether those differences help;
- as new **observed** outcomes appear at S2/S3/etc., did the decision change appropriately? Distinguish replan responsiveness from hindsight;
- calibration/Brier score **only if** a defensible binary probability forecast `P(next14_uv > next14_ruff)` was frozen in advance for both arms. Otherwise `NOT SCORED`;
- reading cost, number of tool calls, human corrections, missing-data rates, and instances of overconfident unfounded claims;
- outcome uncertainty and any non-identifiable counterfactual real-world value.

**Predeclared adoption gate:** C1 is worth keeping only if it improves at least one decision-quality measure on comparable evaluated cases **without material regressions** in leakage control, response cost, factual integrity or safety. Six cutoffs are an **exploratory feasibility pilot**, too few for a strong performance/generalization claim. A tie or noisy improvement does not justify adding C1 by default.

## 6. Point-to-point Multiverse rules

At S1 both policies use only cutoff-eligible information. For C1 the universe branches into `uv`, `ruff` and `WAIT`; its simulated outcomes are **hypotheses only**, not factual evidence.

After the previous scoring interval ends, reveal **only that interval's legitimate observed event**. At S2:
- add the realized event once with provenance;
- compare previous forecasts against the revealed result;
- re-assess budget and available alternatives;
- run V0.3 anew for A, and conditionally **re-root a new bounded C1 tree** for B;
- do not let an alternate simulated branch update the factual beliefs of either arm.

Repeat at S3–S6. If an outcome is unavailable return `WAIT_FOR_OBSERVATION`, and if observed outcomes contradict the declared model return `MODEL_MISS` instead of inventing an adjustment.

## 7. Acceptable final verdicts

- `REPLAY_PASS / C1_BETTER_ON_PROXY`: only when source reconstruction is defensible, predictions were frozen before later outcomes were fetched, and the measured difference is grounded; still exploratory historical evidence.
- `REPLAY_PASS / SAME_QUALITY`: neither approach meaningfully improves the result; keep simpler V0.3.
- `REPLAY_PASS / C1_WORSE`: reject C1 for this task.
- `INCONCLUSIVE`: sample too small, tools/data mismatched, overlap contamination or evaluation noise.
- `UNVERIFIABLE`: cannot reconstruct as-of-cutoff history or guarantee timing provenance.
- `STOP_FOR_APPROVAL`: necessary next action affects a non-test repository or another person's system. No such external writes are authorized here.

**Do not equate any Markdown structural checks, GitHub write successes or simulation fixtures with proof of better real-world choice outcomes.**

## 8. Next action

**Protocol only on this turn:** Read back this preregistration from GitHub; do **not** fetch scoring-period outcomes before both arms' time-frozen decisions are prepared. Begin replay only on a new manual instruction with enough eligible evidence. Original V0.3, Multiverse v4 and C1 remain unchanged.
