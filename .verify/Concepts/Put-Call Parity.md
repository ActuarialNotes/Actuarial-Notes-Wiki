---
target: Concepts/Put-Call Parity.md
created: 2026-10-31
---

## [F-001] 'binomial' link points at Risk-Neutral Valuation
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:54Z/f179
- date: 2026-10-31
- severity: nit
- status: open
- locus: How it appears on the exam, first FAM bullet
- claim: 'a [[Risk-Neutral Valuation|binomial]] call computed earlier in the question'
- evidence: The link text names the binomial model, and the vault has the page Concepts/Binomial Option Pricing Model.md, which the FAM page links for Topic 6(b); the FAM-S questions the bullet describes (Q100, Q103, Q108, solutions pp.39-43) are binomial-tree questions.
- source_rank: 4
- proposed_action: Retarget to [[Binomial Option Pricing Model|binomial]].
- applied: true
- fingerprint: 7304dd1e1c36

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T18:54Z/f179
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Link retargeted to Binomial Option Pricing Model (rule 2: retarget a link).

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:54Z/f179
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: parity with continuous dividend yield (Haugh eq.21) and with known discrete dividends (Wikipedia); model-free payoff argument (Foster; Haugh p.7); synthetic positions; American bounds S0-K <= C-P <= S0-Ke^{-rT} (Foster); Greeks parity delta_put = delta_call - e^{-qT}, equal gammas and vegas (Haugh pp.7-9); FAM use against FAM-S Q77 (solve K), Q78, Q101; INV-201 3(c) quote; recomputation of all three examples (6.94; 3.9211, 0.5789; 1.9411, 10.63, 12.57); one nit fixed
- sources_checked: SOA Exam FAM syllabus, October 2026, Topic 6 (a)-(d), p.5; readings p.8 (AMLCR Ch.16), sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf; SOA Exam FAM-S sample solutions (Oct 2024), Q77, Q78 p.32; Q101 p.40, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf; M. Haugh (Columbia IEOR E4706), The Black-Scholes Model (2016), eq.21 pp.6-7; delta, gamma, vega pp.7-9, sha256:a84225df571d081f2eb2079d8e1160d51af50c72e4fd2c52f5073ac39d6884bb — http://www.columbia.edu/~mh2078/FoundationsFE/BlackScholes.pdf; K. Foster (CCNY), Lecture Notes 5: Option Values (Hull Ch 9), Spring 2010, Upper/Lower Bounds, Put-Call Parity, Early Exercise of American Options, sha256:5d6ea3740ce0bd304c4bb3cb04a77fc163b043dd385ab2a9390ee1bc567acc04 — https://kfoster.ccny.cuny.edu/classes/spring2010/eco275/lecturenotes5.html; Wikipedia, Put-call parity (rank 3), Statement; dividends, sha256:0319f058a96ed68396350383dc92981eab17922478a78ed2f6a65b37c01c944d — https://en.wikipedia.org/wiki/Put%E2%80%93call_parity; SOA INV-201 syllabus, Nov 2026-Jul 2027, Topic 1(a); Topic 3(c), p.4; hedging topic (c), p.7, sha256:8b5d280585ae9d0e35943729f861ac13ada7462be850c328da93645b7bbd9bc1 — https://www.soa.org/globalassets/assets/files/edu/2026/inv-201/2026-2027-inv-201-syllabus.pdf
- note: FAM reading for Topic 6 is AMLCR 3rd ed. Ch.16 (commercial, not read; rule 4); no free SOA study note covers the topic. Checked at medium against open texts per D7/D22/D27: the SOA's own FAM-S sample set (the syllabus's 'Sample Questions and Solutions for Topics 1-6'), named-author lecture notes and Wikipedia as rank-3 support. Every worked example was recomputed from scratch (rank 5, falsify-only) before reading the page's figures: all agree to the printed precision.
