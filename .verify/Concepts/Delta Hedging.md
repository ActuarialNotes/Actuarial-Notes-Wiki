---
target: Concepts/Delta Hedging.md
created: 2026-10-31
---

## [F-001] Unsourced claim about how FAM tests delta hedging
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:54Z/f179
- date: 2026-10-31
- severity: minor
- status: open
- locus: How it appears on the exam, FAM bullet
- claim: FAM delta-hedge questions are 'often extended one period to the rebalancing trade'.
- evidence: The FAM syllabus (Oct 2026, Topic 6(c), p.5) says only 'calculate the price and delta hedge of a simple European-style derivative'. The SOA's FAM-S sample set (Oct 2024, 92 pp.), the syllabus's named sample questions for Topics 1-6, contains no delta-hedging question at all (full-text search for 'delta' finds nothing; its option questions are Q77, 78, 100, 101, 103, 108). No source read supports 'often'.
- source_rank: 1
- proposed_action: Delete the clause; keep the sourced part of the bullet.
- applied: true
- fingerprint: debd440b5ea4

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T18:54Z/f179
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Deleted '; often extended one period to the rebalancing trade' (deletion only, rule 2). The bullet now reads as the syllabus does.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:54Z/f179
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: BS deltas e^{-qT}N(d1) and -e^{-qT}N(-d1) (Haugh p.7); binomial Delta and B (Cudina L17 eq.17.2); discrete-rebalancing replication error and P&L of a delta-hedged short option = integral of (S^2/2)Gamma(sigma_imp^2 - sigma_realized^2) dt (Haugh eq.24), of which the page's R(h) = (1/2)S^2 Gamma[sigma^2 h - (eps/S)^2] is the one-step form; survival-weighted GMMB hedge (ALTAM F24 Q6); ALTAM 7(c)-(d) and INV-201 quotes against the syllabi; independent recomputation of all three examples (481.58 shares, 16,868, 80.51 shares / 3,341; 9.888, 8,899, 17,476, 26,375; -32.86); one minor finding fixed
- sources_checked: SOA Exam FAM syllabus, October 2026, Topic 6 (a)-(d), p.5; readings p.8 (AMLCR Ch.16), sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf; M. Haugh (Columbia IEOR E4706), The Black-Scholes Model (2016), delta p.7, gamma p.8, Delta Hedging and eq.24 pp.11-12, sha256:a84225df571d081f2eb2079d8e1160d51af50c72e4fd2c52f5073ac39d6884bb — http://www.columbia.edu/~mh2078/FoundationsFE/BlackScholes.pdf; M. Cudina (UT Austin), M339D Lecture 17: Option pricing in the one-period binomial model, Lecture 17, pp.3-5, eqs. 17.1-17.4, sha256:8bcdda7a38233af8e1b15e9111762407662d5bf68fe4039cf7b67d30aff1b838 — http://web.ma.utexas.edu/users/mcudina/m339d-lecture-17-binomial-option-pricing-one-period.pdf; SOA ALTAM Fall 2024 model solutions, Q6(a)-(b), p.13, sha256:bef60a4ff411c7fa3eb0fd8d4b6a52a32d8ddf620ff365270c2a6dce96299a4f — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/fall-2024-altam-solutions.pdf; SOA ALTAM syllabus, October 2026, Topic 7 (a)-(d), p.6, sha256:44b64a78219337f43387cb52837c7c2ce590ae2b97321d6e8e4e29ab2cd38c5e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-altam-syllabus.pdf; SOA INV-201 syllabus, Nov 2026-Jul 2027, Topic 1(a); Topic 3(c), p.4; hedging topic (c), p.7, sha256:8b5d280585ae9d0e35943729f861ac13ada7462be850c328da93645b7bbd9bc1 — https://www.soa.org/globalassets/assets/files/edu/2026/inv-201/2026-2027-inv-201-syllabus.pdf
- note: FAM reading for Topic 6 is AMLCR 3rd ed. Ch.16 (commercial, not read; rule 4); no free SOA study note covers the topic. Checked at medium against open texts per D7/D22/D27: the SOA's own FAM-S sample set (the syllabus's 'Sample Questions and Solutions for Topics 1-6'), named-author lecture notes and Wikipedia as rank-3 support. Every worked example was recomputed from scratch (rank 5, falsify-only) before reading the page's figures: all agree to the printed precision. The gamma approximation is checked as the discrete form of Haugh's continuous P&L identity, not against McDonald's printed eq. (not read).
