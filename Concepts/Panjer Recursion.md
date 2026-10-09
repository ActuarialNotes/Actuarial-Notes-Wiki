---
aliases:
  - Recursive Formulas
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:aaca3983dfc4a2305c35a2b4ba0dd2df094f6e5c1489987ac9d0b4d1cbe1a96a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Panjer Recursion.md
---

**Panjer Recursion** computes the distribution of aggregate claims $S = X_1 + \cdots + X_N$ one value at a time, when the claim count $N$ is in the (a,b,0) or (a,b,1) class of [[Frequency Distribution|frequency distributions]] and the severity $X$ is arithmetic, on the integers $0, 1, 2, \ldots$ in some monetary unit. Each probability $f_S(x)$ is a short weighted sum of the ones before it, so the recursion replaces the many [[Convolution|convolutions]] of the [[Aggregate Loss Model|collective risk model]] with a single pass.

> $$f_S(0) = P_N\big(f_X(0)\big)$$

> $$f_S(x) = \frac{1}{1 - a f_X(0)} \sum_{y=1}^{x} \left(a + \frac{b\,y}{x}\right) f_X(y)\, f_S(x-y)$$

> $$\begin{aligned} f_S(x) = \frac{1}{1 - a f_X(0)} \Big\{ & \big[p_1 - (a+b)p_0\big] f_X(x) \\ & + \sum_{y=1}^{x} \left(a + \tfrac{b\,y}{x}\right) f_X(y)\, f_S(x-y) \Big\} \end{aligned}$$

- **Symbols:** Following Loss Models (chapter 9), $f_X$ and $f_S$ are the probability functions of the severity and of aggregate claims, $p_k = \Pr(N = k)$, and $a$ and $b$ are the constants of the frequency distribution, so that $p_k = (a + b/k)\,p_{k-1}$. $P_N(z) = E[z^N]$ is the probability generating function of $N$. The second block is the (a,b,0) recursion and the third is the (a,b,1) recursion.
- **Starting value:** The recursion must start from $f_S(0)$, the probability that every claim is zero, which is $\sum_k p_k\,f_X(0)^k = P_N(f_X(0))$. When $f_X(0) = 0$ it is simply $p_0$, and for a Poisson $N$ it is $e^{-\lambda(1 - f_X(0))}$.
- **The (a,b,1) version:** A zero-truncated or zero-modified frequency follows the relation $p_k = (a + b/k)\,p_{k-1}$ only from $k = 2$, so its $p_1$ is not $(a+b)p_0$. The extra term $[p_1 - (a+b)p_0]\,f_X(x)$ corrects for this, and it vanishes for an (a,b,0) distribution, which turns the third block back into the second.
- **Compound Poisson:** With $a = 0$ and $b = \lambda$, the recursion is $f_S(x) = \frac{\lambda}{x}\sum_{y} y\,f_X(y)\,f_S(x-y)$, with no denominator. A sum of independent compound Poisson variables is again compound Poisson, with $\lambda = \sum_j \lambda_j$ and a severity that mixes the $f_j$ with weights $\lambda_j/\lambda$, so a whole book can be run through one recursion. A continuous severity must first be put on a lattice by [[Severity Discretization|discretization]].

> [!example]- Compound Poisson Aggregate Claims {Example}
> The number of claims is Poisson with $\lambda = 2$. Each claim is 1, 2 or 3 (in \$1,000s) with probabilities 0.5, 0.3 and 0.2. Find $\Pr(S \le 3)$.
>
> > [!answer]-
> > For the Poisson, $a = 0$ and $b = 2$, and $f_X(0) = 0$, so $f_S(0) = e^{-2}$ and each step is $f_S(x) = \frac{2}{x}\sum_y y\,f_X(y)\,f_S(x-y)$.
> > $$
> > \begin{align*}
> > f_S(0) &= e^{-2} \\
> > &= 0.135335 \\
> > f_S(1) &= 2(1)(0.5)(0.135335) \\
> > &= 0.135335 \\
> > f_S(2) &= \tfrac{2}{2}\big[0.5(0.135335) + 2(0.3)(0.135335)\big] \\
> > &= 0.148869 \\
> > f_S(3) &= \tfrac{2}{3}\big[0.5(0.148869) + 0.6(0.135335) + 0.6(0.135335)\big] \\
> > &= 0.157891
> > \end{align*}
> > $$
> > Adding the four probabilities gives $\Pr(S \le 3) = 0.577430$. Aggregate claims stay at or below \$3,000 in about 58% of years, and convolving the severity up to three times gives the same answer.

