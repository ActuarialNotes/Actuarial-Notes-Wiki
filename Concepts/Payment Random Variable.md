---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:8282e2b58b70e21a56be72821fc17ff64686cd4cc0fbff0b8be058e9ee4b4463
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05), §VI Deductibles PDF p.7; Benefit limits: upper bound on insurer payment PDF p.8; health policy 80% of the lesser of 5000 and cost PDF p.9, sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "Frees et al., Loss Data Analytics (open text), Ch.3 Modeling Loss Severity, §3.4.1 Y^L, Y^P, F_{Y^P}(y) = [F(y + d) - F(d)]/[1 - F(d)], E(Y^P) = E(Y^L)/(1 - F(d)); §3.4.2 Pr(Y = u) = 1 - F(u); §3.4.3 alpha[(X^u) - (X^d)] with u the maximum covered loss, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "SOA Exam P Sample Questions (2026-05 edition), Q50 (PDF p.23) and Q243 (PDF p.102) limit applied to the benefit, sha256:24980e6de9cc0a68f13ac33b0ab4b18ad8ebb54d42d1afe08eed8bebb212cf06 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-questions.pdf"
    - "SOA Probability Exam (Exam P) syllabus, November 2026, Topic 2 outcome on deductibles, coinsurance, benefit limits, PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Payment Random Variable.md
---

![[Media/Figures/Payment_Random_Variable.svg|340]]

A **Payment Random Variable** $Y$ is the amount the [[Insurer|insurer]] pays on a loss. It is found from the [[Loss Random Variable|loss random variable]] $X$ by applying the policy's [[Deductible|deductible]] $d$, [[Coinsurance Percentage|coinsurance percentage]] $\alpha$ and [[Benefit Limit|benefit limit]] $u$:

> $$Y = \min\!\bigl(\alpha\,(X - d)_+,\ u\bigr)$$

- $(X - d)_+$ is the excess of the loss over the deductible: $X - d$ when $X > d$, and 0 otherwise.

The deductible comes off first, the coinsurance percentage applies to the excess, and the limit caps the result. The payment is 0 on a loss at or below $d$, and it reaches $u$ at the loss $d + u/\alpha$.

> [!idea] The idea
> Every question about the payment is a question about the loss.

> [!example]- A policy has a deductible of 200, pays 80% of the excess and caps its payment at 400. What does it pay on losses of 150, 450 and 900? {Example}
> - On 150, the loss is below the deductible, so the payment is 0.
> - On 450, the excess is 250, and $0.8 \times 250 = 200$.
> - On 900, the excess is 700, and $0.8 \times 700 = 560$ is above the cap, so the payment is 400.

## The distribution of the payment

Below the cap, the payment is at most $y$ exactly when the loss is at most $d + y/\alpha$, so the payment's CDF is

> $$F_Y(y) = F_X\!\left(d + \frac{y}{\alpha}\right)$$

- $F_X$ is the CDF of the loss.
- $0 \le y < u$.

The payment has a [[Mixture Distribution|mixed distribution]]: a point mass $F_X(d)$ at 0 from the losses below the deductible, a point mass $P(X > d + u/\alpha)$ at $u$ from the losses past the cap, and a continuous part between them. A point mass is the size of the CDF's jump at that value.

> [!example]- A loss is uniform on $(0, 1000)$. A policy has a deductible of 200, pays 80% of the excess and caps its payment at 400. What are $P(Y = 0)$, $F_Y(100)$ and $P(Y = 400)$? {Example}
> - The payment is 0 when the loss is at most 200, so $P(Y = 0) = 0.2$.
> - The payment is at most 100 when the loss is at most $200 + 100/0.8 = 325$, so $F_Y(100) = 0.325$.
> - The cap binds at the loss $200 + 400/0.8 = 700$, so $P(Y = 400) = P(X > 700) = 0.3$.

> [!trap] A payment with no point masses
> A CDF for the payment that starts at 0, or never reaches 1 before the top of the loss range, has missed a point mass. Check $P(Y = 0)$ and $P(Y = u)$ first.

## The expected payment

The payment is $\alpha$ times the part of the loss between $d$ and $d + u/\alpha$, so its mean is a difference of two [[Limited Expected Value|limited expected values]]:

> $$
> \begin{aligned}
> E[Y] = \alpha\Big(&E\big[X \wedge \big(d + \tfrac{u}{\alpha}\big)\big] \\
> &- E[X \wedge d]\Big)
> \end{aligned}
> $$

- $X \wedge a$ is $\min(X, a)$.

> [!example]- A loss is uniform on $(0, 1000)$. A policy has a deductible of 200, pays 80% of the excess and caps its payment at 400. What is the expected payment? {Example}
> - The cap binds at the loss 700.
> - For this loss, $E[X \wedge a] = a - a^2/2000$.
> - So $E[X \wedge 700] = 455$ and $E[X \wedge 200] = 180$.
> - The expected payment is $0.8 \times 275 = 220$.

## Payment per loss and payment per payment

The payment per loss $Y^L$ counts every loss, including those that pay 0. The payment per payment $Y^P$ counts only the losses above the deductible. Its mean is

> $$E[Y^P] = \frac{E[Y^L]}{P(X > d)}$$

The payment per payment is the payment per loss given $X > d$. With no limit, it is the linear function $\alpha(X - d)$ of the loss given $X > d$, so its variance is $\alpha^2$ times the variance of the excess given $X > d$.

> [!example]- Losses are exponential with mean 1,000. A policy has a deductible of 200 and pays 80% of the excess, with no limit. Given that a payment is made, what is the probability that it exceeds 400? {Example}
> - A payment above 400 means an excess above $400 / 0.8 = 500$.
> - The exponential is memoryless, so given $X > 200$ the excess is exponential with mean 1,000.
> - The probability is $e^{-500/1000}$, which is $0.6065$.

## A limit on the covered loss

Some policies cap the covered loss and then apply the coinsurance percentage. The payment is then

> $$Y = \alpha\,\min\!\bigl((X - d)_+,\ u\bigr)$$

The most this policy pays is $\alpha u$, while a cap on the payment pays up to $u$. The policy wording decides which form applies. With no coinsurance the two agree.

> [!example]- A policy has a deductible of 200, coinsurance of 75% and a limit of 900. What does it pay on a loss of 1,500 if the limit caps the covered loss, and if it caps the payment? {Example}
> - The excess over the deductible is 1,300.
> - Capping the covered loss: $\min(1300, 900) = 900$, then $0.75 \times 900 = 675$.
> - Capping the payment: $0.75 \times 1300 = 975$, then $\min(975, 900) = 900$.

## The payment random variable in life insurance

On FAM, a benefit paid only if the time of death $T$ falls in an interval has present value 0 when $T$ is outside it. The probability of $T$ outside the interval is a point mass at 0, as the deductible's is above.
