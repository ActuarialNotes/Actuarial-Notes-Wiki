---
target: questions/exam-altam/altam-2023f-q6.md
created: 2026-10-23
---

## [F-001] SOA printed comma decimals kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b, explanation, FAS lines and AL_A(t+1) sum
- claim: Four FAS lines write the 10% raise as "1{,}1" and one line reads 8337{,}28 + 1787{,}07 with no marker.
- evidence: SOA ALTAM Fall 2023 solutions pp.14-15 print "60,000 x 1,1" (twice), "100,000 x 1,1", "100,000 x 1,1 x 0.5" and "8337,28 + 1787,07" (comma decimals). The figures are right: 63,000, 105,000, 102,500, 26,520.14 recomputed; NC_A 3,219.71 and NC_B 65,422.07 recomputed with the Standard Service Table from the SOA's own Fall 2023 exam workbook. Kept as printed; "(as printed)" added to each of the five lines.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: f893a47b6a46

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked "(as printed)" in place in this run; the text matches the SOA page.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: independent recomputation of every computed part from the blind stem before reading the vault's explanation or the SOA solution (SULT built from its Makeham parameters; other tables as cited); stem, table, diagram and formula diff against the 100-dpi page images of the SOA question paper; explanation diff against the solution page images (method, figures, arithmetic, align rows); examiners' comments verbatim and filed under the part they name; every part's setup under the part the SOA prints it before; Media/Attachments diagrams exist and match the page; points per part and total; type multi-part; topic and wiki_link pages exist; validate_content.py --strict and question_lint.py pass
- sources_checked: SOA Exam ALTAM Fall 2023 — exam (question paper), Q6, pp.11-12, sha256:c162b6a75c9ccaedf38fcc9f7f4debf83abcf768f1e6ee6ff0d84e89e3098bc7 — https://www.soa.org/globalassets/assets/files/edu/2023/fall/exams/fall-2023-altam-exam.pdf; SOA Exam ALTAM Fall 2023 — model solutions and examiners' comments, Q6, pp.13-16, sha256:df2ab0d9bc15ea197487448a071c8d909aa27d14841c082505cbb63358a6b93b — https://www.soa.org/globalassets/assets/files/edu/2023/fall/solutions/altam-fall-2023-solutions.pdf; SOA Exam ALTAM Fall 2023 — exam Excel workbook (tables), sheet 'Service Table', sha256:a6d6a2aeb020d4cdf6bb016971ae98037e97110ca2e16c11467b2b4bbbccda0a — https://www.soa.org/globalassets/assets/files/edu/2023/fall/exams/fall-2023-altam-exam.xlsx
- note: Stem and table match exam pp.11-12; explanation and comments match solutions pp.13-16. Recompute with the Standard Service Table read from the SOA's Fall 2023 exam workbook (https://www.soa.org/globalassets/assets/files/edu/2023/fall/exams/fall-2023-altam-exam.xlsx, sha256 a6d6a2aeb020d4cdf6bb016971ae98037e97110ca2e16c11467b2b4bbbccda0a, sheet 'Service Table'): AL_A 20,772.35, AL_B 809,859.22, NC_A 3,219.71, NC_B 65,422.07, 39.00%. 1 minor finding(s) for SOA printed slips, marked (as printed) and resolved in this run.
