---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:1cab4531a84aaa572de81e313144c7336ef115eba19d25b1b63ef8bd8778d5ed
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.9 PDF pp.163-164, 175; Ch.11 PDF pp.200-204, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "CIA, Territory Pricing Considerations in Property and Casualty Insurance (Mar 11 2024, doc. 224032), opening, §1, §1.1, §2, §4, §6, PDF pp.3-5, sha256:c65816631dc97df85caafaf03842e29d17baf625863c0f37c6a9b805d408fa70 — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=323292&fid=323290"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §2.6 PDF pp.27-28, §9.2 PDF pp.100-101, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Chalk et al., From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges, CAS Monograph 16, §8.2-8.3 PDF pp.143-146, §8.8.3 PDF p.152, §8.9.1-8.9.2 PDF pp.153-155, sha256:0b293634c3d6320eac9aca5d2f8ba4ca7954f20db8a462b24771c60b5e046d74 — https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf"
    - "FSCO, Technical Notes for Automobile Insurance Rate and Risk Classification Filings (Oct 2016), §16-17, PDF p.8, sha256:b2ca7a6cdf4e19924f8f4dcb0e2890d723ba9ee3bcd31c31277e72a298f6d2a0 — https://www.casact.org/sites/default/files/2022-05/6C_FSCOTechNotes_102016.pdf"
    - "CAS Exam 8 Content Outline, Fall 2026 (October 2026 administration), Domain A task 7 (PDF p.3), Experience Rating and Retrospective and Loss Sensitive Rating statements (PDF p.4), sha256:306e7a7b6351597e46fd82fd74c294fce3afc8b1f9227ea8c001f3b081964521 — https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf"
    - "CAS Exam 6C Content Outline, Fall 2026, Domain A tasks and readings (PDF p.3), reading table: CIA Territories, FSCO Tech Notes, Marshall, Landmark Legal (PDF pp.9-11), sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1 — https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Territorial Rating.md
---

![[Media/Figures/Territorial_Rating.svg|340]]

**Territorial Rating** is the use of a policyholder's geographic location as a [[Rating Variable|rating variable]]. Territorial ratemaking has two phases: drawing the territories' boundaries, then setting their rate relativities.

A territory's indicated relativity is

> $$\text{Territory relativity} = \frac{\text{Territory pure premium}}{\text{Overall pure premium}}$$

- The overall pure premium is the total losses over the total exposures of all territories.

> [!example]- Should Territory B remain a separate territory? {Example}
> Two adjacent urban territories show this auto liability experience over five years:
>
> | Territory | Earned exposures | Pure premium |
> | :--- | ---: | ---: |
> | A | 18,000 | $540 |
> | B | 2,400 | $910 |
>
> The province requires that territorial relativities be actuarially supported and limits the number of territories in a city. B's credibility is $Z = 0.45$.
>
> > [!answer]-
> > - An earned exposure is already an exposure-year, so B has $2{,}400$ exposure-years over the five years, about $480$ a year against A's $3{,}600$.
> > - That is a thin base for liability, and a substantial part of the $\$910$ could be a handful of severe claims.
> > - The combined pure premium is $(18{,}000 \times 540 + 2{,}400 \times 910)/20{,}400 = \$583.53$.
> > - B's raw relativity is $910/583.53 = 1.56$.
> > - The credibility-weighted relativity is $0.45(1.56) + 0.55(1.00) = 1.25$, a materially different answer and the one the filing should use.
> > - Were B proposed as a *new* Ontario territory, its $480$ earned car-years a year would also fall short of FSCO's minimum of $2{,}500$ annualized average vehicles.
> > - If B is a distinct area with a known cost driver, such as higher theft or a congested corridor, the difference survives scrutiny. If B differs from A only in who lives there, the boundary runs into the fairness concerns regulators now examine.
> > - B can remain separate at the credibility-weighted relativity if the filing shows the credibility calculation, the smoothing and the reason the territories differ.

## What territory measures

Density, weather and crime rates are Werner & Modlin's examples of what geography stands for. The [[CIA Territories|CIA]] lists third-party data that can help find it: topography for some natural catastrophe perils, accident locations for auto, crime data for theft, weather data for water, sewer back-up, [[Flood Insurance|flood]] and hail, and public transportation data.

Territory is hard to estimate. Location is heavily correlated with other rating variables, so a univariate analysis of territory is distorted, and the data in each small geographic unit is sparse (Werner & Modlin Ch.11). [[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)|Goldburd et al.]] add that there can be "hundreds or thousands or hundreds of thousands of territories", too many levels for a GLM, and that collapsing them into a few loses signal (§9.2).

## Credibility and spatial smoothing

A territory should be granular enough to capture differences in expected loss cost yet large enough to be [[Credibility|credible]] (CIA §1.1). Because geographic risk is similar for nearby units, actuaries smooth spatially. Distance-based smoothing suits weather perils, and adjacency-based smoothing suits perils driven by socio-demographic characteristics such as theft. Too much smoothing masks real variation, and too little leaves noise (Werner & Modlin Ch.11).

