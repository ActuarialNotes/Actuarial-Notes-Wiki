---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:35873597ef5fd336c9d1cb403daa8fe17b0a50d2ace30a213b9f42cc97028619
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Clustering.md
---

**Clustering** is an unsupervised [[Statistical Learning]] technique that groups observations into clusters so that observations within a cluster are similar to each other and dissimilar from those in other clusters. There is no response variable $Y$ — the goal is to discover structure in $\mathbf{X}$.

**Two main families:**

| Family | Example Methods | Key Property |
| :--- | :--- | :--- |
| **Partition-based** | [[K-Means Clustering]] | Requires $K$ prespecified; minimizes within-cluster variance |
| **Hierarchical** | Complete/single/average linkage | Produces a dendrogram; no need to prespecify $K$ |

**Hierarchical clustering algorithm:**
1. Start with each observation in its own cluster ($n$ clusters)
2. Merge the two most similar clusters using a **linkage criterion**
3. Repeat until all observations are in one cluster
4. Cut the dendrogram at a chosen height to obtain $K$ clusters

**Linkage methods** (how inter-cluster distance is defined):
- **Complete**: maximum distance between any pair of points in the two clusters
- **Single**: minimum distance (can produce chaining)
- **Average**: average distance between all pairs across clusters
- **Ward's**: minimizes total within-cluster variance (analogous to [[K-Means Clustering]])

- Clustering requires a **dissimilarity measure** (e.g., Euclidean distance, correlation-based distance); predictors should be **standardized**
- Used in actuarial science for **policyholder segmentation**, **territory grouping**, and **fraud detection**

![[Media/Figures/Clustering.svg|340]]

> [!example]- Choosing the Number of Clusters {Example}
> An actuary applies hierarchical clustering to 500 policyholders using vehicle and driver characteristics. The dendrogram shows large height gaps between 3 and 4 clusters. What does this suggest?
>
> > [!answer]-
> > A large gap in the dendrogram between merging 4 clusters into 3 indicates that those 4 clusters are naturally distinct — merging them requires combining very dissimilar groups. This suggests **$K = 4$ clusters** is a natural choice.
