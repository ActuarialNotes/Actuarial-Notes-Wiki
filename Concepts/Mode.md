---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:3ef2bcee56e7f37d216b682ca9e407a4cc3f34db574005c27313a1fc207b0ac1
  sources:
    - "SOA, Tables for Exam C (Fall 2009; Loss Models 3rd ed. Appendices A-B excerpts), gamma mode = theta(alpha-1) (PDF p.9), exponential mode = 0 and lognormal mode = exp(mu - sigma^2) (PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA Exam P Sample Solutions (2026-05 file), Q137 (PDF p.40: integer Poisson parameter gives equal modes at the parameter and one less; P(N<=4)=0.815 first above 0.75), Q143-Q144 (PDF pp.40-41: constant of proportionality not needed for the mode), Q176 (PDF p.41), sha256:e10d2649bdf708541f87849c85ef6cde195019cfc8a46ee9647f6733d74d04b2 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "Siegrist, Random (randomservices.org), The Binomial Distribution: density maximal at floor((n+1)p); two consecutive modes m-1 and m when m=(n+1)p is an integer in 1..n, HTML fetched 2026-11-06, sha256:223ab179871c6da69d1e68811192935c2f12d9762a62de02336f446dd47b10b9 — https://www.randomservices.org/random/bernoulli/Binomial.html"
    - "Siegrist, Random (randomservices.org), The Poisson Process / Poisson distribution: single mode at floor(a) if a not an integer, consecutive modes a-1 and a if it is, HTML fetched 2026-11-06, sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "Siegrist, Random (randomservices.org), The Lognormal Distribution: mode exp(mu - sigma^2), median/quantile exp(mu + sigma Phi^-1(p)), HTML fetched 2026-11-06, sha256:cec8c0b516a0fcc03bb953f82c186e3faa8ec2eee2479caf48df2850bfe2c51c — https://www.randomservices.org/random/special/LogNormal.html"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, sec. 1.3.5.1 Measures of Location: mode the most frequent value, not necessarily unique; normal mean = median = mode; right tail heavier -> mean > median (exponential sample mean 1.001, median 0.684, mode 0.254), fetched 2026-11-06, sha256:33ce7517829e7097a99e8278bab71bc8ef71ac1d166edde5c07b8fa132466b98 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm"
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), PDF p.8 (premium based primarily on the expected value of the claim payments), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §4.1.1 PDF: range R_X = {x | f_X(x) > 0}, HTML fetched 2026-11-06, sha256:02e4d8947edff66799161896805adc05409f35f8774c1c912f5c5102b47cb3fd — https://www.probabilitycourse.com/chapter4/4_1_1_pdf.php"
    - "Pishro-Nik, probabilitycourse.com, §4.1.3 Functions of continuous random variables: strictly increasing g, f_Y(y) = f_X(x_1)/|g'(x_1)|, HTML fetched 2026-11-06, sha256:6ae3f48e0b435b90ce40f8c0ea72d109e655677fffbd0ebacb0b385d5f155788 — https://www.probabilitycourse.com/chapter4/4_1_3_functions_continuous_var.php"
    - "OpenStax Calculus Volume 1, §4.3 Maxima and Minima: absolute extrema at critical points or endpoints (endpoint extremum), HTML fetched 2026-11-06, sha256:ffdbe9045d9f5633b3a9364add16bde1cfbf3b1eb10f505c1982b73318e57de5 — https://openstax.org/books/calculus-volume-1/pages/4-3-maxima-and-minima"
    - "SOA Probability Exam syllabus, November 2026, Topic 2 learning outcomes c) (expected values incl. mode, median, percentiles) and e) (amount an insurance company pays to a policyholder given deductibles, coinsurance percentages, benefit limits, inflation), PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mode.md
---

A **Mode** of a [[Random Variable|random variable]] $X$ is a value at which its probability function or [[Probability Density Function (PDF)|density]] $f(x)$ is largest:

> $$\text{mode} = \arg\max_x f(x)$$

- The maximum is taken over the support of $X$, where $f(x) > 0$.

