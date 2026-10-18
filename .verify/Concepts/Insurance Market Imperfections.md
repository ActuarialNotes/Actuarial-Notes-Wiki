---
target: Concepts/Insurance Market Imperfections.md
created: 2026-10-18
---

## [F-001] Omits competition, one of the three imperfections the outline names
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:04Z/6bfb
- date: 2026-10-18
- severity: minor
- status: open
- locus: lead and bullet list
- claim: The imperfections are taxes, costs of financial distress, agency conflicts, asymmetric information, regulation and costly external capital.
- evidence: CAS Exam 9 Content Outline Fall 2026 p.5, task C1: 'the impact and sources of insurance market imperfections (e.g., informational asymmetries, competition, potential financial distress)' (sha256:be1980d4…). Competition appears nowhere on the page. Lead only: the book's Index excerpt (sha256:4e7a560b…) indexes pages of §8.9 Insurance Market Imperfections (pp.210-213) under transaction cost (210), underwriting cost (210), agency cost (211), frictional cost (211), fronting arrangement (211) and double taxation (212); transaction and underwriting costs are also absent from the page. The section text was not read.
- source_rank: 1
- proposed_action: From Mildenhall & Major §8.9 and Cummins Capital, add competition (and any other source those readings name, e.g. transaction costs) as they describe it. Requires authoring; not auto-fixed.
- applied: false
- fingerprint: 45a393b58798

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:04Z/6bfb
- date: 2026-10-18
- status_set: in_review
- checks_run: independent recomputation of every worked example before comparing (all reproduce to the stated rounding); algebra of every displayed identity; wiki links resolve; Mildenhall & Major terms and notation checked for existence against the book's index and the authors' 2020 arXiv paper; task wording against the Fall 2026 outline
- sources_checked: Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Chapter 1 excerpt, pp.1-11, sha256:af37057d34a0c9b927fa8d0246eaf121a500e385c6902a8f8db8b08e6a55fe2c — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-5.pdf; Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Index excerpt, pp.523-546, sha256:4e7a560b390d357308ca1274a4c35f13e03d3d7c36555455dd25125f675f3517 — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-10.pdf; Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market (arXiv:2008.12427v1, 2020), pp.5-6 (notation), 19-24 (eqs 18-25), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1; CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), pp.4-5, 7 (Domains B and C; text references; study-note and errata hyperlinks), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; CAS abstract record, Cummins, Allocation of Capital in the Insurance Industry (RMIR vol. 3 no. 1, pp.7-27, 2000): abstract, sha256:e794f5454cd27647fe926819fa474a13934475e091a93c69aa752413e234b2f8 — https://www.casact.org/abstract/allocation-capital-insurance-industry; CAS Exam 9 Working Group, Note to Allocation of Capital in the Insurance Industry (Cummins), January 2026, pp.1-3 (r_E = r_A(1+k1+k2) + r1 s1 + r2 s2; corrected r_i = -(k_i/s_i) r_F + beta_i (r_M - r_F)), sha256:b5768e1c98dd51f4bc86b133f9da30de2cb0497d65f0e34af4861cb122c305fc — https://www.casact.org/sites/default/files/2026-01/Exam_9_Erratum_Cummins_Capital-1.pdf
- note: Rests on chapters not read: C1: Mildenhall & Major §8.9 (pp.210-213) and Cummins Capital. The book is commercial and only its front matter, Chapter 1 and Index are published free; Cummins 2000 had no reachable free copy. Nothing here is verified against the reading; no arithmetic or algebraic error found. See F-001 for the outline's 'competition'. Frictional costs 'primarily driven by agency conflict, taxes, and regulation' is how arXiv p.2 summarises Cummins (2000) — consistent with the page (rank 3, secondary). 'Froot-Stein' is not in the book's index; it may be Cummins's, unread.
