---
target: Concepts/Loss Development.md
created: 2026-09-13
---

## [F-001] CDF chain product stated as 2.2727
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- severity: minor
- status: open
- locus: Example 'Developing an Immature Accident Year', CDF line and the two lines that follow
- claim: 1.650 x 1.220 x 1.080 x 1.030 x 1.015 = 2.2727, so ultimate = 4,200,000 x 2.2727 = 9,545,340 and IBNR = 5,345,340.
- evidence: Independent recomputation of the product: 1.650 x 1.220 = 2.0130; x 1.080 = 2.174040; x 1.030 = 2.2392612; x 1.015 = 2.27285012. That rounds to 2.2729, not 2.2727. Carrying 2.2729: ultimate = 4,200,000 x 2.2729 = 9,546,180 exactly, and IBNR = 9,546,180 - 4,200,000 = 5,346,180. The method is as Friedland Ch. 7 printed p.90 (PDF p.96) Step 6: 'We calculate cumulative claim development factors by successive multiplications beginning with the tail factor and the oldest age-to-age factor', then Step 7 projects ultimate claims from the CDF. The commentary ('a CDF of 2.27 means more than half the ultimate estimate is unreported' - 1/2.273 = 44% reported) is unaffected.
- source_rank: 5
- proposed_action: Use 2.2729, 9,546,180 and 5,346,180.
- applied: true
- fingerprint: 6ff931f27818

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- status_set: verified
- confidence: high
- checks_run: Ultimate = claims at age n x CDF and CDF = product of age-to-age factors and the tail diffed against Friedland Ch. 7 pp.85-90, Steps 1-7, and Step 6 verbatim: 'We calculate cumulative claim development factors by successive multiplications beginning with the tail factor and the oldest age-to-age factor'; IBNR = ultimate - reported follows from the same chapter. Pure IBNR vs IBNER checked against Friedland Ch. 3 p.43 and Werner Ch. 16 p.317. The reported-develops-faster-than-paid claim is borne out by Friedland's own U.S. Industry Auto selections at p.90 (reported tail 1.000, paid tail 1.002). The paid-to-reported diagnostic and both of the page's readings of it are Friedland Ch. 6 p.68: 'It is an important tool for testing whether there might have been changes in case outstanding adequacy or in settlement patterns... we need to investigate further any changes observed to determine if the change is occurring in paid claims (i.e., the numerator) or in the case outstanding'; the Berquist-Sherman response is Friedland Ch. 13. BF using (1 - 1/CDF) against Friedland Ch. 9 p.153. Both examples recomputed before reading the answers: the factor chain multiplies to 2.27285012, which is where finding F-001 (fixed in this pass) came from, and 6,300,000/9,000,000 = 0.70 against the 0.58 benchmark.
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 7 pp.85-90 (PDF pp.91-96), Ch. 6 p.68 (PDF p.74), Ch. 9 p.153 (PDF p.159), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp.93-95 (PDF pp.105-107), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Confirmed on the page this session: CDF 2.2729, ultimate 9,546,180, IBNR 5,346,180. Recomputed: 1.650 x 1.220 x 1.080 x 1.030 x 1.015 = 2.27285; 4,200,000 x 2.2729 = 9,546,180; minus 4,200,000 = 5,346,180. Method per Friedland Ch.7 p.90 (PDF p.96): 'We calculate cumulative claim development factors by successive multiplications beginning with the tail factor and the oldest age-to-age factor.'

## [F-002] Reported development said to be 'less volatile' than paid, and the paid-to-reported diagnostic given one cause per direction
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullet 'Reported (incurred) development is normally faster and less volatile than paid development'
- claim: '... normally faster and less volatile than paid development, so reported CDFs are smaller. ... a widening paid-to-reported ratio signals speeding settlement, a narrowing one signals strengthening case reserves.'
- evidence: Friedland Ch.7 p.91 (PDF p.97): 'cumulative paid claim development factors are usually greater than cumulative reported claim development factors at the same maturity age'; p.105 (PDF p.111): reported development is more responsive 'due to the shorter time frame in which claims are reported versus paid'. Neither text says reported development is less volatile. Friedland Ch.6 p.68 (PDF p.74): the paid-to-reported ratio 'is an important tool for testing whether there might have been changes in case outstanding adequacy or in settlement patterns ... we need to investigate further any changes observed to determine if the change is occurring in paid claims (i.e., the numerator) or in the case outstanding' — a rising ratio can equally mean weaker case reserves, a falling one slower settlement (the page's own second example gives both readings).
- source_rank: 2
- proposed_action: Drop 'less volatile'; state that a change in the ratio has either cause and must be investigated.
- applied: true
- fingerprint: 25653bbdb50e

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Bullet rewritten per Friedland pp.91, 105 and 68 (PDF pp.97, 111, 74).

## [F-003] Ratemaking bullet says overlapping development and trend double-counts — Werner calls that the overlap fallacy
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: last bullet, 'overlapping them double-counts'
- claim: 'Applying one without the other under-states the indication; overlapping them double-counts.'
- evidence: Werner Ch.6 pp.120-121 (PDF pp.132-133): 'It may seem that trending and developing losses results in overlapping adjustments; however, this is not the case.' The sentence implies there is an overlap to avoid; Werner says applying both is correct.
- source_rank: 2
- proposed_action: Say applying both is not a double count (the overlap fallacy).
- applied: true
- fingerprint: 50a7e68afde3

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Bullet now ends: 'applying both is not a double count — Werner & Modlin call that belief the overlap fallacy', and trend 'restates it to the cost level of the future policy period' in Werner's words.

## [F-004] Tip says a 5% error in the 12-24 factor moves ultimate by 'roughly $450,000'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: nit
- status: open
- locus: Example 1, tip 'Leverage at early maturities'
- claim: 'A 5% error in the 12-24 factor moves ultimate by roughly $450,000'.
- evidence: Recomputed: the 12-24 factor multiplies straight through to ultimate, so a 5% error moves ultimate by 5% x 9,546,180 = 477,309, i.e. roughly $480,000.
- source_rank: 5
- proposed_action: Change $450,000 to $480,000.
- applied: true
- fingerprint: ad5959a53a4f

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-004
- status: resolved
- note: Tip now says roughly $480,000 (0.05 x 9,546,180 = 477,309).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: Ultimate = losses at age x CDF and the CDF chain against Friedland p.90 and Werner pp.108-109 (age-to-ultimate = product of selected link ratios and tail); pure IBNR vs IBNER against Friedland p.14 and Werner p.107 ('emergence of new claims as well as adverse development on known claims'); downward development from salvage, subrogation and high early case reserves against Werner pp.107-108; short/long-tail examples and tail factor against Werner pp.105, 108; BF % unreported = 1 - 1/CDF against Friedland p.153; leveraged CDFs and alternative techniques against Friedland p.97; Berquist-Sherman against Werner p.109. Examples recomputed before reading: CDF 2.27285, ultimate 9,546,180, IBNR 5,346,180; 1/2.2729 = 44.0% reported; 6.3M/9.0M = 0.70.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp.105-109 and 120-121 (PDF pp.117-121, 132-133), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 2 p.14 (PDF p.20); Ch. 6 p.68 (PDF p.74); Ch. 7 pp.90-91, 97, 105 (PDF pp.96-97, 103, 111); Ch. 9 p.153 (PDF p.159), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: F-001 (applied) resolved; three new findings (two minor, one nit) fixed and resolved. Confidence medium: the worked examples and the 'classic error' remark are vault-authored.
