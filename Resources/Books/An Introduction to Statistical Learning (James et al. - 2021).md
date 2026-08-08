---
Title: "An Introduction to Statistical Learning: with Applications in R"
Authors: "Gareth James, Daniela Witten, Trevor Hastie, Robert Tibshirani"
Year: "2021"
date: "2021"
Edition: 2nd
Publisher: Springer
Type: Textbook
Available from: "[statlearning.com](https://www.statlearning.com/) (free PDF)"
---
The [[Statistical Learning]] text on both the [[Exam MAS-II (CAS)|MAS-II]] syllabus (section C, the largest section on the exam) and the [[Exam MAS-I (CAS)|MAS-I]] extended-linear-model section. The second edition runs to 13 chapters; MAS-II draws on the statistical-learning framework, resampling, trees and ensembles, neural networks and unsupervised learning.

The PDF is free from the authors' site, and each chapter ends with R labs and exercises worth working — the exam's computational objectives are exactly the lab computations.

## What the syllabus takes from it

### Statistical learning (Ch. 2)

- [[Supervised Learning|Supervised]] versus [[Unsupervised Learning|unsupervised]] learning; regression versus classification
- Assessing model accuracy, training versus test error, and the [[Bias-Variance Tradeoff]]
- [[K-Nearest Neighbors]] as the running example of a flexible non-parametric method

### Resampling methods (Ch. 5)

- The validation-set approach, LOOCV and $K$-fold [[Cross-Validation]]
- The [[Bootstrap]] and what it does that cross-validation does not

### Linear model selection and regularization (Ch. 6)

- Subset selection and stepwise [[Variable Selection]]
- Ridge and lasso [[Regularization]], and choosing $\lambda$ by cross-validation
- Dimension reduction via principal components

### Tree-based methods (Ch. 8)

- Growing a [[Decision Tree]]; the [[Gini Index]], [[Entropy]] and [[Residual Sum of Squares]] as splitting criteria
- Cost-complexity [[Tree Pruning|pruning]]
- [[Tree Ensemble]]s: [[Bagging]], [[Random Forest]]s and [[Boosting]], with [[Out-of-Bag Error]] and [[Variable Importance]]

### Deep learning (Ch. 10)

- Single- and multi-layer [[Neural Network]]s
- The [[Activation Function]] and why non-linearity is what a network buys
- Fitting by [[Backpropagation]] and stochastic gradient descent

### Unsupervised learning (Ch. 12)

- [[Principal Components Analysis]]: [[Loading Vector|loading vectors]], scores, the [[Proportion of Variance Explained]] and the [[Scree Plot]]
- [[K-Means Clustering]] and [[Hierarchical Clustering]], with the [[Dendrogram]] and the choice of [[Linkage]]

## Links
- [An Introduction to Statistical Learning (free PDF and resources)](https://www.statlearning.com/)
- [Springer listing, 2nd edition](https://link.springer.com/book/10.1007/978-1-0716-1418-1)
