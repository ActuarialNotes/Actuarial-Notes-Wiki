---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:8e80c309e760ac193ce8aa1f2ca5fd1e8f934a3d6d36590c608d23b04af6d31e
  sources:
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, p.286 Def. 7.1 convolution, PDF p.294, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, p.226 Def. 6.1 and Thm 6.6 variance identity, PDF pp.234, 266, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "https://www.randomservices.org/random/expect/Integral.html, 9. Expected Value as an Integral, Discrete Distributions, sha256:13db7b0f6f791843abcef65cf16e1214b8e745e3f9eeac74e01cc96fa3a032bc — https://www.randomservices.org/random/expect/Integral.html"
    - "https://www.probabilitycourse.com/chapter3/3_2_1_cdf.php, 3.2.1 Cumulative Distribution Function, sha256:910b2e66fd7bd071ad22fc4cf82cee8f5e3adf102e5ab75876050301e2bb8e43 — https://www.probabilitycourse.com/chapter3/3_2_1_cdf.php"
    - "https://www.probabilitycourse.com/chapter5/5_1_3_conditioning_independence.php, 5.1.3 Conditioning and Independence, sha256:850dd9e91b2a4bed994194bba7d64751bccf18af296e2eba51a0f7580c6a0b6a — https://www.probabilitycourse.com/chapter5/5_1_3_conditioning_independence.php"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Discrete Random Variable.md
---

A **Discrete Random Variable** is a [[Random Variable|random variable]] whose possible values form a finite or countably infinite set. The probability that a discrete random variable $X$ takes the value $x$ is its [[Probability Mass Function (PMF)|probability mass function]]:

> $$f(x) = P(X = x)$$

- $f(x) \ge 0$ for every $x$, and $\sum_x f(x) = 1$.

> [!example]- A policyholder's number of claims $X$ in a year is 0, 1, 2 or 3 with probabilities 0.60, 0.25, 0.10 and $f(3)$. What is $f(3)$? {Example}
> - The probabilities must add to 1.
> - $f(3)$ is $1 - 0.60 - 0.25 - 0.10$, which is $0.05$.

## Probabilities of events

The probability of an event is the sum of $f$ over the values in it. The [[Cumulative Distribution Function (CDF)|cumulative distribution function]] is

> $$F(x) = P(X \le x) = \sum_{k \le x} f(k)$$

Each value carries its own probability, so whether an endpoint is included matters: $P(X \le k) = P(X < k) + f(k)$.

For an integer-valued $X$ and a number $x$ that is not an integer, $P(X > x) = P(X \ge \lceil x \rceil)$, where $\lceil x \rceil$ is the next integer above $x$. More claims than a mean of 0.6 means at least 1 claim.

> [!example]- For the claim count above, what are the probabilities of fewer than 2 claims and of at least 2 claims? {Example}
> - "Fewer than 2" is $X \le 1$, so its probability is $F(1) = 0.60 + 0.25$, which is $0.85$.
> - "At least 2" is its complement, $1 - 0.85 = 0.15$.

> [!trap] Strict or weak inequality
> "Fewer than 2 claims" is $P(X \le 1) = 0.85$. Reading it as $P(X \le 2) = 0.95$ adds $f(2) = 0.10$. Write "fewer than", "at most" and "at least" as a set of values before summing.

## Expected value of a function

The [[Expected Value|expected value]] of a function $g(X)$ weights each value $g(x)$ by its probability:

> $$E[g(X)] = \sum_x g(x)\,f(x)$$

> [!example]- For the claim count above, what are $E[X]$, $E[X^2]$ and the variance? {Example}
> - $E[X]$ is $1(0.25) + 2(0.10) + 3(0.05)$, which is $0.60$.
> - With $g(x) = x^2$, $E[X^2]$ is $1(0.25) + 4(0.10) + 9(0.05)$, which is $1.10$.
> - The [[Variance|variance]] is $E[X^2] - (E[X])^2$, which is $1.10 - 0.60^2 = 0.74$.

## Sum of two independent discrete random variables

The probability that the sum of independent discrete random variables $X$ and $Y$ equals $s$ adds every pair of values that sums to $s$:

> $$P(X + Y = s) = \sum_x P(X = x)\,P(Y = s - x)$$

> [!example]- The claim count $X$ above and an independent count $Y$, with $P(Y = 0) = 0.7$ and $P(Y = 1) = 0.3$, are added. What is the probability that the total is at least 2? {Example}
> - $P(X + Y = 0) = 0.60(0.7) = 0.420$.
> - $P(X + Y = 1)$ is $0.25(0.7) + 0.60(0.3)$, which is $0.355$.
> - $P(X + Y \ge 2)$ is $1 - 0.420 - 0.355$, which is $0.225$.

When $X$ and $Y$ are not independent, each pair's probability comes from their [[Joint Probability Function|joint probability function]] instead of the product.
