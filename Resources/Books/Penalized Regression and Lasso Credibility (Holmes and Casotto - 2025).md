---
Title: "Penalized Regression and Lasso Credibility"
Authors: "Thomas Holmes and Mattia Casotto"
Publisher: "Casualty Actuarial Society"
Year: "2025"
date: "2025"
Type: "Monograph"
Code: "CAS Monograph No. 13"
ISBN: "978-1-7370028-6-4"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2025-08/CAS_Monograph_13_2025_revision.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ee866b6cd6a7b0365eadaef878aa1cbb10dd6cf496816108dca677aaf517543c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Penalized Regression and Lasso Credibility (Holmes and Casotto - 2025).md
---
![[Penalized Regression and Lasso Credibility (Holmes and Casotto - 2025) - Cover.svg]]

A CAS monograph on incorporating credibility into GLMs through penalized regression, and on lasso credibility, which applies a complement through the offset. It reviews GLMs, introduces penalized regression and its connections to credibility, explains why lasso is the authors' preferred penalty for actuarial analysis, and shows how the guidance of ASOP 25 applies to penalized regression as a credibility procedure, keeping statistical proofs to the appendices. A case study on simulated commercial auto data, with code on the CAS GitHub, compares lasso credibility, lasso penalization and GLMs on data sets of varying size. This is the 2025 revision of the monograph first published in 2024.

> [!info] On the syllabus
> - [[Exam 8 (CAS)|Exam 8]] — objectives A1, A3–A5; the 2025 revision, including errata

## Introduction
- An unpenalized [[Generalized Linear Model|GLM]] effectively assumes the data are 100% credible whatever their size: a wide standard error warns of an unstable estimate but does not adjust the coefficient, leaving ad hoc, necessarily univariate adjustments after modeling.
- Penalized regression addresses this; with a new use of the offset, lasso penalization becomes [[Lasso Credibility|lasso credibility]], an actuarially sound credibility procedure built from existing tools. It reduces the amount of data predictive modeling needs, and used as a credibility procedure it must align with ASOP 25.
- [[p-Value|P-values]] answer a question of significance; lasso penalized regression answers one of [[Credibility|credibility]] — how much credibility, if any, a coefficient should get — and lasso credibility asks how much credibility to give a coefficient's deviation from the complement.

## 1 A Review of GLMs
- 1.1 Definitions and Terminology
    - A GLM has three elements: a target $Y$ from the [[Exponential Family|exponential family]], a linear predictor $\eta = X\beta$, and a monotonic [[Link Function|link function]] $g$ with $E(Y) = \mu = g^{-1}(\eta)$.
- 1.2 The Linear Predictor
    - Each predictor enters linearly; feature engineering (polynomial terms, one-hot dummy variables for categorical values) lets the prediction be non-linear in the underlying risk characteristic.
- 1.3 Distributions and Link Functions
    - The log link turns the model into multiplicative rating tables. Table 1.1 pairs frequency with Poisson or negative binomial, severity with gamma or inverse Gaussian, and pure premium with the [[Tweedie Distribution|Tweedie]] (all log link), and propensity, retention and conversion models with the Bernoulli and logit link.
- 1.4 The Offset
    - Characteristics best priced outside the GLM — deductibles through a [[Loss Elimination Ratio|loss elimination ratio]] analysis, increased limit factors, territory relativities — enter as an [[Offset Variable|offset]], a fixed term added to the linear predictor.
- 1.5 Table-Based Output: An Example
    - A two-variable Tweedie pure premium model for homeowners (fire extinguisher, age of home) translates into a base rate of 100, a 1.200 factor without an extinguisher and a 1.01 factor per year of home age.
- 1.6 Likelihood Optimization: Full Credibility Assumption
    - The GLM's $\beta$ maximizes the log-likelihood; likelihood alone treats the data as fully credible, so a 20% surcharge comes out whether 1,000,000, 5,000 or 10 exposures lack a fire extinguisher.
    - 1.6.1 P-Values
        - Significance testing is binary, gives no guidance on adjusting a coefficient, rests on an arbitrary 0.05 threshold, is iterative, and leaves nonbinary adjustments to be made after modeling on a univariate basis.
    - 1.6.2 Lack of Credibility in GLM Estimates
        - A GLM coefficient is either included at full credibility or excluded; partial credibility can be given only in a post hoc, variable-by-variable analysis that ignores the multivariate structure.

