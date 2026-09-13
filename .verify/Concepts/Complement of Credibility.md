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
