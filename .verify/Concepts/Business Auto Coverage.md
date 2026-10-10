---
target: Concepts/Business Auto Coverage.md
created: 2026-10-10
---

## [F-001] Rating-factor structure and the dealers/garage split rest on no source read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- severity: minor
- status: open
- locus: Symbols bullet for P_liab; bullet 'Other ISO commercial auto forms'
- claim: ISO liability rating = base rate x primary factor (size class, use, radius) x secondary factor (business classification) x ILF x modification; 'The auto dealers coverage form, and the garage coverage form for other auto businesses'.
- evidence: CA 00 01 10 13 and FC&S 'Standard Commercial Auto Program' (2010) were read: FC&S names the business auto, truckers (being withdrawn), garage and motor carrier forms, and says the garage form is issued to dealers, repair shops, service stations and parking places. Neither describes ISO's primary/secondary rating factors, and the 2010 FC&S text predates the auto dealers coverage form (CA 00 25), so the dealers/garage split is unsourced. Verisk's 2022 commercial auto paper confirms radius drives rating but not the factor structure.
- source_rank: 3
- proposed_action: Cite the ISO Commercial Lines Manual (Division One) or a current FC&S page for the factor structure and the auto dealers form.
- applied: false
- fingerprint: dea20afa430d

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: every symbol's description, the symbol 7 30-day rule and symbols 1-6/19 automatic coverage, insureds and the employee-owned-auto exception, supplementary payments not reducing the limit, specified causes list, lesser of ACV and repair against CA 00 01 10 13; examples worked blind (sum f = 6.30; 9,546.08; PD 8,120.00; total 17,666.08; 52%; (a) covered if conditions met, (b) firm protected, employee not an insured, (c) liability yes, collision no)
- sources_checked: ISO CA 00 01 10 13 Business Auto Coverage Form, I.A symbols 1-9, 19; I.B owned autos acquired; II.A insuring agreement, who is an insured, supplementary payments, duty ends on exhaustion; III physical damage, specified causes, limit, sha256:b8e36d4e31f05a7eaad97cba8b091f8a45cf1ea302e616bad96b4c132c1457e8 — https://assets.touchpointmarkets.com/80/d7/be854d714678be5fefc9d17cc365/ca-00-01-10-13-business-auto-coverage-form.pdf; FC&S (PropertyCasualty360), 'Standard Commercial Auto Program', 2010, entry, sha256:b10e67950efd26d0bb4c9be857b79609ff3ae9e182974000ce96dae6359856a4 — https://propertycasualty360.com/fcs/2010/03/18/standard-commercial-auto-program; Verisk, Commercial Auto Underwriting Solutions (2022) — radius misclassification, radius misclassification, sha256:488eb448967865774bea373b6b71c9d3b94e97a92ebc1841b7045cfdb4e7b39f — https://www.verisk.com/siteassets/media/downloads/underwriting/commercial-auto/commercial-auto-underwriting-solutions.pdf; IRMI Glossary, 'motor vehicle record (MVR)', entry, sha256:b8eac348a0f86568d7e92079c070b64dd60e132e3b3b580e6fc61e1a4892e035 — https://www.irmi.com/term/insurance-definitions/motor-vehicle-record
- note: Form content rank 1; underwriting considerations general. F-001 (minor) open. Medium.

## [F-002] Secondary rating factor multiplied instead of added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- severity: major
- status: open
- locus: P_liab formula, Symbols bullet, first example, trap 'Primary versus secondary factors'
- claim: P_liab = B x sum f_i x g x ILF x (1+m), with g = 1.10 the secondary factor; example 1,000 x 6.30 x 1.10 x 1.45 x 0.95 = 9,546.08.
- evidence: CAR Commercial Automobile Insurance Manual, Section III Rule 53.B (p.12): 'Determine the combined rating factor by adding the secondary rating factor to the primary rating factor', then 'Multiply these rates by the combined rating factor'. Rule 52.B (p.2): primary classification = size, business use and radius. Restated with s = +0.10: combined factors 1.10 and 1.75, sum 6.80, P_liab = 1,000 x 6.80 x 1.45 x 0.95 = 9,367.00, total 17,487.00, medium trucks 3.50/6.80 = 51%.
- source_rank: 2
- proposed_action: Restate the formula, symbols, example and trap to the manual's additive combined factor (lead-authorised restatement).
- applied: true
- fingerprint: e46bcf9011c4

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- resolves: F-002
- status: resolved
- note: Applied: formula now B x sum (f_i + s) x ILF x (1+m); symbols bullet cites CAR Rule 53; example re-rated (9,367.00; total 17,487.00; 51%); trap says the secondary factor is added, not multiplied.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied (lead-authorised): rating-factor structure now sourced to the CAR manual (Rule 52.B primary = size, use, radius; Rule 53.B additive secondary factor; physical damage on original cost new, age, territory, deductible relativities); the auto dealers form and the motor carrier trailer-interchange/garagekeepers details deleted and the forms bullet restated to FC&S 'Standard Commercial Auto Program' (motor carrier, truckers being withdrawn, garage form eligibility, business auto for the rest).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: re-verify after edits: restated rating formula and example recomputed (6.80; 9,367.00; 8,120.00; 17,487.00; 51%); forms bullet diffed against FC&S; symbols and coverage content unchanged from the earlier pass
- sources_checked: ISO CA 00 01 10 13 Business Auto Coverage Form, I.A, I.B; II.A; III, sha256:b8e36d4e31f05a7eaad97cba8b091f8a45cf1ea302e616bad96b4c132c1457e8 — https://assets.touchpointmarkets.com/80/d7/be854d714678be5fefc9d17cc365/ca-00-01-10-13-business-auto-coverage-form.pdf; FC&S (PropertyCasualty360), 'Standard Commercial Auto Program', 2010, entry, sha256:b10e67950efd26d0bb4c9be857b79609ff3ae9e182974000ce96dae6359856a4 — https://propertycasualty360.com/fcs/2010/03/18/standard-commercial-auto-program; CAR Commercial Automobile Insurance Manual, Section III Trucks, Tractors and Trailers (eff. 2026.03.01), Rule 52.B (p.2); Rule 53.B-C (p.12); physical damage OCN/age (pp.13, 16), sha256:a695660aba89aad42dac4c609959576580c5213d90b4365dc9a92b39d5481de4 — https://www.commauto.com/manuals/commauto/2026/rules/Section3.pdf; Verisk, Commercial Auto Underwriting Solutions (2022) — radius misclassification, radius misclassification, sha256:488eb448967865774bea373b6b71c9d3b94e97a92ebc1841b7045cfdb4e7b39f — https://www.verisk.com/siteassets/media/downloads/underwriting/commercial-auto/commercial-auto-underwriting-solutions.pdf; IRMI Glossary, 'motor vehicle record (MVR)', entry, sha256:b8eac348a0f86568d7e92079c070b64dd60e132e3b3b580e6fc61e1a4892e035 — https://www.irmi.com/term/insurance-definitions/motor-vehicle-record
- note: F-001 and F-002 resolved. The CAR manual is Massachusetts' residual-market manual, used here as the published analogue of ISO's commercial auto rules; ISO's own Commercial Lines Manual was not read. Medium.