## 2 A Brief Review of Credibility
- Credibility blends observed experience, subject to volatility, with a more stable [[Complement of Credibility|complement of credibility]] through a factor $Z$ between 0 and 1:

> $$\text{Estimate} = Z \times \text{Observed Experience} + (1 - Z) \times \text{Complement}$$

- Classical and Bühlmann credibility (Table 2.1) differ in their hypotheses and formula for $Z$, but in both $Z$ increases with the number of observations $n$: classical $Z = \min(\sqrt{N/N_{full}},\,1)$ ([[Limited Fluctuation Credibility|limited fluctuation]]) and Bühlmann $Z = n/(n+k)$ with $k = \sigma^2_{PV}/\tau^2_{HM}$ ([[Bühlmann Credibility]]).
- Figure 2.1 plots $Z$ against $n$ for classical credibility with $N_{full} = 10{,}000$ (as the errata corrects the printed 15,000) and Bühlmann credibility with $k = 1{,}600$.
- 2.1 Incorporation of Credibility into GLM Estimates
    - Ad hoc credibility adjustments to GLM output share the drawback Klinker (2011) names: a sequence of steps, each optimal individually, may not be optimal in the aggregate.
    - A multivariate technique that incorporates credibility must not rely on maximizing likelihood alone, must shrink estimates toward the complement by an amount depending on the number of observations, and must do the credibility weighting inside the fitting procedure. Penalized regression satisfies all three when applied in a specific manner.

## 3 Penalized Regression
- Penalized regression adds a penalty on the coefficients to the negative log-likelihood, jointly optimizing goodness of fit and prior assumptions on the shape of the coefficients; the penalty parameter $\lambda \geq 0$ is the dial between them (Equation 3.1):

> $$\hat{\beta} = \arg\min_{\beta}\ \text{NLL}(y, X, \beta) + \lambda\,\text{Penalty}(\beta)$$

- 3.1 Types of Penalized Regression
    - The ridge penalty is $\tfrac{1}{2}\sum_j \beta_j^2$, the lasso penalty $\sum_j |\beta_j|$, and the elastic net a blend of the two through $0 < \alpha < 1$; the link, the error distribution and the table-based output of a GLM are preserved ([[Regularization|regularization]]).
    - 3.1.1 Role of Penalty Parameter λ
        - $\lambda = 0$ gives the unpenalized GLM; a large $\lambda$ shrinks coefficients to zero or to a negligible value. The penalty depends on how the features are parameterized, so they should be standardized before fitting.
    - 3.1.2 Ridge Regression
        - Ridge gives stable estimates when variables are highly correlated; the lower the exposure, the greater the shrinkage, matching Bühlmann credibility, and Appendix A shows that under some hypotheses ridge is a multivariate Bühlmann credibility whose $\lambda$ corresponds one-to-one with Bühlmann's $k$. It never sets a coefficient exactly to zero.
    - 3.1.3 Lasso
        - Lasso (Tibshirani 1996) achieves sparsity: nonsignificant coefficients are set exactly to zero during fitting, so the rating factor becomes 1.0 and variable and factor selection happen with estimation. Under strong collinearity ridge keeps all the correlated variables and lasso tends to keep one; the elastic net combines the two.
- 3.2 Lasso is Recommended for Actuarial Applications
    - A sparse pricing model is more stable over time, simpler to interpret, and automatically sets a statistical materiality standard; once a variable passes that threshold its lasso coefficient can grow quickly, where ridge reacts slowly.
- 3.3 Selecting the Penalty Parameter
    - No analytical formula gives $\lambda$; it is chosen for generalization performance ([[Deviance|deviance]], [[Gini Index|Gini]]) estimated by [[Cross-Validation|cross-validation]] — Figure 3.7 uses four 20% folds and a 20% true [[Holdout Sample|holdout set]].
    - Penalties within a log distance of $\pm 1$ of the optimum perform comparably, so cross-validation gives a range; actuarial judgment often selects a slightly higher penalty, closer to the complement. The final model is validated on the holdout set, since [[Double Lift Chart|double lift charts]] built on the training folds favour an overfit model.
