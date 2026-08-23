---
Title: "Probability Distributions — Reference Sheet"
Author: Actuarial Notes
Type: Reference Sheet
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9a8e143187cdccc4723ca08460a70f4fa0587758b339b271785059755b88a877
  sources: []
  open_findings: 0
  log: .verify/Resources/Books/Probability Distributions Reference.md
---
![[Probability Distributions Reference - Cover.svg]]

Every named distribution on the [[Exam P-1 (SOA)|Exam P]] syllabus, one card each. Tap a card to open its live plot — drag the parameters, switch between PMF/PDF and CDF, and draw Monte-Carlo samples to watch the shape the formula produces. The density, moments, MGF and the notes that matter sit underneath the plot.

## Discrete

> [!example]- Binomial Distribution {n, p}
> Successes in a **fixed** number of independent trials, each with the same success probability.
>
> ![[Media/Binomial_distribution_pmf.svg|500]]
>
> > $$P(X = k) = \binom{n}{k}p^k(1-p)^{n-k}, \quad k = 0, 1, \ldots, n$$
> >
> > $$E[X] = np, \qquad \text{Var}(X) = np(1-p)$$
> >
> > $$M_X(t) = \left(1 - p + pe^t\right)^n$$
>
> - Requires **independent** trials, exactly two outcomes, and a **constant** $p$ — a question that breaks any of the three is pointing at another distribution
> - $\text{Var}(X) < E[X]$ always, so binomial counts are **underdispersed** relative to Poisson
> - For "at least one", use the complement $1 - (1-p)^n$ rather than summing the tail
> - At $n = 1$ this is the **Bernoulli** distribution, with mean $p$ and variance $p(1-p)$ — every other count model on this page is built out of it
>
> [[Binomial Distribution|Open the full concept page →]]

> [!example]- Poisson Distribution {λ}
> Events over an interval of time or space, arriving independently at a constant average rate.
>
> ![[Media/Poisson_pmf.svg|500]]
>
> > $$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}, \quad k = 0, 1, 2, \ldots$$
> >
> > $$E[X] = \text{Var}(X) = \lambda$$
> >
> > $$M_X(t) = \exp\!\left(\lambda(e^t - 1)\right)$$
>
> - The **mean equals the variance** — the fingerprint that identifies it, and the check that tells you a portfolio is overdispersed when the data disagree
> - Rates scale with the interval: counts over $t$ units are $\text{Poi}(\lambda t)$
> - The standard claim-count model, and the counting side of the [[Poisson Process]]
> - Independent Poissons add: $\text{Poi}(\lambda_1) + \text{Poi}(\lambda_2) = \text{Poi}(\lambda_1 + \lambda_2)$
>
> [[Poisson Distribution|Open the full concept page →]]

> [!example]- Geometric Distribution {p}
> Trials until the **first** success, with the trial count not fixed in advance.
>
> ![[Media/Geometric_pmf.svg|500]]
>
> > $$P(X = k) = (1-p)^{k-1}p, \quad k = 1, 2, 3, \ldots$$
> >
> > $$E[X] = \frac{1}{p}, \qquad \text{Var}(X) = \frac{1-p}{p^2}$$
> >
> > $$M_X(t) = \frac{pe^t}{1 - (1-p)e^t}$$
>
> - **Memoryless**: $P(X > m+n \mid X > m) = P(X > n)$ — the discrete counterpart of the exponential
> - Work from the survival function $P(X > n) = (1-p)^n$ ("the first $n$ trials all failed") instead of summing the PMF
> - The other parameterization counts *failures* $Y = X - 1$, with $E[Y] = (1-p)/p$ and the same variance
>
> [[Geometric Distribution|Open the full concept page →]]

