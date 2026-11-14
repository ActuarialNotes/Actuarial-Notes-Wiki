---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:37ab2bd268444eb438da09ea2ee12f683d22b2ea6167e631b7d0535c041561a3
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §2.1/2.8 PDF p.35; §2.6 PDF pp.28-29; §4.1-4.2 PDF pp.45-48; §5.1-5.1.3 PDF pp.53-55; §5.3 PDF p.57, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Colorado SB21-169 as signed (C.R.S. 10-3-1104.9), (1), (3)(b), (6), (7)(a), (8)(b), PDF pp.2-8, sha256:7fda1f5b30f27b3908e2f2f35e008babcf71235bbfcb905fb7d4627174a5942b — https://leg.colorado.gov/sites/default/files/2021a_169_signed.pdf"
    - "15 U.S.C. §1681b (Cornell LII), (a)(3)(C), sha256:6a76f86911643b4584aa96bbce68bbfcf097b5295d6c90e236c8256d16a02c1f — https://www.law.cornell.edu/uscode/text/15/1681b"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Underwriting Modeling Dataset.md
---
An **Underwriting Modeling Dataset** is the table an underwriting or pricing model is trained on, with one row per risk per time period, such as a policy, vehicle or location for a calendar year. Goldburd et al. call the ideal "a dataset with one record for each risk and each time period of interest" (CAS Monograph 5, §4.1).

Each row holds:

1. The characteristics known when the risk was quoted or underwritten.
2. The risk's exposure for the period.
3. The claims experience attached to it.

The claim-level counterpart is the [[Claims Modeling Dataset]]. The general steps are on [[Data Preparation]].

## Exposure and claims for each row

Each row is the part of a policy term that falls in the period. Row $i$'s earned exposure is

> $$e_i = \frac{\text{days of row } i\text{'s term inside the period}}{\text{days in the period}}$$

A policy that starts before or ends after the period contributes only its months inside it, and a policy issued on October 1 contributes 25% of a full exposure to that calendar year (Goldburd et al.). A claim attaches to the row whose period contains its accident date, not to the policy's first year or the claim's report year. Totals for the book are the sums of the rows' exposures and claims.

> [!example]- What are the calendar-year 2025 rows for these three annual auto policies? {Example}
> Exposure is measured in month fractions.
>
> | Policy | Effective | Claims (accident date, amount) |
> | :--- | :--- | :--- |
> | P1 | 2025-01-01 | 2025-06-10, \$4,000 |
> | P2 | 2025-10-01 | None |
> | P3 | 2024-07-01 | 2024-11-03, \$2,500; 2025-03-05, \$6,000 |
>
> > [!answer]-
> > - P1 is in force all of 2025, so it earns 1.00 with one claim of \$4,000.
> > - P2 earns October to December, so 3/12 = 0.25, with no claims.
> > - P3's term runs July 2024 to June 2025, so 6 of its months are in 2025 and it earns 0.50.
> > - P3's November 2024 claim belongs to the 2024 row, which is not in this table, so the 2025 row has one claim of \$6,000.
> > - P2 stays in with zero claims, because dropping claim-free rows would overstate frequency.
> > - The frequency is $(1 + 0 + 1) / (1.00 + 0.25 + 0.50) = 2 / 1.75 = 1.143$ per car-year.
> > - The pure premium is $10{,}000 / 1.75 = 5{,}714$. A toy book this small is far from credible, and the point is the row layout.

> [!trap] Full-year exposure for a partial year
> A policy written October 1 earns 0.25 of a year in that calendar year, not 1.0. A six-month policy earns only its six months. Overstating exposure understates frequency.

## The target

For a rating plan the target is usually frequency, severity or pure premium. Loss ratio suits a search for deficiencies in an existing plan, and the probability of a large loss suits a review of underwriting restrictions (§5.1). A renewal model's target is whether the policy renewed. With $N_i$ the number of claims attached to row $i$, its frequency is

> $$\text{Frequency}_i = \frac{N_i}{e_i}$$

With $L_i$ the losses attached to row $i$, its pure premium is

> $$\text{Pure premium}_i = \frac{L_i}{e_i}$$

A frequency or pure premium target is a ratio to exposure, and the exposure enters the model as a **weight**. An alternative is to model the claim count itself with $\ln e_i$ as an [[Offset Variable|offset]] and no weight. For a Poisson GLM with a log link, the two set-ups give the same relativities and predictions (Goldburd et al., §2.5–2.6). Entering exposure as both a weight and an offset, or neither, is wrong.

Catastrophe losses are removed or tempered, large losses may be capped, and immature losses on recent periods are developed (§5.1.3).

> [!example]- How is each territory entered in a Poisson frequency model and in a Poisson claim count model? {Example}
> Territory A has 800 car-years and 64 claims. Territory B has 200 car-years and 22 claims.
>
> > [!answer]-
> > - The frequencies are $64 / 800 = 0.080$ and $22 / 200 = 0.110$.
> > - **Frequency model:** the target is 0.080 or 0.110 and the weight is 800 or 200. The weight tells the model the larger territory's frequency is more stable.
> > - **Count model:** the target is 64 or 22, with an offset of $\ln 800 = 6.685$ or $\ln 200 = 5.298$ and no weight. The offset scales the expected count with exposure.

## Combining policy and claim data

Premium and policy data usually sit in the underwriting area and claims data in the claims area, so the first task is to merge them (§4.1). The questions to ask are whether the two are updated on different schedules, so the newest claims have no exposure yet, whether each claim matches exactly one policy record, what level to aggregate to, and which fields are missing or redundant.

Claims are summed to the risk-period before the join, which loses detail. Two \$500 claims, or a \$900 claim and a \$100 claim, both become 2 claims and \$1,000. An inner join of policies to claims keeps only risks with claims, but the risks with no claims are most of the data and the denominator.

## Level of detail

In personal auto, claims ideally attach to the vehicle and driver they arose from, so their characteristics can enter the model. A small commercial property book may be modeled by location or by business (§4.1). Splitting by coverage or by peril, such as fire, wind and hail, and other perils, lets each model fit its own pattern (§5.1.2).

## Features known at the quote

The model will be used when a risk is quoted or renewed, so its features must be what the underwriter knows then: application and policy characteristics, prior claims before the term began, and any external data appended at that date. A prior-claims count must stop at the start of the term. A feature built from the term's own claims leaks the target.

## External data

Insurers attach external data to their own records to add predictive power, which can bring hundreds of candidate predictors (Goldburd et al., §5.3). Using consumer reports brings the [[Insurance Data Regulation|Fair Credit Reporting Act]] with it. Colorado's law singles out "external consumer data and information sources", which it says include credit scores, locations, purchasing habits, home ownership, education, occupation and court records ([[Credit-Based Insurance Scoring]]; [[External Data]]).

## Cleaning

Check for duplicate records before aggregating, check categorical codes against the documentation, check numeric fields for impossible values, and decide how to treat each error. Goldburd et al. suggest replacing a bad value with the base level and adding an error flag, rather than deleting records, since the errors may be systematic (§4.2).
