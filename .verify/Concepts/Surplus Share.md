---
target: Concepts/Surplus Share.md
created: 2026-10-18
---

## [F-001] Unsourced claims on what a surplus share achieves and on selection
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullets 'What it achieves' and 'Watch for selection'
- claim: The net book becomes more uniform in amount at risk, so the cedant can write large risks without a matching increase in net exposure. ... If the cedant can vary its line by class, the reinsurer's share tilts toward whatever classes the cedant keeps least of.
- evidence: Clark pp.3-4, 21 (sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63) defines the surplus share, the retained line, number of lines, the 'not excess insurance' point, the 'as if' restatement and the inuring treatment; it does not discuss the treaty's purpose (homogenising the net book) or anti-selection by varying the line by class. The cession formula and the falling-back-above-capacity point follow from Clark's table (10,000,000 risk: 400,000 ceded, 4%).
- source_rank: 2
- proposed_action: Cite a source for the purpose and selection points or cut them back to Clark.
- applied: false
- fingerprint: e3a0eab17684

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: s(V) formula against Clark's p.3 table (60%, 80%, 40%, 4%); 'not excess insurance' p.3; 'as if' restatement p.4; inuring curve-before/factor-after rule p.21; both examples recomputed
- sources_checked: Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), pp.3-4 (surplus share definition and table), p.4 step 1 ('as if'), pp.21-22 (inuring surplus share and exposure rating), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf; CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (task A1-A3, readings Clark and Bernegger), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Formulas and Clark attributions match. Example 1: 0%, 50%, 75%, 62.5%, 25%; $225K ceded; $1,500K net on the $5M risk all resolve. Example 2: gross 58.5%, treaty 63.3%, net 56.6% resolve. Unsourced purpose/selection bullets left open (F-001). Exam 9 only.