> [!example]- Negative Binomial Distribution {r, p}
> Trials until the $r$-th success. Reduces to the geometric at $r = 1$.
>
> ![[Media/Negative_binomial_pmf.svg|500]]
>
> > $$P(X = k) = \binom{k-1}{r-1}p^r(1-p)^{k-r}, \quad k = r, r+1, \ldots$$
> >
> > $$E[X] = \frac{r}{p}, \qquad \text{Var}(X) = \frac{r(1-p)}{p^2}$$
> >
> > $$M_X(t) = \left(\frac{pe^t}{1 - (1-p)e^t}\right)^{r}$$
>
> - $\text{Var}(X) > E[X]$ always, making it the standard **overdispersed** alternative to the Poisson for a heterogeneous portfolio
> - It *is* a Poisson whose rate is itself random: a gamma-mixed Poisson is exactly negative binomial
> - Same trials-versus-failures fork as the geometric, with the two means differing by $r$
>
> [[Negative Binomial Distribution|Open the full concept page →]]

> [!example]- Hypergeometric Distribution {N, K, n}
> Successes in $n$ draws taken **without replacement** from a finite population.
>
> ![[Media/Hypergeometric_pmf.svg|500]]
>
> > $$P(X = k) = \frac{\dbinom{K}{k}\dbinom{N-K}{n-k}}{\dbinom{N}{n}}$$
> >
> > $$E[X] = \frac{nK}{N}, \qquad \text{Var}(X) = \frac{nK(N-K)(N-n)}{N^2(N-1)}$$
>
> - The mean matches a binomial with $p = K/N$; the variance is smaller by the **finite population correction** $\frac{N-n}{N-1}$
> - Trials are *not* independent — drawing one success lowers the chance of the next
> - No elementary MGF; answer from the PMF directly
> - As $N$ grows with $K/N$ fixed it converges to $\text{Bin}(n, K/N)$ — a large population makes replacement irrelevant
>
> [[Hypergeometric Distribution|Open the full concept page →]]

> [!example]- Discrete Uniform Distribution {n}
> One of $n$ equally likely outcomes — a fair die, a randomly chosen policy.
>
> ![[Media/Figures/Uniform_Discrete.svg|520]]
>
> > $$P(X = k) = \frac{1}{n}, \quad k = 1, 2, \ldots, n$$
> >
> > $$E[X] = \frac{n+1}{2}, \qquad \text{Var}(X) = \frac{n^2 - 1}{12}$$
>
> - Both moments follow from the sum formulas $\sum k = n(n+1)/2$ and $\sum k^2 = n(n+1)(2n+1)/6$
> - Shifting the support to $\{a, \ldots, b\}$ shifts the mean to $(a+b)/2$ and leaves the variance a function of the count alone
>
> [[Uniform Discrete|Open the full concept page →]]

## Continuous

> [!example]- Continuous Uniform Distribution {a, b}
> Equally likely anywhere in a range, with no point favoured over another.
>
> ![[Media/Figures/Uniform_Continuous_Distribution.svg|520]]
>
> > $$f(x) = \frac{1}{b-a}, \quad a < x < b$$
> >
> > $$E[X] = \frac{a+b}{2}, \qquad \text{Var}(X) = \frac{(b-a)^2}{12}$$
> >
> > $$F(x) = \frac{x-a}{b-a}$$
>
> - Conditioning on a sub-interval leaves it uniform on that sub-interval — the property that collapses most deductible questions to geometry
> - $F^{-1}(U)$ for $U \sim \text{Unif}(0,1)$ generates a draw from *any* distribution (inverse transform)
>
> [[Uniform Continuous Distribution|Open the full concept page →]]

> [!example]- Exponential Distribution {θ}
> Waiting time to the next event, or a memoryless loss size. Here $\theta$ is the **mean (scale)**, not a rate.
>
> ![[Media/Exponential_pdf.svg|500]]
>
> > $$f(x) = \frac{1}{\theta}e^{-x/\theta}, \quad x > 0$$
> >
> > $$E[X] = \theta, \qquad \text{Var}(X) = \theta^2, \qquad S(x) = e^{-x/\theta}$$
> >
> > $$M_X(t) = \frac{1}{1 - \theta t}, \quad t < 1/\theta$$
>
> - **Memoryless**: given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$. So $E[X \mid X > d] = d + \theta$ and $E[(X-d)_+] = \theta e^{-d/\theta}$ — the two identities most [[Deductible|deductible]] questions reduce to
> - Constant [[Hazard Rate|hazard rate]] $1/\theta$: no aging
> - Work from $S(x)$, not $F(x)$ — nearly every exponential question is a tail probability
>
> [[Exponential Distribution|Open the full concept page →]]

