# AOM Test-LaB — Cycle 011B / Manual Test 05 — Belief Calibration + Exploration

**Date:** 2026-10-19 (Asia/Bangkok)  
**Protocol frozen *before* outcomes:** [Cycle 011 preregistration](2026-10-19-cycle-011-preregistration.md), GitHub create commit `410c4c5c6f72746253f86076290d10da25945da8`.  
**Result:** `SYNTHETIC SEQUENTIAL LEARNING TEST PASS / INDEPENDENT PYTHON REPLAY PASS / REAL-WORLD UPLIFT UNVERIFIED`  
**Naming:** This is a distinct complementary fifth-round study. Another agent added [Cycle 011 — regime-shift study](2026-10-19-cycle-011-manual-test-05.md) concurrently. Both original reports are preserved; no overwriting or double-counting is permitted.

## 1. The opportunity decision

AOM compared (a) making a report without testing, (b) a preregistered test of *learning from outcomes actually observed*, (c) developing additional simulator infrastructure, and (d) directly changing an external business. It selected **(b)**, because the previous cycle proved that optimistic forecasts can make non-myopic investment lose, and this test can probe the reason without modifying real systems.

**Selected Skill/Method:** Bayesian sequential belief revision, information acquisition/exploration, paired counterfactual comparison, preregistration and reproducibility.  
**Selected Tools:** Existing ChatGPT reasoning, ephemeral JavaScript computation, independent Python replay, connected GitHub for immutable preregistration and result logging. No new Skill/Plugin/app/framework or automation.

## 2. Frozen rules

This controlled artificial environment uses the same synthetic payoff functions as the previous test. Each episode has horizon `H∈{2,5,8}`, publicly estimated success probability `p∈{.25,.60,.80}`, and action QUICK (`2H`) or INVEST (successful `-2+4(H-1)`; failed `-2+2(H-1)`).

**Regimes:** CALIBRATED (`p_true=p`), OVERSTATED (`p_true=max(.05,p-.5)`), UNDERSTATED (`p_true=min(.95,p+.5)`). Regime and true probability are known only to the evaluator, **not to any policy**.

Four policies choose actions **before each outcome draw**:
- `GREEDY`: always QUICK;
- `STATIC`: invest when `-4+2p(H-1)>0`;
- `ONLINE`: begin `Beta(8p,8(1-p))`, decide from posterior mean, update only when *own INVEST* outcome is observed;
- `ONLINE_PROBE`: same posterior update, plus one forced real-cost INVEST every tenth episode when H≥5 if it would otherwise choose QUICK.

27 independent scenario cells × 100 sequential episodes = **2,700 environment outcomes** × four policies = **10,800 evaluated decisions**. Each policy in an episode is compared on a shared latent outcome, but a policy choosing QUICK **does not receive information** from that latent outcome. All states are reset between cells. Probe costs are included in utility.

**Blind seed:** `410c4c5c` hex = unsigned 1091325020; PRNG `xorshift32` final state 555970788. This GitHub seed became available only after the protocol was written, so observed results could not determine the frozen rules.

## 3. Core result

| Scenario | GREEDY | STATIC | ONLINE | ONLINE+PROBE | ONLINE − STATIC | PROBE − STATIC | Forced probes |
|---|---:|---:|---:|---:|---:|---:|---:|
| CALIBRATED | 9000 | 10756 | 10756 | 10712 | +0 | -44 | 20 |
| OVERSTATED | 9000 | 8316 | 8878 | 8720 | +562 | +404 | 49 |
| UNDERSTATED | 9000 | 11554 | 11554 | 12220 | +0 | +666 | 11 |

**What passed and what failed:**
- In OVERSTATED, ONLINE scored **8,878 vs 8,316**, an improvement of **+562** synthetic units, because it reduced investment to **134** choices rather than STATIC's **400**. Yet ONLINE still **lost to GREEDY's 9,000**: Bayesian adjustment alone was not globally best.
- In UNDERSTATED, STATIC and ONLINE both scored **11,554**. Since opportunities rejected by both remained unobserved, ONLINE **never discovered** their latent value. Scheduled probing raised the score to **12,220** (**+666** vs STATIC) under this grid.
- In CALIBRATED, ONLINE tied STATIC at **10,756**, while exploratory probing **lost 44** units (10,712). Experiments can consume resources without value.
- Under OVERSTATED, probing reached only **8,720** vs non-probing ONLINE's **8,878**, a further **−158** units. Thus **always probe every tenth time** is not a universally appropriate strategy.
- Across the **artificially equal-weighted** three regimes: GREEDY 27,000; STATIC 30,626; ONLINE 31,188; ONLINE+PROBE 31,652. **This aggregate ranking is not a forecast of real-world policy superiority**, because the mixing weights were chosen for test coverage, not measured in deployment.

