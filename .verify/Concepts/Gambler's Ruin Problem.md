---
target: Concepts/Gambler's Ruin Problem.md
created: 2026-10-05
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: formula for p != 1/2 and p = 1/2, recursion and difference form, three-class structure, N -> infinity limit and the direction of its inequality (p > 1/2 favoured / p <= 1/2 certain ruin) diffed against Ross Eq. 4.14 and the limit on p.219; duration formula diffed against Siegrist Timid Play and confirmed numerically (row sum of (I - P_T)^-1 for p = 0.6, N = 10, i = 3 = 20.806; p = 1/2, N = 10, i = 3 gives 21 = 3 x 7); Example 1 stem diffed against F2019 Q10 page image, recomputed exactly 1/244 = 0.0041 both ways = CAS key A; Example 2 stem diffed against F2018 Q10 page image, 1 - 24/50 = 0.52 = CAS key B; Example 3 recomputed exactly: (2/3)^3 = 8/27 = 0.2963, P_3 = 41553/58025 = 0.7161, duration 48291/2321 = 20.806, 1 - P_3 = 0.2839; KaTeX render via the app pipeline: 63 spans, 0 errors; all 3 wiki-links resolve
- sources_checked: Ross, Introduction to Probability Models, Ch 4 'Markov Chains' (an earlier edition than the 12th ed. the 2026 MAS-I outline assigns; course-hosted copy on the NTNU TMA4265 page, printed pp.185-280, PDF p.n = printed p.184+n), §4.5.1 The Gambler's Ruin Problem pp.217-219 (PDF pp.33-35): chain with P00 = PNN = 1, three classes {0}, {1..N-1}, {N}, P_i = pP_{i+1} + qP_{i-1}, P_{i+1} - P_i = (q/p)(P_i - P_{i-1}), Eq. (4.14) P_i = (1-(q/p)^i)/(1-(q/p)^N) for p != 1/2 and i/N for p = 1/2, N -> infinity limit 1-(q/p)^i if p > 1/2 and 0 if p <= 1/2, Example 4.24 two players (i = 5, N = 15, p = 0.6); §4.6 Examples 4.26-4.27 pp.231-232, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf; Siegrist, Random (randomservices.org), Ch 12 §10 'Timid Play': f(x) = ((q/p)^x - 1)/((q/p)^a - 1) for p != 1/2 and x/a for p = 1/2; expected number of trials g(x) = x/(q-p) - (a/(q-p)) f(x) for p != 1/2 and x(a-x) for p = 1/2, sha256:e0ac4e5bbd2287e7322092c87063ddb9afdea4bbeacf83ab9597df579d86459b — https://www.randomservices.org/random/games/Timid.html; Grinstead & Snell, Introduction to Probability (2nd rev. ed., CHANCE Project GNU FDL version dated 4 July 2006), §11.2 Absorbing Markov Chains, Theorem 11.5 (t = Nc, row sums of the fundamental matrix give time to absorption) p.419 (PDF p.427), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; CAS Exam MAS-I Fall 2019, Q10 — official exam paper (scan), PDF p.14; Final Answer Key PDF p.50 (Q10 = A), sha256:32e26dbc1bd463e053ea0f9116473551be6d1b2f35b6d3670a716ecb86a141bd — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-19.pdf; CAS Exam MAS-I Fall 2018, Q10 — official exam paper (scan), PDF p.14; Final Answer Key PDF p.50 (Q10 = B), sha256:47ced888a314db1a5e29e28c0a52f989966b21a079b1c08634b73dc90e844296 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-18.pdf
- note: Verified, medium: every claim checked, both CAS examples match their page images and CAS final keys, all numbers recomputed independently. Medium because the Ross text read is an earlier edition than the 12th ed. on the outline and the expected-duration formula is confirmed at rank 3 (Siegrist) only. No findings.

