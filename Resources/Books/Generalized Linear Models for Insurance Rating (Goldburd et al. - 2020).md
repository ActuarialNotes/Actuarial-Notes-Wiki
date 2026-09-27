---
Title: "Generalized Linear Models for Insurance Rating"
Authors: "Mark Goldburd, Anand Khare, Dan Tevet and Dmitriy Guller"
Publisher: "Casualty Actuarial Society"
Year: "2020"
date: "2020"
Edition: "2nd"
Type: "Monograph"
Code: "CAS Monograph No. 5"
ISBN: "978-1-7333294-3-9"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:684aca5c32d94303052e8a4b8da17390cf4369f9775c9d8a2a706d9e47e3aaf4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020).md
---
![[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020) - Cover.svg]]

A comprehensive guide to creating an insurance rating plan using generalized linear models (GLMs), with an emphasis on application over theory. Written for actuaries practising in property/casualty insurance, it presents the technical foundations through insurance examples, then covers the model-building process, data preparation, selection of model form, model refinement and model validation, and briefly discusses extensions to the GLM. It is number 5 in the CAS Monograph Series; the copy CAS now hosts is the second edition's 2025 revision, whose contents and Chapter 7 match the 2020 printing page for page.

> [!info] On the syllabus
> - [[Exam MAS-II (CAS)|Exam MAS-II]] — objectives C10–C11; Chapter 7.
> - [[Exam PCPA (CAS)|Exam PCPA]] — objectives B1–B2; Chapter 7.
> - [[Exam 8 (CAS)|Exam 8]] — objectives A1, A3–A5 and A9; the 2nd edition, 2025, including errata

## 1 Introduction
- The authors know of no single text for the practising actuary that serves as a definitive reference for the use of GLMs in [[Classification Ratemaking|classification ratemaking]]; the monograph aims to give the reader the tools to build a market-ready classification plan from raw premium and loss data.
- It assumes familiarity with the earlier CAS exams, including the Actuarial Standards of Practice and Werner and Modlin's *Basic Ratemaking* (2010).

## 2 Overview of Technical Foundations
- 2.1 The Components of the GLM
    - The outcome is driven by a systematic component, the part related to the predictors, and a random component; modeling aims to move as much of the variability as possible into the systematic component.
    - 2.1.1 The Random Component: The [[Exponential Family]]
        - The target $y_i$ follows an exponential family distribution with two parameters: its mean $\mu_i$, which is record-specific and is the model's prediction, and the dispersion parameter $\phi$, the same for all records.
    - 2.1.2 The Systematic Component
        - A [[Link Function|link function]] of the mean equals the linear predictor, $g(\mu_i) = \beta_0 + \beta_1 x_{i1} + \dots + \beta_p x_{ip}$; the log link turns the additive terms into multiplicative rating factors, the most common rating structure.
    - 2.1.3 An Example
- 2.2 Exponential Family Variance
    - $\text{Var}[y] = \phi V(\mu)$: the [[Dispersion Parameter|dispersion parameter]] times a variance function that depends on the distribution (Table 1), so the variance can grow with the mean even though $\phi$ is constant.
- 2.3 Variable Significance
    - 2.3.1 Standard Error
    - 2.3.2 [[p-Value|p-value]]
        - A p-value of 0.05 allows a 1-in-20 chance of accepting a variable that has no effect; with many variables tested, that threshold may be too high to keep spurious effects out.
    - 2.3.3 [[Confidence Interval]]
- 2.4 Types of Predictor Variables
    - 2.4.1 Treatment of Continuous Variables
        - In a log link model a continuous predictor is often logged first, so that its coefficient becomes a power transform of the original variable; unlogged, it can only give an exponential growth curve for a positive coefficient.
    - 2.4.2 Treatment of Categorical Variables
        - Each level other than the base level becomes an indicator column of the [[Design Matrix|design matrix]] and gets its own coefficient, measuring its effect relative to the base level ([[Categorical Predictor|categorical predictor]]).
    - 2.4.3 Choose Your Base Level Wisely!
        - The predictions do not depend on the base level, but the significance statistics do: a base level with sparse data widens every other level's error bars, so the base should be a level with populous data.
