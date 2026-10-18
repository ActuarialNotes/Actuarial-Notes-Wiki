---
target: Concepts/Risk-Adjusted Performance.md
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
- note: Rests on chapters not read: C4: Mildenhall & Major Ch 13, 15 (index: RAROC p.310; return on risk-adjusted capital p.5) and Cummins Capital. The book is commercial and only its front matter, Chapter 1 and Index are published free; Cummins 2000 had no reachable free copy. Nothing here is verified against the reading; no arithmetic or algebraic error found. Whether NOI includes investment income on allocated capital is the open question on cas9-2013-q15 (F-001) and needs Cummins 2000, which was not reachable. Also linked from Exam CFE-101 (SOA); that half unchecked.

## [F-001] NOI defined to include investment income on allocated capital, without saying conventions differ
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:53Z/f1ee
- date: 2026-10-18
- severity: minor
- status: open
- locus: first bullet (definition of NOI)
- claim: NOI_i is the unit's after-tax net operating income — underwriting result plus investment income on the funds it generates, including the capital allocated to it.
- evidence: Two open sources take opposite conventions: Ward & Lee (CAS Forum 2002 p.120, sha256:8fba670b…) define RAROC = (UW + IC + CB)/EC with a 'capital benefit' credited on the capital, while Goldfarb's study note (p.38 Table 22 and p.39 Table 25, sha256:b0ee2f32…) credits investment income on premium net of expenses only; CAS's model solution to Exam 9 Spring 2013 Q15 (booklet PDF p.49) states 'Only considering investment income on the policy hold supplied funds' (as printed). A reader applying the page's convention to that question gets the other answer (questions/exam-9/cas9-2013-q15.md, note). Also 'after-tax' only: Ward & Lee compute RAROC pre- and post-tax.
- source_rank: 1
- proposed_action: Say the conventions differ, name the one CAS's 2013 key uses, and allow pre- or after-tax with the hurdle on the same basis.
- applied: true
- fingerprint: 1f2e3d4d6c1b

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:53Z/f1ee
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Restated in this pass; the CAS 2013 Q15 file itself was not touched.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T18:53Z/f1ee
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: every worked example recomputed from the stem before comparing; every formula checked against a cited open source or the CAS practice items; every factual sentence matched to a source or cut/restated; wiki links resolve; scope against the Fall 2026 outline
- sources_checked: Goldfarb, Risk-Adjusted Performance Measurement for P&C Insurers (CAS study note, rev. Oct 2010), pp.3-5, 9-11, 31-44, sha256:b0ee2f3239c7f53d07401d4c56828d9a1129d5c1f7b660603d811a50019d7b8e — https://www.casact.org/sites/default/files/database/studynotes_goldfarb8.2.pdf; Ward & Lee, Practical Application of the Risk-Adjusted Return on Capital Framework (CAS Forum 2002), pp.113, 120-125 (PDF pp.35, 42-47), sha256:8fba670b85d32b9ddcb5477e4dde607564737f24c7b39489347ec575b247ff4d — https://www.casact.org/sites/default/files/database/forum_02sforum_02sf079.pdf; CAS Exam 9 Content Outline, Fall 2026, pp.4-5, 7 (Domains B and C; text references), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Index excerpt, pp.523-546, sha256:4e7a560b390d357308ca1274a4c35f13e03d3d7c36555455dd25125f675f3517 — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-10.pdf
- note: D22 method: verified on open texts at D7's medium ceiling. Scope check: the concept sits in Fall 2026 outline task C4 (p.5), whose readings include Mildenhall & Major (Ch 13, 15 (RAROC p.310)) and Cummins Capital; the book's own Chapter 1 and Index excerpts are the readable parts of the assigned reading. RAROC = income/risk-adjusted capital: Goldfarb p.4; EVA as the dollar form (target rate x required capital): Goldfarb p.40 and fn.41 (dollar measures' advantages); EVA = (RAROC - k)C is algebra. Economics not accounting, investment credit on reserves: Ward & Lee pp.120-121, Goldfarb pp.4-5; capital held over several years and its charge: Goldfarb p.42, Ward & Lee pp.122-123 (accident-year RAROC). Verdict depends on the allocation: Goldfarb pp.38-39 (Line A/B reverse between co-CTE and proportional VaR). Acting on it (reprice, reinsure, redeploy, return capital): Ward & Lee pp.123-125. Edits: F-001; cut 'flatters small, high-margin units' and 'Maximising RAROC can shrink the firm below the size that maximises value' (no read source; Ward & Lee's own reinsurance example has the higher-RAROC option shrink the business and add value), and the unsourced 'use the same allocation for pricing and performance'. Examples recompute (15.0%/+15, 7.5%/-10, 15.0%/+4; firm 11.2% and 9; PV charges 16.30, EVA -2.30). Not checked: the page's SOA (CFE-101) use.
