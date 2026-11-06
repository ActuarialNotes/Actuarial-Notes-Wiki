---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:49adfb3763d1a906df533942dfef12efb8fbf7ed61ed71534fe47282dc05e56e
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL), Ex. 6.3.17(a)-(c) and 6.3.18(a)-(c) printed p.281 (PDF p.289); Def. 7.1 p.286 (PDF p.294); Thm 7.1 and sum of two exponentials (PDF pp.299-301); Examples 7.5-7.6 (PDF p.302); Thms 9.4 and 9.6 (PDF pp.351, 365); continuity correction (PDF p.340), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.3.1 Lemma 5.3 covariance properties incl. bilinearity; eq. 5.21 Var(aX+bY); correlation definition, -1<=rho<=1, rho=+-1 linear, rho(-X,Y)=-rho(X,Y), rho(aX+b,cY+d)=rho(X,Y) for a,c>0; independent implies uncorrelated, converse fails; pairwise uncorrelated sums, sha256:10ac40b763d78b0fa19a116594da71769bf417b59a1714be707c7c410991a7fb — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.3 Variance: var(a+bX)=b^2 var(X); indicator var(X)=p(1-p), sha256:f0c1c5b0b4846e96d07f956599d1a428069c9402f2481a9e9ab3d6ca123f02bf — https://www.randomservices.org/random/expect/Variance.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.5 Covariance and Correlation: Events (cov and cor of indicators), var(X+Y), var(X-Y), cor = +-1 iff linear with that slope sign, uniform X and Y = X^2 uncorrelated, sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "SOA Exam P Sample Solutions, Q80 (PDF p.24), Q301 (PDF p.82), Q388 (PDF p.107), sha256:e10d2649bdf708541f87849c85ef6cde195019cfc8a46ee9647f6733d74d04b2 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Linear Combinations of Random Variables.md
---

A **Linear Combination of Random Variables** is a weighted sum $L = c_1 X_1 + c_2 X_2 + \cdots + c_n X_n$ of [[Random Variable|random variables]] with constant weights $c_i$. A linear combination collapses several random quantities into one, such as an aggregate loss, a portfolio value or a sample mean.

> $$E[L] = \sum_{i=1}^{n} c_i\,E[X_i]$$

> $$\text{Var}(L) = \sum_{i=1}^{n} c_i^2\,\text{Var}(X_i) + 2\sum_{i < j} c_i c_j\,\text{Cov}(X_i, X_j)$$

- The mean formula needs no assumption at all. Expectation is always linear.
- The variance formula holds in general. Its [[Covariance]] terms drop out when the $X_i$ are pairwise uncorrelated, as [[Independent Random Variables|independent]] variables always are.
- Coefficients enter the variance squared, so a negative weight still adds variance.
- The details of the two formulas are on [[Moments for Linear Combinations]], and the distribution of $L$ is on [[Probabilities for Linear Combinations]].

> [!idea] The idea
> An average is a weighted sum, so the mean of $L$ is the same weighted sum of the means. Spread behaves differently. Each term's spread is scaled by its weight before squaring, and each pair of terms either reinforces or offsets the other through its covariance.

![[Media/Figures/Linear_Combinations_of_Random_Variables.svg|340]]

## Turning two policies into one payment

A policyholder holds an auto policy and a home policy. Let $X$ be the number of auto claims in a year and $Y$ the number of home claims.

| $X$ \ $Y$ | 0 | 1 | 2 | Total |
|---|---|---|---|---|
| 0 | 0.36 | 0.18 | 0.06 | 0.60 |
| 1 | 0.10 | 0.20 | 0.10 | 0.40 |
| Total | 0.46 | 0.38 | 0.16 | 1 |

From the table, $E[X] = 0.40$, $E[Y] = 0.70$, $\text{Var}(X) = 0.24$, $\text{Var}(Y) = 0.53$ and $\text{Cov}(X, Y) = 0.12$. Each auto claim costs 10 and each home claim costs 5, in thousands. The annual cost is the linear combination $L = 10X + 5Y$.

The expected cost needs only the means.

> $$E[L] = 10(0.40) + 5(0.70) = 7.5$$

## The variance: weights squared, pairs doubled

The variance has one term for each variable and one for the pair.

| Piece | Formula | Value |
|---|---|---|
| Auto | $10^2\,\text{Var}(X)$ | 24 |
| Home | $5^2\,\text{Var}(Y)$ | 13.25 |
| Pair | $2(10)(5)\,\text{Cov}(X, Y)$ | 12 |
| Total | | 49.25 |

The standard deviation of the annual cost is $\sqrt{49.25} \approx 7.02$.

> [!trap] Ignoring the dependence
> Treating the two policies as independent drops the pair term and gives 37.25. The claims tend to come together, so the true variance is larger.

## Sums and differences

The same two counts give the variance of the total claim count and of the difference between them. Only the sign of the pair term changes, because the weight $-1$ makes $2c_1c_2$ negative.

> $$\text{Var}(X + Y) = 0.24 + 0.53 + 2(0.12) = 1.01$$

> $$\text{Var}(Y - X) = 0.24 + 0.53 - 2(0.12) = 0.53$$