- 2.5 Weights
    - A weight divides the assumed variance of a record, $\phi V(\mu)/w$, so a row that averages several risks counts for more.
- 2.6 [[Offset Variable|Offsets]]
    - An offset is a predictor whose coefficient is constrained to be 1, on the linear predictor's scale (logged, for a log link). It carries factors set outside the GLM, such as separately filed base loss costs or deductible factors, so the other coefficients are fitted in their presence.
    - For the Poisson, a claim count model with log exposure as an offset gives the same predictions, relativities and standard errors as a frequency model with exposure as a weight.
- 2.7 An Inventory of Distributions
    - 2.7.1 Distributions for Severity
        - Gamma ($V(\mu) = \mu^2$), the most widely used, and inverse Gaussian ($V(\mu) = \mu^3$), with a sharper peak and a wider tail.
    - 2.7.2 Distributions for Frequency
        - Poisson, better used as the overdispersed Poisson, whose $\phi$ may exceed 1; or the [[Negative Binomial Distribution|negative binomial]], a Poisson whose mean is itself gamma-distributed.
    - 2.7.3 A Distribution for Pure Premium: the [[Tweedie Distribution]]
        - With power parameter $p$ between 1 and 2 the Tweedie is a Poisson-distributed sum of gammas, with a point mass at zero; it implicitly assumes frequency and severity move in the same direction.
- 2.8 [[Logistic Regression]]
- 2.9 Correlation Among Predictors, [[Multicollinearity]] and Aliasing
- 2.10 Limitations of GLMs
    - GLMs assign full [[Credibility|credibility]] to the data: a single categorical predictor's estimates are just the one-way averages of the target by level, however thin the level.
    - They assume the random component of the outcome is uncorrelated among records, which renewals of the same policy or storms affecting many insureds can violate; a [[Generalized Linear Mixed Model|GLMM]] is one extension that accounts for such correlation.

## 3 The Model-Building Process
- 3.1 Setting Objectives and Goals
- 3.2 Communicating with Key Stakeholders
- 3.3 Collecting and Processing Data
- 3.4 Conducting [[Exploratory Data Analysis]]
    - Plot each predictor variable against the target variable, and continuous predictor variables against each other to see their correlation (the wording as the errata corrects it).
- 3.5 Specifying Model Form
- 3.6 Evaluating Model Output
- 3.7 Validating the Model
- 3.8 Translating the Model into a Product
- 3.9 Maintaining and Rebuilding the Model

## 4 Data Preparation and Considerations
- 4.1 Combining Policy and Claim Data
- 4.2 Modifying the Data
- 4.3 Splitting the Data
    - A training set is used to build the model and a test ([[Holdout Sample|holdout]]) set to assess it: more degrees of freedom always improve the fit to the training data but, past a point, worsen it on unseen data (overfitting).
    - 4.3.1 Train and Test
        - Typically 60/40 or 70/30, split at random or by time; an out-of-time split matters for perils, like wind, where one event affects many policyholders.
    - 4.3.2 Train, Validation and Test
    - 4.3.3 Use Your Data Wisely!
    - 4.3.4 [[Cross-Validation|Cross Validation]]
        - k-fold cross validation replaces a holdout set only when variable selection is automated, since every model-building step must be repeated within each fold; it is still useful for tuning parameters within the training set.

