---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:1d68735576c40b1aada1a87578dd404fd4fd5f23782442d3f4982bd57e1529de
  sources:
    - "Clark, Basics of Reinsurance Pricing (CAS study note, rev. 2014), §1A pp.3–4, §1B pp.9–12, §2A pp.14–15, casualty layers pp.22–23, 27, sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/2021-03/8_Clark.pdf"
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
- **The two ALAE treatments (Clark).** *Pro rata with loss*: the ALAE in the layer is allocated in proportion to losses, claim by claim — the layer takes ALAE $\times$ (layer loss $\div$ total loss) on each claim, and the limit applies to the loss alone. *ALAE as part of loss* ("on top" or "add-on"): ALAE is added to loss and the treaty limit applies to the sum. For a claim of $\$900$K loss and $\$300$K ALAE in a $\$500$K xs $\$500$K layer, pro rata gives layer loss $\$400$K plus ALAE $300 \times 400/900 = \$133$K, so $\$533$K in all; part of loss puts $\$1{,}200$K through the layer, which pays its $\$500$K limit. Clark notes that neither method always puts more in the layer; it depends on the experience.
  - *ALAE and the layer's attachment.* When ALAE counts inside an underlying limit, it uses the underlying up sooner, so the layer above is reached by smaller losses — in effect a lower attachment. When ALAE is outside the layer's own limit, the layer can pay more than its stated limit. For an excess layer, ALAE inside the underlying limit and outside its own costs the most (both effects raise it) and ALAE outside both the least; with ALAE inside both, the two effects pull against each other, and CAS's examiners credit the reasoning that the lower effective attachment outweighs the capping, because most of a layer's expected loss lies in its lower part.
- **Trending against drifting limits (Clark).** After trending, losses must be capped at the limits that would apply if the same policy were written in the treaty period, and Clark says there is no generally accepted solution. Applying the historical policy limit to each trended loss leaves out the fact that insureds generally increase their limits over time; trending without a cap assumes limits "drift" upwards to precisely match inflation, and then subject premium must also be adjusted to the higher limits, or the expected loss cost is overstated. For an umbrella over another carrier's primary policy, the underlying limit is added to the umbrella loss before trend and subtracted after: $\text{Trended loss} = (\text{Loss} + \text{Underlying limit}) \times \text{Trend factor} - \text{Underlying limit}$.
  - *The attachment drifts too.* Underlying limits and attachment points rise over time as well, so an old excess payment came from a ground-up loss above the attachment *then in force*. Rebuilding it with today's higher attachment overstates the ground-up loss, and the trended layer loss with it. For example, an umbrella payment of $\$1$M made when umbrellas attached at $\$1$M came from a $\$2$M ground-up loss; adding today's $\$2$M attachment would trend a $\$3$M loss instead.
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
> > Trend first, then layer (in \$ thousands):
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
