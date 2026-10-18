---
target: Resources/Books/The Economics of Structured Finance (Coval, Jurek, and Stafford - 2009).md
created: 2026-10-18
---

## [F-001] Investment-grade boundary and rating ranges lost their +/- signs
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/9c55
- date: 2026-10-18
- severity: minor
- status: open
- locus: The Challenge of Rating Structured Finance Assets, bullets 3 and 5
- claim: Corporate bonds rated BBB or higher are investment grade; BB and below speculative; ten investment-grade categories (AAA to BBB); ten speculative-grade categories (BB to C).
- evidence: HBS WP 09-060 p.9: 'securities rated BBB- or higher have come to be known as investment grade ... while those rated BB+ and below are referred to as speculative grade'; pp.9-10: 'ten distinct rating categories (from AAA to BBB-)' and 'the ten rating categories within the speculative grade range (from BB+ to C)'. Independently, Table 1 (WP p.32) lists AAA, AA+, AA, AA-, A+, A, A-, BBB+, BBB, BBB- (ten) and BB+ ... C (ten); 'AAA to BBB' counts nine, so the page's ranges contradict its own 'ten'. Coval, Jurek & Stafford, The Economics of Structured Finance, Harvard Business School Working Paper 09-060 (2008, the authors' institution's copy), printed pp.1-28 read in full (PDF pp.1-37) with Tables 1-3, sha256:887b5c53aeb5367b127322c6972a1c41176e96dc613bc52eee296002b971c551 — https://www.hbs.edu/ris/Publication%20Files/09-060.pdf
- source_rank: 2
- proposed_action: Restore the signs: BBB− or higher / BB+ and below; (AAA to BBB−); (BB+ to C).
- applied: true
- fingerprint: 5d7a9adce3f2

## [F-002] Simulation bond rating given as BB; Table 1 places it at BB+
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/9c55
- date: 2026-10-18
- severity: minor
- status: open
- locus: The Challenge of Rating Structured Finance Assets, simulation set-up bullet
- claim: Each bond (five-year default probability 5 percent) would be rated BB by Table 1.
- evidence: HBS WP 09-060 p.11: 'each bond in our hypothetical collateral pool would garner a just-below investment grade rating of BB+'. Recomputed independently from Table 1: a 5% five-year default probability is an annualized 1-(0.95)^(1/5) = 1.02%, between BBB- (0.75%) and BB+ (1.07%), i.e. just below investment grade at BB+; BB is 1.45%. WP p.14-15 also says a rise to 7.5% would move the bonds 'from BB+ to BB-'. Coval, Jurek & Stafford, The Economics of Structured Finance, Harvard Business School Working Paper 09-060 (2008, the authors' institution's copy), printed pp.1-28 read in full (PDF pp.1-37) with Tables 1-3, sha256:887b5c53aeb5367b127322c6972a1c41176e96dc613bc52eee296002b971c551 — https://www.hbs.edu/ris/Publication%20Files/09-060.pdf
- source_rank: 2
- proposed_action: Change BB to BB+.
- applied: true
- fingerprint: ff38d385fdcc

