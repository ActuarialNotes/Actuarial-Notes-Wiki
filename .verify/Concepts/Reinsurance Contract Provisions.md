---
target: Concepts/Reinsurance Contract Provisions.md
created: 2026-10-18
---

## [F-001] Purpose of adjustable features attributed to Clark beyond what Clark says
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Why they exist'
- claim: An adjustable feature lets each side be paid if its own view proves right (Clark).
- evidence: Clark p.9 (sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63): 'There will often remain disagreement between the ceding company and reinsurer about the loss ratio and the appropriate ceding commission ... In the negotiations to resolve these differences, adjustable features are often built into the treaty.' Clark does not characterise the mechanism as paying each side if its own view proves right. The first sentence of the bullet is accurately sourced; the second is the page's interpretation carrying Clark's name. Also unsourced: the reinstatement-premium direction ('lowers the up-front premium needed').
- source_rank: 2
- proposed_action: Reword the second sentence so it is not attributed to Clark, or cut it back to 'adjustable features are often built into the treaty to resolve the difference'.
- applied: false
- fingerprint: 8582eec039f5

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: list of provisions and each direction-of-effect against Clark; range-table method and the historical-check caveats p.10, p.38; carryforward approaches pp.11-12; clash definition pp.22-23; example recomputed for all three provisions
- sources_checked: Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), p.9 (adjustable features, loss occurrence limit), pp.9-14 (sliding scale, carryforward, profit commission, loss corridor tables), pp.22-23 (clash), pp.33-35 (AAD, swing plan as retrospective rating), pp.38 (range-table method), pp.46-47 (finite risk, risk transfer), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf; CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (task A1-A3, readings Clark and Bernegger), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Example: E[LR] 73.5%; corridor 2.0 points (71.5%); profit commission 1.125 points; sliding scale 28.5% vs 26.5% plug-in; technical ratios 98.5/96.5/99.6/102.0 all resolve. One minor misattribution left open (F-001). Exam 9 only.
