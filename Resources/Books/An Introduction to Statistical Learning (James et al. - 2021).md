---
Title: "An Introduction to Statistical Learning: with Applications in R"
Authors: "James, G., Witten, D., Hastie, T., and Tibshirani, R."
Year: "2021"
date: "2021"
Edition: 2e
Publisher: Springer
ISBN: 978-1071614174
---
The applied model-building reference on the MAS-I syllabus, covering learning objectives C1–C9. Chapters 2–6 carry the exam material: the [[Bias-Variance Tradeoff]], [[Linear Regression]], classification, [[Cross-Validation]] and model selection. The full text is available free from the authors at [statlearning.com](https://www.statlearning.com/).

## 1 Introduction

- An overview of statistical learning, the data sets used, and notation

## 2 Statistical Learning

- What is [[Statistical Learning]]? Prediction versus inference
- Assessing model accuracy: the [[Bias-Variance Tradeoff]]
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
- The bootstrap

## 6 Linear Model Selection and Regularization

- Subset selection ([[Variable Selection]])
- Shrinkage methods: ridge regression and the lasso
- Dimension reduction: [[Principal Components Analysis|principal components]] and partial least squares
- Considerations in high dimensions

## 7 Moving Beyond Linearity

- Polynomial regression, step functions and basis functions
- Regression and smoothing splines, local regression
- Generalized additive models

## 8 Tree-Based Methods

- The basics of [[Decision Tree|decision trees]]
- Bagging, random forests and boosting ([[Tree Ensemble]])
- Bayesian additive regression trees

## 9 Support Vector Machines

- Maximal margin classifier, support vector classifier and support vector machines
- SVMs with more than two classes, and their relationship to [[Logistic Regression]]

## 10 Deep Learning

- Single- and multilayer neural networks ([[Neural Network]])
- Convolutional and recurrent neural networks
- Fitting a neural network

## 11 Survival Analysis and Censored Data

- [[Survival Model|Survival]] and [[Hazard Rate|hazard]] functions, [[Censoring]]
- The Kaplan–Meier survival curve and the log-rank test
- Regression models with a survival response

## 12 Unsupervised Learning

- [[Principal Components Analysis]]
- Missing values and matrix completion
- [[Clustering]] methods: [[K-Means Clustering]] and hierarchical clustering

## 13 Multiple Testing

- A quick review of [[Hypothesis Testing]]
- The challenge of multiple testing; family-wise error rate
- The false discovery rate and resampling approaches
