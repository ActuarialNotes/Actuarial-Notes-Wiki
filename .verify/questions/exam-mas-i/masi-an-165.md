---
target: questions/exam-mas-i/masi-an-165.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind: SE = sqrt(1.8 x 0.4) = 0.8485; per-interval area 0.10/10 = 0.01 -> 2.845; half-width 2.414 -> 2.41 = key; wrong entries 1.46, 2.15, 1.77, 1.71 recomputed; key present among options/answer form valid; tags and learning_objective checked
- sources_checked: NIST/SEMATECH e-Handbook of Statistical Methods, §7.4.7.3 Bonferroni's method (g statements chosen in advance; t_{1-alpha/(2g), N-r} s_C; at least 1 - alpha), sha256:891d83c90afee1c86a6f33623ffcc5825833a236cc12b89776a755f694ef72f9 — https://www.itl.nist.gov/div898/handbook/prc/section4/prc473.htm; NIST/SEMATECH e-Handbook of Statistical Methods, §7.4.7 How can we make multiple comparisons? (pairwise tests repeated over all pairs do not hold the overall significance level), sha256:eec606ca847e4f22c97e8c440d0b7033e0fd7362f3f5830a7ea48dee47cc8d32 — https://www.itl.nist.gov/div898/handbook/prc/section4/prc47.htm; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Original vault question (question-writer skill) - no publisher's key. Verified medium, the precedent for vault-written questions (Exam P p-901..p-964): independent blind recomputation (rank 5) agreeing with the key, every distractor and explanation step checked, and each method/fact confirmed against the cited open sources (MAS-I readings ISLR/Larsen where they cover it, otherwise rank-3 open references). wiki_link tags each tested by the question; learning_objective 'Extended Linear Models' is the exam page's Domain C callout title (as on the verified MAS-I paper questions) and the topic sits under Domain C on the page.
