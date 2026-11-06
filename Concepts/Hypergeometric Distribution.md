---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:468d3a5c061f7b1d1b3394e949322dd03b61654d75f07ece9e5cf5d7740289f0
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.1 hypergeometric h(N,k,n,x)=C(k,x)C(N-k,n-x)/C(N,n) p.193 (PDF p.201), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "K. Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services, UAH), The Hypergeometric Distribution, Moments section: E(Y) = n r/m, var(Y) = n (r/m)(1 - r/m)(m - n)/(m - 1), fetched 2026-09-27, sha256:56414fcd41140fbad38e3e39034536cd06144012f8457ed797740bec97e44487 — https://www.randomservices.org/random/urn/Hypergeometric.html"
    - "H. Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), fetched 2026-09-27, 3.1.5 hypergeometric range max(0,k-r)..min(k,b), sha256:bccbfaa60f1813544eb18810fd601ea98e2e89e80c5d50f76aa6ea10a6096a72 — https://www.probabilitycourse.com/chapter3/3_1_5_special_discrete_distr.php; 3.2.5 EX=kb/(b+r), sha256:71f926e8d746785af219018a406d4b28b9aac9e283a7c501119fc6c94584f86e — https://www.probabilitycourse.com/chapter3/3_2_5_solved3_2.php"
    - "K. Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), fetched 2026-10-30, Finite Sampling Models §3 The Multivariate Hypergeometric Distribution (joint pdf; grouping 'preserved when the counting variables are combined'; conditional distribution given (Y_j: j∈B) multivariate hypergeometric with (m_i: i∈A) and z) sha256:ce429ccb0682c9be25603fb52bab837daa32b2910c2aeba0603daf193a8cf978 — https://www.randomservices.org/random/urn/MultiHypergeometric.html"
    - "K. Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), fetched 2026-10-30, Finite Sampling Models §8 Pólya's Urn Process ('c = -1 corresponds to sampling without replacement'; P(X_{n+1}=1 | k reds in n) = (a+kc)/(a+b+nc); trial number of the kth red ball: 'V_k = n if and only if Y_{n-1} = k-1 and X_n = 1', P(V_k=n) = P(Y_{n-1}=k-1)P(X_n=1 | Y_{n-1}=k-1)) sha256:5353056b0885451d1520fc843eeddc037e28d2d364bf019e780d2878e5e64918 — https://www.randomservices.org/random/urn/Polya.html"
    - "K. Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), fetched 2026-10-30, Bernoulli Trials §2 The Binomial Distribution (given Y_n = k, P[(X_1..X_n)=x | Y_n=k] = 1/C(n,k), 'does not depend on p'; successes 'a random sample of size k chosen without replacement') sha256:223ab179871c6da69d1e68811192935c2f12d9762a62de02336f446dd47b10b9 — https://www.randomservices.org/random/bernoulli/Binomial.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §5.1 Hypergeometric Distribution p.193 (PDF p.201: h(N,k,n,x) = C(k,x)C(N-k,n-x)/C(N,n), every sample of size n counted equally; tends to binomial(n, k/N) as N, k -> infinity with k/N fixed), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist (randomservices.org), The Hypergeometric Distribution: var(Y) = n (r/m)(1 - r/m)(m - n)/(m - 1); draws negatively correlated; convergence to the binomial (n, p) as m -> infinity with r_m/m -> p, and of the mean and variance, HTML fetched 2026-11-04, sha256:56414fcd41140fbad38e3e39034536cd06144012f8457ed797740bec97e44487 — https://www.randomservices.org/random/urn/Hypergeometric.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Theorem 6.2 and the remark after it ('expectations add, whether or not the summands are mutually independent') pp.231-232 (PDF pp.239-240); §2.2 p.60 (PDF p.68: f(x) is not the probability of x, f(3/4) = 3/2); §5.1 Hypergeometric p.193 (PDF p.201: counts samples of size n; tends to binomial as N, k -> infinity), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Hypergeometric Distribution.md
---

The **Hypergeometric Distribution** models the number of successes $X$ in a sample of $n$ items drawn **without replacement** from a finite population of $N$ items, $K$ of which are successes.

