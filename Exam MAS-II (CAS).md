<div class="exam-nav"
     data-current="MAS-II|Modern Actuarial Statistics II"
</div>

# MAS-II (CAS)
The **Modern Actuarial Statistics II** exam is a 4-hour computer-based exam covering [[Credibility Theory]], [[Linear Mixed Model|Linear Mixed Models]], [[Statistical Learning]], and [[Time Series]] as part of the ACAS credentialing pathway.

<div class="exam-guides"></div>

## Prerequisite knowledge
- [[Calculus]] and [[Concepts/Probability]] at a thorough level.
- [[Linear Algebra]] at the level assumed as a prerequisite for an undergraduate regression course.
- All concepts from [[Exam MAS-I (CAS)|MAS-I]], including [[Generalized Linear Model]]s and [[Statistical Learning]] fundamentals.

## Learning Objectives

> [!example]- A. Introduction to Credibility {15–25%}
> 
> Candidates should understand and be able to calculate credibility-weighted estimates.
> 
> 1. Calculate classical ([[Limited Fluctuation Credibility]]), [[Bühlmann Credibility]], [[Bühlmann-Straub Credibility]], and [[Bayesian Credibility]]-weighted estimates for [[Frequency|frequency]], [[Severity|severity]], and [[Aggregate Loss Model|aggregate loss]]
> 2. Understand the framework used for the classical ([[Limited Fluctuation Credibility|limited fluctuation]]), [[Bühlmann Credibility|Bühlmann]], [[Bühlmann-Straub Credibility|Bühlmann-Straub]], and [[Bayesian Credibility|Bayesian]] credibility procedures
> 3. Determine the [[Full Credibility Standard|standard for full credibility]] and apply the square-root rule for [[Partial Credibility|partial credibility]]
> 4. Compute the Bühlmann structural parameters — the [[Expected Value of Process Variance]] (EPV) and the [[Variance of Hypothetical Means]] (VHM) — and the credibility constant $k$ they define
> 5. Derive the posterior and [[Predictive Distribution|predictive distributions]] under a [[Conjugate Prior|conjugate prior]], and recognize when the Bayesian and Bühlmann estimates coincide
> 6. Estimate the structural parameters from data using [[Empirical Bayes Credibility|empirical Bayes (non-parametric and semi-parametric)]] methods
> 7. Select an appropriate [[Complement of Credibility|complement of credibility]]
> 
> ### Credibility procedures
> - [[Limited Fluctuation Credibility]] — [[Full Credibility Standard]], [[Partial Credibility]]
> - [[Bühlmann Credibility]] — [[Expected Value of Process Variance]], [[Variance of Hypothetical Means]]
> - [[Bühlmann-Straub Credibility]] — unequal exposures
> - [[Bayesian Credibility]] — [[Conjugate Prior]], [[Predictive Distribution]]
> - [[Empirical Bayes Credibility]] — structural parameters estimated from experience
> 
> **Readings:** Tse

> [!example]- B. Linear Mixed Models {10–20%}
> 
> Candidates should understand the structure of [[Linear Mixed Model]]s, including how to accommodate models with correlated observations or models where the variance is either not assumed to be constant or a function of the mean.
> 
> 1. Understand the assumptions behind the [[Linear Mixed Model]] design, and distinguish [[Fixed Effects|fixed effects]] from [[Random Effects|random effects]]
> 2. Understand how to use a [[Hierarchical Model]], including [[Random Intercept and Slope|random intercept and random slope]] specifications and nested versus crossed grouping factors
> 3. Interpret the [[Variance Components|variance components]] and the implied [[Covariance Structure|covariance structure]] of the residuals, and compute the [[Intraclass Correlation]]
> 4. Fit a mixed model by [[Restricted Maximum Likelihood]] (REML) or maximum likelihood, and know which of the two a given comparison requires
> 5. Interpret output from a [[Linear Mixed Model]] and make appropriate choices when evaluating modeling options, using the [[Likelihood Ratio Test]], [[AIC]] and [[BIC]]
> 6. Interpret linear mixed model diagnostics and summary statistics to evaluate the [[Model Structure|model structure]] and [[Variable Selection|variable selection]]
> 7. Recognize the [[Best Linear Unbiased Predictor]] (BLUP) of a random effect as a credibility-weighted estimate
> 
> ### Model components
> - [[Fixed Effects]] — the population-average part, $X\beta$
> - [[Random Effects]] — group-level departures, $Zb$
> - [[Variance Components]] · [[Covariance Structure]] · [[Intraclass Correlation]]
> - [[Random Intercept and Slope]] · [[Hierarchical Model]]
> - [[Restricted Maximum Likelihood]] · [[Likelihood Ratio Test]] · [[Best Linear Unbiased Predictor]]
> 
> **Readings:** West

