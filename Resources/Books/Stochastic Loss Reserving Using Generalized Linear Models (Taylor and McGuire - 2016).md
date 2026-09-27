---
Title: "Stochastic Loss Reserving Using Generalized Linear Models"
Authors: "Greg Taylor and Gráinne McGuire"
Publisher: "Casualty Actuarial Society"
Year: "2016"
date: "2016"
Type: "Monograph"
Code: "CAS Monograph No. 3"
ISBN: "978-0-9968897-1-1"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/7_Taylor.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b9d3fb02a99763e72ac210f8de588a5fb057151391cf9e1366cbff5ba0393d9a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Stochastic Loss Reserving Using Generalized Linear Models (Taylor and McGuire - 2016).md
---
![[Stochastic Loss Reserving Using Generalized Linear Models (Taylor and McGuire - 2016) - Cover.svg]]

A CAS monograph that formulates the chain ladder, and the statistical distribution of its loss reserve, as generalized linear models. Its purpose is to provide access to GLMs for loss reserving, beginning with a strong emphasis on the chain ladder: it identifies the two families of stochastic model that generate the chain ladder algorithm, estimates the reserve's prediction error by the delta method and the bootstrap, reviews the diagnostics GLM software provides for testing the model, and constructs extensions where the model fails. Each chapter opens with a short summary, and one workers compensation paid-loss triangle is used throughout. It is Number 3 in the CAS Monograph Series.

> [!info] On the syllabus
> - [[Exam 7 (CAS)|Exam 7]] — objectives A9–A12; Chapters 1–6, including errata.

## Foreword

## 1 The Chain Ladder Algorithm
- 1.1 Introduction
    - The chain ladder long existed as an algorithm rather than a model; Hachemeister and Stanard (1975) defined a stochastic model for which chain ladder estimation is maximum likelihood, and Taylor (2015) showed that all such models can be represented as [[Generalized Linear Model|generalized linear models]].
    - The monograph sets out to describe the formal models for which the [[Chain Ladder Method|chain ladder]] gives a maximum likelihood forecast of the loss reserve, how they estimate [[Prediction Error|prediction error]], how GLM output tests whether the chain ladder represents the data, and extensions natural to the GLM framework.
- 1.2 Framework and Notation
    - Observations $Y_{kj}$ sit in a $K \times J$ rectangle with accident periods $k = 1, \ldots, K$ as rows and development periods $j = 1, \ldots, J$ as columns, $J \le K$; the past observations form a development trapezoid (a [[Development Triangle|triangle]] when $J = K$), and the problem is to predict its complement.
    - The $d$-th diagonal, $k + j - 1 = d$, holds the experience of one calendar period; diagonals are called experience periods.
    - $X_{kj}$ are the cumulative row sums, $R_k$ the outstanding losses of accident period $k$ and $R$ their total.
- 1.3 Data for Numerical Examples
    - One triangle is used throughout: the incremental paid losses of the New Jersey Manufacturers Group's workers compensation, accident years 1988–1997, from the database of Meyers and Shi (2011).
    - Other triangles are named: cumulative paid, incurred (cumulative or incremental), and counts of reported, finalized and unfinalized claims.
- 1.4 The Chain Ladder Algorithm
    - [[Age to Age Factor|Age-to-age factors]] $\hat f_{kj} = X_{k,j+1}/X_{kj}$ are averaged down each column; with weights proportional to $X_{kj}$ the average is the volume-weighted factor, and forecasts chain the latest cumulative amount through the factors.
    - The schema is only an algorithm: no model expressing the observations in terms of parameters has yet been formulated.
- 1.5 Numerical Example
    - The example triangle was chosen because its age-to-age factors are roughly constant down each column, so it is compatible with the formal chain ladder models of Chapter 3.
- 1.6 Common Chain Ladder Extensions
    - Every forecast for an accident year is proportional to its paid losses to date, so the latest year's forecast rests on a single observation; forecasts built on a budget ultimate $B_k$ reduce that sensitivity.
    - The [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] forecast takes $B_k$ as earned premium times a budget loss ratio; the [[Cape Cod Method|Cape Cod]] forecast uses one loss ratio for every year, a weighted average of the chain ladder's loss ratios (its formula is corrected in the errata).

