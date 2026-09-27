---
Title: "An Introduction to Statistical Learning: with Applications in R"
Authors: "Gareth James, Daniela Witten, Trevor Hastie and Robert Tibshirani"
Publisher: "Springer"
Year: "2021"
date: "2021"
Edition: "2nd"
Type: "Textbook"
ISBN: "978-1-0716-1417-4"
Available from: "[statlearning.com](https://www.statlearning.com/)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2a928f0340edf13f44dd254cbb25e64939fdd6cf204f972399328ac14f4d433d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/An Introduction to Statistical Learning (James et al. - 2021).md
---
![[An Introduction to Statistical Learning (James et al. - 2021) - Cover.svg]]

An introduction to statistical learning, the tools for making sense of complex datasets, focused on applying the methods rather than their mathematics. Written for advanced undergraduates, master's students and analysts in other fields, it gives every chapter from Chapter 2 on a lab in R. This second edition adds chapters on deep learning, survival analysis and multiple testing, and treatments of naive Bayes and generalized linear models (Chapter 4), Bayesian additive regression trees (Chapter 8) and matrix completion (Chapter 12). The authors offer the PDF free on the book's website.

> [!info] On the syllabus
> - [[Exam MAS-I (CAS)|Exam MAS-I]] — objectives C1–C9; Chapters 1, 2 (excluding Section 2.2.3), 3 (Sections 3.1 through 3.3, and the 3.6 labs on Sections 3.1 through 3.3), 4 (Sections 4.1 through 4.4; the Linear Discrimination Analysis portion of Section 4.4 will not be tested), 5, 6 and 7.
> - [[Exam MAS-II (CAS)|Exam MAS-II]] — objectives C1–C9; Chapters 1 (background reading only; no exam questions are sourced directly from it), 2.2, 4.4.2 (confusion matrix only), 8, 10 and 12.

## 1 Introduction

## 2 Statistical Learning
- 2.1 What Is [[Statistical Learning]]?
    - 2.1.1 Why Estimate f?
    - 2.1.2 How Do We Estimate f?
    - 2.1.3 The Trade-Off Between Prediction Accuracy and Model Interpretability
    - 2.1.4 [[Supervised Learning|Supervised]] Versus [[Unsupervised Learning|Unsupervised]] Learning
    - 2.1.5 Regression Versus Classification Problems
- 2.2 Assessing Model Accuracy
    - 2.2.1 Measuring the Quality of Fit
    - 2.2.2 The [[Bias-Variance Tradeoff|Bias-Variance Trade-Off]]
    - 2.2.3 The Classification Setting
- 2.3 Lab: Introduction to R
    - 2.3.1 Basic Commands
    - 2.3.2 Graphics
    - 2.3.3 Indexing Data
    - 2.3.4 Loading Data
    - 2.3.5 Additional Graphical and Numerical Summaries
- 2.4 Exercises

## 3 Linear Regression
- 3.1 Simple [[Linear Regression]]
    - 3.1.1 Estimating the Coefficients
    - 3.1.2 Assessing the Accuracy of the Coefficient Estimates
    - 3.1.3 Assessing the Accuracy of the Model
- 3.2 Multiple Linear Regression
    - 3.2.1 Estimating the Regression Coefficients
    - 3.2.2 Some Important Questions
- 3.3 Other Considerations in the Regression Model
    - 3.3.1 [[Categorical Predictor|Qualitative Predictors]]
    - 3.3.2 Extensions of the Linear Model
    - 3.3.3 Potential Problems
- 3.4 The Marketing Plan
- 3.5 Comparison of Linear Regression with [[K-Nearest Neighbors]]
- 3.6 Lab: Linear Regression
    - 3.6.1 Libraries
    - 3.6.2 Simple Linear Regression
    - 3.6.3 Multiple Linear Regression
    - 3.6.4 Interaction Terms
    - 3.6.5 Non-linear Transformations of the Predictors
    - 3.6.6 Qualitative Predictors
    - 3.6.7 Writing Functions
- 3.7 Exercises

