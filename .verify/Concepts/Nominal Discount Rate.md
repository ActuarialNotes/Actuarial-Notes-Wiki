---
target: Concepts/Nominal Discount Rate.md
created: 2026-09-28
---

## [F-001] Page is an empty placeholder
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: whole page, lines 14-18
- claim: Nominal Discount Rate — concept summary to be written. ... Example to be added.
- evidence: The page has no definition, formula or example. It is the `topic` of five FM questions (fm-009, fm-076, fm-172, fm-214, fm-349) and is linked from two resource pages (Francis & Ruckman 3.06, Broverman 1.5.4), so readers land on it. The sources define the concept: NOTE p.1 (d^(m), the nominal rate of discount payable m times per period), FIN §9 p.68-69 (d^(m)/m per mth of a period, paid at the beginning; 1 - d = (1 - d^(m)/m)^m; d^(m) = m[1 - v^(1/m)]), SOA-S Q214 p.54 (100(1 - 0.12/4)^(-4n)). The vault already carries that content on Concepts/Nominal Discount Rate Convertible m-thly.md.
- source_rank: 1
- proposed_action: Maintainer: write the page from NOTE p.1 / FIN §9, or make it point to Nominal Discount Rate Convertible m-thly.
- applied: false
- fingerprint: af3d4fbb7c75

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: in_review
- checks_run: Page read in full: placeholder with no claims to check (F-001). Sources that define the concept located (NOTE p.1, FIN §9 p.68-69). Inbound links: 5 FM question topics, 2 resource pages; no exam page links it.
- sources_checked: SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §9, PDF p.68-69, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
- note: Nothing to verify: the page is an empty placeholder. Left in_review with a minor finding.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Page written: definition of d^(m) (quoted annual rate, d^(m)/m charged at the beginning of each mth; NOTE p.1, FIN §9 p.68), the accumulation function a(t) = (1 - d^(m)/m)^(-mt) (FIN §9 p.68) and its present-value reciprocal, the non-integer case m = 1/2 ('compounded every two years', as SOA Q349's solution uses: (1 - d^(1/2)/0.5)^(-0.5t)), and a pointer to Nominal Discount Rate Convertible m-thly for the conversion d^(m) = m[1 - v^(1/m)] rather than duplicating it. Two examples, recomputed in python: 1000(0.98)^-12 = 1274.35 vs 1000(1.02)^12 = 1268.24 (effective 8.417% vs 8.243%; 0.02/0.98 = 2.041%, FIN (8.1)); 5000(0.8)^3 = 2560 with d = 1 - 0.8^0.5 = 10.557%. Serves the five FM questions that take it as topic (fm-009, 076, 172, 214, 349).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: New page. Definition (nominal rate of discount payable m times per period; d^(m)/m effective per mth, paid at the beginning) vs NOTE p.1 and FIN §9 p.68; a(t) = (1 - d^(m)/m)^(-mt) vs FIN §9 p.68, PV (1 - d^(m)/m)^(mt) vs FIN Ex.9.5(b)/9.6 p.69; m = 1/2 (compounded every two years) vs SOA-S Q349 p.92 (image: (1 - d^(1/2)/0.5)^(-0.5(0.4)), d^(1/2) = 0.20063); conversion formula deferred to the m-thly page (same as FIN §9 p.69). Examples recomputed in python: 0.98^-12 x 1000 = 1274.345, 1.02^12 x 1000 = 1268.242, 0.98^-4 - 1 = 0.084166, 1.02^4 - 1 = 0.082432, 0.02/0.98 = 0.020408 (FIN (8.1) p.57); 5000 x 0.8^3 = 2560, 1 - 0.8^0.5 = 0.105573. align* fences on own lines; links resolve. Medium: worked examples are the vault's own.
- sources_checked: SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.57, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.68-69, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 349, solutions PDF pp.92-93, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf
