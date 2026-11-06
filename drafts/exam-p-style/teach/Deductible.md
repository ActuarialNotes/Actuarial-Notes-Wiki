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
