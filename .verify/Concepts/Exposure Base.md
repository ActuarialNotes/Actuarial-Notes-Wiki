---
target: Concepts/Exposure Base.md
created: 2026-09-12
---

## [F-001] Homeowners example concludes AOI is the exposure base; Werner says house-years, with AOI as a rating variable
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:16Z/58a9
- date: 2026-09-12
- severity: critical
- status: open
- locus: second worked example, 'Testing a Proposed Exposure Base', answer callout (final two paragraphs)
- claim: The page states 'AOI is the better base on criterion one' and 'The practical resolution, and standard homeowners practice, is to keep AOI as the exposure base and apply a decreasing rate per $1,000 through an amount-of-insurance relativity curve.'
- evidence: Werner & Modlin, Basic Ratemaking 5th ed., Ch. 4 'Proportional to Expected Loss' (printed p.49 = PDF p.61) uses this exact homeowners illustration and reaches the opposite conclusion: 'While the expected loss for a $200,000 home is higher than that for a $100,000 home, it may not necessarily be two times higher. So based on the criterion that the exposure base should be the factor most directly proportional to the expected loss, number of house years is the preferred exposure base, and amount of insurance should be used as a rating variable.' Footnote 7 on the same page limits AOI-as-base to 'the U.K. and other countries'. Ch. 2's homeowners rating manual example (printed p.17 = PDF p.29) states 'The exposure base for homeowners insurance is a home insured for one year', and the worked algorithm (printed p.23 = PDF p.35) enters amount of insurance as an 'AOI Relativity' of 1.04 applied to a $500 base rate, i.e. as a rating variable, not as the base. The page's own arithmetic is correct and I reproduced it independently (12,000,000/20,000 = $600; 13,500,000/15,000 = $900; 7,000,000/5,000 = $1,400; 1,400/600 = 2.33x against roughly 4x on AOI) — it is the conclusion drawn from it that inverts the syllabus text, and the sub-linear relationship the page itself identifies is precisely Werner's reason for keeping house-years as the base. Related: the bullet list above gives 'amount of insurance in $1,000s (property)' as a common exposure base, which is defensible for commercial property but is what Werner assigns to a rating variable for homeowners.
- source_rank: 2
- proposed_action: Rewrite the example's conclusion to Werner's: house-years remains the exposure base because it is the factor most directly proportional to expected loss, and AOI enters as a rating variable (an AOI relativity curve). Requires new prose, so not auto-fixed.
- applied: false
- fingerprint: 885eb236e602

## [C-001] Validation pass — disputed
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:16Z/58a9
- date: 2026-09-12
- status_set: disputed
- checks_run: Three selection criteria compared clause-by-clause with Werner Ch.4 'Criteria for Exposure Bases' (directly proportional to expected loss / practical / preexisting industry base) — page matches; Premium = Rate x Exposures confirmed PDF p.61; the four exposure flavours (written, earned, unearned, in-force) confirmed in the same chapter summary; workers-compensation payroll responsiveness example checked against Werner PDF p.62 and both payroll figures recomputed (10 x 200,000 = 2,000,000; 20 x 50,000 = 1,000,000); all three pure premiums in the second example recomputed from scratch before reading the stated answers
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 4 pp.49-50 (PDF pp.61-62) and Ch. 2 pp.17,23 (PDF pp.29,35), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- note: Disputed on account of open critical finding F-001: the homeowners example's conclusion inverts Werner's. Everything else on the page checks out against Ch.4.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Werner Ch.4 p.49 (PDF p.61) re-read: 'number of house years is the preferred exposure base, and amount of insurance should be used as a rating variable' (fn.7: some U.K. insurers use AOI or bedrooms); Ch.2 p.17 (PDF p.29) 'The exposure base for homeowners insurance is a home insured for one year'; p.23 (PDF p.35) AOI Relativity 1.04 on the $500 base rate. Example's conclusion rewritten: AOI is not proportional (loss per house-year 1,400/600 = 2.3x while band boundaries quadruple from $100K to $400K - the old 'midpoint of over $400K' was undefined), so house-years remain the base, AOI enters as a rating variable/relativity, and the proposal is rejected. The common-bases bullet now says 'amount of insurance (commercial business property)' per Werner Table 4.1 (p.51, PDF p.63). Pure premiums recomputed: 600, 900, 1,400.

