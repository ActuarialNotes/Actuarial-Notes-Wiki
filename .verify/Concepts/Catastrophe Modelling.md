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
