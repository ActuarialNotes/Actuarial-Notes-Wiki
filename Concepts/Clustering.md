---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:35873597ef5fd336c9d1cb403daa8fe17b0a50d2ace30a213b9f42cc97028619
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §12.4 intro (PDF p.522), §12.4.1 K-means, §12.4.2 hierarchical clustering incl. dendrogram cut 'by eye' (PDF p.530), Table 12.3 linkage (PDF p.532), dissimilarity and scaling (PDF pp.534-535), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "R Documentation stats::hclust (R-devel manual), Details, sha256:328952439ed3b589585f167660963e8541969526986dce52e95d1b661585cec4 — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/hclust.html"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch 11 'Clustering' (PDF p.203), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
    - "CAS Exam MAS-II Content Outline 2026, Domain C tasks 7-8 (PDF p.3) and James reading list (PDF p.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 3
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
