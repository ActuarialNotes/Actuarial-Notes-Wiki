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
