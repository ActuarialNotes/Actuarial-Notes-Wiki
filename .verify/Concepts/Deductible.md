---
target: Concepts/Deductible.md
created: 2026-09-28
---

## [F-001] Franchise deductible and the 'two types' claim not supported by the Exam P sources
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: definition bullets, lines 16-18
- claim: There are two types of deductibles: An ordinary deductible eliminates small claims entirely; A franchise deductible pays the full loss X once it exceeds d
- evidence: P-21-05 §VI (PDF p.7) describes one deductible form: losses reimbursed only in excess of a threshold (500 deductible, loss 2000, insurer pays 1500). The word franchise occurs zero times in P-21-05, in the Aug 2026 SOA Exam P sample questions (1-737) or in their solutions (full-text search of the per-question split). The franchise definition is the Loss Models one (a MAS-I reading, not available this session), so the bullet and the statement that there are exactly two types are unsourced here. Separately, eliminating small claims is common to both forms, so it does not characterise the ordinary deductible; the formula Y = (X - d)+ does.
- source_rank: 1
- proposed_action: Cite Loss Models for the franchise deductible (or drop the exactly-two-types framing) and describe the ordinary deductible by what it pays, (X - d)+.
- applied: false
- fingerprint: 3b4ab6794fe7

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition vs P-21-05 p.7. Y = (X - d)+ = max(X - d, 0) vs P-21-05 p.7 (loss 2000, deductible 500, pays 1500; below 500 pays nothing). Purpose bullet vs P-21-05 p.7 reasons (2) premium savings and (3) incentive to prevent losses. Example 1 recomputed first: E[(X-200)+] = 1000 - 1000(1 - e^-0.2) = 818.73 (C tables E[X^x], theta = mean) - agrees. Example 2 recomputed: 300 -> 0, 2000 -> 1500 - agrees and matches P-21-05 own example. The escaped-dollar-then-inline-math shape is an Obsidian shape that renders, not a defect. Links and embed resolve. CAS pages (MAS-I, DISC-IA) link it in the same sense - no CAS/SOA difference.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §VI Deductibles PDF p.7; SOA, Tables for Exam C (Fall 2009), exponential entry E[X^x] = theta(1 - e^(-x/theta)), PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; SOA Probability Exam syllabus, November 2026, objective "Calculate the amount that an insurance company pays to a policyholder for a claim given policy information, including deductibles, coinsurance percentages, and benefit limits, as well as other factors, such as inflation", PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Formula and examples verified; one open minor on the unsourced franchise-deductible bullet.

## [F-001/R] Franchise bullet and two-types framing deleted; bullets restated from P-21-05 and Werner & Modlin
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: No source for the franchise deductible was available this session (Loss Models not reachable), so the two-types bullets were deleted. The ordinary deductible is now described by what it pays (nothing up to d, the excess X - d above it; P-21-05 PDF p.7: 500 deductible, loss 2000, pays 1500). The moral-hazard bullet now gives the three reasons P-21-05 PDF p.7 lists, and a bullet from Werner & Modlin PDF p.211 adds the Exam 5 flat-dollar vs percentage deductible (5% on a home insured for 500,000 = 25,000 flat).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001: each bullet traced to P-21-05 p.7 or Werner p.211; 0.05 x 500000 = 25000. Example 1 recomputed: E[(X-200)+] = 1000 - 1000(1 - e^-0.2) = 1000 e^-0.2 = 818.73. Example 2: (300 - 500)+ = 0, (2000 - 500)+ = 1500, as P-21-05 p.7. Medium: original worked examples.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §VI Deductibles: definition, 500/2000/1500 example and reasons for deductibles, PDF p.7; Werner & Modlin, Basic Ratemaking (CAS, 2016), Ch.11 Deductibles: flat dollar and percentage deductibles, 5% of 500,000 = 25,000, PDF p.211, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; SOA, Tables for Exam C (Fall 2009), exponential entry E[X^x] = theta(1 - e^(-x/theta)), PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; SOA Probability Exam syllabus, November 2026, objective "Calculate the amount that an insurance company pays to a policyholder for a claim given policy information, including deductibles, coinsurance percentages, and benefit limits, as well as other factors, such as inflation", PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:38Z/1db6
- date: 2026-10-30
- status_set: verified
- confidence: medium
- checks_run: w5 re-pass after writer additions (diff vs 0287511f adds only; no prior sentence changed). Re-derived: X = (X^d) + (X-d)_+ case by case; E[(X-d)_+] = E[X] - E[X^d] by additivity (SIE 3.1); int_d^inf (x-d)f(x)dx by change of variables; int_d^inf S(x)dx from SIE 3.2 applied to (X-d)_+ >= 0 whose tail is S(d+t); discrete sums by discrete change of variables; E[min(N,d)] = sum_{k<d} P(N>k) from SIE 3.2 E(N) = sum P(N>n) since P(min(N,d)>k) = P(N>k) for k<d, 0 after (numeric check Poisson(2), d=4: both 1.92486); slope -P(X>d) via FTC Part 1 (derivative -S(d) where S continuous; discrete case linear between loss amounts with coefficient -sum_{x>d} p(x)); 'decreasing' read in the weak sense (flat at 0 past the largest loss, where P(X>d)=0). Example recomputed: E[X]=210, f(100)=150, f(400)=60, case [0,100) gives 183.3 rejected, case [100,400) 180-0.3d=100 -> 266.67. Own numbers, not p-155/p-216/p-217/p-048/p-163/p-219/p-601/p-630's. Link [[Limited Expected Value]] resolves. Prior sources re-cited from the block for unchanged content.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §VI Deductibles: definition, 500/2000/1500 example and reasons for deductibles, PDF p.7; Werner & Modlin, Basic Ratemaking (CAS, 2016), Ch.11 Deductibles: flat dollar and percentage deductibles, 5% of 500,000 = 25,000, PDF p.211, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; SOA, Tables for Exam C (Fall 2009), exponential entry E[X^x] = theta(1 - e^(-x/theta)), PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; SOA Probability Exam syllabus, November 2026, objective "Calculate the amount that an insurance company pays to a policyholder for a claim given policy information, including deductibles, coinsurance percentages, and benefit limits, as well as other factors, such as inflation", PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; RISK AND INSURANCE, Anderson & Brown, Risk and Insurance (SOA P-21-05), §VI Deductibles (PDF p.7): insurer pays the loss in excess of the deductible; §VIII (PDF p.13): Y = max(0, X - 5), charges below the deductible pay nothing, sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf; Definitions and Basic Properties, §3.1 Definitions and Basic Properties: change of variables theorem (discrete and continuous), additive property, mixed-distribution definition E(X) = sum_D x g(x) + int_C x h(x) dx, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html; Additional Properties, §3.2 Additional Properties, Right Distribution Function: E(X) = int_0^inf P(X > x) dx for nonnegative X; E(N) = sum_{n>=0} P(N > n) for N in N, sha256:80150b157fee54ddfea427e726a32493121464235644d38eec5997fdd9ca7321 — https://www.randomservices.org/random/expect/Properties2.html; https://openstax.org/books/calculus-volume-1/pages/5-3-the-fundamental-theorem-of-calculus, OpenStax Calculus Volume 1 §5.3 Theorem 5.4, Fundamental Theorem of Calculus Part 1, sha256:7ef62f4b28ce316524985288945f7c0b5aa91cea2ce9c8e8cbb88025aab42982 — https://openstax.org/books/calculus-volume-1/pages/5-3-the-fundamental-theorem-of-calculus
