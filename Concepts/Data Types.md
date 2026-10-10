---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:cc0afb39c0dde59a549b6ab635d88c8e588f3cfe2821e02c3516c5c80aced58d
  sources:
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Section C tasks 5 and 9, PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §2.1.5 quantitative vs qualitative (categorical), PDF p.39; §3.3.1 one fewer dummy variable than levels, PDF p.96, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.6 §1 'Introduction', Levels of Measurement (nominal; ordinal: only order meaningful, differences not; continuous vs discrete), sha256:0af72fbf0202413525cae99e696cfa70014a803d6c5ac7a7dcafd1577742414f — https://www.randomservices.org/random/sample/Introduction.html"
    - "pandas 3.0.6 documentation, User Guide 'Categorical data' (category dtype; R's factor), sha256:f2643db9e1c77824c0a0fad64f881fd62095d7bd9ae0acc3218bc37dcef97bbd — https://pandas.pydata.org/docs/user_guide/categorical.html"
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.1 'Data visualization', §1.4.1 categorical variable -> bar chart (small set of values); §1.4.2 numerical variable, continuous -> histogram, sha256:871721caf69ea711517d9a4f0f627806da4200f6f7fd0068aa89530943339ad4 — https://r4ds.hadley.nz/data-visualize.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Types.md
---

**Data types** are the classes a variable falls into according to the values it can take — **numeric** (continuous or discrete) or **categorical** (nominal, ordinal or binary). A variable's type decides which [[Summary Statistics|summaries]] and [[Exploratory Data Analysis|EDA]] plots describe it, how it enters a model as a [[Predictor Variable|predictor]], and which distribution can serve it as a [[Response Variable|response]].

> $$\begin{aligned} \text{Numeric} &: \text{continuous, discrete (count)} \\ \text{Categorical} &: \text{nominal, ordinal, binary} \end{aligned}$$

- **Continuous** — any value in an interval: claim severity, amount of insurance, vehicle value. Plot with a [[Histogram]] for shape, a [[Box Plot]] for spread and outliers, and a [[QQ Plot]] for the tails. Insurance amounts are usually right-skewed, so a log scale is often the readable one
- **Discrete (count)** — non-negative integers: claim counts, vehicles per policy. A histogram of a variable that is $90\%$ zeros is one tall bar; a bar chart of how often $0, 1, 2, \ldots$ occur is the right [[Univariate Plot|univariate plot]]
- **Nominal** — unordered labels: territory, vehicle make, distribution channel. **Ordinal** — ordered labels whose spacing means nothing: credit tier, construction class, limit band. **Binary** — two levels: claim or no claim, renewed or lapsed. Plot each with a bar chart of counts or exposure by level; that is how thin levels are found before they destabilize a coefficient
- **The MAS-I outline counts differently.** Its task C5 asks candidates to distinguish *categorical, ordinal, and continuous* predictors — three kinds, so there *categorical* means unordered (nominal) levels. This page uses the wider sense, in which nominal and ordinal are both levels of measurement of a qualitative (categorical) variable
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

> [!tip]- How it appears on the exam
> - **DISC-DA** covers data classifications in its first topic, planning an insurer data modeling project. Application questions describe the columns of an insurance data set and ask how a field should be classified, or what goes wrong when a code stored as a number is treated as a measurement. The same course later classifies data by structure ([[Structured Data|structured]] or [[Unstructured Data|unstructured]]) and by source ([[Insurer Operational Data|insurer operational data]] or [[External Data|external data]]).
> - **MAS-I** asks candidates to distinguish categorical, ordinal and continuous predictors in a GLM, so a question may give a variable and ask how it should enter the model.

> [!warning]- Exam traps
> - **A number is not always numeric:** Territory codes, class codes and ZIP codes are labels. Averaging them or fitting them as a single slope treats an arbitrary numbering as a measurement.
> - **Ordinal is not interval:** An ordinal variable's levels are ordered, but the steps between them need not be equal, so coding credit tiers as 1 to 5 and fitting one slope assumes equal steps.
> - **Count versus continuous:** A claim count is a non-negative integer and calls for a bar chart and a count model, not a histogram of a continuous variable.
