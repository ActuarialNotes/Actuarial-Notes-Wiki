---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:4d8ef87fc125e20cf80d2fc5b00104357f5f75ff6f412070f6e9225ff3bfc4ca
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05), §VI Benefit limits: upper bound on how much the insurer will pay for any loss; losses in excess of 1 million are rare events (PDF p.8), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "SOA Probability Exam (Exam P) syllabus, November 2026, Topic 2 Univariate Random Variables, learning outcomes e-f (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Siegrist, §3.2 Additional Properties, Right Distribution Function: E(X) = int_0^inf P(X > x) dx for nonnegative X, sha256:80150b157fee54ddfea427e726a32493121464235644d38eec5997fdd9ca7321 — https://www.randomservices.org/random/expect/Properties2.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Benefit Limit.md
---

A **Benefit Limit** ($u$) is the maximum amount an insurer will pay on a single claim, capping the insurer's payment regardless of how large the underlying loss $X$ is.

> $$Y = \min\!\bigl(\alpha(X - d)_+,\; u\bigr)$$

- where $u$ is the maximum benefit (the benefit limit), $d$ the [[Deductible|deductible]] and $\alpha$ the [[Coinsurance Percentage|coinsurance percentage]]
- The formula caps the insurer's **payment**: the deductible comes off first, coinsurance $\alpha$ applies to the rest, and $u$ caps the result. This order matches P-21-05's definition, under which a benefit limit sets an upper bound on how much the insurer will pay for any loss. It also matches the way SOA's sample questions apply a limit to the benefit itself
- A policy can instead cap the **covered loss** and apply coinsurance after the cap. P-21-05's health policy pays costs up to $5{,}000$ and reimburses $80\%$ of them, so costs of $6{,}000$ are reimbursed $0.80 \times \min(6{,}000,\ 5{,}000) = 4{,}000$. The payment-cap formula would give $\min(4{,}800,\ 5{,}000) = 4{,}800$. The policy wording decides the order (see [[Payment Random Variable]]). With no coinsurance the two orders give the same payment
- The benefit limit is the insurer's counterpart to the [[Deductible]]. The deductible takes the first part of each loss off the insurer, and the benefit limit caps what the insurer pays on a large loss
- Under the payment cap, losses above $d + u/\alpha$ result in the insurer paying exactly $u$ and the insured bearing the remainder
- Raising the benefit limit by a dollar increases the expected payment only by the probability that the payment reaches the limit

> [!idea] The idea
> Large losses are rare, but they can cost the insurer far more than the typical loss. A benefit limit caps the insurer's payment at $u$, so the insurer gives up its rarest, largest payments in exchange for a known maximum. Every loss past the point where the payment reaches $u$ pays exactly $u$. The payment therefore has a lump of probability at the limit instead of trailing off, so its moments are an integral below the limit plus $u$ times the probability of reaching it.

![[Media/Figures/Benefit_Limit.svg|340]]

### Moments of a limited loss

With no deductible or coinsurance the payment is the limited loss $X \wedge u = \min(X, u)$, which equals $X$ below the limit and $u$ above it. Its expectation therefore splits at the limit into an integral up to $u$ against the density plus $u$ times the probability that the loss exceeds $u$.

> $$E[(X \wedge u)^k] = \int_0^u x^k f(x)\,dx + u^k\,P(X > u)$$

- where $f$ is the density of the nonnegative loss $X$ and $k = 1, 2, \ldots$ For $k = 1$ this is the [[Limited Expected Value|limited expected value]]: integrate $x f(x)$ from $0$ to $u$ and add $u$ times the survival probability $P(X > u)$.
- For $k = 1$ it also equals the integral of the survival function $S(x) = 1 - F(x)$ up to the limit, $E[X \wedge u] = \int_0^u S(x)\,dx$.
- The variance of the limited loss is $E[(X \wedge u)^2] - E[X \wedge u]^2$, from the $k = 2$ and $k = 1$ moments.

> [!example]- Mean and Variance of a Limited Uniform Loss {Example}
> A loss is uniform on $[0, 1{,}000]$ and a policy pays it up to a limit of $600$. Find the mean and variance of the payment.
>
> > [!answer]-
> > Split each moment at $600$, where $P(X > 600) = 0.4$:
> > $$
> > \begin{align*}
> > E[X \wedge 600] &= \int_0^{600} \frac{x}{1{,}000}\,dx + 600(0.4) \\
> > &= 180 + 240 \\
> > &= 420 \\[6pt]
> > E[(X \wedge 600)^2] &= \int_0^{600} \frac{x^2}{1{,}000}\,dx + 600^2(0.4) \\
> > &= 72{,}000 + 144{,}000 \\
> > &= 216{,}000 \\[6pt]
> > \text{Var}(X \wedge 600) &= 216{,}000 - 420^2 \\
> > &= 39{,}600
> > \end{align*}
> > $$
> > Check the mean with the survival function: $\int_0^{600} (1 - x/1{,}000)\,dx = 600 - 180 = 420$. The $40\%$ of losses above the limit each pay exactly $600$, which is why the second term is there.

> [!example]- Payment with Deductible and Benefit Limit {Example}
> A policy has deductible $d = 100$ and benefit limit $u = 400$ with no coinsurance. If $X = 600$, what does the insurer pay?
>
> > [!answer]-
> > The uncapped payment would be $X - d = 600 - 100 = 500$. Applying the benefit limit:
> > $$Y = \min(500, 400) = 400$$
> > The insurer pays \$400; the insured absorbs the first \$100 (deductible) and the last \$100 (excess above limit).

> [!tip]- How it appears on the exam
> - **Exam P** (Univariate Random Variables, outcomes 5–6): given a loss distribution and a maximum payment, calculate the expected payment per loss, the probability the insurer pays exactly the maximum, or the CDF of the benefit paid.
> - With a deductible and coinsurance in the same policy: the smallest loss at which the insurer pays the maximum, or the expected payment when losses inflate but the deductible and limit stay fixed.
> - **Exam 5**: the minimum and maximum indemnity benefits of a workers compensation benefit structure (percentages of the state average weekly wage), where the maximum caps the weekly benefit the same way.

> [!warning]- Exam traps
> - **Treating the capped payment as continuous.** $P(Y = u) = P(X > d + u/\alpha)$ is positive, so the benefit's CDF jumps to 1 at $u$. A CDF that keeps rising to the top of the loss range, or an answer of $0$ for "pays exactly the maximum", has missed the lump.
> - **Where the cap binds, with coinsurance.** The payment reaches $u$ at the loss $d + u/\alpha$. With $d = 200$, $\alpha = 50\%$ and $u = 1{,}000$ that is $2{,}200$. Using $d + u = 1{,}200$ forgets the coinsurance, and using $u/\alpha = 2{,}000$ forgets the deductible.
> - **The limit term dropped.** $E[X \wedge u]$ needs $u\,P(X > u)$ added to the integral below the limit. In the uniform example, leaving it out gives $180$ instead of $420$.
