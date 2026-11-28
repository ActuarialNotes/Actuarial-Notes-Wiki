---
target: Concepts/Probability Mass Function (PMF).md
created: 2026-09-27
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: high
- checks_run: p(x) = P(X = x) for a discrete X against MIT 4a and Pishro-Nik §3.1.3; p >= 0 and sum over all x = 1 against G&S Def 1.2; fair-die example recomputed: p(x) = 1/6 on 1..6, sum 1 (agrees). [[Random Variable]] resolves; LaTeX well formed. No exam page links this page directly (reached from concept pages); no usage difference to flag.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Definition 1.2 distribution function m(omega) >= 0 and sum = 1 (PDF p.27), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 4a: Discrete Random Variables, §2 definition (PDF p.2), cdf definition (PDF p.3), §2.8 Properties of the cdf (PDF pp.5-6), sha256:ff2a10e7ef1c0f5ef300ed8f73864d365ca5adcdf9775d1c4a6f356ee7687b5d — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class04-prep-a.pdf; , §3.1.3 Probability Mass Function, sha256:d0663822dac70b28920bf443d4d5a8f923d61b1c62e11b7d0b530638cf625ff8 — https://www.probabilitycourse.com/chapter3/3_1_3_pmf.php

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: high
- checks_run: p(x) = P(X = x) for a discrete X against MIT 4a and Pishro-Nik §3.1.3; p >= 0 and sum over all x = 1 against G&S Def 1.2; fair-die example recomputed: p(x) = 1/6 on 1..6, sum 1 (agrees). [[Random Variable]] resolves; LaTeX well formed. No exam page links this page directly (reached from concept pages); no usage difference to flag.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Definition 1.2 distribution function m(omega) >= 0 and sum = 1 (PDF p.27), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 4a: Discrete Random Variables, §2 definition (PDF p.2), cdf definition (PDF p.3), §2.8 Properties of the cdf (PDF pp.5-6), sha256:ff2a10e7ef1c0f5ef300ed8f73864d365ca5adcdf9775d1c4a6f356ee7687b5d — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class04-prep-a.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §3.1.3 Probability Mass Function, sha256:d0663822dac70b28920bf443d4d5a8f923d61b1c62e11b7d0b530638cf625ff8 — https://www.probabilitycourse.com/chapter3/3_1_3_pmf.php

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-28T14:55Z/e368
- date: 2026-11-28
- status_set: verified
- confidence: high
- checks_run: Blind examples solved first: C3 fair die f(x)=1/6 on 1..6, P(X<=2)=1/3 (page 1/3: correct). C9 c*(1+2+3+4)=1 gives c=0.1 and P(X>=3)=0.3+0.4=0.7 (page: c=1/10 and 0.7: correct). C1-C2 (PMF is P(X=x) for discrete X): MIT OCW 18.05 Reading 4a sec.2.4 (PDF p.3) and Pishro-Nik 3.1.3 (cache copy, sha e61a5470...) define p(a)=P(X=a). C4-C5 (non-negativity): G&S Def 1.2 requires m(omega) >= 0 (PDF p.27); MIT says 0 <= p(a) <= 1 (PDF p.3); Pishro-Nik says 0 <= P_X(x) <= 1. The sources allow zero, so the page's strict 'f(x) > 0' is wrong (finding F1). The page's own example also has f=0 outside 1..4 and at every value that is not a possible outcome. C6-C7 (sum over all x equals 1): G&S Def 1.2 item 2; Pishro-Nik sum over R_X equals 1 (cache copy). C8 (the sum requirement solves for an unknown constant and checks a marginal): a consequence of the sum requirement; the sum requirement applies to any PMF, so no separate source is needed. The log's C-001/C-002 'verified' records are old; they cite the same sources and say the same things, and no finding in the log is open. The page cites no exam statement, so no exam-coverage claim was checked.
- sources_checked: https://math.dartmouth.edu/~prob/prob/prob.pdf, Definition 1.2 Distribution Functions, PDF p.27, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; 18.05 S22 Reading 4a: Discrete Random Variables, 2.4 Probability mass function, PDF p.3; 2.8 Properties of the cdf, PDF pp.5-6, sha256:ff2a10e7ef1c0f5ef300ed8f73864d365ca5adcdf9775d1c4a6f356ee7687b5d — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class04-prep-a.pdf; Probability Mass Function | PMF, 3.1.3 Probability Mass Function, Definition and Properties of PMF, sha256:e61a547024a09ca1dbdf47e3d608f50879f8c50d480421a8c9198e61d9e484b8 — https://www.probabilitycourse.com/chapter3/3_1_3_pmf.php
