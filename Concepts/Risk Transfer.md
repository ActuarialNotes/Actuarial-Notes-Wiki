---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:9ca9f70da9889a7fe0e630c4aca5c490118b0cb27f512499bc5a6392227bb00e
  sources:
    - "Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.3 pp.51-53 (PDF pp.70-72), sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s10-02 pooling and transfer, sha256:a643d7b54dd325ce18405f2c482ebef89986853c6894651046d3f112a552cc04 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s10-02-nature-of-insurance.html"
    - "Biniam G., Bonga University, Risk Management and Insurance Chapter Two (lecture notes, 2020), pp.2-3, 10, sha256:37410f48587eebe39188d15f5aa51af832d85f8179229edc0b3d9dd322165f01 — http://ndl.ethernet.edu.et/bitstream/123456789/79433/7/RISK-%20Ch@2.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Transfer.md
---
![[Media/Figures/Risk_Transfer.svg|340]]

**Risk Transfer** is the shifting of the financial consequences of uncertain events from one party to another, such as from policyholder to insurer, from insurer to [[Reinsurance|reinsurer]], or from either to the capital markets. In [[Reinsurance Accounting|reinsurance accounting]] it has a narrower meaning: a contract qualifies for reinsurance accounting only if it transfers **significant insurance risk**.

## Insurance as a risk management technique

For the organization buying it, insurance combines two things: *transfer* of the financial consequences of a loss to an insurer, and *pooling* of many similar exposures by that insurer, which makes losses predictable through the [[Law of Large Numbers|law of large numbers]]. It suits exposures that are low in frequency and high in severity and have the characteristics of an [[Insurable Risk|insurable risk]]. It cannot replace sentimental value. A premium for frequent small losses would be large next to the losses themselves, which is why [[Deductible|deductibles]] retain them, a choice of [[Risk Treatment|risk treatment]].

The risk manager sorts the coverages into three groups:

1. *essential* insurance, required by law or contract, such as workers compensation, or protecting against a loss that threatens survival;
2. *desirable* insurance, for losses that would cause financial difficulty but not bankruptcy;
3. *available* insurance, for slight losses that would only be an inconvenience.

The manager then selects insurers by financial strength, services and cost, negotiates the terms, tells the organization what is covered and what records to keep, and reviews the program periodically.

> [!example]- How should this contractor's coverages be sorted into essential, desirable and available insurance? {Example}
> A small building contractor has a limited insurance budget. Its exposures are:
>
> - injuries to its employees, in a state that requires workers compensation;
> - a liability claim from a collapsed structure that could exceed the firm's net worth;
> - theft of hand tools worth a few hundred dollars at a time;
> - damage to its \$400,000 equipment yard, which would be a serious setback but not fatal.
>
> Its bank requires property insurance on the equipment it finances.
>
> > [!answer]-
> > - Workers compensation is essential, because the law requires it.
> > - Liability insurance is essential, because a large claim threatens the firm's survival.
> > - Property insurance on the financed equipment is essential, because the loan contract requires it.
> > - Property insurance on the rest of the yard is desirable, because its loss would cause financial difficulty but not bankruptcy.
> > - Theft of hand tools is available insurance at most. It is a frequent, small loss better retained and controlled, for example with locked storage.

After a loss the firm is indemnified and can keep operating. Uncertainty and worry are reduced, insurers provide services such as loss control and claims adjusting, and premiums are deductible as a business expense. Against this, premiums are a major cost paid in advance, money that could otherwise stay in the business. Negotiating coverage takes time and effort, and an insured may take less care over loss control ([[Moral Hazard|moral hazard]]).

## Noninsurance transfer

Risk also moves by contract without insurance: hold-harmless and indemnity clauses in leases and service contracts, warranties, and surety bonds. These shift the loss to another party but depend on that party's ability to pay. Risk is also transferred through catastrophe bonds and insurance-linked securities. It is **retained** through captives, self-insurance and deductibles, the alternatives against which a transfer's cost is judged.

## Risk transfer in reinsurance accounting

The insurance risk a contract can transfer is

> $$\text{Insurance risk} = \text{Underwriting risk} + \text{Timing risk}$$

- $\text{Underwriting risk}$ is uncertainty in the **amount** ultimately paid.
- $\text{Timing risk}$ is uncertainty in **when** it is paid.

A contract transferring only timing risk, where the reinsurer pays the same total earlier or later, is a loan, not reinsurance. Under [[IFRS 17]] a contract is an insurance contract only if it transfers significant insurance risk, meaning there is at least one scenario with commercial substance in which the issuer suffers a loss on a present-value basis.

Features that can leave the reinsurer's outcome nearly independent of the cedant's experience destroy risk transfer:

- loss ratio corridors;
- aggregate limits set just above the expected loss;
- retrospective premium adjustments that return favourable experience;
- profit commissions that claw back nearly all the margin;
- cancellation provisions that let the reinsurer exit before losses emerge.

Risk transfer is assessed on the **contract as a whole**, including side letters and undocumented understandings. A contract that fails is a financing arrangement, accounted for as a deposit: no ceded premium, no ceded losses and no improvement in the loss ratio, but a deposit asset accruing interest. An insurer that booked a failed contract as reinsurance has overstated capital and understated liabilities.

> [!example]- Does this aggregate stop-loss transfer significant insurance risk? {Example}
> An insurer cedes $\$50$ million of premium under an aggregate stop-loss attaching at a $95\%$ loss ratio with a $105\%$ exit, so the reinsurer's maximum payment is $10\%$ of subject premium. The cedant's expected loss ratio is $78\%$ with a standard deviation of $6$ points. A profit commission returns $90\%$ of the reinsurer's margin to the cedant.
>
> > [!answer]-
> > - Reaching $95\%$ needs a loss ratio $(95 - 78)/6 = 2.83$ standard deviations above expected, about a $0.2\%$ probability under a normal approximation.
> > - In the likely case that no loss is ceded, the profit commission leaves the reinsurer only $10\%$ of its margin. Its outcome is a fee for holding money.
> > - There is no scenario with commercial substance in which the reinsurer suffers a significant loss on a present-value basis.
> > - The contract is a financing arrangement and must be recorded under **deposit accounting**.
> > - Booked as reinsurance, it would improperly reduce the loss ratio and overstate the [[MCT]] ratio. The [[Appointed Actuary]] should say so in writing, and a material misstatement engages the [[Duty to Report]] under the [[Insurance Companies Act]].
> > - A lower attachment, a wider layer or a much smaller profit commission would each change the answer.

> [!trap] Reading the significance test as a probability threshold
> The IFRS 17 test asks whether a scenario with commercial substance exists in which the issuer loses on a present-value basis. It is a possibility test, unlike the US statutory "$10$-$10$" rule of thumb (a $10\%$ chance of a $10\%$ loss).
