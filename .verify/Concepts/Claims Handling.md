---
target: Concepts/Claims Handling.md
created: 2026-10-10
---

## [F-001] U.S. page links Canadian-framed regulation and bad-faith pages
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- severity: minor
- status: open
- locus: Regulatory compliance bullet
- claim: The bullet on U.S. state unfair claims laws links [[Market Conduct Regulation|market conduct regulation]], [[Duty of Good Faith]] and [[Bad Faith Damages|bad faith damages]].
- evidence: Concepts/Market Conduct Regulation.md opens 'provincial supervision ... fair treatment of customers ... CCIR/CISRO' and Concepts/Bad Faith Damages.md leads with Whiten v. Pilot (SCC 2002); both are Canadian. The vault has a U.S. page, Concepts/State Market Conduct Regulation.md. NAIC Model #900's prefatory note ties the act to U.S. state market conduct surveillance (rank 1).
- source_rank: 1
- proposed_action: Point the market conduct link at [[State Market Conduct Regulation]] and the bad-faith link at a U.S. treatment (or add a U.S. section to Bad Faith Damages).
- applied: false
- fingerprint: 36c8da692d92

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Two goals of the claim function, structure (home/regional/branch offices, settlement authority, examiners), personnel (staff, independent, public adjusters, producers with settlement authority) against the UNI course handout, Baranoff §7.3 and IRMI; TPA against IRMI; regulatory bullet against NAIC #900/#902 and the UNI handout (market conduct investigations); reservation of rights against IRMI; activities against #902. Recomputed both examples (18,400-1,000=17,400; closure 95%/80%, average 6,000/5,000, LAE ratio 10.5%/10.0%). Links validated.
- sources_checked: Thompson, Insurance Operations – Claim Procedures and the Claim Adjustment Process (University of Northern Iowa course handout), pp.1–6: two goals of the claim function, users of claim information, regulators and market conduct, centralized/decentralized structure, settlement authority, staff/independent/public adjusters, producers, sha256:5ed85a349071117ddd86bbc495947689c0893f562bc2ada8c6e3db160fd42663 — https://sites.uni.edu/thompsona/Claims%20Settlement.pdf; Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals (Saylor, CC BY-NC-SA), §7.3 'Claims Adjusting', sha256:85078f2f0eb5eeae7a77d336f6f5ff14be25519272bfc27d528e037c21424877 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-03-insurance-operations-reinsuran.html; NAIC Unfair Claims Settlement Practices Act, Model #900 (Jan 1997 printing), §§1, 3, 4A–N, 5, 6A–B, 7, prefatory note, pp.1–4, sha256:ba1d03c3819ae83500abaa0d6f50bba07a896d4be0ba26b84405095c131f6ba2 — https://content.naic.org/sites/default/files/model-law-900.pdf; NAIC Unfair Property/Casualty Claims Settlement Practices Model Regulation, Model #902 (Jul 1997 printing), §§2–9, pp.1–9, sha256:f33578860a5603a165819316747c996514340f371ca42f77f00621e3b3d41f55 — https://content.naic.org/sites/default/files/model-law-902.pdf; IRMI glossary, 'public adjuster', sha256:6934eb75ad50a658e817742bdf8d2aa93c6639db79c1b978efeeeede59f5fe9b — https://www.irmi.com/term/insurance-definitions/public-adjuster; IRMI glossary, 'independent adjuster', sha256:387b879559e3a86f84b47d427855060a9b79408697bdd304ce0ec924e92e04b7 — https://www.irmi.com/term/insurance-definitions/independent-adjuster; IRMI glossary, 'third party administrator', sha256:e4af3726554996be51cc3d5c9be30579346c584daa43e4438b5ade6f01d735e5 — https://www.irmi.com/term/insurance-definitions/third-party-administrator; IRMI glossary, 'claims adjuster', sha256:0b5580c20339c7bd76af212b03d797d9c496612b5c0512835156ccd294e9f1cb — https://www.irmi.com/term/insurance-definitions/claims-adjuster; IRMI glossary, 'claims audit', sha256:1196943c53782d496a35da951b9cd866034dad145f6360543813ce6f5466957d — https://www.irmi.com/term/insurance-definitions/claims-audit; IRMI glossary, 'reservation of rights', sha256:ada48198a157a8c1c8d24b80c061118d4ac01e8fdc21df0f28d2cba0746333b4 — https://www.irmi.com/term/insurance-definitions/reservation-of-rights
- note: Medium: rank-3 references (university handout, IRMI, Baranoff) with the NAIC models; the closure-rate and LAE-ratio formulas are page-defined illustrations of the performance measures, consistent with IRMI 'claims audit'. One minor finding open (Canadian link targets).

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Market conduct link retargeted to [[State Market Conduct Regulation]]; the Duty of Good Faith and Bad Faith Damages links dropped, words kept (they state no Canadian law).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Re-verify after the link change only; content unchanged from this run's earlier pass (two goals, structure, personnel, regulatory compliance, activities; examples 17,400 and 95%/80%, 6,000/5,000, 10.5%/10.0%).
- sources_checked: Thompson, Insurance Operations – Claim Procedures and the Claim Adjustment Process (University of Northern Iowa course handout), pp.1–6: two goals of the claim function, users of claim information, regulators and market conduct, centralized/decentralized structure, settlement authority, staff/independent/public adjusters, producers, sha256:5ed85a349071117ddd86bbc495947689c0893f562bc2ada8c6e3db160fd42663 — https://sites.uni.edu/thompsona/Claims%20Settlement.pdf; Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals (Saylor, CC BY-NC-SA), §7.3 'Claims Adjusting', sha256:85078f2f0eb5eeae7a77d336f6f5ff14be25519272bfc27d528e037c21424877 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-03-insurance-operations-reinsuran.html; NAIC Unfair Claims Settlement Practices Act, Model #900 (Jan 1997 printing), §§1, 3, 4A–N, 5, 6A–B, 7, prefatory note, pp.1–4, sha256:ba1d03c3819ae83500abaa0d6f50bba07a896d4be0ba26b84405095c131f6ba2 — https://content.naic.org/sites/default/files/model-law-900.pdf; NAIC Unfair Property/Casualty Claims Settlement Practices Model Regulation, Model #902 (Jul 1997 printing), §§2–9, pp.1–9, sha256:f33578860a5603a165819316747c996514340f371ca42f77f00621e3b3d41f55 — https://content.naic.org/sites/default/files/model-law-902.pdf; IRMI glossary, 'public adjuster', sha256:6934eb75ad50a658e817742bdf8d2aa93c6639db79c1b978efeeeede59f5fe9b — https://www.irmi.com/term/insurance-definitions/public-adjuster; IRMI glossary, 'independent adjuster', sha256:387b879559e3a86f84b47d427855060a9b79408697bdd304ce0ec924e92e04b7 — https://www.irmi.com/term/insurance-definitions/independent-adjuster; IRMI glossary, 'third party administrator', sha256:e4af3726554996be51cc3d5c9be30579346c584daa43e4438b5ade6f01d735e5 — https://www.irmi.com/term/insurance-definitions/third-party-administrator; IRMI glossary, 'claims adjuster', sha256:0b5580c20339c7bd76af212b03d797d9c496612b5c0512835156ccd294e9f1cb — https://www.irmi.com/term/insurance-definitions/claims-adjuster; IRMI glossary, 'claims audit', sha256:1196943c53782d496a35da951b9cd866034dad145f6360543813ce6f5466957d — https://www.irmi.com/term/insurance-definitions/claims-audit; IRMI glossary, 'reservation of rights', sha256:ada48198a157a8c1c8d24b80c061118d4ac01e8fdc21df0f28d2cba0746333b4 — https://www.irmi.com/term/insurance-definitions/reservation-of-rights
- note: Medium.
