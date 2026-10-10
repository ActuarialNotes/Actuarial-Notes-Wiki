---
target: questions/exam-mas-i/masi-an-131.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind: median 4.2, Q1 2.5, Q3 7.2 (stated convention), IQR 4.7, upper fence 14.25, lower fence -4.55, outliers 1 (22.5), whisker 14.0 -> (a) 4.7 (b) 14.25 (c) 1 (d) B; keys match; wrong entries: hinges/type-7 quartiles 2.8/6.6 -> 3.8 and fence 12.3, range 21.3, median + 7.05 = 11.25, outer fence 21.30; key present among options/answer form valid; tags and learning_objective checked
- sources_checked: NIST/SEMATECH e-Handbook of Statistical Methods, §7.1.6 'What are outliers in the data?': inner fences Q1 - 1.5 IQ, Q3 + 1.5 IQ; outer fences at 3 IQ, sha256:0294f35d537ad06eedd8c983b017077aee7838a3790733cf9605722e4e95791c — https://www.itl.nist.gov/div898/handbook/prc/section1/prc16.htm; R documentation, grDevices::boxplot.stats, coef = 1.5: whiskers extend to the most extreme data point no more than coef times the box length from the box; hinges vs quartiles, sha256:202dc113fa952aae23b87aef26e3eb28b384ae53bfa717dc3b86ef46949b78c3 — https://stat.ethz.ch/R-manual/R-devel/library/grDevices/html/boxplot.stats.html; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Original vault question (question-writer skill) - no publisher's key. Verified medium, the precedent for vault-written questions (Exam P p-901..p-964): independent blind recomputation (rank 5) agreeing with the key, every distractor and explanation step checked, and each method/fact confirmed against the cited open sources (MAS-I readings ISLR/Larsen where they cover it, otherwise rank-3 open references). wiki_link tags each tested by the question; learning_objective 'Extended Linear Models' is the exam page's Domain C callout title (as on the verified MAS-I paper questions) and the topic sits under Domain C on the page.
