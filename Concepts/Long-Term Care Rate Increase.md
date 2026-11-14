---
aliases:
  - Long Term Care Rate Increase
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:680cc95a1b0eae8a080d415981a012121fda3b38b0612b3d706d7f4e7a29cbb6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Long-Term Care Rate Increase.md
---
A **Long-Term Care Rate Increase** is an increase in the premium rates of an in-force block of [[Long-Term Care Insurance|long-term care insurance]], which an insurer may file because LTC premiums are level but not guaranteed and can be raised for a whole class of policyholders with the approval of state regulators. Regulators review each filing against loss ratio tests, rate stability rules and, for filings submitted to it, the NAIC's multistate rate review framework.

Many blocks sold before the late 2000s have needed repeated increases, because claims have run far above the pricing. Early LTC pricing assumed that many policyholders would [[Lapse|lapse]], but far fewer did, so many more policies survive to the ages where claims happen. Mortality improved, claims lasted longer as care moved to assisted living and home care, and the long fall in interest rates cut the investment income the level premium relied on. Each of these raises the present value of future claims well above the pricing.

With a proposed increase $r$, the projected lifetime [[Loss Ratio|loss ratio]] is

> $$\text{LLR} = \frac{\text{AV}(C) + \text{PV}(C)}{\text{AV}(P) + (1 + r)\,\text{PV}(P)}$$

- $\text{AV}(C)$ and $\text{AV}(P)$ are the past incurred claims and earned premiums, accumulated with interest to the valuation date.
- $\text{PV}(C)$ and $\text{PV}(P)$ are the present values of projected future claims and of future premiums at current rates.

The increase multiplies only the future premium, so $(1 + r)$ goes on $\text{PV}(P)$ and not on the total.

## The makeup approach

For policies issued before the rate stability rules, a rate increase is justified when the projected lifetime loss ratio exceeds the loss ratio of the original pricing. The makeup approach finds the increase that brings the lifetime loss ratio back to the original level, so the remaining policyholders make up for the premium that was too low in the past. Setting $\text{LLR}$ equal to the original $\text{LLR}_0$, the makeup increase is

> $$r_{\text{makeup}} = \frac{\big(\text{AV}(C) + \text{PV}(C)\big)/\text{LLR}_0 - \text{AV}(P)}{\text{PV}(P)} - 1$$

## The 58/85 test

Under the NAIC's rate stability provisions, which most states adopted from the early 2000s, the initial premium must be certified as sufficient under moderately adverse experience. A later increase must meet the 58/85 test: lifetime claims must be at least 58% of the premiums at original rates plus 85% of the premium from the increase. The test is

> $$\text{AV}(C) + \text{PV}(C) \ge 0.58\,\big(\text{AV}(P) + \text{PV}(P)\big) + 0.85\,r\,\text{PV}(P)$$

It limits the margin an insurer keeps from an increase to 15%.

> [!example]- What are this block's lifetime loss ratio, its makeup increase and the largest increase the 58/85 test allows? {Example}
> An LTC block was priced to a lifetime loss ratio of 60%. Values are in millions.
>
> | | Premiums | Claims |
> | :--- | ---: | ---: |
> | Past, accumulated | 500 | 250 |
> | Future at current rates, present value | 400 | 650 |
>
> > [!answer]-
> > - The projected lifetime loss ratio is $(250 + 650)/(500 + 400) = 100\%$, well above the 60% priced for.
> > - The makeup increase is $(900/0.60 - 500)/400 - 1 = 1.500$, or 150%.
> > - The 58/85 test needs $900 \ge 0.58(900) + 0.85\,r\,(400)$, so $r \le (900 - 522)/340 = 1.112$.
> > - The test, which applies to a rate-stability policy, allows at most 111.2%, which leaves a lifetime loss ratio of $900/(500 + 400 \times 2.112) = 66.9\%$.
> > - Both figures ignore the shock lapse and benefit reductions that follow a large increase, which lower future premiums and claims.

## The if-knew premium

The if-knew premium is what the original premium would have been if today's assumptions had been known at issue. Raising rates only to the if-knew premium means current policyholders don't pay for the past shortfall, so the insurer bears the losses already incurred. The makeup increase recovers past losses from the remaining policyholders, and the if-knew increase does not.

> [!example]- What are this policy's if-knew increase, its two-year phase-in and the benefit cut that keeps the premium unchanged? {Example}
> A policy issued at $\$2{,}000$ a year has had increases of 30% and 25%. Under today's assumptions, the if-knew premium is $\$4{,}000$.
>
> > [!answer]-
> > - The current premium is $2{,}000 \times 1.30 \times 1.25 = \$3{,}250$.
> > - The if-knew increase is $4{,}000/3{,}250 - 1 = 23.08\%$.
> > - After it, the cumulative increase since issue is $4{,}000/2{,}000 - 1 = 100\%$.
> > - Phased in equally over two years, each annual increase is $\sqrt{1.2308} - 1 = 10.94\%$.
> > - A reduced benefit option keeps the premium at $\$3{,}250$ by cutting the benefits to $3{,}250/4{,}000 = 81.25\%$ of their current level, for example by lowering the daily maximum.
> > - The makeup approach would ask for more than 23.08%, because it also recovers the past shortfall.

## The multistate rate review framework

The NAIC adopted the multistate actuarial (MSA) rate review framework in 2022, so that a team of state actuaries reviews an insurer's filing once and recommends a result each state may adopt. It originally reviewed filings under both the Minnesota approach, a blend of the makeup and if-knew approaches with cost sharing, and the Texas approach, which looks at whether the increase reflects changes in expected future experience. The December 2025 revision uses the Minnesota-based approach, with cost sharing that increases with a policyholder's cumulative past increases, so older policyholders who have already absorbed several increases bear less of the next one. Reviews may adjust for interest rates using a market index, and approved increases are often phased in over several years.

With an increase, insurers offer reduced benefit options that keep the premium level, such as a shorter benefit period, a lower daily maximum or less inflation protection. Policyholders who lapse after a substantial increase keep a paid-up contingent nonforfeiture benefit.

## Guaranty associations

When an LTC insurer becomes insolvent, the state life and health guaranty association in each policyholder's state continues the coverage up to a statutory limit, often $\$300{,}000$ of LTC benefits. The association is funded by assessments on the other insurers licensed in the state. The 2017 liquidation of Penn Treaty, the largest LTC insolvency, showed how much of the cost can fall on the guaranty system, and it is one reason regulators approve increases that keep a carrier solvent. Associations may themselves seek rate increases on the policies they assume. The P&C counterpart is described under [[Guaranty Funds|guaranty funds]].

> [!trap] Applying the 85% to the whole future premium
> The 58% applies to all premiums at the original rates, past and future, and the 85% only to the extra premium from the increase. Applying 85% to the whole future premium understates the allowed increase.