- 3.4 Lasso and Variable Transformations
    - 3.4.1 Categorical Variables
        - Lasso sets some levels to zero, grouping them adaptively with the base level; unlike a GLM's, the predictions change if a different base level is chosen.
    - 3.4.2 Continuous Variables
        - The penalty moves a slope toward zero; polynomial terms are correlated with each other, so using lasso to choose among feature transformations is not recommended.
    - 3.4.3 Ordinal Variables
        - Stepwise indicators let a zero coefficient group two consecutive levels, so lasso detects non-linear effects itself (fused lasso, AGLM, derivative lasso); raising the penalty until reversals disappear helps select an actuarially sound $\lambda$.
    - 3.4.4 Control Variables
        - Control variables such as year and state are usually best penalized with the other variables; a modeler who wants them to absorb all the signal can fit them first and offset them.
- 3.5 Lasso for Variable Selection
    - For [[Variable Selection|variable selection]], start with a $\lambda$ high enough to remove every variable and lower it until variables enter; many highly correlated predictors enter in a staggered, suboptimal way, so prune them actuarially first.

## 4 The Bias–Variance Trade-Off
- 4.1 Introducing the Bias–Variance Trade-Off
    - A model with the right amount of penalization outperforms a standard GLM because of the [[Bias-Variance Tradeoff|bias–variance trade-off]]; [[Mean Square Error|MSE]] $=$ Bias$^2 +$ Variance, high bias being underfit and high variance overfit.
- 4.2 Defining the Bias–Variance Trade-Off
    - Bias is the error between the model's structure and the real model; variance is the error from fitting on this data set rather than richer ones, and it grows as data gets smaller and noisier. Minimizing one increases the other.
- 4.3 Bias–Variance Trade-Off: A GLM Perspective
    - Dropping the thinly supported fire extinguisher variable (Table 4.1) removes its variance but fixes its coefficient at zero, which is bias.
- 4.4 Evaluating the Bias–Variance Trade-Off
    - A GLM weighs the trade-off after fitting with penalized measures such as [[AIC]] and [[BIC]]; lasso applies an optimal bias through shrinkage during fitting, with $\lambda$ chosen by cross-validation.
- 4.5 Bias–Variance Trade-Off and Credibility
    - Credibility reduces the variance of a partially credible estimate by introducing an informed bias toward a selected complement; penalized regression biases toward a null coefficient instead.
- 4.6 Penalized Regression and Credibility
    - Every penalized coefficient can be written as $Z \times \beta_{GLM} + (1 - Z) \times 0$, though $Z$ cannot be calculated directly from $\lambda$; Section A.2 proves Bühlmann credibility and ridge equivalent in a special case.
- 4.7 Conclusion: Benefits of Lasso Penalization
    - Lasso asks whether a coefficient is credibly not zero and how far it can be trusted, uses no arbitrary significance threshold, and removes or adjusts noncredible variables during fitting — the null hypothesis of a significance test becomes the complement of a credibility procedure.

## 5 Lasso Credibility
- [[Lasso Credibility]] replaces the null complement $\beta = 0$ with a more appropriate one. It needs an offset carrying the complement, an ordinal or categorical treatment of every variable, and penalized regression — best the lasso — as the credibility procedure.
- 5.1 The Offset: Applying a Complement in Lasso Credibility
    - Both the offset and the predictor enter for the same characteristic, so each coefficient splits into a fixed component set by the modeler's assumption and a variable component fitted from the data (Equation 5.1). An unpenalized GLM gives the same predictions with or without the offset, since $\beta_{j,\text{offset}} + \beta_j = \beta_{j,\text{glm}}$.

> $$\log(\mu) = \beta_0 + (\beta_{1,\text{offset}} + \beta_1)X_1 + (\beta_{2,\text{offset}} + \beta_2)X_2$$

- 5.2 Ordinal Variables
    - Treating every variable as ordinal or categorical makes every coefficient a magnitude of change, consistent with traditional credibility; steps with no credible difference from the complement are removed, so the steps should be granular.
- 5.3 Lasso Credibility as a Credibility-Weighted GLM
    - At $\lambda = 0$ the coefficient is $\beta_{j,\text{glm}}$; at a high enough $\lambda$ it collapses to $\beta_{j,\text{offset}}$ (Figure 5.1); in between it lies between the two (except, in general, when a coefficient changes sign under high correlation), so there exists a $Z$ with

