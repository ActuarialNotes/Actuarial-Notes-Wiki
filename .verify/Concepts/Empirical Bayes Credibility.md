---
target: Concepts/Empirical Bayes Credibility.md
created: 2026-10-18
---

## [F-001] Negative VHM 'set to 0' convention not in the open source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- severity: minor
- status: open
- locus: fourth bullet
- claim: â can come out negative; it is then set to 0, giving Z = 0 and full weight to the overall mean.
- evidence: LDA §9.6.2 (after eq. 9.12, and Example 9.6.2, VHM-hat = −1/2) says only that a negative VHM-hat means 'we cannot use this method to determine the values needed for Bühlmann credibility'; the SOA's Credibility Methods Applied to Life, Health, and Pensions (2019, p.25) calls a negative value 'nonsensical'. Neither states the set-to-zero convention. The assigned reading (Tse §9.2) could not be read.
- source_rank: 3
- proposed_action: Check Tse §9.2 for the convention; cite it, or restate the bullet to LDA §9.6.2. Not auto-fixed: the convention is widely used (Z = 0) and the sources do not conflict outright, so this is a sourcing gap, not a known error.
- applied: false
- fingerprint: 1f6ecffb15d9

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: nonparametric EPV-hat (eq. 9.11) and VHM-hat with the EPV-hat/n correction (eq. 9.12) and their unbiasedness against LDA §9.6.2; semiparametric Poisson EPV-hat = x̄ against LDA §9.6.3 Example 9.6.4; Bühlmann-Straub weighted analogue against LDA §9.6.2; example recomputed (v = 2, a = 17, k = 0.1176, Z = 0.944, risk 1 = 5.17)
- sources_checked: Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html; Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf; CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Checked against LDA Ch. 9 §§9.6.2–9.6.3 (Tse §§9.1–9.3 counterpart; semiparametric estimation is Tse §9.3, outside the assigned 9.1–9.2 — an exam-page scope matter already open as F-001 on Exam MAS-II (CAS).md). One minor left open (sourcing of the set-to-zero convention). Confidence capped at medium (decision D7): the assigned reading, Tse Chs 6–9, is commercial and its free Cambridge preview carries only the front matter and Ch. 1 (its contents pages fix the section titles); the page was checked against Loss Data Analytics, an open text covering the same ground. Mahler & Dean (Foundations ch. 8) could not be found as a free CAS-hosted copy (casact.org's Foundations 4th-ed. page links no chapter PDF; the old soa.org C-21-01 link is 404).
