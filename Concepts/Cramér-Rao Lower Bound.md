---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:fcae0fd1b1737964d3c7d2a45dd4b875241f3848d73b127e34d4fc312fb8c7a5
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Random, §6.3 Maximum Likelihood (likelihood = pdf with roles reversed; log-likelihood; interior vs boundary maxima; invariance; Bernoulli/Poisson/normal/gamma MLEs; Uniform[0,h]: MLE X_(n), mse 2h²/((n+1)(n+2)), (n+1)X_(n)/n unbiased with var h²/(n(n+2)); Uniform[a,a+1]: MLE not unique), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html"
    - "Siegrist, Random, §6.5 Best Unbiased Estimators (UMVUE; Cramér–Rao bound under the interchange assumption, support not depending on θ; (dλ/dθ)²/(n E[l²]) and the second-derivative form; equality iff h(X) = λ(θ) + u(θ)L1; Bernoulli, Poisson (θ/n), normal (M attains σ²/n), gamma; Uniform[0,a]: assumption fails, theorem does not apply), sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html"
    - "Siegrist, Random, §6.6 Sufficient, Complete and Ancillary Statistics (definition via the conditional distribution; Fisher–Neyman factorization; MLE vs sufficient statistic; Rao–Blackwell; Lehmann–Scheffé; Bernoulli, Poisson (UMVUE ((n−1)/n)^Y of e^{−θ}), normal, gamma, uniform; exponential family natural statistic minimally sufficient and complete), sha256:4d7402f2a960ea2b4232e57e4ee5992ac29801b9269f300f17f8e83074d5a0e4 — https://www.randomservices.org/random/point/Sufficient.html"
    - "Stanford STATS 200 (Autumn 2016), Lecture 14, Theorem 14.1 and its regularity conditions (common support, interior θ0, differentiable log-likelihood, unique score root); I(θ) per observation = Var[z] = −E[z′], pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf"
    - "Stanford STATS 200 (Autumn 2016), Lecture 15, Theorem 15.4 (Var[T] ≥ 1/(nI(θ)) for unbiased T, 'certain mild regularity assumptions'; Var of the sample score = nI(θ)) and p.15-4 (efficient = attains the bound; MLE asymptotically efficient; MoM expected to have higher MSE than the MLE for large n; biased estimators can beat the bound at special θ), sha256:7e9d32d62f5b6fe7374924822c86b27c81b36ee2b25ea596ca774f7678287247 — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture15.pdf"
    - "Wikipedia, 'Efficiency (statistics)' (fetched 2026-10-05): e(T) = (1/I(θ))/var(T) for an unbiased estimator T, I the sample Fisher information; an efficient estimator is the MVUE, sha256:f3baa00ac8a8d31a872a6f9d3a44610eca510d677fd167845ebf24948621e97f — https://en.wikipedia.org/wiki/Efficiency_(statistics)"
  open_findings: 1
  open_critical: 0
  log: ".verify/Concepts/Cramér-Rao Lower Bound.md"
---

The **Cramér–Rao lower bound** (CRLB) is the smallest variance that any [[Unbiasedness|unbiased]] estimator of a parameter can have, under standard regularity conditions. For a [[Random Sample|random sample]] of size $n$ it is the reciprocal of the sample's [[Fisher Information|Fisher information]], $n I(\theta)$ — the benchmark against which [[Efficiency|efficiency]] is measured.

> $$\text{Var}(\hat\theta) \ge \frac{1}{n\,I(\theta)}$$

