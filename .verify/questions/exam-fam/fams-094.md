---
target: questions/exam-fam/fams-094.md
created: 2026-10-23
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:31Z/f642
- date: 2026-10-23
- status_set: verified
- confidence: medium
- checks_run: blind recompute before the key; stem, every formula, table cell and option diffed against the rendered booklet page; explanation diffed line by line against the rendered SOA solution page; answer = SOA key; wiki_link targets and topic page exist; validate_content.py clean
- sources_checked: SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q94, p.76, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf; SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q94, p.37, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf
- note: Stem, formulas, tables and options match booklet p.76; explanation matches the SOA solution p.37 in method and figures, arithmetic resolves; answer equals the SOA key. Recompute: R_BF=(1-1/f)R_LR+R_CL/f gives AY1 CDF 1.25 and AY2 CDF 1.875. My blind pass first read f_2 as the cumulative factor (1.875, C); read as the age-to-age factor at duration 2, as the SOA's solution does, f_2=1.875/1.25=1.5 (B). The key rests on that reading of the notation. Medium: the key turns on reading f_2 as an age-to-age factor.
