---
aliases:
  - Recursive Formulas
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:26e6f7f54053f4da02dc4e5d947fc8e6eabf527caa12f5b9543217232593452e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Panjer Recursion.md
---
**Panjer Recursion** is a method that computes the distribution of aggregate claims $S = X_1 + \cdots + X_N$ one value at a time, when the claim count $N$ is in the (a,b,0) or (a,b,1) class of [[Frequency Distribution|frequency distributions]] and the severity $X$ is arithmetic, on the integers $0, 1, 2, \ldots$ in some monetary unit. It applies to the [[Aggregate Loss Model|collective risk model]], with claim amounts independent of each other and of $N$ and drawn from one severity distribution, and it replaces the many [[Convolution|convolutions]] of that model with a single pass.

The claim count's probabilities $p_k = \Pr(N = k)$ satisfy $p_k = (a + b/k)\,p_{k-1}$ for $k = 1, 2, \ldots$, where $a$ and $b$ are the constants of the frequency distribution. For such an (a,b,0) claim count, each probability of aggregate claims is

> $$f_S(x) = \frac{1}{1 - a f_X(0)} \sum_{y=1}^{x} \left(a + \frac{b\,y}{x}\right) f_X(y)\, f_S(x-y)$$

- $f_X$ and $f_S$ are the probability functions of the severity and of aggregate claims.
- $x = 1, 2, 3, \ldots$

The recursion must start from $f_S(0)$, the probability that every claim is zero. Conditioning on the number of claims, it is

> $$f_S(0) = P_N\big(f_X(0)\big)$$

- $P_N(z) = E[z^N]$ is the probability generating function of $N$, so $P_N(f_X(0)) = \sum_k p_k\,f_X(0)^k$.

When $f_X(0) = 0$ it is simply $p_0$, and for a Poisson $N$ it is $e^{-\lambda(1 - f_X(0))}$. A continuous severity must first be put on a lattice by [[Severity Discretization|discretization]], and the answer is then in units of the span.

## Compound Poisson recursion

In the (a,b,0) class, $a = 0$ with $b > 0$ is the Poisson distribution with mean $\lambda = b$. With $a = 0$ and $b = \lambda$ there is no denominator, and the recursion is

> $$f_S(x) = \frac{\lambda}{x}\sum_{y=1}^{x} y\,f_X(y)\,f_S(x-y)$$

A sum of independent compound Poisson variables is again compound Poisson, with $\lambda = \sum_j \lambda_j$ and a severity that mixes the $f_j$ with weights $\lambda_j/\lambda$, so a whole book can be run through one recursion.

> [!example]- What is $\Pr(S \le 3)$ for this compound Poisson distribution? {Example}
> The number of claims is Poisson with $\lambda = 2$. Each claim is 1, 2 or 3 (in $\$1{,}000$s) with probabilities 0.5, 0.3 and 0.2.
>
> > [!answer]-
> > - The severity has no mass at zero, so $f_S(0) = p_0 = e^{-2} = 0.135335$.
> > - $f_S(1) = 2(0.5)(0.135335) = 0.135335$.
> > - For $f_S(2)$, the sum is $0.5(0.135335) + 0.6(0.135335)$, and $\tfrac{2}{2}$ of it is $0.148869$.
> > - For $f_S(3)$, the sum is $0.5(0.148869) + 1.2(0.135335)$, which is $0.236837$, and $\tfrac{2}{3}$ of it is $0.157891$.
> > - Adding the four probabilities gives $\Pr(S \le 3) = 0.577430$.

## Zero-truncated and zero-modified claim counts

A zero-truncated or zero-modified claim count is in the (a,b,1) class: it follows $p_k = (a + b/k)\,p_{k-1}$ only from $k = 2$, so its $p_1$ is not $(a+b)p_0$. Its recursion adds a term that corrects for this, and each probability of aggregate claims is

> $$f_S(x) = \frac{\big[p_1 - (a+b)p_0\big] f_X(x) + \sum_{y=1}^{x} \left(a + \tfrac{b\,y}{x}\right) f_X(y)\, f_S(x-y)}{1 - a f_X(0)}$$

- $p_0$ and $p_1$ are the modified probabilities $p_0^M$ and $p_1^M$, not those of the corresponding (a,b,0) distribution.

The extra term vanishes for an (a,b,0) distribution, which turns the recursion back into the first one.

> [!example]- What is the probability that aggregate payments are at most 2? {Example}
> The number of losses is zero-modified geometric with $\beta = 1$ and $p_0^M = 0.4$. After a per-loss deductible, the payment on a loss is 0, 1 or 2 with probabilities 0.2, 0.5 and 0.3.
>
> > [!answer]-
> > - For the geometric, $a = \beta/(1+\beta) = 0.5$ and $b = 0$.
> > - The zero-modified probabilities are $p_k^M = 0.6\,p_k^T$, so $p_1^M = 0.6(0.5) = 0.3$.
> > - The (a,b,1) term is $p_1 - (a+b)p_0 = 0.3 - 0.5(0.4) = 0.1$, and the denominator is $1 - 0.5(0.2) = 0.9$.
> > - The zero-truncated generating function at $f_X(0) = 0.2$ is $P^T(0.2) = (1/1.8 - 0.5)/0.5 = 0.111111$.
> > - So $f_S(0) = 0.4 + 0.6(0.111111) = 0.466667$, not $p_0^M = 0.4$.
> > - For $f_S(1)$, the numerator is $0.1(0.5) + 0.5(0.5)(0.466667)$, which is $0.166667$, so $f_S(1) = 0.185185$.
> > - For $f_S(2)$, the numerator is $0.1(0.3) + 0.5\,[0.5(0.185185) + 0.3(0.466667)]$, which is $0.146296$, so $f_S(2) = 0.162551$.
> > - Adding them gives $\Pr(S \le 2) = 0.814403$.

## Stop-loss premiums

The first few probabilities from the recursion give a [[Stop-Loss Reinsurance|stop-loss]] premium. For aggregate claims on the integers and an integer deductible $d$, the expected claims above $d$ are

> $$E[(S-d)_+] = E[S] - d + \sum_{x=0}^{d-1}(d-x)\,f_S(x)$$

> [!example]- In the compound Poisson example, what is $E[(S-2)_+]$? {Example}
> - The mean claim is $1(0.5) + 2(0.3) + 3(0.2) = 1.7$, so $E[S] = 2(1.7) = 3.4$.
> - $E[(S-2)_+] = 3.4 - 2 + 2(0.135335) + 1(0.135335) = 1.806$.

> [!trap] Forgetting the denominator
> When $f_X(0) > 0$, every step divides by $1 - a f_X(0)$. The Poisson has $a = 0$, which hides the factor, so it is easy to forget for the negative binomial and the binomial. For the binomial, $a = -q/(1-q)$ is negative, and the denominator is greater than 1.
