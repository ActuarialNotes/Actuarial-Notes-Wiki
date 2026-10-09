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
