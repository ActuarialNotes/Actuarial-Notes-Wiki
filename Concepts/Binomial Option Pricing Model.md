---
aliases:
  - Binomial Option Pricing
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5a5e723984c1b311d7e67b403a8136319936eddd24d9f8f41c323efa0b357ffa
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Binomial Option Pricing Model.md
---
The **Binomial Option Pricing Model** values an option by assuming that, over each period of length $h$, the price of the underlying asset either rises by a factor $u$ or falls by a factor $d$. Over one period the option's two possible values can be reproduced by a [[Replicating Portfolio|replicating portfolio]] of $\Delta$ shares and $B$ in bonds, so the option must cost what that portfolio costs. Working backward through a tree of periods gives the price today, and the same price comes from discounting the expected payoff at the risk-free rate under the [[Risk-Neutral Valuation|risk-neutral]] probability $p^*$.

> $$\Delta = e^{-\delta h}\,\frac{C_u - C_d}{S(u - d)}$$

> $$B = e^{-rh}\,\frac{u\,C_d - d\,C_u}{u - d}$$

> $$C = \Delta S + B$$

> $$C = e^{-rh}\left[p^*C_u + (1 - p^*)\,C_d\right]$$

> $$p^* = \frac{e^{(r - \delta)h} - d}{u - d}$$

- **Symbols:** Following McDonald, $S$ is the asset price at the node, $C_u$ and $C_d$ are the option's values after an up and a down move, $r$ is the continuously compounded risk-free rate and $\delta$ is the dividend yield. FAM's objectives use a non-dividend-paying asset, so $\delta = 0$ and the factor $e^{-\delta h}$ drops out. The same formulas price a put or any other [[European Option|simple European-style derivative]], with $C$ replaced by that derivative's value.
- **No arbitrage:** The tree is free of arbitrage only if $d < e^{(r - \delta)h} < u$, which is the same as $0 < p^* < 1$. The real-world probability of an up move never enters the price, because the replicating portfolio matches the payoff in both states whatever their probabilities are.
- **Building the tree:** McDonald's forward tree sets $u = e^{(r - \delta)h + \sigma\sqrt{h}}$ and $d = e^{(r - \delta)h - \sigma\sqrt{h}}$ from the [[Volatility|volatility]] $\sigma$, which makes $p^* = 1/(1 + e^{\sigma\sqrt{h}})$. As the number of periods grows, the binomial price of a European option converges to the [[Black-Scholes Model|Black-Scholes]] price.
- **Several periods and American options:** A tree of $n$ periods is valued one node at a time with the one-period formula, starting from the payoffs at expiry. A European option depends only on the terminal payoffs, so its price is also the discounted risk-neutral expectation over the terminal nodes. An American option is worth the larger of its exercise value and its continuation value at every node, so early exercise has to be checked node by node.

> [!example]- One-Period Call by Replication {Example}
> A non-dividend-paying stock is priced at $80$. In one year it will be worth $80u = 100$ or $80d = 68$, with $u = 1.25$ and $d = 0.85$, and $r = 0.04$. Find the replicating portfolio and the price of a 1-year European call with strike $85$, and check the price with the risk-neutral probability.
>
> > [!answer]-
> > The call pays $C_u = 15$ after an up move and $C_d = 0$ after a down move.
> > $$
> > \begin{align*}
> > \Delta &= \frac{15 - 0}{80(1.25 - 0.85)} \\
> > &= 0.46875 \\
> > B &= e^{-0.04}\,\frac{1.25(0) - 0.85(15)}{0.40} \\
> > &= 0.960789(-31.875) \\
> > &= -30.6252 \\
> > C &= 0.46875(80) - 30.6252 \\
> > &= 6.8748
> > \end{align*}
> > $$
> > The call is replicated by buying $0.46875$ shares and borrowing $30.6252$. As a check, $p^* = (e^{0.04} - 0.85)/0.40 = 0.477027$, and $e^{-0.04}(0.477027)(15) = 6.8748$, the same price.

> [!example]- Two-Period European and American Puts {Example}
> A non-dividend-paying stock is priced at $100$, with $\sigma = 0.25$ and $r = 0.05$. Using a two-period forward tree with $h = 0.5$, price a 1-year put with strike $100$ (a) as a European option and (b) as an American option.
>
> > [!answer]-
> > The tree factors are $u = e^{0.025 + 0.176777} = 1.223575$ and $d = e^{0.025 - 0.176777} = 0.859180$.
> > $$
> > \begin{align*}
> > p^* &= \frac{e^{0.025} - 0.859180}{1.223575 - 0.859180} \\
> > &= \frac{0.166135}{0.364395} \\
> > &= 0.455921
> > \end{align*}
> > $$
> > The stock ends at $149.71$, $105.13$ or $73.82$, so the put pays $0$, $0$ or $26.180952$. After an up move both outcomes pay nothing, so $P_u = 0$.
> >
> > **(a)** Discounting by $e^{-0.025} = 0.975310$ at each step:
> > $$
> > \begin{align*}
> > P_d &= 0.975310(0.544079)(26.180952) \\
> > &= 13.8928 \\
> > P_0 &= 0.975310(0.544079)(13.8928) \\
> > &= 7.37
> > \end{align*}
> > $$
> > **(b)** At the down node the stock is $85.92$, and exercising pays $100 - 85.9180 = 14.0820$. That is more than the continuation value of $13.8928$, so the American put is exercised there.
> > $$
> > \begin{align*}
> > P_0 &= 0.975310(0.544079)(14.0820) \\
> > &= 7.47
> > \end{align*}
> > $$
> > The right to exercise early adds $0.10$. Exercising at the down node collects the strike half a year sooner, and the interest on it is worth more than the put's remaining time value.

> [!tip]- How it appears on the exam
> - **FAM** asks candidates to "apply the binomial option pricing model to calculate the price of a simple European-style derivative on a single non-dividend paying asset". The question gives a one- or two-period tree, either as $u$ and $d$ or as $\sigma$ for a forward tree, and asks for the price of a call, a put or another payoff at expiry.
> - **Replication:** The same tree supports questions on the replicating portfolio, such as the shares $\Delta$ and the bond amount $B$ at a node, or whether a quoted price allows arbitrage.
> - **American options:** The FAM objective names European-style derivatives, but the American version on the same tree is the natural contrast. It needs the early-exercise check at each interior node, as in part (b) of the second example.

> [!warning]- Exam traps
> - **Dividend yield:** With a dividend yield, $p^*$ uses $e^{(r - \delta)h}$ and $\Delta$ carries the factor $e^{-\delta h}$. Leaving them out overstates $p^*$ and overprices calls.
> - **Discounting each step:** Each step discounts by $e^{-rh}$, so a two-step tree discounts the terminal payoffs by $e^{-2rh} = e^{-rT}$ in total. Discounting by $e^{-rT}$ at every node discounts twice.
> - **Signs of $\Delta$ and $B$:** A call is replicated by buying shares and borrowing ($\Delta > 0$, $B < 0$), and a put by shorting shares and lending ($\Delta < 0$, $B > 0$). A negative option price, or a put replicated by buying shares, signals a sign slip.
> - **Early exercise at the right nodes:** The exercise value at a node uses that node's stock price. Checking only at the start or only at expiry misses the nodes where an American put is exercised.
> - **Real-world probabilities:** If a question gives the stock's expected return, it is a distractor for the price. Discounting a real-world expected payoff at $r$ gives a price that can be arbitraged.
