---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:78f4b465ee4a9179f4d7ca5ee1fa3b64dbca1318ba79d20fa340f256ee33ea41
  sources:
    - "CAS, Exam Content Outline — Modern Actuarial Statistics II (MAS-II), 2026 (MASII_CO_S_2026 v06 2026_1_13), PDF pp.1-6: delivery p.1, domains and weights p.2, Domain A-D preambles, tasks and readings pp.2-3, Complete Text References p.4, Assumed Knowledge p.5, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
    - "James et al., An Introduction to Statistical Learning 2nd ed., CAS-hosted PDF, full-text search located by bookmark section (2.2, 4.4, 8.1-8.2, 10.1-10.7, 12.1-12.4), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare, Tevet & Guller, GLMs for Insurance Rating, CAS Monograph 5, 2nd ed., full-text search, Ch.7 Model Validation and Selection, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Salis, Measures of Predictive Accuracy, CAS Study Note for MAS-II (Nov 2025), full-text search, sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010 — https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, printed Contents pp.ix-x (PDF pp.11-12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "Cowpertwait & Metcalfe, Introductory Time Series with R (Springer 2009), contents, library TOC scan PDF pp.2-6, sha256:64c8d1acd2d515e84acce255da1766a7b544603ad1096f40b2ed7949bc4d791c — https://obalkyknih.cz/file/toc/233741/pdf"
    - "West, Welch & Galecki, Linear Mixed Models 3rd ed., Routledge product page, Table of Contents (Chs 1-9, Apps A-C), sha256:92d5e15fd36f955bae4b032095aa1b1f6ce8ab8c20ff57d7df47283321d6454a — https://www.routledge.com/Linear-Mixed-Models-A-Practical-Guide-Using-Statistical-Software/West-Welch-Galecki/p/book/9781032019321"
  open_findings: 1
  open_critical: 0
  log: .verify/Exam MAS-II (CAS).md
---

<div class="exam-nav"
     data-current="MAS-II|Modern Actuarial Statistics II">
</div>

# Exam MAS-II
The **Modern Actuarial Statistics II** exam is a 4-hour computer-based exam covering [[Credibility Theory]], [[Linear Mixed Model|Linear Mixed Models]], [[Statistical Learning]], and [[Time Series]] as part of the ACAS credentialing pathway.

> [!question]- Prerequisite knowledge
>
> - [[Calculus]] and [[Concepts/Probability]] at a thorough level.
> - [[Linear Algebra]] at the level assumed as a prerequisite for an undergraduate regression course.
> - All concepts from [[Exam MAS-I (CAS)|MAS-I]], including [[Generalized Linear Model]]s and [[Statistical Learning]] fundamentals.

## Learning Objectives

> [!example]- A. Introduction to Credibility {15–25%}
> 
> Candidates should understand and be able to calculate [[Credibility|credibility weighted estimates]].
> 
> 1. Calculate [[Limited Fluctuation Credibility|classical (limited fluctuation)]], [[Bühlmann Credibility|Bühlmann]], [[Bühlmann-Straub Credibility|Bühlmann-Straub]], and [[Bayesian Credibility|Bayesian credibility]]-weighted estimates for [[Frequency|frequency]], [[Severity|severity]], and [[Aggregate Loss Model|aggregate loss]]
>    - *Key concepts:* [[Full Credibility Standard]] · [[Partial Credibility]] · [[Expected Value of Process Variance]] · [[Variance of Hypothetical Means]] · [[Empirical Bayes Credibility]] · [[Risk Experience]] · [[Complement of Credibility]]
> 2. Understand the framework used for the [[Limited Fluctuation Credibility|classical (limited fluctuation)]], [[Bühlmann Credibility|Bühlmann]], [[Bühlmann-Straub Credibility|Bühlmann-Straub]], and [[Bayesian Credibility|Bayesian]] [[Credibility|credibility procedures]]
>    - *Key concepts:* [[Posterior Distribution]] · [[Predictive Distribution]] · [[Conjugate Prior]] · [[Exact Credibility]]
> 
> ### Credibility procedures
> - [[Limited Fluctuation Credibility]] — [[Full Credibility Standard]], [[Partial Credibility]]
> - [[Bühlmann Credibility]] — [[Expected Value of Process Variance]], [[Variance of Hypothetical Means]]
> - [[Bühlmann-Straub Credibility]] — [[Exposure Base|unequal exposures]]
> - [[Bayesian Credibility]] — [[Conjugate Prior]], [[Predictive Distribution]]
> - [[Empirical Bayes Credibility]] — [[Empirical Bayes Credibility|structural parameters]] estimated from [[Risk Experience|experience]]
> 
> **Readings:** Tse

