---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:e573cff4c36718a702c2a42042077f2e7092fd17b785266d051325c4d9a500c8
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 6.7 (V(cX) = c^2 V(X)), Thm 6.8 (V(X+Y) = V(X)+V(Y), independent), Ex. 6.2.23 (PDF p.275), Ex. 6.3.17 (PDF p.289), Example 7.5 (sum of independent normals is normal, PDF p.302), Thms 9.4 and 9.6 (PDF pp.351, 365), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q301 (variance of a sum with a covariance term, PDF pp.83-84), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.3 Variance: indicator X with P(X = 1) = p has E(X) = p and var(X) = p(1 - p), HTML fetched 2026-10-30, sha256:f0c1c5b0b4846e96d07f956599d1a428069c9402f2481a9e9ab3d6ca123f02bf — https://www.randomservices.org/random/expect/Variance.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.1 Definitions and Basic Properties: Symmetry (distribution symmetric about a with E(X) existing gives E(X) = a; density form f(a+x) = f(a-x)), Linearity, indicator E(1_A) = P(A), conditional density f(x|A) and its conditional expected values, HTML fetched 2026-10-30, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Linear Combinations of Random Variables.md
---

**Linear Combinations of Random Variables** are expressions of the form $L = c_1 X_1 + c_2 X_2 + \cdots + c_n X_n$ for constants $c_i$, collapsing several random variables into a single quantity — an aggregate loss, a portfolio value, a sample mean.

> $$E[L] = \sum_{i=1}^{n} c_i\,E[X_i]$$

> $$\text{Var}(L) = \sum_{i=1}^{n} c_i^2\,\text{Var}(X_i) + 2\sum_{i < j} c_i c_j\,\text{Cov}(X_i, X_j)$$

- **Expectation is always linear** — $E[L]$ needs no independence assumption at all. The variance formula holds in general too; the [[Covariance]] terms drop out whenever the $X_i$ are pairwise uncorrelated. [[Independent Random Variables|Independent]] variables are always uncorrelated, but zero covariance does not by itself imply independence. See [[Moments for Linear Combinations]].
- Coefficients enter the variance **squared**, so $\text{Var}(X - Y) = \text{Var}(X) + \text{Var}(Y)$ for independent $X, Y$ — a difference has a *larger* variance than either term, never a smaller one.
- A linear combination of independent normals is exactly normal, which is what makes [[Probabilities for Linear Combinations]] computable in closed form.
- For $n$ i.i.d. variables with mean $\mu$ and finite variance $\sigma^2$, $\bar{X}$ has mean $\mu$ and variance $\sigma^2/n$, and for large $n$ the [[Central Limit Theorem]] makes the sum $X_1 + \cdots + X_n$ and the mean $\bar{X}$ approximately normal, whatever their common distribution.
- A payment that depends on which of several events occur is a linear combination of indicators: $\text{Payment} = \sum_i a_i I_i$, where $I_i$ is 1 if event $A_i$ occurs and 0 otherwise, and the amount $a_i$ paid for event $i$ is its coefficient. Each $I_i$ is Bernoulli with $E[I_i] = P(A_i)$ and $\text{Var}(I_i) = P(A_i)\,[1 - P(A_i)]$, so the formulas above give the payment's mean and variance, with covariance terms unless the events are independent.

![[Media/Figures/Linear_Combinations_of_Random_Variables.svg|340]]

> [!example]- Mean and Variance of a Two-Policy Portfolio {Example}
> Independent losses have $E[X] = 300$, $\text{Var}(X) = 2{,}500$, $E[Y] = 500$, $\text{Var}(Y) = 10{,}000$. Find the mean and variance of $L = 2X + 3Y$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[L] &= 2(300) + 3(500) \\
> >      &= 2{,}100
> > \end{align*}
> > $$
> > Independence kills the covariance term, and the coefficients square:
> > $$
> > \begin{align*}
> > \text{Var}(L) &= 2^2(2{,}500) + 3^2(10{,}000) \\
> >               &= 10{,}000 + 90{,}000 \\
> >               &= 100{,}000
> > \end{align*}
> > $$

> [!example]- A Difference of Correlated Losses {Example}
> $X$ and $Y$ have $\text{Var}(X) = 9$, $\text{Var}(Y) = 16$, and $\text{Cov}(X,Y) = 6$. Find $\text{Var}(X - Y)$.
>
> > [!answer]-
> > Here $c_1 = 1$ and $c_2 = -1$, so the cross term picks up $2c_1c_2 = -2$:
> > $$
> > \begin{align*}
> > \text{Var}(X - Y) &= \text{Var}(X) + \text{Var}(Y) - 2\,\text{Cov}(X,Y) \\
> >                   &= 9 + 16 - 2(6) \\
> >                   &= 13
> > \end{align*}
> > $$
> > Positive covariance shrinks the variance of a *difference* and inflates the variance of a *sum* — the sign of the cross term flips with the sign of $c_2$.

> [!example]- Sample Mean of 25 Claims {Example}
> Claim sizes are i.i.d. with mean 400 and standard deviation 100. Find the mean and standard deviation of the average of 25 claims.
>
> > [!answer]-
> > $\bar{X} = \frac{1}{25}\sum_{i=1}^{25} X_i$, so every $c_i = 1/25$:
> > $$
> > \begin{align*}
> > E[\bar{X}] &= 25 \cdot \tfrac{1}{25}(400) \\
> >            &= 400 \\
> > \text{Var}(\bar{X}) &= 25 \cdot \left(\tfrac{1}{25}\right)^2 (100^2) \\
> >                     &= \frac{10{,}000}{25} \\
> >                     &= 400
> > \end{align*}
> > $$
> > So $\text{SD}(\bar{X}) = 20$. Averaging leaves the mean alone but divides the standard deviation by $\sqrt{25} = 5$.
