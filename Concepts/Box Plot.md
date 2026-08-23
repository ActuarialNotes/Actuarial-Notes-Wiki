---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4fae40927a3fca2ef031c4fd19b56ecc0155db3d3fa6b44a0987de550b105d0f
  sources: []
  open_findings: 0
  log: .verify/Concepts/Box Plot.md
---

A **Box Plot** (box-and-whisker plot) is an [[Exploratory Data Analysis]] display that summarizes a distribution with five numbers: the minimum, first quartile $Q_1$, median $Q_2$, third quartile $Q_3$, and maximum. The box spans the middle half of the data and the whiskers reach the most extreme observations that are not flagged as outliers.

> $$\text{IQR} = Q_3 - Q_1$$

> $$\text{outlier if } x < Q_1 - 1.5\,\text{IQR} \ \text{ or } \ x > Q_3 + 1.5\,\text{IQR}$$

- The **box** runs from $Q_1$ to $Q_3$ and holds 50% of the observations; the line inside it is the **median**, not the mean
- The **whiskers** extend to the furthest observation within $1.5 \times \text{IQR}$ of the box; points beyond are drawn individually as outliers
- A median sitting left of centre with a long right whisker signals **right skew** — the usual shape for claim severity
- Box plots are read **side by side**: one box per level of a [[Categorical Predictor]] shows whether a rating variable separates the response, which is exactly the evidence needed before adding that variable to a [[Generalized Linear Model]]
- A box plot hides multimodality — two clusters and one broad spread give the same five numbers, so pair it with a [[Histogram]] before concluding anything about shape
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
> > The value $40 > 21.5$ is an **outlier**; the upper whisker therefore stops at $14$. The five-number summary is $(2, 4, 7, 11, 14)$ with $40$ plotted separately.

> [!example]- Comparing Vehicle Classes {Example}
> Box plots of severity for three vehicle classes show medians of $3.1$, $3.3$, and $6.8$ (in thousands), with the first two boxes overlapping heavily and the third sitting well above them with several high outliers. What does this suggest for the model?
>
> > [!answer]-
> > The first two classes are not distinguished by the data and could be **grouped into one level**, saving a parameter. The third class needs its own coefficient. The high outliers and the widening spread as the median rises indicate variance growing with the mean — a **Gamma [[Generalized Linear Model]] with a log [[Link Function]]** fits that pattern better than ordinary [[Linear Regression]].
