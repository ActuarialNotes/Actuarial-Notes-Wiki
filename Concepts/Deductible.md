---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:70482dceffb141a33785c129072071f7c4c0138827324c9eed8e10ef648db56d
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05), §VI Deductibles: losses below 500 pay nothing, 2000 loss pays 1500 (PDF p.7), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "Frees et al., Loss Data Analytics (open text), Ch.3 Modeling Loss Severity, §3.4.1 ordinary deductible Y^L, Y^P, E(Y^L) = int_d^inf S(x) dx, E(Y^P) = E(Y^L)/(1 - F(d)), LER, exponential memoryless per payment, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch.6 deductibles leverage severity trend PDF p.130; Ch.11 flat dollar vs percentage deductibles, 5% of 500,000 = 25,000 PDF p.211; Large Deductible Policies PDF pp.315-316, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Siegrist, Random: Additional Properties of Expected Value, §3.2 E(X) = int_0^inf P(X > x) dx; E(N) = sum P(N > n), sha256:80150b157fee54ddfea427e726a32493121464235644d38eec5997fdd9ca7321 — https://www.randomservices.org/random/expect/Properties2.html"
    - "Siegrist, Random: The Exponential Distribution, memoryless property, sha256:db0eebaa01377dfc5e07ca838f9ae6c3b06b9653e6d10032de301cb07c4aad63 — https://www.randomservices.org/random/poisson/Exponential.html"
    - "SOA Exam FAM syllabus, October 2026, coverage modifications, loss elimination ratio, effect of inflation, PDF p.2, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf"
    - "SOA Exam ASTAM syllabus, Fall 2026, coverage modifications; loss elimination ratios, deductible factors, PDF p.3, sha256:6d462aea25c09b15cc457176ecf2d5d6143df8fb88df9f366557de17ec1ec9ba — https://www.soa.org/globalassets/assets/files/edu/2026/astam/2026-fall-exam-astam-syllabus.pdf"
    - "CAS DISC-IA course outline, Applying Property Insurance Limits and Deductibles; BPP Limits of Insurance and Deductible (p.2), sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
    - "Insurance Information Institute, Background on hurricane and windstorm deductibles, hurricane deductibles as a percentage of the insured amount (fetched 2026-11-06), sha256:52981481de3c2bf0f72dcea6596cca4306978a7437f22101912a636823c5e505 — https://www.iii.org/article/background-on-hurricane-and-windstorm-deductibles"
    - "CAS Exam 7 content outline, Fall 2026, Siewert, A Model for Reserving Workers Compensation High Deductibles (A.ii.3), PDF pp.4-5, sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf"
    - "SOA Probability Exam (Exam P) syllabus, November 2026, Topic 2 outcomes e-f, PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 1
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
