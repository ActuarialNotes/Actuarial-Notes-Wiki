---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:1ff26b40d1cbaf35e525fe792d48a6691ef12db7f5bcd2092c20b6b4adf1c281
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

![[Media/Figures/Box_Plot.svg|340]]

A **Box Plot** (box-and-whisker plot) is a plot that summarizes a sample's distribution by its [[Median|median]], its first quartile $Q_1$ and third quartile $Q_3$, and its outliers. The box runs from $Q_1$ to $Q_3$ and holds the middle half of the data, with a line at the median. The interquartile range is

> $$\text{IQR} = Q_3 - Q_1$$

The lower and upper fences are

> $$Q_1 - 1.5\,\text{IQR} \quad \text{and} \quad Q_3 + 1.5\,\text{IQR}$$

An observation outside a fence, more than $1.5\,\text{IQR}$ beyond the box, is an outlier. Each whisker extends to the most extreme observation that is not an outlier, so it ends at a data value, not at the fence. Each outlier is plotted individually beyond the whiskers.

The quartiles are found here by the median of halves. Order the $n$ observations and find the median. $Q_1$ is the median of the values below the median, and $Q_3$ is the median of the values above it. When $n$ is odd, the median itself is left out of both halves. Software uses several other quartile definitions, which can give slightly different quartiles and fences.

> [!example]- Eleven claim amounts, in thousands, are 2, 3, 4, 5, 6, 7, 8, 9, 11, 14 and 40. What are the quartiles, the fences and the outliers of their box plot? {Example}
> - With $n = 11$, the median is the 6th value, 7.
> - The lower half is 2, 3, 4, 5, 6, so $Q_1 = 4$. The upper half is 8, 9, 11, 14, 40, so $Q_3 = 11$.
> - $\text{IQR} = 11 - 4 = 7$, so the fences are $4 - 10.5 = -6.5$ and $11 + 10.5 = 21.5$.
> - 40 is above 21.5, so it is the one outlier, and the upper whisker ends at 14.

## Comparing groups with side-by-side box plots

Side-by-side box plots, one for each level of a [[Categorical Predictor|categorical predictor]], compare the response's median, spread and outliers across the levels. They show whether the response differs by level:

1. The location of a box, its median and its position, is the evidence for a difference in the mean. Levels with nearly identical boxes and medians can be grouped into one level, while a clearly shifted box suggests a separate level.
2. Skewness shows as asymmetry within a box plot, such as an upper whisker and upper half of the box longer than the lower ones. Shorter whiskers indicate a smaller scale, not skewness.
3. A few outliers are individual extreme observations, so they are weak evidence that a level's typical response differs.
4. For a [[Gamma]] severity response, the standard deviation grows with the mean, so levels with larger medians also show larger spreads.

> [!example]- Box plots of severity for three vehicle classes have medians of 3.1, 3.3 and 6.8 thousand. The first two boxes overlap almost completely, and the third is higher and wider, with a few high outliers. What do they show? {Example}
> - The first two classes have nearly the same box and median, so they can be grouped into one level.
> - The third class's box is clearly shifted upward, so it needs its own level.
> - Its wider box is consistent with a Gamma response, whose spread grows with its mean.

## What a box plot does not show

A box plot reduces a sample to a few numbers, so it hides some features of the data:

1. It cannot show two humps, because a unimodal and a bimodal sample can have the same quartiles.
2. It does not show how many observations share a value, because repeated identical values are drawn as one point. A pile-up at one value is revealed by a [[Histogram|histogram]].
3. It discards time order, so it cannot show a change at a point in time.

> [!trap] Ending the whisker at the fence
> The fence is a cut-off, not a data value. The whisker stops at the most extreme observation inside the fence, which in the example is 14, not 21.5.
