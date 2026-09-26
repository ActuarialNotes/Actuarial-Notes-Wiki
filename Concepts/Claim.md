---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b13b93188e84b1b8d0dfe6f940111ec3ea16794ac0606f396e70dc52ccfbde81
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Claim.md
---

**A claim** is a demand for payment under an [[Insurance Policy|insurance policy]] after an insured event. It is made either by a [[Policyholder|policyholder]] against its own [[Insurer|insurer]] (first party) or by someone the policyholder harmed (third party). In loss models, the claim is what [[Frequency|frequency]] counts ($N$) and what [[Severity|severity]] measures ($X$).

> $$S = X_1 + X_2 + \cdots + X_N$$

> $$E[S] = E[N]\,E[X]$$

- $S$ is aggregate claims for a period, $N$ the claim count, and $X_i$ the claim sizes. The $X_i$ are i.i.d. and independent of $N$. This is the collective risk model of the [[Aggregate Loss Model]]. With Poisson $N$ it becomes the [[Compound Poisson Process]], where claims arrive at random and each has a random size.
- **Claim, loss, occurrence.** The *occurrence* is the event. It can produce several *claims*, one per claimant or per coverage, and the *loss* is the dollar amount. Per-occurrence limits, the [[Occurrence Coverage|occurrence]] versus [[Claims Made Coverage|claims-made]] trigger, and the definition of a claim count all depend on which of the three is being counted.
- **Per loss or per payment.** Under a [[Deductible|deductible]], a loss doesn't always produce a payment. The payment per loss $Y^L$ includes zeros. The payment per payment $Y^P$ is conditional on $X > d$, and $E[Y^L] = P(X > d)\,E[Y^P]$. The number of payments is a thinned count: if losses are Poisson with rate $\lambda$, payments are Poisson with rate $\lambda\,P(X > d)$ ([[Poisson Thinning]]).
- **The claim's life.** A claim is reported, given a [[Case Reserves|case reserve]], paid in one or more instalments and closed. Some close without payment and some reopen. Claims that have occurred but not yet been reported are [[IBNR]]. Counts at each stage feed the [[Claim Count Triangle|claim count triangles]] used in reserving.

> [!example]- Per Loss or Per Payment {Example}
> Losses are exponential with mean $\$2{,}000$, and a $\$500$ deductible applies.
>
> Find the probability that a loss produces a claim payment, the expected payment per loss and the expected payment per payment.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > P(X > 500) &= e^{-500/2000} \\
> > &= 0.7788 \\[6pt]
> > E[Y^L] &= 2000\,e^{-0.25} \\
> > &= 1{,}557.60 \\[6pt]
> > E[Y^P] &= \frac{1{,}557.60}{0.7788} \\
> > &= 2{,}000
> > \end{align*}
> > $$
> >
> > The exponential is memoryless, so the part of a loss above the deductible has the same mean as the loss itself. Both views give the same total: $100$ losses $\times\ \$1{,}557.60$ equals $77.88$ payments $\times\ \$2{,}000$. The trap is mixing them, for example multiplying a count of *losses* by the mean per *payment*.

> [!example]- Aggregate Claims and the Large-Claim Count {Example}
> Claims arrive as a Poisson process at $\lambda = 40$ a year. Claim size has mean $\$5{,}000$ and standard deviation $\$10{,}000$, and $10\%$ of claims exceed $\$20{,}000$.
>
> Find the mean and standard deviation of annual aggregate claims, and the probability of no claim above $\$20{,}000$ in a year.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[S] &= 40 \times 5{,}000 \\
> > &= 200{,}000 \\[4pt]
> > E[X^2] &= 10{,}000^2 + 5{,}000^2 \\
> > &= 1.25 \times 10^{8} \\[4pt]
> > \text{Var}(S) &= 40 \times 1.25 \times 10^{8} \\
> > &= 5 \times 10^{9} \\[4pt]
> > \text{SD}(S) &= 70{,}711
> > \end{align*}
> > $$
> >
> > Claims above $\$20{,}000$ form a thinned Poisson process with rate $40 \times 0.10 = 4$:
> >
> > $$P(\text{no large claim}) = e^{-4} = 0.0183$$
> >
> > A year with no large claim happens less than $2\%$ of the time, so an analyst should expect several large claims every year. The compound variance uses $E[X^2]$ rather than $\text{Var}(X)$, and the large claims drive most of it.
