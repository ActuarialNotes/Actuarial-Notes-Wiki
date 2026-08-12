**Case Outstanding Development Method** projects future payments from the **case outstanding** balance rather than from paid or reported losses — developing the reserve the claims department has already set, instead of the losses that have emerged.

> $$U = \text{Paid to date} + \text{Case Outstanding} \times f_{\text{case}}$$

> $$f_{\text{case}} = \frac{\text{All future payments}}{\text{Current case outstanding}}$$

- $f_{\text{case}}$ converts the current case balance into *all* remaining payments — including payments on claims not yet reported. It is estimated from mature years: for each historical cohort, divide everything paid after a given valuation by the case outstanding at that valuation.
- Friedland's fuller version works period by period, using two ratios estimated from history: **paid in the next period ÷ case outstanding at the start**, and **case outstanding at the end ÷ case outstanding at the start**. Rolling these forward generates a payment stream and runs the case balance down to zero.
- The method suits books where **case reserving is consistent and disciplined** — case outstanding is then a genuine forecast of the remaining cost — and where paid patterns are distorted by changing [[Settlement Rate|settlement rates]].
- Its weakness is the mirror image: it depends entirely on case adequacy being stable. A [[Case Adequacy|strengthening]] inflates the base to which $f_{\text{case}}$ is applied, and the historical factor was estimated under the old, weaker regime.
- It is the natural companion to a **paid** projection rather than a substitute: paid data and case data are independent inputs, so agreement between the two is meaningful evidence.
- Do **not** develop paid losses to ultimate and then add developed case outstanding — that double counts. Paid-to-date is taken at face value; only the case balance is developed.

![[Media/Figures/Case_Outstanding_Development_Method.svg|340]]

> [!example]- Projecting from Case Outstanding {Example}
> AY 2023 at $24$ months: paid to date $\$800{,}000$, case outstanding $\$500{,}000$, so reported is $\$1{,}300{,}000$. From mature accident years, payments after $24$ months have averaged $2.00$ times the case outstanding at $24$ months.
>
> Estimate ultimate losses and IBNR, and compare with a reported chain ladder at $\text{CDF} = 1.350$.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Future payments} &= \$500{,}000 \times 2.00 \\
> > &= \$1{,}000{,}000 \\[4pt]
> > U &= \$800{,}000 + \$1{,}000{,}000 \\
> > &= \$1{,}800{,}000 \\[4pt]
> > \text{IBNR} &= \$1{,}800{,}000 - \$1{,}300{,}000 \\
> > &= \$500{,}000
> > \end{align*}$$
> >
> > Reported chain ladder:
> >
> > $$\$1{,}300{,}000 \times 1.350 = \$1{,}755{,}000$$
> >
> > The two are within $2.6\%$ — reassuring, and worth more than either estimate alone, because they use different information. The chain ladder uses the emergence pattern of reported losses; the case method uses only paid-to-date and the current reserve balance.
> >
> > Note the paid figure is **not** developed. Adding a developed paid projection ($\$800{,}000 \times 1.50 = \$1{,}200{,}000$) to the developed case balance would give $\$2{,}200{,}000$ and count the same future payments twice.

> [!example]- When Case Adequacy Shifts {Example}
> The same book strengthens case reserves by $30\%$ during $2024$. At $12/31/2024$, AY 2023 at $36$ months shows paid $\$1{,}100{,}000$ and case outstanding $\$650{,}000$. The historical $36$-month case factor, estimated from years reserved under the old regime, is $1.60$.
>
> What does the method give, and what is wrong with it?
>
> > [!answer]-
> > Applied mechanically:
> >
> > $$U = \$1{,}100{,}000 + \$650{,}000 \times 1.60 = \$2{,}140{,}000$$
> >
> > The problem: the $\$650{,}000$ case balance is $30\%$ stronger than the balances from which $1.60$ was estimated. Under the old regime the same claims would have carried about
> >
> > $$\frac{\$650{,}000}{1.30} = \$500{,}000$$
> >
> > and the historical factor is calibrated to *that* level of reserving. Applying $1.60$ to the strengthened balance builds the strengthening into the projection twice.
> >
> > Two defensible fixes:
> >
> > 1. **Restate the factor.** If case reserves are now $30\%$ closer to their eventual settlement values, the future-payments-to-case ratio should fall correspondingly: roughly $1.60/1.30 = 1.23$, giving
> >
> > $$U = \$1{,}100{,}000 + \$650{,}000 \times 1.23 = \$1{,}900{,}000$$
> >
> > 2. **Restate the history** with the [[Berquist-Sherman Method|Berquist-Sherman]] case adjustment and re-estimate the factor from the restated triangle — more work, and more defensible, because it does not assume the adequacy change translates one-for-one into the ratio.
> >
> > The general warning: every method that leans on case reserves — this one, the reported [[Chain Ladder Method|chain ladder]], average case outstanding diagnostics — inherits whatever the claims department's reserving philosophy is doing.
