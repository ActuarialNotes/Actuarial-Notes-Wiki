---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:73ffbb7c464adb8966d96946ca67e5696d07b7404e98162b5b6891bfd97085f9
  sources:
    - "Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), §1B p.9 (loss occurrence limit), §2A-2B pp.16-20 (experience and exposure rating, credibility, free cover), §3A pp.22-25 (working, exposed excess and clash layers; ALAE method may expose the clash layer; trend then cap; no generally accepted solution; historical limit leaves out that insureds raise limits; uncapped trend assumes limits drift with inflation and needs premium adjusted; pro-rata with loss vs ALAE as part of loss; Examples 1-2; 'not necessarily higher or lower for either method'; excess development), pp.27-30 (casualty exposure factor with ILFs; ALAE included with loss, attachment and limit divided by 1+e), §3B(a) pp.31-32 (umbrella over another carrier: (Loss + Underlying limit) x Trend - Underlying limit), §5 (reinstatements, rate on line, payback), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf"
    - "CAS Exam 8 Fall 2014 — sample answers and examiner's report, Q20(b) and Q21(a), PDF pp.90, 91-93 (2004 attachment likely lower, so the ground-up loss lower; ALAE inside the underlying lowers the umbrella attachment; outside/outside least and inside/outside most; lowered attachment outweighs uncapped ALAE as most expected loss sits low in the layer), sha256:305e1211892c48fd58bd8be8038483992fba1100023d37422a2bca209f90ada1 — https://www.casact.org/sites/default/files/2021-03/14-8_0.pdf"
    - "CAS Exam 8 Fall 2016 — sample answers and examiner's report, Q19, PDF p.75 (pro-rata ALAE in proportion to ceded loss, claim by claim; common mistake: the wrong ratio), sha256:ad67f56b0e090f8c283c58e728d656f4685a6e2b3ff8219144ecb46facbeac2e — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_16-8.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (tasks A1-A5, readings Clark, Bernegger, Grossi & Kunreuther), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Excess of Loss.md
---

**Excess of Loss** (XS or XOL) is non-proportional reinsurance in which the reinsurer pays the part of each loss, per risk or per occurrence, above the cedant's retention $R$ (the attachment point), up to a limit $L$. The cover is written "$L$ xs $R$", and the reinsurer's payment on a loss $X$ is

> $$Y = \min\left(\max(X - R,\, 0),\; L\right)$$

- $X$ is the loss to one risk (per risk) or the total from one occurrence (per occurrence).

> [!example]- A property per-risk layer is $\$750$K xs $\$250$K. What does it pay on losses of $\$276$K and $\$1{,}026$K? {Example}
> - On $\$276$K, the layer pays $276 - 250 = \$26$K.
> - On $\$1{,}026$K, the loss above the retention is $\$776$K, so the layer pays its limit of $\$750$K.

The expected payment per loss is the [[Layer of Insurance|layer]] of the [[Severity Distribution|severity distribution]] between $R$ and $R+L$:

> $$E[Y] = E[X \wedge (R + L)] - E[X \wedge R]$$

- $E[X \wedge u]$ is the [[Limited Expected Value|limited expected value]] of $X$ at $u$.

Expected layer loss is expected claim count times $E[Y]$.

The cover is priced as a [[Loss Cost|loss cost]], or rate, on subject premium. The rate is the premium divided by subject premium. The *rate on line* is the premium divided by $L$, and the *payback* is $L$ divided by the premium, in years.

XS takes away the large-loss volatility a [[Quota Share]] leaves in place, but ceded losses report late and develop steeply ([[Reinsurance]], [[Reinsurance Reserving]]).

## Forms of excess of loss

- **Property per risk** covers one location.
- **Casualty per occurrence** is written as a working layer, penetrated often; an exposed excess layer, attaching below some policy limits; or a [[Clash Cover|clash]] layer above them.
- **Property catastrophe** covers each occurrence across many risks, with [[Reinstatements]].
- **[[Aggregate Excess of Loss]]** applies the layer to the total of losses rather than to each one.

## Experience rating

Experience rating, or burn cost, prices the layer from the cedant's past losses:

1. Trend each historical loss individually *before* applying the layer.
2. Apply the layer to each trended loss and sum the layer losses by year.
3. Apply *excess* development factors, since the layer reports and develops later than gross.
4. Divide by [[On Level Premium|on-level]] subject premium.

Excess losses grow faster than trend because a loss just below $R$ trends into the layer.

