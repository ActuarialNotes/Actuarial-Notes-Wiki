---
target: Concepts/IBNR.md
created: 2026-10-31
---

## [F-001] Claim count triangle is one way, not the only way, to split pure IBNR from IBNER
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 3, line 22
- claim: Splitting the two requires a claim count triangle: develop counts to ultimate, subtract reported counts to get unreported claims, and value them at an expected severity.
- evidence: Friedland Ch.17 p.389 (PDF 395) gives the counts-times-severity test as 'One method', and footnote 92: 'actuaries may rely on report year analysis, frequency-severity techniques, or other approaches to estimate the proportion of total IBNR that is pure IBNR. Actuaries often rely on judgment for this allocation.' Ch.3 p.42 (PDF 48): report year data can 'test the adequacy of case outstanding on known claims'.
- source_rank: 2
- proposed_action: Change 'requires' to present the count method as one approach and name the alternatives from fn.92. Needs rewording — left for an author.
- applied: false
- fingerprint: 76e282cda73f

## [F-002] 'No pure IBNR' on a claims-made book is stated without Friedland's exceptions
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 6, line 25
- claim: A claims-made book has no pure IBNR by construction — every claim in a report year is already reported — so its IBNR is entirely IBNER.
- evidence: Friedland Ch.3 p.42 (PDF 48): the number of claims in a report year is fixed at the close of the year 'other than for claims reported but not recorded', and 'some claims-made policies have extended reporting endorsements that may not be coded as a new policy, and hence development beyond 12 months may be possible even for annual policies'. Ch.1 p.14 (PDF 20): broad IBNR also includes claims in transit and reopened claims. Ch.12 p.265 (PDF 271) says only that claims-made claims for a period are known at its end.
- source_rank: 2
- proposed_action: Qualify the bullet with the claims-in-transit and extended-reporting exceptions. Needs rewording — left for an author.
- applied: false
- fingerprint: 18995ab633c0

## [F-003] Unsourced: late-reported claims tend to be smaller
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- severity: minor
- status: open
- locus: Example 'Splitting Pure IBNR from IBNER', answer, line 64
- claim: The 8,000 expected severity on unreported claims is usually below the average reported severity, because late-reported claims tend to be smaller.
- evidence: Not in Friedland (full-text search of 'late reported'/'late-reported': PDF pp.66, 101, 429). Its only general statement about late reporting, Pinto and Gogol quoted at p.95 (PDF 101), attributes slow excess development in part to late-reported claims, which does not support the claim. Stated as fact with no source.
- source_rank: 2
- proposed_action: Source it or remove the sentence.
- applied: false
- fingerprint: c0b646951b16

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Broad/narrow IBNR and IBNER definitions vs p.14; IBNR = ultimate - reported, unpaid = case + IBNR vs p.80; method roles (CL, BF, expected claims) vs Ch.7-9; split method vs p.389 and fn.92; claims-made vs p.42 and Ch.12; both examples recomputed independently (800,000; 400,000; 700,000; 1,400,000; 480,000; 920,000; 66%) — agree.
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, July 30 2010), Ch.1 pp.13-14 (PDF 19-20); Part 3 intro pp.79-80 (PDF 85-86); Ch.3 p.42 (PDF 48); Ch.7 p.95 (PDF 101); Ch.17 pp.388-389 (PDF 394-395), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Definitions and formulas check against Friedland. Three minor findings stay open: the count triangle is one way to split IBNR, not the only one; the claims-made bullet lacks Friedland's exceptions; and the late-reported severity claim has no source.
