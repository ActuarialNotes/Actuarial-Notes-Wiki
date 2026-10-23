---
target: questions/exam-altam/altam-051.md
created: 2026-10-23
---

## [F-001] SOA table headings P1, P2 in (c) not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: nit
- status: open
- locus: explanation, part c table header
- claim: The (c) table heads its premium columns P_1 and P_2, though they hold the year-2 and year-3 premiums (P_2, P_3 in the question). Unmarked.
- evidence: SOA ALTAM solutions PDF p.103, (c) table, heads the columns 'P1' and 'P2'; the rows are the year-2/year-3 premium pairs (1000/1000 ... 200/200) with probabilities 0.36, 0.24, 0.08, 0.32. Content-plan A.7 lists it. Figures unaffected.
- source_rank: 1
- proposed_action: Add ' (as printed)' to both headings.
- applied: true
- fingerprint: c980250bebdd

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run: (as printed) on both headings.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q51, pp.93-94 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q51, pp.103 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Blind recompute: (a) AV2 = 918.3 with COI discounted at the credited rate (SOA); (b) a = 1.01124, b = 0.954, c = -348.44 (SOA 1.0112, 0.954, -348.4); (c) E[DB3] = 100,865.8 (SOA 100,866), E[SV3] = 783.54 with the floor at 0 (SOA 783.5); (d) 3893.27 (SOA 3893.3) - agree. Stem and table match pp.93-94; explanation matches p.103. The SOA prints one graders' comment after (d) whose first sentence is about (c)(ii) and second about (d); the vault files each sentence under its part, verbatim. Headings marked (as printed) (F-001).
