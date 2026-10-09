---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:49256014ce7b0ed2c59f4b014525b28d3d208717f76861151ed76dab1e811913
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Frequency Distribution.md
---

**A Frequency Distribution** is the probability distribution of the number of claims $N$ in a period, for one policy or for a portfolio, and paired with a [[Severity Distribution|severity distribution]] it builds the [[Aggregate Loss Model|aggregate loss model]]. Loss Models' main claim-count models are the [[Poisson Distribution|Poisson]], [[Binomial Distribution|binomial]] and [[Negative Binomial Distribution|negative binomial]], which make up the (a,b,0) class, together with their zero-truncated and zero-modified versions in the (a,b,1) class. It differs from [[Frequency]], Exam 5's observed ratio of claims to exposure, which is an average rather than a distribution.

> $$p_k = \left(a + \frac{b}{k}\right) p_{k-1}, \quad k = 1, 2, 3, \ldots$$

> $$p_k^M = \frac{1 - p_0^M}{1 - p_0}\,p_k, \quad k = 1, 2, 3, \ldots$$

| Distribution | $p_0$ | $a$ | $b$ |
| :--- | :---: | :---: | :---: |
| Poisson $(\lambda)$ | $e^{-\lambda}$ | $0$ | $\lambda$ |
| Binomial $(m, q)$ | $(1-q)^m$ | $-\frac{q}{1-q}$ | $\frac{(m+1)q}{1-q}$ |
| Neg. binomial $(r, \beta)$ | $(1+\beta)^{-r}$ | $\frac{\beta}{1+\beta}$ | $\frac{(r-1)\beta}{1+\beta}$ |
| Geometric $(\beta)$ | $(1+\beta)^{-1}$ | $\frac{\beta}{1+\beta}$ | $0$ |

- **Symbols:** $p_k = \Pr(N = k)$, and the table, from Loss Models' Appendix B as printed in the exam tables, gives each member's $a$, $b$ and starting value. Every member has $E[N] = (a+b)/(1-a)$ and $\text{Var}(N) = (a+b)/(1-a)^2$, which give $\lambda$ and $\lambda$ for the Poisson, $mq$ and $mq(1-q)$ for the binomial, and $r\beta$ and $r\beta(1+\beta)$ for the negative binomial.
- **Choosing a member:** The variance is below the mean for the binomial, equal to it for the Poisson and above it for the negative binomial, because $\text{Var}(N)/E[N] = 1/(1-a)$ and $a$ is negative, zero and positive in turn. Equivalently, $k\,p_k/p_{k-1} = ak + b$ is linear in $k$, and its slope and intercept on data suggest which member fits.
- **The (a,b,1) class:** Its members follow the same relation only from $k = 2$, so $p_0$ is free. A zero-truncated distribution has $p_0^T = 0$ and $p_k^T = p_k/(1 - p_0)$. A zero-modified one puts an arbitrary $p_0^M$ at zero and scales the rest as in the second block, so its mean is $1 - p_0^M$ times the zero-truncated mean. The class also holds the logarithmic distribution and the zero-truncated negative binomial with $-1 < r < 0$, which have no (a,b,0) counterpart.
- **Exposure, deductibles and estimation:** When exposure grows by a factor, the Poisson $\lambda$, the negative binomial $r$ and the binomial $m$ grow by it. When a deductible lets only a fraction $v$ of losses through, $\lambda$, $\beta$ and $q$ are multiplied by $v$ instead ([[Coverage Modifications]]). By [[Maximum Likelihood Estimation|maximum likelihood]], $\hat\lambda = \bar{x}$ for the Poisson, $\hat q = \bar{x}/m$ for the binomial with $m$ known, and $\hat\beta = \bar{x}/r$ for the negative binomial with $r$ known.

> [!example]- Identifying the Member From Two Ratios {Example}
> For a claim-count distribution in the (a,b,0) class, $p_1/p_0 = 1$ and $p_2/p_1 = 2/3$. Identify the distribution and its parameters, and find $p_3$.
>
> > [!answer]-
> > The ratios give $a + b = 1$ and $a + b/2 = 2/3$, so $b/2 = 1/3$.
> > $$
> > \begin{align*}
> > b &= \tfrac{2}{3} \\
> > a &= \tfrac{1}{3}
> > \end{align*}
> > $$
> > Because $a > 0$, the distribution is negative binomial. Then $\beta/(1+\beta) = 1/3$ gives $\beta = 0.5$, and $(r-1)a = b$ gives $r = 3$. So $p_0 = 1.5^{-3} = 0.296296$, $p_1 = p_0 = 0.296296$ and $p_2 = \tfrac{2}{3}p_1 = 0.197531$.
> > $$
> > \begin{align*}
> > p_3 &= \left(\tfrac{1}{3} + \tfrac{2/3}{3}\right)(0.197531) \\
> > &= \tfrac{5}{9}(0.197531) \\
> > &= 0.109739
> > \end{align*}
> > $$
> > The mean is $r\beta = 1.5$ and the variance is $r\beta(1+\beta) = 2.25$, so the claim counts are overdispersed relative to a Poisson with the same mean.

