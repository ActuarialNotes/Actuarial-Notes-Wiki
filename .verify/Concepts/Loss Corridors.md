---
target: Concepts/Loss Corridors.md
created: 2026-10-18
---

## [F-001] Unsourced claims on prevalence, commission equivalence and risk transfer
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- severity: minor
- status: open
- locus: lead's last sentence; bullets 'A substitute for commission' and the closing risk-transfer bullet
- claim: Corridors are most common on proportional treaties. ... A corridor worth k points of expected loss is worth roughly k points of ceding commission ... Loss ratio corridors are among the features that can defeat Risk Transfer.
- evidence: Clark pp.13-14 (sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63) presents the loss corridor among the special features of proportional treaties and gives the 75%-of-80%-to-90% example and its aggregate-distribution evaluation; it does not say where corridors are most common, does not equate a corridor to commission points, and does not tie corridors to risk transfer (pp.46-47 discuss risk transfer for finite risk covers generally). Clark p.45 does support the inuring-corridor sentence.
- source_rank: 2
- proposed_action: Cut these three claims back to Clark or cite a source for them.
- applied: false
- fingerprint: 03e664a78b49

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: net-LR formula reproduces Clark's 100% -> 92.5% example; 'lowers expected LR even below the attachment' p.14; below/within/above evaluation p.13; both examples recomputed (70/80/100%; E[LR] 74.5% -> 71.75%, $275,000)
- sources_checked: Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), pp.13-14 (loss corridor definition, 75% of 80%-90% example, aggregate-distribution table), p.45 (corridor on inuring surplus share affects cat exposure), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf; CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (task A1-A3, readings Clark and Bernegger), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Formula and Clark attributions match; examples resolve. Three unsourced claims left open (F-001). Exam 9 only.
