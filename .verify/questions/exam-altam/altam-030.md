---
target: questions/exam-altam/altam-030.md
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
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q30, pp.55-56 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q30, pp.59-60 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Blind recompute from the SULT (Makeham A=0.00022, B=2.7e-6, c=1.124): P = 10,259.5 (SOA 10,259.385 from tabled values; both 10,260 to the nearest 10), Pr1 1095.83, Pr12 2648.63, Pr30 2263.00, NPV1 17,516.1 with Pr0 = -7000-500 (SOA 17,516.25). SOA's printed arithmetic re-run: 10,259.385 / 1095.68 / 2648.64 / 2262.995 / 17,516.26. Stem and reserves match pp.55-56 (setup text for (b) filed under Part b); explanation and graders' comment match pp.59-60.
