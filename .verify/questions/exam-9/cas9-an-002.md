---
target: questions/exam-9/cas9-an-002.md
created: 2026-10-18
---

## [F-001] Sourced from the Exam 5 reading, not checked against Exam 9's A5 reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T14:02Z/g6e9
- date: 2026-10-18
- severity: minor
- status: open
- locus: explanation; frontmatter learning_objective
- claim: The question tests catastrophe-model use in ratemaking (Exam 9 task A5) through the Werner & Modlin pure premium indication formula.
- evidence: CAS Exam 9 Content Outline Fall 2026 p.3 assigns task A5 ('Apply catastrophe models to ratemaking') to Grossi & Kunreuther Chs. 2-6 (a commercial Springer book, Ch.5 'Use of Catastrophe Models in Insurance Rate Making'), which could not be read this session (Springer chapter page returned a bot challenge; no authorized free copy). Every number and claim in the question checks against Werner & Modlin (Exam 5 reading) Ch.6 p.94/98 and Ch.8 p.141, and the cat-model substitution it tests is within A5's wording, so the fit is plausible; but the fixed/variable-expense gross-up is Exam 5 machinery and has not been shown to be how Grossi & Kunreuther §5.3.1 frames the rate.
- source_rank: 1
- proposed_action: When the Exam 9 study kit (Grossi & Kunreuther Ch.5, §5.3.1 'A Simple Rate Making Model') is available, check that the question's rate formula matches the reading's, and add it as a source.
- applied: false
- fingerprint: bfdd40930156

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:02Z/g6e9
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: blind recomputation in Python of the key and every distractor's stated reasoning; one keyed option; distinct options; explanation line by line; factual claims against source; topic/learning_objective/wiki_link against Exam 9 (CAS).md objectives (all link targets exist, + for spaces); format per question-writer formats.md; validate_content.py
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.6 pp.94 and 98 (catastrophe provision added after trend/development; modeled vs non-modeled catastrophes) and Ch.8 p.141 (pure premium indication formula), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), Domains A-D tasks pp.3-6 and text references pp.7-8, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Key C ($713.33) reproduced: (410 + 85 + 40)/(1 - 0.20 - 0.05). Distractors reproduce: A 450/0.75; B 495/0.75 + 40; D (410 + 85x1.15 + 40)/0.75; E (410 + 210 + 40)/0.75. Werner & Modlin p.94 states the exact rule distractor D tests (a model provision already at the future level is added after trend/development, else over-adjusted) and p.98 the rationale for modeled hurricanes. Fits task A5's wording; minor finding F-001 records that the A5 reading (Grossi & Kunreuther) was not read.
