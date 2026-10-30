---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:5aeeb4769c30b91ce83d9f745b76d820595587c9f464a4f7103623bdc6a81dd3
  sources:
    - "SOA, Tables for Exam C (Fall 2009), Appendix B.2 (a,b,0) class: B.2.1.1 Poisson (PDF p.14); B.2.1.2 geometric, B.2.1.3 binomial, B.2.1.4 negative binomial (PDF p.15), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 6.1 E(Sn)=np p.233 (PDF p.241); 6.2 binomial variance npq p.263 (PDF p.271), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q41 solution PDF pp.15-16 (binomial probabilities for independent months), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §6.2 Bernoulli trials E(X_j)=p, E(X_j^2)=p, V(X_j)=pq, p.261 (PDF p.269); §5.1 b(n,p,k)/b(n,p,k-1) = (lambda-(k-1)p)/(kq), p.189 (PDF p.197), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-10-30), §11.1 Introduction: indicator with P(X=1)=p is Bernoulli(p), X^n = X, E(X)=p, var(X)=p(1-p), sha256:1135f801453ae5f609152fdbe9c858a5b5e49abc9f7ae7277d97d07229333ee7 — https://www.randomservices.org/random/bernoulli/Introduction.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-10-30), §11.2 The Binomial Distribution: f_n(k) > f_n(k-1) iff p/k > (1-p)/(n-k+1); P[(X_1..X_n)=(x_1..x_n) | Y_n=k] = 1/C(n,k), not depending on p, sha256:223ab179871c6da69d1e68811192935c2f12d9762a62de02336f446dd47b10b9 — https://www.randomservices.org/random/bernoulli/Binomial.html"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-10-30), §1.4.2 Law of Total Probability, sha256:3f3ac7b3163c958cf94f52e1d3250235f12353a03aa086f2b90d4d03407a7b78 — https://www.probabilitycourse.com/chapter1/1_4_2_total_probability.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-10-30), §11.4 The Negative Binomial Distribution: V_k = n iff X_n = 1 and Y_(n-1) = k-1 (PDF of V_k); The Problem of Points, A wins n points before B wins m iff Y_(n+m-1) >= n, sha256:090f2543374cd589ff963f4addb35f897d0bd1c0c8ff5c08cc7086f659858916 — https://www.randomservices.org/random/bernoulli/NegativeBinomial.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Binomial Distribution.md
---

The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ independent Bernoulli trials, each with probability of success $p$.
- Requires trials to be independent, each trial to have exactly two outcomes, and $p$ to be constant across trials

> $$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$
>
> $$k = 0, 1, \ldots, n$$

- $E[X] = np$ and $\text{Var}(X) = np(1-p)$
- **Bernoulli is the case $n = 1$.** A random variable taking only the values 0 and 1 (an indicator) is Bernoulli with success probability $p = P(X = 1)$, i.e. $\text{Bin}(1, p)$. Since $X^2 = X$, $E[X] = E[X^2] = p$, so $\text{Var}(X) = p - p^2 = p(1-p)$ and $\text{SD}(X) = \sqrt{p(1-p)}$. The same holds for a 0/1 variable under a conditional distribution, with $p$ the conditional probability of a 1.
- **Ratios of two probabilities.** Dividing two binomial probabilities cancels the common powers of $p$ and $1-p$, leaving the binomial coefficients and a power of the odds $p/(1-p)$:

> $$\frac{P(X = j)}{P(X = k)} = \frac{\binom{n}{j}}{\binom{n}{k}}\left(\frac{p}{1-p}\right)^{j-k}$$

- For neighbouring values the ratio is $P(X = k+1)/P(X = k) = \dfrac{n-k}{k+1}\cdot\dfrac{p}{1-p}$. So when one point probability is stated as a multiple of another, divide the two pmf expressions and solve the simple equation left for the odds $p/(1-p)$ (or for $n$).
- **Unequal success probabilities.** If independent trials do not share one $p$, their total count is not binomial. Condition on the outcome of the differing trial and add the mutually exclusive cases (the law of total probability). With $N = B + Y$, where $B \sim \text{Bin}(m, p)$ and $Y \sim \text{Bernoulli}(q)$ are independent:

> $$P(N = k) = (1-q)\,P(B = k) + q\,P(B = k-1)$$

- With several differing trials, enumerate which of them succeed, multiply by the binomial probability for the identical trials in each case, and sum over the cases.
- **Where the first success falls.** The first success comes on trial $j$ with $k$ successes in all exactly when trials $1, \ldots, j-1$ all fail, trial $j$ succeeds, and the other $k-1$ successes fall among the $n-j$ later trials; by independence the pieces multiply:

> $$P(\text{first success on trial } j,\ X = k) = (1-p)^{j-1}\,p\,\binom{n-j}{k-1}p^{k-1}(1-p)^{n-j-k+1}$$

- **Given the count, the positions are equally likely.** Given $X = k$, every one of the $\binom{n}{k}$ sets of success positions has the same conditional probability $1/\binom{n}{k}$, whatever $p$ is, so a conditional probability about where the successes fell is the number of favourable position sets divided by $\binom{n}{k}$.

![[Media/Binomial_distribution_pmf.svg|450]]

![[Media/Figures/Binomial_Distribution.svg|340]]

> [!example]- Number of Claims in a Group Policy {Example}
> A group of 10 policyholders each independently file a claim with probability 0.3. Find the probability that exactly 4 file claims.
>
> > [!answer]-
> > $X \sim \text{Bin}(10, 0.3)$, so:
> > $$P(X = 4) = \binom{10}{4}(0.3)^4(0.7)^6 = 210 \times 0.0081 \times 0.117649 \approx 0.2001$$
