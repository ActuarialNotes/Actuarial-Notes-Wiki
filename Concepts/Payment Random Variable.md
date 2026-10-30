---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:3c4a3209b8aac22fe0742abf7d98d6053764ebeaa08a2168e685fdc7405eeafe
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §VI Deductibles PDF p.7; Benefit limits: upper bound on insurer payment PDF p.8, health policy 80% of the lesser of 5000 and the cost PDF p.9"
    - "SOA Exam P Sample Questions (Aug 2026 revision), Q50 (PDF p.23) and Q243 (PDF pp.102-103) wording, sha256:e47245963f7d2c1c4f8cc5ff1baf2090542d923ac47cbeb27d1f657ac51bf5f0 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-questions.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q50 (PDF pp.17-18), Q243 (PDF p.72), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA Probability Exam syllabus, November 2026, objective \"Calculate the amount that an insurance company pays to a policyholder for a claim given policy information, including deductibles, coinsurance percentages, and benefit limits, as well as other factors, such as inflation\", PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "RISK AND INSURANCE, Anderson & Brown, Risk and Insurance (SOA P-21-05), §VI Deductibles (PDF p.7): insurer pays the loss in excess of the deductible; §VIII (PDF p.13): Y = max(0, X - 5), charges below the deductible pay nothing, sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "Functions of Continuous Random Variables | PDF | CDF, §4.1.3 Functions of Continuous Random Variables: CDF method F_Y(y) = P(Y <= y) rewritten as an event on X, sha256:835de7fe604e1ea63a96adfd2249b2233249f90fd70dd314ea3bdfa0371d9979 — https://www.probabilitycourse.com/chapter4/4_1_3_functions_continuous_var.php"
    - "Mixed Random Variables | Examples, §4.3.1 Mixed Random Variables: jump amount = P(Y = y); int c(y) dy + sum P(Y = y_k) = 1; EY = int y c(y) dy + sum y_k P(Y = y_k), sha256:3fc8d9207e5b1f961e1bc6b3a00414064dc3326a37c9b30c8c8a105c33312fc6 — https://www.probabilitycourse.com/chapter4/4_3_1_mixed.php"
  open_findings: 0
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
- **Under a deductible alone.** The per-loss payment $Y = (X - d)_+$ is a function of the loss, so its distribution is found from that of $X$ ([[Transformations of Random Variables]]). It has a point mass at zero, $P(Y = 0) = P(X \leq d) = F_X(d)$, so it has a [[Mixture Distribution|mixed distribution]] when $X$ is continuous. For $t \geq 0$ the event $\{Y \leq t\}$ is the event $\{X \leq d + t\}$, so $F_Y(t) = P(X \leq d + t) = F_X(d + t)$.

> $$F_Y(t) = F_X(d + t), \quad t \geq 0$$

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
> >
> > If the \$900 limit capped the payment instead, $Y = \min(0.75 \times 1{,}300,\ 900) = \min(975,\ 900) = 900$.
