---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:3d0f8ec10df1430c5fb9a5ef124e755ae7e3b519dc216350d631763112f41179
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

A **Data Type** is the class a variable belongs to according to the values it can take. A variable's data type decides which plots describe it, how it enters a model as a [[Predictor Variable|predictor]], and which distribution can model it as a [[Response Variable|response]]. The data types are:

- **Numeric** variables, whose values are measurements or counts:
  - A **continuous** variable takes any value in an interval, such as claim severity or amount of insurance.
  - A **discrete** variable takes integer values, such as the number of claims on a policy.
- **Categorical** variables, whose values are levels:
  - A **nominal** variable has levels that are labels with no meaningful order or spacing, such as territory, vehicle make or a class code.
  - An **ordinal** variable has levels with a meaningful order, such as credit tiers, but the spacing between levels need not be equal.
  - A **binary** variable has two levels, such as renewed or lapsed.

The MAS-I learning objectives distinguish categorical, ordinal and continuous predictors. There, *categorical* means a nominal variable.

> [!example]- A policy file has the columns `veh_age` (whole years), `territory` (stored as the integers 1 to 8), `credit_tier` (A to E), `n_claims`, `incurred` and `renewed` (Y or N). What is the data type of each column? {Example}
> - `veh_age` is discrete numeric, and it is usually treated as continuous.
> - `territory` is nominal, because its codes are labels even though they are stored as integers.
> - `credit_tier` is ordinal, because the tiers are ordered but the steps between them need not be equal.
> - `n_claims` is a discrete count.
> - `incurred` is continuous, with a mass of policies at zero.
> - `renewed` is binary.

## Storage type and data type

The way a variable is stored does not decide its data type. A territory stored as the integers 1 to 8 is nominal, and an identifier code counts nothing. [[Statistical Software|Statistical software]] reads what the file holds, so a categorical variable stored as numbers must be declared categorical, as a `factor` in R or a `category` in pandas.

## Data types as predictors

A numeric predictor enters a model with one coefficient, which assumes the same effect for each one-unit step in its value. A [[Categorical Predictor|categorical predictor]] with $k$ levels enters a model with an intercept as $k - 1$ indicator variables. One level, the base level, has no indicator, because a full set of $k$ indicators would be collinear with the intercept. Each other level then has its own coefficient.

A categorical variable coded as a single number is fitted with one slope across its arbitrarily ordered codes. A level with few observations has a coefficient with a large standard error, so an apparent difference at that level should be confirmed, or given [[Credibility|credibility]] weight, before it is fully priced.

> [!example]- A Poisson frequency GLM with a log link was fitted with `territory` (codes 1 to 8) left numeric, and its coefficient is $\hat{\beta} = 0.05$. What relativity does the model imply between territory 8 and territory 1? {Example}
> - A one-step increase in the code multiplies the fitted mean by $e^{0.05} = 1.051$.
> - From territory 1 to territory 8 is seven steps, so the relativity is $e^{0.05 \times 7} = e^{0.35} = 1.419$.
> - The model forces every territory to be 1.051 times the territory numbered below it, an order set by whoever assigned the codes.
> - Declared categorical, territory has 7 coefficients, each estimated from its own territory's data.

## Data types as responses

The data type of the response points to its distribution. A discrete count, such as a number of claims, is modeled with a count distribution such as the Poisson. A positive, right-skewed continuous amount is modeled with a Gamma distribution, and a binary response with a binomial distribution. The [[Model Structure#Distribution and link for the response|choice of distribution and link]] lists the usual pairs.

## Plots for each data type

The first plot of a variable depends on its data type.

| Data type | Univariate plot | Plot against a numeric response |
| --- | --- | --- |
| Continuous | Histogram, of the logarithm when the variable is right-skewed | Scatter plot |
| Discrete count | Bar chart with one bar per value, showing the share of zeros | Scatter plot or box plots by value |
| Categorical | Bar chart of counts or exposure by level, revealing levels with little data | Side-by-side box plots, one per level |

The [[Histogram]], the [[Box Plot|box plot]], the [[Scatter Plot|scatter plot]] and the [[Univariate Plot|univariate plot]] each have their own page.

> [!trap] Treating a numeric code as a measurement
> Territory codes, class codes and ZIP codes are stored as numbers but are labels. Fitting such a code with one slope assumes that territory 8 differs from territory 1 by seven equal steps.
