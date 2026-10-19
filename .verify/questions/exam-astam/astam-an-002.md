---
target: questions/exam-astam/astam-an-002.md
created: 2026-10-19
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-19T01:32Z/f53e
- date: 2026-10-19
- status_set: verified
- confidence: medium
- checks_run: independent recomputation before reading the keys: (a) payments max(X-500,0): 36,600 this year, 40,538 next (loss 1 crosses: 0 -> 28), 40,538/36,600-1=10.76% -> 10.8; (b) min(X,10,000): 29,580 -> 30,978, +4.73% -> 4.7; (c) direct 10% understates the deductible layer (10.8%>10%) and overstates basic limits (4.7%<10%) -> B, the only correct option (A, C, D, E each contradicted by (a)/(b)); keys 10.8, 4.7, B match; explanation tables reproduced row by row; distractors recomputed: 10.7 (40,510/36,600-1=10.68%), 7.1 (20,978/19,580-1=7.14%), excess layer 10,000 -> 12,560 (+25.6%), loss 2 payment 500 -> 600 (+20%), paying count 5 -> 6; options distinct; part (d) sample answer against W&M Ch.6 pp.117-118 (limit dampens basic-limits trend and leverages excess trend, Exhibit 6.20's 10% total-limits trend becoming 3.5% basic and 31.3% excess; 'deductibles also have a leveraging effect ... analogous to excess losses'; total-limits trend 'must be adjusted before it is applied to basic limits losses', or analyse basic-limits data); points 1+1+1+2=5; wiki links resolve; syllabus Topic 6(c) alignment; validate_content and question_lint clean
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp.117-118 (PDF pp.129-130): leveraged effect of limits on severity trend, Exhibit 6.20-6.21; deductibles' leveraging effect, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; SOA Exam ASTAM Syllabus, October 2026, Topic 6, learning outcome (c), p.5, sha256:6d462aea25c09b15cc457176ecf2d5d6143df8fb88df9f366557de17ec1ec9ba — https://www.soa.org/globalassets/assets/files/edu/2026/astam/2026-fall-exam-astam-syllabus.pdf
- note: Leveraging of deductibles and limits checked against Werner & Modlin Ch. 6, a CAS text and not an ASTAM reading; the ASTAM readings that treat it (Brown & Lennox Ch. 5; Loss Models) are commercial and were not reached, so medium. Arithmetic is a recomputation (rank 5); it agrees with every key.
