---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a0dae16803b85e7b9191e2794adf00a8fbe251b7b4174688ebd8038fe73da40f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Stochastic Differential Equation.md
---

A **stochastic differential equation** (SDE) specifies a process $X_t$ by its instantaneous drift $\mu$ and diffusion (volatility) $\sigma$ in terms of a Brownian motion $W_t$. It is shorthand for an integral equation whose last term is an [[Itō Calculus|Itō integral]], and its solution is a whole distribution of paths. SDEs are how [[Stochastic Processes|stochastic models]] of stock prices, short rates and volatilities are written, simulated and used for [[Risk-Neutral Valuation|derivative pricing]].

> $$dX_t = \mu(X_t,t)\,dt + \sigma(X_t,t)\,dW_t$$

> $$X_t = X_0 + \int_0^t \mu(X_s,s)\,ds + \int_0^t \sigma(X_s,s)\,dW_s$$

> $$S_T = S_0\exp\!\left[\left(\mu - \tfrac12\sigma^2\right)T + \sigma W_T\right]$$

> $$r_T = b + (r_0 - b)e^{-aT} + \sigma\int_0^T e^{-a(T-s)}\,dW_s$$

> $$E[r_T] = b + (r_0 - b)e^{-aT}$$

> $$\operatorname{Var}^{\text{Vas}}(r_T) = \frac{\sigma^2}{2a}\left(1 - e^{-2aT}\right)$$

> $$\begin{aligned} \operatorname{Var}^{\text{CIR}}(r_T) = {} & \frac{r_0\sigma^2}{a}\left(e^{-aT} - e^{-2aT}\right) \\ & + \frac{b\sigma^2}{2a}\left(1 - e^{-aT}\right)^2 \end{aligned}$$

- **Symbols:** $W_t$ is a standard Brownian motion, $\mu$ is the drift (expected change per unit time) and $\sigma$ is the diffusion coefficient. A solution is a process adapted to the history of $W$ that satisfies the integral equation. Coefficients that are Lipschitz in $x$ and grow at most linearly guarantee a unique solution.
- **Geometric Brownian motion (GBM):** The SDE $dS_t = \mu S_t\,dt + \sigma S_t\,dW_t$ has proportional drift and volatility. Itō's lemma on $\ln S$ solves it in closed form (third block), so $S_T$ is [[Lognormal Distribution|lognormal]] with $E[S_T] = S_0e^{\mu T}$ and $\operatorname{Var}(S_T) = S_0^2e^{2\mu T}\left(e^{\sigma^2T} - 1\right)$. It is the stock model of the [[Black-Scholes Model|Black-Scholes-Merton]] framework.
- **Vasicek (Ornstein-Uhlenbeck):** Hull's chapter on equilibrium short-rate models writes it $dr_t = a(b - r_t)\,dt + \sigma\,dW_t$, where $b$ is the long-run level and $a$ is the speed of mean reversion. Multiplying by the integrating factor $e^{at}$ and integrating solves it (fourth block), so $r_T$ is normal with the mean and variance in the fifth and sixth blocks. Because $r_T$ is normal, it can go negative.
- **Cox-Ingersoll-Ross (CIR):** The model $dr_t = a(b - r_t)\,dt + \sigma\sqrt{r_t}\,dW_t$ has the same drift as Vasicek, so $r_T$ has the same mean. The volatility shrinks as the rate falls, so the rate stays non-negative, and it stays strictly positive when $2ab \ge \sigma^2$. Its distribution is a scaled non-central chi-square rather than a normal, and its variance (last block) depends on $r_0$ and $b$.
- **Measure:** The same SDE can be written under the real-world measure $\mathbb{P}$ or the risk-neutral measure $\mathbb{Q}$. [[Girsanov's Theorem|Girsanov's theorem]] changes the drift by the market price of risk and leaves $\sigma$ alone, so a stock's drift $\mu$ becomes $r$ under $\mathbb{Q}$.
- **When there is no closed form:** Most SDEs, such as those for [[Stochastic Volatility|stochastic volatility]] or for a short rate with a level-dependent volatility, cannot be solved explicitly. They are simulated on a time grid with the [[Euler-Maruyama Discretization|Euler-Maruyama scheme]], $X_{t+h} \approx X_t + \mu h + \sigma\sqrt{h}\,Z$, or from an exact transition density where one is known.

