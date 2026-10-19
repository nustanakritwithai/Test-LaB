# Test-LaB — First Real-World Field Pilot / Hybrid Mind Facebook Distribution

**Date:** 2026-10-19 (Asia/Bangkok)  
**Protocol status:** `SCENARIO SELECTED / REAL ANALYTICS PREFLIGHT PERFORMED / PUBLISHING NOT AUTHORIZED / FIELD OUTCOMES PENDING`  
**World Model:** [Continuous Multiverse v4](../world-model/CONTINUOUS_MULTIVERSE_v4.md)  
**Objective:** Improve visits from Facebook to already-published Hybrid Mind articles by choosing better, evidence-supported distribution actions, rather than increasing content volume blindly.

## 1. Why this is the first field pilot

- External **Metricool** connector already provides Facebook post reach and link-click metrics, while the existing editorial/publishing team produces content for Hybrid Mind.
- There are observed, real posts linking to `hybridmind.online`. The existing connected Facebook brand label is not identical to the site brand, so **page identity / ownership mapping must be verified before any scheduling change**.
- The private preflight revealed **sparse reach and click observations**. This makes a "best topic by a few clicks" ranking scientifically weak. The first opportunity is to validate measurement and test reach, before optimizing link clicks per exposure.
- We can reuse the existing publishing workflow and analytics connector. **Do not create an agent framework, plugin, database, service, or new scheduler.**
- Avoid touching WordPress content, Facebook posts, schedules, or ongoing team assignments in this selection/preflight phase.

**Privacy:** Do not copy Metricool brand/account identifiers, individual post analytics, private traffic reports or other nonpublic metrics to this public GitHub repository. Store only the experimental protocol, source categories, qualitative judgments and an appropriately redacted status. Any precise private measurements stay in connected analytics/user-approved private storage.

## 2. Selection: real decision space

| Option | Positive case | Downside / uncertainty | Current decision |
|---|---|---|---|
| A. Keep producing/posts at existing cadence (BASELINE) | Zero disruption | May continue low reach; no exploration | CONTROL |
| B. Rank articles from sparse clicks and promote the apparent "winner" now | Quick | Winner's curse / noise; current denominator too small | DO NOT SELECT YET |
| C. Publish more frequently without controlled measurement | More opportunities to be seen | Potential oversupply, attribution impossible | DEFER |
| **D. Validate comparable observation windows, then test recommended distribution time vs usual time on matched posts** | Low additional infrastructure; reversible for future slots; directly targets reach | Platform noise, audience changes, timing/content confounds, still limited power | **SELECT FOR PILOT, pending scheduling authorization** |
| E. Change Facebook page/admin settings or paid distribution | Could change delivery dramatically | External account mutation/cost; not necessary for first safe test | OUT OF SCOPE |

The selected immediate action is **READ-ONLY METRIC PREFLIGHT**, not a post publication. If the data fails quality gates, choose `WAIT / IMPROVE OBSERVABILITY` rather than fabricate an uplift.

## 3. Outcome and measurement contract

**Primary actual-world metric (first pilot):** organic/unpaid Facebook post reach recorded at the **same 72-hour age** after publication, reported per post and by matched arm. Verify whether Metricool's returned reach field reflects settled, same-age figures. Record distribution (median, count of zeros, range), not just a pooled mean.

**Secondary:** link clicks and linked Hybrid Mind article URL validity. If sufficient reach exists later, compare link clicks per unit post reach with explicit ambiguity (not unique visitors or conversion rate). Record both absolute total clicks and per-post clicks. Track impressions separately if available. Distinguish Facebook link clicks from verified website sessions.

**Data readiness gates:**
1. Confirm the connected Metricool brand really represents the intended Facebook page and content distribution process.
2. Verify source, post ID, publication time, content type, link target, and consistent 72-hour time-window values.
3. Record missing fields and zeros distinctly; do not turn unavailable figures into zeros.
4. Precommit comparison logic before the operator schedules future test posts.
5. If observations are too sparse to distinguish arms, return `INCONCLUSIVE`, not a winning strategy.

