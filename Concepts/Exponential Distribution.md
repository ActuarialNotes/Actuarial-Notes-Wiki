---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:cc9e317b668b80f9f53e29d115983ac6305950ec727b972058d91c1f4bed5387
  sources:
    - "SOA, Tables for Exam C (Fall 2009), A.3.2.1 Gamma f, M(t) = (1 - theta t)^-alpha, E[X^k] (printed p.4, PDF p.9 page image, read 2026-11-06); A.3.3.1 Exponential f, F, M(t), VaR_p = -theta ln(1-p), TVaR_p = VaR_p + theta, E[X ^ x] = theta(1 - e^(-x/theta)); A.5.1.1 Lognormal E[X^k] = exp(k mu + k^2 sigma^2/2) (printed p.6, PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §2.2 Example 2.17 p.68 (PDF p.76): 'The only continuous density function with this property is the exponential density'; §5.1 geometric memoryless (PDF p.194); §5.2 uniform density 1/(b-a) and exponential density (PDF pp.213-216), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 14.2 The Exponential Distribution: memoryless property and law of exponents F^c(t+s)=F^c(s)F^c(t); quantile -ln(1-p)/r, median ln2/r; scale parameter 1/r; MGF r/(r-s), s<r; Poisson process inter-arrival times independent exponential (HTML fetched 2026-11-06), sha256:db0eebaa01377dfc5e07ca838f9ae6c3b06b9653e6d10032de301cb07c4aad63 — https://www.randomservices.org/random/poisson/Exponential.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 14.3 The Gamma Distribution (Poisson process): arrival time T_n gamma (Erlang) with shape n (HTML fetched 2026-11-06), sha256:bbea5da3e0577d07d2670905b5727657c25b044f8382e17cee3bdfdd723bbe16 — https://www.randomservices.org/random/poisson/Gamma.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Theorem 6.5 E(X) = sum_j E(X|F_j)P(F_j) (PDF p.247), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Risk and Insurance study note P-21-05, VI Limits on Policy Benefits: deductible pays the loss in excess of the deductible, losses vs claim payments, benefit limits (PDF pp.7-9), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Exponential Distribution.md
---

The **Exponential Distribution** $X \sim \text{Exp}(\theta)$ is a continuous distribution on $(0, \infty)$ with mean $\theta$. It models the time between events and the size of insurance losses.

> $$f(x) = \frac{1}{\theta}\,e^{-x/\theta}, \quad x > 0$$

> $$S(x) = P(X > x) = e^{-x/\theta}$$

- $E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$.
- Some texts parameterize by **rate** $\lambda = 1/\theta$, so $f(x) = \lambda e^{-\lambda x}$ and $E[X] = 1/\lambda$. Check which convention a problem uses before substituting.
- Its defining property is **memorylessness**: $P(X > s + t \mid X > s) = P(X > t)$, making it the unique continuous distribution with no aging effect.

> [!idea] The idea
> The exponential's survival function multiplies: surviving $s + t$ is surviving $s$, then surviving $t$ more. So a loss that has already passed a point is no different from a fresh loss, and whatever exceeds a deductible is distributed like the original loss. That one fact reduces most exponential questions to a line.

![[Media/Exponential_pdf.svg|500]]

![[Media/Figures/Exponential_Distribution.svg|340]]

## Tail probabilities

Losses are exponential with mean 500. What fraction of them exceed 300, 500 or 1,000?

Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF. Almost every exponential question is a tail probability.

| Loss $x$ | $x/\theta$ | $S(x)$ |
|---|---|---|
| 300 | 0.6 | 0.5488 |
| 500 | 1 | 0.3679 |
| 1,000 | 2 | 0.1353 |

- Only 36.8% of losses exceed the mean. The exponential is skewed right, so most losses are below average.
- With a deductible of 300, about 54.9% of losses produce a payment.

## What lies above a deductible

A loss is known to exceed the deductible of 300. How much more is it?

By memorylessness, given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$. The excess over 300 has mean 500, exactly like a fresh loss.

> $$E[X \mid X > d] = d + \theta$$

