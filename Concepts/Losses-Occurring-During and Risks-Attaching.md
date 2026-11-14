---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3cd07a8b8daee6fd926452cfc5ca889edc1268155ae91504854abebf0c071b71
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Losses-Occurring-During and Risks-Attaching.md
---

**Losses-Occurring-During** (LOD) and **Risks-Attaching** (RA, also called policies-attaching) are the two primary ways a reinsurance contract's business-covered clause defines what it covers. An LOD contract covers every loss that occurs between its inception and expiration dates, whenever the ceding company issued the underlying policy. An RA contract covers only the underlying policies that incept during its term, including their losses after the contract has expired.

For a contract with inception date $T_0$ and expiration date $T_1$, the condition for a loss to be covered on an LOD basis is

> $$T_0 \leq t_{\text{loss}} \leq T_1$$

- $t_{\text{loss}}$ is the date of loss.

On an RA basis, the condition is

> $$T_0 \leq t_{\text{policy}} \leq T_1$$

- $t_{\text{policy}}$ is the inception date of the underlying policy.

The business-covered clause is also called the reinsuring clause, cover clause, business reinsured clause or application of agreement clause ([[Reserving for Reinsurance (Friedland - 2022)|Friedland]]). Contracts are manuscript, so coverage can also be tailored beyond these two bases, and the actuary has to read the provisions ([[Treaty Reinsurance]]).

> [!example]- Which contract responds to each loss, and what does it cede, on each basis? {Example}
> A ceding company renews a property per-risk excess of loss contract every January 1, with a limit of 3.0 million. The retention is 1.0 million on the 2024 and 2025 contracts and 1.5 million on the 2026 contract. Two fire losses:
>
> | Loss | Underlying policy | Date of loss | Loss |
> | :--- | :--- | :--- | ---: |
> | A | 10/1/2024 to 9/30/2025 | 3/10/2025 | 2.5 million |
> | B | 11/1/2025 to 10/31/2026 | 5/20/2026 | 4.0 million |
>
> > [!answer]-
> > - On the LOD basis the date of loss decides, so the 2025 contract takes loss A and cedes $\min(2.5 - 1.0,\ 3.0) = 1.5$ million.
> > - The 2026 contract takes loss B and cedes $\min(4.0 - 1.5,\ 3.0) = 2.5$ million.
> > - On the RA basis the underlying policy's inception decides, so the 2024 contract takes loss A and cedes $\min(2.5 - 1.0,\ 3.0) = 1.5$ million.
> > - The 2025 contract takes loss B and cedes $\min(4.0 - 1.0,\ 3.0) = 3.0$ million.
> > - Loss B cedes 0.5 million more on the RA basis, because the 2025 terms follow the policy into 2026.
> > - Loss A cedes the same amount either way but lands in a different treaty year.

## Treaty year and accident year

Under LOD the date of loss decides which year a ceded loss belongs to, the same date that [[Accident Year|accident year]] aggregation uses. Under RA the underlying policy's inception decides which contract responds, and the contract's inception places the loss in the reinsurer's [[Underwriting Year|underwriting (treaty) year]]. In Friedland's example, treaty year 2020 of annual RA contracts covers policies incepting from 1/1/2020 to 12/30/2021, and so accident dates from 1/1/2020 to 12/29/2022, across three calendar years. Loss B above is a 2025 treaty-year loss that first appears between 12 and 24 months, although it occurred after the 2025 contract expired.

## Reserving a risks-attaching treaty year

An RA treaty year takes longer to report and to estimate reliably. Its immature years have highly leveraged cumulative development factors and premium not yet earned. Written premium by treaty year develops more for RA business. Ultimate losses for a treaty year whose premium is not fully earned are reduced to the portion from occurrences before the valuation date. The catastrophes in an RA treaty year can occur anywhere within a span of up to three years, so the timing of events within that span distorts early age-to-age factors ([[Reinsurance Reserving]]).

## A change in the ceded percentage

When a [[Quota Share|quota share]]'s ceded percentage changes, on an RA treaty the change follows the [[Policy Year|policy year]] of the underlying risks, not the accident year. A cedant that reserves gross by accident year must then split each accident year between the policy years that feed it before computing the [[Ceded Loss Reserve|ceded reserve]]. On an LOD treaty, one contract covers every loss of the accident year, so its percentage applies to the whole year.

> [!example]- What are the ceded unpaid losses for accident year 2025? {Example}
> A ceding company's risks-attaching quota share cedes 40% of policies incepting in 2024 and 25% of policies incepting in 2025. It writes annual policies evenly through each year, with written premium of 12,000 in 2024 and 8,000 in 2025, and reserves gross by accident year. Accident year 2025 has gross unpaid losses of 5,000, split between the policy years in proportion to the premium each earned in 2025.
>
> > [!answer]-
> > - Annual policies written evenly earn half their premium in the year written and half in the next.
> > - Policy year 2024 earns $0.5 \times 12{,}000 = 6{,}000$ in 2025, and policy year 2025 earns $0.5 \times 8{,}000 = 4{,}000$.
> > - So 60% of accident year 2025 comes from 2024 policies and 40% from 2025 policies.
> > - The ceded share is $0.60 \times 40\% + 0.40 \times 25\% = 34\%$.
> > - The ceded unpaid losses are $0.34 \times 5{,}000 = 1{,}700$.
> > - The split by earned premium is the same earnings-profile approach Friedland describes for allocating treaty-year results to accident year.

> [!trap] Applying the new ceded percentage to the whole accident year
> On the RA quota share above, applying the 2025 percentage to all of accident year 2025 gives $0.25 \times 5{,}000 = 1{,}250$. That understates the ceded reserve by 450 and overstates the net by the same amount. The figure 1,250 is right only on an LOD treaty, where the 2025 contract covers every 2025 loss.
