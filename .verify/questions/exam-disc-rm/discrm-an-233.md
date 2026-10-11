---
target: questions/exam-disc-rm/discrm-an-233.md
created: 2026-10-10
---

## [F-001] Two options name the same pair of goals
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- severity: major
- status: open
- locus: options C and D
- claim: Options C ('Meeting legal requirements, and fulfilling a duty to society') and D ('Fulfilling a duty to society, and meeting legal requirements') are the same two goals in a different order; the key is C and the explanation rejects D only as 'the right two goals in the wrong order'.
- evidence: The stem asks 'Which pair of insurer risk control goals do these two services serve?' and does not say 'respectively', so a pair is unordered and D is as correct as C; A and B are likewise permutations of one pair. A student who picks D is marked wrong while right. Rank-5 reading of the stem against its own options; no source needed to see the duplication.
- source_rank: 5
- proposed_action: Rewrite so the four options are four different pairs (or add 'respectively' and make A/B and C/D genuinely distinct); keep the key on boiler inspections = legal requirement, seminars = duty to society.
- applied: false
- fingerprint: 5a8f6ab8ba9d

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: in_review
- checks_run: Recomputed blind from the stem (answer and explanation stripped) before reading the key; blind answer C (with D equally defensible - finding opened); learning objective and tags checked.
- note: Left in_review: the four insurer risk control goals are The Institutes' framework, not found in any readable source this run (only flashcard sites); plus the open major finding on duplicate option pairs.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Options rewritten on the lead's authorization so the four are distinct pairs: A profit + customer needs; B customer needs + legal requirements; C legal requirements + duty to society (key, unchanged); D profit + duty to society. Why-not lines rewritten to match.

## [C-002] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: in_review
- checks_run: Re-read after the option rewrite: four distinct pairs, key C unchanged in meaning, blind answer C.
- note: Still in_review: the four insurer risk control goals the question tests (profit, customer needs, duty to society, legal requirements) are The Institutes' framework and appear in no source readable this run; Risk Control no longer states them.

## [F-002] Tagged to Underwriting rather than the DISC page Underwriting Process
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/dv14a
- date: 2026-10-11
- severity: minor
- status: open
- locus: frontmatter wiki_link
- claim: wiki_link includes Concepts/Underwriting (alongside Concepts/Risk+Control).
- evidence: docs/cas-publication-plan.md §3.5 rule 3: the DISC-RM underwriting lines were relinked from Underwriting (in_review; life/health material no free source covers) to Underwriting Process; Exam DISC-RM (CAS).md links only [[Underwriting Process]]. Concepts/Underwriting Process.md (verified) teaches what the stem tests: step 1 gathers loss control inspections, step 6 monitors a policy written subject to loss control recommendations - the same two facts RIEA Steps 2 and 6 state.
- source_rank: 4
- proposed_action: Retag Concepts/Underwriting -> Concepts/Underwriting+Process.
- applied: false
- fingerprint: b9f04e30a462

## [C-003] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/dv14a
- date: 2026-10-11
- status_set: in_review
- checks_run: blind answer from the stem: B (the key sits in the frontmatter above the stem and was in view when the file was opened; the answer was worked from the stem and the sources, not from the key or explanation); every option checked against a source; explanation checked; answerable from Concepts/Risk Control.md (Insurer risk control; Risk control and underwriting) and Concepts/Underwriting Process.md
- sources_checked: Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012, CC BY-NC-SA), §7.1 Insurance Operations: Marketing, Underwriting, and Administration (Marketing intro; Life/Health; General Agency; Managerial; Group and Supplemental; Property/Casualty; Independent Agency; Direct Writers and Exclusive Agents; Brokers; Internet; Mass Merchandising; Service), sha256:9abf601a8c7e62c112667b15df20471c0a07e5e32ff1dea40448eec0afdccf7e — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-01-insurance-operations-marketing.html; Risk & Insurance Education Alliance, 'Six Steps of the Underwriting Process' (30 Jan 2023), Steps 2 and 6, sha256:9523dc56c968ea8773752c7b139b3d9895b0229df9d716e2dd3a3cc843481d17 — https://www.riskeducation.org/six-steps-of-the-underwriting-process/; Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012, CC BY-NC-SA), §4.4 Risk Management Alternatives (loss prevention, loss reduction, avoidance), sha256:5da3c20b87e2a72ff64a492c44f23e70c966629c990a5dfd9739b0ec09c59eb8 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-04-risk-management-alternatives-t.html; IRMI Glossary, 'premium audit', sha256:d539808a25b9734bcf2d57f11809bb1b69dacba9241f112156dc3ec1930bcd1e — https://www.irmi.com/term/insurance-definitions/premium-audit
- note: Key B agrees with BBK §7.1 (engineering and loss control: prevention and reduction where economically feasible, particularly workers compensation) and RIEA Steps 2 and 6. A: control is not financing (BBK §4.4). C: premium audit (IRMI). D: prevention lowers probability, avoidance removes the exposure (BBK §4.4). Retag finding open for the clean-up run.
