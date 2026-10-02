---
target: Concepts/Modified Duration.md
created: 2026-09-28
---

## [F-001] Example applies the percentage change to face value instead of price
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: example 'Converting Between Duration Types', last sentence of the answer
- claim: 'A $100{,}000$ face bond would lose approximately \$3,540 in value.'
- evidence: DUR (4.1) p.6: P(i) ≈ P(i0)(1 − (i − i0)·D_mod(i0)) — the change is proportional to the price P(i0), not the face amount; the page's own formula is ΔP ≈ −D_mod·P·Δj. The example gives no price; 0.035377 × 100,000 = 3,537.74 ≈ 3,540 only if the bond sells at par. A 100,000-face bond priced at, say, 90,000 would lose about 3,184. The percentage result (−3.54%) is right.
- source_rank: 1
- proposed_action: Maintainer: state the loss as 3.54% of the bond's price, or give the price (e.g. 'priced at 100,000').
- applied: false
- fingerprint: 490e17c56200

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: D_mod = −P'/P vs DUR (3.2) p.5 and NOTE p.2 ✓; = D_mac/(1+j) vs DUR (3.3) ✓; ΔP ≈ −D_mod·P·Δj vs DUR (4.1) p.6 ✓; second-order form vs DUR (6.1) p.8 ✓; 'always less than Macaulay since 1+j > 1' follows from (3.3) for j > 0 ✓. Example recomputed: 7.5/1.06 = 7.0755 → 7.075 ✓; −7.0755 × 0.005 = −0.035377 → −3.54% ✓; dollar figure uses face as price → F-001 (major, open). Notation j vs NOTE's i. Links and figure resolve; linked only from Exam FM. Low: a major is open.
- sources_checked: Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §3 Macaulay and Modified Duration, (3.2)-(3.3), PDF p.5, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf; Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §4 First-Order Approximations, (4.1), PDF p.6, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf; Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §6 Second-Order Approximations, (6.1), PDF p.8, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf

## [F-002] 'Always less than Macaulay' needs j > 0
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- severity: nit
- status: open
- locus: second bullet
- claim: Modified duration is always less than [[Macaulay Duration]] (since 1+j > 1)
- evidence: FM-24-17 (3.3) PDF p.5: D_mod = D_mac/(1+i); the ratio is below 1 only when i > 0 (at i = 0 the two are equal). 'Always' drops the condition the parenthesis relies on.
- source_rank: 1
- proposed_action: Say 'whenever j > 0'.
- applied: true
- fingerprint: 68c5f8898328

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: The example now gives the bond's price (100,000) in the stem and applies the approximation to the price, per FM-24-17 (4.1) PDF p.6 and the page's own dP ≈ -D_mod·P·dj: D_mod = 7.5/1.06 = 7.075472, dP ≈ -(7.075472)(100,000)(0.005) = -3,537.74, a 3.54% fall to about 96,462 (python). The face-amount wording is gone.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-002
- status: resolved
- note: Bullet now reads 'less than Macaulay Duration whenever j > 0 (since then 1+j > 1)', per FM-24-17 (3.3).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: D_Mod = -P'/P vs FM-24-17 (3.2) PDF p.5 and notation note p.2 ✓; = D_Mac/(1+j) vs (3.3) ✓; dP ≈ -D_Mod·P·dj vs (4.1) PDF p.6 ✓; second-order form vs (6.1) PDF p.8 ✓; less than Macaulay for j > 0 ✓. Example recomputed: 7.5/1.06 = 7.075472, -(7.075472)(100,000)(0.005) = -3,537.74, 3.54%, new price 96,462 ✓. Links and figure resolve. Medium: example is the vault's own.
- sources_checked: SOA study note FM-24-17, Alps, Using Duration and Convexity to Approximate Change in Present Value (2017), pp.5-8, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf; SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf
