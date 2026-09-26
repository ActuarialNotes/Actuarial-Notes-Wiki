---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d5ecaeb795512b415bbd05cd0ca27fa616619483c5e6f082197bb9ea61a83dff
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/1st-Order Macaulay Approximation.md
---

The **1st-order Macaulay approximation** estimates the price $P(i)$ of a bond or other cash-flow stream at a new [[Yield Rate|yield]] $i$ from its price $P(i_0)$ and its [[Macaulay Duration]] $D_{Mac}$ at the current yield $i_0$, by treating the whole stream as if it were a single payment due at time $D_{Mac}$.

> $$P(i) \approx P(i_0)\left(\frac{1+i_0}{1+i}\right)^{D_{Mac}}$$

- $i_0$ and $i$ are effective rates per period, and $D_{Mac} = D_{Mac}(i_0)$ is measured in those same periods.
- **Where it comes from.** With $\delta = \ln(1+i)$ the [[Force of Interest]], $\frac{d \ln P}{d\delta} = -D_{Mac}$. Holding that slope fixed gives $\ln P(i) \approx \ln P(i_0) - D_{Mac}\,(\delta - \delta_0)$, and exponentiating gives the formula. It is therefore **exact for a single cash flow** (a zero-coupon bond) and approximate for anything with several payment dates.
- **Contrast with the [[1st-Order Linear Approximation]]**, which uses [[Modified Duration]] and is a straight tangent line: $P(i) \approx P(i_0)\left[1 - (i - i_0)\,D_{Mod}\right]$. The two agree in level and slope at $i_0$, but the Macaulay version is a curve, so it never goes negative and picks up part of the [[Convexity]].
- **Ordering.** For a stream of positive cash flows, at every yield: linear estimate $\le$ Macaulay estimate $\le$ exact price. Both first-order methods understate the price, and the Macaulay one is always the closer — whether yields rise or fall.
- Exam use: given only $P(i_0)$ and $D_{Mac}$, estimate the new price or present value of an asset or liability; used in [[Immunization]] and [[Duration Matching]] to compare how assets and liabilities move.

> [!example]- Repricing a Coupon Bond After a Rate Rise {Example}
> A 5-year \$1,000 bond pays annual coupons of \$60 and is priced at a yield of $i_0 = 5\%$. Find its price and Macaulay duration, then estimate the price at $i = 7\%$ with the 1st-order Macaulay and 1st-order linear approximations, and compare with the exact price.
>
> > [!answer]-
> > Present values of the cash flows at 5%: $57.14,\ 54.42,\ 51.83,\ 49.36,\ 830.54$.
> >
> > $$
> > \begin{align*}
> > P(0.05) &= 1{,}043.29 \\
> > D_{Mac} &= \frac{1(57.14) + 2(54.42) + 3(51.83) + 4(49.36) + 5(830.54)}{1{,}043.29} \\
> > &= \frac{4{,}671.61}{1{,}043.29} \\
> > &= 4.4778
> > \end{align*}
> > $$
> >
> > Macaulay approximation:
> >
> > $$
> > \begin{align*}
> > P(0.07) &\approx 1{,}043.29\left(\frac{1.05}{1.07}\right)^{4.4778} \\
> > &= 1{,}043.29 \times 0.91898 \\
> > &= 958.76
> > \end{align*}
> > $$
> >
> > Linear approximation, with $D_{Mod} = 4.4778/1.05 = 4.2645$:
> >
> > $$
> > \begin{align*}
> > P(0.07) &\approx 1{,}043.29\left[1 - (0.02)(4.2645)\right] \\
> > &= 954.31
> > \end{align*}
> > $$
> >
> > The exact price at 7% is \$959.00. The Macaulay estimate misses by \$0.24, the linear one by \$4.69 — both are below the true price, as they must be.

> [!example]- Present Value of a Claims Liability When Rates Move {Example}
> An insurer's run-off liabilities have a present value of \$10,000,000 at an effective rate of 4% and a Macaulay duration of 6.2 years. Estimate the present value if the rate rises to 5%.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > PV(0.05) &\approx 10{,}000{,}000\left(\frac{1.04}{1.05}\right)^{6.2} \\
> > &= 9{,}423{,}952
> > \end{align*}
> > $$
> >
> > The liability's value falls by about \$576,000. The linear approximation, $10{,}000{,}000\,[1 - 0.01(6.2/1.04)] = 9{,}403{,}846$, gives a slightly larger fall; the true value lies above both.
