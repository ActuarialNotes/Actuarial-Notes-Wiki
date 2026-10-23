---
target: questions/exam-altam/altam-012.md
created: 2026-10-23
---

## [F-001] Graders' Comments for (a)-(b) filed under part a
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part a / Part b, Examiner Report
- claim: The comment 'Performance on parts (a) and (b) was mixed. ...' sat under Part a, and Part b had no Examiner Report.
- evidence: Solution PDF p.22 prints the (a) answers, then the (b) answers, and only then the one Graders' Comments block, which covers both parts. Moved verbatim to Part b, where the page places it; no words changed.
- source_rank: 1
- proposed_action: Move the Examiner Report block from Part a to Part b.
- applied: true
- fingerprint: fc4e5e367fbc

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Moved in this run; the block now follows Part b's explanation, as on p.22.

## [F-002] SOA notation slip in (c) not marked as printed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c, explanation, first EPV line
- claim: '20,000 a-bar_{x:2|}' (no 00 superscript) reproduced with no marker.
- evidence: Solution PDF p.22 prints '+20,000 a-bar_{x:2|}' without the 00 superscript the next line uses (a-bar^{00}_{x:2|} = 0.543444); content-plan A.7 'Q12(c) a without 00 superscript'. Vault faithful; now marked '(as printed)'.
- source_rank: 1
- proposed_action: Mark '(as printed)'.
- applied: true
- fingerprint: ac127e3ae268

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- resolves: F-002
- status: resolved
- note: Applied in this run; the file now matches the SOA's printed page.

## [F-003] SOA transposed digits in (d)(i) not marked as printed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part d, explanation (i)
- claim: 2V(0) = 90,000(a-bar^00_{x+2} + a-bar^02_{x+2}) = 698,670 with no marker.
- evidence: Solution PDF p.23 prints 698,670; 90,000(0.559 + 7.104) = 689,670 (recomputed), which the question p.24 asks to be shown as 689,700 and which (iii)'s 564,054 uses; content-plan A.7 'Q12(d)(i) 698,670 (689,670: transposed digits)'. Vault faithful; now marked '(as printed)'.
- source_rank: 1
- proposed_action: Mark '(as printed)'.
- applied: true
- fingerprint: 10a2f75f03c5

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- resolves: F-003
- status: resolved
- note: Applied in this run; the file now matches the SOA's printed page.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- status_set: verified
- confidence: medium
- checks_run: independent recomputation of every numeric part before reading the vault's or the SOA's solution; stem, tables and symbols diffed against the rendered question pages; explanation and Graders' Comments diffed against the rendered solution pages; any embedded diagram compared with the page; frontmatter (type, points, wiki_link targets) checked
- sources_checked: SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q12, pp.23-24, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q12, pp.22-23, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Stem, table and diagram match pp.23-24; recomputed EPV 705,669, 2V(0) = 689,670, 2V(2) = 956,070, E0[2V] = 564,054 and the first two years' EPV 141,615, and the directions in (e), agreeing with the SOA solution pp.22-23. Medium: (a) and (b) are reasons (prose). Graders' Comments for (a)-(b) moved to Part b as on p.22; two SOA slips marked '(as printed)'.
