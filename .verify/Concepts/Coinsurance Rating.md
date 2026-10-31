---
target: Concepts/Coinsurance Rating.md
created: 2026-10-31
---

## [F-001] Coinsurance clause formula missing the cap at the face amount
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- severity: major
- status: open
- locus: second display formula; sentence 'Fall short and every partial loss is settled at the ratio…'
- claim: Recovery = min(Insurance Carried / (Coinsurance % x Value), 1) x Loss, and every partial loss is settled at the ratio.
- evidence: Werner Ch.11 pp.209-210 (PDF pp.221-222): I = min(L x F/(cV), F), so the indemnity never exceeds the face amount F; and a penalty arises only when L > 0, F < cV and L < cV. Werner's own illustration (V $500,000, F $300,000, c 80%): a $450,000 loss pays $300,000 (L x F/cV = $337,500 is capped at F), penalty 0. The page's formula gives $337,500, more than the policy's face. Likewise a partial loss at or above cV is paid in full up to F, not at the ratio.
- source_rank: 2
- proposed_action: Transcribe Werner's formula, I = min(L x F/(cV), F), and limit the ratio sentence to losses below the insurance required.
- applied: true
- fingerprint: 0e8d3761e3ee

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Applied: the formula now reads min(Insurance Carried/(Coinsurance % x Value) x Loss, Insurance Carried), and the sentence now says every loss smaller than the insurance required is settled at the ratio. Example 2 ($200,000 loss, below F) is unaffected: $150,000, penalty $50,000.

## [F-002] Reading's rate approach and ITV initiatives missing
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- severity: major
- status: open
- locus: whole page (no section)
- claim: The page prices coinsurance as the participation share and the penalty clause only.
- evidence: Werner Ch.11's coinsurance material (Key Concepts p.215, PDF p.227: '5. Insurance to Value (ITV) — a. Importance of ITV; b. Coinsurance i. Penalty ii. Varying rates based on ITV level; c. ITV initiatives') has two parts the page does not carry: (1) the rate approach, rate = expected indemnity / face value, with the rate per amount of insurance falling as face approaches value, at a decreasing, constant or increasing rate for right-skewed, uniform and left-skewed loss distributions (pp.211-212, PDF pp.223-224); (2) ITV initiatives (guaranteed replacement cost and its cap, property estimation tools, inspections, indexation, pp.212-213). Also absent: Werner's point that inequity arises only because partial losses are possible and that uniform underinsurance leaves rates equitable though inadequate (p.208), and the shape of the penalty by loss size (rises linearly to F, falls to zero at cV, p.211). Objective A14 names coinsurance; a candidate studying from this page misses half the reading's treatment.
- source_rank: 2
- proposed_action: Add the rate approach and ITV initiatives from Werner Ch.11 (authoring, not done here).
- applied: false
- fingerprint: 691a46f8825b

## [F-003] Percentage-participation half not in the Exam 5 reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- severity: minor
- status: open
- locus: lead; 'Percentage participation' paragraph and its two bullets; Example 'Pricing a Participation Plan'
- claim: Coinsurance Rating prices two provisions, one of them an 80/20 percentage participation whose loss cost scales by c while claim-handling and fixed expenses do not fall.
- evidence: Werner, the only Exam 5 reading on coinsurance (full-text 'coinsurance' at PDF pp.200, 221-224, 226-227), treats coinsurance solely as the property coinsurance clause / ITV ('Coinsurance implies that two or more parties are jointly participating … the two parties are the insurer and the insured', p.209). 'percentage participation' occurs zero times. The participation example's arithmetic reproduces ((780+120)/0.75 = $1,200; (624+120)/0.75 = $992, -17.3%) and uses Werner's rate formula, but the claims about the participation provision itself (and that LAE does not fall with the payment share) have no source here.
- source_rank: 2
- proposed_action: Cite a source for the participation provision or reduce the page to the reading's coinsurance clause.
- applied: false
- fingerprint: fd3e0393dfb1

