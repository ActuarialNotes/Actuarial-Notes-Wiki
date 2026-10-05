---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:e48e71b40322f731cdb220fb81e36ad35f3c2d8711554fe6b1498e7d8ac239cf
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Random, §6.5 Best Unbiased Estimators (UMVUE; Cramér–Rao bound under the interchange assumption, support not depending on θ; (dλ/dθ)²/(n E[l²]) and the second-derivative form; equality iff h(X) = λ(θ) + u(θ)L1; Bernoulli, Poisson (θ/n), normal (M attains σ²/n), gamma; Uniform[0,a]: assumption fails, theorem does not apply), sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html"
    - "Stanford STATS 200 (Autumn 2016), Lecture 14, Theorem 14.1 and its regularity conditions (common support, interior θ0, differentiable log-likelihood, unique score root); I(θ) per observation = Var[z] = −E[z′], pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf"
    - "Stanford STATS 200 (Autumn 2016), Lecture 15, Theorem 15.4 (Var[T] ≥ 1/(nI(θ)) for unbiased T, 'certain mild regularity assumptions'; Var of the sample score = nI(θ)) and p.15-4 (efficient = attains the bound; MLE asymptotically efficient; MoM expected to have higher MSE than the MLE for large n; biased estimators can beat the bound at special θ), sha256:7e9d32d62f5b6fe7374924822c86b27c81b36ee2b25ea596ca774f7678287247 — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture15.pdf"
    - "Frees et al., Loss Data Analytics, Appendix C §17.2.2 Asymptotic Properties of MLE: consistency, asymptotic normality and efficiency 'under certain regularity conditions'; variance estimated from the observed Fisher information (matrix inverse), sha256:3d597f08f5d5e9a3ec4283da37ed9b7f1a637796e1761aac8f977fe2f34a6211 — https://openacttexts.github.io/Loss-Data-Analytics/CAppC.html"
    - "Wikipedia, 'Efficiency (statistics)' (fetched 2026-10-05): e(T) = (1/I(θ))/var(T) for an unbiased estimator T, I the sample Fisher information; an efficient estimator is the MVUE, sha256:f3baa00ac8a8d31a872a6f9d3a44610eca510d677fd167845ebf24948621e97f — https://en.wikipedia.org/wiki/Efficiency_(statistics)"
    - "Penn State STAT 415, Lesson 7 §7.1 Properties of MLEs: consistency, equivariance, asymptotic normality 'subject to some regularity conditions'; Ex 7.1 normal MLEs x̄ and divisor-n variance (I(θ) written for the whole sample there), sha256:0c6afc848ae41251fc702348e0e8c603c5725f1f03c20b4731d789a61babbe0b — https://online.stat.psu.edu/stat415/Lesson07.html"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Fisher Information.md
---

**Fisher Information** $I(\theta)$ measures how sharply the likelihood identifies a parameter — the expected curvature of the log-likelihood at $\theta$. It sets the **Cramér–Rao lower bound**, the smallest variance any [[Unbiasedness|unbiased]] estimator can achieve, and so defines what [[Efficiency|efficient]] means.

> $$I(\theta) = E\!\left[\left(\frac{\partial}{\partial\theta}\ln f(X\mid\theta)\right)^{2}\right] = -E\!\left[\frac{\partial^{2}}{\partial\theta^{2}}\ln f(X\mid\theta)\right]$$

> $$\text{Var}(\hat\theta) \ \ge\ \frac{1}{n\,I(\theta)} \qquad \text{(Cramér–Rao)}$$

- Information is **additive** over independent observations: a sample of $n$ carries $I_n(\theta) = n\,I(\theta)$, so the bound falls like $1/n$
- The two expressions above agree under the usual regularity conditions (the support does not depend on $\theta$) — which is why the bound does *not* apply to the $\text{Uniform}(0,\theta)$ problem
- An estimator attaining the bound is called **efficient**; the ratio $\frac{1/(nI(\theta))}{\text{Var}(\hat\theta)}$ is its efficiency
- The [[Maximum Likelihood Estimation|MLE]] is asymptotically Normal and asymptotically efficient:
  $$\hat\theta_{\text{MLE}} \ \dot\sim\ N\!\left(\theta,\ \frac{1}{n I(\theta)}\right)$$
  which is where MLE standard errors — and the ones printed in [[Parameter Estimate Tables]] — come from
- In practice the **observed information** $-\ell''(\hat\theta)$ evaluated at the estimate replaces the expectation; inverting it gives the covariance matrix in the multiparameter case
- Large $I(\theta)$ means a sharply peaked likelihood and a well-determined parameter; a flat likelihood carries little information and produces wide standard errors

![[Media/Figures/Fisher_Information.svg|340]]

> [!example]- Information for a Poisson Rate {Example}
> Claim counts are $X_1, \ldots, X_n \stackrel{\text{iid}}{\sim} \text{Poi}(\lambda)$. Find $I(\lambda)$ and the Cramér–Rao bound, and check whether $\bar{X}$ attains it.
>
> > [!answer]-
> > $$\ln f(x \mid \lambda) = -\lambda + x\ln\lambda - \ln x!$$
> > $$\frac{\partial^2}{\partial\lambda^2}\ln f = -\frac{x}{\lambda^2} \ \Longrightarrow\ I(\lambda) = -E\!\left[-\frac{X}{\lambda^2}\right] = \frac{\lambda}{\lambda^2} = \frac{1}{\lambda}$$
> > The bound is $\dfrac{1}{n I(\lambda)} = \dfrac{\lambda}{n}$. Since $\text{Var}(\bar{X}) = \lambda/n$, the [[Sample Mean]] attains the bound — it is the efficient estimator of $\lambda$.

> [!example]- Standard Error of an MLE {Example}
> A sample of $n = 200$ exponential claim sizes has MLE $\hat\theta = \bar{x} = 1{,}500$, and for the exponential $I(\theta) = 1/\theta^2$. Give an approximate $95\%$ [[Confidence Interval]] for $\theta$.
>
> > [!answer]-
> > $$\text{Var}(\hat\theta) \approx \frac{1}{n I(\theta)} = \frac{\theta^2}{n} \ \Longrightarrow\ \text{SE}(\hat\theta) \approx \frac{1{,}500}{\sqrt{200}} = 106.1$$
> > $$1{,}500 \pm 1.96(106.1) = (1{,}292,\ 1{,}708)$$
