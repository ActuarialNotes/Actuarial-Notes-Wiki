---
aliases:
  - Discretized Version
  - Local Moment Matching
  - Discrete Severity Distribution
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fb0e7d5aca5ba7c3c0e14b1b5e44be9f4684e3622815f539673a9b287fd1bfb8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Severity Discretization.md
---
**Severity Discretization** is the replacement of a continuous [[Severity Distribution|severity distribution]] with an arithmetic one, a discrete severity distribution that puts all of its probability on the multiples $0, h, 2h, \ldots$ of a span $h$. The aggregate claims distribution can then be computed exactly for the discretized severity, by [[Convolution|convolution]] or by the [[Panjer Recursion|recursive formula]].

The recursive formula sums over the claim amounts $y = 1, 2, \ldots, x$, so it works only when the severity lives on a lattice. A smaller span buys accuracy at the cost of more terms. The recursion then runs in units of $h$: after discretizing with $h = 500$, an aggregate value of $x = 3$ means 1,500, so a deductible or limit must be converted to spans first. The discretized severity has $f_0 > 0$ even when every real claim is positive, so the recursion needs the factor $1/(1 - a f_0)$ and the starting value $P_N(f_0)$ rather than $\Pr(N = 0)$.

Loss Models gives two methods: the method of rounding, and local moment matching, which keeps both the probability and the mean of every span.

## Method of rounding

In the method of rounding, each point $jh$ collects the probability within half a span on either side of it, so the probability $f_j$ that the discretized severity places on $jh$, for $j = 1, 2, \ldots$, is

> $$f_j = F_X\!\left(jh + \tfrac{h}{2}\right) - F_X\!\left(jh - \tfrac{h}{2}\right)$$

- $F_X$ is the cumulative distribution function of the severity $X$.

The first interval is only half a span wide, so the probability at 0 is

> $$f_0 = F_X\!\left(\tfrac{h}{2}\right)$$

The discretized cumulative distribution function agrees with $F_X$ at the midpoints $jh + h/2$. The method does not keep the mean, because every loss is moved to its nearest grid point.

> [!example]- Claim amounts are exponential with mean 1,000. What are the rounded probabilities at 0, 500 and 1,000 for a span of $h = 500$? {Example}
> - With $F_X(x) = 1 - e^{-x/1000}$, each grid point collects the probability within 250 of it.
> - $f_0 = F_X(250) = 1 - e^{-0.25} = 0.2212$.
> - $f_1 = F_X(750) - F_X(250) = e^{-0.25} - e^{-0.75} = 0.3064$.
> - $f_2 = F_X(1{,}250) - F_X(750) = e^{-0.75} - e^{-1.25} = 0.1859$.
> - The discretized severity puts probability 0.2212 on a claim of zero, although no real claim is zero.
> - Summing $jh\,f_j$ over every point gives a mean of 989.66 rather than 1,000.

## Local moment matching

Local moment matching places masses $m_0^k$ and $m_1^k$ at the two ends of each span $[kh, (k+1)h]$, chosen to keep the span's probability and its contribution to the mean. The masses on the span satisfy

> $$m_0^k + m_1^k = F_X\big((k+1)h\big) - F_X(kh)$$

> $$kh\,m_0^k + (k+1)h\,m_1^k = \int_{kh}^{(k+1)h} x\,dF_X(x)$$

The point $jh$ collects $f_j = m_0^j + m_1^{j-1}$ from the two spans that meet there. As a result, the discretized severity has the same mean as $X$ and the same limited expected value at every multiple of $h$. Solving the span equations gives the closed forms

> $$f_0 = 1 - \frac{E[X \wedge h]}{h}$$

> $$f_j = \frac{2E[X \wedge jh] - E[X \wedge (j-1)h] - E[X \wedge (j+1)h]}{h}$$

- $E[X \wedge u]$ is the [[Limited Expected Value|limited expected value]] at $u$.
- $j = 1, 2, \ldots$

The closed forms are usually quicker than solving the span equations, because the distribution tables give $E[X \wedge u]$ for every distribution they list.

> [!example]- For the same exponential severity and span, what are $f_0$ and $f_1$ by local moment matching? {Example}
> - $E[X \wedge u] = 1{,}000(1 - e^{-u/1000})$, so $E[X \wedge 500] = 393.469$ and $E[X \wedge 1{,}000] = 632.121$.
> - $f_0 = 1 - 393.469/500 = 0.2131$.
> - $f_1 = [2(393.469) - 0 - 632.121]/500 = 0.3096$.
> - Solving the span equations gives the same: on $[0, 500]$, $m_0^0 = 0.2131$ and $m_1^0 = 0.1804$, and on $[500, 1{,}000]$, $m_0^1 = 0.1292$.
> - So $f_1 = m_1^0 + m_0^1 = 0.1804 + 0.1292 = 0.3096$.
> - Unlike rounding, this discretization keeps the mean at exactly 1,000.

> [!trap] Using $F_X(h)$ for the first point
> Rounding gives $f_0 = F_X(h/2)$, because the first interval is only half a span wide. Using $F_X(h)$ double-counts the probability between $h/2$ and $h$.
