---
target: questions/exam-astam/astam-2025f-q4.md
created: 2026-10-23
---

## [F-001] Recursion row for g2 omits the (j/s) weights
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c, explanation (ii), g2 row
- claim: 'g_2 = f_1 g_1 + f_2 g_0' with no marker.
- evidence: Model solutions p.9 prints g2 = f1 g1 + f2 g0 = (½(0.3)(0.20110) + (0.1)(0.67032)); the formula line drops the 1/2 and 2/2 weights its own general formula and arithmetic use (A.6). Marked '(as printed)'.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed, marked '(as printed)'.
- applied: true
- fingerprint: 93b062bf5b1e

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this pass: the file now reads as the SOA printed it, with the '(as printed)' marker; re-diffed against the page image.

## [F-002] E[X**] for the per-loss payment X*
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part d, explanation, E[S] row
- claim: 'E[S] = λE[X**]' with no marker.
- evidence: Model solutions p.9 prints E[X**]; the variable defined in (c) is X* (A.6). Marked '(as printed)'.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed, marked '(as printed)'.
- applied: true
- fingerprint: 2350c4525e12

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- resolves: F-002
- status: resolved
- note: Applied in this pass: the file now reads as the SOA printed it, with the '(as printed)' marker; re-diffed against the page image.

## [F-003] (a)(iii) second LER row has no '= 0.4'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part a, explanation (iii), second LER row
- claim: 'LER = 0.4 ⇒ (100×0.6 + d×0.4)/310 ⇒ d = 160' with no marker.
- evidence: Model solutions p.8 prints the row without '= 0.4' after the fraction; the first row ('d/310 = 0.4') has it. Solving (60 + 0.4d)/310 = 0.4 gives d = 160, as printed. Not in A.6. Marked '(as printed)'.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed, marked '(as printed)'.
- applied: true
- fingerprint: 2cfd63a22480

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
- sources_checked: SOA Exam ASTAM Fall 2025 — exam questions, Q4, pp.9-10, sha256:82e9e32cfe70c47f3cba084117198396bf78398428322502889c33d163417254 — https://www.soa.org/globalassets/assets/files/edu/2025/fall/exams/2025-fall-astam-exam.pdf; SOA Exam ASTAM Fall 2025 — model solutions and examiners' comments, Q4, pp.8-10, sha256:b575524316d2938cec3a30d74109c217e79c4d353b125e489e84e73fe6c44b0a — https://www.soa.org/globalassets/assets/files/edu/2026/spring/solutions/2025-11-astam-solutions.pdf
- note: Recompute: LER(60) = 60/310 = 0.1935; EPPL 250; LER 40% → d = 160; X* = 0/400/800 w.p. 0.6/0.3/0.1; Pr[S=0] = e^−0.4 = 0.67032; g1 = 0.20110, g2 = 0.09720, Pr[S<1000] = 0.96861; stop-loss 200 − 189.58 = 10.42 — as the SOA. Three printed slips marked (the third is new, not in A.6).
