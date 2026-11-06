---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:dea4b2d061cc85087ea8ce4d15575df495c475f5846faeb129c414704cfd281f
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), §III theorem on S_n (PDF pp.4-5), §VI Deductibles (PDF p.7) and Benefit Limits (PDF pp.8-9), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q101 (PDF pp.30-31), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 2 outcomes e-f (PDF p.3) and Topic 3 outcome i (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "SOA, Tables for Exam C (Fall 2009), A.3.3.1 Exponential (PDF p.11) and A.2.3.1 Pareto (PDF p.8), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Random Variable.md
---

The **loss random variable** $X$ is the ground-up amount of a loss, before any policy provision such as a [[Deductible|deductible]], a [[Coinsurance Percentage|coinsurance percentage]] or a [[Benefit Limit|benefit limit]] is applied. The insurer's payment $Y$ is a function of it.

> $$Y = g(X)$$

> $$Y = \begin{cases} 0 & X \le d \\ X - d & X > d \end{cases}$$

- $g$ is the policy's payment function. The second block is $g$ under an ordinary deductible $d$, so $Y = (X - d)_+$.
- The loss is nonnegative, with CDF $F_X(x)$ and survival function $S_X(x) = 1 - F_X(x)$.
- The [[Expected Value|expected value]] and [[Variance|variance]] of the [[Payment Random Variable|payment random variable]] differ from those of $X$, because the policy cuts the loss off below the deductible and above the limit.

> [!idea] The idea
> The loss describes what happened to the insured, and it does not depend on the policy. Each policy provision is a function applied to the same loss. So one loss distribution answers questions about any deductible, limit or coinsurance.

![[Media/Figures/Loss_Random_Variable.svg|340]]

## One loss, three policies

Take a loss that is uniform on $(0, 1000)$. Here are three draws of the loss under three different policies.

| Loss $X$ | Deductible 200 | Limit 600 | Deductible 200, 80% |
|---|---|---|---|
| 150 | 0 | 150 | 0 |
| 450 | 250 | 450 | 200 |
| 900 | 700 | 600 | 560 |

The loss column is the same in every case. Only the payment function changes.

## What a policy does to the loss

A policy changes what the insurer sees of the loss. Two effects have names.

- A limit **censors** the loss from above. A loss of 900 under a limit of 600 is recorded as 600: the insurer knows only that the loss reached the limit.
- A deductible **truncates** the loss from below. A loss under the deductible produces no payment, so the insurer may never see it. The losses it does see are shifted down by $d$.

The averages show both effects on the running example.

| Quantity | Mean |
|---|---|
| Loss $X$ | 500 |
| Payment per loss, deductible 200 | 320 |
| Payment per payment, deductible 200 | 400 |
| Payment, limit 600 | 420 |

The payment per payment is larger than the payment per loss, because it leaves out the 20% of losses that pay nothing.

## Every payment question is a loss question

A probability about the payment becomes a probability about the loss. Find the losses that produce the payment, then use $F_X$.

- Under a deductible of 200 and 80% coinsurance, a payment above 400 needs an excess above $400 / 0.8 = 500$. That is a loss above 700, so $P(Y > 400) = P(X > 700) = 0.3$.
- Under a deductible alone, $Y \le t$ exactly when $X \le d + t$. So $F_Y(t) = F_X(d + t)$ for $t \ge 0$.

> $$P(Y > t) = P\!\left(X > d + \frac{t}{\alpha}\right)$$

> [!trap] Using the loss's distribution for the payment
> The payment is not distributed like the loss. Its mean is not $E[X] - d$, because losses below $d$ pay 0 rather than a negative amount. Here $E[X] - d = 300$, but the expected payment per loss is 320.

## On other exams

**FAM and ALTAM** use the same name for a different quantity in life insurance: the insurer's loss on a policy. The loss at issue $L_0$ is the present value of the benefits less the present value of the premiums.

> $$L_0 = \text{PV of benefits} - \text{PV of premiums}$$

- For a fully discrete whole life insurance of $S$ with annual premium $P$, $L_0 = S v^{K+1} - P\,\ddot{a}_{\overline{K+1}|}$, where $K$ is the curtate future lifetime.
- Since $\ddot{a}_{\overline{K+1}|} = (1 - v^{K+1})/d$, this is $L_0 = (S + P/d)\,v^{K+1} - P/d$, a linear function of $v^{K+1}$.
- Its variance is therefore $\text{Var}(L_0) = (S + P/d)^2\,({}^2A_x - A_x^2)$.
- Under the [[Equivalence Principle|equivalence principle]], $E[L_0] = 0$.
- The prospective loss ${}_kL$ at time $k$ is the [[Future Loss Random Variable|future loss random variable]]. Its expected value, given the insured is alive, is the [[Policy Value|policy value]] ${}_kV$.

## Try it

> [!example]- Expected payment under a deductible {Example}
> Ground-up losses are exponential with mean 1,000. A policy has an ordinary deductible of 500. Find the expected payment per loss.
>
> > [!answer]-
> > **Plan:** integrate the payment function against the density of the loss.
> > $$
> > \begin{align*}
> > E[Y] &= \int_{500}^{\infty} (x - 500)\,\frac{1}{1000}\,e^{-x/1000}\,dx \\
> > &= 1000\,e^{-0.5} \\
> > &\approx 606.5
> > \end{align*}
> > $$
> > Why more than $E[X] - d = 500$? The losses below the deductible pay 0 instead of a negative amount, which raises the mean.

> [!example]- A payment probability {Example}
> Losses are exponential with mean 2,000. A policy has a deductible of 250 and pays 75% of the excess. Find the probability that the payment on a loss exceeds 1,500.
>
> > [!answer]-
> > **Plan:** turn the payment event into a loss event.
> >
> > A payment above 1,500 needs an excess above $1500 / 0.75 = 2000$, which is a loss above 2,250.
> > $$P(Y > 1500) = e^{-2250/2000} = 0.3247$$

> [!example]- The loss at issue in life insurance {Example}
> A fully discrete whole life insurance of 1,000 has $A_x = 0.30$ and ${}^2A_x = 0.12$, with $d = 0.05$. The premium follows the equivalence principle. Find the standard deviation of $L_0$.
>
> > [!answer]-
> > **Plan:** find the premium, then use $\text{Var}(L_0) = (S + P/d)^2({}^2A_x - A_x^2)$.
> > $$
> > \begin{align*}
> > \ddot{a}_x &= \frac{1 - 0.30}{0.05} \\
> > &= 14 \\[4pt]
> > P &= \frac{1000 \times 0.30}{14} \\
> > &= 21.43 \\[4pt]
> > S + \frac{P}{d} &= 1000 + 428.57 \\
> > &= 1428.57 \\[4pt]
> > \text{Var}(L_0) &= 1428.57^2 \times (0.12 - 0.09) \\
> > &= 61{,}224.5
> > \end{align*}
> > $$
> > The standard deviation is $\sqrt{61{,}224.5} = 247.4$.

> [!warning]- Exam traps
> - **Loss for payment.** A question about the insurer's payment is about $Y$, not $X$. Apply the policy to the loss before taking moments.
> - **$E[X] - d$ for the expected payment.** The payment is $(X - d)_+$, which is never negative, so $E[(X - d)_+] \ge E[X] - d$.
> - **Censoring and truncation swapped.** A limit censors the loss from above. A deductible truncates it from below.
> - **The life loss's sign.** In life insurance, $L_0$ is benefits less premiums, so a long-lived insured gives a negative loss.
