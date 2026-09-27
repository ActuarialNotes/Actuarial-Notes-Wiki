---
Title: "From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges"
Authors: "Alan Chalk, David Deacon, Montserrat Guillen and Max Martinelli"
Publisher: "Casualty Actuarial Society"
Year: "2025"
date: "2025"
Type: "Monograph"
Code: "CAS Monograph No. 16"
ISBN: "978-1-7370028-8-8"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a74e71ae3dff80f19b3726c91934e4261e15b9f79653b46f1c2febf2cf48ace9
  sources: []
  open_findings: 0
  open_critical: 0
  log: ".verify/Resources/Books/From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges (Chalk et al.).md"
---
![[From GLMs to Comprehensive Insurance Pricing- Techniques and Challenges (Chalk et al.) - Cover.svg]]

A CAS monograph that uses case studies to work through the practical challenges of building GLMs for insurance rating. It assumes the reader knows the CAS GLM monograph by Goldburd et al. (2025), and expands on and demonstrates solutions that monograph mentions: dealing with high cardinality categorical variables, adding back to a GLM part of a rating plan calculated separately (such as geographical analysis), removing the effect of variables that may not or should not be used, and dealing with highly correlated variables. Penalized regression is used throughout. It is number 16 in the CAS Monograph Series, commissioned by the Exam 8 Working Group.

> [!info] On the syllabus
> - [[Exam 8 (CAS)|Exam 8]] — objectives A7–A8; CAS Monograph #16, 1st edition

## 1 Introduction
- 1.1 Objectives
    - Assumes the reader knows the CAS [[Generalized Linear Model|GLM]] monograph (Goldburd et al. 2025) and the relevant chapters of *An Introduction to Statistical Learning*, and uses case studies to expand on practical challenges: [[High Dimensional Variables|high cardinality categorical variables (HCCVs)]], part of a rating plan calculated outside the main GLM, removing the effect of variables that may not or should not be used, and highly correlated variables.
    - Revisits measuring model performance, splitting data into training and test sets, and nonlinear effects along the way.
    - Calls penalized regression ([[Regularization]]) "impossible to ignore": it makes it easy to avoid overfitting, and today's computing power answers its main disadvantage, computational complexity, so one chapter reviews it and later chapters apply it.
    - Warns that methods which seem automatic mostly help the practitioner make better-informed choices; rating plans created without human input and review remain as dangerous as ever.

## 2 The Case Studies
- 2.1 FAA-NTSB Data for Aircraft Incident Frequency
    - The main case study: one line per FAA-registered aircraft per calendar year, with exposure as the fraction of the year and a claim wherever an NTSB accident matches the aircraft; the aim is a frequency model, and almost everything discussed applies equally to severity models.
    - The data show the problems to be solved: many different makes of aircraft, and an accident frequency that varies with aircraft age but not linearly. A 25% random sample is used.
- 2.2 Road Accident Frequency Model
    - UK police STATS19 road accident records, summarized by region and enriched with census fields; the data preparation produces many highly correlated variables.
- 2.3 Simulated Data—Auto Insurance
    - Simulated auto frequency data with a known "ground truth" (for example, a 5% starting frequency with risk 4.65 times higher for a 17-year-old male and 2.55 times for a 17-year-old female), used to show what values of a performance metric to expect.
- 2.4 The Challenges
    - 2.4.1 High cardinality categorical variables (HCCVs)
        - An unpenalized GLM predicts each category's average experience, so a make with no accidents is predicted a 0% frequency and any non-credible category too high or too low. Categorical variables with enough levels to cause this, given the data size, are HCCVs; some modelling approaches also become computationally heavy.
    - 2.4.2 Combining other models with a GLM
        - Some HCCV techniques, geospatial smoothing, underwriter adjustments and a separate credit score model are done outside the GLM and must be combined back into it. A separate credit score gives transparency about credit's total effect, parsimony, and easier discovery of interactions.
    - 2.4.3 “Controlling” for certain features
        - Isolating the effect of one or more features so that it can be ignored (a disallowed rating feature) or adjusted.
    - 2.4.4 Highly correlated variables
        - Goldburd et al. §2.9: high correlation makes GLM coefficients swing with small changes in the data and inflates their standard errors; they propose keeping one of a correlated group or preprocessing with [[Principal Components Analysis|PCA]]. This monograph adds penalized regression.
