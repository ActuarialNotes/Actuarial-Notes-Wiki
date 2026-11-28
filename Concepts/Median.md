---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:eb7cadf61972aaec1e14cf15678e4945a33d43a2c5386a2a43f6465ae577951f
  sources:
    - "https://www.randomservices.org/random/dist/CDF.html, §2.7 Distribution and Quantile Functions, Quantile Functions, sha256:50c869a04cf2c1fdbb4816de5a7a594436951d2e00cadfa069d12a10d6bd7173 — https://www.randomservices.org/random/dist/CDF.html"
    - "https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf, Q181, PDF p.53; Q61, PDF pp.20-21, sha256:147ff95346ea891a1fc9e889f412701a3a41561dcd6f330d285422249ae25c84 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm, §1.3.5.1 Measures of Location, sha256:4ec8ba684c77cb2904fb638eeb8f129dd4b39ad2396da1b7e0fb390fde49c6e7 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm"
    - "https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf, A.3.3.1 Exponential, PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
  open_findings: 3
  open_critical: 0
  log: .verify/Concepts/Median.md
---

A **Median** of a [[Random Variable|random variable]] $X$ is its 50th [[Percentile|percentile]], the value that splits its probability in half. For a [[Continuous Random Variable|continuous]] $X$ with [[Cumulative Distribution Function (CDF)|CDF]] $F$, the median $m$ solves

> $$F(m) = 0.5$$

- Equivalently, the area under the [[Probability Density Function (PDF)|density]] up to $m$ is 0.5.

> [!idea] The idea
> The median depends only on the order of the values, so a heavy right tail pulls the mean above the median and leaves the median alone.

For a symmetric distribution, such as the [[Normal Distribution|normal]] or the uniform, the median equals the mean.

> [!example]- Losses are exponential with mean 5,000, so $F(x) = 1 - e^{-x/5000}$. What is the median loss? {Example}
> - Setting the CDF to one half gives $e^{-m/5000} = 0.5$.
> - Taking logarithms, $m = 5000 \ln 2 \approx 3{,}466$.
> - Half of all losses are below about 3,466, though the mean is 5,000.
> - In general an [[Exponential Distribution|exponential]] with mean $\theta$ has median $\theta \ln 2 \approx 0.693\,\theta$.

## The median of a discrete distribution

When no value has $F = 0.5$ exactly, the median is the smallest $m$ at which the CDF reaches one half:

> $$F(m) \geq 0.5$$

> [!example]- A policy's claim count $N$ is 0, 1, 2 or 3 with probabilities 0.35, 0.25, 0.20 and 0.20. What is the median? {Example}
> - Accumulating the probabilities gives $F(0) = 0.35$ and $F(1) = 0.60$.
> - The CDF first reaches 0.5 at $n = 1$.
> - The median is 1.

## The median of a transformed loss

If $g$ is a non-decreasing function, the value of $g$ at the median of $X$ is the median of $g(X)$:

> $$\text{median of } g(X) = g(m)$$

A deductible $d$ and a limit $u$ are both non-decreasing, so the median payment is $\max(m - d, 0)$ under a deductible and $\min(m, u)$ under a limit.

> [!example]- Losses are exponential with mean 5,000 and median 3,466. A policy has a deductible of 1,000. What is the median payment? {Example}
> - The payment $\max(X - 1000, 0)$ rises with the loss, so it carries the median through.
> - The median payment is $3{,}466 - 1{,}000 = 2{,}466$.
> - With a deductible of 4,000, $F(4000) = 0.551$, so more than half of losses pay nothing and the median payment is 0.

## The median of a sample

The median of a sample is its middle value once the values are sorted. When the number of values is even, it is the average of the two middle values.

> [!example]- Six claims were 1,200, 300, 4,500, 800, 2,600 and 9,000. What are the sample median and mean? {Example}
> - Sorted, the claims are 300, 800, 1,200, 2,600, 4,500 and 9,000.
> - The two middle values are 1,200 and 2,600, so the median is 1,900.
> - The mean is $18{,}400 / 6 \approx 3{,}067$, pulled up by the claim of 9,000.

> [!trap] Subtracting the deductible from the mean
> The median passes through a deductible, but the mean doesn't. With the exponential losses above, the mean payment under a deductible of 1,000 is $5000\,e^{-0.2} \approx 4{,}094$, not $5000 - 1000 = 4000$.
