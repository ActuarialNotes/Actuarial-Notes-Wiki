---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:e79179ce6af3b18cd70e86131a10a67a6c17814109ceb5e7a51a529043f82eb5
  sources:
    - "SOA, Tables for Exam C (Fall 2009), Appendix B.2 (a,b,0) class: B.2.1.1 Poisson (PDF p.14); B.2.1.2 geometric, B.2.1.3 binomial, B.2.1.4 negative binomial (PDF p.15), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 6.2 Poisson as the limit of binomial with n to infinity, p to 0, np = lambda fixed, and variance lambda, p.263 (PDF p.271), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P Sample Questions (Aug 2026 revision), 14 questions modelling claim counts as Poisson, sha256:e47245963f7d2c1c4f8cc5ff1baf2090542d923ac47cbeb27d1f657ac51bf5f0 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-questions.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §5.1 eq. 5.2 Poisson pmf, P(X=0) ~ e^-lambda, p.189 (PDF p.197), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "OpenStax Calculus Volume 2 (HTML fetched 2026-10-30), §6.3 Taylor and Maclaurin Series, Example 6.16: Maclaurin series of e^x = sum x^n/n!, converging for all x, sha256:d31b601074d1b8cc7241191e2d4ec581e3524ae4ec5907a6c500f2ad4683f9dd — https://openstax.org/books/calculus-volume-2/pages/6-3-taylor-and-maclaurin-series"
    - "OpenStax Calculus Volume 1 (HTML fetched 2026-10-30), §1.5 Exponential and Logarithmic Functions: natural log as inverse of e^x; Hyperbolic Functions, cosh x = (e^x + e^-x)/2, sha256:bb31120fbd3eefab30afe72f26fb353e84b3d34084c59d0f8b0521d1b4703113 — https://openstax.org/books/calculus-volume-1/pages/1-5-exponential-and-logarithmic-functions"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Poisson Distribution.md
---

The **Poisson Distribution** $X \sim \text{Poi}(\lambda)$ models the number of events in a fixed interval of time or space, when events happen independently at a constant average rate $\lambda$.

> $$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}, \quad k = 0, 1, 2, \ldots$$

- $\lambda > 0$ is the mean number of events in the interval.
- The mean and the variance are both $\lambda$.

> $$E[X] = \text{Var}(X) = \lambda$$

> [!idea] The idea
> Events that are individually rare but have many chances to happen produce a Poisson count. Claims on a large portfolio are the standard case. Each policy is unlikely to claim, but there are many policies, so the number of claims settles around a steady average $\lambda$.

![[Media/Poisson_pmf.svg|500]]

![[Media/Figures/Poisson_Distribution.svg|340]]

## Claims in one month

Claims arrive at an average rate of 3 per month, so the monthly count is Poisson with $\lambda = 3$.

| Claims $k$ | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| $P(X = k)$ | 0.0498 | 0.1494 | 0.2240 | 0.2240 | 0.1680 | 0.1008 |

- The most likely counts are 2 and 3, close to the mean.
- Each probability is the one before it times $\lambda / k$. For example, $P(X = 4) = 0.2240 \times 3/4 = 0.1680$. This is quicker than recomputing each term from scratch.

> $$P(X = k) = P(X = k - 1) \cdot \frac{\lambda}{k}$$

"At least" questions are faster through the complement. The probability of at least 2 claims is one minus the probability of 0 or 1.

> $$P(X \ge 2) = 1 - 0.0498 - 0.1494 = 0.8009$$

## Working back from "no claims"

The probability of no events is $e^{-\lambda}$. So a question that states the probability of no events, or of at least one, has told you $\lambda$.

> $$\lambda = -\ln P(X = 0)$$

- If 5% of months have no claims, then $\lambda = -\ln 0.05 \approx 3.0$.
- A question can also relate the zero probabilities of two Poisson counts, such as "a second portfolio is half as likely to have no claims". Write that as an equation between the probabilities, $e^{-\lambda_2} = 0.5\,e^{-\lambda_1}$, and take logarithms. It is not a statement about the means.

> [!trap] Halving the mean
> "Half as likely to have no claims" does not mean half the mean. With $\lambda_1 = 2$, it gives $\lambda_2 = 2 + \ln 2 \approx 2.69$.

## Where the Poisson comes from

The Poisson is the limit of the [[Binomial Distribution|binomial]] when there are many trials, each with a small probability.

- Take $n$ trials with success probability $p$. Let $n \to \infty$ and $p \to 0$ while $np = \lambda$ stays fixed. The binomial count approaches $\text{Poi}(\lambda)$.
- 200 policies, each claiming with probability 0.01, give a binomial count with $P(X \ge 2) \approx 0.5954$. The Poisson with $\lambda = 2$ gives $0.5940$.

## Even or odd counts

Some questions ask for the probability of an even number of events. Adding the series for $e^{\lambda}$ and $e^{-\lambda}$ cancels the odd powers and doubles the even ones. Multiplying by $e^{-\lambda}$ then gives the even and odd probabilities.

> $$P(X \text{ even}) = \frac{1 + e^{-2\lambda}}{2}$$

> $$P(X \text{ odd}) = \frac{1 - e^{-2\lambda}}{2}$$

- For $\lambda = 3$, $P(X \text{ even}) \approx 0.5012$. For any $\lambda$, even counts are slightly more likely, because 0 is even.

## Try it

> [!example]- At least two claims {Example}
> Claims follow a Poisson distribution with mean 3 per month. Find the probability of at least two claims in a month.
>
> > [!answer]-
> > **Plan:** use the complement, since "at least 2" has infinitely many terms.
> > $$P(X \ge 2) = 1 - e^{-3} - 3e^{-3} = 1 - 4e^{-3} \approx 0.8009$$

> [!example]- Two portfolios {Example}
> Portfolio A has a Poisson claim count with mean 2. Portfolio B's count is also Poisson, and B is half as likely as A to have no claims. Find the mean of B.
>
> > [!answer]-
> > **Plan:** turn the sentence into an equation between zero probabilities.
> > $$e^{-\lambda_B} = 0.5\,e^{-2}$$
> > $$\lambda_B = 2 + \ln 2 \approx 2.69$$

> [!example]- An even number of claims {Example}
> The number of claims in a year is Poisson with mean 3. Find the probability that the number of claims is even.
>
> > [!answer]-
> > $$P(X \text{ even}) = \frac{1 + e^{-6}}{2} \approx 0.5012$$

> [!warning]- Exam traps
> - **Summing an infinite tail.** For "at least $k$", subtract the first $k$ terms from 1.
> - **Treating a probability statement as a statement about $\lambda$.** "Half as likely to have no claims" is an equation in $e^{-\lambda}$.
> - **Forgetting $k = 0$.** The Poisson starts at 0, and $P(X = 0) = e^{-\lambda}$ is the term most often left out of a complement.
