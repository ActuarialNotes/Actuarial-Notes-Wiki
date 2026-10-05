---
verification:
  status: verified
  confidence: low
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:db7caae77d5a70666153cc53cd2816eb56f1dfa1124d361ab9635e6bb17023e8
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §12.2.1 eqs. 12.1-12.4 and footnote 2 (PDF pp.505-507), §12.2.4 uniqueness up to sign (PDF p.515), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-II Content Outline 2026, Domain C task 5 (PDF p.3), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 2
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
- **Sign is arbitrary**: $\boldsymbol{\phi}_m$ and $-\boldsymbol{\phi}_m$ describe the same component, so software may flip it between runs
- Interpretation comes from the pattern of signs and magnitudes: all-same-sign loadings read as an overall "size" component, mixed signs as a contrast

![[Media/Figures/Loading_Vector.svg|340]]

> [!example]- Interpreting Two Loading Vectors {Example}
> PCA on four standardized telematics variables gives $\boldsymbol{\phi}_1 = (0.52, 0.51, 0.49, 0.48)$ and $\boldsymbol{\phi}_2 = (0.61, 0.55, -0.42, -0.39)$. What does each component mean, and what is a driver's PC1 score if all four standardized values are $+1$?
>
> > [!answer]-
> > **PC1** loads positively and almost equally on all four — an overall "how much and how hard they drive" size component.
> > **PC2** contrasts the first two variables against the last two — drivers high on one pair and low on the other.
> > $$z_1 = 0.52 + 0.51 + 0.49 + 0.48 = 2.00$$
> > (Check: $\lVert\boldsymbol{\phi}_1\rVert^2 = 0.27+0.26+0.24+0.23 = 1.00$ ✓)
