---
target: questions/exam-altam/altam-037.md
created: 2026-10-23
---

## [F-001] SOA typo 'January1' not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: nit
- status: open
- locus: Part b prompt, second given
- claim: The prompt reads 'started the employment on January1, 1990' with no marker.
- evidence: SOA ALTAM questions PDF p.70 prints 'January1, 1990' (missing space). Content-plan A.7 lists it. Meaning unaffected.
- source_rank: 1
- proposed_action: Add ' (as printed)'.
- applied: true
- fingerprint: 67312f62bcea

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run: '(as printed)' added after 'January1'.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q37, pp.70 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q37, pp.76 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Blind recompute: S2014 = 50,000(1.03)^24 = 101,639.71; death-benefit APV 47,716.24 (SOA 47,716); FAS 104,719.39, retirement APV 269,833.05 (SOA 269,833) - agree. (a) is a list matching the SOA's. Stem matches p.70 (the setup text is filed under Part b); explanation matches p.76. The SOA prints one graders' comment after (c) covering (b) and (c); the vault files it under (b) - same words, no loss. 'January1' marked (as printed) (F-001).
