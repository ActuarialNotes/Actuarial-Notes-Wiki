---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:7b8cf518369ce70c78f9f0abb260d1b5e840fdb54ef9809fe9dc674c67a88851
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §4.7.6 PDF p.193 (salary/age, yen); §12.4.1-12.4.2 PDF pp.533-536 (dissimilarity choice, online retailer, scaling), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "SciPy docs, scipy.spatial.distance.cityblock, definition, sha256:3ad0c340b7d389773e926a5bc1b891f6f29bcf89336ec34e2413b5d8f286f525 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.cityblock.html; SciPy docs, scipy.spatial.distance.minkowski, definition, sha256:2e0f85829595334b2fa7ac2fa5137429d1ee038e07dd1b5cf4cbe39a4cb17725 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.minkowski.html; SciPy docs, scipy.spatial.distance.hamming, definition, sha256:5e9a00450e4fd2da1723c587ccc89769226e19b9abca60dd9e41382526a5f7b4 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.hamming.html; SciPy docs, scipy.spatial.distance.jaccard, definition, sha256:57059b5d873f3326934e15ef4e74216370f277483f313f5812fce96713c2ae18 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.jaccard.html; SciPy docs, scipy.spatial.distance.cosine, definition, sha256:eac484bb1120d904d8f1e5a0882da931350befa0ecd41b90dc2869945cb1fb75 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.cosine.html"
    - "R cluster::daisy help page, Arguments and Details (Gower), sha256:9ae15cbff8e5e321e7b12d3662dc4c219be38e1aa5d7c9b2fc158aed259e7763 — https://stat.ethz.ch/R-manual/R-devel/library/cluster/html/daisy.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Similarity and Distance Measures.md
---
A **Similarity or Distance Measure** turns the difference between two observations' features into one number. A distance (or dissimilarity) is small when the observations are alike and large when they differ, and a similarity runs the other way. Methods that work by nearness, such as [[K-Nearest Neighbors|nearest-neighbor]] prediction and [[Clustering|clustering]], depend on the measure chosen and on how the features are scaled before it is applied.

For two observations $\mathbf{u}$ and $\mathbf{v}$ measured on the same $p$ features, the Euclidean distance, the straight-line distance between them, is

> $$d_{\text{Euc}}(\mathbf{u}, \mathbf{v}) = \sqrt{\sum_{j=1}^{p} (u_j - v_j)^2}$$

- $u_j$ and $v_j$ are the two observations' values of feature $j$.

It squares each difference, sums the squares and takes the square root. With a single feature it is the absolute difference $\lvert u_1 - v_1 \rvert$.

> [!example]- Points $(1, 2)$ and $(4, 6)$ are two observations on two features. What is the Euclidean distance between them? {Example}
> - The differences are $4 - 1 = 3$ and $6 - 2 = 4$.
> - The squared differences sum to $9 + 16 = 25$.
> - The distance is $\sqrt{25} = 5$.

## Manhattan and Minkowski distances

The Manhattan (city-block) distance is the sum of the absolute differences:

> $$d_{\text{Man}}(\mathbf{u}, \mathbf{v}) = \sum_{j=1}^{p} \lvert u_j - v_j \rvert$$

Both are Minkowski distances. The Minkowski distance of order $q$ is

> $$d_{q}(\mathbf{u}, \mathbf{v}) = \Big(\sum_{j=1}^{p} \lvert u_j - v_j \rvert^{q}\Big)^{1/q}$$

- $q = 2$ gives the Euclidean distance and $q = 1$ the Manhattan distance.

Because Euclidean distance squares each difference, one large difference counts for more under it than under Manhattan distance. For the points $(1, 2)$ and $(4, 6)$ the Manhattan distance is $3 + 4 = 7$.

## Standardizing the features

A distance on raw values is dominated by the feature with the largest spread in its units. James et al. (*ISLR*, §4.7.6) give the example of salary and age: to a nearest-neighbor method, a \$1,000 salary difference outweighs a 50-year age difference, and re-expressing salary in yen would change the result. The standardized value of feature $j$ for observation $i$ is

> $$z_{ij} = \frac{x_{ij} - \bar{x}_j}{s_j}$$

- $x_{ij}$ is the raw value.
- $\bar{x}_j$ and $s_j$ are feature $j$'s mean and standard deviation.

Each standardized feature has mean zero and standard deviation one, so the features carry comparable weight in the distance. A difference between two standardized values is the raw difference divided by $s_j$. Standardizing can change which record is nearest. Whether to do it is itself a modeling choice: *ISLR* (§12.4.2) advises it when the features are in different units, but the right answer depends on the application.

