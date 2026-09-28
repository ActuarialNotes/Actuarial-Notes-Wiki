---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:8e177b2d453af52409cced27a6e0a6e0d6985979470dc3f72b68fd03be099461
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), §III theorem on S_n (PDF pp.4-5), §VI Deductibles (PDF p.7) and Benefit Limits (PDF pp.8-9), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q101 (PDF pp.30-31), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 2 outcomes e-f (PDF p.3) and Topic 3 outcome i (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "SOA, Tables for Exam C (Fall 2009), A.3.3.1 Exponential (PDF p.11) and A.2.3.1 Pareto (PDF p.8), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Random Variable.md
---

The **loss random variable** $X$ represents the ground-up loss amount before any policy modifications such as [[Deductible]]s, [[Coinsurance Percentage|Coinsurance Percentages]], or [[Benefit Limit|Benefit Limits]] are applied.
- The [[Expected Value]] and [[Variance]] of the corresponding [[Payment Random Variable]] $Y$ differ from those of $X$ because of the truncation and censoring imposed by policy terms

> $$Y = \begin{cases} 0 & X \leq d \\ X - d & X > d \end{cases}$$
>
> $$\text{where } d = \text{ordinary deductible}$$

![[Media/Figures/Loss_Random_Variable.svg|340]]

> [!example]- Expected Payment with Deductible {Example}
> Ground-up losses $X \sim \text{Exp}(\theta = 1000)$. A policy has an ordinary deductible $d = 500$.
>
> > [!answer]-
> > The expected payment per loss is:
> > $$E[Y] = E[\max(X - 500,\, 0)] = \int_{500}^{\infty}(x-500)\cdot\frac{1}{1000}e^{-x/1000}\,dx = 1000\,e^{-0.5} \approx 606.5$$
