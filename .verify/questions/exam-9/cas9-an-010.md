---
target: questions/exam-9/cas9-an-010.md
created: 2026-10-18
---

## [F-001] Unsourced, ambiguous claim about which risk earns the least diversification credit
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T14:02Z/g6e9
- date: 2026-10-18
- severity: minor
- status: open
- locus: explanation, paragraph after the calculation
- claim: The default risk earns the least credit because it is the most correlated with the largest risk, non-life underwriting.
- evidence: No source states this; Annex IV (legislation.gov.uk, Annex IV §1) gives only the matrix and the formula. Recomputation (rank 5, which can falsify) shows the claim depends on an unstated measure: Euler allocation C_i x sum_j Corr_ij C_j / C gives market 40.75 (credit 19.25, 32%), non-life 68.30 (credit 11.70, 15%), default 19.79 (credit 10.21, 34%); incremental with-minus-without gives market 30.35 (credit 29.65, 49%), non-life 55.36 (credit 24.64, 31%), default 17.48 (credit 12.52, 42%). Default has the least credit in dollars under both, but the largest or second-largest credit as a share of its standalone capital, where non-life has the least. The dollar result is driven largely by default being the smallest risk, so the stated cause ('most correlated with the largest risk') is not established, and a reader thinking in proportional terms is told the opposite of what the numbers show.
- source_rank: 3
- proposed_action: Delete the sentence.
- applied: true
- fingerprint: 586af665cdc7

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T14:02Z/g6e9
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Sentence deleted in this run (checker's clean-up limit: deleting a claim the sources do not support); the rest of the explanation is unchanged and re-checked.

## [F-002] Regulatory framing is outside the Exam 9 readings; D5 reading not read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T14:02Z/g6e9
- date: 2026-10-18
- severity: minor
- status: open
- locus: stem; frontmatter learning_objective
- claim: The question places Solvency II standard-formula aggregation under Exam 9 task D5.
- evidence: CAS Exam 9 Content Outline Fall 2026 p.6 assigns D5 ('Select models to manage diverse risks and evaluate correlations of risks') to Brehm et al. (Guy Carpenter, 2007), a study-kit book that predates the 2009 Directive and could not be read this session. Solvency II is not an Exam 9 reading. The stem supplies both the matrix and the aggregation formula, so no Solvency II knowledge is tested — only correlation-based aggregation, which fits D5's wording — but whether Brehm teaches square-root (variance-covariance) aggregation of risk capital is unconfirmed.
- source_rank: 1
- proposed_action: When the Exam 9 study kit is available, confirm Brehm et al. Ch.2-4 covers correlation-matrix aggregation of capital; if not, retarget or retire the question.
- applied: false
- fingerprint: 911419035df9

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:02Z/g6e9
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: blind recomputation in Python of the key and every distractor's stated reasoning; one keyed option; distinct options; explanation line by line; factual claims against source; topic/learning_objective/wiki_link against Exam 9 (CAS).md objectives (all link targets exist, + for spaces); format per question-writer formats.md; validate_content.py
- sources_checked: Directive 2009/138/EC (Solvency II), Annex IV §1 Basic SCR formula and correlation matrix (Market-Default 0.25, Market-Non-life 0.25, Default-Non-life 0.5), as published by legislation.gov.uk (original as adopted), sha256:4ebfc6d5b0e76219fd253e976fc953a7e86c88ddb09e4ae9bcce0f2a88cb1d4b — https://www.legislation.gov.uk/eudr/2009/138/annex/IV; CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), Domains A-D tasks pp.3-6 and text references pp.7-8, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Key D (128.84) reproduced: sqrt(10,900 + 2(1,200 + 450 + 1,200)) = sqrt(16,600). Distractors reproduce: A sqrt(10,900); B sqrt(10,900 + 2,850); C default/non-life at 0.25 gives sqrt(15,400) = 124.10; E 170. Matrix entries and the 'all combinations of i and j' summation match Annex IV §1 exactly. Minor F-001 (unsupported claim) fixed by deletion and resolved; minor F-002 (D5 reading Brehm unread) open.