For independent variables, the two are equal: $\text{Var}(X - Y) = \text{Var}(X) + \text{Var}(Y)$. The difference of independent variables is more variable than either term, never less.

## A payment built from events

A payment that depends on which events occur is a linear combination of indicators. Write $I_A = 1$ if event $A$ occurs and 0 otherwise. Each indicator is Bernoulli.

> $$E[I_A] = P(A)$$

> $$\text{Var}(I_A) = P(A)\,[1 - P(A)]$$

Two indicators have covariance $P(A \cap B) - P(A)P(B)$. Suppose a rider pays 10 if there is an auto claim ($A$) and 4 if there is at least one home claim ($B$). From the table, $P(A) = 0.40$, $P(B) = 0.54$ and $P(A \cap B) = 0.30$.

- Mean: $10(0.40) + 4(0.54) = 6.16$.
- Variance: $100(0.24) + 16(0.2484) + 2(10)(4)(0.084) \approx 34.69$.

## Many policyholders: totals and averages

The insurer covers 100 policyholders like this one, independently of each other. The total cost $T = L_1 + \cdots + L_{100}$ is a linear combination with every weight equal to 1.

- $E[T] = 100(7.5) = 750$.
- $\text{Var}(T) = 100(49.25) = 4{,}925$, because independent policyholders have no covariance terms.

The average cost $\bar{L} = T/100$ has every weight equal to $1/100$. Its mean stays 7.5 and its variance falls to $49.25/100 = 0.4925$. In general, for $n$ i.i.d. terms with variance $\sigma^2$, the [[Sample Mean|sample mean]] has variance $\sigma^2/n$.

> [!trap] $n$ copies versus $n$ draws
> $100L$ is one policyholder's cost scaled up, with variance $100^2(49.25)$. The sum of 100 independent costs has variance $100(49.25)$. Pooling independent risks is what makes the total relatively less volatile.

## The distribution of a combination

The mean and variance don't fix the distribution of $L$. Two facts often do.

- A linear combination of independent [[Normal Distribution|normal]] variables is exactly normal.
- A sum or mean of many i.i.d. terms with finite variance is approximately normal by the [[Central Limit Theorem]].

[[Probabilities for Linear Combinations]] uses both to find probabilities such as $P(T > 850)$.

## Try it

> [!example]- Mean and variance of a two-policy portfolio {Example}
> Independent losses have $E[X] = 300$, $\text{Var}(X) = 2{,}500$, $E[Y] = 500$ and $\text{Var}(Y) = 10{,}000$. Find the mean and variance of $L = 2X + 3Y$.
>
> > [!answer]-
> > **Plan:** the mean is the weighted sum of means. Independence removes the covariance term, and the weights square.
> > $$
> > \begin{align*}
> > E[L] &= 2(300) + 3(500) \\
> > &= 2{,}100 \\
> > \text{Var}(L) &= 2^2(2{,}500) + 3^2(10{,}000) \\
> > &= 10{,}000 + 90{,}000 \\
> > &= 100{,}000
> > \end{align*}
> > $$

> [!example]- A difference of correlated losses {Example}
> Losses $X$ and $Y$ have $\text{Var}(X) = 9$, $\text{Var}(Y) = 16$ and $\text{Cov}(X, Y) = 6$. Find $\text{Var}(X - Y)$.
>
> > [!answer]-
> > **Plan:** the weights are $1$ and $-1$, so the pair term picks up $2c_1c_2 = -2$.
> > $$
> > \begin{align*}
> > \text{Var}(X - Y) &= \text{Var}(X) + \text{Var}(Y) - 2\,\text{Cov}(X, Y) \\
> > &= 9 + 16 - 2(6) \\
> > &= 13
> > \end{align*}
> > $$
> > Positive covariance shrinks the variance of a difference and inflates the variance of a sum.

> [!example]- Sample mean of 25 claims {Example}
> Claim sizes are i.i.d. with mean 400 and standard deviation 100. Find the mean and standard deviation of the average of 25 claims.
>
> > [!answer]-
> > **Plan:** the average has every weight equal to $1/25$, and the claims are independent.
> > $$
> > \begin{align*}
> > E[\bar{X}] &= 25 \cdot \tfrac{1}{25}(400) \\
> > &= 400 \\
> > \text{Var}(\bar{X}) &= 25 \cdot \left(\tfrac{1}{25}\right)^2 (100^2) \\
> > &= \frac{10{,}000}{25} \\
> > &= 400
> > \end{align*}
> > $$
> > So $\text{SD}(\bar{X}) = 20$. Averaging leaves the mean alone but divides the standard deviation by $\sqrt{25} = 5$.

> [!warning]- Exam traps
> - **Subtracting variances.** $\text{Var}(X - Y)$ adds $\text{Var}(Y)$, and only the covariance term changes sign.
> - **Forgetting to square the weights.** $\text{Var}(3X) = 9\,\text{Var}(X)$, not $3\,\text{Var}(X)$.
> - **Confusing $nX$ with a sum of $n$ independent copies.** The variances are $n^2\sigma^2$ and $n\sigma^2$.
> - **Dropping the covariance for dependent terms.** The pair term stays unless the variables are uncorrelated.
> - **Adding a constant to the variance.** A fixed fee shifts the mean but adds nothing to the variance.
