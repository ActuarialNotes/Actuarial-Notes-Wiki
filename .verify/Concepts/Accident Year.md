---
target: Concepts/Accident Year.md
created: 2026-09-13
---

## [F-001] Werner's data-aggregation objectives stated as two; the text lists three
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- severity: minor
- status: open
- locus: bullet 2, 'the best compromise on Werner & Modlin's two axes'
- claim: Accident year is 'the best compromise on Werner & Modlin's two axes': matching losses to exposure, and closing at year end.
- evidence: Werner & Modlin Ch. 3 printed p.42 (PDF p.54): 'When aggregating data for ratemaking purposes, three general objectives apply: Accurately match losses and premium for the policy; Use the most recent data available; Minimize the cost of data collection and retrieval.' The page names two of the three and attributes the pair to Werner & Modlin by name; the omitted objective (cost of collection and retrieval) is the one that explains the calendar-year method's survival, and is listable on an exam question. The substantive claim about accident year is otherwise correct per p.43 (PDF p.55): 'Accident year aggregation represents a better match of premium and losses than calendar year aggregation.'
- source_rank: 2
- proposed_action: Restate as Werner's three objectives, or drop the attribution and present the two axes as the page's own framing.
- applied: false
- fingerprint: 4cc00546d1cd

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- status_set: verified
- confidence: high
- checks_run: Definition diffed against Werner p.43 ('losses for accidents that have occurred during a twelve-month period, regardless of when the policy was issued or the claim was reported') and Friedland p.40 ('accident year 2008 consists of all claims with an occurrence date in 2008'); 'not final at year end' and the need to develop confirmed at Werner p.43 and Friedland p.41; premium/loss mismatch and the need for on-levelling confirmed at Werner p.43; the five-basis assignment table checked date by date against the definitions in Werner Ch. 3 and Friedland Ch. 3; example 2 recomputed before reading the answer - 4,400,000/8,000,000 = 55.0%, 5,300,000/8,000,000 = 66.25% (printed 66.3%), 5,300,000 x 1.150 = 6,095,000, 6,095,000/8,000,000 = 76.19% (printed 76.2%). One minor finding open (F-001, the 'two axes' attribution).
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 3 pp.42-43 (PDF pp.54-55), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 3 pp.40-41 (PDF pp.46-47), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Werner Ch.3 p.42 (PDF p.54) re-read this session: 'three general objectives apply: Accurately match losses and premium for the policy; Use the most recent data available; Minimize the cost of data collection and retrieval.' Bullet 2 rewritten to state all three, with AY's position taken from Werner p.43 (PDF p.55: 'a better match of premium and losses than calendar year aggregation') and Friedland Ch.3 pp.40-41 (PDF pp.46-47: AY claims occur over a shorter time frame than policy year, so ultimate is reliably estimable sooner; AY 'the accepted norm for P&C insurers in the U.S. and Canada'; 'by far, the most common grouping of claims data for the actuarial analysis of unpaid claims'). The unsourced 'standard basis for both ratemaking and reserving' and 'closes at the end of the year' are gone.

## [F-002] Example says only the accident-year assignment is unaffected by claim handling, and calls AY 'the ratemaking standard'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: Example 'Assigning a Claim to an Accident Year', closing line of the answer
- claim: 'Only the accident-year assignment is unaffected by how the claim was handled — which is exactly why it is the ratemaking standard.'
- evidence: The example's own table assigns policy year by the policy effective date (10/1/2023 -> PY 2023), which is no more affected by claim handling than the occurrence date; Werner Ch.3 p.43 (PDF p.55) defines policy year as all transactions on policies written in the year 'regardless of when the claim occurred or when it was reported, reserved, or paid'. So 'only' is false. Neither Werner Ch.3 pp.42-44 nor Friedland Ch.3 pp.39-42 calls AY 'the ratemaking standard'; Friedland's 'accepted norm' (p.41) is said of P&C insurers generally, and Werner calls policy year the best match.
- source_rank: 2
- proposed_action: State what the table shows: AY and PY are fixed by the occurrence and policy dates; report, close and calendar year depend on reporting, settlement and payment. Drop the 'ratemaking standard' clause.
- applied: true
- fingerprint: b94d5189ffdf

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Closing line rewritten: 'The accident-year and policy-year assignments are fixed by the occurrence and policy dates alone; the report, close and calendar years depend on when the claim was reported, settled and paid.' Matches Werner Ch.3 pp.42-44 (PDF pp.54-56) definitions.

## [F-003] Accident quarters/months said to be used 'when volume permits and responsiveness matters' — not in the sources
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullet 5, last sentence
- claim: 'Accident quarters or months are used when volume permits and responsiveness matters.'
- evidence: Friedland Ch.3 p.40 (PDF p.46): 'Insurers compile claims data according to a variety of accident periods including accident month, accident quarter, accident half-year, and accident year.' Neither Friedland nor Werner Ch.3 attaches the volume/responsiveness condition.
- source_rank: 2
- proposed_action: State Friedland's list without the unsourced condition.
- applied: true
- fingerprint: 5770faab679d

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Sentence now reads 'Insurers also compile claims by accident month, quarter and half-year.' per Friedland p.40 (PDF p.46).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: Read Werner Ch.3 Data Aggregation and Friedland Ch.3 aggregation sections end to end this session; definition diffed against Werner p.43 and Friedland p.40; not-final-at-year-end and need to develop against Werner p.43; premium/loss approximate matching against Werner p.43 and Friedland p.40 ('Calendar year earned premiums provide an approximate matching'); triangle rows = accident years and diagonals = valuation dates against Werner p.106 (PDF p.118); assignment table rechecked date by date (AY 2024, PY 2023, RY 2024, close 2025; CY: 40,000 reported in 2024 = 0 paid + 40,000 case, 52,000 - 40,000 = 12,000 in 2025); example 2 recomputed: 4.4M/8M = 55.0%, 5.3M/8M = 66.25%, 5.3M x 1.150 = 6,095,000, /8M = 76.19%.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 3 pp.42-44 (PDF pp.54-56); Ch. 6 p.106 (PDF p.118) triangle rows and diagonals, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 3 pp.39-42 (PDF pp.45-48), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: F-001 resolved, two new minor findings (F-002, F-003) fixed and resolved. Confidence medium, not high: the page carries vault-authored worked examples (recomputed), and the Close Year row rests on the vault's own [[Close Year]] definition — neither Werner Ch.3 nor Friedland Ch.3 defines a close year.
