---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:fa680bf0a983bebb01f13deecd29c3f7a60fd21a957499bf859d82fa5ff74ad9
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Random, §6.1 Estimators (bias, mse = var + bias², mean-square consistency ⇒ consistency, E(M) = μ, var(M) = σ²/n), sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
    - "Siegrist, Random, §6.2 Method of Moments (matching sample and distribution moments; mean/variance matching; T² bias −σ²/n and 'no simple, general relationship between mse(T²) and mse(S²)', T² smaller MSE for normal samples; negative binomial U = M²/(T² − M); uniform MoM 2M), sha256:43755b5bee6179fca8d7c1c964e7c6a9bb1a9de6f3916130100c69e666a3194e — https://www.randomservices.org/random/point/Moments.html"
    - "Siegrist, Random, §6.3 Maximum Likelihood (likelihood = pdf with roles reversed; log-likelihood; interior vs boundary maxima; invariance; Bernoulli/Poisson/normal/gamma MLEs; Uniform[0,h]: MLE X_(n), mse 2h²/((n+1)(n+2)), (n+1)X_(n)/n unbiased with var h²/(n(n+2)); Uniform[a,a+1]: MLE not unique), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html"
    - "Siegrist, Random, §6.5 Best Unbiased Estimators (UMVUE; Cramér–Rao bound under the interchange assumption, support not depending on θ; (dλ/dθ)²/(n E[l²]) and the second-derivative form; equality iff h(X) = λ(θ) + u(θ)L1; Bernoulli, Poisson (θ/n), normal (M attains σ²/n), gamma; Uniform[0,a]: assumption fails, theorem does not apply), sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html"
    - "Siegrist, Random, §6.6 Sufficient, Complete and Ancillary Statistics (definition via the conditional distribution; Fisher–Neyman factorization; MLE vs sufficient statistic; Rao–Blackwell; Lehmann–Scheffé; Bernoulli, Poisson (UMVUE ((n−1)/n)^Y of e^{−θ}), normal, gamma, uniform; exponential family natural statistic minimally sufficient and complete), sha256:4d7402f2a960ea2b4232e57e4ee5992ac29801b9269f300f17f8e83074d5a0e4 — https://www.randomservices.org/random/point/Sufficient.html"
    - "Stanford STATS 200 (Autumn 2016), Lecture 14, Theorem 14.1 and its regularity conditions (common support, interior θ0, differentiable log-likelihood, unique score root); I(θ) per observation = Var[z] = −E[z′], pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf"
    - "Stanford STATS 200 (Autumn 2016), Lecture 15, Theorem 15.4 (Var[T] ≥ 1/(nI(θ)) for unbiased T, 'certain mild regularity assumptions'; Var of the sample score = nI(θ)) and p.15-4 (efficient = attains the bound; MLE asymptotically efficient; MoM expected to have higher MSE than the MLE for large n; biased estimators can beat the bound at special θ), sha256:7e9d32d62f5b6fe7374924822c86b27c81b36ee2b25ea596ca774f7678287247 — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture15.pdf"
    - "Penn State STAT 415, Lesson 7 §7.1 Properties of MLEs: consistency, equivariance, asymptotic normality 'subject to some regularity conditions'; Ex 7.1 normal MLEs x̄ and divisor-n variance (I(θ) written for the whole sample there), sha256:0c6afc848ae41251fc702348e0e8c603c5725f1f03c20b4731d789a61babbe0b — https://online.stat.psu.edu/stat415/Lesson07.html"
    - "Frees et al., Loss Data Analytics (open textbook), §3.5.2 MLE using modified data: a right-censored value contributes S(u), data truncated at d contribute f(x)/S(d), both S(u)/S(d), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Frees et al., Loss Data Analytics, §4.1.3 Starting Values: MLE preferred as it uses data more efficiently; MoM and percentile matching supply starting values for the iterative MLE, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "Mack, 'Measuring the Variability of Chain Ladder Reserve Estimates' (CAS, 1994; Exam 7 reading): eq. (2) f̂_k = Σ_j C_{j,k+1}/Σ_j C_{jk} (PDF p.6); eq. (8) α̂_k² = (1/(I−k−1)) Σ_j C_jk (C_{j,k+1}/C_jk − f̂_k)² (p.116, PDF p.16), sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/2021-03/7_Mack_1994.pdf"
    - "Clark, 'LDF Curve-Fitting and Stochastic Reserving: A Maximum Likelihood Approach' (CAS Forum 2003; Exam 7 reading): ODP increments and σ² = (1/(n−p)) Σ (c − μ)²/μ (p.49, PDF p.9); Cape Cod needs 3 parameters (ELR, ω, θ); ELR MLE = Σc / Σ P·[G(x_t) − G(x_{t−1})] (p.52, PDF p.12); process variance of R = σ²·Σμ, parameter variance from the covariance matrix (p.54, PDF p.14); Cape Cod reserve R = Σ Premium·ELR·(G(y) − G(x)) (p.55, PDF p.15), sha256:1db0baa8ca6aef6711e6483601de5be6e180f016b1110a7fb0e49765c0953b9e — https://www.casact.org/sites/default/files/2021-03/7_Clark.pdf"
    - "Shapland, Using the ODP Bootstrap Model: A Practitioner's Guide (CAS Monograph 4, 2016; Exam 7 reading), §3.2: unscaled Pearson residuals (3.16) and the scale parameter φ = Σr²/(N − p) (3.17), 'calculated consistently with the scale parameter' (printed pp.11–12, PDF p.19), sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Parameter Estimation.md
