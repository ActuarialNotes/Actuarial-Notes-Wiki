---
verification:
  status: verified
  confidence: low
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:b424b0f31b62055311870584cb82806dfe4f6be6961f90bb66aab1ba4cb9c713
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), §III theorem on S_n (PDF pp.4-5), §VI Deductibles (PDF p.7) and Benefit Limits (PDF pp.8-9), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q50 (PDF p.17), Q216, Q243, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA Exam P Sample Questions (Aug 2026 revision), Q50 and Q243 wording, sha256:e47245963f7d2c1c4f8cc5ff1baf2090542d923ac47cbeb27d1f657ac51bf5f0 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-questions.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 2 outcomes e-f (PDF p.3) and Topic 3 outcome i (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Payment Random Variable.md
---

The **Payment Random Variable** ($Y$) is the amount the insurer actually pays on a claim, derived from the [[Loss Random Variable]] $X$ after applying all policy provisions — [[Deductible]], [[Coinsurance Percentage|coinsurance]], and [[Benefit Limit|benefit limit]].

> $$Y = \alpha\,\min\!\bigl((X-d)_+,\; u\bigr) \quad \text{(limit on the covered amount)}$$
>
> $$\text{where } d = \text{deductible},\; u = \text{benefit limit},\; \alpha = \text{coinsurance}$$

> $$Y = \min\!\bigl(\alpha\,(X-d)_+,\; u\bigr) \quad \text{(limit on the payment)}$$

- **The order of limit and coinsurance matters.** The first form applies the deductible, caps the amount above it at $u$ and then pays the share $\alpha$, so the most the insurer pays is $\alpha u$. That is the order of P-21-05's health policy, which pays costs up to $5{,}000$ and reimburses $80\%$ of them: $4{,}000$ on costs of $6{,}000$, which is $80\%$ of the lesser of $5{,}000$ and the cost
- When the [[Benefit Limit|benefit limit]] caps the insurer's payment instead (P-21-05 defines a benefit limit as an upper bound on how much the insurer will pay for any loss, and SOA's sample questions apply limits to the benefit itself), the second form holds and the most the insurer pays is $u$. The policy wording decides which applies; with no coinsurance the two agree
- $Y$ has a mixed distribution: a probability mass at $Y = 0$ (when $X \leq d$) and a continuous or discrete component for positive payments
- Its mean and variance differ from those of $X$ due to the truncation and censoring imposed by the policy

![[Media/Figures/Payment_Random_Variable.svg|340]]

> [!example]- Full Payment Function with Three Provisions {Example}
> A policy has deductible $d = 200$, coinsurance $\alpha = 0.75$, and benefit limit $u = 900$. If $X = 1500$, find the payment $Y$.
>
> > [!answer]-
> > Step 1 — Apply deductible: $X - d = 1500 - 200 = 1300$.
> > Step 2 — Apply benefit limit: $\min(1300, 900) = 900$.
> > Step 3 — Apply coinsurance:
> > $$Y = 0.75 \times 900 = 675$$
> > The insurer pays \$675. The insured absorbs \$200 (deductible) + \$400 (excess above limit) = \$600, and co-pays $0.25 \times 900 = \$225$, totaling \$825.
>
> > If the \$900 limit capped the payment instead, $Y = \min(0.75 \times 1{,}300,\ 900) = \min(975,\ 900) = 900$.
