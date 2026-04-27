[[Actuarial Notes Wiki|Wiki]] / **MAS-II (CAS)**

<div class="exam-nav"
     data-current="MAS-II|Modern Actuarial Statistics II"
</div>

## MAS-II (CAS)

The **Modern Actuarial Statistics II** is a 4-hour computer-based exam covering [[Credibility Theory]], [[Linear Mixed Models]], [[Statistical Learning]], and [[Time Series]] as part of the ACAS credentialing pathway.


> [!answer]- 📅 Exam Schedule 2026
> 
> <div class="highlight-upcoming" data-date-col="0"></div>
> 
> |Dates|Exam|
> |---|---|
> |Jan 28 - Feb 3|MAS-II|
> |Apr 22 - May 1|MAS-II|
> |Jul 29 - Aug 4|MAS-II|
> |Oct 28 - Nov 5|MAS-II|
> 
> - [Register](https://www.casact.org/exams-admissions/exam-registration) ($550 registration fee)

> [!answer]- 📄 Download Resources 2 PDFs
> 
> - [Content Outline (August 2025)](https://www.casact.org/sites/default/files/2025-08/MAS_II_Content_Outline__August_2025_.pdf)
> - [CAS Exam MAS-II Page](https://www.casact.org/exam/exam-mas-ii-modern-actuarial-statistics-ii)


> [!answer]- 📕 Source Material 5 Sources
> 
> |Source|Domains / Tasks|
> |---|---|
> |[[Introductory Time Series with R (Cowpertwait - 2009)]]|D1–D4|
> |[[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)]]|C10–C11|
> |[[An Introduction to Statistical Learning (James et al. - 2021)]]|C1–C9|
> |[[Nonlife Actuarial Models (Tse - 2009)]]|A1–A2|
> |[[Linear Mixed Models (West et al. - 2022)]]|B1–B4|

### Prerequisite knowledge

Knowledge of the following concepts is expected:

- [[Calculus]] and [[Concepts/Probability]] at a thorough level.
- [[Linear Algebra]] at the level assumed as a prerequisite for an undergraduate regression course.
- All concepts from [[MAS-I (CAS)]], including [[Generalized Linear Model]]s and [[Statistical Learning]] fundamentals.

### Learning Objectives

> [!example]- A. Introduction to Credibility {15–25%}
> 
> ### A. Introduction to Credibility
> 
> Candidates should understand and be able to calculate credibility-weighted estimates.
> 
> 1. Calculate classical ([[Limited Fluctuation Credibility]]), [[Bühlmann Credibility]], [[Bühlmann-Straub Credibility]], and [[Bayesian Credibility]]-weighted estimates for frequency, severity, and aggregate loss
> 2. Understand the framework used for the classical (limited fluctuation), Bühlmann, Bühlmann-Straub, and Bayesian credibility procedures
> 
> **Readings:** Tse

> [!example]- B. Linear Mixed Models {10–20%}
> 
> ### B. Linear Mixed Models
> 
> Candidates should understand the structure of [[Linear Mixed Model]]s, including how to accommodate models with correlated observations or models where the variance is either not assumed to be constant or a function of the mean.
> 
> 1. Understand the assumptions behind the [[Linear Mixed Model]] design
> 2. Understand how to use a [[Hierarchical Model]]
> 3. Interpret output from a [[Linear Mixed Model]] and make appropriate choices when evaluating modeling options
> 4. Interpret linear mixed model diagnostics and summary statistics to evaluate the model structure and variable selection
> 
> **Readings:** West

> [!example]- C. Statistical Learning {40–50%}
> 
> ### C. Statistical Learning
> 
> Candidates should understand the mechanics of the algorithms identified in the tasks below and recognize their inherent strengths and weaknesses to select the most appropriate procedure for the learning task at hand.
> 
> 1. Compute [[K-Nearest Neighbors]] (KNN)
> 2. Prune [[Decision Tree]]s
> 3. Calculate summary statistics for a set of decision trees (e.g., [[Gini Index]], [[Entropy]], [[Residual Sum of Squares]])
> 4. Understand the assumptions underlying different [[Tree Ensemble]] methods and the improvements they can make to decision trees
> 5. Compute elements of [[Principal Components Analysis]] (PCA) (e.g., loading vectors, variance explained)
> 6. Interpret [[Principal Components Analysis]] (PCA) software outputs
> 7. Perform the computations behind [[Clustering]] procedures (e.g., [[K-Means Clustering]], hierarchical clustering)
> 8. Interpret clustering procedure outputs
> 9. Interpret [[Neural Network]] results
> 10. Calculate measures of model predictive accuracy (e.g., [[Lift]], [[Gini Index]], [[AUROC]])
> 11. Compare models via predictive performance measures (e.g., double lift chart)
> 
> **Readings:** James et al. · GLM

> [!example]- D. Time Series with Constant Variance {15–25%}
> 
> ### D. Time Series with Constant Variance
> 
> Candidates should understand the basic applications of the [[ARIMA]] (Auto Regressive Integrated Moving Average) time series model.
> 
> 12. Model relationships of current and past values of a statistic/metric
> 13. Understand the framework of [[ARIMA]] models (e.g., trends and seasonality)
> 14. Calculate trends and seasonality using [[Time Series]] with regression (e.g., deterministic vs. stochastic trend)
> 15. Interpret time series output to make forecasts
> 
> **Readings:** Cowpertwait