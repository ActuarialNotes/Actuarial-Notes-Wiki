---
Title: "Probability Distributions — Reference Sheet"
Author: Actuarial Notes
Type: Reference Sheet
---
A single-page reference for the named distributions on the [[Exam P-1 (SOA)|Exam P]] syllabus: how to recognise which one a question is describing, the PMF/PDF and moments for each, the relationships that let one collapse into another, and the parameterization traps that cost more marks than the algebra does. Every illustration below is a **live simulator** — drag the parameters, switch between PDF/PMF and CDF, and draw Monte-Carlo samples to see the shape the formula produces.

## How to choose one

Most distribution questions are identification problems, not calculation problems. Read for **what is being counted or measured** and **whether the number of trials is fixed**.

**Discrete — counting things**

- Successes in a **fixed** number of independent trials → [[Binomial Distribution|Binomial]] $(n, p)$
- Successes in a fixed number of draws taken **without replacement** from a finite pool → [[Hypergeometric Distribution|Hypergeometric]] $(N, K, n)$
- Trials **until** the first success, trial count not fixed → [[Geometric Distribution|Geometric]] $(p)$
- Trials **until** the $r$-th success → [[Negative Binomial Distribution|Negative binomial]] $(r, p)$
- Events over an interval of time or space, with no trial count at all → [[Poisson Distribution|Poisson]] $(\lambda)$
- One of $n$ equally likely outcomes → [[Uniform Discrete|Discrete uniform]]

**Continuous — measuring things**

- Equally likely anywhere in a range → [[Uniform Continuous Distribution|Uniform]] $(a, b)$
- Waiting time to the next event, or a memoryless loss size → [[Exponential Distribution|Exponential]] $(\theta)$
- Waiting time to the $r$-th event, or a skewed severity → [[Gamma]] $(\alpha, \theta)$
- Sums and averages of many independent pieces → [[Normal Distribution|Normal]] $(\mu, \sigma^2)$ via the [[Central Limit Theorem]]
- A positive, right-skewed quantity whose **logarithm** is normal → [[Lognormal Distribution|Lognormal]] $(\mu, \sigma^2)$
- A rate, proportion, or probability confined to $(0, 1)$ → [[Beta]] $(\alpha, \beta)$

> [!tip] Three fast discriminators
> - **Variance-to-mean ratio.** Less than 1 → binomial. Exactly 1 → Poisson. Greater than 1 → negative binomial. This single check settles most count-model questions.
> - **Replacement.** Sampling with replacement is binomial; without replacement is hypergeometric. When the population is large relative to the sample the two nearly agree and the binomial is the intended shortcut.
> - **Fixed trials?** "In 10 policies…" is binomial or hypergeometric. "Until the third claim…" is geometric or negative binomial. "Per month…" is Poisson.

## Discrete distributions

See [[Discrete Univariate Distributions]] for the underlying PMF/CDF machinery.

### Bernoulli $(p)$

A single trial with two outcomes. Every other count distribution on this page is built out of it.

> $$P(X = k) = p^k(1-p)^{1-k}, \quad k \in \{0, 1\}$$
>
> $$E[X] = p, \qquad \text{Var}(X) = p(1-p), \qquad M_X(t) = 1 - p + pe^t$$

- Variance is maximised at $p = 0.5$ and vanishes at either endpoint
- An indicator variable is Bernoulli, which is why $E[\text{count}] = \sum P(\text{event}_i)$ works even when the events are dependent

### Binomial $\text{Bin}(n, p)$

Successes in $n$ independent trials with constant success probability $p$.

> $$P(X = k) = \binom{n}{k}p^k(1-p)^{n-k}, \quad k = 0, 1, \ldots, n$$
>
> $$E[X] = np, \qquad \text{Var}(X) = np(1-p), \qquad M_X(t) = \left(1 - p + pe^t\right)^n$$

- Requires **independent** trials, exactly two outcomes, and a **constant** $p$ — a question that breaks any of the three is pointing elsewhere
- $\text{Var}(X) < E[X]$ always, so binomial counts are **underdispersed** relative to Poisson
- For "at least one", use the complement $1 - (1-p)^n$ rather than summing the tail

![[Media/Binomial_distribution_pmf.svg|500]]

Full page: [[Binomial Distribution]]

### Poisson $\text{Poi}(\lambda)$

Events in a fixed interval of time or space, arriving independently at constant average rate $\lambda$.

> $$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}, \quad k = 0, 1, 2, \ldots$$
>
> $$E[X] = \text{Var}(X) = \lambda, \qquad M_X(t) = \exp\!\left(\lambda(e^t - 1)\right)$$

