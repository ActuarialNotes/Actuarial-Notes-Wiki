---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:53dd3720989bccad24a87ec7bbd2db096d1e77221e8967c91186aead36a790f5
  sources:
    - "Bahnemann, Distributions for Actuaries, CAS Monograph 2 (2015), §5.1, Ch.5 inflation, Ch.6, PDF pp.154-155, 165-167, 181-182, sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf"
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.3 §2.1, PDF p.56, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.3 §2.1 size and layer methods, PDF pp.56-57, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Layer of Insurance.md
---

A **Layer of Insurance** is the slice of each loss between an attachment point $a$ and an exhaustion point $b = a + l$, written "$l$ xs $a$", together with the coverage that pays it (primary, excess or reinsurance). Its cost is the expected loss that falls inside that slice. On a ground-up loss $X$, the layer pays

> $$X_{(a,b]} = \min(X, b) - \min(X, a)$$

and its expected loss per ground-up claim is

> $$E\left[X_{(a,b]}\right] = E[X \wedge b] - E[X \wedge a]$$

- $E[X \wedge u]$ is the [[Limited Expected Value|limited expected value]] of $X$ at $u$.

Layers stack: the layers of a tower add up to the ground-up loss. The bottom layer, below a deductible $d$, holds the share $E[X \wedge d]/E[X]$ of the expected loss, which is the [[Loss Elimination Ratio|loss elimination ratio]].

## Expected losses in a layer from frequency and severity

With $N$ the claim count, the expected aggregate loss in the layer is

> $$E[\text{layer loss}] = E[N]\left(E[X \wedge b] - E[X \wedge a]\right)$$

The same total can be split into a [[Frequency|frequency]] and a [[Severity|severity]] for the layer. $E[N]\,S(a)$ claims are expected to reach the layer, where $S = 1 - F$ is the survival function of $X$. Each pays on average $\left(E[X \wedge b] - E[X \wedge a]\right)/S(a)$.

> [!example]- What is the expected annual loss in this layer, how many claims are expected to reach it, and what does each pay on average? {Example}
> Claims arrive with a Poisson mean of $20$ a year. Severity is Pareto with $\alpha = 2$ and $\theta = \$100{,}000$, so $E[X \wedge u] = \theta u/(\theta + u)$ and $S(x) = \theta^2/(\theta + x)^2$. The layer is $\$400{,}000$ xs $\$100{,}000$.
>
> > [!answer]-
> > - The layer runs from $a = 100{,}000$ to $b = 500{,}000$.
> > - $E[X \wedge 500{,}000] = 100{,}000 \times 500{,}000/600{,}000 = 83{,}333.33$.
> > - $E[X \wedge 100{,}000] = 100{,}000 \times 100{,}000/200{,}000 = 50{,}000$.
> > - The expected layer loss per ground-up claim is $83{,}333.33 - 50{,}000 = 33{,}333.33$.
> > - The expected annual layer loss is $20 \times 33{,}333.33 = \$666{,}667$.
> > - $S(100{,}000) = (100/200)^2 = 0.25$, so $20 \times 0.25 = 5$ claims are expected to reach the layer.
> > - Each pays on average $33{,}333.33/0.25 = \$133{,}333$.
> > - The layer carries one-third of the expected ground-up loss ($E[X] = \theta = \$100{,}000$ per claim) from a quarter of the claims.

## Cost of a layer given the overall loss cost

When the overall loss cost has been set, the layer's share of it is the layer's share of the expected loss per claim, so the layer loss cost is

> $$\text{Layer loss cost} = \text{overall loss cost} \times \frac{E[X \wedge b] - E[X \wedge a]}{E[X]}$$

In [[Increased Limits|increased limits factor]] form, the layer loss cost is

> $$\text{Layer loss cost} = \text{basic-limits loss cost} \times [\text{ILF}(b) - \text{ILF}(a)]$$

- $\text{ILF}(u)$ is the increased limits factor at limit $u$.

> [!example]- What is the loss cost of the layer $\$500{,}000$ xs $\$250{,}000$? {Example}
> A ground-up loss cost of $\$2{,}400$ per unit of exposure has been set. Ten representative claims, in $\$000$, are $20$, $40$, $60$, $80$, $120$, $150$, $250$, $400$, $700$ and $1{,}180$.
>
> > [!answer]-
> > - The claims total $3{,}000$.
> > - Cap each claim at $750$ and at $250$, then difference the totals.
> > - $\sum \min(X, 750) = 2{,}570$ and $\sum \min(X, 250) = 1{,}470$.
> > - The layer's share is $(2{,}570 - 1{,}470)/3{,}000 = 0.3667$.
> > - The layer loss cost is $2{,}400 \times 0.3667 = \$880$.
> > - The share rests on only three claims ($400$, $700$ and $1{,}180$), so in practice it would come from a fitted severity curve or industry ILFs rather than from this sample.

## The layer on a Lee diagram

The expected loss per claim in a layer is also

> $$E\left[X_{(a,b]}\right] = \int_a^b S(x)\,dx$$

This is the horizontal strip of a [[Lee Diagram]] between $a$ and $b$. The layer method sums horizontal strips $S(x)\,dx$ across it, and the size method sums vertical strips down it.

## Properties of layers

Because $S(x)$ decreases with $x$, expected cost per dollar of limit falls as the layer rises. Successive layers of equal width cost less the higher they attach, so increased limits factors increase with the limit at a decreasing rate ([[Increased Limits#Consistency of increased limits factors|the consistency test]]).

Upper layers grow faster than the ground-up trend under inflation, because the attachment point stays fixed while losses grow ([[Excess and Deductible Rating]]). Upper layers also report and develop later ([[Excess Insurance]]).

> [!trap] Dividing a layer's loss by all claims instead of the claims that reach it
> $E[X \wedge b] - E[X \wedge a]$ is the layer loss per ground-up claim. The average payment per claim in the layer divides it by $S(a)$. In the Pareto example, $\$33{,}333$ per ground-up claim is $\$133{,}333$ per claim that reaches the layer.
