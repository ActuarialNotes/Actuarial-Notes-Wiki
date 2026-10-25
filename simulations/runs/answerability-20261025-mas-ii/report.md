# Answerability: Exam MAS-II (CAS)

Run `answerability-20261025-mas-ii` · 141 questions checked of 141 attempted · cost $31.00

Each question's official solution was broken into the knowledge it uses (by a model that saw no study page), and each item was looked for on the pages the vault gives for the question. An item counts as taught only if a quote of the teaching passage is really on the page; the check is done in code. *Answerable* is necessary, not sufficient: a page can hold the formula and still not teach it well.

| Verdict | Questions | Share |
|---|---|---|
| **Answerable** — everything taught on a tagged page or one link away | 62 | 44% |
| **Untagged** — everything is in the vault, but some of it on a page neither tagged nor linked | 25 | 18% |
| **Gap** — something the solution uses is taught on no page | 54 | 38% |

Requirements: 651 — tagged 444 (68%), linked 40 (6%), elsewhere 54 (8%), missing 113 (17%)
Not checked: 30 off syllabus.

## By sitting

A paper whose gaps far outrun the rest may test a reading the syllabus has since dropped.

| Sitting | Questions | Answerable | Untagged | Gap |
|---|---|---|---|---|
| Fall 2018 | 47 | 9 | 5 | 33 (70%) |
| Fall 2019 | 32 | 16 | 5 | 11 (34%) |
| Spring 2018 | 5 | 5 | 0 | 0 (0%) |
| Spring 2019 | 33 | 16 | 9 | 8 (24%) |
| Undated (samples and the vault's own) | 24 | 16 | 6 | 2 (8%) |

## Gaps, by the page that should teach them

Ranked by how many questions each page's gaps cost. The page is the one named for the item's concept; "no page" means the vault has no page by that name.

### `Concepts/Linear Mixed Model.md` — 10 question(s)

- `masii-2018f-q11` (formula): The estimated variance of the generalized least squares estimator of the fixed effects is (X' V-hat^{-1} X)^{-1}, which plugs in the estimated covariance matrix V-hat as if it were the true known matrix.
- `masii-2018f-q11` (fact): Because the variance of the fixed-effect estimates ignores the uncertainty in estimating the covariance parameters, it is biased (understated) under both ML and REML estimation; REML does not make it unbiased.
- `masii-2018f-q10` (fact): A t-test can be used to test a hypothesis about a single fixed-effect parameter in a Linear Mixed Model.
- `masii-2018f-q10` (fact): Type I (sequential) and Type III (conditional) F-tests can be used to test linear hypotheses involving multiple fixed effects in a Linear Mixed Model.
- `masii-2018f-q12` (fact): In a linear mixed model with repeated measures per subject, a random coefficient on a covariate can only be identified if that covariate varies within a subject; a covariate constant within a subject has a random effect confounded with the random intercept.
- `masii-2018f-q12` (fact): A time-invariant subject characteristic such as sex can enter a linear mixed model as a fixed effect but not as a random effect when each subject is observed repeatedly.
- `masii-2018f-q12` (fact): An interaction between a time-invariant covariate and a time-varying covariate (e.g., sex × age) is, within a subject, either zero or a copy of the time-varying covariate, so its random coefficient is redundant with the random slope on the time-varying covariate and cannot be identified.
- `masii-2018f-q12` (procedure): To choose the specification with the most random effects, include the random intercept plus random coefficients only for covariates (or terms) that vary within subjects and are not redundant with other included random terms.
- `masii-2018f-q15` (fact): The group random effect u_j should appear only once in the hierarchical specification (in the Level 2 intercept equation); including it in both levels double-counts it, giving 2u_j with variance 4 times the group variance, and the student-level residual epsilon_ij must remain in Level 1.
- `masii-2018f-q8` (fact): With q random covariates, u_i is q×1 and its covariance matrix D is q×q; the number of fixed covariates and the number of observations do not affect the dimensions of D.
- `masii-2018f-q9` (fact): When covariance parameter estimation in a linear mixed model fails (non-convergence, nonpositive-definite D matrix, boundary estimates), remedies include fitting the implied marginal model, fitting a marginal model with an unstructured covariance matrix, and choosing alternative starting values for…
- `masii-2019f-q11` (fact): Observation-level covariates and the residual error term belong in the Level 1 equation, while group-level covariates and the group random effect belong in the Level 2 equations for the coefficients.
- `masii-2019f-q11` (procedure): To convert a hierarchical model into the general (composite) form, substitute the Level 2 equations for the coefficients into the Level 1 equation and expand; the result should match the general specification term by term.
- `masii-2019f-q8` (fact): The variance-covariance matrix D of the random effects in a linear mixed model is always symmetric because Cov(u_j, u_k) = Cov(u_k, u_j).
- `masii-2019f-q7` (procedure): A hierarchical (multilevel) linear mixed model is converted to a single-equation LMM by substituting the Level 2 equations for the Level 1 coefficients and collecting terms.
- `masii-2019f-q7` (fact): Level 2 fixed-effect terms and coefficients carry over unchanged into the fixed-effects part of the combined LMM: group-level covariates (such as indicator variables) stay in the intercept part, while the time-varying covariate keeps its own coefficient.
- `masii-2019s-q13` (fact): A consistent shift in the same direction across all subjects as the treatment changes indicates a fixed treatment effect.

### `Concepts/Principal Components Analysis.md` — 4 question(s)

- `masii-2018f-q41` (formula): The proportion of variance explained by the m-th principal component equals the sum of squared m-th component scores divided by the total sum of squares of all (centered) variables, sum_i z_im^2 / sum_j sum_i x_ij^2.
- `masii-2018f-q41` (fact): When the data are centered (column means zero), the total variance is the sum of squares of all entries, and any common 1/n or 1/(n-1) factor cancels in the PVE ratio.
- `masii-2019f-q39` (fact): A principal component with a zero eigenvalue explains no additional variance, so the cumulative proportional variance reaches 100% at the component before it and stays flat afterward.
- `masii-2019f-q39` (fact): A variable that is nearly uncorrelated with the other variables is captured by its own principal component with an eigenvalue near 1 (for standardized variables), while a group of highly correlated variables is absorbed mostly into a single dominant component.
- `masii-2019f-q41` (fact): Principal component scores of centred (mean-zero) predictors have mean zero, so the sample variance of the scores is the sum of squared scores divided by n, with no mean subtraction.
- `masii-2019s-q40` (fact): In a PCA biplot of standardized (scaled) variables, the angle between two variables' loading arrows approximates their correlation: a small angle means high positive correlation, a right angle means near-zero correlation, and opposite directions mean negative correlation.
- `masii-2019s-q40` (fact): PCA is performed on centered data, so a biplot score shows an observation's deviation from each variable's mean; it shows whether a value is above or below average but not whether the raw value is positive or negative.
- `masii-2019s-q40` (definition): A biplot displays both observations (as principal component scores) and variables (as loading vectors) on the same axes for the first two principal components.

### `Concepts/Bayesian.md` — 3 question(s)

- `masii-2019s-q18` (fact): In a hierarchical model, the posterior of theta given omega uses the conditional prior of theta given omega, and normalization integrates over theta across the range allowed by that prior.
- `masii-2018f-q32` (fact): Quantities defined with a deterministic equality (such as the linear predictor mu or a slope defined as a function of other parameters and data) are determined by the parameters and data and do not count as additional parameters.
- `masii-2018f-q35` (procedure): To form an equal-tailed posterior interval of level p from n ordered samples, drop n(1-p)/2 samples from each tail, so the interval runs from the (n(1-p)/2 + 1)th smallest to the (n - n(1-p)/2)th smallest sample.

### **no page for Effective Sample Size (MCMC)** — 2 question(s)

- `masii-2018f-q17` (formula): The effective sample size of an MCMC chain with N retained draws is ESS = N / (1 + 2 * sum over k>=1 of rho_k), where rho_k is the autocorrelation at lag k.
- `masii-2018f-q17` (procedure): In the ESS sum, include autocorrelations over all lags provided; lags where autocorrelation is just noise around zero contribute negligibly (or net zero), so the sum may be truncated or extended without changing the result.
- `masii-2018f-q18` (fact): The Monte Carlo error of a posterior mean estimate shrinks in proportion to 1/sqrt(effective sample size), so a modest number of effective samples can estimate a posterior mean well.
- `masii-2018f-q18` (fact): Posterior tail quantities (extreme percentiles, ends of wide intervals) are visited rarely by the sampler and require many more effective samples than the posterior mean.

### **no page for Implied Marginal Model** — 2 question(s)

- `masii-2018f-q9` (definition): The implied marginal model of a linear mixed model omits the random effects and directly fits the marginal covariance matrix V_i = Z_i D Z_i' + R_i, without requiring D to be positive-definite.
- `masii-2019f-q15` (fact): The marginal covariance matrix ZDZ' + R implied by a linear mixed model is positive-definite by construction (D and R are positive-definite), so a marginal model can be fit in cases where the corresponding mixed model cannot, such as when the marginal covariance is nonpositive-definite or has negat…

### **no page for Widely Applicable Information Criterion (WAIC)** — 2 question(s)

- `masii-2018f-q22` (fact): WAIC already includes a penalty of 2 times the effective number of parameters (p_WAIC), so models are compared directly on WAIC and p_WAIC is not added again; a lower WAIC indicates a better model.
- `masii-2018f-q24` (formula): The contribution of observation i to WAIC is -2 times (lppd_i minus p_WAIC,i), i.e. WAIC_i = -2(lppd_i - p_WAIC,i).
- `masii-2018f-q24` (fact): The effective number of parameters p_WAIC for an observation is the sample variance of its log-likelihood values across posterior samples, and when given it is subtracted directly as the penalty in WAIC.

### `Concepts/Markov Chain Monte Carlo.md` — 2 question(s)

- `masii-2018f-q18` (fact): Multiple chains are a diagnostic tool, not a requirement for inference: once a model is known to sample well, a single chain suffices to make posterior inferences.
- `masii-2018f-q30` (fact): Gibbs sampling is a special case of the Metropolis-Hastings algorithm, and both are general MCMC methods for sampling from posterior distributions.

### `Concepts/Uniform Continuous Distribution.md` — 2 question(s)

- `masii-2018f-q28` (fact): A flat (uniform) prior is constant over its support, so the posterior is proportional to the likelihood there and has its peak where the likelihood peaks.
- `masii-2018f-q34` (fact): A uniform distribution centered at zero (e.g., uniform(-c, c)) added to the current position gives a symmetric random-walk proposal, since a step of +d is as likely as a step of -d.

### **no page for Akaike Weights** — 1 question(s)

- `masii-2018f-q22` (definition): The Akaike weight of a model is the model's relative likelihood of making the best out-of-sample predictions among the candidate set, obtained by normalizing exp(-dWAIC/2) across the models.
- `masii-2018f-q22` (formula): The Akaike weight of model i is w_i = exp(-0.5*dWAIC_i) / sum over j of exp(-0.5*dWAIC_j), where dWAIC_i = WAIC_i minus the minimum WAIC among the models.

### **no page for Autocorrelation in MCMC** — 1 question(s)

- `masii-2018f-q20` (fact): A trace plot that drifts in long, slow excursions with each draw close to the previous one indicates high autocorrelation in the chain.

### **no page for Bayes Error Rate** — 1 question(s)

- `masii-2019s-q38` (procedure): The Bayes error rate on a test set is computed by averaging the Bayes error probabilities min{p, 1-p} evaluated at the test x values (the expected error rate at those points), rather than comparing to observed test labels.

### **no page for Bayesian Multilevel Models** — 1 question(s)

- `masii-2018f-q29` (fact): Averaging data within clusters before fitting a single-level model discards variation and creates false confidence, whereas a multilevel model uses the raw observations and retains uncertainty, so avoiding averaging is a valid reason to use it.

### **no page for Best Linear Unbiased Estimator** — 1 question(s)

- `masii-2019s-q12` (fact): The generalized least squares estimator of the fixed effects with known covariance is the best linear unbiased estimator (BLUE) by the Gauss-Markov result.

### **no page for Effective Sample Size** — 1 question(s)

- `masii-2018f-q20` (fact): High autocorrelation reduces the effective sample size, so the draws carry less information than the same number of independent samples.

### **no page for Empirical Bayes Nonparametric Estimation** — 1 question(s)

- `masii-2019s-q4` (formula): The variance of the hypothetical means is estimated as a-hat = [sum m_i (x-bar_i - mu-hat)^2 - (r-1) v-hat] / [m - sum m_i^2 / m], where r is the number of risks.

### **no page for Gelman-Rubin Convergence Diagnostic** — 1 question(s)

- `masii-2018f-q19` (fact): The Gelman-Rubin diagnostic requires at least two chains to be computed but does not indicate whether enough chains have been run; it only shows whether the chains agree.

### **no page for Generalized Least Squares** — 1 question(s)

- `masi-2018f-q44` (fact): GLS provides more appropriate (better) estimates of the standard errors of regression coefficients when residuals are autocorrelated, improving on OLS in that setting.
- `masi-2018f-q44` (fact): GLS's advantage over OLS comes from modeling the residual correlation structure, not from maximizing a likelihood under white noise residuals.

### **no page for Gibbs Sampling** — 1 question(s)

- `masii-2018f-q30` (fact): Gibbs sampling is an MCMC algorithm that draws each parameter in turn from its full conditional posterior distribution, producing a chain that samples from the joint posterior.

### **no page for Grid Approximation** — 1 question(s)

- `masii-2019f-q19` (procedure): In a grid approximation, the prior is a discrete set of candidate parameter values with probabilities obtained by normalizing the given weights so they sum to 1.

### **no page for Highest Posterior Density Interval** — 1 question(s)

- `masii-2018f-q26` (definition): The p% highest posterior density interval (HPDI) is the narrowest interval containing p% of the posterior probability, such that every point inside has posterior density at least as high as every point outside.
- `masii-2018f-q26` (fact): A highest posterior density interval contains the posterior mode and extends further toward the side where the density falls off more slowly; for a unimodal density it is not generally the central (equal-tail) interval.
- `masii-2018f-q26` (procedure): To identify the HPDI among candidate regions, eliminate regions that exclude higher-density points than they include (e.g., omit the mode or include low-density tails), and keep the one that has the required probability mass while sitting on the highest part of the density.

### **no page for Improper Prior Distribution** — 1 question(s)

- `masii-2019s-q23` (definition): An improper prior is a prior density that does not integrate to a finite value over the parameter space, such as the Haldane prior pi^-1(1-pi)^-1 (the Beta(0,0) kernel).
- `masii-2019s-q23` (fact): With an improper prior, the posterior can still be proper or improper depending on the data; if the posterior is improper, it has no valid distribution and no posterior mean exists.

### **no page for Information Criteria (AIC and WAIC)** — 1 question(s)

- `masii-2018f-q33` (formula): Model weights for averaging can be built from information criteria such as AIC or WAIC, giving more weight to models with better estimated out-of-sample performance.

### **no page for Interaction Terms in Regression** — 1 question(s)

- `masii-2018f-q32` (fact): When a regression slope is expressed as a linear function of another predictor (an interaction), the number of parameters equals the coefficients in that function, not the slope itself.

### **no page for Kenward-Roger Adjustment** — 1 question(s)

- `masii-2019f-q12` (fact): The standard estimated covariance matrix of the fixed-effect estimates treats the estimated covariance parameters as if they were the true values, ignoring the uncertainty from estimating them, so it underestimates the variance of the fixed-effect estimates (standard errors too small, tests anti-co…
- `masii-2019f-q12` (procedure): The Kenward-Roger method inflates the estimated covariance matrix of the fixed-effect estimates to correct its downward bias and approximates the denominator degrees of freedom for the F-test in a linear mixed model.
- `masii-2019f-q12` (fact): The Kenward-Roger adjustment is designed for linear mixed models, where random effects and correlated residuals make observations neither independent nor equally weighted, so a standard F-test with naive degrees of freedom is not appropriate.
- `masii-2019f-q12` (fact): The Kenward-Roger adjustment matters most for small samples; as the sample size grows the bias becomes negligible and the adjusted denominator degrees of freedom converge to the naive ones.

### **no page for Kullback-Leibler Divergence** — 1 question(s)

- `masii-2018f-q21` (definition): The Kullback-Leibler divergence measures the extra uncertainty (information loss) from using a model distribution q to describe events that actually follow the true distribution p.
- `masii-2018f-q21` (formula): The KL divergence of model q from true distribution p for a discrete distribution is D_KL(p, q) = sum_i p_i ln(p_i / q_i), the expected log-ratio taken under the true distribution p.
- `masii-2018f-q21` (fact): KL divergence is not symmetric, so the order of p and q matters: weighting by q instead of the true distribution p gives a different value.

### **no page for Linear Trend Model** — 1 question(s)

- `masi-2018f-q42` (procedure): For a linear trend plus noise model x_t = α_0 + α_1 t + z_t, the first difference equals α_1 + (z_t - z_{t-1}), so the intercept cancels and the slope remains as a constant.
- `masi-2018f-q42` (procedure): Estimate model parameters by writing the observed differences and observed values as equations in the unknown parameters and noise terms, then solving the resulting simultaneous equations.

### **no page for Log Pointwise Predictive Density** — 1 question(s)

- `masii-2018f-q24` (formula): The log pointwise predictive density for observation i is the natural log of the average, over the S posterior samples, of the likelihood p(y_i \| theta_s).

### **no page for Log Transformation of Predictors** — 1 question(s)

- `masii-2019f-q22` (fact): A log-transformed predictor equals zero when the original variable equals 1, so the intercept corresponds to the original variable being 1, not its mean, unless the log variable is centered.

### **no page for MCMC Diagnostics (Trace Plots)** — 1 question(s)

- `masii-2018f-q20` (procedure): When a chain shows high autocorrelation, remedy it by running many more iterations so enough effectively independent draws accumulate to make inferences about the posterior.

### **no page for Metropolis Algorithm** — 1 question(s)

- `masii-2018f-q34` (fact): A proposal distribution supported only on positive values, when added to the current position, only moves the sampler upward, so it is not symmetric and the chain cannot explore the posterior.
- `masii-2018f-q34` (fact): A proposed value outside the parameter's support has posterior density zero, so its acceptance probability is zero and it is rejected.

### **no page for Model Averaging** — 1 question(s)

- `masii-2018f-q33` (definition): Model averaging combines several candidate models by averaging (mixing) their predictions or posterior predictive distributions, often weighted by each model's estimated out-of-sample accuracy.
- `masii-2018f-q33` (fact): Parameters of different models are not directly comparable because the same-named parameter has a different meaning depending on which other predictors are included, and some parameters do not exist in all models, so averaging parameter values does not produce a valid model.

### **no page for Nested Models** — 1 question(s)

- `masii-2018f-q2` (fact): A model that pools or groups categories (equal coefficients for several levels) is nested within the model that estimates a separate coefficient for each level, since grouping only imposes equality constraints.

### **no page for Parameter Redundancy in ARMA Models** — 1 question(s)

- `masi-2019f-q43` (fact): Common factors shared by the AR and MA polynomials can be cancelled to reduce the model (for example to an ARIMA form), which does not change the stationarity or invertibility conclusions here.

### **no page for Posterior Sampling (MCMC)** — 1 question(s)

- `masii-2018f-q35` (fact): Samples from each posterior column that are sorted independently lose their draw-by-draw pairing, so quantiles of a sum of parameters cannot be obtained by adding quantiles of the individual parameters.
- `masii-2018f-q35` (procedure): To get the posterior interval of a function of parameters (such as a sum), compute the function for each joint posterior draw, sort the results, and read the quantiles from that sorted column.

### **no page for Prior Distributions** — 1 question(s)

- `masii-2018f-q32` (fact): A prior placed on a transformation of a parameter (such as ln of the standard deviation) still describes a single unknown parameter, so it counts as one parameter.

### **no page for REML and ML Estimation** — 1 question(s)

- `masii-2018f-q9` (fact): Iterative ML/REML estimation can fail from poor starting values, so choosing alternative starting values for the covariance parameters is a standard first remedy for convergence failure.

### **no page for Singular Matrix and Rank** — 1 question(s)

- `masii-2019f-q39` (fact): If one variable is an exact linear function of another (correlation of ±1), the correlation matrix is singular, so at least one eigenvalue equals zero and the rank is reduced.

### **no page for Wald Test** — 1 question(s)

- `masii-2018f-q10` (definition): An omnibus Wald test tests a general linear hypothesis H0: Lβ = 0 about the fixed effects using a chi-square statistic.
- `masii-2018f-q10` (fact): A Wald z-test for a covariance (variance) parameter is not recommended because the normal approximation requires very large samples for skewed variance estimates and fails when the null value lies on the boundary of the parameter space.

### **no page for Weakly Informative Prior** — 1 question(s)

- `masii-2018f-q18` (fact): Weakly informative priors that rule out implausible parameter values improve sampling efficiency (better mixing, fewer divergent transitions, more effective samples per iteration) compared with flat non-informative priors.

### `Concepts/Bühlmann Credibility.md` — 1 question(s)

- `masii-2018f-q3` (formula): The variance of the hypothetical means (VHM) equals the probability-weighted mean of the squared hypothetical means minus the square of the overall expected mean.

### `Concepts/Bühlmann-Straub Credibility.md` — 1 question(s)

- `masii-2019s-q4` (formula): In the Bühlmann-Straub model, the overall mean is estimated as the exposure-weighted average of the risks' sample means: mu-hat = sum m_i x-bar_i / m.
- `masii-2019s-q4` (procedure): To predict aggregate losses for a future period, multiply the credibility-estimated per-exposure mean by the future period's exposure.

### `Concepts/Correlation.md` — 1 question(s)

- `masi-2018f-q44` (fact): With positive serial correlation in the errors, ordinary least squares standard errors of the regression coefficients are biased downward (underestimated), making estimates look more precise than they are.

### `Concepts/Correlogram.md` — 1 question(s)

- `masi-2018f-q41` (fact): A correlogram does not reveal the direction (positive or negative) of a trend, since rising and falling series can produce the same autocorrelation pattern.

### `Concepts/Deterministic and Stochastic Trend.md` — 1 question(s)

- `masi-2019s-q44` (fact): Short-term extrapolation of a deterministic trend can be justified because underlying trends usually change slowly relative to the forecast lead time.

### `Concepts/Deviance.md` — 1 question(s)

- `masii-2018f-q25` (formula): DIC equals the posterior mean deviance plus the effective number of parameters, DIC = D̄ + p_D, where p_D = D̄ − D(θ̄) and D = −2 × log-likelihood.
- `masii-2018f-q25` (fact): Lower DIC values indicate a better model (better expected out-of-sample fit), as with AIC, because DIC is on the deviance scale.
- `masii-2018f-q25` (fact): The p_D term in DIC is a penalty for model complexity, measuring the effective number of parameters.
- `masii-2018f-q25` (fact): DIC is a Bayesian analogue of AIC: with flat priors and an approximately normal posterior it is close to AIC, but an informative prior reduces the effective number of parameters below the raw parameter count, so DIC reflects prior information that AIC ignores.

### `Concepts/Gini Index.md` — 1 question(s)

- `masii-2018f-q40` (fact): For a given node, cross-entropy is at least the Gini index, which is at least the classification error rate, with all three equal at zero for a pure node. For a two-class node with p = 1/2 the error rate and Gini index are equal, and in other impure nodes Gini exceeds the error rate.

### `Concepts/Hierarchical Model.md` — 1 question(s)

- `masii-2018f-q15` (procedure): To convert a two-level hierarchical (multilevel) model to its equivalent single-equation linear mixed model, substitute the Level 2 equation(s) for the Level 1 coefficients into the Level 1 equation and combine terms.
- `masii-2018f-q15` (fact): In a hierarchical model, each level's equation includes only covariates measured at that level; group-level (e.g., classroom) covariates enter the Level 2 equation for the group-specific coefficient, while individual-level covariates enter the Level 1 equation.

### `Concepts/K-Nearest Neighbors.md` — 1 question(s)

- `masii-2018f-q37` (fact): When k equals the size of the training set, every point's neighborhood is the entire training set, so KNN predicts the same class (the most common training class) for every point.

### `Concepts/Linear Regression.md` — 1 question(s)

- `masii-2018f-q23` (procedure): Diagnose multicollinearity from posterior plots by checking for wide marginal intervals, a thin ridge in the joint posterior of two coefficients, and a tightly determined sum (or difference) of the coefficients.

### `Concepts/Model Selection.md` — 1 question(s)

- `masii-2018f-q33` (fact): Selecting only the best-performing model is model selection, not model averaging; it discards information about uncertainty over which model is correct and overstates confidence in the chosen model.

### `Concepts/Multicollinearity.md` — 1 question(s)

- `masii-2018f-q23` (fact): In a Bayesian regression with multicollinear predictors, the marginal posteriors of the individual coefficients are wide (intervals may include zero) even when each predictor is strongly related to the response.
- `masii-2018f-q23` (fact): If two predictors are strongly positively correlated (x1 ≈ x2), only the sum of their coefficients is identified, so the posterior of the coefficients shows a negative correlation (downward-sloping ridge).
- `masii-2018f-q23` (fact): If two predictors are strongly negatively correlated (x1 ≈ -x2), only the difference of their coefficients is identified, so the posterior of the coefficients has a positive correlation (upward-sloping ridge).
- `masii-2018f-q23` (fact): Correlation between coefficients in the posterior is a symptom of multicollinearity, not a property of the data; the data property is the correlation between the predictors.

### `Concepts/Neural Network.md` — 1 question(s)

- `masii-an-014` (definition): The squared-error objective for one observation is R_i(θ) = ½(y_i − f_θ(x_i))², where the ½ is included so the derivative has no factor of 2.

### `Concepts/Poisson Distribution.md` — 1 question(s)

- `masii-2018f-q27` (fact): In R, rpois(n, lambda) with a vector lambda draws each Poisson value using the corresponding element of the vector as its mean, so the output values are draws from the posterior predictive distribution when lambda holds posterior draws.

### `Concepts/Quantile Plot.md` — 1 question(s)

- `masii-an-019` (fact): A model whose predictions exceed actuals at the high end and fall short at the low end has overly extreme predictions, indicating poorer accuracy; a narrow range of predictions does not imply accuracy.

### `Concepts/Restricted Maximum Likelihood.md` — 1 question(s)

- `masii-2018f-q30` (fact): REML yields point estimates and uses no prior distribution, so it does not produce or update posterior distributions.

### `Concepts/Tree Pruning.md` — 1 question(s)

- `masii-2018f-q38` (procedure): Pruning a tree at an internal node collapses the entire subtree below it into a single terminal node, whose RSS replaces the RSS of the subtree's terminal nodes and reduces the terminal node count accordingly.

### `Concepts/Variance Function.md` — 1 question(s)

- `masii-2019f-q1` (formula): The exponential variance function is Var(e_ij) = sigma^2 exp(2 delta v_ij) and the power variance function is Var(e_ij) = sigma^2 \|v_ij\|^(2 delta); both reduce to constant variance when delta = 0, but neither family contains the other.

## Tagging and linking gaps

The vault teaches what these questions need, but on a page the question isn't tagged with and its tagged pages don't link to. Adding the page to the question's `wiki_link` (or linking it from the tagged page) puts it in reach.

| Question | Pages that teach what it needs |
|---|---|
| `masi-2018f-q42` | Linear Trend |
| `masi-2018f-q44` | Ordinary Least Squares |
| `masi-2018f-q45` | Sample Mean |
| `masi-2019f-q44` | Sample Mean |
| `masi-2019s-q42` | Correlogram, Sample Mean |
| `masii-2018f-q1` | Critical Value |
| `masii-2018f-q10` | Model Selection |
| `masii-2018f-q28` | Bayesian Estimation |
| `masii-2018f-q3` | Uniform Continuous Distribution |
| `masii-2018f-q31` | Bayesian Estimation, Posterior Distribution |
| `masii-2018f-q32` | Bayesian Estimation, Response Variable |
| `masii-2018f-q34` | Conjugate Prior |
| `masii-2018f-q36` | Similarity and Distance Measures |
| `masii-2018f-q37` | Model Training and Evaluation |
| `masii-2018f-q38` | Regression Tree |
| `masii-2018f-q40` | Classification Tree |
| `masii-2018f-q5` | Exposure Base |
| `masii-2019f-q22` | Variable Transformation |
| `masii-2019f-q27` | Mixing Distribution |
| `masii-2019f-q35` | Bayesian Estimation, Mode |
| `masii-2019f-q4` | Normal Distribution |
| `masii-2019f-q6` | Moment, Uniform Continuous Distribution |
| `masii-2019s-q11` | Design Matrix |
| `masii-2019s-q14` | Residual |
| `masii-2019s-q15` | Model Output, Model Selection, p-Value |
| `masii-2019s-q18` | Uniform Continuous Distribution |
| `masii-2019s-q2` | Random Effects |
| `masii-2019s-q24` | Bayesian Bornhuetter-Ferguson Model |
| `masii-2019s-q38` | Classification Tree |
| `masii-2019s-q39` | Regression Tree |
| `masii-2019s-q5` | Frequency |
| `masii-2019s-q7` | Frequency, Sufficient Statistic |
| `masii-an-002` | Exact Credibility |
| `masii-an-007` | Overfitting |
| `masii-an-008` | Median |
| `masii-an-010` | Node Impurity |
| `masii-an-011` | Regression Tree |
| `masii-an-014` | Hidden Layer |
| `masii-an-025` | Covariance Structure, Model Selection |

## Taught only in a collapsed section

The passage that teaches these items sits inside a folded callout (a worked example, a table behind a toggle). A reader who skims never opens it.

| Page | Questions | Items |
|---|---|---|
| Expected Value of Process Variance | 3 | When the risk class is unknown, compute EPV and the overall mean by weighting e…; Compute EPV as the probability-weighted average of the process variances across…; For a Poisson distribution with mean λ, both the hypothetical mean and the proc… |
| Full Credibility Standard | 3 | A tighter tolerance raises the full credibility standard in proportion to 1/k^2…; For a given probability p and tolerance k, the standard is found using the stan…; The standard normal percentile z used for a probability p two-sided interval is… |
| Posterior Distribution | 3 | To compute a grid-approximation posterior, multiply prior and likelihood at eac…; For n Binomial trials with x successes, the likelihood in the success probabili…; To update a prior over risk classes after observing a claim, use the prior clas… |
| Bayesian Estimation | 2 | The posterior density must be zero wherever the prior density is zero, so a pos…; With a uniform prior on an interval, the posterior is proportional to the likel… |
| Gini Index | 2 | The area under the Lorenz curve by the trapezoidal method is the sum over segme…; Compute the Lorenz curve points by accumulating exposure and loss over the sort…; AUROC is computed as the area under the ROC curve by summing trapezoid areas be… |
| Backpropagation | 1 | Use the chain rule to get the gradient of the loss with respect to an output-la… |
| Backward Shift Operator | 1 | To check stationarity or invertibility, factor the AR or MA polynomial and solv… |
| Bootstrap | 1 | The bootstrap estimate of the standard error of a statistic is the standard dev… |
| Bühlmann Credibility | 1 | When the loss is annual and the policyholder has several years of experience, e… |
| Classification Tree | 1 | At a given x, the Bayes classifier's error probability is 1 - max_j Pr[Y=j \| X… |
| Confusion Matrix | 1 | Build a confusion matrix from the total number of cases, the number of actual p… |
| Correlogram | 1 | A data set shows significant autocorrelation if at least one spike at a lag bey… |
| Covariance Structure | 1 | Under AR(1), Cov(e_t, e_t') = sigma^2 * rho^\|t - t'\|, so the correlation at l…; To check whether a matrix is AR(1), compute rho from the lag-1 covariance divid… |
| Double Lift Chart | 1 | A model's predictions being stable or close to the average across quantiles doe… |
| Empirical Bayes Credibility | 1 | The overall mean estimate for equal-exposure empirical Bayes is the average of … |
| Exact Credibility | 1 | When estimating average claim severity, each claim is one observation, so N is … |
| Fixed Effects | 1 | A treatment or category variable whose levels are all included and are the focu… |
| Linear Mixed Model | 1 | The variance of the group-level random effect measures variance between groups,… |
| Linear Regression | 1 | To judge a treatment's effect on the response, compute the predicted response f… |
| Linkage | 1 | Different linkage methods can produce different cluster merge orders and trees … |
| Markov Chain Monte Carlo | 1 | A proposal with a ratio of 1 or greater (higher posterior density than the curr… |
| Model Output | 1 | To test whether a random effect is needed, set the null hypothesis that the ran… |
| Model Training and Evaluation | 1 | A classifier that predicts one class for all points has an error rate of about … |
| Node Impurity | 1 | A tree that never splits on a predictor contributes zero to that predictor's im…; The residual sum of squares (RSS) reduction of a regression tree split is the d… |
| Principal Components Analysis | 1 | The total variance of a data set is the sum of the variances of its individual … |
| Random Effects | 1 | When clusters are sampled unevenly, a multilevel model shrinks sparsely sampled… |
| Regression Tree | 1 | To get a regression tree's prediction for a record, start at the root and follo… |
| Residual | 1 | In a random-intercept model with one random intercept per subject, Z_i is a col… |
| Residual Plot | 1 | A model that assumes constant variance will show residuals whose spread grows (… |
| Time Series Decomposition | 1 | The estimated additive seasonal effect at time t is the observation minus the e… |
| Variance Components | 1 | The marginal variance of a single observation in a multilevel model equals the … |
| Variance Function | 1 | Count the extra parameters of a variance function with different standard devia… |
| Variance of Hypothetical Means | 1 | A gamma distribution with shape α and rate θ has mean α/θ and variance α/θ².; In the Poisson-gamma model, k = v/a equals the gamma rate parameter θ, so the s… |

## Every question

<details><summary><code>masi-2018f-q41</code> · gap</summary>

Tagged pages: Time Series, Correlation, Correlogram, Seasonality

| Item | Kind | Status | Where |
|---|---|---|---|
| A correlogram is a plot of the sample autocorrelation function (ACF) of a time series against the lag. | definition | tagged | Correlogram: “**A correlogram** is the plot of the sample autocorrelations $r_k$ of a [[Time Series\\|time series]…” |
| A slowly decaying sample ACF (autocorrelations staying large over many lags) indicates non-stationarity, consistent with a trend in the ser… | fact | tagged | Correlogram: “slow, near-linear decay from close to $1$ means a trend or other non-stationarity; [[Differencing\\|…” |
| A correlogram does not reveal the direction (positive or negative) of a trend, since rising and falling series can produce the same autocor… | fact | missing |  |
| A recurring peak in the sample ACF at a lag equal to the seasonal period (e.g. lag 12 for monthly data) indicates a seasonal pattern in the… | fact | tagged | Correlogram: “peaks at lags $s, 2s, \ldots$ ($s = 12$ for monthly data, $s = 4$ for quarterly) mean [[Seasonality…” |

</details>

<details><summary><code>masi-2018f-q42</code> · gap</summary>

Tagged pages: Time Series, Differencing, Time Series Forecast, Deterministic and Stochastic Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| The first-order difference of a series is ∇x_t = x_t - x_{t-1}, the change from the previous period. | definition | tagged | Time Series: “$\nabla Y_t = Y_t - Y_{t-1}$” |
| For a linear trend plus noise model x_t = α_0 + α_1 t + z_t, the first difference equals α_1 + (z_t - z_{t-1}), so the intercept cancels an… | procedure | missing |  |
| Estimate model parameters by writing the observed differences and observed values as equations in the unknown parameters and noise terms, t… | procedure | missing |  |
| White noise has mean zero, so its forecast for any future time is zero and the forecast of a trend-plus-white-noise series equals the trend… | fact | linked | White Noise: “White noise is [[Stationarity\\|stationary]] by construction and completely **unforecastable** — the…” |
| The forecast of a linear-trend series at time t is α_0 + α_1 t, using the estimated intercept and slope. | formula | elsewhere | Linear Trend: “$$\hat{y}_t = a + b\,t$$” |

</details>

<details><summary><code>masi-2018f-q43</code> · answerable</summary>

Tagged pages: Time Series, ARIMA, Stationarity, Autoregressive Model, Backward Shift Operator

| Item | Kind | Status | Where |
|---|---|---|---|
| To check stationarity of an AR(p) model, write the autoregressive characteristic polynomial 1 - φ1 B - ... - φp B^p, set it to zero, and so… | procedure | tagged | Autoregressive Model: “$$\phi(B)Y_t = c + \varepsilon_t, \qquad \phi(B) = 1 - \phi_1 B - \cdots - \phi_p B^{p}$$” |
| An AR process is stationary if and only if all roots of its autoregressive polynomial lie outside the unit circle; a root on or inside the … | fact | tagged | Autoregressive Model: “[[Stationarity]] requires all roots of $\phi(B) = 0$ **outside** the unit circle; for AR(1) that is…” |
| A pure autoregressive model has no moving-average terms and is always invertible. | fact | linked | Moving Average Model: “The condition on the $\theta$'s is *invertibility* (roots of $\theta(B)$ outside the unit circle), …” |
| An AR(p) model expresses x_t as a linear combination of its previous p values plus a white noise term, so a model with lags 1 and 2 is AR(2… | definition | tagged | Autoregressive Model: “$$Y_t = c + \phi_1 Y_{t-1} + \cdots + \phi_p Y_{t-p} + \varepsilon_t$$” |

</details>

<details><summary><code>masi-2018f-q44</code> · gap</summary>

Tagged pages: Time Series, Correlation, Linear Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| With positive serial correlation in the errors, ordinary least squares standard errors of the regression coefficients are biased downward (… | fact | missing |  |
| Generalized least squares (GLS) is a regression estimation method that accounts for the covariance structure of the residuals (e.g., autoco… | definition | elsewhere | Ordinary Least Squares: “correlated errors call for *generalized* least squares, which is how a [[Linear Mixed Model]] estim…” |
| GLS provides more appropriate (better) estimates of the standard errors of regression coefficients when residuals are autocorrelated, impro… | fact | missing |  |
| GLS's advantage over OLS comes from modeling the residual correlation structure, not from maximizing a likelihood under white noise residua… | fact | missing |  |

</details>

<details><summary><code>masi-2018f-q45</code> · untagged</summary>

Tagged pages: Time Series, Correlation, Autocorrelation Function

| Item | Kind | Status | Where |
|---|---|---|---|
| The sample autocorrelation at lag k is r_k = [sum over t=1..n-k of (x_t - xbar)(x_{t+k} - xbar)] / [sum over t=1..n of (x_t - xbar)^2], whe… | formula | tagged | Autocorrelation Function: “$$\hat{\rho}_k = \frac{\sum_{t=1}^{n-k}(y_t - \bar{y})(y_{t+k} - \bar{y})}{\sum_{t=1}^{n}(y_t - \ba…” |
| To compute the lag-k numerator, pair each deviation from the mean with the deviation k periods later, multiply the pairs, and sum over the … | procedure | linked | Cross-Correlation: “As in the sample ACF, the sum has $n - h$ terms but is divided by $n$.” |
| The sample mean of the series is the sum of all observations divided by the number of observations, and it is used to center the series whe… | definition | elsewhere | Sample Mean: “$$\bar{X} = \frac{1}{n}\sum_{i=1}^{n} X_i$$” |

</details>

<details><summary><code>masi-2018s-q41</code> · answerable</summary>

Tagged pages: Time Series, Correlation, Autocorrelation Function

| Item | Kind | Status | Where |
|---|---|---|---|
| The sample autocorrelation at lag k is r_k = [sum over t=1 to n-k of (x_t - xbar)(x_{t+k} - xbar)] divided by [sum over t=1 to n of (x_t - … | formula | tagged | Autocorrelation Function: “$$\hat{\rho}_k = \frac{\sum_{t=1}^{n-k}(y_t - \bar{y})(y_{t+k} - \bar{y})}{\sum_{t=1}^{n}(y_t - \ba…” |
| To compute the lag-k numerator, subtract the sample mean from each observation and sum the products of deviations for the n-k pairs separat… | procedure | linked | Cross-Correlation: “As in the sample ACF, the sum has $n - h$ terms but is divided by $n$.” |

</details>

<details><summary><code>masi-2018s-q42</code> · answerable</summary>

Tagged pages: Time Series, Correlation, Correlogram, Autocorrelation Function

| Item | Kind | Status | Where |
|---|---|---|---|
| A correlogram is a plot of the sample autocorrelation function (ACF) values against the lag. | definition | tagged | Correlogram: “**A correlogram** is the plot of the sample autocorrelations $r_k$ of a [[Time Series\\|time series]…” |
| Sample autocorrelations at lag k≥1 are statistically significant when they fall outside the approximate significance bounds -1/n ± 2/√n (ab… | fact | tagged | Correlogram: “When the true $\rho_k = 0$, $r_k$ is approximately normal with mean $-1/n$ and variance $1/n$. That…” |
| Lag 0 autocorrelation always equals 1 and is ignored when testing for significant autocorrelation. | fact | tagged | Correlogram: “The first bar is always $r_0 = 1$.” |
| A series whose sample autocorrelations all lie within the significance bounds is consistent with white noise, i.e. no significant autocorre… | fact | tagged | Correlogram: “everything inside the bounds looks like [[White Noise\\|white noise]]” |
| A data set shows significant autocorrelation if at least one spike at a lag beyond 0 exceeds the bounds, even if it occurs at a non-early l… | fact | tagged | Correlogram (collapsed): “$r_{12} = 0.31$ is well outside, **and at the seasonal lag**. The AR(1) has left the annual pattern…” |

</details>

<details><summary><code>masi-2018s-q43</code> · answerable</summary>

Tagged pages: Time Series, Covariance, Autocorrelation Function

| Item | Kind | Status | Where |
|---|---|---|---|
| The sample autocovariance at lag k is the sum over t=1 to n-k of (x_t - xbar)(x_{t+k} - xbar), divided by n (not n-k). | formula | linked | Cross-Correlation: “$$\hat{\gamma}_{xy}(h) = \frac{1}{n}\sum_{t=1}^{n-h}(x_{t+h} - \bar{x})(y_t - \bar{y})$$” |
| Autocovariance at lag k is the covariance between observations of a stationary time series separated by k time periods. | definition | tagged | Time Series: “$\text{Cov}(Y_t, Y_{t+h}) = \gamma(h)$ depends only on lag $h$, not on $t$” |
| To compute the sample autocovariance, subtract the sample mean from each observation to get deviations, then multiply each deviation by the… | procedure | tagged | Autocorrelation Function: “\hat{\rho}_k = \frac{\sum_{t=1}^{n-k}(y_t - \bar{y})(y_{t+k} - \bar{y})}{\sum_{t=1}^{n}(y_t - \bar{…” |

</details>

<details><summary><code>masi-2018s-q44</code> · answerable</summary>

Tagged pages: Time Series, ARIMA, Autoregressive Model, Prediction Interval, Time Series Forecast

| Item | Kind | Status | Where |
|---|---|---|---|
| For an AR(1) model with coefficient phi and one-step error variance sigma^2, the l-step ahead forecast error variance is sigma^2 times the … | formula | tagged | Time Series Forecast: “The $\psi_j$ are the coefficients of the infinite MA representation; for an AR(1), $\psi_j = \phi^{…” |
| The forecast standard error is the square root of the forecast error variance. | definition | tagged | Prediction Interval: “$$\mathrm{SE}(e_{t+h}) = \sigma\sqrt{\sum_{j=0}^{h-1}\psi_j^{2}}$$” |
| The estimated mean squared error of a fitted AR(1) model serves as the estimate of the one-step ahead error variance sigma^2, and the inter… | fact | tagged | Time Series Forecast: “Two-step error is $\varepsilon_{52} + \phi\varepsilon_{51}$, with variance $\sigma^2(1 + \phi^{2}) …” |

</details>

<details><summary><code>masi-2018s-q45</code> · answerable</summary>

Tagged pages: Time Series, Deterministic and Stochastic Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| A deterministic trend is a trend that follows a fixed, systematic functional form of time (e.g., linear or polynomial in t), so its changes… | definition | tagged | Deterministic and Stochastic Trend: “A **deterministic trend** is a fixed function of time that the series returns to after a shock” |
| A stochastic trend is a trend driven by random shocks (e.g., a random walk), so its changes in direction are random and unexplainable. | definition | tagged | Deterministic and Stochastic Trend: “a **stochastic trend** is a unit root, where each shock permanently moves the level” |
| Deterministic trends are better suited to extrapolation (forecasting far ahead) than stochastic trends, because their future path follows a… | fact | tagged | Deterministic and Stochastic Trend: “\\| Long-horizon forecast \\| the trend line \\| last value plus $h\delta$, with a widening interval \\|” |
| High serial correlation combined with random error characterizes stochastic trends (e.g., random walk behavior), not deterministic trends. | fact | tagged | Deterministic and Stochastic Trend: “A true deterministic trend would leave stationary residuals.” |

</details>

<details><summary><code>masi-2019f-q41</code> · answerable</summary>

Tagged pages: Cross-Correlation, Autocorrelation Function, Time Series, Covariance

| Item | Kind | Status | Where |
|---|---|---|---|
| The sample cross-correlation at lag h equals the sample cross-covariance at lag h divided by the square root of the product of the two seri… | formula | tagged | Cross-Correlation: “$$\hat{\rho}_{xy}(h) = \frac{\hat{\gamma}_{xy}(h)}{\sqrt{\hat{\gamma}_x(0)\,\hat{\gamma}_y(0)}}$$” |
| The cross-covariance function ccvf(x,y) at lag h measures the covariance between one series at time t+h and the other series at time t; its… | definition | tagged | Cross-Correlation: “$$\gamma_{xy}(h) = \mathrm{Cov}(x_{t+h},\, y_t) = E\big[(x_{t+h} - \mu_x)(y_t - \mu_y)\big]$$” |
| The sample autocovariance at lag 0 of a series is its sample variance, and autocovariances at nonzero lags do not enter the denominator of … | fact | tagged | Cross-Correlation: “**The sample ccf divides by the lag-0 autocovariances.** The lag-$h$ cross-covariance is scaled by …” |

</details>

<details><summary><code>masi-2019f-q42</code> · answerable</summary>

Tagged pages: Autoregressive Model, Random Walk, Stationarity, Time Series Forecast, Backward Shift Operator

| Item | Kind | Status | Where |
|---|---|---|---|
| A zero-mean AR(1) process is x_t = phi * x_{t-1} + w_t, where w_t is white noise. | definition | tagged | Stationarity: “An AR(1) $Y_t = \phi Y_{t-1} + \varepsilon_t$ is stationary exactly when $\lvert\phi\rvert < 1$” |
| The characteristic equation of an AR(1) in the backshift operator is 1 - phi*B = 0, so its root is B = 1/phi (phi = 1/root). | fact | tagged | Autoregressive Model: “[[Stationarity]] requires all roots of $\phi(B) = 0$ **outside** the unit circle; for AR(1) that is…” |
| An AR(1) process is stationary if and only if the root of its characteristic equation lies outside the unit circle (equivalently \|phi\| < … | fact | tagged | Autoregressive Model: “[[Stationarity]] requires all roots of $\phi(B) = 0$ **outside** the unit circle; for AR(1) that is…” |
| The one-step-ahead forecast of a zero-mean AR(1) is x_hat_{t+1} = phi * x_t, depending only on the most recent observation. | formula | tagged | Autoregressive Model: “Forecasts decay geometrically back to the mean: $\hat Y_{t+h} = \mu + \phi^{h}(Y_t - \mu)$” |
| A random walk with no drift is x_t = x_{t-1} + w_t, i.e., an AR(1) with phi = 1 (non-stationary, root of 1), so its forecast equals the las… | fact | tagged | Random Walk: “A **random walk** is the non-stationary series whose change at each step is [[White Noise\\|white no…” |

</details>

<details><summary><code>masi-2019f-q43</code> · gap</summary>

Tagged pages: ARIMA, Stationarity, Autoregressive Model, Moving Average Model, Backward Shift Operator

| Item | Kind | Status | Where |
|---|---|---|---|
| An ARMA(p, q) model has an autoregressive part of order p (lagged series terms) and a moving-average part of order q (lagged white-noise te… | definition | tagged | ARIMA: “\\| $p$ \\| Order of autoregressive component — uses $p$ lags of $Y_t$ \\|” |
| Write an ARMA model with the backshift operator by moving all AR terms to the left side, giving an AR polynomial φ(B) multiplying x_t and a… | procedure | tagged | Backward Shift Operator: “$\phi(B) = 1 - \phi_1 B - \cdots - \phi_p B^p$ is the AR polynomial and $\theta(B) = 1 + \theta_1 B…” |
| An ARMA process is stationary if and only if all roots of its AR polynomial φ(B) lie outside the unit circle; a root on or inside the circl… | fact | tagged | Autoregressive Model: “[[Stationarity]] requires all roots of $\phi(B) = 0$ **outside** the unit circle; for AR(1) that is…” |
| An ARMA process is invertible if and only if all roots of its MA polynomial θ(B) lie outside the unit circle. | fact | tagged | Backward Shift Operator: “The same test on $\theta(B) = 0$ checks invertibility.” |
| To check stationarity or invertibility, factor the AR or MA polynomial and solve for its roots in B (a factor 1 - cB has root 1/c). | procedure | tagged | Backward Shift Operator (collapsed): “The AR polynomial has roots $B = 1$ and $B = 2$. The root at $1$ is a unit root, so difference once…” |
| Common factors shared by the AR and MA polynomials can be cancelled to reduce the model (for example to an ARIMA form), which does not chan… | fact | missing |  |

</details>

<details><summary><code>masi-2019f-q44</code> · untagged</summary>

Tagged pages: Autocorrelation Function, Time Series

| Item | Kind | Status | Where |
|---|---|---|---|
| The sample autocorrelation at lag k is the sum over t=1 to n-k of (x_t - xbar)(x_{t+k} - xbar), divided by the sum over t=1 to n of (x_t - … | formula | tagged | Autocorrelation Function: “$$\hat{\rho}_k = \frac{\sum_{t=1}^{n-k}(y_t - \bar{y})(y_{t+k} - \bar{y})}{\sum_{t=1}^{n}(y_t - \ba…” |
| To compute the sample autocorrelation at lag k, subtract the overall sample mean of the whole series from each observation, then pair each … | procedure | tagged | Autocorrelation Function: “$$\hat{\rho}_k = \frac{\sum_{t=1}^{n-k}(y_t - \bar{y})(y_{t+k} - \bar{y})}{\sum_{t=1}^{n}(y_t - \ba…” |
| In the sample autocorrelation, the denominator uses all n squared deviations (the sample variance sum), while the numerator has only n-k cr… | fact | linked | Cross-Correlation: “As in the sample ACF, the sum has $n - h$ terms but is divided by $n$.” |
| The sample mean of a time series is the sum of all observations divided by the number of observations n, and it is used as the estimate of … | definition | elsewhere | Sample Mean: “$$\bar{X} = \frac{1}{n}\sum_{i=1}^{n} X_i$$” |

</details>

<details><summary><code>masi-2019f-q45</code> · answerable</summary>

Tagged pages: Time Series Forecast, Autoregressive Model, White Noise

| Item | Kind | Status | Where |
|---|---|---|---|
| To forecast an AR(p) process multiple steps ahead, compute forecasts recursively: substitute known observed values for past terms, previous… | procedure | tagged | Time Series Forecast: “**Build it recursively**: replace future shocks with 0, future observations with their forecasts, a…” |
| Future white noise error terms have expectation zero, so they drop out of the point forecast of a time series model. | fact | tagged | White Noise: “White noise is [[Stationarity\\|stationary]] by construction and completely **unforecastable** — the…” |
| An AR(p) model expresses the current value as a constant plus a linear combination of the previous p values (only the lags with nonzero coe… | definition | tagged | Autoregressive Model: “$$Y_t = c + \phi_1 Y_{t-1} + \cdots + \phi_p Y_{t-p} + \varepsilon_t$$” |

</details>

<details><summary><code>masi-2019s-q41</code> · answerable</summary>

Tagged pages: Time Series Decomposition, Seasonality, Time Series

| Item | Kind | Status | Where |
|---|---|---|---|
| In an additive decomposition, a time series is modeled as x_t = m_t + s_t + z_t, the sum of a trend, a seasonal (monthly) effect, and a ran… | definition | tagged | Time Series Decomposition: “$$\text{additive: } Y_t = m_t + s_t + z_t$$” |
| Estimate the trend m_t with a moving average centered on t, using a window equal to the seasonal period (e.g., 12 months for monthly data). | procedure | tagged | Time Series Decomposition: “**Trend $m_t$** is estimated by a centred moving average of length $s$” |
| For an even seasonal period of length 2k (e.g., 12), the centered moving average is m_t = (½x_{t-k} + x_{t-k+1} + ... + x_{t+k-1} + ½x_{t+k… | formula | tagged | Time Series Decomposition: “for quarterly data $\hat m_t = \tfrac{1}{8}Y_{t-2} + \tfrac14(Y_{t-1}+Y_t+Y_{t+1}) + \tfrac18 Y_{t+…” |
| The estimated additive seasonal effect at time t is the observation minus the estimated trend: s_t = x_t − m_t. | formula | tagged | Time Series Decomposition (collapsed): “$$\text{additive: } 1{,}150 - 1{,}000 = +150$$” |

</details>

<details><summary><code>masi-2019s-q42</code> · untagged</summary>

Tagged pages: Autocorrelation Function, Time Series

| Item | Kind | Status | Where |
|---|---|---|---|
| The sample autocorrelation at lag k is r_k = [sum over t=1..n-k of (x_t - xbar)(x_{t+k} - xbar)] divided by [sum over t=1..n of (x_t - xbar… | formula | tagged | Autocorrelation Function: “$$\hat{\rho}_k = \frac{\sum_{t=1}^{n-k}(y_t - \bar{y})(y_{t+k} - \bar{y})}{\sum_{t=1}^{n}(y_t - \ba…” |
| The sample mean of a time series is the average of all n observations, and it is used as the centering value for every deviation in the sam… | definition | elsewhere | Sample Mean: “The **Sample Mean** $\bar{X}$ is the arithmetic average of a random sample and the standard estimat…” |
| To compute the lag-k sample autocovariance, form deviations from the sample mean and sum the products of each observation's deviation with … | procedure | elsewhere | Correlogram: “$$c_k = \frac{1}{n}\sum_{t=1}^{n-k}(x_t - \bar{x})(x_{t+k} - \bar{x})$$” |
| The sample variance (lag-0 sample autocovariance) used as the autocorrelation denominator is the sum of squared deviations from the sample … | definition | linked | Cross-Correlation: “each series' sum of squared deviations divided by $n$” |

</details>

<details><summary><code>masi-2019s-q43</code> · answerable</summary>

Tagged pages: Autoregressive Model, Random Walk, Stationarity

| Item | Kind | Status | Where |
|---|---|---|---|
| For a stationary AR(1) process x_t = α1 x_{t-1} + w_t, the lag-k autocorrelation equals α1^k. | fact | tagged | Autoregressive Model: “**AR(1)**: $\mathrm{Corr}(Y_t, Y_{t-k}) = \phi^{k}$, mean $\mu = c/(1-\phi)$, variance $\sigma^2/(1…” |
| The variance of a stationary AR(1) process is σ^2 / (1 - α1^2), where σ^2 is the white noise variance. | formula | tagged | Autoregressive Model: “**AR(1)**: $\mathrm{Corr}(Y_t, Y_{t-k}) = \phi^{k}$, mean $\mu = c/(1-\phi)$, variance $\sigma^2/(1…” |
| A negative AR(1) coefficient makes consecutive values negatively correlated, so the series alternates in sign and looks jagged; a positive … | fact | tagged | Autoregressive Model: “Negative $\phi$ gives an alternating, oscillating series” |
| As \|α1\| approaches 1 in an AR(1) process, the variance grows, swings are larger, and deviations from the mean persist longer; a small \|α… | fact | tagged | Autoregressive Model: “$\phi$ near 1 means slow mean reversion; $\phi$ near 0 means the series is nearly [[White Noise]].” |
| An AR(1) with α1 near 1 behaves almost like a random walk, wandering with almost no pull back to its mean (a random walk, α1 = 1, is non-st… | fact | tagged | Random Walk: “It is ARIMA$(0,1,0)$, the boundary case of an AR(1) at $\phi = 1$” |

</details>

<details><summary><code>masi-2019s-q44</code> · gap</summary>

Tagged pages: Deterministic and Stochastic Trend, Linear Regression, Random Walk

| Item | Kind | Status | Where |
|---|---|---|---|
| A deterministic trend is a fixed function of time (such as a line, polynomial, or sine-cosine seasonal term), typically used when there is … | definition | tagged | Deterministic and Stochastic Trend: “A **deterministic trend** is a fixed function of time that the series returns to after a shock” |
| A stochastic trend is a trend that changes direction unpredictably with no plausible physical explanation, and is modeled as a random proce… | definition | tagged | Deterministic and Stochastic Trend: “a **stochastic trend** is a unit root, where each shock permanently moves the level” |
| Deterministic trends can be modeled and fit using regression of the series on functions of time t. | fact | tagged | Deterministic and Stochastic Trend: “\\| Correct treatment \\| regress on $t$, model the residuals \\| [[Differencing\\|difference]] the ser…” |
| Short-term extrapolation of a deterministic trend can be justified because underlying trends usually change slowly relative to the forecast… | fact | missing |  |

</details>

<details><summary><code>masi-2019s-q45</code> · answerable</summary>

Tagged pages: Time Series Forecast, Autoregressive Model, White Noise

| Item | Kind | Status | Where |
|---|---|---|---|
| To forecast an AR(p) process multiple steps ahead, recursively compute one-step forecasts, replacing each future white-noise term with its … | procedure | tagged | Time Series Forecast: “**Build it recursively**: replace future shocks with 0, future observations with their forecasts, a…” |
| An AR(p) model with constant has the form x_t = delta + phi_1 x_{t-1} + ... + phi_p x_{t-p} + w_t, so the one-step forecast is delta plus t… | formula | tagged | Autoregressive Model: “$$Y_t = c + \phi_1 Y_{t-1} + \cdots + \phi_p Y_{t-p} + \varepsilon_t$$” |
| White noise is a sequence of uncorrelated random variables with mean zero and constant variance, so its expected value at any future time i… | definition | tagged | White Noise: “$$E[\varepsilon_t] = 0, \quad \mathrm{Var}(\varepsilon_t) = \sigma^{2}, \quad \mathrm{Cov}(\varepsi…” |
| For a stationary AR(p) process with constant delta, the mean is delta/(1 - sum of the coefficients), and multi-step forecasts converge towa… | fact | tagged | Autoregressive Model: “**AR(1)**: $\mathrm{Corr}(Y_t, Y_{t-k}) = \phi^{k}$, mean $\mu = c/(1-\phi)$, variance $\sigma^2/(1…” |

</details>

<details><summary><code>masii-2018f-q1</code> · untagged</summary>

Tagged pages: Likelihood Ratio Test, Restricted Maximum Likelihood, Covariance Structure, Linear Mixed Model, Variance Function, Model Output

| Item | Kind | Status | Where |
|---|---|---|---|
| The likelihood ratio test statistic is twice the difference between the maximized log-likelihoods of the larger (alternative) model and the… | formula | tagged | Likelihood Ratio Test: “$$-2\ln\Lambda = 2\left[\ell(\hat\theta) - \ell(\hat\theta_0)\right] \ \dot\sim\ \chi^2_{r}$$” |
| Under the null hypothesis, the likelihood ratio statistic is approximately chi-square distributed with degrees of freedom equal to the numb… | fact | tagged | Likelihood Ratio Test: “$r$ is the number of **restrictions** — the difference in free parameters between the full and redu…” |
| A model is nested in another if it is obtained by restricting parameters of the larger model to fixed values; a likelihood ratio test appli… | definition | tagged | Likelihood Ratio Test: “Models must be **nested** and fitted to the *same* data; comparing non-nested models needs [[AIC]] …” |
| When comparing models that differ only in variance/covariance structure (same fixed effects), REML log-likelihoods may be used for the like… | fact | tagged | Restricted Maximum Likelihood: “compare models differing in their *random* part (or covariance structure) with REML; compare models…” |
| Count the extra parameters of a variance function with different standard deviations per stratum: the reference stratum is fixed at 1 and e… | procedure | tagged | Variance Function (collapsed): “The heterogeneous model has $2$ extra variance parameters.” |
| Find the significance level by comparing the test statistic to chi-square critical values (e.g., 3.841 at 5% and 5.024 at 2.5% for 1 degree… | procedure | elsewhere | Critical Value: “The statistic is beyond the critical value exactly when the p-value is below $\alpha$.” |
| The ordinary chi-square reference distribution applies to the LRT when the null value of the tested parameter lies in the interior of the p… | fact | tagged | Model Output: “A test that a single variance component is zero sits on the boundary of its range: the reference di…” |

</details>

<details><summary><code>masii-2018f-q10</code> · gap</summary>

Tagged pages: Likelihood Ratio Test, Linear Mixed Model, Hypothesis Testing, Fixed Effects

| Item | Kind | Status | Where |
|---|---|---|---|
| Likelihood ratio tests can be used to test hypotheses about both fixed-effect parameters and covariance parameters in a Linear Mixed Model. | fact | tagged | Linear Mixed Model: “Two covariance structures with the same fixed effects can be compared by a likelihood ratio test on…” |
| A t-test can be used to test a hypothesis about a single fixed-effect parameter in a Linear Mixed Model. | fact | missing |  |
| Type I (sequential) and Type III (conditional) F-tests can be used to test linear hypotheses involving multiple fixed effects in a Linear M… | fact | missing |  |
| An omnibus Wald test tests a general linear hypothesis H0: Lβ = 0 about the fixed effects using a chi-square statistic. | definition | missing |  |
| A Wald z-test for a covariance (variance) parameter is not recommended because the normal approximation requires very large samples for ske… | fact | missing |  |
| When testing a variance parameter at the boundary of the parameter space (such as whether a variance is 0), the likelihood ratio statistic … | fact | elsewhere | Model Selection: “A test that a variance component is zero puts the null hypothesis on the boundary of the parameter …” |

</details>

<details><summary><code>masii-2018f-q11</code> · gap</summary>

Tagged pages: Restricted Maximum Likelihood, Maximum Likelihood Estimation, Linear Mixed Model, Fixed Effects

| Item | Kind | Status | Where |
|---|---|---|---|
| Maximum likelihood estimation of a linear mixed model maximizes the full likelihood jointly over the fixed-effect coefficients and the cova… | definition | tagged | Restricted Maximum Likelihood: “estimates the [[Variance Components\\|variance components]] of a [[Linear Mixed Model]] from the par…” |
| ML estimates of the covariance (variance) parameters in a linear mixed model are biased downward because they ignore the degrees of freedom… | fact | tagged | Restricted Maximum Likelihood: “ML treats $\hat{\boldsymbol\beta}$ as known when estimating variances and so **ignores the $p$ degr…” |
| The estimated variance of the generalized least squares estimator of the fixed effects is (X' V-hat^{-1} X)^{-1}, which plugs in the estima… | formula | missing |  |
| Because the variance of the fixed-effect estimates ignores the uncertainty in estimating the covariance parameters, it is biased (understat… | fact | missing |  |

</details>

<details><summary><code>masii-2018f-q12</code> · gap</summary>

Tagged pages: Random Intercept and Slope, Linear Mixed Model, Random Effects, Interaction

| Item | Kind | Status | Where |
|---|---|---|---|
| In a linear mixed model with repeated measures per subject, a random coefficient on a covariate can only be identified if that covariate va… | fact | missing |  |
| A random intercept is a subject-specific random shift in the baseline level of the response, and a random slope is a subject-specific rando… | definition | tagged | Random Intercept and Slope: “A **random intercept** lets each group have its own baseline; a **random slope** lets each group ha…” |
| A time-invariant subject characteristic such as sex can enter a linear mixed model as a fixed effect but not as a random effect when each s… | fact | missing |  |
| An interaction between a time-invariant covariate and a time-varying covariate (e.g., sex × age) is, within a subject, either zero or a cop… | fact | missing |  |
| To choose the specification with the most random effects, include the random intercept plus random coefficients only for covariates (or ter… | procedure | missing |  |

</details>

<details><summary><code>masii-2018f-q13</code> · answerable</summary>

Tagged pages: Intraclass Correlation, Hierarchical Model, Linear Mixed Model, Covariance Structure, Variance Components, Nested and Crossed Factors

| Item | Kind | Status | Where |
|---|---|---|---|
| In a three-level hierarchical linear mixed model with random effects for clusters and nested subclusters, the marginal covariance between t… | fact | tagged | Nested and Crossed Factors: “In a nested ([[Hierarchical Model\\|hierarchical]]) model, two claims from the same adjuster share $…” |
| The marginal variance of a single observation in a multilevel model equals the sum of all random-effect variances at every level plus the r… | fact | tagged | Variance Components (collapsed): “$$\mathrm{Var}(y_{ij}) = \sigma_b^{2} + \sigma^{2} = 250 + 1{,}000 = 1{,}250$$” |
| The intraclass correlation coefficient for observations sharing a given grouping level is the correlation between two observations in the s… | definition | tagged | Intraclass Correlation: “The **intraclass correlation (ICC)** is the share of total variance in a [[Linear Mixed Model]] tha…” |
| To compute the ICC for a lower grouping level (e.g., same doctor) in a nested model, use the covariance for two observations sharing that l… | procedure | tagged | Nested and Crossed Factors: “In a nested ([[Hierarchical Model\\|hierarchical]]) model, two claims from the same adjuster share $…” |

</details>

<details><summary><code>masii-2018f-q14</code> · answerable</summary>

Tagged pages: Linear Mixed Model, Random Effects, Fixed Effects, Variance Components

| Item | Kind | Status | Where |
|---|---|---|---|
| A random-intercept (linear mixed effects) model combines fixed effects with a random group-level effect added to the intercept, so each gro… | definition | linked | Hierarchical Model: “$u_j$ is the **random intercept** for group $j$ — the group-level deviation from the population mean” |
| In a linear mixed model, the parameters to be estimated are the fixed-effect coefficients (including the intercept) and the variance compon… | fact | tagged | Random Effects: “A random effect costs **one variance parameter**, not one coefficient per level” |
| A fixed-effect coefficient is the same for all individuals and groups; only a random slope term would let a coefficient vary across groups … | fact | tagged | Linear Mixed Model: “**fixed effects** (parameters that apply to the entire population) and **random effects** (paramete…” |
| The variance of the group-level random effect measures variance between groups, while the residual variance measures variance of individual… | definition | tagged | Linear Mixed Model (collapsed): “$\sigma_u^2$ is the **between-policyholder variance** — how much policyholders differ in their base…” |

</details>

<details><summary><code>masii-2018f-q15</code> · gap</summary>

Tagged pages: Hierarchical Model, Linear Mixed Model, Random Effects, Random Intercept and Slope

| Item | Kind | Status | Where |
|---|---|---|---|
| To convert a two-level hierarchical (multilevel) model to its equivalent single-equation linear mixed model, substitute the Level 2 equatio… | procedure | missing |  |
| In a hierarchical model, each level's equation includes only covariates measured at that level; group-level (e.g., classroom) covariates en… | fact | missing |  |
| A random intercept model lets the intercept vary by group as b_0j = (fixed part) + u_j, where u_j is a group-level random effect with mean … | definition | tagged | Hierarchical Model: “$u_j$ is the **random intercept** for group $j$ — the group-level deviation from the population mean” |
| The group random effect u_j should appear only once in the hierarchical specification (in the Level 2 intercept equation); including it in … | fact | missing |  |

</details>

<details><summary><code>masii-2018f-q16</code> · answerable</summary>

Tagged pages: Bayesian, Markov Chain, Exponential Distribution, Markov Chain Monte Carlo

| Item | Kind | Status | Where |
|---|---|---|---|
| In the Metropolis algorithm, each iteration forms a proposal by adding the step to the current position, computes the acceptance ratio of t… | procedure | tagged | Markov Chain Monte Carlo: “Draw $U$ from uniform$(0,1)$. If $U < R$, set $y_t = y^*$; otherwise $y_t = y_{t-1}$.” |
| The Metropolis acceptance ratio uses only the unnormalized posterior, because the unknown normalizing constant cancels in the ratio of post… | fact | tagged | Markov Chain Monte Carlo: “The normalising constant of Bayes' theorem cancels, which is why the posterior never has to be comp…” |
| A proposal with a ratio of 1 or greater (higher posterior density than the current position) is always accepted, since the ratio exceeds an… | fact | tagged | Markov Chain Monte Carlo (collapsed): “$R > 1$, so the candidate is accepted whatever $U$ is: $\mu_t = 7.9$.” |
| A proposal outside the support of the posterior has unnormalized density zero, giving an acceptance ratio of zero, so it is rejected and th… | fact | tagged | Markov Chain Monte Carlo: “Draw $U$ from uniform$(0,1)$. If $U < R$, set $y_t = y^*$; otherwise $y_t = y_{t-1}$.” |

</details>

<details><summary><code>masii-2018f-q17</code> · gap</summary>

Tagged pages: Bayesian, Autocorrelation Function, Markov Chain, Markov Chain Monte Carlo

| Item | Kind | Status | Where |
|---|---|---|---|
| The effective sample size of an MCMC chain with N retained draws is ESS = N / (1 + 2 * sum over k>=1 of rho_k), where rho_k is the autocorr… | formula | missing |  |
| Autocorrelation at lag k is the correlation between values of the chain separated by k iterations; positive autocorrelation means successiv… | definition | tagged | Autocorrelation Function: “The **autocorrelation function (ACF)** gives the correlation between a [[Time Series]] and itself $…” |
| Discard the warm-up (burn-in) fraction of the chain before analysis, so N in the effective sample size is the total chain length times (1 m… | procedure | tagged | Markov Chain Monte Carlo: “a *burn-in* phase run until the chain reaches the posterior, and a *sampling* phase whose draws are…” |
| In the ESS sum, include autocorrelations over all lags provided; lags where autocorrelation is just noise around zero contribute negligibly… | procedure | missing |  |

</details>

<details><summary><code>masii-2018f-q18</code> · gap</summary>

Tagged pages: Bayesian, Markov Chain, Markov Chain Monte Carlo

| Item | Kind | Status | Where |
|---|---|---|---|
| The Monte Carlo error of a posterior mean estimate shrinks in proportion to 1/sqrt(effective sample size), so a modest number of effective … | fact | missing |  |
| Posterior tail quantities (extreme percentiles, ends of wide intervals) are visited rarely by the sampler and require many more effective s… | fact | missing |  |
| To check convergence, run several chains from dispersed starting values and compare them using the R-hat statistic. | procedure | tagged | Markov Chain Monte Carlo: “Several independent chains are run and their traces plotted. The chains should bounce around the sa…” |
| Multiple chains are a diagnostic tool, not a requirement for inference: once a model is known to sample well, a single chain suffices to ma… | fact | missing |  |
| Weakly informative priors that rule out implausible parameter values improve sampling efficiency (better mixing, fewer divergent transition… | fact | missing |  |

</details>

<details><summary><code>masii-2018f-q19</code> · gap</summary>

Tagged pages: Bayesian, Markov Chain, Autocorrelation Function, Markov Chain Monte Carlo

| Item | Kind | Status | Where |
|---|---|---|---|
| The Gelman-Rubin diagnostic (potential scale reduction factor, R-hat) compares the variance between multiple MCMC chains with the variance … | definition | tagged | Markov Chain Monte Carlo: “The potential scale reduction factor compares between-chain variability $B$ with within-chain varia…” |
| An R-hat value close to 1 indicates that multiple chains have converged to a common distribution, while a value noticeably above 1 indicate… | fact | tagged | Markov Chain Monte Carlo: “It approaches 1 as the chains converge.” |
| Autocorrelation within a single chain is assessed with the autocorrelation function and effective sample size, not with the Gelman-Rubin di… | fact | tagged | Markov Chain Monte Carlo: “**Thinning.** Keeping every $k$-th draw reduces autocorrelation when tuning alone cannot.” |
| The Gelman-Rubin diagnostic requires at least two chains to be computed but does not indicate whether enough chains have been run; it only … | fact | missing |  |

</details>

<details><summary><code>masii-2018f-q2</code> · gap</summary>

Tagged pages: Likelihood Ratio Test, Restricted Maximum Likelihood, Fixed Effects, Linear Mixed Model, Maximum Likelihood Estimation, Model Output

| Item | Kind | Status | Where |
|---|---|---|---|
| A likelihood ratio test compares nested models by computing the statistic 2 times the difference in maximized log-likelihoods (larger model… | procedure | tagged | Likelihood Ratio Test: “$$-2\ln\Lambda = 2\left[\ell(\hat\theta) - \ell(\hat\theta_0)\right] \ \dot\sim\ \chi^2_{r}$$” |
| Under the null hypothesis that the restricted model is adequate, the likelihood ratio statistic follows a chi-square distribution with degr… | fact | tagged | Likelihood Ratio Test: “$r$ is the number of **restrictions** — the difference in free parameters between the full and redu…” |
| A model that pools or groups categories (equal coefficients for several levels) is nested within the model that estimates a separate coeffi… | fact | missing |  |
| When models differ in their fixed effects, they must be compared using maximum likelihood fits rather than REML, because REML likelihoods d… | fact | tagged | Restricted Maximum Likelihood: “compare models differing in their *random* part (or covariance structure) with REML; compare models…” |
| Count the parameters of a mixed model fixed-effects part as the intercept plus one coefficient per non-baseline level of each categorical f… | procedure | tagged | Fixed Effects: “Each fixed effect costs **one parameter per level** (less the baseline), so a factor with many leve…” |
| Reject the null hypothesis at a significance level if the test statistic exceeds the chi-square critical value (equivalently the p-value is… | procedure | tagged | Likelihood Ratio Test: “Reject $H_0$ (the reduced model) when $-2\ln\Lambda$ exceeds the upper-$\alpha$ point of $\chi^2_r$…” |

</details>

<details><summary><code>masii-2018f-q20</code> · gap</summary>

Tagged pages: Bayesian, Markov Chain, Autocorrelation Function, Markov Chain Monte Carlo

| Item | Kind | Status | Where |
|---|---|---|---|
| A healthy MCMC trace plot looks like a 'fuzzy caterpillar', with the chain moving rapidly around a stable level so that any window of itera… | fact | tagged | Markov Chain Monte Carlo: “Several independent chains are run and their traces plotted. The chains should bounce around the sa…” |
| A trace plot that drifts in long, slow excursions with each draw close to the previous one indicates high autocorrelation in the chain. | fact | missing |  |
| High autocorrelation reduces the effective sample size, so the draws carry less information than the same number of independent samples. | fact | missing |  |
| When a chain shows high autocorrelation, remedy it by running many more iterations so enough effectively independent draws accumulate to ma… | procedure | missing |  |
| Autocorrelation is a property of how the sampler moves through the posterior, so it is addressed by changing the sampling or run length, no… | fact | tagged | Markov Chain Monte Carlo: “**Thinning.** Keeping every $k$-th draw reduces autocorrelation when tuning alone cannot.” |

</details>

<details><summary><code>masii-2018f-q21</code> · gap</summary>

Tagged pages: Entropy, AIC, Bayesian

| Item | Kind | Status | Where |
|---|---|---|---|
| The Kullback-Leibler divergence measures the extra uncertainty (information loss) from using a model distribution q to describe events that… | definition | missing |  |
| The KL divergence of model q from true distribution p for a discrete distribution is D_KL(p, q) = sum_i p_i ln(p_i / q_i), the expected log… | formula | missing |  |
| KL divergence is not symmetric, so the order of p and q matters: weighting by q instead of the true distribution p gives a different value. | fact | missing |  |
| Information criteria such as AIC and WAIC are designed to estimate the KL divergence (distance) between the model and the true distribution. | fact | tagged | AIC: “Derived from an information-theoretic perspective (Kullback–Leibler divergence)” |

</details>

<details><summary><code>masii-2018f-q22</code> · gap</summary>

Tagged pages: AIC, Bayesian, Model Selection

| Item | Kind | Status | Where |
|---|---|---|---|
| The Akaike weight of a model is the model's relative likelihood of making the best out-of-sample predictions among the candidate set, obtai… | definition | missing |  |
| The Akaike weight of model i is w_i = exp(-0.5*dWAIC_i) / sum over j of exp(-0.5*dWAIC_j), where dWAIC_i = WAIC_i minus the minimum WAIC am… | formula | missing |  |
| WAIC already includes a penalty of 2 times the effective number of parameters (p_WAIC), so models are compared directly on WAIC and p_WAIC … | fact | missing |  |

</details>

<details><summary><code>masii-2018f-q23</code> · gap</summary>

Tagged pages: Multicollinearity, Bayesian, Linear Regression, Correlation

| Item | Kind | Status | Where |
|---|---|---|---|
| Multicollinearity is a strong linear relationship among predictor variables, so the data can determine their combined effect but cannot sep… | definition | tagged | Multicollinearity: “the data cannot say which of two nearly interchangeable variables is doing the work, so each coeffi…” |
| In a Bayesian regression with multicollinear predictors, the marginal posteriors of the individual coefficients are wide (intervals may inc… | fact | missing |  |
| Diagnose multicollinearity from posterior plots by checking for wide marginal intervals, a thin ridge in the joint posterior of two coeffic… | procedure | missing |  |
| If two predictors are strongly positively correlated (x1 ≈ x2), only the sum of their coefficients is identified, so the posterior of the c… | fact | missing |  |
| If two predictors are strongly negatively correlated (x1 ≈ -x2), only the difference of their coefficients is identified, so the posterior … | fact | missing |  |
| Correlation between coefficients in the posterior is a symptom of multicollinearity, not a property of the data; the data property is the c… | fact | missing |  |

</details>

<details><summary><code>masii-2018f-q24</code> · gap</summary>

Tagged pages: AIC, Poisson Distribution, Bayesian, Deviance

| Item | Kind | Status | Where |
|---|---|---|---|
| The contribution of observation i to WAIC is -2 times (lppd_i minus p_WAIC,i), i.e. WAIC_i = -2(lppd_i - p_WAIC,i). | formula | missing |  |
| The log pointwise predictive density for observation i is the natural log of the average, over the S posterior samples, of the likelihood p… | formula | missing |  |
| The Poisson probability mass function with mean lambda is P(Y=y) = e^{-lambda} lambda^y / y!, which is the likelihood of an observation y g… | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| The effective number of parameters p_WAIC for an observation is the sample variance of its log-likelihood values across posterior samples, … | fact | missing |  |

</details>

<details><summary><code>masii-2018f-q25</code> · gap</summary>

Tagged pages: AIC, Deviance, Bayesian

| Item | Kind | Status | Where |
|---|---|---|---|
| DIC equals the posterior mean deviance plus the effective number of parameters, DIC = D̄ + p_D, where p_D = D̄ − D(θ̄) and D = −2 × log-lik… | formula | missing |  |
| Lower DIC values indicate a better model (better expected out-of-sample fit), as with AIC, because DIC is on the deviance scale. | fact | missing |  |
| The p_D term in DIC is a penalty for model complexity, measuring the effective number of parameters. | fact | missing |  |
| DIC is a Bayesian analogue of AIC: with flat priors and an approximately normal posterior it is close to AIC, but an informative prior redu… | fact | missing |  |

</details>

<details><summary><code>masii-2018f-q26</code> · gap</summary>

Tagged pages: Bayesian, Probability Density Function (PDF), Percentile, Confidence Interval, Posterior Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The p% highest posterior density interval (HPDI) is the narrowest interval containing p% of the posterior probability, such that every poin… | definition | missing |  |
| A highest posterior density interval contains the posterior mode and extends further toward the side where the density falls off more slowl… | fact | missing |  |
| A probability density function must integrate to 1 over its support, so an unknown height scale of a piecewise-linear density is found by s… | fact | tagged | Probability Density Function (PDF): “The PDF must satisfy $f(x) \geq 0$ and $\int_{-\infty}^{\infty} f(x)\, dx = 1$” |
| The probability over an interval is the area under the density across that interval, computed for a piecewise-linear density as sums of tra… | procedure | tagged | Probability Density Function (PDF): “The probability that $X$ falls in an interval $[a, b]$ is the area under $f$ over that interval.” |
| To identify the HPDI among candidate regions, eliminate regions that exclude higher-density points than they include (e.g., omit the mode o… | procedure | missing |  |

</details>

<details><summary><code>masii-2018f-q27</code> · gap</summary>

Tagged pages: Predictive Distribution, Poisson Distribution, Bayesian

| Item | Kind | Status | Where |
|---|---|---|---|
| The posterior predictive distribution of a new observation is the distribution of X obtained by averaging the model's conditional distribut… | definition | tagged | Predictive Distribution: “$$f(x_{n+1} \mid \mathbf{x}) = \int f(x_{n+1} \mid \theta)\, \pi(\theta \mid \mathbf{x})\, d\theta$$” |
| To simulate from the posterior predictive distribution, first draw parameter values from the posterior distribution, then draw each new obs… | procedure | tagged | Predictive Distribution: “A Bayesian MCMC model gives a sample of 10,000 parameter vectors from the posterior distribution. F…” |
| Estimate the probability of an event under a simulated distribution by the proportion of simulated values that fall in the event. | procedure | linked | Markov Chain Monte Carlo: “An outcome's percentile is the share of simulated totals at or below it” |
| In R, rpois(n, lambda) with a vector lambda draws each Poisson value using the corresponding element of the vector as its mean, so the outp… | fact | missing |  |

</details>

<details><summary><code>masii-2018f-q28</code> · gap</summary>

Tagged pages: Bayesian, Bayes Theorem, Uniform Continuous Distribution, Posterior Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The posterior density is proportional to the likelihood times the prior density: p(theta \| y) ∝ p(y \| theta) p(theta). | fact | tagged | Posterior Distribution: “$$\pi(\theta \mid \mathbf{x}) \propto \pi(\theta)\prod_{i=1}^{n} f(x_i \mid \theta)$$” |
| The posterior density must be zero wherever the prior density is zero, so a posterior cannot place mass outside the support of the prior. | fact | elsewhere | Bayesian Estimation (collapsed): “When the model's support depends on $\theta$, as for the uniform, the likelihood is 0 below the lar…” |
| A flat (uniform) prior is constant over its support, so the posterior is proportional to the likelihood there and has its peak where the li… | fact | missing |  |
| A posterior cannot be concentrated in a region where the likelihood is essentially zero, since the posterior is the likelihood reweighted b… | fact | tagged | Bayesian: “the [[Conditional Probability\\|likelihood]] reweights it by how well each hypothesis explains the e…” |

</details>

<details><summary><code>masii-2018f-q29</code> · gap</summary>

Tagged pages: Hierarchical Model, Bayesian, Random Effects

| Item | Kind | Status | Where |
|---|---|---|---|
| Partial pooling in a multilevel model gives each cluster an estimate that borrows strength from the other clusters, shrinking toward the po… | definition | tagged | Random Effects: “Unlike [[Fixed Effects\\|fixed effects]] they are treated as *draws from a distribution*, so a group…” |
| With repeated observations from the same individual, location or time, a complete-pooling model ignores the clusters and a no-pooling model… | fact | tagged | Random Effects: “Unlike [[Fixed Effects\\|fixed effects]] they are treated as *draws from a distribution*, so a group…” |
| When clusters are sampled unevenly, a multilevel model shrinks sparsely sampled clusters more toward the population mean, so they are not o… | fact | tagged | Random Effects (collapsed): “Same raw deviation, very different predictions — the model trusts nine observations five times as m…” |
| Averaging data within clusters before fitting a single-level model discards variation and creates false confidence, whereas a multilevel mo… | fact | missing |  |

</details>

<details><summary><code>masii-2018f-q3</code> · gap</summary>

Tagged pages: Bühlmann Credibility, Expected Value of Process Variance, Variance of Hypothetical Means, Aggregate Loss Model

| Item | Kind | Status | Where |
|---|---|---|---|
| For a compound Poisson aggregate loss with Poisson mean λ and severity X, the mean is λE[X] and the variance is λE[X^2]. | formula | tagged | Aggregate Loss Model: “When $N \sim \text{Poi}(\lambda)$: $\text{Var}(S) = \lambda \cdot E[X^2]$ (simplification since $\t…” |
| For a uniform distribution on (a, b), E[X] = (a+b)/2 and E[X^2] = (a^2+ab+b^2)/3. | formula | elsewhere | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The expected value of process variance (EPV) is the expectation over risk classes of the conditional variance of the loss given the class, … | definition | tagged | Expected Value of Process Variance: “$$v = \mathrm{EPV} = E_\Theta\!\left[\mathrm{Var}(X \mid \Theta)\right]$$” |
| The variance of the hypothetical means (VHM) equals the probability-weighted mean of the squared hypothetical means minus the square of the… | formula | missing |  |
| The Bühlmann credibility factor is Z = n/(n+k), where k = EPV/VHM and n is the number of years of experience. | formula | tagged | Bühlmann Credibility: “$$Z = \frac{n}{n + k}, \quad k = \frac{v}{a}$$” |
| When the risk class is unknown, compute EPV and the overall mean by weighting each class's process variance and hypothetical mean by the cl… | procedure | tagged | Expected Value of Process Variance (collapsed): “$$v = E[\lambda] = 0.5(0.10) + 0.5(0.40) = 0.25$$” |

</details>

<details><summary><code>masii-2018f-q30</code> · gap</summary>

Tagged pages: Bayesian, Markov Chain, Restricted Maximum Likelihood, Markov Chain Monte Carlo

| Item | Kind | Status | Where |
|---|---|---|---|
| Gibbs sampling is an MCMC algorithm that draws each parameter in turn from its full conditional posterior distribution, producing a chain t… | fact | missing |  |
| Metropolis-Hastings proposes a candidate move from a proposal distribution and accepts it with probability based on the ratio of posterior … | procedure | tagged | Markov Chain Monte Carlo: “- Draw a candidate $y^*$ from $J(\,\cdot \mid y_{t-1})$.” |
| Gibbs sampling is a special case of the Metropolis-Hastings algorithm, and both are general MCMC methods for sampling from posterior distri… | fact | missing |  |
| Restricted maximum likelihood (REML) is a frequentist method that estimates variance components of a linear mixed model by maximizing the l… | definition | tagged | Restricted Maximum Likelihood: “estimates the [[Variance Components\\|variance components]] of a [[Linear Mixed Model]] from the par…” |
| REML yields point estimates and uses no prior distribution, so it does not produce or update posterior distributions. | fact | missing |  |

</details>

<details><summary><code>masii-2018f-q31</code> · untagged</summary>

Tagged pages: Bayesian, Bayes Theorem, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| In a Bayesian model, the likelihood is the probability (density) of the observed data given the parameters, p(y \| θ), viewed as a function… | definition | linked | Bayesian Credibility: “$$\pi(\theta \mid \mathbf{X}) \propto L(\mathbf{X} \mid \theta) \cdot \pi(\theta)$$” |
| Bayes' theorem for a Bayesian model: the posterior p(θ \| y) equals the likelihood p(y \| θ) times the prior p(θ), divided by the marginal … | formula | elsewhere | Bayesian Estimation: “$$\pi(\theta \mid \mathbf{x}) = \frac{f(\mathbf{x} \mid \theta)\,\pi(\theta)}{\int f(\mathbf{x} \mi…” |
| The prior distribution p(θ) is the distribution of the parameters before observing data, and the posterior p(θ \| y) is the distribution of… | definition | elsewhere | Posterior Distribution: “The prior $\pi(\theta)$ describes how $\theta$ varies across the portfolio before this risk's own e…” |
| The marginal likelihood (evidence) p(y) is the unconditional density of the data, obtained by integrating the joint distribution over the p… | definition | elsewhere | Posterior Distribution: “The denominator is the marginal probability of the data; it only normalises.” |
| The joint distribution of data and parameters p(y, θ) equals the likelihood times the prior. | fact | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |

</details>

<details><summary><code>masii-2018f-q32</code> · gap</summary>

Tagged pages: Bayesian, Linear Regression, Interaction, Normal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| In a Bayesian model specification, a parameter is an unobserved quantity to be estimated, and it is assigned a prior distribution. | definition | elsewhere | Bayesian Estimation: “treats an unknown parameter $\theta$ as a random variable with a prior distribution $\pi(\theta)$” |
| Quantities defined with a deterministic equality (such as the linear predictor mu or a slope defined as a function of other parameters and … | fact | missing |  |
| Observed response values and covariates (predictors) are data, not parameters. | fact | elsewhere | Response Variable: “The **response variable** — also the dependent variable, target or outcome — is the quantity $Y$ a …” |
| A prior placed on a transformation of a parameter (such as ln of the standard deviation) still describes a single unknown parameter, so it … | fact | missing |  |
| When a regression slope is expressed as a linear function of another predictor (an interaction), the number of parameters equals the coeffi… | fact | missing |  |

</details>

<details><summary><code>masii-2018f-q33</code> · gap</summary>

Tagged pages: Bayesian, Predictive Distribution, AIC

| Item | Kind | Status | Where |
|---|---|---|---|
| Model averaging combines several candidate models by averaging (mixing) their predictions or posterior predictive distributions, often weig… | definition | missing |  |
| Model weights for averaging can be built from information criteria such as AIC or WAIC, giving more weight to models with better estimated … | formula | missing |  |
| Parameters of different models are not directly comparable because the same-named parameter has a different meaning depending on which othe… | fact | missing |  |
| Selecting only the best-performing model is model selection, not model averaging; it discards information about uncertainty over which mode… | fact | missing |  |

</details>

<details><summary><code>masii-2018f-q34</code> · gap</summary>

Tagged pages: Bayesian, Markov Chain, Beta, Uniform Continuous Distribution, Markov Chain Monte Carlo

| Item | Kind | Status | Where |
|---|---|---|---|
| The Metropolis algorithm requires a symmetric proposal distribution, meaning the probability of proposing a jump from one value to another … | fact | tagged | Markov Chain Monte Carlo: “With a symmetric proposal the second factor is 1.” |
| In the Metropolis algorithm, a proposed value is accepted with probability min(1, posterior density at the proposed value divided by poster… | formula | tagged | Markov Chain Monte Carlo: “Draw $U$ from uniform$(0,1)$. If $U < R$, set $y_t = y^*$; otherwise $y_t = y_{t-1}$.” |
| A proposal distribution supported only on positive values, when added to the current position, only moves the sampler upward, so it is not … | fact | missing |  |
| A uniform distribution centered at zero (e.g., uniform(-c, c)) added to the current position gives a symmetric random-walk proposal, since … | fact | missing |  |
| A proposed value outside the parameter's support has posterior density zero, so its acceptance probability is zero and it is rejected. | fact | missing |  |
| A beta(a, b) prior combined with a binomial likelihood of x successes in n trials gives a beta(a + x, b + n - x) posterior. | fact | elsewhere | Conjugate Prior: “\\| Bernoulli / Binomial \\| Beta$(a, b)$ \\| Beta$\left(a + \sum x_i,\; b + n - \sum x_i\right)$ \\| $…” |

</details>

<details><summary><code>masii-2018f-q35</code> · gap</summary>

Tagged pages: Bayesian, Percentile, Poisson Regression, Posterior Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A posterior (credible) interval is an interval containing a stated probability mass of the posterior distribution, estimated from posterior… | definition | tagged | Percentile: “Percentiles describe tail behavior and underlie actuarial risk measures such as Value at Risk (VaR)…” |
| To form an equal-tailed posterior interval of level p from n ordered samples, drop n(1-p)/2 samples from each tail, so the interval runs fr… | procedure | missing |  |
| Samples from each posterior column that are sorted independently lose their draw-by-draw pairing, so quantiles of a sum of parameters canno… | fact | missing |  |
| To get the posterior interval of a function of parameters (such as a sum), compute the function for each joint posterior draw, sort the res… | procedure | missing |  |

</details>

<details><summary><code>masii-2018f-q36</code> · untagged</summary>

Tagged pages: K-Nearest Neighbors, Supervised Learning

| Item | Kind | Status | Where |
|---|---|---|---|
| To classify a point with K-nearest neighbors, find the K training observations closest to the point (by distance, e.g. Euclidean) and predi… | procedure | tagged | K-Nearest Neighbors: “$\hat{P}(Y = j \mid x_0) = \frac{1}{K}\sum_{i \in \mathcal{N}_K(x_0)} \mathbf{1}(y_i = j)$, predict…” |
| In K-nearest neighbors, K is the number of nearest training observations used in the vote, and K=1 assigns the class of the single closest … | definition | tagged | K-Nearest Neighbors: “$\mathcal{N}_K(x_0)$ is the **neighborhood** of the $K$ nearest training points to $x_0$” |
| Euclidean distance between two points is the square root of the sum of squared differences in each predictor coordinate, and it is used to … | definition | elsewhere | Similarity and Distance Measures: “$$d_{\text{Euc}}(\mathbf{u}, \mathbf{v}) = \sqrt{\sum_{j=1}^{p} (u_j - v_j)^2}$$” |

</details>

<details><summary><code>masii-2018f-q37</code> · gap</summary>

Tagged pages: K-Nearest Neighbors, Bias-Variance Tradeoff, Holdout Sample, Test Error

| Item | Kind | Status | Where |
|---|---|---|---|
| K-Nearest Neighbors predicts a point's class as the majority class among its k closest training points (or the average response for regress… | definition | tagged | K-Nearest Neighbors: “$\hat{P}(Y = j \mid x_0) = \frac{1}{K}\sum_{i \in \mathcal{N}_K(x_0)} \mathbf{1}(y_i = j)$, predict…” |
| Increasing k in KNN makes the fit smoother and less flexible (lower variance, higher bias), while small k gives a flexible, high-variance f… | fact | tagged | K-Nearest Neighbors: “small $K$ = low bias, high variance (flexible); large $K$ = high bias, low variance (smooth)” |
| When k equals the size of the training set, every point's neighborhood is the entire training set, so KNN predicts the same class (the most… | fact | missing |  |
| The test error rate is the proportion of held-out test observations that the model misclassifies. | definition | tagged | Test Error: “$$\text{Test error rate} = \text{Ave}\left(I(y_0 \neq \hat{y}_0)\right)$$” |
| A classifier that predicts one class for all points has an error rate of about 1 minus that class's proportion, which is about 2/3 when thr… | fact | elsewhere | Model Training and Evaluation (collapsed): “Flagging nothing would be right on all 704 legitimate claims, for an accuracy of $704 / 813 = 0.866$” |

</details>

<details><summary><code>masii-2018f-q38</code> · gap</summary>

Tagged pages: Tree Pruning, Decision Tree

| Item | Kind | Status | Where |
|---|---|---|---|
| Cost complexity pruning selects the subtree T that minimizes RSS(T) + alpha*\|T\|, where \|T\| is the number of terminal nodes and alpha is… | formula | tagged | Tree Pruning: “$$\sum_{m=1}^{\lvert T\rvert} \sum_{x_i \in R_m}\left(y_i - \hat{y}_{R_m}\right)^{2} + \alpha\,\lve…” |
| The residual sum of squares of a regression tree is the sum over terminal nodes of the squared deviations of observations from their node's… | definition | elsewhere | Regression Tree: “$$\text{RSS} = \sum_{j=1}^{J}\sum_{i \in R_j}\left(y_i - \hat{y}_{R_j}\right)^2$$” |
| Pruning a tree at an internal node collapses the entire subtree below it into a single terminal node, whose RSS replaces the RSS of the sub… | procedure | missing |  |
| Pruning a subtree always increases (or does not decrease) RSS, and it is worthwhile under cost complexity pruning only if the RSS increase … | fact | elsewhere | Regression Tree: “a larger $\alpha$ gives a smaller tree, because a split that adds one leaf survives only if it redu…” |

</details>

<details><summary><code>masii-2018f-q39</code> · answerable</summary>

Tagged pages: Tree Ensemble, Bagging, Random Forest, Boosting

| Item | Kind | Status | Where |
|---|---|---|---|
| In bagging and random forests, trees are grown independently on bootstrap samples and averaged, so adding more trees does not cause overfit… | fact | tagged | Bagging: “$B$ is **not** a tuning parameter: error flattens as $B$ grows and never increases, so $B$ is set b…” |
| A random forest considers only a random subset of predictors at each split, which decorrelates the trees so that averaging reduces variance… | fact | tagged | Random Forest: “at *each split*, only a random subset of $m$ predictors is eligible. That decorrelates the trees, s…” |
| Boosting grows trees sequentially, fitting each small tree to the residuals of the current model and adding it with a shrinkage factor, so … | definition | tagged | Boosting: “**Boosting** grows trees *sequentially*, each one fitted to the residuals left by the trees before …” |
| Because boosting learns slowly, its test error keeps declining gradually over many trees and can end below the error of bagging and random … | fact | tagged | Bagging: “$B$ is **not** a tuning parameter: error flattens as $B$ grows and never increases, so $B$ is set b…” |

</details>

<details><summary><code>masii-2018f-q4</code> · answerable</summary>

Tagged pages: Bühlmann Credibility, Expected Value of Process Variance, Variance of Hypothetical Means, Pure Premium, Complement of Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected process variance (EPV) is the expected value of the within-risk (here within-region) variance of the losses, and the variance … | definition | tagged | Bühlmann Credibility: “\\| $v = E[\sigma^2(\theta)]$ \\| Expected process variance \\| Expected within-risk variance \\|” |
| The Bühlmann credibility parameter is k = EPV / VHM. | formula | tagged | Bühlmann Credibility: “$$Z = \frac{n}{n + k}, \quad k = \frac{v}{a}$$” |
| Bühlmann credibility is Z = n / (n + k), where n is the number of exposures (observations) for the risk. | formula | tagged | Bühlmann Credibility: “$$Z = \frac{n}{n + k}, \quad k = \frac{v}{a}$$” |
| The credibility-weighted estimate is Z times the risk's own observed mean plus (1 − Z) times the complement of credibility (prior or overal… | formula | tagged | Bühlmann Credibility: “$$\text{Estimate} = Z \cdot \bar{X} + (1-Z) \cdot \mu$$” |
| When the risk's losses are identically distributed per policy, the number of policies serves as the exposure count n, and the overall (coun… | procedure | tagged | Complement of Credibility: “**Loss costs of a larger group that includes the group being rated** — e.g. all states in the regio…” |

</details>

<details><summary><code>masii-2018f-q40</code> · gap</summary>

Tagged pages: Gini Index, Entropy, Decision Tree, Node Impurity

| Item | Kind | Status | Where |
|---|---|---|---|
| To evaluate a classification tree on a data set, route each observation through the tree's split rules to its terminal node and tally the c… | procedure | elsewhere | Classification Tree: “each observation is predicted to belong to the **most commonly occurring class** among the training…” |
| The proportion p-hat of a node is the fraction of the node's observations belonging to a given class; the node predicts the majority (most … | definition | elsewhere | Classification Tree: “$\hat{p}_{mk}$ is the proportion of training observations in region $m$ from class $k$.” |
| The classification error rate of a node is E = 1 - max over classes of p-hat_k, which for two classes is 1 - max(p, 1-p). | formula | tagged | Node Impurity: “$$E_m = 1 - \max_k \hat{p}_{mk}$$” |
| The Gini index of a node is G = sum over classes of p_k(1 - p_k), which for two classes equals 2p(1-p). | formula | tagged | Gini Index: “For **binary classification** ($K=2$): $G = 2\hat{p}(1-\hat{p})$, maximized at $\hat{p}=0.5$ with $…” |
| The cross-entropy (deviance) of a node is D = -sum over classes of p_k ln p_k, which for two classes is -p ln p - (1-p) ln(1-p). | formula | tagged | Entropy: “For **binary classification** ($K = 2$): $D = -\hat{p}\log\hat{p} - (1-\hat{p})\log(1-\hat{p})$, ma…” |
| For a given node, cross-entropy is at least the Gini index, which is at least the classification error rate, with all three equal at zero f… | fact | missing |  |

</details>

<details><summary><code>masii-2018f-q41</code> · gap</summary>

Tagged pages: Proportion of Variance Explained, Principal Components Analysis, Loading Vector

| Item | Kind | Status | Where |
|---|---|---|---|
| The principal component score of an observation is the linear combination of its (centered) variables using the loading vector as weights: … | definition | tagged | Loading Vector: “$$z_{im} = \phi_{1m}x_{i1} + \phi_{2m}x_{i2} + \cdots + \phi_{pm}x_{ip}$$” |
| The proportion of variance explained by the m-th principal component equals the sum of squared m-th component scores divided by the total s… | formula | missing |  |
| When the data are centered (column means zero), the total variance is the sum of squares of all entries, and any common 1/n or 1/(n-1) fact… | fact | missing |  |
| Data that are normalized and scaled to unit variance have the same column sum of squares for every variable (equal to n-1 under sample vari… | fact | tagged | Proportion of Variance Explained: “On **standardized** data $\sum_j \lambda_j = p$, so $\mathrm{PVE}_m = \lambda_m/p$” |

</details>

<details><summary><code>masii-2018f-q42</code> · answerable</summary>

Tagged pages: Hierarchical Clustering, Linkage, Dendrogram

| Item | Kind | Status | Where |
|---|---|---|---|
| Agglomerative hierarchical clustering starts with each observation as its own cluster and repeatedly fuses the two closest clusters, recomp… | procedure | tagged | Hierarchical Clustering: “Agglomerative clustering starts with every observation in its own cluster and repeatedly fuses the …” |
| Complete linkage defines the dissimilarity between two clusters as the maximum pairwise dissimilarity between an observation in one cluster… | definition | tagged | Linkage: “$$\text{complete: } \max_{i \in A,\, j \in B} d_{ij} \qquad \text{single: } \min_{i \in A,\, j \in …” |
| Euclidean distance between two one-dimensional observations is the absolute value of their difference. | definition | linked | K-Means Clustering: “**Assign**: $\\|x_1 - c_1\\| = 0 < \\|x_1 - c_2\\| = 3$ → $x_1 \in C_1$” |
| In a dendrogram, the height at which two clusters (or observations) fuse equals the inter-cluster dissimilarity between them at the time of… | fact | tagged | Dendrogram: “Each fusion is drawn as a horizontal bar at the height of the dissimilarity at which it happened, s…” |
| Single linkage defines inter-cluster dissimilarity as the minimum pairwise dissimilarity between observations in the two clusters, which ge… | definition | tagged | Linkage: “\\| **Single** \\| smallest pairwise \\| chaining: long, straggly clusters, unbalanced [[Dendrogram]] …” |

</details>

<details><summary><code>masii-2018f-q5</code> · untagged</summary>

Tagged pages: Bühlmann-Straub Credibility, Expected Value of Process Variance, Variance of Hypothetical Means, Uniform Continuous Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The overall mean (collective premium) is mu = E[mean of the hypothetical mean], i.e. the expected value of the hypothetical mean over the p… | formula | tagged | Variance of Hypothetical Means: “The overall mean is $\mu = E[\mu(\Theta)]$” |
| The expected process variance is v = E[process variance given theta], the expectation over the risk parameter of the conditional variance. | formula | tagged | Expected Value of Process Variance: “$$v = \mathrm{EPV} = E_\Theta\!\left[\mathrm{Var}(X \mid \Theta)\right]$$” |
| The variance of the hypothetical means is a = Var(hypothetical mean), the variance of the conditional mean over the risk parameter distribu… | formula | tagged | Variance of Hypothetical Means: “$$a = \mathrm{VHM} = \mathrm{Var}_\Theta\!\left(E[X \mid \Theta]\right)$$” |
| The variance of a uniform distribution on (a, b) is (b - a)^2 / 12 and its mean is (a + b)/2. | formula | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| In Bühlmann-Straub, k = v/a and the credibility factor is Z = m/(m + k), where m is the total exposure over the observed periods. | formula | tagged | Bühlmann-Straub Credibility: “$$Z = \frac{m}{m + k}$$” |
| The Bühlmann-Straub observed mean is the exposure-weighted average of per-exposure experience, i.e. total claims divided by total exposures… | procedure | tagged | Bühlmann-Straub Credibility: “$$\bar{X}_w = \frac{\sum_{i=1}^n m_i X_i}{\sum_{i=1}^n m_i}$$” |
| The credibility estimate per exposure is Z times the observed mean plus (1 - Z) times the prior mean mu. | formula | tagged | Bühlmann-Straub Credibility: “$$\text{Estimate} = Z \cdot \bar{X}_w + (1-Z) \cdot \mu$$” |
| To predict a future period's total, multiply the credibility-weighted per-exposure estimate by that period's exposure. | procedure | elsewhere | Exposure Base: “$$\text{Premium} = \text{Rate} \times \text{Exposures}$$” |

</details>

<details><summary><code>masii-2018f-q6</code> · answerable</summary>

Tagged pages: Partial Credibility, Limited Fluctuation Credibility, Full Credibility Standard, Coefficient of Variation

| Item | Kind | Status | Where |
|---|---|---|---|
| Under limited fluctuation credibility, partial credibility is Z = sqrt(n/n_F), capped at 1, where n is the observed exposure (e.g., claims)… | formula | tagged | Partial Credibility: “$$Z = \min\left(\sqrt{\frac{n}{n_F}},\; 1\right)$$” |
| The base full-credibility standard for expected claim frequency is lambda_0 = (z_{(1+p)/2}/k)^2, where p is the coverage probability and k … | formula | tagged | Full Credibility Standard: “**Frequency**, Poisson: $\sigma_N^2/\mu_N = 1$ and there is no severity term, so the standard reduc…” |
| The full-credibility standard for severity, in expected number of claims, is lambda_0 times the squared coefficient of variation of severit… | formula | tagged | Full Credibility Standard: “**Severity**: $n_F = (z/k)^2 \cdot \mathrm{CV}_X^2$ claims, where $\mathrm{CV}_X = \sigma_X/\mu_X$ …” |
| With Poisson claim frequency, the full-credibility standard for pure premium, in expected number of claims, is lambda_0 (1 + CV_X^2), where… | formula | tagged | Full Credibility Standard: “**[[Aggregate Loss Model\\|Aggregate]]** loss with Poisson frequency: $n_F = (z/k)^2\left(1 + \mathr…” |
| When no frequency variance is given, claim frequency is assumed to be Poisson (variance equals mean). | fact | tagged | Full Credibility Standard: “**Frequency**, Poisson: $\sigma_N^2/\mu_N = 1$ and there is no severity term, so the standard reduc…” |
| For severity credibility, the observed exposure is the actual number of claims; for pure premium credibility, the observed exposure is the … | procedure | tagged | Full Credibility Standard: “A standard stated in claims converts to exposures by dividing by the expected claim frequency per e…” |

</details>

<details><summary><code>masii-2018f-q7</code> · answerable</summary>

Tagged pages: Covariance Structure, Linear Mixed Model, Autoregressive Model

| Item | Kind | Status | Where |
|---|---|---|---|
| A first-order autoregressive (AR(1)) residual covariance structure gives every observation the same variance sigma^2 and sets the covarianc… | definition | tagged | Covariance Structure: “\\| First-order autoregressive AR(1) \\| $\rho^{\,\lvert j-k\rvert}$ \\| 2 \\| equally spaced measures …” |
| Under AR(1), Cov(e_t, e_t') = sigma^2 * rho^\|t - t'\|, so the correlation at lag k is rho^k and successive off-diagonals are sigma^2*rho, … | formula | tagged | Covariance Structure (collapsed): “AR(1) predicts $\rho, \rho^2, \rho^3$.” |
| Positive autocorrelation corresponds to a positive rho in the AR(1) structure, so all off-diagonal covariances are positive. | fact | tagged | Covariance Structure: “\\| First-order autoregressive AR(1) \\| $\rho^{\,\lvert j-k\rvert}$ \\| 2 \\| equally spaced measures …” |
| An independence (diagonal) residual structure has equal variances on the diagonal and zero covariance between all different observations. | definition | tagged | Covariance Structure: “\\| Independent (VC) \\| $0$ \\| 1 \\| no within-group correlation \\|” |
| A compound symmetry (exchangeable) structure has constant variance and the same covariance between every pair of observations within a subj… | definition | tagged | Covariance Structure: “\\| Compound symmetry (CS) \\| $\rho$ for all $j \neq k$ \\| 2 \\| exchangeable measures — the random-i…” |
| A banded (Toeplitz-type) structure has covariance depending only on lag but is zero beyond a certain lag, rather than decaying geometricall… | definition | tagged | Covariance Structure: “\\| Toeplitz \\| $\rho_{\lvert j-k\rvert}$ \\| $n$ \\| banded, decay not forced to be geometric \\|” |
| To check whether a matrix is AR(1), compute rho from the lag-1 covariance divided by the variance, then verify that the higher-lag entries … | procedure | tagged | Covariance Structure (collapsed): “AR(1) predicts $\rho, \rho^2, \rho^3$. With $\rho = 0.62$: $0.62,\ 0.384,\ 0.238$ — almost exactly …” |

</details>

<details><summary><code>masii-2018f-q8</code> · gap</summary>

Tagged pages: Linear Mixed Model, Random Effects, Fixed Effects, Variance Components

| Item | Kind | Status | Where |
|---|---|---|---|
| In a linear mixed model Y_i = X_i β + Z_i u_i + ε_i, β is the vector of fixed effects (one entry per fixed covariate) and u_i is the vector… | definition | tagged | Linear Mixed Model: “\\| $\boldsymbol{\beta}$ \\| Fixed effects \\| Population-level coefficients \\|” |
| D is the variance-covariance matrix of the random-effect vector u_i, with random-effect variances on the diagonal and covariances between r… | definition | tagged | Variance Components: “$\mathbf{D}$ collects the random-effect variances (and their covariances)” |
| With q random covariates, u_i is q×1 and its covariance matrix D is q×q; the number of fixed covariates and the number of observations do n… | fact | missing |  |

</details>

<details><summary><code>masii-2018f-q9</code> · gap</summary>

Tagged pages: Linear Mixed Model, Covariance Structure, Maximum Likelihood Estimation, Restricted Maximum Likelihood

| Item | Kind | Status | Where |
|---|---|---|---|
| When covariance parameter estimation in a linear mixed model fails (non-convergence, nonpositive-definite D matrix, boundary estimates), re… | fact | missing |  |
| The implied marginal model of a linear mixed model omits the random effects and directly fits the marginal covariance matrix V_i = Z_i D Z_… | definition | missing |  |
| An unstructured covariance matrix imposes no pattern on the covariances among repeated observations, estimating each variance and covarianc… | definition | tagged | Covariance Structure: “\\| Unstructured (UN) \\| free \\| $n(n+1)/2$ \\| anything, at maximum cost \\|” |
| Iterative ML/REML estimation can fail from poor starting values, so choosing alternative starting values for the covariance parameters is a… | fact | missing |  |

</details>

<details><summary><code>masii-2019f-q1</code> · gap</summary>

Tagged pages: Linear Mixed Model, Random Effects, Covariance Structure, AIC, Variance Function, Model Output

| Item | Kind | Status | Where |
|---|---|---|---|
| A marginal model has no random effects and specifies the covariance of the observations directly through the residual covariance matrix (V_… | definition | tagged | Covariance Structure: “$$\mathbf{V}_i = \mathbf{Z}_i\mathbf{D}\mathbf{Z}_i^{\top} + \mathbf{R}_i$$” |
| A factor should be treated as a random effect when its observed levels are a sample from a larger population of levels and conclusions are … | fact | linked | Fixed Effects: “A factor belongs in the fixed part when its levels are **the specific levels you care about** and w…” |
| A model is nested in another if it is a restricted version of the larger model (obtained by constraining parameters of the larger model), s… | definition | linked | Likelihood Ratio Test: “$r$ is the number of **restrictions** — the difference in free parameters between the full and redu…” |
| The exponential variance function is Var(e_ij) = sigma^2 exp(2 delta v_ij) and the power variance function is Var(e_ij) = sigma^2 \|v_ij\|^… | formula | missing |  |
| AIC = -2 loglik + 2k, where k is the number of estimated parameters, so k can be recovered from the reported AIC and log-likelihood. | formula | tagged | AIC: “$$\text{AIC} = -2\ell(\hat{\boldsymbol{\beta}}) + 2p$$” |
| Non-nested models are compared using information criteria such as AIC (lower is better) rather than a likelihood ratio test. | fact | tagged | AIC: “AIC does **not** require models to be nested, unlike likelihood ratio tests” |

</details>

<details><summary><code>masii-2019f-q10</code> · answerable</summary>

Tagged pages: Random Effects, Fixed Effects, Linear Mixed Model

| Item | Kind | Status | Where |
|---|---|---|---|
| A random effect (random factor) in a linear mixed model is a factor whose observed levels are a sample drawn from a larger population, wher… | definition | tagged | Random Effects: “Unlike [[Fixed Effects\\|fixed effects]] they are treated as *draws from a distribution*, so a group…” |
| A fixed effect (fixed factor) in a linear mixed model is a factor whose levels are the specific levels of interest, all present in the data… | definition | tagged | Fixed Effects: “A factor belongs in the fixed part when its levels are **the specific levels you care about** and w…” |
| A subject or cluster identifier with repeated observations per subject (e.g., an individual unit measured many times) is typically treated … | fact | tagged | Random Effects: “Random effects induce **correlation between observations in the same group** — this is what lets a …” |
| A treatment or category variable whose levels are all included and are the focus of comparison (such as the programs being tested or known … | fact | tagged | Fixed Effects (collapsed): “**Coverage** — fixed. Three levels, all of interest, and each has plenty of data.” |
| A continuous covariate is not a factor with levels, so it is not a random factor and enters the model as a fixed effect. | fact | tagged | Fixed Effects: “**Fixed effects** are the regression coefficients in a [[Linear Mixed Model]] that describe the *po…” |

</details>

<details><summary><code>masii-2019f-q11</code> · gap</summary>

Tagged pages: Hierarchical Model, Linear Mixed Model, Random Intercept and Slope, Interaction

| Item | Kind | Status | Where |
|---|---|---|---|
| In a hierarchical (multilevel) formulation of a linear mixed model, Level 1 describes the individual observations within a group and Level … | definition | tagged | Hierarchical Model: “**Level 1**: individual observations $i$ within group $j$ (e.g., claims within a policyholder)” |
| Observation-level covariates and the residual error term belong in the Level 1 equation, while group-level covariates and the group random … | fact | missing |  |
| To convert a hierarchical model into the general (composite) form, substitute the Level 2 equations for the coefficients into the Level 1 e… | procedure | missing |  |
| A cross-level interaction term (group-level covariate times observation-level covariate) arises when a Level 2 covariate enters the equatio… | fact | tagged | Interaction: “$\beta_3$ is the interaction coefficient: it measures how much the effect of $x_1$ on $\eta$ change…” |

</details>

<details><summary><code>masii-2019f-q12</code> · gap</summary>

Tagged pages: Linear Mixed Model, Hypothesis Testing, Fixed Effects, Covariance Structure

| Item | Kind | Status | Where |
|---|---|---|---|
| The standard estimated covariance matrix of the fixed-effect estimates treats the estimated covariance parameters as if they were the true … | fact | missing |  |
| The Kenward-Roger method inflates the estimated covariance matrix of the fixed-effect estimates to correct its downward bias and approximat… | procedure | missing |  |
| The Kenward-Roger adjustment is designed for linear mixed models, where random effects and correlated residuals make observations neither i… | fact | missing |  |
| The Kenward-Roger adjustment matters most for small samples; as the sample size grows the bias becomes negligible and the adjusted denomina… | fact | missing |  |

</details>

<details><summary><code>masii-2019f-q13</code> · answerable</summary>

Tagged pages: Likelihood Ratio Test, Covariance Structure, Hypothesis Testing, Linear Mixed Model, Variance Function

| Item | Kind | Status | Where |
|---|---|---|---|
| The degrees of freedom of a likelihood ratio test between nested models equal the difference in the number of estimated parameters (covaria… | fact | tagged | Likelihood Ratio Test: “$r$ is the number of **restrictions** — the difference in free parameters between the full and redu…” |
| To test whether residual variances differ across groups in a linear mixed model, compare a model with a separate residual variance for each… | procedure | tagged | Variance Function: “**heterogeneous variances**, a separate $\sigma_g^2$ for each level of a factor (a treatment group,…” |
| When the null hypothesis sets a variance to zero (e.g., testing whether a random effect is needed), the value lies on the boundary of the p… | fact | tagged | Variance Function: “Equal variances is not a boundary hypothesis, so the plain $\chi^2_2$ applies.” |

</details>

<details><summary><code>masii-2019f-q14</code> · answerable</summary>

Tagged pages: Linear Mixed Model, Random Effects, Best Linear Unbiased Predictor, Categorical Predictor, Model Output

| Item | Kind | Status | Where |
|---|---|---|---|
| With dummy-coded categorical predictors, the prediction for a given category sets that category's indicator to 1 and the others to 0, so it… | procedure | tagged | Categorical Predictor: “A categorical predictor with $k$ levels is represented using $k-1$ **indicator (dummy) variables**;…” |
| In a linear mixed-effects model, fixed effects are population-level coefficients shared across all groups, while random effects (such as u_… | definition | tagged | Linear Mixed Model: “\\| $\boldsymbol{\beta}$ \\| Fixed effects \\| Population-level coefficients \\|” |
| A prediction for a specific, observed group (e.g., a specific packet) is a conditional prediction that includes the group's predicted rando… | fact | tagged | Best Linear Unbiased Predictor: “Adding $\mathbf{X}\hat{\boldsymbol\beta} + \mathbf{Z}\hat{\mathbf{b}}$ gives the group-specific (co…” |
| The residual error term ε_ij has mean zero and is unobservable, so it is not included in the fitted/predicted value equation. | fact | tagged | Linear Mixed Model: “**Marginal mean**: $E[\mathbf{y}] = \mathbf{X}\boldsymbol{\beta}$” |

</details>

<details><summary><code>masii-2019f-q15</code> · gap</summary>

Tagged pages: Linear Mixed Model, Covariance Structure, Random Effects, Variance Components

| Item | Kind | Status | Where |
|---|---|---|---|
| The marginal model implied by a linear mixed model integrates out the random effects, giving a response with mean Xβ and covariance ZDZ' + … | definition | tagged | Linear Mixed Model: “**Marginal mean**: $E[\mathbf{y}] = \mathbf{X}\boldsymbol{\beta}$; **marginal covariance**: $\text{…” |
| The implied marginal model yields only marginal (population-averaged) predictions, whereas a linear mixed model can yield both marginal and… | fact | linked | Best Linear Unbiased Predictor: “Adding $\mathbf{X}\hat{\boldsymbol\beta} + \mathbf{Z}\hat{\mathbf{b}}$ gives the group-specific (co…” |
| The marginal covariance matrix ZDZ' + R implied by a linear mixed model is positive-definite by construction (D and R are positive-definite… | fact | missing |  |
| In a linear mixed model the covariance parameters are variance components that separate between-subject and within-subject variability, whe… | fact | tagged | Variance Components: “**Variance components** are the parameters that split the total variance of a [[Linear Mixed Model]…” |

</details>

<details><summary><code>masii-2019f-q19</code> · gap</summary>

Tagged pages: Bayesian, Bayes Theorem, Binomial Distribution, Conditional Probability, Posterior Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| In a grid approximation, the prior is a discrete set of candidate parameter values with probabilities obtained by normalizing the given wei… | procedure | missing |  |
| The likelihood of observing k successes in n independent trials with success probability p is the binomial probability C(n,k) p^k (1-p)^(n-… | formula | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| The posterior probability of each parameter value is proportional to prior times likelihood: P(p \| data) = prior(p) × likelihood(data \| p… | formula | tagged | Posterior Distribution: “$$\pi(\theta \mid \mathbf{x}) \propto \pi(\theta)\prod_{i=1}^{n} f(x_i \mid \theta)$$” |
| To compute a grid-approximation posterior, multiply prior and likelihood at each grid value, sum these products to get the normalizing cons… | procedure | tagged | Posterior Distribution (collapsed): “The posterior probabilities are $0.12281/0.20513 = 0.5987$ (good) and $0.08232/0.20513 = 0.4013$ (b…” |

</details>

<details><summary><code>masii-2019f-q2</code> · answerable</summary>

Tagged pages: Residual Plot, Linear Mixed Model, Covariance Structure, Variance Function, Model Diagnostics

| Item | Kind | Status | Where |
|---|---|---|---|
| Heteroscedasticity means the variance of the errors is not constant across observations (e.g., it changes with fitted values or with a cova… | definition | tagged | Residual Plot: “\\| Fan shape (spread increases) \\| **Heteroscedasticity** — variance is not constant \\|” |
| Normalized residuals are residuals divided by the standard deviation the model assumes, so that if the model's variance structure is correc… | definition | linked | Residual: “The **Pearson residual** divides by the standard deviation implied by the [[Variance Function\\|vari…” |
| To check for heteroscedasticity, plot residuals against predicted values and against explanatory variables or groups (e.g., box plots by la… | procedure | tagged | Model Diagnostics: “side-by-side box plots of residuals by group show whether one residual variance fits every group” |
| A model that assumes constant variance will show residuals whose spread grows (fans out) when the true variance increases with a covariate … | fact | tagged | Residual Plot (collapsed): “The fan shape indicates **heteroscedasticity**: variance of residuals increases with the fitted val…” |
| Variance functions in nlme (varExp, varPower) let the error variance depend on a covariate: varExp models the standard deviation as exponen… | definition | tagged | Variance Function: “**variance as a function** of a covariate or of the fitted mean, e.g. the power form $\mathrm{Var}(…” |
| A correctly specified variance function absorbs the heteroscedasticity, so the normalized residuals of the refitted model show roughly cons… | fact | tagged | Model Diagnostics: “In a GLM, plot Pearson or deviance residuals — if the [[Variance Function\\|variance function]] is r…” |

</details>

<details><summary><code>masii-2019f-q22</code> · gap</summary>

Tagged pages: Linear Regression, Bayesian, Parameter Estimate Tables

| Item | Kind | Status | Where |
|---|---|---|---|
| In a linear regression model the intercept is the expected response when all predictor terms equal zero, so it equals the average outcome o… | fact | tagged | Linear Regression: “Leaving out $\beta_0$, for instance when its test shows it is not significantly different from zero…” |
| A log-transformed predictor equals zero when the original variable equals 1, so the intercept corresponds to the original variable being 1,… | fact | missing |  |
| The coefficient on a log-transformed predictor gives the change in the expected response for a one-unit change in the log of that predictor. | fact | tagged | Linear Regression: “$\hat\beta_j$ is the change in $E[Y]$ per unit of $x_j$ **holding the other predictors fixed**” |
| Standardizing a variable subtracts its mean and divides by its standard deviation, giving mean 0 and standard deviation 1, so a one-unit ch… | definition | elsewhere | Variable Transformation: “**standardizing**, $(x - \bar{x})/s_x$, puts predictors on a common scale” |
| The coefficient on a standardized predictor is the change in the expected response per one-standard-deviation change in that predictor. | fact | tagged | Linear Regression: “$\hat\beta_j$ is the change in $E[Y]$ per unit of $x_j$ **holding the other predictors fixed**” |

</details>

<details><summary><code>masii-2019f-q25</code> · answerable</summary>

Tagged pages: Logistic Regression, Link Function, Cumulative Distribution Function (CDF)

| Item | Kind | Status | Where |
|---|---|---|---|
| The cumulative probability of an ordered category is the probability that the response is at or below that level, estimated empirically as … | definition | linked | Ordinal Logistic Regression: “$\gamma_j = P(Y \le j)$” |
| The odds of an event with probability p equal p/(1-p). | definition | tagged | Logistic Regression: “$\pi/(1-\pi)$ is the **odds**” |
| The log-cumulative-odds of a level is the logit (natural log of the odds) applied to the cumulative probability up to and including that le… | definition | tagged | Logistic Regression: “The **proportional odds** (cumulative logit) model applies the logit to the cumulative probabilitie…” |

</details>

<details><summary><code>masii-2019f-q27</code> · untagged</summary>

Tagged pages: Predictive Distribution, Conjugate Prior, Bayesian Credibility, Gamma, Posterior Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The gamma distribution is a conjugate prior for the Poisson likelihood, so the posterior of the Poisson mean is also gamma. | fact | tagged | Conjugate Prior: “A **conjugate prior** is a prior distribution for a risk parameter that, combined with a given like…” |
| For a Poisson mean with Gamma(alpha, theta) prior (theta a scale parameter) and observed total claims sum y over n exposures, the posterior… | formula | tagged | Conjugate Prior: “\\| Poisson$(\lambda)$ \\| Gamma$(\alpha, \theta)$ \\| Gamma$\left(\alpha + \sum x_i,\; \frac{\theta}{…” |
| The mean of a Gamma(alpha, theta) distribution with scale parameter theta is alpha times theta, so the posterior mean of the Poisson mean i… | formula | tagged | Gamma: “$E[X] = \alpha\theta$, $\text{Var}(X) = \alpha\theta^2$, and coefficient of variation $CV = 1/\sqrt…” |
| The posterior predictive mean of a future observation equals the expected value of the conditional mean given the parameter under the poste… | fact | tagged | Predictive Distribution: “The Bayesian credibility estimate is its mean: $E[X_{n+1} \mid \mathbf{x}] = E_\theta\!\left[\mu(\t…” |
| To predict claims for a future block of exposures, multiply the posterior mean frequency per exposure by the number of future exposures. | procedure | elsewhere | Mixing Distribution: “The mean is always $t\,E[\Lambda]$” |

</details>

<details><summary><code>masii-2019f-q3</code> · answerable</summary>

Tagged pages: Bühlmann Credibility, Limited Fluctuation Credibility, Partial Credibility, Expected Value of Process Variance, Variance of Hypothetical Means, Full Credibility Standard

| Item | Kind | Status | Where |
|---|---|---|---|
| In limited-fluctuation credibility, partial credibility is Z = sqrt(n/n_F), where n is the observed number of claims and n_F is the full-cr… | formula | tagged | Partial Credibility: “$$Z = \min\left(\sqrt{\frac{n}{n_F}},\; 1\right)$$” |
| Under limited-fluctuation credibility, Z equals 1 once the number of claims reaches the full-credibility standard, so the credibility curve… | fact | tagged | Full Credibility Standard: “The **full credibility standard** is the volume of experience at which [[Limited Fluctuation Credib…” |
| The full-credibility standard for claim severity is the frequency standard multiplied by the squared coefficient of variation of severity: … | formula | tagged | Full Credibility Standard: “**Severity**: $n_F = (z/k)^2 \cdot \mathrm{CV}_X^2$ claims, where $\mathrm{CV}_X = \sigma_X/\mu_X$ …” |
| Bühlmann credibility is Z = n/(n+k), where k = EVPV/VHM (expected value of process variance divided by variance of hypothetical means). | formula | tagged | Bühlmann Credibility: “$$Z = \frac{n}{n + k}, \quad k = \frac{v}{a}$$” |
| The Bühlmann credibility factor n/(n+k) increases toward 1 asymptotically but never reaches 1 for any finite n, unlike limited-fluctuation … | fact | tagged | Bühlmann Credibility: “As $n \to \infty$, $Z \to 1$ (full credibility to observed data)” |

</details>

<details><summary><code>masii-2019f-q32</code> · answerable</summary>

Tagged pages: Multicollinearity, Variable Selection, Linear Regression, Scatter Plot

| Item | Kind | Status | Where |
|---|---|---|---|
| Multicollinearity occurs when two or more predictor variables in a regression model are highly correlated, so they carry nearly the same in… | definition | tagged | Multicollinearity: “**Multicollinearity** is strong linear association among the *predictors* of a regression.” |
| Use a scatterplot matrix of the predictor variables to detect multicollinearity by looking for pairs of predictors whose panels show a stro… | procedure | tagged | Multicollinearity: “Detect it before fitting with a correlation matrix or a [[Scatter Plot]] matrix of the predictors; …” |
| Multicollinearity inflates the standard errors (variances) of the coefficient estimates of the correlated predictors, making the individual… | fact | tagged | Multicollinearity: “individual coefficients become unstable: the data cannot say which of two nearly interchangeable va…” |
| Multicollinearity does not substantially harm the model's predictive accuracy; it mainly impairs attribution of effects to individual predi… | fact | tagged | Multicollinearity: “What it does **not** hurt is prediction inside the observed range of the predictors — fitted values…” |
| With collinear predictors, the sign and size of an individual coefficient are unpredictable, and the usual interpretation of a coefficient … | fact | tagged | Multicollinearity: “coefficients that flip sign when a variable is added or a few rows change” |

</details>

<details><summary><code>masii-2019f-q35</code> · untagged</summary>

Tagged pages: Conjugate Prior, Bayesian, Gamma, Poisson Distribution, Posterior Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A gamma prior is conjugate to the Poisson likelihood: with a Gamma(shape α, rate β) prior and n observations with total claims S, the poste… | fact | linked | Bayesian Credibility: “\\| Poisson$(\theta)$ \\| Gamma$(\alpha, \beta)$, rate $\beta$ \\| Gamma$(\alpha + \sum x_i,\, \beta +…” |
| The exponential distribution with mean θ is a gamma distribution with shape 1 and rate 1/θ. | fact | tagged | Gamma: “Special cases: exponential ($\alpha = 1$) and chi-squared ($\alpha = n/2$, $\theta = 2$)” |
| The mode of a Gamma(α, β) distribution with rate β and α ≥ 1 is (α − 1)/β. | formula | elsewhere | Mode: “[[Gamma]] $(\alpha - 1)\theta$ for $\alpha \ge 1$” |
| A gamma distribution with shape α and rate β has mean α/β and variance α/β², so shape and rate can be solved from a given mean and variance. | formula | tagged | Gamma: “$E[X] = \alpha\theta$, $\text{Var}(X) = \alpha\theta^2$, and coefficient of variation $CV = 1/\sqrt…” |
| With a uniform prior on an interval, the posterior is proportional to the likelihood restricted to that interval, so its mode is the likeli… | fact | elsewhere | Bayesian Estimation (collapsed): “Each loss contributes $1/\theta$ to the likelihood, which is 0 unless $\theta \ge 1{,}500$, the lar…” |
| The posterior mode is the value of the parameter that maximizes the posterior density, which is proportional to the likelihood times the pr… | definition | linked | Bayesian Credibility: “$$\pi(\theta \mid \mathbf{X}) \propto L(\mathbf{X} \mid \theta) \cdot \pi(\theta)$$” |

</details>

<details><summary><code>masii-2019f-q37</code> · answerable</summary>

Tagged pages: AIC, Deviance, Bias-Variance Tradeoff, Bayesian, Model Selection

| Item | Kind | Status | Where |
|---|---|---|---|
| Deviance equals -2 times the log pointwise predictive density, i.e. -2 times the sum of the natural logs of the posterior (predictive) like… | formula | tagged | AIC: “$$\text{AIC} = -2\ell(\hat{\boldsymbol{\beta}}) + 2p$$” |
| AIC equals the deviance plus a penalty of 2 times the (effective) number of parameters. | formula | tagged | AIC: “$$\text{AIC} = -2\ell(\hat{\boldsymbol{\beta}}) + 2p$$” |
| Lower deviance or lower AIC indicates a better model. | fact | tagged | AIC: “**Lower AIC** indicates a better model (better fit relative to complexity)” |
| Deviance measures only in-sample fit and tends to favour more complex models, so it does not account for overfitting; AIC penalizes model c… | fact | tagged | Model Selection: “In-sample fit alone always prefers the bigger model, which is why a penalty or held-out data is nee…” |

</details>

<details><summary><code>masii-2019f-q38</code> · answerable</summary>

Tagged pages: Random Forest, Bagging, Tree Ensemble, Decision Tree

| Item | Kind | Status | Where |
|---|---|---|---|
| Bagging builds many trees on bootstrap resamples of the training data and averages their predictions (or takes a majority vote for classifi… | definition | tagged | Bagging: “**Bagging** (bootstrap aggregating) fits the same model to many [[Bootstrap\\|bootstrap]] resamples …” |
| A random forest builds trees on bootstrap resamples but considers only a random subset of m of the p predictors as candidates at each split… | definition | tagged | Random Forest: “A random forest** is [[Bagging\\|bagged]] [[Decision Tree\\|trees]] with one extra step: at *each spl…” |
| A single decision tree has high variance, since small changes in the training data can produce a very different tree structure. | fact | tagged | Decision Tree: “Decision trees are **highly interpretable** but have high variance — small data changes can produce…” |
| Averaging many trees (bagging or random forests) reduces variance relative to a single tree, so ensemble models have lower variance than a … | fact | tagged | Tree Ensemble: “Ensembles reduce the high variance of individual trees while preserving their ability to capture co…” |
| In bagging, a dominant predictor tends to be chosen for the top split in most trees, making the trees highly correlated, so averaging them … | fact | tagged | Bagging: “Bagged trees are highly correlated because a dominant predictor is chosen first in nearly every tre…” |
| Restricting the predictors available at each split in a random forest decorrelates the trees, so averaging them yields a larger variance re… | fact | tagged | Random Forest: “That decorrelates the trees, so averaging removes more variance than bagging can.” |

</details>

<details><summary><code>masii-2019f-q39</code> · gap</summary>

Tagged pages: Principal Components Analysis, Proportion of Variance Explained, Scree Plot, Multicollinearity

| Item | Kind | Status | Where |
|---|---|---|---|
| Principal components analysis on standardized variables uses the eigenvalues and eigenvectors of the correlation matrix, and the eigenvalue… | fact | tagged | Proportion of Variance Explained: “On **standardized** data $\sum_j \lambda_j = p$, so $\mathrm{PVE}_m = \lambda_m/p$ and a component …” |
| The proportion of variance explained by the k-th principal component equals its eigenvalue divided by the sum of all eigenvalues, and the c… | formula | tagged | Principal Components Analysis: “$$\text{PVE}_m = \frac{\lambda_m}{\sum_{j=1}^p \lambda_j}$$” |
| If one variable is an exact linear function of another (correlation of ±1), the correlation matrix is singular, so at least one eigenvalue … | fact | missing |  |
| A principal component with a zero eigenvalue explains no additional variance, so the cumulative proportional variance reaches 100% at the c… | fact | missing |  |
| A variable that is nearly uncorrelated with the other variables is captured by its own principal component with an eigenvalue near 1 (for s… | fact | missing |  |

</details>

<details><summary><code>masii-2019f-q4</code> · untagged</summary>

Tagged pages: Full Credibility Standard, Limited Fluctuation Credibility, Poisson Distribution, Binomial Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The general limited-fluctuation full-credibility standard is (z/k)^2, where z is the standard normal quantile at 1 - alpha/2 (for probabili… | formula | tagged | Full Credibility Standard: “$$n_F = \left(\frac{z_{(1+p)/2}}{k}\right)^{2}\left[\frac{\sigma_N^{2}}{\mu_N} + \left(\frac{\sigma…” |
| The full-credibility standard for claim frequency in exposure units is (z/k)^2 times Var(N)/E[N]^2, where N is the claim count per exposure… | formula | tagged | Limited Fluctuation Credibility: “$$n_{\text{full}} = \left(\frac{z_{\alpha/2}}{r}\right)^2 \cdot \frac{\text{Var}(X)}{[\text{E}(X)]^…” |
| For Poisson claim frequency the variance equals the mean, so the full-credibility standard in exposure units is (z/k)^2 / E[N]. | fact | tagged | Limited Fluctuation Credibility: “For **claim frequency** (Poisson): $\text{Var}(X)/[E(X)]^2 = 1/\lambda$, giving $n_{\text{full}} = …” |
| For binomial (Bernoulli per exposure) claim frequency with probability p, the mean per exposure is p and the variance is p(1-p), so the ful… | fact | tagged | Full Credibility Standard: “A standard stated in claims converts to exposures by dividing by the expected claim frequency per e…” |
| The standard normal quantile for a two-sided probability of 0.95 (alpha = 0.05) is z = 1.96. | fact | elsewhere | Normal Distribution: “Useful percentiles: $z_{0.90} = 1.282$, $z_{0.95} = 1.645$, $z_{0.975} = 1.960$, $z_{0.99} = 2.326$” |

</details>

<details><summary><code>masii-2019f-q40</code> · answerable</summary>

Tagged pages: K-Means Clustering, Clustering, Unsupervised Learning, Principal Components Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| K-means clustering is an unsupervised method that partitions observations into K non-overlapping clusters so that each cluster is a subgrou… | definition | tagged | K-Means Clustering: “**K-Means Clustering** is a partition-based [[Clustering]] algorithm that partitions $n$ observatio…” |
| K-means does not require standardized variables; standardizing to mean zero and standard deviation one is often advisable because variables… | fact | tagged | K-Means Clustering: “**Scaling matters**: K-Means is distance-based, so whether the variables are first scaled to standa…” |
| Principal components analysis seeks a low-dimensional representation of the observations that explains a large share of the variance, where… | definition | tagged | Principal Components Analysis: “is an unsupervised [[Statistical Learning]] technique that finds a low-dimensional representation o…” |

</details>

<details><summary><code>masii-2019f-q41</code> · gap</summary>

Tagged pages: Proportion of Variance Explained, Principal Components Analysis, Loading Vector

| Item | Kind | Status | Where |
|---|---|---|---|
| The projection (score) of an observation onto the first principal component is z_i = the linear combination of its centred predictor values… | definition | tagged | Loading Vector: “$$z_{im} = \phi_{1m}x_{i1} + \phi_{2m}x_{i2} + \cdots + \phi_{pm}x_{ip}$$” |
| The proportion of variance explained by the first principal component equals the variance of its scores, (1/n)·Σ z_i², divided by the total… | formula | tagged | Proportion of Variance Explained: “$\lambda_m$ is the variance of the $m$-th score vector — the eigenvalue attached to the $m$-th [[Lo…” |
| Principal component scores of centred (mean-zero) predictors have mean zero, so the sample variance of the scores is the sum of squared sco… | fact | missing |  |
| The total variance of a data set is the sum of the variances of its individual predictor variables. | definition | tagged | Principal Components Analysis (collapsed): “Total variance $= \lambda_1 + \lambda_2 = 1.6 + 0.4 = 2.0$ (sum of eigenvalues = trace of $\mathbf{…” |

</details>

<details><summary><code>masii-2019f-q42</code> · answerable</summary>

Tagged pages: Hierarchical Clustering, Linkage, Dendrogram, Clustering

| Item | Kind | Status | Where |
|---|---|---|---|
| Agglomerative hierarchical clustering starts with each observation as its own cluster and repeatedly fuses the two clusters with the smalle… | procedure | tagged | Hierarchical Clustering: “Agglomerative clustering starts with every observation in its own cluster and repeatedly fuses the …” |
| Complete linkage defines the dissimilarity between two clusters as the maximum of all pairwise dissimilarities between an observation in on… | definition | tagged | Linkage: “\text{complete: } \max_{i \in A,\, j \in B} d_{ij}” |
| Average linkage defines the dissimilarity between two clusters as the mean of all pairwise dissimilarities between observations in one clus… | definition | tagged | Linkage: “\text{average: } \frac{1}{\lvert A\rvert\lvert B\rvert}\sum_{i \in A}\sum_{j \in B} d_{ij}” |
| For one-dimensional observations, the dissimilarity between two observations is typically the Euclidean distance, i.e. the absolute differe… | definition | linked | Similarity and Distance Measures: “d_{\text{Euc}}(\mathbf{u}, \mathbf{v}) = \sqrt{\sum_{j=1}^{p} (u_j - v_j)^2}” |
| Different linkage methods can produce different cluster merge orders and trees from the same data, so after the first fuse the clusters mus… | fact | tagged | Linkage (collapsed): “Same data, three different fusion heights — and with more clusters in play, potentially a different…” |

</details>

<details><summary><code>masii-2019f-q5</code> · answerable</summary>

Tagged pages: Empirical Bayes Credibility, Bühlmann Credibility, Expected Value of Process Variance, Variance of Hypothetical Means

| Item | Kind | Status | Where |
|---|---|---|---|
| In nonparametric empirical Bayes with equal exposures, the estimate of the expected value of the process variance is the average of the wit… | formula | tagged | Empirical Bayes Credibility: “$$\hat{v} = \frac{1}{r(n-1)}\sum_{i=1}^{r}\sum_{j=1}^{n}\left(X_{ij} - \bar{X}_i\right)^{2}$$” |
| In nonparametric empirical Bayes with equal exposures, the estimate of the variance of the hypothetical means is the sample variance of the… | formula | tagged | Empirical Bayes Credibility: “$$\hat{a} = \frac{1}{r-1}\sum_{i=1}^{r}\left(\bar{X}_i - \bar{X}\right)^{2} - \frac{\hat{v}}{n}$$” |
| The overall mean estimate for equal-exposure empirical Bayes is the average of the risk sample means, used as the prior mean. | formula | tagged | Empirical Bayes Credibility (collapsed): “$\bar{X}_1 = 5$, $\bar{X}_2 = 11$, $\bar{X} = 8$.” |
| Bühlmann credibility is Z = n/(n+k) with k = EPV/VHM, where n is the number of years of experience. | formula | tagged | Bühlmann Credibility: “$$Z = \frac{n}{n + k}, \quad k = \frac{v}{a}$$” |
| The Bühlmann credibility estimate for a risk is Z times the risk's sample mean plus (1-Z) times the overall mean. | formula | tagged | Bühlmann Credibility: “$$\text{Estimate} = Z \cdot \bar{X} + (1-Z) \cdot \mu$$” |
| When all risks have the same number of years and stable exposure, the equal-exposure Bühlmann model applies and the next-year aggregate los… | fact | linked | Bühlmann-Straub Credibility: “When all $m_i = 1$, Bühlmann-Straub reduces to the standard Bühlmann model” |

</details>

<details><summary><code>masii-2019f-q6</code> · untagged</summary>

Tagged pages: Bühlmann Credibility, Expected Value of Process Variance, Variance of Hypothetical Means, Compound Poisson Process, Aggregate Loss Model

| Item | Kind | Status | Where |
|---|---|---|---|
| The hypothetical mean is the conditional expected value of the loss given the risk parameter (risk group), μ(θ)=E[X\|θ], and the process va… | definition | tagged | Variance of Hypothetical Means: “$\mu(\Theta) = E[X \mid \Theta]$ is the **hypothetical mean**: the long-run mean of a risk with par…” |
| The Bühlmann credibility factor is Z = n/(n+k), where k = v/a, v is the expected value of the process variance (EPV), a is the variance of … | formula | tagged | Bühlmann Credibility: “$$Z = \frac{n}{n + k}, \quad k = \frac{v}{a}$$” |
| Compute EPV as the probability-weighted average of the process variances across risk groups, and VHM as the variance of the hypothetical me… | procedure | tagged | Expected Value of Process Variance (collapsed): “$$v = E[\lambda] = 0.5(0.10) + 0.5(0.40) = 0.25$$” |
| For a compound Poisson aggregate loss S with rate λ and severity X, E[S]=λE[X] and Var(S)=λE[X²]. | formula | tagged | Compound Poisson Process: “$$E[S(t)] = \lambda t\, E[X], \qquad \text{Var}(S(t)) = \lambda t\, E[X^2]$$” |
| A uniform distribution on (a,b) has mean (a+b)/2 and variance (b−a)²/12. | formula | elsewhere | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The second moment is E[X²] = Var(X) + (E[X])². | formula | elsewhere | Moment: “The second central moment is the [[Variance]], $\mu_2 = E[X^2] - \mu^2$.” |

</details>

<details><summary><code>masii-2019f-q7</code> · gap</summary>

Tagged pages: Hierarchical Model, Linear Mixed Model, Random Intercept and Slope

| Item | Kind | Status | Where |
|---|---|---|---|
| A hierarchical (multilevel) linear mixed model is converted to a single-equation LMM by substituting the Level 2 equations for the Level 1 … | procedure | missing |  |
| A random term in a Level 2 slope equation becomes a random effect multiplied by the Level 1 covariate (a random slope), whereas a random te… | fact | tagged | Random Intercept and Slope: “$$y_{ij} = (\beta_0 + b_{0i}) + (\beta_1 + b_{1i})x_{ij} + \varepsilon_{ij}$$” |
| Level 2 fixed-effect terms and coefficients carry over unchanged into the fixed-effects part of the combined LMM: group-level covariates (s… | fact | missing |  |
| In a linear mixed model Y = Xβ + Zu + ε, the fixed effects β are population-level parameters and the random effects u (here with covariance… | definition | tagged | Linear Mixed Model: “A **Linear Mixed Model (LMM)** extends ordinary linear regression by including both **fixed effects…” |

</details>

<details><summary><code>masii-2019f-q8</code> · gap</summary>

Tagged pages: Covariance Structure, Variance Components, Random Effects, Linear Mixed Model

| Item | Kind | Status | Where |
|---|---|---|---|
| The variance-covariance matrix D of the random effects in a linear mixed model is always symmetric because Cov(u_j, u_k) = Cov(u_k, u_j). | fact | missing |  |
| Diagonal elements of a variance-covariance matrix are variances and must be non-negative, but off-diagonal covariances can be negative, so … | fact | tagged | Variance Components: “Variances are **non-negative**, so a fitted component at the boundary $\hat\sigma_b^2 = 0$ is a sig…” |
| Under the compound symmetry structure for D, all diagonal elements are equal (a common variance) and all off-diagonal elements equal a sing… | definition | tagged | Covariance Structure: “Compound symmetry (CS) \\| $\rho$ for all $j \neq k$ \\| 2 \\| exchangeable measures — the random-inte…” |

</details>

<details><summary><code>masii-2019f-q9</code> · answerable</summary>

Tagged pages: Linear Mixed Model, Random Effects, Fixed Effects, Model Structure, Nested and Crossed Factors

| Item | Kind | Status | Where |
|---|---|---|---|
| A fixed effect is a factor whose specific levels are all present in the study and are of direct interest, so its effect is estimated as a r… | definition | tagged | Fixed Effects: “A factor belongs in the fixed part when its levels are **the specific levels you care about** and w…” |
| A random effect is used for a factor whose observed levels are a sample from a larger population of levels, and is modeled as a random vari… | definition | tagged | Random Effects: “Unlike [[Fixed Effects\\|fixed effects]] they are treated as *draws from a distribution*, so a group…” |
| To specify a linear mixed model, classify each factor as fixed or random, then write fixed effects as beta coefficients times covariates an… | procedure | tagged | Linear Mixed Model: “$$\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \mathbf{Z}\mathbf{u} + \boldsymbol{\varepsilon}$$” |
| A linear mixed model can include several crossed random effects at once (e.g., one for subject and one for time period), each entering as i… | fact | tagged | Nested and Crossed Factors: “$$\text{Crossed: } y_{ijk} = \beta_0 + a_i + c_j + \varepsilon_{ijk}$$” |

</details>

<details><summary><code>masii-2019s-q1</code> · answerable</summary>

Tagged pages: Linear Mixed Model, Interaction, Fixed Effects, Hypothesis Testing, Model Output

| Item | Kind | Status | Where |
|---|---|---|---|
| In a linear mixed-effects model fit, a fixed-effect coefficient is judged significant when its t-test p-value is small (e.g. below 0.05), a… | fact | linked | Parameter Estimate Tables: “A small p-value (e.g., $< 0.05$) indicates the predictor is statistically significant” |
| To judge a treatment's effect on the response, compute the predicted response for each treatment level by combining the intercept, the trea… | procedure | linked | Linear Regression (collapsed): “$$\hat{y} = 25.8 + 1.6x \ \Longrightarrow\ \hat{y}(15) = 25.8 + 24 = 49.8$$” |
| With dummy coding of a categorical variable, the reference level is absorbed into the intercept and each other level's coefficient measures… | definition | linked | Categorical Predictor: “A categorical predictor with $k$ levels is represented using $k-1$ **indicator (dummy) variables**;…” |
| An interaction term between a factor and a covariate allows the covariate's effect (slope) to differ across factor levels; the interaction … | definition | tagged | Interaction: “a categorical and a continuous predictor (the slope differs by group)” |
| A continuous covariate's coefficient in a linear model gives the expected change in the response per one-unit increase in the covariate, ho… | fact | tagged | Fixed Effects: “Interpretation is the same as in [[Linear Regression\\|linear regression]]: $\beta_j$ is the change …” |

</details>

<details><summary><code>masii-2019s-q10</code> · answerable</summary>

Tagged pages: Covariance Structure, Linear Mixed Model, Variance Components

| Item | Kind | Status | Where |
|---|---|---|---|
| A constant-diagonal (scaled identity) residual covariance structure in a linear mixed model sets R_i = sigma^2 I, with equal variance at ev… | definition | tagged | Variance Components: “$\mathbf{R}$ is the residual [[Covariance Structure\\|covariance structure]], usually $\sigma^2 \mat…” |
| Under a scaled identity residual structure, residuals for observations of the same subject are uncorrelated because all off-diagonal entrie… | fact | tagged | Covariance Structure: “\\| Independent (VC) \\| $0$ \\| 1 \\| no within-group correlation \\|” |
| A scaled identity residual covariance matrix has only one parameter to estimate, the common variance sigma^2. | fact | tagged | Covariance Structure: “\\| Independent (VC) \\| $0$ \\| 1 \\| no within-group correlation \\|” |
| For repeated trials on the same subject under the same condition, residuals are expected to be correlated, so structures such as compound s… | fact | tagged | Covariance Structure: “\\| First-order autoregressive AR(1) \\| $\rho^{\,\lvert j-k\rvert}$ \\| 2 \\| equally spaced measures …” |

</details>

<details><summary><code>masii-2019s-q11</code> · untagged</summary>

Tagged pages: Linear Mixed Model, Hierarchical Model, Categorical Predictor, Fixed Effects, Clustered Data

| Item | Kind | Status | Where |
|---|---|---|---|
| A two-level clustered dataset has level-1 units (e.g., individual observations) nested within level-2 clusters, with cluster-level covariat… | definition | tagged | Hierarchical Model: “**Level 1**: individual observations $i$ within group $j$ (e.g., claims within a policyholder)” |
| Intrinsic aliasing occurs when the design matrix columns are linearly dependent, such as when an intercept is included along with indicator… | definition | elsewhere | Design Matrix: “If one column is a linear combination of others, $\mathbf{X}^\top\mathbf{X}$ is singular and $\hat{…” |
| To code a categorical factor with k levels, include the intercept and indicators for k-1 levels, with the omitted reference level absorbed … | procedure | tagged | Categorical Predictor: “A categorical predictor with $k$ levels is represented using $k-1$ **indicator (dummy) variables**;…” |
| To test whether a categorical factor has any effect on the response, jointly test that all of its fixed-effect coefficients are zero (H0) a… | procedure | linked | Interaction: “An interaction with a categorical predictor of more than two levels has several coefficients; test …” |

</details>

<details><summary><code>masii-2019s-q12</code> · gap</summary>

Tagged pages: Restricted Maximum Likelihood, Maximum Likelihood Estimation, Linear Mixed Model, Variance Components

| Item | Kind | Status | Where |
|---|---|---|---|
| For a linear mixed model with known marginal covariance V, the ML (generalized least squares) estimator of the fixed effects is beta-hat = … | formula | linked | Fixed Effects: “Fixed effects are **estimated** ($\hat{\boldsymbol\beta}$) by generalized least squares given the v…” |
| The generalized least squares estimator of the fixed effects with known covariance is the best linear unbiased estimator (BLUE) by the Gaus… | fact | missing |  |
| ML estimates of covariance (variance-component) parameters are biased downward because they do not account for the degrees of freedom used … | fact | tagged | Restricted Maximum Likelihood: “ML treats $\hat{\boldsymbol\beta}$ as known when estimating variances and so **ignores the $p$ degr…” |
| REML maximizes the likelihood of error contrasts that are free of the fixed effects, which adjusts for degrees of freedom used on the fixed… | definition | tagged | Restricted Maximum Likelihood: “The extra $\log\\|\mathbf{X}^\top\mathbf{V}^{-1}\mathbf{X}\\|$ term is the correction; in the simples…” |
| Under both ML and REML, the fixed-effect estimate is obtained by plugging the estimated covariance parameters into the same GLS formula, so… | procedure | linked | Fixed Effects: “Fixed effects are **estimated** ($\hat{\boldsymbol\beta}$) by generalized least squares given the v…” |

</details>

<details><summary><code>masii-2019s-q13</code> · gap</summary>

Tagged pages: Random Intercept and Slope, Random Effects, Linear Mixed Model

| Item | Kind | Status | Where |
|---|---|---|---|
| In a profile (spaghetti) plot of repeated measurements by subject, each line's overall vertical level reflects the subject's intercept and … | definition | tagged | Random Intercept and Slope: “**Random intercept only**: parallel lines, one per group, at different heights…**Random intercept a…” |
| A consistent shift in the same direction across all subjects as the treatment changes indicates a fixed treatment effect. | fact | missing |  |
| A random effect on the treatment (random slope) means the treatment effect varies by subject, so subject lines would fan out, cross, or hav… | definition | tagged | Random Intercept and Slope: “**Random intercept and slope**: fanning lines, so the correlation between two observations depends …” |
| A random intercept captures vertical separation between subjects' lines, i.e., subject-to-subject differences in baseline level that persis… | definition | tagged | Random Intercept and Slope: “**Random intercept only**: parallel lines, one per group, at different heights” |

</details>

<details><summary><code>masii-2019s-q14</code> · untagged</summary>

Tagged pages: Covariance Structure, Variance Components, Linear Mixed Model, Intraclass Correlation

| Item | Kind | Status | Where |
|---|---|---|---|
| In a linear mixed model, the implied marginal covariance matrix of a subject's response vector is V_i = Z_i D Z_i' + R_i, where D is the co… | formula | tagged | Covariance Structure: “$$\mathbf{V}_i = \mathbf{Z}_i\mathbf{D}\mathbf{Z}_i^{\top} + \mathbf{R}_i$$” |
| In a random-intercept model with one random intercept per subject, Z_i is a column of ones and D is the scalar between-subject variance, so… | fact | elsewhere | Residual (collapsed): “\mathbf{V}_i = \sigma_b^2\mathbf{J} + \sigma^2\mathbf{I} = \begin{bmatrix} 200 & 40 & 40 \\ 40 & 20…” |
| Residuals within a subject are typically assumed independent with constant variance, so R_i equals the within-subject (residual) variance t… | fact | tagged | Variance Components: “$\mathbf{R}$ is the residual [[Covariance Structure\\|covariance structure]], usually $\sigma^2 \mat…” |
| Under a random-intercept model, each observation's marginal variance is the sum of the between-subject and within-subject variances, and th… | fact | tagged | Covariance Structure: “A **random intercept** already implies compound symmetry” |

</details>

<details><summary><code>masii-2019s-q15</code> · untagged</summary>

Tagged pages: Likelihood Ratio Test, Linear Mixed Model, Random Effects, Hypothesis Testing

| Item | Kind | Status | Where |
|---|---|---|---|
| The likelihood ratio test statistic for comparing nested models is the difference in -2 log-likelihood between the restricted (null) model … | formula | elsewhere | Model Output: “A [[Likelihood Ratio Test\\|likelihood ratio test]] is the difference in $-2\ell$.” |
| To test whether a random effect is needed, set the null hypothesis that the random effect variance equals zero (the model without the rando… | procedure | elsewhere | Model Output (collapsed): “The null value $\sigma^2_{\text{agency}} = 0$ is on the boundary, so the p-value is half the $\chi^…” |
| A variance cannot be negative, so a null value of zero lies on the boundary of the parameter space and the standard chi-squared distributio… | fact | elsewhere | Model Selection: “A test that a variance component is zero puts the null hypothesis on the boundary of the parameter …” |
| When testing a single variance component equal to zero, the likelihood ratio statistic follows a 50:50 mixture (average) of a chi-squared d… | fact | elsewhere | Model Selection: “Its reference distribution is then a 50:50 mixture of $\chi^2_0$ and $\chi^2_1$, which halves the n…” |
| Reject the null hypothesis and select the larger model when the p-value of the test statistic is below the significance level; for the mixt… | procedure | elsewhere | p-Value: “\text{reject } H_0 \iff p < \alpha” |

</details>

<details><summary><code>masii-2019s-q16</code> · answerable</summary>

Tagged pages: Linear Mixed Model, Random Effects, Fixed Effects, Hierarchical Model, Nested and Crossed Factors, Model Output

| Item | Kind | Status | Where |
|---|---|---|---|
| In a linear mixed model, the predicted response for a subject is the fixed-effects linear predictor (X·beta) plus the predicted random effe… | formula | linked | Best Linear Unbiased Predictor: “Adding $\mathbf{X}\hat{\boldsymbol\beta} + \mathbf{Z}\hat{\mathbf{b}}$ gives the group-specific (co…” |
| A categorical fixed effect is coded with indicator variables relative to a reference level, whose coefficient is 0 (shown as 0.00 in the ou… | definition | linked | Parameter Estimate Tables: “The **reference level** of a categorical predictor is absorbed into the intercept; other levels are…” |
| When random effects are nested (e.g., states within directors), the prediction for a subject includes the random effect at every level of t… | fact | tagged | Nested and Crossed Factors: “two claims from the same adjuster share $a_i + b_{j(i)}$, with correlation $(\sigma_a^2 + \sigma_b^…” |
| Read the estimated coefficients for the subject's covariate values from the fixed-effects table (multiplying continuous covariates' coeffic… | procedure | linked | Best Linear Unbiased Predictor: “Adding $\mathbf{X}\hat{\boldsymbol\beta} + \mathbf{Z}\hat{\mathbf{b}}$ gives the group-specific (co…” |

</details>

<details><summary><code>masii-2019s-q18</code> · gap</summary>

Tagged pages: Bayesian, Bayesian Credibility, Exponential Distribution, Maximum Likelihood Estimation, Posterior Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The likelihood of n independent observations is the product of the individual densities, so for an Exponential with mean theta it equals th… | formula | tagged | Maximum Likelihood Estimation: “$$L(\theta) = \prod_{i=1}^n f(x_i \mid \theta)$$” |
| The Exponential(theta) distribution (mean parameterization) has density (1/theta) exp(-y/theta) for y > 0. | definition | tagged | Exponential Distribution: “$$f(x) = \frac{1}{\theta}\,e^{-x/\theta}, \quad x > 0$$” |
| The posterior density is proportional to the likelihood times the prior density, and is normalized by dividing by the integral of that prod… | formula | tagged | Posterior Distribution: “$$\pi(\theta \mid \mathbf{x}) = \frac{f(\mathbf{x} \mid \theta)\,\pi(\theta)}{\int f(\mathbf{x} \mi…” |
| A Uniform(0, omega) prior has constant density 1/omega on (0, omega), which does not depend on theta and so cancels in the posterior's nume… | fact | elsewhere | Uniform Continuous Distribution: “$$f(x) = \frac{1}{b - a}, \quad a < x < b$$” |
| In a hierarchical model, the posterior of theta given omega uses the conditional prior of theta given omega, and normalization integrates o… | fact | missing |  |

</details>

<details><summary><code>masii-2019s-q19</code> · answerable</summary>

Tagged pages: Conjugate Prior, Bayesian Credibility, Beta, Binomial Distribution, Posterior Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A density proportional to p^(a-1)(1-p)^(b-1) on (0,1) is a Beta(a, b) distribution, so the parameters can be read off the exponents of p an… | fact | tagged | Beta: “$$f(x) = \frac{x^{\alpha - 1}(1-x)^{\beta - 1}}{B(\alpha,\, \beta)}$$” |
| The beta distribution is the conjugate prior for the binomial success probability: the posterior is also beta. | fact | tagged | Conjugate Prior: “\\| Bernoulli / Binomial \\| Beta$(a, b)$ \\| Beta$\left(a + \sum x_i,\; b + n - \sum x_i\right)$” |
| To update a Beta(a, b) prior with binomial data, add the total number of successes to a and the total number of failures (total trials minu… | procedure | tagged | Conjugate Prior: “\\| Bernoulli / Binomial \\| Beta$(a, b)$ \\| Beta$\left(a + \sum x_i,\; b + n - \sum x_i\right)$” |
| The mean of a Beta(a, b) distribution is a/(a+b). | formula | tagged | Beta: “$E[X] = \alpha/(\alpha + \beta)$” |

</details>

<details><summary><code>masii-2019s-q2</code> · untagged</summary>

Tagged pages: Linear Mixed Model, Covariance Structure, Model Structure, AIC, Variance Function, Model Output

| Item | Kind | Status | Where |
|---|---|---|---|
| In a linear mixed effects model the normality assumption applies to the residuals and random effects (conditional on the predictors), not t… | fact | elsewhere | Random Effects: “$$\mathbf{b} \sim N(\mathbf{0}, \mathbf{D}), \quad \boldsymbol{\varepsilon} \sim N(\mathbf{0}, \mat…” |
| Assess whether a predictor needs a nonlinear (e.g., quadratic) term by examining a plot of the response against the predictor for curvature… | procedure | linked | Residual Plot: “\\| Curved pattern \\| **Non-linearity** — a transform or polynomial term is needed \\|” |
| Compare nested or alternative models (e.g., constant variance vs. variance as a function of a covariate) using AIC and BIC, preferring the … | procedure | tagged | AIC: “**Lower AIC** indicates a better model (better fit relative to complexity)” |
| Information criteria from REML fits can be compared across models only when the fixed-effects structure is the same, which holds when model… | fact | tagged | Variance Function: “The competing models share their fixed effects, so they are compared by a [[Likelihood Ratio Test\\|…” |
| A variance function (e.g., exponential of a covariate) in a mixed model lets the residual variance change with a covariate; a variance para… | definition | tagged | Variance Function: “**variance as a function** of a covariate or of the fitted mean, e.g. the power form $\mathrm{Var}(…” |

</details>

<details><summary><code>masii-2019s-q20</code> · answerable</summary>

Tagged pages: Conjugate Prior, Bayesian, Beta, Geometric Distribution, Posterior Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| In a Gibbs sampler, the conditional posterior of one parameter is its distribution given the data and fixed (current) values of all other p… | definition | tagged | Posterior Distribution: “Drop every factor that does not involve $\theta$, multiply prior by likelihood, and recognise the f…” |
| The posterior distribution is proportional to the likelihood times the prior density, and factors free of the parameter can be dropped into… | fact | tagged | Posterior Distribution: “Drop every factor that does not involve $\theta$, multiply prior by likelihood, and recognise the f…” |
| For independent observations, the likelihood is the product of the individual probability functions; for geometric counts with probability … | formula | tagged | Posterior Distribution: “The likelihood $f(\mathbf{x} \mid \theta) = \prod f(x_i \mid \theta)$ treats the $x_i$ as independe…” |
| A Beta(alpha, beta) prior has density kernel p^{alpha-1}(1-p)^{beta-1} on 0<p<1, and the geometric likelihood is conjugate to it, giving po… | fact | tagged | Beta: “$$f(x) = \frac{x^{\alpha - 1}(1-x)^{\beta - 1}}{B(\alpha,\, \beta)}$$” |

</details>

<details><summary><code>masii-2019s-q23</code> · gap</summary>

Tagged pages: Bayesian, Conjugate Prior, Beta, Binomial Distribution, Posterior Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The posterior distribution is proportional to the likelihood times the prior density; terms not involving the parameter are dropped as cons… | procedure | tagged | Posterior Distribution: “Drop every factor that does not involve $\theta$, multiply prior by likelihood, and recognise the f…” |
| For n Binomial trials with x successes, the likelihood in the success probability is proportional to pi^x (1-pi)^(n-x). | formula | tagged | Posterior Distribution (collapsed): “\pi(q \mid x) &\propto q^{2-1}(1-q)^{18-1} \cdot q^{9}(1-q)^{41}” |
| An improper prior is a prior density that does not integrate to a finite value over the parameter space, such as the Haldane prior pi^-1(1-… | definition | missing |  |
| A Beta(a, b) density requires both shape parameters a and b to be strictly positive; a kernel pi^(a-1)(1-pi)^(b-1) with a or b equal to 0 i… | fact | tagged | Beta: “is a continuous distribution on $(0, 1)$ parameterized by shape parameters $\alpha > 0$ and $\beta …” |
| With an improper prior, the posterior can still be proper or improper depending on the data; if the posterior is improper, it has no valid … | fact | missing |  |

</details>

<details><summary><code>masii-2019s-q24</code> · untagged</summary>

Tagged pages: Hierarchical Model, Bayesian, Random Effects, Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| In a Bayesian hierarchical (random-effects) model, group-specific effects are given a prior distribution, typically Normal with mean 0 and … | definition | tagged | Hierarchical Model: “$$u_j \sim N(0, \sigma_u^2)$$” |
| Reducing the prior variance of group-specific effects tightens the prior around 0, shrinking the group effects toward the overall mean; in … | fact | tagged | Random Effects: “Unlike [[Fixed Effects\\|fixed effects]] they are treated as *draws from a distribution*, so a group…” |
| A smaller prior variance corresponds to giving more weight to the prior (lower credibility to the data), while a larger prior variance lets… | fact | elsewhere | Bayesian Bornhuetter-Ferguson Model: “For a given $M_i$, a larger $\beta_i$ is a smaller prior variance and more certainty about $M_i$. T…” |
| The residual (observation-level) error variance describes the noise in individual observations; reducing it implies the data are more relia… | fact | tagged | Credibility: “Credibility rises when risks genuinely differ from one another (large VHM) and falls when individua…” |
| The prior variances on the intercept, its hyper-mean, and the regression slope govern only those parameters (global intercept and slope coe… | fact | tagged | Random Effects: “The effects are assumed **mean zero**: the population average lives entirely in the fixed part, so …” |

</details>

<details><summary><code>masii-2019s-q28</code> · answerable</summary>

Tagged pages: Conjugate Prior, Bayesian, Beta, Binomial Distribution, Posterior Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The full conditional distribution of one variable in a Gibbs sampler is proportional to the joint distribution, so it can be found by keepi… | fact | tagged | Posterior Distribution: “Drop every factor that does not involve $\theta$, multiply prior by likelihood, and recognise the f…” |
| Obtain a posterior distribution by multiplying the likelihood by the prior density, dropping constants that do not involve the parameter, a… | procedure | tagged | Posterior Distribution: “Drop every factor that does not involve $\theta$, multiply prior by likelihood, and recognise the f…” |
| A Beta(a, b) density is proportional to theta^(a-1)(1-theta)^(b-1) on (0,1), so a kernel of the form theta^(p-1)(1-theta)^(q-1) identifies … | definition | tagged | Beta: “$$f(x) = \frac{x^{\alpha - 1}(1-x)^{\beta - 1}}{B(\alpha,\, \beta)}$$” |
| The beta prior is conjugate to the binomial likelihood: with a Beta(a, b) prior and x successes in n trials, the posterior is Beta(a + x, b… | fact | tagged | Conjugate Prior: “\\| Bernoulli / Binomial \\| Beta$(a, b)$ \\| Beta$\left(a + \sum x_i,\; b + n - \sum x_i\right)$ \\| $…” |

</details>

<details><summary><code>masii-2019s-q3</code> · answerable</summary>

Tagged pages: Limited Fluctuation Credibility, Full Credibility Standard, Coefficient of Variation

| Item | Kind | Status | Where |
|---|---|---|---|
| The limited-fluctuation full-credibility standard for claim frequency (Poisson) is lambda_F = (z_{(1+p)/2}/k)^2, where the observed amount … | formula | tagged | Full Credibility Standard: “**Frequency**, Poisson: $\sigma_N^2/\mu_N = 1$ and there is no severity term, so the standard reduc…” |
| For a given probability p and tolerance k, the standard is found using the standard normal percentile at (1+p)/2, so 99% probability uses z… | fact | tagged | Full Credibility Standard (collapsed): “$p = 0.90 \Rightarrow z_{0.95} = 1.645$, and $k = 0.05$:” |
| For aggregate loss with Poisson frequency independent of severity, the full-credibility standard in expected claims is lambda_F(1 + CV_S^2)… | formula | tagged | Full Credibility Standard: “**[[Aggregate Loss Model\\|Aggregate]]** loss with Poisson frequency: $n_F = (z/k)^2\left(1 + \mathr…” |
| The full-credibility standard for claim severity is lambda_F times CV_S^2, i.e., the aggregate standard with the frequency component (the 1… | formula | tagged | Full Credibility Standard: “**Severity**: $n_F = (z/k)^2 \cdot \mathrm{CV}_X^2$ claims, where $\mathrm{CV}_X = \sigma_X/\mu_X$ …” |
| To get the severity standard from a known aggregate standard, first use the aggregate formula to solve for CV_S^2 given the frequency stand… | procedure | tagged | Full Credibility Standard: “$n_F = (z/k)^2\left(1 + \mathrm{CV}_X^2\right)$ claims” |

</details>

<details><summary><code>masii-2019s-q30</code> · answerable</summary>

Tagged pages: Bayes Theorem, Bayesian Credibility, Conditional Probability, The Law of Total Probability, Posterior Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| Bayes' theorem: the posterior probability of a class given an observation equals the prior probability times the likelihood of the observat… | formula | tagged | Bayes Theorem: “$$= \frac{P(E \mid H)\,P(H)}{\displaystyle\sum_{i} P(E \mid H_i)\,P(H_i)}$$” |
| To update a prior over risk classes after observing a claim, use the prior class proportions as prior probabilities and each class's claim … | procedure | tagged | Posterior Distribution (collapsed): “The posterior probabilities are $0.12281/0.20513 = 0.5987$ (good) and $0.08232/0.20513 = 0.4013$ (b…” |
| The predictive probability of a future claim is the posterior-weighted average of the claim probabilities of each class (law of total proba… | procedure | tagged | Posterior Distribution: “E[N_2 \mid N_1 = 1] &= 0.5987(0.2) + 0.4013(0.6) \\” |
| Given the risk class, a driver's claim occurrences in different policy years are independent, so the previous year's claim affects next yea… | fact | tagged | Posterior Distribution: “The likelihood $f(\mathbf{x} \mid \theta) = \prod f(x_i \mid \theta)$ treats the $x_i$ as independe…” |

</details>

<details><summary><code>masii-2019s-q38</code> · gap</summary>

Tagged pages: K-Nearest Neighbors, Supervised Learning, Bias-Variance Tradeoff, Test Error

| Item | Kind | Status | Where |
|---|---|---|---|
| To classify a test point with K-nearest neighbors, find the K training points closest in the predictor value to the test point and assign t… | procedure | tagged | K-Nearest Neighbors: “$\hat{P}(Y = j \mid x_0) = \frac{1}{K}\sum_{i \in \mathcal{N}_K(x_0)} \mathbf{1}(y_i = j)$, predict…” |
| The test error rate of a classifier is the proportion of test observations whose predicted class differs from the actual class. | definition | tagged | Test Error: “$$\text{Test error rate} = \text{Ave}\left(I(y_0 \neq \hat{y}_0)\right)$$” |
| The Bayes classifier assigns each observation to the class with the highest conditional probability given the predictor value, Pr[Y=j \| X=… | definition | tagged | K-Nearest Neighbors: “$\hat{P}(Y = j \mid x_0) = \frac{1}{K}\sum_{i \in \mathcal{N}_K(x_0)} \mathbf{1}(y_i = j)$, predict…” |
| At a given x, the Bayes classifier's error probability is 1 - max_j Pr[Y=j \| X=x], which for two classes equals min{p, 1-p}. | formula | elsewhere | Classification Tree (collapsed): “For two classes $G = 2\hat{p}(1-\hat{p})$ and $E = \min(\hat{p}, 1-\hat{p})$.” |
| The Bayes error rate on a test set is computed by averaging the Bayes error probabilities min{p, 1-p} evaluated at the test x values (the e… | procedure | missing |  |

</details>

<details><summary><code>masii-2019s-q39</code> · untagged</summary>

Tagged pages: Boosting, Tree Ensemble, Decision Tree

| Item | Kind | Status | Where |
|---|---|---|---|
| A boosted tree model's prediction is the sum of the predictions of the individual trees, each multiplied by the shrinkage (learning rate) p… | formula | tagged | Boosting: “$$\hat{f}(x) = \sum_{b=1}^{B}\lambda\hat{f}^{b}(x)$$” |
| To get a regression tree's prediction for a record, start at the root and follow the branch whose split condition the record's predictor va… | procedure | elsewhere | Regression Tree (collapsed): “Each prediction follows the splits to a leaf and returns that leaf's training mean.” |
| The learning rate (shrinkage parameter) lambda in boosting is a small positive constant that scales down each tree's contribution so the mo… | definition | tagged | Boosting: “\\| $\lambda$ \\| shrinkage / learning rate \\| 0.01–0.001; smaller needs larger $B$ \\|” |

</details>

<details><summary><code>masii-2019s-q4</code> · gap</summary>

Tagged pages: Bühlmann-Straub Credibility, Empirical Bayes Credibility, Expected Value of Process Variance, Variance of Hypothetical Means

| Item | Kind | Status | Where |
|---|---|---|---|
| When risks have unequal exposures, use the Bühlmann-Straub model and nonparametric empirical Bayes to estimate the credibility parameters f… | procedure | tagged | Bühlmann-Straub Credibility: “Parameters $v$ and $a$ are typically estimated from the data using **empirical Bayes** methods” |
| The expected value of the process variance is estimated by pooling the within-risk sample variances, weighting each by its degrees of freed… | formula | tagged | Empirical Bayes Credibility: “$$\hat{v} = \frac{1}{r(n-1)}\sum_{i=1}^{r}\sum_{j=1}^{n}\left(X_{ij} - \bar{X}_i\right)^{2}$$” |
| In the Bühlmann-Straub model, the overall mean is estimated as the exposure-weighted average of the risks' sample means: mu-hat = sum m_i x… | formula | missing |  |
| The variance of the hypothetical means is estimated as a-hat = [sum m_i (x-bar_i - mu-hat)^2 - (r-1) v-hat] / [m - sum m_i^2 / m], where r … | formula | missing |  |
| The Bühlmann(-Straub) credibility factor is Z_i = m_i / (m_i + k) with k = v/a, and the credibility estimate of a risk's mean is Z_i times … | formula | tagged | Bühlmann-Straub Credibility: “$$\text{Estimate} = Z \cdot \bar{X}_w + (1-Z) \cdot \mu$$” |
| To predict aggregate losses for a future period, multiply the credibility-estimated per-exposure mean by the future period's exposure. | procedure | missing |  |

</details>

<details><summary><code>masii-2019s-q40</code> · gap</summary>

Tagged pages: Principal Components Analysis, Loading Vector, Unsupervised Learning, Correlation

| Item | Kind | Status | Where |
|---|---|---|---|
| In a PCA biplot of standardized (scaled) variables, the angle between two variables' loading arrows approximates their correlation: a small… | fact | missing |  |
| When PCA is run on unscaled (centered only) variables, the variables with the largest variances dominate the first principal component, so … | fact | linked | Principal Components Regression: “Standardize each predictor before computing the components. Otherwise the high-variance variables d…” |
| Scaling variables to unit standard deviation before PCA removes the dominance of high-variance variables, so scaled and unscaled biplots of… | fact | linked | Principal Components Regression: “Standardize each predictor before computing the components. Otherwise the high-variance variables d…” |
| PCA is performed on centered data, so a biplot score shows an observation's deviation from each variable's mean; it shows whether a value i… | fact | missing |  |
| A biplot displays both observations (as principal component scores) and variables (as loading vectors) on the same axes for the first two p… | definition | missing |  |

</details>

<details><summary><code>masii-2019s-q41</code> · answerable</summary>

Tagged pages: Principal Components Analysis, Loading Vector, Proportion of Variance Explained

| Item | Kind | Status | Where |
|---|---|---|---|
| Principal components are constructed in order of decreasing variance, so the first principal component has the largest sample variance and … | fact | tagged | Proportion of Variance Explained: “PVE is **decreasing in $m$** by construction” |
| The sum of squared scores of a principal component over the observations equals n times (or, for centered data, proportional to) the sample… | fact | tagged | Proportion of Variance Explained: “$\lambda_m$ is the variance of the $m$-th score vector — the eigenvalue attached to the $m$-th [[Lo…” |
| The loading vectors of different principal components are orthogonal, so the dot product of any two loading vectors is zero. | fact | tagged | Loading Vector: “and the two directions are orthogonal, $\boldsymbol{\phi}_1\cdot\boldsymbol{\phi}_2 = 0.2184+0.2750…” |
| Each principal component loading vector is normalized to unit length, so the sum of its squared loadings equals 1. | fact | tagged | Loading Vector: “$$\text{subject to } \sum_{j=1}^{p}\phi_{jm}^{2} = 1$$” |
| The loadings of a principal component are the coefficients of the variables in the linear combination that defines the component, and the s… | definition | tagged | Loading Vector: “$$z_{im} = \phi_{1m}x_{i1} + \phi_{2m}x_{i2} + \cdots + \phi_{pm}x_{ip}$$” |

</details>

<details><summary><code>masii-2019s-q42</code> · answerable</summary>

Tagged pages: K-Means Clustering, Clustering, Unsupervised Learning

| Item | Kind | Status | Where |
|---|---|---|---|
| In K-means clustering, each iteration assigns every observation to the cluster whose centroid is nearest in Euclidean distance, then recomp… | procedure | tagged | K-Means Clustering: “**Update**: compute each cluster centroid as the mean of its assigned observations” |
| The K-means algorithm has converged when an iteration produces no change in cluster assignments, and the centroids at that point are the fi… | fact | tagged | K-Means Clustering: “Repeat steps 2–3 until assignments do not change (convergence)” |
| The centroid of a cluster is the vector of coordinate-wise means of the observations in that cluster. | definition | tagged | K-Means Clustering: “**Update**: compute each cluster centroid as the mean of its assigned observations” |
| The Euclidean distance between points x and y is the square root of the sum of squared differences across all coordinates. | formula | linked | Similarity and Distance Measures: “$$d_{\text{Euc}}(\mathbf{u}, \mathbf{v}) = \sqrt{\sum_{j=1}^{p} (u_j - v_j)^2}$$” |

</details>

<details><summary><code>masii-2019s-q5</code> · untagged</summary>

Tagged pages: Bühlmann-Straub Credibility, Limited Fluctuation Credibility, Partial Credibility, Full Credibility Standard

| Item | Kind | Status | Where |
|---|---|---|---|
| Under limited-fluctuation credibility, partial credibility is Z = sqrt(n / n_full), where n is the actual (expected) number of claims and n… | formula | tagged | Limited Fluctuation Credibility: “Partial credibility uses the **square root rule**: $Z = \sqrt{n/n_{\text{full}}}$ when $n < n_{\tex…” |
| When the full-credibility standard is expressed in claims but exposure is given in earned car years, convert exposure to expected claims by… | procedure | tagged | Full Credibility Standard: “A standard stated in claims converts to exposures by dividing by the expected claim frequency per e…” |
| The credibility-weighted estimate is Z times the policyholder's observed mean plus (1 - Z) times the prior/portfolio mean (complement of cr… | formula | tagged | Limited Fluctuation Credibility: “$$\text{Estimate} = 0.70(0.85) + 0.30(0.75) = 0.595 + 0.225 = 0.820$$” |
| In Bühlmann and Bühlmann-Straub credibility, k = EPV / VHM (expected value of process variance divided by variance of hypothetical means). | formula | tagged | Bühlmann-Straub Credibility: “$$k = \frac{v}{a}, \quad v = E[\sigma^2(\theta)], \quad a = \text{Var}(\mu(\theta))$$” |
| In Bühlmann-Straub credibility, Z = m / (m + k), where m is the policyholder's total exposure (e.g., earned car years). | formula | tagged | Bühlmann-Straub Credibility: “$$Z = \frac{m}{m + k}$$” |
| The observed claim frequency of a policyholder is its total claims divided by its total exposure. | definition | elsewhere | Frequency: “$$\text{Frequency} = \frac{\text{Number of Claims}}{\text{Earned Exposures}}$$” |

</details>

<details><summary><code>masii-2019s-q6</code> · answerable</summary>

Tagged pages: Partial Credibility, Limited Fluctuation Credibility, Full Credibility Standard

| Item | Kind | Status | Where |
|---|---|---|---|
| Under limited-fluctuation credibility, the full credibility standard is the expected number of claims at which the probability that the obs… | definition | tagged | Full Credibility Standard: “It is the smallest expected claim count $n_F$ for which the observed value stays within $100k\%$ of…” |
| For Poisson claim frequency with normal approximation, the full credibility standard for aggregate loss is lambda_F = (z/k)^2 (1 + CV_sever… | formula | tagged | Full Credibility Standard: “**[[Aggregate Loss Model\\|Aggregate]]** loss with Poisson frequency: $n_F = (z/k)^2\left(1 + \mathr…” |
| The coefficient of variation of severity is the standard deviation of severity divided by its mean, so its square equals the severity varia… | definition | linked | Coefficient of Variation: “The **Coefficient of Variation** $CV$ is the ratio of the standard deviation to the mean, measuring…” |
| The standard normal percentile z used for a probability p two-sided interval is the value at (1+p)/2 (e.g., 2.576 for p = 0.99). | fact | tagged | Full Credibility Standard (collapsed): “$p = 0.90 \Rightarrow z_{0.95} = 1.645$, and $k = 0.05$:” |
| Under the square root rule, partial credibility is Z = sqrt(expected number of claims / full credibility standard), capped at 1. | formula | tagged | Partial Credibility: “$$Z = \min\left(\sqrt{\frac{n}{n_F}},\; 1\right)$$” |
| The expected number of claims for a block equals the number of policies (exposures) times the mean claim frequency per policy. | procedure | tagged | Full Credibility Standard: “A standard stated in claims converts to exposures by dividing by the expected claim frequency per e…” |

</details>

<details><summary><code>masii-2019s-q7</code> · untagged</summary>

Tagged pages: Bayesian Credibility, Conjugate Prior, Predictive Distribution, Gamma, Posterior Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The gamma distribution is the conjugate prior for the Poisson likelihood, so the posterior for the Poisson mean is also gamma. | fact | tagged | Conjugate Prior: “\\| Poisson$(\lambda)$ \\| Gamma$(\alpha, \theta)$ \\| Gamma$\left(\alpha + \sum x_i,\; \frac{\theta}{…” |
| For a Poisson mean with gamma prior (shape alpha, scale theta) and observed total claims of sum x_i over n exposures, the posterior is gamm… | formula | tagged | Conjugate Prior: “Posterior: Gamma with $\alpha^* = \alpha + \sum x_i = 2 + 1 = 3$ and $\theta^* = \dfrac{\theta}{1 +…” |
| The mean of a gamma distribution with shape alpha and scale theta is alpha times theta. | formula | tagged | Gamma: “$E[X] = \alpha\theta$, $\text{Var}(X) = \alpha\theta^2$, and coefficient of variation $CV = 1/\sqrt…” |
| The Bayesian estimate of next-period expected claims (the predictive mean) equals the posterior mean of the Poisson parameter, since the ex… | fact | tagged | Predictive Distribution: “The Bayesian credibility estimate is its mean: $E[X_{n+1} \mid \mathbf{x}] = E_\theta\!\left[\mu(\t…” |
| When risks are i.i.d. with a common parameter, subgroup (cohort) breakdowns carry no extra information, so the posterior can be computed fr… | fact | elsewhere | Sufficient Statistic: “\\| $\text{Poi}(\lambda)$ \\| $\lambda$ \\| $\sum_{i=1}^n X_i$ \\|” |
| Convert claim frequency per risk to total observed claims by multiplying by the number of risks, and scale the per-risk expected frequency … | procedure | elsewhere | Frequency: “$$\text{Frequency} = \frac{\text{Number of Claims}}{\text{Earned Exposures}}$$” |

</details>

<details><summary><code>masii-2019s-q8</code> · answerable</summary>

Tagged pages: Bühlmann-Straub Credibility, Expected Value of Process Variance, Variance of Hypothetical Means, Conjugate Prior, Exact Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| In the Bühlmann-Straub model, the credibility factor is Z = P/(P + k), where P is the total exposure over the observed periods and k = v/a. | formula | tagged | Bühlmann-Straub Credibility: “$$Z = \frac{m}{m + k}$$” |
| The expected value of process variance v is the expected value of the conditional variance of the claim count given the risk parameter, and… | definition | tagged | Expected Value of Process Variance: “$$v = \mathrm{EPV} = E_\Theta\!\left[\mathrm{Var}(X \mid \Theta)\right]$$” |
| For a Poisson distribution with mean λ, both the hypothetical mean and the process variance equal λ, so v = E[λ] and a = Var(λ). | fact | tagged | Expected Value of Process Variance (collapsed): “For a Poisson risk, $\mathrm{Var}(X \mid \Theta) = \lambda$, so” |
| A gamma distribution with shape α and rate θ has mean α/θ and variance α/θ². | formula | tagged | Variance of Hypothetical Means (collapsed): “$$\mu = E[\Lambda] = \alpha\theta = 4(0.05) = 0.20$$” |
| In the Poisson-gamma model, k = v/a equals the gamma rate parameter θ, so the shape parameter α cancels and Z depends on θ but not on α. | fact | tagged | Variance of Hypothetical Means (collapsed): “For the Gamma-Poisson, $k$ is always $1/\theta$, and $Z = n/(n + 1/\theta)$ reproduces the Bayesian…” |
| The credibility factor depends only on exposures and the structural parameters (v and a), not on the observed claim counts; observed claims… | fact | tagged | Bühlmann-Straub Credibility: “$$\text{Estimate} = Z \cdot \bar{X}_w + (1-Z) \cdot \mu$$” |

</details>

<details><summary><code>masii-2019s-q9</code> · answerable</summary>

Tagged pages: Linear Mixed Model, Random Effects, Covariance Structure

| Item | Kind | Status | Where |
|---|---|---|---|
| A linear mixed model has the form y = Xβ + Zb + ε, with fixed effects β and random effects b that have a specified distribution, so that be… | definition | tagged | Random Effects: “$$\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \mathbf{Z}\mathbf{b} + \boldsymbol{\varepsilon}$$” |
| A marginal model specifies only the mean and covariance structure of the responses without conditioning on subject-specific effects, so its… | definition | linked | Fixed Effects: “**Fixed effects** are the regression coefficients in a [[Linear Mixed Model]] that describe the *po…” |
| Integrating the random effects out of a linear mixed model gives the implied marginal model, with mean Xβ and marginal covariance ZGZ' + R. | procedure | tagged | Linear Mixed Model: “**Marginal mean**: $E[\mathbf{y}] = \mathbf{X}\boldsymbol{\beta}$; **marginal covariance**: $\text{…” |
| The implied marginal model still describes the distribution of the population mean (the fixed-effect mean structure Xβ), but it loses the s… | fact | tagged | Linear Mixed Model: “**Marginal mean**: $E[\mathbf{y}] = \mathbf{X}\boldsymbol{\beta}$; **marginal covariance**: $\text{…” |

</details>

<details><summary><code>masii-an-001</code> · answerable</summary>

Tagged pages: Frequency, Limited Fluctuation Credibility, Partial Credibility, Full Credibility Standard

| Item | Kind | Status | Where |
|---|---|---|---|
| Claim frequency is the number of claims divided by the number of exposures (e.g., car-years). | definition | tagged | Frequency: “$$\text{Frequency} = \frac{\text{Number of Claims}}{\text{Earned Exposures}}$$” |
| Under limited fluctuation credibility with partial credibility, Z = sqrt(n/n_F), where n is the observed number of claims and n_F is the fu… | formula | tagged | Partial Credibility: “$$Z = \min\left(\sqrt{\frac{n}{n_F}},\; 1\right)$$” |
| Measure the observed quantity in the same units as the full-credibility standard (e.g., use the number of claims when the standard is state… | procedure | tagged | Partial Credibility: “$n$ is the observed volume and $n_F$ the [[Full Credibility Standard]], both in the same units (cla…” |
| The credibility-weighted estimate is Z times the observed experience plus (1 - Z) times the complement of credibility (the prior or related… | formula | tagged | Limited Fluctuation Credibility: “$$\text{Estimate} = Z \cdot \bar{X} + (1-Z) \cdot \mu_0$$” |

</details>

<details><summary><code>masii-an-002</code> · untagged</summary>

Tagged pages: Severity, Bühlmann Credibility, Expected Value of Process Variance, Variance of Hypothetical Means

| Item | Kind | Status | Where |
|---|---|---|---|
| The Bühlmann credibility parameter is K = EVPV / VHM, the expected value of the process variance divided by the variance of the hypothetica… | formula | tagged | Bühlmann Credibility: “$$Z = \frac{n}{n + k}, \quad k = \frac{v}{a}$$” |
| The Bühlmann credibility factor is Z = N / (N + K), where N is the number of observations. | formula | tagged | Bühlmann Credibility: “$$Z = \frac{n}{n + k}, \quad k = \frac{v}{a}$$” |
| The Bühlmann credibility estimate is Z times the observed mean plus (1 − Z) times the prior mean. | formula | tagged | Bühlmann Credibility: “$$\text{Estimate} = Z \cdot \bar{X} + (1-Z) \cdot \mu$$” |
| When estimating average claim severity, each claim is one observation, so N is the number of claims (not exposures) and the process varianc… | procedure | elsewhere | Exact Credibility (collapsed): “The risk has $4$ claims totalling $\$6{,}000$.…Here $\mu(\Theta) = \Theta$ and $\sigma^2(\Theta) = …” |

</details>

<details><summary><code>masii-an-003</code> · answerable</summary>

Tagged pages: Risk Experience, Bühlmann Credibility, Expected Value of Process Variance, Variance of Hypothetical Means

| Item | Kind | Status | Where |
|---|---|---|---|
| The Bühlmann credibility factor is Z = N/(N+K), where N is the number of observations (exposure periods) in the policyholder's experience. | formula | tagged | Bühlmann Credibility: “$$Z = \frac{n}{n + k}, \quad k = \frac{v}{a}$$” |
| The Bühlmann credibility parameter is K = EPV / VHM, the expected value of the process variance divided by the variance of the hypothetical… | formula | tagged | Bühlmann Credibility: “\\| $k = v/a$ \\| Bühlmann credibility parameter \\| Ratio of process variance to structural variance …” |
| The Bühlmann credibility estimate is Z times the policyholder's observed average plus (1 − Z) times the collective (prior) mean. | formula | tagged | Bühlmann Credibility: “$$\text{Estimate} = Z \cdot \bar{X} + (1-Z) \cdot \mu$$” |
| When the loss is annual and the policyholder has several years of experience, each year counts as one observation, so N equals the number o… | procedure | tagged | Bühlmann Credibility (collapsed): “Three years of observations give $\bar{X} = 50$ and the overall mean is $\mu = 40$.…$Z = n/(n+k) = …” |

</details>

<details><summary><code>masii-an-004</code> · answerable</summary>

Tagged pages: Exposure Base, Bühlmann-Straub Credibility, Frequency

| Item | Kind | Status | Where |
|---|---|---|---|
| In Bühlmann-Straub credibility, the credibility factor is Z = m/(m + K), where m is the risk's total exposure and K is the credibility cons… | formula | tagged | Bühlmann-Straub Credibility: “$$Z = \frac{m}{m + k}$$” |
| The exposure m in the Bühlmann-Straub credibility factor must be measured in the same unit as K (e.g., car-years), and total exposure over … | fact | tagged | Bühlmann-Straub Credibility: “$$m = \sum_{i=1}^n m_i$$” |
| The credibility-weighted estimate is Z times the risk's observed experience plus (1 − Z) times the prior mean (class or collective mean). | formula | tagged | Bühlmann-Straub Credibility: “$$\text{Estimate} = Z \cdot \bar{X}_w + (1-Z) \cdot \mu$$” |

</details>

<details><summary><code>masii-an-005</code> · answerable</summary>

Tagged pages: Residual, Correlogram, Autocorrelation Function, White Noise, Seasonality

| Item | Kind | Status | Where |
|---|---|---|---|
| If a time series model has captured the dependence in the data, its residuals behave like white noise, with no autocorrelations outside the… | fact | tagged | Residual: “If the model has captured the dependence they are [[White Noise\\|white noise]]: no spike in the [[C…” |
| A correlogram plots the sample autocorrelation at each lag, with approximate 95% bounds of ±2/√n used to judge whether an autocorrelation i… | definition | tagged | Correlogram: “**A correlogram** is the plot of the sample autocorrelations $r_k$ of a [[Time Series\\|time series]…” |
| At 95% bounds, roughly 1 in 20 autocorrelations is expected to fall outside the bounds by chance alone, so a small number of marginal excee… | fact | tagged | Correlogram: “The bounds are pointwise $95\%$ limits, so about $1$ lag in $20$ crosses them by chance. A marginal…” |
| A significant residual autocorrelation at the seasonal lag (e.g., lag 12 for monthly data) indicates a seasonal pattern that the fitted mod… | fact | tagged | Correlogram: “One at lag $12$ (monthly) or $4$ (quarterly) suggests a seasonal term.” |
| Insufficient autoregressive order shows up as significant residual autocorrelation at short lags (e.g., lag 2 for an AR(1) fit), not as an … | fact | tagged | Correlogram: “A spike at lag $1$ or $2$ suggests an extra AR or MA term.” |
| A remaining trend (non-stationarity) shows in the correlogram as autocorrelations that decay slowly across many lags, not as a single spike. | fact | tagged | Correlogram: “slow, near-linear decay from close to $1$ means a trend or other non-stationarity” |
| A correlogram measures linear correlation between observations at different lags and does not assess the distribution (e.g., normality) of … | fact | tagged | Autocorrelation Function: “The **autocorrelation function (ACF)** gives the correlation between a [[Time Series]] and itself $…” |

</details>

<details><summary><code>masii-an-006</code> · answerable</summary>

Tagged pages: BIC, Summary Statistics, AIC, Linear Mixed Model

| Item | Kind | Status | Where |
|---|---|---|---|
| AIC equals -2 times the maximized log-likelihood plus 2 times the number of estimated parameters; the model with the lowest AIC is preferre… | formula | tagged | AIC: “$$\text{AIC} = -2\ell(\hat{\boldsymbol{\beta}}) + 2p$$” |
| BIC (Schwarz criterion) equals -2 times the maximized log-likelihood plus the number of estimated parameters times the natural log of the n… | formula | tagged | BIC: “$$\text{BIC} = -2\ell(\hat{\boldsymbol{\beta}}) + p\ln(n)$$” |
| BIC's per-parameter penalty (ln n) exceeds AIC's penalty of 2 whenever n is greater than about 7.4, so BIC penalizes extra parameters more … | fact | tagged | BIC: “BIC tends to select **simpler models** than AIC for large $n$ since $\ln(n) > 2$ when $n > 7$” |
| The penalty in BIC uses the natural logarithm of the sample size, not the base-10 logarithm. | fact | tagged | BIC: “$$\text{BIC} = -2\ell(\hat{\boldsymbol{\beta}}) + p\ln(n)$$” |

</details>

<details><summary><code>masii-an-007</code> · untagged</summary>

Tagged pages: Statistical Learning, Mean Square Error, Bias-Variance Tradeoff, Test Error

| Item | Kind | Status | Where |
|---|---|---|---|
| Var(ε), the irreducible error, is a lower bound on the expected test MSE of any model, however flexible, because no estimate of f can predi… | fact | tagged | Mean Square Error: “$\text{Var}(\varepsilon)$ is the **irreducible error**: the expected test MSE can never lie below i…” |
| As model flexibility increases, training MSE decreases monotonically because the fitting procedure minimises it. | fact | tagged | Bias-Variance Tradeoff: “Training error is not a guide — it falls monotonically with complexity.” |
| As flexibility increases, test MSE typically falls and then rises in a U-shape, since bias drops at first and then the growth in variance o… | fact | tagged | Test Error: “By the [[Bias-Variance Tradeoff\\|bias-variance tradeoff]], test error is U-shaped in flexibility: b…” |
| A model overfits when it has a small training MSE but a less flexible model would have yielded a smaller test MSE. | definition | elsewhere | Overfitting: “James et al. (ISLR, §2.2.1) describe it as a method that yields a small training [[Mean Square Erro…” |

</details>

<details><summary><code>masii-an-008</code> · untagged</summary>

Tagged pages: Bootstrap, Sampling Distribution, Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| The nonparametric bootstrap approximates the sampling distribution of a statistic by repeatedly drawing samples of the same size with repla… | definition | tagged | Bootstrap: “The **bootstrap** estimates the sampling variability of a statistic by resampling the observed data…” |
| The bootstrap estimate of the standard error of a statistic is the standard deviation of the statistic's values across the bootstrap resamp… | fact | tagged | Bootstrap (collapsed): “Draw $B = 1{,}000$ samples of 250 claims with replacement, compute the 95th percentile of each, and…” |
| The bootstrap standard error is SE_B = sqrt( (1/(B-1)) * sum over r of (estimate_r - mean of the B estimates)^2 ), using divisor B-1 (the s… | formula | tagged | Bootstrap: “$$\mathrm{SE}_B(\hat{\alpha}) = \sqrt{\frac{1}{B-1}\sum_{r=1}^{B}\left(\hat{\alpha}^{*r} - \bar{\ha…” |
| The sample median is the middle value of the ordered observations (average of the two middle values when the count is even) and can serve a… | definition | elsewhere | Median: “The **sample median** is the middle [[Order Statistics\\|order statistic]], or the average of the tw…” |

</details>

<details><summary><code>masii-an-009</code> · answerable</summary>

Tagged pages: Out-of-Bag Error, Bagging, Bootstrap

| Item | Kind | Status | Where |
|---|---|---|---|
| A bootstrap sample of size n drawn with replacement omits a given observation with probability (1 - 1/n)^n, approximately e^-1 ≈ 0.368, so … | fact | tagged | Out-of-Bag Error: “$$P(\text{observation } i \notin \text{ resample } b) = \left(1 - \frac{1}{n}\right)^{n} \xrightarr…” |
| An observation is out of bag (OOB) for a tree if it was not included in that tree's bootstrap sample, so each observation is out of bag for… | definition | tagged | Out-of-Bag Error: “Each observation is out-of-bag for roughly $0.368B$ of the $B$ trees” |
| To compute the OOB prediction for an observation, average the predictions (or take a majority vote for classification) of only the trees fo… | procedure | tagged | Out-of-Bag Error: “each observation is predicted using only the trees that did not see it, and those predictions are s…” |
| The OOB error estimate is obtained by computing the error (e.g., MSE) of the OOB predictions over all observations in the training data, wi… | procedure | tagged | Out-of-Bag Error: “It requires **no extra fitting** — the estimate falls out of the fit that was happening anyway” |
| With B sufficiently large, the OOB error is virtually equivalent to the leave-one-out cross-validation error, without requiring any model r… | fact | tagged | Out-of-Bag Error: “With $B$ large it is essentially equivalent to leave-one-out [[Cross-Validation]], at a fraction of…” |

</details>

<details><summary><code>masii-an-010</code> · untagged</summary>

Tagged pages: Variable Importance, Residual Sum of Squares, Bagging

| Item | Kind | Status | Where |
|---|---|---|---|
| In a bagged model, the variable importance of a predictor is the total reduction in RSS from all splits on that predictor, averaged over th… | definition | tagged | Variable Importance: “**Impurity-based**: total reduction in [[Residual Sum of Squares]] (regression) or [[Gini Index]] (…” |
| To compute a predictor's importance, sum the RSS reductions of every split on that predictor within each tree, add these sums across trees,… | procedure | tagged | Variable Importance: “$$\mathrm{Imp}(X_j) = \frac{1}{B}\sum_{b=1}^{B}\ \sum_{\text{splits on } X_j \text{ in tree } b} \D…” |
| A tree that never splits on a predictor contributes zero to that predictor's importance, but the tree still counts in the divisor B. | fact | elsewhere | Node Impurity (collapsed): “\text{Days to report} &= \frac{0 + 0.030 + 0.012}{3} \\” |
| The residual sum of squares (RSS) reduction of a regression tree split is the decrease in RSS achieved by dividing a node's observations in… | definition | elsewhere | Node Impurity (collapsed): “**Split A** reduces the RSS by $96$, against $75$ for split B.” |

</details>

<details><summary><code>masii-an-011</code> · untagged</summary>

Tagged pages: Residual Sum of Squares, Decision Tree

| Item | Kind | Status | Where |
|---|---|---|---|
| Recursive binary splitting grows a regression tree by choosing, at each step, the predictor and cutpoint that divide the observations into … | procedure | tagged | Residual Sum of Squares: “recursive binary splitting compares only splits of the form $X_j < s$ versus $X_j \geq s$, and make…” |
| In a regression tree, the prediction for every observation in a region is the mean of the training responses in that region. | fact | tagged | Decision Tree: “**Regression tree prediction:** $\hat{y} = \frac{1}{\\|R_m\\|}\sum_{i \in R_m} y_i$ for region $R_m$” |
| The residual sum of squares of a region is the sum of squared differences between each response in the region and the region's mean respons… | formula | tagged | Residual Sum of Squares: “$\bar{y}_L = 6$; RSS$_L = (5-6)^2+(7-6)^2+(6-6)^2 = 1+1+0 = 2$.” |
| To evaluate a candidate cutpoint, split the observations into the region with predictor below the cutpoint and the region with predictor at… | procedure | elsewhere | Regression Tree: “a split on predictor $X_j$ at cutpoint $s$ sends $R_1(j,s) = \{X \mid X_j < s\}$ to one branch and …” |

</details>

<details><summary><code>masii-an-012</code> · answerable</summary>

Tagged pages: Neural Network, Hidden Layer, Activation Function

| Item | Kind | Status | Where |
|---|---|---|---|
| In a single-hidden-layer neural network, each hidden unit's activation is A_k = g(w_k0 + sum_j w_kj X_j), a nonlinear activation applied to… | formula | tagged | Hidden Layer: “$$A_k = g\!\left(w_{k0} + \sum_{j=1}^{p} w_{kj}X_j\right)$$” |
| The ReLU (rectified linear unit) activation is g(z) = max(0, z), returning zero for negative inputs and z otherwise. | definition | tagged | Neural Network: “**ReLU** (Rectified Linear Unit): $g(z) = \max(0, z)$ — most common in modern networks” |
| For a quantitative response with a linear output layer, the network prediction is f(X) = beta_0 + sum_k beta_k A_k, an intercept plus a wei… | formula | tagged | Hidden Layer: “$$f(X) = \beta_0 + \sum_{k=1}^{K}\beta_k A_k$$” |
| To compute a neural network prediction (forward pass), first compute each hidden unit's linear combination and apply the activation, then f… | procedure | linked | Backpropagation: “**Forward pass** computes the activations layer by layer and the loss;” |

</details>

<details><summary><code>masii-an-013</code> · answerable</summary>

Tagged pages: Activation Function, Hidden Layer, Neural Network

| Item | Kind | Status | Where |
|---|---|---|---|
| If the activation function is the identity, each hidden unit is a linear combination of the inputs and the output is a linear combination o… | fact | tagged | Activation Function: “Compose two linear layers and you get a linear layer**: $W_2(W_1 x) = (W_2W_1)x$.” |
| A single-hidden-layer network with p predictors and K hidden units has K(p+1) weights (including biases) into the hidden layer and K+1 para… | formula | tagged | Hidden Layer: “A layer of $K$ units fed by $m$ inputs has $K(m + 1)$ weights.” |
| Each hidden unit's activation is A_k = g(w_k0 + sum_j w_kj X_j), a nonlinear function g applied to a linear combination of the inputs, and … | formula | tagged | Hidden Layer: “$$A_k = g\!\left(w_{k0} + \sum_{j=1}^{p} w_{kj}X_j\right)$$” |
| Hidden units are derived features (like basis functions) that are neither inputs nor targets; unlike splines or other fixed basis functions… | fact | tagged | Hidden Layer: “The layer is "hidden" because the $A_k$ are never observed: they are neither in the data nor target…” |

</details>

<details><summary><code>masii-an-014</code> · gap</summary>

Tagged pages: Backpropagation, Neural Network

| Item | Kind | Status | Where |
|---|---|---|---|
| In a single-hidden-layer neural network for a quantitative response, the model output is f(x) = β0 + Σ βk Ak, a linear combination of the h… | definition | elsewhere | Hidden Layer: “$$f(X) = \beta_0 + \sum_{k=1}^{K}\beta_k A_k$$” |
| The squared-error objective for one observation is R_i(θ) = ½(y_i − f_θ(x_i))², where the ½ is included so the derivative has no factor of … | definition | missing |  |
| Use the chain rule to get the gradient of the loss with respect to an output-layer weight: dR/dβk = (dR/df)(df/dβk) = −(y − f(x))·Ak. | procedure | tagged | Backpropagation (collapsed): “$$\frac{\partial \hat y}{\partial w} = A = 2 \;\Rightarrow\; \frac{\partial L}{\partial w} = -4(2) …” |
| A gradient-descent update moves a parameter against the gradient: θ ← θ − ρ·∂R/∂θ, where ρ is the learning rate. | formula | tagged | Backpropagation: “$$w \leftarrow w - \eta\,\frac{\partial L}{\partial w}$$” |

</details>

<details><summary><code>masii-an-015</code> · answerable</summary>

Tagged pages: Extended Linear Model, Regularization, Generalized Linear Model

| Item | Kind | Status | Where |
|---|---|---|---|
| Regularization fits the same GLM structure (distribution, link, linear predictor) but minimizes deviance plus a penalty on coefficient size… | definition | tagged | Regularization: “**Regularization** adds a penalty on coefficient size to the fitting criterion, shrinking estimates…” |
| Increasing the penalty parameter lambda shrinks coefficients toward zero, and at lambda equal to zero the penalized model reduces to the or… | fact | tagged | Regularization: “$\lambda = 0$ returns least squares; $\lambda \to \infty$ drives every coefficient to zero.” |
| The lasso (absolute-value, L1) penalty can set some coefficients exactly to zero, performing variable selection, whereas the ridge (squared… | fact | tagged | Regularization: “**Lasso** ($\ell_1$) sets some coefficients exactly to zero, so it performs [[Variable Selection]] …” |
| The elastic net penalty is a weighted average of the lasso (sum of absolute coefficients) and ridge (half the sum of squared coefficients) … | definition | tagged | Regularization: “**Elastic net** mixes the two penalties, keeping lasso's selection while handling correlated predic…” |
| The intercept term is not included in the regularization penalty, so the overall level of predictions is fit to the data and not shrunk tow… | fact | tagged | Regularization: “The intercept is left unpenalized” |
| Regularization stabilizes coefficient estimates when predictors are highly correlated, preventing very large coefficients, and lasso-type p… | fact | tagged | Regularization: “With correlated predictors it shrinks their coefficients toward each other rather than choosing one” |
| Choose lambda (and the elastic net mixing weight) by cross-validation, selecting the value that gives the best out-of-sample performance. | procedure | tagged | Regularization: “$\lambda$ is chosen by [[Cross-Validation]]” |

</details>

<details><summary><code>masii-an-016</code> · answerable</summary>

Tagged pages: Confusion Matrix

| Item | Kind | Status | Where |
|---|---|---|---|
| Build a confusion matrix from the total number of cases, the number of actual positives, the number flagged positive, and the number of fla… | procedure | tagged | Confusion Matrix (collapsed): “$TP = 45$, $FP = 90 - 45 = 45$, $FN = 60 - 45 = 15$, $TN = 1000 - 45 - 45 - 15 = 895$.” |
| Specificity (the true negative rate) is the proportion of actual negatives that the model correctly classifies as negative. | definition | tagged | Confusion Matrix: “\\| **Specificity** (TNR) \\| $\dfrac{TN}{TN + FP}$ \\| of the actual negatives, how many were left al…” |
| Specificity = TN / (TN + FP), where TN is true negatives and FP is false positives. | formula | tagged | Confusion Matrix: “\\| **Specificity** (TNR) \\| $\dfrac{TN}{TN + FP}$ \\| of the actual negatives, how many were left al…” |

</details>

<details><summary><code>masii-an-017</code> · answerable</summary>

Tagged pages: AUROC, Confusion Matrix

| Item | Kind | Status | Where |
|---|---|---|---|
| Sensitivity (true positive rate) is the proportion of actual positives that are classified as positive at a given threshold, and specificit… | definition | tagged | Confusion Matrix: “\\| **Sensitivity** (recall, TPR) \\| $\dfrac{TP}{TP + FN}$ \\| of the actual positives, how many were…” |
| The ROC curve plots sensitivity (vertical axis) against 1 - specificity (horizontal axis) as the discrimination threshold varies. | definition | tagged | AUROC: “**ROC Curve**: plot of **True Positive Rate (Sensitivity)** vs. **False Positive Rate (1 − Specific…” |
| To construct the ROC curve from predicted probabilities, lower the threshold past each predicted value in order from highest to lowest, and… | procedure | tagged | AUROC: “**ROC Curve**: plot of **True Positive Rate (Sensitivity)** vs. **False Positive Rate (1 − Specific…” |
| AUROC is computed as the area under the ROC curve by summing trapezoid areas between successive curve points. | procedure | linked | Gini Index (collapsed): “Estimate the Gini index using the trapezoid rule.” |
| AUROC equals the probability that a randomly chosen actual positive receives a higher predicted score than a randomly chosen actual negativ… | fact | tagged | AUROC: “AUROC equals the probability that the model ranks a randomly chosen positive **higher** than a rand…” |
| An AUROC of 0.5 corresponds to a model with no discrimination ability (random guessing), and values closer to 1 indicate better discriminat… | fact | tagged | AUROC: “\\| 0.5 \\| No predictive power: the ROC curve follows the line of equality \\|” |

</details>

<details><summary><code>masii-an-018</code> · answerable</summary>

Tagged pages: Lift, Quantile Plot

| Item | Kind | Status | Where |
|---|---|---|---|
| In a quantile plot, records in a holdout set are sorted by predicted value into equal-sized groups (quantiles), and the average predicted a… | definition | tagged | Quantile Plot: “A **quantile plot** (or lift chart by predicted quantile) sorts a held-out dataset by predicted los…” |
| Lift of a model is the vertical distance between the first and last quantiles of the quantile plot, i.e., how well the model separates the … | definition | tagged | Lift: “Among the measures of model lift, **lift** itself is the vertical distance between the first and la…” |
| Compute a model's lift from the actual (not predicted) values by dividing the actual value in the last quantile by the actual value in the … | procedure | tagged | Lift: “$$L_{\text{ratio}} = \frac{Y_Q}{Y_1}$$” |
| A model's predicted values rise across its own quantiles by construction, so the spread of predictions does not show real lift; only the ac… | fact | tagged | Lift: “$Y_1$ and $Y_Q$ are the **actual** target rates in the first and last quantiles, the buckets the mo…” |

</details>

<details><summary><code>masii-an-019</code> · gap</summary>

Tagged pages: Quantile Plot, Lift

| Item | Kind | Status | Where |
|---|---|---|---|
| To build a simple quantile plot, sort holdout data by the model's predicted loss cost into quantiles of equal exposure, then compare the av… | procedure | tagged | Quantile Plot: “A **quantile plot** (or lift chart by predicted quantile) sorts a held-out dataset by predicted los…” |
| A quantile plot is judged on three criteria: predictive accuracy, monotonicity, and lift (vertical distance between the first and last quan… | fact | tagged | Quantile Plot: “Three criteria pick the winning model: **predictive accuracy** — does each bucket's actual match it…” |
| Predictive accuracy in a quantile plot is how closely the actual values track the predicted values within each quantile. | definition | tagged | Quantile Plot: “**predictive accuracy** — does each bucket's actual match its predicted level?” |
| Monotonicity means the actual values consistently rise (or fall) from one quantile to the next without reversals. | definition | tagged | Quantile Plot: “**monotonicity** — do the actuals rise across the buckets (small reversals are okay)?” |
| Lift is the model's ability to separate the best from the worst risks, measured by the spread (e.g., ratio) of actual values between the lo… | definition | tagged | Quantile Plot: “That vertical distance is the model's **[[Lift\\|lift]]**: a large difference between the actual pur…” |
| A model whose predictions exceed actuals at the high end and fall short at the low end has overly extreme predictions, indicating poorer ac… | fact | missing |  |
| Two models can be compared using simple quantile plots on the same holdout data; a double lift chart is a more direct comparison but not re… | fact | tagged | Quantile Plot: “Two models are compared on their two quantile plots; a [[Double Lift Chart]] compares them directly” |

</details>

<details><summary><code>masii-an-020</code> · answerable</summary>

Tagged pages: Double Lift Chart, Predictive Accuracy

| Item | Kind | Status | Where |
|---|---|---|---|
| A double lift chart compares two models' predictions to actual loss cost by sorting the data on the ratio of the two models' predictions, g… | definition | tagged | Double Lift Chart: “A **double lift chart** compares two candidate models directly by sorting the data on the *ratio* o…” |
| In a double lift chart sorted by the ratio of proposed to current predictions, the lowest quantile holds risks the proposed model rates bes… | fact | tagged | Double Lift Chart: “Sorting on the ratio isolates the risks the two models **disagree** about — the left buckets are wh…” |
| To pick the better model from a double lift chart, compare each model's predicted value to the actual value in each quantile; the model who… | procedure | tagged | Double Lift Chart: “The winner is the model whose curve tracks the **actual** line across the buckets; the loser bends …” |
| A double lift chart differs from a simple quantile plot, which sorts on a single model's predictions and so shows that model's best and wor… | fact | linked | Quantile Plot: “A **quantile plot** (or lift chart by predicted quantile) sorts a held-out dataset by predicted los…” |
| A model's predictions being stable or close to the average across quantiles does not make it better; model quality is judged by how well pr… | fact | tagged | Double Lift Chart (collapsed): “The current model's flat curve is the signature of the loser: the disagreement is real signal, and …” |

</details>

<details><summary><code>masii-an-021</code> · answerable</summary>

Tagged pages: Predictive Accuracy, Gini Index

| Item | Kind | Status | Where |
|---|---|---|---|
| The Lorenz curve for a rating model plots cumulative share of exposure (x-axis) against cumulative share of loss (y-axis), with records sor… | definition | tagged | Gini Index: “Sort the holdout data by predicted loss cost, **lowest first**, and plot the cumulative share of ex…” |
| The line of equality is the 45-degree line from (0,0) to (1,1) representing a model with no segmentation power; the area under it is 0.5. | definition | tagged | Gini Index: “A model that ranks nothing puts losses in proportion to exposure, so $L(x) = x$ and Gini $= 0$” |
| The Gini index equals twice the area between the line of equality and the Lorenz curve, i.e. G = 2(0.5 - area under the curve) = 1 - 2 × (a… | formula | tagged | Gini Index: “The Gini index is twice the area between that Lorenz curve and the line of equality:” |
| The area under the Lorenz curve by the trapezoidal method is the sum over segments of (x_j - x_{j-1})(y_{j-1} + y_j)/2, using the cumulativ… | procedure | tagged | Gini Index (collapsed): “\int_0^1 L(x)\,dx &\approx 0.25\left[\tfrac{0 + 0.10}{2} + \tfrac{0.10 + 0.30}{2} + \tfrac{0.30 + 0…” |
| Compute the Lorenz curve points by accumulating exposure and loss over the sorted predicted-loss-cost groups and dividing by total exposure… | procedure | tagged | Gini Index (collapsed): “The cumulative loss shares at $x = 0.25, 0.50, 0.75, 1.00$ are $L = 0.10, 0.30, 0.60, 1.00$.” |

</details>

<details><summary><code>masii-an-022</code> · answerable</summary>

Tagged pages: Partial Autocorrelation Function, Autocorrelation Function, Autoregressive Model

| Item | Kind | Status | Where |
|---|---|---|---|
| The ACF of a moving average MA(q) process cuts off to zero after lag q, so an ACF that decays gradually without cutting off rules out a pur… | fact | tagged | Autocorrelation Function: “an MA($q$) process has $\rho_k = 0$ for $k > q$ — the ACF **cuts off** after lag $q$. An AR($p$) pr…” |
| The PACF of an AR(p) process is zero beyond lag p, while its ACF tails off gradually (decays), so a PACF that cuts off after lag p together… | fact | tagged | Partial Autocorrelation Function: “an AR($p$) process has PACF **cutting off** after lag $p$; an MA($q$) has a PACF that **tails off**” |
| Identify an ARMA-type model by reading the sample ACF and PACF together: find which function cuts off (stays within the significance bounds… | procedure | tagged | Partial Autocorrelation Function: “\\| AR($p$) \\| tails off \\| **cuts off after $p$** \\|” |
| Sample autocorrelations and partial autocorrelations are judged significant at approximately the 95% level if they lie outside ±2/√n, where… | formula | linked | Cross-Correlation: “so values outside $\pm 2/\sqrt{n}$ point to a real relationship” |
| A random walk is non-stationary, and its sample ACF decays very slowly from values near 1, so it does not fit a stationary series whose ACF… | fact | linked | Random Walk: “Its [[Autocorrelation Function\\|ACF]] decays extremely slowly and near-linearly, the classic visual…” |
| An AR(1) process has a PACF that is zero beyond lag 1, so a significant partial autocorrelation at lag 2 rules out AR(1). | fact | tagged | Partial Autocorrelation Function: “The PACF at lag 2 is 0, correctly reporting no direct link” |

</details>

<details><summary><code>masii-an-024</code> · answerable</summary>

Tagged pages: Credibility, Complement of Credibility, Bühlmann Credibility, Expected Value of Process Variance, Variance of Hypothetical Means, Limited Fluctuation Credibility, Full Credibility Standard

| Item | Kind | Status | Where |
|---|---|---|---|
| The credibility-weighted estimate is Z times the observed experience plus (1 - Z) times the complement of credibility, where Z is the weigh… | formula | tagged | Credibility: “$$\text{Estimate} = Z \times \text{Experience} + (1 - Z) \times \text{Complement}$$” |
| The Bühlmann credibility factor is Z = n/(n + K), where K = EPV/VHM. | formula | tagged | Bühlmann Credibility: “$$Z = \frac{n}{n + k}, \quad k = \frac{v}{a}$$” |
| The expected value of the process variance (EPV) measures the average variability of individual risks' results, and the variance of the hyp… | definition | tagged | Expected Value of Process Variance: “is the average within-risk variance in a [[Bühlmann Credibility]] model — how noisy a single risk's…” |
| In Bühlmann credibility, a larger VHM (with EPV and n fixed) lowers K and so raises Z, while a larger EPV raises K and lowers Z. | fact | tagged | Variance of Hypothetical Means: “**Large $a$** means the risks are genuinely heterogeneous, so a risk's own experience is worth a lo…” |
| The limited fluctuation full credibility standard for claim counts is n_full = (z_{(1+p)/2} / k)^2, where p is the probability level and k … | formula | tagged | Full Credibility Standard: “**Frequency**, Poisson: $\sigma_N^2/\mu_N = 1$ and there is no severity term, so the standard reduc…” |
| Under limited fluctuation credibility, partial credibility is given by the square root rule Z = sqrt(n / n_full), capped at 1. | formula | tagged | Credibility: “Partial credibility uses the **square root rule**, $Z = \sqrt{n / n_{\text{full}}}$, capped at $1$” |
| A tighter tolerance raises the full credibility standard in proportion to 1/k^2, so halving k quadruples n_full and halves Z under the squa… | fact | tagged | Full Credibility Standard (collapsed): “Tightening to $k = 0.025$ quadruples it to 4,330 claims.” |

</details>

<details><summary><code>masii-an-025</code> · untagged</summary>

Tagged pages: Variable Selection, Likelihood Ratio Test, Restricted Maximum Likelihood, Maximum Likelihood Estimation, Fixed Effects, Linear Mixed Model

| Item | Kind | Status | Where |
|---|---|---|---|
| Likelihood ratio tests comparing models that differ in their fixed effects must use ML log-likelihoods, because REML likelihoods of models … | fact | tagged | Restricted Maximum Likelihood: “compare models differing in their *fixed* effects with **ML**, because the REML likelihoods are the…” |
| REML maximizes the likelihood of the residuals (error contrasts) left after removing the fixed effects, rather than the likelihood of the f… | definition | tagged | Restricted Maximum Likelihood: “estimates the [[Variance Components\\|variance components]] of a [[Linear Mixed Model]] from the par…” |
| The likelihood ratio test statistic is the difference between the -2 log-likelihoods of the reduced and full nested models, and is compared… | formula | tagged | Likelihood Ratio Test: “$r$ is the number of **restrictions** — the difference in free parameters between the full and redu…” |
| A categorical variable with k levels (one reference level) enters a linear model as k-1 indicator variables, so it adds k-1 fixed-effect pa… | fact | tagged | Fixed Effects: “Each fixed effect costs **one parameter per level** (less the baseline), so a factor with many leve…” |
| Reject the reduced model if the LRT statistic exceeds the 95th percentile of the chi-square distribution (or the p-value is below 0.05); ot… | procedure | tagged | Likelihood Ratio Test: “Reject $H_0$ (the reduced model) when $-2\ln\Lambda$ exceeds the upper-$\alpha$ point of $\chi^2_r$” |
| The 50:50 mixture of chi-square distributions applies only when testing a variance (covariance) parameter on the boundary of its parameter … | fact | elsewhere | Model Selection: “A test that a variance component is zero puts the null hypothesis on the boundary of the parameter …” |
| REML-based likelihood ratio tests are appropriate for comparing covariance structures when the fixed effects are the same in both models, a… | fact | elsewhere | Covariance Structure: “Compare nested structures with a [[Likelihood Ratio Test]] fitted by [[Restricted Maximum Likelihoo…” |
| Adding parameters to a nested model never increases the -2 log-likelihood under ML, so a smaller -2 log-likelihood alone does not justify t… | fact | tagged | Variable Selection: “not by raw RSS, $R^2$ or deviance, which always improve as predictors are added” |

</details>

Nothing here edits the vault. A gap is fixed from the syllabus reading, in general form — never by copying the question's own numbers onto the page — and the edited page is fact checked again (docs/verification.md).