- 2.5 Next Steps

## 3 Performance Measurement
- Deviance grows with the number of observations and cannot be compared across datasets or error distributions, and on training data it always falls as features are added. The monograph instead uses a measure independent of the number of observations, [[Pseudo R-Squared|pseudo-R²]], calculated on data not used to fit the model.
- 3.1 Pseudo-R²
    - Defined from Poisson log-likelihoods as the improvement from the null (intercept-only) model to the fitted model, as a share of the improvement from the null model to the saturated model. With [[Deviance|deviance]] $D = 2(l_{saturated} - l_{model})$ it equals $1 - D_{model}/D_{null}$, the percentage of deviance explained.
    - A four-record example scores $0.652/1.386 = 47\%$.

> $$\text{pseudo-}R^2 = \frac{l_{model} - l_{null}}{l_{saturated} - l_{null}}$$

- 3.2 Train—Validate—Test
    - About 30% of the data is held out as a test set that must never influence the model's structure, features or parameters; one look at test results during fitting and it is no longer a test set.
    - Every training decision is taken by k-fold [[Cross-Validation|cross-validation]] on the rest (seven folds), and the metric is the average validation pseudo-R² across the folds. Feature selection and engineering are automated so they can be repeated inside each fold; a final model is then fitted on all training folds and scored once on the test data.
- 3.3 Generalization Error
    - Cross-validation estimates generalization error, the error on future unseen data, but every fold shares the current portfolio's mix. A new rating plan that shifts the mix, particularly one with a weakness savvy policyholders exploit, can perform very differently, so the mix of business must be monitored after implementation.
- 3.4 Null Models
    - The intercept-only null model shows what zero performance looks like and tests the modelling pipeline; accuracy misleads (predicting no accident for every aircraft is 99.6% accurate). Its validation pseudo-R² is slightly negative because the training mean differs from each validation fold's mean.
- 3.5 Baseline Models
    - An unpenalized GLM on the FAA-NTSB data, after excluding categorical features with more than 20 categories and features that were linear combinations of others ([[Multicollinearity|multicollinearity]]), has 22 features and 89 parameters, validation pseudo-R² 0.140 and training 0.156. Some $p$-values are large and one coefficient is $-12.756$.
- 3.6 Benchmark Models
    - An open-source gradient [[Boosting|boosting]] model, which handles nonlinear effects, interactions and HCCVs itself but is hard to interpret, shows what good performance looks like: cross-validation pseudo-R² 0.165. Such models are used again in Chapter 9 to check the GLM ([[Model Benchmarking]]).
- 3.7 Practically Speaking
    - 3.7.1 Typical values for pseudo-R²
        - Perfect predictions on the simulated data score only 0.051, because outcomes are random. Typical values depend on the signal-to-noise ratio, so pseudo-R² is for comparing models of the same target on the same data; in business the existing model's performance is the benchmark to beat.
    - 3.7.2 Weights
        - With unequal exposure, each observation's contribution to the deviance is multiplied by its exposure.
    - 3.7.3 Creating folds
        - Deriving the fold from the policy number (or a hash of it) makes folds reproducible and keeps every record of a policy or customer in one fold; correlated records split across folds are a form of leakage ([[Data Leakage]]), and clustered losses (a parking-lot fire, a catastrophe in one region) need the same care.
    - 3.7.4 Rebasing predictions
        - For a Poisson log-link model the likelihood-maximizing intercept sets the mean prediction equal to the mean target, so rebasing predictions before computing pseudo-R² isolates how well a model segments risks. The rebasing needed measures the overall level separately, mirroring the split between basic and classification ratemaking.
- 3.8 Next Steps

## 4 Penalized Regression
- 4.1 Introduction
    - Adding a predictor almost always raises the training likelihood. AIC ($-2 l_{model} + 2p$) penalizes a diagnostic of a fitted model, whereas penalized regression changes the fit itself, and with cross-validation manages the [[Bias-Variance Tradeoff|bias-variance tradeoff]].
    - A rare car make insured by ten companies, one car each and one claim among them: each company's GLM predicts 100% or 0% (low bias, variance 0.09). Chosen by AIC, the make's own parameter drops out and all ten predict the 5% all-makes average: biased, but every prediction is closer to the true 10%.
