---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c2605e5ee605609e584eee4e85ba4c875ac68fc44f823c9643c60af2719ef6c4
  sources: []
  open_findings: 0
  log: .verify/Concepts/Exposure Base.md
---

**Exposure Base** is the basic unit of risk that underlies the premium — the quantity the rate is charged *per*. It is the denominator of the pure premium and the measure by which one insured's amount of insurance is compared with another's.

> $$\text{Pure Premium} = \frac{\text{Losses} + \text{LAE}}{\text{Earned Exposures}}$$

> $$\text{Premium} = \text{Rate} \times \text{Exposures}$$

Werner & Modlin give three criteria for choosing one:

- **Proportional to expected loss.** Doubling the exposure should roughly double expected losses. A base that is proportional to *frequency* but not severity (or vice versa) distorts the rate across sizes of risk.
- **Practical.** Objective, verifiable, inexpensive to collect, and not easily manipulated by the insured. A base that must be estimated at inception and audited later (payroll, sales) trades practicality for proportionality — see [[Premium Audit]].
- **Consistent with historical precedent.** Changing the base of a line already written on another base forces every historical year to be restated and disrupts comparison with industry data.

Further properties:

- Common bases: car-years (personal auto), house-years (homeowners), payroll per $\$100$ (workers compensation), gross sales or receipts (general liability), amount of insurance in $\$1{,}000$s (property).
- Exposures come in the same four flavours as premium — **written**, [[Earned Exposure|earned]], unearned and [[In-Force|in-force]] — and the ratemaking denominator is always the earned one.
- Dollar-denominated bases inflate on their own, which is what [[Exposure Trend]] adjusts for; count-based bases (car-years) do not.
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
> > Workers compensation indemnity benefits are a percentage of the injured worker's wage, so the severity of A's claims is roughly four times B's per claim while B has twice the frequency exposure. Payroll captures both effects in one number, which is exactly the "proportional to expected loss" criterion.
> >
> > Payroll also scores well on practicality — it already exists in the employer's accounting records and is auditable — and it is universal industry precedent. Its weakness is that it inflates with wages even when injury risk is unchanged, which is why workers compensation rates must be adjusted for [[Exposure Trend|wage trend]] and why some jurisdictions cap the payroll of high-wage employees.

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
> > Loss cost rises steeply with amount of insurance, so a flat rate per house-year **is not proportional to expected loss**: small homes subsidize large ones. AOI is the better base on criterion one.
> >
> > But note the relationship is not linear — losses per house-year rise by a factor of $2.3$ while the midpoint of AOI rises by a factor of about $4$. A pure rate-per-$\$1{,}000$-of-AOI would over-charge large homes, because a total loss is rare and partial losses do not scale fully with the size of the house.
> >
> > The practical resolution, and standard homeowners practice, is to keep AOI as the exposure base and apply a **decreasing** rate per $\$1{,}000$ through an amount-of-insurance relativity curve, so that the base captures the bulk of the effect and [[Classification Ratemaking|classification relativities]] correct the residual.
