---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:0495752510eb4e7d9ef19e4b03426530a5c454a7fc07a18b0c1a188ae069ef7c
  sources:
    - "SOA, Tables for Exam C (Fall 2009; Loss Models 3rd ed. Appendices A-B excerpts), Gamma A.3.2.1 (PDF p.9), Exponential A.3.3.1 and Lognormal (PDF p.11), Poisson B.2.1.1 (PDF p.14), Binomial (PDF p.15), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q137 (PDF p.40), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, sec. 1.3.5.1 Measures of Location (fetched 2026-09-27), sha256:0a089979887b22d95c06e33973825f6222d73b60f1cde964df479a13bbd7d1d3 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm"
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), pooling section (CV = SD/mean; sqrt(n) sigma less than n sigma) and benefit-limit section (premium based primarily on expected claim payments), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "SOA Probability Exam syllabus, November 2026, univariate random variables learning objectives c) (expected values incl. moments, mode, median, percentiles) and d) (variance, standard deviation, coefficient of variation), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mode.md
---

The **Mode** of a [[Random Variable]] $X$ is the value at which its [[Probability Mass Function (PMF)|PMF]] or [[Probability Density Function (PDF)|PDF]] $f(x)$ is largest — the single most likely value of a [[Discrete Random Variable|discrete]] variable, or the peak of a [[Continuous Random Variable|continuous]] density.

> $$\text{mode} = \arg\max_{x}\, f(x)$$

- **Interior peak (continuous):** solve $f'(x) = 0$ and confirm it is a maximum. Maximising $\ln f(x)$ gives the same point and is usually easier for gamma- or lognormal-type densities, where the product becomes a sum.
- **Endpoint peak:** a density that only decreases, such as the [[Exponential Distribution|exponential]], has its mode at the left end of the support. Calculus finds no critical point there, so always check the endpoints.
- **Discrete:** compare neighbouring probabilities. For the [[Poisson Distribution|Poisson]], $p(k)/p(k-1) = \lambda/k$, so probabilities rise while $k \le \lambda$ and the mode is $\lfloor \lambda \rfloor$ (both $\lambda - 1$ and $\lambda$ when $\lambda$ is an integer). For the [[Binomial Distribution|binomial]] the same argument gives $\lfloor (n+1)p \rfloor$ (and $(n+1)p - 1$ as well when $(n+1)p$ is an integer).
- A mode need not be unique. A uniform distribution has every point of its support as a mode, and a mixture of two claim populations can be bimodal.
- Standard results: [[Normal Distribution|normal]] $\mu$; [[Gamma]] $(\alpha - 1)\theta$ for $\alpha \ge 1$; [[Lognormal Distribution|lognormal]] $e^{\mu - \sigma^2}$. For a right-skewed severity, mode < [[Median|median]] < [[Expected Value|mean]] is typical, and the lognormal always obeys it: $e^{\mu - \sigma^2} < e^{\mu} < e^{\mu + \sigma^2/2}$.
- The mode ignores the tail entirely. It describes the most common claim, not the cost of claims — pricing is done on the mean.

> [!example]- Most Likely Claim Size under a Gamma Severity {Example}
> Claim sizes have density $f(x) = \dfrac{x\,e^{-x/2{,}000}}{2{,}000^2}$ for $x > 0$ (a gamma with $\alpha = 2$, $\theta = 2{,}000$). Find the mode and compare it with the mean.
>
> > [!answer]-
> > Maximise the log-density:
> > $$
> > \begin{align*}
> > \ln f(x) &= \ln x - \frac{x}{2{,}000} - 2\ln 2{,}000 \\
> > \frac{d}{dx}\ln f(x) &= \frac{1}{x} - \frac{1}{2{,}000} \\
> > 0 &= \frac{1}{x} - \frac{1}{2{,}000} \\
> > x &= 2{,}000
> > \end{align*}
> > $$
> > The second derivative $-1/x^2$ is negative, so this is a maximum: the mode is \$2,000, matching $(\alpha - 1)\theta$. The mean is $\alpha\theta = \$4{,}000$, and the median, found numerically from $F(m) = 0.5$, is about \$3,357. The most common claim is half the average one — a premium set at the mode would collect half the expected cost.

> [!example]- Most Likely Claim Count for a Fleet {Example}
> A fleet's annual claim count is Poisson with $\lambda = 2.6$. Find the mode and its probability.
>
> > [!answer]-
> > The ratio $p(k)/p(k-1) = 2.6/k$ is $2.6$ at $k = 1$ and $1.3$ at $k = 2$, both above 1, then $0.87$ at $k = 3$. Probabilities rise up to $k = 2$ and fall after, so the mode is $\lfloor 2.6 \rfloor = 2$.
> > $$
> > \begin{align*}
> > p(2) &= \frac{e^{-2.6}\,(2.6)^2}{2} \\
> >      &= 0.07427 \times 3.38 \\
> >      &= 0.2510
> > \end{align*}
> > $$
> > Its neighbours are $p(1) = 0.1931$ and $p(3) = 0.2176$. Two claims is the single likeliest outcome, yet it happens only a quarter of the time, and the mean of $2.6$ is not itself a possible count.
