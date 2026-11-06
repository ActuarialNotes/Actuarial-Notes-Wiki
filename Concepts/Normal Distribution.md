---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:fb1945266fa9cccda6594b128551c89e24c61ea7e81f22b0a9a8b7782c594b19
  sources:
    - "SOA, Exam P normal distribution table (rev. 4/29/21), standard normal table and selected-percentile row, PDF p.2, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.2 p.213 (PDF p.221), 7.2 Example 7.5 p.294 (PDF p.302), 9.1 p.332 (PDF p.340), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Exam P Sample Solutions (Aug 2026 revision), Q71 (PDF p.23), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "Pishro-Nik, 4.2.3 Normal Distribution: F_X(x)=Phi((x-mu)/sigma), norminv = Phi^{-1}, worked example P(-7<X<-3)=Phi(1)-Phi(-1)=2Phi(1)-1 (HTML fetched 2026-10-30), sha256:87692396b07b851fe96f8ff72f95ed7a894246b70426e34b44e6fe0f48b8d16d — https://www.probabilitycourse.com/chapter4/4_2_3_normal.php"
    - "Siegrist, 5.6 The Normal Distribution: phi'(z)=-z phi(z); Phi(-z)=1-Phi(z); F^{-1}(p)=mu+sigma Phi^{-1}(p) (HTML fetched 2026-10-30), sha256:f4e2fe70308bf064dc44f62716075c9be463a2de262cb0aca8de1d6a0c6ffc84 — https://www.randomservices.org/random/special/Normal.html"
    - "Wikipedia, Truncated normal distribution, One sided truncation (of lower tail): E(X | X>a) = mu + sigma phi(alpha)/Z with alpha=(a-mu)/sigma and Z=1-Phi(alpha); with E[(X-c)+] = P(X>c)(E[X|X>c]-c) this gives the page's expected-excess formula (HTML fetched 2026-10-30), sha256:d098cf3929b0a8598465c2b7706bb4854e5bc4b415765b24c84684e78c32238f — https://en.wikipedia.org/wiki/Truncated_normal_distribution"
    - "Pishro-Nik, 4.1.2 Expected Value and Variance: LOTUS E[g(X)]=integral g(x)f_X(x)dx (4.3); Var(X)=EX^2-(EX)^2 (HTML fetched 2026-10-30), sha256:5ba159d4c07c821a4921efc16bf495e760abbb81638dd01897c7fab3693b05e6 — https://www.probabilitycourse.com/chapter4/4_1_2_expected_val_variance.php"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Normal Distribution.md
---

The **Normal Distribution** $X \sim N(\mu, \sigma^2)$ is a symmetric, bell-shaped continuous distribution on $(-\infty, \infty)$ fully characterized by its mean $\mu$ and variance $\sigma^2$.

> $$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\,\exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right), \quad x \in \mathbb{R}$$

> $$Z = \frac{X - \mu}{\sigma} \sim N(0, 1)$$

- Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,1)$ using $\Phi$ tables.
- By the [[Central Limit Theorem]], sums of many independent random variables are approximately normal. That makes it the standard model for aggregate losses.

> [!idea] The idea
> Every normal is the standard normal, stretched by $\sigma$ and shifted by $\mu$. So one table of $\Phi$ answers every normal question, once the value is turned into "how many standard deviations from the mean". Read forwards, the table turns a value into a probability. Read backwards, it turns a probability into a value.

![[Media/Normal_distribution_pdf.svg|500]]

![[Media/Figures/Normal_Distribution.svg|340]]

## Standardizing

Annual aggregate losses $S$ are normal with mean 50,000 and standard deviation 5,000. What is the probability they exceed 55,000?

The threshold is one standard deviation above the mean, so $z = 1$ and the answer is $1 - \Phi(1) = 0.1587$.

| Losses $x$ | $z$ | $P(S \le x)$ | $P(S > x)$ |
|---|---|---|---|
| 45,000 | $-1$ | 0.1587 | 0.8413 |
| 55,000 | 1 | 0.8413 | 0.1587 |
| 60,000 | 2 | 0.9772 | 0.0228 |

The row for 45,000 needs $\Phi(-1)$, which most tables do not list.

