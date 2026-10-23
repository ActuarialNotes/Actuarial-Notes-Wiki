---
target: questions/exam-altam/altam-033.md
created: 2026-10-23
---

## [F-001] SOA slips in (d)(ii) not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, part d(ii)
- claim: The mortality-gain formula's second bracket reads '- 1000 p*_60 11V^g' (the arithmetic adds it); the expense-gain formula adds 1000 q*_60(250,000 + E) inside each bracket where the profit identity subtracts it; and the gains 684,077.68 - 467,795.37 - 58,618.46 = 157,663.85 do not add to the (d)(i) total 157,917.62. Transcribed faithfully but unmarked.
- evidence: SOA ALTAM solutions PDF p.67 (mortality gain, '-[1000 q*60(250,000+E10) - 1000 p*60 11V^g]' then '= 852,898 + 70,975,004.6 - (1,506,000 + 70,789,698)') and p.68 (expense gain, '+ 1000 q*60(250,000+E10)' in both brackets; result -58,618.46). Recompute: total per policy 157.92 with P = 5473.44 (157.89 with unrounded P); the gains with V10, V11 as given sum to 157.70 per policy - V10 -> V11 is not exactly the expected-basis recursion, so the SOA's printed sum and total cannot agree. Content-plan A.7 lists all three.
- source_rank: 1
- proposed_action: Add ' (as printed)' at each; do not correct.
- applied: true
- fingerprint: 4649464262b7

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run: (as printed) after the mortality formula, the expense formula and the expense-gain result; figures unchanged.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q33, pp.61-62 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q33, pp.66-68 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Blind recompute from the SULT: (a)(ii) (IA)51 = 5.92516 (SOA); (b) P = 5473.41 exact, 5473.44 with tabled A50, a50:20 (SOA 5473.44); (c) 2V = 10,079.06 (SOA 10,078.9; 10,079 to the nearest 1); (d)(i) 157.92 per policy with P = 5473.44 (SOA 157,917.62 for 1000); (d)(ii) I 684.08, M -467.76 (q60 unrounded; SOA -467.80 per policy with 852,898), E -58.61 per policy - agree with the SOA to its precision. Stem matches pp.61-62; explanation and comments match pp.66-68. SOA slips in (d)(ii) marked (as printed) this run (F-001).