## Fairness and adverse selection

Territory definitions "may intersect with sociodemographic factors", so regulators' fairness concerns and the company's own guidelines have to be built into both the boundaries and the relativities, an area that "has received increased scrutiny from regulators in recent years" (CIA §6). A permitted variable correlated with a prohibited one can act as its proxy ([[From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges (Chalk et al.)|Chalk et al.]] §8.8.3, [[Unfair Discrimination]], [[Proxy Discrimination]], [[Bias in Actuarial Practice]]).

Flattening a territory differential has the effect Werner & Modlin describe for any rating variable. Risks with different expected costs pay the same rate, so the low-cost risks subsidise the high-cost ones, and a company doing this while competitors differentiate faces [[Adverse Selection|adverse selection]] (Ch.9).

## Ontario's limits on territories

The [[FSCO Tech Notes|FSCO Technical Notes]] (§17) limit how Ontario auto territories are defined:

1. A newly formed territory needs at least three years of the insurer's data and at least 2,500 annualized average vehicles over the three-year period.
2. Ontario may have no more than 55 territories, and Toronto no more than 10.
3. Territories must be contiguous.
4. Rates for newly formed adjoining territories may differ by no more than ±10%.
5. One territorial definition applies to all coverages.
6. Large claims should be capped.

## Territory in a classification GLM

Territory is modelled outside the GLM by other techniques, such as spatial smoothing (Goldburd et al. §9.2). The GLM still has to account for it, so each policy record is populated with its indicated territory loss cost from the standalone model, entered as an [[Offset Variable|offset]]. In a log-link model the linear predictor is then

> $$\begin{aligned} \ln \mu_i = {} & \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip} \\ & + \ln(\text{territory loss cost}_i) \end{aligned}$$

- $\mu_i$ is the expected loss cost of record $i$.
- $x_{i1},\dots,x_{ip}$ are the class-plan variables and $\beta_0, \dots, \beta_p$ their fitted coefficients.
- The last term is the offset, a predictor whose coefficient is fixed at 1, logged to put it on the scale of the linear predictor (Goldburd et al. §2.6).

The class-plan variables are then fitted after territorial effects and "will not proxy for them". The territory model should in turn be offset for the class plan, so the two are run alternately, each using the other as an offset, until they converge. In practice the models may be updated at different times by different groups, so convergence may only set in over years.

Chalk et al. (Ch.8) describe a two-stage geographic model. A GLM is fitted to every feature except zip code, its output (offsets or residuals) is smoothed geographically with another model type, and the results are combined with the GLM if needed. In their worked example the second stage is a GAM on longitude and latitude, with claim frequency as the target and the log of the first stage's expected frequency as the offset, so that $\text{pred}_2 = \text{pred}_1 \times \text{geographic effect}$ (§8.3). They warn of leakage: if the first stage's prediction for a record was fitted having seen that record's own outcome, that outcome leaks into the second stage (§8.3, §8.9.1).

A zip code relativity table can run to tens of thousands of rows, so Chalk et al. split it into a map from zip code to area group and a short table from area group to relativity. So long as the map does not change, a rate update need communicate only the second (§8.9.2).

The CIA's steps (§2) are the same. Build a non-territory model, compute residual loss costs at the building-block level (an FSA, say), model the residuals to group similar ones while balancing each block's credibility against its neighbours', then finalize the boundaries.

> [!example]- What is this record's offset and predicted pure premium, and what happens at the next territory review? {Example}
> A log-link pure premium GLM is being refitted for an auto class plan. The territory loss costs come from a separate spatial model and the deductible factors from a loss elimination study, and neither is to be re-estimated. One record is in a territory whose indicated loss cost is $\$310$ and carries a deductible factor of $0.95$. For this record the class-plan part of the linear predictor is $\hat\beta_0 + \sum_j \hat\beta_j x_j = \ln 1.12$.
>
> > [!answer]-
> > - Both fixed factors go in as one offset, each logged and then added.
> > - The offset is $\ln 310 + \ln 0.95 = 5.7366 - 0.0513 = 5.6853$.
> > - The predicted pure premium is $e^{5.6853 + \ln 1.12} = 310 \times 0.95 \times 1.12 = \$329.84$.
> > - The class plan's factor of $1.12$ was estimated with territory held fixed, so it measures what the class variables add beyond location.
> > - At the next territory review the roles swap. The spatial model is refitted with the class plan's predictions as its offset, and the two models are run in turn until they converge.

> [!trap] Entering the loss cost itself as the offset
> An offset enters on the linear predictor's scale. In a log-link model it is $\ln(\text{loss cost})$, so a territory loss cost of $\$310$ enters as $5.7366$, not $310$.
