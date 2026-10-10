---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:485b8c5e4bf7bf0165f7defc813b8f5d5cad35e9b6fc0f02626dd35c5ea0a0bd
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §2.1/2.8 PDF p.35; §2.6 PDF pp.28-29; §4.1-4.2 PDF pp.45-48; §5.1-5.1.3 PDF pp.53-55; §5.3 PDF p.57, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Colorado SB21-169 as signed (C.R.S. 10-3-1104.9), (1), (3)(b), (6), (7)(a), (8)(b), PDF pp.2-8, sha256:7fda1f5b30f27b3908e2f2f35e008babcf71235bbfcb905fb7d4627174a5942b — https://leg.colorado.gov/sites/default/files/2021a_169_signed.pdf"
    - "15 U.S.C. §1681b (Cornell LII), (a)(3)(C), sha256:6a76f86911643b4584aa96bbce68bbfcf097b5295d6c90e236c8256d16a02c1f — https://www.law.cornell.edu/uscode/text/15/1681b"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Underwriting Modeling Dataset.md
---

An **underwriting modeling dataset** is the table an underwriting or pricing model is trained on: one row per risk per time period, such as a policy, vehicle or location for a calendar year, holding the characteristics known when the risk was quoted or underwritten, its exposure for the period, and the claims experience attached to it. Goldburd et al. call the ideal "a dataset with one record for each risk and each time period of interest" (CAS Monograph 5, §4.1).

