# Answerability: Exam MAS-I (CAS)

Run `answerability-20261025-mas-i` · 56 questions checked of 56 attempted · cost $10.26

Each question's official solution was broken into the knowledge it uses (by a model that saw no study page), and each item was looked for on the pages the vault gives for the question. An item counts as taught only if a quote of the teaching passage is really on the page; the check is done in code. *Answerable* is necessary, not sufficient: a page can hold the formula and still not teach it well.

| Verdict | Questions | Share |
|---|---|---|
| **Answerable** — everything taught on a tagged page, one link away or on a prerequisite exam's page | 27 | 48% |
| **Untagged** — everything is in the vault, but some of it on a page neither tagged nor linked | 13 | 23% |
| **Gap** — something the solution uses is taught on no page | 16 | 29% |

Requirements: 233 — tagged 155 (67%), linked 18 (8%), prerequisite 7 (3%), elsewhere 31 (13%), missing 22 (9%)

## By sitting

A paper whose gaps far outrun the rest may test a reading the syllabus has since dropped.

| Sitting | Questions | Answerable | Untagged | Gap |
|---|---|---|---|---|
| Fall 2018 | 40 | 19 | 7 | 14 (35%) |
| Spring 2018 | 16 | 8 | 6 | 2 (12%) |

## Gaps, by the page that should teach them

Ranked by how many questions each page's gaps cost. The page is the one named for the item's concept; "no page" means the vault has no page by that name.

### `Concepts/Poisson Process.md` — 2 question(s)

- `masi-2018f-q1` (procedure): To find the expected product of counts at two times s<t, write N(t) = N(s) + [N(t)-N(s)] so the product splits into a second moment of N(s) plus a product of independent increments' expectations.
- `masi-2018s-q2` (fact): For a Poisson process, conditional on n events occurring in [0, t], the number of events in a subinterval [0, s] with s < t is Binomial with n trials and success probability s/t.
- `masi-2018s-q2` (fact): Given the total number of events in a Poisson process over an interval, the conditional probability of events in a subinterval does not depend on the rate lambda.

### **no page for Component Reliability Importance** — 1 question(s)

- `masi-2018f-q6` (definition): The reliability (Birnbaum) importance of a component is the change in system reliability per unit change in that component's reliability, i.e. the difference between system reliability when the component works and when it fails.
- `masi-2018f-q6` (procedure): To decide which component to upgrade, compute for each candidate the system reliability after replacing its probability with the new value and choose the one giving the largest increase (improvement equals importance times the change in component reliability).

### **no page for Estimation of Normal Variance** — 1 question(s)

- `masi-2018f-q17` (formula): For a normal sample with known mean mu, the MVUE of the variance is (1/n) times the sum of (X_i - mu)^2; with mu = 0 this is the sum of X_i^2 divided by n.

### **no page for Expected Value from the Survival Function** — 1 question(s)

- `masi-2018f-q8` (procedure): When a CDF is piecewise, split the integral of the survival function at the breakpoint and simplify the integrand separately on each piece.

### **no page for Functions of Independent Discrete Random Variables** — 1 question(s)

- `masi-2018f-q16` (procedure): To find the distribution of the difference of two independent, identically distributed discrete losses, enumerate all pairs of outcomes, multiply their probabilities, and sum the probabilities for each resulting difference value.

### **no page for Grouped Data Estimation** — 1 question(s)

- `masi-2018f-q18` (procedure): For grouped data with losses assumed uniform within each interval, approximate each observation by its interval midpoint and compute the sample mean as the count-weighted average of the midpoints.

### **no page for Independent Lives Joint Survival Probabilities** — 1 question(s)

- `masi-2018f-q13` (fact): For independent lives, the probability that one life survives and the other does not is the product of the first life's survival probability and the complement of the second life's survival probability.

### **no page for Loglogistic Distribution** — 1 question(s)

- `masi-2018f-q19` (formula): The loglogistic CDF is F(x) = (x/θ)^γ / (1 + (x/θ)^γ), so setting F(π_p) = p gives (π_p/θ)^γ = p/(1-p).

### **no page for Monotonic Functions** — 1 question(s)

- `masi-2018f-q27` (fact): A quadratic function is not monotonic over the whole real line, and the absolute value function is V-shaped and not monotonic, so neither is invertible and neither can be a link function.
- `masi-2018f-q27` (fact): A linear function with nonzero slope is strictly monotonic (increasing or decreasing) and invertible, so it is a valid link function even if its slope is negative.

### **no page for Multiple Linear Regression** — 1 question(s)

- `masi-2018f-q33` (fact): Predictors not included in the selected model do not contribute to its prediction, so their values are ignored.

### **no page for Nested Models** — 1 question(s)

- `masi-2018f-q31` (definition): Two GLMs are nested when the simpler model's explanatory variables are a subset of the more complex model's variables; models that each contain variables the other lacks are non-nested.

### **no page for Paired t-test** — 1 question(s)

- `masi-2018f-q22` (procedure): When observations come in dependent matched pairs, form the within-pair differences and apply a one-sample t-test to those differences (paired t-test).

### **no page for Series Systems** — 1 question(s)

- `masi-2018f-q7` (fact): For systems in series built from disjoint components, a minimal path set of the combined system is the union of one minimal path set from each subsystem, so the number of minimal path sets is the product of the subsystems' counts.

### `Concepts/Expected Value.md` — 1 question(s)

- `masi-2018s-q16` (fact): The expectation of a constant is the constant itself, so when the second derivative of the log-density does not depend on x, no integration is needed to take the expectation.

### `Concepts/Exponential Distribution.md` — 1 question(s)

- `masi-2018f-q24` (formula): For an exponential distribution with rate λ, the moment generating function is M(t) = λ/(λ - t) for t < λ.

### `Concepts/Normal Distribution.md` — 1 question(s)

- `masi-2018s-q16` (fact): For a normal distribution with known variance σ², the Fisher information for the mean μ from one observation is 1/σ², since the second derivative of the log-density with respect to μ is the constant -1/σ².

### `Concepts/Sample Variance.md` — 1 question(s)

- `masi-2018f-q16` (fact): For a sample of size 2, the sum of squared deviations from the sample mean equals (X1 - X2)^2 / 2.

### `Concepts/Sufficient Statistic.md` — 1 question(s)

- `masi-2018f-q17` (fact): For a random sample from a normal distribution with known mean, the sum of squared observations is a complete sufficient statistic for the variance.

## Tagging and linking gaps

The vault teaches what these questions need, but on a page the question isn't tagged with and its tagged pages don't link to. Adding the page to the question's `wiki_link` (or linking it from the tagged page) puts it in reach.

| Question | Pages that teach what it needs |
|---|---|
| `masi-2018f-q12` | Endowment Insurance |
| `masi-2018f-q19` | Percentile Matching |
| `masi-2018f-q20` | Policy Limit |
| `masi-2018f-q21` | Maximum Likelihood Estimation, Neyman-Pearson Lemma |
| `masi-2018f-q22` | Student's t-Distribution |
| `masi-2018f-q23` | Chi-Square Goodness-of-Fit Test |
| `masi-2018f-q25` | Parameter Estimation |
| `masi-2018f-q33` | Interaction |
| `masi-2018f-q5` | Future Lifetime Random Variable |
| `masi-2018f-q9` | Probability Rules |
| `masi-2018s-q10` | Transition Probability Matrix |
| `masi-2018s-q13` | Long-Term Insurance Coverage, Term Life Insurance |
| `masi-2018s-q15` | Policy Limit |
| `masi-2018s-q17` | Bias, Estimator |
| `masi-2018s-q20` | Sample Mean |
| `masi-2018s-q21` | Chi-Square Goodness-of-Fit Test |

## Taught only in a collapsed section

The passage that teaches these items sits inside a folded callout (a worked example, a table behind a toggle). A reader who skims never opens it.

| Page | Questions | Items |
|---|---|---|
| Bias | 1 | The sample maximum of a Uniform(0, θ) sample is a biased but asymptotically unb… |
| Critical Value | 1 | Read critical values from a chi-square table with n-1 degrees of freedom and co… |
| Estimator | 1 | For a random sample of size n from Uniform(0, θ), the sample maximum has expect…; For a random sample of size n from Uniform(0, θ), the sample maximum has varian… |
| Fisher Information | 1 | To compute Fisher information for a single observation, take the log of the den… |
| Gambler's Ruin Problem | 1 | To condition on early results, compute the current wealth as the starting wealt… |
| Generalized Linear Model | 1 | Compute the linear predictor by summing the intercept and the coefficients for … |
| Linear Regression | 1 | The fitted value for an observation is the regression line's prediction at that… |
| Normal Approximation | 1 | Because sample size must be a whole number, solve the inequality for n and take… |
| Parameter Estimation | 1 | The mean of a Uniform(0, θ) distribution is θ/2. |
| Recurrent and Transient States | 1 | To find the classes, read the transition matrix for which states can be reached…; A state that cannot be re-entered after leaving it (no path back to it) is tran… |
| Regression Spline | 1 | To check continuity of f and its derivatives at a knot, differentiate the trunc… |
| System Reliability | 1 | Reduce a complex series-parallel system by computing the reliability of each su… |
| Transition Probability Matrix | 1 | To find the probability of avoiding a set of states over several steps, sum ove… |

## Every question

<details><summary><code>masi-2018f-q1</code> · gap</summary>

Tagged pages: Poisson Process, Poisson Distribution, Expected Value, Counting Process

