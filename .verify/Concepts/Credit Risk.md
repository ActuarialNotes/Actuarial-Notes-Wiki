---
target: Concepts/Credit Risk.md
created: 2026-10-18
---

## [F-001] Senior tranches described as safe only near independence; Coval, Jurek & Stafford's senior CDO tranche is AAA at 0.20 correlation
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/9c55
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Correlation is the portfolio risk'
- claim: Senior tranches of pooled credit are safe only while defaults stay close to independent.
- evidence: Coval, Jurek & Stafford's baseline pool has pairwise default correlation 0.20 and its senior tranche is rated AAA (HBS WP 09-060 pp.11-12, Table 2); WP p.15: 'with plausible magnitudes of overcollateralization, 12 percent in our example, the expected payoff on a senior tranche of the original collateralized debt obligation is well protected from large changes in default probabilities and correlations. While its rating might change ...' (Table 3: A+ at ρ=40%, BBB- at 60%). The reading's point is that senior ratings are sensitive to correlation and that re-tranched (CDO²) senior claims are fragile, not that a senior tranche needs near-independence. Coval, Jurek & Stafford, The Economics of Structured Finance, Harvard Business School Working Paper 09-060 (2008, the authors' institution's copy), printed pp.1-28 read in full (PDF pp.1-37) with Tables 1-3, sha256:887b5c53aeb5367b127322c6972a1c41176e96dc613bc52eee296002b971c551 — https://www.hbs.edu/ris/Publication%20Files/09-060.pdf
- source_rank: 2
- proposed_action: Restate to the reading: senior tranche ratings are highly sensitive to default correlation (and CDO² senior claims highly sensitive in value), or delete 'safe only while defaults stay close to independent, and'.
- applied: false
- fingerprint: ec553c4ddda8

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/9c55
- date: 2026-10-18
- status_set: in_review
- checks_run: Exam 9 half against Coval, Jurek & Stafford: expected loss as default likelihood × severity (WP p.9), default correlation and the joint tail (pp.7-10), losses concentrated in bad economic states (pp.18-21); correlation example recomputed (p_DD = p² + ρp(1-p) is the WP footnote 1 definition rearranged; 0.25%, 1.20%, 90.25/9.50/0.25%, 91.2/7.6/1.2%) and expected-loss example recomputed ($75,000 vs $650,000); outline p.5 task C5 wording; wiki links resolve
- sources_checked: Coval, Jurek & Stafford, The Economics of Structured Finance, Harvard Business School Working Paper 09-060 (2008, the authors' institution's copy), printed pp.1-28 read in full (PDF pp.1-37) with Tables 1-3, sha256:887b5c53aeb5367b127322c6972a1c41176e96dc613bc52eee296002b971c551 — https://www.hbs.edu/ris/Publication%20Files/09-060.pdf; CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), p.5 Domain C tasks C1-C7 and pp.7-8 text references, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Left in_review: shared with SOA CP-341, INV-101 and INV-201, whose readings were not reached; the EAD term, the spread-decomposition claim ('several times larger'), downgrade pricing by spread duration, migration matrices, RBC and MCT charges and the receivables list appear in neither Panning nor Coval, Jurek & Stafford. Open minor F-001 on the senior-tranche sentence. Panning (the other C5 reading) says nothing about credit risk beyond deferring default risk to 'a separate forthcoming paper' (p.6).

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Restated in place to Coval, Jurek & Stafford: 'a tranche's rating depends on default correlation as well as on default probability — Coval, Jurek & Stafford's AAA senior tranche falls to A+ at a correlation of 40% and to BBB− at 60% — tranches of tranches (CDO²) are far more sensitive still, and senior claims default in exactly the economic states where investors are worst off.' Checked against Table 3 (rendered p.34: senior CDO AAA at ρ=20%, A+ at 40%, BBB- at 60%, BB at 80%), pp.14-15 (CDO² far more sensitive) and pp.18-19 (systematic risk, defaults confined to the worst economic states). Coval, Jurek & Stafford, The Economics of Structured Finance (HBS Working Paper 09-060, 2008, the authors' institution's copy), pp.7-8 and fn.1 (default correlation), pp.14-15 and Table 3 p.34 (senior CDO tranche AAA at rho=20%, A+ at 40%, BBB- at 60%; CDO2 senior claims far more sensitive), pp.18-19 (systematic risk; defaults in the worst economic states), sha256:887b5c53aeb5367b127322c6972a1c41176e96dc613bc52eee296002b971c551 — https://www.hbs.edu/ris/Publication%20Files/09-060.pdf