---

**Parameter Estimation** is the use of a [[Random Sample|random sample]] $X_1, \ldots, X_n$ to assign a value to an unknown parameter $\theta$ of a probability distribution. An [[Estimator|estimator]] $\hat{\theta}$ of $\theta$ is a function of the sample, and its value for an observed sample is an estimate of $\theta$.

The [[Bias|bias]] of an estimator $\hat{\theta}$ is

> $$\text{Bias}(\hat{\theta}) = E[\hat{\theta}] - \theta$$

- $E[\hat{\theta}]$ is the expected value of the estimator over repeated samples.

An estimator is [[Unbiasedness|unbiased]] when its bias is 0 for every value of $\theta$.

> [!example]- A random sample of $n$ losses is drawn from a uniform distribution on $(0, \theta)$. What are the biases of $2\bar{X}$ and of the largest observation $X_{(n)}$ as estimators of $\theta$? {Example}
> - The mean of a uniform distribution on $(0, \theta)$ is $\theta/2$, so $E[\bar{X}] = \theta/2$.
> - $E[2\bar{X}] = \theta$, so $2\bar{X}$ is unbiased.
> - The largest of $n$ uniform observations has $E[X_{(n)}] = \frac{n}{n+1}\theta$.
> - The bias of $X_{(n)}$ is $\frac{n}{n+1}\theta - \theta = -\frac{\theta}{n+1}$, so $X_{(n)}$ underestimates $\theta$ on average.

## Mean square error

The [[Mean Square Error|mean square error]] of an estimator $\hat{\theta}$ is

> $$\text{MSE}(\hat{\theta}) = E\left[(\hat{\theta} - \theta)^2\right]$$

It equals the variance of the estimator plus the square of its bias:

> $$\text{MSE}(\hat{\theta}) = \text{Var}(\hat{\theta}) + \left[\text{Bias}(\hat{\theta})\right]^2$$

For an unbiased estimator, the mean square error is the variance. A biased estimator can have a smaller mean square error than an unbiased one.

> [!example]- A random sample of 5 losses is drawn from a uniform distribution on $(0, \theta)$. Which of $2\bar{X}$ and $X_{(5)}$ has the smaller mean square error? {Example}
> - A uniform distribution on $(0, \theta)$ has variance $\theta^2/12$, so $\text{Var}(2\bar{X}) = 4 \cdot \frac{\theta^2}{12 \times 5} = \frac{\theta^2}{15}$.
> - $2\bar{X}$ is unbiased, so $\text{MSE}(2\bar{X}) = \theta^2/15$.
> - The variance of the largest of $n$ uniform observations is $\frac{n\theta^2}{(n+1)^2(n+2)}$, which is $\frac{5\theta^2}{252}$ for $n = 5$.
> - The bias of $X_{(5)}$ is $-\theta/6$, so its squared bias is $\frac{\theta^2}{36} = \frac{7\theta^2}{252}$.
> - $\text{MSE}(X_{(5)}) = \frac{12\theta^2}{252} = \frac{\theta^2}{21}$.
> - The biased estimator $X_{(5)}$ has the smaller mean square error, because $\theta^2/21 < \theta^2/15$.

