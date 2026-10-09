---
target: Concepts/Loss Trend.md
created: 2026-09-12
---

## [F-001] The overlap fallacy is mischaracterized
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- severity: major
- status: open
- locus: bullet 2 ('Trend and development answer different questions…'), final clause
- claim: 'Werner warns explicitly against the overlap fallacy — using calendar-year data that already contains inflation and then trending it again.'
- evidence: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 p. 120 (PDF p. 132), section headed 'Overlap Fallacy: Loss Development and Loss Trend': 'It may seem that trending and developing losses results in overlapping adjustments; however, this is not the case… It is true that loss development incorporates inflationary pressures that cause payments for reported claims to increase in the time after reporting, but this does not prove an overlap either.' The overlap fallacy is therefore (a) the mistaken *belief* that applying both loss development and loss trend double-counts inflation — a belief Werner refutes, not a practice he warns against — and (b) about development vs. trend, not about calendar-year data. It is listed as its own key concept (item 10) in Werner's Key Concepts in Chapter 6, p. 124 (PDF p. 136), so a candidate asked to define it would be misled by this sentence.
- source_rank: 2
- proposed_action: Restate the clause as: the overlap fallacy is the mistaken belief that developing and trending the same losses double-counts inflation; Werner shows it does not, because development moves an immature year to its own ultimate while trend moves that ultimate to a future cost level (Werner Fig. 6.22 timeline, p. 120).
- applied: false
- fingerprint: e7856070a686

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- status_set: verified
- confidence: medium
- checks_run: Recomputed the trend-period example independently first: AY 2023 average loss date 7/1/2023; policies written 7/1/2025-6/30/2026 are exposed 7/1/2025-6/30/2027 with midpoint 7/1/2026; n = 3.0 and 1.05^3 = 1.157625 — all correct, and the construction matches Werner's Fig. 6.22 timeline (CAY 2010 avg. 7/1/2010 to PY 2012 avg. 12/31/2012 = 30 months). Refit the severity series from scratch: (11,100/8,000)^0.2 - 1 = 6.77%, (11,100/8,700)^(1/3) - 1 = 8.46%, (11,100/9,400)^0.5 - 1 = 8.67%, and all five year-over-year changes (3.75/4.82/8.05/8.51/8.82%) round to the table. Located and read the Overlap Fallacy section — the page mischaracterizes it (F-001, major, open). Confidence held at medium for one further reason: the page's characterization of ASOP 13's requirements could not be checked — ASOP 13 is not in the offline corpus (only ASOP 12 and ASOP 43 are), so that sentence is unsourced. All wiki-links resolve incl. the ASOP 13 page; embed present; LaTeX balanced.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp. 109-120 (PDF pp. 121-132), Loss Trend, trend period and Overlap Fallacy incl. Fig. 6.22, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 p. 124 (PDF p. 136), Key Concepts in Chapter 6, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Werner Ch.6 pp.120-121 (PDF pp.132-133), 'Overlap Fallacy: Loss Development and Loss Trend', re-read: 'It may seem that trending and developing losses results in overlapping adjustments; however, this is not the case ... Trending procedures restate losses that occurred in the past to the level expected for similar losses that will occur during the future period ... Loss development procedures bring the immature losses to their expected ultimate level. It is true that loss development incorporates inflationary pressures that cause payments for reported claims to increase in the time after reporting, but this does not prove an overlap either.' Bullet 2 now defines the overlap fallacy as the belief that doing both double-counts inflation, in Werner's terms; the calendar-year mischaracterisation is gone.

## [F-002] Trend period said to be 'typically 2 to 3 years'; Werner's own worked example is 4.5 years
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullet 1
- claim: 'For annual policies and a full-year accident period, n is typically 2 to 3 years'.
- evidence: Werner Ch.6 p.113 (PDF p.125): AY 2011 losses, annual policies, rates effective 1/1/2015 for one year: trend from 7/1/2011 to 12/31/2015, 'the loss trend period for Calendar-Accident Year 2011 is 4.5 years'; p.114 (PDF p.126) PY 2011 to the same period is 4 years. The length depends on the lag between the experience period and the effective date; no source gives 2-3 years as typical.
- source_rank: 2
- proposed_action: Delete the typical range; give Werner's worked case.
- applied: true
- fingerprint: 9d3e7be31801

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Bullet 1 now gives Werner's example (7/1/2011 to 12/31/2015 = 4.5 years) instead of the unsourced range.

