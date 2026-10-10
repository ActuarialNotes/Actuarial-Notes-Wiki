---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2eb98e379cda072abb1e0a8b9041d2f6e59ef0e0d3025a8d71bbbad81833c7e3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Behavioral Finance.md
---

**Behavioral Finance** is the study of financial markets with models in which some investors are not fully rational, either because of their preferences or because of mistaken beliefs. In Ritter's (2003) account it rests on two building blocks: cognitive psychology, which describes the systematic errors people make in how they think, and the limits to arbitrage, which explain when rational traders cannot correct the mispricing those errors cause.

> $$\frac{V_{\text{RD}}}{V_{\text{Shell}}} = \frac{60}{40} = 1.5$$

> $$d = \frac{V_{\text{RD}}}{1.5\,V_{\text{Shell}}} - 1$$

> $$v(x) = \begin{cases} x^{\alpha} & x \ge 0 \\ -\kappa\,(-x)^{\beta} & x < 0 \end{cases}$$

- **Symbols:** $V_{\text{RD}}$ and $V_{\text{Shell}}$ are the market values of Royal Dutch and Shell, which since 1907 shared the group's cash flows 60 to 40, so efficient prices would keep their ratio at 1.5. $d$ is the deviation from that parity. In the prospect theory value function, $x$ is a gain or loss from a reference point such as the purchase price, $\alpha, \beta < 1$ make the curve concave for gains and convex for losses, and $\kappa > 1$ is loss aversion.
- **Against the efficient markets hypothesis:** The hypothesis does not assume every investor is rational, but it does assume that competition among investors makes prices unbiased forecasts of value. Behavioral finance holds that in some circumstances markets are informationally inefficient. Not every mispricing comes from psychology, though: Ritter notes that when Yahoo was added to the S&P 500 in 1999, forced buying by index funds drove its price up by more than 50% in a week.
- **Heuristics:** Rules of thumb make decisions easier but bias them when circumstances change. Many savers split money by the $1/N$ rule, so the share in equities depends on how many of the offered funds hold stocks.
- **Overconfidence:** People overrate their abilities. This shows up as too little diversification, as in investing heavily in one's employer or local companies, and as excessive trading, which Barber and Odean found lowered returns, more so for men than for women.
- **Mental accounting and framing:** People separate decisions that should be combined, such as keeping separate budgets for food at home and dining out. Framing means the presentation changes the choice, as with an early-bird discount that is accepted where an equal peak surcharge would not be.
- **Representativeness and conservatism:** Representativeness puts too much weight on recent experience, so a long run of high equity returns comes to look normal. Conservatism is the opposite: people are slow to notice change and anchor on how things have been. Underreaction can come first and overreaction later.
- **Disposition effect:** Investors are reluctant to realize paper losses and quick to realize paper gains. Ritter's example is a stock bought at \$30 that falls to \$22 and recovers to \$28, which most holders will not sell until it is above \$30.
- **Limits to arbitrage:** Misvaluations that recur are traded away, so markets are efficient for them, at least relatively. Long-term, nonrepeating misvaluations persist, because arbitrage takes capital and time, short sales can be constrained, and an arbitrageur forced to close at the worst moment, as [[Hedge Fund|hedge funds]] such as LTCM were in 1998, adds to the mispricing. Ritter's examples of large misvaluations include the 1980s Japanese bubble, the 1987 crash and the 1999 to 2000 technology bubble.
- **For insurers:** An insurer is both an [[Institutional Investor|institutional investor]] and a buyer of its own forecasts. Overconfidence, herding into recently strong asset classes and anchoring on past returns can affect its investment strategy, which is one reason [[Asset-Liability Management|asset-liability management]] and an [[Investment Policy Statement|investment policy statement]] set limits in advance. The same [[Cognitive Bias|biases]] can affect pricing and reserving judgments.

