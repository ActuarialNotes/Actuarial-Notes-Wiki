---
target: Concepts/Arithmetic Progression.md
created: 2026-09-28
---

## [F-001] Decomposition into 'level P plus increasing Q' overstates the value by Q·a_n
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: third bullet
- claim: 'Any arithmetic annuity can be decomposed into a Level Annuity of P per period plus a pure increasing annuity of Q per period.'
- evidence: The bullet above it names (Ia)_n (payments 1, 2, …, n) as the symbol for 'the increasing portion', so the page reads as PV = P a_n + Q (Ia)_n. FIN (26.3) p.234 gives PV = P a_n + Q(a_n - n v^n)/i: the increasing part is 0, Q, 2Q, …, (n-1)Q, not Q(Ia)_n; FIN Example 26.1 p.235 splits 500, 520, …, 800 as a level annuity of 480 = P - Q plus 20(Ia)_16. With the page's own example (P = Q = 100, 6%, n = 5): P a_5 + Q (Ia)_5 = 1,635.93, whereas the correct value (which the example itself computes as 100(Ia)_5 = (P-Q)a_5 + Q(Ia)_5) is 1,214.69 — recomputed in python and by brute-force discounting.
- source_rank: 3
- proposed_action: Maintainer: state the decomposition as a level annuity of P - Q plus Q(Ia)_n (equivalently P a_n + (Q/i)(a_n - n v^n)), per FIN (26.3) p.234 / Ex. 26.1 p.235.
- applied: false
- fingerprint: 0a0ee0dce88b

## [F-002] Example arithmetic slips (5 × 0.7473, 100 × 12.147)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: example 'Increasing Annuity', second and third lines
- claim: '5v^5 = 5(0.7473) = 3.7363' … '(Ia)_5 = 12.147. PV = 100 × 12.147 = 1214.72.'
- evidence: 5 × 0.7473 = 3.7365 (3.7363 needs v^5 = 0.74726); 100 × 12.147 = 1,214.70, not 1,214.72. Exact (python): (Ia)_5@6% = 12.146912, PV = 1,214.69 (brute-force sum 100t·1.06^-t = 1,214.69).
- source_rank: 5
- proposed_action: Maintainer: show v^5 = 0.74726 and PV ≈ 1,214.69.
- applied: false
- fingerprint: ab3bb96af499

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: Definition (payments P, P+Q, P+2Q, …) vs FIN §26 p.234 and SYL p.3 ('Arithmetic progression, finite term and perpetuity'); (Ia)_n = (ä_n - n v^n)/i vs SOA-S Q4 p.4 (image) and FIN (26.5) p.235; (Iä) symbol in use in SOA-S Q160 p.42 (image). Decomposition bullet checked against FIN (26.3) p.234 and Ex. 26.1 p.235 (F-001, major). Example recomputed in python (F-002). Links, figure, LaTeX resolve. Low: F-001 (major) is open.
- sources_checked: SOA Exam FM Sample Solutions (rev. Aug 2026), Q 4, solutions PDF p.4, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 160, solutions PDF p.42, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §26 Varying Annuity-Immediate, arithmetic progression, PDF p.234-237, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Decomposition corrected to Finan (26.3) p.234: PV = P·a_n + Q(a_n - n v^n)/i, stated as the defining formula, with the equivalent split (P-Q)·a_n + Q(Ia)_n (Finan Ex. 26.1 p.235: 500..800 = level 480 + 20(Ia)_16) and a bullet warning that P·a_n + Q(Ia)_n overstates by Q·a_n. New worked example shows it numerically (python): 1000·a10 + 50(a10-10v^10)/0.05 = 9,304.34 = 950·a10 + 50(Ia)10, brute-force Σ(1000+50(t-1))v^t = 9,304.34, while 1000·a10 + 50(Ia)10 = 9,690.42 (over by 50·a10 = 386.09). Also added, from Finan: AV = P s_n + Q(s_n - n)/i (26.4) p.234, perpetuity P/i + Q/i^2 p.237, due form P ä_n + Q(a_n - n v^n)/d p.249.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-002
- status: resolved
- note: Example rewritten through the corrected formula with six-decimal factors: a_5@6% = 4.212364, 5v^5 = 3.736291, PV = 421.24 + 100(0.476073/0.06) = 421.24 + 793.45 = 1,214.69 = 100(Ia)_5 = 100(12.146912) (was 5(0.7473) = 3.7363 and 1,214.72). Python brute force Σ100t·1.06^-t = 1,214.691.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: Re-checked on the new bytes: PV = P a_n + Q(a_n - n v^n)/i vs Finan (26.3) p.234; (P-Q)a_n + Q(Ia)_n split vs Finan Ex. 26.1 p.235 (level 480 + 20(Ia)_16); (Ia)_n = (ä_n - n v^n)/i vs SOA solution Q4 p.4 and Finan (26.5); AV = P s_n + Q(s_n - n)/i vs (26.4) p.234; perpetuity P/i + Q/i^2 vs p.237; due form P ä_n + Q(a_n - n v^n)/d vs p.249; 'arithmetic progression, finite term and perpetuity' vs syllabus p.3. Examples recomputed in python: 1,214.69 (a_5 = 4.212364, 5v^5 = 3.736291; brute force 1,214.691) and 9,304.34 (a_10 = 7.721735, 10v^10 = 6.139133, (Ia)_10 = 39.373783; brute force 9,304.337; wrong split 9,690.42, excess 386.09). 45 math nodes typeset in KaTeX; links resolve.
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.234-237, 249, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 4, solutions PDF p.4, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
