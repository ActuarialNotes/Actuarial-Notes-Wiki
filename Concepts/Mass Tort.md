---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:70028f725fc0cd0deb968ce3bc20c3338589b1c34a44f5f2397ee510eb0a1cff
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mass Tort.md
---
A **Mass Tort** is a civil wrong that injures large numbers of people through a common cause, such as a product, substance, drug, device or course of conduct. It produces thousands of individual claims against the same defendants and, through them, their liability insurers.

Unlike in a [[Class Action|class action]], claimants usually keep their own claims, but courts aggregate them. Federal **multidistrict litigation** (MDL) consolidates pretrial proceedings before one judge, **bellwether** trials test claim values, and global settlements or bankruptcy trusts resolve the inventory of claims. Examples include [[Asbestos|asbestos]], silica, breast implants, opioids, talc, PFAS and herbicides. Many arise from [[Latent Liability|latent]] exposures and are brought under [[Tort Law|strict product liability]].

An insurer's cost from a mass tort is

> $$\text{Insurer cost} = N \times \pi \times \bar{S} \times \alpha$$

- $N$ is the number of claimants who will ultimately file.
- $\pi$ is the proportion of claimants who are compensated.
- $\bar{S}$ is the average payment per compensated claim.
- $\alpha$ is the insurer's share after allocation across the defendants' policies.

Mass torts are **frequency-driven**. Most of the uncertainty is in $N$, which depends on latency, advertising, litigation funding and filing deadlines, while bellwether verdicts and settlement grids reset $\bar{S}$.

## Number of occurrences

Whether thousands of injuries are one occurrence or many decides how many deductibles or self-insured retentions apply, how many per-occurrence limits are available, and whether aggregate limits cap the total. The same question recurs in the insurer's per-occurrence [[Reinsurance|reinsurance]]. Most courts look to the *cause* of the injuries rather than their number, but the answer turns on policy wording and state law. Each party's preferred answer depends on claim size.

> [!example]- Who wants one occurrence, the insurer or the manufacturer? {Example}
> A manufacturer's liability policy has a $\$100{,}000$ per-occurrence deductible, a $\$1{,}000{,}000$ per-occurrence limit and no aggregate limit. Fifty product claims arise from the same defective design. Each claim settles for (a) $\$400{,}000$ or (b) $\$80{,}000$.
>
> > [!answer]-
> > - (a) The claims total $50 \times \$400{,}000 = \$20{,}000{,}000$.
> > - As one occurrence, the insurer pays $\min(\$19{,}900{,}000,\ \$1{,}000{,}000) = \$1{,}000{,}000$.
> > - As fifty occurrences, it pays $50 \times \min(\$300{,}000,\ \$1{,}000{,}000) = \$15{,}000{,}000$.
> > - (b) The claims total $50 \times \$80{,}000 = \$4{,}000{,}000$.
> > - As one occurrence, the insurer pays $\min(\$3{,}900{,}000,\ \$1{,}000{,}000) = \$1{,}000{,}000$.
> > - As fifty occurrences, each claim is below the deductible, so it pays $\$0$.
> > - With large claims the manufacturer argues for fifty occurrences and the insurer for one. With small claims the positions reverse, because fifty deductibles absorb every claim.
> > - The legal characterisation moves the insurer's cost by an order of magnitude with no change in the injuries, so the actuary reserves under the interpretation likely to prevail.

## Correlation across policies

One mass tort strikes every policy year, every insurer on the defendant's programme and their reinsurers at the same time. The independence that ordinary reserving and capital models assume fails. This is why mass torts are a named source of reserve risk and of clash in reinsurance.

## Reserving for a mass tort

There is no development triangle for a new mass tort. Reserves come from projecting the claim inventory ($N$, $\pi$ and $\bar{S}$) and mapping it through coverage. Coverage disputes add [[Litigation Costs|litigation cost]], classified as AO.

## Resolution through bankruptcy

A defendant can resolve a mass tort through **bankruptcy**: a trust funded partly by insurance, with a channelling injunction sending present and future claims to it. This began with asbestos and has spread to other mass torts. It turns the insurer's position into a negotiated contribution to the trust.
