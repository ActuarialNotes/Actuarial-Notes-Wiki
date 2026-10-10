---
target: Concepts/Written Premium.md
created: 2026-09-12
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:16Z/58a9
- date: 2026-09-12
- status_set: verified
- confidence: high
- checks_run: Definition diffed against Werner Ch.5 (printed p.66 = PDF p.78): 'Written premium is the total amount of premium for all policies written during the specified period... the key in determining written premium is the inception date of the policy' — matches, including the mid-term-adjustment point (Werner's Policy D cancellation booking -$100 of written premium into the following calendar year, PDF p.79) that the page's last bullet makes about endorsements, cancellations and audits. The identity EP = WP - delta-UEP is Werner's 'CY Unearned Premium = CY Written Premium - CY Earned Premium + Unearned Premium as of the beginning of the CY' (printed p.70 = PDF p.82) rearranged; I re-derived it. The premium-trend bullet is confirmed on PDF p.91: 'written premium is a leading indicator of trends that will eventually emerge in earned premium... the actuary will often use quarterly average written premium'. Both examples recomputed from scratch before reading their answers: 1,200 written / 1,200 x 3/12 = $300 earned / $900 UEP, and 1,200 - (900 - 0) = 300; and 26,640,000/40,000,000 = 66.6%, 31,680,000/52,000,000 = 60.9%, 26,640,000/37,000,000 = 72.0%, 31,680,000/44,000,000 = 72.0%, with written growth 52/40 = +30% against earned growth 44/37 = +18.9% — every figure on the page reproduces.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 p.2 (PDF p.14), Ch. 5 pp.66-70 (PDF pp.78-82) and Ch. 5 premium trend pp.78-79 (PDF pp.90-91), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- note: No findings. Definition, both formulas and both worked examples confirmed against Werner Ch.5.

## [F-001] Trap said written premium is never recorded when billed; SSAP 53 lets workers compensation be written as billed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- severity: minor
- status: open
- locus: Exam traps callout, 'Written on the effective date'
- claim: 'Written premium is recorded when the policy takes effect, not when it is billed or collected.'
- evidence: NAIC AP&P Manual (March 2025) SSAP No. 53 ¶4 (53-2, PDF p.348): 'For workers' compensation contracts, which have a premium that may periodically vary based upon changes in the activities of the insured, written premiums may be recorded on an installment basis to match the billing to the policyholder ... written premium is recorded on the basis of that frequency.' ¶6 then applies the effective-date rule to 'all other contracts'. So 'not when it is billed' is false for that exception, while 'not when collected' holds generally (¶12: liabilities 'based on when premium is earned, not collected'). The page's sibling Premium Accounting states the installment exception in its 'Installments' bullet.
- source_rank: 1
- proposed_action: Delete 'billed or' from the trap, leaving 'not when it is collected'.
- applied: true
- fingerprint: 85a1e1c32735

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied in the working tree: deleted 'billed or'; the trap now reads 'Written premium is recorded when the policy takes effect, not when it is collected.' — consistent with SSAP 53 ¶4, ¶6 and ¶12.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: Delta check: diffed from commit f46336499 (last pass, run 58a9) to HEAD; changes are the 'Statutory definition and types' bullet and the tip/warning callouts. Definition against SSAP 53 ¶3 ('the contractually determined amount charged by the reporting entity to the policyholder for the effective period of the contract') and ¶6 (recorded as of the effective date). Ceded premium reduces written and earned premium: SSAP 62R ¶30. Direct and assumed written premium: SSAP 53 ¶14 ('direct and assumed written premium'); net = direct + assumed - ceded consistent with Odomirok's U&IE Part 1B column references (ceded = columns 4+5, net = column 6) and the gross/net written premium table (PDF p.83). Advance premium a liability, not written premium or UPR: SSAP 53 ¶15. Trap 'billed or collected' contradicted by ¶4 for workers compensation — F-001, fixed.
- sources_checked: NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), SSAP No. 53 ¶3-4, 6, 12, 14-15 (PDF pp.347-350); SSAP No. 62R ¶30 (62-8, PDF p.441), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf; Odomirok, McFarlane, Kennedy & Brenden, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2014), U&IE Part 1B columns, pp.82-83, 218 (printed 81-82, 217), sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.1 p.2, Ch.5 pp.66-70, 78-79 (PDF pp.14, 78-82, 90-91) — prior-pass source, re-fetched this run, hash unchanged, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: One minor finding (F-001) opened and fixed. Additions confirmed against rank-1 statutory text; the Werner-sourced content of run 58a9 is unchanged, and Werner's hash re-confirmed.
