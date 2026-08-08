A **dendrogram** is the tree that records a [[Hierarchical Clustering|hierarchical clustering]]. Each fusion is drawn as a horizontal bar at the height of the dissimilarity at which it happened, so cutting the tree at a chosen height reads off a set of clusters.

> $$\text{cut at height } h \;\Longrightarrow\; \text{the clusters joined below } h$$

- **Height is the only thing that means anything.** The lower two observations fuse, the more similar they are
- **Horizontal position means nothing.** There are $2^{n-1}$ ways to draw the same tree by swapping branches at each node, so two leaves being side by side says nothing about their similarity — read down to where they *fuse*
- One tree gives every $K$ at once: cutting high gives few clusters, cutting low gives many
- A long vertical stretch with no fusions is the natural place to cut — the analogue of a [[Scree Plot]] elbow
- Cluster-level structure depends on the [[Linkage]] choice: single linkage produces long straggly chains and unbalanced trees, complete and average linkage more even, more interpretable ones

![[Media/Figures/Dendrogram.svg|340]]

> [!example]- Which Pair Is More Similar? {Example}
> On a dendrogram, leaves A and B sit next to each other but fuse only at height 9; leaves A and C are drawn far apart but fuse at height 3. Which pair is more similar?
>
> > [!answer]-
> > **A and C.** They fuse at height 3 — the clusters containing them merge at a dissimilarity of 3, against 9 for A and B.
> > Being adjacent on the page is an artefact of how the branches happened to be drawn: any node can be flipped without changing the clustering. The classic misreading, and a routine exam trap.
