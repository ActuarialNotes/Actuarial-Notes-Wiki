---
target: Concepts/Ratemaking Data Organization.md
created: 2026-09-12
---

## [F-001] Page calls calendar year aggregation unusable for pricing; Werner names a case where it is most appropriate
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:16Z/58a9
- date: 2026-09-12
- severity: major
- status: open
- locus: bullet list, 'Calendar Year' entry
- claim: 'Calendar Year — everything booked in the year. Instantly final and used for financial reporting, but mixes accident years on the loss side, so it is unusable for pricing without adjustment.'
- evidence: Werner & Modlin, Basic Ratemaking 5th ed., Ch. 3 'Data Aggregation' (printed p.43 = PDF p.55): after stating the timing-mismatch disadvantage the text says 'Calendar year aggregation for ratemaking analysis may be most appropriate for lines of business or individual coverages in which losses are reported and settled relatively quickly, such as homeowners.' The page's first two clauses match Werner (data available quickly, no additional expense since it is already collected for financial reporting; mismatch because premium earned in the year comes from policies in force while losses may include payments and reserve changes on claims from policies issued years ago), but 'unusable for pricing without adjustment' is stronger than, and contradicts, the source's qualified endorsement for short-tailed coverages.
- source_rank: 2
- proposed_action: Replace the final clause with Werner's qualification: the mismatch makes calendar year unsuitable for long-tailed lines, but it may be the most appropriate basis where losses are reported and settled quickly (e.g. homeowners). Requires new prose, so not auto-fixed.
- applied: false
- fingerprint: b881eabb5df1

## [F-002] Opening paragraph attributes a two-objective framing to Werner; the text states three
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:16Z/58a9
- date: 2026-09-12
- severity: minor
- status: open
- locus: opening paragraph, 'Werner & Modlin frame the choice as a trade-off between two properties'
- claim: The page says Werner & Modlin frame data organization as a trade-off between accuracy (matching losses to premium) and availability (how soon the cohort can be used).
- evidence: Werner & Modlin, Basic Ratemaking 5th ed., Ch. 3 (printed p.42 = PDF p.54): 'When aggregating data for ratemaking purposes, three general objectives apply: Accurately match losses and premium for the policy; Use the most recent data available; Minimize the cost of data collection and retrieval. Four common methods of data aggregation are calendar year, accident year, policy year, and report year.' The third objective (cost of collection and retrieval) is omitted, and the text does not present the objectives as two properties 'an actuary cannot have at once'.
- source_rank: 2
- proposed_action: State Werner's three objectives, including minimising the cost of data collection and retrieval, rather than a two-way trade-off.
- applied: false
- fingerprint: 9e5c5e42ec62

## [F-003] 'Werner's rule of thumb' in the second example is not in the text
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:16Z/58a9
- date: 2026-09-12
- severity: minor
- status: open
- locus: second worked example, final line of the answer callout
- claim: 'Werner's rule of thumb: pick the most responsive basis that can be corrected to current conditions, rather than the most accurate basis that arrives too late to file.'
- evidence: No such statement appears in Werner & Modlin, Basic Ratemaking 5th ed. Ch. 3 (Data Aggregation, printed pp.42-44 = PDF pp.54-56), which I read in full, nor anywhere the full-text search for 'rule of thumb' near the aggregation discussion reaches. Ch. 3 lists three objectives and describes how each of the four methods trades them off; it states no selection heuristic. The substance of the sentence is a reasonable synthesis, but attributing it to Werner as a rule of thumb is not supportable.
- source_rank: 2
- proposed_action: Drop the attribution to Werner, or replace the sentence with Werner's actual three objectives.
- applied: false
- fingerprint: 8429283be4a5

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:16Z/58a9
- date: 2026-09-12
- status_set: verified
- confidence: medium
- checks_run: Read Werner Ch.3 'Data Aggregation' end to end and diffed each bullet against it: policy year as best match and 24-month earning lag (PDF p.55) confirmed; report year for claims-made confirmed (PDF p.56); accident year as better match than calendar year with development still to come confirmed (PDF p.55); accident-year-as-industry-norm cross-checked against Friedland PDF p.47; the external-data bullet matches Werner's list verbatim (statistical plan data, aggregated industry data, competitors' rate filings, third-party data, PDF p.56). First example recomputed from scratch before reading the table: annual $1,200 policy incepting 7/1/2024 earns $600 in each of 2024 and 2025; CY 2024 reported loss = paid 0 + case 8,000 = $8,000 and CY 2025 = paid 9,500 - case released 8,000 = $1,500 (Werner's CY reported definition, PDF p.55) — both agree with the page; RY 2024 and close year 2025 follow from the 12/20/2024 report and 3/15/2025 settlement. Full-text search of the whole Werner document for 'rule of thumb' returns zero hits (see F-003).
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 3 pp.42-44 (PDF pp.54-56), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 3 p.41 (PDF p.47), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf
- note: Three open findings (F-001 major on the Calendar Year bullet, F-002/F-003 minor attribution). Arithmetic and cohort assignments in both examples are correct. Nit not filed separately: the Calendar Year row of the first example's table lists only CY 2024 premium of $600 and omits the CY 2025 $600, though the prose below it correctly says calendar year splits both premium and loss.
