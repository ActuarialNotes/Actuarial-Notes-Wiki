---
target: Concepts/Macaulay Duration.md
created: 2026-09-28
---

## [F-001] Perpetuity duration given without the payment-timing condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: third bullet
- claim: 'For a [[Perpetuity]], D_{Mac} = (1+j)/j = 1/d years'
- evidence: The value holds for a level perpetuity-IMMEDIATE: SOA Q31 (questions PDF p.15, payments 'at the end of each year') / S31 (solutions p.10): duration = 1/d = 1.1/0.1 = 11; S144 (p.39): 'perpetuity-immediate', D = (1+i)/i. For a perpetuity-due the same definition (DUR (3.1) p.5) gives Σ_{t≥0} t v^t / Σ_{t≥0} v^t = 1/i — recomputed in python at 10%: 10.0 versus 11.0, one full period less. The linked [[Perpetuity]] page covers both kinds, so the unqualified statement is wrong for half of them.
- source_rank: 1
- proposed_action: Maintainer: qualify it as a level perpetuity-immediate (payments at the end of each period).
- applied: false
- fingerprint: 79dfd1b7777f

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: Formula Σt·C_t v^t / ΣC_t v^t vs DUR (3.1) p.5 (image) and NOTE p.2 ✓; ΣtPV/P form ✓; D_mod = D_mac/(1+j) vs DUR (3.3) ✓; 'measured in time units' vs DUR §2 p.4 ✓; perpetuity (1+j)/j = 1/d vs S31/S144 ✓ for perpetuity-immediate only → F-001 (major, open). Example recomputed: 100/1.05 = 95.24, 1100/1.05^2 = 997.73, P = 1092.97, 95.24 + 1995.46 = 2090.70, D = 1.91286 → 1.913 ✓. Links and figure resolve; linked only from Exam FM. Low: a major is open.
- sources_checked: Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §3 Macaulay and Modified Duration, (3.1)-(3.3), PDF p.5, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf; Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §3, (3.5)-(3.8), PDF p.6, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 31, questions PDF p.15, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 31, solutions PDF p.10, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 144, questions PDF p.61, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 144, solutions PDF p.39, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Bullet now states the timing condition: for a level perpetuity-immediate (payments of 1 at the end of each period) D_Mac = (1+j)/j = 1/d, and says the formula does not apply to a perpetuity-due, which pays each amount one period sooner. Sources: SOA Q31 p.15 / S31 pp.10-11 (end-of-year payments, duration 1/d = 11 at 10%) and Q144 / S144 p.39 (perpetuity-immediate, D = 1 + 1/i). Python at 10%: sum t v^t / sum v^t over t = 1..3000 = 11.0000.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: D_Mac = sum t C_t v^t / sum C_t v^t vs FM-24-17 (3.1) PDF p.5 and notation note p.2 ✓; D_Mod = D_Mac/(1+j) vs (3.3) ✓; measured in time units ✓; perpetuity-immediate D = (1+j)/j = 1/d vs S31 and S144, with the end-of-period condition now stated ✓ (python 11.0000 at 10%). Example recomputed: 100/1.05 = 95.24, 1100/1.05^2 = 997.73, P = 1,092.97, D = 2,090.70/1,092.97 = 1.9129 → 1.913 ✓. Links and figure resolve. Medium: example is the vault's own.
- sources_checked: SOA study note FM-24-17, Alps, Using Duration and Convexity to Approximate Change in Present Value (2017), pp.5-6, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf; SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 31, questions PDF p.15, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 31, solutions PDF pp.10-11, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 144, solutions PDF p.39, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T19:34Z/bd53
- date: 2026-10-30
- status_set: verified
- confidence: medium
- checks_run: Diff vs HEAD: two added sections only ('Standard streams in annuity symbols', 'Moving the stream in time'); previously verified definition, D_mod, perpetuity-immediate bullet, figure and example byte-identical. Checked: scaling invariance (constant cancels) ✓; level annuity D = (Ia)_n/a_n vs Finan Ex 54.6 ✓; bond D = [Fr(Ia)_n + nCv^n]/P vs Finan Ex 54.3/54.5 ✓; par bond: j(Ia)_n + n v^n = ä_n via Finan (26.5), stated as a rule in SOA S50/S53 ✓ (python 8-period 5%: 6.78637 both); perpetuity-due 1/d - 1 = 1/j algebra ✓ (python 20.000 at 5%), consistent with Finan Prob 54.7; higher coupon lowers duration / zero-coupon = term vs Finan Ex 54.1, 54.3, 54.4 ✓; deferral by k adds k (weights v^(t+k) cancel v^k) stated in SOA S389 ✓, and k/(1+j) to D_mod via Finan ν = vd ✓; between payments duration falls one-for-one (v^(-s) cancels) stated in S53 ✓ — checker reworded 'just before the next payment' to 'provided no payment has been made in between (up to just before the next payment)' so the rule is not read as holding only at that instant; jump after a payment (time-0 payment in price, not numerator) vs S53 alternative ✓. No question's numbers on the page. LaTeX: inline $…$, one-line '> $$…$$' display, FM notation. Medium: the annuity-symbol and perpetuity-due forms rest on algebra from Finan's definitions; the par, deferral and time-passage rules are stated in SOA's published solutions.
- sources_checked: SOA study note FM-24-17, Alps, Using Duration and Convexity to Approximate Change in Present Value (2017), pp.5-6, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf; SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 31, questions PDF p.15, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 31, solutions PDF pp.10-11, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 144, solutions PDF p.39, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §54 Macaulay and Modified Durations, d as PV-weighted average time, Examples 54.1, 54.3-54.4 (coupon rate vs duration, zero-coupon = term), PDF pp.468-470, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §54, modified duration = vd, Examples 54.5-54.7 ((Ia)_n/a_n, perpetuity (Ia)_inf/a_inf), PDF pp.471-472, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §54 Problem 54.7 (perpetuity-immediate vs perpetuity-due duration), PDF p.476, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §26 Varying Annuity-Immediate, eq. (26.5) (Ia)_n = (ä_n - n v^n)/i, PDF p.235, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 50 and Q 53, solutions PDF pp.15-16 (par bond duration = annuity-due; just before the first coupon duration is one year less; numerators identical, extra coupon in the price), sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 389, solutions PDF p.103 (Macaulay duration a weighted sum of payment times, so deferring by six years adds exactly 6), sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf
- note: G8 re-check after writer addition: duration of standard streams (annuity, bond, par bond, perpetuity-due, coupon effect) and of a stream moved in time (deferral, time passage, after a payment)