> [!example]- What is the loss cost of this per-risk layer? {Example}
> A property per-risk layer is $\$750$K xs $\$250$K. On-level subject premium is $\$4.0$M in each year. The historical large losses, their trend factors to the treaty period and the layer's excess development factors are:
>
> | Year | Loss ($000) | Trend | LDF |
> | :--- | ---: | ---: | ---: |
> | 2021 | 400 | 1.26 | 1.00 |
> | 2022 | 230 | 1.20 | 1.02 |
> | 2023 | 900 | 1.14 | 1.10 |
> | 2024 | 300 | 1.09 | 1.30 |
>
> > [!answer]-
> > - The trended losses are $504$, $276$, $1{,}026$ and $327$ thousand.
> > - Their layer losses are $254$, $26$, $750$ (capped) and $77$ thousand. Untrended, the 2022 loss of $230$ misses the layer.
> > - Developed, the layer losses are $254.0 + 26.5 + 825.0 + 100.1 = 1{,}205.6$ thousand.
> > - The loss cost is $1{,}205.6/16{,}000 = 7.54\%$ of subject premium.
> > - Untrended layer losses are $150 + 0 + 650 + 50 = 850$, so trend raised the layer losses by $1{,}107/850 - 1 = 30.2\%$. Ground-up losses rose only $2{,}133/1{,}830 - 1 = 16.6\%$.

## Treatment of ALAE

The treaty decides how ALAE enters the layer. Clark describes two treatments:

- **Pro rata with loss**: the layer takes ALAE $\times$ (layer loss $\div$ total loss) on each claim, and the limit applies to the loss alone.
- **ALAE as part of loss** ("on top" or "add-on"): ALAE is added to loss and the limit applies to the sum.

For a claim of $\$900$K loss and $\$300$K ALAE in a $\$500$K xs $\$500$K layer, pro rata gives a layer loss of $\$400$K plus ALAE of $300 \times 400/900 = \$133$K, so $\$533$K in all. As part of loss, $\$1{,}200$K goes through the layer, which pays its $\$500$K limit. Clark notes that neither method always puts more in the layer, since it depends on the experience.

When ALAE counts inside an underlying limit, it uses the underlying up sooner, so the layer above is reached by smaller losses, in effect a lower attachment. When ALAE is outside the layer's own limit, the layer can pay more than its stated limit. For an excess layer, ALAE inside the underlying limit and outside its own costs the most, and ALAE outside both the least. With ALAE inside both, the two effects pull against each other. CAS's examiners credit the reasoning that the lower effective attachment outweighs the capping, because most of a layer's expected loss lies in its lower part.

## Trending against drifting limits

After trending, losses must be capped at the limits that would apply if the same policy were written in the treaty period, and Clark says there is no generally accepted solution. Applying the historical policy limit to each trended loss leaves out the fact that insureds generally increase their limits over time. Trending without a cap assumes limits drift upwards to precisely match inflation, and then subject premium must also be adjusted to the higher limits, or the expected loss cost is overstated.

For an umbrella over another carrier's primary policy, the underlying limit is added to the umbrella loss before trend and subtracted after, so the trended umbrella loss is

> $$(\text{Loss} + U) \times \text{Trend factor} - U$$

- $U$ is the underlying limit.

Underlying limits and attachment points rise over time as well, so an old excess payment came from a ground-up loss above the attachment then in force. Rebuilding it with today's higher attachment overstates the ground-up loss, and the trended layer loss with it. An umbrella payment of $\$1$M made when umbrellas attached at $\$1$M came from a $\$2$M ground-up loss. Adding today's $\$2$M attachment would trend a $\$3$M loss instead.

## Exposure rating

Exposure rating prices the current profile rather than past experience. The layer's share of expected loss multiplies subject premium times the expected loss ratio. For property, the share for each insured-value band, read off an [[Exposure Curves|exposure curve]] $G$, is

> $$G\big((R+L)/IV\big) - G\big(R/IV\big)$$

- $IV$ is the insured value.

For casualty, the share for each policy limit $PL$, from a severity curve or ILFs, is

> $$\frac{E[X \wedge \min(PL, R+L)] - E[X \wedge \min(PL, R)]}{E[X \wedge PL]}$$

Experience and exposure indications are blended by [[Credibility|credibility]].

> [!example]- What is the loss cost of a $\$700$K xs $\$300$K per-occurrence treaty on this general liability book? {Example}
> A cedant has $\$10$M of subject premium on $\$1$M-limit policies and $\$5$M on $\$2$M-limit policies. The expected loss and ALAE ratio is $65\%$, with ALAE pro rata. The loss ILFs are $\text{ILF}(300\text{K}) = 1.35$, $\text{ILF}(1\text{M}) = 1.75$ and $\text{ILF}(2\text{M}) = 2.00$.
>
> > [!answer]-
> > - The layer tops out at $\$1$M, so for both limits the numerator is $\text{ILF}(1\text{M}) - \text{ILF}(300\text{K}) = 0.40$.
> > - The share for the $\$1$M policies is $0.40/1.75 = 0.2286$, and for the $\$2$M policies $0.40/2.00 = 0.2000$.
> > - The expected layer loss is $0.65 \times [10(0.2286) + 5(0.2000)] = 0.65 \times 3.286 = \$2.136$M.
> > - The loss cost is $2.136/15 = 14.2\%$ of subject premium.
> > - The $\$2$M policies put a smaller share of their expected loss in the layer, because part of it sits between $\$1$M and $\$2$M, above this treaty.
