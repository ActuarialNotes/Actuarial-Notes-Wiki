---
target: Concepts/Extraordinary Losses.md
created: 2026-10-31
---

## [F-001] 'Order of adjustments' rule is the page's inference; Werner prescribes no order
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/275d
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'Order of adjustments', line 26
- claim: Page: 'Order of adjustments: a modeled provision is already at future cost and ultimate value, so add it to non-catastrophe losses after those are developed and trended — adding it before over-adjusts it.'
- evidence: Werner & Modlin Ch. 6 p. 95 (PDF p. 107): 'Though a particular order for adjustments is not prescribed in this text, several examples ... are included in the appendices.' p. 99 (PDF p. 111): 'The catastrophe loss provision produced by the model is simply added to the non-catastrophe loss amount.' Appendix B (Row 16 = Rows 13 + 14 + 15, PDF p. 361) adds the modeled pure premium to the trended, credibility-weighted non-cat pure premium, which is consistent with the page but Werner never states the over-adjustment rule. The reasoning is sound; it is presented as the text's rule.
- source_rank: 2
- proposed_action: Attribute the point to Appendix B's construction (modeled cat PP added after trend and development) rather than stating it as a prescribed order, or note that Werner prescribes no order.
- applied: false
- fingerprint: 59f7ca010da4

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/275d
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: shock-loss examples, basic-limit threshold and basic-limits premium for loss ratio indications (fn. 17), 99th percentile, percentage of amount of insurance, 10 vs 20 years (homeowners fire vs umbrella), censoring trended losses or indexing the threshold (fn. 18), excess loss factor = 1 + Σexcess/Σnon-excess applied to each year's non-excess losses (Table 6.3), catastrophe list, PCS $25 million definition, non-modeled 10-30 year ratio or cat-to-exposure/AIY, modeled perils, exclusion from trend data and from development data against Werner; independent recomputation: excess $12,000,000, non-excess $588,000,000, ELF 1.0204; latest excess $2,500,000, adjusted $50,509,800 (at the rounded ELF), overstatement 2.95%; hail $84, hurricane $90, total $794, $101.70, $11.70 = 1.47%; wiki-links
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp. 95-99, 107-108, 112 (PDF pp. 107-111, 119-120, 124); Appendix B pp. B-2-B-3 (PDF pp. 359-361), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Definitions, formulas and examples match Werner; one minor finding on an unattributed order-of-adjustments rule.