> [!example]- Gamma Distribution {α, θ}
> Waiting time to the $\alpha$-th event, and the workhorse skewed severity model. Shape $\alpha$, **scale** $\theta$.
>
> ![[Media/Gamma_distribution_pdf.svg|500]]
>
> > $$f(x) = \frac{x^{\alpha-1}e^{-x/\theta}}{\theta^{\alpha}\Gamma(\alpha)}, \quad x > 0$$
> >
> > $$E[X] = \alpha\theta, \qquad \text{Var}(X) = \alpha\theta^2$$
> >
> > $$M_X(t) = (1 - \theta t)^{-\alpha}, \quad t < 1/\theta$$
>
> - Coefficient of variation $1/\sqrt{\alpha}$ — a larger shape means a tighter, more symmetric curve
> - For **integer** $\alpha$ the survival function is a Poisson sum: $P(X > x) = \sum_{k=0}^{\alpha-1}\frac{e^{-x/\theta}(x/\theta)^k}{k!}$
> - Special cases: exponential at $\alpha = 1$, chi-squared at $\alpha = n/2,\ \theta = 2$
>
> [[Gamma|Open the full concept page →]]

> [!example]- Normal Distribution {μ, σ²}
> Sums and averages of many independent pieces. The second parameter is the **variance**.
>
> ![[Media/Normal_distribution_pdf.svg|500]]
>
> > $$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right), \quad x \in \mathbb{R}$$
> >
> > $$E[X] = \mu, \qquad \text{Var}(X) = \sigma^2$$
> >
> > $$M_X(t) = \exp\!\left(\mu t + \tfrac{1}{2}\sigma^2 t^2\right)$$
>
> - No closed-form CDF: standardize to $Z = (X-\mu)/\sigma$ and read $\Phi$, using $\Phi(-z) = 1 - \Phi(z)$ for negative arguments
> - **Any linear combination of independent normals is exactly normal** — no [[Central Limit Theorem|CLT]] needed. See [[Probabilities for Linear Combinations]]
> - Useful percentiles: $z_{0.90} = 1.282$, $z_{0.95} = 1.645$, $z_{0.975} = 1.960$, $z_{0.99} = 2.326$
> - Approximating a discrete count needs the continuity correction $P(X \le k) \approx \Phi\!\left(\frac{k + 0.5 - \mu}{\sigma}\right)$
>
> [[Normal Distribution|Open the full concept page →]]

> [!example]- Lognormal Distribution {μ, σ²}
> A positive, right-skewed quantity whose **logarithm** is normal. The parameters live on the log scale.
>
> ![[Media/Lognormal_distribution_pdf.svg|500]]
>
> > $$f(x) = \frac{1}{x\sigma\sqrt{2\pi}}\exp\!\left(-\frac{(\ln x - \mu)^2}{2\sigma^2}\right), \quad x > 0$$
> >
> > $$E[X] = e^{\mu + \sigma^2/2}, \qquad \text{Var}(X) = e^{2\mu + \sigma^2}\left(e^{\sigma^2} - 1\right)$$
> >
> > $$F(x) = \Phi\!\left(\frac{\ln x - \mu}{\sigma}\right)$$
>
> - Every probability question becomes a normal question after taking logs
> - The median is $e^{\mu}$, strictly below the mean — the gap *is* the right skew
> - The MGF does not exist for $t > 0$; moments come from $E[X^k] = e^{k\mu + k^2\sigma^2/2}$ instead
>
> [[Lognormal Distribution|Open the full concept page →]]

