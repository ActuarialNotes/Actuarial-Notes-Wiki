---
target: Concepts/Reinsurance Reserving.md
created: 2026-10-11
---

## [F-001] Patrik attribution on a list that is Friedland's own
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rda
- date: 2026-10-11
- severity: minor
- status: open
- locus: bullet 'Why primary methods need adjusting (Friedland, drawing on Patrik)'
- claim: The reasons primary methods need adjusting are Friedland 'drawing on Patrik'.
- evidence: The reporting-lag reasons are Friedland's Chapter 2 'Reporting Lags' (PDF p.45) and the higher factors, tails, trend and weaker on-level data are her 'Differences in Assumptions for Reinsurance and Primary Insurance' (PDF p.55); neither passage cites Patrik. Patrik is cited for the segmentation list (pp.35-36, fn 39-40), which the page attributes correctly further down.
- source_rank: 2
- proposed_action: Delete ', drawing on Patrik' from the bullet's lead-in.
- applied: false
- fingerprint: 12fb3dff9957

## [C-001] Cape Cod lead not covered by Exam 7's reading; GI-301 source not read
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rda
- date: 2026-10-11
- locus: lead formulas and first bullet (Cape Cod / Stanard-Buhlmann with a report lag)
- note: Friedland (2022), Exam 7's reading for A15-A17, covers only the development, expected and Bornhuetter-Ferguson methods (PDF pp.50-55); 'Cape Cod' and 'Stanard' occur nowhere in it. The page's lead formulas, the claim that Cape Cod suits long-tail casualty excess business, and Cape Cod in the list of techniques are presumably from the reading GI-301 links the page through (SOA, 'General Insurance: Considerations in Reinsurance Reserving', May 2025, objective 7d) or Patrik's chapter; neither was read in this pass and the vault has no resource page for the SOA note. The Cape Cod example's arithmetic was recomputed (used-up premium 4,870, ELR 66.9%, IBNR 1,071/2,176/3,534 = 6,781 vs chain ladder 5,883) and is right, but that is rank 5. Left in_review until someone reads the SOA note.

## [C-002] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rda
- date: 2026-10-11
- status_set: in_review
- checks_run: every bullet except the Cape Cod material against Friedland; both examples recomputed (Cape Cod as above; layer 850 -> 946.5, +11.4%)
- sources_checked: Friedland, Reserving for Reinsurance (CAS Study Note — Exam 7, (c)2023 CAS; cited by the outline as 2022), PDF pp.10, 35-38, 39-41, 43-46, 50-56, 64-66, 70, sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf
- note: Everything Friedland covers checks out apart from F-001. The Cape Cod lead needs the GI-301 SOA study note (see comment).

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rdb
- date: 2026-10-11
- resolves: F-001
- status: resolved
- note: Deleted ', drawing on Patrik' from the bullet's lead-in, which now reads 'Why primary methods need adjusting (Friedland):'. Friedland PDF pp.45 and 55 are her own; Patrik stays credited on the segmentation list, where she quotes him (pp.35-36).

## [C-003] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rdb
- date: 2026-10-11
- status_set: in_review
- checks_run: the edit re-read against PDF pp.45 and 55; the rest unchanged since the sweep pass
- sources_checked: Friedland, Reserving for Reinsurance (CAS Study Note — Exam 7, (c)2023 CAS; cited by the outline as 2022), PDF pp.10, 35-38, 39-41, 43-46, 50-56, 64-66, 70, sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf
- note: F-001 closed. Still in_review: the Cape Cod lead has no source among Exam 7's readings and the GI-301 SOA note was not read (see the sweep comment).

## [C-004] Writer's rewrite checked (fix D)
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rdc
- date: 2026-10-16
- locus: whole page
- note: Re-read after the writer removed the Cape Cod / Stanard-Buhlmann lead, the long-tail claim, Cape Cod in the technique list and the Cape Cod example, and added a development-vs-BF example. The terms 'Cape Cod' and 'Stanard' occur nowhere in Friedland (full-text search), so the page now claims nothing from outside her note. Every bullet was re-read against the PDF pages in the sources line: lead pp.50-51, 55 (assumed/retroceded/ceded; three methods; same mechanics, different assumptions), pp.45, 51 fn49, 52, 55; BF formulas p.54 and ELR x EP p.53; method bullets pp.51, 53-54; reasons for adjusting pp.45, 55; data realities pp.39-40, 43, 45, 56, 66, 69-70; Patrik's list pp.35-36; experience period pp.26-28, 37-39, 66, 71; outputs pp.46-47, 72. Example 1 recomputed blind before reading the working: dev ult 360/0.12 = 3,000, EL 0.70 x 6,000 = 4,200, BF 360 + 4,200 x 0.88 = 4,056, IBNR 2,640 / 3,696; with 560 reported dev 4,666.7, BF 4,256, swings 1,666.7 vs 200 — agrees; the method matches p.54. Example 2 recomputed: layer 0+400+450 = 850 -> 4+445+497.5 = 946.5, +11.4% — agrees. All wiki-links resolve.

## [C-005] Source for share unreported = 1 - 1/CDF
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rdc
- date: 2026-10-16
- locus: bullet after the formulas
- note: Friedland's reinsurance note does not state the identity: 'percent reported', '1.00 -' (as the identity) and 'reciprocal' do not occur, and p.54 stops at '(Expected Losses) x (% Unreported)'. She states that the method descriptions 'are based on those in Estimating Unpaid Claims Using Basic Techniques' (p.51; also p.50 fn48, p.55: detailed calculations 'are not repeated in this text'). Basic Techniques Ch.9 states it outright, PDF pp.159-160: 'the percentage unreported is equal to 1.00 minus the inverse of the cumulative reported claim development factor'. That text was fetched and read this session and is added to this page's sources; no change to the page is needed. The example's '12% reported (a CDF to ultimate of 1/0.12)' rests on the same sentence.

