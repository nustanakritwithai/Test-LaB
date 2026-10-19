# Test-LaB — Field Pilot Cancellation and Safe Replacement

**Date:** 2026-10-19 (Asia/Bangkok)
**User instruction:** Do not post, reschedule, test-publish, or alter Hybrid Mind, its Facebook publishing workflow, Metricool scheduling, or connected live systems. Active production workflows must not be disrupted.
**Status:** `HYBRID_MIND_FIELD_PILOT_CANCELLED_BEFORE_INTERVENTION`
**Previous proposal:** [Hybrid Mind Facebook Distribution preregistration](2026-10-19-field-pilot-hybridmind-facebook-distribution-prereg.md)
**New direction:** `READ_ONLY_PUBLIC_HISTORY_REPLAY`, Test-LaB documentation only.

## Verified operating boundary

- No Facebook posting or scheduling action was carried out as part of the previous proposal.
- The previous preflight only read available Metricool analytics and created a proposed experiment protocol in Test-LaB.
- **Do not run the cancelled Facebook timing experiment**, including even a "small" live test.
- Do not modify Hybrid Mind website content/settings, WordPress publishing plugins, Facebook Page posts/scheduling, or Metricool planned posts for the World Model experiment.
- No external system write access is needed for the replacement study; public GitHub data is fetched read-only. Test-LaB may hold a sanitized protocol and report as the dedicated sandbox.

This cancellation record supersedes the operational intent of the earlier pre-registration without rewriting or deleting the historical proposal.

## Safe replacement — historical real-data replay

**Goal:** Test whether Continuous Multiverse v4 can make better sequential information-selection/forecasting decisions on a previously recorded stream of *real, public* GitHub repository events than a fixed strategy. It does **not** claim to change the public event sequence, business revenue, or other people's systems.

### Source and clock separation

1. Choose a suitable unrelated public open-source repository with historic issues/PRs/releases/commits accessible via **read-only GitHub APIs**, before reviewing the scoring-period outcomes.
2. Specify a historical time cutoff and eligible event set; keep complete raw timestamps and permalinks for provenance.
3. At point S1 provide only publicly knowable data available at the S1 cutoff, and declare possible predictions and read-only next-information actions.
4. Freeze the decision at S1. Only then reveal the next historical observation S2 to the evaluator and score the prediction.
5. At S2, assess the actual historic state, update beliefs from observations, re-root a fresh bounded multiverse and forecast S3.
6. Repeat through several real historical points. Preserve the difference between (a) actions which only affect information acquired by the policy and (b) external events it cannot control.
7. Compare a frozen static strategy with an adaptive policy under matched information-call budgets and the same evidence timestamps. Measure forecasting loss (for categorical/binary targets use predeclared Brier score), factual answer coverage and abstentions; do not invent value scores.
8. Never use later historic data to choose earlier actions. If a required state cannot be reconstructed from immutable historic evidence, mark `UNVERIFIABLE`, not `PASS`.

### Explicit restrictions

- No writes to the source repo: no issues, PRs, comments, reactions, commits, labels, merges, workflows, or automated actions.
- No access to Hybrid Mind, Facebook, Metricool publishing or analytics is necessary for this replacement.
- No customer data, private account metrics, access tokens, secrets, or unpublished documents in this public Test-LaB repository.
- No additional custom orchestration, cron, database, Skill package, Plugin or production integration.
- Any optional Test-LaB protocol/report write remains an experiment log only and is verified by readback.

## Status and next decision

- **Cancelled live intervention:** `CONFIRMED` — the previous Facebook timing experiment will not be executed.
- **Safer method chosen:** `PUBLIC_GITHUB_HISTORICAL_REPLAY`.
- **Historical replay result:** `NOT_RUN`; choose the repository, pre-register cutoffs, and freeze scoring rules before opening held-out events.
- **Actual real-world intervention uplift:** `NOT_APPLICABLE` in this read-only replay.

The important learning is a **constraint change at a decision point**: the best new action is not to continue an old plan; a newly stated production-safety constraint invalidates the live-publishing branch and re-roots selection into read-only measurement.
