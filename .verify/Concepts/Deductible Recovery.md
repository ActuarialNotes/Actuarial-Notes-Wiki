---
target: Concepts/Deductible Recovery.md
created: 2026-10-31
---

## [F-001] Universal gross reserving contradicts Friedland
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullets, fourth bullet
- claim: Page says 'The insurer reserves gross and carries the expected recoveries as an offsetting asset, discounted for expected uncollectibility.'
- evidence: Friedland Ch. 3 p.33 (PDF 39): 'Insurers differ in their practices with respect to case outstanding for deductibles. Some insurers establish a case outstanding net of the deductible while other insurers do not consider the deductible in the establishment of the case outstanding. Even within the same insurer, practices may vary between lines of insurance.'
- source_rank: 2
- proposed_action: Replace with Friedland's statement that practice varies.
- applied: true
- fingerprint: e32a8ad87e3e

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Applied in this run: sentence replaced with Friedland's description of differing case-outstanding practice.

## [F-002] Collateralization overstated
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullets, second bullet
- claim: Page says 'Programmes are therefore collateralized — letters of credit, trusts, surety — sized off the actuarial estimate of unpaid recoveries.'
- evidence: Werner & Modlin Ch. 15 p.303 (PDF 315), Large Deductible Policies, Deductible processing: 'In some instances, collateral is received to cover potentially uncollectible deductible amounts; however, it is rare that this credit risk is fully collateralized.' 'Letters of credit' occurs in neither Friedland nor Werner & Modlin.
- source_rank: 2
- proposed_action: Replace with Werner & Modlin's statement.
- applied: true
- fingerprint: 3e8f6803f2e0

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Applied in this run: sentence replaced with Werner & Modlin's wording on partial collateral.

## [F-003] Scope and stated reasons for paying ground-up are unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- severity: minor
- status: open
- locus: lead paragraph
- claim: Page says deductible recovery arises in large-deductible programmes, where the insurer pays claims in full 'for statutory, licensing and claims-control reasons'.
- evidence: Werner & Modlin Ch. 15 p.303 (PDF 315): 'In some large deductible policies the insurer is responsible for paying the entire claim and seeking reimbursement' — no reasons are given. Friedland Ch. 3 p.33 (PDF 39) describes the same pay-then-recover practice for general liability deductibles generally, because the injured party is not the insured — so the concept is not confined to large-deductible programmes. The three reasons appear in neither reading.
- source_rank: 2
- proposed_action: Cite a source for the reasons or drop them, and widen the scope to Friedland's general-liability description.
- applied: false
- fingerprint: f046b2cfb584

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: pay-then-recover mechanics, credit risk and collateral vs W&M Ch. 15 Large Deductible Policies; deductible case-outstanding practice vs Friedland Ch. 3; recoveries as a developed item vs Friedland Ch. 14 p.329; Recovery = min(X,d) and both examples recomputed (150,000; 200,000; 6,480,000)
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 3 p.33 (PDF p.39); Ch. 14 p.329 (PDF p.335), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 15 p.303 (PDF p.315), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Two overstatements corrected to the readings' wording; one minor finding on the lead's scope and unsourced reasons left open (needs authoring).
