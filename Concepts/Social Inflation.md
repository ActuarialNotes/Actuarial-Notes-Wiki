---
aliases:
  - Tort Trend
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:34f3aeb76b7f9d6400c554679a1c1bce52dcbadd3eceb0a95198e3e240267480
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Social Inflation.md
---
**Social Inflation** is the growth in liability claim costs beyond what economic inflation explains, driven by changes in litigation, in the law and in society's attitude to who should pay for harm. The Geneva Association's 2020 report treats it as the part of claims trend that comes from the claims environment rather than from prices and wages, and the SOA's tort law note discusses the same effect as a tort trend.

Actuaries measure it as a residual: the observed [[Loss Trend|severity trend]] with general inflation divided out. The social-inflation component $s$ satisfies

> $$1 + s = \frac{1 + t}{1 + e}$$

- $t$ is the observed annual severity trend.
- $e$ is the economic inflation that applies to the line, a blend of medical, wage and price indices.

Because $s$ is a residual, it also absorbs changes in mix, in claims handling and in reporting, and it is volatile from year to year. A sound analysis checks it against direct evidence, such as attorney involvement rates, verdict sizes and time to settlement, before attributing it to the legal environment.

> [!example]- What is the annual social-inflation component of this commercial auto insurer's severity trend? {Example}
> Its average closed-claim severity rose from $\$50{,}000$ to $\$73{,}466$ over five years, against $3.5\%$ a year of economic inflation.
>
> - The annual severity trend is $1 + t = (73{,}466/50{,}000)^{1/5} = 1.0800$.
> - Dividing out the economic part, $1 + s = 1.0800/1.035 = 1.0435$.
> - About $4.3\%$ a year of the $8\%$ severity trend is social inflation.

## Drivers

The commonly cited drivers are:

- third-party litigation funding, which finances more cases through to trial;
- heavy attorney advertising, which recruits claimants;
- anchoring, where plaintiff's counsel suggests very large figures for non-economic damages;
- the erosion of earlier [[Tort Reform|tort reform]] by courts and legislatures;
- wider theories of liability and falling public trust in large companies;
- jury awards of $\$10$ million or more, known as [[Nuclear Verdicts|nuclear verdicts]].

## Lines affected

Commercial auto (especially trucking), [[Products Liability|products liability]], [[Premises Liability|premises liability]], medical [[Professional Liability Insurance|professional liability]], [[Directors and Officers Liability Insurance|D&O]] and the [[Umbrella Liability Insurance|umbrella and excess]] layers above them are most exposed. Short-tail property lines are barely affected, because they involve little litigation.

## Effect on pricing

A severity trend selected from economic indices alone understates future costs, so rates fall behind. Trend is leveraged in excess layers, because claims that were below the attachment cross into the layer. For a single-parameter [[Pareto Distribution|Pareto]] severity with shape $\alpha$, a uniform trend $t$ raises the cost of any layer above the Pareto's threshold by the factor $(1 + t)^{\alpha}$, so the layer's trend is

> $$\text{Trend}_{\text{layer}} = (1 + t)^{\alpha} - 1$$

[[Increased Limits|Increased limits factors]] therefore drift upward over time, and excess insurers and reinsurers see the effect first and most strongly.

> [!example]- What is one year's trend in the cost of a $\$1{,}000{,}000$ xs $\$1{,}000{,}000$ layer, and how much of it is social? {Example}
> Ground-up severity follows a single-parameter Pareto with $\theta = \$200{,}000$ and $\alpha = 2$. The severity trend is $8\%$ a year, of which economic inflation is $3.5\%$.
>
> > [!answer]-
> > - The layer's expected cost per claim is $\frac{\theta^{\alpha}}{\alpha - 1}\left(a^{1-\alpha} - b^{1-\alpha}\right) = 200{,}000^2 \left(\frac{1}{1{,}000{,}000} - \frac{1}{2{,}000{,}000}\right) = \$20{,}000$.
> > - Trend multiplies $\theta$ by $1.08$, so the trended cost is $20{,}000 \times 1.08^2 = \$23{,}328$, a layer trend of $16.6\%$.
> > - Economic inflation alone would raise the layer by $1.035^2 - 1 = 7.1\%$.
> > - The social part of the layer's trend is $1.1664/1.0712 - 1 = 8.9\%$.
> > - The ground-up mean, $\alpha\theta/(\alpha - 1)$, rises only $8\%$, from $\$400{,}000$ to $\$432{,}000$; the leverage roughly doubles both components in the layer, which is why reinsurers price social inflation more heavily than primary insurers do.

## Effect on reserving

Social inflation acts on every claim settled in a calendar period, whatever its accident year, so it is a [[Calendar Year Effect|calendar-year effect]] on a [[Development Triangle|development triangle]]. Development factors fitted to a period of lower trend understate emergence, and the shortfall shows up later as adverse development on every open accident year at once. What it adds to the [[Unpaid Claims|unpaid claims]] is

> $$\Delta R = \sum_{k \ge 1} P_k \left[(1 + s)^{k} - 1\right]$$

- $P_k$ is the payment on open claims expected $k$ years after the valuation date, at the inflation already in the reserve.

> [!example]- How much is this general liability reserve short if $4\%$ a year of social inflation continues? {Example}
> The reserve for open claims was set using economic inflation only. At that inflation, the expected payments are $\$40$ million, $\$30$ million, $\$20$ million and $\$10$ million in the next four calendar years.
>
> > [!answer]-
> > - Each payment picks up one year of the $4\%$ for each year it lies beyond the valuation date.
> > - $\Delta R = 40(0.04) + 30(1.04^2 - 1) + 20(1.04^3 - 1) + 10(1.04^4 - 1)$.
> > - $\Delta R = 1.600 + 2.448 + 2.497 + 1.699 = 8.244$.
> > - The reserve is short by about $\$8.2$ million, or $8.2\%$ of the $\$100$ million carried; the longer the payout, the larger the effect.

## Superimposed inflation

[[Superimposed Inflation|Superimposed inflation]] is the reserving term used in Australia and in the reserving literature for any calendar-period cost growth beyond economic inflation. Social inflation is the part of it that comes from the legal and social environment.

> [!trap] Subtracting instead of dividing
> The social component is $(1 + t)/(1 + e) - 1$, not $t - e$. With $t = 8\%$ and $e = 3.5\%$, subtracting gives $4.5\%$ instead of $4.3\%$, and the gap widens at higher trends.
