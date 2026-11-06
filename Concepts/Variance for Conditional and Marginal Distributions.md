---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:123a524cde1aeaaccc60f436e21c522548d9cf585e8737dd8a0f787c85e5612d
  sources:
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.1.5 law of iterated expectations (5.7), E[g(X)h(Y)] = E[g(X)]E[h(Y)] for independent, conditional variance, law of total variance (5.10), Var(X) >= E[Var(X|Y)] (5.11), random-sum example (5.12), sha256:1bda829553c761a1ee71ba3210a6510e4780b5bcba0513325b5180b3d4100d82 — https://www.probabilitycourse.com/chapter5/5_1_5_conditional_expectation.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.7 Conditional Expected Value: var(Y)=E[var(Y|X)]+var[E(Y|X)]; uniform var(Y|X)=l^2(X)/12, sha256:23e328f9ee55e32522905aba62841f2920eef0d32fb68d7fbb1f4e0b0eaf62f6 — https://www.randomservices.org/random/expect/Conditional.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 14.4 The Poisson Distribution: E(N)=var(N); sum of independent Poisson(a), Poisson(b) is Poisson(a+b), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "SOA Exam P Sample Solutions, Q80 (PDF p.24), Q301 (PDF p.82), Q388 (PDF p.107), sha256:e10d2649bdf708541f87849c85ef6cde195019cfc8a46ee9647f6733d74d04b2 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Variance for Conditional and Marginal Distributions.md
---

The **Variance for Conditional and Marginal Distributions** measures spread at two levels. The marginal variance $\text{Var}(Y)$ describes the spread of $Y$ across the whole population, while the conditional variance $\text{Var}(Y \mid X = x)$ describes the spread of $Y$ within the subpopulation where $X = x$. The **law of total variance** ties the two together.

> $$\text{Var}(Y \mid X = x) = E[Y^2 \mid X = x] - \big(E[Y \mid X = x]\big)^2$$

> $$E[Y] = E\big[E[Y \mid X]\big]$$

> $$\text{Var}(Y) = E\big[\text{Var}(Y \mid X)\big] + \text{Var}\big(E[Y \mid X]\big)$$

- The second identity is the **law of total expectation**, also called double expectation. The third is the law of total variance.
- $E[Y \mid X = x]$ is a number. $E[Y \mid X]$ is a random variable, a function of $X$. The outer $E$ and $\text{Var}$ average over the distribution of $X$.
- Both pieces are non-negative, so $E[\text{Var}(Y \mid X)] \le \text{Var}(Y)$. On average, knowing $X$ can only reduce the spread.
- Conditional distributions come from the [[Conditional Probability Function]] or, for continuous variables, the [[Joint Probability Density Function]]. See also [[Moments for Joint Distributions]].

> [!idea] The idea
> Total spread has two sources. Outcomes scatter within each group, and the groups' own means differ from one another. The law of total variance adds the average within-group variance to the variance of the group means, so ignoring either source understates the risk.

![[Media/Figures/Variance_for_Conditional_and_Marginal_Distributions.svg|340]]

## Spread within each group

A policyholder holds an auto policy and a home policy. Let $X$ be the number of auto claims in a year and $Y$ the number of home claims.

| $X$ \ $Y$ | 0 | 1 | 2 | Total |
|---|---|---|---|---|
| 0 | 0.36 | 0.18 | 0.06 | 0.60 |
| 1 | 0.10 | 0.20 | 0.10 | 0.40 |
| Total | 0.46 | 0.38 | 0.16 | 1 |

How variable are home claims for a policyholder with one auto claim? Keep the $X = 1$ row and divide by its total, 0.40. The conditional probabilities are 0.25, 0.50 and 0.25.

> $$E[Y \mid X = 1] = 0(0.25) + 1(0.50) + 2(0.25) = 1.0$$

> $$\text{Var}(Y \mid X = 1) = 0.50 + 4(0.25) - 1.0^2 = 0.50$$

The $X = 0$ row, divided by 0.60, gives probabilities 0.6, 0.3 and 0.1. Its conditional mean is 0.5 and its conditional variance is $0.7 - 0.25 = 0.45$.

## Putting the groups back together

The two groups have different means and different variances.

| $x$ | $P(X = x)$ | $E[Y \mid x]$ | $\text{Var}(Y \mid x)$ |
|---|---|---|---|
| 0 | 0.60 | 0.5 | 0.45 |
| 1 | 0.40 | 1.0 | 0.50 |

The law of total expectation averages the conditional means: $E[Y] = 0.6(0.5) + 0.4(1.0) = 0.70$. The variance needs two pieces.

- Within groups: $E[\text{Var}(Y \mid X)] = 0.6(0.45) + 0.4(0.50) = 0.47$.
- Between groups: the conditional means 0.5 and 1.0 have variance $0.6(0.25) + 0.4(1.0) - 0.70^2 = 0.06$.

Together they give $\text{Var}(Y) = 0.47 + 0.06 = 0.53$. The marginal column totals give the same answer directly: $1.02 - 0.49 = 0.53$.

> [!trap] Stopping at one piece
> $\text{Var}(E[Y \mid X]) = 0.06$ is only the spread of the group means. $E[\text{Var}(Y \mid X)] = 0.47$ is only the average spread inside the groups. The marginal variance is their sum, 0.53.

## When the group is a risk parameter

The same split works when the conditioning variable is a risk level that varies across a portfolio. If a policyholder's claim count $N$ is [[Poisson Distribution|Poisson]] with mean $\Lambda$, then $E[N \mid \Lambda] = \Lambda$ and $\text{Var}(N \mid \Lambda) = \Lambda$.

