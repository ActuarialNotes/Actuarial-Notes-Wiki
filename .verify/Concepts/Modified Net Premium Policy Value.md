---
target: Concepts/Modified Net Premium Policy Value.md
created: 2026-10-31
---

## [F-001] Definition narrower than the SOA's usage of a modified net premium reserve
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:53Z/182f
- date: 2026-10-31
- severity: major
- status: open
- locus: opening sentence
- claim: '... calculated with a net premium that is lower in the first year and higher afterwards, so that the policy value allows for the insurer's initial expenses.'
- evidence: Hartman Stat344 ch.7 slide 21: modified premium reserves are net premium reserves 'using net premiums that are not level, but follow some other specified pattern ... the actual premiums paid are unchanged'. SOA FAM sample question 7.40 (questions p.125, solution p.82) is a modified net premium reserve whose modified reserve is 0 at the end of year 2, with level valuation premiums from year 3 (P_mod = 1000A62/a62 = 21.89, 5V_mod = 58) - a modification over two years, which the page's 'lower in the first year' definition excludes. A candidate reading the page would not recognise that question.
- source_rank: 1
- proposed_action: Restate the definition to Hartman's wording (net premiums that are not level but follow some other specified pattern; actual premiums unchanged).
- applied: true
- fingerprint: 73538c7f926f

## [F-002] 'The standard method' for FPT is unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:53Z/182f
- date: 2026-10-31
- severity: minor
- status: open
- locus: opening paragraph, second sentence
- claim: 'The standard method is full preliminary term (FPT)'
- evidence: Hartman Stat344 ch.7 slide 22: 'One particular type of modified premium reserve uses the Full Preliminary Term (FPT) method.' No source read calls it the standard method, and SOA FAM sample 7.40 tests a different modification.
- source_rank: 3
- proposed_action: Restate to 'One particular method is full preliminary term (FPT)'.
- applied: true
- fingerprint: a2ee743da9c4

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T18:53Z/182f
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Opening sentence restated in this pass to Hartman ch.7 slide 21's definition; the FPT description, bullets and examples are unchanged.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T18:53Z/182f
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Restated in this pass to 'One particular method is', after Hartman ch.7 slide 22.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:53Z/182f
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: definition and FPT method vs open texts and SOA sample solutions 7.13, 7.40; FPT identities checked; SULT inputs diffed; both examples recomputed independently and compared with Valdez's published policy values; delta check after the restatement
- sources_checked: SOA Exam FAM syllabus, October 2026, Topic 10 learning outcomes a-e, p.7; readings p.8, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf; B. Hartman, Stat 344 Life Contingencies I, Chapter 7: Policy values / Reserves (BYU lecture notes), slides 9-15, 19-26, sha256:4a7db0e5fc0d829fd275b0e3f1de1f45217199b6e9722b8ee60252ee57c38785 — https://hartman.byu.edu/docs/344Files/Stat344_Chapter7.pdf; E. Valdez, STT 456 Policy Values lecture slides (Michigan State, Spring 2015), after Dickson et al. ch.7, slides 6-15, 18-23, sha256:3ace4861349a3e83d119f5e4b1490970d1fc3dc70409fc2213e0584b1c255a5f — https://users.math.msu.edu/users/valdezea/stt456s15/STT456Weeks2to4-S2015.pdf; SOA Exam FAM Sample Questions, Topics 7-10 (version Aug 18, 2026), Q6.4, Q6.6, Q6.17, Q7.13, Q7.17, Q7.40 (pp.52-53, 63, 103, 106, 125), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM Sample Solutions, Topics 7-10, Q5.5 p.29; Q6.4 p.35; Q6.6 p.36; Q7.13 p.71; Q7.16-7.17 p.73; Q7.40 p.82, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf; SOA Tables for Exam FAM, Standard Ultimate Life Table pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf
- note: FPT: Hartman ch.7 slide 22 (alpha = EPV of first-year benefits, renewal premiums fund later benefits, 1V^FPT = 0) and SOA FAM sample solution Q7.13 p.71 (FPT reserve at year 10 for a 30-year endowment on (40) = net premium policy value at year 9 of a 29-year endowment on (41)) - which is the page's tV^FPT_x = t-1V_{x+1} with term n-1. 'Closer to the gross premium reserve' matches Hartman slide 21. FAM tables: q40=0.000527, A40=0.12106, a40=18.4578, A41=0.12665, a41=18.3403, a50=17.0245. Recomputation: P0=50.21, P^FPT=690.57, P=655.87, 10V^FPT=7,174.25, 10V=7,764.92 (Valdez Weeks2-4 slide 14 tabulates 776.487 per 10,000, i.e. 7,764.87 - the 5-cent gap is the page's rounded annuity inputs), gap 590.68; 1V=636.28 matches Valdez slide 18 (63.628 per 10,000); first-year profit -478.66 vs 157.28. EPV identity P0 + P^FPT(a_x - 1) = P a_x reproduces 12,105.95 vs 12,105.9.
