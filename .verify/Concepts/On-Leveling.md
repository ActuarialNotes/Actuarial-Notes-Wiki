---
target: Concepts/On-Leveling.md
created: 2026-09-12
---

## [F-001] A law-mandated change applied to in-force policies is still handled by the parallelogram method
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- severity: nit
- status: open
- locus: bullet 4, 'A special case: if the rate change applies to in-force policies…'
- claim: '…the parallelogram geometry no longer holds and the change is treated as effective immediately across the whole book.'
- evidence: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 p. 78 (PDF p. 90), 'Rate Changes Mandated by Law': 'In some cases, rate changes are in response to law changes that may mandate the rate change be applied to all policies on or after a specific date, even those that are currently in-force. In that special case, the rate level change is represented as a vertical line rather [than a diagonal one].' The method is not abandoned — only the diagonal becomes vertical, and the areas are still read off the diagram. The page's second clause ('effective immediately across the whole book') is right; 'the parallelogram geometry no longer holds' overstates it.
- source_rank: 2
- proposed_action: Say the rate-change line is drawn vertically instead of diagonally, so the areas become rectangles and the method still applies.
- applied: false
- fingerprint: 9958f821dce5

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- status_set: verified
- confidence: high
- checks_run: Recomputed the mid-year example before reading the answer: new-level area in CY 2023 = 0.5(1-0.5)^2 = 0.125, average index 0.875(1.000) + 0.125(1.120) = 1.0150, OLF = 1.120/1.0150 = 1.10345; CY 2024 old-level area 0.5(0.5)^2 = 0.125, average index 1.1050, OLF = 1.0136; CY 2025 OLF = 1.000. Both areas and the OLF definition check against Werner's Table 5.18/Step 5 (p. 76, PDF p. 88), where the 7/1/10 change leaves area 0.125 at the prior level in CY 2011 and the 1/1/11 change takes area 0.500. The stated weaknesses (uniform writing, single policy term, uniform application across risks) and both remedies in the second example (extension of exposures; replacing the geometric areas with the actual distribution of writings) are Werner pp. 79-80 (PDF pp. 91-92) almost point for point, including the seasonal-writing counterexample (Werner uses pleasure-boat policies). One nit opened on the in-force/law-mandated bullet (F-001). Links, embed and LaTeX clean.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 pp. 72-80 (PDF pp. 84-92), Current Rate Level: extension of exposures, parallelogram method Steps 1-6, six-month and policy-year variants, Rate Changes Mandated by Law, and the method shortcomings, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Werner Ch.5 pp.78-79 (PDF pp.90-91) re-read: 'In that special case, the rate level change is represented as a vertical line rather than a diagonal line' and 'The on-level factor is still the current cumulative rate level index divided by the average cumulative rate level index of the historical period.' Bullet 4 now says the change takes effect immediately across the book, is drawn as a vertical line, the areas are still found by geometry and the OLF is still current index over average index; 'the parallelogram geometry no longer holds' is gone.

## [F-002] Seasonal-writing example is not Werner's, and the method's second shortcoming (class-varying rate changes) is missing
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullet 2, 'The method's assumptions are its weaknesses'
- claim: 'Seasonal writing (crop, some property) or a mid-year term change breaks it.'
- evidence: Werner Ch.5 p.80 (PDF p.92), 'Comments on the Parallelogram Method': 'There are two problems ... The first issue is that the method assumes policies are written evenly throughout the year ... For example, boat owners policies are generally purchased in the first half of the year'; 'The second issue ... is that it is generally applied at the aggregate level using a series of overall average changes ... the premium for certain classes will not be on-level if the implemented rate changes varied by class. Consequently, the adjusted premium will likely be unacceptable for any classification ratemaking analysis.' Crop and 'some property' are not Werner's examples, and the second problem was absent.
- source_rank: 2
- proposed_action: Use Werner's boat-owners example and add the class-level shortcoming.
- applied: true
- fingerprint: e2791e02de08

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Bullet 2 now gives Werner's boat-owners example and his second problem: where rate changes varied by class, the on-level premium is unusable for classification ratemaking (Werner p.80, PDF p.92).

## [F-003] Last bullet says law amendments are handled on the loss side, though Werner on-levels a law-mandated rate change
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: last bullet, 'On-levelling handles rate changes only'
- claim: '... and law amendments or benefit-level changes are handled by a separate law-level adjustment on the loss side.'
- evidence: Werner Ch.5 pp.78-79 (PDF pp.90-91), 'Rate Changes Mandated by Law', on-levels a -5% law-mandated rate change in the parallelogram itself; the loss-side adjustment is for the effect of a coverage or benefit-level change on losses (Werner Ch.6 p.100, PDF p.112: 'future projected losses need to reflect the coverage/benefit levels expected'). The bullet contradicted bullet 4 of the same page. Premium trend per Werner Ch.5 p.82 (PDF p.94) is the change in average premium from 'distributional changes'.
- source_rank: 2
- proposed_action: Say on-levelling covers law-mandated rate changes too, and the loss-side adjustment is for the effect of a coverage or benefit change on losses.
- applied: true
- fingerprint: 0dfb9a1e5f29

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Last bullet rewritten accordingly (Werner Ch.5 pp.78-79 and p.82; Ch.6 p.100).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: Re-read Werner Current Rate Level end to end: extension of exposures (p.73, 'the most accurate current rate level method'; needs rating characteristics of every historical policy), parallelogram Steps 1-6 (p.74), the CY 2011 areas 0.125/0.375/0.500 (p.75), OLF = current cumulative index / average index (p.76), law-mandated vertical line (pp.78-79), the two shortcomings and the actual-distribution-of-writings remedy (p.80). Example 1 recomputed before reading: 0.5(0.5)^2 = 0.125, avg index 0.875 + 0.125(1.12) = 1.015, OLF 1.12/1.015 = 1.10345; CY 2024 avg 1.105, OLF 1.01357; CY 2025 1.000. Example 2: 12.5% is the uniform-writing area for a 7/1 change; remedies match Werner p.80.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 pp.71-80 (PDF pp.83-92); Ch. 5 p.82 (PDF p.94); Ch. 6 p.100 (PDF p.112), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: F-001 resolved; two new minor findings fixed and resolved. Confidence medium: both examples are vault-authored (recomputed), and the 'single policy term' assumption and 'captures distributional shifts' are the vault's inferences rather than Werner's words.
