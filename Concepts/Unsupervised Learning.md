---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:35d1f8551556d6e00dc3f66137d75be3b96003f9e89d1da2d8b8bf55408d27ca
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §12.1 subjective, EDA, no cross-validation (PDF pp.503-504), §12.2 derived variables for supervised learning (PDF p.505), §12.2.4 scaling (PDF pp.513-514) and number of components - scree, subjective, CV only for PCR (PDF pp.515-516), §12.4.2 scaling before dissimilarities (PDF p.536), practical issues - validating clusters, not robust, cluster subsets (PDF pp.537-538), §6.3.2 PCR drawback (PDF p.268), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-II Content Outline 2026 (MASII_CO_S_2026 v06), Domain C tasks 5-8 (PDF p.3) and James reading list Ch 12 (PDF p.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch 10 'Data Mining Techniques' - Factor Analysis, Cluster Analysis (PDF pp.195-196) and Ch 11 'Clustering' (PDF p.203), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Unsupervised Learning.md
---

![[Media/Figures/Unsupervised_Learning.svg|340]]

**Unsupervised Learning** is the search for structure among predictors $X_1, \ldots, X_p$ when there is no response $Y$ to predict. It is the counterpart of [[Supervised Learning|supervised learning]], whose training data record a response. The MAS-II syllabus has two unsupervised methods:

1. [[Principal Components Analysis|Principal components analysis]] reduces the dimension of the data, finding a few directions that carry most of the variance of the predictors.
2. [[Clustering]] finds groups of similar observations.

Unsupervised learning is often used in exploratory data analysis, and as a preprocessing step, such as principal components fed into a supervised model as predictors.

> [!example]- PCA on 12 telematics variables gives a first component with large positive loadings on hard braking, cornering force and night driving. What has the analysis found, and what has it not? {Example}
> - It has found that those variables move together, so one direction summarizes much of the spread across drivers.
> - It has not found that this direction predicts claims. PCA does not use a response, so that needs a supervised fit to claims.

## Judging an unsupervised result

With no response there is no test error, so [[Cross-Validation|cross-validation]] cannot choose between results. A [[Scree Plot|scree plot]] elbow or a [[Dendrogram|dendrogram]] cut is a judgment call, and results are judged by their interpretability and stability. A clustering method returns clusters whether or not the data contain real subgroups.

> [!example]- K-means with $K = 4$ is run on territories' loss characteristics and returns four clusters. Does this show the territories fall into four groups? {Example}
> - No. K-means returns $K$ clusters for any data, including data with no real subgroups.
> - Whether the four groups are real is judged by whether they are stable across runs and subsamples and make sense.

## Scaling the variables

Results are scale-sensitive. Principal components analysis and distance-based clustering depend on the units of the variables, so the variables are standardized to unit standard deviation when their units differ. Software with different default scaling settings can give different loadings.

> [!trap] A pattern is not a prediction
> A direction of high variance or a tight cluster says nothing about losses. Structure found in the predictors becomes useful for rating only once a supervised model shows it predicts the response.
