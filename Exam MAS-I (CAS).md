---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3c8fa77d44e00c708e8d577721120eb972d62ffc16df75cfa5c65c7f84be1cde
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Exam MAS-I (CAS).md
---

<div class="exam-nav"
     data-current="MAS-I|Modern Actuarial Statistics I">
</div>

# Exam MAS-I

The **Modern Actuarial Statistics I** exam is a 4-hour computer-based CAS exam covering [[Stochastic Processes]], [[Survival Model|Survival Models]], [[Statistics]], and [[Generalized Linear Model|Generalized Linear Models]] as part of the ACAS credentialing pathway.

## Prerequisite knowledge
- [[Calculus]], including integration, differentiation, and infinite series
- The Exam P toolkit: [[Probability]], [[Random Variable|Random Variables]], [[Expected Value]], [[Variance]], [[Conditional Probability]], and the named [[Probability Distributions|distributions]]

## Learning Objectives

> [!example]- A. Probability Models (Stochastic Processes and Survival Models) {20–30%}
> 
> Candidates should be able to solve problems using [[Stochastic Processes]] and determine the [[Probability|probabilities]] and [[Probability Distributions|distributions]] associated with these [[Stochastic Processes|processes]].
> 
> 1. Model [[Frequency|claim frequencies]] using [[Poisson Process]]es
> 2. Calculate [[Expected Value|expected values]], [[Variance|variances]], and [[Probability|probabilities]] for any [[Poisson Process]]
> 3. Calculate [[Limited Expected Value]]
> 4. Perform [[Survival Model]] and [[Hazard Rate]] calculations
> 5. Perform [[Joint Life]] calculations
> 6. Calculate simple [[Whole Life Insurance]] or [[Life Annuity]] problems
> 
> ### Poisson Processes
> - [[Poisson Process]] — [[Counting Process|counts]], [[Interarrival Time|interarrival times]], [[Poisson Thinning|thinning]], and [[Poisson Superposition|superposition]]
> - [[Nonhomogeneous Poisson Process]] — a [[Intensity Function|rate]] $\lambda(t)$ that changes over time
> - [[Compound Poisson Process]] — a [[Frequency|random number]] of [[Claim|claims]] of [[Severity|random size]]
> - [[Mixed Poisson Process]] — a [[Mixing Distribution|random rate]] across the [[Insurance Portfolio|portfolio]]
> - [[Probability Distributions|Distributions]] that arise: [[Poisson Distribution]], [[Exponential Distribution]], [[Gamma]], [[Negative Binomial Distribution]], [[Uniform Continuous Distribution]]
> - [[Transformations of Random Variables]] — deriving the [[Probability Distributions|distribution]] of a function of a [[Survival Model|lifetime]] or [[Severity|claim size]]
> - [[Combinatorics]] — counting the [[System Reliability|path and cut sets]] of a $k$-out-of-$n$ [[System Reliability|system]]
> 
> ### Markov Chains
> - [[Markov Chain]] — the [[Transition Probability Matrix|transition probability matrix]], $n$-step [[Chapman-Kolmogorov Equations|transitions]], and the [[Stationary Distribution|stationary distribution]]
> - Actuarial uses: [[Bonus-Malus System|bonus-malus systems]], [[Multi-State Model|multi-state disability/mortality models]], [[Credit Rating Migration|credit-rating migration]]
> 
> ### Survival Models and Life Contingencies
> - [[Survival Model]] and the [[Hazard Rate]] ([[Hazard Rate|force of mortality]])
> - [[Life Table]] — the tabular form of a [[Survival Model|survival model]]
> - [[Joint Life]] statuses
> - [[Whole Life Insurance]] and the [[Life Annuity]] — valued as an actuarial [[Present Value]]
> - [[Limited Expected Value]]
> 
> **Readings:** Daniel · Ross · Struppeck

