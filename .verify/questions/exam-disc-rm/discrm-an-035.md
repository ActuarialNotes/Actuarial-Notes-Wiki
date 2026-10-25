---
target: questions/exam-disc-rm/discrm-an-035.md
created: 2026-10-10
---

## [C-001] Pass incomplete: essential/desirable/available single-sourced
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- note: Blind answer matched the key (C, workers compensation required by law). The essential/desirable/available classification the stem and explanation rest on appears only in Bonga University lecture notes (Ch.2 p.10, rank 3); Rejda 12th ed. Ch.3 p.51 lists 'selection of insurance coverages' without it. Needs a second, stronger source. Left in_review.

## [C-002] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: in_review
- checks_run: blind recomputation from the stem with key and explanation withheld (matched key); key and every distractor rationale checked; arithmetic re-worked; wiki_link targets exist and fit; learning_objective equals the DISC-RM page's section title; facts checked against the sources listed
- sources_checked: Biniam G., Bonga University, Risk Management and Insurance Chapter Two (lecture notes, 2020), pp.2-3, 10, sha256:37410f48587eebe39188d15f5aa51af832d85f8179229edc0b3d9dd322165f01 — http://ndl.ethernet.edu.et/bitstream/123456789/79433/7/RISK-%20Ch@2.pdf
- note: Left in_review: single rank-3 source for the classification (see comment).

## [C-003] Still in_review after clean-up
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- note: Checked the open Baranoff text as directed; it does not cover the essential/desirable/available classification (Bonga notes only; Baranoff and Rejda 12th ed. do not have it). Restating the question would mean rewriting it; stays in_review pending a maintainer decision.

## [C-004] Retag checked; still in_review for D6
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv13
- date: 2026-10-10
- note: Retag to Insurance as a Risk Management Technique checked (topic and first tag only). The question tests the essential/desirable/available split, now deleted from that page under D6; stays in_review pending D6.

## [C-005] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv13
- date: 2026-10-10
- status_set: in_review
- checks_run: delta check after retag: only topic and a new first wiki_link changed since the dv03 pass (stem, options, key and explanation byte-identical); new tag target exists and covers the tested concept
- note: Left in_review pending D6.

## [C-006] D6 note
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv13
- date: 2026-10-10
- note: D6: the essential/desirable/available split this question tests was deleted from Concepts/Insurance as a Risk Management Technique in dv13 because no independent source states it (only Bonga lecture notes). No vault page now teaches the content. Stays in_review until D6 is decided (source found and content restored, or question retired).

## [C-007] Retired under D6
- entry_type: comment
- author: agent:lead
- date: 2026-10-11
- locus: frontmatter
- note: Retired (off_syllabus: true) under decision D6, resolved the open-source way (docs/cas-publication-plan.md §3.5): the essential/desirable/available insurance split this question tests is stated only in The Institutes' course text, and it was removed from Insurance as a Risk Management Technique, so no vault page teaches it. Kept for the record; the quiz no longer serves it.

## [C-008] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-25T14:23Z/fb9f
- date: 2026-10-25
- status_set: in_review
- checks_run: delta re-check: git diff fbdd77ee9..HEAD shows only 'off_syllabus: true' added after points (decision D6, comment by agent:lead 2026-10-11); stem, options, key and explanation byte-identical to the dv13 pass; validate_content.py and question_lint.py clean
- note: Stays in_review. The file was never verified: the dv03/dv13 passes left it in_review because the essential/desirable/available split rests on one rank-3 source (Bonga University lecture notes; Rejda 12th ed. and Baranoff lack it) and D6 retired it as off-syllabus. That source returned HTTP 503 this session, and no second source was found, so nothing new supports verification.

## [C-009] Second source still not found
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-25T14:34Z/a780
- date: 2026-10-25
- note: Tried again this session for a citable open source stating the essential/desirable/available split: verify_sources.py fetch of the Bonga University notes (http://ndl.ethernet.edu.et/bitstream/123456789/79433/7/RISK-%20Ch@2.pdf) returned HTTP 503 again; web searches for the phrases 'essential insurance' / 'desirable insurance' / 'available insurance' with 'financial difficulty but not bankruptcy', for 'essential coverages' with Mehr and Hedges, for 'essential insurance coverages' 'required by law or by contract', and of openstax.org (Business Ethics 9.3, Entrepreneurship 13.7, Principles of Economics ch.16 surfaced; none states the split) found no open source; no regulator or standard-setter document surfaced. Stays in_review (off_syllabus under D6).
