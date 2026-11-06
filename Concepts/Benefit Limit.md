---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:9bd44ab59831410937e9b528a5c98b9f2c36c50391232e72e35275fedc01b508
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05), §VI Benefit limits: upper bound on how much the insurer will pay for any loss; losses in excess of 1 million are rare (PDF p.8); health policy 80% of the lesser of 5000 and cost, 6000 -> 4000; maximum claim payment 12,500 (PDF p.9), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "Frees et al., Loss Data Analytics (open text), Ch.3 Modeling Loss Severity, §3.4.2 X^u right censored, Pr(Y = u) = 1 - F(u), E[(X^u)^k] = int_0^u x^k f + u^k(1 - F(u)) = int_0^u k x^(k-1) S(x) dx; §3.4.3 coinsurance with limit, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch.4 workers compensation minimum and maximum indemnity benefit as % of SAWW PDF pp.113-114; Ch.6 Leveraged Effect of Limits on Severity Trend, 10% dampened to 3.5% PDF pp.129-130, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "SOA Exam P Sample Questions (2026-05 edition), Q50 (benefit limit of 10, PDF p.23), Q243 (benefit subject to a limit of 100, PDF p.102), sha256:24980e6de9cc0a68f13ac33b0ab4b18ad8ebb54d42d1afe08eed8bebb212cf06 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-questions.pdf"
    - "SOA Probability Exam (Exam P) syllabus, November 2026, Topic 2 outcome on deductibles, coinsurance, benefit limits, PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "SOA, Tables for Exam C (Fall 2009), A.3.3.1 exponential E[X^x] PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Benefit Limit.md
---

A **Benefit Limit** $u$ is the maximum amount an [[Insurer|insurer]] will pay on a single loss, however large the underlying loss $X$ is.

> $$Y = \min\!\bigl(\alpha(X - d)_+,\; u\bigr)$$

- $d$ is the [[Deductible|deductible]], $\alpha$ the [[Coinsurance Percentage|coinsurance percentage]] and $Y$ the insurer's payment. With no deductible and no coinsurance, the payment is the limited loss $X \wedge u = \min(X, u)$.
- The formula caps the insurer's **payment**. The deductible comes off first, coinsurance applies to the rest, and $u$ caps the result. This order matches the study note P-21-05, under which a benefit limit sets an upper bound on how much the insurer will pay for any loss.
- The benefit limit is the deductible's counterpart. The deductible takes the first part of each loss off the insurer, and the benefit limit takes the top part of a large loss.

> [!idea] The idea
> Large losses are rare, but each can cost far more than a typical loss. A benefit limit gives up the insurer's rarest, largest payments in exchange for a known maximum. Every loss past the cap pays exactly $u$, so the payment has a lump of probability at the limit.

![[Media/Figures/Benefit_Limit.svg|340]]

## One loss at a time

Take a loss that is uniform on $(0, 1000)$ and a policy that pays it up to a limit of 600.

| Loss $X$ | Insurer pays $X \wedge 600$ | Insured keeps $(X - 600)_+$ |
|---|---|---|
| 200 | 200 | 0 |
| 600 | 600 | 0 |
| 900 | 600 | 300 |

The two columns always add back to the loss.

> $$X = (X \wedge u) + (X - u)_+$$

## A lump at the limit

Every loss above 600 pays exactly 600. So the payment equals 600 with probability $P(X > 600) = 0.4$.

- Below the limit, the payment's CDF follows the loss: $F_Y(y) = y/1000$ for $0 \le y < 600$.
- At 600 the CDF jumps from 0.6 to 1. The payment has a [[Mixture Distribution|mixed distribution]]: continuous below the limit, with a point mass at it.

> $$P(Y = u) = P(X > u)$$

> [!trap] The payment treated as continuous
> A CDF for the payment that keeps rising to the top of the loss range, or an answer of 0 for "the probability the insurer pays exactly the maximum", has missed the lump.

## The average payment

The point mass shows up in the mean. Split the expectation at the limit: an integral below 600, plus 600 times the probability of reaching it.

> $$E[X \wedge u] = \int_0^u x\,f(x)\,dx + u\,P(X > u)$$

- For the running example, $\int_0^{600} x/1000\,dx = 180$, and $600 \times 0.4 = 240$. The expected payment is $E[X \wedge 600] = 420$.
- This is the [[Limited Expected Value|limited expected value]]. It also equals the area under the survival function $S(x) = 1 - F(x)$ up to the limit: $\int_0^{600} (1 - x/1000)\,dx = 420$.

Higher moments split the same way, with $u^k$ at the lump.

> $$E[(X \wedge u)^k] = \int_0^u x^k f(x)\,dx + u^k\,P(X > u)$$

- For $k = 2$: $\int_0^{600} x^2/1000\,dx + 600^2 \times 0.4 = 72{,}000 + 144{,}000 = 216{,}000$.
- The variance of the payment is $216{,}000 - 420^2 = 39{,}600$.

## Raising the limit

