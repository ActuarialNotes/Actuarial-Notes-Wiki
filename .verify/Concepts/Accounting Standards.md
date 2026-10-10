---
target: Concepts/Accounting Standards.md
created: 2026-10-10
---

## [F-001] Bullet said new GAAP guidance becomes statutory when the NAIC rejects it
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- severity: nit
- status: open
- locus: bullet 'How GAAP enters SAP'
- claim: 'New GAAP guidance becomes statutory only when the NAIC adopts it, adopts it with modification, or rejects it.'
- evidence: NAIC AP&P Manual Preamble ¶27 (PDF p.37): GAAP pronouncements 'do not become part of SAP until and unless adopted by the NAIC'; ¶54: the NAIC identifies GAAP guidance included in whole, in part or with modification, 'as well as any rejected GAAP guidance'. Rejected guidance does not become statutory.
- source_rank: 1
- proposed_action: Delete ', or rejects it'.
- applied: true
- fingerprint: 1db865831e6f

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied in the working tree: now 'only when the NAIC adopts it or adopts it with modification' (Preamble ¶27, ¶54).

## [F-002] Principles-versus-rules characterisation of IFRS 17 and SAP is not in the sources read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- severity: minor
- status: open
- locus: bullet 'Principles versus rules'
- claim: 'IFRS 17 is principles-based (an entity-specific risk adjustment, judgement on discount rates); SAP leans rules-based (admissibility tests, the Schedule F provision formula), which buys comparability for regulators at the cost of economic realism.'
- evidence: The facts inside the parentheses check: IFRS 17 ¶37 risk adjustment is 'the compensation that the entity requires for bearing the uncertainty' (EU 2021/2036 text, PDF p.10); SSAP 62R ¶77, ¶85 provision for reinsurance; SSAP No. 6 ¶9 90-day nonadmission. But no source read labels IFRS 17 principles-based and SAP rules-based, and the trade-off Odomirok does state (PDF p.22, printed 21) is different: 'rules-based guidance may be easier to understand and to audit, but a principles-based approach is generally more adaptable to changes in the business environment' — not 'comparability at the cost of economic realism'.
- source_rank: 2
- proposed_action: Cite a source for the characterisation, or restate the trade-off as Odomirok gives it.
- applied: false
- fingerprint: 941589c0a9ee

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Who sets them (NAIC SSAPs, state law final, FASB/SEC, IASB, IRC from the annual statement): Odomirok PDF pp.8-10, Preamble ¶24. Conservatism, recognition, consistency: Preamble ¶32-38. Prescribed/permitted and Note 1 disclosure: SSAP 1 ¶7. Example 1: (1) SAP nonadmits over-90-day premium (SSAP 6 ¶9.a); GAAP evaluates premium receivable for credit losses under ASC 326 (PwC §7.8 and an insurer's 10-Q — two independent rank-3 sources, agreeing); IFRS 17 includes premiums from the policyholder within the contract boundary cash flows (B65(a)). (2) SAP expenses acquisition costs; GAAP DAC (Odomirok PDF pp.303-304); IFRS 17 PAA may expense acquisition cash flows when coverage is one year or less (¶59(a)). (3) SAP nets recoverables on unpaid losses (SSAP 62R ¶31) with a provision for unauthorized/overdue reinsurance (¶77, ¶85); GAAP gross (Odomirok p.306); IFRS 17 separate reinsurance assets (¶78, ¶82). (4) SAP undiscounted except tabular (SSAP 65 ¶10); IFRS 17 discounting and risk adjustment; tax discounting (Odomirok PDF p.10). (5) Surplus notes: SAP surplus, interest and principal need the commissioner's prior approval (SSAP 41 ¶3.d, ¶5-6); GAAP liability (insurer's SEC filing, rank 3). Example 2: non-tabular discounting only by prescribed/permitted practice (SSAP 65 ¶12, Odomirok PDF p.67); disclosures of rate and non-tabular discount by line (SSAP 65 ¶14-15); 280 - 30 = 250 recomputed. F-001 (nit) fixed; F-002 (minor) open on the principles-vs-rules sentence.
- sources_checked: NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), Preamble ¶20, ¶27, ¶30-38, ¶54 (PDF pp.35-41); SSAP No. 1 ¶7 (PDF p.48); SSAP No. 41 ¶3-6 (PDF pp.266-267); SSAP No. 62R ¶31, ¶77, ¶85 (PDF pp.441-442, 450-451); SSAP No. 65 ¶10-15 (PDF pp.493-494); SSAP No. 6 ¶9 (PDF p.83), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf; Odomirok, McFarlane, Kennedy & Brenden, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2014), Ch.1 pp.8-10; p.22; pp.66-67; Ch.22 pp.302-306, sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf; IFRS 17 Insurance Contracts as adopted by Commission Regulation (EU) 2021/2036 (OJ L 416, 23.11.2021), ¶37, ¶59(a), ¶78, ¶82, B65(a), sha256:c3fd00c0bff726d1886fffc0404815217cba23a84d155d681cfbf9fa631ec315 — https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32021R2036; PwC Viewpoint, Loans and investments guide §7.8 'Application of CECL to insurance receivables' (fetched 2026-10-10), sha256:8b9973dbc73b4470cf6b0094f5db54cea781bf3d7ba1c0473b79c139f5a92a23 — https://viewpoint.pwc.com/dt/us/en/pwc/accounting_guides/loans_and_investment/loans_and_investment_US/chapter_7_current_ex_US/7_8-Application-of-CECL-to-insurance-receivables.html; SEC EDGAR, CIK 876437 10-Q (2020) note on ASC 326 and premium receivable (fetched 2026-10-10), sha256:6399a4ac9c4c86512fd70472ca5e708e8eea84009c3506a5460faec2f3dc0353 — https://www.sec.gov/Archives/edgar/data/876437/000087643720000031/R9.htm; SEC EDGAR, CIK 1401521 filing (2014) note on statutory vs GAAP differences, surplus notes (fetched 2026-10-10), sha256:2b6c27d739b4b61513d3f3c1300fb55a5661fb23009771aac560c0de293d30f9 — https://www.sec.gov/Archives/edgar/data/1401521/000140152114000125/R13.htm
- note: Medium: the GAAP credit-loss and surplus-note statements rest on rank-3 sources (two agreeing for the first, an insurer's audited-filing note for the second); one minor open.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- resolves: F-002
- status: resolved
- note: Lead-authorized, applied: bullet restated to the sources: IFRS 17's risk adjustment is 'the compensation that the entity requires for bearing the uncertainty' (¶37, an entity-specific judgement); SAP relies on prescribed tests (SSAP 6 ¶9 admissibility, SSAP 62R ¶77/¶85 provision); and Odomirok's trade-off verbatim in substance (PDF p.22: rules easier to understand and audit, principles more adaptable). 'Comparability at the cost of economic realism' deleted.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Re-verify after the F-002 restatement; all other claims as checked in the earlier dv06 pass.
- sources_checked: NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), Preamble ¶20, ¶27, ¶30-38, ¶54 (PDF pp.35-41); SSAP No. 1 ¶7 (PDF p.48); SSAP No. 41 ¶3-6 (PDF pp.266-267); SSAP No. 62R ¶31, ¶77, ¶85 (PDF pp.441-442, 450-451); SSAP No. 65 ¶10-15 (PDF pp.493-494); SSAP No. 6 ¶9 (PDF p.83), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf; Odomirok, McFarlane, Kennedy & Brenden, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2014), Ch.1 pp.8-10; p.22; pp.66-67; Ch.22 pp.302-306, sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf; IFRS 17 Insurance Contracts as adopted by Commission Regulation (EU) 2021/2036 (OJ L 416, 23.11.2021), ¶37, ¶59(a), ¶78, ¶82, B65(a), sha256:c3fd00c0bff726d1886fffc0404815217cba23a84d155d681cfbf9fa631ec315 — https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32021R2036; PwC Viewpoint, Loans and investments guide §7.8 'Application of CECL to insurance receivables' (fetched 2026-10-10), sha256:8b9973dbc73b4470cf6b0094f5db54cea781bf3d7ba1c0473b79c139f5a92a23 — https://viewpoint.pwc.com/dt/us/en/pwc/accounting_guides/loans_and_investment/loans_and_investment_US/chapter_7_current_ex_US/7_8-Application-of-CECL-to-insurance-receivables.html; SEC EDGAR, CIK 876437 10-Q (2020) note on ASC 326 and premium receivable (fetched 2026-10-10), sha256:6399a4ac9c4c86512fd70472ca5e708e8eea84009c3506a5460faec2f3dc0353 — https://www.sec.gov/Archives/edgar/data/876437/000087643720000031/R9.htm; SEC EDGAR, CIK 1401521 filing (2014) note on statutory vs GAAP differences, surplus notes (fetched 2026-10-10), sha256:2b6c27d739b4b61513d3f3c1300fb55a5661fb23009771aac560c0de293d30f9 — https://www.sec.gov/Archives/edgar/data/1401521/000140152114000125/R13.htm
- note: Medium for the reasons given earlier (rank-3 sources for GAAP credit losses and surplus notes). No open findings.
