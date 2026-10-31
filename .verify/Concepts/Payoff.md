---
target: Concepts/Payoff.md
created: 2026-10-31
---

## [F-001] GMWB definition not in any source read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:54Z/f179
- date: 2026-10-31
- severity: minor
- status: open
- locus: Embedded guarantees (ALTAM) bullet
- claim: 'A GMWB guarantees withdrawals totalling the premium even if the fund runs out.'
- evidence: The SOA's ALTAM material read this session describes a different GMWB: Spring 2025 ALTAM Q6(d)-(e) model solution pp.19-20 is a lifetime GMWB paying 6% of a benefit base (105% of the fund or its highest year-end value), withdrawals 'as long as funds are available'. Neither it, the Spring 2023 Q6 solution (GMMB, GMIB), the Fall 2024 Q6 solution (GMMB) nor the ALTAM syllabus (Topic 7(a) lists the GMWB but defines nothing) states a return-of-premium GMWB. The definition may be AMLCR's, which could not be read (commercial).
- source_rank: 1
- proposed_action: Delete the GMWB sentence; a sourced GMWB definition belongs to Concepts/Guaranteed Minimum Withdrawal Benefit, for a writer.
- applied: true
- fingerprint: 5b0fbf690059

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T18:54Z/f179
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Deleted the unsourced GMWB clause (rule 2, deletion only). The GMIB clause stays: Spring 2023 ALTAM Q6(a) defines the GMIB by a guaranteed annuitization rate on a benefit base.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:54Z/f179
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: call/put payoffs (Foster); long forward payoff S_T - K (Wikipedia, Forward contract); caplet payoff N alpha max(L-K,0) paid at the end of the period, cap = series of caplets (Wikipedia, Interest rate cap and floor); GMMB/GMIB payoffs and benefit base with roll-up (P(1.03)^10) and ratchet (max of fund values) (ALTAM S23 Q6, S25 Q6); INV-201 Topic 1(a)/(e) and ALTAM Topic 7(a) lists against the syllabi; recomputation of all three examples (bull spread -5.50/4.50/14.50; fund 1,078.00/739.51/760.95, guarantees 0/321.39/331.77/239.05, 808.50 trap; caplets 0/7,500/20,000); one minor finding fixed
- sources_checked: SOA Exam FAM syllabus, October 2026, Topic 6 (a)-(d), p.5; readings p.8 (AMLCR Ch.16), sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf; K. Foster (CCNY), Lecture Notes 5: Option Values (Hull Ch 9), Spring 2010, Upper/Lower Bounds, Put-Call Parity, Early Exercise of American Options, sha256:5d6ea3740ce0bd304c4bb3cb04a77fc163b043dd385ab2a9390ee1bc567acc04 — https://kfoster.ccny.cuny.edu/classes/spring2010/eco275/lecturenotes5.html; Wikipedia, Forward contract (rank 3), Payoffs, sha256:fdc482d7cdd12b7546a7d48063003949a714a0518a8569445eac48631000a425 — https://en.wikipedia.org/wiki/Forward_contract; Wikipedia, Interest rate cap and floor (rank 3), Interest rate cap: caplet payoff, payment at end of period, sha256:27f214df7f24d378a9b60624b4dbf367e52ffd2bdf548194238fdbd0a8fdf9e6 — https://en.wikipedia.org/wiki/Interest_rate_cap_and_floor; SOA ALTAM Spring 2023 model solutions, Q6(a)-(b), p.13, sha256:7808fbbb76bc8d54d394976603e8123a3fdb44a6020cfd126cc95f3c6814b512 — https://www.soa.org/globalassets/assets/files/edu/2023/spring/solutions/spring-2023-solutions-altam.pdf; SOA ALTAM Spring 2025 model solutions, Q6(b)-(e), pp.19-20, sha256:6371e71ec29b9d7997e03348d4455e4d3e7418660261b36ddd4dd5a2fa0edf66 — https://www.soa.org/globalassets/assets/files/edu/2025/spring/solutions/2025-spring-altam-solutions.pdf; SOA ALTAM syllabus, October 2026, Topic 7 (a)-(d), p.6, sha256:44b64a78219337f43387cb52837c7c2ce590ae2b97321d6e8e4e29ab2cd38c5e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-altam-syllabus.pdf; SOA INV-201 syllabus, Nov 2026-Jul 2027, Topic 1(a); Topic 3(c), p.4; hedging topic (c), p.7, sha256:8b5d280585ae9d0e35943729f861ac13ada7462be850c328da93645b7bbd9bc1 — https://www.soa.org/globalassets/assets/files/edu/2026/inv-201/2026-2027-inv-201-syllabus.pdf
- note: FAM reading for Topic 6 is AMLCR 3rd ed. Ch.16 (commercial, not read; rule 4); no free SOA study note covers the topic. Checked at medium against open texts per D7/D22/D27: the SOA's own FAM-S sample set (the syllabus's 'Sample Questions and Solutions for Topics 1-6'), named-author lecture notes and Wikipedia as rank-3 support. Every worked example was recomputed from scratch (rank 5, falsify-only) before reading the page's figures: all agree to the printed precision. FAM links this page for 'puts and calls' (Topic 6(a)); most of its body serves ALTAM and INV-201.
