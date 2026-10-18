---
target: Concepts/Contractual Service Margin.md
created: 2026-10-18
---

## [F-001] Initial-recognition CSM formula has the sign backwards
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T14:08Z/g6c6
- date: 2026-10-18
- severity: critical
- status: open
- locus: formula callout under the lead
- claim: CSM_0 = −(PV of future cash inflows − PV of outflows − RA)
- evidence: CIA Educational Note 222092 (IFRS 17 LRC), §4.6, PDF p.17 (sha256:a7e5ecea716dc20bffcc88045f20c950e71400ac3de3bfb1544736dac46a0333): 'At initial recognition, the CSM is set at the amount such that no profit is recognized, i.e., total cash inflows minus total cash outflows for the group, with a floor of zero'; the fulfilment cash flows include the risk adjustment (IFRS 17.38 quoted in the same section). The page's expression equals PV outflows + RA − PV inflows, the fulfilment cash flows themselves, which is negative for a profitable group. The page's own worked example (60 − 44 − 5 = 11) uses the correct sign, so the formula contradicts it.
- source_rank: 2
- proposed_action: Change the formula to CSM_0 = max(0, PV of future cash inflows − PV of outflows − RA), or equivalently −(PV outflows − PV inflows + RA) floored at zero.
- applied: false
- fingerprint: 6dd863396c4e

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T14:11Z/g6c6r
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Formula restated to CIA educational note 222092 §4.6 (p.17), as the finding proposed: CSM_0 = max(0, PV inflows − PV outflows − RA). Matches the page's own worked example (60 − 44 − 5 = 11). The rest of the page is unchanged and still unverified.

## [C-001] Validation pass — unverified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:12Z/g6c6r
- date: 2026-10-18
- status_set: unverified
- note: F-001, the only critical, is resolved (formula restated to CIA note 222092 §4.6). Nothing else on the page has been checked, so it returns to unverified rather than verified.
