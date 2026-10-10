---
id: "masi-an-157"
exam: "Exam MAS-I"
topic: "Naive Bayes"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multi-part
bloom: understand
wiki_link:
  - Concepts/Naive+Bayes
  - Concepts/Quadratic+Discriminant+Analysis
  - Concepts/Bayes+Theorem
  - Concepts/Logistic+Regression
  - Concepts/Categorical+Predictor
points: 4
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:515b44c5917cd0914a52a75b7ddf5a78fea5e5920c5e86a3dee532450d70be87
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-157.md
---

An insurer is choosing a classifier to flag claims for fraud review. For each description below, say which classifier it describes: naive Bayes (as in ISLR §4.4.4), quadratic discriminant analysis (QDA), both, or neither. An option may be used more than once or not at all.

## Part a (1 point)
Estimates, separately for each class, the covariance between every pair of predictors.

- A) Naive Bayes only
- B) QDA only
- C) Both naive Bayes and QDA
- D) Neither

### Answer
B

### Explanation
QDA gives each class its own full covariance matrix $\boldsymbol\Sigma_k$, with $p(p+1)/2$ variances and covariances per class. Naive Bayes assumes the predictors are independent within a class, so every within-class covariance is fixed at zero and only the one-dimensional densities are estimated (**A** and **C** are wrong). A procedure that estimates no covariances at all would be **D**, but QDA does.

## Part b (1 point)
Handles a qualitative predictor by using the share of each class's training observations at each of its levels.

- A) Naive Bayes only
- B) QDA only
- C) Both naive Bayes and QDA
- D) Neither

### Answer
A

### Explanation
Naive Bayes estimates each $f_{kj}$ on its own, so a qualitative predictor's $f_{kj}$ is just the proportion of class-$k$ observations at each level. QDA assumes the predictors are jointly *multivariate normal* within each class, a model for quantitative predictors, so it has no such step (**B** and **C** are wrong). **D** is wrong because naive Bayes does exactly this.

## Part c (1 point)
Models $P(Y = k \mid X = \mathbf{x})$ directly as a function of $\mathbf{x}$, without specifying how the predictors are distributed within each class.

- A) Naive Bayes only
- B) QDA only
- C) Both naive Bayes and QDA
- D) Neither

### Answer
D

### Explanation
Both naive Bayes and QDA are *generative* classifiers: they model the distribution of $\mathbf{X}$ within each class, $f_k(\mathbf{x})$, and the priors $\pi_k$, then turn these into $P(Y = k \mid \mathbf{x})$ with Bayes' theorem. Modelling the posterior directly, as a function of $\mathbf{x}$, is what logistic regression does. Choosing **A**, **B** or **C** confuses a generative classifier with a discriminative one.

## Part d (1 point)
With normal predictor distributions whose variances differ by class, can produce a boundary between two classes that is curved in the predictors.

- A) Naive Bayes only
- B) QDA only
- C) Both naive Bayes and QDA
- D) Neither

### Answer
C

### Explanation
For QDA the discriminant function is quadratic in $\mathbf{x}$, so the boundary is a quadratic curve or surface. Naive Bayes with normal $f_{kj}$ is QDA with a *diagonal* $\boldsymbol\Sigma_k$; when a predictor's variance differs between classes, the log of the posterior ratio keeps an $x_j^2$ term with coefficient $\tfrac{1}{2}\left(1/\sigma_{jl}^2 - 1/\sigma_{jk}^2\right) \neq 0$, so its boundary is curved too (with no cross-product terms). **B** forgets that naive Bayes with normal $f_{kj}$ is a restricted QDA, not a linear method; **A** and **D** are wrong for QDA.