- The **mean equals the variance** — the defining fingerprint, and the check that tells you a portfolio is overdispersed when the data disagree
- Rates scale with the interval: counts over $t$ units are $\text{Poi}(\lambda t)$
- The standard claim-count model, and the counting side of the [[Poisson Process]]

![[Media/Poisson_pmf.svg|500]]

Full page: [[Poisson Distribution]]

### Geometric $\text{Geom}(p)$

Trials until the first success.

> $$P(X = k) = (1-p)^{k-1}p, \quad k = 1, 2, 3, \ldots$$
>
> $$E[X] = \frac{1}{p}, \qquad \text{Var}(X) = \frac{1-p}{p^2}, \qquad M_X(t) = \frac{pe^t}{1 - (1-p)e^t}$$

- **Memoryless**: $P(X > m + n \mid X > m) = P(X > n)$ — the discrete counterpart of the exponential
- Work from the survival function $P(X > n) = (1-p)^n$ ("the first $n$ trials all failed") instead of summing the PMF
- The other parameterization counts *failures* $Y = X - 1$, with $E[Y] = (1-p)/p$ and the same variance

![[Media/Geometric_pmf.svg|500]]

Full page: [[Geometric Distribution]]

### Negative binomial $\text{NegBin}(r, p)$

Trials until the $r$-th success. Reduces to the geometric at $r = 1$.

> $$P(X = k) = \binom{k-1}{r-1}p^r(1-p)^{k-r}, \quad k = r, r+1, \ldots$$
>
> $$E[X] = \frac{r}{p}, \qquad \text{Var}(X) = \frac{r(1-p)}{p^2}, \qquad M_X(t) = \left(\frac{pe^t}{1 - (1-p)e^t}\right)^{r}$$

- $\text{Var}(X) > E[X]$ always, making it the standard **overdispersed** alternative to the Poisson for a heterogeneous portfolio
- It *is* a Poisson whose rate is itself random: a gamma-mixed Poisson is exactly negative binomial
- Same trials-versus-failures fork as the geometric, with the two means differing by $r$

![[Media/Negative_binomial_pmf.svg|500]]

Full page: [[Negative Binomial Distribution]]

### Hypergeometric $(N, K, n)$

Successes in $n$ draws **without replacement** from a population of $N$ containing $K$ successes.

> $$P(X = k) = \frac{\dbinom{K}{k}\dbinom{N-K}{n-k}}{\dbinom{N}{n}}$$
>
> $$E[X] = \frac{nK}{N}, \qquad \text{Var}(X) = \frac{nK(N-K)(N-n)}{N^2(N-1)}$$

- The mean matches the binomial with $p = K/N$; the variance is smaller by the **finite population correction** $\frac{N-n}{N-1}$
- Trials are *not* independent — drawing one success lowers the chance of the next
- No elementary MGF; questions are answered from the PMF directly

![[Media/Hypergeometric_pmf.svg|500]]

Full page: [[Hypergeometric Distribution]]

### Discrete uniform on $\{1, \ldots, n\}$

> $$P(X = k) = \frac{1}{n}, \quad k = 1, 2, \ldots, n$$
>
> $$E[X] = \frac{n+1}{2}, \qquad \text{Var}(X) = \frac{n^2 - 1}{12}$$

Full page: [[Uniform Discrete]]

## Continuous distributions

See [[Continuous Univariate Distributions]] for the PDF/CDF machinery, and [[Probability Density Function (PDF)]] for why a density is not a probability.

### Uniform $\text{Unif}(a, b)$

> $$f(x) = \frac{1}{b-a}, \quad a < x < b$$
>
> $$E[X] = \frac{a+b}{2}, \qquad \text{Var}(X) = \frac{(b-a)^2}{12}, \qquad F(x) = \frac{x-a}{b-a}$$

- Conditioning on a sub-interval leaves it uniform on that sub-interval — the property that makes deductible questions collapse to geometry
- $F^{-1}(U)$ for $U \sim \text{Unif}(0,1)$ generates a draw from any distribution (inverse transform)

Full page: [[Uniform Continuous Distribution]]

### Exponential $\text{Exp}(\theta)$

Waiting time to the next event, or a memoryless loss size. Here $\theta$ is the **mean (scale)**, not a rate.

> $$f(x) = \frac{1}{\theta}e^{-x/\theta}, \quad x > 0$$
>
> $$E[X] = \theta, \qquad \text{Var}(X) = \theta^2, \qquad S(x) = e^{-x/\theta}, \qquad M_X(t) = \frac{1}{1 - \theta t},\ t < 1/\theta$$

