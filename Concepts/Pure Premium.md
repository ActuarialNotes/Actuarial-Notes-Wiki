**Pure Premium** (also *loss cost* or *burning cost*) is expected loss and LAE per unit of exposure — the portion of the rate that pays claims, before any provision for expenses or profit.

> $$\text{Pure Premium} = \frac{\text{Losses} + \text{LAE}}{\text{Earned Exposures}}$$

> $$\text{Pure Premium} = \text{Frequency} \times \text{Severity}$$

- The identity holds because $\dfrac{\text{Losses}}{\text{Exposures}} = \dfrac{\text{Claims}}{\text{Exposures}} \times \dfrac{\text{Losses}}{\text{Claims}}$ — and it is what allows the two components to be trended, developed and diagnosed separately ([[Frequency]], [[Severity]]).
- Pure premium is the building block of the [[Pure Premium Method]] indication, where the indicated rate is the projected pure premium plus fixed expenses, grossed up for variable expenses and profit.
- It is also how the [[Loss Ratio|loss ratio]] connects to the rate: $\text{Loss Ratio} = \text{Pure Premium} / \text{Average Premium}$, so a class whose pure premium is twice the book's needs twice the average premium to run the same loss ratio.
- Advisory organizations (ISO, NCCI) file **loss costs** — pure premiums — rather than rates, leaving each insurer to add its own expense and profit provisions through a loss cost multiplier.
- The pure premium used in a rate is always **projected**: historical losses developed to ultimate, trended to the forecast period, adjusted for [[Large Loss|large losses]] and [[Catastrophe Loss|catastrophes]], and divided by exposures that are themselves trended if the base inflates ([[Exposure Trend]]).

![[Media/Figures/Pure_Premium.svg|340]]

> [!example]- Pure Premium from Frequency and Severity {Example}
> A homeowners book has $12{,}000$ earned house-years, $960$ ultimate claims and $\$5{,}280{,}000$ of ultimate losses and LAE.
>
> Compute the pure premium two ways.
>
> > [!answer]-
> > Directly:
> >
> > $$\text{Pure premium} = \frac{\$5{,}280{,}000}{12{,}000} = \$440 \text{ per house-year}$$
> >
> > Through the components:
> >
> > $$\begin{align*}
> > \text{Frequency} &= \frac{960}{12{,}000} = 0.080 \\[4pt]
> > \text{Severity} &= \frac{\$5{,}280{,}000}{960} = \$5{,}500 \\[4pt]
> > \text{Pure premium} &= 0.080 \times \$5{,}500 = \$440 \;\checkmark
> > \end{align*}$$
> >
> > If the average premium is $\$680$, the loss ratio is $\$440/\$680 = 64.7\%$ — the third view of the same fact.

> [!example]- Trending Pure Premium Through Its Components {Example}
> The same book has a frequency trend of $-1.5\%$ a year and a severity trend of $+6.0\%$ a year. The trend period is $2.5$ years.
>
> Project the pure premium, and compare with trending the pure premium directly at a selected $4.4\%$.
>
> > [!answer]-
> > **Component trending:**
> >
> > $$\begin{align*}
> > \text{Frequency factor} &= 0.985^{2.5} = 0.9629 \\
> > \text{Severity factor} &= 1.060^{2.5} = 1.1593 \\[4pt]
> > \text{Combined} &= 0.9629 \times 1.1593 = 1.1162
> > \end{align*}$$
> >
> > $$\text{Projected PP} = \$440 \times 1.1162 = \$491.13$$
> >
> > **Direct pure premium trending** at $4.4\%$:
> >
> > $$1.044^{2.5} = 1.1129 \Rightarrow \$440 \times 1.1129 = \$489.68$$
> >
> > The two are within $0.3\%$, because $1.06 \times 0.985 = 1.0441$ — the implied pure premium trend. The component approach is preferred not because it gives a different answer but because it is **diagnosable**: an actuary can defend $-1.5\%$ frequency and $+6.0\%$ severity against external evidence (repair costs, safety technology, litigation rates) in a way that a single blended $4.4\%$ cannot be defended.