> $$\Phi(-z) = 1 - \Phi(z)$$

- Symmetry gives $\Phi(-z) = 1 - \Phi(z)$. This is the identity needed for every negative $z$, since standard tables only list $z \geq 0$.
- So $P(S \le 45{,}000) = 1 - 0.8413 = 0.1587$, the mirror image of the upper tail at 55,000.

## Reading the table backwards

What loss level is exceeded only 5% of the time? Now the probability is given and the value is wanted.

If $P(X \leq x) = p$, then $(x - \mu)/\sigma = z_p$, where $z_p = \Phi^{-1}(p)$, so

> $$x = \mu + z_p\,\sigma$$

- For the running example, the 95th [[Percentile|percentile]] is $50{,}000 + 1.645 \times 5{,}000 = 58{,}225$.
- Useful percentiles: $z_{0.90} = 1.282$, $z_{0.95} = 1.645$, $z_{0.975} = 1.960$, $z_{0.99} = 2.326$.
- For an upper tail $P(X > x) = q$, use $z_{1-q}$.

## Solving for a parameter

The same equation, $x = \mu + z_p\sigma$, can be solved for $\mu$ or $\sigma$ instead. One condition fixes one unknown.

- Knowing $\mu = 50{,}000$ and a 95th percentile of 58,225 gives $\sigma = 8{,}225/1.645 = 5{,}000$.
- Two conditions (two percentiles or tail probabilities, or one of them plus a moment such as $E[X^2] = \mu^2 + \sigma^2$) give two equations, solved together for both $\mu$ and $\sigma$.
- Subtracting $x_1 = \mu + z_1\sigma$ from $x_2 = \mu + z_2\sigma$ gives $\sigma = (x_2 - x_1)/(z_2 - z_1)$.

## An interval around the mean

What is the probability that losses land within 5,000 of the mean? By symmetry the two tails are equal, so the answer is $2\Phi(1) - 1 = 0.6827$.

> $$P(\mu - a < X < \mu + a) = 2\Phi(a/\sigma) - 1$$

- This probability falls as $\sigma$ grows, with $\mu$ and $a$ fixed. A larger standard deviation spreads the distribution and leaves less probability near the mean.
- A requirement that this probability be at least $p$ therefore holds exactly when $\sigma \leq a/z_{(1+p)/2}$, and the largest admissible $\sigma$ is that boundary value.
- For losses within 5,000 of the mean with probability 90%, $\sigma$ can be at most $5{,}000/1.645 \approx 3{,}040$.

## Sums and differences of normals

The insurer writes a second line, independent of the first. Are the combined losses normal?

Yes, exactly. Any **linear combination of independent normals is exactly normal**: if $X_i \sim N(\mu_i, \sigma_i^2)$ independently, then $\sum c_i X_i \sim N\!\left(\sum c_i\mu_i,\ \sum c_i^2\sigma_i^2\right)$. No approximation and no CLT is required. See [[Probabilities for Linear Combinations]].

> [!trap] Variances of a difference
> For $X - Y$, the coefficient on $Y$ is $-1$, and $(-1)^2 = 1$. Means subtract, but **variances add**, even for a difference. Subtracting the variances understates the spread.

## Expected excess over a threshold

A reinsurer pays aggregate losses above 55,000. What does it expect to pay? For a threshold $c$, with $\phi$ the standard normal density:

> $$E\left[(X - c)_+\right] = (\mu - c)\,\Phi\!\left(\frac{\mu - c}{\sigma}\right) + \sigma\,\phi\!\left(\frac{\mu - c}{\sigma}\right)$$

- For the running example, $(\mu - c)/\sigma = -1$. The expected payment is $-5{,}000 \times 0.1587 + 5{,}000 \times 0.2420 \approx 416.6$.
- The formula follows by writing $X = \mu + \sigma Z$ and integrating $(\mu - c + \sigma z)\,\phi(z)$ over $z > z_0 = (c - \mu)/\sigma$.
- The key step uses $\phi'(z) = -z\,\phi(z)$, so that $\int_{z_0}^{\infty} z\,\phi(z)\,dz = \phi(z_0)$. Symmetry, $1 - \Phi(z_0) = \Phi(-z_0)$ and $\phi(z_0) = \phi(-z_0)$, then gives the form above.

