---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:bc5594f2708aa2e4271eec853b34284ba050d1a2a98227255e6edeee21de2fad
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §VII Inflation: fixed deductible +54% vs losses +46% PDF p.10; fixed maximum claim payment +34% PDF p.11"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q328 (3% inflation as Var[1.03X + 2.5], PDF p.91), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Tables for Exam C (Fall 2009), exponential entry E[X^x] = theta(1 - e^(-x/theta)), PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 2016), Ch.6 loss trend drivers PDF p.122; Leveraged Effect of Limits on Severity Trend PDF pp.129-130; Ch.11 social inflation PDF p.204, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS study note), economic environment PDF p.50; diagonals as valuation dates PDF p.59; average case outstanding in a stable environment PDF p.81; frequency-severity and inflation PDF p.218, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money outcome a (inflation and real rate of interest), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Inflation.md
---

**Inflation** is the growth in the size of losses over time. In a loss model, inflation at a uniform rate $r$ turns the loss random variable $X$ into a larger one.

> $$X' = (1 + r)\,X$$

- $r$ is the inflation rate over the period, $X$ is the loss before inflation and $X'$ is the loss after it.
- Inflation scales every dollar amount of the loss. The mean rises by the factor $1 + r$ and the variance by $(1 + r)^2$.
- Many [[Deductible|deductibles]] and [[Benefit Limit|benefit limits]] are fixed in dollars. Inflation therefore does not scale the insurer's payment by $1 + r$.

> [!idea] The idea
> Inflation makes the losses larger but leaves a fixed deductible where it was. The deductible shrinks relative to the losses, so the insurer's payment above it rises by more than $r$. A fixed limit works the other way: it stops the payment from following the loss, so the payment below it rises by less than $r$.

![[Media/Figures/Inflation.svg|340]]

## What inflation does to the loss

Take a loss that is uniform on $(0, 1000)$ this year, and let every loss rise 10% next year. Each loss of $x$ becomes a loss of $1.1x$, so next year's loss is uniform on $(0, 1100)$.

| Quantity | This year | Next year |
|---|---|---|
| Mean | 500 | 550 |
| Variance | 83,333 | 100,833 |
| Upper end | 1,000 | 1,100 |

The mean rises 10% and the variance rises 21%, because $1.1^2 = 1.21$. The same rule gives the variance of any linear change, such as a loss that rises 3% and then has a fixed fee of 2.5 added.

> $$\text{Var}(aX + b) = a^2\,\text{Var}(X)$$

Inflation keeps a loss in its own family when the family has a scale parameter. Only the scale parameter changes.

- An [[Exponential Distribution|exponential]] with mean $\theta$ becomes an exponential with mean $(1 + r)\theta$.
- A [[Pareto Distribution|Pareto]] or a gamma keeps its shape $\alpha$, and its scale $\theta$ becomes $(1 + r)\theta$.
- A lognormal keeps its $\sigma$, and its $\mu$ becomes $\mu + \ln(1 + r)$.

## A fixed deductible: why the payment rises faster

Now apply a deductible of 200 that stays at 200. This year the insurer expects to pay $E[(X - 200)_+] = 320$ per loss. Next year the same calculation on the uniform $(0, 1100)$ loss gives 368.18. That is a rise of 15.1%, not 10%.

- A loss already above 200 grows by $0.1X$, but the payment $X - 200$ is smaller than $X$. The payment therefore grows by more than 10%.
- Some losses just under 200 are pushed over it and start to pay. The probability of a payment rises from 0.8 to 0.818.

Inflating the loss against a fixed deductible gives the same answer as leaving the loss alone and lowering the deductible to $d/(1 + r)$, then scaling up.

