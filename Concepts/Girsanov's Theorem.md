---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d530158552854e2ec8bb6a619c52e90e15c692a5bd6cf5eaf9153b84470d08c3
  sources: []
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Girsanov's Theorem.md"
---

**Girsanov's theorem** says that reweighting the probabilities of Brownian paths by a positive density turns a Brownian motion under one measure into a Brownian motion with a shifted drift under another, while leaving the volatility unchanged. In pricing it is the step from the real-world measure $\mathbb{P}$, where a stock earns $\alpha$, to the [[Risk-Neutral Valuation|risk-neutral measure]] $\mathbb{Q}$, where it earns $r$. The size of the shift is the **market price of risk** $\lambda$.

> $$\frac{d\mathbb{Q}}{d\mathbb{P}}\bigg|_{\mathcal{F}_T} = Z_T = \exp\!\left(-\int_0^T \lambda_s\,dW^{\mathbb{P}}_s - \tfrac12\int_0^T \lambda_s^2\,ds\right)$$

> $$W^{\mathbb{Q}}_t = W^{\mathbb{P}}_t + \int_0^t \lambda_s\,ds$$

> $$\lambda = \frac{\alpha - r}{\sigma}$$

> $$dS_t = rS_t\,dt + \sigma S_t\,dW^{\mathbb{Q}}_t$$

- **Symbols:** $Z_T$ is the Radon-Nikodym derivative (density) of $\mathbb{Q}$ with respect to $\mathbb{P}$, so $E^{\mathbb{Q}}[X] = E^{\mathbb{P}}[Z_TX]$ for any payoff $X$ known at $T$. The process $\lambda_t$ must be adapted and satisfy a condition such as Novikov's, $E^{\mathbb{P}}\left[e^{\frac12\int_0^T\lambda^2\,ds}\right] < \infty$, which makes $Z_t$ a [[Martingale|martingale]] with $E^{\mathbb{P}}[Z_T] = 1$.
- **The theorem:** Under $\mathbb{Q}$, the process $W^{\mathbb{Q}}_t$ in the second block is a standard Brownian motion. Substituting $dW^{\mathbb{P}} = dW^{\mathbb{Q}} - \lambda\,dt$ into any [[Stochastic Differential Equation|SDE]] lowers its drift by $\lambda\sigma$ and leaves its $\sigma$ untouched.
- **Market price of risk:** For a stock with $dS = \alpha S\,dt + \sigma S\,dW^{\mathbb{P}}$, choosing $\lambda = (\alpha - r)/\sigma$ gives the fourth block. $\lambda$ is the excess return earned per unit of volatility, and in a one-factor model every traded asset driven by the same $W$ must share the same $\lambda$, or there would be an arbitrage. Hull writes the expected return of any such security as $\mu = r + \lambda\sigma$.
- **Equivalent measures:** $\mathbb{P}$ and $\mathbb{Q}$ agree on which events are impossible. They disagree only on how likely the possible ones are, which is why a hedge that works almost surely under $\mathbb{P}$ also works under $\mathbb{Q}$, and why volatility, which can be read off a single path, cannot change.
- **Real-world and risk-neutral generators:** An [[Economic Scenario Generator|economic scenario generator]] can be run under $\mathbb{P}$ for capital and risk projections or under $\mathbb{Q}$ for market-consistent valuation. Girsanov's theorem is the link between the two: the same model with the same volatilities, with drifts that differ by the market price of risk. The SOA's 2022 paper on the connection between real-world and risk-neutral generators builds on that link.
- **Other measures:** The same theorem moves between the measures that go with other [[Numeraire|numeraires]], such as the $T$-forward measure. There the drift shift is set by the volatility of the numeraire rather than by $\lambda$.

