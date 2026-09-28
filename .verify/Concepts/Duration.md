---
target: Concepts/Duration.md
created: 2026-09-28
---

## [F-001] Modified duration written as an approximation to -P'/P
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: display formula
- claim: 'D_{Mod} = \frac{D_{Mac}}{1+j} \approx -\frac{1}{P}\frac{dP}{dj}'
- evidence: DUR (3.2) p.5 defines D_mod(i) = −P'(i)/P(i) and (3.3) gives D_mod = D_mac/(1+i), both equalities; NOTE p.2: 'Modified duration = −P'(i)/P(i)'. The '≈' makes an exact definition look approximate.
- source_rank: 1
- proposed_action: Replace '\approx' with '=' (done).
- applied: true
- fingerprint: 859f71939a7e

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Changed '\approx' to '=' in the display formula, so it reads D_Mod = D_Mac/(1+j) = −(1/P)dP/dj as in DUR (3.2)-(3.3) p.5 and NOTE p.2; nothing else changed.

## [F-002] FM convention that unqualified 'duration' means Macaulay duration is not stated
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: opening paragraph and 'Two main types' list
- claim: The page presents Macaulay and modified duration as two types without saying which one an exam question means by 'duration'; its only formula and worked example use modified duration.
- evidence: NOTE p.2: 'Unless otherwise stated in the examination question, "duration" means Macaulay duration and "convexity" means modified convexity.' SYL p.5 outcome a) lists 'duration and convexity (Macaulay and modified)'. The page opens with the weighted-average-time definition (Macaulay), so nothing on it is false, but the exam's reading of the bare word is absent while the example leans on the modified measure.
- source_rank: 1
- proposed_action: Maintainer: state NOTE p.2's convention on the page.
- applied: false
- fingerprint: eed0c4b6f516

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Macaulay = PV-weighted average time vs DUR (3.1) p.5 and p.5 text ✓; modified = −P'/P vs DUR (3.2) p.5 and NOTE p.2 ✓; D_mod = D_mac/(1+j) = DUR (3.3) ✓ ('≈' corrected to '=', F-001 resolved); longer duration → more sensitivity ✓ (DUR (4.1) p.6); Finan §54 p.471 'volatility is often called modified duration' ✓; FM default not stated → F-002 (minor, open). Example recomputed: −6 × 0.005 = −0.03 ✓. Notation j vs NOTE's i. Links and figure resolve; linked only from Exam FM. Medium: example is the vault's own.
- sources_checked: SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §3 Macaulay and Modified Duration, (3.1)-(3.3), PDF p.5, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf; Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §3, (3.5)-(3.8), PDF p.6, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §54 Macaulay and Modified Durations, PDF p.471, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
