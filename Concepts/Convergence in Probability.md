A sequence of random variables $X_n$ **converges in probability** to $X$ (often a constant $a$) if, for every tolerance $\varepsilon > 0$, the chance that $X_n$ misses $X$ by more than $\varepsilon$ goes to 0 as $n \to \infty$. It is the mode of convergence behind the weak [[Law of Large Numbers]] and the definition of a [[Consistency|consistent]] estimator.

> $$X_n \xrightarrow{p} X \iff \lim_{n \to \infty} P\big(|X_n - X| > \varepsilon\big) = 0 \ \text{ for every } \varepsilon > 0$$

- **Weak law of large numbers.** For an i.i.d. sample with mean $\mu$ and finite variance $\sigma^2$, $\bar{X}_n \xrightarrow{p} \mu$. The proof is Chebyshev's inequality, $P(|\bar{X}_n - \mu| > \varepsilon) \le \sigma^2/(n\varepsilon^2) \to 0$; more generally, any estimator whose mean square error goes to 0 converges in probability.
- **Consistency.** An estimator $\hat\theta_n$ is consistent for $\theta$ when $\hat\theta_n \xrightarrow{p} \theta$. By the weak law, the [[Sample Mean|sample mean]] and the [[Empirical Distribution|empirical CDF]] at a fixed point are consistent.
- **Continuous functions.** If $X_n \xrightarrow{p} a$ and $g$ is continuous at $a$, then $g(X_n) \xrightarrow{p} g(a)$, so a smooth function of a consistent estimator is consistent. Sums also carry over: if $X_n \xrightarrow{p} X$ and $Y_n \xrightarrow{p} Y$, then $X_n + Y_n \xrightarrow{p} X + Y$, because $P(|X_n + Y_n - X - Y| > \varepsilon) \le P(|X_n - X| > \varepsilon/2) + P(|Y_n - Y| > \varepsilon/2)$.
- **Other modes.** Convergence with probability 1 (strong convergence) implies convergence in probability, which in turn implies convergence in distribution — the mode of the [[Central Limit Theorem]]. The converse holds when the limit is a constant: $X_n \to a$ in distribution implies $X_n \xrightarrow{p} a$.

> [!example]- The Largest Loss as an Estimate of the Maximum Loss {Example}
> Losses are uniform on $(0, \theta)$ with $\theta = 1{,}000$, and the largest of $n$ losses, $X_{(n)}$, is used to estimate $\theta$. Find $P(|X_{(n)} - \theta| > 50)$ for $n = 50$ and $n = 100$, and show that $X_{(n)}$ is consistent.
>
> > [!answer]-
> > $X_{(n)}$ is never above $\theta$, so missing by more than $\varepsilon$ means all $n$ losses fall below $\theta - \varepsilon$:
> >
> > $$
> > \begin{align*}
> > P\big(|X_{(n)} - \theta| > \varepsilon\big) &= P\big(X_{(n)} < \theta - \varepsilon\big) \\
> >   &= \left(\frac{\theta - \varepsilon}{\theta}\right)^{n}
> > \end{align*}
> > $$
> >
> > With $\varepsilon = 50$ this is $(0.95)^{50} = 0.0769$ for $n = 50$ and $(0.95)^{100} = 0.0059$ for $n = 100$. For any $\varepsilon > 0$, $(1 - \varepsilon/\theta)^n \to 0$, so $X_{(n)} \xrightarrow{p} \theta$ and the sample maximum is consistent — even though it is biased low for every $n$ (see [[Order Statistics]]).

> [!example]- Estimating a Poisson Rate From the Claim-Free Proportion {Example}
> Claim counts are Poisson with mean $\lambda$. Of 1,000 policies, 819 were claim-free. Estimate $\lambda$ by $\tilde\lambda = -\ln \hat{p}_0$, where $\hat{p}_0$ is the claim-free proportion, and explain why $\tilde\lambda$ is consistent.
>
> > [!answer]-
> > $\hat{p}_0$ is the sample mean of the indicators $\mathbf{1}\{N_i = 0\}$, whose mean is $e^{-\lambda}$, so by the weak law $\hat{p}_0 \xrightarrow{p} e^{-\lambda}$. The function $g(p) = -\ln p$ is continuous at $e^{-\lambda} > 0$, so
> >
> > $$
> > \begin{align*}
> > \tilde\lambda &= -\ln \hat{p}_0 \xrightarrow{p} -\ln e^{-\lambda} \\
> >   &= \lambda
> > \end{align*}
> > $$
> >
> > Here $\tilde\lambda = -\ln 0.819 = 0.1997$. It is consistent, though less efficient than the MLE $\bar{N}$, which uses every count rather than only whether it was zero.
