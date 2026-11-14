---
aliases:
  - Individual Data
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:072ff817fedd2ef081c0f7cc1e99d864797836e0e48295dd79d25d2c5b824573
  sources:
    - "Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.4 Model Selection and Estimation, 4.3.1.1 grouped (interval-censored) likelihood prod [F(c_j)-F(c_{j-1})]^{n_j}; 4.3.2.1 ogive linear interpolation and its density, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.3 Modeling Loss Severity, 3.5.1 complete individual data likelihood; 3.5.2.1 grouped-data MLE, c_k often infinity, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "SOA Exam FAM Syllabus, February 2027, Topic 3 Parametric Estimation (individual, grouped, truncated or censored), p.4, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Grouped Data.md
---

**Grouped Data** record each observation only by the interval it fell in: the data are the boundaries $c_0 < c_1 < \cdots < c_k$ and the number of observations $n_j$ in each interval $(c_{j-1}, c_j]$. **Individual data**, by contrast, record the exact value of each observation. Either kind is complete when no observation is [[Truncation|truncated]] or [[Censoring|censored]].

[[Maximum Likelihood Estimation|Maximum likelihood]] handles grouped data by giving each interval the probability that the model assigns to it, so the likelihood is

> $$L(\theta) = \prod_{j=1}^{k}\big[F(c_j \mid \theta) - F(c_{j-1} \mid \theta)\big]^{n_j}$$

- $F(x \mid \theta)$ is the model's distribution function.
- An open last interval has $c_k = \infty$ and $F(\infty \mid \theta) = 1$, so it contributes $S(c_{k-1} \mid \theta)^{n_k}$.

For individual data the likelihood is $\prod_{i=1}^{n} f(x_i \mid \theta)$, in which each exact value contributes its density. Grouped data say nothing about where in its interval each value fell, so grouping is a form of interval censoring. A likelihood can mix individual values, grouped counts and censored claims, each record contributing its own term.

The grouped likelihood usually has to be maximised numerically. For the [[Exponential Distribution|exponential]] with equally spaced boundaries, every term is a power of $p = e^{-h/\theta}$, where $h$ is the spacing, and a likelihood of the form $(1-p)^a\,p^b$ is maximised at $p = b/(a+b)$. With only two groups, the maximum sets $F(c_1 \mid \theta) = n_1/n$ for any one-parameter model that can reach it.

> [!example]- What is the maximum likelihood exponential fit to these claims counted by size band? {Example}
> A claims system reports 100 claims only by size band: 60 at or below $\$1{,}000$, 25 between $\$1{,}000$ and $\$2{,}000$, and 15 above $\$2{,}000$.
>
> > [!answer]-
> > - Write $p = e^{-1{,}000/\theta}$, so that the three bands have probabilities $1 - p$, $p(1 - p)$ and $p^2$.
> > - $L = (1 - p)^{60}\,\big[p(1 - p)\big]^{25}\,\big(p^2\big)^{15} = (1 - p)^{85}\,p^{55}$.
> > - Setting the derivative of $85\ln(1 - p) + 55\ln p$ to 0 gives $p = 55/140 = 0.39286$.
> > - $\hat\theta = -1{,}000/\ln 0.39286 = 1{,}000/0.93431 = 1{,}070.31$.
> > - The fitted model puts 60.7%, 23.9% and 15.4% of claims in the three bands, close to the observed 60%, 25% and 15%.

> [!trap] Using the density for a grouped observation
> A grouped observation contributes the probability of its interval, $F(c_j) - F(c_{j-1})$. Using the density at the interval's midpoint treats the data as individual and gives a different estimate.

## Histogram and ogive

With $n = \sum n_j$ observations, the histogram is

> $$f_n(x) = \frac{n_j}{n\,(c_j - c_{j-1})}, \quad c_{j-1} \le x < c_j$$

The [[Histogram|histogram]] $f_n$ is constant on each interval, with total area 1. The ogive $F_n$, its integral, is

> $$F_n(x) = F_n(c_{j-1}) + (x - c_{j-1})\,f_n(x)$$

The ogive joins the [[Empirical Distribution|empirical distribution]] function at the boundaries with straight lines, which assumes that the observations are spread evenly within each interval. Neither is defined on an open last interval.

> [!example]- What are $f_{100}(800)$, $F_{100}(800)$ and the ogive's estimate of $\Pr(X > 1{,}500)$ for these claims? {Example}
> One hundred claims are grouped as follows:
>
> | Interval | Claims |
> | :--- | ---: |
> | $(0, 500]$ | 30 |
> | $(500, 1{,}000]$ | 35 |
> | $(1{,}000, 2{,}500]$ | 25 |
> | $(2{,}500, 5{,}000]$ | 10 |
>
> > [!answer]-
> > - At the boundaries, $F_{100}(500) = 0.30$, $F_{100}(1{,}000) = 0.65$ and $F_{100}(2{,}500) = 0.90$.
> > - $f_{100}(800) = \frac{35}{100(500)} = 0.0007$.
> > - $F_{100}(800) = 0.30 + 300(0.0007) = 0.51$.
> > - $F_{100}(1{,}500) = 0.65 + \frac{500}{1{,}500}(0.25) = 0.7333$.
> > - The estimate of $\Pr(X > 1{,}500)$ is $1 - 0.7333 = 0.2667$.
