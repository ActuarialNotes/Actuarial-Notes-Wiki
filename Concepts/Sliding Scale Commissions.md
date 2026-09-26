---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c255ed8db4c3263b1696ebddc398dd992fab7bb6ab521a9ad60a9316adaddeb3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Sliding Scale Commissions.md
---

**A Sliding Scale Commission** is a ceding commission on a proportional treaty that varies inversely with the treaty's actual loss ratio, between a stated minimum and maximum. A provisional commission is paid as premium is ceded and then adjusted as losses mature. It is the most common adjustable feature of a [[Quota Share]].

> $$c(\text{LR}) = \min\left(c_{\max},\; \max\left(c_{\min},\; c_0 + s\,(\text{LR}_0 - \text{LR})\right)\right)$$

> $$E[c] = \sum_i p_i \, c(\text{LR}_i)$$

- $c_0$ is the commission at loss ratio $\text{LR}_0$, and $s$ the slide: $1{:}1$ means one point of commission per point of loss ratio. The slide may differ in different ranges, e.g. $1{:}1$ near the minimum and $0.5{:}1$ toward the maximum. The minimum $c_{\min}$ applies at and above a high loss ratio, and the maximum $c_{\max}$ at and below a low one. $p_i$ is the probability of loss-ratio outcome $\text{LR}_i$ from an [[Aggregate Loss Model|aggregate distribution]].
- **What it does.** Within the slide, the reinsurer's loss-plus-commission ratio moves by only $1 - s$ per point of loss ratio, and the cedant is rewarded for good experience. Outside the slide it does nothing: above the minimum-commission point the reinsurer bears every extra point of loss, and below the maximum it keeps the extra profit.
- **Never price it at the expected loss ratio alone.** Only for a plan balanced around the expected loss ratio is that a fair shortcut. Clark's illustration: with the minimum commission of $25\%$ set at a $65\%$ loss ratio equal to the expected, the naive commission is $25\%$ and the technical ratio $90\%$. Weighting over the aggregate distribution gives an expected commission of about $31\%$ and a technical ratio of about $96\%$. Bad years cannot push the commission below the minimum, while good years raise it.
- Historical adjusted loss ratios make a reasonability check. They are distorted by past catastrophes and thin years, and they miss outcomes the history does not contain.
- **Carryforward.** Past deficits above the minimum-commission loss ratio can be carried into the current year. Priced for a single year, this simply shifts the slide by the carryforward. Priced over a multi-year block, it cuts the variance roughly in proportion to the number of years. Neither view is standard. See [[Reinsurance Contract Provisions]], and compare [[Profit Commission]] and [[Loss Corridors]].

> [!example]- Reading a Two-Slope Scale {Example}
> Terms: minimum commission $22\%$ at a $68\%$ loss ratio or higher; sliding $1{:}1$ to $30\%$ at $60\%$; then sliding $0.5{:}1$ to a maximum of $36\%$ at $48\%$ or lower. Find the commission at loss ratios of $75\%$, $64\%$, $55\%$ and $40\%$.
>
> > [!answer]-
> > Check the scale: from $68\%$ to $60\%$ is $8$ points at $1{:}1$, so $22 + 8 = 30\%$. From $60\%$ to $48\%$ is $12$ points at $0.5{:}1$, so $30 + 6 = 36\%$.
> >
> > - $75\%$: above $68\%$, so the minimum, $22\%$.
> > - $64\%$: $22 + (68 - 64) = 26\%$.
> > - $55\%$: $30 + 0.5(60 - 55) = 32.5\%$.
> > - $40\%$: below $48\%$, so the maximum, $36\%$.
> >
> > The reinsurer's loss-plus-commission ratios are $97\%$, $90\%$, $87.5\%$ and $76\%$. The $1{:}1$ band holds that ratio flat at $90\%$, and the ratio moves again outside it.

> [!example]- Expected Commission Versus the Plug-In {Example}
> Same scale. The treaty loss ratio is $45\%$ ($p = 0.15$), $55\%$ ($0.30$), $64\%$ ($0.30$) or $85\%$ ($0.25$). Find the expected commission and the reinsurer's expected technical ratio, and compare with the plug-in.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[\text{LR}] &= 0.15(45) + 0.30(55) + 0.30(64) + 0.25(85) \\
> > &= 63.7\%
> > \end{align*}
> > $$
> >
> > Commissions: $36\%$ (at $45\%$, the maximum), $32.5\%$, $26\%$ and $22\%$ (at $85\%$, the minimum).
> >
> > $$
> > \begin{align*}
> > E[c] &= 0.15(36) + 0.30(32.5) + 0.30(26) + 0.25(22) \\
> > &= 5.40 + 9.75 + 7.80 + 5.50 \\
> > &= 28.45\%
> > \end{align*}
> > $$
> >
> > The plug-in gives $22 + (68 - 63.7) = 26.3\%$, for a technical ratio of $63.7 + 26.3 = 90.0\%$.
> >
> > The true expected technical ratio is $63.7 + 28.45 = 92.15\%$. The plug-in understates the reinsurer's cost by more than two points. In the $85\%$ year the commission floors at $22\%$ where the slide would have taken it far lower, and the good years land on the richer $0.5{:}1$ and maximum part of the scale. To hit a $90\%$ technical ratio, the reinsurer must lower the scale or narrow the maximum.
