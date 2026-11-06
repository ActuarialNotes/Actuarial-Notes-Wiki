---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:a255c5136d0f82ff6e11ef5b4fa0a3d02099545f7729f81255686c34944aa46c
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.1 geometric pmf P(T=j) = q^(j-1) p p.185 (PDF p.193); P(T > k) = q^k and memoryless P(T > r+s | T > r) = q^s, also obeyed by the exponential, p.186 (PDF p.194); 6.2 E(T) = 1/p p.262 (PDF p.270), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Tables for Exam C (Fall 2009), B.2.1.2 geometric (PDF p.15, page image), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Geometric Distribution.md
---

The **Geometric Distribution** $X \sim \text{Geom}(p)$ counts the number of independent trials up to and including the first success, when each trial succeeds with probability $p$. This page counts *trials*, so $X$ starts at 1.

> $$P(X = k) = (1-p)^{k-1}p, \quad k = 1, 2, 3, \ldots$$

> $$E[X] = \frac{1}{p}$$

> $$\text{Var}(X) = \frac{1-p}{p^2}$$

- $p \in (0, 1)$ is the probability of success on each trial.
- The other convention counts the *failures* before the first success, $Y = X - 1$, starting at 0. Its mean is $(1-p)/p$ and its variance is the same.
- The geometric is the discrete counterpart of the [[Exponential Distribution|exponential distribution]], and like it the geometric is memoryless.
- The [[Negative Binomial Distribution|negative binomial]] generalises it to the wait for the $r$-th success.

> [!idea] The idea
> The first success comes on trial $k$ only if the first $k - 1$ trials all fail and trial $k$ succeeds. So each extra trial multiplies the probability by $1 - p$, and the probabilities fall away geometrically. A success that comes one time in five takes five trials on average.

![[Media/Geometric_pmf.svg|500]]

![[Media/Figures/Geometric_Distribution.svg|340]]

## When does the first claim come?

Each policy in a file independently has a 20% chance of generating a claim. An analyst reviews policies one at a time until the first claim. The number reviewed is $X \sim \text{Geom}(0.2)$.

| Policy $k$ | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| $P(X = k)$ | 0.2000 | 0.1600 | 0.1280 | 0.1024 | 0.0819 |

- Each probability is the one before it times 0.8.
- The first policy is always the most likely place for the first claim.

## The first $n$ all fail

"No claim in the first 3 policies" is the same event as $X > 3$. It needs three failures in a row, so no sum is needed.

> $$P(X > n) = (1-p)^n$$

- $P(X > 3) = 0.8^3 = 0.512$, so $P(X \leq 3) = 0.488$.
- Summing the PMF from 4 to infinity gives the same answer with more work.

## The mean and the variance

Why is the mean $1/p$? Condition on the first trial. With probability $p$ the wait is over after one trial. Otherwise one trial is used and the wait starts afresh. So $E[X] = 1 + (1-p)E[X]$, which gives $1/p$.

- For the policies, $E[X] = 1/0.2 = 5$.
- $\text{Var}(X) = 0.8/0.04 = 20$. The standard deviation, about 4.5, is nearly as large as the mean, because long waits are quite possible.

## Memorylessness

Eight policies have been reviewed with no claim. What is the probability that the first claim comes after the 10th policy?

> $$P(X > m + n \mid X > m) = P(X > n)$$

- $P(X > 10 \mid X > 8) = 0.8^{10}/0.8^{8} = 0.8^2 = 0.64$.
- The eight claim-free reviews carry no information about the rest of the wait. A claim does not "become due".

> [!trap] Counting the wait from the start
> After 8 failures the remaining wait is again geometric, starting from the next trial. Answering $P(X > 10) = 0.8^{10} \approx 0.107$ ignores the condition.

## Counting failures instead

Some questions count the failures before the first success, $Y = X - 1$. The two conventions differ by exactly one trial.

