---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:34a8f0ce9a0f8f4938cf01d994de6ffd50b7226227b0e10d2a7816749d81a4ea
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

**Maximum Likelihood Estimation (MLE)** is a method of parameter estimation that chooses the parameter value $\hat{\theta}$ that **maximizes the likelihood function** — the joint probability (discrete data) or joint density (continuous data) of the observed sample, read as a function of the parameter.

> $$L(\theta) = \prod_{i=1}^n f(x_i \mid \theta)$$

> $$\hat{\theta}_{\text{MLE}} = \arg\max_\theta L(\theta) = \arg\max_\theta \ell(\theta)$$

> $$\ell(\theta) = \ln L(\theta) = \sum_{i=1}^n \ln f(x_i \mid \theta)$$

- Taking the log turns the product into a sum and simplifies maximization
- When the maximum is at an interior point and the log-likelihood is differentiable, the MLE solves the **score equation** $\ell'(\hat{\theta}) = 0$. The maximum can instead sit on a boundary: for $\text{Uniform}(0, \theta)$, $L(\theta) = \theta^{-n}$ on $\theta \ge \max x_i$ is decreasing, so $\hat{\theta} = \max X_i$, where $\ell'(\hat{\theta}) = -n/\hat{\theta} \ne 0$
- Under regularity conditions — every $f(x \mid \theta)$ has the same support, the true $\theta$ is an interior point, the log-likelihood is differentiable, and the score equation has a unique root — MLEs are **consistent**, **asymptotically normal** with variance $1/[nI(\theta)]$ (see [[Fisher Information]]), and **asymptotically efficient** (achieve the [[Cramér-Rao Lower Bound]] in large samples). $\text{Uniform}(0, \theta)$, whose support depends on $\theta$, is the standard exception
- **Invariance property**: if $\hat{\theta}$ is the MLE of $\theta$, then $g(\hat{\theta})$ is the MLE of $g(\theta)$

**Adjustments for incomplete data:**
- **[[Censoring]]**: observation is known to exceed some value $c$; contribute $P(X > c \mid \theta) = S(c \mid \theta)$ to the likelihood
- **[[Truncation]]**: only observations exceeding a threshold $d$ are recorded; condition on $X > d$, contributing $f(x \mid \theta)/S(d \mid \theta)$

![[Media/Figures/Maximum_Likelihood_Estimation.svg|340]]

> [!example]- MLE for an Exponential Distribution {Example}
> Five claim sizes (in \$$1{,}000$s) are: $2, 3, 5, 4, 6$. Assuming $X_i \sim \text{Exp}(\theta)$, find the MLE of $\theta$.
>
> > [!answer]-
> > For $\text{Exp}(\theta)$: $f(x) = \frac{1}{\theta}e^{-x/\theta}$, so $\ell(\theta) = -n\ln\theta - \frac{1}{\theta}\sum x_i$.
> > Setting $\ell'(\theta) = -\frac{n}{\theta} + \frac{\sum x_i}{\theta^2} = 0$ gives $\hat{\theta} = \bar{x} = \frac{2+3+5+4+6}{5} = 4$ (i.e., \$$4{,}000$).