- **Memoryless**: given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$. Hence $E[X \mid X > d] = d + \theta$ and $E[(X-d)_+] = \theta e^{-d/\theta}$ — the two identities most [[Deductible|deductible]] questions reduce to
- Constant [[Hazard Rate|hazard rate]] $1/\theta$: no aging
- Work from $S(x)$, not $F(x)$ — nearly every exponential question is a tail probability

![[Media/Exponential_pdf.svg|500]]

Full page: [[Exponential Distribution]]

### Gamma $\text{Gamma}(\alpha, \theta)$

Shape $\alpha$, **scale** $\theta$. The waiting time to the $\alpha$-th event and the workhorse skewed severity model.

> $$f(x) = \frac{x^{\alpha-1}e^{-x/\theta}}{\theta^{\alpha}\Gamma(\alpha)}, \quad x > 0$$
>
> $$E[X] = \alpha\theta, \qquad \text{Var}(X) = \alpha\theta^2, \qquad M_X(t) = (1 - \theta t)^{-\alpha},\ t < 1/\theta$$

- Coefficient of variation $1/\sqrt{\alpha}$ — larger shape means a tighter, more symmetric curve
- For **integer** $\alpha$ the survival function is a Poisson sum: $P(X > x) = \sum_{k=0}^{\alpha-1}\frac{e^{-x/\theta}(x/\theta)^k}{k!}$
- Special cases: exponential at $\alpha = 1$, chi-squared at $\alpha = n/2,\ \theta = 2$

![[Media/Gamma_distribution_pdf.svg|500]]

Full page: [[Gamma]]

### Normal $N(\mu, \sigma^2)$

The second parameter is the **variance**.

> $$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right), \quad x \in \mathbb{R}$$
>
> $$E[X] = \mu, \qquad \text{Var}(X) = \sigma^2, \qquad M_X(t) = \exp\!\left(\mu t + \tfrac{1}{2}\sigma^2 t^2\right)$$

- No closed-form CDF: standardize to $Z = (X-\mu)/\sigma$ and read $\Phi$, using $\Phi(-z) = 1 - \Phi(z)$ for negative arguments
- **Any linear combination of independent normals is exactly normal** — no CLT needed. See [[Probabilities for Linear Combinations]]
- Useful percentiles: $z_{0.90} = 1.282$, $z_{0.95} = 1.645$, $z_{0.975} = 1.960$, $z_{0.99} = 2.326$
- Approximating a discrete count needs the continuity correction $P(X \le k) \approx \Phi\!\left(\frac{k + 0.5 - \mu}{\sigma}\right)$

![[Media/Normal_distribution_pdf.svg|500]]

Full page: [[Normal Distribution]]

### Lognormal $\text{Lognormal}(\mu, \sigma^2)$

$X$ is lognormal when $\ln X \sim N(\mu, \sigma^2)$. The parameters live on the **log scale** — they are not the mean and standard deviation of $X$.

> $$f(x) = \frac{1}{x\sigma\sqrt{2\pi}}\exp\!\left(-\frac{(\ln x - \mu)^2}{2\sigma^2}\right), \quad x > 0$$
>
> $$E[X] = e^{\mu + \sigma^2/2}, \qquad \text{Var}(X) = e^{2\mu + \sigma^2}\left(e^{\sigma^2} - 1\right)$$
>
> $$F(x) = \Phi\!\left(\frac{\ln x - \mu}{\sigma}\right)$$

- Every probability question becomes a normal question after taking logs
- The median is $e^{\mu} < E[X]$ — the gap is the right skew
- The MGF does not exist for $t > 0$; moments come from $E[X^k] = e^{k\mu + k^2\sigma^2/2}$ instead

![[Media/Lognormal_distribution_pdf.svg|500]]

Full page: [[Lognormal Distribution]]

### Beta $\text{Beta}(\alpha, \beta)$

Rates, proportions, and probabilities on $(0, 1)$.

> $$f(x) = \frac{x^{\alpha-1}(1-x)^{\beta-1}}{B(\alpha, \beta)}, \quad 0 < x < 1, \qquad B(\alpha,\beta) = \frac{\Gamma(\alpha)\Gamma(\beta)}{\Gamma(\alpha+\beta)}$$
>
> $$E[X] = \frac{\alpha}{\alpha+\beta}, \qquad \text{Var}(X) = \frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}$$