## 4 Classification
- 4.1 An Overview of Classification
- 4.2 Why Not Linear Regression?
- 4.3 [[Logistic Regression]]
    - 4.3.1 The Logistic Model
    - 4.3.2 Estimating the Regression Coefficients
    - 4.3.3 Making Predictions
    - 4.3.4 Multiple Logistic Regression
    - 4.3.5 Multinomial Logistic Regression
- 4.4 Generative Models for Classification
    - 4.4.1 Linear Discriminant Analysis for p = 1
    - 4.4.2 Linear Discriminant Analysis for p > 1
    - 4.4.3 Quadratic Discriminant Analysis
    - 4.4.4 Naive Bayes
- 4.5 A Comparison of Classification Methods
    - 4.5.1 An Analytical Comparison
    - 4.5.2 An Empirical Comparison
- 4.6 [[Generalized Linear Model|Generalized Linear Models]]
    - 4.6.1 Linear Regression on the Bikeshare Data
    - 4.6.2 [[Poisson Regression]] on the Bikeshare Data
    - 4.6.3 Generalized Linear Models in Greater Generality
- 4.7 Lab: Classification Methods
    - 4.7.1 The Stock Market Data
    - 4.7.2 Logistic Regression
    - 4.7.3 Linear Discriminant Analysis
    - 4.7.4 Quadratic Discriminant Analysis
    - 4.7.5 Naive Bayes
    - 4.7.6 K-Nearest Neighbors
    - 4.7.7 Poisson Regression
- 4.8 Exercises

## 5 Resampling Methods
- 5.1 [[Cross-Validation]]
    - 5.1.1 The Validation Set Approach
    - 5.1.2 Leave-One-Out Cross-Validation
    - 5.1.3 k-Fold Cross-Validation
    - 5.1.4 Bias-Variance Trade-Off for k-Fold Cross-Validation
    - 5.1.5 Cross-Validation on Classification Problems
- 5.2 The [[Bootstrap]]
- 5.3 Lab: Cross-Validation and the Bootstrap
    - 5.3.1 The Validation Set Approach
    - 5.3.2 Leave-One-Out Cross-Validation
    - 5.3.3 k-Fold Cross-Validation
    - 5.3.4 The Bootstrap
- 5.4 Exercises

## 6 Linear Model Selection and Regularization
- 6.1 [[Variable Selection|Subset Selection]]
    - 6.1.1 Best Subset Selection
    - 6.1.2 Stepwise Selection
    - 6.1.3 Choosing the Optimal Model
- 6.2 [[Regularization|Shrinkage Methods]]
    - 6.2.1 Ridge Regression
    - 6.2.2 The Lasso
    - 6.2.3 Selecting the Tuning Parameter
- 6.3 Dimension Reduction Methods
    - 6.3.1 Principal Components Regression
    - 6.3.2 Partial Least Squares
- 6.4 Considerations in High Dimensions
    - 6.4.1 High-Dimensional Data
    - 6.4.2 What Goes Wrong in High Dimensions?
    - 6.4.3 Regression in High Dimensions
    - 6.4.4 Interpreting Results in High Dimensions
- 6.5 Lab: Linear Models and Regularization Methods
    - 6.5.1 Subset Selection Methods
    - 6.5.2 Ridge Regression and the Lasso
    - 6.5.3 PCR and PLS Regression
- 6.6 Exercises

## 7 Moving Beyond Linearity
- 7.1 Polynomial Regression
- 7.2 Step Functions
- 7.3 Basis Functions
- 7.4 Regression Splines
    - 7.4.1 Piecewise Polynomials
    - 7.4.2 Constraints and Splines
    - 7.4.3 The Spline Basis Representation
    - 7.4.4 Choosing the Number and Locations of the Knots
    - 7.4.5 Comparison to Polynomial Regression
- 7.5 Smoothing Splines
    - 7.5.1 An Overview of Smoothing Splines
    - 7.5.2 Choosing the Smoothing Parameter λ
- 7.6 Local Regression
- 7.7 Generalized Additive Models
    - 7.7.1 GAMs for Regression Problems
    - 7.7.2 GAMs for Classification Problems
- 7.8 Lab: Non-linear Modeling
    - 7.8.1 Polynomial Regression and Step Functions
    - 7.8.2 Splines
    - 7.8.3 GAMs
- 7.9 Exercises

