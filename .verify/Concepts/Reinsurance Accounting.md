---
target: Concepts/Reinsurance Accounting.md
created: 2026-10-10
---

## [F-001] IFRS 17 presentation of reinsurance stated as mandatory single line
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- severity: minor
- status: open
- locus: bullet 'The income statement'
- claim: 'The income statement shows a single net expense (or income) from reinsurance contracts held within the Insurance Service Result.'
- evidence: IFRS 17 ¶86 (EU 2021/2036 text, PDF p.19): an entity 'may present' reinsurance income or expenses 'as a single amount; or ... may present separately the amounts recovered from the reinsurer and an allocation of the premiums paid'. The rest of the bullet (ceded premium not deducted from revenue — ¶86(c); recoveries presented separately from insurance contracts issued — ¶82) checks.
- source_rank: 2
- proposed_action: 'may show a single net expense'.
- applied: true
- fingerprint: 73ac56664fcb

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied in the working tree: 'The income statement may show a single net expense (or income) ...' (IFRS 17 ¶86).

## [F-002] 'Deposit accounting' attributed to IFRS 17, which does not use it
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- severity: minor
- status: open
- locus: lead sentence ('Under IFRS 17 the governing rules are ... a contract failing the risk transfer test is accounted for as a deposit'); 'Deposit accounting' bullet; first example's 'Without risk transfer' half; 'why ... the Appointed Actuary must raise it'
- claim: Under IFRS 17 a contract failing risk transfer is accounted for as a deposit asset accruing interest; the Appointed Actuary must raise a failed contract.
- evidence: Full-text search of IFRS 17 as adopted (EU 2021/2036, 77 pp.) finds no occurrence of 'deposit'. A contract that does not transfer significant insurance risk is simply not an insurance contract (Appendix A definition; B17-B23) and falls outside IFRS 17, to IFRS 9. Deposit accounting with no ceded premium, no ceded losses and no deduction from reserves is the U.S. statutory rule (SSAP 62R ¶40, which the page's own U.S. section states). The Appointed Actuary sentence has no source read this run.
- source_rank: 2
- proposed_action: Say the contract falls outside IFRS 17 (accounted for as a financial instrument), and cite or drop the Appointed Actuary sentence.
- applied: false
- fingerprint: 0a77caed52fc

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: U.S. statutory section (the DISC objective) line by line: risk transfer both conditions, no credit otherwise — SSAP 62R ¶10, ¶13; deposit — ¶40; prospective premium reduces written and earned, earned in proportion to protection — ¶30; ceded premium payable net of commission — ¶49; commission treated as revenue benefiting surplus — Odomirok PDF p.62; excess commission liability — ¶76; recoverable changes reduce gross incurred, paid recoverables an asset, unpaid netted — ¶31; non-proportional credit only above attachment — ¶32; unauthorized credit to the extent of collateral, provision charged to surplus — ¶77-78, overdue — ¶85. XoL example recomputed before reading: claim 1 below 1,000,000 → 0; claim 2: 1,300,000 - 1,000,000 = 300,000, paid 400,000 < attachment so all on unpaid, netted; agrees. IFRS 17 section: separate presentation, never netted — ¶78, ¶82; non-performance risk incl. disputes in reinsurance cash flows — ¶63, changes do not adjust CSM — ¶67; ceded premium not a reduction of revenue — ¶86(c); single line optional — F-001 fixed. IFRS example recomputed: 50 - 38 = 12; 400 - 300 - 12 = 88; 100 without. Commutation: IRMI. MCT credit for unregistered reinsurance turns on collateral: OSFI RSA Q&A ('RSAs are but one form of collateral enabling a capital credit for unregistered reinsurance'). F-002 open on the IFRS 'deposit' wording and the Appointed Actuary sentence.
- sources_checked: NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), SSAP No. 62R ¶10-13, ¶30-32, ¶40, ¶49, ¶76-78, ¶85 (PDF pp.438, 441-442, 444, 446, 450-451), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf; Odomirok, McFarlane, Kennedy & Brenden, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2014), p.62 (ceding commissions treated as revenue, benefit surplus); Ch.22 p.306, sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf; IFRS 17 Insurance Contracts as adopted by Commission Regulation (EU) 2021/2036 (OJ L 416, 23.11.2021), ¶63, ¶67, ¶78, ¶82, ¶86 (PDF pp.15-16, 18-19), sha256:c3fd00c0bff726d1886fffc0404815217cba23a84d155d681cfbf9fa631ec315 — https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32021R2036; IRMI Insurance Glossary, 'commutation' (fetched 2026-10-10), sha256:4a4f0a8117e3514e20cc7e93053507feceb324dfb9a5643fff6d872fa4ed2d96 — https://www.irmi.com/term/insurance-definitions/commutation; OSFI, Questions and Answers – Guidance for Reinsurance Security Agreements (fetched 2026-10-10), sha256:83c50de632d4683ac140675078179f9e51c8cfefa99d248f8c78730a67bc4d0d — https://www.osfi-bsif.gc.ca/index%2ephp/en/data-forms/applications-approvals/questions-answers-guidance-reinsurance-security-agreements
- note: Medium: U.S. content high; the Canadian/IFRS framing carries an open minor (F-002), commutation rests on IRMI and the MCT bullet on an OSFI Q&A rather than the MCT guideline.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- resolves: F-002
- status: resolved
- note: Lead-authorized, applied: lead now says a contract that does not transfer significant insurance risk 'is not an insurance contract, so it falls outside IFRS 17' (IFRS 17 Appendix A: an insurance contract is one under which the issuer 'accepts significant insurance risk'; a reinsurance contract is an insurance contract issued by a reinsurer); the deposit bullet is labelled 'under U.S. statutory accounting (SSAP No. 62R)'; the Appointed Actuary clause is deleted.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Re-verify after the F-002 clean-up; IFRS 17 Appendix A definitions read (EU 2021/2036 text, PDF p.28); everything else as checked in the earlier dv06 pass.
- sources_checked: NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), SSAP No. 62R ¶10-13, ¶30-32, ¶40, ¶49, ¶76-78, ¶85 (PDF pp.438, 441-442, 444, 446, 450-451), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf; Odomirok, McFarlane, Kennedy & Brenden, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2014), p.62 (ceding commissions treated as revenue, benefit surplus); Ch.22 p.306, sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf; IFRS 17 Insurance Contracts as adopted by Commission Regulation (EU) 2021/2036 (OJ L 416, 23.11.2021), ¶63, ¶67, ¶78, ¶82, ¶86 (PDF pp.15-16, 18-19), sha256:c3fd00c0bff726d1886fffc0404815217cba23a84d155d681cfbf9fa631ec315 — https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32021R2036; IRMI Insurance Glossary, 'commutation' (fetched 2026-10-10), sha256:4a4f0a8117e3514e20cc7e93053507feceb324dfb9a5643fff6d872fa4ed2d96 — https://www.irmi.com/term/insurance-definitions/commutation; OSFI, Questions and Answers – Guidance for Reinsurance Security Agreements (fetched 2026-10-10), sha256:83c50de632d4683ac140675078179f9e51c8cfefa99d248f8c78730a67bc4d0d — https://www.osfi-bsif.gc.ca/index%2ephp/en/data-forms/applications-approvals/questions-answers-guidance-reinsurance-security-agreements
- note: Medium: commutation (IRMI) and the MCT bullet (OSFI Q&A) are secondary. The 'Reinsurance Versus Deposit' example's second half uses deposit treatment without attributing it to IFRS 17.
