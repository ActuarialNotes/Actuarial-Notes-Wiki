---
target: Concepts/Unallocated Loss Adjustment Expenses ULAE.md
created: 2026-10-31
---

## [F-001] Dollar-based techniques mislabelled as 'Friedland's four approaches' in a made-up order
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- severity: major
- status: open
- locus: list heading, line 20; list order lines 22-28
- claim: Friedland's four approaches, in order of increasing sophistication: Classical; Kittel; Mango-Allen; Conger-Nolibos.
- evidence: Friedland Ch.17 p.387 (PDF 393): 'we describe four commonly used dollar-based techniques: Classical (also known as traditional), Kittel refinement, Conger and Nolibos method - generalized Kittel approach, Mango-Allen refinement', in that order. They are one of three classes (dollar-based, count-based, triangle-based, p.386). No ranking by sophistication appears.
- source_rank: 2
- proposed_action: Retitle to 'Friedland's four dollar-based techniques' and put the bullets in Friedland's order (Conger-Nolibos before Mango-Allen).
- applied: true
- fingerprint: 28de53a22d48

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Heading now reads 'Friedland's four dollar-based techniques:' and Conger-Nolibos is listed before Mango-Allen, as on p.387. The omitted count-based and triangle-based classes are F-004.

## [F-002] 'Mango-Allen bootstrap' is not Friedland's name
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 4, line 28
- claim: Mango-Allen bootstrap.
- evidence: Friedland p.387 and p.400 (PDF 393, 406) call it the 'Mango-Allen refinement'; 'bootstrap' occurs nowhere in the document (full-text search). The description that follows (replace volatile CY paid claims with expected paid claims from reporting/payment patterns applied to AY ultimates) matches p.400.
- source_rank: 2
- proposed_action: Rename to 'Mango-Allen refinement'.
- applied: true
- fingerprint: 69f1df11774b

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Renamed to 'Mango-Allen refinement' in this change.

## [F-003] Conger-Nolibos is dollar-based, not count-based
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- severity: major
- status: open
- locus: bullet 3, line 27
- claim: ...and the resulting ratio is applied to the corresponding unpaid counts or dollars.
- evidence: Friedland p.394 (PDF 400): 'Since Conger and Nolibos believe that handling costlier claims warrants and requires relatively more resources than handling smaller claims, they use claim dollars instead of claim counts in their generalized approach.' Key assumption p.395: 'Expenditure of ULAE resources is proportional to the dollars of claims being handled.'
- source_rank: 2
- proposed_action: Delete 'counts or'.
- applied: true
- fingerprint: ef349273c045

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- resolves: F-003
- status: resolved
- note: 'counts or' deleted in this change; the bullet now says the ratio is applied to unpaid dollars.

## [F-004] Count-based and triangle-based ULAE techniques omitted
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- severity: major
- status: open
- locus: list, lines 20-28
- claim: The page presents the four dollar-based techniques as the whole of Friedland's treatment of ULAE.
- evidence: Friedland Ch.17 p.386 (PDF 392): 'There are two broad classifications of techniques for estimating unpaid ULAE: dollar-based and count based', and the chapter is organised as dollar-based, count-based, triangle-based techniques and a comparison example. Count-based techniques (pp.402-406, PDF 408-412): early count techniques (Brian), Wendy Johnson, Mango-Allen claim staffing, Rahardjo, Spalla; triangle-based techniques p.406 (PDF 412). Exam 5 task B15 (content outline p.5) asks candidates to calculate and evaluate the estimation techniques for ULAE, with Friedland as the reading.
- source_rank: 2
- proposed_action: Add the count-based techniques (Brian, Johnson, Mango-Allen claim staffing, Rahardjo, Spalla) and triangle-based techniques from Ch.17. This is new prose — left for an author.
- applied: false
- fingerprint: 1d178df84aeb

## [F-005] Runoff example attributes per-claim transaction costing to Conger-Nolibos
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- severity: major
- status: open
- locus: Example 'Why the Classical Ratio Fails in Runoff', answer, line 83
- claim: This is precisely the situation the Conger-Nolibos approach is built for: estimate what it costs to maintain and close the remaining claim inventory — a cost per open claim per year plus a cost per closure — rather than a ratio to a shrinking payment base.
- evidence: Conger-Nolibos is a dollar-based method that keeps a ratio to claim dollars (p.394-395, PDF 400-401: 'they use claim dollars instead of claim counts'). Costing per open claim and per closure is the count-based approach — Brian's transactions, Johnson's reporting and maintenance, Mango-Allen's OCP claims per staff member (pp.403-404, PDF 409-410). Friedland's remedy for a shrinking book is not stated to be C-N; she notes the classical ratio is unreliable when volume is decreasing (p.390) and that count-based methods do not make ULAE a 'rider' on claim dollars (p.402).
- source_rank: 2
- proposed_action: Re-attribute the per-open-claim / per-closure costing to the count-based techniques (e.g. Johnson or Mango-Allen claim staffing), or recast the C-N sentence in dollar terms. Needs rewording — left for an author.
- applied: false
- fingerprint: ec8c69b73e1b