> $$E[(X - d)_+] = \theta\,e^{-d/\theta}$$

- So $E[X \mid X > d] = d + \theta$ and $E[(X-d)_+] = \theta e^{-d/\theta}$. These are the two identities most [[Deductible|deductible]] questions reduce to.
- Per payment, the insurer expects 500. Per loss, including the 45% of losses that pay nothing, it expects $500\,e^{-0.6} \approx 274.4$.
- The two differ by the factor $P(X > 300) \approx 0.5488$.

## Capping a loss at a limit

A policy pays losses in full up to a [[Benefit Limit|limit]] $u$. What does it expect to pay?

The capped payment is $\min(X, u)$, and its mean is the area under the survival function from 0 to $u$.

> $$E[\min(X, u)] = \theta\left(1 - e^{-u/\theta}\right)$$

- Capped at a limit $u = 1{,}000$, the running example pays $500(1 - e^{-2}) \approx 432.3$ on average.
- A layer from $d$ to $u$ is the difference of two capped means. From 300 to 1,000 it is $500(e^{-0.6} - e^{-2}) \approx 206.7$.

## Working back from one probability

Suppose a question gives only that 54.88% of losses exceed 300. One known probability fixes $\theta$.

Set the survival function at the given point equal to the given probability, and take natural logs.

> $$\theta = \frac{-x_0}{\ln S(x_0)}$$

- From $S(x_0) = e^{-x_0/\theta} = s$ (equivalently $F(x_0) = 1 - s$), $\theta = -x_0/\ln s$. Here $\theta = -300/\ln 0.5488 \approx 500$. The rate is $\lambda = 1/\theta$.
- A [[Percentile|percentile]] works the same way. The $100p$-th percentile is $\pi_p = -\theta\ln(1-p)$, so a known percentile gives $\theta = -\pi_p/\ln(1-p)$.
- For the running example, the [[Median|median]] is $\theta \ln 2 \approx 346.6$ and the 90th percentile is $-500 \ln 0.1 \approx 1{,}151.3$.

## Survival powers

The law of exponents carries a known survival probability to any other point, without solving for $\theta$. Because $e^{-kx/\theta} = \left(e^{-x/\theta}\right)^k$, the survival probability at a multiple of a point is that point's survival probability raised to the multiple.

> $$S(kx) = S(x)^k$$

- For the running example, $S(600) = S(300)^2 = 0.5488^2 \approx 0.3012$.
- The same rule compares two exponentials at one point. An exponential with mean $\theta/k$ has survival $e^{-kx/\theta} = S(x)^k$.
- Halving the mean doubles the rate and squares the survival probability at every fixed point. If $S_A(x) = S_B(x)^k$ at the same $x$, then $\theta_B = k\,\theta_A$.

## Scaling and simulation

$\theta$ is a [[Scale and Shape Parameters|scale parameter]]: for $c > 0$, $cX$ is exponential with mean $c\theta$, and the median and every other percentile move in proportion to $\theta$. After 10% inflation, the running example's losses are exponential with mean 550.

An exponential can also be built from a uniform. If $U \sim \text{Unif}(0,1)$ and $\theta > 0$, then $Y = -\theta \ln U$ is exponential with mean $\theta$.

> $$P(Y \leq y) = P\left(U \geq e^{-y/\theta}\right) = 1 - e^{-y/\theta}$$

This is the [[Inversion Method|inverse-CDF method]] of simulating an exponential.

## Mixtures are not exponential

Suppose half the losses come from a class with mean 1 and half from a class with mean 3. Is the combined loss exponential with mean 2?

It is not. A [[Mixture Distribution|mixture]] of exponentials is not exponential. Compute a probability within each component and weight by the mixing probabilities.

> $$P(X > x) = w\,e^{-x/\theta_1} + (1-w)\,e^{-x/\theta_2}$$

- With means 1 and 3 equally weighted, $P(X > 2) = 0.5e^{-2} + 0.5e^{-2/3} \approx 0.324$.
- A single exponential with the average mean 2 would give $e^{-1} \approx 0.368$.

