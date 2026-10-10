---
target: Concepts/Period of Restoration.md
created: 2026-10-10
---

## [F-001] Building-code time stated as included in the period of restoration; CP 00 30 excludes it
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- severity: critical
- status: open
- locus: bullet 'Building codes'
- claim: 'The ISO definition includes the extra time needed to comply with an ordinance or law regulating construction or repair, so a code that requires sprinklers or seismic bracing in the rebuilt structure lengthens the period.'
- evidence: CP 00 30 10 12, F. Definitions 3 (p.9): '"Period of restoration" does not include any increased period required due to the enforcement of or compliance with any ordinance or law that: (1) Regulates the construction, use or repair, or requires the tearing down, of any property; or (2) Requires any insured or others to test for, monitor, clean up, remove ... "pollutants".' The page states the opposite for (1). A student applying it would extend a claim's period for code-upgrade time that the unendorsed form excludes.
- source_rank: 1
- proposed_action: Replace the bullet with the form's rule (transcribed).
- applied: true
- fingerprint: c42f057936ce

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied: the bullet now transcribes CP 00 30 10 12 F.3 — the period does not include any increased period required by an ordinance or law regulating construction, use or repair or requiring tearing down, or requiring pollutant testing, monitoring or cleanup.

## [F-002] First example treats code-upgrade weeks as part of the period of restoration
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- severity: major
- status: open
- locus: example 'Estimating the Maximum Period of Restoration and the PML', stem and answer
- claim: t_building = 3 + 6 + 20 + 4 = 33 weeks, including '4 more weeks because the current building code requires a sprinkler system and fire walls'; 'The two paths tie ... with a spare line on hand the building still does [set the period at 37 weeks].'
- evidence: Under CP 00 30 10 12 F.3 the 4 code weeks are excluded from the period of restoration. The building path is 29 weeks, so the machinery path (33) governs alone; t_R = 33 + 4 = 37 weeks still holds, as do T_max = 256 days and PML = 1,705,714. But the reasoning is wrong: the paths do not tie, and with a spare line on hand the period would be 29 + 4 = 33 weeks, not 37. The example also pairs a PML estimate (which may reasonably reflect real rebuilding time) with the form's paid period without saying which it means.
- source_rank: 1
- proposed_action: Rework the example: either say it estimates physical restoration time for the PML (and that the unendorsed form would pay 4 fewer weeks absent an ordinance-or-law endorsement), or drop the code weeks from the building path and restate the 'tie' conclusion. Needs new prose, so not auto-fixed.
- applied: false
- fingerprint: a5a9ee0ec6fb

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- status_set: in_review
- checks_run: definition (72 hours / immediately; reasonable speed; new permanent location; expiration does not cut it short), ordinance-or-law and pollutant exclusions, EBI 60 days and the extended period of indemnity option against CP 00 30 10 12; both examples recomputed blind (37 weeks; 256 days; 1,705,714; recovery triangle 144,000, covered 112,959, uncovered 31,041; 120 days covers the 112-day recovery)
- sources_checked: ISO CP 00 30 10 12 Business Income (And Extra Expense) Coverage Form, F.3 'period of restoration' (p.9); A.5.c Extended Business Income 60 days; G.4 Extended Period of Indemnity, sha256:4b77049e08827380f912161468b9aef9b182853f5a217f50993546366d101b98 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=CP+00+30&ed=10-12
- note: F-001 (critical) fixed in place from the form. F-002 (major, open) — the first example's reasoning about code weeks needs reworking. Endorsement claims (waiting-period buy-back; dependent property PoR) were not checked against the endorsements. In review until F-002 is resolved.