> [!example]- Beta Distribution {α, β}
> Rates, proportions and probabilities — anything confined to $(0, 1)$.
>
> ![[Media/Beta_distribution_pdf.svg|500]]
>
> > $$f(x) = \frac{x^{\alpha-1}(1-x)^{\beta-1}}{B(\alpha, \beta)}, \quad 0 < x < 1$$
> >
> > $$B(\alpha,\beta) = \frac{\Gamma(\alpha)\Gamma(\beta)}{\Gamma(\alpha+\beta)}$$
> >
> > $$E[X] = \frac{\alpha}{\alpha+\beta}, \qquad \text{Var}(X) = \frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}$$
>
> - Skewed right when $\alpha < \beta$, left when $\alpha > \beta$, symmetric when $\alpha = \beta$; uniform at $\alpha = \beta = 1$
> - For integer parameters the density is a plain polynomial and integrates directly — no special functions needed
> - The $k$-th [[Order Statistics|order statistic]] of $n$ i.i.d. uniforms is exactly $\text{Beta}(k,\, n-k+1)$
>
> [[Beta|Open the full concept page →]]

## Reference

> [!example]- Which distribution is this question describing?
> Most distribution questions are identification problems, not calculation problems. Read for **what is being counted or measured** and **whether the number of trials is fixed**.
>
> **Counting things**
>
> - Successes in a **fixed** number of independent trials → binomial $(n, p)$
> - Successes in a fixed number of draws **without replacement** → hypergeometric $(N, K, n)$
> - Trials **until** the first success → geometric $(p)$
> - Trials **until** the $r$-th success → negative binomial $(r, p)$
> - Events over an interval of time or space, no trial count at all → Poisson $(\lambda)$
> - One of $n$ equally likely outcomes → discrete uniform
>
> **Measuring things**
>
> - Equally likely anywhere in a range → uniform $(a, b)$
> - Waiting time to the next event, or a memoryless loss → exponential $(\theta)$
> - Waiting time to the $r$-th event, or a skewed severity → gamma $(\alpha, \theta)$
> - Sums and averages of many independent pieces → normal $(\mu, \sigma^2)$
> - A positive, right-skewed quantity whose log is normal → lognormal $(\mu, \sigma^2)$
> - A rate or proportion in $(0,1)$ → beta $(\alpha, \beta)$
>
> **Three fast discriminators**
>
> - **Variance-to-mean ratio.** Below 1 → binomial. Exactly 1 → Poisson. Above 1 → negative binomial. This single check settles most count-model questions.
> - **Replacement.** With replacement is binomial; without is hypergeometric. When the population is large relative to the sample the two nearly agree and the binomial is the intended shortcut.
> - **Fixed trials?** "In 10 policies…" is binomial or hypergeometric. "Until the third claim…" is geometric or negative binomial. "Per month…" is Poisson.
>
> Background: [[Discrete Univariate Distributions]] and [[Continuous Univariate Distributions]].

