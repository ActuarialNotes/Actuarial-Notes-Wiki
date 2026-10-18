---
target: Concepts/Sliding Scale Commissions.md
created: 2026-10-18
---

## [F-001] Sliding scale called the most common adjustable feature
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- severity: minor
- status: open
- locus: lead, last sentence
- claim: It is the most common adjustable feature of a Quota Share.
- evidence: Clark p.9 (sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63): 'A common adjustable feature is the "sliding scale" commission.' Clark does not rank it as the most common.
- source_rank: 2
- proposed_action: Use Clark's wording: 'a common adjustable feature'.
- applied: true
- fingerprint: ef1a9d933fcd

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Corrected in this pass to Clark's wording, 'a common adjustable feature'.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: commission formula against Clark's 25%@65% / 35%@55% / 45%@35% terms and p.10 table; Clark's 90% vs 96% illustration p.11; carryforward shift and multi-year block (variance / number of years) pp.11-12; 'no standard method' p.12; both examples recomputed (22/26/32.5/36%; E[c] 28.45% vs 26.3%, decomposition +4.25 - 2.10)
- sources_checked: Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), pp.9-12 (sliding scale terms and table, balanced plan, 31.0% expected commission and 96% technical ratio, historical check, carryforward approaches), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf; CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (task A1-A3, readings Clark and Bernegger), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Formula and every Clark attribution match; examples resolve. One overstatement corrected in this pass (F-001). Exam 9 only.
