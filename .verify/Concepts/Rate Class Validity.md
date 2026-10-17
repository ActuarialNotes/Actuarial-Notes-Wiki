---
target: Concepts/Rate Class Validity.md
created: 2026-10-17
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- status_set: verified
- confidence: high
- checks_run: definition, formulas and every bullet checked against the routed reading pages; every worked example recomputed before comparison; [[links]] and $$ balance checked
- sources_checked: ASOP No. 12, Risk Classification (Actuarial Standards Board, Dec 2005, doc. 132), §2.5-2.9, §3.2-3.4, PDF pp.8-12, sha256:7d4f2631a589bac24cf34b1f622e95aa7bfa979aaca96de27c651099c0b12dc7 — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop012_132.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §5.5 PDF p.65, §6.4 PDF pp.83-84, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Holmes & Casotto, Penalized Regression and Lasso Credibility, CAS Monograph 13 (2025 revision), Ch.6 intro, §6.1-6.3.3, PDF pp.56-59, sha256:f6978accbd2bcd43284ec939dd90966430a3e36fc126aab4584241a13d7a28cd — https://www.casact.org/sites/default/files/2025-08/CAS_Monograph_13_2025_revision.pdf; Couret & Venter, Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors in Workers Compensation (ASTIN Bulletin 38(1), 2008), §2 Performance Testing, Tables A-C, PDF pp.7-11, sha256:ce50d8a0fbc395621d29dd153836b0303a269d94697bb1932b5f334b47ebba18 — https://www.casact.org/sites/default/files/2021-03/8_Couret_Venter.pdf
- note: ASOP 12 §3.2.2 (causality not required), §3.3.2(a)-(c), §3.3.3, §3.3.4 and §3.4/§3.4.2 (testing with a different set of classes, gender example) match the page. Goldburd §6.4 gives the one-large-loss stability example, Cook's distance, cross-validation and bootstrap refits; §5.5 the grouping of neighbouring levels balancing predictive power, parsimony and overfitting. Holmes & Casotto Ch.6 intro/§6.1-6.3.2: lasso gives no p-values, review moves from significance to credibility, relativity plot items, the two full-credibility-in-complement cases. Couret & Venter §2 / Table C: even-year estimates tested on odd-year holdout by quintiles and SSE. Examples recomputed: R_Q 2.60 and 1.134; SSE4 0.01973, SSE2 0.00054, SSE1 0.04408, R12 0.8643, R34 1.3333 - all agree.
