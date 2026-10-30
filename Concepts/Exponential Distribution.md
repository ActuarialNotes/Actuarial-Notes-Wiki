---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:929390c8e2816f5c8d076613575d548c4599da0b8e4e3930bacab5c3fad04669
  sources:
    - "SOA, Tables for Exam C (Fall 2009), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; A.3.3.1 Exponential, printed p.6 (PDF p.11)"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 2.2 Example 2.17 p.68 (PDF p.76) and 5.2 p.206 (PDF p.214), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Exam P Sample Solutions (Aug 2026 revision), Q44 (PDF p.16) and Q101 (PDF pp.30-31), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 14.2 The Exponential Distribution: memoryless property equivalent to the law of exponents F^c(t+s)=F^c(s)F^c(t), F^c(q)=a^q with a=F^c(1) and r=-ln(a); quantile function F^{-1}(p)=-ln(1-p)/r and median ln(2)/r; The Scaling Property (scale family, cX exponential with rate r/c) (HTML fetched 2026-10-30), sha256:db0eebaa01377dfc5e07ca838f9ae6c3b06b9653e6d10032de301cb07c4aad63 — https://www.randomservices.org/random/poisson/Exponential.html"
    - "Siegrist, 3.5 Conditional Distributions: law of total probability (P a mixture of the conditional measures with mixing density g) and Simple Mixed Distributions, light-bulb exercise mixing exponentials with rates 1-5, P(T>1)=0.1156 (HTML fetched 2026-10-30), sha256:ad76250f09b0c4438869894ebb75a07a5cf0465944d7b5ff2b3c270fcc3b369e — https://www.randomservices.org/random/dist/Conditional.html"
    - "Wikipedia, Hyperexponential distribution: X is exponential with rate lambda_i with probability p_i; the standard deviation exceeds the mean except in the degenerate case of all lambdas equal, so the coefficient of variation is greater than 1, the exponential's (HTML fetched 2026-10-30), sha256:a1aed37cdf13e0bd2aa78b43f3290aec80d42011784a4c737eaf85fcdcc0e214 — https://en.wikipedia.org/wiki/Hyperexponential_distribution"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, 4.2.2 Exponential Distribution: F_X(x)=1-e^{-lambda x} (HTML fetched 2026-10-30), sha256:a9018783f1ab95a89f7422c96671d35be3c541e7f3dc1692368351d8617149fe — https://www.probabilitycourse.com/chapter4/4_2_2_exponential.php"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.2 Exponential density, simulation Y=-(1/lambda)log(rnd): P(Y<=y)=P(rnd>=e^{-lambda y})=1-e^{-lambda y}, p.208 (PDF p.216), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Exponential Distribution.md
---

The **Exponential Distribution** $X \sim \text{Exp}(\theta)$ is a continuous distribution on $(0, \infty)$ commonly used to model the time between events or the size of insurance losses.

> $$f(x) = \frac{1}{\theta}\,e^{-x/\theta}, \quad x > 0$$
>
> $$\text{where } \theta > 0 = \text{mean (scale parameter)}$$

- $E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$
- Its defining property is **memorylessness**: $P(X > s + t \mid X > s) = P(X > t)$, making it the unique continuous distribution with no aging effect
- A direct consequence: given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$. So $E[X \mid X > d] = d + \theta$ and $E[(X-d)_+] = \theta e^{-d/\theta}$ — the two identities most [[Deductible|deductible]] questions reduce to
- Capped at a [[Benefit Limit|limit]] $u$: $E[\min(X,u)] = \theta\left(1 - e^{-u/\theta}\right)$
- Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponential question is a tail probability
- Some texts parameterize by **rate** $\lambda = 1/\theta$, so $f(x) = \lambda e^{-\lambda x}$ and $E[X] = 1/\lambda$. Check which convention a problem uses before substituting
- **One known probability fixes $\theta$.** Set the survival function at the given point equal to the given probability and take natural logs: from $S(x_0) = e^{-x_0/\theta} = s$ (equivalently $F(x_0) = 1 - s$), $\theta = -x_0/\ln s$ and the rate is $\lambda = -\ln s / x_0$. Every other probability or percentile then follows from that $\theta$

> $$\theta = \frac{-x_0}{\ln S(x_0)} = \frac{-x_0}{\ln\bigl(1 - F(x_0)\bigr)}, \qquad \lambda = \frac{1}{\theta}$$

- A percentile works the same way: the $100p$-th percentile is $\pi_p = -\theta\ln(1-p)$ (the median is $\theta\ln 2$), so a known percentile gives $\theta = -\pi_p/\ln(1-p)$, and with it any other percentile
- **Survival powers.** Because $e^{-kx/\theta} = \left(e^{-x/\theta}\right)^k$, the survival probability at a multiple of a point is that point's survival probability raised to the multiple, so a known $S(x_0)$ carries to any other point without solving for $\theta$:

> $$S(kx) = S(x)^k, \qquad S(x) = S(x_0)^{x/x_0}$$

