---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:84e97ecbec51e4504584f47403fde1bf3a55d3296c0c134541e843a89a1718d0
  sources:
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.6 §6 'Order Statistics' (five-number summary (x_(1), q1, q2, q3, x_(n)); boxplot draws the five numbers and the outliers; empirical CDF), sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.14 'Histogram' (centre, spread, skewness, outliers, multiple modes), fetched 2026-10-05 (per-request Cloudflare token makes the hash fetch-specific), sha256:65e6e5992ec7900eee386aaa75a674f05da4dfd19a964974182b18d10e39e7ad — https://www.itl.nist.gov/div898/handbook/eda/section3/histogra.htm"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.7 'Box Plot', fetched 2026-10-05, sha256:67a9ab2a3aa2c1cb4abee07ce91609e67053ef2b835dd70ffae07e513305bbdd — https://www.itl.nist.gov/div898/handbook/eda/section3/boxplot.htm"
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
> > Both — they measure different things. The five numbers behind a box plot ($\min, Q_1, Q_2, Q_3, \max$) can be identical for a symmetric unimodal sample and a symmetric **bimodal** one, and the box draws nothing between them, so a box plot cannot show two humps. The histogram is right about the shape, and the two modes usually mean a missing [[Categorical Predictor|categorical variable]] (two classes of risk mixed in one column) that should be split out.
