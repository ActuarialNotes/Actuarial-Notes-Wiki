---
aliases:
  - Stochastic Calculus Theory
  - Isometry
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2664db747a33e37f5d11f1e3c2469ef3b43494306a90b0cd9b3e86329de23401
  sources: []
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Itō Calculus.md"
---
**Itō calculus** is the calculus of processes driven by a Brownian motion (Wiener process) $W_t$: it defines the integral $\int H_s\,dW_s$ against a path that has no derivative, and its chain rule, **Itō's lemma**, gives the dynamics of any smooth function of such a process. It is the toolkit behind the [[Stochastic Differential Equation|stochastic differential equations]] of asset prices and interest rates, and behind every derivative price written as a [[Martingale|martingale]] expectation under the [[Risk-Neutral Valuation|risk-neutral measure]].

> $$dX_t = \mu(X_t,t)\,dt + \sigma(X_t,t)\,dW_t$$

> $$\int_0^T H_s\,dW_s = \lim_{n\to\infty}\sum_{i=0}^{n-1} H_{t_i}\left(W_{t_{i+1}} - W_{t_i}\right)$$

> $$E\!\left[\left(\int_0^T H_s\,dW_s\right)^{2}\right] = E\!\left[\int_0^T H_s^2\,ds\right]$$

> $$dG = \left(G_t + \mu\,G_x + \tfrac12\sigma^2 G_{xx}\right)dt + \sigma\,G_x\,dW_t$$

- **Wiener process:** $W_t$ starts at $W_0 = 0$, has continuous paths, and has independent increments with $W_t - W_s \sim N(0,\,t-s)$ for $s < t$. Hull writes it $z$ and its increment $\Delta z = \epsilon\sqrt{\Delta t}$ with $\epsilon \sim N(0,1)$. The paths are continuous but nowhere differentiable, so $dW_t/dt$ does not exist and ordinary calculus cannot be applied to them.
- **Itō process:** The first block is an Itō process with drift $\mu$ and diffusion (volatility) $\sigma$. It is shorthand for the integral equation $X_t = X_0 + \int_0^t \mu\,ds + \int_0^t \sigma\,dW_s$, in which the last term is an Itō integral.
- **The Itō integral:** The sum in the second block evaluates the integrand $H$ at the left end of each interval, so $H$ must be non-anticipating (known at time $t_i$, before the increment is drawn). As a result, the integral has mean zero and is a martingale whenever $E\int_0^T H_s^2\,ds < \infty$.
- **Itō isometry:** The third block turns the second moment of a stochastic integral into an ordinary time integral. Because the mean is zero, it gives the variance directly: $\operatorname{Var}\left(\int_0^T H_s\,dW_s\right) = \int_0^T E[H_s^2]\,ds$. For two integrands, $E\left[\int H\,dW \int K\,dW\right] = E\int H_s K_s\,ds$.
- **Quadratic variation:** Summing squared increments over a fine partition gives $\sum (\Delta W)^2 \to T$, not 0. This is the source of the multiplication rules $(dW_t)^2 = dt$, $dt\,dW_t = 0$ and $(dt)^2 = 0$, so $(dX_t)^2 = \sigma^2\,dt$.
- **Itō's lemma:** For $G(X_t, t)$ with continuous partial derivatives $G_t$, $G_x$ and $G_{xx}$, a second-order Taylor expansion keeps the term $\tfrac12 G_{xx}(dX)^2 = \tfrac12\sigma^2 G_{xx}\,dt$, which is the fourth block. That extra drift term is what separates Itō calculus from the ordinary chain rule, and $G$ inherits the same Brownian motion with diffusion $\sigma G_x$.
- **Product rule:** For two Itō processes, $d(XY) = X\,dY + Y\,dX + dX\,dY$, where the cross term is computed with the multiplication rules. It is the tool for discounting, as in $d(e^{-rt}S_t)$.
- **Where it leads:** Itō's lemma applied to a derivative price $f(S,t)$, together with a [[Delta Hedging|delta hedge]], gives the [[Black-Scholes Model|Black-Scholes-Merton]] PDE. [[Girsanov's Theorem|Girsanov's theorem]] changes the drift of the same Brownian motion when the measure changes.

