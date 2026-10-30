# Answerability: Exam MAS-I (CAS)

Run `answerability-20261030-mas-i` · 225 questions checked of 225 attempted · cost $15.43

Each question's official solution was broken into the knowledge it uses (by a model that saw no study page), and each item was looked for on the pages the vault gives for the question. An item counts as taught only if a quote of the teaching passage is really on the page; the check is done in code. *Answerable* is necessary, not sufficient: a page can hold the formula and still not teach it well.

| Verdict | Questions | Share |
|---|---|---|
| **Answerable** — everything taught on a tagged page, one link away, on the exam's syllabus or on a prerequisite exam's page | 176 | 78% |
| **Untagged** — everything is in the vault, but some of it on a page neither tagged nor linked | 9 | 4% |
| **Gap** — something the solution uses is taught on no page | 40 | 18% |

Requirements: 1036 — tagged 875 (84%), linked 47 (5%), syllabus 46 (4%), prerequisite 5 (0%), elsewhere 13 (1%), missing 50 (5%)

## By sitting

A paper whose gaps far outrun the rest may test a reading the syllabus has since dropped.

| Sitting | Questions | Answerable | Untagged | Gap |
|---|---|---|---|---|
| Fall 2019 | 40 | 29 | 2 | 9 (22%) |
| Spring 2018 | 24 | 19 | 0 | 5 (21%) |
| Spring 2019 | 40 | 33 | 1 | 6 (15%) |
| Undated (samples and the vault's own) | 121 | 95 | 6 | 20 (17%) |

## Gaps, by the page that should teach them

Ranked by how many questions each page's gaps cost. The page is the one named for the item's concept; "no page" means the vault has no page by that name.

### `Concepts/Gamma.md` — 2 question(s)

- `masi-2019f-q22` (fact): The sum of independent gamma random variables sharing a common scale parameter is gamma with the same scale and shape equal to the sum of the individual shapes.
- `masi-an-073` (formula): The gamma distribution with shape α and scale θ has MGF M(t) = (1 - θt)^{-α} for t < 1/θ, for every α > 0.

### **no page for Aggregate Loss Compound Distribution** — 1 question(s)

- `masi-an-037` (fact): For a compound (aggregate) model with claim amounts independent of N and identically distributed with mean E[X], the conditional mean of aggregate losses given N is E[S \| N] = N·E[X].
- `masi-an-037` (fact): In a compound model where severities are independent of the claim count and have mean E[X], Cov(N, S) = E[X]·Var(N).

### **no page for Bias of an Estimator** — 1 question(s)

- `masi-an-036` (fact): Unbiasedness matters when estimates are averaged or pooled, since bias does not average away, and when the estimate is used in procedures built on the unbiased sample variance.

### **no page for Bonferroni Multiple Comparisons** — 1 question(s)

- `masi-an-165` (fact): The number of pairwise comparisons among k groups is k(k-1)/2, and this is the value of g used in the Bonferroni adjustment when all pairwise differences are compared.

### **no page for Exploratory Data Analysis for Regression** — 1 question(s)

- `masi-an-138` (fact): A shapeless cloud with no trend in the centre or spread of the response across the predictor indicates no association between the response and the predictor.

### **no page for F-Test in Multiple Linear Regression** — 1 question(s)

- `masi-2018s-q33` (formula): The overall F-statistic for testing that all slope coefficients are zero can be written in terms of R^2 as F = (R^2/p) / ((1 - R^2)/(n - p - 1)), where p is the number of predictors and n the number of observations.

### **no page for Gamma Distribution** — 1 question(s)

- `masi-an-072` (fact): A gamma distribution with shape alpha > 1 has an increasing hazard rate that is bounded above by 1/theta (levelling off), and a decreasing mean excess loss that approaches a constant theta.

### **no page for Indicator (Dummy) Variables in Linear Regression** — 1 question(s)

- `masi-2018s-q37` (procedure): To find coefficients under a new coding, set the new model's cell sums equal to the known cell means and solve, with the new baseline cell giving the intercept and the main effects being differences from it.

### **no page for Jensen's Inequality** — 1 question(s)

- `masi-an-031` (fact): Jensen's inequality: for a concave function g and a non-degenerate random variable Y, E[g(Y)] < g(E[Y)]; hence E[S] < sqrt(E[S^2]) = sigma, so S is biased low.

### **no page for Linearity of Expectation** — 1 question(s)

- `masi-2019s-q8` (fact): When each of N games is won independently with probability p, the expected number of wins is p times the expected number of games (linearity of expectation).

### **no page for Loglogistic Distribution** — 1 question(s)

- `masi-an-045` (formula): For the loglogistic distribution with CDF F(x) = (x/θ)^γ / (1 + (x/θ)^γ), setting F(x) = g gives (x/θ)^γ = g/(1 - g), i.e. the odds of g.

### **no page for Model Overfitting and Holdout Validation** — 1 question(s)

- `masi-an-128` (fact): Actual-to-predicted ratios that fall from above 1 in low-prediction groups to below 1 in high-prediction groups mean the model's relativities are too extreme (overfit or misspecified), so it predicts more variation than exists on new data.

### **no page for Moment Generating Function** — 1 question(s)

- `masi-an-073` (fact): A distribution has a finite MGF for some t > 0 only if its tail decays at least exponentially fast; an exponentially decaying tail e^{-x/θ} overpowers e^{tx} for t < 1/θ.

### **no page for Optimization of a Function** — 1 question(s)

- `masi-2019s-q10` (procedure): To maximize a function of a single variable, set its derivative to zero and verify it is a maximum (e.g., a downward-opening parabola attains its maximum at its vertex).

### **no page for Paired t-Test** — 1 question(s)

- `masi-2019f-q21` (procedure): A paired t-test reduces two matched samples to a single sample of within-pair differences and tests whether the mean difference equals zero.

### **no page for Poisson GLM for Claim Frequency** — 1 question(s)

- `masi-an-100` (fact): In a Poisson GLM with log link and an exposure offset, a single categorical predictor yields fitted frequencies equal to each level's observed frequency (claims divided by exposure), so relativities are ratios of one-way observed frequencies.
- `masi-an-100` (fact): A main-effects (no interaction) log-link model is multiplicative, and if the observed cell frequencies are exactly multiplicative across the two variables, the model fits every cell exactly and its MLE relativities equal the within-level frequency ratios.

### **no page for R GLM Output Interpretation** — 1 question(s)

- `masi-an-097` (fact): In R, log() is the natural logarithm, so log(x) in a model formula uses ln(x) and the coefficient multiplies ln of the variable in the units the data are measured in.

### `Concepts/Binomial Distribution.md` — 1 question(s)

- `masi-an-038` (fact): The number of successes and the number of failures among n fixed Bernoulli trials sum to n, so they are perfectly negatively correlated (negative covariance) when the success probability is strictly between 0 and 1.

### `Concepts/Bootstrap.md` — 1 question(s)

- `masi-2018s-q31` (fact): A bootstrap resample mean is bounded by the smallest and largest observed values, attained when the resample consists entirely of the minimum or entirely of the maximum observation.

### `Concepts/Box Plot.md` — 1 question(s)

- `masi-an-133` (fact): When most observations are zero, the quartiles and median are all zero, so the box plot collapses to a line with IQR 0 and every nonzero value is flagged as an outlier, making it uninformative for such data.

### `Concepts/Categorical Predictor.md` — 1 question(s)

- `masi-an-138` (fact): Two parallel bands of points with the same slope but different levels indicate a missing categorical variable, which is added as a categorical predictor that shifts the intercept for one group.

### `Concepts/Chi-Square Goodness-of-Fit Test.md` — 1 question(s)

- `masi-2019f-q20` (procedure): Under a null hypothesis specified as ratios among categories, each category's expected count equals the total observed count times its ratio divided by the sum of the ratios.

### `Concepts/Confidence Interval.md` — 1 question(s)

- `masi-2019s-q36` (formula): In simple linear regression, the 95% confidence interval for the mean response E(Y) at x0 is ŷ0 ± t(0.025, n-2)·s·sqrt(1/n + (x0 - x̄)²/Sxx).
- `masi-2019s-q36` (fact): Confidence and prediction intervals in simple linear regression are both centered on the fitted line and are narrowest at x0 = x̄, widening symmetrically toward the ends of the data range.

### `Concepts/Correlation.md` — 1 question(s)

- `masi-an-140` (fact): Correlation or regression association does not imply causation.

### `Concepts/Deductible.md` — 1 question(s)

- `masi-2018s-q7` (procedure): A p% reduction in the probability of a payment means the new probability equals (1 - p) times the original probability.

### `Concepts/Equivalence Principle.md` — 1 question(s)

- `masi-2019f-q11` (procedure): To find the effect of switching mortality tables, compute the premium under each table and take the difference (new minus original).

### `Concepts/Expected Value.md` — 1 question(s)

- `masi-an-004` (fact): Expectation preserves inequalities: if one random variable is no greater than another for every outcome, its expected value is no greater either.

### `Concepts/Exponential Distribution.md` — 1 question(s)

- `masi-2019s-q25` (procedure): For n iid exponentials with mean mu, the expected k-th order statistic is the sum of the mean gaps mu/n + mu/(n-1) + ... + mu/(n-k+1), since each gap between successive order statistics is exponential with mean mu/(number still surviving).

### `Concepts/Fisher Information.md` — 1 question(s)

- `masi-2018s-q40` (fact): The information function does not have a special feature (such as a zero or extremum) at the MLE, so it cannot be used to locate the MLE visually.

### `Concepts/Hazard Rate.md` — 1 question(s)

- `masi-2019s-q5` (fact): When the hazard rate is zero below a threshold, no probability mass lies there, so the cumulative hazard starts accumulating at the threshold and S(x)=1 below it.

### `Concepts/Inclusion-Exclusion Principle.md` — 1 question(s)

- `masi-2019f-q6` (fact): Inclusion-exclusion bounds on a union alternate: the first bound (sum of individual event probabilities) is an upper bound on the union, the second (subtracting pairwise intersections) is a lower bound, and so on.
- `masi-2019f-q6` (procedure): Applying inclusion-exclusion to the cut-set failure events: an upper bound on failure probability (the first bound) gives a lower bound on system reliability, and a lower bound on failure probability gives an upper bound on reliability.

### `Concepts/Interaction.md` — 1 question(s)

- `masi-an-168` (fact): An interaction between two categorical predictors with k and m levels adds (k-1)(m-1) parameters.

### `Concepts/Log-Linear Model.md` — 1 question(s)

- `masi-an-154` (fact): In a hierarchical log-linear model for a three-way table, the absence of a term linking two variables (e.g. no XY term in XZ + YZ) means X and Y are conditionally independent given the third variable Z.

### `Concepts/Logistic Regression.md` — 1 question(s)

- `masi-2019f-q25` (fact): Because the logistic function is strictly increasing in η, a probability threshold p > c is equivalent to the linear predictor exceeding the log-odds of the threshold, η > ln(c/(1-c)).

### `Concepts/Lognormal Distribution.md` — 1 question(s)

- `masi-2019f-q23` (formula): For a lognormal(mu, sigma) loss, E[X \| X > d] = exp(mu + sigma^2/2) * Phi(sigma - (ln d - mu)/sigma) / (1 - Phi((ln d - mu)/sigma)).

### `Concepts/Marginal Model Plot.md` — 1 question(s)

- `masi-an-122` (fact): A marginal model plot against the linear predictor summarizes fit averaged over all predictors, so errors in individual terms can cancel and agreement there does not prove every term is correct; plots against each predictor are also needed.

### `Concepts/Neyman-Pearson Lemma.md` — 1 question(s)

- `masi-2019f-q19` (fact): Points where the alternative density is zero add Type I error without adding power, so they are excluded from the best critical region; where the likelihood ratio is constant, any subset of the needed probability mass is equally good.

### `Concepts/Order Statistics.md` — 1 question(s)

- `masi-2019f-q4` (procedure): To find the expected time of the k-th order statistic of independent exponentials, decompose it into successive spacings between failures, where each spacing is exponential with rate equal to the number of components still operating times the individual rate, and sum the spacing means.
- `masi-2019f-q4` (fact): The range between the first and last failure equals the maximum minus the minimum, so its expectation is E[max] − E[min] by linearity of expectation.

### `Concepts/Sample Mean.md` — 1 question(s)

- `masi-an-044` (fact): The sample median converges in probability to the population median when the density is positive at the median.

### `Concepts/Scatter Plot.md` — 1 question(s)

- `masi-an-133` (fact): A scatter plot of a variable against an arbitrary index such as a policy number shows nothing about the variable's distribution, because the index is only a label.

### `Concepts/Sufficient Statistic.md` — 1 question(s)

- `masi-an-061` (fact): The whole sample is always a sufficient statistic, and conditioning an estimator on it returns the estimator unchanged.

### `Concepts/System Reliability.md` — 1 question(s)

- `masi-2019s-q7` (fact): To reach a target parallel-system reliability with the fewest components, use the most reliable components first, since each added component multiplies the failure probability by (1 - r) and a smaller factor reduces it more.

### `Concepts/Uniform Continuous Distribution.md` — 1 question(s)

- `masi-an-038` (fact): For a distribution symmetric about 0 (such as uniform on (-a, a)), E[X] = 0 and all odd moments E[X^k] are 0.

### `Concepts/Weibull Distribution.md` — 1 question(s)

- `masi-an-072` (procedure): To check a Weibull fit graphically, plot ln[-ln S(x)] against ln x; since S(x)=exp(-(x/theta)^tau), this is a straight line with slope tau and intercept -tau ln theta, so the slope estimates the shape.

## Tagging and linking gaps

The vault teaches what these questions need, but on a page the question isn't tagged with and its tagged pages don't link to. Adding the page to the question's `wiki_link` (or linking it from the tagged page) puts it in reach.

| Question | Pages that teach what it needs |
|---|---|
| `masi-2019f-q23` | Mean Excess Loss |
| `masi-2019f-q27` | GLM Loss Reserving |
| `masi-2019f-q7` | Parametric Survival Model |
| `masi-2019s-q12` | Annuity Contract |
| `masi-an-005` | Scale and Shape Parameters |
| `masi-an-008` | Mean Excess Loss |
| `masi-an-015` | Scale and Shape Parameters |
| `masi-an-035` | Estimator |
| `masi-an-099` | GLM Loss Reserving, Loss Trend |
| `masi-an-122` | Variable Transformation |
| `masi-an-161` | Overfitting |

## Taught only in a collapsed section

The passage that teaches these items sits inside a folded callout (a worked example, a table behind a toggle). A reader who skims never opens it.

| Page | Questions | Items |
|---|---|---|
| Mean Time Spent in Transient States | 2 | The inverse of a 2x2 matrix [[a, b],[c, d]] is 1/(ad - bc) times [[d, -b],[-c, …; The inverse of a 2x2 matrix [[a,b],[c,d]] is 1/(ad-bc) times [[d,-b],[-c,a]]. |
| Method of Moments | 2 | For a uniform distribution on [0, θ], the method of moments estimate of θ is tw…; For U(0, β), E[X] = β/2, so the method of moments estimator is 2·X̄, which diff… |
| Model Fit | 2 | When residuals are more right-skewed than a gamma severity model captures, a di…; The actual-to-predicted ratio for a group is total actual losses divided by tot… |
| Response Variable | 2 | A prior weight changes the variance of each record's response, not its mean str…; The odds ratio multiplies cumulative odds, not individual category probabilitie… |
| Student's t-Distribution | 2 | A simultaneous confidence interval for a difference of means indicates a signif…; To bound a p-value using a t table, find the row for the degrees of freedom, lo… |
| System Reliability | 2 | In the five-component bridge network, the minimal path sets are {1,5}, {2,4}, {…; To find the reliability of a mixed system, reduce it by treating each parallel … |
| Type II Error | 2 | Compute beta as the probability, under the true mean, that the sample mean fall…; To compute β, find the probability that X̄ falls in the non-rejection region wh… |
| Analysis of Covariance | 1 | To test for a group (network) effect after adjusting for the covariate, compare… |
| Bonus-Malus System | 1 | To find the expected cost of reporting a loss in a bonus-malus system, compare …; A higher claim rate lowers the expected extra premium from reporting a loss, si… |
| Box Plot | 1 | Compare side-by-side box plots across categories by looking at the location (me… |
| Chi-Squared Distribution | 1 | To get a p-value from a chi-squared table, locate the test statistic between tw… |
| Compound Poisson Process | 1 | For an exponential random variable with mean θ, the second moment is E[X²] = 2θ… |
| Data Types | 1 | Coding a categorical factor as a single numeric variable imposes a linear effec… |
| Estimator | 1 | For a constant c, Var(cX) = c²Var(X), so scaling an estimator by c multiplies i…; For the maximum X_(n) of a sample of size n from a uniform on (0, θ), Var(X_(n)… |
| Generalized Additive Model | 1 | Adding a term that enters the model identically for all factor levels (such as … |
| Insurance Portfolio | 1 | With positive common correlation ρ, the CV of the total of n identical risks do… |
| Life Annuity | 1 | The Illustrative Life Table assumes an interest rate of 6% and gives values of … |
| Linear Algebra | 1 | The (j,j) diagonal entry of X^T X is the sum of squares of column j, so for the… |
| Markov Chain | 1 | To find a multi-step probability, enumerate all paths of intermediate states, m… |
| Maximum Likelihood Estimation | 1 | For an exponential distribution with mean theta, the maximum likelihood estimat…; The exponential log-likelihood for one observation is -ln(theta) - x/theta, and… |
| Minimum Variance | 1 | For an exponential distribution with mean θ, the Fisher information is I(θ) = 1… |
| Ordinal Logistic Regression | 1 | The probability of the highest category equals the complement of the last cumul… |
| Percentile | 1 | When the target percentile exceeds the probability mass at zero, it lies in the… |
| Power of a Test | 1 | To achieve Type I error α and Type II error β at alternative μ1 for a one-sided…; A required minimum sample size is rounded up to the next whole number so the er… |
| Recurrent and Transient States | 1 | To find communicating classes, read the positive entries of the transition matr… |
| Regression Spline | 1 | Requiring linearity in a boundary region removes its quadratic and cubic terms,… |
| Regression Through the Origin | 1 | Test whether a regression coefficient is significantly different from zero usin…; Residual standard errors of nested models are comparable because each estimates…; The residual standard error can rise or fall when a parameter is dropped, becau… |
| Step Function | 1 | In a least squares fit with an intercept and one indicator per bin except the f… |
| Transition Probability Matrix | 1 | When transition probabilities depend on history such as the current winning str… |
| Unbiasedness | 1 | Expectation is linear, so the expected value of an average of random variables … |
| Univariate Plot | 1 | A box plot shows where outliers lie but not how many observations share a value… |
| Variable Transformation | 1 | A continuous predictor entered as a single linear term in a GLM with a log link… |

## Every question

<details><summary><code>masi-2018s-q24</code> · answerable</summary>

Tagged pages: Generalized Linear Model, Link Function, Parameter Estimate Tables

| Item | Kind | Status | Where |
|---|---|---|---|
| A link function g relates the mean response (probability) to the linear predictor, g(π) = η = xᵀβ; for a square-root link g(π) = √π. | definition | tagged | Generalized Linear Model: “g(\mu_i) = \eta_i” |
| The predicted mean is obtained by applying the inverse link to the linear predictor; for a square-root link, π = η². | formula | tagged | Link Function: “$$\mu = g^{-1}(\eta)$$” |
| Compute the linear predictor as the intercept plus the coefficients of each categorical level the observation falls in (baseline levels con… | procedure | tagged | Parameter Estimate Tables: “The **reference level** of a categorical predictor is absorbed into the intercept; other levels are…” |
| The level of a categorical predictor with a zero coefficient and zero df in the output is the base level; it adds nothing to the linear pre… | fact | syllabus | Categorical Predictor: “A categorical predictor with $k$ levels is represented using $k-1$ **indicator (dummy) variables**;…” |

</details>

<details><summary><code>masi-2018s-q25</code> · answerable</summary>

Tagged pages: Generalized Linear Model, Link Function, Exponential Family

| Item | Kind | Status | Where |
|---|---|---|---|
| In a GLM, the linear predictor is the linear combination of the covariates and coefficients, and the link function g relates it to the mean… | definition | tagged | Generalized Linear Model: “3. **Link function**: $g(\mu_i) = \eta_i$ connects the mean to the linear predictor” |
| The canonical link for the gamma distribution is the inverse link, g(μ) = 1/μ, so the predicted mean is 1/η. | fact | tagged | Generalized Linear Model: “\\| Positive continuous \\| Gamma \\| Reciprocal: $g(\mu) = 1/\mu$ \\|” |
| The canonical link for the Poisson distribution is the log link, g(μ) = ln μ, so the predicted mean is e^η. | fact | tagged | Generalized Linear Model: “\\| Count \\| Poisson \\| Log: $g(\mu) = \ln\mu$ \\|” |
| The canonical link for the binomial distribution is the logit link, g(μ) = ln(μ/(1−μ)), so the predicted mean is e^η/(1+e^η), which lies be… | fact | tagged | Generalized Linear Model: “\\| Binary \\| Binomial \\| Logit: $g(\mu) = \ln\!\frac{\mu}{1-\mu}$ \\|” |

</details>

<details><summary><code>masi-2018s-q26</code> · answerable</summary>

Tagged pages: Principal Components Analysis, Loading Vector

| Item | Kind | Status | Where |
|---|---|---|---|
| The principal component score for an observation is the linear combination of that observation's centered variable values weighted by the p… | definition | tagged | Loading Vector: “$$z_{im} = \phi_{1m}x_{i1} + \phi_{2m}x_{i2} + \cdots + \phi_{pm}x_{ip}$$” |
| The loading vector of a principal component is normalized so that the sum of its squared loadings equals 1. | fact | tagged | Loading Vector: “$$\text{subject to } \sum_{j=1}^{p}\phi_{jm}^{2} = 1$$” |
| Before computing principal components and scores, center each variable by subtracting its sample mean (computed across observations). | procedure | tagged | Principal Components Analysis: “PCA requires **standardizing** predictors (subtract mean, divide by SD) when variables are on diffe…” |
| The response variable is not used in principal components analysis, which is unsupervised and uses only the predictor variables. | fact | tagged | Principal Components Analysis: “The directions are found without using $Y$, so nothing guarantees they are the best ones for predic…” |

</details>

<details><summary><code>masi-2018s-q27</code> · answerable</summary>

Tagged pages: Generalized Linear Model, Link Function, Logistic Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| The odds of an event with probability p are p/(1-p), and the log-odds (logit) is the natural log of the odds. | definition | tagged | Link Function: “\\| Logit \\| $\ln\!\frac{\mu}{1-\mu}$ \\| $\frac{e^\eta}{1+e^\eta}$ \\| Binomial (binary outcomes) \\|” |
| In a logistic regression model, the log-odds ln(p/(1-p)) equal the linear predictor β0 + β1x1 + ... , so p(x) = e^(β0+β1x)/(1+e^(β0+β1x)). | formula | tagged | Link Function: “\\| Logit \\| $\ln\!\frac{\mu}{1-\mu}$ \\| $\frac{e^\eta}{1+e^\eta}$ \\| Binomial (binary outcomes) \\|” |
| In a logistic model the odds of the event at x equal exp(β0 + β1x), obtained by exponentiating the linear predictor. | fact | linked | Ordinal Logistic Regression: “Exponentiating gives $\gamma_j/(1-\gamma_j) = e^{\theta_j}\,e^{\mathbf{x}^\top\boldsymbol\beta}$.” |

</details>

<details><summary><code>masi-2018s-q28</code> · answerable</summary>

Tagged pages: Generalized Linear Model, Link Function, Normal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| In a GLM with a single predictor, the linear predictor is eta = beta0 + beta1*x, and the link function g relates the mean (here the success… | definition | tagged | Generalized Linear Model: “$$g(\mu_i) = \eta_i$$” |
| For the logistic (logit) link, g(pi) = ln(pi/(1-pi)), so the predicted probability is pi = e^eta / (1 + e^eta). | formula | syllabus | Logistic Regression: “$$\pi = \frac{e^{\eta}}{1 + e^{\eta}} = \frac{1}{1 + e^{-\eta}}$$” |
| For the probit link, g(pi) = Phi^{-1}(pi), so the predicted probability is pi = Phi(eta), where Phi is the standard normal CDF. | formula | tagged | Link Function: “\\| Probit \\| $\Phi^{-1}(\mu)$ \\| $\Phi(\eta)$ \\| Binary outcomes \\|” |
| To obtain a predicted probability from a fitted binary-response GLM, compute the linear predictor at the given x and apply the inverse of t… | procedure | tagged | Link Function: “$$\mu = g^{-1}(\eta)$$” |

</details>

<details><summary><code>masi-2018s-q29</code> · answerable</summary>

Tagged pages: Deviance, Generalized Linear Model

| Item | Kind | Status | Where |
|---|---|---|---|
| Deviance of a GLM measures how far a fitted model is from the saturated model, based on the difference in log-likelihoods (scaled), so it s… | definition | tagged | Deviance: “**Deviance** is a goodness-of-fit measure for [[Generalized Linear Model]]s based on the log-likeli…” |
| A smaller deviance means the fitted model is closer to the saturated model and indicates a better fit; a large deviance indicates a poor fi… | fact | tagged | Deviance: “Deviance is always **non-negative**; the saturated model has deviance $0$ (a perfect fit)” |
| A saturated model has one parameter per observation, so it fits the data exactly and its deviance is zero. | definition | tagged | Deviance: “It compares the fitted model to the **saturated model** (a model with one parameter per observation…” |
| For nested GLMs, the difference in deviances between the smaller and larger model is approximately chi-square distributed and can be used t… | fact | tagged | Deviance: “**Analysis of Deviance**: for nested models, $\dfrac{D_{\text{reduced}} - D_{\text{full}}}{\phi} \a…” |

</details>

<details><summary><code>masi-2018s-q3</code> · answerable</summary>

Tagged pages: Poisson Process, Poisson Distribution, Nonhomogeneous Poisson Process, Intensity Function

| Item | Kind | Status | Where |
|---|---|---|---|
| A non-homogeneous Poisson process has a time-varying rate function λ(t), with independent increments and Poisson-distributed counts over in… | definition | tagged | Nonhomogeneous Poisson Process: “A **Nonhomogeneous Poisson Process** (NHPP) is a [[Poisson Process]] whose rate changes with time: …” |
| In a non-homogeneous Poisson process, the number of events in an interval (a, b] is Poisson distributed with mean equal to the integral of … | fact | tagged | Nonhomogeneous Poisson Process: “$$N(b) - N(a) \sim \text{Poi}\!\left(\int_a^b \lambda(u)\,du\right)$$” |
| For a piecewise-defined rate function, split the interval at the breakpoints and integrate each piece's formula over its own subinterval, t… | procedure | tagged | Intensity Function: “Expected counts are **areas under the intensity curve**, so a question giving $\lambda(t)$ piecewis…” |
| For a Poisson random variable with mean m, P(N = n) = e^{-m} m^n / n!. | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |

</details>

<details><summary><code>masi-2018s-q30</code> · answerable</summary>

Tagged pages: Cross-Validation, Test Error, Mean Square Error

| Item | Kind | Status | Where |
|---|---|---|---|
| k-fold cross-validation splits the data into k folds, repeatedly trains the model on k-1 folds and evaluates it on the held-out fold, then … | definition | tagged | Cross-Validation: “- **$k$-fold**: split the data into $k$ equal parts, fit on $k-1$ and score on the held-out fold, t…” |
| Each training set in k-fold CV contains a fraction (k-1)/k of the data, so LOOCV trains on n-1 observations and 5-fold CV on about 80% of t… | fact | tagged | Cross-Validation: “each fit uses $(k-1)n/k$ observations” |
| Models fit on smaller training subsets tend to overestimate the test error of the model fit on the full data, so k-fold CV with smaller k h… | fact | tagged | Cross-Validation: “**Leave-one-out** ($k = n$) is nearly unbiased but has high variance and is expensive” |
| LOOCV estimates have higher variance than k-fold CV with smaller k because the training sets are nearly identical, making the fold error es… | fact | tagged | Test Error: “It is slightly more biased than LOOCV but less variable, since LOOCV's $n$ fits are nearly identica…” |
| LOOCV is computationally more expensive than k-fold CV with small k because it requires fitting the model n times rather than k times. | fact | tagged | Cross-Validation: “**Leave-one-out** ($k = n$) is nearly unbiased but has high variance and is expensive” |

</details>

<details><summary><code>masi-2018s-q31</code> · gap</summary>

Tagged pages: Bootstrap, Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| A nonparametric bootstrap sample is formed by drawing n values with replacement from the observed sample of size n, and the statistic (e.g.… | definition | tagged | Bootstrap: “The **bootstrap** estimates the sampling variability of a statistic by resampling the observed data…” |
| The bootstrap standard error of an estimator is the sample standard deviation of the B bootstrap replicates, SE = sqrt( (1/(B-1)) * sum (th… | formula | tagged | Bootstrap: “$$\mathrm{SE}_B(\hat{\alpha}) = \sqrt{\frac{1}{B-1}\sum_{r=1}^{B}\left(\hat{\alpha}^{*r} - \bar{\ha…” |
| A bootstrap resample mean is bounded by the smallest and largest observed values, attained when the resample consists entirely of the minim… | fact | missing |  |

</details>

<details><summary><code>masi-2018s-q32</code> · answerable</summary>

Tagged pages: R-Squared, Residual Sum of Squares, Multicollinearity

| Item | Kind | Status | Where |
|---|---|---|---|
| To detect collinearity between two predictors, regress one predictor on the other and examine the resulting R^2; a high R^2 indicates colli… | procedure | tagged | Multicollinearity: “$R_j^2$ is from regressing predictor $x_j$ on all the *other* predictors.” |
| The coefficient of determination is R^2 = 1 - Residual Sum of Squares / Total Sum of Squares. | formula | tagged | R-Squared: “$$R^2 = 1 - \frac{\text{SS}_\text{Res}}{\text{SS}_\text{Tot}}$$” |
| The variance inflation factor for a predictor is VIF = 1/(1 - R^2), where R^2 comes from regressing that predictor on the other predictors. | formula | tagged | Multicollinearity: “$$\text{VIF}_j = \frac{1}{1 - R_j^{2}}$$” |
| As a rule of thumb, a VIF exceeding 5 or 10 indicates a problematic degree of collinearity, while a smaller VIF does not. | fact | tagged | Multicollinearity: “A **variance inflation factor** above $5$–$10$ is the usual flag” |

</details>

<details><summary><code>masi-2018s-q33</code> · gap</summary>

Tagged pages: R-Squared, Hypothesis Testing, Residual Sum of Squares

| Item | Kind | Status | Where |
|---|---|---|---|
| The overall F-statistic for testing that all slope coefficients are zero can be written in terms of R^2 as F = (R^2/p) / ((1 - R^2)/(n - p … | formula | missing |  |
| In a regression with an intercept and p predictors fit to n observations, the residual degrees of freedom are n - p - 1, and the overall F-… | fact | tagged | Residual Sum of Squares: “RSS is the numerator of the **residual variance** estimate: $\hat{\sigma}^2 = \text{RSS}/(n-p-1)$” |

</details>

<details><summary><code>masi-2018s-q34</code> · answerable</summary>

Tagged pages: Regularization, Bias-Variance Tradeoff, Test Error, Mean Square Error

| Item | Kind | Status | Where |
|---|---|---|---|
| Minimizing the residual sum of squares subject to a constraint that the sum of squared coefficients is at most s is ridge regression (an L2… | fact | tagged | Regularization: “$$\text{Budget form:}\quad \min_{\beta}\ \mathrm{RSS} \ \text{ subject to } \sum_{j=1}^{p}\beta_j^{…” |
| In the constrained form of ridge regression, increasing the budget s relaxes the constraint, making the model more flexible (less regulariz… | fact | tagged | Regularization: “**Budget $s$ runs the other way.** For every $\lambda$ there is an $s$ giving the same estimates: a…” |
| As model flexibility increases, squared bias decreases monotonically and variance increases monotonically. | fact | tagged | Bias-Variance Tradeoff: “Adding terms, interactions, or levels lowers bias and raises variance. Removing them does the rever…” |
| Expected test MSE equals squared bias plus variance plus irreducible error. | formula | tagged | Bias-Variance Tradeoff: “$$E\!\left[(y_0 - \hat{f}(x_0))^{2}\right] = \left[\text{Bias}(\hat{f}(x_0))\right]^{2} + \text{Var…” |
| Test MSE as a function of flexibility is U-shaped (decreases then increases), whereas training MSE decreases monotonically with flexibility. | fact | tagged | Bias-Variance Tradeoff: “Training error is not a guide — it falls monotonically with complexity.” |

</details>

<details><summary><code>masi-2018s-q35</code> · answerable</summary>

Tagged pages: Supervised Learning, Unsupervised Learning, Clustering, Statistical Learning

| Item | Kind | Status | Where |
|---|---|---|---|
| Supervised learning methods build a model relating predictors to a labeled response variable, with the goal of predicting or estimating tha… | definition | tagged | Supervised Learning: “**Supervised learning** fits a model to predict a labelled response $Y$ from predictors $X$.” |
| Unsupervised learning seeks structure or patterns among observations or predictors when there is no response variable. | definition | tagged | Unsupervised Learning: “**Unsupervised learning** looks for structure in predictors $X$ when there is no response $Y$ to pr…” |
| Cluster analysis groups observations into similar clusters without using a response variable, so it is an unsupervised learning method. | fact | tagged | Unsupervised Learning: “[[Clustering]] (find groups of similar observations)” |
| Logistic regression models a categorical (binary) response from predictors, so it is a supervised learning method. | fact | tagged | Statistical Learning: “[[Logistic Regression]] classifies a binary response but estimates class probabilities” |
| Ridge regression fits a linear model for a response with a shrinkage penalty on the coefficients, so it is a supervised learning method. | fact | linked | Regularization: “$$\text{Ridge:}\quad \min_{\beta}\ \mathrm{RSS} + \lambda\sum_{j=1}^{p}\beta_j^{2}$$” |

</details>

<details><summary><code>masi-2018s-q36</code> · answerable</summary>

Tagged pages: Regularization, Residual Sum of Squares, Statistical Learning

| Item | Kind | Status | Where |
|---|---|---|---|
| The lasso chooses coefficient estimates that minimize the residual sum of squares subject to an l1 budget constraint on the coefficients, t… | definition | tagged | Regularization: “\text{Budget form:}\quad \min_{\beta}\ \mathrm{RSS} \ \text{ subject to } \sum_{j=1}^{p}\beta_j^{2}…” |
| To find a constrained lasso estimate from a grid of candidate RSS values, restrict to the candidate coefficient combinations satisfying the… | procedure | tagged | Regularization: “$$\text{Budget form:}\quad \min_{\beta}\ \mathrm{RSS} \ \text{ subject to } \sum_{j=1}^{p}\beta_j^{…” |
| The residual sum of squares is the sum of squared differences between observed responses and fitted values, and it is the quantity minimize… | definition | tagged | Residual Sum of Squares: “The **Residual Sum of Squares (RSS)** (also called the **Sum of Squared Errors, SSE**) measures the…” |

</details>

<details><summary><code>masi-2018s-q37</code> · gap</summary>

Tagged pages: Generalized Linear Model, Categorical Predictor, Interaction

| Item | Kind | Status | Where |
|---|---|---|---|
| In a linear model with two-level categorical predictors coded as 0/1 indicators, the intercept equals the mean response of the base (refere… | definition | tagged | Categorical Predictor: “the omitted level is the **reference level**, absorbed into the intercept” |
| In a model with two binary predictors and an interaction term, the fitted value for each cell is the sum of the coefficients whose indicato… | fact | tagged | Interaction: “$$\eta = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \beta_3 (x_1 \times x_2)$$” |
| Recoding categorical variables (e.g., swapping which level is the base) changes the parameterization and coefficient estimates but not the … | fact | tagged | Interaction: “test them jointly with the nested-model test, since the individual coefficients and their p-values …” |
| To find coefficients under a new coding, set the new model's cell sums equal to the known cell means and solve, with the new baseline cell … | procedure | missing |  |

</details>

<details><summary><code>masi-2018s-q38</code> · answerable</summary>

Tagged pages: Regression Spline

| Item | Kind | Status | Where |
|---|---|---|---|
| Piecewise polynomial regression with knots divides the predictor range into regions (K knots give K+1 regions) and fits a separate polynomi… | definition | tagged | Regression Spline: “Placing $K$ knots in the range of $X$ means fitting $K + 1$ polynomials.” |
| Unconstrained piecewise regression of degree d with K knots uses (K+1)(d+1) degrees of freedom, since each region has its own d+1 coefficie… | fact | tagged | Regression Spline: “\\| Piecewise cubic, no constraints \\| $4(K + 1)$ \\|” |
| A spline of degree d with K knots imposes continuity of the function and its derivatives up to order d-1 at each knot, giving K+d+1 degrees… | fact | tagged | Regression Spline: “\\| Degree-$d$ spline \\| $(d + 1)(K + 1) - dK = K + d + 1$ \\|” |
| A natural cubic spline adds boundary constraints requiring the fit to be linear beyond the boundary knots, so it uses fewer degrees of free… | fact | tagged | Regression Spline: “A natural spline adds boundary constraints: the function must be linear below the smallest knot and…” |
| Imposing continuity constraints at the knots reduces the degrees of freedom of a piecewise polynomial fit, so unconstrained piecewise fits … | fact | tagged | Regression Spline: “Each constraint imposed at a knot frees up one degree of freedom.” |

</details>

<details><summary><code>masi-2018s-q39</code> · answerable</summary>

Tagged pages: Generalized Linear Model, Link Function, Interaction

| Item | Kind | Status | Where |
|---|---|---|---|
| With a log link, the predicted mean equals the exponential of the linear predictor, so the log of the predicted mean is the sum of the inte… | definition | tagged | Link Function: “\\| Log \\| $\ln\mu$ \\| $e^\eta$ \\| Poisson (counts), Gamma (severity) \\|” |
| The base level of each categorical variable has its dummy variable equal to zero, so the base-level cell's linear predictor is just the int… | fact | linked | Categorical Predictor: “the omitted level is the **reference level**, absorbed into the intercept” |
| An interaction term coefficient is the additional amount in the linear predictor, beyond the sum of the main effects, applying only when bo… | definition | tagged | Interaction: “$\beta_3$ is the interaction coefficient: it measures how much the effect of $x_1$ on $\eta$ change…” |
| Recover GLM coefficients from fitted cell values by taking logs of the predicted values and differencing them, so that the interaction coef… | procedure | tagged | Interaction: “$$\eta = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \beta_3 (x_1 \times x_2)$$” |

</details>

<details><summary><code>masi-2018s-q4</code> · answerable</summary>

Tagged pages: Aggregate Loss Model, Poisson Distribution, Variance, Compound Poisson Process

| Item | Kind | Status | Where |
|---|---|---|---|
| A compound Poisson aggregate loss S is the sum of a Poisson-distributed number of independent, identically distributed severities, independ… | definition | tagged | Aggregate Loss Model: “$N$ is the **claim count** (frequency) random variable; $X_i$ are i.i.d. **claim severity** random …” |
| For a compound Poisson sum with rate λ and severity W, Var(S) = λ·E[W^2]. | formula | tagged | Aggregate Loss Model: “When $N \sim \text{Poi}(\lambda)$: $\text{Var}(S) = \lambda \cdot E[X^2]$ (simplification since $\t…” |
| Poisson rates scale proportionally with the length of the time period, so a monthly rate multiplied by 12 gives the annual rate. | fact | tagged | Compound Poisson Process: “$$S(t) = \sum_{i=1}^{N(t)} X_i, \qquad N(t) \sim \text{Poi}(\lambda t)$$” |
| For a constant c, E[cX] = c·E[X] and Var(cX) = c^2·Var(X). | formula | tagged | Variance: “$\text{Var}(aX + b) = a^2 \text{Var}(X)$ — scaling changes variance, shifts do not” |
| The second moment equals variance plus squared mean: E[X^2] = Var(X) + (E[X])^2. | formula | tagged | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |

</details>

<details><summary><code>masi-2018s-q40</code> · gap</summary>

Tagged pages: Maximum Likelihood Estimation, Deviance, Fisher Information

| Item | Kind | Status | Where |
|---|---|---|---|
| The maximum likelihood estimate is the parameter value that maximizes the likelihood (equivalently the log-likelihood) of the observed data. | definition | tagged | Maximum Likelihood Estimation: “**Maximum Likelihood Estimation (MLE)** is a method of parameter estimation that chooses the parame…” |
| The score function is the first derivative of the log-likelihood with respect to the parameter. | definition | tagged | Maximum Likelihood Estimation: “When the maximum is at an interior point and the log-likelihood is differentiable, the MLE solves t…” |
| The MLE is found where the score function equals zero, so a plot of the score against the parameter crosses zero at the MLE. | fact | tagged | Maximum Likelihood Estimation: “When the maximum is at an interior point and the log-likelihood is differentiable, the MLE solves t…” |
| The deviance is minimized at the maximum likelihood estimate, so the minimum of a deviance plot locates the MLE. | fact | tagged | Deviance: “$$D^* = 2\left[\ell_{\text{sat}} - \ell(\hat{\boldsymbol{\beta}})\right] = 2\left[\ell(\text{satura…” |
| Fisher information measures the curvature of the log-likelihood (the precision of the estimate), being the negative expected second derivat… | definition | tagged | Fisher Information: “**Fisher Information** $I(\theta)$ measures how sharply the likelihood identifies a parameter — the…” |
| The information function does not have a special feature (such as a zero or extremum) at the MLE, so it cannot be used to locate the MLE vi… | fact | missing |  |

</details>

<details><summary><code>masi-2018s-q5</code> · answerable</summary>

Tagged pages: Hazard Rate, Exponential Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The failure rate (hazard rate) h(t) is the density divided by the survival function, f(t)/S(t), the instantaneous rate of failure at age t … | definition | tagged | Hazard Rate: “The **Hazard Rate** $\mu(t)$ (also called the **force of mortality** in life contingencies, or the …” |
| An exponential distribution has a constant hazard rate equal to the reciprocal of its mean (1/θ, i.e. the rate λ), independent of age. | fact | tagged | Hazard Rate: “A **constant** hazard rate $\mu(t) = \mu$ corresponds to the [[Exponential Distribution\\|Exponentia…” |
| The exponential distribution is memoryless: conditional on survival to age t, the remaining lifetime has the same exponential distribution,… | fact | tagged | Exponential Distribution: “Its defining property is **memorylessness**: $P(X > s + t \mid X > s) = P(X > t)$, making it the un…” |

</details>

<details><summary><code>masi-2018s-q6</code> · answerable</summary>

Tagged pages: Exponential Distribution, Hazard Rate, Poisson Process, System Reliability

| Item | Kind | Status | Where |
|---|---|---|---|
| The waiting time until the first event of a Poisson process with rate lambda is exponentially distributed with rate lambda (mean 1/lambda). | fact | tagged | Poisson Process: “Interarrival times $T_1, T_2, \ldots$ are i.i.d. $\text{Exponential}(\lambda)$ with mean $1/\lambda$” |
| A constant hazard rate lambda corresponds to an exponential lifetime distribution with rate lambda and mean 1/lambda. | fact | tagged | Hazard Rate: “A **constant** hazard rate $\mu(t) = \mu$ corresponds to the [[Exponential Distribution\\|Exponentia…” |
| A parallel system fails only when all components have failed, so its lifetime is the maximum of the component lifetimes (a series system's … | fact | tagged | System Reliability: “A $k$-out-of-$n$ system fails at the $(n-k+1)$-th component failure, an [[Order Statistics\\|order s…” |
| For any two random variables, max(X,Y) + min(X,Y) = X + Y, so E[max(X,Y)] = E[X] + E[Y] - E[min(X,Y)]. | formula | linked | Joint Life: “Relationship: $T_{xy} + T_{\overline{xy}} = T_x + T_y$, so $\mathring{e}_{xy} + \mathring{e}_{\over…” |
| The minimum of independent exponential random variables is exponential with rate equal to the sum of the individual rates, so its mean is 1… | fact | linked | Order Statistics: “$P\bigl(X_{(1)} > x\bigr) = \bigl[1 - F_1(x)\bigr]\bigl[1 - F_2(x)\bigr]\cdots\bigl[1 - F_n(x)\bigr…” |

</details>

<details><summary><code>masi-2018s-q7</code> · gap</summary>

Tagged pages: Exponential Distribution, Deductible

| Item | Kind | Status | Where |
|---|---|---|---|
| For an exponential random variable with mean θ, the survival function is Pr[X > x] = e^{-x/θ}. | formula | tagged | Exponential Distribution: “Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponentia…” |
| With an ordinary deductible d, the insurer makes a payment on a loss only if the loss exceeds d, so the probability of a payment is the sur… | fact | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| A p% reduction in the probability of a payment means the new probability equals (1 - p) times the original probability. | procedure | missing |  |

</details>

<details><summary><code>masi-2018s-q8</code> · answerable</summary>

Tagged pages: Binomial Distribution, System Reliability

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of functioning components among n independent components, each with the same reliability p, follows a Binomial(n, p) distributio… | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| A k-out-of-n system functions when at least k of its n components function, so its reliability is the probability that at least k component… | definition | tagged | System Reliability: “**$k$-out-of-$n$** (works if at least $k$ work): with equal $p$, $r = \sum_{i=k}^{n} \binom{n}{i} p…” |
| The binomial probability mass function is Pr[K = k] = C(n,k) p^k (1-p)^(n-k), and a probability of at least k successes is the sum of these… | formula | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |

</details>

<details><summary><code>masi-2018s-q9</code> · answerable</summary>

Tagged pages: System Reliability, Stochastic Processes

| Item | Kind | Status | Where |
|---|---|---|---|
| A path set is a set of components whose functioning guarantees the system functions; a minimal path set is a path set that contains no prop… | definition | tagged | System Reliability: “A **minimal path set** is a set of components whose working alone makes the system work, with no pr…” |
| A cut set is a set of components whose failure guarantees the system fails; a minimal cut set is a cut set that contains no proper subset t… | definition | tagged | System Reliability: “a **minimal cut set** is a set whose failure alone makes it fail, again minimal.” |
| To find minimal path sets and minimal cut sets from a system diagram, identify the smallest sets of components whose working connects input… | procedure | tagged | System Reliability: “A **minimal path set** is a set of components whose working alone makes the system work, with no pr…” |
| In the five-component bridge network, the minimal path sets are {1,5}, {2,4}, {1,3,4}, {2,3,5}, and the minimal cut sets are {1,2}, {4,5}, … | fact | tagged | System Reliability (collapsed): “Its minimal path sets are $\{1,4\}, \{2,5\}, \{1,3,5\}, \{2,3,4\}$ and its minimal cut sets $\{1,2\…” |
| A set that strictly contains a path set (or a cut set) is not minimal, so it cannot be a minimal path set (or minimal cut set). | fact | tagged | System Reliability: “with no proper subset doing so” |

</details>

<details><summary><code>masi-2019f-q1</code> · answerable</summary>

Tagged pages: Exponential Distribution, Deductible, Payment Random Variable, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The exponential distribution is the only continuous distribution with the memoryless property. | fact | tagged | Exponential Distribution: “Its defining property is **memorylessness**: $P(X > s + t \mid X > s) = P(X > t)$, making it the un…” |
| Memoryless property: for X > d, the conditional distribution of the excess X - d given X > d is the same as the distribution of X, i.e. Pr(… | definition | tagged | Exponential Distribution: “A direct consequence: given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$.” |
| With an ordinary deductible d, the payment per loss is X - d when X > d and zero otherwise; the payment per payment is the excess loss X - … | definition | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| For an exponential distribution with mean θ, the mean excess loss (mean residual life) at any deductible equals θ. | fact | tagged | Exponential Distribution: “So $E[X \mid X > d] = d + \theta$ and $E[(X-d)_+] = \theta e^{-d/\theta}$” |

</details>

<details><summary><code>masi-2019f-q10</code> · answerable</summary>

Tagged pages: Gambler's Ruin Problem, Markov Chain, Stochastic Processes

| Item | Kind | Status | Where |
|---|---|---|---|
| Gambler's ruin models a player's fortune as a random walk with independent rounds in which the player gains 1 with probability p or loses 1… | definition | tagged | Gambler's Ruin Problem: “On each independent play the gambler wins one unit with probability $p$ and loses one with probabil…” |
| In gambler's ruin with p ≠ q, the probability of reaching N before 0 starting from i is (1 - (q/p)^i) / (1 - (q/p)^N). | formula | tagged | Gambler's Ruin Problem: “$P_i = \begin{cases} \dfrac{1 - (q/p)^i}{1 - (q/p)^N} & p \neq \tfrac12 \\[10pt] \dfrac{i}{N} & p =…” |
| In a two-player game where coins only transfer between the players, one player has no coins exactly when the other holds all the coins in p… | fact | tagged | Gambler's Ruin Problem: “When two players holding $a$ and $b$ units play until one is broke, follow one player's fortune: $i…” |

</details>

<details><summary><code>masi-2019f-q11</code> · gap</summary>

Tagged pages: Whole Life Insurance, Life Annuity, Life Table, Survival Model

| Item | Kind | Status | Where |
|---|---|---|---|
| The annual level benefit premium for a fully discrete whole life insurance follows from the equivalence principle: P = (face amount) × A_x … | formula | tagged | Whole Life Insurance: “$$P = \frac{A_x}{\ddot{a}_x}$$” |
| The Illustrative Life Table assumes an interest rate of 6% and gives values of l_x, q_x, ä_x and 1000A_x by age, and its values are read fr… | fact | tagged | Life Annuity (collapsed): “The Illustrative Life Table ($i = 0.06$) gives $1000q_{40} = 2.78$, $\ddot{a}_{41} = 14.6864$ and $…” |
| To find the effect of switching mortality tables, compute the premium under each table and take the difference (new minus original). | procedure | missing |  |

</details>

<details><summary><code>masi-2019f-q12</code> · answerable</summary>

Tagged pages: Life Table, Binomial Distribution, Confidence Interval, Normal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of deaths among a block of independent lives with the same death probability over a period is binomial with n equal to the numbe… | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| The probability that a life aged x dies within t years is tqx = 1 - l_{x+t}/l_x, computed from life table values of l. | formula | tagged | Life Table: “$$_{t}p_x = \frac{\ell_{x+t}}{\ell_x}, \qquad _{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{…” |
| For a Binomial(n, p) random variable, the mean is np and the variance is np(1-p). | formula | tagged | Binomial Distribution: “$E[X] = np$ and $\text{Var}(X) = np(1-p)$” |
| A normal-approximation confidence interval for a count is mean ± z·standard deviation, where for a two-sided confidence level C the critica… | procedure | tagged | Confidence Interval: “$$\bar{X} \pm z_{\alpha/2}\,\frac{\sigma}{\sqrt{n}} \qquad (\sigma \text{ known})$$” |

</details>

<details><summary><code>masi-2019f-q13</code> · answerable</summary>

Tagged pages: Exponential Distribution, Poisson Process, Interarrival Time, Cumulative Distribution Function (CDF), Inversion Method

| Item | Kind | Status | Where |
|---|---|---|---|
| In a Poisson process with rate lambda, interarrival times are independent exponential random variables with mean 1/lambda. | fact | tagged | Poisson Process: “Interarrival times $T_1, T_2, \ldots$ are i.i.d. $\text{Exponential}(\lambda)$ with mean $1/\lambda$” |
| The waiting time until the nth event of a Poisson process is the sum of n independent exponential interarrival times (a gamma distribution). | fact | tagged | Poisson Process: “The waiting time $S_n = T_1 + \cdots + T_n$ to the $n$-th event follows a [[Gamma]] distribution wi…” |
| The inversion method simulates a random variable by setting a U(0,1) draw u equal to the CDF F(x) and solving for x = F^{-1}(u). | procedure | tagged | Inversion Method: “simulates a draw from a distribution with [[Cumulative Distribution Function (CDF)\\|CDF]] $F$ by ge…” |
| The exponential CDF is F(x) = 1 - e^{-lambda x}, so an exponential variable is simulated as x = -ln(1-u)/lambda (equivalently -ln(u)/lambda… | formula | tagged | Exponential Distribution: “If $U \sim \text{Unif}(0,1)$ and $\theta > 0$, then $Y = -\theta \ln U$ is exponential with mean $\…” |

</details>

<details><summary><code>masi-2019f-q14</code> · answerable</summary>

Tagged pages: Unbiasedness, Single-Parameter Pareto Distribution, Sample Mean, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| For a single-parameter Pareto distribution with shape α and scale θ (density αθ^α/x^(α+1) for x > θ), the mean is E[X] = αθ/(α−1) for α > 1. | formula | tagged | Single-Parameter Pareto Distribution: “The mean is $E[X] = \frac{\alpha\theta}{\alpha - 1}$ for $\alpha > 1$” |
| An estimator is unbiased for a parameter if its expected value equals the true parameter value for every possible value of the parameter. | definition | tagged | Unbiasedness: “An estimator $\hat{\theta}$ of a parameter $\theta$ is **unbiased** if its expected value equals th…” |
| The sample mean of n independent identically distributed observations has expected value equal to the mean of the underlying distribution, … | fact | tagged | Unbiasedness: “The **sample mean** $\bar{X} = \frac{1}{n}\sum X_i$ is an unbiased estimator of the population mean…” |

</details>

<details><summary><code>masi-2019f-q15</code> · answerable</summary>

Tagged pages: Minimum Variance, Sample Variance, Unbiasedness, Normal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A minimum variance unbiased estimator (MVUE/UMVUE) is an unbiased estimator whose variance is no larger than that of any other unbiased est… | definition | tagged | Minimum Variance: “**Minimum Variance** is a criterion for comparing estimators: among the [[Unbiasedness\\|unbiased]] …” |
| The Lehmann–Scheffé theorem states that an unbiased estimator that is a function of a complete sufficient statistic is the unique MVUE. | fact | syllabus | Rao-Blackwell Theorem: “**Lehmann–Scheffé Theorem.** If $T$ is complete and sufficient and $\varphi(T)$ is unbiased for $\t…” |
| For a normal distribution with unknown mean and variance, (sum of x_i, sum of x_i^2) is a complete sufficient statistic, because the normal… | fact | syllabus | Sufficient Statistic: “A **complete sufficient statistic** combined with the Lehmann–Scheffé theorem yields the **UMVUE** …” |
| The sample variance s^2 = (1/(n-1)) * sum (x_i - xbar)^2, with divisor n-1, is an unbiased estimator of the population variance, and for a … | formula | tagged | Sample Variance: “$$S^2 = \frac{1}{n-1}\sum_{i=1}^{n}(X_i - \bar{X})^2$$” |
| The sum of squared deviations from the sample mean equals sum x_i^2 minus n times xbar^2. | formula | tagged | Sample Variance: “The computing form $S^2 = \frac{1}{n-1}\left(\sum X_i^2 - n\bar{X}^2\right)$ is what exam problems …” |

</details>

<details><summary><code>masi-2019f-q16</code> · answerable</summary>

Tagged pages: Method of Moments, Normal Distribution, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| The method of moments estimates parameters by setting the theoretical raw moments E[X^k] equal to the corresponding sample raw moments (1/n… | procedure | tagged | Method of Moments: “$$\frac{1}{n}\sum_{i=1}^{n} X_i^{\,r} = E[X^{\,r}], \qquad r = 1, 2, \ldots, k$$” |
| The second raw moment of a random variable is E[X^2] = Var(X) + (E[X])^2, so for a normal distribution E[X] = μ and E[X^2] = σ^2 + μ^2. | formula | tagged | Variance: “$$= E[X^2] - \mu^2$$” |
| The method of moments variance estimate uses divisor n (the second sample raw moment minus the squared sample mean), so it is not the unbia… | fact | tagged | Variance: “$$\text{Var}(X) = E\left[(X - \mu)^2\right]$$” |

</details>

<details><summary><code>masi-2019f-q17</code> · answerable</summary>

Tagged pages: Kernel Density Estimation, Cumulative Distribution Function (CDF), Uniform Continuous Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A kernel-smoothed distribution estimate replaces each observed data point with a kernel distribution centered at that point, and the smooth… | definition | tagged | Kernel Density Estimation: “$$\hat{F}(x) = \frac{1}{n}\sum_{i=1}^{n} W\!\left(\frac{x - x_i}{b}\right)$$” |
| For a uniform kernel with bandwidth b, the kernel CDF for observation y_i at x is 0 for x < y_i - b, 1 for x > y_i + b, and (x - (y_i - b))… | formula | tagged | Kernel Density Estimation: “Its CDF rises linearly, $W(u) = \frac{u + 1}{2}$ on $[-1, 1]$.” |

</details>

<details><summary><code>masi-2019f-q18</code> · answerable</summary>

Tagged pages: Maximum Likelihood Estimation, Censoring, Truncation, Exponential Distribution, Incomplete Data

| Item | Kind | Status | Where |
|---|---|---|---|
| A policy deductible produces left-truncated data: losses below the deductible are not observed, and the observed payment is the loss minus … | fact | tagged | Truncation: “In insurance, **left-truncation** arises with deductibles: only losses exceeding the deductible $d$…” |
| A policy limit (maximum payment) produces right-censored data: when the maximum is paid, the loss is known only to be at least that amount. | fact | tagged | Censoring: “- **Right-censoring**: true value exceeds $c$ (e.g., policy limit reached, study ends before claim …” |
| The exponential distribution is memoryless: given X > d, the excess X - d is exponential with the same mean, so the deductible does not cha… | fact | tagged | Exponential Distribution: “A direct consequence: given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$.” |
| Construct the likelihood for truncated and censored data: each uncensored observation contributes its density (divided by the survival func… | procedure | tagged | Censoring: “\text{If } X > c: \quad L_i(\theta) = P(X > c \mid \theta)” |
| Find the maximum likelihood estimate by maximizing the log-likelihood: set its derivative with respect to the parameter to zero and solve. | procedure | tagged | Maximum Likelihood Estimation: “When the maximum is at an interior point and the log-likelihood is differentiable, the MLE solves t…” |
| For an exponential distribution with censored data, the MLE of the mean is the sum of all observed values (censored values at their censori… | formula | tagged | Incomplete Data: “**Exponential shortcut.** For an [[Exponential Distribution\\|exponential]] model with any mix of tr…” |

</details>

<details><summary><code>masi-2019f-q19</code> · gap</summary>

Tagged pages: Neyman-Pearson Lemma, Type I Error, Power of a Test, Uniform Continuous Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| Type I error is rejecting H0 when H0 is true; its probability is the size (significance level) α = Pr(X in critical region \| H0). | definition | tagged | Type I Error: “A **Type I Error** occurs when a [[Hypothesis Testing\\|hypothesis test]] incorrectly **rejects a tr…” |
| The power of a test is the probability of rejecting H0 when H1 is true, i.e. Pr(X in critical region \| H1). | definition | tagged | Power of a Test: “The **Power of a Test** is the probability it rejects the null hypothesis when the null is false — …” |
| By the Neyman–Pearson lemma, the most powerful (best) critical region for a simple-vs-simple test at a given size consists of the points wh… | fact | tagged | Neyman-Pearson Lemma: “reject $H_0$ where the likelihood ratio $L(\mathbf{x}) = f_0(\mathbf{x})/f_1(\mathbf{x})$ is small.” |
| Points where the alternative density is zero add Type I error without adding power, so they are excluded from the best critical region; whe… | fact | missing |  |
| For a uniform distribution on [a,b], the probability of a subset region is its length divided by (b − a), with density 1/(b − a). | formula | tagged | Uniform Continuous Distribution: “$$f(x) = \frac{1}{b - a}, \quad a < x < b$$” |

</details>

<details><summary><code>masi-2019f-q2</code> · answerable</summary>

Tagged pages: Poisson Process, Exponential Distribution, Interarrival Time, Expected Value, Poisson Thinning

| Item | Kind | Status | Where |
|---|---|---|---|
| Thinning a Poisson process by independently classifying each event into types yields independent Poisson processes for each type, with rate… | fact | tagged | Poisson Thinning: “**Poisson Thinning** (splitting) is the result that if each event of a [[Poisson Process]] with rat…” |
| The waiting time until the first event of a Poisson process with rate λ is exponential with mean 1/λ. | fact | tagged | Poisson Process: “Interarrival times $T_1, T_2, \ldots$ are i.i.d. $\text{Exponential}(\lambda)$ with mean $1/\lambda$” |
| In a Poisson process with independent event types, the type of the first event is independent of the time at which it occurs, so its type f… | fact | tagged | Interarrival Time: “Competing risks: if two independent Poisson streams have rates $\lambda_1$ and $\lambda_2$, the wai…” |
| Expectation is linear, so the expected value of a sum or difference of random variables equals the sum or difference of their expectations,… | fact | tagged | Expected Value: “It is linear: $E[aX + b] = aE[X] + b$” |
| Expected total time equals the expected waiting time plus the expected ride time, where the expected ride time is the probability-weighted … | procedure | linked | Mixture Distribution: “Any quantity that is *linear* in the density — a probability, a mean, a second moment — can be foun…” |

</details>

<details><summary><code>masi-2019f-q20</code> · gap</summary>

Tagged pages: Chi-Square Goodness-of-Fit Test, Hypothesis Testing

| Item | Kind | Status | Where |
|---|---|---|---|
| The Pearson chi-square goodness-of-fit statistic is Q = Σ (O − E)² / E, summing over categories, where O is the observed count and E is the… | formula | tagged | Chi-Square Goodness-of-Fit Test: “$$Q = \sum_{j=1}^{k} \frac{(O_j - E_j)^2}{E_j}$$” |
| Under a null hypothesis specified as ratios among categories, each category's expected count equals the total observed count times its rati… | procedure | missing |  |

</details>

<details><summary><code>masi-2019f-q21</code> · gap</summary>

Tagged pages: p-Value, Hypothesis Testing, Sample Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| A paired t-test reduces two matched samples to a single sample of within-pair differences and tests whether the mean difference equals zero. | procedure | missing |  |
| The sample variance of the differences is s_d^2 = sum (d_i - dbar)^2 / (n - 1), with s_d its square root. | formula | tagged | Sample Variance: “$$S^2 = \frac{1}{n-1}\sum_{i=1}^{n}(X_i - \bar{X})^2$$” |
| The one-sample/paired t statistic is t = dbar / (s_d / sqrt(n)), which follows a t distribution with n - 1 degrees of freedom under H0. | formula | tagged | Sample Variance: “this is what makes the $t$-statistic $\frac{\bar{X}-\mu}{S/\sqrt{n}} \sim t_{n-1}$ work” |
| For a one-sided alternative, orient the differences so the alternative is a mean difference greater than zero, and the rejection region/p-v… | procedure | tagged | p-Value: “a one-sided $H_1: \theta > \theta_0$ uses one tail, a two-sided $H_1: \theta \ne \theta_0$ uses both” |
| The p-value is the smallest significance level at which the null hypothesis would be rejected. | definition | tagged | p-Value: “It is the smallest $\alpha$ at which the observed data would reject $H_0$, which is why software re…” |
| Bound a p-value by comparing the test statistic with critical values from a t table at the given degrees of freedom and finding the tail pr… | procedure | syllabus | Student's t-Distribution: “the entry $c$ satisfies $P(\\|T\\| > c) = $ the column heading.” |

</details>

<details><summary><code>masi-2019f-q22</code> · gap</summary>

Tagged pages: Gamma, Exponential Distribution, Linear Combinations of Random Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| The sum of independent gamma random variables sharing a common scale parameter is gamma with the same scale and shape equal to the sum of t… | fact | missing |  |
| A gamma distribution with shape parameter 1 is an exponential distribution with mean equal to the scale parameter. | fact | tagged | Gamma: “Special cases: exponential ($\alpha = 1$) and chi-squared ($\alpha = n/2$, $\theta = 2$)” |
| For an exponential distribution with mean theta, the survival function is P(X > x) = e^{-x/theta}. | formula | tagged | Exponential Distribution: “Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponentia…” |

</details>

<details><summary><code>masi-2019f-q23</code> · gap</summary>

Tagged pages: Lognormal Distribution, Deductible, Truncation, Payment Random Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| The mean payment per payment (mean excess loss) with an ordinary deductible d is e(d) = E[X - d \| X > d], used when losses below the deduc… | definition | elsewhere | Mean Excess Loss: “The **Mean Excess Loss** $e_X(d)$ is the expected amount by which a loss exceeds $d$, given that it…” |
| When losses below the deductible go unreported, the relevant payment average is conditional on a payment occurring (per-payment basis), not… | fact | tagged | Truncation: “The average of the reported claims estimates $E[X \mid X > d]$, not $E[X]$, so it is biased **upwar…” |
| For a lognormal(mu, sigma) loss, E[X \| X > d] = exp(mu + sigma^2/2) * Phi(sigma - (ln d - mu)/sigma) / (1 - Phi((ln d - mu)/sigma)). | formula | missing |  |
| The lognormal mean is exp(mu + sigma^2/2), and Pr(X > d) = 1 - Phi((ln d - mu)/sigma). | formula | tagged | Lognormal Distribution: “$$E[X] = e^{\mu + \sigma^2/2}$$ … $$F(x) = \Phi\!\left(\frac{\ln x - \mu}{\sigma}\right)$$” |
| Evaluate standard normal CDF probabilities Phi(z) by looking up values in the standard normal table. | procedure | syllabus | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |

</details>

<details><summary><code>masi-2019f-q24</code> · answerable</summary>

Tagged pages: Bias, Maximum Likelihood Estimation, Order Statistics, Uniform Continuous Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For a sample from U(0, θ), the likelihood θ^(-n) is decreasing in θ but requires θ ≥ every observation, so the maximum likelihood estimator… | fact | tagged | Maximum Likelihood Estimation: “for $\text{Uniform}(0, \theta)$, $L(\theta) = \theta^{-n}$ on $\theta \ge \max x_i$ is decreasing, …” |
| The CDF of the maximum of n iid random variables is the n-th power of the individual CDF, so for U(0, θ) Pr(X_(n) ≤ x) = (x/θ)^n and the de… | formula | tagged | Order Statistics: “$$P\bigl(X_{(n)} \le x\bigr) = F_1(x)\,F_2(x)\cdots F_n(x)$$” |
| The expected value of the sample maximum of n iid U(0, θ) observations is nθ/(n+1). | formula | tagged | Bias: “the MLE $\hat\theta = X_{(n)}$ for $\text{Uniform}(0,\theta)$ is biased low by $\theta/(n+1)$” |
| The bias of an estimator is its expected value minus the true parameter value, E[θ̂] − θ. | definition | tagged | Bias: “$$\text{Bias}(\hat\theta) = E[\hat\theta] - \theta$$” |

</details>

<details><summary><code>masi-2019f-q25</code> · gap</summary>

Tagged pages: Logistic Regression, Generalized Linear Model, Link Function, Categorical Predictor

| Item | Kind | Status | Where |
|---|---|---|---|
| A logistic regression model specifies the log-odds ln(p/(1-p)) of the event as a linear combination of the predictors, η = β0 + β1x1 + ... … | definition | tagged | Logistic Regression: “$$\ln\!\left(\frac{\pi}{1-\pi}\right) = \beta_0 + \beta_1 x_1 + \cdots + \beta_p x_p$$” |
| In logistic regression the probability of the event is p = 1/(1 + e^{-η}) = e^η/(1 + e^η), where η is the linear predictor. | formula | tagged | Logistic Regression: “$$\pi = \frac{e^{\eta}}{1 + e^{\eta}} = \frac{1}{1 + e^{-\eta}}$$” |
| A binary categorical predictor enters the linear predictor as an indicator variable: its coefficient is added when the level is present (va… | procedure | tagged | Categorical Predictor: “A categorical predictor with $k$ levels is represented using $k-1$ **indicator (dummy) variables**;…” |
| Because the logistic function is strictly increasing in η, a probability threshold p > c is equivalent to the linear predictor exceeding th… | fact | missing |  |

</details>

<details><summary><code>masi-2019f-q26</code> · answerable</summary>

Tagged pages: Link Function, Interaction, Generalized Linear Model, Design Matrix

| Item | Kind | Status | Where |
|---|---|---|---|
| A GLM with as many linearly independent parameters as observations (a saturated model) reproduces every fitted value exactly on the link sc… | fact | syllabus | Model Fit: “the saturated model, which has one parameter per record and fits perfectly ($D^* = 0$)” |
| In a GLM the link function g relates the mean to the linear predictor, g(μ) = η = Xβ, so the fitted mean is μ = g⁻¹(Xβ). | definition | tagged | Link Function: “connects the **expected value** of the response $\mu = E[Y]$ to the **linear predictor** $\eta = \m…” |
| With a design matrix of intercept, two binary indicators and their product, the interaction coefficient measures the departure from additiv… | definition | tagged | Interaction: “If $\beta_3 = 0$, the two predictors act **additively** on the link scale — no interaction” |
| The identity link gives g(μ)=μ, the inverse link gives g(μ)=1/μ, and the log link gives g(μ)=ln μ; under a log link effects are multiplicat… | fact | tagged | Link Function: “\\| Log \\| $\ln\mu$ \\| $e^\eta$ \\| Poisson (counts), Gamma (severity) \\|” |

</details>

<details><summary><code>masi-2019f-q27</code> · untagged</summary>

Tagged pages: Link Function, Poisson Regression, Exponential Family, Tweedie Distribution, Response Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| A GLM with a canonical link function and an intercept has maximum-likelihood equations that force the fitted values to sum to the observed … | fact | elsewhere | GLM Loss Reserving: “The cross-classified model's likelihood equations set every row total and every column total of fit…” |
| The canonical link of an exponential-family distribution is the link function that equals the natural parameter as a function of the mean (… | definition | tagged | Link Function: “The **canonical link** is the natural link arising from the exponential family form of the distribu…” |
| The canonical link for the Poisson distribution is the log link, while the gamma canonical link is the inverse and the compound Poisson-gam… | fact | tagged | Link Function: “\\| Reciprocal \\| $1/\mu$ \\| $1/\eta$ \\| Gamma (inverse) \\|” |
| A log link guarantees positive predicted means (exp of the linear predictor), whereas an identity link can predict negative values, so iden… | fact | tagged | Link Function: “The **log link** is standard for insurance severity and frequency models because it guarantees posi…” |
| A normal error structure assigns probability to negative values, so it is unsuitable for modelling a strictly non-negative response. | fact | syllabus | Normal Distribution: “is a symmetric, bell-shaped continuous distribution on $(-\infty, \infty)$” |

</details>

<details><summary><code>masi-2019f-q28</code> · answerable</summary>

Tagged pages: Principal Components Regression, Principal Components Analysis, Bias-Variance Tradeoff, Variable Selection

| Item | Kind | Status | Where |
|---|---|---|---|
| Principal component regression replaces the p predictors with the first M principal components (M < p) and fits a regression of the respons… | definition | tagged | Principal Components Regression: “It replaces the $p$ predictors $X_1, \dots, X_p$ with the first $M < p$ principal components $Z_1, …” |
| The first principal component direction is the linear combination of the predictors along which the observations vary the most (has the lar… | definition | tagged | Principal Components Regression: “The first component is the direction along which the observations vary the most. Of all combination…” |
| Because principal components are driven by variance, predictors should be standardized before computing them, otherwise variables on larger… | fact | tagged | Principal Components Regression: “Standardize each predictor before computing the components. Otherwise the high-variance variables d…” |
| Each principal component is a linear combination of all original predictors, so PCR does not remove any original feature and is dimension r… | fact | tagged | Principal Components Regression: “**Not feature selection.** Every $Z_m$ is a linear combination of all $p$ original predictors, so t…” |
| PCR chooses its components without using the response (unsupervised), so it assumes the directions of greatest predictor variation are the … | fact | tagged | Principal Components Regression: “**Its assumption.** PCR assumes that the directions in which $X_1, \dots, X_p$ vary most are also t…” |
| Using fewer components than predictors reduces the number of estimated coefficients, trading a small increase in bias for a decrease in var… | fact | tagged | Principal Components Regression: “The fit estimates the $M + 1$ coefficients $\theta_0, \dots, \theta_M$ instead of $p + 1$. The impl…” |

</details>

<details><summary><code>masi-2019f-q29</code> · answerable</summary>

Tagged pages: Cross-Validation, Mean Square Error, Model Selection

| Item | Kind | Status | Where |
|---|---|---|---|
| Leave-One-Out Cross Validation (LOOCV) fits the model n times, each time training on all observations but one, and evaluates the fit on the… | definition | tagged | Cross-Validation: “**$k$-fold**: split the data into $k$ equal parts, fit on $k-1$ and score on the held-out fold, the…” |
| To compute LOOCV error from a table of fitted values by training subset, use only the prediction for the observation omitted from each trai… | procedure | tagged | Cross-Validation: “**$k$-fold**: split the data into $k$ equal parts, fit on $k-1$ and score on the held-out fold, the…” |
| The LOOCV mean squared error is CV(n) = (1/n) Σ (y_i − ŷ_(i))², the average of squared errors between each observation and its prediction f… | formula | linked | Test Error: “**Leave-one-out (LOOCV):** $\text{CV}_{(n)} = \frac{1}{n}\sum \text{MSE}_i$.” |
| When choosing between models by cross-validation, prefer the model with the smaller cross-validated mean squared error. | fact | tagged | Cross-Validation: “Cross-validation is what turns the [[Bias-Variance Tradeoff]] into a decision: training error falls…” |

</details>

<details><summary><code>masi-2019f-q3</code> · answerable</summary>

Tagged pages: Compound Poisson Process, Aggregate Loss Model, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| A compound Poisson process S(t) is the sum of N(t) independent, identically distributed random amounts Y_i, where N(t) is a Poisson process… | definition | tagged | Compound Poisson Process: “The severities $X_1, X_2, \ldots$ are i.i.d., independent of the counting process $N(t)$” |
| For a compound Poisson process with rate λ and i.i.d. amounts Y, Var[S(t)] = λ t E[Y^2], i.e., the variance equals the Poisson mean number … | formula | tagged | Compound Poisson Process: “\text{Var}(S(t)) = \lambda t\, E[X^2]” |
| In a homogeneous Poisson process with rate λ, the number of events in an interval of length t is Poisson with mean λt. | fact | tagged | Compound Poisson Process: “N(t) \sim \text{Poi}(\lambda t)” |
| The second moment of a discrete random variable is E[Y^2] = Σ y^2 P(Y = y). | formula | linked | Random Variable: “E[g(X)] = \sum_i g(x_i)\,P(X = x_i) + \int g(x)\,f(x)\,dx” |

</details>

<details><summary><code>masi-2019f-q30</code> · answerable</summary>

Tagged pages: Residual Plot, Bias-Variance Tradeoff, Linear Regression, Model Diagnostics

| Item | Kind | Status | Where |
|---|---|---|---|
| Linear splines, local regression, polynomial regression and step functions extend linear regression to capture non-linear relationships bet… | fact | syllabus | Regression Spline: “A **linear spline** is a line in each region, continuous at each knot.” |
| To check a linear regression's fit, plot residuals against the predictor; a random band centered on zero with constant spread indicates the… | procedure | tagged | Residual Plot: “\\| Curved pattern \\| **Non-linearity** — a transform or polynomial term is needed \\|” |
| Adding model flexibility beyond what the data's true structure requires fits noise, which lowers training error but raises variance and ten… | fact | tagged | Bias-Variance Tradeoff: “Adding terms, interactions, or levels lowers bias and raises variance. Removing them does the rever…” |

</details>

<details><summary><code>masi-2019f-q31</code> · answerable</summary>

Tagged pages: Outlier, Linear Regression, Residual Plot, Model Diagnostics

| Item | Kind | Status | Where |
|---|---|---|---|
| Cook's distance for observation i is D_i = (r_i^2 / p) * h_i/(1 - h_i), where r_i is the standardized (internally studentized) residual, h_… | formula | tagged | Outlier: “$D_i = \dfrac{e_i^2}{p \cdot \text{MSE}} \cdot \dfrac{h_{ii}}{(1 - h_{ii})^2}$” |
| An observation is classified as influential under Cook's distance when D_i exceeds the chosen threshold (e.g., 1). | fact | tagged | Model Diagnostics: “A common flag is $D_i > 1$; some texts use $4/n$.” |
| The number of parameters p in a simple linear regression with one predictor and an intercept is 2 (the intercept counts as a parameter). | fact | tagged | Outlier: “with $p$ the number of coefficients including the intercept” |
| Leverage h_i measures how much influence an observation's predictor values have on its own fitted value (the diagonal of the hat matrix); h… | definition | tagged | Outlier: “A **high-leverage** point is different: its *predictor* values are unusual, measured by the leverag…” |

</details>

<details><summary><code>masi-2019f-q32</code> · answerable</summary>

Tagged pages: AIC, BIC, Generalized Linear Model, Maximum Likelihood Estimation, Model Selection

| Item | Kind | Status | Where |
|---|---|---|---|
| AIC = -2 ln L + 2p, where L is the maximized likelihood and p is the number of estimated parameters. | formula | tagged | AIC: “$$\text{AIC} = -2\ell(\hat{\boldsymbol{\beta}}) + 2p$$” |
| BIC = -2 ln L + p ln n, where L is the maximized likelihood, p is the number of parameters and n is the number of observations. | formula | tagged | BIC: “$$\text{BIC} = -2\ell(\hat{\boldsymbol{\beta}}) + p\ln(n)$$” |
| When comparing models by AIC or BIC, the model with the lowest criterion value is preferred, because the criterion penalizes the log-likeli… | fact | tagged | AIC: “**Lower AIC** indicates a better model (better fit relative to complexity)” |

</details>

<details><summary><code>masi-2019f-q33</code> · answerable</summary>

Tagged pages: Deviance, Exponential Distribution, Maximum Likelihood Estimation

| Item | Kind | Status | Where |
|---|---|---|---|
| Deviance is twice the difference between the log-likelihood of the saturated model and the log-likelihood of the fitted model. | definition | tagged | Deviance: “$$D^* = 2\left[\ell_{\text{sat}} - \ell(\hat{\boldsymbol{\beta}})\right] = 2\left[\ell(\text{satura…” |
| The saturated model has a separate free parameter for each observation, so each observation is fitted perfectly (its parameter estimate is … | definition | tagged | Deviance: “It compares the fitted model to the **saturated model** (a model with one parameter per observation…” |
| For an exponential distribution with mean theta, the maximum likelihood estimate of theta is the sample mean (for a single observation, the… | fact | tagged | Maximum Likelihood Estimation (collapsed): “Setting $\ell'(\theta) = -\frac{n}{\theta} + \frac{\sum x_i}{\theta^2} = 0$ gives $\hat{\theta} = \…” |
| The exponential log-likelihood for one observation is -ln(theta) - x/theta, and the total log-likelihood for independent observations is th… | formula | tagged | Maximum Likelihood Estimation (collapsed): “For $\text{Exp}(\theta)$: $f(x) = \frac{1}{\theta}e^{-x/\theta}$, so $\ell(\theta) = -n\ln\theta - …” |

</details>

<details><summary><code>masi-2019f-q34</code> · answerable</summary>

Tagged pages: Cross-Validation, Bias-Variance Tradeoff, Generalized Linear Model, Test Error

| Item | Kind | Status | Where |
|---|---|---|---|
| k-fold cross validation splits the data into k folds, repeatedly trains on k-1 folds and validates on the held-out fold, then averages the … | definition | tagged | Cross-Validation: “**$k$-fold**: split the data into $k$ equal parts, fit on $k-1$ and score on the held-out fold, the…” |
| k-fold cross validation requires only k model fits whereas LOOCV requires n fits, so k-fold with k < n is computationally cheaper, especial… | fact | tagged | Cross-Validation: “**Leave-one-out** ($k = n$) is nearly unbiased but has high variance and is expensive — except in a…” |
| Each k-fold training set is smaller than a LOOCV training set (n - 1 observations), so k-fold test error estimates have more upward bias th… | fact | tagged | Cross-Validation: “**Leave-one-out** ($k = n$) is nearly unbiased but has high variance and is expensive — except in a…” |
| LOOCV estimates have higher variance than k-fold estimates because the n training sets are nearly identical, making the fitted models and t… | fact | tagged | Cross-Validation: “and the $k$ training sets overlap less than LOOCV's, so the estimate has lower variance” |

</details>

<details><summary><code>masi-2019f-q35</code> · answerable</summary>

Tagged pages: Unbiasedness, Bias, Linear Regression, Ordinary Least Squares

| Item | Kind | Status | Where |
|---|---|---|---|
| The bias of an estimator is its expected value over repeated samples minus the true parameter value: Bias(θ̂) = E[θ̂] − θ. | definition | tagged | Unbiasedness: “$$\text{Bias}(\hat{\theta}) = E[\hat{\theta}] - \theta = 0$$” |
| Bias is a property of the estimator across repeated samples, so the estimates from a single sample cannot by themselves reveal bias; their … | fact | tagged | Bias: “Bias is about the *centre* of the estimator's [[Sampling Distribution]], variance about its *spread…” |
| When the regression model is correctly specified (the true relationship is linear in the regressors with independent, mean-zero errors), th… | fact | tagged | Linear Regression: “OLS is the [[Maximum Likelihood Estimation\\|MLE]] under Normal errors, and by Gauss–Markov it is th…” |

</details>

<details><summary><code>masi-2019f-q36</code> · answerable</summary>

Tagged pages: Regularization, Cross-Validation, Variable Selection

| Item | Kind | Status | Where |
|---|---|---|---|
| Ridge regression chooses coefficients to minimize RSS plus lambda times the sum of squared slope coefficients, while lasso minimizes RSS pl… | formula | tagged | Regularization: “$$\text{Ridge:}\quad \min_{\beta}\ \mathrm{RSS} + \lambda\sum_{j=1}^{p}\beta_j^{2}$$ … $$\text{Lass…” |
| When the tuning parameter lambda is 0 the penalty vanishes and ridge/lasso give the unconstrained least squares estimates; as lambda approa… | fact | tagged | Regularization: “$\lambda = 0$ returns least squares; $\lambda \to \infty$ drives every coefficient to zero.” |
| Ridge regression shrinks coefficients toward zero but does not set any exactly to zero, so it retains all predictors, whereas the lasso can… | fact | tagged | Regularization: “**Ridge** ($\ell_2$) shrinks all coefficients smoothly and keeps every predictor … **Lasso** ($\ell…” |
| The tuning parameter lambda is selected by cross-validation: compute the cross-validation error over a grid of lambda values and choose the… | procedure | tagged | Regularization: “Standardize the predictors, fit over a grid of $\lambda$, and pick $\lambda$ by 10-fold CV” |

</details>

<details><summary><code>masi-2019f-q37</code> · answerable</summary>

Tagged pages: Regularization, Residual Sum of Squares

| Item | Kind | Status | Where |
|---|---|---|---|
| Ridge regression in budget (constrained) form chooses the coefficient estimates that minimize the residual sum of squares subject to the su… | definition | tagged | Regularization: “\text{Budget form:}\quad \min_{\beta}\ \mathrm{RSS} \ \text{ subject to } \sum_{j=1}^{p}\beta_j^{2}…” |
| The intercept is not penalized in ridge regression, so the constraint applies only to the slope coefficients (sum of squared slopes ≤ s) an… | fact | tagged | Regularization: “The intercept is left unpenalized” |
| To find a constrained estimate from a grid of candidate parameter values, keep only the candidates satisfying the constraint and select the… | procedure | tagged | Regularization: “$$\text{Budget form:}\quad \min_{\beta}\ \mathrm{RSS} \ \text{ subject to } \sum_{j=1}^{p}\beta_j^{…” |

</details>

<details><summary><code>masi-2019f-q38</code> · answerable</summary>

Tagged pages: Regression Spline, Bias-Variance Tradeoff

| Item | Kind | Status | Where |
|---|---|---|---|
| A cubic spline is a piecewise cubic polynomial joined at knots, with the curve and its first and second derivatives continuous at each knot. | definition | tagged | Regression Spline: “A **cubic spline** is continuous, with continuous first and second derivatives, so it uses $K + 4$ …” |
| A cubic spline with K knots uses K + 4 degrees of freedom (including the intercept): a full cubic in the first region plus one extra cubic-… | fact | tagged | Regression Spline: “A **cubic spline** is continuous, with continuous first and second derivatives, so it uses $K + 4$ …” |
| A natural cubic spline is a cubic spline constrained to be linear in the boundary regions before the first knot and after the last knot. | definition | tagged | Regression Spline: “A natural spline adds boundary constraints: the function must be linear below the smallest knot and…” |
| Requiring linearity in a boundary region removes its quadratic and cubic terms, i.e., two constraints at each end, so a natural cubic splin… | fact | tagged | Regression Spline (collapsed): “The natural spline loses two more degrees of freedom at each end, where its quadratic and cubic ter…” |

</details>

<details><summary><code>masi-2019f-q39</code> · answerable</summary>

Tagged pages: Variable Selection, Residual Sum of Squares, p-Value

| Item | Kind | Status | Where |
|---|---|---|---|
| Forward stepwise selection starts from the current model, fits every candidate model that adds exactly one unused predictor, and adds the p… | procedure | tagged | Variable Selection: “Start with no predictors; at each step add the one that most improves the fit; choose among the res…” |
| Among candidate models with the same number of predictors, the best one is the one with the lowest RSS (equivalently highest R-squared); p-… | fact | tagged | Variable Selection: “Fit every combination of the $p$ predictors; keep the best model of each size (lowest RSS, or lowes…” |
| With no stopping rule, forward stepwise selection continues adding variables until all predictors are in the model, so a predictor's signif… | fact | tagged | Variable Selection: “Start with no predictors; at each step add the one that most improves the fit; choose among the res…” |

</details>

<details><summary><code>masi-2019f-q4</code> · gap</summary>

Tagged pages: Exponential Distribution, Order Statistics, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The exponential distribution is memoryless: given that a component has survived to a time, its remaining lifetime has the same exponential … | fact | tagged | Exponential Distribution: “A direct consequence: given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$.” |
| The minimum of independent exponential random variables is exponential with rate equal to the sum of the individual rates, so with n indepe… | fact | tagged | Order Statistics: “$$P\bigl(X_{(1)} > x\bigr) = \bigl[1 - F_1(x)\bigr]\bigl[1 - F_2(x)\bigr]\cdots\bigl[1 - F_n(x)\big…” |
| To find the expected time of the k-th order statistic of independent exponentials, decompose it into successive spacings between failures, … | procedure | missing |  |
| The range between the first and last failure equals the maximum minus the minimum, so its expectation is E[max] − E[min] by linearity of ex… | fact | missing |  |

</details>

<details><summary><code>masi-2019f-q40</code> · answerable</summary>

Tagged pages: Variable Selection, Combination

| Item | Kind | Status | Where |
|---|---|---|---|
| Best subset selection fits every possible combination of the p predictors (each in or out), so it fits 2^p models including the null model. | fact | tagged | Variable Selection: “Best subset selection fits all $2^p$ models; forward and backward stepwise each fit only $1 + p(p+1…” |
| Forward stepwise selection starts with the null model and at each step adds the one remaining predictor that most improves the fit, fitting… | procedure | tagged | Variable Selection: “Start with no predictors; at each step add the one that most improves the fit” |
| Forward stepwise selection fits at most 1 + p(p+1)/2 models in total, counting the null model. | formula | tagged | Variable Selection: “Best subset selection fits all $2^p$ models; forward and backward stepwise each fit only $1 + p(p+1…” |

</details>

<details><summary><code>masi-2019f-q5</code> · answerable</summary>

Tagged pages: Stochastic Processes, Independent Events, System Reliability

| Item | Kind | Status | Where |
|---|---|---|---|
| The reliability of a system is the probability that the system functions, determined by the reliabilities of its components and how they ar… | definition | tagged | System Reliability: “**System Reliability** is the probability that a system of components functions, when whether the s…” |
| For a series system of independent components, the system works only if all components work, so reliability is the product of the component… | formula | tagged | System Reliability: “**Series** (works only if all work): $\phi = \prod x_i$ and $r = \prod p_i$.” |
| For a parallel system of independent components, the system works if at least one component works, so reliability is 1 minus the product of… | formula | tagged | System Reliability: “**Parallel** (works if any works): $\phi = 1 - \prod(1 - x_i)$ and $r = 1 - \prod(1 - p_i)$.” |
| To find the reliability of a mixed system, reduce it by treating each parallel or series block as a single component with its own reliabili… | procedure | tagged | System Reliability (collapsed): “Condition on component 3. If it works, the system is (1 or 2) in series with (4 or 5); if not, it i…” |

</details>

<details><summary><code>masi-2019f-q6</code> · gap</summary>

Tagged pages: Inclusion-Exclusion Principle, Stochastic Processes, Independent Events, System Reliability

| Item | Kind | Status | Where |
|---|---|---|---|
| A cut set is a set of components whose joint failure causes the system to fail; a minimal cut set is a cut set with no proper subset that i… | definition | tagged | System Reliability: “a **minimal cut set** is a set whose failure alone makes it fail, again minimal.” |
| A system fails exactly when all components of at least one minimal cut set fail, so system failure probability is the probability of the un… | fact | tagged | System Reliability: “a **minimal cut set** is a set whose failure alone makes it fail, again minimal.” |
| For independent components, the probability that all components in a cut set fail is the product of their individual failure probabilities,… | formula | tagged | Independent Events: “$$P(A^c \cap B^c) = (1 - P(A))\,(1 - P(B))$$” |
| Inclusion-exclusion bounds on a union alternate: the first bound (sum of individual event probabilities) is an upper bound on the union, th… | fact | missing |  |
| Applying inclusion-exclusion to the cut-set failure events: an upper bound on failure probability (the first bound) gives a lower bound on … | procedure | missing |  |

</details>

<details><summary><code>masi-2019f-q7</code> · untagged</summary>

Tagged pages: Hazard Rate, Survival Model, Exponential Distribution, Independent Events, System Reliability

| Item | Kind | Status | Where |
|---|---|---|---|
| A series system fails when its first component fails, so it survives to time t only if all components survive to t; with independent compon… | fact | tagged | System Reliability: “**Series** (works only if all work): $\phi = \prod x_i$ and $r = \prod p_i$.” |
| Survival probability from the hazard rate: S(t) = exp(-∫_0^t r(s) ds), so the conditional survival from age x to t is S(t)/S(x) = exp(-∫_x^… | formula | tagged | Hazard Rate: “S(t) = \exp\!\left(-\int_0^t \mu(s)\,ds\right)” |
| A constant hazard rate λ corresponds to an exponential lifetime with S(t)=e^{-λt}, which is memoryless. | fact | tagged | Hazard Rate: “A **constant** hazard rate $\mu(t) = \mu$ corresponds to the [[Exponential Distribution\\|Exponentia…” |
| A hazard rate of 1/(ω−t) corresponds to a uniform (de Moivre) lifetime on (0, ω) with S(t) = (ω−t)/ω. | fact | elsewhere | Parametric Survival Model: “De Moivre's law has $\mu_x = 1/(\omega - x)$, so $T_x$ is [[Uniform Continuous Distribution\\|unifor…” |
| The probability that failure occurs between ages a and b, given survival to the current age, equals S(a) − S(b) using the conditional survi… | procedure | tagged | Survival Model: “_tp_x = P(T_x > t) = S(x+t)/S(x)” |

</details>

<details><summary><code>masi-2019f-q8</code> · answerable</summary>

Tagged pages: Markov Chain, Conditional Probability, Stochastic Processes

| Item | Kind | Status | Where |
|---|---|---|---|
| A Markov chain has the property that the distribution of the next state depends only on the current state; if transition probabilities depe… | definition | tagged | Markov Chain: “A **Markov Chain** is a [[Stochastic Processes\\|stochastic process]] $\{X_n\}$ on a discrete state …” |
| When transition probabilities depend on history such as the current winning streak, define states by the relevant history (e.g., loss, firs… | procedure | syllabus | Transition Probability Matrix (collapsed): “Let the state be (two years ago, last year), each C (claim) or N (none). From $(a, b)$ the chain mo…” |
| To find a multi-step probability, enumerate all paths of intermediate states, multiply the transition probabilities along each path, and su… | procedure | tagged | Markov Chain (collapsed): “Sum over the intermediate class (the Markov property ignores earlier history):” |
| The probability of the complementary event (e.g., losing) equals one minus the probability of the event (winning) in the same state. | fact | tagged | Conditional Probability: “- The complement rule holds conditionally: the probability of the complement of an event given $B$ …” |

</details>

<details><summary><code>masi-2019f-q9</code> · answerable</summary>

Tagged pages: Recurrent and Transient States, Markov Chain, Stochastic Processes

| Item | Kind | Status | Where |
|---|---|---|---|
| A communicating class is a set of states in which every state can reach every other state (accessible in both directions) through positive-… | definition | tagged | Recurrent and Transient States: “State $j$ is *accessible* from $i$ if $P^n_{ij} > 0$ for some $n \geq 0$, and $i$ and $j$ *communic…” |
| To find communicating classes, read the positive entries of the transition matrix as one-step moves and trace paths (including multi-step p… | procedure | tagged | Recurrent and Transient States (collapsed): “Read the one-step moves off the nonzero entries: $1 \to \{1, 2\}$, $2 \to \{1, 2\}$, $3 \to \{1, 2\…” |
| A class of states is closed if no state in the class can reach any state outside it, i.e. the transition probabilities out of the class are… | definition | tagged | Recurrent and Transient States: “In a finite chain a class is recurrent exactly when it is **closed** (no state outside it is access…” |
| In a finite-state Markov chain, a closed communicating class is recurrent, while a class from which the chain can leave and never return co… | fact | tagged | Recurrent and Transient States: “In a finite chain a class is recurrent exactly when it is **closed** (no state outside it is access…” |
| An absorbing state is a state i with P_ii = 1; it forms its own closed class and is recurrent. | definition | tagged | Recurrent and Transient States: “State 5 is absorbing, hence recurrent too.” |

</details>

<details><summary><code>masi-2019s-q1</code> · answerable</summary>

Tagged pages: Poisson Process, Poisson Distribution, Counting Process

| Item | Kind | Status | Where |
|---|---|---|---|
| A Poisson process has independent increments, so counts over non-overlapping time intervals are independent. | fact | tagged | Poisson Process: “The number of events in non-overlapping intervals are **independent**” |
| In a Poisson process with rate lambda, the number of arrivals in an interval of length t is Poisson distributed with mean lambda times t. | fact | tagged | Poisson Process: “The number of events in any interval of length $t$ has distribution $\text{Poi}(\lambda t)$” |
| For a Poisson random variable with mean m, P(N=k) = e^{-m} m^k / k!. | formula | tagged | Poisson Process: “$$P(N(t) = k) = \frac{e^{-\lambda t}(\lambda t)^k}{k!}$$” |

</details>

<details><summary><code>masi-2019s-q10</code> · gap</summary>

Tagged pages: Gambler's Ruin Problem, Markov Chain, Independent Events, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| In a simple random walk with up-probability p = 1/2 (symmetric), the probability of reaching N before hitting 0 starting from i is i/N (gam… | fact | tagged | Gambler's Ruin Problem: “P_i = \begin{cases} \dfrac{1 - (q/p)^i}{1 - (q/p)^N} & p \neq \tfrac12 \\[10pt] \dfrac{i}{N} & p = …” |
| The probability that two independent events both occur is the product of their individual probabilities, so independent gamblers' success p… | fact | tagged | Independent Events: “P(A \cap B) = P(A) \cdot P(B)” |
| To maximize a function of a single variable, set its derivative to zero and verify it is a maximum (e.g., a downward-opening parabola attai… | procedure | missing |  |

</details>

<details><summary><code>masi-2019s-q11</code> · answerable</summary>

Tagged pages: Life Annuity, Life Table, Annuity Due, Present Value

| Item | Kind | Status | Where |
|---|---|---|---|
| A temporary (n-year) life annuity-due pays 1 at the start of each year while the annuitant is alive, for at most n years, and its present v… | definition | tagged | Life Annuity: “- **Temporary** annuity (pays until death or $n$ years, whichever comes first): $\ddot{a}_{x:\overl…” |
| A temporary life annuity-due equals the whole life annuity-due at the issue age minus the n-year pure endowment factor times the whole life… | formula | tagged | Life Annuity: “- **Temporary** annuity (pays until death or $n$ years, whichever comes first): $\ddot{a}_{x:\overl…” |
| The n-year pure endowment factor is nE_x = v^n · l_{x+n}/l_x, the discounted probability of surviving n years. | formula | tagged | Life Table: “$_{t}p_x = \frac{\ell_{x+t}}{\ell_x}” |
| Read the values of ä_x and l_x from the Illustrative Life Table at the stated interest rate for the required ages. | procedure | tagged | Life Annuity: “The Illustrative Life Table ($i = 0.06$) gives $1000q_{40} = 2.78$, $\ddot{a}_{41} = 14.6864$ and $…” |

</details>

<details><summary><code>masi-2019s-q12</code> · untagged</summary>

Tagged pages: Life Annuity, Annuity Due, Survival Model

| Item | Kind | Status | Where |
|---|---|---|---|
| The whole life annuity-due satisfies the recursion ä_x = 1 + v p_x ä_{x+1}, where v = 1/(1+i) and p_x = 1 − q_x. | formula | tagged | Life Annuity: “$$\ddot{a}_x = 1 + v\,p_x\,\ddot{a}_{x+1}$$” |
| The annuity value ä_{x+k} depends only on survival probabilities at ages x+k and later, so changing p_{x+1} alters ä_{x+1} and ä_x but leav… | fact | tagged | Life Annuity: “**Recursion:** an annuity-due on $(x)$ is a payment of 1 now plus, if $(x)$ survives the year, an a…” |
| The survival probability p_x equals 1 − q_x, the complement of the one-year death probability. | definition | tagged | Survival Model: “- $_{t}p_x = \dfrac{S(x+t)}{S(x)}$ and $_{t}q_x = 1 - {_t}p_x$” |
| To find the change in an annuity value from a change in one survival probability, propagate the change back through the recursion: Δä_{x+1}… | procedure | tagged | Life Annuity: “$$\ddot{a}_x = 1 + v\,p_x\,\ddot{a}_{x+1}$$” |
| The actuarial present value of an annuity-due paying a level amount B per year equals B times the unit annuity-due value ä_x, so changes sc… | fact | elsewhere | Annuity Contract: “$$\text{Deferred: } \text{EPV} = B\;{}_nE_x\;\ddot{a}_{x+n}$$” |

</details>

<details><summary><code>masi-2019s-q13</code> · answerable</summary>

Tagged pages: Inversion Method, Weibull Distribution, Cumulative Distribution Function (CDF), Uniform Continuous Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The Weibull(θ, τ) distribution function is F(x) = 1 - exp(-(x/θ)^τ). | formula | tagged | Weibull Distribution: “$$F(x) = 1 - e^{-(x/\theta)^{\tau}}$$” |
| In the inversion method, simulate a random variable by setting a uniform(0,1) draw U equal to the CDF F(X) and solving for X = F^{-1}(U). | procedure | tagged | Inversion Method: “The **Inversion Method** (inverse transform method) simulates a draw from a distribution with [[Cum…” |
| Inverting the Weibull CDF gives X = θ[-ln(1-U)]^{1/τ}. | formula | tagged | Weibull Distribution: “Inverting $F$ gives the [[Inversion Method\\|inversion]] formula $x = \theta\left[-\ln(1 - u)\right]…” |

</details>

<details><summary><code>masi-2019s-q14</code> · answerable</summary>

Tagged pages: Rejection Method, Beta, Uniform Continuous Distribution, Probability Density Function (PDF)

| Item | Kind | Status | Where |
|---|---|---|---|
| In the acceptance-rejection method, the acceptance probability f(Y)/(c g(Y)) must not exceed 1, so c must satisfy f(x) ≤ c·g(x) for all x i… | fact | tagged | Rejection Method: “$$c \geq \max_x \frac{f(x)}{g(x)}$$” |
| The smallest valid constant c in the rejection method equals the maximum over the support of the ratio f(x)/g(x), found by maximizing the r… | procedure | tagged | Rejection Method: “$g(x) = 1$, so $c$ is the maximum of the density, $c = \max_x f(x)$, found by setting $f'(x) = 0$.” |
| A beta density with parameters a and b and θ = 1 is f(x) = [Γ(a+b)/(Γ(a)Γ(b))] x^(a-1) (1-x)^(b-1) for 0 < x < 1. | formula | tagged | Beta: “$$f(x) = \frac{x^{\alpha - 1}(1-x)^{\beta - 1}}{B(\alpha,\, \beta)}$$ … $$\text{where } B(\alpha, \…” |

</details>

<details><summary><code>masi-2019s-q15</code> · answerable</summary>

Tagged pages: Maximum Likelihood Estimation, Single-Parameter Pareto Distribution, Cumulative Distribution Function (CDF), Probability Density Function (PDF)

| Item | Kind | Status | Where |
|---|---|---|---|
| The single-parameter Pareto distribution with fixed scale θ has survival function S(x) = (θ/x)^α and density f(x) = α θ^α / x^(α+1) for x >… | definition | tagged | Single-Parameter Pareto Distribution: “$$f(x) = \frac{\alpha\,\theta^{\alpha}}{x^{\alpha + 1}}, \quad x > \theta$$” |
| Maximum likelihood estimation: write the likelihood as the product of densities over the sample, take the log, differentiate with respect t… | procedure | tagged | Maximum Likelihood Estimation: “When the maximum is at an interior point and the log-likelihood is differentiable, the MLE solves t…” |
| For a single-parameter Pareto with known θ and n observations, the MLE is α̂ = n / (Σ ln x_i − n ln θ). | formula | tagged | Single-Parameter Pareto Distribution: “That is why the [[Maximum Likelihood Estimation\\|maximum likelihood estimate]] of $\alpha$ from a s…” |
| By the invariance property of maximum likelihood estimators, the MLE of a function of the parameter (such as a probability) is obtained by … | fact | tagged | Maximum Likelihood Estimation: “**Invariance property**: if $\hat{\theta}$ is the MLE of $\theta$, then $g(\hat{\theta})$ is the ML…” |

</details>

<details><summary><code>masi-2019s-q16</code> · answerable</summary>

Tagged pages: Bias, Sample Variance, Unbiasedness

| Item | Kind | Status | Where |
|---|---|---|---|
| The bias of an estimator is its expected value minus the true value of the parameter being estimated: Bias(θ̂) = E[θ̂] − θ. | definition | tagged | Bias: “**Bias** is the systematic error of an estimator: the difference between its expected value and the…” |
| For a random sample with variance σ², the expected sum of squared deviations from the sample mean is (n−1)σ², so dividing by n−1 gives an u… | fact | tagged | Sample Variance: “Dividing the sum of squared deviations by $n - 1$ rather than $n$ makes it an [[Unbiasedness\\|unbia…” |
| The variance estimator that divides the sum of squared deviations by n (rather than n−1) has expected value ((n−1)/n)σ², so it is biased lo… | fact | tagged | Sample Variance: “Dividing by $n$ instead gives $\hat\sigma^2 = \frac{n-1}{n}S^2$, which is biased low by $\sigma^2/n…” |
| The standard normal distribution N(0,1) has mean 0 and variance 1, so the true population variance is 1. | fact | syllabus | Normal Distribution: “The **Normal Distribution** $X \sim N(\mu, \sigma^2)$ is a symmetric, bell-shaped continuous distri…” |

</details>

<details><summary><code>masi-2019s-q17</code> · answerable</summary>

Tagged pages: Mean Square Error, Bias, Linear Combinations of Random Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| The mean squared error of an estimator is the expected squared difference between the estimator and the true parameter value. | definition | tagged | Mean Square Error: “$$= E\!\left[(\hat{\theta} - \theta)^2\right]$$” |
| The mean squared error of an estimator equals its variance plus the square of its bias: MSE = Var + Bias^2. | formula | tagged | Mean Square Error: “$$= \text{Var}(\hat{\theta}) + \left(\text{Bias}(\hat{\theta})\right)^2$$” |
| The bias of an estimator is its expected value minus the true value of the parameter. | definition | tagged | Bias: “**Bias** is the systematic error of an estimator: the difference between its expected value and the…” |
| The variance of a linear combination of random variables is Var(aX + bY) = a^2 Var(X) + b^2 Var(Y) + 2ab Cov(X, Y), and the covariance term… | formula | tagged | Linear Combinations of Random Variables: “$$\text{Var}(L) = \sum_{i=1}^{n} c_i^2\,\text{Var}(X_i) + 2\sum_{i < j} c_i c_j\,\text{Cov}(X_i, X_…” |
| Expectation is linear: E(aX + bY) = aE(X) + bE(Y). | fact | tagged | Linear Combinations of Random Variables: “$$E[L] = \sum_{i=1}^{n} c_i\,E[X_i]$$” |

</details>

<details><summary><code>masi-2019s-q18</code> · answerable</summary>

Tagged pages: Method of Moments, Maximum Likelihood Estimation, Uniform Continuous Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For a uniform distribution on [0, θ], the mean is θ/2. | fact | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The method of moments estimator sets the population moment (as a function of the parameter) equal to the sample moment and solves for the p… | procedure | tagged | Method of Moments: “The **Method of Moments** (MoM) estimates parameters by setting the sample moments equal to the the…” |
| For a uniform distribution on [0, θ], the method of moments estimate of θ is twice the sample mean. | formula | tagged | Method of Moments (collapsed): “MoM: $E[X] = \theta/2$, so $\hat\theta_{\text{MoM}} = 2\bar{x} = 12$.” |
| For a uniform distribution on [0, θ], the likelihood is θ^(-n) for θ at least as large as every observation, and zero otherwise, so it is d… | fact | tagged | Maximum Likelihood Estimation: “for $\text{Uniform}(0, \theta)$, $L(\theta) = \theta^{-n}$ on $\theta \ge \max x_i$ is decreasing, …” |

</details>

<details><summary><code>masi-2019s-q19</code> · answerable</summary>

Tagged pages: Sufficient Statistic, Maximum Likelihood Estimation, Method of Moments, Minimum Variance, Sufficiency

| Item | Kind | Status | Where |
|---|---|---|---|
| The maximum likelihood estimator maximizes the likelihood function of the sample; when the likelihood is monotonic in the parameter, the ma… | procedure | tagged | Maximum Likelihood Estimation: “for $\text{Uniform}(0, \theta)$, $L(\theta) = \theta^{-n}$ on $\theta \ge \max x_i$ is decreasing, …” |
| For a uniform U(0, β) sample, the likelihood is β^(-n) for β at least the sample maximum and zero otherwise, so the MLE of β is the sample … | fact | tagged | Maximum Likelihood Estimation: “for $\text{Uniform}(0, \theta)$, $L(\theta) = \theta^{-n}$ on $\theta \ge \max x_i$ is decreasing, …” |
| The method of moments estimator is found by setting the population moment (e.g., E[X]) equal to the sample moment (e.g., the sample mean) a… | procedure | tagged | Method of Moments: “The **Method of Moments** (MoM) estimates parameters by setting the sample moments equal to the the…” |
| For U(0, β), E[X] = β/2, so the method of moments estimator is 2·X̄, which differs from the sample maximum. | fact | tagged | Method of Moments (collapsed): “MoM: $E[X] = \theta/2$, so $\hat\theta_{\text{MoM}} = 2\bar{x} = 12$.” |
| A statistic is sufficient for a parameter if it captures all the information in the sample about the parameter; by the factorization theore… | definition | tagged | Sufficient Statistic: “$$f(x_1, \ldots, x_n \mid \theta) = g(T(x_1,\ldots,x_n),\, \theta) \cdot h(x_1, \ldots, x_n)$$” |
| For a U(0, β) sample, the maximum of the observations is a complete sufficient statistic for β and has expected value nβ/(n+1), so (n+1)/n … | fact | tagged | Minimum Variance: “for $\text{Uniform}(0,\theta)$ the support depends on $\theta$, and $\frac{n+1}{n}X_{(n)}$ is unbia…” |
| By the Lehmann–Scheffé theorem, an unbiased estimator that is a function of a complete sufficient statistic is the minimum variance unbiase… | fact | syllabus | Rao-Blackwell Theorem: “**Lehmann–Scheffé Theorem.** If $T$ is complete and sufficient and $\varphi(T)$ is unbiased for $\t…” |

</details>

<details><summary><code>masi-2019s-q2</code> · answerable</summary>

Tagged pages: Poisson Process, Interarrival Time, Gamma

| Item | Kind | Status | Where |
|---|---|---|---|
| In a homogeneous Poisson process with rate lambda, the interarrival times are independent exponential random variables with mean 1/lambda. | fact | tagged | Poisson Process: “Interarrival times $T_1, T_2, \ldots$ are i.i.d. $\text{Exponential}(\lambda)$ with mean $1/\lambda$” |
| The waiting time until the nth event of a Poisson process, being a sum of n independent exponential interarrival times, follows a gamma dis… | fact | tagged | Poisson Process: “The waiting time $S_n = T_1 + \cdots + T_n$ to the $n$-th event follows a [[Gamma]] distribution wi…” |
| For a gamma distribution with shape n and rate lambda, the mean is n/lambda and the variance is n/lambda^2. | formula | tagged | Interarrival Time: “The arrival time $S_n$ of the $n$-th event is Gamma (Erlang) with shape $n$ and rate $\lambda$, mea…” |

</details>

<details><summary><code>masi-2019s-q20</code> · answerable</summary>

Tagged pages: Kernel Density Estimation, Probability Density Function (PDF), Uniform Continuous Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A kernel density estimate at x is the average over the n observations of the kernel function centered at each observation: f~(x) = (1/n) * … | formula | tagged | Kernel Density Estimation: “Equivalently, the kernel centred at an observation $y$ is $k_y(x) = \frac{1}{b}\,w\!\left(\frac{x -…” |
| The rectangular (uniform) kernel with bandwidth b centered at y equals 1/(2b) for y - b <= x <= y + b and 0 otherwise. | formula | tagged | Kernel Density Estimation: “each observation is spread evenly over $[y - b,\ y + b]$ at height $\frac{1}{2b}$, so $\hat{f}(x)$ …” |
| The triangular kernel with bandwidth b centered at y equals (b - \|x - y\|)/b^2 for y - b <= x <= y + b and 0 otherwise. | formula | tagged | Kernel Density Estimation: “a tent of height $\frac{1}{b}$ over $[y - b,\ y + b]$, so $k_y(x) = \frac{b - \\|x - y\\|}{b^2}$.” |
| An observation contributes to a kernel estimate at x only if x lies within the bandwidth of that observation (\|x - y\| <= b); observations… | fact | tagged | Kernel Density Estimation: “so $\hat{f}(x)$ is the number of observations within $b$ of $x$, divided by $2bn$.” |

</details>

<details><summary><code>masi-2019s-q21</code> · answerable</summary>

Tagged pages: Type I Error, Hypothesis Testing, Binomial Distribution, Central Limit Theorem

| Item | Kind | Status | Where |
|---|---|---|---|
| A Type I error is rejecting the null hypothesis when it is true; its probability is the significance level, computed as the probability of … | definition | tagged | Type I Error: “A **Type I Error** occurs when a [[Hypothesis Testing\\|hypothesis test]] incorrectly **rejects a tr…” |
| The sum of n independent Bernoulli(q) random variables is binomial with parameters n and q, with mean nq and variance nq(1-q). | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| For large n, approximate a binomial probability with a normal distribution having the same mean and variance, standardizing to Z and using … | procedure | tagged | Central Limit Theorem: “For large $n$, $S_n$ is approximately $N(n\mu,\, n\sigma^2)$ regardless of the original distribution” |
| When approximating a discrete integer-valued distribution by a normal, apply a continuity correction: P(S ≥ k) is approximated using k − 0.… | procedure | syllabus | Normal Distribution: “When approximating a **discrete** variable (a [[Binomial Distribution\\|binomial]] or [[Poisson Dist…” |

</details>

<details><summary><code>masi-2019s-q22</code> · answerable</summary>

Tagged pages: Type I Error, Hypothesis Testing, Binomial Distribution, Critical Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The significance level of a hypothesis test is the probability of rejecting the null hypothesis when it is true (the Type I error probabili… | definition | tagged | Type I Error: “$$\alpha = P(\text{Reject } H_0 \mid H_0 \text{ is true})$$” |
| The sum of n independent Bernoulli(q) random variables follows a Binomial(n, q) distribution. | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| For S ~ Binomial(n, q), Pr(S = s) = C(n, s) q^s (1-q)^(n-s). | formula | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| Raising the critical value k shrinks the rejection region {S ≥ k} and so lowers the significance level, so the smallest valid k is found by… | fact | tagged | Critical Value: “$$P\left(T \ge c \mid H_0\right) = \alpha$$” |

</details>

<details><summary><code>masi-2019s-q23</code> · answerable</summary>

Tagged pages: Hypothesis Testing, p-Value, Sample Variance, Sampling Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For independent samples from normal distributions with sample sizes n1 and n2, the ratio (S1²/σ1²)/(S2²/σ2²) follows an F distribution with… | fact | tagged | Sampling Distribution: “\\| $F = \dfrac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2}$ \\| $F_{n_1-1,\,n_2-1}$ \\| Two-variance test \\|” |
| If X follows an F distribution with (a, b) degrees of freedom, then 1/X follows an F distribution with (b, a) degrees of freedom, so the ra… | fact | syllabus | F-Distribution: “**Reciprocal:** $1/F \sim F(m, n)$. A lower-tail critical value is therefore the reciprocal of an u…” |
| To test a hypothesis about the ratio of two normal variances, compute the F statistic under H0 (the hypothesized variance relation makes th… | procedure | syllabus | Critical Value: “For two variances, $F = S_1^2/S_2^2$ is compared with $F_{\alpha,\,n_1-1,\,n_2-1}$.” |
| The p-value is the probability, under H0, of a test statistic at least as extreme as the observed value in the direction of the alternative… | definition | tagged | Hypothesis Testing: “$$\text{p-value} = P(\text{test statistic as extreme or more extreme} \mid H_0 \text{ true})$$” |
| Obtain the observed test statistic from a given p-value by finding the corresponding percentile (e.g., the 99th percentile for an upper-tai… | procedure | syllabus | F-Distribution: “Find the denominator row, the upper-tail area, then the numerator column.” |

</details>

<details><summary><code>masi-2019s-q24</code> · answerable</summary>

Tagged pages: Exponential Distribution, Percentile, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| An exponential distribution with mean θ has variance θ², so the variance determines the mean (θ equals the square root of the variance). | fact | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| The exponential distribution with mean θ has CDF F(x) = 1 - e^{-x/θ} for x ≥ 0. | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| The median of a distribution is the value m satisfying F(m) = 0.5, i.e., the 50th percentile. | definition | linked | Median: “$$F(m) = 0.5$$” |

</details>

<details><summary><code>masi-2019s-q25</code> · gap</summary>

Tagged pages: Order Statistics, Exponential Distribution, Bias

| Item | Kind | Status | Where |
|---|---|---|---|
| The k-th order statistic of a sample is its k-th smallest value, and a trimmed mean averages the sample after discarding the lowest and hig… | definition | tagged | Order Statistics: “Given a sample $X_1, X_2, \ldots, X_n$, the $k$-th order statistic $X_{(k)}$ is the $k$-th smallest…” |
| The minimum of m independent exponential random variables with mean mu is exponential with mean mu/m (the rate is the sum of the rates). | fact | tagged | Order Statistics: “$P\bigl(X_{(1)} > x\bigr) = \bigl[1 - F_1(x)\bigr]\bigl[1 - F_2(x)\bigr]\cdots\bigl[1 - F_n(x)\bigr…” |
| By the memoryless property of the exponential distribution, after the smallest lifetime occurs the remaining lifetimes behave as fresh inde… | fact | tagged | Exponential Distribution: “A direct consequence: given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$.” |
| For n iid exponentials with mean mu, the expected k-th order statistic is the sum of the mean gaps mu/n + mu/(n-1) + ... + mu/(n-k+1), sinc… | procedure | missing |  |
| Expectation is linear, so the expected value of an average of random variables equals the average of their expected values, even when the v… | fact | linked | Unbiasedness (collapsed): “E\!\left[\frac{1}{n}\sum_{i=1}^n X_i\right] = \frac{1}{n}\sum_{i=1}^n E[X_i]” |

</details>

<details><summary><code>masi-2019s-q26</code> · answerable</summary>

Tagged pages: Order Statistics, Weibull Distribution, Percentile, Cumulative Distribution Function (CDF)

| Item | Kind | Status | Where |
|---|---|---|---|
| The maximum of n independent identically distributed random variables is at most y only if every one is at most y, so its CDF is the nth po… | fact | tagged | Order Statistics: “$P\bigl(X_{(n)} \le x\bigr) = F_1(x)\,F_2(x)\cdots F_n(x)$” |
| The Weibull distribution with scale θ and shape τ has CDF F(y) = 1 - exp(-(y/θ)^τ), with density f(y) = τ(y/θ)^τ e^{-(y/θ)^τ} / y. | formula | tagged | Weibull Distribution: “f(x) = \frac{\tau\,(x/\theta)^{\tau}\,e^{-(x/\theta)^{\tau}}}{x}, \quad x > 0 … F(x) = 1 - e^{-(x/\…” |
| The p-th percentile of a distribution is the value x at which the CDF equals p, so it is found by setting F(x) = p and solving for x. | definition | tagged | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |

</details>

<details><summary><code>masi-2019s-q27</code> · answerable</summary>

Tagged pages: Logistic Regression, Link Function, Generalized Linear Model

| Item | Kind | Status | Where |
|---|---|---|---|
| The odds of success are π/(1−π), and the log-odds (logit) is ln(π/(1−π)). | definition | tagged | Logistic Regression: “$\pi/(1-\pi)$ is the **odds**; the model is linear in the log-odds, so $e^{\beta_j}$ is the **odds …” |
| A logistic regression model with one predictor specifies ln(π/(1−π)) = b0 + b1·x, so the log-odds is linear in the predictor. | formula | tagged | Logistic Regression: “$$\ln\!\left(\frac{\pi}{1-\pi}\right) = \beta_0 + \beta_1 x_1 + \cdots + \beta_p x_p$$” |
| To recover the coefficients from two fitted probabilities, convert each to log-odds, take the slope as the change in log-odds divided by th… | procedure | tagged | Logistic Regression: “$$\ln\!\left(\frac{\pi}{1-\pi}\right) = \beta_0 + \beta_1 x_1 + \cdots + \beta_p x_p$$” |

</details>

<details><summary><code>masi-2019s-q28</code> · answerable</summary>

Tagged pages: Regularization, Bias-Variance Tradeoff, Statistical Learning

| Item | Kind | Status | Where |
|---|---|---|---|
| Ridge regression chooses the coefficients that minimize the residual sum of squares plus a penalty λ times the sum of squared slope coeffic… | formula | tagged | Regularization: “$$\text{Ridge:}\quad \min_{\beta}\ \mathrm{RSS} + \lambda\sum_{j=1}^{p}\beta_j^{2}$$” |
| As the tuning parameter λ increases, ridge coefficient estimates shrink toward zero, and they approach zero as λ → ∞; at λ = 0 they equal t… | fact | tagged | Regularization: “$\lambda = 0$ returns least squares; $\lambda \to \infty$ drives every coefficient to zero.” |
| The ridge shrinkage penalty is applied only to the slope coefficients β_1,...,β_p and not to the intercept β_0. | fact | tagged | Regularization: “The intercept is left unpenalized” |
| Least squares coefficient estimates are scale equivariant (multiplying a predictor by c scales its coefficient by 1/c), whereas ridge coeff… | fact | tagged | Regularization: “Predictors must be **standardized** first: the penalty is not scale-invariant, so a variable measur…” |
| Shrinking coefficients (increasing λ) in ridge regression reduces variance at the cost of increased bias, and test error improves when the … | fact | tagged | Regularization: “It trades a little bias for a large reduction in variance” |

</details>

<details><summary><code>masi-2019s-q29</code> · answerable</summary>

Tagged pages: Categorical Predictor, Linear Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| In a regression with a binary (0/1) dummy variable, the category coded 0 is the baseline, and the intercept equals the expected response fo… | fact | tagged | Categorical Predictor: “- A categorical predictor with $k$ levels is represented using $k-1$ **indicator (dummy) variables*…” |
| The coefficient on a dummy variable is the expected difference in response between that category and the baseline category, holding other p… | definition | tagged | Categorical Predictor: “Territory B's expected claim frequency is about **22% higher** than Territory A, and Territory C's …” |
| Recoding a binary dummy variable (swapping which category is 0 and 1) only changes the baseline; the model spans the same column space, so … | fact | linked | Regression Through the Origin: “The indicators add up to the constant column, so the fit is unchanged and each level gets its own i…” |
| To find the intercept after changing the baseline category, compute the original model's fitted value for the new baseline group with other… | procedure | tagged | Categorical Predictor: “the omitted level is the **reference level**, absorbed into the intercept” |

</details>

<details><summary><code>masi-2019s-q3</code> · answerable</summary>

Tagged pages: Compound Poisson Process, Deductible, Exponential Distribution, Aggregate Loss Model

| Item | Kind | Status | Where |
|---|---|---|---|
| For a compound Poisson process with rate λ, the variance of aggregate losses is Var(S) = λ·E[Y²], where Y is the individual payment amount … | formula | tagged | Compound Poisson Process: “\text{Var}(S(t)) = \lambda t\, E[X^2]” |
| With an ordinary deductible d, the payment per loss is Y = (X − d)+, which is zero when the loss X is at most d and X − d otherwise. | definition | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| The exponential distribution is memoryless: given X > d, the excess X − d is exponential with the same mean θ, and Pr(X > d) = e^(−d/θ). | fact | tagged | Exponential Distribution: “A direct consequence: given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$.” |
| The second moment of an exponential random variable with mean θ is 2θ². | fact | prerequisite | Moment: “[[Exponential Distribution\\|exponential]] $E[X^n] = n!\,\theta^n$” |
| Compute the second moment of a per-loss payment under a deductible by conditioning: E[Y²] = Pr(X > d)·E[(X−d)² \| X > d]. | procedure | tagged | Compound Poisson Process: “**Thinning** carries over: claims of a given type (e.g. those exceeding a [[Deductible]]) form thei…” |

</details>

<details><summary><code>masi-2019s-q30</code> · answerable</summary>

Tagged pages: R-Squared, Residual Sum of Squares, Linear Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| R-squared equals 1 minus RSS divided by TSS, i.e., the proportion of total variation in the response explained by the regression. | formula | tagged | R-Squared: “$$R^2 = 1 - \frac{\text{SS}_\text{Res}}{\text{SS}_\text{Tot}}$$” |
| The total sum of squares (TSS) is the sum of squared deviations of the observed responses from their sample mean, Σ(y_i − ȳ)². | definition | tagged | Residual Sum of Squares: “$$\text{RSS} = \sum_{i=1}^n (y_i - \hat{y}_i)^2$$” |
| The residual sum of squares (RSS) is the sum of squared differences between observed and fitted responses, Σ(y_i − ŷ_i)². | definition | tagged | Residual Sum of Squares: “The **Residual Sum of Squares (RSS)** (also called the **Sum of Squared Errors, SSE**) measures the…” |

</details>

<details><summary><code>masi-2019s-q31</code> · answerable</summary>

Tagged pages: Model Diagnostics, Hat Matrix, Outlier, Linear Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| Cook's distance for observation i in a linear regression is D_i = e_i^2/(p·σ^2) · h_ii/(1−h_ii)^2, where e_i is the residual, p the number … | formula | tagged | Model Diagnostics: “$$D_i = \frac{r_i^2}{p + 1} \cdot \frac{h_{ii}}{1 - h_{ii}}$$” |
| The leverage h_ii of observation i is the i-th diagonal element of the hat matrix H = X(XᵀX)⁻¹Xᵀ. | definition | tagged | Hat Matrix: “Its diagonal entries $h_{ii}$ are the **leverages**: how far each observation's predictor values si…” |
| The residual of observation i is e_i = y_i − ŷ_i, where the fitted values are ŷ = X(XᵀX)⁻¹Xᵀy = Hy. | definition | tagged | Hat Matrix: “$$\hat{\mathbf{y}} = \mathbf{H}\mathbf{y}$$” |
| The number of parameters p in Cook's distance equals the number of columns of the design matrix X, including the intercept column of 1s. | fact | tagged | Outlier: “$D_i = \dfrac{e_i^2}{p \cdot \text{MSE}} \cdot \dfrac{h_{ii}}{(1 - h_{ii})^2}$ with $p$ the number …” |
| An observation is classified as influential under Cook's distance when D_i exceeds the threshold (here 1); a high-leverage point with h_ii … | fact | tagged | Model Diagnostics: “A common flag is $D_i > 1$; some texts use $4/n$.” |

</details>

<details><summary><code>masi-2019s-q32</code> · answerable</summary>

Tagged pages: Linear Regression, Design Matrix, Ordinary Least Squares

| Item | Kind | Status | Where |
|---|---|---|---|
| In a linear regression model with an intercept, the intercept is the coefficient on the design-matrix column in which every entry equals 1;… | definition | tagged | Design Matrix: “The **design matrix** $\mathbf{X}$ is the $n \times (p+1)$ matrix that holds a regression's predict…” |
| The least-squares (OLS) estimator of the coefficient vector is beta-hat = (X^T X)^{-1} X^T y, with each entry estimating the coefficient on… | formula | tagged | Linear Regression: “$$\hat{\boldsymbol\beta} = (\mathbf{X}^{\top}\mathbf{X})^{-1}\mathbf{X}^{\top}\mathbf{y}$$” |
| The (j,j) diagonal entry of X^T X is the sum of squares of column j, so for the all-ones intercept column it equals the number of observati… | fact | linked | Linear Algebra (collapsed): “\hat{\beta} &= \frac{X^\top \mathbf{y}}{X^\top X} = \frac{(1)(2) + (2)(3)}{(1)^2 + (2)^2}” |

</details>

<details><summary><code>masi-2019s-q33</code> · answerable</summary>

Tagged pages: ANOVA, Interaction, Deviance, Generalized Linear Model

| Item | Kind | Status | Where |
|---|---|---|---|
| To test whether added terms (e.g., an interaction) are significant, use a nested-model F-test comparing the reduced model to the full model… | procedure | tagged | Deviance: “When $\phi$ is estimated, use $F = \dfrac{D_{\text{reduced}} - D_{\text{full}}}{\Delta p\,\hat\phi_…” |
| The F-statistic is F = [(D_reduced − D_full)/(df_reduced − df_full)] / [D_full/df_full residual], where the numerator degrees of freedom eq… | formula | tagged | Deviance: “When $\phi$ is estimated, use $F = \dfrac{D_{\text{reduced}} - D_{\text{full}}}{\Delta p\,\hat\phi_…” |
| For a Normal response with identity link, the deviance equals the residual sum of squares, and a common scale factor cancels in the F ratio. | fact | tagged | Deviance: “For a Normal linear model the unscaled deviance is the **residual sum of squares**, $D = \text{RSS}…” |
| The improvement in sum of squares (deviance) from adding terms equals the reduced model's deviance minus the full model's deviance, so the … | fact | tagged | Deviance: “**Analysis of Deviance**: for nested models, $\dfrac{D_{\text{reduced}} - D_{\text{full}}}{\phi} \a…” |
| The F-statistic is compared with an F distribution with numerator df equal to the number of added parameters and denominator df equal to th… | fact | tagged | Deviance: “When $\phi$ is estimated, use $F = \dfrac{D_{\text{reduced}} - D_{\text{full}}}{\Delta p\,\hat\phi_…” |

</details>

<details><summary><code>masi-2019s-q34</code> · answerable</summary>

Tagged pages: Cross-Validation

| Item | Kind | Status | Where |
|---|---|---|---|
| In k-fold cross-validation, the data are randomly split into k folds of roughly equal size, and the model is fit k times, each time holding… | definition | tagged | Cross-Validation: “**$k$-fold**: split the data into $k$ equal parts, fit on $k-1$ and score on the held-out fold, the…” |
| In k-fold cross-validation each observation belongs to exactly one fold, so it is in the validation set once and in the training set in the… | fact | tagged | Cross-Validation: “**$k$-fold**: split the data into $k$ equal parts, fit on $k-1$ and score on the held-out fold, the…” |

</details>

<details><summary><code>masi-2019s-q35</code> · answerable</summary>

Tagged pages: Bootstrap, Sample Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| The bootstrap standard error of an estimator is the standard deviation of the estimates computed from the B bootstrap samples, used to appr… | definition | tagged | Bootstrap: “The **bootstrap** estimates the sampling variability of a statistic by resampling the observed data…” |
| The bootstrap standard error is SE_B = sqrt( (1/(B-1)) * sum over r of (estimate_r - mean of estimates)^2 ), i.e. the sample standard devia… | formula | tagged | Bootstrap: “$$\mathrm{SE}_B(\hat{\alpha}) = \sqrt{\frac{1}{B-1}\sum_{r=1}^{B}\left(\hat{\alpha}^{*r} - \bar{\ha…” |

</details>

<details><summary><code>masi-2019s-q36</code> · gap</summary>

Tagged pages: Confidence Interval, Linear Regression, Prediction Interval

| Item | Kind | Status | Where |
|---|---|---|---|
| In simple linear regression, the 95% confidence interval for the mean response E(Y) at x0 is ŷ0 ± t(0.025, n-2)·s·sqrt(1/n + (x0 - x̄)²/Sxx… | formula | missing |  |
| In simple linear regression, the 95% prediction interval for a new observation Y at x0 is ŷ0 ± t(0.025, n-2)·s·sqrt(1 + 1/n + (x0 - x̄)²/Sx… | formula | tagged | Prediction Interval: “the interval is $\hat{y}_0 \pm t_{n-p-1}\,s\sqrt{1 + \mathbf{x}_0^{\top}(\mathbf{X}^{\top}\mathbf{X…” |
| Confidence and prediction intervals in simple linear regression are both centered on the fitted line and are narrowest at x0 = x̄, widening… | fact | missing |  |
| A prediction interval is always wider than the confidence interval for the mean response because of the extra variance of a new observation… | fact | tagged | Prediction Interval: “A prediction interval must also allow for the random shock the new observation will carry, so it is…” |

</details>

<details><summary><code>masi-2019s-q37</code> · answerable</summary>

Tagged pages: Regularization, Variable Selection, Partial Least Squares, Principal Components Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| Variable selection means the fitted model leaves some predictors out entirely, i.e. their coefficient estimates are exactly zero. | definition | tagged | Variable Selection: “**Variable Selection** is the process of choosing which predictors to include in a model's [[Model …” |
| Lasso regression uses an l1 penalty (lambda times the sum of absolute coefficients), which can set some coefficients exactly to zero when l… | fact | tagged | Regularization: “**Lasso** ($\ell_1$) sets some coefficients exactly to zero, so it performs [[Variable Selection]] …” |
| Ridge regression uses an l2 penalty (lambda times the sum of squared coefficients), which shrinks coefficients toward zero but never exactl… | fact | tagged | Regularization: “**Ridge** ($\ell_2$) shrinks all coefficients smoothly and keeps every predictor — good when many p…” |
| Principal components regression and partial least squares are dimension-reduction methods that regress on M new directions, each a linear c… | fact | tagged | Principal Components Regression: “Every $Z_m$ is a linear combination of all $p$ original predictors, so the fitted model still uses …” |

</details>

<details><summary><code>masi-2019s-q38</code> · answerable</summary>

Tagged pages: Generalized Additive Model, Interaction

| Item | Kind | Status | Where |
|---|---|---|---|
| A generalized additive model (GAM) replaces each linear term in a regression with a smooth non-linear function of that predictor and sums t… | definition | tagged | Generalized Additive Model: “A **Generalized Additive Model (GAM)** extends the multiple [[Linear Regression]] model by replacin…” |
| Each component function of a GAM can be fit using any single-predictor method, such as natural splines, regression splines, smoothing splin… | fact | tagged | Generalized Additive Model: “**Building blocks.** Each $f_j$ can be fit with any of the single-predictor methods: a [[Regression…” |
| A GAM misses interactions between predictors by default because of additivity, but interactions can be added manually as product terms or a… | fact | tagged | Generalized Additive Model: “**The main limitation** is additivity: with many variables, important interactions can be missed. Y…” |
| The smoothness of a fitted smooth function, such as a smoothing spline, is summarized by its (effective) degrees of freedom. | fact | tagged | Generalized Additive Model: “The smoothness of each $f_j$ can be summarized by its degrees of freedom.” |
| Because a GAM is additive, the effect of each predictor on the response can be examined separately while holding the other predictors fixed… | fact | tagged | Generalized Additive Model: “Because the model is additive, you can examine the effect of each $X_j$ on $Y$ while holding all th…” |

</details>

<details><summary><code>masi-2019s-q39</code> · answerable</summary>

Tagged pages: Variable Selection, AIC, R-Squared

| Item | Kind | Status | Where |
|---|---|---|---|
| Best subset selection fits every possible model of each size and picks the model with the highest R-squared among all models of that size, … | procedure | tagged | Variable Selection: “Fit every combination of the $p$ predictors; keep the best model of each size (lowest RSS, or lowes…” |
| Forward stepwise selection starts from the intercept-only model and at each step adds the single predictor that most improves fit (highest … | procedure | tagged | Variable Selection: “Start with no predictors; at each step add the one that most improves the fit; choose among the res…” |
| Backward stepwise selection starts from the full model and at each step removes the single predictor whose removal leaves the highest R-squ… | procedure | tagged | Variable Selection: “Start with all predictors (needs $n > p$); at each step remove the least useful one; choose among t…” |
| R-squared never decreases as predictors are added, so it can only compare models with the same number of parameters; models of different si… | fact | tagged | Variable Selection: “Compare models with different numbers of predictors via [[AIC]] (or $C_p$), [[BIC]], adjusted $R^2$…” |
| Best subset selection searches all models, so its chosen model has AIC no higher than the models chosen by forward or backward stepwise sel… | fact | tagged | Variable Selection: “Best subset selection fits all $2^p$ models … The price is that stepwise selection is not guarantee…” |

</details>

<details><summary><code>masi-2019s-q4</code> · answerable</summary>

Tagged pages: Exponential Distribution, Survival Model, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The exponential distribution is memoryless: given survival to time s, the remaining lifetime has the same exponential distribution as the o… | fact | tagged | Exponential Distribution: “Its defining property is **memorylessness**: $P(X > s + t \mid X > s) = P(X > t)$, making it the un…” |
| For an exponential distribution with mean θ, the survival function is S(x) = e^{-x/θ}. | formula | tagged | Exponential Distribution: “Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponentia…” |
| The conditional probability of surviving past a later time given survival to an earlier time is P(T > b \| T > a) = S(b)/S(a) for b > a. | formula | tagged | Survival Model: “- $_{t}p_x = \dfrac{S(x+t)}{S(x)}$ and $_{t}q_x = 1 - {_t}p_x$” |

</details>

<details><summary><code>masi-2019s-q40</code> · answerable</summary>

Tagged pages: Regression Spline, Smoothing Spline, Bias-Variance Tradeoff

| Item | Kind | Status | Where |
|---|---|---|---|
| A piecewise polynomial regression with knots divides the predictor range into regions and fits a separate polynomial in each region, with n… | definition | tagged | Regression Spline: “Placing $K$ knots in the range of $X$ means fitting $K + 1$ polynomials. With no constraints they n…” |
| An unconstrained piecewise polynomial fit can be discontinuous (jump) at the knots, whereas splines are constrained to join at the knots. | fact | tagged | Regression Spline: “Placing $K$ knots in the range of $X$ means fitting $K + 1$ polynomials. With no constraints they n…” |
| A cubic spline is a piecewise cubic polynomial constrained to be continuous with continuous first and second derivatives at each knot. | definition | tagged | Regression Spline: “A **cubic spline** is continuous, with continuous first and second derivatives, so it uses $K + 4$ …” |
| A natural cubic spline is a cubic spline constrained to be linear in the boundary regions beyond the outer knots; it remains continuous. | definition | tagged | Regression Spline: “A natural spline adds boundary constraints: the function must be linear below the smallest knot and…” |
| A smoothing spline is a natural cubic spline with a knot at every observed predictor value, with smoothness controlled by a penalty, so its… | fact | tagged | Smoothing Spline: “The minimizer is a natural cubic spline with a knot at every unique value of $x_1, \dots, x_n$.” |
| The number of parameters of a piecewise polynomial of degree d with K knots is (K+1)(d+1), because each of the K+1 regions has its own poly… | procedure | tagged | Regression Spline: “The degree-$d$ row applies the same count to any degree: $d + 1$ coefficients in each of the $K + 1…” |
| A model with more parameters (higher degrees of freedom) is more flexible and more likely to overfit the data. | fact | tagged | Bias-Variance Tradeoff: “Adding terms, interactions, or levels lowers bias and raises variance.” |

</details>

<details><summary><code>masi-2019s-q5</code> · gap</summary>

Tagged pages: Hazard Rate, Survival Model, Cumulative Distribution Function (CDF)

| Item | Kind | Status | Where |
|---|---|---|---|
| The survival function equals the exponential of minus the cumulative hazard: S(x) = exp(-H(x)), where H(x) is the integral of the hazard ra… | formula | tagged | Hazard Rate: “$$S(t) = \exp\!\left(-\int_0^t \mu(s)\,ds\right)$$” |
| The survival function is S(x) = 1 - F(x), the complement of the cumulative distribution function. | definition | tagged | Survival Model: “$$S(t) = P(T > t)$$ … $$= 1 - F(t)$$” |
| When the hazard rate is zero below a threshold, no probability mass lies there, so the cumulative hazard starts accumulating at the thresho… | fact | missing |  |

</details>

<details><summary><code>masi-2019s-q6</code> · answerable</summary>

Tagged pages: Deductible, Exponential Distribution, Payment Random Variable, Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| The amount an insurer pays per loss with an ordinary per-loss deductible d is the random variable Y = (X - d)+ = max(X - d, 0), which equal… | definition | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| The exponential distribution is memoryless: given X > d, the excess X - d is exponential with the same mean as X, so the per-payment amount… | fact | tagged | Exponential Distribution: “A direct consequence: given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$.” |
| For an exponential distribution with mean theta, the survival function is Pr(X > d) = exp(-d/theta), and the first and second moments are E… | formula | tagged | Exponential Distribution: “- $E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| Compute moments of a per-loss variable by conditioning on whether the loss exceeds the deductible: E[Y^k] = Pr(X > d) times the k-th moment… | procedure | tagged | Exponential Distribution: “The two differ by the factor $P(X > 300) = e^{-0.6} \approx 0.5488$, since $274.4 = 0.5488 \times 5…” |
| The variance of a random variable equals Var(Y) = E[Y^2] - (E[Y])^2, and the standard deviation is its square root. | formula | linked | Variance: “- Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |

</details>

<details><summary><code>masi-2019s-q7</code> · gap</summary>

Tagged pages: Stochastic Processes, Independent Events, System Reliability

| Item | Kind | Status | Where |
|---|---|---|---|
| A parallel system works if at least one component works, so it fails only when every component fails. | fact | tagged | System Reliability: “**Parallel** (works if any works): $\phi = 1 - \prod(1 - x_i)$ and $r = 1 - \prod(1 - p_i)$.” |
| For a parallel system of independent components with reliabilities r_i, system reliability is 1 minus the product of (1 - r_i). | formula | tagged | Independent Events: “$$P(A^c \cap B^c) = (1 - P(A))\,(1 - P(B))$$” |
| To reach a target parallel-system reliability with the fewest components, use the most reliable components first, since each added componen… | fact | missing |  |

</details>

<details><summary><code>masi-2019s-q8</code> · gap</summary>

Tagged pages: Markov Chain, Expected Value, Binomial Distribution, Transition Probability Matrix, Chapman-Kolmogorov Equations

| Item | Kind | Status | Where |
|---|---|---|---|
| A discrete-time Markov chain is a process whose next-state distribution depends only on the current state, described by a transition probab… | definition | tagged | Markov Chain: “A **Markov Chain** is a [[Stochastic Processes\\|stochastic process]] $\{X_n\}$ on a discrete state …” |
| The n-step transition probabilities are the entries of the n-th power of the one-step transition matrix (Chapman-Kolmogorov equations), so … | fact | tagged | Markov Chain: “- The $n$-step transition probabilities are the entries of the matrix power $P^n$:” |
| Build the transition matrix from conditional statements by taking the stated probability for the given transition and its complement for th… | procedure | tagged | Transition Probability Matrix: “$$\sum_{j} P_{ij} = 1 \quad \text{for every row } i$$” |
| The expected value of a discrete random variable is the sum of each value times its probability; here the expected number of games is compu… | formula | tagged | Expected Value: “$$E[X] = \begin{cases} \displaystyle\sum_{k} k\, f(k) & \text{(discrete)} \\[6pt] \displaystyle\int…” |
| When each of N games is won independently with probability p, the expected number of wins is p times the expected number of games (linearit… | fact | missing |  |

</details>

<details><summary><code>masi-2019s-q9</code> · answerable</summary>

Tagged pages: Markov Chain, Stationary Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The stationary (long-run) distribution of a Markov chain is a probability vector π satisfying π = πP, i.e., each state's probability equals… | definition | tagged | Markov Chain: “A **stationary distribution** $\boldsymbol{\pi}$ satisfies $\boldsymbol{\pi}P = \boldsymbol{\pi}$ w…” |
| A finite, irreducible Markov chain has a unique stationary distribution, and if it is also aperiodic, the long-run probabilities converge t… | fact | tagged | Stationary Distribution: “A finite irreducible chain always has a unique stationary distribution.” |
| A state with a positive self-transition probability (P_{i,i} > 0) has period 1, so an irreducible chain containing such a state is aperiodi… | fact | linked | Recurrent and Transient States: “A state with period 1 is **aperiodic**; any state with $P_{ii} > 0$ is aperiodic.” |
| When states of a chain are interchangeable by symmetry, one can assume they share a common long-run probability, reduce the balance equatio… | procedure | tagged | Stationary Distribution: “A doubly stochastic matrix has a uniform $\boldsymbol{\pi}$.” |

</details>

<details><summary><code>masi-an-001</code> · answerable</summary>

Tagged pages: Probability Distributions, Poisson Process, Poisson Distribution, Exponential Distribution, Gamma, Uniform Continuous Distribution, Negative Binomial Distribution, Poisson Thinning, Mixed Poisson Process

| Item | Kind | Status | Where |
|---|---|---|---|
| The waiting time until the n-th event of a Poisson process with rate λ is the sum of n independent exponential interarrival times and there… | fact | tagged | Poisson Process: “The waiting time $S_n = T_1 + \cdots + T_n$ to the $n$-th event follows a [[Gamma]] distribution wi…” |
| Interarrival times of a Poisson process with rate λ are independent exponential random variables with mean 1/λ. | fact | tagged | Poisson Process: “Interarrival times $T_1, T_2, \ldots$ are i.i.d. $\text{Exponential}(\lambda)$ with mean $1/\lambda$” |
| Thinning a Poisson process, where each event is independently kept with probability p, gives a Poisson process with rate pλ, so counts over… | fact | tagged | Poisson Process: “A Poisson process with rate $\lambda$ **thinned** by probability $p$ produces a Poisson process wit…” |
| A Poisson count whose mean is random with a gamma distribution has an unconditional negative binomial distribution (gamma-Poisson mixture),… | fact | tagged | Mixed Poisson Process: “With a [[Gamma]] mixing distribution the unconditional counts are exactly **[[Negative Binomial Dis…” |
| The exponential distribution is memoryless: the remaining waiting time given that time has already elapsed without an event has the same ex… | fact | tagged | Exponential Distribution: “Its defining property is **memorylessness**: $P(X > s + t \mid X > s) = P(X > t)$, making it the un…” |
| Given that exactly n events of a Poisson process occurred in an interval, the event times are distributed as order statistics of n independ… | fact | syllabus | Interarrival Time: “Given $N(t) = n$, the $n$ arrival times are distributed as the [[Order Statistics]] of $n$ independ…” |

</details>

<details><summary><code>masi-an-002</code> · answerable</summary>

Tagged pages: Frequency, Poisson Process, Poisson Distribution, Earned Exposure

| Item | Kind | Status | Where |
|---|---|---|---|
| For a Poisson process with a constant rate per unit of exposure, the claim count over E units of exposure is Poisson with mean equal to the… | fact | tagged | Poisson Process: “The number of events in any interval of length $t$ has distribution $\text{Poi}(\lambda t)$” |
| Claim frequency is the number of claims divided by the exposure (e.g., vehicle-years). | definition | tagged | Frequency: “**Frequency** is the number of claims per unit of exposure — how often losses happen, as distinct f…” |
| For a constant c, E[cX] = c·E[X] and Var(cX) = c²·Var(X), so dividing a random variable by E divides its variance by E². | fact | syllabus | Linear Combinations of Random Variables: “$$\text{Var}(L) = \sum_{i=1}^{n} c_i^2\,\text{Var}(X_i) + 2\sum_{i < j} c_i c_j\,\text{Cov}(X_i, X_…” |
| For Poisson claims, the mean of observed frequency equals the rate regardless of exposure, while its variance equals the rate divided by ex… | fact | tagged | Poisson Process: “$$E[N(t)] = \text{Var}(N(t)) = \lambda t$$” |

</details>

<details><summary><code>masi-an-003</code> · answerable</summary>

Tagged pages: Frequency, Poisson Process, Poisson Distribution, Earned Exposure, Poisson Superposition

| Item | Kind | Status | Where |
|---|---|---|---|
| Exposure is measured in vehicle-years (the number of vehicles times the fraction of the year each is in force), and a claim frequency is ex… | definition | tagged | Frequency: “**Frequency** is the number of claims per unit of exposure — how often losses happen, as distinct f…” |
| Expected claim count equals the claim frequency per exposure unit times the total exposure earned, with exposure summed across periods with… | procedure | tagged | Poisson Process: “The number of events in any interval of length $t$ has distribution $\text{Poi}(\lambda t)$” |
| The sum (superposition) of independent Poisson processes is a Poisson process whose rate is the sum of the individual rates, so the total c… | fact | tagged | Poisson Process: “**Superposition**: two independent Poisson processes with rates $\lambda_1$ and $\lambda_2$ combine…” |
| For N ~ Poisson(λ), P(N = k) = e^{-λ} λ^k / k!. | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |

</details>

<details><summary><code>masi-an-004</code> · gap</summary>

Tagged pages: Limited Expected Value, Policy Limit, Inflation

| Item | Kind | Status | Where |
|---|---|---|---|
| The limited expected value E[X ∧ u] is the expected value of the loss capped at the limit u, i.e. E[min(X, u)]. | definition | tagged | Limited Expected Value: “The **Limited Expected Value** (LEV) of a random variable $X$ at limit $u$ is the expected value of…” |
| For a non-negative loss X, E[X ∧ u] = ∫_0^u Pr(X > x) dx = ∫_0^u S(x) dx. | formula | tagged | Limited Expected Value: “$$E[X \wedge u] = \int_0^u [1 - F(x)]\,dx \quad \text{(for non-negative } X\text{)}$$” |
| Expectation preserves inequalities: if one random variable is no greater than another for every outcome, its expected value is no greater e… | fact | missing |  |
| A survival function is non-increasing, so S(x) ≤ S(u) for x ≥ u, which bounds the extra expected loss from raising a limit from u to u+h by… | fact | linked | Increased Limits: “each additional dollar of limit at $x$ adds $S(x)$ — the probability a loss exceeds $x$ — which can…” |
| Under uniform inflation by factor (1+r), a limited expected value with a fixed limit satisfies E[(kX) ∧ u] = k·E[X ∧ u/k], so it grows by l… | fact | tagged | Policy Limit: “$$E\big[(1+r)X \wedge u\big] = (1+r)\,E\!\left[X \wedge \tfrac{u}{1+r}\right]$$” |

</details>

<details><summary><code>masi-an-005</code> · untagged</summary>

Tagged pages: Limited Expected Value, Pareto Distribution, Deductible, Policy Limit, Inflation

| Item | Kind | Status | Where |
|---|---|---|---|
| The Pareto limited expected value is E[X ∧ u] = θ/(α−1)·[1 − (θ/(θ+u))^(α−1)] for α ≠ 1, and it gives the expected loss capped at u. | formula | tagged | Limited Expected Value: “\\| Pareto$(\alpha, \theta)$, $\alpha \neq 1$ \\| $\dfrac{\theta}{\alpha-1}\!\left[1 - \left(\dfrac{\…” |
| With an ordinary deductible d and maximum covered loss u, the expected payment per loss is E[X ∧ u] − E[X ∧ d]. | formula | tagged | Policy Limit: “$$Y^L = (X \wedge u) - (X \wedge d)$$” |
| Multiplying a Pareto random variable by a constant (e.g. inflation factor 1+r) multiplies θ by that constant and leaves α unchanged, since … | fact | elsewhere | Scale and Shape Parameters: “A **scale parameter** $\theta$ sets the units: multiplying the loss by a positive constant $c$ mult…” |
| To find the effect of inflation on a policy with a fixed deductible and fixed maximum covered loss, inflate the loss distribution, then rec… | procedure | tagged | Policy Limit: “If losses grow to $(1+r)X$ and the limit stays fixed, the expected payment is $(1+r)$ times the lim…” |

</details>

<details><summary><code>masi-an-006</code> · answerable</summary>

Tagged pages: Claim, Compound Poisson Process, Poisson Thinning, Exponential Distribution, Aggregate Loss Model

| Item | Kind | Status | Where |
|---|---|---|---|
| For a compound Poisson aggregate S with Poisson rate λ and individual payment X, Var(S) = λ·E[X²], the second moment of the payment, not λ·… | formula | tagged | Claim: “With $N \sim \text{Poisson}(\lambda)$, $E[N] = \text{Var}(N) = \lambda$, so the two terms combine i…” |
| Thinning a Poisson process, where each event is independently kept with probability p, gives a Poisson process with rate λp that is indepen… | fact | tagged | Poisson Thinning: “**Poisson Thinning** (splitting) is the result that if each event of a [[Poisson Process]] with rat…” |
| For an exponential random variable with mean θ, the second moment is E[X²] = 2θ² (variance θ²). | formula | tagged | Compound Poisson Process (collapsed): “For an exponential with mean $\theta = 2{,}000$: $E[X] = 2{,}000$ and $E[X^2] = 2\theta^2 = 8 \time…” |
| A claim closed without payment with probability q can be modeled as a payment that is 0 with probability q and otherwise follows the paymen… | procedure | tagged | Claim: “The payment per loss $Y^L$ includes zeros. The payment per payment $Y^P$ is conditional on $X > d$,…” |

</details>

<details><summary><code>masi-an-007</code> · answerable</summary>

Tagged pages: Severity, Inflation, Deductible, Policy Limit, Limited Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected payment per loss under an ordinary deductible d is E[(X − d)+] = E[X] − E[X ∧ d], the expected excess of the loss over d. | formula | tagged | Deductible: “$$E[(X - d)_+] = E[X] - E[X \wedge d]$$” |
| The expected payment per loss under a policy limit u (no deductible) is the limited expected value E[X ∧ u] = E[min(X, u)]. | formula | tagged | Policy Limit: “$$E[X \wedge u] = \int_0^u S(x)\,dx$$” |
| Under uniform inflation by factor (1+r) on losses with fixed dollar terms, rewrite the inflated payment by factoring out (1+r) and dividing… | procedure | tagged | Inflation: “$$E[(X' - d)_+] = (1+r)\,E\!\left[\left(X - \tfrac{d}{1+r}\right)_+\right]$$” |
| With a fixed-dollar ordinary deductible, inflation lowers the effective deductible, so the expected payment per loss rises by more than the… | fact | tagged | Inflation: “A fixed deductible **leverages** it, raising the insurer's expected payment by more than $r$; a fix…” |
| With a fixed-dollar policy limit, inflation raises the expected payment per loss by less than the inflation rate, because the limit caps gr… | fact | tagged | Inflation: “A fixed deductible **leverages** it, raising the insurer's expected payment by more than $r$; a fix…” |
| Under coinsurance, the insurer pays a fixed proportion of the loss, so its expected payment inflates at exactly the same rate as the loss. | fact | linked | Coinsurance: “**Coinsurance** is a policy provision under which the insurer pays a fixed percentage $c$ ($0 < c \…” |

</details>

<details><summary><code>masi-an-008</code> · untagged</summary>

Tagged pages: Severity, Exponential Distribution, Deductible, Inflation

| Item | Kind | Status | Where |
|---|---|---|---|
| Expected payment per loss, E[(X - d)+], averages the payment over all losses (zero when the loss is below the deductible); expected payment… | definition | tagged | Deductible: “so the insurer's expected payment per loss is the expected loss less the limited expected value.” |
| Expected payment per loss equals expected payment per payment times the probability that a loss exceeds the deductible, E[(X-d)+] = E[X-d \… | fact | elsewhere | Mean Excess Loss: “The cost per loss is $E[(X - d)_+] = e_X(d)\,S_X(d)$, which is the [[Payment Random Variable\\|per-l…” |
| Under uniform (multiplicative) inflation of a scale-family loss such as the exponential, the inflated loss has its scale parameter multipli… | fact | tagged | Exponential Distribution: “$\theta$ is a [[Scale and Shape Parameters\\|scale parameter]]: for $c > 0$, $cX$ is exponential wit…” |
| The exponential distribution is memoryless: given X > d, the excess X - d is exponential with the same mean, so the expected payment per pa… | fact | tagged | Exponential Distribution: “A direct consequence: given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$.” |
| For an exponential distribution with mean θ, the survival function is S(x) = e^{-x/θ} and the expected payment per loss with ordinary deduc… | formula | tagged | Exponential Distribution: “Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponentia…” |
| With a fixed deductible, inflation raises the expected payment per loss by more than the inflation rate because more losses exceed the dedu… | fact | tagged | Inflation: “A fixed deductible **leverages** it, raising the insurer's expected payment by more than $r$; a fix…” |

</details>

<details><summary><code>masi-an-009</code> · answerable</summary>

Tagged pages: Mixed Poisson Process, Mixing Distribution, Gamma, Experience Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| A mixed Poisson process has a Poisson claim process whose rate is itself a random variable drawn from a mixing distribution (e.g. gamma), f… | definition | tagged | Mixed Poisson Process: “A **Mixed Poisson Process** treats the arrival rate itself as random: each risk has its own rate $\…” |
| Conditional on the rate, a Poisson process's expected count over a future period equals the rate times the period length, so the expected f… | fact | tagged | Mixed Poisson Process: “Increments are **not independent**: observing many claims early raises the posterior for $\Lambda$ …” |
| In a mixed Poisson process, a higher observed claim count makes higher rates more likely, so the posterior distribution of the rate shifts … | fact | tagged | Mixed Poisson Process: “Increments are **not independent**: observing many claims early raises the posterior for $\Lambda$ …” |
| A mixed Poisson process does not have independent increments unconditionally, because the increments in different periods share the same un… | fact | tagged | Mixed Poisson Process: “Increments are **not independent**: observing many claims early raises the posterior for $\Lambda$ …” |
| Stationary increments mean the distribution of the count over a period depends only on the period length; this concerns the unconditional d… | fact | tagged | Mixing Distribution: “It also costs the process its independent increments (it keeps stationary ones).” |
| The posterior (Bayesian/credibility) estimate of the rate is a weighted blend of the insured's own observed experience and the prior (portf… | fact | tagged | Mixing Distribution: “After $n$ claims in $t$ years, the gamma rate's [[Posterior Distribution\\|posterior]] is Gamma with…” |

</details>

<details><summary><code>masi-an-010</code> · answerable</summary>

Tagged pages: Mixed Poisson Process, Mixing Distribution, Poisson Process, Variance for Conditional and Marginal Distributions, Covariance

| Item | Kind | Status | Where |
|---|---|---|---|
| The law of total variance: Var(X) = E[Var(X \| Λ)] + Var(E[X \| Λ]). | formula | tagged | Mixed Poisson Process: “\text{Var}(N) = E[\text{Var}(N\mid\Lambda)] + \text{Var}(E[N\mid\Lambda])” |
| In a mixed Poisson process, given the rate Λ the count over time t is Poisson with mean and variance tΛ, so the unconditional variance of N… | fact | tagged | Mixed Poisson Process: “E[N(t)] = t\,E[\Lambda], \qquad \text{Var}(N(t)) = t\,E[\Lambda] + t^2\,\text{Var}(\Lambda)” |
| For a homogeneous Poisson process, the variance of the count equals its mean, for any time length. | fact | tagged | Poisson Process: “E[N(t)] = \text{Var}(N(t)) = \lambda t” |
| If a Poisson rate is drawn independently each period, the period counts are independent, so the variance of the total count is the sum of t… | fact | tagged | Mixed Poisson Process: “$$\text{Var}(N(1)) = E[\Lambda] + \text{Var}(\Lambda) = 0.20 + 0.04 = 0.24$$” |
| If one rate is drawn once and kept across periods, the period counts are positively correlated with covariance Var(Λ), so the total varianc… | fact | tagged | Mixed Poisson Process: “Increments are **not independent**: observing many claims early raises the posterior for $\Lambda$ …” |

</details>

<details><summary><code>masi-an-011</code> · answerable</summary>

Tagged pages: Mixing Distribution, Mixed Poisson Process, Poisson Distribution, Bayes Theorem, Posterior Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| Bayesian updating with a discrete prior: the posterior probability of each risk class is proportional to prior probability times the likeli… | procedure | tagged | Bayes Theorem: “$$= \frac{P(E \mid H)\,P(H)}{\displaystyle\sum_{i} P(E \mid H_i)\,P(H_i)}$$” |
| For a Poisson claim count with rate λ per year, the probability of no claims over n years is e^{-nλ}, since the count over n years is Poiss… | formula | tagged | Mixed Poisson Process: “$$N(t) \mid \Lambda = \lambda \ \sim\ \text{Poi}(\lambda t)$$” |
| When each risk's rate is fixed over time, claim counts in different years are independent given the rate, so the likelihood of several year… | fact | tagged | Bayes Theorem: “Repeated tosses of a coin chosen at random are independent only given which coin was chosen; uncond…” |
| The expected future claim count given past data is the posterior-weighted average of the class claim rates: E[Λ \| data] = Σ P(class \| dat… | formula | tagged | Posterior Distribution: “E[N_2 \mid N_1 = 1] &= 0.5987(0.2) + 0.4013(0.6)” |

</details>

<details><summary><code>masi-an-012</code> · answerable</summary>

Tagged pages: Mixing Distribution, Mixed Poisson Process, Gamma, Posterior Distribution, Bayesian Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| When claim rates have a gamma prior and claim counts given the rate are Poisson, the posterior distribution of the rate is gamma (gamma is … | fact | tagged | Bayesian Credibility: “\\| Poisson$(\theta)$ \\| Gamma$(\alpha, \beta)$, rate $\beta$ \\| Gamma$(\alpha + \sum x_i,\, \beta +…” |
| For a gamma prior with shape alpha and scale theta and n Poisson claims observed over t exposure periods, the posterior is gamma with shape… | formula | tagged | Mixing Distribution: “After $n$ claims in $t$ years, the gamma rate's [[Posterior Distribution\\|posterior]] is Gamma with…” |
| The mean of a gamma distribution with shape alpha and scale theta is alpha times theta. | definition | tagged | Gamma: “- $E[X] = \alpha\theta$, $\text{Var}(X) = \alpha\theta^2$, and coefficient of variation $CV = 1/\sq…” |
| In the gamma-Poisson model the posterior mean equals a credibility-weighted average of the observed claim rate and the prior mean, with Z =… | fact | tagged | Mixing Distribution: “its mean equals $Z(n/t) + (1-Z)\alpha\theta$ with $Z = t/(t + 1/\theta)$.” |

</details>

<details><summary><code>masi-an-013</code> · answerable</summary>

Tagged pages: Insurance Portfolio, Coefficient of Variation, Covariance, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| The coefficient of variation of a random variable is its standard deviation divided by its mean. | definition | tagged | Coefficient of Variation: “The **Coefficient of Variation** $CV$ is the ratio of the standard deviation to the mean, measuring…” |
| The variance of a sum of random variables equals the sum of the variances plus twice the sum of the pairwise covariances, so for n identica… | formula | tagged | Insurance Portfolio: “\text{Var}(S) &= n\sigma^2 + n(n-1)\rho\,\sigma^2” |
| Covariance equals correlation times the product of the standard deviations, Cov(X,Y) = ρ σ_X σ_Y. | formula | linked | Covariance and Correlation Coefficient: “\rho_{X,Y} = \frac{\text{Cov}(X, Y)}{\sigma_X \, \sigma_Y}” |
| Independent random variables have zero covariance, so adding an independent risk to a sum adds only its own variance and mean to the total. | fact | tagged | Insurance Portfolio: “When policies are independent, the covariance terms vanish and the [[Coefficient of Variation\\|coef…” |
| The mean of a sum of random variables is the sum of the means, regardless of dependence, so the total mean scales with the number of identi… | fact | syllabus | Linear Combinations of Random Variables: “**Expectation is always linear** — $E[L]$ needs no independence assumption at all.” |
| With positive common correlation ρ, the CV of the total of n identical risks does not go to zero as n grows but approaches a floor of (σ/μ)… | fact | tagged | Insurance Portfolio (collapsed): “A correlation of just $0.01$ sets a floor of $\frac{\sigma}{\mu}\sqrt{\rho} = 1.0$ that growth can'…” |

</details>

<details><summary><code>masi-an-014</code> · answerable</summary>

Tagged pages: Negative Binomial Distribution, Mixed Poisson Process

| Item | Kind | Status | Where |
|---|---|---|---|
| For a negative binomial distribution with parameters r and β (counting from 0), the variance is rβ(1+β), while the mean is rβ. | formula | tagged | Negative Binomial Distribution: “$E[Y] = r\beta$ and $\text{Var}(Y) = r\beta(1+\beta)$” |
| The negative binomial has variance greater than its mean (variance-to-mean ratio 1+β > 1), making it overdispersed relative to the Poisson,… | fact | tagged | Negative Binomial Distribution: “$\text{Var}(Y)/E[Y] = 1/p = 1+\beta > 1$ always, where the binomial's ratio is below 1 and the Pois…” |
| A Poisson whose mean has a gamma distribution (shape r, scale β) yields a negative binomial marginal with parameters r and β. | fact | tagged | Mixed Poisson Process: “With a [[Gamma]] mixing distribution the unconditional counts are exactly **[[Negative Binomial Dis…” |
| The unconditional variance of a mixture is Var(N) = E[Var(N\|Λ)] + Var(E[N\|Λ]), which for a Poisson with random mean Λ equals E[Λ] + Var(Λ… | formula | tagged | Mixed Poisson Process: “The moments follow from conditioning: $E[N] = E[E[N \mid \Lambda]]$ and $\text{Var}(N) = E[\text{Va…” |

</details>

<details><summary><code>masi-an-015</code> · untagged</summary>

Tagged pages: Negative Binomial Distribution, Mixed Poisson Process, Mixing Distribution, Gamma

| Item | Kind | Status | Where |
|---|---|---|---|
| If claims follow a Poisson process with rate Λ, the number of claims over a period of length t is Poisson with mean tΛ. | fact | tagged | Mixed Poisson Process: “$$N(t) \mid \Lambda = \lambda \ \sim\ \text{Poi}(\lambda t)$$” |
| Multiplying a gamma random variable by a constant t gives a gamma with the same shape α and scale multiplied by t (θ becomes tθ). | fact | elsewhere | Scale and Shape Parameters: “A **scale parameter** $\theta$ sets the units: multiplying the loss by a positive constant $c$ mult…” |
| A Poisson whose mean has a gamma(α, θ) distribution has an unconditional negative binomial distribution with r = α and β = θ. | fact | tagged | Mixing Distribution: “then $N(t)$ is [[Negative Binomial Distribution\\|negative binomial]] in its failures-count form wit…” |
| For a negative binomial with parameters r and β, P(N = k) = C(r+k-1, k) β^k / (1+β)^(r+k), so P(N = 1) = rβ/(1+β)^(r+1). | formula | tagged | Negative Binomial Distribution: “$P(Y=k) = \dfrac{r(r+1)\cdots(r+k-1)\,\beta^k}{k!\,(1+\beta)^{r+k}}$” |

</details>

<details><summary><code>masi-an-016</code> · answerable</summary>

Tagged pages: Mean Time Spent in Transient States, Markov Chain, Transition Probability Matrix, Recurrent and Transient States

| Item | Kind | Status | Where |
|---|---|---|---|
| In an absorbing Markov chain, a transient state is one from which the chain may leave and never return, and an absorbing state is one that,… | definition | tagged | Recurrent and Transient States: “Let $f_i$ be the probability that a chain started in state $i$ ever re-enters $i$: the state is **r…” |
| The fundamental matrix S = (I - P_T)^{-1}, where P_T is the transient-state submatrix, has entry s_ij equal to the expected number of time … | formula | tagged | Mean Time Spent in Transient States: “$s_{ij}$ is the expected number of periods the chain spends in state $j$ given that it starts in st…” |
| To find the expected total time spent in all transient states before absorption starting from state i, sum the entries of row i of the fund… | procedure | tagged | Mean Time Spent in Transient States: “The row sum $\sum_j s_{ij}$ is the expected number of periods before the chain leaves the transient…” |
| The inverse of a 2x2 matrix [[a, b],[c, d]] is 1/(ad - bc) times [[d, -b],[-c, a]]. | formula | tagged | Mean Time Spent in Transient States (collapsed): “S &= \frac{1}{0.10}\begin{bmatrix} 0.3 & 0.1 \\ 0.2 & 0.4 \end{bmatrix} \\” |

</details>

<details><summary><code>masi-an-017</code> · answerable</summary>

Tagged pages: Mean Time Spent in Transient States, Markov Chain, Transition Probability Matrix, Stationary Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| To find the expected time until a Markov chain first enters a target state, make the target state absorbing so the remaining states are tra… | procedure | tagged | Mean Time Spent in Transient States: “For the expected time until the chain first enters some set of states $A$, make every state of $A$ …” |
| The fundamental matrix of an absorbing Markov chain is S = (I - P_T)^{-1}, where P_T is the transition sub-matrix among transient states; e… | formula | tagged | Mean Time Spent in Transient States: “$S$ comes from inverting $I - P_T$, where $P_T$ holds the transition probabilities among the transi…” |
| The expected time until absorption starting from transient state i is the sum of row i of the fundamental matrix S, because it totals the e… | fact | tagged | Mean Time Spent in Transient States: “The row sum $\sum_j s_{ij}$ is the expected number of periods before the chain leaves the transient…” |
| The inverse of a 2x2 matrix [[a,b],[c,d]] is 1/(ad-bc) times [[d,-b],[-c,a]]. | formula | tagged | Mean Time Spent in Transient States (collapsed): “I - P_T = \begin{bmatrix} 0.4 & -0.1 \\ -0.2 & 0.3 \end{bmatrix} … S &= \frac{1}{0.10}\begin{bmatri…” |

</details>

<details><summary><code>masi-an-018</code> · answerable</summary>

Tagged pages: Time-Reversible Markov Chain, Stationary Distribution, Bonus-Malus System, Markov Chain

| Item | Kind | Status | Where |
|---|---|---|---|
| The stationary distribution π of a Markov chain is a probability vector satisfying πP = π, giving the long-run proportion of time spent in … | definition | tagged | Stationary Distribution: “For an irreducible chain, $\pi_j$ is the long-run proportion of periods spent in state $j$; if the …” |
| For a chain that moves at most one level per step, the long-run numbers of up-crossings and down-crossings of any boundary between adjacent… | fact | tagged | Time-Reversible Markov Chain: “If a chain can only move to a neighbouring state ($i \to i \pm 1$, or stay), every move from $i$ to…” |
| The long-run rate of transitions from state i to state j equals π_i P_{ij}, and the detailed-balance (time-reversibility) equations are π_i… | formula | tagged | Time-Reversible Markov Chain: “$$\pi_i P_{ij} = \pi_j P_{ji} \quad \text{for all } i, j$$” |
| Reversibility requires balance of probability flows (π_i P_ij = π_j P_ji), not symmetry of the transition matrix, and π is uniform only for… | fact | tagged | Time-Reversible Markov Chain: “If nonnegative numbers $x_i$ summing to 1 satisfy $x_i P_{ij} = x_j P_{ji}$ for every pair, then su…” |
| For a reversible chain, solve the detailed-balance equations for adjacent states one pair at a time, then normalize so the probabilities su… | procedure | tagged | Time-Reversible Markov Chain: “When a chain is suspected to be reversible, solving these pairwise equations is usually much easier…” |

</details>

<details><summary><code>masi-an-019</code> · answerable</summary>

Tagged pages: Time-Reversible Markov Chain, Stationary Distribution, Transition Probability Matrix, Markov Chain

| Item | Kind | Status | Where |
|---|---|---|---|
| A Markov chain is time reversible if its stationary distribution satisfies the detailed balance equations π_i P_ij = π_j P_ji for every pai… | definition | tagged | Time-Reversible Markov Chain: “$$\pi_i P_{ij} = \pi_j P_{ji} \quad \text{for all } i, j$$” |
| Kolmogorov's criterion: an ergodic Markov chain is time reversible if and only if the product of transition probabilities around every cycl… | fact | tagged | Time-Reversible Markov Chain: “in general an ergodic chain is reversible exactly when every cycle of states has the same probabili…” |
| If a transition matrix is doubly stochastic (columns also sum to 1), the uniform distribution is stationary. | fact | tagged | Stationary Distribution: “A doubly stochastic matrix has a uniform $\boldsymbol{\pi}$.” |
| If P_ij > 0 but P_ji = 0 for some pair of states with positive stationary probabilities, detailed balance fails and the chain is not time r… | fact | tagged | Time-Reversible Markov Chain: “A pair with $P_{ij} > 0$ but $P_{ji} = 0$ rules reversibility out.” |
| A symmetric transition matrix implies reversibility (uniform stationary distribution), but a reversible chain need not have a symmetric tra… | fact | tagged | Transition Probability Matrix: “A matrix whose columns also sum to one is *doubly stochastic*. For a chain with finitely many state…” |

</details>

<details><summary><code>masi-an-020</code> · answerable</summary>

Tagged pages: Bonus-Malus System, Markov Chain, Stationary Distribution, Transition Probability Matrix, Poisson Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A bonus-malus system assigns policyholders to levels with different premiums, and moves them between levels according to their claim counts… | definition | tagged | Bonus-Malus System: “When a policyholder's annual claim counts are independent with a fixed distribution, the level is a…” |
| For a Poisson random variable with mean λ, P(N=k) = e^{-λ} λ^k / k!, so P(N=0)=e^{-λ} and P(N=1)=λe^{-λ}. | formula | tagged | Bonus-Malus System: “for a Poisson rate $\lambda$, $a_k = e^{-\lambda}\lambda^k/k!$” |
| Build the transition probability matrix by assigning each level's row the probabilities of 0 claims, 1 claim, and 2 or more claims (complem… | procedure | tagged | Bonus-Malus System: “$$P_{ij} = \sum_{k \,:\, s_i(k) = j} a_k$$” |
| The long-run (stationary) distribution π of an irreducible Markov chain satisfies π = πP with the components summing to 1, and gives the lo… | fact | tagged | Markov Chain: “A **stationary distribution** $\boldsymbol{\pi}$ satisfies $\boldsymbol{\pi}P = \boldsymbol{\pi}$ w…” |
| The long-run average premium equals the sum over levels of the stationary probability of each level times that level's premium. | procedure | tagged | Bonus-Malus System: “$$\text{Long-run average premium} = \sum_j \pi_j\, b_j$$” |

</details>

<details><summary><code>masi-an-021</code> · answerable</summary>

Tagged pages: Bonus-Malus System, Markov Chain, Poisson Distribution, Experience Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| A bonus-malus system assigns drivers to premium levels, moving them down a level after a claim-free year and up (or to a specified level) a… | definition | tagged | Bonus-Malus System: “in which each [[Policyholder\\|policyholder]] occupies one of a finite set of premium levels and mov…” |
| If annual claim counts are Poisson with mean λ, the probability of a claim-free year is e^{-λ}. | formula | tagged | Poisson Distribution: “Because $P(X = 0) = e^{-\lambda}$, a given probability of no events (or of at least one event, $1 -…” |
| To find the expected cost of reporting a loss in a bonus-malus system, compare the premium paths of the report and no-report scenarios year… | procedure | tagged | Bonus-Malus System (collapsed): “Year 2: if year 1 is claim-free (probability $p$), the reporting path is at level 1 ($\$400$) and t…” |
| Once two premium paths in a bonus-malus system reach the same level, they stay identical thereafter because the transition rules depend onl… | fact | tagged | Markov Chain: “that has the **Markov property**: the next state depends on the past only through the current state.” |
| A driver should report a loss only if it exceeds the expected extra future premium from reporting; smaller losses are better paid out of po… | fact | tagged | Bonus-Malus System: “**Hunger for bonus:** a reported claim costs future discounts, so policyholders rationally pay smal…” |
| A higher claim rate lowers the expected extra premium from reporting a loss, since a future claim is more likely to put both paths at the s… | fact | tagged | Bonus-Malus System (collapsed): “Year 2: if year 1 is claim-free (probability $p$), the reporting path is at level 1 ($\$400$) and t…” |

</details>

<details><summary><code>masi-an-031</code> · gap</summary>

Tagged pages: Random Sample, Sample Mean, Sample Variance, Unbiasedness, Order Statistics

| Item | Kind | Status | Where |
|---|---|---|---|
| An estimator that is unbiased for a parameter does not stay unbiased under a nonlinear transformation; for example, S^2 is unbiased for the… | fact | syllabus | Bias: “Bias does **not** invert through nonlinear functions: if $\hat\theta$ is unbiased for $\theta$, $g(…” |
| Jensen's inequality: for a concave function g and a non-degenerate random variable Y, E[g(Y)] < g(E[Y)]; hence E[S] < sqrt(E[S^2]) = sigma,… | fact | missing |  |
| For independent random variables the variance of a sum is the sum of the variances (covariances vanish), and Var(cX) = c^2 Var(X). | fact | linked | Independent and Identically Distributed: “$X_1 + X_2$ has variance $2\sigma^2$, but $2X_1$ has variance $4\sigma^2$” |
| For an i.i.d. random sample with variance sigma^2, the sample mean has variance sigma^2/n regardless of the shape of the underlying distrib… | fact | tagged | Sample Mean: “$$E[\bar{X}] = \mu, \qquad \text{Var}(\bar{X}) = \frac{\sigma^2}{n}$$” |
| The maximum of a sample is at most x exactly when every observation is at most x, so for an i.i.d. sample with CDF F, P(X_(n) <= x) = F(x)^… | fact | tagged | Random Sample: “Their distributions come from counting how many observations fall below $x$ — a binomial$(n, F(x))$…” |

</details>

<details><summary><code>masi-an-032</code> · answerable</summary>

Tagged pages: Random Sample, Sample Mean, Sample Variance, Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| The standard error of an estimator is the standard deviation of its sampling distribution; for the sample mean of n iid observations it equ… | definition | tagged | Sample Mean: “The **standard error** is $\text{SD}(\bar{X}) = \sigma/\sqrt{n}$; estimated from data it is $S/\sqr…” |
| When sigma is unknown, the standard error of the sample mean is estimated by S divided by the square root of n, where S is the sample stand… | formula | tagged | Random Sample: “The estimated standard error of $\bar{X}$ is $S/\sqrt{n}$.” |
| The unbiased sample variance is S^2 = sum of (x_i - xbar)^2 divided by (n - 1), where xbar is the sample mean. | formula | tagged | Sample Variance: “$$S^2 = \frac{1}{n-1}\sum_{i=1}^{n}(X_i - \bar{X})^2$$” |
| Dividing the sum of squared deviations by n instead of n - 1 gives the biased variance estimator, which underestimates the population varia… | fact | tagged | Sample Variance: “Dividing by $n$ instead gives $\hat\sigma^2 = \frac{n-1}{n}S^2$, which is biased low by $\sigma^2/n…” |

</details>

<details><summary><code>masi-an-033</code> · answerable</summary>

Tagged pages: Type II Error, Type I Error, Power of a Test, Hypothesis Testing

| Item | Kind | Status | Where |
|---|---|---|---|
| A Type II error is failing to reject the null hypothesis when it is false, and its probability is beta. | definition | tagged | Type II Error: “A **Type II Error** occurs when a [[Hypothesis Testing\\|hypothesis test]] **fails to reject a false…” |
| The significance level alpha is the probability of a Type I error, i.e. of rejecting the null hypothesis when it is true. | definition | tagged | Type I Error: “A **Type I Error** occurs when a [[Hypothesis Testing\\|hypothesis test]] incorrectly **rejects a tr…” |
| For a one-sided upper-tail z-test on a mean with known standard deviation, reject H0 when the sample mean exceeds the critical value mu0 + … | procedure | tagged | Type II Error: “The critical value is $c = 100 + 1.645 \cdot (20/\sqrt{25}) = 100 + 6.58 = 106.58$.” |
| Compute beta as the probability, under the true mean, that the sample mean falls in the acceptance region, i.e. Phi(z_alpha - (mu_true - mu… | procedure | tagged | Type II Error (collapsed): “Power $= P(\bar{X} > 106.58 \mid \mu = 110) = P\!\left(Z > \frac{106.58 - 110}{20/5}\right) = P(Z >…” |
| Lowering alpha raises the critical value and increases beta, so the Type I and Type II error probabilities trade off against each other. | fact | tagged | Type II Error: “Decreasing $\alpha$ generally **increases** $\beta$ — there is a trade-off between Type I and Type …” |
| Beta decreases (power increases) as sample size grows, as the standard deviation shrinks, or as the true parameter moves further from the n… | fact | tagged | Type II Error: “Increasing sample size $n$ **decreases** $\beta$ (increases power) for a fixed $\alpha$” |

</details>

<details><summary><code>masi-an-034</code> · answerable</summary>

Tagged pages: Type II Error, Power of a Test, Hypothesis Testing, Critical Value, Normal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A Type II error is failing to reject the null hypothesis when the alternative is true; its probability β is evaluated at a specific true pa… | definition | tagged | Type II Error: “A **Type II Error** occurs when a [[Hypothesis Testing\\|hypothesis test]] **fails to reject a false…” |
| The significance level α is the probability of a Type I error, i.e. of rejecting H0 when H0 is true, and it determines the critical value o… | definition | tagged | Critical Value: “Rejecting a true $H_0$ is a [[Type I Error]], so $\alpha$ is its probability by construction.” |
| For a sample of n observations from a normal distribution with known σ, the sample mean is normal with mean μ and standard deviation σ/√n (… | fact | linked | Sampling Distribution: “$$\bar{X} \sim N\!\left(\mu,\, \frac{\sigma^2}{n}\right) \quad \text{if } X_i \stackrel{\text{iid}}…” |
| For a one-sided upper-tail z-test of H0: μ = μ0, the rejection region is X̄ > μ0 + z_α σ/√n, using the one-tailed critical value z_α (not t… | procedure | tagged | Critical Value: “**Tests on a mean.** Use $Z = \dfrac{\bar X - \mu_0}{\sigma/\sqrt n}$ against $z_\alpha$ when $\sig…” |
| To compute β, find the probability that X̄ falls in the non-rejection region when the true mean is the alternative value, by standardizing … | procedure | tagged | Type II Error (collapsed): “Power $= P(\bar{X} > 106.58 \mid \mu = 110) = P\!\left(Z > \frac{106.58 - 110}{20/5}\right) = P(Z >…” |
| To achieve Type I error α and Type II error β at alternative μ1 for a one-sided z-test, the required sample size satisfies √n ≥ (z_α + z_β)… | formula | tagged | Power of a Test (collapsed): “$$n \ge \left(\frac{(z_\alpha + z_\beta)\,\sigma}{\mu_1 - \mu_0}\right)^{2} = \left(\frac{(1.645 + …” |
| A required minimum sample size is rounded up to the next whole number so the error-probability requirement is still met. | fact | tagged | Power of a Test (collapsed): “$$n \ge \left(\frac{(z_\alpha + z_\beta)\,\sigma}{\mu_1 - \mu_0}\right)^{2} = \left(\frac{(1.645 + …” |

</details>

<details><summary><code>masi-an-035</code> · untagged</summary>

Tagged pages: Efficiency, Unbiasedness, Order Statistics, Uniform Continuous Distribution, Sample Mean

| Item | Kind | Status | Where |
|---|---|---|---|
| The efficiency of one unbiased estimator relative to another is the ratio of their variances, Var(estimator 1)/Var(estimator 2); the estima… | definition | tagged | Efficiency: “of two unbiased estimators of the same parameter, the one with smaller variance is **relatively mor…” |
| A uniform distribution on (0, θ) has variance θ²/12. | fact | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The variance of a sample mean of n independent identically distributed observations equals the population variance divided by n. | fact | tagged | Sample Mean: “E[\bar{X}] = \mu, \qquad \text{Var}(\bar{X}) = \frac{\sigma^2}{n}” |
| For a constant c, Var(cX) = c²Var(X), so scaling an estimator by c multiplies its variance by c². | fact | elsewhere | Estimator (collapsed): “\text{MSE} &= \left(\tfrac{5}{4}\right)^2 (0.02667\,\theta^2)” |
| For the maximum X_(n) of a sample of size n from a uniform on (0, θ), Var(X_(n)) = nθ²/((n+1)²(n+2)). | fact | elsewhere | Estimator (collapsed): “Use $E[X_{(n)}] = \frac{n\theta}{n+1}$ and $\text{Var}(X_{(n)}) = \frac{n\theta^2}{(n+1)^2(n+2)}$.” |

</details>

<details><summary><code>masi-an-036</code> · gap</summary>

Tagged pages: Efficiency, Mean Square Error, Bias, Unbiasedness, Sample Variance, Maximum Likelihood Estimation

| Item | Kind | Status | Where |
|---|---|---|---|
| The mean square error of an estimator equals its variance plus its squared bias: MSE = Var(θ̂) + (E[θ̂] − θ)^2. | formula | tagged | Mean Square Error: “$$= \text{Var}(\hat{\theta}) + \left(\text{Bias}(\hat{\theta})\right)^2$$” |
| The bias of an estimator is E[θ̂] − θ; an estimator is unbiased if its bias is zero, and its MSE then equals its variance. | definition | tagged | Mean Square Error: “$$\text{where } \text{Bias}(\hat{\theta}) = E[\hat{\theta}] - \theta$$” |
| For a constant c and random variable X, E[cX] = c·E[X] and Var(cX) = c^2·Var(X). | fact | syllabus | Linear Combinations of Random Variables: “$$\text{Var}(L) = \sum_{i=1}^{n} c_i^2\,\text{Var}(X_i) + 2\sum_{i < j} c_i c_j\,\text{Cov}(X_i, X_…” |
| Relative efficiency of two unbiased estimators is the ratio of their variances; it is meaningful only for unbiased estimators, and with bia… | definition | tagged | Efficiency: “Relative efficiency compares two **unbiased** estimators (asymptotic relative efficiency, two asymp…” |
| A biased estimator can have a smaller MSE than an unbiased one, because a reduction in variance can outweigh the squared bias; the estimato… | fact | tagged | Mean Square Error: “**Bias–variance trade-off**: a slightly biased estimator can have lower MSE than an unbiased one if…” |
| The MLE of the normal variance divides the sum of squared deviations by n, so it is biased downward by σ²/n; the bias vanishes as n grows (… | fact | tagged | Bias: “Standard examples: the [[Sample Variance]] with divisor $n$ is biased low by $\sigma^2/n$” |
| Unbiasedness matters when estimates are averaged or pooled, since bias does not average away, and when the estimate is used in procedures b… | fact | missing |  |

</details>

<details><summary><code>masi-an-037</code> · gap</summary>

Tagged pages: Covariance, Aggregate Loss Model, Negative Binomial Distribution, Exponential Distribution, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The covariance of two random variables is Cov(X,Y) = E[XY] − E[X]E[Y]. | formula | tagged | Covariance: “$$\text{Cov}(X, Y) = E[XY] - E[X] \cdot E[Y]$$” |
| For a compound (aggregate) model with claim amounts independent of N and identically distributed with mean E[X], the conditional mean of ag… | fact | missing |  |
| To compute E[NS], use the law of iterated expectations: condition on N so that E[NS] = E[N·E[S \| N]]. | procedure | linked | Mixture Distribution: “$$E[X^m] = \sum_{i=1}^{k} a_i\, E[X_i^m] = E\big[E[X^m \mid \Theta]\big]$$” |
| Var(N) = E[N²] − (E[N])², so E[N²] = Var(N) + (E[N])². | formula | linked | Moment: “The second central moment is the [[Variance]], $\mu_2 = E[X^2] - \mu^2$.” |
| For a negative binomial distribution with parameters r and β, the mean is rβ and the variance is rβ(1+β). | formula | tagged | Negative Binomial Distribution: “$E[Y] = r\beta$ and $\text{Var}(Y) = r\beta(1+\beta)$” |
| In a compound model where severities are independent of the claim count and have mean E[X], Cov(N, S) = E[X]·Var(N). | fact | missing |  |

</details>

<details><summary><code>masi-an-038</code> · gap</summary>

Tagged pages: Covariance, Independent Random Variables, Deductible, Uniform Continuous Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The covariance of two random variables is Cov(X,Y) = E[XY] - E[X]E[Y]. | formula | tagged | Covariance: “$$\text{Cov}(X, Y) = E[XY] - E[X] \cdot E[Y]$$” |
| If X and Y are independent then Cov(X,Y) = 0, but zero covariance does not imply independence; dependent variables can have zero, positive … | fact | tagged | Covariance: “If $X$ and $Y$ are [[Independent Random Variables\\|independent]], $\text{Cov}(X, Y) = 0$ (but the c…” |
| Covariance measures only linear association, so a variable that is a nonlinear (e.g. U-shaped) function of another can have zero covariance… | fact | linked | Covariance and Correlation Coefficient: “$\rho_{X,Y} = 0$ means no linear relationship, but not necessarily [[Independent Random Variables\\|…” |
| For a distribution symmetric about 0 (such as uniform on (-a, a)), E[X] = 0 and all odd moments E[X^k] are 0. | fact | missing |  |
| Cov(X, a + bY) = b Cov(X, Y), Cov(X, X) = Var(X), and Cov(X, c) = 0 for a constant c; hence Cov(X, n - X) = -Var(X). | formula | linked | Covariance and Correlation Coefficient: “Covariance is bilinear: $\text{Cov}(aX + bY,\, Z) = a\,\text{Cov}(X, Z) + b\,\text{Cov}(Y, Z)$, add…” |
| With a deductible d, the retained part is min(loss, d) and the insurer's payment is max(loss - d, 0); the insurer pays only when the loss e… | definition | tagged | Deductible: “Under an ordinary deductible $d$ the loss splits in two: the part the policyholder keeps (is not re…” |
| The number of successes and the number of failures among n fixed Bernoulli trials sum to n, so they are perfectly negatively correlated (ne… | fact | missing |  |

</details>

<details><summary><code>masi-an-039</code> · answerable</summary>

Tagged pages: Random Variable, Discrete Random Variable, Continuous Random Variable, Payment Random Variable, Deductible

| Item | Kind | Status | Where |
|---|---|---|---|
| A discrete random variable takes only countably many values, while a continuous random variable has a density and assigns probability 0 to … | definition | tagged | Random Variable: “$X$ is **discrete** if its possible values form a finite or countably infinite set, and **continuou…” |
| A mixed random variable has a distribution with point masses (CDF jumps) combined with a continuous part, so it is neither purely discrete … | definition | tagged | Random Variable: “A payment under a [[Deductible]], $Y = (X - d)_+$ with $X$ continuous, takes a continuum of values …” |
| With an ordinary deductible d, the payment per loss is (X - d)_+, equal to 0 when X ≤ d and X - d when X > d; the payment per payment is X … | definition | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| The payment per loss under a deductible has a point mass at 0 equal to P(X ≤ d), so it is a mixed random variable. | fact | tagged | Payment Random Variable: “It has a point mass at zero, $P(Y = 0) = P(X \leq d) = F_X(d)$, so it has a [[Mixture Distribution\…” |
| The exponential distribution is memoryless: given X > d, X - d is again exponential with the same mean. | fact | syllabus | Exponential Distribution: “Its defining property is **memorylessness**: $P(X > s + t \mid X > s) = P(X > t)$, making it the un…” |
| The exponential CDF is F(x) = 1 - e^{-x/θ}, so P(X ≤ d) = 1 - e^{-d/θ}. | formula | syllabus | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| A claim count random variable takes values 0, 1, 2, ... and is therefore discrete. | fact | tagged | Discrete Random Variable: “A **Discrete Random Variable** $X$ is a [[Random Variable]] whose possible values form a finite or …” |
| The sum or average of independent continuous random variables is continuous (e.g., a sum of iid exponentials is gamma). | fact | syllabus | Gamma: “The sum of $n$ independent $\text{Exp}(\theta)$ variables follows $\text{Gamma}(n, \theta)$” |

</details>

<details><summary><code>masi-an-040</code> · answerable</summary>

Tagged pages: Random Variable, Cumulative Distribution Function (CDF), Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| A mixed random variable has both discrete point masses and a continuous part; its CDF jumps at the point masses and is continuous (rising) … | definition | tagged | Random Variable: “The two classes do not cover every case. A payment under a [[Deductible]], $Y = (X - d)_+$ with $X$…” |
| A point mass at a value equals the size of the CDF's jump there: P(Y=a) = F(a) - F(a^-); a jump at 0 gives F(0) as the mass at 0, and a mas… | fact | tagged | Random Variable: “A jump in the CDF at $x$ — $F(x)$ greater than its left-hand limit $F(x^-) = P(X < x)$ — is a point…” |
| On a continuous part of the CDF, the density is the derivative of the CDF, f(y) = F'(y). | fact | linked | Continuous Random Variable: “$$f(x) = F'(x)$$” |
| For a mixed random variable, E[Y] = sum of (value × point mass) over the discrete points plus the integral of y f(y) over the continuous pa… | formula | tagged | Random Variable: “$$E[g(X)] = \sum_i g(x_i)\,P(X = x_i) + \int g(x)\,f(x)\,dx$$” |
| For a nonnegative random variable, E[Y] = integral from 0 to infinity of the survival function S(y) = 1 - F(y). | formula | linked | Continuous Random Variable: “For $X \ge 0$ the survival shortcut $E[X] = \int_0^\infty [1 - F(x)]\,dx$ often avoids integration …” |

</details>

<details><summary><code>masi-an-041</code> · answerable</summary>

Tagged pages: Mixture Distribution, Exponential Distribution, Variance for Conditional and Marginal Distributions, Linear Combinations of Random Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| A mixture distribution arises by first selecting a component at random with given probabilities and then drawing from that component; its d… | definition | tagged | Mixture Distribution: “Its density (and its [[Cumulative Distribution Function (CDF)\\|CDF]]) is the weighted average of th…” |
| The survival function of an exponential random variable with mean θ is P(X > x) = e^{-x/θ}. | formula | tagged | Exponential Distribution: “Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponentia…” |
| Raw moments of a mixture are the probability-weighted averages of the components' raw moments, so the variance of a mixture is found from t… | fact | tagged | Mixture Distribution: “The **variance is not linear**: compute $E[X^2] - (E[X])^2$ from the mixed moments, or use the law …” |
| The second raw moment of an exponential random variable with mean θ is 2θ^2 (variance θ^2). | formula | prerequisite | Moment: “Closed forms worth memorising: [[Exponential Distribution\\|exponential]] $E[X^n] = n!\,\theta^n$” |
| Law of total variance: Var(X) = E[Var(X\|Y)] + Var(E[X\|Y]); the mixture variance equals the average component variance plus the variance o… | formula | tagged | Mixture Distribution: “\text{Var}(X) = E\big[\text{Var}(X \mid \Theta)\big] + \text{Var}\big(E[X \mid \Theta]\big)” |
| A weighted sum of independent random variables is not a mixture of their distributions; its variance is the sum of squared-coefficient-weig… | fact | tagged | Linear Combinations of Random Variables: “Coefficients enter the variance **squared**, so $\text{Var}(X - Y) = \text{Var}(X) + \text{Var}(Y)$…” |

</details>

<details><summary><code>masi-an-042</code> · answerable</summary>

Tagged pages: Mixture Distribution, Pareto Distribution, Percentile, Cumulative Distribution Function (CDF)

| Item | Kind | Status | Where |
|---|---|---|---|
| A mixture of a point mass at zero and a continuous distribution has a CDF equal to the weighted sum of the component CDFs, with a jump at z… | fact | tagged | Mixture Distribution: “A mixture of a point mass and a continuous distribution gives a CDF with a jump, such as an annual …” |
| The p-th percentile of a random variable is the value x at which the CDF equals p, i.e. F(x) = p (the smallest x with F(x) ≥ p). | definition | tagged | Percentile: “The **Percentile** (or quantile) $x_p$ of a [[Random Variable]] $X$ is the smallest value at which …” |
| A two-parameter Pareto with shape α and scale θ has survival function S(x) = (θ/(x+θ))^α and CDF F(x) = 1 − (θ/(x+θ))^α for x ≥ 0. | formula | tagged | Pareto Distribution: “$$F(x) = 1 - \left(\frac{\theta}{x + \theta}\right)^{\alpha}$$” |
| When the target percentile exceeds the probability mass at zero, it lies in the continuous part of the distribution, so the equation F(x)=p… | fact | tagged | Percentile (collapsed): “Above the jump $F_Y$ is continuous and increasing, so the 90th percentile solves $F_Y(y) = 0.90$:” |

</details>

<details><summary><code>masi-an-043</code> · answerable</summary>

Tagged pages: Convergence in Probability, Consistency, Bias, Order Statistics

| Item | Kind | Status | Where |
|---|---|---|---|
| An estimator is consistent if it converges in probability to the true parameter, i.e., for every ε > 0 the probability that the estimator d… | definition | tagged | Convergence in Probability: “A sequence of random variables $X_n$ **converges in probability** to $X$ (often a constant $a$) if,…” |
| The bias of an estimator is its expected value minus the true parameter value; an estimator is unbiased if the bias is zero. | definition | tagged | Bias: “**Bias** is the systematic error of an estimator: the difference between its expected value and the…” |
| Bias and consistency are separate properties: a biased estimator can be consistent (e.g., if bias vanishes as n grows and the variance shri… | fact | tagged | Consistency: “An estimator can be **biased but still consistent** (e.g., the MLE of $\sigma^2$ divides by $n$ ins…” |
| The sample maximum of n iid observations is at most x only if all n observations are at most x, so its CDF is the individual CDF raised to … | fact | tagged | Order Statistics: “$$P\bigl(X_{(n)} \le x\bigr) = F_1(x)\,F_2(x)\cdots F_n(x)$$” |

</details>

<details><summary><code>masi-an-044</code> · gap</summary>

Tagged pages: Convergence in Probability, Consistency, Law of Large Numbers, Unbiasedness, Order Statistics

| Item | Kind | Status | Where |
|---|---|---|---|
| An estimator is consistent if it converges in probability to the true parameter as the sample size grows, i.e. P(\|estimator - parameter\| … | definition | tagged | Consistency: “An estimator $\hat{\theta}_n$ is **consistent** for $\theta$ if it converges in probability to the …” |
| Unbiasedness alone does not imply consistency; an estimator must also concentrate around the parameter as the sample grows, so an estimator… | fact | tagged | Consistency: “A convenient **sufficient condition**: if $\text{Bias}(\hat{\theta}_n) \to 0$ and $\text{Var}(\hat{…” |
| By the weak law of large numbers, the sample average of iid observations (of X or of a function such as X²) converges in probability to its… | fact | tagged | Convergence in Probability: “**Weak law of large numbers.** For an i.i.d. sample with mean $\mu$ and finite variance $\sigma^2$,…” |
| Continuous mapping: if a sequence converges in probability to a constant and g is continuous at that constant, then g of the sequence conve… | fact | tagged | Convergence in Probability: “**Continuous functions.** If $X_n \xrightarrow{p} a$ and $g$ is continuous at $a$, then $g(X_n) \xr…” |
| The sample median converges in probability to the population median when the density is positive at the median. | fact | missing |  |
| For a uniform distribution on (0, θ), the mean is θ/2, the median is θ/2, and E[X²] = θ²/3. | fact | syllabus | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| For a sample of size n from uniform (0, θ), the maximum X_(n) has P(X_(n) ≤ x) = (x/θ)^n, so P(\|X_(n) - θ\| > ε) = (1 - ε/θ)^n → 0. | formula | tagged | Order Statistics: “$P\bigl(X_{(n)} \le x\bigr) = F_1(x)\,F_2(x)\cdots F_n(x)$” |

</details>

<details><summary><code>masi-an-045</code> · gap</summary>

Tagged pages: Percentile Matching, Percentile, Order Statistics

| Item | Kind | Status | Where |
|---|---|---|---|
| The smoothed empirical percentile at level g is found by interpolating between order statistics at position (n+1)g in the ordered sample of… | definition | tagged | Percentile Matching: “$\hat\pi_g$ is the **smoothed empirical percentile**: locate position $(n+1)g$ among the [[Order St…” |
| Percentile matching estimates parameters by setting the model CDF at each chosen percentile point equal to its percentile level g, F(π_g) =… | procedure | tagged | Percentile Matching: “**Percentile Matching** estimates the parameters of a model by making its [[Percentile\\|percentiles…” |
| For the loglogistic distribution with CDF F(x) = (x/θ)^γ / (1 + (x/θ)^γ), setting F(x) = g gives (x/θ)^γ = g/(1 - g), i.e. the odds of g. | formula | missing |  |

</details>

<details><summary><code>masi-an-046</code> · answerable</summary>

Tagged pages: Percentile Matching, Method of Moments, Maximum Likelihood Estimation, Pareto Distribution, Tail Weight

| Item | Kind | Status | Where |
|---|---|---|---|
| The kth raw moment of a two-parameter Pareto exists (is finite) only when k < α, so the variance is infinite for α ≤ 2 and the mean is infi… | fact | tagged | Pareto Distribution: “- **Heavy tail:** the $k$-th moment exists only when $\alpha > k$, so a Pareto with $\alpha \leq 2$…” |
| Method of moments sets the model's theoretical moments (e.g., mean and variance or second moment) equal to the corresponding sample moments… | procedure | tagged | Method of Moments: “The **Method of Moments** (MoM) estimates parameters by setting the sample moments equal to the the…” |
| Sample moments of heavy-tailed data (with the relevant moment infinite or barely finite) are erratic and dominated by the largest claims, s… | fact | tagged | Percentile Matching: “Because percentiles always exist, the method can fit heavy-tailed severity models such as a Pareto …” |
| Percentile matching sets the model's CDF at chosen percentiles equal to the smoothed empirical percentiles (the order statistic at position… | procedure | tagged | Percentile Matching: “**Percentile Matching** estimates the parameters of a model by making its [[Percentile\\|percentiles…” |
| Percentile matching does not depend on moments of the distribution, since percentiles always exist; percentiles near the middle of the data… | fact | tagged | Percentile Matching: “Because percentiles always exist, the method can fit heavy-tailed severity models such as a Pareto …” |
| Estimating k parameters requires matching k equations; fixing one parameter at an assumed value means it is not estimated from the data. | fact | tagged | Method of Moments: “With $k$ unknown parameters, the first $k$ moment equations are used.” |
| Method-of-moments, percentile matching and similar closed-form estimates can serve as starting values for the numerical search in maximum l… | fact | tagged | Percentile Matching: “percentile matching and moments give quick, explainable estimates and starting values for the MLE s…” |

</details>

<details><summary><code>masi-an-061</code> · gap</summary>

Tagged pages: Rao-Blackwell Theorem, Sufficient Statistic, Unbiasedness, Minimum Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| A statistic T is sufficient for a parameter θ if the conditional distribution of the sample given T does not depend on θ. | definition | tagged | Sufficient Statistic: “Once $T$ is known, the conditional distribution of the sample given $T$ does not depend on $\theta$.” |
| The Rao–Blackwell theorem: if T is sufficient and W is unbiased for θ, then E[W \| T] is an unbiased estimator of θ whose variance is no la… | fact | tagged | Rao-Blackwell Theorem: “The **Rao-Blackwell Theorem** turns any [[Unbiasedness\\|unbiased]] estimator $W$ of $\tau(\theta)$ …” |
| The tower property (law of total expectation) states E[E[W \| T]] = E[W]. | fact | linked | Variance for Conditional and Marginal Distributions: “$$E[X] = E\bigl[E[X \mid Y]\bigr]$$” |
| The law of total variance: Var(W) = Var(E[W \| T]) + E[Var(W \| T)]. | formula | tagged | Rao-Blackwell Theorem: “$$\text{Var}(\varphi(T)) = \text{Var}(W) - E\big[\text{Var}(W \mid T)\big] \le \text{Var}(W)$$” |
| If T is not sufficient, E[W \| T] may depend on θ, so it cannot be computed from the data and is not a statistic or estimator. | fact | tagged | Rao-Blackwell Theorem: “Sufficiency is what makes $\varphi(T)$ a statistic: the conditional distribution of the sample give…” |
| The Lehmann–Scheffé theorem: if T is complete and sufficient, any unbiased function of T is the unique UMVUE; without completeness, Rao–Bla… | fact | tagged | Rao-Blackwell Theorem: “**Lehmann–Scheffé Theorem.** If $T$ is complete and sufficient and $\varphi(T)$ is unbiased for $\t…” |
| The whole sample is always a sufficient statistic, and conditioning an estimator on it returns the estimator unchanged. | fact | missing |  |

</details>

<details><summary><code>masi-an-062</code> · answerable</summary>

Tagged pages: Rao-Blackwell Theorem, Poisson Distribution, Sufficient Statistic, Unbiasedness

| Item | Kind | Status | Where |
|---|---|---|---|
| Rao-Blackwellization: conditioning an unbiased estimator on a sufficient statistic gives an unbiased estimator whose variance is no larger … | procedure | tagged | Rao-Blackwell Theorem: “The result $\varphi(T) = E[W \mid T]$ is still unbiased and its variance is never larger, for every…” |
| For independent Poisson observations, the sum of the observations is a sufficient statistic for the Poisson mean (and is complete). | fact | tagged | Sufficient Statistic: “\\| $\text{Poi}(\lambda)$ \\| $\lambda$ \\| $\sum_{i=1}^n X_i$ \\|” |
| The sum of independent Poisson random variables is Poisson with mean equal to the sum of the means. | fact | syllabus | Poisson Superposition: “The merged process inherits independent increments, and a sum of independent Poisson counts is Pois…” |
| The Poisson probability mass function is P(N=n) = e^{-λ} λ^n / n!. | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| The conditional probability of an event given a sum is computed with the definition of conditional probability: P(A \| Y=y) = P(A and Y=y)/… | procedure | prerequisite | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| Given the sum of n iid Poisson counts equals y, each count is binomial(y, 1/n) (the counts are multinomial with equal cell probabilities). | fact | syllabus | Poisson Superposition: “Given $N(t) = n$ merged events, the number from stream $i$ is [[Binomial Distribution\\|binomial]]$(…” |
| An unbiased estimator that is a function of a complete sufficient statistic is the UMVUE (Lehmann-Scheffé). | fact | tagged | Sufficient Statistic: “A **complete sufficient statistic** combined with the Lehmann–Scheffé theorem yields the **UMVUE** …” |

</details>

<details><summary><code>masi-an-063</code> · answerable</summary>

Tagged pages: Cramér-Rao Lower Bound, Fisher Information, Gamma, Unbiasedness

| Item | Kind | Status | Where |
|---|---|---|---|
| The Fisher information I(θ) of one observation is the negative expected value of the second derivative of the log-density with respect to t… | definition | tagged | Cramér-Rao Lower Bound: “$$I(\theta) = -E\left[\frac{\partial^2}{\partial\theta^2}\ln f(X \mid \theta)\right]$$” |
| The Cramér–Rao lower bound for the variance of an unbiased estimator of g(θ) from n i.i.d. observations is [g'(θ)]² / (n I(θ)). | formula | tagged | Cramér-Rao Lower Bound: “$$\text{Var}(T) \ge \frac{\left[g'(\theta)\right]^2}{n\,I(\theta)}$$” |
| The information from a sample of n independent observations equals n times the Fisher information of a single observation. | fact | tagged | Cramér-Rao Lower Bound: “For a [[Random Sample\\|random sample]] of size $n$ it is the reciprocal of the sample's [[Fisher In…” |
| For a gamma distribution with shape α and scale θ, E[X] = αθ, so E[X] can be substituted for x in the expected score derivative. | fact | tagged | Gamma: “$E[X] = \alpha\theta$, $\text{Var}(X) = \alpha\theta^2$, and coefficient of variation $CV = 1/\sqrt…” |

</details>

<details><summary><code>masi-an-064</code> · answerable</summary>

Tagged pages: Cramér-Rao Lower Bound, Mean Square Error, Bias, Unbiasedness, Exponential Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The mean square error of an estimator equals its variance plus the square of its bias, and it is the criterion used to compare estimators. | definition | tagged | Mean Square Error: “$$= \text{Var}(\hat{\theta}) + \left(\text{Bias}(\hat{\theta})\right)^2$$” |
| The Cramér–Rao lower bound applies only to unbiased estimators, so a biased estimator can have variance below the bound without any contrad… | fact | tagged | Cramér-Rao Lower Bound: “The bound restricts **unbiased** estimators only. A biased estimator can have smaller variance, and…” |
| The Cramér–Rao lower bound for the variance of an unbiased estimator of θ is 1/(n·I(θ)), where I(θ) is the Fisher information per observati… | formula | tagged | Cramér-Rao Lower Bound: “$$\text{Var}(\hat\theta) \ge \frac{1}{n\,I(\theta)}$$” |
| For an exponential distribution with mean θ, the Fisher information is I(θ) = 1/θ², giving a Cramér–Rao bound of θ²/n for unbiased estimato… | formula | linked | Minimum Variance (collapsed): “$I_1(\theta) = \text{Var}\!\left(\frac{X-\theta}{\theta^2}\right) = \frac{\theta^2}{\theta^4} = \fr…” |
| An unbiased estimator whose variance equals the Cramér–Rao lower bound is efficient (minimum variance among unbiased estimators), but this … | fact | tagged | Cramér-Rao Lower Bound: “An unbiased estimator whose variance equals the bound is **efficient**, and is then the [[Minimum V…” |

</details>

<details><summary><code>masi-an-065</code> · answerable</summary>

Tagged pages: Empirical Distribution, Binomial Distribution, Unbiasedness

| Item | Kind | Status | Where |
|---|---|---|---|
| The empirical distribution function F_n(x) is the proportion of the n observed (complete) data points that are less than or equal to x. | definition | tagged | Empirical Distribution: “Its CDF, the **empirical distribution function** $F_n$, is the proportion of the sample at or below…” |
| For independent, identically distributed observations, the number of observations at or below x is Binomial(n, F(x)), because each observat… | fact | tagged | Empirical Distribution: “At each fixed $x$, $n F_n(x)$ is [[Binomial Distribution\\|binomial]] with parameters $n$ and $F(x)$…” |
| The empirical distribution function at a fixed point is an unbiased estimator of F(x), since its expectation equals F(x). | fact | tagged | Empirical Distribution: “At each fixed $x$, $n F_n(x)$ is [[Binomial Distribution\\|binomial]] with parameters $n$ and $F(x)$…” |
| The variance of the empirical distribution function at x is F(x)[1 − F(x)]/n, estimated by substituting F_n(x) for F(x); it divides by n, n… | formula | tagged | Empirical Distribution: “At each fixed $x$, $n F_n(x)$ is [[Binomial Distribution\\|binomial]] with parameters $n$ and $F(x)$…” |
| The standard error of the empirical distribution function is proportional to 1/√n, so halving it requires quadrupling the sample size, and … | fact | linked | Sample Mean: “The **standard error** is $\text{SD}(\bar{X}) = \sigma/\sqrt{n}$; estimated from data it is $S/\sqr…” |

</details>

<details><summary><code>masi-an-066</code> · answerable</summary>

Tagged pages: Empirical Distribution, Loss Elimination Ratio, Limited Expected Value, Deductible

| Item | Kind | Status | Where |
|---|---|---|---|
| The loss elimination ratio for a deductible d is the fraction of expected losses removed by the deductible, LER(d) = E[X ∧ d] / E[X]. | definition | tagged | Loss Elimination Ratio: “**Loss Elimination Ratio** (LER) is the proportion of ground-up losses removed by a deductible — th…” |
| The limited loss variable X ∧ d equals X when X is below d and equals d otherwise, so E[X ∧ d] is the expected loss capped at d. | definition | tagged | Deductible: “the part the policyholder keeps (is not reimbursed for) is the loss capped at the deductible, $\min…” |
| The empirical distribution of a sample of n observations places probability 1/n on each observed value, so expectations of functions of X a… | definition | tagged | Empirical Distribution: “The **Empirical Distribution** of a sample $x_1, \ldots, x_n$ is the discrete distribution that put…” |
| To estimate E[X ∧ d] from a sample, replace each observation by min(observation, d) and average these capped values over all observations. | procedure | tagged | Empirical Distribution: “Any quantity defined from $F$ can be estimated by computing it under $F_n$: $E[g(X)] \approx \frac{…” |

</details>

<details><summary><code>masi-an-067</code> · answerable</summary>

Tagged pages: Kolmogorov-Smirnov Test, Empirical Distribution, Exponential Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The Kolmogorov–Smirnov statistic D is the maximum absolute difference between the empirical CDF and the hypothesized CDF over all x. | definition | tagged | Kolmogorov-Smirnov Test: “$$D = \max_{x}\,\big\\|F_n(x) - F^*(x)\big\\|$$” |
| The empirical CDF F_n(x) is the proportion of observations less than or equal to x, so each observation (including ties) adds 1/n and it ju… | definition | tagged | Empirical Distribution: “$F_n$ is a right-continuous step function that jumps by $1/n$ at each observation (by $m/n$ at a va…” |
| Because the empirical CDF is a step function, the maximum gap must be checked at each data point both just before the jump (F_n(x^-)) and a… | procedure | tagged | Kolmogorov-Smirnov Test: “$F_n$ jumps at each data point, so the gap must be checked on **both sides** of every jump: against…” |
| The exponential distribution with mean θ has CDF F(x) = 1 − e^{−x/θ}. | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |

</details>

<details><summary><code>masi-an-068</code> · answerable</summary>

Tagged pages: Kolmogorov-Smirnov Test, Empirical Distribution, Exponential Distribution, Critical Value, Hypothesis Testing

| Item | Kind | Status | Where |
|---|---|---|---|
| The Kolmogorov–Smirnov statistic D is the maximum absolute difference between the empirical CDF and the hypothesized CDF F*, taken over all… | definition | tagged | Kolmogorov-Smirnov Test: “$$D = \max_{x}\,\big\\|F_n(x) - F^*(x)\big\\|$$” |
| To compute D, compare F*(x) with the empirical CDF both just before and at each data point (i-1)/n and i/n, since the empirical CDF jumps a… | procedure | tagged | Kolmogorov-Smirnov Test: “$F_n$ jumps at each data point, so the gap must be checked on **both sides** of every jump: against…” |
| The exponential distribution with mean θ has CDF F(x) = 1 - e^{-x/θ}. | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| Reject the null hypothesis at a significance level if D exceeds the K–S critical value for that level (e.g., c/√n); the hypothesis is rejec… | procedure | tagged | Kolmogorov-Smirnov Test: “so $H_0$ is rejected when $D$ exceeds its [[Critical Value\\|critical value]].” |
| The standard K–S critical values assume the hypothesized distribution is fully specified independent of the data; if parameters are estimat… | fact | tagged | Kolmogorov-Smirnov Test: “If parameters are estimated from the same data, the tabled critical values are no longer valid (the…” |
| Unlike the chi-square goodness-of-fit test, the K–S test has no simple degrees-of-freedom reduction for estimated parameters; adjusted crit… | fact | tagged | Kolmogorov-Smirnov Test: “If parameters are estimated from the same data, the tabled critical values are no longer valid (the…” |

</details>

<details><summary><code>masi-an-069</code> · answerable</summary>

Tagged pages: Pareto Distribution, Deductible, Payment Random Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| With an ordinary deductible d, a payment is made only when the loss exceeds d, and the amount paid per payment is the excess loss X - d con… | definition | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| The survival function of the per-payment variable Y = X - d given X > d is P(Y > y) = S(y + d) / S(d). | formula | tagged | Pareto Distribution: “because $S(x + d)/S(d) = \left(\frac{\theta + d}{x + \theta + d}\right)^{\alpha}$” |
| The Pareto distribution with shape alpha and scale theta has survival function S(x) = (theta/(x + theta))^alpha for x > 0. | formula | tagged | Pareto Distribution: “F(x) = 1 - \left(\frac{\theta}{x + \theta}\right)^{\alpha}” |
| For a Pareto(alpha, theta) loss with an ordinary deductible d, the amount paid per payment is again Pareto with the same shape alpha and sc… | fact | tagged | Pareto Distribution: “given $X > d$, the excess $X - d$ is again Pareto, with shape $\alpha$ and scale $\theta + d$” |

</details>

<details><summary><code>masi-an-070</code> · answerable</summary>

Tagged pages: Pareto Distribution, Limited Expected Value, Loss Elimination Ratio, Tail Weight

| Item | Kind | Status | Where |
|---|---|---|---|
| For a Pareto distribution with shape alpha and scale theta, the mean is theta/(alpha-1) for alpha > 1. | formula | tagged | Pareto Distribution: “The mean is $E[X] = \theta/(\alpha - 1)$ for $\alpha > 1$.” |
| For a Pareto distribution, the limited expected value is E[X ∧ x] = θ/(α−1) · [1 − (θ/(x+θ))^(α−1)]. | formula | tagged | Pareto Distribution: “$$E[X \wedge x] = \frac{\theta}{\alpha - 1}\left[1 - \left(\frac{\theta}{x + \theta}\right)^{\alpha…” |
| The expected loss above a point x equals the mean minus the limited expected value: E[(X − x)+] = E[X] − E[X ∧ x]. | formula | tagged | Limited Expected Value: “$$E[X \wedge u] = E[X] - E[\max(X - u, 0)] = E[X] - e(u)\cdot[1-F(u)]$$” |
| For a Pareto distribution, the excess over a deductible d, given X > d, is Pareto with the same shape alpha and scale theta + d, so the mea… | fact | tagged | Pareto Distribution: “given $X > d$, the excess $X - d$ is again Pareto, with shape $\alpha$ and scale $\theta + d$, beca…” |
| A smaller Pareto shape parameter gives a heavier tail, and two distributions with equal means can differ in how loss is spread across layer… | fact | tagged | Tail Weight: “the Pareto has $E[X^k] < \infty$ only for $k < \alpha$ (heavy, heavier as $\alpha$ falls)” |

</details>

<details><summary><code>masi-an-071</code> · answerable</summary>

Tagged pages: Severity Distribution, Gamma, Inflation

| Item | Kind | Status | Where |
|---|---|---|---|
| Under uniform inflation by a factor k with no other change, each loss becomes Y = kX, so the new CDF is F_Y(y) = F_X(y/k). | fact | tagged | Inflation: “**Inflation** in an insurance context is growth in the underlying loss random variable over time, $…” |
| The scale parameter θ of a gamma distribution is a scale parameter: x enters the CDF only through x/θ, so multiplying the random variable b… | fact | tagged | Gamma: “\text{where } \alpha > 0 = \text{shape},\; \theta > 0 = \text{scale}” |
| Multiplying a random variable by a constant k multiplies its mean by k and its standard deviation by k, leaving the coefficient of variatio… | fact | syllabus | Transformations of Random Variables: “A linear transformation $Y = aX + b$ gives $E[Y] = aE[X] + b$ and $\text{Var}(Y) = a^2\text{Var}(X)…” |

</details>

<details><summary><code>masi-an-072</code> · gap</summary>

Tagged pages: Severity Distribution, Mean Excess Loss, Hazard Rate, Exponential Distribution, Gamma, Weibull Distribution, Pareto Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The mean excess loss (mean residual life) function is e(d) = E[X - d \| X > d], and for a Pareto with parameters alpha and theta it equals … | formula | tagged | Mean Excess Loss: “The [[Pareto Distribution\\|Pareto]] has $e_X(d) = (d + \theta)/(\alpha - 1)$ for $\alpha > 1$, whic…” |
| The mean excess loss of an exponential distribution is constant in the threshold (memoryless property), equal to its mean. | fact | tagged | Mean Excess Loss: “The [[Exponential Distribution\\|exponential]] has a constant mean excess, $e_X(d) = \theta$, becaus…” |
| An increasing hazard rate implies a decreasing mean excess loss, and a decreasing hazard rate implies an increasing mean excess loss; this … | fact | tagged | Mean Excess Loss: “It moves opposite to the [[Hazard Rate\\|hazard rate]]: a decreasing hazard rate gives an increasing…” |
| A gamma distribution with shape alpha > 1 has an increasing hazard rate that is bounded above by 1/theta (levelling off), and a decreasing … | fact | missing |  |
| A Weibull with shape tau < 1 has a decreasing hazard rate and an increasing mean excess loss (heavier tail than exponential), growing more … | fact | tagged | Weibull Distribution: “**Hazard rate:** decreasing for $\tau < 1$, constant $1/\theta$ for $\tau = 1$ (the exponential wit…” |
| The lognormal distribution has a heavy right tail with an increasing mean excess loss that grows more slowly than linearly, and its hazard … | fact | tagged | Severity Distribution: “The [[Lognormal Distribution\\|lognormal]] has every moment but no moment generating function, which…” |
| To check a Weibull fit graphically, plot ln[-ln S(x)] against ln x; since S(x)=exp(-(x/theta)^tau), this is a straight line with slope tau … | procedure | missing |  |

</details>

<details><summary><code>masi-an-073</code> · gap</summary>

Tagged pages: Tail Weight, Gamma, Weibull Distribution, Lognormal Distribution, Pareto Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The moment generating function of a random variable X is M_X(t) = E[e^{tX}], and it exists only if this expectation is finite for t in an i… | definition | prerequisite | Moment: “Where the moment generating function $M_X(t) = E[e^{tX}]$ exists — the sum or integral defining it …” |
| The gamma distribution with shape α and scale θ has MGF M(t) = (1 - θt)^{-α} for t < 1/θ, for every α > 0. | formula | missing |  |
| A distribution has a finite MGF for some t > 0 only if its tail decays at least exponentially fast; an exponentially decaying tail e^{-x/θ}… | fact | missing |  |
| Pareto and single-parameter Pareto distributions have polynomial (heavy) tails, so only moments below order α exist and the MGF is infinite… | fact | tagged | Pareto Distribution: “- **Heavy tail:** the $k$-th moment exists only when $\alpha > k$, so a Pareto with $\alpha \leq 2$…” |
| The lognormal distribution has all positive moments but no MGF, because its tail is heavier than any exponential tail. | fact | tagged | Tail Weight: “The [[Lognormal Distribution\\|lognormal]] has every moment but no moment generating function, so th…” |
| A Weibull distribution with τ < 1 has survival function e^{-(x/θ)^τ} that decays more slowly than any exponential, so it is heavy-tailed, h… | fact | tagged | Tail Weight: “A decreasing hazard rate $h(x) = f(x)/S(x)$ signals a heavy tail and an increasing one a light tail.” |

</details>

<details><summary><code>masi-an-074</code> · answerable</summary>

Tagged pages: Tail Weight, Pareto Distribution, Lognormal Distribution, Weibull Distribution, Exponential Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The tail weight of a distribution is compared by the limit of the ratio of survival functions S1(x)/S2(x) as x → ∞; if the ratio goes to in… | definition | tagged | Tail Weight: “If the limit is $\infty$, $X$ has the heavier right tail; if it is a positive constant, the tails a…” |
| Scale parameters and means do not determine tail weight; the functional form of the survival function as x → ∞ decides the ordering. | fact | linked | Scale and Shape Parameters: “The shape therefore decides the [[Tail Weight\\|tail weight]], while the scale only stretches the ax…” |
| A Weibull with shape τ > 1 has survival function exp(-(x/θ)^τ), which decays faster than any exponential, so it has a lighter tail than the… | fact | tagged | Tail Weight: “A decreasing hazard rate $h(x) = f(x)/S(x)$ signals a heavy tail and an increasing one a light tail…” |
| The exponential survival function exp(-x/θ) decays exponentially, so its tail is heavier than a Weibull with τ > 1 but lighter than the log… | fact | tagged | Tail Weight: “In the limit, $S_{\text{Par}}(x)/S_{\text{Exp}}(x) = (2{,}000)^3 e^{x/1{,}000}/(x + 2{,}000)^3 \to …” |
| The lognormal log-survival function decays like -(ln x)^2/2, which is slower than any exponential but faster than any power law, so its tai… | fact | tagged | Tail Weight: “The [[Lognormal Distribution\\|lognormal]] has every moment but no moment generating function, so th…” |
| A Pareto survival function behaves like a power law, S(x) ~ (θ/x)^α, so a smaller α gives a heavier tail regardless of θ. | fact | tagged | Tail Weight: “the Pareto has $E[X^k] < \infty$ only for $k < \alpha$ (heavy, heavier as $\alpha$ falls).” |
| Tail weight ordering from lightest to heaviest: Weibull (τ>1), exponential, lognormal, Pareto (power law). | fact | tagged | Tail Weight: “Gamma and [[Weibull Distribution\\|Weibull]] have all moments (light); the Pareto has $E[X^k] < \inf…” |

</details>

<details><summary><code>masi-an-075</code> · answerable</summary>

Tagged pages: Coverage Modifications, Limited Expected Value, Exponential Distribution, Deductible, Coinsurance, Payment Random Variable, Inflation

| Item | Kind | Status | Where |
|---|---|---|---|
| With ordinary deductible d, maximum covered loss u and coinsurance α, the expected payment per loss is E[Y^L] = α(E[X∧u] − E[X∧d]). | formula | tagged | Coverage Modifications: “$$E[Y^L] = \alpha\big(E[X \wedge u] - E[X \wedge d]\big)$$” |
| The limited expected value E[X∧x] is the expected value of the loss censored at x, i.e. E[min(X,x)] = ∫0^x S(t)dt. | definition | tagged | Limited Expected Value: “$$E[X \wedge u] = \int_0^u [1 - F(x)]\,dx \quad \text{(for non-negative } X\text{)}$$” |
| The expected payment per payment equals the expected payment per loss divided by the probability of a payment, E[Y^P] = E[Y^L]/S(d). | formula | tagged | Coverage Modifications: “$$E[Y^P] = \frac{E[Y^L]}{1 - F_X(d)}$$” |
| With a deductible, a payment occurs only if the loss exceeds the deductible, so the probability of a payment is S(d) = 1 − F(d); for an exp… | fact | tagged | Coverage Modifications: “Only losses above $d$ become payments, so each loss becomes a payment with probability $v = S(d)$.” |
| Under uniform inflation rate r applied to losses with policy terms fixed, the expected payment per loss is α(1+r)(E[X∧u/(1+r)] − E[X∧d/(1+r… | procedure | tagged | Inflation: “$$E[(X' - d)_+] = (1+r)\,E\!\left[\left(X - \tfrac{d}{1+r}\right)_+\right]$$” |
| Multiplying an exponential random variable by a constant (1+r) gives an exponential with mean scaled by (1+r), since the exponential is a s… | fact | tagged | Exponential Distribution: “$\theta$ is a [[Scale and Shape Parameters\\|scale parameter]]: for $c > 0$, $cX$ is exponential wit…” |

</details>

<details><summary><code>masi-an-076</code> · answerable</summary>

Tagged pages: Coverage Modifications, Inflation, Exponential Distribution, Deductible, Payment Random Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| For an exponential distribution with mean θ, the limited expected value is E[X ∧ x] = θ(1 − e^{−x/θ}). | formula | tagged | Exponential Distribution: “Capped at a [[Benefit Limit\\|limit]] $u$: $E[\min(X,u)] = \theta\left(1 - e^{-u/\theta}\right)$” |
| With ordinary deductible d and maximum covered loss u (no coinsurance), the expected payment per loss is E[Y^L] = E[X ∧ u] − E[X ∧ d]. | formula | tagged | Coverage Modifications: “E[Y^L] = \alpha\big(E[X \wedge u] - E[X \wedge d]\big)” |
| The expected payment per payment equals the expected payment per loss divided by the probability of a payment, E[Y^P] = E[Y^L] / S(d). | formula | tagged | Coverage Modifications: “E[Y^P] = \frac{E[Y^L]}{1 - F_X(d)}” |
| Under uniform inflation by factor (1+r) applied to ground-up losses, an exponential loss distribution stays exponential with its mean scale… | fact | tagged | Inflation: “Many deductibles and benefit limits are stated in **fixed dollars** that do not rise with inflation…” |
| The exponential distribution is memoryless: the excess of a loss over a deductible, given the loss exceeds it, is exponential with the same… | fact | tagged | Exponential Distribution: “A direct consequence: given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$.” |
| With a fixed deductible, inflation raises the expected payment per loss by more than the inflation rate (leveraging effect) because more lo… | fact | tagged | Inflation: “A fixed deductible **leverages** it, raising the insurer's expected payment by more than $r$; a fix…” |

</details>

<details><summary><code>masi-an-091</code> · answerable</summary>

Tagged pages: Extended Linear Model, Generalized Linear Model, Link Function, Linear Regression, Polynomial Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| A linear model is linear in its coefficients (the parameters), not necessarily in the predictors, so polynomial terms such as x^2 can be in… | definition | tagged | Extended Linear Model: “"linear" means linear in the coefficients, so $\beta_0 + \beta_1 x + \beta_2 x^2$ is still a linear…” |
| In a GLM, the link function g is applied to the mean of the response, so g(E[Y_i]) equals the linear predictor; it does not transform the r… | fact | tagged | Link Function: “A **Link Function** $g$ is a monotone, differentiable function in a [[Generalized Linear Model]] th…” |
| E[ln Y] and ln E[Y] are different quantities; by Jensen's inequality E[ln Y] < ln E[Y] for a non-degenerate positive Y, so a log-link GLM d… | fact | syllabus | Response Variable: “Least squares on $\ln Y$ is a different model: $E[\ln Y] \neq \ln E[Y]$, so exponentiating its fitt…” |
| Ordinary least-squares regression is the special case of a GLM with a Normal response distribution and identity link, where maximum likelih… | fact | tagged | Extended Linear Model: “Ordinary least-squares regression is a special case where the response is Normal and the link is th…” |

</details>

<details><summary><code>masi-an-092</code> · answerable</summary>

Tagged pages: Extended Linear Model, Model Structure, Gamma, Link Function, Variance Function, Severity

| Item | Kind | Status | Where |
|---|---|---|---|
| The Gamma distribution has variance function V(mu) = mu^2, so its variance is proportional to the squared mean and its coefficient of varia… | fact | tagged | Variance Function: “[[Gamma\\|gamma]]: $\mu^2$ (constant coefficient of variation)” |
| The Poisson distribution has variance function V(mu) = mu, so its standard deviation grows like the square root of the mean and its coeffic… | fact | tagged | Variance Function: “Poisson: $\mu$” |
| The Normal distribution assumes constant variance independent of the mean, so it does not fit data whose spread grows with the mean, and it… | fact | tagged | Variance Function: “normal: $1$ (constant variance)” |
| A log link makes the linear predictor act multiplicatively on the mean (mu = exp(eta) = product of factors) and guarantees positive fitted … | fact | tagged | Link Function: “The **log link** is standard for insurance severity and frequency models because it guarantees posi…” |
| Fitting a Normal model to ln(Y) models E[ln Y], so exponentiating fitted values gives the geometric mean or median rather than the mean of … | fact | syllabus | Response Variable: “A GLM links the *mean* and leaves $Y$ itself untransformed. Least squares on $\ln Y$ is a different…” |

</details>

<details><summary><code>masi-an-093</code> · answerable</summary>

Tagged pages: Model Structure, Link Function, Poisson Regression, Logistic Regression, Gamma, Tweedie Distribution, Response Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| A Tweedie distribution with power p between 1 and 2 is a compound Poisson-gamma, giving a point mass at zero plus a continuous, right-skewe… | fact | tagged | Tweedie Distribution: “For $1 < p < 2$ it is a compound Poisson–Gamma distribution: a Poisson number of Gamma-sized claims…” |
| A binary (yes/no) response is modelled as Bernoulli/binomial with a logit link, which maps probabilities in (0,1) to the whole real line so… | fact | tagged | Logistic Regression: “the outcome is modelled as binomial and the **logit** [[Link Function]] maps the probability $\pi \…” |
| Claim counts are modelled with a Poisson response and log link, which makes rating factors multiplicative. | fact | tagged | Poisson Regression: “**Poisson Regression** is the [[Generalized Linear Model]] for count data: the response is Poisson …” |
| When observations have different exposures (e.g., term lengths), include the log of exposure as an offset term in a log-link Poisson GLM. | procedure | tagged | Poisson Regression: “With a **claim-count** target, the exposure term $\ln(e_i)$ is an **offset** — a predictor with coe…” |
| A gamma response has variance function proportional to the squared mean (variance = phi*mu^2), so the standard deviation is proportional to… | fact | tagged | Response Variable: “**Claim severity** — positive and right-skewed, with standard deviation roughly proportional to the…” |
| A normal response with identity link assumes constant variance and can produce negative fitted values, so it is a poor fit for skewed, non-… | fact | tagged | Response Variable: “**Continuous, roughly symmetric, constant variance** — Normal with the identity link: ordinary [[Li…” |
| The log link keeps fitted means positive and makes the effects of predictors multiplicative. | fact | tagged | Link Function: “The **log link** is standard for insurance severity and frequency models because it guarantees posi…” |
| In a severity GLM using average claim size per policy, the number of claims should be used as a prior weight. | fact | tagged | Response Variable: “**Claim severity** — positive and right-skewed, with standard deviation roughly proportional to the…” |

</details>

<details><summary><code>masi-an-094</code> · answerable</summary>

Tagged pages: Model Structure, Poisson Regression, Link Function, Offset Variable, Control Variable, Categorical Predictor, Frequency

| Item | Kind | Status | Where |
|---|---|---|---|
| A claim count response (non-negative integer) is modelled with a Poisson distribution and a log link, which keeps fitted frequencies positi… | fact | tagged | Poisson Regression: “the response is Poisson and the log [[Link Function]] makes the predictors act multiplicatively on …” |
| Gamma and Tweedie responses model claim amounts or pure premium (Gamma cannot take zero), binomial/logit models a yes/no outcome, and a nor… | fact | syllabus | Response Variable: “- **Pure premium or loss cost** — mostly zeros plus a skewed positive amount: the [[Tweedie Distrib…” |
| With a log link, exposure is included as an offset equal to the natural log of the exposure, with its coefficient fixed at 1, so that expec… | procedure | tagged | Poisson Regression: “- With a **claim-count** target, the exposure term $\ln(e_i)$ is an **offset** — a predictor with c…” |
| A control variable is a predictor included in the model so that the other rating variables are estimated net of its effect, but which is no… | definition | tagged | Control Variable: “A **Control Variable** is a predictor included in an insurance [[Generalized Linear Model]] to acco…” |
| Omitting a variable correlated with both the response and other predictors (such as time trend alongside a shifting mix) lets its effect be… | fact | tagged | Control Variable: “- Omitting a relevant control variable causes **omitted variable bias**: correlated rating variable…” |
| A categorical predictor with k levels is coded with k-1 indicator (dummy) variables against a base level, ideally the level with the most e… | procedure | tagged | Categorical Predictor: “- A categorical predictor with $k$ levels is represented using $k-1$ **indicator (dummy) variables*…” |
| Nominal codes (such as territory numbers) have no meaningful spacing, so entering them as a single numeric predictor imposes an unjustified… | fact | tagged | Categorical Predictor: “A **Categorical Predictor** is an explanatory variable in a [[Generalized Linear Model]] whose valu…” |
| A continuous predictor enters the log-link linear predictor as a single slope only if its effect on log frequency is roughly linear; otherw… | procedure | tagged | Categorical Predictor: “- Continuous predictors assume a smooth effect on the response (linear on the link scale unless tra…” |
| An ordinal predictor with unknown spacing between levels is safest entered as categorical indicators against a base level, or as a single n… | fact | tagged | Categorical Predictor: “\\| Ordinal \\| Credit tier, limit band \\| As categorical, or with order-preserving (e.g., banded num…” |
| A prior weight changes the variance of each record's response, not its mean structure, so it cannot remove a trend effect from the mean. | fact | syllabus | Response Variable (collapsed): “Gamma with a log link, weighted by the number of claims behind each average — an average of many cl…” |

</details>

<details><summary><code>masi-an-095</code> · answerable</summary>

Tagged pages: Data Types, Categorical Predictor, Offset Variable, Design Matrix, Poisson Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| A categorical predictor with k levels enters a GLM with an intercept through k - 1 indicator (dummy) variables, with one level serving as t… | fact | tagged | Data Types: “A nominal predictor enters as $k - 1$ indicator columns ([[Categorical Predictor]])” |
| A continuous predictor entered as a single term contributes one estimated coefficient (a single slope) to a GLM. | fact | tagged | Categorical Predictor: “\\| Continuous \\| Vehicle age, driver age \\| A single coefficient, or banded/transformed \\|” |
| An offset is a term in the linear predictor whose coefficient is fixed at 1 rather than estimated, so it adds no estimated parameters; for … | definition | tagged | Poisson Regression: “With a **claim-count** target, the exposure term $\ln(e_i)$ is an **offset** — a predictor with coe…” |
| A variable stored as numbers but declared categorical is treated as nominal, with a separate coefficient for each non-base level, rather th… | fact | tagged | Data Types: “A territory stored as the integers $1$–$12$ is nominal, and a ZIP code is a label. Software reads w…” |
| The intercept is an estimated parameter and counts toward the total number of parameters in a GLM. | fact | tagged | Design Matrix: “is the $n \times (p+1)$ matrix that holds a regression's predictor values: one row per observation,…” |

</details>

<details><summary><code>masi-an-096</code> · answerable</summary>

Tagged pages: Data Types, Categorical Predictor, Poisson Regression, Parameter Estimate Tables, Deviance

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal (unordered) categorical predictor stored as integer codes should be entered as a factor with indicator variables, not as a numeri… | fact | tagged | Categorical Predictor: “A categorical predictor with $k$ levels is represented using $k-1$ **indicator (dummy) variables**” |
| In a log-link GLM, a numeric predictor's coefficient β means the fitted mean is multiplied by e^β for each one-unit increase in the predict… | fact | tagged | Poisson Regression: “$e^{\beta_j}$ is the multiplicative effect on frequency of a one-unit increase in $x_j$” |
| Compare nested GLMs with a likelihood-ratio (deviance) test: the drop in deviance between the nested models is compared with a chi-square c… | procedure | tagged | Deviance: “for nested models, $\dfrac{D_{\text{reduced}} - D_{\text{full}}}{\phi} \approx \chi^2_{\Delta p}$ w…” |
| A non-significant coefficient for a numeric predictor only indicates no significant linear (log-linear) trend in that variable. It does not… | fact | syllabus | p-Value: “A p-value just above $\alpha$ is weak evidence, not evidence of no effect” |
| A large residual deviance relative to its degrees of freedom may reflect lack of fit from a misspecified linear predictor rather than overd… | fact | tagged | Poisson Regression: “A residual [[Deviance]] (or Pearson $\chi^2$) far above its degrees of freedom is first a sign of *…” |
| In a Poisson GLM with a log link, an offset of ln(exposure) models claim frequency (claims per unit exposure) by fixing the exposure coeffi… | definition | tagged | Poisson Regression: “the exposure term $\ln(e_i)$ is an **offset** — a predictor with coefficient fixed at $1$” |
| A model with a categorical predictor with k levels (k−1 indicators) fitted to one observation per level reproduces the observed level means… | fact | tagged | Deviance: “a model with one parameter per observation, achieving perfect fit” |

</details>

<details><summary><code>masi-an-097</code> · gap</summary>

Tagged pages: Statistical Software, Model Output, Parameter Estimate Tables, Gamma, Link Function, Categorical Predictor

| Item | Kind | Status | Where |
|---|---|---|---|
| With a log link, the fitted mean is the exponential of the linear predictor: mu = exp(eta). | fact | tagged | Link Function: “\\| Log \\| $\ln\mu$ \\| $e^\eta$ \\| Poisson (counts), Gamma (severity) \\|” |
| In a GLM with a categorical predictor, the level with no coefficient row is the base level (absorbed in the intercept), and each other leve… | fact | tagged | Categorical Predictor: “A categorical predictor with $k$ levels is represented using $k-1$ **indicator (dummy) variables**;…” |
| To get a GLM prediction, sum the intercept and the coefficients times the predictor values for the given risk (using the transformed predic… | procedure | tagged | Link Function: “$$= \beta_0 + \beta_1 x_1 + \cdots + \beta_p x_p$$” |
| In R, log() is the natural logarithm, so log(x) in a model formula uses ln(x) and the coefficient multiplies ln of the variable in the unit… | fact | missing |  |
| The dispersion parameter of a Gamma GLM governs the spread of the response around the mean and does not enter the prediction of the mean. | fact | tagged | Model Output: “When the [[Dispersion Parameter\\|dispersion]] is estimated, standard errors are scaled by $\sqrt{\h…” |

</details>

<details><summary><code>masi-an-098</code> · answerable</summary>

Tagged pages: Statistical Software, Model Output, Parameter Estimate Tables, Poisson Regression, Categorical Predictor, p-Value

| Item | Kind | Status | Where |
|---|---|---|---|
| In R's glm, a categorical predictor is dummy-coded against a base level (by default the alphabetically first level), which has no coefficie… | fact | tagged | Statistical Software: “a categorical variable's base level is its *first* level — alphabetical unless reset (`relevel()` i…” |
| The intercept of a GLM is the linear predictor for the base level with all continuous covariates equal to zero (it is at the covariate mean… | fact | tagged | Statistical Software: “With a Poisson family and log link, the first block specifies the linear predictor in the second, w…” |
| In R glm output, the null deviance has n − 1 degrees of freedom (intercept only) and the residual deviance has n − p degrees of freedom for… | fact | tagged | Poisson Regression: “$$\hat\phi \approx \frac{D}{n - p} = \frac{1{,}840}{600} = 3.07$$” |
| R's glm drops observations with missing values in the model variables, and the summary footer reports how many were deleted, so the number … | fact | tagged | Statistical Software: “R's model functions drop rows with a missing value (the summary says how many), so check the observ…” |
| With a log link, exp(coefficient) is the multiplicative effect on the expected response relative to the base level, holding other predictor… | fact | tagged | Model Output: “With a log link, $e^{\hat{\beta}}$ is a multiplicative relativity.” |
| Test the significance of a GLM coefficient with the z value (estimate divided by standard error) and its p-value, declaring it not signific… | procedure | tagged | Parameter Estimate Tables: “\\| **z-value** or **t-value** \\| $\hat{\beta} / \text{SE}(\hat{\beta})$; test statistic for $H_0: \…” |

</details>

<details><summary><code>masi-an-099</code> · untagged</summary>

Tagged pages: Control Variable, Generalized Linear Model, Offset Variable, Rating Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| A control variable is a predictor included in a GLM to absorb its effect on the response so that the other predictors' coefficients are est… | definition | tagged | Control Variable: “A **Control Variable** is a predictor included in an insurance [[Generalized Linear Model]] to acco…” |
| Omitting a variable that affects the response and is correlated with an included predictor causes omitted-variable bias, so the included pr… | fact | tagged | Control Variable: “Omitting a relevant control variable causes **omitted variable bias**: correlated rating variables'…” |
| To handle a control variable such as accident year, fit it as a categorical predictor so its effect is estimated, then drop it when buildin… | procedure | syllabus | Predictor Variable: “A [[Control Variable\\|control variable]] is estimated so that it absorbs a real effect (a year tren…” |
| An offset is a predictor term with a coefficient fixed at 1 (a known, imposed effect on the linear predictor) rather than estimated from th… | definition | tagged | Offset Variable: “An **Offset Variable** is a predictor in a [[Generalized Linear Model]] whose coefficient is fixed …” |
| A prior weight in a GLM sets how much each observation counts in the fit (reflecting its variance or volume), but does not change the obser… | definition | elsewhere | GLM Loss Reserving: “Weights inversely proportional to the residual variance correct [[Heteroscedasticity\\|heteroscedast…” |
| Time trend in losses is handled by trending historical losses to the future policy period, not by including year as a rating factor in the … | fact | elsewhere | Loss Trend: “**Loss Trend** is the annual rate of change in loss cost over time — driven by inflation, the legal…” |

</details>

<details><summary><code>masi-an-100</code> · gap</summary>

Tagged pages: Control Variable, Poisson Regression, Offset Variable, Categorical Predictor, Frequency

| Item | Kind | Status | Where |
|---|---|---|---|
| In a Poisson GLM with log link and an exposure offset, a single categorical predictor yields fitted frequencies equal to each level's obser… | fact | missing |  |
| A relativity in a log-link GLM is the exponentiated coefficient of a non-base level, i.e. the multiplicative factor on expected frequency r… | definition | tagged | Poisson Regression: “The log link turns each coefficient into a **rating relativity**: $e^{\beta_j}$ is the multiplicati…” |
| A main-effects (no interaction) log-link model is multiplicative, and if the observed cell frequencies are exactly multiplicative across th… | fact | missing |  |
| When an omitted variable is correlated with a predictor (e.g. through a mix shift in exposure), the predictor's estimated coefficient is bi… | fact | tagged | Control Variable: “Omitting a relevant control variable causes **omitted variable bias**: correlated rating variables'…” |
| A control variable is included in a model so that other variables' effects are estimated net of it, but is not used in the rating plan itse… | definition | tagged | Control Variable: “A **Control Variable** is a predictor included in an insurance [[Generalized Linear Model]] to acco…” |
| Parsimony (fewer parameters) does not justify keeping a model that omits a variable which biases the coefficients to be used; model selecti… | fact | tagged | Control Variable: “Omitting a relevant control variable causes **omitted variable bias**: correlated rating variables'…” |

</details>

<details><summary><code>masi-an-101</code> · answerable</summary>

Tagged pages: Offset Variable, Poisson Regression, Link Function

| Item | Kind | Status | Where |
|---|---|---|---|
| An offset in a GLM is a known term added to the linear predictor with its coefficient fixed at 1, so it is not estimated from the data. | definition | tagged | Offset Variable: “An **Offset Variable** is a predictor in a [[Generalized Linear Model]] whose coefficient is fixed …” |
| Under a log link, the mean is multiplicative in its factors, so a known multiplicative factor (such as exposure or an established relativit… | fact | tagged | Offset Variable: “The offset must be on the **same scale as the linear predictor**: with a log link it is the *logged…” |
| When several known factors are carried as offsets under a log link, the total offset is the sum of the logs of the factors, equal to the lo… | procedure | tagged | Offset Variable: “The offset must be on the **same scale as the linear predictor**: with a log link it is the *logged…” |
| In a Poisson frequency GLM, exposure is included as an offset equal to the log of exposure so that the expected claim count is proportional… | fact | tagged | Offset Variable: “For claim counts $N_i \sim \text{Poi}(\mu_i)$, since $E[N_i] = \text{Exposure}_i \times \text{Frequ…” |

</details>

<details><summary><code>masi-an-102</code> · answerable</summary>

Tagged pages: Offset Variable, Poisson Regression, Deviance, Likelihood Ratio Test, Confidence Interval

| Item | Kind | Status | Where |
|---|---|---|---|
| An offset in a GLM is a predictor term whose coefficient is fixed at a known value (e.g., 1 for ln(exposure) with a log link) rather than e… | definition | tagged | Offset Variable: “An **Offset Variable** is a predictor in a [[Generalized Linear Model]] whose coefficient is fixed …” |
| A model with an offset is nested within the model that includes the same variable as an ordinary predictor, because the offset model is the… | fact | tagged | Offset Variable: “If exposure were instead entered as an ordinary covariate, its estimated coefficient need not equal…” |
| To compare nested GLMs, use the likelihood ratio test: the difference in residual (scaled) deviances is compared to a chi-square critical v… | procedure | tagged | Deviance: “**Analysis of Deviance**: for nested models, $\dfrac{D_{\text{reduced}} - D_{\text{full}}}{\phi} \a…” |
| For a Poisson GLM the dispersion parameter is fixed at 1, so the deviance equals the scaled deviance and the difference can be compared dir… | fact | tagged | Deviance: “For Poisson and binomial models $\phi = 1$ and the two coincide” |
| A Wald test for a coefficient uses z = (estimate − hypothesized value)/SE, and a confidence interval estimate ± 1.96·SE containing the hypo… | procedure | tagged | Likelihood Ratio Test: “The Wald test (coefficient over its standard error, as printed in [[Parameter Estimate Tables]]) an…” |
| The z value reported in GLM output tests whether a coefficient equals 0, so it does not address whether a coefficient equals another value … | fact | tagged | Likelihood Ratio Test: “The Wald test (coefficient over its standard error, as printed in [[Parameter Estimate Tables]]) an…” |
| Adding a parameter to a GLM never increases the residual deviance, so a lower deviance alone does not show a better model; the reduction mu… | fact | syllabus | Model Selection: “In-sample fit alone always prefers the bigger model, which is why a penalty or held-out data is nee…” |
| AIC = deviance-based fit measure plus a penalty of 2 per estimated parameter (AIC = −2·loglikelihood + 2p), so a model with one fewer param… | formula | syllabus | Model Selection: “$\hat{\ell}_M$ is model $M$'s maximized log-likelihood and $p_M$ its number of parameters. $k = 2$ …” |

</details>

<details><summary><code>masi-an-103</code> · answerable</summary>

Tagged pages: Dispersion Parameter, Quasi-Likelihood, Poisson Regression, Parameter Estimate Tables, p-Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The quasi-Poisson dispersion estimate is the Pearson chi-square statistic divided by its degrees of freedom, n minus the number of estimate… | formula | tagged | Dispersion Parameter: “$$\hat\phi = \frac{1}{n-p}\sum_{i=1}^{n}\frac{w_i\,(y_i - \hat\mu_i)^2}{V(\hat\mu_i)} \qquad \text{…” |
| Refitting a Poisson GLM as quasi-Poisson leaves the coefficient estimates unchanged because the quasi-likelihood estimating equations are t… | fact | tagged | Dispersion Parameter: “$\phi$ does **not** affect the fitted coefficients $\hat\beta$ — it scales their standard errors by…” |
| Allowing for dispersion φ multiplies the variance of each coefficient estimate by φ, so standard errors are multiplied by the square root o… | fact | tagged | Poisson Regression: “Remedies: estimate $\phi$ (quasi-Poisson, which inflates standard errors by $\sqrt{\hat\phi}$ but l…” |
| The Wald test of H0: β = 0 uses the statistic z = β̂ / SE(β̂), compared to a standard normal (or t) distribution, with a two-sided p-value … | procedure | tagged | Parameter Estimate Tables: “A GLM table such as Poisson or logistic regression reports **z-values**: Wald statistics referred t…” |

</details>

<details><summary><code>masi-an-104</code> · answerable</summary>

Tagged pages: Dispersion Parameter, Exponential Family, Variance Function, Binomial Distribution, Gamma, Tweedie Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| In a GLM with exponential-family response, Var(Y) = φ·V(μ), where φ is the dispersion parameter and V(μ) is the variance function determine… | formula | tagged | Dispersion Parameter: “The **Dispersion Parameter** $\phi$ is the scale factor in an [[Exponential Family]] variance: $\te…” |
| The dispersion parameter is estimated as the Pearson chi-square statistic divided by the residual degrees of freedom. | formula | tagged | Dispersion Parameter: “$$\hat\phi = \frac{1}{n-p}\sum_{i=1}^{n}\frac{w_i\,(y_i - \hat\mu_i)^2}{V(\hat\mu_i)} \qquad \text{…” |
| For the Poisson and binomial distributions the dispersion parameter is fixed at φ = 1, so an estimated φ well above 1 indicates overdispers… | fact | tagged | Dispersion Parameter: “- For the **Normal** response $\phi = \sigma^2$; for **Poisson** and **binomial** the theory fixes …” |
| For the Normal, Gamma and Tweedie distributions the dispersion parameter is a free parameter estimated from the data, so any positive estim… | fact | tagged | Tweedie Distribution: “- The [[Dispersion Parameter]] $\phi$ is estimated from the data.” |
| An estimated dispersion close to 1 (within sampling error, which shrinks as degrees of freedom grow) is consistent with a correctly specifi… | fact | tagged | Dispersion Parameter: “$\hat\phi > 1$ in a Poisson or binomial model is **overdispersion**: more spread than the distribut…” |
| Ignoring overdispersion understates standard errors by about a factor of √φ̂; a quasi-likelihood (e.g., quasi-binomial/quasi-Poisson) fit s… | fact | linked | Poisson Regression: “estimate $\phi$ (quasi-Poisson, which inflates standard errors by $\sqrt{\hat\phi}$ but leaves $\ha…” |

</details>

<details><summary><code>masi-an-105</code> · answerable</summary>

Tagged pages: Predictor Variable, Multicollinearity, Generalized Linear Model, Severity

| Item | Kind | Status | Where |
|---|---|---|---|
| In a multivariate GLM, each coefficient measures the effect of its predictor on the response while holding the other predictors fixed. | fact | tagged | Predictor Variable: “$\beta_j$ is the effect of $x_j$ **holding the other predictors fixed**; with a log link, $e^{\beta…” |
| When predictors are correlated, a one-way (univariate) relationship with the response can differ in size or sign from the multivariate coef… | fact | tagged | Generalized Linear Model: “because it estimates every rating variable *simultaneously* and so reports each one net of the othe…” |
| Collinearity among predictors inflates the variance of coefficient estimates (variance inflation factor), making them unstable, but it does… | fact | tagged | Predictor Variable: “**[[Multicollinearity]] among predictors** — vehicle age with vehicle value, building age with cons…” |
| GLMs do not assume the predictors (independent variables) are statistically independent of one another; 'independent' only denotes their ro… | fact | tagged | Predictor Variable: “"Independent" variable does not mean statistically independent of the other predictors. In insuranc…” |

</details>

<details><summary><code>masi-an-106</code> · answerable</summary>

Tagged pages: Predictor Variable, Interaction, Categorical Predictor, Variable Transformation, Poisson Regression, Link Function

| Item | Kind | Status | Where |
|---|---|---|---|
| In a GLM with a log link, the expected response is the exponential of the linear predictor: mu = exp(beta_0 + beta_1 x_1 + ... + beta_p x_p… | formula | tagged | Link Function: “\\| Log \\| $\ln\mu$ \\| $e^\eta$ \\| Poisson (counts), Gamma (severity) \\|” |
| A categorical predictor with k levels is coded with k-1 indicator (dummy) variables relative to a base level; the indicator equals 1 for th… | definition | tagged | Categorical Predictor: “A categorical predictor with $k$ levels is represented using $k-1$ **indicator (dummy) variables**;…” |
| An interaction term enters the linear predictor as its coefficient times the product of the interacting predictors' values, so it applies o… | procedure | tagged | Interaction: “$\beta_3$ is the interaction coefficient: it measures how much the effect of $x_1$ on $\eta$ change…” |
| A predictor entered through a transformation (such as the natural log) or as a single numeric term is plugged into the linear predictor in … | fact | tagged | Variable Transformation: “A **Variable Transformation** replaces a predictor $x$ with a function of it, $h(x)$, so that its r…” |
| In a Poisson GLM, the fitted mean is the expected claim count (frequency) per unit of exposure, so the predicted mean per exposure unit is … | fact | tagged | Poisson Regression: “the model then predicts a *rate* per unit of exposure” |

</details>

<details><summary><code>masi-an-107</code> · answerable</summary>

Tagged pages: Regression Through the Origin, Ordinary Least Squares, Linear Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| Least-squares estimation chooses the parameter values that minimize the sum of squared residuals, the sum of (y_i minus fitted value)^2. | definition | tagged | Ordinary Least Squares: “$$\hat{\boldsymbol\beta} = \arg\min_{\boldsymbol\beta} \sum_{i=1}^{n} \left(y_i - \mathbf{x}_i^\top…” |
| For a regression through the origin (no intercept) y_i = beta x_i + e_i, the least-squares estimate is beta-hat = sum(x_i y_i) / sum(x_i^2). | formula | tagged | Regression Through the Origin: “$$\hat\beta = \frac{\sum_{i=1}^{n} x_i y_i}{\sum_{i=1}^{n} x_i^2}$$” |

</details>

<details><summary><code>masi-an-108</code> · answerable</summary>

Tagged pages: Regression Through the Origin, R-Squared, Linear Regression, Model Output, Model Selection

| Item | Kind | Status | Where |
|---|---|---|---|
| Test whether a regression coefficient is significantly different from zero using the t statistic (estimate divided by standard error) with … | procedure | tagged | Regression Through the Origin (collapsed): “For the intercept, $t = 2.75/1.95 = 1.41$ on $5 - 2 = 3$ df, below the two-sided 5% value $3.182$. …” |
| The residual standard error is the square root of SSE divided by its degrees of freedom (n minus the number of estimated parameters), an es… | definition | tagged | Linear Regression: “Fit is summarized by [[R-Squared]] $= 1 - \text{RSS}/\text{SS}_{\text{Tot}}$, with $\hat\sigma^2 = …” |
| Residual standard errors of nested models are comparable because each estimates the same sigma, and a lower one favors that model since it … | fact | tagged | Regression Through the Origin (collapsed): “The residual standard error is $\sqrt{24.93/4} = 2.50$ through the origin against $\sqrt{23.60/3} =…” |
| Adding a parameter to a regression can never increase the residual sum of squares, so a smaller SSE for the larger model does not by itself… | fact | tagged | R-Squared: “$R^2$ **always increases** (or stays the same) when predictors are added, even if they are irreleva…” |
| In regression through the origin, R-squared is computed as 1 - SSE/sum of y squared (variation about zero rather than about the mean), so i… | fact | tagged | Regression Through the Origin: “Some report $\sum\hat{y}_i^2 / \sum y_i^2$, the share of variation *about zero*: it is at least as …” |
| In regression through the origin, residuals need not sum to zero (only the sum of x times residual is zero), and the slope estimator remain… | fact | tagged | Regression Through the Origin: “only $\sum x_i e_i = 0$ holds, so the residuals $e_i = y_i - \hat\beta x_i$ usually have a nonzero …” |
| The residual standard error can rise or fall when a parameter is dropped, because dropping it raises SSE but also increases the degrees of … | fact | tagged | Regression Through the Origin (collapsed): “The residual standard error is $\sqrt{24.93/4} = 2.50$ through the origin against $\sqrt{23.60/3} =…” |

</details>

<details><summary><code>masi-an-109</code> · answerable</summary>

Tagged pages: Analysis of Covariance, Interaction, Categorical Predictor, Linear Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| In an analysis of covariance model, a categorical factor's indicator (dummy) variables combined with a numeric covariate and a common slope… | definition | tagged | Analysis of Covariance: “**Parallel lines:** in the common-slope model the gap between level $i$ and level 1 is $\alpha_i$ a…” |
| Adding a factor-by-covariate interaction term gives each factor level its own slope, so the difference between levels varies with the covar… | fact | tagged | Analysis of Covariance: “The second model adds the factor-by-covariate [[Interaction]], so the gap $\alpha_i + \gamma_i x$ c…” |
| Adding a term that enters the model identically for all factor levels (such as a squared covariate term or an additional covariate with a c… | fact | syllabus | Generalized Additive Model (collapsed): “Additivity is what makes this clean. With vehicle age and territory held fixed, their terms cancel,…” |
| With a categorical factor, dropping the intercept and including indicators for all levels is a reparameterization that gives the same fitte… | fact | linked | Regression Through the Origin: “**A factor is different:** dropping the intercept while keeping indicators for *all* levels of a [[…” |
| Coding a categorical factor as a single numeric variable imposes a linear effect across the arbitrarily ordered levels and still enters add… | fact | syllabus | Data Types (collapsed): “**A number is not always numeric:** Territory codes, class codes and ZIP codes are labels. Averagin…” |

</details>

<details><summary><code>masi-an-110</code> · answerable</summary>

Tagged pages: Analysis of Covariance, F-Distribution, Residual Sum of Squares, ANOVA, Interaction

| Item | Kind | Status | Where |
|---|---|---|---|
| The partial F statistic for comparing a reduced nested linear model to a full model is F = [(RSS_reduced − RSS_full)/(difference in residua… | formula | tagged | F-Distribution: “$\dfrac{(\text{RSS}_0 - \text{RSS})/q}{\text{RSS}/(n - p - 1)} \sim F(q,\ n - p - 1)$” |
| In an ANCOVA with a covariate and a categorical factor, parallel regression lines (equal slopes) are tested by comparing the common-slope m… | fact | tagged | Analysis of Covariance: “Test parallelism ($\gamma_2 = \cdots = \gamma_k = 0$) on $(k - 1,\ n - 2k)$ df first” |
| To test for a group (network) effect after adjusting for the covariate, compare the covariate-only model with the covariate-plus-group comm… | procedure | tagged | Analysis of Covariance (collapsed): “Compare the common-slope model with the $x$-only model, using the common-slope model's residual mea…” |
| In the sequential ANCOVA procedure, test parallelism first; if it is not rejected, keep the common-slope model and test the group effect wi… | procedure | tagged | Analysis of Covariance: “Test parallelism ($\gamma_2 = \cdots = \gamma_k = 0$) on $(k - 1,\ n - 2k)$ df first; if it holds, …” |
| Reject the null hypothesis at level α when the computed F statistic exceeds the upper-α critical value of the F distribution with the corre… | fact | tagged | ANOVA: “$H_0$: all group means are equal; reject if $F > F_{\alpha, k-1, N-k}$” |

</details>

<details><summary><code>masi-an-121</code> · answerable</summary>

Tagged pages: Marginal Model Plot, Generalized Linear Model

| Item | Kind | Status | Where |
|---|---|---|---|
| A marginal model plot puts the response on the vertical axis and a predictor (or the fitted values) on the horizontal axis, overlaying a sm… | definition | tagged | Marginal Model Plot: “A **Marginal Model Plot** is a regression diagnostic that overlays a smooth curve fit directly to t…” |
| In a marginal model plot, close agreement between the data smooth and the model smooth indicates the model captures the relationship betwee… | fact | syllabus | Model Fit: “[[Marginal Model Plot\\|Marginal model plots]] compare a smooth of the data with a smooth of the fit…” |
| A residual plot graphs residuals against a predictor or fitted values, and a patternless band around zero suggests the mean structure is ad… | definition | linked | Residual Plot: “\\| Random scatter around zero \\| Model is adequate \\|” |
| An added variable (partial regression) plot graphs the response adjusted for the other predictors against the predictor adjusted for the ot… | definition | syllabus | Added Variable Plot: “$$\text{Plot } e_Y \text{ vs. } e_{x_j} \text{; the slope equals } \hat{\beta}_j \text{ from the fu…” |
| A QQ plot graphs ordered residuals against quantiles of the assumed distribution, and an approximately straight line indicates the distribu… | definition | syllabus | Model Fit: “A [[QQ Plot]] of deviance residuals from a continuous response should be close to a straight line; …” |
| A partial residual (component plus residual) plot graphs a predictor's fitted component plus the residuals against that predictor, and is u… | definition | syllabus | Added Variable Plot: “A partial residual (component + residual) plot is the tool for choosing a transformation” |

</details>

<details><summary><code>masi-an-122</code> · gap</summary>

Tagged pages: Marginal Model Plot, Model Structure, Model Fit

| Item | Kind | Status | Where |
|---|---|---|---|
| A marginal model plot overlays a smooth of the observed response (data smooth) and a smooth of the fitted values (model smooth) against a s… | definition | tagged | Marginal Model Plot: “A **Marginal Model Plot** is a regression diagnostic that overlays a smooth curve fit directly to t…” |
| Systematic separation between the data smooth and model smooth in a marginal model plot against a predictor indicates a misspecified functi… | fact | tagged | Marginal Model Plot: “Close agreement between the two smooths across the range of $x$ indicates the model adequately capt…” |
| A continuous predictor entered as a single linear term in a GLM with a log link implies a constant proportional rate of change, so it canno… | fact | elsewhere | Variable Transformation (collapsed): “A linear term forces the effect to move in one direction, so it cannot capture a **U-shape**; it wi…” |
| When a continuous predictor shows a nonlinear effect, remedy the misfit by replacing the linear term with a banded (categorized), piecewise… | procedure | linked | Model Diagnostics: “**Mean structure**: vehicle age enters linearly but its effect is curved. Band it, or add a quadrat…” |
| The data smooth in a marginal model plot is computed only from observed responses, so changing the model's predictors changes only the mode… | fact | tagged | Marginal Model Plot: “A **Marginal Model Plot** is a regression diagnostic that overlays a smooth curve fit directly to t…” |
| A marginal model plot against the linear predictor summarizes fit averaged over all predictors, so errors in individual terms can cancel an… | fact | missing |  |

</details>

<details><summary><code>masi-an-123</code> · answerable</summary>

Tagged pages: QQ Plot, Order Statistics, Normal Distribution, Percentile

| Item | Kind | Status | Where |
|---|---|---|---|
| A normal QQ plot graphs the ordered (sorted) residuals against theoretical standard normal quantiles, Φ^{-1}(p_i), where the i-th smallest … | definition | tagged | QQ Plot: “Plot the $i$-th order statistic $x_{(i)}$ on the vertical axis against the theoretical quantile $F^…” |
| The plotting position for the i-th smallest of n ordered observations in a QQ plot is p_i = i/(n+1) (other conventions such as (i-0.5)/n ex… | formula | tagged | QQ Plot: “Plot the $i$-th order statistic $x_{(i)}$ on the vertical axis against the theoretical quantile $F^…” |
| The horizontal coordinate is found by evaluating the inverse standard normal CDF at p_i, i.e. looking up the z-value whose lower-tail proba… | procedure | tagged | Normal Distribution: “Read the standard normal table in reverse: if $P(X \leq x) = p$, then $(x - \mu)/\sigma = z_p$, whe…” |
| If residuals are approximately normal, QQ plot points fall near a straight reference line; points deviating below the line in the lower tai… | fact | tagged | QQ Plot: “Low end below the line, high end above it \\| Data has heavier (longer) tails — fat-tailed data” |

</details>

<details><summary><code>masi-an-124</code> · answerable</summary>

Tagged pages: QQ Plot, Deviance Residual, Model Fit

| Item | Kind | Status | Where |
|---|---|---|---|
| A QQ plot of residuals plots sample quantiles (vertical axis) against theoretical quantiles of the assumed distribution (horizontal axis) w… | definition | tagged | QQ Plot: “Plot the $i$-th order statistic $x_{(i)}$ on the vertical axis against the theoretical quantile $F^…” |
| Deviance residuals from a correctly specified model should follow the assumed distribution, so a QQ plot that tracks the reference line wit… | fact | tagged | Model Fit: “A [[QQ Plot]] of deviance residuals from a continuous response should be close to a straight line; …” |
| In a QQ plot, if the low end falls below the line and the high end rises above it (S-shaped), both tails are heavier than the assumed distr… | fact | tagged | QQ Plot: “\\| Low end above the line, high end below it \\| Data has lighter (shorter) tails than the theoretic…” |
| In a QQ plot, if only the upper end rises above the line, the right tail is heavier than assumed (more right-skewed); if only the lower end… | fact | tagged | QQ Plot: “Points above the line in the upper tail \\| Right tail is heavier than theoretical” |
| When residuals are more right-skewed than a gamma severity model captures, a distribution with a heavier right tail such as the inverse Gau… | fact | tagged | Model Fit (collapsed): “A more skewed error distribution, such as the **inverse Gaussian**, is the natural next candidate: …” |

</details>

<details><summary><code>masi-an-125</code> · answerable</summary>

Tagged pages: Added Variable Plot, Linear Regression, Residual

| Item | Kind | Status | Where |
|---|---|---|---|
| To build an added variable plot for a predictor, regress the response on the other predictors and keep the residuals, regress the predictor… | procedure | tagged | Added Variable Plot: “$$e_Y = Y - \hat{Y}^{(-j)}, \qquad e_{x_j} = x_j - \hat{x}_j^{(-j)}$$” |
| Residuals from a least squares regression that includes an intercept average zero, so a line fitted through a plot of two such residual set… | fact | tagged | Added Variable Plot: “The least squares line through the plot has intercept $0$ and slope $\hat{\beta}_j$, and its residu…” |
| By the Frisch–Waugh result, the least squares slope in an added variable plot for a predictor equals that predictor's coefficient in the fu… | fact | tagged | Added Variable Plot: “The least squares line through the plot has intercept $0$ and slope $\hat{\beta}_j$, and its residu…” |
| The coefficient from a simple regression on one predictor alone is a marginal effect that includes what the predictor shares with other pre… | fact | tagged | Added Variable Plot: “Unlike a simple scatter plot of $Y$ against $x_j$, the added variable plot isolates $x_j$'s **parti…” |
| A partial residual plot, not an added variable plot, is the tool for judging the functional form or transformation a predictor needs. | fact | tagged | Added Variable Plot: “Curvature can flag non-linearity in $x_j$, but the plot is a weak guide to the functional form: its…” |
| An unusual value on the horizontal axis of an added variable plot (a predictor value unusual given the other predictors) indicates high lev… | fact | tagged | Added Variable Plot: “Points far out on the $e_{x_j}$ axis are high-leverage observations for $x_j$; points far from the …” |

</details>

<details><summary><code>masi-an-126</code> · answerable</summary>

Tagged pages: Added Variable Plot, Linear Regression, Ordinary Least Squares

| Item | Kind | Status | Where |
|---|---|---|---|
| An added variable plot for a predictor plots the residuals from regressing the response on the other predictors against the residuals from … | definition | tagged | Added Variable Plot: “$\hat{Y}^{(-j)}$ and $\hat{x}_j^{(-j)}$ are the fitted values from regressing $Y$, and $x_j$ respec…” |
| The least squares slope of the line through an added variable plot equals the coefficient of that predictor in the full multiple regression… | fact | tagged | Added Variable Plot: “The least squares line through the plot has intercept $0$ and slope $\hat{\beta}_j$, and its residu…” |
| In a simple linear regression through the origin or with mean-zero variables, the least squares slope is the sum of cross-products of x and… | formula | tagged | Ordinary Least Squares: “**Simple regression**: $\hat\beta_1 = S_{xy}/S_{xx}$ and $\hat\beta_0 = \bar{y} - \hat\beta_1\bar{x…” |

</details>

<details><summary><code>masi-an-127</code> · answerable</summary>

Tagged pages: Model Fit, Holdout Sample

| Item | Kind | Status | Where |
|---|---|---|---|
| A quantile (e.g. quintile) plot for a GLM holdout test sorts holdout policies by predicted value, groups them into equal-exposure bins, and… | definition | linked | Quantile Plot: “A **quantile plot** (or lift chart by predicted quantile) sorts a held-out dataset by predicted los…” |
| The actual-to-predicted ratio for a group is total actual losses divided by total predicted losses; a ratio near 1 indicates good fit. | definition | tagged | Model Fit (collapsed): “Overall the ratio is $\$4{,}048{,}000 / \$4{,}000{,}000 = 1.012$, so the model is well balanced in …” |
| Model fit in a group is judged by how far its actual-to-predicted ratio deviates from 1 (relative error), not by the dollar size of the gap… | fact | tagged | Model Fit: “The **12+ band is under-predicted by 15%**, a sign that the fitted vehicle-age curve has the wrong …” |

</details>

<details><summary><code>masi-an-128</code> · gap</summary>

Tagged pages: Model Fit, Holdout Sample, Lift, Overfitting

| Item | Kind | Status | Where |
|---|---|---|---|
| To run a quantile (decile/quintile) plot on a holdout sample, sort the holdout records by the model's predicted value, split them into equa… | procedure | linked | Quantile Plot: “A **quantile plot** (or lift chart by predicted quantile) sorts a held-out dataset by predicted los…” |
| A better model has actual-to-predicted ratios close to 1 in every quantile, not just overall, because an overall ratio near 1 only shows to… | fact | tagged | Model Fit: “The **12+ band is under-predicted by 15%**, a sign that the fitted vehicle-age curve has the wrong …” |
| A better model separates risks more: the actual results of its highest-predicted group differ more from those of its lowest-predicted group… | fact | tagged | Lift: “A large lift means the model can maximally distinguish the best and worst risks.” |
| Actual-to-predicted ratios that fall from above 1 in low-prediction groups to below 1 in high-prediction groups mean the model's relativiti… | fact | missing |  |
| Using a model with too-steep relativities overcharges the risks it rates highest and undercharges those it rates lowest, even when total pr… | fact | linked | Model Benchmarking: “A model that beats the current plan finds the risks the plan overcharges, which competitors can tak…” |

</details>

<details><summary><code>masi-an-129</code> · answerable</summary>

Tagged pages: Exploratory Data Analysis, Histogram, Box Plot, Scatter Plot, Correlation, Univariate Plot, Categorical Predictor

| Item | Kind | Status | Where |
|---|---|---|---|
| A scatter plot of the response against a continuous predictor shows whether the relationship is linear or curved, and its direction and spr… | fact | tagged | Scatter Plot: “What to read off it: **direction** (up or down), **form** (straight or curved), **strength** (tight…” |
| A bar chart of exposure by level is the univariate display for a categorical variable and reveals levels with little data that cannot suppo… | fact | tagged | Univariate Plot: “Plot exposures too, not just losses — a univariate plot of exposure by level shows where the data i…” |
| A correlation matrix gives pairwise correlations among continuous predictors and is used to screen for strongly related (collinear) predict… | fact | tagged | Exploratory Data Analysis: “\\| **Correlation matrix** \\| Identify linear relationships among predictors \\|” |
| A histogram shows the shape of a single variable's distribution, and for a heavily right-skewed positive variable taking logs first spreads… | fact | tagged | Exploratory Data Analysis: “For **continuous predictors**: histograms and scatter plots reveal skewness, outliers, and non-line…” |
| Side-by-side box plots of the response by level of a categorical variable compare the response's median, spread and outliers across levels,… | fact | tagged | Box Plot: “Box plots are read **side by side**: one box per level of a [[Categorical Predictor]] shows whether…” |

</details>

<details><summary><code>masi-an-130</code> · answerable</summary>

Tagged pages: Exploratory Data Analysis, Gamma, Generalized Linear Model, Variance Function, Box Plot, Histogram

| Item | Kind | Status | Where |
|---|---|---|---|
| Gamma and inverse Gaussian distributions are continuous with strictly positive support and right skew, making them suitable for claim sever… | fact | syllabus | Response Variable: “**Claim severity** — positive and right-skewed, with standard deviation roughly proportional to the…” |
| Variance functions of GLM distributions: normal V(μ)=1 (constant), Poisson V(μ)=μ, gamma V(μ)=μ², inverse Gaussian V(μ)=μ³, Tweedie V(μ)=μ^… | fact | tagged | Variance Function: “normal: $1$ (constant variance)” |
| If the standard deviation (spread) is proportional to the mean, then the variance is proportional to the mean squared, which matches the ga… | fact | tagged | Variance Function: “[[Gamma\\|gamma]]: $\mu^2$ (constant coefficient of variation)” |
| Use exploratory plots to choose a GLM distribution: a histogram shows range and skew, while box plots (spread vs median) and scatter plots … | procedure | tagged | Variance Function: “Plot group variances against group means on log–log axes. The slope estimates $p$ in $V(\mu) = \mu^…” |
| A Tweedie distribution with power between 1 and 2 is a compound Poisson-gamma with a point mass at zero, used for pure premium (aggregate l… | fact | linked | Tweedie Distribution: “For $1 < p < 2$ it is a compound Poisson–Gamma distribution: a Poisson number of Gamma-sized claims…” |
| A log link keeps fitted means positive and makes the effects of predictors multiplicative. | fact | linked | Link Function: “The **log link** is standard for insurance severity and frequency models because it guarantees posi…” |

</details>

<details><summary><code>masi-an-131</code> · answerable</summary>

Tagged pages: Box Plot, Median, Outlier

| Item | Kind | Status | Where |
|---|---|---|---|
| The interquartile range (IQR) is the third quartile minus the first quartile, Q3 − Q1, measuring the spread of the middle half of the data. | definition | tagged | Box Plot: “$$\text{IQR} = Q_3 - Q_1$$” |
| To find quartiles by the median-of-halves method with odd n, locate the overall median, exclude it, and take Q1 and Q3 as the medians of th… | procedure | tagged | Box Plot: “this page takes the medians of the lower and upper halves (the median itself left out when $n$ is o…” |
| The box plot outlier fences are Q1 − 1.5·IQR (lower) and Q3 + 1.5·IQR (upper); observations beyond a fence are outliers. | formula | tagged | Box Plot: “$$\text{potential outlier if } x < Q_1 - 1.5\,\text{IQR} \ \text{ or } \ x > Q_3 + 1.5\,\text{IQR}$$” |
| A box plot whisker extends to the most extreme observation that is not an outlier (i.e., lies within the fences), so it ends at a data valu… | fact | tagged | Box Plot: “the whiskers reach the most extreme observations that are not flagged as outliers” |

</details>

<details><summary><code>masi-an-132</code> · answerable</summary>

Tagged pages: Box Plot, Categorical Predictor, Exploratory Data Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| A box plot shows the median and the quartiles Q1 and Q3 (the box holds the middle half of the data), whiskers extending to the most extreme… | definition | tagged | Box Plot: “The box spans the middle half of the data and the whiskers reach the most extreme observations that…” |
| Compare side-by-side box plots across categories by looking at the location (median and box position) of each class; classes with nearly id… | procedure | tagged | Box Plot (collapsed): “The first two classes are not distinguished by the data and could be **grouped into one level**, sa…” |
| A level of a categorical predictor with few observations has an imprecisely estimated coefficient (large standard error), so an apparent di… | fact | syllabus | Univariate Plot: “Plot exposures too, not just losses — a univariate plot of exposure by level shows where the data i…” |
| Skewness shows as asymmetry within a class (e.g., an upper whisker and upper box half longer than the lower), not as short whiskers; shorte… | fact | tagged | Box Plot: “A median sitting left of centre with a long right whisker signals **right skew** — the usual shape …” |
| A few outliers are individual extreme observations and do not indicate a class's typical severity, so they are weak evidence for a differen… | fact | tagged | Box Plot: “Because it is built from [[Order Statistics]], it is resistant to extreme values: one enormous clai…” |
| For a gamma-type severity response the standard deviation grows with the mean, so classes with larger medians show greater spread; differin… | fact | tagged | Box Plot: “The high outliers and the widening spread as the median rises indicate variance growing with the me…” |

</details>

<details><summary><code>masi-an-133</code> · gap</summary>

Tagged pages: Univariate Plot, Data Types, Box Plot, Histogram

| Item | Kind | Status | Where |
|---|---|---|---|
| A discrete random variable takes only a countable set of distinct values (for example, claim counts of 0, 1, 2, ...), so its distribution i… | definition | prerequisite | Discrete Random Variable: “A **Discrete Random Variable** $X$ is a [[Random Variable]] whose possible values form a finite or …” |
| A bar chart with one bar per value (a frequency bar chart) is the appropriate univariate display for showing how often each value of a disc… | fact | tagged | Univariate Plot: “\\| [[Histogram]] \\| Binned counts \\| Overall shape, multimodality \\|” |
| A histogram groups a continuous variable into bins, and for a discrete variable bins that do not align with the integer values produce empt… | fact | tagged | Histogram: “Applied to a discrete count variable it becomes a bar chart of the [[Probability Mass Function (PMF…” |
| A box plot shows the median, the quartiles Q1 and Q3 as the box, and flags as outliers points beyond 1.5 times the IQR (Q3 minus Q1) from t… | definition | tagged | Box Plot: “A **Box Plot** (box-and-whisker plot) is an [[Exploratory Data Analysis]] display that summarizes a…” |
| When most observations are zero, the quartiles and median are all zero, so the box plot collapses to a line with IQR 0 and every nonzero va… | fact | missing |  |
| A QQ plot plots the sample quantiles against the quantiles of a reference distribution to assess whether the data follow that distribution;… | definition | linked | QQ Plot: “A **QQ Plot** (Quantile-Quantile Plot) is a graphical diagnostic that compares the **quantiles** of…” |
| A scatter plot of a variable against an arbitrary index such as a policy number shows nothing about the variable's distribution, because th… | fact | missing |  |

</details>

<details><summary><code>masi-an-134</code> · answerable</summary>

Tagged pages: Univariate Plot, Histogram, Box Plot, Exploratory Data Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| A spike of records at one round or extreme value (such as 99, 999, or 0) that is out of line with the rest of a smooth distribution is a ty… | fact | linked | Data Issues: “*Missing values in disguise:* an impossible zero, such as a zero dimension, is often a missing valu…” |
| A histogram of a predictor shows only the predictor's own distribution, not the shape of its relationship with the response, so linearity o… | fact | linked | Scatter Plot: “It is the standard first look at the relationship between a continuous predictor and the response, …” |
| Box plot fences lie at Q1 − 1.5×IQR and Q3 + 1.5×IQR, where IQR = Q3 − Q1, and observations outside the fences are plotted as outliers. | formula | tagged | Box Plot: “$$\text{potential outlier if } x < Q_1 - 1.5\,\text{IQR} \ \text{ or } \ x > Q_3 + 1.5\,\text{IQR}$$” |
| A box plot shows where outliers lie but not how many observations share a value, since repeated identical values are drawn as a single poin… | fact | tagged | Univariate Plot (collapsed): “The five numbers behind a box plot ($\min, Q_1, Q_2, Q_3, \max$) can be identical for a symmetric u…” |

</details>

<details><summary><code>masi-an-135</code> · answerable</summary>

Tagged pages: Histogram, Probability Density Function (PDF)

| Item | Kind | Status | Where |
|---|---|---|---|
| In a histogram drawn on the density scale, the area of a bar (height × bin width) equals the proportion of observations in that bin, and th… | fact | tagged | Histogram: “On the **density scale** the bars have total area $1$, so the histogram can be overlaid directly on…” |
| To count observations in a range spanning several bins of a density-scale histogram, sum the areas (height × width) of the bins in the rang… | procedure | tagged | Histogram: “$$\text{bar height} = \frac{n_j}{n \cdot w} \quad \text{(density scale)}$$” |

</details>

<details><summary><code>masi-an-136</code> · answerable</summary>

Tagged pages: Histogram, Tweedie Distribution, Generalized Linear Model, Response Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| A Tweedie distribution with power p between 1 and 2 is a compound Poisson–gamma (a Poisson number of gamma-sized claims), giving a point ma… | fact | tagged | Tweedie Distribution: “For $1 < p < 2$ it is a compound Poisson–Gamma distribution: a Poisson number of Gamma-sized claims…” |
| The Tweedie distribution with power between 1 and 2 is the standard single-GLM choice for modeling pure premium, since pure premium has man… | fact | tagged | Tweedie Distribution: “Fitted with a **log link**, it models pure premium in one step instead of fitting [[Poisson Regress…” |
| The gamma and inverse Gaussian distributions are defined only on positive values and have no probability mass at zero, so they suit positiv… | fact | tagged | Tweedie Distribution: “The Gamma density is defined only for $y > 0$, but most policies have pure premium exactly $0$ — th…” |
| The Poisson distribution is a distribution for non-negative integer counts, so it is suited to claim frequency rather than continuous dolla… | fact | tagged | Response Variable: “**Claim counts** — Poisson ($V(\mu) = \mu$), or [[Negative Binomial Distribution\\|negative binomial…” |
| A normal response is symmetric and continuous over all real values (including negatives), so it cannot represent a spike at zero together w… | fact | tagged | Response Variable: “**Continuous, roughly symmetric, constant variance** — Normal with the identity link: ordinary [[Li…” |
| A distribution that is roughly symmetric on the log scale (lognormal-like) is strongly right-skewed on the original scale. | fact | tagged | Histogram: “Taking $\log$ of a positive skewed variable before plotting usually turns an uninformative spike-an…” |

</details>

<details><summary><code>masi-an-137</code> · answerable</summary>

Tagged pages: Scatter Plot, Correlation, Model Structure

| Item | Kind | Status | Where |
|---|---|---|---|
| The sample correlation coefficient measures only the strength and direction of linear association, so a strong non-linear relationship can … | fact | tagged | Scatter Plot: “Strength in the *linear* direction is summarized by the [[Correlation]] coefficient $r$ — but $r$ n…” |
| Zero or near-zero correlation does not imply independence; variables can be strongly dependent (even one a function of the other) while unc… | fact | tagged | Correlation: “Zero correlation does **not** in general imply [[Independent Random Variables\\|independence]]: with…” |
| \|r\| is close to 1 only when points lie close to a straight line; a tight pattern around a curve does not make \|r\| large. | fact | tagged | Correlation: “$\rho = 1$ is a perfect positive linear relationship, $\rho = -1$ a perfect negative one, and $\rho…” |
| When a scatter plot shows a strong curved relationship between a predictor and the response, include the predictor in the model with a non-… | procedure | tagged | Scatter Plot: “Age is clearly predictive; it just needs the right structure — band it into a [[Categorical Predict…” |

</details>

<details><summary><code>masi-an-138</code> · gap</summary>

Tagged pages: Scatter Plot, Heteroscedasticity, Model Structure, Categorical Predictor, Outlier

| Item | Kind | Status | Where |
|---|---|---|---|
| A fan or wedge pattern in a plot of response against a predictor, with a linear centre and spread widening as the mean rises, indicates non… | fact | tagged | Scatter Plot: “a fan that widens to the right says the variance grows with the mean, which is an argument for a [[…” |
| A curved relationship between the response and a predictor, with a bending centre and constant spread, indicates that a transformation of t… | fact | tagged | Scatter Plot: “Systematic curvature says the predictor needs a transformation ($\ln x$, $x^2$, or banding) in the …” |
| Two parallel bands of points with the same slope but different levels indicate a missing categorical variable, which is added as a categori… | fact | missing |  |
| A shapeless cloud with no trend in the centre or spread of the response across the predictor indicates no association between the response … | fact | missing |  |
| A high-leverage point is an observation with an extreme predictor value far from the others, which can pull the fitted line toward itself a… | definition | tagged | Scatter Plot: “A point far out in $x$ has **high leverage** — on its own it can bend the fitted line, so it deserv…” |
| A high-leverage point should be investigated (for data error or a different kind of risk) before being allowed to drive the model fit. | procedure | tagged | Outlier: “The first question to ask about one is always *why*: an outlier is either an **error** to be correc…” |

</details>

<details><summary><code>masi-an-139</code> · answerable</summary>

Tagged pages: Correlation, Scatter Plot, Covariance

| Item | Kind | Status | Where |
|---|---|---|---|
| The sample correlation coefficient is r = S_xy / sqrt(S_xx * S_yy), where S_xy = Σ(x−x̄)(y−ȳ), S_xx = Σ(x−x̄)², and S_yy = Σ(y−ȳ)². | formula | tagged | Correlation: “$$r = \frac{\sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum_{i=1}^n (x_i - \bar{x})^2}\,\sq…” |
| The sample mean is the sum of the observations divided by their number, and deviations from the mean are used to compute the sums of square… | definition | linked | Multicollinearity: “$S_{jj} = \sum_{i=1}^{n} (x_{ij} - \bar{x}_j)^2$ is the centred sum of squares of predictor $x_j$” |

</details>

<details><summary><code>masi-an-140</code> · gap</summary>

Tagged pages: Correlation, Scatter Plot, Outlier, R-Squared

| Item | Kind | Status | Where |
|---|---|---|---|
| A high-leverage point is an observation whose predictor value is far from the other predictor values; it can dominate the fitted line and t… | fact | tagged | Scatter Plot: “A point far out in $x$ has **high leverage** — on its own it can bend the fitted line, so it deserv…” |
| A high-leverage point pulls the least squares line toward itself, so its residual from the fitted line can be small even though it is far f… | fact | tagged | Outlier: “A high-leverage point can be influential without having a large residual, because it pulls the fit …” |
| The sample correlation coefficient measures only the strength of linear association over the observed data and can be driven by a single po… | fact | tagged | Correlation: “**Correlation** $\rho(X, Y)$ measures the strength and direction of the linear relationship between…” |
| R-squared (the square of r in simple linear regression) is a single summary of the proportion of variation explained over the whole data se… | fact | tagged | R-Squared: “**R-Squared** ($R^2$), also called the **coefficient of determination**, measures the proportion of…” |
| Correlation or regression association does not imply causation. | fact | missing |  |
| Conclusions from a regression should not be extrapolated to predictor ranges where there are no observations, because the data cannot show … | fact | linked | Regression Through the Origin: “Data far from the origin say nothing about whether the line really runs through it.” |
| Assess a regression or correlation by examining the data points (e.g., recomputing the correlation or slope with a suspect point excluded) … | procedure | tagged | Outlier: “A point is **influential** when removing it would change the fitted coefficients materially.” |

</details>

<details><summary><code>masi-an-141</code> · answerable</summary>

Tagged pages: High-Dimensional Data, Regularization, Cross-Validation, AIC, R-Squared

| Item | Kind | Status | Where |
|---|---|---|---|
| When the number of predictors p is at least the number of observations n, least squares can fit the training data exactly (RSS = 0, R^2 = 1… | fact | tagged | High-Dimensional Data: “Once $p \ge n$, least squares and other classical methods fit the training data perfectly whether o…” |
| Training-set measures such as RSS and R^2 always improve (or do not worsen) as predictors are added, so they are unreliable for assessing m… | fact | tagged | R-Squared: “$R^2$ **always increases** (or stays the same) when predictors are added, even if they are irreleva…” |
| In high-dimensional settings (p > n), less flexible methods such as the lasso, ridge regression, or forward stepwise selection are preferre… | fact | tagged | High-Dimensional Data: “Less flexible fitting methods: forward stepwise selection ([[Variable Selection]]), ridge regressio…” |
| Cross-validation can be used to select the lasso tuning parameter (penalty) and to estimate the test (prediction) error of the fitted model… | procedure | tagged | Cross-Validation: “**Cross-Validation** estimates how well a model predicts **new** data by repeatedly holding part of…” |
| The error variance estimate used in Cp, AIC, and BIC is sigma-hat^2 = RSS/(n - p - 1). | formula | tagged | High-Dimensional Data: “$$\hat\sigma^2 = \frac{\text{RSS}}{n - p - 1}$$” |
| Cp, AIC, BIC, and adjusted R^2 are unreliable when p is close to or exceeds n, because the error variance estimate becomes near zero or und… | fact | tagged | High-Dimensional Data: “$C_p$, [[AIC]] and [[BIC]] are unreliable because $\hat\sigma^2$ is, and adjusted $R^2$ can be made…” |

</details>

<details><summary><code>masi-an-142</code> · answerable</summary>

Tagged pages: High-Dimensional Data, Test Error, Variable Selection, Overfitting

| Item | Kind | Status | Where |
|---|---|---|---|
| Training R^2 never decreases as predictors are added and reaches 1 when the number of coefficients equals the number of observations, so a … | fact | tagged | High-Dimensional Data: “adding features unrelated to the response drives $R^2$ to $1$ and training MSE to $0$, while test M…” |
| Adjusted R^2 penalizes only the number of predictors in the final model, not the search over all candidate predictors, so after selection f… | fact | tagged | High-Dimensional Data: “$C_p$, [[AIC]] and [[BIC]] are unreliable because $\hat\sigma^2$ is, and adjusted $R^2$ can be made…” |
| P-values and standard errors from a fit whose features were selected because they fit the same data are not valid; among many candidate fea… | fact | tagged | High-Dimensional Data: “Training RSS, [[R-Squared]], p-values and the usual fit measures are useless as evidence” |
| AIC, BIC and Cp rely on an error variance estimate that is unreliable when p is large relative to n, and they are computed on the same data… | fact | tagged | High-Dimensional Data: “$C_p$, [[AIC]] and [[BIC]] are unreliable because $\hat\sigma^2$ is, and adjusted $R^2$ can be made…” |
| Test error on held-out data estimates performance on new observations only if the held-out data were set aside before any feature selection… | fact | linked | Train-Test Split: “Each part can judge a step only if that step has never seen it, so every reuse of a held-out set to…” |
| Cross-validation gives a valid estimate of test error with feature selection only if the whole selection procedure is repeated within each … | fact | linked | Cross-Validation: “Every step that touches the response — [[Variable Selection]], banding a variable by its indicated …” |

</details>

<details><summary><code>masi-an-151</code> · answerable</summary>

Tagged pages: Ordinal Logistic Regression, Link Function

| Item | Kind | Status | Where |
|---|---|---|---|
| A proportional odds (cumulative logit) model for an ordinal response models ln(γ_j/(1−γ_j)) = θ_j + βx, where γ_j = P(Y ≤ j) is the cumulat… | definition | tagged | Ordinal Logistic Regression: “The usual form is the **proportional odds** (cumulative logit) model, which applies the logit [[Lin…” |
| In the proportional odds model the slope coefficients β are the same for every cut-point, so the cut-point intercepts θ_j cancel when compa… | fact | tagged | Ordinal Logistic Regression: “A covariate multiplies the odds of "category $j$ or below" by the *same* factor $e^{\mathbf{x}^\top…” |
| In the cumulative logit model, the odds ratio of being at or below category j for covariate x+1 versus x equals e^β, obtained by exponentia… | formula | tagged | Ordinal Logistic Regression: “Exponentiating gives $\gamma_j/(1-\gamma_j) = e^{\theta_j}\,e^{\mathbf{x}^\top\boldsymbol\beta}$.” |
| A negative β in the form ln(γ_j/(1−γ_j)) = θ_j + βx lowers the cumulative odds and probability of low categories and shifts the response to… | fact | tagged | Ordinal Logistic Regression: “In the form above a positive $\beta$ raises the odds of the *lower* categories. Output may instead …” |
| Individual category probabilities are obtained by differencing cumulative probabilities: P(Y=j) = γ_j − γ_{j−1}, with γ_j = e^{θ_j+βx}/(1+e… | procedure | tagged | Ordinal Logistic Regression: “$$\pi_j = \gamma_j - \gamma_{j-1}$$” |
| The odds ratio multiplies cumulative odds, not individual category probabilities, so category probabilities are not simply scaled by e^β. | fact | syllabus | Response Variable (collapsed): “Attorney involvement multiplies the **odds** of referral by $2.23$ but the **probability** by only …” |

</details>

<details><summary><code>masi-an-152</code> · answerable</summary>

Tagged pages: Ordinal Logistic Regression, Link Function

| Item | Kind | Status | Where |
|---|---|---|---|
| In the proportional odds (cumulative logit) model, the cumulative probability γ_j = P(Y ≤ j) satisfies ln(γ_j/(1−γ_j)) = θ_j + β·x, with a … | definition | tagged | Ordinal Logistic Regression: “The usual form is the **proportional odds** (cumulative logit) model, which applies the logit [[Lin…” |
| To get a cumulative probability from a logit model, compute the linear predictor θ_j + β·x and invert the logit: γ_j = 1/(1 + e^{−(θ_j + β·… | procedure | tagged | Link Function: “\\| Logit \\| $\ln\!\frac{\mu}{1-\mu}$ \\| $\frac{e^\eta}{1+e^\eta}$ \\| Binomial (binary outcomes) \\|” |
| In an ordinal response with ordered categories, the probability of a single category is the difference of adjacent cumulative probabilities… | fact | tagged | Ordinal Logistic Regression: “$j = 1, \dots, J-1$, with $\gamma_0 = 0$ and $\gamma_J = 1$; $\pi_j = P(Y = j \mid \mathbf{x})$.” |
| The probability of the highest category equals the complement of the last cumulative probability: P(Y = k) = 1 − γ_{k−1}, since γ_k = 1. | fact | tagged | Ordinal Logistic Regression (collapsed): “\pi_3 &= 1 - 0.7503 \\” |

</details>

<details><summary><code>masi-an-153</code> · answerable</summary>

Tagged pages: Log-Linear Model, Poisson Regression, Deviance, Interaction

| Item | Kind | Status | Where |
|---|---|---|---|
| The deviance of a log-linear model for a contingency table is compared with a chi-squared distribution whose degrees of freedom equal the n… | fact | tagged | Log-Linear Model: “The [[Deviance]] of the additive model, $D = 2\sum y_{ij}\ln(y_{ij}/\hat\mu_{ij})$, is approximatel…” |
| In an I by J table, the independence model ln(mu_ij) = intercept + row effect + column effect has I + J - 1 parameters, so its deviance has… | fact | tagged | Log-Linear Model: “The [[Deviance]] of the additive model, $D = 2\sum y_{ij}\ln(y_{ij}/\hat\mu_{ij})$, is approximatel…” |
| Conditioning independent Poisson cell counts on their total gives a multinomial distribution, so a log-linear model with an intercept gives… | fact | tagged | Log-Linear Model: “Conditioning Poisson counts on their total gives the multinomial, and a model that includes those m…” |
| In a three-way table, the model AB + C includes the A-B interaction but no term linking C to A or B, so (A, B) is jointly independent of C. | fact | tagged | Log-Linear Model: “$A + B + C$ is complete independence, and $AB + C$ means $A$ and $B$ are associated but jointly ind…” |

</details>

<details><summary><code>masi-an-154</code> · gap</summary>

Tagged pages: Log-Linear Model, Deviance, Likelihood Ratio Test, Chi-Squared Distribution, Interaction, Model Selection

| Item | Kind | Status | Where |
|---|---|---|---|
| The deviance of a Poisson log-linear (GLM) model measures its lack of fit relative to the saturated model, which has zero deviance and one … | definition | tagged | Deviance: “It compares the fitted model to the **saturated model** (a model with one parameter per observation…” |
| Test the goodness of fit of a log-linear model by comparing its deviance with the chi-squared critical value whose degrees of freedom equal… | procedure | tagged | Deviance: “in large samples a model that fits has $D \approx \chi^2_{n-p}$” |
| Compare nested models by taking the difference in deviances and comparing it with the chi-squared critical value on the difference in degre… | procedure | tagged | Deviance: “for nested models, $\dfrac{D_{\text{reduced}} - D_{\text{full}}}{\phi} \approx \chi^2_{\Delta p}$ w…” |
| A larger model always fits at least as well (has lower or equal deviance) as a model nested within it, so the lowest deviance alone is not … | fact | linked | Model Structure: “Adding terms always improves in-sample fit but risks overfitting” |
| In a hierarchical log-linear model for a three-way table, the absence of a term linking two variables (e.g. no XY term in XZ + YZ) means X … | fact | missing |  |
| The degrees of freedom of the difference between two nested log-linear models equal the difference of their residual degrees of freedom, wh… | fact | tagged | Deviance: “for nested models, $\dfrac{D_{\text{reduced}} - D_{\text{full}}}{\phi} \approx \chi^2_{\Delta p}$ w…” |

</details>

<details><summary><code>masi-an-155</code> · answerable</summary>

Tagged pages: Quasi-Likelihood, Poisson Regression, Dispersion Parameter, Parameter Estimate Tables

| Item | Kind | Status | Where |
|---|---|---|---|
| A quasi-Poisson model keeps the Poisson mean structure and log link but specifies Var(Y) = φμ, with φ a dispersion parameter that allows fo… | definition | tagged | Quasi-Likelihood: “The analyst specifies only how the mean depends on the predictors and how the variance depends on t…” |
| In a quasi-Poisson fit the dispersion parameter cancels from the estimating equations (IRLS weights are all divided by the same φ), so the … | fact | tagged | Quasi-Likelihood: “For [[Poisson Regression]] with $\text{Var}(Y) = \phi\mu$, $\phi$ cancels out of the weighted least…” |
| Under quasi-Poisson the covariance matrix of the coefficient estimates is φ times the Poisson covariance matrix, so each standard error is … | fact | tagged | Quasi-Likelihood: “Only the variances change: $\text{Var}(\hat{\boldsymbol\beta}) = \phi(X^\top W X)^{-1}$, so standar…” |
| The dispersion parameter is estimated as Pearson's chi-square statistic divided by the residual degrees of freedom. | formula | tagged | Quasi-Likelihood: “$$\hat\phi = \frac{X^2}{n-p}$$” |
| The Wald (z or t) test statistic for a coefficient is the estimate divided by its standard error. | formula | tagged | Parameter Estimate Tables: “\\| **z-value** or **t-value** \\| $\hat{\beta} / \text{SE}(\hat{\beta})$; test statistic for $H_0: \…” |

</details>

<details><summary><code>masi-an-156</code> · answerable</summary>

Tagged pages: Quasi-Likelihood, Dispersion Parameter, Deviance, F-Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| In a quasi-Poisson (quasi-likelihood) model, the dispersion parameter is estimated as Pearson's chi-square statistic divided by the residua… | formula | tagged | Quasi-Likelihood: “$$\hat\phi = \frac{X^2}{n-p}$$” |
| The F statistic for comparing nested quasi-likelihood GLMs is the drop in deviance divided by the difference in residual degrees of freedom… | formula | tagged | Quasi-Likelihood: “Nested models use the drop in [[Deviance]] per degree of freedom divided by $\hat\phi$, which is co…” |
| The quasi-likelihood F statistic is compared with an F distribution with numerator df equal to the number of added parameters (difference i… | fact | tagged | Deviance: “When $\phi$ is estimated, use $F = \dfrac{D_{\text{reduced}} - D_{\text{full}}}{\Delta p\,\hat\phi_…” |
| The difference in residual degrees of freedom between nested models equals the number of additional parameters, so a categorical variable w… | fact | linked | ANOVA: “The change **scaled by the dispersion** $\phi$, $[D_{\text{small}} - D_{\text{big}}]/\phi$, is asym…” |

</details>

<details><summary><code>masi-an-157</code> · answerable</summary>

Tagged pages: Naive Bayes, Quadratic Discriminant Analysis, Bayes Theorem, Logistic Regression, Categorical Predictor

| Item | Kind | Status | Where |
|---|---|---|---|
| Quadratic discriminant analysis assumes that within each class k the predictors follow a multivariate normal distribution with its own clas… | definition | tagged | Quadratic Discriminant Analysis: “**Quadratic Discriminant Analysis** (QDA) is a classifier that assumes the predictors in each class…” |
| Naive Bayes assumes that within each class the predictors are independent, so the joint density factors as f_k(x) = f_k1(x_1) × ... × f_kp(… | definition | tagged | Naive Bayes: “It assumes that, **within each class, the $p$ predictors are independent**, so each class's joint d…” |
| In naive Bayes, a qualitative predictor's within-class density f_kj is estimated as the proportion of class-k training observations at each… | procedure | tagged | Naive Bayes: “For a qualitative predictor, use the proportion of class-$k$ training observations at each level.” |
| Naive Bayes and QDA are generative classifiers: they model the distribution of X within each class and the priors π_k, then obtain P(Y=k \|… | fact | tagged | Naive Bayes: “$$P(Y = k \mid X = \mathbf{x}) = \frac{\pi_k\,f_{k1}(x_1) \cdots f_{kp}(x_p)}{\sum_{l=1}^{K} \pi_l\…” |
| The QDA discriminant function is quadratic in x, so the decision boundary between classes is a quadratic curve or surface, in contrast with… | fact | tagged | Quadratic Discriminant Analysis: “$\mathbf{x}$ enters $\delta_k$ **quadratically**, hence the name, so the boundary between two class…” |
| Naive Bayes with normal marginal densities is equivalent to QDA with diagonal class covariance matrices, so when a predictor's variance dif… | fact | tagged | Naive Bayes: “With normal $f_{kj}$, it amounts to QDA with a **diagonal** class covariance matrix.” |

</details>

<details><summary><code>masi-an-158</code> · answerable</summary>

Tagged pages: Naive Bayes, Bayes Theorem

| Item | Kind | Status | Where |
|---|---|---|---|
| Naive Bayes posterior: P(class \| x) is proportional to the class prior times the product of the per-feature conditional probabilities P(x_… | formula | tagged | Naive Bayes: “$$P(Y = k \mid X = \mathbf{x}) = \frac{\pi_k\,f_{k1}(x_1) \cdots f_{kp}(x_p)}{\sum_{l=1}^{K} \pi_l\…” |
| For a binary feature that is absent in the observation, use the complement (1 minus the within-class rate of the flag being present) as tha… | procedure | tagged | Naive Bayes: “The "no attorney" rates are $1 - 0.30 = 0.70$ for fraud and $1 - 0.05 = 0.95$ for legitimate claims.” |
| Normalize the class-wise products (prior times likelihood) by dividing each by their sum over all classes to obtain the posterior probabili… | procedure | tagged | Bayes Theorem: “$$= \frac{P(E \mid H)\,P(H)}{\displaystyle\sum_{i} P(E \mid H_i)\,P(H_i)}$$” |

</details>

<details><summary><code>masi-an-159</code> · answerable</summary>

Tagged pages: Quadratic Discriminant Analysis, Bayes Theorem, Normal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For one predictor with class-specific normal densities, the QDA discriminant function is delta_k(x) = -(x-mu_k)^2/(2 sigma_k^2) - ln(sigma_… | formula | tagged | Quadratic Discriminant Analysis: “$$\delta_k(x) = -\frac{(x - \mu_k)^2}{2\sigma_k^2} - \ln\sigma_k + \ln\pi_k$$” |
| QDA assumes each class has its own normal distribution with its own variance (covariance matrix), unlike LDA which assumes a shared varianc… | fact | tagged | Quadratic Discriminant Analysis: “assumes the predictors in each class $k$ are multivariate normal with their own mean vector $\bolds…” |
| Convert discriminant values to posterior class probabilities by noting exp(delta_k(x)) is proportional to pi_k f_k(x), so P(class k \| x) =… | procedure | tagged | Bayes Theorem: “$$= \frac{P(E \mid H)\,P(H)}{\displaystyle\sum_{i} P(E \mid H_i)\,P(H_i)}$$” |
| The Bayes posterior for a class combines the prior probability with the class density, so ignoring the priors or the density's 1/sigma fact… | fact | tagged | Bayes Theorem: “updating the prior probability $P(H)$ of a hypothesis to the posterior probability $P(H \mid E)$ af…” |

</details>

<details><summary><code>masi-an-160</code> · answerable</summary>

Tagged pages: Quadratic Discriminant Analysis, Bias-Variance Tradeoff, Naive Bayes

| Item | Kind | Status | Where |
|---|---|---|---|
| Quadratic discriminant analysis (QDA) assumes each class has its own multivariate normal distribution with a class-specific mean vector and… | definition | tagged | Quadratic Discriminant Analysis: “**Quadratic Discriminant Analysis** (QDA) is a classifier that assumes the predictors in each class…” |
| QDA's decision boundary is quadratic in the predictors, whereas LDA, which assumes a covariance matrix shared by all classes, has a linear … | fact | tagged | Quadratic Discriminant Analysis: “$\mathbf{x}$ enters $\delta_k$ **quadratically**, hence the name, so the boundary between two class…” |
| A covariance matrix for p predictors has p(p+1)/2 distinct variance and covariance parameters, and QDA estimates one such matrix per class … | formula | tagged | Quadratic Discriminant Analysis: “Each class needs its own $p(p+1)/2$ covariance parameters, or $Kp(p+1)/2$ in all.” |
| Estimating many parameters from few observations gives a high-variance fit; a more flexible model such as QDA has lower bias but higher var… | fact | tagged | Quadratic Discriminant Analysis: “QDA is preferred when the training set is large or a common covariance is clearly untenable; with f…” |
| Naive Bayes assumes predictors are independent within each class (a diagonal covariance matrix in the Gaussian case), which introduces bias… | definition | tagged | Quadratic Discriminant Analysis: “[[Naive Bayes]] with normal predictors is QDA with each $\boldsymbol\Sigma_k$ restricted to be **di…” |

</details>

<details><summary><code>masi-an-161</code> · untagged</summary>

Tagged pages: Polynomial Regression, Ordinary Least Squares, Linear Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| A polynomial regression of degree d is an ordinary linear model in the predictors x, x^2, ..., x^d because it is linear in the coefficients… | fact | tagged | Polynomial Regression: “Its coefficients are still estimated by least squares, because it is a standard linear model in the…” |
| A lower-degree polynomial model is nested in a higher-degree one (extra coefficients set to zero), so least squares on the larger model can… | fact | elsewhere | Overfitting: “Training MSE falls every time flexibility is added, because a model with as many free parameters as…” |
| A high-degree polynomial imposes a single global shape and is very flexible, so it tends to oscillate wildly near the boundaries of the dat… | fact | tagged | Polynomial Regression: “Values of $d$ above 3 or 4 are unusual. At high degree the curve becomes overly flexible and can ta…” |
| Polynomial regression is a global method: changing data in one region changes every coefficient and so the whole fitted curve, unlike local… | fact | tagged | Polynomial Regression: “A polynomial imposes one global shape on the whole range of $X$.” |
| In polynomial regression the individual coefficients of powers of x are not interpretable as separate marginal effects, since x, x^2, x^3 c… | fact | tagged | Polynomial Regression: “The individual coefficients are rarely of interest. What matters is the fitted function across a gr…” |
| The variance of the fitted value at x0 is Var(f̂(x0)) = ℓ0ᵀ Ĉ ℓ0, where ℓ0 = (1, x0, ..., x0^d) and Ĉ is the coefficient covariance matrix,… | formula | tagged | Polynomial Regression: “$$\operatorname{Var}\big[\hat f(x_0)\big] = \ell_0^T \hat{\mathbf{C}}\, \ell_0$$” |

</details>

<details><summary><code>masi-an-162</code> · answerable</summary>

Tagged pages: Polynomial Regression, Confidence Interval, Ordinary Least Squares

| Item | Kind | Status | Where |
|---|---|---|---|
| The variance of a linear combination of estimated regression coefficients, ℓ'β̂, is ℓ' Ĉ ℓ, where Ĉ is the estimated covariance matrix of t… | formula | tagged | Polynomial Regression: “$$\operatorname{Var}\big[\hat f(x_0)\big] = \ell_0^T \hat{\mathbf{C}}\, \ell_0$$” |
| Expanding the quadratic form ℓ' Ĉ ℓ gives each diagonal variance weighted by the square of its ℓ term and each off-diagonal covariance weig… | fact | tagged | Polynomial Regression: “each diagonal entry is weighted by the square of its $\ell_0$ term and each off-diagonal entry by t…” |
| For a polynomial regression fitted value at x, the fitted function equals ℓ'β̂ with ℓ = (1, x, x²), so its variance is found by applying ℓ … | procedure | tagged | Polynomial Regression: “$\hat f(x_0) = \hat\beta_0 + \hat\beta_1 x_0 + \cdots + \hat\beta_d x_0^d$ is the fit at a point $x…” |
| The standard error of an estimate is the square root of its estimated variance. | definition | tagged | Polynomial Regression: “The standard error of $\hat f(x_0)$ is the square root of the variance above.” |
| An approximate 95% pointwise confidence band for a fitted value is the estimate plus or minus 2 standard errors (about 1.96 under normal ap… | procedure | tagged | Polynomial Regression: “Computing it at each $x_0$ and plotting $\hat f(x_0) \pm 2\,\text{SE}$ gives an approximate 95% [[C…” |

</details>

<details><summary><code>masi-an-163</code> · answerable</summary>

Tagged pages: Step Function, Ordinary Least Squares, Categorical Predictor

| Item | Kind | Status | Where |
|---|---|---|---|
| A step-function regression converts a continuous predictor into indicator variables C_k(X) = I(c_k ≤ X < c_{k+1}) for cutpoints c_k, so eac… | definition | tagged | Step Function: “A step function is a basis-function model with $b_j(x_i) = I(c_j \le x_i < c_{j+1})$.” |
| In a least squares fit with an intercept and one indicator per bin except the first, the fitted value in each bin equals the mean of the re… | fact | tagged | Step Function (collapsed): “With only the intercept and two indicators, each bin's fitted value is just the mean of the claims …” |
| In a regression with indicator variables for all categories but one, the intercept estimate equals the mean response of the omitted referen… | fact | tagged | Step Function: “When $X < c_1$ all of them are zero, so $\beta_0$ is the mean value of $Y$ for $X < c_1$.” |

</details>

<details><summary><code>masi-an-164</code> · answerable</summary>

Tagged pages: Step Function, Categorical Predictor, Design Matrix, Model Output

| Item | Kind | Status | Where |
|---|---|---|---|
| Indicator (dummy) variables for categories of a binned predictor take value 1 if the observation falls in the bin and 0 otherwise, so a ste… | definition | tagged | Step Function: “$I(\cdot)$ is the indicator function: $1$ if the condition is true and $0$ otherwise. These are dum…” |
| If the indicators for all categories of a variable are included along with an intercept, they sum to the intercept column, so the design ma… | fact | tagged | Step Function: “For any $X$, $C_0(X) + C_1(X) + \cdots + C_K(X) = 1$, because $X$ falls in exactly one of the $K + …” |
| When software reports NA for a coefficient, that column was dropped as linearly dependent on the others, and its category becomes the refer… | fact | tagged | Categorical Predictor: “the omitted level is the **reference level**, absorbed into the intercept” |
| With a reference category, the intercept equals the reference category's mean response and each other category's coefficient equals that ca… | fact | tagged | Step Function: “When $X < c_1$ all of them are zero, so $\beta_0$ is the mean value of $Y$ for $X < c_1$.” |
| To predict for an observation, add the intercept and the coefficients of the indicators equal to 1 for that observation, ignoring those equ… | procedure | tagged | Step Function: “For $c_j \le X < c_{j+1}$ the model predicts $\beta_0 + \beta_j$, so $\beta_j$ is the average incre…” |

</details>

<details><summary><code>masi-an-165</code> · gap</summary>

Tagged pages: Multiple Comparisons, ANOVA, Student's t-Distribution, Confidence Interval

| Item | Kind | Status | Where |
|---|---|---|---|
| The estimated standard error of a linear contrast C = sum c_i * mu_i in one-way ANOVA is sqrt(MSE * sum(c_i^2 / n_i)), so a pairwise differ… | formula | tagged | Multiple Comparisons: “$$s_{\hat{C}}^2 = \hat\sigma^2 \sum_{i=1}^{k} \frac{c_i^2}{n_i}$$” |
| Bonferroni method: to achieve family-wise error rate alpha across g simultaneous intervals, build each interval with individual error rate … | procedure | tagged | Multiple Comparisons: “Each interval is built at confidence $1 - \alpha/g$ (each test at level $\alpha/g$).” |
| The number of pairwise comparisons among k groups is k(k-1)/2, and this is the value of g used in the Bonferroni adjustment when all pairwi… | fact | missing |  |
| A confidence interval for a contrast has half-width equal to the t critical value (with the error degrees of freedom of the ANOVA) times th… | formula | tagged | Confidence Interval: “The general form is $\hat\theta \pm (\text{critical value}) \times \text{SE}(\hat\theta)$, where th…” |

</details>

<details><summary><code>masi-an-166</code> · answerable</summary>

Tagged pages: Multiple Comparisons, ANOVA, F-Distribution, Student's t-Distribution, Type I Error

| Item | Kind | Status | Where |
|---|---|---|---|
| The standard error of a contrast of group means in one-way ANOVA is sqrt(sigma-hat^2 * sum(c_i^2/n_i)); for a pairwise difference with equa… | formula | tagged | Multiple Comparisons: “s_{\hat{C}}^2 = \hat\sigma^2 \sum_{i=1}^{k} \frac{c_i^2}{n_i}” |
| The Scheffé simultaneous interval for a contrast is the estimate plus or minus sqrt((k-1) F_{alpha; k-1, N-k}) times the contrast's standar… | formula | tagged | Multiple Comparisons: “\hat{C} \pm \sqrt{(k - 1)\,F_{\alpha;\,k - 1,\,N - k}}\; s_{\hat{C}}” |
| The Tukey simultaneous interval for all pairwise differences with equal group sizes n is the difference plus or minus q_{alpha; k, N-k} * s… | formula | tagged | Multiple Comparisons: “\bar{y}_i - \bar{y}_j \pm q_{\alpha;\,k,\,N - k}\;\hat\sigma\sqrt{\frac{1}{n}}” |
| The Bonferroni interval for g comparisons uses a t percentile with two-sided area alpha/g, giving at least (1-alpha) family-wise confidence. | formula | tagged | Multiple Comparisons: “\hat{C}_i \pm t_{\alpha/(2g),\,N - k}\; s_{\hat{C}_i}” |
| A comparison chosen after looking at the data (e.g., the largest difference of means) is effectively the maximum over all pairwise comparis… | fact | tagged | Multiple Comparisons: “covers every contrast at once, including ones chosen after looking at the data” |
| For all pairwise differences with equal group sizes, Tukey's method is exact and gives the narrowest interval; Bonferroni is conservative a… | fact | tagged | Multiple Comparisons: “Coverage is exactly $1 - \alpha$ for equal sizes and conservative for unequal sizes. When all pairw…” |
| A simultaneous confidence interval for a difference of means indicates a significant difference if it excludes zero, i.e., if the observed … | fact | tagged | Student's t-Distribution (collapsed): “The interval $(0.105,\ 0.735)$ excludes 0, consistent with rejecting $\beta_1 = 0$ at 5%.” |

</details>

<details><summary><code>masi-an-167</code> · answerable</summary>

Tagged pages: Chi-Squared Distribution, Student's t-Distribution, F-Distribution, Sample Variance, Normal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A chi-squared distribution with k degrees of freedom is the distribution of a sum of k squared independent standard normal random variables. | definition | tagged | Chi-Squared Distribution: “The **Chi-Squared Distribution** $\chi^2(n)$ with $n$ degrees of freedom is the distribution of the…” |
| For a normal random sample, (X_i - mu)/sigma are independent standard normals, so the sum of squared deviations from the true mean divided … | fact | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| For a normal random sample, (n-1)S^2/sigma^2 is chi-squared with n-1 degrees of freedom, because replacing mu with the sample mean costs on… | fact | tagged | Chi-Squared Distribution: “**Normal samples:** for a sample of size $n$ from $N(\mu, \sigma^2)$ with [[Sample Variance\\|sample…” |
| For a normal random sample, the sample mean is N(mu, sigma^2/n), so n(Xbar - mu)^2/sigma^2 is the square of a standard normal and is chi-sq… | fact | tagged | Chi-Squared Distribution: “The **Chi-Squared Distribution** $\chi^2(n)$ with $n$ degrees of freedom is the distribution of the…” |
| For a normal random sample, the sample mean and the sample variance are independent. | fact | tagged | Sample Variance: “For Normal data, $(n-1)S^2/\sigma^2 \sim \chi^2_{n-1}$ independent of $\bar{X}$” |
| A t distribution with k degrees of freedom is the distribution of Z / sqrt(W/k), where Z is standard normal and W is an independent chi-squ… | definition | tagged | Student's t-Distribution: “**Student's t-Distribution** $t(n)$ with $n$ degrees of freedom is the distribution of a standard […” |
| An F distribution with (m, k) degrees of freedom is the distribution of the ratio (U/m)/(V/k) of independent chi-squared variables U and V … | definition | tagged | F-Distribution: “The **F-Distribution** $F(n, m)$ with $n$ numerator and $m$ denominator degrees of freedom is the d…” |
| The square of a t(k) random variable has an F(1, k) distribution. | fact | tagged | Student's t-Distribution: “**Link to F:** $T^2 \sim F(1, n)$, so a two-sided t-test on one coefficient is the [[F-Distribution…” |

</details>

<details><summary><code>masi-an-168</code> · gap</summary>

Tagged pages: Chi-Squared Distribution, Likelihood Ratio Test, Deviance, Interaction, Categorical Predictor, p-Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The likelihood ratio test of nested GLMs (with known dispersion) uses the drop in deviance between the smaller and larger model as the test… | procedure | tagged | Chi-Squared Distribution: “For [[Generalized Linear Model\\|GLMs]] this is the drop in [[Deviance\\|deviance]] divided by the [[…” |
| Under the null hypothesis that the smaller nested model is adequate, the likelihood ratio statistic follows a chi-squared distribution with… | fact | tagged | Chi-Squared Distribution: “for nested models with $p_1 < p_2$ parameters, $-2\ln\lambda = 2(\ell_2 - \ell_1)$ is approximately…” |
| A categorical predictor with k levels contributes k-1 parameters (dummy variables) because one level is the base level. | fact | tagged | Categorical Predictor: “A categorical predictor with $k$ levels is represented using $k-1$ **indicator (dummy) variables**;…” |
| An interaction between two categorical predictors with k and m levels adds (k-1)(m-1) parameters. | fact | missing |  |
| To get a p-value from a chi-squared table, locate the test statistic between two tabulated critical values in the row for the degrees of fr… | procedure | tagged | Chi-Squared Distribution (collapsed): “Because $9.4$ also exceeds $9.35$ but not $11.34$ (the $0.990$ column), the [[p-Value\\|p-value]] li…” |

</details>

<details><summary><code>masi-an-169</code> · answerable</summary>

Tagged pages: Student's t-Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For a Student's t-distribution with n degrees of freedom, n > 2, the variance is n/(n-2). | formula | tagged | Student's t-Distribution: “$$\text{Var}(T) = \frac{n}{n - 2}, \quad n > 2$$” |
| The variance of a t-distribution exists only when degrees of freedom exceed 2, and the mean is 0 (for df > 1). | fact | tagged | Student's t-Distribution: “$$E[T] = 0, \quad n > 1$$” |

</details>

<details><summary><code>masi-an-170</code> · answerable</summary>

Tagged pages: Student's t-Distribution, Linear Regression, Hypothesis Testing, p-Value

| Item | Kind | Status | Where |
|---|---|---|---|
| In a linear regression with p predictors plus an intercept fitted to n observations, the residual degrees of freedom are n - p - 1, and the… | formula | tagged | Student's t-Distribution: “in simple [[Linear Regression\\|linear regression]], $t = \hat{\beta}_1/\text{SE}(\hat{\beta}_1)$ ha…” |
| The p-value of a t-test is the probability, under the null hypothesis, of observing a t-statistic at least as extreme as the one observed; … | definition | tagged | p-Value: “A **p-Value** is the probability, computed assuming the null hypothesis is true, of observing a tes…” |
| To bound a p-value using a t table, find the row for the degrees of freedom, locate the two critical values that bracket the absolute t-sta… | procedure | tagged | Student's t-Distribution (collapsed): “In the $df = 18$ row the two-sided $0.02$ column is $2.552$ and the $0.01$ column is $2.878$, so th…” |
| For a one-sided alternative whose direction matches the sign of the t-statistic, the p-value is half the two-sided p-value because the t di… | fact | tagged | p-Value: “"Extreme" is defined by the alternative: a one-sided $H_1: \theta > \theta_0$ uses one tail, a two-…” |
| For the same t-statistic, fewer degrees of freedom give heavier tails and hence a larger p-value, so a larger t-statistic does not necessar… | fact | tagged | Student's t-Distribution: “The density is symmetric about 0 with heavier tails than the normal; as $n \to \infty$ it converges…” |

</details>

<details><summary><code>masi-an-171</code> · answerable</summary>

Tagged pages: Noncentral Chi-Squared Distribution, Chi-Squared Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A noncentral chi-squared variable with r degrees of freedom is the sum of squares of r independent normal variables with unit variance (X_i… | definition | tagged | Noncentral Chi-Squared Distribution: “is the distribution of $\sum X_i^2/\sigma^2$ for $r$ independent [[Normal Distribution\\|normal]] va…” |
| For a noncentral chi-squared variable with r degrees of freedom and noncentrality parameter θ (full-sum convention), the mean is E[Y] = r +… | formula | tagged | Noncentral Chi-Squared Distribution: “$$E[Y] = r + \theta$$” |
| For a noncentral chi-squared variable with r degrees of freedom and noncentrality parameter θ (full-sum convention), the variance is Var(Y)… | formula | tagged | Noncentral Chi-Squared Distribution: “$$\text{Var}(Y) = 2r + 4\theta$$” |

</details>

<details><summary><code>masi-an-172</code> · answerable</summary>

Tagged pages: Noncentral Chi-Squared Distribution, Power of a Test, ANOVA, F-Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| In one-way ANOVA with k groups of n observations each, common variance sigma^2 and true group means mu_j, the noncentrality parameter of th… | formula | tagged | Noncentral Chi-Squared Distribution: “the between-groups sum of squares over $\sigma^2$ is $\chi^2(k - 1, \theta)$ with $\theta = n\sum_j…” |
| The power of a test is the probability of rejecting the null hypothesis when it is false; for the ANOVA F test it is P(noncentral F > criti… | definition | tagged | Noncentral Chi-Squared Distribution: “The power is $P\big(F(k - 1, k(n - 1), \theta) > c\big)$, where $c$ is the central critical value” |
| With fixed degrees of freedom and critical value, the power of the noncentral F test increases as the noncentrality parameter increases. | fact | tagged | Noncentral Chi-Squared Distribution: “The power is $P\big(F(k - 1, k(n - 1), \theta) > c\big)$, where $c$ is the central critical value; …” |
| The ANOVA noncentrality parameter depends only on deviations of group means from their average, so adding the same constant to every group … | fact | tagged | Noncentral Chi-Squared Distribution: “the between-groups sum of squares over $\sigma^2$ is $\chi^2(k - 1, \theta)$ with $\theta = n\sum_j…” |

</details>

<details><summary><code>masi-sample-q1</code> · answerable</summary>

Tagged pages: Inversion Method, Gamma, Exponential Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A gamma random variable with shape α and scale θ has mean αθ and variance αθ². | formula | tagged | Gamma: “$E[X] = \alpha\theta$, $\text{Var}(X) = \alpha\theta^2$, and coefficient of variation $CV = 1/\sqrt…” |
| A gamma random variable with integer shape α and scale θ is the sum of α independent exponential random variables each with mean θ. | fact | tagged | Gamma: “The sum of $n$ independent $\text{Exp}(\theta)$ variables follows $\text{Gamma}(n, \theta)$” |
| Inversion method: to simulate a random variable, draw U uniform on (0,1) and return x = F^{-1}(U), the value solving F(x) = U. | procedure | tagged | Inversion Method: “The **Inversion Method** (inverse transform method) simulates a draw from a distribution with [[Cum…” |
| An exponential random variable with rate λ has CDF F(x) = 1 - e^{-λx}, so inversion gives x = -ln(1-u)/λ. | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| If U is uniform on (0,1), then 1 - U is also uniform on (0,1), so either U or 1 - U may be inverted when simulating. | fact | tagged | Inversion Method: “Because $1 - U$ is also uniform, some texts invert the survival function instead, $X = S^{-1}(U)$.” |

</details>

<details><summary><code>masi-sample-q2</code> · answerable</summary>

Tagged pages: Bias-Variance Tradeoff, Test Error, Mean Square Error

| Item | Kind | Status | Where |
|---|---|---|---|
| In a spline, adding more knots makes the fit more flexible, allowing it to fit the training data more closely. | fact | syllabus | Regression Spline: “Splines add flexibility by adding knots while keeping the degree fixed, which generally gives more …” |
| As model flexibility increases, variance increases while squared bias decreases. | fact | tagged | Bias-Variance Tradeoff: “Adding terms, interactions, or levels lowers bias and raises variance. Removing them does the rever…” |
| Training MSE decreases steadily as model flexibility increases. | fact | tagged | Bias-Variance Tradeoff: “Training error is not a guide — it falls monotonically with complexity.” |
| Test MSE as a function of flexibility is typically U-shaped: it falls at first and then rises once the model overfits. | fact | tagged | Bias-Variance Tradeoff: “The total is U-shaped, and the minimum is the right complexity” |
| Expected test MSE at a point equals the variance of the fitted function plus its squared bias plus the irreducible error variance: E[(y0 - … | formula | tagged | Bias-Variance Tradeoff: “$$E\!\left[(y_0 - \hat{f}(x_0))^{2}\right] = \left[\text{Bias}(\hat{f}(x_0))\right]^{2} + \text{Var…” |
| Test MSE always lies above the sum of variance and squared bias by the irreducible error, so the test MSE curve is the one that equals the … | fact | tagged | Test Error: “It can never fall below $\mathrm{Var}(\varepsilon)$.” |

</details>

<details><summary><code>masi-sample-q3</code> · answerable</summary>

Tagged pages: Cross-Validation, Test Error, Bias-Variance Tradeoff

| Item | Kind | Status | Where |
|---|---|---|---|
| Leave-one-out cross-validation is the special case of k-fold cross-validation in which k equals the number of observations n, so each fold … | fact | tagged | Cross-Validation: “**Leave-one-out** ($k = n$) is nearly unbiased but has high variance and is expensive” |
| LOOCV has higher variance than k-fold cross-validation with k < n, because its n training sets are nearly identical, making the fold test e… | fact | tagged | Cross-Validation: “the $k$ training sets overlap less than LOOCV's, so the estimate has lower variance” |
| The validation set approach trains on only a portion (often about half) of the data and so tends to overestimate the test error rate more t… | fact | tagged | Test Error: “**Validation set:** fit on one part and score on the rest. Simple, but the estimate is variable and…” |

</details>

<details><summary><code>masi-sample-q4</code> · answerable</summary>

Tagged pages: Regression Spline, Linear Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| A regression spline of degree d with K knots is a least squares regression with d + K + 1 coefficients (an intercept, the d powers X throug… | formula | tagged | Regression Spline: “\\| Degree-$d$ spline \\| $(d + 1)(K + 1) - dK = K + d + 1$ \\|” |
| A regression spline with K knots is fit by least squares on a basis of polynomial terms in X up to the given degree plus one truncated powe… | definition | tagged | Regression Spline: “One way to represent a cubic spline is to start from $X, X^2, X^3$ and add one $h(X, \xi_k)$ for ea…” |

</details>

Nothing here edits the vault. A gap is fixed from the syllabus reading, in general form — never by copying the question's own numbers onto the page — and the edited page is fact checked again (docs/verification.md).
