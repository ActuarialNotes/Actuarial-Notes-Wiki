---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:77ae8c0d0f896ec4ad4ac1cb3095e76109546e1e16e789a65d82821c0ecc3cde
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Excess Insurance.md
---

**Excess Insurance** is coverage that pays only the part of a loss above an attachment point — an underlying policy's limit, a [[Self-Insured Retention|self-insured retention]] or a deductible — up to its own limit. It responds to the large, infrequent losses and leaves the working layer to the underlying insurer or the insured.

> $$Y = \min\left(\max(X - a,\ 0),\ l\right)$$

> $$E[Y] = E[X \wedge (a + l)] - E[X \wedge a]$$

- $X$ is the ground-up loss per occurrence, $a$ the attachment point and $l$ the excess limit ("$l$ xs $a$"). $E[X \wedge u]$ is the [[Limited Expected Value|limited expected value]], so the cover is one [[Layer of Insurance|layer]] of the loss.
- **Forms.** Excess liability and umbrella policies over primary limits; excess over an SIR; specific and aggregate excess workers compensation for self-insured employers; per-risk property excess; and [[Excess of Loss|excess-of-loss reinsurance]], the same structure bought by an insurer. An excess-over-SIR limit sits *above* the retention: a $\$1$M limit over a $\$250$K SIR covers $\$250$K–$\$1.25$M. A large deductible erodes the policy limit instead: a $\$1$M limit with a $\$250$K deductible transfers only $\$250$K–$\$1$M.
- **Pricing (Exam 8).** Few claims reach the layer, so its own experience is rarely credible. The expected cost comes from a fitted severity curve, [[Increased Limits|ILFs]] or [[Exposure Curves|exposure curves]]. Inflation, development and parameter risk all bear harder on it than on primary coverage — see [[Excess and Deductible Rating]].
- **Reserving (Exam 7).** Excess claims are reported later and develop further. A claim now carried *below* the attachment can later pierce it, so the layer's IBNR includes development on known claims. Layer development factors are leveraged and volatile. Sahasrabuddhe links development patterns, trend and claim-size models, so that the pattern for one layer can be converted into another's. See [[Reinsurance Reserving]] and [[Ceded Loss Reserve]].
- **Contract terms change the liability.** Whether ALAE is pro rata, inside the limit or excess of it; aggregate limits and [[Reinstatements|reinstatements]]; an umbrella dropping down when underlying aggregates are exhausted; and [[Latent Liability|latent claims]] exposure.

> [!example]- Allocating Losses to an Umbrella Layer {Example}
> An insured has a $\$1$M primary liability policy and a $\$4$M xs $\$1$M umbrella. Three occurrences settle at $\$600{,}000$, $\$1{,}800{,}000$ and $\$7{,}000{,}000$. Allocate them.
>
> > [!answer]-
> > Apply $\min(\max(X - 1\text{M}, 0), 4\text{M})$ to each loss for the umbrella. The primary pays $\min(X, 1\text{M})$, and anything above $\$5$M stays with the insured.
> >
> > - $\$600$K: primary $\$600$K, umbrella $0$.
> > - $\$1.8$M: primary $\$1$M, umbrella $\$800$K.
> > - $\$7$M: primary $\$1$M, umbrella $\$4$M, uninsured $\$2$M.
> >
> > $$
> > \begin{align*}
> > \text{Primary} &= 0.6 + 1.0 + 1.0 \\
> > &= \$2.6\text{M} \\[4pt]
> > \text{Umbrella} &= 0 + 0.8 + 4.0 \\
> > &= \$4.8\text{M} \\[4pt]
> > \text{Uninsured} &= \$2.0\text{M}
> > \end{align*}
> > $$
> >
> > The three pieces add back to the $\$9.4$M ground-up total. One occurrence produced $83\%$ of the umbrella's losses — the reason excess results are so volatile.

> [!example]- Why the Excess Layer Develops More {Example}
> Three claims are valued at 24 and 60 months: A goes from $\$300$K to $\$450$K, B from $\$800$K to $\$1.3$M, and C from $\$1.5$M to $\$2.1$M. Compare the 24-to-60 development of the ground-up losses, of the primary layer up to $\$1$M, and of the layer excess of $\$1$M.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Ground-up factor} &= \frac{450 + 1{,}300 + 2{,}100}{300 + 800 + 1{,}500} \\
> > &= \frac{3{,}850}{2{,}600} \\
> > &= 1.481 \\[6pt]
> > \text{Primary factor} &= \frac{450 + 1{,}000 + 1{,}000}{300 + 800 + 1{,}000} \\
> > &= \frac{2{,}450}{2{,}100} \\
> > &= 1.167 \\[6pt]
> > \text{Excess factor} &= \frac{0 + 300 + 1{,}100}{0 + 0 + 500} \\
> > &= \frac{1{,}400}{500} \\
> > &= 2.800
> > \end{align*}
> > $$
> >
> > The excess layer develops almost twice as far as the ground-up losses. Part of that comes from claim B, which showed nothing excess at 24 months and then pierced the attachment. Applying ground-up factors to an excess layer would understate its unpaid claims by nearly half.
