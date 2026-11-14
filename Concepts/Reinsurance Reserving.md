---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:5ace61144092b3192072340196b644194f39d1cd745063d4f733488f55c19ed6
  sources:
    - "Friedland, Reserving for Reinsurance (CAS Study Note — Exam 7, (c)2023 CAS; cited by the outline as 2022), PDF pp.10, 26-28, 32-33, 35-41, 43, 45-48, 50-56, 66, 69-72, sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, 2010), PDF pp.159-160 (Ch.9: % unreported = 1.00 minus the inverse of the reported CDF), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "CAS, Exam 7 Content Outline, Fall 2026 (Exam_7_CO_2026_F v04 2026_9_16), PDF pp.3-6 (tasks A.ii.4 = 5, A.v.1-3 = 15-17; Teng and Perkins excluding Section 5 with Feldblum Sections 1-2; Friedland A.v.1-A.v.3), sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf"
    - "Patrik, Reinsurance, Ch.7 of Foundations of Casualty Actuarial Science (4th ed., CAS 2001) — Exam 7's reading before Friedland (2022), printed pp.434-440 (PDF pp.92-98: Problems 1, 2, 6 and 7 of the seven reinsurance loss reserving problems), sha256:26f2fc8441b1a2f8b335a9bfc9e20f0c742fa340c4b7f6eff93376c3c340cf06 — https://www.casact.org/sites/default/files/database/studynotes_ch7.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinsurance Reserving.md
---
**Reinsurance Reserving** is the estimation of unpaid losses on reinsurance, both a reinsurer's assumed business (and what it retrocedes) and the ceded business of a primary insurer. The development, expected and Bornhuetter-Ferguson methods are the ones most often used. Their mechanics are the same as for primary insurance, but their assumptions differ. Reporting lags are longer, data are thinner and less homogeneous, contracts are manuscript, results are often aggregated by treaty year, and an attachment point leverages development and trend.

In the reported [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] method, the ultimate is

> $$\text{Ultimate} = \text{Reported} + \text{Expected losses} \times \%\,\text{Unreported}$$

- $\%\,\text{Unreported}$ is $1 - 1/\text{CDF}$, from the selected development pattern, the reinsurer's own data or external data.

The paid version uses paid losses and $\%\,\text{Unpaid}$. The expected losses are usually

> $$\text{Expected losses} = \text{ELR} \times \text{Earned premium}$$

- $\text{ELR}$ is the expected loss ratio, which draws on pricing, industry data and adjusted history.

## The three methods

The development method is the one reinsurers use most, with reported and paid losses, and with premiums. It assumes future development resembles the past and that claim processing, mix, limits and reinsurance terms (retention, participation) have been consistent.

The expected method's usual estimate is an expected loss ratio times earned premium. It is used when entering a new line, after changes that make the history irrelevant, when development factors for immature years are too leveraged, or when data for other methods are missing. Reinsurers seldom have the claim counts and exposures that frequency-severity or exposure approaches need.

The Bornhuetter-Ferguson method is relied on almost as often as the development method. It assumes losses reported to date say nothing about those still to come. That makes it stable where a large CDF would turn one large loss into a large swing in the development projection. In exchange it depends on the ELR, which has to reflect reinsurance rate changes that are hard to quantify.

> [!example]- How do the development and Bornhuetter-Ferguson methods compare on this immature excess year? {Example}
> A reinsurer's casualty excess business for accident year 2024, at 12 months (\$000s), has earned premium of $6{,}000$ and reported losses of $360$. The selected development pattern has $12\%$ reported (a CDF to ultimate of $1/0.12 = 8.333$). The on-level expected loss ratio from pricing is $70\%$. Suppose next that one more loss of $200$ had been reported by the same date.
>
> > [!answer]-
> > - The development ultimate is $360 / 0.12 = 3{,}000$, an IBNR of $2{,}640$.
> > - The expected losses are $0.70 \times 6{,}000 = 4{,}200$.
> > - The BF ultimate is $360 + 4{,}200 \times 0.88 = 4{,}056$, an IBNR of $3{,}696$.
> > - With $560$ reported, the development ultimate is $560 / 0.12 = 4{,}667$ and the BF ultimate $560 + 3{,}696 = 4{,}256$.
> > - One loss of $200$ moves the development ultimate by $1{,}667$ and the BF ultimate by $200$.