> $$\text{Var}(N) = E[\Lambda] + \text{Var}(\Lambda)$$

- The variance exceeds the mean whenever $\Lambda$ varies. Mixing Poisson risks makes the portfolio's counts overdispersed.
- The risk parameter may take a few values, as in policy types, or have a density. Either way the two pieces are the same. See [[Mixture Distribution]].

## A random number of claims

An aggregate loss $S = X_1 + \cdots + X_N$ adds a random number $N$ of i.i.d. claim sizes with mean $\mu$ and variance $\sigma^2$, independent of $N$. Conditioning on $N$ gives $E[S \mid N] = N\mu$ and $\text{Var}(S \mid N) = N\sigma^2$.

> $$E[S] = E[N]\,\mu$$

> $$\text{Var}(S) = E[N]\,\sigma^2 + \text{Var}(N)\,\mu^2$$

The first term is the claim-size spread averaged over $N$. The second is the spread caused by not knowing how many claims arrive. For a Poisson $N$ with mean $\lambda$, $\text{Var}(S) = \lambda\,E[X^2]$. See [[Aggregate Loss Model]] and [[Compound Poisson Process]].

## Try it

> [!example]- Variance of claims given policy type {Example}
> The joint probabilities of claims $X$ and policy type $Y$ are $p(0, 1) = 0.3$, $p(1, 1) = 0.2$, $p(0, 2) = 0.1$ and $p(1, 2) = 0.4$. Find $\text{Var}(X \mid Y = 2)$.
>
> > [!answer]-
> > **Plan:** keep the $Y = 2$ cells, rescale by $P(Y = 2) = 0.5$, then use the conditional moments.
> > The conditional probabilities are $0.1/0.5 = 0.2$ for $X = 0$ and $0.4/0.5 = 0.8$ for $X = 1$.
> > $$
> > \begin{align*}
> > E[X \mid Y = 2] &= 0.8 \\
> > E[X^2 \mid Y = 2] &= 0.8 \\
> > \text{Var}(X \mid Y = 2) &= 0.8 - 0.8^2 \\
> > &= 0.16
> > \end{align*}
> > $$

> [!example]- Two policy types {Example}
> 70% of policies are Type A and 30% are Type B. Annual claim counts are Poisson with mean 1 for Type A and mean 3 for Type B. Find the variance of the claim count of a randomly selected policy.
>
> > [!answer]-
> > **Plan:** the Poisson mean $\Lambda$ is 1 or 3, so $\text{Var}(N) = E[\Lambda] + \text{Var}(\Lambda)$.
> > $$
> > \begin{align*}
> > E[\Lambda] &= 0.7(1) + 0.3(3) \\
> > &= 1.6 \\
> > \text{Var}(\Lambda) &= 0.7(1) + 0.3(9) - 1.6^2 \\
> > &= 0.84 \\
> > \text{Var}(N) &= 1.6 + 0.84 \\
> > &= 2.44
> > \end{align*}
> > $$
> > Why more than 1.6? Each type is Poisson, but the mixture adds the spread between the two types' means.

> [!example]- Aggregate claims {Example}
> The number of claims $N$ is Poisson with mean 3. Claim sizes are exponential with mean 100, independent of each other and of $N$. Find the standard deviation of aggregate claims $S$.
>
> > [!answer]-
> > **Plan:** use the compound variance, with $\mu = 100$ and $\sigma^2 = 100^2$.
> > $$
> > \begin{align*}
> > \text{Var}(S) &= E[N]\,\sigma^2 + \text{Var}(N)\,\mu^2 \\
> > &= 3(10{,}000) + 3(10{,}000) \\
> > &= 60{,}000
> > \end{align*}
> > $$
> > So $\text{SD}(S) = \sqrt{60{,}000} \approx 244.9$.

> [!example]- Both pieces matter {Example}
> A loss $X$ is uniform on $(0, Y)$, where $Y$ takes the values 10 and 20 with equal probability. Find $\text{Var}(X)$.
>
> > [!answer]-
> > **Plan:** given $Y$, the loss is uniform, so $E[X \mid Y] = Y/2$ and $\text{Var}(X \mid Y) = Y^2/12$. Then average each piece over $Y$, with $E[Y] = 15$ and $E[Y^2] = 250$.
> > $$
> > \begin{align*}
> > E\big[\text{Var}(X \mid Y)\big] &= \frac{E[Y^2]}{12} \\
> > &= \frac{250}{12} \\
> > &\approx 20.83 \\
> > \text{Var}\big(E[X \mid Y]\big) &= \frac{1}{4}\left(250 - 15^2\right) \\
> > &= 6.25
> > \end{align*}
> > $$
> > So $\text{Var}(X) \approx 20.83 + 6.25 = 27.08$. Reporting only the between-group 6.25 would understate the spread by a factor of more than four.

> [!warning]- Exam traps
> - **Stopping at $\text{Var}(E[Y \mid X])$.** That is only the between-group piece. Add $E[\text{Var}(Y \mid X)]$.
> - **Averaging the conditional variances alone.** That is only the within-group piece. Add the variance of the conditional means.
> - **Mixing up $E[Y \mid X = x]$ and $E[Y \mid X]$.** The first is a number. The second is a random variable whose variance is a piece of the law.
> - **Squaring the wrong mean in a compound sum.** The second term is $\text{Var}(N)\,\mu^2$, the variance of the count times the squared claim mean.
