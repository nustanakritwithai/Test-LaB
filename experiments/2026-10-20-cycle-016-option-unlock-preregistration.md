# Test-LaB Cycle 016 — PRE-REGISTRATION: Future Options Unlocked by an Earlier Decision

Date: 2026-10-20 (Asia/Bangkok)
Protocol state: FROZEN BEFORE READING TEST DATA
Research question: Can a bounded multiverse policy value an early investment that creates later actions (and does it correctly avoid the investment when costly)?
Evidence: Real public GitHub release weeks; hypothetical action costs and benefits. No real watcher, site change, or production action.

## 1. Frozen sources and historical periods

Repositories in fixed order: astral-sh/ruff and pallets/flask.
Use public REST GET /repos/{owner}/{repo}/releases?per_page=10&page=N. Fetch up to 60 pages each until the first page containing fewer than 10 results. Only eligible releases with draft=false, prerelease=false, valid published_at count. Deduplicate by release ID. If an API error occurs or page 60 is still full, mark that source DATA_INCOMPLETE and do not score it; do not assume unseen weeks have no releases. Record source release permalinks, publication times and page counts.

Training: 26 UTC Monday weeks from 2025-07-07 to 2026-01-04 inclusive.
Holdout: 26 UTC Monday weeks from 2026-01-05 to 2026-07-05 inclusive.
Observation y for each week: 1 if >=1 eligible stable release was published during that UTC week, otherwise 0.

Policies decide action_t from training and test observations strictly before t. Only after both decisions have been frozen does the evaluator reveal y_t. Each policy updates Beta-Bernoulli success belief with that actually observed public weekly outcome, never with a hidden alternative future.

## 2. Hypothetical cause-and-effect option creation

A release event is REAL historical data. All cost numbers, alert quality and the resulting advantages of decisions are DECLARED TOY ASSUMPTIONS, not observed effects of GitHub tooling. A monitoring setup hypothetically enables a rapid same-week public release response; this property is not proved by the release dates. Policies cannot alter past release events.

The point state holds {week, alpha, beta, monitoringEnabled, cumulativeSyntheticLoss}. Both start with Beta(1,1) updated on the 26 common training weeks.

If monitoringEnabled=false, options are:
- WAIT: immediate cost 3 if y=1, otherwise 0. Response opportunity for this week is then irrevocably missed.
- PREPARE: cost 1.2 regardless of outcome.
- INSTALL: setup fee F plus maintenance 0.2 this week, plus reactive handling 0.3 if y=1; from the next point unlocks MONITOR and DISABLE.

If monitoringEnabled=true, options are:
- MONITOR: maintenance 0.2 plus 0.3 if y=1; retains monitoring next week.
- DISABLE: return to WAIT for this week (cost 3 if y=1), then monitoring=false next week.

Two prespecified experimental regimes for EACH repo and identical outcomes:
LOW_SETUP fee F=2.0.
HIGH_SETUP fee F=8.0.
Report all combinations. Never tune fees after seeing outcomes.

## 3. Frozen policies with equal evidence

P1 ONE_STEP / simple AOM-style proxy: choose the currently feasible action with lowest immediate expected loss under posterior p=alpha/(alpha+beta). Includes INSTALL as an immediate option but makes no allowance for later unlocked actions. Stable ties: WAIT, PREPARE, INSTALL, MONITOR, DISABLE. This is NOT an execution of the full AOM Markdown and may underrepresent the real AOM's foresight.

P2 CONTINGENT_MULTIVERSE / bounded proxy: same posterior and the same observations, but evaluate all feasible actions and both binary nature outcomes recursively to horizon H=4. Each child updates its hypothetical Beta belief, cost and monitoring state separately. Minimize expected modeled cumulative loss; ties follow the same action order as P1. Each next actually observed holdout week reroots a new H=4 tree. No virtual branch is ever promoted into an observed event.

ONE global ledger per P2 root. Max 2500 work units, charge 1 per expanded decision + 1 per nature-outcome transition. Virtual children consume the SAME ledger. On insufficiency report BUDGET_EXHAUSTED / ABSTAIN rather than guessing. Each arm may use the same maximum budget but actual usage must be reported; units are not CPU, LLM tokens, time or money.

## 4. Predeclared scoring

Primary: total realized synthetic loss across 26 holdout weeks for each repo/fee cell. P2 - P1 negative is better. This measures model-specific option-value decision quality under fictional intervention payoffs, NOT real observed business uplift.

Secondary: root action, install week, setup counts, action-set change, actual weekly release event sequence, work ledger, incomplete branches, forecast-before-observation integrity, control cases where P2 is worse or identical.

Acceptance: valid complete source coverage, fixed chronological scoring, no future leakage, no source repo write, all declared feasible routes considered, clear separation of real release events versus toy causal effects. Do NOT require P2 to win; never rewrite priors/fees after outcomes.

No modification of AOM V0.3, Multiverse v4.0.1, Hybrid Mind, Facebook, Metricool, WordPress or any other live system. Only Test-LaB stores sanitized source/protocol/test/results.

## 5. Important limitation

P1/P2 are fixed algorithmic proxies, not independent blinded runs of AOM instructions with the LLM. Even if P2 shows lower synthetic loss, no conclusion that Multiverse improves actual user decision outcomes or public-release forecasting accuracy is justified. A future stronger study needs real action-conditioned observations or independently executed LLM prompt A/B under matched data budgets.
