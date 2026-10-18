---
target: questions/exam-6c/cas6c-an-005.md
created: 2026-10-18
---

## [F-001] Tests a code that is not an assigned 6C reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T14:08Z/g6c6
- date: 2026-10-18
- severity: minor
- status: open
- locus: whole question
- claim: The question tests IBC's Code of Consumer Rights and Responsibilities as Exam 6C Section A material.
- evidence: CAS Exam 6C Content Outline, Fall 2026 (sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1): Section A's description mentions 'industry codes', but the only IBC code among the readings is 'IBC Code of Conduct' = Code of Conduct for Insurers' Use of Credit Information; 'Consumer Rights' occurs nowhere in the outline. The vault's exam page links Code of Consumer Rights and Responsibilities from objective A1, which is the vault's own linking. The question's facts are correct against the Code itself.
- source_rank: 1
- proposed_action: Maintainer to decide whether the consumer code counts as 'industry codes' material; otherwise retarget the question to the assigned credit-information code (a writer's job) or mark it off_syllabus.
- applied: false
- fingerprint: f57d82a15073

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:08Z/g6c6
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: answered blind from stem + options (Python for arithmetic) and compared with the key; exactly one option correct; each distractor's stated reasoning reproduced; explanation checked line by line against the source; topic / learning_objective / wiki_link checked against Exam 6C (CAS).md (targets exist, on the syllabus section, '+' for spaces); format per question-writer formats.md; validate_content.py passes
- sources_checked: Insurance Bureau of Canada, Code of Consumer Rights and Responsibilities (web page), Right to timely and transparent claims handling; Right to complaint resolution; Responsibility to update your information, sha256:8b4058d1d856bdfb1c687f94b1eb3aa6dad483eb8c41ef11fc1a70084f4d5d9c — https://ibc.ca/insurance-basics/how-insurance-works/code-of-consumer-rights-and-responsibilities; CAS, Exam 6C Content Outline, Fall 2026 (v04 2026-05-26), Section A readings list (IBC Code of Conduct = credit-information code), checked for scope, sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1 — https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf
- note: Facts verified against the Code itself; scope finding F-001 (the Code is not an assigned reading) left open as minor.
