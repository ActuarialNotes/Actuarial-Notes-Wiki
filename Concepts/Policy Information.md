---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:ae02365c1be54ae17544c1c48d73ed73bcf94ddd163570e919912597184014a6
  sources:
    - "SOA Probability Exam syllabus, November 2026, Topic 2 learning outcomes c) (expected values incl. mode, median, percentiles) and e) (amount an insurance company pays to a policyholder given deductibles, coinsurance percentages, benefit limits, inflation), PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), PDF p.7 (percentage reimbursed; deductible), p.8 (benefit limit; deductible lowers expected claim payments and SD), p.9 (health policy paying costs up to 5000 at 80%: reimburses 80% of the lesser of 5000 and the cost; maximum on a claim payment), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "SOA Exam P Sample Questions (2026-05 file), Q88 (PDF p.40: deductible of 20, 100% of costs between 20 and 120, 50% above 120), sha256:24980e6de9cc0a68f13ac33b0ab4b18ad8ebb54d42d1afe08eed8bebb212cf06 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-questions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Policy Information.md
---

![[Media/Figures/Policy_Information.svg|340]]

**Policy Information** is the set of terms in an [[Insurance Policy|insurance policy]] that decide how much of a loss the insurer pays. Its main terms are the [[Deductible|deductible]] $d$, the [[Coinsurance Percentage|coinsurance percentage]] $\alpha$ and the [[Benefit Limit|benefit limit]] $u$. When the limit caps the insurer's payment, the payment on a loss $X$ is

> $$Y = \min\!\big(\alpha\,(X - d)_+,\ u\big)$$

- $X$ is the ground-up [[Loss Random Variable|loss]], and $Y$ is the [[Payment Random Variable|payment]].
- $(X - d)_+$ is the part of the loss above $d$, and 0 when $X \le d$.

> [!idea] The idea
> The deductible removes the bottom of every loss, coinsurance shares the middle, and the limit removes the top.

> [!example]- A health policy says the insured pays the first 500 of any claim, the insurer covers 80% of the amount above 500, and the insurer pays at most 10,000. What does the insurer pay on losses of 400, 3,000 and 15,000? {Example}
> - The terms are $d = 500$, $\alpha = 0.80$ and $u = 10{,}000$ on the payment.
> - A loss of 400 is below the deductible, so the insurer pays 0.
> - On 3,000, it pays $0.80 \times 2{,}500 = 2{,}000$.
> - On 15,000, 80% of the excess is 11,600, so it pays the limit of 10,000.

## The loss at which the limit is reached

The insurer's payment reaches the limit $u$ at the loss

> $$X = d + \frac{u}{\alpha}$$

Every larger loss pays exactly $u$.

> [!example]- A policy has a deductible of 250, a coinsurance percentage of 90% and a maximum payment of 4,500. What is the smallest loss on which the insurer pays the maximum? {Example}
> - Dividing the limit by the coinsurance gives the excess over the deductible, $\frac{4{,}500}{0.90} = 5{,}000$.
> - Adding the deductible back gives a loss of $250 + 5{,}000 = 5{,}250$.

> [!trap] Forgetting to add the deductible back
> The loss at which the payment reaches the limit is $d + \frac{u}{\alpha}$, not $\frac{u}{\alpha}$. The quotient is only the excess over the deductible.

## A limit on the covered loss

Some policies cap the covered loss at $u$ before the deductible and coinsurance apply. The payment is then

> $$Y = \alpha\,\big(\min(X, u) - d\big)_+$$

The same three numbers give a different payment, because the terms apply in a different order.

> [!example]- The health policy above instead covers losses up to 10,000, then pays 80% of the covered amount above 500. What does it pay on a loss of 15,000? {Example}
> - The covered loss is $\min(15{,}000,\ 10{,}000) = 10{,}000$.
> - The insurer pays $0.80 \times 9{,}500 = 7{,}600$, not 10,000.

## Coinsurance that changes with the loss

Some policies pay different shares of different layers of a loss. The payment is then the sum over the layers of each layer's width times its share.

> [!example]- A policy pays nothing on the first 200 of costs, 100% of costs from 200 to 1,000 and 50% of costs above 1,000. What does it pay on costs of 2,500? {Example}
> - The layer from 200 to 1,000 pays $1.00 \times 800 = 800$.
> - The layer above 1,000 pays $0.50 \times 1{,}500 = 750$.
> - The payment is $800 + 750 = 1{,}550$.
