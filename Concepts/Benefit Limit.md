---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:501edf95e67d445fad2a232881d5544a761ffe45a32ad591b0ff43c02687bf64
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §VI Benefit limits: upper bound on how much the insurer will pay PDF p.8; more than one way to provide limits, health policy 80% of the lesser of 5000 and the cost PDF pp.8-9"
    - "SOA Exam P Sample Questions (Aug 2026 revision), Q50 (reimburses a loss up to a benefit limit of 10, PDF p.23) and Q243 (PDF pp.102-103), sha256:e47245963f7d2c1c4f8cc5ff1baf2090542d923ac47cbeb27d1f657ac51bf5f0 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-questions.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q50 (PDF pp.17-18), Q243 (PDF p.72), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA Probability Exam syllabus, November 2026, objective \"Calculate the amount that an insurance company pays to a policyholder for a claim given policy information, including deductibles, coinsurance percentages, and benefit limits, as well as other factors, such as inflation\", PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Benefit Limit.md
---

A **Benefit Limit** ($u$) is the maximum amount an insurer will pay on a single claim, capping the insurer's payment regardless of how large the underlying loss $X$ is.

> $$Y = \min\!\bigl(\alpha(X - d)_+,\; u\bigr)$$
>
> $$\text{where } u = \text{maximum benefit (benefit limit)}$$

- The formula caps the insurer's **payment**: the deductible comes off first, coinsurance $\alpha$ applies to the rest, and $u$ caps the result. That matches P-21-05's definition (a benefit limit sets an upper bound on how much the insurer will pay for any loss) and the way SOA's sample questions apply a limit to the benefit itself
- A policy can instead cap the **covered loss** and apply coinsurance after the cap. P-21-05's health policy pays costs up to $5{,}000$ and reimburses $80\%$ of them, so costs of $6{,}000$ are reimbursed $0.80 \times \min(6{,}000,\ 5{,}000) = 4{,}000$, where the payment-cap formula would give $\min(4{,}800,\ 5{,}000) = 4{,}800$. The policy wording decides the order (see [[Payment Random Variable]]); with no coinsurance the two agree
- The benefit limit is the insurer's counterpart to the [[Deductible]]: the deductible takes the first part of each loss off the insurer, while the limit caps what it pays on a large one
- Under the payment cap, losses above $d + u/\alpha$ result in the insurer paying exactly $u$ and the insured bearing the remainder

![[Media/Figures/Benefit_Limit.svg|340]]

> [!example]- Payment with Deductible and Benefit Limit {Example}
> A policy has deductible $d = 100$ and benefit limit $u = 400$ with no coinsurance. If $X = 600$, what does the insurer pay?
>
> > [!answer]-
> > The uncapped payment would be $X - d = 600 - 100 = 500$. Applying the benefit limit:
> > $$Y = \min(500, 400) = 400$$
> > The insurer pays \$400; the insured absorbs the first \$100 (deductible) and the last \$100 (excess above limit).
