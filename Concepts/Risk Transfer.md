---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:85134bef5fbba1e4809cf53371955d6be53265ed48c3ce9f6eee197a2848e88d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Transfer.md
---

**Risk Transfer** is the shifting of the financial consequences of uncertain events from one party to another — from policyholder to insurer, from insurer to [[Reinsurance|reinsurer]], or from either to the capital markets. In **[[Reinsurance Accounting]]** it has a narrower and decisive meaning: a contract qualifies for reinsurance accounting only if it transfers **significant insurance risk**; if it does not, it is a financing arrangement and must be accounted for as a deposit.

> $$\text{Insurance risk} = \text{Underwriting risk} + \text{Timing risk}$$

- **The two components.** *Underwriting risk* is uncertainty in the **amount** ultimately paid; *timing risk* is uncertainty in **when**. A contract transferring only timing risk — the reinsurer pays the same total, merely earlier or later — is a loan, not reinsurance.
- **The test.** Under [[IFRS 17]] a contract is an insurance contract only if it transfers **significant insurance risk**, meaning there is at least one scenario with commercial substance in which the issuer suffers a loss on a present-value basis. This is a *possibility* test rather than a probability threshold — importantly different from the US statutory "$10$-$10$" rule of thumb (a $10\%$ chance of a $10\%$ loss), which candidates should be able to contrast.
- **Features that destroy risk transfer:** loss ratio corridors, aggregate limits set just above the expected loss, retrospective premium adjustments that return favourable experience, profit commissions that claw back nearly all the margin, and cancellation provisions that let the reinsurer exit before losses emerge. Any of these can leave the reinsurer's outcome nearly independent of the cedant's experience.
- **The consequence of failing the test is severe:** deposit accounting. No ceded premium, no ceded losses, no improvement in the loss ratio — instead a deposit asset accruing interest. An insurer that booked a failed contract as reinsurance has overstated capital and understated liabilities.
- Risk transfer is assessed on the **contract as a whole**, including side letters and undocumented understandings — which is the point at which it becomes a governance and professionalism issue rather than a technical one.
- Beyond reinsurance, risk is transferred through catastrophe bonds and insurance-linked securities, and **retained** through captives, self-insurance and [[Deductible|deductibles]] — the alternatives against which a transfer's cost is judged.

> [!example]- Does This Contract Transfer Risk? {Example}
> An insurer cedes $\$50$ million of premium under an aggregate stop-loss attaching at a $95\%$ loss ratio with a $105\%$ exit, so the reinsurer's maximum payment is $10\%$ of subject premium. The cedant's expected loss ratio is $78\%$ with a standard deviation of $6$ points. There is a profit commission returning $90\%$ of the reinsurer's margin to the cedant.
>
> Does it transfer significant insurance risk?
>
> > [!answer]-
> > **Almost certainly not**, for two independent reasons.
> >
> > **1. The attachment point is remote.** Reaching $95\%$ requires a loss ratio $\frac{95 - 78}{6} = 2.83$ standard deviations above expected — under a normal approximation, roughly a $0.2\%$ probability. The layer is priced and structured so that it is unlikely ever to be entered.
> >
> > **2. The profit commission removes what remains.** Returning $90\%$ of the margin means that in the overwhelmingly likely scenario where no loss is ceded, the reinsurer keeps only $10\%$ of the premium and returns the rest. The reinsurer's outcome is nearly deterministic: a fee for holding money.
> >
> > **Conclusion.** There is no scenario with commercial substance in which the reinsurer suffers a significant loss on a present-value basis. The contract is a financing arrangement and must be recorded under **deposit accounting**.
> >
> > **What the [[Appointed Actuary]] should do.** Say so, in writing, before the contract is booked as reinsurance. If it is booked as reinsurance, the ceded premium improperly reduces the loss ratio, the [[MCT]] ratio is overstated through improper credit for ceded liabilities, and the financial statements are misstated. That is a matter with material adverse effects on financial condition, engaging the [[Duty to Report]] escalation under the [[Insurance Companies Act]].
> >
> > **What would fix it:** lower the attachment to a level the cedant's experience can plausibly reach, widen the layer, and remove or sharply reduce the profit commission. Any one of those changes the answer; all three together make it plainly reinsurance.
