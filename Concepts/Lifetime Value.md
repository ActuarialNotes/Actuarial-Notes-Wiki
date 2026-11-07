---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:ce4ed42077b37574c6d376399408a45f87b20e48bb611a11db543e32b29fe31b
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 13 pp. 257-258 (PDF pp. 269-270), Tables 13.16-13.17, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Lifetime Value.md
---

![[Media/Figures/Lifetime_Value.svg|340]]

A **Lifetime Value** is the profit expected from a customer over the whole of their expected life with the insurer, summed across the current and future renewal terms and discounted. Standard ratemaking sets the rate needed to achieve the target profit over one year, assuming all insureds renew. Lifetime value analysis looks at the profitability of an insured over a longer period, taking into account that not all insureds will renew. Over $T$ policy years, the lifetime profit is

> $$\text{Lifetime Profit} = \sum_{t=1}^{T} \frac{(P_t - L_t - E_t) \times c_t}{(1 + i)^{t-1}}$$

- $P_t$, $L_t$ and $E_t$ are the premium, expected losses and expenses per policy in force in policy year $t$.
- $c_t$ is the cumulative persistency, the probability that a policy written in year 1 is still in force in year $t$.
- $i$ is the discount rate, and the first policy year is not discounted.

The cumulative persistency is the product of the renewal probabilities up to that year, $c_t = p_1 p_2 \cdots p_t$, with $p_1 = 1$ for the year the policy is written. The profit times $c_t$ is the profit adjusted for the customers who will not renew. Lifetime profit as a percentage of premium divides the lifetime profit by the present value of the premium, weighted by persistency the same way. With a $0\%$ discount rate nothing is discounted, and a $0\%$ renewal probability ends the customer's life, so later terms add nothing.

> [!example]- A 22-year-old driver's premium is $\$810$, $\$800$, $\$790$ and $\$780$ over four years, with losses of $\$800$, $\$750$, $\$700$ and $\$650$ and expenses of $\$35$ in year 1 and $\$15$ after. The renewal probabilities are $75\%$, $75\%$ and $80\%$ for years 2 to 4, and the discount rate is $5\%$. What is the lifetime profit as a percentage of premium? {Example}
> - The yearly profits are $-\$25$, $\$35$, $\$75$ and $\$115$.
> - The cumulative persistencies are $100\%$, $75\%$, $56.25\%$ and $45\%$.
> - The persistency-adjusted profits are $-\$25.00$, $\$26.25$, $\$42.19$ and $\$51.75$.
> - Discounted from the start of each year, they are $-\$25.00$, $\$25.00$, $\$38.27$ and $\$44.70$, which sum to $\$82.97$.
> - The present value of the persistency-adjusted premium is $\$2{,}087.70$.
> - The lifetime profit is $82.97/2{,}087.70 = 4.0\%$ of premium, although the first year alone loses $3.1\%$.

A 70-year-old with a profitable first year but rising losses comes out at $-1.8\%$ over the same four years. The one-year view and the four-year view rank the two insureds the other way round.

## Lifetime value and standard ratemaking

Lifetime value analysis, also called asset share pricing, differs from standard ratemaking in four ways:

1. It uses a multi-year horizon rather than a single policy period.
2. It models persistency, so not every insured renews.
3. It discounts the cash flows to present value.
4. It distinguishes new business from renewal business.

New business typically has higher expenses, such as commissions, marketing and start-up costs, so the expense ratio falls as a book matures. New business also tends to have higher loss ratios. Riskier insureds who shop frequently leave, while better risks persist, so loss ratios improve as policies renew. A first-year loss can therefore be recouped through later renewals, and a premium can be set so that the policy breaks even, profit provision included, over the customer's expected life. Every future year's whole net position is weighted by its persistency and discounted, and the sum is set to zero.

> [!example]- A policy costs $\$900$ in year 1, including the new business expenses, and $\$700$ in year 2. It renews with probability $80\%$, and the discount rate is $5\%$. What level premium breaks even over the two years? {Example}
> - The present value of the premium is $P \times (1 + 0.80/1.05) = 1.7619 \times P$.
> - The present value of the costs is $900 + 0.80 \times 700/1.05 = \$1{,}433.33$.
> - Setting them equal, the break-even premium is $1{,}433.33/1.7619 = \$813.51$.
> - A one-year price would have to be $\$900$.

Lower persistency reduces the weight of the later, profitable renewal years against the unprofitable first year, so lifetime profit falls. Higher persistency shifts weight to the later years, so a segment's lifetime return depends both on its profit each year and on how likely it is to renew into the more profitable years. Where results are this sensitive to persistency and the company wants growth, management may look to actions that improve persistency rather than to a rate increase, which would reduce it.

## Retention and optimized pricing

The retention ratio is the number of policies renewed divided by the number of policies up for renewal, not by all policies written:

> $$\text{Retention Ratio} = \frac{\text{Policies Renewed}}{\text{Policies Up for Renewal}}$$

Insureds are price sensitive. When an insurer raises its rates relative to competitors, insureds shop elsewhere, and when it lowers them it retains or attracts more. A retention model predicts the retention ratio as a function of the percentage rate change, and the longer an insured has been with the carrier, the less sensitive the insured is to premium increases. In optimized pricing, each candidate rate change is evaluated by the premium and retention it produces, and the one giving the highest profit, or profit as a percentage of premium, is selected.

> [!example]- 1,000 policies are up for renewal at a $\$1{,}000$ premium and an expected cost of $\$750$ each. A retention model predicts $85\%$ retention at no change, $80\%$ at $+5\%$ and $72\%$ at $+10\%$. Which change gives the highest profit? {Example}
> - At no change the profit is $1{,}000 \times 0.85 \times 250 = \$212{,}500$.
> - At $+5\%$ it is $1{,}000 \times 0.80 \times 300 = \$240{,}000$.
> - At $+10\%$ it is $1{,}000 \times 0.72 \times 350 = \$252{,}000$.
> - The $+10\%$ change gives the highest profit, even though it loses the most customers.

A rate chosen this way maximizes profit rather than estimating future costs. Departing from the indication for retention reasons is legitimate, but it is documented as a departure ([[Ratemaking Constraints|ratemaking constraints]]).

## Franchise value

In Panning's model of the insurer as a whole, the value of future renewals is its [[Franchise Value|franchise value]]. Each year's business is followed by the share $cr$ of clients who renew, and the franchise value is

> $$F = \left[P - E - \frac{L}{1+y}\right]\frac{d}{1-d}$$

- $P$, $E$ and $L$ are the premium, expenses and losses of one year's business, with expenses paid at the start of the year and losses at the end.
- $y$ is the risk-free rate.
- $d = cr/(1+y)$ is the yearly multiplier for retention and discounting.

The bracket is one year's economic profit, and $d/(1-d)$ is the perpetuity of its renewals. When retention varies by year, each year's renewals are discounted and weighted by the cumulative retention to that year instead.
