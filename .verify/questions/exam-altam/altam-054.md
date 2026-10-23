---
target: questions/exam-altam/altam-054.md
created: 2026-10-23
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q54, pp.99-100 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q54, pp.106-107 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Blind recompute: (a) AV1 = 1290.0 with COI discounted at the credited 5% (the undiscounted reading gives 1260 and fails to reproduce the given AV2 = 1500; the discounted one gives AV2 = 1500.0 exactly) (SOA 1290.0); check Pr2 with AV reserves = 373.8 (given 374); (b) NPV(3) = -568.57 (SOA -568.6); (c)(i) revised Pr2 = -73.2 (SOA) - agree. (c)(ii)-(iii) prose matches. Stem and both tables match pp.99-100; explanation and comments match pp.106-107. No slips (the prompt's 'up, to time 3' comma is the SOA's, punctuation only, left unmarked).
