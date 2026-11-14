---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:596b4d7cb3587c7537c326fcadc3388851f392cd09693a78e11a54a094c0500b
  sources:
    - "Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.5 Aggregate Loss Models, 5.2 n-fold convolution recursion F^{*n}(x)=sum F^{*(n-1)}(x-y)f(y); 5.3 F_S = p0 + sum p_n F^{*n}; 5.3.2 net stop-loss premium E(S)-E(S^d); 5.4.1 recursive method for (a,b,0)/(a,b,1), discretize continuous severity, sha256:09489050a45e6eb2ee0d96804458eb22c936a61716227e08ad0398b9cba870d4 — https://openacttexts.github.io/Loss-Data-Analytics/ChapAggLossModels.html"
    - "SOA Exam ASTAM Syllabus, October 2026, Topic 2 Aggregate Models, outcomes a-b (convolution and recursive formulas; method of rounding and local moment matching), p.2, sha256:6d462aea25c09b15cc457176ecf2d5d6143df8fb88df9f366557de17ec1ec9ba — https://www.soa.org/globalassets/assets/files/edu/2026/astam/2026-fall-exam-astam-syllabus.pdf"
    - "SOA Exam FAM Syllabus, February 2027, Topic 2 outcomes i-l (convolution method, stop-loss expected payment), p.3, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Convolution.md
---
**Convolution** is the operation that gives the distribution of a sum of independent [[Random Variable|random variables]]. In the [[Aggregate Loss Model|aggregate loss model]] $S = X_1 + \cdots + X_N$, it builds the distribution of the total of $k$ claims, $f_X^{*k}$, from the [[Severity Distribution|severity distribution]] $f_X$. For a severity on the integers $0, 1, 2, \ldots$ in some monetary unit, the probability that $k$ claims total $x$ is

> $$f_X^{*k}(x) = \sum_{y=0}^{x} f_X^{*(k-1)}(x-y)\, f_X(y)$$

The recursion starts from $f_X^{*0}(0) = 1$ and $f_X^{*0}(x) = 0$ for $x > 0$ (zero claims total zero), with $f_X^{*1} = f_X$. A total that can be reached in several ways adds the probability of each way, and each way's probability is the product of its claims' probabilities. The convolution assumes the claims $X_i$ are independent and identically distributed and independent of $N$, the [[Frequency-Severity Models|frequency-severity]] structure. A continuous severity is first discretized onto a span, by rounding or local moment matching.

> [!example]- Each claim is $1$ or $2$ with probabilities $0.6$ and $0.4$, independently. What is the distribution of the total of two claims? {Example}
> - Two claims total $2$ only as $1 + 1$, so $f_X^{*2}(2) = 0.6^2 = 0.36$.
> - They total $3$ as $1 + 2$ or $2 + 1$, so $f_X^{*2}(3) = 2(0.6)(0.4) = 0.48$.
> - They total $4$ only as $2 + 2$, so $f_X^{*2}(4) = 0.4^2 = 0.16$.

## The aggregate loss distribution

Mixing over the claim count $N$, the probability that aggregate loss $S$ is $x$ is

> $$f_S(x) = \sum_{k=0}^{\infty} \Pr(N=k)\, f_X^{*k}(x)$$

If $f_X(0) = 0$, then $f_X^{*k}(x) = 0$ for $k > x$, so $f_S(x)$ needs only the terms $k = 0, \ldots, x$. For (a,b,0) and (a,b,1) frequencies, the Panjer recursion gives the same probabilities with less work. For large portfolios the [[Normal Approximation|normal approximation]] replaces both.

