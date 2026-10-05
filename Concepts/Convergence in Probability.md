---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:68000054e50199a9bc2e096472630de8276497b5844785fe25dd529926f6defc
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