> [!example]- B. Linear Mixed Models {10–20%}
> 
> Candidates should understand the [[Model Structure|structure]] of [[Linear Mixed Model|linear mixed models]], including how to accommodate models with [[Clustered Data|correlated observations]] or models where the [[Variance|variance]] is either not assumed to be [[Variance Function|constant]] or a [[Variance Function|function]] of the [[Expected Value|mean]].
> 
> 1. Understand the assumptions behind the [[Linear Mixed Model|linear mixed model]] design
>    - *Key concepts:* [[Fixed Effects]] · [[Random Effects]]
> 2. Understand how to use a [[Hierarchical Model|hierarchical model]]
>    - *Key concepts:* [[Random Intercept and Slope]] · [[Nested and Crossed Factors]] · [[Variance Components]] · [[Covariance Structure]] · [[Residual]] · [[Intraclass Correlation]]
> 3. Interpret [[Model Output|output]] from a [[Linear Mixed Model|linear mixed model]] and make appropriate choices when evaluating [[Model Selection|modeling options]]
>    - *Key concepts:* [[Restricted Maximum Likelihood]] · [[Maximum Likelihood Estimation]] · [[Likelihood Ratio Test]] · [[AIC]] · [[BIC]]
> 4. Interpret [[Linear Mixed Model|linear mixed model]] [[Model Diagnostics|diagnostics]] and [[Summary Statistics|summary statistics]] to evaluate the [[Model Structure|linear mixed model structure]] and [[Variable Selection|variable selection]]
>    - *Key concepts:* [[Best Linear Unbiased Predictor]]
> 
> ### Model components
> - [[Fixed Effects]] — the [[Fixed Effects|population-average part]], $X\beta$
> - [[Random Effects]] — [[Random Effects|group-level departures]], $Zb$
> - [[Variance Components]] · [[Covariance Structure]] · [[Intraclass Correlation]]
> - [[Random Intercept and Slope]] · [[Hierarchical Model]]
> - [[Restricted Maximum Likelihood]] · [[Likelihood Ratio Test]] · [[Best Linear Unbiased Predictor]]
> 
> **Readings:** West

> [!example]- C. Statistical Learning {40–50%}
> 
> Candidates should understand the mechanics of the [[Statistical Learning|algorithms]] identified in the tasks below and recognize their inherent strengths and weaknesses to be able to select the most appropriate procedure for the [[Statistical Learning|learning task]] at hand.
> 
> 1. Compute [[K-Nearest Neighbors|K-nearest neighbors (KNN)]]
>    - *Key concepts:* [[Supervised Learning]] · [[Unsupervised Learning]] · [[Bias-Variance Tradeoff]] · [[Test Error]]
> 2. Prune [[Decision Tree|decision trees]]
>    - *Key concepts:* [[Tree Pruning]]
> 3. Calculate the [[Node Impurity|summary statistics]] for a set [[Decision Tree|decision of trees]] (e.g., [[Gini Index|Gini index]], [[Entropy|entropy]], [[Residual Sum of Squares|residual sum of squares]])
> 4. Understand the assumptions underlying different [[Tree Ensemble|tree ensemble]] methods and the improvements they can make to [[Decision Tree|decision trees]]
>    - *Key concepts:* [[Bagging]] · [[Random Forest]] · [[Boosting]] · [[Out-of-Bag Error]] · [[Variable Importance]]
> 5. Compute elements of [[Principal Components Analysis|principal components analysis (PCA)]] (e.g., [[Loading Vector|loading vectors]], [[Proportion of Variance Explained|variance explained]])
> 6. Interpret [[Principal Components Analysis|principal components analysis (PCA)]] [[Model Output|software outputs]]
>    - *Key concepts:* [[Scree Plot]]
> 7. Perform the computations behind [[Clustering|clustering]] procedures (e.g., [[K-Means Clustering|K-means]], [[Hierarchical Clustering|hierarchical]])
> 8. Interpret [[Clustering|clustering procedures]] [[Model Output|outputs]]
>    - *Key concepts:* [[Dendrogram]] · [[Linkage]]
> 9. Interpret [[Neural Network|neural network]] results
>    - *Key concepts:* [[Activation Function]] · [[Hidden Layer]] · [[Backpropagation]]
> 10. Calculate measures of [[Predictive Accuracy|model predictive accuracy]] (e.g., [[Lift]], [[Gini Index|Gini index]], [[AUROC]])
>    - *Key concepts:* [[Confusion Matrix]]
> 11. Compare models via [[Predictive Accuracy|predictive performance measures]] (e.g., [[Double Lift Chart|double lift chart]])
>    - *Key concepts:* [[Quantile Plot]]
> 
> ### Learning framework
> - [[Statistical Learning]] — the overall framework these methods sit in
> - [[Supervised Learning]] · [[Unsupervised Learning]]
> - [[Bias-Variance Tradeoff]]
> - [[Test Error|Test error]] measured by the [[Mean Square Error]]
> 
> ### Supervised methods
> - [[K-Nearest Neighbors]]
> - [[Decision Tree]] — [[Tree Pruning]], [[Gini Index]], [[Entropy]], [[Residual Sum of Squares]]
> - [[Tree Ensemble]] — [[Bagging]], [[Random Forest]], [[Boosting]], [[Out-of-Bag Error]], [[Variable Importance]]
> - [[Neural Network]] — [[Activation Function]], [[Backpropagation]]
> 
> ### Unsupervised methods
> - [[Principal Components Analysis]] — [[Loading Vector]], [[Proportion of Variance Explained]], [[Scree Plot]]
> - [[Clustering]] — [[K-Means Clustering]], [[Hierarchical Clustering]], [[Dendrogram]], [[Linkage]]
> 
> ### Model evaluation
> - [[Confusion Matrix]] · [[AUROC]] · [[Gini Index]]
> - [[Lift]] · [[Double Lift Chart]] · [[Quantile Plot]]
> 
> **Readings:** James et al. · GLM · Salis

