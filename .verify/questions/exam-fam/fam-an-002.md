---
target: questions/exam-fam/fam-an-002.md
created: 2026-10-19
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-19T00:06Z/7017
- date: 2026-10-19
- status_set: verified
- confidence: medium
- checks_run: independent recomputation in code before reading the key: d1 = -0.25126, N(d1) = 0.40080, put delta = N(d1) - 1 = -0.59920, 500 written puts have delta +299.6, hedge = sell 300 shares; key D matches; distractors recomputed: A/B 500 x N(d1) = 200.4, C sign error 300, E 500 x N(-d2) = 332.8 with d2 = -0.42804; explanation's arithmetic line by line; option distinctness; wiki links resolve; syllabus Topic 6(c) alignment
- sources_checked: SOA INV-201 Formula Package 2026-2027, (15.21) p=Ke^{-rT}N(-d2)-S0N(-d1), p.5; Table 19.6 put delta e^{-qT}(N(d1)-1), p.6; d1 definition (5.13), p.10, sha256:b286a8786a8704fcdc8d313551b3009eb5f0bbc09ef85f541ae4fd0a90be11c4 — https://www.soa.org/globalassets/assets/files/edu/2026/inv-201/2026-2027-inv-201-formula-package.pdf; Wikipedia, Put option (fetched 2026-10-19), Put option: holder's right to sell at strike to the writer; writer receives premium, buys at strike on exercise; writer long the underlying; value K-S at exercise, sha256:09e1271c87e00bfee9d9819260d6473327585d7265ed72b01eb8f12552a7120b — https://en.wikipedia.org/wiki/Put_option; SOA Exam FAM Syllabus, October 2026, Topic 6 (a), (c) p.5; Topic 7 (a), (b) p.6; Topic 2 (m) p.3, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf
- note: Put delta e^{-qT}(N(d1) - 1) with q = 0 from the SOA's own Greek-letter table (INV-201 formula package, Table 19.6, read off the rendered page) and the put price (15.21); the writer of a put is long the underlying (Wikipedia, Put option), so the hedge is short stock. Not the FAM reading, so medium.
