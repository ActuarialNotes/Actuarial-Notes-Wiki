---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:431ec1b75f65e5d7991d7e8e3583060c089d8b9427e1c8e82ba7f454bc2946a5
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §4.7.6 PDF p.193 (salary/age, yen); §12.4.1-12.4.2 PDF pp.533-536 (dissimilarity choice, online retailer, scaling), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "SciPy docs, scipy.spatial.distance.cityblock, definition, sha256:3ad0c340b7d389773e926a5bc1b891f6f29bcf89336ec34e2413b5d8f286f525 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.cityblock.html; SciPy docs, scipy.spatial.distance.minkowski, definition, sha256:2e0f85829595334b2fa7ac2fa5137429d1ee038e07dd1b5cf4cbe39a4cb17725 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.minkowski.html; SciPy docs, scipy.spatial.distance.hamming, definition, sha256:5e9a00450e4fd2da1723c587ccc89769226e19b9abca60dd9e41382526a5f7b4 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.hamming.html; SciPy docs, scipy.spatial.distance.jaccard, definition, sha256:57059b5d873f3326934e15ef4e74216370f277483f313f5812fce96713c2ae18 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.jaccard.html; SciPy docs, scipy.spatial.distance.cosine, definition, sha256:eac484bb1120d904d8f1e5a0882da931350befa0ecd41b90dc2869945cb1fb75 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.cosine.html"
    - "R cluster::daisy help page, Arguments and Details (Gower), sha256:9ae15cbff8e5e321e7b12d3662dc4c219be38e1aa5d7c9b2fc158aed259e7763 — https://stat.ethz.ch/R-manual/R-devel/library/cluster/html/daisy.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Similarity and Distance Measures.md
---

A **distance** (or dissimilarity) **measure** turns the difference between two observations' features into one number, small when the observations are alike and large when they differ; a **similarity measure** runs the other way. Methods that work by "nearness", such as [[K-Nearest Neighbors|nearest-neighbor]] prediction and [[Clustering|clustering]], depend on the measure chosen and on how the features are scaled before it is applied.

> $$d_{\text{Euc}}(\mathbf{u}, \mathbf{v}) = \sqrt{\sum_{j=1}^{p} (u_j - v_j)^2}$$

> $$d_{\text{Man}}(\mathbf{u}, \mathbf{v}) = \sum_{j=1}^{p} \lvert u_j - v_j \rvert$$

> $$d_{q}(\mathbf{u}, \mathbf{v}) = \Big(\sum_{j=1}^{p} \lvert u_j - v_j \rvert^{q}\Big)^{1/q}$$

> $$z_{ij} = \frac{x_{ij} - \bar{x}_j}{s_j}$$

- **Symbols:** $\mathbf{u}$ and $\mathbf{v}$ are two observations measured on the same $p$ features. Euclidean distance is the straight-line distance, the root of summed squared differences; Manhattan (city-block) distance sums absolute differences. Both are Minkowski distances $d_q$, with $q = 2$ and $q = 1$. In the last block, $\bar{x}_j$ and $s_j$ are feature $j$'s mean and standard deviation, and $z_{ij}$ is the standardized value (SciPy distance documentation; R `cluster::daisy`).
- **Scale decides the answer:** A raw distance is dominated by whichever feature has the largest spread in its units. James et al. (*ISLR*, §4.7.6) give the example of salary and age: to a nearest-neighbor method, a \$1,000 salary difference outweighs a 50-year age difference, and re-expressing salary in yen would change the result. Standardizing each feature to mean zero and standard deviation one puts them on a comparable scale and gives each equal weight. Whether to do so is itself a modeling choice: *ISLR* (§12.4.2) notes that standardizing is advisable when features are in different units, but the right answer depends on the application.
- **Categorical features:** For nominal or binary features, a common measure is the share of features on which two records disagree (the Hamming distance in SciPy; simple matching). For *asymmetric* binary features, where joint absence says little, such as two policies that both lack a rare endorsement, the Jaccard dissimilarity counts disagreements among only the features present in at least one record.
- **Mixed data, Gower:** When features mix types, Gower's coefficient averages a per-feature contribution in $[0, 1]$: 0 or 1 for a nominal or binary feature (match or not), and $\lvert u_j - v_j \rvert / R_j$ for a numeric feature with range $R_j$. Range scaling makes every contribution comparable (R `cluster::daisy`, Details).
- **Shape rather than size:** Correlation-based distance treats two records as close when their feature profiles move together, even if their levels are far apart, and cosine distance ($1 - \mathbf{u}\cdot\mathbf{v} / \lVert\mathbf{u}\rVert\lVert\mathbf{v}\rVert$) does the same for direction. In *ISLR*'s online-retailer example (§12.4.2), Euclidean distance on purchase counts groups the infrequent shoppers together, while correlation-based distance groups shoppers with similar tastes whatever their volume.
- **Where it is used:** [[K-Nearest Neighbors]] predicts from the $K$ training records closest to a new one, usually by Euclidean distance. [[K-Means Clustering]] minimizes within-cluster squared Euclidean distance, and [[Hierarchical Clustering|hierarchical clustering]] needs a dissimilarity between records plus a linkage rule between clusters. *ISLR* stresses that the dissimilarity measure has a strong effect on the dendrogram and should follow from the data and the question being asked.

