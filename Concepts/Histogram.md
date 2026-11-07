---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:c418c75ecf0e45042737fe07d2988ac882e9ba95e9daa5fcbfad070a53c43f12
  sources:
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.14 'Histogram' (definition, count and density normalisations, questions answered), sha256:5dd49706cfe4151a32e35dcae8bf63d421ba68685abf7473588776c7830f065a — https://www.itl.nist.gov/div898/handbook/eda/section3/histogra.htm"
    - "Smile (Statistical Machine Intelligence and Learning Engine) Java API, smile.math.Histogram: bins(n) square-root rule and sturges(n) k = ceil(log2(n) + 1), sha256:1a0502638b9edbf8b5b7bb5a4ad62e41fc6dd0be3bcf9ae6947be2f3977b37c5 — http://haifengl.github.io/api/java/smile/math/Histogram.html"
    - "R Documentation, graphics::hist (breaks = \"Sturges\" default; freq = FALSE plots densities with total area one), sha256:77630f10cde01668526e0e8ed07b58a325b5bf0a4e235713c7420789c3d92397 — https://stat.ethz.ch/R-manual/R-devel/library/graphics/html/hist.html"
    - "Larsen, 'Generalized Linear Models', CAS Study Note (rev. 6/29/2016), pp.1-2 ('QQ and Box Plots…', 'Tweedie Distributions'), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Section C Extended Linear Models, tasks 5 and 9, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Histogram.md
---

![[Media/Figures/Histogram.svg|340]]

A **Histogram** is a plot of a single continuous variable's distribution, in which the range is cut into bins and a bar is drawn over each bin. On the density scale, the area of each bar is the proportion of the $n$ observations in its bin, so the height of the bar over bin $j$ is

> $$\text{height}_j = \frac{n_j}{n\, w_j}$$

- $n_j$ is the number of observations in bin $j$.
- $w_j$ is the width of bin $j$.

The total area of all the bars is 1, so a density-scale histogram estimates the [[Probability Density Function (PDF)|probability density function]]. On the count scale, the height of each bar is simply $n_j$.

> [!example]- A histogram of 500 claim amounts, in thousands, has a first bin from 0 to 2 that holds 180 claims. What is the density-scale height of its bar? {Example}
> - The bin width is $w_1 = 2$.
> - The height is $\frac{180}{500 \times 2} = 0.18$.
> - The bar's area, $0.18 \times 2 = 0.36$, is the proportion of claims in the bin.

## Number of observations in a range

On the density scale, the proportion of observations in a range of whole bins is the sum of the bars' areas. The number of observations in the range is

> $$n \sum_{j} \text{height}_j \times w_j$$

- The sum is over the bins in the range.

> [!example]- A density-scale histogram of 500 claim amounts, in thousands, has bins 0 to 2, 2 to 4, 4 to 8 and 8 to 16, with heights 0.18, 0.14, 0.06 and 0.015. How many claims are at least 2 but less than 8? {Example}
> - The areas sum to $0.36 + 0.28 + 0.24 + 0.12 = 1$, as they must.
> - The bins from 2 to 8 have areas $0.14 \times 2 = 0.28$ and $0.06 \times 4 = 0.24$.
> - The proportion of claims in the range is $0.28 + 0.24 = 0.52$.
> - The number of claims is $0.52 \times 500 = 260$.

## Reading the shape of a histogram

A histogram shows a variable's range, its skewness and any second mode. These guide the choice of a model's distribution: a long right tail with no left tail points to a [[Gamma]] or [[Lognormal Distribution|lognormal]] severity, and a spike at zero with a right-skewed remainder points to a [[Tweedie Distribution|Tweedie]] response. How the variance changes with the mean is read from other plots, such as box plots by group, whose spread grows with the median, or a scatter plot that widens into a wedge.

For a heavily right-skewed positive variable, a histogram of the logarithm spreads out the bulk of the data so that the shape is visible. A distribution that is roughly symmetric on the log scale, as a lognormal is, is strongly right-skewed on the original scale.

> [!example]- A histogram of the logarithm of 2,000 claim amounts is roughly symmetric, with a single hump. What does the histogram of the claim amounts themselves look like? {Example}
> - A variable whose logarithm is symmetric behaves like a lognormal variable.
> - A lognormal distribution is strongly right-skewed.
> - The histogram of the claim amounts has a tall bar near zero and a long right tail.

## Histogram of a discrete variable

A histogram groups a continuous variable into bins. For a discrete variable, such as a claim count, bins that do not align with the integer values leave empty bins, and the picture depends on where the bin edges fall. A bar chart with one bar per value is the plot for a discrete variable.

> [!trap] Reading bar heights as proportions
> On the density scale, a bar's height is not the proportion of observations in its bin. Multiply each height by its bin's width, which matters most when the bins have different widths.
