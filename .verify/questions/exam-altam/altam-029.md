---
target: questions/exam-altam/altam-029.md
created: 2026-10-23
---

## [F-001] State diagram has no 0->2 arrow (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: minor
- status: open
- locus: stem, state diagram
- claim: The diagram shows transitions 0->1, 0->3 and 1->2 only, while assumption (i) gives p^{02}_{x+k} = 0.008 + 0.003k and the solution charges EB^{02} = 14,000 in year 3.
- evidence: SOA ALTAM sample Q29, questions PDF p.53: the printed diagram has exactly three arrows (0->1, 0->3, 1->2); (i) gives p^02; solutions PDF p.57 uses p^02_{x+2} = 0.014 for the 1,000,000 death benefit. The cropped Media/Attachments/altam-029-state-diagram.png matches the page. A publisher inconsistency inside one source (content-plan A.7, 'found by the checkers'), not a transcription error.
- source_rank: 1
- proposed_action: None: keep the SOA's figure as printed; a figure cannot carry an inline marker.
- applied: false
- fingerprint: 516029524137

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: wontfix
- note: Kept as printed (P1): the figure is the SOA's own; recorded so a reader of the log knows the arrow is missing in the source.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q29, pp.53-54 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q29, pp.57-58 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Blind recompute (done after a structural read of the file, then redone line by line): Pr3(0) 4878, Pr3(1) 14,194, Pi3 4914.91, NPV(3) 5414.96 - all agree with the SOA. Stem, table, transition probabilities and diagram crop match pp.53-54; explanation and graders' comments verbatim. SOA's doubled parenthesis '(0.01)((0.75)' in (c) typeset clean (punctuation only, left unmarked). Diagram has no 0->2 arrow (as printed; F-001, wontfix).
