---
target: Concepts/Other Comprehensive Income Option.md
created: 2026-10-18
---

## [F-001] Locked-in rate for PAA groups is at the date of incurred claims, not initial recognition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T14:08Z/g6c6
- date: 2026-10-18
- severity: major
- status: open
- locus: lead sentence and the 'It is not free of judgement' bullet
- claim: The systematic finance expense left in profit is 'based on the rate locked in at initial recognition'.
- evidence: CIA Educational Note 225109 (IFRS 17 Discount Rates, 2025), §10 Locked-in yield curve, PDF p.28 (sha256:ba5d55e4e3429fa74681b03719336d5e186a812856f0445a5c4f8438fec5c4dc): 'Locked-in yield curves refer to yield curves determined either at the initial recognition of the group of contracts or at the date of incurred claims'. For GMA groups it is the date of initial recognition (IFRS 17.B72). 'Based on IFRS 17.B72(e)(iii), for groups of contracts applying the PAA, the locked-in yield curves used for the OCI option are determined at the date of the incurred claims', possibly the average date of incurred claims for the group. Most Canadian P&C business is PAA, so the page's unconditional 'initial recognition' is wrong for the typical 6C case.
- source_rank: 2
- proposed_action: Add the condition: initial recognition for GMA groups, the date of incurred claims for groups under the PAA (IFRS 17.B72(e)(iii); CIA 225109 §10).
- applied: false
- fingerprint: 5324f7f9b8e7

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T14:11Z/g6c6r
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Added the exception the finding cites (CIA note 225109 §10 p.28; IFRS 17.B72(e)(iii)): under the premium allocation approach the curve is locked in at the date of the incurred claims. The page stays unverified.
