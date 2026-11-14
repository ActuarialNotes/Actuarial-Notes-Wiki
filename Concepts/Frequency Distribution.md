---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:82a0c699a78009f7addc5ad9c18bb6a330ba0e7b6c5021b19ebd34fd720ad0ac
  sources:
    - "SOA Tables for Exam FAM (Loss Models Appendices A and B excerpts), Appendix B: B.1 factorial moments, B.2 (a,b,0) p0/a/b, mean (a+b)/(1-a), variance (a+b)/(1-a)^2, B.3.1 zero-truncated incl. logarithmic and ETNB r>-1, B.3.2 zero-modified p_k^M=(1-p0^M)p_k/(1-p0) and mean, pp.14-19, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
    - "Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.2 Frequency Modeling, 2.2.3 over/underdispersion, 2.3 (a,b,0) recursion, 2.4.2 MLEs (lambda-hat = x-bar, L(m, x-bar/m), l(r, x-bar/r)), 2.5.1 (a,b,1) from k>=2, sha256:9239175ca12d9d16f2030297175d370842c7bf1e8ac232f9eefdf2f3fe5d4a4c — https://openacttexts.github.io/Loss-Data-Analytics/ChapFrequency-Modeling.html"
    - "Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.5, 5.2 Table 5.1 closed under convolution (Bin sum m_i; NB sum r_i), 5.5.1 exposure: Poi(n lambda), NB(beta, nr); 5.5.2 deductible: P_{N^P}(z)=P_{N^L}(1+v(z-1)), Poi(lambda v), NB(beta v, r), sha256:09489050a45e6eb2ee0d96804458eb22c936a61716227e08ad0398b9cba870d4 — https://openacttexts.github.io/Loss-Data-Analytics/ChapAggLossModels.html"
    - "SOA Exam FAM Syllabus, February 2027, Topic 2 outcomes e-h, Topic 3 MLE, pp.3-4, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Frequency Distribution.md
---

A **Frequency Distribution** is the probability distribution of the number of claims $N$ in a period, for one policy or for a portfolio. Paired with a [[Severity Distribution|severity distribution]], it builds the [[Aggregate Loss Model|aggregate loss model]]. It differs from [[Frequency]], Exam 5's observed ratio of claims to exposure, which is an average rather than a distribution.

The main claim-count models, the [[Poisson Distribution|Poisson]], [[Binomial Distribution|binomial]] and [[Negative Binomial Distribution|negative binomial]], make up the (a,b,0) class. A distribution is in the class if, for constants $a$ and $b$, its probabilities satisfy

> $$p_k = \left(a + \frac{b}{k}\right) p_{k-1}, \quad k = 1, 2, 3, \ldots$$

- $p_k = \Pr(N = k)$.
- The recursion starts from $p_0$.

The members' starting values and their $a$ and $b$, from Loss Models' Appendix B as printed in the exam tables, are:

| Distribution | $p_0$ | $a$ | $b$ |
| :--- | :---: | :---: | :---: |
| Poisson $(\lambda)$ | $e^{-\lambda}$ | $0$ | $\lambda$ |
| Binomial $(m, q)$ | $(1-q)^m$ | $-\frac{q}{1-q}$ | $\frac{(m+1)q}{1-q}$ |
| Neg. binomial $(r, \beta)$ | $(1+\beta)^{-r}$ | $\frac{\beta}{1+\beta}$ | $\frac{(r-1)\beta}{1+\beta}$ |
| Geometric $(\beta)$ | $(1+\beta)^{-1}$ | $\frac{\beta}{1+\beta}$ | $0$ |

Every member has $E[N] = (a+b)/(1-a)$ and $\text{Var}(N) = (a+b)/(1-a)^2$, which give $\lambda$ and $\lambda$ for the Poisson, $mq$ and $mq(1-q)$ for the binomial, and $r\beta$ and $r\beta(1+\beta)$ for the negative binomial. The exam tables' negative binomial counts failures, with $p_0 = (1+\beta)^{-r}$ and mean $r\beta$, which is not the trials form used in probability courses.

> [!example]- An (a,b,0) distribution has $p_1/p_0 = 1$ and $p_2/p_1 = 2/3$. Which distribution is it, and what is $p_3$? {Example}
> - The recursion at $k = 1$ and $k = 2$ gives $a + b = 1$ and $a + b/2 = 2/3$.
> - Subtracting, $b/2 = 1/3$, so $b = 2/3$ and $a = 1/3$.
> - Because $a > 0$, the distribution is negative binomial.
> - $\beta/(1+\beta) = 1/3$ gives $\beta = 0.5$, and $(r-1)a = b$ gives $r = 3$.
> - $p_0 = 1.5^{-3} = 0.296296$, $p_1 = p_0 = 0.296296$ and $p_2 = \tfrac{2}{3}p_1 = 0.197531$.
> - $p_3 = \left(\tfrac{1}{3} + \tfrac{2/3}{3}\right)(0.197531) = \tfrac{5}{9}(0.197531) = 0.109739$.

