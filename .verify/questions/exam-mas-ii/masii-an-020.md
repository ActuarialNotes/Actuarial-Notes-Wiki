---
target: questions/exam-mas-ii/masii-an-020.md
created: 2026-10-18
---

## [F-001] Distractor B's rule ('a flat line near 1.00 is the losing model') is not the source's criterion
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T14:03Z/g6m2
- date: 2026-10-18
- severity: minor
- status: open
- locus: Why not the others, B
- claim: 'a flat line near 1.00 in a double lift chart is the signature of the *losing* model: the risks it fails to separate are the ones the other model has identified.'
- evidence: Goldburd §7.2.2 (printed pp.78-79, PDF 88-89, sha256:89b203ea…): 'In a double lift chart, the winning model is the one that more closely matches the actual pure premium in each quantile.' Flatness is not a criterion; if the actuals were also flat the flat model would win. The same section's alternate percent-error representation says 'the winning model is the one with the flatter line centered at y = 0', so a 'flat line loses' rule invites confusion.
- source_rank: 2
- proposed_action: Restate B's line to Goldburd's criterion, using the stem's figures.
- applied: true
- fingerprint: d0323c669ae7

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T14:03Z/g6m2
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: B's line restated to Goldburd §7.2.2's criterion: the winner is the model closer to the actual pure premium in each quantile, not the one near 1.00; the current plan is further from the actuals in both deciles (0.98 vs 0.72; 0.96 vs 1.35), figures from the stem.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:03Z/g6m2
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: blind recomputation in Python before reading the key; every distractor's stated reasoning reproduced; explanation worked line by line; wiki_link targets exist (spaces as +) and sit on Exam MAS-II (CAS).md; topic/learning_objective match the exam page domain; format per question-writer formats.md; validate_content.py clean
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2020), §7.2.2 Double Lift Charts, printed pp.78-79 (PDF 88-89): sort ratio Model A / Model B; first quantile 'those risks which Model A thinks are best relative to Model B'; winner matches actual pure premium in each quantile, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: Decile 1: actual 0.72 vs proposed 0.75 vs current 0.98; decile 10: 1.35 vs 1.12 vs 0.96. Key A is Goldburd's own reading of Figure 23; C is the simple-quantile-plot description. Re-checked after the F-001 restatement.
