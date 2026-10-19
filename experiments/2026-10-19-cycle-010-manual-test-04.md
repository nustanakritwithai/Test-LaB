# AI Opportunity Manager — Cycle 010 / Manual Test 04

**Date:** 19 October 2026 (Asia/Bangkok)  
**Goal:** Choose between a quick payoff and a delayed payoff over finite horizons, *without seeing latent outcomes*, and identify when the opportunity policy fails because forecasts are inaccurate.
**Preregistered before outcomes:** [Cycle 010 protocol](2026-10-19-cycle-010-preregistration.md) committed as `3289ed216cc91abc92060133eb29d75e8c2b6fe5`.  
**Evidence class:** **Synthetic controlled randomized test** — not a field trial or business performance claim.
**Result:** `CONTROLLED TEST PASS / BENEFIT CONDITIONAL ON CALIBRATION / REAL-WORLD UPLIFT UNVERIFIED`.

## 1. Skill + Tool decision

| Alternative | Opportunity | Cost and limitation | Decision |
|---|---|---|---|
| Repeat prior hand-written 15/15 fixture | Check model rules again | Limited novelty; easy to select favorable scenarios | DROP |
| **Pre-register a multi-horizon stochastic holdout** | Test whether long-range decisions beat myopic ones **and** whether model error reverses result | This is still a synthetic model | **DO** |
| Directly change Hybrid Mind / spend money | Possibly measurable business uplift | Not authorized in public Test-LaB; cannot compare without proper control | DEFER |
| Build a new simulator or agent stack | Reusable architecture | Existing AI runtime and GitHub suffice | DROP |

**Chosen skills:** multi-step opportunity valuation, scenario comparison, rigorous evidence labeling, test verification.  
**Chosen tools:** native reasoning + ephemeral JavaScript arithmetic + existing GitHub connector (preregistration, saved results, readback). No third-party app, custom Skill, new Plugin, scheduler or database.

## 2. Frozen hypotheses & protocol

The policies and outcomes-generation mechanism were registered on GitHub **before** the outcomes were generated. The output of the create-file operation provided a commit SHA, used as the pseudo-random seed source. The PRNG is deterministic, not a cryptographically secure process.

- Horizons `H ∈ {2,5,8}`; public forecast `p ∈ {.25,.60,.80}`.
- 2 regimes: `CALIBRATED`: `p_true=p`; `OVERSTATED`: `p_true=max(.05,p-.50)`.
- 100 draws per combination, `2 × 3 × 3 × 100 = 1,800` episodes.
- **Greedy baseline:** take `QUICK` at every stage, synthetic value `2H`.
- **AOM non-myopic policy:** invest only when `-4+2p(H-1)>0`, otherwise take QUICK.
- **Invest first-stage return:** `-2` (strictly worse than immediate QUICK `+2`); if future project succeeds, it unlocks `+4` at each remaining stage; if it fails, fallback yields `+2` each remaining stage.
- Both policies evaluated using the **same post-decision random outcome**, for paired comparisons. Outcome is not an input to the choice.

**RNG:** first 8 hex digits of pre-registration commit SHA → unsigned 32-bit seed `847899937`. Run `xorshift32` (`x^=x<<13; x^=x>>>17; x^=x<<5`), normalize `(x>>>0)/4294967296`. Fixed iteration order from preregistration. End state `3281356059`. No parameters were changed after results.

## 3. Outcome summary

| Observation | CALIBRATED | OVERSTATED |
|---|---:|---:|
| Episodes | 900 | 900 |
| Greedy aggregate reward | 9000 | 9000 |
| AOM aggregate reward | 10504 | 8376 |
| **AOM uplift in simulated units** | **+1504** | **-624** |
| **Mean uplift per episode** | **1.6711** | **-0.6933** |
| Chose INVEST | 400 | 400 |
| Episodes AOM won / lost / tied | 283 / 117 / 500 | 92 / 308 / 500 |

### Results for all 18 predeclared cells

