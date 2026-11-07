---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:checker-islr-b
  content_hash: sha256:e5d30be9f43c0d70e42baa6edccdce8b7a9309443c1b7a8d87e030d20b7bfcaa
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, §12.2.1 eqs. (12.1)-(12.4), unit norm and 'arbitrarily large variance' p.500 (PDF 506), orthogonality, footnote 2, biplot and Fig. 12.1 caption (scores as points, loadings as arrows, Rape at (0.54, 0.17)) pp.501-502 (PDF 507-508), p.503 (PDF 509: Indiana near zero = approximately average; large positive PC1 scores = high crime), §12.2.4 sign flip p.509 (PDF 515); §6.3.1 p.256 (PDF 262)"
    - "Greenacre, Biplots in Practice (Fundación BBVA 2010), ch.6 'Principal Component Analysis Biplots', p.63, sha256:21939dfc3106f33ec287d0a15dfa3f3e394908f52aca39e368487a9d917d3362 — https://www.fbbva.es/wp-content/uploads/2017/05/dat/greenacre_c06_2010.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loading Vector.md
---

![[Media/Figures/Loading_Vector.svg|340]]

A **Loading Vector** is the vector $\boldsymbol{\phi}_m = (\phi_{1m}, \ldots, \phi_{pm})$ of weights that defines the $m$th principal component in [[Principal Components Analysis|principal components analysis]]. Its entries, the loadings, are the coefficients of the variables in the component. With each variable centred, the score of observation $i$ on the $m$th principal component is

> $$z_{im} = \phi_{1m} x_{i1} + \phi_{2m} x_{i2} + \cdots + \phi_{pm} x_{ip}$$

- $x_{ij}$ is the centred value of variable $X_j$ for observation $i$.
- $\phi_{1m}^2 + \phi_{2m}^2 + \cdots + \phi_{pm}^2 = 1$.

The loading vector is a direction in the space of the variables, and the score is the observation's projection onto it. The first loading vector is the direction along which the observations vary the most, which is also the line closest to the observations. A principal component is a linear combination of the variables, so it is a straight line, not a curve, and it captures only linear relationships among the variables.

> [!example]- PCA on four standardized telematics variables gives the first loading vector $(0.52, 0.50, 0.50, 0.48)$. What is the score of a driver whose standardized values are $1.0$, $0.5$, $-0.5$ and $2.0$? {Example}
> - Standardized values are already centred, so they go straight into the linear combination.
> - The score is $0.52(1.0) + 0.50(0.5) + 0.50(-0.5) + 0.48(2.0)$.
> - That is $0.52 + 0.25 - 0.25 + 0.96 = 1.48$.

## Orthogonality of loading vectors

Each loading vector after the first is perpendicular to all the earlier ones. For two different components $m$ and $m'$,

> $$\phi_{1m}\phi_{1m'} + \phi_{2m}\phi_{2m'} + \cdots + \phi_{pm}\phi_{pm'} = 0$$

The scores of two different components are therefore uncorrelated.

> [!example]- The first loading vector is $(0.52, 0.50, 0.50, 0.48)$. Can $(0.42, 0.55, -0.43, -0.58)$ be the second loading vector? {Example}
> - Its squared loadings sum to $0.1764 + 0.3025 + 0.1849 + 0.3364 = 1.00$, so it has unit length.
> - Its dot product with the first is $0.2184 + 0.2750 - 0.2150 - 0.2784 = 0$, so it is perpendicular to the first.
> - It can be the second loading vector.

## Sign of a loading vector

A loading vector is unique only up to its sign. Flipping the signs of all its loadings gives the same direction, so two programs may report opposite signs, and the scores flip with the loadings. Flipping the signs of only some of the loadings gives a different direction, and so a different component.

> [!example]- One program reports a first loading vector of $(0.6, 0.8)$. Could another program correctly report $(-0.6, -0.8)$, or $(0.6, -0.8)$? {Example}
> - $(-0.6, -0.8)$ is $(0.6, 0.8)$ with every sign flipped, so it is the same component.
> - $(0.6, -0.8)$ flips only one sign, so it is a different direction and cannot be the same component.

## Interpreting the loadings

The pattern of signs and sizes says what a component measures:

1. Loadings of one sign and similar size make an overall size component.
2. Loadings of mixed signs make a contrast between the two groups of variables.
3. A loading near zero means that its variable contributes little to the component.

A biplot draws the first two components on one pair of axes. Each observation is a point at its scores $(z_{i1}, z_{i2})$, and each variable is an arrow to its loadings $(\phi_{j1}, \phi_{j2})$. Plotting the first few scores in this way shows the observations in two or three dimensions.

On a biplot of scaled variables, the cosine of the angle between two arrows approximates the correlation between those variables. A small angle means a high positive correlation, a right angle almost none, and opposite directions a negative correlation. The data are centred, so a score measures an observation's departure from each variable's mean. A point far out along a variable's arrow is well above that variable's average, and a point near the origin is near average on both components. The plot cannot say whether the raw value itself is positive or negative.

> [!example]- PCA on four standardized telematics variables gives loading vectors $(0.52, 0.50, 0.50, 0.48)$ and $(0.42, 0.55, -0.43, -0.58)$. What does each component measure? {Example}
> - The first loads positively and almost equally on all four variables, so it is an overall size component: how much and how hard the driver drives.
> - The second loads positively on the first two variables and negatively on the last two, so it contrasts drivers high on one pair and low on the other.
