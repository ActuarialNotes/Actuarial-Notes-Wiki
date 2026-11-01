---
target: Concepts/Heteroscedasticity.md
created: 2026-10-31
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T19:12Z/e10e
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: first pass on the whole page: every Shapland formula (4.8)-(4.13) and the three options against §4.6; detection, groups and the Taylor & Ashe 9-group P-value 14.3% against §5.1-5.2; Venter assumption 3 and the variance-form → estimator mapping against pp.3-5, 16; both worked examples recomputed independently (sd 1.8265/0.5701/1.3944, h 0.7634/2.4460, q* 159.6 vs 180.6; phi 1.2188, phi_A 2.1797, phi_B 0.1688, h 0.748/2.687, sd-factors 0.782/2.789, SD 3.67 vs 9.87); regression section against ISLR §3.3.3 and Rodriguez §2.10; links resolve
- sources_checked: Shapland, Using the ODP Bootstrap Model: A Practitioner's Guide (CAS Monograph 4, 2016), §4.6 eqs (4.8)-(4.13) printed pp.25-27 (PDF 33-35); §5.1-5.2 incl. 9 hetero groups P-value 14.3% printed pp.32-35 (PDF 40-43), sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf; Venter, Testing the Assumptions of Age-to-Age Factors (PCAS 1998), assumption 3, Results (Mack), Extension, PDF pp.3-5; weighted least squares PDF p.16, sha256:58523222aa33f1b8c82455818e8c2da1b8f24aee7d83badf8c88d2f71a638dcb — https://www.casact.org/sites/default/files/database/proceed_proceed98_980807.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §3.3.3 item 3 Non-constant Variance of Error Terms, Fig. 3.11, pp.96-97 (PDF 106-107), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Rodriguez, Lecture Notes on GLMs, ch.2 §2.10.1-2.10.2 Transforming the Response / Box-Cox, pp.59-60, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf
- note: First pass on this page (no prior log). Shapland, Venter and ISLR say what the page says. 'Y^λ with 0<λ<1 is concave' is a mathematical gloss on ISLR's 'concave function such as log Y or √Y', consistent with Rodriguez's Box-Cox family (λ = 1/2 the square root). Checked by a different agent from the writer of the regression section.
