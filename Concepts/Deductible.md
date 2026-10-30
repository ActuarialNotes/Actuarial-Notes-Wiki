---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:442ae137fdcfbaf745b39db9b227f07b879f591396348bb75f55e854e0a977f0
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §VI Deductibles: definition, 500/2000/1500 example and reasons for deductibles, PDF p.7"
    - "Werner & Modlin, Basic Ratemaking (CAS, 2016), Ch.11 Deductibles: flat dollar and percentage deductibles, 5% of 500,000 = 25,000, PDF p.211, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "SOA, Tables for Exam C (Fall 2009), exponential entry E[X^x] = theta(1 - e^(-x/theta)), PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA Probability Exam syllabus, November 2026, objective \"Calculate the amount that an insurance company pays to a policyholder for a claim given policy information, including deductibles, coinsurance percentages, and benefit limits, as well as other factors, such as inflation\", PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "RISK AND INSURANCE, Anderson & Brown, Risk and Insurance (SOA P-21-05), §VI Deductibles (PDF p.7): insurer pays the loss in excess of the deductible; §VIII (PDF p.13): Y = max(0, X - 5), charges below the deductible pay nothing, sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "Definitions and Basic Properties, §3.1 Definitions and Basic Properties: change of variables theorem (discrete and continuous), additive property, mixed-distribution definition E(X) = sum_D x g(x) + int_C x h(x) dx, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html"
    - "Additional Properties, §3.2 Additional Properties, Right Distribution Function: E(X) = int_0^inf P(X > x) dx for nonnegative X; E(N) = sum_{n>=0} P(N > n) for N in N, sha256:80150b157fee54ddfea427e726a32493121464235644d38eec5997fdd9ca7321 — https://www.randomservices.org/random/expect/Properties2.html"
    - "https://openstax.org/books/calculus-volume-1/pages/5-3-the-fundamental-theorem-of-calculus, OpenStax Calculus Volume 1 §5.3 Theorem 5.4, Fundamental Theorem of Calculus Part 1, sha256:7ef62f4b28ce316524985288945f7c0b5aa91cea2ce9c8e8cbb88025aab42982 — https://openstax.org/books/calculus-volume-1/pages/5-3-the-fundamental-theorem-of-calculus"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Deductible.md
---

A **Deductible** is the initial amount of a loss that the policyholder must pay before insurance coverage begins.
- If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it pays the excess $X - d$
- Deductibles save the expense of processing small claims, lower the premium, and give the policyholder an economic incentive to prevent losses
- On Exam 5, a deductible is stated either as a flat dollar amount or as a percentage of the coverage amount: a 5% deductible on a home insured for \$500,000 is equivalent to a flat \$25,000 deductible

> $$Y = (X - d)_+$$

> $$= \max(X - d,\ 0)$$

> $$d = \text{deductible}, \quad X = \text{ground-up loss}$$

![[Media/Figures/Deductible.svg|340]]

### The retained part and the expected payment

Under an ordinary deductible $d$ the loss splits in two: the part the policyholder keeps (is not reimbursed for) is the loss capped at the deductible, $\min(X, d) = X \wedge d$, and the insurer pays the excess $(X - d)_+$.

> $$X = (X \wedge d) + (X - d)_+$$

- The mean of the retained part is the [[Limited Expected Value|limited expected value]] $E[X \wedge d]$, so the insurer's expected payment per loss is the expected loss less the limited expected value.

> $$E[(X - d)_+] = E[X] - E[X \wedge d]$$

- For a continuous loss with density $f$, integrate only where the payment is positive: losses below $d$ contribute nothing. For a nonnegative loss with survival function $S(x) = 1 - F(x)$ this equals the integral of $S$ above $d$.

> $$E[(X - d)_+] = \int_d^\infty (x - d)\,f(x)\,dx$$

> $$E[(X - d)_+] = \int_d^\infty S(x)\,dx$$

- For a discrete loss with probability function $p(x)$, the payment sums over the loss amounts above $d$, and the retained part takes each amount below $d$ at its value and every other at $d$.

> $$E[(X - d)_+] = \sum_{x > d} (x - d)\,p(x)$$

> $$E[X \wedge d] = \sum_{x < d} x\,p(x) + d\,P(X \geq d)$$

- For a count $N$ taking the values $0, 1, 2, \ldots$ (a policy paying per event above $d$ events, with $d$ a whole number), the capped count also has a tail-sum form, $E[\min(N, d)] = \sum_{k=0}^{d-1} P(N > k)$:

> $$E[N \wedge d] = \sum_{k=0}^{d-1} [1 - F(k)]$$

- As a function of $d$, the expected payment $E[(X - d)_+]$ is continuous and decreasing, with slope $-P(X > d)$. For a discrete loss it is piecewise linear in $d$, the slope changing at each possible loss amount.
- To find the deductible that gives a target expected payment on a discrete loss, solve piecewise: assume $d$ lies between two consecutive loss amounts, keep only the losses above it, solve for $d$, and check that the answer lies in the assumed range; if it doesn't, reject that case and try the next range.

> [!example]- Choosing a Deductible for a Target Expected Payment {Example}
> A loss is $0$, $100$, $400$ or $1{,}000$ with probabilities $0.4$, $0.3$, $0.2$ and $0.1$. Find the deductible $d$ that makes the expected payment per loss $100$.
>
> > [!answer]-
> > Plan: guess the range of $d$, keep only the losses above it, solve, then check the range.
> >
> > Case $0 \leq d < 100$: all three positive losses exceed $d$.
> > $$
> > \begin{align*}
> > 0.3(100 - d) + 0.2(400 - d) + 0.1(1{,}000 - d) &= 210 - 0.6d \\
> > 210 - 0.6d &= 100 \\
> > d &= 183.3
> > \end{align*}
> > $$
> > That is not below $100$, so reject this case.
> >
> > Case $100 \leq d < 400$: only $400$ and $1{,}000$ exceed $d$.
> > $$
> > \begin{align*}
> > 0.2(400 - d) + 0.1(1{,}000 - d) &= 180 - 0.3d \\
> > 180 - 0.3d &= 100 \\
> > d &= 266.67
> > \end{align*}
> > $$
> > It lies in $[100, 400)$, so $d = 266.67$. The slope in this range, $-0.3$, is $-P(X > d)$: each extra unit of deductible saves the insurer $0.3$ in expected payment.

> [!example]- Expected Payment with an Ordinary Deductible {Example}
> Ground-up losses $X \sim \text{Exponential}(\theta = 1000)$. An ordinary deductible of $d = 200$ applies. Find $E[Y]$ where $Y = (X - 200)_+$.
>
> > [!answer]-
> > For an exponential distribution, the expected payment with deductible $d$ is:
> > $$E[Y] = E[(X-d)_+] = \theta\, e^{-d/\theta} = 1000\, e^{-200/1000} = 1000\, e^{-0.2} \approx 818.73$$
> > The insurer expects to pay approximately \$818.73 per loss (including the zero payments when $X \leq 200$).

> [!example]- Insurer Payment at Different Loss Levels {Example}
> Under a policy with a \$$500$ deductible, what does the insurer pay on losses of \$$300$ and \$$2{,}000$?
>
> > [!answer]-
> > - For a \$$300$ loss: $(300 - 500)^+ = 0$. The insurer pays nothing.
> > - For a \$$2{,}000$ loss: $(2000 - 500)^+ = 1500$. The insurer pays \$$1{,}500$.