> [!example]- B. Statistics {20–30%}
> 
> Candidates should be able to apply the concepts typically covered in the second semester of a two-semester undergraduate sequence in [[Probability]] and [[Statistics]].
> 
> 1. Estimate the [[Sample Mean|mean]] and [[Sample Variance|variance]] given a [[Random Sample|sample]]
> 2. Estimate a [[Sufficient Statistic]] for a [[Probability Distributions|distribution]]
> 3. Test [[Hypothesis Testing|statistical hypotheses]] ([[Hypothesis Testing]]), including [[Type I Error]] and [[Type II Error]]
> 4. Test [[Sample Mean|means]] and [[Sample Variance|variances]] using [[Critical Value|critical values]] from a [[Sampling Distribution]]
> 5. Model [[Claim|insurance claim]] [[Frequency]] and [[Severity]]
> 6. Model [[Claim|insurance claims]] in aggregate using [[Aggregate Loss Model]]s
> 7. Calculate [[Order Statistics]] of a [[Random Sample|sample]]
> 8. Perform [[Parameter Estimation|point estimation of statistical parameters]] using [[Maximum Likelihood Estimation]] ([[Maximum Likelihood Estimation|MLE]]) applying criteria such as [[Consistency]], [[Unbiasedness]], [[Sufficiency]], [[Efficiency]], [[Minimum Variance]], and [[Mean Square Error]] (e.g., accounting for [[Censoring]] and [[Truncation]] in the [[Incomplete Data|data]])
> 9. Adjust calculations for the effect of [[Incomplete Data|missing data values]], including [[Censoring]] and [[Truncation]]
> 
> ### Summarizing a Sample
> - [[Sample Mean]] and [[Sample Variance]], and the [[Standard Deviation]]
> - [[Covariance]] between two [[Random Variable|variables]]
> - [[Order Statistics]] and [[Percentile|percentiles]]
> - [[Cumulative Distribution Function (CDF)]] — including its use to simulate a [[Inversion Method|draw by inversion]]
> - [[Sampling Distribution]] and the [[Central Limit Theorem]]
> 
> ### Estimation
> - [[Maximum Likelihood Estimation]] and the [[Method of Moments]]
> - [[Sufficient Statistic]] and [[Sufficiency]]
> - [[Fisher Information]] and the [[Cramér-Rao Lower Bound|Cramér–Rao lower bound]]
> - [[Sampling Distribution|Sampling models]] the [[Parameter Estimation|estimators]] are built on, notably the [[Normal Distribution]]
> - Criteria: [[Unbiasedness]], [[Bias]], [[Consistency]], [[Efficiency]], [[Minimum Variance]], [[Mean Square Error]]
> - [[Incomplete Data|Incomplete data]]: [[Censoring]] and [[Truncation]]
> 
> ### Testing
> - [[Hypothesis Testing]], [[Type I Error]], [[Type II Error]], and the [[Power of a Test]]
> - [[p-Value]] and the [[Confidence Interval]]
> - [[Likelihood Ratio Test]]
> 
> ### Loss Models
> - [[Frequency]] and [[Severity]]
> - [[Aggregate Loss Model]]s
> - [[Coverage Modifications|Coverage modifications]], notably the [[Deductible]]
> 
> **Readings:** Hogg, McKean, and Craig · Tse

