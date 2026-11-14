---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9954828d618aa17b29114c1794adbfdf5f35cbd7011204bc1b05aae68c987324
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Finite Reinsurance.md
---

![[Media/Figures/Finite_Reinsurance.svg|340]]

**Finite Reinsurance** is reinsurance in which the reinsurer's aggregate liability is tightly limited and the contract returns most of the economic result to the cedant. Its purpose is usually timing and financing rather than risk transfer, which puts it at the boundary of what may be accounted for as reinsurance at all.

When the contract's features remove most of the underwriting risk, the reinsurer's outcome is

> $$\text{Reinsurer's outcome} \approx \text{Fee} + \text{Investment margin}$$

- $\text{Fee}$ is the part of the premium the reinsurer keeps when it returns the rest to the cedant.
- $\text{Investment margin}$ is what the reinsurer earns by holding and investing the premium.

The economic substance is often a loan. The cedant pays premium, the reinsurer holds and invests it, and returns it less a fee, with or without a shift in when losses are recognised.

The typical features of a finite contract are:

1. A low aggregate limit relative to the premium.
2. An experience account crediting the cedant with premium plus interest less losses, refundable at expiry.
3. A profit commission returning most of the margin.
4. A multi-year term, so losses in one year can be offset by another.
5. A cancellation provision protecting the reinsurer.

## Risk transfer and deposit accounting

[[Risk Transfer|Risk transfer]] is the decisive test. Under [[IFRS 17]] the contract is insurance only if there is a scenario with commercial substance in which the reinsurer suffers a significant loss on a present-value basis. Where the features above make the reinsurer's outcome nearly deterministic, there is no such scenario and deposit accounting applies.

The assessment must consider all terms, disclosed or not. A side letter, an undisclosed agreement limiting the reinsurer's exposure under a contract that appears to transfer risk on its face, misrepresents the financial statements.

> [!example]- How should the appointed actuary respond to this contract? {Example}
> The CFO presents a three-year aggregate contract and wants it booked as reinsurance to improve the reported loss ratio:
>
> | Term | Value |
> | :--- | :--- |
> | Annual premium | $\$25$ million |
> | Aggregate limit, three years | $\$30$ million |
> | Experience account | Premium plus 3% interest less paid losses, 90% of any balance returned at expiry |
> | Cancellation | Reinsurer may cancel after year 2 |
> | Expected annual ceded losses | $\$8$ million, standard deviation $\$3$ million |
>
> > [!answer]-
> > - Expected losses over three years are $\$24$ million against $\$75$ million of premium, a loss ratio of 32%.
> > - If the years are independent, the three-year standard deviation is $3\sqrt{3} = \$5.2$ million, so the $\$30$ million limit is only about 1.2 standard deviations above expected losses.
> > - The experience account returns 90% of the balance, and the cancellation right lets the reinsurer exit before a deteriorating third year.
> > - There is no scenario with commercial substance in which the reinsurer loses significantly, so the contract is a financing arrangement and requires deposit accounting.
> > - Booked as reinsurance, it would improve the loss ratio by amounts that are not recoveries and overstate the [[MCT]] ratio, so the actuary says so in writing before it is booked.
> > - The actuary asks explicitly about side letters and records the answer in the file.
> > - If it is booked anyway, the matter has material adverse effects on the company's financial condition. The [[Appointed Actuary|appointed actuary]] reports to the CEO and CFO, then the directors, then [[OSFI]], the [[Duty to Report]] path under the [[Insurance Companies Act]], with s. 361 protection from civil liability for doing so in good faith.
> > - Noting the concern privately, or accepting an assurance that the auditors are comfortable, is not acceptable. The [[Standards of Practice]] do not permit deferring the judgement to someone else.

## Scrutiny and legitimate uses

Finite arrangements were at the centre of major accounting scandals in the 2000s, in which contracts with no real risk transfer were booked as reinsurance to improve reported loss ratios and capital. The regulatory response is now standard: enhanced disclosure, attestation by senior officers that no undisclosed side agreements exist, and closer actuarial review.

Finite reinsurance is not improper in itself. Its legitimate uses include smoothing results across a multi-year programme, financing a run-off and funding a specific exposure. What is improper is accounting for it as risk transfer when it is not.

> [!trap] Judging risk transfer from the contract alone
> A contract can transfer risk on its face while a side letter limits the reinsurer's exposure. Ask about side agreements and assess all the terms together before concluding that risk is transferred.
