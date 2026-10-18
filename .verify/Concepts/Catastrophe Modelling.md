---
target: Concepts/Catastrophe Modelling.md
created: 2026-10-18
---

## [F-001] The page's only cited source is a dead link
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:12Z/770a
- date: 2026-10-18
- severity: minor
- status: open
- locus: ## Sources, item 1
- claim: Sources cites 'A Guide to Catastrophe Modelling' at https://forms2.rms.com/rs/729-DJX-565/images/rms_guide_catastrophe_modeling_2008.pdf.
- evidence: Fetched this run (urllib and curl): HTTP 404 Not Found from forms2.rms.com. The claims the page draws from it (the framework table's descriptions, the data list) could not be checked.
- source_rank: 3
- proposed_action: Find a live official copy of the RMS guide or replace the citation with the Exam 9 reading (Grossi & Kunreuther, Ch.2-6) and the CAS errata.
- applied: false
- fingerprint: 0083082509e6

## [F-002] Definition and reinsurer claims not found in any source read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:12Z/770a
- date: 2026-10-18
- severity: minor
- status: open
- locus: second quote (definition of catastrophe modelling); table rows 'Data for Catastrophe Modelling'; 'Catastrophe Modelling for Reinsurers'
- claim: Catastrophe modelling is 'a systematic approach to quantify the risks of extreme events and design strategies for financial protection'; models use temperature, terrain, architecture, building codes, contents, rebuild costs; for reinsurers cat risk assessment is crucial for pricing, reserve setting and capital allocation.
- evidence: None of these sentences appears in the sources read this run. The Springer description and Knowledge at Wharton say the book 'systematically analyzes how catastrophe models can be used for assessing and managing the risks of extreme events' (not the page's wording); Exam 8 F2016 Q18 report pp.72-73 and F2018 Q17 report pp.88-90 describe the hazard, inventory, vulnerability and loss modules and their data (building codes, values, policy terms) but not 'temperature' or 'reserve setting'. The page's own source is a dead link (see the other finding). The SOA glossary quote is correct (p.12).
- source_rank: 1
- proposed_action: Restate the definition and the data and reinsurer lines to what Grossi & Kunreuther Ch.2-3 (or the exam reports) say, or delete them.
- applied: false
- fingerprint: 65e9997c235a

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:12Z/770a
- date: 2026-10-18
- status_set: in_review
- checks_run: SOA glossary quote checked verbatim against the glossary p.12 (matches; the source misspells 'damange'). Links resolve. Definition, data list and reinsurer sentence searched for in the outline, errata, exam reports, Springer description and Wharton review — not found.
- note: Left in_review: the page rests on the Exam 9 reading for tasks A4-A5 and its own cited guide, and neither could be read. Grossi & Kunreuther Chapters 2-6 are commercial (Springer); no legitimate free copy found (Springer Link serves no open chapter and blocks scripted access; the CAS abstract record links no text). Its cited RMS guide returns 404. The page also covers almost none of what the outline assigns under A4-A5 (EP curves and the OEP/AEP distinction the errata adds, the four modules, uncertainty, ratemaking with cat models) — those are on Catastrophe Risk and the framework page; a writer should decide what this page owns. Sources read: SOA Actuarial Glossary, p.12 'Catastrophe', sha256:9e6976838bc6d827be402fba326a3f977bc566bc5700470e9208ec59a93bf953 — https://www.soa.org/4a537f/globalassets/assets/files/edu/actuarial-glossary.pdf; CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), pp.3,5,7: tasks A4-A5 and C7, readings table (Grossi & Kunreuther Ch.2-6 incl. Section 2.4 errata, Book; Cummins CAT Bond, RMIR 11(1) pp.23-47, SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; CAS Syllabus Committee, Clarification and Errata to Catastrophe Modeling (Grossi & Kunreuther), March 29 2021, pp.1-3: OEP/AEP/CEP definitions, corrected OEP formula, Table 2.1 with AAL = sum p_i L_i, sha256:8677464a4952483b031c9559d96f083629d4e22a14281c604368665f4d9c63a6 — https://www.casact.org/sites/default/files/2021-05/8_Grossi_Kunreuther_Errata_2021.pdf; CAS Exam 8 Fall 2016 — sample answers and examiner's report, Q18 (the four modules: event/hazard, inventory/exposure, vulnerability/damage, loss; epistemic = lack of knowledge, reducible; aleatory = inherent randomness, not reducible), pp.72-73, sha256:ad67f56b0e090f8c283c58e728d656f4685a6e2b3ff8219144ecb46facbeac2e — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_16-8.pdf; CAS Exam 8 Fall 2018 — exam and examiner's report, Q16-Q17 (OEP-based PML; inventory and vulnerability modules; epistemic uncertainty; logic trees and simulation), report pp.85-90, sha256:7993ff15f4c6aae538bde337a57fbbf775aab27f3a232b8a828458ac52a330c4 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_18-8.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/4d03
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: The dead RMS guide (404 at forms2.rms.com; the Wayback copy could not be reached from this session) was replaced in ## Sources by Humphreys, 'Exceedance Probability in Catastrophe Modeling', CAS E-Forum Winter 2021 (https://www.casact.org/sites/default/files/2021-03/02_humphreys.pdf, sha256:c161864d85d35169b8e1f92af664542f05f005772e4cc6607ead0d68f08fdf89), which states the page's definition and uses (p.1). The framework row is held to the CAS Exam 8 F2016 Q18 and F2018 Q17 reports (four modules).

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/4d03
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Restated to what the sources say. Definition: now Humphreys p.1 ('a type of estimation technique used in the P&C industry to predict and evaluate damage caused by natural catastrophes such as hurricanes, earthquakes, tornados, hail, winter storms, floods and wild fires, as well as man-made catastrophes such as terrorism'). Data row: 'temperature', 'terrain', 'architecture' and 'rebuild costs' cut; it now lists hazard parameters (magnitude, location, wind speed, soil type — Exam 8 F2018 Q17 sample 3), property data (construction type, building codes, built value, contents — F2016 Q18 sample answers) and policy terms (limits, deductibles — F2016 Q18; Braun & Kousky p.3 'data on insured properties and policy conditions'). Reinsurer line: 'reserve setting' is in no source and was cut; the section (renamed 'Uses of Catastrophe Models') now gives Humphreys p.1's list — ratemaking, underwriting and portfolio management, cost of reinsurance and risk transfer, allocation of the cost of capital, capital-adequacy analysis by rating agencies — consistent with IIASA RR-00-20 p.4 (coverage, premiums, reinsurance).

## [F-003] Page covers little of tasks A4-A5
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/4d03
- date: 2026-10-18
- severity: minor
- status: open
- locus: whole page
- claim: The page is a definition, a three-row table and one paragraph of uses; it does not cover what Exam 9 tasks A4-A5 assign it under Grossi & Kunreuther Ch.2-6.
- evidence: CAS Exam 9 Content Outline Fall 2026 p.3: A4 'Evaluate catastrophe models', A5 'Apply catastrophe models to ratemaking', readings Grossi & Kunreuther (Ch.2-6 with the Section 2.4 errata, p.7). The page has no exceedance probability curve, no OEP/AEP distinction (the errata pp.1-3 adds both), no module-by-module description (Exam 8 F2016 Q18, F2018 Q17 test it), no treatment of uncertainty (aleatory/epistemic, logic trees, simulation) and no ratemaking use; parts of this sit on Catastrophe Risk and Catastrophe Modelling Framework instead. Everything the page does say is now sourced (see this run's resolutions).
- source_rank: 1
- proposed_action: A writer decides what this page owns against A4-A5 (or makes it a hub that points to Catastrophe Risk, the framework page and Catastrophe Expected Loss Cost) and writes it from the outline and the CAS E-Forum and exam material; not a verifier's edit.
- applied: false
- fingerprint: e086dc926fbb

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/4d03
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: SOA glossary quote verbatim against p.12; definition against Humphreys p.1; framework row (events, hazard, vulnerability, financial loss) against Exam 8 F2016 Q18 and F2018 Q17 reports; data row against the same and Braun & Kousky p.3; uses against Humphreys p.1 and IIASA p.4; new ## Sources URL fetched and hashed; scope against the Fall 2026 outline (A4-A5, Grossi & Kunreuther Ch.2-6) and the errata. Wiki links resolve.
- sources_checked: Humphreys, Exceedance Probability in Catastrophe Modeling, CAS E-Forum Winter 2021, pp.1-7, 16 (definition and perils incl. terrorism; uses: ratemaking, portfolio management, underwriting, cost of capital, cost of reinsurance and risk transfer, ERM, capital adequacy; EP(x) = P(X > x); AAL = sum p_i X_i; return period = 1/EP; OEP = probability the largest loss in a year exceeds x; AEP the survival function of the annual aggregate S, E[S] = integral of A(x) dx; AEP used for aggregate covers such as stop loss), sha256:c161864d85d35169b8e1f92af664542f05f005772e4cc6607ead0d68f08fdf89 — https://www.casact.org/sites/default/files/2021-03/02_humphreys.pdf; SOA Actuarial Glossary, p.12 'Catastrophe', sha256:9e6976838bc6d827be402fba326a3f977bc566bc5700470e9208ec59a93bf953 — https://www.soa.org/4a537f/globalassets/assets/files/edu/actuarial-glossary.pdf; CAS Exam 8 Fall 2016 — sample answers and examiner's report, Q18, PDF pp.72-73 (the four modules: event/hazard, inventory/exposure, vulnerability/damage, loss; inventory data on building codes, built value, type, contents; policy limits and deductibles; epistemic reducible, aleatory not), sha256:ad67f56b0e090f8c283c58e728d656f4685a6e2b3ff8219144ecb46facbeac2e — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_16-8.pdf; CAS Exam 8 Fall 2018 — exam and examiner's report, Q17, PDF pp.88-89 (inventory and vulnerability modules; parameters such as magnitude, soil type, location, wind speed; epistemic uncertainty; logic trees and simulation), sha256:7993ff15f4c6aae538bde337a57fbbf775aab27f3a232b8a828458ac52a330c4 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_18-8.pdf; Ermoliev, Ermolieva, MacDonald & Norkin, Insurability of Catastrophic Risks: The Stochastic Optimization Model, IIASA Research Report RR-00-20 (reprinted from Optimization 47, 2000, with permission), PDF pp.3-4 (catastrophes produce losses highly correlated in space and time, which break the law of large numbers; insurers can reduce ruin only by deliberately selecting the dependent risks they cover; catastrophe modelling used for coverage, premiums and reinsurance), sha256:451edc97fb5e761c971298be1e43e1f43ad5970a850631a559fa93d7b93cb5d0 — https://pure.iiasa.ac.at/id/eprint/6252/1/RR-00-20.pdf; Braun & Kousky, Catastrophe Bonds, Wharton Risk Center Primer (July 2021), pp.1-6 (sponsor, bankruptcy-remote SPV, Treasury collateral in trust, floating rate plus premium; indemnity, industry-loss, parametric and modelled-loss triggers and Figure 3: parametric most transparent and most basis risk, indemnity the opposite, the other two between; modeller estimates probability of first loss and EL from property and policy data; average maturity three years; proportional payout from attachment to exhaustion; multi-year price stability, full collateral, dollar-for-dollar capital in the top layers; complement and substitute for reinsurance), sha256:38708381788f2732616650c245307b1775384bb347f4d1f7a884d05eb13918e7 — https://esg.wharton.upenn.edu/wp-content/uploads/2023/08/Cat-Bond-Primer-July-2021.pdf; CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18) — scope check, pp.3, 5, 7 (Domain A tasks 4-5 with Grossi & Kunreuther; Domain C task 7 securitization and CAT bonds with Coval, Jurek & Stafford, Cummins CAT Bond, Cummins Capital, Mildenhall & Major, Panning; readings table: Grossi & Kunreuther Ch.2-6 for A4-A5, CJS for C5-C6, Cummins CAT Bond for C7), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; CAS Syllabus Committee, Clarification and Errata to Catastrophe Modeling (Grossi & Kunreuther), March 29 2021, pp.1-3 (OEP, AEP and CEP definitions; AAL = sum p_i L_i in Table 2.1), sha256:8677464a4952483b031c9559d96f083629d4e22a14281c604368665f4d9c63a6 — https://www.casact.org/sites/default/files/2021-05/8_Grossi_Kunreuther_Errata_2021.pdf
- note: Verified at medium on open texts (D22): every sentence now on the page is sourced. Grossi & Kunreuther itself is still unread (sold). The page's thinness against A4-A5 is open as a minor finding for a writer.
