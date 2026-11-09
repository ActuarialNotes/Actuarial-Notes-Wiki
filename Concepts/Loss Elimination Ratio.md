---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:5d1e01ba41512fb7deb8811264bfa6e037038d877ce801abf044dae75bd26c56
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.11 pp.199-202 (PDF pp.211-214); Ch.9 p.161 (PDF p.173); Ch.15 p.303 (PDF p.315), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Palmer, Increased Limits Ratemaking for Liability Insurance (CAS study note, 2006), PDF pp.13-14, sha256:44fcc71dbf33647fd07be04e515239989907eb894fc8df5fb18b541ebe301cf7 — https://www.casact.org/sites/default/files/database/studynotes_palmer.pdf"
    - "D. R. Clark, Basics of Reinsurance Pricing (CAS study note, rev. 2014), p.27 (truncated Pareto severity for excess loss factors, closed-form E[x;L]), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/2021-03/8_Clark.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Elimination Ratio.md
---

![[Media/Figures/Loss_Elimination_Ratio.svg|340]]

A **Loss Elimination Ratio** (LER) is the proportion of ground-up losses removed by a deductible. It is the share of expected loss that the insured retains rather than transfers to the insurer. For a ground-up loss $X$ and a deductible $d$, the loss elimination ratio is

> $$\text{LER}(d) = \frac{E[X \wedge d]}{E[X]}$$

- $E[X \wedge d]$ is the [[Limited Expected Value|limited expected value]], the expected loss capped at $d$.
- $E[X]$ is the expected ground-up loss.

Because every loss contributes at most $d$, the LER captures both the small claims eliminated entirely and the first $d$ dollars of the large ones. The LER is the bridge from a full-coverage rate to a deductible rate: multiply the full-coverage loss cost by $(1 - \text{LER})$ to get the loss cost net of the deductible. That gives the [[Deductible Rating|deductible relativity]].

> [!example]- A book of 1,000 claims has 400 claims under $\$500$ totalling $\$100{,}000$, and 600 claims of $\$500$ or more totalling $\$1{,}400{,}000$. What is the loss elimination ratio of a $\$500$ deductible? {Example}
> - Every claim contributes $\min(X, 500)$ to the losses eliminated.
> - The 400 claims under $\$500$ contribute their full amount, $\$100{,}000$.
> - The 600 claims of $\$500$ or more each contribute $\$500$, which is $600 \times 500 = \$300{,}000$.
> - The losses eliminated are $\$400{,}000$, out of total losses of $\$1{,}500{,}000$.
> - The loss elimination ratio is $400{,}000/1{,}500{,}000 = 26.7\%$, although 40% of the claims disappear entirely.

## Loss elimination ratio of a fitted distribution

When the ground-up loss of every claim is not known, the LER is computed from a continuous distribution fitted to the losses, such as a [[Pareto Distribution|Pareto]] or an exponential, whose limited expected value has a closed form. For an exponential distribution with mean $\theta$, $E[X \wedge d] = \theta\left(1 - e^{-d/\theta}\right)$ and $E[X] = \theta$, so the loss elimination ratio is

> $$\text{LER}(d) = 1 - e^{-d/\theta}$$

> [!example]- Losses are exponential with mean $\$2{,}000$. What is the loss elimination ratio of a $\$500$ deductible? {Example}
> - The ratio of the deductible to the mean is $500/2{,}000 = 0.25$.
> - The loss elimination ratio is $1 - e^{-0.25} = 22.1\%$.
> - The loss cost net of the deductible is $1 - 0.221 = 0.779$ of the full-coverage loss cost.

## Loss elimination ratio under inflation

The LER **falls as losses inflate**, because a fixed deductible eliminates a shrinking fraction of a growing loss. This is the leveraged effect of [[Inflation|inflation]] on a fixed retention. Deductible relativities must be reviewed as costs rise, or they become inadequate, and losses excess of the deductible grow faster than ground-up losses.

> [!example]- Losses are exponential with mean $\$2{,}000$, and the deductible is $\$500$. Losses then inflate 20%. What happens to the loss elimination ratio and to the losses excess of the deductible? {Example}
> - Before inflation, the loss elimination ratio is $1 - e^{-500/2{,}000} = 22.1\%$.
> - After inflation the mean is $\$2{,}400$, and the loss elimination ratio is $1 - e^{-500/2{,}400} = 18.8\%$.
> - The deductible relativity rises from 0.779 to 0.812.
> - The losses excess of the deductible grow by a factor of
>
> $$\frac{2{,}400 \times 0.812}{2{,}000 \times 0.779} = 1.251$$
>
> - **Excess losses grow 25.1%**, five points more than the 20% ground-up trend.

> [!trap] Counting claims instead of dollars
> The LER is a ratio of loss dollars, not of claim counts. In the book above a $\$500$ deductible removes 40% of the claims but only 26.7% of the losses, and the rate depends on the dollars.