## Why primary methods need adjusting

Claims reach the reinsurer only after the cedant has reported and assessed them. Excess claims arrive later still, once they approach the retention or a reporting threshold. As a result, early development factors and tails are higher than primary, especially for non-proportional covers, and trend is leveraged in excess layers. Rate-change data for on-leveling is weaker because contract terms change from year to year.

> [!example]- A treaty is $\$500$K xs $\$500$K. Claims of $\$480$K, $\$900$K and $\$950$K each develop a further $5\%$. How much does the layer develop? {Example}
> - Before, the layer holds $0 + 400 + 450 = 850$ (\$000s).
> - After, the claims are $504$, $945$ and $997.5$, and the layer holds $4 + 445 + 497.5 = 946.5$.
> - The layer develops $946.5 / 850 - 1 = 11.4\%$, against $5\%$ ground-up.
> - A new claim pierced the attachment, and the others grew entirely within the layer.

## Reinsurance data

Data often arrive as summary reports rather than claim detail. The detailed [[Bordereau|bordereau]], mainly a pro rata practice, has largely been supplanted by summary reporting. Claim counts are seldom usable. Reported losses include the reinsurer's **additional case reserves** (ACRs) on top of cedant case reserves. Several currencies must be restated at a common exchange rate, or the development factors absorb exchange movements. Catastrophe losses are estimated event by event and removed from the triangles. Discontinued business may be excluded, and some of it (asbestos, environmental and abuse) may not suit triangle methods.

Friedland lists data coding at the reinsurer itself among the reasons reinsurance data are harder to validate than primary data. Every cedant and broker has different IT systems and reports, and turning their bordereaux into the format actuarial work needs remains manually intensive. Standardized data sets have been slow to be adopted, because updating existing systems is costly and other IT projects come first.

External patterns such as RAA data help but mix unlike contracts. [[Schedule P]] has three non-proportional assumed reinsurance lines, with no claim counts, and Friedland gives three limits:

1. Ten accident years is typically too short for excess of loss.
2. The lines are not split finely enough by major line of business or type of reinsurance.
3. The combined experience may not reflect any one reinsurer's markets, terms and operations.

Aggregated by accident year, the data look more like primary insurance than the volatile, long-tailed reinsurance losses they hold.

## Segmentation and experience period

Friedland quotes Patrik's priority list for splitting the data:

1. line of business;
2. contract type (treaty, facultative, finite);
3. cover type (quota share, surplus share, per-risk or per-occurrence excess, aggregate, catastrophe);
4. the primary line and attachment point for casualty;
5. contract terms;
6. the type of cedant;
7. the intermediary.

Credibility limits how far it can be taken.

Reinsurers often analyse by **treaty (underwriting) year**. Immature treaty years must have their ultimates reduced for premium not yet earned, and results are allocated to accident year through earning patterns. Losses-occurring-during and risks-attaching contracts cover different claims, so the actuary must know which applies.

The spread of indicated IBNR across methods, the [[Range of Indications|range of indications]], is larger than primary. The cedant's side is the [[Ceded Loss Reserve|ceded loss reserve]].

## Patrik's reserving problems

Patrik's chapter, Exam 7's reading before Friedland (2022) and not on the current outline, adds three problems.

Most reinsurance claim reserves develop upward. Economic and social inflation cause it. So does the cedant's claims staff reserving at modal values: with too little information on a potentially serious claim, a claims person tends to reserve to the mode of the distribution. That is enough for most claims, but the few that blow up above the mode are the ones the excess reinsurer covers. ALAE also tends to be under-reserved.

The business, and the level of data detail expected of it, have grown faster than reinsurers' systems can handle. Patrik calls this a problem of the whole insurance business, but more true of reinsurance.

An adequate loss reserve is larger relative to surplus for a reinsurer, and the other problems make it both larger and more uncertain. The actuary has to persuade management and marketing to allocate adequate resources for loss liabilities. A start-up, with no claim run-off to point to, has it worst.

> [!trap] Applying primary development patterns to reinsurance data
> Excess development factors are larger and longer than the cedant's own, so primary patterns applied to reinsurance data understate IBNR. Use industry reinsurance lags or the reinsurer's own data.
