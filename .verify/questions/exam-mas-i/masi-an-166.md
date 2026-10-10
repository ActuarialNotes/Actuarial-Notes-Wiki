---
target: questions/exam-mas-i/masi-an-166.md
created: 2026-10-10
---

## [F-001] Wrong-entry value misrounded
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- severity: nit
- status: open
- locus: Part a, Explanation, Common wrong entries, second bullet
- claim: '**16.57** — forgets the square root, using (k - 1)F as the multiplier.'
- evidence: (k - 1)F x SE = 5 x 2.621 x 1.2649 = 13.105 x 1.2649 = 16.5765, which rounds to 16.58 at the two decimals the part asks for (recomputed; with the unrounded SE sqrt(1.6) it is 16.5767). The formula in the stem (Scheffe multiplier sqrt((r-1)F), NIST §7.4.7.2) is right; only the quoted value is off by one in the last place.
- source_rank: 5
- proposed_action: Change 16.57 to 16.58.
- applied: true
- fingerprint: 4e85652241d6

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied in the working tree: the wrong entry now reads 16.58 (13.105 x 1.2649 = 16.5765). Key 4.58 and the other values unchanged.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind: SE 1.2649; (a) Scheffe sqrt(5 x 2.621) x 1.2649 = 4.579 -> 4.58; (b) Tukey 3.911 < 4.0 < Bonferroni 4.121 < Scheffe -> C; keys match; studentized-range q(0.95; 6, 24) = 4.3727 and ordinary-t FWER 0.338 ('about 34%') reproduced (rank 5); F-001 (16.57 -> 16.58) fixed this run; key present among options/answer form valid; tags and learning_objective checked
- sources_checked: NIST/SEMATECH e-Handbook of Statistical Methods, §7.4.7.2 Scheffe's method (all contrasts; C-hat +/- sqrt((r-1) F_{alpha; r-1, N-r}) s_C, s_C^2 = sigma-hat^2 sum c_i^2/n_i), sha256:25e822151f4f779425f69dea32f1f44450a2355e22e576bfc43dbbcd8db2e532 — https://www.itl.nist.gov/div898/handbook/prc/section4/prc472.htm; NIST/SEMATECH e-Handbook of Statistical Methods, §7.4.7.1 Tukey's method (all pairwise comparisons, exact 1 - alpha for equal n; limits +/- q/sqrt(2) sigma-hat sqrt(2/n)), sha256:8e7fc4947d95379aaae75b31fefc4b6f7dbf0c1604f3132ca27ae8238e4f77a9 — https://www.itl.nist.gov/div898/handbook/prc/section4/prc471.htm; NIST/SEMATECH e-Handbook of Statistical Methods, §7.4.7.3 Bonferroni's method (g statements chosen in advance; t_{1-alpha/(2g), N-r} s_C; at least 1 - alpha), sha256:891d83c90afee1c86a6f33623ffcc5825833a236cc12b89776a755f694ef72f9 — https://www.itl.nist.gov/div898/handbook/prc/section4/prc473.htm; NIST/SEMATECH e-Handbook of Statistical Methods, §7.4.7 How can we make multiple comparisons? (pairwise tests repeated over all pairs do not hold the overall significance level), sha256:eec606ca847e4f22c97e8c440d0b7033e0fd7362f3f5830a7ea48dee47cc8d32 — https://www.itl.nist.gov/div898/handbook/prc/section4/prc47.htm; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Original vault question (question-writer skill) - no publisher's key. Verified medium, the precedent for vault-written questions (Exam P p-901..p-964): independent blind recomputation (rank 5) agreeing with the key, every distractor and explanation step checked, and each method/fact confirmed against the cited open sources (MAS-I readings ISLR/Larsen where they cover it, otherwise rank-3 open references). wiki_link tags each tested by the question; learning_objective 'Extended Linear Models' is the exam page's Domain C callout title (as on the verified MAS-I paper questions) and the topic sits under Domain C on the page.
