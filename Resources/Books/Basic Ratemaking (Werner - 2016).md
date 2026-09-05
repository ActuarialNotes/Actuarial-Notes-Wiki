---
Title: Basic Ratemaking
Authors: "Geoff Werner, Claudine Modlin"
Year: "2016"
date: "2016"
Edition: 5th
Publisher: Casualty Actuarial Society
Type: Textbook
Available from: "[casact.org](https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf)"
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-05
  last_checked_by: agent:validate-v1-followup
  content_hash: sha256:5276f993b985228da93367fca70226e547fecbcee3fad21d3d1a1ba732ed06bc
  sources:
    - "Werner, G. & Modlin, C., Basic Ratemaking, 5th ed., May 2016 (CAS) — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf (sha256 6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c, 423 pp.): printed Table of Contents PDF pp.8-12, PDF bookmark outline, and chapter bodies pp.204-210 (ILF), 310 (large commercial scope), 324-333 (ch.16), 411/415 (Appendices E/F)"
    - "CAS Exam 5 Content Outline, Fall 2026 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf (version Exam_5_CO_2026_F v01 2026_4_22.docx; sha256 a7ba895343f7d888bc2c2d5f3b10b2811c8911620c628ae4cebd3ae6393ff1ea), p.6 'Complete Text References for Exam 5' and p.4 Domain A task list"
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Basic Ratemaking (Werner - 2016).md
---
![[Basic Ratemaking (Werner - 2016) - Cover.svg]]

The primary [[Ratemaking]] text on the [[Exam 5 (CAS)|Exam 5]] syllabus. The CAS Exam 5 content outline lists **Chapters 1 and 3–16**; **Chapter 2 is excluded**, and the Appendices "are an integral part of the textbook and will be used for creating questions." Errata are included in the reading.

## 1 Introduction

- The [[Ratemaking|fundamental insurance equation]]: premium = losses + LAE + underwriting expenses + underwriting profit
- Basic insurance terms: [[Exposure Base|exposure]], [[Premium]], claim, [[Loss and Loss Adjustment Expense|loss and LAE]], underwriting expense, [[Underwriting Profit|underwriting profit]]
- Ratemaking as a **prospective** exercise — estimating costs for a future policy period
- Key ratios: [[Frequency]], [[Severity]], pure premium, [[Loss Ratio]], expense ratio, combined ratio

## 2 Rating Manuals

> [!warning]- Not on the Exam 5 syllabus
> The CAS content outline excludes Chapter 2. It is kept here because it is part of the book's structure and the later chapters refer back to it — but nothing in it is examinable.

- Structure of a rating manual: rules, rate pages, [[Rating Algorithm|rating algorithms]], underwriting guidelines
- [[Classification Ratemaking|Rating characteristics]] and how they map to relativities
- Worked rating manual examples for homeowners, medical malpractice, and U.S. workers compensation

## 3 Ratemaking Data

- Internal data: policy and claim databases, accounting records
- [[Ratemaking Data Organization|Aggregation methods]]: [[Calendar Year]], [[Accident Year]], [[Policy Year]], [[Report Year]]
- External data: statistical plans, other aggregated insurance data, competitor rate filings, third-party data
- Trade-offs between accuracy, availability, and timeliness of each aggregation

## 4 Exposures

- Criteria for a good [[Exposure Base]]: proportional to expected loss, practical, and consistent with historical/industry practice
- [[Earned Exposure|Written, earned, unearned, and in-force exposures]]
- [[Exposure Trend|Exposure trend]] and the effect of inflation-sensitive exposure bases

## 5 Premium

- [[Written Premium|Written]], [[Earned Premium|earned]], unearned, and [[In-Force|in-force]] premium
- [[On-Leveling|Adjusting premium to current rate level]]: the **parallelogram method** and **extension of exposures**
- [[Premium Trend|Premium trend]]: one-step and two-step trending; the distributional shift problem
- [[Premium Audit|Premium audits]] and their effect on the data

## 6 Losses and LAE

- [[Paid Losses|Paid]], case incurred, and ultimate losses; [[Case Reserves|case reserves]] and [[IBNR]]
- [[Allocated Loss Adjustment Expense|ALAE]] and [[Unallocated Loss Adjustment Expenses ULAE|ULAE]]
- [[Loss Development|Loss development]] to ultimate and [[Loss Trend|loss trend]] to the future period; avoiding overlap between the two
- [[Occurrence Coverage|Occurrence]] vs. [[Claims Made Coverage|claims-made]] coverage triggers
- Adjusting for [[Large Loss|extraordinary losses]], [[Catastrophe Loss|catastrophes]], and reinsurance

## 7 Other Expenses and Profit

