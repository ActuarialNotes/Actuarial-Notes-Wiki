---
target: questions/exam-astam/astam-2025f-q3.md
created: 2026-10-23
---

## [F-001] GEV with ξ = −1 given 'for y > 1' (y < 1 meant)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b, explanation (two places)
- claim: 'H(y) = exp(−(1 − y)) (for y > 1)' and '… = 1 − y (for y > 1)', with no marker.
- evidence: Fall 2025 model solutions p.5 prints '(for y > 1)' twice. For ξ = −1, H(y) = exp(−(1+ξy)^(−1/ξ)) = exp(−(1−y)) is a d.f. only for y < 1 (rank 5; A.6 lists it). The derivation of c_n, d_n is unaffected. Marked '(as printed)' at both.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed, marked '(as printed)'.
- applied: true
- fingerprint: 4002d880d2d0

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- resolves: F-001
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
- sources_checked: SOA Exam ASTAM Fall 2025 — exam questions, Q3, p.8, sha256:82e9e32cfe70c47f3cba084117198396bf78398428322502889c33d163417254 — https://www.soa.org/globalassets/assets/files/edu/2025/fall/exams/2025-fall-astam-exam.pdf; SOA Exam ASTAM Fall 2025 — model solutions and examiners' comments, Q3, pp.5-7, sha256:b575524316d2938cec3a30d74109c217e79c4d353b125e489e84e73fe6c44b0a — https://www.soa.org/globalassets/assets/files/edu/2026/spring/solutions/2025-11-astam-solutions.pdf
- note: Recompute: S_Y(y) = (b−d−y)/(b−d); c_n = 8/n, d_n = 8(1−1/n); Pr[M10 ≤ 7] = (7/8)^10 = 0.26308; GEV estimate e^−1.25 = 0.28651; Weibull MDA — as the SOA. One printed slip marked at both places.
