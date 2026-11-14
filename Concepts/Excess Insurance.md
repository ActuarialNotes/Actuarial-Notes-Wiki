---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:b1ef1212af9d3bf4fa325ae3ca5b6b9426af7a8384e5d475d2cc639274ae9275
  sources:
    - "IRMI Glossary, 'excess liability policy', entry, sha256:8400c1a7acec64412e464cfeb44e9a19b1bd14cbc14a81d33caaee9f680e2d38 — https://www.irmi.com/term/insurance-definitions/excess-liability-policy"
    - "IRMI Glossary, 'umbrella liability policy', entry, sha256:5cce6a9bbdf4f78a8916a7a9cd477c31d14051abe9f552582a8af7b7e6e14268 — https://www.irmi.com/term/insurance-definitions/umbrella-liability-policy"
    - "IRMI Glossary, 'self-insured retention (SIR)', entry, sha256:cc734858023b47db3112cb5e4f0ff025ca8f50ad098792ee7110f802a7c5cca6 — https://www.irmi.com/term/insurance-definitions/self-insured-retention"
    - "IRMI Glossary, 'deductible', entry, sha256:95bff5ff32cde7c6a56aafa63343209ec839067f1a3ed9a75dd4dda780c17286 — https://www.irmi.com/term/insurance-definitions/deductible"
    - "D. R. Clark, Basics of Reinsurance Pricing (CAS study note, rev. 2014), pp.15, 23-25, 17-19, 27-30, 43, sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/2021-03/8_Clark.pdf"
    - "R. Sahasrabuddhe, 'Claims Development by Layer' (CAS E-Forum Fall 2010, rev. 2 Jan 2013), abstract and §1, sha256:42ecb7ecc7270a462e397a1d4d5c8d42e50b4bc9719122b4c53873dfc84fd5a3 — https://www.casact.org/pubs/forum/10fforum/Sahasrabuddhe.pdf"
    - "D. R. Clark, Basics of Reinsurance Pricing (CAS study note, rev. 2014), p.27 (truncated Pareto severity for excess loss factors, closed-form E[x;L]), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/2021-03/8_Clark.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Excess Insurance.md
---
**Excess Insurance** is coverage that pays only the part of a loss above an attachment point, up to its own limit. The attachment point is an underlying policy's limit, a [[Self-Insured Retention|self-insured retention]] or a deductible.

On a ground-up loss $X$ per occurrence, a layer of limit $l$ excess of an attachment point $a$ ("$l$ xs $a$") pays

> $$Y = \min\left(\max(X - a,\ 0),\ l\right)$$

The cover is one [[Layer of Insurance|layer]] of the loss. It responds to the large, infrequent losses and leaves the working layer to the underlying insurer or the insured.

> [!example]- An insured has a $\$1$M primary policy and a $\$4$M xs $\$1$M umbrella. How are occurrences of $\$600$K, $\$1.8$M and $\$7$M split? {Example}
> - The primary pays $\min(X, 1\text{M})$, the umbrella pays $\min(\max(X - 1\text{M}, 0), 4\text{M})$, and anything above $\$5$M stays with the insured.
> - The $\$600$K loss is all primary.
> - The $\$1.8$M loss is $\$1$M primary and $\$800$K umbrella.
> - The $\$7$M loss is $\$1$M primary, $\$4$M umbrella and $\$2$M uninsured.
> - The primary pays $\$2.6$M, the umbrella $\$4.8$M and the insured $\$2$M. The three pieces add back to the $\$9.4$M ground-up total.
> - One occurrence produced $83\%$ of the umbrella's losses, which is why excess results are volatile.

The expected loss in the layer is

> $$E[Y] = E[X \wedge (a + l)] - E[X \wedge a]$$

- $E[X \wedge u]$ is the [[Limited Expected Value|limited expected value]] of $X$ at $u$.

## Forms of excess insurance

Excess insurance is sold as excess liability and umbrella policies over primary limits, excess over an SIR, specific and aggregate excess workers compensation for self-insured employers, and per-risk property excess. [[Excess of Loss|Excess-of-loss reinsurance]] is the same structure bought by an insurer.

An excess liability policy adds limits above one or more underlying policies, either following their form or on its own terms, without broadening their coverage. An [[Umbrella Liability Insurance|umbrella]] also covers some claims the underlying policies exclude, above a self-insured retention, and drops down when an underlying aggregate is exhausted.

Contract terms change the liability: whether ALAE is pro rata, inside the limit or excess of it, aggregate limits and [[Reinstatements|reinstatements]], and [[Latent Liability|latent claims]] exposure.

## Pricing excess layers

Few claims reach the layer, so its own experience is rarely credible. [[Excess and Deductible Rating|Excess rating]] takes the expected cost from a fitted severity curve such as a [[Pareto Distribution|Pareto]], from [[Increased Limits|ILFs]] or from [[Exposure Curves|exposure curves]]. Inflation, development and parameter risk all bear harder on the layer than on primary coverage.

## Reserving excess layers

Excess claims are reported later and develop further. A claim now carried *below* the attachment can later pierce it, so the layer's IBNR includes development on known claims. Layer development factors are leveraged and volatile. Sahasrabuddhe's [[Layer Development Factor|layer development factors]] link development patterns, trend and claim-size models, so that the pattern for one layer can be converted into another's.

> [!example]- How do the ground-up, primary and excess layers of these claims develop from 24 to 60 months? {Example}
> The primary layer is the first $\$1$M of each claim, and the excess layer is everything above $\$1$M. Three claims are valued at 24 and 60 months ($000s):
>
> | Claim | 24 months | 60 months |
> | --- | ---: | ---: |
> | A | 300 | 450 |
> | B | 800 | 1,300 |
> | C | 1,500 | 2,100 |
>
> > [!answer]-
> > - The ground-up factor is $3{,}850 / 2{,}600 = 1.481$.
> > - The primary layer goes from $300 + 800 + 1{,}000 = 2{,}100$ to $450 + 1{,}000 + 1{,}000 = 2{,}450$, a factor of $1.167$.
> > - The excess layer goes from $500$ to $300 + 1{,}100 = 1{,}400$, a factor of $2.800$.
> > - Part of that comes from claim B, which showed nothing excess at 24 months and then pierced the attachment.
> > - The ground-up factor would project the layer at $500 \times 1.481 = 740$, understating its ultimate of $1{,}400$ by almost half.

> [!trap] Reading an excess-over-SIR limit as including the retention
> An excess-over-SIR limit sits *above* the retention. A $\$1$M limit over a $\$250$K SIR covers $\$250$K–$\$1.25$M, not $\$250$K–$\$1$M.
