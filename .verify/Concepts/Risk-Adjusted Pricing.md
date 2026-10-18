---
target: Concepts/Risk-Adjusted Pricing.md
created: 2026-10-18
---

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:04Z/6bfb
- date: 2026-10-18
- status_set: in_review
- checks_run: independent recomputation of every worked example before comparing (all reproduce to the stated rounding); algebra of every displayed identity; wiki links resolve; Mildenhall & Major terms and notation checked for existence against the book's index and the authors' 2020 arXiv paper; task wording against the Fall 2026 outline
- sources_checked: Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Chapter 1 excerpt, pp.1-11, sha256:af37057d34a0c9b927fa8d0246eaf121a500e385c6902a8f8db8b08e6a55fe2c — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-5.pdf; Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Index excerpt, pp.523-546, sha256:4e7a560b390d357308ca1274a4c35f13e03d3d7c36555455dd25125f675f3517 — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-10.pdf; Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market (arXiv:2008.12427v1, 2020), pp.5-6 (notation), 19-24 (eqs 18-25), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1; CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), pp.4-5, 7 (Domains B and C; text references; study-note and errata hyperlinks), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; CAS abstract record, Cummins, Allocation of Capital in the Insurance Industry (RMIR vol. 3 no. 1, pp.7-27, 2000): abstract, sha256:e794f5454cd27647fe926819fa474a13934475e091a93c69aa752413e234b2f8 — https://www.casact.org/abstract/allocation-capital-insurance-industry; CAS Exam 9 Working Group, Note to Allocation of Capital in the Insurance Industry (Cummins), January 2026, pp.1-3 (r_E = r_A(1+k1+k2) + r1 s1 + r2 s2; corrected r_i = -(k_i/s_i) r_F + beta_i (r_M - r_F)), sha256:b5768e1c98dd51f4bc86b133f9da30de2cb0497d65f0e34af4861cb122c305fc — https://www.casact.org/sites/default/files/2026-01/Exam_9_Erratum_Cummins_Capital-1.pdf
- note: Rests on chapters not read: C3: Mildenhall & Major Ch 12-15 (index: constant cost of capital; natural allocation) and Cummins Capital. The book is commercial and only its front matter, Chapter 1 and Index are published free; Cummins 2000 had no reachable free copy. Nothing here is verified against the reading; no arithmetic or algebraic error found. CCoC form P = nu E[X^a] + delta a is algebraically consistent with arXiv p.6 definitions; the RAROC-target form (k - y) C_i is unsourced.

