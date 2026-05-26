**K-Means Clustering** is a partition-based [[Clustering]] algorithm that partitions $n$ observations into $K$ non-overlapping clusters by minimizing **total within-cluster variance** (the within-cluster sum of squares, WCSS).

> $$\text{WCSS} = \sum_{k=1}^K \sum_{i \in C_k} \sum_{j=1}^p (x_{ij} - \bar{x}_{kj})^2 = \sum_{k=1}^K |C_k| \cdot \text{Var}(C_k)$$

**K-Means algorithm (Lloyd's algorithm):**
1. **Initialize**: randomly assign each observation to one of $K$ clusters
2. **Assign**: assign each observation to the nearest centroid (by Euclidean distance)
3. **Update**: recompute each cluster centroid as the mean of its assigned observations
4. Repeat steps 2–3 until assignments do not change (convergence)

- The algorithm is guaranteed to **converge** but may reach a **local minimum** — run multiple times with different initializations and keep the best result (lowest WCSS)
- **Choosing $K$**: use the **elbow method** (plot WCSS vs. $K$; look for an elbow where WCSS stops decreasing sharply) or silhouette scores
- K-Means assumes clusters are **roughly spherical** and of **similar size** — it can perform poorly on elongated or irregularly shaped clusters
- Predictors must be **standardized** since K-Means is distance-based and scale-sensitive

> [!example]- One Iteration of K-Means {Example}
> Three observations are $x_1 = 2$, $x_2 = 5$, $x_3 = 9$ (1D). Initial centroids are $c_1 = 2$ and $c_2 = 5$. Perform one update step.
>
> > [!answer]-
> > **Assign**: $|x_1 - c_1| = 0 < |x_1 - c_2| = 3$ → $x_1 \in C_1$; $|x_2 - c_1| = 3 = |x_2 - c_2| = 0$ → $x_2 \in C_2$; $|x_3 - c_1| = 7 > |x_3 - c_2| = 4$ → $x_3 \in C_2$.
> > **Update**: $c_1 = 2$, $c_2 = (5 + 9)/2 = 7$.
> > New clusters: $C_1 = \{2\}$, $C_2 = \{5, 9\}$.
