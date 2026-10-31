---
target: Concepts/Rate Level Change.md
created: 2026-10-31
---

## [F-001] On-level factor denominator mislabelled as the index 'in force'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/275d
- date: 2026-10-31
- severity: minor
- status: open
- locus: formula, line 16
- claim: Page's formula: On-Level Factor = Current cumulative index / Index in force during the period.
- evidence: Werner & Modlin Ch. 5 pp. 74-76 (PDF pp. 86-88), Step 5: 'the on-level factor [is] the ratio of the current cumulative rate level index and the average cumulative rate level index for the appropriate year' — Current Cumulative Rate Level Index / Average Rate Level Index for Historical Period. For a period spanning a change no single index is 'in force' (CY 2011 in Werner's example averages 1.0000, 1.0500 and 1.1550 to 1.0963).
- source_rank: 2
- proposed_action: Relabel the denominator with Werner's words: 'Average rate level index for the historical period' (and the numerator 'Current cumulative rate level index').
- applied: true
- fingerprint: f42bf882e34c

## [F-002] Cape Cod mechanism: un-on-levelled low-rate years get less, not more, weight
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/275d
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet on Cape Cod, line 22
- claim: Page: 'without on-levelling, years written at low rates get too much weight in the derived ELR.'
- evidence: Rank-5 recomputation falsifies the mechanism: the Cape Cod ELR is Σ reported claims / Σ used-up premium, so each year's weight is its used-up premium; a year written at low rates has less premium, hence less weight, not more. The distortion is that its claim ratio is inflated and the pooled ELR mixes rate levels before being applied to each year's premium. Friedland Ch. 10 p. 182 says only that 'in an ideal situation, the actuary would ... adjust historical premiums to an on-level basis for both the Cape Cod and Bornhuetter-Ferguson projections ... these methods require such adjustment' and Ch. 10 p. 183 restates XYZ's premium to the 2008 rate level before computing used-up premium.
- source_rank: 5
- proposed_action: Replace the clause with Friedland's statement that Cape Cod (like BF) theoretically requires on-level premium, or describe the distortion correctly (un-adjusted claim ratios mix rate levels in the pooled ELR).
- applied: false
- fingerprint: 553e09298e08

## [F-003] Mix-shift claim about which risks leave is unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/275d
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet on mix, line 23
- claim: Page: 'A large increase drives away the risks with the most alternatives — typically the better ones — so the remaining book's experience deteriorates in a way no on-level factor corrects.'
- evidence: Neither Werner & Modlin nor Friedland says this. Werner Ch. 13 p. 251 (PDF p. 263) says only that 'a rate increase will generally lead to reductions in these ratios' (close and retention) and that rate changes can 'motivate existing customers to shop'; full-text search of both PDFs finds no statement that the better risks leave after an increase.
- source_rank: 2
- proposed_action: Cite a source for the adverse-selection effect of a rate increase, or reduce the bullet to Werner's retention statement.
- applied: false
- fingerprint: 7ecf287cd49c

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/275d
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: on-level factor formula against Werner Step 5; ELR adjustment for rate level and trend against Friedland's Expected Claims Exhibit III (claims × trend / premium × rate level adjustment, p. 151) and the BF/Cape Cod on-level requirement (p. 182); independent recomputation before reading answers: 1.06×1.10×1.04 = 1.21264, 1.05^3 = 1.157625, ELR 0.68×0.95463 = 64.9%; on-level example indices 1.000/1.060/1.1872, current 1.2544, OLFs 1.2544/1.1834/1.0566, OL EP $25,088,000 / $27,218,113 / $29,162,264 (page's $29,165,000 uses the rounded 1.0567), LRs 57.4%/58.3%/62.5%; wiki-links
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 pp. 71-80 (PDF pp. 83-92), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Third Version, July 2010), Ch. 3 p. 41, Ch. 6 pp. 70-71, Ch. 8 pp. 139-142 and Exhibit III Sheet 2 notes p. 151, Ch. 10 pp. 182-183 (PDF pages), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Formulas and examples check; the OLF denominator was relabelled to Werner's words in this run; two minor unsourced/incorrect mechanism statements left open for an editor.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/275d
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Denominator relabelled in this run to Werner's Step 5 wording (Current cumulative rate level index / Average rate level index for the historical period); the formula's mathematics is unchanged.
