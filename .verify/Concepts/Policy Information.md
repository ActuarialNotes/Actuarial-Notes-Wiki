---
target: Concepts/Policy Information.md
created: 2026-09-28
---

## [F-001] Literal LaTeX braces in prose: 10{,}000 renders with its braces
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: nit
- status: open
- locus: example prompt, line 24
- claim: the insurer's maximum payment is \$10{,}000.
- evidence: The figure sits in plain text, outside any math span, so the {,} group is not typeset and the rendered page shows the braces. quiz/src/lib/vaultMath.ts only moves math delimiters and never edits text outside math. The value itself (10,000) matches the answer callout u = 10,000, which is inside math and correct.
- source_rank: 5
- proposed_action: Write the thousands separator in prose as a plain comma.
- applied: true
- fingerprint: d86eaa299fbc

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Changed \$10{,}000 to \$10,000 in the prose of the example prompt; value unchanged.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: Definition and the three provisions (deductible, benefit limit, coinsurance) vs the Exam P objective wording (syllabus p.3) and P-21-05 §VI pp.7-9. Allocation of responsibility and effect on expected payments and risk vs P-21-05 pp.8-9 (expected payments 75,000 -> 65,000 -> 61,000, SD 24,418 -> 23,243 -> 20,911). Example recomputed first: insured pays first 500 -> d = 500; insurer pays 80% above 500 -> alpha = 0.80; insurer maximum payment 10,000 -> u = 10,000 (P-21-05 maximum-claim-payment convention, p.9) - agrees. Links and the Media/Figures embed resolve; nit fixed (F-001).
- sources_checked: SOA Probability Exam syllabus, November 2026, objective "Calculate the amount that an insurance company pays to a policyholder for a claim given policy information, including deductibles, coinsurance percentages, and benefit limits, as well as other factors, such as inflation", PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §VI Limits on policy benefits: percentage reimbursed PDF p.7, deductible PDF p.7, benefit limit PDF p.8, maximum on a claim payment PDF p.9
- note: Verified against the Exam P syllabus objective and P-21-05.
