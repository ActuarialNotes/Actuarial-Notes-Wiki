---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:77ee535bbc3aebab864bff232d4bd80e33079a477c5c1be6a5a43507387270af
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.1 pp.1-2 and Ch.2 p.13 (PDF pp.13-14, 25), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.5 pp.64-67, 71-73, 80-84 (PDF pp.76-79, 83-85, 92-96), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Insurance Premium.md
---

An **Insurance Premium** is the price a [[Policyholder|policyholder]] pays an [[Insurer|insurer]] for the coverage an [[Insurance Policy|insurance policy]] gives over its term. It is not the bond premium of Exam FM, which is the [[Premium]] page. Before rating variables adjust it, a policy's premium is

> $$\text{Premium} = \text{Rate} \times \text{Exposure}$$

- $\text{Rate}$ is the rate per unit of the [[Exposure Base|exposure base]].
- $\text{Exposure}$ is the number of units of the base the policy has.

> [!example]- A workers compensation policy is rated at $\$2.00$ per $\$100$ of payroll on an estimated payroll of $\$10{,}000{,}000$. What is its premium? {Example}
> - The exposure is the payroll in units of $\$100$, $10{,}000{,}000/100 = 100{,}000$.
> - The premium is $100{,}000 \times 2.00 = \$200{,}000$.

## Measures of premium

[[Written Premium|Written premium]] is the premium of the policies written during a period, booked at inception. [[Earned Premium|Earned premium]] ($\text{EP}$) is the part for coverage already provided, and [[Unearned Premium|unearned premium]] is what is left. [[In-Force|In-force]] premium is the annual premium of policies in force on a given date. It is the full-term premium of every policy with an inception date on or before that date and an expiration date on or after it. Ratemaking pairs losses with earned premium.

> [!example]- An annual policy is written on April 1, 2024 for $\$1{,}200$. What are its written, earned, unearned and in-force premium at December 31, 2024? {Example}
> - The whole $\$1{,}200$ is written in 2024, the year of inception.
> - Nine of its twelve months have expired, so $\$900$ is earned.
> - The remaining $\$300$ is unearned.
> - The policy is in force on December 31, so it contributes its full-term $\$1{,}200$ to in-force premium.

## Projected earned premium

Premium is the denominator of the [[Loss Ratio|loss ratio]], so historical premium has to be restated to today's rates and the future average before it is compared with projected losses. The projected earned premium of a historical year is

> $$\text{Projected EP} = \text{EP} \times \text{OLF} \times \text{Trend}$$

- $\text{OLF}$ is the [[On Level Premium|on-level factor]], the current rate level divided by the average historical rate level.
- $\text{Trend}$ is the [[Premium Trend|premium trend]] factor, $(1 + t)^n$ for annual trend $t$ over $n$ years.

Historical premium was charged at the rates of its time, and [[On-Leveling|on-leveling]] restates it at current rates. [[Extension of Exposures|Extension of exposures]] re-rates every policy at today's rates, which is the most accurate approach but needs policy-level data. The [[Parallelogram Method|parallelogram method]] applies an on-level factor to aggregate premium, assuming policies are written evenly through the year. Average premium drifts even when rates are unchanged, as the mix shifts toward higher deductibles, newer cars or higher insured values, so premium is trended as well.

> [!example]- Calendar Year 2024 earned premium is $\$5{,}000{,}000$, its on-level factor is $1.0115$, and premium trend is 2% a year over a trend period of 2.5 years. What is its projected earned premium? {Example}
> - The on-level earned premium is $5{,}000{,}000 \times 1.0115 = \$5{,}057{,}500$.
> - The trend factor is $1.02^{2.5} = 1.05075$.
> - The projected earned premium is $5{,}057{,}500 \times 1.05075 = \$5{,}314{,}168$.

## Premium development

In some lines the exposure is estimated at inception and audited after expiration (payroll in workers compensation, sales in general liability). A [[Premium Audit|premium audit]] books the difference when the audit occurs, as a share of the whole policy's premium. Policy year premium therefore keeps changing after the year ends, and it is developed to ultimate before it is used.

> [!example]- The audit of the $\$200{,}000$ workers compensation policy finds an actual payroll of $\$11{,}500{,}000$. What is the audit adjustment? {Example}
> - The final premium is $(11{,}500{,}000/100) \times 2.00 = \$230{,}000$.
> - The audit books $\$30{,}000$ of additional premium ($15\%$) in a period after the policy expired.

> [!trap] Comparing projected losses with historical premium
> A loss ratio of trended, developed losses over premium still at the rates of its time overstates the indication. Bring the premium to current rate level and trend it too, as in $\text{EP} \times \text{OLF} \times \text{Trend}$.
