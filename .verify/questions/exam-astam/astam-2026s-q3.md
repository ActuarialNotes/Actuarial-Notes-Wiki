---
target: questions/exam-astam/astam-2026s-q3.md
created: 2026-10-23
---

## [F-001] E[X∧x] written with 2000 for θ = 1000
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part e, explanation (ii), second row
- claim: '2(2000[1 − e^{−400/1000}]) − 2000[1 − e^{−0/1000}] − 2000[1 − e^{−800/1000}]' with no marker.
- evidence: Model solutions p.5 prints 2000[…]; for the exponential with θ = 1000, E[X∧x] = 1000(1 − e^{−x/1000}), and the next row's 329.68 and 550.67 are 1000(1−e^{−0.4}) and 1000(1−e^{−0.8}) (A.6). Marked '(as printed)'.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed, marked '(as printed)'.
- applied: true
- fingerprint: 339798888a6a

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
- sources_checked: SOA Exam ASTAM Spring 2026 — exam questions, Q3, pp.8-9, sha256:2d067bc99c3437f3791bb61c595db1e2cc8794b876f88dd9b506a5a543cac511 — https://www.soa.org/globalassets/assets/files/edu/2026/astam/april-2026-astam-exam.pdf; SOA Exam ASTAM Spring 2026 — model solutions and examiners' comments, Q3, pp.4-6, sha256:3930c2d38ba3d08955f65aededeb3bbb1c1eab5191b4f11c7481ceb177a7522f — https://www.soa.org/globalassets/assets/files/edu/2026/spring/solutions/2026-spring-astam-solutions.pdf
- note: Recompute: E[S] = 2000, SD 2000; Q95(S_P) = 20,328,971; G = 20,628,971/7500 = 2750.53; expected profit 0.8G − 2000 − 30 = 170.42; f1 = 0.26992 (rounding), 0.27172 (local moment matching) — as the SOA. One printed slip marked. A.6's '(c)(ii) 1,704,200 (1,704,240)' is checked and not marked: 8000(2750.53) − 20,300,000 = 1,704,240, and the printed 1,704,200 is that figure to the nearest 100, consistent with the 170.42 it leads to.
