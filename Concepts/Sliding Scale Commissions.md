---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:f6f8dc9f1849c74953255246178eda6693b526af9d2fe2e00f71768d48362a4a
  sources:
    - "Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), §1B(a) pp.9-12 (sliding scale terms and table, balanced plan, 25%/90% naive vs 31%/96% expected, historical reasonability check, aggregate distribution, carryforward: single-year shift of the slide and its problem, long-run block with variance roughly divided by the years and SD by sqrt 5, contract may not renew, deficit but not credit, no standard method), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf"
    - "CAS Exam 8 Fall 2014 — sample answers and examiner's report, Q23(c), PDF pp.98-100 (either position accepted if supported; preserve the volatility of the underlying loss distribution; with a carryforward, an assumption on whether policies renew), sha256:305e1211892c48fd58bd8be8038483992fba1100023d37422a2bca209f90ada1 — https://www.casact.org/sites/default/files/2021-03/14-8_0.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (tasks A1-A5, readings Clark, Bernegger, Grossi & Kunreuther), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Sliding Scale Commissions.md
---

A **Sliding Scale Commission** is a ceding commission on a proportional treaty that varies inversely with the treaty's actual loss ratio, between a stated minimum and maximum. A provisional commission is paid as premium is ceded and then adjusted as losses mature. It is a common adjustable feature of a [[Quota Share|quota share]].

The commission at a treaty loss ratio $\text{LR}$ is

> $$c(\text{LR}) = \min\left(c_{\max},\; \max\left(c_{\min},\; c_0 + s\,(\text{LR}_0 - \text{LR})\right)\right)$$

- $c_0$ is the commission at the scale's breakpoint $\text{LR}_0$ nearest the loss ratio.
- $s$ is the slide. A slide of $1{:}1$ means one point of commission per point of loss ratio.
- The minimum $c_{\min}$ applies at and above a high loss ratio, and the maximum $c_{\max}$ at and below a low one.

The slide may differ from one range to the next, such as $1{:}1$ near the minimum and $0.5{:}1$ toward the maximum. Within the slide, the reinsurer's loss-plus-commission ratio moves by only $1 - s$ per point of loss ratio, and the cedant is rewarded for good experience. Outside the slide the scale does nothing. Above the minimum-commission point the reinsurer bears every extra point of loss, and below the maximum it keeps the extra profit.

> [!example]- What is the commission on this two-slope scale at loss ratios of 75%, 64%, 55% and 40%? {Example}
> The minimum commission is 22% at a 68% loss ratio or higher. It slides $1{:}1$ to 30% at a 60% loss ratio, then $0.5{:}1$ to a maximum of 36% at 48% or lower.
>
> > [!answer]-
> > - At 75%, the loss ratio is above 68%, so the commission is the minimum, 22%.
> > - At 64%, the commission is $22 + (68 - 64) = 26\%$.
> > - At 55%, the commission is $30 + 0.5(60 - 55) = 32.5\%$.
> > - At 40%, the loss ratio is below 48%, so the commission is the maximum, 36%.
> > - The reinsurer's loss-plus-commission ratios are 97%, 90%, 87.5% and 76%. The $1{:}1$ band holds that ratio at 90%.

## Expected commission

Over an [[Aggregate Loss Model|aggregate distribution]] of the treaty loss ratio, the expected commission is

> $$E[c] = \sum_i p_i \, c(\text{LR}_i)$$

- $p_i$ is the probability of the loss-ratio outcome $\text{LR}_i$.

The expected loss ratio is weighted the same way, $E[\text{LR}] = \sum_i p_i \, \text{LR}_i$. The commission at the expected loss ratio is a fair shortcut only for a plan balanced around that loss ratio. Bad years cannot push the commission below the minimum, while good years raise it. In Clark's illustration, the minimum commission of 25% is set at a 65% loss ratio equal to the expected. The commission at the expected loss ratio is 25% and the technical ratio 90%, but weighting over the aggregate distribution gives an expected commission of about 31% and a technical ratio of about 96%.

Historical adjusted loss ratios make a reasonability check. They are distorted by past catastrophes and thin years, and they miss outcomes the history does not contain.

> [!example]- What are the expected commission and the reinsurer's expected technical ratio on the same scale? {Example}
> The treaty loss ratio is 45% with probability 0.15, 55% with 0.30, 64% with 0.30 and 85% with 0.25.
>
> > [!answer]-
> > - The expected loss ratio is $0.15(45) + 0.30(55) + 0.30(64) + 0.25(85) = 63.7\%$.
> > - The commissions at the four loss ratios are 36%, 32.5%, 26% and 22%.
> > - The expected commission is $0.15(36) + 0.30(32.5) + 0.30(26) + 0.25(22) = 28.45\%$.
> > - The expected technical ratio is $63.7 + 28.45 = 92.15\%$.
> > - The commission at the expected loss ratio would be $22 + (68 - 63.7) = 26.3\%$, a technical ratio of 90.0%, which understates the reinsurer's cost by more than two points.

## Carryforward

Past deficits above the minimum-commission loss ratio can be carried into the current year. Priced for a single year, this simply shifts the slide by the carryforward. Priced over a multi-year block, it cuts the variance roughly in proportion to the number of years. Neither view is standard. [[Profit Commission|Profit commissions]] and [[Loss Corridors|loss corridors]] are related provisions ([[Reinsurance Contract Provisions]]).

Clark objects to both approaches. The single-year approach ignores carryforward beyond the current year, so the first year's price is the same with or without the provision, as though the program would be cancelled at year end. The long-run approach has no obvious method for reducing the variance (Clark's example divides the standard deviation by $\sqrt 5$ for a five-year block), and it ignores that the contract may not renew, which could leave the reinsured with no carryforward benefit. The question is harder still when a deficit can be carried forward but not a credit, and Clark knows of no standard method.

Whether to build the carryforward's smoothing into the aggregate distribution used to price the scale also has no standard answer. Leaving it out keeps the full volatility of the underlying business. Reducing the variance assumes the treaty will be renewed, which is uncertain.

> [!trap] Pricing the scale at the expected loss ratio
> The commission at the expected loss ratio is not the expected commission. In the example above it gives 26.3% against an expected 28.45%, because the floor in the 85% year adds more than the maximum takes back in the good years. Weight the commission over the distribution.