## [F-003] ASOP 13 requirements and the trend-fitting practice paraphrased without a source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullet 3 ('Trend is selected, not merely fitted') and the closing paragraph of 'Fitting and Selecting a Trend'
- claim: 'Standard practice is to fit exponential regressions over several windows (e.g. latest 4, 6, 8, 12, 20 quarters) ... ASOP 13 requires the actuary to consider the appropriateness of the data, the period, and the fitted model, and to disclose the basis of the selection.' Example: 'What ASOP 13 requires is that the choice be reasoned and disclosed ... would not meet the standard.'
- evidence: ASOP 13 (CAS copy, read this session): §3.2 select data appropriate to the trends analysed; §3.5 consider the lengths of the experience and forecast periods in setting the trending period; §3.6 evaluate each procedure's results for reasonableness; §3.8 document methods, assumptions, procedures and data sources 'in a form such that another actuary qualified in the same practice area could assess the reasonableness'; §4.2(a) disclose the basis of a range. It does not require disclosing 'the basis of the selection' as such. Werner Ch.6 pp.110-112 (PDF pp.122-124): linear and exponential regressions are the most common methods; separate exponential models may be fit to the whole of the data and to more recent periods; supplement with multi-state, countrywide or industry data and non-insurance indices. The 2026-09-12 pass flagged the ASOP 13 sentence as unsourced (ASOP 13 was not then available).
- source_rank: 2
- proposed_action: Restate both in the sources' terms.
- applied: true
- fingerprint: be89fdc42d52

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Bullet 3 now paraphrases Werner pp.110-112 and ASOP 13 §§3.2, 3.5, 3.6, 3.8; the example's closing paragraph now says ASOP 13 asks for the estimate to be evaluated for reasonableness and documented so another actuary could assess it (§§3.6, 3.8).

## [F-004] Frequency/severity example not in the source; Werner's is the higher deductible
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullet 'Frequency and severity are trended separately'
- claim: '... falling frequency from vehicle safety technology against rising severity from the cost of repairing that technology.'
- evidence: Werner Ch.6 p.110 (PDF p.122): 'frequency and severity are typically analyzed separately to better understand the underlying drivers of the trend. For example, if an insurance company heavily markets a higher deductible, the resulting shift in distribution will lower frequencies but is likely to increase severities. It may be difficult to detect these changes in a pure premium analysis.' Safety technology appears only as a general trend driver.
- source_rank: 2
- proposed_action: Use Werner's example.
- applied: true
- fingerprint: a5cca784113a

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-004
- status: resolved
- note: Bullet now gives Werner's reason and example (p.110, PDF p.122).

## [F-005] Two-step trending described as a benefit-level restatement
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: major
- status: open
- locus: bullet 'A two-step trend is used when a level shift ... breaks the series'
- claim: 'A two-step trend is used when a level shift (a benefit change, a law amendment, a coverage change) breaks the series: the shift is handled by a separate law-level adjustment and only the residual trend is fitted.'
- evidence: Werner Ch.6 p.115 (PDF p.127): two-step trending 'is beneficial when the actuary believes that the loss trend in the historical experience period and the expected trend for the forecast period are not identical'; 'First, the losses in the experience period are trended from the average accident date in the experience period to the average accident date of the last data point in the trend data' (7/1/2011 to 6/30/2013, -1%, factor 0.98); 'Second, these trended losses are projected from the average accident date of the latest data point ... to the average loss occurrence date for the forecast period' (2.5 years at 2%, 1.05). Legislative changes are given as one example of when it may be appropriate. Restating data for a benefit change is a separate adjustment (p.112, PDF p.124: take care not to 'double count' the benefit level change). A candidate asked to describe two-step trending would describe the wrong procedure.
- source_rank: 2
- proposed_action: Describe Werner's two steps; keep benefit restatement as a separate point.
- applied: true
- fingerprint: 4fe977de4ac0

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-005
- status: resolved
- note: Bullet rewritten: used when historical and forecast trends differ (legislative changes one example); step one at a current trend to the latest trend data point's average accident date, step two at a separately selected trend to the forecast period's average accident date; a benefit-level change restated or allowed for so it is not double counted (Werner p.115, PDF p.127; p.112, PDF p.124).

