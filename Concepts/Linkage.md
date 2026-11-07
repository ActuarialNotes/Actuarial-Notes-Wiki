---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:c4000c81e11efb20dd4bf54d9cdbd410157ac587eb6ef401738ba605133e2149
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §12.4, pp.516-531 (PDF 523-538), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Linkage.md
---

![[Media/Figures/Linkage.svg|340]]

A **Linkage** is the rule that extends the dissimilarity between two observations to a dissimilarity between two clusters, so that [[Hierarchical Clustering|hierarchical clustering]] can choose which pair of clusters to fuse next. For clusters $A$ and $B$, complete linkage is the largest dissimilarity between an observation of $A$ and an observation of $B$:

> $$d(A, B) = \max_{i \in A,\; i' \in B} d_{ii'}$$

- $d_{ii'}$ is the dissimilarity between observations $i$ and $i'$.

> [!example]- Observations 1, 2 and 3 have dissimilarities $d_{12} = 2$, $d_{13} = 6$ and $d_{23} = 5$. Under complete linkage, at what height do the clusters $\{1, 2\}$ and $\{3\}$ fuse? {Example}
> - The dissimilarities between the two clusters are $d_{13} = 6$ and $d_{23} = 5$.
> - Complete linkage takes the largest, so they fuse at height 6.

## Single linkage

Single linkage is the smallest dissimilarity between an observation of $A$ and an observation of $B$:

> $$d(A, B) = \min_{i \in A,\; i' \in B} d_{ii'}$$

Only the nearest pair counts, so two well-separated clusters joined by a thin bridge of intermediate points are fused. This chaining gives long, straggly clusters and an unbalanced [[Dendrogram|dendrogram]].

> [!example]- With $d_{13} = 6$ and $d_{23} = 5$, at what height do $\{1, 2\}$ and $\{3\}$ fuse under single linkage? {Example}
> - Single linkage takes the smallest, so they fuse at height 5.

## Average linkage

Average linkage is the mean of the dissimilarities between the observations of $A$ and those of $B$:

> $$d(A, B) = \frac{1}{|A|\,|B|}\sum_{i \in A}\sum_{i' \in B} d_{ii'}$$

- $|A|$ and $|B|$ are the numbers of observations in the two clusters.

> [!example]- With $d_{13} = 6$ and $d_{23} = 5$, at what height do $\{1, 2\}$ and $\{3\}$ fuse under average linkage? {Example}
> - There are $2 \times 1 = 2$ pairs between the clusters.
> - They fuse at height $(6 + 5)/2 = 5.5$.

## Centroid linkage

Centroid linkage is the dissimilarity between the centroids of the two clusters, the vectors of their feature means. It can give an inversion, in which two clusters fuse at a height below an earlier fusion, which makes the dendrogram hard to read.

> [!example]- Three observations are $(0, 0)$, $(1, 0)$ and $(0.5, 0.866)$, each pair 1 apart in Euclidean distance. What happens under centroid linkage? {Example}
> - Any two observations, say the first two, fuse first, at height 1.
> - Their centroid is $(0.5, 0)$, which is $0.866$ from the third observation.
> - The second fusion is at height $0.866$, below the first, which is an inversion.

Complete and average linkage are preferred in practice, because they give balanced dendrograms. The dissimilarity measure matters as much as the linkage: Euclidean distance groups observations by size, while a correlation-based distance groups them by the shape of their profile. Whether to scale the variables to standard deviation one first also changes the dendrogram, since unscaled the variable with the largest scale dominates every dissimilarity.

> [!trap] Recompute after every fusion
> After two clusters fuse, the dissimilarities from the new cluster to the others must be recomputed with the linkage. Different linkages can then fuse the clusters in a different order, so a dendrogram built from the first step's dissimilarities alone is wrong.
