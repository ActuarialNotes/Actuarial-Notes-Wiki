---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:06dbceaf8406ad286333dc9d37102675f0a73de5719cdad663fd969c64ed9e0c
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §12.2.3-12.2.4, pp.504-508 (PDF 511-515), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Scree Plot.md
---

A **scree plot** graphs the eigenvalues (or the [[Proportion of Variance Explained]]) of a [[Principal Components Analysis]] against the component number. The number of components worth keeping is read off the **elbow** — the point after which the curve flattens into scree.

> $$\text{plot } \lambda_m \ \text{(or } \mathrm{PVE}_m) \ \text{against } m = 1, 2, \dots, p$$

- The name is geological: the steep face is the components that matter, the rubble at the base is noise
- **Read the elbow, not the last drop.** Components after the bend add little variance each and are usually not interpretable
- Companion rules: keep $\lambda_m > 1$ on standardized data (each component must beat one original variable), or keep enough components to reach a cumulative PVE target
- **A zero eigenvalue.** If the covariance (or correlation) matrix has rank $r < p$ — one variable an exact linear combination of others, as when two variables have correlation $\pm 1$ — the matrix is singular and $p - r$ eigenvalues are exactly zero: the scree plot falls to zero and the cumulative PVE reaches 100% before the last component, then stays flat
- **Correlated variables share a component; an unrelated one gets its own.** A group of highly correlated variables loads together on one dominant component, while a variable nearly uncorrelated with the rest is left largely to a component of its own; on standardized data that component's eigenvalue is close to 1, the variance of the one variable it carries
- The choice is **a judgement call** — there is no response to validate against, which is the general condition of [[Unsupervised Learning]]
- A cumulative-PVE plot beside the scree plot makes the tradeoff explicit

![[Media/Figures/Scree_Plot.svg|340]]

> [!example]- Reading the Elbow {Example}
> Eigenvalues from six standardized variables: 2.9, 1.6, 0.7, 0.4, 0.3, 0.1. Where is the elbow, and does the Kaiser rule agree?
>
> > [!answer]-
> > Drops between successive eigenvalues: $1.3,\ 0.9,\ 0.3,\ 0.1,\ 0.2$. The large falls stop after the second component — the **elbow is at $m = 2$**, and components 3–6 form a flat tail.
> > Kaiser ($\lambda > 1$) also keeps two: 2.9 and 1.6. The two components carry $(2.9+1.6)/6 = 75\%$ of the variance.
