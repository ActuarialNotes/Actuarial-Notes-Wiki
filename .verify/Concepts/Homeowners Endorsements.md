---
target: Concepts/Homeowners Endorsements.md
created: 2026-10-10
---

## [F-001] HO 24 75 described more broadly than the source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv09
- date: 2026-10-10
- severity: minor
- status: open
- locus: 'Others' bullet, HO 24 75
- claim: watercraft (HO 24 75) for boats over the Section II horsepower and length thresholds
- evidence: PF&M, ISO Homeowners Optional Coverage Endorsements (July 2014), entry HO 24 75: 'provides liability coverage for a described watercraft with outboard motor or combination of outboard motors of more than 25 total horsepower and described sailing vessels ... Coverage for other boat types is available under yacht policies.' Section II's thresholds also include inboard engines over 50 hp (HO 00 03 05 11 Section II Exclusion B.2.c(1), p.18), which the source does not place under HO 24 75. No ISO HO 24 75 specimen was read this run.
- source_rank: 3
- proposed_action: Narrow to 'described outboard boats over 25 total horsepower and described sailing vessels', or check an ISO HO 24 75 specimen.
- applied: false
- fingerprint: 2510c237e815

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv09
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: every rule, number and list checked against the cited form text; worked examples recomputed; links resolve; U.S. framing; exam-section references checked against Exam DISC-IA (CAS).md
- sources_checked: ISO HO 04 54 10 00 Earthquake (© ISO 1999), A–D, p.1, sha256:482ba852fa920fddc10d71f40081a7f0b4f696c9a8a0680a08a7e7787c4998f1 — https://soi.policyport.com/wp-content/uploads/2018/04/HO-04-54-10-00.pdf; ISO HO 04 42 10 00 Permitted Incidental Occupancies (© ISO 1999), Sections I and II, p.1, sha256:89d06b98eeaae4308e3614f7eea1aa113622835c63397b912aca06b8c69991cd — https://soi.policyport.com/wp-content/uploads/2018/04/HO-04-42-10-00.pdf; ISO HO 04 77 10 00 Ordinance Or Law Increased Amount Of Coverage (© ISO 1999), p.1, sha256:7494ac8507e7e3e28492c8367e5c9d3383f46ab58b41a43ffd07c4114ab65f2a — https://www.iiat.org/uploads/files/general/InfoCentral/Homeowners/h04771000.pdf; ISO HO 24 82 04 91 Personal Injury (© ISO 1990; Auto Club forms index copy), whole form, sha256:7f6262e729c9c3bf94aaa21cc174fd32265920cbb4dc494af4ad7a6d429c0a01 — https://services.autoclubmo.aaa.com/InsuranceAux/Forms/IN/HomeOwners/HO248204-91.html; ISO HO 04 90 04 91 Personal Property Replacement Cost (© ISO 1990; Auto Club forms index copy), paragraphs 1–2, sha256:869c43c273d3f479e07e17436267f6a0826ed0b772e49f3f41eaae2427203790 — https://services.autoclubmo.aaa.com/InsuranceAux/Forms/AR/HomeOwners/HO049004-91.html; Auto Club Family Ins. Co. CO 04 90 07 05 Personal Property Replacement Cost (includes ISO material), paragraphs 1–2, sha256:c26f3d8c14eae615b11df8fdedb8247b4a65e38d317a1e07054a53a00a26c476 — https://services.autoclubmo.aaa.com/InsuranceAux/Forms/AR/HomeOwners/CO049007-05.html; Auto Club CO 04 95 11 03 Water Back Up and Sump Overflow (includes ISO material © 1992), paragraphs 1–4, sha256:3ffc9e81782703c089c92ff24f282272c4dcbf28f54ca53847f7dfa1d527fe23 — https://services.autoclubmo.aaa.com/InsuranceAux/Forms/AR/HomeOwners/CO049511-03.html; PF&M, HO 04 61 Scheduled Personal Property Endorsement (July 2017), Classes, Newly Acquired, Perils, Loss Settlement, sha256:66876bbc748c7b6b2a29da3994ff0cfa3e064e29abc648d00d17aa54ea42c853 — https://www.aeblyandassociates.com/Portals/0/ISO%20Scheduled%20Personal%20Property.pdf; PF&M Analysis, ISO Homeowners Optional Coverage Endorsements (July 2014), entries HO 04 20, 04 55, 04 60, 04 65/66, 04 90, 04 95, 07 01, 24 10, 24 75, 24 77, sha256:30d362c5d7646426712b329f7fcc730c605eecad660479b01d5b9dbda2ffe11c — https://wvohoa.org/wp-content/uploads/2017/06/2014_HomeownersOptionalCoverageInsurance.pdf (host answered 403 to a direct fetch this run; read from a byte-identical copy, sha256 verified); ISO Homeowners 3 – Special Form HO 00 03 05 11 (Maine Bureau of Insurance copy), Coverage C 3–4, Additional Coverage E.11, Section I Exclusions A.2–A.3, Section II E.2, pp.4–5, 8, 12, 19, sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf
- note: Earthquake, permitted incidental occupancies, ordinance or law and personal injury checked against ISO form text (HO 04 54/04 42/04 77 10 00, HO 24 82 04 91); personal property replacement cost against ISO HO 04 90 04 91 and Auto Club CO 04 90 07 05 (identical operative text); water back-up against CO 04 95 11 03; HO 04 61 against PF&M 2017; HO 04 20, 04 55, 04 60, 04 65/66, 07 01, 24 10, 24 77 against PF&M 2014 (rank 3). The endorsement editions read are 2000-program or older, as the page says for HO 04 54. Examples recompute (71,000; 40,000 vs 100,000). One minor open finding on HO 24 75.