- The same law of exponents compares two exponentials at one point: an exponential with mean $\theta/k$ has survival $e^{-kx/\theta} = S(x)^k$. Halving the mean doubles the rate and squares the survival probability at every fixed point, and if $S_A(x) = S_B(x)^k$ at the same $x$, then $\theta_B = k\,\theta_A$
- **From a uniform.** If $U \sim \text{Unif}(0,1)$ and $\theta > 0$, then $Y = -\theta \ln U$ is exponential with mean $\theta$, since $P(Y \leq y) = P\left(U \geq e^{-y/\theta}\right) = 1 - e^{-y/\theta}$. This is the inverse-CDF method of simulating an exponential
- **A mixture of exponentials is not exponential.** When $X$ is $\text{Exp}(\theta_1)$ with probability $w$ and $\text{Exp}(\theta_2)$ otherwise (a [[Mixture Distribution|mixture]]), compute a probability within each component and weight by the mixing probabilities, never from one exponential with the weighted-average mean:

> $$P(a < X < b) = w\left(e^{-a/\theta_1} - e^{-b/\theta_1}\right) + (1-w)\left(e^{-a/\theta_2} - e^{-b/\theta_2}\right)$$

- For instance, with means 1 and 3 equally weighted, $P(X > 2) = 0.5e^{-2} + 0.5e^{-2/3} \approx 0.324$, while a single exponential with the average mean 2 would give $e^{-1} \approx 0.368$
- $\theta$ is a [[Scale and Shape Parameters|scale parameter]]: for $c > 0$, $cX$ is exponential with mean $c\theta$, and the median and every other percentile move in proportion to $\theta$

![[Media/Exponential_pdf.svg|500]]

![[Media/Figures/Exponential_Distribution.svg|340]]

> [!example]- Probability a Loss Exceeds the Deductible {Example}
> Ground-up losses follow $X \sim \text{Exp}(\theta = 500)$. A deductible of $d = 300$ applies. What proportion of losses result in a claim payment?
>
> > [!answer]-
> > A payment is triggered only when $X > 300$:
> > $$P(X > 300) = 1 - F(300) = e^{-300/500} = e^{-0.6} \approx 0.5488$$
> > About 54.9% of losses exceed the deductible and generate a payment.

> [!example]- Expected Payment per Loss vs. per Payment {Example}
> Losses are $X \sim \text{Exp}(\theta = 500)$ with a deductible $d = 300$. Find the average payment across **all** losses, and the average payment across only those losses that produce a payment.
>
> > [!answer]-
> > Averaged over all losses (zeros included):
> > $$
> > \begin{align*}
> > E[(X - 300)_+] &= \theta e^{-d/\theta} \\
> >                &= 500\,e^{-0.6} \\
> >                &\approx 274.4
> > \end{align*}
> > $$
> > Averaged over payments only, condition on $X > 300$ and use memorylessness — the excess is again $\text{Exp}(500)$:
> > $$E[X - 300 \mid X > 300] = \theta = 500$$
> > The two differ by the factor $P(X > 300) = e^{-0.6} \approx 0.5488$, since $274.4 = 0.5488 \times 500$. Read carefully whether a question asks *per loss* or *per payment* — it is the most common way to lose a mark on this material.

> [!example]- Combining a Deductible and a Limit {Example}
> Losses are $X \sim \text{Exp}(\theta = 1000)$. A policy pays the excess over a deductible of 200, capped at a maximum payment of 800. Find the expected payment per loss.
>
> > [!answer]-
> > The payment is $Y = \min\bigl((X-200)_+,\ 800\bigr)$, which pays out only for $200 < X < 1000$ and pays a flat 800 above that. Write it as a difference of two excess-loss terms:
> > $$
> > \begin{align*}
> > E[Y] &= E[(X-200)_+] - E[(X-1000)_+] \\
> >      &= 1000\,e^{-0.2} - 1000\,e^{-1.0} \\
> >      &= 818.73 - 367.88 \\
> >      &\approx 450.85
> > \end{align*}
> > $$
> > Layering as a difference of excess-loss expectations avoids splitting the integral into three pieces, and works for any severity distribution — not just the exponential.

> [!example]- Calibrating $\theta$ from One Probability {Example}
> A waiting time is exponential, and 25% of waits end within 20 minutes. Find $\theta$, the probability a wait exceeds 50 minutes, and the median wait.
>
> > [!answer]-
> > Set $S(20) = 0.75$ and take logs:
> > $$
> > \begin{align*}
> > e^{-20/\theta} &= 0.75 \\
> > \theta &= \frac{-20}{\ln 0.75} \\
> >        &\approx 69.52
> > \end{align*}
> > $$
> > Then $P(X > 50) = e^{-50/69.52} \approx 0.487$. The survival power gives the same without $\theta$: $S(50) = S(20)^{50/20} = 0.75^{2.5} \approx 0.487$. The median is $\theta \ln 2 \approx 48.19$ minutes.
