---
aliases:
  - Dynamic Policyholder
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e73e31326ef81164213954aef877b8d31a6fd64e6aab586325109c5396e547c0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Dynamic Policyholder Behavior.md
---
**Dynamic Policyholder Behavior** is the modeling assumption that policyholders' decisions, such as to [[Lapse|lapse]], take partial withdrawals, annuitize or start using a guaranteed benefit, respond to the economic conditions in each projected scenario rather than following fixed rates. The usual form multiplies a base rate, set from experience, by a dynamic factor that depends on the value of the policyholder's option, such as how far a guarantee is in the money or how a policy's credited rate compares with what competitors pay.

> $$q^{w}_t = q^{w,\text{base}}_t \times f\!\left(\text{ITM}_t\right)$$

> $$\text{ITM}_t = \frac{BB_t}{AV_t}$$

> $$f = \max\!\left(L,\ \min\!\left(U,\ 1 - M\left(\text{ITM}_t - 1\right)\right)\right)$$

> $$f^{\text{FA}} = \min\!\left(U,\ 1 + M\max\!\left(0,\ r^{\text{comp}}_t - r^{\text{cred}}_t - k\right)\right)$$

- **Symbols:** $q^{w,\text{base}}_t$ is the base lapse rate, which depends on duration and the surrender charge schedule. For a variable annuity guarantee, $BB_t$ is the benefit base and $AV_t$ the account value, so $\text{ITM}_t > 1$ means the guarantee is in the money. $M$ is the slope, and $L$ and $U$ are the floor and cap on the factor. For a fixed annuity, $r^{\text{comp}}_t$ is the competitor or new-money rate, $r^{\text{cred}}_t$ the rate credited and $k$ the spread owners tolerate before they react.
- **Behaviors that are modeled dynamically:** Lapse and full surrender are the most common, but the same structure is applied to partial withdrawals, to when a [[Guaranteed Minimum Withdrawal Benefit|guaranteed withdrawal benefit]] is first used and how fully it is used, to annuitization under a [[Guaranteed Minimum Income Benefit|guaranteed income benefit]], and to [[Premium Persistency|premium payments]] on flexible premium products.
- **Direction:** An owner whose guarantee is valuable is less likely to give it up, so lapses fall when the guarantee is deep in the money and rise when it is out of the money. A fixed annuity owner whose credited rate trails the market is more likely to surrender and reinvest, so lapses rise when rates rise quickly, which is the disintermediation risk in [[Asset-Liability Management|asset-liability management]].
- **Not fully rational:** Real policyholders react less than an option-pricing model would assume. Some lapse an in-the-money guarantee because they need the money or do not understand its value, and others keep an out-of-the-money one through inertia, so the floor $L$ keeps some lapses even when the option is valuable and the cap $U$ limits the reaction.
- **Calibration:** The parameters are fitted to company or industry [[Experience Study|experience studies]] of lapse rates by moneyness or rate spread. Experience at extreme moneyness is thin, so the tails of the function rest on judgment, and the American Academy of Actuaries' 2023 note on dynamic lapses stresses documenting that judgment and testing sensitivity to it.
- **Where it matters:** In a stochastic or nested model the dynamic factor is evaluated in every scenario and every time step, so it changes the tail of the result. Assuming static lapses on a guarantee understates the cost in the scenarios where the guarantee is worth most, because those are exactly the scenarios in which fewer owners lapse.
- **Model risk:** A dynamic function is extrapolated into conditions never observed, such as a new product or an unprecedented rate environment. [[Model Validation|Validation]] compares modeled with actual lapses by moneyness band and checks that the formula behaves sensibly at its limits.

