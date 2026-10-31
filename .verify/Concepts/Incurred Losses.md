---
target: Concepts/Incurred Losses.md
created: 2026-10-31
---

## [F-001] Claim count triangle is one way, not the only way, to split pure IBNR from IBNER
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- severity: minor
- status: open
- locus: Example 'Reported Development and IBNR', answer, line 46
- claim: Splitting the two requires a claim count triangle — develop counts to ultimate, subtract reported counts, and value the unreported claims at an expected severity.
- evidence: Friedland Ch.17 p.389 (PDF 395) gives the counts-times-severity test as 'One method'; footnote 92 adds report year analysis, frequency-severity techniques, other approaches, and judgment.
- source_rank: 2
- proposed_action: Present the count method as one approach. Needs rewording — left for an author.
- applied: false
- fingerprint: 2218f36f752c

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: 'Reported' vs 'incurred' terminology and its reason vs p.15; CY incurred = CY paid + change in case and IBNR vs p.392 and fn.99; downward reported development (case above settlement, recoveries in the data) vs p.52; case-adequacy distortion and Berquist-Sherman remedy vs Ch.13; both examples recomputed independently (1,080,000; 280,000; diagonal factors above each column's history) — agree.
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, July 30 2010), Ch.1 p.15 (PDF 21); Ch.5 p.52 (PDF 58); Ch.13; Ch.17 p.392 incl. fn.99 (PDF 398), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Checks against Friedland. One minor finding open: the claim count triangle is presented as the only way to split IBNR.
