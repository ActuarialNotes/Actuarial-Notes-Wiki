---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:checker-islr-b
  content_hash: sha256:bf9d82e145393e6c9071dccacdfbe7154a234e20dd4e5070c0875971ae7d9d69
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, footnote 2 p.501 (PDF 507), §12.2.1 USArrests pp.501-503 (PDF 507-509: crime variables share PC1, UrbanPop 'less correlated with the other three' carries most of PC2), §12.2.3 p.506 (PDF 512: PVEs sum to one; scree plot), Fig. 12.3 and §12.2.4 p.509 (PDF 515: elbow, ad hoc)"
    - "Minitab Support, Principal Components Analysis, 'Interpret all statistics and graphs' (Kaiser criterion) and 'Methods and formulas' (rank r < p gives p − r zero eigenvalues; multicollinearity) — https://support.minitab.com/en-us/minitab/help-and-how-to/statistical-modeling/multivariate/how-to/principal-components/methods-and-formulas/methods-and-formulas"
    - "NIST/SEMATECH e-Handbook of Statistical Methods §6.5.5.1 (component variances are the eigenvalues; Kaiser (1966) eigenvalues greater than unity) and §6.5.5.2 (eigenvalues of R sum to p; det R = product of eigenvalues) — https://www.itl.nist.gov/div898/handbook/pmc/section5/pmc551.htm , https://www.itl.nist.gov/div898/handbook/pmc/section5/pmc552.htm"
    - "Penn State STAT 505 Lesson 11 'Principal Components Analysis' (scree plot of eigenvalues against i; cumulative-proportion targets) and Lesson 12 §12.5 (cumulative 80%, eigenvalues of at least one, scree elbow) — https://online.stat.psu.edu/stat505/Lesson11.html , https://online.stat.psu.edu/stat505/Lesson12.html"
    - "Shalizi, 36-401 Lecture 17 'Multicollinearity' (CMU, Fall 2015), pp.2-3, 8-10 (zero eigenvalue ⇔ singular ⇔ exact linear combination; correlation entries (nearly) ±1), sha256:d8115efaaad92aacf470b4ba842b184c2906aba30816c4f6ae2a13b8c1327380 — https://www.stat.cmu.edu/~cshalizi/mreg/15/lectures/lecture-17.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Scree Plot.md
---

![[Media/Figures/Scree_Plot.svg|340]]

A **Scree Plot** is a plot of the [[Proportion of Variance Explained|proportion of variance explained]] by each principal component, or of its eigenvalue, against the component number, in decreasing order. It is used to decide how many components of a [[Principal Components Analysis|principal components analysis]] to keep. The usual rules are:

1. Keep the components before the elbow, the point after which the curve flattens.
2. On standardized data, keep the components whose eigenvalue is greater than 1, since each must carry more than one variable's variance.
3. Keep enough components to reach a target cumulative proportion of variance explained.

The components after the elbow each add little variance, and they tend to reflect noise, while the first components capture the main structure. The choice is a judgment, because there is no response to validate it against, which is the general condition of [[Unsupervised Learning|unsupervised learning]]. A plot of the cumulative proportion of variance explained beside the scree plot shows the tradeoff.

> [!example]- PCA on six standardized variables gives eigenvalues 2.9, 1.6, 0.7, 0.4, 0.3 and 0.1. Where is the elbow, and does the eigenvalue rule agree? {Example}
> - The drops between successive eigenvalues are 1.3, 0.9, 0.3, 0.1 and 0.2.
> - The large drops stop after the second component, so the elbow is at $m = 2$ and components 3 to 6 form a flat tail.
> - Two eigenvalues, 2.9 and 1.6, are greater than 1, so the eigenvalue rule also keeps two.
> - The two components explain $(2.9 + 1.6)/6 = 75\%$ of the variance.

## Zero eigenvalues

If the covariance or correlation matrix has rank $r < p$, the matrix is singular and $p - r$ of its eigenvalues are exactly zero. This happens when one variable is an exact linear combination of others, as when two variables have correlation $\pm 1$. The scree plot then falls to zero, and the cumulative proportion of variance explained reaches 100% before the last component and stays there.

> [!example]- Three standardized variables are analysed, and the third is an exact linear combination of the first two. What does the scree plot show at the third component? {Example}
> - The matrix has rank 2, so $3 - 2 = 1$ eigenvalue is zero.
> - The scree plot falls to zero at the third component.
> - The first two components already explain 100% of the variance.

## Correlated and uncorrelated variables

A group of highly correlated variables loads together on one dominant component. A variable nearly uncorrelated with the rest is left largely to a component of its own.

> [!example]- Four standardized variables are analysed. Three are highly correlated with each other, and the fourth is nearly uncorrelated with them. What does the scree plot look like? {Example}
> - The three correlated variables share one large first component.
> - The fourth variable is left to a second component of its own, with an eigenvalue near 1.
> - The last two eigenvalues are small, so the elbow comes after the second component.
