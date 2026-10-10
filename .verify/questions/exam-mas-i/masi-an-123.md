---
target: questions/exam-mas-i/masi-an-123.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind: p3 = 3/20 = 0.15, Phi^-1(0.15) = -1.0364 -> -1.04 = key; wrong entries: (i - 0.5)/n -> -1.12, i/n -> -1.00, third largest +1.04; plotting positions per NIST §8.2.2.1; key present among options/answer form valid; tags and learning_objective checked
- sources_checked: NIST/SEMATECH e-Handbook of Statistical Methods, §8.2.2.1 Probability plotting (plotting positions (i - 0.5)/n or i/(n+1)), sha256:11a585711628fade71ccff818ff899ca10f9053156cc1a0723da6298ee760f86 — https://www.itl.nist.gov/div898/handbook/apr/section2/apr221.htm; NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.21 Normal Probability Plot (ordered response values vs normal order statistic medians), sha256:245e8b264fe656e711181300d3ce443d6c3b4a67a517d1a864bab079327da2de — https://www.itl.nist.gov/div898/handbook/eda/section3/normprpl.htm; Larsen, Generalized Linear Models, CAS Study Note (rev. 6/29/2016; MAS-I reading), 'QQ and Box Plots to test distribution assumptions' PDF pp.1-2, sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Original vault question (question-writer skill) - no publisher's key. Verified medium, the precedent for vault-written questions (Exam P p-901..p-964): independent blind recomputation (rank 5) agreeing with the key, every distractor and explanation step checked, and each method/fact confirmed against the cited open sources (MAS-I readings ISLR/Larsen where they cover it, otherwise rank-3 open references). wiki_link tags each tested by the question; learning_objective 'Extended Linear Models' is the exam page's Domain C callout title (as on the verified MAS-I paper questions) and the topic sits under Domain C on the page.
