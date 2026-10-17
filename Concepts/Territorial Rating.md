---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:14670fef2ea6374d32cdc709561eeeafb7558f24d84488dac7321aa843042092
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §9.2, PDF pp.100-101, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Chalk et al., From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges, CAS Monograph 16, 1st ed., §8.2-8.3, §8.8.1, PDF pp.143-146, 152, sha256:0b293634c3d6320eac9aca5d2f8ba4ca7954f20db8a462b24771c60b5e046d74 — https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf"
    - "FSCO, Technical Notes for Automobile Insurance (Oct 2016), §16-17, PDF pp.8-9, sha256:b2ca7a6cdf4e19924f8f4dcb0e2890d723ba9ee3bcd31c31277e72a298f6d2a0 — https://www.casact.org/sites/default/files/2022-05/6C_FSCOTechNotes_102016.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Territorial Rating.md
---

**Territorial Rating** is the use of a policyholder's geographic location as a [[Rating Variable|rating variable]]. [[Basic Ratemaking (Werner - 2016)|Werner & Modlin]] call geography "one of the primary drivers of claims experience" and one of the most widely used rating variables; the [[CIA Territories|CIA]] calls territory "a cornerstone rating variable for many property and casualty lines of business". Territorial ratemaking has two phases: drawing the territories' boundaries, then setting their rate relativities.

> $$\text{Territory relativity} = \frac{\text{Territory pure premium}}{\text{Overall pure premium}}$$

- **What the geography stands for:** density, weather and crime rates are Werner & Modlin's examples of geographic signal. The CIA lists third-party data that can help find it: topography for some natural catastrophe perils, accident locations for auto, crime data for theft, weather data for water, sewer back-up, [[Flood Insurance|flood]] and hail, and public transportation data.
- **Why it is hard to estimate:** location is heavily correlated with other rating variables, so a univariate analysis of territory is distorted, and the data in each small geographic unit is sparse (Werner & Modlin Ch.11). [[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)|Goldburd et al.]] add that there can be "hundreds or thousands or hundreds of thousands of territories", too many levels for a GLM, and that collapsing them into a few loses signal (§9.2).
- **Credibility and smoothing:** a territory should be granular enough to capture differences in expected loss cost yet large enough to be [[Credibility|credible]] (CIA §1.1). Because geographic risk is similar for nearby units, actuaries smooth spatially: *distance-based* smoothing suits weather perils, *adjacency-based* smoothing suits perils driven by socio-demographic characteristics such as theft, and too much or too little smoothing either masks real variation or leaves noise (Werner & Modlin Ch.11).
- **Fairness:** territory definitions "may intersect with sociodemographic factors", so regulators' fairness concerns and the company's own guidelines have to be built into both the boundaries and the relativities, an area that "has received increased scrutiny from regulators in recent years" (CIA §6). A permitted variable correlated with a prohibited one can act as its proxy ([[From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges (Chalk et al.)|Chalk et al.]] §8.8.3); see [[Unfair Discrimination]], [[Proxy Discrimination]] and [[Bias in Actuarial Practice]].
- **Ontario's limits (Exam 6C):** a newly formed territory needs at least three years of the insurer's data and at least 2,500 annualized average vehicles; Ontario may have no more than 55 territories and Toronto no more than 10; territories must be contiguous; rates for newly formed adjoining territories may differ by no more than ±10%; one territorial definition applies to all coverages; and large claims should be capped ([[FSCO Tech Notes|FSCO Technical Notes]] §17).
- **Flattening a territory differential** has the effect Werner & Modlin describe for any rating variable: risks with different expected costs pay the same rate, so the low-cost risks subsidise the high-cost ones, and a company doing this while competitors differentiate faces [[Adverse Selection|adverse selection]] (Ch.9).

![[Media/Figures/Territorial_Rating.svg|340]]

## Territory in a Classification Model (Exam 8)

Exam 8 asks how territory is controlled for and integrated with the rest of the rating plan when the plan is fitted with a [[Generalized Linear Model|GLM]]. The answer in both readings is a **two-stage model joined by an offset**.

> $$\begin{aligned} \ln \mu_i = {} & \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip} \\ & + \ln(\text{territory loss cost}_i) \end{aligned}$$