> $$P(X = k) = \frac{\dbinom{K}{k}\dbinom{N-K}{n-k}}{\dbinom{N}{n}}$$

> $$E[X] = \frac{nK}{N}$$

> $$\text{Var}(X) = \frac{nK(N-K)(N-n)}{N^2(N-1)}$$

- $N$ is the population size, $K$ the number of successes in it and $n$ the sample size.
- $k$ runs from $\max(0,\, n + K - N)$ to $\min(n, K)$.
- Unlike the [[Binomial Distribution|binomial]], the draws are not independent. Each draw changes what is left for the next.

> [!idea] The idea
> An auditor who draws policies without replacement changes the pool with every draw, so the draws are not independent trials. The hypergeometric avoids following the draws by counting sets instead. Every set of $n$ items is equally likely, so the probability is the number of ways to choose $k$ successes, times the ways to fill the other places from the failures, over the ways to choose $n$.

![[Media/Hypergeometric_pmf.svg|500]]

![[Media/Figures/Hypergeometric_Distribution.svg|340]]

## How many of the three have errors?

A file holds 10 insurance policies, 4 with errors and 6 without. An auditor selects 3 at random without replacement. There are $\binom{10}{3} = 120$ equally likely samples.

| Errors $k$ | Samples $\binom{4}{k}\binom{6}{3-k}$ | $P(X = k)$ |
|---|---|---|
| 0 | 20 | 0.1667 |
| 1 | 60 | 0.5000 |
| 2 | 36 | 0.3000 |
| 3 | 4 | 0.0333 |

- For $k = 2$, choose 2 of the 4 policies with errors and 1 of the 6 without, giving $6 \times 6 = 36$ samples.
- "At least 2" is a short sum, $0.30 + 0.0333 = 0.3333$.

## The mean and the variance

Each of the 3 policies drawn has an error with probability $4/10$, whichever draw it is. Expected values add, whether or not the draws are independent, so $E[X] = 3 \times 0.4 = 1.2$.

The variance is where the dependence shows. Each error drawn leaves fewer errors for the next draw, so the draws pull against each other.

- With $p = K/N$, the variance is the binomial's $np(1-p)$ times the **finite population correction** $(N-n)/(N-1)$.
- For the auditor, $3(0.4)(0.6) = 0.72$, and $0.72 \times 7/9 = 0.56$.
- The correction is below 1 whenever $n \geq 2$, so the hypergeometric count varies less than a binomial count.

## Compared with the binomial

What if the auditor replaced each policy before the next draw? The count would be $\text{Bin}(3, 0.4)$, with $P(X = 2) = 0.288$ instead of 0.300.

- On a pool of 10 the difference is visible. On a pool of 1,000 with 400 errors, the hypergeometric gives 0.2881 and the binomial 0.2880.
- When $N$ is large relative to $n$, the correction is close to 1, and the binomial with $p = K/N$ is a close approximation.

> [!trap] Binomial on a small pool
> Treating draws from a few dozen items as independent trials with $p = K/N$ gives a nearby but wrong answer. Use the binomial only when the question allows replacement or the pool is very large.

## The second error, drawing one at a time

The auditor now draws policies one at a time. What is the probability that the second error turns up on the 3rd draw?

The second error is on draw 3 exactly when the first 2 draws hold exactly 1 error and draw 3 is an error.

- The first part is hypergeometric, $\binom{4}{1}\binom{6}{1}/\binom{10}{2} = 24/45$.
- Given that, 8 policies remain and 3 have errors, so draw 3 is an error with probability $3/8$.
- The product is $\frac{24}{45} \times \frac{3}{8} = 0.2$.

In general, the $k$-th success comes on draw $n$ with this probability.

> $$P = \frac{\dbinom{K}{k-1}\dbinom{N-K}{n-k}}{\dbinom{N}{n-1}} \cdot \frac{K-k+1}{N-n+1}$$

## More than two types

Suppose the 4 errors are 3 premium errors and 1 coverage error. The sample now has three kinds of policy. The counts of each kind follow the **multivariate hypergeometric distribution**.

> $$P(k_1, \ldots, k_m) = \frac{\dbinom{K_1}{k_1}\dbinom{K_2}{k_2}\cdots\dbinom{K_m}{k_m}}{\dbinom{N}{n}}$$

