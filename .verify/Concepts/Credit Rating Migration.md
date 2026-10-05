---
target: Concepts/Credit Rating Migration.md
created: 2026-10-04
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: matrix orientation, absorbing default, cumulative vs year-n default probability, agency-published one-year matrices and matrix powers under the Markov assumption, Markov caveats (credit cycle, momentum), EL = Exposure x PD x LGD, reinsurance-recoverable use, and the absorbing-state degeneracy of the stationary distribution - each matched to CreditMetrics, Fei-Fuertes-Kalotychou, Nickell-Perraudin-Varotto, the BCBS note, the CAS CLRS handout and Ross; examples recomputed in Python before comparing: rows sum to 1; P^2_AD = 0.0036, P^2_BD = 0.045, year-2 B default 0.025; ECL = 13,200, B share 450/522 = 86% - all match; links resolve; LaTeX balanced
- sources_checked: CreditMetrics Technical Document (J.P. Morgan 1997; RiskMetrics 2007 reprint): Sec. 1.6.1 rows = current rating, columns = rating at horizon, rows sum to 100%, matrices published by S&P and Moody's PDF p.36; Sec. 2.5.3 two-year matrix = one-year matrix times itself, and Altman & Kao's positive autocorrelation in downgrades PDF pp.48-49; Sec. 6.4.1 transition matrix as a Markov process PDF p.88; Sec. 6.4 'since default is an absorbing state, eventually all firms will default' PDF p.91, sha256:b9e9cf7e01f8cc89dedd1ca1c1df377714c6ecefa99c587d1addbb130d7367c7 - https://www.msci.com/documents/10199/93396227-d449-4229-9143-24a94dab122f; Fei, Fuertes & Kalotychou, 'Credit Rating Migration Risk and Business Cycles' (accepted manuscript, J. Business Finance & Accounting): Sec. 2.1 Markov (A1) and time-homogeneity (A2) assumptions, n-year matrix Q(n) = Q(1)^n, footnote 4 rating momentum/drift - 'a downgraded issuer is prone to further subsequent downgrades', PDF p.6; default state absorbing PDF p.12, sha256:f7229981d59f7ed4eafc1c56bf6773a39a24fc77106aeeb35c9d029ae819c637 - https://www.aifirm.it/wp-content/uploads/2014/11/Fuertes-e-Credit-Rating-Migration-Risk-and-Business-Cycles.pdf; Nickell, Perraudin & Varotto, 'Stability of ratings transitions', Bank of England Working Paper 133 (2001): Abstract and Summary, Sec. 1 (transition matrices vary with the business cycle), Sec. 2.4 business cycle effects PDF pp.3-6, 14-15, sha256:fa30a76187f297da75a593e68afc41fe3bde535d643ee5abc71aed6a72bbbb78 - https://www.bankofengland.co.uk/-/media/boe/files/working-paper/2001/stability-of-ratings-transitions.pdf; Basel Committee on Banking Supervision, 'An Explanatory Note on the Basel II IRB Risk Weight Functions' (July 2005), Sec. 2: EL = PD * EAD * LGD; LGD = percentage of exposure lost in default, PDF pp.7-8, sha256:387f8627a148dbd0a6eff3c5a0a020e44044051d3d8f34f0485b8297f49b503d - https://www.bis.org/publications/explanatory-note-basel-ii-irb-risk-weight-functions.pdf; Mubyana, 'Reinsurance Counterparty Risk - A Transition Matrix / Recovery Rate Approach', CAS 2013 CLRS handout (Towers Watson): reinsurance counterparty risk on ceded balances modelled with base/stressed transition matrices, PDF pp.1-7, sha256:f0bedcc686a415cfbb3625713e1fcb11841207c44d1a8999c21c5dd2550c46c8 - https://www.casact.org/sites/default/files/presentation/clrs_2013_handouts_paper_2475_handout_1388_0.pdf; Ross, Introduction to Probability Models, Ch. 4 (course-hosted copy on NTNU TMA4265 page; edition earlier than the 11th-13th the 2026 outline lists): absorbing-set technique - being in an absorbing set at time n = having entered it by time n, p.192, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 - https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf
- note: No findings. Credit-rating migration is an application, not a named topic in the 2026 MAS-I outline (Ross 4.1-4.8 is); the page's mathematics is the absorbing-chain material of Ross Ch.4. Confidence medium: rank-3 sources only for the credit-specific claims.

## [C-002] Dollar figure in C-001 checks_run lost to shell expansion
- entry_type: correction
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- locus: log entry C-001, checks_run
- note: Erratum to C-001 (same run): the checks_run text reads "ECL = 13,200" because the recorder command was double-quoted and the shell expanded "$3". The recomputed figure, which matches the page, is ECL = $313,200 (0.60 x (20,000,000 x 0.0036 + 10,000,000 x 0.045)). No change to the status or to the page.