## [F-004] Unsourced insurance-to-value claims
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- severity: minor
- status: open
- locus: coinsurance clause bullets 1 and 3
- claim: An insured carrying 50% of value would pay half the premium 'for nearly the same expected recovery'; books with poor ITV 'show higher loss ratios per $1,000 of stated value, which is mix, not cost'.
- evidence: Werner pp.207-208 (PDF pp.219-220): underinsurance makes premium insufficient for the underinsured home and rates inequitable; if all homes are equally underinsured, premium may be inadequate but equitable. The intent of the clause is 'greater equity among risks, though more so through the payment of losses than the adequacy of rates' (p.209). 'Nearly the same expected recovery' depends on the loss distribution (Werner's 80%-insured example recovers 96% of expected loss, $120k of $125k), and the mix-not-cost characterisation is in no source read.
- source_rank: 2
- proposed_action: Restate in Werner's equity/adequacy terms.
- applied: false
- fingerprint: ff2dd9d65ac9

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- status_set: in_review
- checks_run: Router left this concept unnamed; searched Werner for 'coinsurance' and 'insurance to value' and read Ch.11's ITV section in full (PDF pp.218-227) before re-reading the page. Clause formula and penalty conditions against pp.209-210 (F-001, fixed). Coverage of the section walked against its Key Concepts list (F-002). Both examples recomputed before reading the answers: participation $1,200 → $992 (-17.3%); clause cV $800,000, ratio 0.75, recovery $150,000, penalty $50,000, and the 33%/33% premium-recovery comparison. All reproduce. Wiki-links resolve.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 11 pp.188, 206-215 (PDF pp.200, 218-227), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Not verified: an open major omission (F-002, the reading's rate approach and ITV initiatives) needs new prose, which a validation pass may not write, and the percentage-participation half (F-003) has no source in the Exam 5 reading.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:42Z/4730
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Resolved by the rewrite, checked against Werner Ch.11 this run. Rate approach: rate = f x E[min(L,F)] / F matches p.212 (PDF p.224, read as an image) in empirical form; falls as F approaches V, decreasing / constant / increasing rate for right-skewed / uniform / left-skewed, coinsurance as the part of a loss above face, the loss distribution the major difficulty — all p.212. ITV initiatives: GRC above the limit at 100% ITV, capped (e.g. 125%) after 1990s catastrophes; component property estimation tools at new business and renewal; inspections, indexation, education; additional premium without a rate increase exceeding added losses because small losses predominate; actuary estimates the effect — pp.212-213 (PDF pp.224-225). Partial-loss / uniform-underinsurance points pp.208-209 (PDF pp.220-221); penalty shape (linear to F, falls to zero at cV, uncovered excess above cV) and value-establishment condition p.211 (PDF p.223).

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:42Z/4730
- date: 2026-10-31
- resolves: F-003
- status: resolved
- note: Resolved: the percentage-participation half, its 80/20 plan and its pricing example are gone ('participation', '80/20' zero hits on the page). The page now carries only Werner Ch.11's coinsurance clause and rate approach.

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:42Z/4730
- date: 2026-10-31
- resolves: F-004
- status: resolved
- note: Resolved: 'nearly the same expected recovery' and 'higher loss ratios per $1,000 of stated value ... mix, not cost' are gone. The ITV bullet now states Werner pp.208-209's terms: payment short of the loss above face, full-ITV rate collecting too little premium on an underinsured home (inequitable), uniform underinsurance inadequate but equitable with the base rate drifting to actual ITV, both only because partial losses are possible.

## [C-002] Comment
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:42Z/4730
- date: 2026-10-31
- note: Conflict inside the source, logged rather than filed against the page: Werner & Modlin Ch.11 p.212 (PDF p.224) says 'Right-skewed distribution (i.e., small losses predominate)', while p.213 (PDF p.225) says 'homeowners loss distributions tend to be left-skewed (i.e., small losses predominate)'. Both read this run (p.212 as a page image). The page uses 'right-skewed' with p.212, writes the p.213 point as 'because small losses predominate in homeowners' without the skew label, and its Exam traps names the discrepancy with both page numbers. That is the reading's own inconsistency transcribed faithfully; no change proposed.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:42Z/4730
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: Read Werner Ch.11 pp.206-215 before re-reading the page; formulas checked against the page images (I = L x F/cV with I <= F and I <= L, p.210; a = min(F/cV, 1), p.209; penalty cases L-I / F-I / 0, p.210; empirical rate formula, p.212). Each bullet's page reference checked (pp.208-213). A14 wording (coinsurance among alternative ratemaking procedures) against the Fall 2026 outline p.4. Examples recomputed before reading answers: (1) cV = 576,000, a = 5/6; L 120k -> I 100k, e 20k; L 540k -> I 450k, e = F - I = 30k; L 600k -> 500k capped at 480k, e 0, 120k uninsured; max e at L = F = 80k. (2) E[min(L,F)] 112.5 / 130 / 135 (000); pure premium 2,250 / 2,600 / 2,700; rate per 1,000 11.25 / 8.67 / 6.75, steps 2.58 then 1.92, decreasing at a decreasing rate; 2,700/2,250 = 1.20. (3) 300 x 6.75 = 2,025 vs 2,600; 400 x 6.75 = 2,700 vs 2,700; +675 premium, +100 loss, 575 shortfall. All match. Exam-section shapes consistent with the bank's CAS papers (cas5-2013f-013 adequacy/equity discussion, cas5-2016f-q14 penalty and max penalty, cas5-2019f-014 two coinsurance percentages, cas5-2018f-013 rate per 1,000 by amount of insurance). Wiki links and figure resolve.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.11 pp.206-215 (PDF pp.218-227; pp.210-212 read as page images), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; CAS Exam 5 Content Outline, Fall 2026 (Exam_5_CO_2026_F v02), p.4 task A14, sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf
- note: Verified. F-002, F-003, F-004 resolved by the rewrite; Werner's own skewness inconsistency (pp.212 vs 213) logged as a comment, handled honestly on the page.