> $$\beta_{j,\text{offset}} + \beta_j = Z\,\beta_{j,\text{glm}} + (1 - Z)\,\beta_{j,\text{offset}}$$

- 5.4 Terminology and ASOP 25
    - In ASOP 25's terms, the subject experience is the experienced relativities in the modeling data and the relevant experience is the offset relativities, or a 1.0 relativity.
    - Possible complements: a 1.0 relativity (the default), a prior loss model, a countrywide model that includes the modeled data as a small subset, an existing rating plan, competitor or industry relativities. A model using the default for every variable is lasso penalized regression, not lasso credibility.
- 5.5 Selecting and Evaluating a Penalty Parameter in Lasso Credibility
    - Cross-validation selects $\lambda$; judgment may raise it to temper policyholder impacts when the complement is the current factors, to stabilize unstable factors, or when trend, IBNR or generic case reserves understate the data's volatility.
    - It is generally best practice to select only values higher than the point estimate, which is like selecting "between current and indicated"; lowering it is uncommon but supportable when the complement is known to be deficient, has changed significantly, or comes from an out-of-date source.
- 5.6 Calculating Indicated Rates in Lasso Credibility
    - Refitting the homeowners model with the old model's coefficients (0.182 and 0.01) as the offset, fitted coefficients of $-0.087$ and $0.01$ give a no-extinguisher factor of $\exp(0.182 - 0.087) = 1.100$ and an age-10 factor of $\exp(0.02 \times 10) = 1.219$: each indicated factor is the offset factor times the modeled factor.
- 5.7 Lasso Credibility Conclusions
    - Lasso credibility works on data sets too small for a GLM or lasso penalized regression, reflecting credible signal where it exists and shrinking volatile experience toward the complement relativity.

## 6 Lasso Penalized Regression and Lasso Credibility Model Diagnostics
- Lasso models give no p-values; review moves from significance to credibility, and a lasso credibility model's complement must be reviewed too.
- 6.1 Review of the Lambda Penalty Parameter
    - Approximate p-values for lasso are not recommended. The review asks whether $\lambda$ came from cross-validation or another robust method, whether any adjustment favoured a more robust model and why, and whether the variables behave intuitively.
    - Table 6.1: a variable of low importance is automatically set to 0.0, one of medium importance gives more credibility to the complement than to the observed experience, and one of high importance more to the observed.
- 6.2 Review of the Complement of Credibility
    - Beyond ASOP 25's considerations, correlated characteristics that are offset — especially with complements from several sources — can give an overestimated or underestimated prior.
- 6.3 Relativity Plots
    - A relativity plot shows the complement (offset) relativity, the indicated relativity (offset combined with the modeled relativity), optionally the observed relativity, and exposures.
    - 6.3.1 Using Relativity Plots to Guide Model Review
        - The question: are the deviations from the complement stable and intuitive across all variables?
    - 6.3.2 Full Credibility in the Complement
        - The complement gets full credibility when a well-populated segment's experience is too close to it to deviate, or when a segment has too little data to pass the threshold; in the second case the complement must be reviewed on traditional grounds, not by comparing observed with predicted.
    - 6.3.3 Partial Credibility in the Complement
        - Small deviations from the complement are usually an ideal result. Review time belongs on medium and small segments with large deviations: many of them suggest $\lambda$ is too small, a single one an outlier.
    - 6.3.4 Limited or No Credibility in the Complement
        - Large segments see little effect from all but the worst complements; a segment with limited experience receiving full credibility suggests the penalty is too low.
- 6.4 Review by Variable Type
    - 6.4.1 Categorical Variables
        - Keep categories at least as granular as the complement rather than grouping them; an insignificant level collapses to the complement.
    - 6.4.2 Continuous Variables
        - Here the slope is penalized and a transformation describes only the deviation from the complement's curve; the authors highly discourage continuous variables in lasso credibility and warn of extrapolation in the tails.
    - 6.4.3 Ordinal Variables
        - Reversals mean the penalty is likely too low: start from the indicated penalty and raise it until the unintuitive reversals are gone.
    - 6.4.4 Control Variables
        - Offsetting a control variable, such as each state's prior overall rate relativity, is reasonable, and so is leaving it without a complement.
