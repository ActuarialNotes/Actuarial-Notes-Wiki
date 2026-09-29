---
target: Concepts/Discount Rate.md
created: 2026-09-28
---

## [F-001] CAS Exam 6C and Exam 7 questions link this page for 'discount rate' in the sense of the interest rate used to discount
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: whole page (definition line 14, d = i/(1+i) line 16) vs wiki_link tags of CAS 6C/7 questions
- claim: The effective annual discount rate d is the interest paid at the beginning of a period on a loan of 1 ... d = i/(1+i).
- evidence: Seven CAS questions tag Concepts/Discount Rate: exam-7 cas7-2012-q12, cas7-2013-q11, cas7-2013-q12, cas7-2018-q18, cas7-2018-q19; exam-6c cas6c-2016s-q12, cas6c-2016s-q15. There 'discount rate' is the rate r in 1/(1+r)^t, not d: cas7-2018-q19 line 53 sets 'Discount Rate = 4.0% + 0.80 x 5.0% = 8.0%' (CAPM) and line 67 discounts by 1.08, 1.08^2, ...; cas6c-2016s-q15 gives 'Discount Rate' 5% (line 34) and discounts by 1.05^0.5, 1.05^1.5, ... (line 68). Read with this page's definition, an 8% 'discount rate' means v = 0.92 (i = 8.70%), so 5-year discounting gives 0.92^5 = 0.6591 instead of 1.08^-5 = 0.6806. The page is right for FM (NOTE p.1 d = i/(1+i); FIN §8 p.56-57); a legitimate SOA-vs-CAS difference of meaning - flagged, not reconciled. CAS-side evidence is the vault question files (rank 4); the CAS papers were not read in this pass. No exam page links [[Discount Rate]] other than Exam FM-2; Concepts/Return on Capital.md uses d in the FM sense (fits).
- source_rank: 4
- proposed_action: Maintainer: retag the seven CAS questions to a CAS concept (e.g. a risk-adjusted discount rate / Loss Reserve Discounting page), or add a line to this page saying that on CAS exams 'discount rate' usually means the interest rate r used in 1/(1+r)^t.
- applied: false
- fingerprint: 5d2f48faa08b

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition (interest paid at the beginning; borrower receives 1-d) vs FIN §8 p.56; d = i/(1+i) vs NOTE p.1 and FIN (8.2) p.57; d = iv, d = 1-v, i = d/(1-d) vs FIN (8.1),(8.3),(8.4) p.57 and SOA-S Q87 p.25 (image: i = (1-d)^-1 - 1 = 5.82%); d < i from i - d = id (FIN (8.5) p.57-58); (1 - d^(m)/m)^m = 1 - d vs FIN §9 p.69 and SOA-S Q9 p.5 (image: 1 - d/4 = 0.98867, d = 4.53%); d^(m) -> delta vs FIN Ex.10.11 p.84. Worked example (vault's own) recomputed: 0.08/1.08 = 0.074074, v = 0.925926, iv = 0.074074 - correct. Figure consistent. Syllabus term 'discount rate (rate of discount)' (SYL p.2). One minor cross-exam finding open (CAS 6C/7 tags).
- sources_checked: SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money, learning outcomes a)-c), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 87, solutions PDF p.25, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 9, solutions PDF p.5, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §8, PDF p.56-58, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §9, PDF p.69, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §10, PDF p.84, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Retagged the seven CAS questions off this FM page (d, the rate of discount), each to the page for the sense it uses; only that wiki_link entry changed, then verify_check.py --sync on each (they stay unverified). Exam 7 insurance-company valuation, where the 'discount rate' is the CAPM cost of equity r_f + beta(E[r_m] - r_f) used in 1/(1+k)^t: cas7-2012-q12, cas7-2013-q11, cas7-2013-q12, cas7-2018-q18, cas7-2018-q19 -> Concepts/Cost+of+Capital (whose formula is that CAPM k_E). Exam 6C: cas6c-2016s-q12 (a reinsurance commutation's financial considerations — the rate discounting the future claim cash flows) -> Concepts/Loss+Reserve+Discounting; cas6c-2016s-q15 (discounting net unpaid claims at 5% by 1.05^(t-0.5)) already links Loss+Reserve+Discounting, so the Discount+Rate link was dropped. No IFRS 17 question was among the seven (2016 papers, pre-IFRS 17). grep confirms no question outside exam-fm links Concepts/Discount+Rate now. The page itself is unchanged (it is right for FM: NOTE p.1, FIN §8).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: Page unchanged; re-checked: definition (interest in advance; borrower receives 1-d of a loan of 1) vs FIN §8 p.56; d = i/(1+i) vs NOTE p.1 and FIN (8.2) p.57; d = 1-v, d = iv, i = d/(1-d) vs FIN (8.4),(8.3),(8.1) p.57; d < i from i - d = id (FIN (8.5) p.57-58); (1 - d^(m)/m)^m = 1 - d = v vs FIN §9 p.69; d^(m) -> delta vs FIN Ex.10.11 p.84. Example recomputed in python: 0.08/1.08 = 0.074074, v = 0.925926, iv = 0.074074. Inbound question tags now FM only (fm-009, 076, 172, 214, 349, all d/d^(m) questions); the seven CAS tags were retagged (see resolution). Links resolve. Medium: worked example is the vault's own.
- sources_checked: SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.56-58, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.69, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.84, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
