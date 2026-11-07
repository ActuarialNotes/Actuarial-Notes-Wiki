---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:8ea5fa3daa42a8e1e82b653f1c6880fbce8abf4a85a2032e7ee5a31a589f8696
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §12.4 opening p.517 (PDF 523); §12.4.3 Small Decisions, Validating the Clusters, Other Considerations, A Tempered Approach pp.530-532 (PDF 536-538), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Clustering.md
---

![[Media/Figures/Clustering.svg|340]]

**Clustering** is a set of [[Unsupervised Learning|unsupervised]] methods for finding subgroups, or clusters, among the observations of a data set, so that observations in a cluster are similar to each other and different from those in other clusters. There is no response variable, and the methods find structure only in the variables used. Clustering is often used in exploratory data analysis. The two main methods, [[K-Means Clustering|K-means]] and [[Hierarchical Clustering|hierarchical clustering]], compare as follows:

| | K-means | Hierarchical |
| :--- | :--- | :--- |
| Number of clusters $K$ | chosen in advance and fixed | chosen afterwards, by cutting the dendrogram |
| Start | a random assignment, so runs can differ | none, so the result is the same every time |
| Clusters for different $K$ | found afresh for each $K$ | nested |
| Result | $K$ clusters | a tree that gives every $K$ |

For the same number of clusters the two methods need not give the same clusters, because they use different algorithms.

> [!example]- Two analysts run K-means with $K = 3$ on the same data and get different clusters. Would hierarchical clustering cut at three clusters also differ between them? {Example}
> - K-means starts from a random assignment and finds only a local optimum, so two runs can give different clusters.
> - Hierarchical clustering has no random start, so with the same dissimilarity and linkage both analysts get the same dendrogram.
> - Cutting it at three clusters gives them the same clusters.

## Dissimilarity and scaling

Clustering needs a dissimilarity measure between observations, usually Euclidean distance, sometimes a correlation-based distance. When the variables are left on their raw scales, the distance is dominated by the variable with the largest numeric spread, so that variable drives the clusters. Standardizing each variable to standard deviation one gives every variable equal weight. Whether to standardize depends on the application, and it is advisable when the variables are measured in different units.

> [!example]- Two drivers are aged 30 and 60 and drive 12,000 and 12,500 miles a year. Which variable drives their Euclidean distance on the raw scales? {Example}
> - The distance is $\sqrt{30^2 + 500^2} = 500.9$.
> - Without the age difference it would be 500, so mileage decides almost all of it.
> - After standardizing, a 30-year age gap would count as much as a gap of the same number of standard deviations in mileage.

## Clustering the features

Clustering usually groups the observations on the basis of the features, to find subgroups among the observations. It can just as well group the features on the basis of the observations, to find subgroups among the features, by transposing the data matrix.

## Validating the clusters

Clustering returns clusters whether or not the data contain real subgroups. The results depend on choices that each change the clusters:

1. Whether to standardize the variables.
2. Which dissimilarity measure and which [[Linkage|linkage]] to use.
3. Where to cut the [[Dendrogram|dendrogram]], or how many clusters to ask K-means for.

Both K-means and hierarchical clustering force every observation into a cluster, so a few observations that belong to no subgroup can distort the clusters found. Neither is very robust either: clustering again after removing a random subset of the observations often gives quite different clusters. Several choices are tried, the most useful and interpretable result is kept, and subsets of the data are clustered to see which clusters hold up.

> [!example]- An insurer clusters its policyholders on telematics variables and wants to use the clusters as rating segments. What should it check first? {Example}
> - The clusters separate the policyholders in the telematics variables, which does not mean that they differ in expected losses, so they must be tested against loss experience.
> - Each cluster must be large enough for its experience to be credible.
> - The clusters must be stable on other data or another time period, since clustering finds clusters even where there are no real subgroups.

## Clustering in ratemaking

In risk classification, clustering groups risks or the levels of a rating variable into homogeneous groups, so that the variance within each group is small and the variance between groups is large. In territorial ratemaking it groups basic geographic units with similar smoothed relativities into territories.

> [!trap] Clustering is not classification
> Clustering uses no response. A method trained on labelled outcomes, such as a [[Decision Tree|decision tree]] that predicts claim occurrence, is supervised, not a cluster analysis.