- 6.5 Model Validation Conclusions
    - With an appropriate complement and categorical or granular ordinal variables, the penalty parameter is the only item left to review.

## 7 Case Study
- A pricing model refresh: a countrywide model refitted to states of varying size, on a synthetic commercial auto data set of 3,500,000 records whose pure premiums are simulated from a Tweedie distribution (power 1.6, dispersion 800, about 4% frequency), with code on the CAS GitHub.
- 7.1 Countrywide Modeling and State Refits
    - A small state has too little data for a stable GLM, a medium state potentially enough, and a large state enough to rely on its own experience; lasso credibility blends a state's experience with the countrywide model as complement, with more credibility for larger states.
- 7.2 Case Study Summary
    - 7.2.1 Data Description
        - Base modeling data of 2,500,000 records, a large state of 500,000, a medium state of 300,000 and two small states of 100,000 each — the first with different risk relativities from the base data, the second with the same.
    - 7.2.2 Predictor Variables
        - Driver age, vehicle age, industry code (10 categories), vehicle weight, multipolicy discount and the fictitious x-Treme turn signal, each chosen to show a different scenario.
    - 7.2.3 Methodological Notes
        - Simulated data give known true relativities and uncorrelated characteristics. The GLM uses the generating feature engineering; lasso penalization adds a cross-validated $\lambda$ on standardized coefficients; lasso credibility adds the countrywide complement through the offset.
    - 7.2.4 Prediction and Relativity Plots
        - Models are compared with the true relativities and by double lift charts rather than Gini or Tweedie deviance.
- 7.3 Countrywide Model Results
    - 7.3.1 Large Data Approaches Full Credibility
        - All lasso coefficients are shrunk only very slightly (Table 7.2); both models overpredict health care and fireworks, since neither can tell when experience is unlucky.
    - 7.3.2 Additional Exercises—Full Data
    - 7.3.3 Full Data Conclusion—Lasso Penalization, but Not Lasso Credibility
        - Calling this model lasso credibility would require the default 1.0 relativity to be a sound complement, which it is not for young drivers or the fireworks industry code.
- 7.4 "Large State" Modeling Results
    - 7.4.1 Low Significance Correlates with High Shrinkage
        - Coefficients insignificant in the GLM are heavily shrunk rather than removed, and extra-light vehicles, near the 0.05 threshold, are shrunk automatically.
    - 7.4.2 Shrinkage Varies between Engineered Features
        - Shrinkage follows the exposure distribution: the vehicle-age hinge above 10 is shrunk far more than the one below.
    - 7.4.3 Credibility and Feature Engineering
        - A polynomial term would extrapolate the credibility of newer vehicle ages to older ones; an ordinal treatment applies credibility intuitively.
    - 7.4.4 Penalized Regression Benefits
        - Once insignificant variables are removed from the GLM, lasso penalization outperforms it: some credibility is better than none.
- 7.5 "Large State"—Lasso Credibility Versus GLM
    - 7.5.1 Coefficients of Zero Show Confidence in the Complement of Credibility
        - Farming (.680) and food services (1.205) stay at their complements (Table 7.3): lasso credibility finds no credible difference, where a zero GLM coefficient would mean the characteristic is not predictive.
    - 7.5.2 Partially Credible Categories Avoid Overreactions
        - Construction moves from a complement of 1.460 to 1.436 (true 1.4), where moving to the GLM's 1.379 would overshoot (Table 7.4).
    - 7.5.3 Credible Categories React Quickly
        - The multipolicy discount moves from an inaccurate complement of .772 to .704, close to the GLM's .694 (Table 7.5): large categories approach full credibility in the same model where small ones get little.
    - 7.5.4 Lasso Credibility Moves Toward Experienced Relativities
        - The older-driver hinge moves toward the indication without overreacting, but the 20% shrinkage on the vehicle-age hinge above 10 (as the errata corrects the printed 80%) still assigns some credibility to experience far from the true relativity: particularly noisy data can pull indications away from the truth.
    - 7.5.5 Performance Comparison: Lasso Credibility Versus Lasso Versus GLM
        - Lasso credibility outperforms both on double lift charts, but a poor complement can make it worse than both: health care's complement of 1.399 leaves an indication of 1.288 against a true 1.2 and a GLM 1.165 (Table 7.6).
    - 7.5.6 Large State Conclusion