### Prospective second-half totals (episodes 51–100, learning continues)

| Scenario | STATIC last 50 | ONLINE last 50 | PROBE last 50 | ONLINE − STATIC | PROBE − STATIC |
|---|---:|---:|---:|---:|---:|
| CALIBRATED | 5364 | 5364 | 5346 | +0 | -18 |
| OVERSTATED | 4102 | 4418 | 4326 | +316 | +224 |
| UNDERSTATED | 5770 | 5770 | 6114 | +0 | +344 |

The last-half metric is a **prequential** online evaluation. It is not an independent frozen-policy holdout: the adaptive policies keep updating after each of their own observed INVEST outcomes.

## 4. All 27 scenario cells

| Scenario | H | p forecast | p true (evaluator only) | GREEDY | STATIC | ONLINE | PROBE | ONLINE/PROBE invested | Forced probes | Final beliefs ONLINE/PROBE |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| CALIBRATED | 2 | 0.25 | 0.25 | 400 | 400 | 400 | 400 | 0/0 | 0 | 0.250/0.250 |
| CALIBRATED | 2 | 0.60 | 0.60 | 400 | 400 | 400 | 400 | 0/0 | 0 | 0.600/0.600 |
| CALIBRATED | 2 | 0.80 | 0.80 | 400 | 400 | 400 | 400 | 0/0 | 0 | 0.800/0.800 |
| CALIBRATED | 5 | 0.25 | 0.25 | 1000 | 1000 | 1000 | 976 | 0/10 | 10 | 0.250/0.222 |
| CALIBRATED | 5 | 0.60 | 0.60 | 1000 | 1168 | 1168 | 1168 | 100/100 | 0 | 0.702/0.702 |
| CALIBRATED | 5 | 0.80 | 0.80 | 1000 | 1288 | 1288 | 1288 | 100/100 | 0 | 0.856/0.856 |
| CALIBRATED | 8 | 0.25 | 0.25 | 1600 | 1600 | 1600 | 1580 | 0/12 | 10 | 0.250/0.200 |
| CALIBRATED | 8 | 0.60 | 0.60 | 1600 | 2096 | 2096 | 2096 | 100/100 | 0 | 0.637/0.637 |
| CALIBRATED | 8 | 0.80 | 0.80 | 1600 | 2404 | 2404 | 2404 | 100/100 | 0 | 0.856/0.856 |
| OVERSTATED | 2 | 0.25 | 0.05 | 400 | 400 | 400 | 400 | 0/0 | 0 | 0.250/0.250 |
| OVERSTATED | 2 | 0.60 | 0.10 | 400 | 400 | 400 | 400 | 0/0 | 0 | 0.600/0.600 |
| OVERSTATED | 2 | 0.80 | 0.30 | 400 | 400 | 400 | 400 | 0/0 | 0 | 0.800/0.800 |
| OVERSTATED | 5 | 0.25 | 0.05 | 1000 | 1000 | 1000 | 960 | 0/10 | 10 | 0.250/0.111 |
| OVERSTATED | 5 | 0.60 | 0.10 | 1000 | 704 | 992 | 952 | 6/16 | 10 | 0.486/0.283 |
| OVERSTATED | 5 | 0.80 | 0.30 | 1000 | 880 | 980 | 968 | 17/26 | 9 | 0.496/0.453 |
| OVERSTATED | 8 | 0.25 | 0.05 | 1600 | 1600 | 1600 | 1574 | 0/10 | 10 | 0.250/0.167 |
| OVERSTATED | 8 | 0.60 | 0.10 | 1600 | 1410 | 1564 | 1532 | 23/31 | 8 | 0.284/0.226 |
| OVERSTATED | 8 | 0.80 | 0.30 | 1600 | 1522 | 1542 | 1534 | 88/90 | 2 | 0.285/0.280 |
| UNDERSTATED | 2 | 0.25 | 0.75 | 400 | 400 | 400 | 400 | 0/0 | 0 | 0.250/0.250 |
| UNDERSTATED | 2 | 0.60 | 0.95 | 400 | 400 | 400 | 400 | 0/0 | 0 | 0.600/0.600 |
| UNDERSTATED | 2 | 0.80 | 0.95 | 400 | 400 | 400 | 400 | 0/0 | 0 | 0.800/0.800 |
| UNDERSTATED | 5 | 0.25 | 0.75 | 1000 | 1000 | 1000 | 1008 | 0/10 | 10 | 0.250/0.444 |
| UNDERSTATED | 5 | 0.60 | 0.95 | 1000 | 1384 | 1384 | 1384 | 100/100 | 0 | 0.952/0.952 |
| UNDERSTATED | 5 | 0.80 | 0.95 | 1000 | 1352 | 1352 | 1352 | 100/100 | 0 | 0.930/0.930 |
| UNDERSTATED | 8 | 0.25 | 0.75 | 1600 | 1600 | 1600 | 2258 | 0/91 | 1 | 0.250/0.758 |
| UNDERSTATED | 8 | 0.60 | 0.95 | 1600 | 2530 | 2530 | 2530 | 100/100 | 0 | 0.924/0.924 |
| UNDERSTATED | 8 | 0.80 | 0.95 | 1600 | 2488 | 2488 | 2488 | 100/100 | 0 | 0.911/0.911 |

