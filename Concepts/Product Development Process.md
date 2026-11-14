---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:af44b03e325716ed28bdbfd97083c32d0d3761e165218159225907f6b8e19664
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Product Development Process.md
---

The **Product Development Process** is the sequence of stages by which an insurer takes a new product, such as a group health or benefit product, from an idea to a product on sale, and then manages it once it is sold. Each stage ends with a decision to go on, change course or stop, and each has its own [[Risk|risks]] and opportunities.

The stages, and what can go right or wrong at each, are:

| Stage | Main work | Risks | Opportunities |
| --- | --- | --- | --- |
| Idea | Ideas from brokers, employers, members, competitors, regulation and new technology | Chasing a fad, or copying a competitor without its cost advantage | A gap in the market, such as a product a law change creates |
| Market research | Size of the market, buyers' needs, competitors' products and prices, distribution | Overstating demand, or misreading what buyers value | Finding an underserved segment |
| Design | Benefits, eligibility, cost sharing, network, underwriting rules | [[Moral Hazard|Moral hazard]], [[Adverse Selection|adverse selection]], features administration can't support | Designs that steer members to efficient care |
| Pricing | Claim cost, trend, expenses, margin and manual rates | Assumptions with little or no credible data | Sharper pricing than competitors on the target segment |
| Filing and compliance | Forms and rates filed where required, mandated benefits, contracts | Delay or rejection, a different product in each state | Speed to market where approval is quick |
| Launch | Systems, claims, billing, sales training, marketing | Systems failure, poor service, weak broker interest | Cross-selling to existing clients |
| Monitoring | Sales, persistency, claims and expenses against the pricing | Late detection of an anti-selection spiral | Early repricing or redesign while the block is small |

A full description of the process names both the risk and the opportunity at each stage. The opportunities are usually the reason the product is worth developing.

## The profit test at each gate

A product passes a gate when its projected [[Net Present Value|net present value]] is positive under best-estimate assumptions and the result under adverse assumptions is one the insurer can bear. The projection is redone at each gate as the design, the price and the expected sales become firmer. Over $n$ years, the net present value is

> $$\text{NPV} = -D_0 + \sum_{t=1}^{n} \frac{12\,N_t\,(\pi - c - e) - F}{(1 + r)^t}$$

- $D_0$ is the up-front development cost.
- $N_t$ is the average number of members enrolled in year $t$.
- $\pi$ is the premium per member per month (PMPM).
- $c$ is the expected claim cost PMPM.
- $e$ is the variable expense PMPM.
- $F$ is the fixed annual cost of running the product.
- $r$ is the insurer's hurdle rate.

The break-even membership $N^{*}$, the enrollment at which the product's margin just covers its fixed costs, is

> $$N^{*} = \frac{F}{12\,(\pi - c - e)}$$

Covering the fixed costs each year is not enough when there is an up-front development cost and a hurdle rate, so the product is judged on its NPV, not on the year it first breaks even.

> [!example]- Should this small-group dental product pass the gate? {Example}
> Development costs $\$600{,}000$ now. The premium is $\$40$ PMPM, expected claims are $\$30$ PMPM, variable expenses are $\$4$ PMPM, and fixed costs are $\$150{,}000$ a year. The hurdle rate is 10%. Projected average enrollment is:
>
> | Year | 1 | 2 | 3 | 4 | 5 |
> | :--- | ---: | ---: | ---: | ---: | ---: |
> | Members | 2,000 | 5,000 | 8,000 | 10,000 | 10,000 |
>
> Find the break-even membership and the five-year NPV, then the NPV with claims 5% above expected.
>
> > [!answer]-
> > - The margin is $40 - 30 - 4 = \$6$ PMPM, or $\$72$ per member per year.
> > - The break-even membership is $150{,}000/72 \approx 2{,}083$ members.
> > - The yearly cash flows $72N_t - 150{,}000$ are $-6{,}000$, $210{,}000$, $426{,}000$, $570{,}000$ and $570{,}000$.
> > - Discounted at 10%, they are $-5{,}454.55$, $173{,}553.72$, $320{,}060.11$, $389{,}317.67$ and $353{,}925.15$.
> > - The NPV is $-600{,}000$ plus their sum, or $\$631{,}402.10$.
> > - With claims of $\$31.50$ PMPM, the margin falls to $\$54$ a year, the break-even rises to about $2{,}778$ members, and the NPV falls to $\$181{,}397.07$.
> > - The product passes the gate, but most of its value rests on reaching 8,000 members by year 3 and on a claim cost that has no experience behind it yet.

## Pricing a new product

A new product has no experience of its own, so its claim cost is built from related products, population data, published studies and the claim cost of the benefits it is made from. The thin data is the main pricing risk. It argues for close monitoring and a margin for uncertainty in the first [[Manual Rate|manual rates]].

## Stakeholders in the process

Actuaries, underwriters, marketing, legal and compliance, claims, systems and distribution all take part. A product that is priced well can still fail when the administration can't pay its claims correctly or the brokers won't sell it. The operational stages, such as filing, systems, distribution and monitoring, are where most new products fail, so they carry as much weight as the pricing.

## Monitoring after launch

After launch, sales, enrollment mix, [[Lapse|lapse]], claims and expenses are compared with the pricing assumptions in an [[Actual vs Expected Analysis|actual versus expected analysis]]. What is learned feeds back into rate changes, design changes and the next product.

Early claims may run low because of waiting periods, or high because of pent-up demand. The first months of experience are read against a projection that allows for these effects before repricing.

> [!example]- What does this dental product's experience call for? {Example}
> Nine months after launch, the dental product's claims are running at $\$34.50$ PMPM against the $\$30.00$ expected, and most of the groups sold had no dental coverage before. The premium is $\$40$ PMPM and the target loss ratio is 75%.
>
> > [!answer]-
> > - The actual to expected ratio is $34.50/30.00 = 1.15$.
> > - The actual loss ratio is $34.50/40.00 = 86.25\%$.
> > - If the actual claim cost persists, the premium that restores the target is $34.50/0.75 = \$46.00$, a 15% increase.
> > - Groups buying dental cover for the first time often have pent-up needs for major work, so the first-year excess may partly wear off.
> > - The insurer can also act on the design, through a waiting period for major services or a lower first-year maximum for groups without prior coverage.

> [!trap] Answering with the pricing alone
> An answer that only prices the product misses the stages where most new products fail, such as filing, systems, distribution and monitoring. A full answer names the risk at each stage and how to control it.