## 8 Tree-Based Methods
- 8.1 The Basics of [[Decision Tree|Decision Trees]]
    - 8.1.1 Regression Trees
    - 8.1.2 Classification Trees
    - 8.1.3 Trees Versus Linear Models
    - 8.1.4 Advantages and Disadvantages of Trees
- 8.2 Bagging, Random Forests, Boosting, and Bayesian Additive Regression Trees
    - 8.2.1 [[Bagging]]
    - 8.2.2 [[Random Forest|Random Forests]]
    - 8.2.3 [[Boosting]]
    - 8.2.4 Bayesian Additive Regression Trees
    - 8.2.5 Summary of [[Tree Ensemble]] Methods
- 8.3 Lab: Decision Trees
    - 8.3.1 Fitting Classification Trees
    - 8.3.2 Fitting Regression Trees
    - 8.3.3 Bagging and Random Forests
    - 8.3.4 Boosting
    - 8.3.5 Bayesian Additive Regression Trees
- 8.4 Exercises

## 9 Support Vector Machines
- 9.1 Maximal Margin Classifier
    - 9.1.1 What Is a Hyperplane?
    - 9.1.2 Classification Using a Separating Hyperplane
    - 9.1.3 The Maximal Margin Classifier
    - 9.1.4 Construction of the Maximal Margin Classifier
    - 9.1.5 The Non-separable Case
- 9.2 Support Vector Classifiers
    - 9.2.1 Overview of the Support Vector Classifier
    - 9.2.2 Details of the Support Vector Classifier
- 9.3 Support Vector Machines
    - 9.3.1 Classification with Non-Linear Decision Boundaries
    - 9.3.2 The Support Vector Machine
    - 9.3.3 An Application to the Heart Disease Data
- 9.4 SVMs with More than Two Classes
    - 9.4.1 One-Versus-One Classification
    - 9.4.2 One-Versus-All Classification
- 9.5 Relationship to Logistic Regression
- 9.6 Lab: Support Vector Machines
    - 9.6.1 Support Vector Classifier
    - 9.6.2 Support Vector Machine
    - 9.6.3 ROC Curves
    - 9.6.4 SVM with Multiple Classes
    - 9.6.5 Application to Gene Expression Data
- 9.7 Exercises

## 10 Deep Learning
- 10.1 Single Layer [[Neural Network|Neural Networks]]
- 10.2 Multilayer Neural Networks
- 10.3 Convolutional Neural Networks
    - 10.3.1 Convolution Layers
    - 10.3.2 Pooling Layers
    - 10.3.3 Architecture of a Convolutional Neural Network
    - 10.3.4 Data Augmentation
    - 10.3.5 Results Using a Pretrained Classifier
- 10.4 Document Classification
- 10.5 Recurrent Neural Networks
    - 10.5.1 Sequential Models for Document Classification
    - 10.5.2 Time Series Forecasting
    - 10.5.3 Summary of RNNs
- 10.6 When to Use Deep Learning
- 10.7 Fitting a Neural Network
    - 10.7.1 [[Backpropagation]]
    - 10.7.2 Regularization and Stochastic Gradient Descent
    - 10.7.3 Dropout Learning
    - 10.7.4 Network Tuning
- 10.8 Interpolation and Double Descent
- 10.9 Lab: Deep Learning
    - 10.9.1 A Single Layer Network on the Hitters Data
    - 10.9.2 A Multilayer Network on the MNIST Digit Data
    - 10.9.3 Convolutional Neural Networks
    - 10.9.4 Using Pretrained CNN Models
    - 10.9.5 IMDb Document Classification
    - 10.9.6 Recurrent Neural Networks
- 10.10 Exercises

## 11 Survival Analysis and Censored Data
- 11.1 Survival and [[Censoring]] Times
- 11.2 A Closer Look at Censoring
- 11.3 The Kaplan-Meier Survival Curve
- 11.4 The Log-Rank Test
- 11.5 Regression Models With a Survival Response
    - 11.5.1 The [[Hazard Rate|Hazard Function]]
    - 11.5.2 Proportional Hazards
    - 11.5.3 Example: Brain Cancer Data
    - 11.5.4 Example: Publication Data