Raising the limit by one dollar adds one dollar to the payment, but only on losses that reach the limit. So the expected payment rises at the rate $P(X > u)$.

| Limit $u$ | $E[X \wedge u]$ | Added by the last 200 |
|---|---|---|
| 200 | 180 | |
| 400 | 320 | 140 |
| 600 | 420 | 100 |
| 800 | 480 | 60 |
| 1,000 | 500 | 20 |

Each 200 of limit adds less than the one before, because fewer losses reach it.

## With a deductible and coinsurance

A policy with a deductible $d$ and a limit $u$ on the payment, and no coinsurance, pays the layer of the loss from $d$ to $d + u$. Its expected payment is the difference of two limited expected values.

> $$E[Y] = E[X \wedge (d + u)] - E[X \wedge d]$$

- With $d = 200$ and $u = 400$ on the running example, $E[Y] = 420 - 180 = 240$.

With coinsurance, the payment reaches $u$ at the loss $d + u/\alpha$. With $d = 200$, $\alpha = 50\%$ and $u = 1000$ that is 2,200. Using $d + u = 1200$ forgets the coinsurance, and using $u/\alpha = 2000$ forgets the deductible.

> $$E[Y] = \alpha\left(E\!\left[X \wedge \left(d + \tfrac{u}{\alpha}\right)\right] - E[X \wedge d]\right)$$

A policy can instead cap the **covered loss** and apply coinsurance after the cap. P-21-05's health policy pays 80% of costs up to 5,000. Costs of 6,000 are reimbursed $0.80 \times \min(6000, 5000) = 4000$. The payment-cap formula would give $\min(4800, 5000) = 4800$. The policy wording decides the order ([[Payment Random Variable]]). With no coinsurance the two orders give the same payment.

## On other exams

- **Exam 5** prices workers compensation, whose benefit structure sets a minimum and a maximum weekly indemnity benefit as percentages of the state average weekly wage. The maximum caps the weekly benefit the same way a benefit limit caps a payment.
- **Exam 5** trends losses that are capped at a fixed limit. The limit damps the growth of the limited payment, so limited losses trend more slowly than unlimited ones ([[Inflation]]).

## Try it

> [!example]- An exponential loss with a limit {Example}
> A loss is exponential with mean 1,000, and the policy pays it up to 2,000. Find the expected payment and the probability that the insurer pays the maximum.
>
> > [!answer]-
> > **Plan:** integrate the survival function up to the limit, then read the lump off the tail.
> > $$
> > \begin{align*}
> > E[X \wedge 2000] &= \int_0^{2000} e^{-x/1000}\,dx \\
> > &= 1000\,(1 - e^{-2}) \\
> > &= 864.66
> > \end{align*}
> > $$
> > The insurer pays the maximum with probability $P(X > 2000) = e^{-2} = 0.1353$.

> [!example]- A discrete loss {Example}
> A loss is 0, 500, 2,000 or 5,000 with probabilities 0.5, 0.3, 0.15 and 0.05. The policy pays up to 3,000. Find the expected payment.
>
> > [!answer]-
> > **Plan:** cap each loss at 3,000, then weight by its probability.
> >
> > The payments are 0, 500, 2,000 and 3,000.
> > $$E[Y] = 0.3(500) + 0.15(2000) + 0.05(3000) = 600$$
> > Without the limit the mean would be 700. The limit removes $0.05 \times 2000 = 100$.

> [!example]- Deductible, coinsurance and a limit {Example}
> A loss is uniform on $(0, 4000)$. A policy has a deductible of 200, pays 50% of the excess, and caps the payment at 1,000. Find the expected payment and the probability that the insurer pays the maximum.
>
> > [!answer]-
> > **Plan:** find where the cap binds, then take the difference of two limited expected values.
> >
> > The cap binds at $200 + 1000/0.5 = 2200$. For this loss, $E[X \wedge a] = a - a^2/8000$.
> > $$
> > \begin{align*}
> > E[X \wedge 2200] &= 2200 - 605 \\
> > &= 1595 \\[4pt]
> > E[X \wedge 200] &= 200 - 5 \\
> > &= 195 \\[4pt]
> > E[Y] &= 0.5\,(1595 - 195) \\
> > &= 700
> > \end{align*}
> > $$
> > The insurer pays the maximum with probability $P(X > 2200) = 0.45$.

> [!warning]- Exam traps
> - **The lump at the limit.** $P(Y = u) = P(X > d + u/\alpha)$ is positive, so the payment's CDF jumps to 1 at $u$.
> - **Where the cap binds, with coinsurance.** The loss is $d + u/\alpha$, not $d + u$ or $u/\alpha$.
> - **The limit term dropped.** $E[X \wedge u]$ needs $u\,P(X > u)$ added to the integral below the limit. In the running example, leaving it out gives 180 instead of 420.
> - **The order of limit and coinsurance.** A cap on the covered loss pays at most $\alpha u$. A cap on the payment pays at most $u$.
