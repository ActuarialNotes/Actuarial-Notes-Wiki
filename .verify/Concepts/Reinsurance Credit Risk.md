---
target: Concepts/Reinsurance Credit Risk.md
created: 2026-10-18
---

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/9c55
- date: 2026-10-18
- status_set: in_review
- checks_run: full-text search of Panning and the Coval, Jurek & Stafford working paper for 'reinsur' (zero hits in both); both examples recomputed (0.10 + 0.45 + 0.40 = 0.95 on 85, 1.1%; 1.6 without the trust; 0.01 vs 0.10, 10M); wiki links resolve
- sources_checked: Panning, Managing Interest Rate Risk: ALM, Franchise Value, and Strategy (Willis Re Working Paper, July 2006), pp.1-12 read in full (title page, contents p.2, Sections 1-8, Table 1 p.9, formulas pp.6-9 read from the rendered pages), sha256:9f569b0edf7a677b08716b2c06103c0c7826007d00c5a17c5f4d32f129e32278 — https://www.casact.org/sites/default/files/2021-03/9_Panning.pdf; Coval, Jurek & Stafford, The Economics of Structured Finance, Harvard Business School Working Paper 09-060 (2008, the authors' institution's copy), printed pp.1-28 read in full (PDF pp.1-37) with Tables 1-3, sha256:887b5c53aeb5367b127322c6972a1c41176e96dc613bc52eee296002b971c551 — https://www.hbs.edu/ris/Publication%20Files/09-060.pdf; CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), p.5 Domain C tasks C1-C7 and pp.7-8 text references, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Not checked against a source: neither reading in this packet mentions reinsurance. Outline task C5 names reinsurance as an example, but the Exam 9 content on it, if any, would come from Cummins CAT Bond or Mildenhall & Major (not in this packet), and the page is also linked from Exam 6I and SOA CP-341, whose readings were not reached. Its Schedule F, RBC, MCT and registered-reinsurance claims need those sources. Arithmetic of both examples is right.

## [F-001] Wrong-way risk overstated
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Wrong-way risk'
- claim: The largest recoverables arise from catastrophes that also strike reinsurers' own books, so a reinsurer is most likely to fail exactly when it owes the most.
- evidence: Pastor (CAS Forum 2003) pp.307, 309: reinsurer difficulty may be 'caused by poor economic conditions, poor insurance market conditions, exposure to cumulative causation claims, or catastrophic events', and 'factors which contribute to a particular reinsurer's financial difficulty will most likely also negatively influence many of the insurance company's other reinsurers, as well as the insurance company itself'; failures are correlated between reinsurers and over time. The source supports correlation with the events that create recoverables, not 'most likely to fail exactly when it owes the most'. Pastor, A Statistical Simulation Approach for Estimating the Reserve for Uncollectible Reinsurance (CAS Forum, Fall 2003), pp.306-309 (PDF pp.2-5): uncollectible reinsurance has caused cedant insolvencies; defaults from disputes and inability to pay; catastrophes and market conditions weakening many reinsurers and the cedant together; correlation of failures between reinsurers and over time; timing of recoveries (property sooner, excess WC years later); commutation; Schedule F provision for overdue authorized and unauthorized reinsurance; offsets (funds withheld, LOCs), sha256:55099f51f2acfa78cae67cbc9364ae8dda2cdbce940be3f6405577550d87c01d — https://www.casact.org/sites/default/files/database/forum_03fforum_03ff305.pdf
- source_rank: 3
- proposed_action: Restate to Pastor: the events that create large recoverables also weaken many reinsurers at once and the cedant, so failures are correlated with each other, over time and with the need to collect.
- applied: true
- fingerprint: 8234c18a2eba

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Corrected in place this run as proposed; the page now says only what the cited sources state: Restate to Pastor: the events that create large recoverables also weaken many reinsurers at once and the cedant, so failures are correlated with each other, over time and with the need to collect.