| Regime | H | Public forecast p | True p (hidden before choice) | INVEST/100 | successes/100 | AOM mean | Greedy mean | Mean difference |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| CALIBRATED | 2 | 0.25 | 0.25 | 0 | 24 | 4.00 | 4.00 | +0.00 |
| CALIBRATED | 2 | 0.60 | 0.60 | 0 | 69 | 4.00 | 4.00 | +0.00 |
| CALIBRATED | 2 | 0.80 | 0.80 | 0 | 81 | 4.00 | 4.00 | +0.00 |
| CALIBRATED | 5 | 0.25 | 0.25 | 0 | 20 | 10.00 | 10.00 | +0.00 |
| CALIBRATED | 5 | 0.60 | 0.60 | 100 | 63 | 11.04 | 10.00 | +1.04 |
| CALIBRATED | 5 | 0.80 | 0.80 | 100 | 80 | 12.40 | 10.00 | +2.40 |
| CALIBRATED | 8 | 0.25 | 0.25 | 0 | 23 | 16.00 | 16.00 | +0.00 |
| CALIBRATED | 8 | 0.60 | 0.60 | 100 | 60 | 20.40 | 16.00 | +4.40 |
| CALIBRATED | 8 | 0.80 | 0.80 | 100 | 80 | 23.20 | 16.00 | +7.20 |
| OVERSTATED | 2 | 0.25 | 0.05 | 0 | 9 | 4.00 | 4.00 | +0.00 |
| OVERSTATED | 2 | 0.60 | 0.10 | 0 | 13 | 4.00 | 4.00 | +0.00 |
| OVERSTATED | 2 | 0.80 | 0.30 | 0 | 31 | 4.00 | 4.00 | +0.00 |
| OVERSTATED | 5 | 0.25 | 0.05 | 0 | 0 | 10.00 | 10.00 | +0.00 |
| OVERSTATED | 5 | 0.60 | 0.10 | 100 | 15 | 7.20 | 10.00 | -2.80 |
| OVERSTATED | 5 | 0.80 | 0.30 | 100 | 37 | 8.96 | 10.00 | -1.04 |
| OVERSTATED | 8 | 0.25 | 0.05 | 0 | 3 | 16.00 | 16.00 | +0.00 |
| OVERSTATED | 8 | 0.60 | 0.10 | 100 | 11 | 13.54 | 16.00 | -2.46 |
| OVERSTATED | 8 | 0.80 | 0.30 | 100 | 29 | 16.06 | 16.00 | +0.06 |

**Observed:** In the calibrated half, planning across multiple stages outperformed immediate reward maximization on average. In the systematically over-optimistic half, that same non-myopic policy **underperformed**. Aggregate outcomes across all 1,800 episodes are **not** evidence that it is universally better; mixture proportions were designed for this test rather than sampled from any real deployment population.

## 4. Why the delayed branch can win or lose

For INVEST, the expected reward advantage over QUICK under a known success probability is:
```
E[INVEST − QUICK] = −4 + 2 * p * (H−1)
Invest only if p > 2/(H−1) (strict).
```
- **H=2:** investment is not worthwhile at any tested forecast.
- **H=5 and forecast .60 / .80:** investment is justified under the model and can yield a later payoff.
- **H=8 and forecast .60 / .80:** longer horizon makes the delayed payoff more valuable.
- **In the misleading-forecast regime:** predicted future value is inflated, and repeated INVEST decisions often lose. AOM should test/calibrate assumptions before allocating major real-world resources.

### Examples of post-commit draws for reproducibility

| Regime | H | p | First draw u | Action |
|---|---:|---:|---:|---|
| CALIBRATED | 5 | 0.25 | 0.8594907180 | QUICK |
| CALIBRATED | 5 | 0.60 | 0.4828310446 | INVEST |
| CALIBRATED | 5 | 0.80 | 0.1063651734 | INVEST |
| CALIBRATED | 8 | 0.25 | 0.9067588912 | QUICK |
| CALIBRATED | 8 | 0.60 | 0.7720589344 | INVEST |
| CALIBRATED | 8 | 0.80 | 0.4877604342 | INVEST |
| OVERSTATED | 5 | 0.25 | 0.3735755752 | QUICK |
| OVERSTATED | 5 | 0.60 | 0.7424561137 | INVEST |

