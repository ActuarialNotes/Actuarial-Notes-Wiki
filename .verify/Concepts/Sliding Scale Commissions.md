---
target: Concepts/Sliding Scale Commissions.md
created: 2026-10-18
---

## [F-001] Sliding scale called the most common adjustable feature
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- severity: minor
- status: open
- locus: lead, last sentence
- claim: It is the most common adjustable feature of a Quota Share.
- evidence: Clark p.9 (sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63): 'A common adjustable feature is the "sliding scale" commission.' Clark does not rank it as the most common.
- source_rank: 2
- proposed_action: Use Clark's wording: 'a common adjustable feature'.
- applied: true
- fingerprint: ef1a9d933fcd

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Corrected in this pass to Clark's wording, 'a common adjustable feature'.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: commission formula against Clark's 25%@65% / 35%@55% / 45%@35% terms and p.10 table; Clark's 90% vs 96% illustration p.11; carryforward shift and multi-year block (variance / number of years) pp.11-12; 'no standard method' p.12; both examples recomputed (22/26/32.5/36%; E[c] 28.45% vs 26.3%, decomposition +4.25 - 2.10)
- sources_checked: Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), pp.9-12 (sliding scale terms and table, balanced plan, 31.0% expected commission and 96% technical ratio, historical check, carryforward approaches), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf; CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (task A1-A3, readings Clark and Bernegger), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Formula and every Clark attribution match; examples resolve. One overstatement corrected in this pass (F-001). Exam 9 only.

## [F-002] Unsmoothed aggregate distribution called the normal practice
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:54Z/2103
- date: 2026-10-31
- severity: minor
- status: open
- locus: 'Smoothing and the aggregate distribution' sub-bullet
- claim: Because of these objections, the aggregate loss distribution used to price the scale is normally left to show the full volatility of the underlying business, with the carryforward's smoothing not built into it.
- evidence: Clark §1B(a) pp.11-12 presents the long-run approach, which reduces the aggregate variance (SD divided by sqrt 5 for a five-year block), as one of two approaches, and ends 'There is no standard method for handling these questions so far as this author is aware.' The Fall 2014 Q23(c) report (PDF p.100) accepts yes or no 'as long as they supported their position'. Neither says the unsmoothed distribution is normal.
- source_rank: 2
- proposed_action: Restate to Clark: no standard answer; leaving smoothing out keeps the full volatility, building it in assumes renewal.
- applied: true
- fingerprint: 3135798ae375

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:54Z/2103
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Restated: 'Whether to build the carryforward's smoothing into the aggregate loss distribution used to price the scale has no standard answer. Leaving it out keeps the full volatility of the underlying business in the distribution; reducing its variance assumes the treaty will be renewed, which is uncertain.' The examiners' sentence after it is unchanged.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:54Z/2103
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: whole page against Clark pp.9-12 word for word; both examples recomputed (two-slope scale 22/26/32.5/36, ratios 97/90/87.5/76; E[LR] 63.7, E[c] 28.45, plug-in 26.3, technical 92.15 vs 90.0, +4.25 and -2.10 against the 1:1 line); rule 10: no 2014 Q23 figures on the page
- sources_checked: Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), §1B(a) pp.9-12 (sliding scale terms and table, balanced plan, 25%/90% naive vs 31%/96% expected, historical reasonability check, aggregate distribution, carryforward: single-year shift of the slide and its problem, long-run block with variance roughly divided by the years and SD by sqrt 5, contract may not renew, deficit but not credit, no standard method), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf; CAS Exam 8 Fall 2014 — sample answers and examiner's report, Q23(c), PDF pp.98-100 (either position accepted if supported; preserve the volatility of the underlying loss distribution; with a carryforward, an assumption on whether policies renew), sha256:305e1211892c48fd58bd8be8038483992fba1100023d37422a2bca209f90ada1 — https://www.casact.org/sites/default/files/2021-03/14-8_0.pdf; CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (tasks A1-A5, readings Clark, Bernegger, Grossi & Kunreuther), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Whole-page check after the writer's Exam 9 G8 passage; one overstatement restated (F-002). Exam 9 only. Source hashes: every CAS and USGS PDF re-fetched from its URL this run and hashed; each matches the hash the writer cited.