## [F-002] Downgrade clause and CAT bond trade-off stated beyond the sources
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Managing it'
- claim: include downgrade (special termination) clauses that let the cedant cancel or demand security if a reinsurer is downgraded; ... CAT Bonds, which removes counterparty risk at the cost of basis risk.
- evidence: AIG's May 2006 letter to the SEC: about 28% of Transatlantic's in-force reinsurance contracts 'contained clauses that permitted the ceding company to cancel the contract upon a ratings downgrade' — cancellation, not security, and no 'special termination' name. Lakdawalla & Zanjani (NBER WP 12742): catastrophe bonds 'feature full collateralization' and protect against insurer default; basis risk arises with triggers other than the issuer's own losses (indemnity triggers avoid it, PDF p.9; 'basis risk faced by issuers', p.20). AIG supplemental letter to the SEC on Form S-1 / Form 10-K 2005 (May 2, 2006), attachment, response to SEC question 7: 28% of Transatlantic's in-force reinsurance contracts let the ceding company cancel upon a ratings downgrade, sha256:1e083fd25e84b1d213900960452037ca4278a00cc75d1ca35d088e8363ae6fc3 — https://aig.gcs-web.com/node/51781/html; Lakdawalla & Zanjani, Catastrophe Bonds, Reinsurance, and the Optimal Collateralization of Risk-Transfer (NBER WP 12742, Dec 2006), abstract (PDF p.2: full collateralization; protects insureds from insurer default), PDF p.9 (indemnity triggers avoid basis risk), PDF p.20 conclusions (basis risk faced by issuers), sha256:0bac6e3c4dbbc4de716529e6f08676f9459db04467462b1dc3ba03d2f6c8fcc2 — https://www.nber.org/system/files/working_papers/w12742/w12742.pdf
- source_rank: 3
- proposed_action: Restate: clauses letting the cedant cancel on a ratings downgrade; CAT bonds protect from the reinsurer's default, with basis risk only on a non-indemnity trigger.
- applied: true
- fingerprint: ad53615d216d

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Corrected in place this run as proposed; the page now says only what the cited sources state: Restate: clauses letting the cedant cancel on a ratings downgrade; CAT bonds protect from the reinsurer's default, with basis risk only on a non-indemnity trigger.

