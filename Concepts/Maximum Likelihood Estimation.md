---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:fd03fc8a973a312827912e8c512ed73985c34d944a368842fe0d3f6e1814589c
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Random, §6.3 Maximum Likelihood (likelihood = pdf with roles reversed; log-likelihood; interior vs boundary maxima; invariance; Bernoulli/Poisson/normal/gamma MLEs; Uniform[0,h]: MLE X_(n), mse 2h²/((n+1)(n+2)), (n+1)X_(n)/n unbiased with var h²/(n(n+2)); Uniform[a,a+1]: MLE not unique), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html"
    - "Siegrist, Random, §6.5 Best Unbiased Estimators (UMVUE; Cramér–Rao bound under the interchange assumption, support not depending on θ; (dλ/dθ)²/(n E[l²]) and the second-derivative form; equality iff h(X) = λ(θ) + u(θ)L1; Bernoulli, Poisson (θ/n), normal (M attains σ²/n), gamma; Uniform[0,a]: assumption fails, theorem does not apply), sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html"
    - "Penn State STAT 415, Lesson 7 §7.1 Properties of MLEs: consistency, equivariance, asymptotic normality 'subject to some regularity conditions'; Ex 7.1 normal MLEs x̄ and divisor-n variance (I(θ) written for the whole sample there), sha256:0c6afc848ae41251fc702348e0e8c603c5725f1f03c20b4731d789a61babbe0b — https://online.stat.psu.edu/stat415/Lesson07.html"
    - "Stanford STATS 200 (Autumn 2016), Lecture 14, Theorem 14.1 and its regularity conditions (common support, interior θ0, differentiable log-likelihood, unique score root); I(θ) per observation = Var[z] = −E[z′], pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf"
    - "Stanford STATS 200 (Autumn 2016), Lecture 15, Theorem 15.4 (Var[T] ≥ 1/(nI(θ)) for unbiased T, 'certain mild regularity assumptions'; Var of the sample score = nI(θ)) and p.15-4 (efficient = attains the bound; MLE asymptotically efficient; MoM expected to have higher MSE than the MLE for large n; biased estimators can beat the bound at special θ), sha256:7e9d32d62f5b6fe7374924822c86b27c81b36ee2b25ea596ca774f7678287247 — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture15.pdf"
    - "Frees et al., Loss Data Analytics (open textbook), §3.5.2 MLE using modified data: a right-censored value contributes S(u), data truncated at d contribute f(x)/S(d), both S(u)/S(d), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Frees et al., Loss Data Analytics, Appendix C §17.2.2 Asymptotic Properties of MLE: consistency, asymptotic normality and efficiency 'under certain regularity conditions'; variance estimated from the observed Fisher information (matrix inverse), sha256:3d597f08f5d5e9a3ec4283da37ed9b7f1a637796e1761aac8f977fe2f34a6211 — https://openacttexts.github.io/Loss-Data-Analytics/CAppC.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Maximum Likelihood Estimation.md
---

![[Media/Figures/Maximum_Likelihood_Estimation.svg|340]]

**Maximum Likelihood Estimation** is a method of [[Parameter Estimation|parameter estimation]] that estimates a parameter $\theta$ by the value $\hat{\theta}$ that maximizes the probability of the observed sample. For independent observations $x_1, \ldots, x_n$ from a distribution with pdf or pmf $f(x \mid \theta)$, the likelihood function is

> $$L(\theta) = \prod_{i=1}^{n} f(x_i \mid \theta)$$

The log-likelihood is

> $$l(\theta) = \ln L(\theta) = \sum_{i=1}^{n} \ln f(x_i \mid \theta)$$

The logarithm is an increasing function, so $L(\theta)$ and $l(\theta)$ have their maximum at the same value $\hat{\theta}$, the maximum likelihood estimate. When the maximum is at a point where $l(\theta)$ is differentiable, $\hat{\theta}$ is the solution of

> $$l'(\hat{\theta}) = 0$$

- $l'(\theta)$ is the score function, the first derivative of the log-likelihood with respect to $\theta$.

> [!example]- Five claim sizes are 2, 3, 5, 4 and 6. Claim sizes are exponential with mean $\theta$. What is the maximum likelihood estimate of $\theta$? {Example}
> - The exponential pdf is $f(x \mid \theta) = \frac{1}{\theta}e^{-x/\theta}$, so $\ln f(x \mid \theta) = -\ln\theta - x/\theta$.
> - The sum of the claim sizes is 20, so $l(\theta) = -5\ln\theta - 20/\theta$.
> - The score function is $l'(\theta) = -5/\theta + 20/\theta^2$.
> - Setting the score function to 0 gives $\hat{\theta} = 20/5 = 4$, the sample mean.

