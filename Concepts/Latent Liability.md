---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:eef2a3bb0118b4e4b7db18fc4767ff1799ea5e8c865e34723470f85c0e76ac5b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Latent Liability.md
---

**Latent Liability** is liability for injury or damage that surfaces long after the exposure that caused it — occupational disease, toxic contamination, abuse disclosed decades later — so the claims fall on policies written, priced and often long closed years or decades earlier, under wordings that never contemplated them.

> $$\text{Survival ratio} = \frac{\text{Reserves (case + IBNR)}}{\text{Average annual paid losses}}$$

- The **survival ratio** is the number of years the carried reserve would last at the recent payment rate; the paid denominator is usually the average of the last three calendar years. It is simple and computable from public data — the annual statement's Note 33 gives five calendar years of asbestos and environmental reserves and payments, direct, assumed and net — but crude: it ignores the shape of future payments and is distorted by one-off payments such as policy buybacks and [[Commutations|commutations]].
- **Why ordinary reserving fails.** Claims emerge by calendar year of *manifestation*, driven by epidemiology, litigation and legal doctrine rather than by an accident-year pattern, so the [[Chain Ladder Method|chain ladder]] has no stable pattern to project. Practice uses exposure-based (policy-by-policy) projections, claim-count-times-severity models by report year, market-share benchmarks, and the survival ratio as a check, so the [[IBNR]] rests heavily on judgement.
- **How it affects P/C insurers:**
  - repeated adverse development and reserve strengthening, straining surplus, ratings and sometimes solvency;
  - old [[Occurrence Coverage|occurrence policies]] triggered decades later, with limits potentially stacked across many policy years — one reason [[Claims Made Coverage|claims-made]] forms and asbestos and absolute pollution exclusions spread in the mid-1980s;
  - coverage litigation over **trigger** (exposure, manifestation, injury-in-fact, continuous) and **allocation** (pro rata versus all sums), adding large AO [[Litigation Costs|litigation costs]];
  - reinsurance disputes and insolvent reinsurers, showing up in [[Schedule F]];
  - [[Runoff|run-off]] and legacy transactions (loss portfolio transfers, adverse development covers) to cap the exposure.
- **Examples:** [[Asbestos]]; environmental cleanup under the federal Superfund law (CERCLA), which imposes strict, joint and several, retroactive liability; silica; lead paint; childhood sexual abuse claims revived when states open filing windows; PFAS "forever chemicals." Many become a [[Mass Tort]].
- **Disclosure:** SSAP No. 55 requires the reserving methodology and the amounts paid and reserved for asbestos and environmental claims, and the Statement of Actuarial Opinion discloses net asbestos and environmental reserves separately.

> [!example]- Survival Ratio With a One-Off Payment {Example}
> An insurer carries net asbestos reserves (case + IBNR) of $\$360$M. Net paid in the last three calendar years was $\$30$M, $\$45$M and $\$45$M; the last figure includes a $\$20$M policy buyback that extinguished that policyholder's future claims. A peer group of insurers with similar exposure carries a survival ratio of $13$ years.
>
> Compute the survival ratio with and without the buyback and the reserve implied by the peer benchmark.
>
> > [!answer]-
> > **As reported:**
> >
> > $$
> > \begin{align*}
> > \text{Average paid} &= \frac{30 + 45 + 45}{3} \\
> > &= \$40.0\text{M} \\[4pt]
> > \text{Survival ratio} &= \frac{360}{40.0} \\
> > &= 9.0 \text{ years}
> > \end{align*}
> > $$
> >
> > **Excluding the buyback** — a one-time payment that also removed future liability:
> >
> > $$
> > \begin{align*}
> > \text{Average paid} &= \frac{30 + 45 + 25}{3} \\
> > &= \$33.3\text{M} \\[4pt]
> > \text{Survival ratio} &= \frac{360}{33.3} \\
> > &= 10.8 \text{ years}
> > \end{align*}
> > $$
> >
> > **Peer benchmark:**
> >
> > $$
> > \begin{align*}
> > \text{Implied reserve} &= 13 \times \$33.3\text{M} \\
> > &= \$433\text{M} \\[4pt]
> > \text{Gap} &= \$433\text{M} - \$360\text{M} \\
> > &= \$73\text{M}
> > \end{align*}
> > $$
> >
> > The buyback made the reserve look nearly two years thinner than it is, which is why the payment history should be cleaned before the ratio is read. Even after cleaning, $10.8$ years against a peer $13$ suggests a possible $\$73$M shortfall — a flag for an exposure-based study, not a reserve estimate, since the peers' mix of policyholders and remaining claim lifetimes may differ.
