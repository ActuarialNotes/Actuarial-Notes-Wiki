---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:89af366533b5a5963a49f7677ffad479e51ef68a8890a7dcb0e251c203241778
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §12.4.1 eqs (12.15)-(12.18), Algorithm 12.2, pp.517-520 (PDF 523-526); §12.4.3 pp.530-531 (PDF 536-537), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "GraphPad Prism Statistics Guide, K-means 'Tabular results', Within-cluster sum of squares, sha256:25fba4f68c7968816f2bb3f63f2b5d76cfbf7eea45061485c4e46a0d311ed764 — https://www.graphpad.com/guides/prism/latest/statistics/stat_kmeans_results_tabular_results.htm"
    - "Schwesinger, CPSC 558 lecture 'Clustering' (Kutztown University, Spring 2026), slide 12 'Choosing k', sha256:a0221d385bf130a18943c973c2213df48fa0e97d5296050aca322c78540cc728 — https://faculty.kutztown.edu/schwesin/spring2026/cpsc558/lectures/Clustering.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/K-Means Clustering.md
---

![[Media/Figures/K-Means_Clustering.svg|340]]

**K-Means Clustering** is a [[Clustering|clustering]] method that partitions $n$ observations into a number $K$ of non-overlapping clusters $C_1, \ldots, C_K$, specified in advance, making the total within-cluster variation as small as possible. The within-cluster variation of cluster $C_k$ is

> $$W(C_k) = \frac{1}{|C_k|}\sum_{i, i' \in C_k}\sum_{j=1}^{p}(x_{ij} - x_{i'j})^2$$

- $|C_k|$ is the number of observations in $C_k$.
- The sum runs over every ordered pair $i, i'$ of observations in $C_k$.

K-means chooses the clusters to minimize the total within-cluster variation $W(C_1) + W(C_2) + \cdots + W(C_K)$. Each cluster is a subgroup of observations that are close to each other.

> [!example]- One cluster holds the observations $(0, 0)$, $(2, 0)$ and $(1, 3)$. What is its within-cluster variation? {Example}
> - The squared distances between the three unordered pairs are $4$, $10$ and $10$, which total $24$.
> - Each pair is counted in both orders, so the sum is $48$.
> - $W(C_k) = 48/3 = 16$.

## Within-cluster variation from the centroid

The centroid of a cluster is the vector of the means of each feature over its observations. The within-cluster variation is also

> $$W(C_k) = 2\sum_{i \in C_k}\sum_{j=1}^{p}(x_{ij} - \bar{x}_{kj})^2$$

- $\bar{x}_{kj}$ is the mean of feature $j$ over the observations in $C_k$.

The sum of squared distances from the centroid, the within-cluster sum of squares, is half of $W(C_k)$, so minimizing either picks the same clusters.

> [!example]- The cluster holds $(0, 0)$, $(2, 0)$ and $(1, 3)$. What is its within-cluster variation from the centroid? {Example}
> - The centroid is $(1, 1)$.
> - The squared distances to it are $2$, $2$ and $4$, which total $8$.
> - $W(C_k) = 2 \times 8 = 16$, as from the pairs.

## The K-means algorithm

1. Randomly assign each observation to one of the $K$ clusters.
2. Compute the centroid of each cluster.
3. Assign each observation to the cluster whose centroid is nearest in Euclidean distance.
4. Repeat steps 2 and 3 until the assignments stop changing.

The algorithm has converged when an iteration changes no assignment, and the centroids then are the final ones. The means are the values that minimize a sum of squared deviations, so no iteration can raise the objective. The algorithm finds a local optimum, not necessarily the best clustering, and its result depends on the random start. It is run from several random starts, and the run with the smallest total within-cluster variation is kept.

> [!example]- The observations are 2, 5 and 9 on one variable, and the starting centroids are 2 and 5. What clusters does K-means with $K = 2$ end with? {Example}
> - In one dimension the Euclidean distance is the absolute difference.
> - 2 is nearest the centroid 2, and 5 and 9 are nearest the centroid 5, since $|9 - 5| = 4 < |9 - 2| = 7$.
> - The new centroids are 2 and $(5 + 9)/2 = 7$.
> - Reassigning changes nothing, since 5 is $2$ from 7 and $3$ from 2, so the clusters are $\{2\}$ and $\{5, 9\}$.

## Choosing the number of clusters

$K$ is fixed during the algorithm, so a different $K$ needs a new run. The best total within-cluster variation never rises as $K$ grows, and at $K = n$ every observation is its own cluster and the total is zero. Minimizing it therefore cannot choose $K$. There is no single agreed method: several values are tried and the most useful and interpretable result kept, with heuristics such as the elbow of a plot of the total within-cluster variation against $K$.

> [!example]- The total within-cluster variation for $K = 1, \ldots, 5$ is 100, 40, 25, 22 and 20. Which $K$ does the elbow suggest? {Example}
> - The drops are 60, 15, 3 and 2.
> - The large drops stop after $K = 3$, so the elbow suggests three clusters.

K-means does not require standardized variables. Standardizing to mean zero and standard deviation one is often advisable, because K-means is distance-based and the variable with the largest scale would otherwise dominate. It works best when the clusters are roughly spherical and of similar size.

> [!trap] Pairwise or centroid form
> The pairwise form $W(C_k)$ is twice the within-cluster sum of squares about the centroid. For $(0, 0)$, $(2, 0)$ and $(1, 3)$ one is 16 and the other 8, so check which one a question asks for.
