---
target: questions/exam-altam/altam-005.md
created: 2026-10-23
---

## [F-001] SOA notation slip in (a)(i) not marked as printed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part a, explanation (i)
- claim: The solution's a-bar_x^01 (for a-bar_0^01) is reproduced with no marker.
- evidence: Solution PDF p.9, (a)(i): the first line and the concluding ratio write a-bar_x^{01}, while the question (p.9) and the rest of the line use age/time 0 (a-bar_0^{01}); content-plan A.7 'Q5(a)(i) a^01_x vs a^01_0'. The vault transcribes it faithfully; both lines now carry '(as printed)'.
- source_rank: 1
- proposed_action: Mark '(as printed)'.
- applied: true
- fingerprint: 8cf6d7c2f39a

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run; the file now matches the SOA's printed page.

## [F-002] SOA sign slip in (a)(ii) not marked as printed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part a, explanation (ii)
- claim: r p_t^{11bar} = e^{int_0^r mu^12 + mu^13 ds} = e^{-0.3r}, with no marker.
- evidence: Solution PDF p.9 prints the exponent without its minus sign (e^{int ...}), then e^{-0.3r}; content-plan A.7 'Q5(a)(ii) exponent missing minus'. Vault faithful; now marked '(as printed)'.
- source_rank: 1
- proposed_action: Mark '(as printed)'.
- applied: true
- fingerprint: a2c07899e9cb

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
- sources_checked: SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q5, pp.9-10, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q5, pp.9-10, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Stem, intensities and diagram match pp.9-10; recomputed A-bar^03/a-bar^01 = mu^13, a-bar^{11bar} = 1/0.34 = 2.941, surgery EPV 6446, nursing EPV 35,160, the 4-month sojourn annuity 0.3151 and the directions in (c), agreeing with the SOA solution pp.9-10. Two SOA slips marked '(as printed)'.
