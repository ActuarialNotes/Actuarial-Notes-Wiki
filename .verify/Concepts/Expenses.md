---
target: Concepts/Expenses.md
created: 2026-10-17
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- status_set: verified
- confidence: medium
- checks_run: definition, formulas and every bullet checked against the routed reading pages; every worked example recomputed before comparison; [[links]] and $$ balance checked
- sources_checked: Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.2 §3, PDF pp.22-26, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf; Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016), Ch.15 retrospective rating, PDF p.319, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Bahnemann, Distributions for Actuaries, CAS Monograph 2 (2015), Ch.6, PDF pp.174-176, sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf
- note: Fisher Ch.2 §3: retro premium (B + cL) x T; B carries fixed expenses, excess charges, net insurance charge, profit; c carries loss-varying expenses (LAE, loss-based assessments); T = 1/(1 - tax rate) for premium taxes and assessments; expense portion of B = e - (c-1)E with e including LAE, excluding taxes, reflecting the premium discount (expenses a lower percentage for large accounts) (PDF pp.22-26). Werner Ch.15 basic premium formula (PDF p.319). Bahnemann Ch.6: ALAE vs ULAE, fixed and variable expense loading (PDF pp.174-176). Examples recomputed: BP 104,600, R 396,138, LAE 30,000 vs 39,000, tax 11,538, E[R] 448,050 = (e+E)T; 23.0% vs 15.08%, 39,600.

## [F-001] SOA life/health sense of expenses not covered or checked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- severity: minor
- status: open
- locus: definition and Components bullet
- claim: Expenses are LAE plus underwriting expense (commissions, other acquisition, general expenses, premium taxes).
- evidence: The page is linked from Exam FAM, ALTAM, CP-321 and GI-101 as well as Exam 8. Its definition is the P&C one (Fisher Ch.2; Bahnemann Ch.6). In SOA life contingencies (ALTAM) expenses are modelled as initial, renewal and claim (settlement) expenses in gross-premium policy values, a usage the page does not mention; those exams' readings were not read this run. Flagged per the CAS/SOA usage rule, not reconciled.
- source_rank: 4
- proposed_action: Decide whether the page should note the life-contingencies sense or the SOA links should point elsewhere; check in an SOA pass.
- applied: false
- fingerprint: 37579b5c6876
