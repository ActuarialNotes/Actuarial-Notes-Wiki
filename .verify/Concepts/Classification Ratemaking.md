---
target: Concepts/Classification Ratemaking.md
created: 2026-09-12
---

## [F-001] Rating-variable criteria: category renamed 'Actuarial' and an extra sub-criterion added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- severity: minor
- status: open
- locus: Section "Werner's criteria for a rating variable", first bullet
- claim: 'Actuarial — statistically significant, accurate, homogeneous within class, and credible', presented as Werner's criteria.
- evidence: Werner Ch. 9 p.155 (PDF p.167) attributes the criteria to Robert Finger, 'Risk Classification' (Finger 2001, pp.292-301) and groups them as Statistical / Operational / Social / Legal. The statistical criteria are exactly three — 'Statistical significance, Homogeneity, Credibility' — with no separate 'accurate' item. The page's other three categories match the text (operational: objective, inexpensive to administer, verifiable, p.156; social: affordability, causality, controllability, privacy concerns, p.157). Renaming the first category 'Actuarial' costs a candidate the source's own heading in a list-the-categories question. Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- source_rank: 2
- proposed_action: Rename the bullet 'Statistical', drop 'accurate', and attribute the framework to Finger (2001) as cited by Werner.
- applied: false
- fingerprint: 0248565d8c8a

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- status_set: verified
- confidence: high
- checks_run: The four criteria categories and their sub-criteria diffed against Werner pp.155-157 (statistical: significance/homogeneity/credibility; operational: objective/inexpensive to administer/verifiable; social: affordability/causality/controllability/privacy) — see F-001; the adverse-selection argument checked against Werner pp.153-154 (favourable selection, the motorcycle example, 'skimming the cream'); the univariate-double-counting and loss-ratio-denominator claims checked against Werner p.189 and its footnote 37; Principle 3 wording checked in the SOP; both examples recomputed from scratch ($200 and $300 pure premiums, relativity 1.50, base rate $200/0.60 = $333.33, class rate $500; one-way 1.80 x 1.56 = 2.81 against GLM 1.55 x 1.20 = 1.86, an overcharge of 51%).
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 9 pp.154-158 (PDF pp.166-170) and Ch. 11 p.189 with footnote 37 (PDF p.201), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; CAS Statement of Principles Regarding Property and Casualty Insurance Ratemaking (adopted May 1988), sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — p.3, Principle 3
- note: One open minor finding on the naming of the criteria categories; all arithmetic reproduces.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Werner Ch.9 p.155 (PDF p.167), re-read this run: the criteria are Finger's (2001), grouped Statistical / Operational / Social / Legal, and the statistical criteria are exactly statistical significance, homogeneity and credibility. Heading changed to 'Criteria for a rating variable (Werner, after Finger's Risk Classification)', first bullet renamed 'Statistical' and 'accurate' dropped.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: Every bullet re-read against Werner: criteria Ch.9 pp.155-158; adverse selection pp.151-153; one-way double counting (Werner's own phrase) and the loss ratio method adjusting for other variables' current relativities pp.161-170; youthful drivers/old cars and minimum bias as iteratively standardized one-way approaches Ch.10 p.172; base-rate offset for relativity changes p.159; Principle 3 in the SOP. Both examples recomputed: 2,000,000/10,000 = 200, 1,500,000/5,000 = 300, relativity 1.50, 200/0.60 = 333.33, x1.50 = 500.00; 1.80x1.56 = 2.808 vs 1.55x1.20 = 1.86, ratio 1.51.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.9 pp.151-159 and 161-170 (PDF pp.163-171, 173-182), Ch.10 p.172 (PDF p.184), Ch.11 p.189 with fn.37 (PDF p.201), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; CAS Statement of Principles Regarding Property and Casualty Insurance Ratemaking (adopted May 1988; reinstated May 2021), Section II p.2, Principle 3, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf
- note: F-001 fixed from the source. Medium rather than high: the two worked examples are vault-authored (recomputed, consistent with Werner's mechanics) rather than the source's own.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:23Z/2047
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: delta check of the ASOP 12 §3.3.2 block against the standard, read this session; no numbers added
- sources_checked: Actuarial Standards Board, ASOP No. 12, Risk Classification (for All Practice Areas), Doc. No. 132 (Dec. 2005), §3.3.2-3.3.4 pp.4-5 (PDF 10-11), sha256:7d4f2631a589bac24cf34b1f622e95aa7bfa979aaca96de27c651099c0b12dc7 — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop012_132.pdf
- note: Delta pass; the rest of the page is as verified against Werner & Modlin ch.9-11 and the CAS Statement of Principles. ASOP 12 §3.3.2 (a) adverse selection - too much within-class variation makes adverse selection likely; sufficient homogeneity for the system's purpose; (b) credibility - classes large enough for credible inferences, balancing predictability against homogeneity; (c) practicality - accuracy vs efficiency, cost/time/effort rising with the number of classes; 'often interrelated'. §3.3.3 law, industry and business practices; §3.3.4 reasonableness, e.g. consistency of patterns of rates. 'Once risk characteristics are chosen' reflects §3.2 (selecting characteristics) preceding §3.3 (establishing classes).

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:23Z/2047
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: source list restated
- sources_checked: Actuarial Standards Board, ASOP No. 12, Risk Classification (for All Practice Areas), Doc. No. 132 (Dec. 2005), §3.3.2-3.3.4 pp.4-5 (PDF 10-11), sha256:7d4f2631a589bac24cf34b1f622e95aa7bfa979aaca96de27c651099c0b12dc7 — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop012_132.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.9 pp.151-159 and 161-170 (PDF pp.163-171, 173-182), Ch.10 p.172 (PDF p.184), Ch.11 p.189 with fn.37 (PDF p.201), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; CAS Statement of Principles Regarding Property and Casualty Insurance Ratemaking (adopted May 1988; reinstated May 2021), Section II p.2, Principle 3, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf
- note: Same run, same content: restates the block's sources as this run's delta sources plus the prior pass's sources, which still cover the page's unchanged content. No new checks.

## [F-002] ASOP 12 consequence sentence dropped its voluntary-coverage condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:57Z/ad84
- date: 2026-10-31
- severity: minor
- status: open
- locus: What risk classification is used for paragraph, second sentence
- claim: Ignoring differences in risk characteristics can leave lower risk individuals underusing the system, and so without coverage, while higher risk individuals are covered at insufficient rates, which threatens the viability of the entire system.
- evidence: ASOP 12 Appendix 1 (PDF p.14): 'Failure to adhere to actuarial principles regarding risk classification for voluntary coverages can result in underutilization of the financial or personal security system by, and thus lack of coverage for, lower risk individuals, and can result in coverage at insufficient rates for higher risk individuals, which threatens the viability of the entire system.' The page dropped 'for voluntary coverages' and recast the subject as ignoring differences in risk characteristics (which ASOP ties to the assessment societies' financial distress and inequity, a separate sentence).
- source_rank: 2
- proposed_action: Restore ASOP's subject and condition: 'For voluntary coverages, failing to follow actuarial principles of risk classification can leave ...'.
- applied: true
- fingerprint: a68aaaf7aa5e

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:57Z/ad84
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Corrected in this run to 'For voluntary coverages, failing to follow actuarial principles of risk classification can leave lower risk individuals underusing the system, ...', as ASOP 12 Appendix 1 PDF p.14 has it.

## [C-005] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:57Z/ad84
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: delta check of the added ASOP 12 Appendix 1 paragraph sentence by sentence against PDF p.14; older text not re-checked (verified C-004)
- sources_checked: Actuarial Standards Board, ASOP No. 12, Risk Classification (for All Practice Areas), Doc. No. 132 (Dec. 2005), Appendix 1 p.8 (PDF p.14), sha256:7d4f2631a589bac24cf34b1f622e95aa7bfa979aaca96de27c651099c0b12dc7 — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop012_132.pdf
- note: ASOP 12 Appendix 1 (PDF p.14) is headed 'provided for informational purposes but is not part of the standard of practice' — the page says so. 'Risk classification is generally used to treat participants with similar risk characteristics in a consistent manner, to permit economic incentives to operate and thereby encourage widespread availability of coverage, and to protect the soundness of the system' matches. The AAA's 1980 Risk Classification Statement of Principles is item 2 of the appendix's background literature, as the page says. The consequence sentence lacked ASOP's 'for voluntary coverages' condition (F-002, fixed in this run). The AAA Statement itself was not read; the page does not quote it.
