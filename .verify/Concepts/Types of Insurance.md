---
target: Concepts/Types of Insurance.md
created: 2026-09-13
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/f8d9
- date: 2026-09-13
- status_set: verified
- confidence: medium
- checks_run: Coverage-trigger section checked against Friedland printed p.42: for claims-made lines (medical malpractice, products liability, E&O, D&O) 'coverage may be dependent on the date on which the claim is reported to the insurer', and report year data is what actuaries prefer there; p.43 gives the reason the page states, that report year techniques 'only measure development on known claims and not pure IBNR'. Occurrence business grouped by accident year is Friedland p.40 ('accident year data refers to claims grouped according to the date of occurrence... the coverage triggering event'). Catastrophe exposure as the dominant risk on short-tail property lines is Werner p.99. Recomputed the leverage example independently before reading it: 1,000,000/0.95 = 1,052,632 (page rounds to 1,052,600) with IBNR 52,632 -> 52,600; 1,000,000/0.30 = 3,333,333 -> 3,333,300 with IBNR 2,333,300; a 5% CDF overstatement adds 1,000,000 x 1.0526 x 0.05 = 52,632 -> ~53,000 and 1,000,000 x 3.3333 x 0.05 = 166,667 -> ~167,000; ratio 167/53 = 3.15 ('three times as much') and 2,333,300/52,600 = 44.4 ('44 times larger') -- every figure reproduces, the rounding being to the nearest hundred throughout. Medium rather than high because the frequency/severity taxonomy and the method-selection example (chain ladder vs BF vs expected claims by maturity and volume) are pedagogical judgement consistent with, but not transcribed from, the passages I located; they are Friedland Ch.7-9 material I did not open on this pass. LaTeX balanced; links and embed resolve.
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.3 printed pp.40-43 (PDF pp.46-49), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.6 printed p.99 (PDF p.111) and Ch.15 printed p.305 (PDF p.317), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
