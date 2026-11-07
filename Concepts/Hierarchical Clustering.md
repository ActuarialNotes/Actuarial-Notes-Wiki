---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:b3adbde7b771c3644fab4024ba4c78f0438e29a1549a47a978be71e415fbf3b9
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §12.4, pp.516-531 (PDF 523-538), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Hierarchical Clustering.md
---

![[Media/Figures/Hierarchical_Clustering.svg|340]]

**Hierarchical Clustering** is a [[Clustering|clustering]] method that builds a nested sequence of clusters, recorded as a [[Dendrogram|dendrogram]], without choosing the number of clusters in advance. Agglomerative, or bottom-up, hierarchical clustering runs as follows:

1. Start with each of the $n$ observations as its own cluster, and compute the dissimilarity of every pair of observations.
2. Fuse the two clusters that are least dissimilar. The height of the fusion in the dendrogram is their dissimilarity.
3. Compute the dissimilarity between the new cluster and each other cluster, using the [[Linkage|linkage]].
4. Repeat steps 2 and 3 until all the observations are in one cluster.

Each fusion reduces the number of clusters by one. A divisive, or top-down, version starts from one cluster and splits one cluster in two at each step. Both give nested clusters with a parent-child structure.

> [!example]- Four territories have dissimilarities $d_{12} = 2$, $d_{13} = 6$, $d_{14} = 10$, $d_{23} = 5$, $d_{24} = 9$ and $d_{34} = 4$. What does agglomerative clustering with complete linkage do? {Example}
> - The smallest dissimilarity is $d_{12} = 2$, so $\{1, 2\}$ fuse at height 2.
> - Under complete linkage $\{1, 2\}$ is $\max(6, 5) = 6$ from territory 3 and $\max(10, 9) = 10$ from territory 4.
> - The smallest is now $d_{34} = 4$, so $\{3, 4\}$ fuse at height 4.
> - The two clusters are $\max(6, 10, 5, 9) = 10$ apart, so they fuse at height 10.
> - Cutting between heights 4 and 10 gives the clusters $\{1, 2\}$ and $\{3, 4\}$.

## Properties of hierarchical clustering

Hierarchical clustering has no random start. Given the data, the dissimilarity measure and the linkage, it always gives the same dendrogram. It is run once, and any number of clusters is obtained by cutting the dendrogram at the right height, without running it again. It stores every pairwise dissimilarity, so it needs memory in proportion to $n^2$ and does not scale to very large data sets as K-means does.

The nesting is an assumption. If the best two clusters and the best three clusters are not nested, cutting the dendrogram gives worse clusters than [[K-Means Clustering|K-means]], which finds the clusters afresh for each $K$.

> [!example]- A group of people splits best into two clusters by sex and into three clusters by nationality. Why can hierarchical clustering do worse here than K-means? {Example}
> - The three nationality clusters are not obtained by splitting one of the two sex clusters.
> - Hierarchical clustering forces the three-cluster solution to nest inside the two-cluster one, so it cannot find the nationality clusters.
> - K-means with $K = 3$ starts afresh and is not tied to the two-cluster solution.
