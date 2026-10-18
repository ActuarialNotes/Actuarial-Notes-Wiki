---
target: questions/exam-mas-ii/masii-an-015.md
created: 2026-10-18
---

## [F-001] Elastic net rests on Goldburd §10.5, which no MAS-II task assigns
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T14:03Z/g6m2
- date: 2026-10-18
- severity: minor
- status: open
- locus: whole question (elastic net GLM)
- claim: A MAS-II question on elastic net GLMs (intercept unpenalized, shrinkage, correlated predictors), tagged topic 'Extended Linear Model' under 'Statistical Learning'.
- evidence: MAS-II Content Outline 2026 pp.3-4 (https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf, sha256:babf0548…): Domain C has 11 tasks, none on regularization; GLM reading is 'Chapter 7' only; James et al. Ch.6 is not assigned. Every statement in the question matches Goldburd §10.5 (printed pp.101-104, PDF 111-114, sha256:89b203ea…): Equation 27 and the 'halved sum of squared coefficients'; footnote 27 'b does not include b0, the intercept term, which does not contribute to the penalty'; 'raising l ... forces coefficients to shrink closer to zero'; 'some less-important predictors will be assigned coefficients of zero'; 'a GLM is just a special case of the elastic net (where l = 0)'; 'elastic nets perform much better than GLMs in the face of highly correlated predictors ... one or two variables of a group of correlated predictors will typically be selected'. Ridge and lasso are MAS-I material (MAS-I Content Outline 2026 p.6 assigns ISLR Ch.6, sha256:24589236…), but the elastic net GLM is in neither exam's readings.
- source_rank: 1
- proposed_action: Scope decision with Exam MAS-II (CAS).md F-002 (objective C13 is not on the CAS outline): keep as MAS-I assumed knowledge, mark off_syllabus, or retarget. Not auto-fixed.
- applied: false
- fingerprint: da0c81c08621

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:03Z/g6m2
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: blind recomputation in Python before reading the key; every distractor's stated reasoning reproduced; explanation worked line by line; wiki_link targets exist (spaces as +) and sit on Exam MAS-II (CAS).md; topic/learning_objective match the exam page domain; format per question-writer formats.md; validate_content.py clean
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2020), §10.5 Elastic Net GLMs, printed pp.101-104 (PDF 111-114), Eq.27 and footnote 27, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; CAS, Exam MAS-II Content Outline 2026 (MASII_CO_S_2026 v06 2026_1_13), pp.3-4 Domain C tasks and readings, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: I true, II false (footnote 27), III false (p.104): key A matches Goldburd on every statement. Open minor F-001: the topic is not in the MAS-II readings.

## [C-002] Elastic net is Exam 8 material; F-001 left open
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:08Z/4700
- date: 2026-10-18
- note: New evidence on F-001: the Exam 8 Content Outline Fall 2026 p.5 (read today, sha256:306e7a7b...) assigns Goldburd et al., CAS Monograph #5, 2nd ed. 2025 'Including errata' with no chapter limit (tasks A1, A3-A5, A9), so the elastic net GLM of §10.5 is on a current exam - off_syllabus would be wrong. Also, the MAS-II page's task 'Apply regularization ... extended linear model' was removed this run (Exam MAS-II (CAS).md F-002), so Concepts/Extended+Linear+Model and Regularization are no longer MAS-II syllabus concepts. My read: retire it from the MAS-II bank or rewrite it for Exam 8 (a writer's job; a bank move needs a new id/log). File unchanged; status stays verified (minor finding only).
