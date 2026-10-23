---
target: questions/exam-astam/astam-2026s-q5.md
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
- sources_checked: SOA Exam ASTAM Spring 2026 — exam questions, Q5, p.12, sha256:2d067bc99c3437f3791bb61c595db1e2cc8794b876f88dd9b506a5a543cac511 — https://www.soa.org/globalassets/assets/files/edu/2026/astam/april-2026-astam-exam.pdf; SOA Exam ASTAM Spring 2026 — model solutions and examiners' comments, Q5, pp.10-12, sha256:3930c2d38ba3d08955f65aededeb3bbb1c1eab5191b4f11c7481ceb177a7522f — https://www.soa.org/globalassets/assets/files/edu/2026/spring/solutions/2026-spring-astam-solutions.pdf
- note: Clean, no edits. Recompute: f0 = 1.2739, f1 = 1.100946; CL 429.37, 583.43; γ̂ consistent with 1/λ (0.71303, 0.19528, 0.09169); C̄ = 1155/2.62134 = 440.61; s1² = 1250.80, v̂ = 938.11; Z = 0.92877, 0.922134, 0.902879; μ̂ = 452.77; BS 570.74; BS2 Z2* = 0.97213, 579.78 — as the SOA. A.6's '(d)(iv) 579.78 vs 579.79' is checked and not marked: at full precision the second iterate is 579.784, so the printed 579.78 is right; only the displayed rounded inputs multiply out to 579.79.
