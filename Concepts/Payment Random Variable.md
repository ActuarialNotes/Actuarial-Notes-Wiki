---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:0322ce904b6994e1376c0a1b85b44a4137a0ab8ed543f045ed12dd9359c7fd40
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05), §VI Deductibles PDF p.7; Benefit limits: upper bound on insurer payment PDF p.8; health policy 80% of the lesser of 5000 and cost PDF p.9, sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "Frees et al., Loss Data Analytics (open text), Ch.3 Modeling Loss Severity, §3.4.1 Y^L, Y^P, F_{Y^P}(y) = [F(y + d) - F(d)]/[1 - F(d)], E(Y^P) = E(Y^L)/(1 - F(d)); §3.4.2 Pr(Y = u) = 1 - F(u); §3.4.3 alpha[(X^u) - (X^d)] with u the maximum covered loss, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "SOA Exam P Sample Questions (2026-05 edition), Q50 (PDF p.23) and Q243 (PDF p.102) limit applied to the benefit, sha256:24980e6de9cc0a68f13ac33b0ab4b18ad8ebb54d42d1afe08eed8bebb212cf06 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-questions.pdf"
    - "SOA Probability Exam (Exam P) syllabus, November 2026, Topic 2 outcome on deductibles, coinsurance, benefit limits, PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Payment Random Variable.md
---

The **Payment Random Variable** $Y$ is the amount the [[Insurer|insurer]] pays on a loss. It is found from the [[Loss Random Variable|loss random variable]] $X$ by applying the policy's [[Deductible|deductible]], [[Coinsurance Percentage|coinsurance]] and [[Benefit Limit|benefit limit]].

> $$Y = \min\!\bigl(\alpha\,(X - d)_+,\; u\bigr)$$

- $d$ is the deductible, $\alpha$ the coinsurance percentage and $u$ the benefit limit on the payment.
- The payment is a function of the loss, so its distribution comes from that of $X$ ([[Transformations of Random Variables]]).
- The payment usually has a [[Mixture Distribution|mixed distribution]]: a point mass at 0 from losses below the deductible, a point mass at $u$ from losses past the cap, and a continuous part between.
- The payment per loss $Y^L$ counts every loss, including those that pay 0. The payment per payment $Y^P$ counts only losses above the deductible.

> [!idea] The idea
> Every question about the payment is a question about the loss in disguise. Find the losses that produce the payment asked about, then use the distribution of $X$ to get its probability.

![[Media/Figures/Payment_Random_Variable.svg|340]]

## One loss at a time

Take a loss that is uniform on $(0, 1000)$. The policy has a deductible of 200, pays 80% of the excess and caps the payment at 400.

| Loss $X$ | Excess $(X - 200)_+$ | $0.8 \times$ excess | Payment $Y$ |
|---|---|---|---|
| 150 | 0 | 0 | 0 |
| 450 | 250 | 200 | 200 |
| 700 | 500 | 400 | 400 |
| 900 | 700 | 560 | 400 |

The cap is first reached at the loss $200 + 400/0.8 = 700$. Every larger loss pays exactly 400.

## The distribution of the payment

What is the probability the payment is at most $y$? For $0 \le y < 400$, the payment is at most $y$ exactly when the loss is at most $200 + y/0.8$.

> $$F_Y(y) = F_X\!\left(d + \frac{y}{\alpha}\right), \quad 0 \le y < u$$

- At $y = 0$: $P(Y = 0) = F_X(200) = 0.2$.
- At $y = 100$: $F_Y(100) = F_X(325) = 0.325$.
- Just below the cap, $F_Y$ reaches $F_X(700) = 0.7$. At $y = 400$ it jumps to 1, because $P(Y = 400) = P(X > 700) = 0.3$.

With a deductible alone, $\alpha = 1$ and there is no cap. The rule becomes $F_Y(t) = F_X(d + t)$ for every $t \ge 0$, with a point mass $F_X(d)$ at 0.

> [!trap] A payment with no lumps
> A CDF that starts at 0 or never reaches 1 before the top of the loss range has missed a point mass. Check $P(Y = 0)$ and $P(Y = u)$ first.

## The expected payment

The payment is 80% of the loss between 200 and 700. Its mean is 80% of the difference of two [[Limited Expected Value|limited expected values]].

> $$E[Y] = \alpha\left(E\!\left[X \wedge \left(d + \tfrac{u}{\alpha}\right)\right] - E[X \wedge d]\right)$$

- For this loss, $E[X \wedge a] = a - a^2/2000$. So $E[X \wedge 700] = 455$ and $E[X \wedge 200] = 180$.
- The expected payment is $0.8 \times (455 - 180) = 220$.