> [!example]- D. Time Series with Constant Variance {15–25%}
> 
> Candidates should understand the basic applications of the [[ARIMA|Auto Regressive Integrated Moving Average]] ([[ARIMA]]) [[Time Series|time series]] model.
> 
> 1. Model relationships of current and [[Backward Shift Operator|past values]] of a [[Time Series|statistic/metric]]
>    - *Key concepts:* [[Autoregressive Model]] · [[Moving Average Model]] · [[Stationarity]] · [[Differencing]] · [[White Noise]] · [[Random Walk]] · [[Autocorrelation Function]] · [[Partial Autocorrelation Function]] · [[Correlogram]]
> 2. Understand the framework of [[ARIMA]] models (e.g., [[Deterministic and Stochastic Trend|trends]] and [[Seasonality|seasonality]])
>    - *Key concepts:* [[Time Series Decomposition]]
> 3. Calculate [[Deterministic and Stochastic Trend|trends]] and [[Seasonality|seasonality]] using [[Time Series|time series]] with [[Linear Regression|regression]] (e.g., [[Deterministic and Stochastic Trend|deterministic vs. stochastic trend]])
> 4. Interpret [[Time Series|time series]] [[Model Output|output]] to make [[Time Series Forecast|forecasts]]
>    - *Key concepts:* [[Prediction Interval]]
> 
> ### Building blocks
> - [[Stationarity]] · [[White Noise]] · [[Random Walk]] · [[Differencing]]
> - [[Autocorrelation Function]] · [[Partial Autocorrelation Function]]
> - [[Autoregressive Model]] · [[Moving Average Model]] · [[ARIMA]]
> 
> ### Trend and seasonality
> - [[Deterministic and Stochastic Trend]] · [[Seasonality]]
> - [[Time Series Decomposition]] · [[Time Series Forecast]]
> 
> **Readings:** Cowpertwait


## Source Material
> [!answer]- Source Material {6 Sources}
> 
> - [[Introductory Time Series with R (Cowpertwait - 2009)]]
>      - D1–D4 — Chapters 1–5 (excluding Sections 3.3 and 3.4), 6, 7 (Sections 7.1, 7.2 and 7.3)
> - [[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)]]
>      - C10–C11 — CAS Monograph #5, 2nd edition, Chapter 7
> - [[An Introduction to Statistical Learning (James et al. - 2021)]]
>      - C1–C9 — 2nd edition, Chapters 1 (Background reading only), 2.2, 4.4.2 (Confusion Matrix Only), 8, 10, 12. Exam questions will not be sourced directly from Chapter 1.
> - [[Measures of Predictive Accuracy (Salis - 2025)]]
>      - C3, C10 — CAS Study Note, November 2025
> - [[Nonlife Actuarial Models (Tse - 2009)]]
>      - A1–A2 — Chapters 6.1–6.3, 7.1–7.4, 8.1–8.2, and 9.1–9.2
> - [[Linear Mixed Models (West et al. - 2022)]]
>      - B1–B4 — 3rd Edition, all chapters, excluding coding examples; Additional Notes on Shrinkage Means (http://www-personal.umich.edu/~bwest/shrinkage.doc)
