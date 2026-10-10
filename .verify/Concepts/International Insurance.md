---
target: Concepts/International Insurance.md
created: 2026-10-10
---

## [F-001] Fronting, people-abroad coverages and insurer financial considerations unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- severity: minor
- status: open
- locus: 'Admitted versus non-admitted' (language, currency, premium taxes), 'Fronting', 'Coverages for people abroad', 'Financial considerations for an insurer', currency example
- claim: Admitted policies are in local language and currency and pay local premium taxes; a fronting insurer cedes the risk and keeps a fee but stays liable; foreign voluntary workers compensation, kidnap and ransom and political risk fill gaps; an insurer abroad faces currency, licensing, capital, repatriation and tax issues.
- evidence: Swiss Re (sha256:2252d939..., 8406248f...) and Chubb (sha256:a74697f7...) confirm the controlled master program, DIC and DIL, financial interest cover paid to the parent where non-admitted cover is not permitted, the admitted/non-admitted distinction and the penalties for unlicensed carriers paying claims locally. None of them, nor anything else read, covers fronting, foreign voluntary workers compensation or the insurer-side financial considerations; GI-201's reading for those (Business Law for Insurance Professionals, Assignment 3, pp.3.29-3.39, per the GI-201 syllabus, sha256:4dbbf912...) is sold and was not read.
- source_rank: 3
- proposed_action: Source the fronting, people-abroad and financial-considerations bullets (e.g. NAIC or a regulator on fronting; a carrier's foreign voluntary WC form), then re-verify.
- applied: false
- fingerprint: d0704a93b75f

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: in_review
- checks_run: Controlled master program, DIC, DIL, financial interest cover to the parent, admitted vs non-admitted and penalties for unlicensed claim payment: Swiss Re (two pages) and Chubb, which agree. GI-201 tip against the GI-201 syllabus (outcome 1j, reading pp.3.29-3.39). Examples recomputed: local limit 4,000,000, master 4,000,000 (2,500,000 DIL + 1,500,000 DIC); currency 6,000,000 / 6,000,000 / matched 1,500,000, 20% local margin.
- sources_checked: Swiss Re Corporate Solutions, 'The importance of DIC, DIL and Financial Interest Coverage in international programs' (CMP = master policy in home country + local admitted policies; DIC/DIL respond only where a local policy exists; FINC reimburses the parent where non-admitted cover is not permitted; admitted vs non-admitted definitions), sha256:2252d9392876610ffb97be28f59f5d0f2f21de8237a33926e1dbf0bca3977c77 — https://corporatesolutions.swissre.com/insights/knowledge/importance-difference-conditions-difference-limits-financial-interest-coverage-international-programs.html; Swiss Re Corporate Solutions, 'Understanding your insurance options as a multinational' (master policy fills gaps by DIC/DIL; FINC paid to parent), sha256:8406248fd1870138166482694739422df199a0ec1e40f1faf747cfae9ba66de2 — https://corporatesolutions.swissre.com/insights/knowledge/multinational-benefits-international-program.html; Chubb, Global Risk Spotlight: Navigating the Nuances of DIC and DIL Clauses (Canada), pp.2-4 (CMP; BRIC countries prohibit non-admitted insurance; penalties for unlicensed carriers paying claims locally), sha256:a74697f7fd3f83b2c85ed987fc15e2c260f6d5d6833eaf493b6fbf46fef63d61 — https://www.chubb.com/content/dam/chubb-sites/chubb-com/ca-en/hosted-docs/multinational-page/global-risk-spotlight-navigating-the-nuances-of-dic-and-dil-clauses-canada.pdf; SOA GI-201 Syllabus (2026-2027), outcome 1j (issues regarding international business) and reading 'Financial Considerations in International Business' (Business Law for Insurance Professionals, Assignment 3, pp.3.29-3.39), PDF pp.2,5, sha256:4dbbf9122436567ff8e22809f250e5be00e12897cd6b67c6ed52e3f53e05dcc9 — https://www.soa.org/globalassets/assets/files/edu/2026/gi-201/2026-2027-gi-201-syllabus.pdf; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: In review: the DIC/DIL/FINC core checks against two independent rank-3 sources, but the fronting, people-abroad and insurer financial-considerations bullets rest on nothing read (F-001, minor); GI-201's reading for them (Business Law for Insurance Professionals) is sold and was not read. Needs a regulator or carrier source for fronting and foreign voluntary WC, then a re-pass.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Fixed in the working tree (clean-up round, lead-authorized): fronting, people-abroad and insurer financial-considerations bullets, the currency formula and example, and the fronting and currency traps deleted; admitted/non-admitted bullet restated to Swiss Re and Chubb (licence; where not permitted, no policies, premiums or claims locally; penalties for unlicensed claim payment); 'or tax' removed from the lead; GI-201 tip restated to the syllabus's outcome 1j and reading title.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Re-verify after the clean-up edits: every remaining claim (CMP, admitted/non-admitted, DIC, DIL, financial interest cover) against Swiss Re (two pages) and Chubb, which agree; GI-201 tip against the syllabus; DIC/DIL example unchanged (4,000,000 local; 4,000,000 master = 2,500,000 DIL + 1,500,000 DIC).
- sources_checked: Swiss Re Corporate Solutions, 'The importance of DIC, DIL and Financial Interest Coverage in international programs' (CMP = master policy in home country + local admitted policies; DIC/DIL respond only where a local policy exists; FINC reimburses the parent where non-admitted cover is not permitted; admitted vs non-admitted definitions), sha256:2252d9392876610ffb97be28f59f5d0f2f21de8237a33926e1dbf0bca3977c77 — https://corporatesolutions.swissre.com/insights/knowledge/importance-difference-conditions-difference-limits-financial-interest-coverage-international-programs.html; Swiss Re Corporate Solutions, 'Understanding your insurance options as a multinational' (master policy fills gaps by DIC/DIL; FINC paid to parent), sha256:8406248fd1870138166482694739422df199a0ec1e40f1faf747cfae9ba66de2 — https://corporatesolutions.swissre.com/insights/knowledge/multinational-benefits-international-program.html; Chubb, Global Risk Spotlight: Navigating the Nuances of DIC and DIL Clauses (Canada), pp.2-4 (CMP; BRIC countries prohibit non-admitted insurance; penalties for unlicensed carriers paying claims locally), sha256:a74697f7fd3f83b2c85ed987fc15e2c260f6d5d6833eaf493b6fbf46fef63d61 — https://www.chubb.com/content/dam/chubb-sites/chubb-com/ca-en/hosted-docs/multinational-page/global-risk-spotlight-navigating-the-nuances-of-dic-and-dil-clauses-canada.pdf; SOA GI-201 Syllabus (2026-2027), outcome 1j (issues regarding international business) and reading 'Financial Considerations in International Business' (Business Law for Insurance Professionals, Assignment 3, pp.3.29-3.39), PDF pp.2,5, sha256:4dbbf9122436567ff8e22809f250e5be00e12897cd6b67c6ed52e3f53e05dcc9 — https://www.soa.org/globalassets/assets/files/edu/2026/gi-201/2026-2027-gi-201-syllabus.pdf; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: F-001 resolved by deletion. Medium: uncontroversial claims on which two independent rank-3 sources agree.
