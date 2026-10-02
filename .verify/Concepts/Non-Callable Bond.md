---
target: Concepts/Non-Callable Bond.md
created: 2026-09-28
---

## [F-001] 'Bullet bond' given as a synonym without a source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: opening sentence, line 14
- claim: 'A **non-callable bond** (also called a **bullet bond**) cannot be redeemed by the issuer before its stated maturity date.'
- evidence: 'Bullet' occurs zero times in the FM syllabus, the SOA notation note, the SOA sample questions and solutions, Broverman FM-23-05, Alps FM-24-17 and Finan (full-text search of each dump). The syllabus names only 'callable/non-callable' (SYL 4a, PDF p.4). Whether the two terms are synonymous could not be confirmed from any source read.
- source_rank: 1
- proposed_action: Maintainer: source the synonym or delete the parenthetical.
- applied: false
- fingerprint: 254e62620028

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition and call/reinvestment-risk contrast vs FIN §47 p.420 and Investor.gov ('Callable bonds are more risky for investors than non-callable bonds because an investor whose bond has been called is often faced with reinvesting the money at a lower … rate'); 'with certainty' matches FIN §43 p.384 assumptions (default ignored, fixed maturity); price formula vs FIN p.385. Example recomputed in one python script (work/c-bonds.py): 70a_8|5% = 452.4249, 1000v^8 = 676.8394, P = 1129.2643 → 1129.26, correct; premium since 7% > 5% (C = F). Example title says 'vs. Callable' but prices only the non-callable bond (nit, not filed). F-001 minor open. Links and figure resolve. Example is the vault's own, so medium.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §43 The Various Pricing Formulas of a Bond, PDF p.384-385, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §47 Callable Bonds and Serial Bonds, PDF p.420, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; U.S. SEC Investor.gov glossary, Callable or Redeemable Bonds (web page read 2026-09-28), sha256:db86cee96b21a36c190fcf34f474a1cbc56064484f608c5262ab6b487ad6fe5b — https://www.investor.gov/introduction-investing/investing-basics/glossary/callable-or-redeemable-bonds

## [F-002] Example titled 'vs. Callable' prices only the non-callable bond; premium test stated without C = F
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- severity: nit
- status: open
- locus: example title and closing line
- claim: 'Non-Callable vs. Callable Pricing' / 'This bond is priced at a **premium** since coupon rate (7%) > yield (5%).'
- evidence: The example prices one non-callable bond and never a callable one (noted as a nit by the 2026-09-28 pass, not filed). The premium conclusion is right only because C = F here (SOA S421 p.110: premium means P > C; FIN p.396: premium iff g = Fr/C > i; NOTE p.2: C = F by default) — the same face-value wording this run corrects on Premium, Discount, Face Value and Market Value. The closing line also ran on in one paragraph with the formula line.
- proposed_action: Retitle 'Pricing a Non-Callable Bond', state redeemable at par, give the premium test as P > C with C = F, and separate the sentence from the formula line.
- applied: true
- fingerprint: 4c78cee730c6

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-002
- status: resolved
- note: Retitled the example 'Pricing a Non-Callable Bond'; the stem says redeemable at par; the closing line reads premium (P > C = 1,000) since, with C = F, the coupon rate 7% exceeds the 5% yield, and notes there is no call date to test; a blank callout line now separates it from the formula line.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Deleted '(also called a **bullet bond**)'. No source read in either run supports it: 'bullet' occurs in none of the FM syllabus, SOA's notation note, the SOA sample questions/solutions, FM-23-05, FM-24-17 or Finan (full-text search of each), and the syllabus names only callable/non-callable (SYL p.4). A 'bullet' repayment describes a single principal payment at maturity, which is not the same property as the absence of a call, so the synonym is not kept without a citation.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: New version re-read. Definition and the call/reinvestment-risk contrast vs FIN p.420 ('Callable bonds are more risky for investors than non-callable bonds because an investor whose bond has been called is often faced with reinvesting the money at a lower … rate'); certainty of the cash flows vs FIN p.384 assumptions (default ignored, fixed maturity); callable/non-callable as a syllabus term vs SYL p.4; price formula vs FIN p.385; unsourced 'bullet bond' synonym removed (F-001). Example recomputed in python: a_8|5% = 6.463213, 70a = 452.424893, 1000v^8 = 676.839362, P = 1129.264255 → 452.42 + 676.84 = 1129.26 as printed; premium P > C with C = F vs SOA S421 p.110 and NOTE p.2. Links and figure resolve; validate_links.py --studiable clean. Example is the vault's own, so medium.
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.384-385, p.420, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Financial Mathematics Exam syllabus, December 2026, p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 421, solutions PDF p.110, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf
