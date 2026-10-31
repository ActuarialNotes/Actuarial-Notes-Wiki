---
target: Concepts/Case Adequacy.md
created: 2026-10-31
---

## [F-001] Strengthening said to make recent age-to-age factors fall
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- severity: major
- status: open
- locus: bullet 2 (Strengthening)
- claim: Strengthening raises reported losses immediately, so recent age-to-age factors fall (more of the ultimate is already booked).
- evidence: Friedland Ch. 7 p. 102 (PDF p.108), Scenario 3: 'the age-to-age factors are also higher along the latest two diagonals where the insurer strengthened the adequacy of the case outstanding ... an increase in case outstanding adequacy can lead to higher cumulative claim development factors.' The observed factors on the strengthened diagonals rise; only the factors that *should* apply going forward are lower ('we actually need a lower CDF-to-ultimate factor not a higher factor'). The page's clause states the opposite of what the triangle shows.
- source_rank: 2
- proposed_action: Delete the contradicted clause (done). Optionally add, from Ch. 7 p. 102, that the observed age-to-age factors along the strengthened diagonals rise, which is why the reported development method doubly overstates — that is new prose for a human to write.
- applied: true
- fingerprint: c8083db70a26

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Deleted the clause 'so recent age-to-age factors fall (more of the ultimate is already booked)'; the bullet now says only what Friedland supports.

## [F-002] Adequacy ratio formula appears in no source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- severity: minor
- status: open
- locus: second display formula
- claim: Adequacy ratio = Case reserve at valuation / Eventual settlement value
- evidence: Friedland never names 'case adequacy' (0 hits) or an adequacy ratio; it measures adequacy through average case outstanding, the paid-to-reported ratio and average reported/paid claims (Ch. 6 pp. 68-76; Ch. 13 p. 285). The definition is reasonable but unsourced as a formula.
- source_rank: 2
- proposed_action: Keep only if a source can be cited, or mark it as an illustrative definition.
- applied: false
- fingerprint: a0277f4ec83d

## [F-003] Detecting a Shift: stated size of strengthening does not match the table
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- severity: minor
- status: open
- locus: example 'Detecting a Shift', answer paras 2 and 4
- claim: Strengthening of roughly 55-65% over and above the ~5% severity trend; factors 'built for a book that reserved 60% lighter'.
- evidence: Recomputed (rank 5) from the page's own table: latest-diagonal jumps are 9,400/5,700 = +64.9%, 14,000/8,400 = +66.7%, 18,100/12,000 = +50.8%; net of one year of 5% trend these are +57%, +59%, +44%, i.e. about 44-59%, not 55-65%. A 60% strengthening means the old reserves were 1/1.6 = 62.5% of the new, i.e. ~37.5% lighter, not '60% lighter'.
- source_rank: 5
- proposed_action: Restate the range as roughly 45-60% over trend and reword 'reserved 60% lighter' (e.g. 'reserved at about 60% less adequacy'); author's call.
- applied: false
- fingerprint: 799605a27fb2

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: avg case O/S definition vs Ch. 6 Table 11; column-wise diagnostic vs Ch. 6 p. 76 and Ch. 13 p. 285; effect on reported development, paid immunity, Cape Cod double effect vs Chs. 7, 9, 10, 15; B-S remedy (latest diagonal kept, selected severity trend) vs Ch. 13 pp. 286-287; both examples recomputed line by line
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 6 pp. 68-76 (paid-to-reported, average case outstanding, stable columns grow with inflation); Ch. 7 pp. 101-103 (Scenario 3); Ch. 9 p. 158; Ch. 10 p. 178 (Cape Cod reflects higher reported claims); Ch. 13 pp. 285-287 (B-S case adjustment); Ch. 15 p. 349, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: One major contradiction fixed (F-001). Two minor findings left open: an unsourced adequacy-ratio formula (F-002) and loose percentages in an example (F-003). Weakening being the 'more dangerous direction' is reasoning that is not in Friedland.
