---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:a9288e012d6d735059d7b36ffb57abb8dc78b074f6871bcc02169b43ce220858
  sources:
    - "R Core Team, R documentation 'AIC {stats}' (R-devel manual, stats 4.6.0), Description and Details, sha256:f55c97cef5d53ab762953509b4e5c4da1e8891b8263ce021ef04dcb27c81b8df — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/AIC.html"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §6.2.2 PDF pp.76-77, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Ding, Tarokh & Yang, 'Model Selection Techniques - An Overview', IEEE Signal Processing Magazine 2018 (arXiv:1810.09583v1), §I PDF p.2 (frameworks); eq.(10) PDF p.5; §III PDF p.10, sha256:fd9744e006712c6d59f8da05f42769eeed90244d857e031cc70ec41d139446b6 — https://arxiv.org/pdf/1810.09583v1"
    - "Penn State STAT 504, Lesson 9 'Poisson Regression', SAS output for the horseshoe-crab width model (Full Log Likelihood -461.5881, AIC 927.1762, AICC 927.2468, BIC 933.4828; deviance df 171, n = 173, 2 parameters), sha256:f8021fab7a1c8cfeb2de7ebfe3b5d1977a32671dd3acefc9ade531369c5da506 — https://online.stat.psu.edu/stat504/Lesson09"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §6.1.3 printed pp.232-235 (PDF pp.240-243), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/BIC.md
---

![[Media/Figures/BIC.svg|340]]

The **BIC**, or Bayesian information criterion, also called the Schwarz criterion, is a measure for comparing models fitted by [[Maximum Likelihood Estimation|maximum likelihood]] that penalizes the maximized log-likelihood more heavily than the [[AIC]] for each parameter. For a model with maximized log-likelihood $l$ and $k$ estimated parameters, fitted to $n$ observations, the BIC is

> $$\text{BIC} = -2l + k \ln n$$

- $\ln n$ is the natural logarithm of the number of observations.

The model with the lowest BIC is preferred. As with the AIC, the models need not be nested, but they must be fitted to the same observations of the same response.

> [!example]- With 100 observations, model A has 5 parameters and maximized log-likelihood $-200$, and model B has 2 parameters and $-210$. Which model do the AIC and the BIC prefer? {Example}
> - The AIC of model A is $400 + 2(5) = 410$, and of model B is $420 + 2(2) = 424$.
> - The BIC of model A is $400 + 5\ln 100 = 423.03$, and of model B is $420 + 2\ln 100 = 429.21$.
> - Both prefer model A, but the BIC's margin of 6.18 is much smaller than the AIC's margin of 14.

## BIC compared with AIC

The BIC's penalty for each parameter is $\ln n$, and the AIC's is 2. Since $\ln n > 2$ when $n \ge 8$, the BIC penalizes extra parameters more heavily for all but the smallest data sets. The BIC therefore tends to choose a model with fewer parameters than the AIC. For models with the same number of parameters, the two penalties are equal, so the AIC and the BIC rank the models the same way.

For a linear model with normal errors fitted by least squares with $p$ predictors, the BIC is, up to a constant,

> $$\text{BIC} = \frac{1}{n}\left(\text{RSS} + p\,\hat{\sigma}^2 \ln n\right)$$

- $\text{RSS}$ is the [[Residual Sum of Squares|residual sum of squares]] of the model.
- $\hat{\sigma}^2$ is the estimate of the error variance from the full model, used for every model compared.

> [!example]- Regressions are fitted to 50 observations, and the full model has residual standard error 2. Model A has 2 predictors and $\text{RSS} = 230$, and model B has 4 predictors and $\text{RSS} = 210$. Which has the lower BIC? {Example}
> - The error variance estimate is $\hat{\sigma}^2 = 4$, and $\ln 50 = 3.912$.
> - Model A has $\text{BIC} = \frac{230 + 2(4)(3.912)}{50} = 5.226$.
> - Model B has $\text{BIC} = \frac{210 + 4(4)(3.912)}{50} = 5.452$.
> - Model A has the lower BIC, although the AIC prefers model B, because the BIC's heavier penalty outweighs the drop in RSS.

> [!trap] Using the base-10 logarithm in the penalty
> The penalty is the natural logarithm of $n$. With $n = 100$, $\ln 100 = 4.605$, while $\log_{10} 100 = 2$ would make the BIC equal to the AIC.