## Choosing a member of the class

The variance is below the mean for the binomial, equal to it for the Poisson and above it for the negative binomial, because $\text{Var}(N)/E[N] = 1/(1-a)$ and $a$ is negative, zero and positive in turn. Equivalently, $k\,p_k/p_{k-1} = ak + b$ is linear in $k$, and its slope and intercept on data suggest which member fits.

By [[Maximum Likelihood Estimation|maximum likelihood]], the Poisson mean is estimated by the sample mean,

> $$\hat\lambda = \bar{x}$$

For the binomial with $m$ known, $\hat q = \bar{x}/m$, and for the negative binomial with $r$ known, $\hat\beta = \bar{x}/r$.

> [!example]- What is the maximum likelihood Poisson for these claim counts, and do they suggest a negative binomial instead? {Example}
> Over a year, 500 policies had the following numbers of claims:
>
> | Claims | Policies |
> | :---: | ---: |
> | 0 | 300 |
> | 1 | 140 |
> | 2 | 50 |
> | 3 | 10 |
>
> > [!answer]-
> > - The loglikelihood is $\ell(\lambda) = -500\lambda + \left(\sum x_i\right)\ln\lambda + \text{constant}$, and setting its derivative to zero gives $\hat\lambda = \bar{x}$.
> > - $\hat\lambda = \frac{140(1) + 50(2) + 10(3)}{500} = 0.54$.
> > - The sample variance is $\hat\sigma^2 = \frac{140 + 50(4) + 10(9)}{500} - 0.54^2 = 0.5684$.
> > - The variance is only 5% above the mean, so a Poisson is a reasonable choice. A negative binomial would be preferred if the variance were well above the mean.

## The (a,b,1) class

Members of the (a,b,1) class follow the same recursion only from $k = 2$, so $p_0$ is free. A zero-truncated distribution has $p_0^T = 0$ and $p_k^T = p_k/(1 - p_0)$. A zero-modified distribution puts an arbitrary $p_0^M$ at zero and scales the rest of the corresponding (a,b,0) distribution, so its probabilities are

> $$p_k^M = \frac{1 - p_0^M}{1 - p_0}\,p_k, \quad k = 1, 2, 3, \ldots$$

- $p_k$ and $p_0$ are the probabilities of the corresponding (a,b,0) distribution.

A zero-modified distribution's mean is $1 - p_0^M$ times the zero-truncated mean. For an (a,b,1) distribution, $p_1^M \neq (a+b)\,p_0^M$, so $p_1$ comes from the scaling formula before the recursion continues from $k = 2$. The class also holds the logarithmic distribution and the zero-truncated negative binomial with $-1 < r < 0$, which have no (a,b,0) counterpart.

> [!example]- What are $p_1^M$, $p_2^M$ and the mean of this policy's claim count? {Example}
> A policy has no claims in a year with probability 0.4. Given at least one claim, the number of claims follows a zero-truncated Poisson with $\lambda = 1.5$.
>
> > [!answer]-
> > - The Poisson has $p_0 = e^{-1.5} = 0.223130$.
> > - Each positive probability is the Poisson one times $(1 - 0.4)/(1 - 0.223130) = 0.772330$.
> > - $p_1^M = 0.772330 \times 1.5\,e^{-1.5} = 0.772330 \times 0.334695 = 0.258495$.
> > - The recursion with $a = 0$ and $b = 1.5$ still holds from $k = 2$, so $p_2^M = \tfrac{1.5}{2}\,p_1^M = 0.193871$.
> > - The zero-truncated mean is $1.5/0.776870 = 1.9308$, so the mean is $0.6 \times 1.9308 = 1.1585$.

## Exposure and deductibles

When exposure grows by a factor, the Poisson $\lambda$, the negative binomial $r$ and the binomial $m$ grow by it. When a deductible lets only a fraction $v$ of losses through, $\lambda$, $\beta$ and $q$ are multiplied by $v$ instead ([[Coverage Modifications]]).

> [!trap] Exposure and deductible change different parameters
> Doubling the exposure doubles the negative binomial's $r$ and leaves $\beta$ alone, while a deductible multiplies $\beta$ by the probability of a payment and leaves $r$ alone. Swapping the two gives the right mean but the wrong variance.
