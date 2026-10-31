---
target: Concepts/Reinsurance Recovery.md
created: 2026-10-31
---

## [F-001] Gross-and-ceded stated as the only approach
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullets, first bullet
- claim: Page says 'Estimate gross and ceded separately and derive net as the difference.'
- evidence: Friedland Ch. 3 p.34 (PDF 40) and Ch. 14 p.330 (PDF 336): some actuaries analyze gross and ceded and derive net; others analyze gross and net and derive ceded; the choice depends on data availability, programme characteristics and preference.
- source_rank: 2
- proposed_action: State both approaches.
- applied: true
- fingerprint: 43754331c1bf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Applied in this run: bullet now names both approaches as Friedland does.

## [F-002] Example percentage is of net ultimate, not net reserve
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- severity: minor
- status: open
- locus: example 'Gross, Ceded and Net Ultimates', after the shortcut
- claim: Page says the $315,000 difference is '9% of the net reserve'.
- evidence: Recomputed (rank 5): 315,000 / 3,405,000 = 9.25% of the net ULTIMATE. The net reserve implied by the example is 3,405,000 − (4,000,000 − 900,000) = 305,000, which the difference exceeds. The page's arithmetic otherwise reproduces (4,800,000; 1,395,000; 3,405,000; 3,720,000).
- source_rank: 5
- proposed_action: Change 'of the net reserve' to 'of the net ultimate'.
- applied: false
- fingerprint: a94b13f98b37

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: definition as receivable and collectibility vs Ch. 3 fn 16 and Ch. 14 fn 81; gross/ceded/net approaches vs Ch. 3 and Ch. 14; retention-change comparability vs Ch. 3 p.34; both examples recomputed
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 3 p.34 and fn 16 (PDF p.40); Ch. 14 pp.330-332 (PDF pp.336-338), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Approach bullet corrected to Friedland's either-approach wording. One rank-5 arithmetic-description finding left open (percentage base).