## [F-001] RAROC-target premium omits the discount of the capital spread to inception
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:53Z/f1ee
- date: 2026-10-18
- severity: major
- status: open
- locus: bullet 'RAROC-target form' and the second example
- claim: P_i = PV(E[L_i]) + PV(expenses_i) + (k - y) C_i; example: P_allocated = 800 + 150 + 0.08(1,000) = 1,030K, P_standalone = 1,150K, 120K (11.7%) higher.
- evidence: Recomputed from the stated one-period set-up (premium and capital in at inception, invested at y, capital released at year end with return k): (P - E + C)(1 + y) - L = C(1 + k), so P = PV(L) + E + (k - y)C/(1 + y). The page's form leaves the year-end spread undiscounted. Goldfarb's study note prices the same way (p.40, Table 27: additional risk margin = shortfall / [1 + expected investment income]), sha256:b0ee2f32…. Example corrected: 950 + 80/1.04 = 1,026.9K; 950 + 200/1.04 = 1,142.3K; difference 115.4K = 11.2%.
- source_rank: 3
- proposed_action: Divide the spread by (1 + y) and say the capital must be credited its yield for the spread form to hold; correct the example.
- applied: true
- fingerprint: cb3e2efe5931

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:53Z/f1ee
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Corrected in this pass: formula, condition and the example's figures (1,026.9K, 1,142.3K, 115.4K, 11.2%, about 1,027K).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T18:53Z/f1ee
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: every worked example recomputed from the stem before comparing; every formula checked against a cited open source or the CAS practice items; every factual sentence matched to a source or cut/restated; wiki links resolve; scope against the Fall 2026 outline
- sources_checked: CAS Exam 9 Practice Items and Solutions (2026; retired Spring 2026 items), Items 3 (M&M 11.3: cost of capital i = [g(s)-s]/[1-g(s)], g(s) = (s+i)/(1+i), LR = s/g(s)) and 4 (M&M pp.317-318: Shapley allocation), sha256:9cf61c6c2597a9a1a6d2d548d83f78a1a56e73778226176ab30308aa85f615fb — https://www.casact.org/sites/default/files/2026-08/Exam9_PracticeItems_2026.xlsx; Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market (arXiv:2008.12427v1, 2020), pp.1-9 (notation p.5-6), 18-24 (eqs 18-25), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1; Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Chapter 1 excerpt, pp.4-11, sha256:af37057d34a0c9b927fa8d0246eaf121a500e385c6902a8f8db8b08e6a55fe2c — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-5.pdf; Goldfarb, Risk-Adjusted Performance Measurement for P&C Insurers (CAS study note, rev. Oct 2010), pp.3-5, 9-11, 31-44, sha256:b0ee2f3239c7f53d07401d4c56828d9a1129d5c1f7b660603d811a50019d7b8e — https://www.casact.org/sites/default/files/database/studynotes_goldfarb8.2.pdf; Robbin, IRR, ROE, and PVI/PVE (CAS Forum Winter 2007), pp.189-191, 201-206, 227-229 (PDF pp.1-3, 13-18, 39-41), sha256:151252827511805261ec416c1454571361957b728d9fcce961f15c7fab268e7c — https://casact.org/sites/default/files/database/forum_07wforum_07w195.pdf; Myers & Read, Capital Allocation for Insurance Companies (Brattle working paper, Aug 2001), pp.2-9, 22, 44-45, sha256:681450625dce92c765b9fb1762de4d299d060bb852906e79b3233bb6e4aa7a9b — https://www.brattle.com/wp-content/uploads/2017/10/Capital-Allocation-for-Insurance-Companies.pdf; Ward & Lee, Practical Application of the Risk-Adjusted Return on Capital Framework (CAS Forum 2002), pp.113, 120-125 (PDF pp.35, 42-47), sha256:8fba670b85d32b9ddcb5477e4dde607564737f24c7b39489347ec575b247ff4d — https://www.casact.org/sites/default/files/database/forum_02sforum_02sf079.pdf; CAS Exam 9 Content Outline, Fall 2026, pp.4-5, 7 (Domains B and C; text references), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Index excerpt, pp.523-546, sha256:4e7a560b390d357308ca1274a4c35f13e03d3d7c36555455dd25125f675f3517 — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-10.pdf
- note: D22 method: verified on open texts at D7's medium ceiling. Scope check: the concept sits in Fall 2026 outline task C3 (p.5), whose readings include Mildenhall & Major (Ch 12-15 (constant cost of capital; natural allocation)) and Cummins Capital; the book's own Chapter 1 and Index excerpts are the readable parts of the assigned reading. CCoC: named in M&M Ch 1 p.6 (allocate capital, then one hurdle rate on every unit; it burdens catastrophe units and favours high, low-probability reinsurance); g(s) = (s + i)/(1 + i) in practice item 3; P = E[X ^ a] + iota(a - P) and its solved form checked against arXiv p.6 definitions. Allocating margin directly with returns varying by line: arXiv abstract and §6.1. Spread over the investment yield: Robbin p.229; risk load from hurdle RAROC and marginal capital: Ward & Lee p.123. Pricing on standalone capital loses business to competitors: Myers & Read pp.2-3. Edits: F-001 (major, fixed). First example recomputes (nu 0.8889, delta 0.1111, P 1,066.7, M 66.7, Q 533.3, LR 93.75%, leverage 2.0).
