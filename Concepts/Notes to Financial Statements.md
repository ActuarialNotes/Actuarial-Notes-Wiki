---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fc87c7b59c0944f26496f4193c76a6c72275acc0e62a32f876d4008fe1218ef3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Notes to Financial Statements.md
---

**The Notes to Financial Statements** are the narrative and tabular disclosures accompanying an insurer's primary statements. Under [[IFRS 17]] they carry an unusually heavy load: the standard's measurement is judgement-intensive and entity-specific, so the notes are where a reader learns **what the numbers mean** and whether two insurers' figures are comparable at all.

- **The IFRS 17 disclosures that matter most**, and which candidates should be able to list:
  - **Reconciliations** of the [[Liability for Remaining Coverage|LRC]], the [[Loss Component]] and the [[Liability for Incurred Claims|LIC]] from opening to closing balance, and of the [[Contractual Service Margin|CSM]] where one exists.
  - The **[[Risk Adjustment for Non-Financial Risk|risk adjustment]]'s confidence level**, and the level at which diversification is recognised.
  - The **[[IFRS 17 Discount Rates|discount rate]] methodology** (bottom-up or top-down) and the yield curves used.
  - The **[[Coverage Units]] driver** and the [[Insurance Acquisition Cash Flows|acquisition cash flow]] policy election.
  - **Claims development tables**, showing how each accident year's estimate has moved.
  - The **[[Transition to IFRS 17|transition]] approach** and a reconciliation of the CSM by approach.
- **Risk disclosures** under IFRS 7 and IFRS 17: insurance risk concentration, sensitivity analyses to key assumptions, credit exposure by reinsurer rating, liquidity maturity profiles, and market risk sensitivities.
- **Why the notes are not optional reading.** The risk adjustment, discount rate and coverage-unit choices are all levers on reported profit and equity. Two insurers with identical portfolios can report materially different results, and **only the notes reveal which choices were made**.
- **Materiality governs.** Disclosure is required where it is material to a user's understanding — see [[Materiality]]. An insurer cannot bury a significant judgement in boilerplate, and the [[External Auditor]] and the regulator both test this.
- The [[Appointed Actuary]]'s work underlies several notes directly — the liability reconciliations, the risk adjustment confidence level, the development tables and the sensitivity analyses — so the actuary is responsible for far more of the notes than of the primary statements.

> [!example]- Comparing Two Insurers Through the Notes {Example}
> Two P&C insurers report similar books and similar equity. Their notes disclose:
>
> - **Insurer A**: risk adjustment at the $85\text{th}$ percentile, diversification recognised at entity level; discount rate bottom-up with a $70$ basis point illiquidity premium.
> - **Insurer B**: risk adjustment at the $65\text{th}$ percentile, diversification at group level; discount rate top-down.
>
> What does an analyst conclude?
>
> > [!answer]-
> > **The reported figures are not comparable as they stand, and the notes say by how much.**
> >
> > - **Insurer A is more conservative on the risk adjustment.** An $85\text{th}$ percentile carries a materially larger margin than a $65\text{th}$ — on a heavy-tailed liability, plausibly twice as large. A holds a bigger liability, reports lower equity, and will release more into future profit as risk expires. It is *not* less profitable; it is more prudently stated.
> > - **Diversification level compounds it.** B recognises diversification at group level, which produces a *smaller* risk adjustment than entity-level recognition for the same portfolio. So B's margin is lower for two reasons, not one.
> > - **Discount rate method.** A's $70$ basis point illiquidity premium is disclosed and can be judged. B's top-down rate depends on its asset portfolio's yield less credit adjustments, which is harder to benchmark — the analyst should look for the resulting rate itself in the note, not just the method.
> >
> > **The adjustment an analyst would make:** restate B's risk adjustment to an $85\text{th}$-percentile equivalent before comparing equity, and compare the two discount curves at similar durations. Both restatements are possible **only because the confidence level and the method are required disclosures** — which is precisely why IFRS 17 requires them rather than prescribing a single margin.
