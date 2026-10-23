---
target: questions/exam-altam/altam-004.md
created: 2026-10-23
---

## [F-001] SOA diagram slip not marked as printed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b, state diagram
- claim: The diagram is reproduced without a note that it disagrees with the text.
- evidence: Question PDF p.7: the diagram draws a double-headed arrow between Healthy (0) and Sick (2) and no arrow from At Risk (1) to Healthy (0), while p.8 gives mu^10 = 20.0 and mu^20 = 4.0 and no mu^02 (content-plan A.7, 'Q4(b) diagram 0<->2 double arrow'). The vault's crop matches the page; the slip is the SOA's.
- source_rank: 1
- proposed_action: Keep the diagram as printed and mark it '(as printed)'.
- applied: true
- fingerprint: b454f92c67a0

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run; the file now matches the SOA's printed page.

## [F-002] SOA slip in (c) not marked as printed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c, explanation line 2
- claim: 0.5p64^03 = 1 - 0.00264 = 0.99736, with no marker.
- evidence: Solution PDF p.8 prints '0.5p64^03 = 1 - 0.00264 = 0.99736'; 0.5p64^03 is 0.00264 (the given table), and 0.99736 is 1 - 0.5p64^03, the factor the premium term uses (content-plan A.7). The vault transcribes it faithfully; it now carries '(as printed)'.
- source_rank: 1
- proposed_action: Mark '(as printed)'.
- applied: true
- fingerprint: 2bb93f72ce5d

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- resolves: F-002
- status: resolved
- note: Applied in this run; the file now matches the SOA's printed page.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: independent recomputation of every numeric part before reading the vault's or the SOA's solution; stem, tables and symbols diffed against the rendered question pages; explanation and Graders' Comments diffed against the rendered solution pages; any embedded diagram compared with the page; frontmatter (type, points, wiki_link targets) checked
- sources_checked: SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q4, pp.7-8, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q4, pp.7-8, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Stem, SULT parameters, intensity list and probability table match pp.7-8; recomputed 100,000 0.5q64 = 257.35, 4V = 30.14, 1p64^00bar = 0.93678, revised 4V = 47.80 and 3.65 days, all agreeing with the SOA solution pp.7-8. Two SOA slips marked '(as printed)' (diagram; 0.5p^03 = 1 - 0.00264).
