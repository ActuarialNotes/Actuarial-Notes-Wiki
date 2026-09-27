---
Title: "Use of Models"
Authors: "Canadian Institute of Actuaries"
Publisher: "Canadian Institute of Actuaries"
Year: "2017"
date: "2017"
Type: "Educational Note"
Code: "217007"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/6C_CIA_Models.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2c7e292450f19afb5325419ae82875084519580fa8f82bb34addbc76666e6b6d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/CIA Models.md
---
![[CIA Models - Cover.svg]]

A CIA educational note setting out how an actuary can ensure that good practice is followed in the use of models. It was prepared by the Modelling Task Force and published in January 2017 (document 217007), alongside a change to the General Standards on the use of models that it is meant to be read with; it is principles-based rather than rules-based, and deals with choosing, using and reporting on models rather than with developing them.

> [!info] On the syllabus
> - [[Exam 6C (CAS)|Exam 6C]] — objective C5; the whole note.

## 1 Background
- 1.1 Reference to Exposure Draft
    - The standards define a model as a practical representation of relationships among entities or events that simplifies a more complex system, and [[Model Risk|model risk]] as the risk that, due to flaws or limitations in the model or in its use, the actuary or a user will draw an inappropriate conclusion.
- 1.2 Examples of Models
    - The main distinction is a simplification of reality versus a calculation of reality itself: adding a column of numbers is not a model, while creating loss development factors ([[Chain Ladder Method|chain ladder]]) and GLM segmentation of an automobile book are.
- 1.3 Use or Development
- 1.4 Model Risk and Risk-Rating a Model
    - Model risk is considered on two scales: the severity of a failure (financial significance, importance of the decisions, frequency of use, non-financial impact) and its likelihood (complexity, users' expertise, documentation, testing, independence of validation, [[Peer Review|peer review]]).
    - The effort in choosing, testing, validating, documenting and controlling a model reflects its risk rating; in the extreme, a model may be unacceptable because its risk rating is too high.

## 2 Choice of Model
- 2.1 New (or Substantially Changed) Model
    - Before use, the actuary reviews the specification, validates the implementation, deals with limitations and documents why the model was judged suitable, with effort varying according to the risk rating.
- 2.2 An Existing Model Used in a New Way
- 2.3 Models Approved for Use by Others
    - An actuary may use the validation work of others if satisfied that it was adequate; a validation done outside the firm carries a higher burden of proof.
- 2.4 Models Outside an Actuary's Area of Expertise
    - The actuary determines the appropriate level of reliance on other experts and discloses any reliance on models they created.
- 2.5 Sensitivity Testing
    - Assumptions are tested singly and in combination, including outside the expected range, with attention to relationships that are non-linear or linear only over a limited range.
- 2.6 Preparing to Use the Model

## 3 Minor Changes to a Model
- At a minimum, the actuary runs test cases through both the original and the changed model and verifies that the differences are reasonable.

## 4 Use of Models
- 4.1 Validation of Data Input
    - Data need to be sufficient and reliable; faults in the input data are a limitation of the model that may need to be disclosed.
- 4.2 Validation of Assumptions
- 4.3 Validation of Results
    - Checks include consistency of outputs with inputs, results as expected in direction and magnitude, consistency with trend and with sensitivity analysis, and attribution analysis of the change from the prior period.
- 4.4 Documentation
- 4.5 Periodic Validation
    - Validation is repeated periodically even for an unchanged model, more frequently for a higher risk rating.
- 4.6 Stochastic Models
    - The actuary checks the distributions of inputs and their correlations, including how dependency may increase in the tail, reviews a sample of deterministic scenarios, and bears in mind that the result is itself a statistical estimate with its own variance.

## 5 Reporting
- 5.1 When Modelling is Incidental to the Engagement
    - The model would not normally be mentioned unless there are limitations to disclose; the actuary bears the entire model risk.
- 5.2 When the Engagement Involves Modelling
- 5.3 Limitations
    - Where limitations bear directly on the engagement, the actuary discloses that a model was used and that its limitations could materially affect the results.

## 6 Hypothetical Examples
- 6.1 Life Insurance Valuation Using AXIS
- 6.2 Pension Valuation Using Third-Party Software
- 6.3 P&C Valuation Using the Chain Ladder Method
    - A company-built chain ladder model rated medium to high for its importance to the financial statements: the actuary updates the incurred triangles, selects averages and age-to-age factors, and determines the [[Tail Factor|tail factor]] by a documented methodology.
- 6.4 Determination of the Value of Lost Wages for a Suit Involving Personal Injury
- 6.5 Forecasting Capital Requirements Using a Spreadsheet Model
- 6.6 Using a New Economic Scenario Generator in an Internal Capital Model

## Appendix 1 Risk-Rating Schemes
- Two examples among many acceptable ones: a uni-dimensional score over five risk factors, totalled out of 20, and a two-dimensional assessment of severity and likelihood.

## Appendix 2 Bibliography

## Related readings
- [[CIA CSOP]] — the CIA Standards of Practice: the note accompanies a change to their General Standards on the use of models and cites subsections 1530, 1540, 1700 and 1800

## Sources
- [Use of Models (CIA, 2017)](https://www.casact.org/sites/default/files/2021-03/6C_CIA_Models.pdf) — the document: title page, memorandum, table of contents, and the text of Sections 1–6 and Appendix 1
- [CAS Exam 6C Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf) — the citation and the assigned scope
