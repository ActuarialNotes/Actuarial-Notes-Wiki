---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:ed91a614f7317ff7db3d75555c755e2b6003ed6b11cb6dfdbabf7613e7529a86
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §2.2 Example 2.17 p.68 (PDF p.76): 'The only continuous density function with this property is the exponential density'; §5.1 geometric memoryless (PDF p.194); §5.2 uniform density 1/(b-a) and exponential density (PDF pp.213-216), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 5.21 The Uniform Distribution on an Interval: f = 1/(b-a); E(X)=(a+b)/2; var(X)=(b-a)^2/12; X = a + wU location-scale family (HTML fetched 2026-11-06), sha256:8e9ed89d801bc2780eab168757688e254a9484275e8d068c1fd000bf625c8558 — https://www.randomservices.org/random/special/UniformContinuous.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 5.20 General Uniform Distributions: P(X in A)=lambda(A)/lambda(S); conditional distribution given X in R is uniform on R; (X,Y) uniform on S x T iff X, Y independent and each uniform (HTML fetched 2026-11-06), sha256:df0f3d671bbd4ee0a72d98431cfd36e142ce833eb5c78d96dcfcb9c6650d7575 — https://www.randomservices.org/random/special/Uniform.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Theorem 6.5 E(X) = sum_j E(X|F_j)P(F_j) (PDF p.247), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Risk and Insurance study note P-21-05, VI Limits on Policy Benefits: deductible pays the loss in excess of the deductible, losses vs claim payments, benefit limits (PDF pp.7-9), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Uniform Continuous Distribution.md
---

The **Continuous Uniform Distribution** $X \sim \text{Unif}(a, b)$ assigns equal probability density to every point in the interval $(a, b)$, making it the continuous analogue of the [[Uniform Discrete|discrete uniform]]. It is a simple loss model when every amount in a range is equally plausible.

> $$f(x) = \frac{1}{b - a}, \quad a < x < b$$

> $$E[X] = \frac{a + b}{2}$$

> $$\text{Var}(X) = \frac{(b - a)^2}{12}$$

- The CDF is a straight line, $F(x) = (x-a)/(b-a)$ for $a < x < b$.
- Conditional distributions on sub-intervals are also uniform: given $X > d$, $X$ is uniform on $(d, b)$.
- The uniform is **not** memoryless. The [[Exponential Distribution|exponential]] is the only continuous distribution that is.

> [!idea] The idea
> A flat density makes probability proportional to length. Any question about a uniform becomes a question about how long an interval is, compared with the whole of $(a, b)$. Cutting the interval down, by a condition or a deductible, leaves a shorter flat interval, so the answer stays a ratio of lengths.

![[Media/Figures/Uniform_Continuous_Distribution.svg|340]]

## Probability is length

A loss $X$ is uniform on $(0, 500)$. What is the probability it falls between 100 and 250?

The interval is 150 long out of 500, so the probability is $150/500 = 0.3$.

| Quantity | Value |
|---|---|
| $P(100 < X < 250)$ | 0.3 |
| $E[X]$ | 250 |
| $\text{Var}(X)$ | 20,833.33 |
| $\text{SD}(X)$ | 144.34 |

- The mean is the midpoint of the interval.
- The variance depends only on the length $b - a$. Shifting the interval moves the mean and leaves the variance alone.

## Given that the loss exceeds 200

A deductible of 200 applies. Among the losses that exceed it, what does a loss look like?

The condition cuts the interval to $(200, 500)$, and the density stays flat on what is left. So $X \mid X > 200$ is uniform on $(200, 500)$, with mean 350.

- The excess $X - 200$, given $X > 200$, is uniform on $(0, 300)$ with mean 150. That is the expected payment per payment.
- Only 60% of losses exceed 200, so the expected payment per loss is $0.6 \times 150 = 90$.

> $$E[(X - d)_+] = P(X > d) \cdot E[X - d \mid X > d]$$

## Not memoryless

Has a loss that already exceeds 200 the same chance of exceeding a further 200 as a fresh loss has of exceeding 200?

For the uniform it does not. Given $X > 200$, the chance of exceeding 400 is $100/300 = 1/3$, but a fresh loss exceeds 200 with probability $0.6$.

> [!trap] Using memorylessness on a uniform
> $P(X > s + t \mid X > s) = P(X > t)$ holds only for the exponential. For a uniform, compute the ratio of the two remaining lengths. For $\text{Unif}(0, 10)$, $P(X > 8 \mid X > 5) = 2/5$, but $P(X > 3) = 7/10$.

