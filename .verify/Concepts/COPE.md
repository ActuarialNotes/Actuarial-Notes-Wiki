---
target: Concepts/COPE.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: acronym and the four elements against IRMI; six ISO CLM construction classes and codes 1-6 against Verisk p.2; 4-digit CSP occupancy codes; FSRS 10/50/40/5.5 = 105.5 points; score bands 90+ ... 0-9.99 = Classes 1-10 after minimum criteria; split classes 4/4X-4/4Y, 5 road miles, 1,000 ft, X/Y replace 9/8B; NFPA 91%, 87%, 95% vs 73%, 64% shut off; all three examples worked blind (A JM2, B NC3, C FR6, D Frame1; 63.40 -> Class 4, A 4, B 4X/4Y, C 10)
- sources_checked: IRMI Glossary, 'construction, occupancy, protection, and exposure (COPE)', entry, sha256:ea50c61618dbbaca26029ea3116e38d8f76f12e2a959a9fee2a939aa54c6c035 — https://www.irmi.com/term/insurance-definitions/cope; Verisk, Building Fundamentals sample report (ISO CLM construction classes 1-6, CSP occupancy codes, PPC), p.2 ISO Construction Class, Occupancy, PPC, sha256:ec0d18b4de14f24ce24f64c12aa59d49cf84cd6579bc72a80539aec9c44abff7 — https://www.verisk.com/49ba9b/siteassets/media/downloads/commercial-property/building-fundamentals-report.pdf; Verisk ISO Mitigation, PPC program page, entry, sha256:b5fbc3d99b2fc0609bcefbe9be85c7d295aeb2ca552a9ee106b2ce82bad2a873 — https://www.isomitigation.com/ppc/; Verisk ISO Mitigation, 'How the PPC Program Works', entry, sha256:e7b86d0083e066bfb8e97f6f159812abb8258368c0bd9b0104930b8cb57462df — https://www.isomitigation.com/ppc/program-works/; Verisk ISO Mitigation, 'Fire Suppression Rating Schedule', entry, sha256:d6bb347922d8dfc4699c1806bf0cfc4fdc78f0c02b63cad70bbe4e3a93cd6a62 — https://www.isomitigation.com/ppc/fsrs/; Verisk ISO Mitigation, 'Scores and PPC Ratings', entry, sha256:4dc8a5df7de6acd02ca0a768ef688ded26c994b46ac7d7baf0922fdab747a9d4 — https://www.isomitigation.com/ppc/program-works/scores-and-ppc-ratings/; Verisk ISO Mitigation, 'Split Classifications', entry, sha256:97d23bc95c64d3e50a71e9e0162445f52ccb7f4642ca677bb14f7bab50b155d9 — https://www.isomitigation.com/ppc/program-works/split-classifications/; NFPA One-Stop Data Shop fact sheet 'U.S. Experience with Sprinklers' (2004-2008 data), pp.1-2, sha256:2e411c9a24fcc9f5d04dc3aeca23c8c78ce347a6dad1bbbd356d0eeddcc7a3a0 — https://www.windsorfire.com/wp-content/uploads/sprinkler-fact-sheet.pdf
- note: All numbers check against Verisk (ISO's own PPC and CLM material) and NFPA; the COPE framing rests on IRMI (rank 3), hence medium. The page simplifies ISO's tiered minimum criteria (Class 9 / 8B / 8 or better) to one 'minimum criteria' gate; not wrong, noted.