## [C-006] Objectives served; GI-301 reading still unread
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rdc
- date: 2026-10-16
- locus: links in
- note: The Exam 7 page links this concept from objective 15 (A.v.1, 'Adjust primary methods and data to be used for reinsurance reserving' — not 16, which links Ceded Loss Reserve). The page serves it: the adjustments to the three methods (pp.50-55) and the data issues (ch.2) are its body. GI-301 links it from its Reinsurance section (objective 4, issues applying loss development methods to reinsurance), whose reading for 7d is the SOA note 'General Insurance: Considerations in Reinsurance Reserving' (May 2025). The vault has no resource page for that note and it was not read here. Anything that note teaches beyond Friedland — the Cape Cod / Stanard-Buhlmann material the earlier page carried was presumably from it or from Patrik — is now absent. Recorded as a gap for a writer working from that note, not as a failure of this page.

## [F-002] A&E exposures said to be wholly unsuited to triangles
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rdc
- date: 2026-10-16
- severity: minor
- status: open
- locus: 'Data realities' bullet, last sentence
- claim: Discontinued business is often excluded, and asbestos, environmental and abuse exposures are not suited to triangle methods at all.
- evidence: Friedland PDF p.45 ('Other Experience Typically Excluded from Development Analyses'): changes 'may lead the actuary to choose to exclude discontinued business', and 'some types of discontinued business (such as asbestos, environmental impairment liability, and abuse) may not be suited to development triangle analyses.' The source hedges both clauses ('may'); the page states them as rules, and adds 'at all'.
- source_rank: 2
- proposed_action: Restate to the source: 'Discontinued business may be excluded, and some of it (asbestos, environmental and abuse) may not suit triangle methods.'
- applied: false
- fingerprint: fb880bc03774

## [F-003] Unsourced 'where to look first' in the BF example
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rdc
- date: 2026-10-16
- severity: minor
- status: open
- locus: example 'Development vs Bornhuetter-Ferguson on an Immature Excess Year', last sentence
- claim: Reinsurance rate changes are hard to quantify, so the premium on-level adjustment behind that ELR is where to look first.
- evidence: Friedland PDF p.55 says only that there is 'often less precision in premium on-level factors', that reinsurers' rate change information 'can be far more challenging to quantify given the manuscript nature of reinsurance arrangements', and 'Nevertheless, reflecting rate changes is important when determining expected loss ratios for the expected and Bornhuetter-Ferguson methods'. She ranks no review steps; 'where to look first' is the page's own prioritisation. The ELR's other inputs (pricing, industry data, adjusted history, p.53) are no less open.
- source_rank: 2
- proposed_action: Restate to p.55: 'Reinsurance rate changes are hard to quantify, yet the ELR still has to reflect them.'
- applied: false
- fingerprint: 98b93eac6598

## [C-007] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rdc
- date: 2026-10-16
- status_set: in_review
- checks_run: every claim against Friedland (full-text search for Cape Cod/Stanard: none); 1-1/CDF against Basic Techniques Ch.9; both examples recomputed blind; links; objectives A15 and GI-301
- sources_checked: Friedland, Reserving for Reinsurance (CAS Study Note — Exam 7, (c)2023 CAS; cited by the outline as 2022), PDF pp.10, 26-28, 35-40, 43, 45-47, 50-56, 66, 69-72, sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, 2010), PDF pp.159-160 (Ch.9: % unreported = 1.00 minus the inverse of the reported CDF), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; CAS, Exam 7 Content Outline, Fall 2026 (Exam_7_CO_2026_F v04 2026_9_16), PDF pp.3-6 (tasks A.ii.4 = 5, A.v.1-3 = 15-17; Teng and Perkins excluding Section 5 with Feldblum Sections 1-2; Friedland A.v.1-A.v.3), sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf
- note: Everything on the page is now in Friedland or in the Basic Techniques text she incorporates; two minor overstatements (F-002, F-003) go to the clean-up round.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rdd
- date: 2026-10-16
- resolves: F-002
- status: resolved
- note: Restated to Friedland PDF p.45: the sentence now reads 'Discontinued business may be excluded, and some of it (asbestos, environmental and abuse) may not suit triangle methods.'

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rdd
- date: 2026-10-16
- resolves: F-003
- status: resolved
- note: Restated to Friedland PDF p.55: the sentence now reads 'Reinsurance rate changes are hard to quantify, yet the ELR still has to reflect them.' The example's arithmetic is unchanged.

## [C-008] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rdd
- date: 2026-10-16
- status_set: verified
- confidence: high
- checks_run: the two edited sentences re-read against PDF pp.45 and 55; the rest unchanged since the sweep pass this session (every claim against Friedland and Basic Techniques Ch.9; both examples recomputed blind)
- sources_checked: Friedland, Reserving for Reinsurance (CAS Study Note — Exam 7, (c)2023 CAS; cited by the outline as 2022), PDF pp.10, 26-28, 35-40, 43, 45-47, 50-56, 66, 69-72, sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, 2010), PDF pp.159-160 (Ch.9: % unreported = 1.00 minus the inverse of the reported CDF), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; CAS, Exam 7 Content Outline, Fall 2026 (Exam_7_CO_2026_F v04 2026_9_16), PDF pp.3-6 (tasks A.ii.4 = 5, A.v.1-3 = 15-17; Teng and Perkins excluding Section 5 with Feldblum Sections 1-2; Friedland A.v.1-A.v.3), sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf
- note: No open findings. The GI-301 reading (SOA, Considerations in Reinsurance Reserving, 2025) remains unread and uncovered; see the sweep comment.