- Here the population splits into types of sizes $K_1, \ldots, K_m$ that add to $N$, and the sample counts $k_1, \ldots, k_m$ add to $n$.
- One premium error, one coverage error and one clean policy has probability $\binom{3}{1}\binom{1}{1}\binom{6}{1}/120 = 18/120 = 0.15$.
- **Lumping.** When only one type matters, combine all the others into one group of $N - K$ items. The count of that type is then the ordinary hypergeometric.
- **Conditioning on one type.** Given that $k_1$ of the $n$ draws fell in type 1, the other $n - k_1$ draws are a sample without replacement from the $N - K_1$ items outside type 1. So the conditional count of another type $j$ is hypergeometric with population $N - K_1$, $K_j$ successes and $n - k_1$ draws.

## Independent events, given how many occurred

Eight claim files are each independently corrupted with probability 0.1. Exactly 3 are corrupted. What is the probability that exactly 1 of the first 4 files is corrupted?

Every set of 3 corrupted files has the same probability, $0.1^3 \times 0.9^5$. Given the total, that common factor cancels, so each of the $\binom{8}{3}$ sets is equally likely. The corrupted set is a sample of 3 drawn without replacement from the 8 files.

- The count among the first 4 is hypergeometric with $N = 8$, $K = 4$ and $n = 3$.
- $P = \binom{4}{1}\binom{4}{2}/\binom{8}{3} = 24/56 \approx 0.4286$.
- The probability 0.1 drops out of the answer.

## Try it

> [!example]- Fraudulent claims in an audit {Example}
> Of 20 claims, 5 are fraudulent. An investigator selects 4 at random without replacement. Find the probability that at least one is fraudulent, and compare it with the binomial answer.
>
> > [!answer]-
> > **Plan:** use the complement, the probability of no fraudulent claims.
> > $$P(X = 0) = \frac{\binom{15}{4}}{\binom{20}{4}} = \frac{1365}{4845} \approx 0.2817$$
> > So $P(X \geq 1) \approx 0.7183$. Treating the draws as independent with $p = 0.25$ gives $1 - 0.75^4 \approx 0.6836$, which is too low on a pool of 20.
> > Why higher? Each clean claim drawn leaves a pool richer in fraudulent ones.

> [!example]- Three colours in one draw {Example}
> A bin holds 3 auto, 4 home and 5 liability claim files. Four are drawn without replacement. Find the probability of 1 auto, 1 home and 2 liability files.
>
> > [!answer]-
> > **Plan:** multivariate hypergeometric with $N = 12$ and $n = 4$.
> > $$P = \frac{\binom{3}{1}\binom{4}{1}\binom{5}{2}}{\binom{12}{4}} = \frac{3 \times 4 \times 10}{495} \approx 0.2424$$
> > The denominator counts every set of 4 from the 12. The numerator chooses within each type and multiplies.

> [!example]- The given probability is a distractor {Example}
> Ten employees each independently have an accident in the year with probability 0.2. Exactly 2 have accidents. Four of the ten work night shifts. Find the probability that neither accident was on the night shift.
>
> > [!answer]-
> > **Plan:** given the total, the 2 employees with accidents are a sample without replacement from the 10.
> > $$P = \frac{\binom{6}{2}}{\binom{10}{2}} = \frac{15}{45} \approx 0.3333$$
> > Why does 0.2 not appear? Every pair of employees has the same probability $0.2^2 \times 0.8^8$, and it cancels in the conditional probability.

> [!warning]- Exam traps
> - **Binomial on a small pool.** Draws without replacement are dependent. Use the hypergeometric unless the pool is very large.
> - **Carrying the given $p$ through.** When independent events are conditioned on their total, the stated probability is a distractor. An answer that depends on $p$ has not divided by the probability of the total.
> - **The $k$-th success is not "$k$ successes in $n$ draws".** For the $k$-th success to land on draw $n$, the first $n-1$ draws hold exactly $k-1$ successes and draw $n$ is a success.
> - **Forgetting the correction.** $np(1-p)$ alone overstates the variance by the factor $(N-1)/(N-n)$.
