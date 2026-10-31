---
target: Concepts/Frequency-Severity Method.md
created: 2026-10-31
---

## [F-001] Second Friedland approach misdescribed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- severity: major
- status: open
- locus: variant list, second bullet
- claim: Counts and trended severity. Develop counts, but estimate severity by trending a mature year's severity forward rather than developing an immature one.
- evidence: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010) Ch.11 Approach #2, 'Incorporation of Exposures and Inflation into the Methodology', PDF pp.201, 207-210 (printed 195, 201-204): it projects only the latest two accident years; ultimate counts are compared with a trended exposure base to select a frequency ('Compare Ultimate Claim Counts to Exposures and Select Frequency'), and severity is selected from paid and reported severities developed to ultimate and then trended to the latest year's cost level (p.209: 'We begin with projecting paid severities and reported severities to an ultimate value ... The next step is to adjust the severities ... to the cost level of accident year 2008'). The page omits the exposure/frequency step and says severity is trended 'rather than developing', which the reading contradicts. sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- source_rank: 2
- proposed_action: Describe approach #2 as Friedland does: exposures × selected frequency for counts, developed-then-trended severities, for the most recent years.
- applied: true
- fingerprint: e5f2845d61e2

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Bullet rewritten to Friedland's approach #2 (exposure-based frequency, developed severities trended to the latest year).

## [F-002] Disposal rate approach attributed to Berquist-Sherman
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- severity: minor
- status: open
- locus: variant list, third bullet
- claim: Disposal rate (Berquist-Sherman) approach.
- evidence: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010) Ch.11 calls approach #3 the 'Disposal Rate Technique' (PDF p.211, printed 205) and attributes it to no author; Ch.13 PDF p.294 (printed 288) says only that Berquist and Sherman 'use the same definition of disposal rates'. Their technique is the paid-triangle settlement-rate adjustment, a different method (vault: [[Berquist-Sherman Method]]). sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- source_rank: 2
- proposed_action: Drop '(Berquist-Sherman)' from the label.
- applied: true
- fingerprint: 2014190b5868

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Label now 'Disposal rate approach.'

## [F-003] Two practice claims with no source in the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- severity: minor
- status: open
- locus: Further points, third and fourth bullets
- claim: severities are usually capped and the excess layer added back separately; Report-year severities avoid the dilution; accident-year severities do not.
- evidence: Not found in Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010) Ch.11 (PDF pp.200-226 read for the approaches and 'When the Frequency-Severity Techniques Work', p.218). 'IBNER' occurs only at PDF pp.20, 107, 395, 399, none in Ch.11; Ch.11 discusses limits only as a source of trend variation (p.207). The claims may be sound, but they are not supported by the reading. sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- source_rank: 2
- proposed_action: Cite a source for the capping practice and the report-year severity point, or remove them.
- applied: false
- fingerprint: e9f20098f0ba

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: independent recomputation of both examples (800 claims, 10,000,000, 1,000 pure premium; +1.25%, +20.3%, 1.219); the three approaches diffed against Friedland's Approach #1-#3 sections; strengths against 'When the Frequency-Severity Techniques Work' (p.218)
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.11 Frequency-Severity Techniques, PDF pp.200-203, 207-213, 218 (printed 194-197, 201-207, 212), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Approach #2 corrected to the reading and approach #3's label fixed; two unsourced practice claims left open.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/cde6
- date: 2026-10-31
- resolves: F-003
- status: resolved
- note: Capping half confirmed and transcribed: Friedland Ch.11 printed p.210 (PDF 216): 'To avoid potential distortions due to spurious large claims, the actuary may want to consider capping claims to a predetermined value or excluding large claims in their entirety. In either case, the actuary will then need to add a provision for large claims to the estimate of unpaid claims.' The page's 'severities are usually capped and the excess layer added back separately' overstated 'may want to consider' and named an excess layer the text does not; the sentence now transcribes the reading with the citation. The report-year-severity half is still unsupported and is carried forward as F-004, so it is not lost.

## [F-004] Report-year severity pitfall has no source in the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/cde6
- date: 2026-10-31
- severity: minor
- status: open
- locus: Further points, 'A pitfall' bullet
- claim: Average severity triangles mix IBNER pushing severity up and late-reported small claims pulling it down; report-year severities avoid the dilution, accident-year severities do not.
- evidence: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), full-text search: 'IBNER' occurs only at PDF pp.20, 107, 395, 399 (none in Ch.11); 'dilut' occurs nowhere; 'report year' at PDF pp.200, 271, 289 etc. says only that frequency-severity techniques can be used with report-year data (p.200), that case outstanding development suits report-year analysis (p.271) and that report-year data may replace accident-year data after a social or legal shift (p.289) — none says report-year severities avoid a dilution. Ch.11 p.208 (PDF 214) says only that paid severities increase with maturity because smaller claims settle faster, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf. Split out of F-003 (whose capping half is resolved).
- source_rank: 2
- proposed_action: Cite a source for the IBNER/late-small-claims dilution and the report-year remedy, or remove the bullet (author's call).
- applied: false
- fingerprint: d61866025d8d

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/cde6
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: whole page re-read against Ch.11; new material line by line: tort-reform/benefit adjustment in severities and inflation-sensitivity (pp.203-204, 212); Approach #2 counts and payroll trended to common level, frequency = trended counts / on-level EP (p.204), severity moved back by dividing by trend (pp.203-204), WC 2007 frequency 0.36% x 1.025 / 0.99 = 0.373% reproduced; disposal rate definition (p.206), future closed counts formula and both worked cells recomputed ((609-127)/0.8 x 0.233 = 140.4; (588-403)/0.29 x 0.020 = 12.8) (p.207); incremental severity, trend then de-trend (pp.208, 210); cumulation to ultimate (p.210); no partial payments (p.205), mismatch (p.211), footnote 67 alternatives; tail severity, three considerations, >10% (p.209); capping text (p.210); examples recomputed (800; 10,000,000; 1,000; +1.25%, +20.3%, 1.219); G8 quotes matched to page
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.11 Frequency-Severity Techniques, PDF pp.200-203, 207-218 (printed 194-197, 201-212): Approach #2 (pp.202-204), disposal rate technique (pp.205-211), footnote 67 (p.211), When the Techniques Work (p.212), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: New material agrees with Friedland Ch.11. The rate-change/growth rationale for on-level premium and the too-early/too-late trade-off are glosses consistent with pp.204, 209. F-003 resolved (capping now transcribed from p.210); its report-year half continues as minor F-004.
