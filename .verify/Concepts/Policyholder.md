---
target: Concepts/Policyholder.md
created: 2026-09-28
---

## [F-001] Unsourced claims about mutual ownership, creditor rank and the purpose of solvency regulation
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: last bullet, line 24
- claim: In a mutual insurer the policyholders are also the owners. In any insurer they are the largest creditors, and protecting them is the purpose of solvency regulation.
- evidence: P-21-05 (the insurance reading the Exam P syllabus names) defines the policyholder and insurer roles (PDF pp.2-3) and contains no occurrence of mutual, creditor or solvency (full-text search of the note). No other source read this run states these three claims, and they are outside the Exam P objective (syllabus PDF p.3). The Exam P content of the page is supported: Y = min(c(X-d)+, u) with u a maximum claim payment (P-21-05 PDF pp.8-9), a fixed deductible leverages inflation and a fixed maximum damps it (PDF pp.10-11).
- source_rank: 1
- proposed_action: Cite a source for the ownership / creditor / solvency-regulation sentence (an Exam 6C/6U or Exam 9 reading) or drop it from the Exam P page.
- applied: false
- fingerprint: 7a3a859f38da

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Formula Y = min(c(X-d)+, u) with u the maximum payment vs P-21-05 pp.8-9 (12,500 maximum on a claim payment). Retained share and deductible purpose (small-claim expense, incentive to prevent losses) vs P-21-05 p.7. Inflation bullet vs P-21-05 p.10 (fixed deductible: payments +54% vs losses +46%) and p.11 (fixed maximum: payments +34%). Example 1 recomputed first: 0.8 x 5500 = 4400, 0.8 x 6100 = 4880 (+10.9%), retained 1600 -> 1720 (+7.5%); 0.8 x 11500 = 9200 and 0.8 x 12700 = 10160 both capped at 8000, retained 4000 -> 5200 (+30%) - agrees. Example 2 recomputed: E[(X-250)+] = 1000 - 1000(1 - e^-0.25) = 778.80 (C tables E[X^x]); retained 221.20 = E[X^250]; F(250) = 0.2212 - agrees. All wiki-links resolve.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §II PDF pp.2-3 (policyholder, beneficiary); §VI deductibles PDF p.7, benefit limits and maximum claim payment PDF pp.8-9; §VII inflation PDF pp.10-11; SOA, Tables for Exam C (Fall 2009), exponential entry E[X^x] = theta(1 - e^(-x/theta)), PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; SOA Probability Exam syllabus, November 2026, objective "Calculate the amount that an insurance company pays to a policyholder for a claim given policy information, including deductibles, coinsurance percentages, and benefit limits, as well as other factors, such as inflation", PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Verified against P-21-05 and the SOA tables for its Exam P content; one open minor for an unsourced sentence outside the Exam P scope.