> [!example]- Pricing a Digital Payout Under P and Under Q {Example}
> A structured product pays \$1,000 in one year if a non-dividend index, now at 100, ends above 110. Under $\mathbb{P}$ the index follows GBM with $\alpha = 0.10$ and $\sigma = 0.20$, and $r = 0.03$. Find $\lambda$, the price using $\mathbb{Q}$, and the same price as a $\mathbb{P}$-expectation weighted by $Z_1$. Compare with the wrong price, which discounts the $\mathbb{P}$-probability at $r$.
>
> > [!answer]-
> > The market price of risk is $\lambda = (0.10 - 0.03)/0.20 = 0.35$. Under $\mathbb{Q}$ the drift is $r$, so the probability of paying is $N(d_2)$.
> > $$
> > \begin{align*}
> > d_2 &= \frac{\ln(100/110) + (0.03 - 0.02)(1)}{0.20} \\
> > &= -0.42655 \\
> > V_0 &= 1{,}000\,e^{-0.03}N(-0.42655) \\
> > &= 1{,}000(0.970446)(0.334853) \\
> > &= 324.96
> > \end{align*}
> > $$
> > Under $\mathbb{P}$, the index ends above 110 when $W^{\mathbb{P}}_1 > w^* = \left[\ln 1.1 - (0.10 - 0.02)\right]/0.20 = 0.07655$. Weighting by $Z_1 = e^{-0.35W_1 - 0.06125}$ moves the normal density by $\lambda$.
> > $$
> > \begin{align*}
> > E^{\mathbb{P}}\!\left[Z_1\,\mathbf{1}_{\{W_1 > w^*\}}\right] &= \Pr\!\left(N(0,1) > w^* + \lambda\right) \\
> > &= 1 - N(0.07655 + 0.35) \\
> > &= N(-0.42655) \\
> > &= 0.334853
> > \end{align*}
> > $$
> > The weighted $\mathbb{P}$-expectation gives the same \$324.96. The real-world probability of paying is $N(-0.07655) = 0.46949$, and discounting that at $r$ gives \$455.61, which overprices the note by about \$131. The difference is the reward for bearing index risk, and it is not part of the price.

> [!example]- The Density in a One-Period Tree {Example}
> A stock at 100 moves to 120 or 90 in one year. Its real-world up probability is $p = 0.68390$ (an expected return of 10%), and the risk-neutral one is $p^* = 0.50424$ ($r = 5\%$, as in the binomial model). Find the Radon-Nikodym density $Z$ in each state and check that $E^{\mathbb{P}}[Z] = 1$.
>
> > [!answer]-
> > In a discrete model, the density is the ratio of the two probabilities, state by state.
> > $$
> > \begin{align*}
> > Z_u &= \frac{p^*}{p} = \frac{0.50424}{0.68390} \\
> > &= 0.7373 \\
> > Z_d &= \frac{1 - p^*}{1 - p} = \frac{0.49576}{0.31610} \\
> > &= 1.5684 \\
> > E^{\mathbb{P}}[Z] &= 0.68390(0.7373) + 0.31610(1.5684) \\
> > &= 1.0000
> > \end{align*}
> > $$
> > $\mathbb{Q}$ puts less weight than $\mathbb{P}$ on the good state and more on the bad state. That tilt toward bad outcomes is what lowers the expected return from 10% to 5%, and it is the discrete form of $Z_T$ in the first block.

> [!tip]- How it appears on the exam
> - **INV-201:** The syllabus names Girsanov's theorem in its stochastic calculus objective, and the next objective asks candidates to apply the risk-neutral measure, the forward measure and the market price of risk. Readings include Hull's chapter on martingales and measures and the SOA paper on real-world and risk-neutral generators.
> - **Changing measure:** A question gives real-world dynamics and asks for the risk-neutral ones, such as a stock, a short-rate model or two correlated assets. Candidates must state $\lambda$, rewrite $dW^{\mathbb{P}}$, and note that the volatility does not change.
> - **Pricing:** A question asks for the price of a digital or a forward-start payoff under $\mathbb{Q}$, sometimes with the real-world probability of the same event alongside to test which one prices.
> - **Written answers:** Candidates may be asked why a real-world generator cannot be used directly for valuation, or how the market price of risk links the two.

> [!warning]- Exam traps
> - **Changing the volatility:** Girsanov shifts drift only. An answer that moves $\sigma$ along with $\alpha$, or that rescales the Brownian motion, has misapplied the theorem.
> - **The sign of the shift:** With $W^{\mathbb{Q}} = W^{\mathbb{P}} + \lambda t$, the density has $-\lambda W^{\mathbb{P}}$ in the exponent. Getting the sign wrong turns the drift into $\alpha + \lambda\sigma$ rather than $r$.
> - **Using $\mathbb{P}$-probabilities with $r$:** Discounting a real-world expectation at the risk-free rate overprices a claim that pays in good states. In the digital example it gives \$455.61 rather than \$324.96.
> - **Forgetting the dividend:** For a stock with dividend yield $\delta$, the $\mathbb{Q}$-drift of the price is $r - \delta$, and $\lambda = (\alpha - r)/\sigma$ when $\alpha$ is the total expected return, including dividends.
