# AI Opportunity Manager — Cycle 011 / Manual Test 05 — PRE-REGISTERED PROTOCOL

**Date:** 2026-10-19, Asia/Bangkok  
**Challenge:** Can AOM learn whether an opportunity forecast is too optimistic or too pessimistic from *previously observed action outcomes*, and improve its future resource allocation without accessing hidden counterfactual results?

**Critical rule:** This protocol is committed to GitHub **before drawing any outcomes**. Use this file's GitHub `create_file` commit SHA as the reproducible random seed. Do not edit this preregistration after its creation. The actual results belong in a separate report.

**Scope:** Purely synthetic controlled economic-opportunity environment. Neither a live market forecast nor an experiment on Hybrid Mind or real customers. Public repo; no personal data.

## 1. Opportunity selection and tools

| Candidate approach | Assessment | Decision |
|---|---|---|
| Repeat a hand-picked favorable multiverse example | Cheap but weak evidence of adaptation, risk of hindsight | DROP |
| **Online decision comparison with forecasts that may be right, too high or too low** | Directly addresses Cycle 010's observed limitation; measurable improvement and failure modes | **DO** |
| Build a new application, plugin, agent coordinator, database or CI | Adds complexity for a numerical test already possible with existing tools | DROP |
| Make changes to the real Hybrid Mind site | Could measure real business impact but outside this safe public-lab exercise | DEFER |

**Skills:** online Bayesian updating, sequential decision-making, opportunity cost, evidence calibration, adaptive exploration, reproducible test evaluation.  
**Tools:** native model reasoning, a disposable JavaScript calculation within the existing tool runtime, existing GitHub Connector for protocol and readback. No new software, scheduler or dependency.

## 2. Synthetic state, action effects and decision information

Each independent episode presents a choice between:

- `QUICK`: obtain `2H` synthetic utility units over a horizon of `H` stages.
- `INVEST`: first stage costs `-2`, then (for `H-1` stages) `+4` per stage if success, or `+2` per stage if failure. The success outcome is a Bernoulli draw.
- Actual payoffs: `R_QUICK = 2H`; `R_INVEST_GOOD = -2 + 4(H-1)`; `R_INVEST_BAD = -2 + 2(H-1)`.
- Expected improvement of investing over quick under success belief `q`: `-4 + 2q(H-1)`. **INVEST iff this is strictly positive** (except the explicit exploration-probe override below).
- An investment outcome is revealed to that specific policy **only if it chose INVEST**. Choosing QUICK gives **no observation** about the unchosen investment.
- The environment has repeated independent episodes within each stationary scenario cell; its success probability is unknown to all policies.
- Each policy begins a fresh `Beta(alpha=8 p_forecast, beta=8(1-p_forecast))` prior for each scenario cell. This prior has effective sample size 8, not a claim about empirical real-world confidence.
- A policy updates its *own* posterior by adding 1 to alpha after an observed successful investment, or adding 1 to beta after an observed failed investment. **Never update from a latent result after QUICK.**
- AOM policy's decision at episode `t` may use only `H`, public `p_forecast`, `t`, and prior outcomes of investments made by that same policy. It cannot see `p_true`, regime label, future outcomes or another policy's experience.

## 3. Competing policies — fixed in advance

All policies face the **same episode sequence** and underlying outcomes, but each receives only the observations created by its *own* INVEST choices.

- **P0 — GREEDY:** always QUICK, the immediate-reward baseline.
- **P1 — STATIC:** INVEST iff `-4 + 2 p_forecast (H-1) > 0`, never updates beliefs.
- **P2 — ONLINE:** posterior mean `q = alpha/(alpha+beta)`; INVEST iff `-4 + 2q(H-1)>0`. Update alpha/beta from observed INVEST outcomes only. No forced exploration.
- **P3 — ONLINE+PROBE:** same as ONLINE, except **every 10th episode** (`t=10,20,...,100`) is a forced INVEST *if* `H>=5` and the current posterior-based decision would otherwise be QUICK. Such experiments incur the same genuine investment payoff (possibly a loss), and the observed outcome updates its own posterior. No probing in `H=2`.

