---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2995f0626d520ad8d6a50f349d52e60ceed64e5c4123e1ce74bf851cf91dbb4a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Types.md
---

**Data types** are the classes a variable falls into according to the values it can take — **numeric** (continuous or discrete) or **categorical** (nominal, ordinal or binary). A variable's type decides which [[Summary Statistics|summaries]] and [[Exploratory Data Analysis|EDA]] plots describe it, how it enters a model as a [[Predictor Variable|predictor]], and which distribution can serve it as a [[Response Variable|response]].

> $$\begin{aligned} \text{Numeric} &: \text{continuous, discrete (count)} \\ \text{Categorical} &: \text{nominal, ordinal, binary} \end{aligned}$$

- **Continuous** — any value in an interval: claim severity, amount of insurance, vehicle value. Plot with a [[Histogram]] for shape, a [[Box Plot]] for spread and outliers, and a [[QQ Plot]] for the tails. Insurance amounts are usually right-skewed, so a log scale is often the readable one
- **Discrete (count)** — non-negative integers: claim counts, vehicles per policy. A histogram of a variable that is $90\%$ zeros is one tall bar; a bar chart of how often $0, 1, 2, \ldots$ occur is the right [[Univariate Plot|univariate plot]]
- **Nominal** — unordered labels: territory, vehicle make, distribution channel. **Ordinal** — ordered labels whose spacing means nothing: credit tier, construction class, limit band. **Binary** — two levels: claim or no claim, renewed or lapsed. Plot each with a bar chart of counts or exposure by level; that is how thin levels are found before they destabilize a coefficient
- **Two variables at once**: numeric against numeric is a [[Scatter Plot]]; categorical against numeric is a row of side-by-side box plots, one per level; categorical against categorical is a two-way table of counts or exposure
- **Storage type is not statistical type.** A territory stored as the integers $1$–$12$ is nominal, and a ZIP code is a label. Software reads what the file holds, so categorical variables must be declared — a `factor` in R, a `category` in pandas ([[Statistical Software]]) — or the model fits them as a single slope
- Type also points to the model: counts to [[Poisson Regression]], positive skewed amounts to a [[Gamma]] response, a binary outcome to [[Logistic Regression]], and a spike at zero plus a skewed tail (pure premium) to the [[Tweedie Distribution]]. A nominal predictor enters as $k - 1$ indicator columns ([[Categorical Predictor]])

> [!example]- Classifying a Personal Auto Data Set {Example}
> A modelling file has one row per policy-year with these columns: `policy_id`; `veh_age` (whole years, $0$–$25$); `territory` (stored as the integers $1$–$8$); `credit_tier` (A–E); `n_claims`; `incurred` (total incurred loss, $\$0$ on most rows); `renewed` (Y/N). Classify each column and name the plot you would start with.
>
> > [!answer]-
> > - `policy_id` — an **identifier**, not a variable to model. Use it to join tables and to check for duplicate rows
> > - `veh_age` — **discrete numeric**, treated as continuous. A bar chart of its $26$ values, then box plots of severity by age band
> > - `territory` — **nominal**, despite being stored as integers. A bar chart of exposure by territory, then side-by-side box plots of severity
> > - `credit_tier` — **ordinal**. A bar chart in tier order, and frequency by tier to see whether the effect is monotone
> > - `n_claims` — **count**. A bar chart of $0, 1, 2, \ldots$, and a comparison of its mean with its variance to check for overdispersion
> > - `incurred` — **continuous with a mass at zero**. Report the share of zeros, then plot a histogram of $\ln(\text{incurred})$ for the positive rows
> > - `renewed` — **binary**. The renewal rate overall and by level of each predictor
> >
> > The trap is `territory`: left as an integer it is read as a measurement, and a model would assume territory $8$ differs from territory $1$ by seven equal steps.

> [!example]- A Territory Code Fitted as a Number {Example}
> A Poisson frequency GLM with a log link was fitted with `territory` (codes $1$–$8$) left numeric. Its coefficient is $\hat\beta = 0.05$. What relativity does the model imply between territory $8$ and territory $1$, and what is wrong with it?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Relativity}_{8:1} &= e^{0.05 \times (8 - 1)} \\
> > &= e^{0.35} \\
> > &= 1.419
> > \end{align*}
> > $$
> > The model forces every territory to be $e^{0.05} = 1.051$ times the one numbered below it — a smooth, monotone trend across labels whose order was set by whoever assigned the codes. Territory $5$ cannot be the worst unless $6$ to $8$ are worse still. Declared categorical, territory costs $7$ coefficients instead of $1$, but each is estimated from its own territory's data.