> [!example]- Dynamic Lapse on an In-the-Money GMWB {Example}
> A variable annuity with a GMWB has a benefit base of \$120,000 and a base lapse rate of 6% in the current policy year. The dynamic factor uses illustrative parameters $M = 1.0$, $L = 0.2$ and $U = 1.5$. Find the lapse rate when the account value is \$80,000, when it is \$50,000, and when it is \$140,000.
>
> > [!answer]-
> > With an account value of \$80,000, the guarantee is in the money.
> > $$
> > \begin{align*}
> > \text{ITM} &= \frac{120{,}000}{80{,}000} \\
> > &= 1.5 \\
> > f &= \max\left(0.2,\ \min\left(1.5,\ 1 - 1.0(0.5)\right)\right) \\
> > &= 0.5 \\
> > q^{w} &= 0.06 \times 0.5 \\
> > &= 0.03
> > \end{align*}
> > $$
> > At \$50,000, $\text{ITM} = 2.4$ and $1 - 1.4 = -0.4$, so the floor applies, $f = 0.2$ and $q^{w} = 1.2\%$. At \$140,000, $\text{ITM} = 0.857$ and $f = 1.143$, which is below the cap, so $q^{w} = 6.86\%$. The insurer keeps more of the policies whose guarantees are most valuable, which raises the guarantee's cost compared with a static 6% lapse rate.

> [!example]- Dynamic Surrenders on a Fixed Annuity When Rates Rise {Example}
> A block of 1,000 fixed deferred annuities, each with an account value of \$100,000, is past its surrender charge period, and the base surrender rate is 8%. Market rates rise, so competitors credit 5.5% while the block credits 3.0%. The dynamic factor uses $M = 0.5$ per percentage point, $k = 1.0$ percentage point and $U = 3$. The bonds backing the block now have a market value 8% below book value. Find the surrender rate and the loss realized on the extra surrenders.
>
> > [!answer]-
> > The spread beyond the tolerance is $5.5 - 3.0 - 1.0 = 1.5$ percentage points.
> > $$
> > \begin{align*}
> > f &= \min\left(3,\ 1 + 0.5(1.5)\right) \\
> > &= 1.75 \\
> > q^{w} &= 0.08 \times 1.75 \\
> > &= 0.14 \\
> > \text{Extra surrenders} &= 1{,}000 \times 100{,}000 \times (0.14 - 0.08) \\
> > &= 6{,}000{,}000 \\
> > \text{Loss} &= 0.08 \times 6{,}000{,}000 \\
> > &= 480{,}000
> > \end{align*}
> > $$
> > The insurer pays the surrenders at book value but must sell bonds at market value, so it loses \$480,000 on the extra surrenders alone. A static 8% assumption would show no such loss in a rising rate scenario.

> [!tip]- How it appears on the exam
> - **CP-312 model questions:** Candidates describe how dynamic policyholder assumptions enter cash flow models for variable annuity guarantees, fixed and fixed indexed annuities and secondary guarantee UL, using the American Academy of Actuaries' note on dynamic lapses and Cardinal's long-term actuarial models.
> - **Calculation:** A question gives a dynamic lapse formula, a base rate and a scenario's account value, benefit base or rates, and asks for the lapse rate or the projected cash flow.
> - **Evaluation:** Some questions ask whether a given function is reasonable, how to calibrate it with limited data, or how dynamic behavior interacts with nested stochastic modeling and hedging.

> [!warning]- Exam traps
> - **Direction of the factor:** For a guarantee, lapses fall as the guarantee moves into the money, while for a fixed annuity, lapses rise as the market rate moves above the credited rate. Using an increasing function of moneyness for a guarantee reverses the risk.
> - **Moneyness ratio inverted:** Some formulas use $AV/BB$ and others $BB/AV$. Check which the question uses before applying the slope, because inverting the ratio turns an in-the-money guarantee into an out-of-the-money one.
> - **Forgetting the floor and cap:** The linear part of the function can fall below zero or rise without limit. Apply $L$ and $U$ after computing the linear part.
> - **Static in a stochastic model:** Calibrating the dynamic function to the average experience and then running it only on the base scenario loses its effect. The dynamic factor matters because it changes lapses differently in each scenario.
