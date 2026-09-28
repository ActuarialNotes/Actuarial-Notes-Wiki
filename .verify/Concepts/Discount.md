---
target: Concepts/Discount.md
created: 2026-09-28
---

## [F-001] Discount defined against face value; the coupon-vs-yield test holds only when redemption value equals face
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: opening definition line 14 and first bullet line 18
- claim: A discount bond is a bond whose price P is below its face value (redemption value) F ... Occurs when the coupon rate is below the yield rate; the gap F - P is earned through accumulation of discount.
- evidence: FIN §44 p.396 defines the discount against the redemption value C (P < C, discount C - P) and gives Premium = P - C = (Fr - Ci)a_n = C(g - i)a_n, so the bond is at a discount exactly when Fr < Ci, i.e. the modified coupon rate g = Fr/C is below the yield. NOTE p.2: the redemption value equals the face amount only 'unless otherwise stated in the examination question'. Under that default (C = F) the page is right, and SOA-S Q42 p.13 uses exactly that test ('Given the coupon rate is less than the yield rate, the bond sells at a discount'). Recomputation with C != F: F=1000, r=5%, C=1100, i=5.2%, n=10 gives P=1044.94 - coupon rate below yield, yet P is above the face value 1000 (it is below C=1100, i.e. a discount bond by FIN's definition). The page writes F for both face and redemption value and states no C = F condition.
- source_rank: 3
- proposed_action: Maintainer: define the discount against the redemption value C (discount = C - P) and state the coupon-vs-yield test as Fr < Ci (g < i), noting it reduces to coupon rate < yield when C = F, the FM default (NOTE p.2).
- applied: false
- fingerprint: 2eb51b5bdb0f

## [F-002] Exam 5 question cas5-2016s-q12 links this bond-discount page for a rating discount
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: whole page (definition line 14) vs questions/exam-5/cas5-2016s-q12.md wiki_link line 13
- claim: A discount bond is a bond whose price P is below its face value (redemption value) F.
- evidence: questions/exam-5/cas5-2016s-q12.md tags Concepts/Discount (line 13), but its 'Discount' is a claim-free premium discount in a rating algorithm (table 'Years Since Claim | Discount: Current | Discount: Proposed', applied as an average discount factor 1 - sum(discount x exposures)/900 = .8667 in its explanation). A CAS Exam 5 reader following the link lands on bond pricing, which says nothing about that usage. A legitimate difference of meaning between SOA FM and CAS Exam 5 - flagged, not reconciled; the FM sense on this page is correct (SOA-S Q42 p.13, FIN §44 p.396). Evidence for the Exam 5 sense is the vault question file (rank 4); the CAS paper was not read in this pass. The other question linking the page, fm-047 (bond purchased at a discount), fits it.
- source_rank: 4
- proposed_action: Maintainer: retag cas5-2016s-q12 to an Exam 5 rating/discount concept, or add a disambiguation line to this page naming the ratemaking sense.
- applied: false
- fingerprint: 217fd64f26ea

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition P < F vs FIN §44 p.396 (P < C; discount = C - P) and NOTE p.2 (C = F unless stated); coupon rate < yield -> discount vs SOA-S Q42 p.13 (text, no math) and FIN p.396 C(g-i)a_n; book value written up to redemption at maturity vs FIN p.397; 'accumulation of discount' is a syllabus term (SYL Topic 4 a), p.4). Worked example (vault's own, qualitative) recomputed: 1000 par, 4% annual coupons at 6% yield gives P<1000 for any term (n=1: 981.13, n=10: 852.80, n=30: 724.70). Links resolve (Bonds, Face Value, Accumulation of Discount, Premium); \$$1{,}000$ is the working escaped-dollar spelling per vaultMath.ts. Not linked from any exam page; linked from Concepts/Premium.md, fm-047 (fits) and cas5-2016s-q12 (does not - F-002). Two minor findings open.
- sources_checked: SOA Exam FM Sample Solutions (rev. Aug 2026), Q 42, solutions PDF p.13, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds, learning outcome a), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §44, PDF p.396-397, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
