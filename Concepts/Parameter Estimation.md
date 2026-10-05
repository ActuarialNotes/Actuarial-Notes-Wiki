---
verification:
  status: verified
  confidence: low
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:bb63dd1ee9e2a540db028a9d8c77f58a8427894278ecd9d684f82c08915c90bb
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
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Parameter Estimation.md
---

**Parameter Estimation** uses sample data to put values on the unknown parameters of a probability model, such as a claim-size distribution, a regression, or the development pattern behind an [[Unpaid Claim Distribution|unpaid claim distribution]]. A **point estimator** $\hat{\theta}$ is the statistic used to do it, and its value on a particular sample is the estimate.

> $$\hat{\theta} = T(X_1, \ldots, X_n)$$

> $$\mathrm{MSE}(\hat{\theta}) = \mathrm{Var}(\hat{\theta}) + \left[\mathrm{Bias}(\hat{\theta})\right]^2$$

- **Criteria (MAS-I).** An estimator is judged on several properties:
  - **Bias.** $\mathrm{Bias}(\hat{\theta}) = E[\hat{\theta}] - \theta$, and the estimator is [[Unbiasedness|unbiased]] when this is zero.
  - [[Consistency]]: $\hat{\theta}$ converges to $\theta$ as $n$ grows. MSE tending to zero is enough.
  - [[Efficiency]]: an unbiased estimator whose variance reaches the [[Cramér-Rao Lower Bound]] $1/[nI(\theta)]$ is efficient. The unbiased estimator with the smallest variance of all is the [[Minimum Variance|minimum variance]] unbiased estimator (MVUE).
  - [[Sufficiency]]: the estimator uses a [[Sufficient Statistic]] that carries all the sample's information about $\theta$.
  - [[Mean Square Error]] combines bias and variance, so a slightly biased estimator can beat an unbiased one.
- **Methods.** The [[Method of Moments]] equates sample moments to theoretical ones; it is quick but not always efficient. [[Maximum Likelihood Estimation]] maximizes $\ell(\theta)$; it is consistent, asymptotically normal and efficient, and invariant under transformation. MLE handles [[Incomplete Data|incomplete data]] directly: a [[Censoring|censored]] value contributes $S(u)$, and a loss [[Truncation|truncated]] at a deductible $d$ contributes $f(x)/S(d)$.
- **The normal sample.** For a [[Normal Distribution|normal]] sample, $\bar{X}$ is the MLE of $\mu$. It is unbiased and sufficient, and it attains the Cramér-Rao bound. The MLE of $\sigma^2$ divides by $n$ and is biased low, while the [[Sample Variance|sample variance]] $S^2$ divides by $n-1$ and is unbiased.
- **Unpaid claim distributions (Exam 7).** Reserve variability runs on the same ideas:
  - Mack estimates volume-weighted factors $\hat{f}_k = \sum_i C_{i,k+1} / \sum_i C_{i,k}$, and variance parameters $\hat{\alpha}_k^2$ from the spread of individual link ratios around $\hat{f}_k$.
  - Clark fits a growth curve and an ELR (or one ultimate per year) by MLE, assuming over-dispersed Poisson increments.
  - The ODP bootstrap takes its scale parameter from Pearson residuals.

  Error in these estimates is [[Parameter Risk|parameter risk]], one part of [[Prediction Error|prediction error]].

