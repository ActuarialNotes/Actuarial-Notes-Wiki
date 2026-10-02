---
target: Concepts/Bond Amortization.md
created: 2026-09-28
---

## [F-001] Page is an empty placeholder
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: whole page
- claim: '**Bond Amortization** — concept summary to be written.' and 'Example to be added.'
- evidence: The page has no definition, formula or example to check. The syllabus examines the content it should carry (SYL Topic 4, outcomes a)-b), PDF p.4: book value, amortization of premium, accumulation of discount); FIN §44 p.396-398 and BA2 p.21 describe the bond amortization schedule (interest earned i·B_{t−1}, principal adjustment Fr − i·B_{t−1}, book value after each coupon).
- source_rank: 1
- proposed_action: Maintainer: write the page (the bond amortization schedule) or point it at [[Book Value]], [[Amortization of Premium]] and [[Accumulation of Discount]].
- applied: false
- fingerprint: c5e9bef56e5a

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: in_review
- checks_run: Read the page: placeholder text only, no claims, no links, no LaTeX; confirmed against SYL/FIN/BA2 what the topic covers. Nothing to verify.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a)-b), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §44 Amortization of Premium or Discount, PDF p.396-398, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus (SOA study note FM-23-05), PDF p.21, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf
- note: Empty placeholder (F-001). Stays in_review until content exists.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Wrote the page: bond amortization as the split of each coupon into interest earned I_t = jB_{t−1} and principal adjustment PR_t = Fr − I_t = (Fr − Cj)v^{n−t+1}, with B_t = B_{t−1} − PR_t from B_0 = P to B_n = C (FIN §44 p.396-397; FM-23-05 p.21 'bond amortization … in much the same way … as loan amortization'); the sign convention (write-down for a premium, write-up for a discount) linking out to [[Amortization of Premium]] and [[Accumulation of Discount]] rather than repeating them; the schedule's properties — adjustments geometric with ratio 1 + j, summing to P − C; interest summing to nFr − (P − C) (FIN p.398 observations 1-3); and finding one row from B_{t−1} alone (FIN p.399). Two examples, both recomputed in python: (1) a full 3-row schedule for a bond redeemable at 1,050 on a 1,000 face (8% coupons, 7% yield): P = 1,067.058, rows 74.694/5.306/1,061.752, 74.323/5.677/1,056.075, 73.925/6.075/1,050.000, totals 222.942 and 17.058 = P − C — the book value runs to C, not F; (2) one row of a long schedule, FM-23-05 p.21's own bond (1,000 face, 5% per period, 20 periods, 6%): B_4 = 898.94, I_5 = 53.94, PR_5 = −3.94, B_5 = 902.88, price 885.30 — matching Broverman's calculator output. Defines the sense the 10 FM questions tagged 'Bond Amortization' use (fm-007, 047, 097, 098, 138, 140, 216, 281, 318, 326: interest portion, amortization/accumulation in a given coupon, book value).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: New page checked line by line. I_t = jB_{t−1}, PR_t = Fr − I_t = C(g − j)v^{n−t+1} = (Fr − Cj)v^{n−t+1}, B_t = B_0 − ΣPR_k, B_0 = P, B_n = C vs FIN p.396-397; premium write-down / discount write-up vs FIN p.396-397 and SOA S421 p.110 (premium is P > C); geometric ratio 1 + j, ΣPR = premium/discount, ΣI = coupons − ΣPR vs FIN p.398; one row from the book value at the start of the period vs FIN p.399; the schedule as a loan-style amortization vs FIN p.396 and FM-23-05 p.21; book value and amortization/accumulation are syllabus terms (SYL p.4, outcomes a-b). Example 1 recomputed in python: a_3|7% = 2.624316, P = 1067.058054; exact rows 74.6941/5.3059/1061.7521, 74.3226/5.6774/1056.0748, 73.9252/6.0748/1050.0000, ΣI = 222.941946, ΣPR = 17.058054 = P − C; the 3-decimal table is internally consistent row by row (0.07 × 1067.058 = 74.694, 0.07 × 1061.752 = 74.323, 0.07 × 1056.075 = 73.925) and matches the exact values; PR_t formula agrees on every row. Example 2 recomputed: a_16|6% = 10.105895, v^16 = 0.393646, B_4 = 898.941047, I_5 = 53.936463, PR_5 = −3.936463, B_5 = 902.877510 (= 50a_15 + 1000v^15), P = 885.300788 — all as printed and as FM-23-05 p.21 prints (902.88, 3.94, 53.94, 885.30). Links resolve (Coupon, Bonds, Book Value, Redemption Value, Amortization Schedule, Premium, Discount, Amortization of Premium, Accumulation of Discount); no figure embedded; validate_links.py --studiable clean. Examples are the vault's own or FM-23-05's, so medium.
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.396-399, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA study note FM-23-05, Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus, p.21, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf; SOA Financial Mathematics Exam syllabus, December 2026, p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 421, solutions PDF p.110, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf
