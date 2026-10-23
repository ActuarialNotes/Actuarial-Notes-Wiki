---
target: questions/exam-altam/altam-015.md
created: 2026-10-23
---

## [F-001] SOA slip in (e) not marked as printed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part e, explanation, EPV(Sickness benefit) line 1
- claim: '= 1000(7.6923 - 0.93773)1000 int ... (a-bar^{11bar} - a-bar^{11bar}_{1|}) e^{-delta t} dt' reproduced with no marker.
- evidence: Solution PDF p.27 prints a stray second '1000' and repeats the bracket (a-bar - a-bar) inside the integral after already factoring 7.6923 - 0.93773 out; the next line's 6754.58 = 1000(7.6923 - 0.93773) is right (content-plan A.7 'Q15(e) stray 1000 and integral repeated'). Vault faithful; now marked '(as printed)'.
- source_rank: 1
- proposed_action: Mark '(as printed)'.
- applied: true
- fingerprint: edfabf1b7841

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- resolves: F-001
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
- sources_checked: SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q15, pp.29-30, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q15, p.27, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Stem, features, intensities and diagram match pp.29-30; recomputed P = 737.72, 0.15739, a-bar^{11bar}_{x:1} = 0.93773, the new sickness EPV 1182.05 (= 1000 x 0.175 x e^{-0.13}/0.13) and P = 827.43, agreeing with the SOA solution p.27; (c) is a definition matching the SOA verbatim. SOA's stray factor in (e) marked '(as printed)'.