> $$E[(X' - d)_+] = (1 + r)\,E\!\left[\left(X - \tfrac{d}{1 + r}\right)_+\right]$$

- For the running example, $1.1 \times E[(X - 181.82)_+] = 1.1 \times 334.71 = 368.18$.

> [!trap] Multiplying by $1 + r$
> With the deductible fixed, $1.1 \times 320 = 352$ is too low. Inflate the loss distribution first, then apply the deductible.

## Per loss or per payment?

The 15.1% rise is per loss. Per payment, the expected payment rises from $320 / 0.8 = 400$ to $368.18 / 0.818 = 450$, which is 12.5%.

The expected payment per payment rises less than per loss. The losses newly pushed over the deductible are small ones, so they pull the average payment down. The two rises are linked through the probability of a payment.

> $$1.151 = 1.125 \times 1.0227$$

An exponential loss is the exception. It is memoryless, so its expected payment per payment is its mean, and that rises by exactly $r$.

## A fixed limit: why the payment rises slower

Go back to the uniform loss with no deductible, and cap each payment at 600. The insurer expects to pay $E[X \wedge 600] = 420$ this year and $436.36$ next year, a rise of only 3.9%. Every loss above 600 still pays 600, whatever its size.

The losses above the limit take the leverage instead. The table splits the ground-up loss at the deductible and at the limit.

| Part of the loss | This year | Next year | Rise |
|---|---|---|---|
| Whole loss | 500 | 550 | 10.0% |
| Above a deductible of 200 | 320 | 368.18 | 15.1% |
| Below a limit of 600 | 420 | 436.36 | 3.9% |
| Above a limit of 600 | 80 | 113.64 | 42.0% |

The [[Limited Expected Value|limited expected value]] follows the same rule as the deductible, with the limit scaled down by $1 + r$.

> $$E[X' \wedge u] = (1 + r)\,E\!\left[X \wedge \tfrac{u}{1 + r}\right]$$

## When the policy terms inflate too

If the deductible is raised in step with the losses, to $(1 + r)d$, the payment rises by exactly $r$. Every piece of the calculation is scaled by the same factor.

> $$E[(X' - (1 + r)d)_+] = (1 + r)\,E[(X - d)_+]$$

A fixed deductible also removes a smaller share of the inflated loss. The [[Loss Elimination Ratio|loss elimination ratio]] of the deductible of 200 falls from $180 / 500 = 0.360$ to $181.82 / 550 = 0.331$.

## On other exams

**Exam FM** uses the word for prices in general. The real rate of interest $i'$ is what remains of the interest rate $i$ after inflation at rate $r$ ([[Real Rate of Interest]]).

> $$1 + i' = \frac{1 + i}{1 + r}$$

- With $i = 5\%$ and $r = 2\%$, $i' = 2.94\%$, slightly less than $i - r = 3\%$.

**Exam 5 and Exam 8** study inflation as a driver of [[Loss Trend|loss trend]], alongside rising medical costs and advances in safety technology.

- The leveraged effect of limits holds for any positive severity trend: the basic limits trend is at most the total limits trend, which is at most the excess losses trend (Werner & Modlin). Their example dampens a 10% total limits severity trend to 3.5% in basic limits losses.
- Deductibles have the same leveraging effect, with the censoring below the deductible rather than above the limit.
- The study note P-21-05 shows both effects on a car policy at 10% inflation a year. From year 1 to year 5, expected losses rise 46%. Under a fixed deductible of 500, expected claim payments rise 54%, from 650 to 998. With a fixed maximum claim payment of 12,500 added, they rise only 34%, from 610 to 819.
- [[Social Inflation|Social inflation]] is a significant rise in the propensity for lawsuits and the size of jury awards. Like general inflation, it hits increased limits losses hardest.

**Exam 5 reserving** treats a change in the inflation rate as a change in the economic environment that the actuary must understand before estimating unpaid claims (Friedland).

- In a stable environment, the average case outstanding increases down each column of the triangle at the annual inflation rate. Averages that rise faster are a question for the claims department.
- Each diagonal of a triangle is one valuation date. A shift along the latest diagonal therefore points to something that happened in that calendar year ([[Calendar Year Effect]]).
- When every factor on the latest diagonal exceeds its column average, and paid severity on closed claims rose too, the payments themselves went up. That is consistent with an inflation shift.
- Development techniques assume that past development patterns account for inflation. The [[Frequency-Severity Method|frequency-severity method]] reflects inflation explicitly, at the price of being highly sensitive to the inflation assumption.

## Try it

> [!example]- A fixed deductible on an exponential loss {Example}
> Ground-up losses are exponential with mean 1,000, with an ordinary deductible of 500. Next year every loss rises 10% and the deductible stays at 500. Find the percentage increase in the expected payment per loss.
>
> > [!answer]-
> > **Plan:** inflate the exponential's mean to 1,100, then apply the deductible to each year's loss.
> >
> > For an exponential loss, $E[(X - d)_+] = \theta e^{-d/\theta}$.
> > $$
> > \begin{align*}
> > \text{This year:} \quad 1000\,e^{-0.5} &= 606.53 \\
> > \text{Next year:} \quad 1100\,e^{-500/1100} &= 698.21
> > \end{align*}
> > $$
> > The expected payment per loss rises $698.21 / 606.53 - 1 = 15.1\%$.
> >
> > Why more than 10%? The deductible has in effect fallen to $500 / 1.1 = 454.55$ in this year's dollars.

> [!example]- The same policy, per payment {Example}
> For the policy above, find the percentage increase in the expected payment per payment.
>
> > [!answer]-
> > **Plan:** use the memoryless property, under which the excess over the deductible has the loss's own distribution.
> >
> > The expected payment per payment is $\theta$ in each year, 1,000 and then 1,100. It rises exactly 10%.
> >
> > Why less than per loss? The probability of a payment also rises, from $e^{-0.5} = 0.6065$ to $e^{-0.4545} = 0.6347$, and $1.10 \times 1.0465 = 1.151$.

> [!example]- A fixed limit {Example}
> Losses are exponential with mean 2,000 and a policy pays each loss up to 3,000. Next year every loss rises 10% and the limit stays at 3,000. Find the percentage increase in the expected payment, and in the expected loss above the limit.
>
> > [!answer]-
> > **Plan:** use $E[X \wedge u] = \theta(1 - e^{-u/\theta})$ in each year, and subtract from the mean for the part above the limit.
> > $$
> > \begin{align*}
> > \text{This year:} \quad 2000\,(1 - e^{-1.5}) &= 1553.74 \\
> > \text{Next year:} \quad 2200\,(1 - e^{-3000/2200}) &= 1637.40
> > \end{align*}
> > $$
> > The expected payment rises 5.4%, about half the inflation rate. The expected loss above the limit rises from $2000 - 1553.74 = 446.26$ to $2200 - 1637.40 = 562.60$, which is 26.1%.

> [!warning]- Exam traps
> - **Scaling the payment by $1 + r$.** With fixed policy terms, inflate the loss distribution and recompute the payment.
> - **Expecting the same rise per loss and per payment.** Under a fixed deductible, the rise per payment is smaller, because the newly paying losses are small.
> - **Inflating the shape parameter.** Only the scale parameter changes. A Pareto with $\alpha = 2$ stays at $\alpha = 2$.
> - **Inflating the deductible by mistake.** Read whether the deductible is "fixed" or "indexed". An indexed deductible gives a rise of exactly $r$.
> - **Subtracting rates on Exam FM.** The real rate is $(1 + i)/(1 + r) - 1$, not $i - r$.
