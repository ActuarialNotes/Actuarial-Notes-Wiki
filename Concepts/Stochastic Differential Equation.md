---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2a33a85aef8dc8eb24befa16cc23e83f7e84935422c9faab32a177126c65558f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Stochastic Differential Equation.md
---
A **Stochastic Differential Equation** (SDE) specifies a process $X_t$ by its instantaneous drift $\mu$ and diffusion (volatility) $\sigma$ in terms of a Brownian motion $W_t$. SDEs are how [[Stochastic Processes|stochastic models]] of stock prices, short rates and volatilities are written, simulated and used for [[Risk-Neutral Valuation|derivative pricing]]. The general SDE is

> $$dX_t = \mu(X_t,t)\,dt + \sigma(X_t,t)\,dW_t$$

- $W_t$ is a standard Brownian motion.
- $\mu(X_t,t)$ is the drift, the expected change per unit time.
- $\sigma(X_t,t)$ is the diffusion coefficient.

It is shorthand for an integral equation whose last term is an [[Itō Calculus|Itō integral]], which is

> $$X_t = X_0 + \int_0^t \mu(X_s,s)\,ds + \int_0^t \sigma(X_s,s)\,dW_s$$

A solution is a process adapted to the history of $W$ that satisfies the integral equation, and it is a whole distribution of paths. Coefficients that are Lipschitz in $x$ and grow at most linearly guarantee a unique solution.

## Geometric Brownian motion

Geometric Brownian motion (GBM) has proportional drift and volatility. It is the stock model of the [[Black-Scholes Model|Black-Scholes-Merton]] framework, and its SDE is

> $$dS_t = \mu S_t\,dt + \sigma S_t\,dW_t$$

Itō's lemma on $\ln S$ solves it in closed form, and the solution is

> $$S_T = S_0\exp\!\left[\left(\mu - \tfrac12\sigma^2\right)T + \sigma W_T\right]$$

So $S_T$ is [[Lognormal Distribution|lognormal]] with $E[S_T] = S_0e^{\mu T}$ and $\operatorname{Var}(S_T) = S_0^2e^{2\mu T}\left(e^{\sigma^2T} - 1\right)$.

> [!example]- A fund follows $dS_t = 0.10\,S_t\,dt + 0.30\,S_t\,dW_t$ with $S_0 = 50$. What are the mean, standard deviation and median of $S_1$? {Example}
> - Itō's lemma on $\ln S$ gives $d\ln S_t = \left(0.10 - \tfrac12(0.09)\right)dt + 0.30\,dW_t = 0.055\,dt + 0.30\,dW_t$.
> - Integrating and exponentiating solves the SDE, $S_t = 50\exp\left(0.055\,t + 0.30\,W_t\right)$.
> - The mean is $E[S_1] = 50\,e^{0.10} = 55.26$.
> - The variance is $50^2 e^{0.20}\left(e^{0.09} - 1\right) = 287.56$, so the standard deviation is $16.96$.
> - The median is $50\,e^{0.055} = 52.83$, below the mean because the lognormal distribution is skewed to the right. That matters for a guarantee such as a [[Guaranteed Minimum Maturity Benefit|GMMB]], which pays in the lower tail.

## Vasicek model

The Vasicek (Ornstein-Uhlenbeck) model of the short rate $r_t$, in the form of Hull's chapter on equilibrium short-rate models, is

> $$dr_t = a(b - r_t)\,dt + \sigma\,dW_t$$

- $b$ is the long-run level.
- $a$ is the speed of mean reversion.

The drift pulls the rate toward $b$, faster the further away it is. Some texts write the drift as $(\theta - ar)$ or $\kappa(\theta - r)$. In the first form the long-run level is $\theta/a$, not $\theta$.

Multiplying by the integrating factor $e^{at}$ and integrating solves it. The solution is

> $$r_T = b + (r_0 - b)e^{-aT} + \sigma\int_0^T e^{-a(T-s)}\,dW_s$$

