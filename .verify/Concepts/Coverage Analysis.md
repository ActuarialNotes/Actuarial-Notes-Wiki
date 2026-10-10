---
target: Concepts/Coverage Analysis.md
created: 2026-10-10
---

## [F-001] Framework and its order attributed to The Institutes without a source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- severity: minor
- status: open
- locus: lead paragraph
- claim: 'The Institutes' framework works through the policy in a fixed order: the declarations, the insuring agreement and its definitions, the conditions, the exclusions, and the endorsements and other provisions that modify them, and then the provisions that set the amount payable.'
- evidence: No source read in this run states this framework or attributes it to The Institutes; the course text is not public. The only public descriptions found (open-exam-prep.com study guides, a weak exam-prep source) disagree on the order - one has endorsements checked before exclusions, another says analysis begins with endorsements. Writer F1 flagged the same gap (scratchpad followups).
- source_rank: 3
- proposed_action: Cite a source for the framework and its order (The Institutes' text, or a reputable reference such as IRMI/FC&S), or soften to 'a common framework' without the attribution.
- applied: false
- fingerprint: d26d6daa8d7c

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: in_review
- checks_run: BPP mapping, CGL mapping and both examples checked against ISO specimens: CP 00 10 10 12 (money is property not covered A.2.a; deductible §D, once per occurrence), CP 10 30 10 12 (interior rain limitation unless the roof or walls are first damaged by a covered cause; ensuing-fire exceptions), CG 00 01 04 13 (Coverage A insuring agreement incl. not known before the policy period; exclusions a-q from Expected Or Intended Injury to Recording And Distribution; damage to your product; employer's liability; Coverage B offense arising out of your business; Coverage C regardless of fault, ways next to premises; conditions as soon as practicable, voluntary payments; the six limits; duty to defend ends when the limit is used up in judgments or settlements). Recomputed: 62,500 + 48,000 = 110,500; 140,000 + 2,200 = 142,200.
- note: Left in_review: the page's core DISC-RM 13.5 claim, The Institutes' framework for coverage analysis and its order, has no source (minor finding opened). The form mappings and examples check against the specimens: ISO CP 00 10 10 12 Building and Personal Property Coverage Form (specimen), A.2.a property not covered (money), D. Deductible, sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf; ISO CP 10 30 10 12 Causes of Loss – Special Form (specimen), B exclusions with ensuing fire exceptions, C.1.c interior rain limitation, sha256:119fcd978212db836e1084ca8ca90c0fdacb60d157caf4867bbc7b4e02f498e3 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2018/09/CP.10.30.10.12-1-1.pdf; ISO CG 00 01 04 13 Commercial General Liability Coverage Form (specimen), Coverages A–C insuring agreements and exclusions, Section II, III, IV, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf. Small omission noted, not filed: the CGL duty to defend also ends when the limit is used up paying Coverage C medical expenses.
