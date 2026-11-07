---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:5f095cf5f20511bedfe839528e5b7eabf0aaf7f91c9581a44c8a56eca01d92bd
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 pp. 71-73, 80 (PDF pp. 83-85, 92), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Third Version, July 2010), Ch. 3 p. 41 (PDF p. 41), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Extension of Exposures.md
---

**Extension of Exposures** is the [[On-Leveling|on-leveling]] method that re-rates every historical policy under the rates in effect today, using each policy's own rating characteristics, so that historical premium is restated at the current rate level policy by policy rather than by an average factor. A cohort's premium at current rate level (CRL) is

> $$\text{Premium at CRL} = \sum_{j} P_{\text{current}}(\mathbf{x}_j,\ e_j)$$

- $\mathbf{x}_j$ is policy $j$'s set of rating characteristics, such as class, territory, limit and deductible.
- $e_j$ is policy $j$'s exposure.
- $P_{\text{current}}$ is the premium the current [[Rating Algorithm|rating algorithm]], with its rates, relativities and fees, produces for the policy.

The result is [[On Level Premium|on-level premium]] for whatever cohort the policies are summed over. Policies with identical characteristics may be grouped, which in practice helps only in lines with simple rating algorithms.

> [!example]- A policy effective $3/1/2011$ has 10 class Y exposures. It was rated at a base rate of $\$1{,}045$, a class Y factor of $0.60$ and a policy fee of $\$1{,}100$. Current rates have the same base rate, a class Y factor of $0.70$ and a fee of $\$1{,}090$. What is its premium at current rate level? {Example}
> - The premium charged was $10 \times 1{,}045 \times 0.60 + 1{,}100 = \$7{,}370$.
> - Re-rated with the current factor and fee, it is $10 \times 1{,}045 \times 0.70 + 1{,}090 = \$8{,}405$.
> - The same calculation is done for every policy of the year, and the results are summed.

## Accuracy by segment

Extension of exposures is the most accurate current rate level method, given the data. Because each policy is re-rated, changes that differed by class, territory or fee are reflected exactly, and so is the mix of business in the historical period. The premium is on-level *by segment*, which the [[Parallelogram Method|parallelogram method]]'s single average factor cannot deliver, so it is the method needed for [[Classification Ratemaking|classification]] and territorial analyses. The ratio of the re-rated premium to the premium charged is the cohort's implied on-level factor:

> $$\text{Implied OLF} = \frac{\sum_j P_{\text{current}}(\mathbf{x}_j, e_j)}{\sum_j P_{\text{historical}, j}}$$

- $P_{\text{historical}, j}$ is the premium actually charged on policy $j$.

Computing power is no longer the obstacle. The obstacle is having every historical policy's rating characteristics, which companies often do not have readily available. Werner & Modlin note that the parallelogram method's weakness by class has moved many companies to extension of exposures, especially in lines with complex, frequently changed rating structures such as personal auto and homeowners.

> [!example]- Premium is base rate $\times$ territory factor $\times$ class factor $+$ policy fee, with one exposure per policy. The base rate went from $\$600$ to $\$630$, the Territory 2 factor from $1.25$ to $1.35$, the class B factor from $1.40$ to $1.30$ and the fee from $\$40$ to $\$50$. Territory 1 and class A have factor 1.00. Policy Year 2024 wrote 400 T1/A, 250 T2/A, 200 T1/B and 150 T2/B policies. What are the implied on-level factors in total and by class? {Example}
> - Re-rated one by one, T1/A goes from $\$640$ to $\$680$ and T2/A from $\$790$ to $630 \times 1.35 + 50 = \$900.50$.
> - T1/B goes from $\$880$ to $630 \times 1.30 + 50 = \$869$, and T2/B from $\$1{,}090$ to $630 \times 1.35 \times 1.30 + 50 = \$1{,}155.65$.
> - Class A's premium goes from $\$453{,}500$ to $\$497{,}125$, a factor of $1.0962$.
> - Class B's goes from $\$339{,}500$ to $\$347{,}147.50$, a factor of $1.0225$, because its relativity was cut.
> - In total the premium goes from $\$793{,}000$ to $\$844{,}272.50$, a factor of $1.0647$.
> - One factor of $1.0647$ for both classes would misstate each class's on-level premium.

## Schedule rating

In commercial lines, underwriters apply subjective [[Schedule Rating|schedule rating]] debits and credits to manual premium. It may be difficult to determine what debits and credits today's guidelines would give a historical policy. The actuary may measure how credit and debit practice has changed by reviewing the distribution of debits and credits over recent years.

> [!example]- A commercial property book re-rates to $\$5{,}000{,}000$ of manual premium at current rates. Historically its schedule credits averaged 12%, and over recent quarters they have averaged 5%. What is its premium at current rate level? {Example}
> - Keeping the historical credits gives $5{,}000{,}000 \times 0.88 = \$4{,}400{,}000$.
> - Today's underwriters would grant the current credits, so the premium at current rate level is $5{,}000{,}000 \times 0.95 = \$4{,}750{,}000$.
> - The difference is $0.95/0.88 - 1 = 8.0\%$ of premium, as large as a typical rate change.

> [!trap] Restating risks rather than rates
> Extension of exposures re-rates each historical policy with its own historical characteristics. Re-rating it with today's characteristics, such as a newer car or a higher amount of insurance, mixes in [[Premium Trend|premium trend]], which is a separate adjustment.
