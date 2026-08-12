**Pure Premium Method** derives the indicated **rate** directly: project loss and LAE per exposure, add the fixed expense per exposure, and gross up for variable expenses and profit. It never divides by premium, so it requires no [[On-Leveling|on-levelling]].

> $$\text{Indicated Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$

> $$\text{Indicated Change} = \frac{\text{Indicated Rate}}{\text{Current Rate}} - 1$$

- The method produces an **absolute rate**, which is why it is the only choice for a **new** line or programme where there is no current rate to change. The [[Loss Ratio Method]] can only produce a change to something that already exists.
- Inputs: losses developed to ultimate and trended, [[Earned Exposure|earned exposures]] (trended if the base inflates — see [[Exposure Trend]]), the fixed expense per exposure $F$, the variable expense ratio $V$, and the target profit provision $Q_T$.
- The method's requirement is a **well-defined, stable exposure base**. Where exposures are not consistently recorded, or where the base changed mid-history, the pure premium is unreliable and the loss ratio method is preferred.
- Both methods are **algebraically equivalent** given consistent inputs, since $\text{Loss Ratio} = \text{Pure Premium} / \text{Average Premium}$. They differ in the data each demands: pure premium needs exposures, loss ratio needs premium on level.
- Advisory organizations file **loss costs** — pure premiums — leaving each insurer to apply its own expense and profit provisions through a loss cost multiplier. That division of labour only works in the pure premium framework.

![[Media/Figures/Pure_Premium_Method.svg|340]]

> [!example]- Pure Premium Indication {Example}
> Accident year $2023$: reported losses $\$1{,}200{,}000$ at $24$ months on $5{,}000$ earned exposures. The CDF to ultimate is $1.15$; loss trend is $4\%$ a year; exposure trend is $1\%$ a year; the trend period is $2.5$ years. Fixed expenses are $\$25$ per exposure, variable expenses $22\%$, target profit $5\%$. The current rate is $\$425$.
>
> Compute the indicated rate change.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Ultimate losses} &= \$1{,}200{,}000 \times 1.15 \\
> > &= \$1{,}380{,}000 \\[4pt]
> > \text{Trended losses} &= \$1{,}380{,}000 \times 1.04^{2.5} \\
> > &= \$1{,}380{,}000 \times 1.1030 \\
> > &= \$1{,}522{,}167 \\[4pt]
> > \text{Trended exposures} &= 5{,}000 \times 1.01^{2.5} \\
> > &= 5{,}126 \\[6pt]
> > \text{Pure premium} &= \frac{\$1{,}522{,}167}{5{,}126} \\
> > &= \$296.95
> > \end{align*}$$
> >
> > $$\begin{align*}
> > \text{Indicated rate} &= \frac{\$296.95 + \$25.00}{1 - 0.22 - 0.05} \\
> > &= \frac{\$321.95}{0.73} \\
> > &= \$441.03 \\[6pt]
> > \text{Indicated change} &= \frac{\$441.03}{\$425.00} - 1 \\
> > &= +3.8\%
> > \end{align*}$$
> >
> > Note that exposure trend appears in the **denominator** of the pure premium, partially offsetting the loss trend. Omitting it (dividing by $5{,}000$ instead of $5{,}126$) would give a pure premium of $\$304.43$ and an indication of $+6.3\%$ — an increase the insurer would collect automatically as its inflating exposure base grows.

> [!example]- Pure Premium and Loss Ratio Methods Agree {Example}
> Same book: trended on-level earned premium is $\$2{,}178{,}550$ ($5{,}126$ trended exposures at the current $\$425$ rate), fixed expense ratio $5.7\%$, variable expenses $22\%$, target profit $5\%$.
>
> Show the two methods give the same answer.
>
> > [!answer]-
> > **Loss ratio method:**
> >
> > $$\begin{align*}
> > \text{Projected LR} &= \frac{\$1{,}522{,}167}{\$2{,}178{,}550} = 69.87\% \\[6pt]
> > \text{Indicated factor} &= \frac{0.6987 + 0.057}{1 - 0.22 - 0.05} \\
> > &= \frac{0.7557}{0.73} \\
> > &= 1.0352
> > \end{align*}$$
> >
> > an indication of $+3.5\%$, against $+3.8\%$ from the pure premium method.
> >
> > The small residual is the fixed expense treatment: the pure premium method carries $F$ as $\$25$ per exposure, while the loss ratio method carries it as $5.7\%$ of the *current* premium ($\$24.23$). Force them to agree — set $F\% = \$25/\$425 = 5.88\%$ — and both give $+3.8\%$.
> >
> > The lesson is that the methods are equivalent **only if the inputs are consistent**. When an exam question produces different answers from the two methods, the discrepancy is almost always in the fixed expense provision or in whether exposures were trended.