## [F-003] CDO-squared mezzanine at 7.5% default probability: BBB on the page, BBB− in the working paper
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/9c55
- date: 2026-10-18
- severity: minor
- status: open
- locus: The Challenge of Rating Structured Finance Assets, bullet beginning 'When the default probability rises to 10 percent'
- claim: A rise to 7.5 percent is enough to take the AAA-rated mezzanine CDO² claim to BBB.
- evidence: HBS WP 09-060 pp.14-15: 'a slight increase in the probability of default ... to 7.5 percent ... is sufficient to precipitate a downgrade of the AAA-rated mezzanine CDO2 claim to BBB-', and Table 3 (p.34) gives BBB- for the CDO2 mezzanine at pD = 7.50%. Both are the same working paper, not two independent sources, and the published JEP text could not be read (The AEA's own PDF (pubs.aeaweb.org/doi/pdfplus/10.1257/jep.23.1.3, and www.aeaweb.org/articles/pdf/...) returned 403 to curl and to WebFetch this session, with and without a browser user agent; web.archive.org was unreachable through the proxy; no copy hosted by the authors or their institutions other than HBS Working Paper 09-060 was found (HBS faculty item page 35183 also 403).), so not changed. The page drops the minus sign elsewhere in the same section (see F-001, F-002), which suggests the same slip. Coval, Jurek & Stafford, The Economics of Structured Finance, Harvard Business School Working Paper 09-060 (2008, the authors' institution's copy), printed pp.1-28 read in full (PDF pp.1-37) with Tables 1-3, sha256:887b5c53aeb5367b127322c6972a1c41176e96dc613bc52eee296002b971c551 — https://www.hbs.edu/ris/Publication%20Files/09-060.pdf
- source_rank: 2
- proposed_action: Read the JEP text (p.12-13 of the article) and, if it agrees with the working paper, change BBB to BBB−.
- applied: false
- fingerprint: 3acbf3310a05

## [F-004] Bullet on junior/senior tranche prices not found in the authors' copy
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/9c55
- date: 2026-10-18
- severity: minor
- status: open
- locus: Manufacturing AAA-rated Securities, bullet 'Junior tranches, being risky, have low prices and high promised returns'
- claim: Junior tranches, being risky, have low prices and high promised returns, while senior tranches have relatively higher prices and lower promised returns.
- evidence: The 'Manufacturing AAA-rated Securities' section of HBS WP 09-060 (pp.5-8) contains no such statement; 'promised return', 'low prices' and 'higher prices' occur nowhere in the paper, and 'price' only on PDF pp.19-21, 24 and 31, outside that section. It may be a sentence the JEP revision added, but the JEP text could not be read (The AEA's own PDF (pubs.aeaweb.org/doi/pdfplus/10.1257/jep.23.1.3, and www.aeaweb.org/articles/pdf/...) returned 403 to curl and to WebFetch this session, with and without a browser user agent; web.archive.org was unreachable through the proxy; no copy hosted by the authors or their institutions other than HBS Working Paper 09-060 was found (HBS faculty item page 35183 also 403).). Coval, Jurek & Stafford, The Economics of Structured Finance, Harvard Business School Working Paper 09-060 (2008, the authors' institution's copy), printed pp.1-28 read in full (PDF pp.1-37) with Tables 1-3, sha256:887b5c53aeb5367b127322c6972a1c41176e96dc613bc52eee296002b971c551 — https://www.hbs.edu/ris/Publication%20Files/09-060.pdf
- source_rank: 2
- proposed_action: Confirm against the JEP text; delete the bullet if the article does not say it.
- applied: false
- fingerprint: 90f03af28e9c

## [F-005] The page's document source is a third-party course copy
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/9c55
- date: 2026-10-18
- severity: minor
- status: open
- locus: ## Sources, first entry
- claim: The page was written from, and cites, a PDF at users.ssc.wisc.edu/~mchinn/coval_structured_JEP.pdf.
- evidence: That host is a University of Wisconsin economics professor's (Menzie Chinn's) course directory, not the publisher (AEA) and not the authors or their institutions (Harvard Business School, Princeton). docs/content-plan.md §1.2 rule 4 forbids citing an unauthorized copy. The authors' institution posts HBS Working Paper 09-060 (Coval, Jurek & Stafford, The Economics of Structured Finance, Harvard Business School Working Paper 09-060 (2008, the authors' institution's copy), printed pp.1-28 read in full (PDF pp.1-37) with Tables 1-3, sha256:887b5c53aeb5367b127322c6972a1c41176e96dc613bc52eee296002b971c551 — https://www.hbs.edu/ris/Publication%20Files/09-060.pdf), an earlier version that differs from the page in places (F-003, F-004); the AEA record (American Economic Association, The Economics of Structured Finance (Journal of Economic Perspectives 23(1), Winter 2009, pp.3-25, DOI 10.1257/jep.23.1.3) — article record, citation metadata and abstract, sha256:c820f5b8d1d8d1c3f3126755ace10ec043cfe3787f3deec045447d6dbc432237 — https://www.aeaweb.org/articles?id=10.1257/jep.23.1.3) marks the article world-readable but its PDF is not fetchable from here.
- source_rank: 2
- proposed_action: Maintainer decision: either accept a classroom copy of the open-access JEP article as citable, or re-cite the page to the AEA record plus HBS WP 09-060 and re-check the JEP-only details against the AEA PDF from a network that can reach it.
- applied: false
- fingerprint: 888e4e0c5e78

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/9c55
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Signs restored in this run (BBB−/BB+, AAA to BBB−, BB+ to C), from the working paper's text and confirmed by counting Table 1's categories.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/9c55
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: BB changed to BB+ in this run; the working paper's text and the Table 1 recomputation (1.02% annualized) agree.

## [C-001] Conflict inside the working paper: senior-tranche downgrade point
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/9c55
- date: 2026-10-18
- locus: Table 3 bullet
- note: HBS WP 09-060 p.14 says the original CDO's senior tranche 'reaches the investment grade boundary of BBB-, when the default probability reaches 20 percent', but its own Table 3 (p.34) gives BBB- at pD = 12.50% (and Table 3 has no 20% column). The page follows Table 3 (12.5 percent), which may be what the published JEP text says; logged as a conflict inside the source, not a vault error.

## [C-002] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/9c55
- date: 2026-10-18
- status_set: in_review
- checks_run: frontmatter and lead against the AEA record (title, authors, JEP 23(1) Winter 2009 pp.3-25, abstract); syllabus callout against outline p.5 and p.7 (C5-C6, Study Kit); headings against the working paper's sections (Manufacturing AAA-rated Securities; The Challenge of Rating Structured Finance Assets; The Relation of Structured Finance to Subprime; The Pricing of Systematic Risk in Structured Products; The Rise and Fall of the Structured Finance Market; Implications and Conclusions; References) — all present, in order; every bullet diffed against the working paper; two-bond, three-bond and CDO-squared figures (1%, 0.1/2.8/27.1%, 19%, 3.6%), Table 2 and Table 3 figures, subprime and issuance figures recomputed or diffed; resource_lint (0 errors); links resolve
- sources_checked: Coval, Jurek & Stafford, The Economics of Structured Finance, Harvard Business School Working Paper 09-060 (2008, the authors' institution's copy), printed pp.1-28 read in full (PDF pp.1-37) with Tables 1-3, sha256:887b5c53aeb5367b127322c6972a1c41176e96dc613bc52eee296002b971c551 — https://www.hbs.edu/ris/Publication%20Files/09-060.pdf; American Economic Association, The Economics of Structured Finance (Journal of Economic Perspectives 23(1), Winter 2009, pp.3-25, DOI 10.1257/jep.23.1.3) — article record, citation metadata and abstract, sha256:c820f5b8d1d8d1c3f3126755ace10ec043cfe3787f3deec045447d6dbc432237 — https://www.aeaweb.org/articles?id=10.1257/jep.23.1.3; CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), p.5 Domain C tasks C1-C7 and pp.7-8 text references, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Left in_review: the page describes the published JEP article, whose text could not be read this session (The AEA's own PDF (pubs.aeaweb.org/doi/pdfplus/10.1257/jep.23.1.3, and www.aeaweb.org/articles/pdf/...) returned 403 to curl and to WebFetch this session, with and without a browser user agent; web.archive.org was unreachable through the proxy; no copy hosted by the authors or their institutions other than HBS Working Paper 09-060 was found (HBS faculty item page 35183 also 403).). Checked against the authors' HBS working paper 09-060 instead: every section and nearly every bullet agrees. Fixed F-001 and F-002, where the page had dropped the +/− from ratings (the working paper and Table 1 arithmetic agree). Open: F-003 (BBB vs BBB−), F-004 (a bullet absent from the working paper), F-005 (cites a third-party course copy). Verifying needs the JEP text.
