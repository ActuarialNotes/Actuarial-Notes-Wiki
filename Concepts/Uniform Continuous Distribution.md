---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:2d98b81ef9f2162200fa926a8514c20134277000acc157d5ef65efe1a35d17b3
  sources:
    - "NIST/SEMATECH e-Handbook of Statistical Methods, 1.3.6.6.2 Uniform Distribution (pdf, cdf, common statistics), fetched 2026-09-28, sha256:c420db7b6567c417241eca246094bddb30692813e5cd34c260f396a9f8796fad — https://www.itl.nist.gov/div898/handbook/eda/section3/eda3662.htm"
    - "SOA, Exam P Sample Solutions (Aug 2026 revision), Q473 (PDF p.132), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 2.2 Example 2.17 p.68 (PDF p.76) and 5.2 p.206 (PDF p.214), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Uniform Continuous Distribution.md
---

The **Continuous Uniform Distribution** $X \sim \text{Unif}(a, b)$ assigns equal probability density to every point in the interval $(a, b)$, making it the continuous analogue of the discrete uniform. It is commonly used as a simple loss model when all outcomes in a range are equally plausible.

> $$f(x) = \frac{1}{b - a}, \quad a < x < b$$

- $E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$
- Conditional distributions on sub-intervals are also uniform: given $X > d$, $X$ is uniform on $(d, b)$
- The uniform is **not** memoryless — the exponential is the only continuous density that is. For $\text{Unif}(0, 10)$, $P(X > 8 \mid X > 5) = 2/5$, but $P(X > 3) = 7/10$

![[Media/Figures/Uniform_Continuous_Distribution.svg|340]]

> [!example]- Expected Payment with Uniform Losses and a Deductible {Example}
> Ground-up losses $X \sim \text{Unif}(0, 1000)$. An ordinary deductible of $d = 300$ applies. Find $E[(X - 300)_+]$.
>
> > [!answer]-
> > Since losses are uniform, those above 300 are distributed $\text{Unif}(300, 1000)$. The probability of exceeding the deductible is $P(X > 300) = 700/1000 = 0.7$, and given $X > 300$ the expected excess is $700/2 = 350$. Therefore:
> > $$E[(X-300)_+] = P(X > 300) \times E[X - 300 \mid X > 300] = 0.7 \times 350 = 245$$
