---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:256b6ec5585db5d7cf0ab4efa1a12d82778b1267357c688ea87ec7ed490ef3a3
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §12.4, pp.516-531 (PDF 523-538), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/K-Means Clustering.md
---

**K-Means Clustering** is a partition-based [[Clustering]] algorithm that partitions $n$ observations into $K$ non-overlapping clusters by minimizing **total within-cluster variance** (the within-cluster sum of squares, WCSS).

> $$\text{WCSS} = \sum_{k=1}^K \sum_{i \in C_k} \sum_{j=1}^p (x_{ij} - \bar{x}_{kj})^2$$

> $$= \sum_{k=1}^K |C_k| \cdot \text{Var}(C_k)$$

**K-Means algorithm (Lloyd's algorithm):**
1. **Initialize**: randomly assign each observation to one of $K$ clusters
2. **Update**: compute each cluster centroid as the mean of its assigned observations
3. **Assign**: assign each observation to the nearest centroid (by Euclidean distance)
4. Repeat steps 2–3 until assignments do not change (convergence)

- The algorithm is guaranteed to **converge** but may reach a **local minimum** — run multiple times with different initializations and keep the best result (lowest WCSS)
- **Choosing $K$**: use the **elbow method** (plot WCSS vs. $K$; look for an elbow where WCSS stops decreasing sharply) or silhouette scores
- K-Means assumes clusters are **roughly spherical** and of **similar size** — it can perform poorly on elongated or irregularly shaped clusters
- **Scaling matters**: K-Means is distance-based, so whether the variables are first scaled to standard deviation one can change the clusters; the right choice depends on the application

![[Media/Figures/K-Means_Clustering.svg|340]]

> [!example]- One Iteration of K-Means {Example}
> Three observations are $x_1 = 2$, $x_2 = 5$, $x_3 = 9$ (1D). Initial centroids are $c_1 = 2$ and $c_2 = 5$. Perform one update step.
>
> > [!answer]-
> > **Assign**: $|x_1 - c_1| = 0 < |x_1 - c_2| = 3$ → $x_1 \in C_1$; $|x_2 - c_1| = 3 > |x_2 - c_2| = 0$ → $x_2 \in C_2$; $|x_3 - c_1| = 7 > |x_3 - c_2| = 4$ → $x_3 \in C_2$.
> > **Update**: $c_1 = 2$, $c_2 = (5 + 9)/2 = 7$.
> > New clusters: $C_1 = \{2\}$, $C_2 = \{5, 9\}$.
