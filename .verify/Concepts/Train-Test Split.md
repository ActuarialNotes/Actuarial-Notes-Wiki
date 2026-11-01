---
target: Concepts/Train-Test Split.md
created: 2026-10-31
---

## [F-001] ATPA report content not stated by the ATPA learning objectives
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T19:00Z/b6f9
- date: 2026-10-31
- severity: minor
- status: open
- locus: How it appears on the exam, ATPA bullet
- claim: ATPA ... in the take-home assessment, whose report describes how the candidate's own data were split and used.
- evidence: The ATPA learning objectives (Jan 2022, p.3) list under (g) 'Recognize and mitigate the effect of ... Repeated use of train/test/validate sets', and describe the assessment as a 'home assessment requiring analysis of a data set in the context of a business problem and submission of a report'. They say nothing about the report describing the data split. Restated to the document's words.
- source_rank: 1
- proposed_action: Restate the clause to the learning objectives' description of the assessment.
- applied: true
- fingerprint: e7dc82c1dd53

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T19:00Z/b6f9
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Restated in this run to 'which requires analysis of a data set in the context of a business problem and submission of a report'.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T19:00Z/b6f9
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Read every link (all resolve). The three sets and their jobs against Goldburd §4.3.2 and Google MLCC; reuse of a held-out set against Goldburd §4.3.3, Google MLCC ('wear out') and scikit-learn §3.1; the downward bias of the minimum (third block) is E[min] <= min E, true when each estimate is unbiased (rank 5) and consistent with those sources; splitting by unit against scikit-learn GroupKFold and Goldburd's storm example; stratifying against StratifiedKFold; out-of-time against Goldburd §4.3.1; preprocessing leakage against scikit-learn §12.2; refit after selection against ISLR §6.2.3. SRM and ATPA bullets against their syllabi (ATPA restated, F-001); PA bullet consistent with the PA syllabus (validate trees, written responses). Examples recomputed (rank 5): expected maximum of 10 and 100 standard normals computed numerically as 1.5388 and 2.5076, so 381.5 and 369.9; 24,000 / 8,000 / 8,000 policies.
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §4.3-4.3.3 printed pp.38-41 (training set, test/holdout set; train/validation/test split; out-of-time split by year; common-event leakage across a random split; a test set used too often becomes a training set), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer, 2021; CAS-hosted copy), §5.1.1 printed pp.198-200 (validation set approach; variable; overestimates test error); §6.2.3 printed p.250 (refit on all observations after tuning), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Google Machine Learning Crash Course, Dividing the original dataset, 'Training, validation, and test sets' (three subsets; validation and test sets 'wear out' with repeated use), sha256:82e44998b3e67d1a6e2332261f17d2d63b58d0d34b9a346858983692e90e835a — https://developers.google.com/machine-learning/crash-course/overfitting/dividing-datasets; scikit-learn User Guide, 3.1 Cross-validation, §3.1 (test set leaks when hyperparameters are tuned on it; StratifiedKFold; GroupKFold keeps a group out of both sides; TimeSeriesSplit), sha256:78d7587fa92ba3b3e480c9d841b50fedc14ac29d571ccb319d4068235154f0e2 — https://scikit-learn.org/stable/modules/cross_validation.html; scikit-learn User Guide, 12. Common pitfalls, §12.2 Data leakage (split before any preprocessing; never fit on test data), sha256:21fac11c181ab35624dcf8673f0475d403d4f6ecf0f9bead01a573d7642b515c — https://scikit-learn.org/stable/common_pitfalls.html; SOA, Exam SRM syllabus, January 2027, outcomes 1d and 4a, pp.2,4, sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf; SOA, ATPA learning objectives (Jan 2022), outcome (g), p.3; assessment description, sha256:16d5e74841e90fdb61402248cb585dc8d7a3ceedbf678341478145a9e2fb4410 — https://www.soa.org/globalassets/assets/files/edu/2022/2022-01-atpa-learning-objectives.pdf