## [F-001] Displayed division in the first worked example does not give the printed last digit
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-28T14:55Z/e368
- date: 2026-11-28
- severity: nit
- status: open
- locus: The worked example's third line of working
- claim: The working divides 0.5556 by 0.8683 and the next line prints 0.6398.
- evidence: Recomputed: 0.5556/0.8683 = 0.63987, which rounds to 0.6399. The unrounded value 135/211 = 0.639810 rounds to 0.6398, which is the page's printed answer. Only the displayed intermediate rounding is off in the last digit; the answer is right.
- source_rank: 5
- proposed_action: > &= \frac{0.5556}{0.8683} \\ (or show the intermediate values to four decimals with the answer 0.6398 taken from 135/211)
- applied: false
- fingerprint: 735d224010be

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-28T14:55Z/e368
- date: 2026-11-28
- status_set: verified
- confidence: high
- checks_run: Blind examples solved first in Python with exact fractions: C6 P(reach 5 from 2, p=0.6) = 135/211 = 0.63981; C11 fortune after 4H 2T = 12, P(reach 30) = 12/30, P(ruin) = 0.6; C15 Ann reaches 6 from 4 with p=0.45 = 16362/31003 = 0.52776 (Ben ruined = Ann reaches 6); C19 P(ruin from 3, p=0.6) = (2/3)^3 = 8/27 = 0.2963. All four answers match the page's stated results. C3 formula (p != 1/2 case) checked against Ross §4.5.1 Eq. (4.14), PDF p.35, P_i = (1 - (q/p)^i)/(1 - (q/p)^N), and against Siegrist Timid Play f(x) = ((q/p)^x - 1)/((q/p)^a - 1). The page has 1 + (q/p)^i in the numerator: a sign error, finding F1. The page's own worked example line (1 - (2/3)^2) uses the minus sign, so the box and the example disagree. C1 definition and C5 (0 and N absorbing, 1..N-1 transient, ruin = 1 - P_i): Ross p.217-218 three classes. C8 fair case P_i = i/N and C9 (N-i)/N: Ross Eq. (4.14) with p=1/2 and Siegrist f(x) = x/a. C10 Markov restart at current fortune: Ross P_i recursion/Markov chain. C12-C14 two players: i = a, N = a+b, p = win probability per round: Ross Example 4.24 (i=5, N=15) uses the same substitution. C15 working: q/p = 0.55/0.45 = 11/9, values (11/9)^4 = 2.2315, (11/9)^6 = 3.3335, ratio 0.5278, matching the page's -1.2315 / -2.3335 = 0.5278. C16-C17 N to infinity: Ross p.219 (4.14 limit: 1-(q/p)^i if p>1/2, 0 if p<=1/2). C18 consistent. C19 working: (q/p)^i with q/p = 2/3 and i = 3 is the ruin probability for an unlimited opponent, consistent with C17 (1 - P(never ruined)). C20 trap: P_12 with N=30, fair = 12/30 = 0.4, ruin 0.6, matching the arithmetic. Rounding nit F2: the page's working divides the rounded figures 0.5556 / 0.8683, which gives 0.6399, while the page prints 0.6398 (the exact value 0.63981 also rounds to 0.6398, so only the displayed working is off in the last digit). The log's earlier checks (C-001) are verified and have no open finding, so nothing carries over. Mechanical claims about the Markov/absorbing structure are supported by Ross, so nothing is unsourced.
- sources_checked: https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf, §4.5.1 Gambler's Ruin, Eq. (4.14), PDF pp.33-35, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf; Timid Play, §10 Timid Play, Probability of Winning, sha256:e0ac4e5bbd2287e7322092c87063ddb9afdea4bbeacf83ab9597df579d86459b — https://www.randomservices.org/random/games/Timid.html; https://math.dartmouth.edu/~prob/prob/prob.pdf, §11.2 Absorbing Markov Chains, Theorem 11.5, PDF p.427, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-19.pdf, Fall 2019 Q10, PDF p.14; key PDF p.50, sha256:32e26dbc1bd463e053ea0f9116473551be6d1b2f35b6d3670a716ecb86a141bd — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-19.pdf; https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-18.pdf, Fall 2018 Q10, PDF p.14; key PDF p.50, sha256:47ced888a314db1a5e29e28c0a52f989966b21a079b1c08634b73dc90e844296 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-18.pdf
