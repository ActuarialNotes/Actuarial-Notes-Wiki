---
target: Concepts/BPP Loss Conditions and Additional Conditions.md
created: 2026-10-10
---

## [F-001] Example (b) leaves the limit unstated
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv10
- date: 2026-10-10
- severity: nit
- status: open
- locus: Example 'Vacancy and a Mortgageholder', part (b)
- claim: Part (b) says the mortgageholder is paid 'within the $257,500 the loss would otherwise have paid' without giving a building limit or coinsurance facts.
- evidence: The $257,500 is 260,000 − 2,500, which equals the amount payable only if the building limit is at least $257,500 and no coinsurance penalty applies (CP 00 10 10 12 §D, §F.1). The stem gives neither, so a reader cannot check the figure from the example alone. The mortgageholder outcome ($150,000, rights transferred under §F.2.e) is right either way.
- source_rank: 5
- proposed_action: Add to the stem that the building limit is adequate and no coinsurance penalty applies (authoring — left for a writer).
- applied: false
- fingerprint: dc3654e4aeef

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv10
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: Abandonment, appraisal, duties (8 items, EUO), loss payment a–h, recovered property, vacancy (tenant test, 31% owner test, construction, 60 days, six perils, 15%), valuation a–e (incl. TIB proportion and renewal option), coinsurance four steps and blanket total, mortgageholders a–g — all against CP 00 10 10 12 §E–F. Examples recomputed: 540,000; 5/6; 100,000; 97,500 (117,500 adequate, 20,000 penalty); TIB 90,000×730/1,825=36,000; vacancy 0.85×199,000=169,150.
- sources_checked: ISO CP 00 10 10 12 Building and Personal Property Coverage Form (specimen), §E.1–E.7, F.1 (Examples 1–3), F.2 pp.10–14, sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf
- note: One nit left open: example (b) does not state the building limit.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv10
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied in this run. Example (b) now states the building is insured for $300,000 with no coinsurance penalty, so 260,000 − 2,500 = 257,500 is within the limit (CP 00 10 10 12 §D, §F.1).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv10
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: Delta re-check of example (b): limit 300,000 ≥ 257,500, no coinsurance penalty, mortgageholder paid 150,000 under §F.2.d–e; rest unchanged since this run's earlier pass.
- sources_checked: ISO CP 00 10 10 12 Building and Personal Property Coverage Form (specimen), §D, F.1, F.2.d–e (delta re-check of example (b)), sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf; ISO CP 00 10 10 12 Building and Personal Property Coverage Form (specimen), §E.1–E.7, F.1 (Examples 1–3), F.2 pp.10–14, sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf
