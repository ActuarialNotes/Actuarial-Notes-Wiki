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

## [F-003] Expense example: 5V^g and the difference mis-rounded
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T19:40Z/7d25
- date: 2026-10-31
- severity: minor
- status: open
- locus: Example 'Expense Policy Value for Whole Life', answer: direct 5V^e line and the check sentence
- claim: 5V^e = 15.16 + (50 + 14.92 - 89.95)(17.8162) = -430.8; 5V^g = 100,100(0.15161) + (50 + 0.02G - G)(17.8162) = 3,045.0; difference -430.8.
- evidence: Inputs diffed against SOA FAM Tables SULT p.20: A40 = 0.12106, a..40 = 18.4578, A45 = 0.15161, a..45 = 17.8162 (all match). Independent recomputation before reading the page: P = 655.874, G = (100,100 A40 + 500 + 50(a..40 - 1))/(0.98 a..40) = 745.827, EPV0(expenses) = 1,660.32, P^e = 89.952 = G - P, 5V^n = 3,475.81, 5V^g = 3,044.93 (3,044.86 with G rounded to 745.83), 5V^e = -430.88. Hartman Stat344 ch.7 slide 20 prints 3,044.87 and -431.02 for the same data. 3,045.0 is not reproduced at any rounding of G, and the -430.8 direct value only comes from rounding 0.02G and P^e to two places before multiplying by 17.8162.
- source_rank: 3
- proposed_action: Write 5V^g = 3,044.9 and the difference -430.9; carry 0.02G = 14.917 and P^e = 89.952 in the direct line so it gives -430.9.
- applied: true
- fingerprint: df7584fe12a6

## [F-004] Sign bullet overstates what creates the expense policy value
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T19:40Z/7d25
- date: 2026-10-31
- severity: minor
- status: open
- locus: Bullet 'Sign of the expense policy value', sentences 2-3
- claim: Only the initial expense in excess of the renewal level does [add to the expense policy value]. The loadings repay that excess over the premium term, so the expense policy value is negative after issue.
- evidence: SOA FAM sample solution Q7.6 p.68: 'expenses that are level throughout create no expense policy value (the level expense premium equals the actual expenses). Therefore, the expense policy value in this case is created entirely from the extra first year expenses' -- 'in this case', where the only non-level expense is the first-year extra. Hartman Stat344 ch.7 slide 19: because loadings are level and expenses are incurred disproportionately at the beginning, the expense reserve 'will typically be negative at positive durations'. The page's own Hartman example has a $100 claim expense contributing +15.16 to 5V^e, which the 'only' sentence denies.
- source_rank: 1
- proposed_action: Restate to the two sources: level expenses create no expense policy value; when the only non-level expense is the extra at issue, it creates the whole expense policy value; typically negative at positive durations.
- applied: true
- fingerprint: e24a2a0fa6b0

