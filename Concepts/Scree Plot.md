---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:5e132f1bebf260865d3b3cc5e7f1d3010a3178b3bf8010c6deb7b38e0e78ea77
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
- The choice is **a judgement call** — there is no response to validate against, which is the general condition of [[Unsupervised Learning]]
- A cumulative-PVE plot beside the scree plot makes the tradeoff explicit

![[Media/Figures/Scree_Plot.svg|340]]

> [!example]- Reading the Elbow {Example}
> Eigenvalues from six standardized variables: 2.9, 1.6, 0.7, 0.4, 0.3, 0.1. Where is the elbow, and does the Kaiser rule agree?
>
> > [!answer]-
> > Drops between successive eigenvalues: $1.3,\ 0.9,\ 0.3,\ 0.1,\ 0.2$. The large falls stop after the second component — the **elbow is at $m = 2$**, and components 3–6 form a flat tail.
> > Kaiser ($\lambda > 1$) also keeps two: 2.9 and 1.6. The two components carry $(2.9+1.6)/6 = 75\%$ of the variance.