| | Trials $X$ | Failures $Y$ |
|---|---|---|
| Values | $1, 2, \ldots$ | $0, 1, \ldots$ |
| PMF | $(1-p)^{k-1}p$ | $(1-p)^k p$ |
| Mean | $1/p$ | $(1-p)/p$ |
| Variance | $(1-p)/p^2$ | $(1-p)/p^2$ |

- For the policies, the expected number of claim-free policies before the first claim is $0.8/0.2 = 4$.
- A PMF given as $(1-p)^k p$ for $k = 0, 1, \ldots$ is the failures form. Read the support before using a formula.

## Where geometric counts hide

A geometric count appears whenever independent periods each have the same chance of a first event.

- If accidents in a year are [[Poisson Distribution|Poisson]] with mean $\lambda$, independently from year to year, each year has an accident with probability $1 - e^{-\lambda}$. The year of the first accident is geometric with that $p$.
- Rolling a die until the first 5 is geometric with $p = 1/6$. Suppose you are told the first 6 came on roll 1. Then roll 1 was not a 5, and the wait for a 5 starts again on roll 2 with the same $p$. The conditioning changes the trials it names and leaves the rest alone.

## On other exams

- **FAM, MAS-I and ASTAM** use the Loss Models form, which counts failures and has parameter $\beta = (1-p)/p$.

> $$P(N = k) = \frac{\beta^k}{(1+\beta)^{k+1}}, \quad k = 0, 1, \ldots$$

- Its mean is $\beta$ and its variance is $\beta(1+\beta)$. A geometric claim count "with mean 4" has $\beta = 4$.
- It is the [[Negative Binomial Distribution|negative binomial]] with $r = 1$, and a member of the $(a, b, 0)$ class of [[Frequency Distribution|frequency distributions]].

## Try it

> [!example]- First accident year {Example}
> A driver's accidents each year are Poisson with mean 0.2, independently from year to year. Find the probability that the driver's first accident occurs in year 4.
>
> > [!answer]-
> > **Plan:** a year "succeeds" if it has at least one accident, so the first such year is geometric.
> > $$p = 1 - e^{-0.2} \approx 0.1813$$
> > $$P(X = 4) = (e^{-0.2})^3(1 - e^{-0.2}) = e^{-0.6} - e^{-0.8} \approx 0.0995$$

> [!example]- After a claim-free run {Example}
> The number of years until a policyholder first files a claim is geometric with $p = 0.3$. No claim has been filed in the first 4 years. Find the probability that the first claim is filed after year 6.
>
> > [!answer]-
> > **Plan:** memorylessness restarts the wait after year 4.
> > $$P(X > 6 \mid X > 4) = P(X > 2) = 0.7^2 = 0.49$$
> > The four claim-free years do not make a claim more likely now.

> [!example]- A PMF in the failures form {Example}
> A claim count $N$ has PMF $P(N = k) = \frac{1}{3}\left(\frac{2}{3}\right)^k$ for $k = 0, 1, 2, \ldots$. Find $E[N]$, $\text{Var}(N)$ and $P(N \geq 3)$.
>
> > [!answer]-
> > **Plan:** the support starts at 0, so this is the failures form with $p = 1/3$.
> > $$E[N] = \frac{2/3}{1/3} = 2$$
> > $$\text{Var}(N) = \frac{2/3}{1/9} = 6$$
> > $N \geq 3$ means the first three trials all failed, so $P(N \geq 3) = (2/3)^3 \approx 0.2963$.
> > Why not $1/p = 3$? That is the mean number of trials, one more than the number of failures.

> [!warning]- Exam traps
> - **Trials or failures.** Using $1/p$ for a count that starts at 0 overstates the mean by 1. Check the support or the wording.
> - **Summing the tail.** $P(X > n) = (1-p)^n$ directly.
> - **Ignoring memorylessness.** After $m$ failures, the remaining wait has the original distribution.
> - **The Loss Models $\beta$.** $\beta$ is the mean of the failures count, not a success probability. Convert with $p = 1/(1+\beta)$.
