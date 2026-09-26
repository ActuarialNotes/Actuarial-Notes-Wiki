---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3fec7bf9d964d1e81366a9cba5612919ac186abd4f928b1aacd20f0d953b2b8e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mass Tort.md
---

**A Mass Tort** is a civil wrong that injures large numbers of people through a common cause — a product, substance, drug, device or course of conduct — producing thousands of individual claims against the same defendants and, through them, their liability insurers. Unlike a [[Class Action]], claimants usually keep their own claims, but courts aggregate them: federal **multidistrict litigation** (MDL) consolidates pretrial proceedings before one judge, **bellwether** trials test values, and global settlements or bankruptcy trusts resolve the inventory.

> $$\text{Insurer cost} = N \times \pi \times \bar{S} \times \alpha$$

- $N$ is the number of claimants who will ultimately file, $\pi$ the proportion who are compensated, $\bar{S}$ the average payment per compensated claim, and $\alpha$ the insurer's share after allocation across the defendants' policies. Mass torts are **frequency-driven**: most of the uncertainty is in $N$, which depends on latency, advertising, litigation funding and filing deadlines, while bellwether verdicts and settlement grids reset $\bar{S}$.
- **Examples:** [[Asbestos]], silica, breast implants, opioids, talc, PFAS and herbicides. Many arise from [[Latent Liability|latent]] exposures and are brought under [[Tort Law|strict product liability]].
- **Number of occurrences.** Whether thousands of injuries are one occurrence or many decides how many deductibles or self-insured retentions apply, how many per-occurrence limits are available, and whether aggregate limits cap the total — and the same question recurs in the insurer's per-occurrence [[Reinsurance|reinsurance]]. Most courts look to the *cause* of the injuries rather than their number, but the answer turns on policy wording and state law, and each party's preferred answer depends on claim size.
- **Correlation.** One mass tort strikes every policy year, every insurer on the defendant's programme and their reinsurers simultaneously. The independence that ordinary reserving and capital models assume fails, which is why mass torts are a named source of reserve risk and clash in reinsurance.
- **Reserving.** There is no development triangle for a new mass tort. Reserves come from projecting the claim inventory ($N$, $\pi$, $\bar{S}$) and mapping it through coverage, with coverage disputes adding [[Litigation Costs|litigation cost]] classified as AO.
- Resolution through **bankruptcy** — a trust funded partly by insurance, with a channelling injunction sending present and future claims to it — began with asbestos and has spread to other mass torts, turning the insurer's position into a negotiated contribution to the trust.

> [!example]- Who Wants One Occurrence? {Example}
> A manufacturer's liability policy has a $\$100{,}000$ per-occurrence deductible, a $\$1{,}000{,}000$ per-occurrence limit and no aggregate limit. Fifty product claims arise from the same defective design. Compute the insurer's payment if the claims are treated as one occurrence or as fifty, when each claim settles for (a) $\$400{,}000$, (b) $\$80{,}000$.
>
> > [!answer]-
> > **(a) Each claim $\$400{,}000$; total $\$20$M.**
> >
> > $$
> > \begin{align*}
> > \text{One occurrence} &= \min(\$20{,}000{,}000 - \$100{,}000,\ \$1{,}000{,}000) \\
> > &= \$1{,}000{,}000 \\[4pt]
> > \text{Fifty occurrences} &= 50 \times \min(\$300{,}000,\ \$1{,}000{,}000) \\
> > &= \$15{,}000{,}000
> > \end{align*}
> > $$
> >
> > **(b) Each claim $\$80{,}000$; total $\$4$M.**
> >
> > $$
> > \begin{align*}
> > \text{One occurrence} &= \min(\$4{,}000{,}000 - \$100{,}000,\ \$1{,}000{,}000) \\
> > &= \$1{,}000{,}000 \\[4pt]
> > \text{Fifty occurrences} &= 50 \times \$0 \\
> > &= \$0
> > \end{align*}
> > $$
> >
> > With large claims the policyholder argues for fifty occurrences (fifty limits) and the insurer for one; with small claims the positions reverse, because fifty deductibles swallow every claim. The legal characterisation of a mass tort can move the insurer's cost by an order of magnitude with no change in the underlying injuries — which is why the occurrence question is litigated so heavily and why an actuary must reserve under the interpretation actually likely to prevail.
