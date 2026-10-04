---
target: Concepts/Outlier.md
created: 2026-10-04
---

## [F-001] Influence conflated with leverage; Cook's distance attributed to leverage
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: bullet 2 ('In a model ...')
- claim: A point is influential when removing it would change the fitted coefficients materially '(high leverage, measured by Cook's distance)'.
- evidence: PSU STAT 501 Lesson 11 (sha256:6229ca1803f9d152028893131b323ac3ebdff7b49733518cc14a77a87200dbb9): §11.1 'Outliers and high-leverage data points have the potential to be influential, but we generally have to investigate further' - Example 11.3 is a high-leverage point that is not influential; §11.2 'The leverage merely quantifies the potential ... depends only on the predictor values. Whether the data point is influential or not also depends on the observed value of the response'; leverage is h_ii, the hat-matrix diagonal; §11.5 Cook's D_i = e_i²/(p MSE) x h_ii/(1 - h_ii)² combines residual and leverage and measures influence. ISLR 2nd ed. §3.3.3 printed pp.97-99 (PDF pp.107-109) likewise separates outliers (unusual y) from high-leverage points (unusual x, leverage statistic h_i). The parenthetical equates influence with high leverage and names Cook's distance as the leverage measure.
- source_rank: 2
- proposed_action: Remove the parenthetical, or say that influence depends on both leverage (h_ii) and residual size and is measured by Cook's distance (wording for a human).
- applied: false
- fingerprint: 5ae418de97b9

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: both examples recomputed before comparison (IQR = 5,600, fences -7,200 and 15,200, only $95,000 flagged; capped total 630 vs 1,030, 400 removed) - agree; definition, Q1/Q3 ± 1.5 IQR fences and box plot, model outliers via standardized residuals, influence, capping with an excess load, PCPA rubric ('describes any anomalous characteristics of the data (e.g., outliers, missing data) and how they were addressed', A-4) checked; links resolve; PCPA usage consistent
- sources_checked: NIST/SEMATECH e-Handbook of Statistical Methods, §7.1.6 'What are outliers in the data?', sha256:1f1c9855ffcd8cd40165c97844e410a56edb032b8100616794732a32dfb094ee — https://www.itl.nist.gov/div898/handbook/prc/section1/prc16.htm; NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.7 'Box Plot' (box plots with fences), sha256:4cb2b0dd09d0803cb0613c9cf7dc939e80491badfc0f39b1f4fdb0468ff29730 — https://www.itl.nist.gov/div898/handbook/eda/section3/boxplot.htm; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.3.3 items 4-5 'Outliers' and 'High Leverage Points': recording errors, studentized residuals beyond ±3, care before removing, leverage statistic, printed pp.97-99 (PDF pp.107-109), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Penn State STAT 501 Regression Methods (online course notes), Lesson 11 §11.1 outlier vs high leverage vs influential; §11.2 leverage; §11.3-11.4 studentized and deleted residuals (fit pulled toward an influential point); §11.5 Cook's distance, sha256:6229ca1803f9d152028893131b323ac3ebdff7b49733518cc14a77a87200dbb9 — https://online.stat.psu.edu/stat501/Lesson11.html; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.6 'Losses and LAE' — extraordinary (shock) losses, capping and the excess loss provision, printed pp.95-97 (PDF pp.107-109), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; CAS PCPA Exam & Project Content Outline v.8 (effective Sept 2026, updated 9.9.2026), Domain A task 4 p.4 and 'Performance Evaluation Criteria' p.6, sha256:e22ce369f08e1feec88b1ed8a9273c67fd585b1c62193ea3105fe1fe8077189f — https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf
- note: Open: F-001 major (influence/leverage/Cook's distance conflated). Fence rule, capping and the PCPA rubric statement are confirmed.
