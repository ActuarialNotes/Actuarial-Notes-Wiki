---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2b77d7a18bc63f66f48d55e87037a7c4c32ce073af9ad583e426d2caac28e829
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Asbestos.md
---
**Asbestos** is a group of naturally occurring mineral fibres used for most of the twentieth century in insulation, building materials, brake linings and industrial products. Inhaled fibres cause asbestosis, lung cancer and mesothelioma decades after exposure. The resulting litigation is the longest-running [[Mass Tort|mass tort]] in U.S. history and the defining example of [[Latent Liability|latent liability]] for P/C insurers.

## How asbestos claims reached insurers

Strict product liability for asbestos manufacturers was established in *Borel v. Fibreboard* (5th Cir. 1973). Claims then landed on general liability [[Occurrence Coverage|occurrence policies]] written from the 1940s to the 1980s without any asbestos exclusion. Those policies had been priced and closed long before, with no provision for the claims. Latency of several decades means new claims are still being filed.

## Trigger theories

A trigger theory decides which policy years respond to a claim:

1. **Exposure**: the years when fibres were inhaled.
2. **Manifestation**: the year disease was diagnosed.
3. **Injury-in-fact**: the years when bodily injury actually occurred.
4. **Continuous trigger**: every policy from first exposure to manifestation, adopted in *Keene Corp. v. INA* (D.C. Cir. 1981). It lets limits stack across decades.

## Allocation

Allocation decides how a triggered claim is shared. Under pro rata allocation the claim is split by time on risk or by limits. Under all sums allocation the policyholder picks any triggered policy to pay in full up to its limits, and that insurer seeks contribution from the others. State law and policy wording decide which applies.

Under pro rata by time on risk across a continuous-trigger period, policy $j$'s share of a claim is

> $$\text{Share}_j = \frac{\text{Years on risk under policy } j}{\text{Years from first exposure to manifestation}}$$

In jurisdictions that allocate this way, years with no insurance or with excluded coverage are borne by the policyholder.

> [!example]- Who pays this mesothelioma claim under each trigger and allocation? {Example}
> A claimant was exposed to an insulation contractor's products from 1965 through 1974 and was diagnosed with mesothelioma in 2004. The claim settles for $\$2{,}000{,}000$. The contractor's general liability coverage was with Insurer A from 1965 through 1975 and Insurer B from 1976 through 1985, and from 1986 onward only policies with an asbestos exclusion. Limits are adequate in every year. Find who pays under:
>
> 1. An exposure trigger.
> 2. A manifestation trigger.
> 3. A continuous trigger with pro rata time-on-risk allocation.
> 4. A continuous trigger with all-sums allocation.
>
> > [!answer]-
> > - Exposure trigger: every exposure year, 1965 to 1974, falls in Insurer A's period, so A pays $\$2{,}000{,}000$.
> > - Manifestation trigger: the 2004 policy excludes asbestos, so the contractor pays $\$2{,}000{,}000$ itself.
> > - Continuous trigger, pro rata: the triggered period is 1965 to 2004, $40$ years, of which A covers $11$, B covers $10$ and $19$ are excluded.
> > - A pays $11/40 \times \$2{,}000{,}000 = \$550{,}000$, B pays $10/40 \times \$2{,}000{,}000 = \$500{,}000$, and the contractor pays $19/40 \times \$2{,}000{,}000 = \$950{,}000$.
> > - Continuous trigger, all sums: the contractor selects a triggered A or B policy to pay the full $\$2{,}000{,}000$, and that insurer seeks contribution from the other. The excluded years bear nothing, so the insurers pay the whole claim.
> > - The same settlement costs the insurers anywhere from $\$0$ to $\$2{,}000{,}000$ depending on legal doctrine alone, which is why asbestos reserves have repeatedly moved on court decisions rather than on claim experience.

## Products and non-products claims

Product claims were subject to annual aggregate limits, which many defendants exhausted. Policyholders then pursued claims under the premises and operations coverage of older policies, which often carried no aggregate limit. That reopened towers thought to be exhausted.

## Bankruptcy and asbestos trusts

Johns-Manville filed for Chapter 11 in 1982. In 1994 Congress codified the asbestos trust in Bankruptcy Code section 524(g): a channelling injunction sends present and future claims to a trust funded largely by insurance. As primary defendants went bankrupt, plaintiffs turned to peripheral defendants and their insurers.

## Reserving and disclosure

Asbestos reserves come from exposure-based (policy-by-policy) studies, epidemiological projections of disease incidence, market-share benchmarks and the [[Latent Liability|survival ratio]]. The annual statement's Note 33 discloses five calendar years of asbestos reserves and payments, including coverage dispute costs, on direct, assumed and net bases. The Statement of Actuarial Opinion reports net asbestos reserves separately. Recoverables on old treaties feed [[Schedule F]], and disputes over them are a long-running source of [[Litigation Costs|litigation cost]].

> [!trap] Charging excluded years to the insurers
> Under pro rata time-on-risk allocation the denominator is every year from first exposure to manifestation, and years with no coverage or an asbestos exclusion fall to the policyholder. Dividing only among the insured years overstates each insurer's share.
