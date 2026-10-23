---
target: questions/exam-altam/altam-042.md
created: 2026-10-23
---

## [F-001] Printed question total (8 points) is not the sum of the parts (5)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: minor
- status: open
- locus: frontmatter, points
- claim: The vault gives points: 5, the sum of the parts (a) 2 + (b) 3; the SOA prints the question as '(8 points)'.
- evidence: SOA ALTAM questions PDF p.77 heads Q42 '(8 points)' and prints only two parts, (a) (2 points) and (b) (3 points). A conflict inside the source (content-plan A.7: 'printed total 8, only (a) 2 and (b) 3 printed'). The vault's body prints no question total, so there is no printed figure to carry an (as printed) marker; points: 5 follows the parts, which is what the app scores.
- source_rank: 1
- proposed_action: None: keep points: 5 (the parts' sum); the SOA's 8 is recorded here.
- applied: false
- fingerprint: c45ac232dfde

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: wontfix
- note: Kept: the frontmatter follows the parts the SOA prints; the printed total of 8 is the publisher's slip and is recorded in this log rather than in the body, which carries no total.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q42, pp.77 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q42, pp.86 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf; SOA ALTAM April 2026 exam workbook (tables), sheet 'Service Table' (Standard Service Table), sha256:2d8c59a01df2a61781bafcf3c64f9f85304dca80e284e5da1f73d9f223440074 — https://www.soa.org/globalassets/assets/files/edu/2026/altam/april-2026-altam-excel.xlsx
- note: Blind recompute with the SOA's own Standard Service Table (April 2026 ALTAM workbook) and the given monthly annuity values: AL = 50,000 x (1.25155 + 1.04960 + 9.60150) = 595,133 (SOA 595,132.40 with l, r rounded to 0.1); NC = 3200 x (0.5 x 1.25155 + 10.65110) = 36,086 (SOA 36,085.99) - agree. Stem matches p.77; explanation and both graders' comments match p.86. Printed total 8 vs parts 5 (F-001, wontfix).
