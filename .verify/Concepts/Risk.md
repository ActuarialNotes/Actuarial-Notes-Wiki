---
target: Concepts/Risk.md
created: 2026-10-17
---

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- status_set: in_review
- checks_run: SOA and SRA glossary definitions checked against the publishers' PDFs; Exam 8 usage checked against ASOP 12 and Fisher
- sources_checked: SOA Actuarial Glossary (2022), entry "Risk", PDF p.60, sha256:9e6976838bc6d827be402fba326a3f977bc566bc5700470e9208ec59a93bf953 — https://www.soa.org/4a537f/globalassets/assets/files/edu/actuarial-glossary.pdf; Society for Risk Analysis Glossary (2018), §1.1 Risk, PDF p.4, sha256:0701d3716beb7ef322991178d1c2a2c220933f2fcdb204335af3c975254b18cc — https://www.sra.org/wp-content/uploads/2020/04/SRA-Glossary-FINAL.pdf; ASOP No. 12, Risk Classification (Actuarial Standards Board, Dec 2005, doc. 132), §2.7, PDF p.8, sha256:7d4f2631a589bac24cf34b1f622e95aa7bfa979aaca96de27c651099c0b12dc7 — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop012_132.pdf; Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.1 §1, §3, PDF p.8, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf
- note: Left in_review. The SOA Actuarial Glossary (2022, PDF p.60) defines Risk as "(1) Possibility of failing to meet objectives. (2) Can only be defined in context."; the page quotes the second sentence as "Risk is only able to be defined in context" inside a quotation (a paraphrase, not verbatim). The SRA Glossary §1.1 (PDF p.4) lists the alternative definitions the page gives (exposure to an uncertain proposition, uncertainty and severity of consequences, deviation from a reference value, probability-severity metrics, the scenario-probability-consequence triplet) and attributes "the effect of uncertainty on objectives" to ISO. The category table and the resilience section are unsourced. The page is linked from Exam 8, 5 and 9, where "risk" means an insured entity; see F-001.

## [F-001] CAS ratemaking sense of "risk" (an insured) is missing
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- severity: major
- status: open
- locus: definition (opening quote)
- claim: Risk is the possibility of failing to meet objectives, only able to be defined in context.
- evidence: Exam 8 links this page from objective B ("other risks in the same class", "the cost of the layer of risk"), where a risk is an insured exposure unit. ASOP 12 §2.7 (PDF p.8) defines "Risk(s) - Individuals or entities covered by financial or personal security systems", and Fisher Ch.1 §1, §3 (PDF p.8) uses "risk" for an insured ("a risk with a debit mod", "the risk's expected loss relative to other risks in its class"). The page gives only the SOA/ERM sense, so an Exam 8 (or Exam 5) reader following the link gets the wrong meaning. The two senses legitimately differ between CAS ratemaking and SOA ERM; not reconciled here.
- source_rank: 2
- proposed_action: Add the insured-entity sense with ASOP 12 §2.7, or point the CAS ratemaking links at a separate page (maintainer/author decision).
- applied: false
- fingerprint: 0eeba8ccc727

## [F-002] SOA glossary quote is paraphrased inside quotation marks
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- severity: nit
- status: open
- locus: opening quote, second sentence
- claim: Risk is only able to be defined in context.
- evidence: SOA Actuarial Glossary (2022) PDF p.60, entry "Risk": "(2) Can only be defined in context."
- source_rank: 3
- proposed_action: Quote the glossary verbatim.
- applied: false
- fingerprint: a542e3272dbf

## [F-001/R] CAS ratemaking sense added
- entry_type: resolution
- author: agent:claude-code
- run_id: 2026-10-17T23:41Z/5923
- date: 2026-10-17
- resolves: F-001
- status: resolved
- note: Page now opens with both senses. New section 'Risk as the Insured (Ratemaking)' quotes ASOP No. 12 §2.7 verbatim (PDF p.8, sha256:7d4f2631a589bac24cf34b1f622e95aa7bfa979aaca96de27c651099c0b12dc7), with §2.4 and §2.9 (PDF p.8); Fisher et al., Individual Risk Rating Ch.1 §1 (PDF p.8, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81) 'The mod merely indicates the risk's expected loss relative to other risks in its class'; and the CAS Statement of Principles Regarding P&C Insurance Ratemaking (Exam 5 reading; https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140), PDF p.2 'When the experience of an individual risk does not provide a credible basis...' and PDF p.4 'Risk—The rate should include a charge for the risk of random variation from the expected costs.' The SOA/ERM sense is kept under 'Risk as Uncertainty (Risk Management)'; an Exam traps callout distinguishes the two. Needs re-verification.

