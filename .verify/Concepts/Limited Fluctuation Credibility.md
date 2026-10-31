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

## [F-002] Arbitrary k presented as one of Werner's listed disadvantages
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T17:29Z/d9a2
- date: 2026-10-31
- severity: minor
- status: open
- locus: Disadvantages bullet, last sentence
- claim: Disadvantages … And the standard itself rests on choices: full credibility is defined by a probability p that the observed experience stays within a range k of its expected value, and Werner calls that range an arbitrary amount.
- evidence: W&M Ch.12 p.220 (PDF p.232) lists exactly two disadvantages: simplifying assumptions that may not hold (e.g. no variation in size of loss) and ignoring the quality of the complement, so judgment is required. 'Some arbitrary amount (k)' is on p.217 (PDF p.229), in the definition of full credibility, not in the disadvantages. Loss Data Analytics §9.2.1 says k and p must be selected using experience and judgment. The fact is sourced; filing it under a W&M-attributed Disadvantages bullet is not.
- source_rank: 2
- proposed_action: Move the k/p sentence out of the Disadvantages bullet into its own bullet, dropping the 'rests on choices' lead-in.
- applied: true
- fingerprint: 185ab1d3ce07

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T17:29Z/d9a2
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Applied: the sentence now stands as its own bullet ('Full credibility is defined by a probability p ... Werner calls that range an arbitrary amount.'), worded as before; the Disadvantages bullet now carries only Werner's two.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T17:29Z/d9a2
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: new bullets diffed against W&M Ch.12: three simplifying assumptions (p.218), advantages and disadvantages (p.220), 'some arbitrary amount (k)' (p.217) - F-002 opened and applied. Older content re-checked: Z = min(1, sqrt(n/n_full)), square root rule, 1,082 at p = 90%, k = 5% (W&M pp.218-219; (1.645/0.05)^2 = 1,082.41), exposure standard = claims / frequency (W&M p.219, LDA §9.2.1), aggregate standard (LDA §9.2.2: (mu_N mu_X)^2 = (y_p/k)^2 (mu_N sigma_X^2 + mu_X^2 sigma_N^2), consistent with CV_S^2 = CV_N^2 + CV_X^2/E[N]). Examples recomputed: sqrt(400/1,082) = 0.608; 0.70(0.85) + 0.30(0.75) = 0.820.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 12 pp.217-220 (PDF pp.229-232), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, §§9.2.1–9.2.2, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html
- note: Shared with MAS-I/MAS-II/Exam 8: nothing they rely on (formulas, standards, examples) was changed.
