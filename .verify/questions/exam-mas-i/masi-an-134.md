---
target: questions/exam-mas-i/masi-an-134.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind: IQR 22, fences 1 and 89, so ages 0 and 99 are outliers; I true, II false, III true -> C = key; key present among options/answer form valid; tags and learning_objective checked
- sources_checked: NIST/SEMATECH e-Handbook of Statistical Methods, §7.1.6 'What are outliers in the data?': inner fences Q1 - 1.5 IQ, Q3 + 1.5 IQ; outer fences at 3 IQ, sha256:0294f35d537ad06eedd8c983b017077aee7838a3790733cf9605722e4e95791c — https://www.itl.nist.gov/div898/handbook/prc/section1/prc16.htm; NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.14 Histogram: shape of the distribution; relative histogram normalized as a density, sha256:8505d865ba5c787e3179e903ad98276d05386fab18449eb3b554d12b271b58d5 — https://www.itl.nist.gov/div898/handbook/eda/section3/histogra.htm; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Original vault question (question-writer skill) - no publisher's key. Verified medium, the precedent for vault-written questions (Exam P p-901..p-964): independent blind recomputation (rank 5) agreeing with the key, every distractor and explanation step checked, and each method/fact confirmed against the cited open sources (MAS-I readings ISLR/Larsen where they cover it, otherwise rank-3 open references). wiki_link tags each tested by the question; learning_objective 'Extended Linear Models' is the exam page's Domain C callout title (as on the verified MAS-I paper questions) and the topic sits under Domain C on the page.
