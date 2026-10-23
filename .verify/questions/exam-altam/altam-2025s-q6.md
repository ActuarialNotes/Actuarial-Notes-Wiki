---
target: questions/exam-altam/altam-2025s-q6.md
created: 2026-10-23
---

## [F-001] SOA wording slip unmarked in examiners' comment
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c, Examiner Report
- claim: Comment reads 'The most common mistake was recognizing that the fund value at time 6 ... should have been considered' with no marker.
- evidence: Model solutions p.19 print it verbatim; 'not recognizing' is meant (A.7). Kept as printed, marker added.
- source_rank: 1
- proposed_action: Mark the slip ' (as printed)' in place; do not correct the figure.
- applied: true
- fingerprint: cf2ea68562e9

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked in place with " (as printed)" after the slip, the vault convention (P1: the vault transcribes the publisher, it does not correct it); the figures themselves are unchanged and match the page.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- status_set: verified
- confidence: medium
- checks_run: independent recomputation before reading the key (SULT/SUSM recomputed from Makeham A=0.00022, B=2.7e-6, c=1.124 at 5%%); stem, tables and every formula diffed against the rendered question pages; explanation diffed line by line against the rendered model-solution pages; examiners' comments checked verbatim and filed under the right part; diagrams compared with the page; points, type, topic and wiki_link targets checked (all exist)
- sources_checked: Spring 2025 Advanced Long-Term Actuarial Mathematics (ALTAM) Exam – Exam File, Q6, pp.14-15, sha256:0d9d7e9ac2c69f2176d1c0a05a0a6a2e9b1006dd64ac8909dd6dbab48541da9b — https://www.soa.org/globalassets/assets/files/edu/2025/spring/exams/spring-2025-altam-exam.pdf; SOA ALTAM April 2025 Model Solutions and Examiners' Comments, Q6, pp.18-20, sha256:6371e71ec29b9d7997e03348d4455e4d3e7418660261b36ddd4dd5a2fa0edf66 — https://www.soa.org/globalassets/assets/files/edu/2025/spring/solutions/2025-spring-altam-solutions.pdf
- note: Recompute: π(0) = 12,357.2 (p(0) 12,605.52 exact), π(6) = 3,157.05, (d) 8,820 — equal to the SOA's. Medium because (c) rests on reading the GMIB benefit base: the SOA takes BB10 ≥ max(P·1.03^10, F3, F6) = 140,000 → 11,200; reading the step-up as resetting the base and then rolling up at 3% gives 0.08·140,000·1.03^4 = 12,605.7. The stem's 'maximum of the initial premium accumulated at 3% ... with a step-up guarantee every 3 years' supports the SOA's reading; key kept. A.7 lists p(0) 12,605.5 (≈12,605.8) and p(6) 3,190.27 (≈3,189.9): not slips — exact Black-Scholes gives 12,605.52 and 3,190.28; only the printed 5–6 dp Φ values reproduce 12,605.79 and 3,189.92. No marker added. One slip marked (F-001).
