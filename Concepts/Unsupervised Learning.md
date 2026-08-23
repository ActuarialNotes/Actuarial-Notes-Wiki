---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7563e8dcf4144694e57f8e1c470811deb976ea1d1ba94e58e1e7bd5dbe89eade
  sources: []
  open_findings: 0
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
