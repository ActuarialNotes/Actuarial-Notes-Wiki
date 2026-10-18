---
target: questions/exam-9/cas9-an-003.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:02Z/g6e9
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: blind recomputation in Python of the key and every distractor's stated reasoning; one keyed option; distinct options; explanation line by line; factual claims against source; topic/learning_objective/wiki_link against Exam 9 (CAS).md objectives (all link targets exist, + for spaces); format per question-writer formats.md; validate_content.py
- sources_checked: Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market, arXiv:2008.12427v1 (2020), Notation p.6 (premium = expected loss + margin; assets = premium + equity), §3.1 p.8 (M = P - S, Q = a - P), eq.(18) p.19 and §6.1 p.22 (return = margin/equity), p.26 (loss ratio, premium-to-surplus leverage), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1; CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), Domains A-D tasks pp.3-6 and text references pp.7-8, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Key B (73.04) reproduced from P = L + iota(a - P) => P = (60 + 0.15x160)/1.15; distractors A 60x1.15, C 60 + 0.15x100, D 60 + 0.15x160/1.15, E 60 + 0.15x160 all reproduce. Definitions (P = L + M, a = P + Q, return = M/Q) are the authors' own in arXiv:2008.12427 pp.6, 8, 19, 22 — a stand-in by the same authors for the assigned commercial book (Mildenhall & Major 2022, unread); the solved form is algebra on those definitions. Task B5 (outline p.4) names margin, return and leverage.
