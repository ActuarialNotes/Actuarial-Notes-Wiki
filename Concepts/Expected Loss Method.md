**Expected Loss Method** (expected claims technique) estimates ultimate losses entirely from an a priori expectation — usually an expected loss ratio applied to earned premium — giving **no weight** to what has actually been reported.

> $$U = \text{ELR} \times \text{Earned Premium}$$

> $$\text{IBNR} = U - \text{Reported}$$

- It is one end of the spectrum the reserving methods occupy: **expected claims** puts $100\%$ weight on the a priori, the [[Chain Ladder Method|chain ladder]] puts $100\%$ on actual emergence, and the [[Bornhuetter-Ferguson Method|BF]] method blends them by the percentage reported.
- Its virtue is **stability**: the estimate does not move with a thin diagonal, so a single early large claim or a slow month of reporting cannot swing it. Its vice is the same thing — it ignores real information once real information exists.
- The right use is a **very immature** cohort (a few months old), a **new line or programme** with no history, or a cohort whose data is known to be corrupt. It is also standard as a **cross-check**: a chain ladder result far from the expected claims estimate demands an explanation.
- The **ELR** is the whole method, and it must be derived, not assumed: from the pricing indication for that year, from mature years' ultimate loss ratios adjusted for [[Rate Level Change|rate level]] and [[Loss Trend|trend]], or from [[External Information in Reserving|industry benchmarks]].
- The estimate ignores emergence, so it can produce a **negative implied IBNR** if reported losses already exceed the a priori — an outcome that is a signal the ELR is wrong, not a reserve credit to be booked.

> [!example]- Applying the Expected Loss Method {Example}
> An accident year is three months old. Earned premium is $\$2{,}000{,}000$, the selected ELR is $65\%$, and reported losses are $\$50{,}000$.
>
> Estimate ultimate losses and IBNR.
>
> > [!answer]-
> > $$\begin{align*}
> > U &= 0.65 \times \$2{,}000{,}000 = \$1{,}300{,}000 \\[4pt]
> > \text{IBNR} &= \$1{,}300{,}000 - \$50{,}000 = \$1{,}250{,}000
> > \end{align*}$$
> >
> > The $\$50{,}000$ reported is used only to split the estimate between reported and IBNR — it plays no part in setting the ultimate.
> >
> > That is the correct treatment at this maturity. A chain ladder here would need a $12$-month-equivalent factor of perhaps $20$ or more, and multiplying $\$50{,}000$ by it would produce an estimate driven entirely by whether one claim happened to be reported before the valuation date.

> [!example]- Deriving the ELR from Mature Years {Example}
> An actuary must set the a priori ELR for accident year $2024$. Mature years' ultimate loss ratios: AY $2019$ $= 71\%$, AY $2020$ $= 69\%$, AY $2021$ $= 73\%$. Rate changes since $2020$ (the chosen base): $+8\%$ ($2022$), $+12\%$ ($2023$), $+5\%$ ($2024$). Annual loss trend is $6\%$; annual exposure/premium trend is $2\%$.
>
> Derive the ELR.
>
> > [!answer]-
> > Select $70\%$ as the base-year (AY 2020) expectation, from the three mature years.
> >
> > Four years of loss trend against four years of rate change and premium trend:
> >
> > $$\begin{align*}
> > \text{Loss level} &= 1.06^{4} = 1.2625 \\[4pt]
> > \text{Premium level} &= 1.08 \times 1.12 \times 1.05 \times 1.02^{4} \\
> > &= 1.2701 \times 1.0824 \\
> > &= 1.3748
> > \end{align*}$$
> >
> > $$\begin{align*}
> > \text{ELR}_{2024} &= 0.70 \times \frac{1.2625}{1.3748} \\
> > &= 0.70 \times 0.9183 \\
> > &= 64.3\%
> > \end{align*}$$
> >
> > Rate action plus premium trend outran loss trend over the four years, so the expected loss ratio falls from $70\%$ to $64.3\%$.
> >
> > Carrying the unadjusted $70\%$ into a BF or expected claims calculation would overstate AY 2024 IBNR by roughly $9\%$ — and would keep overstating it every year the insurer stayed ahead of trend, producing reserves that run redundant while the analysis looks perfectly stable. This adjustment is the same one described under [[Rate Level Change]], and it is where most of the error in a priori methods actually lives.
