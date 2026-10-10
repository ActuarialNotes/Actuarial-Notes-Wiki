---
id: "masi-an-103"
exam: "Exam MAS-I"
topic: "Dispersion Parameter"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Dispersion+Parameter
  - Concepts/Quasi-Likelihood
  - Concepts/Poisson+Regression
  - Concepts/Parameter+Estimate+Tables
  - Concepts/p-Value
answer: "D"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:68e067535ba2c27b3f5fb833d7a9bde2a0e99c3f5d944b23adeb276c46504504
  sources:
    - "Rodriguez, Lecture Notes on Generalized Linear Models (Princeton), Models for Count Data With Overdispersion (rev. 2022), §1 The Over-Dispersed Poisson Model, PDF pp.1-2 (var(Y) = phi mu; quasi-likelihood estimates equal the Poisson ones; var(beta-hat) = phi (X'WX)^-1; phi-hat = Pearson chi-square / (n - p); standard errors multiplied by sqrt(phi-hat)), sha256:956c3ad4849787d3a60c6d0f42b8c7e60d23e80be1da988417f9e9a42c73121e — https://grodri.github.io/glms/notes/c4a.pdf"
    - "R documentation, stats::summary.glm, Details: dispersion taken as 1 for binomial and Poisson, otherwise residual chi-squared statistic / residual df; column labelled t ratio if dispersion is estimated, z ratio if known, two-tailed p-values from Student t or Normal, sha256:c7cf5a73225bd54cad2584cf31b1155884c4d359a14de4048b6e11a7acfe9e2d — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/summary.glm.html"
    - "Larsen, Generalized Linear Models, CAS Study Note (rev. 6/29/2016; MAS-I reading), 'Quasi-Likelihood' PDF p.1 (constant of proportionality between mean and variance solved for with the betas; over-dispersion), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "Roback & Legler, Beyond Multiple Linear Regression, Ch.4 Poisson Regression (bookdown), §4.9 overdispersion: phi-hat = sum of squared Pearson residuals / (n - p); SE_Q = sqrt(phi-hat) SE; t tests; drop-in-deviance F = (drop in deviance / difference in df) / phi-hat, sha256:55079c7b837d6207e55badacb0258e26d6c8f07ee731d11db0878b2d6a4982d4 — https://bookdown.org/roback/bookdown-BeyondMLR/ch-poissonreg.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-103.md
---

A Poisson GLM for claim counts is fitted to 1,200 records and estimates 10 parameters. Its Pearson chi-square statistic is 2,856. For one rating-variable indicator the output shows $\hat\beta = 0.085$ with a standard error of 0.040, computed with the dispersion fixed at 1.

The model is refitted as a quasi-Poisson model, with the dispersion estimated by the Pearson statistic divided by its degrees of freedom.

Calculate the two-sided p-value of the Wald test of $H_0: \beta = 0$ for this indicator after the refit.

- A) Less than 0.01
- B) At least 0.01, but less than 0.05
- C) At least 0.05, but less than 0.10
- D) At least 0.10, but less than 0.25
- E) At least 0.25

## Explanation

Estimate the dispersion from the Pearson statistic on $n - p$ degrees of freedom:

$$
\begin{aligned}
\hat\phi &= \frac{2{,}856}{1{,}200 - 10} \\
&= \frac{2{,}856}{1{,}190} \\
&= 2.40
\end{aligned}
$$

The refit leaves $\hat\beta$ unchanged (the quasi-likelihood estimating equations are the Poisson ones) and multiplies every standard error by $\sqrt{\hat\phi}$:

$$
\begin{aligned}
\text{SE} &= 0.040\sqrt{2.40} \\
&= 0.06197 \\
z &= \frac{0.085}{0.06197} \\
&= 1.372 \\
p &= 2\left[1 - \Phi(1.372)\right] \\
&= 0.170
\end{aligned}
$$

(Using a $t$ distribution with 1,190 degrees of freedom, as R does for a quasi-Poisson fit, gives the same 0.170.) The p-value is in range **D**: after allowing for overdispersion the indicator is no longer significant.

**Why not the others**

- **A** — multiplying the statistic by $\sqrt{\hat\phi}$ instead of dividing, $z = 0.085\sqrt{2.4}/0.040 = 3.29$, gives $p = 0.001$.
- **B** — ignoring the overdispersion, $z = 0.085/0.040 = 2.125$, gives $p = 0.034$: the original, overconfident Poisson result.
- **C** — the one-sided p-value, $p = 1 - \Phi(1.372) = 0.085$, for a test that is two-sided.
- **E** — scaling the standard error by $\hat\phi$ instead of $\sqrt{\hat\phi}$, $z = 0.085/(0.040 \times 2.4) = 0.885$, gives $p = 0.376$; $\hat\phi$ scales the *variance*.