If an INVEST was already chosen normally at `t=10k`, it counts as a normal investment and does *not* count as a forced probe. Policies are evaluated with their **actual synthetic utility including failed exploratory investments**. Do not award a probe free information.

## 4. Regimes and trials (frozen grid)

**Regime order:** `CALIBRATED`, `OVERSTATED`, `UNDERSTATED`.  
**Horizon order:** `H=2,5,8`.  
**Public forecast order:** `p_forecast=0.25,0.60,0.80`.  
**Episode order:** `t=1,...,100` for each cell.  
**Episodes:** `3 × 3 × 3 × 100 = 2,700` unique environment draws, evaluated by **four** policies (10,800 policy outcomes, paired by environment draw).

The true success probability is used only to generate and score outcomes:

- CALIBRATED: `p_true = p_forecast`.
- OVERSTATED: `p_true = max(0.05, p_forecast - 0.50)`.
- UNDERSTATED: `p_true = min(0.95, p_forecast + 0.50)`.

The regime and `p_true` must not be passed to any policy action function. Each cell resets posterior for P2 and P3, and both must be initialized identically. Policies never pool outcomes across cells; cross-cell transfer learning is outside this preregistration.

## 5. Randomness, sequence and no future leakage

Seed `x` is the unsigned 32-bit integer represented by the **first 8 hex digits of this preregistration file's GitHub create-file commit SHA**. If `x=0`, set `x=2463534242`.

Generate random fraction from xorshift32:

```javascript
x ^= x << 13;
x ^= x >>> 17;
x ^= x << 5;
const u = (x >>> 0) / 4294967296;
```

For each cell and episode, **first choose the four actions** from each policy's own information state, **then** advance the PRNG once and set `success = (u < p_true)`. Apply the same latent success/failure to the four policy reward calculations as a paired common-random-number test. Give that success/failure signal only to policies that actually invested. Do not let a QUICK policy learn that unobserved counterfactual.

No seed/outcome simulation before this GitHub preregistration is created. Report commit SHA and PRNG final 32-bit state to enable replay.

## 6. Predeclared evaluation

**Primary:** per-regime paired cumulative utility advantage **P2 − P1** and **P3 − P1**, including the cost of investment/probes.  
**Secondary:** P1 − P0, differences P3 − P2, the **first 50** vs **last 50** episodes in each cell (prospective *online* second-half evaluation, with continued updates rather than a frozen holdout), investment counts, probe counts, posterior changes and cases where self-confirming non-exploration prevents learning.

**Questions (not guaranteed wins):**
1. Does P2 become better than STATIC when forecasts are systematically OVERSTATED?
2. Does P3 discover high-value opportunities when forecasts are UNDERSTATED and P2 avoids investing?
3. Does probing harm performance when forecasts are CALIBRATED or the horizon is too short?
4. Which cells demonstrate learning traps from not observing outcomes after QUICK?

**Guardrails / acceptance:**
- Exactly 2,700 independent environment draws; 27 cells; 100 episodes in each.
- Exactly 4 policy results per draw.
- At `H=2`, all policies always QUICK and no observations are given.
- P0 always QUICK. P1 never changes per cell.
- For P2 and P3, `alpha+beta` increments only after actual INVEST actions; posterior cannot change after QUICK.
- Every decision strictly precedes its own random draw.
- Every realized INVEST reward uses the same per-episode environmental success; **only observation access differs**.
- Rewards, improvements and counts reconcile exactly.
- **Fail or negative effects must be reported**; do not tweak priors, probes, cells, thresholds or outcomes after reading any results.
- This is synthetic evidence only: no causal claim for a real market or model-provided probability.

## 7. After-the-fact results and next action

Write `experiments/2026-10-19-cycle-011-manual-test-05.md` with per-regime aggregates, a 27-cell table, predeclared checks, reproduction instructions, and an honest interpretation of successes/failures. Read back from GitHub to verify. Leave this preregistration unchanged.

**Next-stage question:** Whether estimating true future opportunity payoffs in a real, authorized, observable process produces better outcomes than a fixed decision policy. A field experiment needs independently verifiable metrics and appropriate protections.
