---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:7f19aab5b87e7bb1e7f7fe0a482dd0f52ba1b61ed6c0bc902bab7de6cc138568
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Random, §6.5 Best Unbiased Estimators (UMVUE; Cramér–Rao bound under the interchange assumption, support not depending on θ; (dλ/dθ)²/(n E[l²]) and the second-derivative form; equality iff h(X) = λ(θ) + u(θ)L1; Bernoulli, Poisson (θ/n), normal (M attains σ²/n), gamma; Uniform[0,a]: assumption fails, theorem does not apply), sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html"
    - "Stanford STATS 200 (Autumn 2016), Lecture 14, Theorem 14.1 and its regularity conditions (common support, interior θ0, differentiable log-likelihood, unique score root); I(θ) per observation = Var[z] = −E[z′], pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf"
    - "Stanford STATS 200 (Autumn 2016), Lecture 15, Theorem 15.4 (Var[T] ≥ 1/(nI(θ)) for unbiased T, 'certain mild regularity assumptions'; Var of the sample score = nI(θ)) and p.15-4 (efficient = attains the bound; MLE asymptotically efficient; MoM expected to have higher MSE than the MLE for large n; biased estimators can beat the bound at special θ), sha256:7e9d32d62f5b6fe7374924822c86b27c81b36ee2b25ea596ca774f7678287247 — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture15.pdf"
    - "Frees et al., Loss Data Analytics, Appendix C §17.2.2 Asymptotic Properties of MLE: consistency, asymptotic normality and efficiency 'under certain regularity conditions'; variance estimated from the observed Fisher information (matrix inverse), sha256:3d597f08f5d5e9a3ec4283da37ed9b7f1a637796e1761aac8f977fe2f34a6211 — https://openacttexts.github.io/Loss-Data-Analytics/CAppC.html"
    - "Wikipedia, 'Efficiency (statistics)' (fetched 2026-10-05): e(T) = (1/I(θ))/var(T) for an unbiased estimator T, I the sample Fisher information; an efficient estimator is the MVUE, sha256:f3baa00ac8a8d31a872a6f9d3a44610eca510d677fd167845ebf24948621e97f — https://en.wikipedia.org/wiki/Efficiency_(statistics)"
    - "Penn State STAT 415, Lesson 7 §7.1 Properties of MLEs: consistency, equivariance, asymptotic normality 'subject to some regularity conditions'; Ex 7.1 normal MLEs x̄ and divisor-n variance (I(θ) written for the whole sample there), sha256:0c6afc848ae41251fc702348e0e8c603c5725f1f03c20b4731d789a61babbe0b — https://online.stat.psu.edu/stat415/Lesson07.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Fisher Information.md
---

![[Media/Figures/Fisher_Information.svg|340]]

The **Fisher Information** $I(\theta)$ is a measure of how precisely one observation determines a parameter $\theta$, given by the expected curvature of its log-density. For one observation $X$ with density $f(x \mid \theta)$, the Fisher information is

> $$I(\theta) = -E\left[\frac{\partial^2}{\partial \theta^2} \ln f(X \mid \theta)\right]$$

Under regularity conditions, which include that the support of $f$ does not depend on $\theta$, it is also the variance of the score, the expected square of the first derivative:

> $$I(\theta) = E\left[\left(\frac{\partial}{\partial \theta} \ln f(X \mid \theta)\right)^2\right]$$

A large $I(\theta)$ means a sharply peaked log-likelihood and a precisely estimated parameter. A small $I(\theta)$ means a flat log-likelihood. The score is 0 at the maximum likelihood estimate, but the information has no special feature there, such as a zero or a minimum, so a plot of $I(\theta)$ cannot locate the estimate.

> [!example]- Claim counts follow a [[Poisson Distribution|Poisson distribution]] with mean $\lambda$. What is the Fisher information of $\lambda$ for one observation? {Example}
> - The log-density is $\ln f(x \mid \lambda) = -\lambda + x\ln\lambda - \ln x!$.
> - The first derivative is $-1 + x/\lambda$, and the second derivative is $-x/\lambda^2$.
> - Taking the negative expected value gives $I(\lambda) = E[X]/\lambda^2 = \lambda/\lambda^2$.
> - The Fisher information is $I(\lambda) = 1/\lambda$.

## Information in a sample

Information adds over independent observations. The Fisher information of a [[Random Sample|random sample]] of size $n$ is

> $$I_n(\theta) = n\,I(\theta)$$

> [!example]- Claim sizes are exponential with mean $\theta$. What is the Fisher information of $\theta$ in a sample of 50 claims, evaluated at $\theta = 1{,}000$? {Example}
> - The log-density is $\ln f(x \mid \theta) = -\ln\theta - x/\theta$.
> - The second derivative is $1/\theta^2 - 2x/\theta^3$.
> - Its negative expected value, with $E[X] = \theta$, is $I(\theta) = -1/\theta^2 + 2/\theta^2 = 1/\theta^2$.
> - For 50 claims at $\theta = 1{,}000$, the information is $50/1{,}000^2 = 0.00005$.

## Variance of the maximum likelihood estimator

For a large sample, the [[Maximum Likelihood Estimation|maximum likelihood estimator]] $\hat{\theta}$ is approximately normal with mean $\theta$ and variance

> $$\text{Var}(\hat{\theta}) \approx \frac{1}{n\,I(\theta)}$$

This is the [[Cramér-Rao Lower Bound|Cramér-Rao lower bound]]. In practice $\theta$ is replaced by $\hat{\theta}$, or $nI(\theta)$ by the observed information $-l''(\hat{\theta})$, the negative second derivative of the log-likelihood at the estimate. These are the standard errors printed in [[Parameter Estimate Tables|parameter estimate tables]].

> [!example]- A sample of 200 exponential claim sizes gives the maximum likelihood estimate $\hat{\theta} = 1{,}500$. What is an approximate 95% [[Confidence Interval|confidence interval]] for $\theta$? {Example}
> - For the exponential, $I(\theta) = 1/\theta^2$, so $\text{Var}(\hat{\theta}) \approx \theta^2/200$.
> - Replacing $\theta$ by 1,500, the standard error is $1{,}500/\sqrt{200} = 106.07$.
> - The interval is $1{,}500 \pm 1.96(106.07)$, which is $(1{,}292,\ 1{,}708)$.
