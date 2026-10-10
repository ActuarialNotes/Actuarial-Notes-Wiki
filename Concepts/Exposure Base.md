---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:fc6151a204f99ea5939e6f084899bdea3f6e419714f532f08fc7fed69905b4bb
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 4 pp.49-51, 61-62 (PDF pp.61-63, 73-74), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 2 pp.17, 23 (PDF pp.29, 35), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 pp.2, 8 (PDF pp.14, 20), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 p.135 (PDF p.147), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Exposure Base.md
---

**Exposure Base** is the basic unit of risk that underlies the premium — the quantity the rate is charged *per*. It measures a policy's exposure to loss, which is why it is the basis of the premium: base rates are expressed per exposure, and it is the denominator of the pure premium.

> $$\text{Pure Premium} = \frac{\text{Losses} + \text{LAE}}{\text{Earned Exposures}}$$

> $$\text{Premium} = \text{Rate} \times \text{Exposures}$$

Werner & Modlin give three criteria for choosing one:

- **Proportional to expected loss.** All else equal, a policy with two exposures should have twice the expected loss of a similar policy with one. Expected loss varies by many other factors too; those become rating or underwriting variables, and the factor with the most direct relationship to losses is chosen as the base.
- **Practical.** Objective, and relatively easy and inexpensive to obtain and verify — which also keeps policyholders and producers from manipulating it (declared annual mileage invites more dishonesty than car-years). Where the most proportional measure cannot be tracked, a practical proxy is used: products liability rates on gross sales because products in use cannot be counted.
- **Consistent with historical precedence.** A change of base can cause large premium swings for individual insureds, requires a change in the rating algorithm and systems, and may force significant adjustments to the several years of data a ratemaking analysis uses.

Further properties:

- Common bases: earned car-years (personal auto), earned house-years (homeowners), payroll — in hundreds of dollars in the U.S. — (workers compensation), sales revenue, payroll, square footage or number of units (commercial general liability), amount of insurance (commercial business property).
- **In underwriting (DISC-RM):** the premium base for a general liability account follows its classification. IRMI lists payroll, receipts, sales, square footage, area or man-hours for general liability, units for auto and value per \$1,000 for property, and a [[Premium Audit|premium audit]] verifies the base after the policy ends ([[Commercial General Liability]]).
- Exposures come in the same four flavours as premium — **written**, [[Earned Exposure|earned]], unearned and [[In-Force|in-force]]; which one is used depends on the analysis, and pure premium is typically calculated on earned exposures.
- Some bases, such as payroll and sales revenue, are highly influenced by inflation, which is what [[Exposure Trend]] measures; count-based bases (car-years, house-years) are not.
- Where no single base is proportional to loss across the whole book, the shortfall is picked up by rating variables instead: this is the boundary between the exposure base and [[Classification Ratemaking|classification]].

![[Media/Figures/Exposure_Base.svg|340]]

> [!example]- Why Workers Compensation Rates on Payroll {Example}
> Two employers in the same class code have identical operations. Employer A employs $10$ workers at $\$200{,}000$ each; Employer B employs $20$ workers at $\$50{,}000$ each.
>
> Compare payroll against headcount as the exposure base.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Payroll}_A &= 10 \times \$200{,}000 = \$2{,}000{,}000 \\
> > \text{Payroll}_B &= 20 \times \$50{,}000 = \$1{,}000{,}000
> > \end{align*}$$
> >
> > Under **headcount**, B pays twice A's premium. Under **payroll**, A pays twice B's.
> >
> > Payroll is the workers compensation base because it is responsive to changes in exposure: as the number of workers or the hours they work rise or fall, both payroll and the risk of loss move with them. Headcount would miss the hours.
> >
> > But the comparison also shows where payroll is disputed. A pays twice B's premium for half the workers, purely because its wages are higher. In the 1980s there was pressure to move workers compensation medical coverage to *hours worked*, to correct perceived inadequacies of payroll for union companies with higher pay scales. The base was not changed — concerns about the transition were a major reason — and the rating variables and algorithm were adjusted instead: historical precedence at work. Payroll is also inflation-sensitive, which is why its trend is measured — see [[Exposure Trend]].

> [!example]- Testing a Proposed Exposure Base {Example}
> A homeowners insurer currently rates on house-years and proposes rating on *amount of insurance* (AOI) per $\$1{,}000$ instead. Analysis of its book shows:
>
> | AOI band | Earned house-years | Losses |
> |---|---|---|
> | $\$100$K–$200$K | $20{,}000$ | $\$12{,}000{,}000$ |
> | $\$200$K–$400$K | $15{,}000$ | $\$13{,}500{,}000$ |
> | over $\$400$K | $5{,}000$ | $\$7{,}000{,}000$ |
>
> Evaluate the proposal.
>
> > [!answer]-
> > Pure premium per house-year:
> >
> > $$\begin{align*}
> > \$100\text{K–}200\text{K} &= \frac{12{,}000{,}000}{20{,}000} = \$600 \\[4pt]
> > \$200\text{K–}400\text{K} &= \frac{13{,}500{,}000}{15{,}000} = \$900 \\[4pt]
> > \text{over } \$400\text{K} &= \frac{7{,}000{,}000}{5{,}000} = \$1{,}400
> > \end{align*}$$
> >
> > Loss cost rises with amount of insurance, so a single rate per house-year with nothing else would leave small homes subsidizing large ones. But the rise is far from proportional: from the lowest band to the highest, loss per house-year rises by a factor of $1{,}400/600 = 2.3$, while the band boundaries quadruple from $\$100$K to $\$400$K. Rating per $\$1{,}000$ of AOI would over-charge large homes.
> >
> > This is Werner & Modlin's own homeowners illustration: the expected loss for a $\$200{,}000$ home is higher than for a $\$100{,}000$ home, but not necessarily twice as high. On the criterion that the exposure base should be the factor most directly proportional to expected loss, **house-years remain the exposure base**, and amount of insurance is used as a **rating variable** — an AOI relativity applied to the base rate per house-year, as in Werner's homeowners rating algorithm. The proposal should be rejected; the AOI effect in the table is a case for an [[Classification Ratemaking|AOI relativity]], not a new base. (Werner notes that some U.K. homeowners insurers do use AOI or number of bedrooms as the base, adjusting the rating algorithm for the lack of proportionality.)
