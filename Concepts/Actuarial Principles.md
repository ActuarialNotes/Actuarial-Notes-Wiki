---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ee9d0e6112abf432b91b1a1c285d9fa1801f01099f635495daa2d4afb2e23347
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Actuarial Principles.md
---

**Actuarial Principles**, in CAS usage, are the CAS **Statements of Principles**: short documents setting out what makes a property-casualty rate, a reserve estimate or a valuation actuarially sound. The statements describe themselves as the foundation for actuarial procedures and [[Actuarial Standards of Practice|standards of practice]]. The Exam 7 preamble's "basic Principles and Standards of Practice for unpaid claim estimation" is naturally read as the principles on **unpaid claims** together with the ASOPs.

> $$\text{Rate} = \widehat{E}\,[\text{future costs of the risk transfer}]$$

> $$\hat R_{\text{low}} \;\le\; \hat R_{\text{reasonable}} \;\le\; \hat R_{\text{high}}$$

- **The statements.** Each has a different status today:
  - **Ratemaking** (May 1988): a rate is an estimate of the expected value of future costs and provides for all of them; see [[Principles of Ratemaking]]. It was rescinded in December 2020 and then reinstated for reference in U.S.-regulated ratemaking.
  - **Loss and LAE Reserves** (May 1988): replaced in November 2014 by the **Statement of Principles Regarding Property and Casualty Unpaid Claims Estimates**.
  - **Valuations** (September 1989).
- **Why they were rescinded.** In December 2020 the CAS Board rescinded all three. It judged them unnecessary now that the ASOPs cover the same ground, and noted that principles, unlike standards, are not enforceable under the Code of Professional Conduct. Only the ratemaking statement was restored. The unpaid claims statement remains available as a historical and educational document, and it is still the clearest statement of the principles Exam 7 asks candidates to apply.
- **The three unpaid claims principles (2014).**
  1. An unpaid claims estimate is **reasonable** if it comes from reasonable assumptions and appropriate methods or models, and has been validated by appropriate indicators or tests. All of this is judged as of the review and valuation dates, in the context of the **intended measure**.
  2. The estimate is **inherently uncertain**, so "a range of estimates can be reasonable". This is the second block above; see [[Range of Indications]].
  3. **Actual payments will likely differ** from a reasonable estimate. They are known with certainty only when the last payment is made.
- **Definitions that do work.**
  - The **valuation date** is the date through which transactions are in the data. The **review date** is the later date through which known information is reflected. The **accounting date** is the cutoff for what counts as paid or unpaid.
  - The **intended measure** is what the number is meant to be. Examples include the mean, median, mode, actuarial central estimate, a mean plus risk margin, a high or low estimate, or a percentile, each nominal or discounted.
- **Scope.** The statement expressly covers insurance, **reinsurance, self-insurance** and other risk transfer or funding mechanisms. It also applies beyond financial reporting, for example to commutations, capital adequacy and ratemaking. That breadth is what makes it apply to the excess and [[Reinsurance Reserving|reinsurance]] liabilities named in Exam 7's preamble.
- **U.S. standards.** In the U.S. the enforceable counterparts are [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|ASOP 43]] for unpaid claim estimates and ASOP 36 for statements of opinion on reserves. In Canada the equivalent role is played by the CIA's [[Standards of Practice]].

> [!example]- Was the Old Estimate Wrong? {Example}
> Three years ago an actuary estimated unpaid claims for a book at $\$40$ million. The estimate used the chain ladder, BF and Cape Cod methods, the methods agreed within $5\%$, and diagnostics showed no calendar-year effects. Payments since, plus the current estimate of the remainder, now total $\$47$ million. The shortfall comes mostly from a court decision two years ago that expanded coverage retroactively.
>
> Was the original estimate unreasonable?
>
> > [!answer]-
> > **Not on these facts.**
> >
> > - **Principle 1** judges an estimate by its assumptions, methods and validation, *as of its review date*. The methods were appropriate and cross-checked, and the diagnostics were clean. The court decision was unknown and unknowable at the review date, so it cannot be held against the estimate.
> > - **Principle 3** expects actual payments to differ from a reasonable estimate. A $17.5\%$ adverse outcome is a realised outcome, not evidence of an unreasonable estimate.
> > - **Principle 2** implies the question to ask is whether $\$40$ million lay in a reasonable range *at the time*. Agreement within $5\%$ suggests it did.
> >
> > What the principles *would* criticise is an estimate that ignored a known pending case, or methods applied despite diagnostics showing their assumptions failed. The lesson for the current estimate is to reflect the decision explicitly and to state the intended measure.

> [!example]- The Intended Measure Changes the Number {Example}
> A captive's board asks its actuary for "the reserve". The actuarial central estimate of unpaid claims is $\$12.0$ million. A lognormal fit gives a 75th percentile of $\$13.1$ million. Management would like to book $\$11.0$ million, the low end of the methods' range.
>
> How do the principles frame this?
>
> > [!answer]-
> > All three figures could be reasonable estimates of *different intended measures*. The central estimate, the 75th percentile and a low estimate are each legitimate measures under the statement. What is not legitimate is to present one without saying which it is.
> >
> > - $\$11.0$M is reasonable only as a **low estimate**, and only if it genuinely comes from reasonable assumptions and appropriate methods. It cannot be relabelled as the central estimate.
> > - $\$13.1$M is **central estimate plus a risk margin** to a $75\%$ probability of adequacy (see [[Risk Margin]]).
> > - The report must state the intended measure, whether the figure is nominal or discounted, and the valuation and review dates. Without these the number is uninterpretable.
> >
> > Which measure the captive should *book* is a financial reporting question under its accounting framework. The principles only require that the actuary's number is reasonable *for the measure it claims to be*.
