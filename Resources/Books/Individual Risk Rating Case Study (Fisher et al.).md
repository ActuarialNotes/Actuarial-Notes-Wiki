---
Title: "Case Study for “Individual Risk Rating Study Note”"
Authors: "Ginda Kaplan Fisher, Lawrence McTaggart, Jill Petker and Rebecca Pettingell"
Publisher: "Casualty Actuarial Society"
Year: "2016"
date: "2016"
Type: "Study Note"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al_Case_Study.xlsx)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d2ca57a34bb9319c9da79fc806a9913d52ce1c1c51a048259a8ba634bd6dd38d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Individual Risk Rating Case Study (Fisher et al.).md
---
![[Individual Risk Rating Case Study (Fisher et al.) - Cover.svg]]

An Excel workbook that accompanies the Individual Risk Rating study note, in which the reader applies its methods step by step to one set of claims data. Its Introduction lays out ten steps: fit a severity distribution and derive increased limit factors and excess ratios from it; price one account, Maya Incorporated, with an experience modification, a large deductible plan and a retrospective rating plan; build a limited Table M by vertical and horizontal slicing; then reprice the account with an aggregate deductible limit and with maximum and minimum ratable losses. Each step has its own answer sheet.

> [!info] On the syllabus
> - [[Exam 8 (CAS)|Exam 8]] — objectives B1–B6; the whole workbook (an Excel file)

## Introduction
- Welcomes the reader to the case study that accompanies the study note, and lists what each of the ten steps does.
- Before Step 1 it suggests reviewing the CAS monograph *Distributions for Actuaries*, and before Step 3 the ISO and NCCI experience rating plans on the syllabus.

## Step 1
- Fit a [[Lognormal Distribution|lognormal distribution]] to 1,000 claims, at ultimate and trended to a common prospective date: take the natural log of each claim and use the mean and the population standard deviation of the logs as the parameters $m$ and $s$ — equivalent to the [[Maximum Likelihood Estimation|maximum likelihood estimator]] for the lognormal.
- Compare the fitted mean and standard deviation with the empirical ones. The answer sheet finds $m = 7.9858$ and $s = 2.5951$, a fitted mean of 85,216 against an empirical 108,318, and notes that the fitted and empirical distributions can be quite different in the tail, even with 1,000 claims.

## Step 2
- From the fitted lognormal, fill in a table of [[Increased Limits|increased limit factors]] (base limit 100,000) and excess ratios at limits of 100,000, 250,000, 500,000, 1,000,000, 2,000,000 and unlimited, assuming single-claim occurrences; the sheet gives the lognormal [[Limited Expected Value|limited expected value]] formula.
- In the answer sheet the excess ratio at 100,000 is 0.7896.

## Step 3
- Calculate an [[Experience Rating|experience modification]] for Maya Incorporated, whose expected loss before modification is 678,463, from three years of reported losses (2, 3 and 4 years prior, at 18, 30 and 42 months) with individual claims capped at 100,000, a 3% annual trend and limited loss development factors of 1.455, 1.213 and 1.103.
- Step a de-trends, "undevelops" and limits the expected losses to the experience periods; step b caps the actual losses; step c credibility-weights the actual-to-expected ratio with $Z = 0.75$.
- The answer sheet's mod is 0.9456 (292,309 of capped actual losses against 315,154 expected), for experience-modified expected losses of 641,577. It notes that comparing developed and trended actual losses with expected ultimate losses instead is not equivalent: the approach taken gives a bit more weight to the oldest period.

## Step 4
- Calculate the premium for a [[Large Deductible Policy|large deductible plan]] with a 100,000 per-occurrence deductible, no aggregate deductible limit and the deductible applying to loss only, given LAE of 10% of loss, premium tax of 3% and commission of 10% of net premium, fixed overhead of 50,000 and underwriting profit of 7% of expected excess loss.
- The answer applies Step 2's excess ratio to the modified expected losses, and applies the LAE provision to the full expected loss, so that LAE becomes in effect a fixed expense.

## Step 5
- Calculate the parameters of a [[Retrospective Rating|retrospective rating plan]] with a 100,000 per-occurrence loss limit and no maximum or minimum ratable loss — LAE in the loss conversion factor, premium tax and commission in the tax multiplier, fixed overhead and profit in the basic premium, which also carries the per-occurrence excess provision and its LAE.
- Calculate the retrospective premium when actual limited losses equal expected, half expected and twice expected, and say what including commission in the tax multiplier implies: it is charged as a percentage of premium, where in the loss conversion factor it would be a percentage of loss and in the basic premium a fixed expense.

## Step 6
- Use the vertical slicing method to calculate the [[Insurance Charge|insurance charge]] at an entry ratio of 2.0 with a 100,000 loss limit, from the annual limited losses of 500 risks of the same size with expected limited losses of 134,985; the answer sheet's charge is 4.44%.

## Step 7
- Use the horizontal slicing method to calculate a full limited Table M from 0 to 4 in increments of 0.1, and compare the charge at 2.0 with Step 6's.
- The answer sheet concludes that horizontal slicing is more convenient for a whole table but less accurate when the slices are too broad: 0.1 gives 0.0488 at an entry ratio of 2.0, while a refined 0.01 increment gives 0.0448, close to Step 6's 0.0444. Vertical slicing is more straightforward, and frequency and severity distributions, simulated or convolved, are a third alternative.

## Step 8
- Calculate Maya Incorporated's insurance charge for (a) a large deductible plan with an aggregate deductible limit of 202,329 and (b) a retrospective rating plan with a maximum ratable loss of 202,329 and a minimum of 67,443, using the refined Table M from Step 7 and entry ratios rounded to one decimal.
- The answer sheet enters the table at 1.5 for the aggregate limit and the maximum, and at 0.5 for the minimum, for a net insurance charge of 5,518 in scenario (b).

## Step 9
- Recalculate the large deductible premium from Step 4 to include the aggregate deductible limit, loading the aggregate excess losses for profit at the same percentage as the per-occurrence excess; the difference is the aggregate excess loaded for profit and variable expenses.

## Step 10
- Recalculate the retrospective rating parameters from Step 5 with the maximum and minimum ratable losses from Step 8, recompute the premium in the three loss scenarios, and comment on the differences.
- The answer sheet finds the premium higher when limited losses are expected or half expected, by the net insurance charge loaded for LAE, profit, commission and premium tax, and lower at twice expected, because the actual limited losses then exceed the maximum ratable loss.

## Related readings
- [[Individual Risk Rating Study Note (Fisher et al. - 2019)]] — the study note the workbook accompanies; its Foreword describes the case study, and Chapter 2 points to it for examples of large deductible premium
- [[CGL Experience and Schedule Rating Plan (ISO)]] — assigned with the workbook for objectives B5–B6

## Sources
- [Case Study for "Individual Risk Rating Study Note" (CAS)](https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al_Case_Study.xlsx) — the workbook, every sheet read: the Introduction, Steps 1–10 and their answer sheets. It names no author and prints no date; the year is the creation date in its document properties (30 June 2016; last modified 10 March 2021)
- [CAS Exam 8 Content Outline, Fall 2026 (v03, June 2026)](https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf) — the citation, which credits the case study to Fisher, G., et al., as it does the study note, and the assignment, objectives B1–B6
- [Individual Risk Rating Study Note (CAS, October 2019)](https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf) — the authors behind the outline's "Fisher, G., et al."; its Foreword and Chapter 2 describe the case study