## [F-006] Limits bullet says trend 'is applied to capped or basic-limits losses' and excess is 'handled through ILFs'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: last bullet
- claim: 'Trend is applied to capped or basic-limits losses; excess layers trend faster (leveraged trend) and are handled through ILFs.'
- evidence: Werner Ch.6 pp.117-118 (PDF pp.129-130), 'Leveraged Effect of Limits on Severity Trend': a 10% total-limits trend is dampened to 3.5% on basic limits and magnified in the excess layer; 'Where severity trends have been analyzed based on total limits loss data, the resulting indicated severity trend must be adjusted before it is applied to basic limits losses ... Alternatively, some actuaries prefer to use basic limits data in analyzing severity trend.' Trend is not confined to capped losses, and the handling of excess trend through ILFs is not in Ch.6.
- source_rank: 2
- proposed_action: State the leveraging effect and the two remedies Werner gives.
- applied: true
- fingerprint: dd4fb1ea0a95

## [F-006/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-006
- status: resolved
- note: Bullet now states Werner's leveraging (basic slower, excess faster for a positive trend) and the adjust-or-use-basic-limits-data remedies (pp.117-118, PDF pp.129-130); the ILF link is kept as a see-also.

## [F-007] Example labels end-point annualised changes 'fitted exponential trends'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: Example 'Fitting and Selecting a Trend', first line of the answer
- claim: 'Fitted exponential trends over different windows:' followed by (11,100/8,000)^(1/5) - 1 = 6.8%, (11,100/8,700)^(1/3) - 1 = 8.5%, (11,100/9,400)^(1/2) - 1 = 8.7%.
- evidence: The displayed formulas use only each window's end points; an exponential fit (Werner p.110, PDF p.122) uses every point. Recomputed least-squares fits of ln(severity) on year: 2019-2024 (6 points) 6.89%; 2021-2024 8.46%; 2022-2024 8.67%. The end-point figures 6.77%, 8.46%, 8.67% round to the page's 6.8/8.5/8.7. Arithmetic right, label wrong.
- source_rank: 5
- proposed_action: Label them end-point annual trends and give the regression values alongside.
- applied: true
- fingerprint: 6527ff123750

## [F-007/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-007
- status: resolved
- note: Line now reads 'Annual trends over different windows, from end point to end point (an exponential regression through every point gives 6.9%, 8.5% and 8.7%)'; 'five-year fit'/'two-year fit' changed to 'figure'.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: Read Werner Ch.6 Loss Trend through Overlap Fallacy end to end and ASOP 13 §§1-4 this session. Drivers (inflation, medical costs, safety technology, social influences per ASOP 13 §2.4, distributional changes) against Werner p.110; PP trend = (1+freq)(1+sev) - 1 against p.112 (-1% and +2% -> +1%); trend period definition against p.113. Example 1 recomputed before reading: 7/1/2023 to 7/1/2026 = 3.0, 1.05^3 = 1.157625; start-of-period error understates by 1 - 1/1.05 = 4.8%, midpoint error by 1 - 1/1.05^0.5 = 2.4% (page: 5% and 2%). Example 2: all five year-over-year changes reproduce (3.75/4.82/8.05/8.51/8.82%).
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp.109-121 (PDF pp.121-133), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; ASOP No. 13, Trending Procedures in Property/Casualty Insurance (ASB, 2009), Sections 1-4, pp.1-4 (PDF pp.5-8), sha256:5d985e9cbf666cda56b67bb6489e2f1430313278145e87816c7b2297dcd59acd — https://www.casact.org/sites/default/files/2021-03/5_ASOP_13.pdf
- note: F-001 (major) resolved; six new findings (F-005 major, five minor) fixed and resolved. Confidence medium: the second example's selection discussion is the vault's own judgment.
