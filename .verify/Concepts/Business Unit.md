---
target: Concepts/Business Unit.md
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
- note: Rests on chapters not read: C2/C4: Mildenhall & Major Ch 12-15 (index: marginal business unit p.315) and Cummins Capital. The book is commercial and only its front matter, Chapter 1 and Index are published free; Cummins 2000 had no reachable free copy. Nothing here is verified against the reading; no arithmetic or algebraic error found. Also linked from Exam CFE-101 (SOA); that half unchecked.

## [F-001] Merton-Perold marginal capital said always to leave capital unallocated
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:53Z/f1ee
- date: 2026-10-18
- severity: minor
- status: open
- locus: first bullet
- claim: Merton–Perold marginal capital, for example, leaves part of C unallocated, and someone (usually corporate) has to carry its cost.
- evidence: Goldfarb p.33 Table 18 (sha256:b0ee2f32…): with-and-without amounts sum to 10.71M against 8.95M of capital — more, not less; Myers & Read p.6 Panel C have them fall short. See Risk Capital F-001. '(usually corporate)' appears in no read source.
- source_rank: 3
- proposed_action: Say the pieces do not in general sum to C; drop '(usually corporate)'.
- applied: true
- fingerprint: 7076d0b65be1

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:53Z/f1ee
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Restated in this pass.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T18:53Z/f1ee
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: every worked example recomputed from the stem before comparing; every formula checked against a cited open source or the CAS practice items; every factual sentence matched to a source or cut/restated; wiki links resolve; scope against the Fall 2026 outline
- sources_checked: Goldfarb, Risk-Adjusted Performance Measurement for P&C Insurers (CAS study note, rev. Oct 2010), pp.3-5, 9-11, 31-44, sha256:b0ee2f3239c7f53d07401d4c56828d9a1129d5c1f7b660603d811a50019d7b8e — https://www.casact.org/sites/default/files/database/studynotes_goldfarb8.2.pdf; Myers & Read, Capital Allocation for Insurance Companies (Brattle working paper, Aug 2001), pp.2-9, 22, 44-45, sha256:681450625dce92c765b9fb1762de4d299d060bb852906e79b3233bb6e4aa7a9b — https://www.brattle.com/wp-content/uploads/2017/10/Capital-Allocation-for-Insurance-Companies.pdf; D'Arcy, Capital Allocation in the Property-Liability Insurance Industry (Variance 5:2), pp.141-146 (PDF pp.1-6), sha256:e7a4dc616cf02bf9721fd906a35cdd3c2a017ae92921b058a6a932555c955612 — https://www.casact.org/sites/default/files/2021-07/Capital-Allocation-Darcy.pdf; Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market (arXiv:2008.12427v1, 2020), pp.1-9 (notation p.5-6), 18-24 (eqs 18-25), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1; CAS Exam 9 Content Outline, Fall 2026, pp.4-5, 7 (Domains B and C; text references), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Index excerpt, pp.523-546, sha256:4e7a560b390d357308ca1274a4c35f13e03d3d7c36555455dd25125f675f3517 — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-10.pdf
- note: D22 method: verified on open texts at D7's medium ceiling. Scope check: the concept sits in Fall 2026 outline task C2/C4 (p.5), whose readings include Mildenhall & Major (Ch 12-15 (index: marginal business unit p.315)) and Cummins Capital; the book's own Chapter 1 and Index excerpts are the readable parts of the assigned reading. Business units as the unit of allocation and RAROC: Goldfarb pp.3-4, 31-39; 'line of business or business unit or other grouping can be substituted for policy': arXiv p.5. Units share one pool: D'Arcy p.142, Myers & Read pp.3, 9 (each line's policyholders paid while the firm is solvent; default on one line is default on all). Standalone charges over-charge diversifying business, marginal charges show the true effect: Myers & Read pp.2-4. Edits: F-001; 'unit versus line' restated to arXiv p.5; cut the ring-fencing sentence and the unsourced 'use the same allocation' advice. Example recomputes (80/120: 15.0%/-0.8, 16.7%/+0.8; 66.7/133.3: 18.0%/+1.33, 15.0%/-1.33; firm EVA 0). Not checked: the page's SOA (CFE-101) use.
