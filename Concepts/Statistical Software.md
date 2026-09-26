---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:90366829fe90a906c15f303081a231ff438215945b297539df9dfba4dc785952
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Statistical Software.md
---

**Statistical software** — for the CAS exams, the programming languages **R** and **Python** and the packages built on them — is how data sets are imported, cleaned and reshaped, how models are fitted, and how results reach the analyst: as printed tables of estimates, standard errors and tests that a candidate must be able to read without seeing the code.

> $$\texttt{claims} \sim \texttt{territory} + \texttt{age}$$

> $$\ln \mu_i = \beta_0 + \beta_{\text{terr}(i)} + \beta_{\text{age}}\,\text{age}_i$$

- **Model formulas** are shared by R and Python's statsmodels: the [[Response Variable|response]] to the left of `~`, the [[Predictor Variable|predictors]] to the right. With a Poisson family and log link, the first block specifies the linear predictor in the second, where $\beta_{\text{terr}(i)}$ is the coefficient of policy $i$'s territory ($0$ for the base). A categorical variable expands into $k - 1$ indicator columns of the [[Design Matrix|design matrix]]; `a:b` is an [[Interaction|interaction]] and `a*b` means both main effects plus the interaction. The link and distribution come from the `family` argument, not the formula
- **R**: `read.csv()` imports a `.csv` file; `str()` and `summary()` report each column's type and [[Summary Statistics|summary statistics]]; the tidyverse verbs `filter()`, `mutate()`, `group_by()`, `summarise()`, `left_join()` and `pivot_longer()` reshape it into [[Tidy Data|tidy data]] ([[R for Data Science (Grolemund and Wickham - 2017)|Grolemund and Wickham]]). `lm()` fits [[Linear Regression]]; `glm()` fits a [[Generalized Linear Model]] with `family = poisson`, `Gamma` or `binomial` and an `offset`; `summary()` prints the coefficient table and `anova()` the analysis of deviance
- **Python**: pandas does the data work — `pd.read_csv()`, `.dtypes`, `.describe()`, `.isna().sum()`, `.groupby().agg()`, `.merge()`, `.melt()` ([[Python for Data Analysis (McKinney - 2022)|McKinney]]); statsmodels fits `ols()` and `glm()` from the same formula syntax, and `.summary()` prints the [[Model Output|output]]
- **Reading the output** ([[Parameter Estimate Tables]]): each row gives the estimate, its standard error, their ratio and a p-value. In R's `glm()` summary the ratio is labelled `z` when the dispersion is fixed (Poisson, binomial) and `t` when it is estimated (Normal, Gamma). The footer gives the null and residual [[Deviance|deviance]] with their degrees of freedom and the [[AIC]]; an `lm()` summary gives the residual standard error, [[R-Squared]] and the overall $F$ test ([[ANOVA]])
- **Defaults that bite**: a categorical variable's base level is its *first* level — alphabetical unless reset (`relevel()` in R) — whereas a rating plan usually wants the level with the most exposure; a category stored as integers is fitted as a number until declared a `factor` (R) or `category` (pandas); and R's model functions drop rows with a missing value (the summary says how many), so check the observation count against the data

> [!example]- Reading a Frequency GLM Summary {Example}
> A Poisson GLM with a log link and `offset(log(exposure))` is fitted in R to $1{,}000$ policies, with territory (A is the base) as its only predictor. Part of `summary()`:
>
> ```
>             Estimate Std. Error z value Pr(>|z|)
> (Intercept)  -2.3026     0.0400  -57.57   <2e-16
> territoryB    0.2231     0.0600    3.72   0.0002
> territoryC   -0.1054     0.0700   -1.51   0.1320
>
>     Null deviance: 1250.3  on 999  degrees of freedom
> Residual deviance: 1231.0  on 997  degrees of freedom
> ```
>
> Find the base frequency and the territory relativities, a $95\%$ interval for B's relativity, and whether territory as a whole is significant.
>
> > [!answer]-
> > Exponentiate: base frequency $e^{-2.3026} = 0.100$ claims per unit of exposure; relativities $e^{0.2231} = 1.250$ for B and $e^{-0.1054} = 0.900$ for C.
> > $$
> > \begin{align*}
> > \text{B interval} &= e^{0.2231 \pm 1.96(0.0600)} \\
> > &= \left(e^{0.1055},\ e^{0.3407}\right) \\
> > &= (1.111,\ 1.406)
> > \end{align*}
> > $$
> > B is significantly different from A ($p = 0.0002$); C is not ($p = 0.132$). For the variable as a whole, the null model has the intercept alone, so
> > $$
> > \begin{align*}
> > \Delta D &= 1{,}250.3 - 1{,}231.0 \\
> > &= 19.3
> > \end{align*}
> > $$
> > on $999 - 997 = 2$ degrees of freedom, well above $\chi^2_{0.05,\,2} = 5.99$. Territory belongs in the model even though one of its levels is not individually significant; C might instead be combined with A.

> [!example]- Importing and Summarizing a Policy File {Example}
> `policies.csv` has one row per policy with `territory` (coded $1$, $2$, $3$), `exposure` and `claim_count`. Import it, make territory categorical, and tabulate claim frequency by territory in R or Python. The territory totals are $2{,}500$ exposures and $150$ claims, $1{,}200$ and $96$, and $800$ and $36$.
>
> > [!answer]-
> > In R with dplyr:
> >
> > ```r
> > library(dplyr)
> > pol <- read.csv("policies.csv")
> > str(pol)                         # territory is read as int
> > pol <- mutate(pol, territory = factor(territory))
> > pol %>%
> >   group_by(territory) %>%
> >   summarise(exposure = sum(exposure), claims = sum(claim_count)) %>%
> >   mutate(frequency = claims / exposure)
> > ```
> >
> > In Python with pandas:
> >
> > ```python
> > import pandas as pd
> > pol = pd.read_csv("policies.csv")
> > pol.dtypes                       # territory is read as int64
> > pol["territory"] = pol["territory"].astype("category")
> > out = pol.groupby("territory").agg(
> >     exposure=("exposure", "sum"), claims=("claim_count", "sum"))
> > out["frequency"] = out["claims"] / out["exposure"]
> > ```
> >
> > Either gives frequencies of $150/2{,}500 = 0.060$, $96/1{,}200 = 0.080$ and $36/800 = 0.045$, against $282/4{,}500 = 0.0627$ overall. Before modelling, also check the row count against the source and the count of missing values in each column (`colSums(is.na(pol))` in R, `pol.isna().sum()` in pandas). Without the conversion, a GLM would fit territory as one slope across the codes $1$, $2$, $3$.
