---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9aff20dbdb1dc50d300e69321cd01f0614f1f22ceec78ae5ec2987d672f0d273
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Interest Rate Risk.md
---

**Interest Rate Risk** is the risk that a change in the level or shape of the [[Yield Curve|yield curve]] reduces an insurer's economic value — through the market value of its bonds, the present value of its loss reserves and the value of its future business — or its earnings, through the rates at which its cash flows are reinvested. Asset–liability management (ALM) is the practice of measuring and controlling it.

> $$\Delta S \approx -\left(A\,D_A - L\,D_L\right)\Delta y$$

> $$\Delta V \approx -\left(A\,D_A - L\,D_L + F\,D_F\right)\Delta y$$

- $A$ and $L$ are the market values of assets and liabilities, $S = A - L$ surplus, $D$ each item's [[Modified Duration|modified]] (or effective) duration, and $\Delta y$ a parallel yield change. $F$ is **franchise value** — the present value of profits on future renewals — and $V = A - L + F$ the firm's total economic value. Surplus duration $D_S = (A D_A - L D_L)/S$ shows how leverage amplifies any mismatch.
- **Price and reinvestment risk.** Rising rates cut bond values ([[Price Risk]]); falling rates cut the yield on reinvested cash flows ([[Reinvestment Risk]]). The two offset when durations are matched, which is the basis of [[Duration Matching]] and [[Immunization]]; [[Convexity]] governs how well a match survives large moves.
- **Beyond parallel shifts and fixed cash flows.** Key-rate durations capture twists in the curve. Assets with embedded options — mortgage-backed securities ([[Prepayment Risk]]) and [[Callable Bond|callable bonds]] — need effective duration and have negative convexity. P&C reserves are not fixed nominal amounts: claim inflation, which tends to move with rates, partly offsets the fall in their present value when rates rise.
- **Franchise value (Panning).** ALM as usually practised manages only the balance sheet that accounting shows and ignores franchise value, which is invisible to accounting but can be a large share of market value. It has a long duration, especially when renewal premiums are priced to a fixed target return: a rate rise then shrinks both the discount factor and the premiums themselves. Hedging it with asset duration alone may require a zero or negative asset duration — infeasible, and alarming to regulators and rating agencies who see only the accounting numbers. Panning's alternative is a **pricing strategy** whose target return moves with interest rates, which shortens the duration of franchise value directly.
- **Tools.** Duration and cash-flow matching, interest rate swaps and futures, and pricing policy. Interest rate risk is measured on the same economic balance sheet as the rest of the insurer's [[Financial Risk|financial risk]], and managed within [[Financial Risk Management]].

> [!example]- Surplus Duration and the Immunizing Asset Duration {Example}
> Assets are $\$1{,}000$M with duration $4.5$; liabilities are $\$700$M with duration $2.5$. Estimate the change in surplus if yields rise $1\%$, and find the asset duration that would immunize surplus.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > D_S &= \frac{1{,}000(4.5) - 700(2.5)}{300} \\
> > &= \frac{2{,}750}{300} \\
> > &= 9.17 \\
> > \Delta S &\approx -9.17 \times 0.01 \times 300 \\
> > &= -\$27.5\text{M}
> > \end{align*}
> > $$
> >
> > Surplus falls about $9.2\%$ although assets fall only $4.5\%$. Setting the dollar durations equal, $1{,}000\,D_A = 700(2.5)$, gives $D_A = 1.75$.

> [!example]- Franchise Value and Total Economic Value (Panning) {Example}
> Panning's simplified insurer holds assets of $126.19$ against losses with present value $71.43$, both treated as having duration $1$, so its current economic value is $C = 54.76$ with duration $1$. Its franchise value is $F = 28.57$ with duration $17.62$.
>
> (a) Find the duration of total economic value. (b) Find it again if invested assets are moved to duration $0$. (c) What asset duration would make it zero?
>
> > [!answer]-
> > **(a)** $V = 54.76 + 28.57 = 83.33$.
> >
> > $$
> > \begin{align*}
> > D_V &= \frac{54.76(1) + 28.57(17.62)}{83.33} \\
> > &= \frac{558.16}{83.33} \\
> > &= 6.70
> > \end{align*}
> > $$
> >
> > Franchise value contributes a dollar duration of $28.57 \times 17.62 = 503.40$.
> >
> > **(b)** With zero-duration assets, the current balance sheet's dollar duration is just $-71.43$ from the liabilities:
> >
> > $$
> > \begin{align*}
> > D_V &= \frac{-71.43 + 503.40}{83.33} \\
> > &= 5.18
> > \end{align*}
> > $$
> >
> > **(c)** Zero requires $126.19\,D_A = 71.43 - 503.40$, so $D_A = -3.42$.
> >
> > A duration-matched balance sheet leaves the firm's value with a duration of $6.7$, and even cash-only assets leave $5.2$. Panning shows that changing the pricing rule so that the target return moves one-for-one with the risk-free rate cuts the franchise value's duration to $7.62$ and the firm's to $3.27$ — without any asset position a regulator would question.
