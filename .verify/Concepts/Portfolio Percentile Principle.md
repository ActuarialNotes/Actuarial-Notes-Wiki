---
target: Concepts/Portfolio Percentile Principle.md
created: 2026-10-31
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:53Z/182f
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: definition and normal-approximation condition vs open texts and SOA sample solutions; SULT inputs diffed; both examples and every trap figure recomputed independently, then compared with an independent published figure
- sources_checked: SOA Exam FAM syllabus, October 2026, Topic 10 learning outcomes a-e, p.7; readings p.8, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf; E. Valdez, STT 456 Premium Calculation lecture slides (Michigan State, Spring 2015), after Dickson et al. ch.6, slides 4-8, 16, 18, sha256:7b4af6694606f8ee6a4ad037032100e510c0f7d382d2f47d6f85044cff02cc98 — https://users.math.msu.edu/users/valdezea/stt456s15/STT456Weeks1to2-S2015.pdf; B. Hartman, Stat 344 Life Contingencies I, Chapter 6: Premiums (BYU lecture notes), slides 3-6, 23-33, sha256:da3f77bfcd709a519f2c4982b1969fa3d62c4ec4b410117ad00dedf510dee5e8 — https://hartman.byu.edu/docs/344Files/Stat344_Chapter6.pdf; SOA Exam FAM Sample Questions, Topics 7-10 (version Aug 18, 2026), Q6.4, Q6.6, Q6.17, Q7.13, Q7.17, Q7.40 (pp.52-53, 63, 103, 106, 125), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM Sample Solutions, Topics 7-10, Q5.5 p.29; Q6.4 p.35; Q6.6 p.36; Q7.13 p.71; Q7.16-7.17 p.73; Q7.40 p.82, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf; SOA Tables for Exam FAM, Standard Ultimate Life Table pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf
- note: Definition Pr(L<0)=alpha over N iid policies matches Valdez Weeks1-2 slides 7-8 and Hartman ch.6 slides 29-30 (CLT, E[L]=N E[L0], Var[L]=N Var[L0], alpha typically 0.95); method matches SOA FAM sample solutions Q6.4 p.35 and Q6.6 p.36 (aggregate loss, normal approximation). Hartman ch.6 slide 32 works this page's own case at N=100 (SULT age 60, 5%, alpha 0.95) and gets P=0.02198 per 1 - the page's $2,197.97 per 100,000; independent recomputation reproduces it and the page's other figures: N=1,000 P=2,024.84, N=10,000 1,971.87, equivalence 1,947.65, wrong-sign 1,872.20, fixed-SD 2,023.96, N >= 2,158.3 so 2,159. A60=0.29028, 2A60=0.10834, a60=14.9041 read off FAM tables p.20. FAM syllabus 10b names the principle. The closing remark that systematic risks break the independence assumption restates the iid assumption both open texts state.