The stochastic integral has mean zero and, by the Itō isometry, variance $\sigma^2\int_0^T e^{-2a(T-s)}\,ds$. So $r_T$ is normal, with mean

> $$E[r_T] = b + (r_0 - b)e^{-aT}$$

and variance

> $$\operatorname{Var}(r_T) = \frac{\sigma^2}{2a}\left(1 - e^{-2aT}\right)$$

As $T \to \infty$, $r_T$ tends to $N\left(b, \sigma^2/2a\right)$. Because $r_T$ is normal, it can go negative.

> [!example]- The short rate follows $dr_t = 0.2(0.05 - r_t)\,dt + 0.01\,dW_t$ with $r_0 = 0.03$. What are $E[r_5]$, its standard deviation and $\Pr(r_5 < 0)$? {Example}
> - The mean is $E[r_5] = 0.05 + (0.03 - 0.05)e^{-1} = 0.05 - 0.02(0.367879) = 0.042642$.
> - The rate has closed about 63% of the gap to $b = 5\%$, since $1 - e^{-1} = 0.632$.
> - The variance is $\frac{0.01^2}{0.4}\left(1 - e^{-2}\right) = 0.000216166$, so the standard deviation is $0.014703$.
> - The probability of a negative rate is $N(-0.042642/0.014703) = N(-2.900) = 0.0019$.

## Cox-Ingersoll-Ross model

The Cox-Ingersoll-Ross (CIR) model of the short rate is

> $$dr_t = a(b - r_t)\,dt + \sigma\sqrt{r_t}\,dW_t$$

It has the same drift as Vasicek, so $r_T$ has the same mean. The volatility shrinks as the rate falls, so the rate stays non-negative, and it stays strictly positive when $2ab \ge \sigma^2$. Its distribution is a scaled non-central chi-square rather than a normal. Its variance depends on $r_0$ and $b$, and it is

> $$\operatorname{Var}(r_T) = \frac{r_0\sigma^2}{a}\left(e^{-aT} - e^{-2aT}\right) + \frac{b\sigma^2}{2a}\left(1 - e^{-aT}\right)^2$$

> [!example]- For CIR with $a = 0.2$, $b = 0.05$, $\sigma = 0.05$ and $r_0 = 0.03$, what are $E[r_5]$ and $\operatorname{Var}(r_5)$? {Example}
> - The drift is the Vasicek example's, so $E[r_5] = 0.042642$ again.
> - The variance is $\frac{0.03(0.0025)}{0.2}\left(e^{-1} - e^{-2}\right) + \frac{0.05(0.0025)}{0.4}\left(1 - e^{-1}\right)^2 = 0.000212$.
> - That is almost the Vasicek example's $0.000216$, but under CIR the probability of a negative rate is exactly zero.

## Real-world and risk-neutral SDEs

The same SDE can be written under the real-world measure $\mathbb{P}$ or the risk-neutral measure $\mathbb{Q}$. [[Girsanov's Theorem|Girsanov's theorem]] changes the drift by the market price of risk and leaves $\sigma$ alone, so a stock's drift $\mu$ becomes $r$ under $\mathbb{Q}$.

## Simulating an SDE

Most SDEs, such as those for [[Stochastic Volatility|stochastic volatility]] or for a short rate with a level-dependent volatility, cannot be solved explicitly. They are simulated on a time grid, from an exact transition density where one is known, or with the [[Euler-Maruyama Discretization|Euler-Maruyama scheme]], whose step is

> $$X_{t+h} \approx X_t + \mu h + \sigma\sqrt{h}\,Z$$

- $h$ is the time step.
- $Z$ is a standard normal draw.

> [!trap] Vasicek's variance factor
> The Vasicek variance is $\frac{\sigma^2}{2a}\left(1 - e^{-2aT}\right)$, with $2a$ in both places. Writing $e^{-aT}$ inside the bracket, or $\sigma^2 T$ as for a Brownian motion, overstates the spread of a mean-reverting rate. In the example, $\sigma^2 T = 0.0005$ against the correct $0.000216$.
