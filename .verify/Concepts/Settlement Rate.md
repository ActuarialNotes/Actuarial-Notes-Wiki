---
target: Concepts/Settlement Rate.md
created: 2026-10-31
---

## [F-001] Drivers attributed to Ch. 4 alone
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'Drivers to ask about'
- claim: Drivers to ask about (Friedland Ch. 4): staffing ..., changes in settlement authority, a 'close the old inventory' initiative, ...
- evidence: Caseload, independent vs company adjusters, vigorous defence of suits, staffing disruption and the legal/economic environment are Ch. 4 (pp. 44-47). Delegating a higher settlement limit to a TPA and clearing the backlog before a system change are Ch. 6 (p. 75 list and footnote 29).
- source_rank: 2
- proposed_action: Cite Chs. 4 and 6.
- applied: true
- fingerprint: 14cf514b85bf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Citation changed to '(Friedland Chs. 4 and 6)'.

## [F-002] Worked restatement interpolates linearly; Friedland's B-S paid adjustment fits exponentials
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- severity: minor
- status: open
- locus: example 'Restating a Paid Triangle'
- claim: Adjusted paid is interpolated linearly between the 24- and 36-month points ('paid losses move linearly with the disposal rate').
- evidence: Friedland Ch. 13 pp. 292-293: Berquist and Sherman fit Y = a*e^(bX) between each pair of successive (closed counts, paid) points and interpolate/extrapolate on that curve (e.g. AY1970 age 48: 215*e^(0.000468*8,231) = 10,156). The page's arithmetic is right for a linear interpolation (88,889 per point; 4,977,8xx), and it flags the linear assumption, but it does not say this differs from the textbook's method.
- source_rank: 2
- proposed_action: Add a note that Friedland/B-S use two-point exponential fits, or rework the example on an exponential curve; author's call.
- applied: false
- fingerprint: 92f3e1834bda

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: disposal rate = closed / ultimate counts vs Ch. 11 p. 206 and Ch. 13 p. 291 (definition differs among authors); closed-to-reported as diagnostic vs Ch. 6 p. 75; direction of bias vs Ch. 13 p. 291 (slowdown -> paid development understates); drivers vs Chs. 4 and 6; CNP treatment vs Ch. 6 p. 76; B-S remedy vs Ch. 13; both examples recomputed
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 4 pp. 44-47; Ch. 6 pp. 75-76; Ch. 7 p. 96; Ch. 11 p. 206 (disposal rate definition); Ch. 13 pp. 291-293 (B-S paid adjustment), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Citation fixed (F-001). One minor open: the worked restatement is linear where Friedland's is exponential (F-002).