## 2 Stochastic Models
- 2.1 Exponential Dispersion Family
    - 2.1.1 The Exponential Dispersion Family in General
        - A GLM assumes each observation follows a member of the [[Exponential Family|exponential dispersion family]], with canonical parameter $\theta$, dispersion parameter $\phi$ and cumulant function $b$; its mean is $b'(\theta)$ and its variance $a(\phi)V(\mu)$, where $V$ is the [[Variance Function|variance function]].
    - 2.1.2 The Tweedie Sub-Family
        - The [[Tweedie Distribution|Tweedie]] sub-family restricts the variance function to $V(\mu) = \mu^p$ with $p \le 0$ or $p \ge 1$; the normal ($p = 0$), over-dispersed Poisson ($p = 1$), gamma ($p = 2$) and inverse Gaussian ($p = 3$) are members.
        - Tail heaviness increases with $p$, so residuals more widely dispersed than a model allows suggest increasing $p$.
    - 2.1.3 The Over-Dispersed Poisson Sub-Family
        - The [[Over-Dispersed Poisson Model|over-dispersed Poisson]] (ODP) is the Tweedie case $p = 1$: $Y/\phi$ is Poisson with mean $\mu/\phi$, so $E[Y] = \mu$ and $\mathrm{Var}[Y] = \phi\mu$. It is often a convenient assumption when little is known of the distribution, but it requires validation against the data.
- 2.2 Generalized Linear Models (GLMs)
    - 2.2.1 Definition
        - A GLM has independent observations from an exponential dispersion family member with $h(\mu_i) = x_i^T\beta$ for a [[Link Function|link function]] $h$; dispersion is usually $\phi_i = \phi/w_i$ with known weights $w_i$.
        - Selecting a GLM means choosing the error distribution (and with it the Tweedie index $p$), the covariates and the link; parameters are estimated by [[Maximum Likelihood Estimation|maximum likelihood]] in software such as SAS, R or Emblem.
    - 2.2.2 Categorical and Continuous Covariates
        - A [[Categorical Predictor|categorical variate]] with $m$ levels, such as development year, enters as $m$ 0–1 variates and can introduce redundant parameters; a continuous variate enters as itself or through basis functions such as linear splines.
    - 2.2.3 Goodness-of-Fit and Deviance
        - The principal measure of fit is the scaled [[Deviance|deviance]], twice the log-likelihood of the saturated model less that of the fitted model; maximizing likelihood minimizes deviance, and the scale parameter is estimated from the unscaled deviance $D^*$ as $\hat\phi = D^*/(n - p)$.
    - 2.2.4 Residuals
        - The standardized [[Pearson Residual|Pearson residual]] $(Y_i - \hat Y_i)/\hat\sigma_i$ reproduces any non-normality in the observations; the standardized [[Deviance Residual|deviance residual]] removes much of it and is often more useful, as histograms from an Australian auto bodily injury model show.
        - A separate [[Residual Plot|residual plot]] against each covariate checks for unbiasedness and homoscedasticity.
    - 2.2.5 Outliers and the Use of Weights
        - [[Heteroscedasticity]] seen in residual plots is corrected by weights roughly in inverse proportion to the residuals' variance; an [[Outlier|outlier]] can be excluded with a zero weight, with care, since exclusion also affects the estimate of prediction error.
    - 2.2.6 Forecasts
        - Future observations carry their own covariate vectors, forming the forecast design matrix $X^*$, and the forecast is $\hat Y^* = h^{-1}(X^*\hat\beta)$.

## 3 Stochastic Models Supporting the Chain Ladder
> $$Y_{kj} \sim \mathrm{ODP}(\mu_{kj}, \phi)$$
>
> $$\mu_{kj} = \exp(\ln\alpha_k + \ln\beta_j)$$

- 3.1 Mack Models
    - 3.1.1 Non-Parametric Mack Model
        - Mack (1993) assumes independent accident years, cumulative losses forming a Markov chain, $E[X_{k,j+1} \mid X_{kj}] = f_jX_{kj}$ and $\mathrm{Var}[X_{k,j+1} \mid X_{kj}] = \sigma_j^2X_{kj}$; the chain ladder factors are then unbiased, and minimum variance among unbiased linear combinations of the $\hat f_{kj}$ ([[Mack Chain Ladder Model]]).
    - 3.1.2 Parametric Mack Models
        - The EDF Mack model gives $Y_{k,j+1} \mid X_{kj}$ an exponential dispersion family distribution; Taylor (2011) showed (Theorem 3.1) that in the ODP Mack model with column-only dispersion the chain ladder factors and forecasts are [[Minimum Variance|minimum variance unbiased]] estimators.
