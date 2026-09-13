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
