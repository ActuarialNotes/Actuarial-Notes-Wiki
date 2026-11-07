---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:0ed24f45e3f88ef7030c765620ab17f5362ebe33e4161fa27fd4a842c5a259c0
  sources:
    - "Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018) — publisher eBook preview, §1.2 Scope printed pp.3-4 (PDF pp.20-21): 'Analysis of covariance (ANCOVA) is used when at least one of the explanatory variables is continuous' and Table 1.1 (continuous response, nominal & some continuous explanatory -> ANCOVA; binary/count response with categorical & continuous -> logistic/Poisson regression); Contents PDF p.10 lists §6.5 Analysis of covariance p.132 (body not in preview), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 §2.8 'Analysis of Covariance Models', PDF pp.42-48: additive model (2.21) mu_ij = mu + alpha_i + beta x_ij, parallel lines; reference cell alpha_1 = 0; model matrix = constant + dummies (one dropped) + covariate; hierarchical anova Table 2.24 (Effort|Setting F on 2 and 16 d.f. = k-1, n-k-1); adjusted means mu + alpha_i + beta*xbar Table 2.26; different-slopes model (2.22) with alpha_1 = gamma_1 = 0, parallelism F on 2 and 14 d.f. (= k-1, n-2k) Table 2.28, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf"
    - "Penn State STAT 502 (online course notes), Lesson 9 'ANCOVA Part I', §9.1 covariate entered as a regression variable, treatments compared at the mean of the covariate, removes variation due to the covariate; §9.2 steps: test equal slopes (treatment x covariate interaction) first, then common-slope model with LS means at the covariate mean, else compare at three or more covariate values, sha256:02e005b021c61df817b6e7c1f86c458a016a2574ecba53f2261eaeafa04ec16c — https://online.stat.psu.edu/stat502/Lesson09.html"
    - "CAS Exam MAS-I Tables (version 01/15/2018), F-distribution table: F(2,18) upper 0.05 = 3.555 (PDF p.18); F(2,20) upper 0.05 = 3.493, 0.02 = 4.788, 0.01 = 5.849 (PDF p.19), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list PDF p.6: Dobson & Barnett Chapters 1-9 excluding 6.3.3, 6.7, 6.8 & 7.9 (so §6.5 ANCOVA is assigned), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Analysis of Covariance.md
---

An **Analysis of Covariance** (ANCOVA) is a normal [[Linear Regression|linear model]] whose predictors are a [[Categorical Predictor|categorical factor]] and a continuous variable, the covariate, so that it fits a regression line in the covariate for each level of the factor. For a factor with $J$ levels, level 1 as the base level, and covariate $x$, the mean response with a common slope is

> $$\mu = \beta_0 + \beta_1 x + \gamma_2 I_2 + \cdots + \gamma_J I_J$$

- $I_j$ is the [[Design Matrix#Indicator columns for a categorical predictor|indicator]] of level $j$.
- $\beta_0$ and $\beta_1$ are the intercept and slope of level 1.
- $\gamma_j$ is the difference between the intercept of level $j$ and that of level 1.

The lines for the levels are parallel. At every value of $x$, level $j$ differs from level 1 by $\gamma_j$. With every $\gamma_j = 0$ the model is a single regression line, and with $\beta_1 = 0$ it is a [[ANOVA#One-way analysis of variance|one-way analysis of variance]]. The levels are compared after adjusting for the covariate, usually at its overall mean $\bar{x}$.

> [!example]- A common-slope model of log severity is $\hat\mu = 7.20 + 0.25 I_B + 0.40 I_C + 0.030x$, with territory A as the base level and vehicle value $x$ in thousands. The overall mean vehicle value is 15. What are the territories' adjusted means? {Example}
> - At $x = 15$, the covariate adds $0.030 \times 15 = 0.45$ for every territory.
> - Territory A's adjusted mean is $7.20 + 0.45 = 7.65$.
> - Territory B's is $7.20 + 0.25 + 0.45 = 7.90$, and territory C's is $7.20 + 0.40 + 0.45 = 8.05$.
> - The differences between territories are $0.25$ and $0.40$ at every vehicle value, because the lines are parallel.

## Separate slopes for each level

Adding the factor-by-covariate [[Interaction|interaction]] gives each level its own slope, so the mean response is

> $$\mu = \beta_0 + \beta_1 x + \sum_{j=2}^{J} \gamma_j I_j + \sum_{j=2}^{J} \delta_j\, x I_j$$

- $\delta_j$ is the difference between the slope of level $j$ and that of level 1.

The difference between level $j$ and level 1 is $\gamma_j + \delta_j x$, which changes with the covariate, so no single difference describes the levels.

> [!example]- In a separate-slopes model, level 2 has $\gamma_2 = 0.5$ and $\delta_2 = -0.02$. What is the difference between level 2 and level 1 at $x = 10$ and at $x = 40$? {Example}
> - At $x = 10$, the difference is $0.5 - 0.02(10) = 0.3$.
> - At $x = 40$, the difference is $0.5 - 0.02(40) = -0.3$, so the order of the two levels is reversed.

## Testing for parallel lines and a factor effect

The common-slope model has $J + 1$ parameters, and the separate-slopes model has $2J$. The models are nested, so each question is answered by the [[ANOVA#F test for nested models|F test for nested models]]:

1. Test for parallel lines, $H_0\colon \delta_2 = \cdots = \delta_J = 0$, by comparing the common-slope model with the separate-slopes model, on $J - 1$ and $n - 2J$ degrees of freedom.
2. If the lines are parallel, test for a factor effect after adjusting for the covariate, $H_0\colon \gamma_2 = \cdots = \gamma_J = 0$, by comparing the covariate-only model with the common-slope model, on $J - 1$ and $n - J - 1$ degrees of freedom. The denominator is the residual mean square of the common-slope model.

> [!example]- Log severities of 24 claims, 8 from each of 3 territories, are fitted with vehicle value as the covariate. The covariate-only model has RSS 18.0, the common-slope model 12.0 and the separate-slopes model 11.1. At the 5% level, are the lines parallel, and do the territories differ? {Example}
> - The separate-slopes model has $2J = 6$ parameters, so $24 - 6 = 18$ residual degrees of freedom, and it adds $J - 1 = 2$ slope differences.
> - For parallel lines, the numerator is $(12.0 - 11.1)/2 = 0.45$ and the denominator is $11.1/18 = 0.6167$, so $F = 0.73$.
> - $0.73$ is below $3.555$, the 5% critical value of $F$ with 2 and 18 degrees of freedom, so the common slope is kept.
> - The common-slope model has $J + 1 = 4$ parameters, so $24 - 4 = 20$ residual degrees of freedom.
> - For the territory effect, the numerator is $(18.0 - 12.0)/2 = 3.0$ and the denominator is $12.0/20 = 0.6$, so $F = 5.0$.
> - $5.0$ is above $3.493$, the 5% critical value of $F$ with 2 and 20 degrees of freedom, so the territories differ in expected log severity at the same vehicle value.
