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

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Werner Ch.3 p.43 (PDF p.55) re-read: 'Calendar year aggregation for ratemaking analysis may be most appropriate for lines of business or individual coverages in which losses are reported and settled relatively quickly, such as homeowners.' The Calendar Year bullet now gives Werner's advantages (data available quickly; already collected for financial reporting), his disadvantage (losses include payments and reserve changes on claims from policies issued years ago, mismatched with premium earned in the year) and his homeowners qualification; 'unusable for pricing without adjustment' is deleted.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Werner Ch.3 p.42 (PDF p.54) re-read. Opening paragraph now states the three objectives verbatim in substance — accurately match losses and premium for the policy, use the most recent data available, minimize the cost of data collection and retrieval — and that the four common methods (calendar, accident, policy, report year) each meet them to a different degree, Werner's 'Each method differs in how well it achieves the objectives'. The two-property trade-off is gone.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Full-text search of Werner for 'rule of thumb' again returns zero pages this session; Ch.3 pp.42-44 (PDF pp.54-56) states no selection heuristic. The sentence attributed to Werner is deleted from the second example; the example's answer otherwise stands on its own reasoning and on Friedland p.42 (PDF p.48), which names a shift to large-deductible policies as a case where policy year experience is very important.

## [F-004] First example's Calendar Year row omits the CY 2025 premium and calls the CY loss 'incurred'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: nit
- status: open
- locus: Example 'One Transaction Set, Five Cohorts', Calendar Year row
- claim: Calendar Year row: premium 'CY 2024: $600 earned'; loss 'CY 2024: $8,000 incurred; CY 2025: $1,500'.
- evidence: Recomputed: an annual $1,200 policy effective 7/1/2024 earns $600 in CY 2024 and $600 in CY 2025 (the page's own Accident Year row says so, and the prose below says the calendar year splits both premium and loss). The $8,000 is paid 0 + case 8,000, which Werner Ch.3 p.43 (PDF p.55) calls calendar-year reported losses ('paid losses plus the change in case reserves'); the page elsewhere uses Werner's term. Noted but not filed in the 2026-09-12 pass.
- source_rank: 5
- proposed_action: Show both calendar years of earned premium and use 'reported'.
- applied: true
- fingerprint: f389cf73ef7a

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-004
- status: resolved
- note: Row now reads 'CY 2024: $600; CY 2025: $600 earned' and 'CY 2024: $8,000 reported; CY 2025: $1,500'.

## [F-005] Report Year bullet: 'required' for claims-made and 'preferred for severity studies' — neither is in the sources
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullet 'Report Year'
- claim: 'Report Year — claims by first notice date. Required for claims-made coverage and preferred for severity studies.'
- evidence: Werner Ch.3 p.44 (PDF p.56): report year 'is typically used for commercial lines products using claims-made policies (e.g., medical malpractice)'. Friedland Ch.3 p.42 (PDF p.48): for claims-made lines 'actuaries often prefer to use report year data'. Neither says it is required, and neither mentions severity studies.
- source_rank: 2
- proposed_action: Use Werner's wording.
- applied: true
- fingerprint: d6c8f2501123

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-005
- status: resolved
- note: Bullet now: 'Report Year — claims by report date. Typically used for commercial lines written on a claims-made basis, such as medical malpractice.' (Werner p.44, PDF p.56.)

## [F-006] Unsourced characterisations of close year, in-force data and external data
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullets 'Close Year' and 'In-Force'; paragraph on internal and external sources
- claim: 'Close Year — ... Operational analysis only.'; 'In-Force snapshots answer point-in-time exposure questions (catastrophe accumulation, concentration)'; external data 'used where internal volume is thin'.
- evidence: No close year appears in Werner Ch.3 or Friedland Ch.3 (Friedland full-text search for 'close year': zero hits), so 'operational analysis only' has no source. Werner Ch.5 p.71 (PDF p.83) gives the use of in-force premium: 'the best estimate of the company's mix of business as of a given date, the most recent in-force premium is often used to measure the impact of a rate change on an existing portfolio'. Werner Ch.3 p.44 (PDF p.56) gives the use of external data: 'When pricing a new line of business, it may be necessary to use external data. Even when pricing an existing line of business, it is often helpful to supplement internal data', and lists 'data calls or statistical plan data, other aggregated insurance industry data, competitors' rate filings, and third-party data'.
- source_rank: 2
- proposed_action: Delete the close-year claim; restate the in-force and external-data uses in Werner's terms.
- applied: true
- fingerprint: b4059766035d

## [F-006/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-006
- status: resolved
- note: Close Year bullet trimmed to its definition; In-Force bullet now Werner p.71 (PDF p.83); external-data sentence now Werner p.44 (PDF p.56), including data calls.

## [F-007] Accident and policy year bullets: 'closes at year end' and 'the only basis that isolates a change in policy terms'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullets 'Accident Year' and 'Policy Year'
- claim: Accident Year: 'The industry standard: good matching, closes at year end, needs development.' Policy Year: 'the only basis that isolates a change in policy terms, but a full year less mature.'
- evidence: Werner Ch.3 p.43 (PDF p.55): 'Since accident year is not closed (fixed) at the end of the year, however, future development on those known losses needs to be estimated' — only its premium and exposures are fixed at year end. Neither text says policy year is the only basis that isolates a change in policy terms; Friedland Ch.3 p.42 (PDF p.48) says policy year experience 'can be very important when underwriting or pricing changes occur, such as a shift from full coverage to large deductible policies'. Werner p.43: PY exposures are not fully earned until 24 months after the start of the policy year, so 'data takes longer to develop'. 'Industry standard' is Friedland's 'accepted norm for P&C insurers in the U.S. and Canada' (p.41, PDF p.47).
- source_rank: 2
- proposed_action: Restate both bullets in the sources' terms.
- applied: true
- fingerprint: eb7b8da22162

## [F-007/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-007
- status: resolved
- note: Accident Year bullet: Friedland's accepted norm, a better match than calendar year, premium fixed at year end but losses still developing. Policy Year bullet: best match, particularly useful when underwriting or pricing changes occur (Friedland's large-deductible example), exposures not fully earned until 24 months, data takes longer to develop.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: Read Werner Ch.3 Data Aggregation, Overall versus Classification Analysis and External Data, and Friedland Ch.3 aggregation sections this session, and diffed every bullet; gross/ceded/net checked against Werner p.99 (PDF p.111: analysis historically direct, some now net; projected losses reduced for recoveries and premium reduced by the amount ceded); granularity against Werner p.44 (overall analysis highly summarized, classification analysis more granular) and p.106 (PDF p.118: state experience analysed separately 'where there is sufficient volume'); example 1 recomputed from scratch ($600/$600 earned; CY reported 8,000 then 1,500; RY 2024; close 2025); example 2 timeline checked (PY 2024 half-earned at 12/31/2024 with uniform writing; PY 2025 entirely post-change).
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 3 pp.42-44 (PDF pp.54-56); Ch. 5 p.71 (PDF p.83); Ch. 6 p.99 (PDF p.111), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 3 pp.40-42 (PDF pp.46-48), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: All three prior findings resolved; four new findings (F-004 nit, F-005 to F-007 minor) fixed and resolved. Confidence medium: the second example's recommendation and the granularity/credibility framing are the vault's own reasoning, and the Close Year bullet rests on the vault's [[Close Year]] definition (no close year in either text).
