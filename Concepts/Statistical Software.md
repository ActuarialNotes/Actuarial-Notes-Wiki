---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:83528cd64f3d2ba857207261aeae4459318a310665e0bcffce1ad9871f07466f
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain C tasks 4 and 8 (p.5), 'Parameter and Diagnostic Tables' (PDF p.7: tables/plots 'of the type shown in the texts'; a language 'such as R'; 'candidates will not be asked to write or interpret R code'), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; CAS PCPA Exam & Project Content Outline v.8 (updated 9.9.2026), Domain A task 2 and code submission 'in R, Python, or SAS' (PDF p.3), references 'not intended to communicate a preferred or recommended programming language' (PDF p.4), sha256:e22ce369f08e1feec88b1ed8a9273c67fd585b1c62193ea3105fe1fe8077189f — https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy; MAS-I reading), §3.3.1 one fewer dummy than levels (PDF p.96); §3.6.4 lstat:age and lstat*age (PDF p.126); §4.7.2 glm summary with z values, null/residual deviance and AIC (PDF p.183), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; R Core, stats::summary.glm documentation (R-devel): third column labelled t ratio if the dispersion is estimated, z ratio if known or fixed by the family; dispersion 1 for binomial and Poisson, otherwise the residual Chi-squared statistic divided by the residual df; cov.scaled = covariance scaled by dispersion, sha256:c7cf5a73225bd54cad2584cf31b1155884c4d359a14de4048b6e11a7acfe9e2d — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/summary.glm.html; R Documentation (R-devel manual): stats::formula (a:b interaction, a*b) sha256:2e73aff0237ac6a07cf01a067255001892744d7b47e5b31366b09fcedde5bdf9 — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/formula.html; stats::glm (family, offset) sha256:6b9a6fad58fad62386050ceba47abe28e40241544dd71d20df000fc40563d6c3 — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/glm.html; stats::lm na.action sha256:9d15d4437d064d80d89c90d6a0df05083a5024324172a8ea902861562702c749 — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/lm.html; stats::relevel sha256:33d5a9ecf045e40bbe3746b1c43be4ef9b4da617ea07507ea99f69d1df1f89a9 — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/relevel.html; base::factor sha256:f3eafa8a1d82df223584cf24c0c71ce58e85d922d22d29b433e7331a4e6ca64a — https://stat.ethz.ch/R-manual/R-devel/library/base/html/factor.html; stats::naprint sha256:0213bb70619b3ada8a6a14c2ab963b28aa8720784ee2e16b9718abbbc0d96fa8 — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/naprint.html; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, 2nd ed. (CAS Monograph 5; rank 3 for MAS-I), §2.4.2-2.4.3 'Choose Your Base Level Wisely!' (PDF pp.22-26), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Grolemund & Wickham, R for Data Science (1st ed.), ch. 5 Data transformation (filter, mutate, group_by, summarise) sha256:38e6d881a581b48ec73c3a4a1e9a6a7cba54b2df4ab8bffff85ec0d85521ed8d — https://r4ds.had.co.nz/transform.html; ch. 12 Tidy data (pivot_longer) sha256:11cbff74baa595633b2d8bf8b99f41605a1c7c67e30887714e6e3873901e93af — https://r4ds.had.co.nz/tidy-data.html; ch. 13 Relational data (left_join) sha256:ed1995e7d56b77b965aade7b47fe8ab809c05da8aee2240e8af91c89b5e0f394 — https://r4ds.had.co.nz/relational-data.html; McKinney, Python for Data Analysis 3rd ed. (open web edition), ch. 6 (read_csv) sha256:53aa006e044960aa45436692074bdf75669513bb7a88a5f256c33c4d35cd2020 — https://wesmckinney.com/book/accessing-data.html; ch. 7 (isna) sha256:5bc71413ad6b225acfd9420ae75d23d034b1d70ebae51ef5a5b9fe9d23320732 — https://wesmckinney.com/book/data-cleaning.html; ch. 8 (merge, melt) sha256:82e08312c6b091636e4fb62af050fdb40dfd4e0a4a9f77a6c742937295dcabdc — https://wesmckinney.com/book/data-wrangling.html; ch. 10 (groupby, agg) sha256:51a4e5cf1971ab5dd34dde5532e4a14c28afc27f5d16fd3255b0fbece2cc48ec — https://wesmckinney.com/book/data-aggregation.html; ch. 12 (statsmodels smf.ols, summary) sha256:9424c75e19ccb99f12be8b6fa89c895367b515e1f1370770821abc36e82b3d40 — https://wesmckinney.com/book/modeling.html; statsmodels API Reference (0.15.0): statsmodels.formula.api lists ols and glm, sha256:5d8e21862cf90423f47eba1aaf73a01498d97c7a462954b019e4ae264aefe693 — https://www.statsmodels.org/stable/api.html"
    - "R Core Team, R documentation base 'Log' (R-devel): usage log(x, base = exp(1)); 'log computes logarithms, by default natural logarithms, log10 computes common (i.e., base 10) logarithms, and log2 computes binary (i.e., base 2) logarithms', fetched 2026-10-30 — https://stat.ethz.ch/R-manual/R-devel/library/base/html/Log.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Statistical Software.md
