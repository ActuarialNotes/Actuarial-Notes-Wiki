---
target: Concepts/Causes of Loss.md
created: 2026-10-10
---

## [F-001] Rain/snow interior damage is a limitation, and not unique to the special form
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- severity: nit
- status: open
- locus: bullet 'Special form'
- claim: The special form 'adds exclusions for ... rain or snow entering a building that wasn't damaged first.'
- evidence: CP 10 30 10 12 puts interior rain/snow damage under C. Limitations (C.1.c), not B. Exclusions, and CP 10 10 10 12 already carries the same restriction inside the Windstorm or Hail peril (A.4.c: interior damage by rain, snow, sleet, ice, sand or dust unless the building first sustains wind or hail damage). So it is neither an exclusion nor something the special form adds.
- source_rank: 1
- proposed_action: Delete the rain/snow clause from the special-form sentence (transcription: the remaining items — wear and tear, rust, settling, mechanical breakdown, insects, dishonest acts — are B.2 exclusions).
- applied: true
- fingerprint: a389d0b5a9b6

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied: clause deleted; the sentence now lists only CP 10 30 B.2 exclusions (wear and tear, rust, settling, mechanical breakdown, insects, dishonest acts).

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: covered causes of all three CP forms listed against the forms; eight common exclusions and the concurrent-causation lead-in; ensuing fire exception; special-form exclusions and theft special limits; HO-3 sixteen named perils; burden of proof against two references; both examples recomputed blind (basic 40,000, broad 73,000, special 88,000, flood excluded; 180,000 - 1,000 = 179,000)
- sources_checked: ISO CP 10 10 10 12 Causes of Loss – Basic Form, A.1-11 covered causes; B.1.a-h exclusions with lead-in; B.1.b earth movement fire exception, sha256:14aea49e74f393f8370fa78a89f12e99a9f4927dc704bd386fc7e41a9223f5b4 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=CP+10+10&ed=10-12; ISO CP 10 20 10 12 Causes of Loss – Broad Form, A.12-14; Additional Coverage – Collapse, sha256:fde6a92d0aabc909a84622d0588db0ac570c564ced0c056fa7efbcb454768207 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=CP+10+20&ed=10-12; ISO CP 10 30 10 12 Causes of Loss – Special Form, A; B.2.d, B.2.h; C.1.c; C.3 theft special limits, sha256:119fcd978212db836e1084ca8ca90c0fdacb60d157caf4867bbc7b4e02f498e3 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2018/09/CP.10.30.10.12-1-1.pdf; ISO HO 00 03 05 11 Homeowners 3 – Special Form (Maine BOI copy), Section I Perils Insured Against B.1-16; Exclusion A.2 earth movement fire/explosion/theft exception, sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf; IRMI Glossary, 'open perils', entry, sha256:e3325a9af88920cc1c7453f4e8e9e9a647ed89f923594177217aca2c8c7ea454 — https://www.irmi.com/term/insurance-definitions/open-perils; Property Insurance Coverage Law Blog, 'Who Has the Burden to Prove the Cause of Property Damage?', entry, sha256:6cf6c6de018f1ee9594d8a4b20f5493fe11148d46a9685b29f575ffce964e44f — https://www.propertyinsurancecoveragelaw.com/blog/who-has-the-burden-to-prove-the-cause-of-property-damage-those-burdens-of-proof-can-switch/; HUB International Insurance Glossary, 'All risks insurance' (burden of proof), Burden of Proof, sha256:14c2714c17163b29db7709239c0a40cd0e8342868849b62f2d6fa82e0d4ae3e2 — https://www.hubinternational.com/insurance-glossary/a/all-risks-insurance/
- note: Forms checked line by line (rank 1); burden-of-proof rule rests on two agreeing rank-3 references and the underwriting bullet is general, hence medium. One nit fixed (F-001).
