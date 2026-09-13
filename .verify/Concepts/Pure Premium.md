---
target: Concepts/Pure Premium.md
created: 2026-09-12
---

## [F-001] Mis-exponentiated severity trend factor propagates through the worked example
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- severity: major
- status: open
- locus: Example 2 'Trending Pure Premium Through Its Components', answer block
- claim: The page gave 1.060^2.5 = 1.1593, combined factor 0.9629 x 1.1593 = 1.1162, projected PP $440 x 1.1162 = $491.13; and for the direct route 1.044^2.5 = 1.1129 giving $489.68, concluding the two routes agree 'within 0.3%'.
- evidence: Independent recomputation (P5, falsifying): 1.06^2.5 = 1.1568170, not 1.1593; 0.985^2.5 = 0.9629208 (page correct); their product is 1.1139232, so $440 x 1.1139 = $490.12. On the direct route 1.044^2.5 = 1.1136565, not 1.1129, so $440 x 1.1137 = $490.03. The true gap between the two routes is 1.1139232/1.1136565 - 1 = 0.024%, i.e. 0.02%, not 0.3%. The method itself is correct and source-backed: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 p. 8 (PDF p. 20) states 'Pure Premium = Losses / Number of Exposures = Frequency x Severity', and Ch. 6 p. 94 (PDF p. 106) repeats it; only the exponentiation was wrong.
- source_rank: 5
- proposed_action: Replace 1.1593 with 1.1568, 1.1162 with 1.1139, $491.13 with $490.12, 1.1129 with 1.1137, $489.68 with $490.03, and '0.3%' with '0.02%'.
- applied: true
- fingerprint: c45ab241372e

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- resolves: F-001
- status: resolved
- note: Corrected in this pass. The example now reads 1.060^2.5 = 1.1568, combined 1.1139, projected PP $490.12; direct route 1.044^2.5 = 1.1137 giving $490.03; agreement restated as 0.02%. Re-recomputation reproduces every figure.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- status_set: verified
- confidence: high
- checks_run: Recomputed both worked examples from scratch before reading the stated answers: 5,280,000/12,000 = 440; 960/12,000 = 0.080; 5,280,000/960 = 5,500; 0.080 x 5,500 = 440; 440/680 = 64.7%. Component trending recomputed to 0.9629 / 1.1568 / 1.1139 / $490.12 and direct trending to 1.1137 / $490.03 — the page's 1.1593/1.1162/$491.13/1.1129/$489.68 were wrong and are corrected in this pass (F-001, resolved). Definition and the Pure Premium = Frequency x Severity identity checked word-for-word against Werner Ch. 1 p. 8; 'loss cost or burning cost' is Werner's own wording. Rate formula (PP + fixed)/(1 - V - Q_T) checked against Werner Ch. 8 p. 143 (PDF p. 155). All 5 wiki-links resolve, the Media/Figures embed exists, $$ delimiters balanced.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 pp. 7-8 (PDF pp. 19-20), Pure Premium (or Loss Cost), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 p. 94 (PDF p. 106), frequency/severity/pure premium ratios, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 pp. 141-143 (PDF pp. 153-155), Pure Premium Method, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
