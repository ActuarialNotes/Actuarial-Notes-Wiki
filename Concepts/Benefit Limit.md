---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:5413cc077eb0e4e45103a72953e8b811e0a010153fd8133bab88c21f634ccfb5
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §VI Benefit limits PDF pp.8-9"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q50 (PDF pp.17-18), Q243 (PDF p.72), Q328 (PDF p.91), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA Probability Exam syllabus, November 2026, objective \"Calculate the amount that an insurance company pays to a policyholder for a claim given policy information, including deductibles, coinsurance percentages, and benefit limits, as well as other factors, such as inflation\", PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Benefit Limit.md
---

A **Benefit Limit** ($u$) is the maximum amount an insurer will pay on a single claim, capping the insurer's payment regardless of how large the underlying loss $X$ is.

> $$Y = \min\!\bigl(\alpha(X - d)_+,\; u\bigr)$$
>
> $$\text{where } u = \text{maximum benefit (benefit limit)}$$

- The benefit limit is the insurer's counterpart to the [[Deductible]]: the deductible removes small losses, while the limit removes large ones
- Losses above $d + u/\alpha$ (for coinsurance $\alpha$) result in the insurer paying exactly $u$ and the insured bearing the remainder

![[Media/Figures/Benefit_Limit.svg|340]]

> [!example]- Payment with Deductible and Benefit Limit {Example}
> A policy has deductible $d = 100$ and benefit limit $u = 400$ with no coinsurance. If $X = 600$, what does the insurer pay?
>
> > [!answer]-
> > The uncapped payment would be $X - d = 600 - 100 = 500$. Applying the benefit limit:
> > $$Y = \min(500, 400) = 400$$
> > The insurer pays \$400; the insured absorbs the first \$100 (deductible) and the last \$100 (excess above limit).
