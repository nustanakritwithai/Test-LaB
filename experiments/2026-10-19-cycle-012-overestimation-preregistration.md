# AOM Test-LaB — Cycle 012 / Overestimation Safety — PRE-REGISTRATION

**Date:** 2026-10-19 (Asia/Bangkok)
**Question:** How can an AI Opportunity Manager reduce losses from **overestimated success probabilities** without blindly rejecting real opportunities in correctly calibrated or underestimated scenarios?

**Frozen before observations:** This document is committed via GitHub `create_file` **before** generating any new simulation outcomes. Its resulting GitHub commit SHA provides the deterministic test seed. The report is saved separately; this file must not be edited after creation.

**Evidence type:** Synthetic stress test of policy rules, **not** an investment strategy or real-world impact study.

## 1. Skill and tool selection

- **Selected skills:** forecast calibration, uncertainty-aware allocation, Bayesian belief updates, cumulative opportunity-cost monitoring, safe experimentation, preregistered paired evaluation.
- **Selected tools:** native model reasoning + disposable JavaScript calculations + existing GitHub Connector for preregistration, results and readback. No new Skill, Plugin, database, app, orchestrator or scheduler.
- **Alternative of doing nothing:** Preserve existing ONLINE; it performed better than STATIC in the prior OVERSTATED test but still trailed a simple QUICK baseline.
- **Alternative of adding more exploration:** Prior PROBE10 improved underestimation, but also increased losses in overestimation. This cycle prioritizes controlling overconfidence with explicit downside checks.

## 2. Fully declared synthetic environment

Each episode has fixed horizon `H` and advertised prior success probability `p`, seen by all policies.

- QUICK reward = `2H`, with **no information about unchosen investment success**.
- INVEST reward = `-2+4(H-1)` if successful or `-2+2(H-1)` if unsuccessful.
- Advantage over QUICK: success `2H-6`, failure `-4`.
- The decision rule at estimated probability `q`: INVEST iff `-4+2q(H-1)>0`. There are no partial investments; each action incurs its full payoff and any loss.
- A known deterministic QUICK reward makes *observed own investment regret vs QUICK* calculable without observing an unchosen latent outcome.
- For every policy, success/failure is observable **only if the policy invested**. A policy choosing QUICK learns nothing about this Bernoulli outcome.
- Policies cannot access `regime`, `p_true`, a future random draw, or another policy's private observation.

## 3. Eight policies frozen before random outcomes

All non-static Bayesian policies start **independent** per-cell priors `Beta(alpha=8p, beta=8(1-p))`, update `alpha += 1` after observed INVEST success and `beta += 1` after observed INVEST failure, **never** after QUICK.

1. `QUICK` — always QUICK (safe immediate-reward reference).
2. `STATIC` — original forecast `q=p`; never updates.
3. `ONLINE` — posterior mean `q=alpha/(alpha+beta)`; invests when expected advantage positive.
4. `LOWER` — one-sided normal-approximation conservative belief `q=max(0, mean - 1.28*sqrt(alpha*beta/((alpha+beta)^2*(alpha+beta+1))))`; invests if `-4+2q(H-1)>0`. This is a heuristic lower bound, **not a guaranteed confidence bound**.
5. `BUDGET` — ONLINE choice, but cumulative observed net difference from QUICK is tracked within the cell; once `cumulative_diff <= -8`, all later decisions in that cell are QUICK (a permanent stop for that cell). Stops cannot be reset by unobserved future latent outcomes.
6. `LOWER_BUDGET` — LOWER choice plus exactly the same stop rule.
7. `PROBE10` — ONLINE choice but if it otherwise would choose QUICK, force INVEST every 10th episode when `H>=5`; same payoff/risk as any INVEST and updates its own posterior.
8. `PROBE_BUDGET` — PROBE10 policy plus the permanent cumulative loss limit `-8`, including the cost of forced probes. Once stopped, *no* later forced probes occur.

