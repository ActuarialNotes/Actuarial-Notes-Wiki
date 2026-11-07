---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:39ed851ce7894f2984da6854ded2538ae2fb5c675dcb30ded42eb4f570faf54c
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05), §VI: only a certain percentage of each loss may be reimbursed, often referred to as coinsurance PDF p.7; 80% of the lesser of 5000 and the cost PDF pp.8-9, sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "Frees et al., Loss Data Analytics (open text), Ch.3 Modeling Loss Severity, §3.4.3 coinsurance factor alpha applied after the ordinary deductible: Y^L = alpha[(X^u) - (X^d)], maximum payment alpha(u - d) with u the maximum covered loss; k-th moment carries alpha^k, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch.11 coinsurance clause: notation I, L (loss after deductible), F, V, c, a, e; a = min(F/cV, 1.0) PDF p.221; I = L x F/(cV), I <= F, I <= L; 500,000 home insured 300,000 at 80%: a = 0.75, 200,000 loss pays 150,000, penalty 50,000 PDF p.222, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Grinstead & Snell, Introduction to Probability, Ch.6 V(cX) = c^2 V(X) (PDF p.267), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Probability Exam (Exam P) syllabus, November 2026, Topic 2 outcome: deductibles, coinsurance percentages, benefit limits, inflation, PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Coinsurance Percentage.md
---

![[Media/Figures/Coinsurance_Percentage.svg|340]]

A **Coinsurance Percentage** is the share of each covered loss, after any [[Deductible|deductible]], that the [[Insurer|insurer]] pays. For a loss $X$, a deductible $d$ and a coinsurance percentage $\alpha$, the insurer's payment is

> $$Y = \alpha\,(X - d)_+$$

- $(X - d)_+$ is the excess of the loss over the deductible: $X - d$ when $X > d$, and 0 otherwise.
- $0 < \alpha \le 1$, and $\alpha = 1$ means no coinsurance.

The insured pays the deductible and the remaining share $1 - \alpha$ of the excess. The deductible comes off first, and the coinsurance percentage applies to what is left.

> [!example]- A policy has a deductible of 200 and a coinsurance percentage of 80%. On a loss of 350, how much does the insurer pay, and how much does the insured keep? {Example}
> - The excess over the deductible is $350 - 200 = 150$.
> - The insurer pays $0.8 \times 150 = 120$.
> - The insured keeps the deductible and 20% of the excess, $200 + 30 = 230$.

## Mean and variance of the payment

The payment is a fixed multiple of the excess, so its mean is

> $$E[Y] = \alpha\,E[(X - d)_+]$$

and its variance is

> $$\text{Var}(Y) = \alpha^2\,\text{Var}\big((X - d)_+\big)$$

With no deductible, the expected payment is $\alpha\,E[X]$. The standard deviation of the payment scales by $\alpha$.

> [!example]- The excess over a deductible of 500 has mean 1,200 and variance 4,000,000. The insurer pays 80% of the excess. What are the mean and variance of its payment? {Example}
> - The mean scales by $\alpha = 0.8$, so $E[Y] = 960$.
> - The variance scales by $\alpha^2 = 0.64$.
> - The variance of the payment is $0.64 \times 4{,}000{,}000$, which is $2{,}560{,}000$.

> [!example]- The excess over a deductible has variance 17,777.78. The insurer wants its payment to have variance 10,000. What coinsurance percentage does it need? {Example}
> - The variance of the payment is $\alpha^2 \times 17{,}777.78$.
> - Setting this to 10,000 gives $\alpha^2 = 0.5625$.
> - The coinsurance percentage is $\alpha = 0.75$.

> [!trap] $\alpha$ on the variance
> The variance takes $\alpha^2$, not $\alpha$. Multiplying a variance of 4,000,000 by 0.8 gives 3,200,000, which is too large. The right answer is 2,560,000.

## Coinsurance with a benefit limit

When a [[Benefit Limit|benefit limit]] $u$ caps the insurer's payment, the payment reaches $u$ when $\alpha(X - d) = u$, at the loss

> $$X = d + \frac{u}{\alpha}$$

> [!example]- A policy has a deductible of 200, pays 80% of the excess, and caps its payment at 400. What is the smallest loss on which the insurer pays the maximum? {Example}
> - The payment reaches 400 when $0.8(X - 200) = 400$.
> - So $X - 200 = 500$.
> - The insurer pays the maximum on every loss of at least 700.

## The coinsurance clause in property insurance

On a property policy (Exam 5, the DISCs), the coinsurance percentage $c$ is the share of the property's value $V$ the insured must carry as insurance. A policy with an amount of insurance $F$ pays each loss in proportion to how much of the required $cV$ it carries, through the apportionment ratio

> $$a = \min\!\left(\frac{F}{cV},\ 1\right)$$

The indemnity on a loss $L$, after any deductible, is

> $$I = \min(a\,L,\ F)$$

The coinsurance penalty is the part of a partial loss the insurer does not pay because of the clause, $(1 - a)\,L$. A policy that carries at least $cV$ has $a = 1$ and pays the whole loss up to $F$. The clause penalizes underinsurance ([[Insurance to Value]]). It is not a share of every loss, as the Exam P coinsurance percentage is. Pricing it is on [[Coinsurance Rating]].

> [!example]- A home worth 400,000 is insured for 240,000 under an 80% coinsurance clause. What is the indemnity on a loss of 100,000, and on a loss of 360,000? {Example}
> - The required insurance is $0.8 \times 400{,}000 = 320{,}000$.
> - The apportionment ratio is $a = 240{,}000 / 320{,}000$, which is $0.75$.
> - On the loss of 100,000, the indemnity is $0.75 \times 100{,}000 = 75{,}000$, and the coinsurance penalty is 25,000.
> - On the loss of 360,000, $0.75 \times 360{,}000 = 270{,}000$ is more than the amount of insurance, so the indemnity is 240,000.