> [!example]- Two Estimators of a Loss Ceiling {Example}
> Five claims (in \$000s) of $2, 7, 4, 9, 3$ are assumed uniform on $(0, \theta)$. Estimate $\theta$ by the method of moments and by MLE, and compare the two estimators' MSE.
>
> > [!answer]-
> > **Method of moments:** $E[X] = \theta/2$, so $\tilde{\theta} = 2\bar{x} = 2(5) = 10$. It is unbiased, so its MSE is its variance:
> >
> > $$
> > \begin{align*}
> > \mathrm{MSE}(\tilde{\theta}) &= \frac{4}{n} \cdot \frac{\theta^2}{12} \\
> > &= \frac{\theta^2}{15}
> > \end{align*}
> > $$
> >
> > **MLE:** $L(\theta) = \theta^{-5}$ for $\theta \geq \max x_i$, which is largest at $\hat{\theta} = X_{(5)} = 9$. Since $E[X_{(n)}] = n\theta/(n+1)$, the bias is $-\theta/6$:
> >
> > $$
> > \begin{align*}
> > \mathrm{MSE}(\hat{\theta}) &= \frac{n\theta^2}{(n+1)^2(n+2)} + \frac{\theta^2}{36} \\
> > &= \frac{5\theta^2}{252} + \frac{7\theta^2}{252} \\
> > &= \frac{\theta^2}{21}
> > \end{align*}
> > $$
> >
> > The **biased MLE has the lower MSE** ($\theta^2/21 < \theta^2/15$), and the method of moments can even return a ceiling below the largest claim. Rescaling to $\tfrac{6}{5}X_{(5)} = 10.8$, a function of the sufficient statistic $X_{(n)}$, removes the bias and cuts the MSE to $\theta^2/35$.

> [!example]- MLE with a Deductible and a Policy Limit {Example}
> Ground-up losses are exponential with mean $\theta$. Only losses above a $\$500$ deductible are reported, and losses are capped at $\$10{,}000$. The five reported losses are $\$1{,}500$, $\$2{,}500$, $\$4{,}000$, and two recorded at the $\$10{,}000$ cap. Find $\hat{\theta}$.
>
> > [!answer]-
> > Truncation at $d = 500$ turns each term into an excess over $d$. Exponential losses are memoryless, so $f(x)/S(d) = \theta^{-1}e^{-(x-500)/\theta}$. Each capped loss contributes $S(10{,}000)/S(500) = e^{-9{,}500/\theta}$:
> >
> > $$
> > \begin{align*}
> > \ell(\theta) &= -3\ln\theta - \frac{1{,}000 + 2{,}000 + 3{,}500 + 2(9{,}500)}{\theta} \\
> > &= -3\ln\theta - \frac{25{,}500}{\theta}
> > \end{align*}
> > $$
> >
> > Setting $\ell'(\theta) = -3/\theta + 25{,}500/\theta^2 = 0$ gives $\hat{\theta} = 25{,}500/3 = 8{,}500$. Only the **uncensored** losses count in the divisor; treating the capped losses as exact would give $5{,}100$, understating the mean.

> [!example]- Clark's Cape Cod ELR by Maximum Likelihood {Example}
> Premiums for accident years 1 to 3 are $1{,}000$, $1{,}100$ and $1{,}200$. A fitted growth curve gives $G(12) = 0.40$, $G(24) = 0.70$ and $G(36) = 0.85$. Incremental paid losses are $260, 190, 90$ (AY1), $300, 200$ (AY2) and $325$ (AY3). Holding the curve fixed, find the MLE of the ELR, the scale parameter $\sigma^2$ (with $p = 3$ parameters: ELR, $\omega$, $\theta$), and the reserve.
>
> > [!answer]-
> > Under the over-dispersed Poisson likelihood, the ELR estimate sets total fitted losses equal to total actual losses:
> >
> > $$
> > \begin{align*}
> > \widehat{\text{ELR}} &= \frac{540 + 500 + 325}{1{,}000(0.85) + 1{,}100(0.70) + 1{,}200(0.40)} \\
> > &= \frac{1{,}365}{2{,}100} \\
> > &= 0.65
> > \end{align*}
> > $$
> >
> > Each fitted increment is $\mu = P \cdot \text{ELR} \cdot \Delta G$. That gives $260, 195, 97.5$; $286, 214.5$; and $312$. The terms $(c-\mu)^2/\mu$ are $0$, $0.128$, $0.577$, $0.685$, $0.980$ and $0.542$, which sum to $2.912$. So
> >
> > $$
> > \begin{align*}
> > \sigma^2 &= \frac{2.912}{6 - 3} \\
> > &= 0.971
> > \end{align*}
> > $$
> >
> > The reserve is $\sum P \cdot \text{ELR}\,(1 - G) = 97.5 + 214.5 + 468 = 780$. Its process standard deviation is $\sqrt{0.971 \times 780} = 27.5$, or $3.5\%$ of the reserve. Parameter variance from the information matrix comes on top of that.
