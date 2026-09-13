---
target: Concepts/Written Premium.md
created: 2026-09-12
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:16Z/58a9
- date: 2026-09-12
- status_set: verified
- confidence: high
- checks_run: Definition diffed against Werner Ch.5 (printed p.66 = PDF p.78): 'Written premium is the total amount of premium for all policies written during the specified period... the key in determining written premium is the inception date of the policy' — matches, including the mid-term-adjustment point (Werner's Policy D cancellation booking -$100 of written premium into the following calendar year, PDF p.79) that the page's last bullet makes about endorsements, cancellations and audits. The identity EP = WP - delta-UEP is Werner's 'CY Unearned Premium = CY Written Premium - CY Earned Premium + Unearned Premium as of the beginning of the CY' (printed p.70 = PDF p.82) rearranged; I re-derived it. The premium-trend bullet is confirmed on PDF p.91: 'written premium is a leading indicator of trends that will eventually emerge in earned premium... the actuary will often use quarterly average written premium'. Both examples recomputed from scratch before reading their answers: 1,200 written / 1,200 x 3/12 = $300 earned / $900 UEP, and 1,200 - (900 - 0) = 300; and 26,640,000/40,000,000 = 66.6%, 31,680,000/52,000,000 = 60.9%, 26,640,000/37,000,000 = 72.0%, 31,680,000/44,000,000 = 72.0%, with written growth 52/40 = +30% against earned growth 44/37 = +18.9% — every figure on the page reproduces.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 p.2 (PDF p.14), Ch. 5 pp.66-70 (PDF pp.78-82) and Ch. 5 premium trend pp.78-79 (PDF pp.90-91), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- note: No findings. Definition, both formulas and both worked examples confirmed against Werner Ch.5.
