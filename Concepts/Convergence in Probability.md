---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:3c9358edd490ee0cd9ae2eeb1d33cc4b084110a57dd77960f3f024fbf46f85f3
  sources:
    - "Siegrist, Random, ch.1 §6 Convergence: definition P[d(X_n, X) > eps] -> 0 for each eps; convergence with probability 1 (strong) implies convergence in probability, sha256:749de69aba8c7b54e5944ddbe4b342fec8695b32ff46e34409f7b6040241e34f — https://www.randomservices.org/random/prob/Convergence.html"
    - "Siegrist, Random, ch.2 §9 Convergence in Distribution: convergence in probability implies convergence in distribution; converse when the limit is a constant; continuous mapping for convergence in distribution, sha256:dc6a536ca3359f3952e1ae487a445377de1c1e73491bb56f3baa8862630dcc3d — https://www.randomservices.org/random/dist/Convergence.html"
    - "Siegrist, Random, ch.5 §3 The Law of Large Numbers: var(M_n) = sigma^2/n -> 0 (mean square), weak law M_n -> mu in probability via Chebyshev's inequality; mean-square convergence implies convergence in probability, sha256:8662dfc55683fa40c79a5d453a450730e2ba151716a20eb61a2db307c33f5e85 — https://www.randomservices.org/random/sample/LLN.html"
    - "Siegrist, Random, ch.6 §1 Estimators: consistency = convergence in probability; mean-square consistent implies consistent; sample mean and empirical distribution function at a fixed y are consistent, sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
    - "Wikipedia, 'Convergence of random variables', oldid 1373605938, 'Properties': continuous mapping theorem for convergence in probability; convergence in distribution to a constant implies convergence in probability, sha256:96fe0fcda54159af45c3ad6095113531494959b0947024144741b342b9e494d5 — https://en.wikipedia.org/w/index.php?title=Convergence_of_random_variables&oldid=1373605938"
    - "Wikipedia, 'Proofs of convergence of random variables', oldid 1377469039, 'Convergence of two sequences in probability implies joint convergence in probability' (bound by Pr(|X_n - X| >= eps/2) + Pr(|Y_n - Y| >= eps/2)), sha256:d0829e9607508a32203c650c823ea724a22e0930a900484176c6eec0871444a4 — https://en.wikipedia.org/w/index.php?title=Proofs_of_convergence_of_random_variables&oldid=1377469039"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), reading list PDF p.6: Hogg Domain B §5.1, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Hogg, McKean & Craig, Introduction to Mathematical Statistics 8th ed. (Global Ed.), publisher preview, contents PDF pp.6-8: §5.1 'Convergence in Probability' (contents only), sha256:7fd80607a820477e03ff2c8f3469f5cfa57d095d766cbc29d39d723ef5a69a99 — https://api.pageplace.de/preview/DT0400.9781292264783_A39514650/preview-9781292264783_A39514650.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Convergence in Probability.md
---

**Convergence in Probability** is the mode of convergence in which the probability that a random variable $X_n$ differs from its limit by more than a fixed amount goes to 0 as $n$ grows. The sequence $X_1, X_2, \ldots$ converges in probability to the constant $a$, written $X_n \xrightarrow{p} a$, if for every $\varepsilon > 0$

> $$\lim_{n \to \infty} P\bigl(|X_n - a| \ge \varepsilon\bigr) = 0$$

The limit may also be a random variable $X$, with $|X_n - X|$ in place of $|X_n - a|$. An [[Estimator|estimator]] $\hat{\theta}$ computed from a [[Random Sample|random sample]] of size $n$ is [[Consistency|consistent]] for $\theta$ when it converges in probability to $\theta$ as $n$ grows.

> [!example]- Losses are uniform on $(0, \theta)$ with $\theta = 1{,}000$, and the largest of $n$ losses, $X_{(n)}$, estimates $\theta$. What is the probability that $X_{(n)}$ misses $\theta$ by 50 or more, for $n = 50$ and $n = 100$, and is $X_{(n)}$ consistent? {Example}
> - $X_{(n)}$ is never above $\theta$, so it misses by 50 or more exactly when every loss is at most 950.
> - The [[Random Sample#The largest and smallest observations|cdf of the largest observation]] gives $P(X_{(n)} \le 950) = (950/1{,}000)^n = 0.95^n$.
> - The probability is $0.95^{50} = 0.0769$ for $n = 50$ and $0.95^{100} = 0.0059$ for $n = 100$.
> - For any $\varepsilon > 0$, $(1 - \varepsilon/\theta)^n \to 0$, so $X_{(n)} \xrightarrow{p} \theta$ and the largest loss is a consistent estimator of $\theta$.

## The weak law of large numbers

For a random sample from a distribution with mean $\mu$ and finite variance $\sigma^2$, Chebyshev's inequality bounds the probability that the [[Sample Mean|sample mean]] $\bar{X}$ misses $\mu$:

> $$P\bigl(|\bar{X} - \mu| \ge \varepsilon\bigr) \le \frac{\sigma^2}{n\varepsilon^2}$$

The bound goes to 0 as $n$ grows, so $\bar{X} \xrightarrow{p} \mu$. This is the weak [[Law of Large Numbers|law of large numbers]]. Applied to $g(X_1), \ldots, g(X_n)$, it shows that the average of $g(X_i)$ converges in probability to $E[g(X)]$.

> [!example]- Claims have mean $\mu$ and standard deviation 10. What bound does Chebyshev's inequality give on the probability that the mean of 100 claims misses $\mu$ by 2 or more? {Example}
> - The variance of one claim is $\sigma^2 = 100$.
> - The bound is $100/(100 \times 2^2) = 0.25$.

## Functions of sequences that converge in probability

If $X_n \xrightarrow{p} a$ and $g$ is a function continuous at $a$, then

> $$g(X_n) \xrightarrow{p} g(a)$$

If also $Y_n \xrightarrow{p} b$, then $X_n + Y_n \xrightarrow{p} a + b$ and $X_n Y_n \xrightarrow{p} ab$. A function of a consistent estimator that is continuous at $\theta$ is therefore consistent for $g(\theta)$. Multiplying a consistent estimator by constants $c_n$ keeps it consistent when $c_n \to 1$, so $\frac{n+1}{n}X_{(n)}$ is consistent for $\theta$ in the example above, while $2X_{(n)}$ and $nX_{(n)}$ are not.

> [!example]- Claim counts are Poisson with mean $\lambda$. Of 1,000 policies, 819 had no claim. Is $-\ln \hat{p}_0$, where $\hat{p}_0$ is the proportion of policies with no claim, a consistent estimator of $\lambda$, and what is the estimate? {Example}
> - $\hat{p}_0$ is the sample mean of indicators whose mean is $P(N = 0) = e^{-\lambda}$, so $\hat{p}_0 \xrightarrow{p} e^{-\lambda}$ by the weak law of large numbers.
> - The function $g(p) = -\ln p$ is continuous at $e^{-\lambda}$, so $-\ln \hat{p}_0 \xrightarrow{p} -\ln e^{-\lambda} = \lambda$.
> - The estimator is consistent, and the estimate is $-\ln 0.819 = 0.1997$.
