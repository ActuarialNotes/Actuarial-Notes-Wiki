---
target: Concepts/Interest Rate Risk.md
created: 2026-10-18
---

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/9c55
- date: 2026-10-18
- status_set: in_review
- checks_run: Exam 9 half against Panning: franchise-value definition, duration mechanism (premiums priced to a fixed target return fall as rates rise, p.9), asset-duration hedge needing zero or negative duration (p.10), pricing-strategy alternative (pp.10-11); 'Franchise Value and Total Economic Value' example recomputed (126.19 = S+P-E, 71.43 = L/1.05, D_V = 6.70, 5.18 with zero-duration assets, D_A = -3.42; 7.62 and 3.27 under a=10%, b=1) and diffed with Panning pp.9-10; surplus-duration example recomputed (D_S = 9.17, ΔS = -27.5M, D_A = 1.75); wiki links resolve
- sources_checked: Panning, Managing Interest Rate Risk: ALM, Franchise Value, and Strategy (Willis Re Working Paper, July 2006), pp.1-12 read in full (title page, contents p.2, Sections 1-8, Table 1 p.9, formulas pp.6-9 read from the rendered pages), sha256:9f569b0edf7a677b08716b2c06103c0c7826007d00c5a17c5f4d32f129e32278 — https://www.casact.org/sites/default/files/2021-03/9_Panning.pdf; CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), p.5 Domain C tasks C1-C7 and pp.7-8 text references, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Panning half (the franchise-value bullet and the second example) agrees with Panning in full; the example's 'both treated as having duration 1' is a stated simplification of Panning's 'duration just less than one year' (p.9), which still gives Panning's 6.70 and 5.18. Left in_review because the page is shared with SOA CP-351 and ILA-101, whose readings were not reached this session: the surplus-duration formulas, price/reinvestment risk, key-rate and effective duration, negative convexity of MBS and callables, claim inflation offset and the hedging-tools bullet appear in neither Panning nor Coval, Jurek & Stafford and still need those exams' sources. Arithmetic of both examples is right.

