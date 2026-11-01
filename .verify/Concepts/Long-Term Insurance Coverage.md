---
target: Concepts/Long-Term Insurance Coverage.md
created: 2026-10-31
---

## [F-001] Definition says the insurer cannot change a long-term coverage's terms
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:55Z/3416
- date: 2026-10-31
- severity: major
- status: open
- locus: definition, sentence 1; bullet 'What makes a coverage long-term', sentence 1
- claim: A long-term insurance coverage is one 'whose guaranteed terms the insurer cannot change while the contract is in force'; 'The terms are guaranteed, so the insurer cannot reprice when mortality, morbidity or interest rates move against it.'
- evidence: U.S. Administration for Community Living, What is long-term care insurance?: 'the insurance company may raise the premium on your policy' (and advises asking for the company's premium rate history). Long-term care is one of the coverages the page itself lists. The SOA ALTAM sample Q49 (p.89) Type B universal life credits interest at a declared rate the insurer sets year by year. AMLCR ch.1 (publisher's excerpt pp.2, 5) defines the long-term contract by its length, level premium and the weight of investment income, not by guaranteed terms. So the guarantee is not what defines the class, and is false for U.S. LTC premiums.
- source_rank: 3
- proposed_action: Delete the guarantee clause from the definition and the guarantee sentence from the bullet (transcription by deletion).
- applied: true
- fingerprint: 8a39b18f539a

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T18:55Z/3416
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Both clauses deleted in this run; the rest of the definition and bullet stand on AMLCR ch.1 pp.2, 5.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:55Z/3416
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: links read first; definition, table of coverages and risks, bullets and traps against the AMLCR ch.1 excerpt, FAM-L sample Q1.1-1.4, ALTAM sample Q1/Q16/Q27/Q49/Q53 and ACL; both examples recomputed, SULT values against the FAM tables and the SULT's Makeham law
- sources_checked: Dickson, Hardy & Waters, AMLCR 3rd ed. (CUP 2020) — publisher's excerpt, Ch. 1 §§1.1-1.3.5, pp.1-10, sha256:31487d2e0f23e14b52e889f99ea95d4e7bfe00d9059ce1796d18d15f0dc94656 — https://assets.cambridge.org/97811084/78083/excerpt/9781108478083_excerpt.pdf; SOA Exam FAM-L sample questions (Oct 2024), Q1.1-1.4, pp.3-4, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L sample solutions (Oct 2024), Q1.1-1.4, p.2, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf; SOA Exam ALTAM sample written-answer questions (Jan 2026), Q1 p.2 (LTC multiple state), Q16 p.31 (CI on diagnosis), Q49 p.89 (Type B UL, surrenders), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM sample written-answer solutions (Jan 2026), DI elimination period p.27; Markov critique p.29; Q40(a) DC description p.80; Q53 UL p.105, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf; SOA Tables for Exam FAM (Oct 2024), SULT at i=0.05, pp.20-21 (ages 50, 55, 60, 65, 70-72, 80), sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf; U.S. Administration for Community Living, What is long-term care insurance?, whole page, sha256:73e93bb3582774260ce46b93582e373816335198ffc595fb057b58bdc0dc2c59 — https://acl.gov/ltc/costs-and-who-pays/what-is-long-term-care-insurance; SOA Exam FAM syllabus, October 2026, Readings, p.8; Topics 5 and 7, pp.5-6, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf; U.S. Department of Labor, Types of Retirement Plans (https://www.dol.gov/general/topic/retirement/typesofplans), read 2026-10-31 by web fetch; no sha256 — the site refuses scripted downloads
- note: Term (lapse, family protection), whole life (investment income, interest spread), endowment (100% payout, so interest) and the short-term/assessmentism contrast: AMLCR ch.1 pp.2-9. Disability income (income while unable to work): FAM-L Q1.4; LTC (services for activities of daily living): ACL and ALTAM Q1; CI lump sum on diagnosis: ALTAM Q16; UL death benefit plus credited account value, surrender: ALTAM Q49/Q53; long-term health in multiple state models: ALTAM syllabus and Q1/Q16/Q27; ALTAM's Markov critique by duration since transition: ALTAM solutions p.29. FAM tip: FAM syllabus Topic 7(b). Example 1 recomputed: SULT q50 0.001209, q60 0.003398, q70 0.010413, q80 0.032658, q71 0.011670, q72 0.013081 all in the FAM tables pp.20-21; P = 100,000*0.18931/17.0245 = 1,111.99; costs 115.14 / 323.62 / 991.71 / 3,110.29 / 1,111.43 / 1,245.81; crossing at 72. Example 2: at 5% a65 = 13.5498, A65 = 0.35477, q65 = 0.005915 (FAM tables); the 4% values 14.8746 / 0.42790 are not tabulated, recomputed from the SULT Makeham law (A=0.00022, B=2.7e-6, c=1.124), which reproduces the 5% table values exactly; changes +9.8%, +20.6%, +1.0%. One major finding fixed by deletion. Rule 6: unverified for every exam linking it (FAM, ALTAM, CP-312, CP-321, GH-201C); no re-check owed.
