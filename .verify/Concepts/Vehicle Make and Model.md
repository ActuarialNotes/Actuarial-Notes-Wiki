---
target: Concepts/Vehicle Make and Model.md
created: 2026-10-17
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- status_set: verified
- confidence: medium
- checks_run: definition, formulas and every bullet checked against the routed reading pages; every worked example recomputed before comparison; [[links]] and $$ balance checked
- sources_checked: Chalk et al., From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges, CAS Monograph 16, 1st ed., §6.4.3-6.5, §6.7.3, PDF pp.93-96, 104, sha256:0b293634c3d6320eac9aca5d2f8ba4ca7954f20db8a462b24771c60b5e046d74 — https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §10.1, PDF pp.103-106, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Insurance Bureau of Canada, CLEAR (Canadian Loss Experience Automobile Rating) web page, read 2026-10-17, The CLEAR methodology, steps 1-5, sha256:a3c67c8df97fafea3a2a0ae1190285f102e46902fae350ef58ecf4cf01f4ca33 — https://www.ibc.ca/pe/auto/buying-auto-insurance/how-auto-insurance-premiums/clear
- note: Core model checked: GLMM with fixed effects on characteristics and a random effect per make/model shrunk toward zero (Chalk §6.5 PDF pp.95-96; Goldburd §10.1); characteristics extend to new and thin levels (Chalk §6.4.4, §6.7.3); make/model hierarchy caution (Chalk §6.4.3 motorcycle example). The Canadian CLEAR bullet matches IBC's CLEAR methodology page in every particular (make, model, model year; data normalized to remove territory, driving record and use; supplementary credibility for newer vehicles; year-to-year changes capped; rate groups built separately for Collision, DCPD, Comprehensive and Accident Benefits). Examples recomputed: Z 0.25 -> 1.100, Z 0.625 -> 1.025; 1.60/1.25 = 1.28 and 1.60/1.28 - 1 = 25%. The ISO-symbol bullet could not be read from Verisk (JS-only pages) and is a finding.

## [F-001] ISO symbol methodology not confirmed against a source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- severity: minor
- status: open
- locus: Industry systems, U.S. bullet
- claim: In the U.S., Verisk's ISO symbols start physical damage symbols from the vehicle's price new (MSRP); liability and PIP/medical payments symbols combine the series' own loss experience with a prediction from characteristics such as curb weight and chassis type.
- evidence: No Exam 8 reading describes ISO symbols (searched Chalk, Goldburd, Fisher, Bahnemann). Verisk's FAQ and product pages (verisk.com/resources/faqs/iso-symbols-for-individual-makes-and-models-of-cars/, verisk.com/products/iso-symbols/) were fetched but render their text by script, so the claim could not be read from the publisher this run. Unconfirmed rather than shown wrong.
- source_rank: 3
- proposed_action: Confirm against a readable Verisk/ISO document and cite it, or remove the bullet.
- applied: false
- fingerprint: 021677d635d6

## [F-002] The A8 reading's target encoding and leakage are not covered
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- severity: minor
- status: open
- locus: whole page
- claim: The page models make and model only as a GLMM random effect with characteristics; target encoding and its leakage are not mentioned.
- evidence: Chalk et al. Ch.6 §6.2-6.3 (PDF pp.86-91), the A7-A8 reading, treat make and model (aircraft make, over 40,000 levels) with credibility-shrunk target encoding (Eq.6.1) and out-of-fold encoding against leakage; vault questions cas8-an-005/006 test it on vehicle make and model.
- source_rank: 2
- proposed_action: Add the target-encoding approach with out-of-fold encoding, citing Chalk et al. Ch.6 (new prose: for an author).
- applied: false
- fingerprint: 146922c723d3
