---
Title: "Modeling"
Authors: "Actuarial Standards Board"
Publisher: "Actuarial Standards Board"
Year: "2019"
date: "2019"
Type: "Standard of Practice"
Code: "ASOP No. 56"
Available from: "[actuarialstandardsboard.org](https://www.actuarialstandardsboard.org/wp-content/uploads/2020/01/asop056_195-1.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:53bd1e215072609a67dd2d2ca6deb96c5f7296d3a6c799ddc936654edbe4985d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/ASOP 56 - Modeling (ASB - 2019).md
---
![[ASOP 56 - Modeling (ASB - 2019) - Cover.svg]]

The actuarial standard of practice for actuaries designing, developing, selecting, modifying, using, reviewing, or evaluating models in any practice area. Doc. No. 195 was developed by the Modeling Task Force of the General Committee of the Actuarial Standards Board, followed four exposure drafts released between 2013 and 2018, and was adopted by the ASB in December 2019; it is effective for work performed on or after October 1, 2020.

> [!info] On the syllabus
> - [[Exam PCPA (CAS)|Exam PCPA]] — objectives A1–A4 (Domain A, Dealing with Data); the outline cites the whole standard, as an online publication (OP).

## Transmittal Memorandum
- ASB work on a modeling standard began in the late 1990s and produced ASOP No. 38; in December 2012 the ASB created a general Modeling Task Force to develop an ASOP for modeling in all practice areas.
- Changes from the fourth exposure draft: the guidance on margins (section 3.1.6(b)) was deleted, "hold-out data" was defined and added to model output validation in section 3.6.2(b), and "parameter" was eliminated from section 3.

## 1 Purpose, Scope, Cross References, and Effective Date
- 1.1 Purpose
- 1.2 Scope
    - Applies to actuaries in any practice area, including an actuary using a model developed by others who is responsible for its output, when reliance by the intended user on the model output has a material effect.
    - Pension, insurance pricing, predictive, reserving and insurance company financial planning models are named as examples; where another ASOP's guidance conflicts with this one, the other ASOP governs.
- 1.3 Cross References
- 1.4 Effective Date

## 2 Definitions
- 2.1 Assumption
    - A type of explicit input to a model that is derived from data, represents possibilities based on professional judgment, or may be prescribed by law or by others; one derived from data may be described as a parameter.
- 2.2 Data
- 2.3 Governance and Controls
- 2.4 [[Holdout Sample|Hold-out Data]]
    - A subset of data withheld intentionally when developing a predictive model, so that the model may be validated later with data not used to develop it.
- 2.5 Input
- 2.6 Intended Purpose
- 2.7 Intended User
- 2.8 Model
    - A simplified representation of relationships among real world variables, entities, or events, consisting of an information input component, a processing component, and a results component.
- 2.9 [[Model Risk]]
    - The risk of adverse consequences from reliance on a model that does not adequately represent that which is being modeled, or the risk of misuse or misinterpretation.
- 2.10 Model Run
- 2.11 Output
- 2.12 Overfitting
    - A model fits the data used to develop it so closely that prediction accuracy materially decreases when it is applied to different data (see [[Bias-Variance Tradeoff]]).
- 2.13 Parameter

## 3 Analysis of Issues and Recommended Practices
- 3.1 Model Meeting the Intended Purpose
    - 3.1.1 Designing, Developing, or Modifying the Model
    - 3.1.2 Selecting, Reviewing, or Evaluating the Model
    - 3.1.3 Using the Model
    - 3.1.4 Model Structure
        - The actuary assesses whether the structure is appropriate for the intended purpose, considering the material risks to reflect, the form of the model (projection, statistical or predictive), the level of detail, whether there is a material risk of overfitting, and options that could materially affect the output.
    - 3.1.5 Data
        - The actuary uses data appropriate for the model's intended purpose and refers to ASOP No. 23, Data Quality (see [[Data Quality]]).
    - 3.1.6 Assumptions Used As Input
- 3.2 Understanding the Model
- 3.3 Reliance on Data or Other Information Supplied by Others
- 3.4 Reliance on Models Developed by Others
- 3.5 Reliance on Experts
- 3.6 Evaluation and Mitigation of Model Risk
    - 3.6.1 Model Testing
        - May include reconciling input values to their source, checking formulas, logic and table references, sensitivity testing of key assumptions, and reconciling output to prior model runs.
    - 3.6.2 Model Output Validation
        - May include testing against historical actual results, applying the model to [[Holdout Sample|hold-out data]], statistical or analytical tests of the output, tests of variations on key assumptions, and comparison with alternative models.
    - 3.6.3 Review by Another Professional
    - 3.6.4 Reasonable Governance and Controls
    - 3.6.5 Mitigating Misuse and Misinterpretation
- 3.7 Documentation
    - Documentation, if prepared, should let another actuary qualified in the same practice area assess the reasonableness of the actuary's work.

## 4 Communications and Disclosures
- 4.1 Required Disclosures in an Actuarial Report
    - The report refers to ASOP Nos. 23 and 41 (see [[Actuarial Communication]]) and discloses the model's intended purpose, material inconsistencies among assumptions, unreasonable output from aggregating assumptions, material limitations and known weaknesses, and the extent of reliance on models developed by others and on experts.
- 4.2 Additional Disclosures in an Actuarial Report
- 4.3 Confidential Information

## Appendix 1 Background and Current Practices
- Informational, not part of the standard.
- A model is only an approximation of reality: even a prudently developed and carefully used model does not eliminate inherent uncertainty and variability.
- Examples of model governance and controls include limits on access to the model, reproducibility on rerun, a change management process, documentation and programming standards, secure back-up, staff cross-training, and periodic review of assumptions and methodology.

## Appendix 2 Comments on the Fourth Exposure Draft and Responses

## Related readings
- [[ASOP 23 - Data Quality (ASB - 2016)]] — cited in §§3.1.5, 3.3 and 4.1 for data used in, or supplied for, a model

## Sources
- [Actuarial Standard of Practice No. 56, Modeling, Doc. No. 195 (ASB, 2019)](https://www.actuarialstandardsboard.org/wp-content/uploads/2020/01/asop056_195-1.pdf) — the document: title page, table of contents, transmittal memorandum, Sections 1–4 and the appendixes; this is the copy the ASB's page and the content outline link, and it differs from the earlier file at `asop056_195.pdf` only in the wording of §3.1.6(a)(2)
- [ASOP No. 56, Modeling (Actuarial Standards Board)](https://www.actuarialstandardsboard.org/asops/modeling-3/) — the ASB's page for the standard, which links this PDF
- [CAS PCPA Content Outline v.8, updated 9.9.2026](https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf) — the citation (December 2019), the domain and the source type
