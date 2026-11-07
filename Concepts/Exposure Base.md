---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:c290af56ff9fefb7b3fbc5453f671f8e0446e571e73440e250634ab756809c02
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 4 pp. 49-51, 58 (PDF pp. 61-63, 70); Ch. 6 p. 101 (PDF p. 113); App. D p. D-2 (PDF p. 395), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Exposure Base.md
---

![[Media/Figures/Exposure_Base.svg|340]]

An **Exposure Base** is the unit that measures a policy's exposure to loss, such as a car-year, a house-year or $\$100$ of payroll. Base rates are expressed per unit of the exposure base, so before [[Rating Variable|rating variables]] adjust it, a policy's premium is

> $$\text{Premium} = \text{Rate} \times \text{Exposures}$$

- $\text{Rate}$ is the base rate per exposure.
- $\text{Exposures}$ is the number of units of the exposure base the policy has.

One unit of the base is an exposure. Exposure is counted per year of coverage, so one home insured for two years is two house-years, and a six-month auto policy is one-half of a written car-year. Exposures are written, [[Earned Exposure|earned]], unearned or [[In-Force|in-force]], and the earned exposures are the denominator of the [[Pure Premium|pure premium]].

> [!example]- A workers compensation rate is $\$2.50$ per $\$100$ of payroll. What is the premium for an employer with a payroll of $\$4{,}000{,}000$? {Example}
> - The exposure is the payroll in units of $\$100$, which is $4{,}000{,}000/100 = 40{,}000$ exposures.
> - The premium is $2.50 \times 40{,}000 = \$100{,}000$.

## Criteria for an exposure base

A good exposure base meets three criteria:

1. **Proportional to expected loss.** All else equal, a policy with two exposures should have twice the expected loss of a similar policy with one.
2. **Practical.** The base is objective, and relatively easy and inexpensive to obtain and verify. An objective base also keeps policyholders and producers from manipulating it.
3. **Consistent with historical precedence.** A change of base can cause large premium swings for individual insureds, requires a change in the rating algorithm and systems, and may force significant adjustments to the several years of data a ratemaking analysis uses.

Expected loss varies by many other factors too. Those become rating or underwriting variables, and the factor most directly proportional to expected loss is chosen as the base.

> [!example]- For a homeowners insurer, the expected loss of a $\$200{,}000$ home is higher than that of a $\$100{,}000$ home, but not twice as high. Should it rate on house-years or on amount of insurance? {Example}
> - One home insured for two years has twice the expected loss of the same home insured for one year, so house-years are proportional to expected loss.
> - Doubling the amount of insurance does not double the expected loss, so amount of insurance is not.
> - On the criterion that the exposure base should be the factor most directly proportional to expected loss, **house-years remain the exposure base**, and amount of insurance is used as a **rating variable**.

> [!example]- Why is payroll, and not the number of employees, the exposure base for workers compensation? {Example}
> - Payroll is the workers compensation base because it is responsive to changes in exposure: as the number of workers or the hours they work rise or fall, both payroll and the risk of loss move with them.
> - A headcount would miss a change in the hours worked.
> - Indemnity benefits are a percentage of the injured worker's pre-injury wage, so payroll also tracks the size of the claims.
> - Payroll is recorded by the employer and can be verified by a [[Premium Audit|premium audit]], so it is practical.

> [!example]- Why is products liability rated on gross sales, when the number of products in use is more nearly proportional to expected loss? {Example}
> - An insurer cannot track how many of a company's products are in use during the policy period, so products in use is not practical.
> - Gross sales are known and verifiable, and they are a reasonable proxy for products in use.
> - The proxy is better for a product in use for a short time, such as a cup of coffee, than for one used for years, such as a lawnmower.

> [!example]- Telematics now lets a personal auto insurer measure miles driven accurately. Should it replace car-years with miles driven as its exposure base? {Example}
> - Miles driven are more nearly proportional to expected loss than car-years, because a car driven more is exposed to loss for longer.
> - Measured by a device rather than declared, miles driven are objective and hard to manipulate, so the base is practical.
> - Against historical precedence, the change would swing the premiums of individual insureds, require a new rating algorithm and systems, and leave years of historical data on car-years to be restated.
> - The change is justified only if the gain in proportionality outweighs the cost of the transition.

## Typical exposure bases

| Line of business | Typical exposure base |
| --- | --- |
| Personal automobile | Earned car-years |
| Homeowners | Earned house-years |
| Workers compensation | Payroll |
| Commercial general liability | Sales revenue, payroll, square footage, number of units |
| Commercial business property | Amount of insurance coverage |
| Physicians professional liability | Number of physician-years |
| Professional liability | Number of professionals |
| Personal articles floater | Value of the item |

## Inflation-sensitive exposure bases

Some bases, such as payroll and sales revenue, are highly influenced by inflation. Count-based bases, such as car-years and house-years, are not. The premium on an inflation-sensitive base changes with inflation at an unchanged rate, so its [[Exposure Trend|exposure trend]] is measured and the exposures are trended to the period the rates will be in effect.

> [!example]- In a recession, wages fall 3% while an employer's workforce and hours are unchanged. What happens to its workers compensation premium at an unchanged rate? {Example}
> - The exposure is payroll, so the exposure falls 3%.
> - At an unchanged rate per $\$100$ of payroll, the premium falls 3%, although the number of workers exposed to injury has not changed.

> [!trap] Treating a rating variable as the exposure base
> A characteristic that raises expected loss is not an exposure base unless expected loss rises in proportion to it. Amount of insurance raises a home's expected loss, but rating per $\$1{,}000$ of it would overcharge large homes. It belongs in the rating algorithm as a relativity on the base rate per house-year.
