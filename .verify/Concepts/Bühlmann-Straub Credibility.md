---
target: Concepts/Bühlmann-Straub Credibility.md
created: 2026-10-18
---

## [F-001] v not stated per unit of exposure
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- severity: major
- status: open
- locus: Variance components line
- claim: Variance components have the 'same definitions as Bühlmann': v = E[sigma^2(theta)].
- evidence: LDA §9.4: in Bühlmann-Straub sigma^2(theta) is the variance of one exposure, Var(X_j|theta) = sigma^2(theta)/m_j, so E(Var(X̄|theta)) = EPV/m and Z = m/(m+K) (eq. 9.10). Taking 'same definitions as Bühlmann' literally (v = E[Var(X_j|theta)] of the period's loss rate) gives a k that depends on the period's exposure and is not the K of eq. (9.10).
- source_rank: 3
- proposed_action: State the per-exposure condition Var(X_i|theta) = sigma^2(theta)/m_i beside the definitions.
- applied: true
- fingerprint: 296a33bd8829

## [F-002] Garbled clause in example stem
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- severity: nit
- status: open
- locus: example stem
- claim: Given k = 2,500/m scaling such that k = 250 (i.e., v/a = 250).
- evidence: The '2,500/m scaling' clause is meaningless (k = v/a does not depend on m in LDA eq. 9.10) and is not used in the solution, which uses k = 250 only.
- source_rank: 3
- proposed_action: Reduce to 'Given k = v/a = 250'.
- applied: true
- fingerprint: 04d1460758d8

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Restated the heading to 'as in Bühlmann Credibility, but per unit of exposure: Var(X_i|theta) = sigma^2(theta)/m_i', per LDA §9.4.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Clause deleted; stem now reads 'Given k = v/a = 250'.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: Z = m/(m+k), weighted mean X̄ = sum m_i X_i / m, m = sum m_i, reduction to Bühlmann when all m_i = 1, empirical-Bayes estimation of v and a, all against LDA §9.4 and §9.6.2; example recomputed (m = 450, X̄ = 33.5/450 = 0.07444, Z = 450/700 = 0.6429, estimate 0.07286)
- sources_checked: Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html; Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf; CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Checked against LDA Ch. 9 §§9.4, 9.6.2 (Tse §7.4 counterpart). One major (missing per-exposure condition) and one nit fixed and resolved. Confidence capped at medium (decision D7): the assigned reading, Tse Chs 6–9, is commercial and its free Cambridge preview carries only the front matter and Ch. 1 (its contents pages fix the section titles); the page was checked against Loss Data Analytics, an open text covering the same ground. Mahler & Dean (Foundations ch. 8) could not be found as a free CAS-hosted copy (casact.org's Foundations 4th-ed. page links no chapter PDF; the old soa.org C-21-01 link is 404).
