---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:f2b4a2d5e0cba8786e4e4e70c0dcb5dca753d4a593bd7496fe4f9430cee2e02d
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

The **Hypergeometric Distribution** models the number of successes in a sample of size $n$ drawn **without replacement** from a finite population of $N$ items, $K$ of which are successes. Unlike the [[Binomial Distribution|Binomial]], trials are not independent.

> $$P(X = k) = \frac{\dbinom{K}{k}\dbinom{N-K}{n-k}}{\dbinom{N}{n}}$$
>
> $$k = \max(0,\,n+K-N),\ldots,\min(n,K)$$
>
> $$\text{where } N = \text{population size},\; K = \text{successes in population},\; n = \text{sample size}$$

> $$E[X] = \frac{nK}{N}$$

> $$\text{Var}(X) = \frac{nK(N-K)(N-n)}{N^2(N-1)}$$

- With $p = K/N$, the mean is the binomial's $np$. The variance is the binomial's $np(1-p)$ multiplied by $(N-n)/(N-1)$, the finite population correction. The correction is below 1 whenever $n \geq 2$.
- Each success drawn leaves fewer successes for the next draw, so the draws pull against each other and the count varies less than a binomial count.
- When $N$ is large relative to $n$ the correction is close to 1, and the [[Binomial Distribution|binomial]] with $p = K/N$ is a close approximation.

> [!idea] The idea
> An auditor who draws policies without replacement changes the pool with every draw, so the draws are not independent trials. The hypergeometric distribution avoids following the draws by counting sets instead. Every set of $n$ items is equally likely to be drawn, so the probability of $k$ successes is the number of ways to choose $k$ of the successes, times the number of ways to fill the other places from the failures, over the number of ways to choose $n$.

![[Media/Hypergeometric_pmf.svg|500]]

![[Media/Figures/Hypergeometric_Distribution.svg|340]]

### More than two types: the multivariate hypergeometric

When sampling without replacement from a finite population divided into categories, the counts of each category in the sample follow a **multivariate hypergeometric distribution**.

- Drawing $n$ items without replacement from $N$ items split into types of sizes $K_1, \ldots, K_m$ ($K_1 + \cdots + K_m = N$), the probability of exactly $k_1, \ldots, k_m$ of each type ($k_1 + \cdots + k_m = n$) is the product of the binomial coefficients for each type's count divided by the binomial coefficient for the whole sample:

> $$P(k_1, \ldots, k_m) = \frac{\dbinom{K_1}{k_1}\dbinom{K_2}{k_2}\cdots\dbinom{K_m}{k_m}}{\dbinom{N}{n}}$$

- **Lumping:** when only one category matters, combine all the other categories into a single "other" group of $N - K$ items, where $K$ is the size of the category that matters. The count of that category is then the ordinary two-group hypergeometric above. Splitting the other group gives the same answer with more work.
- **Conditioning on one type:** given that $k_1$ of the $n$ draws fell in type 1, the other $n - k_1$ draws are a sample without replacement from the $N - K_1$ items outside type 1, so the conditional count of another type $j$ is hypergeometric with population $N - K_1$, $K_j$ successes and $n - k_1$ draws.

### The k-th success, drawing one at a time

- Drawing one at a time without replacement, the $k$-th success occurs exactly on draw $n$ if and only if the first $n-1$ draws contain exactly $k-1$ successes and draw $n$ is a success.
- The first part is a hypergeometric probability. Given it, $N-n+1$ items remain, $K-k+1$ of them successes, so draw $n$ is a success with conditional probability $(K-k+1)/(N-n+1)$:

> $$P = \frac{\dbinom{K}{k-1}\dbinom{N-K}{n-k}}{\dbinom{N}{n-1}} \cdot \frac{K-k+1}{N-n+1}$$

### Independent trials, given the number of successes

- If $n$ items each independently have an event with the same probability $p$, then given that exactly $k$ of them have it, every one of the $\binom{n}{k}$ subsets of size $k$ is equally likely to be the affected set. Each subset has probability $p^k(1-p)^{n-k}$, a common factor that cancels in the conditional probability.
- So the affected set is a simple random sample of size $k$ drawn without replacement from the $n$ items. The number of affected items in a subgroup of $K$ items is therefore hypergeometric (population $n$, $K$ successes, sample $k$). The probability $p$ drops out.

> [!example]- Three colours in one draw {Example}
> An urn holds 3 red, 4 blue and 5 green balls. Four are drawn without replacement. Find the probability of 1 red, 1 blue and 2 green.
>
> > [!answer]-
> > Multivariate hypergeometric with $N = 12$, $n = 4$:
> > $$
> > \begin{align*}
> > P &= \frac{\binom{3}{1}\binom{4}{1}\binom{5}{2}}{\binom{12}{4}} \\
> > &= \frac{3 \cdot 4 \cdot 10}{495} \\
> > &= 0.2424
> > \end{align*}
> > $$
> > The denominator counts every set of 4 from the 12. The numerator chooses within each colour and multiplies the counts.

> [!example]- Drawing Defective Items {Example}
> A box contains 10 insurance policies: 4 with errors and 6 without. An auditor selects 3 at random without replacement. Find the probability exactly 2 have errors.
>
> > [!answer]-
> > $N=10$, $K=4$, $n=3$, $k=2$:
> > $$P(X=2) = \frac{\binom{4}{2}\binom{6}{1}}{\binom{10}{3}} = \frac{6 \cdot 6}{120} = \frac{36}{120} = 0.30$$

> [!tip]- How it appears on the exam
> - **Exam P**: a committee, a sample of policies or a hand of cards drawn without replacement from two groups. The question asks for the probability of exactly $k$, the probability of "at least" $k$ as a short sum, or the expected count $nK/N$.
> - **Exam P**: three or more groups, handled with the multivariate form or with the two-group form after lumping. Some questions ask for a conditional variance of one group's count given another's.
> - **Exam P**: independent events with a common probability, given how many occurred, such as damaged items, corrupted files or employees with accidents. Six of the 21 Exam P questions tagged with this page have this shape. The probability $p$ cancels, and what is left is hypergeometric.
> - **Exam P**: inspecting one at a time until the $k$-th success, asking for the probability that it comes on a given draw.

> [!warning]- Exam traps
> - **Binomial on a small pool.** Treating draws without replacement from a few dozen items as independent trials with $p = K/N$ gives a nearby but wrong answer. Use the binomial only when the question allows replacement or the pool is very large.
> - **Carrying the given $p$ through.** When independent events are conditioned on their total, the stated probability (0.1, 0.2) is a distractor. Computing the unconditional probability from $p^k(1-p)^{n-k}$ terms and not dividing by the probability of the total gives a number that depends on $p$. The correct answer does not.
> - **The $k$-th success is not "$k$ successes in $n$ draws".** For the $k$-th success to land on draw $n$, the first $n-1$ draws hold exactly $k-1$ successes *and* draw $n$ is a success. The plain hypergeometric probability of $k$ successes in $n$ draws counts orders where the last success came earlier.
