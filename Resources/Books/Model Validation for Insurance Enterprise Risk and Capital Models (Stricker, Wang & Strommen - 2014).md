---
Title: "Model Validation for Insurance Enterprise Risk and Capital Models"
Authors: "Markus Stricker, Shaun Wang and Stephen J. Strommen"
Publisher: "CAS, CIA, SOA Joint Risk Management Section"
Year: "2014"
date: "2014"
Type: "Report"
Available from: "[soa.org](https://www.soa.org/globalassets/assets/Files/Research/Projects/research-2014-model-valid-ins.pdf)"
---
![[Model Validation for Insurance Enterprise Risk and Capital Models (Stricker, Wang & Strommen - 2014) - Cover.svg]]

A research report, sponsored by the CAS, CIA and SOA Joint Risk Management Section, on the risk that the use of internal risk and capital models could mislead management into making poor decisions. It identifies five elements of model risk, outlines a model validation process with specific steps for each, discusses validation in a dynamic environment, and closes with case studies and a comparison with other frameworks. Prepared in April 2014.

> [!info] On the syllabus
> - [[Exam CP-312 (SOA)|Exam CP-312]] — Outcomes 3a; excluding the Appendices.

## Abstract/Executive Summary
- Internal risk models are widely used to measure risk, calculate overall capital requirements and allocate capital; the intent of [[Model Validation|model validation]] is to limit the risk that use of a model could mislead management into making poor decisions, which is [[Model Risk|model risk]].
- The first part identifies five distinct elements of model risk and outlines a validation process with specific steps to address each; the second part discusses validation in a dynamic environment, with a focus on the risk management control cycle.
- Validation is one part of the larger process of risk management; it determines whether a model is working correctly and providing reliable information, but not whether a model should be built and relied upon in the first place.

## Introduction
- Definition of Model Risk
    - Model risk is broken into five constituent elements: conceptual risk, implementation risk, input risk, output risk and reporting risk.
    - Reporting risk is the risk that the representation of the output for business users is incomplete or misleading, and is related to the use test under Solvency II.
- Survey of Validation Approaches Used Elsewhere
    - Validation in engineering products, software development, food and drugs, environmental models and banking is compared with insurance risk models.

## Process Guide
- The validation process follows the major subcategories of model risk, and dependencies are found between the subcategories, so if the validation of one fails there is no need to validate those that depend on it; an aggregation of submodels is itself validated as a submodel.
- Conceptual Risk
    - Purpose of the Model
        - Conceptual risk cannot be evaluated without knowing the purpose of the model, including how users will apply its outputs in decision making.
    - Concepts and Their Limitations
        - The two conceptual challenges are which risks need to be modeled and which modeling methods should be applied to model them; the first is answered first and independently of the method.
- Implementation Risk
    - The validation checks the model development process: versioning, accountability for code changes, automated tests, who specified the test cases, test coverage and content, negative tests, integration tests, user acceptance testing and back-testing.
- Input Risk
    - Internal and external data must be demonstrably appropriate, accurate and complete; input data is segmented into raw data and calibrated data.
    - Validation checks include explanation of changes in parameters from the previous reporting cycle and benchmarking of major input parameters.
- Output Risk
    - Output risk is assessed after implementation and input risks are deemed acceptable; the checks cover the reproducibility of outputs, sensitivities of the output key figures to input parameters, benchmarking against other models, and analysis of change.
- Reporting Risk
    - The final step in a validation: whether the way key figures are reported, in manner and order of presentation, is not misleading.

## Risk Management Control Cycle
- The phases Assess, Evaluate, Manage and Measure are mapped to the process of model development, validation and use; model development and validation both fall within the evaluation phase.
- Presentation and Communication
    - The deliverable of the validation process is the validation report; the report classifies the depth of the validation in three categories and the result of the validation as inadequate, requiring change or improvement, or accepted.
- Governance
    - Internal audit is expected to verify that the model validation policy is implemented; independence within the model validation process is essential.
- A Case Study of AIG's Model of Credit Default Swaps
- A Case of Failed Model Governance: JPMorgan Chase and the London Whale

## A Case Study in Model Risk: Universal Life with Secondary Guarantees (ULSG)
- Model Risk in the Regulatory Framework
- Model Risk in Pricing
    - A Limited Model for Future Mortality Rates
    - Conflicting Models for Future Interest Rates

## References

## Appendix 1: Some Approaches to Graphical Reporting of Risk

## Appendix 2: Comparison with Other Frameworks
- North American CRO Council
- Solvency II Criteria for Regulatory Approval of Internal Models
- Guidance on Model Risk Management from the Office of the Comptroller of the Currency

## Sources
- [Model Validation for Insurance Enterprise Risk and Capital Models (CAS, CIA, SOA, April 2014)](https://www.soa.org/globalassets/assets/Files/Research/Projects/research-2014-model-valid-ins.pdf) — the document: title page, abstract, contents, section headings and the points under them (47 pages, read in full text)
- [SOA CP-312 syllabus, Nov 2026/Mar 2027](https://www.soa.org/globalassets/assets/files/edu/2026/cp-312/2026-2027-cp-312-syllabus.pdf) — the citation and the assigned scope (excluding Appendices; Outcomes 3a)
