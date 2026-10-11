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
