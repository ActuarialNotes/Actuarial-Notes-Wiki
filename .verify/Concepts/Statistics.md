---
target: Concepts/Statistics.md
created: 2026-10-04
---

## [F-001] "Dividing S^2 by n-1" misdescribes the divisor
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: nit
- status: open
- locus: bullet 1, line 20
- claim: "Dividing S^2 by n-1 (rather than n) makes it an unbiased estimator of sigma^2".
- evidence: S^2 already carries the n-1 divisor (line 18; Siegrist §5.5); it is the sum of squared deviations that is divided by n-1, not S^2, and S^2/(n-1) taken literally is biased. The intended fact - the n-1 divisor makes S^2 unbiased - is confirmed by Siegrist §5.5 (Variance.html) and PSU STAT 415 Lesson 2 Ex 2.8.
- source_rank: 3
- proposed_action: Read "Dividing the sum of squared deviations by n-1 (rather than n) makes S^2 an unbiased estimator of sigma^2".
- applied: false
- fingerprint: 77abfcaf7307
