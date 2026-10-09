---
target: Concepts/Complement of Credibility.md
created: 2026-09-12
---

## [F-001] Boor's six desirable qualities: 'easy to compute' replaced by 'not subject to the same distortions'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- severity: major
- status: open
- locus: Paragraph "Boor's desirable qualities of a complement"
- claim: Lists: accurate, unbiased, statistically independent, logically related, available, and 'not subject to the same distortions as the base data'.
- evidence: Werner Ch. 12 p.224 (PDF p.236) quotes Boor 2004 pp.7-8 with the list: '1. Accurate 2. Unbiased 3. Statistically independent from the base statistic 4. Available 5. Easy to compute 6. Logical relationship to base statistic.' 'Easy to compute' is a distinct criterion the text expands on ('The calculations should also be relatively easy to perform and understand. This is particularly important when the actuary must provide justification to a third party (e.g., regulator)') and is the one item the page drops; 'not subject to the same distortions' is not a Boor criterion and duplicates independence. Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- source_rank: 2
- proposed_action: Replace the sixth item with 'easy to compute' and keep the six in Boor's order.
- applied: false
- fingerprint: 80df1390385b

## [F-002] First-dollar complements 1 and 2 mislabelled, losing the includes/excludes-subject distinction
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- severity: major
- status: open
- locus: Numbered list 'Werner & Modlin's six first-dollar complements', items 1 and 2
- claim: 1. 'Loss costs of a larger related group — the statewide or countrywide result for the same class.' 2. 'Loss costs of a larger group adjusted for known differences between it and the subject group.'
- evidence: Werner Ch. 12 p.225 (PDF p.237) lists Boor's six as: 'Loss costs of a larger group that includes the group being rated; Loss costs of a larger related group; Rate change from the larger group applied to present rates; Harwayne's method; Trended present rates; Competitor's rates.' Method 1 is the larger group CONTAINING the subject (p.226: 'The complement can be constructed to include or exclude the subject experience… regional data, including the state, should not be used as a complement if the state represents a large portion of the regional data'); method 2 is a SEPARATE but similar group (p.226: 'a homeowners insurer may use the contents loss experience from the owners forms to supplement the contents experience for the condos form'). The page uses method 2's name for method 1 and replaces method 2's name with an 'adjusted' variant, so the independence contrast that drives Werner's evaluation of the two is lost. Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- source_rank: 2
- proposed_action: Rename item 1 'Loss costs of a larger group that includes the group being rated' and item 2 'Loss costs of a larger related group', with the include/exclude contrast stated.
- applied: false
- fingerprint: 5e7a99e29e7c

## [F-003] Worked 'Harwayne's method' example omits the method's defining exposure re-weighting
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- severity: critical
- status: open
- locus: Example "Harwayne's Method", both the given data and the answer
- claim: Given State Y overall loss cost $310, State X overall $260 and State Y class loss cost $465, 'the Harwayne complement' for the class in State X is (465/310) x 260 = $390.
- evidence: Werner Ch. 12 pp.228-229 (PDF pp.240-241) works Harwayne's method in four steps: (1) average pure premium for the subject state A, L_A = (100(2.50)+125(4.00))/225 = 3.33; (2) each other state's pure premium RE-WEIGHTED BY STATE A'S CLASS EXPOSURE DISTRIBUTION, e.g. L̂_B = (100(3.16)+125(4.62))/225 = 3.97 — deliberately NOT state B's own overall 4.08, which carries B's class mix; (3) adjustment factor F_B = L_A/L̂_B = 3.33/3.97 = 0.84, applied to B's class-1 pure premium: 3.16(0.84) = 2.65; (4) combine the adjusted class-1 loss costs across states weighted by each state's class-1 exposures: (190(2.65)+180(2.67))/370 = 2.66. The page's computation divides by State Y's OWN overall loss cost, which is exactly the mix-contaminated quantity step (2) exists to remove, and the page supplies no class exposure distribution, so Harwayne's method cannot be performed on the data as given. A candidate who follows this page on a Harwayne computation question gets the wrong number. The page's own arithmetic is internally consistent (465/310 = 1.50; 310/260 = 1.19; 1.50 x 260 = 390). Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- source_rank: 2
- proposed_action: Rebuild the example on Werner's Table 12.5 shape — two classes, subject state plus two related states with exposures — and run the four steps; or relabel the present calculation as a simple relativity transfer and stop calling it Harwayne's method.
- applied: false
- fingerprint: 698e6562ad1a

