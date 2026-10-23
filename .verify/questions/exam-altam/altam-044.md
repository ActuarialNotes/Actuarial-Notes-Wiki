---
target: questions/exam-altam/altam-044.md
created: 2026-10-23
---

## [F-001] SOA slips in (b) and (d) not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, part b; part d comment
- claim: Part (b) multiplies 1,556,111 where part (a) gives the age-60 group's liability as 1,556,115; the part (d) comment reads 'conrribution rates'. Both transcribed faithfully but unmarked.
- evidence: SOA ALTAM solutions PDF p.89: (a) '414,380 + 1,556,115 + 369,599 = 2,340,094'; (b) '1,556,111 x (1.025 x 26/25 - 1) = 102,704'; comment 'PUC and TUC conrribution rates'. Recomputed: the age-60 group's AL is 1,556,111.4 unrounded (5 x 25 x 62,000 x 0.02 x 5E60 x 13.0915), so (b)'s figure is the more precise and (a)'s 1,556,115 follows the rounded 311,223 x 5; the NC 102,704 is unaffected. Content-plan A.7 lists both.
- source_rank: 1
- proposed_action: Add ' (as printed)' at each; do not correct.
- applied: true
- fingerprint: 77d74116d19b

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run: (as printed) after 1,556,111 in (b) and after 'conrribution'.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q44, pp.80-81 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q44, pp.89 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Blind recompute (SULT, 2-term Woolhouse): AL = 414,380 + 1,556,111 + 369,599 = 2,340,091 (SOA 2,340,094 through rounded per-member figures); TUC NC 63,452 + 102,703 = 166,155, 13.397% of the 2020 payroll 1,240,250 (SOA 13.397%); (c) 32.32% (SOA) - agree. (d) prose matches. Stem and membership table match pp.80-81; explanation and comment match p.89. Two SOA slips marked (as printed) (F-001).