| Item | Kind | Status | Where |
|---|---|---|---|
| A Poisson process has independent increments: counts over non-overlapping time intervals are independent random variables. | fact | tagged | Poisson Process: “The number of events in non-overlapping intervals are **independent**” |
| In a Poisson process with rate lambda, the number of events in an interval of length t is Poisson distributed with mean lambda*t (stationar… | fact | tagged | Poisson Process: “The number of events in any interval of length $t$ has distribution $\text{Poi}(\lambda t)$” |
| To find the expected product of counts at two times s<t, write N(t) = N(s) + [N(t)-N(s)] so the product splits into a second moment of N(s)… | procedure | missing |  |
| For a Poisson random variable, the mean and variance both equal the parameter. | fact | tagged | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |
| The second moment of a random variable equals its variance plus the square of its mean: E[X^2] = Var(X) + (E[X])^2. | formula | prerequisite | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |
| If X and Y are independent, then E[XY] = E[X]E[Y]. | fact | prerequisite | Independent Random Variables: “For independent random variables: $E[XY] = E[X]\,E[Y]$ and $\text{Var}(X + Y) = \text{Var}(X) + \te…” |

</details>

<details><summary><code>masi-2018f-q10</code> · answerable</summary>

Tagged pages: Gambler's Ruin Problem, Markov Chain

| Item | Kind | Status | Where |
|---|---|---|---|
| The gambler's ruin problem models a gambler whose wealth moves as a simple random walk with steps of +1 (probability p) or -1 (probability … | definition | tagged | Gambler's Ruin Problem: “On each independent play the gambler wins one unit with probability $p$ and loses one with probabil…” |
| A random walk has the Markov property and stationary, independent increments, so the probability of future outcomes depends only on the cur… | fact | tagged | Gambler's Ruin Problem: “Play already completed matters only through the current fortune.” |
| To condition on early results, compute the current wealth as the starting wealth plus the number of wins minus the number of losses, and us… | procedure | tagged | Gambler's Ruin Problem (collapsed): “By the Markov property only the current fortune matters: $20 + 7 - 3 = 24$ chips.” |
| For a fair game (p = 0.5) with absorbing barriers at 0 and N, the probability of reaching 0 before N starting from i is (N - i)/N. | formula | tagged | Gambler's Ruin Problem: “\dfrac{i}{N} & p = \tfrac12” |

</details>

<details><summary><code>masi-2018f-q11</code> · answerable</summary>

Tagged pages: Branching Process, Markov Chain, Stochastic Processes

| Item | Kind | Status | Where |
|---|---|---|---|
| A branching (Galton–Watson) process models a population in which each individual lives one generation and independently produces a random n… | definition | tagged | Branching Process: “A **Branching Process** (Galton–Watson process) models a population in which each individual, by th…” |
| The ultimate extinction probability of a branching process is the probability that the population eventually reaches zero, commonly denoted… | definition | tagged | Branching Process: “**Extinction probability.** $\pi_0$ is the probability that the population eventually dies out.” |
| Gambler's ruin is a random walk in which a gambler's fortune moves up or down by 1 each play with fixed probabilities and stops upon reachi… | definition | linked | Gambler's Ruin Problem: “On each independent play the gambler wins one unit with probability $p$ and loses one with probabil…” |
| A periodic Markov chain is one in which return to a state is possible only at multiples of some period d greater than 1; a time-reversible … | definition | linked | Recurrent and Transient States: “State $i$ has period $d$ if $P^n_{ii} = 0$ whenever $n$ is not a multiple of $d$, and $d$ is the la…” |

</details>

<details><summary><code>masi-2018f-q12</code> · untagged</summary>

Tagged pages: Survival Model, Present Value, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| Model a warranty or contingent benefit as a multi-year survival model, where the claim is the failure event and the failure probability in … | procedure | tagged | Survival Model: “$_{t}p_x = \dfrac{S(x+t)}{S(x)}$ and $_{t}q_x = 1 - {_t}p_x$” |
| The probability of surviving through t years is the product of the one-year conditional survival probabilities, tp0 = p_0 · p_1 · ... · p_{… | formula | tagged | Life Table: “Survival probabilities **multiply** across periods: $_{s+t}p_x = {}_{s}p_x \cdot {}_{t}p_{x+s}$” |
| The probability that failure occurs in year k+1 is the probability of surviving k years times the failure probability in that year, kp0 · q… | formula | tagged | Life Table: “$_{t\\|}q_x = {}_{t}p_x \cdot q_{x+t}$ is the probability of dying in the year *after* surviving $t$…” |
| The actuarial present value of a benefit is the sum over payment times of the benefit amount times the discount factor v^t = (1+i)^(-t) tim… | formula | tagged | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| For a policy with a benefit paid at the end of the year of failure plus a refund paid at the end of the term upon survival, compute the APV… | procedure | elsewhere | Endowment Insurance: “$$A_{x:\overline{n}\\|} = A^{1}_{x:\overline{n}\\|} + {}_nE_x$$” |

</details>

<details><summary><code>masi-2018f-q13</code> · gap</summary>

Tagged pages: Survival Model, Joint Life, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| For independent lives, the probability that one life survives and the other does not is the product of the first life's survival probabilit… | fact | missing |  |
| The probability that a life aged x survives n years is n_p_x = l_{x+n} / l_x, computed from the life table. | formula | tagged | Life Table: “$$_{t}p_x = \frac{\ell_{x+t}}{\ell_x}, \qquad _{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{…” |
| When mortality follows a table up to some age and a constant annual rate afterward, split the survival probability into the table ratio l_{… | procedure | tagged | Life Table: “$_{s+t}p_x = {}_{s}p_x \cdot {}_{t}p_{x+s}$” |
| The probability of death within n years is the complement of the n-year survival probability: n_q_x = 1 - n_p_x. | fact | tagged | Survival Model: “$_{t}p_x = \dfrac{S(x+t)}{S(x)}$ and $_{t}q_x = 1 - {_t}p_x$” |

</details>

<details><summary><code>masi-2018f-q14</code> · answerable</summary>

Tagged pages: Inversion Method, Cumulative Distribution Function (CDF)

| Item | Kind | Status | Where |
|---|---|---|---|
| In the inversion method, simulate a value from a continuous distribution by setting the CDF F(x) equal to a uniform(0,1) random draw u and … | procedure | tagged | Inversion Method: “**Continuous case:** solve $F(x) = u$ for $x$.” |
| The cumulative distribution function F(x) of a continuous random variable is the integral of its density function from the lower bound of s… | definition | tagged | Cumulative Distribution Function (CDF): “For a continuous random variable, $F(x) = \int_{-\infty}^{x} f(t)\, dt$” |
| If U is uniform on (0,1) and F is a continuous CDF, then F^{-1}(U) has distribution F, which is why inversion produces valid simulated valu… | fact | tagged | Inversion Method: “**Why it works:** $F$ is nondecreasing, so $F^{-1}(U) \leq x$ exactly when $U \leq F(x)$, and a uni…” |

</details>

<details><summary><code>masi-2018f-q15</code> · answerable</summary>

Tagged pages: Statistics, Uniform Continuous Distribution, Variance, Sample Mean

| Item | Kind | Status | Where |
|---|---|---|---|
| The variance of a Uniform(0, θ) random variable is θ²/12. | fact | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The variance of the sample mean of n independent, identically distributed observations equals the variance of a single observation divided … | fact | tagged | Sample Mean: “$$E[\bar{X}] = \mu, \qquad \text{Var}(\bar{X}) = \frac{\sigma^2}{n}$$” |
| For a constant c and random variable Y, Var(cY) = c² Var(Y). | fact | tagged | Variance: “$\text{Var}(aX + b) = a^2 \text{Var}(X)$ — scaling changes variance, shifts do not” |
| The sample mean is the sum of the observations divided by n, so an estimator of the form (2/n)ΣXi equals 2 times the sample mean. | definition | tagged | Sample Mean: “$$\bar{X} = \frac{1}{n}\sum_{i=1}^{n} X_i$$” |

</details>

<details><summary><code>masi-2018f-q16</code> · gap</summary>

Tagged pages: Mean Square Error, Variance, Bias, Sample Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| The mean square error of an estimator is the expected squared difference between the estimator and the true parameter, equal to its varianc… | definition | tagged | Mean Square Error: “$$= \text{Var}(\hat{\theta}) + \left(\text{Bias}(\hat{\theta})\right)^2$$” |
| For an unbiased estimator the mean square error equals the variance of the estimator. | fact | tagged | Mean Square Error: “For an **[[Unbiasedness\\|unbiased]]** estimator, $\text{MSE}(\hat{\theta}) = \text{Var}(\hat{\theta…” |
| An estimator is unbiased if its expected value equals the parameter being estimated; the sample variance with divisor n-1 is an unbiased es… | definition | tagged | Sample Variance: “Dividing the sum of squared deviations by $n - 1$ rather than $n$ makes it an [[Unbiasedness\\|unbia…” |
| For a sample of size 2, the sum of squared deviations from the sample mean equals (X1 - X2)^2 / 2. | fact | missing |  |
| For independent identically distributed X1 and X2, E[(X1 - X2)^2] = 2 Var(X), since the variance of a difference of independent variables i… | formula | prerequisite | Linear Combinations of Random Variables: “so $\text{Var}(X - Y) = \text{Var}(X) + \text{Var}(Y)$ for independent $X, Y$” |
| The variance of a discrete random variable is Var(X) = E[X^2] - (E[X])^2, where moments are computed as probability-weighted sums over the … | formula | tagged | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |
| To find the distribution of the difference of two independent, identically distributed discrete losses, enumerate all pairs of outcomes, mu… | procedure | missing |  |
| The variance of an estimator W is Var(W) = E[W^2] - (E[W])^2, where E[W^2] is obtained by taking the expectation of the squared estimator o… | formula | tagged | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |

</details>

<details><summary><code>masi-2018f-q17</code> · gap</summary>

Tagged pages: Minimum Variance, Maximum Likelihood Estimation, Normal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A minimum variance unbiased estimator (MVUE) is an unbiased estimator of a parameter that has the smallest variance among all unbiased esti… | definition | tagged | Minimum Variance: “The **UMVUE** (Uniformly Minimum Variance Unbiased Estimator) achieves minimum variance simultaneou…” |
| An unbiased estimator that is a function of a complete sufficient statistic is the MVUE (Lehmann-Scheffé theorem). | fact | tagged | Minimum Variance: “By the Lehmann–Scheffé theorem, an unbiased function of a **complete sufficient statistic** is the …” |
| For a random sample from a normal distribution with known mean, the sum of squared observations is a complete sufficient statistic for the … | fact | missing |  |
| For a normal sample with known mean mu, the MVUE of the variance is (1/n) times the sum of (X_i - mu)^2; with mu = 0 this is the sum of X_i… | formula | missing |  |
| An estimator is unbiased if its expected value equals the parameter; since E[X^2] = Var(X) + (E[X])^2 = sigma^2 when the mean is 0, the ave… | fact | linked | Unbiasedness: “An estimator $\hat{\theta}$ of a parameter $\theta$ is **unbiased** if its expected value equals th…” |

</details>

<details><summary><code>masi-2018f-q18</code> · gap</summary>

Tagged pages: Exponential Distribution, Method of Moments

| Item | Kind | Status | Where |
|---|---|---|---|
| Method of moments estimates distribution parameters by setting the theoretical moments (e.g., the mean) of the fitted distribution equal to… | procedure | tagged | Method of Moments: “The **Method of Moments** (MoM) estimates parameters by setting the sample moments equal to the the…” |
| For grouped data with losses assumed uniform within each interval, approximate each observation by its interval midpoint and compute the sa… | procedure | missing |  |
| The mean of an exponential distribution with scale parameter theta equals theta, so the method of moments estimate of theta is the sample m… | fact | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| For an exponential distribution with mean theta, the survival function is S(x) = P(X > x) = exp(-x/theta). | formula | tagged | Exponential Distribution: “Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponentia…” |

</details>

<details><summary><code>masi-2018f-q19</code> · gap</summary>

Tagged pages: Percentile, Parameter Estimation

| Item | Kind | Status | Where |
|---|---|---|---|
| The loglogistic CDF is F(x) = (x/θ)^γ / (1 + (x/θ)^γ), so setting F(π_p) = p gives (π_p/θ)^γ = p/(1-p). | formula | missing |  |
| Percentile matching: estimate parameters by setting the model's theoretical percentiles equal to the sample (empirical) percentiles at the … | procedure | elsewhere | Percentile Matching: “**Percentile Matching** estimates the parameters of a model by making its [[Percentile\\|percentiles…” |
| The smoothed empirical percentile of a sample of size n at level p is found at order-statistic position (n+1)p, interpolating linearly betw… | formula | elsewhere | Percentile Matching: “$\hat\pi_g$ is the **smoothed empirical percentile**: locate position $(n+1)g$ among the [[Order St…” |
| With two percentile equations in two unknowns, divide one equation by the other to eliminate the scale parameter θ, solve for the shape par… | procedure | elsewhere | Percentile Matching: “The exponential, [[Weibull Distribution\\|Weibull]] and loglogistic give equations that can be solve…” |

</details>

<details><summary><code>masi-2018f-q2</code> · answerable</summary>

Tagged pages: Poisson Process, Poisson Distribution, Nonhomogeneous Poisson Process, Intensity Function

| Item | Kind | Status | Where |
|---|---|---|---|
| The k-th event time exceeds t exactly when fewer than k events have occurred by time t, i.e., T_k > t if and only if N(t) ≤ k−1. | fact | linked | Gamma: “The identity is just a restatement: "the 3rd claim has not arrived by time 1" is the same event as …” |
| A non-homogeneous Poisson process has a time-dependent rate function λ(t), and its increments are independent Poisson counts. | definition | tagged | Nonhomogeneous Poisson Process: “A **Nonhomogeneous Poisson Process** (NHPP) is a [[Poisson Process]] whose rate changes with time: …” |
| In a non-homogeneous Poisson process, the number of events in (s, t] is Poisson with mean equal to the integral of λ(u) from s to t, so N(t… | formula | tagged | Nonhomogeneous Poisson Process: “$$N(b) - N(a) \sim \text{Poi}\!\left(\int_a^b \lambda(u)\,du\right)$$” |
| For a Poisson random variable with mean μ, Pr[N=n] = e^{-μ} μ^n / n!. | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |

</details>

<details><summary><code>masi-2018f-q20</code> · untagged</summary>

Tagged pages: Maximum Likelihood Estimation, Exponential Distribution, Censoring

| Item | Kind | Status | Where |
|---|---|---|---|
| To build a likelihood with censored data, each uncensored observation contributes its density f(x) and each right-censored observation (cap… | procedure | tagged | Maximum Likelihood Estimation: “**[[Censoring]]**: observation is known to exceed some value $c$; contribute $P(X > c \mid \theta) …” |
| A claim whose payment is capped at the policy limit is right-censored: its true size is known only to be at least the limit. | definition | elsewhere | Policy Limit: “A limit right-censors the loss. The variable $X \wedge u$ has a point mass of $S(u)$ at $u$, and a …” |
| An exponential distribution with mean θ has density f(x) = (1/θ)e^{-x/θ} and survival function S(x) = e^{-x/θ}. | formula | tagged | Exponential Distribution: “$$f(x) = \frac{1}{\theta}\,e^{-x/\theta}, \quad x > 0$$” |
| The maximum likelihood estimate is found by maximizing the log-likelihood: take its derivative with respect to the parameter, set it to zer… | procedure | tagged | Maximum Likelihood Estimation: “When the maximum is at an interior point and the log-likelihood is differentiable, the MLE solves t…” |
| For an exponential distribution with censored data, the MLE of the mean θ equals total observed exposure (sum of uncensored values plus cen… | fact | tagged | Censoring: “Taking the log and differentiating: $\ell(\theta) = -2\ln\theta - 9/\theta$; $\ell'(\theta) = -2/\t…” |

</details>

<details><summary><code>masi-2018f-q21</code> · untagged</summary>

Tagged pages: Hypothesis Testing, Likelihood Ratio Test

| Item | Kind | Status | Where |
|---|---|---|---|
| The Neyman-Pearson lemma states that for testing a simple null hypothesis against a simple alternative, the most powerful test at a given s… | fact | elsewhere | Neyman-Pearson Lemma: “reject $H_0$ where the likelihood ratio $L(\mathbf{x}) = f_0(\mathbf{x})/f_1(\mathbf{x})$ is small.” |
| For independent samples from two populations, form the joint likelihood as the product of the individual densities over all observations in… | procedure | elsewhere | Neyman-Pearson Lemma: “$f_0$ and $f_1$ are the joint densities (or PMFs) of the sample under each hypothesis; for a [[Rand…” |
| Simplify the likelihood ratio, take the natural log (a monotone increasing transformation), and absorb constant terms into the critical val… | procedure | elsewhere | Neyman-Pearson Lemma: “**In practice** the inequality $L \le k$ simplifies to a condition on a [[Sufficient Statistic\\|suf…” |
| Dividing or multiplying an inequality by a positive constant preserves its direction, and ln of a product equals the sum of logs, so the lo… | fact | elsewhere | Maximum Likelihood Estimation: “Taking the log turns the product into a sum and simplifies maximization” |

</details>

<details><summary><code>masi-2018f-q22</code> · gap</summary>

Tagged pages: Hypothesis Testing, p-Value

| Item | Kind | Status | Where |
|---|---|---|---|
| When observations come in dependent matched pairs, form the within-pair differences and apply a one-sample t-test to those differences (pai… | procedure | missing |  |
| The paired t statistic is t = d̄ / (s_d/√n), where d̄ is the mean of the differences, s_d is their sample standard deviation (divisor n−1),… | formula | elsewhere | Student's t-Distribution: “for a sample of size $n$ from $N(\mu, \sigma^2)$ with [[Sample Mean\\|sample mean]] $\bar{X}$ and [[…” |
| Under H0 with normally distributed differences, the paired t statistic follows a t distribution with n−1 degrees of freedom. | fact | linked | Sampling Distribution: “\\| $T = \dfrac{\bar{X} - \mu}{S/\sqrt{n}}$ \\| $t_{n-1}$ \\| Mean test, unknown $\sigma$ \\|” |
| For a two-sided alternative, the p-value is twice the one-tailed tail probability beyond \|t\|, which can be bracketed using a t table's cr… | procedure | tagged | p-Value: “the two-sided p-value is twice the one-sided one for a symmetric [[Sampling Distribution]]” |

</details>

<details><summary><code>masi-2018f-q23</code> · untagged</summary>

Tagged pages: Hypothesis Testing, Critical Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The chi-square goodness-of-fit statistic is the sum over categories of (observed - expected)^2 / expected. | formula | elsewhere | Chi-Square Goodness-of-Fit Test: “$$Q = \sum_{j=1}^{k} \frac{(O_j - E_j)^2}{E_j}$$” |
| Under a null hypothesis of equally likely outcomes, the expected count in each category equals the total number of trials divided by the nu… | procedure | elsewhere | Chi-Square Goodness-of-Fit Test: “$$E_j = n\,p_j = n\left[F(c_j) - F(c_{j-1})\right]$$” |
| For a chi-square goodness-of-fit test with k categories and no estimated parameters, the degrees of freedom are k - 1. | fact | elsewhere | Chi-Square Goodness-of-Fit Test: “A fully specified model ($r = 0$) has $k - 1$” |
| Reject the null hypothesis when the chi-square statistic exceeds the critical value of the chi-square distribution at the chosen significan… | procedure | elsewhere | Chi-Square Goodness-of-Fit Test: “Reject $H_0$ at level $\alpha$ when $Q$ exceeds the upper-$\alpha$ [[Critical Value\\|critical value…” |
| The observed frequencies across all categories sum to the total number of trials, so an unknown frequency can be found by subtracting the k… | fact | elsewhere | Chi-Square Goodness-of-Fit Test: “One is lost because the counts must sum to $n$” |

</details>

<details><summary><code>masi-2018f-q24</code> · gap</summary>

Tagged pages: Transformations of Random Variables, Exponential Distribution, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| A distribution function of the form F(y) = 1 - e^{-λy} for y > 0 identifies an exponential distribution with rate λ (mean 1/λ). | fact | tagged | Exponential Distribution: “Some texts parameterize by **rate** $\lambda = 1/\theta$, so $f(x) = \lambda e^{-\lambda x}$ and $E…” |
| Expectation is linear: E[aW + b] = aE[W] + b, so the mean of a linear transformation of e^Y can be computed from E[e^Y]. | fact | tagged | Expected Value: “It is linear: $E[aX + b] = aE[X] + b$” |
| The moment generating function of a random variable Y is M_Y(t) = E[e^{tY}], so E[e^Y] equals M_Y(1). | definition | linked | Moment: “Where the moment generating function $M_X(t) = E[e^{tX}]$ exists” |
| For an exponential distribution with rate λ, the moment generating function is M(t) = λ/(λ - t) for t < λ. | formula | missing |  |

</details>

<details><summary><code>masi-2018f-q25</code> · untagged</summary>

Tagged pages: Order Statistics, Bias, Uniform Continuous Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The k-th order statistic of a sample is the k-th smallest value in the sample, so the second smallest value is the k = 2 order statistic. | definition | tagged | Order Statistics: “the $k$-th order statistic $X_{(k)}$ is the $k$-th smallest value.” |
| For a sample of size n from Uniform(0, θ), the expected value of the k-th order statistic is kθ/(n+1). | fact | tagged | Order Statistics: “For the $\text{Uniform}(0,1)$ distribution: $E[X_{(k)}] = \dfrac{k}{n+1}$” |
| The mean of a Uniform(0, θ) distribution is θ/2. | fact | elsewhere | Parameter Estimation (collapsed): “$E[X] = \theta/2$, so $\tilde{\theta} = 2\bar{x} = 2(5) = 10$.” |
| The bias of an estimator is its expected value minus the true value of the quantity being estimated. | definition | tagged | Bias: “$$\text{Bias}(\hat\theta) = E[\hat\theta] - \theta$$” |

</details>

<details><summary><code>masi-2018f-q26</code> · answerable</summary>

Tagged pages: Generalized Linear Model, Link Function, Normal Distribution, Parameter Estimate Tables

| Item | Kind | Status | Where |
|---|---|---|---|
| The probit link function is the inverse standard normal CDF, g(π) = Φ^{-1}(π), so the linear predictor η equals Φ^{-1}(π). | definition | tagged | Link Function: “\\| Probit \\| $\Phi^{-1}(\mu)$ \\| $\Phi(\eta)$ \\| Binary outcomes \\|” |
| Under a probit link, the modeled probability is the standard normal CDF of the linear predictor: π = Φ(η) = Φ(β0 + β1x1 + ... + βpxp). | formula | tagged | Link Function: “\\| Probit \\| $\Phi^{-1}(\mu)$ \\| $\Phi(\eta)$ \\| Binary outcomes \\|” |
| Compute the linear predictor by summing the intercept and the coefficients for the policy's categorical levels (baseline levels with coeffi… | procedure | tagged | Generalized Linear Model (collapsed): “$$\ln\hat{\mu} = -2.1 + 0.04(30) = -2.1 + 1.2 = -0.9$$” |
| A categorical level with df = 0 and coefficient 0 is the baseline level; it contributes nothing to the linear predictor, and a policy's cha… | fact | tagged | Parameter Estimate Tables: “The **reference level** of a categorical predictor is absorbed into the intercept; other levels are…” |

</details>

<details><summary><code>masi-2018f-q27</code> · gap</summary>

Tagged pages: Link Function, Generalized Linear Model

| Item | Kind | Status | Where |
|---|---|---|---|
| A link function in a GLM is a function g that relates the mean of the response to the linear predictor, g(μ) = Xβ. | definition | tagged | Link Function: “A **Link Function** $g$ is a monotone, differentiable function in a [[Generalized Linear Model]] th…” |
| A GLM link function must be monotonic (strictly increasing or decreasing) and differentiable so that it is invertible and the mean can be u… | fact | tagged | Link Function: “A **Link Function** $g$ is a monotone, differentiable function in a [[Generalized Linear Model]] th…” |
| A quadratic function is not monotonic over the whole real line, and the absolute value function is V-shaped and not monotonic, so neither i… | fact | missing |  |
| A linear function with nonzero slope is strictly monotonic (increasing or decreasing) and invertible, so it is a valid link function even i… | fact | missing |  |

</details>

<details><summary><code>masi-2018f-q28</code> · answerable</summary>

Tagged pages: Multinomial Logistic Regression, Logistic Regression, Generalized Linear Model, Link Function

| Item | Kind | Status | Where |
|---|---|---|---|
| In a multinomial (generalized) logistic regression with a reference category, each non-reference category's log-odds is the log of the rati… | definition | tagged | Multinomial Logistic Regression: “$$\ln\!\left(\frac{\pi_j}{\pi_J}\right) = \beta_{0j} + \beta_{1j}x_1 + \cdots + \beta_{pj}x_p$$” |
| For a multinomial logit with reference category 1 and non-reference log-odds η_j, the probability of non-reference category j is exp(η_j) /… | formula | tagged | Multinomial Logistic Regression: “$$\pi_j = \frac{e^{\eta_j}}{1 + \sum_{k=1}^{J-1} e^{\eta_k}}$$” |
| Category probabilities in a multinomial model sum to 1, so the reference category's probability is determined by the other categories' odds… | fact | tagged | Multinomial Logistic Regression: “$\pi_j = P(Y = j \mid \mathbf{x})$, the probabilities sum to $1$” |

</details>

<details><summary><code>masi-2018f-q29</code> · answerable</summary>

Tagged pages: Residual, Ordinary Least Squares, Fitted Values

| Item | Kind | Status | Where |
|---|---|---|---|
| In simple linear regression the OLS slope estimate equals the sum of cross-deviations S_xy = Σ(x_i − x̄)(y_i − ȳ) divided by S_xx = Σ(x_i −… | formula | tagged | Ordinary Least Squares: “**Simple regression**: $\hat\beta_1 = S_{xy}/S_{xx}$ and $\hat\beta_0 = \bar{y} - \hat\beta_1\bar{x…” |
| The OLS intercept estimate equals the sample mean of y minus the slope estimate times the sample mean of x. | formula | tagged | Ordinary Least Squares: “**Simple regression**: $\hat\beta_1 = S_{xy}/S_{xx}$ and $\hat\beta_0 = \bar{y} - \hat\beta_1\bar{x…” |
| The fitted value for an observation is the regression line's prediction at that observation's x value, ŷ = β̂0 + β̂1 x. | definition | linked | Linear Regression (collapsed): “$$\hat{y} = 25.8 + 1.6x \ \Longrightarrow\ \hat{y}(15) = 25.8 + 24 = 49.8$$” |
| A residual is the observed response minus the fitted value, e_i = y_i − ŷ_i. | definition | tagged | Residual: “A **residual** is the part of an observation a fitted model does not explain: the observed value mi…” |

</details>

<details><summary><code>masi-2018f-q3</code> · answerable</summary>

Tagged pages: Poisson Process, Binomial Distribution, Poisson Superposition

| Item | Kind | Status | Where |
|---|---|---|---|
| In the superposition of independent Poisson processes, the combined process is Poisson with rate equal to the sum of the rates. | fact | tagged | Poisson Process: “**Superposition**: two independent Poisson processes with rates $\lambda_1$ and $\lambda_2$ combine…” |
| In a superposition of independent Poisson processes, each successive event comes from process i with probability equal to its rate divided … | fact | tagged | Poisson Superposition: “each event of the merged process came from stream $i$ with probability $\lambda_i/\lambda$, indepen…” |
| To find the probability that one process reaches n events before another reaches m events, consider the first n+m-1 combined events; the fi… | procedure | tagged | Poisson Superposition: “this happens exactly when at least $n$ of the first $n+m-1$ merged events are type 1, so with $p = …” |
| The binomial probability of exactly k successes in N independent trials with success probability p is C(N,k) p^k (1-p)^(N-k). | formula | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |

</details>

<details><summary><code>masi-2018f-q30</code> · answerable</summary>

Tagged pages: R-Squared, Residual Sum of Squares, Model Output

| Item | Kind | Status | Where |
|---|---|---|---|
| Adjusted R^2 equals 1 - (1 - R^2)(n - 1)/(n - p - 1), where n is the number of observations and p the number of predictors (excluding the i… | formula | tagged | R-Squared: “$$R^2_{\text{adj}} = 1 - \frac{\text{SS}_\text{Res}/(n-p-1)}{\text{SS}_\text{Tot}/(n-1)}$$” |
| In a linear regression with an intercept and p predictors, the residual degrees of freedom equal n - p - 1, so n can be recovered from the … | fact | linked | ANOVA: “\\| Residual (Error) \\| $\text{RSS} = \sum(y_i - \hat y_i)^2$ \\| $n-p-1$ \\| $\text{MSE} = \text{RSS}…” |
| Read the regression software output to identify the number of predictors (numerator DF of the F-statistic), the residual degrees of freedom… | procedure | linked | ANOVA: “$F = \text{MSR}/\text{MSE} \sim F_{p,\, n-p-1}$ under $H_0: \beta_1 = \cdots = \beta_p = 0$” |

</details>

<details><summary><code>masi-2018f-q31</code> · gap</summary>

Tagged pages: AIC, Deviance, Generalized Linear Model, Model Selection

| Item | Kind | Status | Where |
|---|---|---|---|
| Two GLMs are nested when the simpler model's explanatory variables are a subset of the more complex model's variables; models that each con… | definition | missing |  |
| The likelihood ratio test, deviance comparison (difference in deviances), F-test, and chi-square difference test for comparing GLMs are val… | fact | linked | Likelihood Ratio Test: “Models must be **nested** and fitted to the *same* data; comparing non-nested models needs [[AIC]] …” |
| Penalized information criteria such as AIC can be used to compare non-nested models, including models with different numbers of parameters,… | fact | tagged | AIC: “AIC does **not** require models to be nested, unlike likelihood ratio tests” |
| AIC = -2 × (log likelihood) + 2 × (number of parameters); the model with the lower AIC is preferred. | formula | tagged | AIC: “$$\text{AIC} = -2\ell(\hat{\boldsymbol{\beta}}) + 2p$$” |

</details>

<details><summary><code>masi-2018f-q32</code> · answerable</summary>

Tagged pages: R-Squared, Hypothesis Testing, Residual Sum of Squares, ANOVA

| Item | Kind | Status | Where |
|---|---|---|---|
| In a linear regression, the residual (error) sum of squares equals the total sum of squares minus the regression sum of squares (TSS = RegS… | formula | tagged | Residual Sum of Squares: “**Decomposition**: $\text{SS}_{\text{Tot}} = \text{SS}_{\text{Reg}} + \text{RSS}$, where $\text{SS}…” |
| The overall F-statistic for testing that all slope coefficients are zero is F = (RegSS/p) / (RSS/(n - p - 1)), where p is the number of pre… | formula | tagged | ANOVA: “$F = \text{MSR}/\text{MSE} \sim F_{p,\, n-p-1}$ under $H_0: \beta_1 = \cdots = \beta_p = 0$ — the o…” |
| The residual degrees of freedom in a multiple regression with an intercept and p predictors is n - p - 1, and the regression degrees of fre… | fact | tagged | ANOVA: “\\| Residual (Error) \\| $\text{RSS} = \sum(y_i - \hat y_i)^2$ \\| $n-p-1$ \\| $\text{MSE} = \text{RSS}…” |
| The null hypothesis that all slope coefficients equal zero (no predictor has a linear relationship with the response) is tested using the o… | definition | tagged | ANOVA: “$F = \text{MSR}/\text{MSE} \sim F_{p,\, n-p-1}$ under $H_0: \beta_1 = \cdots = \beta_p = 0$ — the o…” |

</details>

<details><summary><code>masi-2018f-q33</code> · gap</summary>

Tagged pages: Cross-Validation, Model Selection, Mean Square Error

| Item | Kind | Status | Where |
|---|---|---|---|
| In k-fold cross validation, compute each candidate model's average test MSE across the k folds and select the model with the lowest average. | procedure | tagged | Cross-Validation: “$$\text{CV}_{(k)} = \frac{1}{k}\sum_{j=1}^{k} \text{MSE}_j$$” |
| The predicted value from a multiple linear regression is the intercept plus the sum of each coefficient times its predictor value. | formula | linked | Linear Regression: “$$Y_i = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip} + \varepsilon_i, \qquad \varepsilon_i \s…” |
| An interaction term in a regression enters the prediction as its coefficient times the product of the two interacting predictors' values. | fact | elsewhere | Interaction: “$$\eta = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \beta_3 (x_1 \times x_2)$$” |
| Predictors not included in the selected model do not contribute to its prediction, so their values are ignored. | fact | missing |  |

</details>

<details><summary><code>masi-2018f-q34</code> · answerable</summary>

Tagged pages: R-Squared, Variance, Multicollinearity

| Item | Kind | Status | Where |
|---|---|---|---|
| The variance inflation factor (VIF) of a regression coefficient measures how much the variance of its estimator is inflated by collinearity… | definition | tagged | Multicollinearity: “$\text{VIF}_j$ is the factor by which the other predictors inflate it” |
| The VIF of coefficient j equals the ratio of the variance of its estimator in the full multiple regression to the variance in the simple re… | formula | tagged | Multicollinearity: “so $\sigma^2/S_{jj}$ is $\text{Var}(\hat\beta_j)$ when $x_j$ is the only predictor, and $\text{VIF}…” |
| The variance of a coefficient estimator is the square of its standard error, so variances can be compared by squaring standard errors. | fact | linked | Parameter Estimate Tables: “Estimated standard deviation of $\hat{\beta}$” |
| A simple regression on a single predictor has no collinearity with other predictors, so its coefficient standard error serves as the no-inf… | fact | tagged | Multicollinearity: “so $\sigma^2/S_{jj}$ is $\text{Var}(\hat\beta_j)$ when $x_j$ is the only predictor” |

</details>

<details><summary><code>masi-2018f-q35</code> · answerable</summary>

Tagged pages: Residual, Hat Matrix, Fitted Values, Linear Algebra

| Item | Kind | Status | Where |
|---|---|---|---|
| The hat matrix is H = X(X^T X)^{-1} X^T, the matrix that projects the response vector onto the column space of the design matrix. | definition | tagged | Hat Matrix: “$$\mathbf{H} = \mathbf{X}(\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top$$” |
| The fitted values of a linear regression are obtained by multiplying the hat matrix by the response vector, so y-hat = Hy and each fitted v… | fact | tagged | Hat Matrix: “$$\hat{\mathbf{y}} = \mathbf{H}\mathbf{y}$$” |
| The residual for an observation is the observed response minus its fitted value, e_i = y_i - y-hat_i. | definition | linked | Residual Plot: “$$e_i = y_i - \hat{y}_i \quad \text{(raw residual)}$$” |
| The least squares estimator of the coefficient vector is beta-hat = (X^T X)^{-1} X^T y, and fitted values equal X times beta-hat. | formula | tagged | Hat Matrix: “Substituting $\hat{\boldsymbol\beta} = (\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top\mathbf{y}$ i…” |

</details>

<details><summary><code>masi-2018f-q36</code> · answerable</summary>

Tagged pages: Local Regression, Regression Spline

| Item | Kind | Status | Where |
|---|---|---|---|
| In local regression (loess), the span s is the fraction of the observations used in each local fit, and it controls the smoothness of the f… | definition | tagged | Local Regression: “Gather the fraction $s = k/n$ of training points whose $x_i$ are closest to $x_0$.” |
| A larger span in local regression averages over more data points and gives a smoother, less variable fit, while a smaller span follows loca… | fact | tagged | Local Regression: “The smaller $s$ is, the more local and wiggly the fit. A very large $s$ gives a global fit that use…” |
| Knots and the order of the piecewise polynomial are tuning features of splines and piecewise polynomial regression, not of local regression… | fact | tagged | Regression Spline: “A **regression spline** fits separate low-degree polynomials over regions of $X$ separated by **kno…” |

</details>

<details><summary><code>masi-2018f-q37</code> · answerable</summary>

Tagged pages: Regularization, Bias-Variance Tradeoff, Test Error, Mean Square Error

| Item | Kind | Status | Where |
|---|---|---|---|
| The lasso estimates regression coefficients by minimizing the residual sum of squares plus a penalty equal to lambda times the sum of the a… | definition | tagged | Regularization: “$$\text{Lasso:}\quad \min_{\beta}\ \mathrm{RSS} + \lambda\sum_{j=1}^{p}\lvert\beta_j\rvert$$” |
| As the lasso tuning parameter lambda increases, coefficients shrink toward (and some become exactly) zero, so the model becomes less flexib… | fact | tagged | Regularization: “$\lambda = 0$ returns least squares; $\lambda \to \infty$ drives every coefficient to zero.” |
| Training MSE decreases as model flexibility increases, so as lambda increases (flexibility decreases) the training MSE rises monotonically … | fact | tagged | Bias-Variance Tradeoff: “Training error is not a guide — it falls monotonically with complexity.” |
| Test MSE is U-shaped as a function of flexibility (or lambda): it first falls as variance is reduced, then rises as bias grows. | fact | tagged | Test Error: “By the [[Bias-Variance Tradeoff\\|bias-variance tradeoff]], test error is U-shaped in flexibility: b…” |

</details>

<details><summary><code>masi-2018f-q38</code> · answerable</summary>

Tagged pages: Principal Components Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| The first principal component is the linear combination of the variables (direction in variable space) along which the data have maximum va… | definition | tagged | Principal Components Analysis: “**First principal component** — the direction $\mathbf{z}_1 = \mathbf{X}\boldsymbol{\phi}_1$ that m…” |
| The second principal component is the direction of maximum remaining variance among those uncorrelated with (orthogonal/perpendicular to) t… | fact | tagged | Principal Components Analysis: “PCs are **orthogonal** — each successive PC captures the maximum remaining variance” |
| Principal components are linear combinations of the original variables, so they are represented as straight lines (directions), not curves. | fact | linked | Principal Components Regression: “$$Z_m = \sum_{j=1}^{p} \phi_{jm} X_j$$” |
| To identify principal components on a scatterplot, find the axis along which the cloud is most elongated for PC1, then draw PC2 perpendicul… | procedure | tagged | Principal Components Analysis: “PCs are **orthogonal** — each successive PC captures the maximum remaining variance” |

</details>

<details><summary><code>masi-2018f-q39</code> · answerable</summary>

Tagged pages: Variable Selection, AIC, Model Selection

| Item | Kind | Status | Where |
|---|---|---|---|
| AIC = 2p − 2·(log-likelihood), where p is the number of estimated parameters including the intercept; the model with the lowest AIC is pref… | formula | tagged | AIC: “$$\text{AIC} = -2\ell(\hat{\boldsymbol{\beta}}) + 2p$$” |
| Best subset selection fits all possible models of each size k, picks the best model of each size (highest R-squared), then compares the bes… | procedure | tagged | Variable Selection: “Fit every combination of the $p$ predictors; keep the best model of each size (lowest RSS, or lowes…” |
| Forward stepwise selection starts with the intercept-only model and at each step adds the one predictor that most improves the fit (highest… | procedure | tagged | Variable Selection: “Start with no predictors; at each step add the one that most improves the fit; choose among the res…” |
| Forward stepwise considers far fewer models than best subset and its path is nested, so it may miss the best model of a given size; best su… | fact | tagged | Variable Selection: “Best subset selection fits all $2^p$ models; forward and backward stepwise each fit only $1 + p(p+1…” |
| R-squared never decreases when predictors are added, so it can only be used to compare models with the same number of parameters; AIC is ne… | fact | tagged | Variable Selection: “Compare models with different numbers of predictors via [[AIC]] (or $C_p$), [[BIC]], adjusted $R^2$…” |

</details>

<details><summary><code>masi-2018f-q4</code> · answerable</summary>

Tagged pages: Aggregate Loss Model, Poisson Distribution, Variance, Compound Poisson Process

| Item | Kind | Status | Where |
|---|---|---|---|
| A compound Poisson aggregate loss is the sum of a Poisson-distributed number of independent, identically distributed claim severities, inde… | definition | tagged | Compound Poisson Process: “The severities $X_1, X_2, \ldots$ are i.i.d., independent of the counting process $N(t)$” |
| For a Poisson process with rate per unit time, the number of claims over a period of length t is Poisson with mean equal to the rate times … | fact | linked | Poisson Process: “The number of events in any interval of length $t$ has distribution $\text{Poi}(\lambda t)$” |
| For a compound Poisson sum X with Poisson mean λ and severity W, Var(X) = λ·E[W^2]. | formula | tagged | Compound Poisson Process: “$$E[S(t)] = \lambda t\, E[X], \qquad \text{Var}(S(t)) = \lambda t\, E[X^2]$$” |
| For a discrete random variable, the k-th raw moment is E[W^k] = Σ p_i · w_i^k, summing over outcome probabilities times outcome values to t… | formula | prerequisite | Moment: “For a discrete variable the integral becomes $\sum_x x^n\,p(x)$.” |

</details>

<details><summary><code>masi-2018f-q40</code> · answerable</summary>

Tagged pages: Regression Spline

| Item | Kind | Status | Where |
|---|---|---|---|
| A cubic spline with knots is a piecewise cubic polynomial, typically written with a global cubic plus truncated power basis terms (x - knot… | definition | tagged | Regression Spline: “One way to represent a cubic spline is to start from $X, X^2, X^3$ and add one $h(X, \xi_k)$ for ea…” |
| The truncated power function (x - xi)_+^3 equals (x - xi)^3 when x > xi and 0 otherwise. | definition | tagged | Regression Spline: “$$h(x, \xi) = (x - \xi)_+^3 = \begin{cases} (x - \xi)^3 & \text{if } x > \xi \\ 0 & \text{otherwise…” |
| A cubic spline is constrained to have continuous first and second derivatives at each knot, so the function, its first derivative and its s… | fact | tagged | Regression Spline: “Adding $\beta\,h(x, \xi)$ to a cubic creates a discontinuity only in the *third* derivative at $\xi…” |
| To check continuity of f and its derivatives at a knot, differentiate the truncated term (3(x-xi)^2, 6(x-xi)) and evaluate each at the knot… | procedure | tagged | Regression Spline (collapsed): “At $x = 3$ the term $-0.012(x - 3)^3$ is $0$, and so are its first derivative $-0.036(x - 3)^2$ and…” |

</details>

<details><summary><code>masi-2018f-q5</code> · untagged</summary>

Tagged pages: Survival Model, Hazard Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The survival function S(x) gives the probability that a lifetime exceeds x, i.e., S(x) = Pr[X > x]. | definition | tagged | Survival Model: “$$S(t) = P(T > t)$$” |
| The probability that a lifetime falls between ages a and b is S(a) - S(b), since Pr[a < X < b] = Pr[X > a] - Pr[X > b]. | formula | elsewhere | Future Lifetime Random Variable: “$${}_{u\\|t}q_x = {}_up_x - {}_{u+t}p_x$$” |
| The conditional probability of failing between ages a and b given survival to age x is [S(a) - S(b)] / S(x), for x ≤ a. | formula | tagged | Survival Model: “$_{t}p_x = \dfrac{S(x+t)}{S(x)}$” |
| Time measured from today must be converted to age by adding the current age, and all time units must be made consistent (e.g., convert mont… | procedure | tagged | Survival Model: “$_{t}p_x = \dfrac{S(x+t)}{S(x)}$ and $_{t}q_x = 1 - {_t}p_x$” |

</details>

<details><summary><code>masi-2018f-q6</code> · gap</summary>

Tagged pages: System Reliability, Stochastic Processes

| Item | Kind | Status | Where |
|---|---|---|---|
| A system's structure function/reliability is the probability that the system functions, expressed as a function of the independent componen… | definition | tagged | System Reliability: “$$r(\mathbf{p}) = P\big(\phi(\mathbf{X}) = 1\big) = E\big[\phi(\mathbf{X})\big]$$” |
| For independent components in series, system reliability is the product of the component reliabilities. | formula | tagged | System Reliability: “**Series** (works only if all work): $\phi = \prod x_i$ and $r = \prod p_i$.” |
| For independent components in parallel, system reliability is one minus the product of the component failure probabilities. | formula | tagged | System Reliability: “**Parallel** (works if any works): $\phi = 1 - \prod(1 - x_i)$ and $r = 1 - \prod(1 - p_i)$.” |
| Reduce a complex series-parallel system by computing the reliability of each sub-block (series chains and parallel groups) and combining bl… | procedure | tagged | System Reliability (collapsed): “If it works, the system is (1 or 2) in series with (4 or 5); if not, it is $\{1,4\}$ in parallel wi…” |
| The reliability (Birnbaum) importance of a component is the change in system reliability per unit change in that component's reliability, i… | definition | missing |  |
| To decide which component to upgrade, compute for each candidate the system reliability after replacing its probability with the new value … | procedure | missing |  |

</details>

<details><summary><code>masi-2018f-q7</code> · gap</summary>

Tagged pages: Stochastic Processes, Combinatorics, System Reliability

| Item | Kind | Status | Where |
|---|---|---|---|
| A minimal path set is a set of components whose functioning guarantees the system functions and that has no proper subset with this propert… | definition | tagged | System Reliability: “A **minimal path set** is a set of components whose working alone makes the system work, with no pr…” |
| For a k-out-of-n system, the minimal path sets are exactly the subsets of k components, so there are C(n,k) of them. | fact | tagged | System Reliability: “A $k$-out-of-$n$ system has $\binom{n}{k}$ minimal path sets (every $k$-subset)” |
| For systems in series built from disjoint components, a minimal path set of the combined system is the union of one minimal path set from e… | fact | missing |  |
| The binomial coefficient is symmetric: C(n,k) = C(n,n-k). | fact | linked | Combination: “The identity $\binom{n}{k} = \binom{n}{n-k}$ reflects that choosing $k$ items to include is equival…” |

</details>

<details><summary><code>masi-2018f-q8</code> · gap</summary>

Tagged pages: Exponential Distribution, Uniform Continuous Distribution, System Reliability

| Item | Kind | Status | Where |
|---|---|---|---|
| A parallel system continues to function until all its components have failed, so its lifetime is the maximum of the component lifetimes. | definition | tagged | System Reliability: “**Parallel** (works if any works): $\phi = 1 - \prod(1 - x_i)$ and $r = 1 - \prod(1 - p_i)$.” |
| For a nonnegative random variable X, E[X] = ∫_0^∞ P(X > t) dt = ∫_0^∞ (1 − F(t)) dt. | formula | tagged | System Reliability: “its expected life is $\int_0^\infty r(\bar{\mathbf{F}}(t))\,dt$” |
| For independent components, the CDF of the maximum is the product of the individual CDFs, so P(max ≤ t) = F1(t)·F2(t). | fact | linked | Order Statistics: “$$P\bigl(X_{(n)} \le x\bigr) = F_1(x)\,F_2(x)\cdots F_n(x)$$” |
| A uniform (0,1) random variable has CDF F(t) = t for 0 ≤ t ≤ 1 and F(t) = 1 for t > 1. | fact | tagged | Uniform Continuous Distribution: “$F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| An exponential random variable with mean θ has CDF F(t) = 1 − e^{−t/θ} and survival function e^{−t/θ}. | fact | tagged | Exponential Distribution: “Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponentia…” |
| When a CDF is piecewise, split the integral of the survival function at the breakpoint and simplify the integrand separately on each piece. | procedure | missing |  |

</details>

<details><summary><code>masi-2018f-q9</code> · untagged</summary>

Tagged pages: Markov Chain, Transition Probability Matrix

| Item | Kind | Status | Where |
|---|---|---|---|
| A transition probability matrix P of a homogeneous Markov chain has entry P_ij equal to the probability of moving from state i to state j i… | definition | tagged | Markov Chain: “$P_{ij} \geq 0$ is the probability of moving from state $i$ to state $j$ in one step; each row sums…” |
| The probability of at least one occurrence of an event equals 1 minus the probability that it never occurs (complement rule). | fact | elsewhere | Probability Rules: “The complement rule is the workhorse shortcut — "at least one" is almost always faster as $1 - P(\t…” |
| The probability of a specific path of states in a Markov chain is the product of the successive one-step transition probabilities along the… | procedure | linked | Multi-State Model: “$$P(X_1 = \cdots = X_n = i \mid X_0 = i) = (P_{ii})^{n}$$” |
| To find the probability of avoiding a set of states over several steps, sum over all paths that stay outside that set, using only transitio… | procedure | tagged | Transition Probability Matrix (collapsed): “A claim in year 2 means landing in a state ending in C. From NN, go through NC or NN in year 1:” |

</details>

<details><summary><code>masi-2018s-q1</code> · answerable</summary>

Tagged pages: Exponential Distribution, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The exponential distribution is memoryless: Pr[T > s + t \| T > s] = Pr[T > t], so the remaining time given survival to any age has the sam… | fact | tagged | Exponential Distribution: “Its defining property is **memorylessness**: $P(X > s + t \mid X > s) = P(X > t)$, making it the un…” |
| For an exponential random variable with mean θ, the survival function is Pr[T > t] = e^{-t/θ}. | formula | tagged | Exponential Distribution: “Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponentia…” |
| To find the probability of exceeding a total time given time already elapsed, apply memorylessness by subtracting the elapsed time from the… | procedure | tagged | Exponential Distribution: “Its defining property is **memorylessness**: $P(X > s + t \mid X > s) = P(X > t)$” |

</details>

<details><summary><code>masi-2018s-q10</code> · untagged</summary>

Tagged pages: Recurrent and Transient States, Markov Chain

| Item | Kind | Status | Where |
|---|---|---|---|
| Two states of a Markov chain communicate if each is reachable from the other in some finite number of steps (positive n-step transition pro… | definition | tagged | Recurrent and Transient States: “State $j$ is *accessible* from $i$ if $P^n_{ij} > 0$ for some $n \geq 0$, and $i$ and $j$ *communic…” |
| A class of a Markov chain is an equivalence class of mutually communicating states; the state space is partitioned into classes, and a stat… | definition | tagged | Recurrent and Transient States: “Communication is an equivalence relation, so it splits the states into **classes**; the chain is **…” |
| To find the classes, read the transition matrix for which states can be reached from each state (positive entries, including via multi-step… | procedure | tagged | Recurrent and Transient States (collapsed): “Read the one-step moves off the nonzero entries: $1 \to \{1, 2\}$, $2 \to \{1, 2\}$, $3 \to \{1, 2\…” |
| A state i is absorbing if P_ii = 1, so the chain never leaves it; an absorbing state forms a class by itself. | definition | elsewhere | Transition Probability Matrix: “An **absorbing** state has $P_{ii} = 1$ — death in a [[Multi-State Model]], default in [[Credit Rat…” |
| A state that cannot be re-entered after leaving it (no path back to it) is transient and forms a singleton class. | fact | tagged | Recurrent and Transient States (collapsed): “State 3 leads to 1 and 2, but nothing leads back to it — only state 4 enters 3, and 3 cannot reach …” |

</details>

<details><summary><code>masi-2018s-q11</code> · answerable</summary>

Tagged pages: Markov Chain, Stationary Distribution, Transition Probability Matrix

| Item | Kind | Status | Where |
|---|---|---|---|
| The limiting (stationary) distribution of a Markov chain is a probability vector pi satisfying pi P = pi with entries summing to 1; for an … | definition | tagged | Markov Chain: “A **stationary distribution** $\boldsymbol{\pi}$ satisfies $\boldsymbol{\pi}P = \boldsymbol{\pi}$ w…” |
| Each row of a transition probability matrix sums to 1 because from any state the chain must move to some state. | fact | tagged | Transition Probability Matrix: “$$\sum_{j} P_{ij} = 1 \quad \text{for every row } i$$” |
| If the stationary distribution is uniform over all states, then every column of the transition matrix sums to 1 (the matrix is doubly stoch… | fact | tagged | Transition Probability Matrix: “A matrix whose columns also sum to one is *doubly stochastic*. For a chain with finitely many state…” |
| Find unknown transition probabilities by combining row-sum constraints (each row sums to 1) with the column-sum constraints implied by the … | procedure | tagged | Stationary Distribution: “$$\pi_j = \sum_i \pi_i\, P_{ij} \quad \text{for every } j$$” |

</details>

<details><summary><code>masi-2018s-q12</code> · answerable</summary>

Tagged pages: Survival Model, Whole Life Insurance, Life Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The net level annual premium for a fully discrete unit whole life insurance issued at age x is P_x = A_x / ä_x, the whole life APV divided … | formula | tagged | Whole Life Insurance: “$$P = \frac{A_x}{\ddot{a}_x}$$” |
| A_x is the actuarial present value of a unit whole life insurance paying at the end of the year of death, and ä_x is the actuarial present … | definition | tagged | Whole Life Insurance: “In the life-table model of Exam MAS-I the benefit is paid at the **end of the year of death**, and …” |
| Read A_x and ä_x for a given age from the Illustrative Life Table (at 6% interest) and compute each premium from them before taking the dif… | procedure | tagged | Whole Life Insurance: “The exam's Illustrative Life Table lists $1000A_x$, $1000\,{}^2\!A_x$ and $\ddot{a}_x$ at $i = 0.06$” |

</details>

<details><summary><code>masi-2018s-q13</code> · untagged</summary>

Tagged pages: Survival Model, Present Value, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| The actuarial present value of a benefit is the expected value of the discounted payment, i.e. the sum over possible payment times of the p… | definition | elsewhere | Long-Term Insurance Coverage: “$$\text{EPV} = \sum_{k} \text{CF}_k\, v^{k}\,\Pr(\text{CF}_k \text{ is paid})$$” |
| The probability of surviving k years from age x is the product of one-year survival probabilities (1 - q) over those years: kp_x = prod_{j=… | formula | tagged | Life Table: “Survival probabilities **multiply** across periods: $_{s+t}p_x = {}_{s}p_x \cdot {}_{t}p_{x+s}$” |
| The probability of failing (dying) in year k+1 is the probability of surviving k years times the one-year failure rate: k\|q_x = kp_x * q_{… | formula | tagged | Life Table: “$_{t\\|}q_x = {}_{t}p_x \cdot q_{x+t}$ is the probability of dying in the year *after* surviving $t$…” |
| The APV of a term insurance paying a benefit at the end of the year of death is the benefit times the sum over years k=1..N of v^k * (k-1)p… | formula | elsewhere | Term Life Insurance: “$$A^{1}_{x:\overline{n}\\|} = \sum_{k=0}^{n-1} v^{k+1}\,{}_kp_x\,q_{x+k}$$” |
| The APV of a term benefit increases with the term length, since each added year contributes a nonnegative amount; so the largest term with … | fact | elsewhere | Term Life Insurance: “$$A^{1}_{x:\overline{n}\\|} = \sum_{k=0}^{n-1} v^{k+1}\,{}_kp_x\,q_{x+k}$$” |

</details>

<details><summary><code>masi-2018s-q14</code> · answerable</summary>

Tagged pages: Rejection Method, Uniform Continuous Distribution, Probability Density Function (PDF)

| Item | Kind | Status | Where |
|---|---|---|---|
| In the acceptance-rejection method, generate a proposal Y from density g and an independent uniform U on (0,1), accept Y (set X = Y) if U ≤… | procedure | tagged | Rejection Method: “(1) generate $Y$ from $g$; (2) generate $U$ from a [[Uniform Continuous Distribution\\|Uniform]]$(0,…” |
| The rejection constant c is the maximum over the support of f(x)/g(x), so that f(x) ≤ c·g(x) for all x. | formula | tagged | Rejection Method: “The smallest valid constant, $c = \max_x f(x)/g(x)$, is therefore the best one” |
| To find the maximum of a density (or ratio f/g) on an interval, set its derivative equal to zero, solve for the critical point, and evaluat… | procedure | tagged | Rejection Method: “$c$ is the maximum of the density, $c = \max_x f(x)$, found by setting $f'(x) = 0$.” |
| When the proposal density g is uniform on (0,1), g(x) = 1, so the ratio f/g equals f and c equals the maximum of f. | fact | tagged | Rejection Method: “**With $g$ uniform on $(0, 1)$:** $g(x) = 1$, so $c$ is the maximum of the density, $c = \max_x f(x…” |

</details>

<details><summary><code>masi-2018s-q15</code> · untagged</summary>

Tagged pages: Maximum Likelihood Estimation, Exponential Distribution, Censoring

| Item | Kind | Status | Where |
|---|---|---|---|
| A policy limit right-censors the loss data: a payment equal to the limit indicates only that the underlying loss was at least the limit, wh… | definition | elsewhere | Policy Limit: “A limit right-censors the loss. The variable $X \wedge u$ has a point mass of $S(u)$ at $u$, and a …” |
| The likelihood for censored data is the product of the density at each exact observation and the survival function at each censored observa… | procedure | tagged | Maximum Likelihood Estimation: “**[[Censoring]]**: observation is known to exceed some value $c$; contribute $P(X > c \mid \theta) …” |
| For an exponential distribution with right-censored data, the MLE of the mean is the sum of all observed values (censored ones at their cen… | formula | tagged | Censoring: “Taking the log and differentiating: $\ell(\theta) = -2\ln\theta - 9/\theta$; $\ell'(\theta) = -2/\t…” |

</details>

<details><summary><code>masi-2018s-q16</code> · gap</summary>

Tagged pages: Maximum Likelihood Estimation, Normal Distribution, Fisher Information

| Item | Kind | Status | Where |
|---|---|---|---|
| The Fisher information of a parameter is the expected value of the negative second derivative of the log-density (log-likelihood) with resp… | definition | tagged | Fisher Information: “$$I(\theta) = E\!\left[\left(\frac{\partial}{\partial\theta}\ln f(X\mid\theta)\right)^{2}\right] = …” |
| To compute Fisher information for a single observation, take the log of the density, differentiate twice with respect to the parameter, the… | procedure | tagged | Fisher Information (collapsed): “$$\frac{\partial^2}{\partial\lambda^2}\ln f = -\frac{x}{\lambda^2} \ \Longrightarrow\ I(\lambda) = …” |
| For a normal distribution with known variance σ², the Fisher information for the mean μ from one observation is 1/σ², since the second deri… | fact | missing |  |
| The expectation of a constant is the constant itself, so when the second derivative of the log-density does not depend on x, no integration… | fact | missing |  |

</details>

<details><summary><code>masi-2018s-q17</code> · untagged</summary>

Tagged pages: Consistency, Order Statistics, Uniform Continuous Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| An estimator is consistent if it converges in probability to the true parameter value as the sample size n goes to infinity. | definition | tagged | Consistency: “An estimator $\hat{\theta}_n$ is **consistent** for $\theta$ if it converges in probability to the …” |
| An estimator whose bias and variance both go to zero as n goes to infinity is consistent (asymptotically unbiased with vanishing variance i… | fact | tagged | Consistency: “if $\text{Bias}(\hat{\theta}_n) \to 0$ and $\text{Var}(\hat{\theta}_n) \to 0$ as $n \to \infty$, th…” |
| For a random sample of size n from Uniform(0, θ), the sample maximum has expected value nθ/(n+1). | formula | elsewhere | Estimator (collapsed): “Use $E[X_{(n)}] = \frac{n\theta}{n+1}$ and $\text{Var}(X_{(n)}) = \frac{n\theta^2}{(n+1)^2(n+2)}$.” |
| For a random sample of size n from Uniform(0, θ), the sample maximum has variance nθ²/((n+1)²(n+2)). | formula | elsewhere | Estimator (collapsed): “Use $E[X_{(n)}] = \frac{n\theta}{n+1}$ and $\text{Var}(X_{(n)}) = \frac{n\theta^2}{(n+1)^2(n+2)}$.” |
| The sample maximum of a Uniform(0, θ) sample is a biased but asymptotically unbiased estimator of θ; multiplying or dividing it by a factor… | fact | elsewhere | Bias (collapsed): “The MLE understates $\theta$, which makes sense — the largest observation can never exceed the true…” |

</details>

<details><summary><code>masi-2018s-q18</code> · answerable</summary>

Tagged pages: Hypothesis Testing, Variance, Critical Value

| Item | Kind | Status | Where |
|---|---|---|---|
| For a normal sample of size n with unbiased sample variance s^2, the statistic (n-1)s^2/sigma_0^2 follows a chi-square distribution with n-… | formula | tagged | Critical Value: “Use $\chi^2 = (n-1)S^2/\sigma_0^2$ against $\chi^2_{\alpha,\,n-1}$.” |
| For a lower-tailed variance test (H1: sigma^2 < sigma_0^2), reject H0 when the chi-square statistic is smaller than the lower-tail critical… | procedure | tagged | Critical Value: “a lower-tailed test rejects when $T \le c$ with $P(T \le c \mid H_0) = \alpha$” |
| Read critical values from a chi-square table with n-1 degrees of freedom and compare the statistic to critical values at several significan… | procedure | tagged | Critical Value (collapsed): “With $24$ degrees of freedom, $\chi^2_{0.05,24} = 36.415$ and $\chi^2_{0.01,24} = 42.980$.” |

</details>

<details><summary><code>masi-2018s-q19</code> · answerable</summary>

Tagged pages: Hypothesis Testing, Maximum Likelihood Estimation, Likelihood Ratio Test, Critical Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The likelihood ratio statistic Λ is the ratio of the maximized likelihood under the null hypothesis to the maximized likelihood under the f… | definition | tagged | Likelihood Ratio Test: “$$\Lambda = \frac{\sup_{\theta \in \Theta_0} L(\theta)}{\sup_{\theta \in \Theta} L(\theta)}$$” |
| For large samples, -2 ln Λ is approximately chi-squared distributed under the null hypothesis (Wilks' theorem). | fact | tagged | Likelihood Ratio Test: “$$-2\ln\Lambda = 2\left[\ell(\hat\theta) - \ell(\hat\theta_0)\right] \ \dot\sim\ \chi^2_{r}$$” |
| The degrees of freedom of the chi-squared approximation equal the number of free parameters in the full model minus the number of free para… | fact | tagged | Likelihood Ratio Test: “$r$ is the number of **restrictions** — the difference in free parameters between the full and redu…” |
| Reject the null hypothesis in a likelihood ratio test when -2 ln Λ exceeds the chi-squared critical value at the (1 - significance level) p… | procedure | tagged | Likelihood Ratio Test: “Reject $H_0$ (the reduced model) when $-2\ln\Lambda$ exceeds the upper-$\alpha$ point of $\chi^2_r$” |

</details>

<details><summary><code>masi-2018s-q2</code> · gap</summary>

Tagged pages: Poisson Process, Binomial Distribution, Poisson Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For a Poisson process, conditional on n events occurring in [0, t], the number of events in a subinterval [0, s] with s < t is Binomial wit… | fact | missing |  |
| The binomial probability of exactly k successes in n trials with success probability p is C(n,k) p^k (1-p)^(n-k). | formula | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| Given the total number of events in a Poisson process over an interval, the conditional probability of events in a subinterval does not dep… | fact | missing |  |

</details>

<details><summary><code>masi-2018s-q20</code> · untagged</summary>

Tagged pages: Type I Error, Hypothesis Testing, Gamma, Central Limit Theorem

| Item | Kind | Status | Where |
|---|---|---|---|
| A Type I error is rejecting the null hypothesis when it is true, and its probability is computed by evaluating the rejection-region probabi… | definition | tagged | Type I Error: “A **Type I Error** occurs when a [[Hypothesis Testing\\|hypothesis test]] incorrectly **rejects a tr…” |
| A gamma distribution with shape alpha and scale theta has mean alpha*theta and variance alpha*theta^2. | formula | tagged | Gamma: “$E[X] = \alpha\theta$, $\text{Var}(X) = \alpha\theta^2$, and coefficient of variation $CV = 1/\sqrt…” |
| By the central limit theorem, the sample mean of n independent identically distributed observations is approximately normal with mean mu an… | fact | elsewhere | Sample Mean: “By the [[Central Limit Theorem]], $\bar{X}$ is approximately $N(\mu, \sigma^2/n)$ for large $n$ wha…” |
| Standardize the sample mean by subtracting the mean and dividing by sigma/sqrt(n), then use standard normal tail probabilities to compute t… | procedure | prerequisite | Normal Approximation: “$$P(\bar{X} \le x) \approx \Phi\!\left(\frac{x - \mu}{\sigma/\sqrt{n}}\right)$$” |
| The standard normal critical value with upper-tail probability 0.025 is 1.96, so a tail probability below 0.025 requires the z-cutoff to ex… | fact | prerequisite | Normal Distribution: “Useful percentiles: $z_{0.90} = 1.282$, $z_{0.95} = 1.645$, $z_{0.975} = 1.960$, $z_{0.99} = 2.326$” |
| Because sample size must be a whole number, solve the inequality for n and take the smallest integer satisfying it. | procedure | prerequisite | Normal Approximation (collapsed): “At least $1{,}083$ policies.” |

</details>

<details><summary><code>masi-2018s-q21</code> · untagged</summary>

Tagged pages: Hypothesis Testing

| Item | Kind | Status | Where |
|---|---|---|---|
| A chi-square test of independence tests whether two categorical variables in a contingency table are independent, with the null hypothesis … | definition | elsewhere | Chi-Square Goodness-of-Fit Test: “The same statistic on a $k \times m$ contingency table, with $E_{ij} = (\text{row } i \text{ total}…” |
| Under independence, the expected count for each cell of a contingency table equals (row total) times (column total) divided by the grand to… | formula | elsewhere | Chi-Square Goodness-of-Fit Test: “$E_{ij} = (\text{row } i \text{ total})(\text{column } j \text{ total})/n$” |
| The chi-square statistic is the sum over all cells of (observed - expected)^2 divided by expected. | formula | elsewhere | Chi-Square Goodness-of-Fit Test: “$$Q = \sum_{j=1}^{k} \frac{(O_j - E_j)^2}{E_j}$$” |

</details>

<details><summary><code>masi-2018s-q22</code> · answerable</summary>

Tagged pages: F-Distribution, Hypothesis Testing, Critical Value, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| For independent normal samples with sample variances s1^2 and s2^2 of sizes n1 and n2, under H0: sigma1^2 = sigma2^2 the ratio s1^2/s2^2 fo… | fact | tagged | F-Distribution: “for independent normal samples of sizes $n_X$ and $n_Y$, $\dfrac{S_X^2/\sigma_X^2}{S_Y^2/\sigma_Y^2…” |
| For a one-sided test of H1: sigma1^2 < sigma2^2 using s1^2/s2^2, the critical region is the lower tail of the F distribution, with boundary… | procedure | tagged | Critical Value: “a lower-tailed test rejects when $T \le c$ with $P(T \le c \mid H_0) = \alpha$” |
| The lower-alpha point of F with (a,b) degrees of freedom equals the reciprocal of the upper-alpha point of F with (b,a) degrees of freedom:… | formula | tagged | F-Distribution: “the value below which $F(n, m)$ falls with probability $\alpha$ is $1/c$, where $c$ is the upper-$\…” |
| Read upper percentage points of the F distribution from an F table using numerator and denominator degrees of freedom. | procedure | tagged | F-Distribution: “Find the denominator row, the upper-tail area, then the numerator column.” |

</details>

<details><summary><code>masi-2018s-q23</code> · answerable</summary>

Tagged pages: Exponential Distribution, Order Statistics

| Item | Kind | Status | Where |
|---|---|---|---|
| The maximum of several random variables is less than a value x exactly when every one of the variables is less than x. | fact | tagged | Order Statistics: “The minimum is $X_{(1)}$ and the maximum is $X_{(n)}$.” |
| For independent random variables, the probability that all of them satisfy their events equals the product of the individual probabilities. | fact | tagged | Order Statistics: “$$P\bigl(X_{(n)} \le x\bigr) = F_1(x)\,F_2(x)\cdots F_n(x)$$” |
| For an exponential distribution with mean mu, the CDF is P(W < x) = 1 - exp(-x/mu). | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |

</details>

Nothing here edits the vault. A gap is fixed from the syllabus reading, in general form — never by copying the question's own numbers onto the page — and the edited page is fact checked again (docs/verification.md).
