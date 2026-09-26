---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:590bf9f6544add560eb01e474d4c2e56f1582c98af51040f72d4f2a09df99c88
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Range of Indications.md
---

**A range of indications** is the spread of unpaid-claim estimates obtained when several reasonable methods, models or assumption sets are applied to the same data. It is the evidence from which the actuary selects a point estimate and states a range of reasonable estimates. It measures uncertainty about the **estimate of the mean**. That is a different, and usually much narrower, thing than the range of possible **outcomes** described by an [[Unpaid Claim Distribution|unpaid claim distribution]].

> $$\text{Range} = \Big[\min_{m \in M} \hat R_m,\; \max_{m \in M} \hat R_m\Big]$$

> $$\text{Range of reasonable estimates} \subset \text{Range of possible outcomes}$$

- $M$ is the set of methods judged **appropriate** for the data, and $\hat R_m$ is method $m$'s estimate of unpaid claims or IBNR. Build it by accident year: paid and reported development, [[Expected Loss Method|expected claims]], [[Bornhuetter-Ferguson Method|BF]], [[Cape Cod Method|Cape Cod]], [[Benktander Method|Benktander]] and [[Frequency-Severity Method|frequency-severity]]. First drop any method whose assumptions a [[Data Diagnostic Analysis|diagnostic]] has shown to fail.
- **A method the data contradicts does not widen the range.** If settlement has sped up, the paid chain ladder's high answer is a known bias, not evidence of uncertainty. Leaving it in overstates the range; leaving out a sound method that disagrees understates it.
- **Stochastic version (Shapland).** Run several bootstrap models (paid and incurred chain ladder, BF, Cape Cod, GLM) and weight them by year to get a best-estimate *distribution*. The **modeled range** spans the means of every model used anywhere. The **weighted range** uses, for each year, only the models given weight in that year. It is the more representative view of uncertainty in the actuarial central estimate.
- **Reinsurance ranges are wider.** In Friedland's reinsurance examples, the range of indicated IBNR (maximum less minimum across methods) was wider for reinsurance than for primary business, for non-proportional than for proportional covers, and for catastrophe than for non-catastrophe property. See [[Reinsurance Reserving]].
- **Professional basis.** The CAS Statement of Principles on unpaid claims estimates (Principle 2, see [[Actuarial Principles]]) says uncertainty "implies that a range of estimates can be reasonable". [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|ASOP 43]] allows a point estimate, a range, or both. In the U.S., ASOP 36 treats carried reserves as a reasonable provision when they fall within a range of estimates the actuary considers reasonable.

> [!example]- Screening Methods Before Stating a Range {Example}
> Total IBNR indications (\$000s) for a commercial auto book: reported development $4{,}200$; paid development $6{,}100$; expected claims $5{,}000$; BF (reported) $4{,}700$; BF (paid) $5{,}300$. Closure rates at every maturity have risen sharply over the last two calendar years, and paid-to-reported ratios with them.
>
> State a range of reasonable estimates.
>
> > [!answer]-
> > The raw spread is $4{,}200$ to $6{,}100$, which is $1{,}900$ wide.
> >
> > Rising closure rates mean payments are running ahead of the historical pattern. The paid development method applies old, slower factors to a faster diagonal, so it is **biased high**. The same is true, to a lesser degree, of paid BF, whose "percentage unpaid" comes from the same stale pattern.
> >
> > Dropping paid development and noting the upward lean of paid BF:
> >
> > $$
> > \begin{align*}
> > \text{Range} &= [4{,}200,\ 5{,}300] \\
> > \text{Width} &= 1{,}100
> > \end{align*}
> > $$
> >
> > A selection near $4{,}800$, between reported BF and expected claims, is defensible. If the paid triangle were restated to current disposal rates ([[Berquist-Sherman Method|Berquist-Sherman]]), its result could come back into the range.
> >
> > A bootstrap on the same data might put the 25th to 75th percentiles of *outcomes* at $4{,}300$ to $5{,}600$. That band is not a competing range of reasonable estimates. It says where the actual payments may land, not where a reasonable estimate of their mean may lie.

> [!example]- Modeled Versus Weighted Range {Example}
> Three bootstrap models give mean unpaid (\$000s) for two accident years:
>
> - AY A (mature): paid CL $100$, incurred CL $110$, BF $105$. Weights $50\% / 50\% / 0\%$.
> - AY B (latest): paid CL $900$, incurred CL $700$, BF $760$. Weights $0\% / 25\% / 75\%$.
>
> Find the best estimate and both ranges.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Best}_A &= 0.5(100) + 0.5(110) \\
> > &= 105 \\
> > \text{Best}_B &= 0.25(700) + 0.75(760) \\
> > &= 745 \\
> > \text{Best} &= 850
> > \end{align*}
> > $$
> >
> > - **Weighted range**, using only the models given weight in each year: A is $[100, 110]$ and B is $[700, 760]$, so the total is $[800, 870]$.
> > - **Modeled range**, using every model used anywhere: A is $[100, 110]$ and B is $[700, 900]$, so the total is $[800, 1{,}010]$.
> >
> > The modeled range's top end is set by the paid chain ladder on AY B, a model the actuary gave *no* weight for that year. The weighted range reflects the actual judgment and is the better statement of uncertainty in the central estimate.
