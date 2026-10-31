---
target: Concepts/Policy Value.md
created: 2026-10-31
---

## [F-001] Unsourced causal claim about why the policy value is prospective
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:53Z/182f
- date: 2026-10-31
- severity: minor
- status: open
- locus: Retrospective form bullet, last clause
- claim: '... which is why the policy value is defined prospectively.'
- evidence: Hartman Stat344 ch.7 slides 24-25 give the retrospective form and state that it equals the prospective value only when the premium is by the equivalence principle and the premium basis is the policy value basis, but give no such reason for the prospective definition; Valdez Weeks2-4 slides 2, 6 define the policy value as E[L_t] and mark the retrospective calculation 'not emphasized'. No source read this session states the causal link. AMLCR itself was not read (commercial).
- source_rank: 3
- proposed_action: Delete the clause; the equality conditions stay, as Hartman states them.
- applied: true
- fingerprint: 887305261a8b

## [F-002] 'The usual approximation' for mid-year policy values is unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:53Z/182f
- date: 2026-10-31
- severity: minor
- status: open
- locus: Between premium dates bullet, last clause
- claim: '... and linear interpolation between tV + P_t - e_t and t+1V is the usual approximation.'
- evidence: No open source read this session calls linear interpolation the usual approximation. Hartman Stat344 ch.7 slide 15 cautions that the policy value is not monotonic, so interpolating between anniversary values is not expected to approximate a non-anniversary value well; Valdez Weeks2-4 slide 23 values between policy years by the exact (UDD) recursion. The exact formula on the page is consistent with Valdez's. The worked example's interpolation figure (41,126.42 vs exact 41,115.85) is arithmetic and stays.
- source_rank: 3
- proposed_action: Delete the clause; keep the exact formula.
- applied: true
- fingerprint: ea9a03be5560

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T18:53Z/182f
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Clause deleted in this pass (transcription: the bullet now says only what Hartman ch.7 slides 24-25 say).

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T18:53Z/182f
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Clause deleted in this pass; the exact part-year formula remains, and the example's comparison with linear interpolation is unchanged.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:53Z/182f
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: definition, gross/net, recursion, retrospective conditions, part-year valuation and multi-state remark against open texts; SULT inputs diffed against FAM tables; all three examples recomputed independently; exam-use bullets vs FAM and ALTAM syllabi; delta check after the two deletions
- sources_checked: SOA Exam FAM syllabus, October 2026, Topic 10 learning outcomes a-e, p.7; readings p.8, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf; E. Valdez, STT 456 Policy Values lecture slides (Michigan State, Spring 2015), after Dickson et al. ch.7, slides 6-15, 18-23, sha256:3ace4861349a3e83d119f5e4b1490970d1fc3dc70409fc2213e0584b1c255a5f — https://users.math.msu.edu/users/valdezea/stt456s15/STT456Weeks2to4-S2015.pdf; B. Hartman, Stat 344 Life Contingencies I, Chapter 7: Policy values / Reserves (BYU lecture notes), slides 9-15, 19-26, sha256:4a7db0e5fc0d829fd275b0e3f1de1f45217199b6e9722b8ee60252ee57c38785 — https://hartman.byu.edu/docs/344Files/Stat344_Chapter7.pdf; T. Kenney, ACSC/STAT 3720 Life Contingencies I, Sample Final Examination Model Solutions (Dalhousie, Winter 2015), Q10-Q11 p.4, sha256:a9f3a695594735928e7c218ee37f553aefcf194338bcc388ac488b811a8cee11 — https://www.mscs.dal.ca/~tkenney/3720/2016/PracticeFinalSols.pdf; SOA Exam FAM Sample Questions, Topics 7-10 (version Aug 18, 2026), Q6.4, Q6.6, Q6.17, Q7.13, Q7.17, Q7.40 (pp.52-53, 63, 103, 106, 125), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM Sample Solutions, Topics 7-10, Q5.5 p.29; Q6.4 p.35; Q6.6 p.36; Q7.13 p.71; Q7.16-7.17 p.73; Q7.40 p.82, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf; SOA Tables for Exam FAM, Standard Ultimate Life Table pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf; SOA ALTAM Sample Written-Answer Solutions (Jan 2026), Q19 pp.35-36 (last-survivor premium payable while both alive; policy values by state), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf; SOA Exam ALTAM syllabus, October 2026, Topics 2-3 learning outcomes, pp.2-3, sha256:44b64a78219337f43387cb52837c7c2ce590ae2b97321d6e8e4e29ab2cd38c5e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-altam-syllabus.pdf
- note: Recursion (tV + P_t - e_t)(1+i_t) = q(S_{t+1}+E_{t+1}) + p t+1V is Hartman ch.7 slide 13 word for word in notation (and Valdez Weeks2-4 slide 22); gross vs net and 'net premium recomputed on the valuation basis' match Valdez Weeks1-2 slide 2, Weeks2-4 slides 6-7 and Kenney's Dalhousie model solution Q11 p.4; retrospective equality conditions match Hartman slide 25; state-by-state policy values for joint lives match SOA ALTAM sample Q19(e) pp.35-36. FAM tables: a40:20=12.9935, A40:20=0.38126, A50:10=0.61643, a50:10=8.0550, a40:10=8.0863, 10E40=0.60920, q50=0.001209 agree with the page's more precise values. Recomputation: P=2,934.26, 10V=38,007.34 / 38,007.23 retro; gross 11V=42,095.25, 10.5V exact 41,115.85 vs interpolated 41,126.42; the given gross 10V=37,111.78 is consistent with a direct prospective value (~37,111); last-survivor state values 0, 28,571.43, 37,500.00. FAM syllabus 10c-d and ALTAM syllabus 2d, 3d support the exam bullets. Note for FAM readers: the FAM syllabus lists AMLCR ch.7 sections 1-3 (except 2.4, 2.5), 7 and 8 only; the page also serves ALTAM, so it is not trimmed to FAM's range.
