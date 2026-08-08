---
Title: "An Introduction to Statistical Learning: with Applications in R"
Authors: "James, G., Witten, D., Hastie, T., and Tibshirani, R."
Year: "2021"
date: "2021"
Edition: 2e
Publisher: Springer
ISBN: 978-1071614174
---
On two syllabuses. For [[Exam MAS-I (CAS)|MAS-I]] objectives C1–C9 it is the applied model-building reference, and chapters 2–6 carry that material: the [[Bias-Variance Tradeoff]], [[Linear Regression]], classification, [[Cross-Validation]] and model selection. For [[Exam MAS-II (CAS)|MAS-II]] it supplies section C — the largest section on that exam — through chapters 2, 5, 6, 8, 10 and 12. The full text is available free from the authors at [statlearning.com](https://www.statlearning.com/).

## 1 Introduction

- An overview of statistical learning, the data sets used, and notation

## 2 Statistical Learning

- What is [[Statistical Learning]]? Prediction versus inference
- [[Supervised Learning|Supervised]] versus [[Unsupervised Learning|unsupervised]] learning; regression versus classification
- Assessing model accuracy: training versus test error, and the [[Bias-Variance Tradeoff]]
- The classification setting and the Bayes classifier
- [[K-Nearest Neighbors]]

## 3 Linear Regression

- Simple and multiple [[Linear Regression]]
- Assessing the accuracy of the coefficient estimates and of the model ([[R-Squared]], [[Residual Sum of Squares]])
- Other considerations: qualitative predictors ([[Categorical Predictor]]), [[Interaction|interactions]], non-linear relationships
- Potential problems: non-constant variance, outliers, high leverage, [[Multicollinearity]]
- Comparison with [[K-Nearest Neighbors]]

## 4 Classification

- Why not [[Linear Regression]]?
- [[Logistic Regression]]
- Generative models: LDA, QDA and naive Bayes
- A comparison of classification methods
- [[Generalized Linear Model|Generalized linear models]] and [[Poisson Regression]]

## 5 Resampling Methods

- [[Cross-Validation]]: validation set, leave-one-out and $k$-fold
- The [[Bootstrap|bootstrap]]

## 6 Linear Model Selection and Regularization

- Subset selection ([[Variable Selection]])
- Shrinkage methods: ridge and lasso [[Regularization|regularization]]
- Dimension reduction: [[Principal Components Analysis|principal components]] and partial least squares
- Considerations in high dimensions

## 7 Moving Beyond Linearity

- Polynomial regression, step functions and basis functions
- Regression and smoothing splines, local regression
- Generalized additive models

## 8 Tree-Based Methods

- The basics of [[Decision Tree|decision trees]]; the [[Gini Index]], [[Entropy]] and [[Residual Sum of Squares]] as splitting criteria, and cost-complexity [[Tree Pruning|pruning]]
- [[Bagging]], [[Random Forest|random forests]] and [[Boosting|boosting]] ([[Tree Ensemble]]), with [[Out-of-Bag Error|out-of-bag error]] and [[Variable Importance|variable importance]]
- Bayesian additive regression trees

## 9 Support Vector Machines

- Maximal margin classifier, support vector classifier and support vector machines
- SVMs with more than two classes, and their relationship to [[Logistic Regression]]

## 10 Deep Learning

- Single- and multilayer neural networks ([[Neural Network]]), and the [[Activation Function|activation function]]
- Convolutional and recurrent neural networks
- Fitting a neural network by [[Backpropagation|backpropagation]] and gradient descent

## 11 Survival Analysis and Censored Data

- [[Survival Model|Survival]] and [[Hazard Rate|hazard]] functions, [[Censoring]]
- The Kaplan–Meier survival curve and the log-rank test
- Regression models with a survival response

## 12 Unsupervised Learning

- [[Principal Components Analysis]]: [[Loading Vector|loading vectors]], scores, the [[Proportion of Variance Explained]] and the [[Scree Plot]]
- Missing values and matrix completion
- [[Clustering]] methods: [[K-Means Clustering]] and [[Hierarchical Clustering|hierarchical clustering]], with the [[Dendrogram]] and the choice of [[Linkage]]

## 13 Multiple Testing

- A quick review of [[Hypothesis Testing]]
- The challenge of multiple testing; family-wise error rate
- The false discovery rate and resampling approaches
