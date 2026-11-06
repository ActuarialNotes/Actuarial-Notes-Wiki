---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:80899b917b02545239777515bf2319256c5cb0eae6105ae65c5e57353f4870e4
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05), §VI Deductibles: losses below 500 pay nothing, 2000 loss pays 1500, claim payments reduced by the amount of the deductible (PDF p.7), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed., 2016), Ch.6 Leveraged Effect of Limits on Severity Trend, Table 6.20-6.21: trend on excess losses greater than the total limits trend, a claim below the limit pierces into the layer; deductibles also have a leveraging effect on severity trend, censoring below the deductible (pp.117-118, PDF pp.129-130); Ch.11 percentage deductible as % of coverage amount, 5% of 500,000 = 25,000 (p.199, PDF p.211), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Siegrist, §3.1 Definitions and Basic Properties (Expected Value), conditional expected value E(X | A) computed with the conditional density given A, P(A) > 0, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html"
    - "Siegrist, The Exponential Distribution, The Memoryless Property: the conditional distribution of X - s given X > s is the distribution of X, sha256:db0eebaa01377dfc5e07ca838f9ae6c3b06b9653e6d10032de301cb07c4aad63 — https://www.randomservices.org/random/poisson/Exponential.html"
    - "SOA Probability Exam (Exam P) syllabus, November 2026, Topic 2 Univariate Random Variables, learning outcomes e-f (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Deductible.md
---

A **Deductible** $d$ is the part of each loss that the policyholder pays before the insurer pays anything.

> $$Y = \max(X - d,\ 0) = (X - d)_+$$

- $X$ is the ground-up loss and $Y$ is the insurer's payment on that loss.
- The policyholder keeps the rest, $\min(X, d)$, written $X \wedge d$.

> [!idea] The idea
> The policyholder absorbs the first $d$ of every loss. Small losses never reach the insurer, and large ones reach it $d$ smaller.

![[Media/Figures/Deductible.svg|340]]

## One loss at a time

Take a policy with a deductible of 200.

| Loss $X$ | Policyholder keeps $X \wedge 200$ | Insurer pays $(X - 200)_+$ |
|---|---|---|
| 50 | 50 | 0 |
| 200 | 200 | 0 |
| 350 | 200 | 150 |
| 900 | 200 | 700 |

The two columns always add back to the loss. That split is the key fact of the page.

> $$X = (X \wedge d) + (X - d)_+$$

## Averaging over many losses

Now let the loss be uniform on $(0, 1000)$, so $E[X] = 500$. What does the insurer expect to pay on a loss?

Taking the mean of both sides of the split shows the insurer's expected payment is the expected loss less what the policyholder keeps.

> $$E[(X - d)_+] = E[X] - E[X \wedge d]$$

- $E[X \wedge d]$ is the [[Limited Expected Value|limited expected value]]. For this loss, $E[X \wedge 200] = 180$.
- The insurer's expected payment is $500 - 180 = 320$.

A second route skips the limited expected value. For a nonnegative loss, the expected payment is the area under the survival function $S(x) = 1 - F(x)$ to the right of $d$.

> $$E[(X - d)_+] = \int_d^\infty S(x)\,dx$$

- For the uniform loss, $\int_{200}^{1000} \left(1 - \frac{x}{1000}\right) dx = 320$.

## Per loss or per payment?

The 320 above averages over every loss, including the 20% that pay nothing. An insurer looking only at the claims it actually pays sees a larger average.

> $$E[X - d \mid X > d] = \frac{E[(X - d)_+]}{P(X > d)}$$

- For the uniform loss, $320 / 0.8 = 400$.
- Both numbers are correct answers to different questions. Exam questions say "per loss" or "per payment", and the options usually include both.

## Why the first dollars matter most

Raising the deductible by one dollar reduces the payment by one dollar, but only on losses that exceed $d$. So the expected payment falls at the rate $P(X > d)$.

| Deductible | Expected payment per loss | Saved by the last 200 |
|---|---|---|
| 0 | 500 | |
| 200 | 320 | 180 |
| 400 | 180 | 140 |
| 600 | 80 | 100 |

Each 200 of deductible saves less than the one before, because fewer losses reach it.

