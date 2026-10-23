---
target: questions/exam-altam/altam-053.md
created: 2026-10-23
---

## [F-001] SOA transposition 15,486.6 in (c) not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, part c
- claim: Part (c) states AV1 = 15,468.6 from (b)(i), then computes ADB1 = 100,000 - 15,486.6 = 84,513.4 and CV1 = 15,486.6 - 750 = 14,736.6 with the digits transposed. Unmarked. The correct figures would be 84,531.4 and 14,718.6.
- evidence: SOA ALTAM solutions PDF p.105, (c): 'AV1 = 15,468.6 from (b)(i)'; 'ADB1 = DB1 - AV1 = 100,000 - 15,486.6 = 84,513.4'; 'CV1 = 15,486.6 - 0.05(15,000) = 14,736.6'. Recomputed: AV1 = 15,468.6 (with the SOA's q50 = 0.00121), ADB1 = 84,531.4, CV1 = 14,718.6. Content-plan A.7 lists the slip. A student copying the printed ADB and CV gets them 18 off; the marker flags it without correcting the publisher (P1).
- source_rank: 1
- proposed_action: Add ' (as printed)' after each 15,486.6; do not correct.
- applied: true
- fingerprint: d80eb4cc58f8

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run: (as printed) after both occurrences of 15,486.6.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q53, pp.97-98 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q53, pp.105 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Blind recompute (SULT, i^q = 4%): (b)(i) COI 117.88 and AV1 15,468.73 with exact q50 = 0.0012085; the SOA's 139.62 = 1.2(0.00121)(100,000)/1.04 rounds q50 to 0.00121, and with that rounding my recompute reproduces COI 118.02 and AV1 15,468.6 exactly; (ii) 26.05 exact / 26.07 SOA; (iii) 118.02; (c) DB 100,000 (corridor 2.2 x AV1 < FA), ADB 84,531.4, CV 14,718.6 - the SOA prints 84,513.4 and 14,736.6 from a transposed 15,486.6 (F-001, as printed); (d) reserve 9777.75 (SOA 9778). Stem matches pp.97-98; explanation matches p.105. The one graders' comment, printed after (d), is about part (b) and is filed there verbatim.
