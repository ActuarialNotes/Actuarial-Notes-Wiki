---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:bda320586fffefb42a8bca801c5348c740dea04e3202c29eeb0af299e64cc74b
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §12.4, pp.516-531 (PDF 523-538), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Linkage.md
---

**Linkage** is the rule that turns a dissimilarity between *observations* into a dissimilarity between *clusters*, so that [[Hierarchical Clustering]] can decide which pair of clusters to fuse next.

> $$\text{complete: } \max_{i \in A,\, j \in B} d_{ij} \qquad \text{single: } \min_{i \in A,\, j \in B} d_{ij}$$
>
> $$\text{average: } \frac{1}{\lvert A\rvert\lvert B\rvert}\sum_{i \in A}\sum_{j \in B} d_{ij}$$

| Linkage | Cluster distance | Behaviour |
| :--- | :--- | :--- |
| **Complete** | largest pairwise | balanced dendrograms |
| **Single** | smallest pairwise | chaining: long, straggly clusters, unbalanced [[Dendrogram]] |
| **Average** | mean pairwise | balanced dendrograms |
| **Centroid** | distance between centroids | can **invert** — a fusion below an earlier one, which makes the dendrogram unreadable |

- Complete and average linkage are preferred in practice because they give balanced, interpretable dendrograms
- **Single linkage chains**: two well-separated clusters joined by a thin bridge of intermediate points will be fused, because only the nearest pair counts
- The dissimilarity measure matters as much as the linkage — Euclidean distance groups by magnitude, correlation-based distance groups by *shape* regardless of magnitude
- Whether to **scale** the variables to standard deviation one first is a decision that changes the dendrogram: unscaled, the largest-scaled variable dominates every distance; the right choice depends on the application

![[Media/Figures/Linkage.svg|340]]

> [!example]- Same Data, Different Linkage {Example}
> Using the distances $d(1,2)=2$, $d(1,3)=6$, $d(2,3)=5$: at what height do clusters $\{1,2\}$ and $\{3\}$ fuse under complete, single and average linkage?
>
> > [!answer]-
> > $$\text{complete: } \max(6, 5) = 6 \qquad \text{single: } \min(6,5) = 5 \qquad \text{average: } \tfrac{6+5}{2} = 5.5$$
> > Same data, three different fusion heights — and with more clusters in play, potentially a different fusion *order* and a genuinely different clustering.