- 7.6 "Medium State"—Lasso Credibility Versus GLM
    - 7.6.1 Evaluating the Assigned Credibility
        - Fireworks, with 69 exposures, moves from a complement of 2.796 to .167 — a misallocation of credibility. Since one penalty sets a single credibility standard for every variable, the remedy is a larger $\lambda$.
    - 7.6.2 Some Credibility is Better Than None
        - Raising $\lambda$ until results are reasonable for all variables gives a model that outperforms the countrywide complement, where the GLM fails to give significant coefficients for half the industry codes.
    - 7.6.3 Medium State Conclusion
- 7.7 "Small States"—Lasso Credibility Versus GLM
    - 7.7.1 Lasso Credibility is Viable When GLM Fails
        - The GLM gives significant coefficients for only nine of 19 variables; lasso credibility still beats the complement, and does so with a judgmentally higher penalty too.
    - 7.7.2 A Good Complement Creates a Sparse Model
        - On the second small state the cross-validated $\lambda$ penalizes every variable out of the model: the data show no credible difference from a good complement.
    - 7.7.3 Small-State Conclusion
        - Under [[ASOP 56 - Modeling (ASB - 2019)|ASOP 56]]'s "intended purpose", lasso credibility can identify credible deviations from a current rating plan for further investigation, or monitor a model on the latest year of data.
- 7.8 Case Study Conclusion
    - The key is the switch from significance to credibility; in practice an ordinal treatment of variables is necessary to apply credibility stepwise.

## 8 Conclusion—Overall
- Best practice for lasso credibility should come from penalized regression, not directly from classical or Bühlmann credibility; it should be reviewed as a stand-alone credibility technique.
- An ordinal treatment of continuous variables lets the model find credible differences from the complement during fitting. Penalized regression is not just for big data.

## Appendix A Bayesian Interpretation of Credibility
- A.1 Why GLMs Give 100% Credibility to the Data
    - In a one-way class model (normal distribution, identity link) setting the gradient to zero gives $\hat{\beta}_j = \bar{y}_j$, each class's observed average whatever its number of observations; the same holds for any canonical-link GLM.
- A.2 Credibility: A Bayesian Interpretation
    - By Jewell (1974) Bühlmann credibility is a Bayesian estimate under a [[Conjugate Prior|conjugate prior]]; with a normal prior $\beta \sim N(0, \tau^2)$ the maximum a posteriori estimate is ridge regression with $\lambda = \sigma^2/\tau^2$, equal to Bühlmann's $k$:

> $$\hat{\beta}_j = \frac{n_j}{n_j + k}\,\bar{y}_j$$

- A.3 Penalized Regression: A Bayesian Interpretation
    - Every penalty is the negative log of a prior on the coefficients: ridge corresponds to a normal prior and lasso to a Laplace prior with scale $\gamma$, $\lambda = 1/\gamma$.
- A.4 Practical Comparison
    - A.4.1 Comparison with Increasing Exposures (Fixed Observed Average)
        - Lasso has a minimum number of observations ($\lambda/\bar{y}$) below which the experience does not move the estimate off the complement — like a significance level — and above it experience gains weight much faster than under ridge or Bühlmann.
    - A.4.2 Comparison with an Increasing Observed Average (Fixed Exposure)
        - The GLM estimate is $\bar{y}_j$ and the ridge estimate $\frac{n_j}{n_j+\lambda}\bar{y}_j$; the lasso estimate is $\bar{y}_j$ moved toward zero by $\lambda/n_j$, and zero when $|\bar{y}_j| \leq \lambda/n_j$.
    - A.4.3 Final Comparison
        - Lasso shrinks large observed values less than ridge, and sets small ones exactly to zero.
- A.5 Degrees of "Bayesian-ness"
    - In Murphy's hierarchy GLMs are maximum likelihood, penalized regressions are MAP estimates, and [[Generalized Linear Mixed Model|GLMMs]] are empirical Bayes; lasso's sparsity applies to the MAP estimate, not necessarily to the whole posterior.

## Appendix B Alignment of Lasso Credibility with ASOP 25
- B.1 Definitions: Default Complement of Lasso Credibility
    - With no offset, the relevant experience is a segment's overall average relativity, the subject experience its experienced relativity, and the blending method the penalty, so lasso credibility is a credibility procedure under ASOP 25's Section 2.2.
