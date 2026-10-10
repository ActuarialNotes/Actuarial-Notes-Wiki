---
target: Concepts/Premium Accounting.md
created: 2026-10-10
---

## [F-001] Trap says written premium is never booked when billed, against the page's own installment bullet
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- severity: minor
- status: open
- locus: Exam traps, 'Written on the effective date'
- claim: 'Statutory written premium is booked in full when the policy takes effect, not when it is billed or paid.'
- evidence: SSAP No. 53 ¶4 (PDF p.348): workers' compensation 'written premiums may be recorded on an installment basis to match the billing to the policyholder'; ¶6 applies the effective-date rule to 'all other contracts'. The page's own 'Installments' bullet states this exception, so the trap contradicts it on 'billed'; 'not when paid' holds generally (¶12).
- source_rank: 1
- proposed_action: Delete 'billed or'.
- applied: true
- fingerprint: f7340f56f46d

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied in the working tree: trap now ends 'not when it is paid.' (SSAP 53 ¶4, ¶6).

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: Every bullet against the SSAP text: written premium definition ¶3; recorded at effective date, UPR at once, flat installment fees as other income ¶6 and fn.1; ¶7 earning; ¶8 daily/monthly pro rata with 1/24, 3/24, 5/24; endorsements ¶9; EBUB through written or earned, adjust on audit, return reduces earned, 10% over collateral nonadmitted ¶10-13; earned but uncollected recorded as direct and assumed written premium ¶14; advance premium ¶15; WC installment basis ¶4; PDR elements, grouping, no offset, investment-income disclosure ¶17-18; ceded premium reduces written and earned SSAP 62R ¶30; SSAP 6 ¶9.a (no related UPR, over 90 days; installment over 90 days plus all future recorded installments), ¶9.c (agents' balances regardless of UPR), ¶10 write-off; SSAP 66 ¶7 actuarially accepted methods, ¶9.a.i-ii additional/return retro. Examples recomputed before reading: Apr 1-Dec 31 2025 = 275 days; 2,400 x 275/365 = 1,808.22, x 90/365 = 591.78; monthly 7/24 x 2,400 = 700, EP 1,700, difference 108.22. NWP 50 + 6 - 14 = 42; 0.10 x (800,000 - 300,000) = 50,000, admitted 750,000. Installment example: 5 x 5,000 = 25,000 billed; 35,000 booked not due; UPR 60,000 x 7/12 = 35,000; January installment due Jan 31 is 120 days past due at May 31 — mirrors SSAP 6 Exhibit A. All agree. One minor (F-001) fixed.
- sources_checked: NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), SSAP No. 53 ¶3-18 (PDF pp.347-350); SSAP No. 6 ¶7, ¶9-10 and Exhibit A (PDF pp.83-86); SSAP No. 66 ¶3, ¶7, ¶9.a (PDF pp.502-504); SSAP No. 62R ¶30 (PDF p.441), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf; Odomirok, McFarlane, Kennedy & Brenden, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2014), pp.36-37 (UPR categories, daily vs monthly pro rata); p.218 (U&IE Part 1B columns), sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf
- note: One minor opened and fixed; every statutory statement on the page is SSAP text.
