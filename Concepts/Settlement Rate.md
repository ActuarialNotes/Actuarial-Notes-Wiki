**Settlement Rate** (disposal rate, closure rate) is the proportion of a cohort's claims closed by a given maturity. A change in it distorts **paid** development in the same way a change in [[Case Adequacy|case adequacy]] distorts reported development.

> $$\text{Disposal Rate}_n = \frac{\text{Closed claims at age } n}{\text{Ultimate claim counts}}$$

- The denominator matters. Against **ultimate** counts the rate is comparable across accident years at the same maturity — the standard Berquist-Sherman definition. Against **reported** counts it is easier to compute but moves whenever the reporting pattern moves, confounding two effects.
- **Faster settlement** pushes losses from open to paid, so the recent paid diagonal is high relative to history. Historical paid factors — built when claims closed more slowly — then **over-develop** it and overstate ultimate.
- **Slower settlement** does the reverse and understates ultimate from paid data.
- **Reported data is largely immune**, because reported losses include the case reserve whether or not the claim has closed. So a paid-versus-reported divergence, together with a moving disposal rate, is the diagnostic pair.
- Drivers to ask about (Friedland Ch. 4): staffing levels and adjuster caseloads, changes in settlement authority, a "close the old inventory" initiative, litigation strategy, outsourcing, and the economic or legal environment.
- The remedy is the [[Berquist-Sherman Method|Berquist-Sherman]] paid adjustment: restate each historical year's paid losses to what they would have been at the *current* disposal pattern, by interpolating along each year's paid-versus-disposal-rate relationship, then select factors from the restated triangle.
- Watch the mix of **closed with payment** versus **closed without**. A drive to close files can inflate the closure rate with zero-payment closures, moving the rate without moving any money — visible only if the two are counted separately.

![[Media/Figures/Settlement_Rate.svg|340]]

> [!example]- Diagnosing a Settlement Rate Shift {Example}
> Disposal rates at $24$ months, against ultimate counts:
>
> | AY | $2018$ | $2019$ | $2020$ | $2021$ | $2022$ |
> |---|---|---|---|---|---|
> | Rate | $45\%$ | $47\%$ | $52\%$ | $58\%$ | $63\%$ |
>
> What does the pattern mean for a paid chain ladder?
>
> > [!answer]-
> > Closure at $24$ months has risen from $45\%$ to $63\%$ — claims are settling substantially faster, and the trend is steady rather than a one-off.
> >
> > Paid development factors from the older years describe a book that had disposed of $45\%$ of its claims by $24$ months. AY 2022 has disposed of $63\%$, so a much larger share of its ultimate cost is already paid. Applying the historical $24$-to-ultimate paid factor to AY 2022 develops it as though $55\%$ of claims were still open, when only $37\%$ are.
> >
> > The paid chain ladder therefore **overstates** ultimate for the recent years — the opposite of the intuitive answer, which is why this diagnostic is worth doing explicitly rather than reasoning about in the abstract.
> >
> > Two responses: restate the paid triangle to a common disposal rate (Berquist-Sherman) before selecting factors, or lean on **reported** methods, which this particular change does not distort.

> [!example]- Restating a Paid Triangle {Example}
> AY 2021 paid losses at $24$ months were $\$4{,}000{,}000$ at a $52\%$ disposal rate; at $36$ months, $\$5{,}600{,}000$ at a $70\%$ disposal rate. The current (target) disposal rate at $24$ months is $63\%$.
>
> Restate AY 2021's $24$-month paid losses to the current settlement pace.
>
> > [!answer]-
> > Interpolate along AY 2021's own paid-versus-disposal-rate relationship between its $24$- and $36$-month points:
> >
> > $$\begin{align*}
> > \text{Paid per point of disposal} &= \frac{\$5{,}600{,}000 - \$4{,}000{,}000}{70\% - 52\%} \\
> > &= \frac{\$1{,}600{,}000}{18} \\
> > &= \$88{,}889 \text{ per point}
> > \end{align*}$$
> >
> > $$\begin{align*}
> > \text{Adjusted paid at } 63\% &= \$4{,}000{,}000 + 11 \times \$88{,}889 \\
> > &= \$4{,}977{,}800
> > \end{align*}$$
> >
> > AY 2021's restated $24$-month paid figure is $\$4{,}977{,}800$ instead of $\$4{,}000{,}000$ — what it would have shown had it been closing claims at today's pace.
> >
> > Repeating this for every cell puts the whole triangle on the current disposal pattern, and the factors selected from it are the ones that legitimately apply to the current diagonal. Note the assumption being made: that paid losses move **linearly** with the disposal rate between observed points, which is reasonable over a short interpolation and increasingly strained over a long one.