- Skewed right when $\alpha < \beta$, left when $\alpha > \beta$, symmetric when $\alpha = \beta$; uniform at $\alpha = \beta = 1$
- For integer parameters the density is a plain polynomial and integrates directly
- The $k$-th [[Order Statistics|order statistic]] of $n$ i.i.d. uniforms is exactly $\text{Beta}(k,\, n-k+1)$

![[Media/Beta_distribution_pdf.svg|500]]

Full page: [[Beta]]

## Moment tables

Discrete:

| Distribution | Support | Mean | Variance | MGF |
|---|---|---|---|---|
| Bernoulli $(p)$ | $\{0,1\}$ | $p$ | $p(1-p)$ | $1-p+pe^t$ |
| Binomial $(n,p)$ | $0,\ldots,n$ | $np$ | $np(1-p)$ | $(1-p+pe^t)^n$ |
| Poisson $(\lambda)$ | $0,1,2,\ldots$ | $\lambda$ | $\lambda$ | $e^{\lambda(e^t-1)}$ |
| Geometric $(p)$, trials | $1,2,\ldots$ | $1/p$ | $(1-p)/p^2$ | $pe^t/[1-(1-p)e^t]$ |
| Neg. binomial $(r,p)$, trials | $r,r+1,\ldots$ | $r/p$ | $r(1-p)/p^2$ | $\left(pe^t/[1-(1-p)e^t]\right)^r$ |
| Hypergeometric $(N,K,n)$ | $\max(0,n{+}K{-}N),\ldots,\min(n,K)$ | $nK/N$ | $\dfrac{nK(N-K)(N-n)}{N^2(N-1)}$ | not elementary |
| Discrete uniform $(n)$ | $1,\ldots,n$ | $(n+1)/2$ | $(n^2-1)/12$ | $\dfrac{e^t(1-e^{nt})}{n(1-e^t)}$ |

Continuous:

| Distribution | Support | Mean | Variance | MGF |
|---|---|---|---|---|
| Uniform $(a,b)$ | $(a,b)$ | $(a+b)/2$ | $(b-a)^2/12$ | $\dfrac{e^{tb}-e^{ta}}{t(b-a)}$ |
| Exponential $(\theta)$ | $(0,\infty)$ | $\theta$ | $\theta^2$ | $(1-\theta t)^{-1}$ |
| Gamma $(\alpha,\theta)$ | $(0,\infty)$ | $\alpha\theta$ | $\alpha\theta^2$ | $(1-\theta t)^{-\alpha}$ |
| Chi-squared $(k)$ | $(0,\infty)$ | $k$ | $2k$ | $(1-2t)^{-k/2}$ |
| Normal $(\mu,\sigma^2)$ | $\mathbb{R}$ | $\mu$ | $\sigma^2$ | $e^{\mu t + \sigma^2t^2/2}$ |
| Lognormal $(\mu,\sigma^2)$ | $(0,\infty)$ | $e^{\mu+\sigma^2/2}$ | $e^{2\mu+\sigma^2}(e^{\sigma^2}-1)$ | does not exist |
| Beta $(\alpha,\beta)$ | $(0,1)$ | $\dfrac{\alpha}{\alpha+\beta}$ | $\dfrac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}$ | not elementary |

The exponential and gamma MGFs require $t < 1/\theta$; the geometric and negative binomial require $(1-p)e^t < 1$.

## How they relate

**Special cases** — one distribution *is* another at particular parameters:

- $\text{Bin}(1, p) = \text{Bernoulli}(p)$
- $\text{NegBin}(1, p) = \text{Geom}(p)$
- $\text{Gamma}(1, \theta) = \text{Exp}(\theta)$
- $\text{Gamma}(k/2, 2) = \chi^2_k$
- $\text{Beta}(1, 1) = \text{Unif}(0, 1)$

**Sums of independent variables** — the closure properties worth memorising, because they turn a convolution into a parameter addition:

| Sum | Result | Condition |
|---|---|---|
| $\text{Bin}(n_1,p) + \text{Bin}(n_2,p)$ | $\text{Bin}(n_1+n_2,\, p)$ | same $p$ |
| $\text{Poi}(\lambda_1) + \text{Poi}(\lambda_2)$ | $\text{Poi}(\lambda_1+\lambda_2)$ | — |
| $r$ i.i.d. $\text{Geom}(p)$ | $\text{NegBin}(r,\, p)$ | same $p$ |
| $\text{NegBin}(r_1,p) + \text{NegBin}(r_2,p)$ | $\text{NegBin}(r_1+r_2,\, p)$ | same $p$ |
| $n$ i.i.d. $\text{Exp}(\theta)$ | $\text{Gamma}(n,\, \theta)$ | same scale |
| $\text{Gamma}(\alpha_1,\theta) + \text{Gamma}(\alpha_2,\theta)$ | $\text{Gamma}(\alpha_1+\alpha_2,\, \theta)$ | same scale |
| $\sum c_i N(\mu_i, \sigma_i^2)$ | $N\!\left(\sum c_i\mu_i,\ \sum c_i^2\sigma_i^2\right)$ | exact, any $c_i$ |
| $k$ i.i.d. $N(0,1)$ squared | $\chi^2_k$ | — |

