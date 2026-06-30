**Mix of Business** is the distribution of an insurer's portfolio across rating segments — territories, classes, limits, deductibles, lines, and risk quality. A shift in this mix changes aggregate losses, premiums, and development patterns even when the rates and underlying cost level for each segment are unchanged.

- In **ratemaking**, a changing mix distorts trend and on-level signals: if business shifts toward higher-cost segments, the overall loss ratio rises with no change in adequacy for any individual segment. Class and territory ratemaking partly control for this by analyzing relativities at the segment level.
- In **reserving**, a mix shift violates the homogeneity assumption behind a [[Development Triangle]]: blending segments with different settlement speeds or severities changes the selected [[Age to Age Factor|age-to-age factors]] over time, so a mix change can masquerade as a development-pattern change.
- A mix shift is one of the **external/internal environment changes** an actuary must diagnose and adjust for (alongside rate-level changes, case-adequacy shifts, and inflation) when selecting unpaid-claim estimates.
- Mix shifts are often **endogenous to pricing**: a large [[Rate Change]] on one segment drives anti-selection — preferred risks leave, worse risks stay — degrading the remaining portfolio's experience.

> [!example]- Mix Shift Inflates the Overall Loss Ratio {Example}
> An insurer writes two territories. Each has a stable, adequate loss ratio. The book shifts from Year 1 to Year 2:
>
> | Territory | LR | Year 1 weight | Year 2 weight |
> |---|---|---|---|
> | Urban | $80\%$ | $40\%$ | $70\%$ |
> | Rural | $55\%$ | $60\%$ | $30\%$ |
>
> > [!answer]-
> > Year 1 overall LR $= 0.40(80\%) + 0.60(55\%) = 32\% + 33\% = 65\%$
> >
> > Year 2 overall LR $= 0.70(80\%) + 0.30(55\%) = 56\% + 16.5\% = 72.5\%$
> >
> > The overall loss ratio jumped $7.5$ points purely from the shift toward urban business — **no territory's rates became inadequate**. Reacting with an across-the-board rate increase would over-correct; the right response is at the territory-relativity level.
