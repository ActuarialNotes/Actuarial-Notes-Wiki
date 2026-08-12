**Permissible Loss Ratio** (PLR, or target loss ratio) is the share of premium available to pay losses once every other cost has been provided for. It is the benchmark against which a projected loss ratio is judged in the [[Loss Ratio Method]].

> $$\text{PLR} = 1 - V - Q_T$$

> $$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{\text{PLR}} - 1$$

- $V$ is the [[Variable Expenses|variable expense]] ratio, $Q_T$ the target [[Underwriting Profit|underwriting profit]] provision, and $F\%$ the [[Fixed Expenses|fixed expense]] ratio. **Fixed expenses sit in the numerator with the losses**, because they are a dollar cost per exposure rather than a percentage of premium — they do not scale with the rate being solved for.
- There is a second, simpler convention in which *all* expenses are treated as variable:

> $$\text{PLR}_{\text{all-variable}} = 1 - V - F\% - Q_T$$

  with the indication then being simply $\text{Projected LR} / \text{PLR} - 1$. This is the **all-variable expense method**; it gives the same overall rate level and distorts the distribution across policy sizes. Mixing the two conventions — subtracting $F\%$ in the denominator *and* adding it in the numerator — double-counts fixed expenses and is the most common error on this topic.
- The PLR is the complement of the target combined ratio: a $70\%$ PLR with a $25\%$ variable expense ratio implies a target combined ratio of $95\%$ and a $5\%$ underwriting profit.
- A higher variable expense ratio **lowers** the PLR, leaving less room for losses. Insurers with cheap distribution can run higher loss ratios profitably — which is why a loss ratio comparison across companies with different channels says little about relative pricing discipline.
- The PLR should include a provision for the **net cost of [[Reinsurance|reinsurance]]** where the indication is built gross, and for any [[Catastrophe Loss|catastrophe]] load handled as a percentage rather than in the loss projection.

![[Media/Figures/Permissible_Loss_Ratio.svg|340]]

> [!example]- Computing the PLR and the Indication {Example}
> An insurer's provisions: variable expenses $22\%$ of premium, fixed expenses $8\%$ of premium, target underwriting profit $5\%$. The projected loss and LAE ratio is $60\%$.
>
> Compute the indicated rate change under Werner's convention, and check it against the all-variable shortcut.
>
> > [!answer]-
> > **Werner convention** — fixed expenses in the numerator:
> >
> > $$\begin{align*}
> > \text{PLR} &= 1 - 0.22 - 0.05 = 0.73 \\[6pt]
> > \text{Indicated factor} &= \frac{0.60 + 0.08}{0.73} \\
> > &= \frac{0.68}{0.73} \\
> > &= 0.9315
> > \end{align*}$$
> >
> > an indicated change of $-6.8\%$.
> >
> > **All-variable shortcut:**
> >
> > $$\begin{align*}
> > \text{PLR} &= 1 - 0.22 - 0.08 - 0.05 = 0.65 \\[4pt]
> > \text{Indicated factor} &= \frac{0.60}{0.65} = 0.9231
> > \end{align*}$$
> >
> > an indicated change of $-7.7\%$.
> >
> > The two differ by about a point because the fixed expense ratio was measured at the *current* premium level; when rates change, the fixed dollars per exposure stay put while the all-variable method lets them move with premium. The Werner form is the correct one whenever the rate change is material.
> >
> > The error to avoid entirely is $\dfrac{0.60 + 0.08}{0.65} = 1.046$ — a $+4.6\%$ indication from charging fixed expenses twice, which flips the sign of the answer.

> [!example]- Reading Adequacy from the PLR {Example}
> Three books, each with a projected loss and LAE ratio of $68\%$ and a target underwriting profit of $5\%$:
>
> | Book | Variable expenses | Fixed expense ratio |
> |---|---|---|
> | Independent agency | $27\%$ | $9\%$ |
> | Captive agency | $20\%$ | $11\%$ |
> | Direct | $9\%$ | $16\%$ |
>
> Which are adequately rated?
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Agency: } \frac{0.68 + 0.09}{1 - 0.27 - 0.05} &= \frac{0.77}{0.68} = 1.132 \Rightarrow +13.2\% \\[6pt]
> > \text{Captive: } \frac{0.68 + 0.11}{1 - 0.20 - 0.05} &= \frac{0.79}{0.75} = 1.053 \Rightarrow +5.3\% \\[6pt]
> > \text{Direct: } \frac{0.68 + 0.16}{1 - 0.09 - 0.05} &= \frac{0.84}{0.86} = 0.977 \Rightarrow -2.3\%
> > \end{align*}$$
> >
> > Identical loss ratios, three different answers. The direct book can sustain a $68\%$ loss ratio and still return its target profit; the agency book needs a $13\%$ rate increase to reach the same place.
> >
> > The wider lesson: a loss ratio is meaningless as a measure of pricing adequacy without the expense structure behind it. This is also why the direct writer can quote below the agency writer on identical risks without under-pricing — and why the agency book will lose its best risks first.
