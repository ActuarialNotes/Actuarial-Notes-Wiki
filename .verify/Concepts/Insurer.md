---
target: Concepts/Insurer.md
created: 2026-09-28
---

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: in_review
- checks_run: Definition vs P-21-05 §II (insurer pays claims for premium, pooling). Pooling formula SD(S_n/n) = sigma/sqrt(n) vs G&S p.274 and P-21-05 pp.4-5. Example 1 recomputed first: 2.576 x 4000 = 10304; /sqrt(400) = 515.20; /sqrt(40000) = 51.52 - agrees. Example 2 arithmetic recomputed: capital 300, strengthening 70, new capital 230, ratio 200% -> 153.3%, 70/300 = 23%, 700/300 = 2.33 - agrees. All wiki-links resolve.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §II How insurance works PDF pp.2-3; §III pooling theorem, CV of the pool tends to zero PDF pp.4-5; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Ch.6: V(cX) = c^2 V(X) (PDF p.267), E((xbar - mu)^2) = sigma^2/n (PDF p.274), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf
- note: In review, not verified: the page is mostly Exam 9 / 6C / 6U material that no source reached this run supports - the frictional-cost bullet (double taxation, agency and distress costs), Forms of insurer, the Canada bullet (OSFI, Insurance Companies Act, MCT, PACICC, IFRS 17) with the 150% supervisory target used in Example 2, the United States bullet (state regulation, admitted vs surplus lines, RBC, IRIS, Schedule F, discounted tax reserves), and Assets = Liabilities + Capital. Needs the Exam 9 capital readings, the OSFI MCT Guideline and the 6U statutory-accounting readings. The z = 2.576 for 99.5% was taken as given, not diffed against the SOA normal table. No errors found in what was checked.

## [F-001] Exam 9, 6U and general insurer claims with no source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- severity: minor
- status: open
- locus: formula block and bullets 2-5 (Assets = Liabilities + Capital, Why capital is costly, Forms, Canada, United States)
- claim: Frictional costs of capital (double taxation, agency and distress costs); forms of insurer (stock, mutual, reciprocal, Lloyds, captive, RRG); Canada bullet naming PACICC and IFRS 17; US bullet (state regulation, admitted vs surplus lines, RBC, IRIS, Schedule F, discounted tax reserves); Assets = Liabilities + Capital.
- evidence: The C-001 pass of this run found none of these supported by any source reached (P-21-05, Grinstead & Snell); they need the Exam 9 capital readings, the 6U statutory-accounting readings and OSFI guidance. None of those readings was reached this session apart from the OSFI MCT Guideline (2026), which supports only the capital-adequacy part of the Canada bullet.
- source_rank: 1
- proposed_action: Delete what no source supports; restate the Canada bullet from the MCT Guideline.
- applied: true
- fingerprint: e00f5e14bc6b

## [F-001/R] Unsourced bullets deleted; Canada bullet restated from the MCT Guideline
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Deleted the Assets = Liabilities + Capital formula and the frictional-cost, Forms and United States bullets. Canada bullet rewritten to what the OSFI MCT Guideline (2026) preamble and Chapter 1 say: ICA 515(1) adequate capital, 608(1) adequate margin of assets in Canada for branches (BAAT), the guideline as the framework for the Superintendent, MCT ratio = capital available / minimum capital required, minimum = target-level requirements / 1.5, 100% minimum, 150% supervisory target as a cushion that facilitates early intervention. Added the self-insurance bullet from Friedland PDF p.19 and the independence criterion (stores and fire) from P-21-05 PDF p.6; Example 2 wording aligned with the guideline (minimum capital required; 100% minimum).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001 (the C-001 in_review reasons): every remaining statement traced to P-21-05, Grinstead and Snell, the MCT Guideline (2026) or Friedland. z = 2.576 = table 2.5758 rounded. Example 1 recomputed: 2.576 x 4000 = 10304; /20 = 515.20; /200 = 51.52. Example 2 recomputed: 1200 - 700 - 200 = 300; 0.10 x 700 = 70; 230; 300/150 = 200%; 230/150 = 153.3%; 70/300 = 23%; 700/300 = 2.33. All wiki-links resolve. Medium: original worked examples; the OSFI page is hash-bound to its fetch.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §II insurer pays claims for premium PDF p.2; §V losses should be reasonably independent, stores in one area against fire PDF p.6; §III CV of the pool tends to zero PDF pp.4-5; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Ch.6: V(cX) = c^2 V(X) (PDF p.267), E((xbar - mu)^2) = sigma^2/n (PDF p.274), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; OSFI, Minimum Capital Test Guideline (2026), Guideline A, dated November 20, 2025, effective January 1, 2026: preamble (ICA subsections 515(1) and 608(1), BAAT) and Chapter 1 §1.1 (target requirements divided by 1.5; MCT ratio = capital available over minimum capital required; 100% minimum; 150% supervisory target, cushion facilitating early intervention), fetched 2026-09-28, sha256:ea844a609d445629333542801b8a08562093647a1c69cf6865c10e17e35db864 — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2026; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS study note), insurers vs self-insurers (funded self-insured programs, captive insurers, pooling associations) PDF p.19, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; SOA Exam P normal distribution table (rev. 4/29/21), Pr(Z<z) = 0.995 at z = 2.5758, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf

