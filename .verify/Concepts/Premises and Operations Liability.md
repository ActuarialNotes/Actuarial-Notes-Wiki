---
target: Concepts/Premises and Operations Liability.md
created: 2026-10-10
---

## [F-001] General contractor's liability for subcontractors stated without the independent-contractor rule
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- severity: minor
- status: open
- locus: bullet 'Contractors and subcontractors'; exam trap 'Subcontracted work is still the insured's exposure'
- claim: 'A general contractor is liable for injuries caused by its subcontractors' work.' / 'The general contractor is liable for its subcontractors' operations'.
- evidence: LII Wex 'independent contractor': 'employers who hire independent contractors usually have no vicarious liabilities to independent contractors' tortious acts', except non-delegable duties (inherently dangerous activities, duties to the public, premises open to the public, safety statutes) and negligent selection. A GC can be, and often is, held liable (and is sued), which is why underwriters rate subcontracted cost, but the flat statement overstates the law.
- source_rank: 3
- proposed_action: Qualify to 'can be held liable' / 'is often held liable, for example for inherently dangerous work or non-delegable duties'. Rewording, so not auto-fixed.
- applied: false
- fingerprint: d01c87883a6e

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: hazard definitions against CG 00 01 (PCOH vs everything else, general aggregate), insured contract, Coverage C excluding the PCOH, premium bases against FC&S; both examples recomputed blind (8,330 + 42 + 525 = 8,897; x1.60 x0.90 = 12,811.68; 400,000 to the sub's insurer, 0 to the GC's)
- sources_checked: ISO CG 00 01 04 13 Commercial General Liability Coverage Form, Cov A 2.b insured contract; Cov C; III; V.16 PCOH; V.9 insured contract, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf; FC&S Editors, 'Bases of Liability Premium', PropertyCasualty360, 9 Oct 2012, payroll, gross sales, area, total cost, sha256:3098468d31acf87f67490601c66a720666953277f266b0692ff23c3d387ab3ed — https://www.propertycasualty360.com/fcs/2012/10/09/bases-of-liability-premium/; LII Wex, 'independent contractor', entry, sha256:dc17e9075951c353b9492692ee72547cc0cbbe07870a3733fb30938519d41dc6 — https://www.law.cornell.edu/wex/independent_contractor
- note: Form and FC&S content checks; the underwriting considerations (housekeeping, foot traffic, work at heights) are The Institutes' framing, uncontroversial and unsourced. F-001 (minor) open. Medium.
