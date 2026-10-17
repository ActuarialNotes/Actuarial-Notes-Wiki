---
Title: "Case Study for Individual Risk Rating Study Note"
Authors: "Ginda Kaplan Fisher et al."
Publisher: "Casualty Actuarial Society"
Year: "2019"
date: "2019"
Type: "Study Note"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al_Case_Study.xlsx)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0a499dc8bce6737915e9ab46f4918753497e58224b98809c03a8b075656f3b21
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Individual Risk Rating Case Study (Fisher et al.).md
---
![[Individual Risk Rating Case Study (Fisher et al.) - Cover.svg]]

An Excel workbook that accompanies the CAS Individual Risk Rating Study Note. It applies the study note's methods to a single set of fictional claims data, in ten steps: fitting a severity distribution, calculating increased limits factors and excess ratios, and pricing one account under an experience modification, a large deductible plan and a retrospective rating plan, with a limited Table M built along the way.

> [!info] On the syllabus
> - [[Exam 8 (CAS)|Exam 8]] — objectives B1–B6; Excel file.

## Introduction
- The case study accompanies the study note for the Part 8 exam, and each step has a matching answer sheet.

## Step 1
- Fit a [[Lognormal Distribution|lognormal]] probability distribution to the claims data, which is equivalent to a [[Maximum Likelihood Estimation|maximum likelihood]] estimator, and compare the fitted mean and standard deviation to the empirical ones.

## Step 2
- Use the fitted lognormal distribution to fill in a table of [[Increased Limits|increased limit factors]] (base limit of 100,000) and excess ratios, using the formula for the [[Limited Expected Value|limited expected value]] of a lognormal.

## Step 3
- Calculate an [[Experience Rating|experience modification]] for Maya Incorporated, reflecting [[Loss Development|development]], [[Loss Trend|trend]] and the loss limit, using the excess ratio from Step 2.

## Step 4
- Calculate the premium under a [[Large Deductible Policy|large deductible plan]] with no aggregate deductible limit, given the expense, premium tax, commission and underwriting profit assumptions.

## Step 5
- Calculate the parameters of a [[Retrospective Rating|retrospective rating]] plan with no maximum or minimum, and the retrospective rated premium when actual limited losses equal expected, half expected and twice expected.

## Step 6
- Use the vertical slicing method to calculate the insurance charge for an entry ratio of 2.0 and a deductible or loss limit of $100k, from the annual loss results of 500 risks of the same size.

## Step 7
- Use the horizontal slicing method to calculate a full table of insurance charges, in increments of 0.1 from 0 to 4, and compare the charge at an entry ratio of 2.0 to the Step 6 answer.

## Step 8
- Calculate the insurance charge dollars for Maya Incorporated under a large deductible plan with an aggregate deductible limit and under a retrospective rating plan with a maximum and a minimum ratable loss.

## Step 9
- Recalculate the large deductible premium from Step 4 to incorporate the aggregate deductible limit from Step 8.

## Step 10
- Recalculate the retrospective rating parameters from Step 5 incorporating the maximum and minimum ratable losses from Step 8, and compare the three actual-loss scenarios to the Step 5 answers.

## Related readings
- [[Individual Risk Rating Study Note (Fisher et al. - 2019)]] — the study note this case study accompanies

## Sources
- [Case Study for "Individual Risk Rating Study Note" (CAS Excel workbook)](https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al_Case_Study.xlsx) — the document: its Introduction sheet and the task stated on each Step sheet; the workbook prints no authors or date, so the author name and the year (that of the study note's Version 3, October 2019) are from the syllabus citation
- [CAS Exam 8 Syllabus, Fall 2023](https://www.casact.org/sites/default/files/2022-06/Exam8_Syllabus.pdf) — the citation "Fisher, G., et al., Case Study for 'Individual Risk Rating Study Note'" and the Excel file the candidate is responsible for
- [CAS Exam 8 Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf) — the assigned scope (B1–B6; Excel file)
