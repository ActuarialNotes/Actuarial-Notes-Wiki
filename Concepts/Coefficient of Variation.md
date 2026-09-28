---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:f54ddb829e4c2de758e39ed8d124fc1aa3347a47da5e1b1f24ddf59dc2c8087f
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), pooling section (CV = ratio of SD to mean; useful for comparing variability between positive distributions with different expected values) (PDF pp.4-5), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 rev.), Q252 (solutions PDF p.74), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 2 (univariate random variables) learning outcomes c), d), e) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Coefficient of Variation.md
---

The **Coefficient of Variation** $CV$ is the ratio of the standard deviation to the mean, measuring dispersion as a proportion of the mean.

> $$CV = \frac{\sigma}{\mu}$$

> $$= \frac{\sqrt{\text{Var}(X)}}{E[X]}$$

- $CV$ is dimensionless, so it can compare the relative variability of distributions with different units or scales
- A larger $CV$ indicates greater dispersion relative to the mean
- It requires $E[X] \neq 0$; it is used to compare the variability of positive distributions, such as losses, with different expected values

![[Media/Figures/Coefficient_of_Variation.svg|340]]

> [!example]- Comparing Variability of Two Loss Distributions {Example}
> Distribution A has mean \$500 and standard deviation \$100. Distribution B has mean \$2{,}000 and standard deviation \$300. Which has greater relative variability?
>
> > [!answer]-
> > Compute each $CV$:
> > $$CV_A = \frac{100}{500} = 0.20, \qquad CV_B = \frac{300}{2{,}000} = 0.15$$
> > Distribution A has greater relative variability, even though its absolute standard deviation is smaller.
