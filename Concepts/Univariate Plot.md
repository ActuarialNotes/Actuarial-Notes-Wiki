---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:01fbf9d2198b0fc9e0e0a7c29b9c65f3ee370abca000a806708a12b2de61c47d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Univariate Plot.md
---

A **Univariate Plot** displays the distribution of **one** variable at a time — its centre, spread, shape, and outliers — without reference to any other variable. Univariate plots are the first step of [[Exploratory Data Analysis]]: they are what tells you which response distribution and which transformations a model can plausibly use.

> $$\text{one variable} \ \longrightarrow \ \text{shape, centre, spread, outliers}$$

| Plot | Shows | Best at |
| :--- | :--- | :--- |
| [[Histogram]] | Binned counts | Overall shape, multimodality |
| [[Box Plot]] | Five-number summary | Outliers, comparing groups |
| Dot plot / strip plot | Every observation | Small samples, ties |
| Empirical CDF | $\hat{F}(x) = \frac{1}{n}\#\{x_i \le x\}$ | Quantiles, no binning choice |
| [[QQ Plot]] | Sample vs theoretical quantiles | Tail behaviour, distributional fit |
| Bar chart | Category counts | Rare levels of a [[Categorical Predictor]] |

- For a **continuous** variable, start with a [[Histogram]] for shape and a [[Box Plot]] for outliers; for a **categorical** variable, a bar chart of level frequencies is the univariate plot, and it is how thin levels get found before they blow up a GLM's standard errors
- The empirical CDF is the one univariate plot with **no tuning choice** — no bin width, no whisker rule — so it is the honest check when a histogram's shape looks bin-dependent
- Univariate plots of the *response* narrow the choice of distribution and [[Link Function]]; univariate plots of each *predictor* find skew, spikes at zero, and impossible values before they contaminate the fit
- They cannot show relationships: a variable can look perfectly well behaved on its own and still be badly related to the response, which is what a [[Scatter Plot]] and the diagnostic plots are for
- Plot exposures too, not just losses — a univariate plot of exposure by level shows where the data is thin enough that a fitted coefficient will be unstable

![[Media/Figures/Univariate_Plot.svg|340]]

> [!example]- Choosing Plots for a New Data Set {Example}
> An actuary receives a data set with claim count (integer, mostly zero), claim severity (positive, right-skewed), and territory (12 levels). Which univariate plot fits each?
>
> > [!answer]-
> > - **Claim count**: a bar chart of the counts $0, 1, 2, \ldots$ — a histogram of a variable that is $85\%$ zeros just shows one bar. Compare the sample mean and variance while you are there; variance $\gg$ mean means overdispersion, so [[Negative Binomial Distribution|negative binomial]] rather than plain [[Poisson Regression]].
> > - **Severity**: a [[Histogram]] of $\ln(\text{severity})$ plus a [[Box Plot]] on the raw scale, so the shape and the outliers are both visible.
> > - **Territory**: a bar chart of exposure by level, to find levels with too little data to fit their own coefficient.

> [!example]- When the Histogram and the Box Plot Disagree {Example}
> A box plot of a variable looks symmetric with no outliers, but the histogram shows two clear humps. Which is telling the truth?
>
> > [!answer]-
> > Both — they measure different things. The five numbers behind a box plot ($\min, Q_1, Q_2, Q_3, \max$) are identical for a symmetric unimodal sample and a symmetric **bimodal** one, so a box plot simply cannot show two humps. The histogram is right about the shape, and the two modes usually mean a missing [[Categorical Predictor|categorical variable]] (two classes of risk mixed in one column) that should be split out.
