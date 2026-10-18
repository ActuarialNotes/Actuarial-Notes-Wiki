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
