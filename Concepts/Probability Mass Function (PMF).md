---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:42b77779963a339543198fb3b3ef7f1d5126059f51af59e723cbd5ba303323d7
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Definition 1.2 distribution function m(omega) >= 0 and sum = 1 (PDF p.27), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 4a: Discrete Random Variables, §2 definition (PDF p.2), cdf definition (PDF p.3), §2.8 Properties of the cdf (PDF pp.5-6), sha256:ff2a10e7ef1c0f5ef300ed8f73864d365ca5adcdf9775d1c4a6f356ee7687b5d — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class04-prep-a.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §3.1.3 Probability Mass Function, sha256:d0663822dac70b28920bf443d4d5a8f923d61b1c62e11b7d0b530638cf625ff8 — https://www.probabilitycourse.com/chapter3/3_1_3_pmf.php"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Probability Mass Function (PMF).md
---

A **Probability Mass Function (PMF)** is the function that gives the [[Probability|probability]] that a [[Discrete Random Variable|discrete random variable]] $X$ equals each of its possible values $x$. The PMF of $X$ is

> $$f(x) = P(X = x)$$

> [!example]- A fair die is rolled and $X$ is the number showing. What is the PMF of $X$, and what is $P(X \le 2)$? {Example}
> - Each of the six faces is equally likely, so $f(x) = \frac{1}{6}$ for $x = 1, 2, \ldots, 6$.
> - The six probabilities sum to $6 \times \frac{1}{6} = 1$.
> - The probability of at most 2 is $f(1) + f(2) = \frac{2}{6} = \frac{1}{3}$.

## Requirements of a probability mass function

A function $f$ is a PMF only if every value is non-negative,

> $$f(x) \ge 0$$

and the probabilities of all possible values of $X$ sum to 1:

> $$\sum_{\text{all } x} f(x) = 1$$

The second requirement is what solves for an unknown constant in a PMF, or for the probability of the one value a question leaves out. It also checks a marginal distribution worked out from a joint table: its probabilities must total 1.

> [!example]- A random variable $X$ has PMF $f(x) = cx$ for $x = 1, 2, 3, 4$. What are $c$ and $P(X \ge 3)$? {Example}
> - The probabilities must sum to 1, so $c(1 + 2 + 3 + 4) = 10c = 1$.
> - The constant is $c = \frac{1}{10}$.
> - The probability of at least 3 is $f(3) + f(4) = \frac{3}{10} + \frac{4}{10} = 0.7$.