## A fixed deductible under inflation

If every loss rises 10% and the deductible stays at 200, the loss becomes uniform on $(0, 1100)$. The expected payment rises from 320 to about 368.18, which is 15%, not 10%.

- A loss already above the deductible grows by $0.1X$, but the payment $X - d$ is smaller than $X$, so the payment grows by more than 10%.
- Some losses just under 200 are pushed over it and start to pay.

> [!trap] Multiplying by $1 + r$
> With the deductible fixed, scaling the old expected payment by $1 + r$ gives too low an answer. Inflate the loss distribution first, then apply the deductible.

## Discrete losses

When the loss takes a few values, the integrals become sums. Take a loss of 0, 100, 400 or 1,000 with probabilities 0.4, 0.3, 0.2 and 0.1, so $E[X] = 210$, and a deductible of 200.

> $$E[(X - d)_+] = \sum_{x > d} (x - d)\,p(x)$$

> $$E[X \wedge d] = \sum_{x < d} x\,p(x) + d\,P(X \ge d)$$

- The insurer pays $0.2 \times 200 + 0.1 \times 800 = 120$.
- The policyholder keeps $0.3 \times 100 + 200 \times 0.3 = 90$. The second term counts every loss of 200 or more at the deductible.
- The two add back to 210.
- Between two possible loss amounts, the expected payment is a straight line in $d$ with slope $-P(X > d)$. It bends at each possible loss amount.

Some policies pay per event above $d$ events. For a count $N$ taking the values $0, 1, 2, \ldots$, the capped count is a sum of tail probabilities.

> $$E[N \wedge d] = \sum_{k=0}^{d-1} P(N > k)$$

## On other exams

The same deductible appears on later exams, stated in the policy's own terms.

- **FAM, MAS-I and ASTAM** add the [[Loss Elimination Ratio|loss elimination ratio]], $E[X \wedge d] / E[X]$, and the effect of a deductible on how many losses become payments.
- **Exam 5 and the DISCs** state a deductible as a percentage of the coverage amount. A 5% deductible on a home insured for \$500,000 is a flat \$25,000, whatever the size of the loss.
- **Exam 6C and the DISCs** settle claims under a per-occurrence deductible, an annual aggregate deductible, or both, and with a limit.
- **Exam 5 and Exam 7** price and reserve large deductible policies. The rating procedure is on [[Deductible Rating]].

## Try it

> [!example]- Exponential losses {Example}
> Losses are exponential with mean 1,000 and the deductible is 200. Find the expected payment per loss and per payment.
>
> > [!answer]-
> > **Plan:** integrate the survival function above 200.
> > $$E[(X - 200)_+] = \int_{200}^\infty e^{-x/1000}\,dx = 1000\,e^{-0.2} \approx 818.73$$
> > Dividing by $P(X > 200) = e^{-0.2}$ gives 1,000 per payment. The [[Exponential Distribution|exponential distribution]] is memoryless, so the excess has the same mean as the loss.

> [!example]- Solving for the deductible {Example}
> A loss is 0, 100, 400 or 1,000 with probabilities 0.4, 0.3, 0.2 and 0.1. Find the deductible that makes the expected payment per loss 100.
>
> > [!answer]-
> > **Plan:** guess which losses exceed $d$, solve, then check the guess.
> >
> > If $d < 100$, all three positive losses pay, and $210 - 0.6d = 100$ gives $d = 183.3$. That is not below 100, so the guess is wrong.
> >
> > If $100 \le d < 400$, only 400 and 1,000 pay.
> > $$0.2(400 - d) + 0.1(1000 - d) = 180 - 0.3d = 100$$
> > This gives $d = 266.67$, which is inside the range.

> [!warning]- Exam traps
> - **Per loss or per payment.** Read which one is asked.
> - **Dropping the capped term.** $E[X \wedge d]$ includes $d \cdot P(X \ge d)$, not just the losses below $d$.
> - **Scaling by inflation.** Inflate the losses, then apply the deductible.
> - **A percentage of the loss instead of the coverage.** A 5% deductible on a \$500,000 home is \$25,000. Taking 5% of a \$40,000 loss understates what the insured keeps.