> $$\text{Var}(T) \ge \frac{\left[g'(\theta)\right]^2}{n\,I(\theta)}$$

> $$I(\theta) = -E\left[\frac{\partial^2}{\partial\theta^2}\ln f(X \mid \theta)\right]$$

- $\hat\theta$ is any unbiased estimator of $\theta$, and $T$ any unbiased estimator of a function $g(\theta)$ — a probability, a mean or a percentile. $I(\theta)$ is the information in **one** observation; information adds over independent observations, hence the factor $n$. The same $I(\theta)$ equals $E\big[(\partial_\theta \ln f)^2\big]$.
- **Regularity.** The bound needs the support of $f$ not to depend on $\theta$. It fails for $\text{Uniform}(0,\theta)$: there $\frac{n+1}{n}\max X_i$ is unbiased with variance $\frac{\theta^2}{n(n+2)}$, far below the $\theta^2/n$ a naive calculation would give.
- **Attaining it.** An unbiased estimator whose variance equals the bound is **efficient**, and is then the [[Minimum Variance|minimum-variance]] unbiased estimator. The bound is reached only when the score $\partial_\theta \ln L$ is a linear function of the estimator, which essentially confines attainment to [[Exponential Family|exponential-family]] models. Often no unbiased estimator attains it, even the best one.
- **Large samples.** The [[Maximum Likelihood Estimation|MLE]] attains the bound asymptotically, $\hat\theta \,\dot\sim\, N\big(\theta,\ 1/(nI(\theta))\big)$, which is where MLE standard errors come from.
- The bound restricts **unbiased** estimators only. A biased estimator can have smaller variance, and even smaller [[Mean Square Error]], than the CRLB.

> [!example]- Bound for Estimating the No-Claim Probability {Example}
> Annual claim counts on $n = 100$ policies are iid $\text{Poisson}(\lambda)$, with $\lambda$ around $0.2$. The insurer wants an unbiased estimate of $P(N = 0) = e^{-\lambda}$, the no-claim probability. Find the Cramér–Rao lower bound on its variance.
>
> > [!answer]-
> > For the Poisson, $I(\lambda) = 1/\lambda$. With $g(\lambda) = e^{-\lambda}$, $g'(\lambda) = -e^{-\lambda}$.
> >
> > $$
> > \begin{align*}
> > \text{Var}(T) &\ge \frac{e^{-2\lambda}}{n/\lambda} \\
> > &= \frac{\lambda e^{-2\lambda}}{n} \\
> > &= \frac{0.2\,e^{-0.4}}{100} \\
> > &= 0.0013406
> > \end{align*}
> > $$
> >
> > No unbiased estimator of the no-claim probability can have a standard error below $\sqrt{0.0013406} = 0.0366$. The best unbiased estimator, $(1 - 1/n)^{\sum X_i}$, has variance $e^{-2\lambda}(e^{\lambda/n} - 1) = 0.0013420$ — just above the bound, which it never quite reaches.

> [!example]- An Unattainable Bound for a Pareto Severity {Example}
> Claim severities follow a Pareto with known $\theta$, $f(x) = \dfrac{\alpha\theta^\alpha}{(x+\theta)^{\alpha+1}}$. From $n = 20$ claims with true $\alpha = 3$, compare the CRLB with the variance of the unbiased estimator $\hat\alpha = \dfrac{n-1}{G}$, where $G = \sum \ln(1 + X_i/\theta)$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \ln f &= \ln\alpha + \alpha\ln\theta - (\alpha+1)\ln(x+\theta) \\
> > \frac{\partial^2}{\partial\alpha^2}\ln f &= -\frac{1}{\alpha^2} \\
> > I(\alpha) &= \frac{1}{\alpha^2}
> > \end{align*}
> > $$
> >
> > So the CRLB is $\alpha^2/n = 9/20 = 0.45$.
> >
> > Each $\ln(1 + X_i/\theta)$ is exponential with mean $1/\alpha$, so $G \sim \text{Gamma}(n,\ \text{rate } \alpha)$. That gives $E[1/G] = \frac{\alpha}{n-1}$ and $E[1/G^2] = \frac{\alpha^2}{(n-1)(n-2)}$:
> >
> > $$
> > \begin{align*}
> > \text{Var}(\hat\alpha) &= \frac{(n-1)^2\alpha^2}{(n-1)(n-2)} - \alpha^2 \\
> > &= \frac{\alpha^2}{n-2} \\
> > &= 0.50
> > \end{align*}
> > $$
> >
> > Efficiency is $0.45/0.50 = 0.90$. The estimator is a function of the sufficient statistic $G$ and is the best unbiased estimator available, yet it misses the bound. The bound is unattainable at $n = 20$, and the efficiency $(n-2)/n$ only tends to $1$ as $n$ grows.
