---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:b070218ed26858c000b099cdcaf2459ada24e53f61ca2cd7d0a1df2cbb2d8262
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §12.2.3-12.2.4, pp.504-508 (PDF 511-515), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Proportion of Variance Explained.md
---

The **proportion of variance explained (PVE)** is the share of the total variance in the data captured by a principal component. It is how [[Principal Components Analysis]] answers "how much did I lose by keeping only $M$ components?"

> $$\mathrm{PVE}_m = \frac{\lambda_m}{\sum_{j=1}^{p}\lambda_j}$$
>
> $$\text{cumulative: } \sum_{m=1}^{M}\mathrm{PVE}_m$$

- $\lambda_m$ is the variance of the $m$-th score vector — the eigenvalue attached to the $m$-th [[Loading Vector]]
- On **standardized** data $\sum_j \lambda_j = p$, so $\mathrm{PVE}_m = \lambda_m/p$ and a component with $\lambda_m > 1$ carries more than one variable's worth of variance (the Kaiser rule of thumb)
- PVE is **decreasing in $m$** by construction, and the cumulative curve rises to 1 at the last component, $m = \min(n-1, p)$
- "Explained" means variance, **not** predictive power: a high-PVE component need not relate to the response at all, which is why PCA is [[Unsupervised Learning]]
- The usual reading is off the [[Scree Plot]] or a cumulative-PVE target such as 90%

![[Media/Figures/Proportion_of_Variance_Explained.svg|340]]

> [!example]- How Many Components? {Example}
> PCA on 8 standardized rating variables gives eigenvalues 3.6, 1.9, 1.0, 0.6, 0.4, 0.3, 0.2, 0.0. How much does PC1 explain, and how many components reach 80%?
>
> > [!answer]-
> > Total $= 8$ (standardized, so the eigenvalues sum to $p$).
> > $$\mathrm{PVE}_1 = 3.6/8 = 45\% \qquad \mathrm{PVE}_2 = 1.9/8 = 23.75\% \qquad \mathrm{PVE}_3 = 12.5\%$$
> > Cumulative: 45%, 68.75%, **81.25%** — **three components** clear 80%, cutting eight variables to three at a 19% loss of variance.
