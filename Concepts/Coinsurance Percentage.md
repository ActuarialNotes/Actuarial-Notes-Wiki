---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:ce7a53ad9e58a685afae54eef348e0a9c6fd032599bfd58650fda64a8329a9e1
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §VI only a certain percentage of each loss may be reimbursed, often referred to as coinsurance PDF p.7; reimburse 80% of costs PDF pp.8-9"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Ch.6: V(cX) = c^2 V(X) (PDF p.267), E((xbar - mu)^2) = sigma^2/n (PDF p.274), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 2016), Ch.11 coinsurance notation and apportionment ratio PDF p.221; indemnity formula and 500,000 / 300,000 / 80% example PDF p.222, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "SOA Probability Exam syllabus, November 2026, objective \"Calculate the amount that an insurance company pays to a policyholder for a claim given policy information, including deductibles, coinsurance percentages, and benefit limits, as well as other factors, such as inflation\", PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Coinsurance Percentage.md
---

A **Coinsurance Percentage** means different things on the SOA and CAS exams, and the two are not interchangeable:
- **Exam P ($\alpha$):** the fraction of the covered loss (after any deductible) that the insurer agrees to pay, with the insured retaining the remaining fraction $1 - \alpha$
- **Exam 5 ($c$):** the *required* insurance-to-value percentage in a property [[Coinsurance Rating|coinsurance clause]]. The insured must carry insurance of at least $cV$, e.g. $80\%$ of the property's value $V$, or the payment on a covered loss is reduced in proportion to the underinsurance. It is not the insurer's share of each loss

In the Exam P sense:

> $$Y = \alpha \cdot (X - d)_+$$
>
> $$\text{where } \alpha \in (0,1] = \text{coinsurance percentage (insurer's share)}$$

- When $\alpha = 1$ the insurer covers 100% of the excess; lower values mean the insured co-pays a portion
- It scales the expected payment by $\alpha$ and the variance by $\alpha^2$

In the Exam 5 sense (Werner & Modlin):

> $$a = \min\!\left(\frac{F}{cV},\ 1.0\right)$$

> $$I = L \times \frac{F}{cV}, \quad \text{where } I \le F \text{ and } I \le L$$

- $F$ is the face value of the policy, $V$ the value of the property, $L$ the loss after deductible, $a$ the apportionment ratio and $I$ the indemnity. A home worth $\$500{,}000$ insured for $\$300{,}000$ under an $80\%$ requirement has $cV = \$400{,}000$ and $a = 0.75$, so a $\$200{,}000$ loss is paid $\$150{,}000$

![[Media/Figures/Coinsurance_Percentage.svg|340]]

> [!example]- Expected Payment with Deductible and Coinsurance {Example}
> Ground-up losses $X$ have $E[(X-500)_+] = 1{,}200$ and $\text{Var}((X-500)_+) = 4{,}000{,}000$. The insurer applies coinsurance $\alpha = 0.80$. Find $E[Y]$ and $\text{Var}(Y)$.
>
> > [!answer]-
> > With $Y = 0.80 \cdot (X - 500)_+$:
> > $$E[Y] = 0.80 \times 1{,}200 = 960$$
> > $$\text{Var}(Y) = (0.80)^2 \times 4{,}000{,}000 = 0.64 \times 4{,}000{,}000 = 2{,}560{,}000$$
