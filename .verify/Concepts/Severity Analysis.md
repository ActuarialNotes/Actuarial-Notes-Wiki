---
target: Concepts/Severity Analysis.md
created: 2026-10-31
---

## [F-001] Average case outstanding jump presented as conclusive case strengthening; Friedland's settlement-rate caveat missing
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/275d
- date: 2026-10-31
- severity: major
- status: open
- locus: bullet 'As a reserving diagnostic' (line 26) and example 'Diagnosing a Triangle' conclusion (line 66)
- claim: Page: average case outstanding 'is the sharpest single indicator: a jump across all accident years in one calendar year is case strengthening'; the example concludes the diagonal jump 'is a case reserve strengthening during the 2024 calendar year'.
- evidence: Friedland Ch. 6 p. 81 (PDF p. 81) calls the average case outstanding triangle 'one of the most important diagnostic tools', and an increasing pattern down the column 'an indicator of possible strengthening'; it warns that average case outstanding 'could also be changing due to changes in the mix of business' and (p. 82) that if smaller claims settle more quickly 'we are then left with only the more complex and more expensive claims. This, in and of itself, would lead to an increase down the columns in the average case outstanding', so the actuary must test with other diagnostics (closed-to-reported counts, p. 77-78; Berquist-Sherman's comparison of average case outstanding trend with average paid trend, Ch. 13 pp. 291-292) before concluding. The page states the conclusion without that condition.
- source_rank: 2
- proposed_action: Qualify the bullet and the example's conclusion: a diagonal jump indicates possible case strengthening, to be confirmed against settlement-rate diagnostics (closed-to-reported counts, average paid trend) because faster settlement of small claims produces the same pattern.
- applied: false
- fingerprint: 17bdc9971e19

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/275d
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: consistent numerator/denominator definitions against Werner p. 94 and Friedland p. 79; reading triangles down the columns against Friedland pp. 71, 80-81; large-loss and limited-claims treatment against Friedland p. 79; average case outstanding diagnostic and its caveats against Friedland pp. 81-82; reported vs paid development under case strengthening and Berquist-Sherman case adjustment against Friedland Ch. 13 pp. 291-292; frequency-severity projection against Ch. 11 p. 210; independent recomputation: $5,000, $6,000, (1.2)^0.5 − 1 = 9.54%; column changes +3.3%/+2.2% (≈2.7% a year), +30.5%, +4.1%, +29.8%, +31.0%; wiki-links
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Third Version, July 2010), Ch. 6 pp. 71, 76-82; Ch. 11 p. 210; Ch. 13 pp. 291-292 (PDF pages), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 p. 94 (PDF p. 106), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Formulas and arithmetic check against Friedland and Werner; one major finding (missing settlement-rate condition on the case-adequacy diagnosis) left open — it needs new prose, which this agent may not author. Confidence medium for that reason.
