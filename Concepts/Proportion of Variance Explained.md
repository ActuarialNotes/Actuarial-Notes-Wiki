---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:checker-islr-b
  content_hash: sha256:953d2872411a99b205b73abb08219116bba326579ac91b8853e35ac62bfb23ac
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, §12.2.1 p.500 (PDF 506: centred scores average zero, objective is the sample variance), footnote 2 p.501 (PDF 507), §12.2.3 eqs. (12.8)-(12.11) pp.505-506 (PDF 511-512), §12.2.4 p.509 (PDF 515)"
    - "NIST/SEMATECH e-Handbook of Statistical Methods §6.5.5.1 (component variances are the eigenvalues; Kaiser (1966) eigenvalues greater than unity) and §6.5.5.2 (eigenvalues of R sum to p; det R = product of eigenvalues) — https://www.itl.nist.gov/div898/handbook/pmc/section5/pmc551.htm , https://www.itl.nist.gov/div898/handbook/pmc/section5/pmc552.htm"
    - "Minitab Support, Principal Components Analysis, 'Interpret all statistics and graphs' (Kaiser criterion) and 'Methods and formulas' (rank r < p gives p − r zero eigenvalues; multicollinearity) — https://support.minitab.com/en-us/minitab/help-and-how-to/statistical-modeling/multivariate/how-to/principal-components/methods-and-formulas/methods-and-formulas"
    - "Penn State STAT 505 Lesson 11 'Principal Components Analysis' (scree plot of eigenvalues against i; cumulative-proportion targets) and Lesson 12 §12.5 (cumulative 80%, eigenvalues of at least one, scree elbow) — https://online.stat.psu.edu/stat505/Lesson11.html , https://online.stat.psu.edu/stat505/Lesson12.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Proportion of Variance Explained.md
---

The **proportion of variance explained (PVE)** is the share of the total variance in the data captured by a principal component. It is how [[Principal Components Analysis]] answers "how much did I lose by keeping only $M$ components?"

> $$\mathrm{PVE}_m = \frac{\lambda_m}{\sum_{j=1}^{p}\lambda_j}$$
>
> $$\text{cumulative: } \sum_{m=1}^{M}\mathrm{PVE}_m$$

- $\lambda_m$ is the variance of the $m$-th score vector — the eigenvalue attached to the $m$-th [[Loading Vector]]
- **From the scores.** For centred data the total variance is $\sum_{j}\frac{1}{n}\sum_{i} x_{ij}^2$ and the variance explained by component $m$ is $\frac{1}{n}\sum_{i} z_{im}^2$, so $\mathrm{PVE}_m = \sum_{i} z_{im}^2 \big/ \sum_{j}\sum_{i} x_{ij}^2$ and the $\frac{1}{n}$ cancels
- Because every variable is centred to mean zero, the scores $z_{1m}, \dots, z_{nm}$ average zero as well, so their variance is simply $\frac{1}{n}\sum_i z_{im}^2$, with no mean to subtract
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
