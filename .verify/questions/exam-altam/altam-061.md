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

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:writer
- run_id: 2026-10-25T14:24Z/0282
- date: 2026-10-25
- resolves: F-003
- status: resolved
- note: Maintainer decision applied: an editor's note now follows the SOA's (c)(ii) total 471.87, naming its assumption (the reset restarts a two-year term, adding the death-in-year-3 term 1|q86(4,287.93) = 289.76) and giving the value on the stated 2-year term, q86(2,821.02) = 0.064555 x 2,821.02 = 182.11 (AMLCR ch. 17). The SOA's solution and key are unchanged. Inserted by a minimal Python insert; no other line of the file touched (the points: line belongs to agent soa-residue). Checked against SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q61, p.118, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90, and the questions PDF pp.108-109 (no statement that the term restarts).

## [F-004/R] points set to 0
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-25T14:23Z/505d
- date: 2026-10-25
- resolves: F-004
- status: resolved
- note: Maintainer's decision: points: 4 -> 0 (the app reads 0 as 'no point value printed'). Re-confirmed: SOA ALTAM Written-Answer Sample Questions (January 2026) prints '(N points)' only on pp.2-100; Q61 on pp.108-109 has none (page image read), and the text of pp.101-109 has no 'point'.

## [F-005] Editor's note cites AMLCR ch. 17, which no pass has read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-25T14:34Z/a780
- date: 2026-10-25
- severity: minor
- status: open
- locus: Part c(ii), editor's note, last sentence
- claim: The note ended '... the hedge portfolio is q_86(2,821.02) = 182.11 (AMLCR ch. 17).'
- evidence: The log's F-003 (2026-10-23) says the AMLCR ch. 17 reset convention 'was not consulted' (commercial text), and the writer's F-003/R cites only the SOA PDFs; AMLCR is not in the source cache and a web search found no open copy. The parenthesis therefore attributes the 182.11 reading to a source nobody read, and industry descriptions of segregated-fund resets differ on whether a reset extends the term, so the attribution could point the wrong way. The note's figures stand without it: q86 = 0.064554 (SULT, A 0.00022, B 2.7e-6, c 1.124) x v(1,2) 2,821.02 = 182.11, as the SOA prints on p.118.
- source_rank: 1
- proposed_action: Delete ' (AMLCR ch. 17)' from the note (done in this run); keep the SOA's key 471.87 and the note's figures.
- applied: true
- fingerprint: 934f00fed3df

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-25T14:34Z/a780
- date: 2026-10-25
- resolves: F-005
- status: resolved
- note: Deleted ' (AMLCR ch. 17)' from the editor's note by a single Python string replace; nothing else in the file changed. The note now rests only on the SOA's own figures and the question's text (2-year policies, no statement that the reset restarts the term).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-25T14:34Z/a780
- date: 2026-10-25
- status_set: verified
- confidence: medium
- checks_run: checker for the writer's run 2026-10-25T14:24Z/0282: editor's note figures re-derived independently before reading the writer's working; note checked for accuracy, length, marking and placement directly after the passage it corrects; git diff HEAD confirms only the note (and agent soa-residue's points: line, already recorded) changed, publisher text, key and figures untouched; source pages re-rendered and read this session; one unread citation removed from the note (F-005)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q61, pp.108-109 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q61, pp.117-118 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Re-derived (SULT, Black-Scholes r 0.04, sigma 0.30): v(1,2) = 18,818 x put(K 1.09468, 1 yr) = 2,821.02, q86 = 0.064554, contribution 182.11; v(1,3) = 18,818(0.97) x put(K^2, 2 yr) = 4,287.93, 1|q86 = 0.067574, 289.75 (SOA 289.76), total 471.87. Pp.108-109 (rendered) call the policies 2-year and do not say the reset restarts the term, so the note is accurate: the SOA's 471.87 adds a death-in-year-3 term and on the stated term the time-1 hedge is 182.11. The SOA's (c)(ii) reading and its key 471.87 are kept as instructed; the note sits beside them. P.118 (rendered) matches the explanation; (b) figures spot-checked on p.117. Medium: the (c)(ii) note rests on recomputation against the SOA's printed solution.
