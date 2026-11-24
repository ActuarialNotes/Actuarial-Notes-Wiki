---
id: "pa-an-018"
exam: "Exam PA"
topic: "Hierarchical Clustering"
learning_objective: "Data Transformations and Unsupervised Learning Techniques"
difficulty: medium
type: multi-part
bloom: apply
wiki_link:
  - Concepts/Hierarchical+Clustering
  - Concepts/Linkage
  - Concepts/Dendrogram
  - Concepts/K-Means+Clustering
points: 3
---

An actuary groups four territories by their loss experience using agglomerative hierarchical clustering. The dissimilarities between them are:

| | Territory 1 | Territory 2 | Territory 3 | Territory 4 |
| :--- | ---: | ---: | ---: | ---: |
| Territory 1 | 0 | 3 | 7 | 11 |
| Territory 2 | 3 | 0 | 4 | 8 |
| Territory 3 | 7 | 4 | 0 | 6 |
| Territory 4 | 11 | 8 | 6 | 0 |

## Part a (1 point)
With complete linkage, calculate the height at which the last two clusters fuse. Give your answer as a whole number.

### Answer
11

### Explanation
Complete linkage measures the dissimilarity between two clusters as the largest dissimilarity between an observation of one and an observation of the other.

1. The smallest dissimilarity is $d_{12} = 3$, so territories 1 and 2 fuse at height 3.
2. The cluster $\{1, 2\}$ is $\max(7, 4) = 7$ from territory 3 and $\max(11, 8) = 11$ from territory 4. The smallest remaining dissimilarity is $d_{34} = 6$, so territories 3 and 4 fuse at height 6.
3. The clusters $\{1, 2\}$ and $\{3, 4\}$ are $\max(7, 11, 4, 8) = 11$ apart, so they fuse at height **11**.

Entering **6** uses single linkage, which takes the smallest dissimilarity between the clusters; entering **7.5** uses average linkage, $(7 + 11 + 4 + 8)/4$.

## Part b (1 point)
The actuary repeats the clustering with single linkage and cuts the dendrogram at height 5. Which clusters result?

- A) $\{1, 2\}$, $\{3\}$ and $\{4\}$
- B) $\{1, 2\}$ and $\{3, 4\}$
- C) $\{1, 2, 3\}$ and $\{4\}$
- D) $\{1, 3\}$ and $\{2, 4\}$

### Answer
C

### Explanation
Single linkage takes the smallest dissimilarity between the clusters, recomputed after every fusion.

1. Territories 1 and 2 fuse at height 3.
2. $\{1, 2\}$ is $\min(7, 4) = 4$ from territory 3 and $\min(11, 8) = 8$ from territory 4, while $d_{34} = 6$. The smallest is 4, so territory 3 joins at height 4.
3. $\{1, 2, 3\}$ is $\min(11, 8, 6) = 6$ from territory 4, so the last fusion is at height 6.

Cutting at height 5 keeps the fusions below it, giving $\{1, 2, 3\}$ and $\{4\}$.

- **A** is the cut at height 5 of the complete-linkage dendrogram, whose second fusion is at 6.
- **B** is the complete-linkage dendrogram cut between 6 and 11; under single linkage territory 3 joins $\{1, 2\}$ before it could join territory 4.
- **D** pairs territories that are never the closest pair at any step.

## Part c (1 point)
The pricing committee wants to compare groupings into 2, 3 and 4 clusters. Which statement about hierarchical clustering, compared with K-means, is true?

- A) All three groupings come from one dendrogram, cut at different heights
- B) Each number of clusters needs its own run of hierarchical clustering
- C) Rerunning hierarchical clustering on the same data and linkage can give a different dendrogram, because of its random start
- D) Hierarchical clustering suits data sets with millions of policies better than K-means does

### Answer
A

### Explanation
Hierarchical clustering is run once, and any number of clusters is obtained by cutting the dendrogram at the right height. The answer is **A**.

- **B** describes K-means, which finds the clusters afresh for each $K$.
- **C** describes K-means too. Hierarchical clustering has no random start: given the data, the dissimilarity and the linkage, it always gives the same dendrogram.
- **D** is the reverse. Hierarchical clustering stores every pairwise dissimilarity, so its memory grows with $n^2$ and it does not scale to very large data sets as K-means does.
