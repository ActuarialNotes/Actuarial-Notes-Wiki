---
target: questions/exam-astam/astam-2025f-q2.md
created: 2026-10-23
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every numeric part before reading the key or solution; stem, tables and every formula diffed against the question PDF page images (130 dpi); explanation and examiners' comments diffed against the model-solution page images, verbatim and filed under the part they name; points per part; frontmatter, topic and wiki_link targets (validate_content, question_lint clean)
- sources_checked: SOA Exam ASTAM Fall 2025 — exam questions, Q2, pp.6-7, sha256:82e9e32cfe70c47f3cba084117198396bf78398428322502889c33d163417254 — https://www.soa.org/globalassets/assets/files/edu/2025/fall/exams/2025-fall-astam-exam.pdf; SOA Exam ASTAM Fall 2025 — model solutions and examiners' comments, Q2, pp.2-4, sha256:b575524316d2938cec3a30d74109c217e79c4d353b125e489e84e73fe6c44b0a — https://www.soa.org/globalassets/assets/files/edu/2026/spring/solutions/2025-11-astam-solutions.pdf
- note: Clean. Recompute: NB(2, 0.21825) p0..p3 = 0.67379, 0.24142, 0.06488, 0.01550; max LL = −1747.25; χ² = 14.28 (df 3, critical 7.81, reject); AIC −1748.25 vs −1746.43 (Model 2), SBC −1751.05 vs −1752.03 (Model 1), LRT 5.636, p=0.018 (Model 2); GOF p-values 0.25% vs 0.15% (Model 1) — as the SOA. The question-level comments are filed under the part each names.
