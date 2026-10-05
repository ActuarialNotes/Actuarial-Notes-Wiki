---
target: Concepts/Log-Linear Model.md
created: 2026-10-05
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: independence and saturated models, fitted counts y_i. y_.j/n, sampling-scheme equivalence, deviance and Pearson X2 with (I-1)(J-1) df, three-way hierarchy (AB+C = block/joint independence), logit equivalence checked against Rodriguez ch.5/6.2.5; D&B ch.9 section numbers against contents and outline; both examples recomputed in python before reading answers (mu 15/85/75/425, D=6.864, X2=7.624, 1 df crit 3.841; eta=ln425=6.052, alpha=-1.609, beta=-1.735, saturated interaction ln(2.077)=0.731) - all agree, including the four deviance terms; 6 links resolve; no exam page links this page
- sources_checked: Rodriguez, GLM lecture notes (Princeton), ch.5 Log-Linear Models for Contingency Tables, sha256:b98785861711e5e1355ef6f0f2d60e0f655b512c68dc73f295953527563444d2 — https://grodri.github.io/glms/notes/c5.pdf, sec.5.1 two-dimensional tables (independence as product of margins, fitted counts from row/column totals, deviance chi-square on (I-1)(J-1) d.f., Pearson's chi-squared as the traditional test, Poisson additive model equivalent to multinomial/product-binomial schemes) (PDF pp.1-8); secs.5.2.3-5.2.4 complete and block independence (PDF pp.12-13); Rodriguez, GLM lecture notes (Princeton), ch.6 Multinomial Response Models, sha256:f559d07ae73bdf381de5c19a9f0621419c635e5c6495c0135af940ae36807cbb — https://grodri.github.io/glms/notes/c6.pdf, sec.6.2.5 The Equivalent Log-Linear Model (parameter per group reproduces denominators, main effect per response category, main effects become interactions, logit parameters as differences) (PDF pp.6-7); Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018; MAS-I reading) — publisher eBook preview, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf, printed contents Ch.9 (9.3 contingency tables, 9.4 probability models: Poisson, multinomial, product multinomial; 9.5 log-linear models; 9.6 inference; 9.7 numerical examples) (PDF pp.11-12); CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), readings table (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf: Dobson & Barnett Chapters 1-9 excluding 6.3.3, 6.7, 6.8, 7.9 (Ch.9 wholly assigned)
- note: Clean pass at medium: formulas confirmed by Rodriguez (rank 3); Dobson & Barnett ch.9 (rank 2) checked only at contents level.
