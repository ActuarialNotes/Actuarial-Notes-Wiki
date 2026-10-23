---
target: questions/exam-altam/altam-041.md
created: 2026-10-23
---

## [F-001] SOA wording slip in (d) not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: nit
- status: open
- locus: explanation, part d
- claim: The explanation reads 'the IRR that earned by taking the lump sum' unmarked.
- evidence: SOA ALTAM solutions PDF p.85, part (d), prints 'the IRR that earned by taking the lump sum is more than 9.6% convertible monthly.' Content-plan A.7 lists it. Meaning unaffected.
- source_rank: 1
- proposed_action: Add ' (as printed)'.
- applied: true
- fingerprint: ae42ec64f20a

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run: '(as printed)' added after 'the IRR that earned'.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q41, pp.75-76 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q41, pp.84-85 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Blind recompute (SULT, 2-term Woolhouse): final-year salary 138,044.47, monthly pension 8052.59; guaranteed annuity factor 13.3821, EPV 1,293,127 (SOA 1,293,125.93 with tabled 10E65, a75); AV of contributions 995,523.95 (SOA 995,523.94); IRR above 9.6% since EPV > AV; B* = 8231.37 (SOA 8231.35) - agree. (f) prose matches. Stem matches pp.75-76; explanation and all six graders' comments match pp.84-85. 'the IRR that earned' marked (as printed) (F-001).
