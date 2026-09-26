---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1084d359af4e8ad58fc54e5ea4d031d09514933634e521bcc29abd3ee68c1a33
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Surplus Share.md
---

**Surplus Share** is a proportional treaty, common on property, in which the percentage ceded varies by risk. The cedant keeps a fixed amount of each risk's insured value (the **retained line**). The reinsurer takes the share of the risk by which its value exceeds that line, up to a capacity stated as a number of lines, and pays that share of every loss on the risk.

> $$s(V) = \frac{\min\left(\max(V - R,\, 0),\; N R\right)}{V}$$

> $$\text{Ceded loss on the risk} = s(V) \cdot X$$

- $V$ is the risk's insured value, $R$ the retained line, $N$ the number of lines (capacity $NR$), and $X$ any loss on the risk. Premium is ceded in the same proportion $s(V)$, less a ceding commission.
- **It is not excess insurance.** The line is used only to set the percentage. Once $s(V)$ is fixed, the reinsurer pays that share of a $\$5{,}000$ loss as surely as of a total loss. Compare [[Excess of Loss]].
- **What it achieves.** Small risks are kept whole, and large risks are cut down to about the line. The net book becomes more uniform in amount at risk, so the cedant can write large risks without a matching increase in net exposure. Value above $(N+1)R$ falls back to the cedant unless it buys a second surplus or [[Facultative Reinsurance|facultative]] cover.
- **Pricing** follows [[Quota Share]] with one difference that matters. The ceded book is weighted toward large risks, whose loss ratio can differ from the gross book's. Clark's step 1: if treaty history is not available, restate the gross experience "as if" the surplus terms had applied, rather than pricing off the gross loss ratio.
- **Watch for selection.** If the cedant can vary its line by class, the reinsurer's share tilts toward whatever classes the cedant keeps least of.
- **Inuring.** Per-risk excess and catastrophe covers usually apply to the retention *after* the surplus share. When exposure rating that per-risk layer, select the exposure curve by the insured value *before* the surplus share, but apply the factor to subject premium *after* it (Clark).

> [!example]- Cession Percentages and Losses {Example}
> A surplus share treaty has a $\$250{,}000$ line and $5$ lines. Find the cession percentage for risks of $\$200{,}000$, $\$500{,}000$, $\$1{,}000{,}000$, $\$2{,}000{,}000$ and $\$5{,}000{,}000$. Then allocate a $\$300{,}000$ loss on the $\$1$M risk and a $\$2$M loss on the $\$5$M risk.
>
> > [!answer]-
> > Capacity is $5 \times \$250\text{K} = \$1{,}250\text{K}$.
> >
> > - $\$200$K: below the line, $s = 0\%$.
> > - $\$500$K: $250/500 = 50\%$.
> > - $\$1{,}000$K: $750/1{,}000 = 75\%$.
> > - $\$2{,}000$K: $\min(1{,}750, 1{,}250)/2{,}000 = 62.5\%$.
> > - $\$5{,}000$K: $1{,}250/5{,}000 = 25\%$.
> >
> > **$\$300$K loss on the $\$1$M risk:** ceded $0.75 \times 300 = \$225$K, retained $\$75$K.
> >
> > **$\$2$M loss on the $\$5$M risk:** ceded $0.25 \times 2{,}000 = \$500$K. The cedant's line is $250/5{,}000 = 5\%$, or $\$100$K. The remaining $70\%$ of value lies above the treaty's capacity, so $\$1{,}400$K also stays with the cedant unless a second surplus or facultative certificate covers it. Net: $\$1{,}500$K.
> >
> > The percentage peaks for mid-sized risks and falls for the largest ones, once they outgrow the treaty's capacity.

> [!example]- Treaty Loss Ratio Differs from Gross {Example}
> Same treaty. The cedant's book, with each band's risks taken at a representative value:
>
> - Small, $V = \$200$K: premium $\$6$M, loss ratio $55\%$.
> - Medium, $V = \$1$M: premium $\$3$M, loss ratio $60\%$.
> - Large, $V = \$2$M: premium $\$1$M, loss ratio $75\%$.
>
> Compute the gross, treaty and net loss ratios.
>
> > [!answer]-
> > Cessions are $0\%$, $75\%$ and $62.5\%$.
> >
> > $$
> > \begin{align*}
> > \text{Gross LR} &= \frac{3.30 + 1.80 + 0.75}{10} \\
> > &= 58.5\%
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Ceded prem.} &= 0.75(3) + 0.625(1) \\
> > &= 2.875
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Ceded loss} &= 0.75(1.80) + 0.625(0.75) \\
> > &= 1.81875
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Treaty LR} &= \frac{1.81875}{2.875} \\
> > &= 63.3\%
> > \end{align*}
> > $$
> >
> > Net loss ratio: $(5.85 - 1.81875)/(10 - 2.875) = 4.03125/7.125 = 56.6\%$.
> >
> > The treaty sees none of the small risks and much of the large ones, so its loss ratio is $4.8$ points worse than the cedant's gross. A reinsurer pricing off the gross $58.5\%$ would under-price the treaty.
