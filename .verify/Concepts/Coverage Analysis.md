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

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: On the lead's authorization the sentence attributing a fixed-order framework to The Institutes was deleted; the bullets now present the policy parts without the attribution.

## [F-002] Endorsement precedence and 'read last' unsourced; duty-to-defend end incomplete
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- severity: minor
- status: open
- locus: Endorsements bullet; CGL step (6)
- claim: 'Endorsements ... take precedence over the printed form where the two conflict. Miscellaneous provisions ... are read last.' and the duty to defend ends 'until the applicable limit is used up paying judgments or settlements'.
- evidence: No source read states the precedence rule or the reading order. CG 00 01 04 13 Section I.1.a(2): the right and duty to defend ends when the limit is used up 'in the payment of judgments or settlements under Coverages A or B or medical expenses under Coverage C'.
- source_rank: 1
- proposed_action: Restate the endorsement sentence to what it does (modifies the form) and complete the duty-to-defend clause from the form (done).
- applied: true
- fingerprint: 60c1ed0c010c

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- resolves: F-002
- status: resolved
- note: Applied in this run on the lead's authorization: Restate the endorsement sentence to what it does (modifies the form) and complete the duty-to-defend clause from the form (done).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Re-verify after the edits: BPP mapping against CP 00 10 10 12 and CP 10 30 10 12, CGL mapping against CG 00 01 04 13 (now including the Coverage C medical-expense end of the duty to defend); examples recomputed (110,500; 142,200) with the rain limitation and money exclusion confirmed.
- sources_checked: ISO CP 00 10 10 12 Building and Personal Property Coverage Form (specimen), A.2.a property not covered (money), D. Deductible, sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf; ISO CP 10 30 10 12 Causes of Loss – Special Form (specimen), B exclusions with ensuing fire exceptions, C.1.c interior rain limitation, sha256:119fcd978212db836e1084ca8ca90c0fdacb60d157caf4867bbc7b4e02f498e3 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2018/09/CP.10.30.10.12-1-1.pdf; ISO CG 00 01 04 13 Commercial General Liability Coverage Form (specimen), Coverages A–C insuring agreements and exclusions, Section II, III, IV, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf
- note: Medium: the specimen forms are primary, but the step-by-step analysis is the vault's own presentation, no longer attributed to The Institutes.