> [!example]- Solving the GBM Equation for a Fund Value {Example}
> The equity fund behind a variable annuity follows $dS_t = 0.10\,S_t\,dt + 0.30\,S_t\,dW_t$ with $S_0 = 50$. Solve the SDE and give the mean, standard deviation and median of $S_1$.
>
> > [!answer]-
> > Itō's lemma on $\ln S$ gives $d\ln S_t = \left(0.10 - \tfrac12(0.09)\right)dt + 0.30\,dW_t = 0.055\,dt + 0.30\,dW_t$. Integrating from 0 to $t$ and exponentiating solves the SDE.
> > $$
> > \begin{align*}
> > S_t &= 50\exp\!\left(0.055\,t + 0.30\,W_t\right) \\
> > E[S_1] &= 50\,e^{0.10} \\
> > &= 55.26 \\
> > \operatorname{Var}(S_1) &= 50^2 e^{0.20}\left(e^{0.09} - 1\right) \\
> > &= 287.56 \\
> > \text{median}(S_1) &= 50\,e^{0.055} \\
> > &= 52.83
> > \end{align*}
> > $$
> > The standard deviation is $\sqrt{287.56} = 16.96$. The median is below the mean because the lognormal distribution is skewed to the right, which matters for a guarantee such as a [[Guaranteed Minimum Maturity Benefit|GMMB]] that pays in the lower tail.

> [!example]- Solving the Vasicek Equation and Finding the Expected Short Rate {Example}
> The short rate follows the Vasicek model $dr_t = 0.2(0.05 - r_t)\,dt + 0.01\,dW_t$ with $r_0 = 0.03$. Solve the SDE, then find $E[r_5]$, the standard deviation of $r_5$ and the probability that $r_5 < 0$.
>
> > [!answer]-
> > Apply the product rule to $e^{at}r_t$ with $a = 0.2$. The $r_t$ terms cancel, leaving $d\left(e^{at}r_t\right) = ab\,e^{at}\,dt + \sigma e^{at}\,dW_t$. Integrating from 0 to $T$ and dividing by $e^{aT}$ gives the fourth block above, whose stochastic integral has mean zero and, by the Itō isometry, variance $\sigma^2\int_0^T e^{-2a(T-s)}\,ds$.
> > $$
> > \begin{align*}
> > E[r_5] &= 0.05 + (0.03 - 0.05)e^{-1} \\
> > &= 0.05 - 0.02(0.367879) \\
> > &= 0.042642 \\
> > \operatorname{Var}(r_5) &= \frac{0.01^2}{0.4}\left(1 - e^{-2}\right) \\
> > &= 0.000216166 \\
> > \Pr(r_5 < 0) &= N\!\left(\frac{-0.042642}{0.014703}\right) \\
> > &= N(-2.900) \\
> > &= 0.0019
> > \end{align*}
> > $$
> > The expected rate has closed about 63% of the gap to $b = 5\%$, since $1 - e^{-1} = 0.632$, and the standard deviation is $0.0147$. A CIR model with the same drift and $\sigma = 0.05$ has the same mean and a variance of $0.000212$, almost the same, but under CIR the probability of a negative rate is exactly zero.

> [!tip]- How it appears on the exam
> - **INV-201:** The syllabus names stochastic differential equations first in its list of stochastic calculus techniques for pricing derivatives, with Hull's chapters on Itō's lemma, martingales and measures, and the equilibrium short-rate models (Vasicek and CIR) as readings.
> - **Solving questions:** A question gives a GBM or an Ornstein-Uhlenbeck SDE and asks for the explicit solution, or for $E[X_T]$, $\operatorname{Var}(X_T)$ or a probability. The work is Itō's lemma, an integrating factor and the Itō isometry.
> - **Interpretation questions:** A question may ask what each parameter means, such as the speed of mean reversion or the long-run level. It may also ask for the long-run distribution (as $T \to \infty$, Vasicek tends to $N\left(b, \sigma^2/2a\right)$) or why Vasicek allows negative rates and CIR does not.
> - **Simulation and calibration:** SDEs feed the later objectives on discretization (one Euler-Maruyama step) and on calibrating a short-rate model to a yield curve.

> [!warning]- Exam traps
> - **GBM's median drift:** In $S_T = S_0\exp\left[\left(\mu - \tfrac12\sigma^2\right)T + \sigma W_T\right]$, using $\mu$ alone in the exponent gives the mean of $\ln S_T$ wrong. The mean of $S_T$ is still $S_0e^{\mu T}$, so do not subtract the $\tfrac12\sigma^2$ twice.
> - **Vasicek's variance factor:** The variance is $\frac{\sigma^2}{2a}\left(1 - e^{-2aT}\right)$, with $2a$ in both places. Writing $e^{-aT}$ inside the bracket, or $\sigma^2 T$ as for a Brownian motion, overstates the spread of a mean-reverting rate.
> - **Hull's $a$ and $b$:** In $a(b - r)$, $b$ is the level and $a$ is the speed. Some texts write $(\theta - ar)$ or $\kappa(\theta - r)$, so the long-run level is $\theta/a$ in the first form, not $\theta$.
> - **CIR's variance is not Vasicek's:** The CIR variance depends on $r_0$ and $b$ because the volatility is $\sigma\sqrt r$. Reusing the Vasicek formula with the CIR $\sigma$ of the example gives $0.0054$, about 25 times too large, because the CIR $\sigma$ multiplies $\sqrt{r}$, which is only about $0.2$.
