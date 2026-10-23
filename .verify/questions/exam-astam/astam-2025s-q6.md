---
target: questions/exam-astam/astam-2025s-q6.md
created: 2026-10-23
---

## [F-001] Transcriber removed the SOA's doubled '= ='
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:34Z/f2bf
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b, explanation
- claim: 'E[X] = E[E[X|θ]] = E[θ] = β*Γ(α*−1)/Γ(α*) …' written with one equals sign.
- evidence: Model solutions p.19, (b): 'E[X]=E[E[X|θ]]=E[θ]= = β*Γ(α*−1)/Γ(α*)' — the SOA prints '= =' (A.6). Restored '= = (as printed)'.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed, marked '(as printed)'.
- applied: true
- fingerprint: 3a52d109c4a1

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
- sources_checked: SOA Exam ASTAM Spring 2025 — exam questions, Q6, pp.11-12, sha256:6abc81ba7d868ecb7eb1a7a747b4558adcfc1794531dcef0ef95c6c8f82c33e6 — https://www.soa.org/globalassets/assets/files/edu/2025/spring/exams/spring-2025-astam-exam.pdf; SOA Exam ASTAM Spring 2025 — model solutions and examiners' comments, Q6, pp.19-21, sha256:f651a9645c9b8ace921bb11d9def2e3655895a0fd6c563fe8777c43eb3f706e5 — https://www.soa.org/globalassets/assets/files/edu/2025/spring/solutions/2025-spring-astam-solutions.pdf
- note: Recompute: posterior IG(130, 60,000); predictive mean 60,000/129 = 465.12; μ=344.83, v=10^8/812=123,152.7, a=4246.65; v/a=29, Z=100/129=0.7752, P=465.12 — as the SOA. One printed slip restored.
