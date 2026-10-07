---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:20bb5ea11f2b58a0f1a8f730743ae48cc8381d8e8d63a3f6546d6cce0205abe3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Convolution.md
---

**Convolution** is the operation that gives the distribution of a sum of independent [[Random Variable|random variables]]; in the [[Aggregate Loss Model|aggregate loss model]] $S = X_1 + \cdots + X_N$ it builds the distribution of $k$ claims, $f_X^{*k}$, out of the [[Severity Distribution|severity distribution]] and then mixes over the claim count $N$.

> $$f_X^{*k}(x) = \sum_{y=0}^{x} f_X^{*(k-1)}(x-y)\, f_X(y)$$

> $$F_X^{*k}(x) = \sum_{y=0}^{x} F_X^{*(k-1)}(x-y)\, f_X(y)$$

> $$f_S(x) = \sum_{k=0}^{\infty} \Pr(N=k)\, f_X^{*k}(x)$$

- The recursion starts from $f_X^{*0}(0) = 1$ and $f_X^{*0}(x) = 0$ for $x > 0$ (zero claims total zero), with $f_X^{*1} = f_X$. Severity is on the integers $0, 1, 2, \ldots$ in some monetary unit; a continuous severity is first discretized onto a span (by rounding or local moment matching).
- $f_X^{*k}$ is the distribution of $X_1 + \cdots + X_k$ for **independent, identically distributed** claims, which is why the model assumes the $X_i$ are i.i.d. and independent of $N$ ([[Frequency-Severity Models|frequency-severity]] structure).
- If $f_X(0) = 0$, then $f_X^{*k}(x) = 0$ for $k > x$, so $f_S(x)$ needs only the terms $k = 0, \ldots, x$. If $f_X(0) > 0$ (a [[Deductible|deductible]] applied per loss) every $k$ contributes, and the sum is finite only when $N$ is bounded.
- For (a,b,0) and (a,b,1) frequencies the Panjer recursion gives the same probabilities more cheaply; for large portfolios the [[Normal Approximation|normal approximation]] replaces both.

> [!example]- Aggregate Claims From a Small Book {Example}
> A policy has at most two claims a year: $\Pr(N=0)=0.5$, $\Pr(N=1)=0.3$, $\Pr(N=2)=0.2$. Each claim is $1$ or $2$ (in \$$1{,}000$s) with probabilities $0.6$ and $0.4$, independent of $N$ and of each other. Find $\Pr(S \le 2)$ and the stop-loss premium $E[(S-2)_+]$.
>
> > [!answer]-
> > Two claims convolve to
> >
> > $$
> > \begin{align*}
> > f_X^{*2}(2) &= 0.6^2 = 0.36 \\
> > f_X^{*2}(3) &= 2(0.6)(0.4) = 0.48 \\
> > f_X^{*2}(4) &= 0.4^2 = 0.16
> > \end{align*}
> > $$
> >
> > Mixing over $N$:
> >
> > $$
> > \begin{align*}
> > f_S(0) &= 0.5 \\
> > f_S(1) &= 0.3(0.6) = 0.18 \\
> > f_S(2) &= 0.3(0.4) + 0.2(0.36) = 0.192 \\
> > f_S(3) &= 0.2(0.48) = 0.096 \\
> > f_S(4) &= 0.2(0.16) = 0.032
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \Pr(S \le 2) &= 0.5 + 0.18 + 0.192 \\
> > &= 0.872 \\[4pt]
> > E[(S-2)_+] &= 1(0.096) + 2(0.032) \\
> > &= 0.16
> > \end{align*}
> > $$
> >
> > Aggregate claims stay at or below \$$2{,}000$ with probability $0.872$, and a stop-loss cover attaching at \$$2{,}000$ costs \$$160$ in expectation.

> [!example]- Convolution With a Per-Loss Deductible {Example}
> The number of losses is binomial with $m = 3$, $q = 0.4$. Ground-up losses are $1$, $2$ or $3$ (in \$$1{,}000$s) with probabilities $0.25$, $0.40$, $0.35$. A deductible of $1$ applies to each loss. Let $S$ be aggregate payments. Calculate $\Pr(S \le 2)$.
>
> > [!answer]-
> > Per loss, $Y = (X-1)_+$ takes values $0, 1, 2$ with probabilities $0.25, 0.40, 0.35$ — a mass at zero, so every $k$ contributes. Binomial weights are $0.216, 0.432, 0.288, 0.064$.
> >
> > $$
> > \begin{align*}
> > f_Y^{*2}(0) &= 0.0625 \\
> > f_Y^{*2}(1) &= 2(0.25)(0.40) = 0.2 \\
> > f_Y^{*2}(2) &= 2(0.25)(0.35) + 0.40^2 = 0.335 \\
> > f_Y^{*3}(0) &= 0.015625 \\
> > f_Y^{*3}(1) &= 3(0.25)^2(0.40) = 0.075 \\
> > f_Y^{*3}(2) &= 3(0.25)^2(0.35) + 3(0.25)(0.40)^2 = 0.185625
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > f_S(0) &= 0.216 + 0.432(0.25) + 0.288(0.0625) + 0.064(0.015625) \\
> > &= 0.343 \\
> > f_S(1) &= 0.432(0.40) + 0.288(0.2) + 0.064(0.075) \\
> > &= 0.2352 \\
> > f_S(2) &= 0.432(0.35) + 0.288(0.335) + 0.064(0.185625) \\
> > &= 0.25956 \\[4pt]
> > \Pr(S \le 2) &= 0.343 + 0.2352 + 0.25956 \\
> > &= 0.83776
> > \end{align*}
> > $$
> >
> > Check: payments are binomial with $q = 0.4(0.75) = 0.3$, so $\Pr(S=0) = 0.7^3 = 0.343$. Aggregate payments are at most \$$2{,}000$ with probability about $0.838$.

> [!tip]- How it appears on the exam
> - **FAM** (*calculate probabilities using the convolution method*): a frequency with two or three possible values and a severity on two or three points; asked for $\Pr(S = x)$, $\Pr(S \le x)$, or a stop-loss premium $E[(S-d)_+]$ built from the first few $f_S(x)$.
> - **ASTAM** (*derive probability and distribution functions ... with (a,b,0) or (a,b,1) frequency*): the same calculation with a per-loss deductible or a zero-modified frequency, often with the instruction to use convolution for small $x$ and the Panjer recursion as the alternative.
> - Pairs with [[Coverage Modifications|coverage modifications]] (the deductible creates $f_Y(0) > 0$) and with the stop-loss premium identity $E[(S-d)_+] = E[S] - d + \sum_{x<d}(d-x)f_S(x)$.

> [!warning]- Exam traps
> - **Dropping the $k=0$ term.** $f_X^{*0}(0) = 1$, so $f_S(0)$ always includes $\Pr(N=0)$; leaving it out gives probabilities that sum to less than one.
> - **Assuming $f_S(0) = \Pr(N=0)$ when $f_X(0) > 0$.** With a per-loss deductible, $f_S(0) = \sum_k \Pr(N=k) f_X(0)^k$ — in the second example $0.343$, not $0.216$.
> - **Multiplying CDFs.** $F_X^{*2}(x)$ is not $F_X(x)^2$; that is the distribution of the *maximum* of two claims, not their sum.
> - **Forgetting the order count.** $f_X^{*2}(3) = 2(0.6)(0.4)$, not $(0.6)(0.4)$: $3 = 1+2 = 2+1$.