The variance needs the second moment, worked piece by piece. Integrating $Y^2$ over the loss gives $E[Y^2] = 74{,}666.67$, so $\text{Var}(Y) = 74{,}666.67 - 220^2 = 26{,}266.67$.

## Per loss or per payment?

The 220 averages over every loss, including the 20% that pay nothing. The expected payment per payment divides by the probability of a payment.

> $$E[Y^P] = \frac{E[Y^L]}{P(X > d)}$$

- For the running example, $E[Y^P] = 220 / 0.8 = 275$.

The distribution per payment is the per-loss distribution conditioned on $X > d$.

> $$F_{Y^P}(y) = \frac{F_X\!\left(d + \frac{y}{\alpha}\right) - F_X(d)}{1 - F_X(d)}, \quad 0 \le y < u$$

- For the running example, $F_{Y^P}(y) = y/640$ below the cap, and $P(Y^P = 400) = 0.3/0.8 = 0.375$.
- With no cap, the payment per payment is $\alpha$ times the excess given $X > d$. Its variance is $\alpha^2$ times the variance of that excess.

## Which comes first: the limit or the coinsurance?

The formula above caps the **payment**, so the most the insurer pays is $u$. The study note P-21-05 defines a benefit limit as an upper bound on how much the insurer will pay for any loss, and SOA's sample questions apply limits to the benefit itself. Some policies instead cap the **covered amount** and then pay the share $\alpha$.

> $$Y = \alpha\,\min\!\bigl((X - d)_+,\; u\bigr)$$

- Under this form the most the insurer pays is $\alpha u$.
- P-21-05's health policy pays costs up to 5,000 and reimburses 80% of them. On costs of 6,000 it pays $0.8 \times 5000 = 4000$. A cap on the payment would give $\min(4800, 5000) = 4800$.
- The policy wording decides which form applies. With no coinsurance the two agree.

## Try it

> [!example]- All three provisions on one loss {Example}
> A policy has a deductible of 200, coinsurance of 75% and a benefit limit of 900. The loss is 1,500. Find the payment if the limit caps the covered amount, and if it caps the payment.
>
> > [!answer]-
> > **Plan:** take off the deductible, then apply the cap and the coinsurance in the order the wording gives.
> >
> > The excess over the deductible is $1500 - 200 = 1300$.
> >
> > - **Cap on the covered amount:** $\min(1300, 900) = 900$, then $Y = 0.75 \times 900 = 675$. The insured absorbs the deductible of 200, the 400 above the cap and the 25% share of 225, which is 825 in all.
> > - **Cap on the payment:** $0.75 \times 1300 = 975$, then $Y = \min(975, 900) = 900$.
> >
> > Why do they differ? Under the first form the insurer never pays more than $0.75 \times 900 = 675$.

> [!example]- A discrete loss {Example}
> A driver's annual loss is 0, 1,000, 5,000 or 10,000 with probabilities 0.70, 0.20, 0.08 and 0.02. The policy has a deductible of 500 and a maximum payment of 6,000. Find the expected payment.
>
> > [!answer]-
> > **Plan:** turn each loss into its payment, then weight by its probability.
> >
> > The payments are 0, 500, 4,500 and 6,000.
> > $$E[Y] = 0.20(500) + 0.08(4500) + 0.02(6000) = 580$$

> [!example]- A payment per payment {Example}
> Losses are exponential with mean 1,000. The policy has a deductible of 200 and pays 80% of the excess, with no limit. Given that a payment is made, find the probability that it exceeds 400.
>
> > [!answer]-
> > **Plan:** turn the event on the payment into an event on the excess, then use the memoryless property.
> >
> > A payment above 400 means an excess above $400 / 0.8 = 500$. Given $X > 200$, the excess is exponential with mean 1,000.
> > $$P(Y^P > 400) = e^{-500/1000} = 0.6065$$
> >
> > Why does the deductible not appear? The exponential is memoryless, so the excess over any deductible has the loss's own distribution.

> [!warning]- Exam traps
> - **Per loss or per payment.** Read which one is asked. Per payment divides by $P(X > d)$.
> - **The point masses.** $P(Y = 0) = F_X(d)$ and $P(Y = u) = P(X > d + u/\alpha)$ are part of the distribution.
> - **Where the cap binds.** With coinsurance, the payment reaches $u$ at the loss $d + u/\alpha$.
> - **The order of the provisions.** A cap on the covered amount pays at most $\alpha u$. A cap on the payment pays at most $u$.