No forced investment in `H=2`. A `BUDGET`-style policy that stops at/below -8 can finish **no lower than -12** net advantage vs QUICK within that cell, because the maximum downward one-investment jump is 4. This is a guarantee about the defined synthetic reward rules only, not capital in real markets.

## 4. Precommitted grid and random seed

Replications: `10`, with independent policy and prior states reset every cell/replication.

Nested fixed order:
1. replicate `rep = 0..9`
2. regime `CALIBRATED`, `OVERSTATED`, `UNDERSTATED`
3. horizon `H = 2, 5, 8`
4. public forecast `p = 0.25, 0.60, 0.80`
5. episode `t = 1..100`

True probability (hidden from policy decisions):
- `CALIBRATED`: `p_true=p`.
- `OVERSTATED`: `p_true=max(0.05,p-0.50)`.
- `UNDERSTATED`: `p_true=min(0.95,p+0.50)`.

Total: `10 × 3 × 3 × 3 × 100 = 27,000` environment draws and **216,000 paired policy outcomes**. Replications are different successive segments of one deterministic PRNG stream, **not proven independent randomness**.

After this file is committed, seed unsigned 32-bit `x` with the first eight hexadecimal digits of its **GitHub create commit SHA**. If zero, substitute `2463534242`. For exactly one draw per environment episode:
```javascript
x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
const u = (x >>> 0) / 4294967296;
const outcome = (u < p_true);
```
**Order of operations:** compute actions from each policy's own pre-episode state → generate environment draw → assign same latent success/failure to the paired reward calculations → update only those policies that invested. Save final xorshift32 state for replay.

## 5. Metrics and falsifiable questions fixed in advance

Primary for each regime:
- Sum of realized utility for all policies, and comparisons `LOWER - ONLINE`, `BUDGET - ONLINE`, `LOWER_BUDGET - ONLINE`, `PROBE_BUDGET - PROBE10`.
- Mean cumulative per-cell regret relative to QUICK and **worst (minimum) per-cell cumulative regret** for each policy.
- Number of investment decisions, stopped cells, and forced exploratory investments.

Secondary:
- Paired net differences per each replicate and distribution of sign (number of replicates with positive/negative outcomes).
- Opportunity cost in CALIBRATED/UNDERSTATED if conservative policies underinvest.
- Whether a cap on downside also prevents a beneficial later reversal within the same cell.

Specific hypotheses — **not guarantees**:
- H1: `BUDGET - ONLINE > 0` under OVERSTATED, because it halts harmful repeated investing.
- H2: `LOWER - ONLINE > 0` under OVERSTATED, potentially at a calibrated-opportunity cost.
- H3: `PROBE_BUDGET - PROBE10 > 0` under OVERSTATED, potentially preventing discoveries in UNDERSTATED.
- H4: `BUDGET` and `LOWER_BUDGET` and `PROBE_BUDGET` never drop below -12 cumulative regret **per stationary scenario cell**.

Acceptance checks:
- Exactly 27,000 environment random draws and 216,000 scored policy outcomes.
- 270 scenario cells of exactly 100 episodes.
- All policies decide before each draw; no hidden-world or other-policy observation leaks.
- All outcomes are identical across policies within each episode (common random numbers).
- Posterior changes only if that policy invested; initial prior effective sample size 8 each cell.
- QUICK never invests; no policy invests in H=2.
- Each cap policy stops permanently once cumulative regret reaches or falls below -8.
- All sums and regret-vs-QUICK calculations reconcile.
- Compute and report when conservative safeguards do **not** improve results.
- Report all regimes even though user currently wants improvement under OVERSTATED.

## 6. Deliverable and non-claims

Write results to `experiments/2026-10-19-cycle-012-overestimation-results.md`, including summaries per regime, replicate-wise outcomes, selected checks, code or pseudocode sufficient to replay, GitHub preregistration seed, and final readback. **Do not claim improvement in real opportunity value, financial ROI or general model accuracy.** The paper/test repository is public; no confidential analytics or account information.

If GitHub is unavailable, skip and report inability; do not create a new connector or retry the broken connection. All external business and website systems remain untouched.
