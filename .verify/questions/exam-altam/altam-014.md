---
target: questions/exam-altam/altam-014.md
created: 2026-10-23
---

## [F-001] SOA's shifted labels in (b) not marked as printed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b, explanation, label '(i)'
- claim: The premium working is labelled '(i)' and the EPV working is unlabelled, with no marker.
- evidence: Solution PDF p.25 prints the EPV of 1391.60 under '(b)' with no sub-label and labels the premium 488.93 '(i)', although the question (p.28) has the EPV as (b)(i) and the premium as (b)(ii); content-plan A.7 'Q14(b) labels shifted'. Vault faithful; the label now carries '(as printed)'.
- source_rank: 1
- proposed_action: Mark '(as printed)'.
- applied: true
- fingerprint: 861a213db944

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
- sources_checked: SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q14, p.28, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q14, pp.25-26, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Stem matches p.28; recomputed p40^(tau) = 0.995374, EPV 1391.6, P = 488.93, rider EPV 173.95 and premium 61.12, and 1V = 57.39 (unrounded p40), agreeing with the SOA solution pp.25-26. SOA's shifted (b) label marked '(as printed)'.
