---
target: questions/exam-astam/astam-2025s-q4.md
created: 2026-10-23
---

## [F-001] Method 3 integrates in z but keeps 'dx'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c, explanation, Method 3 rows 3-4
- claim: After the substitution z = x − d the two integrals end '\,dx' with no marker.
- evidence: Model solutions p.12, Method 3, second row: both integrals in z are printed with 'dx' (A.6). Marked '(as printed)' on both vault rows (the vault splits the printed row in two).
- source_rank: 1
- proposed_action: Keep the SOA's text as printed, marked '(as printed)'.
- applied: true
- fingerprint: 41fb17dc5674

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this pass: the file now reads as the SOA printed it, with the '(as printed)' marker; re-diffed against the page image.

## [F-002] 'around 28% of small losses' — the fitted model gives 38%
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part e, explanation, first bullet
- claim: 'In this case, around 28% of small losses would be eliminated with a deductible of 1000.'
- evidence: Model solutions p.13 prints 28%. With θ=5000, α̂=2.6077: F(1000) = 1 − (5000/6000)^2.6077 = 0.378 (rank 5 recompute; A.6 lists it). Prose point unaffected. Marked '(as printed)'.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed, marked '(as printed)'.
- applied: true
- fingerprint: fe1ae3e4b20a

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- resolves: F-002
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
- sources_checked: SOA Exam ASTAM Spring 2025 — exam questions, Q4, p.8, sha256:6abc81ba7d868ecb7eb1a7a747b4558adcfc1794531dcef0ef95c6c8f82c33e6 — https://www.soa.org/globalassets/assets/files/edu/2025/spring/exams/spring-2025-astam-exam.pdf; SOA Exam ASTAM Spring 2025 — model solutions and examiners' comments, Q4, pp.10-13, sha256:f651a9645c9b8ace921bb11d9def2e3655895a0fd6c563fe8777c43eb3f706e5 — https://www.soa.org/globalassets/assets/files/edu/2025/spring/solutions/2025-spring-astam-solutions.pdf
- note: Recompute: α̂=20/(181.66-20 ln 6000)=2.60767; CI 2.608±1.96(0.5831)=(1.46, 3.75); E[Y]=2319.98; LER=0.25405 — as the SOA. Two printed slips marked. (p.11 of the solutions is the OCR'd page; read as an image.) The examiners' comment to (e) also prints 'deducible' and 'preferrable', kept verbatim, unmarked.