> [!example]- C. Statistical Learning {40–50%}
> 
> Candidates should understand the mechanics of the algorithms identified in the tasks below and recognize their inherent strengths and weaknesses to select the most appropriate procedure for the learning task at hand.
> 
> 1. Distinguish [[Supervised Learning|supervised]] from [[Unsupervised Learning|unsupervised]] learning, and explain the [[Bias-Variance Tradeoff|bias-variance tradeoff]] behind test-error behaviour
> 2. Estimate test error by [[Cross-Validation|cross-validation]] and estimate sampling variability by the [[Bootstrap|bootstrap]]
> 3. Compute [[K-Nearest Neighbors]] (KNN)
> 4. Prune [[Decision Tree]]s by [[Tree Pruning|cost-complexity pruning]]
> 5. Calculate summary statistics for a set of decision trees (e.g., [[Gini Index]], [[Entropy]], [[Residual Sum of Squares]])
> 6. Understand the assumptions underlying different [[Tree Ensemble]] methods — [[Bagging|bagging]], [[Random Forest|random forests]] and [[Boosting|boosting]] — and the improvements they can make to decision trees
> 7. Read [[Out-of-Bag Error|out-of-bag error]] and [[Variable Importance|variable importance]] from a fitted ensemble
> 8. Compute elements of [[Principal Components Analysis]] (PCA) (e.g., [[Loading Vector|loading vectors]], [[Proportion of Variance Explained|variance explained]])
> 9. Interpret [[Principal Components Analysis]] (PCA) software outputs, including the [[Scree Plot|scree plot]]
> 10. Perform the computations behind [[Clustering]] procedures (e.g., [[K-Means Clustering]], [[Hierarchical Clustering|hierarchical clustering]])
> 11. Interpret clustering procedure outputs, including the [[Dendrogram|dendrogram]] and the choice of [[Linkage|linkage]]
> 12. Interpret [[Neural Network]] results, including the role of the [[Activation Function|activation function]], hidden layers, and [[Backpropagation|backpropagation]]
> 13. Apply [[Regularization|regularization]] to control model complexity in a linear or extended linear model
> 14. Calculate measures of model predictive accuracy (e.g., [[Lift]], [[Gini Index]], [[AUROC]], the [[Confusion Matrix|confusion matrix]])
> 15. Compare models via predictive performance measures (e.g., [[Double Lift Chart|double lift chart]], [[Quantile Plot|quantile plot]])
> 
> ### Learning framework
> - [[Statistical Learning]] — the overall framework these methods sit in
> - [[Supervised Learning]] · [[Unsupervised Learning]]
> - [[Bias-Variance Tradeoff]] · [[Cross-Validation]] · [[Bootstrap]] · [[Regularization]]
> - Test error measured by the [[Mean Square Error]]; [[Bootstrap|bootstrap]] variability by the [[Standard Deviation]] of the resampled estimates
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
> Candidates should understand the basic applications of the [[ARIMA]] (Auto Regressive Integrated Moving Average) time series model.
> 
> 1. Model relationships of current and past values of a statistic/metric using [[Autoregressive Model|autoregressive]] and [[Moving Average Model|moving average]] terms
> 2. Test a series for [[Stationarity|stationarity]] and achieve it by [[Differencing|differencing]]; recognize [[White Noise|white noise]] and the [[Random Walk|random walk]] as limiting cases
> 3. Identify a model from the [[Autocorrelation Function]] (ACF) and [[Partial Autocorrelation Function]] (PACF), and check residuals against the same plots
> 4. Understand the framework of [[ARIMA]] models (e.g., trends and [[Seasonality|seasonality]])
> 5. Separate a series into trend, seasonal and irregular parts by [[Time Series Decomposition|decomposition]], and smooth it with [[Exponential Smoothing|exponential smoothing]]
> 6. Calculate trends and seasonality using [[Time Series]] with regression (e.g., [[Deterministic and Stochastic Trend|deterministic vs. stochastic trend]])
> 7. Interpret time series output to make [[Time Series Forecast|forecasts]], with prediction intervals
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
