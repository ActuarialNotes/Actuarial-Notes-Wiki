---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:117af22a86fa204743029cad47d2445313cd8644e91dd0fea23ef2e4c46daa9e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Scree Plot.md
---

A **scree plot** graphs the eigenvalues (or the [[Proportion of Variance Explained]]) of a [[Principal Components Analysis]] against the component number. The number of components worth keeping is read off the **elbow** — the point after which the curve flattens into scree.

> $$\text{plot } \lambda_m \ \text{(or } \mathrm{PVE}_m) \ \text{against } m = 1, 2, \dots, p$$

- The name is geological: the steep face is the components that matter, the rubble at the base is noise
- **Read the elbow, not the last drop.** Components after the bend add little variance each and are usually not interpretable
- Companion rules: keep $\lambda_m > 1$ on standardized data (each component must beat one original variable), or keep enough components to reach a cumulative PVE target
- The choice is **a judgement call** — there is no response to validate against, which is the general condition of [[Unsupervised Learning]]. A vague elbow means the data have no low-dimensional structure
- A cumulative-PVE plot beside the scree plot makes the tradeoff explicit

![[Media/Figures/Scree_Plot.svg|340]]

> [!example]- Reading the Elbow {Example}
> Eigenvalues from six standardized variables: 2.9, 1.6, 0.7, 0.4, 0.3, 0.1. Where is the elbow, and does the Kaiser rule agree?
>
> > [!answer]-
> > Drops between successive eigenvalues: $1.3,\ 0.9,\ 0.3,\ 0.1,\ 0.2$. The large falls stop after the second component — the **elbow is at $m = 2$**, and components 3–6 form a flat tail.
> > Kaiser ($\lambda > 1$) also keeps two: 2.9 and 1.6. The two components carry $(2.9+1.6)/6 = 75\%$ of the variance.
