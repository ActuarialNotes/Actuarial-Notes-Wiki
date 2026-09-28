---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:ce7560e5653f455fb256d594bbeecaf91b65d6aca78370921ec74cb1c1dee82a
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §VI: only a certain percentage of each loss may be reimbursed, often referred to as coinsurance PDF p.7; reimburse 80% of costs PDF pp.8-9"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Ch.6: V(cX) = c^2 V(X) (PDF p.267), E((xbar - mu)^2) = sigma^2/n (PDF p.274), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q50 (PDF pp.17-18), Q243 (PDF p.72), Q328 (PDF p.91), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA Probability Exam syllabus, November 2026, objective \"Calculate the amount that an insurance company pays to a policyholder for a claim given policy information, including deductibles, coinsurance percentages, and benefit limits, as well as other factors, such as inflation\", PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS), Ch.6 Leveraged Effect of Limits on Severity Trend PDF pp.129-130; Ch.11 coinsurance notation PDF pp.221-222, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Coinsurance Percentage.md
---

A **Coinsurance Percentage** ($\alpha$) is the fraction of the covered loss (after any deductible) that the insurer agrees to pay, with the insured retaining the remaining fraction $1 - \alpha$.

> $$Y = \alpha \cdot (X - d)_+$$
>
> $$\text{where } \alpha \in (0,1] = \text{coinsurance percentage (insurer's share)}$$

- When $\alpha = 1$ the insurer covers 100% of the excess; lower values mean the insured co-pays a portion
- It scales the expected payment by $\alpha$ and the variance by $\alpha^2$

![[Media/Figures/Coinsurance_Percentage.svg|340]]

> [!example]- Expected Payment with Deductible and Coinsurance {Example}
> Ground-up losses $X$ have $E[(X-500)_+] = 1{,}200$ and $\text{Var}((X-500)_+) = 4{,}000{,}000$. The insurer applies coinsurance $\alpha = 0.80$. Find $E[Y]$ and $\text{Var}(Y)$.
>
> > [!answer]-
> > With $Y = 0.80 \cdot (X - 500)_+$:
> > $$E[Y] = 0.80 \times 1{,}200 = 960$$
> > $$\text{Var}(Y) = (0.80)^2 \times 4{,}000{,}000 = 0.64 \times 4{,}000{,}000 = 2{,}560{,}000$$