> [!example]- Moments and MGFs at a glance
> Everything above in one lookup, for when you only need the number.
>
> **Discrete**
>
> | Distribution | Support | Mean | Variance | MGF |
> |---|---|---|---|---|
> | Bernoulli $(p)$ | $\{0,1\}$ | $p$ | $p(1-p)$ | $1-p+pe^t$ |
> | Binomial $(n,p)$ | $0,\ldots,n$ | $np$ | $np(1-p)$ | $(1-p+pe^t)^n$ |
> | Poisson $(\lambda)$ | $0,1,2,\ldots$ | $\lambda$ | $\lambda$ | $e^{\lambda(e^t-1)}$ |
> | Geometric $(p)$, trials | $1,2,\ldots$ | $1/p$ | $(1-p)/p^2$ | $pe^t/[1-(1-p)e^t]$ |
> | Neg. binomial $(r,p)$, trials | $r,r+1,\ldots$ | $r/p$ | $r(1-p)/p^2$ | $\left(pe^t/[1-(1-p)e^t]\right)^r$ |
> | Hypergeometric $(N,K,n)$ | $\max(0,n{+}K{-}N),\ldots,\min(n,K)$ | $nK/N$ | $\dfrac{nK(N-K)(N-n)}{N^2(N-1)}$ | not elementary |
> | Discrete uniform $(n)$ | $1,\ldots,n$ | $(n+1)/2$ | $(n^2-1)/12$ | $\dfrac{e^t(1-e^{nt})}{n(1-e^t)}$ |
>
> **Continuous**
>
> | Distribution | Support | Mean | Variance | MGF |
> |---|---|---|---|---|
> | Uniform $(a,b)$ | $(a,b)$ | $(a+b)/2$ | $(b-a)^2/12$ | $\dfrac{e^{tb}-e^{ta}}{t(b-a)}$ |
> | Exponential $(\theta)$ | $(0,\infty)$ | $\theta$ | $\theta^2$ | $(1-\theta t)^{-1}$ |
> | Gamma $(\alpha,\theta)$ | $(0,\infty)$ | $\alpha\theta$ | $\alpha\theta^2$ | $(1-\theta t)^{-\alpha}$ |
> | Chi-squared $(k)$ | $(0,\infty)$ | $k$ | $2k$ | $(1-2t)^{-k/2}$ |
> | Normal $(\mu,\sigma^2)$ | $\mathbb{R}$ | $\mu$ | $\sigma^2$ | $e^{\mu t + \sigma^2t^2/2}$ |
> | Lognormal $(\mu,\sigma^2)$ | $(0,\infty)$ | $e^{\mu+\sigma^2/2}$ | $e^{2\mu+\sigma^2}(e^{\sigma^2}-1)$ | does not exist |
> | Beta $(\alpha,\beta)$ | $(0,1)$ | $\dfrac{\alpha}{\alpha+\beta}$ | $\dfrac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}$ | not elementary |
>
> The exponential and gamma MGFs require $t < 1/\theta$; the geometric and negative binomial require $(1-p)e^t < 1$.

> [!example]- How the distributions relate
> Half of these cards are the same distribution wearing a different parameter set.
>
> **Special cases**
>
> - $\text{Bin}(1, p) = \text{Bernoulli}(p)$
> - $\text{NegBin}(1, p) = \text{Geom}(p)$
> - $\text{Gamma}(1, \theta) = \text{Exp}(\theta)$
> - $\text{Gamma}(k/2, 2) = \chi^2_k$
> - $\text{Beta}(1, 1) = \text{Unif}(0, 1)$
>
> **Sums of independent variables** — the closure properties that turn a convolution into a parameter addition:
>
> | Sum | Result | Condition |
> |---|---|---|
> | $\text{Bin}(n_1,p) + \text{Bin}(n_2,p)$ | $\text{Bin}(n_1+n_2,\, p)$ | same $p$ |
> | $\text{Poi}(\lambda_1) + \text{Poi}(\lambda_2)$ | $\text{Poi}(\lambda_1+\lambda_2)$ | — |
> | $r$ i.i.d. $\text{Geom}(p)$ | $\text{NegBin}(r,\, p)$ | same $p$ |
> | $\text{NegBin}(r_1,p) + \text{NegBin}(r_2,p)$ | $\text{NegBin}(r_1+r_2,\, p)$ | same $p$ |
> | $n$ i.i.d. $\text{Exp}(\theta)$ | $\text{Gamma}(n,\, \theta)$ | same scale |
> | $\text{Gamma}(\alpha_1,\theta) + \text{Gamma}(\alpha_2,\theta)$ | $\text{Gamma}(\alpha_1+\alpha_2,\, \theta)$ | same scale |
> | $\sum c_i N(\mu_i, \sigma_i^2)$ | $N\!\left(\sum c_i\mu_i,\ \sum c_i^2\sigma_i^2\right)$ | exact, any $c_i$ |
> | $k$ i.i.d. $N(0,1)$ squared | $\chi^2_k$ | — |
>
> Note what is *not* there: hypergeometrics do not add, lognormals do not add (their **products** are lognormal), and binomials with different $p$ do not add.
>
> **Limits and approximations**
>
> - $\text{Bin}(n,p) \to \text{Poi}(\lambda)$ as $n \to \infty$, $p \to 0$ with $np = \lambda$ fixed
> - $\text{Hypergeometric}(N,K,n) \to \text{Bin}(n, K/N)$ as $N \to \infty$
> - $\text{Bin}(n,p) \to$ normal for large $n$ with $np$ and $n(1-p)$ both large, with the continuity correction
> - $\text{Poi}(\lambda) \to$ normal for large $\lambda$; $\text{Gamma}(\alpha,\theta) \to$ normal for large $\alpha$
> - Anything summed enough times → normal, by the [[Central Limit Theorem]]
>
> **Mixtures and processes**
>
> - A Poisson whose rate is gamma-distributed is exactly **negative binomial** — the standard justification for using it on heterogeneous claim counts
> - In a [[Poisson Process|Poisson process]] of rate $\lambda$: counts over an interval of length $t$ are $\text{Poi}(\lambda t)$, the wait to the next event is $\text{Exp}(1/\lambda)$, and the wait to the $r$-th is $\text{Gamma}(r,\, 1/\lambda)$. Counts and waiting times are two views of one process
>
> **Transformations** — see [[Transformations of Random Variables]]
>
> - $X \sim N(\mu,\sigma^2) \implies e^X \sim \text{Lognormal}(\mu,\sigma^2)$, and conversely $\ln X \sim N$
> - $U \sim \text{Unif}(0,1) \implies F^{-1}(U)$ has CDF $F$; for the exponential this is $-\theta\ln U$
> - $\min(X_1,\ldots,X_n)$ of independent exponentials is exponential with the **rates added**
> - $cX$ for $X \sim \text{Gamma}(\alpha,\theta)$ is $\text{Gamma}(\alpha, c\theta)$ — scale families rescale, shapes do not move

