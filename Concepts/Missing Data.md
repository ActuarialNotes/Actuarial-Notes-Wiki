---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f7ea5b126ecdfa623f0ad75dbca67acd0a2b394c75ef6a24302fc85fff14bd3d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Missing Data.md
---

**Missing Data** are values of a variable that were never recorded for some observations. How they are handled depends on **why** they are missing. The mechanism decides whether dropping or filling them leaves the model unbiased, and a missing value is often a signal in its own right.

> $$\text{Missing rate}_j = \frac{\#\{i : x_{ij} \text{ missing}\}}{n}$$

- $x_{ij}$ is variable $j$ for observation $i$, and $n$ is the number of observations. Compute the rate for every variable during [[Exploratory Data Analysis]], and look for missing values in disguise: a $0$ age, a `9999` year built, a blank territory code
- **MCAR** (missing completely at random): the chance of being missing is unrelated to anything. Dropping those rows loses data but introduces no bias
- **MAR** (missing at random): missingness depends on *other observed* variables — for example, prior-carrier information missing more often for business written through one channel. It can be handled by modelling it from those variables
- **MNAR** (missing not at random): missingness depends on the missing value itself — for example, applicants with poor credit declining to provide it. Dropping or naively filling these values biases the model
- Treatments:
  - **Complete-case analysis** drops every row with a gap. It is simple, but it can discard a large share of the data and is biased unless the data are MCAR.
  - **Imputation** fills gaps with the median, the mean or a model prediction. It keeps the rows but understates variability.
  - For a [[Categorical Predictor|categorical predictor]], an explicit **"Unknown" level** lets the GLM estimate the effect of missingness directly.
  - For a continuous predictor, impute the value **and** add a missing-value indicator.
- Whatever is chosen has to be stated in the report, and it must be applied in exactly the same way when the model is used to score new business

> [!example]- Missing as Its Own Level {Example}
> In a homeowners frequency GLM (log link), roof age is missing for $9\%$ of policies. Binned roof age is fitted with an "Unknown" level, which gets a coefficient of $0.18$ relative to the base level (roofs $0$–$10$ years old). How should this be interpreted?
>
> > [!answer]-
> > $$e^{0.18} = 1.197$$
> > Policies with no recorded roof age have about $20\%$ higher expected frequency than new roofs, all else equal. **Missingness is predictive** — perhaps because roof age goes unrecorded mostly on older homes bought without an inspection. Had these rows been dropped, the model would have learned nothing about them. It would then have priced them at the average, undercharging the group.

> [!example]- When Dropping Rows Biases the Model {Example}
> Prior claim history is missing for all policies written in their first year with the company, and first-year policies have higher frequency. An analyst drops every row with missing prior history. What goes wrong?
>
> > [!answer]-
> > Here missingness is tied to tenure, and tenure is tied to risk, so this is **not MCAR**. Dropping the rows removes all first-year business, and with it the higher-frequency risks. The model then understates the overall level, and it can never price a new customer.
> >
> > The better treatment keeps the rows and codes prior history as "none on file," a level of its own. Then the model can price new business, and the difference between a new customer and a claim-free renewal becomes a coefficient the actuary can inspect.
