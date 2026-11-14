---
aliases:
  - Disability Income
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:52473d435e58497e110a4db40a22185e78c17268ab708eb9c12c56b88e564bec
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Disability Income Insurance.md
---
**Disability Income Insurance** is insurance that replaces part of a person's earned income while sickness or injury keeps the insured from working. Benefits start after an elimination period and continue while the insured stays disabled, up to the end of a maximum benefit period.

Group short-term disability (STD) pays for weeks or months, group long-term disability (LTD) can pay to retirement age, and individual disability income is sold to individuals, often professionals. In a design that applies the maximum before the offsets, a claimant with pre-disability earnings $W$ receives a benefit of

> $$B = \max\Big(\min(p\,W,\ B_{\max}) - O,\ B_{\min}\Big)$$

- $p$ is the benefit percentage.
- $B_{\max}$ and $B_{\min}$ are the maximum and minimum benefits.
- $O$ is the offset for other disability income.

Benefits replace well under 100% of earnings, so that a claimant keeps a reason to return to work. LTD benefits are reduced by other disability income, such as Social Security disability benefits in the U.S. and workers compensation. Plans differ on whether the maximum applies before or after the offsets, and the two orders give different benefits for a high earner.

> [!example]- What are the LTD benefit and the total replacement ratio for each of these two claimants? {Example}
> An LTD plan pays 60% of monthly earnings to a maximum of $\$6{,}000$, less Social Security disability benefits, with a minimum benefit of $\$100$.
>
> | Claimant | Monthly earnings | Social Security |
> | :--- | ---: | ---: |
> | 1 | 8,000 | 2,100 |
> | 2 | 15,000 | 2,900 |
>
> > [!answer]-
> > - The 60% applies first, then the maximum, then the offset.
> > - Claimant 1 receives $\min(4{,}800,\ 6{,}000) - 2{,}100 = \$2{,}700$.
> > - Claimant 2 receives $\min(9{,}000,\ 6{,}000) - 2{,}900 = \$3{,}100$.
> > - Claimant 1's income while disabled is $2{,}700 + 2{,}100 = 4{,}800$, or 60% of earnings.
> > - Claimant 2's is $3{,}100 + 2{,}900 = 6{,}000$, only 40% of earnings, because the maximum binds.
> > - The offset passes most of the Social Security award to the insurer, which is why insurers help claimants apply for Social Security.

## Elimination period, benefit period and definition of disability

The elimination period is the time a claimant must be disabled before benefits start, and the benefit period is the longest they are paid. STD has a short elimination period and pays for weeks or months, while LTD typically starts after STD ends and pays for years. A longer elimination period removes the many short claims, so it lowers the premium far more than the few weeks of benefit it removes.

An own-occupation definition pays when the insured cannot perform the duties of their own job. An any-occupation definition pays only when the insured cannot work in any job suited to their education, training and experience. Many LTD plans use own occupation for an initial period and any occupation after it, which ends some claims at the switch.

## Claim cost

Disability income is priced and reserved with a [[Multiple State Model|healthy-disabled-dead model]]: how often members become disabled (incidence) and how long claims last (termination). The expected claim cost per life per year at age $x$ is

> $$C_x = i_x \times B \sum_{t=0}^{n-1} v^{t}\,{}_tp^{\,d}_{[x]}$$

- $i_x$ is the incidence rate for a life aged $x$.
- ${}_tp^{\,d}_{[x]}$ is the probability that a claim beginning at age $x$ is still open $t$ periods later.
- $n$ is the number of payments in the benefit period.

Incidence rises with age and varies by occupation, sex, salary and the economy, and claims rise when unemployment rises. Termination by recovery or death is fastest in the first months of a claim and slows with duration, so a claim that has lasted two years is expected to last much longer than a new one.

> [!example]- What is the expected claim cost per life per year of this LTD benefit? {Example}
> An LTD benefit of $\$36{,}000$ a year is paid at the start of each year while the claimant is disabled, for at most four payments after the elimination period. The probabilities that a new claim is still open after one, two and three years are 0.65, 0.55 and 0.50. The incidence rate is 0.004 a year, and $i = 4\%$.
>
> > [!answer]-
> > - The present value of a new claim is $36{,}000\,(1 + 0.65v + 0.55v^2 + 0.50v^3) = 36{,}000 \times 2.5780 = \$92{,}808$.
> > - The claim cost is $0.004 \times 92{,}808 = \$371.23$ a year, or $\$30.94$ a month per insured life.

## Disabled life reserve

For a claim that has been open for $s$ periods, the chance of each later payment is conditional on the claim being open now, and the disabled life reserve is

> $$\text{DLR}_s = B \sum_{t=0}^{n-s-1} v^{t}\,\frac{{}_{s+t}p^{\,d}_{[x]}}{{}_sp^{\,d}_{[x]}}$$

> [!example]- On the LTD benefit above, what is the reserve for a claim open two years, just before its third payment? {Example}
> - Two payments remain, the next one now.
> - The last payment is reached with probability $0.50/0.55$, conditional on the claim being open now.
> - The reserve is $36{,}000\,(1 + (0.50/0.55)\,v) = 36{,}000 \times 1.8741 = \$67{,}469$.
> - Using the unconditional 0.50 instead would give $\$53{,}308$ and understate the reserve by about $\$14{,}000$.

## Individual disability income and its risks

Individual policies are usually noncancellable or guaranteed renewable, so the premium is set at issue for many years. They often pay residual benefits for partial loss of income, and their long guarantees make them a long-duration contract with active life reserves as well as claim reserves.

Disability is partly subjective, especially for mental and musculoskeletal conditions, and a generous replacement ratio or loose definition invites claims. This is moral hazard. Long claims also expose the insurer to [[Interest Rate Risk|interest rate risk]] and to claim litigation.

> [!trap] Unconditional continuance on an open claim
> A reserve for a claim already open for $s$ periods must divide by ${}_sp^{\,d}$. Using the probabilities measured from the start of disability understates the reserve, because the long claims are the ones least likely to end.
