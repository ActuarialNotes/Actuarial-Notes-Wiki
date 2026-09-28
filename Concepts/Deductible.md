---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:cd74be3dd93052c420b80573bf128ecae4c9e7175ce3a6387de871e00bfbf3bb
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §VI Deductibles PDF p.7"
    - "SOA, Tables for Exam C (Fall 2009), exponential entry E[X^x] = theta(1 - e^(-x/theta)), PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA Probability Exam syllabus, November 2026, objective \"Calculate the amount that an insurance company pays to a policyholder for a claim given policy information, including deductibles, coinsurance percentages, and benefit limits, as well as other factors, such as inflation\", PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Deductible.md
---

A **Deductible** is the initial amount of a loss that the policyholder must pay before insurance coverage begins.
- If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it pays the excess $X - d$
- Deductibles save the expense of processing small claims, lower the premium, and give the policyholder an economic incentive to prevent losses
- On Exam 5, a deductible is stated either as a flat dollar amount or as a percentage of the coverage amount: a 5% deductible on a home insured for \$500,000 is equivalent to a flat \$25,000 deductible

> $$Y = (X - d)_+$$

> $$= \max(X - d,\ 0)$$

> $$d = \text{deductible}, \quad X = \text{ground-up loss}$$

![[Media/Figures/Deductible.svg|340]]

> [!example]- Expected Payment with an Ordinary Deductible {Example}
> Ground-up losses $X \sim \text{Exponential}(\theta = 1000)$. An ordinary deductible of $d = 200$ applies. Find $E[Y]$ where $Y = (X - 200)_+$.
>
> > [!answer]-
> > For an exponential distribution, the expected payment with deductible $d$ is:
> > $$E[Y] = E[(X-d)_+] = \theta\, e^{-d/\theta} = 1000\, e^{-200/1000} = 1000\, e^{-0.2} \approx 818.73$$
> > The insurer expects to pay approximately \$818.73 per loss (including the zero payments when $X \leq 200$).

> [!example]- Insurer Payment at Different Loss Levels {Example}
> Under a policy with a \$$500$ deductible, what does the insurer pay on losses of \$$300$ and \$$2{,}000$?
>
> > [!answer]-
> > - For a \$$300$ loss: $(300 - 500)^+ = 0$. The insurer pays nothing.
> > - For a \$$2{,}000$ loss: $(2000 - 500)^+ = 1500$. The insurer pays \$$1{,}500$.