- 4.2 Types of Penalty
    - 4.2.1 Ridge regression
        - Subtracts $\lambda \sum \beta_j^2$ from the log-likelihood (the intercept is not penalized); $\lambda = 0$ gives the ordinary GLM and a very large $\lambda$ the null model. Coefficients shrink toward zero but not to it, and ridge fits stable models where features are highly correlated.
    - 4.2.2 LASSO
        - Subtracts $\lambda \sum |\beta_j|$; once $\lambda$ is large enough a coefficient becomes exactly zero, so the LASSO performs implicit feature selection ([[Variable Selection]]). With highly correlated features its selections can be unstable.
    - 4.2.3 Elastic net
        - Mixes the two penalties with $\alpha \in [0, 1]$ ($\alpha = 1$ is the LASSO, $\alpha = 0$ ridge); practitioners often use $\alpha = 0.99$ instead of the LASSO for stability.

> $$l_p(\beta) = l(\beta) - \lambda\left((1-\alpha)\tfrac{1}{2}\sum_{j=1}^{p}\beta_j^2 + \alpha\sum_{j=1}^{p}|\beta_j|\right)$$

- 4.3 Choosing λ Using k-Fold Cross-Validation
    - Each fold's model is fitted along a sequence of about 100 values of $\lambda$ and scored on the held-out fold, and the curves are averaged across folds; for a model with aircraft age alone, the best average performance is at no penalization.
- 4.4 Case Study—Penalized Regression
    - On the FAA-NTSB features excluding HCCVs, elastic net with $\alpha = 0.99$ reaches cross-validation pseudo-R² 0.146 against the baseline's 0.140 with 57 nonzero parameters instead of 89; registrant types with high $p$-values are penalized out and the rest shrink.
- 4.5 The Relaxed LASSO
    - The LASSO soft-thresholds: kept coefficients are also shrunk, which may add bias without reducing variance. The relaxed LASSO separates feature selection from shrinkage and allows hard-thresholding, refitting the selected features without penalty.
- 4.6 Practically Speaking
    - 4.6.1 Software
    - 4.6.2 How many models?
        - 100 values of $\lambda$ over 10 folds plus the full path makes 1,100 models; warm starts and parallel folds make this practical (about 40 minutes on 2 million rows).
    - 4.6.3 Penalization parameter names—λ and γ
    - 4.6.4 Performance graphs—x-axis
        - Plotted against $\log\lambda$, complex (lightly penalized) models sit on the left and simple ones on the right.
    - 4.6.5 Choosing λ
        - Breiman et al.'s rule takes the simplest model within one standard error of the best cross-validation performance; comparing training and validation curves shows where models start fitting noise, and a model between the "max" and "1 s.e." models is one option.
    - 4.6.6 Flavors of penalized regression
        - No penalty is guaranteed to contain the best model; the adaptive LASSO varies the penalty by feature (using ridge coefficients), and the grouped LASSO selects between categorical features that measure the same thing.
- 4.7 Technical Note
    - 4.7.1 Solving Ridge regression
        - With one feature, normal errors and identity link, $\hat{\beta} = \frac{1}{n}\sum x_i y_i \big/ \left(\frac{1}{n}\sum x_i^2 + \lambda\right)$; $\lambda$ plays a role like $k$ in Bühlmann's $Z = n/(n+k)$ ([[Bühlmann Credibility]]).
    - 4.7.2 Standardization
        - The penalty's effect depends on a feature's units, so numeric features are standardized (mean 0, variance 1) before fitting; 0/1 category columns often are not.
    - 4.7.3 Solving the LASSO
        - For one standardized feature with unpenalized estimate $\hat{\beta} > 0$, the LASSO estimate is $\hat{\beta} - \lambda$ until $\lambda \geq \hat{\beta}$, and zero after.
- 4.8 Next Steps
    - The penalized model's aircraft age effect is a smooth exponential decline that keeps falling after age 30 where actual frequency is flat.

## 5 Nonlinear Effects
- 5.1 Feature Engineering
    - A GLM cannot create features (a distance to an extreme-weather area, a credit score from 50 inputs); Goldburd et al. offer binning, polynomial terms and piecewise linear functions, and this chapter builds many piecewise linear features and lets the LASSO or elastic net choose.
- 5.2 Step Functions
    - A step function is 1 at or above a threshold and 0 below; with one step per aircraft age, the penalized GLM picks 17 steps (the simplest model within 2% of the best), though the shrinkage leaves predictions above age 20 too high.
