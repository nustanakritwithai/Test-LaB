# Test-LaB — Cycle 012 / Continuous Multiverse v4: Every Point Learns and Re-roots

**Date:** 2026-10-19 (Asia/Bangkok)  
**User objective:** ทุก nonterminal point ต้องเป็น Decision Point, Universe Root, Learning Point พร้อมกัน และจำลองล่วงหน้าไปจุดถัดไปอย่างต่อเนื่อง  
**Operating instructions:** [CONTINUOUS_MULTIVERSE_v4.md](../world-model/CONTINUOUS_MULTIVERSE_v4.md)  
**Exact reproducible script:** [tests/continuous_multiverse_v4.js](../tests/continuous_multiverse_v4.js)  
**Result:** \`41/41 PASS\` finite deterministic *synthetic* test assertions, using the available Node.js runtime.  
**Real business impact:** \`UNVERIFIED\`; no market observation, financial action, website update, customer data, or external business operation used.

## 1. What changed from v3

The old point-2/point-3 test updated a decision in a finite preplanned tree. This round formalizes a stronger loop:

1. **At every nonterminal simulated branch:** use the same decision kernel to reassess resources, belief and feasible actions; enumerate all declared outcomes; simulate the next point recursively.
2. **At every synthetic observed point:** update belief **only** with the fixture outcome received; rebuild a new full lookahead tree of depth H=5. Do not simply descend the originally simulated tree.
3. **At every new point:** compare all feasible choices as complete contingent policies, not pick the luckiest leaf, and consider further learning or stopping.
4. **After STOP:** terminate; when an observation has not arrived, return \`WAIT_FOR_OBSERVATION\`; if it is outside the declared model, return \`MODEL_MISS\`.
5. **Safety:** Virtual branch learning remains hypothetical and cannot become observed evidence.

All inputs/outputs are synthetic units, not amounts of real money.

## 2. Explicit finite toy world

State at each point: \`{cash, alpha, beta, remaining, mode, observations}\`. Beta(\alpha,\beta) models one hypothetical shared Bernoulli success rate, with initial Beta(1,1). A successful PROBE and a successful COMMIT are assumed to be conditionally comparable evidence **within this toy environment only**.

- STOP: terminate with no additional gain.
- PROBE: pay 1 unit, observe SUCCESS/FAILURE, update Beta; retain ability to choose later.
- COMMIT: permitted only if cash is at least 30; SUCCESS adds 20 units, FAILURE subtracts 30; observe and update Beta.
- PROBE is allowed only with cash at least 1.
- Nature outcome probabilities at a point: p(SUCCESS)=\alpha/(\alpha+\beta), p(FAILURE)=1-p.
- Simulated recursion depth: 5 decisions. Each actually observed **fixture** point starts its own *new* depth-5 exploration. This is a finite test of a rolling horizon, not an unattended infinite process.
- Criterion: maximize expected incremental outcome in the declared model. Ties prefer STOP, then PROBE, then COMMIT; this is a test convention.

Local *myopic* one-step comparison at S1 yields STOP = 0, PROBE = −1, COMMIT = −5. The recursively evaluated long-horizon policy instead selects **PROBE**, value approximately **+8.3333 synthetic units**, because observing results may justify profitable future decisions. This is a theoretical counterexample within the declared toy assumptions, not measured ROI.

## 3. Full declared multiverse coverage

The initial depth-5 exhaustive traversal of this finite environment produced:

| Metric | Measured by reference script |
|---|---:|
| Total nodes (including terminal nodes) | **1,678** |
| Decision nodes | **339** |
| Terminal/horizon leaves | **1,339** |
| Edges in explored tree | **1,677** |
| Action alternatives enumerated at decision points | **1,008** |
| Asserted checks | **41/41 PASS** |

The exploration is exhaustive relative to **STOP/PROBE/COMMIT**, the two declared outcomes and the resource gates. These counts are not coverage of undiscovered actions, other world hypotheses, or all real possible futures. The finite resource threshold makes the tree shape state-dependent; no greedily unfavorable branch is silently pruned.

## 4. Continuity traces: point-by-point reroot and learning

Fixture A supplies *synthetic observed* outcomes SUCCESS, FAILURE, FAILURE in sequence:

| Point | Belief Beta(α,β) | Simulated cash | Chosen action | Interpretation |
|---|---|---:|---|---|
| S1 | (1,1) | 100 | **PROBE** | Explore all available branches, choose information gathering |
| S2 | (2,1) | 99 | **COMMIT** | Positive observation raises estimated success rate |
| S3 | (2,2) | 69 | **PROBE** | After adverse result, simulate again and gather more information |
| S4 | (2,3) | 68 | **STOP** | New evidence and costs make continuation unattractive in this model |

Each S1–S4 is a **new decision root with a fresh depth-5 multiverse**, and each root has its own action evaluation. At S3, starting a fresh planning horizon matters: a static remaining-horizon policy from an earlier point need not choose the same action.

Fixture B supplies SUCCESS, SUCCESS, FAILURE, FAILURE, FAILURE:

| Point | Belief | Simulated cash | Chosen action |
|---|---|---:|---|
| S1 | (1,1) | 100 | PROBE |
| S2 | (2,1) | 99 | COMMIT |
| S3 | (3,1) | 119 | COMMIT |
| S4 | (3,2) | 89 | COMMIT |
| S5 | (3,3) | 59 | PROBE |
| S6 | (3,4) | 58 | STOP |

Fixture C with the first observation FAILURE immediately changes S2 to **STOP**, showing that the chosen action is conditional on the **observation received**, not on an inaccessible hidden world.

**All "observed" transitions in these traces mean predeclared fixture data supplied during a local test, not actual measured real-world transitions.** Only the one fixture outcome for the chosen step is applied to the observed-root belief. The alternate simulated outcomes remain isolated.

## 5. Additional controls verified

- Every nonterminal simulated node recursively builds its own feasible-action branches.
- Nature branch probabilities sum to one under the stated model.
- Initial observed root is not mutated by virtual rollouts.
- After each observed fixture outcome, the root plan uses H=5 again; a simulated child consumes H−1.
- Resource cash below the 30-unit commit requirement blocks COMMIT.
- Horizon boundary and STOP are different conditions.
- If no observation is supplied, the loop pauses instead of pretending a successful or failed step happened.
- An out-of-model observation triggers MODEL_MISS without inventing a posterior update.
- Fixture decision history remains labeled OBSERVED_FIXTURE; virtual branch history remains SIMULATED_BRANCH.
- No external-world execution occurred.

## 6. Repeat locally

~~~bash
node tests/continuous_multiverse_v4.js
~~~

Requires Node.js 18+ only, no npm packages. The script runs assertions and prints a JSON record with status, test count, tree coverage, and trajectories A/B/C.

The 41 assertions are **logic fixtures**. They do not establish model accuracy for any real domain. Learning means updated Bayesian parameters under the declared synthetic likelihood. It is **not** online training of model weights or demonstrated improvement on held-out real-world cases.

## 7. Next evidence threshold

To claim real skill improvement, freeze a task/decision and a genuine baseline **before** collecting future observations; record pre-action predictions, real observations, unique event IDs, model version, matched resource budgets and proper scoring. Compare accuracy and achieved outcome across independent cases (and holdout cases when possible). Sensitive evidence must remain outside this public repo.

**Verdict:** \`CONTINUOUS_RECEDING_HORIZON_LOGIC_PASS / BRANCH_LOCAL_LEARNING_PASS / REAL_WORLD_AUTONOMY_NOT_IMPLEMENTED / PREDICTIVE_ACCURACY_UNVERIFIED\`.

**Record policy:** Existing GitHub + Markdown for instructions and evidence, one small Node.js assertion script as a reproducibility artifact; no orchestrator, new service, Skill package, Plugin, database or scheduled runner created.