## Maximum at a boundary

The maximum of $L(\theta)$ can be at the edge of the values of $\theta$ that the data allow, where the score function is not 0. For a sample from a [[Uniform Continuous Distribution|uniform distribution]] on $(0, \theta)$, the likelihood is $\theta^{-n}$ when $\theta$ is at least every observation, and 0 otherwise. The likelihood decreases in $\theta$, so the maximum likelihood estimate is the largest observation:

> $$\hat{\theta} = X_{(n)}$$

- $X_{(n)}$ is the largest of the [[Order Statistics|order statistics]] $X_{(1)} \le \cdots \le X_{(n)}$.

> [!example]- Five losses from a uniform distribution on $(0, \theta)$ are 2, 7, 4, 9 and 3. What is the maximum likelihood estimate of $\theta$? {Example}
> - The likelihood is $\theta^{-5}$ for $\theta \ge 9$ and 0 for $\theta < 9$.
> - $\theta^{-5}$ decreases as $\theta$ increases, so the likelihood is largest at the smallest allowed value.
> - The maximum likelihood estimate is $\hat{\theta} = 9$.

## Invariance

If $\hat{\theta}$ is the maximum likelihood estimate of $\theta$, then the maximum likelihood estimate of a function $g(\theta)$ is

> $$\widehat{g(\theta)} = g(\hat{\theta})$$

> [!example]- Claim sizes are exponential with mean $\theta$, and the maximum likelihood estimate of $\theta$ is 4. What is the maximum likelihood estimate of the probability that a claim exceeds 10? {Example}
> - The probability that a claim exceeds 10 is $g(\theta) = e^{-10/\theta}$.
> - Its maximum likelihood estimate is $g(4) = e^{-10/4} = 0.0821$.

## Likelihood for incomplete data

When the data are [[Incomplete Data|incomplete]] because of [[Censoring|censoring]] or [[Truncation|truncation]], each observation contributes to the likelihood the probability of what was observed. With $F(x)$ the cdf and $S(x) = 1 - F(x)$ the survival function, the contributions are:

| Observation | Contribution to $L(\theta)$ |
| --- | --- |
| exact value $x$ | $f(x)$ |
| right-censored at $u$, known only to exceed $u$ | $S(u)$ |
| known only to lie in the interval $(a, b]$ | $F(b) - F(a)$ |
| exact value $x$, left-truncated at $d$ | $f(x)/S(d)$ |
| right-censored at $u$, left-truncated at $d$ | $S(u)/S(d)$ |

> [!example]- Ground-up losses are exponential with mean $\theta$. Only losses above a deductible of 500 are reported, and a loss above 10,000 is recorded as 10,000. The five reported losses are 1,500, 2,500, 4,000, 10,000 and 10,000. What is the maximum likelihood estimate of $\theta$? {Example}
> - Each exact loss contributes $f(x)/S(500) = \frac{1}{\theta}e^{-(x - 500)/\theta}$.
> - Each loss recorded at 10,000 is right-censored and contributes $S(10{,}000)/S(500) = e^{-9{,}500/\theta}$.
> - The exact losses exceed 500 by 1,000, 2,000 and 3,500, and each censored loss is 9,500 above 500, a total of 25,500.
> - The log-likelihood is $l(\theta) = -3\ln\theta - 25{,}500/\theta$.
> - Setting $l'(\theta) = -3/\theta + 25{,}500/\theta^2$ to 0 gives $\hat{\theta} = 25{,}500/3 = 8{,}500$.

## Properties of the maximum likelihood estimator

Under regularity conditions, which include that the support of $f(x \mid \theta)$ does not depend on $\theta$, the maximum likelihood estimator is [[Consistency|consistent]]. For a large sample it is approximately normal with mean $\theta$ and variance $1/[nI(\theta)]$, where $I(\theta)$ is the [[Fisher Information|Fisher information]]. This variance is the [[Cramér-Rao Lower Bound|Cramér-Rao lower bound]], so the estimator is asymptotically efficient. The uniform distribution on $(0, \theta)$ does not meet these conditions, because its support depends on $\theta$.

## Maximum likelihood for a generalized linear model

The coefficients $\beta_0, \ldots, \beta_p$ of a [[Generalized Linear Model|generalized linear model]] are maximum likelihood estimates. The log-likelihood is the sum of $\ln f(y_i)$ under the response distribution, with each mean $\mu_i$ given by $g(\mu_i) = \eta_i$. Statistical software maximizes it numerically.
