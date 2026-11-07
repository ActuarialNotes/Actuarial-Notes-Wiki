---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:dbf60ba8dbe472b2bff57e8a92aa7c9035e2f9f38d5bb57d56bc2dbfa2ff11a6
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Chapters 5-6 pp.61-77 (PDF pp.67-83), re-read Ch.6 pp.72-76 (PDF 78-82) incl. Tables 11-14 this session; Chapter 13 p.291 (PDF p.297), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Shapland, Using the ODP Bootstrap Model (CAS Monograph #4, 2016), eq. (3.16) p.11 (PDF p.19); Sections 4.1-4.9 pp.20-30 and 5.1-5.3 pp.31-37 (PDF pp.28-45), eqs. (4.8)-(4.10), sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf"
    - "Venter, Testing the Assumptions of Age-to-Age Factors (PCAS 1998), Testable implications pp.812-813 (PDF pp.6-7), sha256:58523222aa33f1b8c82455818e8c2da1b8f24aee7d83badf8c88d2f71a638dcb — https://www.casact.org/sites/default/files/database/proceed_proceed98_980807.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Diagnostic Analysis.md
---

**Data Diagnostic Analysis** is the review of claims and exposure data, before an estimation technique is chosen, for changes in the insurer's operations and environment that the technique would otherwise absorb. Its main tools are triangles of ratios and averages built from the paid, reported and [[Claim Count Triangle|claim count]] triangles. The one that tests [[Case Adequacy|case adequacy]] most directly is the average case outstanding of an accident year at an age:

> $$\text{Average Case Outstanding} = \frac{\text{Reported Claims} - \text{Paid Claims}}{\text{Open Claim Counts}}$$

- $\text{Reported Claims} - \text{Paid Claims}$ is the case outstanding at that age.
- $\text{Open Claim Counts}$ are the reported claim counts minus the closed claim counts at the same age.

A diagnostic triangle is read **down the columns**, comparing accident years at the same age, because moving along a row is only normal maturing. In a stable environment the averages down a column rise only at the rate of [[Inflation|inflation]]. A rise faster than the severity trend, step by step along the latest diagonals, points to a strengthening of case outstanding.

> [!example]- Average case outstanding at $12/31/2024$ is 7,600, 11,400 and 15,000 at 12, 24 and 36 months for accident year 2021, 8,000, 12,000 and 16,550 for 2022, 8,400 and 13,250 for 2023, and 9,300 at 12 months for 2024. The severity trend is about 5% a year, and closed-to-reported count ratios are stable. What has happened? {Example}
> - Down the 12-month column the averages rise by $8{,}000/7{,}600 = 1.053$, $8{,}400/8{,}000 = 1.050$ and then $9{,}300/8{,}400 = 1.107$.
> - Down the 24-month column they rise by $12{,}000/11{,}400 = 1.053$ and then $13{,}250/12{,}000 = 1.104$.
> - Down the 36-month column they rise by $16{,}550/15{,}000 = 1.103$.
> - Every value on the 2024 diagonal is about 10% above the year before, against 5% earlier, and settlement speed has not changed.
> - Case outstanding was strengthened in 2024, so the reported development technique, applying factors from weaker reserves to a stronger diagonal, would overstate ultimate claims.
> - The fix is to restate the earlier diagonals' average case outstanding to the 2024 adequacy level, detrending the 2024 values at $5\%$, and rebuild the reported triangle before projecting.

## Diagnostic triangles

Friedland's diagnostic triangles are built from the base triangles as ratios or averages:

1. **Reported claims to earned premium**, and to on-level earned premium, the claim ratios.
2. **Paid claims to reported claims**, which tests for changes in case adequacy or settlement.
3. **Closed claim counts to reported claim counts**, the settlement or disposal rate.
4. **Average reported claim**, reported claims divided by reported claim counts.
5. **Average paid claim**, paid claims divided by closed claim counts.
6. **Average case outstanding**, case outstanding divided by open claim counts.

The average paid claim mixes partial payments in its numerator with only settled claims in its denominator. Severities are studied in their own right in [[Severity Analysis|severity analysis]].

## How operational changes appear

Each common change leaves its own mark down the columns of the diagnostics:

| Change | Paid to reported | Closed to reported counts | Average case outstanding |
| --- | --- | --- | --- |
| Case outstanding strengthened | Falls | No change | Rises faster than trend |
| Faster settlement | Rises | Rises | Can rise, as small claims close first |
| Slower settlement | Falls | Falls | Changes with the mix of claims left open |

A ratio can move because of its numerator or its denominator. A rising paid-to-reported ratio can come from faster settlement, weaker case outstanding or both, so the ratio alone cannot tell them apart. An unchanged ratio does not prove nothing has changed, because faster settlement and stronger case outstanding can offset each other.

Faster settlement also changes the mix of open claims. Insurers close the less complicated and less expensive claims first, so the claims left open are the larger ones. Average case outstanding then rises down the columns with no change in adequacy, and the actuary must decide how much of a rise is adequacy and how much is mix. Averages also need consistent counts: whether claims closed without payment are counted changes every average, so the insurer's definition must be known and used the same way throughout the experience period. Large claims and deductibles distort averages too.

> [!example]- Closed-to-reported count ratios at 12 months have risen from about 0.14 to above 0.20 for the last three accident years, and average paid claims on the latest diagonal are the highest in each column from 12 to 36 months. Management says claims are being settled faster. What should the actuary conclude? {Example}
> - The rising closed-to-reported ratios confirm a speed-up in settlement.
> - The higher average paid claims at early ages suggest a change in the type of claim being closed, not only in the number.
> - The paid development technique would overstate ultimate claims, because the latest paid diagonal is further along than the history.
> - A rise in average case outstanding may be the larger open claims left behind, so it is not by itself evidence of stronger case outstanding.

These changes break the assumptions of the development technique. The usual fixes are a [[Berquist-Sherman Method|Berquist-Sherman]] restatement, a technique that the change does not distort, or separating [[Large Loss|large]] and [[Catastrophe Loss|catastrophe]] claims. Other problems in the data, such as negative or missing values, are covered under [[Data Issues|data issues]].

## Residual diagnostics for a bootstrap model (Exam 7)

The over-dispersed Poisson bootstrap is diagnosed through its residuals. The unscaled Pearson residual of the incremental value in accident year $w$ at age $d$ is

> $$r_{w,d} = \frac{q_{w,d} - m_{w,d}}{\sqrt{m_{w,d}}}$$

- $q_{w,d}$ is the actual incremental value.
- $m_{w,d}$ is the model's fitted incremental value, whose variance is proportional to it.

The residuals are plotted against development period, accident period, calendar period and fitted value, with a zero line. They should be patternless and have a common variance. A trend in them, or a spread that differs by development period (heteroscedasticity), means the model needs adjusting. Normality is tested by plotting the residuals against the normal inverse, with a P-value, $R^2$, AIC and BIC, and outliers are found with a box-whisker plot.

Where the variance differs by group of development periods, each group's residuals are multiplied by its hetero-adjustment factor:

> $$h_i = \frac{\text{sd}(\text{all residuals})}{\text{sd}(\text{residuals in group } i)}$$

A residual sampled into a cell of group $i$ is divided by that group's factor, so the sampled incremental is $q^* = m + (r^*/h_i)\sqrt{m}$.

> [!example]- An ODP bootstrap's residuals have a standard deviation of 1.60 in development periods 1 to 3 and 0.80 in periods 4 to 9, and 1.20 overall. What are the hetero-adjustment factors, and what does a pooled residual of 1.2 become in each group? {Example}
> - The factor for periods 1 to 3 is $1.20/1.60 = 0.75$.
> - The factor for periods 4 to 9 is $1.20/0.80 = 1.50$.
> - Each residual is multiplied by its group's $h$, so all groups share a standard deviation of $1.20$ and can be pooled for resampling.
> - A pooled residual of 1.2 placed in period 2 becomes $1.2/0.75 = 1.6$, and in period 6 it becomes $1.2/1.50 = 0.8$.
