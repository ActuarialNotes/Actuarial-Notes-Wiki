---
target: Concepts/Allocated Loss Adjustment Expense.md
created: 2026-10-31
---

## [F-001] ALAE is not necessarily in case reserves
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- severity: major
- status: open
- locus: bullet 1, line 20
- claim: Because ALAE attaches to a claim, it is captured in case reserves and can be developed in a triangle exactly like indemnity.
- evidence: Friedland Ch.16 p.370 (PDF 376): 'Many insurers record only ALAE payments and do not separately estimate case outstanding for ALAE.' p.371 (PDF 377): a reported ALAE technique is used only 'When separate case outstanding for ALAE exists'. The development point itself is supported: 'All of the development techniques described in Part 3 can be used with ALAE' (p.370).
- source_rank: 2
- proposed_action: Delete 'it is captured in case reserves and' (the clause the source contradicts); keep the development point.
- applied: true
- fingerprint: 7809dbf55c2d

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Clause deleted in this change; the bullet now says only that ALAE can be developed in a triangle, which Friedland p.370 states.

## [F-002] 'Friedland gives three approaches' does not match Ch.16
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 1, line 20
- claim: Friedland gives three approaches: develop a combined loss-and-ALAE triangle, develop ALAE separately in its own triangle, or develop a ratio of ALAE to loss and apply it to projected losses.
- evidence: Friedland Ch.16 p.371 (PDF 377) demonstrates 'four projection techniques for ALAE': reported ALAE development, paid ALAE development, development of the ratio of paid ALAE-to-paid claims (multiplicative), and the same ratio with additive development factors (p.374, PDF 380). Combining ALAE with claims is mentioned (p.370) as something actuaries 'often' do 'due to data limitations', not presented as one of her techniques. The page's count and framing are not Friedland's.
- source_rank: 2
- proposed_action: Restate as Friedland's four projection techniques (reported, paid, paid-ratio multiplicative, paid-ratio additive), keeping the combined-data caveat from p.370. Needs new wording — left for an author.
- applied: false
- fingerprint: ec7016f0cd4c

## [F-003] Unsourced ALAE-ratio ranges by line
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 3, line 22; Example 1, line 42
- claim: The ALAE ratio varies enormously by line — roughly 30-50% of indemnity in professional liability, 15-25% in general liability, 10-15% in auto liability, and a few percent in property. (Example 1: a 35% ratio is at the high end for GL.)
- evidence: No such ranges appear in Friedland (full-text search of the ALAE chapters, PDF 375-391; Ch.16's only example is an auto property damage insurer whose selected paid ALAE ratios are below 1%, p.374). Werner & Modlin Ch.6 pp.121-122 gives none either. The figures are stated as fact with no source.
- source_rank: 2
- proposed_action: Source the ranges to a syllabus reading or published study, or remove them and the dependent sentence in Example 1.
- applied: false
- fingerprint: d91b710cc00e

## [F-004] Unsourced claims: ALAE countercyclical to indemnity; treaty treatment of ALAE
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullets 4-5, lines 23-24
- claim: ALAE can be countercyclical to indemnity ... A 'defence and settle' strategy shift moves both components, in opposite directions. / Treaties differ on whether ALAE is included within the limit, shared pro rata, or added on top.
- evidence: Full-text search of Friedland: 'countercycl' 0 hits; Ch.14 'Reinsurance and Aggregate Limits' (PDF 336-338) does not discuss how ALAE is treated under a treaty. Werner & Modlin p.121 says only that the actuary must understand whether ALAE are subject to the policy limits. Neither claim is in the Exam 5 readings.
- source_rank: 2
- proposed_action: Source both to a syllabus reading or remove them.
- applied: false
- fingerprint: c0f7261b9c25

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Definition and examples (legal, expert witness, independent adjusters if assigned) vs Friedland p.369 and p.386; combined vs separate development and the different-pattern caveat vs p.370; ratio approach vs pp.371-374; formulas (Loss & ALAE = Indemnity + ALAE; ALAE ratio) consistent with p.371; both examples recomputed independently (35,000; 135,000; 35%; 2,280,000; 880,000; 61% vs 63% paid) — agree.
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, July 30 2010), Part 4 intro p.369 (PDF 375); Ch.16 pp.370-374 (PDF 376-380); Ch.17 p.386 (PDF 392); Ch.1 p.15 (PDF 21), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch.6 'Loss Adjustment Expenses', pp.121-122 (PDF 133-134), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: The definition, the triangle-development point and the different-pattern caveat check against Friedland Ch.16. One contradicted clause (ALAE always in case reserves) deleted. Three minor findings stay open: Friedland's techniques miscounted, unsourced ALAE-ratio ranges, and unsourced countercyclical/treaty claims.
