---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:599c32925d805e95dd189fbb83027d2b47a4de0f94116e9117e7ca505689a5d2
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §6.3 eqs. 6.16-6.18 and §6.3.1 (PDF pp.259-261), §6.3.1-6.3.2 PCR M by cross-validation, unsupervised directions, PLS as supervised alternative (PDF pp.267-268), §12.2.1 eqs. 12.1-12.4 and footnote 2 (PDF pp.505-507), §12.2.3 PVE eq. 12.10 and scree plot (PDF pp.511-513), scaling (PDF pp.513-514), number of components/scree (PDF p.515), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), James reading list Chapters 1-7 incl. Ch 6 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "CAS Exam MAS-II Content Outline 2026 (MASII_CO_S_2026 v06), Domain C tasks 5-6 PCA (PDF p.3), James reading list Ch 12 (PDF p.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Principal Components Analysis.md
---

**Principal Components Analysis (PCA)** is an unsupervised [[Statistical Learning]] technique that finds a low-dimensional representation of a high-dimensional dataset by identifying the directions (**principal components**) of maximum variance.

> **First principal component** — the direction $\mathbf{z}_1 = \mathbf{X}\boldsymbol{\phi}_1$ that maximizes $\text{Var}(\mathbf{z}_1)$:
> $$\boldsymbol{\phi}_1 = \arg\max_{\|\boldsymbol{\phi}\|=1} \text{Var}(\mathbf{X}\boldsymbol{\phi})$$
>
> **Proportion of variance explained by PC $m$:**
> $$\text{PVE}_m = \frac{\lambda_m}{\sum_{j=1}^p \lambda_j}$$

- $\boldsymbol{\phi}_m$ is the $m$-th **loading vector** (eigenvector of the covariance matrix $\mathbf{S}$ with eigenvalue $\lambda_m$)
- $\mathbf{z}_m = \mathbf{X}\boldsymbol{\phi}_m$ is the $m$-th **score vector** (principal component)
- PCs are **orthogonal** — each successive PC captures the maximum remaining variance
- **Scree plot**: plot of $\lambda_m$ vs. $m$; an "elbow" suggests how many PCs to retain
- PCA requires **standardizing** predictors (subtract mean, divide by SD) when variables are on different scales
- Used for **visualization** of high-dimensional data, and to derive a few features for a supervised fit
- **MAS-I sense — dimension reduction for regression.** [[Principal Components Regression]] fits $Y$ by least squares on the first $M$ score vectors instead of the $p$ predictors, with $M$ chosen by [[Cross-Validation]]. The directions are found without using $Y$, so nothing guarantees they are the best ones for predicting it; [[Partial Least Squares]] is the supervised alternative that uses $Y$ to choose them. PCA as an unsupervised method in its own right is MAS-II

![[Media/Figures/Principal_Components_Analysis.svg|340]]

> [!example]- Computing the First Principal Component {Example}
> Two standardized predictors $X_1$ (vehicle age) and $X_2$ (driver age) have covariance matrix $\mathbf{S} = \begin{pmatrix}1 & 0.6\\0.6 & 1\end{pmatrix}$. The first eigenvector is $\boldsymbol{\phi}_1 = (0.707, 0.707)^\top$ with eigenvalue $\lambda_1 = 1.6$. What proportion of variance does PC1 explain?
>
> > [!answer]-
> > Total variance $= \lambda_1 + \lambda_2 = 1.6 + 0.4 = 2.0$ (sum of eigenvalues = trace of $\mathbf{S} = 1+1 = 2$).
> > $$\text{PVE}_1 = \frac{1.6}{2.0} = 0.80$$
> > The first principal component explains **80%** of the total variance. $z_{1i} = 0.707 x_{1i} + 0.707 x_{2i} = \sqrt{2}\cdot\tfrac{x_{1i}+x_{2i}}{2}$ is proportional to ($\sqrt{2}$ times) the average of the two standardized predictors, not equal to it.
