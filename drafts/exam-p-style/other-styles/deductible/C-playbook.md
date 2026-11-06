A **Deductible** $d$ is the part of each loss that the policyholder pays before the insurer pays anything.

> $$Y = \max(X - d,\ 0) = (X - d)_+$$

- $X$ is the ground-up loss and $Y$ is the insurer's payment on that loss.
- The policyholder keeps $X \wedge d = \min(X, d)$, so $X = (X \wedge d) + (X - d)_+$.

> [!idea] The idea
> Small losses never reach the insurer, and large ones reach it $d$ smaller. Every deductible question is about which losses get past $d$ and by how much.

![[Media/Figures/Deductible.svg|340]]

## The five question shapes

| The question asks for | Start from | Section |
|---|---|---|
| The expected payment per loss | $\int_d^\infty S(x)\,dx$, or a shortcut | 1 |
| The expected payment per payment | the per-loss answer over $P(X > d)$ | 2 |
| The variance of the payment | $E[Y^2]$ | 3 |
| The deductible that gives a target | a guessed range, then a check | 4 |
| The payment after inflation | the inflated loss, not the old answer | 5 |

### 1. Expected payment per loss

**Do:** average the payment over every loss, zeros included. Use a shortcut when the loss has one.

> $$E[(X - d)_+] = \int_d^\infty S(x)\,dx = E[X] - E[X \wedge d]$$

| Loss | $E[(X - d)_+]$ |
|---|---|
| Exponential, mean $\theta$ | $\theta\, e^{-d/\theta}$ |
| Uniform on $(0, b)$, $d < b$ | $\dfrac{(b - d)^2}{2b}$ |
| Discrete, probability function $p$ | $\sum_{x > d} (x - d)\, p(x)$ |

> [!example]- Exponential losses {Example}
> Losses are exponential with mean 1,000 and the deductible is 200. Find the expected payment per loss.
>
> > [!answer]-
> > $$E[(X - 200)_+] = 1000\,e^{-0.2} \approx 818.73$$

**Watch out:** if you go through $E[X] - E[X \wedge d]$, the [[Limited Expected Value|limited expected value]] needs the capped term $d \cdot P(X \ge d)$ as well as the losses below $d$.

### 2. Expected payment per payment

**Do:** divide the per-loss answer by the probability that a payment is made.

> $$E[X - d \mid X > d] = \frac{E[(X - d)_+]}{P(X > d)}$$

> [!example]- Exponential losses, per payment {Example}
> Same losses and deductible. Find the expected payment per payment.
>
> > [!answer]-
> > $$\frac{818.73}{e^{-0.2}} = 1000$$
> > The [[Exponential Distribution|exponential distribution]] is memoryless, so the excess over any deductible has the same mean as the loss.

**Watch out:** the answer options usually include both the per-loss and per-payment figures. Read which one is asked.

### 3. Variance of the payment

**Do:** find $E[Y^2]$ over the losses above $d$, then subtract the square of the mean from section 1.

> $$E[Y^2] = \int_d^\infty (x - d)^2 f(x)\,dx$$

> [!example]- Exponential losses, variance {Example}
> Same losses and deductible. Find $\text{Var}(Y)$.
>
> > [!answer]-
> > **Plan:** $Y$ is 0 with probability $1 - e^{-0.2}$. Otherwise it is exponential with mean 1,000, whose second moment is $2 \times 1000^2$.
> > $$E[Y^2] = e^{-0.2} \times 2{,}000{,}000 \approx 1{,}637{,}462$$
> > $$\text{Var}(Y) = 1{,}637{,}462 - 818.73^2 \approx 967{,}141$$

**Watch out:** $\text{Var}(Y)$ is not $\text{Var}(X - d) = \text{Var}(X)$. A loss below $d$ pays 0, not a negative amount, so $Y$ is not a shift of $X$.

### 4. The deductible that gives a target

**Do:** guess the range $d$ falls in, keep only the losses above it, solve, then check that $d$ is inside the guessed range.

> [!example]- Discrete losses {Example}
> A loss is 0, 100, 400 or 1,000 with probabilities 0.4, 0.3, 0.2 and 0.1. Find the deductible that makes the expected payment per loss 100.
>
> > [!answer]-
> > Guess $d < 100$: $210 - 0.6d = 100$ gives $d = 183.3$. Outside the range, so reject.
> >
> > Guess $100 \le d < 400$: $0.2(400 - d) + 0.1(1000 - d) = 180 - 0.3d = 100$ gives $d = 266.67$. Inside the range.

**Watch out:** a value that solves the equation but falls outside its guessed range is not an answer.

### 5. Inflation with a fixed deductible

**Do:** inflate the loss first, then apply the deductible. Equivalently, deflate the deductible and scale up.

> $$E\big[((1 + r)X - d)_+\big] = (1 + r)\, E\!\left[\left(X - \tfrac{d}{1 + r}\right)_+\right]$$

> [!example]- Uniform losses with 10% inflation {Example}
> Losses are uniform on $(0, 1000)$ and the deductible is 200. All losses rise 10%. Find the new expected payment per loss.
>
> > [!answer]-
> > $$1.1 \times E[(X - 181.82)_+] = 1.1 \times \frac{(1000 - 181.82)^2}{2000} \approx 368.18$$
> > Before inflation it was $800^2 / 2000 = 320$, so the payment rose about 15%.

**Watch out:** multiplying the old 320 by 1.1 gives 352, which is too low. A fixed deductible makes the payment grow faster than the loss.

> [!tip]- Beyond Exam P
> - **FAM, MAS-I and ASTAM**: the same five shapes, plus the [[Loss Elimination Ratio|loss elimination ratio]] and the effect on claim frequency.
> - **Exam 5 and 7**: pricing and reserving for large deductible policies (see [[Deductible Rating]]).
> - **The DISCs and Exam 6C**: settling a claim under policy wording, including percentage deductibles.