**Illustrative observation:**
- UNDERSTATED, H=8, p forecast .25 but p true .75: STATIC = ONLINE = 1,600, while PROBE = **2,258**. A single exploratory INVEST revealed an opportunity that would otherwise never be sampled; follow-on investment created synthetic benefit.
- UNDERSTATED, H=5, same initial low forecast: probing reached only **1,008 vs 1,000**; the final posterior remained ≈.444, below the investment threshold .50. Information acquisition did not fully unlock the opportunity.
- CALIBRATED, H=5 & H=8, p=.25: probing was costly and did not justify scaling up.
- OVERSTATED, H=5, p forecast .60 but true .10: STATIC 704, ONLINE 992, PROBE 952; adaptation reduced repeated bad investment, but continued periodic exploration was costly.

## 5. Verification & reproduction

- **2700** actual synthetic random draws; **10800** paired policy-outcome evaluations in **27** cells.
- **10,859** executable invariants passed, including all state-update constraints and the true `H=2` no-invest rule.
- Independent replay using Python (different implementation of `xorshift32` with 32-bit masking) matched **all 12 regime-by-policy reward aggregates**, investment totals, and final RNG state `555970788`.
- No outcome was supplied to ONLINE/PROBE after its QUICK decisions; only INVEST outcomes changed its posterior.
- **Exact token usage, time cost, real dollar costs and human cognitive effort were not instrumented and remain UNKNOWN.**

### Dependency-free reproduction (Node.js 18+)

```javascript
// Node.js >= 18. No packages. Evaluates four policies from a frozen GitHub-commit seed.
let x=parseInt("410c4c5c",16)>>>0;
if(x===0)x=2463534242;
function random(){x^=x<<13;x^=x>>>17;x^=x<<5;return(x>>>0)/4294967296;}
const decide=(q,H)=>-4+2*q*(H-1)>0;
const totals={};let draws=0;
for(const regime of ["CALIBRATED","OVERSTATED","UNDERSTATED"]){
 const sums=[0,0,0,0];
 for(const H of [2,5,8])for(const p of [.25,.60,.80]){
  const truth=regime==="CALIBRATED"?p:regime==="OVERSTATED"?Math.max(.05,p-.5):Math.min(.95,p+.5);
  let a2=8*p,b2=8*(1-p),a3=a2,b3=b2;
  for(let t=1;t<=100;t++){
   const doOnline=decide(a2/(a2+b2),H),doProbe=decide(a3/(a3+b3),H);
   const acts=[false,decide(p,H),doOnline,doProbe||(H>=5&&t%10===0)];
   // No hidden result is available when choosing the actions.
   const won=random()<truth;draws++;
   acts.forEach((invest,i)=>sums[i]+=invest?(won?-2+4*(H-1):-2+2*(H-1)):2*H);
   if(acts[2]){if(won)a2++;else b2++;}
   if(acts[3]){if(won)a3++;else b3++;}
  }
 }
 totals[regime]=sums;
}
if(draws!==2700 || (x>>>0)!==555970788)throw Error("Replay failed");
console.log(JSON.stringify({draws,finalPRNGState:x>>>0,totals},null,2));
```

## 6. Limitations and next allocation

This was an intentionally **synthetic** test. The payoff functions, priors, likelihood shifts and probe cadence were declared, not learned from real businesses. It verifies **decision logic under these rules**, not a real-world return on investment. The "best" opportunity manager for an unknown deployment may require a model of forecast reliability, changes in environment, observation bias and scarce resources; the largest simulated total cannot establish universal optimality.

**Important newly encountered operational fact:** GitHub acquired a *separate* Cycle 011 manual-test report while this run was in progress. AOM avoided overwriting it and chose a unique filename for this distinct registered experiment. Existing work was reused rather than replaced.

**Recommended next cycle:** Replace the rigid every-10th probe with a **value-of-information decision** that weighs how likely new information is to change action, what the payoff stakes are, the uncertainty about success, and the actual cost of acquiring information. Pre-register and compare it with STATIC, ONLINE, and fixed probing on fresh scenarios.

**Disposition:** `ADOPT EVIDENCE-GATED LEARNING / EXPLORE SELECTIVELY / REAL-WORLD UPLIFT UNVERIFIED`. No external business mutation or scheduled automation.