## [F-002/R] Glossary quoted verbatim
- entry_type: resolution
- author: agent:claude-code
- run_id: 2026-10-17T23:41Z/5923
- date: 2026-10-17
- resolves: F-002
- status: resolved
- note: The SOA Actuarial Glossary (2022) entry is now quoted verbatim: '(1) Possibility of failing to meet objectives. (2) Can only be defined in context.' (PDF p.60, sha256:9e6976838bc6d827be402fba326a3f977bc566bc5700470e9208ec59a93bf953).

## [F-003] Risk-category table rests on no cited source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:49Z/b2b8
- date: 2026-10-17
- severity: minor
- status: open
- locus: Risk as Uncertainty, 'Categories of Risk' table and lead sentence
- claim: Risk can be categorized based on the type of objective at risk: Financial Risk is risk about the value of assets and investments; Operational Risk is risk about internal processes, people, systems, or external events; Strategic Risk or Business Risk is risk about decisions and how they're made.
- evidence: No source cited on the page or in the log supports the table or its organising sentence. The SOA Actuarial Glossary (2022), the source the page cites for this section, defines Financial Risk as 'Financial impact from financial transactions.' (PDF p.32) and Operational Risk as risk 'remaining after determining financing and systematic risk', including 'risks resulting from breakdowns in internal procedures, people and systems' (PDF p.48), with no 'external events'; it has no Strategic Risk or Business Risk entry (full-text search: zero hits). The SRA Glossary (2018) has no risk categories. The Exam 9 reading that teaches operational and strategic risk (Brehm et al., Enterprise Risk Analysis, Domain D) has no free copy and was not read. Pre-existing content, noted as unsourced in C-001 (run 2026-10-17T23:22Z/5d3a) but not filed then.
- source_rank: 3
- proposed_action: Source the table to the Exam 9 reading (Brehm et al.) or quote the SOA glossary's entries; otherwise remove it (author's call: rewriting the rows is new prose).
- applied: false
- fingerprint: 4a81dcd2a7d0

## [F-004] SRA risk metrics presented as definitions
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:49Z/b2b8
- date: 2026-10-17
- severity: minor
- status: open
- locus: Alternative Definitions of Risk, SRA list, 4th and 6th bullets
- claim: Risk can be defined as a probability of an event times the expected severity of its consequences, or a triple of scenario, probability, and consequence.
- evidence: SRA Glossary §1.1 (PDF p.4) separates 'Overall qualitative definitions' (1-7, e.g. 'Risk is exposure to a proposition... of which one is uncertain', 'Risk is the deviation from a reference value and associated uncertainties') from 'Risk metrics/descriptions (examples)', where 'The combination of probability and magnitude/severity of consequences' and 'The triplet (si,pi,ci)' appear, and then says: 'None of these examples can be viewed as risk itself.' The page lists the two metrics as definitions. SRA's metric 1 is a 'combination', not a product; a product appears only under expected consequences (5b). The other four bullets match SRA definitions 3, 5, 7 and SRA's account of ISO.
- source_rank: 3
- proposed_action: Label the last two items as SRA's risk metrics/descriptions rather than definitions, or drop them.
- applied: false
- fingerprint: d51f87b35903

## [F-005] Impact-of-definition and resilience paragraphs are unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:49Z/b2b8
- date: 2026-10-17
- severity: minor
- status: open
- locus: 'The Impact of a Risk Definition' and 'Risk and Resilience' sections
- claim: If risk is viewed as exposure to a negative outcome the objective is to avoid it (appropriate for health and safety); as a deviation from a reference value it can be priced as a commodity (finance, Modern Portfolio Theory). Resilience 'is defined as the ability to recover quickly or "bounce back"', and organizations with more resilience can afford to make riskier decisions.
- evidence: No source is cited for either section and none checked supports them. SRA Glossary §1.13 (PDF pp.6-7) defines resilience as 'the ability of the system to sustain or restore its basic functionality following a risk source or an event (even unknown)', among others; 'bounce back', given on the page in quotation marks, occurs in neither the SRA nor the SOA glossary (full-text search: zero hits), and neither says resilient organizations can take more risk. 'health and safety' and Modern Portfolio Theory occur in neither glossary.
- source_rank: 3
- proposed_action: Cite a reading for each claim or remove the sections; if kept, quote SRA §1.13's definition of resilience verbatim.
- applied: false
- fingerprint: 81cc77acd15f

