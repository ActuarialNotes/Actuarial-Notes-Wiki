---
aliases:
  - Dynamic Policyholder
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:63f5683e5924abdc665d42a5628df5dd28149b5ea55336d7a4b7258ebfcd77ae
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Dynamic Policyholder Behavior.md
---

**Dynamic Policyholder Behavior** is the modeling assumption that policyholders' decisions, such as to [[Lapse|lapse]], take partial withdrawals, annuitize or start using a guaranteed benefit, respond to the economic conditions in each projected scenario rather than following fixed rates. The usual form multiplies a base rate, set from experience, by a dynamic factor that depends on the value of the policyholder's option.

For a lapse in year $t$, the dynamic lapse rate is

> $$q^{w}_t = q^{w,\text{base}}_t \times f_t$$

- $q^{w,\text{base}}_t$ is the base lapse rate, which depends on duration and the surrender charge schedule.
- $f_t$ is the dynamic factor, a function of how far a guarantee is in the money or how a policy's credited rate compares with what competitors pay.

Lapse and full surrender are the behaviors most often modeled dynamically. The same structure is applied to partial withdrawals, to when a [[Guaranteed Minimum Withdrawal Benefit|guaranteed withdrawal benefit]] is first used and how fully it is used, to annuitization under a [[Guaranteed Minimum Income Benefit|guaranteed income benefit]], and to [[Premium Persistency|premium payments]] on flexible premium products.

## Dynamic lapses on a variable annuity guarantee

An owner whose guarantee is valuable is less likely to give it up, so lapses fall when the guarantee is deep in the money and rise when it is out of the money. The guarantee's moneyness is

> $$\text{ITM}_t = \frac{BB_t}{AV_t}$$

- $BB_t$ is the benefit base.
- $AV_t$ is the account value.
- $\text{ITM}_t > 1$ means the guarantee is in the money.

A common dynamic factor is linear in moneyness between a floor and a cap:

> $$f_t = \max\!\left(L,\ \min\!\left(U,\ 1 - M\left(\text{ITM}_t - 1\right)\right)\right)$$

- $M$ is the slope.
- $L$ and $U$ are the floor and cap on the factor, applied after the linear part is computed.

Real policyholders react less than an option-pricing model would assume. Some lapse an in-the-money guarantee because they need the money or do not understand its value, and others keep an out-of-the-money one through inertia. The floor $L$ keeps some lapses even when the option is valuable, and the cap $U$ limits the reaction.

> [!example]- What is the lapse rate when this GMWB's account value is $\$80{,}000$, $\$50{,}000$ or $\$140{,}000$? {Example}
> A variable annuity with a GMWB has a benefit base of $\$120{,}000$ and a base lapse rate of 6% in the current policy year. The dynamic factor uses illustrative parameters $M = 1.0$, $L = 0.2$ and $U = 1.5$.
>
> > [!answer]-
> > - At $\$80{,}000$, $\text{ITM} = 120{,}000/80{,}000 = 1.5$, so $f = \max(0.2, \min(1.5, 1 - 0.5)) = 0.5$ and $q^{w} = 0.06 \times 0.5 = 3\%$.
> > - At $\$50{,}000$, $\text{ITM} = 2.4$ and the linear part is $1 - 1.4 = -0.4$, so the floor applies, $f = 0.2$ and $q^{w} = 1.2\%$.
> > - At $\$140{,}000$, $\text{ITM} = 0.857$ and $f = 1.143$, below the cap, so $q^{w} = 6.86\%$.
> > - The insurer keeps more of the policies whose guarantees are most valuable, which raises the guarantee's cost compared with a static 6% lapse rate.

> [!trap] Inverting the moneyness ratio
> Some formulas use $AV/BB$ and others $BB/AV$. Inverting the ratio turns an in-the-money guarantee into an out-of-the-money one, so check which the question uses before applying the slope.

## Dynamic surrenders on a fixed annuity

A fixed annuity owner whose credited rate trails the market is more likely to surrender and reinvest. Lapses rise when rates rise quickly, which is the disintermediation risk in [[Asset-Liability Management|asset-liability management]]. A dynamic factor for this case is

> $$f_t = \min\!\left(U,\ 1 + M\max\!\left(0,\ r^{\text{comp}}_t - r^{\text{cred}}_t - k\right)\right)$$

- $r^{\text{comp}}_t$ is the competitor or new-money rate.
- $r^{\text{cred}}_t$ is the rate credited.
- $k$ is the spread owners tolerate before they react.

> [!example]- What is the surrender rate, and what loss is realized on the extra surrenders? {Example}
> A block of 1,000 fixed deferred annuities, each with an account value of $\$100{,}000$, is past its surrender charge period, and the base surrender rate is 8%. Competitors now credit 5.5% while the block credits 3.0%. The dynamic factor uses $M = 0.5$ per percentage point, $k = 1.0$ percentage point and $U = 3$. The bonds backing the block have a market value 8% below book value.
>
> > [!answer]-
> > - The spread beyond the tolerance is $5.5 - 3.0 - 1.0 = 1.5$ percentage points.
> > - The factor is $f = \min(3,\ 1 + 0.5(1.5)) = 1.75$, so the surrender rate is $0.08 \times 1.75 = 14\%$.
> > - The extra surrenders are $1{,}000 \times 100{,}000 \times (0.14 - 0.08) = \$6{,}000{,}000$.
> > - The insurer pays them at book value but sells bonds at market value, so it loses $0.08 \times 6{,}000{,}000 = \$480{,}000$.
> > - A static 8% assumption would show no such loss in a rising rate scenario.

## Calibration and model risk

The parameters are fitted to company or industry [[Experience Study|experience studies]] of lapse rates by moneyness or rate spread. Experience at extreme moneyness is thin, so the tails of the function rest on judgment. The American Academy of Actuaries' 2023 note on dynamic lapses stresses documenting that judgment and testing sensitivity to it.

In a stochastic or nested model the dynamic factor is evaluated in every scenario and every time step, so it changes the tail of the result. Static lapses on a guarantee understate its cost in the scenarios where it is worth most, because those are the scenarios in which fewer owners lapse.

A dynamic function is extrapolated into conditions never observed, such as a new product or an unprecedented rate environment. [[Model Validation|Validation]] compares modeled with actual lapses by moneyness band and checks that the formula behaves sensibly at its limits.
