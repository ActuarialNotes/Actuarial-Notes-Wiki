---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-11
  last_checked_by: agent:validate-v1
  content_hash: sha256:102ae571d1abe4760e5abee7cfe692321bcfa185e494a1139ffbe1f263fdac5a
  sources:
    - "Friedland, Reserving for Reinsurance (CAS Study Note — Exam 7, (c)2023 CAS; cited by the outline as 2022), PDF pp.10, 35-38, 39-41, 43-46, 50-56, 64-66, 70, sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinsurance Reserving.md
---

**Reinsurance reserving** is the estimation of unpaid losses on reinsurance: a reinsurer's assumed business (and what it retrocedes), and the ceded business of a primary insurer. The development, expected and Bornhuetter-Ferguson methods are the ones most often used. Their mechanics are the same as for primary insurance, but their assumptions differ. Reporting lags are longer, data are thinner and less homogeneous, contracts are manuscript, results are often aggregated by treaty year, and an attachment point leverages development and trend.

> $$\text{Ultimate} = \text{Reported} + \text{Expected losses} \times \%\,\text{Unreported}$$

> $$\text{Expected losses} = \text{ELR} \times \text{Earned premium}$$

- This is the reported [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] method; the paid version uses paid losses and $\%\,\text{Unpaid}$. The share unreported, $1 - 1/\text{CDF}$, comes from the selected development pattern, from the reinsurer's own data or from external data.
- **The three methods** (Friedland):
  - **Development.** Reinsurers use it most with reported and paid losses, and with premiums. It assumes future development resembles the past and that claim processing, mix, limits and reinsurance terms (retention, participation) have been consistent.
  - **Expected.** The usual estimate is an expected loss ratio times earned premium. The ELR draws on pricing, industry data and adjusted history. It is used when entering a new line, after changes that make the history irrelevant, when development factors for immature years are too leveraged, or when data for other methods are missing. Reinsurers seldom have the claim counts and exposures that frequency-severity or exposure approaches need.
  - **Bornhuetter-Ferguson.** It is relied on almost as often as the development method. It assumes losses reported to date say nothing about those still to come. That makes it stable where a large CDF would turn one large loss into a large swing in the development projection.
- **Why primary methods need adjusting** (Friedland):
  - Claims reach the reinsurer only after the cedant has reported and assessed them. Excess claims arrive later still, once they approach the retention or a reporting threshold.
  - As a result, early development factors and tails are higher than primary, especially for non-proportional covers, and trend is leveraged in excess layers.
  - Rate-change data for on-leveling is weaker because contract terms change from year to year.
- **Data realities.** Data often arrive as summary reports rather than claim detail; the detailed [[Bordereau|bordereau]], mainly a pro rata practice, has largely been supplanted by summary reporting. Claim counts are seldom usable. Reported losses include the reinsurer's **additional case reserves** (ACRs) on top of cedant case reserves. Several currencies must be restated at a common exchange rate, or the development factors absorb exchange movements. Catastrophe losses are estimated event by event and removed from the triangles. Discontinued business is often excluded, and asbestos, environmental and abuse exposures are not suited to triangle methods at all.
- **Segmentation.** Friedland quotes Patrik's priority list:
  - line of business;
  - contract type (treaty, facultative, finite);
  - cover type (quota share, surplus share, per-risk or per-occurrence excess, aggregate, catastrophe);
  - the primary line and attachment point for casualty;
  - contract terms;
  - the type of cedant;
  - the intermediary.

  Credibility limits how far it can be taken.
- **Experience period.** Reinsurers often analyse by **treaty (underwriting) year**. Immature treaty years must have their ultimates reduced for premium not yet earned, and results are allocated to accident year through earning patterns. Losses-occurring-during and risks-attaching contracts cover different claims, so the actuary must know which applies.
- **Outputs are wider.** The spread of indicated IBNR across methods is larger than primary; see [[Range of Indications]]. External patterns such as RAA data help but mix unlike contracts. The cedant's side is [[Ceded Loss Reserve]], and cover types are in [[Types of Reinsurance]].

> [!example]- Development vs Bornhuetter-Ferguson on an Immature Excess Year {Example}
> A reinsurer's casualty excess business for accident year 2024, at 12 months (\$000s): earned premium $6{,}000$, reported losses $360$, and a selected development pattern with $12\%$ reported (a CDF to ultimate of $1/0.12 = 8.333$). The on-level expected loss ratio from pricing is $70\%$.
>
> Compare the development and Bornhuetter-Ferguson IBNR. Then suppose one more loss of $200$ had been reported by the same date.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Development ult} &= 360 / 0.12 \\
> > &= 3{,}000 \\
> > \text{Expected losses} &= 0.70 \times 6{,}000 \\
> > &= 4{,}200 \\
> > \text{BF ult} &= 360 + 4{,}200 \times 0.88 \\
> > &= 4{,}056
> > \end{align*}
> > $$
> >
> > IBNR is $2{,}640$ by the development method and $3{,}696$ by Bornhuetter-Ferguson.
> >
> > With $560$ reported instead:
> >
> > $$
> > \begin{align*}
> > \text{Development ult} &= 560 / 0.12 \\
> > &= 4{,}667 \\
> > \text{BF ult} &= 560 + 3{,}696 \\
> > &= 4{,}256
> > \end{align*}
> > $$
> >
> > One loss of $200$ moves the development ultimate by $1{,}667$ and the BF ultimate by $200$. That is the leverage Friedland warns of when the CDF is large. Bornhuetter-Ferguson trades it for dependence on the ELR. Reinsurance rate changes are hard to quantify, so the premium on-level adjustment behind that ELR is where to look first.

> [!example]- Trend Leverage in an Excess Layer {Example}
> A cedant's large claims develop by a further $5\%$ in severity. Claim values are $\$480$K, $\$900$K and $\$950$K, and the treaty is $\$500$K excess of $\$500$K.
>
> How much does the reinsurer's share develop?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Layer before} &= 0 + 400 + 450 \\
> > &= 850 \\
> > \text{Layer after} &= 4 + 445 + 497.5 \\
> > &= 946.5 \\
> > \text{Change} &= 946.5 / 850 - 1 \\
> > &= 11.4\%
> > \end{align*}
> > $$
> >
> > Ground-up losses rose $5\%$ but the layer rose $11.4\%$. A new claim pierced the attachment, and the others grew entirely within the layer. The same leverage makes excess development factors larger and longer than the cedant's own. Primary patterns applied to reinsurance data therefore understate IBNR, which is why industry reinsurance lags or the reinsurer's own data are needed.