## [F-002] Prepayment's place on the page did not match task C5 or Concepts/Prepayment Risk.md
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Prepayment'
- claim: Prepayment is the opposite behaviour by a borrower — paying back early, usually when rates fall — and is grouped with default because it also changes the cash flows the insurer receives.
- evidence: Outline p.5, task C5: 'Estimate and manage interest rate and credit risk (e.g., default, prepayment, reinsurance).' The outline names prepayment as an example of task C5's interest rate and credit risk together and gives no reason for grouping it with default; Concepts/Prepayment Risk.md (verified medium, 2026-10-18) states exactly that and no more. No source read this session gives the page's rationale. CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), p.3 Domain A task 2 (loss cost of treaty, facultative and other contracts; reading Clark), p.5 Domain C task C5 'Estimate and manage interest rate and credit risk (e.g., default, prepayment, reinsurance)' and C6-C7; pp.7-8 text references, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- source_rank: 1
- proposed_action: Quote task C5 and say what it says, as Concepts/Prepayment Risk.md does; keep the one-line definition and the link.
- applied: true
- fingerprint: 38414819d06d

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Corrected in place this run as proposed; the page now says only what the cited sources state: Quote task C5 and say what it says, as Concepts/Prepayment Risk.md does; keep the one-line definition and the link.

## [F-003] Credit-spread decomposition not the source's
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Spreads pay for more than expected loss'; first example's closing paragraph
- claim: Observed credit spreads are several times larger: investors are also paid for defaults that cluster in recessions (systematic risk), for illiquidity, and for downgrade risk. / ... compensation for bearing credit risk — systematic default, downgrade and illiquidity ... Booking the full spread as profit overstates the portfolio's risk-adjusted return.
- evidence: Amato & Remolona, BIS Quarterly Review Dec 2003, pp.51-53: spreads are 'many times wider than what would be implied by expected default losses alone' (BBB 3-5y: 171bp spread vs 20bp expected loss; AAA multiple 355); the factors examined are taxes, risk premia and liquidity premia, and the authors argue spreads price undiversified credit risk because corporate bond returns are highly negatively skewed. Downgrade risk is not among the listed components, and no source supports the risk-adjusted-return sentence. BIS Quarterly Review, December 2003, Amato & Remolona, The credit spread puzzle, pp.51-53 (PDF pp.56-58), Table 1 (spreads many times expected default loss; taxes, risk premia, liquidity premia; negatively skewed returns hard to diversify; transition matrix with downgrades and defaults), sha256:e3b7518fe973471144d23ade36aac097a96d02921c12b8e320f20eb4d04269f8 — https://www.bis.org/publications/qr-200312_1.pdf
- source_rank: 3
- proposed_action: Restate both to Amato & Remolona's list; drop the downgrade and risk-adjusted-return claims.
- applied: true
- fingerprint: bee2a125ad5c

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- resolves: F-003
- status: resolved
- note: Corrected in place this run as proposed; the page now says only what the cited sources state: Restate both to Amato & Remolona's list; drop the downgrade and risk-adjusted-return claims.

## [F-004] Spread-duration formula unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Loss before default'
- claim: A downgrade widens the spread and cuts the price by about −D × Δs for spread duration D.
- evidence: No source reached this session states the spread-duration approximation. Solvency II Art. 105(5)(d) defines spread risk as 'the sensitivity of the values of assets, liabilities and financial instruments to changes in the level or in the volatility of credit spreads over the risk-free interest rate term structure', and Art. 13(32)/105(6) make deterioration in credit standing part of credit risk; Amato & Remolona p.53 compute expected loss from 'a one-year ratings transition matrix – indicating probabilities of downgrades as well as defaults'. Directive 2009/138/EC (Solvency II), EUR-Lex, Art. 13(32) credit risk, 13(35) concentration risk, Art. 105(5)(a) interest rate risk, 105(5)(d) spread risk, 105(6) counterparty default risk (reinsurance arrangements, securitisations, derivatives, receivables from intermediaries; collateral), sha256:ad77288b3961fb0425f2e8db221ecc9706975bf72c37d7d3adcf8f0df62f702e — https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009L0138; BIS Quarterly Review, December 2003, Amato & Remolona, The credit spread puzzle, pp.51-53 (PDF pp.56-58), Table 1 (spreads many times expected default loss; taxes, risk premia, liquidity premia; negatively skewed returns hard to diversify; transition matrix with downgrades and defaults), sha256:e3b7518fe973471144d23ade36aac097a96d02921c12b8e320f20eb4d04269f8 — https://www.bis.org/publications/qr-200312_1.pdf
- source_rank: 3
- proposed_action: Restate as spread risk (value falls as the spread widens before default) with transition matrices for downgrades; drop the −D×Δs formula until a source for it is cited.
- applied: true
- fingerprint: 17760d5032ee

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- resolves: F-004
- status: resolved
- note: Corrected in place this run as proposed; the page now says only what the cited sources state: Restate as spread risk (value falls as the spread widens before default) with transition matrices for downgrades; drop the −D×Δs formula until a source for it is cited.

