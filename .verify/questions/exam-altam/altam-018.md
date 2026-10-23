---
target: questions/exam-altam/altam-018.md
created: 2026-10-23
---

## [F-001] SOA's missing integral in (b)(ii) not marked as printed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b, explanation (ii), last line
- claim: 'tp_xy^00 = exp(-(mu^01 + mu^02) dr)' reproduced with no marker.
- evidence: Solution PDF p.32 (b)(ii) ends 'tp^00_xy = exp(-(mu^01_{x+r:y+r} + mu^02_{x+r:y+r})dr)', dropping the integral sign int_0^t that the previous line and the question (p.34) carry; content-plan A.7 'Q18(b)(ii) missing int_0^t'. Vault faithful; now marked '(as printed)'.
- source_rank: 1
- proposed_action: Mark '(as printed)'.
- applied: true
- fingerprint: 25631ef0a248

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run; the file now matches the SOA's printed page.

## [F-002] SOA typos in Q18 not marked as printed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: nit
- status: open
- locus: Part a explanation; Part d Graders' Comments
- claim: 'dies early than', 'policy calues', 'ti the', 'polict values' reproduced with no marker.
- evidence: Solution PDF p.32 (a) prints 'dies early than'; p.34 (d) Graders' Comments print 'policy calues', 'ti the' and 'polict values'; content-plan A.7 lists all four. Vault faithful; each now marked '(as printed)'.
- source_rank: 1
- proposed_action: Mark '(as printed)'.
- applied: true
- fingerprint: 28091808d367

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
- sources_checked: SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q18, pp.34-35, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q18, pp.32-34, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Stem, intensities, given values and diagram match pp.34-35; recomputed 572,924, P = 333,932 (SOA 333,931 from rounded components), 10V(1) = 305,844, 10V(2) = 354,906, mu^01 = 0.009076, mu^02 = 0.015919 and the Euler value 564,848, agreeing with the SOA solution pp.32-34. (a) and (b) are reasoning and a derivation, matching the SOA verbatim. SOA's missing integral and four typos marked '(as printed)'.
