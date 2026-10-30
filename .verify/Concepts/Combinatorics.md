---
target: Concepts/Combinatorics.md
created: 2026-09-27
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: high
- checks_run: n! arrangements of n objects = G&S Theorem 3.1 (PDF p.88); P(A) = |A|/|S| for equally likely outcomes follows from G&S Definition 1.3 m(ω) = 1/n (PDF p.33); ordered vs unordered selections = G&S k-permutations (Def. 3.2, PDF p.88) vs binomial coefficients counting subsets (Thm 3.5, PDF p.102); syllabus outcome 1b names combinations and permutations; example recomputed first: C(5,3) = 120/(6·2) = 10, each outcome 1/10 = stated; links Discrete Mathematics, Permutation, Combination and figure embed resolve
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 1.3 p.25 (PDF p.33); §3.1 Def. 3.2, Thms 3.1-3.2 p.80 (PDF p.88); §3.2 Thm 3.5 and n!/(j!(n-j)!) pp.94-95 (PDF pp.102-103), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 learning outcome 1b, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [F-001] Added 1/e approximation lets two questions be answered by recall (rule 10)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-30T18:38Z/8d19
- date: 2026-10-30
- severity: minor
- status: open
- locus: ### Derangements, last bullet
- claim: The probability that a random permutation of $n$ items has no fixed point is $D_n/n!$, which is about $1/e \approx 0.368$ once $n$ is moderately large.
- evidence: The clause is true (G&S Historical Remarks PDF pp.93-94: probability of no fixed point ≈ e^-1), but it was added in this campaign to close p-193/p-389 items, which it does not need to: those items quote the derangement definition, the D_n formula and the inclusion-exclusion sum. With it on the page, p-389 (options 0.333 / 0.375; answer 0.375 = D_4/4!) and p-193 (1 − 0.368 = 0.632; options 11/24, 5/8, 3/4; answer 5/8) can be picked by approximation instead of by computing D_4 — the same reason the D_1..D_5 table was removed.
- source_rank: 3
- proposed_action: Delete the clause ', which is about $1/e \approx 0.368$ once $n$ is moderately large', keeping 'is $D_n/n!$.'
- applied: true
- fingerprint: 3b37027b6d67

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-30T18:38Z/8d19
- date: 2026-10-30
- resolves: F-001
- status: resolved
- note: Clause deleted in this run; the bullet now reads 'The probability that a random permutation of $n$ items has no fixed point is $D_n/n!$.' No item quote used it; all 10 Combinatorics item quotes re-probed 'tagged'.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:38Z/8d19
- date: 2026-10-30
- status_set: verified
- confidence: high
- checks_run: diff vs 0287511f is add-only (38+, 0-); earlier content and its G&S/syllabus sources unchanged; multiplication principle = G&S Counting Technique p.84; repeated-value staging = G&S Ex 3.6 poker hands; n^m = PN 2.1.1, P(n,m) = PN 2.1.2; symmetry = Siegrist X_i uniform on D and X_j | X_i uniform on D∖{x}, round-table 'seat one arbitrarily'; derangement def/D_n/alternating sum = Siegrist Matching b_n(0) and its inclusion-exclusion proof; recomputed D_n for n=1..5 by formula and by brute force (0,1,2,9,44), D_3 = 2 stated; example recomputed before reading: 10·6·72 = 4,320, confirmed by enumeration of all 10^4 strings; rule 10: no question's numbers (compared p-193, p-389, p-332, p-424, p-549); deleted the added '≈ 1/e ≈ 0.368 once n is moderately large' clause (F-001) because it lets p-389 (0.375) and p-193 (5/8) be picked by approximation; all 10 item quotes probe 'tagged'
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 1.3 p.25 (PDF p.33); §3.1 Def. 3.2, Thms 3.1-3.2 p.80 (PDF p.88); §3.2 Thm 3.5 and n!/(j!(n-j)!) pp.94-95 (PDF pp.102-103), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 learning outcome 1b, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 A Counting Technique p.76 (PDF p.84); Ex. 3.6 Poker Hands p.95 (PDF p.103); Historical Remarks, derangements w_1=0, w_2=1 (PDF pp.93-94), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; H. Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), fetched 2026-10-30, §2.1.0 Counting (multiplication principle) sha256:342319616112f470d1ff3cef050a29341a88a548e285cb6a328a2729d52b50df — https://www.probabilitycourse.com/chapter2/2_1_0_counting.php; §2.1.1 Ordered Sampling with Replacement (n options for each of k positions) sha256:fa301b74fb68f1fa983074b20a905e02c78520c4d5881b98cef798b9b9fce90a — https://www.probabilitycourse.com/chapter2/2_1_1_ordered_with_replacement.php; §2.1.2 Ordered Sampling without Replacement sha256:ea03a74b8351fba96d351a027350a67fa84dbc937f05aa938c98ea34ee33cdb0 — https://www.probabilitycourse.com/chapter2/2_1_2_ordered_without_replacement.php; K. Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), fetched 2026-10-30, Finite Sampling Models §6 The Matching Problem (derangements; b_n(0) = n! Σ (-1)^j/j! by inclusion-exclusion with #{X_i=i, i∈J} = (n-j)! and C(n,j) sets J) sha256:6c44b9152bd3fe3f4e53e442c55bb21d299ee229e7ae996e5bb893b424b2857f — https://www.randomservices.org/random/urn/Matching.html; §1 Introduction (X_i uniformly distributed on D for each i) sha256:32cb2b68070d4a61c61ff3772b9eb371ed582196aa3d7ec4ad65c254056d22fe — https://www.randomservices.org/random/urn/Introduction.html; §4 Order Statistics (given X_i = x, X_j uniform on D∖{x}) sha256:8b4b38e1ca6a79fcc598b1bebf75fc7b9694f0592411d2ef539a6c727f139c77 — https://www.randomservices.org/random/urn/OrderStatistics.html; Foundations §1.8 Combinatorial Structures, round-table exercise ('Seat one, distinguished person arbitrarily') sha256:63ef90fd651593defb33d7772ecbe92f6198b6b655219a5cb726c76cdc393ccb — https://www.randomservices.org/random/foundations/Structures.html
- note: Re-pass after the Exam P G8 writer added passages (w2). Earlier sources re-cited from the block; new passages checked against the sources read this run.