> [!example]- The Royal Dutch/Shell Trade {Example}
> Royal Dutch has a market value of \$72 billion and Shell of \$54 billion. Find the deviation from parity, set up a trade that hedges the dividend streams, and find its profit or loss if Shell's value is unchanged and Royal Dutch falls until its deviation is -20%.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > d &= \frac{72}{1.5 \times 54} - 1 \\
> > &= \frac{72}{81} - 1 \\
> > &= -11.1\%
> > \end{align*}
> > $$
> > Royal Dutch is cheap relative to Shell. Buying \$100 million of Royal Dutch buys a share $a = 100/72{,}000$ of its dividends. Hedging them takes a short position in $1.5a$ of Shell, so that the 60% and 40% dividend shares cancel.
> > $$
> > \begin{align*}
> > \text{Short Shell} &= 1.5 \times \frac{100}{72{,}000} \times 54{,}000 \\
> > &= 112.5 \\
> > \text{Net cash} &= 112.5 - 100 \\
> > &= 12.5
> > \end{align*}
> > $$
> > The position collects \$12.5 million and its dividends net to zero, so it profits if the prices converge to parity. If Royal Dutch instead falls to $0.8 \times 81 = 64.8$ billion, the long position is worth $100 \times 64.8/72 = 90$, a \$10 million loss with the Shell short unchanged. Nothing guarantees when the gap closes, so an arbitrageur who must meet margin calls can be forced to realize that loss, which is what happened to LTCM in 1998.

> [!example]- Prospect Theory and the Disposition Effect {Example}
> An investor's reference point is the \$30 purchase price, with $\alpha = \beta = 0.88$ and $\kappa = 2.25$. At \$28, the investor can sell, or hold a stock that will be worth \$30 or \$26 with equal probability. At \$34, after a rise, the choice is to sell or hold a stock that will be worth \$36 or \$32 with equal probability. Compare the values.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > v(\text{sell at } 28) &= -2.25(2)^{0.88} \\
> > &= -4.14 \\
> > v(\text{hold}) &= 0.5(0) + 0.5\left(-2.25(4)^{0.88}\right) \\
> > &= -3.81 \\
> > v(\text{sell at } 34) &= 4^{0.88} \\
> > &= 3.39 \\
> > v(\text{hold}) &= 0.5(6)^{0.88} + 0.5(2)^{0.88} \\
> > &= 3.34
> > \end{align*}
> > $$
> > Below the purchase price the investor holds, because the value function is convex for losses and a gamble that might break even beats a sure loss. Above it the investor sells, because the function is concave for gains and a sure gain beats an equally likely spread. In both cases the expected price is the same as the price today, so the decisions come from preferences, not information, which is the disposition effect.

> [!tip]- How it appears on the exam
> - **GI-201 (objective 4a):** Candidates demonstrate knowledge of behavioral finance from Ritter (2003), sections 1 to 3. Expect to define the two building blocks, describe each cognitive bias with an example, and explain why arbitrage may fail to correct a mispricing.
> - **Applied questions:** A short scenario describes an investor's or a manager's behaviour, and the question asks which bias it shows, or why a mispricing such as the Royal Dutch/Shell gap can persist.
> - **Linked objectives:** The same topic covers asset-liability management and underwriting profit models, so answers may ask how biases affect an insurer's investment decisions.

> [!warning]- Exam traps
> - **Efficient markets misstated:** The efficient markets hypothesis does not assume every investor is rational. It assumes markets are rational, and behavioral finance disputes that only in some circumstances.
> - **Representativeness versus conservatism:** Overweighting recent experience is representativeness, and being slow to react to change is conservatism. They point in opposite directions, and Ritter notes that choosing the bias after the fact to explain any pattern is a criticism of the field.
> - **Arbitrage is not riskless here:** The Royal Dutch/Shell trade is hedged against dividends but not against the gap widening. Calling it riskless misses the limits to arbitrage that are the point of the example.
> - **Disposition effect direction:** Investors sell winners too early and hold losers too long, not the reverse. Ritter adds that they act as if trying to maximize their taxes, since realizing losses would lower them.
