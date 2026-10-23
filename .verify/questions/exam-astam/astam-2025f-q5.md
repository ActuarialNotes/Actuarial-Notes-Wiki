---
target: questions/exam-astam/astam-2025f-q5.md
created: 2026-10-23
---

## [F-001] Transcriber moved the SOA's (v) label in (c)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c, explanation (iv)-(v)
- claim: The p-value line was unlabelled and '(v)' stood before the conclusion.
- evidence: Model solutions p.12 labels '(iv) The test statistic is Z = ΣZk = 1', '(v) p = 2(1 − Φ(…)) = 5.93%', and leaves the conclusion unlabelled — one step off the question's (iv) p-value / (v) conclusion (p.12 of the question; A.6). Restored '(v) (as printed)' on the p-value and removed the added label from the conclusion.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed, marked '(as printed)'.
- applied: true
- fingerprint: 311ac80106e6

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
- sources_checked: SOA Exam ASTAM Fall 2025 — exam questions, Q5, pp.11-12, sha256:82e9e32cfe70c47f3cba084117198396bf78398428322502889c33d163417254 — https://www.soa.org/globalassets/assets/files/edu/2025/fall/exams/2025-fall-astam-exam.pdf; SOA Exam ASTAM Fall 2025 — model solutions and examiners' comments, Q5, pp.11-13, sha256:b575524316d2938cec3a30d74109c217e79c4d353b125e489e84e73fe6c44b0a — https://www.soa.org/globalassets/assets/files/edu/2026/spring/solutions/2025-11-astam-solutions.pdf
- note: Recompute: f0..f4 = 2.8333, 1.2844, 1.1838, 1.1056, 1.0194; 2024 projected 1841.85; Q2-2025 payments 7.70+42.51+68.47+80.59 = 199.28; L-S test with each development-j factor placed on the diagonal of C(i,j) (the reading the question's 'Development Quarter 0–4' L-S table supports): n_k = 2,2,3,4, Z_k = 0,0,0,1, E[Z4] = 1.25, Z = 1, p = 2(1−Φ(2/√1.125)) = 5.93% — as the SOA.
