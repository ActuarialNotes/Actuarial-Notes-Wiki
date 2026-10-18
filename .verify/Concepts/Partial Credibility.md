---
target: Concepts/Partial Credibility.md
created: 2026-10-18
---

## [F-001] Square-root rationale misstates the data needed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- severity: minor
- status: open
- locus: second bullet
- claim: The standard deviation of the mean falls with sqrt(n), so halving the variance gap takes four times the data.
- evidence: Var(X̄) = Var(X)/n (LDA §9.2.4), so halving a variance takes twice the data; four times the data halves the standard deviation (and doubles Z = sqrt(n/n_0)). 'Variance gap' has no defined meaning in the source. LDA §9.2.4 supports only the first clause: Z = sqrt(n/n_0) gives Var(Z X̄) = Var(X)/n_0.
- source_rank: 3
- proposed_action: Delete the clause after 'falls with sqrt(n)'.
- applied: true
- fingerprint: ba0ea86f7843

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Deleted the clause; the bullet now ends at what LDA §9.2.4 supports.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: square-root rule and its variance-matching rationale against LDA §9.2.4 (Var(mu_hat) = Var(X_i)/n_0, complement variance assumed negligible); units statement against LDA §9.2.1/9.2.4; example recomputed (sqrt(300/1082) = 0.5266; 380 + 0.5266·40 = 401.1)
- sources_checked: Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html; Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf; CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Checked against LDA Ch. 9 §9.2.4 (Tse §6.3 counterpart). One minor fixed and resolved. Confidence capped at medium (decision D7): the assigned reading, Tse Chs 6–9, is commercial and its free Cambridge preview carries only the front matter and Ch. 1 (its contents pages fix the section titles); the page was checked against Loss Data Analytics, an open text covering the same ground. Mahler & Dean (Foundations ch. 8) could not be found as a free CAS-hosted copy (casact.org's Foundations 4th-ed. page links no chapter PDF; the old soa.org C-21-01 link is 404).