> [!example]- Zero-Modified Poisson Claim Counts {Example}
> A policy has no claims in a year with probability 0.4. Given at least one claim, the number of claims follows a zero-truncated Poisson with $\lambda = 1.5$. Find the probabilities of one and two claims, and the mean.
>
> > [!answer]-
> > This is a zero-modified Poisson with $p_0^M = 0.4$, and the corresponding Poisson has $p_0 = e^{-1.5} = 0.223130$. Each positive probability is the Poisson one times $(1 - 0.4)/(1 - 0.223130) = 0.772330$.
> > $$
> > \begin{align*}
> > p_1^M &= 0.772330 \times 1.5\,e^{-1.5} \\
> > &= 0.772330 \times 0.334695 \\
> > &= 0.258495 \\
> > p_2^M &= \tfrac{1.5}{2}\,p_1^M \\
> > &= 0.193871 \\
> > E[N] &= \frac{0.6 \times 1.5}{0.776870} \\
> > &= 1.1585
> > \end{align*}
> > $$
> > The second probability comes from the recursion with $a = 0$ and $b = 1.5$, which still holds from $k = 2$. The mean is 0.6 times the zero-truncated mean $1.5/0.776870 = 1.9308$, and it is below the Poisson mean of 1.5 because the policy is more likely than a Poisson to have no claims.

> [!example]- Maximum Likelihood for Claim Counts {Example}
> Over a year, 500 policies had the following numbers of claims: 300 had none, 140 had one, 50 had two and 10 had three. Fit a Poisson by maximum likelihood, and say whether the data suggest a negative binomial instead.
>
> > [!answer]-
> > The loglikelihood is $\ell(\lambda) = -500\lambda + \left(\sum x_i\right)\ln\lambda + \text{constant}$, and setting its derivative to zero gives $\hat\lambda = \bar{x}$.
> > $$
> > \begin{align*}
> > \hat\lambda &= \frac{140(1) + 50(2) + 10(3)}{500} \\
> > &= 0.54 \\
> > \hat\sigma^2 &= \frac{140 + 50(4) + 10(9)}{500} - 0.54^2 \\
> > &= 0.5684
> > \end{align*}
> > $$
> > The variance of the data is only 5% above the mean, so a Poisson is a reasonable choice. A negative binomial would be preferred if the variance were well above the mean, as it is when policyholders differ in their claim rates.

> [!tip]- How it appears on the exam
> - **FAM** asks candidates to recognize the (a,b,0) and (a,b,1) classes and their relationships, identify the role of their parameters, perform calculations with them, and choose a distribution for a given application. A question gives ratios of successive probabilities, a zero-modified distribution's $p_0^M$, or a change in exposure or deductible, and asks for a probability, a mean or the new parameters.
> - **FAM parametric estimation:** A question gives claim-count data, sometimes grouped, and asks for the maximum likelihood estimate of a Poisson, binomial or negative binomial parameter.
> - **ASTAM** uses the same classes as the frequency in aggregate models, where the values of $a$ and $b$ drive the [[Panjer Recursion|recursive formula]].

> [!warning]- Exam traps
> - **Exposure versus deductible:** Doubling the exposure doubles the negative binomial's $r$ and leaves $\beta$ alone, while a deductible multiplies $\beta$ by the probability of a payment and leaves $r$ alone. Swapping the two gives the right mean but the wrong variance.
> - **Where the recursion starts:** For an (a,b,1) distribution, $p_1^M \neq (a+b)\,p_0^M$, so $p_1$ must come from the scaling formula before the recursion can continue from $k = 2$.
> - **The negative binomial's parameterization:** The exam tables count failures, with $p_0 = (1+\beta)^{-r}$ and mean $r\beta$. The trials form from probability courses has a different mean, and mixing the two shifts every probability.
> - **The binomial's $a$:** For the binomial, $a = -q/(1-q)$ is negative. Dropping the sign makes the distribution look like a negative binomial.