---

**Statistical Software** is a programming language for data analysis, such as R, Python or SAS, together with its packages, used to import data, fit models and print their [[Model Output|output]]. MAS-I questions show output tables of the kind R prints and ask for them to be read, not for code to be written. The common tasks in R and in Python are:

| Task | R | Python (pandas, statsmodels) |
| --- | --- | --- |
| Import a file | `read.csv()` | `pd.read_csv()` |
| Report each column's type and summary | `str()`, `summary()` | `.dtypes`, `.describe()` |
| Declare a variable categorical | `factor()` | `.astype("category")` |
| Fit a linear regression | `lm()` | `smf.ols()` |
| Fit a generalized linear model | `glm()` with a `family` | `smf.glm()` with a `family` |
| Print the fitted model's output | `summary()`, `anova()` | `.summary()` |

## Model formulas

R and statsmodels describe a model by a formula with the [[Response Variable|response]] to the left of `~` and the [[Predictor Variable|predictors]] to the right. The formula `y ~ x1 + x2`, fitted with a link $g$, specifies the linear predictor

> $$g(\mu_i) = \beta_0 + \beta_1 x_{i1} + \beta_2 x_{i2}$$

- $\mu_i$ is the mean of the response for observation $i$.
- The intercept $\beta_0$ is included unless the formula removes it.

In a formula, `x1:x2` is the [[Interaction|interaction]] of two predictors, and `x1*x2` means both main effects and their interaction. The distribution and the link come from the `family` argument, such as `family = poisson(link = "log")`, not from the formula. In R, `log()` is the natural logarithm, so a term `log(x)` enters $\ln x$.

> [!example]- In R, `glm(claims ~ territory * age + offset(log(exposure)), family = poisson)` is fitted with `territory` declared a factor with levels A, B and C. Which terms does the linear predictor contain? {Example}
> - The default link of the Poisson family is the log link.
> - `territory` enters as two indicator variables, for levels B and C, because A is the base level.
> - `age` enters as one numeric term.
> - `territory * age` adds the two interaction terms of B and C with `age`.
> - The offset adds $\ln(\text{exposure})$ with its coefficient fixed at 1.

## Defaults in R's model output

R's output depends on several defaults:

1. The base level of a categorical predictor is its first level, which is alphabetical unless it is reset with `relevel()`. The base level has no row in the coefficient table, because it is absorbed into the intercept.
2. The intercept is the linear predictor for the base level of every categorical predictor, with every numeric predictor equal to zero.
3. A categorical variable stored as numbers is fitted as one numeric slope until it is declared a `factor`. Once declared, it is treated as nominal, with a separate coefficient for each non-base level.
4. Observations with a missing value in any model variable are dropped, and the summary reports how many were deleted. The number of records fitted is then less than the number in the data file.
5. The coefficient table labels the test statistic `z value` when the dispersion is fixed (Poisson, binomial) and `t value` when it is estimated (normal, Gamma).

> [!example]- A Poisson GLM with a log link and an exposure offset is fitted in R with territory as its only predictor. The coefficient table shows `(Intercept)` $-2.3026$, `territoryB` $0.2231$ (standard error $0.0600$) and `territoryC` $-0.1054$. What are the base frequency and the territory relativities? {Example}
> - Territory A has no row, so it is the base level.
> - The base frequency is $e^{-2.3026} = 0.100$ claims per unit of exposure.
> - The relativity of territory B is $e^{0.2231} = 1.250$, and that of territory C is $e^{-0.1054} = 0.900$.
> - A 95% confidence interval for B's relativity is $e^{0.2231 \pm 1.96 \times 0.0600}$, from 1.111 to 1.406.
