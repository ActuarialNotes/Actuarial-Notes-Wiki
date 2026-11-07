---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:e416750fd5bc10f5cda3354cba7296064cf510be266fb803bbe4b26d4ef16bbf
  sources:
    - "Frees et al., Loss Data Analytics (open text), Ch 4 'Model Selection and Estimation', §4.1.1.4 Density Estimators: eq. (4.2) f_n(x) = (1/2nb) sum I(x-b < X_i <= x+b), eq. (4.3) kernel estimator (1/nb) sum w((x-X_i)/b), Table 4.1 kernels (uniform 1/2 I(-1<x<=1), triangle (1-|x|) I(|x|<=1), Gaussian phi), kernel CDF estimator (1/n) sum W((x-X_i)/b) with uniform W, bandwidth bias-variance trade-off (Example 4.1.4), sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "CAS Exam MAS-I Spring 2019, Q20 — official exam paper (scan), PDF p.24; Final Answer Key PDF p.50 (Q20 = D), sha256:02debe7c986ee38d3f484b277d0dc4a08ec424d0bb3b868b4890e4edb9312274 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_spmasi-19.pdf"
    - "Tse, Nonlife Actuarial Models (Cambridge UP, 2009), publisher preview, printed Contents p.x (PDF p.12): §11.1.2 Kernel estimation of probability density function p.306, sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Tse Sections incl. 11.1 assigned (Domains B1-B4, B7-9), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Kernel Density Estimation.md
---

**Kernel Density Estimation** is a nonparametric method of estimating a [[Probability Density Function (PDF)|density]] from a sample $x_1, \ldots, x_n$, in which each observation is replaced by a density centred on it, called a kernel, and the $n$ kernels are averaged. If $k_y(x)$ is the kernel centred at $y$, the kernel density estimate at $x$ is

> $$\hat{f}(x) = \frac{1}{n}\sum_{i=1}^{n} k_{x_i}(x)$$

The spread of each kernel is set by its bandwidth $b > 0$. A larger bandwidth gives a smoother estimate that can miss local features of the data, and a smaller one follows the data closely but varies more, a [[Bias-Variance Tradeoff|bias-variance tradeoff]].

## The rectangular kernel

The rectangular, or uniform, kernel spreads each observation evenly over the interval from $y - b$ to $y + b$:

> $$k_y(x) = \frac{1}{2b}$$

- $y - b \le x \le y + b$, and $k_y(x) = 0$ outside this interval.

An observation contributes $\frac{1}{2b}$ to the sum when it is within $b$ of $x$, including an observation exactly $b$ from $x$. The estimate is therefore the number of observations within $b$ of $x$, divided by $2bn$.

> [!example]- Five losses are 300, 450, 500, 700 and 800. What is the rectangular kernel density estimate at 600 with bandwidth 200? {Example}
> - The observations within 200 of 600 are 450, 500, 700 and 800, where 800 is exactly 200 away.
> - The loss of 300 is 300 away and contributes 0.
> - The estimate is $\hat{f}(600) = \dfrac{4}{2 \times 200 \times 5} = 0.0020$.

## The triangular kernel

The triangular kernel is a tent over the same interval, highest at $y$:

> $$k_y(x) = \frac{b - |x - y|}{b^2}$$

- $y - b \le x \le y + b$, and $k_y(x) = 0$ outside this interval.

An observation exactly $b$ from $x$ contributes 0.

> [!example]- For the same five losses, what is the triangular kernel density estimate at 600 with bandwidth 200? {Example}
> - The distances from 600 to 450, 500, 700 and 800 are 150, 100, 100 and 200, so the numerators $b - |x - x_i|$ are 50, 100, 100 and 0.
> - The loss of 300 is outside the interval and contributes 0.
> - The estimate is $\hat{f}(600) = \dfrac{250}{40{,}000 \times 5} = 0.00125$.

## The Gaussian kernel

The Gaussian kernel is the [[Normal Distribution|normal]] density with mean $y$ and standard deviation $b$:

> $$k_y(x) = \frac{1}{b\sqrt{2\pi}}\, e^{-(x - y)^2/(2b^2)}$$

Unlike the other two kernels, it gives every observation some weight at every $x$.

> [!example]- For the same five losses, what is the Gaussian kernel density estimate at 600 with bandwidth 200? {Example}
> - The standardized distances $(600 - x_i)/200$ are 1.5, 0.75, 0.5, $-0.5$ and $-1.0$.
> - The standard normal density at these values is 0.1295, 0.3011, 0.3521, 0.3521 and 0.2420, with sum 1.3768.
> - The estimate is $\hat{f}(600) = \dfrac{1.3768}{200 \times 5} = 0.00138$.

## The kernel-smoothed distribution function

The kernel-smoothed estimate of the [[Cumulative Distribution Function (CDF)|cdf]] averages the cdfs of the kernels:

> $$\hat{F}(x) = \frac{1}{n}\sum_{i=1}^{n} K_{x_i}(x)$$

- $K_y(x)$ is the cdf of the kernel centred at $y$.

For the rectangular kernel, $K_y(x)$ is 0 for $x < y - b$, 1 for $x > y + b$, and in between

> $$K_y(x) = \frac{x - (y - b)}{2b}$$

> [!example]- Claim sizes, in thousands, are 2, 5, 6, 9 and 15. What is the kernel-smoothed estimate of $F(6.5)$ with a rectangular kernel of bandwidth 2? {Example}
> - The claim of 2 lies wholly below 6.5, so $K_2(6.5) = 1$.
> - $K_5(6.5) = (6.5 - 3)/4 = 0.875$ and $K_6(6.5) = (6.5 - 4)/4 = 0.625$.
> - The claims of 9 and 15 lie wholly above 6.5, so they contribute 0.
> - The estimate is $\hat{F}(6.5) = (1 + 0.875 + 0.625)/5 = 0.5$.

> [!trap] Leaving out an observation exactly $b$ away
> The rectangular kernel's interval is closed, so an observation exactly $b$ from $x$ contributes $\frac{1}{2b}$. In the first example, leaving out the loss of 800 gives $\hat{f}(600) = 0.0015$ instead of 0.0020.