- B.2 Considerations and Scope of ASOP 25
    - Blending subject with other experience puts it within ASOP 25's scope (Section 1.2.c); the default complement is independent of the modeling data; the extra computation of cross-validation is the practicality consideration of Section 3.2.c.
- B.3 Alternate Complements in Lasso Credibility
    - With a countrywide model as the complement, the subject experience is a subset of the relevant experience, so the actuary must consider its influence on the complement (ASOP 25, Section 3.3).
- B.4 Lasso Credibility and ASOP 25 Summary
    - ASOP 25 applies directly; professional judgment in lasso credibility is most often exercised in adjusting $\lambda$.

## Appendix C Miscellaneous
- C.1 Rebasing Model Output
    - Factors can be rebased after modeling through the intercept without changing predictions, but the modeling base level should be the level with the most exposure.
- C.2 Penalized Regression and Near Aliasing
    - Where two indicators nearly coincide, a GLM gives the few non-overlapping risks full credibility and extreme coefficients; lasso heavily penalizes one indicator instead ([[Multicollinearity|multicollinearity]]).
- C.3 Penalized Regression and the AIC
    - The AIC is a penalized fit whose penalty counts nonzero coefficients (best subset selection, numerically intractable); lasso is its best numerically tractable approximation, and can outperform best subset selection in conditions typical of insurance data.

## Appendix D Sparsity: A Convex Optimization Perspective
- At a canonical-link GLM solution the gradient $\sum_i (\mu_i - y_i)x_{ij}$ is zero for every level; lasso leaves slack, matching the data only up to the threshold $\lambda$.
- D.1 Simplified Proof of the Lasso Problem
    - For a single parameter, minimizing $\tfrac{1}{2}(y - \beta)^2 + \lambda|\beta|$ gives the soft-thresholding solution:

> $$\hat{\beta} = \begin{cases} y - \lambda & \text{if } y > \lambda \\ y + \lambda & \text{if } y < -\lambda \\ 0 & \text{otherwise} \end{cases}$$

- D.2 General Proof of the Lasso Problem
    - Generalizing the gradient to the subgradient gives the optimality conditions for any negative log-likelihood, as the errata corrects them: $|\nabla \text{NLL}_j| < \lambda$ if and only if $\hat{\beta}_j = 0$; $\nabla \text{NLL}_j = -\lambda$ if and only if $\hat{\beta}_j > 0$; $\nabla \text{NLL}_j = \lambda$ if and only if $\hat{\beta}_j < 0$.

## References

## Related readings
- [[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)]] — Chapter 1 refers the reader to it (Goldburd et al. 2016) for a comprehensive introduction to GLMs
- [[ASOP 25 - Credibility Procedures (ASB - 2013)]] — Section 5.4 and Appendix B apply its definitions and considerations to lasso credibility
- [[ASOP 56 - Modeling (ASB - 2019)]] — Section 7.7.3 draws on its "intended purpose" of an analysis

## Sources
- [Penalized Regression and Lasso Credibility, 2025 revision (Casualty Actuarial Society, 2025)](https://www.casact.org/sites/default/files/2025-08/CAS_Monograph_13_2025_revision.pdf) — the document: title and copyright pages (authors, ISBN), the table of contents for the section numbering and titles, the Introduction, Chapters 1–8 and Appendices A–D
- [CAS Exam 8 Content Outline, Fall 2026 (v03, June 2026)](https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf) — the citation (CAS Monograph #13, 2025 revision, including errata) and objectives A1, A3–A5
- [Errata — Penalized Regression and Lasso Credibility (2025 Revision), approved December 5, 2025](https://www.casact.org/sites/default/files/2025-12/Monograph_13_Errata_sheet.pdf) — three corrections: Figure 2.1's caption ($N_{full} = 10{,}000$), the 20% shrinkage in Section 7.5.4, and the optimality conditions in Section D.2
- [Penalized Regression and Lasso Credibility (Casualty Actuarial Society, 2024)](https://www.casact.org/sites/default/files/2024-10/CAS_Monograph_No_13.pdf) — the original printing: its copyright page (2024), the basis of the lead's statement that the 2025 text is a revision of a 2024 monograph
