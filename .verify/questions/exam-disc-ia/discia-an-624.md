---
target: questions/exam-disc-ia/discia-an-624.md
created: 2026-10-10
---

## [F-001] Option D's rationale does not produce $1,584,000
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv10
- date: 2026-10-10
- severity: minor
- status: open
- locus: Explanation, 'Why not the others', D
- claim: D — Applies 4% twice, as if it were a two-year increase.
- evidence: Applying 4% twice gives 1,500,000×1.08 = 1,620,000 (or 1,622,400 compounded), neither of which is option D. $1,584,000 = 1,500,000 + 1,500,000×0.04×(365+146)/365 = 1,500,000 + 84,000, i.e. a full year's 4% added to the 146-day increase. The key (B, 1,524,000) is right: ISO CP 00 10 10 12 §G.2.b, the form's own example being 100,000×.08×146/365 = 3,200.
- source_rank: 5
- proposed_action: Rewrite D's rationale to say it adds a full year's 4% on top of the 146-day accrual (authoring — left for a writer).
- applied: false
- fingerprint: 2ea704c03b43

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv10
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Blind recompute from the stem before reading the key (keys all agreed); every option's rationale and arithmetic re-worked; learning_objective matches the DISC-IA page's section title exactly; wiki_link targets exist and are U.S. pages; facts checked against: §G.2.b and its example: 1,500,000×0.04×146/365=24,000 → 1,524,000
- sources_checked: ISO CP 00 10 10 12 Building and Personal Property Coverage Form (specimen), §G.2.b and its example: 1,500,000×0.04×146/365=24,000 → 1,524,000, sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf
- note: Vault-written question with no publisher's key: medium per the MAS-I / Exam P precedent. One minor finding open on option D's rationale.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv10
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied in this run. Option D's rationale now gives the arithmetic that produces it: 1,500,000×0.04×(365+146)/365 = 84,000 → 1,584,000. Key unchanged (B).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv10
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Delta re-check of option D's rationale: 60,000×511/365 = 84,000, 1,500,000+84,000 = 1,584,000; key B = 1,524,000 per CP 00 10 10 12 §G.2.b.
- sources_checked: ISO CP 00 10 10 12 Building and Personal Property Coverage Form (specimen), §G.2.b (delta re-check of option D), sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf; ISO CP 00 10 10 12 Building and Personal Property Coverage Form (specimen), §G.2.b and its example: 1,500,000×0.04×146/365=24,000 → 1,524,000, sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf
- note: Vault-written question: medium per precedent.