> [!example]- Which policyholder is nearest to this applicant? {Example}
> A new auto applicant A is 30 years old and drives 12,000 miles a year. Two existing policyholders are P (age 31, 15,000 miles) and Q (age 55, 12,500 miles). In the book, age has a standard deviation of 12 years and annual mileage 5,000 miles. Compare Euclidean distances on raw and on standardized features.
>
> > [!answer]-
> > - On raw features, $d(A, P) = \sqrt{1^2 + 3{,}000^2} = 3{,}000.0$.
> > - On raw features, $d(A, Q) = \sqrt{25^2 + 500^2} = 500.6$, so Q is nearest.
> > - Q wins only because mileage differences run in the thousands while age differences run in the tens, so the 25-year age gap barely registers.
> > - Standardized, each difference is divided by its feature's standard deviation: $d(A, P) = \sqrt{(1/12)^2 + (3{,}000/5{,}000)^2} = 0.606$.
> > - Standardized, $d(A, Q) = \sqrt{(25/12)^2 + (500/5{,}000)^2} = 2.086$.
> > - The standardized Manhattan distances agree: $0.083 + 0.600 = 0.683$ for P and $2.083 + 0.100 = 2.183$ for Q.
> > - **P is nearest** once the features are standardized. The scaling, not the metric, changed the neighbor.

## Binary and categorical features

For nominal or binary features, a common measure is the share of features on which two records disagree (simple matching, the Hamming distance in SciPy). For two binary records, let $c_{11}$ count the features both have, $c_{00}$ those both lack, and $c_{10}$ and $c_{01}$ those only one has. The simple matching dissimilarity is

> $$d_{\text{SM}} = \frac{c_{10} + c_{01}}{c_{11} + c_{10} + c_{01} + c_{00}}$$

A binary feature is *asymmetric* when its presence is informative but its absence is not, such as a rare endorsement that two policies both lack. Simple matching counts that joint absence as agreement, and so does Euclidean distance on 0/1 indicators, where a shared 0 adds nothing. With sparse indicators, where most values are 0, both make records look very similar. The Jaccard dissimilarity leaves joint absences out:

> $$d_{\text{Jac}} = \frac{c_{10} + c_{01}}{c_{11} + c_{10} + c_{01}}$$

> [!example]- Two policies share 1 endorsement, differ on 2 and both lack 7 others. What are their simple matching and Jaccard dissimilarities? {Example}
> - The counts are $c_{11} = 1$, $c_{10} + c_{01} = 2$ and $c_{00} = 7$, across 10 features.
> - Simple matching is $2/10 = 0.2$, which makes the policies look alike because of the 7 joint absences.
> - Jaccard is $2/(1 + 2) = 0.667$, since only the 3 endorsements present in at least one policy count.

## Mixed features and Gower's coefficient

When features mix types, Gower's dissimilarity between two observations is the (weighted) average over all features of a per-feature contribution in $[0, 1]$. A nominal or binary feature contributes 0 if the two observations have the same value and 1 if not. A numeric feature contributes

> $$\frac{\lvert u_j - v_j \rvert}{R_j}$$

- $R_j$ is the range of feature $j$ across the data.

Range scaling makes every contribution comparable (R `cluster::daisy`, Details).

> [!example]- Which of Risks 2 and 3 is closer to Risk 1 by Gower's coefficient? {Example}
> Three commercial property risks are described by construction (nominal), sprinkler protection (binary), building age and total insured value (TIV). In the portfolio, building age ranges over 80 years and TIV over \$20 million. The features have equal weights.
>
> | Risk | Construction | Sprinklered | Age | TIV (\$M) |
> | :--- | :--- | :--- | ---: | ---: |
> | 1 | Masonry | Yes | 10 | 2.5 |
> | 2 | Masonry | No | 30 | 4.5 |
> | 3 | Frame | Yes | 12 | 12.5 |
>
> > [!answer]-
> > - Risks 1 and 2 match on construction (0), differ on sprinklers (1), differ by $20/80$ in age and $2/20$ in TIV.
> > - $d_{12} = \tfrac{1}{4}(0 + 1 + 0.25 + 0.10) = 0.3375$.
> > - Risks 1 and 3 differ on construction (1), match on sprinklers (0), differ by $2/80$ in age and $10/20$ in TIV.
> > - $d_{13} = \tfrac{1}{4}(1 + 0 + 0.025 + 0.50) = 0.381$.
> > - **Risk 2 is closer**, because Risk 3 differs in construction and has five times the insured value.

## Correlation and cosine distance

Correlation-based distance treats two records as close when their feature profiles move together, even if their levels are far apart. Cosine distance, $1 - \mathbf{u}\cdot\mathbf{v} / (\lVert\mathbf{u}\rVert\lVert\mathbf{v}\rVert)$, does the same for direction. In *ISLR*'s online-retailer example (§12.4.2), Euclidean distance on purchase counts groups the infrequent shoppers together, while correlation-based distance groups shoppers with similar tastes whatever their volume.

## Where distance measures are used

[[K-Nearest Neighbors]] predicts from the $K$ training records closest to a new one, usually by Euclidean distance. [[K-Means Clustering]] minimizes within-cluster squared Euclidean distance. [[Hierarchical Clustering|Hierarchical clustering]] needs a dissimilarity between records and a linkage rule between clusters. *ISLR* stresses that the dissimilarity measure has a strong effect on the dendrogram and should follow from the data and the question being asked.

> [!trap] Treating category codes as numbers
> Construction codes 1, 2 and 3 are labels. Taking $\lvert 3 - 1 \rvert = 2$ as a distance gives the categories an order and a size they do not have. Use a match-based contribution: 0 for the same category, 1 for a different one.
