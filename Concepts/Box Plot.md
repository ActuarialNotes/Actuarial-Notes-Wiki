---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:ae9fc5cd33492e13db31929876166cd2c428adbc01dd509d04ad93f17721d43d
  sources:
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.7 'Box Plot' (basic box plot to min/max; 'Box plots with fences' L1/U1 = 1.5 IQ, L2/U2 = 3.0 IQ), fetched 2026-10-05 (page carries a per-request Cloudflare token, so its hash differs per fetch), sha256:67a9ab2a3aa2c1cb4abee07ce91609e67053ef2b835dd70ffae07e513305bbdd — https://www.itl.nist.gov/div898/handbook/eda/section3/boxplot.htm"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §7.1.6 'What are outliers in the data?' (inner/outer fences; mild/extreme outliers; quartiles at the .25(N+1)th/.75(N+1)th ordered points), fetched 2026-10-05, sha256:9e80560e583c4042385b7fd9ce0dff91b8b4903487d3f65db517e5e231bd66b4 — https://www.itl.nist.gov/div898/handbook/prc/section1/prc16.htm"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.6 §6 'Order Statistics' (fences q1 - 1.5 IQR / q3 + 1.5 IQR mark 'potential outliers'; five-number summary (x_(1), q1, q2, q3, x_(n)); 'lots of alternatives' to the sample-quantile definition), sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html"
    - "R Documentation, grDevices::boxplot.stats (coef = 1.5 whiskers; hinges equal the quartiles for odd n), sha256:202dc113fa952aae23b87aef26e3eb28b384ae53bfa717dc3b86ef46949b78c3 — https://stat.ethz.ch/R-manual/R-devel/library/grDevices/html/boxplot.stats.html"
    - "R Documentation, stats::fivenum 'Tukey Five-Number Summaries' (minimum, lower-hinge, median, upper-hinge, maximum), sha256:4d4c9ba1a26a23b9793e1bcadf996ed096e7eb84bdca2c78d45b78ed44667719 — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/fivenum.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Box Plot.md
---

A **Box Plot** (box-and-whisker plot) is an [[Exploratory Data Analysis]] display that summarizes a distribution with five numbers: the minimum, first quartile $Q_1$, median $Q_2$, third quartile $Q_3$, and maximum. The box spans the middle half of the data and the whiskers reach the most extreme observations that are not flagged as outliers.

> $$\text{IQR} = Q_3 - Q_1$$

> $$\text{potential outlier if } x < Q_1 - 1.5\,\text{IQR} \ \text{ or } \ x > Q_3 + 1.5\,\text{IQR}$$

- The **box** runs from $Q_1$ to $Q_3$ and holds 50% of the observations; the line inside it is the **median**, not the mean
- The **whiskers** extend to the furthest observation within $1.5 \times \text{IQR}$ of the box; points beyond are drawn individually as outliers
- **The convention varies.** The $1.5\,\text{IQR}$ limits are the *inner fences*; NIST calls a point beyond one a *mild* outlier and a point beyond an *outer fence*, $Q_1 - 3\,\text{IQR}$ or $Q_3 + 3\,\text{IQR}$, an *extreme* one, and its basic box plot has no fences at all — the whiskers run to the minimum and maximum. Quartiles have several definitions too: this page takes the medians of the lower and upper halves (the median itself left out when $n$ is odd), which in the example below matches NIST's $(n+1)p$-th ordered value, while R's `boxplot` uses Tukey's hinges — so software can report different quartiles and fences for the same data
- A median sitting left of centre with a long right whisker signals **right skew** — the usual shape for claim severity
- Box plots are read **side by side**: one box per level of a [[Categorical Predictor]] shows whether a rating variable separates the response, which is exactly the evidence needed before adding that variable to a [[Generalized Linear Model]]
- A box plot hides multimodality — two clusters and one broad spread can give the same five numbers, so pair it with a [[Histogram]] before concluding anything about shape
- Because it is built from [[Order Statistics]], it is resistant to extreme values: one enormous claim moves the maximum but not the box

![[Media/Figures/Box_Plot.svg|340]]

> [!example]- Building a Box Plot from a Sample {Example}
> Eleven claim amounts (in thousands) are: $2, 3, 4, 5, 6, 7, 8, 9, 11, 14, 40$. Find the five-number summary and identify any outliers.
>
> > [!answer]-
> > With $n = 11$, the median is the 6th value, $Q_2 = 7$. The lower half $\{2,3,4,5,6\}$ has median $Q_1 = 4$; the upper half $\{8,9,11,14,40\}$ has median $Q_3 = 11$.
> > $$\text{IQR} = 11 - 4 = 7$$
> > $$\text{upper fence} = Q_3 + 1.5(7) = 11 + 10.5 = 21.5$$
> > $$\text{lower fence} = Q_1 - 1.5(7) = 4 - 10.5 = -6.5$$
> > The value $40 > 21.5$ is an **outlier**; the upper whisker therefore stops at $14$. The five-number summary is $(2, 4, 7, 11, 40)$ with $40$ plotted separately. It also lies beyond the outer fence $Q_3 + 3(7) = 32$, so NIST would call it an *extreme* outlier. R's `boxplot` would draw $Q_1 = 4.5$ and $Q_3 = 10$ (fences $-3.75$ and $18.25$) — different numbers, the same outlier and whisker.

> [!example]- Comparing Vehicle Classes {Example}
> Box plots of severity for three vehicle classes show medians of $3.1$, $3.3$, and $6.8$ (in thousands), with the first two boxes overlapping heavily and the third sitting well above them with several high outliers. What does this suggest for the model?
>
> > [!answer]-
> > The first two classes are not distinguished by the data and could be **grouped into one level**, saving a parameter. The third class needs its own coefficient. The high outliers and the widening spread as the median rises indicate variance growing with the mean — a **Gamma [[Generalized Linear Model]] with a log [[Link Function]]** fits that pattern better than ordinary [[Linear Regression]].
