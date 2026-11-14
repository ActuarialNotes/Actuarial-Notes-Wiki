---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9cde789ffbf6b1571890adb4663bbd6ba4c7e39818f907fc667a255d5c323e46
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Notes to Financial Statements.md
---

![[Media/Figures/Notes_to_Financial_Statements.svg|340]]

The **Notes to Financial Statements** are the narrative and tabular disclosures accompanying an insurer's primary statements. Under [[IFRS 17]], whose measurement is judgement-intensive and entity-specific, the notes are where a reader learns what the numbers mean and whether two insurers' figures are comparable.

The IFRS 17 disclosures that matter most are:

1. Reconciliations from opening to closing balance of the [[Liability for Remaining Coverage|liability for remaining coverage]], the [[Loss Component|loss component]] and the [[Liability for Incurred Claims|liability for incurred claims]], and of the [[Contractual Service Margin|contractual service margin]] where one exists.
2. The [[Risk Adjustment for Non-Financial Risk|risk adjustment]]'s confidence level, and the level at which diversification is recognised.
3. The [[IFRS 17 Discount Rates|discount rate]] methodology (bottom-up or top-down) and the yield curves used.
4. The [[Coverage Units|coverage units]] driver and the [[Insurance Acquisition Cash Flows|acquisition cash flow]] policy election.
5. Claims development tables, showing how each accident year's estimate has moved.
6. The [[Transition to IFRS 17|transition]] approach, and a reconciliation of the contractual service margin by approach.

The risk disclosures under IFRS 7 and IFRS 17 add insurance risk concentration, sensitivity analyses to key assumptions, credit exposure by reinsurer rating, liquidity maturity profiles and market risk sensitivities.

> [!idea] The idea
> The risk adjustment, discount rate and coverage-unit choices are all levers on reported profit and equity, and only the notes reveal which choices were made.

Two insurers with identical portfolios can therefore report materially different results.

> [!example]- Are these two insurers' reported figures comparable? {Example}
> Two P&C insurers report similar books and similar equity. Their notes disclose:
>
> | | Insurer A | Insurer B |
> | :--- | :--- | :--- |
> | Risk adjustment confidence level | $85\text{th}$ percentile | $65\text{th}$ percentile |
> | Diversification recognised at | Entity level | Group level |
> | Discount rate | Bottom-up, with a $70$ basis point illiquidity premium | Top-down |
>
> > [!answer]-
> > - An $85\text{th}$ percentile carries a materially larger margin than a $65\text{th}$, so Insurer A holds a bigger liability and reports lower equity.
> > - A is not less profitable. It is more prudently stated, and it will release more into future profit as risk expires.
> > - B recognises diversification at group level, which produces a smaller risk adjustment than entity-level recognition for the same portfolio. B's margin is lower for two reasons.
> > - A's $70$ basis point illiquidity premium is disclosed and can be judged. B's top-down rate depends on its asset portfolio's yield less credit adjustments, so the analyst should look for the resulting rate itself in the note.
> > - The reported figures are not comparable as they stand. An analyst would restate B's risk adjustment to an $85\text{th}$-percentile equivalent before comparing equity, and compare the two discount curves at similar durations.
> > - Both restatements are possible only because the confidence level and the method are required disclosures.

## Materiality

Disclosure is required where it is [[Materiality|material]] to a user's understanding. An insurer cannot bury a significant judgement in boilerplate, and the [[External Auditor|external auditor]] and the regulator both test this.

## The appointed actuary and the notes

The [[Appointed Actuary|appointed actuary]]'s work underlies several notes directly: the liability reconciliations, the risk adjustment confidence level, the development tables and the sensitivity analyses. The actuary is therefore responsible for far more of the notes than of the primary statements.
