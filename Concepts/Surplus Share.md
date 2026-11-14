---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:110909f2c5fd27ad70c0017ac2e379611adc51abd71f9b0350daaf0b7ff6e332
  sources:
    - "Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), pp.3-4 (surplus share definition and table), p.4 step 1 ('as if'), pp.21-22 (inuring surplus share and exposure rating), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (task A1-A3, readings Clark and Bernegger), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Surplus Share.md
---

A **Surplus Share** is a proportional treaty, common on property, in which the percentage ceded varies by risk. The cedant keeps a fixed amount of each risk's insured value (the **retained line**). The reinsurer takes the share of the risk by which its value exceeds that line, up to a capacity stated as a number of lines, and pays that share of every loss on the risk.

For a risk of insured value $V$ under a treaty of $N$ lines, the share ceded is

> $$s(V) = \frac{\min\left(\max(V - R,\, 0),\; N R\right)}{V}$$

- $R$ is the retained line, and $NR$ is the treaty's capacity.

A loss $X$ on the risk is shared in that proportion, so the reinsurer pays

> $$\text{Ceded loss on the risk} = s(V) \cdot X$$

The cedant keeps the rest, $(1 - s(V))X$. Premium is ceded in the same proportion $s(V)$, less a ceding commission. A risk at or below the retained line cedes nothing. Value above $(N+1)R$ falls back to the cedant unless it buys a second surplus or [[Facultative Reinsurance|facultative]] cover.

> [!example]- What share of each risk does this treaty cede, and how is each loss shared? {Example}
> A surplus share treaty has a $\$250{,}000$ line and 5 lines. The risks are valued at $\$200$K, $\$500$K, $\$1$M, $\$2$M and $\$5$M. A $\$300$K loss occurs on the $\$1$M risk and a $\$2$M loss on the $\$5$M risk.
>
> > [!answer]-
> > - The capacity is $5 \times 250 = \$1{,}250$K.
> > - The $\$200$K risk is below the line, so $s = 0\%$.
> > - The $\$500$K risk cedes $250/500 = 50\%$, and the $\$1$M risk cedes $750/1{,}000 = 75\%$.
> > - The $\$2$M risk cedes $\min(1{,}750,\ 1{,}250)/2{,}000 = 62.5\%$, and the $\$5$M risk cedes $1{,}250/5{,}000 = 25\%$.
> > - On the $\$300$K loss, the reinsurer pays $0.75 \times 300 = \$225$K and the cedant keeps $\$75$K.
> > - On the $\$2$M loss, the reinsurer pays $0.25 \times 2{,}000 = \$500$K. The cedant's line is $250/5{,}000 = 5\%$ of the risk, or $\$100$K.
> > - The other 70% of the value lies above the capacity, so $\$1{,}400$K also stays with the cedant, which keeps $\$1{,}500$K in all.

## Pricing a surplus share

A surplus share is priced like a [[Quota Share|quota share]], with one difference. The ceded book is weighted toward large risks, whose loss ratio can differ from the gross book's. Clark's step 1 is that, if treaty history is not available, the gross experience is restated "as if" the surplus terms had applied, rather than priced off the gross loss ratio.

> [!example]- What are this book's gross, treaty and net loss ratios under the same treaty? {Example}
> Each band's risks are taken at a representative value:
>
> | Band | Value $V$ | Premium | Loss ratio |
> | :--- | ---: | ---: | ---: |
> | Small | $\$200$K | $\$6$M | 55% |
> | Medium | $\$1$M | $\$3$M | 60% |
> | Large | $\$2$M | $\$1$M | 75% |
>
> > [!answer]-
> > - The cessions are 0%, 75% and 62.5%.
> > - The gross losses are $3.30 + 1.80 + 0.75 = \$5.85$M, a gross loss ratio of $5.85/10 = 58.5\%$.
> > - The ceded premium is $0.75(3) + 0.625(1) = \$2.875$M.
> > - The ceded losses are $0.75(1.80) + 0.625(0.75) = \$1.81875$M.
> > - The treaty loss ratio is $1.81875/2.875 = 63.3\%$.
> > - The net loss ratio is $4.03125/7.125 = 56.6\%$.
> > - The treaty's loss ratio is 4.8 points worse than the gross, so pricing it off the gross 58.5% would under-price it.

## Covers that inure to a surplus share

Per-risk excess and catastrophe covers usually apply to the retention *after* the surplus share. When that per-risk layer is exposure rated, the exposure curve is selected by the insured value *before* the surplus share, but the exposure factor is applied to subject premium *after* it.

> [!trap] Treating a surplus share as excess insurance
> It is not excess insurance. The line is used only to set the percentage. Once $s(V)$ is fixed, the reinsurer pays that share of a $\$5{,}000$ loss as surely as of a total loss. An [[Excess of Loss|excess of loss]] cover is the one that pays only above a retention.
