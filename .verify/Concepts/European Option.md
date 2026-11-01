---
target: Concepts/European Option.md
created: 2026-10-31
---

## [F-001] Misreading a put's moneyness does not flip its delta
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:54Z/f179
- date: 2026-10-31
- severity: minor
- status: open
- locus: Exam traps, first bullet
- claim: Reading a put's moneyness with the call's rule 'gives the wrong intrinsic value and the wrong sign for its delta'.
- evidence: Haugh, The Black-Scholes Model, p.7: delta_put = delta_call - e^{-qT}, with delta_call = e^{-qT}Phi(d1) in (0, e^{-qT}), so a European put's delta is negative at every stock price, in or out of the money; moneyness (Wikipedia, Moneyness: a put is ITM when strike > spot) changes the intrinsic value but not the sign of delta. The intrinsic-value half of the sentence is right.
- source_rank: 3
- proposed_action: Delete 'and the wrong sign for its delta'.
- applied: true
- fingerprint: 22b1245428dc

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T18:54Z/f179
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Deleted the clause (rule 2, deletion only); the sentence now says only what the sources support.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:54Z/f179
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: call/put payoffs; no-arbitrage bounds c<=S0, p<=Ke^{-rT}, c>=S0-Ke^{-rT}, p>=Ke^{-rT}-S0 (Foster); the dividend-yield forms follow from Haugh's parity with q (eq.21) and non-negativity; American >= European, American call on non-dividend stock never exercised early, American put may be (Foster); intrinsic/time value, ITM/ATM/OTM, negative time value possible for a European option (Wikipedia Moneyness); simple European derivative V=g(S_T) priced by risk-neutral expectation (Cudina L17); recomputation of both examples (31.16, -8.84, 30.48; 7.6206, 0.6206); one minor finding fixed
- sources_checked: SOA Exam FAM syllabus, October 2026, Topic 6 (a)-(d), p.5; readings p.8 (AMLCR Ch.16), sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf; K. Foster (CCNY), Lecture Notes 5: Option Values (Hull Ch 9), Spring 2010, Upper/Lower Bounds, Put-Call Parity, Early Exercise of American Options, sha256:5d6ea3740ce0bd304c4bb3cb04a77fc163b043dd385ab2a9390ee1bc567acc04 — https://kfoster.ccny.cuny.edu/classes/spring2010/eco275/lecturenotes5.html; Wikipedia, Moneyness (rank 3), Intrinsic value and time value; ITM/ATM/OTM, sha256:959eee255f5ae94f582fe9ed125f1d4f4d3935f1953cae15cf9b9033af18bd0f — https://en.wikipedia.org/wiki/Moneyness; M. Haugh (Columbia IEOR E4706), The Black-Scholes Model (2016), eqs. 13, 21 pp.3, 6, sha256:a84225df571d081f2eb2079d8e1160d51af50c72e4fd2c52f5073ac39d6884bb — http://www.columbia.edu/~mh2078/FoundationsFE/BlackScholes.pdf; M. Cudina (UT Austin), M339D Lecture 17: Option pricing in the one-period binomial model, Lecture 17, pp.3-5, eqs. 17.1-17.4, sha256:8bcdda7a38233af8e1b15e9111762407662d5bf68fe4039cf7b67d30aff1b838 — http://web.ma.utexas.edu/users/mcudina/m339d-lecture-17-binomial-option-pricing-one-period.pdf; SOA Exam FAM-S sample questions (Oct 2024), Q77, Q78 p.62; Q100 p.82; Q103 p.85, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf
- note: FAM reading for Topic 6 is AMLCR 3rd ed. Ch.16 (commercial, not read; rule 4); no free SOA study note covers the topic. Checked at medium against open texts per D7/D22/D27: the SOA's own FAM-S sample set (the syllabus's 'Sample Questions and Solutions for Topics 1-6'), named-author lecture notes and Wikipedia as rank-3 support. Every worked example was recomputed from scratch (rank 5, falsify-only) before reading the page's figures: all agree to the printed precision.
