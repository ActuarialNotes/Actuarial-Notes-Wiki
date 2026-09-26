---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:88139d933a5922712647a67fd6a53b74eb514d5f5f5fdd1b9fb73161d5973f71
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Exam MAS-II (CAS).md
---

<div class="exam-nav"
     data-current="MAS-II|Modern Actuarial Statistics II">
</div>

# Exam MAS-II
The **Modern Actuarial Statistics II** exam is a 4-hour computer-based exam covering [[Credibility Theory]], [[Linear Mixed Model|Linear Mixed Models]], [[Statistical Learning]], and [[Time Series]] as part of the ACAS credentialing pathway.

## Prerequisite knowledge
- [[Calculus]] and [[Concepts/Probability]] at a thorough level.
- [[Linear Algebra]] at the level assumed as a prerequisite for an undergraduate regression course.
- All concepts from [[Exam MAS-I (CAS)|MAS-I]], including [[Generalized Linear Model]]s and [[Statistical Learning]] fundamentals.

## Learning Objectives

> [!example]- A. Introduction to Credibility {15–25%}
> 
> Candidates should understand and be able to calculate [[Credibility|credibility-weighted estimates]].
> 
> 1. Calculate [[Limited Fluctuation Credibility|classical]] ([[Limited Fluctuation Credibility]]), [[Bühlmann Credibility]], [[Bühlmann-Straub Credibility]], and [[Bayesian Credibility]]-weighted estimates for [[Frequency|frequency]], [[Severity|severity]], and [[Aggregate Loss Model|aggregate loss]]
> 2. Understand the framework used for the [[Limited Fluctuation Credibility|classical]] ([[Limited Fluctuation Credibility|limited fluctuation]]), [[Bühlmann Credibility|Bühlmann]], [[Bühlmann-Straub Credibility|Bühlmann-Straub]], and [[Bayesian Credibility|Bayesian]] [[Credibility|credibility procedures]]
> 3. Determine the [[Full Credibility Standard|standard for full credibility]] and apply the [[Partial Credibility|square-root rule]] for [[Partial Credibility|partial credibility]]
> 4. Compute the [[Bühlmann Credibility|Bühlmann structural parameters]] — the [[Expected Value of Process Variance]] ([[Expected Value of Process Variance|EPV]]) and the [[Variance of Hypothetical Means]] ([[Variance of Hypothetical Means|VHM]]) — and the [[Bühlmann Credibility|credibility constant]] $k$ they define
> 5. Derive the [[Posterior Distribution|posterior]] and [[Predictive Distribution|predictive distributions]] under a [[Conjugate Prior|conjugate prior]], and recognize when the [[Bayesian Credibility|Bayesian]] and [[Bühlmann Credibility|Bühlmann estimates]] [[Exact Credibility|coincide]]
> 6. Estimate the [[Bühlmann Credibility|structural parameters]] from [[Risk Experience|data]] using [[Empirical Bayes Credibility|empirical Bayes (non-parametric and semi-parametric)]] methods
> 7. Select an appropriate [[Complement of Credibility|complement of credibility]]
> 
> ### Credibility procedures
> - [[Limited Fluctuation Credibility]] — [[Full Credibility Standard]], [[Partial Credibility]]
> - [[Bühlmann Credibility]] — [[Expected Value of Process Variance]], [[Variance of Hypothetical Means]]
> - [[Bühlmann-Straub Credibility]] — [[Exposure Base|unequal exposures]]
> - [[Bayesian Credibility]] — [[Conjugate Prior]], [[Predictive Distribution]]
> - [[Empirical Bayes Credibility]] — [[Bühlmann Credibility|structural parameters]] estimated from [[Risk Experience|experience]]
> 
> **Readings:** Tse

