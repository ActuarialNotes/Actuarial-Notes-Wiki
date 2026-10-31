---
target: Concepts/Black-Scholes Model.md
created: 2026-10-31
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:54Z/f179
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: call formula, d1, d2 (Haugh eq.9), put via parity, put delta = call delta - e^{-qT} = -N(-d1) at q=0 (Haugh p.7), N(d2) = risk-neutral ITM probability (Haugh p.7), risk-neutral lognormal S_T (Haugh p.2); GMMB as survival-weighted BS put on the fund net of management charges (ALTAM F24 Q6 model solution p.13, continuous charge e^{-mT}; the page's annual (1-m)^T is its own example's charge convention); ALTAM and FAM exam-use bullets against the two syllabi; independent recomputation of both examples (9.556/10.439; 8,495.47 and 7,815.84)
- sources_checked: SOA Exam FAM syllabus, October 2026, Topic 6 (a)-(d), p.5; readings p.8 (AMLCR Ch.16), sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf; M. Haugh (Columbia IEOR E4706), The Black-Scholes Model (2016), eqs. 9, 12-13 pp.2-3; delta and N(d2) remark p.7, sha256:a84225df571d081f2eb2079d8e1160d51af50c72e4fd2c52f5073ac39d6884bb — http://www.columbia.edu/~mh2078/FoundationsFE/BlackScholes.pdf; Wikipedia, Black-Scholes model (rank 3), Black-Scholes formula, sha256:de43f555c0be45c41ff7ce2b24ad6fe3b14350385ab64b341ee80234f01b9a63 — https://en.wikipedia.org/wiki/Black%E2%80%93Scholes_model; SOA ALTAM Fall 2024 model solutions, Q6(a)-(b), p.13, sha256:bef60a4ff411c7fa3eb0fd8d4b6a52a32d8ddf620ff365270c2a6dce96299a4f — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/fall-2024-altam-solutions.pdf; SOA ALTAM syllabus, October 2026, Topic 7 (a)-(d), p.6, sha256:44b64a78219337f43387cb52837c7c2ce590ae2b97321d6e8e4e29ab2cd38c5e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-altam-syllabus.pdf; SOA Exam FAM-S sample solutions (Oct 2024), Q101 p.40, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf
- note: FAM reading for Topic 6 is AMLCR 3rd ed. Ch.16 (commercial, not read; rule 4); no free SOA study note covers the topic. Checked at medium against open texts per D7/D22/D27: the SOA's own FAM-S sample set (the syllabus's 'Sample Questions and Solutions for Topics 1-6'), named-author lecture notes and Wikipedia as rank-3 support. Every worked example was recomputed from scratch (rank 5, falsify-only) before reading the page's figures: all agree to the printed precision. The '(AMLCR)' attribution in the embedded-guarantee bullet was not checked against the book itself; the formula it states matches the SOA's ALTAM model solution.
