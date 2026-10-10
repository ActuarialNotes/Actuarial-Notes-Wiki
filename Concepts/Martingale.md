---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ab39335c824c109183d45da9a2c8247e2a59f971b001d19a0e359b76f3618777
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Martingale.md
---

A **martingale** is a process $X_t$ whose best forecast of any future value, given everything known today, is today's value: a fair game with no drift. In derivative pricing, the central result is that the price of every traded asset, measured in units of a chosen [[Numeraire|numeraire]], is a martingale under the measure that goes with that numeraire. With the money-market account as numeraire, that measure is the [[Risk-Neutral Valuation|risk-neutral measure]] $\mathbb{Q}$, and pricing a derivative reduces to taking an [[Expected Value|expectation]].

> $$E\left[X_t \mid \mathcal{F}_s\right] = X_s, \quad s \le t$$

> $$dX_t = \sigma_t\,dW_t \;\Longrightarrow\; X_t \text{ is a martingale}$$

> $$\frac{f_t}{g_t} = E^{\mathbb{Q}_g}\!\left[\frac{f_T}{g_T}\,\Big|\,\mathcal{F}_t\right]$$

- **Definition:** $\mathcal{F}_s$ is the information available at time $s$ (the history of the process up to $s$). A martingale must also be adapted (its value is known at each time) and integrable ($E|X_t| < \infty$). The first block uses [[Conditional Probability|conditional]] expectation, and taking expectations of both sides gives $E[X_t] = X_0$, so a martingale's mean never changes.
- **Sub- and supermartingales:** If $E[X_t \mid \mathcal{F}_s] \ge X_s$, the process is a submartingale and drifts up on average. If $E[X_t \mid \mathcal{F}_s] \le X_s$, it is a supermartingale and drifts down. A stock with expected return $\alpha > r$, discounted at $r$, is a submartingale under the real-world measure $\mathbb{P}$.
- **Driftless Itō processes:** An [[Itō Calculus|Itō process]] is a martingale when its $dt$ term is zero (second block), provided $E\int_0^T \sigma_t^2\,dt < \infty$. To test a process, apply Itō's lemma and check whether the drift vanishes, as Hull does.
- **Equivalent martingale measure:** Hull's central result is the third block. For any traded security $f$ and any traded numeraire $g > 0$ there is a measure $\mathbb{Q}_g$ under which $f/g$ is a martingale. With $g_t = e^{rt}$ it says that $e^{-rt}f_t$ is a $\mathbb{Q}$-martingale, so $f_0 = e^{-rT}E^{\mathbb{Q}}[f_T]$.
- **Which prices are martingales:** Only the prices of traded, self-financing assets are martingales after normalization. A dividend-paying stock's price $S_t$ is not, but the value of a fund that reinvests the dividends, $S_te^{\delta t}$, is. An interest rate, a volatility or an index level is not a traded price, so it need not be a martingale under any pricing measure.
- **Why it matters:** A martingale price process rules out arbitrage, because no trading strategy can earn a positive expected gain in normalized units from a zero start. Conversely, the fundamental theorem of asset pricing says that no arbitrage implies such a measure exists. Changing the measure from $\mathbb{P}$ to $\mathbb{Q}$ is done with [[Girsanov's Theorem|Girsanov's theorem]].

> [!example]- Showing that W Squared Minus t Is a Martingale {Example}
> Let $W_t$ be a standard Brownian motion and $M_t = W_t^2 - t$. Show that $M_t$ is a martingale, first from the definition and then with Itō's lemma.
>
> > [!answer]-
> > For $s < t$, write $W_t = W_s + D$, where $D = W_t - W_s \sim N(0,\,t-s)$ is independent of $\mathcal{F}_s$. Then $E[D] = 0$ and $E[D^2] = t - s$.
> > $$
> > \begin{align*}
> > E\left[W_t^2 \mid \mathcal{F}_s\right] &= E\left[W_s^2 + 2W_sD + D^2 \mid \mathcal{F}_s\right] \\
> > &= W_s^2 + 2W_s(0) + (t - s) \\
> > E\left[M_t \mid \mathcal{F}_s\right] &= W_s^2 + (t - s) - t \\
> > &= W_s^2 - s \\
> > &= M_s
> > \end{align*}
> > $$
> > With Itō's lemma on $G = W^2 - t$, where $G_t = -1$, $G_x = 2W$ and $G_{xx} = 2$, the drift is $-1 + \tfrac12(2) = 0$, so $dM_t = 2W_t\,dW_t$ has no $dt$ term. $W_t^2$ alone is a submartingale, since its mean $t$ grows, and subtracting $t$ removes that drift exactly.

