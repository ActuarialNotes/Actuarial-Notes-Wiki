---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b7b9099597b7f2c506b953bc3142b2dd1715acd253b6997f070c2e6cb88cbfbf
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Asbestos.md
---

**Asbestos** is a group of naturally occurring mineral fibres used for most of the twentieth century in insulation, building materials, brake linings and industrial products; inhaled fibres cause asbestosis, lung cancer and mesothelioma decades after exposure. The resulting litigation is the longest-running [[Mass Tort|mass tort]] in U.S. history and the defining example of [[Latent Liability|latent liability]] for P/C insurers.

> $$\text{Share}_j = \frac{\text{Years on risk under policy } j}{\text{Years from first exposure to manifestation}}$$

- $\text{Share}_j$ is policy $j$'s portion of a claim under **pro rata by time on risk** allocation across a continuous-trigger period; years with no insurance (or excluded coverage) are borne by the policyholder in jurisdictions that allocate this way.
- **How it reached insurers.** Strict product liability for asbestos manufacturers was established in *Borel v. Fibreboard* (5th Cir. 1973). Claims then landed on general liability [[Occurrence Coverage|occurrence policies]] written from the 1940s to the 1980s without any asbestos exclusion — policies priced and closed long before, with no provision for the claims. Latency of several decades means new claims are still being filed.
- **Trigger theories** decide which policy years respond: *exposure* (when fibres were inhaled), *manifestation* (when disease was diagnosed), *injury-in-fact* (when bodily injury actually occurred), and the **continuous trigger** adopted in *Keene Corp. v. INA* (D.C. Cir. 1981), under which every policy from first exposure to manifestation is triggered — letting limits stack across decades.
- **Allocation** then decides how a triggered claim is shared: **pro rata** (by time on risk or by limits) or **all sums**, under which the policyholder picks any triggered policy to pay in full up to its limits and that insurer seeks contribution from the others. State law and policy wording decide which applies.
- **Products versus non-products.** Product claims were subject to annual aggregate limits, which many defendants exhausted; policyholders then pursued claims under the premises and operations coverage of older policies, which often carried no aggregate limit — reopening towers thought to be exhausted.
- **Bankruptcy.** Johns-Manville filed for Chapter 11 in 1982, and in 1994 Congress codified the asbestos trust in Bankruptcy Code section 524(g): a channelling injunction sends present and future claims to a trust funded largely by insurance. As primary defendants went bankrupt, plaintiffs turned to peripheral defendants and their insurers.
- **Reserving and disclosure.** Reserves come from exposure-based (policy-by-policy) studies, epidemiological projections of disease incidence, market-share benchmarks and the [[Latent Liability|survival ratio]]. The annual statement's Note 33 discloses five calendar years of asbestos reserves and payments, including coverage dispute costs, on direct, assumed and net bases, and the Statement of Actuarial Opinion reports net asbestos reserves separately. Recoverables on old treaties feed [[Schedule F]], and disputes over them are a long-running source of [[Litigation Costs|litigation cost]].

> [!example]- One Claim, Four Coverage Answers {Example}
> A claimant was exposed to an insulation contractor's products from 1965 through 1974 and was diagnosed with mesothelioma in 2004. The claim settles for $\$2{,}000{,}000$. The contractor's general liability coverage: Insurer A from 1965 through 1975, Insurer B from 1976 through 1985, and from 1986 onward only policies with an asbestos exclusion. Limits are adequate in every year.
>
> Who pays under (a) an exposure trigger, (b) a manifestation trigger, (c) a continuous trigger with pro rata time-on-risk allocation, (d) a continuous trigger with all-sums allocation?
>
> > [!answer]-
> > **(a) Exposure trigger:** every exposure year (1965–1974) falls in Insurer A's period, so **A pays $\$2{,}000{,}000$**.
> >
> > **(b) Manifestation trigger:** the 2004 policy excludes asbestos, so **the contractor pays $\$2{,}000{,}000$** itself.
> >
> > **(c) Continuous trigger, pro rata:** the triggered period is 1965–2004, $40$ years, of which A covers $11$, B covers $10$ and $19$ are excluded.
> >
> > $$\begin{align*}
> > \text{A} &= \frac{11}{40} \times \$2{,}000{,}000 \\
> > &= \$550{,}000 \\[4pt]
> > \text{B} &= \frac{10}{40} \times \$2{,}000{,}000 \\
> > &= \$500{,}000 \\[4pt]
> > \text{Contractor} &= \frac{19}{40} \times \$2{,}000{,}000 \\
> > &= \$950{,}000
> > \end{align*}$$
> >
> > **(d) Continuous trigger, all sums:** the contractor selects a triggered A or B policy to pay the full $\$2{,}000{,}000$; that insurer seeks contribution from the other. The excluded years bear nothing, so **insurers pay the whole claim**.
> >
> > The same settlement costs the insurers anywhere from $\$0$ to $\$2{,}000{,}000$ depending on legal doctrine alone — which is why asbestos reserves have repeatedly moved on court decisions rather than on claim experience.