## [C-002] Re-verification after F-001/F-002 fixes
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:49Z/b2b8
- date: 2026-10-17
- status_set: in_review
- checks_run: all cached sources re-hashed against their sha256; every quote diffed against its source; Exam 8 objective wording against the Fall 2026 content outline; full-text search of both glossaries for every term in the risk-management section
- sources_checked: SOA Actuarial Glossary (2022), entries "Risk" (PDF p.60), "Financial Risk" (p.32), "Operational Risk" (p.48), sha256:9e6976838bc6d827be402fba326a3f977bc566bc5700470e9208ec59a93bf953 — https://www.soa.org/4a537f/globalassets/assets/files/edu/actuarial-glossary.pdf; Society for Risk Analysis Glossary (2018), §1.1 Risk (PDF p.4), §1.13 Resilience (PDF pp.6-7), sha256:0701d3716beb7ef322991178d1c2a2c220933f2fcdb204335af3c975254b18cc — https://www.sra.org/wp-content/uploads/2020/04/SRA-Glossary-FINAL.pdf; ASOP No. 12, Risk Classification (Actuarial Standards Board, Dec 2005, doc. 132), §2.4, §2.7, §2.9, PDF p.8, sha256:7d4f2631a589bac24cf34b1f622e95aa7bfa979aaca96de27c651099c0b12dc7 — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop012_132.pdf; Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.1 §1, PDF p.8, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf; CAS, Statement of Principles Regarding Property and Casualty Insurance Ratemaking (May 1988; reinstated May 2021), Principle 2 PDF p.2, Considerations 'Individual Risk Rating' and 'Risk' PDF p.4, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf; CAS Exam 8 Content Outline, Fall 2026 (October 2026 administration), Domain A task 7 (PDF p.3), Experience Rating and Retrospective and Loss Sensitive Rating statements (PDF p.4), sha256:306e7a7b6351597e46fd82fd74c294fce3afc8b1f9227ea8c001f3b081964521 — https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf
- note: F-001 and F-002 fixes confirmed. ASOP 12 §2.7 quote verbatim, §2.4 examples and §2.9 'a set of risks grouped together under a risk classification system' verbatim (PDF p.8); Fisher Ch.1 §1 'merely indicates the risk's expected loss relative to other risks in its class' verbatim and debit-mod usage (PDF p.8); Exam 8 outline 'other risks in the same class' verbatim (PDF p.4); Statement of Principles quotes verbatim (Principle 2 PDF p.2; 'individual risk's experience' and the Risk consideration PDF p.4); SOA glossary quote now verbatim (PDF p.60). Left in_review because the risk-management section carries content no source supports (F-003, F-004, F-005), none of it touched by the revision. No content edits.

## [F-006] Closing sentence on contexts using different definitions is unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T13:46Z/rsk1
- date: 2026-10-18
- severity: minor
- status: open
- locus: Alternative Definitions of Risk, closing paragraph
- claim: These definitions are applied in different contexts within risk management. Fields such as finance, audit, or emergency response each adopt different definitions of risk to fit their use cases.
- evidence: SRA Glossary (2018) §1.1 (PDF p.4) lists the definitions but assigns none of them to a field; the only context remark is 'The suitability of these metrics/descriptions depends on the situation.' Full-text search of the SRA and SOA glossaries for 'audit' and 'emergency response' finds no such attribution. No other source on the page or log supports it.
- source_rank: 3
- proposed_action: Delete the paragraph.
- applied: true
- fingerprint: 198841c3a774