## [F-002] Unsourced claims in the criteria and properties bullets
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: criteria bullets 1-3; 'Further properties' bullets 1-3; lead sentence
- claim: 'A base that is proportional to frequency but not severity … distorts the rate'; 'A base that must be estimated at inception and audited later (payroll, sales) trades practicality for proportionality'; precedent change 'disrupts comparison with industry data'; 'gross sales or receipts (general liability), amount of insurance in $1,000s (property)'; 'the ratemaking denominator is always the earned one'; lead 'the measure by which one insured's amount of insurance is compared with another's'.
- evidence: None of these is in Werner Ch.4 pp.49-51 (PDF pp.61-63). Werner's criteria: twice the exposures, twice the expected loss, other factors as rating/underwriting variables (p.49); objective, easy and inexpensive to obtain and verify, precluding manipulation - mileage vs car-years; products liability on gross sales as a proxy for products in use (p.50); precedence: premium swings, rating-algorithm change, data adjustments (p.50). Table 4.1 (p.51): CGL sales revenue, payroll, square footage, number of units; commercial business property amount of insurance. Pure premium 'typically' on earned exposures (Ch.1 p.8, PDF p.20); 'the actual exposure used depends on the analysis' (Ch.4 summary p.62, PDF p.74).
- source_rank: 2
- proposed_action: Restate each bullet to Werner's own reasons and table.
- applied: true
- fingerprint: f1049f4642d1

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Applied: criteria bullets, common bases, the four flavours and the inflation bullet rewritten to Werner Ch.1 p.8, Ch.4 pp.49-51 and p.61-62 (inflation-sensitive payroll and sales revenue; car-years/house-years non-inflation-sensitive per Ch.7 p.135); lead now Werner p.49's 'basic unit that measures a policy's exposure to loss'.

## [F-003] Workers compensation example rests on claims not in the source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: Example 'Why Workers Compensation Rates on Payroll', answer paragraphs 3-4
- claim: 'Workers compensation indemnity benefits are a percentage of the injured worker's wage, so the severity of A's claims is roughly four times B's … Payroll captures both effects … exactly the proportional criterion'; 'some jurisdictions cap the payroll of high-wage employees'.
- evidence: Werner Ch.4 p.50 (PDF p.62) justifies payroll by responsiveness: 'As the number of workers increases (decreases) or the average number of hours worked increases (decreases), both payroll and the risk of loss increase (decrease) too.' It records the opposite tension for high wages: 'In the 1980s, there was a lot of pressure to change the exposure base to hours worked for medical coverage in order to correct perceived inadequacies of the exposure base for union companies with higher pay scales'; the base was not changed, transition concerns being a major reason, and rating variables were adjusted instead (pp.50-51). Neither the four-times-severity claim nor the payroll cap appears in the reading.
- source_rank: 2
- proposed_action: Rest the example on Werner's responsiveness argument and the 1980s hours-worked debate.
- applied: true
- fingerprint: 9d07965fdbc2

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Applied: answer now uses Werner p.50's responsiveness argument and pp.50-51's hours-worked debate (A pays twice B's for half the workers purely on wages), with payroll's inflation sensitivity linked to Exposure Trend (Ch.4 p.61, PDF p.73). Payroll figures recomputed: 2,000,000 and 1,000,000.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: F-001 re-checked against Werner Ch.4 p.49 and Ch.2 pp.17, 23 and fixed; every remaining sentence diffed against Werner Ch.1, Ch.2 and Ch.4; both examples recomputed (payroll 2.0M/1.0M; pure premiums 600/900/1,400; ratio 2.33).
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 4 pp.49-51, 61-62 (PDF pp.61-63, 73-74), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 2 pp.17, 23 (PDF pp.29, 35), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 pp.2, 8 (PDF pp.14, 20), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 p.135 (PDF p.147), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: The critical (AOI as the homeowners base) is fixed: house-years is the base, AOI a rating variable, per Werner. Two minor findings opened, applied and resolved. Confidence medium: vault-authored examples.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: delta check: git diff since the 2026-10-09 verified pass (commit 90f8c02d7) adds one bullet ('In underwriting (DISC-RM)'); its IRMI list (payroll, receipts, sales, square footage, area, man-hours for GL; per unit auto; per $1,000 property) diffed against IRMI 'exposure base', and premium audit verifying the base against IRMI 'premium audit'; Werner re-fetched, sha256 6b214d4d... unchanged
- sources_checked: IRMI Glossary, 'exposure base', entry, sha256:47e94e12e79df29163b37da0ab98b8194ba29990c124768a2200b11b65f9b3d0 — https://www.irmi.com/term/insurance-definitions/exposure-base; IRMI Glossary, 'premium audit', entry, sha256:4d303e9e2670eb03ca6e5050b336726d99d40c4294ec4a273a9a9f79a6b79909 — https://www.irmi.com/term/insurance-definitions/premium-audit; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.4 pp.49-51 (PDF pp.61-63) — hash reconfirmed, unchanged since the 2026-10-09 pass, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Only the DISC-RM bullet changed since the last pass, and it matches IRMI word for word in substance. The rest of the page stands on the 2026-10-09 pass against Werner. Medium, as before.
