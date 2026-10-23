---
target: questions/exam-astam/astam-2026s-q6.md
created: 2026-10-23
---

## [F-001] Threshold written as X(464) (X(484) meant)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c, explanation, first sentence
- claim: 'We have d = X_(464).' with no marker.
- evidence: Model solutions p.13 prints d = X(464); d = 4953 is rank 484 in the question's table (p.13), and the same sentence goes on 'we have j = 484' (A.6). Marked '(as printed)'.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed, marked '(as printed)'.
- applied: true
- fingerprint: 94080a3bc14e

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this pass: the file now reads as the SOA printed it, with the '(as printed)' marker; re-diffed against the page image.

## [F-002] Method 3 evaluates (0.99)^0.678765 (0.01 meant)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part d, explanation (ii), Method 3, last row
- claim: '= 4953(0.33098)(0.99)^0.678765 / (0.01(0.678765)) = 10,602.81' with no marker.
- evidence: Model solutions p.15 prints (0.99)^0.678765; [−(1−p)^(1−1/α)] from 0.99 to 1 is 0.01^0.678765 = 0.0439, which gives 4953(0.33098)(0.0439)/0.00678765 ≈ 10,603; with 0.99 the row would give ≈ 2.4 million (A.6). Marked '(as printed)'.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed, marked '(as printed)'.
- applied: true
- fingerprint: bc6588c4ad0b

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- resolves: F-002
- status: resolved
- note: Applied in this pass: the file now reads as the SOA printed it, with the '(as printed)' marker; re-diffed against the page image.

## [F-003] Examiners' comment typos 'question..' and 'umber'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b and Part c, Examiner Report
- claim: '… who did not omit the question..' and '… a significant umber of the candidates..' with no marker.
- evidence: Model solutions p.13 ('the question..') and p.14 ('significant umber') print both (A.6 checkers' finds). Kept verbatim; marked '(as printed)'.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed, marked '(as printed)'.
- applied: true
- fingerprint: dd51bc4a0f6d

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
- sources_checked: SOA Exam ASTAM Spring 2026 — exam questions, Q6, pp.13-14, sha256:2d067bc99c3437f3791bb61c595db1e2cc8794b876f88dd9b506a5a543cac511 — https://www.soa.org/globalassets/assets/files/edu/2026/astam/april-2026-astam-exam.pdf; SOA Exam ASTAM Spring 2026 — model solutions and examiners' comments, Q6, pp.13-15, sha256:3930c2d38ba3d08955f65aededeb3bbb1c1eab5191b4f11c7481ceb177a7522f — https://www.soa.org/globalassets/assets/files/edu/2026/spring/solutions/2026-spring-astam-solutions.pdf
- note: Recompute: empirical VaR X(495) = 7530, ES 12,119.8; GPD VaR 6981.89, ES 16,987.20; Hill (j = 484, 17 terms) α̂ = 3.1130 from the printed 3-decimal logs (3.1109 from exact logs; both 3.11 to 0.01); Hill VaR 7196.81, ES 10,602.81 — as the SOA. The (d)(i) chain reads as printed (Ŝ(Q_q) = 1−q ⇒ 0.032(Q/d)^−α = 0.01 ⇒ Q = …); the linker's false a=b=c split noted in content-plan §3.1a is gone, and every Method 1–3 row is a true statement. Three printed slips marked.
