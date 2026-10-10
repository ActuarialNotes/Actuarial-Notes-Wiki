---
target: Concepts/Cyber Insurance.md
created: 2026-10-10
---

## [F-001] CGL data-disclosure exclusion is not in the base form
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- severity: minor
- status: open
- locus: 'Silent cyber' bullet ('the standard CGL has been amended to exclude claims from disclosure of confidential data')
- claim: The standard CGL has been amended to exclude claims from disclosure of confidential data.
- evidence: ISO CG 00 01 04 13 (sha256:78739f04...), the current base form, contains exclusion p. Electronic Data (loss of, damage to or inability to access electronic data) but no access-or-disclosure exclusion; a word search finds no 'Access Or Disclosure'. The ISO access/disclosure exclusion is an endorsement, not read this run. NY DFS Circular Letter 2 (2021) (sha256:9a44513...) confirms silent cyber in GL policies.
- source_rank: 2
- proposed_action: Say the CGL is commonly endorsed with an access-or-disclosure exclusion (citing it once read) rather than that the standard form was amended.
- applied: false
- fingerprint: 2b67d9290be2

## [F-002] Underwriting-controls claim not in the sources read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- severity: minor
- status: open
- locus: 'Cyber risk as a U.S. line' ('multi-factor authentication and offline backups, which underwriters now require')
- claim: Pricing relies on revenue, industry and security controls such as MFA and offline backups, which underwriters now require.
- evidence: NY DFS Circular Letter 2 (2021) (sha256:9a44513...) supports systemic risk, silent risk, and that insurers struggle to measure cyber risk, but names no specific controls; the Beazley form (sha256:f37a11b2...) and Lloyd's Y5381 (sha256:12ec2f94...) do not address underwriting. The MFA/backup requirement is unsourced here.
- source_rank: 3
- proposed_action: Cite a regulator or market source for underwriting requirements, or qualify the sentence.
- applied: false
- fingerprint: a023bb8c2dd3

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: First-party breach response services (computer expert, legal, notification, call centre, PR), data protection, cyber extortion, business interruption with a waiting period in hours (12 in the specimen), dependent BI, third-party privacy/security liability (claims-made), regulatory defense and penalties, PCI, website media liability, sublimits and retentions, war exclusion and electrical/telecom infrastructure exclusion: Beazley Breach Response (US Lloyd's form). State-backed cyber-attack exclusion: Lloyd's Y5381. Silent cyber and systemic risk: NY DFS CL 2021-02. Example recomputed before reading: 360,000 + 1,000,000 + min(2,250,000, 2,000,000) + 380,000 = 3,740,000; full loss 4,790,000; retained 1,050,000. GI-302 tip against outcome k.
- sources_checked: Beazley Breach Response policy (Certain Underwriters at Lloyd's, US, NAPA program copy), Declarations pp.1-2 (aggregate limit with regulatory sublimit; breach response services limits; retentions), Insuring Agreements A-E pp.5-7 (privacy & security liability claims-made, breach response services, regulatory, website media, PCI), Exclusion T war p.14, First Party Computer Security endorsement p.37 (cyber extortion, data protection, business interruption; 12-hour waiting period; electrical/telecom infrastructure exclusion), sha256:f37a11b2fd6e195a777b8487c8d2bdc7c044b8c33e50092b9c71d6bf88598acb — https://www.napa-benefits.org/assets/pdf/policy/cyber/cyber-1m.pdf; Lloyd's Market Bulletin Y5381, State backed cyber-attack exclusions (2022), pp.2-3, sha256:12ec2f94bc3d114ca1c1d778e9e758010e2135b153d59266260fd942ecc4102e — https://assets.lloyds.com/media/35926dc8-c885-497b-aed8-6d2f87c1415d/Y5381%20Market%20Bulletin%20-%20Cyber-attack%20exclusions.pdf; N.Y. DFS Insurance Circular Letter No. 2 (2021), Cyber Insurance Risk Framework (systemic risk, silent/non-affirmative risk in GL and other policies, ransomware), sha256:9a44513116d576f27193a32cf208509255809ec5089f522f81745dbefb84ca86 — https://www.dfs.ny.gov/industry_guidance/circular_letters/cl2021_02; ISO CG 00 01 04 13 Commercial General Liability Coverage Form, exclusion f. Pollution (pp.3-4: heating-equipment and hostile-fire exceptions; clean-up costs), g. Aircraft, p. Electronic Data (p.5); no employment-related practices, professional services or data-disclosure exclusion in the base form, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf; SOA GI-302 Syllabus (2027-07), learning outcome k (specialty coverages incl. excess, umbrella, professional liability, cyber risk, surety, terrorism), p.2, sha256:4b007f27cdfa4e554dca8638841ef73fddfcf1d0d1e3a954be6244f334c3a284 — https://www.soa.org/globalassets/assets/files/edu/2026/gi-302/2027-07-gi-302-syllabus.pdf; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: Verified medium; F-001 (minor, the CGL data-disclosure exclusion is an endorsement, not the base form) and F-002 (minor, underwriting controls unsourced) open.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Fixed in the working tree (clean-up round, lead-authorized): 'the standard CGL has been amended to exclude claims from disclosure of confidential data' replaced by 'The standard CGL form excludes damages from the loss of, or inability to access, electronic data' (CG 00 01 04 13 exclusion p.), with the silent-cyber sentence restated to NY DFS CL 2021-02 (state clearly whether cyber is covered; mitigate with reinsurance).

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- resolves: F-002
- status: resolved
- note: Fixed in the working tree (clean-up round, lead-authorized): the 'Cyber risk as a U.S. line' bullet restated to NY DFS CL 2021-02 (insurers not yet able to measure cyber risk accurately; risk driven by the insured's cybersecurity program, assessed per insured; self-propagating malware or attacks on concentrated cloud/managed service providers damage many insureds; model catastrophic events and stress test). MFA/backup requirement and 'market is young' deleted.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Re-verify after the clean-up edits: silent-cyber and U.S.-line bullets against NY DFS CL 2021-02; CGL sentence against CG 00 01 04 13 exclusion p.; the rest as in the earlier pass; example unchanged (3,740,000; 1,050,000).
- sources_checked: Beazley Breach Response policy (Certain Underwriters at Lloyd's, US, NAPA program copy), Declarations pp.1-2 (aggregate limit with regulatory sublimit; breach response services limits; retentions), Insuring Agreements A-E pp.5-7 (privacy & security liability claims-made, breach response services, regulatory, website media, PCI), Exclusion T war p.14, First Party Computer Security endorsement p.37 (cyber extortion, data protection, business interruption; 12-hour waiting period; electrical/telecom infrastructure exclusion), sha256:f37a11b2fd6e195a777b8487c8d2bdc7c044b8c33e50092b9c71d6bf88598acb — https://www.napa-benefits.org/assets/pdf/policy/cyber/cyber-1m.pdf; Lloyd's Market Bulletin Y5381, State backed cyber-attack exclusions (2022), pp.2-3, sha256:12ec2f94bc3d114ca1c1d778e9e758010e2135b153d59266260fd942ecc4102e — https://assets.lloyds.com/media/35926dc8-c885-497b-aed8-6d2f87c1415d/Y5381%20Market%20Bulletin%20-%20Cyber-attack%20exclusions.pdf; N.Y. DFS Insurance Circular Letter No. 2 (2021), Cyber Insurance Risk Framework (systemic risk, silent/non-affirmative risk in GL and other policies, ransomware), sha256:9a44513116d576f27193a32cf208509255809ec5089f522f81745dbefb84ca86 — https://www.dfs.ny.gov/industry_guidance/circular_letters/cl2021_02; ISO CG 00 01 04 13 Commercial General Liability Coverage Form, exclusion f. Pollution (pp.3-4: heating-equipment and hostile-fire exceptions; clean-up costs), g. Aircraft, p. Electronic Data (p.5); no employment-related practices, professional services or data-disclosure exclusion in the base form, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf; SOA GI-302 Syllabus (2027-07), learning outcome k (specialty coverages incl. excess, umbrella, professional liability, cyber risk, surety, terrorism), p.2, sha256:4b007f27cdfa4e554dca8638841ef73fddfcf1d0d1e3a954be6244f334c3a284 — https://www.soa.org/globalassets/assets/files/edu/2026/gi-302/2027-07-gi-302-syllabus.pdf; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: F-001 and F-002 resolved.
