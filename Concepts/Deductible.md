---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:f1d3ed0c7bc5dec23833fbee4e2ff35b4eae4574be4b4e4a2bd7b00100355e29
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

A **Deductible** is the initial amount of a loss that the policyholder must pay before insurance coverage begins.

> $$Y = (X - d)_+$$

> $$= \max(X - d,\ 0)$$

- where $d$ is the deductible, $X$ the ground-up loss and $Y$ the insurer's payment
- If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it pays the excess $X - d$
- Deductibles save the expense of processing small claims, lower the premium, and give the policyholder an economic incentive to prevent losses
- On Exam 5, a deductible is stated either as a flat dollar amount or as a percentage of the coverage amount: a 5% deductible on a home insured for \$500,000 is equivalent to a flat \$25,000 deductible

> [!idea] The idea
> The deductible cuts the first $d$ off every loss, so small losses vanish from the insurer's books and large ones shrink by exactly $d$. Raising the deductible by a dollar saves that dollar only on the losses that exceed it, so the first dollars of deductible, which almost every loss passes, save the most, and each later dollar saves less.

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

> [!tip]- How it appears on the exam
> - **Exam P** (Univariate Random Variables, outcomes 5–6): given a loss distribution (uniform, exponential, a table) and an ordinary deductible, calculate the payment, its expected value or variance, or the deductible that produces a target expected payment — often with a [[Coinsurance Percentage|coinsurance percentage]], a [[Benefit Limit|benefit limit]] or [[Inflation|inflation]] in the same question.
> - **FAM, MAS-I and ASTAM**: coverage modifications — expected payment per loss and per payment, the [[Loss Elimination Ratio|loss elimination ratio]], the effect of inflation on a fixed deductible, and the frequency and aggregate payments once a deductible applies.
> - **Exam 5**: pricing large deductible policies — the rating procedure is on [[Deductible Rating]], this page's namesake. **Exam 7**: reserving for high per-occurrence deductible workers compensation, using limited and unlimited development factors.
> - **The DISCs and Exam 6C**: settling a claim under the policy wording — a percentage (hurricane) deductible, a per-occurrence deductible beside an annual aggregate one, and how the deductible interacts with the limit.

> [!warning]- Exam traps
> - **Per loss or per payment.** $E[(X - d)_+]$ averages over every loss, zeros included; the expected payment *per payment* divides it by $P(X > d)$. In the exponential example the per-loss answer is $818.73$ and the per-payment answer is $1{,}000$ — a question offering both expects you to read which one it asks for.
> - **The capped term dropped.** $E[X \wedge d]$ needs $d\,P(X \geq d)$ added to the sum (or integral) below $d$. Leaving it out gives a limited expected value that is too small, and an expected payment $E[X] - E[X \wedge d]$ that is too large.
> - **A percentage of the loss instead of the coverage amount.** A 5% deductible on a home insured for $\$500{,}000$ is $\$25{,}000$ whatever the loss; taking 5% of a $\$40{,}000$ loss ($\$2{,}000$) understates what the homeowner keeps.
> - **Inflation scaled straight through.** With the deductible fixed, inflating every loss by $r$ raises the expected payment by more than $r$: a paying loss's payment grows by $rX$, more than $r(X - d)$, and losses just under the deductible start to pay. Multiplying the old expected payment by $1 + r$ is too low.
