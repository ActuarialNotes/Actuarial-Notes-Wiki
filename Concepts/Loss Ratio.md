---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7fa3f3a836ced4c4a8dfd9861d7c99c486c90cdaa27aadeb8ab27fa69630313c
  sources: []
  open_findings: 0
  log: .verify/Concepts/Loss Ratio.md
---

**Loss Ratio** is losses (usually with LAE) divided by earned premium — the share of premium consumed by claims, and the central measure of rate adequacy.

> $$\text{Loss Ratio} = \frac{\text{Losses} + \text{LAE}}{\text{Earned Premium}}$$

> $$\text{Loss Ratio} = \frac{\text{Pure Premium}}{\text{Average Premium}}$$

- The second identity is worth remembering: the loss ratio is the pure premium divided by the average premium, so the [[Loss Ratio Method]] and the [[Pure Premium Method]] are two views of the same quantity.
- A loss ratio is only interpretable once its basis is stated. **[[Accident Year]] or [[Calendar Year]]?** **Reported or ultimate?** **Premium at current rate level or as written?** **With or without LAE?** Four binary choices give sixteen different numbers from one book, and comparisons across them are meaningless.
- Rate adequacy is judged against the [[Permissible Loss Ratio]], not against $100\%$: a projected loss ratio above the PLR means rates are inadequate even when the book appears to be making money.
- An **immature** accident-year loss ratio always understates the ultimate answer, and a **calendar-year** loss ratio contains prior-year reserve movements. Both are routinely quoted and both mislead if used for pricing.
- As a reserving diagnostic, the loss ratio series across accident years at a fixed maturity should move smoothly. A break in the series is a signal — a rate change not accounted for, a [[Mix of Business|mix shift]], a change in [[Case Adequacy|case adequacy]] — and is the entry point to the analysis, not the conclusion.

![[Media/Figures/Loss_Ratio.svg|340]]

> [!example]- Rate Adequacy Against the Permissible Loss Ratio {Example}
> An insurer projects ultimate losses and LAE of $\$715{,}000$ against trended on-level earned premium of $\$1{,}000{,}000$. Variable expenses are $25\%$ of premium and the target underwriting profit provision is $5\%$; there are no fixed expenses.
>
> Is the book adequately rated?
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Loss ratio} &= \frac{\$715{,}000}{\$1{,}000{,}000} = 71.5\% \\[4pt]
> > \text{PLR} &= 1 - 0.25 - 0.05 = 70.0\%
> > \end{align*}$$
> >
> > $$\text{Indicated change} = \frac{0.715}{0.700} - 1 = +2.1\%$$
> >
> > The book is running a $71.5\%$ loss ratio and needs $70.0\%$ — inadequate by $2.1\%$, despite the loss ratio being comfortably below $100\%$. Comparing a loss ratio to $100\%$ rather than to the PLR is one of the most common errors in reading insurance results.

> [!example]- The Same Book, Four Loss Ratios {Example}
> For accident year $2024$ an insurer reports: earned premium $\$10{,}000{,}000$ (rates rose $10\%$ on $1/1/2024$, so the average rate level index is $1.05$ against a current level of $1.10$); reported losses $\$5{,}800{,}000$ at $12$ months; selected CDF $1.32$; LAE load $12\%$ of loss.
>
> Compute the loss ratio on four bases and identify which one drives a rate decision.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{(1) Reported, no LAE, as-written premium} &= \frac{\$5{,}800{,}000}{\$10{,}000{,}000} = 58.0\% \\[6pt]
> > \text{(2) Ultimate, no LAE} &= \frac{\$5{,}800{,}000 \times 1.32}{\$10{,}000{,}000} = 76.6\% \\[6pt]
> > \text{(3) Ultimate with LAE} &= \frac{\$7{,}656{,}000 \times 1.12}{\$10{,}000{,}000} = 85.7\% \\[6pt]
> > \text{(4) Ultimate, LAE, on-level premium} &= \frac{\$8{,}574{,}700}{\$10{,}476{,}200} = 81.8\%
> > \end{align*}$$
> >
> > (On-level premium is $\$10{,}000{,}000 \times 1.10/1.05 = \$10{,}476{,}200$.)
> >
> > The spread between $58.0\%$ and $85.7\%$ is nearly thirty points, and every figure is arithmetically correct. Only **(4)** — ultimate losses including LAE, over premium at current rate level — answers "are today's rates adequate", and it is the number that goes into the indication. Figure (1) is the one most often quoted in a management report.
