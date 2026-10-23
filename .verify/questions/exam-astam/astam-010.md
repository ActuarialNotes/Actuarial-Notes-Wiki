---
target: questions/exam-astam/astam-010.md
created: 2026-10-23
---

## [F-001] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b, explanation, MGF integral rows 2-3
- claim: The MGF integral is written int e^{-lambda x(1-2t)} lambda^2 x e^{-lambda x} dx, repeating e^{-lambda x} after it was combined into e^{-lambda x(1-2t)}, with no marker.
- evidence: SOA ASTAM sample solutions p.21 prints exactly this: after combining e^{2 lambda x t} e^{-lambda x} into e^{-lambda x(1-2t)} it keeps the factor x e^{-lambda x}, on both the second and third rows. The result (1-2t)^{-2} needs the integrand lambda^2 x e^{-lambda x(1-2t)} alone. Kept as printed; "(as printed)" added on the first row where it appears.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: d8ca292233b2

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked "(as printed)" in place in this run; the text matches the SOA page.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: independent recomputation of every computed part before reading the key and solution; stem, table and formula diff against the 130-dpi page images of the question PDF; explanation diff against the solution page images (method, figures, arithmetic, align* rows); frontmatter (type multi-part, wiki_link targets and topic page exist, validate_content.py passes)
- sources_checked: SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q10, p.15, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf; SOA ASTAM Solutions to Sample Questions, Q10, pp.21-22, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf
- note: Recomputed: lambda-hat = 2/x-bar; Y ~ chi-square(4n); I = 2n/lambda^2; exact CI (24.43, 59.34)/7,160 = (0.00341, 0.00829); asymptotic 0.005587 +/- 1.96(0.00125) = (0.00314, 0.00804). All agree. Stem matches p.15; solution pp.21-22. One SOA slip (repeated e^{-lambda x} in the MGF integral) marked.