## 5 Selection of Model Form
- 5.1 Choosing the Target Variable
    - 5.1.1 Frequency/Severity versus Pure Premium
        - Separate [[Frequency-Severity Models|frequency and severity models]] give more insight, are each more stable than pure premium, and avoid the Tweedie's assumption that frequency and severity move in the same direction.
    - 5.1.2 Policies with Multiple Coverages and Perils
    - 5.1.3 Transforming the Target Variable
        - Cap large losses, remove or temper catastrophe losses, and develop, trend or on-level where needed — or include a temporal variable such as year to control for those effects.
- 5.2 Choosing the Distribution
- 5.3 [[Variable Selection]]
    - The p-value is one piece of information, combined with intuition and knowledge of the business; there is no "magic number". Cost, regulation and the quotation system also bear on whether a variable is used.
- 5.4 [[Variable Transformation|Transformation of Variables]]
    - 5.4.1 Detecting Non-Linearity with Partial Residual Plots
    - 5.4.2 Binning Continuous Predictors
    - 5.4.3 Adding Polynomial Terms
    - 5.4.4 Using Piecewise Linear Functions
        - A [[Hinge Function|hinge function]] such as $\max(0, \ln(\text{AoC}) - 2.75)$ lets the slope change at a break point the modeler selects.
    - 5.4.5 Natural Cubic Splines
- 5.5 Grouping Categorical Variables
- 5.6 [[Interaction|Interactions]]
    - 5.6.1 Interacting Two Categorical Variables
    - 5.6.2 Interacting a Categorical Variable with a Continuous Variable
    - 5.6.3 Interacting Two Continuous Variables

## 6 Model Refinement
- 6.1 Some Measures of Model Fit
    - 6.1.1 Log-Likelihood
    - 6.1.2 [[Deviance]]
        - Scaled deviance is twice the gap between the saturated model's log-likelihood and the model's, and unscaled deviance is the scaled deviance times $\phi$; the fitted coefficients minimize deviance, which is the same as maximizing log-likelihood.
    - 6.1.3 Limitations on the Use of Log-Likelihood and Deviance
        - Comparisons are valid only on identical data, and for deviance only with the same assumed distribution.
- 6.2 Comparing Candidate Models
    - 6.2.1 Nested Models and the F-Test
        - The F-statistic divides the drop in unscaled deviance by the number of added parameters times the big model's estimated $\phi$. In the errata's corrected example, adding a 5-level territory to a 972-row model with 4 parameters, 3 of them not counting the dispersion parameter, gives $972 - 7 = 965$ denominator degrees of freedom, and territory is significant at the 95% level.
    - 6.2.2 Penalized Measures of Fit
        - [[AIC]] ($-2 \times$ log-likelihood $+ 2p$) and [[BIC]] ($-2 \times$ log-likelihood $+ p \log n$) compare non-nested models; BIC's penalty is much larger on insurance-sized data, and the authors find AIC more reasonable. A footnote the errata adds notes that some implementations, including R's `glm()`, count an estimated dispersion parameter in $p$ and others do not.
- 6.3 Residual Analysis
    - 6.3.1 Deviance Residuals
        - If the assumed distribution is right, deviance residuals are roughly normal with constant variance; a histogram or q-q plot more skewed than normal points from a gamma to an inverse Gaussian, for example.
    - 6.3.2 Working Residuals
        - Binned working residuals, plotted against the linear predictor, a predictor or the weight, reveal miscalibration, missed non-linearity or a missing weight ([[Residual Plot|residual plots]]).