- 3.2 Cross-Classified Models
    - The EDF cross-classified model has independent incremental $Y_{kj}$ with $E[Y_{kj}] = \alpha_k\beta_j$ and $\sum_j \beta_j = 1$ to remove the redundancy between row and column parameters.
    - In the ODP cross-classified model with one dispersion parameter for every cell, the maximum likelihood fitted values and forecasts equal the chain ladder's (Theorem 3.2, England and Verrall 2002), and corrected for bias they are minimum variance unbiased (Theorem 3.3).
    - The likelihood equations are marginal-sum equations: each row and column total of fitted values equals the observed total. Solved for the example data they reproduce the chain ladder forecasts, total outstanding losses of 373,346 (\$000).
    - Mack models apply to cumulative data and cross-classified models to incremental data.
- 3.3 GLM Representation of Chain Ladder Models
    - 3.3.1 ODP Mack Model
        - The ODP Mack model is a GLM whose response is $\hat f_{kj} - 1$, with an identity link, development year as a categorical variate and weight $X_{kj}$.
    - 3.3.2 ODP Cross-Classified Model
        - The ODP cross-classified model is a GLM whose response is $Y_{kj}$, with ODP error, a log link pre-ordained by the multiplicative mean, and parameters $\ln\alpha_k$ and $\ln\beta_j$.
        - Software removes the redundancy by aliasing a parameter (setting $\ln\beta_1 = 0$); rescaling the estimates recovers $\sum_j\beta_j = 1$ without changing any fitted value.
    - 3.3.3 Numerical Example
        - Both GLMs, fitted to the example data in SAS, reproduce the chain ladder's average age-to-age factors and the cross-classified model's parameters.
- 3.4 Minor Variations of Chain Ladder
    - 3.4.1 Reliance on Only Recent Experience Years
        - Using only the most recent $m$ experience years sets a zero weight on every other observation in the ODP Mack GLM, $w_{kj} = X_{kj}\,I(K + 1 - m \le k + j \le K)$.
    - 3.4.2 Outlier Observations
        - A zero weight deletes an observation from the fit in any model, so outliers can be excluded the same way.

## 4 Prediction Error
- 4.1 Parameter Error and Process Error
    - 4.1.1 Individual Observations
        - A forecast's prediction error splits into [[Parameter Risk|parameter error]], the true mean less its forecast, and [[Process Risk|process error]], the noise in the future observation; the two are independent when past data and future noise are.
    - 4.1.2 Loss Reserves
        - The same split holds for any linear combination of future cells, such as the total reserve or one accident year's.
- 4.2 Mean Square Error of Prediction
    - 4.2.1 Definition
        - The mean square error of prediction (MSEP) is $E[e^2]$; with independent components it is the expected squared parameter error plus the expected squared process error.
    - 4.2.2 Goodness-of-Fit and Prediction Error
        - Better fit does not necessarily reduce MSEP: too many parameters over-fit the noise and destabilize the forecasts, so error on a test set first falls and then rises as complexity grows ([[Bias-Variance Tradeoff]]).
- 4.3 Information Criteria
    - Information criteria stand in for test-set error: the scaled deviance plus a penalty on the number of parameters, $2p$ for the [[AIC]] and $p\ln n$ for the [[BIC]] (with a small-sample AICc); the model with the lower value is preferred.
- 4.4 Generalized Cross-Validation
    - Generalized cross-validation approximates leave-one-out [[Cross-Validation|cross-validation]] for a linear model, penalizing fit by the trace of the [[Hat Matrix|hat matrix]], the effective number of parameters.
- 4.5 Model Error
    - [[Model Risk|Model error]], the gap between the true functional form and the one assumed, is a third component that cannot be estimated from the data alone; O'Dowd, Smith and Hardy (2005) score its causes subjectively and map the scores to CoVs.
    - It is outside the monograph's scope but may dominate: at one large insurer it was about three-quarters of total prediction error.

## 5 The Bootstrap
- 5.1 Background
    - GLM software reports standard errors and correlations of the parameter estimates alongside the estimates; for the example ODP cross-classified model, the aliased $\ln\beta_1$ has none.
- 5.2 Delta Method
    - 5.2.1 Uni-Dimensional
        - To second order, $\mathrm{Var}[f(X)] \approx \sigma^2 f'(\mu)^2$.
    - 5.2.2 Multi-Dimensional
        - For a vector, $\mathrm{Var}[Y] = D\,\mathrm{Var}[X]\,D$ with $D$ the diagonal matrix of first derivatives.
    - 5.2.3 Application to Loss Reserving
        - Parameter error of the forecast is $D X^*\,\mathrm{Var}[\hat\beta]\,X^{*T} D$; for the ODP, process error is $\hat\phi$ times the diagonal matrix of forecasts; their sum is the MSEP, and 0–1 vectors pick out an accident year or the total.