## Changing the units

Measured in hundreds, the same loss is uniform on $(0, 5)$. Linear functions keep the density flat and carry the endpoints with them.

> $$cX + k \sim \text{Unif}(ca + k,\ cb + k), \quad c > 0$$

- If $X \sim \text{Unif}(a, b)$, $c > 0$ and $k$ is any constant, then $cX + k$ is uniform. A loss uniform on $[0, 500]$, divided by 100, is uniform on $[0, 5]$.
- After 10% inflation, the loss is uniform on $(0, 550)$. The mean rises to 275 and the variance by the factor $1.1^2$.

## Two independent losses

Now take two independent losses $X$ and $Y$, each uniform on $(0, 500)$. The pair is uniform on the square $(0, 500) \times (0, 500)$, so a probability about the pair is an area divided by the area of the square.

| Event | Region | Probability |
|---|---|---|
| $X + Y < 500$ | half the square | 0.50 |
| $Y > 2X$ | a triangle | 0.25 |
| $\lvert X - Y \rvert < 100$ | a diagonal band | 0.36 |

- For $Y > 2X$, the triangle has corners $(0, 0)$, $(0, 500)$ and $(250, 500)$, which is a quarter of the square.
- For the band, the two corner triangles outside it together make a square of side 400. So the band has probability $1 - (400/500)^2 = 0.36$.
- On the unit square, with $X$ and $Y$ each $\text{Unif}(0, 1)$, the joint density is $f(x, y) = 1$, so the probability is simply the area.

## Try it

> [!example]- Expected Payment with Uniform Losses and a Deductible {Example}
> Ground-up losses $X \sim \text{Unif}(0, 1000)$. An ordinary deductible of $d = 300$ applies. Find $E[(X - 300)_+]$.
>
> > [!answer]-
> > **Plan:** find the probability of a payment, then the average payment when there is one.
> >
> > Since losses are uniform, those above 300 are distributed $\text{Unif}(300, 1000)$. The probability of exceeding the deductible is $P(X > 300) = 700/1000 = 0.7$, and the expected excess given a payment is $700/2 = 350$.
> > $$
> > \begin{align*}
> > E[(X-300)_+] &= 0.7 \times 350 \\
> >              &= 245
> > \end{align*}
> > $$

> [!example]- Recovering the Interval {Example}
> A claim's settlement time, in days, is uniform with mean 60 and variance 300. Find the probability that a claim takes more than 75 days.
>
> > [!answer]-
> > **Plan:** the variance gives the length of the interval and the mean gives its centre.
> > $$
> > \begin{align*}
> > (b - a)^2 &= 12 \times 300 = 3{,}600 \\
> > b - a &= 60
> > \end{align*}
> > $$
> > The interval is centred on 60, so it is $(30, 90)$.
> > $$P(X > 75) = \frac{90 - 75}{60} = 0.25$$

> [!example]- Two Settlement Times {Example}
> Two claims are reported at the start of a year. Their settlement times, in years, are independent and uniform on $(0, 1)$. Find the probability that the second claim settles more than half a year after the first, and the probability that both settle within 0.7 years.
>
> > [!answer]-
> > **Plan:** each event is a region of the unit square, so each probability is an area.
> >
> > The region $V > U + 0.5$ is a triangle with legs of length 0.5.
> > $$P(V > U + 0.5) = \frac{(0.5)^2}{2} = 0.125$$
> > Both settle within 0.7 years when the point lies in the square $(0, 0.7) \times (0, 0.7)$.
> > $$P(\max(U, V) < 0.7) = 0.7^2 = 0.49$$
> > The two settlement times are independent, so the second answer is also $P(U < 0.7) \cdot P(V < 0.7)$.

> [!warning]- Exam traps
> - **Using memorylessness.** Given $X > d$, the uniform is uniform on $(d, b)$. It does not restart on $(0, b)$.
> - **Per loss or per payment.** With a deductible, the mean excess $(b - d)/2$ is per payment. Multiply by $P(X > d)$ for the expected payment per loss.
> - **Dividing the variance by 12 the wrong way.** The variance is $(b - a)^2/12$, the square of the length over 12, not $(b^2 - a^2)/12$.
> - **Forgetting to divide by the whole area.** For two uniforms on a rectangle other than the unit square, divide the area of the region by the area of the rectangle.
