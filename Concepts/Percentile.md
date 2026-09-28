---
verification:
  status: verified
  confidence: low
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:f71ca2adc19495f158a8cd953a0368ebd4785109212b18a25360d8271e9755eb
  sources:
    - "SOA, Tables for Exam C (Fall 2009; Loss Models 3rd ed. Appendices A-B excerpts), VaR_p entries: Pareto A.2.3.1 (PDF p.8), Exponential A.3.3.1 (PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q137 (PDF p.40), Q181 (PDF p.54), Q61 (PDF p.21), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA Exam P normal distribution table (rev. 4/29/21), Phi(1.64) = 0.9495 and Phi(1.65) = 0.9505, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf"
    - "SOA Probability Exam syllabus, November 2026, univariate random variables learning objectives c) (expected values incl. moments, mode, median, percentiles) and d) (variance, standard deviation, coefficient of variation), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Percentile.md
---

The **Percentile** (or quantile) $x_p$ of a [[Random Variable]] $X$ is the value below which a proportion $p$ of the distribution lies — the smallest $x_p$ with $P(X \leq x_p) = p$. It is obtained by inverting the [[Cumulative Distribution Function (CDF)|CDF]].

> $$P(X \leq x_p) = F(x_p)$$

> $$= p$$

> $$x_p = F^{-1}(p)$$

- Here $p \in (0, 1)$; the $100p$-th percentile is the quantile of order $p$.
- The 50th percentile ($p = 0.5$) is the median, splitting the distribution into two equal halves.
- Percentiles describe tail behavior and underlie actuarial risk measures such as Value at Risk (VaR), the loss level a portfolio will not exceed with probability $p$.
- For a continuous, strictly increasing $F$ the inverse is unique; where $F$ is flat or jumps, take the smallest $x_p$ satisfying the condition.

![[Media/Figures/Percentile.svg|340]]

> [!example]- 90th Percentile of an Exponential Distribution {Example}
> Claim sizes follow an [[Exponential Distribution]] with CDF $F(x) = 1 - e^{-x/10}$ for $x \geq 0$. Find the 90th percentile.
>
> > [!answer]-
> > Set $F(x_{0.90}) = 0.90$ and solve:
> > $$\begin{align*} 1 - e^{-x_{0.90}/10} &= 0.90 \\ e^{-x_{0.90}/10} &= 0.10 \\ x_{0.90} &= -10 \ln(0.10) \\ &= 10 \ln(10) \approx 23.03 \end{align*}$$
> > About 90% of claims fall below 23.03.

> [!example]- 95th Percentile of a Normal Loss {Example}
> Annual losses follow a [[Normal Distribution]] $X \sim N(\mu = 100,\ \sigma^2 = 225)$. Find the 95th percentile.
>
> > [!answer]-
> > The 95th percentile of the standard normal is $z_{0.95} = 1.645$. Transform back with $\sigma = 15$:
> > $$\begin{align*} x_{0.95} &= \mu + z_{0.95}\,\sigma \\ &= 100 + 1.645(15) \\ &= 124.68 \end{align*}$$
> > There is a 95% chance the annual loss is below 124.68.
