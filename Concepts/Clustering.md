---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:9067cc2d7502d82cfe60773669810061b054f6928d3581fabde43fe933f26a4f
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §12.4 intro market segmentation (PDF p.522), hierarchical algorithm and dendrogram cut (PDF pp.530-532), Table 12.3 linkage and inversions (PDF pp.531-532), §12.4.2 dissimilarity and scaling (PDF pp.534-535), §4.1 fraud as classification (PDF p.140), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch 11 'Clustering' (PDF p.203), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
    - "CAS Exam MAS-II Content Outline 2026, Domain C tasks 5-8 (PDF p.3) and James reading list (PDF p.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Clustering.md
---

**Clustering** is an unsupervised [[Statistical Learning]] technique that groups observations into clusters so that observations within a cluster are similar to each other and dissimilar from those in other clusters. There is no response variable $Y$ — the goal is to discover structure in $\mathbf{X}$.

**Two main families:**

| Family | Example Methods | Key Property |
| :--- | :--- | :--- |
| **Partition-based** | [[K-Means Clustering]] | Requires $K$ prespecified; minimizes within-cluster variance |
| **Hierarchical** | Complete/single/average/centroid linkage | Produces a dendrogram; no need to prespecify $K$ |

**Hierarchical clustering algorithm:**
1. Start with each observation in its own cluster ($n$ clusters)
2. Merge the two most similar clusters using a **linkage criterion**
3. Repeat until all observations are in one cluster
4. Cut the dendrogram at a chosen height to obtain $K$ clusters

**Linkage methods** (how inter-cluster distance is defined):
- **Complete**: maximum distance between any pair of points in the two clusters
- **Single**: minimum distance (can produce chaining)
- **Average**: average distance between all pairs across clusters
- **Centroid**: distance between the two clusters' centroids (mean vectors); can produce **inversions**, where two clusters fuse at a height below either of them in the dendrogram

- Clustering requires a **dissimilarity measure** (e.g., Euclidean distance, correlation-based distance); whether to **standardize** the variables (to standard deviation one) depends on the application: it gives every variable equal weight, and is advisable when they are measured on different scales
- Used in actuarial science for **policyholder segmentation** and **territory grouping**
- **Choices that change the answer** (James et al., §12.4.3): whether to standardize, which dissimilarity measure and linkage to use, where to cut the dendrogram, and how many clusters to ask $K$-means for. Each can change the clusters, so try several and keep the most useful and interpretable result. See [[Similarity and Distance Measures]]
- **Clusters are always found:** Clustering returns clusters whether or not the data contain real subgroups. Whether they would reappear in an independent sample is a hard question, so clusters used as [[Data Segmentation|segments]] should be checked on other data and against what the business knows

![[Media/Figures/Clustering.svg|340]]

> [!example]- Choosing the Number of Clusters {Example}
> An actuary applies hierarchical clustering to 500 policyholders using vehicle and driver characteristics. The dendrogram shows large height gaps between 3 and 4 clusters. What does this suggest?
>
> > [!answer]-
> > A large gap in the dendrogram between merging 4 clusters into 3 indicates that those 4 clusters are naturally distinct — merging them requires combining very dissimilar groups. This suggests **$K = 4$ clusters** is a natural choice.

> [!tip]- How it appears on the exam
> - **DISC-DA:** Section 8.4 covers segmenting data with cluster analysis. Questions describe policyholder or claim data with no target and ask which technique groups them, what standardizing the features would change, or how to read a dendrogram or choose the number of clusters.
> - **MAS-II:** Questions apply $K$-means and hierarchical clustering mechanics, such as linkage choices and the effect of scaling, from James et al. Chapter 12.

> [!warning]- Exam traps
> - **Clustering is not classification:** There is no response variable. A method trained on labeled outcomes is supervised, not cluster analysis.
> - **Unscaled features:** On raw data, the feature with the largest numbers dominates the distances and so the clusters.
> - **Single linkage chains:** It tends to string observations into long, unbalanced clusters; average and complete linkage give more balanced ones.
