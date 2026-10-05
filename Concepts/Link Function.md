---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:706cce7fbd7603a6e8a66e4eb79af9d3129356ab1ea9c3fbe8ecf508927444ad
  sources:
    - "Rodriguez, GLM lecture notes (Princeton), App. B, sec.B.1.2 The Link Function (PDF pp.3-4), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Larsen, 'Generalized Linear Models', CAS Study Note (Dec 2015, rev. June 2016; MAS-I reading), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf, pp.2-3 (canonical link section and table: identity, logit, natural log, inverse)"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, secs.4.6.2-4.6.3 (log link for Poisson regression, nonnegative fitted values, link functions eta(mu) = mu, logit, log; printed pp.167-172, PDF pp.177-182)"
    - "Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018; MAS-I reading) — publisher eBook preview, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf, sec.1.2 Scope (probit and logistic dose-response models, printed p.5, PDF p.22)"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf, sec.2.1.3 fn.1 (log link almost always used for a multiplicative rating plan, PDF p.16)"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Link Function.md
---

A **Link Function** $g$ is a monotone, differentiable function in a [[Generalized Linear Model]] that connects the **expected value** of the response $\mu = E[Y]$ to the **linear predictor** $\eta = \mathbf{x}^\top\boldsymbol{\beta}$:

> $$g(\mu) = \eta$$

> $$= \beta_0 + \beta_1 x_1 + \cdots + \beta_p x_p$$

> $$\mu = g^{-1}(\eta)$$

- The **canonical link** is the natural link arising from the exponential family form of the distribution; it often leads to simpler inference
- The choice of link function ensures that fitted means $\hat{\mu}$ respect the support of $Y$ (e.g., positivity for counts and severities)

**Common link functions:**

| Name | $g(\mu)$ | $g^{-1}(\eta)$ | Typical Use |
| :--- | :--- | :--- | :--- |
| Identity | $\mu$ | $\eta$ | Normal regression |
| Log | $\ln\mu$ | $e^\eta$ | Poisson (counts), Gamma (severity) |
| Logit | $\ln\!\frac{\mu}{1-\mu}$ | $\frac{e^\eta}{1+e^\eta}$ | Binomial (binary outcomes) |
| Reciprocal | $1/\mu$ | $1/\eta$ | Gamma (inverse) |
| Probit | $\Phi^{-1}(\mu)$ | $\Phi(\eta)$ | Binary outcomes |

- The **log link** is standard for insurance severity and frequency models because it guarantees positive fitted values and allows multiplicative interpretation: a unit increase in $x_j$ multiplies $\mu$ by $e^{\beta_j}$

![[Media/Figures/Link_Function.svg|340]]

> [!example]- Interpreting a Log-Link Coefficient {Example}
> A Gamma GLM with log link models claim severity. The coefficient on the indicator for "sports car" is $\hat{\beta} = 0.35$. Interpret this coefficient.
>
> > [!answer]-
> > With a log link, $\ln(\mu_{\text{sports}}) - \ln(\mu_{\text{non-sports}}) = 0.35$, so $\mu_{\text{sports}}/\mu_{\text{non-sports}} = e^{0.35} \approx 1.42$.
> > Sports cars are associated with expected claim severity that is approximately **42% higher** than non-sports cars, holding all else equal.
