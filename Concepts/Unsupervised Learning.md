---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:7563e8dcf4144694e57f8e1c470811deb976ea1d1ba94e58e1e7bd5dbe89eade
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §12.1 (PDF pp.503-504), §12.2.4 scaling and scree plot (PDF pp.513-516, incl. CV available only for PCR), §12.2.5, §12.4 and §12.4.2 scaling (PDF pp.522-535), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-II Content Outline 2026, Domain C tasks 5-8 (PDF p.3), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch 11 'Clustering' (PDF p.203), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Unsupervised Learning.md
---

**Unsupervised learning** looks for structure in predictors $X$ when there is no response $Y$ to predict. With no labels there is no test error to minimize, so results are judged by interpretability and stability rather than by accuracy — the defining contrast with [[Supervised Learning]].

> $$\text{given } X_1, \dots, X_n \in \mathbb{R}^{p}, \text{ find structure — no } Y$$

- The two syllabus methods: [[Principal Components Analysis]] (find a few directions that carry most of the variance) and [[Clustering]] (find groups of similar observations)
- **No objective scorecard.** There is no held-out label, so [[Cross-Validation]] cannot arbitrate — a [[Scree Plot]] elbow or a [[Dendrogram]] cut is a judgement call
- Results are **scale-sensitive**: both PCA and distance-based clustering must have their variables standardized when units differ
- Common actuarial uses: reducing correlated rating variables to a handful of components, grouping territories or classes, and exploratory data analysis before a [[Generalized Linear Model]]
- Often a **preprocessing step** — principal components fed into a supervised model as predictors

![[Media/Figures/Unsupervised_Learning.svg|340]]

> [!example]- Reading an Unsupervised Result {Example}
> PCA on 12 telematics variables gives a first component with large positive loadings on hard-braking rate, cornering force and night-driving share. What has the analysis found, and what has it *not*?
>
> > [!answer]-
> > It has found that those variables **move together** — one latent "aggressive driving" direction accounts for much of the spread across drivers, so 12 variables can be summarized by fewer.
> > It has **not** found that this direction predicts claims. That requires a supervised fit with a claims response; a high-variance direction and a predictive one are different things.
