---
target: Concepts/Claims Made Coverage.md
created: 2026-09-13
---

## [F-001] Werner's claims-made principles misstated: Principle 1 loses its condition and Principle 3 is inverted
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- severity: major
- status: open
- locus: bullet 6, 'Werner's principles for claims-made pricing'
- claim: The principles are: a claims-made policy should always cost less than an occurrence policy for the same exposure; if the reporting pattern is stable, the claims-made rate is less sensitive to the reporting-pattern assumption; and claims-made policies incur no liability for IBNR beyond the reported claims, so the insurer's exposure to unexpected reporting-pattern shifts falls on the insured instead.
- evidence: Werner & Modlin Ch. 16 printed pp.315-317 (PDF pp.327-329) states five principles verbatim. P1: 'A claims-made policy should always cost less than an occurrence policy as long as claim costs are increasing' - the page drops the condition, which is the whole content of the principle (Table 16.3 shows 1,000.00 claims-made against 1,105.13 occurrence for 2010 only because loss costs trend at 5%). P2: 'If there is a sudden, unpredictable change in the underlying trends, the claims-made policy priced based on the prior trend will be closer to the correct price than an occurrence policy' - omitted. P3: 'If there is a sudden, unexpected shift in the reporting pattern, the cost of a mature claims-made policy will be affected relatively little, if at all, relative to the occurrence policy' - the page inverts the hypothesis to 'if the reporting pattern is stable' and drops 'mature', which is the operative word (Werner's Table 16.5 shows zero impact on claims-made loss costs and a 1% move on occurrence). P4: 'Claims-made policies incur no liability for IBNR, so the risk of reserve inadequacy is greatly reduced' - the page replaces the conclusion with 'the insurer's exposure to unexpected reporting-pattern shifts falls on the insured instead', which is not in the text. P5: 'The investment income earned from claims-made policies is substantially less than under occurrence policies' - omitted, and it is the principle that changes the target underwriting profit provision. Everything else on the page checks out against the same chapter: the retroactive-date and report-date double test (p.318, PDF p.330), step factors as a percentage of the mature rate (p.318), and the step example's cumulative lag weights (0.25, 0.60, 0.85, 1.00 against a 25/35/25/15 reporting pattern) recompute exactly.
- source_rank: 2
- proposed_action: Restate the five principles as Werner states them, keeping P1's 'as long as claim costs are increasing' and P3's 'sudden, unexpected shift... mature claims-made policy', and add the omitted P2 and P5.
- applied: false
- fingerprint: 9077fef66e2a

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- status_set: verified
- confidence: medium
- checks_run: The two-condition trigger diffed against Werner Ch. 16 p.318 ('The claims-made coverage only covers claims that occur on or after the retroactive date' plus report in the policy period, illustrated by L(2011,0) for a first-year policy) and Ch. 2 p.26; extended reporting coverage against Werner Ch. 2 p.26 ('extended reporting coverage covers claims that occur during the coverage period but are reported after the policy terminates') and Ch. 16 p.316; no pure IBNR against Werner Ch. 16 p.317 Principle 4 and Friedland Ch. 3 p.43; step factors as a percentage of the mature claims-made rate against Werner Ch. 16 p.318 and the maturity table at Ch. 2 p.26; the report-year basis against Friedland Ch. 3 p.42 and Werner Ch. 16 p.314. All four rows of the trigger example checked date by date. The step example recomputed before reading the answers: a 25/35/25/15 reporting pattern gives cumulative 0.25/0.60/0.85/1.00, so 5,000/12,000/17,000/20,000 as printed; the closing remark that a mature claims-made rate sits below the occurrence rate by about the average lag's worth of trend is borne out by Werner's Table 16.3, where 1,000.00 x 1.05^2 = 1,102.50 against an occurrence loss cost of 1,105.13. The principles bullet is wrong - finding F-001, major, open - which is why confidence is medium rather than high.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 16 pp.313-319 (PDF pp.325-331), Ch. 2 p.26 (PDF p.38), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 3 pp.38, 42-43 (PDF pp.44, 48-49), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf
