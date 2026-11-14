---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:79d2845932c4095f2fafdedd80420bb8117ad5e0078583eb187ebf541d0b2a4f
  sources:
    - "Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), §1A pp.3-8 (quota share takes a flat percent of premium and losses including ALAE; ceding commission; pricing steps 1-6: five or more years, exclude cat and shock, develop, trend, parallelogram for losses-occurring, non-cat ELR, cat load from an engineering-based model, commission, brokerage, general expenses, target return), §1B p.9 (loss occurrence limit; adjustable features) and pp.9-13 (sliding scale, profit commission, loss corridors), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (tasks A1-A5, readings Clark, Bernegger, Grossi & Kunreuther), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Quota Share.md
---

**Quota Share** is a proportional treaty in which the reinsurer takes a fixed percentage $a$ of the premium and of every loss (usually including ALAE) on a defined book. In return it pays the cedant a **ceding commission** for the expenses the cedant incurred to write the business.

The ceded premium is

> $$\text{Ceded premium} = a \cdot P$$

- $P$ is the subject premium.

The ceded loss is

> $$\text{Ceded loss} = a \cdot X$$

- $X$ is the subject loss.

The cedant keeps $1-a$ of every loss, including every catastrophe and every large loss. A quota share provides capacity and surplus relief, because the ceding commission recovers acquisition cost on the ceded unearned premium. Compare [[Surplus Share|surplus share]], where the percentage varies by risk.

> [!example]- A cedant has a $40\%$ quota share on a book with $\$50$M of subject premium. What are the ceded and net losses from a $\$60$M catastrophe? {Example}
> - The ceded loss is $0.40 \times \$60\text{M} = \$24$M.
> - The net loss is $(1 - 0.40) \times \$60\text{M} = \$36$M.

## Pricing a quota share

The treaty loss ratio is the cedant's loss ratio, so pricing is ratemaking on the cedant's data. Clark's steps are:

1. Compile five or more years of subject experience.
2. Remove catastrophe and shock losses.
3. Develop, trend and bring premium to [[On Level Premium|current rate level]], with the [[Parallelogram Method|parallelogram method]] for a losses-occurring treaty.
4. Select the non-catastrophe expected loss ratio.
5. Add a catastrophe load, now usually from a [[Catastrophe Modelling|catastrophe model]].
6. Add commission, brokerage and expenses.

The reinsurer's combined ratio on the treaty is

> $$\text{Reinsurer's ratio} = \text{ELR} + c + b + e$$

- $\text{ELR}$ is the expected loss ratio, including the catastrophe load.
- $c$ is the ceding commission, $b$ brokerage and $e$ the reinsurer's own expenses, each as a ratio to ceded premium.

The reinsurer judges this combined ratio, with investment income and risk, against its target return.

> [!example]- Do these terms meet the reinsurer's target, and if not, what ceding commission would? {Example}
> A cedant asks for a $40\%$ quota share on homeowners business with projected subject earned premium of $\$50$ million. Five years of developed, trended, on-level loss ratios excluding catastrophes are $52\%$, $58\%$, $55\%$, $61\%$ and $54\%$. A catastrophe model gives expected annual catastrophe loss of $\$5.6$ million on the subject book. The terms offered are a $28\%$ ceding commission and $2\%$ brokerage, and the reinsurer's own expenses are $1.5\%$. The reinsurer targets a $95\%$ combined ratio.
>
> > [!answer]-
> > - The non-catastrophe ELR is $(52 + 58 + 55 + 61 + 54)/5 = 56.0\%$.
> > - The catastrophe load is $\$5.6\text{M} / \$50\text{M} = 11.2\%$, so the ELR is $67.2\%$.
> > - The combined ratio is $67.2\% + 28\% + 2\% + 1.5\% = 98.7\%$, which misses the target.
> > - Ceded premium is $0.40 \times \$50\text{M} = \$20$ million and expected ceded loss is $0.672 \times \$20\text{M} = \$13.44$ million.
> > - The commission that meets the target is $95 - 67.2 - 2 - 1.5 = 24.3\%$, so the actuary would counter at about $24\%$ or propose an adjustable feature.

## Adjustable features

When the two sides disagree on the ELR, adjustable features settle it: [[Sliding Scale Commissions|sliding scale commissions]], a [[Profit Commission|profit commission]], [[Loss Corridors|loss corridors]], or a per-occurrence limit on ceded catastrophe loss ([[Reinsurance Contract Provisions]]). Under a per-occurrence limit the reinsurer pays $a$ times the loss, capped at the limit.

> [!example]- What do the catastrophe load and combined ratio become with this limit? {Example}
> Take the treaty in the pricing example. The cedant's annual catastrophe loss, at most one event a year, is:
>
> | Catastrophe loss | Probability |
> | ---: | ---: |
> | \$0 | 0.70 |
> | \$10M | 0.20 |
> | \$30M | 0.08 |
> | \$60M | 0.02 |
>
> The reinsurer proposes limiting ceded catastrophe loss to $\$8$ million per occurrence.
>
> > [!answer]-
> > - Ceded catastrophe loss at $40\%$ is $0, 4, 12, 24$ (in \$ millions) before the cap, and $0, 4, 8, 8$ after it.
> > - The expected uncapped loss is $0.20(4) + 0.08(12) + 0.02(24) = 2.24$, which is the $11.2\%$ load on $\$20$M.
> > - The expected capped loss is $0.20(4) + 0.08(8) + 0.02(8) = 1.60$, a load of $1.60/20 = 8.0\%$.
> > - The ELR becomes $64.0\%$ and the combined ratio $64.0 + 28 + 2 + 1.5 = 95.5\%$, close to target at the original commission.
> > - In the $\$60$M event the cedant's net loss is $\$52$M instead of $\$36$M, so it needs a catastrophe excess cover on its net retention.

## Quota share in reserving

For reserving, ceded losses are a scalar multiple of gross and develop on the gross pattern, unlike [[Excess of Loss]] cessions. Gross, ceded and net losses therefore share the same age-to-age and tail factors.

> [!trap] Expecting a quota share to reduce volatility
> A quota share does not change the shape of the net result. Net loss is $(1-a)X$, so its coefficient of variation equals gross. Under a $40\%$ quota share the cedant still keeps $\$36$M of a $\$60$M catastrophe, the same $60\%$ it keeps of every loss.
