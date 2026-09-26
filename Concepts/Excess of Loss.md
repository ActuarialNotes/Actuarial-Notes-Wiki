---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a9508113a038ed62a111bb680b9614040fbc7ba769007c9a86030acf4c5f9887
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Excess of Loss.md
---

**Excess of Loss** (XS or XOL) is non-proportional reinsurance in which the reinsurer pays the part of each loss — per risk or per occurrence — above the cedant's retention $R$ (the attachment point), up to a limit $L$. The cover is written "$L$ xs $R$" and priced as a [[Loss Cost|loss cost]], or rate, on subject premium.

> $$Y = \min\left(\max(X - R,\, 0),\; L\right)$$

> $$E[Y] = E[X \wedge (R + L)] - E[X \wedge R]$$

- $X$ is the loss to one risk (per risk) or the total from one occurrence (per occurrence), and $E[X \wedge u]$ is the [[Limited Expected Value|limited expected value]]. Expected layer loss is expected claim count times $E[Y]$ — the [[Layer of Insurance|layer]] of the [[Severity Distribution|severity distribution]] between $R$ and $R+L$.
- **Forms.** *Property per risk*: one location. *Casualty per occurrence*: a working layer, penetrated often; an exposed excess layer, attaching below some policy limits; or a [[Clash Cover|clash]] layer above them. *Property catastrophe*: per occurrence across many risks, with [[Reinstatements]]. The aggregate version is [[Aggregate Excess of Loss]].
- **Experience rating (burn cost).** Trend each historical loss individually *before* applying the layer. Excess losses grow faster than trend because a loss just below $R$ trends into the layer. Sum the layer losses by year, apply *excess* development factors (the layer reports and develops later than gross), and divide by [[On Level Premium|on-level]] subject premium. Decide how ALAE enters: pro rata with loss, or added to loss so the limit applies to the sum.
- **Exposure rating** prices the current profile rather than past experience. For property, use an [[Exposure Curves|exposure curve]]: $G\big((R+L)/IV\big) - G\big(R/IV\big)$ by insured-value band. For casualty, use a severity curve or ILFs: $\big[E[X \wedge \min(PL, R+L)] - E[X \wedge \min(PL, R)]\big] / E[X \wedge PL]$ by policy limit $PL$. In both cases the factor multiplies subject premium times the expected loss ratio. Experience and exposure indications are blended by [[Credibility|credibility]].
- **Price language:** rate $=$ premium $\div$ subject premium; *rate on line* $=$ premium $\div L$; *payback* $= L \div$ premium, in years.
- XS takes away the large-loss volatility a [[Quota Share]] leaves in place, but ceded losses report late and develop steeply — see [[Reinsurance]] and [[Reinsurance Reserving]].

> [!example]- Experience-Rating a Per-Risk Layer {Example}
> Price a property per-risk layer of $\$750$K xs $\$250$K. Historical large losses with trend factors to the treaty period and the layer's excess development factors:
>
> - 2021: $\$400$K, trend $1.26$, LDF $1.00$
> - 2022: $\$230$K, trend $1.20$, LDF $1.02$
> - 2023: $\$900$K, trend $1.14$, LDF $1.10$
> - 2024: $\$300$K, trend $1.09$, LDF $1.30$
>
> On-level subject premium is $\$4.0$M in each year. Find the loss cost, and compare trended layer losses with untrended ones.
>
> > [!answer]-
> > Trend first, then layer ($\$$K):
> >
> > - 2021: $504$, layer $254$
> > - 2022: $276$, layer $26$ (untrended, $230$ misses the layer)
> > - 2023: $1{,}026$, layer $750$ (capped)
> > - 2024: $327$, layer $77$
> >
> > $$
> > \begin{align*}
> > \text{Developed} &= 254(1.00) + 26(1.02) \\
> > &\quad + 750(1.10) + 77(1.30) \\
> > &= 254.0 + 26.5 + 825.0 + 100.1 \\
> > &= 1{,}205.6
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Loss cost} &= \frac{1{,}205.6}{16{,}000} \\
> > &= 7.54\%
> > \end{align*}
> > $$
> >
> > **Leverage:** untrended layer losses are $150 + 0 + 650 + 50 = 850$, so trend raised them by $1{,}107/850 - 1 = 30.2\%$. Ground-up losses rose only $2{,}133/1{,}830 - 1 = 16.6\%$. Applying the layer before trending would understate the loss cost badly.

> [!example]- Exposure-Rating a Casualty Layer with ILFs {Example}
> A cedant's general liability book: $\$10$M of subject premium on $\$1$M-limit policies and $\$5$M on $\$2$M-limit policies. The expected loss and ALAE ratio is $65\%$, with ALAE pro rata. Loss ILFs: $\text{ILF}(300\text{K}) = 1.35$, $\text{ILF}(1\text{M}) = 1.75$, $\text{ILF}(2\text{M}) = 2.00$. Find the loss cost of a $\$700$K xs $\$300$K per-occurrence treaty.
>
> > [!answer]-
> > The layer tops out at $\$1$M, so for both limits the numerator is $\text{ILF}(1\text{M}) - \text{ILF}(300\text{K}) = 0.40$.
> >
> > $$
> > \begin{align*}
> > \text{EF}_{1\text{M}} &= \frac{0.40}{1.75} \\
> > &= 0.2286
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{EF}_{2\text{M}} &= \frac{0.40}{2.00} \\
> > &= 0.2000
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > E[\text{Layer loss}] &= 0.65\left[10(0.2286) + 5(0.2000)\right] \\
> > &= 0.65(3.286) \\
> > &= \$2.136\text{M}
> > \end{align*}
> > $$
> >
> > Loss cost $= 2.136/15 = 14.2\%$ of subject premium. The $\$2$M policies put a smaller *share* of their expected loss in the layer, because part of it sits between $\$1$M and $\$2$M, above this treaty.