## Properties of an estimator

An estimator $\hat{\theta}$ of $\theta$ is judged by these properties:

1. **[[Unbiasedness]]**: its expected value is $\theta$.
2. **[[Consistency]]**: it converges in probability to $\theta$ as the sample size $n$ grows.
3. **[[Efficiency]]**: it is unbiased and its variance equals the [[Cramér-Rao Lower Bound|Cramér-Rao lower bound]].
4. **[[Minimum Variance]]**: it has the smallest variance of all unbiased estimators of $\theta$.
5. **[[Sufficiency]]**: it is a function of a [[Sufficient Statistic|sufficient statistic]], which carries all the information in the sample about $\theta$.

An estimator whose mean square error tends to 0 as $n$ grows is consistent.

## Methods of estimation

The syllabus uses three methods to find an estimator:

1. The **[[Method of Moments|method of moments]]** sets moments of the distribution equal to moments of the sample.
2. **[[Percentile Matching|Percentile matching]]** sets percentiles of the distribution equal to percentiles of the sample.
3. **[[Maximum Likelihood Estimation|Maximum likelihood estimation]]** chooses the value of $\theta$ that maximizes the probability of the observed sample.

When the data are [[Incomplete Data|incomplete]], because of a [[Deductible|deductible]] or a [[Policy Limit|policy limit]], the likelihood is built from the probability of what was actually observed.

## Parameters of an unpaid claim distribution

On Exam 7, the parameters of an [[Unpaid Claim Distribution|unpaid claim distribution]] are estimated from a loss triangle. In the [[Mack Chain Ladder Model|Mack model]], the estimate of the age-to-age factor from age $k$ to age $k+1$ is the volume-weighted average of the individual link ratios:

> $$\hat{f}_k = \frac{\sum_j C_{j,k+1}}{\sum_j C_{j,k}}$$

- $C_{j,k}$ is the cumulative loss of accident year $j$ at age $k$.
- Both sums run over the accident years that have losses at both ages $k$ and $k+1$.

> [!example]- Accident year 1 has cumulative losses of 100 at age 1 and 150 at age 2. Accident year 2 has 120 at age 1 and 174 at age 2. Accident year 3 has 110 at age 1. What is Mack's estimate of the age-to-age factor from age 1 to age 2? {Example}
> - Only accident years 1 and 2 have losses at both ages.
> - The sum of their losses at age 2 is $150 + 174 = 324$.
> - The sum of their losses at age 1 is $100 + 120 = 220$.
> - The estimate is $\hat{f}_1 = 324/220 = 1.4727$.

In Clark's version of the [[Cape Cod Method|Cape Cod method]], the expected ultimate loss of accident year $j$ is its premium $P_j$ multiplied by the expected loss ratio (ELR), and the expected loss to age $x$ is that amount multiplied by the growth curve $G(x)$. With the growth curve held fixed, the maximum likelihood estimate of the ELR is

> $$\widehat{\text{ELR}} = \frac{\sum_j C_j}{\sum_j P_j\, G(x_j)}$$

- $C_j$ is the cumulative loss of accident year $j$ to date.
- $x_j$ is the age of accident year $j$.

> [!example]- Premiums for accident years 1 to 3 are 1,000, 1,100 and 1,200. The growth curve gives $G(x_1) = 0.85$, $G(x_2) = 0.70$ and $G(x_3) = 0.40$. Cumulative losses to date are 540, 500 and 325. What is the maximum likelihood estimate of the ELR? {Example}
> - The sum of the losses to date is $540 + 500 + 325 = 1{,}365$.
> - The premiums multiplied by the growth curve are $850$, $770$ and $480$, and their sum is $2{,}100$.
> - The estimate is $\widehat{\text{ELR}} = 1{,}365/2{,}100 = 0.65$.
