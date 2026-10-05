---
target: Concepts/Sample Mean.md
created: 2026-10-05
---

## [F-001] Box-plot rationale for reporting the median is unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: bullet 5 (resistance), line 24
- claim: It is not resistant: one extreme claim shifts X-bar without limit, which is why a [[Box Plot]]'s median is reported alongside it for skewed severity data.
- evidence: The first half is supported: Siegrist, Random §5.2 (sample/Mean.html) outlier exercise - dropping one score of 10 from 25 grades moves the mean from 64 to 66.25. The second half - that a box plot's median is reported alongside the mean because of the mean's non-resistance, for skewed severity data - is in none of the sources read: Siegrist §5.6 (sample/OrderStatistics.html) describes the boxplot as the five-number summary (minimum, q1, median, q3, maximum, plus outliers) with no mean in it and no such rationale; the MAS-I 2026 outline (Domain B) and Hogg's contents do not treat resistance. As written the clause can also be read as if a box plot displayed the mean.
- source_rank: 3
- proposed_action: Source the clause to a reference that makes the point, or cut it back to the sourced part (one extreme claim can move X-bar by any amount). Not applied - the fix is new wording.
- applied: false
- fingerprint: 2c208c2354fe