## [C-001] Validation pass — disputed
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- status_set: disputed
- checks_run: Boor's desirable-qualities list diffed item by item against Werner p.224; the six first-dollar complements diffed against Werner p.225 and their evaluations pp.226-227; Harwayne's method re-derived step by step from Werner's Table 12.5 worked example (L_A = 3.33; reweighted L̂_B = 3.97, L̂_C = 3.46; F_B = 0.84, F_C = 0.96; adjusted class-1 2.65 and 2.67; exposure-weighted complement 2.66) and compared with the page's calculation; the trended-present-rates method checked against pp.229-230; the credibility-blend example recomputed from scratch (0.20(25%) + 0.80(6%) = +9.8%; at a +12% complement, +14.6%).
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 12 pp.223-230 (PDF pp.235-242), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- note: Disputed: an open critical finding (F-003) — the worked 'Harwayne's method' omits the exposure re-weighting that defines the method, and the data given makes the real method impossible. Two further major findings on the two memorisation lists. The blending example itself is correct.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Werner Ch.12 p.224 (PDF p.236) re-read this session: Boor's list is accurate, unbiased, statistically independent from the base statistic, available, easy to compute, logical relationship to base statistic. Paragraph rewritten to those six in Boor's order, each glossed from Werner's own sentences (error variance; not routinely higher or lower; error in the base statistic compounded; data readily available; easy to perform and understand, esp. for a regulator; explainable relationship). 'Not subject to the same distortions' and the unsourced 'independence is the one most often violated … over-weights it' sentence deleted.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Werner Ch.12 pp.225-227 (PDF pp.237-239) re-read: items 1 and 2 renamed to 'Loss costs of a larger group that includes the group being rated' (regional data for a state; may include or exclude the subject, which must not dominate - p.226) and 'Loss costs of a larger related group' (separate but similar group, owners-form contents for condos; generally biased, but not containing the subject it may beat method 1 on independence - pp.226-227). Item 3 reworded to Werner's 'rate change indicated for a larger group applied to the current loss cost of the subject'; item 6 to 'Competitors' rates' (Werner p.231; 'bureau' dropped).

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Werner Ch.12 pp.228-229 (PDF pp.240-241, Table 12.5) re-read and its four steps re-derived (L_A 3.33; L̂_B 3.97, L̂_C 3.46; F 0.84/0.96; 2.65/2.67; C 2.66). Example rebuilt on that shape with new numbers: State X classes 1/2 exposures 200/300, PP 3.00/5.00; Y 400/200 at 3.60/6.00; Z 300/600 at 2.50/4.00. Step 1 L_X = (600+1500)/500 = 4.20; step 2 L̂_Y = (200x3.60+300x6.00)/500 = 5.04, L̂_Z = (200x2.50+300x4.00)/500 = 3.40; step 3 F_Y = 0.833, F_Z = 1.235, adjusted class-1 3.00 and 3.09; step 4 C = (400x3.00+300x3.09)/700 = 3.04 (unrounded 3.038). All recomputed in python. The answer also shows the mix-contaminated shortcut the old example used (Y's own average 4.40 → 3.60x4.20/4.40 = 3.44) and why step 2 removes it, and closes with Werner's evaluation (unbiased, reasonably accurate, mostly independent, time-consuming, harder to explain - p.229).

## [F-004] 'Level vs change' complement bullet and 'same basis' bullet not in the source; trended present rates misdescribed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: major
- status: open
- locus: 'Further points' bullets 1-2; numbered list item 5
- claim: Bullet 1: 'A level complement (methods 1, 2, 6) … a change complement (methods 3, 5) assumes only that the direction and size of movement transfers, which is a weaker and often safer assumption.' Item 5: 'Trended present rates — the current rate, trended forward; effectively "no change plus inflation".' Bullet 2: 'same limits, same coverage, same trend and development treatment … drags the answer backwards in time.'
- evidence: Werner Ch.12 does not classify complements as level or change. Trended present rates (pp.229-230, PDF pp.241-242) is the subject's current rate, first adjusted to the previously INDICATED rather than implemented rate (C = present rate x loss trend factor x prior indicated / prior implemented loss cost change; $200 x 1.05^2 x 1.10/1.06 = $229), and trended from the original target effective date - neither a 'change' complement nor 'no change plus inflation'. Werner's actual point on method 3 (p.227, PDF p.239) is that it mitigates the bias of a larger related group's loss costs and is largely unbiased even when overall loss costs differ. The 'same basis' list is not in Werner; the nearest is ASOP 25 as quoted on p.223 (PDF p.235): related experience should have frequency, severity or other determinable characteristics reasonably expected to be similar, and if it does not or cannot be adjusted to meet that, should not be used.
- source_rank: 2
- proposed_action: Replace bullet 1 with Werner's evaluation of method 3, bullet 2 with the ASOP 25 criterion as Werner quotes it, and item 5 with Werner's two adjustments.
- applied: true
- fingerprint: 0da4d6af5f26

## [F-005] Blending example: 'one-for-one' sensitivity and new-territory rationale
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: Example 'The Complement Drives a Low-Credibility Indication', answer paragraphs 2-3
- claim: 'it would move nearly one-for-one with it'; method 3 'is a reasonable pick for a new territory, because there is no historical rate for the territory to trend'.
- evidence: Recomputation: with Z = 0.20 the result moves 0.80 per point of complement (6% → 12% moves the result 9.8% → 14.6%, i.e. 4.8 for 6), not one-for-one. Werner Ch.12 p.227 (PDF p.239) defines method 3 as the larger group's indicated change applied to the subject's CURRENT loss cost, so it needs exactly the present rate the page says a new territory lacks; the page's rationale contradicts the method's definition.
- source_rank: 2
- proposed_action: State the 0.8 sensitivity, make the territory an existing one, and justify method 3 with Werner's evaluation (largely unbiased; independence depends on relative size) and p.223's 'complement can often be more important than the observed data'.
- applied: true
- fingerprint: 10a353f8f94d

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-004
- status: resolved
- note: Applied: bullet 1 now Werner p.227's evaluation of method 3; bullet 2 the ASOP 25 criterion as quoted on Werner p.223 with trended present rates as the worked case; item 5 now Werner pp.229-230's two adjustments (to the prior indicated rate; trend from the original target effective date). The reserving bullet was also re-checked: Friedland Ch.9 p.156 (PDF p.162) - BF as credibility weighting with Z = 1/CDF and the complement on the expected claims method; Ch.10 p.174 (PDF p.180) - Cape Cod's primary difference is deriving the expected claim ratio from reported claims experience rather than an independent, often judgmental selection; bullet reworded to those.

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-005
- status: resolved
- note: Applied: stem now an existing territory with the statewide indicated change applied to its present rates; answer states 4.8 of 9.8 points from the complement and a 0.8 sensitivity (+12% complement → 0.2x25 + 0.8x12 = 14.6%, recomputed), and justifies method 3 from Werner pp.223 and 227.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: All three open findings re-checked against Werner Ch.12 this session and fixed; Harwayne rebuilt and every step recomputed in python before writing; the blend example recomputed (0.2x25+0.8x6 = 9.8; at 12, 14.6); the first-dollar list, Boor's qualities, the excess list (increased limits, lower limits, limits analysis, fitted curves - p.231) and the lead's 'complement can be more important than the data' (p.223) diffed against the text; the BF/Cape Cod bullet against Friedland Ch.9-10.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 12 pp.223-231 (PDF pp.235-243), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 9 p.156 (PDF p.162), Ch. 10 p.174 (PDF p.180), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Every claim now traceable to Werner Ch.12 or Friedland Ch.9-10. Confidence medium: both worked examples are vault-authored (recomputed). Two further findings (F-004 major, F-005 minor) opened, applied and resolved in this run.
