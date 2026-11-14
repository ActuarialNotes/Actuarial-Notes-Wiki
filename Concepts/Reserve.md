---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f77694667acabcbbe1bcd1f703b384f6aafa8868d2c1d416b037b690bf78ad50
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reserve.md
---

A **Reserve** is the liability an [[Insurer|insurer]] or benefit plan holds at a valuation date for obligations under contracts already written. It is the [[Valuation|value]] of the future outgo it is committed to, less the future income it will receive under those contracts.

For long-term [[Life Insurance|life]], annuity and long-term health contracts, the reserve is the policy value. For [[Short-Term Insurance Coverage|short-term coverages]], it is chiefly the [[Claim Reserve|claim reserve]] for claims already incurred, plus the [[Unearned Premium|unearned premium]] reserve for coverage not yet given.

## Policy values

For a policy still in force at duration $t$, the policy value ${}_tV$ is valued prospectively as

> $${}_tV = \text{EPV}_t(\text{benefits} + \text{expenses}) - \text{EPV}_t(\text{premiums})$$

- $\text{EPV}_t$ is the expected present value at time $t$ of the future cash flows, given survival to $t$.

Using gross premiums and expenses gives the gross premium policy value. Using the net premium and no expenses gives the net premium policy value. With the premium set by the [[Equivalence Principle|equivalence principle]], ${}_0V = 0$ on the pricing basis.

Only premiums still to be paid count. "Just before" the time-$t$ premium includes it in the future premiums. "Just after" it does not. For an $n$-payment policy at duration $t < n$, $n - t$ premiums remain, the first due at time $t$.

> [!example]- What are the gross and net premium policy values at time 10, just before the premium is paid? {Example}
> A 20-pay whole life policy of \$100,000 on $(45)$ has gross premium $G = 1{,}351.78$ and net premium $P = 1{,}171.72$. Renewal expenses are $5\%$ of premium plus \$50. On the SULT at $5\%$, $A_{55} = 0.23524$ and $\ddot{a}_{55:\overline{10}|} = 8.0192$.
>
> > [!answer]-
> > - Ten premiums remain, so the premiums are valued with $\ddot{a}_{55:\overline{10}|}$.
> > - Each premium net of renewal expenses is $0.95G - 50 = 1{,}234.19$.
> > - ${}_{10}V^{g} = 100{,}000A_{55} - (0.95G - 50)\,\ddot{a}_{55:\overline{10}|} = 23{,}524 - 9{,}897.22 = 13{,}626.78$.
> > - ${}_{10}V^{n} = 100{,}000A_{55} - P\,\ddot{a}_{55:\overline{10}|} = 23{,}524 - 9{,}396.26 = 14{,}127.74$.
> > - The gross premium policy value is lower. Future premium loadings exceed future renewal expenses, and that surplus repays the unrecovered initial expense, which the net premium policy value ignores.

## The policy value recursion

For a fully discrete policy, the policy value at $t$ plus the premium less expenses, accumulated for a year, pays the expected death benefit and the expected policy value for survivors. The recursion is

> $$\left({}_tV + P_t - E_t\right)(1+i) = q_{x+t}\,S + p_{x+t}\;{}_{t+1}V$$

- $P_t$ and $E_t$ are the premium and expense paid at time $t$.
- $S$ is the sum insured, paid at the end of the year of death.
- $q_{x+t}$ and $p_{x+t} = 1 - q_{x+t}$ are the probabilities of dying and surviving the year.
- $i$ is the interest rate.

Thiele's equation is the continuous form of this recursion.

> [!example]- A policy has ${}_tV = 5{,}000$, $P_t = 1{,}000$, no expenses, $i = 0.05$, $q_{x+t} = 0.01$ and $S = 100{,}000$. What is ${}_{t+1}V$? {Example}
> - The fund accumulates to $(5{,}000 + 1{,}000)(1.05) = 6{,}300$.
> - The expected death benefit is $0.01 \times 100{,}000 = 1{,}000$.
> - ${}_{t+1}V = (6{,}300 - 1{,}000)/0.99 = 5{,}353.54$.

## Claim reserves

For short-term coverages, the claim reserve for incurred claims is

> $$\text{Claim reserve} = \text{Ultimate incurred} - \text{Paid to date}$$

It is [[Case Reserves|case reserves]] plus [[IBNR]]. These [[Unpaid Claims|unpaid claims]] are projected by development methods such as the [[Chain Ladder Method|chain ladder]], health completion factors and [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]]. The non-IBNR reserves in GH-201 also include the unearned premium reserve, a [[Premium Deficiency|premium deficiency]] reserve, and active-life and disabled-life reserves.

> [!example]- What is the claim reserve for April to June? {Example}
> At June 30, a group medical plan has paid \$41,000, \$30,500 and \$9,800 for claims incurred in April, May and June. From the paid-claim lag triangle, the completion factors at those durations are $0.62$, $0.45$ and $0.15$.
>
> > [!answer]-
> > - Each month's ultimate incurred is its paid to date divided by its completion factor.
> > - April's reserve is $41{,}000/0.62 - 41{,}000 = 25{,}129$.
> > - May's reserve is $30{,}500/0.45 - 30{,}500 = 37{,}278$.
> > - June's reserve is $9{,}800/0.15 - 9{,}800 = 55{,}533$.
> > - The claim reserve is $117{,}940$. Nearly half of it comes from June, where a completion factor of $0.15$ magnifies any noise in the paid claims.

Standard practice switches to a projection (PMPM) method for the most recent months. If claims are now paid faster than in the lag history, the old completion factors understate how complete recent months are and overstate the reserve. A slowdown has the opposite effect.

## Reserves under different valuation principles

The same block carries a different reserve under each [[Valuation Principle|valuation principle]]: [[Statutory Accounting Principles|statutory]] (formulaic and principle-based), [[GAAP]], [[IFRS 17]] (fulfilment cash flows plus [[Risk Adjustment for Non-Financial Risk|risk adjustment]] plus [[Contractual Service Margin|CSM]]) and tax.

## Reserves in a profit test

In a profit test, the reserves set aside at the end of each year are a cost in the profit vector. Zeroizing sets the reserve just large enough that no future year shows a negative profit. [[Universal Life Insurance|Universal life]] adds reserves for no-lapse guarantees.

> [!trap] Valuing from the wrong side of the premium
> Just before the time-$t$ premium, it is one of the future premiums. Just after, it is not. The two policy values differ by about one premium less expenses.
