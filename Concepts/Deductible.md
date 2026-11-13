---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:613c58be69a15b05a5984c26c5299cee9959a56ed4d9f094ec54eb737b9089be
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

![[Media/Figures/Deductible.svg|340]]

A **Deductible** is the initial amount of a loss that the policyholder must pay before insurance coverage begins. Under an ordinary deductible $d$, the insurer's payment on a loss $X$ is

> $$Y = (X - d)_+$$

> $$Y = \max(X - d,\ 0)$$

- $X$ is the ground-up [[Loss Random Variable|loss]].

If the loss is at most $d$, the insurer pays nothing, and above $d$ it pays the excess $X - d$. The policyholder keeps the rest of the loss, $\min(X, d)$, written $X \wedge d$. The payment is a [[Transformations of Random Variables|function of the loss]], so its distribution and moments are found from those of $X$.

> [!idea] The idea
> Small losses never reach the insurer, and large ones reach it $d$ smaller.

> [!example]- A policy has a deductible of 200. How are losses of 50, 200, 350 and 900 split between the policyholder and the insurer? {Example}
> | Loss $X$ | Policyholder keeps $X \wedge 200$ | Insurer pays $(X - 200)_+$ |
> | --- | --- | --- |
> | 50 | 50 | 0 |
> | 200 | 200 | 0 |
> | 350 | 200 | 150 |
> | 900 | 200 | 700 |
>
> - The two parts always add back to the loss.

## Expected payment per loss

The loss splits as $X = (X \wedge d) + (X - d)_+$, so the insurer's expected payment per loss is

> $$E[(X - d)_+] = E[X] - E[X \wedge d]$$

- $E[X \wedge d]$ is the [[Limited Expected Value|limited expected value]] at $d$.

For a nonnegative loss with survival function $S(x) = 1 - F(x)$, the expected payment per loss is also

> $$E[(X - d)_+] = \int_d^\infty S(x)\,dx$$

> [!example]- Losses are exponential with mean 1,000, and the deductible is 200. What is the expected payment per loss? {Example}
> - The survival function is $S(x) = e^{-x/1000}$.
> - The expected payment is
>
> $$
> \begin{aligned}
> E[(X - 200)_+] &= \int_{200}^\infty e^{-x/1000}\,dx \\
> &= 1{,}000\,e^{-0.2} \\
> &\approx 818.73
> \end{aligned}
> $$
>
> - The insurer expects to pay approximately \$818.73 per loss (including the zero payments when $X \leq 200$).

## Expected payment per payment

An insurer that looks only at the losses it pays sees a larger average. The expected payment per payment is

> $$E[X - d \mid X > d] = \frac{E[(X - d)_+]}{P(X > d)}$$

> [!example]- A loss is uniform on $(0, 1000)$, and the deductible is 200. What are the expected payments per loss and per payment? {Example}
> - The expected payment per loss is the area under $S(x) = 1 - \frac{x}{1000}$ from 200 to 1,000, which is 320.
> - A loss exceeds 200 with probability 0.8.
> - The expected payment per payment is $\frac{320}{0.8} = 400$.

> [!trap] Per loss versus per payment
> The 320 averages over every loss, including the 20% that pay nothing. The 400 averages over payments only. Both are right answers to different questions, and the options usually include both.

## Discrete losses

For a discrete loss with probability function $f(x)$, the expected payment and the expected amount kept are sums:

> $$E[(X - d)_+] = \sum_{x > d} (x - d)\,f(x)$$

> $$E[X \wedge d] = \sum_{x < d} x\,f(x) + d\,P(X \geq d)$$

Every loss of $d$ or more is kept at $d$.

> [!example]- A loss is 0, 100, 400 or 1,000 with probabilities 0.4, 0.3, 0.2 and 0.1, and the deductible is 200. What do the insurer and the policyholder expect? {Example}
> - The insurer pays on the losses of 400 and 1,000, so it expects $0.2(200) + 0.1(800) = 120$.
> - The policyholder keeps 100 on the loss of 100, and 200 on each larger loss, so it expects $0.3(100) + 0.3(200) = 90$.
> - The two add to the expected loss, $E[X] = 210$.

To find the deductible that gives a target expected payment on a discrete loss, solve piecewise: assume $d$ lies between two consecutive loss amounts, keep only the losses above it, solve for $d$, and check that the answer lies in the assumed range. If it doesn't, reject that case and try the next range.

> [!example]- A loss is 0, 100, 400 or 1,000 with probabilities 0.4, 0.3, 0.2 and 0.1. What deductible makes the expected payment per loss 100? {Example}
> - If $0 \le d < 100$, the losses of 100, 400 and 1,000 pay, so $0.3(100 - d) + 0.2(400 - d) + 0.1(1{,}000 - d) = 210 - 0.6d$.
> - Setting $210 - 0.6d = 100$ gives $d = 183.33$, which is not below 100, so this case is rejected.
> - If $100 \le d < 400$, only the losses of 400 and 1,000 pay, so $0.2(400 - d) + 0.1(1{,}000 - d) = 180 - 0.3d$.
> - Setting $180 - 0.3d = 100$ gives $d = 266.67$, which lies in the range, so the deductible is 266.67.

## A deductible under inflation

When every loss rises by a rate $r$ and the deductible stays at $d$, the payment is

> $$Y = \big((1 + r)X - d\big)_+$$

Inflate the loss first, then apply the deductible.

> [!example]- A loss is uniform on $(0, 1000)$ and the deductible is 200. Next year every loss is 10% larger and the deductible is unchanged. What is the expected payment per loss next year? {Example}
> - Next year's loss is uniform on $(0, 1100)$.
> - The expected payment is
>
> $$
> \begin{aligned}
> E[(1.1X - 200)_+] &= \int_{200}^{1100} \left(1 - \frac{x}{1100}\right) dx \\
> &= \frac{900^2}{2{,}200} \\
> &\approx 368.18
> \end{aligned}
> $$
>
> - That is 15% more than this year's 320. Multiplying 320 by 1.1 would give only 352.

## Deductibles on other exams

- **FAM, MAS-I and ASTAM** add the [[Loss Elimination Ratio|loss elimination ratio]], $\frac{E[X \wedge d]}{E[X]}$.
- **Exam 5 and the DISCs** state some deductibles as a percentage of the amount insured. For example, a 5% deductible on a home insured for \$500,000 is equivalent to a flat \$25,000 deductible.
- **Exam 5 and Exam 7** price and reserve deductible policies. The rating procedure is on [[Deductible Rating]].
