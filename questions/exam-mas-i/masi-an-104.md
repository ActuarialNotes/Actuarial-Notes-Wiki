---
id: "masi-an-104"
exam: "Exam MAS-I"
topic: "Dispersion Parameter"
learning_objective: "Extended Linear Models"
difficulty: hard
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Dispersion+Parameter
  - Concepts/Exponential+Family
  - Concepts/Variance+Function
  - Concepts/Binomial+Distribution
  - Concepts/Gamma
  - Concepts/Tweedie+Distribution
answer: "E"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:74e1f566c6efe3e88b9f2e3cd92c2c7a6d75bddc2932bf9b2f5b2db9be5deb9d
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (rank 3 for MAS-I), §2.7.1-2.7.3, PDF pp.29-33 (gamma V(mu)=mu^2; inverse Gaussian V(mu)=mu^3, sharper peak and wider tail; Poisson V(mu)=mu, phi=1, overdispersion and ODP with the same coefficients; Tweedie 1<p<2 a compound Poisson-gamma with mass at zero, for pure premium), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "R documentation, stats::summary.glm, Details: dispersion taken as 1 for binomial and Poisson, otherwise residual chi-squared statistic / residual df; column labelled t ratio if dispersion is estimated, z ratio if known, two-tailed p-values from Student t or Normal, sha256:c7cf5a73225bd54cad2584cf31b1155884c4d359a14de4048b6e11a7acfe9e2d — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/summary.glm.html"
    - "Rodriguez, Lecture Notes on Generalized Linear Models (Princeton), Models for Count Data With Overdispersion (rev. 2022), §1 The Over-Dispersed Poisson Model, PDF pp.1-2 (var(Y) = phi mu; quasi-likelihood estimates equal the Poisson ones; var(beta-hat) = phi (X'WX)^-1; phi-hat = Pearson chi-square / (n - p); standard errors multiplied by sqrt(phi-hat)), sha256:956c3ad4849787d3a60c6d0f42b8c7e60d23e80be1da988417f9e9a42c73121e — https://grodri.github.io/glms/notes/c4a.pdf"
    - "Larsen, Generalized Linear Models, CAS Study Note (rev. 6/29/2016; MAS-I reading), 'Tweedie Distributions' PDF p.2 (Var[Y] = a E(Y)^p; Poisson p=1, compound Poisson-gamma 1<p<2, gamma p=2, inverse Gaussian p=3; zeros plus continuous non-zero values), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-104.md
---

An actuary fits five GLMs and, for each, estimates the dispersion parameter as the Pearson chi-square statistic divided by its degrees of freedom. Every model has about 2,000 residual degrees of freedom. The binomial model's response is, for each agency and year, the number of policies renewed out of the number offered renewal.

For which model does the dispersion estimate indicate that the assumed response distribution does **not** describe the variability in the data?

- A) A Normal GLM with identity link for a loss ratio: $\hat\phi = 0.0225$
- B) A Gamma GLM with log link for claim severity: $\hat\phi = 1.45$
- C) A Poisson GLM with log link for claim counts: $\hat\phi = 1.04$
- D) A Tweedie GLM with log link for pure premium: $\hat\phi = 85$
- E) A binomial GLM with logit link for agency renewal counts: $\hat\phi = 3.1$

## Explanation

What $\phi$ means depends on the family, through $\text{Var}(Y) = \phi\,V(\mu)$:

- For the **Poisson** and **binomial**, the distribution fixes $\phi = 1$; an estimate well above 1 is **overdispersion** — more spread than the distribution permits.
- For the **Normal**, **Gamma** and **Tweedie**, $\phi$ is a free parameter of the distribution, estimated from the data; any positive value is legitimate.

So only **C** and **E** can signal a problem. In **C**, $\hat\phi = 1.04$ is close to 1, as expected when the Poisson holds. In **E**, the renewals in each agency are binomial counts out of many policies, and $\hat\phi = 3.1$ says their variance is about three times what the binomial allows — typically because renewal rates vary among policyholders within an agency in ways the predictors don't capture. The answer is **E**; a quasi-binomial fit (or a richer model) is needed, or the standard errors will be understated by a factor of about $\sqrt{3.1} = 1.76$.

**Why not the others**

- **A** — for a Normal response $\phi = \sigma^2$, so $\hat\phi = 0.0225$ says only that the loss ratio's standard deviation is $\sqrt{0.0225} = 0.15$.
- **B** — for a Gamma, $\phi$ is the squared coefficient of variation; $\hat\phi = 1.45$ means a CV of $\sqrt{1.45} = 1.20$, an ordinary value for severity. Reading "$\phi > 1$" as overdispersion is a Poisson rule applied to the wrong family.
- **C** — with about 2,000 degrees of freedom, the Pearson statistic over its degrees of freedom has a standard deviation of roughly $\sqrt{2/2{,}000} = 0.03$, so 1.04 is within sampling error of the Poisson's $\phi = 1$.
- **D** — the Tweedie's $\phi$ is a scale on the amounts' own units; a large number reflects the size of pure premiums, not a misspecified variance.