> [!example]- Which Policyholder Is Nearest? {Example}
> A new auto applicant A is 30 years old and drives 12,000 miles a year. Two existing policyholders are P (age 31, 15,000 miles) and Q (age 55, 12,500 miles). In the book, age has a standard deviation of 12 years and annual mileage 5,000 miles. Find A's nearest neighbor by Euclidean distance on raw and on standardized features, and give the standardized Manhattan distances.
>
> > [!answer]-
> > **Raw features:**
> > $$
> > \begin{align*}
> > d(A, P) &= \sqrt{1^2 + 3{,}000^2} \\
> > &= 3{,}000.0 \\
> > d(A, Q) &= \sqrt{25^2 + 500^2} \\
> > &= 500.6
> > \end{align*}
> > $$
> > Q is nearest, but only because mileage is measured in thousands while age is in tens: the 25-year age gap barely registers.
> >
> > **Standardized features** (divide each difference by the feature's standard deviation):
> > $$
> > \begin{align*}
> > d(A, P) &= \sqrt{(1/12)^2 + (3{,}000/5{,}000)^2} \\
> > &= 0.606 \\
> > d(A, Q) &= \sqrt{(25/12)^2 + (500/5{,}000)^2} \\
> > &= 2.086
> > \end{align*}
> > $$
> > Now **P is nearest**. Manhattan distance on the standardized features agrees: $0.083 + 0.600 = 0.683$ for P and $2.083 + 0.100 = 2.183$ for Q. The choice of scaling, not the metric, changed the neighbor.

> [!example]- Gower Distance for Commercial Property Risks {Example}
> Three commercial property risks are described by construction (nominal), sprinkler protection (binary), building age and total insured value (TIV). In the portfolio, building age ranges over 80 years and TIV over \$20 million.
>
> | Risk | Construction | Sprinklered | Age | TIV (\$M) |
> | :--- | :--- | :--- | ---: | ---: |
> | 1 | Masonry | Yes | 10 | 2.5 |
> | 2 | Masonry | No | 30 | 4.5 |
> | 3 | Frame | Yes | 12 | 12.5 |
>
> Using equal weights, which of Risks 2 and 3 is closer to Risk 1?
>
> > [!answer]-
> > Each feature contributes 0 or 1 if categorical, and the absolute difference divided by the range if numeric; the four contributions are averaged.
> > $$
> > \begin{align*}
> > d_{12} &= \tfrac{1}{4}\left(0 + 1 + \tfrac{20}{80} + \tfrac{2}{20}\right) \\
> > &= 0.3375 \\
> > d_{13} &= \tfrac{1}{4}\left(1 + 0 + \tfrac{2}{80} + \tfrac{10}{20}\right) \\
> > &= 0.3813
> > \end{align*}
> > $$
> > **Risk 2 is closer**, despite the sprinkler difference, because Risk 3 differs in construction and has five times the insured value. A Euclidean distance on raw values could not have been computed at all on the construction field, and on the numeric fields alone it would have been driven by TIV in dollars.

> [!tip]- How it appears on the exam
> - **DISC-DA:** Section 7.2 covers similarity and distance in data modeling. Questions give two or three records and ask which is nearest under a stated measure, or what happens to a nearest-neighbor or clustering result when features are or are not standardized.
> - Expect conceptual questions on choosing a measure: Euclidean versus Manhattan, a match-based measure for categorical data, and why distance-based methods need features on comparable scales.

> [!warning]- Exam traps
> - **Forgetting to scale:** On raw data, the feature with the largest numbers in its units dominates the distance. Check what the standardized answer is before choosing a neighbor.
> - **Treating codes as numbers:** Construction codes 1, 2 and 3 are labels. Taking $\lvert 3 - 1 \rvert = 2$ as a distance invents an order and a size the categories do not have; use a match-based contribution.
> - **Manhattan vs. Euclidean:** Manhattan adds absolute differences; Euclidean squares, sums and takes the root, so one large difference counts for more under Euclidean.
> - **Joint absences:** For rare binary features, two records that both lack a feature are not thereby similar. Jaccard ignores joint absences; simple matching counts them.
