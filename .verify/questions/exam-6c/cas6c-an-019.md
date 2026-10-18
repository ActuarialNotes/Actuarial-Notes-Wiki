---
target: questions/exam-6c/cas6c-an-019.md
created: 2026-10-18
---

## [F-001] Distractor D is defensible as true under the return instructions
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T14:08Z/g6c6
- date: 2026-10-18
- severity: major
- status: open
- locus: option D and its explanation
- claim: D) Its Canadian P&C returns must include the risks in Canada that its home office insures from the United Kingdom; explanation: such risks are excluded.
- evidence: P&C return instructions, Section I Introduction, 'Foreign P&C Insurance Companies' (sha256:284b2923f898a0cf01e3621352c61dcecdbe60b8499e3391575523b6134eb1c2): risks located in Canada but insured outside Canada (e.g. by Home Office) are not included in the return, BUT 'pages 85.40 and 85.45 must be completed based on location of risk and must include risks located in Canada that have been insured in Canada and/or abroad'. So the returns do include home-office-insured Canadian risks on two pages, and a candidate who knows that rule can defend D; the explanation's flat 'excluded' is incomplete.
- source_rank: 1
- proposed_action: Replace D with the reverse of the instructions' general rule (reporting based on location of the risk rather than of the insurance), which the same paragraph states is false, and restate D's explanation to that sentence.
- applied: true
- fingerprint: 83b61e68839d

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T14:08Z/g6c6
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Option D reworded in this run to 'Under the Insurance Companies Act, its regulatory reporting is based on the location of the risk rather than the location of the insurance', which Section I states the reverse of ('regulatory reporting of a foreign entity's business is now based on the location of the insurance rather than the location of the risk'); D's explanation restated to that sentence. Exactly one option (C) is now true.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:08Z/g6c6
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: answered blind from stem + options (Python for arithmetic) and compared with the key; exactly one option correct; each distractor's stated reasoning reproduced; explanation checked line by line against the source; topic / learning_objective / wiki_link checked against Exam 6C (CAS).md (targets exist, on the syllabus section, '+' for spaces); format per question-writer formats.md; validate_content.py passes
- sources_checked: OSFI/CCIR, Property and casualty insurance return – Section I – Introduction (2026), Introduction (foreign companies registered federally under the ICA; all insurers licensed provincially; Foreign P&C Insurance Companies: reporting based on location of the insurance), sha256:284b2923f898a0cf01e3621352c61dcecdbe60b8499e3391575523b6134eb1c2 — https://www.osfi-bsif.gc.ca/en/data-forms/reporting-returns/filing-financial-returns/financial-reporting-instructions/pc-insurance-return-section-introduction; OSFI, Minimum Capital Test Guideline (2024), Guideline A (web text), §1 Overview and Chapter 3 / §3.1 Branch Adequacy of Assets Test (BAAT ratio = net assets available / minimum margin required), sha256:585e63316ba7e3c674c5ac1047133920fd38297869263118699be0f7d2a0f6c5 — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