- 5.3 The Bootstrap
    - The delta method leaves an unquantified higher-order error and gives no distribution, yet quantiles are needed, for example for a reserve at a stated probability of adequacy; assuming a lognormal reserve risks error at high probabilities. The [[Bootstrap|bootstrap]] estimates the whole distribution.
    - 5.3.1 Semi-Parametric Bootstrap
        - Standardized residuals, which must be approximately iid, are resampled to build pseudo-data; refitting the same model to each pseudo-data set gives pseudo-forecasts whose spread is parameter error, and resampled noise added to them gives process error.
        - It is called semi-parametric (elsewhere in the actuarial literature, non-parametric) because it makes no distributional assumption but relies on a fitted model; excluding outliers reduces its estimate of dispersion.
    - 5.3.2 Parametric Bootstrap
        - Parameter replicates are drawn from the multivariate normal $N(\hat\beta, \hat C)$, via a Cholesky or spectral decomposition of $\hat C$, and process error from the GLM's own distribution; it is simpler and faster, but more dubious for small samples or a poor error structure.
- 5.4 Numerical Examples
    - 5.4.1 Delta Method
        - For the ODP cross-classified model the total reserve of 373,346 has a root MSEP of 14,076 (\$000), a coefficient of variation of prediction of 3.8%; independent accident years would give 10,275, so the difference is positive correlation between years. The ODP Mack model forecasts the same reserve but not the same error.
    - 5.4.2 Bootstrap
        - 10,000 parametric bootstrap replications, with a scale parameter of 114.5, give a mean of 374,992 and a root MSEP of 14,286, very close to the delta method.

## 6 Model Validation
- 6.1 Introduction
    - Validation examines whether the distributional assumptions and fitted effects describe the data: the distribution, the goodness of fit, and out-of-sample performance, which is not usually possible for triangle models.
    - The mean is relatively insensitive to the choice of distribution but the variance is not; the authors fit a reasonable distribution and link first, fit the main effects, check residuals for gross violations, improve the fit of the cell means, then review the distribution in detail.
- 6.2 Summary of Assumptions and Tests
    - The link is validated when the other tests pass without an undue number of interactions; the distribution by a [[PP Plot|P-P plot]], residual plots by accident, development and calendar period, and histograms; goodness of fit by actual-and-expected and residual plots in each direction; interactions by a 2-D heat map of actual/expected.
- 6.3 Diagnostic Graphs
    - Every diagnostic compares actual with expected; the chapter uses only standardized deviance residuals, for their greater normality.
    - 6.3.1 Scatterplot
        - A trend in residuals plotted against a variable indicates poor fit; fanning indicates wrong dispersion assumptions.
    - 6.3.2 Spread Plot
        - The 25th and 75th percentiles and standard deviation of the residuals by a variable; the standard deviation of standardized residuals should vary randomly about one.
    - 6.3.3 Actual and Expected Comparison Plots
        - Actual and expected totals by accident, development or calendar period, logged if the scale calls for it.
    - 6.3.4 Actual and Expected Ratio Plots
        - Systematic departures of actual/expected from 100% mark regions of poor fit.
    - 6.3.5 Actual and Expected Ratio 2-D Heat Map
        - Each cell's actual/expected ratio is coloured by its departure from 100%; clumps of one colour show missing [[Interaction|interactions]] or calendar period terms.
    - 6.3.6 Probability-Probability Plot
        - The fitted ODP cdf at each observation is plotted against its empirical proportion and should lie near $y = x$; a [[QQ Plot|Q-Q plot]] needs observations from one distribution, so it is applied to the standardized deviance residuals instead.
    - 6.3.7 Histogram of Residuals
        - Standardized deviance residuals should be approximately standard normal.
- 6.4 Simulated Data Set and Fitted Models
    - Three simulated 20 × 20 data sets: accident and development effects with constant scale; scale varying by development period; and development effects that change for later accident periods. The Mean, Development, Full and Full weights models are fitted to them.
- 6.5 Analysis of the Goodness-of-Fit
    - Because the likelihood equations are marginal sums, actual and expected totals agree exactly in every direction the model has parameters for, so those plots show nothing there; residual plots still do.
    - 6.5.1 Identifying Interactions
        - When a heat map's clusters sit in accident and development groups rather than along whole diagonals, the missing effect is an accident–development interaction, not a [[Calendar Year Effect|calendar period effect]].