- **Symbols:** $\mu_i$ is the expected loss cost of record $i$ in a log-link GLM, $x_{i1},\dots,x_{ip}$ are the class-plan variables, and the last term is the **offset**: a predictor whose coefficient is fixed at 1, logged to put it on the scale of the linear predictor (Goldburd et al. §2.6).
- **Territory as an offset (Goldburd et al. §9.2):** territory is modelled outside the GLM by other techniques, such as spatial smoothing. The GLM still has to account for it, so each policy record is populated with its indicated territory loss cost from the standalone model, entered as an offset. The class-plan variables are then fitted after territorial effects and "will not proxy for them".
- **A two-way street:** the territory model should in turn be offset for the class plan, so the two are run alternately, each using the other as an offset, until they converge. In practice the models may be updated at different times by different groups, so convergence may only set in over years.
- **Two-stage geographic model (Chalk et al. Ch.8):** fit a GLM to every feature except zip code, then use its output (offsets or residuals) to smooth geographically with another model type, and combine the results with the GLM if needed. In their worked example the second stage is a GAM on longitude and latitude, with claim frequency as the target and the log of the first stage's expected frequency as the offset, so that $\text{pred}_2 = \text{pred}_1 \times \text{geographic effect}$ (§8.3). They warn of **leakage**: if the first stage's prediction for a record was fitted having seen that record's own outcome, that outcome leaks into the second stage (§8.3, §8.9.1).
- **Communicating the result:** a zip code relativity table can run to tens of thousands of rows, so Chalk et al. split it into a map from zip code to area group and a short table from area group to relativity; so long as the map does not change, a rate update need communicate only the second (§8.9.2).
- **The Canadian version (Exam 6C):** the CIA's steps are the same: build a non-territory model, compute residual loss costs at the building-block level (an FSA, say), model the residuals to group similar ones while balancing each block's credibility against its neighbours', then finalize the boundaries (CIA §2).

> [!example]- Should These Territories Be Merged? {Example}
> Two adjacent urban territories show the following auto liability experience over five years.
>
> - Territory A: $18{,}000$ earned exposures, pure premium $\$540$
> - Territory B: $2{,}400$ earned exposures, pure premium $\$910$
>
> The province requires that territorial relativities be actuarially supported and limits the number of territories in a city. Should B remain separate?
>
> > [!answer]-
> > Two questions decide it: is the difference **real**, and is it **defensible**?
> >
> > **Real?** An earned exposure is already an exposure-year, so B's $2{,}400$ exposures over five years are $2{,}400$ exposure-years, about $480$ a year against A's $3{,}600$. That is a thin base for liability: a substantial part of the $\$910$ could be a handful of severe claims. Compute the combined pure premium:
> >
> > $$\begin{align*}
> > \bar{P} &= \frac{18{,}000(\$540) + 2{,}400(\$910)}{20{,}400} \\
> > &= \frac{\$9{,}720{,}000 + \$2{,}184{,}000}{20{,}400} \\
> > &= \$583.53
> > \end{align*}$$
> >
> > B's raw relativity is $910/583.53 = 1.56$. With, say, $Z = 0.45$, the credibility-weighted relativity is $0.45(1.56) + 0.55(1.00) = 1.25$, a materially different answer and the one the filing should use. (Were B being proposed as a *new* Ontario territory, its $480$ earned car-years a year would also fall short of FSCO's minimum of $2{,}500$ annualized average vehicles.)
> >
> > **Defensible?** If B is a distinct area with a known cost driver, such as higher theft or a congested corridor, the difference survives scrutiny. If B differs from A only in who lives there, the boundary runs into the fairness concerns regulators now examine.
> >
> > A defensible filing shows the credibility calculation, the smoothing, and the *reason* the territories differ.

> [!example]- Offsetting a Class Plan for Territory {Example}
> A log-link pure premium GLM is being refitted for an auto class plan. The territory loss costs come from a separate spatial model and the deductible factors from a loss elimination study; neither is to be re-estimated. One record is in a territory whose indicated loss cost is $\$310$ and carries a deductible factor of $0.95$. For this record the class-plan part of the linear predictor is $\hat\beta_0 + \sum_j \hat\beta_j x_j = \ln 1.12$.
>
> Find the record's offset and its predicted pure premium, and say what happens at the next territory review.
>
> > [!answer]-
> > Both fixed factors go in as one offset, each logged and then added:
> >
> > $$\begin{align*}
> > \text{offset} &= \ln 310 + \ln 0.95 \\
> > &= 5.7366 - 0.0513 \\
> > &= 5.6853
> > \end{align*}$$
> >
> > $$\begin{align*}
> > \hat\mu &= e^{\,5.6853 + \ln 1.12} \\
> > &= 310 \times 0.95 \times 1.12 \\
> > &= \$329.84
> > \end{align*}$$
> >
> > The class plan's factor of $1.12$ was estimated with territory held fixed, so it measures what the class variables add beyond location rather than standing in for it. At the next territory review the roles swap: the spatial model is refitted with the class plan's predictions as *its* offset, and the two models are run in turn until they converge.

> [!tip]- How it appears on the exam
> - **Exam 8 (A7):** describe how territory is controlled for in a GLM-based class plan: territory loss costs as an offset, the iteration in both directions, or Chalk et al.'s two-stage model with a geographic second stage.
> - **Exam 6C (A1):** territory as a regulated rating variable: the CIA's boundary and relativity considerations, its fairness section, and Ontario's limits on territory definitions.

> [!warning]- Exam traps
> - An offset enters on the linear predictor's scale: in a log-link model it is $\ln(\text{loss cost})$, not the loss cost itself.
> - Offsetting the class plan for territory is only half the method. The territory model must also be offset for the class plan, or territory absorbs effects that belong to the class variables.
> - Earned exposures are already exposure-years. Do not multiply a multi-year exposure total by the number of years again.
