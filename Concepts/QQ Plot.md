---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:152bd4d27269969201cfa0fee52dc8c129944371c57cb6123faf9cc250263611
  sources:
    - "NIST/SEMATECH e-Handbook §1.3.3.24 'Quantile-Quantile Plot' (quantiles of one data set against those of another; 45-degree reference line for the two-sample plot), sha256:48fc9a7ae492519938004302aff61ba8a909b70601999f3cf244690bcb6db9dc — https://www.itl.nist.gov/div898/handbook/eda/section3/qqplot.htm"
    - "NIST/SEMATECH e-Handbook §1.3.3.21 'Normal Probability Plot' (vertical axis: ordered response values; horizontal: normal order statistic medians; fitted reference line; used on model residuals), sha256:bdb6715e4dad4cf3d99e06540b85c460d925bb54af4d94d07e35e04dac6e0749 — https://www.itl.nist.gov/div898/handbook/eda/section3/normprpl.htm"
    - "NIST/SEMATECH e-Handbook §1.3.3.21.2 'Data Have Short Tails' (S-like middle 'common for both short and long tails'; short tails: first few points above the fitted line, last few below), sha256:df3abf0f0812352a3a7b0465546ea8088d8a0cd4044b5b9c077bacbcdf64e071 — https://www.itl.nist.gov/div898/handbook/eda/section3/normprp2.htm"
    - "NIST/SEMATECH e-Handbook §1.3.3.21.3 'Data Have Long Tails' (long tails: first few points below the fitted line, last few above), sha256:a8dfa8ebbc240f11fb2be349c17064264dc43d552673424c47180db6e1f4760d — https://www.itl.nist.gov/div898/handbook/eda/section3/normprp3.htm"
    - "NIST/SEMATECH e-Handbook §8.2.2.1 'Probability plotting' (plotting positions: texts recommend (i - 0.5)/n or i/(n+1)), sha256:b3be0ff496cfff8d74b9f0cddf03fa6b18ed1de6bc1e769ef367050c2e482444 — https://www.itl.nist.gov/div898/handbook/apr/section2/apr221.htm"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, 2nd ed. (CAS Monograph 5; rank 3 for MAS-I), §6.3.1 pp.68-69 (PDF 78-79: q-q plot of deviance residuals, theoretical quantiles on x, sample on y, reference line through the 25th and 75th theoretical quantiles; right-most points above the line = more skewed than assumed), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Larsen, 'Generalized Linear Models' (CAS Study Note, rev. 6/29/2016; MAS-I reading), 'QQ and Box Plots to test distribution assumptions' pp.1-2 (Dobson's normal probability plot of the residuals is a QQ plot built from order statistics) and 'Tweedie Distributions' p.2 (Var[Y] = a E(Y)^p, gamma p = 2), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain C tasks 4 and 8 (p.5), 'Parameter and Diagnostic Tables' (PDF p.7: tables/plots 'of the type shown in the texts'; a language 'such as R'; 'candidates will not be asked to write or interpret R code'), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/QQ Plot.md
---

![[Media/Figures/QQ_Plot.svg|340]]

A **QQ Plot** (quantile-quantile plot) is a plot of the ordered values of a sample against the corresponding quantiles of an assumed distribution, used to check whether the sample follows that distribution. For a sample of $n$ residuals ordered from smallest to largest, $e_{(1)} \le \cdots \le e_{(n)}$, the $i$th point of a normal QQ plot is

> $$\left(\Phi^{-1}(p_i),\ e_{(i)}\right)$$

- $\Phi^{-1}$ is the inverse of the standard normal cdf, so $\Phi^{-1}(p_i)$ is the theoretical quantile on the horizontal axis.
- $e_{(i)}$ is the $i$th smallest residual, the sample quantile on the vertical axis.

The plotting position $p_i$ of the $i$th smallest of $n$ ordered values is

> $$p_i = \frac{i}{n + 1}$$

Another convention, $p_i = (i - 0.5)/n$, gives slightly different coordinates. A straight reference line is drawn through the points. If the sample follows the assumed distribution, the points fall near the line. A QQ plot does not show how often each value occurs.

> [!example]- A regression has four residuals: $-1.2$, $0.4$, $-0.3$ and $1.1$. What are the points of their normal QQ plot? {Example}
> - In order, the residuals are $-1.2$, $-0.3$, $0.4$ and $1.1$.
> - With $n = 4$, the plotting positions are $i/5$: 0.2, 0.4, 0.6 and 0.8.
> - The standard normal quantiles of these are $-0.842$, $-0.253$, $0.253$ and $0.842$.
> - The points are $(-0.842, -1.2)$, $(-0.253, -0.3)$, $(0.253, 0.4)$ and $(0.842, 1.1)$.

## Reading a QQ plot

With the sample quantiles on the vertical axis, a departure from the line at each end shows how the sample's tails compare with the assumed distribution's:

| Pattern | Meaning |
| --- | --- |
| Points close to the line | The sample follows the assumed distribution |
| Low end below the line and high end above it (an S shape) | Both tails are heavier than assumed |
| Low end above the line and high end below it | Both tails are lighter than assumed |
| Only the high end above the line | The right tail is heavier than assumed, so the sample is more right-skewed |
| Only the low end below the line | The left tail is heavier than assumed, so the sample is more left-skewed |

A QQ plot of the residuals of a regression or a [[Generalized Linear Model|GLM]] checks the model's distributional assumption, alongside the [[Residual Plot|residual plot]] that checks its mean and variance.

> [!example]- The normal QQ plot of a severity regression's residuals follows the reference line in the middle, but its highest points rise well above the line. What does this show? {Example}
> - Only the high end departs from the line, and it lies above it.
> - The largest residuals are larger than a normal distribution would produce, so the right tail is heavier than assumed.
> - The normality assumption fails, and a right-skewed response distribution such as the [[Gamma]] should be considered.

> [!trap] Reading the tails from the wrong axis
> The patterns above hold with the sample quantiles on the vertical axis. When software puts the sample on the horizontal axis, every pattern reverses, so check the axes before reading the tails.
