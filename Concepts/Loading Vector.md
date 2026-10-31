---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-31
  last_checked_by: agent:checker-islr-b
  content_hash: sha256:68f6ded60e09d026f16c22a06824903a3dd387bd0a75321425b21922e6d0df8b
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, §12.2.1 eqs. (12.1)-(12.4), unit norm and 'arbitrarily large variance' p.500 (PDF 506), orthogonality, footnote 2, biplot and Fig. 12.1 caption (scores as points, loadings as arrows, Rape at (0.54, 0.17)) pp.501-502 (PDF 507-508), p.503 (PDF 509: Indiana near zero = approximately average; large positive PC1 scores = high crime), §12.2.4 sign flip p.509 (PDF 515); §6.3.1 p.256 (PDF 262)"
    - "Greenacre, Biplots in Practice (Fundación BBVA 2010), ch.6 'Principal Component Analysis Biplots', p.63, sha256:21939dfc3106f33ec287d0a15dfa3f3e394908f52aca39e368487a9d917d3362 — https://www.fbbva.es/wp-content/uploads/2017/05/dat/greenacre_c06_2010.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loading Vector.md
---

A **loading vector** $\boldsymbol{\phi}_m$ holds the weights that define the $m$-th principal component in [[Principal Components Analysis]]. It is the direction in predictor space along which the data vary most (subject to being orthogonal to the earlier components), and its entries say how each variable contributes.

> $$z_{im} = \phi_{1m}x_{i1} + \phi_{2m}x_{i2} + \cdots + \phi_{pm}x_{ip}$$
>
> $$\text{subject to } \sum_{j=1}^{p}\phi_{jm}^{2} = 1$$

- $\boldsymbol{\phi}_m$ is the **eigenvector** of the sample covariance (or correlation) matrix with the $m$-th largest eigenvalue $\lambda_m$
- The **scores** $z_{im}$ are the projections of the observations onto that direction; the loadings are the recipe, the scores are the result
- The unit-norm constraint is what makes the maximization well posed — without it the variance could be inflated without bound by scaling
- **Sign is arbitrary**: $\boldsymbol{\phi}_m$ and $-\boldsymbol{\phi}_m$ describe the same component, so two software packages may report opposite signs (the scores flip with the loadings)
- Interpretation comes from the pattern of signs and magnitudes: all-same-sign loadings read as an overall "size" component, mixed signs as a contrast
- A **biplot** draws both on one pair of axes for the first two components: each observation as a point at its scores $(z_{i1}, z_{i2})$ and each variable as an arrow to its loadings $(\phi_{j1}, \phi_{j2})$
- **Reading the arrows** (scaled variables): the cosine of the angle between two arrows approximates the correlation between those variables — a small angle, highly positively correlated; a right angle, nearly uncorrelated; opposite directions, negatively correlated
- **Reading the points**: PCA works on centred data, so a score measures an observation's departure from each variable's mean. A point far out along a variable's arrow is well above that variable's average, and a point near the origin is near average on both components; the plot cannot say whether the raw value itself is positive or negative

![[Media/Figures/Loading_Vector.svg|340]]

> [!example]- Interpreting Two Loading Vectors {Example}
> PCA on four standardized telematics variables gives $\boldsymbol{\phi}_1 = (0.52, 0.50, 0.50, 0.48)$ and $\boldsymbol{\phi}_2 = (0.42, 0.55, -0.43, -0.58)$. What does each component mean, and what is a driver's PC1 score if all four standardized values are $+1$?
>
> > [!answer]-
> > **PC1** loads positively and almost equally on all four — an overall "how much and how hard they drive" size component.
> > **PC2** contrasts the first two variables against the last two — drivers high on one pair and low on the other.
> > $$z_1 = 0.52 + 0.50 + 0.50 + 0.48 = 2.00$$
> > (Checks: $\lVert\boldsymbol{\phi}_1\rVert^2 = 0.27+0.25+0.25+0.23 = 1.00$ ✓, and the two directions are orthogonal, $\boldsymbol{\phi}_1\cdot\boldsymbol{\phi}_2 = 0.2184+0.2750-0.2150-0.2784 = 0$ ✓)
