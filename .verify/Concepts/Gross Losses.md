---
target: Concepts/Gross Losses.md
created: 2026-10-31
---

## [F-001] Gross-first presented as the norm
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullets, 'Reserve analysis is normally run on gross data first'
- claim: Page says reserve analysis is normally run on gross data first.
- evidence: Friedland Ch. 14 pp.331-332 (PDF 337-338): 'Actuaries differ in their practice with respect to the order in which they choose gross or net claim development factors. Some actuaries first select gross claim development factors since these triangles contain a greater volume of claims experience... On the other hand, it may be that gross claims are subject to more random variation due to large claims, and thus the actuary first selects claim development factors for the net claims.' Gross-first is one practice, not the norm.
- source_rank: 2
- proposed_action: Change 'normally' to 'often'.
- applied: true
- fingerprint: 69d8b4c7f0c3

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Applied in this run: 'normally' changed to 'often', matching Friedland's 'some actuaries first select gross'.

## [F-002] Net-by-derivation stated as the rule
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullets, ceded-pattern bullet, last sentence
- claim: Page says 'This is why net is derived as gross minus ceded rather than developed directly.'
- evidence: Friedland Ch. 3 p.34 (PDF 40) and Ch. 14 p.330 (PDF 336): 'Some actuaries analyze gross (i.e., direct and assumed) and ceded experience separately; others analyze gross and net experience separately', the choice depending on data availability, the programme's characteristics and the actuary's preference. Developing net directly and deriving ceded is a recognised approach.
- source_rank: 2
- proposed_action: Delete the sentence.
- applied: true
- fingerprint: 729cffd8f085

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Applied in this run: the contradicted sentence deleted.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: definition vs Friedland's 'gross (i.e., direct and assumed)'; gross/ceded/net relationship and analysis-order claims vs Ch. 3 Reinsurance and Ch. 14; both worked examples recomputed (1,150,000; 1,100,000 basis variant)
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 3 pp.33-34 (PDF pp.39-40); Ch. 14 pp.329-332 (PDF pp.335-338), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Definition and identity agree with Friedland Ch. 3/14. Two overstatements of gross-first / derive-net practice corrected to Friedland's either-approach wording. Example arithmetic reproduces.
