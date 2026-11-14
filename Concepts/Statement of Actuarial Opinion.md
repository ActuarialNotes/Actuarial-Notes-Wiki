---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:121fba1a01a3ebc773251765c2202d3b999ade8831e5278584db350edd9e6760
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Statement of Actuarial Opinion.md
---
![[Media/Figures/Statement_of_Actuarial_Opinion.svg|340]]

The **Statement of Actuarial Opinion** is the [[Appointed Actuary|appointed actuary]]'s formal written opinion on the [[Insurance Contract Liabilities|insurance contract liabilities]] an insurer carries, filed with the [[Canadian Annual Return]] and included in the financial statements. It states whether the amount makes appropriate provision for all policy obligations and whether the financial statements fairly present the results of the valuation.

The Canadian opinion has three parts:

1. A **scope** paragraph identifying what was valued and as at what date.
2. A statement on the **data**: that the actuary verified their consistency with the financial statements and found them sufficient and reliable for the valuation.
3. The **opinion** itself: that the liabilities were valued in accordance with [[Accepted Actuarial Practice]] and make appropriate provision.

The opinion is supported by, and must be read with, the [[Appointed Actuary's Report]], which documents the data, methods, assumptions and selections behind it.

## Types of opinion

The opinion takes one of four forms:

- An **unqualified** opinion.
- A **qualified** opinion, where some component prevents an unreserved conclusion.
- An **adverse** opinion, where the amount carried does not make appropriate provision.
- A **denial of opinion**, where the actuary cannot form one at all, most often because the data are inadequate.

The opinion is on the amount carried, not on the actuary's own estimate. The question is whether the reported liability makes appropriate provision, so a carried figure below the range of reasonable estimates cannot receive a clean opinion, however the estimate was produced.

> [!example]- Which opinion does the actuary give if the carried liability is $\$412$ million, and which if it is $\$380$ million? {Example}
> The actuary's range of reasonable estimates is $\$395$ million to $\$440$ million, with a central estimate of $\$418$ million.
>
> > [!answer]-
> > - $\$412$ million is within the range, slightly below the central estimate, which is a legitimate carrying position.
> > - The opinion on $\$412$ million is **unqualified**. The [[Appointed Actuary's Report]] would note that it is toward the low end and quantify what that implies for future development.
> > - $\$380$ million is $\$15$ million below the bottom of the range, so the amount carried does not make appropriate provision.
> > - The opinion on $\$380$ million is **adverse**, and it must say so and quantify the deficiency.

## Data sufficiency

If data are so deficient that the valuation cannot be relied upon, the actuary cannot add a margin and sign. The [[Standards of Practice]] require the deficiency to be stated and, if it is severe enough, the opinion to be qualified or denied.

> [!example]- Which opinion is available when a newly acquired subsidiary's claim data, $22\%$ of the liabilities, can't be reconciled to its financial statements? {Example}
> - At $22\%$ of the liabilities, unreconcilable data are material.
> - If the actuary can value the remaining $78\%$ and identify the affected portion, a **qualified** opinion excluding that component is appropriate.
> - If the deficiency contaminates the whole valuation, the opinion must be **denied**.
> - Signing an unqualified opinion with a private note in the file is not available.

## Subsequent events

[[Subsequent Events]] must be considered up to the date the opinion is signed. An event that provides evidence of conditions existing at the valuation date requires the liability to be adjusted.

> [!example]- What does the actuary do before giving the opinion? {Example}
> The carried liability is within the range. Three weeks after year end, and before the opinion is signed, a court decision widens a benefit definition affecting $\$30$ million of open claims.
>
> > [!answer]-
> > - The decision interprets the law as it always was, so the obligation existed at year end.
> > - It is a subsequent event that provides evidence of conditions at the valuation date, so the liability must be adjusted before the opinion is given.
> > - If the carried amount is restated to include the $\$30$ million and stays within the range, the opinion is unqualified.
> > - If management refuses to restate, the carried amount is now below the range and the opinion becomes **adverse**.
