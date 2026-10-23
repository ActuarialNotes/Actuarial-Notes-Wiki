---
target: questions/exam-astam/astam-2026s-q4.md
created: 2026-10-23
---

## [F-001] v and a written as E[V[N]] and V[E[N]] (conditioning on Λ dropped)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part d, explanation (i), v and a rows
- claim: 'v = E[V[N]] = E[Λ] = 0.4' and 'a = V[E[N]] = V[Λ] = 0.08' with no marker.
- evidence: Model solutions p.9 prints v = E[V[N]] and a = V[E[N]]; the Bühlmann parameters are E[V[N|Λ]] and V[E[N|Λ]] (as part (a) on p.7 writes them). The values 0.4 and 0.08 are right. Not in A.6. Marked '(as printed)' on both rows.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed, marked '(as printed)'.
- applied: true
- fingerprint: 60bc2306405e

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
- sources_checked: SOA Exam ASTAM Spring 2026 — exam questions, Q4, pp.10-11, sha256:2d067bc99c3437f3791bb61c595db1e2cc8794b876f88dd9b506a5a543cac511 — https://www.soa.org/globalassets/assets/files/edu/2026/astam/april-2026-astam-exam.pdf; SOA Exam ASTAM Spring 2026 — model solutions and examiners' comments, Q4, pp.7-9, sha256:3930c2d38ba3d08955f65aededeb3bbb1c1eab5191b4f11c7481ceb177a7522f — https://www.soa.org/globalassets/assets/files/edu/2026/spring/solutions/2026-spring-astam-solutions.pdf
- note: Recompute: E[N] = 0.4, SD 0.6928; posterior Gamma(4, 1/8); predictive NB(r=4, β=0.125), mean 0.5; v = 0.4, a = 0.08, μ = 0.4, Z = 3/8, estimate 0.50 — as the SOA. One printed notation slip marked (new, not in A.6).
