---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c9ac8762e6ac5be0e83ae971f49133a7749b553ba8da7c872e32d4ab6ff6bf34
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Aggregate Limit.md
---

An **Aggregate Limit** $L$ is the most an insurer will pay during the policy term for all claims combined, as distinct from a per-claim limit $l$, the most it will pay on any one claim ($L > l$). Common on liability policies, it lowers the policy expected loss from $E[S_l]$ to $E[S_l;L]$.

> $$E[S_l] = E[N]\,E[X;l]$$

> $$E[S_l] - E[S_l;L] = \int_L^{\infty} (s - L)\,dF_S(s)$$

> $$I(l, L) = \frac{E[S_l;L]}{E[N]\,E[X;b]}$$

- $S_l$ is the [[Aggregate Loss Model|aggregate loss]] of claim count $N$ and claim size $X$ limited at $l$, with distribution $F_S$. $E[S_l;L] = E[\min(S_l, L)]$ is the [[Limited Expected Value|limited expected value]] of the aggregate at $L$, and $b$ is the basic limit.
- **Compute what the limit eliminates.** It is usually more efficient and more accurate to find the eliminated loss $E[S_l] - E[S_l;L]$, which depends only on the tail of $F_S$ above $L$, and subtract it from $E[S_l]$. $F_S$ comes from an approximation (matching moments to a shifted gamma, recursion, Fourier methods) integrated numerically, or from simulation when no deterministic approximation is practical.
- **The factor.** $I(l, L)$ is the [[Increased Limits|increased limit factor]] from the basic limit with no aggregate limit to a per-claim limit $l$ with aggregate limit $L$. A loss-cost multiplier $\psi$ and a multiplicative ALAE load $(1+u)$ cancel out of it. The premium credit for adding $L$ is $\psi(1+u)\left(E[S_l] - E[S_l;L]\right)$, and the eliminated loss over $E[S_l]$ is the aggregate limit's [[Loss Elimination Ratio|loss elimination ratio]].
- **When it bites.** With every claim capped at $l$, $S_l$ can pass $L$ only when more than $L/l$ claims occur. The reduction is therefore largest when $L$ is a small multiple of $l$ and claims are frequent, and $I(l, L)$ rises toward the per-claim factor $I(l)$ as $L$ grows. Because the base carries no aggregate limit, the basic limit paired with an aggregate limit has a factor below $1$.
- The eliminated share $\left(E[S_l] - E[S_l;L]\right)/E[S_l]$ is the [[Insurance Charge|insurance charge]] at entry ratio $L/E[S_l]$ — the quantity a retrospective maximum or an [[Aggregate Excess of Loss|aggregate excess]] cover also turns on.