## [F-001] Key-rate durations named without a source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Beyond parallel shifts'
- claim: Key-rate durations capture twists in the curve.
- evidence: No source reached this session defines key-rate durations (OCC's 'key rate' at printed pp.62, 74 is a model rate driver, not a duration). The OCC Handbook p.1 defines yield curve risk ('changing rate relationships across the spectrum of maturities'), which a parallel-shift duration does not capture. The SOA CP-351 reading 'Key Rate Durations: Measures of Interest Rate Risk' was not reached. OCC, Comptroller's Handbook: Interest Rate Risk, Version 1.0, printed p.1 (IRR: repricing, basis, yield curve and options risk; earnings and economic value), pp.8-9 (prepayment options, convexity, MBS negative convexity), p.56 (options, futures, swaps), p.75 glossary (convexity, effective duration), sha256:e96b2f0fe28b67db124aa7e56743b1b4e0b30c00d60461f124c1f776d96e2aac — https://www.occ.gov/publications-and-resources/publications/comptrollers-handbook/files/interest-rate-risk/pub-ch-interest-rate-risk.pdf
- source_rank: 3
- proposed_action: Restate as yield curve risk (OCC); a writer may restore key-rate durations with a citable source (CP-351's reading).
- applied: true
- fingerprint: 319474be3461

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Corrected in place this run as proposed; the page now says only what the cited sources state: Restate as yield curve risk (OCC); a writer may restore key-rate durations with a citable source (CP-351's reading).

## [F-002] Claim-inflation offset stated as mechanism without a source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Beyond parallel shifts'
- claim: P&C reserves are not fixed nominal amounts: claim inflation, which tends to move with rates, partly offsets the fall in their present value when rates rise.
- evidence: Feldblum (CAS Discussion Paper Program 1989), abstract p.117: 'Property/Casualty insurance liabilities are inflation sensitive. Inflation sensitive liabilities are similar to short duration assets with regard to the effects of interest rate fluctuations.' The source supports the conclusion (shorter effective duration) but not the stated mechanism ('tends to move with rates, partly offsets'). Feldblum, Asset Liability Matching for Property/Casualty Insurers (CAS Discussion Paper Program, 1989), abstract p.117 (P&C liabilities are inflation sensitive and similar to short-duration assets for interest rate effects), p.130 (futures and call options to lengthen asset duration), sha256:4eb1402af07cc8836b53fc0a305b32da273cf40eb31adbcc902254e08c0e25e3 — https://www.casact.org/pubs/dpp/dpp89/89dpp117.pdf
- source_rank: 3
- proposed_action: Restate to Feldblum's words.
- applied: true
- fingerprint: 8705d394ebdb

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Corrected in place this run as proposed; the page now says only what the cited sources state: Restate to Feldblum's words.

## [F-003] Unsourced framing sentences
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- severity: nit
- status: open
- locus: bullet 'Tools'; formula notes ('leverage amplifies')
- claim: Interest rate risk is measured on the same economic balance sheet as the rest of the insurer's financial risk ... Surplus duration ... shows how leverage amplifies any mismatch.
- evidence: Neither sentence is in a source read this session. Panning p.9: 'the duration of franchise value is equal to its dollar duration divided by its present value ... first calculate the PV and Dollar Duration of the total, and ... divide the latter by the former', which is the rule D_S = (A D_A − L D_L)/S follows; the example's 9.17 vs 4.5 shows the magnification. Tools: cash-flow matching and duration matching (Bigel §9.43), options, futures and swaps (OCC p.56; Feldblum p.130; Panning p.10 'purchasing derivative securities that modify the firm's asset duration'). Panning, Managing Interest Rate Risk: ALM, Franchise Value, and Strategy (Willis Re, July 2006), pp.2, 4, 8-11 (ALM ignores franchise value invisible to accounting; duration of a total = dollar duration / PV; D_F 17.62, D_V 6.70, 5.18; zero or negative asset duration infeasible and invisible to regulators and rating agencies; derivatives to modify asset duration; pricing strategy 7.62 and 3.27), sha256:9f569b0edf7a677b08716b2c06103c0c7826007d00c5a17c5f4d32f129e32278 — https://www.casact.org/sites/default/files/2021-03/9_Panning.pdf; Bigel, Fixed Income Mathematics (Touro University open textbook, CC BY-NC 4.0), §9.43 Immunization: duration is where interest-on-interest offsets the capital gain or loss; matching asset and liability duration; cash flow matching, sha256:2d7d41e91760346a73118dd721661368c2e7e3d39d67f7ca15229930729ecf99 — https://touro.pressbooks.pub/fixedincomemathematics/chapter/9-43-immunization-duration-matching/
- source_rank: 3
- proposed_action: Restate D_S through Panning's dollar-duration rule and the tools to the sourced list; drop the 'same economic balance sheet' clause.
- applied: true
- fingerprint: 32d515071c93

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- resolves: F-003
- status: resolved
- note: Corrected in place this run as proposed; the page now says only what the cited sources state: Restate D_S through Panning's dollar-duration rule and the tools to the sourced list; drop the 'same economic balance sheet' clause.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: definition against OCC p.1 (earnings and economic value; yield curve risk) and Solvency II 105(5)(a); ΔS and ΔV formulas and D_S through Panning's dollar-duration rule (p.9) with OCC's effective duration (glossary p.75); price/reinvestment offset and immunization (Bigel §9.43); convexity definition and MBS/callable negative convexity (OCC pp.8-9, p.75; Bigel §9.38); P&C liabilities' inflation sensitivity (Feldblum abstract); franchise-value bullet against Panning pp.2-11 word by word ('infeasible in practice although possible in principle', regulators and rating agencies see only accounting numbers); tools (Bigel; OCC p.56; Feldblum p.130; Panning p.10); both examples recomputed blind (D_S=2,750/300=9.17, ΔS=−27.5M, D_A=1.75; D_V=558.16/83.33=6.70, 431.97/83.33=5.18, D_A=−431.97/126.19=−3.42) and the Panning one diffed with Panning p.10; all wiki links resolve
- sources_checked: Panning, Managing Interest Rate Risk: ALM, Franchise Value, and Strategy (Willis Re, July 2006), pp.2, 4, 8-11 (ALM ignores franchise value invisible to accounting; duration of a total = dollar duration / PV; D_F 17.62, D_V 6.70, 5.18; zero or negative asset duration infeasible and invisible to regulators and rating agencies; derivatives to modify asset duration; pricing strategy 7.62 and 3.27), sha256:9f569b0edf7a677b08716b2c06103c0c7826007d00c5a17c5f4d32f129e32278 — https://www.casact.org/sites/default/files/2021-03/9_Panning.pdf; OCC, Comptroller's Handbook: Interest Rate Risk, Version 1.0, printed p.1 (IRR: repricing, basis, yield curve and options risk; earnings and economic value), pp.8-9 (prepayment options, convexity, MBS negative convexity), p.56 (options, futures, swaps), p.75 glossary (convexity, effective duration), sha256:e96b2f0fe28b67db124aa7e56743b1b4e0b30c00d60461f124c1f776d96e2aac — https://www.occ.gov/publications-and-resources/publications/comptrollers-handbook/files/interest-rate-risk/pub-ch-interest-rate-risk.pdf; Directive 2009/138/EC (Solvency II), EUR-Lex, Art. 13(32) credit risk, 13(35) concentration risk, Art. 105(5)(a) interest rate risk, 105(5)(d) spread risk, 105(6) counterparty default risk (reinsurance arrangements, securitisations, derivatives, receivables from intermediaries; collateral), sha256:ad77288b3961fb0425f2e8db221ecc9706975bf72c37d7d3adcf8f0df62f702e — https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009L0138; Bigel, Fixed Income Mathematics (Touro University open textbook, CC BY-NC 4.0), §9.43 Immunization: duration is where interest-on-interest offsets the capital gain or loss; matching asset and liability duration; cash flow matching, sha256:2d7d41e91760346a73118dd721661368c2e7e3d39d67f7ca15229930729ecf99 — https://touro.pressbooks.pub/fixedincomemathematics/chapter/9-43-immunization-duration-matching/; Bigel, Fixed Income Mathematics (Touro University open textbook, CC BY-NC 4.0), §9.38 Negative Convexity: callable bonds and mortgage-backed bonds, sha256:fac605aa5ccee98d80af827f1f2b7ed86bb2512bc3fff9a1399eebbd6cbae73d — https://touro.pressbooks.pub/fixedincomemathematics/chapter/9-38-negative-convexity/; Feldblum, Asset Liability Matching for Property/Casualty Insurers (CAS Discussion Paper Program, 1989), abstract p.117 (P&C liabilities are inflation sensitive and similar to short-duration assets for interest rate effects), p.130 (futures and call options to lengthen asset duration), sha256:4eb1402af07cc8836b53fc0a305b32da273cf40eb31adbcc902254e08c0e25e3 — https://www.casact.org/pubs/dpp/dpp89/89dpp117.pdf; CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), p.3 Domain A task 2 (loss cost of treaty, facultative and other contracts; reading Clark), p.5 Domain C task C5 'Estimate and manage interest rate and credit risk (e.g., default, prepayment, reinsurance)' and C6-C7; pp.7-8 text references, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Verified at medium (D22): Panning half at rank 2; the general ALM half on rank-3 open sources (OCC, Solvency II, Bigel's CC-licensed text, Feldblum's CAS paper). Three findings fixed in place: key-rate durations cut for want of a source (restated as yield curve risk; CP-351's key-rate reading would restore it), claim-inflation mechanism restated to Feldblum, two unsourced framing sentences restated. Consistent with Concepts/Prepayment Risk.md: MBS appear only as an embedded-option asset.