- 5.3 Hinge Functions
    - A [[Hinge Function|hinge function]] $\max(0, x - c)$ picks up a change in slope at the knot $c$. Aircraft age with knots at 4 and 28 closely fits the shape; with 50 candidate hinges the chosen model keeps age and seven hinges.
- 5.4 Step Versus Hinge
    - Steps are flat at the edges of the data, while hinges keep sloping; hinges give a smooth "customer journey" across renewals; steps suit expected discontinuities and ordinal categorical features. Steps are the building blocks of tree models and hinges generalize ReLU functions.
- 5.5 Multivariate Adaptive Regression Splines (MARS)
    - MARS (Friedman 1991) adds the best hinge (linear spline) stepwise like a decision tree; with pruning turned off, the LASSO selects among its hinges. Because MARS looks at the target, the hinges must be created separately for each fold.
- 5.6 Case Study—Piecewise Linear Functions
    - Starting from 25 equally spaced steps, 25 equally spaced hinges, or MARS hinges for each numeric feature gives cross-validation pseudo-R² of 0.150, 0.149 and 0.150 with 67, 77 and 63 nonzero features. Hinge predictions keep falling at high aircraft ages; a practitioner could hold hinge values constant at the extremes (say, beyond the 99th percentile).
- 5.7 Practically Speaking
    - 5.7.1 Random features
        - A shuffled row number added as a feature shows when MARS has started generating hinges from noise; shadow variables work similarly.
    - 5.7.2 Ordinal categorical variables
        - An ordinal feature (pilot quality in five levels) is entered as cumulative step functions; non-negative coefficient constraints force a monotone effect but can hide a real reversal, like garaged cars that have higher claim frequency because the feature is self-declared.
    - 5.7.3 Surrogate GLMs
        - A [[Surrogate Model|surrogate GLM]] is trained to approximate a black-box model's predictions: fit a good machine learning model, extract the shape of its nonlinear effects, and use it to fit a GLM.
- 5.8 Technical Note
    - 5.8.1 Step functions and the fused LASSO
        - The fused LASSO penalizes differences between neighbouring coefficients; step functions under the LASSO penalty are equivalent to the fused LASSO with $\lambda_1 = 0$.
- 5.9 Next Steps

## 6 High Cardinality Categorical Variables (HCCVs)
- 6.1 Introduction
    - One-hot encoding the FAA-NTSB categoricals takes 84 columns for 99 levels; the data also hold 97 countries, 16,304 cities and over 40,000 aircraft makes. The central idea is to encode each HCCV level with one or a few values instead of a column per level ([[High Dimensional Variables]]).
- 6.2 Target Encoding
    - Ridge regression on an HCCV's one-hot columns suggests the coefficient $(\bar{y}_k - \bar{y})/(\lambda/n_k + 1)$ for level $k$, a credibility-weighted blend of the level mean and the overall mean with $\lambda$ chosen by cross-validation rather than assumed. Replacing the HCCV by that value is [[Target Encoding|target (mean) encoding]].
    - In a multiplicative model the encoded value shrinks the level's actual-versus-expected (AvE) ratio toward 1, or its log toward 0; with a log link its relativity is $x_{te}^{\beta_{te}}$.

> $$x'_k = \left(\frac{\lambda/n_k}{\lambda/n_k + 1}\right) \times 1 + \left(\frac{1}{\lambda/n_k + 1}\right) \times \frac{\bar{y}_k}{\bar{y}}$$

- 6.3 Leakage
    - Letting the GLM see the target, or part of it, during training is [[Data Leakage|leakage]]; target encoding introduces it, since thin levels' means are nearly their own targets. The fix is to encode each validation fold using only the other folds, then build one final encoding on all training data for testing.
- 6.4 Some Other Encoding Approaches
    - 6.4.1 Grouping rare categories
        - Combining rare levels into "Other", ideally using domain knowledge of which levels belong together; small workers compensation classes are grouped for ratemaking this way ([[Workers Compensation Classification]]).
    - 6.4.2 Frequency encoding
        - Replaces each level with its share of the training data; it does not relate the level to the target but may itself be predictive.
    - 6.4.3 Hierarchical grouping
        - Uses a higher level of a hierarchy (ZIP prefix, SIC major group) as the target encoding's [[Complement of Credibility|complement of credibility]]; the hierarchy must be meaningful for the target, since motorcycle manufacturer is a poor complement for model when one maker builds both sport bikes and scooters ([[Vehicle Make and Model|make and model]]).
    - 6.4.4 Feature creation and word embeddings
        - Replaces the HCCV with expert answers to key risk questions (for fire risk by SIC code), or with language-model word embeddings reduced by PCA; both are unsupervised.
