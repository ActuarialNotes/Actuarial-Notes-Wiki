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
