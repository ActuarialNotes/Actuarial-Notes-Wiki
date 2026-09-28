---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:f67f5e40fe9ec5e19537ceb6166c203df72ce50e286f12575a4f1e2bd4aa2284
  sources:
    - "SOA Exam P Sample Solutions (Aug 2026 rev.), Q137 (PDF p.40), Q181 (PDF p.54), Q61 (PDF p.21), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA Exam P Sample Questions (Aug 2026 rev.), Q137 (questions PDF p.59), Q181 (questions PDF pp.77-78), sha256:e47245963f7d2c1c4f8cc5ff1baf2090542d923ac47cbeb27d1f657ac51bf5f0 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-questions.pdf"
    - "SOA, Tables for Exam C (Fall 2009; Loss Models 3rd ed. Appendices A-B excerpts), VaR_p entries: Pareto A.2.3.1 (PDF p.8), Exponential A.3.3.1 (PDF p.11); Poisson B.2.1.1 pmf, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA Exam P normal distribution table (rev. 4/29/21), Phi(1.64) = 0.9495, Phi(1.65) = 0.9505, z = 1.6449 for Pr(Z<z) = 0.95, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 2 (univariate random variables) learning outcomes c), d), e) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Percentile.md
---

The **Percentile** (or quantile) $x_p$ of a [[Random Variable]] $X$ is the smallest value at which the [[Cumulative Distribution Function (CDF)|CDF]] reaches $p$, so at least a proportion $p$ of the distribution lies at or below it. When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by inverting the CDF.

> $$x_p = \min\{x : F(x) \geq p\}$$

> $$F(x_p) = p \quad (F \text{ continuous, strictly increasing})$$

> $$x_p = F^{-1}(p)$$

- Here $p \in (0, 1)$; the $100p$-th percentile is the quantile of order $p$.
- The 50th percentile ($p = 0.5$) is the [[Median|median]].
- Where $F$ jumps past $p$ — a [[Discrete Random Variable|discrete]] variable, or a [[Payment Random Variable|payment]] with a probability mass at 0 — no $x$ solves $F(x) = p$; the percentile is the value at which the CDF first reaches or passes $p$. For a [[Poisson Distribution|Poisson]] with mean 3, $F(3) = 0.647$ and $F(4) = 0.815$, so its 75th percentile is 4.
- Percentiles describe tail behavior and underlie actuarial risk measures such as Value at Risk (VaR), the loss level a portfolio will not exceed with probability $p$.

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

> [!example]- Percentiles of a Payment Under a Deductible {Example}
> Losses $X$ are exponential with mean \$5,000, and a policy pays $Y = (X - 1{,}000)_+$. Find the 10th and 90th percentiles of $Y$.
>
> > [!answer]-
> > $Y = 0$ whenever $X \le 1{,}000$, so the CDF of $Y$ jumps at zero:
> > $$F_Y(0) = P(X \le 1{,}000) = 1 - e^{-0.2} = 0.1813$$
> > Since $F_Y(0) = 0.1813 \ge 0.10$, the 10th percentile is $y_{0.10} = 0$, even though $F_Y(y) = 0.10$ has no solution. Above the jump $F_Y$ is continuous and increasing, so the 90th percentile solves $F_Y(y) = 0.90$:
> > $$
> > \begin{align*}
> > 1 - e^{-(y + 1{,}000)/5{,}000} &= 0.90 \\
> > y + 1{,}000 &= 5{,}000 \ln 10 \\
> > y_{0.90} &= 11{,}512.93 - 1{,}000 \\
> >          &= 10{,}512.93
> > \end{align*}
> > $$
> > Every percentile with $p \le 0.1813$ is 0; above that, the continuous rule applies.
