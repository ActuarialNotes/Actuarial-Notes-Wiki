---
target: Concepts/Extra Risk.md
created: 2026-10-31
---

## [F-001] Pairing the constant multiple with medical impairment is unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:53Z/182f
- date: 2026-10-31
- severity: minor
- status: open
- locus: Constant multiple bullet, first sentence
- claim: '... so it grows steeply with age, which suits a medical impairment.'
- evidence: Valdez Weeks1-2 slide 16 introduces all three methods for 'an impaired individual, or one who suffers from a medical condition', without assigning medical impairment to the constant multiple; Lim's Extra Risk page uses an impaired life as its example of an age rating. No source read this session ties medical impairment to the multiple specifically. (The constant addition's pairing with an age-independent risk is sourced: Lim, and Kenney Q10's 'dangerous hobbies'.)
- source_rank: 3
- proposed_action: Delete the clause.
- applied: true
- fingerprint: 5a2e8d5d96c5

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T18:53Z/182f
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Clause deleted in this pass.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:53Z/182f
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: three methods vs FAM syllabus 10e and open texts; formulas vs Valdez, Lim, Kenney and SOA FAM sample solutions; SULT inputs diffed against FAM tables; both examples and every trap figure recomputed independently; delta check after the deletion
- sources_checked: SOA Exam FAM syllabus, October 2026, Topic 10 learning outcomes a-e, p.7; readings p.8, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf; E. Valdez, STT 456 Premium Calculation lecture slides (Michigan State, Spring 2015), after Dickson et al. ch.6, slides 4-8, 16, 18, sha256:7b4af6694606f8ee6a4ad037032100e510c0f7d382d2f47d6f85044cff02cc98 — https://users.math.msu.edu/users/valdezea/stt456s15/STT456Weeks1to2-S2015.pdf; T. Lim, Solving Actuarial Math with Python — Extra Risk, Extra Risk: age rating, multiple of mortality rate, force of mortality, sha256:e14f33d24c686fed4e9db3ad5a3f6e0e70e4941216c11499c89e28a8d7d3b55d — https://actuarialmath-guide.readthedocs.io/en/latest/extrarisk.html; T. Kenney, ACSC/STAT 3720 Life Contingencies I, Sample Final Examination Model Solutions (Dalhousie, Winter 2015), Q10-Q11 p.4, sha256:a9f3a695594735928e7c218ee37f553aefcf194338bcc388ac488b811a8cee11 — https://www.mscs.dal.ca/~tkenney/3720/2016/PracticeFinalSols.pdf; SOA Exam FAM Sample Questions, Topics 7-10 (version Aug 18, 2026), Q6.4, Q6.6, Q6.17, Q7.13, Q7.17, Q7.40 (pp.52-53, 63, 103, 106, 125), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM Sample Solutions, Topics 7-10, Q5.5 p.29; Q6.4 p.35; Q6.6 p.36; Q7.13 p.71; Q7.16-7.17 p.73; Q7.40 p.82, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf; SOA Tables for Exam FAM, Standard Ultimate Life Table pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf
- note: FAM syllabus 10e names exactly the three methods (age rating; constant addition to the force of mortality; constant multiple of the rate of mortality). Valdez Weeks1-2 slide 16 (citing Dickson et al. 6.9): age rating, mu^s = mu + phi, q^s = min(c q, 1) - so lambda q <= 1 is sourced. Lim: adding k to mu multiplies tp by e^(-kt); multiplying mu raises tp to the power (the page's trap). Kenney's Dalhousie model solution Q10 p.4: an added constant to the force gives the annuity at i' = 1.04 e^k, and A is then recovered with the actual rate - the page's j-rate shortcut and A* = 1 - d a*. SOA FAM sample Q5.5 (solution p.29) applies an added force of 0.05 as an e^-0.05 factor; Q6.17 uses q^S = 1.5 q^NS. FAM tables: q50-q54, 5p50 (=5E50 x 1.05^5 = 0.99259), 5p55 = l60/l55 = 0.987613, q80=0.032658, q85=0.057665, A55=0.23524, a55=16.0599. a50 at 6% = 15.1511 is not in the SOA table; recomputed from the SULT Makeham law as 15.15106. Recomputation: 5q* = 0.012387 / 0.012358 / 0.011094; age-80 rates 0.057665 / 0.033625 / 0.048987; A*50=0.278519, P*=1,838.28 (+65% on 1,111.99), age-rated 1,464.77; traps 0.970249 and 0.142391 reproduced.
