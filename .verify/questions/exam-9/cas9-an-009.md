---
target: questions/exam-9/cas9-an-009.md
created: 2026-10-18
---

## [F-001] Tests PSA/CPR/SMM prepayment mechanics that no Exam 9 reading teaches
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T14:02Z/g6e9
- date: 2026-10-18
- severity: major
- status: open
- locus: whole question; frontmatter topic/learning_objective
- claim: The question asks for a PSA-based monthly prepayment (CPR ramp, CPR-to-SMM conversion, prepayment on balance net of scheduled principal) as Exam 9 task C5 material.
- evidence: CAS Exam 9 Content Outline Fall 2026 p.5 names prepayment under task C5, and pp.7-8 assign C5 to Coval, Jurek & Stafford (C5-C6) and Panning (C3, C5) only. A full-text search of Panning (casact.org, 12 pp., sha256:9f569b0e…) finds zero occurrences of 'prepay', 'mortgage', 'PSA', 'CPR', 'callable' or 'convexity'. Coval, Jurek & Stafford could not be read from the publisher (aeaweb.org PDF returned 403); per its vault resource page (rank 4, consistency only) it covers tranching, CDO ratings and systematic-risk pricing, not mortgage prepayment models. The only source the writer cited, the OCC Comptroller's Handbook (not an Exam 9 reading), defines CPR, SMM and 100% PSA (pp.20-21) but not the SMM compounding formula or the net-of-scheduled-principal convention the explanation uses. The arithmetic itself is right (key C 126,372 reproduced; distractors reproduce their stated errors), so this is a syllabus-fit finding, not a wrong key.
- source_rank: 1
- proposed_action: Replace with a question a different writer builds on what Panning (franchise-value duration, ALM) or Coval, Jurek & Stafford (default correlation and tranche risk) actually teach for task C5, or retire the question / mark it off_syllabus. Not fixable within the checker's limits (would require a new question).
- applied: false
- fingerprint: 9e712670110d

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:02Z/g6e9
- date: 2026-10-18
- status_set: in_review
- checks_run: blind recomputation in Python of the key and every distractor's stated reasoning; one keyed option; distinct options; explanation line by line; factual claims against source; topic/learning_objective/wiki_link against Exam 9 (CAS).md objectives (all link targets exist, + for spaces); format per question-writer formats.md; validate_content.py
- sources_checked: OCC, Comptroller's Handbook: Interest Rate Risk (v1.0), pp.20-21 (CPR, single month mortality, 100% PSA: 0.2%/month to 6% at month 30), sha256:e96b2f0fe28b67db124aa7e56743b1b4e0b30c00d60461f124c1f776d96e2aac — https://www.occ.gov/publications-and-resources/publications/comptrollers-handbook/files/interest-rate-risk/pub-ch-interest-rate-risk.pdf; Panning, Managing Interest Rate Risk: ALM, Franchise Value, and Strategy (Willis Re, 2006), full text pp.1-12 searched, sha256:9f569b0edf7a677b08716b2c06103c0c7826007d00c5a17c5f4d32f129e32278 — https://www.casact.org/sites/default/files/2021-03/9_Panning.pdf; CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), Domains A-D tasks pp.3-6 and text references pp.7-8, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Arithmetic correct (key C reproduced blind, each distractor reproduces its error; OCC pp.20-21 confirms the PSA ramp and CPR/SMM definitions). Left in_review: open major F-001 — the PSA/SMM mechanics are not taught by the C5 readings (Panning searched, zero hits; Coval, Jurek & Stafford unreachable from the publisher).
