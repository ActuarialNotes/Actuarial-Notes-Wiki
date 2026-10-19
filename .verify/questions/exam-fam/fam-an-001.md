---
target: questions/exam-fam/fam-an-001.md
created: 2026-10-19
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-19T00:06Z/7017
- date: 2026-10-19
- status_set: verified
- confidence: medium
- checks_run: independent recomputation (writer: +4.20 at 0, -(50-43)^+ = -7.00 at expiry) before reading the key; key B matches; each distractor recomputed: A sign-reversed holder flows, C call payoff 0, D 7 - 4.20e^0.05 = 2.585, E 4.20 - 7.00 = -2.80; explanation's profit -2.585 checked; option distinctness; wiki links resolve; syllabus Topic 6(a) alignment; validate_content and question_lint clean
- sources_checked: Wikipedia, Put option (fetched 2026-10-19), Put option: holder's right to sell at strike to the writer; writer receives premium, buys at strike on exercise; writer long the underlying; value K-S at exercise, sha256:09e1271c87e00bfee9d9819260d6473327585d7265ed72b01eb8f12552a7120b — https://en.wikipedia.org/wiki/Put_option; SOA Exam FAM Syllabus, October 2026, Topic 6 (a), (c) p.5; Topic 7 (a), (b) p.6; Topic 2 (m) p.3, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf
- note: Writer's cash flows (receives the premium; buys at the strike on exercise, paying K - S_T against market) as Wikipedia's Put option describes them. Open text only, no FAM reading (AMLCR and Loss Models are commercial), so medium.
