---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:98dd81f805e47993b4903b7dd34a366f71795a3c9f1fcd44388f37ee6b2843e4
  sources:
    - "Rodriguez, GLM lecture notes (Princeton), App. B, secs.B.1.1 (a_i(phi) = phi/p_i; var = phi b/p_i), B.2 (phi cancels in the IRLS estimate), B.3.1-B.3.2 (scaled deviance, F test with estimated phi) (PDF pp.2-7), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Rodriguez, GLM lecture notes (Princeton), Models for Count Data With Overdispersion, sec.1 (Pearson estimate phihat = chi2_p/(n-p), SEs times sqrt(phihat), beta unchanged) (PDF pp.1-2), sha256:956c3ad4849787d3a60c6d0f42b8c7e60d23e80be1da988417f9e9a42c73121e — https://grodri.github.io/glms/notes/c4a.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf, sec.2.6 (exposure as a weight reduces variance, PDF p.28); sec.2.7.1 (gamma variance), sec.2.7.2 (ODP, overdispersion from unexplained risk variation, PDF p.31), sec.2.7.3 eq.6 (gamma CV = 1/sqrt(alpha), PDF p.33)"
    - "Larsen, 'Generalized Linear Models', CAS Study Note (Dec 2015, rev. June 2016; MAS-I reading), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf, p.1 (quasi-likelihood constant of proportionality between mean and variance)"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Dispersion Parameter.md
---

The **Dispersion Parameter** $\phi$ is the scale factor in an [[Exponential Family]] variance: $\text{Var}(Y) = \phi\,V(\mu)$. It separates *how the variance depends on the mean* (the variance function $V$, fixed by the chosen distribution) from *how large the variance is overall* (the scale, estimated from the data).

> $$\text{Var}(Y_i) = \frac{\phi\,V(\mu_i)}{w_i}$$

> $$\hat\phi = \frac{1}{n-p}\sum_{i=1}^{n}\frac{w_i\,(y_i - \hat\mu_i)^2}{V(\hat\mu_i)} \qquad \text{(Pearson estimate)}$$

- For the **Normal** response $\phi = \sigma^2$; for **Poisson** and **binomial** the theory fixes $\phi = 1$; for **[[Gamma]]** $\phi$ is the squared coefficient of variation
- $\phi$ does **not** affect the fitted coefficients $\hat\beta$ — it scales their standard errors by $\sqrt{\hat\phi}$, and so changes every p-value and [[Confidence Interval]] in [[Parameter Estimate Tables]]
- $\hat\phi > 1$ in a Poisson or binomial model is **overdispersion**: more spread than the distribution permits, usually from unmodelled heterogeneity, correlated observations, or a missing predictor
- Two estimators are in common use — the Pearson $\chi^2$ statistic over degrees of freedom (above) and the residual [[Deviance]] over degrees of freedom. The Pearson version is generally preferred
- The **scaled deviance** $D^* = D/\phi$ is what is compared against $\chi^2$; when $\phi$ has to be estimated, model comparisons use the $F$ statistic $\frac{\Delta D/r}{\hat\phi}$ instead
- Prior weights $w_i$ (e.g. exposure or claim count) divide the variance: a group average built from many observations is more precisely known, which is how grouped data is fitted correctly

![[Media/Figures/Dispersion_Parameter.svg|340]]

> [!example]- Estimating and Applying the Dispersion {Example}
> A Poisson GLM on $500$ observations with $8$ parameters has a Pearson $\chi^2$ of $1{,}230$. Estimate $\phi$ and adjust a coefficient with $\hat\beta = 0.40$ and unscaled $\text{SE} = 0.15$.
>
> > [!answer]-
> > $$\hat\phi = \frac{1{,}230}{500 - 8} = \frac{1{,}230}{492} = 2.50$$
> > $$\text{SE}_{\text{scaled}} = 0.15\sqrt{2.50} = 0.237$$
> > The Wald statistic falls from $0.40/0.15 = 2.67$ (significant) to $0.40/0.237 = 1.69$ (not significant at $5\%$). Ignoring overdispersion would have kept a predictor the data does not support.

> [!example]- Dispersion in a Gamma Severity Model {Example}
> A Gamma GLM for severity returns $\hat\phi = 0.64$. What does that say about the spread of individual claims?
>
> > [!answer]-
> > For a Gamma, $\text{Var}(Y) = \phi\mu^2$, so the coefficient of variation is $\sqrt{\phi} = 0.80$ — the standard deviation of a claim is about $80\%$ of its expected size, whatever the size. It also corresponds to a Gamma shape of $\alpha = 1/\phi = 1.56$, a right-skewed severity distribution, and here $\phi$ is a genuine parameter of the model rather than a symptom of anything wrong.