> [!example]- Pricing an Aggregate Limit from the Aggregate Distribution {Example}
> A products liability policy has a \$1,000,000 per-claim limit and a \$2,000,000 aggregate limit. Its annual claim count $N$ is $0, 1, 2$ or $3$ with probabilities $0.70, 0.20, 0.07, 0.03$. Independently, each claim settles for \$200,000 (probability $0.75$) or reaches the \$1,000,000 limit (probability $0.25$). The basic limit is \$250,000. Premium is loaded with a loss-cost multiplier $\psi = 1.40$, and ALAE is $10\%$ of indemnity.
>
> (a) Calculate the expected loss eliminated by the aggregate limit, and its loss elimination ratio.
>
> (b) Calculate $I(1\text{M})$ and $I(1\text{M}, 2\text{M})$, and the premium credit for the aggregate limit.
>
> (c) Explain why the credit is small.
>
> > [!answer]-
> > (a) Without the aggregate limit:
> >
> > $$
> > \begin{align*}
> > E[N] &= 0.20 + 2(0.07) + 3(0.03) \\
> > &= 0.43 \\
> > E[X;1\text{M}] &= 0.75(200{,}000) + 0.25(1{,}000{,}000) \\
> > &= 400{,}000 \\
> > E[S_{1\text{M}}] &= 0.43 \times 400{,}000 \\
> > &= 172{,}000
> > \end{align*}
> > $$
> >
> > Total losses pass \$2,000,000 only with three claims, at least two of them at the limit: $S = 3{,}000{,}000$ with probability $0.25^3 = 0.015625$, or $S = 2{,}200{,}000$ with probability $3(0.25^2)(0.75) = 0.140625$.
> >
> > $$
> > \begin{align*}
> > E[S] - E[S;2\text{M}] &= 0.03\,[\,0.015625(1{,}000{,}000) \\
> > &\quad + 0.140625(200{,}000)\,] \\
> > &= 0.03 \times 43{,}750 \\
> > &= 1{,}312.50 \\
> > E[S;2\text{M}] &= 172{,}000 - 1{,}312.50 \\
> > &= 170{,}687.50 \\
> > \text{LER} &= \frac{1{,}312.50}{172{,}000} \\
> > &= 0.0076
> > \end{align*}
> > $$
> >
> > (b) At the basic limit each claim is \$200,000 or \$250,000, so $E[X;250\text{K}] = 0.75(200{,}000) + 0.25(250{,}000) = 212{,}500$, and $E[N]\,E[X;250\text{K}] = 91{,}375$.
> >
> > $$
> > \begin{align*}
> > I(1\text{M}) &= \frac{172{,}000}{91{,}375} \\
> > &= 1.8824 \\
> > I(1\text{M}, 2\text{M}) &= \frac{170{,}687.50}{91{,}375} \\
> > &= 1.8680 \\
> > \text{Credit} &= 1.40 \times 1.10 \times 1{,}312.50 \\
> > &= \$2{,}021
> > \end{align*}
> > $$
> >
> > The premium falls from $1.54 \times 172{,}000 = \$264{,}880$ to $\$262{,}859$.
> >
> > (c) The aggregate limit removes loss only in the tail of $S$: it takes three claims, two of them total-limit, to breach \$2,000,000, and that happens with probability $0.03 \times 0.156 = 0.0047$. An aggregate limit only twice the per-claim limit still takes off less than $1\%$ of expected loss on a policy that expects fewer than one claim a year. It would matter more with more frequent claims, or with $L$ closer to $l$.

> [!example]- Reading an ILF Table with Aggregate Limits {Example}
> For a liability portfolio, $E[N]\,E[X;500{,}000] = 26{,}092$ at the basic limit of \$500,000 with no aggregate limit. Expected aggregate indemnity for other combinations is:
>
> | Per-claim limit | Aggregate limit | $E[S_l;L]$ |
> |---|---|---|
> | $500{,}000$ | $1{,}000{,}000$ | $26{,}050$ |
> | $1{,}000{,}000$ | $1{,}000{,}000$ | $29{,}702$ |
> | $1{,}000{,}000$ | $2{,}000{,}000$ | $30{,}306$ |
> | $1{,}000{,}000$ | none | $30{,}335$ |
>
> (a) Calculate the increased limit factor for each combination.
>
> (b) Calculate the loss elimination ratio of a \$1,000,000 aggregate limit on a \$1,000,000 per-claim policy.
>
> (c) Explain why one factor is below $1$, and why the \$1,000,000 per-claim factors converge.
>
> > [!answer]-
> > (a)
> >
> > $$
> > \begin{align*}
> > I(500\text{K}, 1\text{M}) &= \frac{26{,}050}{26{,}092} \\
> > &= 0.9984 \\
> > I(1\text{M}, 1\text{M}) &= \frac{29{,}702}{26{,}092} \\
> > &= 1.1384 \\
> > I(1\text{M}, 2\text{M}) &= \frac{30{,}306}{26{,}092} \\
> > &= 1.1615 \\
> > I(1\text{M}) &= \frac{30{,}335}{26{,}092} \\
> > &= 1.1626
> > \end{align*}
> > $$
> >
> > (b)
> >
> > $$
> > \begin{align*}
> > \text{LER} &= \frac{30{,}335 - 29{,}702}{30{,}335} \\
> > &= 0.0209
> > \end{align*}
> > $$
> >
> > (c) The factors are measured from the basic limit with *no* aggregate limit. Adding any aggregate limit can only remove loss, so pairing the basic per-claim limit with a \$1,000,000 aggregate gives a factor just under $1$. For the \$1,000,000 per-claim limit, a larger aggregate limit leaves less of the aggregate distribution above it: the factor climbs from $1.1384$ to $1.1615$ and approaches the unlimited-aggregate $1.1626$. The loss-cost multiplier and a proportional ALAE load cancel in each ratio, so the factors hold for premium as well as loss.
