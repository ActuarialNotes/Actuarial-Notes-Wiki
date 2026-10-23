---
target: questions/exam-altam/altam-010.md
created: 2026-10-23
---

## [F-001] SOA rounding inconsistency in (e) not marked as printed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part e, explanation
- claim: (e) uses 0.4542 with no marker, though (d) gives 0.4543.
- evidence: Solution PDF p.19 (d) prints a-bar^{22bar}_{90:0.5} = 0.4543 (recomputed 0.454270); p.20 (e) substitutes 0.4542; content-plan A.7 'Q10(d) 0.4543 vs (e) 0.4542'. The SOA's 2182.7 follows from 0.4542 (exact 2182.59). Vault faithful; now marked '(as printed)'.
- source_rank: 1
- proposed_action: Mark '(as printed)'.
- applied: true
- fingerprint: aeeeb3ab242b

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run; the file now matches the SOA's printed page.

## [F-002] Third reason in (f) not marked as printed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: nit
- status: open
- locus: Part f, explanation, Reason 3
- claim: The solution's three reasons are reproduced for a part that asks for two, with no marker.
- evidence: Question PDF p.20 (f) asks for two reasons; solution PDF p.20 prints Reason 1, 2 and 3; content-plan A.7 'Q10(f) asks two reasons, solution gives three'. Vault faithful; Reason 3 now marked '(as printed)'.
- source_rank: 1
- proposed_action: Mark '(as printed)'.
- applied: true
- fingerprint: 0ceb59ccb94a

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
- sources_checked: SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q10, pp.19-20, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q10, pp.19-20, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Stem, intensities and diagram match pp.19-20; recomputed tp^12 = e^{-0.24t} - e^{-0.34t}, a-bar^12_90 = 0.88417 (EPV 2652.5), a-bar^{22bar}_{90:0.5} = 0.4543, and the waiting-period EPV 2182.6 (SOA 2182.7 from rounded 0.4542/0.7276), agreeing with the SOA solution pp.19-20; (f) is prose, matching the SOA verbatim. Two A.7 entries marked '(as printed)'.
