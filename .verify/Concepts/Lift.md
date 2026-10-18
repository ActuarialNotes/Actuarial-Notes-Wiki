---
target: Concepts/Lift.md
created: 2026-10-18
---

## [F-001] Lift defined with the marketing response-rate definition, not the readings'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- severity: major
- status: open
- locus: lead, formula blocks, 'Lift chart (gains chart) construction', bullets, example
- claim: Page defined lift as the response rate in the top-scored decile divided by the overall response rate (and cumulative lift vs fraction targeted, =1 at 100%), with a fraud example giving lift 3.5.
- evidence: Goldburd §7.2 p.76: model lift is 'the economic value of a model', its ability to prevent adverse selection, a relative concept between competing models, measured on holdout data; §7.2.1 p.77 defines lift as the vertical distance between the first and last quantiles of a simple quantile plot (actual pure premium of best vs worst predicted risks). Salis §3.1 p.4 quotes 'the vertical distance between the first and last quantiles' (GLM p.77) and gives L_ratio = Y_Q/Y_1, L_odds ratio, L_difference; says MAS-II will not directly test the calculation of lift as a metric. 'response rate' occurs zero times in the monograph; 'lift' zero times in ISLR. The page's decile/gains-chart definition is in neither reading.
- source_rank: 2
- proposed_action: Restate to Goldburd §7.2/§7.2.1 and Salis §3.1: model lift, lift as the vertical distance, the three Salis formulas, the four §7.2 measures; replace the fraud example with the monograph's own decile-plot spreads (0.55-1.30 vs 0.40-1.60, p.78).
- applied: true
- fingerprint: 28f8098978a6

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Restated in this run: lead to Goldburd §7.2/§7.2.1, formulas to Salis §3.1 (ratio, odds ratio, difference with Y_1, Y_Q the actual rates), bullets to Goldburd §7.2's list of measures and Salis's exam note; the example now uses Goldburd p.78's spreads, lift ratios recomputed 1.30/0.55 = 2.36 and 1.60/0.40 = 4.00. The figure (Media/Figures/Lift.svg, top bucket 2.1× the bottom) already showed this sense.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: definition and formulas against Goldburd §7.2-7.2.1 and Salis §3.1; full-text search of both readings for 'response rate' and 'lift'; example recomputed from Goldburd p.78's figures; links resolved
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., Chapter 7, §7.1-7.3.1 incl. fn 17, pp.75-85 (PDF pp.85-95), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Salis, Measures of Predictive Accuracy, CAS Study Note for MAS-II (updated November 6, 2025), §§1-4, pp.1-12 (whole note), sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010 — https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf
- note: Verified after the F-001 restatement. Every claim now traces to Goldburd §7.2/§7.2.1 (pp.76-78) or Salis §3.1 (p.4).
