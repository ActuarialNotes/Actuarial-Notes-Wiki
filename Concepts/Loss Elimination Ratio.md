---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:bfb27115bd9ef7f4f1d9dfdd939ceb94feda5ca2cc69e453eac6e325be5b98ab
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.11 pp.199-202 (PDF pp.211-214); Ch.9 p.161 (PDF p.173); Ch.15 p.303 (PDF p.315), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Palmer, Increased Limits Ratemaking for Liability Insurance (CAS study note, 2006), PDF pp.13-14, sha256:44fcc71dbf33647fd07be04e515239989907eb894fc8df5fb18b541ebe301cf7 — https://www.casact.org/sites/default/files/database/studynotes_palmer.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Elimination Ratio.md
---

**Loss Elimination Ratio** (LER) is the proportion of ground-up losses removed by a deductible — the share of expected loss that the insured retains rather than transfers.

> $$\text{LER}(d) = \frac{E[X \wedge d]}{E[X]}$$

> $$\text{Deductible Relativity} = 1 - \text{LER}(d)$$

- $E[X \wedge d] = E[\min(X,d)]$ is the **limited expected value** — the expected loss capped at $d$. Because every loss contributes at most $d$, the LER captures both the small claims eliminated entirely and the first $d$ dollars of the large ones.
- The LER is the bridge from a full-coverage rate to a deductible rate: multiply the full-coverage loss cost by $(1 - \text{LER})$ to get the loss cost net of the deductible. See [[Deductible Rating]].
- LERs are computed from an empirical size-of-loss distribution (where the ground-up loss is known for every claim) or from a fitted continuous distribution. If the data hold only losses net of the deductible, policies with a deductible above the one being priced cannot be used, because the losses they eliminated were never reported.
- The LER **falls as losses inflate**, because a fixed deductible eliminates a shrinking fraction of a growing loss — the leveraged effect described under [[Inflation]]. Deductible relativities must therefore be reviewed as costs rise, or they silently become inadequate.
- The relativity $(1-\text{LER})$ applied to the whole rate rests on Werner's assumption that all expenses are variable. Per-policy [[Fixed Expenses|fixed expenses]] do not shrink with a deductible — where they are material and not charged as a fee, including the fixed-expense loading flattens the relativity — and on a large deductible policy the insurer often handles every claim, including those entirely within the deductible, so the premium must cover those handling costs too.

![[Media/Figures/Loss_Elimination_Ratio.svg|340]]

> [!example]- LER from an Empirical Loss Distribution {Example}
> A book of $1{,}000$ claims has this size-of-loss distribution:
>
> | Loss size | Claims | Total losses |
> |---|---|---|
> | $\$0$–$500$ | $400$ | $\$100{,}000$ |
> | $\$500$–$1{,}000$ | $300$ | $\$225{,}000$ |
> | over $\$1{,}000$ | $300$ | $\$1{,}175{,}000$ |
>
> Compute the LER for a $\$500$ deductible.
>
> > [!answer]-
> > Every claim contributes $\min(X, 500)$:
> >
> > - The $400$ claims under $\$500$ contribute their **full** amount, $\$100{,}000$.
> > - The $600$ claims above $\$500$ each contribute exactly $\$500$: $600 \times \$500 = \$300{,}000$.
> >
> > $$\begin{align*}
> > E[X \wedge 500] \times n &= \$100{,}000 + \$300{,}000 = \$400{,}000 \\[4pt]
> > \text{Total losses} &= \$1{,}500{,}000 \\[6pt]
> > \text{LER}(500) &= \frac{\$400{,}000}{\$1{,}500{,}000} = 26.7\%
> > \end{align*}$$
> >
> > A $\$500$ deductible eliminates $26.7\%$ of losses, so the loss cost net of the deductible is $73.3\%$ of full coverage — even though $40\%$ of *claims* disappear entirely. Claim counts and loss dollars give very different answers, and the rate depends on the dollars.

> [!example]- Inflation Erodes the Loss Elimination Ratio {Example}
> Losses follow an exponential distribution with mean $\theta = \$2{,}000$, and the deductible is $\$500$. Losses then inflate $20\%$.
>
> Show what happens to the LER and to the deductible relativity.
>
> > [!answer]-
> > For an exponential, $E[X \wedge d] = \theta\left(1 - e^{-d/\theta}\right)$ and $E[X] = \theta$, so
> >
> > $$\text{LER}(d) = 1 - e^{-d/\theta}$$
> >
> > $$\begin{align*}
> > \text{Before: } \text{LER} &= 1 - e^{-500/2000} \\
> > &= 1 - e^{-0.25} = 22.1\% \\[6pt]
> > \text{After } (\theta = 2{,}400): \; \text{LER} &= 1 - e^{-500/2400} \\
> > &= 1 - e^{-0.2083} = 18.8\%
> > \end{align*}$$
> >
> > The deductible relativity therefore rises from $0.779$ to $0.812$ — the deductible is worth less to the insured and costs the insurer more.
> >
> > Two consequences follow. First, an insurer that leaves its deductible relativities untouched through an inflationary period systematically under-charges its higher-deductible policies. Second, the *ground-up* rate increase understates the increase needed on deductible business: at $20\%$ inflation, losses excess of the $\$500$ deductible grow by
> >
> > $$\frac{2{,}400 \times 0.812}{2{,}000 \times 0.779} - 1 = +25.1\%$$
> >
> > five points more than the ground-up trend.