## [F-005] Closing sentences of 'Managing it' unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Managing it'
- claim: Diversification and concentration limits by issuer, sector and reinsurer; rating floors; collateral; credit derivatives ... Together with Interest Rate Risk it is the main financial risk of a bond portfolio.
- evidence: Sources support approved-counterparty lists, per-counterparty exposure limits, collateral/letters of credit and CDS (Bodoff pp.1-3), collateral as a mitigant in the MCT (Ch.6), RBC R1 covering both interest rate changes and default of fixed income and R3 receivables and recoverables (Odomirok p.244). 'Rating floors' and 'the main financial risk of a bond portfolio' are in none of them. Bodoff, Discarding Risk Avoidance and Embracing Risk Optimization: Managing Reinsurance Credit Risk (CAS E-Forum, Winter 2011), pp.1-3: definition; approved reinsurer lists, exposure limits per reinsurer, collateral and letters of credit; deterioration after inception on long-tail lines; credit default swaps, sha256:75501990bd6888e036e7c52a00dbb2408a9833da87f0112fec6ffb8a47a3c2ac — https://casact.org/sites/default/files/database/forum_11wforum_bodoff.pdf; Odomirok, Kennedy & Pantaleo, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2020), printed pp.63-66 (reinsurance note: unsecured recoverables incl. paid losses billed not collected, ceded reserves and ceded UPR; LOC, trust, funds withheld; disputes; commutation; concentration), pp.111-112 and 119-127 (Schedule F: provision for reinsurance as a liability, change to surplus; authorized/unauthorized; overdue; RBC credit charge), p.244 (RBC R1 fixed income incl. interest rates and default; R3 receivables and reinsurance recoverables), p.376 (treaty and facultative reinsurance; unregistered reinsurance collateral), p.412 glossary (facultative reinsurance), sha256:74917dcb2ca8b1cf210a7fd66b08d4c90d844a13dd14b2c71690a18e51eb4a5c — https://www.casact.org/sites/default/files/2021-03/6U_CAS_Financial_Reporting.pdf; OSFI, Minimum Capital Test Guideline (2024), §4.3.2.2 registered reinsurance risk factors, §4.3.3 unregistered reinsurers (deduction net of acceptable collateral, 20% margin), Ch. 6 Credit Risk (definition, counterparties, rating-based factors, collateral), sha256:d24a1551e11bac611332379a895a9001c80ce749975b5fe4abfb203170efd5bf — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 3
- proposed_action: Restate to the sourced tools and the RBC R1/R3 and MCT descriptions; replace 'the main financial risk' with 'both financial risks of a bond portfolio'.
- applied: true
- fingerprint: d0f296e4facf

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- resolves: F-005
- status: resolved
- note: Corrected in place this run as proposed; the page now says only what the cited sources state: Restate to the sourced tools and the RBC R1/R3 and MCT descriptions; replace 'the main financial risk' with 'both financial risks of a bond portfolio'.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: every sentence against an open source: definition and exposures (Solvency II Art.13(32), 105(6); MCT Ch.6; RBC R1/R3 in Odomirok p.244); EL = PD×LGD×EAD and LGD's dependence on collateral (BCBS IRB note §2); credit spread puzzle (Amato & Remolona Table 1, pp.51-53); C5 quote against outline p.5 and consistency with Concepts/Prepayment Risk.md; spread risk and transition matrices (Solvency II 105(5)(d); Amato & Remolona p.53); correlation and tranche ratings (CJS fn.1, Table 3 rendered, pp.14-19); management tools (Bodoff; MCT; Odomirok); both examples recomputed blind before reading the answers (75,000 and 650,000, 0.15%; p²+ρp(1−p)=0.0025+0.0095=1.20%, P(1)=2(0.05−0.012)=7.6%, P(0)=91.2%, 4.8×); all wiki links resolve
- sources_checked: BCBS, An Explanatory Note on the Basel II IRB Risk Weight Functions (BIS, July 2005), §2, pp.3-4 (EL = PD * EAD * LGD; PD, EAD, LGD defined; LGD depends on collateral), sha256:387f8627a148dbd0a6eff3c5a0a020e44044051d3d8f34f0485b8297f49b503d — https://www.bis.org/publications/explanatory-note-basel-ii-irb-risk-weight-functions.pdf; BIS Quarterly Review, December 2003, Amato & Remolona, The credit spread puzzle, pp.51-53 (PDF pp.56-58), Table 1 (spreads many times expected default loss; taxes, risk premia, liquidity premia; negatively skewed returns hard to diversify; transition matrix with downgrades and defaults), sha256:e3b7518fe973471144d23ade36aac097a96d02921c12b8e320f20eb4d04269f8 — https://www.bis.org/publications/qr-200312_1.pdf; Directive 2009/138/EC (Solvency II), EUR-Lex, Art. 13(32) credit risk, 13(35) concentration risk, Art. 105(5)(a) interest rate risk, 105(5)(d) spread risk, 105(6) counterparty default risk (reinsurance arrangements, securitisations, derivatives, receivables from intermediaries; collateral), sha256:ad77288b3961fb0425f2e8db221ecc9706975bf72c37d7d3adcf8f0df62f702e — https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009L0138; OSFI, Minimum Capital Test Guideline (2024), §4.3.2.2 registered reinsurance risk factors, §4.3.3 unregistered reinsurers (deduction net of acceptable collateral, 20% margin), Ch. 6 Credit Risk (definition, counterparties, rating-based factors, collateral), sha256:d24a1551e11bac611332379a895a9001c80ce749975b5fe4abfb203170efd5bf — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024; Odomirok, Kennedy & Pantaleo, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2020), printed pp.63-66 (reinsurance note: unsecured recoverables incl. paid losses billed not collected, ceded reserves and ceded UPR; LOC, trust, funds withheld; disputes; commutation; concentration), pp.111-112 and 119-127 (Schedule F: provision for reinsurance as a liability, change to surplus; authorized/unauthorized; overdue; RBC credit charge), p.244 (RBC R1 fixed income incl. interest rates and default; R3 receivables and reinsurance recoverables), p.376 (treaty and facultative reinsurance; unregistered reinsurance collateral), p.412 glossary (facultative reinsurance), sha256:74917dcb2ca8b1cf210a7fd66b08d4c90d844a13dd14b2c71690a18e51eb4a5c — https://www.casact.org/sites/default/files/2021-03/6U_CAS_Financial_Reporting.pdf; Bodoff, Discarding Risk Avoidance and Embracing Risk Optimization: Managing Reinsurance Credit Risk (CAS E-Forum, Winter 2011), pp.1-3: definition; approved reinsurer lists, exposure limits per reinsurer, collateral and letters of credit; deterioration after inception on long-tail lines; credit default swaps, sha256:75501990bd6888e036e7c52a00dbb2408a9833da87f0112fec6ffb8a47a3c2ac — https://casact.org/sites/default/files/database/forum_11wforum_bodoff.pdf; Coval, Jurek & Stafford, The Economics of Structured Finance (HBS Working Paper 09-060, 2008, the authors' institution's copy), pp.7-8 and fn.1 (default correlation), pp.14-15 and Table 3 p.34 (senior CDO tranche AAA at rho=20%, A+ at 40%, BBB- at 60%; CDO2 senior claims far more sensitive), pp.18-19 (systematic risk; defaults in the worst economic states), sha256:887b5c53aeb5367b127322c6972a1c41176e96dc613bc52eee296002b971c551 — https://www.hbs.edu/ris/Publication%20Files/09-060.pdf; CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), p.3 Domain A task 2 (loss cost of treaty, facultative and other contracts; reading Clark), p.5 Domain C task C5 'Estimate and manage interest rate and credit risk (e.g., default, prepayment, reinsurance)' and C6-C7; pp.7-8 text references, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Verified at D22's medium ceiling: no assigned Exam 9 reading treats credit risk beyond CJS (Panning defers default risk to another paper, p.6), so the generic claims rest on rank-3 open sources (BIS, EUR-Lex, OSFI, CAS publications). F-001 resolved; four minor findings fixed in place (prepayment bullet now quotes C5 as Concepts/Prepayment Risk.md does; spread decomposition, spread-duration formula and 'main financial risk' restated or cut). The SOA CP-341, INV-101 and INV-201 readings that also link this page were not read; nothing on the page depends on them.
