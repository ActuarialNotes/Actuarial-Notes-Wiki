---
target: questions/exam-fam/fam-an-006.md
created: 2026-10-19
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-19T00:06Z/7017
- date: 2026-10-19
- status_set: verified
- confidence: high
- checks_run: independent recomputation in code before reading the key: VaR_0.95 = 2000(0.05^(-1/3) - 1) = 3,428.8, TVaR = VaR + (VaR + 2000)/2 = 6,143.3; key E matches; matches the SOA FAM table's TVaR_p = VaR_p + theta(1-p)^(-1/alpha)/(alpha-1) exactly; distractors recomputed: A 2,714.4, B 3,428.8, C 3,428.8 + 1,000 = 4,428.8, D 3,428.8 + 5,428.8/3 = 5,238.4; explanation line by line; wiki links resolve; syllabus Topic 2(m) alignment
- sources_checked: SOA Tables for Exam FAM (October 2024), A.2.3.1 Pareto: F(x), VaR_p, TVaR_p = VaR_p + theta(1-p)^(-1/alpha)/(alpha-1), E[X^k], p.6, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf; SOA Exam FAM Syllabus, October 2026, Topic 6 (a), (c) p.5; Topic 7 (a), (b) p.6; Topic 2 (m) p.3, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf
- note: Rank 1: the SOA's Tables for Exam FAM (Loss Models Appendix A as distributed at the exam), A.2.3.1 Pareto, rendered p.6, give VaR_p and TVaR_p in closed form; the 2024 edition was the newest found. Independent recomputation agrees, so high.
