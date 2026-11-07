---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:63d7213d42259fa8c87a05917f07f7f029d52fc78ad3d23ced8af6f47108c5a3
  sources:
    - "Frees et al., Loss Data Analytics (open text), ch.4 Model Selection and Estimation: §4.1.1.3 smoothed empirical quantile (1-h)X_(j) + hX_(j+1), j = floor((n+1)q), h = (n+1)q - j (Example 4.1.3); §4.1.3.1 moments not available when they do not exist, percentile matching as the alternative; §4.1.3.2 Example 4.1.10 Pareto quantile theta((1-q)^(-1/alpha) - 1), numerical routine required, no analytic solution; Example 4.1.11 loglogistic by ratio of the two equations, n = 11, q = 0.4 gives 0.2 X_(4) + 0.8 X_(5); estimates vary with percentiles chosen; MLE more efficient, moments/percentile matching easier to explain and give starting values, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list PDF p.6: Tse §12.1 assigned, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Tse, Nonlife Actuarial Models (Cambridge UP, 2009), publisher preview, printed Contents (PDF pp.10-13): §12.1 Methods of moments and percentile matching (contents only), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "Frees et al., Loss Data Analytics (open text), ch.4 Model Selection and Estimation, §4.1.3.2 Example 4.1.11: loglogistic CDF F(x) = (x/theta)^gamma/(1+(x/theta)^gamma), percentile equations at two levels, 'Solving for each parenthetical expression gives', 'Taking the ratio of the second equation to the first' eliminates theta and gives gamma, then theta from either equation (HTML fetched 2026-10-30) — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Percentile Matching.md
---

**Percentile Matching** is a method of [[Parameter Estimation|parameter estimation]] that sets [[Percentile|percentiles]] of a distribution equal to the corresponding percentiles of the sample and solves for the parameters. For a distribution with cdf $F(x \mid \theta)$ and $k$ unknown parameters, $k$ percentile levels $g$ are chosen, and for each of them the equation is

> $$F(\hat{\pi}_g \mid \theta) = g$$

- $\hat{\pi}_g$ is the smoothed empirical percentile of the sample at level $g$.

> [!example]- Claim sizes are exponential with unknown mean $\theta$. The smoothed empirical median of a sample of claims is 485. What is the percentile matching estimate of $\theta$? {Example}
> - The equation at the median is $1 - e^{-485/\theta} = 0.5$.
> - Solving gives $485/\theta = \ln 2$.
> - The estimate is $\hat{\theta} = 485/\ln 2 = 699.7$.

## The smoothed empirical percentile

For a sample of size $n$ with [[Order Statistics|order statistics]] $x_{(1)} \le \cdots \le x_{(n)}$, the smoothed empirical percentile at level $g$ is at position $(n+1)g$ in the ordered sample. When the position is not a whole number, it is found by linear interpolation:

> $$\hat{\pi}_g = (1 - h)\,x_{(j)} + h\,x_{(j+1)}$$

- $j$ is the integer part of $(n+1)g$.
- $h = (n+1)g - j$ is the fractional part.

> [!example]- Ten claims are 120, 180, 260, 330, 410, 560, 720, 980, 1,600 and 2,400. What is the smoothed empirical median? {Example}
> - The position of the median is $(10 + 1)(0.5) = 5.5$, so $j = 5$ and $h = 0.5$.
> - The 5th and 6th order statistics are 410 and 560.
> - The smoothed empirical median is $0.5(410) + 0.5(560) = 485$.

## Two parameters

With two parameters, two percentile equations are solved together. When the distribution has a scale parameter $\theta$ and a shape parameter, dividing one equation by the other eliminates $\theta$. The shape parameter is found from the result, and $\theta$ from either equation. For the loglogistic distribution, $F(x) = \frac{(x/\theta)^\gamma}{1 + (x/\theta)^\gamma}$, each equation becomes

> $$\left(\frac{\hat{\pi}_g}{\theta}\right)^{\gamma} = \frac{g}{1 - g}$$

> [!example]- Eleven losses are 54, 95, 140, 190, 230, 310, 380, 450, 620, 840 and 1,300. A loglogistic distribution is fitted by matching the 25th and 75th smoothed empirical percentiles. What are the estimates of $\gamma$ and $\theta$? {Example}
> - With $n + 1 = 12$, the positions are $12(0.25) = 3$ and $12(0.75) = 9$, so $\hat{\pi}_{0.25} = 140$ and $\hat{\pi}_{0.75} = 620$.
> - The equations are $(140/\theta)^\gamma = 0.25/0.75 = 1/3$ and $(620/\theta)^\gamma = 0.75/0.25 = 3$.
> - Dividing the second equation by the first gives $(620/140)^\gamma = 9$.
> - The shape estimate is $\hat{\gamma} = \ln 9 / \ln(620/140) = 1.4766$.
> - From the first equation, $\hat{\theta} = 140 \times 3^{1/1.4766} = 294.6$.

## Comparison with the method of moments

Percentile matching does not use the moments of the distribution, and percentiles always exist. It can therefore fit a heavy-tailed distribution whose moments are infinite, or whose sample moments are dominated by the largest claims. A percentile near the middle of the data is not affected by extreme observations, but an extreme percentile such as the 95th rests on the largest observations. [[Maximum Likelihood Estimation|Maximum likelihood estimation]] uses all of the data, and percentile matching estimates are used as starting values for its numerical search.

> [!trap] Using $ng$ instead of $(n+1)g$ for the position
> The smoothed empirical percentile is at position $(n+1)g$. For 10 claims, the median is at position 5.5, halfway between the 5th and 6th order statistics, not at position $10(0.5) = 5$.
