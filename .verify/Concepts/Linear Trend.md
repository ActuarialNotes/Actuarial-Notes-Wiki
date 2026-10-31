---
target: Concepts/Linear Trend.md
created: 2026-10-31
---

## [F-001] 'Used far more often' is not in Werner
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/275d
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'Its shortcoming', line 25
- claim: Page: 'Both models can be reasonable for increasing trends; the exponential model is used far more often because it has neither problem.'
- evidence: Werner & Modlin Ch. 6 p. 110 (PDF p. 122) says only that 'Linear and exponential regression models are the most common methods' and that 'Both types of models may be appropriate when measuring increasing trends, though the linear model will eventually project negative values when measuring decreasing trends.' Full-text search of the PDF finds no 'more often' and no relative-frequency statement about the two models.
- source_rank: 2
- proposed_action: Delete 'the exponential model is used far more often because it has neither problem' or replace with Werner's statement that both are the most common methods.
- applied: false
- fingerprint: 3f886ab0a2f4

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/275d
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: independent recomputation of both examples (Σt·y = 72, b = $7.20, $259.40; slope 3.40% of $212 and 2.99% of $241; exponential b = 0.031839, 3.235%, $261.97, gap $2.57; falling frequency ȳ = 0.0659, b = −0.00695, a = 0.0798, ŷ12 = −0.0036, ŷ9 = 0.01725, 13.4% vs 40.3%; exponential −10.13%, ŷ12 = 0.02240); constant-amount projection rule against p. 115; 'differences rather than percentage' against p. 112; negative-projection shortcoming against p. 110; premium-trend use of linear fits against p. 84; ASOP 13 §3.4/§3.6 for reasoned model choice
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp. 110, 112, 115 (PDF pp. 122, 124, 127); Ch. 5 p. 84 (PDF p. 96), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Formulas and examples check against Werner; one unsourced relative-frequency claim left open (minor).
