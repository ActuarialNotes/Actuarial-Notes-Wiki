---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:39bab52f0f9091a9406dcfde3e3a981e5c5cf16e24c1b113b3cddd8f9030b47a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Finite Reinsurance.md
---

**Finite Reinsurance** is reinsurance in which the reinsurer's aggregate liability is tightly limited and the contract contains features — experience accounts, profit commissions, retrospective premium adjustments, multi-year terms — that return most of the economic result to the cedant. Its purpose is usually **timing and financing** rather than risk transfer, which is why it sits at the boundary of what may be accounted for as reinsurance at all.

> $$\text{Reinsurer's outcome} \approx \text{Fee} + \text{Investment margin}$$

- **Typical features:** a low aggregate limit relative to premium; an experience account crediting the cedant with premium plus interest less losses, refundable at expiry; a profit commission returning most of the margin; multi-year terms allowing losses in one year to be offset by another; and a cancellation provision protecting the reinsurer.
- **The economic substance** is often a loan: the cedant pays premium, the reinsurer holds and invests it, and returns it (less a fee) with or without a timing shift in when losses are recognised. Genuine underwriting risk transferred is small.
- **[[Risk Transfer]] is the decisive test.** Under [[IFRS 17]] the contract is insurance only if there is a scenario with commercial substance in which the reinsurer suffers a significant loss on a present-value basis. Where the features above make the reinsurer's outcome nearly deterministic, the answer is no and **deposit accounting** applies.
- **Why it attracted scrutiny.** Finite arrangements were at the centre of major accounting scandals in the 2000s, in which contracts with no real risk transfer were booked as reinsurance to improve reported loss ratios and capital. The regulatory response — enhanced disclosure, attestation by senior officers that no undisclosed side agreements exist, and closer actuarial review — is now standard.
- **Side letters are the classic vice.** An arrangement that appears to transfer risk on its face, with an undisclosed agreement limiting the reinsurer's exposure, is a misrepresentation of the financial statements. Assessment must consider **all** terms, disclosed or not.
- **Legitimate uses exist** — smoothing results across a multi-year programme, financing a run-off, or funding a specific exposure — and finite reinsurance is not improper in itself. What is improper is accounting for it as risk transfer when it is not.

> [!example]- What the Actuary Must Do {Example}
> The CFO presents a three-year aggregate contract: annual premium $\$25$ million, aggregate limit $\$30$ million across three years, an experience account crediting premium plus $3\%$ interest less paid losses with $90\%$ of any balance returned at expiry, and a cancellation right for the reinsurer after year 2. Expected annual ceded losses are $\$8$ million with a standard deviation of $\$3$ million. The CFO wants it booked as reinsurance to improve the reported loss ratio.
>
> What should the [[Appointed Actuary]] do?
>
> > [!answer]-
> > **First, assess risk transfer on the substance, and the analysis is not close.**
> >
> > Expected losses over three years are $\$24$ million against premium of $\$75$ million — a loss ratio of $32\%$. The aggregate limit of $\$30$ million is only $2$ standard deviations above expected losses on a three-year basis, so the reinsurer's exposure above expectation is small to begin with. Then the experience account returns $90\%$ of the balance, and the cancellation right lets the reinsurer exit before a deteriorating third year.
> >
> > **Conclusion: there is no scenario with commercial substance in which the reinsurer loses significantly.** The contract is a financing arrangement and requires **deposit accounting**.
> >
> > **Second, say so, in writing, before it is booked.** The consequences of booking it as reinsurance are that the loss ratio is improved by amounts that are not recoveries, the [[MCT]] ratio is overstated through improper credit for ceded liabilities, and the financial statements are materially misstated.
> >
> > **Third, escalate if it is booked anyway.** This is a matter with material adverse effects on the financial condition of the company: report to the CEO and CFO, then the **directors**, then [[OSFI]] — the [[Duty to Report]] path under the [[Insurance Companies Act]], with the s. 361 protection from civil liability for doing so in good faith.
> >
> > **Fourth, ask about side letters explicitly** and document the answer. An arrangement of this shape is exactly the case where an undisclosed agreement would be found, and the actuary's file should record that the question was asked.
> >
> > **What is *not* an acceptable response:** noting the concern privately, or accepting the CFO's assurance that "the auditors are comfortable." The valuation and the opinion are the actuary's, and the [[Standards of Practice]] do not permit deferring the judgement to someone else.
