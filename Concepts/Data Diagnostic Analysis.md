---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-16
  last_checked_by: agent:validate-v1
  content_hash: sha256:01fd7c6a6278bf5a7e2bc7e8171d01bc4f46bde7f3b49ad608b148c3e20b13fc
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Chapters 5-6 pp.61-77 (PDF pp.67-83); Chapter 13 p.291 (PDF p.297), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Shapland, Using the ODP Bootstrap Model (CAS Monograph #4, 2016), eq. (3.16) p.11 (PDF p.19); Sections 4.1-4.9 pp.20-30 and 5.1-5.3 pp.31-37 (PDF pp.28-45), eqs. (4.8)-(4.10), sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf"
    - "Venter, Testing the Assumptions of Age-to-Age Factors (PCAS 1998), Testable implications pp.812-813 (PDF pp.6-7), sha256:58523222aa33f1b8c82455818e8c2da1b8f24aee7d83badf8c88d2f71a638dcb — https://www.casact.org/sites/default/files/database/proceed_proceed98_980807.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Diagnostic Analysis.md
---

**Data diagnostic analysis** is the examination of claims and exposure data before a reserving method is applied. The data are arranged as triangles of ratios and averages, or as residuals from a fitted model, to detect changes the method would otherwise absorb silently: case reserving, settlement speed, mix, inflation and data errors. Its purpose is to test the method's assumptions and to decide how the data must be adjusted.

> $$\bar O_{w,d} = \frac{L^{\text{rep}}_{w,d} - L^{\text{paid}}_{w,d}}{N^{\text{open}}_{w,d}}$$

> $$r_{w,d} = \frac{q_{w,d} - m_{w,d}}{\sqrt{m_{w,d}}}$$

- The first block is the **average case outstanding** for accident year $w$ at age $d$: reported less paid losses, per open claim. The second is the **unscaled Pearson residual** of a fitted stochastic model, with actual incremental $q_{w,d}$ and fitted mean $m_{w,d}$.
- **Triangle diagnostics (Exam 5, Friedland).** The standard triangles are:
  - reported, closed and open [[Claim Count Triangle|claim counts]], and closed-to-reported ratios (closure rates);
  - paid, reported and average-case-outstanding [[Severity|severities]];
  - paid-to-reported loss ratios;
  - losses to premium ([[Loss Ratio|claim ratios]]) and frequencies.

  Reading **down a column** compares years at the same age, which shows trends and mix. Reading **along a diagonal** isolates a calendar period, which shows changes in claims handling.
- **What the common changes look like.**
  - **[[Case Adequacy|Case strengthening]]:** average case outstanding rises faster than trend on the latest diagonals, and paid-to-reported falls.
  - **Faster [[Settlement Rate|settlement]]:** closure rates and paid-to-reported rise together.
  - **A [[Mix of Business|mix]] change:** shows up down the columns.

  Each of these breaks a chain ladder assumption. The usual fixes are a [[Berquist-Sherman Method|Berquist-Sherman]] restatement, or separating [[Large Loss|large]] and [[Catastrophe Loss|catastrophe]] losses.
- **Model diagnostics (Exam 7, Shapland).**
  - Plot residuals against development period, accident period, calendar period and fitted value. They should be patternless and have a common variance.
  - Test normality by plotting the residuals against the normal inverse, with a P-value, $R^2$, AIC and BIC. The ODP bootstrap does not need normal residuals, but the test compares parameter sets and gauges skewness.
  - Find outliers with a box-whisker plot.
  - Where residual variance differs by development group, rescale with a **hetero-adjustment** factor $h_i = \mathrm{sd}(\text{all } r)/\mathrm{sd}(r \in \text{group } i)$.
- **Data issues to adjust for** ([[Data Issues]]): negative incremental values, missing cells, outliers, a partial first or last diagonal, exposure changes and tail factors. Venter's tests for the age-to-age factor assumptions add linearity, stability over accident years, correlation between columns, and high or low diagonals.

> [!example]- Spotting Case Strengthening {Example}
> Average case outstanding (\$) at year-end 2024, with severity trend of about $5\%$ a year:
>
> | AY | 12 | 24 | 36 |
> |---|---|---|---|
> | 2021 | $7{,}600$ | $11{,}400$ | $15{,}000$ |
> | 2022 | $8{,}000$ | $12{,}000$ | $16{,}550$ |
> | 2023 | $8{,}400$ | $13{,}250$ | |
> | 2024 | $9{,}300$ | | |
>
> Closure rates at each age have been stable. What is happening?
>
> > [!answer]-
> > Read down each column, year over year:
> >
> > $$
> > \begin{align*}
> > \text{12 mo: } 8{,}400/8{,}000 &= 1.050 \\
> > 9{,}300/8{,}400 &= 1.107 \\
> > \text{24 mo: } 12{,}000/11{,}400 &= 1.053 \\
> > 13{,}250/12{,}000 &= 1.104 \\
> > \text{36 mo: } 16{,}550/15{,}000 &= 1.103
> > \end{align*}
> > $$
> >
> > Every cell on the **2024 diagonal** is about $10\%$ above the prior year's, against roughly $5\%$ in earlier years. A calendar-year jump across all ages, with stable closure rates, points to **case strengthening in 2024**, not a change in settlement or a severity shock in one accident year.
> >
> > The consequence is that the reported chain ladder will apply historical factors, earned on weaker reserves, to a stronger diagonal and overstate ultimates. The fix is to restate the earlier diagonals' average case outstanding to the 2024 adequacy level, detrending the 2024 values at $5\%$, and rebuild the reported triangle before projecting.

> [!example]- Residuals with Unequal Variance {Example}
> An ODP bootstrap's residuals have standard deviation $1.60$ in development periods 1–3 and $0.80$ in periods 4–9. The standard deviation of all residuals is $1.20$.
>
> Compute the hetero-adjustment factors and describe how a resampled residual is used.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > h_{1\text{-}3} &= 1.20/1.60 \\
> > &= 0.75 \\
> > h_{4\text{-}9} &= 1.20/0.80 \\
> > &= 1.50
> > \end{align*}
> > $$
> >
> > Each residual is multiplied by its group's $h$, so all groups share a standard deviation of $1.20$ and can be pooled for resampling.
> >
> > When a pooled residual $r^*$ is placed back in a cell, it is divided by that cell's factor: $q^* = m + (r^*/h_i)\sqrt{m}$. Drawn into period 2, a residual of $1.2$ becomes $1.2/0.75 = 1.6$ standard units. Drawn into period 6, it becomes $1.2/1.5 = 0.8$. The pseudo-triangles then reproduce the variances actually seen in the data.
> >
> > The two factors are extra parameters, so they reduce the degrees of freedom used for the scale parameter. The same factors must also scale the process variance of future cells.