## [F-007] ISO 31000 cited directly but not read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T13:46Z/rsk1
- date: 2026-10-18
- severity: nit
- status: open
- locus: Alternative Definitions of Risk, ISO quote and its citation
- claim: Risk is the effect of uncertainty on objectives. — ISO 31000 - Risk Management - Guidelines, ISO - 2018
- evidence: ISO 31000:2018 is a paid standard and was not read in any pass (C-001, C-002). The SRA Glossary §1.1 (PDF p.4) states verbatim 'ISO defines risk as the effect of uncertainty on objectives.', so the claim is supported, but only at second hand through the SRA.
- source_rank: 3
- proposed_action: Quote the SRA sentence and cite the SRA Glossary instead of ISO 31000.
- applied: true
- fingerprint: 5e8695042f16

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T13:46Z/rsk1
- date: 2026-10-18
- resolves: F-003
- status: resolved
- note: Lead sentence ('categorized based on the type of objective') and the Strategic/Business Risk row deleted (no source; SOA Actuarial Glossary has no Strategic or Business Risk entry). Remaining rows restated as verbatim SOA Actuarial Glossary (2022) entries: Financial Risk 'Financial impact from financial transactions.' (PDF p.32) and Operational Risk 'Operational risk summarizes the risks a company undertakes when it attempts to operate within a given field or industry. It is the risk remaining after determining financing and systematic risk, and includes risks resulting from breakdowns in internal procedures, people and systems.' (PDF p.48), sha256:9e6976838bc6d827be402fba326a3f977bc566bc5700470e9208ec59a93bf953. Heading relabelled 'Financial and Operational Risk'; [[Business Risk]] link dropped.

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T13:46Z/rsk1
- date: 2026-10-18
- resolves: F-004
- status: resolved
- note: SRA list restated verbatim from SRA Glossary §1.1 (PDF p.4, sha256:0701d3716beb7ef322991178d1c2a2c220933f2fcdb204335af3c975254b18cc): overall qualitative definitions 3, 5 and 7 quoted; the 'probability times severity' and 'triple' items moved under 'risk metrics/descriptions (examples)' as metrics 1 ('The combination of probability and magnitude/severity of consequences') and 3 (the triplet (si,pi,ci)), followed by SRA's own caveat 'None of these examples can be viewed as risk itself, and the appropriateness of the metric/description can always be questioned.' The 'effect of uncertainty' bullet removed from the SRA list; it is ISO's (see F-007).

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T13:46Z/rsk1
- date: 2026-10-18
- resolves: F-005
- status: resolved
- note: 'The Impact of a Risk Definition' section deleted (no source; links to Risk Taxonomies, Decision-Making and Risk as a Commodity dropped with it). Resilience section restated to SRA Glossary §1.13's first overall qualitative definition, verbatim: 'Resilience is the ability of the system to sustain or restore its basic functionality following a risk source or an event (even unknown).' (PDF p.6, sha256:0701d3716beb7ef322991178d1c2a2c220933f2fcdb204335af3c975254b18cc); 'bounce back' and the claim that resilient organizations can take more risk deleted.

## [F-006/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T13:46Z/rsk1
- date: 2026-10-18
- resolves: F-006
- status: resolved
- note: Paragraph deleted in this run.

## [F-007/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T13:46Z/rsk1
- date: 2026-10-18
- resolves: F-007
- status: resolved
- note: Quote now reads 'ISO defines risk as the effect of uncertainty on objectives.' cited to SRA Glossary §1.1 (PDF p.4); ISO 31000 citation removed.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T13:46Z/rsk1
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: every quote on the page diffed against the cached source text (sha256 re-read from cache meta); full-text search of both glossaries for each term in the risk-management section; Exam 8 sense re-checked against ASOP 12, Fisher, the Statement of Principles and the Fall 2026 outline
- sources_checked: SOA Actuarial Glossary (2022), entries "Risk" (PDF p.60), "Financial Risk" (p.32), "Operational Risk" (p.48), sha256:9e6976838bc6d827be402fba326a3f977bc566bc5700470e9208ec59a93bf953 — https://www.soa.org/4a537f/globalassets/assets/files/edu/actuarial-glossary.pdf; Society for Risk Analysis Glossary (2018), §1.1 Risk (PDF p.4), §1.13 Resilience (PDF p.6), sha256:0701d3716beb7ef322991178d1c2a2c220933f2fcdb204335af3c975254b18cc — https://www.sra.org/wp-content/uploads/2020/04/SRA-Glossary-FINAL.pdf; ASOP No. 12, Risk Classification (Actuarial Standards Board, Dec 2005, doc. 132), §2.4, §2.7, §2.9, PDF p.8, sha256:7d4f2631a589bac24cf34b1f622e95aa7bfa979aaca96de27c651099c0b12dc7 — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop012_132.pdf; Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.1 §1, PDF p.8, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf; CAS, Statement of Principles Regarding Property and Casualty Insurance Ratemaking (May 1988; reinstated May 2021), Principle 2 PDF p.2, Considerations 'Individual Risk Rating' and 'Risk' PDF p.4, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf; CAS Exam 8 Content Outline, Fall 2026 (October 2026 administration), Experience Rating statement (PDF p.4), sha256:306e7a7b6351597e46fd82fd74c294fce3afc8b1f9227ea8c001f3b081964521 — https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf
- note: F-003..F-007 resolved by deletion or verbatim restatement (content-plan §1.2 rule 2); no new prose. Every remaining claim is a verbatim quote or a direct restatement of a cited source: ASOP 12 §2.4/§2.7/§2.9, Fisher Ch.1 §1, Statement of Principles PDF pp.2,4, Exam 8 outline PDF p.4 (insured sense, unchanged since C-002); SOA glossary pp.32/48/60, SRA §1.1 and §1.13 (uncertainty sense). Brehm et al. not cited.
