---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5c25ce4cdb83f8f253084b3acdc02b742375ff18403b8822dfcedeec5acb9439
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Cost.md
---

**Loss cost** is the expected cost of claims, before any allowance for expenses or profit, for a unit of exposure, a rating class, a layer or a reinsurance contract. It includes loss adjustment expense only where that is stated. For primary business it is the same thing as the [[Pure Premium|pure premium]]. In reinsurance it is usually quoted as a rate on the cedant's subject premium.

> $$\text{Loss Cost} = \frac{E[\text{Losses}]}{\text{Exposure}}$$

> $$\text{LC}_{(a,\,b]} = \text{LC} \times \frac{E[X \wedge b] - E[X \wedge a]}{E[X]}$$

- **Cost of a layer from the overall loss cost (Exam 8).** The second block works this out. The [[Severity Distribution|severity distribution]] gives the share of ground-up loss dollars that falls in $(a, b]$, and the layer's loss cost is that share of the total. Frequency cancels out because every claim contributes to the ground-up mean. [[Increased Limits]] factors do the same calculation with a basic limit as the base.
- **By class (Exam 8).** A [[Generalized Linear Model|GLM]] estimates each [[Rating Class|class's]] loss cost. It is either a [[Tweedie Distribution|Tweedie]] model of pure premium or separate frequency and severity models multiplied together ([[Frequency-Severity Models]]). The standard errors of the fitted relativities show whether a class really differs from the base or the gap is just noise ([[Statistical Significance]]).
- **Reinsurance contracts (Exam 9).**
    - A [[Quota Share|quota share]] cedes a fixed share of every loss, so its loss cost is that share of the subject losses.
    - A [[Surplus Share|surplus share]] cedes a different share of each risk, set by the line size.
    - An [[Excess of Loss|excess of loss]] layer gets its loss cost from **experience rating**, the *burning cost*: trended, developed layer losses over on-level subject premium. It can also come from **exposure rating**, which applies [[Exposure Curves|exposure curves]] or ILFs to the risk profile. The two are credibility-weighted.
    - An [[Aggregate Excess of Loss|aggregate]] cover needs the whole aggregate loss distribution, not only its mean.
- **Contract provisions.** A [[Loss Corridors|loss corridor]] hands a band of ceded loss back to the cedant, which lowers the reinsurer's loss cost. [[Reinstatements|Reinstatement]] premiums, [[Sliding Scale Commissions|sliding-scale commissions]] and [[Profit Commission|profit commissions]] change what the reinsurer is paid as losses vary. Evaluating them takes the loss distribution; the mean alone isn't enough.

> [!example]- Cost of a Layer from the Overall Loss Cost {Example}
> The ground-up loss cost is $\$400$ per exposure. Severity is Pareto with $\alpha = 3$ and $\theta = 50{,}000$, so the share of expected loss below $u$ is $1 - \big(\theta / (\theta + u)\big)^2$.
>
> Split the loss cost among the first $\$25{,}000$, the layer $\$50{,}000$ excess of $\$25{,}000$, and the amount above $\$75{,}000$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \Big(\tfrac{50}{75}\Big)^2 &= \tfrac{4}{9} \\
> > \Big(\tfrac{50}{125}\Big)^2 &= 0.1600
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{LC}_{(0,\,25\text{K}]} &= 400 \times \big(1 - \tfrac{4}{9}\big) \\
> > &= \$222.22 \\[4pt]
> > \text{LC}_{(25\text{K},\,75\text{K}]} &= 400 \times \big(\tfrac{4}{9} - 0.16\big) \\
> > &= \$113.78 \\[4pt]
> > \text{LC}_{(75\text{K},\,\infty)} &= 400 \times 0.1600 \\
> > &= \$64.00
> > \end{align*}
> > $$
> >
> > The pieces sum to $\$400$. A $\$25{,}000$ deductible would remove $55.6\%$ of the loss cost, which is its [[Loss Elimination Ratio|loss elimination ratio]].

> [!example]- Quota Share Versus Excess of Loss {Example}
> A cedant expects $\$20{,}000{,}000$ of subject premium at a $65\%$ loss ratio. It is considering:
>
> - a $25\%$ quota share;
> - a $\$500{,}000$ excess of $\$500{,}000$ per-risk layer. Five years of trended, developed layer losses total $\$5{,}400{,}000$ against $\$90{,}000{,}000$ of on-level subject premium.
>
> Find each contract's expected loss cost.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{QS loss cost} &= 0.25 \times 0.65 \times 20{,}000{,}000 \\
> > &= \$3{,}250{,}000
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Burning cost} &= \frac{5{,}400{,}000}{90{,}000{,}000} \\
> > &= 6.0\% \\[4pt]
> > \text{XL loss cost} &= 0.060 \times 20{,}000{,}000 \\
> > &= \$1{,}200{,}000
> > \end{align*}
> > $$
> >
> > The quota share reinsurer gets the cedant's own $65\%$ loss ratio on $\$5{,}000{,}000$ of ceded premium. The excess layer's loss cost is a small rate on subject premium but far more volatile, since five years may hold only a handful of layer losses. That is why the burning cost gets credibility-weighted against an exposure rate. Each loss must also be trended *before* the retention is applied, because the layer trends faster than ground-up losses.