- 6.5 Generalized Linear Mixed Models
    - Records sharing an identifier (a high-net-worth owner's cars, a company's fleet) break the GLM's independence assumption; treating the company as a mean-zero normal [[Random Effects|random effect]] alongside [[Fixed Effects|fixed effects]] gives a [[Generalized Linear Mixed Model|GLMM]], whose HCCV estimates are pulled toward the mean in proportion to the data, like target encoding but by different statistical reasoning.
- 6.6 Case Study—HCCVs
    - Within-group variance $0.004584 \times (1 - 0.004584)$ over a between-group variance of $7.038 \times 10^{-6}$ suggests $\lambda \approx 648$; cross-validation prefers 1,024 or 2,048, with $\lambda = 2{,}048$ chosen, lifting pseudo-R² from 0.150 to 0.151. GLMMs could not be fitted consistently (the software gave errors) and none beat target encoding, which also stays inside the cross-validation framework.
- 6.7 Practically Speaking
    - 6.7.1 Sense-checking the results and ad-hoc adjustments
        - Extreme encodings (a make with one claim on 12 aircraft-years encoded at 3.58; DJI drones with no claims on 11,900 aircraft-years) need investigation and discussion, and the credibility was adjusted ad hoc where expected and actual claims are both tiny.
    - 6.7.2 Target encoding using GLM predictions
        - Using the average GLM prediction for the level as the expected value in the AvE ratio lets simpler features explain what they can first (helicopters already rated higher), so the encoding picks up only what remains.
    - 6.7.3 Novel categories in the future
        - Rating an unseen make at the average invites adverse selection; better to refer the quote and set a deliberate value.
    - 6.7.4 What does zero mean?
        - A neutral encoding can mean lots of exposure at average experience, or too little exposure to trust.
    - 6.7.5 Keeping up with other ideas
    - 6.7.6 Read the documentation
        - One software's "inflection point / smoothing" encoder uses the credibility $z = 1/(1 + \exp((\text{inflection} - n_k)/\text{smoothing}))$, which gives credibility even at zero volume and did not validate well.
    - 6.7.7 Are HCCVs really predictive?
        - The monograph always includes HCCVs and lets cross-validation decide; they may carry residual information or proxy other risk sources.
    - 6.7.8 Sense-checking the data
        - Of 43,617 aircraft "makes", most are individual amateur builders; type-certificated makes number 994, and variants such as a dozen AIRBUS names need review with someone who knows the data.
- 6.8 Technical Note
    - 6.8.1 HCCV estimates using Ridge regression
        - Derives $\hat{\beta}_k = \bar{y}_k/(1 + \lambda/n_k)$ for one HCCV with no intercept, then applies it to responses with the mean deducted.
    - 6.8.2 Link to the Bayesian approach
        - With prior $\beta_k \sim N(0, \tau^2)$ and $y_{ik} \sim N(\beta_k, \sigma^2)$, the posterior mode is $\bar{y}_k/(1 + \sigma^2/(n_k\tau^2))$, the same shrinkage with $\lambda = \sigma^2/\tau^2$ ([[Bayesian Credibility]]).
- 6.9 Next Steps
    - At 0.151 the GLM still falls 9% short of the gradient boosting benchmark's 0.165; the target-encoded HCCV was fitted in a second-stage GLM so the other coefficients stay unchanged.

## 7 Highly Correlated Variables
- Frames the issue within supervised learning's stages (model type, model, feature engineering, feature selection), following Kuhn and Johnson's *Feature Engineering and Selection*.
- 7.1 How Do Highly Correlated Variables Arise?
    - 7.1.1 Naturally
        - Young drivers' age and driving experience are nearly perfectly correlated; a pilot's hours on type need not be correlated with age.
    - 7.1.2 As a result of data enrichment
        - A credit score and its components, the same court-judgment count over several windows, distances to schools, police stations and fire hydrants.
    - 7.1.3 As a result of feature engineering
        - One-to-many (steps and hinges) and many-to-many engineering; for an airline fleet, several measures of the spread of aircraft ages and values.