- 11.6 Shrinkage for the Cox Model
- 11.7 Additional Topics
    - 11.7.1 Area Under the Curve for Survival Analysis
    - 11.7.2 Choice of Time Scale
    - 11.7.3 Time-Dependent Covariates
    - 11.7.4 Checking the Proportional Hazards Assumption
    - 11.7.5 Survival Trees
- 11.8 Lab: Survival Analysis
    - 11.8.1 Brain Cancer Data
    - 11.8.2 Publication Data
    - 11.8.3 Call Center Data
- 11.9 Exercises

## 12 Unsupervised Learning
- 12.1 The Challenge of Unsupervised Learning
- 12.2 [[Principal Components Analysis]]
    - 12.2.1 What Are Principal Components?
    - 12.2.2 Another Interpretation of Principal Components
    - 12.2.3 The [[Proportion of Variance Explained]]
    - 12.2.4 More on PCA
    - 12.2.5 Other Uses for Principal Components
- 12.3 Missing Values and Matrix Completion
- 12.4 [[Clustering]] Methods
    - 12.4.1 [[K-Means Clustering]]
    - 12.4.2 [[Hierarchical Clustering]]
    - 12.4.3 Practical Issues in Clustering
- 12.5 Lab: Unsupervised Learning
    - 12.5.1 Principal Components Analysis
    - 12.5.2 Matrix Completion
    - 12.5.3 Clustering
    - 12.5.4 NCI60 Data Example
- 12.6 Exercises

## 13 Multiple Testing
- 13.1 A Quick Review of [[Hypothesis Testing]]
    - 13.1.1 Testing a Hypothesis
    - 13.1.2 Type I and Type II Errors
- 13.2 The Challenge of Multiple Testing
- 13.3 The Family-Wise Error Rate
    - 13.3.1 What is the Family-Wise Error Rate?
    - 13.3.2 Approaches to Control the Family-Wise Error Rate
    - 13.3.3 Trade-Off Between the FWER and Power
- 13.4 The False Discovery Rate
    - 13.4.1 Intuition for the False Discovery Rate
    - 13.4.2 The Benjamini-Hochberg Procedure
- 13.5 A Re-Sampling Approach to p-Values and False Discovery Rates
    - 13.5.1 A Re-Sampling Approach to the p-Value
    - 13.5.2 A Re-Sampling Approach to the False Discovery Rate
    - 13.5.3 When Are Re-Sampling Approaches Useful?
- 13.6 Lab: Multiple Testing
    - 13.6.1 Review of Hypothesis Tests
    - 13.6.2 The Family-Wise Error Rate
    - 13.6.3 The False Discovery Rate
    - 13.6.4 A Re-Sampling Approach
- 13.7 Exercises

## Related readings
- [[An Introduction to Generalized Linear Models (Dobson - 2018)]] — assigned with it for Domain C (Extended Linear Models) of the MAS-I outline
- [[Generalized Linear Models (Larsen - 2015)]] — assigned with it for Domain C of the MAS-I outline
- [[Introduction to Mathematical Statistics (Hogg et al. - 2018)]] — assigned with it for Domain C of the MAS-I outline
- [[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)]] — assigned with it for Domain C (Statistical Learning) of the MAS-II outline

## Sources
- [An Introduction to Statistical Learning with Applications in R, Second Edition (Springer, 2021)](https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf) — the document, in the copy the content outlines link (first printing, August 4, 2021): title page, preface, and the printed contents checked against the PDF's bookmarks
- [An Introduction to Statistical Learning (statlearning.com)](https://www.statlearning.com/) — the authors' site, which offers the second edition's PDF free
- [CAS Exam MAS-I Content Outline (2025)](https://www.casact.org/sites/default/files/2023-06/MASI_Content_Outline.pdf) — the citation (2nd edition, Springer, 2021) and the MAS-I assignment
- [CAS Exam MAS-II Content Outline (2025)](https://www.casact.org/sites/default/files/2023-06/MASII_Content_Outline.pdf) — the MAS-II assignment
- [Crossref record for doi:10.1007/978-1-0716-1418-1](https://api.crossref.org/works/10.1007/978-1-0716-1418-1) — the print ISBN, the authors and the series (Springer Texts in Statistics)
