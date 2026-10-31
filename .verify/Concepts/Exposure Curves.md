---
target: Concepts/Exposure Curves.md
created: 2026-10-18
---

## [F-001] Unsourced empirical claim in worked example
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- severity: minor
- status: open
- locus: Example 'Building a Curve from a Loss-Degree Distribution', closing sentence
- claim: A mean damage ratio of 55% is far heavier than real property experience, which is why fitted curves such as the Swiss Re family are much more concave.
- evidence: Neither Bernegger (pp.99-111) nor Clark (pp.17-19) states typical mean damage ratios for real property portfolios. Bernegger only shows that the one-parameter curves become more concave as c rises (Figure 4.2, p.111) and ties c = 5 to a Lloyd's curve for industrial risks (p.110). Recomputing mu from (3.5) with (4.6) gives mu ≈ 0.52, 0.23, 0.087, 0.032 at c = 1, 2, 3, 4, which does not contradict the sentence but does not source 'real property experience' either.
- source_rank: 2
- proposed_action: Cut the empirical comparison back to what Bernegger shows (the Swiss Re curves have far smaller expected values, e.g. mu ≈ 0.09 at c = 3), or cite a source for typical damage ratios.
- applied: false
- fingerprint: c33c31e8041b

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: every formula against Bernegger's page images and Clark p.17; properties G(0)=0, G(1)=1, G'(0)=1/mu, p=G'(1)/G'(0), F=1-G'/G'(0); MBBEFD general case and parameter ranges; Swiss Re c-curves; both examples recomputed (G for c=3 at 0.10/0.25/0.40 = 0.4056/0.6002/0.7163 from (3.3)+(4.6))
- sources_checked: Bernegger, The Swiss Re Exposure Curves and the MBBEFD Distribution Class (ASTIN Bulletin 27(1), 1997), pp.99-111 (§2.1-2.3 eqs (2.1)-(2.6), §3.2 eq (3.3), §4.1, §4.3 eqs (4.5)-(4.6), Fig. 4.2), sha256:5c07f557257622c9dd5f1886705a55de9f368fef1839dd405c87a8550f8a7c89 — https://www.casact.org/sites/default/files/2021-03/8_Bernegger.pdf; Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), pp.17-19 (exposure curve P(p), layer = P((R+L)/IV) - P(R/IV)), pp.27-29 (casualty ILFs / exposure factor), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf; CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (task A1-A3, readings Clark and Bernegger), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: All formulas and properties match Bernegger (2.1)-(2.4), (3.3), (3.8), (4.1)-(4.6). Example arithmetic resolves. 'Loss degree' and 'mean damage ratio' are the page's names for Bernegger's normalized loss x and E[x]. One minor unsourced empirical remark left open (F-001). Exam 9 only.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:54Z/2103
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Applied F-001's proposed cut: the sentence 'A mean damage ratio of 55% is far heavier than real property experience, which is why fitted curves such as the Swiss Re family are much more concave.' is deleted (no source read states typical property damage ratios; Bernegger shows only that concavity rises with c).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:54Z/2103
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: whole page: every formula and property against Bernegger's page images (2.1)-(2.6), (4.5)-(4.6); new bullets against Clark pp.18-19 word for word; the conditional-on-a-loss bullet re-derived: with mass q at zero, E[X∧d] and E[X] both scale by 1-q so G is unchanged, while G'(0) = (1-F(0))/E[X] = 1/E[X|X>0] and p = G'(1)/G'(0) are the conditional ones, matching Bernegger's F(0) = 0 in (2.3) and the 2017 Q18 Sample 2 (unrestated E[x] = 0.105, same G = 0.476/0.81/0.952); 90/6/3/1 example (mu 0.40, p 0.10, g 10); midpoint example G(3/4)-G(1/4); PP/IV example 1.5%; both collapsed examples recomputed (0.3736; G for c = 3 at 0.10/0.25/0.40 = 0.4056/0.6002/0.7163 recomputed from (3.3)+(4.6); $138,144); rule 10: no example carries a question's figures (2012 Q10, 2016 Q21, 2017 Q18 compared)
- sources_checked: Bernegger, The Swiss Re Exposure Curves and the MBBEFD Distribution Class (ASTIN Bulletin 27(1), 1997), pp.99-111 read from page images (OCR): §2.1 eq (2.1), §2.2 eqs (2.2)-(2.3) 'With F(0) = 0 and G'(0) = 1/E[x]', §2.3 eq (2.4), §3 (3.10)-(3.12), §4.1 iterative b, §4.2 first two moments, §4.3 eqs (4.5)-(4.6), c = 0, 1.5-4 (Y1-Y4), 5 (Lloyd's industrial), sha256:5c07f557257622c9dd5f1886705a55de9f368fef1839dd405c87a8550f8a7c89 — https://www.casact.org/sites/default/files/2021-03/8_Bernegger.pdf; Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), §2A pp.17-19 (exposure curve P(p); layer P((R+L)/IV) - P(R/IV); limits profile per location basis, else distortions; all locations at the midpoint of the range; scale independence, homeowners vs large commercial risks), pp.27-29 (casualty ILFs as exposure factors), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf; CAS Exam 8 Fall 2012 — sample answers and examiner's report, Q10(a)-(b), PDF pp.53-54 (PP/IV at band midpoints; homogeneity of homes vs commercial construction and occupancy; per-risk profile vs per-location curve), sha256:f0a8a4e1060ad54d4a69208dd574d53dbcafc29ceddbabe7be0a2da2e0f9232b — https://www.casact.org/sites/default/files/2021-03/f12-8.pdf; CAS Exam 8 Fall 2016 — sample answers and examiner's report, Q21, PDF p.80 (even distribution of insured values, midpoint, citing Clark; G(8/8)-G(4/8) overstates), sha256:ad67f56b0e090f8c283c58e728d656f4685a6e2b3ff8219144ecb46facbeac2e — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_16-8.pdf; CAS Exam 8 Fall 2017 — sample answers and examiner's report, Q18(a)-(b), PDF p.88 (exposure distribution restated to a loss distribution; g = 1/p; Sample 2 computes the same G points without the restatement), sha256:9496e4d8e8eeea922abcb05728d8df22b73ca717b8bde0ee5e877f6d33bc3a65 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_17-8.pdf; CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (tasks A1-A5, readings Clark, Bernegger, Grossi & Kunreuther), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Whole-page check after the writer's Exam 9 G8 passages. The page does not contradict Bernegger: (2.3) assumes F(0) = 0, so the curve's F and the slope relations describe losses that occur; G itself is unchanged by restating, which the 2017 examiners' Sample 2 shows, and the report's 'not restating' penalty concerns the loss distribution used for mu, p and the labelled points. F-001 resolved by deletion. Exam 9 only. Source hashes: every CAS and USGS PDF re-fetched from its URL this run and hashed; each matches the hash the writer cited.
