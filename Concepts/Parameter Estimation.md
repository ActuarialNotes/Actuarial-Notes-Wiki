---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bb63dd1ee9e2a540db028a9d8c77f58a8427894278ecd9d684f82c08915c90bb
  sources: []
  open_findings: 0
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
