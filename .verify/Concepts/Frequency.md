---
target: Concepts/Frequency.md
created: 2026-09-13
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- status_set: verified
- confidence: high
- checks_run: Frequency = number of claims / number of exposures diffed against Werner Ch. 1 p.7 ('Frequency is a measure of the rate at which claims occur') and Ch. 6 p.93, including Werner's own worked figure 7,500/150,000 = 0.05; pure premium = frequency x severity against Werner Ch. 6 p.94 ('this is equivalent to the product of frequency and severity', with 18,750,000/150,000 = 125 = 0.05 x 2,500 - recomputed); the exposure-base and claim-definition caveats against Werner p.93 ('the numerator of this ratio can be expressed in various ways (e.g., reported, paid, or closed claims)... a decision should be made whether to include claims that closed without payment') and Ch. 1 p.7; the consistency rule that numerator and denominator choices must match across frequency and severity against Werner p.94. Both examples recomputed before reading the answers: 1,750/25,000 = 0.070 and 0.070 x 18,000 = 1,260; 3,000/50,000 = 0.0600, 3,744/52,000 = 0.0720, 12,000,000/3,000 = 4,000, 17,160,000/3,744 = 4,583.33, +20.0% and +14.58%, and the multiplicative check 1.200 x 1.14583 = 1.375 exactly reproduces 240 -> 330. No findings.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 p.7 (PDF p.19), Ch. 6 pp.93-94 (PDF pp.105-106), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
