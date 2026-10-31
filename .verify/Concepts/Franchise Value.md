---
target: Concepts/Franchise Value.md
created: 2026-10-31
---

## [F-001] Pricing strategy said to remove the second rate effect; Panning says it changes its size
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:40Z/c56a
- date: 2026-10-31
- severity: minor
- status: open
- locus: 'The idea' callout, last sentence
- claim: Tying the target return to the interest rate removes the second effect.
- evidence: Panning p.9: 'The first of these two effects is unavoidable when interest rates change. But the magnitude of the second effect can be changed by adopting a different pricing strategy.' With b = 1, P = (S a + L)/(1+y) + E still falls as y rises, so premium dollars still respond to rates; the duration of F drops from 17.62 to 7.62 (p.10), it does not lose the effect. Panning, Managing Interest Rate Risk: ALM, Franchise Value, and Strategy (Willis Re, July 2006), pp.5-11 (model assumptions and notation pp.5-6; P - L - E + (S+P-E)y = kS, P = [S(k-y)+L]/(1+y)+E and C = S+P-E-L/(1+y) p.6; P, L, E followed by P*cr, L*cr, E*cr, d = cr/(1+y), P*d/(1-d) = P*cr/(1+y-cr), perpetuity at cr = 1, F = [P-E-L/(1+y)]*d/(1-d) p.7; k = a + b*y, b = 0 fixed, b = 1 risk-free plus premium, F = cr*S*(a+(b-1)y)/[(1+y)(1+y-cr)] p.8 and D = (a-b+1)/[(1+y)(a+by-y)] + 1/(1+y-cr) p.9, both read from the rendered pages; Table 1, duration of a total = dollar duration / PV, double impact of rates on interest-sensitive premiums p.9; D_V 6.70, 5.18, zero or negative asset duration infeasible and invisible to regulators and rating agencies p.10; pricing strategy a = 10%, b = 1 gives 7.62 and 3.27 p.10), sha256:9f569b0edf7a677b08716b2c06103c0c7826007d00c5a17c5f4d32f129e32278 — https://www.casact.org/sites/default/files/2021-03/9_Panning.pdf
- source_rank: 2
- proposed_action: Restate to Panning: 'changes the size of the second effect'.
- applied: true
- fingerprint: d903eaa82906

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:40Z/c56a
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Restated this run to Panning's wording (p.9): 'Tying the target return to the interest rate changes the size of the second effect'.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:40Z/c56a
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: every sentence against Panning pp.5-11 (notation and assumptions, income identity and premium, C, the series and d, F, k = a + b y, closed form and duration read from the rendered pp.8-9, double impact, total duration as value-weighted average); both examples recomputed blind (P 393.85, C 215.38, d 0.81731, F 68.83 by both forms, D_F 18.72 and 6.22, D_V 5.29 and 2.27; first renewal 7.212, d_2 0.88462, F 62.50 = 7.212/(1 - d_2)) and Panning's own check D = 1.15/0.105 + 1/0.15 = 17.62 reproduced; varying-retention method compared with the Spring 2017 Q12 sample answer and report; rule 10: neither example uses any Exam 9 question's figures (2013 Q9, 2014 Q10, 2016 Q15, 2017 Q12, 2019 Q8 read); wiki links resolve
- sources_checked: Panning, Managing Interest Rate Risk: ALM, Franchise Value, and Strategy (Willis Re, July 2006), pp.5-11 (model assumptions and notation pp.5-6; P - L - E + (S+P-E)y = kS, P = [S(k-y)+L]/(1+y)+E and C = S+P-E-L/(1+y) p.6; P, L, E followed by P*cr, L*cr, E*cr, d = cr/(1+y), P*d/(1-d) = P*cr/(1+y-cr), perpetuity at cr = 1, F = [P-E-L/(1+y)]*d/(1-d) p.7; k = a + b*y, b = 0 fixed, b = 1 risk-free plus premium, F = cr*S*(a+(b-1)y)/[(1+y)(1+y-cr)] p.8 and D = (a-b+1)/[(1+y)(a+by-y)] + 1/(1+y-cr) p.9, both read from the rendered pages; Table 1, duration of a total = dollar duration / PV, double impact of rates on interest-sensitive premiums p.9; D_V 6.70, 5.18, zero or negative asset duration infeasible and invisible to regulators and rating agencies p.10; pricing strategy a = 10%, b = 1 gives 7.62 and 3.27 p.10), sha256:9f569b0edf7a677b08716b2c06103c0c7826007d00c5a17c5f4d32f129e32278 — https://www.casact.org/sites/default/files/2021-03/9_Panning.pdf; CAS Exam 9 Spring 2017 — sample answers and examiner's report, Q12 part a, PDF pp.61-62 (FV with first-year retention 90% then 80%: first-year term then later years scaled by it and multiplied by d/(1-d); examiner: 'how to apply it when the client retention rates vary from one year to the next'), sha256:bca96aba31c0e64a7b054e54622485f16ed3195dcce4b2c7bf94505134ab7176 — https://www.casact.org/sites/default/files/2021-03/17-9.pdf
- note: New page, verified at high: every formula is on Panning's (the assigned reading, open on casact.org) printed pages and both examples recompute. The varying-retention example is Panning's own series with two retentions, the method the Spring 2017 Q12 sample answers use. Spring 2013 Q9's solution prints the numerator as a + b*y; the page keeps Panning's a + (b-1)y, and the two agree at b = 0 as in that question. One minor restatement (F-001). Not linked from any other exam's page.
