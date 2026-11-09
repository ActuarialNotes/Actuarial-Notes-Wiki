---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:eb7cadf61972aaec1e14cf15678e4945a33d43a2c5386a2a43f6465ae577951f
  sources:
    - "Siegrist, Random (randomservices.org), 2.7 Distribution and Quantile Functions: quantile of order p has F(x-) <= p <= F(x); F^-1(p) = min{x: F(x) >= p} the smallest quantile; a quantile of order 1/2 is a median, HTML fetched 2026-11-06, sha256:50c869a04cf2c1fdbb4816de5a7a594436951d2e00cadfa069d12a10d6bd7173 — https://www.randomservices.org/random/dist/CDF.html"
    - "SOA Exam P Sample Solutions (2026-05 file), Q61 (PDF p.20-21: exponential median, then the maximum benefit), Q181 (PDF p.53: median payment = median loss less deductible; 20th percentile max(0, 200-250) = 0), sha256:e10d2649bdf708541f87849c85ef6cde195019cfc8a46ee9647f6733d74d04b2 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Tables for Exam C (Fall 2009), exponential F(x), VaR_p = -theta ln(1-p), E[X^x] (PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "NIST/SEMATECH e-Handbook, sec. 1.3.5.1 Measures of Location: sample median Y_((N+1)/2) for odd N, average of the two middle values for even N; median based on ranks, not distorted by extreme values; right-skewed -> mean > median; normal mean = median = mode, fetched 2026-11-06, sha256:33ce7517829e7097a99e8278bab71bc8ef71ac1d166edde5c07b8fa132466b98 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm"
    - "Siegrist, The Lognormal Distribution: quantile exp(mu + sigma Phi^-1(p)) (median e^mu), mean exp(mu + sigma^2/2), HTML fetched 2026-11-06, sha256:cec8c0b516a0fcc03bb953f82c186e3faa8ec2eee2479caf48df2850bfe2c51c — https://www.randomservices.org/random/special/LogNormal.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL), §5.2 exponential density F = 1 - e^{-lambda x}, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 2 learning outcomes c) (expected values incl. mode, median, percentiles) and e) (amount an insurance company pays to a policyholder given deductibles, coinsurance percentages, benefit limits, inflation), PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
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
