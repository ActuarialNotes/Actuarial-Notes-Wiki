---
target: Concepts/Full Credibility Standard.md
created: 2026-10-18
---

## [F-001] Headline formula is in observations, not the expected claims the page defines
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- severity: major
- status: open
- locus: lead sentence and headline formula; frequency bullet
- claim: n_F, defined as the smallest expected claim count, = (z/k)^2 (sigma_S^2/mu_S^2); Poisson frequency: sigma_N^2/mu_N^2 = 1/lambda, so n_F = (z/k)^2 expected claims.
- evidence: (z/k)^2 · CV^2 is the number of iid observations needed (LDA §9.2.3, eq. 9.6, n_X = (y_p/k)^2 (sigma_X/mu_X)^2 for n claims of severity). For aggregate loss LDA §9.2.2 eq. (9.5) states the standard in expected claims as n_S = (y_p/k)^2[sigma_N^2/mu_N + (sigma_X/mu_X)^2]. With Poisson frequency per exposure lambda = 0.05 the page's formula gives (z/k)^2/0.05 = 21,648 (exposures), not 1,082 claims; the frequency bullet only reaches (z/k)^2 by silently multiplying by lambda.
- source_rank: 3
- proposed_action: Restate the headline formula to LDA eq. (9.5) and the frequency bullet to sigma_N^2/mu_N = 1 with no severity term.
- applied: true
- fingerprint: 71fcc9548ddf

## [F-002] Tolerance stated as absolute ±k rather than relative
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- severity: minor
- status: open
- locus: lead sentence
- claim: Observed mean stays within ±k of the true mean with probability p.
- evidence: LDA §9.2.1 eq. (9.1) and §9.2.2: Pr[(1−k)mu ≤ S ≤ (1+k)mu] ≥ p — k is a proportion of the mean (e.g. k = 0.05 is ±5%), which is how the page's own example uses it.
- source_rank: 3
- proposed_action: Restate as 'within 100k% of its expected value'.
- applied: true
- fingerprint: 4a964f97b23f

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Headline restated to LDA eq. (9.5) n_F = (z/k)^2[sigma_N^2/mu_N + (sigma_X/mu_X)^2] (expected claims); frequency bullet restated to sigma_N^2/mu_N = 1, no severity term. Severity and aggregate bullets now read as its special cases, as LDA §9.6.1 states.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Lead sentence restated to 'within 100k% of its expected value', per LDA eq. (9.1).

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: formulas against LDA eqs. (9.3)–(9.6) and §9.6.1; claims-to-exposures conversion against LDA Example 9.2.4; examples recomputed ((1.645/0.05)^2 = 1,082.41; k = 0.025 → 4,329.6; 1,082.41·(1+4) = 5,412.05); links and embed resolve
- sources_checked: Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html; Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf; CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Checked against LDA Ch. 9 §§9.2.1–9.2.3, 9.6.1 (Tse §6.2 counterpart). One major (units of the headline formula) and one minor fixed and resolved this run. Confidence capped at medium (decision D7): the assigned reading, Tse Chs 6–9, is commercial and its free Cambridge preview carries only the front matter and Ch. 1 (its contents pages fix the section titles); the page was checked against Loss Data Analytics, an open text covering the same ground. Mahler & Dean (Foundations ch. 8) could not be found as a free CAS-hosted copy (casact.org's Foundations 4th-ed. page links no chapter PDF; the old soa.org C-21-01 link is 404).