> [!example]- B. Linear Mixed Models {10–20%}
> 
> Candidates should understand the [[Model Structure|structure]] of [[Linear Mixed Model]]s, including how to accommodate models with [[Clustered Data|correlated observations]] or models where the [[Variance|variance]] is either not assumed to be [[Variance Function|constant]] or a [[Variance Function|function]] of the [[Expected Value|mean]].
> 
> 1. Understand the assumptions behind the [[Linear Mixed Model]] design, and distinguish [[Fixed Effects|fixed effects]] from [[Random Effects|random effects]]
> 2. Understand how to use a [[Hierarchical Model]], including [[Random Intercept and Slope|random intercept and random slope]] specifications and [[Nested and Crossed Factors|nested]] versus [[Nested and Crossed Factors|crossed grouping factors]]
> 3. Interpret the [[Variance Components|variance components]] and the implied [[Covariance Structure|covariance structure]] of the [[Residual|residuals]], and compute the [[Intraclass Correlation]]
> 4. Fit a [[Linear Mixed Model|mixed model]] by [[Restricted Maximum Likelihood]] ([[Restricted Maximum Likelihood|REML]]) or [[Maximum Likelihood Estimation|maximum likelihood]], and know which of the two a given comparison requires
> 5. Interpret [[Model Output|output]] from a [[Linear Mixed Model]] and make appropriate choices when evaluating [[Model Selection|modeling options]], using the [[Likelihood Ratio Test]], [[AIC]] and [[BIC]]
> 6. Interpret [[Linear Mixed Model|linear mixed model]] [[Model Diagnostics|diagnostics]] and [[Summary Statistics|summary statistics]] to evaluate the [[Model Structure|model structure]] and [[Variable Selection|variable selection]]
> 7. Recognize the [[Best Linear Unbiased Predictor]] ([[Best Linear Unbiased Predictor|BLUP]]) of a [[Random Effects|random effect]] as a [[Credibility|credibility-weighted estimate]]
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
> Candidates should understand the mechanics of the [[Statistical Learning|algorithms]] identified in the tasks below and recognize their inherent strengths and weaknesses to select the most appropriate procedure for the [[Statistical Learning|learning task]] at hand.
> 
> 1. Distinguish [[Supervised Learning|supervised]] from [[Unsupervised Learning|unsupervised]] learning, and explain the [[Bias-Variance Tradeoff|bias-variance tradeoff]] behind [[Test Error|test-error]] behaviour
> 2. Estimate [[Test Error|test error]] by [[Cross-Validation|cross-validation]] and estimate [[Sampling Distribution|sampling variability]] by the [[Bootstrap|bootstrap]]
> 3. Compute [[K-Nearest Neighbors]] ([[K-Nearest Neighbors|KNN]])
> 4. Prune [[Decision Tree]]s by [[Tree Pruning|cost-complexity pruning]]
> 5. Calculate [[Node Impurity|summary statistics]] for a set of [[Decision Tree|decision trees]] (e.g., [[Gini Index]], [[Entropy]], [[Residual Sum of Squares]])
> 6. Understand the assumptions underlying different [[Tree Ensemble]] methods — [[Bagging|bagging]], [[Random Forest|random forests]] and [[Boosting|boosting]] — and the improvements they can make to [[Decision Tree|decision trees]]
> 7. Read [[Out-of-Bag Error|out-of-bag error]] and [[Variable Importance|variable importance]] from a [[Tree Ensemble|fitted ensemble]]
> 8. Compute elements of [[Principal Components Analysis]] ([[Principal Components Analysis|PCA]]) (e.g., [[Loading Vector|loading vectors]], [[Proportion of Variance Explained|variance explained]])
> 9. Interpret [[Principal Components Analysis]] ([[Principal Components Analysis|PCA]]) [[Model Output|software outputs]], including the [[Scree Plot|scree plot]]
> 10. Perform the computations behind [[Clustering]] procedures (e.g., [[K-Means Clustering]], [[Hierarchical Clustering|hierarchical clustering]])
> 11. Interpret [[Clustering|clustering procedure]] [[Model Output|outputs]], including the [[Dendrogram|dendrogram]] and the choice of [[Linkage|linkage]]
> 12. Interpret [[Neural Network]] results, including the role of the [[Activation Function|activation function]], [[Hidden Layer|hidden layers]], and [[Backpropagation|backpropagation]]
> 13. Apply [[Regularization|regularization]] to control [[Bias-Variance Tradeoff|model complexity]] in a [[Linear Regression|linear]] or [[Extended Linear Model|extended linear model]]
> 14. Calculate measures of [[Predictive Accuracy|model predictive accuracy]] (e.g., [[Lift]], [[Gini Index]], [[AUROC]], the [[Confusion Matrix|confusion matrix]])
> 15. Compare models via [[Predictive Accuracy|predictive performance measures]] (e.g., [[Double Lift Chart|double lift chart]], [[Quantile Plot|quantile plot]])
> 
> ### Learning framework
> - [[Statistical Learning]] — the overall framework these methods sit in
> - [[Supervised Learning]] · [[Unsupervised Learning]]
> - [[Bias-Variance Tradeoff]] · [[Cross-Validation]] · [[Bootstrap]] · [[Regularization]]
> - [[Test Error|Test error]] measured by the [[Mean Square Error]]; [[Bootstrap|bootstrap variability]] by the [[Standard Deviation]] of the [[Bootstrap|resampled estimates]]
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
> **Readings:** James et al. · GLM

