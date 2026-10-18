---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:cbda2685b30ec19db51533bb17f7d258a0d2f11aee3660e7017887ce0ca37386
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §12.4, pp.516-531 (PDF 523-538), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Hierarchical Clustering.md
---

**Hierarchical clustering** builds a nested sequence of groupings without committing to a number of clusters up front. Agglomerative clustering starts with every observation in its own cluster and repeatedly fuses the two closest, recording the whole history as a [[Dendrogram]].

> $$\text{repeat: fuse the pair minimizing } d(C_i, C_j) \text{ until one cluster remains}$$
>
> $$d(C_i, C_j) \text{ is set by the linkage rule}$$

- Needs a **dissimilarity measure** between observations (usually Euclidean distance, sometimes correlation-based) and a [[Linkage|linkage]] rule to extend it to clusters
- No $K$ is chosen in advance — the number of clusters is decided *afterwards* by choosing a height at which to cut the dendrogram
- **Deterministic**: unlike [[K-Means Clustering]] there is no random initialization, so the same data always give the same tree
- The nested structure is an **assumption**: forcing a hierarchy on data whose natural groupings are not nested (e.g. splitting by sex and by nationality) distorts the result
- $O(n^2)$ memory in the distance matrix, so it does not scale to very large datasets the way $K$-means does

![[Media/Figures/Hierarchical_Clustering.svg|340]]

> [!example]- Fusing Four Territories {Example}
> Four territories have pairwise distances $d(1,2)=2$, $d(1,3)=6$, $d(1,4)=10$, $d(2,3)=5$, $d(2,4)=9$, $d(3,4)=4$. Trace complete-linkage agglomerative clustering.
>
> > [!answer]-
> > **Step 1:** smallest distance is $d(1,2) = 2$ → fuse $\{1,2\}$ at height 2.
> > **Step 2:** remaining distances under complete linkage — $d(\{1,2\},3) = \max(6,5) = 6$; $d(\{1,2\},4) = \max(10,9) = 10$; $d(3,4) = 4$. Smallest is 4 → fuse $\{3,4\}$ at height 4.
> > **Step 3:** $d(\{1,2\},\{3,4\}) = \max(6,10,5,9) = 10$ → fuse at height 10.
> > Cutting between heights 4 and 10 gives the two clusters $\{1,2\}$ and $\{3,4\}$.
