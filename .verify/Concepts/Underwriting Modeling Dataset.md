---
target: Concepts/Underwriting Modeling Dataset.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: one record per risk and period; Oct 1 = 25%; two $500 vs $900+$100; offset/weight equivalence; target choices incl. loss ratio for deficiencies and large-loss probability for underwriting restrictions; BOP peril split; external data -> hundreds or thousands of predictors; Colorado ECDIS list; examples recomputed (1.75 car-years, 1.143, 5,714; ln 800 = 6.685, ln 200 = 5.298); links resolve
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §2.1/2.8 PDF p.35; §2.6 PDF pp.28-29; §4.1-4.2 PDF pp.45-48; §5.1-5.1.3 PDF pp.53-55; §5.3 PDF p.57, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Colorado SB21-169 as signed (C.R.S. 10-3-1104.9), (1), (3)(b), (6), (7)(a), (8)(b), PDF pp.2-8, sha256:7fda1f5b30f27b3908e2f2f35e008babcf71235bbfcb905fb7d4627174a5942b — https://leg.colorado.gov/sites/default/files/2021a_169_signed.pdf; 15 U.S.C. §1681b (Cornell LII), (a)(3)(C), sha256:6a76f86911643b4584aa96bbce68bbfcf097b5295d6c90e236c8256d16a02c1f — https://www.law.cornell.edu/uscode/text/15/1681b