## [F-005] NAAR = b needs no claim expense
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T19:40Z/7d25
- date: 2026-10-31
- severity: minor
- status: open
- locus: Bullet 'Net amount at risk', last sentence
- claim: When the death benefit is a fixed amount b plus the end-of-year policy value, the net amount at risk is just b ... recursion (tV + P_t - e_t)(1+i_t) = t+1V + q b.
- evidence: Valdez STT456 Weeks 2-4 slide 26 defines the net amount at risk as B_{t+1} + E_{t+1} - t+1V; with B = b + t+1V it is b + E_{t+1}, so it is b only when E_{t+1} = 0. SOA FAM sample Q7.26 (question p.115, solution p.77) is the case with no claim expense and writes 1V = (0V + P)(1+i) - q_x(25,000), which the page's form reproduces.
- source_rank: 1
- proposed_action: Add the condition 'and no claim expense is paid'.
- applied: true
- fingerprint: 651f44f11cc6

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T19:40Z/7d25
- date: 2026-10-31
- resolves: F-003
- status: resolved
- note: Corrected in this pass: 5V^g = 3,044.9 (Hartman slide 20 prints 3,044.87), difference -430.9, direct line carries 14.917 and 89.952 and now gives -430.9; recomputation reproduces every figure on the example.

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T19:40Z/7d25
- date: 2026-10-31
- resolves: F-004
- status: resolved
- note: Restated in this pass to SOA Q7.6 p.68 (level expenses create no expense policy value; with only the first-year extra non-level it is created entirely by that extra) and Hartman slide 19 (typically negative at positive durations; DAC). No new content beyond those two statements.

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T19:40Z/7d25
- date: 2026-10-31
- resolves: F-005
- status: resolved
- note: Condition 'and no claim expense is paid' added; the sentence now matches Valdez slide 26's NAAR with E = 0 and SOA Q7.26's solution.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T19:40Z/7d25
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: independent recomputation of the new expense example before reading its figures; SULT inputs diffed against FAM tables; each new bullet (expense policy value, expense premium, level expense premium, sign/DAC, expense PV after issue, NAAR, one-year change of basis) read against Hartman ch.7 slide 19, Valdez slide 26 and SOA solutions Q7.6, Q7.10, Q7.26, Q7.31, Q7.36; re-read of the rest of the page (verified in run 182f) for consistency; linking exams (FAM, ALTAM, CP-321, ACIA-Capstone) none ready
- sources_checked: B. Hartman, Stat 344 Life Contingencies I, Chapter 7: Policy values / Reserves (BYU lecture notes), slides 13, 19-20, sha256:4a7db0e5fc0d829fd275b0e3f1de1f45217199b6e9722b8ee60252ee57c38785 — https://hartman.byu.edu/docs/344Files/Stat344_Chapter7.pdf; E. Valdez, STT 456 Policy Values lecture slides (Michigan State, Spring 2015), slides 22, 25-26, sha256:3ace4861349a3e83d119f5e4b1490970d1fc3dc70409fc2213e0584b1c255a5f — https://users.math.msu.edu/users/valdezea/stt456s15/STT456Weeks2to4-S2015.pdf; SOA Exam FAM Sample Solutions, Topics 7-10 (version Aug 18, 2026), Q7.6 pp.67-68; Q7.10 p.70; Q7.26 p.77; Q7.31 p.80; Q7.36 p.81, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf; SOA Exam FAM Sample Questions, Topics 7-10 (version Aug 18, 2026), Q7.26 p.115; Q1.1-1.2 p.3, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Tables for Exam FAM, Standard Ultimate Life Table p.20 (x = 40, 45), sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf
- note: Expense policy value = EPV future expenses - EPV future expense premiums: SOA Q7.6 p.67 word for word, Hartman slide 19 ('expense loadings'). P^e = G - P and V^g = V^n + V^e with equivalence-principle G on the same basis: Q7.6 p.67 and Q7.10 p.70 (both routes). P^e = EPV0(expenses)/a..: Q7.6 p.67 (251.97/17.8162) and Q7.10 p.70. tV^e = (e - P^e) a.. : Q7.10 p.70 (whole life, 5V^e = [0.02G + 50]a..50 - P^e a..50) and Q7.31 p.80 (last year, 2V^e = 0.08G + 5 - P^e); the n-year form is those two instances in one formula. NAAR: Valdez slide 26. b + V benefit: Q7.26 p.77. One-year change of basis: Q7.36 p.81 (no change to 9V; subtract the two recursions; P - e cancels; 8V' - 8V = v(dq)(1000 - 9V) numerically) -- the page's symbolic form is that worked instance generalised via the Valdez recursion. Example recomputed: P 655.87, G 745.83, P^e 89.95, 5V^n 3,475.8, 5V^g 3,044.9, 5V^e -430.9 vs Hartman's -431.02 from unrounded tables. Three minor findings fixed (F-003-F-005).