> [!example]- D. Time Series with Constant Variance {15–25%}
> 
> Candidates should understand the basic applications of the [[ARIMA]] ([[ARIMA|Auto Regressive Integrated Moving Average]]) [[Time Series|time series]] model.
> 
> 1. Model relationships of current and [[Backward Shift Operator|past values]] of a [[Time Series|statistic/metric]] using [[Autoregressive Model|autoregressive]] and [[Moving Average Model|moving average]] terms
> 2. Test a [[Time Series|series]] for [[Stationarity|stationarity]] and achieve it by [[Differencing|differencing]]; recognize [[White Noise|white noise]] and the [[Random Walk|random walk]] as limiting cases
> 3. Identify a model from the [[Autocorrelation Function]] ([[Autocorrelation Function|ACF]]) and [[Partial Autocorrelation Function]] ([[Partial Autocorrelation Function|PACF]]), and check [[Residual|residuals]] against the same [[Correlogram|plots]]
> 4. Understand the framework of [[ARIMA]] models (e.g., [[Deterministic and Stochastic Trend|trends]] and [[Seasonality|seasonality]])
> 5. Separate a [[Time Series|series]] into [[Deterministic and Stochastic Trend|trend]], [[Seasonality|seasonal]] and [[Time Series Decomposition|irregular parts]] by [[Time Series Decomposition|decomposition]], and smooth it with [[Exponential Smoothing|exponential smoothing]]
> 6. Calculate [[Deterministic and Stochastic Trend|trends]] and [[Seasonality|seasonality]] using [[Time Series]] with [[Linear Regression|regression]] (e.g., [[Deterministic and Stochastic Trend|deterministic vs. stochastic trend]])
> 7. Interpret [[Time Series|time series]] [[Model Output|output]] to make [[Time Series Forecast|forecasts]], with [[Prediction Interval|prediction intervals]]
> 
> ### Building blocks
> - [[Stationarity]] · [[White Noise]] · [[Random Walk]] · [[Differencing]]
> - [[Autocorrelation Function]] · [[Partial Autocorrelation Function]]
> - [[Autoregressive Model]] · [[Moving Average Model]] · [[ARIMA]]
> 
> ### Trend and seasonality
> - [[Deterministic and Stochastic Trend]] · [[Seasonality]]
> - [[Time Series Decomposition]] · [[Exponential Smoothing]] · [[Time Series Forecast]]
> 
> **Readings:** Cowpertwait


## Source Material
> [!answer]- Source Material {5 Sources}
> 
> - [[Introductory Time Series with R (Cowpertwait - 2009)]]
>      - D1–D4
> - [[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)]]
>      - C10–C11
> - [[An Introduction to Statistical Learning (James et al. - 2021)]]
>      - C1–C9
> - [[Nonlife Actuarial Models (Tse - 2009)]]
>      - A1–A2
> - [[Linear Mixed Models (West et al. - 2022)]]
>      - B1–B4
