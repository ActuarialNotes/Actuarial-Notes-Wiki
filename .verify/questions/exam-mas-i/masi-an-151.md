---
target: questions/exam-mas-i/masi-an-151.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind: odds ratio e^-0.7 = 0.497 at every cut-point -> A = key; probabilities private 0.6225/0.2583/0.1192, commercial 0.4502/0.3356/0.2142 reproduced; B sign (latent form beta* = -beta, Rodriguez eq. 6.23), C, D (proportional odds), E (0.881 is cumulative; medium 0.258); key present among options/answer form valid; tags and learning_objective checked
- sources_checked: Rodriguez, Lecture Notes on Generalized Linear Models (Princeton), Ch.6 Multinomial Response Models, §6.5.2-6.5.3, PDF pp.17-19 (cumulative link model with one beta for all cut-points; latent-variable form with beta* = -beta; proportional odds model logit(gamma_ij) = theta_j + x'beta), sha256:f559d07ae73bdf381de5c19a9f0621419c635e5c6495c0135af940ae36807cbb — https://grodri.github.io/glms/notes/c6.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Original vault question (question-writer skill) - no publisher's key. Verified medium, the precedent for vault-written questions (Exam P p-901..p-964): independent blind recomputation (rank 5) agreeing with the key, every distractor and explanation step checked, and each method/fact confirmed against the cited open sources (MAS-I readings ISLR/Larsen where they cover it, otherwise rank-3 open references). wiki_link tags each tested by the question; learning_objective 'Extended Linear Models' is the exam page's Domain C callout title (as on the verified MAS-I paper questions) and the topic sits under Domain C on the page.