- 7.2 Why Do They Matter?
    - 7.2.1 Computational issues
        - Correlated features flatten the loss surface: an unpenalized GLM may fail or return offsetting coefficients (one $-50$, the other $+50$) with wide confidence intervals. Greedily fitted trees avoid offsetting coefficients.
    - 7.2.2 Performance
        - A model relying on a correlation fails if the correlation changes. A reversal, such as a deductible correlated with vehicle value leaving lower deductibles cheaper, invites [[Adverse Selection|adverse selection]].
    - 7.2.3 Interpretability and communication
        - Ten correlated measures of experience each carry a small coefficient, hiding the total effect and diluting interaction detection in trees.
    - 7.2.4 Cost
        - Every feature must be collected, stored, audited and monitored; Kuhn and Johnson's aim is "to reduce the number of features as far as possible without compromising predictive performance."
- 7.3 Introducing a Case Study
    - Road accidents in about 34,000 English LSOAs, quarterly 2018–2022 (affected by COVID-19), with deprivation indices and census features: 70 features, 20 of 2,415 pairs correlated at 0.90 or more. Frequency is accidents per 1,000 census population.
- 7.4 Dealing with Highly Correlated Variables
    - 7.4.1 Common sense
        - Counts duplicated by percentages and ranks by percentile groups (intrinsic aliasing) are removed; census categories summing to 100% are [[Multicollinearity|multicollinearity]], with no obvious column to drop.
    - 7.4.2 Removing some features before model training
        - caret's filter repeatedly drops, from the most correlated pair, the feature with the highest mean absolute correlation; a 0.90 cutoff removes three deprivation indices (including IMD) and nine census features, and the cutoff can be chosen by cross-validation.
    - 7.4.3 Ridge regression
        - Fits all 66 features without difficulty, cross-validation pseudo-R² 0.26, but correlated features take opposite signs (IMD and employment rank), which hurts interpretability.
    - 7.4.4 LASSO
        - Tends to select one feature from a correlated group; the 1 s.e. model has 31 features and pseudo-R² 0.274, better than ridge. Coefficient paths show the reversals of lightly penalized models disappearing as penalization increases.
    - 7.4.5 Principal component analysis
        - [[Principal Components Analysis|PCA]] replaces features with uncorrelated linear combinations. The first component reads as deprivation, but 17 components (99% of the variance) score only 0.13 because PCA ignores the target. Component 54 carries the largest LASSO coefficient, and a PCA model needs every original feature. ICA, autoencoders and supervised PLS-GLM are alternatives; clustering is not useful here.
- 7.5 Practically Speaking
    - 7.5.1 Fold variable in time series data
        - All quarters of an LSOA, like all records of one auto policy, go in one fold.
    - 7.5.2 Hinges and splines with correlated features
        - Splines were left out for exposition; with them, selection may take one feature's main effect and another's spline.
    - 7.5.3 LASSO in the presence of highly correlated features
        - The LASSO often failed to converge or ran long; elastic net with $\alpha = 0.95$ and removing the most correlated features first helped.
    - 7.5.4 High coefficients in later principal components
        - Component 54 reverse-engineered the living-environment index, partly built from accident rates, from IMD minus the other indices: leakage. Large coefficients on late components warrant investigating the data preparation.

## 8 Modeling in Two Stages
- A [[Two-Stage Model|two-stage model]] fits a GLM or fixes a starting point, carries out an adjustment or another model as a second stage, and recombines them. Reasons include limiting what changes in a filing, fixed relativities (a deductible discount scale), enrichment features such as credit score that can fail at quote time, and geography a GLM cannot smooth. The techniques are offsets, residuals, and combining multiplicative models.
- 8.1 Fixing Coefficients With an Offset
    - When marketing's NCB discounts (0.20 at NCB 4) replace the GLM's (0.826), the age E / NCB 4 risk premium falls to \$78 against a true \$320. Refitting age with $\log(0.20)$ as an [[Offset Variable|offset]] raises age E's relativity to 1.057 (intercept 0.112), giving \$237, because age is correlated with NCB. The age curve then shows a reversal.
    - A deductible relativity offset in both frequency and severity models can be split equally, the square root in each.
