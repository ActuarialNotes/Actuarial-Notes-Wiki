---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6e711b9e571716bcc71bd1e57b637697152d5ff29294b8faa0b585363ede4a89
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Retiree.md
---
A **Retiree** is a former employee who has left active service and is receiving, or is entitled to, benefits from a [[Plan Sponsor|plan sponsor's]] [[Retirement Plan|retirement plan]] or post-retirement welfare plan, such as a pension, retiree health coverage or retiree life insurance.

A retiree earns no more service, so the retiree's benefit is fully accrued, and the obligation for a retiree aged $x$ is the expected present value of the benefits still to be paid:

> $$\text{Obligation}_x = \sum_{t \geq 0} v^{t}\, {}_{t}p_{x}\, B_{x+t}$$

- $v$ is the discount factor at the [[Discount Rate|discount rate]].
- ${}_tp_x$ is the probability of surviving $t$ years, from the [[Mortality|mortality]] assumption.
- $B_{x+t}$ is the benefit expected at age $x+t$. For a pension it is the annuity payment, with any indexation.

The retiree's whole obligation is accrued liability. Under IAS 19 the defined benefit obligation equals the full expected present value, and there is no current service cost. This is the same split as [[Actuarial Accrued Liability|accrued liability]] and [[Normal Cost|normal cost]] for an active member, with nothing left in the normal cost.

## Retiree health benefits

For retiree health coverage, the benefit the plan expects to pay at age $x+t$ is

> $$B_{x+t} = s\; c_{x+t}\,(1+h)^{t}$$

- $c_{x+t}$ is the per capita claims cost at age $x+t$.
- $h$ is the health care cost [[Trend|trend]].
- $s$ is the share of gross cost the plan pays after retiree contributions and any government program.

Per capita cost rises both with age, through $c_{x+t}$, and with trend, through $(1+h)^t$.

> [!example]- What is the employer's obligation for this retiree's pre-65 bridge? {Example}
> A retiree aged 62 is covered by an employer plan until 65, when a government plan takes over. The per capita claims cost at 62 is $\$9{,}000$, rising 4% a year with age. Health care trend is 6%, and the retiree pays 30% of cost. Survival is ${}_1p_{62} = 0.99$ and ${}_1p_{63} = 0.985$. The discount rate is 4%, and costs are paid at the start of each year.
>
> > [!answer]-
> > - The employer pays $s = 0.70$ of a cost that grows by $(1.04)(1.06) = 1.1024$ a year.
> > - $B_{62} = 0.70 \times 9{,}000 = 6{,}300.00$.
> > - $B_{63} = 0.70 \times 9{,}921.60 = 6{,}945.12$.
> > - $B_{64} = 0.70 \times 10{,}937.57 = 7{,}656.30$.
> > - The probability of surviving two years is ${}_2p_{62} = 0.99 \times 0.985 = 0.97515$.
> > - The obligation is $6{,}300.00 + 0.99(6{,}945.12)/1.04 + 0.97515(7{,}656.30)/1.04^2$.
> > - That is $6{,}300.00 + 6{,}611.22 + 6{,}902.77 = 19{,}813.99$, so the employer's obligation is about $\$19{,}814$.
> > - Aging and trend together grow the cost 10.2% a year, more than the 4% discount rate pulls it back.

## Risks a retiree faces

The risks a retiree faces, and the [[Plan Design|plan design]] features that move them, are:

| Risk | Design feature that manages it |
| :--- | :--- |
| Outliving savings ([[Longevity Risk|longevity]]) | A [[Life Annuity|life annuity]] form, which pools longevity |
| [[Inflation]] eroding fixed income | Indexation |
| Death of a spouse | Joint-and-survivor forms |
| Rising health and long-term care costs | Retiree health design: caps on the employer subsidy, defined-dollar accounts, a pre-65 bridge |

Retirees also face investment and [[Interest Rate Risk|interest rate risk]] on savings and annuity purchase, cognitive decline, and the sponsor reducing or ending a benefit. Retiree health design decides how much health cost risk stays with the sponsor and how much passes to the retiree.

> [!example]- How long does this retiree's drawdown last, and what life income would an annuity buy instead? {Example}
> A 65-year-old retiree has $\$500{,}000$ and plans to withdraw $\$35{,}000$ at the start of each year while the balance earns 4%. An insurer quotes an annuity-due factor of 14.2 at 65.
>
> > [!answer]-
> > - The drawdown runs out when $35{,}000\,\ddot{a}_{\overline{n}|} = 500{,}000$, so $\ddot{a}_{\overline{n}|} = 14.2857$.
> > - With $d = 0.04/1.04 = 0.03846$, $1 - v^n = 14.2857 \times 0.03846 = 0.5495$.
> > - So $n = -\ln(0.4505)/\ln(1.04) = 20.3$ years, and the money runs out a little after age 85.
> > - The annuity pays $500{,}000/14.2 = \$35{,}211$ a year, slightly more, for life.
> > - The retiree who self-insures bears the whole tail of the survival curve, while the annuity pools it. Against that, the annuitant gives up liquidity and any bequest.

> [!trap] Applying trend without aging
> A projected per capita cost needs both factors, $c_{x+t}(1+h)^t$. Dropping the aging in $c_{x+t}$ understates a retiree health obligation materially.
