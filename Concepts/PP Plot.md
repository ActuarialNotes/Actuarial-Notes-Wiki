---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:750d66961ba767699366abd7b5346d5a2175d1f444a8375108e752619beb5c94
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/PP Plot.md
---

A **PP Plot** (p-p plot) is a graphical test of whether a stochastic reserving model predicts the *distribution* of outcomes correctly. Each of $n$ triangles is fitted with its outcome held back, and the [[Percentile|percentile]] of the actual outcome within the model's predictive distribution is recorded. The sorted percentiles are plotted against the values expected if they were uniform.

If the model is right, each outcome is a random draw from its predictive distribution, so its percentile is [[Uniform Continuous Distribution|uniform]] on $(0, 100)$. One percentile says little, since the 86th is not unusual. Many percentiles together make uniformity testable.

The expected value of the $i$-th of $n$ sorted uniform percentiles is

> $$e_i = 100 \cdot \frac{i}{n+1}$$

- $i = 1, \dots, n$.

$e_i$ goes on the horizontal axis, and the sorted predicted percentiles of the outcomes, $p_1 \leq \dots \leq p_n$ on a 0–100 scale, go on the vertical. A model that predicts well gives a plot along the $45^\circ$ line.

For a model with a simulated predictive distribution, such as an [[Markov Chain Monte Carlo|MCMC]] model, the percentile is the share of simulated outcomes at or below the actual one. For the Mack model, Meyers fits a [[Lognormal Distribution|lognormal]] with Mack's mean and standard deviation.

> [!example]- What percentile does this outcome reach, and where does it plot? {Example}
> For Meyers' illustrative incurred triangle, the Mack model gives a total ultimate of $38{,}914$ with standard deviation $1{,}057$. The actual total turned out to be $40{,}061$. Among the $200$ triangles tested, its percentile ranks $172$nd from the bottom.
>
> > [!answer]-
> > - Match a lognormal's moments: $\sigma^2 = \ln\left(1 + (1{,}057/38{,}914)^2\right) = 0.000738$, so $\sigma = 0.02716$.
> > - $\mu = \ln 38{,}914 - \tfrac{1}{2}(0.000738) = 10.56874$.
> > - $z = (\ln 40{,}061 - 10.56874)/0.02716 = 1.083$, and $\Phi(1.083) = 0.861$. The outcome is at the $86$th percentile. Meyers reports $86.03$.
> > - On the horizontal axis, $e_{172} = 100 \cdot 172/201 = 85.57$.
> > - The point plots at $(85.6,\ 86.0)$, on the $45^\circ$ line. One outcome is never evidence against a model; only the pattern of all $200$ is.

## Kolmogorov-Smirnov test

[[Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019)|Meyers (2019)]] calls a model "validated" when the plot stays inside the Kolmogorov-Smirnov (KS) band. The KS test measures the gap against $f_i = 100\,i/n$, an approximation to $e_i$. The test statistic is

> $$D = \max_i \left| p_i - f_i \right|$$

At the 5% level, uniformity is rejected when

> $$D > \frac{136}{\sqrt{n}}$$

The band is drawn $136/\sqrt{n}$ above and below the $45^\circ$ line. It is $19.2$ for one line's $50$ triangles and $9.6$ for all $200$. The Anderson-Darling test is more sensitive in the tails, but Meyers found almost every model failed it, so he kept the KS test.

> [!example]- Does this model pass the KS test at 5%, and what shape does its plot have? {Example}
> A model is validated on $16$ triangles. The sorted outcome percentiles are
>
> $2,\ 4,\ 5,\ 6,\ 8,\ 9,\ 12,\ 30,\ 55,\ 78,\ 90,\ 93,\ 95,\ 96,\ 98,\ 99$
>
> > [!answer]-
> > - The critical value is $136/\sqrt{16} = 34.0$.
> > - The largest gaps are at $i = 7$, $|12 - 43.75| = 31.75$, and $i = 6$, $|9 - 37.50| = 28.50$.
> > - $D = 31.75 < 34.0$, so uniformity is **not rejected**.
> > - Seven outcomes are at or below the $12$th percentile and six at or above the $90$th, where a uniform would put about two in each.
> > - The plot hugs the bottom, climbs steeply through the middle and flattens near the top. That is the slanted "S" of a model **too light in the tails**, which a sample of 16 is too small to reject.

## Histogram of percentiles

**A histogram** of the percentiles is the most visual test, with bars that should be level. It fluctuates too much to judge by eye unless $n$ is very large, and the p-p plot with KS bands adds a significance test.

## Reading the shape

Meyers' Figure 3.1 shows three patterns:

- **Slanted "S"** (flat at both ends, steep through the middle): too many outcomes in the high and low percentiles, so the predicted distribution is **too light in the tails**. The histogram is U-shaped.
- **Slanted backward "S"** (steep at both ends, flat through the middle): too many outcomes in the middle percentiles, so the predicted distribution is **too heavy in the tails**. The histogram peaks in the middle.
- **Below the $45^\circ$ line throughout**: outcomes pile into the low percentiles, so the model predicts results that are **too high** (biased high). The mirror image, above the line, would mean predictions too low.

The test judges a model's "reputation" across many insurers' triangles, not one insurer's reserve. It looks only at the total of the last column of the lower triangle. Meyers adds $\widehat{elpd}_{test}$, which scores the whole [[Holdout Sample|holdout]] lower triangle, as a second retrospective test.

## Meyers' results

The combined p-p plots Meyers reports ($n = 200$, critical value $9.6$) are:

| Model | Data | $D$ | Pattern |
|---|---|---|---|
| Mack | incurred | $15.4$ | light tails |
| Mack | paid | $23.1$ | biased high |
| Bootstrap ODP | paid | $24.1$ | biased high |
| CRC | paid | $25.5$ | biased high |
| CRC | incurred | $11.9$ | light tails |
| SCC | paid | $20.8$ | fails |
| SCC | incurred | $23.2$ | fails |
| CSR | paid | $3.1$ | passes |
| CAY | incurred | $10.8$ | improved, still outside |
| IPI | paid | $8.7$ | passes |
| IPI | incurred | $9.4$ | passes |

The models are the [[Mack Chain Ladder Model|Mack]], [[ODP Bootstrap Model|bootstrap ODP]], [[Cross Classified Model|CRC]], [[Stochastic Cape Cod Model|stochastic Cape Cod (SCC)]], [[Changing Settlement Rate Model|CSR]], [[Correlated Accident Year Model|CAY]] and [[Integrated Paid and Incurred Model|integrated paid and incurred (IPI)]] models.

With Mack on incurred data, three of four lines stayed inside their bands of $19.2$, but pooling all $200$ triangles took the plot outside $9.6$.

> [!trap] Passing with too few triangles
> A small sample can hide a real misfit. The 16-triangle model above passes the KS test with a clear light-tailed "S", so pool across lines before concluding a model is validated.
