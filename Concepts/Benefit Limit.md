---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:8bf4e73edb13d43d704f1dbab819996e63b605e354588a6ea5ee8d4439db89ff
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

![[Media/Figures/Benefit_Limit.svg|340]]

A **Benefit Limit** is the maximum amount an [[Insurer|insurer]] will pay on a single loss. With no deductible or coinsurance, the payment on a loss $X$ under a benefit limit $u$ is

> $$Y = X \wedge u$$

- $X \wedge u$, read "$X$ limited at $u$", is $\min(X, u)$: the loss itself when $X < u$, and $u$ when $X \ge u$.

The insured keeps the part of the loss above the limit, $(X - u)_+$. The two parts always add back to the loss: $X = (X \wedge u) + (X - u)_+$.

> [!example]- A policy pays each loss up to a limit of 600. On a loss of 900, what does the insurer pay and what does the insured keep? {Example}
> - The loss is above the limit, so the insurer pays $900 \wedge 600 = 600$.
> - The insured keeps the rest, $900 - 600 = 300$.

## The point mass at the limit

Every loss at or above the limit pays exactly $u$, so the payment equals $u$ with probability

> $$P(Y = u) = P(X \ge u)$$

The payment therefore has a [[Mixture Distribution|mixed distribution]]: it follows the loss below $u$, and its CDF jumps to 1 at $u$.

> [!example]- A loss is uniform on $(0, 1000)$ and the policy pays it up to 600. What is the probability that the insurer pays the maximum? {Example}
> - The insurer pays 600 on every loss of at least 600.
> - $P(X \ge 600) = 0.4$.
> - Below the limit, the payment's CDF is $y/1000$. At 600 it jumps from 0.6 to 1, so $P(Y = 600) = 0.4$.

## The limited expected value

The expected payment is the [[Limited Expected Value|limited expected value]]. Splitting at the limit, it is

> $$E[X \wedge u] = \int_0^u x\,f(x)\,dx + u\,P(X > u)$$

- $f(x)$ is the probability density function of the loss.

It is also the area under the survival function up to the limit:

> $$E[X \wedge u] = \int_0^u \big(1 - F(x)\big)\,dx$$

- $F(x)$ is the cumulative distribution function of the loss.

Higher moments split the same way, with $u^k$ at the point mass:

> $$E[(X \wedge u)^k] = \int_0^u x^k f(x)\,dx + u^k\,P(X > u)$$

> [!example]- A loss is uniform on $(0, 1000)$ and the policy pays it up to 600. What are the mean and variance of the payment? {Example}
> - The density is $f(x) = 1/1000$, and $P(X > 600) = 0.4$.
> - The mean is the integral below the limit plus the point mass:
>
> > $$
> > \begin{aligned}
> > & E[X \wedge 600] \\
> > &= \int_0^{600} \frac{x}{1000}\,dx + 600(0.4) \\
> > &= 180 + 240 \\
> > &= 420
> > \end{aligned}
> > $$
>
> - The second moment splits the same way:
>
> > $$
> > \begin{aligned}
> > & E[(X \wedge 600)^2] \\
> > &= \int_0^{600} \frac{x^2}{1000}\,dx + 600^2(0.4) \\
> > &= 72{,}000 + 144{,}000 \\
> > &= 216{,}000
> > \end{aligned}
> > $$
>
> - The variance of the payment is $216{,}000 - 420^2 = 39{,}600$.

## A benefit limit with a deductible and coinsurance

With a [[Deductible|deductible]] $d$ and a [[Coinsurance Percentage|coinsurance percentage]] $\alpha$, the payment is

> $$Y = \min\!\bigl(\alpha(X - d)_+,\ u\bigr)$$

The deductible comes off first, the coinsurance percentage applies to the rest, and $u$ caps the result. The cap is reached at the loss $d + u/\alpha$, so the expected payment is

> $$
> \begin{aligned}
> E[Y] = \alpha\Big(&E\big[X \wedge \big(d + \tfrac{u}{\alpha}\big)\big] \\
> &- E[X \wedge d]\Big)
> \end{aligned}
> $$

A policy can instead cap the covered loss before the coinsurance, as [[Payment Random Variable]] shows. The policy wording decides the order.

> [!example]- A loss is uniform on $(0, 4000)$. A policy has a deductible of 200, pays 50% of the excess and caps its payment at 1,000. What is the expected payment? {Example}
> - The cap is reached at the loss $200 + 1000/0.5 = 2200$.
> - For this loss, $E[X \wedge a] = a - a^2/8000$.
> - So $E[X \wedge 2200] = 1595$ and $E[X \wedge 200] = 195$.
> - The expected payment is $0.5 \times 1400 = 700$.

> [!trap] Where the cap binds with coinsurance
> With coinsurance, the payment reaches $u$ at the loss $d + u/\alpha$, not $d + u$. With $d = 200$, $\alpha = 0.5$ and $u = 1000$, that is 2,200, not 1,200.
