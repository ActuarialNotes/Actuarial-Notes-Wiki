A **Deductible** $d$ is the part of each loss that the policyholder pays before the insurer pays anything.

> $$Y = \max(X - d,\ 0) = (X - d)_+$$

- $X$ is the ground-up loss and $Y$ is the insurer's payment on that loss.
- A loss at or below $d$ pays nothing. A loss above $d$ pays the excess $X - d$.
- The policyholder keeps the loss capped at the deductible, $X \wedge d = \min(X, d)$, so $X = (X \wedge d) + (X - d)_+$.

> [!idea] The idea
> The insurer saves the full loss on small losses and exactly $d$ on large ones. A higher deductible only saves money on the losses that reach it. So the first dollars of deductible remove the most expected payment, and each further dollar removes less.

![[Media/Figures/Deductible.svg|340]]

## The expected payment

Averaging over every loss, including those that pay nothing, gives the expected payment per loss.

> $$E[(X - d)_+] = E[X] - E[X \wedge d]$$

> $$E[(X - d)_+] = \int_d^\infty S(x)\,dx$$

- $E[X \wedge d]$ is the [[Limited Expected Value|limited expected value]] and $S(x) = 1 - F(x)$ is the survival function.
- The expected payment *per payment* counts only losses above $d$, so it divides by $P(X > d)$.

> $$E[X - d \mid X > d] = \frac{E[(X - d)_+]}{P(X > d)}$$

> [!example]- One policy, two losses {Example}
> A policy has a deductible of 500. What does the insurer pay on a loss of 300 and on a loss of 2,000?
>
> > [!answer]-
> > - Loss of 300: $\max(300 - 500,\ 0) = 0$.
> > - Loss of 2,000: $\max(2000 - 500,\ 0) = 1{,}500$.

> [!example]- Exponential losses {Example}
> Losses are exponential with mean 1,000 and the deductible is 200. Find the expected payment per loss and per payment.
>
> > [!answer]-
> > **Plan:** integrate the survival function above the deductible.
> > $$E[(X - 200)_+] = \int_{200}^\infty e^{-x/1000}\,dx = 1000\,e^{-0.2} \approx 818.73$$
> > Dividing by $P(X > 200) = e^{-0.2}$ gives 1,000 per payment. The exponential is memoryless, so the excess over the deductible has the same mean as the loss.

> [!example]- Solving for the deductible {Example}
> A loss is 0, 100, 400 or 1,000 with probabilities 0.4, 0.3, 0.2 and 0.1. Find the deductible that makes the expected payment per loss 100.
>
> > [!answer]-
> > **Plan:** guess which losses exceed $d$, solve, then check the guess.
> >
> > Guess $100 \le d < 400$, so only 400 and 1,000 pay.
> > $$0.2(400 - d) + 0.1(1000 - d) = 180 - 0.3d = 100$$
> > This gives $d = 266.67$, which is inside the guessed range. (Guessing $d < 100$ gives $d = 183.3$, which is outside it.)

> [!tip]- How it appears on the exam
> - **Exam P**: a loss distribution and a deductible. Find the payment, its mean or variance, or the deductible that gives a target mean. [[Coinsurance Percentage|Coinsurance]], a [[Benefit Limit|benefit limit]] or [[Inflation|inflation]] is often added.
> - **FAM, MAS-I and ASTAM**: per-loss and per-payment means, the [[Loss Elimination Ratio|loss elimination ratio]], and inflation with a fixed deductible.
> - **Exam 5 and 7**: pricing and reserving for large deductible policies (see [[Deductible Rating]]).
> - **The DISCs and Exam 6C**: settling a claim under policy wording, including percentage deductibles.

> [!warning]- Exam traps
> - **Per loss or per payment.** Read which one is asked. In the exponential example they are 818.73 and 1,000.
> - **Dropping the capped term.** $E[X \wedge d]$ includes $d \cdot P(X \ge d)$, not just the losses below $d$.
> - **Scaling by inflation.** With $d$ fixed, inflation of $r$ raises the expected payment by more than $r$.
