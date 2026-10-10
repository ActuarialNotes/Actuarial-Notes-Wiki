---
target: Concepts/Financial Statements.md
created: 2026-10-10
---

## [F-001] IFRS 17 does not require reinsurance to be presented as one net line
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- severity: minor
- status: open
- locus: bullet 'Canada — IFRS 17'
- claim: 'reinsurance appears in profit or loss as one net line.'
- evidence: IFRS 17 ¶86 (Commission Regulation (EU) 2021/2036, OJ L 416 p.21, PDF p.19): 'An entity may present the income or expenses from a group of reinsurance contracts held ... as a single amount; or the entity may present separately the amounts recovered from the reinsurer and an allocation of the premiums paid that together give a net amount equal to that single amount.' A single line is an option, not a rule; ¶86(c) does forbid presenting the premium allocation as a reduction in revenue.
- source_rank: 2
- proposed_action: 'may appear in profit or loss as one net line'.
- applied: true
- fingerprint: d6bec72c54c1

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied in the working tree: 'reinsurance may appear in profit or loss as one net line' (IFRS 17 ¶86).

## [F-002] Three claims not located in any source read this run
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- severity: minor
- status: open
- locus: bullets 'Canada — IFRS 17' (OSFI core return sentence), 'Canadian ratios ...'; Quota Share example closing sentence
- claim: 'The OSFI core return (see Canadian Annual Return) reproduces these statements in regulatory form with the liability roll-forwards IFRS 17 introduced.' / 'The relief is an artefact of SAP's conservatism, which is why rating agencies adjust for it.' / the IFRS 17 statement list (financial position, profit or loss, comprehensive income, changes in equity, cash flows, notes).
- evidence: OSFI's IFRS 17 forms page (osfi-bsif.gc.ca/en/node/430) returned 404 this run; a Mondaq summary of it (WebFetch, rank 3) confirms only that a 'P&C Core Financial Statement Return (PC1)' exists, effective Q1 2022, and says nothing of roll-forwards. No source read mentions rating agencies adjusting for surplus relief; Odomirok PDF pp.121-122 says regulators watch surplus aid (IRIS ratio 4) and Schedule F flags high provisional commissions. The IFRS statement set is IAS 1 ¶10, which was not read this run. Everything else on the page checks (see the pass).
- source_rank: 3
- proposed_action: Cite OSFI's PC1 instructions for the roll-forward sentence, IAS 1 ¶10 for the statement list, and a rating-agency source for the adjustment, or trim the unsupported clauses.
- applied: false
- fingerprint: f2c6806dcc39

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- status_set: in_review
- checks_run: Checked: direct equity items under SAP (unrealized gains, change in nonadmitted assets, provision for reinsurance, net deferred tax) against the Capital and Surplus Account lines 24-28 (Odomirok PDF pp.56-58); GAAP OCI for AFS securities (PDF p.306); SAP vs GAAP bullet (admitted assets, DAC, provision for reinsurance to surplus, net vs gross, ASC 944) against Odomirok Ch.22 PDF pp.302-306 and p.58; statutory statement set and supplements, balance sheet primary / income statement secondary against Preamble ¶31 and ¶35; IFRS 17 revenue, separate reinsurance assets, no netting, ceding commission not contingent on claims reduces premium paid against ¶78, ¶82-83, ¶86(b). Quota share example recomputed before reading: without treaty 7.5 - 10 = -2.5 SAP, 7.5 + 2.5 - 10 = 0 GAAP; with treaty cash 7.5 - (4.0 - 1.0) = 4.5, net UPR 6.0, SAP -1.5, GAAP 4.5 + 1.5 - 6.0 = 0 (equivalently 4.5 + 1.5 + prepaid reinsurance 4.0 - 10 gross); +1.0 relief = commission, which equals 25% x 4.0 acquisition cost so no SSAP 62R ¶76 excess liability. IFRS 17 example recomputed: 100 - 25 = 75; 0.20 x 360 = 72; 500 - 360 - 80 - 3 = 57; netted 400 - 288 - 55 = 57. All agree. F-001 (¶86) fixed; F-002 (three unsourced claims) open.
- sources_checked: NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), Preamble ¶31, ¶35 (PDF pp.37-38); SSAP No. 62R ¶30, ¶40, ¶49, ¶76 (PDF pp.441, 444, 446, 450), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf; Odomirok, McFarlane, Kennedy & Brenden, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2014), pp.56-58 (Capital and Surplus Account), p.62 (ceding commission treated as revenue), pp.121-122, pp.302-306, sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf; IFRS 17 Insurance Contracts as adopted by Commission Regulation (EU) 2021/2036 (OJ L 416, 23.11.2021), ¶78, ¶80, ¶82-83, ¶86 (PDF pp.18-19), sha256:c3fd00c0bff726d1886fffc0404815217cba23a84d155d681cfbf9fa631ec315 — https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32021R2036
- note: Left in_review: OSFI's IFRS 17 return instructions (404 this run) and IAS 1 were not read, and the rating-agency clause has no source. The U.S. statutory content the DISC objective uses checks.