## [F-002] F-001's fix deleted Exam 9, 6C and 6U content outside this sweep's scope
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- severity: minor
- status: open
- locus: Assets formula; bullets Why capital is costly (Exam 9), Forms, Canada (Exam 6C) second half, United States (Exam 6U)
- claim: F-001/R deleted the Assets = Liabilities + Capital formula and the Exam 9, Forms and United States bullets, and cut the provincial, PACICC and IFRS 17 sentences from the Canada bullet
- evidence: This page is shared by Exam P, 5, 6C, 6U and 9. The Exam P sweep that opened F-001 had no Exam 9, 6C or 6U reading, so the deleted statements were unsourced in this sweep, not shown wrong: no source read in either Exam P run contradicts any of them. Deleting another exam's material because the Exam P sweep could not reach its readings removes content those exams' own sweeps should judge, and the page's C-001 in_review note already records exactly this gap.
- source_rank: 5
- proposed_action: Restore the deleted statements; keep the sourced rewrites (pooling, self-insurance, the MCT sentences of the Canada bullet); leave the page in_review until an Exam 9 / 6C / 6U sweep checks the restored statements against those readings.
- applied: true
- fingerprint: bdee63639358

## [F-002/R] Other exams' content restored; page back to in_review
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-002
- status: resolved
- note: Restored verbatim from the page before this run (commit 3322d0a7): the Assets = Liabilities + Capital formula, the Exam 9 frictional-cost bullet, the Forms bullet (minus its self-insured sentences, which the new sourced Self-insurance bullet covers), the United States (Exam 6U) bullet, and the Canada bullet's provincial-supervision, licensing, PACICC and IFRS 17 sentences (appended after the MCT sentences sourced to the OSFI MCT Guideline). The sourced rewrites from F-001/R stay. The restored statements are unverified: they belong to Exam 9, 6C and 6U readings no Exam P sweep reads.

## [C-003] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: in_review
- checks_run: Exam P content re-checked as in C-002 (P-21-05 pooling and independence; Grinstead & Snell variance of the mean; Examples 1 and 2 recomputed: 515.20, 51.52; 300 to 230, 200% to 153.3%). Restored text compared line by line with commit 3322d0a7.
- note: In review, not verified: the Exam P content (definition, pooling, self-insurance, MCT sentences, both examples) is sourced as recorded in C-002, but the restored Exam 9 frictional-cost, Forms, Canada provincial/PACICC/IFRS 17 and United States statements and the Assets identity have no source read in this sweep. They are left for an Exam 9 / 6C / 6U sweep rather than deleted. No open findings.

## [F-003] Provincial supervision sentence not what the reading says
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: Canada (Exam 6C) bullet, sentence after the MCT sentences
- claim: Insurers incorporated in a province are supervised by that province.
- evidence: CAS, Financial Reporting Through the Lens of a P/C Actuary, PDF p.358: 'insurance companies can choose to be registered federally (across Canada) or separately in each province where they conduct business. The majority of insurers are regulated federally under the jurisdiction of ... OSFI.' OSFI E-15 (footnotes 1 and 4) also counts 'provincial companies' as defined in ICA s. 2(1) among the companies OSFI's guideline applies to, so incorporation in a province does not by itself mean provincial supervision.
- source_rank: 2
- proposed_action: Restate from CAS FR p.358.
- applied: true
- fingerprint: f4809b3e3497

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Sentence replaced with 'An insurer can instead be registered separately in each province where it does business, though most are federally regulated by OSFI.' (CAS FR PDF p.358).

