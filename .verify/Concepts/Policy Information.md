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

## [F-002] 'With no coinsurance, the two orders agree' is false when there is a deductible
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-06T18:01Z/da69
- date: 2026-11-06
- severity: major
- status: open
- locus: ## Does the limit cap the payment or the loss?, last sentence of the paragraph after the formula
- claim: With no coinsurance, the two orders agree.
- evidence: The page's own two formulas with alpha = 1: capping the payment gives min((X - d)+, u), with maximum u; capping the covered loss gives (min(X, u) - d)+, with maximum u - d. With the page's d = 500, u = 10,000 and the loss of 15,000: 10,000 versus 9,500. P-21-05 PDF p.9 shows the covered-loss form (80% of the lesser of 5000 and the cost) and PDF p.9 the separate maximum on a claim payment; nothing in it says the two coincide. Recomputation (rank 5) falsifies the sentence; the two orders agree only when d = 0 and alpha = 1.
- source_rank: 5
- proposed_action: Delete the sentence.
- applied: true
- fingerprint: 25c0f43b045c

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-11-06T18:01Z/da69
- date: 2026-11-06
- resolves: F-002
- status: resolved
- note: Sentence deleted in this pass; the paragraph now ends 'because the provisions apply in a different order.', which the recomputation (10,000 vs 7,600) supports. The trap 'different payments whenever alpha < 1' is true as stated and was left.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-06T18:01Z/da69
- date: 2026-11-06
- status_set: verified
- confidence: high
- checks_run: Full re-check of the rewritten page. Recomputed before re-reading (d=500, 80%, cap 10,000): 400/3000/10000/15000 -> 0/2000/7600/10000 (11,600 capped); limit at 13,000 = d + u/alpha; covered-loss cap: 0.8 x 9500 = 7600; Try-it: 250 + 4500/0.9 = 5250; layers 1000 + 300/0.5 -> 1800; uniform(0,5000): integral 500 + 2000 x 0.4 = 1300, per payment 1300/0.9 = 1444.44. Provisions and order traced to P-21-05 pp.7-9, layered coinsurance to SOA sample Q88 (same structure, scaled), Exam P objective e) to the syllabus. Fixed: deleted 'With no coinsurance, the two orders agree' (false whenever d > 0). Figure embed and wiki-links resolve.
- sources_checked: SOA Probability Exam syllabus, November 2026, Topic 2 learning outcomes c) (expected values incl. mode, median, percentiles) and e) (amount an insurance company pays to a policyholder given deductibles, coinsurance percentages, benefit limits, inflation), PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), PDF p.7 (percentage reimbursed; deductible), p.8 (benefit limit; deductible lowers expected claim payments and SD), p.9 (health policy paying costs up to 5000 at 80%: reimburses 80% of the lesser of 5000 and the cost; maximum on a claim payment), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf; SOA Exam P Sample Questions (2026-05 file), Q88 (PDF p.40: deductible of 20, 100% of costs between 20 and 120, 50% above 120), sha256:24980e6de9cc0a68f13ac33b0ab4b18ad8ebb54d42d1afe08eed8bebb212cf06 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-questions.pdf
- note: Every number recomputed and every rule traced; one false sentence deleted.
