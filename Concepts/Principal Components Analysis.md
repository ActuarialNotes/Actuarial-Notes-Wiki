---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:6ad81b2d5398c300f9a443d55457e47b0809e929519d240fa1ce8d619a90537b
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §12.2.2 Another Interpretation of Principal Components, pp.503-504 (PDF 509-510), Fig. 12.2, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Principal Components Analysis.md
---

![[Media/Figures/Principal_Components_Analysis.svg|340]]

**Principal Components Analysis** (PCA) is an [[Unsupervised Learning|unsupervised]] method that finds a low-dimensional representation of $n$ observations of $p$ variables $X_1, \ldots, X_p$, keeping as much of their variance as possible. It projects the observations onto a few linear combinations of the variables, called principal components. PCA uses only the variables and no response. With each variable centred by subtracting its sample mean, the score of observation $i$ on the first principal component is

> $$z_{i1} = \phi_{11} x_{i1} + \phi_{21} x_{i2} + \cdots + \phi_{p1} x_{ip}$$

- $x_{ij}$ is the centred value of variable $X_j$ for observation $i$.
- $\phi_{11}, \ldots, \phi_{p1}$ are the loadings of the first principal component, chosen to make the sample variance of the scores $z_{11}, \ldots, z_{n1}$ as large as possible, subject to $\phi_{11}^2 + \phi_{21}^2 + \cdots + \phi_{p1}^2 = 1$.

Without the constraint on the sum of squared loadings, the variance could be made as large as desired. The loading vector is determined only up to its sign, because changing the sign of every loading gives the same direction. The first principal component is the direction in the space of the variables along which the observations vary the most, which is also the line closest to the observations.

> [!example]- Three observations of two variables are $(2, 9)$, $(6, 5)$ and $(7, 10)$. The first principal component has $\phi_{11} = 0.6$ and $\phi_{21} > 0$. What is the score of the first observation? {Example}
> - The loadings satisfy $\phi_{11}^2 + \phi_{21}^2 = 1$, so $\phi_{21} = \sqrt{1 - 0.36} = 0.8$.
> - The means of the variables are 5 and 8, so the first observation centred is $(-3, 1)$.
> - Its score is $0.6(-3) + 0.8(1) = -1.0$.

## Later principal components

The second principal component is the linear combination of the variables with the largest variance among those uncorrelated with the first, which makes its direction perpendicular to the first. Each later component has the largest remaining variance among the combinations uncorrelated with all the earlier ones. The principal components are linear combinations of the variables, so they are straight lines, not curves, and PCA captures only linear relationships among the variables. On a scatter plot of two variables, the first principal component lies along the direction in which the cloud of points is most elongated, and the second is perpendicular to it.

## Proportion of variance explained

The total variance of the centred data is the sum of the variances of the $p$ variables. The proportion of variance explained by the $m$th principal component is

> $$\text{PVE}_m = \frac{\sum_{i=1}^{n} z_{im}^2}{\sum_{j=1}^{p}\sum_{i=1}^{n} x_{ij}^2}$$

- $z_{im}$ is the score of observation $i$ on the $m$th principal component.

The variance of the $m$th component is the $m$th largest eigenvalue of the covariance matrix of the variables, or of their correlation matrix when the variables are standardized. The proportion of variance explained by a component is therefore its eigenvalue divided by the sum of all the eigenvalues, and the sum of the eigenvalues is the total variance. The components are ordered by the variance they explain, so the proportions never increase from one component to the next. Their cumulative sum reaches 1 at the last component, and a [[Scree Plot|scree plot]] of the proportions helps decide how many components to keep.

> [!example]- Two standardized variables have correlation 0.6, and the eigenvalues of their correlation matrix are 1.6 and 0.4. What proportion of the variance does the first principal component explain? {Example}
> - Each standardized variable has variance 1, so the total variance is 2, which is also $1.6 + 0.4$.
> - The proportion of variance explained by the first component is $1.6/2 = 0.80$.

## Scaling the variables

The principal components depend on the scale of the variables. If the variables are only centred, the variables with the largest variances dominate the first principal components. Scaling each variable to standard deviation 1 removes that dominance, and it changes the loadings, so two programs with different default scaling can give different loadings. The variables are standardized unless they are all measured in the same units.

PCA is used to plot the observations in two or three dimensions and to derive a few features for a regression, as in [[Principal Components Regression|principal components regression]]. A loading is the coefficient of a variable in a component, and a loading near 0 means that the variable contributes little to that component. It does not mean that the variable is unimportant, because the components are derived features rather than the predictors themselves.