## [C-004] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: in_review
- checks_run: Exam 6C statements: ICA 515(1)/608(1), BAAT, MCT ratio and 1.5, 100% minimum and 150% target against MCT 2024 preamble and Ch.1; federal/provincial registration, provincial licensing and market conduct against CAS FR p.358; IFRS against CAS FR p.359 and the CIA IFRS 17 comparison note p.6; PACICC against the PACICC guide pp.1-2. Exam 6U statements: state regulation, domiciliary lead, licensing and surplus lines, Annual Statement on SAP, RBC/IRIS/SAO/Schedule F, discounted tax reserves against CAS FR pp.10-11, 26, 104, 109, 303-304, 351 and the NAIC 2013 white paper pp.4, 17-18, 44. Assets = Liabilities + Capital against CAS FR p.35 (Admitted Assets = Liabilities + Surplus). Forms bullet: stock and mutual (CAS FR pp.40-41), captive (Friedland p.19, NAIC p.25), RRG (CAS FR p.104). Example 2 re-read against MCT §1.2.1 (153% just above the 150% target).
- sources_checked: OSFI, Minimum Capital Test Guideline (2024), Guideline A, preamble (ICA ss. 515(1), 608(1)); §1.1.1, §1.1.2 (target-level requirements less diversification credit, divided by 1.5; MCT ratio = capital available / minimum capital required); §1.2.1 (100% minimum, 150% supervisory target, internal target); §4.2.1, §4.3.3.2, sha256:34c28477cae162661beec2d0b80b23314746df6b488fe6b959fe0606177fc60e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024; Odomirok et al., Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2020), PDF pp.10-11 (U.S. insurers regulated by the states they are licensed in; NAIC not a regulator; SAP prescribed or permitted by the domiciliary state), p.26 (Annual Statement on SAP), p.35 (Admitted Assets = Liabilities + Surplus), pp.40-41 (stock and mutual insurers), p.104 (Schedule T: licensed, RRG, eligible surplus lines), p.109 (Schedule F, regulators' focus on reinsurance collectability), pp.303-304 (regulators' tools: RBC, IRIS/FAST, SAO, used together), p.351 (tax-basis incurred losses use discounted reserves), pp.358-359 (Canada: federal or provincial registration, OSFI, provincial licensing and market conduct, IFRS), sha256:d35e87ed0e674d7e0d52b225dcc1683f6553073e1c89f106f05f5cb80cea8aa7 — https://www.casact.org/sites/default/files/2021-03/6C_CAS_Financial_Reporting.pdf; PACICC, guide to the compensation plan for property and casualty insurers, PDF pp.1-2 (Plan comes into operation on the insolvency of a P&C insurer; covers most claims under most P&C policies), sha256:5f983f23846df2d2d36fdc6a8b20578b058eed910e3c96d2f9be30162b229441 — https://www.casact.org/sites/default/files/2021-03/6C_PACICC.pdf; CIA, Educational Note: Comparison of IFRS 17 to current CIA standards, PDF p.6, Introduction (IFRS 17 effective in Canada January 1, 2023), sha256:dad0c798ecf3320c7887ed8bdb2820811617951a5c94c1ede6b05da9706560db — https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educatitional_Note_Comparision_of_IFRS_17_to_CurrentCIA.pdf; NAIC White Paper, The U.S. National State-Based System of Insurance Financial Regulation and the Solvency Modernization Initiative (2013), PDF p.4 n.3 (receivership in the domiciliary state), pp.17-18 (domiciliary states prioritise review; others may rely on the accredited domiciliary state's exams), p.44 (surplus lines = unlicensed companies), sha256:77020d3a75a8043a1c773a26bb3b750c65274d68e764757c018e9e0099621e77 — https://casact.org/sites/default/files/2021-03/6U_NAIC_Solvency_Regulatory_Framework.pdf
- note: Still in review: (1) the Exam 9 'Why capital is costly' bullet (double taxation, agency, distress and regulatory costs; risk load; policyholders as largest creditors) needs Exam 9's capital readings - Cummins, 'Allocation of Capital in the Insurance Industry' (RMIR 2000; paywalled, the CAS hosts only the abstract), or Mildenhall & Major (2022) / Brehm et al. (books); none reachable free. (2) In the Forms bullet, 'reciprocal exchange', 'Lloyd's syndicate' and 'mutual (owned by its policyholders)' occur in no reading read (CAS FR, NAIC white paper); they need a 6U reading such as Vaughn. Everything else on the page is now sourced: Exam P content per C-002 (P-21-05, Grinstead & Snell, Friedland p.19, SOA normal table - not re-read this run), the Canada and United States bullets and the Assets identity per the sources cited here.