> [!example]- What is $\Pr(S \le 2)$ for this policy? {Example}
> A policy has at most two claims a year, with $\Pr(N=0)=0.5$, $\Pr(N=1)=0.3$ and $\Pr(N=2)=0.2$. Each claim is $1$ or $2$ (in $\$1{,}000$s) with probabilities $0.6$ and $0.4$, independent of $N$ and of each other.
>
> > [!answer]-
> > - Two claims total $2$, $3$ or $4$ with probabilities $0.36$, $0.48$ and $0.16$.
> > - $f_S(0) = \Pr(N=0) = 0.5$.
> > - $f_S(1) = 0.3(0.6) = 0.18$.
> > - $f_S(2) = 0.3(0.4) + 0.2(0.36) = 0.192$.
> > - $f_S(3) = 0.2(0.48) = 0.096$ and $f_S(4) = 0.2(0.16) = 0.032$.
> > - $\Pr(S \le 2) = 0.5 + 0.18 + 0.192 = 0.872$.

## Stop-loss premium

For an integer-valued aggregate loss $S$, the expected payment of a stop-loss cover with deductible $d$ is

> $$E[(S-d)_+] = E[S] - d + \sum_{x<d}(d-x)f_S(x)$$

The sum needs only the first few values of $f_S$, which the convolution gives.

> [!example]- What is the stop-loss premium $E[(S-2)_+]$ for this policy? {Example}
> For the policy above, $f_S(0) = 0.5$, $f_S(1) = 0.18$, $f_S(2) = 0.192$, $f_S(3) = 0.096$ and $f_S(4) = 0.032$, in $\$1{,}000$s.
>
> > [!answer]-
> > - The expected claim count is $0.3 + 2(0.2) = 0.7$ and the expected claim is $0.6 + 2(0.4) = 1.4$, so $E[S] = 0.98$.
> > - $E[(S-2)_+] = 0.98 - 2 + 2(0.5) + 1(0.18) = 0.16$.
> > - Directly, $E[(S-2)_+] = 1(0.096) + 2(0.032) = 0.16$, the same.
> > - The stop-loss cover costs $\$160$ in expectation.

## A severity with a mass at zero

If $f_X(0) > 0$, as when a [[Deductible|deductible]] applies to each loss, every $k$ contributes to $f_S(x)$, and the sum is finite only when $N$ is bounded.

> [!example]- What is $\Pr(S \le 2)$ for these aggregate payments? {Example}
> The number of losses is binomial with $m = 3$ and $q = 0.4$. Ground-up losses are $1$, $2$ or $3$ (in $\$1{,}000$s) with probabilities $0.25$, $0.40$ and $0.35$. A deductible of $1$ applies to each loss, and $S$ is aggregate payments.
>
> > [!answer]-
> > - Per loss, $Y = (X-1)_+$ is $0$, $1$ or $2$ with probabilities $0.25$, $0.40$ and $0.35$.
> > - The binomial probabilities of $0$ to $3$ losses are $0.216$, $0.432$, $0.288$ and $0.064$.
> > - Two payments total $0$, $1$ or $2$ with probabilities $0.0625$, $2(0.25)(0.40) = 0.2$ and $2(0.25)(0.35) + 0.40^2 = 0.335$.
> > - Three payments total $0$, $1$ or $2$ with probabilities $0.015625$, $3(0.25)^2(0.40) = 0.075$ and $3(0.25)^2(0.35) + 3(0.25)(0.40)^2 = 0.185625$.
> > - $f_S(0) = 0.216 + 0.432(0.25) + 0.288(0.0625) + 0.064(0.015625) = 0.343$.
> > - $f_S(1) = 0.432(0.40) + 0.288(0.2) + 0.064(0.075) = 0.2352$.
> > - $f_S(2) = 0.432(0.35) + 0.288(0.335) + 0.064(0.185625) = 0.25956$.
> > - $\Pr(S \le 2) = 0.343 + 0.2352 + 0.25956 = 0.83776$.

> [!trap] Taking $f_S(0)$ as $\Pr(N=0)$ when a claim can be zero
> With a per-loss deductible, $f_S(0) = \sum_k \Pr(N=k)\, f_X(0)^k$. In the last example that is $0.343$, not $\Pr(N=0) = 0.216$.
