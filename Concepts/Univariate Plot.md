---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:35a2d1df887bffd9d9bc4393f50e68c05b4d5fbaaf4832608963a6761f53dca2
  sources:
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.6 §6 'Order Statistics' (five-number summary (x_(1), q1, q2, q3, x_(n)); boxplot draws the five numbers and the outliers; empirical CDF), sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.14 'Histogram' (centre, spread, skewness, outliers, multiple modes), fetched 2026-10-05 (per-request Cloudflare token makes the hash fetch-specific), sha256:65e6e5992ec7900eee386aaa75a674f05da4dfd19a964974182b18d10e39e7ad — https://www.itl.nist.gov/div898/handbook/eda/section3/histogra.htm"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.7 'Box Plot', fetched 2026-10-05, sha256:67a9ab2a3aa2c1cb4abee07ce91609e67053ef2b835dd70ffae07e513305bbdd — https://www.itl.nist.gov/div898/handbook/eda/section3/boxplot.htm"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Univariate Plot.md
---

![[Media/Figures/Univariate_Plot.svg|340]]

A **Univariate Plot** is a plot of the distribution of one variable, its centre, spread, shape and outliers, without reference to any other variable. Plotting the distribution of each variable is the first step of [[Exploratory Data Analysis|exploratory data analysis]], and it doubles as a data quality check that reveals errors before anything is built on the data. The univariate plot depends on the variable's [[Data Types|data type]]:

| Plot | Data type | Shows |
| --- | --- | --- |
| Histogram | Continuous | The shape of the distribution, including skewness and a second mode |
| Box plot | Continuous | The median, the quartiles and the outliers |
| Bar chart with one bar per value | Discrete count | How often each value occurs, including the share of zeros and the shape of the tail |
| Bar chart of counts or exposure by level | Categorical | Levels with little data |
| QQ plot | Continuous | Whether the variable follows an assumed distribution |

The [[Histogram]], the [[Box Plot|box plot]] and the [[QQ Plot|QQ plot]] each have their own page.

> [!example]- A data set has claim count per policy (an integer, mostly zero), claim severity (positive and right-skewed) and territory (12 levels). Which univariate plot suits each variable? {Example}
> - Claim count is a discrete count, so a bar chart with one bar per value shows the share of zeros and the tail.
> - Severity is continuous and right-skewed, so a histogram of its logarithm shows its shape, and a box plot shows its outliers.
> - Territory is categorical, so a bar chart of exposure by territory shows which territories have little data.

## Bar chart of exposure by level

A bar chart of exposure by level is the univariate plot of a [[Categorical Predictor|categorical predictor]]. A level with few observations has an imprecisely estimated coefficient, with a large standard error. An apparent difference at such a level should be confirmed, or given [[Credibility|credibility]] weight, before it is fully priced.

> [!example]- A bar chart of exposure by territory shows that territory 12 has 40 car-years, against several thousand in each other territory. A frequency model gives territory 12 the highest relativity. Should that relativity be priced in full? {Example}
> - Territory 12 has very little exposure, so its coefficient has a large standard error.
> - Its high relativity may be chance.
> - It should be confirmed with more data, or credibility-weighted toward the overall level, before it is priced in full.

## What a univariate plot cannot show

A univariate plot shows one variable at a time, so it cannot show:

1. A relationship with the response, which needs a [[Scatter Plot|scatter plot]] or side-by-side box plots.
2. Differences between groups, because a single histogram of pooled data shows the overall distribution and hides them.
3. A change over time, because a box plot or a histogram discards the time order.
4. In a box plot, how many observations share a value, because repeated identical values are drawn as one point. A pile-up at one value is revealed by a histogram.

> [!trap] Drawing a histogram of a count
> A histogram of a count that is mostly zero shows one tall bar, and bins that do not align with the integers leave gaps. A bar chart with one bar per value is the univariate plot of a count.
