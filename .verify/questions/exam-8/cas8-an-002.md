---
target: questions/exam-8/cas8-an-002.md
created: 2026-10-17
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- status_set: verified
- confidence: high
- checks_run: key recomputed/derived independently from the stem before reading the answer; stem premises checked against the cited reading; every option's rationale checked; options distinct and key present; validate_content.py passed; wiki_link targets exist
- sources_checked: ASOP No. 12, Risk Classification (Actuarial Standards Board, Dec 2005, doc. 132), §3.3.2(b), PDF p.11, sha256:7d4f2631a589bac24cf34b1f622e95aa7bfa979aaca96de27c651099c0b12dc7 — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop012_132.pdf; Holmes & Casotto, Penalized Regression and Lasso Credibility, CAS Monograph 13 (2025 revision), §6.3.2, PDF pp.58-59, sha256:f6978accbd2bcd43284ec939dd90966430a3e36fc126aab4584241a13d7a28cd — https://www.casact.org/sites/default/files/2025-08/CAS_Monograph_13_2025_revision.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §6.2.1, PDF pp.74-75, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: Vault-written question. Independent evaluation: I true, II false, III true -> C; key C. I: ASOP 12 §3.3.2(b) (PDF p.11) verbatim in substance. II: a finer split always fits its own data better; validity needs out-of-sample evidence (Couret & Venter's odd-year holdout; Goldburd §6.2.1 deviance always falls with added parameters). III: Holmes & Casotto §6.3.2 (PDF p.58) scenario 1, sufficient exposure but experience too similar to the complement. Option E rationale correct (I-III all true or an unlisted set).