Note what is *not* on the list: hypergeometrics do not add, lognormals do not add (their **products** are lognormal), and binomials with different $p$ do not add.

**Limits and approximations:**

- $\text{Bin}(n,p) \to \text{Poi}(\lambda)$ as $n \to \infty$, $p \to 0$ with $np = \lambda$ fixed — many trials, each rarely succeeding
- $\text{Hypergeometric}(N,K,n) \to \text{Bin}(n, K/N)$ as $N \to \infty$ — a large population makes replacement irrelevant
- $\text{Bin}(n,p) \to$ normal for large $n$ with $np$ and $n(1-p)$ both large, with the continuity correction
- $\text{Poi}(\lambda) \to$ normal for large $\lambda$; $\text{Gamma}(\alpha,\theta) \to$ normal for large $\alpha$
- Anything summed enough times → normal, by the [[Central Limit Theorem]]

**Mixtures and processes:**

- A Poisson whose rate is gamma-distributed is exactly **negative binomial** — the standard justification for using it on heterogeneous claim counts
- In a [[Poisson Process|Poisson process]] with rate $\lambda$: counts in an interval of length $t$ are $\text{Poi}(\lambda t)$, waiting time to the next event is $\text{Exp}(1/\lambda)$, and waiting time to the $r$-th is $\text{Gamma}(r,\, 1/\lambda)$. Counts and waiting times are two views of one process

**Transformations** (see [[Transformations of Random Variables]]):

- $X \sim N(\mu,\sigma^2) \implies e^X \sim \text{Lognormal}(\mu,\sigma^2)$, and conversely $\ln X \sim N$
- $U \sim \text{Unif}(0,1) \implies F^{-1}(U)$ has CDF $F$; for the exponential this gives $-\theta\ln U$
- $\min(X_1,\ldots,X_n)$ of independent exponentials is exponential with the **rates added**
- $cX$ for $X \sim \text{Gamma}(\alpha,\theta)$ is $\text{Gamma}(\alpha, c\theta)$ — scale families rescale, shapes do not move

## Parameterization traps

> [!warning] Check the convention before substituting
> - **Exponential and gamma: scale or rate?** This page uses the scale $\theta$, so $E[X] = \theta$ and $E[X] = \alpha\theta$. Texts that use the rate write $\lambda = 1/\theta$ and $E[X] = 1/\lambda$, $\alpha/\beta$. Every mean and variance inverts.
> - **Geometric and negative binomial: trials or failures?** Counting trials gives $E[X] = 1/p$ and $r/p$ with support starting at $1$ and $r$. Counting failures shifts both down by $1$ and $r$. The variance is unchanged either way, so a mismatch shows up only in the mean — and in every answer.
> - **Normal: variance or standard deviation?** $N(\mu, \sigma^2)$ names the variance. $N(100, 25)$ has standard deviation $5$, not $25$.
> - **Lognormal: whose mean?** $\mu$ and $\sigma$ describe $\ln X$. The mean of $X$ is $e^{\mu+\sigma^2/2}$, always larger than the median $e^{\mu}$.
> - **Hypergeometric: which letter is which?** $N$ is the population, $K$ the successes in it, $n$ the sample. Swapping $K$ and $n$ leaves the mean $nK/N$ unchanged, which is exactly why the error survives to the variance.

## Related pages

- [[Discrete Univariate Distributions]] · [[Continuous Univariate Distributions]] · [[Multivariate Distribution]]
- [[Probability Mass Function (PMF)]] · [[Probability Density Function (PDF)]] · [[Cumulative Distribution Function (CDF)]]
- [[Expected Value]] · [[Variance and Standard Deviation]] · [[Percentile]]
- [[Central Limit Theorem]] · [[Transformations of Random Variables]] · [[Order Statistics]] · [[Linear Combinations of Random Variables]]
- [[Hazard Rate]] · [[Survival Model]] · [[Limited Expected Value]] · [[Deductible]]
- [[Poisson Process]] · [[Sampling Distribution]]
