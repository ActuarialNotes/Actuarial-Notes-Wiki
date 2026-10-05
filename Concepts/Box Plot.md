---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:ae9fc5cd33492e13db31929876166cd2c428adbc01dd509d04ad93f17721d43d
  sources:
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.7 'Box Plot' (basic box plot; 'Box plots with fences'), sha256:545e917efab8aae10425dd289461c519de359120fd39d6dc94efa8c324e1f783 — https://www.itl.nist.gov/div898/handbook/eda/section3/boxplot.htm"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §7.1.6 'What are outliers in the data?' (inner/outer fences, (N+1)p quartiles, mild/extreme outliers), sha256:6dfe27fdc6af41afc2fc6d3ca3c1cae158bc481e2c1f5dd5bbc3f5f67c38f520 — https://www.itl.nist.gov/div898/handbook/prc/section1/prc16.htm"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.6 §6 'Order Statistics' (sample quantiles and alternatives, IQR, fences, five-number summary, boxplot, empirical CDF), sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html"
    - "R Documentation, stats::fivenum 'Tukey Five-Number Summaries' (minimum, lower-hinge, median, upper-hinge, maximum), sha256:4d4c9ba1a26a23b9793e1bcadf996ed096e7eb84bdca2c78d45b78ed44667719 — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/fivenum.html"
    - "R Documentation, grDevices::boxplot.stats (coef = 1.5 whiskers; hinges vs quartiles), sha256:202dc113fa952aae23b87aef26e3eb28b384ae53bfa717dc3b86ef46949b78c3 — https://stat.ethz.ch/R-manual/R-devel/library/grDevices/html/boxplot.stats.html"
    - "Larsen, 'Generalized Linear Models', CAS Study Note (rev. 6/29/2016), pp.1-2 ('QQ and Box Plots…', 'Tweedie Distributions'), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §2.3.5 lab (plot() of a qualitative x draws side-by-side boxplots), printed p.50 (PDF p.61), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Section C Extended Linear Models, tasks 5 and 9, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 1
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