> [!example]- Zero-Modified Frequency With a Deductible {Example}
> The number of losses is zero-modified geometric with $\beta = 1$ and $p_0^M = 0.4$. After a per-loss deductible, the payment on a loss is 0, 1 or 2 with probabilities 0.2, 0.5 and 0.3. Find the probability that aggregate payments are at most 2.
>
> > [!answer]-
> > For the geometric, $a = \beta/(1+\beta) = 0.5$ and $b = 0$. The zero-modified probabilities are $p_k^M = 0.6\,p_k^T$, so $p_1^M = 0.6(0.5) = 0.3$, and the (a,b,1) term is $p_1 - (a+b)p_0 = 0.3 - 0.5(0.4) = 0.1$. The denominator is $1 - 0.5(0.2) = 0.9$. The starting value uses the zero-truncated generating function at $f_X(0) = 0.2$, which is $P^T(0.2) = (1/1.8 - 0.5)/0.5 = 0.111111$.
> > $$
> > \begin{align*}
> > f_S(0) &= 0.4 + 0.6(0.111111) \\
> > &= 0.466667 \\
> > f_S(1) &= \frac{0.1(0.5) + 0.5(0.5)(0.466667)}{0.9} \\
> > &= 0.185185 \\
> > f_S(2) &= \frac{0.1(0.3) + 0.5\big[0.5(0.185185) + 0.3(0.466667)\big]}{0.9} \\
> > &= 0.162551
> > \end{align*}
> > $$
> > Adding them gives $\Pr(S \le 2) = 0.814403$. Starting from $p_0^M = 0.4$ would leave out the years in which every loss falls below the deductible, and dropping the term $0.1\,f_X(x)$ would treat the frequency as an ordinary geometric.

> [!tip]- How it appears on the exam
> - **ASTAM** asks candidates to use convolution and recursive formulas to derive probability and distribution functions for aggregate claims with (a,b,0) or (a,b,1) frequency and a discrete severity. A question gives the frequency's parameters and a severity on a few points, often after a per-loss deductible, and asks for $f_S(x)$ or $F_S(x)$ for small $x$.
> - **Stop-loss premiums:** The first few probabilities often feed a [[Stop-Loss Reinsurance|stop-loss]] premium, through $E[(S-d)_+] = E[S] - d + \sum_{x<d}(d-x)\,f_S(x)$.
> - **Continuous severity:** When the question gives a continuous severity and a span, the severity must be discretized first, and the answer is then in units of the span.

> [!warning]- Exam traps
> - **The denominator:** When $f_X(0) > 0$, every step divides by $1 - a f_X(0)$. The Poisson has $a = 0$, which hides the factor, so it is easy to forget for the negative binomial and the binomial. For the binomial, $a = -q/(1-q)$ is negative, and the denominator is greater than 1.
> - **The starting value:** With a mass at zero in the severity, $f_S(0) = P_N(f_X(0))$, not $p_0$. Starting from $p_0$ leaves out every year in which claims occur but none of them pays.
> - **The (a,b,1) term:** For a zero-truncated or zero-modified frequency, leaving out $[p_1 - (a+b)p_0]\,f_X(x)$ gives the answer for the wrong frequency. The term uses the modified $p_0^M$ and $p_1^M$, not the probabilities of the corresponding (a,b,0) distribution.
> - **The weights:** The weight is $a + by/x$, where $y$ is the claim amount and $x$ is the total. Swapping them, or writing $b/x$ without the factor $y$, gives wrong probabilities from $f_S(2)$ onward.