- 6.4 Assessing Model Stability
    - Stability can be checked by refitting without the most influential records (Cook's distance), by comparing estimates across cross-validation folds, or by [[Bootstrap|bootstrapping]].

## 7 Model Validation and Selection
- The chapter's techniques choose between final candidate models, including proprietary rating plans whose data and form are unavailable: they need only historical observations scored with each model's predictions, and they compare models in a way accessible to the business decision-makers who often choose between them.
- 7.1 Assessing Fit with Plots of Actual vs. Predicted
    - Plot the actual target against the predicted target for each model, on [[Holdout Sample|holdout data]]; large datasets are often grouped into percentiles (100 buckets of equal model weight) and plotted on a log scale.
- 7.2 Measuring Lift
    - [[Lift]] is a model's economic value: its ability to charge each insured an actuarially fair rate and so prevent [[Adverse Selection|adverse selection]]. It is relative, the lift of one model over another, and is always measured on holdout data.
    - 7.2.1 Simple [[Quantile Plot|Quantile Plots]]
        - Sort by predicted loss cost, bucket into quantiles of equal exposure, and plot actual against predicted pure premium; the winner is judged on predictive accuracy, monotonicity, and the vertical distance between the first and last quantiles.
    - 7.2.2 [[Double Lift Chart|Double Lift Charts]]
        - Sort on the ratio of Model A's to Model B's predicted loss cost, so the first and last quantiles hold the risks the two models disagree on most; the winner more closely matches the actual pure premium in each quantile.
    - 7.2.3 Loss Ratio Charts
        - Sort on predicted [[Loss Ratio|loss ratio]] and plot the actual loss ratio of each quantile; they are simple to understand and explain, since loss ratios are the most commonly used measure of profitability.
    - 7.2.4 The [[Gini Index]]
        - Sort by predicted loss cost and plot the cumulative percentage of losses against the cumulative percentage of exposures (the Lorenz curve); the Gini index is twice the area between that curve and the line of equality.
        - It quantifies a rating plan's ability to separate the best and worst risks, not its profitability.
- 7.3 Validation of Logistic Regression Models
    - Quantile plots, Lorenz curves and the Gini index carry over to [[Logistic Regression|logistic regression]] models by sorting on predicted probability.
    - 7.3.1 Receiver Operating Characteristic (ROC) Curves
        - A discrimination threshold turns a predicted probability into a yes/no prediction; the four outcomes on a test set form a [[Confusion Matrix|confusion matrix]], giving the sensitivity (true positive rate) and the specificity.
        - The ROC curve plots the true positive rate against the false positive rate over all thresholds; the area under it, the [[AUROC]], is 0.500 for a model with no predictive power and 1.000 for a perfect one.
        - AUROC $= 0.5 \times$ normalized Gini $+ 0.5$, so the AUROC and the Gini index are not separate validation metrics.

## 8 Model Documentation
- 8.1 The Importance of Documenting Your Model
    - Documentation checks your own work, transfers knowledge to the model's next owner, and meets the demands of internal and external stakeholders; in the United States it should comply with ASOP 41.
- 8.2 Check Yourself
- 8.3 Stakeholder Management
    - Documentation should let the model be reproduced from source data, and disclose all assumptions, data issues, reliance on external models or stakeholders, and the model's performance, structure and shortcomings.
- 8.4 Code as Documentation

## 9 Other Topics
- 9.1 Modeling Coverage Options with GLMs (Why You Probably Shouldn't)
    - A GLM can give a higher deductible a surcharge because of selection effects (riskier insureds choosing or being required to take it), so factors for coverage options — deductibles, ILFs, peril groups — should be estimated with traditional [[Loss Elimination Ratio|loss elimination]] techniques and included in the GLM as an [[Offset Variable|offset]].
- 9.2 Territory Modeling
    - Territories have too many levels for a GLM; model them separately (for example by spatial smoothing) and include the territory loss cost in the classification GLM as an offset, offsetting the territory model for the classification plan in turn and iterating toward convergence ([[Territorial Rating|territorial rating]]).
- 9.3 Ensembling
    - Averaging the predictions of well-built models (geometrically, for log link GLMs) usually beats any one of them, provided their errors are as uncorrelated as possible.

## 10 Variations on the Generalized Linear Model
- 10.1 Generalized Linear Mixed Models (GLMMs)
    - A [[Generalized Linear Mixed Model|GLMM]] treats some coefficients as [[Random Effects|random effects]] drawn from a distribution, so sparse levels of a categorical variable are shrunk toward the mean. The between-level variance and the residual variance play the roles of Bühlmann-Straub's between- and within-variance, making the GLMM a means of introducing classical credibility concepts into a GLM ([[Bühlmann-Straub Credibility]]).
- 10.2 GLMs with Dispersion Modeling (DGLMs)
    - The dispersion parameter varies by record through its own linear predictor, giving less weight to volatile business.
- 10.3 Generalized Additive Models (GAMs)
    - The linear predictor is a sum of smooth functions of the predictors, estimated by the software and read graphically.
- 10.4 MARS Models
    - MARS adds [[Hinge Function|hinge functions]] to a GLM and chooses their cut points automatically; it also selects variables and searches for interactions.
- 10.5 Elastic Net GLMs
    - An elastic net minimizes the deviance plus $\lambda$ times a penalty that blends the lasso's absolute values and the ridge's squared coefficients through $\alpha$; $\lambda$ is usually tuned by cross validation, and some less important predictors get coefficients of zero ([[Regularization|regularization]]).
    - The shrinkage is characteristic of actuarial credibility models and GLMMs, so elastic nets are another way to bring credibility concepts into the GLM framework.

## Bibliography

## Appendix

## Related readings
- [[Predictive Modeling Applications in Actuarial Science Volume 1 (Frees, Derrig and Meyers - 2014)]] — the Bibliography cites four of its chapters (5, 6, 15 and 16) for fuller technical treatment of GLMs and the other models discussed
- [[Generalized Linear Models for Insurance Data (De Jong and Heller - 2008)]] — cited in the Bibliography
- [[Basic Ratemaking (Werner - 2016)]] — Chapter 1 assumes the reader knows its ratemaking material; the monograph cites the 2010 edition

## Sources
- [Generalized Linear Models for Insurance Rating, 2nd ed., 2025 revision (Casualty Actuarial Society, 2025)](https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf) — the document at the address the content outlines link: title page, abstract, contents, Chapters 1–10 and the Bibliography
- [Generalized Linear Models for Insurance Rating, 2nd ed. (Casualty Actuarial Society, 2020)](https://www.casact.org/sites/default/files/database/monographs_papers_05-goldburd-khare-tevet.pdf) — the 2020 printing the outlines cite: the copyright page and ISBNs; its contents and Chapter 7 compared with the 2025 revision and found identical
- [CAS Monograph No. 5 (Casualty Actuarial Society)](https://www.casact.org/monograph/cas-monograph-no-5) — the series number, the 2025 revision's description and its errata sheet link
- [CAS Exam MAS-II Content Outline, v04 (December 2024)](https://www.casact.org/sites/default/files/2023-06/MASII_Content_Outline.pdf) — the citation (2nd edition, 2020) and Chapter 7 for objectives C10–C11
- [CAS PCPA Exam & Project Content Outline, v.8 (September 2026)](https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf) — the citation and Chapter 7 for Domain B
- [CAS Exam 8 Content Outline, Fall 2026 (v03, June 2026)](https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf) — the citation (CAS Monograph #5, 2nd edition, 2025, including errata, with no chapters excluded) and the task list it prints as "A1, A3-A5, -A9", which the exam page reads as objectives A1, A3–A5 and A9
- [Errata — Generalized Linear Models for Insurance Rating, 2nd Edition (2025 revision), approved January 28, 2026](https://www.casact.org/sites/default/files/2026-02/Monograph_No_5_Errata_Sheet.pdf) — the corrected wording of Sections 3.4 and 3.5 (predictor, not response, variables), the F-test example in Section 6.2.1 (4 parameters; 972 − 7 = 965 denominator degrees of freedom, the dispersion parameter not counted), a new footnote on counting the dispersion parameter in AIC and BIC (Section 6.2.2), and the end of Section 10.1's second paragraph with footnote 23 (Klinker 2011a)
