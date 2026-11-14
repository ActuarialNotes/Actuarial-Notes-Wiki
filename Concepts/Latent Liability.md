---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:04064a431054af5a2a67d26996ca1ef5669db476f861b7113ede7e8b30a47e51
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Latent Liability.md
---

**Latent Liability** is liability for injury or damage that surfaces long after the exposure that caused it, such as occupational disease, toxic contamination or abuse disclosed decades later. The claims fall on policies written, priced and often long closed years or decades earlier, under wordings that never contemplated them.

Examples are [[Asbestos|asbestos]], environmental cleanup under the federal Superfund law (CERCLA, which imposes strict, joint and several, retroactive liability), silica, lead paint, childhood sexual abuse claims revived when states open filing windows, and PFAS "forever chemicals". Many become a [[Mass Tort|mass tort]].

## Effects on property/casualty insurers

1. Repeated adverse development and reserve strengthening, straining surplus, ratings and sometimes solvency.
2. Old [[Occurrence Coverage|occurrence policies]] triggered decades later, with limits potentially stacked across many policy years. This is one reason [[Claims Made Coverage|claims-made]] forms and asbestos and absolute pollution exclusions spread in the mid-1980s.
3. Coverage litigation over trigger (exposure, manifestation, injury-in-fact, continuous) and allocation (pro rata versus all sums), adding large AO [[Litigation Costs|litigation costs]].
4. Reinsurance disputes and insolvent reinsurers, showing up in [[Schedule F]].
5. [[Runoff|Run-off]] and legacy transactions (loss portfolio transfers, adverse development covers) to cap the exposure.

## Reserving for latent liability

Claims emerge by calendar year of manifestation, driven by epidemiology, litigation and legal doctrine rather than by an accident-year pattern. The [[Chain Ladder Method|chain ladder]] therefore has no stable pattern to project. Practice uses exposure-based (policy-by-policy) projections, claim-count-times-severity models by report year, market-share benchmarks, and the survival ratio as a check, so the [[IBNR]] rests heavily on judgement.

The survival ratio is the number of years the carried reserve would last at the recent payment rate:

> $$\text{Survival ratio} = \frac{\text{Reserves (case + IBNR)}}{\text{Average annual paid losses}}$$

- The average annual paid losses are usually the average of the last three calendar years.

The ratio is simple and computable from public data, because the annual statement's Note 33 gives five calendar years of asbestos and environmental reserves and payments, direct, assumed and net. It is crude. It ignores the shape of future payments and is distorted by one-off payments such as policy buybacks and [[Commutations|commutations]].

> [!example]- What are this insurer's survival ratio and the reserve the peer benchmark implies? {Example}
> An insurer carries net asbestos reserves (case + IBNR) of $\$360$M. Net paid in the last three calendar years was $\$30$M, $\$45$M and $\$45$M. The last figure includes a $\$20$M policy buyback that extinguished that policyholder's future claims. A peer group of insurers with similar exposure carries a survival ratio of $13$ years.
>
> > [!answer]-
> > - As reported, the average paid is $(30 + 45 + 45)/3 = \$40.0$M and the survival ratio is $360/40.0 = 9.0$ years.
> > - The buyback is a one-time payment that also removed future liability, so it is taken out: the average paid is $(30 + 45 + 25)/3 = \$33.3$M.
> > - The survival ratio is then $360/33.3 = 10.8$ years.
> > - The peer benchmark implies a reserve of $13 \times \$33.3\text{M} = \$433$M, a gap of $\$433\text{M} - \$360\text{M} = \$73$M.
> > - The buyback made the reserve look nearly two years thinner than it is, which is why the payment history is cleaned before the ratio is read.
> > - Even after cleaning, $10.8$ years against a peer $13$ suggests a possible $\$73$M shortfall. That is a flag for an exposure-based study, not a reserve estimate, since the peers' mix of policyholders and remaining claim lifetimes may differ.

SSAP No. 55 requires the reserving methodology and the amounts paid and reserved for asbestos and environmental claims to be disclosed. The Statement of Actuarial Opinion discloses net asbestos and environmental reserves separately.

> [!trap] Reading the survival ratio before cleaning the payments
> A buyback or commutation inflates the recent payments and shrinks the ratio. Remove one-off payments that also removed future liability before comparing the ratio with a benchmark.
