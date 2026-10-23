---
target: questions/exam-altam/altam-050.md
created: 2026-10-23
---

## [F-001] Conflict inside the source: the prompt's 'Q is 1630' against the solution's 1506.34 (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b prompt
- claim: Part (b) asks to 'Show that Q is 1630 to the nearest 10'; the SOA's solution, and the vault's explanation, reach Q = 1506.34, which rounds to 1510. The prompt was unmarked.
- evidence: SOA ALTAM questions PDF p.91, (b): 'Show that Q is 1630 to the nearest 10.' Solutions PDF p.102: 'Thus, EPV = 4Q(15.0759). Set this equal to AV2 to get Q = 1506.34.' Independent recompute (SULT, joint-life SULT, 2-term Woolhouse, AV2 = 90,838.42): annuity factor 15.0754, Q = 1506.40, so the solution is right and the prompt's 1630 is the publisher's slip; (c)'s 70,095 follows 1506.34. A conflict inside one rank-1 source (content-plan A.7). Not corrected: the vault transcribes the publisher (P1).
- source_rank: 1
- proposed_action: Mark the prompt's 1630 '(as printed)'; leave the figure.
- applied: true
- fingerprint: 5fcc79810c1c

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run: '(as printed)' after 1630 in the (b) prompt; the conflict is recorded here.

## [F-002] Other SOA slips in Q50 not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: nit
- status: open
- locus: explanation, part a; Part d prompt
- claim: Part (a) carries 'not adjustment to the DB', 'DB/AV2 = 1.09 < CF_1' (CF_2 = 1.4 is meant) and '91,9416' (91,941.6); the (d) prompt names the policyholder 'Person S'. All unmarked.
- evidence: SOA ALTAM solutions PDF p.101 prints 'not adjustment', '< CF1' for year 2 and '= 91,9416'; questions PDF p.92 prints 'Person S decides that they no longer needs the annuity'. Content-plan A.7 lists all four. Results unaffected (AV2 = 90,838).
- source_rank: 1
- proposed_action: Add ' (as printed)' at each.
- applied: true
- fingerprint: 4032b1195e02

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-002
- status: resolved
- note: Applied in this run: four (as printed) markers.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q50, pp.91-92 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q50, pp.101-102 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Blind recompute (SULT, joint-life SULT, 2-term Woolhouse): AV1 = 41,017.34, corridor binds in year 2, AV2 = 90,838.42 (SOA 90,838); annuity factor 15.0754, Q = 1506.40 (SOA 1506.34 with 15.0759); reserve 10V = 70,097 (SOA 70,095) - agree with the SOA solution. The prompt's 'Q is 1630' contradicts the SOA's own solution; my recompute sides with the solution (rank-1 internal conflict, marked as printed; F-001). Stem and table match pp.91-92; explanation and comments match pp.101-102. Four other slips marked (F-002).
