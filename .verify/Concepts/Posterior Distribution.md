---
target: Concepts/Posterior Distribution.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: Bayes' theorem form, likelihood as product of conditionally iid terms and the marginal as normaliser against LDA §9.5 and §4.4.4; kernel method against LDA §§9.5.1–9.5.2 derivations; Bayesian premium as posterior mean of mu(theta) against LDA §9.5; conjugate families against LDA §4.4.4 and App. §16.3.2; both examples recomputed (two-class posterior 0.5987/0.4013, forecast 0.3605; Beta(11, 59) mean 0.1571, variance 0.001865, SD 0.0432 vs prior SD 0.0655)
- sources_checked: Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html; Frees et al., Loss Data Analytics (open text), Ch. 4, §4.4.4 Conjugate Distributions, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html; Frees et al., Loss Data Analytics (open text), Appendix B, §16.3 Conjugate Distributions, sha256:66a757e0d3dfdac6e4196cd9458ad437bb4ea690dca28797e4c1fe403c5f9e92 — https://openacttexts.github.io/Loss-Data-Analytics/CAppB.html; Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf; CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Checked against LDA Ch. 9 §9.5, Ch. 4 §4.4.4 and App. B §16.3 (Tse §8.1 counterpart); no findings. Confidence capped at medium (decision D7): the assigned reading, Tse Chs 6–9, is commercial and its free Cambridge preview carries only the front matter and Ch. 1 (its contents pages fix the section titles); the page was checked against Loss Data Analytics, an open text covering the same ground. Mahler & Dean (Foundations ch. 8) could not be found as a free CAS-hosted copy (casact.org's Foundations 4th-ed. page links no chapter PDF; the old soa.org C-21-01 link is 404).

## [F-001] Flat-prior bullet: boundary clauses stated as deduction
- entry_type: finding
- author: agent:checker-tse
- run_id: 2026-10-31T04:56Z/9cfd
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'A flat (uniform) prior', last sentence
- claim: If the uniform prior covers only an interval ... an MLE outside the interval cannot be the posterior mode (writer's own deduction, unsourced)
- evidence: BDA3 §4.3 p.90 (PDF p.100): with y_i ~ N(theta,1) and the restriction theta >= 0, 'The posterior distribution for theta is normal, centered at ybar, truncated to be positive'; with the true theta = -1 outside the assumed space 'the limiting posterior distribution for theta has a sharp spike at 0'. LDA Ex. 4.4.5: uniform prior on [0,0.5], posterior proportional to p^8 normalised over [0,0.5] only. Restated with BDA's example so the clause carries its source.
- source_rank: 2
- applied: true
- fingerprint: cae488b24cf4

## [F-002] Improper-posterior: 'no mean' step made explicit
- entry_type: finding
- author: agent:checker-tse
- run_id: 2026-10-31T04:56Z/9cfd
- date: 2026-10-31
- severity: nit
- status: open
- locus: bullet 'Improper priors', last sentence
- claim: An improper posterior is not a probability distribution, so it has no posterior mean
- evidence: LDA §4.4.2 defines the posterior as f(x|theta)pi(theta)/f(x) with f(x) = integral of f(x|theta)pi(theta); BDA3 §4.3 p.90: an improper posterior is one whose unnormalized density 'integrates to infinity'. Restated to name the infinite normalising integral as the reason no posterior mean exists.
- source_rank: 2
- applied: true
- fingerprint: cd0334d3a5e3

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:checker-tse
- run_id: 2026-10-31T04:56Z/9cfd
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Clause kept and illustrated with BDA3 §4.3 p.90's truncated-normal example (posterior piled against the boundary 0); now stated by a source.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:checker-tse
- run_id: 2026-10-31T04:56Z/9cfd
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Sentence restated to give the infinite normalising integral (Bayes' denominator) as the reason, per LDA §4.4.2 and BDA3 §4.3.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:checker-tse
- run_id: 2026-10-31T04:56Z/9cfd
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: New flat-prior bullet against BDA3 §2.1 p.30 (uniform prior: posterior proportional to likelihood), §4.1 pp.85–86 (MLE = posterior mode under a uniform prior), §4.3 p.90 (restricted parameter: posterior truncated to the allowed region, spike at the boundary when the truth is outside) and LDA Ex. 4.4.5; improper-prior bullet against LDA §4.4.2 (integral of pi = infinity), BDA3 §2.8 pp.51–53 (constant prior on the line improper; proper or not, check the integral; Beta(0,0) improper posterior when y = 0 or n) and §4.3 p.90 (improper posterior needs an improper prior; Beta(0,0) with n successes, 0 failures). Earlier content re-read against LDA §§4.4.2, 4.4.4, 9.5 and App. B §16.3 (cached LDA ch. 4 and ch. 9 sha256s unchanged); both examples recomputed (0.5987/0.4013, 0.3605; Beta(11,59), 0.1571, 0.001865, 0.0432). No served question's numbers on the page (compared with masii-2018f-q28, 2019f-q35, 2019s-q23).
- sources_checked: Frees et al., Loss Data Analytics (open text), Ch. 4 §4.4.2 Bayesian Model (improper prior) and Example 4.4.5 (uniform prior on an interval), sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html; Gelman et al., Bayesian Data Analysis, 3rd ed., author-hosted non-commercial electronic edition, §2.1 p.30, §2.8 pp.51–53, §4.1 pp.85–86, §4.3 p.90, sha256:246f7d34daad4971d40fa247f1045bf3fce4f912dcea9b4267b161ee7a70b306 — https://sites.stat.columbia.edu/gelman/book/BDA3.pdf; Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html; Frees et al., Loss Data Analytics (open text), Appendix B, §16.3 Conjugate Distributions, sha256:66a757e0d3dfdac6e4196cd9458ad437bb4ea690dca28797e4c1fe403c5f9e92 — https://openacttexts.github.io/Loss-Data-Analytics/CAppB.html; CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Whole page re-verified after the MAS-II G8 additions (writer group tse). Two findings (minor, nit) fixed in this run. Confidence medium (D7): the assigned reading, Tse Chs 8–9, is commercial; checked against Loss Data Analytics and Gelman BDA3 (free author-hosted edition).
