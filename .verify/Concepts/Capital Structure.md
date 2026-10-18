---
target: Concepts/Capital Structure.md
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
- note: Rests on chapters not read: C1: Mildenhall & Major §8.2 (index: capital structure, optimal, p.177; debt capital p.174) and Cummins Capital. The book is commercial and only its front matter, Chapter 1 and Index are published free; Cummins 2000 had no reachable free copy. Nothing here is verified against the reading; no arithmetic or algebraic error found. The ROE bullet's i*A/E + u*P/E is the form of the CAS note's r_E = r_A(1+k1+k2) + r1 s1 + r2 s2 (net income = return on all assets plus underwriting return on each line's premium, divided by equity; note p.2) — consistent, rank 2. Statutory surplus-note treatment and the waterfall example are unsourced. Also linked from Exam CFE-201 (SOA); that half unchecked.

## [F-001] Default put called the EPD in present-value form
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:53Z/f1ee
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'The default option'
- claim: That put — the expected policyholder deficit in present-value form — is what Risk Capital is held to shrink.
- evidence: Goldfarb's CAS study note (pp.10-11, sha256:b0ee2f32…) defines the EPD as the average shortfall of assets below liabilities and says it 'is closely related to the value of shortfall protection, though it does not take into consideration discounting for the time value of money or the inclusion of a risk margin'; Myers & Read (p.8, sha256:68145062…) value the default put as the market price of a guarantee, which carries a risk margin. Discounting alone does not turn the EPD into the put.
- source_rank: 3
- proposed_action: Restate: the put is closely related to the EPD, which leaves out discounting and a risk margin.
- applied: true
- fingerprint: a45141359596

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:53Z/f1ee
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Restated in this pass to Goldfarb's wording (pp.10-11).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T18:53Z/f1ee
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: every worked example recomputed from the stem before comparing; every formula checked against a cited open source or the CAS practice items; every factual sentence matched to a source or cut/restated; wiki links resolve; scope against the Fall 2026 outline
- sources_checked: CAS Exam 9 Working Group, Note to Allocation of Capital in the Insurance Industry (Cummins), January 2026, pp.1-3, sha256:b5768e1c98dd51f4bc86b133f9da30de2cb0497d65f0e34af4861cb122c305fc — https://www.casact.org/sites/default/files/2026-01/Exam_9_Erratum_Cummins_Capital-1.pdf; Froot, Risk Management, Capital Budgeting and Capital Structure Policy for Insurers and Reinsurers (NBER WP 10184, 2003), pp.2-10, 16, sha256:0de3a439eb286ea2a5ed225fcfa4cbb2ed62d964dc2485dbb79239dabfb6383e — https://www.nber.org/system/files/working_papers/w10184/w10184.pdf; Myers & Read, Capital Allocation for Insurance Companies (Brattle working paper, Aug 2001), pp.2-9, 22, 44-45, sha256:681450625dce92c765b9fb1762de4d299d060bb852906e79b3233bb6e4aa7a9b — https://www.brattle.com/wp-content/uploads/2017/10/Capital-Allocation-for-Insurance-Companies.pdf; Goldfarb, Risk-Adjusted Performance Measurement for P&C Insurers (CAS study note, rev. Oct 2010), pp.3-5, 9-11, 31-44, sha256:b0ee2f3239c7f53d07401d4c56828d9a1129d5c1f7b660603d811a50019d7b8e — https://www.casact.org/sites/default/files/database/studynotes_goldfarb8.2.pdf; Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market (arXiv:2008.12427v1, 2020), pp.1-9 (notation p.5-6), 18-24 (eqs 18-25), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1; Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Chapter 1 excerpt, pp.4-11, sha256:af37057d34a0c9b927fa8d0246eaf121a500e385c6902a8f8db8b08e6a55fe2c — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-5.pdf; Damodaran, The Cost of Capital: The Swiss Army Knife of Finance (April 2016), pp.2, 5, 17, sha256:5213c261bc05b5e8920f6a2feba1687c1f424fa1155b20789b6848a3e4223f90 — https://pages.stern.nyu.edu/~adamodar/pdfiles/papers/costofcapital.pdf; NAIC, Surplus Notes (Insurance Topics page), read 2026-10-18 via a web reader; the publisher refuses scripted fetches (403), so no copy is cached or hashed — https://content.naic.org/insurance-topics/surplus-notes; CAS Exam 9 Content Outline, Fall 2026, pp.4-5, 7 (Domains B and C; text references), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; CAS abstract record, Cummins, Allocation of Capital in the Insurance Industry (RMIR 3(1), 2000), abstract, sha256:e794f5454cd27647fe926819fa474a13934475e091a93c69aa752413e234b2f8 — https://www.casact.org/abstract/allocation-capital-insurance-industry
- note: D22 method: verified on open texts at D7's medium ceiling. Scope check: the concept sits in Fall 2026 outline task C1 (p.5), whose readings include Mildenhall & Major (§§8.1-8.4, 8.9; index: capital structure p.177) and Cummins Capital; the book's own Chapter 1 and Index excerpts are the readable parts of the assigned reading. ROE bullet = the CAS note's r_E = r_A(1+k1+k2) + r1 s1 + r2 s2 (p.2: income = return on all assets plus each line's underwriting return, over equity). MM irrelevance and why it fails for an insurer: Froot pp.5-8 (customers' costs of diversifying exceed investors'; MM would apply absent capital-market imperfections; carrying costs from taxes and agency, adjustment costs from asymmetric information), Myers & Read p.2 (agency/information costs, double taxation), arXiv p.19 (MM concerns the debt/equity split). Default put: Myers & Read p.8, Goldfarb p.34. Debt and reinsurance as capital with known costs: M&M Ch 1 pp.7-8. Surplus notes: NAIC (classified as equity under SAP, debt under GAAP; unsecured, subordinated to all policyholder and creditor claims). Edits: cut the holding-company bond and structural-subordination clauses (no source), restated the statutory treatment to NAIC's words, F-001. Both examples recompute (waterfall 1,000/100/200; 1,250/50/0; 1,300/1,400 = 0.929; ROE 20%, 12%, -14%, -5%). Not checked: the page's SOA (CFE-201) use.