## 5. Verification checks

| Structural / numerical invariant | Result |
|---|---|
| 18 predeclared cells | PASS |
| 1800 predeclared episodes | PASS |
| 100 outcomes per cell | PASS |
| policies budget same H | PASS |
| no H2 investments | PASS |
| no low-p investments | PASS |
| 800 aggregate investments | PASS |
| baseline totals match | PASS |
| calibrated improves | PASS |
| overstated fails | PASS |
| reward deltas consistent | PASS |
| episode sign counts | PASS |
| paired totals agree | PASS |

**13/13 invariants passed.** Counts and empirical payoffs were computed after the pre-registration commit was written and read back. **Independent Python cross-check:** Recomputed the same xorshift32 sequence and 1,800 outcomes separately; reproduced CALIBRATED total uplift **+1504**, OVERSTATED total uplift **−624**, and final PRNG state **3281356059** exactly. This cross-language consistency verifies arithmetic, not external predictive validity.

### Reproduction outline (no external dependencies)

```javascript
let x = parseInt("3289ed216cc91abc92060133eb29d75e8c2b6fe5".slice(0,8),16) >>> 0;
if (!x) x=2463534242;
function draw() {
  x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
  return (x>>>0) / 4294967296;
}
for (const regime of ["CALIBRATED","OVERSTATED"])
  for (const H of [2,5,8])
    for (const p of [0.25,0.6,0.8])
      for (let episode=0; episode<100; episode++) {
        const invest=(-4 + 2*p*(H-1)) > 0; // BEFORE seeing outcome
        const pTrue=regime==="CALIBRATED"?p:Math.max(0.05,p-0.5);
        const success=draw() < pTrue; // revealed AFTER the decision
        const greedy=2*H;
        const aom=invest?(success?(-2+4*(H-1)):(-2+2*(H-1))):greedy;
        // Accumulate aom-greedy grouped by regime and cell.
      }
```

## 6. What is and is not verified

- **VERIFIED in the declared simulator:** 1,800 policy/outcome episodes evaluated; immediate-reward Greedy loses on average when forecasts are calibrated; non-myopic AOM loses when forecasts are systematically overstated; frozen preregistration precedes PRNG draws.
- **NOT VERIFIED:** Real-world probabilities; financial ROI; benefit of AOM in customer decisions; performance of an operational world model, adaptive learning, forecasting skill, or actual multi-agent system; actual token, time, or human-attention savings.
- **LIMITATION:** These synthetic payoff structures were chosen by the experiment author. Pre-registration prevents *outcome cherry-picking within the declared grid*, but does not establish that the grid resembles the real world. Baseline GREEDY is purposely myopic, not a professionally optimized competing strategy.
- **PRIVACY:** This repo is public; only synthetic numbers and public GitHub references are in the report.
- **EXTERNAL SIDE EFFECT:** Only two experiment Markdown files written to the authorized Test-LaB; no website changes or external transactions.

## 7. Learned rule / Next opportunity

**AOM's next decision should be about forecast quality rather than more complex tree enumeration.** A delayed-profit policy can be more rewarding **if** estimated branch probabilities are trustworthy. The next manual experiment should compare:
1. Static optimistic AOM (this test),
2. AOM that updates estimated success probabilities from prior **observed** outcomes (not unobservable counterfactuals),
3. A policy that probes cheaply before committing resources if information is worth its cost.

Freeze the update rule and evaluation window before testing, and do not let the adaptive policy access future outcomes. Retain the quick baseline as a safety fallback.

**Current disposition:** `ADOPT LEARNING ABOUT CALIBRATION / DO NOT CLAIM WORLD-VALUE PROOF`.

## 8. Readback verification

GitHub destination readback must confirm this exact file, the recorded seed and results. No success is claimed for the GitHub write until verified after the create operation.
