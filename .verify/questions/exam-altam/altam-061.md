---
target: questions/exam-altam/altam-061.md
created: 2026-10-23
---

## [F-001] Conflict inside the source: the prompt's '77 to the nearest 1' against the solution's 83.85 (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b(ii) prompt
- claim: Part (b)(ii) asks to 'Show that the cost of the contribution of year 1 ... is 77 to the nearest 1'; the SOA's solution, and the vault's explanation, reach 83.85. The prompt was unmarked.
- evidence: SOA ALTAM questions PDF p.108, (b)(ii): '... is 77 to the nearest 1.' Solutions PDF p.117: 'Contribution to hedge portfolio = q85(1,454.13) = 0.057665(1,454.13) = 83.85', and the (iii) total 218.30 uses 83.85. Independent recompute (SULT q85 = 0.057665, Black-Scholes r 4%, sigma 0.30, strike e^{0.06}/0.97 on 9,700): put 1454.13, contribution 83.85 - the solution is right and the prompt's 77 is the publisher's slip. Content-plan A.7.
- source_rank: 1
- proposed_action: Mark the prompt's 77 '(as printed)'; leave the figure.
- applied: true
- fingerprint: 80b5a1f96103

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run: '(as printed)' after 77 in the (b)(ii) prompt; the conflict is recorded here.

## [F-002] Other SOA slips in Q61 not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: nit
- status: open
- locus: stem assumption (iii); explanation, part c(ii)
- claim: Assumption (iii) says 'Standard Ultimate Mortality Model' (the set's name for it is the Standard Ultimate Life Table / Survival Model), and (c)(ii) writes the reset death benefit as max(10,000e^{0.06}, F_2) while computing with 19,400e^{0.06}. Unmarked.
- evidence: SOA ALTAM questions PDF p.108 (iii) and solutions PDF p.118 (c)(ii) print both. Content-plan A.7 lists them. The SOA's unbalanced parenthesis in (c)(i) ('...starting assets)') and unclosed quotation in (b)(v) are punctuation only and are left unmarked.
- source_rank: 1
- proposed_action: Add ' (as printed)' at each.
- applied: true
- fingerprint: 470c5a58acdb

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-002
- status: resolved
- note: Applied in this run: two (as printed) markers.

## [F-003] Reset in (c)(ii) is valued as a new two-year term, which the question does not state
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: major
- status: open
- locus: Part c(ii), explanation
- claim: The question is about '2-year equity-linked policies' and says only that after the year-1 reset 'Future GMDBs are based on the fund value at the end of year 1, accumulated as before'. The SOA's (c)(ii) hedge at time 1 adds a death-in-year-3 term, v(1,3) = 4,287.93 times 1|q86 = 289.76, so 182.11 + 289.76 = 471.87; on the stated two-year term only the year-2 death term (182.11) remains.
- evidence: SOA ALTAM questions PDF pp.108-109 (no statement that the term restarts) against solutions PDF p.118 ('v(1,3) = 18,818(0.97)[1.09468^2 e^{-0.04(2)} ...] = 4,287.93 ... Hedge portfolio = 182.11 + 289.76 = 471.87'). Recompute: under a reset that restarts a two-year term the SOA's 471.86 reproduces exactly (1|q86 = 0.067574); under the contract as stated the time-1 hedge is 182.11. Whether an AMLCR-style reset extends the term is a reading of the commercial text (AMLCR ch. 17), which was not consulted. Rank-1 key against my rank-5 reading of the prompt: logged, not changed.
- source_rank: 1
- proposed_action: Maintainer/campaign decision: confirm against AMLCR ch. 17's reset convention; if the term restarts, nothing to change; if not, add a note recording the conflict. No change made.
- applied: false
- fingerprint: fcd0c8d762fb

## [F-004] Question points (4) not printed by the source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: minor
- status: open
- locus: frontmatter, points
- claim: The vault gives points: 4 and its parts carry no point values.
- evidence: SOA ALTAM questions PDF pp.108-109 print Q61 with no '(N points)' heading, no per-part values and no source-exam note; the solutions PDF pp.117-118 give none either. The 4 matches the number of parts (a)-(d), a converter default rather than a transcribed figure.
- source_rank: 1
- proposed_action: Maintainer decision: keep a documented one-point-per-part convention for unscored sample questions, or find the original paper's values. No change made.
- applied: false
- fingerprint: c679f60e9f98

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: in_review
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q61, pp.108-109 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q61, pp.117-118 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Blind recompute (SULT, Black-Scholes r 4%, sigma 0.30): (a) 1.1983 (SOA); (b)(i) d1 = -0.018197 (SOA); (b)(ii) 83.85 (SOA 83.85; the prompt's 77 is a publisher slip, marked as printed, F-001); (b)(iii) 218.31 (SOA 218.30); (b)(iv) c = 0.0114 (SOA); (c)(i) ratio 1.00 (SOA); (c)(ii) 182.11 on the contract as stated against the SOA's 471.87, which values a further death-in-year-3 term and reproduces exactly if the reset restarts a two-year term (F-003, major, open). (b)(v), (d) prose match. Stem matches pp.108-109; explanation matches pp.117-118. Left in_review: (c)(ii)'s key rests on a reset convention the question does not state and AMLCR ch. 17 (commercial) was not available to confirm it. Points not printed by the SOA (F-004, open).