## [F-006] Unsourced claims: ULAE ratios by line; 'paid-only' variant; ratemaking fixed-expense alternative
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- severity: minor
- status: open
- locus: lines 22, 32, 34
- claim: ULAE runs roughly 5-8% of loss in workers compensation, 4-6% in auto liability ... / Assuming ULAE is spent purely with payments instead gives R x (Case + IBNR). / In ratemaking, ULAE may be handled as a load on losses or as a fixed expense provision. Either is acceptable.
- evidence: None of the three is in Friedland Ch.17 (full-text search; its variants on the 50/50 split are the 25%/75% opening/closing example of p.388 as corrected by the errata, PDF p.451, and the pure-IBNR refinement p.389). Werner & Modlin Ch.6 pp.121-122 describes only the ratio of CY paid ULAE to CY paid loss+ALAE applied as a load to loss+ALAE; it does not present a fixed-expense treatment of ULAE.
- source_rank: 2
- proposed_action: Source the figures and the two alternatives to a syllabus reading, or remove them.
- applied: false
- fingerprint: 53610895e958

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Definition vs p.386; classical formula 0.5 x case + 1.0 x IBNR vs pp.387-388; Kittel ratio and its growth rationale vs pp.391-393; Mango-Allen description vs p.400; Conger-Nolibos weights vs pp.394-395; growth/shrinkage distortion vs p.390; both examples recomputed independently (12.0%, 840,000; 8.0%, 560,000; 280,000; 5.0/6.0/8.9%, 6.6% average) — agree; full-text search of every named method.
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, July 30 2010), Ch.17 pp.386-404 (PDF 392-410), Errata (PDF p.451), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch.6 'Loss Adjustment Expenses', pp.121-122 (PDF 133-134), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Formulas and the classical/Kittel/Mango-Allen descriptions check against Friedland Ch.17. Three transcription fixes applied (technique class and order, 'bootstrap', C-N counts). Open: two major findings (count- and triangle-based techniques omitted; runoff example attributes per-claim costing to C-N) and one minor (unsourced figures and alternatives).

## [F-007] 25%/75% professional-liability example transcribes the text the book's errata corrects
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/4562
- date: 2026-10-31
- severity: critical
- status: open
- locus: 'When the classical technique fails', Long-tail lines bullet, last sentence
- claim: for a long-tail professional liability portfolio ... one actuary applies 25% of the ratio to case outstanding and 75% to IBNR, which includes development on case outstanding.
- evidence: Friedland Ch.17 p.388 (PDF 394) prints '25% applied to case outstanding and 75% to IBNR', but the Errata page bound into the same CAS PDF (PDF p.451) corrects exactly that sentence to: 'ratios of 25% applied to opening the claims and 75% to closing the claims (implying 75% of the ULAE ratio applied to case outstanding and 100% to IBNR, which includes development on case outstanding)'. The uncorrected text also contradicts the paragraph's own conclusion ('a greater proportion of the expenses are related to closing the claims'): under it a candidate would put 25%, not 75%, of the ratio on case outstanding — the wrong direction for cas5-2017-q24, whose solution needs the classical 50% to understate the case-outstanding piece for a long-tail line. sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- source_rank: 2
- proposed_action: Transcribe the errata: 25% opening / 75% closing, i.e. 75% of the ratio on case outstanding and 100% on IBNR.
- applied: true
- fingerprint: 614ea77c2a39

## [F-008] Test of the same-inflation assumption (paid ULAE trend vs loss cost per exposure) is not in Friedland
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/4562
- date: 2026-10-31
- severity: minor
- status: open
- locus: 'When the classical technique fails', Inflation bullet, last sentence
- claim: The assumption is tested by comparing how fast ULAE costs have grown with how fast claim costs have grown, for instance the trend in paid ULAE against the trend in loss cost per exposure
- evidence: Friedland Ch.17 pp.387-391 (PDF 393-397) states Kittel's same-inflation condition and Mango-Allen's upward distortion (PDF 397) but gives no test of it; the only related text is the XYZ ratio selection weighing 'the relationship between claim and salary inflation' (p.388, PDF 394). 'loss cost per exposure' and 'per exposure' do not occur in Ch.17. The writer flagged this sentence as not in Friedland. sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- source_rank: 2
- proposed_action: Delete the unsupported clause; keep the p.388 claim/salary-inflation sentence.
- applied: true
- fingerprint: bf414cd76783

## [F-007/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/4562
- date: 2026-10-31
- resolves: F-007
- status: resolved
- note: Corrected in this change to the errata's wording: 25% opening / 75% closing, implying 75% of the ratio on case outstanding and 100% on IBNR, with the errata named.

## [F-008/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/4562
- date: 2026-10-31
- resolves: F-008
- status: resolved
- note: Unsupported clause deleted in this change; the p.388 claim/salary-inflation sentence stays.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/4562
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Added 'When the classical technique fails' and 'Count-based techniques' vs Ch.17: Johnson's short-tailed quote and Rahardjo's liability quote (PDF 396); 25%/75% professional-liability example vs p.388 and the Errata (PDF 451) — corrected; Kittel same-inflation and Mango-Allen upward distortion (PDF 397); XYZ selection weighing claim/salary inflation (PDF 394); $1,000 vs $100 dollar-based assumption (PDF 393); Mango-Allen average-size and 'rider' objections, count-based key assumption (PDF 408); Johnson reporting/maintenance weights and weighted-count mechanics (PDF 409-410). Examples recomputed (12.0%, 840,000; 8.0%, 560,000; 280,000; 6.6% average).
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, 2010), Ch.17 pp.386-391, 402-404 (PDF 392-397, 408-410); Errata (PDF 451), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: One critical transcription error (25/75 contradicting the errata) and one minor unsupported test sentence fixed. F-004 is partly addressed (Johnson and the count-based premise now present; Brian, Mango-Allen claim staffing, Rahardjo, Spalla and triangle-based still absent) and stays open, as do F-005 and F-006.
