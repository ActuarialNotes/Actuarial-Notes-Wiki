---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:checker-islr-a
  content_hash: sha256:c047b21dc680bf428620d579c8c8d7965f0cbfff7e6c9c94ebc5b2c194f72ac3
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §3.3.3 item 6 'Collinearity' incl. Figures 3.14-3.15 and Table 3.11, inflated SEs, failure to reject H0, masked importance, VIF, printed pp.99-103 (PDF pp.109-113), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Shalizi, C. R., CMU 36-401 Modern Regression, Lecture 17 'Multicollinearity' (Fall 2015), §2 eq. (6) p.5 Var[beta-hat] = sigma^2 (x'x)^-1 and §2.1 p.6 the inverse of n^-1 x'x for p = 2, whose beta1-beta2 entry is -Cov[X1,X2]/det, sha256:d8115efaaad92aacf470b4ba842b184c2906aba30816c4f6ae2a13b8c1327380 — https://www.stat.cmu.edu/~cshalizi/mreg/15/lectures/lecture-17.pdf"
    - "Shalizi, C. R., Advanced Data Analysis from an Elementary Point of View, ch. 2 'The Truth about Linear Regression' §2.1.1 Collinearity (CMU 36-402, 2015), sha256:1440d81067548f5e0c922470a6e0e8dc6c8ab1bace12b06eb70e279fbf97bc8a — https://www.stat.cmu.edu/~cshalizi/uADA/15/lectures/02.pdf"
    - "Penn State STAT 501 Regression Methods, Lesson 12 §12.3-12.4 (wider confidence intervals, predictions within scope unaffected, Var(b_k) and VIF, overall F significant with non-significant t-tests), sha256:f67694d5ded5e449996b5fde9068686e916b9c1c5cd9245c02badb257c72bc8e — https://online.stat.psu.edu/stat501/Lesson12.html"
    - "Penn State STAT 501 Regression Methods, Lesson 5 §5.4 linear dependence: X'X not invertible, sha256:c7eb1ac675fffa3493ca7644a47f8a36e96fa53d301d2f8191c7ac4ca82edec6 — https://online.stat.psu.edu/stat501/Lesson05.html"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 §2.2.1 full column rank required for (X'X)^-1, PDF pp.6-7, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Multicollinearity.md
---

![[Media/Figures/Multicollinearity.svg|340]]

**Multicollinearity** is a strong linear relationship among the [[Predictor Variable|predictors]] of a regression. Collinear predictors carry nearly the same information, so the data can determine their combined effect but cannot separate the effect of each. The variance inflation factor of the coefficient of predictor $x_j$ is

> $$\text{VIF}_j = \frac{1}{1 - R_j^2}$$

- $R_j^2$ is the [[R-Squared|$R^2$]] from regressing $x_j$ on all the other predictors.

$\text{VIF}_j$ is the factor by which the variance of $\hat\beta_j$ is inflated, compared with a model in which $x_j$ is uncorrelated with the other predictors. Its smallest value is 1, and a VIF above 5 or 10 indicates a problematic amount of collinearity.

> [!example]- Regressing vehicle value on the other predictors gives $R^2 = 0.92$. What is the VIF of the vehicle value coefficient, and what does it do to the standard error? {Example}
> - $\text{VIF} = 1/(1 - 0.92) = 12.5$, above the usual threshold of 10.
> - The variance of the coefficient is 12.5 times what it would be without collinearity.
> - Its standard error is $\sqrt{12.5} = 3.54$ times as large.

## Variance of a coefficient under multicollinearity

In linear regression the variance of the estimated coefficient $\hat\beta_j$ is

> $$\text{Var}(\hat\beta_j) = \frac{\sigma^2}{\sum_{i=1}^{n} (x_{ij} - \bar{x}_j)^2} \cdot \text{VIF}_j$$

- $\sigma^2$ is the error variance, and $\bar{x}_j$ is the mean of predictor $x_j$.

The first factor is the variance of the slope in a simple regression on $x_j$ alone, which has no collinearity. With the same error variance, the VIF is therefore the square of the ratio of the coefficient's standard error in the multiple regression to its standard error in the simple regression.

> [!example]- The coefficient of a predictor has standard error 0.40 in a simple regression on that predictor alone and 1.10 in the multiple regression. What is its VIF, assuming the same error variance? {Example}
> - The VIF is the squared ratio of the standard errors, $(1.10/0.40)^2 = 7.56$.

## Effects of multicollinearity

1. The standard errors of the collinear coefficients are inflated, so their confidence intervals are wide. Each coefficient can be insignificant even when the overall $F$ test is significant.
2. The sizes and signs of the collinear coefficients are unstable. They can change a great deal when a predictor is added or removed or when a few observations change, and the usual interpretation of a coefficient, holding the other predictors fixed, no longer applies.
3. The fitted values and the predictive accuracy within the range of the data are largely unaffected.

Removing one predictor changes the estimates and $p$-values of the others, so a predictor that was insignificant can become significant after refitting. Insignificant predictors are therefore removed one at a time, not all at once.

> [!example]- A severity model includes vehicle age and vehicle value, whose correlation is $-0.94$. Alone, vehicle age has coefficient $-0.08$. With vehicle value in the model, it becomes $+0.05$. Is the positive sign a real effect? {Example}
> - The two predictors carry nearly the same information, so the fit can raise one coefficient and offset it through the other with little change in the RSS.
> - The split of the effect between the two coefficients is therefore poorly determined, and the sign of either one is not reliable.
> - The usual remedy is to keep one of the two predictors, or to combine them into a single variable.

## Detecting and removing multicollinearity

A correlation matrix or a [[Scatter Plot#Scatter plot matrix|scatter plot matrix]] of the predictors shows collinearity between pairs of predictors. Regressing one predictor on another and finding a high $R^2$ shows the same. Collinearity among three or more predictors can exist when no pair is highly correlated, so the VIFs are the more complete check. The usual remedies are to remove one of the collinear predictors or to combine them into a single predictor.

## Aliasing

Aliasing is the exact case, a perfect linear dependence among the columns of the [[Design Matrix#Linearly dependent columns|design matrix]], which leaves the coefficients without a unique estimate:

1. Intrinsic aliasing comes from the definition of the variables, such as an indicator for every level of a [[Categorical Predictor|categorical predictor]] together with an intercept. It is removed by dropping one level of each factor as its base level.
2. Extrinsic aliasing comes from the data, such as a level of one factor that coincides exactly with a level of another. It is removed by keeping only one of the two aliased parameters.
3. Near aliasing is a strong but not perfect dependence, usually caused by a few observations that break an otherwise exact one. It behaves like severe multicollinearity.

GLM software usually detects intrinsic and extrinsic aliasing and drops the aliased parameters.

> [!example]- A model has an intercept and two categorical predictors, with 3 and 4 levels. How many parameters does it have once intrinsic aliasing is removed? {Example}
> - Each factor loses one level as its base, so the factors contribute $3 - 1 = 2$ and $4 - 1 = 3$ parameters.
> - With the intercept, the model has $1 + 2 + 3 = 6$ parameters.
