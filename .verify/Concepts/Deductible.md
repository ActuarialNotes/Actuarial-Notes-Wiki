---
target: Concepts/Deductible.md
created: 2026-09-28
---

## [F-001] Franchise deductible and the 'two types' claim not supported by the Exam P sources
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: definition bullets, lines 16-18
- claim: There are two types of deductibles: An ordinary deductible eliminates small claims entirely; A franchise deductible pays the full loss X once it exceeds d
- evidence: P-21-05 §VI (PDF p.7) describes one deductible form: losses reimbursed only in excess of a threshold (500 deductible, loss 2000, insurer pays 1500). The word franchise occurs zero times in P-21-05, in the Aug 2026 SOA Exam P sample questions (1-737) or in their solutions (full-text search of the per-question split). The franchise definition is the Loss Models one (a MAS-I reading, not available this session), so the bullet and the statement that there are exactly two types are unsourced here. Separately, eliminating small claims is common to both forms, so it does not characterise the ordinary deductible; the formula Y = (X - d)+ does.
- source_rank: 1
- proposed_action: Cite Loss Models for the franchise deductible (or drop the exactly-two-types framing) and describe the ordinary deductible by what it pays, (X - d)+.
- applied: false
- fingerprint: 3b4ab6794fe7

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition vs P-21-05 p.7. Y = (X - d)+ = max(X - d, 0) vs P-21-05 p.7 (loss 2000, deductible 500, pays 1500; below 500 pays nothing). Purpose bullet vs P-21-05 p.7 reasons (2) premium savings and (3) incentive to prevent losses. Example 1 recomputed first: E[(X-200)+] = 1000 - 1000(1 - e^-0.2) = 818.73 (C tables E[X^x], theta = mean) - agrees. Example 2 recomputed: 300 -> 0, 2000 -> 1500 - agrees and matches P-21-05 own example. The escaped-dollar-then-inline-math shape is an Obsidian shape that renders, not a defect. Links and embed resolve. CAS pages (MAS-I, DISC-IA) link it in the same sense - no CAS/SOA difference.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §VI Deductibles PDF p.7; SOA, Tables for Exam C (Fall 2009), exponential entry E[X^x] = theta(1 - e^(-x/theta)), PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; SOA Probability Exam syllabus, November 2026, objective "Calculate the amount that an insurance company pays to a policyholder for a claim given policy information, including deductibles, coinsurance percentages, and benefit limits, as well as other factors, such as inflation", PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Formula and examples verified; one open minor on the unsourced franchise-deductible bullet.