## [F-003] Unsourced statements in the lead and in 'Long horizon' and 'Concentration'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- severity: minor
- status: open
- locus: lead; bullets 'Long horizon', 'Concentration'
- claim: while the cedant remains fully liable to its own policyholders ... because ceded losses develop later than gross ... Programmes are placed with a handful of reinsurers.
- evidence: Sources reached state: uncollectible reinsurance has driven cedants insolvent (Pastor p.306); recoveries due sooner for a property reinsurer than for an excess workers compensation reinsurer years later (Pastor p.308); a reinsurer approved at inception may deteriorate before long-tail losses are due (Bodoff p.3); concentration with one reinsurer is a question Odomirok p.66 asks of unsecured recoverables, and cedants set exposure limits per reinsurer (Bodoff p.2). None states the three quoted clauses. Pastor, A Statistical Simulation Approach for Estimating the Reserve for Uncollectible Reinsurance (CAS Forum, Fall 2003), pp.306-309 (PDF pp.2-5): uncollectible reinsurance has caused cedant insolvencies; defaults from disputes and inability to pay; catastrophes and market conditions weakening many reinsurers and the cedant together; correlation of failures between reinsurers and over time; timing of recoveries (property sooner, excess WC years later); commutation; Schedule F provision for overdue authorized and unauthorized reinsurance; offsets (funds withheld, LOCs), sha256:55099f51f2acfa78cae67cbc9364ae8dda2cdbce940be3f6405577550d87c01d — https://www.casact.org/sites/default/files/database/forum_03fforum_03ff305.pdf; Bodoff, Discarding Risk Avoidance and Embracing Risk Optimization: Managing Reinsurance Credit Risk (CAS E-Forum, Winter 2011), pp.1-3: definition; approved reinsurer lists, exposure limits per reinsurer, collateral and letters of credit; deterioration after inception on long-tail lines; credit default swaps, sha256:75501990bd6888e036e7c52a00dbb2408a9833da87f0112fec6ffb8a47a3c2ac — https://casact.org/sites/default/files/database/forum_11wforum_bodoff.pdf; Odomirok, Kennedy & Pantaleo, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2020), printed pp.63-66 (reinsurance note: unsecured recoverables incl. paid losses billed not collected, ceded reserves and ceded UPR; LOC, trust, funds withheld; disputes; commutation; concentration), pp.111-112 and 119-127 (Schedule F: provision for reinsurance as a liability, change to surplus; authorized/unauthorized; overdue; RBC credit charge), p.244 (RBC R1 fixed income incl. interest rates and default; R3 receivables and reinsurance recoverables), p.376 (treaty and facultative reinsurance; unregistered reinsurance collateral), p.412 glossary (facultative reinsurance), sha256:74917dcb2ca8b1cf210a7fd66b08d4c90d844a13dd14b2c71690a18e51eb4a5c — https://www.casact.org/sites/default/files/2021-03/6U_CAS_Financial_Reporting.pdf
- source_rank: 3
- proposed_action: Restate each to the sourced statement.
- applied: true
- fingerprint: 01cecec5e25f

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- resolves: F-003
- status: resolved
- note: Corrected in place this run as proposed; the page now says only what the cited sources state: Restate each to the sourced statement.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: definition and exposure components against Bodoff p.1, Odomirok pp.63-64 (paid losses billed not collected, ceded reserves, ceded UPR; LOC, trust, funds withheld) and Pastor (net unsecured balances, offsets); EL formula per counterparty (BCBS IRB note) with EAD net of collateral (Pastor; MCT §4.3.3); long horizon, correlation, concentration and disputes (Pastor pp.306-309; Bodoff pp.2-3; Odomirok pp.64-66); exposure by contract type (Clark pp.3, 14, 43; Pastor p.308); Schedule F provision, unauthorized/overdue/disputed, change to surplus and RBC charge (Odomirok pp.111-127; Pastor p.308); MCT registered factors and unregistered collateral (§4.3.2.2, §4.3.3); management (Bodoff; AIG SEC letter; Pastor and Odomirok on commutation; Lakdawalla & Zanjani on CAT bonds); both examples recomputed blind (0.10+0.45+0.40=0.95 on 85 = 1.1%, 1.6 unsecured; 0.01 vs 0.10, 10M given the event); all wiki links resolve
- sources_checked: Odomirok, Kennedy & Pantaleo, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2020), printed pp.63-66 (reinsurance note: unsecured recoverables incl. paid losses billed not collected, ceded reserves and ceded UPR; LOC, trust, funds withheld; disputes; commutation; concentration), pp.111-112 and 119-127 (Schedule F: provision for reinsurance as a liability, change to surplus; authorized/unauthorized; overdue; RBC credit charge), p.244 (RBC R1 fixed income incl. interest rates and default; R3 receivables and reinsurance recoverables), p.376 (treaty and facultative reinsurance; unregistered reinsurance collateral), p.412 glossary (facultative reinsurance), sha256:74917dcb2ca8b1cf210a7fd66b08d4c90d844a13dd14b2c71690a18e51eb4a5c — https://www.casact.org/sites/default/files/2021-03/6U_CAS_Financial_Reporting.pdf; Pastor, A Statistical Simulation Approach for Estimating the Reserve for Uncollectible Reinsurance (CAS Forum, Fall 2003), pp.306-309 (PDF pp.2-5): uncollectible reinsurance has caused cedant insolvencies; defaults from disputes and inability to pay; catastrophes and market conditions weakening many reinsurers and the cedant together; correlation of failures between reinsurers and over time; timing of recoveries (property sooner, excess WC years later); commutation; Schedule F provision for overdue authorized and unauthorized reinsurance; offsets (funds withheld, LOCs), sha256:55099f51f2acfa78cae67cbc9364ae8dda2cdbce940be3f6405577550d87c01d — https://www.casact.org/sites/default/files/database/forum_03fforum_03ff305.pdf; Bodoff, Discarding Risk Avoidance and Embracing Risk Optimization: Managing Reinsurance Credit Risk (CAS E-Forum, Winter 2011), pp.1-3: definition; approved reinsurer lists, exposure limits per reinsurer, collateral and letters of credit; deterioration after inception on long-tail lines; credit default swaps, sha256:75501990bd6888e036e7c52a00dbb2408a9833da87f0112fec6ffb8a47a3c2ac — https://casact.org/sites/default/files/database/forum_11wforum_bodoff.pdf; OSFI, Minimum Capital Test Guideline (2024), §4.3.2.2 registered reinsurance risk factors, §4.3.3 unregistered reinsurers (deduction net of acceptable collateral, 20% margin), Ch. 6 Credit Risk (definition, counterparties, rating-based factors, collateral), sha256:d24a1551e11bac611332379a895a9001c80ce749975b5fe4abfb203170efd5bf — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024; BCBS, An Explanatory Note on the Basel II IRB Risk Weight Functions (BIS, July 2005), §2, pp.3-4 (EL = PD * EAD * LGD; PD, EAD, LGD defined; LGD depends on collateral), sha256:387f8627a148dbd0a6eff3c5a0a020e44044051d3d8f34f0485b8297f49b503d — https://www.bis.org/publications/explanatory-note-basel-ii-irb-risk-weight-functions.pdf; Lakdawalla & Zanjani, Catastrophe Bonds, Reinsurance, and the Optimal Collateralization of Risk-Transfer (NBER WP 12742, Dec 2006), abstract (PDF p.2: full collateralization; protects insureds from insurer default), PDF p.9 (indemnity triggers avoid basis risk), PDF p.20 conclusions (basis risk faced by issuers), sha256:0bac6e3c4dbbc4de716529e6f08676f9459db04467462b1dc3ba03d2f6c8fcc2 — https://www.nber.org/system/files/working_papers/w12742/w12742.pdf; AIG supplemental letter to the SEC on Form S-1 / Form 10-K 2005 (May 2, 2006), attachment, response to SEC question 7: 28% of Transatlantic's in-force reinsurance contracts let the ceding company cancel upon a ratings downgrade, sha256:1e083fd25e84b1d213900960452037ca4278a00cc75d1ca35d088e8363ae6fc3 — https://aig.gcs-web.com/node/51781/html; Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), p.2 (facultative as variations on the same themes), p.3 (proportional treaty), p.4 (losses occurring / risks attaching), p.9 (follow the fortunes, adjustable features), p.14 (per risk excess; GNEPI/GNWPI net of inuring reinsurance), pp.14-21 (experience and exposure rating), p.18 (single-risk exposure factor 93%-49% = 44%; exposure above IV), p.29 (casualty exposure factor E[x;min(PL,AP+Lim)] - E[x;min(PL,AP)] over E[x;PL]), pp.36-43 (aggregate covers), p.43 (facultative certificates inure to cat cover), pp.45-46 (risks attaching cat cover, interlocking clause), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf; CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), p.3 Domain A task 2 (loss cost of treaty, facultative and other contracts; reading Clark), p.5 Domain C task C5 'Estimate and manage interest rate and credit risk (e.g., default, prepayment, reinsurance)' and C6-C7; pp.7-8 text references, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Verified at medium (D22): neither C5 reading mentions reinsurance (task C5 names it only as an example), so the page rests on CAS and regulatory open sources at rank 3. Three minor findings fixed in place (wrong-way risk restated to Pastor; downgrade clause and CAT-bond basis risk restated to the AIG letter and Lakdawalla & Zanjani; three unsourced clauses in the lead, 'Long horizon' and 'Concentration' restated). Exam 6I and SOA CP-341 readings not read; the Schedule F, RBC and MCT statements were checked against the CAS's financial reporting text and OSFI's 2024 guideline directly.
