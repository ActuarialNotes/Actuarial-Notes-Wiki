---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:ae4309b35fbdb113f166283b548648273302b251cd3d76684639d300101c049f
  sources:
    - "SOA Probability Exam syllabus, November 2026, objective \"Calculate the amount that an insurance company pays to a policyholder for a claim given policy information, including deductibles, coinsurance percentages, and benefit limits, as well as other factors, such as inflation\", PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §VI Limits on policy benefits: percentage reimbursed PDF p.7, deductible PDF p.7, benefit limit PDF p.8, maximum on a claim payment PDF p.9"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Policy Information.md
---

**Policy Information** (or provisions) refers to the contractual terms of an insurance policy that determine how much of a ground-up loss $X$ the insurer pays.
- The main provisions are [[Deductible]] ($d$), [[Benefit Limit|benefit limit]] ($u$), and [[Coinsurance Percentage|coinsurance]] ($\alpha$)
- These provisions transform the loss random variable $X$ into a [[Payment Random Variable]] $Y$
- The policy features allocate financial responsibility between the insured and insurer, affecting both expected payments and risk exposure:

> $$\text{Payment} = g(X;\ d,\ u,\ \alpha)$$

![[Media/Figures/Policy_Information.svg|340]]

> [!example]- Identifying Policy Provisions from a Contract {Example}
> A health policy states: the insured pays the first \$500 of any claim, the insurer covers 80% of amounts above \$500, and the insurer's maximum payment is \$10,000. Identify each policy provision.
>
> > [!answer]-
> > - **Deductible**: $d = \$500$ (insured absorbs the first \$500)
> > - **Coinsurance percentage**: $\alpha = 80\%$ (insurer pays 80% of the excess above the deductible)
> > - **Benefit limit**: $u = \$10{,}000$ (maximum the insurer will pay in total)
> > These three provisions together define the payment function for any ground-up loss $X$.
