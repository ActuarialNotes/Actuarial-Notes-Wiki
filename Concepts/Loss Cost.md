---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:e28f0469ba2ee9d1b86c38b6842361e91eed36d6a5cfcea2f2af2364c29777b0
  sources:
    - "Bahnemann, Distributions for Actuaries, CAS Monograph 2 (2015), Ch.6, PDF pp.174-176, 181, sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §5.1.1, PDF pp.53-54, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Clark, Basics of Reinsurance Pricing (CAS Study Note, 2014), §1-2A, PDF pp.3-4, 13-16, 20, sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Cost.md
---

**Loss Cost** is the expected cost of claims, before any allowance for expenses or profit, for a unit of exposure, a rating class, a layer or a reinsurance contract. It includes loss adjustment expense only where that is stated. For primary business it is the same thing as the [[Pure Premium|pure premium]], and in reinsurance it is usually quoted as a rate on the cedant's subject premium. The loss cost is

> $$\text{Loss Cost} = \frac{E[\text{Losses}]}{\text{Exposure}}$$

- $E[\text{Losses}]$ is the expected loss for the exposure, class, layer or contract.

> [!example]- A book of $2{,}000$ car-years is expected to cost $\$900{,}000$ in losses. What is its loss cost? {Example}
> - The loss cost is $900{,}000 / 2{,}000 = \$450$ per car-year.

## Loss cost of a layer

The [[Severity Distribution|severity distribution]] gives the share of ground-up loss dollars that falls in a layer $(a, b]$, and the layer's loss cost is that share of the total. With $\text{LC}$ the ground-up loss cost and $X$ the size of a loss, the loss cost of the layer is

> $$\text{LC}_{(a,\,b]} = \text{LC} \times \frac{E[X \wedge b] - E[X \wedge a]}{E[X]}$$

- $E[X \wedge b]$ is the [[Limited Expected Value|limited expected value]] of $X$ at $b$.

Frequency cancels out because every claim contributes to the ground-up mean. [[Increased Limits]] factors do the same calculation with a basic limit as the base.

> [!example]- How is this loss cost split among the first $\$25{,}000$, the layer $\$50{,}000$ excess of $\$25{,}000$, and the amount above $\$75{,}000$? {Example}
> The ground-up loss cost is $\$400$ per exposure. Severity is Pareto with $\alpha = 3$ and $\theta = 50{,}000$, so the share of expected loss below $u$ is $1 - \big(\theta / (\theta + u)\big)^2$.
>
> > [!answer]-
> > - At $u = 25{,}000$ the share above is $(50/75)^2 = 4/9$, and at $u = 75{,}000$ it is $(50/125)^2 = 0.16$.
> > - The first $\$25{,}000$ costs $400 \times (1 - 4/9) = \$222.22$.
> > - The layer costs $400 \times (4/9 - 0.16) = \$113.78$.
> > - The amount above $\$75{,}000$ costs $400 \times 0.16 = \$64.00$, and the three pieces sum to $\$400$.
> > - A $\$25{,}000$ deductible would remove $55.6\%$ of the loss cost, which is its [[Loss Elimination Ratio|loss elimination ratio]].

## Loss cost by class

A [[Generalized Linear Model|GLM]] estimates each [[Rating Class|class's]] loss cost. It is either a [[Tweedie Distribution|Tweedie]] model of pure premium or separate frequency and severity models multiplied together ([[Frequency-Severity Models]]). The standard errors of the fitted relativities show whether a class really differs from the base or the gap is just noise ([[Statistical Significance|statistical significance]]).

## Loss cost of a reinsurance contract

A [[Quota Share|quota share]] cedes a fixed share of every loss, so its loss cost is that share of the subject losses. A [[Surplus Share|surplus share]] cedes a different share of each risk, set by the line size. An [[Aggregate Excess of Loss|aggregate]] cover needs the whole aggregate loss distribution, not only its mean.

An [[Excess of Loss|excess of loss]] layer gets its loss cost from **experience rating**, the *burning cost*: trended, developed layer losses over on-level subject premium. Each loss must also be trended *before* the retention is applied, because the layer trends faster than ground-up losses. It can also come from **exposure rating**, which applies [[Exposure Curves|exposure curves]] or ILFs to the risk profile. The two are credibility-weighted.

> [!example]- What are the expected loss costs of these two contracts? {Example}
> A cedant expects $\$20{,}000{,}000$ of subject premium at a $65\%$ loss ratio. It is considering a $25\%$ quota share, or a $\$500{,}000$ excess of $\$500{,}000$ per-risk layer. Five years of trended, developed layer losses total $\$5{,}400{,}000$ against $\$90{,}000{,}000$ of on-level subject premium.
>
> > [!answer]-
> > - The quota share's loss cost is $0.25 \times 0.65 \times 20{,}000{,}000 = \$3{,}250{,}000$, the cedant's own $65\%$ loss ratio on $\$5{,}000{,}000$ of ceded premium.
> > - The layer's burning cost is $5{,}400{,}000 / 90{,}000{,}000 = 6.0\%$ of subject premium.
> > - The layer's loss cost is $0.060 \times 20{,}000{,}000 = \$1{,}200{,}000$.
> > - Five years may hold only a handful of layer losses, so the burning cost is credibility-weighted against an exposure rate.

A [[Loss Corridors|loss corridor]] hands a band of ceded loss back to the cedant, which lowers the reinsurer's loss cost. [[Reinstatements|Reinstatement]] premiums, [[Sliding Scale Commissions|sliding-scale commissions]] and [[Profit Commission|profit commissions]] change what the reinsurer is paid as losses vary. Evaluating them takes the loss distribution, because the mean alone isn't enough.
