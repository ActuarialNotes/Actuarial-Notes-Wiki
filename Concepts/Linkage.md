**Linkage** is the rule that turns a dissimilarity between *observations* into a dissimilarity between *clusters*, so that [[Hierarchical Clustering]] can decide which pair of clusters to fuse next.

> $$\text{complete: } \max_{i \in A,\, j \in B} d_{ij} \qquad \text{single: } \min_{i \in A,\, j \in B} d_{ij}$$
>
> $$\text{average: } \frac{1}{\lvert A\rvert\lvert B\rvert}\sum_{i \in A}\sum_{j \in B} d_{ij}$$

| Linkage | Cluster distance | Behaviour |
| :--- | :--- | :--- |
| **Complete** | largest pairwise | compact, balanced clusters — the usual default |
| **Single** | smallest pairwise | chaining: long, straggly clusters, unbalanced [[Dendrogram]] |
| **Average** | mean pairwise | balanced, less sensitive to outliers than complete |
| **Centroid** | distance between centroids | can **invert** — a fusion below an earlier one, which makes the dendrogram unreadable |

- Complete and average linkage are preferred in practice because they give balanced, interpretable dendrograms
- **Single linkage chains**: two well-separated clusters joined by a thin bridge of intermediate points will be fused, because only the nearest pair counts
- The dissimilarity measure matters as much as the linkage — Euclidean distance groups by magnitude, correlation-based distance groups by *shape* regardless of magnitude
- Variables must be **standardized** first whenever their units differ, or the largest-scaled variable dominates every distance

![[Media/Figures/Linkage.svg|340]]

> [!example]- Same Data, Different Linkage {Example}
> Using the distances $d(1,2)=2$, $d(1,3)=6$, $d(2,3)=5$: at what height do clusters $\{1,2\}$ and $\{3\}$ fuse under complete, single and average linkage?
>
> > [!answer]-
> > $$\text{complete: } \max(6, 5) = 6 \qquad \text{single: } \min(6,5) = 5 \qquad \text{average: } \tfrac{6+5}{2} = 5.5$$
> > Same data, three different fusion heights — and with more clusters in play, potentially a different fusion *order* and a genuinely different clustering.