> [!example]- Is the Discounted Stock Price a Martingale Under P or Q? {Example}
> A non-dividend stock follows $dS_t = \alpha S_t\,dt + \sigma S_t\,dW^{\mathbb{P}}_t$ with $\alpha = 0.09$, $\sigma = 0.20$ and $S_0 = 100$, and the risk-free rate is $r = 0.04$. Find the dynamics of $Y_t = e^{-rt}S_t$, and say under which measure it is a martingale. Compute $E[Y_1]$ under each measure.
>
> > [!answer]-
> > By the product rule, $d\left(e^{-rt}S_t\right) = -re^{-rt}S_t\,dt + e^{-rt}\,dS_t$. Under $\mathbb{P}$ the drift does not vanish.
> > $$
> > \begin{align*}
> > dY_t &= (\alpha - r)\,Y_t\,dt + \sigma\,Y_t\,dW^{\mathbb{P}}_t \\
> > E^{\mathbb{P}}[Y_1] &= 100\,e^{(0.09 - 0.04)(1)} \\
> > &= 105.13
> > \end{align*}
> > $$
> > Under $\mathbb{P}$, $Y_t$ is a submartingale that grows at the risk premium of 5%. Under $\mathbb{Q}$ the stock drifts at $r$, so $dY_t = \sigma Y_t\,dW^{\mathbb{Q}}_t$ and $E^{\mathbb{Q}}[Y_1] = 100 = Y_0$. The discounted price is a martingale under $\mathbb{Q}$ only, which is why prices are expectations under $\mathbb{Q}$ and not under $\mathbb{P}$.

> [!example]- Testing Three Candidate Processes {Example}
> Which of $X_t = W_t^3$, $Y_t = W_t^3 - 3tW_t$ and $Z_t = \exp\left(\sigma W_t - \tfrac12\sigma^2 t\right)$ are martingales?
>
> > [!answer]-
> > Apply Itō's lemma to each and read off the drift.
> > $$
> > \begin{align*}
> > dX_t &= 3W_t\,dt + 3W_t^2\,dW_t \\
> > dY_t &= \left(-3W_t + 3W_t\right)dt + \left(3W_t^2 - 3t\right)dW_t \\
> > &= \left(3W_t^2 - 3t\right)dW_t \\
> > dZ_t &= \left(-\tfrac12\sigma^2 + \tfrac12\sigma^2\right)Z_t\,dt + \sigma Z_t\,dW_t \\
> > &= \sigma Z_t\,dW_t
> > \end{align*}
> > $$
> > $X_t$ has drift $3W_t$, so it is not a martingale, while $Y_t$ and $Z_t$ are driftless and are martingales. $Z_t$ is the exponential martingale that Girsanov's theorem uses as a change-of-measure density.

> [!tip]- How it appears on the exam
> - **INV-201:** The syllabus lists martingales among the stochastic calculus techniques for pricing derivatives, and its next objective asks candidates to apply the risk-neutral measure, the forward measure and normalization. The readings are Hull's chapter on martingales and measures and the Chin, Nel and Olafsson problems.
> - **Proof questions:** A question asks candidates to show that a given process, such as $W_t^2 - t$, $e^{\sigma W_t - \sigma^2t/2}$ or a discounted price, is or is not a martingale, by conditional expectation or by Itō's lemma.
> - **Choosing the measure:** Questions ask which normalized prices are martingales under which measure, such as a forward price under the forward measure, and then use that to price a derivative as an expectation.
> - **Written answers:** Candidates may need to explain why the real-world drift drops out of a price, or why a non-traded variable such as the short rate is not a martingale under $\mathbb{Q}$.

> [!warning]- Exam traps
> - **Constant mean is not enough:** $E[X_t] = X_0$ for all $t$ does not make $X_t$ a martingale. The definition conditions on $\mathcal{F}_s$, and $W_t^3$ has mean zero but is not a martingale.
> - **Forgetting the dividend:** For a stock with dividend yield $\delta$, $e^{-rt}S_t$ has $\mathbb{Q}$-drift $-\delta$. The martingale is $e^{-(r-\delta)t}S_t$, which is the reinvested fund value discounted at $r$.
> - **The wrong measure:** "The discounted price is a martingale" is true under $\mathbb{Q}$, not under $\mathbb{P}$. A question that gives $\alpha$ is often testing whether you discount the real-world expectation at $r$, which is wrong.
> - **Non-traded variables:** The short rate $r_t$ and the volatility $\sigma_t$ are not prices, so a mean-reverting short rate is not a contradiction. Only $f/g$ for a traded $f$ and numeraire $g$ must be a martingale.