> $$e_i = \frac{\text{days of row } i\text{'s term inside the period}}{\text{days in the period}}$$

> $$\text{Frequency}_i = \frac{N_i}{e_i}$$

> $$\text{Pure premium}_i = \frac{L_i}{e_i}$$

- **Symbols:** $e_i$ is row $i$'s earned exposure in the period, $N_i$ the number of claims and $L_i$ the losses attached to it. Goldburd et al.'s example: a policy issued on October 1 contributes 25% of a full exposure to that calendar year. A frequency or pure premium target is a ratio to exposure, and the exposure enters the model as a **weight**. An alternative is to model the claim count itself with $\ln e_i$ as an [[Offset Variable|offset]]; for a Poisson model the two give the same predictions (Goldburd et al., §2.5–2.6).
- **Combining policy and claim data:** Premium and policy data usually sit in the underwriting area and claims data in the claims area, so the first task is to merge them (§4.1). Questions to ask: whether the two are updated on different schedules, so the newest claims have no exposure yet; whether each claim matches exactly one policy record; what level to aggregate to; and which fields are missing or redundant. Claims are summed to the risk-period before the join, which loses detail: two \$500 claims, or a \$900 claim and a \$100 claim, both become 2 claims and \$1,000.
- **Level of detail:** In personal auto, claims ideally attach to the vehicle and driver they arose from, so their characteristics can enter the model. A small commercial property book may be modeled by location or by business (§4.1). Splitting by coverage or by peril, such as fire, wind and hail, and other perils, lets each model fit its own pattern (§5.1.2).
- **Features as of the quote:** The model will be used when a risk is quoted or renewed, so its features must be what the underwriter knows then: application and policy characteristics, prior claims before the term began, and any external data appended at that date. A feature built from the term's own claims leaks the target.
- **External data:** Insurers attach external data to their own records to add predictive power, which can bring hundreds of candidate predictors (Goldburd et al., §5.3). Using consumer reports brings the [[Insurance Data Regulation|Fair Credit Reporting Act]] with it, and Colorado's law singles out "external consumer data and information sources", which it says include credit scores, locations, purchasing habits, home ownership, education, occupation and court records ([[Credit-Based Insurance Scoring]]; [[External Data]]).
- **The target:** For a rating plan the target is usually frequency, severity or pure premium; loss ratio suits a search for deficiencies in an existing plan, and the probability of a large loss suits a review of underwriting restrictions (§5.1). A renewal model's target is whether the policy renewed. Catastrophe losses are removed or tempered, large losses may be capped, and immature losses on recent periods developed (§5.1.3).
- **Cleaning:** Check for duplicate records before aggregating, check categorical codes against the documentation, check numeric fields for impossible values, and decide how to treat each error. Goldburd et al. suggest replacing a bad value with the base level and adding an error flag, rather than deleting records, since the errors may be systematic (§4.2).

The claim-level counterpart is the [[Claims Modeling Dataset]]. The general steps are on [[Data Preparation]].

> [!example]- Calendar-Year Exposure and Claims {Example}
> Build the calendar-year 2025 rows for three annual auto policies:
>
> - **P1:** effective 2025-01-01; one claim on 2025-06-10 for \$4,000.
> - **P2:** effective 2025-10-01; no claims.
> - **P3:** effective 2024-07-01; claims on 2024-11-03 for \$2,500 and on 2025-03-05 for \$6,000.
>
> Use month fractions for exposure.
>
> > [!answer]-
> > Each row is the part of a policy term that falls in 2025:
> >
> > | Row | 2025 months | Exposure | Claims | Losses |
> > | :--- | ---: | ---: | ---: | ---: |
> > | P1 | 12 | 1.00 | 1 | 4,000 |
> > | P2 | 3 | 0.25 | 0 | 0 |
> > | P3 | 6 | 0.50 | 1 | 6,000 |
> >
> > P2 earns October to December, so 3/12. P3's term runs July 2024 to June 2025, so 6 of its months are in 2025. P3's November 2024 claim belongs to the 2024 row, which is not in this table. P2 stays in with zero claims; dropping claim-free rows would overstate frequency. In total:
> > $$
> > \begin{align*}
> > \text{Frequency} &= \frac{1 + 0 + 1}{1.00 + 0.25 + 0.50} \\
> > &= \frac{2}{1.75} \\
> > &= 1.143
> > \end{align*}
> > $$
> > per car-year, and the pure premium is $10{,}000 / 1.75 = 5{,}714$. A toy book this small is far from credible; the point is the row layout.

> [!example]- Count Rows or Frequency Rows {Example}
> A territory has 800 car-years and 64 claims; another has 200 car-years and 22 claims. Show how each row is entered in a Poisson frequency model and in a Poisson claim count model.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Frequency}_A &= \frac{64}{800} \\
> > &= 0.080 \\
> > \text{Frequency}_B &= \frac{22}{200} \\
> > &= 0.110
> > \end{align*}
> > $$
> > - **Frequency model:** the target is 0.080 or 0.110 and the weight is 800 or 200. The weight tells the model the larger territory's frequency is more stable.
> > - **Count model:** the target is 64 or 22, with an offset of $\ln 800 = 6.685$ or $\ln 200 = 5.298$ and no weight. The offset scales the expected count with exposure.
> >
> > For a Poisson GLM with a log link, the two set-ups give the same relativities and predictions. Entering exposure as both a weight and an offset, or neither, is wrong.

> [!tip]- How it appears on the exam
> - **DISC-DA:** Section 9.3 covers creating datasets for underwriting models. Questions give policy and claim tables and a modeling goal and ask for the unit of observation, how much exposure a row earns, which claims attach to which row, what target fits the goal, or which candidate feature would leak.
> - Questions on external data ask what a data append adds and what it brings with it, such as consumer-report rules or a fairness review.

> [!warning]- Exam traps
> - **Full-year exposure for a partial year:** A policy written October 1 earns 0.25 of a year in that calendar year, not 1.0. Overstating exposure understates frequency.
> - **Dropping claim-free risks:** An inner join of policies to claims keeps only risks with claims. The risks with no claims are most of the data, and the denominator.
> - **Claims attached to the wrong period:** A claim attaches to the row whose period contains its accident date, not to the policy's first year or the claim's report year.
> - **Features dated after the quote:** A prior-claims count must stop at the start of the term. Counting the term's own claims leaks the target.
