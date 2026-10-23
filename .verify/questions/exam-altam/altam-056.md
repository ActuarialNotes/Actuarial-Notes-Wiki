---
target: questions/exam-altam/altam-056.md
created: 2026-10-23
---

## [F-001] SOA digit slip in xi in (b) not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, part b
- claim: Part (a) gives xi = 0.74730; part (b) lists xi = 0.747230 and uses 0.74723 in the pi(0) line. Unmarked.
- evidence: SOA ALTAM solutions PDF p.111. 0.95 e^{-120(0.002)} = 0.747296, so (a)'s 0.74730 is right and (b)'s 0.747230 / 0.74723 carry a stray digit. Every (b)-(d) result follows 0.74730: d1 = 0.53279, d2 = -0.25778, factor 0.181325, pi(0) = 17,091, hedge 17,846, c = 0.0207 all reproduce with 0.747296 (0.74723 would give 0.181345 and 17,093). Content-plan A.7 lists the slip.
- source_rank: 1
- proposed_action: Add ' (as printed)' after both (b) occurrences; do not correct.
- applied: true
- fingerprint: a56fafaec8c7

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run: (as printed) after 0.747230 and 0.74723.

## [F-002] Question points (4) not printed by the source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: minor
- status: open
- locus: frontmatter, points
- claim: The vault gives points: 4 and its parts carry no point values.
- evidence: SOA ALTAM questions PDF p.103 prints Q56 with no '(N points)' heading, no per-part values and no source-exam note; the solutions PDF pp.111-112 give none either. The 4 matches the number of parts (a)-(d), a converter default rather than a transcribed figure.
- source_rank: 1
- proposed_action: Maintainer decision: keep a documented one-point-per-part convention for unscored sample questions, or find the original paper's values. No change made.
- applied: false
- fingerprint: c679f60e9f98

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q56, pp.103 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q56, pp.111-112 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Blind recompute (Black-Scholes, SULT 10p60 = 0.942549): I first took xi = 0.95(0.998)^120 = 0.747117 (discrete monthly charge), giving pi(0) = 17,096 (17,100 to the nearest 100, as the prompt asks), hedge after one month 17,851 and c = 0.0207 a year / 0.0017 a month; the SOA defines F_t = 0.95 P e^{-12(0.002)t} S_t, i.e. xi = 0.747296, and with that my recompute reproduces its d1 0.53279, d2 -0.25778, pi(0) 17,091, hedge 17,846 and c 0.0207 exactly. Stem matches p.103; explanation matches pp.111-112. xi slip in (b) marked (as printed) (F-001); points not printed by the SOA (F-002, open).
