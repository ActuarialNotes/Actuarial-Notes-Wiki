---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2993798ec2e5588b93b4a6f89220028e170b1e19818132665555b3f110bf1d2b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Exposure Trend.md
---

**Exposure Trend** is the systematic change over time in the average value of a dollar-denominated [[Exposure Base|exposure base]] — payroll, sales, amount of insurance — arising from inflation and drift in the book rather than from a change in the number of risks.

> $$\text{Trended Exposure} = \text{Historical Exposure} \times (1 + t_E)^{n}$$

- $t_E$ is the annual exposure trend and $n$ the trend period in years, measured from the average date of the historical period to the average date of the forecast period — the same period used for [[Loss Trend|loss trend]].
- Exposure trend applies **only** to inflation-sensitive bases. Car-years and house-years do not inflate; payroll, receipts and amount of insurance do.
- In the [[Pure Premium Method]] the exposure trend sits in the denominator and therefore **offsets** loss trend. The quantity that matters is the *net* pure premium trend:

> $$1 + t_{\text{net}} = \frac{1 + t_L}{1 + t_E}$$

- Ignoring exposure trend on an inflating base understates the future denominator, overstates the projected pure premium, and produces an indicated increase the insurer does not need — because the same inflation that drives the losses is already raising the premium base automatically.
- Under the [[Loss Ratio Method]] the effect enters through [[Premium Trend|premium trend]] instead: the premium at current rates grows with the exposure base even with no rate change, so the two methods handle the same phenomenon in different places and must not both be applied.

![[Media/Figures/Exposure_Trend.svg|340]]

> [!example]- Net Pure Premium Trend in Workers Compensation {Example}
> A workers compensation book has accident-year-2023 payroll of $\$50{,}000{,}000$ and losses of $\$1{,}600{,}000$. Annual wage (exposure) trend is $3.0\%$, annual loss trend is $6.0\%$, and the trend period is $2.5$ years.
>
> Project the pure premium per $\$100$ of payroll.
>
> > [!answer]-
> > Trending each side separately:
> >
> > $$\begin{align*}
> > \text{Trended payroll} &= \$50{,}000{,}000 \times 1.03^{2.5} \\
> > &= \$50{,}000{,}000 \times 1.0764 \\
> > &= \$53{,}820{,}000 \\[6pt]
> > \text{Trended losses} &= \$1{,}600{,}000 \times 1.06^{2.5} \\
> > &= \$1{,}600{,}000 \times 1.1593 \\
> > &= \$1{,}854{,}880
> > \end{align*}$$
> >
> > $$\begin{align*}
> > \text{Projected PP per \$100} &= \frac{\$1{,}854{,}880}{\$53{,}820{,}000 / 100} \\
> > &= \$3.446
> > \end{align*}$$
> >
> > Against the historical pure premium of $\$1{,}600{,}000 / (\$50{,}000{,}000/100) = \$3.200$, the net increase is
> >
> > $$\frac{1.06^{2.5}}{1.03^{2.5}} = \frac{1.1593}{1.0764} = 1.0770$$
> >
> > i.e. $+7.7\%$ over $2.5$ years, or about $3.0\%$ a year — the $6\%$ loss trend net of the $3\%$ wage trend.

> [!example]- The Cost of Forgetting Exposure Trend {Example}
> Using the same book, an actuary trends losses at $6\%$ but leaves payroll at its historical level.
>
> What indication results, and what is the error?
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Untrended-exposure PP} &= \frac{\$1{,}854{,}880}{\$50{,}000{,}000 / 100} \\
> > &= \$3.710
> > \end{align*}$$
> >
> > against the correct $\$3.446$:
> >
> > $$\frac{3.710}{3.446} - 1 = +7.7\%$$
> >
> > The actuary would indicate a rate $7.7\%$ higher than needed. The reason is that the rate is charged *per $\$100$ of payroll*: as wages inflate, premium rises automatically at the current rate level without any filing. Charging a higher rate on top of an already-inflating base double-counts wage inflation — the exposure-side twin of the classic "trend and develop the same growth twice" error described in [[Loss Development]].
