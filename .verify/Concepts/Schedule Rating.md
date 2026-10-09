---
target: Concepts/Schedule Rating.md
created: 2026-09-13
---

## [F-001] Unsourced regulatory claim that most jurisdictions cap schedule modifications at plus or minus 25%
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/03f2
- date: 2026-09-13
- severity: minor
- status: open
- locus: Bullet 2 ('The filed schedule lists eligible categories...')
- claim: 'most jurisdictions cap the total modification at +/-25%'
- evidence: Werner & Modlin Ch. 15 p.297 (PDF p.309) supports the existence of a cap but not its attribution to jurisdictions or its level: 'Schedule credits and debits are typically subject to an overall maximum modification', and separately 'state insurance laws and regulations require that the filed schedule rating guidelines are applied consistently, and documentation is often required to support the application of each credit and debit' - i.e. the regulatory requirement Werner names is consistency and documentation, while the cap belongs to the plan. The 25% figure appears once, as the illustrative plan's own limit: Table 15.6 (p.298, PDF p.310) shows five categories (Premises -10/+10, Classification -15/+15, Medical Facilities -5/+5, Safety Organization -15/+15, Employees -15/+15) with 'Total Maximum = 25% (Credit) / Debit'. The page's per-category and documentation claims are both correct; only 'most jurisdictions' is unsupported. sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- source_rank: 2
- proposed_action: Say that filed plans are typically subject to an overall maximum modification and cite Werner's illustrative workers compensation plan at 25%, rather than asserting a jurisdiction count.
- applied: false
- fingerprint: 6ed8aca8a0e4

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Werner Ch.15 pp.297-298 (PDF pp.309-310): 'Schedule credits and debits are typically subject to an overall maximum modification'; Table 15.6's illustrative plan has a 25% total maximum; state laws require consistent application and documentation. Bullet rewritten to that; 'most jurisdictions cap at +/-25%' deleted.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: Purpose and the double-counting caution against Werner p.297 (unsourced 'new operation with no experience' removed); cap and documentation p.297-298; order of application rewritten to Werner's 'manual rate as modified by experience rating' — unsourced sequencing/reproducibility claim removed; consistency bullet rewritten to Werner's objective vs subjective characteristics — unsourced regulator-review claim removed; rate-leakage bullet tied to Werner Ch.5 p.73 (subjective credits complicate on-level; review distributions of credits). Examples recomputed: 20,000 x 0.95 x 0.90 = 17,100 (14.5% off manual); 1.08 x 0.87/0.94 = 0.9996.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.15 pp.289, 297-298, 323 (PDF pp.301, 309-310, 335); Ch.5 p.73 (PDF p.85); Ch.2 p.16 (PDF p.28), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: F-001 fixed. Medium: examples are vault-authored.
