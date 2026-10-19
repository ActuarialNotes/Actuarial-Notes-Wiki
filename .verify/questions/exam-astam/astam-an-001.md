---
target: questions/exam-astam/astam-an-001.md
created: 2026-10-19
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-19T01:32Z/f53e
- date: 2026-10-19
- status_set: verified
- confidence: medium
- checks_run: independent recomputation before reading the keys: (a) OLS of ln(severity) on x=0..5 gives b=0.0600606 (Sxx=17.5, Sxy=1.0510597), e^b-1=6.190% -> 6.2; (b) AY2024 average accident date 7/1/2024, annual policies written 1/1-12/31/2026 cover to 12/31/2027, average 1/1/2027 -> 2.5 years; (c) 4,200,000 x 1.062^2.5 = 4,200,000 x 1.1622814 = 4,881,581.9 -> 4881582; all three keys match; explanation line by line (six logarithms, mean 8.702532, Sxy, b) reproduced; each named distractor recomputed: 6.0 (slope b), 6.1 (end-point (7000/5200)^0.2-1=6.13%), 5.2 (linear slope 362.857/7000=5.18%), 4,736,945 (n=2), 4,596,593 (n=1.5), 5,030,635 (n=3), 4,851,000 (simple growth); every wrong entry rounds away from its key, so each part has one defensible answer; method against W&M Ch.6 (exponential model as constant rate of change; trend period from average loss occurrence date of the experience period to that of the policy period, the book's AY2011/PY2015 annual-policy example giving 7/1/11 to 12/31/15 = 4.5 years, same convention as here; trend factor (1+t)^n); points 2+1+1=4; wiki links resolve; syllabus Topic 6(c) alignment; validate_content and question_lint clean
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp.110-111, 113-114 (PDF pp.122-123, 125-126): exponential regression for loss trend; loss trend period, average accident date to average accident date of policy-year forecast period, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; SOA Exam ASTAM Syllabus, October 2026, Topic 6, learning outcome (c), p.5, sha256:6d462aea25c09b15cc457176ecf2d5d6143df8fb88df9f366557de17ec1ec9ba — https://www.soa.org/globalassets/assets/files/edu/2026/astam/2026-fall-exam-astam-syllabus.pdf
- note: Method checked against Werner & Modlin Ch. 6, a CAS text and not an ASTAM reading; the ASTAM reading on trend (Brown & Lennox Ch. 5) is commercial and was not reached, and none of the seven SOA ASTAM solution sets 2023-2026 (searched for 'trend') sets a trend-period or trend-fit question, so medium. Arithmetic is a recomputation (rank 5); it agrees with every key.
