---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:853e277fefbf1b89af106ce23e8cfdfbe54c28638202abc170e7afda56056201
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §12.4, pp.516-531 (PDF 523-538), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Dendrogram.md
---

![[Media/Figures/Dendrogram.svg|340]]

A **Dendrogram** is the upside-down tree that records a [[Hierarchical Clustering|hierarchical clustering]]. Each leaf at the bottom is an observation, and each fusion of two clusters is drawn at a height equal to the dissimilarity between them when they fused. It is read as follows:

1. The lower two observations fuse, the more similar they are.
2. Horizontal position means nothing. The same tree can be drawn in $2^{n-1}$ ways by swapping the two branches at each fusion.
3. Cutting the tree at a height gives the clusters joined below that height.

> [!example]- On a dendrogram, leaves A and B sit next to each other but fuse at height 9, while leaves A and C are drawn far apart but fuse at height 3. Which pair is more similar? {Example}
> - The height of the fusion is what measures dissimilarity.
> - A and C fuse at height 3, while A and B fuse only at height 9.
> - A and C are more similar. A and B being side by side is only how the branches happened to be drawn.

## Cutting the dendrogram

One dendrogram gives every number of clusters. At the lowest height each observation is its own cluster, and cutting higher gives fewer clusters. A long vertical stretch with no fusions is the natural place to cut, since the clusters on either side of it are well separated.

> [!example]- A dendrogram's fusions are at heights 2, 4 and 10. Where is the natural cut, and how many clusters does it give? {Example}
> - The longest stretch with no fusion is from height 4 to height 10.
> - Cutting in that stretch gives two clusters.
> - Cutting below height 2 gives four clusters, and above height 10 one.

The shape of the dendrogram depends on the [[Linkage|linkage]]. Single linkage gives long, straggly chains and an unbalanced tree. Complete and average linkage give more balanced trees, which are easier to interpret.
