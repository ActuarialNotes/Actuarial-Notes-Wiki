---
target: Concepts/Conjugate Prior.md
created: 2026-10-18
---

## [F-001] Table headed 'on the syllabus' does not match the assigned section's pairs
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- severity: minor
- status: open
- locus: table heading
- claim: 'The conjugate pairs on the syllabus': Poisson–gamma, Bernoulli/binomial–beta, normal–normal, exponential–inverse gamma.
- evidence: The MAS-II outline (p.4) assigns Tse Ch. 8.1–8.2; Tse's contents (publisher preview, p. x) list §8.2 Conjugate distributions as 8.2.1 gamma–Poisson, 8.2.2 beta–geometric, 8.2.3 gamma–exponential. Beta–geometric is not in the table, and the table's normal–normal and beta–binomial pairs are not §8.2 subsections, so the heading's scope claim is not what the syllabus section lists.
- source_rank: 1
- proposed_action: Retitle the table 'Common conjugate pairs'.
- applied: true
- fingerprint: d802bf0ce777

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Heading restated to 'Common conjugate pairs:'; the scope claim is removed.

## [F-002] Beta–geometric pair (Tse §8.2.2) not covered
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- severity: minor
- status: open
- locus: conjugate-pairs table
- claim: The page's table omits the beta–geometric conjugate pair.
- evidence: Tse contents (publisher preview, p. x): §8.2.2 'The beta–geometric conjugate distribution', inside the assigned Ch. 8.1–8.2 (MAS-II outline p.4). The page lists the other two §8.2 pairs (gamma–Poisson; gamma–exponential as exponential–inverse gamma) but not this one.
- source_rank: 1
- proposed_action: Writer to add a beta–geometric row (posterior and credibility form) from a citable source; a different checker verifies it. Not auto-fixed: new content.
- applied: false
- fingerprint: 1d4c602aa532

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: gamma-Poisson posterior (alpha + sum x, theta/(1+n theta)) against LDA §4.4.4; beta posterior and Z = n/(n+a+b) against LDA §9.5.2 and Example 9.5.1 (K = alpha + beta); normal–normal posterior against LDA App. §16.3.2; linear-exponential-family natural conjugacy against LDA App. §16.3.2; exponential/gamma pair against LDA §9.5.3 and Tse §8.2.3 title; pseudo-observation reading recomputed; example recomputed (posterior Gamma(3, 0.07692), mean 0.2308; Bühlmann k = 10, Z = 3/13, 0.2308)
- sources_checked: Frees et al., Loss Data Analytics (open text), Ch. 4, §4.4.4 Conjugate Distributions, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html; Frees et al., Loss Data Analytics (open text), Appendix B, §16.3 Conjugate Distributions, sha256:66a757e0d3dfdac6e4196cd9458ad437bb4ea690dca28797e4c1fe403c5f9e92 — https://openacttexts.github.io/Loss-Data-Analytics/CAppB.html; Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html; Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf; CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Checked against LDA Ch. 4 §4.4.4, Ch. 9 §9.5 and App. B §16.3. One minor fixed; one minor (beta–geometric missing) left open for a writer. Confidence capped at medium (decision D7): the assigned reading, Tse Chs 6–9, is commercial and its free Cambridge preview carries only the front matter and Ch. 1 (its contents pages fix the section titles); the page was checked against Loss Data Analytics, an open text covering the same ground. Mahler & Dean (Foundations ch. 8) could not be found as a free CAS-hosted copy (casact.org's Foundations 4th-ed. page links no chapter PDF; the old soa.org C-21-01 link is 404).
