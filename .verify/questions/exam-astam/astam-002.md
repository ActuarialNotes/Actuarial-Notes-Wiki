---
target: questions/exam-astam/astam-002.md
created: 2026-10-23
---

## [F-001] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part d, stem (ii)
- claim: Stem reads "based on the indicated differentials developed in Question 16" with no marker.
- evidence: SOA ASTAM sample questions p.5, Q2(d)(ii), prints "developed in Question 16" (part (d)(i) is meant; the sample set has no Question 16 about differentials). Kept as printed per P1; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: cecf042b7869

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked "(as printed)" in place in this run; the text matches the SOA page.

## [F-002] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part d, explanation (i), first line
- claim: Explanation reads "= E(S) = E(N)E(S)" with no marker.
- evidence: SOA ASTAM sample solutions p.6 prints "which = E(S) = E(N)E(S)" (E(N)E(X) meant; the figures 0.04 x 3000 etc. use E(X)). Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: b8c507b34a89

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- resolves: F-002
- status: resolved
- note: Marked "(as printed)" in place in this run; the text matches the SOA page.

## [F-003] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part d, explanation (ii), last line
- claim: Explanation labels the Reckless differential "Class C" with no marker.
- evidence: SOA ASTAM sample solutions p.6 prints "Indicated Differential for Class C = (10.41666)(0.51/0.60) = 8.85416"; the stem has no Class C (Reckless meant). Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 58b4e029c7e7

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- resolves: F-003
- status: resolved
- note: Marked "(as printed)" in place in this run; the text matches the SOA page.

## [F-004] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b, explanation (ii), 2019 weighted premium
- claim: The 2019 weighted premium ends "= 1.172368" (no P) with no marker.
- evidence: SOA ASTAM sample solutions p.5 prints the 2019 line ending "(1.10)(1.08)P = 1.172368" without the P the 2017 and 2018 lines carry. Value checked: 0.170139(1.10) + 0.013889(1.140480) + 0.815972(1.188) = 1.172368. Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 40e1757f71b5

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- resolves: F-004
- status: resolved
- note: Marked "(as printed)" in place in this run; the text matches the SOA page.

## [F-005] SOA's parallelogram figure replaced by a vault-written description
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b, explanation (i)
- claim: Explanation (i) says "The SOA's solution draws the parallelogram as a figure. In words: ..." and describes it in prose rather than showing the figure.
- evidence: SOA ASTAM sample solutions p.4 draws the figure: three squares 2017/2018/2019, diagonals from 5/24, 7/12 and 10/12, regions P, 1.10P, (1.1)(1.08)P and a call-out (1.10)(1.08)(0.96)P. The vault's description agrees with every label on the figure, but the answer to (b)(i), a graphic, is vault prose rather than the SOA's drawing.
- source_rank: 1
- proposed_action: Extract the SOA's own figure from solutions p.4 into Media/Attachments (as was done for the four ASTAM plots) and embed it in place of, or beside, the description.
- applied: false
- fingerprint: fd2f3069fdbb

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- status_set: verified
- confidence: medium
- checks_run: independent recomputation of every computed part before reading the key and solution; stem, table and formula diff against the 130-dpi page images of the question PDF; explanation diff against the solution page images (method, figures, arithmetic, align* rows); frontmatter (type multi-part, wiki_link targets and topic page exist, validate_content.py passes)
- sources_checked: SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q2, pp.4-5, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf; SOA ASTAM Solutions to Sample Questions, Q2, pp.4-6, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf
- note: Recomputed (b)(ii) with the SOA's half-month convention: weighted premiums 1.031337P, 1.105469P, 1.172368P; on-level EP 11,058.27, 12,380.05, 7,782.40; (d) differentials 1, 3.3333, 10.4167 and 3.5000, 8.8542. Agree with the SOA. (a) is prose and (c)'s solution is only a pointer to Brown & Lennox pp.127-128 (not consulted; transcribed as printed, not a slip), hence medium. Four SOA slips marked (as printed); the SOA's own (d)/(e) labels on the (d)(i)/(d)(ii) answers are filed as (i)/(ii) under Part d, a structural choice, not a content change. The (b)(i) figure is described in prose rather than shown (minor finding left open).

## [F-006] Question points not printed by the source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-25T14:23Z/505d
- date: 2026-10-25
- severity: minor
- status: open
- locus: frontmatter, points
- claim: The vault gave points: 4, its number of parts, as if the SOA printed a point value.
- evidence: SOA ASTAM Sample Questions (version of Feb. 23, 2026), sha256:0294cf4e8717…: 'point' occurs nowhere in the 31-page text layer (no OCR or image pages), and Q2 on p.4-5 carries no '(N points)' heading or per-part value (p.12, Q7, page image read); the solutions PDF (47 pages, sha256:c4206394603c…) has no 'points' either. The 4 equals the file's 4 parts, a converter default rather than a transcribed figure.
- source_rank: 1
- proposed_action: Maintainer's decision: set points: 0, which the app reads as 'no point value printed' and times or sizes by the paper's pace.
- applied: true
- fingerprint: f3177e679e2a

## [F-006/R] points set to 0
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-25T14:23Z/505d
- date: 2026-10-25
- resolves: F-006
- status: resolved
- note: points: 4 -> 0 per the maintainer's decision (0 = no point value printed); dated sitting questions untouched.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-25T14:23Z/505d
- date: 2026-10-25
- status_set: verified
- confidence: medium
- checks_run: delta re-check of a points change: git diff shows only the points line changed; SOA ASTAM sample questions and solutions PDFs searched for 'point'/'points'/'marks' (none), Q2 p.4-5 read
- sources_checked: SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q2, pp.4-5, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf; SOA ASTAM Solutions to Sample Questions, Q2, pp.4-6, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf
- note: Delta pass after points 4 -> 0; confidence kept at medium.

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-25T14:28Z/425a
- date: 2026-10-25
- resolves: F-005
- status: resolved
- note: Applied: the SOA's figure cropped from solutions p.4 (200 dpi render, the diagram with its year labels, fractions and callout, without the '(b)' label) into Media/Attachments/astam-002-b-i-parallelogram.png and embedded under (i) in place of the vault's prose. The prose moved into the alt text, corrected against the image: the years are drawn as rectangles, not squares; the vault's glosses that the figure does not print (the axes' meaning, the dates March 15 / July 30 / October 31) dropped.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-25T14:28Z/425a
- date: 2026-10-25
- status_set: verified
- confidence: medium
- checks_run: figure delta: solutions p.4 text layer and 200 dpi render read; figure cropped and read back; alt-text labels, fractions and region labels checked against the image; git diff against this run's starting bytes confirms only the (i) paragraph replaced (the points change in the file is run 2026-10-25T14:23Z/505d's, already passed)
- sources_checked: SOA ASTAM Solutions to Sample Questions, Q2, pp.4-6 (parallelogram figure p.4), sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf; SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q2, pp.4-5, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf
- note: Delta re-check for the figure embed (resolves F-005). Nothing else in the file moved; medium as before.