For a [[Discrete Random Variable|discrete]] $X$, the mode is the most likely value. For a [[Continuous Random Variable|continuous]] $X$, it is the peak of the density. A distribution or data set with two equal peaks has two modes. No value of a data set occurs more often than its modes, so the frequency at a mode is the largest frequency in the data set.

> [!example]- A fleet's claim counts for twelve months were 1, 2, 3, 3, 3, 4, 4, 4, 5, 2, 6 and 0. What is the mode? {Example}
> - The mode of a data set is its most frequent value.
> - The counts 3 and 4 each occur three times, more than any other count.
> - The data set has two modes, 3 and 4.

## The mode of a discrete distribution

The probabilities of a discrete distribution rise while the ratio of each probability to the one before it is above 1:

> $$\frac{f(k)}{f(k-1)} > 1$$

The mode is the last $k$ at which the ratio is at least 1. For a [[Poisson Distribution|Poisson]] with mean $\lambda$, the ratio is $\frac{\lambda}{k}$, and the mode is

> $$\lfloor \lambda \rfloor$$

- $\lfloor \lambda \rfloor$ is $\lambda$ rounded down.
- When $\lambda$ is a whole number, $\lambda - 1$ and $\lambda$ are both modes.

For a [[Binomial Distribution|binomial]] with $n$ trials and success probability $p$, the mode is

> $$\lfloor (n + 1)p \rfloor$$

- When $(n + 1)p$ is a whole number, $(n + 1)p - 1$ is a mode as well.

For a [[Geometric Distribution|geometric]] distribution, each probability is $1 - p$ times the one before it, so the probabilities only decrease. Its mode is the smallest value in its support, whatever $p$ is.

> [!example]- A fleet's monthly claim count $N$ is Poisson with mean 3.4. What is the most likely number of claims? {Example}
> Each probability is the one before it times $\frac{3.4}{k}$:
>
> | $k$ | $f(k)$ | $f(k)/f(k-1)$ |
> | --- | --- | --- |
> | 1 | 0.1135 | 3.40 |
> | 2 | 0.1929 | 1.70 |
> | 3 | 0.2186 | 1.13 |
> | 4 | 0.1858 | 0.85 |
>
> - The ratio drops below 1 between $k = 3$ and $k = 4$, so the probabilities rise up to 3 and fall after it.
> - The mode is 3, which agrees with $\lfloor 3.4 \rfloor = 3$.

## The mode of a continuous distribution

A mode inside the support of a continuous $X$ is a point where the density stops rising, which solves

> $$f'(x) = 0$$

Maximizing $\ln f(x)$ gives the same point, and is often easier. A constant in front of the density does not matter.

> [!example]- Claim sizes have density proportional to $x^2 e^{-x/500}$ for $x > 0$. What is the most likely claim size? {Example}
> - The constant doesn't matter, so maximize $\ln(x^2 e^{-x/500}) = 2\ln x - \frac{x}{500}$.
> - Its derivative is $\frac{2}{x} - \frac{1}{500}$, which is 0 at $x = 1{,}000$.
> - The second derivative, $-\frac{2}{x^2}$, is negative, so this point is a maximum.
> - The mode is 1,000. This is a [[Gamma|gamma]] density with $\alpha = 3$ and $\theta = 500$, whose mode is $(\alpha - 1)\theta$.

## The mode of a scaled variable

For a constant $c > 0$, the mode of $Y = cX$ is $c$ times the mode of $X$. The value $cx$ of $Y$ has the probability of the value $x$ of $X$, and a density only picks up the constant factor $\frac{1}{c}$, so the largest value moves from $x$ to $cx$.

## Mode, median and mean

The mode depends only on where the density is highest, so a long right tail pulls the [[Median|median]] and the [[Expected Value|mean]] above it. For a right-skewed distribution, mode < median < mean is typical.

The gamma claim size above has mode 1,000, median about 1,337 and mean 1,500. A [[Normal Distribution|normal]] distribution is symmetric about its mean $\mu$, so its mode, median and mean are all $\mu$.

> [!trap] A peak at an endpoint
> A density's largest value can sit at an end of its support, where $f'(x)$ is not 0. An [[Exponential Distribution|exponential]] density only falls, so its mode is 0. Compare the density at each critical point inside the support with its values at the endpoints.
