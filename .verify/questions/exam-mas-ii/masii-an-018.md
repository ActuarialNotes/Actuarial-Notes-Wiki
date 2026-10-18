---
target: questions/exam-mas-ii/masii-an-018.md
created: 2026-10-18
---

## [F-001] Asks for lift as a computed metric, which Salis says MAS-II will not test directly
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T14:03Z/g6m2
- date: 2026-10-18
- severity: minor
- status: open
- locus: stem, final sentence
- claim: 'Determine which model shows more lift, and the amount of that model's lift.'
- evidence: Salis §3.1 (PDF p.4, sha256:e952ace6…): lift is 'the vertical distance between the first and last quantiles' (GLM p.77), usually the ratio of actual target rates in the last and first quantiles, and 'The MAS-II exam will not directly test the calculation of lift as a metric, but understanding how this vertical distance can be calculated can be useful in comparing competing models.' The question defines the ratio in its stem and uses it to compare two models, so the arithmetic is right (1.50/0.55 = 2.727; 1.40/0.70 = 2.00); the 'amount' half asks for what Salis says is not tested directly.
- source_rank: 1
- proposed_action: Optionally reword the ask to the comparison alone (which model, judged by the actual-pure-premium ratio). Not auto-fixed; the item is correct as written.
- applied: false
- fingerprint: bfd437198e1f

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:03Z/g6m2
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: blind recomputation in Python before reading the key; every distractor's stated reasoning reproduced; explanation worked line by line; wiki_link targets exist (spaces as +) and sit on Exam MAS-II (CAS).md; topic/learning_objective match the exam page domain; format per question-writer formats.md; validate_content.py clean
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2020), §7.2.1 Simple Quantile Plots, printed p.77 (PDF 87): lift is the difference between actual pure premiums in the first and last quantiles; predicted pure premium rises by definition, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Salis, Measures of Predictive Accuracy, CAS Study Note for MAS-II (updated November 6, 2025), §3.1 Lift, PDF p.4: L_ratio = Y_Q / Y_1 on actual rates, sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010 — https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf
- note: Recomputed: A 1.40/0.70 = 2.00; B 1.50/0.55 = 2.727, option D. Predicted spreads 2.583 (A) and 2.50 (C); 1.50 (E). Open minor F-001 (Salis: lift calculation not directly tested).

## [C-002] F-001 left open; no rewording applied
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:08Z/4700
- date: 2026-10-18
- note: F-001's optional rewording (ask only which model shows more lift) would need the five options rewritten, since each pairs a model with an amount - authoring beyond the clean-up limits. Salis §3.1 says lift will not be tested 'directly' as a metric but that understanding the calculation helps compare models; the stem defines the ratio, so the item is correct as written. Left open for a writer. File unchanged; status stays verified.