## [F-004] Exam 9 capital-cost bullet: risk-load link and 'largest creditors' not what the sources say
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:34Z/66d2
- date: 2026-10-18
- severity: minor
- status: open
- locus: Why capital is costly (Exam 9) bullet
- claim: Capital bears the costs of financial distress; those market imperfections give capital a cost, and that cost is why premiums include a risk load; capital structure matters to policyholders, who are the insurer's largest creditors.
- evidence: Zhang, Variance 2:1 (CAS), PDF p.10 §4.1: frictional costs of capital are corporate taxes ('investment income of capital is first taxed at the corporate level and then taxed again ... double taxation'), agency costs, and 'insurance regulations also contribute frictional costs by limiting the investment opportunity'; 'Frictional costs of capital should not be confused with the cost of capital', which is the return shareholders require and 'is not due to inefficiency of the firm'. P.11 §4.2: the costs of financial distress rise as capital falls (less capital, not capital held). P.4 §2.2: 'Insurance premium covers claim liabilities, expenses, and frictional costs'. Feldblum, Variance 1:2 (CAS), PDF p.2: two layers of tax on investment income from capital, 'policyholders pay the cost of holding capital'. Mildenhall & Major ch.1 (Wiley's free excerpt) p.1: 'Pricing adds the risk margin - to afford capital a reasonable return'; pp.7-8: the risk cost of capital is the weighted average over the capital used, 'Debt and reinsurance have known costs'. Zhang p.9: the insurance liability may be viewed 'as a risky debt'. 'Largest' and 'creditor' as said of policyholders occur in none of Zhang, Feldblum (p.7, 9, 14 'creditors' are bondholders/note-holders), the Mildenhall excerpt or Panning (searched). The Exam 9 Content Outline, Fall 2026, p.5 task C1 names potential financial distress as an insurance market imperfection.
- source_rank: 2
- proposed_action: Restate the bullet to what Zhang, Feldblum and Mildenhall & Major say: double taxation, agency and regulatory costs; too little capital brings distress costs (a market imperfection per the outline); premium covers frictional costs so policyholders pay them; the risk load affords capital a reasonable return; capital structure (equity, debt, reinsurance) sets the cost, and policyholders' claims are risky debt. Drop 'largest creditors'.
- applied: true
- fingerprint: 7161d2803a99

## [F-005] Forms bullet: 'mutual (owned by its policyholders)' not in any source read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:34Z/66d2
- date: 2026-10-18
- severity: minor
- status: open
- locus: Forms bullet, mutual parenthetical
- claim: A mutual is owned by its policyholders.
- evidence: No source read states ownership. CAS Financial Reporting PDF pp.40-41 and 55 describe mutuals (no common stock; the board may pay policyholder dividends) but never 'owned by'. Florida Statutes s. 628.031: a mutual insurer is 'an incorporated insurer without permanent capital stock'; s. 628.301(1): 'Each policyholder of a domestic mutual insurer ... is a member of the insurer with all rights and obligations of such membership' (s. 628.021 by contrast: a stock insurer is 'owned by its stockholders'). The NAIC glossary returned HTTP 403. The other two terms the C-004 note flagged are sourced as written: Fla. Stat. s. 629.011(5) defines a reciprocal insurer (an unincorporated aggregation of subscribers acting through an attorney in fact) and s. 629.051(1) has its name carry 'reciprocal', 'interinsurer' or 'exchange'; Lloyd's 'Our market' page: business is brought 'to specialist syndicates, who price and underwrite risk', the Lloyd's Corporation 'not itself an insurer'.
- source_rank: 3
- proposed_action: Restate the parenthetical to the statute: 'whose policyholders are its members'. Keep 'reciprocal exchange' and 'Lloyd's syndicate'.
- applied: true
- fingerprint: 247c63f458cb

## [F-004/R] Exam 9 bullet restated from Zhang, Feldblum and Mildenhall & Major
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:34Z/66d2
- date: 2026-10-18
- resolves: F-004
- status: resolved
- note: Bullet now reads: frictional costs of double taxation, agency and regulation; too little capital brings financial-distress costs, one of the insurance market imperfections; premium covers the frictional costs as well as claims and expenses, so policyholders pay the cost of holding capital, and the risk load affords capital a reasonable return (its cost); capital structure (equity, debt, reinsurance) sets what capital costs, which is why it matters to policyholders, whose claims can be viewed as risky debt. 'Largest creditors' removed. Links unchanged.

## [F-005/R] Mutual parenthetical restated from Fla. Stat. 628.301
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:34Z/66d2
- date: 2026-10-18
- resolves: F-005
- status: resolved
- note: 'a mutual (owned by its policyholders)' changed to 'a mutual (whose policyholders are its members)'. Reciprocal exchange and Lloyd's syndicate left as written, now sourced to Fla. Stat. ch. 629 and Lloyd's own page.

## [C-005] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T00:34Z/66d2
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: Closed both C-004 gaps against sources read this run. Exam 9 bullet: every clause traced to Zhang (Variance 2:1) pp.4, 9-11, Feldblum (Variance 1:2) pp.1-2, the Mildenhall & Major ch.1 publisher excerpt pp.1, 7-8 and the Exam 9 Fall 2026 outline task C1 (F-004, restated). Forms: stock (CAS FR pp.40-41; Fla. Stat. 628.021), mutual (Fla. Stat. 628.031, 628.301(1); F-005, restated), reciprocal exchange (Fla. Stat. 629.011(5), 629.051(1)), Lloyd's syndicate (Lloyd's 'Our market'), captive (Friedland p.19; Fla. Stat. 628.011), RRG (CAS FR p.104). Re-read this run: P-21-05 pp.2, 4-6; Grinstead & Snell p.274; Friedland p.19; SOA normal table (2.5758); MCT 2024 preamble and §1.1-1.2 (web page re-hashed: content changed since C-004's copy, statements unchanged); CAS FR pp.10-11, 35, 104, 303-304, 351, 358-359; PACICC pp.1-2; CIA note p.6; NAIC white paper p.44. Examples recomputed before re-reading the answers: 2.576 x 4000 = 10304, /20 = 515.20, /200 = 51.52; 1200 - 700 - 200 = 300, 0.10 x 700 = 70, 230, 300/150 = 200%, 230/150 = 153.3%, 70/300 = 23.3%, 700/300 = 2.33. Wiki-links unchanged.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), §II insurer pays claims for premium PDF p.2; §III CV of the pool tends to zero PDF pp.4-5; §V losses reasonably independent, stores in one area against fire PDF p.6, sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), Ch.6, E((xbar - mu)^2) = sigma^2/n, PDF p.274, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS study note), PDF p.19 (insurance companies vs self-insurers: funded self-insured programs, captive insurers, pooling associations), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; SOA Exam P normal distribution table (rev. 4/29/21), p.2, Pr(Z<z) = 0.995 at z = 2.5758, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf; OSFI, Minimum Capital Test Guideline (2024), Guideline A, preamble (ICA ss. 515(1), 608(1), BAAT); §1.1 (target-level requirements less diversification credit, divided by 1.5; MCT ratio = capital available / minimum capital required); §1.2 (100% minimum; 150% supervisory target, a cushion that facilitates early intervention), web page fetched 2026-10-18, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024; Odomirok et al., Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2020), PDF pp.10-11 (U.S. insurers regulated by the states; NAIC not a regulator; SAP of the domiciliary state), p.26 (Annual Statement on SAP), p.35 (Admitted Assets = Liabilities + Surplus), pp.40-41 (stock and mutual insurers), p.55 (a mutual's dividends to policyholders), p.104 (Schedule T: licensed, RRG, eligible surplus lines), p.109 (Schedule F), pp.303-304 (RBC, IRIS/FAST, SAO), p.351 (tax-basis incurred losses use discounted reserves), pp.358-359 (Canada: federal or provincial registration, OSFI, provincial licensing and market conduct, IFRS), sha256:d35e87ed0e674d7e0d52b225dcc1683f6553073e1c89f106f05f5cb80cea8aa7 — https://www.casact.org/sites/default/files/2021-03/6C_CAS_Financial_Reporting.pdf; PACICC, guide to the compensation plan for property and casualty insurers, PDF pp.1-2 (Plan operates on the insolvency of a P&C insurer; covers most claims under most P&C policies), sha256:5f983f23846df2d2d36fdc6a8b20578b058eed910e3c96d2f9be30162b229441 — https://www.casact.org/sites/default/files/2021-03/6C_PACICC.pdf; CIA, Educational Note: Comparison of IFRS 17 to current CIA standards, PDF p.6, Introduction (IFRS 17 effective in Canada January 1, 2023), sha256:dad0c798ecf3320c7887ed8bdb2820811617951a5c94c1ede6b05da9706560db — https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educatitional_Note_Comparision_of_IFRS_17_to_CurrentCIA.pdf; NAIC White Paper, The U.S. National State-Based System of Insurance Financial Regulation and the Solvency Modernization Initiative (2013), PDF p.4 n.3 (receivership in the domiciliary state), pp.17-18 (domiciliary state leads review), p.44 (surplus lines = unlicensed companies), sha256:77020d3a75a8043a1c773a26bb3b750c65274d68e764757c018e9e0099621e77 — https://casact.org/sites/default/files/2021-03/6U_NAIC_Solvency_Regulatory_Framework.pdf; Zhang, Economic Impact of Capital Level in an Insurance Company, Variance vol. 2 no. 1 (CAS, 2008), PDF p.4 §2.2 (premium covers claim liabilities, expenses and frictional costs: income taxes, agency costs, costs of financial distress), p.9 (insurance liability viewed as a risky debt), p.10 §4.1 (frictional costs of capital: investment income of capital taxed twice, agency costs, insurance regulations limiting investment opportunity; distinct from the cost of capital, the return shareholders require), p.11 §§4.2-4.3 (less capital raises the costs of financial distress; frictional costs borne by policyholders if covered by premium), sha256:ab67afadc8dde746430e46b625ba2209e253058c0c4cbac686d49ca7261354ec — https://www.casact.org/sites/default/files/2021-07/Economic-Impact-Zhang.pdf; Feldblum, Capital Structure, Solvency Regulation, and Federal Income Taxes for Property-Casualty Insurance Companies, Variance vol. 1 no. 2 (CAS, 2007), PDF p.1 abstract (capital-structure regulation and the premiums policyholders pay), p.2 (two layers of tax on investment income from capital; policyholders pay the cost of holding capital), sha256:83c98b38db76e786898e9dc527220eb182d24428a9e435e67628821554f6d73c — https://www.casact.org/sites/default/files/2021-07/Capital-Structure-Feldblum.pdf; Mildenhall & Major, Pricing Insurance Risk: Theory and Practice (Wiley, 2022), publisher's free excerpt, Chapter 1 excerpt, PDF p.1 §1.1 (pricing adds the risk margin to afford capital a reasonable return), pp.7-8 §1.4 (risk cost of capital the weighted average over the capital used: debt and reinsurance have known costs, cost of equity from a peer study; frictional costs of capital), sha256:af37057d34a0c9b927fa8d0246eaf121a500e385c6902a8f8db8b08e6a55fe2c — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-5.pdf; CAS Exam 9 Content Outline, Fall 2026, PDF p.5, Domain C task 1 (capital structure of insurers, cost of insurance capital, insurance market imperfections e.g. potential financial distress), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; Florida Statutes, Chapter 628 (domestic stock and mutual insurers), Online Sunshine, ss. 628.021 (stock insurer owned by its stockholders), 628.031 (mutual insurer: no permanent capital stock), 628.301(1) (each policyholder of a domestic mutual insurer is a member of the insurer), sha256:d99341a87d12eec6152eb1baec92e024ab3c084e9d4cec6afe9858bf84368b61 — https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0600-0699/0628/0628.html; Florida Statutes, Chapter 629 (Reciprocal Insurers), Online Sunshine, ss. 629.011(4)-(5) (reciprocal insurance; reciprocal insurer an unincorporated aggregation of subscribers acting through an attorney in fact), 629.051(1) (name to include 'reciprocal', 'interinsurer', 'exchange' or similar), sha256:da3cfa7a56a2530c983ba60431281bd2224f7f89a2500d3329491892de3c497f — https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0600-0699/0629/0629.html; Lloyd's, About Lloyd's: Our market, page text (business brought to specialist syndicates, who price and underwrite risk; Lloyd's underwriters join together as syndicates; the Lloyd's Corporation is not itself an insurer), sha256:2c964a3abd2b19e5f6733d1b84c8f825ee0e0e50f1af9b35a7e097c5b2a6a94e — https://www.lloyds.com/about-lloyds/our-market
- note: Verified, medium: the Exam 9 statements rest on CAS-published Variance papers and the free publisher excerpt of Mildenhall & Major, not on Cummins (2000) itself, which remains paywalled; the statutes cited for insurer forms are Florida's, standing for U.S. usage; the OSFI and Lloyd's pages are web pages hash-bound to this fetch.