- 8.2 The Hypothesis Space of GLMs
    - A GLM fits only functions in its hypothesis space; feature engineering (a reciprocal, a distance between home and garaging) widens it, while neural networks can approximate any continuous function but are hard to explain. Geographic rating is the widespread case: near ZIP codes have similar experience (Tobler's first law), and geospatial smoothing is hard in a GLM ([[Territorial Rating|geographic rating]]).
- 8.3 Two-Stage Models Using Offsets
    - The FAA-NTSB first-stage predictions are summarized by owner ZIP code, and a second-stage generalized additive model smooths geography, with claim frequency as target, exposure as weight and the log of the first-stage predicted frequency as offset. It finds higher risk from Oregon through Idaho into western Montana and lower in Florida.
- 8.4 Two-Stage Models Using Residuals
    - Where no offset is available, the target is actual ÷ predicted claims and the weight is exposure × predicted frequency; for a Poisson log-link model this is mathematically identical to the offset (Yan et al. 2009; Shi 2010). Residuals are ratios because the result becomes a multiplicative rating table.
- 8.5 Two-Stage Models Using Preadjustment
    - Shi (2010) gives the preadjusted response and weight per model: Poisson frequency $\sum c_i / \sum e_i u_i$ with weight $\sum e_i u_i$; Gamma severity $\sum l_i / \sum c_i u_i$ with weight $\sum c_i$; Tweedie($p$) loss cost $\sum l_i / \sum e_i u_i$ with weight $\sum e_i u_i^{2-p}$.
- 8.6 Recombining the Two Models
    - The first-stage prediction is multiplied by the ZIP code relativity; nothing more is needed.
- 8.7 Combining Parts of Multiplicative Models
    - Seven make- and model-related tables multiply into one relativity per aircraft (1.37 for a Cessna 172M, above 3 for various helicopters), which is easier to communicate and for underwriters to challenge.
- 8.8 Further Examples
    - 8.8.1 Credit scores
        - A GLM without credit, a credit model fitted to its residuals, and the score appended as a feature ([[Credit-Based Insurance Scoring]]); the second model need not be a GLM but must run at quote time.
    - 8.8.2 Usage-based insurance
        - A constant cost per mile is enforced with the log of mileage as an offset.
    - 8.8.3 Use of proxy variables
        - If a variable is banned, omitting it lets correlated features proxy for it; fitting with it and ignoring its coefficient avoids that. If its relativities are fixed by the regulator, including it and replacing its coefficient avoids the offset's spillover. Either way the intercept may need re-estimating (an off-balance adjustment).
- 8.9 Practically Speaking
    - 8.9.1 Leakage in two-stage models
        - A first stage that has seen each record's target (at worst, a saturated model) leaves the second stage residuals of 1; it must be fed cross-validation predictions ([[Data Leakage]]).
    - 8.9.2 Rating groups
        - A 30,000-row ZIP table is split into a ZIP-to-area-group mapping and a group-to-relativity table (100 groups spaced by a factor of 1.0162 from 0.379 to 1.851), so rate changes communicate only the group relativities.

## 9 Learning From Black-Box Models
- The benchmark gradient boosting machine (1,000 trees) outperforms the GLM but cannot be explained; model-agnostic methods from Molnar's *Interpretable Machine Learning* compare the two on variable selection and importance, nonlinear effects and interactions ([[Surrogate Model|learning from black-box models]]).
- 9.1 Model Variance Revisited
    - The GBM is in effect a phenomenally complicated GLM of step functions and interactions, and its gap between training and cross-validation performance is wide; patterns imported from it need their variance monitored.
- 9.2 Variable Selection and Importance
    - Permutation-based [[Variable Importance|feature importance]] permutes one feature on held-out data and measures the loss of performance, rescaled so the most important is 100. It is model-agnostic, but can create impossible observations with correlated features, and counts a feature's interactions too.
    - GLM and GBM rankings largely agree, but the number of aircraft registered to the owner is third in the GBM and 11th–12th in the GLM.
- 9.3 Nonlinear Effects
    - Partial dependence sets a feature to one value for every record and compares total predictions. At 10 registered aircraft against 1, the GLM gives 1.107 and the GBM 1.104, but the plots differ at 11–15, where the GLM had no step function. Partial dependence is global: the GBM's per-record ratios range widely.
- 9.4 Interactions
    - A positive $pl_A + pl_B - pl_{AB}$ (separate permutation losses less the joint loss) flags a possible [[Interaction|interaction]]; region × aircraft age ranks first.
    - A decision tree fitted to the ratio of GBM to GLM predictions supplies leaf IDs, used as a feature in a penalized GLM with the GLM predictions as offset; pseudo-R² rises to 0.156, still 6% short of 0.165.
- 9.5 Practically Speaking
    - 9.5.1 Feature importance—train or test data
        - Importances were computed on each cross-validation model's held-out fold and averaged, not on the test data.
- 9.6 Technical Note
    - 9.6.1 Reasons that certain model types include all features
        - Overfitted trees in a [[Random Forest|random forest]], a GBM's many small steps and a [[Neural Network|neural network]]'s small weights all leave unimportant features in the model.

## 10 Challenges and Considerations in Ratemaking Models
- 10.1 Understanding the Data
    - "Aircraft age" was taken from registration certificate dates, which are also issued on changes of ownership or use, an error discussion with the data's owners would have avoided; drones and non-US addresses were also mishandled.
- 10.2 Technical Errors
    - Inconsistent coding of categories between training, test and operational data; categorical features coded as numbers and treated as ordinal; irrelevant segments such as drones left in. Peer review reduces such errors.
- 10.3 Data Does Not Meet Model Assumptions
    - Insurance data are not independent (repeat claimants, adjoining townhouses), so cross-validation folds must keep a policy's vehicles together and may use each year as a fold for weather perils.
- 10.4 Stability Over Time
    - 10.4.1 Coefficients can change over time
        - Model drift is checked by interacting each feature with time (with LASSO selection), segmented modelling, rolling-window analysis and regular recalibration.
    - 10.4.2 The meaning of data can change over time
        - A vendor's roof score or credit model can change meaning between versions.
    - 10.4.3 Business mix can change over time
        - GLMs are robust to data drift within limits; newly written risks previously excluded (coastal risks) are extrapolation.
    - 10.4.4 When cross-validation will fail
        - A small, mispriced segment can grow through adverse selection until actual performance is far below cross-validation performance; check price changes by segment and against competitors, and monitor the mix.
- 10.5 Regulation
    - A predictor's meaning can differ by jurisdiction (safe driver discounts), and regulation limits credit scores and disallows variables such as race, religion, education and income.
- 10.6 Outliers and Model Stability
    - [[Outlier|Outliers]] in predictors (a Ferrari's value and engine size) can distort coefficients; omit them, use robust regression, transform, or cap and floor.
- 10.7 Data Quality
    - Data are seldom complete or correct: scrub, understand [[Missing Data|missing values]] (a missing category, or imputation), beware a book so adversely selected that its data can no longer segment risk, and take care combining datasets even with a control variable for the source ([[Data Quality]]).
- 10.8 Conclusion
    - A rating plan has three parts, preparing the data, the analysis, and making sure the plan is fit for market; the monograph covers the analysis, "the easiest and quickest aspect."

## Bibliography
- The works cited, among them Goldburd et al. (2025), Holmes and Casotto (2025), James et al. (2021), West et al. (2022), Molnar (2020), Kuhn and Johnson (2019), Yan et al. (2009) and Shi (2010).

## Related readings
- [[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)]] — the CAS GLM monograph whose familiarity §1.1 assumes, and whose sections on offsets, GLMMs and correlation the monograph builds on
- [[Penalized Regression and Lasso Credibility (Holmes and Casotto - 2025)]] — cited in §4.7.1 for the link between penalization and Bühlmann's credibility factor
- [[An Introduction to Statistical Learning (James et al. - 2021)]] — its relevant chapters are assumed knowledge (§1.1); cited for partial least squares in §7.4.5
- [[Linear Mixed Models (West et al. - 2022)]] — cited in §6.5 for GLMMs

## Sources
- [From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges (CAS Monograph No. 16, 2025)](https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf) — the document: title, authors and series number (title page), copyright year and the print and electronic ISBNs (978-1-7370028-8-8 and 978-1-7370028-9-5, copyright page), chapter and section headings (contents and bookmarks), and the points under them from the text of Chapters 1–10; the monograph itself states no edition
- [CAS Exam 8 Content Outline, Fall 2026 (v03, June 2026)](https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf) — the citation ("CAS Monograph #16, 1st edition") and the assigned objectives A7–A8
