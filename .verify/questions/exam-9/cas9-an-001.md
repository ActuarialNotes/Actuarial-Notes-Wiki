---
target: questions/exam-9/cas9-an-001.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:02Z/g6e9
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: blind recomputation in Python of the key and every distractor's stated reasoning; one keyed option; distinct options; explanation line by line; factual claims against source; topic/learning_objective/wiki_link against Exam 9 (CAS).md objectives (all link targets exist, + for spaces); format per question-writer formats.md; validate_content.py
- sources_checked: Clark, Basics of Reinsurance Pricing (CAS Study Note, rev. 2014), §2A(b) Exposure Rating pp.17-19 (exposure-factor table p.18: 20%→49%, 60%→76%, 80%→85%, 100%→93%) and Introduction p.2 (facultative pricing 'variations on the same themes'), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf; CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), Domains A-D tasks pp.3-6 and text references pp.7-8, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Key A ($3,456) reproduced: 0.60x16,000 = 9,600; (G(0.8)-G(0.2)) = 0.36; each distractor (4,896 / 5,760 / 7,296 / 8,160) reproduces its stated error. The exposure-curve values are exactly Clark's illustrative table (p.18); G(100%)=0.93<1 is consistent with Clark's note that the curve allows exposure above insured value. Clark p.2 says facultative pricing is a variation on treaty pricing, and Exam 9 task A2 names facultative explicitly.