> [!example]- Parameterization traps
> These cost more marks than the algebra does. Check the convention before substituting.
>
> - **Exponential and gamma: scale or rate?** These cards use the scale $\theta$, so $E[X] = \theta$ and $E[X] = \alpha\theta$. Texts using the rate write $\lambda = 1/\theta$ and get $1/\lambda$ and $\alpha/\beta$. Every mean and variance inverts.
> - **Geometric and negative binomial: trials or failures?** Counting trials gives $E[X] = 1/p$ and $r/p$, with support starting at $1$ and $r$. Counting failures shifts both down by $1$ and $r$. The variance is identical either way, so a mismatch shows up only in the mean — and in every answer after it.
> - **Normal: variance or standard deviation?** $N(\mu, \sigma^2)$ names the variance. $N(100, 25)$ has standard deviation $5$, not $25$.
> - **Lognormal: whose mean?** $\mu$ and $\sigma$ describe $\ln X$, not $X$. The mean of $X$ is $e^{\mu+\sigma^2/2}$, always above the median $e^{\mu}$.
> - **Hypergeometric: which letter is which?** $N$ is the population, $K$ the successes in it, $n$ the sample. Swapping $K$ and $n$ leaves the mean $nK/N$ unchanged, which is exactly why the error survives long enough to wreck the variance.
> - **Variance of a difference.** $\text{Var}(X - Y) = \text{Var}(X) + \text{Var}(Y)$ for independent $X, Y$. Variances add for a difference too — a difference is *more* variable than either component, never less.

## Related pages

- [[Discrete Univariate Distributions]] · [[Continuous Univariate Distributions]] · [[Multivariate Distribution]]
- [[Probability Mass Function (PMF)]] · [[Probability Density Function (PDF)]] · [[Cumulative Distribution Function (CDF)]]
- [[Expected Value]] · [[Variance and Standard Deviation]] · [[Percentile]]
- [[Central Limit Theorem]] · [[Transformations of Random Variables]] · [[Order Statistics]] · [[Linear Combinations of Random Variables]]
- [[Hazard Rate]] · [[Survival Model]] · [[Limited Expected Value]] · [[Deductible]]
- [[Poisson Process]] · [[Sampling Distribution]]