- [[Expense Provisions|Expense provisions]]: [[Fixed Expenses|fixed]] vs. [[Variable Expenses|variable]] treatment
- The all-variable expense method and the distortion it introduces across policy sizes
- Projecting expenses: the premium-based method and the exposure/policy-based method
- [[Profit and Contingency Provision|Underwriting profit provision]] and the net cost of [[Reinsurance|reinsurance]]
- Deriving the [[Permissible Loss Ratio]] from the expense and profit provisions

## 8 Overall Indication

- The [[Pure Premium Method]] and the [[Loss Ratio Method]] — mathematical equivalence and when each is preferred
- Building the [[Overall Rate Level Indication]] from trended, developed, on-level components

## 9 Traditional Risk Classification

- Rationale for [[Classification Ratemaking|risk classification]]: adverse selection and equity
- Criteria for evaluating rating variables: actuarial, operational, social, and legal
- Univariate methods — pure premium and loss ratio approaches — and their bias from exposure correlation

## 10 Multivariate Classification

- Minimum bias procedures as a bridge from univariate to multivariate
- [[Generalized Linear Model|GLMs]]: [[Link Function|link functions]], distributions, and interpreting output
- Model diagnostics, validation, and practical considerations in a rating context

## 11 Special Classification

- [[Territory Ratemaking|Territorial ratemaking]] and spatial smoothing
- [[Increased Limits|Increased limits factors]]: the standard ILF approach built on limited average severity, censored losses, the effect of trend on higher layers, and the ISO mixed exponential and multivariate approaches
- [[Deductible Rating|Deductible pricing]] and the loss elimination ratio
- Size of risk, [[Coinsurance Rating|coinsurance]], and insurance-to-value

## 12 Credibility

- [[Credibility|Credibility]] measures and the [[Limited Fluctuation Credibility|limited fluctuation]] standard
- [[Bühlmann Credibility|Bühlmann]] and [[Bühlmann-Straub Credibility|Bühlmann-Straub]] approaches
- Choosing the [[Complement of Credibility|complement of credibility]]: first dollar and excess methods, and desirable criteria for a complement

## 13 Other Considerations

- [[Ratemaking Constraints|Regulatory, operational, and marketing constraints]]
- [[Lifetime Value|Customer lifetime value]] and retention modelling
- Selecting a final [[Rate Change|rate change]] that departs from the indication

## 14 Implementation

- [[Considerations for Implementing Rates|Implementation considerations]]: non-pricing solutions, [[Minimum Premium|minimum premiums]], base rate offsets
- Off-balancing and rebalancing the [[Rating Algorithm|rating algorithm]]
- Calculating a final base rate consistent with the overall indication

## 15 Commercial Lines Rating Mechanisms

- Manual rating vs. loss-rated and composite-rated risks
- [[Experience Rating|Experience rating]] and [[Schedule Rating|schedule rating]]
- [[Retrospective Rating|Retrospective rating]]: basic premium, loss conversion factor, tax multiplier, minimum and maximum premium
- Rating mechanisms for large commercial risks: loss-rated composite risks, large deductible policies, and [[Retrospective Rating|retrospective rating]] plans

## 16 Claims-Made Ratemaking

- Why claims-made coverage exists: unanticipated inflation and rising frequency in long-tailed professional liability during the 1960s–70s, and the pricing risk of a long reporting lag
- Aggregating losses by **report year** and **report lag**: an occurrence policy is a diagonal of the report-year/lag table (one accident year), a [[Claims Made Coverage|claims-made]] policy is a row (one report year)
- The [[Occurrence Coverage|coverage trigger]] is the **report date** rather than the accident date, so only claims reported in the next policy period must be projected
- The five principles of claims-made policies (Marker and Mohl, 1980): cheaper than occurrence while claim costs rise; less exposed to a misestimated trend; a mature policy is barely affected by a shift in the reporting pattern; no pure [[IBNR]] liability, so less reserve-inadequacy risk; and substantially less investment income
- Coordinating coverage: the **retroactive date**, first- and second-year vs. **mature** claims-made policies, **step factors** as a percentage of the mature rate, and the **extended reporting endorsement** (tail coverage) that closes the gap on switching back to occurrence or on retirement

## Appendices

The Appendices are, per the CAS content outline, "an integral part of the textbook and will be used for creating questions."

- **A–D** — full ratemaking indication worked examples: auto (loss ratio), homeowners (pure premium), medical malpractice, and workers compensation
- **E** — univariate classification example: the pure premium and loss ratio approaches side by side
- **F** — multivariate classification example: sample [[Generalized Linear Model|GLM]] output for a predictive and an unpredictive variable, plus overall model validation on a hold-out sample

## Links
- [Basic Ratemaking, 5th Edition (CAS)](https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf)