## Approximating a count

A normal is often used for a variable that is not normal, such as a sum of many claims ([[Normal Approximation]]). When approximating a **discrete** variable (a [[Binomial Distribution|binomial]] or [[Poisson Distribution|Poisson]] count) by a normal, apply the continuity correction.

> $$P(X \leq k) \approx \Phi\!\left(\frac{k + 0.5 - \mu}{\sigma}\right)$$

The half unit counts all of the bar at $k$, which a continuous curve would otherwise cut in half.

## Try it

> [!example]- Probability that Aggregate Losses Exceed a Threshold {Example}
> Annual aggregate losses $S \sim N(\mu = 50{,}000,\, \sigma^2 = 40{,}000{,}000)$. Find $P(S > 55{,}000)$.
>
> > [!answer]-
> > **Plan:** take the square root of the variance, standardize, then use the upper tail.
> >
> > Standardize: $\sigma = \sqrt{40{,}000{,}000} \approx 6{,}324.6$.
> > $$Z = \frac{55{,}000 - 50{,}000}{6{,}324.6} \approx 0.791$$
> > $$
> > \begin{align*}
> > P(S > 55{,}000) &= 1 - \Phi(0.791) \\
> >                 &\approx 1 - 0.7855 \\
> >                 &= 0.2145
> > \end{align*}
> > $$
> > The question gives the variance, not the standard deviation. Dividing by 40,000,000 instead of its root is the slip to avoid.

> [!example]- A Difference of Two Independent Normal Losses {Example}
> Two independent lines of business have annual losses $X \sim N(100, 400)$ and $Y \sim N(80, 225)$ (in thousands). Find $P(X < Y)$.
>
> > [!answer]-
> > **Plan:** recast the comparison as a single normal variable $D = X - Y$, and find $P(D < 0)$.
> >
> > Means subtract, but **variances add**, even for a difference:
> > $$
> > \begin{align*}
> > E[D] &= 100 - 80 = 20 \\
> > \text{Var}(D) &= 400 + 225 = 625 \\
> > \text{SD}(D) &= 25
> > \end{align*}
> > $$
> > So $D \sim N(20, 625)$ exactly, and:
> > $$
> > \begin{align*}
> > P(X < Y) &= P(D < 0) \\
> >          &= \Phi\!\left(\frac{0 - 20}{25}\right) \\
> >          &= \Phi(-0.80) \\
> >          &= 1 - 0.7881 \\
> >          &= 0.2119
> > \end{align*}
> > $$
> > Subtracting the variances to get 175 is the standard trap. A difference is *more* variable than either component, not less.

> [!example]- Finding $\mu$ and $\sigma$ from Two Percentiles {Example}
> A normal random variable $X$ has $P(X \leq 60) = 0.8413$ and $P(X \leq 80) = 0.9772$. Find $\mu$ and $\sigma$.
>
> > [!answer]-
> > **Plan:** read the table in reverse for each condition, then solve the two equations together.
> >
> > The table gives $z = 1$ and $z = 2$, so $60 = \mu + \sigma$ and $80 = \mu + 2\sigma$. Subtracting:
> > $$
> > \begin{align*}
> > \sigma &= \frac{80 - 60}{2 - 1} \\
> >        &= 20 \\
> > \mu &= 60 - 20 \\
> >     &= 40
> > \end{align*}
> > $$

> [!warning]- Exam traps
> - **Variance in place of the standard deviation.** $N(\mu, \sigma^2)$ names the variance. Standardize with its square root.
> - **Variances of a difference.** $\text{Var}(X - Y) = \text{Var}(X) + \text{Var}(Y)$ for independent normals.
> - **A negative $z$.** Use $\Phi(-z) = 1 - \Phi(z)$ rather than reading $\Phi(z)$ for the lower tail.
> - **Upper tail percentiles.** A value exceeded with probability 5% uses $z_{0.95} = 1.645$, not $z_{0.05}$.
> - **A continuity correction on a continuous variable.** The half unit belongs only to counts.
