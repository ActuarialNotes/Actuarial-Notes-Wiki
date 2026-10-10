---
target: Concepts/Universal Life Insurance.md
created: 2026-10-10
---

## [F-001] Corridor factor named differently from the exam's convention
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- severity: major
- status: open
- locus: 'Corridor' bullet and the example 'Type A Account Value With the Corridor Check'
- claim: The death benefit must be at least (1 + gamma_t)AV_t; the example calls gamma_t = 1.5 'the corridor factor' (so DB >= 2.5 AV).
- evidence: SOA ALTAM Notation and Terminology note (2025-12) p.5, UL convention (ix): 'given a corridor factor c, the Death Benefit at t must be at least c x the Account Value at t' (sha256:8483e162...). The exam uses it that way: ALTAM sample Q53 gives 'The corridor factor in year 1 is 2.2' (questions p.97) and the solution charges the corridor CoI on 1.2 AV1, i.e. DB = 2.2 AV (solutions p.105, read as an image; sha256:3e52f41d...); Q50 gives 'Corridor Factor 1.5'. A candidate who learns from the page that the corridor factor is the gamma in (1 + gamma)AV adds 1 to the exam's 2.2 and gets DB = 3.2 AV. The page's arithmetic is internally consistent (DB = 2.5 AV, amount at risk 1.5 AV), only the name of the factor conflicts.
- source_rank: 1
- proposed_action: State the corridor as DB_t >= c_t AV_t with c_t the corridor factor, and give the example's factor as c_t = 2.5 (check 2.5 x 22,998.85 = 57,497). Transcription of the exam's notation; the example's numbers do not change.
- applied: true
- fingerprint: 1a36e2786a0c

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Corrected in the working tree to the ALTAM notation note's convention: the Corridor bullet now reads 'at least c_t AV_t, where c_t is the corridor factor; when this binds, DB_t = c_t AV_t replaces FA', the example gives 'the corridor factor is c_t = 2.5', and the check reads 2.5(22,998.85) = 57,497 < 150,000. The example's amounts are unchanged (DB 2.5 AV, CoI recomputed on 1.5 AV).

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: AV recursion and CoI = q* v_q (DB - AV) against ALTAM sample solutions Q52-Q53 (read as images); Type A/B, corridor factor, cash value = AV - SC, reserves = AV unless NLG against the ALTAM notation note; CoI discounted at i_q not the credited rate (Q53: v4% vs 5%); corridor test on year-end AV (Q53 uses AV1); NLG reserve (Q53(d)); profit test on the insurer's own assumptions (Q52 grader comment). Corridor's tax role against IRC 7702(d). Product bullet against the Illinois reprint and NAIC guide p.5. Both examples recomputed before reading the answers: CoI 384.62, AV1 6,798.13 (6,798.127), DB 106,798.13; Type A k = 0.0057143, AV_t 22,998.85, CoI 725.72, corridor check 57,497. ALTAM tip against the ALTAM syllabus topic 6 and the sample questions' spreadsheet format; DISC tip against syllabus 7b.
- sources_checked: SOA ALTAM Notation and Terminology note (2025-12), Universal Life conventions (ix) corridor factor c: death benefit at least c x account value; (xi) Type A fixed death benefit; (xii) Type B fixed additional death benefit; (xiii) cash value = AV less surrender penalty; (xiv) reserves = AV unless no-lapse guarantee, PDF pp.4-5, sha256:8483e16282f8855d2cb01b174eacd5a89e3049543a460b87d97eb180fceb8f0a — https://www.soa.org/globalassets/assets/files/edu/2026/spring/intro-note/2025-12-altam-notation.pdf; SOA ALTAM Sample Written-Answer Questions (2026-01), Q50 (Type A, corridor factor 1.5) p.91 and Q53 (Type A, COI at i_q = 4% vs credited 5%, corridor factor 2.2, surrender charge, no-lapse guarantee reserve) pp.97-98, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA ALTAM Sample Solutions (2026-01), Q52 (Type B: COI = 0.005(100,000)v; profit test uses its own expense assumptions) p.104 and Q53 (CoI = 1.2 q50 (100,000 - AV1) v4%; corridor CoI on 1.2 AV1 for factor 2.2; CV = AV - SC; NLG reserve) p.105, pages read as images, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf; SOA ALTAM Syllabus (2026-10), Topic 6 Universal Life (Type A/B account values, no-lapse guarantee reserves, deterministic profit testing) and Topic 4, PDF pp.3-5, sha256:44b64a78219337f43387cb52837c7c2ce590ae2b97321d6e8e4e29ab2cd38c5e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-altam-syllabus.pdf; 26 U.S.C. §7702(a)(2)(B) and (d) cash value corridor (LII), sha256:ee38315f50c073617c2bce50a8f97687453b2096f68d576e7339fef3671d5d81 — https://www.law.cornell.edu/uscode/text/26/7702; NAIC Life Insurance Buyer's Guide as adopted at Ill. Admin. Code tit. 50, pt. 930, exh. B (LII), sections Term Insurance (renewal, conversion even if not in good health, largest protection per premium dollar), Cash Value Life Insurance (policy loans; unpaid loan and interest subtracted from benefits or cash value), Whole Life (lifetime if premiums paid; same premium; limited-pay to age 65 higher), Universal Life (flexible premiums and face amount; account falls, coverage ends unless more paid or benefit lowered; increases may need proof), sha256:63fd04a11145a404600bda86539dfb0b5d0ca3d26d2ccba09323a3ff7f261ab7 — https://www.law.cornell.edu/regulations/illinois/Ill-Admin-Code-tit-50-930-Exhibit-B; NAIC, Life Insurance Buyer's Guide (c)2026, p.5 (term vs cash value; renewable vs nonrenewable term; whole life set premium schedule vs universal life flexible premiums) and p.6 (most term policies have no cash value), sha256:c7439cde01522328eca7eab1a7323e5ca193ed8af7d21deb80bda6ae9f36837a — https://content.naic.org/sites/default/files/publication-lig-lp-consumer-life.pdf; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: Verified high after fixing F-001 (corridor factor renamed to the exam's c, applied and resolved this run). Every substantive claim checks against the SOA's ALTAM notation note and sample solutions (rank 1), state-adopted NAIC guide text, and the Internal Revenue Code.