> [!example]- C. Extended Linear Models {45–55%}
> 
> Candidates should be able to solve problems using [[Extended Linear Model|extended linear models]] and determine when these [[Extended Linear Model|models]] are appropriate to use.
> 
> 10. Select the [[Model Selection|appropriate model]] for an [[Extended Linear Model|extended linear model]], from [[Linear Regression]] through the [[Generalized Linear Model]] and [[Linear Mixed Model]]
> 11. Select the appropriate [[Model Structure|model structure]] for an [[Extended Linear Model|extended linear model]] given the behavior of the [[Tidy Data|data set]] (e.g., appropriate [[Link Function]] and [[Probability Distributions|distribution]] for the [[Response Variable|dependent variable]] for [[Generalized Linear Model]])
> 12. Evaluate [[Model Selection|models]] developed using an [[Extended Linear Model|extended linear model]] approach, including [[Cross-Validation]] and the [[Bias-Variance Tradeoff]]
> 13. Interpret the [[Extended Linear Model|extended linear model]] [[Model Output|output]] from [[Statistical Software|statistical software]], such as [[Parameter Estimate Tables|parameter estimate tables]] and [[ANOVA|ANOVA tables]]
> 14. Distinguish among [[Categorical Predictor|categorical, ordinal, and continuous predictors]] and their [[Interaction|interactions]], and how these relate to their usage in an [[Extended Linear Model|extended linear model]]
> 15. Understand and apply [[Control Variable|control]] and [[Offset Variable|offset variables]] in [[Generalized Linear Model]]s
> 16. Understand and calculate [[AIC]], [[BIC]], [[Deviance]], and [[R-Squared]]
> 17. Analyze [[Model Diagnostics|model diagnostic plots]] (e.g., [[Residual Plot]]s, [[Marginal Model Plot|marginal model]], [[QQ Plot]]s, and [[Added Variable Plot|added variable plots]]) to assess [[Model Fit|quality of fit]]
> 18. Interpret [[Exploratory Data Analysis]] plots for various [[Data Types|data types]] (e.g., [[Box Plot|box plots]], [[Univariate Plot|univariate plots]], [[Histogram|histograms]])
> 
> ### Model Families
> - [[Linear Regression]] — the [[Ordinary Least Squares|ordinary least-squares]] starting point
> - [[Linear Algebra]] — the [[Design Matrix|design matrix]], the [[Hat Matrix|hat matrix]] $H = X(X^TX)^{-1}X^T$, and [[Fitted Values|fitted values]]
> - [[Generalized Linear Model]] and the [[Exponential Family]]
> - [[Logistic Regression]] for a [[Response Variable|binary response]]
> - [[Poisson Regression]] for [[Frequency|claim counts]]
> - [[Tweedie Distribution]] for [[Pure Premium|pure premium]]
> - [[Linear Mixed Model]] for [[Clustered Data|grouped or repeated data]]
> 
> ### Specifying the Model
> - [[Model Structure]], [[Categorical Predictor|predictor types]], and [[Interaction|interactions]]
> - [[Link Function]] and the [[Dispersion Parameter]]
> - [[Offset Variable|Offset]] and [[Control Variable|control variables]]
> - [[Multicollinearity]] among [[Predictor Variable|predictors]]
> 
> ### Evaluating the Model
> - [[Deviance]], [[R-Squared]], and the [[Residual Sum of Squares]]
> - [[AIC]] and [[BIC]]
> - [[ANOVA]] and [[Parameter Estimate Tables]]
> - [[Variable Selection]], [[Cross-Validation]], and the [[Bias-Variance Tradeoff]]
> 
> ### Diagnostic Plots
> - [[Residual Plot]]
> - [[QQ Plot]]
> - [[Marginal Model Plot]]
> - [[Added Variable Plot]]
> 
> ### Exploratory Data Analysis
> - [[Exploratory Data Analysis]]
> - [[Histogram]]
> - [[Box Plot]]
> - [[Univariate Plot]]
> - [[Scatter Plot]] and [[Correlation]]
> 
> **Readings:** Dobson and Barnett · Hogg, McKean, and Craig · James et al. · Larsen

## Source Material
> [!answer]- Source Material {8 Sources}
> 
> - [[Poisson Processes and Mixture Distributions (Daniel - 2008)]]
>      - A1–A5
> -[[An Introduction to Generalized Linear Models (Dobson - 2018)]]
>      - C1–C9
> - [[Introduction to Mathematical Statistics (Hogg et al. - 2018)]]
>      - B1–B8, C1–C9
> - [[An Introduction to Statistical Learning (James et al. - 2021)]]
>      - C1–C9
> - [[Generalized Linear Models (Larsen - 2015)]]
>      - C1–C9
> - [[Introduction to Probability Models (Ross - 2019)]]
>      - A1–A6
> - [[Life Contingencies (Struppeck - 2014)]]
>      - A5–A6
> - [[Nonlife Actuarial Models (Tse - 2009)]]
>      - B1–B4, B7–B9
