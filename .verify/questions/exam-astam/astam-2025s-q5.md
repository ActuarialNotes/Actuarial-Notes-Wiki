---
target: questions/exam-astam/astam-2025s-q5.md
created: 2026-10-23
---

## [F-001] Transcriber filled a blank the SOA left in (a)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part a, explanation, first sentence
- claim: 'The outstanding claims for AY 3 are $\hat{C}_{3,3} - C_{3,0}$.'
- evidence: Model solutions p.14 prints 'The outstanding claims for AY 3 are .' — the embedded expression is blank in both the page image and the text layer. The vault had supplied an expression the page does not print. Restored as printed with the marker. The same quantity is printed two lines later (Ĉ3,3 − C3,0 = 941(2.4540 − 1) = 1368.2), so nothing is lost.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed, marked '(as printed)'.
- applied: true
- fingerprint: 6bfb75de5bef

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this pass: the file now reads as the SOA printed it, with the '(as printed)' marker; re-diffed against the page image.

## [F-002] Third factor printed as 1568/1650 (1568/1403 meant)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part a, explanation, λ0 row
- claim: λ0 = (…)(…)(1568/1650) = (1.7686)(1.2416)(1.1176), with no marker.
- evidence: Model solutions p.14 prints (1568/1650); 1568/1650 = 0.9503, while the value used, 1.1176, is 1568/1403 (f2 from the triangle on question p.9). A.6 lists it. Marked '(as printed)'.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed, marked '(as printed)'.
- applied: true
- fingerprint: 3cdb353bb67c

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
- sources_checked: SOA Exam ASTAM Spring 2025 — exam questions, Q5, pp.9-10, sha256:6abc81ba7d868ecb7eb1a7a747b4558adcfc1794531dcef0ef95c6c8f82c33e6 — https://www.soa.org/globalassets/assets/files/edu/2025/spring/exams/spring-2025-astam-exam.pdf; SOA Exam ASTAM Spring 2025 — model solutions and examiners' comments, Q5, pp.14-18, sha256:f651a9645c9b8ace921bb11d9def2e3655895a0fd6c563fe8777c43eb3f706e5 — https://www.soa.org/globalassets/assets/files/edu/2025/spring/solutions/2025-spring-astam-solutions.pdf
- note: Recompute: f0=1.76856, f1=1.24156, f2=1.11760, λ0=2.4540, CL OCR 941(1.4540)=1368.2; BF (1−1/2.4540)·2160 = 1279.8; alternative 2220.84−941 = 1279.8 — as the SOA. Two printed slips restored/marked.
