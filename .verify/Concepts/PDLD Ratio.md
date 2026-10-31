---
target: Concepts/PDLD Ratio.md
created: 2026-10-30
---

## [F-001] Feldblum's hedged advantage stated as a superlative and tied causally to the retro formula
- entry_type: finding
- author: agent:validate-v1
- run_id: g8-cas7-chk-rp
- date: 2026-10-30
- severity: minor
- status: open
- locus: Feldblum's refinements, last sub-bullet
- claim: Page said: 'Being built on the retro rating formula, the PDLD method is most useful when changes in the plan parameters distort the indications of other methods.'
- evidence: Feldblum (PCAS 1998) printed pp.274-275 lists three separate advantages: (1) 'It is modeled directly on the retrospective rating formula'; (3) 'The procedure may prove particularly useful when changes in the retrospective rating plan parameters distort the indications of other methods.' He does not say 'most useful', and does not derive (3) from (1).
- source_rank: 2
- proposed_action: Restate as two coordinate facts in Feldblum's terms: modelled directly on the retro formula, and may prove particularly useful when plan-parameter changes distort other methods.
- applied: true
- fingerprint: fea1fc1f6688

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: g8-cas7-chk-rp
- date: 2026-10-30
- resolves: F-001
- status: resolved
- note: Restated (rule 2) to: 'The PDLD method is modelled directly on the retro rating formula, and it may prove particularly useful when changes in the retro rating plan parameters distort the indications of other methods.' No other change.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: g8-cas7-chk-rp
- date: 2026-10-30
- status_set: verified
- confidence: high
- checks_run: First full check of the page (unverified before): lead definition, all four displayed formulas and symbols against Teng & Perkins formulas 2.1-2.4 (printed pp.614-617); first vs later ratios and negative quarterly ratios (pp.620, 622); formula vs empirical, 27/18-39/30-51/42 lags, 1.750 selected vs 1.460 historical vs 1.426 formula and the improved-loss-experience explanation (pp.617-620); every Feldblum sub-bullet against printed pp.274-277, 287-295 (line segments of decreasing slope, maturity and higher loss ratio, Assumptions A and B, positive Y-intercept, basic premium charge / ELR split, why not a premium chain ladder, nine-month lag and annual vs quarterly updates). Both worked examples recomputed (rank 5, no disagreement). No numbers from cas7-2017-q18 on the page.
- sources_checked: Teng and Perkins, Estimating the Premium Asset on Retrospectively Rated Policies (PCAS LXXXIII, 1996), printed pp.613-623 (PDF pp.3-13): formulas 2.1-2.4, formula example 1.426/0.717, empirical lags 27/18, 39/30, 51/42, selected 1.750 vs 1.460, negative historical ratios, sixth-adjustment PDLD selected at zero (p.618), CPDLD weights incl. 0.4% emerging after the last adjustment (p.622), sha256:30efb7917ebbc6361393f76652a21d97e1915032f94667699904248d1bd900f1 — https://www.casact.org/sites/default/files/2021-03/7_Teng_and_Perkins.pdf; Feldblum, Discussion of Estimating the Premium Asset on Retrospectively Rated Policies (PCAS LXXXV, 1998), printed pp.274-277 (PDF pp.1-4: three advantages incl. 'may prove particularly useful when changes in the retrospective rating plan parameters distort the indications of other methods'; why not a premium chain ladder, rationale a/b, nine months and annual updates vs quarterly), pp.287-295 (PDF pp.14-22: line segments of decreasing slope, Assumptions A and B, Y-intercept enhancement, basic premium charge / expected loss ratio), sha256:1c572191d2239553f306dc29ba1186f3c3477e06b1652562ab55acd4c8bc04ed — https://www.casact.org/sites/default/files/2021-03/7_Teng_and_Perkins_Discussion_of_Paper.pdf
- note: Verified high: every claim traced to the two syllabus readings, read this session from the cached copies; one minor overstatement restated (F-001).
