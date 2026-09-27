---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7ff7b551509aec435ab29a128bef0449e92aa8c7866eb9c700b6cbfb6e34ce75
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Losses-Occurring-During and Risks-Attaching.md
---

**Losses-occurring-during** (LOD) and **risks-attaching** (RA, also called policies-attaching) are the two primary ways a reinsurance contract's business-covered clause defines what it covers. An LOD contract covers every loss that occurs between its inception and expiration dates, whenever the ceding company issued the underlying policy. An RA contract covers only the underlying policies that incept during its term, including their losses after the contract has expired.

> $$\text{LOD: } T_0 \leq t_{\text{loss}} \leq T_1$$
>
> $$\text{RA: } T_0 \leq t_{\text{policy}} \leq T_1$$

- $T_0$ and $T_1$ are the reinsurance contract's inception and expiration dates, $t_{\text{loss}}$ is the date of loss and $t_{\text{policy}}$ the inception date of the underlying policy. The business-covered clause is also called the reinsuring clause, cover clause, business reinsured clause or application of agreement clause ([[Reserving for Reinsurance (Friedland - 2022)|Friedland]]).
- **Which year a ceded loss belongs to.** Under LOD the date of loss decides, the same date that [[Accident Year|accident year]] aggregation uses. Under RA the underlying policy's inception decides which contract responds, and the contract's inception places the loss in the reinsurer's [[Underwriting Year|underwriting (treaty) year]]. Friedland's example: treaty year 2020 of annual RA contracts covers policies incepting from 1/1/2020 to 12/30/2021, and so accident dates from 1/1/2020 to 12/29/2022, across three calendar years.
- **Consequences for reserving.** An RA treaty year takes longer to report and to estimate reliably, and its immature years have highly leveraged cumulative development factors and premium not yet earned. Written premium by treaty year develops more for RA business, and ultimate losses for a treaty year whose premium is not fully earned are reduced to the portion from occurrences before the valuation date. The catastrophes in an RA treaty year can occur anywhere within a span of up to three years, so the timing of events within that span distorts early age-to-age factors (see [[Reinsurance Reserving]]).
- **Changing terms.** When a [[Quota Share|quota share]]'s ceded percentage changes, on an RA treaty the change follows the [[Policy Year|policy year]] of the underlying risks, not the accident year. A cedant that reserves gross by accident year must then split each accident year between the policy years that feed it before computing the [[Ceded Loss Reserve|ceded reserve]]. Contracts are manuscript, so coverage can also be tailored beyond these two bases; the actuary has to read the provisions ([[Treaty Reinsurance]]).

> [!example]- Which Contract Pays, and How Much {Example}
> A ceding company renews a property per-risk excess of loss contract every January 1, with a limit of 3.0 million. The retention is 1.0 million on the 2024 and 2025 contracts and 1.5 million on the 2026 contract. Two fire losses:
>
> - Loss A: underlying policy effective 10/1/2024 to 9/30/2025; loss of 2.5 million on 3/10/2025.
> - Loss B: underlying policy effective 11/1/2025 to 10/31/2026; loss of 4.0 million on 5/20/2026.
>
> Find the contract that responds and the ceded loss if the contracts are (i) losses-occurring-during and (ii) risks-attaching.
>
> > [!answer]-
> > **(i) Losses-occurring-during:** the date of loss decides.
> >
> > $$
> > \begin{align*}
> > \text{A, 2025 contract} &= \min(2.5 - 1.0,\ 3.0) \\
> > &= 1.5 \\
> > \text{B, 2026 contract} &= \min(4.0 - 1.5,\ 3.0) \\
> > &= 2.5
> > \end{align*}
> > $$
> >
> > **(ii) Risks-attaching:** the underlying policy's inception decides.
> >
> > $$
> > \begin{align*}
> > \text{A, 2024 contract} &= \min(2.5 - 1.0,\ 3.0) \\
> > &= 1.5 \\
> > \text{B, 2025 contract} &= \min(4.0 - 1.0,\ 3.0) \\
> > &= 3.0
> > \end{align*}
> > $$
> >
> > Loss B cedes 0.5 million more on the risks-attaching basis, because the 2025 terms follow the policy into 2026. It is also a 2025 treaty-year loss that first appears between 12 and 24 months, although it occurred after the 2025 contract expired. Loss A cedes the same amount either way but lands in a different treaty year.

> [!example]- A Changing Quota Share on a Risks-Attaching Treaty {Example}
> A ceding company's risks-attaching quota share cedes $40\%$ of policies incepting in 2024 and $25\%$ of policies incepting in 2025. It writes annual policies evenly through each year, with written premium of 12,000 in 2024 and 8,000 in 2025, and reserves gross by accident year. Accident year 2025 has gross unpaid losses of 5,000. Assume they split between the policy years in proportion to the premium each earned in 2025. Estimate the ceded unpaid losses for accident year 2025.
>
> > [!answer]-
> > Annual policies written evenly earn half their premium in the year written and half in the next:
> >
> > $$
> > \begin{align*}
> > \text{PY 2024 earned in 2025} &= 0.5 \times 12{,}000 \\
> > &= 6{,}000 \\
> > \text{PY 2025 earned in 2025} &= 0.5 \times 8{,}000 \\
> > &= 4{,}000
> > \end{align*}
> > $$
> >
> > So $60\%$ of accident year 2025 comes from 2024 policies and $40\%$ from 2025 policies.
> >
> > $$
> > \begin{align*}
> > \text{Ceded share} &= 0.60(40\%) + 0.40(25\%) \\
> > &= 34\% \\
> > \text{Ceded unpaid} &= 0.34 \times 5{,}000 \\
> > &= 1{,}700
> > \end{align*}
> > $$
> >
> > Applying the 2025 percentage to the whole accident year would give $0.25 \times 5{,}000 = 1{,}250$, understating the ceded reserve by 450 and overstating the net by the same amount. On a losses-occurring-during treaty, where the 2025 contract covers every 2025 loss, 1,250 would be right. The split by earned premium is the same earnings-profile approach Friedland describes for allocating treaty-year results to accident year.
