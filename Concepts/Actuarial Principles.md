---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e08569c69951beec709080ff88d8c40230ecd0116f167b4fd7fbb56bdfb12b71
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Actuarial Principles.md
---

An **Actuarial Principle**, in CAS usage, is a principle set out in one of the CAS **Statements of Principles**, short documents setting out what makes a property-casualty rate, a reserve estimate or a valuation actuarially sound. The statements describe themselves as the foundation for actuarial procedures and [[Actuarial Standards of Practice|standards of practice]].

There were three statements, and each has a different status today:

- **Ratemaking** (May 1988): a rate is an estimate of the expected value of future costs and provides for all of them. These are the [[Principles of Ratemaking|principles of ratemaking]]. The statement was rescinded in December 2020 and then reinstated for reference in U.S.-regulated ratemaking.
- **Loss and LAE Reserves** (May 1988): replaced in November 2014 by the **Statement of Principles Regarding Property and Casualty Unpaid Claims Estimates**.
- **Valuations** (September 1989).

In December 2020 the CAS Board rescinded all three. It judged them unnecessary now that the ASOPs cover the same ground, and noted that principles, unlike standards, are not enforceable under the Code of Professional Conduct. Only the ratemaking statement was restored. The unpaid claims statement remains available as a historical and educational document.

In the U.S. the enforceable counterparts are [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|ASOP 43]] for unpaid claim estimates and ASOP 36 for statements of opinion on reserves. In Canada the CIA's [[Standards of Practice]] play the same role.

## The unpaid claims principles

The 2014 statement on [[Unpaid Claims|unpaid claims]] sets out three principles:

1. An unpaid claims estimate is **reasonable** if it comes from reasonable assumptions and appropriate methods or models, and has been validated by appropriate indicators or tests. All of this is judged as of the review and valuation dates, in the context of the intended measure.
2. The estimate is **inherently uncertain**, so "a range of estimates can be reasonable" ([[Range of Indications|range of indications]]).
3. **Actual payments will likely differ** from a reasonable estimate. They are known with certainty only when the last payment is made.

The statement expressly covers insurance, **reinsurance, self-insurance** and other risk transfer or funding mechanisms. It also applies beyond financial reporting, for example to commutations, capital adequacy and ratemaking. That breadth is what makes it apply to excess and [[Reinsurance Reserving|reinsurance]] liabilities.

> [!example]- Was this actuary's original estimate unreasonable? {Example}
> Three years ago an actuary estimated unpaid claims for a book at $\$40$ million. The estimate used the chain ladder, BF and Cape Cod methods, the methods agreed within $5\%$, and diagnostics showed no calendar-year effects. Payments since, plus the current estimate of the remainder, now total $\$47$ million. The shortfall comes mostly from a court decision two years ago that expanded coverage retroactively.
>
> > [!answer]-
> > - Principle 1 judges an estimate by its assumptions, methods and validation as of its review date. The methods were appropriate and cross-checked, and the diagnostics were clean.
> > - The court decision was unknown at the review date, so it cannot be held against the estimate.
> > - Principle 3 expects actual payments to differ from a reasonable estimate, so a $17.5\%$ adverse outcome is not by itself evidence of an unreasonable estimate.
> > - Principle 2 makes the question whether $\$40$ million lay in a reasonable range at the time, and agreement within $5\%$ suggests it did.
> > - The original estimate was not unreasonable. The current estimate should reflect the decision explicitly and state its intended measure.

## Dates and the intended measure

The statement defines three dates:

- The **valuation date** is the date through which transactions are in the data.
- The **review date** is the later date through which known information is reflected.
- The **accounting date** is the cutoff for what counts as paid or unpaid.

The **intended measure** is what the number is meant to be. Examples include the mean, median, mode, actuarial central estimate, a mean plus [[Risk Margin|risk margin]], a high or low estimate, or a percentile, each nominal or discounted.

> [!example]- Which of these three figures could the captive's actuary present as a reasonable estimate? {Example}
> A captive's board asks its actuary for "the reserve". The actuarial central estimate of unpaid claims is $\$12.0$ million. A lognormal fit gives a 75th percentile of $\$13.1$ million. Management would like to book $\$11.0$ million, the low end of the methods' range.
>
> > [!answer]-
> > - Each figure can be a reasonable estimate of a different intended measure: the central estimate, a percentile and a low estimate are all legitimate measures under the statement.
> > - $\$11.0$ million is reasonable only as a low estimate, and only if it comes from reasonable assumptions and appropriate methods. It cannot be relabelled as the central estimate.
> > - $\$13.1$ million is the central estimate plus a risk margin to a $75\%$ probability of adequacy.
> > - Any of the three can be presented, provided the report states the intended measure, whether the figure is nominal or discounted, and the valuation and review dates.
