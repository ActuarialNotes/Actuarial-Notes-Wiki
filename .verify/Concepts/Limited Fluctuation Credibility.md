---
target: Concepts/Limited Fluctuation Credibility.md
created: 2026-10-18
---

## [F-001] Aggregate-loss CV formula cancels E[N]
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- severity: critical
- status: open
- locus: aggregate-losses bullet
- claim: CV^2_S = CV^2_N + CV^2_X · E[N]/E[N] (i.e. CV^2_N + CV^2_X).
- evidence: LDA §9.2.2 gives, for S = X_1+…+X_N with N independent of iid X, mu_S = mu_N mu_X and sigma_S^2 = mu_N sigma_X^2 + mu_X^2 sigma_N^2, and eq. (9.5) n_S = (y_p/k)^2[sigma_N^2/mu_N + (sigma_X/mu_X)^2]. Dividing sigma_S^2 by mu_S^2 gives CV_S^2 = sigma_N^2/mu_N^2 + sigma_X^2/(mu_N mu_X^2) = CV_N^2 + CV_X^2/E[N]. The page's E[N]/E[N] cancels to 1, so with Poisson N (lambda = 100, CV_X = 2) it gives CV_S^2 = 0.01 + 4 = 4.01 instead of 0.01 + 0.04 = 0.05, an 80-fold error in any standard built on it.
- source_rank: 3
- proposed_action: Replace 'CV^2_X · E[N]/E[N]' with 'CV^2_X / E[N]'.
- applied: true
- fingerprint: 07bfa19365cb

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Restated to CV_S^2 = CV_N^2 + CV_X^2/E[N], which follows directly from LDA §9.2.2's mu_S and sigma_S^2; for Poisson N this reproduces eq. (9.5)'s (1 + CV_X^2) per expected claim.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: formula check of Z = min(1, sqrt(n/n_full)) and n_full against LDA §§9.2.1–9.2.4, 9.6.1; Poisson 1,082 standard recomputed ((1.645/0.05)^2 = 1,082.41); both examples recomputed (sqrt(400/1082) = 0.608; 0.70·0.85 + 0.30·0.75 = 0.820); links and embed resolve
- sources_checked: Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html; Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf; CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Checked against LDA Ch. 9 §§9.2.1–9.2.4 and 9.6.1 (classical credibility, Tse Ch. 6 counterpart). One critical formula error (aggregate CV) fixed and resolved this run. Confidence capped at medium (decision D7): the assigned reading, Tse Chs 6–9, is commercial and its free Cambridge preview carries only the front matter and Ch. 1 (its contents pages fix the section titles); the page was checked against Loss Data Analytics, an open text covering the same ground. Mahler & Dean (Foundations ch. 8) could not be found as a free CAS-hosted copy (casact.org's Foundations 4th-ed. page links no chapter PDF; the old soa.org C-21-01 link is 404).
