---
target: questions/exam-mas-i/masi-an-135.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind: areas 0.34, 0.20, 0.20, 0.16, 0.10 sum to 1; (0.10 x 2 + 0.04 x 4) x 400 = 144 = key; wrong entries 56, 184, 80 recomputed; key present among options/answer form valid; tags and learning_objective checked
- sources_checked: R documentation, graphics::hist, freq = FALSE plots probability densities 'so that the histogram has a total area of one', sha256:77630f10cde01668526e0e8ed07b58a325b5bf0a4e235713c7420789c3d92397 — https://stat.ethz.ch/R-manual/R-devel/library/graphics/html/hist.html; NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.14 Histogram: shape of the distribution; relative histogram normalized as a density, sha256:8505d865ba5c787e3179e903ad98276d05386fab18449eb3b554d12b271b58d5 — https://www.itl.nist.gov/div898/handbook/eda/section3/histogra.htm; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Original vault question (question-writer skill) - no publisher's key. Verified medium, the precedent for vault-written questions (Exam P p-901..p-964): independent blind recomputation (rank 5) agreeing with the key, every distractor and explanation step checked, and each method/fact confirmed against the cited open sources (MAS-I readings ISLR/Larsen where they cover it, otherwise rank-3 open references). wiki_link tags each tested by the question; learning_objective 'Extended Linear Models' is the exam page's Domain C callout title (as on the verified MAS-I paper questions) and the topic sits under Domain C on the page.
