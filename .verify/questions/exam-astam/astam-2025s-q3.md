---
target: questions/exam-astam/astam-2025s-q3.md
created: 2026-10-23
---

## [F-001] SOA typo 'deducible' carried without a marker
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b, explanation (i)
- claim: 'Given a deducible $d$, the claim severity random variable is …' with no marker.
- evidence: Spring 2025 model solutions p.6, Q3(b)(i) prints 'Given a deducible d' (sic). Content-plan A.6 lists it. Marked '(as printed)' in place.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed, marked '(as printed)'.
- applied: true
- fingerprint: b15f9b63bb97

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this pass: the file now reads as the SOA printed it, with the '(as printed)' marker; re-diffed against the page image.

## [F-002] Transcriber dropped the SOA's '(iv)' label in (b)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b, explanation (iii)
- claim: The Class C differential 172.00/187.50 = 0.9173 sits under (iii) with no '(iv)' label.
- evidence: Model solutions p.7 prints '(iii) The expected aggregate claims for a Class C policy are 0.0430(4000) = 172.00.' then a separate '(iv) The differential relative to Class A is 172.00/187.50 = 0.9173', although the question (p.6) has only (i)–(iii). A.6 lists this. The vault silently merged it; restored '(iv) (as printed)'.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed, marked '(as printed)'.
- applied: true
- fingerprint: cc699590b022

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- resolves: F-002
- status: resolved
- note: Applied in this pass: the file now reads as the SOA printed it, with the '(as printed)' marker; re-diffed against the page image.

## [F-003] Printed off-balance factor 0.9771 (0.97734) carried into (d) without a marker
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c explanation (iii); Part d explanation (i)
- claim: Off-balance = 0.9771, and B = 1.1(200)/0.9771 = 225.16, with no marker.
- evidence: Model solutions p.8 prints [18,500(1)+8000(0.8910)+2200(0.8494)]/[18,500(1)+8000(0.9520)+2200(0.9173)] = 0.9771; the printed fraction is 27,496.68/28,134.06 = 0.97734 (unrounded differentials 0.97733). p.9 carries 0.9771 into B = 225.16, +12.58%, Class C +4.25% (0.97734 gives 225.10, +12.55%, +4.22%). Both values satisfy the question's 'show 0.98', '12%–13%' and '4%–5%'. Marked '(as printed)' at both places.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed, marked '(as printed)'.
- applied: true
- fingerprint: cda9912f6b56

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- resolves: F-003
- status: resolved
- note: Applied in this pass: the file now reads as the SOA printed it, with the '(as printed)' marker; re-diffed against the page image.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every numeric part before reading the key or solution; stem, tables and every formula diffed against the question PDF page images (130 dpi); explanation and examiners' comments diffed against the model-solution page images, verbatim and filed under the part they name; points per part; frontmatter, topic and wiki_link targets (validate_content, question_lint clean)
- sources_checked: SOA Exam ASTAM Spring 2025 — exam questions, Q3, pp.6-7, sha256:6abc81ba7d868ecb7eb1a7a747b4558adcfc1794531dcef0ef95c6c8f82c33e6 — https://www.soa.org/globalassets/assets/files/edu/2025/spring/exams/spring-2025-astam-exam.pdf; SOA Exam ASTAM Spring 2025 — model solutions and examiners' comments, Q3, pp.6-9, sha256:f651a9645c9b8ace921bb11d9def2e3655895a0fd6c563fe8777c43eb3f706e5 — https://www.soa.org/globalassets/assets/files/edu/2025/spring/solutions/2025-spring-astam-solutions.pdf
- note: Recompute: (b) 187.50, 0.9520, 0.9173; (c) 0.8910, 0.8494, off-balance 0.97733; (d) base +12.6%, Class C +4.2% — the SOA's 0.9771 (marked) gives 12.58% and 4.25%, inside the asked ranges. Three printed slips marked '(as printed)'.
