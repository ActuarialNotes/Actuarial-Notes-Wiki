---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:f2a4e01845b8e1ef571d83eeb3f0078ba86cb4a3a22546bac98dde9a863f6dcf
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05), §VI Deductibles: loss vs claim payment, 500 deductible pays 1500 on 2000 PDF p.7; Benefit limits PDF pp.8-9, sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "Frees et al., Loss Data Analytics (open text), Ch.3 Modeling Loss Severity, §3.4.1 Y^L left censored and shifted, Y^P left truncated and shifted, E(Y^L) = int_d^inf (x-d) f; §3.4.2 X^u right censored, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch.6 basic limits losses censored at the limit PDF p.129; deductible censoring below the deductible PDF p.130, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "B. Hartman, Stat 344 Life Contingencies I, Ch.6 Premiums (BYU), slide 31: L0 = v^(K+1) - P a..(K+1), E[L0] = A - P a.., Var(L0) = (1 + P/d)^2 (2A - A^2), sha256:da3f77bfcd709a519f2c4982b1969fa3d62c4ec4b410117ad00dedf510dee5e8 — https://hartman.byu.edu/docs/344Files/Stat344_Chapter6.pdf"
    - "E. Valdez, STT 456 Premium Calculation (MSU, 2015), slides 4-5: L0 = PVFB0 - PVFP0; equivalence principle E[L0] = 0, sha256:7b4af6694606f8ee6a4ad037032100e510c0f7d382d2f47d6f85044cff02cc98 — https://users.math.msu.edu/users/valdezea/stt456s15/STT456Weeks1to2-S2015.pdf"
    - "E. Valdez, STT 456 Policy Values (MSU, 2015), slide 6: future loss L_t = PVFB_t - PVFP_t, policy value tV = E[L_t], sha256:3ace4861349a3e83d119f5e4b1490970d1fc3dc70409fc2213e0584b1c255a5f — https://users.math.msu.edu/users/valdezea/stt456s15/STT456Weeks2to4-S2015.pdf"
    - "SOA Exam FAM syllabus, October 2026, Topic 10 outcome a: future loss random variables; outcome b equivalence principle, PDF p.7, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf"
    - "SOA Exam ALTAM syllabus, October 2026, outcomes: policy values for state-dependent and joint-life insurance; AMLCR 3rd ed. Ch.7 §§2.4, 4, Ch.8-9 assigned, PDF pp.2-6, sha256:44b64a78219337f43387cb52837c7c2ce590ae2b97321d6e8e4e29ab2cd38c5e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-altam-syllabus.pdf"
    - "SOA Probability Exam (Exam P) syllabus, November 2026, Topic 2 outcomes e-f, PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "SOA, Tables for Exam C (Fall 2009), A.3.3.1 exponential PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Random Variable.md
---

![[Media/Figures/Loss_Random_Variable.svg|340]]

A **Loss Random Variable** $X$ is the ground-up amount of a loss, before any policy provision such as a [[Deductible|deductible]], a [[Coinsurance Percentage|coinsurance percentage]] or a [[Benefit Limit|benefit limit]] is applied. The insurer's payment is a function of the loss. Under an ordinary deductible $d$, the payment is

> $$(X - d)_+ = \begin{cases} 0 & X \le d \\ X - d & X > d \end{cases}$$

Losses at or below the deductible produce no payment, and larger losses are reduced by $d$. The payment is a [[Payment Random Variable|payment random variable]], with its own distribution, mean and variance.

> [!example]- A loss is 0, 500, 2,000 or 5,000 with probabilities 0.5, 0.3, 0.15 and 0.05. The policy has a deductible of 250. What is the expected payment? {Example}
> - The payments on the four losses are 0, 250, 1,750 and 4,750.
> - Weighting each by its probability:
>
> > $$
> > \begin{aligned}
> > & E[(X - 250)_+] \\
> > &= 0.3(250) + 0.15(1750) + 0.05(4750) \\
> > &= 75 + 262.5 + 237.5 \\
> > &= 575
> > \end{aligned}
> > $$

## Expected payment under a deductible

For a continuous loss with density $f(x)$, the expected payment per loss is

> $$E[(X - d)_+] = \int_d^{\infty} (x - d)\,f(x)\,dx$$

It is also the area under the survival function above the deductible:

> $$E[(X - d)_+] = \int_d^{\infty} \big(1 - F(x)\big)\,dx$$

- $F(x)$ is the cumulative distribution function of the loss.

> [!example]- Losses are exponential with mean 1,000, with a deductible of 500. What is the expected payment per loss? {Example}
> - The survival function is $1 - F(x) = e^{-x/1000}$.
> - Integrating it above the deductible:
>
> > $$
> > \begin{aligned}
> > & E[(X - 500)_+] \\
> > &= \int_{500}^{\infty} e^{-x/1000}\,dx \\
> > &= 1000\,e^{-0.5} \\
> > &= 606.53
> > \end{aligned}
> > $$

> [!trap] $E[X] - d$ for the expected payment
> The payment is never negative, so its mean is more than $E[X] - d$. In the example above, $1000 - 500 = 500$ is too low. The expected payment is 606.53.

## A payment probability as a loss probability

A question about the payment becomes a question about the loss. Under a deductible $d$ and a coinsurance percentage $\alpha$, the payment exceeds $t$ exactly when the loss exceeds $d + t/\alpha$:

> $$P(Y > t) = P\!\left(X > d + \frac{t}{\alpha}\right)$$

- $Y = \alpha(X - d)_+$ is the payment.

> [!example]- Losses are exponential with mean 2,000. A policy has a deductible of 250 and pays 75% of the excess. What is the probability that the payment on a loss exceeds 1,500? {Example}
> - The payment exceeds 1,500 when the excess exceeds $1500 / 0.75 = 2000$.
> - That is a loss above 2,250.
> - $P(X > 2250) = e^{-2250/2000}$, which is $0.3247$.

## The loss random variable in life insurance

On FAM and ALTAM, the loss random variable is the insurer's loss on a life policy. The loss at issue is

> $$L_0 = \text{PV of benefits} - \text{PV of premiums}$$

- PV is the present value at issue, a random variable through the time of death.

Under the [[Equivalence Principle|equivalence principle]], the premium is set so that $E[L_0] = 0$. A long-lived insured gives a negative loss. The loss at a later time is the [[Future Loss Random Variable|future loss random variable]], whose expected value is the [[Policy Value|policy value]].
