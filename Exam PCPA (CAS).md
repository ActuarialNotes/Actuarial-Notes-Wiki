---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:82e1521a2e56b380cd55ce2291caba69e64ba578439c8b35a6695866d7d793d9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Exam PCPA (CAS).md
---

<div class="exam-nav"
     data-current="PCPA|Property and Casualty Predictive Analytics">
</div>

# Exam PCPA

**Property and Casualty Predictive Analytics (PCPA)** is a two-part requirement for the [[Associate of the Casualty Actuarial Society (ACAS)|ACAS]]: a 2-hour computer-based exam of 40 questions, followed by a project in which the candidate builds a [[Generalized Linear Model]] on a data set provided by the CAS and reports on it in a brief technical report. The exam is offered continuously, year-round, and is the prerequisite for the project. Candidates typically sit it after Exams MAS-I, MAS-II and 5, so it assumes a foundational knowledge of [[Predictive Analytics|predictive analytics]].

## Learning Objectives

> [!example]- A. Dealing with Data {35%}
> Candidates should be able to [[Exploratory Data Analysis|evaluate the data set]] and manipulate it so it can be used in a [[Predictive Analytics|predictive analytics model]].
>
> 1. Gather and assess the relevance of information from [[Stakeholder Reporting|stakeholders]] in actuarial analysis.
>    - *Key concepts:* [[Data Quality]] · [[Predictive Analytics]]
> 2. Import, manipulate, and evaluate [[Tidy Data|data sets]] using generally available [[Statistical Software|programming languages]] and [[Statistical Software|software packages]] (e.g., [[Tidy Data|.csv file]]).
> 3. Evaluate the need for [[Variable Transformation|variable transformation]] and apply [[Variable Transformation|appropriate transformations]] to [[Tidy Data|data]].
> 4. Identify and appropriately manage [[Outlier|outliers]] and [[Missing Data|missing data]].
>
> **Readings:** ASOP 23 · ASOP 56 · Gelman and Unwin · Grolemund and Wickham · McKinney

> [!example]- B. Model Diagnostics and Selection {35%}
> Candidates should be able to create and refine a [[Generalized Linear Model|GLM]].
>
> 1. Create and run a [[Generalized Linear Model|GLM]].
> 2. Evaluate and improve a [[Generalized Linear Model|GLM]] (e.g., create and interpret [[Residual Plot|diagnostics]], conduct [[Cross-Validation|cross-validation]], incorporate [[Offset Variable|offsets]], mitigate [[Multicollinearity|multicollinearity]] issues, avoid [[Bias-Variance Tradeoff|underfitting and overfitting]]) for the [[Tidy Data|data]] provided and [[Business Strategy|business goals]].
>    - *Key concepts:* [[Holdout Sample]] · [[Link Function]] · [[Tweedie Distribution]] · [[AIC]] · [[BIC]] · [[Deviance]]
>
> **Readings:** De Jong and Heller · Fannin · Frees, Derrig and Meyers · GLM (Monograph) · Venables and Ripley

> [!example]- C. Model Interpretation and Presentation {30%}
> Candidates should be able to interpret the findings from a [[Predictive Analytics|predictive analytics model]] and present their findings to [[Actuarial Communication|technical and non-technical audiences]].
>
> 1. Create and interpret [[Summary Statistics|statistical/tabular]] and [[Data Visualization|graphical/visual representations of data]].
> 2. Communicate [[Actuarial Communication|project technical information]], including details on methodologies, [[Variable Selection|modeling decisions]], and [[Parameter Estimate Tables|interpretation of output]].
> 3. Communicate [[Actuarial Communication|project findings]] to [[Actuarial Communication|non-technical audiences]], including the implications on [[Business Strategy|business outcomes]] or decisions.
>    - *Key concepts:* [[Quantile Plot]] · [[Double Lift Chart]] · [[Gini Index]]
>
> **Readings:** Cairo · Few · Knaflic

## Source Material
> [!answer]- Source Material {13 Sources}
>
> - [[ASOP 23 - Data Quality (ASB - 2016)]]
>      - A1–A4
> - [[ASOP 56 - Modeling (ASB - 2019)]]
>      - A1–A4
> - [[How Charts Lie (Cairo - 2020)]]
>      - C1–C3
> - [[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)]]
>      - B1–B2 (Chapter 7)
> - [[Generalized Linear Models for Insurance Data (De Jong and Heller - 2008)]]
>      - B1–B2 (Chapters 5, 6, 8 and related code in the Appendix)
> - [[R for Actuaries and Data Scientists with Applications to Insurance (Fannin - 2020)]]
>      - B1–B2 (Chapters 6, 15, 18 and 19)
> - [[Show Me the Numbers (Few - 2012)]]
>      - C1–C3
> - [[Predictive Modeling Applications in Actuarial Science Volume 1 (Frees, Derrig and Meyers - 2014)]]
>      - B1–B2 (Chapter 6)
> - [[Infovis and Statistical Graphics (Gelman and Unwin - 2012)]]
>      - A1–A4
> - [[R for Data Science (Grolemund and Wickham - 2017)]]
>      - A1–A4
> - [[Storytelling with Data (Knaflic - 2015)]]
>      - C1–C3
> - [[Python for Data Analysis (McKinney - 2022)]]
>      - A1–A4
> - [[Modern Applied Statistics with S (Venables and Ripley - 2002)]]
>      - B1–B2 (pp. 172–176)
