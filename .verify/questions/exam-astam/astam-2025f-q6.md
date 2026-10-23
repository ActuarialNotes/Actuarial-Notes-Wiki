---
target: questions/exam-astam/astam-2025f-q6.md
created: 2026-10-23
---

## [F-001] 'two moments of L' (W meant)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c, explanation (i)
- claim: 'matching two moments of S to two moments of $L$' with no marker.
- evidence: Model solutions p.14 prints 'moments of L'; the approximating variable is W (A.6). Marked '(as printed)'.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed, marked '(as printed)'.
- applied: true
- fingerprint: da0b435bfd13

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this pass: the file now reads as the SOA printed it, with the '(as printed)' marker; re-diffed against the page image.

## [F-002] 'μ* + (σ*)² = 9.84692' drops the /2
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c, explanation (ii)
- claim: 'We know that μ* + (σ*)² = 9.84692 ⇒ μ* = 9.84692 − 1.15418/2 = 9.2699' with no marker.
- evidence: Model solutions p.15 prints μ*+(σ*)² = 9.84692; (c)(i) has μ*+(σ*)²/2 = 9.84692, and the next step uses /2 (A.6). Marked '(as printed)'.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed, marked '(as printed)'.
- applied: true
- fingerprint: aa2b784cd089

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- resolves: F-002
- status: resolved
- note: Applied in this pass: the file now reads as the SOA printed it, with the '(as printed)' marker; re-diffed against the page image.

## [F-003] Examiners' comment 8 cites an instruction the question does not give
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part d, Examiner Report, comment 8
- claim: '… and an instruction that the insurer is particularly interested in the right tail.'
- evidence: Fall 2025 question p.13 (Q6) gives no such instruction; comment 8 on solutions p.16 refers to one (A.6). Kept verbatim; marked '(as printed)'.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed, marked '(as printed)'.
- applied: true
- fingerprint: ea0be0265155

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
- sources_checked: SOA Exam ASTAM Fall 2025 — exam questions, Q6, p.13, sha256:82e9e32cfe70c47f3cba084117198396bf78398428322502889c33d163417254 — https://www.soa.org/globalassets/assets/files/edu/2025/fall/exams/2025-fall-astam-exam.pdf; SOA Exam ASTAM Fall 2025 — model solutions and examiners' comments, Q6, pp.14-17, sha256:b575524316d2938cec3a30d74109c217e79c4d353b125e489e84e73fe6c44b0a — https://www.soa.org/globalassets/assets/files/edu/2026/spring/solutions/2025-11-astam-solutions.pdf
- note: Recompute: E[S] = 18,900; SD 27,850.60; normal VaR 64,710.16, ES 76,347.8; lognormal σ* = 1.074329, μ* = 9.2699, VaR 62,127.2, ES 107,412.8 — as the SOA. Three printed slips marked.
