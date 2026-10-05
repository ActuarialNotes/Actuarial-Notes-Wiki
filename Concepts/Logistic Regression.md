---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:28f2c93de1e7f92db95c4076b0f5ea8df653f3be840f206e8d07a23df0d69434
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, sec.4.2 (OLS fitted values outside [0,1], printed p.132, PDF p.142); sec.4.3 eqs 4.2-4.4 (logit, odds, e^beta1, printed pp.134-135, PDF pp.144-145); sec.4.3.5 (printed p.140, PDF p.150); sec.4.4 (separation instability, printed p.141, PDF p.151)"
    - "Rodriguez, GLM lecture notes (Princeton), App. B, secs.B.2, B.3.1, B.4.1 (binomial in exponential form, logit canonical, phi = 1, Fisher information) (PDF pp.4-9), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Rodriguez, GLM lecture notes (Princeton), ch.3 Logit Models for Binary Data, pseudo-R2 and classification-table passage (PDF p.50), sha256:2243f2c49c0e15545740a0b4fb8d98ad8a5b3e37653c13feee545195801efedc — https://grodri.github.io/glms/notes/c3.pdf"
    - "Rodriguez, GLM lecture notes (Princeton), ch.6 Multinomial Response Models, sec.6.2 (PDF pp.3-5), sha256:f559d07ae73bdf381de5c19a9f0621419c635e5c6495c0135af940ae36807cbb — https://grodri.github.io/glms/notes/c6.pdf"
    - "Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018; MAS-I reading) — publisher eBook preview, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf, sec.1.2 Scope (printed p.5, PDF p.22) and printed contents Ch.7-8 (PDF pp.11-12)"
    - "Larsen, 'Generalized Linear Models', CAS Study Note (Dec 2015, rev. June 2016; MAS-I reading), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf, pp.1, 3"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf, sec.2.1 target variables (renewal, fraud; PDF p.12)"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Logistic Regression.md
---

**Logistic Regression** is the [[Generalized Linear Model]] for a binary response: the outcome is modelled as binomial and the **logit** [[Link Function]] maps the probability $\pi \in (0,1)$ onto the whole real line, so the linear predictor can take any value and the fitted probability always stays between $0$ and $1$.

> $$\ln\!\left(\frac{\pi}{1-\pi}\right) = \beta_0 + \beta_1 x_1 + \cdots + \beta_p x_p$$

> $$\pi = \frac{e^{\eta}}{1 + e^{\eta}} = \frac{1}{1 + e^{-\eta}}$$

- $\pi/(1-\pi)$ is the **odds**; the model is linear in the log-odds, so $e^{\beta_j}$ is the **odds ratio** for a one-unit increase in $x_j$ — the coefficient's natural interpretation
- The logit is the canonical link for the binomial, and the [[Dispersion Parameter]] is fixed at $\phi = 1$; a residual [[Deviance]] far above its degrees of freedom signals overdispersion or a missing term rather than a scale to estimate
- Coefficients are fitted by [[Maximum Likelihood Estimation]] (there is no closed form), and their standard errors come from the [[Fisher Information]]
- Fit is judged by deviance, [[AIC]], and classification measures (confusion matrix, ROC/AUC) rather than [[R-Squared]]; **pseudo-$R^2$** measures exist but are not comparable to the linear-model version
- Actuarial uses: policyholder retention and conversion, fraud referral, whether a claim exceeds a large-loss threshold, and any yes/no underwriting decision
- **Complete separation** — a predictor that perfectly splits the outcomes — sends a coefficient to infinity and produces enormous standard errors; it is a data problem, not a computing one

![[Media/Figures/Logistic_Regression.svg|340]]

> [!example]- From Coefficients to a Predicted Probability {Example}
> A retention model gives $\hat\eta = 1.20 - 0.030\,(\text{rate increase }\%)$. Find the predicted renewal probability for a $10\%$ increase, and the odds ratio per extra percentage point.
>
> > [!answer]-
> > $$\hat\eta = 1.20 - 0.030(10) = 0.90$$
> > $$\hat\pi = \frac{1}{1 + e^{-0.90}} = \frac{1}{1 + 0.4066} = 0.711$$
> > Each additional percentage point of rate increase multiplies the odds of renewal by $e^{-0.030} = 0.970$ — a $3.0\%$ reduction in the odds per point.

> [!example]- Why Not Ordinary Regression? {Example}
> An analyst fits OLS to a $0/1$ lapse indicator and obtains fitted values ranging from $-0.08$ to $1.06$. Name two assumptions that fail.
>
> > [!answer]-
> > First, the **fitted values are not probabilities** — the identity link is unbounded, so predictions leave $[0,1]$. Second, a Bernoulli response has variance $\pi(1-\pi)$, which depends on the mean, so the **constant-variance** assumption of [[Linear Regression]] fails; the errors are not Normal either, being two-valued. The logit link and the binomial variance function fix both.
