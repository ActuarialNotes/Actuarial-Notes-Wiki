---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:c365700a05771657fea101d33ecad34fecc390eb546f8704794abf31da1be99a
  sources:
    - "SOA, Tables for Exam C (Fall 2009; Loss Models 3rd ed. Appendices A-B excerpts), Gamma A.3.2.1 (PDF p.9), Exponential A.3.3.1 and Lognormal (PDF p.11), Poisson B.2.1.1 (PDF p.14), Binomial (PDF p.15), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q137 (PDF p.40), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, sec. 1.3.5.1 Measures of Location (fetched 2026-09-27), sha256:0a089979887b22d95c06e33973825f6222d73b60f1cde964df479a13bbd7d1d3 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm"
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), pooling section (CV = SD/mean; sqrt(n) sigma less than n sigma) and benefit-limit section (premium based primarily on expected claim payments), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "SOA Probability Exam syllabus, November 2026, univariate random variables learning objectives c) (expected values incl. moments, mode, median, percentiles) and d) (variance, standard deviation, coefficient of variation), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-10-30), §9.1.2 MAP estimation: f_Y(y) does not depend on x, so equivalently maximize f_(Y|X)(y|x) f_X(x), sha256:ac2073c4bbdc2b19af26236bf2d63402a9b5148981fb7bb796b6c0b6f8f9db28 — https://www.probabilitycourse.com/chapter9/9_1_2_MAP_estimation.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-10-30), §4.1.1 PDF, Range R_X = {x | f_X(x) > 0}, sha256:20e46d6010878510f8f2fb209f72164daf90f0c7379d7d764099b84fc4bdab68 — https://www.probabilitycourse.com/chapter4/4_1_1_pdf.php"
    - "OpenStax Calculus Volume 1 (HTML fetched 2026-10-30), §4.3 Maxima and Minima, Problem-Solving Strategy: Locating Absolute Extrema over a Closed Interval, sha256:ffdbe9045d9f5633b3a9364add16bde1cfbf3b1eb10f505c1982b73318e57de5 — https://openstax.org/books/calculus-volume-1/pages/4-3-maxima-and-minima"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-10-30), §4.1.3 Functions of continuous random variables, Theorem for strictly monotonic g: f_Y(y) = f_X(x_1)/|g'(x_1)| with g(x_1)=y, sha256:835de7fe604e1ea63a96adfd2249b2233249f90fd70dd314ea3bdfa0371d9979 — https://www.probabilitycourse.com/chapter4/4_1_3_functions_continuous_var.php"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mode.md
---

The **Mode** of a [[Random Variable]] $X$ is the value at which its [[Probability Mass Function (PMF)|PMF]] or [[Probability Density Function (PDF)|PDF]] $f(x)$ is largest. For a [[Discrete Random Variable|discrete]] variable it is the single most likely value, and for a [[Continuous Random Variable|continuous]] one it is the peak of the density.

> $$\text{mode} = \arg\max_{x}\, f(x)$$

- The maximum is taken over the support of $X$ only. A density is 0 outside its support.
- A mode need not be unique. A distribution with two or more equal peaks has two or more modes.
- Compared with the [[Median|median]] and the [[Expected Value|mean]]: the mode ignores the tail entirely. For a right-skewed claim size, mode < median < mean is typical.

> [!idea] The idea
> The mode asks only where the probability is most concentrated, so it compares heights of $f$ and nothing else. That is why the normalizing constant never matters, why a long tail never moves it, and why a density that only falls has its mode at the left end.

## Which claim count is most likely?

A fleet's monthly claim count $N$ is [[Poisson Distribution|Poisson]] with mean 3.4. Each probability is the one before it times $3.4/k$, so the probabilities rise while that ratio is above 1.

| $k$ | $p(k)$ | $p(k)/p(k-1)$ |
|---|---|---|
| 1 | 0.1135 | 3.40 |
| 2 | 0.1929 | 1.70 |
| 3 | 0.2186 | 1.13 |
| 4 | 0.1858 | 0.85 |
| 5 | 0.1264 | 0.68 |

The ratio drops below 1 between $k = 3$ and $k = 4$, so the mode is 3. Three claims is the likeliest month, yet it happens in only about 22% of months.

The same comparison of neighbours gives the standard results.

> $$\text{Poisson: mode} = \lfloor \lambda \rfloor$$

> $$\text{Binomial: mode} = \lfloor (n+1)p \rfloor$$

- When $\lambda$ is an integer, $\lambda - 1$ and $\lambda$ are both modes. With $\lambda = 3$, $p(2) = p(3) = 0.2240$.
- When $(n+1)p$ is an integer, $(n+1)p - 1$ is a mode as well.

## When the peak is shared

The fleet's claim counts for twelve months were 1, 2, 3, 3, 3, 4, 4, 4, 5, 2, 6 and 0. The mode of a data set is the most frequent value.

| Count | 2 | 3 | 4 |
|---|---|---|---|
| Months | 2 | 3 | 3 |

The counts 3 and 4 each occur three times, so the data set has two modes. A uniform distribution goes further: every point of its support is a mode. A mixture of two claim populations, such as small and large claims, can have one peak for each.

## The most likely claim size

