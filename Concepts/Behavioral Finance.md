---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8fdf6de42f4cc118ad6be10bed6098588a19b7f3ca35b79808121af9f940f489
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Behavioral Finance.md
---
**Behavioral Finance** is the study of financial markets with models in which some investors are not fully rational, either because of their preferences or because of mistaken beliefs. In Ritter's (2003) account it rests on two building blocks:

1. **Cognitive psychology**, which describes the systematic errors people make in how they think.
2. **The limits to arbitrage**, which explain when rational traders cannot correct the mispricing those errors cause.

The efficient markets hypothesis does not assume every investor is rational. It assumes that competition among investors makes prices unbiased forecasts of value. Behavioral finance holds that in some circumstances markets are informationally inefficient. Not every mispricing comes from psychology, though. Ritter notes that when Yahoo was added to the S&P 500 in 1999, forced buying by index funds drove its price up by more than 50% in a week.

## Cognitive biases

Ritter's section on cognitive psychology describes these [[Cognitive Bias|biases]]:

- **Heuristics** are rules of thumb that make decisions easier but bias them when circumstances change. Many savers split money by the $1/N$ rule, so the share in equities depends on how many of the offered funds hold stocks.
- **Overconfidence** is overrating one's abilities. It shows up as too little diversification, as in investing heavily in one's employer or local companies, and as excessive trading, which Barber and Odean found lowered returns, more so for men than for women.
- **Mental accounting** is separating decisions that should be combined, such as keeping separate budgets for food at home and dining out.
- **Framing** is the presentation of a choice changing the decision, as with an early-bird discount that is accepted where an equal peak surcharge would not be.
- **Representativeness** is putting too much weight on recent experience, so a long run of high equity returns comes to look normal.
- **Conservatism** is being slow to notice change and anchoring on how things have been. It points the opposite way to representativeness, so underreaction can come first and overreaction later. Ritter notes that choosing the bias after the fact to explain any pattern is a criticism of the field.
- **The disposition effect** is the reluctance to realize paper losses and the readiness to realize paper gains. Investors sell winners too early and hold losers too long, acting as if trying to maximize their taxes, since realizing losses would lower them.

Ritter's example of the disposition effect is a stock bought at \$30 that falls to \$22 and recovers to \$28, which most holders will not sell until it is above \$30. A prospect theory value function reproduces it. For a gain or loss $x$ measured from a reference point such as the purchase price, the value is

> $$v(x) = \begin{cases} x^{\alpha} & x \ge 0 \\ -\kappa\,(-x)^{\beta} & x < 0 \end{cases}$$

- $\alpha, \beta < 1$ make the curve concave for gains and convex for losses.
- $\kappa > 1$ is loss aversion.

> [!example]- With a \$30 purchase price, does this investor sell or hold at \$28, and at \$34? {Example}
> The investor's value function has $\alpha = \beta = 0.88$ and $\kappa = 2.25$. At \$28, the stock will next be worth \$30 or \$26 with equal probability. At \$34, it will be worth \$36 or \$32 with equal probability.
>
> > [!answer]-
> > - Selling at \$28 is a sure loss of 2, with value $-2.25(2)^{0.88} = -4.14$.
> > - Holding gives a loss of 0 or 4, with value $0.5(0) + 0.5\big(-2.25(4)^{0.88}\big) = -3.81$, so the investor holds.
> > - Selling at \$34 is a sure gain of 4, with value $4^{0.88} = 3.39$.
> > - Holding gives a gain of 6 or 2, with value $0.5(6)^{0.88} + 0.5(2)^{0.88} = 3.34$, so the investor sells.
> > - In both cases the expected price is the price today, so the decisions come from preferences, not information. Holding the loser and selling the winner is the disposition effect.

## Limits to arbitrage

Misvaluations that recur are traded away, so markets are efficient for them, at least relatively. Long-term, nonrepeating misvaluations persist, because arbitrage takes capital and time, and short sales can be constrained. An arbitrageur forced to close at the worst moment, as [[Hedge Fund|hedge funds]] such as LTCM were in 1998, adds to the mispricing. Ritter's examples of large misvaluations include the 1980s Japanese bubble, the 1987 crash and the 1999 to 2000 technology bubble.

Royal Dutch and Shell have shared the group's cash flows 60 to 40 since 1907, so efficient prices would keep the ratio of their market values $V_{\text{RD}}/V_{\text{Shell}}$ at $1.5$. The deviation from that parity is

> $$d = \frac{V_{\text{RD}}}{1.5\,V_{\text{Shell}}} - 1$$

> [!example]- What is the deviation from parity, and what does a dividend-hedged trade lose if Royal Dutch falls to a −20% deviation? {Example}
> Royal Dutch has a market value of \$72 billion and Shell of \$54 billion. An arbitrageur buys \$100 million of Royal Dutch and hedges its dividends by shorting Shell. Shell's value then stays unchanged while Royal Dutch falls.
>
> > [!answer]-
> > - The deviation is $72/(1.5 \times 54) - 1 = 72/81 - 1 = -11.1\%$, so Royal Dutch is cheap relative to Shell.
> > - \$100 million buys a share $100/72{,}000$ of Royal Dutch's dividends. Hedging them takes a short in $1.5$ times that share of Shell, so the 60% and 40% dividend shares cancel.
> > - The Shell short is $1.5 \times (100/72{,}000) \times 54{,}000 = \$112.5$ million, so the position collects a net \$12.5 million and profits if the prices converge to parity.
> > - At a −20% deviation, Royal Dutch is worth $0.8 \times 81 = \$64.8$ billion, and the long position $100 \times 64.8/72 = \$90$ million.
> > - The trade loses \$10 million with the Shell short unchanged. An arbitrageur who must meet margin calls can be forced to realize that loss, which is what happened to LTCM in 1998.

## Behavioral finance for insurers

An insurer is both an [[Institutional Investor|institutional investor]] and a buyer of its own forecasts. Overconfidence, herding into recently strong asset classes and anchoring on past returns can affect its investment strategy, which is one reason [[Asset-Liability Management|asset-liability management]] and an [[Investment Policy Statement|investment policy statement]] set limits in advance. The same biases can affect pricing and reserving judgments.

> [!trap] Calling the Royal Dutch/Shell trade riskless
> The trade is hedged against dividends but not against the gap widening. Nothing guarantees when the prices converge, so the trade can lose money first, and that risk is the limit to arbitrage the example shows.
