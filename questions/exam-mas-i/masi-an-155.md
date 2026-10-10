---
id: "masi-an-155"
exam: "Exam MAS-I"
topic: "Quasi-Likelihood"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Quasi-Likelihood
  - Concepts/Poisson+Regression
  - Concepts/Dispersion+Parameter
  - Concepts/Parameter+Estimate+Tables
answer: "E"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:b03a008fe55b4eb21a48bceea3429e3c68a959b86559545cf73d073b991e10f0
  sources:
    - "Rodriguez, Lecture Notes on Generalized Linear Models (Princeton), Models for Count Data With Overdispersion (rev. 2022), §1 The Over-Dispersed Poisson Model, PDF pp.1-2 (var(Y) = phi mu; quasi-likelihood estimates equal the Poisson ones; var(beta-hat) = phi (X'WX)^-1; phi-hat = Pearson chi-square / (n - p); standard errors multiplied by sqrt(phi-hat)), sha256:956c3ad4849787d3a60c6d0f42b8c7e60d23e80be1da988417f9e9a42c73121e — https://grodri.github.io/glms/notes/c4a.pdf"
    - "Roback & Legler, Beyond Multiple Linear Regression, Ch.4 Poisson Regression (bookdown), §4.9 overdispersion: phi-hat = sum of squared Pearson residuals / (n - p); SE_Q = sqrt(phi-hat) SE; t tests; drop-in-deviance F = (drop in deviance / difference in df) / phi-hat, sha256:55079c7b837d6207e55badacb0258e26d6c8f07ee731d11db0878b2d6a4982d4 — https://bookdown.org/roback/bookdown-BeyondMLR/ch-poissonreg.html"
    - "R documentation, stats::summary.glm, Details: dispersion taken as 1 for binomial and Poisson, otherwise residual chi-squared statistic / residual df; column labelled t ratio if dispersion is estimated, z ratio if known, two-tailed p-values from Student t or Normal, sha256:c7cf5a73225bd54cad2584cf31b1155884c4d359a14de4048b6e11a7acfe9e2d — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/summary.glm.html"
    - "Larsen, Generalized Linear Models, CAS Study Note (rev. 6/29/2016; MAS-I reading), 'Quasi-Likelihood' PDF p.1 (constant of proportionality between mean and variance solved for with the betas; over-dispersion), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-155.md
---

A Poisson claim-frequency GLM gives a coastal-territory coefficient of 0.30 with standard error 0.125, a Wald statistic of 2.4. Pearson's chi-square statistic divided by the residual degrees of freedom is 2.25, so the actuary refits the model as quasi-Poisson with $\text{Var}(Y) = \phi\mu$ and $\hat\phi = 2.25$.

Which of the following describes the coastal-territory row of the quasi-Poisson output?

- A) Estimate 0.133; standard error 0.125; test statistic 1.07
- B) Estimate 0.30; standard error 0.281; test statistic 1.07
- C) Estimate 0.20; standard error 0.083; test statistic 2.40
- D) Estimate 0.30; standard error 0.083; test statistic 3.60
- E) Estimate 0.30; standard error 0.188; test statistic 1.60

## Explanation

Under quasi-Poisson the variance is $\phi$ times the Poisson variance. In the iteratively reweighted least squares step every weight is divided by the same $\phi$, which cancels out of the estimating equations, so

- the coefficient is **exactly** the Poisson estimate, 0.30;
- the covariance matrix of the estimates is multiplied by $\phi$, so each standard error is multiplied by $\sqrt{\hat\phi}$.

$$
\begin{align*}
SE_Q &= 0.125\sqrt{2.25} \\
&= 0.125(1.5) \\
&= 0.1875 \\[4pt]
t &= \frac{0.30}{0.1875} \\
&= 1.60
\end{align*}
$$

The relativity $e^{0.30} = 1.35$ is unchanged, but the evidence for it weakens: the territory effect no longer looks significant at 5%. The answer is **E**.

**Why not the others**

- **A** — treats $\phi$ as a scale on the coefficient (0.30/2.25 = 0.133). The mean model is unchanged; $\phi$ only enters the variance.
- **B** — multiplies the standard error by $\hat\phi$ instead of $\sqrt{\hat\phi}$. $\phi$ scales the *variance*, so the standard error grows by $\sqrt{2.25} = 1.5$.
- **C** — rescales both the estimate and its standard error by 1.5, leaving the test unchanged. Overdispersion changes the uncertainty, not the fitted means.
- **D** — divides the standard error by $\sqrt{\hat\phi}$, as if extra variance made the estimate more precise. Ignoring overdispersion *understates* the standard errors.
