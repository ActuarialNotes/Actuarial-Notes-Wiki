---
aliases:
  - Individual Risk
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1a2f8b48389ce24410663a8fdc88c4760dd63e3e42aa0bfc0306432017cee394
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Individual Risk Model.md
---

**The Individual Risk Model** represents the aggregate losses of a portfolio as the sum of the losses on a fixed number $n$ of independent policies, $S = X_1 + \cdots + X_n$, where most of the $X_j$ are zero. Each loss is written as $X_j = I_j B_j$, where the indicator $I_j$ shows whether policy $j$ has a claim and $B_j$ is the claim amount if it does. It contrasts with the collective risk model of the [[Aggregate Loss Model|aggregate loss model]], which sums a random number of identically distributed claims, and it is unrelated to [[Individual Risk Rating]], an Exam 8 pricing topic.

> $$S = X_1 + X_2 + \cdots + X_n, \quad X_j = I_j B_j$$

> $$E[S] = \sum_{j=1}^{n} q_j\,\mu_j$$

> $$\text{Var}(S) = \sum_{j=1}^{n} \left[q_j\,\sigma_j^2 + q_j(1 - q_j)\,\mu_j^2\right]$$

- **Symbols:** Following Loss Models (chapter 9), $q_j = \Pr(I_j = 1)$ is the probability of a claim on policy $j$, and $\mu_j$ and $\sigma_j^2$ are the mean and variance of its claim amount $B_j$. The policies are independent but not identically distributed, so each can have its own claim probability and benefit. With a fixed benefit $b_j$, as in [[Term Life Insurance|group term life]], $\sigma_j^2 = 0$, and $X_j$ is $b_j$ times a Bernoulli variable.
- **Where the variance comes from:** Conditioning on the indicator, the [[Variance for Conditional and Marginal Distributions|law of total variance]] gives $E[\text{Var}(X_j \mid I_j)] = q_j\sigma_j^2$ and $\text{Var}(E[X_j \mid I_j]) = q_j(1 - q_j)\mu_j^2$. Independence then lets the means and the variances add across policies.
- **Individual versus collective:** In the collective model, a random claim count $N$ is independent of identically distributed claim amounts. Modelling the same book collectively, with $N$ Poisson with mean $\sum q_j$ and a severity that mixes the $B_j$ with weights proportional to $q_j$, keeps the mean but adds $\sum q_j^2\mu_j^2$ to the variance, because a Poisson count lets a policy claim more than once.
- **Approximating the distribution:** The exact distribution of $S$ needs a [[Convolution|convolution]] of $n$ different distributions, so for a large portfolio $S$ is approximated by a [[Normal Approximation|normal]] or a [[Lognormal Distribution|lognormal]] distribution with the same mean and variance.

> [!example]- Group Life With Two Classes {Example}
> A group life policy covers 400 employees with a death probability of 0.002 and a benefit of \$100,000 each, and 200 employees with a death probability of 0.005 and a benefit of \$50,000 each. Deaths are independent. Find the mean and variance of total claims, and the premium that covers claims with probability 0.95 under the normal approximation.
>
> > [!answer]-
> > The benefits are fixed, so each variance term is $q_j(1 - q_j)\,b_j^2$.
> > $$
> > \begin{align*}
> > E[S] &= 400(0.002)(100{,}000) + 200(0.005)(50{,}000) \\
> > &= 80{,}000 + 50{,}000 \\
> > &= 130{,}000 \\
> > \text{Var}(S) &= 400(0.002)(0.998)(100{,}000)^2 \\
> > &\quad + 200(0.005)(0.995)(50{,}000)^2 \\
> > &= 7.984 \times 10^{9} + 2.4875 \times 10^{9} \\
> > &= 1.04715 \times 10^{10}
> > \end{align*}
> > $$
> > The standard deviation is $102{,}330$, and the premium is $130{,}000 + 1.645(102{,}330) = 298{,}333$. The premium is more than twice the expected claims, because a single death in the first class costs \$100,000 against a mean of \$130,000. With so few expected deaths, the distribution of $S$ is very skewed and the normal approximation is rough.

> [!example]- Random Claim Amounts, Individually and Collectively {Example}
> Each of 1,000 independent health policies has a probability of 0.1 of a claim in the year. Given a claim, the amount has mean 2,000 and standard deviation 1,500. Find $E[S]$ and $\text{Var}(S)$ in the individual risk model, and compare the variance with a collective model that has a Poisson number of claims with the same mean.
>
> > [!answer]-
> > Each policy has the same $q$, $\mu$ and $\sigma$, so the sums are 1,000 times one policy's values.
> > $$
> > \begin{align*}
> > E[S] &= 1{,}000(0.1)(2{,}000) \\
> > &= 200{,}000 \\
> > \text{Var}(X_j) &= 0.1(1{,}500)^2 + 0.1(0.9)(2{,}000)^2 \\
> > &= 225{,}000 + 360{,}000 \\
> > &= 585{,}000 \\
> > \text{Var}(S) &= 1{,}000(585{,}000) \\
> > &= 5.85 \times 10^{8}
> > \end{align*}
> > $$
> > The collective model has $\lambda = 100$, and its variance is $\lambda\,E[B^2] = 100(1{,}500^2 + 2{,}000^2) = 6.25 \times 10^{8}$. The difference, $4 \times 10^{7}$, is exactly $\sum q_j^2\mu_j^2 = 1{,}000(0.01)(4{,}000{,}000)$. The standard deviations are 24,187 and 25,000, so the collective model is slightly conservative.

> [!tip]- How it appears on the exam
> - **FAM** asks candidates to define the collective and individual risk models and to calculate their means and variances. A question describes a group of policies in classes, each with its own claim probability and benefit, and asks for $E[S]$ and $\text{Var}(S)$.
> - **Approximations:** FAM also asks candidates to use the normal or lognormal approximation for the aggregate distribution. The lognormal matches the moments through $\sigma^2 = \ln\big(1 + \text{Var}(S)/E[S]^2\big)$ and $\mu = \ln E[S] - \sigma^2/2$.
> - **Telling the models apart:** A question that lists policies that can each claim at most once is set in the individual model, while one that gives a distribution for the number of claims is set in the collective model.

> [!warning]- Exam traps
> - **The missing term:** The variance of $X_j$ is $q_j\sigma_j^2 + q_j(1 - q_j)\mu_j^2$. Using $q_j\sigma_j^2$ alone ignores the uncertainty over whether a claim happens, and using $q_j E[B_j^2]$ gives the larger compound Poisson variance.
> - **Fixed benefits still vary:** A fixed benefit has $\sigma_j^2 = 0$, but $X_j$ still has variance $q_j(1 - q_j)b_j^2$, because the policy pays either nothing or the full benefit.
> - **A fixed number of policies:** In the individual model, $n$ is the fixed number of policies, and the number of claims, $\sum I_j$, is random. Treating $n$ as the number of claims overstates $E[S]$ by a factor of $1/q$.
> - **The namesake page:** Individual Risk Rating, an Exam 8 topic, adjusts one insured's premium for its own characteristics or loss experience through experience, schedule or retrospective rating. It has nothing to do with this model.
