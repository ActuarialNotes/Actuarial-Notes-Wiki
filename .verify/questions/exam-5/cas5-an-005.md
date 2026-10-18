---
target: questions/exam-5/cas5-an-005.md
created: 2026-10-18
---

## [F-001] Pie-chart comparison attributed to the wrong chapter
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T13:54Z/g6e5
- date: 2026-10-18
- severity: minor
- status: open
- locus: Part a explanation; Part d explanation
- claim: Part a: 'Friedland (Chapter 5) describes automobile physical damage and property as short-tail lines'; Part d: 'her Chapter 5 comparison with automobile physical damage shows a far larger IBNR share'.
- evidence: Friedland's own bookmark outline puts Chapter 5 (The Development Triangle) at PDF pp.57-68. The short-tail/long-tail passage and the U.S. industry pie charts (auto physical damage vs medical malpractice occurrence; med mal AY2006 IBNR 74%) are in 'Introduction to Part 3 - Basic Techniques for Estimating Unpaid Claims', printed p.79-80 (PDF 85-86), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464. The claim content is correct; only the locator is wrong and would send a reader to the wrong chapter.
- source_rank: 2
- proposed_action: Restate both locators to 'Introduction to Part 3'.
- applied: true
- fingerprint: 50eecc823d94

## [F-002] Option C rationale in Part d overstates what a claims-made policy carries
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T13:54Z/g6e5
- date: 2026-10-18
- severity: minor
- status: open
- locus: Part d explanation, option C rationale
- claim: 'a claims-made policy covers only claims reported during its period, so claims not yet reported are not its liability; the large IBNR share belongs to the occurrence form.'
- evidence: Friedland defines IBNR to include IBNER, development on known claims (Ch.1, PDF p.20), so a claims-made book still carries IBNR; and Ch.3 notes claims-made policies may have extended reporting endorsements, so development beyond 12 months is possible even for annual policies (PDF p.48). What the source supports: claims-made covers claims reported during a certain period (Appendix A, PDF p.431), and the IBNR comparison is for medical malpractice occurrence (PDF 85-86). The key (B) is unaffected.
- source_rank: 2
- proposed_action: Restate the clause to the two sourced facts: claims-made covers claims reported during a certain period (Appendix A), and Friedland's large-IBNR comparison is for medical malpractice occurrence.
- applied: true
- fingerprint: 155fdd88a8c7

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T13:54Z/g6e5
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Both locators restated to 'Introduction to Part 3' in this run (content-plan §1.2 rule 2, restate to source).

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T13:54Z/g6e5
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Clause restated in this run to: 'a claims-made policy covers claims reported during a certain period (Friedland, Appendix A), and the large IBNR share in Friedland's comparison is for medical malpractice *occurrence*.' Both facts are on PDF pp.431 and 85-86.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T13:54Z/g6e5
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: blind match a=A b=C c=D d=B before reading keys; all keys match; each part's sourced claim checked: short-tail/long-tail and pie charts (PDF 85-86), report-year preference for claims-made (PDF 48), claims-made segregated from occurrence and HF/LS vs LF/HS accuracy and 'more extensive analysis' (PDF 431), long-tail CDFs 'very large' / 'highly leveraged' (PDF 103); format per formats.md Matching (each part repeats the option list, stem says options reusable, key not in sequence); parses (questionBank.test.ts passes)
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, v3 2010), Introduction to Part 3, printed pp.79-80 (PDF 85-86), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, v3 2010), Ch.3 Aggregation by Report Year, printed p.42 (PDF 48), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, v3 2010), Ch.7 When the development technique works, printed p.97 (PDF 103), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, v3 2010), Appendix A, Frequency and Severity / Claims-Made, printed p.425 (PDF 431), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Re-verified after the F-001/F-002 fixes in this run.
