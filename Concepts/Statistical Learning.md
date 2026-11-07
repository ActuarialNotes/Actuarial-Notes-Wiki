---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:bbf34b121a08884681a285ebef3ba75f7597c38b8f90ba81345cf590df281f81
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §2.1.4-2.1.5 PDF pp.37-40 (delta: regression vs classification, logistic regression, KNN and boosting); prior-pass sections §2.1-2.2.3, §4.4.3-4.4.4, §5.1-5.2, §7.5, §7.7.2, §12.4, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), James reading list PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "CAS Exam MAS-II Content Outline 2026, Domain C and James reading list PDF pp.3-4, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Statistical Learning.md
---

![[Media/Figures/Statistical_Learning.svg|340]]

**Statistical Learning** is a set of methods for estimating the relationship between a response $Y$ and predictors $X_1, \ldots, X_p$ from data, for prediction or for inference. The relationship is modelled as

> $$Y = f(X) + \varepsilon$$

- $f$ is a fixed but unknown function of the predictors.
- $\varepsilon$ is a random error term, independent of $X$, with mean 0.

A method is [[Supervised Learning|supervised]] when its training data record a response for each observation, and the model is trained to predict that response from the predictors. A method is [[Unsupervised Learning|unsupervised]] when there is no response, and it looks for structure among the predictors, such as the groups found by [[Clustering|clustering]] or the directions found by [[Principal Components Analysis|principal components analysis]].

> [!example]- Which of these is supervised: a model predicting next year's claim count from past policy years, or a grouping of territories by their loss characteristics? {Example}
> - The claim count model is supervised, because each past policy year records its claim count.
> - The territory grouping is unsupervised, because no territory has a recorded group to fit against.

> [!idea] The idea
> A more flexible method can fit more shapes of $f$, but it is harder to interpret and does not always predict better.

## Regression and classification problems

A problem with a quantitative response, such as a claim severity or a pure premium, is a regression problem. A problem with a qualitative response, taking one of $K$ classes such as fraud or not, is a classification problem.

The line is not crisp. [[Logistic Regression|Logistic regression]] classifies a binary response but estimates class probabilities, and [[K-Nearest Neighbors|K-nearest neighbors]] and [[Boosting|boosting]] handle either kind of response.

> [!example]- Is predicting whether a policy renews a regression or a classification problem? {Example}
> - The response takes one of two classes, renew or lapse.
> - It is a classification problem, even when the model used is logistic regression.

## Prediction and inference

For prediction, the goal is the smallest [[Test Error|test error]], and interpretability may be sacrificed. For inference, the goal is to understand which predictors affect $Y$ and how, so interpretability is essential. When inference is the goal, simpler and less flexible methods are preferred because they are easier to interpret.

> [!example]- An actuary wants to know how much a driver's age changes expected claim frequency. Is this prediction or inference? {Example}
> - The question is about how one predictor affects the response.
> - It is inference, so an interpretable model such as a [[Generalized Linear Model|GLM]] is preferred over a black-box one.

## Flexibility and interpretability

There is a trade-off between flexibility and interpretability. [[Linear Regression|Linear regression]] is relatively inflexible, because it restricts $f$ to a linear form, and it is easy to interpret. The lasso is less flexible still, and it is interpretable because it sets some coefficients exactly to zero. [[Bagging]], [[Boosting|boosting]] and [[Neural Network|neural networks]] are flexible and hard to interpret.

A more flexible method has lower bias but higher variance ([[Bias-Variance Tradeoff|bias-variance trade-off]]). More flexible methods tend to overfit the training data, so greater flexibility does not guarantee better accuracy on test data. The test error is typically U-shaped in flexibility.

> [!example]- A KNN classifier is fitted with $K = 1$ and with $K = 100$. Which fit has the higher bias, and which the higher variance? {Example}
> - With $K = 1$, each prediction depends on one training observation, so the fit is very flexible: low bias, high variance.
> - With $K = 100$, each prediction averages many observations, so the fit is rigid: high bias, low variance.

## Methods on the syllabus

Both MAS-I and MAS-II read James et al., *An Introduction to Statistical Learning*. MAS-I reads Chapters 1, 2 (excluding §2.2.3), 3 (§§3.1–3.3), 4 (§§4.1–4.4), 5, 6 and 7:

| Method | James chapter | Task |
| :--- | :--- | :--- |
| [[Linear Regression]] | 3 Linear Regression | Regression |
| [[Logistic Regression]], [[Quadratic Discriminant Analysis]], [[Naive Bayes]] | 4 Classification | Classification |
| [[Cross-Validation]], [[Bootstrap]] | 5 Resampling Methods | Estimating test error and standard errors |
| [[Variable Selection]], [[Regularization]], [[Principal Components Regression]], [[Partial Least Squares]], [[High-Dimensional Data]] | 6 Linear Model Selection and Regularization | Regression |
| [[Polynomial Regression]], [[Step Function]], [[Regression Spline]], [[Smoothing Spline]], [[Local Regression]], [[Generalized Additive Model]] | 7 Moving Beyond Linearity | Regression (GAMs also classification) |

MAS-II reads Chapter 1, §2.2, §4.4.2 (the confusion matrix), and Chapters 8, 10 and 12:

| Method | Type | Task |
| :--- | :--- | :--- |
| [[K-Nearest Neighbors]] | Nonparametric | Classification or regression |
| [[Decision Tree]] | Tree-based | Classification or regression |
| [[Tree Ensemble]] | Ensemble | Classification or regression |
| [[Principal Components Analysis]] | Dimension reduction | Unsupervised |
| [[Clustering]] | K-means or hierarchical | Unsupervised |
| [[Neural Network]] | Deep learning | Classification or regression |

> [!trap] Logistic regression is a classifier
> Its name says regression, but it is used for a qualitative response, so a problem solved with it is a classification problem.
