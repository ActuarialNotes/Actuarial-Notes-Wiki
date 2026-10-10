---
aliases:
  - Cross Greek
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:98ec09a2b6f86dfce3a50195e3c5183517f64dbac1d2afae4c1725d5968329a1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Option Greeks.md
---
The **option Greeks** are the partial derivatives of an option's or a portfolio's value $\Pi$ with respect to the quantities that drive it: delta ($\Delta$) and gamma ($\Gamma$) for the underlying price $S$, theta ($\Theta$) for time, vega ($\mathcal{V}$) for [[Volatility|volatility]] and rho ($\rho$) for the interest rate. **Cross Greeks** are the mixed second derivatives, such as the change in delta when volatility moves. A trader or an insurer [[Hedging|hedges]] by trading other instruments until the chosen Greeks of the whole book are zero.

> $$\Delta_c = e^{-qT}N(d_1)$$

> $$\Gamma = \frac{N'(d_1)\,e^{-qT}}{S_0\,\sigma\sqrt{T}}$$

> $$\mathcal{V} = S_0\sqrt{T}\,N'(d_1)\,e^{-qT}$$

> $$\begin{aligned} \Theta_c = {} & -\frac{S_0 N'(d_1)\,\sigma e^{-qT}}{2\sqrt{T}} \\ & + qS_0N(d_1)e^{-qT} - rKe^{-rT}N(d_2) \end{aligned}$$

> $$\rho_c = K\,T\,e^{-rT}N(d_2)$$

> $$\Theta + (r - q)\,S\,\Delta + \tfrac{1}{2}\sigma^2 S^2\,\Gamma = r\,\Pi$$

- **Symbols:** Following Hull chapter 19, $S_0$ is the asset price, $K$ the strike, $T$ the time to expiry, $r$ the risk-free rate, $q$ the dividend yield and $\sigma$ the volatility, with $d_1$ and $d_2$ as in the [[Black-Scholes Model|Black-Scholes model]] and $N'(x) = e^{-x^2/2}/\sqrt{2\pi}$ the standard [[Normal Distribution|normal]] density. Theta is per year and vega is per unit change in $\sigma$, so a 1% rise in volatility changes the value by $\mathcal{V}/100$.
- **Puts:** A European put has $\Delta_p = e^{-qT}\left[N(d_1) - 1\right]$ and $\rho_p = -KTe^{-rT}N(-d_2)$. Gamma and vega are the same for a call and a put with the same terms, because by [[Put-Call Parity|put-call parity]] the two differ only by a forward, which has no gamma or vega.
- **Signs and shapes:** A long option has positive gamma and vega, so it gains from large moves and from rising volatility. Theta is usually negative, and the option loses value as time passes with nothing else changing. Gamma and theta are largest for an at-the-money option close to expiry.
- **The theta-gamma relation:** Every derivative that satisfies the Black-Scholes equation satisfies the relation above. For a [[Delta Hedging|delta-hedged]] book, with $\Delta = 0$, it reads $\Theta + \tfrac{1}{2}\sigma^2S^2\Gamma = r\Pi$, so a book that is long gamma pays for it through negative theta.
- **Portfolio Greeks:** The Greek of a portfolio is the sum of the Greeks of its positions, weighted by quantity. The underlying asset has a delta of one and no gamma or vega, so it can fix delta but not gamma or vega. Making gamma and vega zero takes two traded options, and the asset is traded last to restore delta.
- **Taylor expansion:** Over a short time $\delta t$, the change in value is about $\Delta\,\delta S + \tfrac{1}{2}\Gamma\,\delta S^2 + \Theta\,\delta t + \mathcal{V}\,\delta\sigma + \rho\,\delta r$, plus cross terms such as $\frac{\partial^2 \Pi}{\partial S\,\partial\sigma}\,\delta S\,\delta\sigma$ and $\frac{\partial^2 \Pi}{\partial S\,\partial r}\,\delta S\,\delta r$. Hedging only the first-order Greeks leaves these terms open.
- **Cross Greeks:** Vanna, $\partial^2\Pi/\partial S\,\partial\sigma$, is the change in delta when volatility moves. Volga, $\partial^2\Pi/\partial\sigma^2$, is the change in vega when volatility moves. Cross-gamma between equity and rates, $\partial^2\Pi/\partial S\,\partial r$, is the change in delta when rates move.
- **Why variable annuity hedging tracks them:** A [[Guaranteed Minimum Maturity Benefit|GMMB]] or [[Guaranteed Minimum Withdrawal Benefit|GMWB]] is a long-dated put on the policyholder's fund, so its value depends on the equity level, interest rates and volatility together. When equities fall, the guarantee moves into the money, its sensitivity to rates grows, and volatility tends to rise at the same time. An insurer whose hedge matches delta, rho and vega separately still loses on these joint moves, as many did in 2008, so a hedging programme measures and limits its cross Greeks.

> [!example]- The Greeks of an At-the-Money Call {Example}
> A stock pays no dividends and trades at \$100. Find the delta, gamma, theta, vega and rho of a six-month European call with $K = 100$, $r = 5\%$ and $\sigma = 20\%$, and check the theta-gamma relation. The call is worth \$6.889.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > d_1 &= \frac{\ln(1) + (0.05 + 0.02)(0.5)}{0.20\sqrt{0.5}} \\
> > &= 0.2475 \\
> > d_2 &= 0.2475 - 0.1414 \\
> > &= 0.1061
> > \end{align*}
> > $$
> > So $N(d_1) = 0.5977$, $N(d_2) = 0.5422$ and $N'(d_1) = 0.3869$.
> > $$
> > \begin{align*}
> > \Delta &= 0.5977 \\
> > \Gamma &= \frac{0.3869}{100(0.20)(0.7071)} \\
> > &= 0.02736 \\
> > \mathcal{V} &= 100(0.7071)(0.3869) \\
> > &= 27.36 \\
> > \Theta &= -5.472 - 0.05(100)e^{-0.025}(0.5422) \\
> > &= -8.116 \\
> > \rho &= 100(0.5)e^{-0.025}(0.5422) \\
> > &= 26.44
> > \end{align*}
> > $$
> > The call loses about $8.116/365 = 0.022$ a day from time decay, and gains about \$0.27 for each 1% rise in volatility. The relation checks: $-8.116 + 0.05(100)(0.5977) + 0.5(0.04)(10{,}000)(0.02736) = 0.344$, which equals $r\Pi = 0.05(6.889)$. Its vanna, $-N'(d_1)\,d_2/\sigma = -0.205$, says that delta falls by about 0.002 when volatility rises one point.

> [!example]- Making a Short Call Position Gamma and Vega Neutral {Example}
> A dealer has written 1,000 of the six-month calls in the first example, so its position has $\Delta = -597.7$, $\Gamma = -27.4$ and $\mathcal{V} = -27{,}360$. It can trade a three-month at-the-money call with $\Delta = 0.5695$, $\Gamma = 0.0393$ and $\mathcal{V} = 19.64$, and a one-year at-the-money call with $\Delta = 0.6368$, $\Gamma = 0.0188$ and $\mathcal{V} = 37.52$. Find the positions $w_1$ and $w_2$ in the two options that make gamma and vega zero, and then the stock trade that makes delta zero.
>
> > [!answer]-
> > Gamma and vega must both be cancelled.
> > $$
> > \begin{align*}
> > 0.0393\,w_1 + 0.0188\,w_2 &= 27.4 \\
> > 19.64\,w_1 + 37.52\,w_2 &= 27{,}360
> > \end{align*}
> > $$
> > Solving the two equations gives $w_1 = 464.7$ and $w_2 = 485.9$, so the dealer buys about 465 three-month calls and 486 one-year calls. These add delta of its own.
> > $$
> > \begin{align*}
> > \Delta_{\text{new}} &= -597.7 + 464.7(0.5695) + 485.9(0.6368) \\
> > &= -23.6
> > \end{align*}
> > $$
> > The dealer buys 23.6 shares to make delta zero. Two options are needed because a single option fixes gamma and vega in a fixed ratio, $\mathcal{V}/\Gamma = S^2\sigma T$, which depends on its expiry. A short-dated option is rich in gamma and a long-dated one in vega, so one of each solves the system.

> [!tip]- How it appears on the exam
> - **INV-201 objective 3a:** Questions ask for the Greeks of a call, a put or a portfolio from the Black-Scholes formulas, or use given Greeks to estimate the change in value for a move in the price, time, volatility or rate with the Taylor expansion.
> - **Objective 3b:** Questions ask for the trades that make a book delta, gamma and vega neutral, as in the second example, and which risks a stated hedge leaves open.
> - **Objective 3g:** Written questions ask which risks of a variable annuity guarantee can be hedged and which only partly. Cross Greeks are part of the answer, alongside basis, policyholder behaviour and [[Credit Risk|counterparty risk]].
> - **Linked topics:** The theta-gamma relation reappears in the profit and loss of a delta-hedged option, where realized and [[Volatility|implied volatility]] differ.

> [!warning]- Exam traps
> - **Vega units:** Vega is per unit change in $\sigma$, so a move from 20% to 21% is $\delta\sigma = 0.01$. Multiplying vega by 1 instead of 0.01 makes the volatility effect a hundred times too big.
> - **Theta per day or per year:** The formula gives theta per year. Hull often quotes it per calendar day, dividing by 365, or per trading day, dividing by 252, so check which one a question uses before combining it with a time step.
> - **Fixing delta first:** Buying stock to fix delta and then adding options to fix gamma breaks the delta hedge again. Fix gamma and vega with the options first, then trade the stock.
> - **Short positions:** A written option has the negative of the bought option's Greeks. A short call has negative delta, gamma and vega but positive theta.
