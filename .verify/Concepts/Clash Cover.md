---
target: Concepts/Clash Cover.md
created: 2026-10-18
---

## [F-001] Unsourced description of how clash layers are priced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'How it is priced' (after its first sentence) and 'Contract wording drives exposure' (occurrence definition)
- claim: Otherwise the price is a judgment about how often one occurrence involves several of the cedant's insureds ... Loss frequency is low, severity is high and the rate on line is modest ... how an 'occurrence' is defined.
- evidence: Clark pp.22-23 (sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63) defines clash covers (multiple policies in one occurrence, ECO, XPL, ALAE treatment) and says that for large ceding carriers clash losses may be common enough for experience rating to guide the price. It does not describe judgmental pricing, the low-frequency/modest-ROL profile, bad-faith claims or the occurrence definition. The exposure-factor-vanishes point follows from Clark's p.29 formula with AP >= PL.
- source_rank: 2
- proposed_action: Cut the judgmental-pricing description back to Clark or cite a source for it.
- applied: false
- fingerprint: 2f781330132e

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: definition and three casualty layer categories against pp.22-23; exposure factor formula against p.29; ALAE treatments against p.24; both examples recomputed ($0.3M, $1.25M, $0; $150,000 loss cost, $300,000 premium, 10% ROL, 10-year payback)
- sources_checked: Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), pp.22-23 (working layer, exposed excess, clash covers), p.29 (casualty exposure factor), pp.24-25 (ALAE pro rata vs part of loss), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf; CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (task A1-A3, readings Clark and Bernegger), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Definition, formula and Clark attributions match; examples resolve. Unsourced pricing description left open (F-001). Exam 9 only.
