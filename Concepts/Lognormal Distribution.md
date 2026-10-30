---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:953132a18c312516a21c52d2dcfdd26cf0de5f52aa7081aeb8ee28c4f891712e
  sources:
    - "SOA, Tables for Exam C (Fall 2009), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; A.5.1.1 Lognormal, printed p.6 (PDF p.11); SOA, Exam P normal distribution table (rev. 4/29/21), standard normal table and selected-percentile row, PDF p.2, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.2 Exercise 37 p.224 (PDF p.232), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Tables for Exam C (Fall 2009), A.3.2.1 Gamma M(t) = (1 - theta t)^-alpha, t < 1/theta (PDF p.9); A.3.3.1 Exponential M(t) = (1 - theta t)^-1 and A.5.1.1 Lognormal E[(X ^ x)^k] = exp(k mu + k^2 sigma^2/2) Phi((ln x - mu - k sigma^2)/sigma) + x^k[1 - F(x)] (PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "Siegrist / standard normal symmetry 1 - Phi(x) = Phi(-x) as in SOA, Exam P normal distribution table (rev. 4/29/21), sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Lognormal Distribution.md
---

The **Lognormal Distribution** $X \sim \text{Lognormal}(\mu, \sigma^2)$ applies when $\ln X \sim N(\mu, \sigma^2)$. It is widely used to model insurance losses, asset prices, and any quantity that must be positive and right-skewed.

> $$f(x) = \frac{1}{x\sigma\sqrt{2\pi}}\exp\!\left(-\frac{(\ln x - \mu)^2}{2\sigma^2}\right)$$
>
> $$x > 0$$
>
> $$\text{where } \mu \in \mathbb{R} = \text{log-mean},\; \sigma > 0 = \text{log-standard deviation}$$

> $$E[X] = e^{\mu + \sigma^2/2}$$

> $$\text{Var}(X) = e^{2\mu+\sigma^2}(e^{\sigma^2}-1)$$

> $$F(x) = \Phi\!\left(\frac{\ln x - \mu}{\sigma}\right)$$

> $$E[X \wedge d] = e^{\mu + \sigma^2/2}\,\Phi\!\left(\frac{\ln d - \mu - \sigma^2}{\sigma}\right) + d\left[1 - \Phi\!\left(\frac{\ln d - \mu}{\sigma}\right)\right]$$

- The last block is the [[Limited Expected Value|limited expected value]] as the Loss Models tables give it. Write $z = (\ln d - \mu)/\sigma$, so $S(d) = 1 - \Phi(z)$.
- **Mean of the losses above $d$.** Since $E[X \wedge d] = E[X\,1\{X \le d\}] + d\,S(d)$, the part of the mean that comes from losses above $d$ is $E[X\,1\{X > d\}] = E[X] - E[X \wedge d] + d\,S(d) = e^{\mu + \sigma^2/2}\left[1 - \Phi(z - \sigma)\right]$. Dividing by $S(d)$, and using $1 - \Phi(z - \sigma) = \Phi(\sigma - z)$:

> $$E[X \mid X > d] = \frac{e^{\mu + \sigma^2/2}\,\Phi\!\left(\sigma - \frac{\ln d - \mu}{\sigma}\right)}{1 - \Phi\!\left(\frac{\ln d - \mu}{\sigma}\right)}$$

- The [[Mean Excess Loss|mean excess loss]], the expected payment per payment under an ordinary deductible $d$, is that minus $d$: $e(d) = E[X \mid X > d] - d$, the same as $(E[X] - E[X \wedge d])/S(d)$.

![[Media/Lognormal_distribution_pdf.svg|500]]

![[Media/Figures/Lognormal_Distribution.svg|340]]

> [!example]- Probability a Loss Exceeds a Threshold {Example}
> Losses follow $X \sim \text{Lognormal}(\mu = 6,\, \sigma = 1.5)$. Find $P(X > 1000)$.
>
> > [!answer]-
> > $$P(X > 1000) = 1 - \Phi\!\left(\frac{\ln 1000 - 6}{1.5}\right) = 1 - \Phi\!\left(\frac{6.908 - 6}{1.5}\right) = 1 - \Phi(0.605) \approx 1 - 0.7274 = 0.2726$$