**Guardrails:** No invented probabilities, effect sizes, returns, or causation from current observational metrics. No private analytics in public GitHub. No paid ads, publishing, deleting, changing a live post, or modifying existing schedules without explicit action approval and team coordination.

## 4. Experimental comparison (conditional on operational approval)

Two arms using the same existing topic/editorial approval process and comparable format/quality of post:

- **CONTROL:** the editorial team's normal approved publication time.
- **MULTIVERSE-TIMING:** a future slot selected from the existing Metricool audience-activity time recommendations, avoiding slots that overlap other scheduled posts.

Where operator agrees, match posts by topic/format/weekday and randomize the arm within each comparable pair *before* any results are visible. Keep content, hook assets, media type, and weekly total publishing volume as stable as operationally possible. If randomization cannot be implemented, label the study **OBSERVATIONAL**, not randomized causal evidence.

**Pilot target:** At least 12 matched pairs, or until the operator-approved allocation is exhausted. This target is a workload checkpoint, **not** a power calculation or guarantee of a statistically meaningful effect. Score post results at equal age; if reach/click counts are too low, conclude feasibility/measurement only.

Pre-register:
- baseline strategy and metric collection settings;
- assignment plan / randomization seed after commitment, if feasible;
- timestamped expected ranking without seeing future post outcomes;
- what observations at S2 would make the planner abandon, repeat or revise the plan.

## 5. Every-point v4 decision rules

### S1 — Current observation & data quality
Read authorized historical Metricool data, assess what is truly measured, check page identity; enumerate control/time-slot/content-format/do-nothing branches. Initial decision: **measurement readiness** is required before a performance ranking.

### S2 — Updated facts and renewed universe
After a verified batch of comparable post outcomes at the same age:
- reconstruct post-level reach, clicks, uncertainty and missingness;
- compare forecasts with the actual outcome;
- update a distributional belief *only from observations available to the policy* (no peeking at future posts);
- regenerate feasible alternative actions, including keep current slot, switch timing, increase observation sample, or stop;
- recursively simulate all declared next-step observation classes within a finite horizon;
- choose the next authorized test / no-change action only after examining full paths.

### S3 and each later nonterminal point
Record real observation with provenance; re-root a fresh v4 planning tree with a new horizon and updated uncertainty. If no new observations, return `WAIT_FOR_OBSERVATION`. If results contradict the declared model, return `MODEL_MISS`. Branch-local hypothetical learning stays separate from the real record.

## 6. Success / failure definitions

- **Verified now:** existing analytics tools can return live account-linked Facebook post metrics and publicly visible site links; selected scenario is concrete, relevant and testable.
- **Not verified now:** Facebook page identity mapping, settled 72-hour metric quality, exact opportunity payoff, ability to improve reach or clicks, or causal value of the timing suggestion.
- **Field pilot PASS:** precommitted comparison, correct/no-leakage forecasting, post-level and timing readback, same-age scoring, honest uncertainty, model reroot after observation.
- **Field pilot INCONCLUSIVE:** data too sparse, unable to match posts, platform zero/missing inconsistency, intervention not authorized, exposure not sufficient.
- **FIELD ROI/UPLIFT VERIFIED:** only after a credibly controlled comparison supports such a claim; otherwise `UNVERIFIED`.

## 7. Tool and permission gates

- **Methods/skills:** causal inference basics, measurement quality, matched comparison, sequential decision policy, value of information, calibration and restraint.
- **Native assistant capabilities:** reason about trade-offs, preserve preregistration, draft decision checkpoints.
- **Existing connected tools:** Metricool read-only analytics and audience-time suggestion; GitHub file history for **sanitized** protocol/decisions; optional public-site read-only checks.
- **Not required:** additional custom Skill, dashboard, database, agent, application, cron or paid service.
- **External write boundary:** Do not change content, page settings, Meta posts, WordPress site or existing team schedule without explicit authorization. Existing editorial team retains publishing ownership.

**Next bounded operation when requested:** validate identity/measurement completeness, inspect non-sensitive candidate schedule slots, and freeze a controlled or clearly observational comparison before any live posting change. The study remains on-demand, not background automation.
