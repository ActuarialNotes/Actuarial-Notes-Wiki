---
target: Concepts/CGL Coverage A Exclusions.md
created: 2026-10-10
---

## [F-001] Pollution exclusion f(2) narrowed to government orders
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv11
- date: 2026-10-10
- severity: minor
- status: open
- locus: bullet 'f. Pollution', sentence 'Cleanup costs ordered by a government, and governmental suits for them, are excluded too.'
- claim: Page says exclusion f excludes cleanup costs 'ordered by a government' and governmental suits for them.
- evidence: CG 00 01 04 13 p.4, exclusion f(2)(a) excludes any loss, cost or expense arising out of any 'Request, demand, order or statutory or regulatory requirement that any insured or others test for, monitor, clean up...' — not only a government order; f(2)(b) is the governmental claim or suit. The form also gives back (closing sentence of f(2)) liability for property damage the insured would have absent such request or suit, which the page omits.
- source_rank: 1
- proposed_action: Reword to 'any request, demand, order or statutory or regulatory requirement to test for or clean up pollutants, and governmental suits for those costs', and consider adding the f(2) give-back.
- applied: false
- fingerprint: bf2f247cb85d

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv11
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: every rule, definition, exclusion/exception and number against the cited form edition read this run; worked examples recomputed; [[links]] resolve; paraphrase vs form wording (copyright)
- sources_checked: ISO CG 00 01 04 13 Commercial General Liability Coverage Form (ISO 2012, 16 pp.), Section I Coverage A para 2 exclusions a-q and closing paragraph (pp.2-6); Section III para 6 (p.11); Section V defs 7, 8, 9, 11, 12, 15, 16, 21, 22 (pp.13-16), sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf
- note: All seventeen exclusions a-q, their exceptions, the fire give-back and the defined terms checked against CG 00 01 04 13. Examples recomputed: fire min(180,000; 100,000)=100,000; ladder excluded by j(3); water excluded by j(1); subcontractor exception to l; e/g/j(5)/c in the landscaper case. Medium because of one open minor form-fidelity finding (pollution f(2) described as government-ordered only); everything else checks against the rank-1 form.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv11
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Fixed to CG 00 01 04 13 exclusion f(2) (p.4): 'Costs arising out of any request, demand, order or statutory or regulatory requirement to test for, clean up or otherwise respond to pollutants, and governmental claims or suits for those costs, are excluded too.'

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv11
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: delta re-check of the edited passage against the cited source; lint/verify_check clean
- sources_checked: ISO CG 00 01 04 13 Commercial General Liability Coverage Form (ISO 2012, 16 pp.), Section I Coverage A para 2 exclusions a-q and closing paragraph (pp.2-6); Section III para 6 (p.11); Section V defs 7, 8, 9, 11, 12, 15, 16, 21, 22 (pp.13-16), sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf
- note: Re-verified after the dv11 fix to the open finding (now resolved); the change restates the passage to the source already cited, and nothing else in the file changed since this run's earlier pass. No open findings.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv11
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: every claim against ISO CG 00 01 04 13 after the F-001 fix
- sources_checked: ISO CG 00 01 04 13 Commercial General Liability Coverage Form (ISO 2012, 16 pp.), Section I Coverage A para 2 exclusions a-q and closing paragraph (pp.2-6); Section III para 6 (p.11); Section V defs 7, 8, 9, 11, 12, 15, 16, 21, 22 (pp.13-16), sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf
- note: Raised to high: with F-001 resolved, every substantive claim on the page checks against the rank-1 form read this run.
