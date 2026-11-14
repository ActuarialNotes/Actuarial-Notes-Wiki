---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:079520ef72d876a547df3b0997bf61952850c88ab709a6867467c3f8e92f96fa
  sources:
    - "Bahnemann, Distributions for Actuaries, CAS Monograph 2 (2015), §5.1, Ch.6 intro, PDF pp.154-155, 174, sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf"
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.3 §1.2, §3.1, PDF pp.44, 66, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Expected Loss.md
---

**Expected Loss** is the mean of the loss that an insurer, or one layer of its coverage, will bear over a period. It is the expected number of claims times the expected amount each claim contributes. If the claim count $N$ is independent of the claim sizes $X_i$, the expected [[Aggregate Loss Model|aggregate loss]] $S$ is

> $$E[S] = E[N]\,E[X]$$

- $E[N]$ is the expected claim count, from the [[Frequency|frequency]] distribution.
- $E[X]$ is the mean ground-up claim size, from the [[Severity Distribution|severity distribution]].

Expected loss is where every price starts. In individual risk rating it is the benchmark that actual experience is measured against.

## Expected loss by layer

A [[Layer of Insurance|layer]] $(a, b]$ pays $\min(X, b) - \min(X, a)$ on each claim, so its expected aggregate loss is

> $$E[S_{(a,\,b]}] = E[N]\,\big(E[X \wedge b] - E[X \wedge a]\big)$$

- $E[X \wedge u] = \int_0^u [1 - F(x)]\,dx$ is the [[Limited Expected Value|limited expected value]] of $X$ at $u$.

The same total can be found by counting the claims that *reach* the layer, $E[N]\,[1 - F(a)]$, and multiplying by their mean payment in the layer. The two routes agree. Expected losses by layer are what [[Increased Limits|increased limits factors]], [[Excess Insurance|excess]] prices and deductible credits are built from.

> [!example]- What are the expected annual losses in the layer $\$100{,}000$ xs $\$100{,}000$? {Example}
> Claims average $20$ a year. Severity is exponential with $\theta = 50{,}000$, so $E[X \wedge u] = \theta\,(1 - e^{-u/\theta})$.
>
> > [!answer]-
> > - The layer runs from $a = 100{,}000$ to $b = 200{,}000$.
> > - $E[X \wedge 200{,}000] = 50{,}000\,(1 - e^{-4}) = 49{,}084.22$.
> > - $E[X \wedge 100{,}000] = 50{,}000\,(1 - e^{-2}) = 43{,}233.24$.
> > - The expected layer losses are $20 \times (49{,}084.22 - 43{,}233.24) = \$117{,}020$.
> > - Check by the claims that reach the layer: $20\,e^{-2} = 2.707$ of them are expected.
> > - The exponential is memoryless, so each pays on average $50{,}000\,(1 - e^{-2}) = 43{,}233$ in the layer.
> > - $2.707 \times 43{,}233 = \$117{,}020$, the same total.

## Severity tails and excess layers

Two severity distributions with the same mean can put very different amounts above a high attachment point. Excess pricing depends on how well the tail is fitted, and the mean says little about it. The expected losses of the layers of a tower still add up to the total expected loss, whatever the tail.

> [!example]- How do this account's expected losses split among the three layers? {Example}
> An account expects $12$ claims. Severity is Pareto with $\alpha = 2$ and $\theta = 100{,}000$, so $E[X] = 100{,}000$ and $E[X \wedge u] = \theta u/(\theta + u)$. The layers are a $\$250{,}000$ primary layer, $\$750{,}000$ xs $\$250{,}000$, and everything above $\$1{,}000{,}000$.
>
> > [!answer]-
> > - $E[X \wedge 250{,}000] = 100{,}000 \times 250{,}000/350{,}000 = 71{,}428.57$.
> > - $E[X \wedge 1{,}000{,}000] = 100{,}000 \times 1{,}000{,}000/1{,}100{,}000 = 90{,}909.09$.
> > - The primary layer expects $12 \times 71{,}428.57 = \$857{,}143$.
> > - The middle layer expects $12 \times (90{,}909.09 - 71{,}428.57) = 12 \times 19{,}480.52 = \$233{,}766$.
> > - Above $\$1{,}000{,}000$, the account expects $12 \times (100{,}000 - 90{,}909.09) = \$109{,}091$.
> > - The total is $\$1{,}200{,}000 = 12 \times E[X]$.
> > - An exponential with the same mean puts only $100{,}000\,e^{-10} = \$4.54$ per claim above $\$1{,}000{,}000$, about $1/2{,}000$ of the Pareto's $\$9{,}090.91$. The two curves give the same total expected loss and very different excess prices.

## Expected loss in rating plans

[[Experience Rating|Experience rating]] compares a risk's actual losses with the expected losses for its exposure. [[Retrospective Rating|Retrospective rating]] and [[Table M]] express aggregate loss as an entry ratio,

> $$r = \frac{L}{E[L]}$$

- $L$ is a risk's aggregate loss, and $E[L]$ is its expected aggregate loss.

In reserving, the expected loss *ratio* is the prior input to the [[Expected Loss Method|expected loss method]].
