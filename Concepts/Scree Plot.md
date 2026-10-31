---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:checker-islr-b
  content_hash: sha256:51b26d74115f5e073337175f6c66d6a462d65c7e4207d040e27bee7f033542e8
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

A **scree plot** graphs the eigenvalues (or the [[Proportion of Variance Explained]]) of a [[Principal Components Analysis]] against the component number. The number of components worth keeping is read off the **elbow** — the point after which the curve flattens into scree.

> $$\text{plot } \lambda_m \ \text{(or } \mathrm{PVE}_m) \ \text{against } m = 1, 2, \dots, p$$

- The name is geological: the steep face is the components that matter, the rubble at the base is noise
- **Read the elbow, not the last drop.** Components after the bend add little variance each and are usually not interpretable
- Companion rules: keep $\lambda_m > 1$ on standardized data (each component must beat one original variable), or keep enough components to reach a cumulative PVE target
- **A zero eigenvalue.** If the covariance (or correlation) matrix has rank $r < p$ — one variable an exact linear combination of others, as when two variables have correlation $\pm 1$ — the matrix is singular and $p - r$ eigenvalues are exactly zero: the scree plot falls to zero and the cumulative PVE reaches 100% before the last component, then stays flat
- **Correlated variables share a component; an unrelated one gets its own.** A group of highly correlated variables loads together on one dominant component, while a variable nearly uncorrelated with the rest is left largely to a component of its own
- The choice is **a judgement call** — there is no response to validate against, which is the general condition of [[Unsupervised Learning]]
- A cumulative-PVE plot beside the scree plot makes the tradeoff explicit

![[Media/Figures/Scree_Plot.svg|340]]

> [!example]- Reading the Elbow {Example}
> Eigenvalues from six standardized variables: 2.9, 1.6, 0.7, 0.4, 0.3, 0.1. Where is the elbow, and does the Kaiser rule agree?
>
> > [!answer]-
> > Drops between successive eigenvalues: $1.3,\ 0.9,\ 0.3,\ 0.1,\ 0.2$. The large falls stop after the second component — the **elbow is at $m = 2$**, and components 3–6 form a flat tail.
> > Kaiser ($\lambda > 1$) also keeps two: 2.9 and 1.6. The two components carry $(2.9+1.6)/6 = 75\%$ of the variance.