## The moment generating function

For $t < 1/\theta$ the expectation $E[e^{tX}]$ is finite and has a closed form. For $t \ge 1/\theta$ the integral diverges.

> $$M_X(t) = E\left[e^{tX}\right] = \frac{1}{1 - \theta t}, \quad t < \frac{1}{\theta}$$

- In the rate form it is $M(t) = \lambda/(\lambda - t)$ for $t < \lambda$.
- It gives the expectation of any exponential function of $X$ directly. With mean $\theta = 2$, $E[e^{0.25X}] = 1/(1 - 0.5) = 2$.

## Waiting times between events

In a [[Poisson Process|Poisson process]] with rate $\lambda$ events per unit time, the times between events are independent exponentials with mean $1/\lambda$. The waiting time to the $n$-th event is a sum of $n$ of them, which is a [[Gamma|gamma]] with shape $n$. Memorylessness is why the process has no memory of when the last event happened.

## Try it

> [!example]- Combining a Deductible and a Limit {Example}
> Losses are $X \sim \text{Exp}(\theta = 1000)$. A policy pays the excess over a deductible of 200, capped at a maximum payment of 800. Find the expected payment per loss.
>
> > [!answer]-
> > **Plan:** write the payment as the difference of two excess-loss terms.
> >
> > The payment is $Y = \min\bigl((X-200)_+,\ 800\bigr)$, which pays out only for $200 < X < 1000$ and pays a flat 800 above that.
> > $$
> > \begin{align*}
> > E[Y] &= E[(X-200)_+] - E[(X-1000)_+] \\
> >      &= 1000\,e^{-0.2} - 1000\,e^{-1.0} \\
> >      &= 818.73 - 367.88 \\
> >      &\approx 450.85
> > \end{align*}
> > $$
> > Layering as a difference of excess-loss expectations avoids splitting the integral into three pieces. It works for any severity distribution.

> [!example]- Calibrating $\theta$ from One Probability {Example}
> A waiting time is exponential, and 25% of waits end within 20 minutes. Find $\theta$, the probability a wait exceeds 50 minutes, and the median wait.
>
> > [!answer]-
> > **Plan:** turn "25% end within 20 minutes" into $S(20) = 0.75$ and take logs.
> > $$
> > \begin{align*}
> > e^{-20/\theta} &= 0.75 \\
> > \theta &= \frac{-20}{\ln 0.75} \\
> >        &\approx 69.52
> > \end{align*}
> > $$
> > Then $P(X > 50) = e^{-50/69.52} \approx 0.487$. The survival power gives the same without $\theta$: $S(50) = S(20)^{50/20} = 0.75^{2.5} \approx 0.487$. The median is $\theta \ln 2 \approx 48.19$ minutes.

> [!example]- Two Classes of Loss {Example}
> Losses from class A are exponential with mean 1 and from class B exponential with mean 3. Each class supplies half the losses. Find the probability that a loss exceeds 2.
>
> > [!answer]-
> > **Plan:** find the probability within each class, then weight by the class shares.
> > $$
> > \begin{align*}
> > P(X > 2) &= 0.5\,e^{-2} + 0.5\,e^{-2/3} \\
> >          &= 0.0677 + 0.2567 \\
> >          &\approx 0.324
> > \end{align*}
> > $$
> > Why not $e^{-2/2}$? The combined loss is not exponential. Near 2 its tail is lighter than that of an exponential with mean 2, and far out it is heavier.

> [!warning]- Exam traps
> - **Per loss or per payment.** Above a deductible the excess has mean $\theta$ per payment. Multiply by $e^{-d/\theta}$ for the expected payment per loss.
> - **Mean or rate.** With mean $\theta$ the survival function is $e^{-x/\theta}$. Writing $e^{-\theta x}$ uses the mean as if it were the rate.
> - **Averaging the means of a mixture.** A mixture of exponentials is not exponential. Weight the component probabilities, never the means.
> - **Memorylessness on another distribution.** $P(X > s + t \mid X > s) = P(X > t)$ only for the exponential.
