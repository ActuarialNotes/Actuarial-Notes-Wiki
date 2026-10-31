---
target: Concepts/Actual vs Expected Analysis.md
created: 2026-10-31
---

## [F-001] Expected-emergence formula is Friedland's only when the prior ultimate came from the development technique
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- severity: major
- status: open
- locus: defining formula (Expected emergence)
- claim: Expected emergence = U_prior × (1/CDF_{n+1} − 1/CDF_n)
- evidence: Friedland Ch.15 'Monitoring and Interim Techniques', printed p.351 (PDF p.357): 'expected reported claims in the calendar year are equal to: [(ultimate claims selected at December 31, 2007 – actual reported claims at December 31, 2007) / (% unreported at December 31, 2007)] x (% reported at December 31, 2008 - % reported at December 31, 2007)', with % unreported = 1 − 1/CDF. Worked: AY07 = [($2,798 − $2,463)/(1 − 0.880)] × (0.999 − 0.880) = $332; the page's formula gives 2,798 × 0.119 = $333. The two agree only when actual reported at the prior valuation equals U_prior/CDF_n, i.e. when the prior ultimate was itself selected by the reported development technique — Friedland notes deriving the pattern from CDFs is reasonable in that case but 'actuaries often rely on techniques other than the development technique to select ultimate claims'. For a BF- or Cape Cod-selected ultimate the page's formula scores emergence against the wrong base. The page's own Example 1 (reported 6.0M = 60% of 10.0M) gives 1.5M under both forms, so no example changes.
- source_rank: 2
- proposed_action: Replace the formula with Friedland's: (U_prior − Reported_n)/(1 − 1/CDF_n) × (1/CDF_{n+1} − 1/CDF_n).
- applied: true
- fingerprint: aea3541ba082

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Formula transcribed from Friedland Ch.15 printed p.351 (PDF p.357): Expected emergence = (U_prior − Reported_n)/(1 − 1/CDF_n) × (1/CDF_{n+1} − 1/CDF_n). Example 1 still reproduces 1,500,000 ((10.0M − 6.0M)/0.40 × 0.15).

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Examples recomputed before reading the stated answers: Ex.1 expected 10.0M × (0.75 − 0.60) = 1.5M (Friedland form (10.0M − 6.0M)/0.40 × 0.15 = 1.5M), actual 8.1M − 6.0M = 2.1M, A/E 1.40, re-estimate 8.1M/0.75 = 10.8M, +8% — all match. Ex.2 reasoning (uniform reported A/E ≈ 1.3 with paid ≈ 1.0 → case strengthening; reported development factors then overstate) is consistent with Friedland Ch.15 p.349-350 on case outstanding strength. Formula diffed against Friedland's DC Insurer model (F-001, fixed). Definition and 'primary monitoring tool between full reviews' against Ch.15 pp.350-351: Wiser's fourth phase, 'deviations of actual development from projected development ... one of the most useful diagnostic tools', models capturing actual vs expected reported or paid by month or quarter, by accident year between successive valuations. Task B17 wording ('actual versus expected') from the Fall 2026 outline p.5. Wiki links and figure embed resolve.
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ver. July 2010), Ch.15 pp.345-353 (PDF pp.351-359), Ch.7 p.93 (PDF p.99), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; CAS Exam 5 Content Outline, Fall 2026, pp.3-6 (tasks A3, B16-B20; Complete Text References), sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf
- note: Verified against Friedland Ch.15. F-001 (major) fixed by transcribing Friedland's expected-claims formula. The paid-vs-reported diagnostic bullet and the 'run of deviations is a signal' heuristic are the page's own reasoning — not stated in Friedland, but consistent with Hugh White's problem as Friedland quotes it (p.352-353: no answer is satisfactory 'without further extensive investigation').

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/cde6
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: whole page against Ch.15; purpose of A/E (p.351); interpolation: quarterly interpolation sufficient for monthly, annual usually not appropriate esp. most immature years (p.352); BF 40/70/85/100 vs uniform 25/50/75/100 (p.352); White's options 1-3 and 'none ... satisfactory without further extensive investigation' (p.353); writer's interpolation example recomputed: 60% + (3/12)(20%) = 65%; Example 1 recomputed with Friedland's formula ((10.0M-6.0M)/0.40 x 0.15 = 1.5M; A/E 1.40; 10.8M)
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.15 Evaluation of Techniques, PDF pp.357-359 (printed 351-353): A/E purpose and expected-claims formula, quarterly/monthly interpolation, Bornhuetter-Ferguson quarterly distribution, Hugh White's three options, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: New material agrees with Friedland Ch.15; the 60%/80% interpolation example is illustrative and arithmetically correct.