- 6.6 Analysis of the Distribution Assumptions
    - With a scale that truly varies by development period, the Full model's residuals fan out and its P-P plot departs from the line; refitting with weights that carry the correct variation by development period removes the problem. A different distribution, such as gamma, should also be considered, and there is no particular test for the link.
- 6.7 Model Validation for Real Data
    - 6.7.1 Initial Check of Distribution Assumptions
        - For the example data the P-P plot departs systematically but not unusably from the line; residuals spread more in development years 1 and 2, and residuals by calendar year suggest a problem.
    - 6.7.2 Goodness-of-Fit
        - The calendar year comparison looks satisfactory, but the heat map shows missing interactions between accident year and development years 1 and 2; the heat map should always be checked in a reserving model.

## 7 Model Extensions
- 7.1 Chain Ladder Model Revisited
- 7.2 Generalized Additive Models
- 7.3 Accident Year Trend
- 7.4 Development Pattern
- 7.5 Calendar Year Trend
- 7.6 Interactions
- 7.7 Tail Smoothing and Extension
    - 7.7.1 Tail Extension
    - 7.7.2 Tail Smoothing
- 7.8 Exposure-Based Methods
- 7.9 Beyond a Single Triangle
    - 7.9.1 Bootstrapping a Compound Model
- 7.10 Individual Models
- 7.11 Bayesian Models

## 8 Conclusion

## References

## Errata
- Page 7, last line of the second paragraph: should read $Y_{k1}\,(= X_{k1})$.
- Page 7, last dot point: the Cape Cod forecast is $B_k = P_k\sum_i P_i\omega_i[(X_{i,K-i+1} + \hat R_i)/P_i] / \sum_i P_i\omega_i$ with $\omega_i = 1/(\hat f_{K-i+1}\cdots\hat f_{J-1})$.
- Page 9, Table 2-1, Inverse Gaussian row: $b(\theta)$ is $-(-2\theta)^{1/2}$, not $-(-2\theta)^{-1/2}$.
- Page 9, the sentence after Table 2-1: add "where $n$ and $v$ are additional parameters providing alternative representations of $\phi$".
- Page 9, equation (2-5): the factor $\alpha(\phi)$ should be $a(\phi)$.
- Page 10, equations (2-12) and (2-13) are incorrect and are deleted; (2-9) holds for $p \ne 1, 2$ and (2-10) for $p \ne 1$. For $p = 1$, $b(\theta) = e^\theta$ and $\mu = e^\theta$; for $p = 2$, $b(\theta) = -\ln(-\theta)$ and $\mu = -1/\theta$.
- Page 11, Table 2-2, Gamma row: $b(\theta)$ is $-\ln(-\theta)$, not $\ln(-\theta)$.
- Page 11, equation (2-15): replaced by $\exp c(y, \phi) = \phi^{-y/\phi}\,[(y/\phi)!]^{-1}$.
- Page 11, equation (2-16): replaced by $\pi(y; \mu, \phi) = (\mu/\phi)^{y/\phi}\exp(-\mu/\phi)/(y/\phi)!$.
- Page 29, equation (3-12), in sympathy with (2-16): the term $\ln(f_{j-1} - 1)$ becomes $\ln\big[(f_{j-1} - 1)/(\phi_{j-1}/X_{k,j-1})\big]$.
- Page 30, three lines after equation (3-14): $\beta = (f_1 - 1, f_2 - 1, \ldots, f_9 - 1)^T$.
- Page 49, equation (5-21): replaced by $\varepsilon^*_{proc} = \tilde Y_{proc} - \hat Y$.

## Related readings
- [[Using the ODP Bootstrap Model (Shapland - 2016)]] — the content outline assigns both for objectives A9–A11
- [[Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019)]] — the content outline assigns both for objectives A9–A11
- [[Testing the Assumptions of Age-to-Age Factors (Venter - 1998)]] — the content outline assigns both for objective A12

## Sources
- [Stochastic Loss Reserving Using Generalized Linear Models (Casualty Actuarial Society, 2016)](https://www.casact.org/sites/default/files/2021-03/7_Taylor.pdf) — the document: title page, back-cover abstract, copyright page and ISBNs, contents, the chapter summaries, the text of Chapters 1–6 the points above are taken from, and the section headings of Chapters 7 and 8
- [Stochastic Loss Reserving Using Generalized Linear Models — Errata](https://www.casact.org/sites/default/files/2021-03/7_Taylor_Errata.pdf) — the corrections listed under Errata
- [CAS Exam 7 Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf) — the citation and the assigned scope
