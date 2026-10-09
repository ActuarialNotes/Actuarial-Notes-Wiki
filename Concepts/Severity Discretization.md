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
  content_hash: sha256:bcb0cae264a4ea17f107545777179f6a2773e98548ad31a3db943a7c3525dfd4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Severity Discretization.md
---

**Severity Discretization** replaces a continuous [[Severity Distribution|severity distribution]] with an arithmetic one, a discrete severity distribution that puts all of its probability on the multiples $0, h, 2h, \ldots$ of a span $h$. The aggregate claims distribution can then be computed exactly for the discretized severity, by [[Convolution|convolution]] or by the [[Panjer Recursion|recursive formula]]. Loss Models gives two methods: the method of rounding, and local moment matching, which keeps both the probability and the mean of every span.

> $$f_0 = F_X\!\left(\tfrac{h}{2}\right)$$

> $$f_j = F_X\!\left(jh + \tfrac{h}{2}\right) - F_X\!\left(jh - \tfrac{h}{2}\right)$$

> $$\begin{aligned} m_0^k + m_1^k &= F_X\big((k+1)h\big) - F_X(kh) \\ kh\,m_0^k + (k+1)h\,m_1^k &= \int_{kh}^{(k+1)h} x\,dF_X(x) \end{aligned}$$

> $$f_0 = 1 - \frac{E[X \wedge h]}{h}$$

> $$f_j = \frac{2E[X \wedge jh] - E[X \wedge (j-1)h] - E[X \wedge (j+1)h]}{h}$$

- **Symbols:** $h$ is the span, and $f_j$ is the probability that the discretized severity places on $jh$, for $j = 1, 2, \ldots$ in the second and last blocks. The first two blocks are the method of rounding. In local moment matching, $m_0^k$ and $m_1^k$ are the masses placed at the two ends of the span $[kh, (k+1)h]$, and the point $jh$ collects $f_j = m_0^j + m_1^{j-1}$ from the two spans that meet there. $E[X \wedge u]$ is the [[Limited Expected Value|limited expected value]].
- **Why the recursion needs it:** The recursive formula sums over the claim amounts $y = 1, 2, \ldots, x$, so it works only when the severity lives on a lattice. With a continuous severity, the same recursion becomes an integral equation that rarely has a closed-form solution. Discretizing first turns it back into a finite sum, and a smaller span buys accuracy at the cost of more terms.
- **Rounding:** Each point $jh$ collects the probability within half a span on either side of it, so the discretized CDF agrees with $F_X$ at the midpoints $jh + h/2$. The method does not keep the mean, because every loss is moved to its nearest grid point.
- **Local moment matching:** The two span equations in the third block keep each span's probability and its contribution to the mean. As a result, the discretized severity has the same mean as $X$ and the same limited expected value at every multiple of $h$. Solving the span equations gives the closed forms in the last two blocks.

> [!example]- Rounding an Exponential Severity {Example}
> Claim amounts are exponential with mean 1,000. Discretize the severity with a span of $h = 500$ by the method of rounding, and find the probabilities at 0, 500 and 1,000.
>
> > [!answer]-
> > With $F_X(x) = 1 - e^{-x/1000}$, each grid point collects the probability within 250 of it.
> > $$
> > \begin{align*}
> > f_0 &= F_X(250) \\
> > &= 1 - e^{-0.25} \\
> > &= 0.2212 \\
> > f_1 &= F_X(750) - F_X(250) \\
> > &= e^{-0.25} - e^{-0.75} \\
> > &= 0.3064 \\
> > f_2 &= F_X(1{,}250) - F_X(750) \\
> > &= e^{-0.75} - e^{-1.25} \\
> > &= 0.1859
> > \end{align*}
> > $$
> > The discretized severity puts probability 0.2212 on a claim of zero, although no real claim is zero. Summing $jh\,f_j$ over every point gives a mean of 989.66 rather than 1,000. Rounding the claims below 250 down to zero removes 26.50 from the mean, and rounding the larger claims gives back only 16.16 of it.

> [!example]- Local Moment Matching on the First Two Spans {Example}
> For the same severity and span, find $f_0$ and $f_1$ by local moment matching. Check them against the closed forms.
>
> > [!answer]-
> > On $[0, 500]$, the probability is $F_X(500) = 0.393469$. The integral is $\int_0^{500} x\,dF_X(x) = E[X \wedge 500] - 500\,S_X(500) = 393.469 - 303.265 = 90.204$. The mass at 0 contributes nothing to it, so the span equations give
> > $$
> > \begin{align*}
> > m_1^0 &= \frac{90.204}{500} \\
> > &= 0.180408 \\
> > m_0^0 &= 0.393469 - 0.180408 \\
> > &= 0.213061
> > \end{align*}
> > $$
> > On $[500, 1{,}000]$, the probability is $0.238651$ and the integral is $174.037$. Solving $m_0^1 + m_1^1 = 0.238651$ and $500\,m_0^1 + 1{,}000\,m_1^1 = 174.037$ gives $m_1^1 = 0.109423$ and $m_0^1 = 0.129228$. The point 500 collects mass from both spans.
> > $$
> > \begin{align*}
> > f_0 &= m_0^0 \\
> > &= 0.2131 \\
> > f_1 &= m_1^0 + m_0^1 \\
> > &= 0.180408 + 0.129228 \\
> > &= 0.3096
> > \end{align*}
> > $$
> > The closed forms agree: $f_0 = 1 - 393.469/500 = 0.2131$, and $f_1 = [2(393.469) - 0 - 632.121]/500 = 0.3096$. Unlike rounding, this discretization keeps the mean at exactly 1,000.

> [!tip]- How it appears on the exam
> - **ASTAM** asks candidates to derive the discretized version of a continuous distribution by the method of rounding and by local moment matching. A question gives the severity and the span and asks for the first few probabilities.
> - **Aggregate claims:** The discretized severity then feeds the recursive formula or a convolution, so the same question often continues to an aggregate probability or a stop-loss premium.
> - **Closed forms:** For local moment matching, the limited-expected-value form is usually quicker than solving the span equations, because the distribution tables give $E[X \wedge u]$ for every distribution they list.

> [!warning]- Exam traps
> - **The first point:** Rounding gives $f_0 = F_X(h/2)$, because the first interval is only half a span wide. Using $F_X(h)$ double-counts the probability between $h/2$ and $h$.
> - **A mass at zero:** The discretized severity has $f_0 > 0$ even when every real claim is positive. The recursion then needs the factor $1/(1 - a f_0)$ and the starting value $P_N(f_0)$ rather than $\Pr(N = 0)$.
> - **Both spans:** In local moment matching, an interior point receives mass from the span on each side of it. Taking only $m_0^j$ or only $m_1^{j-1}$ for $f_j$ leaves probabilities that sum to less than 1.
> - **Units of the span:** The recursion runs in units of $h$. After discretizing with $h = 500$, an aggregate value of $x = 3$ means 1,500, so a deductible or limit must be converted to spans first.