> [!example]- Itō's Lemma on the Log of a Stock Price {Example}
> A stock follows geometric Brownian motion, $dS_t = \mu S_t\,dt + \sigma S_t\,dW_t$, with $S_0 = 100$, $\mu = 0.08$ and $\sigma = 0.25$. Use Itō's lemma on $G = \ln S$ to find the distribution of $\ln S_2$, show that $S_2$ is [[Lognormal Distribution|lognormal]], and give the median and the mean of $S_2$ and the probability that $S_2 > 120$.
>
> > [!answer]-
> > With $G = \ln S$, the partial derivatives are $G_t = 0$, $G_S = 1/S$ and $G_{SS} = -1/S^2$. Itō's lemma gives a process with constant coefficients.
> > $$
> > \begin{align*}
> > dG &= \left(0 + \mu S\cdot\tfrac{1}{S} - \tfrac12\sigma^2 S^2\cdot\tfrac{1}{S^2}\right)dt + \sigma S\cdot\tfrac{1}{S}\,dW_t \\
> > &= \left(\mu - \tfrac12\sigma^2\right)dt + \sigma\,dW_t \\
> > &= 0.04875\,dt + 0.25\,dW_t
> > \end{align*}
> > $$
> > So $\ln S_2$ is normal with mean $\ln 100 + 0.04875(2) = 4.70267$ and variance $0.25^2(2) = 0.125$, a standard deviation of $0.35355$.
> > $$
> > \begin{align*}
> > \text{median}(S_2) &= e^{4.70267} \\
> > &= 110.24 \\
> > E[S_2] &= 100\,e^{0.08(2)} \\
> > &= 117.35 \\
> > \Pr(S_2 > 120) &= 1 - N\!\left(\frac{\ln 120 - 4.70267}{0.35355}\right) \\
> > &= 1 - N(0.2399) \\
> > &= 0.4052
> > \end{align*}
> > $$
> > The log grows at $\mu - \tfrac12\sigma^2$, not $\mu$. The gap of $\tfrac12\sigma^2$ is the Itō correction, and it is why the median of $S_2$ sits below its mean.

> [!example]- Mean and Variance of the Integral of W Against Itself {Example}
> Let $I_T = \int_0^T W_s\,dW_s$. Find $E[I_T]$ and $\operatorname{Var}(I_T)$ by the Itō isometry, then check the answer by finding $I_T$ in closed form with Itō's lemma. Evaluate the variance at $T = 3$.
>
> > [!answer]-
> > The integrand $W_s$ is non-anticipating, so $E[I_T] = 0$. The isometry gives the variance from $E[W_s^2] = s$.
> > $$
> > \begin{align*}
> > \operatorname{Var}(I_T) &= E\!\left[\int_0^T W_s^2\,ds\right] \\
> > &= \int_0^T s\,ds \\
> > &= \tfrac12 T^2
> > \end{align*}
> > $$
> > To check it, apply Itō's lemma to $G = W_t^2$, where $\mu = 0$, $\sigma = 1$, $G_x = 2W$ and $G_{xx} = 2$. That gives $d(W_t^2) = dt + 2W_t\,dW_t$, so $I_T = \tfrac12\left(W_T^2 - T\right)$. Since $W_T^2/T$ is chi-square with one degree of freedom, $\operatorname{Var}(W_T^2) = 2T^2$.
> > $$
> > \begin{align*}
> > \operatorname{Var}(I_T) &= \tfrac14\operatorname{Var}(W_T^2) \\
> > &= \tfrac14(2T^2) \\
> > &= \tfrac12 T^2
> > \end{align*}
> > $$
> > At $T = 3$ the variance is $4.5$. Ordinary calculus would have given $\tfrac12 W_T^2$, whose mean is $\tfrac12 T$ rather than 0, so the $-\tfrac12 T$ term is the Itō correction again.

> [!tip]- How it appears on the exam
> - **INV-201:** The syllabus lists the Itō integral, Itō's lemma and the Itō isometry by name in its stochastic calculus objective, with Hull's chapter on Wiener processes and Itō's lemma and the Chin, Nel and Olafsson problem sets as readings.
> - **Itō's lemma questions:** A typical question gives an Itō process for $S_t$ or $r_t$ and asks for the dynamics of a function of it, such as $\ln S$, $S^n$, $e^{-rt}S_t$ or a forward price $S e^{r(T-t)}$. It then asks for a distribution, a mean or a probability.
> - **Isometry questions:** Another shape asks for the mean, variance or covariance of a stochastic integral such as $\int_0^T s\,dW_s$ or $\int_0^T W_s\,dW_s$. The isometry turns each one into an ordinary integral.
> - **Written answers:** Candidates may be asked to explain why $(dW)^2 = dt$, why the integrand must be evaluated at the left endpoint, or why the extra $\tfrac12\sigma^2 G_{xx}$ term appears.

> [!warning]- Exam traps
> - **Dropping the second-order term:** Applying the ordinary chain rule to $\ln S$ gives drift $\mu$ instead of $\mu - \tfrac12\sigma^2$. Any answer whose median of $S_T$ equals $S_0e^{\mu T}$ has made this slip.
> - **Squaring the wrong thing:** The isometry squares the integrand inside a $ds$ integral. Writing $\operatorname{Var}\int_0^T W_s\,dW_s = \operatorname{Var}(W_T)\cdot T$ or $T \cdot E[W_T^2]$ gives $T^2$ rather than $\tfrac12T^2$.
> - **Using the isometry on a $ds$ integral:** The isometry applies to $dW$ integrals only. For $\int_0^T W_s\,ds$, adding up $\operatorname{Var}(W_s) = s$ to get $\tfrac12T^2$ is wrong, because the $W_s$ are correlated. Rewrite it first as $\int_0^T (T-s)\,dW_s$, and then the isometry gives the correct variance of $T^3/3$.
> - **Mixing up the multiplication rules:** Only $(dW)^2$ survives as $dt$. Keeping $dt\,dW$ or $(dt)^2$ adds spurious terms, and forgetting the correlation in $dW^1\,dW^2 = \rho\,dt$ loses the cross term for two assets.