The fleet's claim sizes have density proportional to $x^2 e^{-x/500}$ for $x > 0$. This is a [[Gamma]] density with $\alpha = 3$ and $\theta = 500$.

The constant in front of a density never matters. If $f(x) = c\,g(x)$ with $c > 0$, then $f$ and $g$ are largest at the same $x$. So the mode is found from $g$ alone.

Maximizing $\ln g(x)$ gives the same point and turns the product into a sum.

> $$
> \begin{align*}
> \ln g(x) &= 2 \ln x - \frac{x}{500} \\
> \frac{d}{dx} \ln g(x) &= \frac{2}{x} - \frac{1}{500}
> \end{align*}
> $$

Setting the derivative to 0 gives $x = 1000$. The second derivative, $-2/x^2$, is negative, so this point is a maximum.

> $$\text{Gamma: mode} = (\alpha - 1)\,\theta, \quad \alpha \ge 1$$

## When calculus finds nothing

Suppose instead the claim sizes were [[Exponential Distribution|exponential]] with mean 1500. The density $e^{-x/1500}/1500$ only falls, so $f'(x) = 0$ has no solution. The mode is the left end of the support, 0.

> [!trap] Forgetting the endpoints
> A density's largest value can sit at an end of its support, where $f'(x)$ is not 0. Compare the values at the critical points inside the support with the values at its endpoints, and discard any critical point outside the support.

## Mode, median and mean

The gamma claim size above has mode 1,000, median about 1,337 and mean 1,500. The right tail pulls the mean up but leaves the mode where it is.

| Distribution | Mode | Median | Mean |
|---|---|---|---|
| Normal | $\mu$ | $\mu$ | $\mu$ |
| Lognormal | $e^{\mu - \sigma^2}$ | $e^{\mu}$ | $e^{\mu + \sigma^2/2}$ |

For the [[Normal Distribution|normal]] the three agree, because the density is symmetric. The [[Lognormal Distribution|lognormal]] always obeys mode < median < mean. The mode describes the most common claim, not the cost of claims, so pricing is done on the mean.

## Scaling and shifting

The fleet's insurer pays 1,000 per claim, so its monthly payment is $T = 1000N$. The probabilities of $T$ are those of $N$, so the mode of $T$ is $1000 \times 3 = 3000$.

> $$\text{mode}(cX + b) = c \cdot \text{mode}(X) + b, \quad c > 0$$

- For a continuous $X$, the density of $Y = cX$ is $f_X(y/c)/c$. That is largest where $y/c$ is the mode of $X$.

## Try it

> [!example]- Most likely number of claims in a group {Example}
> A group has 20 independent policies, each with probability 0.15 of a claim this year. Find the most likely number of claims.
>
> > [!answer]-
> > **Plan:** the count is binomial, so use $\lfloor (n+1)p \rfloor$ and check the neighbours.
> >
> > $(n+1)p = 21 \times 0.15 = 3.15$, so the mode is 3.
> >
> > Check: $p(2) = 0.2293$, $p(3) = 0.2428$ and $p(4) = 0.1821$. Three claims is the peak.
> >
> > Why not $np = 3$ directly? Here $np$ happens to round to the mode, but the rule is $\lfloor (n+1)p \rfloor$, and the two differ when $np$ sits just below an integer.

> [!example]- A critical point that is a minimum {Example}
> A damage ratio $X$ has density $f(x) = \frac{1}{3}(x - 1)^2$ for $0 < x < 3$. Find the mode.
>
> > [!answer]-
> > **Plan:** find the critical points, classify them, then compare the endpoints.
> >
> > $f'(x) = \frac{2}{3}(x - 1)$ is 0 at $x = 1$. There $f(1) = 0$, so $x = 1$ is a minimum, not a peak.
> >
> > At the endpoints, $f(0) = \frac{1}{3}$ and $f(3) = \frac{4}{3}$. The density is largest at $x = 3$, so the mode is 3.
> >
> > Why check the endpoints? Setting $f'(x) = 0$ and stopping would give 1, the least likely value.

> [!example]- Mode, median and mean of a lognormal severity {Example}
> Claim sizes are lognormal with $\mu = 7$ and $\sigma = 0.5$. Find the mode, the median and the mean.
>
> > [!answer]-
> > **Plan:** apply the three lognormal formulas.
> > $$
> > \begin{align*}
> > \text{mode} &= e^{7 - 0.25} \approx 854.06 \\
> > \text{median} &= e^{7} \approx 1096.63 \\
> > \text{mean} &= e^{7 + 0.125} \approx 1242.65
> > \end{align*}
> > $$
> > The order is mode < median < mean, as it always is for a lognormal. A premium set at the mode would collect about 69% of the expected cost.

> [!warning]- Exam traps
> - **Stopping at $f'(x) = 0$.** Check that the point is a maximum, that it lies in the support, and that no endpoint is higher.
> - **Missing a second mode.** A Poisson with integer $\lambda$, a binomial with integer $(n+1)p$ and a data set with a tie all have two modes.
> - **Mode for mean.** The mode of a Poisson with mean 2.6 is 2, not 2.6, and a mean need not be a possible value at all.
> - **Finding the constant first.** The mode of $c\,g(x)$ is the mode of $g(x)$, so the constant is wasted work.
