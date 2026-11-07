---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:504010e905ef1cd39904d16b8f3d81434659d4e527c17774a46756f9c213d606
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 3 pp.42-44 (PDF pp.54-56); Ch. 5 p.71 (PDF p.83); Ch. 6 p.99 (PDF p.111), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 3 pp.40-42 (PDF pp.46-48), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Ratemaking Data Organization.md
---

![[Media/Figures/Ratemaking_Data_Organization.svg|340]]

**Ratemaking Data Organization** is the way premium, exposure and loss transactions are aggregated into periods for a ratemaking analysis. Werner & Modlin set three objectives for it:

1. **Accurately match losses and premium** for the policy.
2. **Use the most recent data** available.
3. **Minimize the cost** of data collection and retrieval.

The four common methods are [[Calendar Year|calendar year]], [[Accident Year|accident year]], [[Policy Year|policy year]] and [[Report Year|report year]] aggregation, and each meets the objectives to a different degree:

| Method | Losses grouped by | Match of losses and premium | Fixed at year end |
| --- | --- | --- | --- |
| Calendar year | Transaction date | Poorest | Premium and losses |
| Accident year | Accident date | Better | Premium only |
| Policy year | Policy effective date | Best | Neither |
| Report year | Report date | Better | Premium and claim counts |

> [!example]- A 12-month policy is written on 7/1/2024 for $\$1{,}200$. A loss occurs on 11/15/2024 and is reported on 12/20/2024 with a case reserve of $\$8{,}000$. It closes on 3/15/2025 with a payment of $\$9{,}500$. Where do the premium and the loss fall under each method? {Example}
> The premium is earned evenly over the policy term, half in each calendar year:
>
> | Method | Premium | Reported loss |
> | --- | --- | --- |
> | Calendar year | $\$600$ in 2024, $\$600$ in 2025 | $\$8{,}000$ in 2024, $\$1{,}500$ in 2025 |
> | Accident year | $\$600$ in 2024, $\$600$ in 2025 | $\$9{,}500$ in 2024 |
> | Policy year | $\$1{,}200$ in 2024 | $\$9{,}500$ in 2024 |
> | Report year | $\$600$ in 2024, $\$600$ in 2025 | $\$9{,}500$ in 2024 |
>
> - Calendar year 2025's reported loss is the payment of $\$9{,}500$ less the release of the $\$8{,}000$ case reserve, $\$1{,}500$.
> - Accident year and report year losses stay with 2024, and their premium is calendar year premium.
> - Only policy year keeps the whole premium and the whole loss of the policy together.

## Calendar year aggregation

Calendar year aggregation considers all premium and loss transactions that occur during the calendar year, without regard to the date of policy issuance, the accident date or the report date. Premium, exposures and reported losses are all fixed at the end of the year. The data is available quickly and is already collected for financial reporting, so it costs nothing extra. Its main disadvantage is the mismatch between premium and losses: the premium is earned on policies in force during the year, but the losses include payments and reserve changes on claims from policies issued years ago. Werner & Modlin say it may be most appropriate for lines whose losses are reported and settled relatively quickly, such as homeowners.

## Accident year aggregation

Accident year aggregation groups losses by the accident date and takes premium and exposures on the calendar year basis, so it is often called calendar-accident year. It is a better match of premium and losses than calendar year, because losses on accidents during the year are compared with premium earned during the same year. Its losses are not fixed at the end of the year, so their future development has to be estimated.

## Policy year aggregation

Policy year aggregation, sometimes called underwriting year, considers all premium and loss transactions on policies written during the year, regardless of when the claims occur or are reported, reserved or paid. It is the best match between losses and premium, and it isolates the effect of underwriting or pricing changes that attach to the policy, such as a shift to large deductibles. Its premium and exposures are not fixed until every policy written in the year has expired. After that the policy year has no unearned premium, and its earned premium equals its written premium. For annual policies that is 24 months after the policy year starts, so its data takes longer to develop than calendar or accident year data.

## Report year aggregation

Report year aggregation is like calendar-accident year, except that losses are grouped by the date the claim was reported rather than the date it occurred. It is typically used for commercial lines written on [[Claims Made Coverage|claims-made]] policies, such as medical malpractice. Claims grouped by close date make up a [[Close Year|close year]].

## Overall and classification analysis

For a review of the overall rate level, the data can be highly summarized, by year for the product and state analyzed. A classification analysis needs more granular data. A univariate analysis aggregates it by year, typically accident or policy year, for each level of the rating variable studied. A multivariate analysis prefers data at the individual policy or risk level. When the preferred data is not available, the actuary works with what is, such as [[In-Force|in-force]] premium by territory in place of earned premium by territory. In-force premium is the best estimate of the current mix of business, so it is often used to measure the impact of a rate change on existing customers.

> [!example]- An actuary is reviewing territory relativities for a long-tailed liability line. Which aggregation suits the analysis? {Example}
> - A classification analysis needs losses well matched to the exposures that generated them in each territory.
> - Calendar year losses mix in development on claims from earlier policies, so they are poorly matched.
> - Accident year or policy year data, developed to ultimate, matches losses to exposures by territory and is the one to use.

## Gross, ceded and net data

Data can be organized before reinsurance (gross), as the reinsurers' share alone (ceded) or after reinsurance ([[Net of Reinsurance|net]]). Premium and losses in one indication are on the same basis, such as net losses against net premium.

## External data

When pricing a new line, it may be necessary to use external data, and for an existing line it often helps to supplement internal data. The most common external sources are data calls and statistical plans, other aggregated insurance industry data, competitors' rate filings and third-party data unrelated to insurance. A competitor's filing can show indicated loss cost levels, loss and expense trends and rating variable relativities, but its insureds, goals, expense levels and operations differ from the company's. External data may also mislead through differences in products, case reserving and settlement practices, operations, coding, geography and mix of business, so its relevance is checked before it is used.

> [!trap] Pricing on calendar year losses of a long-tailed line
> A calendar year's losses include development on claims from many earlier years, so its loss ratio measures neither the current policies nor any one past year. For a long-tailed line, a calendar year loss ratio can move with a reserve strengthening on old claims while the current rates are unchanged. Use accident year or policy year losses developed to ultimate.
