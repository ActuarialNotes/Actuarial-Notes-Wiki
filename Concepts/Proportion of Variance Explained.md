---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:checker-islr-b
  content_hash: sha256:843e1db42648eae72977a79a9539b3dad72fb95f43f08e803deee7f2a86d4403
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, §12.2.1 p.500 (PDF 506: centred scores average zero, objective is the sample variance), footnote 2 p.501 (PDF 507), §12.2.3 eqs. (12.8)-(12.11) pp.505-506 (PDF 511-512), §12.2.4 p.509 (PDF 515)"
    - "NIST/SEMATECH e-Handbook of Statistical Methods §6.5.5.1 (component variances are the eigenvalues; Kaiser (1966) eigenvalues greater than unity) and §6.5.5.2 (eigenvalues of R sum to p; det R = product of eigenvalues) — https://www.itl.nist.gov/div898/handbook/pmc/section5/pmc551.htm , https://www.itl.nist.gov/div898/handbook/pmc/section5/pmc552.htm"
    - "Minitab Support, Principal Components Analysis, 'Interpret all statistics and graphs' (Kaiser criterion) and 'Methods and formulas' (rank r < p gives p − r zero eigenvalues; multicollinearity) — https://support.minitab.com/en-us/minitab/help-and-how-to/statistical-modeling/multivariate/how-to/principal-components/methods-and-formulas/methods-and-formulas"
    - "Penn State STAT 505 Lesson 11 'Principal Components Analysis' (scree plot of eigenvalues against i; cumulative-proportion targets) and Lesson 12 §12.5 (cumulative 80%, eigenvalues of at least one, scree elbow) — https://online.stat.psu.edu/stat505/Lesson11.html , https://online.stat.psu.edu/stat505/Lesson12.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Proportion of Variance Explained.md
---

![[Media/Figures/Proportion_of_Variance_Explained.svg|340]]

The **Proportion of Variance Explained** (PVE) is the share of the total variance of the data that one principal component captures in [[Principal Components Analysis|principal components analysis]]. It measures how much is lost by keeping only a few components. With each variable centred, the PVE of the $m$th principal component is

> $$\text{PVE}_m = \frac{\sum_{i=1}^{n} z_{im}^2}{\sum_{j=1}^{p}\sum_{i=1}^{n} x_{ij}^2}$$

- $z_{im}$ is the score of observation $i$ on the $m$th principal component.
- $x_{ij}$ is the centred value of variable $X_j$ for observation $i$.

The top is $n$ times the variance of the component's scores, and the bottom is $n$ times the total variance of the variables, so the $\frac{1}{n}$ cancels. The scores of a component average zero, because every variable is centred, so their variance has no mean to subtract.

> [!example]- Three observations of two variables are $(2, 9)$, $(6, 5)$ and $(7, 10)$. The first loading vector is $(0.707, -0.707)$. What proportion of the variance does the first principal component explain? {Example}
> - The means are 5 and 8, so the centred observations are $(-3, 1)$, $(1, -3)$ and $(2, 2)$.
> - Their scores are $-2.83$, $2.83$ and $0$, and the sum of the squared scores is $16$.
> - The sum of the squared centred values is $9 + 1 + 1 + 9 + 4 + 4 = 28$.
> - The proportion of variance explained is $16/28 = 0.571$.

## Proportion of variance explained from the eigenvalues

The variance of the $m$th principal component is the $m$th largest eigenvalue $\lambda_m$ of the covariance matrix of the variables, or of their correlation matrix when the variables are standardized. The proportion of variance explained by the $m$th principal component is then

> $$\text{PVE}_m = \frac{\lambda_m}{\lambda_1 + \lambda_2 + \cdots + \lambda_p}$$

The sum of the eigenvalues is the total variance. On standardized data each variable has variance 1, so the eigenvalues sum to $p$ and $\text{PVE}_m = \lambda_m/p$. A component with $\lambda_m > 1$ then carries more than one variable's worth of variance. With the sample variance, each standardized variable has sum of squares $n - 1$, so every variable contributes equally to the bottom of the first formula.

> [!example]- PCA on 8 standardized rating variables gives eigenvalues 3.6, 1.9, 1.0, 0.6, 0.4, 0.3, 0.2 and 0.0. What proportion of the variance does the first principal component explain? {Example}
> - The variables are standardized, so the eigenvalues sum to $p = 8$.
> - The first component explains $3.6/8 = 45\%$ of the variance.

## Cumulative proportion of variance explained

The cumulative proportion of variance explained by the first $M$ principal components is

> $$\text{PVE}_1 + \text{PVE}_2 + \cdots + \text{PVE}_M$$

The components are ordered by the variance they explain, so the PVE never increases from one component to the next. The cumulative PVE never decreases, and it reaches 1 at the last component, since all the components together explain all of the variance. Using all of them reduces nothing, so the aim is the fewest components that capture enough of the variance. The number is read off a [[Scree Plot|scree plot]], or chosen by adding components in order until the cumulative PVE reaches a target such as 90%.

> [!example]- The eight eigenvalues are 3.6, 1.9, 1.0, 0.6, 0.4, 0.3, 0.2 and 0.0. How many principal components are needed to explain at least 80% of the variance? {Example}
> - The first three components explain $3.6/8 = 45\%$, $1.9/8 = 23.75\%$ and $1.0/8 = 12.5\%$.
> - The cumulative PVE is 45%, then 68.75%, then 81.25%.
> - Three components reach 80%, which cuts eight variables to three at a cost of 18.75% of the variance.

> [!trap] Variance explained is not prediction
> A component with a high PVE captures variation in the variables, not in a response. It need not be related to the response at all, which is why PCA is [[Unsupervised Learning|unsupervised]].
